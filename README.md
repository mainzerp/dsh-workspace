# dsh-workspace

[![Release](https://img.shields.io/github/v/release/NasonZH/dsh-workspace?style=flat-square)](https://github.com/NasonZH/dsh-workspace/releases)
[![Stars](https://img.shields.io/github/stars/NasonZH/dsh-workspace?style=flat-square)](https://github.com/NasonZH/dsh-workspace)
[![Forks](https://img.shields.io/github/forks/NasonZH/dsh-workspace?style=flat-square)](https://github.com/NasonZH/dsh-workspace)
[![License](https://img.shields.io/github/license/NasonZH/dsh-workspace?style=flat-square)](https://github.com/NasonZH/dsh-workspace)

**A DeepSeek Harness (DSH) Web UI enhancement plugin: balance / today's cost / idle-peak status in the sidebar, plus a project files & Git changes preview panel.**

[Features](#features) · [Install](#install) · [Configuration](#configuration) · [FAQ](#faq) · [Known limitations](#known-limitations) · [License](#license)

## Features

- Shows balance, today's cost, and idle/peak status in the bottom-left of Harness
- Balance is green by default, turns red when it drops to 10 or below
- Idle state is green, peak state is red
- A fixed right-side panel previews the current session's project files and Git working-tree changes
- File reads are strictly confined to `projectRoot`; path traversal and out-of-root symlinks are rejected
- Skips `.git`, `node_modules`, `dist`, `lib`, `coverage`, `.next`, and `.cache`

Balance, today's cost, and project preview are all served by this plugin's own host endpoints. The plugin reads `ctx.sessionPersistence` directly and calls the DeepSeek APIs; it does not depend on, import, or request `@dsh-plugins/usage`.

Today's cost is **taken from the official DeepSeek bill first** (the per-API-key cost endpoint on platform.deepseek.com); when that is unavailable it falls back to a local token estimate. The estimate uses the public V4 CNY rates of 2026-04-24; unknown models are unpriced and shown with a trailing `+`. The estimate is not an account bill. Balance and cost calls go through the key resolved by Harness `ctx.credentials`; the key is never exposed to the browser.

By default the UTC+8 window 00:30–08:30 is marked as "idle" and the rest as "peak". This state is only a traffic-scheduling hint; DeepSeek currently uses a single price with no off-peak discount.

## Install

### Requirements

- DeepSeek Harness installed and `dsh web` running
- Node.js >= 22 when installing from the repository

### One-line install

```bash
dsh plugin --profile web add "github:NasonZH/dsh-workspace#main"
```

**Restart `dsh web`** after installation.

### Verify & remove

```bash
dsh web --dump-config | grep dsh-workspace    # confirm the plugin layer is mounted
dsh plugin --profile web remove dsh-workspace # remove, then restart dsh web
```

### Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| No sidebar entry after install | Bundle plugins need a process restart | Restart `dsh web`, then check `dsh web --dump-config \| grep dsh-workspace` |
| `[WARN] Issues with peer dependencies found` | Peer deps (`@deepseek-ai/*`, `react`) are provided by the profile | Harmless warning, ignore |
| `ERR_PNPM_IGNORED_BUILDS` | pnpm rejects the `node-pty` native build script | Add `node-pty` to `allowBuilds` in the profile `pnpm-workspace.yaml` and reinstall |
| `Cannot find package '...'` | Dependencies not hoisted under a strict pnpm layout | Set `nodeLinker: hoisted` in the profile `pnpm-workspace.yaml` and reinstall |
| Today's cost always shows the estimate | Authentication failed on platform.deepseek.com | Make sure the key behind `apiKeyEnv` is valid there; the plugin falls back to the estimate automatically |

## FAQ

**Installed and restarted, but there is still no sidebar entry?**

A: Make sure it is installed into the `web` profile (command uses `--profile web`) and confirm the plugin layer is mounted with `dsh web --dump-config | grep dsh-workspace`. Refreshing the page is not enough; restart the `dsh web` process.

**Today's cost does not match the official bill?**

A: The cost is taken from the official platform bill first, so it shows real spending; when the platform API fails authentication it falls back to a local token estimate, which is approximate and not a bill. The source is labeled next to the amount.

**Why is the balance red?**

A: The balance turns red when it drops to 10 (CNY) or below as a low-balance reminder; it is display only and does not affect API calls.

**Can I access it from my phone or another device?**

A: Project data is loopback-only by default; other browsers get a 403. If you really need it, set `allowRemote: true` and make sure the access is secured.

**Does idle/peak save money?**

A: No. DeepSeek currently uses a single price with no off-peak discount; the state is only a scheduling hint.

## Known limitations

- Today's cost prefers the official bill and falls back to a local estimate; the estimate is not an account bill
- The project API is read-only and loopback-only by default; no write operations
- Idle/peak is only a scheduling hint and does not change billing
- Depends on the `node-pty` native module; see Troubleshooting if platform builds fail

## License

MIT