/** Traffic period displayed by the UI scheduling hint. */
export type TrafficPeriod = 'idle' | 'peak'

/**
 * Classify a timestamp against a daily local-time idle window.
 * @param now Unix epoch milliseconds.
 * @param timezoneOffsetMinutes minutes east of UTC.
 * @param idleStartMinutes local minutes after midnight.
 * @param idleEndMinutes local minutes after midnight.
 * @returns idle inside the half-open window; peak otherwise.
 */
export function trafficPeriodAt(
  now: number,
  timezoneOffsetMinutes: number,
  idleStartMinutes: number,
  idleEndMinutes: number,
): TrafficPeriod {
  const dayMinutes = 1_440
  const localMinutes = Math.floor((now + timezoneOffsetMinutes * 60_000) / 60_000) % dayMinutes
  const inside = idleStartMinutes < idleEndMinutes
    ? localMinutes >= idleStartMinutes && localMinutes < idleEndMinutes
    : localMinutes >= idleStartMinutes || localMinutes < idleEndMinutes
  return inside ? 'idle' : 'peak'
}
