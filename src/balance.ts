import type { BalanceSnapshot } from './types.js'

interface ResponseBody { is_available: boolean; balance_infos: Array<{ currency: string; total_balance: string; granted_balance: string; topped_up_balance: string }> }
function valid(value: unknown): value is ResponseBody {
  if (typeof value !== 'object' || value === null) return false
  const body = value as Record<string, unknown>
  return typeof body.is_available === 'boolean' && Array.isArray(body.balance_infos) && body.balance_infos.every(item => {
    if (typeof item !== 'object' || item === null) return false
    const info = item as Record<string, unknown>
    return typeof info.currency === 'string' && typeof info.total_balance === 'string' && typeof info.granted_balance === 'string' && typeof info.topped_up_balance === 'string'
  })
}

/** @param apiKey DeepSeek token. @param baseUrl API root. @param signal cancellation. @returns normalized balance. */
export async function fetchBalance(apiKey: string | undefined, baseUrl: string, signal?: AbortSignal): Promise<BalanceSnapshot> {
  if (!apiKey) return { available: null, balances: [], error: '未配置 DEEPSEEK_API_KEY' }
  try {
    const response = await fetch(new URL('/user/balance', baseUrl), { headers: { Accept: 'application/json', Authorization: `Bearer ${apiKey}` }, ...(signal === undefined ? {} : { signal }) })
    if (!response.ok) throw new Error(`DeepSeek 余额接口返回 HTTP ${response.status}`)
    const body: unknown = await response.json()
    if (!valid(body)) throw new Error('DeepSeek 余额接口返回了未知数据')
    return { available: body.is_available, balances: body.balance_infos.map(info => ({ currency: info.currency, totalBalance: info.total_balance, grantedBalance: info.granted_balance, toppedUpBalance: info.topped_up_balance })) }
  } catch (error) {
    return { available: null, balances: [], error: error instanceof Error ? error.message : String(error) }
  }
}
