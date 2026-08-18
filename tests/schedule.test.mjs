import assert from 'node:assert/strict'
import test from 'node:test'
import { trafficPeriodAt } from '../lib/schedule.js'

const utc8 = (hour, minute) => Date.UTC(2026, 0, 1, hour - 8, minute)

test('uses the configured UTC+8 idle window with exact boundaries', () => {
  assert.equal(trafficPeriodAt(utc8(0, 29), 480, 30, 510), 'peak')
  assert.equal(trafficPeriodAt(utc8(0, 30), 480, 30, 510), 'idle')
  assert.equal(trafficPeriodAt(utc8(8, 29), 480, 30, 510), 'idle')
  assert.equal(trafficPeriodAt(utc8(8, 30), 480, 30, 510), 'peak')
})

test('supports an idle window that crosses midnight', () => {
  assert.equal(trafficPeriodAt(Date.UTC(2026, 0, 1, 23, 0), 0, 22 * 60, 6 * 60), 'idle')
  assert.equal(trafficPeriodAt(Date.UTC(2026, 0, 1, 12, 0), 0, 22 * 60, 6 * 60), 'peak')
})
