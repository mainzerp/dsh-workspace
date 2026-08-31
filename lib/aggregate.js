const DAY_MS = 86_400_000;
function emptyUsage() {
    return { apiRequests: 0, inputTokens: 0, outputTokens: 0, cacheReadTokens: 0, cacheWriteTokens: 0, totalTokens: 0 };
}
function addTokens(target, usage) {
    if (usage === undefined)
        return;
    const cacheRead = usage.cacheReadTokens ?? 0;
    const cacheWrite = usage.cacheWriteTokens ?? 0;
    target.inputTokens += usage.inputTokens;
    target.outputTokens += usage.outputTokens;
    target.cacheReadTokens += cacheRead;
    target.cacheWriteTokens += cacheWrite;
    target.totalTokens += usage.inputTokens + usage.outputTokens + cacheRead + cacheWrite;
}
/** @param now current epoch milliseconds. @param offset minutes east of UTC. @returns local-day start. */
export function todayStart(now, offset) {
    const shifted = offset * 60_000;
    return Math.floor((now + shifted) / DAY_MS) * DAY_MS - shifted;
}
function key(turn, step) { return `${turn}/${step}`; }
/** @param logs persisted session logs. @param now right boundary. @param offset local-day offset. @returns today's usage. */
export function aggregateToday(logs, now, offset = 0) {
    const startTime = todayStart(now, offset);
    const totals = emptyUsage();
    const byModel = new Map();
    for (const events of logs) {
        const steps = new Map();
        let activeModel = 'unknown';
        for (const event of events) {
            if (event.type === 'request/header') {
                activeModel = event.data.header.config.model;
                continue;
            }
            if (event.type === 'step/start') {
                steps.set(key(event.data.turn, event.data.step), { time: event.time, model: activeModel, requests: 1 });
                continue;
            }
            if (event.type === 'assistant/chunk' && event.data.chunk.type === 'usage') {
                const step = steps.get(key(event.data.turn, event.data.step));
                if (step !== undefined)
                    step.usage = event.data.chunk.usage;
                continue;
            }
            if (event.type === 'assistant/message') {
                const step = steps.get(key(event.data.turn, event.data.step));
                if (step !== undefined) {
                    step.model = event.data.message.source.model;
                    if (event.data.usage !== undefined)
                        step.usage = event.data.usage;
                }
                continue;
            }
            if (event.type === 'llm/retry-started') {
                const data = event.data;
                if (typeof data.turn === 'number' && typeof data.step === 'number') {
                    const step = steps.get(key(data.turn, data.step));
                    if (step !== undefined)
                        step.requests += 1;
                }
            }
        }
        for (const step of steps.values()) {
            if (step.time < startTime || step.time > now)
                continue;
            totals.apiRequests += step.requests;
            addTokens(totals, step.usage);
            const model = byModel.get(step.model) ?? emptyUsage();
            model.apiRequests += step.requests;
            addTokens(model, step.usage);
            byModel.set(step.model, model);
        }
    }
    const cacheBase = totals.inputTokens + totals.cacheReadTokens + totals.cacheWriteTokens;
    const models = [...byModel.entries()].map(([model, values]) => ({ model, ...values })).sort((left, right) => right.totalTokens - left.totalTokens || left.model.localeCompare(right.model));
    return { startTime, endTime: now, ...totals, cacheHitRate: cacheBase === 0 ? null : totals.cacheReadTokens / cacheBase, models };
}
//# sourceMappingURL=aggregate.js.map