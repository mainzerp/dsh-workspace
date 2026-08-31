/**
 * UI string table for the dsh-workspace client.
 *
 * `en` is the reference dictionary and the fallback default. To add a
 * language, copy `en`, translate every entry, and register the result in
 * `DICTIONARIES` — TypeScript enforces completeness via `Strings`.
 */
declare const en: {
    justNow: string;
    minutesAgo: (minutes: number) => string;
    hoursAgo: (hours: number) => string;
    daysAgo: (days: number) => string;
    noTerminalSessionId: string;
    terminalOpenFailed: (reason: string) => string;
    terminal: string;
    clearOutput: string;
    loading: string;
    previewTruncated: string;
    noTextualDiffForChange: string;
    noTextualDiffForCommit: string;
    readFailed: (reason: string) => string;
    projectPreview: string;
    loadingCurrentProject: string;
    dismiss: string;
    projectViews: string;
    explorer: string;
    sourceControl: string;
    refresh: string;
    referenceThisFile: string;
    referenceFile: (name: string) => string;
    listTruncated: string;
    collapseChanges: string;
    expandChanges: string;
    notGitRepository: string;
    noPendingChanges: string;
    collapseHistory: string;
    expandHistory: string;
    loadingHistory: string;
    noCommits: string;
    closeFile: string;
    closeFileName: (name: string) => string;
    imagePreview: string;
    binaryNoPreview: string;
    changesCount: (count: number) => string;
    notGitProject: string;
    project: string;
    balanceStatus: string;
    notAvailable: string;
    balance: string;
    offPeak: string;
    peak: string;
    offPeakBillingPeriod: string;
    peakBillingPeriod: string;
};
/** Shape of a complete translation. */
export type Strings = typeof en;
/** Active UI strings. */
export declare const t: Strings;
export {};
//# sourceMappingURL=i18n.d.ts.map