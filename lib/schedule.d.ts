/** Traffic period displayed by the UI scheduling hint. */
export type TrafficPeriod = 'idle' | 'peak';
/**
 * Classify a timestamp against a daily local-time idle window.
 * @param now Unix epoch milliseconds.
 * @param timezoneOffsetMinutes minutes east of UTC.
 * @param idleStartMinutes local minutes after midnight.
 * @param idleEndMinutes local minutes after midnight.
 * @returns idle inside the half-open window; peak otherwise.
 */
export declare function trafficPeriodAt(now: number, timezoneOffsetMinutes: number, idleStartMinutes: number, idleEndMinutes: number): TrafficPeriod;
//# sourceMappingURL=schedule.d.ts.map