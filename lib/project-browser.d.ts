import type { GitCommitPreview, GitDiffPreview, GitLogPreview, ProjectFilePreview, ProjectSnapshot } from './types.js';
/** Read-only, root-confined project and Git preview implementation. */
export declare class ProjectBrowser {
    #private;
    private constructor();
    /** @param root project root. @param maxEntries tree limit. @param maxFileBytes preview limit. @returns initialized browser. */
    static create(root: string, maxEntries: number, maxFileBytes: number): Promise<ProjectBrowser>;
    /** @returns bounded tree plus current Git status. */
    snapshot(): Promise<ProjectSnapshot>;
    /** @param input relative file path. @returns bounded file preview. */
    read(input: string): Promise<ProjectFilePreview>;
    /** @param input relative changed-file path. @returns bounded Git diff. */
    diff(input: string): Promise<GitDiffPreview>;
    /** @param input optional relative file path to filter history. @param limit max commits. @returns bounded commit history. */
    logs(input: string | undefined, limit: number): Promise<GitLogPreview>;
    /** @param hash commit id. @returns bounded text diff of one commit. */
    show(hash: string): Promise<GitCommitPreview>;
}
//# sourceMappingURL=project-browser.d.ts.map