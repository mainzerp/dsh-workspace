import assert from 'node:assert/strict'
import test from 'node:test'
import { clampDrawerWidth, DRAWER_COLLAPSED_WIDTH, DRAWER_DEFAULT_WIDTH, DRAWER_MIN_WIDTH, getDrawerCollapsedSnapshot, parseDrawerCollapsed, parseDrawerWidth, readDrawerCollapsed, readDrawerWidth, resolveDrawerWidth, subscribeDrawerCollapsed, writeDrawerCollapsed, writeDrawerWidth } from '../lib/client/drawer.js'

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

test('the collapse snapshot falls back to expanded without a window', () => {
  assert.equal(getDrawerCollapsedSnapshot(), false)
})

test('the snapshot is read once per module instance (lazy prime)', () => {
  const store = new Map([['dsh-workspace:drawer-collapsed', '1']])
  globalThis.window = { localStorage: { getItem: key => store.get(key) ?? null, setItem: (key, value) => store.set(key, value) } }
  try {
    // Earlier tests already primed the snapshot to false; a later storage change alone
    // must not move it, because only writeDrawerCollapsed updates the shared value.
    assert.equal(getDrawerCollapsedSnapshot(), false)
    writeDrawerCollapsed(false)
    assert.equal(getDrawerCollapsedSnapshot(), false)
  } finally {
    delete globalThis.window
  }
})

test('the store notifies subscribers once per change and stops after unsubscribe', () => {
  const store = new Map([['dsh-workspace:drawer-collapsed', '0']])
  globalThis.window = { localStorage: { getItem: key => store.get(key) ?? null, setItem: (key, value) => store.set(key, value) } }
  let first = 0
  let second = 0
  // Prime the snapshot so the store starts from a known expanded state.
  assert.equal(getDrawerCollapsedSnapshot(), false)
  const unsubscribeFirst = subscribeDrawerCollapsed(() => { first += 1 })
  const unsubscribeSecond = subscribeDrawerCollapsed(() => { second += 1 })
  try {
    writeDrawerCollapsed(true)
    assert.equal(first, 1)
    assert.equal(second, 1)
    assert.equal(getDrawerCollapsedSnapshot(), true)
    // Same value again: persists but must not notify.
    writeDrawerCollapsed(true)
    assert.equal(first, 1)
    writeDrawerCollapsed(false)
    assert.equal(first, 2)
    assert.equal(getDrawerCollapsedSnapshot(), false)
    unsubscribeFirst()
    writeDrawerCollapsed(true)
    assert.equal(first, 2)
    assert.equal(second, 3)
  } finally {
    unsubscribeFirst()
    unsubscribeSecond()
    delete globalThis.window
  }
})

test('subscribing without a window is safe and unsubscribing is idempotent', () => {
  let calls = 0
  const unsubscribe = subscribeDrawerCollapsed(() => { calls += 1 })
  assert.equal(typeof unsubscribe, 'function')
  assert.doesNotThrow(() => writeDrawerCollapsed(true))
  assert.equal(calls, 0)
  unsubscribe()
  assert.doesNotThrow(unsubscribe)
})
