import assert from 'node:assert/strict'
import test from 'node:test'
import { clampDrawerWidth, DRAWER_COLLAPSED_WIDTH, DRAWER_DEFAULT_WIDTH, DRAWER_MIN_WIDTH, parseDrawerCollapsed, parseDrawerWidth, readDrawerCollapsed, readDrawerWidth, resolveDrawerWidth, writeDrawerCollapsed, writeDrawerWidth } from '../lib/client/drawer.js'

test('clampDrawerWidth bounds the drag between the minimum and the viewport gutter', () => {
  assert.equal(clampDrawerWidth(100, 1200), DRAWER_MIN_WIDTH)
  assert.equal(clampDrawerWidth(100, 1200), 320)
  assert.equal(clampDrawerWidth(2000, 1200), 1168)
  assert.equal(clampDrawerWidth(600, 1200), 600)
  assert.equal(clampDrawerWidth(Number.NaN, 1200), DRAWER_DEFAULT_WIDTH)
  assert.equal(clampDrawerWidth(Number.NaN, 1200), 400)
})

test('resolveDrawerWidth gives the collapsed width priority over width and selection', () => {
  assert.equal(resolveDrawerWidth(true, 900, 'a.ts'), DRAWER_COLLAPSED_WIDTH)
  assert.equal(resolveDrawerWidth(true, 900, 'a.ts'), 44)
  assert.equal(resolveDrawerWidth(true, null, null), 44)
  assert.equal(resolveDrawerWidth(false, 900, 'a.ts'), 900)
  assert.equal(resolveDrawerWidth(false, null, null), DRAWER_DEFAULT_WIDTH)
  assert.equal(resolveDrawerWidth(false, null, null), 400)
  assert.equal(resolveDrawerWidth(false, null, 'a.ts'), null)
})

test('parseDrawerWidth rejects missing, non-numeric, and non-positive values', () => {
  for (const raw of [null, '', 'abc', '0', '-5']) assert.equal(parseDrawerWidth(raw), null)
  assert.equal(parseDrawerWidth('512.5'), 512.5)
})

test('parseDrawerCollapsed only accepts the stored "1" flag', () => {
  for (const raw of [null, '0', 'true']) assert.equal(parseDrawerCollapsed(raw), false)
  assert.equal(parseDrawerCollapsed('1'), true)
})

test('storage helpers degrade to defaults and no-op without a window', () => {
  assert.equal(readDrawerCollapsed(), false)
  assert.equal(readDrawerWidth(1200), null)
  assert.doesNotThrow(() => writeDrawerCollapsed(true))
  assert.doesNotThrow(() => writeDrawerWidth(500))
})
