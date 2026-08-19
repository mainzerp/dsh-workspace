/** One project-tree entry returned by the read-only browser. */
export interface ProjectTreeEntry {
    path: string;
    name: string;
    kind: 'directory' | 'file';
    depth: number;
}
/** One Git working-tree change. */
export interface GitChange {
    path: string;
    status: string;
}
/** Project browser bootstrap response. */
export interface ProjectSnapshot {
    rootName: string;
    rootPath: string;
    entries: ProjectTreeEntry[];
    changes: GitChange[];
    truncated: boolean;
    gitAvailable: boolean;
}
/** UTF-8 project file preview response. */
export interface ProjectFilePreview {
    path: string;
    content: string;
    truncated: boolean;
    binary: boolean;
    mimeType?: string;
    dataUrl?: string;
}
/** Git diff preview response. */
export interface GitDiffPreview {
    path: string;
    diff: string;
    truncated: boolean;
}
/** One commit in the project history. */
export interface GitLogEntry {
    hash: string;
    shortHash: string;
    author: string;
    timestamp: number;
    subject: string;
}
/** Bounded git commit history response. */
export interface GitLogPreview {
    entries: GitLogEntry[];
}
/** One commit's text diff preview. */
export interface GitCommitPreview {
    hash: string;
    diff: string;
    truncated: boolean;
}
/** Token counters accumulated for one range or model. */
export interface UsageTokenTotals {
    inputTokens: number;
    outputTokens: number;
    cacheReadTokens: number;
    cacheWriteTokens: number;
    totalTokens: number;
}
/** One model's request and token totals. */
export interface UsageModel extends UsageTokenTotals {
    model: string;
    apiRequests: number;
}
/** Today's Harness-local usage totals. */
export interface UsageSummary extends UsageTokenTotals {
    startTime: number;
    endTime: number;
    apiRequests: number;
    cacheHitRate: number | null;
    models: UsageModel[];
}
/** One DeepSeek account currency balance. */
export interface BalanceInfo {
    currency: string;
    totalBalance: string;
    grantedBalance: string;
    toppedUpBalance: string;
}
/** Normalized DeepSeek balance response. */
export interface BalanceSnapshot {
    available: boolean | null;
    balances: BalanceInfo[];
    error?: string;
}
/** Local charge estimate using the bundled public tariff. */
export interface CostEstimate {
    amount: number;
    complete: boolean;
    unpricedModels: string[];
}
/** Today's billed amount: platform total when available, otherwise the local estimate. */
export interface UsageCostSnapshot {
    total: number;
    source: 'platform' | 'estimate';
}
/** Harness update check response. */
export interface UpdateCheck {
    currentVersion: string | null;
    latestVersion: string | null;
    outdated: boolean;
    checkedAt: number;
    error: string | null;
}
/** Harness update execution result. */
export interface UpdateRunResult {
    ok: boolean;
    message: string;
}
/** Self-contained dsh-workspace summary response. */
export interface UsageSnapshot {
    generatedAt: number;
    usage: UsageSummary;
    balance: BalanceSnapshot;
    estimatedCost: CostEstimate;
    cost: UsageCostSnapshot;
    ratePeriod: 'idle' | 'peak';
    trafficSchedule: {
        timezoneOffsetMinutes: number;
        peakWindows: readonly (readonly [number, number])[];
    };
}
//# sourceMappingURL=types.d.ts.map