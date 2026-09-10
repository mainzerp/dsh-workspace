/**
 * Pure geometry for the rolling 24-hour billing-schedule bar in the sidebar balance card.
 *
 * The bar always shows the window [anchor - 6h, anchor + 18h): 1440 absolute minutes, no
 * calendar day and no timezone axis. Peak classification is not duplicated here: it is the
 * shared predicate `trafficPeriodAt` from `src/schedule.ts`, called once per window minute,
 * so the rendered segments and the billing rule cannot drift apart.
 */
import { DEFAULT_PEAK_WEEKDAYS, trafficPeriodAt } from '../schedule.js';
export { DEFAULT_PEAK_WEEKDAYS };
/** Minutes of the window before the anchor: 6 hours. */
export const WINDOW_PAST_MINUTES = 360;
/** Minutes of the window after the anchor: 18 hours. */
export const WINDOW_FUTURE_MINUTES = 1_080;
/** Total window length; the bar always spans exactly this many absolute minutes. */
export const WINDOW_MINUTES = WINDOW_PAST_MINUTES + WINDOW_FUTURE_MINUTES;
/** Fixed position of the anchor inside the window. */
export const MARKER_FRACTION = WINDOW_PAST_MINUTES / WINDOW_MINUTES;
/**
 * Lay out the rolling window of the sidebar bar.
 *
 * @param nowMs Unix epoch milliseconds (browser clock at render time), floored to the minute.
 * @param timezoneOffsetMinutes minutes east of UTC of the billing schedule.
 * @param peakWindows [start, end) schedule-local-minute windows; empty means off-peak.
 * @param peakWeekdays weekday numbers that may be peak; empty means off-peak.
 */
export function computeScheduleBar(nowMs, timezoneOffsetMinutes, peakWindows, peakWeekdays = DEFAULT_PEAK_WEEKDAYS) {
    const offset = Number.isFinite(timezoneOffsetMinutes) ? timezoneOffsetMinutes : 0;
    const anchorMs = Math.floor((Number.isFinite(nowMs) ? nowMs : 0) / 60_000) * 60_000;
    const startMs = anchorMs - WINDOW_PAST_MINUTES * 60_000;
    const segments = [];
    let open = -1;
    for (let index = 0; index < WINDOW_MINUTES; index += 1) {
        const minuteMs = startMs + index * 60_000;
        const peak = trafficPeriodAt(minuteMs, offset, peakWindows, peakWeekdays) === 'peak';
        if (peak) {
            if (open < 0)
                open = index;
            continue;
        }
        if (open >= 0) {
            segments.push({ start: open / WINDOW_MINUTES, end: index / WINDOW_MINUTES });
            open = -1;
        }
    }
    if (open >= 0)
        segments.push({ start: open / WINDOW_MINUTES, end: 1 });
    return { segments, markerFraction: MARKER_FRACTION };
}
//# sourceMappingURL=daybar.js.map