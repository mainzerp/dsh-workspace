import type { CostEstimate, UsageModel } from './types.js';
/**
 * Local USD estimate for a list of models at the standard rate.
 * Unknown models are left unpriced.
 * @param models per-model token totals.
 */
export declare function estimateCost(models: readonly UsageModel[]): CostEstimate;
//# sourceMappingURL=pricing.d.ts.map