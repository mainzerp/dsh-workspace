const PRICES_CNY_PER_MILLION = {
    'deepseek-v4-flash': { cacheHit: 0.02, cacheMiss: 1, output: 2 },
    'deepseek-v4-pro': { cacheHit: 0.025, cacheMiss: 3, output: 6 },
    'deepseek-chat': { cacheHit: 0.02, cacheMiss: 1, output: 2 },
    'deepseek-reasoner': { cacheHit: 0.02, cacheMiss: 1, output: 2 },
};
/** @param models per-model token totals. @returns local CNY estimate. */
export function estimateCost(models) {
    let amount = 0;
    const unpricedModels = [];
    for (const model of models) {
        const price = PRICES_CNY_PER_MILLION[model.model];
        if (price === undefined) {
            unpricedModels.push(model.model);
            continue;
        }
        amount += (model.cacheReadTokens * price.cacheHit
            + (model.inputTokens + model.cacheWriteTokens) * price.cacheMiss
            + model.outputTokens * price.output) / 1_000_000;
    }
    return { amount, complete: unpricedModels.length === 0, unpricedModels };
}
//# sourceMappingURL=pricing.js.map