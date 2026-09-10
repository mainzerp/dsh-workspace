import type { TokenUsage } from '@deepseek-ai/dsh-llm'
import type { SessionEvent } from '@deepseek-ai/dsh-session'
import type { UsageModel, UsageSummary, UsageTokenTotals } from './types.js'

const DAY_MS = 86_400_000
interface MutableUsage extends UsageTokenTotals { apiRequests: number }
interface StepUsage { time: number; model: string; requests: number; usage?: TokenUsage }

/**
 * One persisted log's contribution to one day window.
 *
 * The summary endpoint caches this per session (keyed by log revision), so a
 * fold must depend on its own log only: merging contributions is a plain sum.
 * Caching the fold instead of the event array is what keeps a 30 s poll from
 * re-reading the whole corpus and materializing every event again.
 */
export interface LogUsage extends UsageTokenTotals {
  apiRequests: number
  models: UsageModel[]
}

function emptyUsage(): MutableUsage {
  return { apiRequests: 0, inputTokens: 0, outputTokens: 0, cacheReadTokens: 0, cacheWriteTokens: 0, totalTokens: 0 }
}

function addTokens(target: MutableUsage, usage: TokenUsage | undefined): void {
  if (usage === undefined) return
  const cacheRead = usage.cacheReadTokens ?? 0
  const cacheWrite = usage.cacheWriteTokens ?? 0
  target.inputTokens += usage.inputTokens
  target.outputTokens += usage.outputTokens
  target.cacheReadTokens += cacheRead
  target.cacheWriteTokens += cacheWrite
  target.totalTokens += usage.inputTokens + usage.outputTokens + cacheRead + cacheWrite
}

function addUsage(target: MutableUsage, source: UsageTokenTotals & { apiRequests: number }): void {
  target.apiRequests += source.apiRequests
  target.inputTokens += source.inputTokens
  target.outputTokens += source.outputTokens
  target.cacheReadTokens += source.cacheReadTokens
  target.cacheWriteTokens += source.cacheWriteTokens
  target.totalTokens += source.totalTokens
}

/** @param now current epoch milliseconds. @param offset minutes east of UTC. @returns local-day start. */
export function todayStart(now: number, offset: number): number {
  const shifted = offset * 60_000
  return Math.floor((now + shifted) / DAY_MS) * DAY_MS - shifted
}

function key(turn: number, step: number): string { return `${turn}/${step}` }

/** @param events one persisted session log. @param startTime window start (inclusive). @param now window end (inclusive). @returns that log's usage contribution. */
export function logUsage(events: readonly SessionEvent[], startTime: number, now: number): LogUsage {
  const steps = new Map<string, StepUsage>()
  let activeModel = 'unknown'
  for (const event of events) {
    if (event.type === 'request/header') { activeModel = event.data.header.config.model; continue }
    if (event.type === 'step/start') { steps.set(key(event.data.turn, event.data.step), { time: event.time, model: activeModel, requests: 1 }); continue }
    if (event.type === 'assistant/chunk' && event.data.chunk.type === 'usage') {
      const step = steps.get(key(event.data.turn, event.data.step)); if (step !== undefined) step.usage = event.data.chunk.usage
      continue
    }
    if (event.type === 'assistant/message') {
      const step = steps.get(key(event.data.turn, event.data.step))
      if (step !== undefined) { step.model = event.data.message.source.model; if (event.data.usage !== undefined) step.usage = event.data.usage }
      continue
    }
    if (event.type as string === 'llm/retry-started') {
      const data = event.data as unknown as Record<string, unknown>
      if (typeof data.turn === 'number' && typeof data.step === 'number') {
        const step = steps.get(key(data.turn, data.step)); if (step !== undefined) step.requests += 1
      }
    }
  }
  const totals: LogUsage = { apiRequests: 0, inputTokens: 0, outputTokens: 0, cacheReadTokens: 0, cacheWriteTokens: 0, totalTokens: 0, models: [] }
  const byModel = new Map<string, MutableUsage>()
  for (const step of steps.values()) {
    if (step.time < startTime || step.time > now) continue
    totals.apiRequests += step.requests; addTokens(totals, step.usage)
    const model = byModel.get(step.model) ?? emptyUsage(); model.apiRequests += step.requests; addTokens(model, step.usage); byModel.set(step.model, model)
  }
  totals.models = [...byModel.entries()].map(([model, values]) => ({ model, ...values }))
  return totals
}

/** @param usages per-log contributions for one window. @param now window end. @param startTime window start. @returns the response summary. */
export function aggregateUsage(usages: readonly LogUsage[], now: number, startTime: number): UsageSummary {
  const totals = emptyUsage()
  const byModel = new Map<string, MutableUsage>()
  for (const usage of usages) {
    addUsage(totals, usage)
    for (const model of usage.models) {
      const target = byModel.get(model.model) ?? emptyUsage()
      addUsage(target, model)
      byModel.set(model.model, target)
    }
  }
  const cacheBase = totals.inputTokens + totals.cacheReadTokens + totals.cacheWriteTokens
  const models: UsageModel[] = [...byModel.entries()].map(([model, values]) => ({ model, ...values })).sort((left, right) => right.totalTokens - left.totalTokens || left.model.localeCompare(right.model))
  return { startTime, endTime: now, ...totals, cacheHitRate: cacheBase === 0 ? null : totals.cacheReadTokens / cacheBase, models }
}

/** @param logs persisted session logs. @param now right boundary. @param offset local-day offset. @returns today's usage. */
export function aggregateToday(logs: readonly (readonly SessionEvent[])[], now: number, offset = 0): UsageSummary {
  const startTime = todayStart(now, offset)
  return aggregateUsage(logs.map(events => logUsage(events, startTime, now)), now, startTime)
}
