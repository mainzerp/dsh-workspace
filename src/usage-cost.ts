interface UsageCostBucket { time: number; cost: string }
interface UsageCostSeries { api_key: { tracking_id: string; name: string; sensitive_id: string; valid: boolean }; model: string; buckets: UsageCostBucket[] }
interface UsageCostCurrency { currency: string; series: UsageCostSeries[] }
interface UsageCostPayload {
  code: number
  data?: { biz_code?: number; biz_data?: { data?: UsageCostCurrency[] } }
}
function valid(value: unknown): value is UsageCostPayload {
  if (typeof value !== 'object' || value === null) return false
  const body = value as Record<string, unknown>
  if (typeof body.code !== 'number') return false
  if (typeof body.data !== 'object' || body.data === null) return true
  const data = body.data as Record<string, unknown>
  if (typeof data.biz_data !== 'object' || data.biz_data === null) return true
  const biz = data.biz_data as Record<string, unknown>
  return Array.isArray(biz.data)
}

/** @returns the total billed amount in the base currency, or null when the platform endpoint is unavailable. */
export async function fetchUsageCost(
  apiKey: string | undefined,
  url: string,
  startSeconds: number,
  endSeconds: number,
  timezoneOffsetSeconds: number,
  signal?: AbortSignal,
): Promise<number | null> {
  if (!apiKey) return null
  try {
    const target = new URL(url)
    target.searchParams.set('start', String(Math.floor(startSeconds)))
    target.searchParams.set('end', String(Math.ceil(endSeconds)))
    target.searchParams.set('tz', String(Math.floor(timezoneOffsetSeconds)))
    const response = await fetch(target, {
      headers: {
        Accept: 'application/json',
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36',
        Authorization: `Bearer ${apiKey}`,
      },
      ...(signal === undefined ? {} : { signal }),
    })
    if (!response.ok) return null
    const body: unknown = await response.json()
    if (!valid(body)) return null
    if (body.code !== 0) return null
    const data = body.data
    if (typeof data !== 'object' || data === null) return null
    if (data.biz_code !== 0) return null
    const series = data.biz_data?.data ?? []
    let total = 0
    for (const currency of series) {
      for (const item of currency.series) {
        for (const bucket of item.buckets) {
          const cost = Number(bucket.cost)
          if (Number.isFinite(cost) && cost > 0) total += cost
        }
      }
    }
    return total
  } catch {
    return null
  }
}