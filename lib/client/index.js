import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { Terminal as Xterm } from '@xterm/xterm';
import { Activity, AtSign, Blocks, ChevronDown, ChevronRight, Database, Eraser, FileArchive, FileAudio, FileCode, FileImage, FileSpreadsheet, FileText, FileVideo, Folder, FolderOpen, FolderTree, GitBranch, RefreshCw, Terminal, X } from 'lucide-react';
import { SiC, SiCplusplus, SiCss, SiGnubash, SiGo, SiHtml5, SiJavascript, SiJson, SiMarkdown, SiOpenjdk, SiPython, SiRust, SiSqlite, SiSvelte, SiTypescript, SiVuedotjs, SiYaml } from 'react-icons/si';
import hljs from 'highlight.js/lib/core';
import bashLang from 'highlight.js/lib/languages/bash';
import cLang from 'highlight.js/lib/languages/c';
import cppLang from 'highlight.js/lib/languages/cpp';
import cssLang from 'highlight.js/lib/languages/css';
import goLang from 'highlight.js/lib/languages/go';
import iniLang from 'highlight.js/lib/languages/ini';
import javaLang from 'highlight.js/lib/languages/java';
import javascriptLang from 'highlight.js/lib/languages/javascript';
import jsonLang from 'highlight.js/lib/languages/json';
import powershellLang from 'highlight.js/lib/languages/powershell';
import pythonLang from 'highlight.js/lib/languages/python';
import rustLang from 'highlight.js/lib/languages/rust';
import sqlLang from 'highlight.js/lib/languages/sql';
import typescriptLang from 'highlight.js/lib/languages/typescript';
import xmlLang from 'highlight.js/lib/languages/xml';
import yamlLang from 'highlight.js/lib/languages/yaml';
import { FAVICON_SRC } from './favicon.js';
const HIGHLIGHT_LANGUAGES = [
    ['bash', bashLang], ['c', cLang], ['cpp', cppLang], ['css', cssLang], ['go', goLang],
    ['ini', iniLang], ['java', javaLang], ['javascript', javascriptLang], ['json', jsonLang],
    ['powershell', powershellLang], ['python', pythonLang], ['rust', rustLang], ['sql', sqlLang],
    ['typescript', typescriptLang], ['xml', xmlLang], ['yaml', yamlLang],
];
for (const [name, language] of HIGHLIGHT_LANGUAGES)
    hljs.registerLanguage(name, language);
const HLJS_BY_EXTENSION = {
    js: 'javascript', jsx: 'javascript', mjs: 'javascript', cjs: 'javascript',
    ts: 'typescript', tsx: 'typescript',
    css: 'css', scss: 'css',
    html: 'xml', xml: 'xml', svg: 'xml', vue: 'xml', svelte: 'xml',
    py: 'python', go: 'go', rs: 'rust', java: 'java',
    c: 'c', h: 'c', cpp: 'cpp', hpp: 'cpp', cc: 'cpp', hh: 'cpp',
    sh: 'bash', bash: 'bash', zsh: 'bash', ps1: 'powershell',
    sql: 'sql', yml: 'yaml', yaml: 'yaml', toml: 'ini',
    json: 'json', jsonc: 'json',
};
function hljsLanguageOf(path) {
    const extension = path.split('.').at(-1)?.toLowerCase() ?? '';
    return HLJS_BY_EXTENSION[extension];
}
const FILE_ICONS = {
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
};
const BRAND_COLORS = {
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
};
function FileTypeIcon({ path }) {
    const extension = path.split('.').at(-1)?.toLowerCase() ?? '';
    const Icon = FILE_ICONS[extension] ?? FileText;
    const color = BRAND_COLORS[extension];
    return color === undefined ? _jsx(Icon, { size: 13 }) : _jsx(Icon, { size: 13, color: color });
}
function escapeHtml(input) {
    return input
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
const CODE_EXTENSIONS = new Set(['js', 'jsx', 'ts', 'tsx', 'mjs', 'cjs', 'css', 'scss', 'html', 'vue', 'svelte', 'py', 'go', 'rs', 'java', 'c', 'h', 'cpp', 'hpp', 'sh', 'bash', 'zsh', 'ps1', 'sql', 'yml', 'yaml', 'toml', 'xml']);
function presentationOf(path, source, binary, dataUrl) {
    if (source === 'diff' || source === 'commit')
        return 'diff';
    if (dataUrl !== undefined)
        return 'image';
    if (binary)
        return 'binary';
    const extension = path.split('.').at(-1)?.toLowerCase() ?? '';
    if (extension === 'md' || extension === 'mdx')
        return 'markdown';
    if (extension === 'json' || extension === 'jsonc')
        return 'json';
    return CODE_EXTENSIONS.has(extension) ? 'code' : 'text';
}
function formattedJson(content) {
    try {
        return JSON.stringify(JSON.parse(content), null, 2);
    }
    catch {
        return content;
    }
}
function commitTime(timestamp) {
    const elapsed = Math.max(0, Date.now() / 1000 - timestamp);
    if (elapsed < 60)
        return '刚刚';
    if (elapsed < 3_600)
        return `${Math.floor(elapsed / 60)} 分钟前`;
    if (elapsed < 86_400)
        return `${Math.floor(elapsed / 3_600)} 小时前`;
    if (elapsed < 7 * 86_400)
        return `${Math.floor(elapsed / 86_400)} 天前`;
    const date = new Date(timestamp * 1000);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}
function CodePreview({ content, diff = false, language }) {
    const body = language === undefined ? escapeHtml(content) : (() => {
        try {
            return hljs.highlight(content, { language }).value;
        }
        catch {
            return escapeHtml(content);
        }
    })();
    const lines = body.split('\n').filter(line => !diff || !/^(diff --git |index |--- |\+\+\+ |@@ |new file mode |deleted file mode |old mode |new mode |similarity index |rename from |rename to |Binary files )/.test(line));
    return _jsx("div", { className: "hui-code-view", children: lines.map((line, index) => _jsxs("div", { className: "hui-code-line", "data-change": diff ? line.startsWith('+') ? 'add' : line.startsWith('-') ? 'delete' : undefined : undefined, children: [_jsx("span", { children: index + 1 }), _jsx("code", { dangerouslySetInnerHTML: { __html: line || ' ' } })] }, index)) });
}
function MarkdownPreview({ content }) {
    return _jsx("article", { className: "hui-markdown-view", children: content.split('\n').map((line, index) => {
            const heading = /^(#{1,4})\s+(.+)$/.exec(line);
            if (heading !== null) {
                const level = heading[1]?.length ?? 1;
                return _jsx("div", { className: "hui-md-heading", "data-level": level, children: heading[2] }, index);
            }
            if (/^[-*]\s+/.test(line))
                return _jsxs("div", { className: "hui-md-list", children: [_jsx("span", { children: "\u2022" }), line.replace(/^[-*]\s+/, '')] }, index);
            if (line.startsWith('> '))
                return _jsx("blockquote", { children: line.slice(2) }, index);
            if (line.startsWith('```'))
                return _jsx("div", { className: "hui-md-fence", children: line.slice(3) || 'code' }, index);
            return line.length === 0 ? _jsx("div", { className: "hui-md-space" }, index) : _jsx("p", { children: line }, index);
        }) });
}
const draftBridges = new Map();
function ComposerBridge({ sessionId, inputActions, useInput }) {
    const draft = useInput?.((state) => state.draft) ?? '';
    const draftRef = useRef('');
    draftRef.current = draft;
    useEffect(() => {
        if (sessionId === undefined || inputActions === undefined)
            return;
        const bridge = {
            read: () => draftRef.current,
            write: text => inputActions.setDraft(text),
        };
        draftBridges.set(sessionId, bridge);
        return () => { if (draftBridges.get(sessionId) === bridge)
            draftBridges.delete(sessionId); };
    }, [inputActions, sessionId]);
    return null;
}
function TerminalPanel({ sessionId, cwd }) {
    const containerRef = useRef(null);
    const termRef = useRef(null);
    const ptyIdRef = useRef(null);
    const sinceRef = useRef(0);
    const [ready, setReady] = useState(false);
    useEffect(() => {
        const container = containerRef.current;
        if (container === null)
            return;
        let disposed = false;
        const styles = getComputedStyle(document.documentElement);
        const backgroundColor = styles.getPropertyValue('--dsw-alias-bg-base').trim() || '#f8f8f8';
        const foregroundColor = styles.getPropertyValue('--dsw-alias-label-primary').trim() || '#172033';
        const term = new Xterm({
            convertEol: true,
            cursorBlink: true,
            fontFamily: '"SFMono-Regular",Consolas,"Liberation Mono",Menlo,monospace',
            fontSize: 12,
            scrollback: 5_000,
            theme: { background: backgroundColor, foreground: foregroundColor, cursor: foregroundColor },
        });
        term.open(container);
        termRef.current = term;
        const params = new URLSearchParams();
        if (sessionId !== undefined)
            params.set('sessionId', sessionId);
        if (cwd !== undefined)
            params.set('cwd', cwd);
        const query = params.size === 0 ? '' : `?${params.toString()}`;
        const request = (path, body) => {
            if (body === undefined)
                return fetch(`/api/v1/dsh-workspace/pty/${path}${query}`);
            return fetch(`/api/v1/dsh-workspace/pty/${path}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
        };
        void request('open').then(async (response) => {
            if (!response.ok)
                throw new Error(`HTTP ${response.status}`);
            const data = await response.json();
            if (disposed) {
                if (data.id !== undefined)
                    void request('close', { id: data.id });
                return;
            }
            if (data.id === undefined)
                throw new Error('未返回终端会话标识');
            ptyIdRef.current = data.id;
            sinceRef.current = 0;
            term.focus();
            setReady(true);
        }).catch(reason => {
            if (!disposed)
                term.write(`\x1b[31m打开终端失败：${reason instanceof Error ? reason.message : String(reason)}\x1b[0m`);
        });
        const onData = term.onData(data => {
            const id = ptyIdRef.current;
            if (id !== null)
                void request('write', { id, data });
        });
        const onResize = term.onResize(size => {
            const id = ptyIdRef.current;
            if (id !== null)
                void request('resize', { id, cols: size.cols, rows: size.rows });
        });
        let timer = 0;
        const tick = () => {
            if (disposed)
                return;
            const id = ptyIdRef.current;
            if (id === null) {
                timer = window.setTimeout(tick, 80);
                return;
            }
            void fetch(`/api/v1/dsh-workspace/pty/read?id=${encodeURIComponent(id)}&since=${sinceRef.current}`).then(async (response) => {
                if (!response.ok || disposed)
                    return;
                const data = await response.json();
                const count = data.count ?? 0;
                if (count > sinceRef.current) {
                    for (const chunk of data.output ?? [])
                        term.write(chunk);
                    sinceRef.current = count;
                }
            }).catch(() => { }).finally(() => {
                if (!disposed)
                    timer = window.setTimeout(tick, 80);
            });
        };
        timer = window.setTimeout(tick, 80);
        return () => {
            disposed = true;
            window.clearTimeout(timer);
            onData.dispose();
            onResize.dispose();
            const id = ptyIdRef.current;
            ptyIdRef.current = null;
            if (id !== null)
                void request('close', { id });
            term.dispose();
            termRef.current = null;
        };
    }, [cwd, sessionId]);
    const clear = useCallback(() => { termRef.current?.clear(); }, []);
    return _jsxs("div", { className: "hui-terminal", children: [_jsxs("div", { className: "hui-term-toolbar", children: [_jsxs("span", { children: [_jsx(Terminal, { size: 13 }), " \u7EC8\u7AEF"] }), _jsx("span", { className: "hui-term-actions", children: ready ? _jsx("button", { type: "button", title: "\u6E05\u7A7A\u8F93\u51FA", "aria-label": "\u6E05\u7A7A\u8F93\u51FA", onClick: clear, children: _jsx(Eraser, { size: 13 }) }) : null })] }), _jsx("div", { className: "hui-term-screen", ref: containerRef })] });
}
function ProjectDrawer({ sessionId, cwd }) {
    const [snapshot, setSnapshot] = useState(null);
    const [mode, setMode] = useState('files');
    const [selected, setSelected] = useState(null);
    const [preview, setPreview] = useState('');
    const [previewSource, setPreviewSource] = useState('file');
    const [previewBinary, setPreviewBinary] = useState(false);
    const [previewDataUrl, setPreviewDataUrl] = useState(undefined);
    const [expanded, setExpanded] = useState(() => new Set());
    const [changesOpen, setChangesOpen] = useState(true);
    const [historyOpen, setHistoryOpen] = useState(false);
    const [gitLog, setGitLog] = useState(null);
    const [error, setError] = useState(null);
    const [drawerWidth, setDrawerWidth] = useState(null);
    const effectiveWidth = drawerWidth ?? (selected === null ? 400 : null);
    useEffect(() => {
        const root = document.documentElement;
        if (effectiveWidth === null)
            root.style.removeProperty('--hui-drawer-width');
        else
            root.style.setProperty('--hui-drawer-width', `${effectiveWidth}px`);
        return () => { root.style.removeProperty('--hui-drawer-width'); };
    }, [effectiveWidth]);
    const startResize = useCallback((event) => {
        if (event.button !== 0)
            return;
        event.preventDefault();
        const drawer = event.currentTarget.parentElement;
        const startX = event.clientX;
        const startWidth = drawer === null ? 600 : drawer.getBoundingClientRect().width;
        const onMove = (move) => {
            const next = startWidth - (move.clientX - startX);
            setDrawerWidth(Math.min(Math.max(next, 320), window.innerWidth - 32));
        };
        const onUp = () => {
            document.body.style.cursor = '';
            window.removeEventListener('pointermove', onMove);
            window.removeEventListener('pointerup', onUp);
        };
        document.body.style.cursor = 'col-resize';
        window.addEventListener('pointermove', onMove);
        window.addEventListener('pointerup', onUp);
    }, [selected]);
    const refresh = useCallback(() => {
        setError(null);
        const params = new URLSearchParams();
        if (sessionId !== undefined)
            params.set('sessionId', sessionId);
        if (cwd !== undefined)
            params.set('cwd', cwd);
        const query = params.size === 0 ? '' : `?${params.toString()}`;
        void fetch(`/api/v1/dsh-workspace/project${query}`).then(async (response) => {
            if (!response.ok)
                throw new Error(`HTTP ${response.status}`);
            return await response.json();
        }).then(setSnapshot).catch(reason => setError(reason instanceof Error ? reason.message : String(reason)));
    }, [cwd, sessionId]);
    useEffect(refresh, [refresh]);
    useEffect(() => {
        setSelected(null);
        setPreview('');
        setPreviewBinary(false);
        setPreviewDataUrl(undefined);
        setExpanded(new Set());
        setGitLog(null);
    }, [sessionId]);
    const open = useCallback((path, kind) => {
        setSelected(path);
        setPreview('正在读取…');
        setPreviewSource(kind);
        setPreviewBinary(false);
        setPreviewDataUrl(undefined);
        const endpoint = kind === 'file' ? '/api/v1/dsh-workspace/file' : '/api/v1/dsh-workspace/diff';
        const params = new URLSearchParams({ path });
        if (sessionId !== undefined)
            params.set('sessionId', sessionId);
        if (cwd !== undefined)
            params.set('cwd', cwd);
        void fetch(`${endpoint}?${params.toString()}`).then(async (response) => {
            if (!response.ok)
                throw new Error(`HTTP ${response.status}`);
            return await response.json();
        }).then(data => {
            if ('content' in data) {
                setPreviewBinary(data.binary);
                setPreviewDataUrl(data.dataUrl);
                setPreview(data.content + (data.truncated ? '\n\n…预览已截断' : ''));
            }
            else
                setPreview((data.diff || '此变更没有可显示的文本差异') + (data.truncated ? '\n\n…预览已截断' : ''));
        }).catch(reason => setPreview(`读取失败：${reason instanceof Error ? reason.message : String(reason)}`));
    }, [cwd, sessionId]);
    const toggleDirectory = useCallback((path) => {
        setExpanded(current => {
            const next = new Set(current);
            if (next.has(path))
                next.delete(path);
            else
                next.add(path);
            return next;
        });
    }, []);
    const loadHistory = useCallback(() => {
        const params = new URLSearchParams();
        if (sessionId !== undefined)
            params.set('sessionId', sessionId);
        if (cwd !== undefined)
            params.set('cwd', cwd);
        const query = params.size === 0 ? '' : `?${params.toString()}`;
        void fetch(`/api/v1/dsh-workspace/logs${query}`).then(async (response) => {
            if (!response.ok)
                throw new Error(`HTTP ${response.status}`);
            const data = await response.json();
            setGitLog(data.entries);
        }).catch(reason => { setGitLog([]); setError(reason instanceof Error ? reason.message : String(reason)); });
    }, [cwd, sessionId]);
    const openCommit = useCallback((hash) => {
        setSelected(hash);
        setPreview('正在读取…');
        setPreviewSource('commit');
        setPreviewBinary(false);
        setPreviewDataUrl(undefined);
        const params = new URLSearchParams({ hash });
        if (sessionId !== undefined)
            params.set('sessionId', sessionId);
        if (cwd !== undefined)
            params.set('cwd', cwd);
        void fetch(`/api/v1/dsh-workspace/commit?${params.toString()}`).then(async (response) => {
            if (!response.ok)
                throw new Error(`HTTP ${response.status}`);
            return await response.json();
        }).then(data => setPreview((data.diff || '该提交没有可显示的文本差异') + (data.truncated ? '\n\n…预览已截断' : ''))).catch(reason => setPreview(`读取失败：${reason instanceof Error ? reason.message : String(reason)}`));
    }, [cwd, sessionId]);
    useEffect(() => {
        if (mode === 'changes' && historyOpen)
            loadHistory();
    }, [historyOpen, loadHistory, mode]);
    const entries = snapshot?.entries ?? [];
    const visibleEntries = entries.filter(entry => {
        const segments = entry.path.split('/');
        for (let index = 1; index < segments.length; index += 1) {
            if (!expanded.has(segments.slice(0, index).join('/')))
                return false;
        }
        return true;
    });
    const selectedName = selected?.split('/').at(-1);
    const presentation = selected === null ? 'text' : presentationOf(selected, previewSource, previewBinary, previewDataUrl);
    const closeFile = useCallback(() => { setSelected(null); setPreview(''); setPreviewBinary(false); setPreviewDataUrl(undefined); }, []);
    const attachFile = useCallback((path) => {
        if (sessionId === undefined)
            return;
        const bridge = draftBridges.get(sessionId);
        if (bridge === undefined)
            return;
        const token = `@${path}`;
        const draft = bridge.read();
        const next = draft.length === 0 ? token : `${draft.replace(/\s+$/, '')} ${token}`;
        bridge.write(next);
    }, [sessionId]);
    return _jsxs("aside", { className: "hui-drawer", "aria-label": "\u9879\u76EE\u9884\u89C8", style: effectiveWidth === null ? undefined : { width: effectiveWidth }, children: [_jsx("div", { className: "hui-resizer", "aria-hidden": "true", onPointerDown: startResize }), _jsx("header", { className: "hui-titlebar", children: _jsxs("div", { children: [_jsx("span", { className: "hui-vscode-mark", children: _jsx(Blocks, { size: 14 }) }), _jsx("span", { title: snapshot?.rootPath, children: snapshot?.rootPath ?? '正在读取当前项目…' })] }) }), error ? _jsxs("div", { className: "hui-error", children: ["\u8BFB\u53D6\u5931\u8D25\uFF1A", error] }) : null, _jsxs("div", { className: "hui-workbench", "data-preview": (selected !== null && mode !== 'terminal') || undefined, children: [_jsxs("nav", { className: "hui-activity", "aria-label": "\u9879\u76EE\u89C6\u56FE", children: [_jsx("button", { type: "button", "aria-label": "\u8D44\u6E90\u7BA1\u7406\u5668", title: "\u8D44\u6E90\u7BA1\u7406\u5668", "data-active": mode === 'files' || undefined, onClick: () => setMode('files'), children: _jsx(FolderTree, { size: 20 }) }), _jsxs("button", { type: "button", "aria-label": "\u6E90\u4EE3\u7801\u7BA1\u7406", title: "\u6E90\u4EE3\u7801\u7BA1\u7406", "data-active": mode === 'changes' || undefined, onClick: () => setMode('changes'), children: [_jsx(GitBranch, { size: 20 }), snapshot?.changes.length ? _jsx("b", { children: snapshot.changes.length }) : null] })] }), _jsxs("section", { className: "hui-explorer", children: [_jsxs("header", { children: [_jsx("strong", { children: mode === 'files' ? '资源管理器' : mode === 'changes' ? '源代码管理' : '终端' }), mode !== 'terminal' ? _jsx("button", { type: "button", onClick: refresh, "aria-label": "\u5237\u65B0", children: _jsx(RefreshCw, { size: 15 }) }) : null] }), mode === 'terminal' ? _jsx(TerminalPanel, { sessionId: sessionId, cwd: cwd }) : mode === 'files' ? _jsxs(_Fragment, { children: [_jsxs("div", { className: "hui-section-title", children: [_jsx(ChevronDown, { size: 14 }), _jsx("b", { children: snapshot?.rootName?.toUpperCase() ?? 'PROJECT' })] }), _jsxs("div", { className: "hui-tree", role: "tree", children: [visibleEntries.map(entry => entry.kind === 'directory'
                                                ? _jsxs("button", { type: "button", role: "treeitem", "aria-expanded": expanded.has(entry.path), className: "hui-tree-row", style: { paddingLeft: 7 + Math.min(entry.depth, 12) * 13 }, title: entry.path, onClick: () => toggleDirectory(entry.path), children: [_jsx("span", { className: "hui-chevron", children: expanded.has(entry.path) ? _jsx(ChevronDown, { size: 12 }) : _jsx(ChevronRight, { size: 12 }) }), expanded.has(entry.path) ? _jsx(FolderOpen, { className: "hui-folder-icon", size: 13 }) : _jsx(Folder, { className: "hui-folder-icon", size: 13 }), _jsx("span", { children: entry.name })] }, entry.path)
                                                : _jsx("div", { role: "treeitem", className: "hui-tree-row", "data-selected": selected === entry.path || undefined, style: { paddingLeft: 20 + Math.min(entry.depth, 12) * 13 }, title: entry.path, children: _jsxs("button", { type: "button", className: "hui-tree-open", onClick: () => open(entry.path, 'file'), children: [_jsx(FileTypeIcon, { path: entry.path }), _jsx("span", { children: entry.name }), _jsx("span", { role: "button", tabIndex: 0, className: "hui-tree-at", title: "\u5728\u8F93\u5165\u6846\u5F15\u7528\u8BE5\u6587\u4EF6", "aria-label": `在输入框引用 ${entry.name}`, onClick: event => { event.stopPropagation(); attachFile(entry.path); }, onKeyDown: event => { if (event.key === 'Enter' || event.key === ' ') {
                                                                    event.preventDefault();
                                                                    event.stopPropagation();
                                                                    attachFile(entry.path);
                                                                } }, children: _jsx(AtSign, { size: 13 }) })] }) }, entry.path)), snapshot?.truncated ? _jsx("p", { children: "\u6587\u4EF6\u8F83\u591A\uFF0C\u5217\u8868\u5DF2\u622A\u65AD" }) : null] })] }) : _jsxs(_Fragment, { children: [_jsxs("div", { className: "hui-section-title", role: "button", title: changesOpen ? '折叠更改列表' : '展开更改列表', onClick: () => setChangesOpen(current => !current), children: [changesOpen ? _jsx(ChevronDown, { size: 14 }) : _jsx(ChevronRight, { size: 14 }), _jsx("b", { children: "CHANGES" }), _jsx("em", { children: snapshot?.changes.length ?? 0 })] }), changesOpen ? _jsx("div", { className: "hui-tree", children: snapshot?.gitAvailable === false ? _jsx("div", { className: "hui-empty-small", children: "\u5F53\u524D\u76EE\u5F55\u4E0D\u662F Git \u4ED3\u5E93" }) : snapshot?.gitAvailable && snapshot.changes.length === 0 ? _jsx("div", { className: "hui-empty-small", children: "\u6CA1\u6709\u5F85\u5904\u7406\u7684\u66F4\u6539" }) : snapshot?.changes.map(change => _jsxs("button", { type: "button", className: "hui-tree-row hui-change", "data-selected": selected === change.path || undefined, title: change.path, onClick: () => open(change.path, 'diff'), children: [_jsx("span", { children: change.path.split('/').at(-1) }), _jsx("small", { children: change.path.includes('/') ? change.path.slice(0, change.path.lastIndexOf('/')) : '' }), _jsx("b", { "data-status": change.status, children: change.status })] }, `${change.status}:${change.path}`)) }) : null, _jsxs("div", { className: "hui-section-title", role: "button", title: historyOpen ? '折叠提交历史' : '展开提交历史', onClick: () => setHistoryOpen(current => !current), children: [historyOpen ? _jsx(ChevronDown, { size: 14 }) : _jsx(ChevronRight, { size: 14 }), _jsx("b", { children: "HISTORY" }), _jsx("em", { children: gitLog?.length ?? 0 })] }), historyOpen ? _jsx("div", { className: "hui-tree", children: snapshot?.gitAvailable === false ? _jsx("div", { className: "hui-empty-small", children: "\u5F53\u524D\u76EE\u5F55\u4E0D\u662F Git \u4ED3\u5E93" }) : gitLog === null ? _jsx("div", { className: "hui-empty-small", children: "\u6B63\u5728\u8BFB\u53D6\u5386\u53F2\u2026" }) : gitLog.length === 0 ? _jsx("div", { className: "hui-empty-small", children: "\u6CA1\u6709\u63D0\u4EA4\u8BB0\u5F55" }) : gitLog.map(entry => _jsxs("button", { type: "button", className: "hui-tree-row hui-commit", "data-selected": selected === entry.hash || undefined, title: `${entry.subject}\n${entry.author}\n${new Date(entry.timestamp * 1000).toLocaleString()}`, onClick: () => openCommit(entry.hash), children: [_jsxs("span", { className: "hui-commit-meta", children: [_jsx("b", { children: entry.shortHash }), _jsx("small", { children: commitTime(entry.timestamp) })] }), _jsx("span", { children: entry.subject })] }, entry.hash)) }) : null] })] }), selected !== null && mode !== 'terminal' ? _jsxs("section", { className: "hui-editor", children: [_jsx("div", { className: "hui-editor-tabs", children: _jsxs("div", { className: "hui-editor-tab", children: [_jsx("span", { children: selectedName }), _jsx("button", { type: "button", onClick: closeFile, "aria-label": `关闭 ${selectedName}`, title: "\u5173\u95ED\u6587\u4EF6", children: _jsx(X, { size: 14 }) })] }) }), _jsxs("div", { className: "hui-breadcrumbs", children: [_jsx("div", { children: selected.split('/').map((part, index) => _jsxs("span", { children: [index > 0 ? _jsx(ChevronRight, { size: 10 }) : null, part] }, `${part}:${index}`)) }), _jsx("b", { children: presentation.toUpperCase() })] }), _jsx("div", { className: "hui-editor-surface", "data-presentation": presentation, children: presentation === 'image' && previewDataUrl !== undefined ? _jsxs("div", { className: "hui-image-view", children: [_jsx("img", { src: previewDataUrl, alt: selectedName ?? '图片预览' }), _jsx("span", { children: selectedName })] }) : presentation === 'markdown' ? _jsx(MarkdownPreview, { content: preview }) : presentation === 'json' ? _jsx(CodePreview, { content: formattedJson(preview), language: hljsLanguageOf(selected ?? '') }) : presentation === 'diff' ? _jsx(CodePreview, { content: preview, diff: true }) : presentation === 'code' ? _jsx(CodePreview, { content: preview, language: hljsLanguageOf(selected ?? '') }) : presentation === 'binary' ? _jsxs("div", { className: "hui-binary-view", children: [_jsx("strong", { children: "\u65E0\u6CD5\u9884\u89C8\u6B64\u4E8C\u8FDB\u5236\u6587\u4EF6" }), _jsx("span", { children: selectedName })] }) : _jsx("div", { className: "hui-text-view", children: preview }) })] }) : null] }), _jsxs("footer", { className: "hui-statusbar", children: [_jsxs("span", { children: [_jsx(GitBranch, { size: 12 }), " ", snapshot?.gitAvailable ? `${snapshot.changes.length} 个更改` : '非 Git 项目'] }), _jsx("span", { children: snapshot?.rootName ?? '项目' })] })] });
}
function HarnessSummary({ wide, sessions }) {
    const [snapshot, setSnapshot] = useState(null);
    const [update, setUpdate] = useState(null);
    const [updating, setUpdating] = useState('idle');
    const [updateMessage, setUpdateMessage] = useState('');
    const [transitioning, setTransitioning] = useState(false);
    const sessionList = useSyncExternalStore(callback => sessions.list.subscribe(callback), () => sessions.list.getSnapshot());
    const sessionId = sessionList.current;
    const cwd = sessionId === undefined ? undefined : sessionList.byId[sessionId]?.cwd;
    useEffect(() => {
        const controller = new AbortController();
        const load = () => void fetch('/api/v1/dsh-workspace/summary', { signal: controller.signal })
            .then(async (response) => response.ok ? await response.json() : null)
            .then(value => { if (value !== null)
            setSnapshot(value); }).catch(() => undefined);
        const onVisible = () => { if (document.visibilityState === 'visible')
            load(); };
        load();
        const timer = window.setInterval(load, 30_000);
        document.addEventListener('visibilitychange', onVisible);
        return () => { controller.abort(); window.clearInterval(timer); document.removeEventListener('visibilitychange', onVisible); };
    }, []);
    useEffect(() => {
        const controller = new AbortController();
        const load = () => void fetch('/api/v1/dsh-workspace/update', { signal: controller.signal })
            .then(async (response) => response.ok ? await response.json() : null)
            .then(value => { if (value !== null)
            setUpdate(value); }).catch(() => undefined);
        const onVisible = () => { if (document.visibilityState === 'visible')
            load(); };
        load();
        const timer = window.setInterval(load, 10 * 60 * 1000);
        document.addEventListener('visibilitychange', onVisible);
        return () => { controller.abort(); window.clearInterval(timer); document.removeEventListener('visibilitychange', onVisible); };
    }, []);
    const runUpdate = useCallback(() => {
        setUpdating('running');
        setUpdateMessage('');
        void fetch('/api/v1/dsh-workspace/update/run', { method: 'POST' })
            .then(async (response) => response.ok ? await response.json() : null)
            .then(result => {
            if (result !== null) {
                setUpdating(result.ok ? 'ok' : 'error');
                setUpdateMessage(result.message);
                if (result.ok) {
                    setTransitioning(true);
                    void fetch('/api/v1/dsh-workspace/update/restart', { method: 'POST' }).catch(() => undefined);
                    setTimeout(() => {
                        let attempts = 0;
                        const probe = () => {
                            void fetch('/api/v1/dsh-workspace/update', { signal: AbortSignal.timeout(3_000) })
                                .then(response => { if (response.ok)
                                window.location.reload(); })
                                .catch(() => undefined)
                                .finally(() => { if (attempts < 60) {
                                attempts += 1;
                                setTimeout(probe, 2_000);
                            } });
                        };
                        probe();
                    }, 3_000);
                }
            }
            else {
                setUpdating('error');
                setUpdateMessage('更新失败，请重试');
            }
        })
            .catch(() => { setUpdating('error'); setUpdateMessage('更新失败，请重试'); });
    }, []);
    const currentVersion = update?.currentVersion ?? null;
    const outdated = update?.outdated === true && update.latestVersion !== null;
    const checkUpdate = useCallback(() => {
        void fetch('/api/v1/dsh-workspace/update')
            .then(async (response) => response.ok ? await response.json() : null)
            .then(value => { if (value !== null)
            setUpdate(value); }).catch(() => undefined);
    }, []);
    const balance = snapshot?.balance.balances.find(item => item.currency === 'CNY') ?? snapshot?.balance.balances[0];
    const cost = snapshot?.cost ?? (snapshot === null ? undefined : { total: snapshot.estimatedCost.amount, source: 'estimate' });
    const balanceValue = balance ? `${balance.currency} ${balance.totalBalance}` : snapshot?.balance.error ? '不可用' : '—';
    const balanceAmount = balance ? Number(balance.totalBalance) : Number.NaN;
    const balanceTone = Number.isFinite(balanceAmount) && balanceAmount <= 10 ? 'danger' : 'safe';
    const period = snapshot?.ratePeriod ?? 'idle';
    return _jsxs("div", { className: `hui-summary${wide ? '' : ' rail'}`, children: [_jsxs("div", { className: "hui-summary-main", "aria-label": "Harness \u72B6\u6001", title: snapshot?.balance.error, children: [_jsx("span", { className: "hui-icon", children: _jsx(Activity, { size: 13 }) }), wide ? _jsxs("span", { className: "hui-content", children: [_jsxs("span", { className: "hui-card-head", children: [_jsx("span", { className: "hui-card-title", children: "Harness" }), _jsxs("span", { className: "hui-period", "data-period": period, children: [_jsx("i", {}), period === 'idle' ? '空闲' : '高峰'] })] }), _jsxs("span", { className: "hui-balance-line", children: [_jsx("b", { "data-tone": balanceTone, children: balanceValue }), _jsx("small", { children: "\u4F59\u989D" })] }), _jsxs("span", { className: "hui-card-foot", children: [_jsxs("span", { className: "hui-cost", children: ["\u4ECA\u65E5\u6210\u672C ", _jsxs("b", { title: cost?.source === 'estimate' ? '官方接口不可用，按本地估算' : 'DeepSeek 平台账单', children: ["\u00A5", cost ? cost.total.toFixed(3) : '—'] })] }), currentVersion !== null ? _jsx("span", { className: "hui-version", "data-outdated": outdated || undefined, children: outdated ? `新版 v${update?.latestVersion}` : `v${currentVersion}` }) : null, _jsx("button", { type: "button", className: "hui-update-btn", "data-muted": outdated ? undefined : true, disabled: updating === 'running', onClick: outdated ? runUpdate : checkUpdate, children: updating === 'running' ? '更新中…' : outdated ? '更新' : '检查更新' }), updating === 'idle' ? null : _jsx("em", { title: updateMessage, children: updateMessage })] })] }) : null] }), transitioning ? _jsx("div", { className: "hui-transition", "aria-hidden": "true", children: _jsx("img", { src: FAVICON_SRC, alt: "" }) }) : null, _jsx(ProjectDrawer, { sessionId: sessionId, cwd: cwd })] });
}
const STYLE_ID = 'dsh-workspace-styles';
const STYLES = `
div:has(> [data-slot='sidebar.footer.action']){flex-wrap:wrap}.hui-summary{position:relative;display:flex;align-items:stretch;flex:0 0 100%;width:100%;min-width:0;min-height:58px;margin-top:8px}.hui-summary-main{display:flex;align-items:stretch;width:100%;min-height:54px;padding:9px 10px;overflow:hidden;border:1px solid var(--dsw-alias-border-l2,#e4e8f0);border-radius:12px;background:var(--dsw-alias-bg-base,#fff);color:var(--dsw-alias-label-primary,#172033);font:inherit;transition:box-shadow .15s ease,border-color .15s ease;cursor:default}.hui-summary-main:hover{border-color:var(--dsw-alias-border-l1,#c7ccd5);box-shadow:0 2px 10px rgb(15 23 42/.06)}.hui-icon{display:grid;place-items:center;flex:none;width:24px;height:24px;border-radius:7px;background:linear-gradient(135deg,var(--dsw-alias-brand-primary,#4d6bfe),color-mix(in srgb,var(--dsw-alias-brand-primary,#4d6bfe) 55%,#8fa5ff));color:#fff;font-size:12px;font-weight:700;box-shadow:0 1px 3px rgb(77 107 254/.4)}.hui-content{display:flex;min-width:0;flex:1;flex-direction:column;gap:4px;margin-left:9px}.hui-card-head{display:flex;min-width:0;align-items:center;justify-content:space-between;gap:6px}.hui-card-title{overflow:hidden;flex:1;text-overflow:ellipsis;white-space:nowrap;color:var(--dsw-alias-label-secondary,#6c768a);font-size:9.5px;font-weight:600;letter-spacing:.5px;text-transform:uppercase}.hui-balance-line{display:flex;min-width:0;align-items:baseline;gap:6px;margin-top:1px}.hui-balance-line b{overflow:hidden;max-width:100%;text-overflow:ellipsis;white-space:nowrap;font-size:18px;font-weight:750;font-variant-numeric:tabular-nums;line-height:1.15}.hui-balance-line small{flex:none;color:var(--dsw-alias-label-tertiary,#8a93a5);font-size:9.5px;letter-spacing:.2px}.hui-summary.rail{flex:none;width:36px;min-height:36px;margin:0}.hui-summary.rail .hui-summary-main{justify-content:center;width:36px;min-height:36px;padding:0;border-radius:50%}.hui-drawer{position:fixed;z-index:40;top:8px;right:8px;bottom:8px;display:flex;flex-direction:column;width:min(760px,calc(100vw - 24px));overflow:hidden;border:1px solid var(--dsw-alias-border-l1,#d9dde5);border-radius:14px;background:var(--dsw-alias-bg-base,#fff);box-shadow:var(--dsw-shadow-lv3,0 18px 60px #0003);color:var(--dsw-alias-label-primary,#172033)}.hui-header{display:flex;align-items:center;justify-content:space-between;padding:12px 14px;border-bottom:1px solid var(--dsw-alias-border-l2,#e4e8f0)}.hui-header>div{display:flex;align-items:baseline;gap:10px}.hui-header span{color:var(--dsw-alias-label-secondary,#6c768a);font-size:12px}.hui-header button,.hui-tabs button{border:0;border-radius:7px;padding:6px 10px;background:transparent;color:inherit;font:inherit;cursor:pointer}.hui-header button:hover,.hui-tabs button:hover{background:var(--dsw-alias-interactive-bg-hover,#eef0f4)}.hui-tabs{display:flex;gap:4px;padding:8px 12px;border-bottom:1px solid var(--dsw-alias-border-l2,#e4e8f0)}.hui-tabs button[aria-selected=true]{background:var(--dsw-alias-interactive-bg-hover,#eef0f4);font-weight:600}.hui-error{padding:8px 12px;color:var(--dsw-alias-label-error,#d94a4a)}.hui-body{display:grid;grid-template-columns:260px minmax(0,1fr);min-height:0;flex:1}.hui-list{overflow:auto;border-right:1px solid var(--dsw-alias-border-l2,#e4e8f0);padding:6px}.hui-list button{display:flex;align-items:center;gap:7px;width:100%;padding:6px 9px;overflow:hidden;border:0;border-radius:6px;background:transparent;color:inherit;text-align:left;font:12px/1.4 ui-monospace,SFMono-Regular,Consolas,monospace;cursor:pointer}.hui-list button:hover,.hui-list button[data-selected]{background:var(--dsw-alias-interactive-bg-hover,#eef0f4)}.hui-list button span{overflow:hidden;text-overflow:ellipsis}.hui-list button b{min-width:20px;color:var(--dsw-alias-brand-primary,#4d6bfe)}.hui-list p{padding:8px;color:var(--dsw-alias-label-secondary,#6c768a);font-size:12px}.hui-preview{min-width:0;margin:0;padding:14px;overflow:auto;background:var(--dsw-alias-bg-module-platform,#fafbfc);font:12px/1.55 ui-monospace,SFMono-Regular,Consolas,monospace;white-space:pre-wrap;word-break:break-word}@media(max-width:680px){.hui-body{grid-template-columns:180px minmax(0,1fr)}}
`;
const STATUS_STYLES = `
.hui-balance-line b[data-tone=safe]{color:var(--dsw-alias-label-success,#16895a)}.hui-balance-line b[data-tone=danger]{color:var(--dsw-alias-label-error,#d94a4a)}.hui-period{display:inline-flex;flex:none;align-items:center;gap:4px;font-size:11px;font-weight:600}.hui-period>i{width:7px;height:7px;border-radius:50%;background:currentColor}.hui-period[data-period=idle]{color:var(--dsw-alias-label-success,#16895a)}.hui-period[data-period=peak]{color:var(--dsw-alias-label-error,#d94a4a)}.hui-period[data-period=peak]>i{box-shadow:0 0 0 0 rgb(217 74 74/.5);animation:hui-pulse 1.8s ease-out infinite}.hui-period[data-period=idle]>i{box-shadow:0 0 0 3px rgb(22 137 90/.12)}@keyframes hui-pulse{70%{box-shadow:0 0 0 6px rgb(217 74 74/0)}100%{box-shadow:0 0 0 0 rgb(217 74 74/0)}}.hui-card-foot{display:flex;align-items:center;gap:6px;min-width:0;margin-top:5px;padding-top:5px;border-top:1px solid var(--dsw-alias-border-l2,#e4e8f0)}.hui-cost{display:inline-flex;min-width:0;align-items:baseline;gap:3px;overflow:hidden;flex:1;color:var(--dsw-alias-label-secondary,#6c768a);font-size:10px;white-space:nowrap}.hui-cost b{color:var(--dsw-alias-label-error,#d94a4a);font-weight:650;font-variant-numeric:tabular-nums}.hui-version{flex:none;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--dsw-alias-label-tertiary,#8a93a5);font-size:9.5px;font-variant-numeric:tabular-nums}.hui-version[data-outdated]{color:var(--dsw-alias-label-error,#d94a4a);font-weight:600}.hui-card-foot em{flex:none;max-width:80px;overflow:hidden;color:var(--dsw-alias-label-tertiary,#8a93a5);font-size:9px;font-style:normal;text-overflow:ellipsis;white-space:nowrap}.hui-update-btn{flex:none;display:inline-flex;align-items:center;height:18px;padding:0 9px;border:0;border-radius:9px;background:var(--dsw-alias-label-error,#d94a4a);color:#fff;font-family:inherit;font-size:10px;font-weight:600;line-height:1;cursor:pointer}.hui-update-btn[data-muted]{background:var(--dsw-alias-interactive-bg-hover,#eef0f4);color:var(--dsw-alias-label-secondary,#6c768a)}.hui-update-btn:hover:not(:disabled){filter:brightness(1.1)}.hui-update-btn[data-muted]:hover:not(:disabled){background:var(--dsw-alias-border-l2,#e4e8f0)}.hui-update-btn:disabled{opacity:.55;cursor:default}.hui-transition{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:var(--dsw-alias-bg-base,#fff)}.hui-transition img{width:96px;height:96px;animation:hui-breathe 2.4s ease-in-out infinite}@keyframes hui-breathe{0%,100%{transform:scale(1);opacity:.6}50%{transform:scale(1.12);opacity:1}}
.hui-drawer{top:0;right:0;bottom:0;width:var(--hui-drawer-width,clamp(600px,46vw,780px));max-width:calc(100vw - 24px);border:0;border-left:1px solid var(--dsw-alias-border-l1,#c7ccd5);border-radius:0;box-shadow:-8px 0 28px #0000001c;background:var(--dsw-alias-bg-base,#f8f8f8);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}.hui-resizer{position:absolute;left:0;top:0;bottom:0;z-index:5;width:5px;cursor:col-resize;touch-action:none}.hui-resizer:hover,.hui-resizer:active{background:var(--dsw-alias-brand-primary,#4d6bfe)}.hui-titlebar{display:flex;align-items:center;justify-content:space-between;height:35px;padding:0 8px;border-bottom:1px solid var(--dsw-alias-border-l2,#dedede);background:var(--dsw-alias-bg-module-platform,#f3f3f3);user-select:none}.hui-titlebar>div{display:flex;min-width:0;align-items:center;gap:8px}.hui-titlebar span:last-child{min-width:0;flex:1;overflow:hidden;color:var(--dsw-alias-label-tertiary,#858585);font-size:11px;text-overflow:ellipsis;white-space:nowrap}.hui-vscode-mark{display:grid;width:20px;height:20px;flex:none;place-items:center;border-radius:3px;background:#007acc;color:#fff;font-size:11px;font-weight:700}.hui-titlebar button,.hui-explorer>header button{display:grid;width:26px;height:25px;place-items:center;border:0;border-radius:4px;background:transparent;color:inherit;font:16px/1 sans-serif;cursor:pointer}.hui-titlebar button:hover,.hui-explorer>header button:hover{background:var(--dsw-alias-interactive-bg-hover,#e5e5e5)}
.hui-workbench{display:grid;grid-template-columns:46px minmax(0,1fr);min-height:0;flex:1}.hui-workbench[data-preview]{grid-template-columns:46px 238px minmax(0,1fr)}.hui-activity{display:flex;flex-direction:column;align-items:stretch;border-right:1px solid var(--dsw-alias-border-l2,#dedede);background:var(--dsw-alias-bg-module-platform,#f3f3f3)}.hui-activity button{position:relative;display:grid;height:48px;place-items:center;border:0;border-left:2px solid transparent;background:transparent;color:var(--dsw-alias-label-tertiary,#7a7a7a);cursor:pointer}.hui-activity button:hover{color:var(--dsw-alias-label-primary,#222)}.hui-activity button[data-active]{border-left-color:#007acc;color:var(--dsw-alias-label-primary,#222)}.hui-activity button>svg{width:20px;height:20px}.hui-activity button>b{position:absolute;top:6px;right:5px;display:grid;min-width:16px;height:16px;padding:0 4px;place-items:center;border-radius:8px;background:#007acc;color:#fff;font-size:9px}
.hui-explorer{display:flex;min-width:0;min-height:0;flex-direction:column;border-right:1px solid var(--dsw-alias-border-l2,#dedede);background:var(--dsw-alias-bg-base,#f8f8f8)}.hui-explorer>header{display:flex;align-items:center;justify-content:space-between;height:42px;padding:0 10px 0 16px}.hui-explorer>header strong{font-size:11px;font-weight:400;letter-spacing:.6px;text-transform:uppercase}.hui-section-title{display:flex;align-items:center;height:23px;padding:0 8px 0 4px;background:var(--dsw-alias-interactive-bg-hover,#e8e8e8);font-size:11px;user-select:none;cursor:pointer}.hui-section-title>svg{flex:none}.hui-section-title>b{overflow:hidden;flex:1;text-overflow:ellipsis;white-space:nowrap}.hui-section-title>em{display:grid;min-width:17px;height:17px;padding:0 4px;place-items:center;border-radius:9px;background:var(--dsw-alias-label-tertiary,#858585);color:var(--dsw-alias-bg-base,#fff);font-size:9px;font-style:normal}.hui-section-title>button{display:grid;width:18px;height:18px;flex:none;place-items:center;padding:0;border:0;border-radius:4px;background:transparent;color:var(--dsw-alias-label-tertiary,#858585);cursor:pointer}.hui-section-title>button:hover{background:var(--dsw-alias-interactive-bg-hover,#e8e8e8);color:var(--dsw-alias-label-primary,#172033)}.hui-tree{min-height:0;overflow-y:auto;overflow-x:hidden;padding:3px 0 10px}.hui-terminal{display:flex;min-width:0;min-height:0;flex:1;flex-direction:column;background:var(--dsw-alias-bg-base,#f8f8f8);color:var(--dsw-alias-label-primary,#172033);font-family:"SFMono-Regular",Consolas,"Liberation Mono",Menlo,monospace;font-size:12px;line-height:1.6}.hui-term-toolbar{display:flex;align-items:center;justify-content:space-between;height:31px;padding:0 8px;border-bottom:1px solid var(--dsw-alias-border-l2,#e4e8f0);background:var(--dsw-alias-bg-module-platform,#fafbfc);color:var(--dsw-alias-label-secondary,#6c768a);font-size:11px;user-select:none}.hui-term-toolbar>span{display:flex;align-items:center;gap:5px}.hui-term-actions{display:flex;align-items:center;gap:2px}.hui-term-toolbar button{display:grid;width:20px;height:20px;place-items:center;border:0;border-radius:4px;background:transparent;color:inherit;cursor:pointer}.hui-term-toolbar button:hover{background:var(--dsw-alias-interactive-bg-hover,#eef0f4);color:var(--dsw-alias-label-primary,#172033)}.hui-term-screen{position:relative;min-width:0;min-height:0;flex:1;overflow:hidden;padding:4px 0 4px 6px}.hui-term-screen .xterm{height:100%}.hui-term-screen .xterm-viewport{overflow-y:auto}.hui-term-screen .xterm-rows{color:inherit}.hui-tree-row{display:flex;width:100%;height:23px;align-items:center;gap:4px;padding:0 8px;overflow:hidden;border:0;background:transparent;color:inherit;text-align:left;font:12px/1.4 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;cursor:default}.hui-tree-open{display:flex;flex:1;min-width:0;align-items:center;gap:4px;padding:0;border:0;background:none;color:inherit;font:inherit;text-align:left;cursor:default}.hui-tree-open>svg{flex:none;color:var(--dsw-alias-label-secondary,#6c768a)}.hui-tree-open>span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.hui-tree-at{flex:none;display:none;width:18px;height:18px;padding:0;place-items:center;border:0;border-radius:4px;background:transparent;color:var(--dsw-alias-label-success,#16895a);cursor:pointer}.hui-tree-row:hover .hui-tree-at,.hui-tree-row[data-selected] .hui-tree-at{display:grid}.hui-tree-at:hover{background:var(--dsw-alias-interactive-bg-hover,#e8e8e8);color:var(--dsw-alias-label-success,#16895a)}.hui-tree-row:hover{background:var(--dsw-alias-interactive-bg-hover,#e8e8e8)}.hui-tree-row[data-selected]{background:#007acc26;outline:1px solid #007acc55;outline-offset:-1px}.hui-tree-row>span:last-child{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.hui-tree-row>svg{flex:none;color:var(--dsw-alias-label-secondary,#6c768a)}.hui-tree-row>.hui-folder-icon{color:var(--dsw-alias-label-warning,#dcb67a)}.hui-commit{height:auto;min-height:44px;align-items:stretch;flex-direction:column;justify-content:center;gap:3px;padding:5px 8px}.hui-commit-meta{display:flex;width:100%;align-items:center;justify-content:space-between;gap:8px}.hui-commit-meta>b{flex:none;color:var(--dsw-alias-brand-primary,#4d6bfe);font:600 10px/1 "SFMono-Regular",Consolas,"Liberation Mono",monospace;letter-spacing:.4px}.hui-commit-meta>small{flex:none;color:var(--dsw-alias-label-tertiary,#8a93a5);font-size:10px}.hui-commit>span:last-child{color:var(--dsw-alias-label-primary,#172033);font-size:11px;line-height:1.5}.hui-chevron{display:flex;width:14px;flex:none;align-items:center;justify-content:center;color:var(--dsw-alias-label-secondary,#666)}.hui-folder{width:14px;flex:none;color:#dcb67a;font-size:11px}.hui-file{width:14px;flex:none;color:#6a9fb5;font-size:13px}.hui-change{padding-left:12px;cursor:pointer}.hui-change>span:first-child{overflow:hidden;min-width:0;text-overflow:ellipsis;white-space:nowrap}.hui-change>small{overflow:hidden;flex:1;color:var(--dsw-alias-label-tertiary,#858585);font-size:10px;text-overflow:ellipsis;white-space:nowrap}.hui-change>b{margin-left:auto;color:#d19a66;font-size:10px}.hui-change>b[data-status^=M]{color:#d7ba7d}.hui-change>b[data-status^=A],.hui-change>b[data-status^=?]{color:#73c991}.hui-change>b[data-status^=D]{color:#f48771}.hui-tree>p,.hui-empty-small{padding:12px 16px;color:var(--dsw-alias-label-tertiary,#858585);font-size:11px;line-height:1.5}
.hui-editor{display:flex;min-width:0;min-height:0;flex-direction:column;background:var(--dsw-alias-bg-module-platform,#fff)}.hui-editor-tabs{height:35px;flex:none;border-bottom:1px solid var(--dsw-alias-border-l2,#dedede);background:var(--dsw-alias-bg-base,#f3f3f3)}.hui-editor-tab{display:flex;width:min(190px,80%);height:35px;align-items:center;gap:5px;padding:0 10px;border-top:1px solid #007acc;border-right:1px solid var(--dsw-alias-border-l2,#dedede);background:var(--dsw-alias-bg-module-platform,#fff);font-size:11px}.hui-editor-tab>span:nth-child(2){overflow:hidden;flex:1;text-overflow:ellipsis;white-space:nowrap}.hui-editor-tab>i{color:var(--dsw-alias-label-tertiary,#858585);font-size:13px;font-style:normal}.hui-breadcrumbs{display:flex;height:26px;align-items:center;gap:3px;padding:0 10px;overflow:hidden;border-bottom:1px solid var(--dsw-alias-border-l2,#eee);color:var(--dsw-alias-label-secondary,#666);font-size:10px;white-space:nowrap}.hui-breadcrumbs span{display:flex;align-items:center;gap:3px}.hui-breadcrumbs svg{flex:none;color:var(--dsw-alias-label-tertiary,#999)}.hui-preview{flex:1;padding:16px 18px;background:var(--dsw-alias-bg-module-platform,#fff);color:var(--dsw-alias-label-primary,#1e1e1e);font:12px/1.65 "SFMono-Regular",Consolas,"Liberation Mono",monospace;tab-size:2}.hui-statusbar{display:flex;height:22px;flex:none;align-items:center;justify-content:space-between;padding:0 9px;background:#007acc;color:#fff;font-size:10px}.hui-error{position:absolute;z-index:2;top:35px;right:0;left:46px;margin:0;padding:7px 10px;background:#b42318;color:#fff;font-size:11px}
.hui-change>b[data-status="??"]{color:#73c991}@media(min-width:1100px){div:has(>[data-shell-overlay]):has(.hui-drawer){box-sizing:border-box;padding-right:var(--hui-drawer-width,clamp(600px,46vw,780px))}}@media(max-width:1099px){.hui-drawer{width:min(100vw,780px)}}@media(max-width:650px){.hui-workbench{grid-template-columns:42px minmax(0,1fr)}.hui-workbench[data-preview]{grid-template-columns:42px 210px minmax(280px,1fr)}.hui-drawer{overflow:auto}.hui-workbench{min-width:620px}}
`;
const FLAT_STYLES = `
.hui-drawer{border-left:1px solid var(--dsw-alias-border-l2,#e4e8f0);background:var(--dsw-alias-bg-base,#fff);box-shadow:none}.hui-titlebar{height:40px;padding:0 12px;border-color:var(--dsw-alias-border-l2,#e4e8f0);background:var(--dsw-alias-bg-base,#fff)}.hui-vscode-mark{width:22px;height:22px;border-radius:4px;background:transparent;color:var(--dsw-alias-brand-primary,#4d6bfe);font-size:14px}.hui-titlebar span:last-child{color:var(--dsw-alias-label-tertiary,#8a93a5)}.hui-titlebar button,.hui-explorer>header button{border-radius:5px;color:var(--dsw-alias-label-secondary,#6c768a)}.hui-titlebar button:hover,.hui-explorer>header button:hover{background:var(--dsw-alias-interactive-bg-hover,#eef0f4)}
.hui-workbench{grid-template-columns:44px minmax(0,1fr)}.hui-workbench[data-preview]{grid-template-columns:44px 238px minmax(0,1fr)}.hui-activity{border-color:var(--dsw-alias-border-l2,#e4e8f0);background:var(--dsw-alias-bg-module-platform,#fafbfc)}.hui-activity button{height:44px;margin:1px 0;border-left-width:2px;transition:color .12s ease,background .12s ease;color:var(--dsw-alias-label-tertiary,#8a93a5)}.hui-activity button:hover{background:var(--dsw-alias-interactive-bg-hover,#eef0f4);color:var(--dsw-alias-label-primary,#172033)}.hui-activity button[data-active]{border-left-color:var(--dsw-alias-brand-primary,#4d6bfe);background:var(--dsw-alias-bg-base,#fff);color:var(--dsw-alias-brand-primary,#4d6bfe)}.hui-activity button>b{background:var(--dsw-alias-brand-primary,#4d6bfe);box-shadow:0 1px 2px rgb(77 107 254/.35)}
.hui-explorer{border-color:var(--dsw-alias-border-l2,#e4e8f0);background:var(--dsw-alias-bg-base,#fff)}.hui-explorer>header{height:40px}.hui-section-title{height:26px;background:var(--dsw-alias-bg-module-platform,#fafbfc);color:var(--dsw-alias-label-secondary,#6c768a)}.hui-section-title>em{background:var(--dsw-alias-fill-secondary,#aab1bf);color:var(--dsw-alias-bg-base,#fff)}.hui-tree-row{height:26px;transition:background .12s ease}.hui-tree-row:hover{background:var(--dsw-alias-interactive-bg-hover,#eef0f4)}.hui-tree-row[data-selected]{background:var(--dsw-alias-interactive-bg-hover,#eef0f4);box-shadow:inset 2px 0 0 var(--dsw-alias-brand-primary,#4d6bfe);outline:0}.hui-tree-open{transition:color .12s ease}.hui-chevron{color:var(--dsw-alias-label-tertiary,#8a93a5)}.hui-folder,.hui-file{color:var(--dsw-alias-label-secondary,#6c768a)}.hui-change>b{color:var(--dsw-alias-label-secondary,#6c768a)}.hui-change>b[data-status^=M]{color:var(--dsw-alias-label-warning,#b7791f)}.hui-change>b[data-status^=A],.hui-change>b[data-status="??"]{color:var(--dsw-alias-label-success,#16895a)}.hui-change>b[data-status^=D]{color:var(--dsw-alias-label-error,#d94a4a)}
.hui-editor{background:var(--dsw-alias-bg-base,#fff)}.hui-editor-tabs{height:36px;border-color:var(--dsw-alias-border-l2,#e4e8f0);background:var(--dsw-alias-bg-module-platform,#fafbfc)}.hui-editor-tab{height:36px;border-top:0;border-right-color:var(--dsw-alias-border-l2,#e4e8f0);box-shadow:inset 0 2px 0 var(--dsw-alias-brand-primary,#4d6bfe);background:var(--dsw-alias-bg-base,#fff)}.hui-editor-tab>span:first-child{overflow:hidden;min-width:0;flex:1;text-overflow:ellipsis;white-space:nowrap}.hui-breadcrumbs{height:28px;border-color:var(--dsw-alias-border-l2,#e4e8f0);color:var(--dsw-alias-label-secondary,#6c768a)}.hui-preview{background:var(--dsw-alias-bg-base,#fff);color:var(--dsw-alias-label-primary,#172033)}.hui-statusbar{height:24px;border-top:1px solid var(--dsw-alias-border-l2,#e4e8f0);background:var(--dsw-alias-bg-module-platform,#fafbfc);color:var(--dsw-alias-label-secondary,#6c768a)}.hui-statusbar span{display:inline-flex;align-items:center;gap:4px}
`;
const EDITOR_STYLES = `
.hui-editor-tab>button{display:grid;width:20px;height:20px;padding:0;place-items:center;border:0;border-radius:4px;background:transparent;color:var(--dsw-alias-label-tertiary,#8a93a5);font:14px/1 sans-serif;cursor:pointer}.hui-editor-tab>button:hover{background:var(--dsw-alias-interactive-bg-hover,#eef0f4);color:var(--dsw-alias-label-primary,#172033)}.hui-breadcrumbs{justify-content:space-between}.hui-breadcrumbs>div{display:flex;min-width:0;overflow:hidden}.hui-breadcrumbs>b{flex:none;margin-left:8px;color:var(--dsw-alias-label-tertiary,#8a93a5);font-size:9px;font-weight:600;letter-spacing:.4px}.hui-editor-surface{min-width:0;min-height:0;flex:1;overflow:auto;background:var(--dsw-alias-bg-base,#fff)}
.hui-code-view{display:table;width:100%;min-width:max-content;padding:10px 0;font:12px/1.65 "SFMono-Regular",Consolas,"Liberation Mono",monospace;counter-reset:line}.hui-code-line{display:table-row;min-height:20px}.hui-code-line>span{display:table-cell;width:1%;padding:0 12px 0 10px;border-right:1px solid var(--dsw-alias-border-l2,#e4e8f0);color:var(--dsw-alias-label-tertiary,#8a93a5);text-align:right;user-select:none}.hui-code-line>code{display:table-cell;padding:0 16px;white-space:pre}.hui-code-line:hover>code{background:var(--dsw-alias-interactive-bg-hover,#eef0f4)}.hui-code-line[data-change=add]>code{background:var(--dsw-alias-bg-success-subtle,#eaf7f0);color:var(--dsw-alias-label-success,#16895a)}.hui-code-line[data-change=delete]>code{background:var(--dsw-alias-bg-error-subtle,#fceeee);color:var(--dsw-alias-label-error,#d94a4a)}.hui-code-line[data-change=hunk]>code{background:var(--dsw-alias-bg-info-subtle,#eef2ff);color:var(--dsw-alias-brand-primary,#4d6bfe)}
.hui-markdown-view{max-width:720px;margin:0 auto;padding:28px 30px;color:var(--dsw-alias-label-primary,#172033);font-size:13px;line-height:1.7}.hui-markdown-view p{margin:4px 0}.hui-md-heading{margin:20px 0 8px;padding-bottom:6px;border-bottom:1px solid var(--dsw-alias-border-l2,#e4e8f0);font-weight:650}.hui-md-heading[data-level="1"]{font-size:24px}.hui-md-heading[data-level="2"]{font-size:20px}.hui-md-heading[data-level="3"]{font-size:16px}.hui-md-heading[data-level="4"]{font-size:14px}.hui-md-list{display:flex;gap:9px;padding-left:8px}.hui-md-list>span{color:var(--dsw-alias-brand-primary,#4d6bfe)}.hui-markdown-view blockquote{margin:10px 0;padding:5px 12px;border-left:3px solid var(--dsw-alias-brand-primary,#4d6bfe);background:var(--dsw-alias-bg-module-platform,#fafbfc);color:var(--dsw-alias-label-secondary,#6c768a)}.hui-md-fence{margin-top:8px;padding:5px 9px;background:var(--dsw-alias-bg-module-platform,#fafbfc);color:var(--dsw-alias-label-tertiary,#8a93a5);font:10px/1.4 monospace}.hui-md-space{height:8px}
.hui-image-view,.hui-binary-view{display:flex;min-height:100%;align-items:center;justify-content:center;flex-direction:column;gap:12px;padding:24px;color:var(--dsw-alias-label-tertiary,#8a93a5)}.hui-image-view{background:var(--dsw-alias-bg-module-platform,#fafbfc)}.hui-image-view img{display:block;max-width:100%;max-height:calc(100vh - 180px);object-fit:contain}.hui-image-view span,.hui-binary-view span{font-size:11px}.hui-binary-view strong{color:var(--dsw-alias-label-secondary,#6c768a);font-size:13px}.hui-text-view{min-height:100%;padding:24px 28px;color:var(--dsw-alias-label-primary,#172033);font:13px/1.75 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;white-space:pre-wrap;word-break:break-word}
.hui-code-line>code .hljs-comment{color:#6a737d;font-style:italic}.hui-code-line>code .hljs-keyword,.hui-code-line>code .hljs-selector-tag,.hui-code-line>code .hljs-literal,.hui-code-line>code .hljs-doctag{color:#d73a49}.hui-code-line>code .hljs-string,.hui-code-line>code .hljs-regexp,.hui-code-line>code .hljs-template-string{color:#032f62}.hui-code-line>code .hljs-attr{color:#e36209}.hui-code-line>code .hljs-number,.hui-code-line>code .hljs-title,.hui-code-line>code .hljs-function .hljs-title,.hui-code-line>code .hljs-symbol{color:#005cc5}.hui-code-line>code .hljs-built_in,.hui-code-line>code .hljs-type,.hui-code-line>code .hljs-class .hljs-title,.hui-code-line>code .hljs-title.class_{color:#e36209}.hui-code-line>code .hljs-variable,.hui-code-line>code .hljs-template-variable,.hui-code-line>code .hljs-name,.hui-code-line>code .hljs-tag,.hui-code-line>code .hljs-attribute{color:#22863a}.hui-code-line>code .hljs-params,.hui-code-line>code .hljs-property{color:#005cc5}.hui-code-line>code .hljs-emphasis{font-style:italic}.hui-code-line>code .hljs-strong{font-weight:700}.hui-drawer ::-webkit-scrollbar{width:8px;height:8px}.hui-drawer ::-webkit-scrollbar-track{background:transparent}.hui-drawer ::-webkit-scrollbar-thumb{border:2px solid transparent;border-radius:5px;background:var(--dsw-alias-fill-secondary,#c9cdd6);background-clip:padding-box}.hui-drawer ::-webkit-scrollbar-thumb:hover{background:var(--dsw-alias-label-tertiary,#8a93a5);background-clip:padding-box}.hui-editor-tab>button{transition:color .12s ease,background .12s ease}.hui-editor-tab>button:hover{background:var(--dsw-alias-interactive-bg-hover,#eef0f4);color:var(--dsw-alias-label-error,#d94a4a)}.hui-breadcrumbs>div{color:var(--dsw-alias-label-secondary,#6c768a);font-size:10px}.hui-editor-tab>span:first-child{font-weight:500}.hui-section-title{transition:background .12s ease}.hui-section-title:hover{background:var(--dsw-alias-interactive-bg-hover,#e4e8f0)}.hui-section-title>b{letter-spacing:.5px}.hui-section-title>em{transition:background .12s ease}
`;
export const inject = ['slots', 'sessions'];
export function apply(ctx) {
    ctx.effect(() => {
        if (document.getElementById(STYLE_ID))
            return;
        const style = document.createElement('style');
        style.id = STYLE_ID;
        style.textContent = STYLES + STATUS_STYLES + FLAT_STYLES + EDITOR_STYLES;
        document.head.append(style);
        return () => style.remove();
    }, 'dsh-workspace: styles');
    const Summary = ({ wide }) => _jsx(HarnessSummary, { wide: wide, sessions: ctx.sessions });
    ctx.slots.inject('sidebar.footer.action', () => ctx.slots.register({ name: 'sidebar.footer.action', id: 'dsh-workspace', order: 10 }, Summary));
    ctx.slots.inject('conversation.composer.dock', () => ctx.slots.register({ name: 'conversation.composer.dock', id: 'dsh-workspace-file-at', order: 100 }, ComposerBridge));
}
//# sourceMappingURL=index.js.map