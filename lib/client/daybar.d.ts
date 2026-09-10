/**
 * Pure geometry for the rolling 24-hour billing-schedule bar in the sidebar balance card.
 *
 * The bar always shows the window [anchor - 6h, anchor + 18h): 1440 absolute minutes, no
 * calendar day and no timezone axis. Peak classification is not duplicated here: it is the
 * shared predicate `trafficPeriodAt` from `src/schedule.ts`, called once per window minute,
 * so the rendered segments and the billing rule cannot drift apart.
 */
import { DEFAULT_PEAK_WEEKDAYS } from '../schedule.js';
export { DEFAULT_PEAK_WEEKDAYS };
/** One peak stretch of the rolling window as fractions of the bar width. */
export interface BarSegment {
    /** Left edge, fraction of the window width; inclusive. */
    start: number;
    /** Right edge, fraction of the window width; exclusive. */
    end: number;
}
/** Everything the schedule bar renders. */
export interface ScheduleBarLayout {
    /** Peak segments in window order (left to right); empty when the whole window is off-peak. */
    segments: BarSegment[];
    /** Always MARKER_FRACTION: the anchor is pinned, so the marker never moves relative to the bar. */
    markerFraction: number;
}
/** Minutes of the window before the anchor: 6 hours. */
export declare const WINDOW_PAST_MINUTES = 360;
/** Minutes of the window after the anchor: 18 hours. */
export declare const WINDOW_FUTURE_MINUTES = 1080;
/** Total window length; the bar always spans exactly this many absolute minutes. */
export declare const WINDOW_MINUTES: number;
/** Fixed position of the anchor inside the window. */
export declare const MARKER_FRACTION: number;
/**
 * Lay out the rolling window of the sidebar bar.
 *
 * @param nowMs Unix epoch milliseconds (browser clock at render time), floored to the minute.
 * @param timezoneOffsetMinutes minutes east of UTC of the billing schedule.
 * @param peakWindows [start, end) schedule-local-minute windows; empty means off-peak.
 * @param peakWeekdays weekday numbers that may be peak; empty means off-peak.
 */
export declare function computeScheduleBar(nowMs: number, timezoneOffsetMinutes: number, peakWindows: readonly (readonly [number, number])[], peakWeekdays?: readonly number[]): ScheduleBarLayout;
//# sourceMappingURL=daybar.d.ts.map