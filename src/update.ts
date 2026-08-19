import { readFileSync, realpathSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import { spawn } from 'node:child_process'
import { dirname, join, resolve } from 'node:path'
import type { UpdateCheck, UpdateRunResult } from './types.js'

const PACKAGE_NAME = '@deepseek-ai/dsh'

const REGISTRIES = [
  'https://registry.npmjs.org',
  'https://registry.npmmirror.com',
]

const FETCH_TIMEOUT_MS = 5_000

const SEMVER = /^(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z.-]+))?(?:\+[0-9A-Za-z.-]+)?$/

function parseSemver(version: string): { core: number[]; pre: string[] } | null {
  const m = SEMVER.exec(version.trim())
  if (m === null) return null
  return { core: [Number(m[1]), Number(m[2]), Number(m[3])], pre: m[4] === undefined ? [] : m[4].split('.') }
}

function compareVersions(a: string, b: string): number | null {
  const pa = parseSemver(a)
  const pb = parseSemver(b)
  if (pa === null || pb === null) return null
  for (let i = 0; i < 3; i++) {
    const diff = (pa.core[i] ?? 0) - (pb.core[i] ?? 0)
    if (diff !== 0) return diff
  }
  if (pa.pre.length === 0 || pb.pre.length === 0) return pb.pre.length - pa.pre.length
  for (let i = 0; i < Math.max(pa.pre.length, pb.pre.length); i++) {
    const x = pa.pre[i]
    const y = pb.pre[i]
    if (x === undefined) return -1
    if (y === undefined) return 1
    if (x === y) continue
    const nx = /^\d+$/.test(x)
    const ny = /^\d+$/.test(y)
    if (nx && ny) return Number(x) - Number(y)
    if (nx !== ny) return nx ? -1 : 1
    return x < y ? -1 : 1
  }
  return 0
}

function findDshInstallDir(): string | null {
  const entry = process.argv[1]
  if (entry === undefined) return null
  let dir = dirname(resolve(realpathSync(entry)))
  for (let depth = 0; depth < 16; depth += 1) {
    try {
      const manifest = JSON.parse(readFileSync(join(dir, 'package.json'), 'utf8')) as { name?: unknown }
      if (manifest.name === PACKAGE_NAME) return dir
    } catch {
      // keep walking up
    }
    const parent = dirname(dir)
    if (parent === dir) return null
    dir = parent
  }
  return null
}

async function readCurrentVersion(): Promise<string | null> {
  const dir = findDshInstallDir()
  if (dir === null) return null
  try {
    const manifest = JSON.parse(await readFile(join(dir, 'package.json'), 'utf8')) as { version?: unknown }
    return typeof manifest.version === 'string' ? manifest.version : null
  } catch {
    return null
  }
}

async function fetchLatestVersion(): Promise<string | null> {
  for (const registry of REGISTRIES) {
    try {
      const response = await fetch(`${registry}/${PACKAGE_NAME}/latest`, {
        headers: { Accept: 'application/json' },
        signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      })
      if (!response.ok) continue
      const body = await response.json() as { version?: unknown }
      if (typeof body.version === 'string') return body.version
    } catch {
      // try the next registry
    }
  }
  return null
}

export async function checkUpdate(): Promise<UpdateCheck> {
  const [currentVersion, latestVersion] = await Promise.all([readCurrentVersion(), fetchLatestVersion()])
  let outdated = false
  if (currentVersion !== null && latestVersion !== null) {
    const cmp = compareVersions(latestVersion, currentVersion)
    outdated = cmp !== null && cmp > 0
  }
  return {
    currentVersion,
    latestVersion,
    outdated,
    checkedAt: Date.now(),
    error: latestVersion === null ? '无法连接 npm registry' : currentVersion === null ? '无法读取已安装版本' : null,
  }
}

const UPDATE_TIMEOUT_MS = 10 * 60 * 1000

export function relaunchHarness(): void {
  const entry = process.argv[1]
  if (entry === undefined) return
  const args = process.argv.slice(2).map(arg => `'${arg.replace(/'/g, "'\\''")}'`).join(' ')
  const child = spawn('sh', ['-c', `sleep 2 && exec "${process.execPath}" "${entry}" ${args}`], {
    detached: true,
    stdio: 'inherit',
  })
  child.unref()
}

export function runHarnessUpdate(): Promise<UpdateRunResult> {
  const dir = findDshInstallDir()
  if (dir === null) return Promise.resolve({ ok: false, message: '无法定位 dsh 安装目录' })
  const prefix = dirname(dirname(dirname(dirname(dir))))
  return new Promise(resolvePromise => {
    const child = spawn('npm', ['install', '-g', '--prefix', prefix, `${PACKAGE_NAME}@latest`], {
      env: process.env,
      stdio: ['ignore', 'pipe', 'pipe'],
    })
    let output = ''
    const collect = (chunk: Buffer): void => { output = (output + chunk.toString()).slice(-8 * 1024) }
    child.stdout?.on('data', collect)
    child.stderr?.on('data', collect)
    const timer = setTimeout(() => child.kill('SIGKILL'), UPDATE_TIMEOUT_MS)
    child.on('error', error => {
      clearTimeout(timer)
      resolvePromise({ ok: false, message: `无法启动 npm：${error.message}` })
    })
    child.on('close', code => {
      clearTimeout(timer)
      if (code === 0) resolvePromise({ ok: true, message: '更新完成，即将自动重启' })
      else resolvePromise({ ok: false, message: `npm 更新失败（exit ${String(code)}）：${output.slice(-300)}` })
    })
  })
}