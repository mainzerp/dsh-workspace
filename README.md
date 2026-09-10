# dsh-workspace

> **Unofficial** — an independent community project, not affiliated with or endorsed by DeepSeek.
> Fork of [deepseek-dsh/dsh-workspace](https://github.com/deepseek-dsh/dsh-workspace), trimmed and fully translated to English.

[![Release](https://img.shields.io/github/v/release/mainzerp/dsh-workspace?style=flat-square)](https://github.com/mainzerp/dsh-workspace/releases)
[![Stars](https://img.shields.io/github/stars/mainzerp/dsh-workspace?style=flat-square)](https://github.com/mainzerp/dsh-workspace)
[![License](https://img.shields.io/github/license/mainzerp/dsh-workspace?style=flat-square)](https://github.com/mainzerp/dsh-workspace)

> A drop-in UI enhancement for DeepSeek Harness (DSH): a subtle USD balance with peak/off-peak indicator and a rolling 24-hour schedule bar in the sidebar, a project file tree with previews, in-place editing and uploads, Git changes & history, and a built-in terminal — no extra config.

[Features](#features) · [Screenshots](#screenshots) · [Differences from upstream](#differences-from-upstream) · [Install](#install) · [Configuration](#configuration) · [FAQ](#faq) · [Known limitations](#known-limitations) · [License](#license)

## Screenshots

![Sidebar status card](assets/Screenshot-1.png)

![Project file tree and preview](assets/Screenshot-2.png)

## Features

**Usage at a glance**

- Subtle live balance (USD, formatted via `Intl.NumberFormat`) in the bottom-left of Harness
- The balance stays neutral and only turns red when it runs low (≤ $2, or ≤ ¥15 for CNY accounts)
- Peak/off-peak indicator following DeepSeek's billing schedule (peak 01:00–04:00 and 06:00–10:00 UTC, Monday through Friday, all other hours off-peak)
- A rolling 24-hour bar under the balance covers 6 hours back and 18 hours ahead in absolute time: red segments are the peak hours inside that window, green is off-peak, and the line marks now at a quarter of the bar; weekends are off-peak only where the window falls on them
- Auto-refreshes every 30s and re-fetches the moment you switch back to the tab

**Project workspace panel**

- A right-side panel previews the current session's project: file tree with type-aware icons, Git working-tree changes, per-file diff, and commit history as an interactive git graph (all branches, branch/tag badges, click a commit for its diff)
- The panel collapses to a single floating button in the top-right corner of the chat area and then occupies no space at all; expanding it restores the last active view (files, changes, or terminal). The collapsed state and the dragged width persist across reloads in `localStorage`
- Text files can be edited in place (CodeMirror editor) and files can be uploaded into the project root; overwriting an existing upload requires confirmation
- Strictly confined to `projectRoot`; path traversal and out-of-root symlinks are rejected, writes are atomic, and files larger than `projectMaxFileBytes` cannot be saved
- Skips `.git`, `node_modules`, `dist`, `lib`, `coverage`, `.next`, `.cache`
- Built-in terminal for quick command execution in the project (Terminal activity button)

**Internationalized**

- UI strings live in a dictionary module with English as the default; German is selected automatically when the browser locale starts with `de`
- Server-side API error messages stay in English by convention (the `reason` codes are the machine-readable part)

**Privacy by default**

- All endpoints are loopback-only unless you opt in with `allowRemote: true`
- With `allowRemote: true`, remote clients additionally gain arbitrary file read/write within `projectRoot` (on top of the terminal) — enable it only behind proper access control
- API keys are resolved through Harness `ctx.credentials` and never exposed to the browser

## Differences from upstream

This fork diverges from [deepseek-dsh/dsh-workspace](https://github.com/deepseek-dsh/dsh-workspace) in the following ways:

- **Real i18n** — upstream hardcodes Chinese strings; this fork ships a small string-table module (`src/client/i18n.ts`) with English as default and German included. Adding a language means copying the `en` dictionary — TypeScript enforces completeness
- **No Harness self-update** — the update button, update endpoints, and restart logic were removed. In containerized setups (e.g. Docker), updates belong to the image, not the running process
- **USD instead of CNY** — the balance prefers the USD entry of your account
- **Subtler status card** — the balance is displayed in a smaller, neutral style instead of a large colored figure
- **No cost estimation** — the today's-cost figure (platform bill + local token estimate) was removed; the card shows the balance, the billing period, and a rolling 24-hour schedule bar

## Install

### Requirements

- DeepSeek Harness (DSH) **0.1.2-rc.1** or newer installed and `dsh web` running — this plugin release (1.4.0) is NOT compatible with DSH 0.1.1.x
- Node.js >= 22 when installing from the repository

| Plugin version | Required DSH version |
| --- | --- |
| 1.0.0+ | 0.1.2-rc.1+ |
| 0.4.x | 0.1.1-rc.2+ |

### One-line install

```bash
dsh plugin --profile web add "github:mainzerp/dsh-workspace"
```

**Restart `dsh web`** after installation.

### Verify & remove

```bash
dsh web --dump-config | grep dsh-workspace    # confirm the plugin layer is mounted
dsh plugin --profile web remove dsh-workspace # remove, then restart dsh web
```

### Configuration

The plugin works with zero configuration. The following options can be set in the profile's config file when needed:

| Option | Default | Description |
| --- | --- | --- |
| `baseUrl` | `https://api.deepseek.com` | DeepSeek API base URL |
| `apiKeyEnv` | `DEEPSEEK_API_KEY` | Env name of the API key resolved via `ctx.credentials` |
| `timezoneOffsetMinutes` | `0` | Minutes east of UTC used for the usage "today" boundary |
| `scheduleTimezoneOffsetMinutes` | `0` | Minutes east of UTC in which `peakWindows` and `peakWeekdays` are evaluated. The default `0` is UTC, which is exactly DeepSeek's published rule; raise it only if your contract states the windows in local time. It is independent of `timezoneOffsetMinutes`, so the day boundary and the billing schedule cannot drift apart |
| `peakWindows` | `[[60, 240], [360, 600]]` | Peak billing windows in minutes of the `scheduleTimezoneOffsetMinutes` day (default: 01:00-04:00 and 06:00-10:00 UTC, Monday through Friday) |
| `peakWeekdays` | `[1, 2, 3, 4, 5]` | Peak weekdays, `0` = Sunday through `6` = Saturday; default Monday through Friday |
| `projectRoot` | — | Absolute project root to preview; defaults to the session working directory |
| `allowRemote` | `false` | Allow non-loopback access to the plugin endpoints. Warning: also exposes remote file write within `projectRoot` and the terminal. The loopback check trusts `req.socket.remoteAddress`, so it cannot be relied on behind a reverse proxy |
| `language` | `auto` | UI language: `auto` (browser detection), `de`, or `en` |

### Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| No sidebar entry after install | Bundle plugins need a process restart | Restart `dsh web`, then check `dsh web --dump-config \| grep dsh-workspace` |
| `[WARN] Issues with peer dependencies found` | Peer deps (`@deepseek-ai/*`, `react`) are provided by the profile | Harmless warning, ignore |
| `ERR_PNPM_IGNORED_BUILDS` | pnpm rejects the `node-pty` native build script | Add `node-pty` to `allowBuilds` in the profile `pnpm-workspace.yaml` and reinstall |
| `Cannot find package '...'` | Dependencies not hoisted under a strict pnpm layout | Set `nodeLinker: hoisted` in the profile `pnpm-workspace.yaml` and reinstall |
| The balance shows `N/A` (German: `k. A.`) | The DeepSeek balance endpoint failed, or the API key is not configured | Check the key behind `apiKeyEnv` on platform.deepseek.com |
| The sidebar figures lag by up to 30 s | The summary endpoint is polled every 30 s | Expected; since v1.1.2 a poll only re-reads the session logs whose revision changed, so the cadence no longer costs CPU or memory; the rolling bar advances on the same cadence |

## FAQ

**Installed and restarted, but there is still no sidebar entry?**

A: Make sure it is installed into the `web` profile (command uses `--profile web`) and confirm the plugin layer is mounted with `dsh web --dump-config | grep dsh-workspace`. Refreshing the page is not enough; restart the `dsh web` process.

**Why is the balance red?**

A: The balance turns red when it drops to $2 or below (¥15 for CNY accounts) as a low-balance reminder; it is display only and does not affect API calls.

**Can I access it from my phone or another device?**

A: Project data is loopback-only by default; other browsers get a 403. If you really need it, set `allowRemote: true` — but keep in mind this also exposes file editing, uploads, and the terminal to remote clients, so make sure the access is secured.

## Known limitations

- The peak/off-peak indicator and the schedule bar are display-only; they mirror DeepSeek's billing schedule (peak 01:00-04:00 and 06:00-10:00 UTC, Monday through Friday) and do not affect API calls
- File editing is text-only and capped at `projectMaxFileBytes` (default 200 KB, max 2 MB); binary files and files larger than the limit cannot be edited
- Uploads always land in the project root (basename only, no nested paths) and replace existing files only after confirmation
- Depends on the `node-pty` native module; see Troubleshooting if platform builds fail
- The collapsed state and the panel width are stored in the browser's `localStorage`; clearing site data resets the panel to expanded at its default width
- The expanded panel reserves space in the chat column only at viewport widths of 1100px or more; below that it overlays the content. The collapsed panel reserves nothing at any width and only the floating expand button floats over the chat

## License

MIT
