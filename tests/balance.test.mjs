import assert from 'node:assert/strict'
import test from 'node:test'
import { fetchBalance } from '../lib/balance.js'

test('returns local error when API key is absent', async () => {
  assert.match((await fetchBalance(undefined, 'https://api.deepseek.com')).error, /DEEPSEEK_API_KEY/)
})

test('normalizes the DeepSeek balance response', async (t) => {
  const original = globalThis.fetch
  t.after(() => { globalThis.fetch = original })
  globalThis.fetch = async () => new Response(JSON.stringify({
    is_available: true,
    balance_infos: [{ currency: 'CNY', total_balance: '12.3', granted_balance: '2.3', topped_up_balance: '10' }],
  }), { status: 200, headers: { 'content-type': 'application/json' } })
  const result = await fetchBalance('key', 'https://api.deepseek.com')
  assert.equal(result.available, true)
  assert.equal(result.balances[0].totalBalance, '12.3')
})
