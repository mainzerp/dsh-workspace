import assert from 'node:assert/strict'
import test from 'node:test'
import { computeDayBar, DAYBAR_TICKS, DEFAULT_PEAK_WEEKDAYS, MINUTES_PER_DAY, weekdayAt } from '../lib/client/daybar.js'
import { trafficPeriodAt } from '../lib/schedule.js'

const PEAK = [[60, 240], [360, 600]]              // documented UTC schedule
const MONDAY = Date.UTC(2026, 0, 5, 0, 0)          // Monday 00:00 UTC
const SATURDAY = Date.UTC(2026, 0, 3, 0, 0)        // Saturday 00:00 UTC
const at = (base, minute) => base + minute * 60_000
const covers = (segments, minute) => segments.some(s => minute / MINUTES_PER_DAY >= s.start && minute / MINUTES_PER_DAY < s.end)

test('weekday peak segments match the documented windows', () => {
  const layout = computeDayBar(at(MONDAY, 180), 0, PEAK)
  assert.deepEqual(layout.segments, [
    { start: 60 / MINUTES_PER_DAY, end: 240 / MINUTES_PER_DAY },
    { start: 360 / MINUTES_PER_DAY, end: 600 / MINUTES_PER_DAY },
  ])
  assert.equal(layout.peakDay, true)
  assert.equal(layout.markerFraction, 180 / MINUTES_PER_DAY)
})

test('half-open edges are respected', () => {
  const { segments } = computeDayBar(at(MONDAY, 180), 0, PEAK)
  assert.equal(covers(segments, 59), false)
  assert.equal(covers(segments, 60), true)
  assert.equal(covers(segments, 239), true)
  assert.equal(covers(segments, 240), false)
  assert.equal(covers(segments, 359), false)
  assert.equal(covers(segments, 360), true)
  assert.equal(covers(segments, 600), false)
})

test('a window crossing midnight becomes two edge segments', () => {
  const { segments } = computeDayBar(at(MONDAY, 1440 + 120), 0, [[1320, 360]])
  assert.deepEqual(segments, [
    { start: 1320 / MINUTES_PER_DAY, end: 1 },
    { start: 0, end: 360 / MINUTES_PER_DAY },
  ])
  assert.equal(covers(segments, 0), true)
  assert.equal(covers(segments, 359), true)
  assert.equal(covers(segments, 360), false)
  assert.equal(covers(segments, 1319), false)
  assert.equal(covers(segments, 1320), true)
  assert.equal(covers(segments, 1439), true)
})

test('folded endpoints follow the server folding', () => {
  const folded = computeDayBar(at(MONDAY, 180), 0, [[1440, 60]]).segments
  assert.deepEqual(folded, [{ start: 0, end: 60 / MINUTES_PER_DAY }])
  assert.equal(covers(folded, 0), true)
  assert.equal(covers(folded, 59), true)
  assert.equal(covers(folded, 60), false)
  // 1500 folds to 60, so both endpoints are 60 and the whole day is peak.
  assert.deepEqual(computeDayBar(at(MONDAY, 180), 0, [[1500, 60]]).segments, [{ start: 0, end: 1 }])
})

test('a degenerate window with equal folded endpoints covers the whole day', () => {
  assert.deepEqual(computeDayBar(at(MONDAY, 180), 0, [[60, 60]]).segments, [{ start: 0, end: 1 }])
  assert.deepEqual(computeDayBar(at(MONDAY, 180), 0, [[0, 1440]]).segments, [{ start: 0, end: 1 }])
})

test('weekends are entirely off-peak', () => {
  const saturdayLayout = computeDayBar(at(SATURDAY, 120), 0, PEAK)
  assert.deepEqual(saturdayLayout.segments, [])
  assert.equal(saturdayLayout.peakDay, false)
  const sundayLayout = computeDayBar(Date.UTC(2026, 0, 4, 12), 0, PEAK)
  assert.deepEqual(sundayLayout.segments, [])
  assert.equal(sundayLayout.peakDay, false)
  const weekendLayout = computeDayBar(Date.UTC(2026, 0, 4, 12), 0, PEAK, [0, 6])
  assert.deepEqual(weekendLayout.segments, [
    { start: 60 / MINUTES_PER_DAY, end: 240 / MINUTES_PER_DAY },
    { start: 360 / MINUTES_PER_DAY, end: 600 / MINUTES_PER_DAY },
  ])
  assert.equal(weekendLayout.peakDay, true)
})

test('an empty peakWeekdays list is off-peak every day', () => {
  const layout = computeDayBar(at(MONDAY, 180), 0, PEAK, [])
  assert.deepEqual(layout.segments, [])
  assert.equal(layout.peakDay, false)
})

test('an empty window list produces no segments', () => {
  const layout = computeDayBar(at(MONDAY, 180), 0, [])
  assert.deepEqual(layout.segments, [])
  assert.equal(layout.markerFraction, 180 / MINUTES_PER_DAY)
})

test('the marker follows the local minute', () => {
  assert.equal(computeDayBar(at(MONDAY, 0), 0, PEAK).markerFraction, 0)
  assert.equal(computeDayBar(at(MONDAY, 720), 0, PEAK).markerFraction, 0.5)
  assert.equal(computeDayBar(at(MONDAY, 1439), 0, PEAK).markerFraction, 1439 / MINUTES_PER_DAY)
  assert.equal(computeDayBar(at(MONDAY, 1439) + 59_999, 0, PEAK).markerFraction, 1439 / MINUTES_PER_DAY)
  // Sunday 16:00 UTC is Monday 00:00 at UTC+8.
  const shifted = computeDayBar(Date.UTC(2026, 0, 4, 16), 480, PEAK)
  assert.equal(shifted.markerFraction, 0)
  assert.equal(shifted.peakDay, true)
})

test('degenerate input never yields NaN geometry', () => {
  assert.equal(computeDayBar(Number.NaN, 0, PEAK).markerFraction, 0)
  assert.equal(computeDayBar(MONDAY, Number.NaN, PEAK).markerFraction, 0)
  assert.deepEqual(computeDayBar(MONDAY, 0, [[Number.NaN, 60]]).segments, [])
})

test('ticks mark 06:00, 12:00 and 18:00', () => {
  assert.deepEqual(DAYBAR_TICKS, [0.25, 0.5, 0.75])
  assert.deepEqual([...DEFAULT_PEAK_WEEKDAYS], [1, 2, 3, 4, 5])
})

test('weekdayAt is the UTC weekday of the shifted instant', () => {
  assert.equal(weekdayAt(Date.UTC(2026, 0, 5)), 1)
  assert.equal(weekdayAt(Date.UTC(2026, 0, 3)), 6)
  assert.equal(weekdayAt(0), 4)
})

test('the bar agrees with the server classifier for every minute of the day', () => {
  const windowSets = [PEAK, [[1320, 360]], [[1440, 60]], [[60, 60]], []]
  for (const windows of windowSets) {
    for (const base of [MONDAY, SATURDAY]) {
      for (let minute = 0; minute < MINUTES_PER_DAY; minute += 1) {
        const layout = computeDayBar(at(base, minute), 0, windows)
        const classified = trafficPeriodAt(at(base, minute), 0, windows, [1, 2, 3, 4, 5]) === 'peak'
        assert.equal(covers(layout.segments, minute), classified, `minute ${minute} of ${JSON.stringify(windows)}`)
      }
    }
  }
})
