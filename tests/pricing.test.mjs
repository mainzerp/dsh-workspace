import assert from 'node:assert/strict'
import test from 'node:test'
import { estimateCost } from '../lib/pricing.js'

const model = { model: 'deepseek-v4-flash', inputTokens: 1_000_000, cacheReadTokens: 1_000_000, cacheWriteTokens: 0, outputTokens: 1_000_000 }

test('estimates idle (low-peak) V4 public CNY pricing', () => {
  const result = estimateCost([model], 'idle')
  // cacheHit 0.05 + cacheMiss 1.5 + output 4.5
  assert.equal(result.amount, 6.05)
  assert.equal(result.complete, true)
})

test('estimates peak V4 public CNY pricing as double the idle price', () => {
  const result = estimateCost([model], 'peak')
  assert.equal(result.amount, 12.1)
})

test('marks unknown models as unpriced regardless of period', () => {
  assert.deepEqual(estimateCost([{ model: 'private', inputTokens: 1, cacheReadTokens: 0, cacheWriteTokens: 0, outputTokens: 1 }], 'peak'), { amount: 0, complete: false, unpricedModels: ['private'] })
})
