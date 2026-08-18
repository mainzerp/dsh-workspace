import assert from 'node:assert/strict'
import test from 'node:test'
import { aggregateToday, todayStart } from '../lib/aggregate.js'

const now = Date.UTC(2026, 7, 18, 8)
const start = Date.UTC(2026, 7, 17, 16)
const event = (type, seq, time, data) => ({ type, seq, time, data })

test('uses the configured natural-day boundary', () => {
  assert.equal(todayStart(now, 480), start)
})

test('aggregates requests, retries, model tokens, and cache rate', () => {
  const result = aggregateToday([[
    event('request/header', 0, start + 1, { header: { config: { model: 'deepseek-v4-flash' } } }),
    event('step/start', 1, start + 2, { turn: 1, step: 1 }),
    event('llm/retry-started', 2, start + 3, { turn: 1, step: 1 }),
    event('assistant/message', 3, start + 4, { turn: 1, step: 1, message: { source: { model: 'deepseek-v4-flash' } }, usage: { inputTokens: 10, outputTokens: 5, cacheReadTokens: 30 } }),
  ]], now, 480)
  assert.equal(result.apiRequests, 2)
  assert.equal(result.totalTokens, 45)
  assert.equal(result.cacheHitRate, 30 / 40)
  assert.equal(result.models[0].model, 'deepseek-v4-flash')
})
