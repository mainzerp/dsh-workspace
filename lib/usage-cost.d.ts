/** @returns the total billed amount in the base currency, or null when the platform endpoint is unavailable. */
export declare function fetchUsageCost(apiKey: string | undefined, url: string, startSeconds: number, endSeconds: number, timezoneOffsetSeconds: number, signal?: AbortSignal): Promise<number | null>;
//# sourceMappingURL=usage-cost.d.ts.map