import assert from 'node:assert/strict'
import test from 'node:test'
import * as daybar from '../lib/client/daybar.js'
import {
  DEFAULT_PEAK_WEEKDAYS, MARKER_FRACTION, WINDOW_FUTURE_MINUTES,
  WINDOW_MINUTES, WINDOW_PAST_MINUTES, computeScheduleBar,
} from '../lib/client/daybar.js'
import { trafficPeriodAt } from '../lib/schedule.js'

const WINDOW = WINDOW_MINUTES                       // 1440
const PEAK = [[60, 240], [360, 600]]                // the documented UTC rule
const slot = k => k / WINDOW                        // left edge of window minute k — exactly what the JSX renders
const mid = k => (k + 0.5) / WINDOW                 // centre of window minute k
const covers = (segments, f) => segments.some(s => f >= s.start && f < s.end)
// Absolute instant whose schedule-local clock reads the given wall time (0-based month).
// 2026-01-02 = Friday, 2026-01-03 = Saturday, 2026-01-04 = Sunday, 2026-01-05 = Monday,
// 2026-01-06 = Tuesday, 2026-01-07 = Wednesday.
const LOCAL = (offset, month, day, hour, minute = 0) => Date.UTC(2026, month, day, hour, minute) - offset * 60_000

test('the module exposes exactly the rolling-window API', () => {
  assert.deepEqual(Object.keys(daybar).sort(), [
    'DEFAULT_PEAK_WEEKDAYS', 'MARKER_FRACTION', 'WINDOW_FUTURE_MINUTES',
    'WINDOW_MINUTES', 'WINDOW_PAST_MINUTES', 'computeScheduleBar',
  ])
  assert.equal(WINDOW_PAST_MINUTES, 360)
  assert.equal(WINDOW_FUTURE_MINUTES, 1080)
  assert.equal(WINDOW_MINUTES, 1440)
  assert.equal(WINDOW_MINUTES, WINDOW_PAST_MINUTES + WINDOW_FUTURE_MINUTES)
  assert.equal(MARKER_FRACTION, 0.25)
  assert.deepEqual([...DEFAULT_PEAK_WEEKDAYS], [1, 2, 3, 4, 5])
})

test('an always-peak rule paints the whole window', () => {
  // Local Monday 12:00; the window Monday 06:00 -> Tuesday 06:00 lies on peak weekdays only.
  const anchor = LOCAL(0, 0, 5, 12)
  // A window whose folded endpoints are equal matches every minute (localMinutes >= 60 || localMinutes < 60).
  for (const windows of [[[60, 60]], [[0, 1440]], [[1500, 60]]]) {
    const layout = computeScheduleBar(anchor, 0, windows)
    assert.deepEqual(layout.segments, [{ start: 0, end: 1 }])
    assert.equal(layout.markerFraction, MARKER_FRACTION)
  }
})

test('segments follow the absolute peak intervals', () => {
  // Window Sunday 18:00 -> Monday 18:00: only Monday's two runs fall inside it.
  assert.deepEqual(computeScheduleBar(LOCAL(0, 0, 5, 0), 0, PEAK).segments, [
    { start: 420 / 1440, end: 600 / 1440 },
    { start: 720 / 1440, end: 960 / 1440 },
  ])
  // Window Friday 06:00 -> Saturday 06:00: the Friday 06:00-10:00 run starts exactly at the window edge.
  assert.deepEqual(computeScheduleBar(LOCAL(0, 0, 2, 12), 0, PEAK).segments, [{ start: 0, end: 240 / 1440 }])
  // Window Wednesday 01:30 -> Thursday 01:30: clipped at both edges.
  assert.deepEqual(computeScheduleBar(LOCAL(0, 0, 7, 7, 30), 0, PEAK).segments, [
    { start: 0, end: 150 / 1440 },
    { start: 270 / 1440, end: 510 / 1440 },
    { start: 1410 / 1440, end: 1 },
  ])
  // The window is anchored in absolute time: UTC+8 keeps the same layout for the same local wall clock.
  assert.deepEqual(computeScheduleBar(LOCAL(480, 0, 2, 12), 480, PEAK).segments, [{ start: 0, end: 240 / 1440 }])
})

test('half-open boundaries hold inside the window', () => {
  // Window Sunday 18:00 -> Monday 18:00 pins the Sunday/Monday edges.
  const monday = computeScheduleBar(LOCAL(0, 0, 5, 0), 0, PEAK).segments
  assert.equal(covers(monday, mid(419)), false)   // Sunday 23:59
  assert.equal(covers(monday, mid(420)), true)    // Monday 01:00
  assert.equal(covers(monday, mid(599)), true)    // Monday 03:59
  assert.equal(covers(monday, mid(600)), false)   // Monday 04:00
  assert.equal(covers(monday, mid(717)), false)   // Monday 05:57
  assert.equal(covers(monday, mid(719)), false)   // Monday 05:59
  assert.equal(covers(monday, mid(720)), true)    // Monday 06:00
  assert.equal(covers(monday, mid(959)), true)    // Monday 09:59
  assert.equal(covers(monday, mid(960)), false)   // Monday 10:00
  assert.equal(covers(monday, mid(1140)), false)  // Monday 13:00
  assert.equal(covers(monday, mid(1319)), false)  // Monday 15:59
  // Window Monday 06:00 -> Tuesday 06:00 pins the Monday/Tuesday edges.
  const tuesday = computeScheduleBar(LOCAL(0, 0, 5, 12), 0, PEAK).segments
  assert.equal(covers(tuesday, mid(1139)), false) // Tuesday 00:59
  assert.equal(covers(tuesday, mid(1140)), true)  // Tuesday 01:00
  assert.equal(covers(tuesday, mid(1319)), true)  // Tuesday 03:59
  assert.equal(covers(tuesday, mid(1320)), false) // Tuesday 04:00
})

test('a crossing window is contiguous unless the weekday gate cuts it', () => {
  // 22:00 -> 06:00 crossing local midnight; window Friday 06:00 -> Saturday 06:00,
  // so minute 960 is Friday 22:00, 1080 is Saturday 06:00 and local midnight lies at 864.
  const anchor = LOCAL(0, 0, 2, 12)
  const fridayOnly = computeScheduleBar(anchor, 0, [[1320, 360]], [5]).segments
  assert.deepEqual(fridayOnly, [{ start: 960 / 1440, end: 1080 / 1440 }])
  assert.equal(covers(fridayOnly, slot(1080)), false)
  assert.deepEqual(computeScheduleBar(anchor, 0, [[1320, 360]], [5, 6]).segments, [{ start: 960 / 1440, end: 1 }])
  assert.deepEqual(computeScheduleBar(anchor, 0, [[1320, 360]], [6]).segments, [{ start: 1080 / 1440, end: 1 }])
  // Window Friday 15:00 -> Saturday 15:00: one run of 540 minutes through the internal midnight boundary.
  assert.deepEqual(computeScheduleBar(LOCAL(0, 0, 2, 21), 0, [[1320, 360]], [5, 6]).segments, [
    { start: 420 / 1440, end: 900 / 1440 },
  ])
  assert.deepEqual(computeScheduleBar(anchor, 0, [[1320, 360]], []).segments, [])
})

test('folded and degenerate endpoints still match the server folding', () => {
  // Window Monday 06:00 -> Tuesday 06:00.
  const anchor = LOCAL(0, 0, 5, 12)
  assert.deepEqual(computeScheduleBar(anchor, 0, [[1440, 60]]).segments, [{ start: 1080 / 1440, end: 1140 / 1440 }])
  assert.deepEqual(computeScheduleBar(anchor, 0, [[60, 60]]).segments, [{ start: 0, end: 1 }])
  assert.deepEqual(computeScheduleBar(anchor, 0, [[0, 1440]]).segments, [{ start: 0, end: 1 }])
  assert.deepEqual(computeScheduleBar(anchor, 0, [[1500, 60]]).segments, [{ start: 0, end: 1 }])
})

test('weekends are off-peak only where the window falls on them', () => {
  // Window Saturday 06:00 -> Sunday 06:00 is entirely weekend.
  assert.deepEqual(computeScheduleBar(LOCAL(0, 0, 3, 12), 0, PEAK).segments, [])
  // Window Sunday 06:00 -> Monday 06:00: only Monday 01:00-04:00 lies inside; the Monday
  // 06:00-10:00 run starts exactly at the window end and is exclusive.
  assert.deepEqual(computeScheduleBar(LOCAL(0, 0, 4, 12), 0, PEAK).segments, [{ start: 1140 / 1440, end: 1320 / 1440 }])
  // With Saturday and Sunday as peak weekdays the same window has two runs.
  assert.deepEqual(computeScheduleBar(LOCAL(0, 0, 3, 12), 0, PEAK, [0, 6]).segments, [
    { start: 0, end: 240 / 1440 },
    { start: 1140 / 1440, end: 1320 / 1440 },
  ])
  // Saturday and Sunday are off-peak weekdays, so the default weekday set paints nothing.
  assert.deepEqual(computeScheduleBar(LOCAL(0, 0, 3, 12), 0, [[1320, 120]]).segments, [])
  // Saturday alone gives only the pre-midnight part of the crossing window.
  assert.deepEqual(computeScheduleBar(LOCAL(0, 0, 3, 12), 0, [[1320, 120]], [6]).segments, [
    { start: 960 / 1440, end: 1080 / 1440 },
  ])
})

test('the marker is pinned at 25% and the content slides under it', () => {
  const anchors = [
    0, LOCAL(0, 0, 5, 0), LOCAL(0, 0, 5, 12),
    LOCAL(0, 0, 5, 23, 59), LOCAL(0, 0, 5, 23, 59) + 59_999, LOCAL(480, 0, 4, 16), Number.NaN,
  ]
  for (const anchor of anchors) {
    assert.equal(computeScheduleBar(anchor, 0, PEAK).markerFraction, MARKER_FRACTION)
  }
  // Shifting the anchor by d minutes earlier shifts every unclipped segment right by exactly d/1440.
  const a1 = LOCAL(0, 0, 5, 0)
  assert.deepEqual(computeScheduleBar(a1, 0, [[60, 240]]).segments, [{ start: 420 / 1440, end: 600 / 1440 }])
  const a2 = a1 - 60 * 60_000
  assert.deepEqual(computeScheduleBar(a2, 0, [[60, 240]]).segments, [{ start: 480 / 1440, end: 660 / 1440 }])
  assert.equal(computeScheduleBar(a2, 0, [[60, 240]]).markerFraction, MARKER_FRACTION)
})

test('the anchor is floored to the minute', () => {
  const base = Date.UTC(2026, 0, 5, 8, 30)
  assert.deepEqual(computeScheduleBar(base + 59_999, 0, PEAK), computeScheduleBar(base, 0, PEAK))
  assert.notDeepEqual(computeScheduleBar(base, 0, PEAK), computeScheduleBar(base + 60_000, 0, PEAK))
})

test('degenerate input never yields NaN geometry', () => {
  // NaN falls back to epoch 0; Infinity to the same 0 fallbacks; the layouts must be identical.
  assert.deepEqual(computeScheduleBar(Number.NaN, 0, PEAK), computeScheduleBar(0, 0, PEAK))
  assert.deepEqual(computeScheduleBar(Number.POSITIVE_INFINITY, 0, PEAK), computeScheduleBar(0, 0, PEAK))
  assert.deepEqual(computeScheduleBar(LOCAL(0, 0, 5, 12), Number.NaN, PEAK), computeScheduleBar(LOCAL(0, 0, 5, 12), 0, PEAK))
  assert.deepEqual(computeScheduleBar(LOCAL(0, 0, 5, 12), Number.POSITIVE_INFINITY, PEAK), computeScheduleBar(LOCAL(0, 0, 5, 12), 0, PEAK))
  // A non-finite endpoint is not "no window": the shared classifier compares NaN, `startMinutes <
  // endMinutes` is false, and the crossing branch's `localMinutes < endMinutes` then paints every
  // minute below `end` as peak, so only the window minutes where end <= localMinutes < start survive
  // as the off-peak gap. Anchor Monday 12:00 -> window Monday 06:00 to Tuesday 06:00, so the gap is
  // Tuesday 00:00-00:59. Both endpoints NaN stay idle: neither branch can be true.
  assert.deepEqual(computeScheduleBar(LOCAL(0, 0, 5, 12), 0, [[Number.NaN, 60]]).segments, [
    { start: 1080 / 1440, end: 1140 / 1440 },
  ])
  assert.deepEqual(computeScheduleBar(LOCAL(0, 0, 5, 12), 0, [[Number.NaN, Number.NaN]]).segments, [])
  assert.deepEqual(computeScheduleBar(LOCAL(0, 0, 5, 12), 0, []).segments, [])
  assert.deepEqual(computeScheduleBar(LOCAL(0, 0, 5, 12), 0, PEAK, []).segments, [])
  for (const anchor of [Number.NaN, Number.POSITIVE_INFINITY, LOCAL(0, 0, 5, 12)]) {
    for (const offset of [Number.NaN, Number.POSITIVE_INFINITY, 0]) {
      for (const segment of computeScheduleBar(anchor, offset, PEAK).segments) {
        assert.ok(Number.isFinite(segment.start) && Number.isFinite(segment.end))
        assert.ok(segment.start >= 0 && segment.end <= 1 && segment.start < segment.end)
      }
    }
  }
})

test('segments are sorted, disjoint and non-touching', () => {
  const cases = [
    [LOCAL(0, 0, 5, 0), PEAK, undefined],
    [LOCAL(0, 0, 7, 7, 30), PEAK, undefined],
    [LOCAL(0, 0, 2, 12), [[1320, 360]], [5, 6]],
    [LOCAL(480, 0, 4, 12), PEAK, undefined],
    [LOCAL(0, 0, 4, 12), PEAK, [0, 6]],
  ]
  for (const [anchor, windows, weekdays] of cases) {
    const { segments } = computeScheduleBar(anchor, 0, windows, weekdays)
    for (let i = 0; i < segments.length; i += 1) {
      const segment = segments[i]
      assert.ok(segment.start >= 0 && segment.end <= 1 && segment.start < segment.end)
      assert.ok(Number.isFinite(segment.start) && Number.isFinite(segment.end))
      if (i > 0) assert.ok(segments[i - 1].end < segment.start, `strictly ascending at ${i}`)
    }
  }
})

test('empty weekday and empty window lists are off-peak', () => {
  const noWeekdays = computeScheduleBar(LOCAL(0, 0, 5, 12), 0, PEAK, [])
  assert.deepEqual(noWeekdays.segments, [])
  assert.equal(noWeekdays.markerFraction, MARKER_FRACTION)
  const noWindows = computeScheduleBar(LOCAL(0, 0, 5, 12), 0, [])
  assert.deepEqual(noWindows.segments, [])
  assert.equal(noWindows.markerFraction, MARKER_FRACTION)
})

// The client module imports `trafficPeriodAt`, so this does not guard duplicated arithmetic: it
// guards the mapping "window minute -> fraction" at the window edges and at local-midnight/peak
// boundaries. Every fraction is an exact binary rational of /1440 and `covers` mirrors the
// half-open JSX comparison, so a few thousand probes prove the mapping by construction.
function sweep(offset, anchorMs, windows, weekdays, stride = 1) {
  const layout = computeScheduleBar(anchorMs, offset, windows, weekdays)
  const startMs = Math.floor(anchorMs / 60_000) * 60_000 - WINDOW_PAST_MINUTES * 60_000
  for (let k = 0; k < WINDOW; k += stride) {
    const expected = trafficPeriodAt(startMs + k * 60_000, offset, windows, weekdays) === 'peak'
    const left = covers(layout.segments, k / WINDOW)
    const centre = covers(layout.segments, (k + 0.5) / WINDOW)
    if (left !== expected || centre !== expected) {
      assert.fail(`k=${k} anchor=${new Date(anchorMs).toISOString()} offset=${offset} ` +
        `windows=${JSON.stringify(windows)} weekdays=${JSON.stringify(weekdays)} ` +
        `expected=${expected} left=${left} centre=${centre} segments=${JSON.stringify(layout.segments)}`)
    }
  }
  assert.equal(layout.markerFraction, MARKER_FRACTION, 'the marker never moves')
}

// Coverage rule: the anchors include windows containing a local-midnight boundary, a
// weekend<->weekday transition, a start inside a peak run and an end inside a peak run.
test('every window minute is rendered as the server classifier rates it', () => {
  assert.deepEqual(computeScheduleBar(LOCAL(0, 0, 5, 12), 0, PEAK).segments, [
    { start: 0, end: 240 / 1440 },
    { start: 1140 / 1440, end: 1320 / 1440 },
  ])
  sweep(0, LOCAL(0, 0, 5, 12), PEAK, DEFAULT_PEAK_WEEKDAYS)
  sweep(0, LOCAL(0, 0, 5, 0), PEAK, DEFAULT_PEAK_WEEKDAYS)
  sweep(0, LOCAL(0, 0, 7, 7, 30), PEAK, DEFAULT_PEAK_WEEKDAYS)
  sweep(480, LOCAL(480, 0, 2, 12), PEAK, DEFAULT_PEAK_WEEKDAYS)

  const windowSets = [[[1320, 360]], [[1440, 60]], [[1500, 60]], [[60, 60]], [[0, 1440]], [[0, 1]], [[1439, 1440]], []]
  const weekdaySets = [DEFAULT_PEAK_WEEKDAYS, [0, 6], [0, 1, 2, 3, 4, 5, 6], []]
  const stride13 = [LOCAL(0, 0, 5, 0), LOCAL(0, 0, 3, 12), LOCAL(0, 0, 4, 23, 59)]
  const stride7 = [LOCAL(0, 0, 2, 23, 59), LOCAL(480, 0, 4, 12)]
  for (const windows of windowSets) {
    for (const weekdays of weekdaySets) {
      for (const anchor of stride13) sweep(0, anchor, windows, weekdays, 13)
      for (const anchor of stride7) sweep(0, anchor, windows, weekdays, 7)
    }
  }
})
