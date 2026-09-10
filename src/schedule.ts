/** Traffic period displayed by the UI scheduling hint. */
export type TrafficPeriod = 'idle' | 'peak'

/** Default peak windows in the configured schedule timezone: 01:00-04:00 and 06:00-10:00 UTC. */
export const DEFAULT_PEAK_WINDOWS: readonly (readonly [number, number])[] = [
  [1 * 60, 4 * 60],
  [6 * 60, 10 * 60],
]

/** Default peak weekdays (0 = Sunday .. 6 = Saturday): Monday through Friday. */
export const DEFAULT_PEAK_WEEKDAYS: readonly number[] = [1, 2, 3, 4, 5]

function norm(value: number): number {
  const dayMinutes = 1_440
  return ((value % dayMinutes) + dayMinutes) % dayMinutes
}

/**
 * @param now Unix epoch milliseconds.
 * @param timezoneOffsetMinutes minutes east of UTC.
 * @returns the weekday (0 = Sunday .. 6 = Saturday) of the local calendar day
 * that `now` falls into; 1970-01-01 was a Thursday.
 */
export function localWeekdayAt(now: number, timezoneOffsetMinutes: number): number {
  const localDays = Math.floor((now + timezoneOffsetMinutes * 60_000) / 86_400_000)
  return ((localDays + 4) % 7 + 7) % 7
}

/**
 * Classify a timestamp against a list of daily local-time peak windows.
 * A window is half-open (start inclusive, end exclusive) and may cross
 * midnight when start > end. A minute is 'peak' only when it falls inside a
 * window AND its local calendar day is listed in peakWeekdays; the weekday of
 * a crossing window's post-midnight part is the following local day.
 * @param now Unix epoch milliseconds.
 * @param timezoneOffsetMinutes minutes east of UTC.
 * @param peakWindows [start, end) local-minute windows; empty treats all as 'idle'.
 * @param peakWeekdays weekday numbers (0 = Sunday .. 6 = Saturday); empty treats all as 'idle'.
 */
export function trafficPeriodAt(
  now: number,
  timezoneOffsetMinutes: number,
  peakWindows: readonly (readonly [number, number])[],
  peakWeekdays: readonly number[] = DEFAULT_PEAK_WEEKDAYS,
): TrafficPeriod {
  const localMinutes = norm(Math.floor((now + timezoneOffsetMinutes * 60_000) / 60_000))
  if (!peakWeekdays.includes(localWeekdayAt(now, timezoneOffsetMinutes))) return 'idle'
  for (const [start, end] of peakWindows) {
    const startMinutes = norm(start)
    const endMinutes = norm(end)
    const inside = startMinutes < endMinutes
      ? localMinutes >= startMinutes && localMinutes < endMinutes
      : localMinutes >= startMinutes || localMinutes < endMinutes
    if (inside) return 'peak'
  }
  return 'idle'
}
