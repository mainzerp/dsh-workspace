import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react'
import type { ChangeEvent, ComponentType, PointerEvent as ReactPointerEvent } from 'react'
import { Terminal as Xterm } from '@xterm/xterm'
import { EditorView, basicSetup } from 'codemirror'
import { EditorState } from '@codemirror/state'
import { defaultHighlightStyle, syntaxHighlighting } from '@codemirror/language'
import type { LanguageSupport } from '@codemirror/language'
import { javascript } from '@codemirror/lang-javascript'
import { python } from '@codemirror/lang-python'
import { css } from '@codemirror/lang-css'
import { html } from '@codemirror/lang-html'
import { json } from '@codemirror/lang-json'
import { rust } from '@codemirror/lang-rust'
import { markdown } from '@codemirror/lang-markdown'
import { AtSign, Blocks, ChevronDown, ChevronRight, Database, Eraser, FileArchive, FileAudio, FileCode, FileImage, FileSpreadsheet, FileText, FileVideo, Folder, FolderOpen, FolderTree, GitBranch, PanelRightClose, PanelRightOpen, RefreshCw, Terminal, Upload, X } from 'lucide-react'
import { SiC, SiCplusplus, SiCss, SiGnubash, SiGo, SiHtml5, SiJavascript, SiJson, SiMarkdown, SiOpenjdk, SiPython, SiRust, SiSqlite, SiSvelte, SiTypescript, SiVuedotjs, SiYaml } from 'react-icons/si'
import type { LanguageFn } from 'highlight.js'
import hljs from 'highlight.js/lib/core'
import bashLang from 'highlight.js/lib/languages/bash'
import cLang from 'highlight.js/lib/languages/c'
import cppLang from 'highlight.js/lib/languages/cpp'
import cssLang from 'highlight.js/lib/languages/css'
import goLang from 'highlight.js/lib/languages/go'
import iniLang from 'highlight.js/lib/languages/ini'
import javaLang from 'highlight.js/lib/languages/java'
import javascriptLang from 'highlight.js/lib/languages/javascript'
import jsonLang from 'highlight.js/lib/languages/json'
import markdownLang from 'highlight.js/lib/languages/markdown'
import powershellLang from 'highlight.js/lib/languages/powershell'
import pythonLang from 'highlight.js/lib/languages/python'
import rustLang from 'highlight.js/lib/languages/rust'
import sqlLang from 'highlight.js/lib/languages/sql'
import typescriptLang from 'highlight.js/lib/languages/typescript'
import xmlLang from 'highlight.js/lib/languages/xml'
import yamlLang from 'highlight.js/lib/languages/yaml'
import type { GitCommitPreview, GitDiffPreview, GitLogEntry, GitLogPreview, GitLogRef, ProjectFilePreview, ProjectFileWriteResult, ProjectSnapshot, UsageSnapshot, WorkspaceClientConfig } from '../types.js'
import { setLanguage, t } from './i18n.js'
import { computeGraphLayout, GRAPH_LANE_WIDTH, GRAPH_ROW_HEIGHT, LANE_PALETTE } from './graph.js'
import { clampDrawerWidth, getDrawerCollapsedSnapshot, readDrawerCollapsed, readDrawerWidth, resolveDrawerWidth, subscribeDrawerCollapsed, writeDrawerCollapsed, writeDrawerWidth } from './drawer.js'
import { computeScheduleBar } from './daybar.js'

const HIGHLIGHT_LANGUAGES: ReadonlyArray<readonly [string, LanguageFn]> = [
  ['bash', bashLang], ['c', cLang], ['cpp', cppLang], ['css', cssLang], ['go', goLang],
  ['ini', iniLang], ['java', javaLang], ['javascript', javascriptLang], ['json', jsonLang],
  ['powershell', powershellLang], ['python', pythonLang], ['rust', rustLang], ['sql', sqlLang],
  ['markdown', markdownLang],
  ['typescript', typescriptLang], ['xml', xmlLang], ['yaml', yamlLang],
]
for (const [name, language] of HIGHLIGHT_LANGUAGES) hljs.registerLanguage(name, language)

const HLJS_BY_EXTENSION: Readonly<Record<string, string>> = {
  js: 'javascript', jsx: 'javascript', mjs: 'javascript', cjs: 'javascript',
  ts: 'typescript', tsx: 'typescript',
  css: 'css', scss: 'css',
  html: 'xml', xml: 'xml', svg: 'xml', vue: 'xml', svelte: 'xml',
  py: 'python', go: 'go', rs: 'rust', java: 'java',
  c: 'c', h: 'c', cpp: 'cpp', hpp: 'cpp', cc: 'cpp', hh: 'cpp',
  sh: 'bash', bash: 'bash', zsh: 'bash', ps1: 'powershell',
  sql: 'sql', yml: 'yaml', yaml: 'yaml', toml: 'ini',
  json: 'json', jsonc: 'json', md: 'markdown', mdx: 'markdown',
}

function hljsLanguageOf(path: string): string | undefined {
  const extension = path.split('.').at(-1)?.toLowerCase() ?? ''
  return HLJS_BY_EXTENSION[extension]
}

type FileIconComponent = ComponentType<{ size?: number | string }>

const FILE_ICONS: Readonly<Record<string, FileIconComponent>> = {
  js: SiJavascript, jsx: SiJavascript, mjs: SiJavascript, cjs: SiJavascript,
  ts: SiTypescript, tsx: SiTypescript,
  py: SiPython, go: SiGo, rs: SiRust, java: SiOpenjdk,
  c: SiC, h: SiC, cpp: SiCplusplus, hpp: SiCplusplus, cc: SiCplusplus, hh: SiCplusplus,
  html: SiHtml5, css: SiCss, scss: SiCss,
  vue: SiVuedotjs, svelte: SiSvelte,
  sh: SiGnubash, bash: SiGnubash, zsh: SiGnubash,
  json: SiJson, jsonc: SiJson, yml: SiYaml, yaml: SiYaml,
  md: SiMarkdown, mdx: SiMarkdown, txt: FileText,
  ps1: FileCode, sql: FileCode, toml: FileCode, xml: FileCode,
  sqlite: SiSqlite, sqlite3: SiSqlite, db: Database,
  png: FileImage, jpg: FileImage, jpeg: FileImage, gif: FileImage, webp: FileImage, svg: FileImage, bmp: FileImage, ico: FileImage,
  zip: FileArchive, tar: FileArchive, gz: FileArchive, '7z': FileArchive, rar: FileArchive,
  csv: FileSpreadsheet, xlsx: FileSpreadsheet, xls: FileSpreadsheet, tsv: FileSpreadsheet,
  mp3: FileAudio, wav: FileAudio, ogg: FileAudio, flac: FileAudio, m4a: FileAudio,
  mp4: FileVideo, mkv: FileVideo, avi: FileVideo, mov: FileVideo, webm: FileVideo,
}

const BRAND_COLORS: Readonly<Record<string, string>> = {
  go: '#00ADD8', py: '#3776AB',
  c: '#A8B9CC', h: '#A8B9CC', cpp: '#00599C', hpp: '#00599C', cc: '#00599C', hh: '#00599C',
  js: '#F7DF1E', jsx: '#F7DF1E', mjs: '#F7DF1E', cjs: '#F7DF1E', ts: '#3178C6', tsx: '#3178C6',
  html: '#E34F26', css: '#663399', scss: '#663399',
  vue: '#4FC08D', svelte: '#FF3E00',
  sh: '#4EAA25', bash: '#4EAA25', zsh: '#4EAA25',
  yml: '#CB171E', yaml: '#CB171E',
  sqlite: '#003B57', sqlite3: '#003B57',
  java: '#E76F00', rs: '#DEA584',
  json: '#CBCB40', jsonc: '#CBCB40',
  md: '#083FA6', mdx: '#083FA6',
  sql: '#E38C00', toml: '#9C4221', xml: '#0060AC',
  ps1: '#5391FE', db: '#003B57',
  png: '#B76E4A', jpg: '#B76E4A', jpeg: '#B76E4A', gif: '#B76E4A', webp: '#B76E4A', svg: '#E34F26', bmp: '#B76E4A', ico: '#B76E4A',
  zip: '#FF8C00', tar: '#FF8C00', gz: '#FF8C00', '7z': '#FF8C00', rar: '#FF8C00',
  csv: '#217346', xlsx: '#217346', xls: '#217346', tsv: '#217346',
  mp3: '#E91E63', wav: '#E91E63', ogg: '#E91E63', flac: '#E91E63', m4a: '#E91E63',
  mp4: '#9C27B0', mkv: '#9C27B0', avi: '#9C27B0', mov: '#9C27B0', webm: '#9C27B0',
}

function FileTypeIcon({ path }: { path: string }) {
  const extension = path.split('.').at(-1)?.toLowerCase() ?? ''
  const Icon = FILE_ICONS[extension] ?? FileText
  const color = BRAND_COLORS[extension]
  return color === undefined ? <Icon size={13} /> : <Icon size={13} color={color} />
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;')
}

interface SlotsService {
  inject(name: string, callback: () => unknown): unknown
  register(options: { name: string; id: string; order: number }, component: unknown): () => void
}
interface SessionListSnapshot {
  current?: string
  byId: Record<string, { cwd?: string }>
}
interface SessionsService {
  list: { getSnapshot(): SessionListSnapshot; subscribe(callback: () => void): () => void }
}
interface ClientContext { slots: SlotsService; sessions: SessionsService; effect(callback: () => void | (() => void), label?: string): unknown }

type EditorPresentation = 'code' | 'diff' | 'json' | 'image' | 'text' | 'binary'
const CODE_EXTENSIONS = new Set(['js', 'jsx', 'ts', 'tsx', 'mjs', 'cjs', 'css', 'scss', 'html', 'vue', 'svelte', 'py', 'go', 'rs', 'java', 'c', 'h', 'cpp', 'hpp', 'sh', 'bash', 'zsh', 'ps1', 'sql', 'yml', 'yaml', 'toml', 'xml', 'md', 'mdx'])

function presentationOf(path: string, source: 'file' | 'diff' | 'commit', binary: boolean, dataUrl: string | undefined): EditorPresentation {
  if (source === 'diff' || source === 'commit') return 'diff'
  if (dataUrl !== undefined) return 'image'
  if (binary) return 'binary'
  const extension = path.split('.').at(-1)?.toLowerCase() ?? ''
  if (extension === 'json' || extension === 'jsonc') return 'json'
  return CODE_EXTENSIONS.has(extension) ? 'code' : 'text'
}

function formattedJson(content: string): string {
  try { return JSON.stringify(JSON.parse(content), null, 2) } catch { return content }
}

function commitTime(timestamp: number): string {
  const elapsed = Math.max(0, Date.now() / 1000 - timestamp)
  if (elapsed < 60) return t.justNow
  if (elapsed < 3_600) return t.minutesAgo(Math.floor(elapsed / 60))
  if (elapsed < 86_400) return t.hoursAgo(Math.floor(elapsed / 3_600))
  if (elapsed < 7 * 86_400) return t.daysAgo(Math.floor(elapsed / 86_400))
  const date = new Date(timestamp * 1000)
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

function refTooltip(ref: GitLogRef): string {
  if (ref.kind === 'branch') return t.refBranch(ref.name)
  if (ref.kind === 'remote') return t.refRemote(ref.name)
  if (ref.kind === 'tag') return t.refTag(ref.name)
  return t.refHead
}

function CodePreview({ content, diff = false, language }: { content: string; diff?: boolean; language?: string | undefined }) {
  const body = language === undefined ? escapeHtml(content) : (() => {
    try { return hljs.highlight(content, { language }).value } catch { return escapeHtml(content) }
  })()
  const lines = body.split('\n').filter(line => !diff || !/^(diff --git |index |--- |\+\+\+ |@@ |new file mode |deleted file mode |old mode |new mode |similarity index |rename from |rename to |Binary files )/.test(line))
  return <div className="hui-code-view">{lines.map((line, index) => <div className="hui-code-line" data-change={diff ? line.startsWith('+') ? 'add' : line.startsWith('-') ? 'delete' : undefined : undefined} key={index}><span>{index + 1}</span><code dangerouslySetInnerHTML={{ __html: line || ' ' }} /></div>)}</div>
}

function codemirrorLanguageOf(path: string): LanguageSupport | undefined {
  const extension = path.split('.').at(-1)?.toLowerCase() ?? ''
  switch (extension) {
    case 'js': case 'mjs': case 'cjs': return javascript()
    case 'jsx': return javascript({ jsx: true })
    case 'ts': return javascript({ typescript: true })
    case 'tsx': return javascript({ typescript: true, jsx: true })
    case 'py': return python()
    case 'css': case 'scss': return css()
    case 'html': case 'htm': case 'vue': case 'svelte': return html()
    case 'json': case 'jsonc': return json()
    case 'rs': return rust()
    case 'md': case 'mdx': return markdown()
    default: return undefined
  }
}

function CodeEditor({ path, initialContent, saving, onSave, onCancel }: { path: string; initialContent: string; saving: boolean; onSave(content: string): void; onCancel(): void }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const viewRef = useRef<EditorView | null>(null)
  useEffect(() => {
    const container = containerRef.current
    if (container === null) return
    const language = codemirrorLanguageOf(path)
    const view = new EditorView({
      state: EditorState.create({
        doc: initialContent,
        extensions: [
          basicSetup,
          ...(language === undefined ? [] : [language]),
          syntaxHighlighting(defaultHighlightStyle),
          EditorView.theme({
            '&': { height: '100%', fontSize: '12px', backgroundColor: 'var(--dsw-alias-bg-base, #fff)', color: 'var(--dsw-alias-label-primary, #172033)' },
            '.cm-content': { fontFamily: '"SFMono-Regular",Consolas,"Liberation Mono",Menlo,monospace', lineHeight: '1.65' },
            '.cm-gutters': { backgroundColor: 'var(--dsw-alias-bg-module-platform, #fafbfc)', color: 'var(--dsw-alias-label-tertiary, #8a93a5)', border: 'none' },
            '.cm-activeLine': { backgroundColor: 'var(--dsw-alias-interactive-bg-hover, #eef0f4)' },
            '&.cm-focused': { outline: 'none' },
          }),
        ],
      }),
      parent: container,
    })
    viewRef.current = view
    view.focus()
    return () => { view.destroy(); viewRef.current = null }
  }, [path, initialContent])
  const save = useCallback(() => {
    const view = viewRef.current
    if (view !== null) onSave(view.state.doc.toString())
  }, [onSave])
  const cancel = useCallback(() => {
    const view = viewRef.current
    if (view !== null && view.state.doc.toString() !== initialContent && !window.confirm(t.editorDiscardChanges)) return
    onCancel()
  }, [initialContent, onCancel])
  return <div className="hui-editor-edit">
    <div className="hui-editor-cm" ref={containerRef} />
    <div className="hui-editor-actions">
      <button type="button" data-primary="true" disabled={saving} onClick={save}>{saving ? t.editorSaving : t.editorSave}</button>
      <button type="button" disabled={saving} onClick={cancel}>{t.editorCancel}</button>
    </div>
  </div>
}

interface DraftBridge {
  read(): string
  write(text: string): void
}

const draftBridges = new Map<string, DraftBridge>()

function ComposerBridge({ sessionId, inputActions, useInput }: { sessionId?: string; inputActions?: { setDraft(text: string): void }; useInput?: (selector: (state: { draft: string }) => string) => string }) {
  const draft = useInput?.((state: { draft: string }) => state.draft) ?? ''
  const draftRef = useRef('')
  draftRef.current = draft
  useEffect(() => {
    if (sessionId === undefined || inputActions === undefined) return
    const bridge: DraftBridge = {
      read: () => draftRef.current,
      write: text => inputActions.setDraft(text),
    }
    draftBridges.set(sessionId, bridge)
    return () => { if (draftBridges.get(sessionId) === bridge) draftBridges.delete(sessionId) }
  }, [inputActions, sessionId])
  return null
}

function TerminalPanel({ sessionId, cwd }: { sessionId: string | undefined; cwd: string | undefined }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const termRef = useRef<Xterm | null>(null)
  const ptyIdRef = useRef<string | null>(null)
  const sinceRef = useRef(0)
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const container = containerRef.current
    if (container === null) return
    let disposed = false
    const styles = getComputedStyle(document.documentElement)
    const backgroundColor = styles.getPropertyValue('--dsw-alias-bg-base').trim() || '#f8f8f8'
    const foregroundColor = styles.getPropertyValue('--dsw-alias-label-primary').trim() || '#172033'
    const term = new Xterm({
      convertEol: true,
      cursorBlink: true,
      fontFamily: '"SFMono-Regular",Consolas,"Liberation Mono",Menlo,monospace',
      fontSize: 12,
      scrollback: 5_000,
      theme: { background: backgroundColor, foreground: foregroundColor, cursor: foregroundColor },
    })
    term.open(container)
    termRef.current = term
    const params = new URLSearchParams()
    if (sessionId !== undefined) params.set('sessionId', sessionId)
    if (cwd !== undefined) params.set('cwd', cwd)
    const query = params.size === 0 ? '' : `?${params.toString()}`
    const request = (path: string, body?: unknown): Promise<Response> => {
      if (body === undefined) return fetch(`/api/v1/dsh-workspace/pty/${path}${query}`)
      return fetch(`/api/v1/dsh-workspace/pty/${path}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    }
    void request('open').then(async response => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      const data = await response.json() as { id?: string }
      if (disposed) { if (data.id !== undefined) void request('close', { id: data.id }); return }
      if (data.id === undefined) throw new Error(t.noTerminalSessionId)
      ptyIdRef.current = data.id
      sinceRef.current = 0
      term.focus()
      setReady(true)
    }).catch(reason => {
      if (!disposed) term.write(`\x1b[31m${t.terminalOpenFailed(reason instanceof Error ? reason.message : String(reason))}\x1b[0m`)
    })
    const onData = term.onData(data => {
      const id = ptyIdRef.current
      if (id !== null) void request('write', { id, data })
    })
    const onResize = term.onResize(size => {
      const id = ptyIdRef.current
      if (id !== null) void request('resize', { id, cols: size.cols, rows: size.rows })
    })
    let timer = 0
    const tick = () => {
      if (disposed) return
      const id = ptyIdRef.current
      if (id === null) { timer = window.setTimeout(tick, 80); return }
      void fetch(`/api/v1/dsh-workspace/pty/read?id=${encodeURIComponent(id)}&since=${sinceRef.current}`).then(async response => {
        if (!response.ok || disposed) return
        const data = await response.json() as { output?: string[]; count?: number }
        const count = data.count ?? 0
        if (count > sinceRef.current) {
          for (const chunk of data.output ?? []) term.write(chunk)
          sinceRef.current = count
        }
      }).catch(() => {}).finally(() => {
        if (!disposed) timer = window.setTimeout(tick, 80)
      })
    }
    timer = window.setTimeout(tick, 80)
    return () => {
      disposed = true
      window.clearTimeout(timer)
      onData.dispose()
      onResize.dispose()
      const id = ptyIdRef.current
      ptyIdRef.current = null
      if (id !== null) void request('close', { id })
      term.dispose()
      termRef.current = null
    }
  }, [cwd, sessionId])
  const clear = useCallback(() => { termRef.current?.clear() }, [])
  return <div className="hui-terminal">
    <div className="hui-term-toolbar"><span><Terminal size={13} /> {t.terminal}</span><span className="hui-term-actions">{ready ? <button type="button" title={t.clearOutput} aria-label={t.clearOutput} onClick={clear}><Eraser size={13} /></button> : null}</span></div>
    <div className="hui-term-screen" ref={containerRef} />
  </div>
}

function ProjectDrawer({ sessionId, cwd }: { sessionId: string | undefined; cwd: string | undefined }) {
  const [snapshot, setSnapshot] = useState<ProjectSnapshot | null>(null)
  const [mode, setMode] = useState<'files' | 'changes' | 'terminal'>('files')
  const [selected, setSelected] = useState<string | null>(null)
  const [preview, setPreview] = useState('')
  const [previewSource, setPreviewSource] = useState<'file' | 'diff' | 'commit'>('file')
  const [previewBinary, setPreviewBinary] = useState(false)
  const [previewDataUrl, setPreviewDataUrl] = useState<string | undefined>(undefined)
  const [truncated, setTruncated] = useState(false)
  const [editing, setEditing] = useState(false)
  const [draftContent, setDraftContent] = useState('')
  const [saving, setSaving] = useState(false)
  const [editorError, setEditorError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set())
  const [changesOpen, setChangesOpen] = useState(true)
  const [historyOpen, setHistoryOpen] = useState(false)
  const [gitLog, setGitLog] = useState<GitLogEntry[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [drawerWidth, setDrawerWidth] = useState<number | null>(() => (typeof window === 'undefined' ? null : readDrawerWidth(window.innerWidth)))
  const [collapsed, setCollapsed] = useState<boolean>(readDrawerCollapsed)
  // The floating expand button lives in a second slot registration; the store is the shared truth.
  const storedCollapsed = useSyncExternalStore(subscribeDrawerCollapsed, getDrawerCollapsedSnapshot)
  useEffect(() => { setCollapsed(storedCollapsed) }, [storedCollapsed])
  const effectiveWidth = resolveDrawerWidth(collapsed, drawerWidth, selected)
  useEffect(() => {
    const root = document.documentElement
    if (effectiveWidth === null) root.style.removeProperty('--hui-drawer-width')
    else root.style.setProperty('--hui-drawer-width', `${effectiveWidth}px`)
    return () => { root.style.removeProperty('--hui-drawer-width') }
  }, [effectiveWidth])
  useEffect(() => {
    const onResize = () => setDrawerWidth(current => current === null ? null : clampDrawerWidth(current, window.innerWidth))
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  const startResize = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return
    event.preventDefault()
    const drawer = event.currentTarget.parentElement
    const startX = event.clientX
    const startWidth = drawer === null ? 600 : drawer.getBoundingClientRect().width
    let latestWidth: number | null = null
    const onMove = (move: PointerEvent) => {
      const next = startWidth - (move.clientX - startX)
      const clamped = clampDrawerWidth(next, window.innerWidth)
      latestWidth = clamped
      setDrawerWidth(clamped)
    }
    const onUp = () => {
      if (latestWidth !== null) writeDrawerWidth(latestWidth)
      document.body.style.cursor = ''
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
    document.body.style.cursor = 'col-resize'
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
  }, [])
  const refresh = useCallback(() => {
    setError(null)
    const params = new URLSearchParams()
    if (sessionId !== undefined) params.set('sessionId', sessionId)
    if (cwd !== undefined) params.set('cwd', cwd)
    const query = params.size === 0 ? '' : `?${params.toString()}`
    void fetch(`/api/v1/dsh-workspace/project${query}`).then(async response => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      return await response.json() as ProjectSnapshot
    }).then(setSnapshot).catch(reason => setError(reason instanceof Error ? reason.message : String(reason)))
  }, [cwd, sessionId])
  useEffect(refresh, [refresh])
  useEffect(() => {
    setSelected(null)
    setPreview('')
    setPreviewBinary(false)
    setPreviewDataUrl(undefined)
    setTruncated(false)
    setEditing(false)
    setDraftContent('')
    setSaving(false)
    setEditorError(null)
    setExpanded(new Set())
    setGitLog(null)
  }, [sessionId])
  const open = useCallback((path: string, kind: 'file' | 'diff') => {
    setSelected(path); setPreview(t.loading); setPreviewSource(kind); setPreviewBinary(false); setPreviewDataUrl(undefined); setTruncated(false); setEditing(false); setEditorError(null)
    const endpoint = kind === 'file' ? '/api/v1/dsh-workspace/file' : '/api/v1/dsh-workspace/diff'
    const params = new URLSearchParams({ path })
    if (sessionId !== undefined) params.set('sessionId', sessionId)
    if (cwd !== undefined) params.set('cwd', cwd)
    void fetch(`${endpoint}?${params.toString()}`).then(async response => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      return await response.json() as ProjectFilePreview | GitDiffPreview
    }).then(data => {
      if ('content' in data) {
        setPreviewBinary(data.binary)
        setPreviewDataUrl(data.dataUrl)
        setTruncated(data.truncated)
        setPreview(data.content + (data.truncated ? t.previewTruncated : ''))
      } else setPreview((data.diff || t.noTextualDiffForChange) + (data.truncated ? t.previewTruncated : ''))
    }).catch(reason => setPreview(t.readFailed(reason instanceof Error ? reason.message : String(reason))))
  }, [cwd, sessionId])
  const toggleDirectory = useCallback((path: string) => {
    setExpanded(current => {
      const next = new Set(current)
      if (next.has(path)) next.delete(path); else next.add(path)
      return next
    })
  }, [])
  const loadHistory = useCallback(() => {
    const params = new URLSearchParams()
    if (sessionId !== undefined) params.set('sessionId', sessionId)
    if (cwd !== undefined) params.set('cwd', cwd)
    params.set('limit', '200')
    const query = params.size === 0 ? '' : `?${params.toString()}`
    void fetch(`/api/v1/dsh-workspace/logs${query}`).then(async response => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      const data = await response.json() as GitLogPreview
      setGitLog(data.entries)
    }).catch(reason => { setGitLog([]); setError(reason instanceof Error ? reason.message : String(reason)) })
  }, [cwd, sessionId])
  const openCommit = useCallback((hash: string) => {
    setSelected(hash); setPreview(t.loading); setPreviewSource('commit'); setPreviewBinary(false); setPreviewDataUrl(undefined)
    const params = new URLSearchParams({ hash })
    if (sessionId !== undefined) params.set('sessionId', sessionId)
    if (cwd !== undefined) params.set('cwd', cwd)
    void fetch(`/api/v1/dsh-workspace/commit?${params.toString()}`).then(async response => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      return await response.json() as GitCommitPreview
    }).then(data => setPreview((data.diff || t.noTextualDiffForCommit) + (data.truncated ? t.previewTruncated : ''))).catch(reason => setPreview(t.readFailed(reason instanceof Error ? reason.message : String(reason))))
  }, [cwd, sessionId])
  useEffect(() => {
    if (mode === 'changes' && historyOpen && snapshot?.gitAvailable !== false) loadHistory()
  }, [historyOpen, loadHistory, mode, snapshot?.gitAvailable])
  const entries = snapshot?.entries ?? []
  const visibleEntries = entries.filter(entry => {
    const segments = entry.path.split('/')
    for (let index = 1; index < segments.length; index += 1) {
      if (!expanded.has(segments.slice(0, index).join('/'))) return false
    }
    return true
  })
  const selectedName = selected?.split('/').at(-1)
  const graphLayout = useMemo(() => gitLog === null || gitLog.length === 0 ? null : computeGraphLayout(gitLog), [gitLog])
  const presentation = selected === null ? 'text' : presentationOf(selected, previewSource, previewBinary, previewDataUrl)
  const editable = selected !== null && previewSource === 'file' && !previewBinary && !truncated && (presentation === 'code' || presentation === 'json' || presentation === 'text')
  const closeFile = useCallback(() => {
    setSelected(null); setPreview(''); setPreviewBinary(false); setPreviewDataUrl(undefined)
    setTruncated(false); setEditing(false); setDraftContent(''); setSaving(false); setEditorError(null)
  }, [])
  const attachFile = useCallback((path: string) => {
    if (sessionId === undefined) return
    const bridge = draftBridges.get(sessionId)
    if (bridge === undefined) return
    const token = `@${path}`
    const draft = bridge.read()
    const next = draft.length === 0 ? token : `${draft.replace(/\s+$/, '')} ${token}`
    bridge.write(next)
  }, [sessionId])
  const startEdit = useCallback(() => {
    if (selected === null) return
    setEditorError(null)
    const params = new URLSearchParams({ path: selected })
    if (sessionId !== undefined) params.set('sessionId', sessionId)
    if (cwd !== undefined) params.set('cwd', cwd)
    void fetch(`/api/v1/dsh-workspace/file?${params.toString()}`).then(async response => {
      if (!response.ok) {
        const data = await response.json().catch(() => null) as { message?: string } | null
        throw new Error(data?.message ?? `HTTP ${response.status}`)
      }
      return await response.json() as ProjectFilePreview
    }).then(data => {
      setTruncated(data.truncated)
      setPreviewBinary(data.binary)
      if (data.truncated || data.binary) return
      setDraftContent(data.content)
      setEditing(true)
    }).catch(reason => setEditorError(reason instanceof Error ? reason.message : String(reason)))
  }, [cwd, selected, sessionId])
  const saveFile = useCallback((content: string) => {
    if (selected === null) return
    setSaving(true)
    setEditorError(null)
    const params = new URLSearchParams()
    if (sessionId !== undefined) params.set('sessionId', sessionId)
    if (cwd !== undefined) params.set('cwd', cwd)
    const query = params.size === 0 ? '' : `?${params.toString()}`
    void fetch(`/api/v1/dsh-workspace/file/write${query}`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ path: selected, content }),
    }).then(async response => {
      if (!response.ok) {
        const data = await response.json().catch(() => null) as { reason?: string; message?: string } | null
        throw new Error(data?.reason ?? data?.message ?? `HTTP ${response.status}`)
      }
      return await response.json() as ProjectFileWriteResult
    }).then(() => {
      setSaving(false)
      setEditing(false)
      setDraftContent('')
      open(selected, 'file')
      refresh()
    }).catch(reason => {
      setSaving(false)
      setEditorError(t.editorSaveFailed(reason instanceof Error ? reason.message : String(reason)))
    })
  }, [cwd, open, refresh, selected, sessionId])
  const cancelEdit = useCallback(() => {
    setEditing(false)
    setDraftContent('')
    setSaving(false)
    setEditorError(null)
  }, [])
  const uploadFile = useCallback(async (file: File, overwrite: boolean) => {
    const buffer = new Uint8Array(await file.arrayBuffer())
    let binary = ''
    for (let index = 0; index < buffer.length; index += 32_768) binary += String.fromCharCode(...buffer.subarray(index, index + 32_768))
    const params = new URLSearchParams()
    if (sessionId !== undefined) params.set('sessionId', sessionId)
    if (cwd !== undefined) params.set('cwd', cwd)
    const query = params.size === 0 ? '' : `?${params.toString()}`
    const response = await fetch(`/api/v1/dsh-workspace/file/upload${query}`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: file.name, dataBase64: btoa(binary), overwrite }),
    })
    if (response.ok) {
      setNotice(t.uploadDone(file.name))
      refresh()
      return
    }
    const data = await response.json().catch(() => null) as { reason?: string; message?: string } | null
    if (response.status === 409 && data?.reason === 'FILE_EXISTS') {
      if (window.confirm(t.uploadOverwriteConfirm(file.name))) await uploadFile(file, true)
      return
    }
    setError(t.uploadFailed(data?.reason ?? data?.message ?? `HTTP ${response.status}`))
  }, [cwd, refresh, sessionId])
  const onUploadPick = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (file === undefined) return
    uploadFile(file, false).catch(reason => setError(t.uploadFailed(reason instanceof Error ? reason.message : String(reason))))
  }, [uploadFile])
  const applyCollapsed = useCallback((next: boolean) => {
    writeDrawerCollapsed(next)
  }, [])
  return <aside className="hui-drawer" data-collapsed={collapsed || undefined} aria-label={t.projectPreview} style={effectiveWidth === null ? undefined : { width: effectiveWidth }}>
    {collapsed ? null : <div className="hui-resizer" aria-hidden="true" onPointerDown={startResize} />}
    <header className="hui-titlebar"><div><span className="hui-vscode-mark"><Blocks size={14} /></span><span title={snapshot?.rootPath}>{snapshot?.rootPath ?? t.loadingCurrentProject}</span></div><button type="button" aria-label={t.collapseDrawer} title={t.collapseDrawer} onClick={() => applyCollapsed(true)}><PanelRightClose size={14} /></button></header>
    {error ? <div className="hui-error">{error}<button type="button" onClick={() => setError(null)} aria-label={t.dismiss} title={t.dismiss}><X size={12} /></button></div> : null}
    {notice ? <div className="hui-notice">{notice}<button type="button" onClick={() => setNotice(null)} aria-label={t.dismiss} title={t.dismiss}><X size={12} /></button></div> : null}
    <div className="hui-workbench" data-preview={(selected !== null && mode !== 'terminal') || undefined}>
      <nav className="hui-activity" aria-label={t.projectViews}><button type="button" aria-label={t.explorer} title={t.explorer} data-active={mode === 'files' || undefined} onClick={() => setMode('files')}><FolderTree size={20} /></button><button type="button" aria-label={t.sourceControl} title={t.sourceControl} data-active={mode === 'changes' || undefined} onClick={() => setMode('changes')}><GitBranch size={20} />{snapshot?.changes.length ? <b>{snapshot.changes.length}</b> : null}</button><button type="button" aria-label={t.terminal} title={t.terminal} data-active={mode === 'terminal' || undefined} onClick={() => setMode('terminal')}><Terminal size={20} /></button></nav>
      <section className="hui-explorer">
        <header><strong>{mode === 'files' ? t.explorer : mode === 'changes' ? t.sourceControl : t.terminal}</strong>{mode !== 'terminal' ? <><button type="button" onClick={() => fileInputRef.current?.click()} aria-label={t.upload} title={t.upload}><Upload size={15} /></button><button type="button" onClick={refresh} aria-label={t.refresh} title={t.refresh}><RefreshCw size={15} /></button></> : null}</header>
        {mode !== 'terminal' ? <input ref={fileInputRef} type="file" style={{ display: 'none' }} onChange={onUploadPick} /> : null}
        {mode === 'terminal' ? <TerminalPanel sessionId={sessionId} cwd={cwd} /> : mode === 'files' ? <>
        <div className="hui-section-title"><ChevronDown size={14} /><b>{snapshot?.rootName?.toUpperCase() ?? 'PROJECT'}</b></div>
        <div className="hui-tree" role="tree">
          {visibleEntries.map(entry => entry.kind === 'directory'
            ? <button type="button" role="treeitem" aria-expanded={expanded.has(entry.path)} key={entry.path} className="hui-tree-row" style={{ paddingLeft: 7 + Math.min(entry.depth, 12) * 13 }} title={entry.path} onClick={() => toggleDirectory(entry.path)}><span className="hui-chevron">{expanded.has(entry.path) ? <ChevronDown size={12} /> : <ChevronRight size={12} />}</span>{expanded.has(entry.path) ? <FolderOpen className="hui-folder-icon" size={13} /> : <Folder className="hui-folder-icon" size={13} />}<span>{entry.name}</span></button>
            : <div role="treeitem" key={entry.path} className="hui-tree-row" data-selected={selected === entry.path || undefined} style={{ paddingLeft: 20 + Math.min(entry.depth, 12) * 13 }} title={entry.path}><button type="button" className="hui-tree-open" onClick={() => open(entry.path, 'file')}><FileTypeIcon path={entry.path} /><span>{entry.name}</span><span role="button" tabIndex={0} className="hui-tree-at" title={t.referenceThisFile} aria-label={t.referenceFile(entry.name)} onClick={event => { event.stopPropagation(); attachFile(entry.path) }} onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); event.stopPropagation(); attachFile(entry.path) } }}><AtSign size={13} /></span></button></div>)}
          {snapshot?.truncated ? <p>{t.listTruncated}</p> : null}
        </div>
        </> : <>
        <div className="hui-section-title" role="button" title={changesOpen ? t.collapseChanges : t.expandChanges} onClick={() => setChangesOpen(current => !current)}>{changesOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}<b>CHANGES</b><em>{snapshot?.changes.length ?? 0}</em></div>
        {changesOpen ? <div className="hui-tree">
          {snapshot?.gitAvailable === false ? <div className="hui-empty-small">{t.notGitRepository}</div> : snapshot?.gitAvailable && snapshot.changes.length === 0 ? <div className="hui-empty-small">{t.noPendingChanges}</div> : snapshot?.changes.map(change => <button type="button" key={`${change.status}:${change.path}`} className="hui-tree-row hui-change" data-selected={selected === change.path || undefined} title={change.path} onClick={() => open(change.path, 'diff')}><span>{change.path.split('/').at(-1)}</span><small>{change.path.includes('/') ? change.path.slice(0, change.path.lastIndexOf('/')) : ''}</small><b data-status={change.status}>{change.status}</b></button>)}
        </div> : null}
        <div className="hui-section-title" role="button" title={historyOpen ? t.collapseHistory : t.expandHistory} onClick={() => setHistoryOpen(current => !current)}>{historyOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}<b>HISTORY</b><em>{gitLog?.length ?? 0}</em></div>
        {historyOpen ? <div className="hui-tree">
          {snapshot?.gitAvailable === false ? <div className="hui-empty-small">{t.notGitRepository}</div>
           : gitLog === null ? <div className="hui-empty-small">{t.loadingHistory}</div>
           : gitLog.length === 0 || graphLayout === null ? <div className="hui-empty-small">{t.noCommits}</div>
           : <div className="hui-graph" role="list" aria-label={t.historyGraph}>
              <svg className="hui-graph-edges" width={graphLayout.laneCount * GRAPH_LANE_WIDTH} height={gitLog.length * GRAPH_ROW_HEIGHT} aria-hidden="true">
                {graphLayout.edges.map((edge, index) => {
                  const x1 = edge.from.lane * GRAPH_LANE_WIDTH + GRAPH_LANE_WIDTH / 2
                  const y1 = edge.from.row * GRAPH_ROW_HEIGHT + GRAPH_ROW_HEIGHT / 2
                  const x2 = edge.to.lane * GRAPH_LANE_WIDTH + GRAPH_LANE_WIDTH / 2
                  const y2 = Math.min(edge.to.row, gitLog.length - 1) * GRAPH_ROW_HEIGHT + GRAPH_ROW_HEIGHT / 2 + (edge.to.row >= gitLog.length ? GRAPH_ROW_HEIGHT / 2 : 0)
                  const color = LANE_PALETTE[(edge.merge ? edge.to.lane : edge.from.lane) % LANE_PALETTE.length]
                  return edge.from.lane === edge.to.lane
                    ? <line key={index} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={1.5} />
                    : <path key={index} d={`M ${x1} ${y1} C ${x1} ${y1 + GRAPH_ROW_HEIGHT}, ${x2} ${y2 - GRAPH_ROW_HEIGHT}, ${x2} ${y2}`} fill="none" stroke={color} strokeWidth={1.5} />
                })}
                {graphLayout.nodes.map(node => <circle key={node.hash} cx={node.lane * GRAPH_LANE_WIDTH + GRAPH_LANE_WIDTH / 2} cy={node.row * GRAPH_ROW_HEIGHT + GRAPH_ROW_HEIGHT / 2} r={3.5} fill={LANE_PALETTE[node.lane % LANE_PALETTE.length]} />)}
              </svg>
              {gitLog.map(entry => <button type="button" role="listitem" key={entry.hash} className="hui-tree-row hui-commit" data-selected={selected === entry.hash || undefined} style={{ paddingLeft: graphLayout.laneCount * GRAPH_LANE_WIDTH + 8 }} title={`${entry.subject}\n${entry.author}\n${new Date(entry.timestamp * 1000).toLocaleString()}`} onClick={() => openCommit(entry.hash)}>
                {entry.refs.map(ref => <span key={`${ref.kind}:${ref.name}`} className="hui-ref" data-kind={ref.kind} title={refTooltip(ref)}>{ref.kind === 'head' ? 'HEAD' : ref.name}</span>)}
                <span className="hui-commit-subject">{entry.subject}</span>
                <span className="hui-commit-meta"><b>{entry.shortHash}</b><small>{commitTime(entry.timestamp)}</small></span>
              </button>)}
            </div>}
        </div> : null}
        </>}
      </section>
      {selected !== null && mode !== 'terminal' ? <section className="hui-editor">
        <div className="hui-editor-tabs"><div className="hui-editor-tab"><span>{selectedName}</span><button type="button" onClick={closeFile} aria-label={t.closeFileName(selectedName ?? '')} title={t.closeFile}><X size={14} /></button></div></div>
        <div className="hui-breadcrumbs"><div>{selected.split('/').map((part, index) => <span key={`${part}:${index}`}>{index > 0 ? <ChevronRight size={10} /> : null}{part}</span>)}</div>{editing ? null : editable ? <button type="button" className="hui-edit-button" onClick={startEdit}>{t.editorEdit}</button> : previewSource === 'file' && (truncated || previewBinary) ? <span className="hui-editor-hint">{truncated ? t.editorDisabledTruncated : t.editorDisabledBinary}</span> : null}<b>{presentation.toUpperCase()}</b></div><div className="hui-editor-surface" data-presentation={presentation}>{editing ? <CodeEditor path={selected} initialContent={draftContent} saving={saving} onSave={saveFile} onCancel={cancelEdit} /> : presentation === 'image' && previewDataUrl !== undefined ? <div className="hui-image-view"><img src={previewDataUrl} alt={selectedName ?? t.imagePreview} /><span>{selectedName}</span></div> : presentation === 'json' ? <CodePreview content={formattedJson(preview)} language={hljsLanguageOf(selected ?? '')} /> : presentation === 'diff' ? <CodePreview content={preview} diff /> : presentation === 'code' ? <CodePreview content={preview} language={hljsLanguageOf(selected ?? '')} /> : presentation === 'binary' ? <div className="hui-binary-view"><strong>{t.binaryNoPreview}</strong><span>{selectedName}</span></div> : <div className="hui-text-view">{preview}</div>}</div>
        {editorError ? <div className="hui-editor-error">{editorError}</div> : null}
      </section> : null}
    </div>
    <footer className="hui-statusbar"><span><GitBranch size={12} /> {snapshot?.gitAvailable ? t.changesCount(snapshot.changes.length) : t.notGitProject}</span><span>{snapshot?.rootName ?? t.project}</span></footer>
  </aside>
}

/**
 * Floating expand control for the collapsed project panel.
 *
 * Registered into `shell.overlay` because the panel itself is mounted in the sidebar
 * footer: only a second mount can place a control in the chat area, and the overlay
 * layer is click-through for everything except its own direct children. The button is
 * the component root on purpose - slot wrappers are `display:contents`.
 */
function DrawerExpandToggle() {
  const collapsed = useSyncExternalStore(subscribeDrawerCollapsed, getDrawerCollapsedSnapshot)
  if (!collapsed) return null
  return <button type="button" className="hui-drawer-toggle" aria-label={t.expandDrawer} title={t.expandDrawer} onClick={() => writeDrawerCollapsed(false)}><PanelRightOpen size={16} /></button>
}

function formatMoney(value: number, currency: string): string {
  if (!Number.isFinite(value)) return '\u2014'
  try { return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(value) } catch { return `${currency} ${value.toFixed(2)}` }
}

function HarnessSummary({ wide, sessions }: { wide: boolean; sessions: SessionsService }) {
  const [snapshot, setSnapshot] = useState<UsageSnapshot | null>(null)
  const sessionList = useSyncExternalStore(
    callback => sessions.list.subscribe(callback),
    () => sessions.list.getSnapshot(),
  )
  const sessionId = sessionList.current
  const cwd = sessionId === undefined ? undefined : sessionList.byId[sessionId]?.cwd
  useEffect(() => {
    const controller = new AbortController()
    const load = () => void fetch('/api/v1/dsh-workspace/summary', { signal: controller.signal })
      .then(async response => response.ok ? await response.json() as UsageSnapshot : null)
      .then(value => { if (value !== null) setSnapshot(value) }).catch(() => undefined)
    const onVisible = () => { if (document.visibilityState === 'visible') load() }
    load(); const timer = window.setInterval(load, 30_000)
    document.addEventListener('visibilitychange', onVisible)
    return () => { controller.abort(); window.clearInterval(timer); document.removeEventListener('visibilitychange', onVisible) }
  }, [])
  const balance = snapshot?.balance.balances.find(item => item.currency === 'USD') ?? snapshot?.balance.balances[0]
  const balanceValue = balance ? formatMoney(Number(balance.totalBalance), balance.currency) : snapshot?.balance.error ? t.notAvailable : '\u2014'
  const balanceAmount = balance ? Number(balance.totalBalance) : Number.NaN
  const lowThreshold = balance?.currency === 'CNY' ? 15 : 2
  const balanceTone = Number.isFinite(balanceAmount) && balanceAmount <= lowThreshold ? 'danger' : 'safe'
  const period = snapshot?.ratePeriod ?? 'idle'
  const schedule = snapshot?.trafficSchedule
  const scheduleBar = schedule === undefined ? null : computeScheduleBar(Date.now(), schedule.timezoneOffsetMinutes, schedule.peakWindows, schedule.peakWeekdays)
  return <div className={`hui-summary${wide ? '' : ' rail'}`}>
    <div className="hui-summary-main" aria-label={t.balanceStatus} title={snapshot?.balance.error}>{wide ? <span className="hui-content"><span className="hui-period" data-period={period} title={period === 'idle' ? t.offPeakBillingPeriod : t.peakBillingPeriod}><i />{period === 'idle' ? t.offPeak : t.peak}</span><span className="hui-balance-line"><b data-tone={balanceTone}>{balanceValue}</b></span></span> : <span className="hui-period" data-period={period} title={period === 'idle' ? t.offPeakBillingPeriod : t.peakBillingPeriod}><i /></span>}{wide && scheduleBar !== null ? <div className="hui-daybar" role="img" aria-label={t.scheduleBarHint} title={t.scheduleBarHint}>{scheduleBar.segments.map((segment, index) => <span key={index} className="hui-daybar-peak" style={{ left: `${segment.start * 100}%`, width: `${(segment.end - segment.start) * 100}%` }} />)}<span className="hui-daybar-marker" style={{ left: `${scheduleBar.markerFraction * 100}%` }} /></div> : null}</div>
    <ProjectDrawer sessionId={sessionId} cwd={cwd} />
  </div>
}

const STYLE_ID = 'dsh-workspace-styles'
const STYLES = `
div:has(> [data-slot='sidebar.footer.action']){flex-wrap:wrap}.hui-summary{position:relative;display:flex;align-items:stretch;flex:0 0 100%;width:100%;min-width:0;min-height:34px;margin-top:8px}.hui-summary-main{display:flex;flex-wrap:wrap;align-items:stretch;width:100%;min-height:34px;padding:5px 10px;overflow:hidden;border:1px solid var(--dsw-alias-border-l2,#e4e8f0);border-radius:12px;background:var(--dsw-alias-bg-base,#fff);color:var(--dsw-alias-label-primary,#172033);font:inherit;transition:box-shadow .15s ease,border-color .15s ease;cursor:default}.hui-summary-main:hover{border-color:var(--dsw-alias-border-l1,#c7ccd5);box-shadow:0 2px 10px rgb(15 23 42/.06)}.hui-content{display:flex;min-width:0;flex:1 1 100%;align-items:center;justify-content:space-between;gap:6px}.hui-balance-line{display:flex;min-width:0;align-items:baseline;justify-content:flex-end}.hui-balance-line b{overflow:hidden;max-width:100%;text-overflow:ellipsis;white-space:nowrap;font-size:14px;font-weight:600;font-variant-numeric:tabular-nums;line-height:1.2}.hui-summary.rail{flex:none;width:36px;min-height:36px;margin:0}.hui-summary.rail .hui-summary-main{justify-content:center;width:36px;min-height:36px;padding:0;border-radius:50%}.hui-drawer{position:fixed;z-index:40;top:8px;right:8px;bottom:8px;display:flex;flex-direction:column;width:min(760px,calc(100vw - 24px));overflow:hidden;border:1px solid var(--dsw-alias-border-l1,#d9dde5);border-radius:14px;background:var(--dsw-alias-bg-base,#fff);box-shadow:var(--dsw-shadow-lv3,0 18px 60px #0003);color:var(--dsw-alias-label-primary,#172033)}.hui-header{display:flex;align-items:center;justify-content:space-between;padding:12px 14px;border-bottom:1px solid var(--dsw-alias-border-l2,#e4e8f0)}.hui-header>div{display:flex;align-items:baseline;gap:10px}.hui-header span{color:var(--dsw-alias-label-secondary,#6c768a);font-size:12px}.hui-header button,.hui-tabs button{border:0;border-radius:7px;padding:6px 10px;background:transparent;color:inherit;font:inherit;cursor:pointer}.hui-header button:hover,.hui-tabs button:hover{background:var(--dsw-alias-interactive-bg-hover,#eef0f4)}.hui-tabs{display:flex;gap:4px;padding:8px 12px;border-bottom:1px solid var(--dsw-alias-border-l2,#e4e8f0)}.hui-tabs button[aria-selected=true]{background:var(--dsw-alias-interactive-bg-hover,#eef0f4);font-weight:600}.hui-error{padding:8px 12px;color:var(--dsw-alias-label-error,#d94a4a)}.hui-body{display:grid;grid-template-columns:260px minmax(0,1fr);min-height:0;flex:1}.hui-list{overflow:auto;border-right:1px solid var(--dsw-alias-border-l2,#e4e8f0);padding:6px}.hui-list button{display:flex;align-items:center;gap:7px;width:100%;padding:6px 9px;overflow:hidden;border:0;border-radius:6px;background:transparent;color:inherit;text-align:left;font:12px/1.4 ui-monospace,SFMono-Regular,Consolas,monospace;cursor:pointer}.hui-list button:hover,.hui-list button[data-selected]{background:var(--dsw-alias-interactive-bg-hover,#eef0f4)}.hui-list button span{overflow:hidden;text-overflow:ellipsis}.hui-list button b{min-width:20px;color:var(--dsw-alias-brand-primary,#4d6bfe)}.hui-list p{padding:8px;color:var(--dsw-alias-label-secondary,#6c768a);font-size:12px}.hui-preview{min-width:0;margin:0;padding:14px;overflow:auto;background:var(--dsw-alias-bg-module-platform,#fafbfc);font:12px/1.55 ui-monospace,SFMono-Regular,Consolas,monospace;white-space:pre-wrap;word-break:break-word}@media(max-width:680px){.hui-body{grid-template-columns:180px minmax(0,1fr)}}
`

const STATUS_STYLES = `
.hui-balance-line b[data-tone=safe]{color:var(--dsw-alias-label-primary,#172033)}.hui-balance-line b[data-tone=danger]{color:var(--dsw-alias-label-error,#d94a4a)}.hui-period{display:inline-flex;flex:none;align-items:center;gap:4px;font-size:10px;font-weight:600;color:var(--dsw-alias-label-tertiary,#8a93a5)}.hui-period>i{width:6px;height:6px;border-radius:50%;background:currentColor}.hui-period[data-period=idle]{color:var(--dsw-alias-label-success,#16895a)}.hui-period[data-period=peak]{color:var(--dsw-alias-label-error,#d94a4a)}.hui-period[data-period=peak]>i{box-shadow:0 0 0 0 rgb(217 74 74/.5);animation:hui-pulse 1.8s ease-out infinite}@keyframes hui-pulse{70%{box-shadow:0 0 0 6px rgb(217 74 74/0)}100%{box-shadow:0 0 0 0 rgb(217 74 74/0)}}
`

const BASE_STYLES = `
.hui-drawer{top:0;right:0;bottom:0;width:var(--hui-drawer-width,clamp(600px,46vw,780px));max-width:calc(100vw - 24px);border:0;border-left:1px solid var(--dsw-alias-border-l1,#c7ccd5);border-radius:0;box-shadow:-8px 0 28px #0000001c;background:var(--dsw-alias-bg-base,#f8f8f8);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}.hui-resizer{position:absolute;left:0;top:0;bottom:0;z-index:5;width:5px;cursor:col-resize;touch-action:none}.hui-resizer:hover,.hui-resizer:active{background:var(--dsw-alias-brand-primary,#4d6bfe)}.hui-titlebar{display:flex;align-items:center;justify-content:space-between;height:35px;padding:0 8px;border-bottom:1px solid var(--dsw-alias-border-l2,#dedede);background:var(--dsw-alias-bg-module-platform,#f3f3f3);user-select:none}.hui-titlebar>div{display:flex;min-width:0;align-items:center;gap:8px}.hui-titlebar span:last-child{min-width:0;flex:1;overflow:hidden;color:var(--dsw-alias-label-tertiary,#858585);font-size:11px;text-overflow:ellipsis;white-space:nowrap}.hui-vscode-mark{display:grid;width:20px;height:20px;flex:none;place-items:center;border-radius:3px;background:#007acc;color:#fff;font-size:11px;font-weight:700}.hui-titlebar button,.hui-explorer>header button{display:grid;width:26px;height:25px;place-items:center;border:0;border-radius:4px;background:transparent;color:inherit;font:16px/1 sans-serif;cursor:pointer}.hui-titlebar button:hover,.hui-explorer>header button:hover{background:var(--dsw-alias-interactive-bg-hover,#e5e5e5)}
.hui-workbench{display:grid;grid-template-columns:46px minmax(0,1fr);min-height:0;flex:1}.hui-workbench[data-preview]{grid-template-columns:46px 238px minmax(0,1fr)}.hui-activity{display:flex;flex-direction:column;align-items:stretch;border-right:1px solid var(--dsw-alias-border-l2,#dedede);background:var(--dsw-alias-bg-module-platform,#f3f3f3)}.hui-activity button{position:relative;display:grid;height:48px;place-items:center;border:0;border-left:2px solid transparent;background:transparent;color:var(--dsw-alias-label-tertiary,#7a7a7a);cursor:pointer}.hui-activity button:hover{color:var(--dsw-alias-label-primary,#222)}.hui-activity button[data-active]{border-left-color:#007acc;color:var(--dsw-alias-label-primary,#222)}.hui-activity button>svg{width:20px;height:20px}.hui-activity button>b{position:absolute;top:6px;right:5px;display:grid;min-width:16px;height:16px;padding:0 4px;place-items:center;border-radius:8px;background:#007acc;color:#fff;font-size:9px}
.hui-explorer{display:flex;min-width:0;min-height:0;flex-direction:column;border-right:1px solid var(--dsw-alias-border-l2,#dedede);background:var(--dsw-alias-bg-base,#f8f8f8)}.hui-explorer>header{display:flex;align-items:center;justify-content:space-between;height:42px;padding:0 10px 0 16px}.hui-explorer>header strong{font-size:11px;font-weight:400;letter-spacing:.6px;text-transform:uppercase}.hui-section-title{display:flex;align-items:center;height:23px;padding:0 8px 0 4px;background:var(--dsw-alias-interactive-bg-hover,#e8e8e8);font-size:11px;user-select:none;cursor:pointer}.hui-section-title>svg{flex:none}.hui-section-title>b{overflow:hidden;flex:1;text-overflow:ellipsis;white-space:nowrap}.hui-section-title>em{display:grid;min-width:17px;height:17px;padding:0 4px;place-items:center;border-radius:9px;background:var(--dsw-alias-label-tertiary,#858585);color:var(--dsw-alias-bg-base,#fff);font-size:9px;font-style:normal}.hui-tree{min-height:0;overflow-y:auto;overflow-x:hidden;padding:3px 0 10px}.hui-terminal{display:flex;min-width:0;min-height:0;flex:1;flex-direction:column;background:var(--dsw-alias-bg-base,#f8f8f8);color:var(--dsw-alias-label-primary,#172033);font-family:"SFMono-Regular",Consolas,"Liberation Mono",Menlo,monospace;font-size:12px;line-height:1.6}.hui-term-toolbar{display:flex;align-items:center;justify-content:space-between;height:31px;padding:0 8px;border-bottom:1px solid var(--dsw-alias-border-l2,#e4e8f0);background:var(--dsw-alias-bg-module-platform,#fafbfc);color:var(--dsw-alias-label-secondary,#6c768a);font-size:11px;user-select:none}.hui-term-toolbar>span{display:flex;align-items:center;gap:5px}.hui-term-actions{display:flex;align-items:center;gap:2px}.hui-term-toolbar button{display:grid;width:20px;height:20px;place-items:center;border:0;border-radius:4px;background:transparent;color:inherit;cursor:pointer}.hui-term-toolbar button:hover{background:var(--dsw-alias-interactive-bg-hover,#eef0f4);color:var(--dsw-alias-label-primary,#172033)}.hui-term-screen{position:relative;min-width:0;min-height:0;flex:1;overflow:hidden;padding:4px 0 4px 6px}.hui-term-screen .xterm{height:100%}.hui-term-screen .xterm-viewport{overflow-y:auto}.hui-term-screen .xterm-rows{color:inherit}
.hui-tree-row{display:flex;width:100%;height:23px;align-items:center;gap:4px;padding:0 8px;overflow:hidden;border:0;background:transparent;color:inherit;text-align:left;font:12px/1.4 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;cursor:default}.hui-tree-open{display:flex;flex:1;min-width:0;align-items:center;gap:4px;padding:0;border:0;background:none;color:inherit;font:inherit;text-align:left;cursor:default}.hui-tree-open>svg{flex:none;color:var(--dsw-alias-label-secondary,#6c768a)}.hui-tree-open>span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.hui-tree-at{flex:none;display:none;width:18px;height:18px;padding:0;place-items:center;border:0;border-radius:4px;background:transparent;color:var(--dsw-alias-label-success,#16895a);cursor:pointer}.hui-tree-row:hover .hui-tree-at,.hui-tree-row[data-selected] .hui-tree-at{display:grid}.hui-tree-at:hover{background:var(--dsw-alias-interactive-bg-hover,#e8e8e8);color:var(--dsw-alias-label-success,#16895a)}.hui-tree-row:hover{background:var(--dsw-alias-interactive-bg-hover,#e8e8e8)}.hui-tree-row[data-selected]{background:#007acc26;outline:1px solid #007acc55;outline-offset:-1px}.hui-tree-row>span:last-child{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.hui-tree-row>svg{flex:none;color:var(--dsw-alias-label-secondary,#6c768a)}.hui-tree-row>.hui-folder-icon{color:var(--dsw-alias-label-warning,#dcb67a)}.hui-chevron{display:flex;width:14px;flex:none;align-items:center;justify-content:center;color:var(--dsw-alias-label-secondary,#666)}.hui-change{padding-left:12px;cursor:pointer}.hui-change>span:first-child{overflow:hidden;min-width:0;text-overflow:ellipsis;white-space:nowrap}.hui-change>small{overflow:hidden;flex:1;color:var(--dsw-alias-label-tertiary,#858585);font-size:10px;text-overflow:ellipsis;white-space:nowrap}.hui-change>b{margin-left:auto;color:#d19a66;font-size:10px}.hui-change>b[data-status^=M]{color:#d7ba7d}.hui-change>b[data-status^=A],.hui-change>b[data-status^=?]{color:#73c991}.hui-change>b[data-status^=D]{color:#f48771}.hui-tree>p,.hui-empty-small{padding:12px 16px;color:var(--dsw-alias-label-tertiary,#858585);font-size:11px;line-height:1.5}
.hui-editor{display:flex;min-width:0;min-height:0;flex-direction:column;background:var(--dsw-alias-bg-module-platform,#fff)}.hui-editor-tabs{height:35px;flex:none;border-bottom:1px solid var(--dsw-alias-border-l2,#dedede);background:var(--dsw-alias-bg-base,#f3f3f3)}.hui-editor-tab{display:flex;width:min(190px,80%);height:35px;align-items:center;gap:5px;padding:0 10px;border-top:1px solid #007acc;border-right:1px solid var(--dsw-alias-border-l2,#dedede);background:var(--dsw-alias-bg-module-platform,#fff);font-size:11px}.hui-breadcrumbs{display:flex;height:26px;align-items:center;gap:3px;padding:0 10px;overflow:hidden;border-bottom:1px solid var(--dsw-alias-border-l2,#eee);color:var(--dsw-alias-label-secondary,#666);font-size:10px;white-space:nowrap}.hui-breadcrumbs span{display:flex;align-items:center;gap:3px}.hui-breadcrumbs svg{flex:none;color:var(--dsw-alias-label-tertiary,#999)}.hui-statusbar{display:flex;height:22px;flex:none;align-items:center;justify-content:space-between;padding:0 9px;background:#007acc;color:#fff;font-size:10px}.hui-error{position:absolute;z-index:2;top:40px;right:0;left:44px;display:flex;align-items:center;justify-content:space-between;gap:8px;margin:0;padding:7px 10px;background:#b42318;color:#fff;font-size:11px}.hui-error>button{display:grid;width:18px;height:18px;flex:none;place-items:center;padding:0;border:0;border-radius:4px;background:transparent;color:#fff;cursor:pointer}.hui-error>button:hover{background:rgb(255 255 255/.2)}
.hui-change>b[data-status="??"]{color:#73c991}@media(min-width:1100px){div:has(>[data-shell-overlay]):has(.hui-drawer){box-sizing:border-box;padding-right:var(--hui-drawer-width,clamp(600px,46vw,780px))}div:has(>[data-shell-overlay]):has(.hui-drawer[data-collapsed]){padding-right:0}}@media(max-width:1099px){.hui-drawer{width:min(100vw,780px)}}@media(max-width:650px){.hui-workbench{grid-template-columns:42px minmax(0,1fr)}.hui-workbench[data-preview]{grid-template-columns:42px 210px minmax(280px,1fr)}.hui-drawer{overflow:auto}.hui-workbench{min-width:620px}}
.hui-drawer{box-sizing:border-box}.hui-drawer[data-collapsed]{display:none}:where(.hui-drawer-toggle){position:fixed;top:10px;right:10px;z-index:40;display:grid;grid-auto-flow:column;width:32px;height:32px;padding:0;place-items:center;border:1px solid var(--dsw-alias-border-l1,#c7ccd5);border-radius:8px;background:var(--dsw-alias-bg-base,#fff);color:var(--dsw-alias-label-secondary,#6c768a);box-shadow:0 1px 3px rgb(15 23 42/.12);cursor:pointer;pointer-events:auto}:where(.hui-drawer-toggle:hover){background:var(--dsw-alias-interactive-bg-hover,#eef0f4);color:var(--dsw-alias-label-primary,#172033)}
`

const FLAT_STYLES = `
.hui-drawer{border-left:1px solid var(--dsw-alias-border-l2,#e4e8f0);background:var(--dsw-alias-bg-base,#fff);box-shadow:none}.hui-titlebar{height:40px;padding:0 12px;border-color:var(--dsw-alias-border-l2,#e4e8f0);background:var(--dsw-alias-bg-base,#fff)}.hui-vscode-mark{width:22px;height:22px;border-radius:4px;background:transparent;color:var(--dsw-alias-brand-primary,#4d6bfe);font-size:14px}.hui-titlebar span:last-child{color:var(--dsw-alias-label-tertiary,#8a93a5)}.hui-titlebar button,.hui-explorer>header button{border-radius:5px;color:var(--dsw-alias-label-secondary,#6c768a)}.hui-titlebar button:hover,.hui-explorer>header button:hover{background:var(--dsw-alias-interactive-bg-hover,#eef0f4)}
.hui-workbench{grid-template-columns:44px minmax(0,1fr)}.hui-workbench[data-preview]{grid-template-columns:44px 238px minmax(0,1fr)}.hui-activity{border-color:var(--dsw-alias-border-l2,#e4e8f0);background:var(--dsw-alias-bg-module-platform,#fafbfc)}.hui-activity button{height:44px;margin:1px 0;border-left-width:2px;transition:color .12s ease,background .12s ease;color:var(--dsw-alias-label-tertiary,#8a93a5)}.hui-activity button:hover{background:var(--dsw-alias-interactive-bg-hover,#eef0f4);color:var(--dsw-alias-label-primary,#172033)}.hui-activity button[data-active]{border-left-color:var(--dsw-alias-brand-primary,#4d6bfe);background:var(--dsw-alias-bg-base,#fff);color:var(--dsw-alias-brand-primary,#4d6bfe)}.hui-activity button>b{background:var(--dsw-alias-brand-primary,#4d6bfe);box-shadow:0 1px 2px rgb(77 107 254/.35)}
.hui-explorer{border-color:var(--dsw-alias-border-l2,#e4e8f0);background:var(--dsw-alias-bg-base,#fff)}.hui-explorer>header{height:40px}.hui-section-title{height:26px;background:var(--dsw-alias-bg-module-platform,#fafbfc);color:var(--dsw-alias-label-secondary,#6c768a)}.hui-section-title>em{background:var(--dsw-alias-fill-secondary,#aab1bf);color:var(--dsw-alias-bg-base,#fff)}.hui-tree-row{height:26px;transition:background .12s ease}.hui-tree-row:hover{background:var(--dsw-alias-interactive-bg-hover,#eef0f4)}.hui-tree-row[data-selected]{background:var(--dsw-alias-interactive-bg-hover,#eef0f4);box-shadow:inset 2px 0 0 var(--dsw-alias-brand-primary,#4d6bfe);outline:0}.hui-tree-open{transition:color .12s ease}.hui-chevron{color:var(--dsw-alias-label-tertiary,#8a93a5)}.hui-folder,.hui-file{color:var(--dsw-alias-label-secondary,#6c768a)}.hui-change>b{color:var(--dsw-alias-label-secondary,#6c768a)}.hui-change>b[data-status^=M]{color:var(--dsw-alias-label-warning,#b7791f)}.hui-change>b[data-status^=A],.hui-change>b[data-status="??"]{color:var(--dsw-alias-label-success,#16895a)}.hui-change>b[data-status^=D]{color:var(--dsw-alias-label-error,#d94a4a)}
.hui-editor{background:var(--dsw-alias-bg-base,#fff)}.hui-editor-tabs{height:36px;border-color:var(--dsw-alias-border-l2,#e4e8f0);background:var(--dsw-alias-bg-module-platform,#fafbfc)}.hui-editor-tab{height:36px;border-top:0;border-right-color:var(--dsw-alias-border-l2,#e4e8f0);box-shadow:inset 0 2px 0 var(--dsw-alias-brand-primary,#4d6bfe);background:var(--dsw-alias-bg-base,#fff)}.hui-editor-tab>span:first-child{overflow:hidden;min-width:0;flex:1;text-overflow:ellipsis;white-space:nowrap}.hui-breadcrumbs{height:28px;border-color:var(--dsw-alias-border-l2,#e4e8f0);color:var(--dsw-alias-label-secondary,#6c768a)}.hui-preview{background:var(--dsw-alias-bg-base,#fff);color:var(--dsw-alias-label-primary,#172033)}.hui-statusbar{height:24px;border-top:1px solid var(--dsw-alias-border-l2,#e4e8f0);background:var(--dsw-alias-bg-module-platform,#fafbfc);color:var(--dsw-alias-label-secondary,#6c768a)}.hui-statusbar span{display:inline-flex;align-items:center;gap:4px}
`

const EDITOR_STYLES = `
.hui-editor-tab>button{display:grid;width:20px;height:20px;padding:0;place-items:center;border:0;border-radius:4px;background:transparent;color:var(--dsw-alias-label-tertiary,#8a93a5);font:14px/1 sans-serif;cursor:pointer}.hui-editor-tab>button:hover{background:var(--dsw-alias-interactive-bg-hover,#eef0f4);color:var(--dsw-alias-label-primary,#172033)}.hui-breadcrumbs{justify-content:space-between}.hui-breadcrumbs>div{display:flex;min-width:0;overflow:hidden}.hui-breadcrumbs>b{flex:none;margin-left:8px;color:var(--dsw-alias-label-tertiary,#8a93a5);font-size:9px;font-weight:600;letter-spacing:.4px}.hui-editor-surface{min-width:0;min-height:0;flex:1;overflow:auto;background:var(--dsw-alias-bg-base,#fff)}
.hui-code-view{display:table;width:100%;min-width:max-content;padding:10px 0;font:12px/1.65 "SFMono-Regular",Consolas,"Liberation Mono",monospace;counter-reset:line}.hui-code-line{display:table-row;min-height:20px}.hui-code-line>span{display:table-cell;width:1%;padding:0 12px 0 10px;border-right:1px solid var(--dsw-alias-border-l2,#e4e8f0);color:var(--dsw-alias-label-tertiary,#8a93a5);text-align:right;user-select:none}.hui-code-line>code{display:table-cell;padding:0 16px;white-space:pre}.hui-code-line:hover>code{background:var(--dsw-alias-interactive-bg-hover,#eef0f4)}.hui-code-line[data-change=add]>code{background:var(--dsw-alias-bg-success-subtle,#eaf7f0);color:var(--dsw-alias-label-success,#16895a)}.hui-code-line[data-change=delete]>code{background:var(--dsw-alias-bg-error-subtle,#fceeee);color:var(--dsw-alias-label-error,#d94a4a)}.hui-code-line[data-change=hunk]>code{background:var(--dsw-alias-bg-info-subtle,#eef2ff);color:var(--dsw-alias-brand-primary,#4d6bfe)}
.hui-editor-edit{display:flex;min-width:0;min-height:0;flex:1;flex-direction:column}.hui-editor-cm{display:flex;min-width:0;min-height:0;flex:1;overflow:hidden}.hui-editor-cm .cm-editor{flex:1;min-width:0}.hui-editor-actions{display:flex;flex:none;align-items:center;gap:8px;padding:8px 10px;border-top:1px solid var(--dsw-alias-border-l2,#e4e8f0);background:var(--dsw-alias-bg-module-platform,#fafbfc)}.hui-editor-actions button{padding:4px 14px;border:1px solid var(--dsw-alias-border-l1,#c7ccd5);border-radius:6px;background:var(--dsw-alias-bg-base,#fff);color:var(--dsw-alias-label-primary,#172033);font:inherit;font-size:12px;cursor:pointer}.hui-editor-actions button[data-primary]{border-color:var(--dsw-alias-brand-primary,#4d6bfe);background:var(--dsw-alias-brand-primary,#4d6bfe);color:#fff}.hui-editor-actions button:disabled{cursor:default;opacity:.6}.hui-edit-button{flex:none;margin-left:8px;padding:2px 10px;border:1px solid var(--dsw-alias-border-l1,#c7ccd5);border-radius:5px;background:transparent;color:var(--dsw-alias-label-secondary,#6c768a);font:inherit;font-size:10px;cursor:pointer}.hui-edit-button:hover{background:var(--dsw-alias-interactive-bg-hover,#eef0f4);color:var(--dsw-alias-label-primary,#172033)}.hui-editor-hint{flex:none;margin-left:8px;color:var(--dsw-alias-label-tertiary,#8a93a5);font-size:10px}.hui-editor-error{flex:none;padding:6px 12px;border-top:1px solid var(--dsw-alias-border-l2,#e4e8f0);color:var(--dsw-alias-label-error,#d94a4a);font-size:11px}.hui-notice{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:6px 10px;border-bottom:1px solid var(--dsw-alias-border-l2,#e4e8f0);background:var(--dsw-alias-bg-success-subtle,#eaf7f0);color:var(--dsw-alias-label-success,#16895a);font-size:11px}.hui-notice button{display:grid;padding:2px;place-items:center;border:0;border-radius:4px;background:transparent;color:inherit;cursor:pointer}
.hui-image-view,.hui-binary-view{display:flex;min-height:100%;align-items:center;justify-content:center;flex-direction:column;gap:12px;padding:24px;color:var(--dsw-alias-label-tertiary,#8a93a5)}.hui-image-view{background:var(--dsw-alias-bg-module-platform,#fafbfc)}.hui-image-view img{display:block;max-width:100%;max-height:calc(100vh - 180px);object-fit:contain}.hui-image-view span,.hui-binary-view span{font-size:11px}.hui-binary-view strong{color:var(--dsw-alias-label-secondary,#6c768a);font-size:13px}.hui-text-view{min-height:100%;padding:24px 28px;color:var(--dsw-alias-label-primary,#172033);font:13px/1.75 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;white-space:pre-wrap;word-break:break-word}
.hui-code-line>code .hljs-comment{color:#6a737d;font-style:italic}.hui-code-line>code .hljs-keyword,.hui-code-line>code .hljs-selector-tag,.hui-code-line>code .hljs-literal,.hui-code-line>code .hljs-doctag{color:#d73a49}.hui-code-line>code .hljs-string,.hui-code-line>code .hljs-regexp,.hui-code-line>code .hljs-template-string{color:#032f62}.hui-code-line>code .hljs-attr{color:#e36209}.hui-code-line>code .hljs-number,.hui-code-line>code .hljs-title,.hui-code-line>code .hljs-function .hljs-title,.hui-code-line>code .hljs-symbol{color:#005cc5}.hui-code-line>code .hljs-built_in,.hui-code-line>code .hljs-type,.hui-code-line>code .hljs-class .hljs-title,.hui-code-line>code .hljs-title.class_{color:#e36209}.hui-code-line>code .hljs-variable,.hui-code-line>code .hljs-template-variable,.hui-code-line>code .hljs-name,.hui-code-line>code .hljs-tag,.hui-code-line>code .hljs-attribute{color:#22863a}.hui-code-line>code .hljs-params,.hui-code-line>code .hljs-property{color:#005cc5}.hui-code-line>code .hljs-emphasis{font-style:italic}.hui-code-line>code .hljs-strong{font-weight:700}.hui-drawer ::-webkit-scrollbar{width:8px;height:8px}.hui-drawer ::-webkit-scrollbar-track{background:transparent}.hui-drawer ::-webkit-scrollbar-thumb{border:2px solid transparent;border-radius:5px;background:var(--dsw-alias-fill-secondary,#c9cdd6);background-clip:padding-box}.hui-drawer ::-webkit-scrollbar-thumb:hover{background:var(--dsw-alias-label-tertiary,#8a93a5);background-clip:padding-box}.hui-editor-tab>button{transition:color .12s ease,background .12s ease}.hui-editor-tab>button:hover{background:var(--dsw-alias-interactive-bg-hover,#eef0f4);color:var(--dsw-alias-label-error,#d94a4a)}.hui-breadcrumbs>div{color:var(--dsw-alias-label-secondary,#6c768a);font-size:10px}.hui-editor-tab>span:first-child{font-weight:500}.hui-section-title{transition:background .12s ease}.hui-section-title:hover{background:var(--dsw-alias-interactive-bg-hover,#e4e8f0)}.hui-section-title>b{letter-spacing:.5px}.hui-section-title>em{transition:background .12s ease}
`

const GRAPH_STYLES = `
.hui-graph{position:relative}.hui-graph-edges{position:absolute;top:0;left:0;pointer-events:none}
.hui-commit{display:flex;min-width:0;align-items:center;gap:6px}.hui-commit-subject{overflow:hidden;min-width:0;flex:1;text-overflow:ellipsis;white-space:nowrap}.hui-commit-meta{display:inline-flex;flex:none;align-items:baseline;gap:6px;color:var(--dsw-alias-label-tertiary,#8a93a5)}.hui-commit-meta>b{font-weight:600;font-variant-numeric:tabular-nums}.hui-commit-meta>small{font-size:10px}
.hui-ref{flex:none;max-width:120px;overflow:hidden;padding:0 5px;border:1px solid var(--dsw-alias-border-l2,#e4e8f0);border-radius:4px;text-overflow:ellipsis;white-space:nowrap;font-size:9.5px;line-height:16px;color:var(--dsw-alias-label-secondary,#6c768a)}
.hui-ref[data-kind=branch]{border-color:var(--dsw-alias-brand-primary,#4d6bfe);background:var(--dsw-alias-bg-info-subtle,#eef2ff);color:var(--dsw-alias-brand-primary,#4d6bfe)}
.hui-ref[data-kind=remote]{border-color:var(--dsw-alias-border-l1,#c7ccd5);background:var(--dsw-alias-bg-module-platform,#fafbfc)}
.hui-ref[data-kind=tag]{border-color:var(--dsw-alias-label-warning,#b7791f);background:var(--dsw-alias-bg-warning-subtle,#fdf3e3);color:var(--dsw-alias-label-warning,#b7791f)}
.hui-ref[data-kind=head]{border-color:var(--dsw-alias-label-success,#16895a);background:var(--dsw-alias-bg-success-subtle,#eaf7f0);color:var(--dsw-alias-label-success,#16895a)}
`

const DAYBAR_STYLES = `
.hui-daybar{position:relative;flex:0 0 100%;width:100%;min-width:0;height:3px;margin-top:5px;overflow:hidden;border-radius:2px;background:var(--dsw-alias-label-success,#16895a)}
.hui-daybar-peak{position:absolute;top:0;bottom:0;background:var(--dsw-alias-label-error,#d94a4a)}
.hui-daybar-marker{position:absolute;top:0;bottom:0;width:1px;background:var(--dsw-alias-label-primary,#172033)}
`

export const inject = ['slots', 'sessions']
export async function apply(ctx: ClientContext): Promise<void> {
  try {
    const response = await fetch('/api/v1/dsh-workspace/config', { signal: AbortSignal.timeout(2_000) })
    if (response.ok) setLanguage((await response.json() as WorkspaceClientConfig).language)
  } catch { /* keep browser-detected default */ }
  ctx.effect(() => {
    if (document.getElementById(STYLE_ID)) return
    const style = document.createElement('style'); style.id = STYLE_ID; style.textContent = STYLES + STATUS_STYLES + BASE_STYLES + FLAT_STYLES + EDITOR_STYLES + GRAPH_STYLES + DAYBAR_STYLES; document.head.append(style)
    return () => style.remove()
  }, 'dsh-workspace: styles')
  const Summary = ({ wide }: { wide: boolean }) => <HarnessSummary wide={wide} sessions={ctx.sessions} />
  ctx.slots.inject('sidebar.footer.action', () => ctx.slots.register({ name: 'sidebar.footer.action', id: 'dsh-workspace', order: 10 }, Summary))
  ctx.slots.inject('shell.overlay', () => ctx.slots.register({ name: 'shell.overlay', id: 'dsh-workspace-drawer-toggle', order: 100 }, DrawerExpandToggle))
  ctx.slots.inject('conversation.composer.dock', () => ctx.slots.register({ name: 'conversation.composer.dock', id: 'dsh-workspace-file-at', order: 100 }, ComposerBridge))
}
