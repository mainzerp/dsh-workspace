import { execFile } from 'node:child_process';
import { randomBytes } from 'node:crypto';
import { constants } from 'node:fs';
import { access, open, readdir, realpath, rename, rm, stat, writeFile } from 'node:fs/promises';
import { basename, extname, isAbsolute, relative, resolve, sep } from 'node:path';
import { promisify } from 'node:util';
const execFileAsync = promisify(execFile);
const IGNORED_DIRECTORIES = new Set(['.git', 'node_modules', 'dist', 'lib', 'coverage', '.next', '.cache']);
const IMAGE_MIME = new Map([
    ['.png', 'image/png'], ['.jpg', 'image/jpeg'], ['.jpeg', 'image/jpeg'], ['.gif', 'image/gif'],
    ['.webp', 'image/webp'], ['.svg', 'image/svg+xml'], ['.bmp', 'image/bmp'], ['.ico', 'image/x-icon'],
]);
/** @param decorations git %D output, e.g. `HEAD -> main, origin/main, tag: v1.2.0`. @returns typed refs. Note: %D gives no full ref paths, so a LOCAL branch named `feature/foo` is classified as `remote`. */
export function parseGitLogRefs(decorations) {
    const trimmed = decorations.trim();
    if (trimmed.length === 0)
        return [];
    const refs = [];
    for (const raw of trimmed.split(', ')) {
        const item = raw.trim();
        if (item.length === 0)
            continue;
        if (item === 'HEAD') {
            refs.push({ name: 'HEAD', kind: 'head' });
            continue;
        }
        if (item.startsWith('HEAD -> ')) {
            refs.push({ name: 'HEAD', kind: 'head' });
            refs.push({ name: item.slice('HEAD -> '.length), kind: 'branch' });
            continue;
        }
        if (item.startsWith('tag: ')) {
            refs.push({ name: item.slice('tag: '.length), kind: 'tag' });
            continue;
        }
        refs.push({ name: item, kind: item.includes('/') ? 'remote' : 'branch' });
    }
    return refs;
}
function writeError(code, message) {
    return Object.assign(new Error(message), { code });
}
/** Root-confined project browser: read-only previews plus confined, size-capped file writes and root-level uploads. All writes stay inside `projectRoot`; traversal and symlink escapes are rejected, overwrite is opt-in. */
export class ProjectBrowser {
    #root;
    #maxEntries;
    #maxFileBytes;
    constructor(root, maxEntries, maxFileBytes) {
        this.#root = root;
        this.#maxEntries = maxEntries;
        this.#maxFileBytes = maxFileBytes;
    }
    /** @param root project root. @param maxEntries tree limit. @param maxFileBytes preview limit. @returns initialized browser. */
    static async create(root, maxEntries, maxFileBytes) {
        const canonical = await realpath(resolve(root));
        await access(canonical, constants.R_OK);
        return new ProjectBrowser(canonical, maxEntries, maxFileBytes);
    }
    async #resolveFile(input, allowMissing = false) {
        if (input.length === 0 || input.includes('\0') || isAbsolute(input))
            throw new Error('Invalid file path');
        const candidate = resolve(this.#root, input);
        const rel = relative(this.#root, candidate);
        if (rel === '..' || rel.startsWith(`..${sep}`) || isAbsolute(rel))
            throw new Error('File path escapes the project root');
        let canonical;
        try {
            canonical = await realpath(candidate);
        }
        catch (error) {
            if (!allowMissing || error.code !== 'ENOENT')
                throw error;
            return { absolute: candidate, path: rel.split(sep).join('/') };
        }
        const canonicalRel = relative(this.#root, canonical);
        if (canonicalRel === '..' || canonicalRel.startsWith(`..${sep}`) || isAbsolute(canonicalRel)) {
            throw new Error('Symlink target escapes the project root');
        }
        return { absolute: canonical, path: rel.split(sep).join('/') };
    }
    async #git(args) {
        const { stdout } = await execFileAsync('git', ['-c', 'core.quotepath=false', ...args], {
            cwd: this.#root, encoding: 'utf8', timeout: 5_000, maxBuffer: this.#maxFileBytes * 2,
        });
        return stdout;
    }
    /** @returns bounded tree plus current Git status. */
    async snapshot() {
        const entries = [];
        let truncated = false;
        const visit = async (directory, prefix, depth) => {
            if (entries.length >= this.#maxEntries) {
                truncated = true;
                return;
            }
            const children = await readdir(directory, { withFileTypes: true });
            children.sort((left, right) => left.isDirectory() !== right.isDirectory()
                ? left.isDirectory() ? -1 : 1
                : left.name.localeCompare(right.name));
            for (const child of children) {
                if (entries.length >= this.#maxEntries) {
                    truncated = true;
                    return;
                }
                if (child.isSymbolicLink() || (child.isDirectory() && IGNORED_DIRECTORIES.has(child.name)))
                    continue;
                if (!child.isDirectory() && !child.isFile())
                    continue;
                const path = prefix.length === 0 ? child.name : `${prefix}/${child.name}`;
                entries.push({ path, name: child.name, kind: child.isDirectory() ? 'directory' : 'file', depth });
                if (child.isDirectory())
                    await visit(resolve(directory, child.name), path, depth + 1);
            }
        };
        await visit(this.#root, '', 0);
        let gitAvailable = true;
        let changes = [];
        try {
            const status = await this.#git(['status', '--short', '--untracked-files=all']);
            changes = status.split('\n').filter(Boolean).map(line => ({
                status: line.slice(0, 2).trim() || '?',
                path: line.slice(3).replace(/^"|"$/g, '').split(' -> ').at(-1) ?? '',
            }));
        }
        catch {
            gitAvailable = false;
        }
        return { rootName: basename(this.#root), rootPath: this.#root, entries, changes, truncated, gitAvailable };
    }
    /** @param input relative file path. @returns bounded file preview. */
    async read(input) {
        const target = await this.#resolveFile(input);
        const handle = await open(target.absolute, 'r');
        const buffer = Buffer.allocUnsafe(this.#maxFileBytes + 1);
        let bytesRead;
        try {
            ({ bytesRead } = await handle.read(buffer, 0, buffer.byteLength, 0));
        }
        finally {
            await handle.close();
        }
        const slice = buffer.subarray(0, Math.min(bytesRead, this.#maxFileBytes));
        const binary = slice.includes(0);
        const mimeType = IMAGE_MIME.get(extname(target.path).toLowerCase());
        return {
            path: target.path,
            content: binary ? '' : slice.toString('utf8'),
            truncated: bytesRead > this.#maxFileBytes,
            binary,
            ...(mimeType === undefined ? {} : { mimeType, dataUrl: `data:${mimeType};base64,${slice.toString('base64')}` }),
        };
    }
    async #assertWritableTarget(absolute) {
        const stats = await stat(absolute);
        if (stats.isDirectory())
            throw writeError('IS_DIRECTORY', 'Cannot write to a directory');
        if (stats.size > this.#maxFileBytes)
            throw writeError('FILE_TOO_LARGE', `File exceeds the ${this.#maxFileBytes}-byte limit and cannot be saved safely`);
    }
    async #atomicWrite(absolute, data, overwrite) {
        if (!overwrite) {
            let handle;
            try {
                handle = await open(absolute, 'wx');
            }
            catch (error) {
                if (error.code === 'EEXIST')
                    throw writeError('FILE_EXISTS', 'File already exists; pass overwrite to replace it');
                throw error;
            }
            try {
                await handle.writeFile(data);
            }
            finally {
                await handle.close();
            }
            return;
        }
        const temp = `${absolute}.tmp-${randomBytes(6).toString('hex')}`;
        try {
            await writeFile(temp, data);
            await rename(temp, absolute);
        }
        catch (error) {
            await rm(temp, { force: true }).catch(() => undefined);
            throw error;
        }
    }
    /** @param input relative path of an existing text file. @param content new UTF-8 content. @returns written path and byte count. */
    async write(input, content) {
        const target = await this.#resolveFile(input);
        const data = Buffer.from(content, 'utf8');
        if (data.byteLength > this.#maxFileBytes)
            throw writeError('FILE_TOO_LARGE', `Content exceeds the ${this.#maxFileBytes}-byte limit`);
        if (content.includes('\0'))
            throw writeError('BINARY_CONTENT', 'Binary content cannot be saved through the text editor');
        await this.#assertWritableTarget(target.absolute);
        await this.#atomicWrite(target.absolute, data, true);
        return { path: target.path, bytes: data.byteLength };
    }
    /** @param name root-level basename. @param data raw bytes. @param overwrite allow replacing an existing file. @returns written path and byte count. */
    async upload(name, data, overwrite) {
        if (name.length === 0 || name.includes('/') || name.includes('\\') || name.includes('\0') || name === '.' || name === '..') {
            throw new Error('Invalid upload file name');
        }
        const target = await this.#resolveFile(name, true);
        const existing = await stat(target.absolute).catch((error) => {
            if (error.code === 'ENOENT')
                return null;
            throw error;
        });
        if (existing !== null) {
            if (existing.isDirectory())
                throw writeError('IS_DIRECTORY', 'Cannot overwrite a directory');
            if (!overwrite)
                throw writeError('FILE_EXISTS', 'File already exists; pass overwrite to replace it');
        }
        if (data.byteLength > this.#maxFileBytes)
            throw writeError('FILE_TOO_LARGE', `Upload exceeds the ${this.#maxFileBytes}-byte limit`);
        await this.#atomicWrite(target.absolute, data, overwrite);
        return { path: target.path, bytes: data.byteLength };
    }
    /** @param input relative changed-file path. @returns bounded Git diff. */
    async diff(input) {
        const target = await this.#resolveFile(input, true);
        let diff = await this.#git(['diff', '--no-ext-diff', '--', target.path]);
        if (diff.length === 0)
            diff = await this.#git(['diff', '--cached', '--no-ext-diff', '--', target.path]);
        if (diff.length === 0) {
            const status = await this.#git(['status', '--short', '--', target.path]);
            if (status.startsWith('??'))
                diff = await this.#git(['diff', '--no-index', '--', '/dev/null', target.path]).catch(error => error.stdout ?? '');
        }
        const encoded = Buffer.from(diff);
        return { path: target.path, diff: encoded.subarray(0, this.#maxFileBytes).toString('utf8'), truncated: encoded.byteLength > this.#maxFileBytes };
    }
    /** @param input optional relative file path to filter history. @param limit max commits. @returns bounded commit history across all refs in topo order. */
    async logs(input, limit) {
        const args = ['log', '--all', '--topo-order', `--pretty=format:%H%x1f%P%x1f%an%x1f%at%x1f%D%x1f%s`, '-n', String(limit)];
        if (input !== undefined && input.length > 0) {
            const target = await this.#resolveFile(input);
            args.push('--', target.path);
        }
        const stdout = await this.#git(args);
        const entries = stdout.split('\n').filter(Boolean).map(line => {
            const [hash, parents, author, timestamp, decorations, subject] = line.split('\x1f');
            return {
                hash: hash ?? '',
                shortHash: (hash ?? '').slice(0, 8),
                author: author ?? '',
                timestamp: Number(timestamp ?? 0),
                subject: subject ?? '',
                parents: (parents ?? '').split(' ').filter(Boolean),
                refs: parseGitLogRefs(decorations ?? ''),
            };
        });
        return { entries };
    }
    /** @param hash commit id. @returns bounded text diff of one commit. */
    async show(hash) {
        if (!/^[0-9a-f]{4,40}$/i.test(hash))
            throw new Error('Invalid commit hash');
        const stdout = await this.#git(['show', '--no-ext-diff', '--format=', hash]);
        const encoded = Buffer.from(stdout);
        return { hash, diff: encoded.subarray(0, this.#maxFileBytes).toString('utf8'), truncated: encoded.byteLength > this.#maxFileBytes };
    }
}
//# sourceMappingURL=project-browser.js.map