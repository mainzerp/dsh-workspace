import type { GitCommitPreview, GitDiffPreview, GitLogPreview, GitLogRef, ProjectFilePreview, ProjectSnapshot } from './types.js';
/** @param decorations git %D output, e.g. `HEAD -> main, origin/main, tag: v1.2.0`. @returns typed refs. Note: %D gives no full ref paths, so a LOCAL branch named `feature/foo` is classified as `remote`. */
export declare function parseGitLogRefs(decorations: string): GitLogRef[];
/** Machine-readable error codes produced by the write operations. */
export type ProjectWriteErrorCode = 'FILE_EXISTS' | 'FILE_TOO_LARGE' | 'BINARY_CONTENT' | 'IS_DIRECTORY';
/** Root-confined project browser: read-only previews plus confined, size-capped file writes and root-level uploads. All writes stay inside `projectRoot`; traversal and symlink escapes are rejected, overwrite is opt-in. */
export declare class ProjectBrowser {
    #private;
    private constructor();
    /** @param root project root. @param maxEntries tree limit. @param maxFileBytes preview limit. @returns initialized browser. */
    static create(root: string, maxEntries: number, maxFileBytes: number): Promise<ProjectBrowser>;
    /** @returns bounded tree plus current Git status. */
    snapshot(): Promise<ProjectSnapshot>;
    /** @param input relative file path. @returns bounded file preview. */
    read(input: string): Promise<ProjectFilePreview>;
    /** @param input relative path of an existing text file. @param content new UTF-8 content. @returns written path and byte count. */
    write(input: string, content: string): Promise<{
        path: string;
        bytes: number;
    }>;
    /** @param name root-level basename. @param data raw bytes. @param overwrite allow replacing an existing file. @returns written path and byte count. */
    upload(name: string, data: Buffer, overwrite: boolean): Promise<{
        path: string;
        bytes: number;
    }>;
    /** @param input relative changed-file path. @returns bounded Git diff. */
    diff(input: string): Promise<GitDiffPreview>;
    /** @param input optional relative file path to filter history. @param limit max commits. @returns bounded commit history across all refs in topo order. */
    logs(input: string | undefined, limit: number): Promise<GitLogPreview>;
    /** @param hash commit id. @returns bounded text diff of one commit. */
    show(hash: string): Promise<GitCommitPreview>;
}
//# sourceMappingURL=project-browser.d.ts.map