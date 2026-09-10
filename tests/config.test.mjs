import assert from 'node:assert/strict'
import test from 'node:test'
import { Config } from '../lib/index.js'
import { trafficPeriodAt } from '../lib/schedule.js'

// 2026-01-05 is a Monday, 2026-01-03 a Saturday.
const monday = (hour, minute = 0) => Date.UTC(2026, 0, 5, hour, minute)
const saturday = (hour, minute = 0) => Date.UTC(2026, 0, 3, hour, minute)

test('the billing schedule defaults to UTC and the documented windows', () => {
  const config = new Config({ apiKey: 'test' })
  assert.equal(config.scheduleTimezoneOffsetMinutes, 0)
  assert.equal(config.timezoneOffsetMinutes, 0)
  assert.deepEqual(config.peakWindows, [[60, 240], [360, 600]])
  assert.deepEqual(config.peakWeekdays, [1, 2, 3, 4, 5])
})

test('a local usage day boundary does not move the billing schedule', () => {
  const berlin = new Config({ apiKey: 'test', timezoneOffsetMinutes: 120 })
  assert.equal(berlin.timezoneOffsetMinutes, 120)
  assert.equal(berlin.scheduleTimezoneOffsetMinutes, 0)
})

test('the schedule timezone can be set independently of the day boundary', () => {
  const local = new Config({ apiKey: 'test', timezoneOffsetMinutes: 120, scheduleTimezoneOffsetMinutes: 480 })
  assert.equal(local.timezoneOffsetMinutes, 120)
  assert.equal(local.scheduleTimezoneOffsetMinutes, 480)
})

test('the default configuration classifies the documented UTC hours as peak', () => {
  const { scheduleTimezoneOffsetMinutes, peakWindows, peakWeekdays } = new Config({ apiKey: 'test' })
  const period = now => trafficPeriodAt(now, scheduleTimezoneOffsetMinutes, peakWindows, peakWeekdays)
  assert.equal(period(monday(2, 0)), 'peak')
  assert.equal(period(monday(3, 59)), 'peak')
  assert.equal(period(monday(4, 0)), 'idle')
  assert.equal(period(monday(8, 0)), 'peak')
  assert.equal(period(monday(10, 0)), 'idle')
  assert.equal(period(saturday(2, 0)), 'idle')
  // A Berlin day boundary must not shift any of that by two hours.
  const berlin = new Config({ apiKey: 'test', timezoneOffsetMinutes: 120 })
  assert.equal(trafficPeriodAt(monday(2, 0), berlin.scheduleTimezoneOffsetMinutes, berlin.peakWindows, berlin.peakWeekdays), 'peak')
  assert.equal(trafficPeriodAt(monday(0, 30), berlin.scheduleTimezoneOffsetMinutes, berlin.peakWindows, berlin.peakWeekdays), 'idle')
})
