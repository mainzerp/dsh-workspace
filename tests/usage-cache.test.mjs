import assert from 'node:assert/strict'
import test from 'node:test'
import { aggregateToday, aggregateUsage, logUsage, todayStart } from '../lib/aggregate.js'
import { selectStaleSnapshots } from '../lib/usage-cache.js'

const now = Date.UTC(2026, 7, 18, 8)
const start = Date.UTC(2026, 7, 17, 16)
const offset = 480
const event = (type, seq, time, data) => ({ type, seq, time, data })
const requestLog = time => [
  event('request/header', 0, time + 1, { header: { config: { model: 'deepseek-v4-flash' } } }),
  event('step/start', 1, time + 2, { turn: 1, step: 1 }),
  event('assistant/message', 2, time + 3, { turn: 1, step: 1, message: { source: { model: 'deepseek-v4-flash' } }, usage: { inputTokens: 10, outputTokens: 5, cacheReadTokens: 30 } }),
]

test('per-log folds merged equal the whole-corpus aggregation', () => {
  const logs = [
    requestLog(start + 10),
    [
      event('request/header', 0, start + 20, { header: { config: { model: 'deepseek-v4-pro' } } }),
      event('step/start', 1, start + 21, { turn: 2, step: 1 }),
      event('llm/retry-started', 2, start + 22, { turn: 2, step: 1 }),
      event('assistant/message', 3, start + 23, { turn: 2, step: 1, message: { source: { model: 'deepseek-v4-pro' } }, usage: { inputTokens: 7, outputTokens: 3 } }),
    ],
    [],
  ]
  const startTime = todayStart(now, offset)
  const perLog = aggregateUsage(logs.map(events => logUsage(events, startTime, now)), now, startTime)
  assert.deepEqual(perLog, aggregateToday(logs, now, offset))
})

test('a log folds only the steps inside its window', () => {
  const startTime = todayStart(now, offset)
  const usage = logUsage(requestLog(startTime - 60_000), startTime, now)
  assert.equal(usage.apiRequests, 0)
  assert.equal(usage.totalTokens, 0)
  assert.deepEqual(usage.models, [])
  const inside = logUsage(requestLog(startTime + 1000), startTime, now)
  assert.equal(inside.apiRequests, 1)
  assert.equal(inside.totalTokens, 45)
})

test('a snapshot is a cache hit only for the same revision and day window', () => {
  const snapshot = { header: { id: 'a' }, revision: '1:2:3' }
  const other = { header: { id: 'b' }, revision: '9:9:9' }
  const folded = { revision: '1:2:3', startTime: start, usage: logUsage(requestLog(start + 10), start, now) }
  const cache = new Map([['a', folded]])

  const same = selectStaleSnapshots([snapshot, other], cache, start)
  assert.deepEqual([...same.hits.keys()], ['a'])
  assert.deepEqual(same.stale.map(s => s.header.id), ['b'])

  const rewritten = selectStaleSnapshots([{ header: { id: 'a' }, revision: '1:2:4' }], cache, start)
  assert.equal(rewritten.hits.size, 0)
  assert.deepEqual(rewritten.stale.map(s => s.header.id), ['a'])

  const nextDay = selectStaleSnapshots([snapshot], cache, start + 86_400_000)
  assert.equal(nextDay.hits.size, 0)
  assert.equal(nextDay.stale.length, 1)

  const removed = selectStaleSnapshots([], cache, start)
  assert.equal(removed.hits.size, 0)
  assert.deepEqual(removed.stale, [])
})
