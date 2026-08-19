import type { CostEstimate, UsageModel } from './types.js';
/**
 * Local CNY estimate for a list of models charged at today's rate period.
 * Idle is half the peak price. Unknown models are left unpriced.
 * @param models per-model token totals.
 * @param ratePeriod pricing window the tokens were billed in.
 */
export declare function estimateCost(models: readonly UsageModel[], ratePeriod: 'idle' | 'peak'): CostEstimate;
//# sourceMappingURL=pricing.d.ts.map