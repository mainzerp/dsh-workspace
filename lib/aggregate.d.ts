import type { SessionEvent } from '@deepseek-ai/dsh-session';
import type { UsageSummary } from './types.js';
/** @param now current epoch milliseconds. @param offset minutes east of UTC. @returns local-day start. */
export declare function todayStart(now: number, offset: number): number;
/** @param logs persisted session logs. @param now right boundary. @param offset local-day offset. @returns today's usage. */
export declare function aggregateToday(logs: readonly (readonly SessionEvent[])[], now: number, offset?: number): UsageSummary;
//# sourceMappingURL=aggregate.d.ts.map