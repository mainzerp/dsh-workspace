import assert from 'node:assert/strict'
import test from 'node:test'
import { DEFAULT_PEAK_WEEKDAYS, DEFAULT_PEAK_WINDOWS, trafficPeriodAt } from '../lib/schedule.js'

// Beijing = UTC+8.
const utc8Window = (hour, minute) => Date.UTC(2026, 0, 1, hour - 8, minute)
const beijingPeaks = [[9 * 60, 12 * 60], [14 * 60, 18 * 60]]

test('default Beijing peak windows: 9-12 and 14-18', () => {
  assert.equal(trafficPeriodAt(utc8Window(8, 59), 480, beijingPeaks), 'idle')
  assert.equal(trafficPeriodAt(utc8Window(9, 0), 480, beijingPeaks), 'peak')
  assert.equal(trafficPeriodAt(utc8Window(11, 59), 480, beijingPeaks), 'peak')
  assert.equal(trafficPeriodAt(utc8Window(12, 0), 480, beijingPeaks), 'idle')
  assert.equal(trafficPeriodAt(utc8Window(13, 59), 480, beijingPeaks), 'idle')
  assert.equal(trafficPeriodAt(utc8Window(14, 0), 480, beijingPeaks), 'peak')
  assert.equal(trafficPeriodAt(utc8Window(17, 59), 480, beijingPeaks), 'peak')
  assert.equal(trafficPeriodAt(utc8Window(18, 0), 480, beijingPeaks), 'idle')
  assert.equal(trafficPeriodAt(utc8Window(20, 0), 480, beijingPeaks), 'idle')
})

test('supports a peak window that crosses midnight', () => {
  const crossings = [[22 * 60, 6 * 60]]
  assert.equal(trafficPeriodAt(Date.UTC(2026, 0, 1, 23, 0), 0, crossings), 'peak')
  assert.equal(trafficPeriodAt(Date.UTC(2026, 0, 1, 2, 0), 0, crossings), 'peak')
  assert.equal(trafficPeriodAt(Date.UTC(2026, 0, 1, 12, 0), 0, crossings), 'idle')
})

test('empty peak windows treat the whole day as idle', () => {
  assert.equal(trafficPeriodAt(utc8Window(10, 0), 480, []), 'idle')
})

test('window endpoints are folded into the 0-1440 range', () => {
  // start=1440 equals 0; end=0 equals 1440, so the window covers 00:00-01:00.
  assert.equal(trafficPeriodAt(utc8Window(0, 30), 480, [[1_440, 60]]), 'peak')
})

// 2026-01-05 is a Monday, 2026-01-03 a Saturday.
const monday = (hour, minute = 0) => Date.UTC(2026, 0, 5, hour, minute)
const saturday = (hour, minute = 0) => Date.UTC(2026, 0, 3, hour, minute)

test('peak hours apply Monday through Friday only', () => {
  assert.equal(trafficPeriodAt(saturday(2), 0, [[60, 240]]), 'idle')
  assert.equal(trafficPeriodAt(monday(2), 0, [[60, 240]]), 'peak')
})

test('the weekday follows the configured timezone, not UTC', () => {
  // Friday 18:00 UTC is Saturday 02:00 at UTC+8.
  assert.equal(trafficPeriodAt(Date.UTC(2026, 0, 2, 18), 480, [[60, 240]]), 'idle')
  assert.equal(trafficPeriodAt(Date.UTC(2026, 0, 2, 18), 480, [[60, 240]], [6]), 'peak')
})

test('an explicit peakWeekdays list overrides the default', () => {
  assert.equal(trafficPeriodAt(saturday(2), 0, [[60, 240]], [6]), 'peak')
  assert.equal(trafficPeriodAt(monday(2), 0, [[60, 240]], [0, 6]), 'idle')
  assert.equal(trafficPeriodAt(monday(2), 0, [[60, 240]], []), 'idle')
})

test('the default peak windows match the documented UTC schedule', () => {
  assert.deepEqual(DEFAULT_PEAK_WINDOWS, [[60, 240], [360, 600]])
  assert.deepEqual(DEFAULT_PEAK_WEEKDAYS, [1, 2, 3, 4, 5])
  assert.equal(trafficPeriodAt(monday(3, 59), 0, DEFAULT_PEAK_WINDOWS), 'peak')
  assert.equal(trafficPeriodAt(monday(4, 0), 0, DEFAULT_PEAK_WINDOWS), 'idle')
  assert.equal(trafficPeriodAt(monday(5, 59), 0, DEFAULT_PEAK_WINDOWS), 'idle')
  assert.equal(trafficPeriodAt(monday(6, 0), 0, DEFAULT_PEAK_WINDOWS), 'peak')
  assert.equal(trafficPeriodAt(monday(9, 59), 0, DEFAULT_PEAK_WINDOWS), 'peak')
  assert.equal(trafficPeriodAt(monday(10, 0), 0, DEFAULT_PEAK_WINDOWS), 'idle')
  assert.equal(trafficPeriodAt(saturday(2), 0, DEFAULT_PEAK_WINDOWS), 'idle')
})
