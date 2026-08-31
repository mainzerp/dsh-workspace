import assert from 'node:assert/strict'
import test from 'node:test'
import { estimateCost } from '../lib/pricing.js'

const model = { model: 'deepseek-v4-flash', inputTokens: 1_000_000, cacheReadTokens: 1_000_000, cacheWriteTokens: 0, outputTokens: 1_000_000 }

test('estimates V4 public USD pricing at the standard rate', () => {
  const result = estimateCost([model])
  // cacheHit 0.014 + cacheMiss 0.42 + output 1.25
  assert.equal(result.amount, 1.684)
  assert.equal(result.complete, true)
})

test('marks unknown models as unpriced', () => {
  assert.deepEqual(estimateCost([{ model: 'private', inputTokens: 1, cacheReadTokens: 0, cacheWriteTokens: 0, outputTokens: 1 }]), { amount: 0, complete: false, unpricedModels: ['private'] })
})
