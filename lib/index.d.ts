import type { Context } from '@deepseek-ai/cordis';
import z from '@deepseek-ai/schemastery';
export type * from './types.js';
/** Plugin configuration. */
export interface Config {
    baseUrl?: string;
    apiKey?: string;
    apiKeyEnv?: string;
    timezoneOffsetMinutes?: number;
    balanceTimeoutMs?: number;
    inspectConcurrency?: number;
    peakWindows?: number[][];
    peakWeekdays?: number[];
    projectRoot?: string;
    projectMaxEntries?: number;
    projectMaxFileBytes?: number;
    shellPath?: string;
    allowRemote?: boolean;
    language?: 'auto' | 'de' | 'en';
}
/** Loader-time configuration validation and defaults. */
export declare const Config: z<Config>;
export declare const name = "dsh-workspace";
export declare const inject: string[];
/** @param ctx Harness context. @param config project and network limits. */
export declare function apply(ctx: Context, config?: Config): void;
//# sourceMappingURL=index.d.ts.map