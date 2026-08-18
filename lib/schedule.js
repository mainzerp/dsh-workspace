/**
 * Classify a timestamp against a daily local-time idle window.
 * @param now Unix epoch milliseconds.
 * @param timezoneOffsetMinutes minutes east of UTC.
 * @param idleStartMinutes local minutes after midnight.
 * @param idleEndMinutes local minutes after midnight.
 * @returns idle inside the half-open window; peak otherwise.
 */
export function trafficPeriodAt(now, timezoneOffsetMinutes, idleStartMinutes, idleEndMinutes) {
    const dayMinutes = 1_440;
    const localMinutes = Math.floor((now + timezoneOffsetMinutes * 60_000) / 60_000) % dayMinutes;
    const inside = idleStartMinutes < idleEndMinutes
        ? localMinutes >= idleStartMinutes && localMinutes < idleEndMinutes
        : localMinutes >= idleStartMinutes || localMinutes < idleEndMinutes;
    return inside ? 'idle' : 'peak';
}
//# sourceMappingURL=schedule.js.map