/** One project-tree entry returned by the read-only browser. */
export interface ProjectTreeEntry {
  path: string
  name: string
  kind: 'directory' | 'file'
  depth: number
}

/** One Git working-tree change. */
export interface GitChange { path: string; status: string }

/** Project browser bootstrap response. */
export interface ProjectSnapshot {
  rootName: string
  rootPath: string
  entries: ProjectTreeEntry[]
  changes: GitChange[]
  truncated: boolean
  gitAvailable: boolean
}

/** UTF-8 project file preview response. */
export interface ProjectFilePreview {
  path: string
  content: string
  truncated: boolean
  binary: boolean
  mimeType?: string
  dataUrl?: string
}

/** Text file save request body. */
export interface ProjectFileWriteRequest {
  path: string
  content: string
  overwrite?: boolean
}

/** Root-level file upload request body (basename only, base64 payload). */
export interface ProjectFileUploadRequest {
  name: string
  dataBase64: string
  overwrite?: boolean
}

/** Success response of the file write and upload endpoints. */
export interface ProjectFileWriteResult {
  path: string
  bytes: number
}

/** Git diff preview response. */
export interface GitDiffPreview { path: string; diff: string; truncated: boolean }

/** A git ref decorating a commit (parsed from %D). */
export interface GitLogRef { name: string; kind: 'branch' | 'remote' | 'tag' | 'head' }

/** One commit in the project history. */
export interface GitLogEntry {
  hash: string
  shortHash: string
  author: string
  timestamp: number
  subject: string
  parents: string[]
  refs: GitLogRef[]
}

/** Bounded git commit history response. */
export interface GitLogPreview { entries: GitLogEntry[] }

/** One commit's text diff preview. */
export interface GitCommitPreview { hash: string; diff: string; truncated: boolean }

/** Token counters accumulated for one range or model. */
export interface UsageTokenTotals {
  inputTokens: number
  outputTokens: number
  cacheReadTokens: number
  cacheWriteTokens: number
  totalTokens: number
}

/** One model's request and token totals. */
export interface UsageModel extends UsageTokenTotals {
  model: string
  apiRequests: number
}

/** Today's Harness-local usage totals. */
export interface UsageSummary extends UsageTokenTotals {
  startTime: number
  endTime: number
  apiRequests: number
  cacheHitRate: number | null
  models: UsageModel[]
}

/** One DeepSeek account currency balance. */
export interface BalanceInfo {
  currency: string
  totalBalance: string
  grantedBalance: string
  toppedUpBalance: string
}

/** Normalized DeepSeek balance response. */
export interface BalanceSnapshot {
  available: boolean | null
  balances: BalanceInfo[]
  error?: string
}

/** Self-contained dsh-workspace summary response. */
export interface UsageSnapshot {
  generatedAt: number
  usage: UsageSummary
  balance: BalanceSnapshot
  ratePeriod: 'idle' | 'peak'
  trafficSchedule: {
    timezoneOffsetMinutes: number
    peakWindows: readonly (readonly [number, number])[]
    peakWeekdays: readonly number[]
  }
}

/** Client-relevant plugin configuration served by GET /api/v1/dsh-workspace/config. */
export interface WorkspaceClientConfig { language: 'auto' | 'de' | 'en' }
