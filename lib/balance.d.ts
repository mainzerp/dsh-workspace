import type { BalanceSnapshot } from './types.js';
/** @param apiKey DeepSeek token. @param baseUrl API root. @param signal cancellation. @returns normalized balance. */
export declare function fetchBalance(apiKey: string | undefined, baseUrl: string, signal?: AbortSignal): Promise<BalanceSnapshot>;
//# sourceMappingURL=balance.d.ts.map