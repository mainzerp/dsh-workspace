/** DeepSeek Harness UI enhancement Host plugin. */
import { spawn as ptySpawn } from 'node-pty'
import type { IPty } from 'node-pty'
import { randomUUID } from 'node:crypto'
import type { IncomingMessage, ServerResponse } from 'node:http'
import { isAbsolute } from 'node:path'
import type { Context } from '@deepseek-ai/cordis'
import z from '@deepseek-ai/schemastery'
import type {} from '@deepseek-ai/dsh-session-persistence'
import type { SessionEvent } from '@deepseek-ai/dsh-session'
import { credentialRef } from '@deepseek-ai/dsh-credentials'
import { aggregateToday } from './aggregate.js'
import { fetchBalance } from './balance.js'
import { ProjectBrowser } from './project-browser.js'
import { trafficPeriodAt } from './schedule.js'
import type { WorkspaceClientConfig } from './types.js'

export type * from './types.js'

/** Plugin configuration. */
export interface Config {
  baseUrl?: string
  apiKey?: string
  apiKeyEnv?: string
  timezoneOffsetMinutes?: number
  balanceTimeoutMs?: number
  inspectConcurrency?: number
  peakWindows?: number[][]
  projectRoot?: string
  projectMaxEntries?: number
  projectMaxFileBytes?: number
  shellPath?: string
  allowRemote?: boolean
  language?: 'auto' | 'de' | 'en'
}

/** Loader-time configuration validation and defaults. */
export const Config: z<Config> = z.object({
  baseUrl: z.string().default('https://api.deepseek.com'),
  apiKey: z.string(),
  apiKeyEnv: z.string().default('DEEPSEEK_API_KEY'),
  timezoneOffsetMinutes: z.number().step(1).min(-720).max(840).default(0),
  balanceTimeoutMs: z.number().step(1).min(1).max(60_000).default(5_000),
  inspectConcurrency: z.number().step(1).min(1).max(64).default(8),
  peakWindows: z.array(z.array(z.number().step(1).min(0).max(1_440))).default([[540, 720], [840, 1_080]]),
  projectRoot: z.string(),
  projectMaxEntries: z.number().step(1).min(100).max(20_000).default(2_000),
  projectMaxFileBytes: z.number().step(1).min(1_024).max(2_000_000).default(200_000),
  shellPath: z.string().default('bash'),
  allowRemote: z.boolean().default(false),
  language: z.union([z.const('auto'), z.const('de'), z.const('en')]).default('auto'),
})

export const name = 'dsh-workspace'
export const inject = ['credentials', 'sessionPersistence', 'webServer']

interface WebServer {
  register(route: {
    kind: 'exact' | 'prefix'
    path: string
    handler: (req: IncomingMessage, res: ServerResponse) => void | Promise<void>
  }): () => void
}

function isLoopback(req: IncomingMessage): boolean {
  const address = req.socket.remoteAddress
  return address === '127.0.0.1' || address === '::1' || address?.startsWith('::ffff:127.') === true
}

function sendJson(res: ServerResponse, status: number, body: unknown, requestId: string): void {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff', 'X-Request-Id': requestId,
  })
  res.end(JSON.stringify(body))
}

function readJson(req: IncomingMessage, maxBytes = 1_000_000): Promise<unknown> {
  return new Promise((resolve, reject) => {
    let body = ''
    let size = 0
    req.on('data', (chunk: Buffer) => {
      size += chunk.length
      if (size > maxBytes) {
        reject(new Error('Request body too large'))
        req.destroy()
        return
      }
      body += chunk
    })
    req.on('end', () => {
      if (body.length === 0) { resolve({}); return }
      try { resolve(JSON.parse(body)) } catch { reject(new Error('Request body is not valid JSON')) }
    })
    req.on('error', reject)
  })
}

interface PtySession {
  pty: IPty
  output: string[]
}

const MAX_PTY_OUTPUT = 5_000

async function mapConcurrent<T, R>(items: readonly T[], concurrency: number, mapper: (item: T) => Promise<R>): Promise<R[]> {
  const results = new Array<R>(items.length)
  let next = 0
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, async () => {
    while (next < items.length) {
      const index = next; next += 1; const item = items[index]
      if (item !== undefined) results[index] = await mapper(item)
    }
  }))
  return results
}

/** @param ctx Harness context. @param config project and network limits. */
export function apply(ctx: Context, config: Config = {}): void {
  const webServer = ctx.get('webServer') as WebServer | undefined
  if (webServer === undefined) throw new Error('dsh-workspace: webServer service is unavailable')
  const baseUrl = config.baseUrl ?? 'https://api.deepseek.com'
  const apiKeyRef = credentialRef(config.apiKeyEnv ?? 'DEEPSEEK_API_KEY')
  const timezoneOffsetMinutes = config.timezoneOffsetMinutes ?? 0
  const balanceTimeoutMs = config.balanceTimeoutMs ?? 5_000
  const inspectConcurrency = config.inspectConcurrency ?? 8
  const peakWindows: [number, number][] = (config.peakWindows ?? [[540, 720], [840, 1_080]]).map(pair => [pair[0], pair[1]] as [number, number])
  const maxEntries = config.projectMaxEntries ?? 2_000
  const maxFileBytes = config.projectMaxFileBytes ?? 200_000
  const language = config.language ?? 'auto'
  try { const url = new URL(baseUrl); if (url.protocol !== 'http:' && url.protocol !== 'https:') throw new Error() } catch { throw new Error('dsh-workspace: baseUrl must be an absolute HTTP(S) URL') }
  if (!Number.isInteger(timezoneOffsetMinutes) || timezoneOffsetMinutes < -720 || timezoneOffsetMinutes > 840) throw new Error('dsh-workspace: timezoneOffsetMinutes must be an integer from -720 through 840')
  if (!Number.isInteger(balanceTimeoutMs) || balanceTimeoutMs < 1 || balanceTimeoutMs > 60_000) throw new Error('dsh-workspace: balanceTimeoutMs must be an integer from 1 through 60000')
  if (!Number.isInteger(inspectConcurrency) || inspectConcurrency < 1 || inspectConcurrency > 64) throw new Error('dsh-workspace: inspectConcurrency must be an integer from 1 through 64')
  let peakWindowJson = ''
  try { peakWindowJson = JSON.stringify(peakWindows) } catch { peakWindowJson = '' }
  if (!Array.isArray(peakWindows) || peakWindows.length === 0 || peakWindowJson.length === 0) throw new Error('dsh-workspace: peakWindows must be a non-empty JSON-array list')
  for (const pair of peakWindows) {
    const start = pair[0]; const end = pair[1]
    if (!Number.isInteger(start) || !Number.isInteger(end) || start < 0 || start > 1_440 || end < 0 || end > 1_440 || start === end) throw new Error('dsh-workspace: each peakWindow must be an integer [start, end] pair from 0 through 1440 with start !== end')
  }
  if (!Number.isInteger(maxEntries) || maxEntries < 100 || maxEntries > 20_000) throw new Error('dsh-workspace: projectMaxEntries must be an integer from 100 through 20000')
  if (!Number.isInteger(maxFileBytes) || maxFileBytes < 1_024 || maxFileBytes > 2_000_000) throw new Error('dsh-workspace: projectMaxFileBytes must be an integer from 1024 through 2000000')
  if (language !== 'auto' && language !== 'de' && language !== 'en') throw new Error("dsh-workspace: language must be 'auto', 'de', or 'en'")
  const browsers = new Map<string, Promise<ProjectBrowser>>()
  const getBrowser = (root: string): Promise<ProjectBrowser> => {
    let browser = browsers.get(root)
    if (browser === undefined) {
      browser = ProjectBrowser.create(root, maxEntries, maxFileBytes)
      browsers.set(root, browser)
    }
    return browser
  }
  const resolveProjectRoot = async (url: URL): Promise<string> => {
    if (config.projectRoot !== undefined) return config.projectRoot
    const sessionId = url.searchParams.get('sessionId')
    if (sessionId !== null) {
      const snapshot = (await ctx.sessionPersistence.listSnapshots()).find(item => item.header.id === sessionId)
      if (snapshot?.header.cwd !== undefined) return snapshot.header.cwd
    }
    const requestedCwd = url.searchParams.get('cwd')
    if (config.allowRemote !== true && requestedCwd !== null && isAbsolute(requestedCwd)) return requestedCwd
    return process.cwd()
  }
  const shellPath = config.shellPath ?? 'bash'
  const ptys = new Map<string, PtySession>()
  ctx.effect(() => () => {
    for (const session of ptys.values()) session.pty.kill()
    ptys.clear()
  })
  const openPty = async (url: URL): Promise<string> => {
    const cwd = await resolveProjectRoot(url)
    const pty = ptySpawn(shellPath, [], { cols: 80, rows: 24, cwd, env: process.env as Record<string, string> })
    const id = randomUUID()
    const session: PtySession = { pty, output: [] }
    pty.onData(data => {
      session.output.push(data)
      if (session.output.length > MAX_PTY_OUTPUT) session.output.splice(0, session.output.length - MAX_PTY_OUTPUT)
    })
    ptys.set(id, session)
    return id
  }
  const requirePost = (req: IncomingMessage, res: ServerResponse, requestId: string, resource: string): boolean => {
    if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); sendJson(res, 405, { status: 405, reason: 'METHOD_NOT_ALLOWED', message: 'Only POST requests are supported', fields: [], requestId }, requestId); return false }
    if (config.allowRemote !== true && !isLoopback(req)) { sendJson(res, 403, { status: 403, reason: 'FORBIDDEN', message: `${resource} is restricted to local requests by default`, fields: [], requestId }, requestId); return false }
    return true
  }
  const requireGet = (req: IncomingMessage, res: ServerResponse, requestId: string, resource: string): boolean => {
    if (req.method !== 'GET') { res.setHeader('Allow', 'GET'); sendJson(res, 405, { status: 405, reason: 'METHOD_NOT_ALLOWED', message: 'Only GET requests are supported', fields: [], requestId }, requestId); return false }
    if (config.allowRemote !== true && !isLoopback(req)) { sendJson(res, 403, { status: 403, reason: 'FORBIDDEN', message: `${resource} is restricted to local requests by default`, fields: [], requestId }, requestId); return false }
    return true
  }
  let cachedSignature: string | undefined
  let cachedLogs: readonly (readonly SessionEvent[])[] = []
  const readLogs = async (): Promise<readonly (readonly SessionEvent[])[]> => {
    const snapshots = await ctx.sessionPersistence.listSnapshots()
    const signature = JSON.stringify(snapshots.map(snapshot => [snapshot.header.id, snapshot.revision]))
    if (signature === cachedSignature) return cachedLogs
    const inspections = await mapConcurrent(snapshots, inspectConcurrency, snapshot => ctx.sessionPersistence.inspect(snapshot.header.id))
    cachedSignature = signature
    cachedLogs = inspections.map(inspection => inspection.events)
    return cachedLogs
  }

  const register = (path: string, read: (project: ProjectBrowser, url: URL) => Promise<unknown>): void => {
    ctx.effect(() => webServer.register({
      kind: 'exact', path,
      async handler(req, res) {
        const requestId = typeof req.headers['x-request-id'] === 'string' && req.headers['x-request-id'].length > 0 ? req.headers['x-request-id'] : randomUUID()
        if (req.method !== 'GET') { res.setHeader('Allow', 'GET'); sendJson(res, 405, { status: 405, reason: 'METHOD_NOT_ALLOWED', message: 'Only GET requests are supported', fields: [], requestId }, requestId); return }
        if (config.allowRemote !== true && !isLoopback(req)) { sendJson(res, 403, { status: 403, reason: 'FORBIDDEN', message: 'The project preview is restricted to local requests by default', fields: [], requestId }, requestId); return }
        try {
          const url = new URL(req.url ?? '/', 'http://localhost')
          sendJson(res, 200, await read(await getBrowser(await resolveProjectRoot(url)), url), requestId)
        } catch (error) {
          ctx.logger.warn(error)
          sendJson(res, 400, { status: 400, reason: 'PROJECT_PREVIEW_FAILED', message: error instanceof Error ? error.message : 'Project preview failed', fields: [], requestId }, requestId)
        }
      },
    }))
  }
  register('/api/v1/dsh-workspace/project', project => project.snapshot())
  register('/api/v1/dsh-workspace/file', (project, url) => project.read(url.searchParams.get('path') ?? ''))
  register('/api/v1/dsh-workspace/diff', (project, url) => project.diff(url.searchParams.get('path') ?? ''))
  register('/api/v1/dsh-workspace/logs', (project, url) => {
    const limit = Number(url.searchParams.get('limit') ?? '50')
    return project.logs(url.searchParams.get('path') ?? undefined, Number.isFinite(limit) ? Math.min(Math.max(limit, 1), 200) : 50)
  })
  register('/api/v1/dsh-workspace/commit', (project, url) => project.show(url.searchParams.get('hash') ?? ''))

  ctx.effect(() => webServer.register({
    kind: 'exact', path: '/api/v1/dsh-workspace/config',
    handler(req, res) {
      const requestId = typeof req.headers['x-request-id'] === 'string' && req.headers['x-request-id'].length > 0 ? req.headers['x-request-id'] : randomUUID()
      if (!requireGet(req, res, requestId, 'The client configuration')) return
      sendJson(res, 200, { language } satisfies WorkspaceClientConfig, requestId)
    },
  }))

  const invalidBody = (message: string): Error => Object.assign(new Error(message), { code: 'INVALID_BODY' })
  const registerWrite = (path: string, resource: string, bodyLimit: number, failureReason: string, write: (project: ProjectBrowser, body: Record<string, unknown>) => Promise<unknown>): void => {
    ctx.effect(() => webServer.register({
      kind: 'exact', path,
      async handler(req, res) {
        const requestId = typeof req.headers['x-request-id'] === 'string' && req.headers['x-request-id'].length > 0 ? req.headers['x-request-id'] : randomUUID()
        if (!requirePost(req, res, requestId, resource)) return
        try {
          const url = new URL(req.url ?? '/', 'http://localhost')
          const body = await readJson(req, bodyLimit)
          if (body === null || typeof body !== 'object' || Array.isArray(body)) {
            sendJson(res, 400, { status: 400, reason: 'INVALID_BODY', message: 'Request body must be a JSON object', fields: [], requestId }, requestId)
            return
          }
          sendJson(res, 200, await write(await getBrowser(await resolveProjectRoot(url)), body as Record<string, unknown>), requestId)
        } catch (error) {
          const code = (error as { code?: unknown }).code
          const message = error instanceof Error ? error.message : `${resource} failed`
          ctx.logger.warn(error)
          if (message === 'Request body too large' || code === 'FILE_TOO_LARGE') {
            sendJson(res, 413, { status: 413, reason: 'FILE_TOO_LARGE', message, fields: [], requestId }, requestId)
          } else if (code === 'FILE_EXISTS') {
            sendJson(res, 409, { status: 409, reason: 'FILE_EXISTS', message, fields: [], requestId }, requestId)
          } else if (code === 'BINARY_CONTENT' || code === 'IS_DIRECTORY' || code === 'INVALID_BODY') {
            sendJson(res, 400, { status: 400, reason: code, message, fields: [], requestId }, requestId)
          } else {
            sendJson(res, 400, { status: 400, reason: failureReason, message, fields: [], requestId }, requestId)
          }
        }
      },
    }))
  }
  registerWrite('/api/v1/dsh-workspace/file/write', 'File saving', maxFileBytes * 4 + 16_384, 'FILE_SAVE_FAILED', (project, body) => {
    const target = typeof body.path === 'string' ? body.path : undefined
    const content = typeof body.content === 'string' ? body.content : undefined
    if (target === undefined || content === undefined) throw invalidBody('Fields "path" and "content" must be strings')
    return project.write(target, content)
  })
  registerWrite('/api/v1/dsh-workspace/file/upload', 'File upload', Math.ceil(maxFileBytes * 4 / 3) + 16_384, 'FILE_UPLOAD_FAILED', (project, body) => {
    const name = typeof body.name === 'string' ? body.name : undefined
    const dataBase64 = typeof body.dataBase64 === 'string' ? body.dataBase64 : undefined
    if (name === undefined || dataBase64 === undefined) throw invalidBody('Fields "name" and "dataBase64" must be strings')
    const data = Buffer.from(dataBase64, 'base64')
    if (data.byteLength > maxFileBytes) throw Object.assign(new Error(`Upload exceeds the ${maxFileBytes}-byte limit`), { code: 'FILE_TOO_LARGE' })
    return project.upload(name, data, body.overwrite === true)
  })

  ctx.effect(() => webServer.register({
    kind: 'exact', path: '/api/v1/dsh-workspace/summary',
    async handler(req, res) {
      const requestId = typeof req.headers['x-request-id'] === 'string' && req.headers['x-request-id'].length > 0 ? req.headers['x-request-id'] : randomUUID()
      if (req.method !== 'GET') { res.setHeader('Allow', 'GET'); sendJson(res, 405, { status: 405, reason: 'METHOD_NOT_ALLOWED', message: 'Only GET requests are supported', fields: [], requestId }, requestId); return }
      if (config.allowRemote !== true && !isLoopback(req)) { sendJson(res, 403, { status: 403, reason: 'FORBIDDEN', message: 'Usage data is restricted to local requests by default', fields: [], requestId }, requestId); return }
      try {
        const now = Date.now()
        const resolvedApiKey = config.apiKey ?? (await ctx.credentials.resolve(apiKeyRef))?.value
        const [logs, balance] = await Promise.all([
          readLogs(),
          fetchBalance(resolvedApiKey, baseUrl, AbortSignal.timeout(balanceTimeoutMs)),
        ])
        const usage = aggregateToday(logs, now, timezoneOffsetMinutes)
        sendJson(res, 200, {
          generatedAt: Math.floor(now / 1000),
          usage: { ...usage, startTime: Math.floor(usage.startTime / 1000), endTime: Math.floor(usage.endTime / 1000) },
          balance,
          ratePeriod: trafficPeriodAt(now, timezoneOffsetMinutes, peakWindows),
          trafficSchedule: { timezoneOffsetMinutes, peakWindows },
        }, requestId)
      } catch (error) {
        ctx.logger.warn(error)
        sendJson(res, 500, { status: 500, reason: 'SUMMARY_FAILED', message: error instanceof Error ? error.message : 'Failed to read usage data', fields: [], requestId }, requestId)
      }
    },
  }))

  ctx.effect(() => webServer.register({
    kind: 'exact', path: '/api/v1/dsh-workspace/pty/open',
    async handler(req, res) {
      const requestId = typeof req.headers['x-request-id'] === 'string' && req.headers['x-request-id'].length > 0 ? req.headers['x-request-id'] : randomUUID()
      if (!requireGet(req, res, requestId, 'The terminal')) return
      try {
        const url = new URL(req.url ?? '/', 'http://localhost')
        sendJson(res, 200, { id: await openPty(url) }, requestId)
      } catch (error) {
        ctx.logger.warn(error)
        sendJson(res, 400, { status: 400, reason: 'PTY_OPEN_FAILED', message: error instanceof Error ? error.message : 'Failed to open terminal', fields: [], requestId }, requestId)
      }
    },
  }))
  ctx.effect(() => webServer.register({
    kind: 'exact', path: '/api/v1/dsh-workspace/pty/read',
    async handler(req, res) {
      const requestId = typeof req.headers['x-request-id'] === 'string' && req.headers['x-request-id'].length > 0 ? req.headers['x-request-id'] : randomUUID()
      if (!requireGet(req, res, requestId, 'The terminal')) return
      const url = new URL(req.url ?? '/', 'http://localhost')
      const id = url.searchParams.get('id')
      const session = id !== null ? ptys.get(id) : undefined
      if (session === undefined) { sendJson(res, 404, { status: 404, reason: 'PTY_NOT_FOUND', message: 'Terminal session not found', fields: [], requestId }, requestId); return }
      const sinceText = url.searchParams.get('since')
      const since = Number(sinceText ?? '0')
      sendJson(res, 200, { output: session.output.slice(Number.isFinite(since) ? since : 0), count: session.output.length }, requestId)
    },
  }))
  ctx.effect(() => webServer.register({
    kind: 'exact', path: '/api/v1/dsh-workspace/pty/write',
    async handler(req, res) {
      const requestId = typeof req.headers['x-request-id'] === 'string' && req.headers['x-request-id'].length > 0 ? req.headers['x-request-id'] : randomUUID()
      if (!requirePost(req, res, requestId, 'The terminal')) return
      try {
        const body = await readJson(req) as { id?: unknown; data?: unknown } | null
        const id = typeof body?.id === 'string' ? body.id : ''
        const data = typeof body?.data === 'string' ? body.data : ''
        const session = id.length > 0 ? ptys.get(id) : undefined
        if (session === undefined) { sendJson(res, 404, { status: 404, reason: 'PTY_NOT_FOUND', message: 'Terminal session not found', fields: [], requestId }, requestId); return }
        if (data.length > 0) session.pty.write(data)
        sendJson(res, 200, { ok: true }, requestId)
      } catch (error) {
        ctx.logger.warn(error)
        sendJson(res, 400, { status: 400, reason: 'PTY_WRITE_FAILED', message: error instanceof Error ? error.message : 'Failed to write to terminal', fields: [], requestId }, requestId)
      }
    },
  }))
  ctx.effect(() => webServer.register({
    kind: 'exact', path: '/api/v1/dsh-workspace/pty/resize',
    async handler(req, res) {
      const requestId = typeof req.headers['x-request-id'] === 'string' && req.headers['x-request-id'].length > 0 ? req.headers['x-request-id'] : randomUUID()
      if (!requirePost(req, res, requestId, 'The terminal')) return
      try {
        const body = await readJson(req) as { id?: unknown; cols?: unknown; rows?: unknown } | null
        const id = typeof body?.id === 'string' ? body.id : ''
        const cols = typeof body?.cols === 'number' ? body.cols : 80
        const rows = typeof body?.rows === 'number' ? body.rows : 24
        const session = id.length > 0 ? ptys.get(id) : undefined
        if (session === undefined) { sendJson(res, 404, { status: 404, reason: 'PTY_NOT_FOUND', message: 'Terminal session not found', fields: [], requestId }, requestId); return }
        session.pty.resize(Math.max(2, cols), Math.max(2, rows))
        sendJson(res, 200, { ok: true }, requestId)
      } catch (error) {
        ctx.logger.warn(error)
        sendJson(res, 400, { status: 400, reason: 'PTY_RESIZE_FAILED', message: error instanceof Error ? error.message : 'Failed to resize terminal', fields: [], requestId }, requestId)
      }
    },
  }))
  ctx.effect(() => webServer.register({
    kind: 'exact', path: '/api/v1/dsh-workspace/pty/close',
    async handler(req, res) {
      const requestId = typeof req.headers['x-request-id'] === 'string' && req.headers['x-request-id'].length > 0 ? req.headers['x-request-id'] : randomUUID()
      if (!requirePost(req, res, requestId, 'The terminal')) return
      try {
        const body = await readJson(req) as { id?: unknown } | null
        const id = typeof body?.id === 'string' ? body.id : ''
        const session = id.length > 0 ? ptys.get(id) : undefined
        if (session !== undefined) { session.pty.kill(); ptys.delete(id) }
        sendJson(res, 200, { ok: true }, requestId)
      } catch (error) {
        ctx.logger.warn(error)
        sendJson(res, 400, { status: 400, reason: 'PTY_CLOSE_FAILED', message: error instanceof Error ? error.message : 'Failed to close terminal', fields: [], requestId }, requestId)
      }
    },
  }))
}
