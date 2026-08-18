# dsh-workspace

独立的 DeepSeek Harness UI 增强插件，不包含在 `@dsh-plugins/usage` 中。

## 功能

- Harness 左下角显示余额、今日费用估算，以及空闲/高峰状态
- 余额默认绿色，余额小于等于 10 时显示红色
- 空闲状态显示绿色，高峰状态显示红色
- 固定在右侧的面板预览当前会话项目文件和 Git 工作区变更
- 文件读取严格限制在 `projectRoot`，拒绝路径穿越和越界符号链接
- 跳过 `.git`、`node_modules`、`dist`、`lib`、`coverage`、`.next` 和 `.cache`

余额、今日费用和项目预览全部由本插件自己的 Host 接口提供。插件直接读取 `ctx.sessionPersistence` 并调用 DeepSeek 余额接口，不依赖、不导入也不请求 `@dsh-plugins/usage`。

默认把 UTC+8 的 00:30–08:30 标记为“空闲”，其余时间标记为“高峰”。此状态仅作流量调度提示；DeepSeek 当前为统一价格，没有分时优惠。今日费用按 2026-04-24 公开 V4 CNY 单价从本地 Token 汇总估算；未知模型不计价，并在金额后显示 `+`。估算不是账户账单。

## 安装

```bash
dsh plugin --profile web add "github:NasonZH/dsh-workspace#main"
```

本地开发可链接到源码目录：

```bash
dsh plugin --profile web add link:/path/to/dsh-workspace
```

装完后重启 `dsh web`。建议在 profile 配置中把 `projectRoot` 指向实际项目：

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

## 配置

| 字段 | 默认值 | 说明 |
| --- | --- | --- |
| `projectRoot` | 当前会话的 `cwd` | 可选固定项目目录；不配置时自动跟随当前会话 |
| `baseUrl` | `https://api.deepseek.com` | DeepSeek API 根地址 |
| `apiKey` | 无 | 可选明文覆盖，不建议写入配置文件 |
| `apiKeyEnv` | `DEEPSEEK_API_KEY` | 通过 Harness `ctx.credentials` 解析的凭据引用 |
| `timezoneOffsetMinutes` | `480` | 今日统计的自然日时区 |
| `idleStartMinutes` | `30` | 空闲开始时间，从当地 00:00 起算的分钟数（00:30） |
| `idleEndMinutes` | `510` | 空闲结束时间，从当地 00:00 起算的分钟数（08:30） |
| `balanceTimeoutMs` | `5000` | 余额请求超时毫秒数 |
| `inspectConcurrency` | `8` | 并发读取会话日志上限 |
| `projectMaxEntries` | `2000` | 文件树条目上限，范围 100–20000 |
| `projectMaxFileBytes` | `200000` | 单个文件或 diff 预览上限，范围 1024–2000000 字节 |
| `allowRemote` | `false` | 是否允许非本机浏览器读取项目数据 |

项目 API 默认为只读且仅回环地址可访问：

```text
GET /api/v1/dsh-workspace/project
GET /api/v1/dsh-workspace/file?path=src/index.ts
GET /api/v1/dsh-workspace/diff?path=src/index.ts
GET /api/v1/dsh-workspace/summary
```
