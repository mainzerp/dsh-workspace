/**
 * Pure geometry for the 24-hour billing-schedule bar in the sidebar balance card.
 *
 * Mirrors the peak-window semantics of `src/schedule.ts` (half-open windows,
 * endpoints folded into the local day, start > end crossing midnight) without
 * importing it, so the module stays dependency-free.
 */
/** One peak stretch of the day as fractions of the bar width. */
export interface DayBarSegment {
    /** Left edge (0 = local midnight); inclusive. */
    start: number;
    /** Right edge (1 = local midnight); exclusive. */
    end: number;
}
/** Everything the day bar renders. */
export interface DayBarLayout {
    /** Peak segments in window order; empty when the local day is off-peak throughout. */
    segments: DayBarSegment[];
    /** Current local-time position (0 = local midnight, 1 = local midnight). */
    markerFraction: number;
    /** True when the local day is a peak weekday. */
    peakDay: boolean;
}
/** Minutes in a local day; must match the .hui-daybar scale in DAYBAR_STYLES. */
export declare const MINUTES_PER_DAY = 1440;
/** Peak weekday numbers (0 = Sunday .. 6 = Saturday): Monday through Friday. */
export declare const DEFAULT_PEAK_WEEKDAYS: readonly number[];
/** Subtle scale ticks at 06:00, 12:00 and 18:00, as fractions of the bar width. */
export declare const DAYBAR_TICKS: readonly number[];
/**
 * @param epochMs Unix epoch milliseconds already shifted into the schedule timezone.
 * @returns the weekday (0 = Sunday .. 6 = Saturday); 1970-01-01 was a Thursday.
 */
export declare function weekdayAt(epochMs: number): number;
/**
 * Lay out one local day for the sidebar bar.
 * @param nowMs Unix epoch milliseconds (browser clock at render time).
 * @param timezoneOffsetMinutes minutes east of UTC of the billing schedule.
 * @param peakWindows [start, end) local-minute windows; empty means off-peak all day.
 * @param peakWeekdays weekday numbers that may be peak; empty means off-peak all day.
 */
export declare function computeDayBar(nowMs: number, timezoneOffsetMinutes: number, peakWindows: readonly (readonly [number, number])[], peakWeekdays?: readonly number[]): DayBarLayout;
//# sourceMappingURL=daybar.d.ts.map