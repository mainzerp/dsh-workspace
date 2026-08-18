import assert from 'node:assert/strict'
import test from 'node:test'
import { estimateCost } from '../lib/pricing.js'

test('estimates V4 public CNY pricing', () => {
  const result = estimateCost([{ model: 'deepseek-v4-flash', inputTokens: 1_000_000, cacheReadTokens: 1_000_000, cacheWriteTokens: 0, outputTokens: 1_000_000 }])
  assert.equal(result.amount, 3.02)
  assert.equal(result.complete, true)
})

test('marks unknown models as unpriced', () => {
  assert.deepEqual(estimateCost([{ model: 'private', inputTokens: 1, cacheReadTokens: 0, cacheWriteTokens: 0, outputTokens: 1 }]), { amount: 0, complete: false, unpricedModels: ['private'] })
})
