interface SlotsService {
    inject(name: string, callback: () => unknown): unknown;
    register(options: {
        name: string;
        id: string;
        order: number;
    }, component: unknown): () => void;
}
interface SessionListSnapshot {
    current?: string;
    byId: Record<string, {
        cwd?: string;
    }>;
}
interface SessionsService {
    list: {
        getSnapshot(): SessionListSnapshot;
        subscribe(callback: () => void): () => void;
    };
}
interface ClientContext {
    slots: SlotsService;
    sessions: SessionsService;
    effect(callback: () => void | (() => void), label?: string): unknown;
}
export declare const inject: string[];
export declare function apply(ctx: ClientContext): void;
export {};
//# sourceMappingURL=index.d.ts.map