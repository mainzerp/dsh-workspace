import type { SessionEvent } from '@deepseek-ai/dsh-session';
import type { UsageModel, UsageSummary, UsageTokenTotals } from './types.js';
/**
 * One persisted log's contribution to one day window.
 *
 * The summary endpoint caches this per session (keyed by log revision), so a
 * fold must depend on its own log only: merging contributions is a plain sum.
 * Caching the fold instead of the event array is what keeps a 30 s poll from
 * re-reading the whole corpus and materializing every event again.
 */
export interface LogUsage extends UsageTokenTotals {
    apiRequests: number;
    models: UsageModel[];
}
/** @param now current epoch milliseconds. @param offset minutes east of UTC. @returns local-day start. */
export declare function todayStart(now: number, offset: number): number;
/** @param events one persisted session log. @param startTime window start (inclusive). @param now window end (inclusive). @returns that log's usage contribution. */
export declare function logUsage(events: readonly SessionEvent[], startTime: number, now: number): LogUsage;
/** @param usages per-log contributions for one window. @param now window end. @param startTime window start. @returns the response summary. */
export declare function aggregateUsage(usages: readonly LogUsage[], now: number, startTime: number): UsageSummary;
/** @param logs persisted session logs. @param now right boundary. @param offset local-day offset. @returns today's usage. */
export declare function aggregateToday(logs: readonly (readonly SessionEvent[])[], now: number, offset?: number): UsageSummary;
//# sourceMappingURL=aggregate.d.ts.map