# dsh-workspace

A standalone DeepSeek Harness UI enhancement plugin. It is self-contained and does not depend on `@dsh-plugins/usage`.

## Features

- Shows balance, today's estimated cost, and idle/peak status in the bottom-left of Harness
- Balance is green by default, turns red when it drops to 10 or below
- Idle state is green, peak state is red
- A fixed right-side panel previews the current session's project files and Git working-tree changes
- File reads are strictly confined to `projectRoot`; path traversal and out-of-root symlinks are rejected
- Skips `.git`, `node_modules`, `dist`, `lib`, `coverage`, `.next`, and `.cache`

Balance, today's cost, and project preview are all served by this plugin's own host endpoints. The plugin reads `ctx.sessionPersistence` directly and calls the DeepSeek balance API; it does not depend on, import, or request `@dsh-plugins/usage`.

By default the UTC+8 window 00:30–08:30 is marked as "idle" and the rest as "peak". This state is only a traffic-scheduling hint; DeepSeek currently uses a single price with no off-peak discount. Today's cost is estimated from local token aggregates using the public V4 CNY rates of 2026-04-24; unknown models are unpriced and shown with a trailing `+`. The estimate is not an account bill.

## Install

```bash
dsh plugin --profile web add "github:NasonZH/dsh-workspace#main"
```

For local development you can link to a source checkout instead:

```bash
dsh plugin --profile web add link:/path/to/dsh-workspace
```

Restart `dsh web` after installation. It is recommended to point `projectRoot` at your actual project in the profile config:

```yaml
- name: 'dsh-workspace'
  config:
    projectRoot: /absolute/path/to/project
    baseUrl: https://api.deepseek.com
    apiKeyEnv: DEEPSEEK_API_KEY
    timezoneOffsetMinutes: 480
    idleStartMinutes: 30
    idleEndMinutes: 510
    projectMaxEntries: 2000
    projectMaxFileBytes: 200000
    allowRemote: false
```

## Configuration

| Field | Default | Description |
| --- | --- | --- |
| `projectRoot` | current session `cwd` | Optional fixed project directory; when unset it follows the active session |
| `baseUrl` | `https://api.deepseek.com` | DeepSeek API base URL |
| `apiKey` | none | Optional plaintext override; not recommended in config files |
| `apiKeyEnv` | `DEEPSEEK_API_KEY` | Credential reference resolved through Harness `ctx.credentials` |
| `timezoneOffsetMinutes` | `480` | Timezone of the natural-day boundary for today's stats |
| `idleStartMinutes` | `30` | Idle start, minutes from local 00:00 (00:30) |
| `idleEndMinutes` | `510` | Idle end, minutes from local 00:00 (08:30) |
| `balanceTimeoutMs` | `5000` | Balance request timeout in milliseconds |
| `inspectConcurrency` | `8` | Concurrent session-log inspection limit |
| `projectMaxEntries` | `2000` | File-tree entry limit, 100–20000 |
| `projectMaxFileBytes` | `200000` | Per-file or diff preview limit, 1024–2000000 bytes |
| `allowRemote` | `false` | Whether non-loopback browsers may read project data |

The project API is read-only and only reachable on the loopback address by default:

```text
GET /api/v1/dsh-workspace/project
GET /api/v1/dsh-workspace/file?path=src/index.ts
GET /api/v1/dsh-workspace/diff?path=src/index.ts
GET /api/v1/dsh-workspace/summary
```

## License

MIT