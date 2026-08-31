/** Traffic period displayed by the UI scheduling hint. */
export type TrafficPeriod = 'idle' | 'peak'

/** Default local-time peak windows: Beijing 9:00-12:00 and 14:00-18:00. */
export const DEFAULT_PEAK_WINDOWS: readonly (readonly [number, number])[] = [
  [9 * 60, 12 * 60],
  [14 * 60, 18 * 60],
]

function norm(value: number): number {
  const dayMinutes = 1_440
  return ((value % dayMinutes) + dayMinutes) % dayMinutes
}

/**
 * Classify a timestamp against a list of daily local-time peak windows.
 * A window is half-open (start inclusive, end exclusive) and may cross
 * midnight when start > end. Times inside a peak window are 'peak';
 * everything else is 'idle'.
 * @param now Unix epoch milliseconds.
 * @param timezoneOffsetMinutes minutes east of UTC.
 * @param peakWindows [start, end) local-minute windows; empty treats all as 'idle'.
 */
export function trafficPeriodAt(
  now: number,
  timezoneOffsetMinutes: number,
  peakWindows: readonly (readonly [number, number])[],
): TrafficPeriod {
  const localMinutes = norm(Math.floor((now + timezoneOffsetMinutes * 60_000) / 60_000))
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
