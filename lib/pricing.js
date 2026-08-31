/**
 * Approximate USD prices per million tokens (standard rate).
 * Derived from the DeepSeek public CNY tariff at ~7.2 CNY/USD.
 * Unknown models are left unpriced.
 */
const PRICES_USD_PER_MILLION = {
    'deepseek-v4-flash': { cacheHit: 0.014, cacheMiss: 0.42, output: 1.25 },
    'deepseek-v4-pro': { cacheHit: 0.042, cacheMiss: 1.25, output: 3.75 },
};
function costFor(tokens, price) {
    return (tokens.cacheReadTokens * price.cacheHit
        + (tokens.inputTokens + tokens.cacheWriteTokens) * price.cacheMiss
        + tokens.outputTokens * price.output) / 1_000_000;
}
/**
 * Local USD estimate for a list of models at the standard rate.
 * Unknown models are left unpriced.
 * @param models per-model token totals.
 */
export function estimateCost(models) {
    let amount = 0;
    const unpricedModels = [];
    for (const model of models) {
        const entry = PRICES_USD_PER_MILLION[model.model];
        if (entry === undefined) {
            unpricedModels.push(model.model);
            continue;
        }
        amount += costFor(model, entry);
    }
    return { amount, complete: unpricedModels.length === 0, unpricedModels };
}
//# sourceMappingURL=pricing.js.map