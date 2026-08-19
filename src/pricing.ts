import type { CostEstimate, UsageModel } from './types.js'

interface Price { cacheHit: number; cacheMiss: number; output: number }

/** Peak vs idle CNF prices per million tokens, from the DeepSeek public tariff. */
interface PriceEntry { idle: Price; peak: Price }

const PRICES_CNY_PER_MILLION: Readonly<Record<string, PriceEntry>> = {
  'deepseek-v4-flash': { idle: { cacheHit: 0.05, cacheMiss: 1.5, output: 4.5 }, peak: { cacheHit: 0.1, cacheMiss: 3, output: 9 } },
  'deepseek-v4-pro': { idle: { cacheHit: 0.15, cacheMiss: 4.5, output: 13.5 }, peak: { cacheHit: 0.3, cacheMiss: 9, output: 27 } },
}

function costFor(tokens: UsageModel, price: Price): number {
  return (tokens.cacheReadTokens * price.cacheHit
    + (tokens.inputTokens + tokens.cacheWriteTokens) * price.cacheMiss
    + tokens.outputTokens * price.output) / 1_000_000
}

/**
 * Local CNY estimate for a list of models charged at today's rate period.
 * Idle is half the peak price. Unknown models are left unpriced.
 * @param models per-model token totals.
 * @param ratePeriod pricing window the tokens were billed in.
 */
export function estimateCost(models: readonly UsageModel[], ratePeriod: 'idle' | 'peak'): CostEstimate {
  let amount = 0
  const unpricedModels: string[] = []
  for (const model of models) {
    const entry = PRICES_CNY_PER_MILLION[model.model]
    if (entry === undefined) { unpricedModels.push(model.model); continue }
    amount += costFor(model, entry[ratePeriod])
  }
  return { amount, complete: unpricedModels.length === 0, unpricedModels }
}
