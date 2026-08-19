/** Traffic period displayed by the UI scheduling hint. */
export type TrafficPeriod = 'idle' | 'peak';
/** Default local-time peak windows: Beijing 9:00-12:00 and 14:00-18:00. */
export declare const DEFAULT_PEAK_WINDOWS: readonly (readonly [number, number])[];
/**
 * Classify a timestamp against a list of daily local-time peak windows.
 * A window is half-open (start inclusive, end exclusive) and may cross
 * midnight when start > end. Times inside a peak window are 'peak';
 * everything else is 'idle'.
 * @param now Unix epoch milliseconds.
 * @param timezoneOffsetMinutes minutes east of UTC.
 * @param peakWindows [start, end) local-minute windows; empty treats all as 'idle'.
 */
export declare function trafficPeriodAt(now: number, timezoneOffsetMinutes: number, peakWindows: readonly (readonly [number, number])[]): TrafficPeriod;
//# sourceMappingURL=schedule.d.ts.map