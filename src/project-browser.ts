import { execFile } from 'node:child_process'
import { constants } from 'node:fs'
import { access, open, readdir, realpath } from 'node:fs/promises'
import { basename, extname, isAbsolute, relative, resolve, sep } from 'node:path'
import { promisify } from 'node:util'
import type { GitChange, GitDiffPreview, ProjectFilePreview, ProjectSnapshot, ProjectTreeEntry } from './types.js'

const execFileAsync = promisify(execFile)
const IGNORED_DIRECTORIES = new Set(['.git', 'node_modules', 'dist', 'lib', 'coverage', '.next', '.cache'])
const IMAGE_MIME = new Map([
  ['.png', 'image/png'], ['.jpg', 'image/jpeg'], ['.jpeg', 'image/jpeg'], ['.gif', 'image/gif'],
  ['.webp', 'image/webp'], ['.svg', 'image/svg+xml'], ['.bmp', 'image/bmp'], ['.ico', 'image/x-icon'],
])

/** Read-only, root-confined project and Git preview implementation. */
export class ProjectBrowser {
  readonly #root: string
  readonly #maxEntries: number
  readonly #maxFileBytes: number

  private constructor(root: string, maxEntries: number, maxFileBytes: number) {
    this.#root = root
    this.#maxEntries = maxEntries
    this.#maxFileBytes = maxFileBytes
  }

  /** @param root project root. @param maxEntries tree limit. @param maxFileBytes preview limit. @returns initialized browser. */
  static async create(root: string, maxEntries: number, maxFileBytes: number): Promise<ProjectBrowser> {
    const canonical = await realpath(resolve(root))
    await access(canonical, constants.R_OK)
    return new ProjectBrowser(canonical, maxEntries, maxFileBytes)
  }

  async #resolveFile(input: string, allowMissing = false): Promise<{ absolute: string; path: string }> {
    if (input.length === 0 || input.includes('\0') || isAbsolute(input)) throw new Error('文件路径无效')
    const candidate = resolve(this.#root, input)
    const rel = relative(this.#root, candidate)
    if (rel === '..' || rel.startsWith(`..${sep}`) || isAbsolute(rel)) throw new Error('文件路径超出项目目录')
    let canonical: string
    try {
      canonical = await realpath(candidate)
    } catch (error) {
      if (!allowMissing || (error as NodeJS.ErrnoException).code !== 'ENOENT') throw error
      return { absolute: candidate, path: rel.split(sep).join('/') }
    }
    const canonicalRel = relative(this.#root, canonical)
    if (canonicalRel === '..' || canonicalRel.startsWith(`..${sep}`) || isAbsolute(canonicalRel)) {
      throw new Error('符号链接目标超出项目目录')
    }
    return { absolute: canonical, path: rel.split(sep).join('/') }
  }

  async #git(args: readonly string[]): Promise<string> {
    const { stdout } = await execFileAsync('git', ['-c', 'core.quotepath=false', ...args], {
      cwd: this.#root, encoding: 'utf8', timeout: 5_000, maxBuffer: this.#maxFileBytes * 2,
    })
    return stdout
  }

  /** @returns bounded tree plus current Git status. */
  async snapshot(): Promise<ProjectSnapshot> {
    const entries: ProjectTreeEntry[] = []
    let truncated = false
    const visit = async (directory: string, prefix: string, depth: number): Promise<void> => {
      if (entries.length >= this.#maxEntries) { truncated = true; return }
      const children = await readdir(directory, { withFileTypes: true })
      children.sort((left, right) => left.isDirectory() !== right.isDirectory()
        ? left.isDirectory() ? -1 : 1
        : left.name.localeCompare(right.name))
      for (const child of children) {
        if (entries.length >= this.#maxEntries) { truncated = true; return }
        if (child.isSymbolicLink() || (child.isDirectory() && IGNORED_DIRECTORIES.has(child.name))) continue
        if (!child.isDirectory() && !child.isFile()) continue
        const path = prefix.length === 0 ? child.name : `${prefix}/${child.name}`
        entries.push({ path, name: child.name, kind: child.isDirectory() ? 'directory' : 'file', depth })
        if (child.isDirectory()) await visit(resolve(directory, child.name), path, depth + 1)
      }
    }
    await visit(this.#root, '', 0)
    let gitAvailable = true
    let changes: GitChange[] = []
    try {
      const status = await this.#git(['status', '--short', '--untracked-files=all'])
      changes = status.split('\n').filter(Boolean).map(line => ({
        status: line.slice(0, 2).trim() || '?',
        path: line.slice(3).replace(/^"|"$/g, '').split(' -> ').at(-1) ?? '',
      }))
    } catch { gitAvailable = false }
    return { rootName: basename(this.#root), rootPath: this.#root, entries, changes, truncated, gitAvailable }
  }

  /** @param input relative file path. @returns bounded file preview. */
  async read(input: string): Promise<ProjectFilePreview> {
    const target = await this.#resolveFile(input)
    const handle = await open(target.absolute, 'r')
    const buffer = Buffer.allocUnsafe(this.#maxFileBytes + 1)
    let bytesRead: number
    try { ({ bytesRead } = await handle.read(buffer, 0, buffer.byteLength, 0)) } finally { await handle.close() }
    const slice = buffer.subarray(0, Math.min(bytesRead, this.#maxFileBytes))
    const binary = slice.includes(0)
    const mimeType = IMAGE_MIME.get(extname(target.path).toLowerCase())
    return {
      path: target.path,
      content: binary ? '' : slice.toString('utf8'),
      truncated: bytesRead > this.#maxFileBytes,
      binary,
      ...(mimeType === undefined ? {} : { mimeType, dataUrl: `data:${mimeType};base64,${slice.toString('base64')}` }),
    }
  }

  /** @param input relative changed-file path. @returns bounded Git diff. */
  async diff(input: string): Promise<GitDiffPreview> {
    const target = await this.#resolveFile(input, true)
    let diff = await this.#git(['diff', '--no-ext-diff', '--', target.path])
    if (diff.length === 0) diff = await this.#git(['diff', '--cached', '--no-ext-diff', '--', target.path])
    if (diff.length === 0) {
      const status = await this.#git(['status', '--short', '--', target.path])
      if (status.startsWith('??')) diff = await this.#git(['diff', '--no-index', '--', '/dev/null', target.path]).catch(error => (error as { stdout?: string }).stdout ?? '')
    }
    const encoded = Buffer.from(diff)
    return { path: target.path, diff: encoded.subarray(0, this.#maxFileBytes).toString('utf8'), truncated: encoded.byteLength > this.#maxFileBytes }
  }
}
