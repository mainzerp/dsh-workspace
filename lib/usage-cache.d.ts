/** Per-session cache for the sidebar usage summary. */
import type { LogUsage } from './aggregate.js';
/** One cached per-session fold together with the log revision it was computed from. */
export interface CachedUsage {
    revision: string;
    startTime: number;
    usage: LogUsage;
}
/** The snapshot facts the usage cache keys on. */
export interface UsageSnapshot {
    header: {
        id: string;
    };
    revision: string;
}
/**
 * Split the durable snapshots into cache hits and the ones needing a fresh
 * inspection.
 *
 * A hit requires the same log revision *and* the same day window: the stored
 * fold only covers `[startTime, now]`, so a new day (or a rewritten log)
 * invalidates it. Every session without a hit is inspected once and folded
 * immediately, which keeps a poll proportional to what actually changed
 * instead of to the whole corpus.
 * @param snapshots current durable session snapshots.
 * @param cache folds retained from earlier polls, keyed by session id.
 * @param startTime current day-window start.
 * @returns the retained hits plus the snapshots to inspect.
 */
export declare function selectStaleSnapshots<T extends UsageSnapshot>(snapshots: readonly T[], cache: ReadonlyMap<string, CachedUsage>, startTime: number): {
    hits: Map<string, CachedUsage>;
    stale: T[];
};
//# sourceMappingURL=usage-cache.d.ts.map