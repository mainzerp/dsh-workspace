# dsh-workspace

> **非官方项目** —— 独立社区项目，与 DeepSeek 无关，亦未获得其认可或支持。

[![Release](https://img.shields.io/github/v/release/deepseek-dsh/dsh-workspace?style=flat-square)](https://github.com/deepseek-dsh/dsh-workspace/releases)
[![Stars](https://img.shields.io/github/stars/deepseek-dsh/dsh-workspace?style=flat-square)](https://github.com/deepseek-dsh/dsh-workspace)
[![Forks](https://img.shields.io/github/forks/deepseek-dsh/dsh-workspace?style=flat-square)](https://github.com/deepseek-dsh/dsh-workspace)
[![License](https://img.shields.io/github/license/deepseek-dsh/dsh-workspace?style=flat-square)](https://github.com/deepseek-dsh/dsh-workspace)

[English](README.md) · **中文**

> 为 DeepSeek Harness (DSH) 开箱即用的 UI 增强插件：侧边栏实时查看余额与今日费用、浏览项目文件与 Git 变更/历史、内置终端，并支持一键更新 Harness——无需任何额外配置。

[功能](#功能) · [安装](#安装) · [配置](#配置) · [常见问题](#常见问题) · [已知限制](#已知限制) · [许可证](#许可证)

## 功能

**用量一目了然**

- 左下角实时显示余额、今日费用与空闲/高峰状态
- 余额默认绿色，≤ 10 CNY 时变红；空闲绿色、高峰红色
- 每 30 秒自动刷新，切回页面时立即重新拉取
- 今日费用**优先取 DeepSeek 官方账单**，平台接口不可用时自动回退为本地 Token 估算

**Harness 一键更新**

- 显示已安装的 Harness 版本；有新版本时变红并醒目提示
- 点击**更新**即可安装最新版，完成后自动重启，过渡期间显示呼吸 Logo 动画，页面自动恢复——无白屏、无需手动操作

**项目工作区面板**

- 右侧固定面板预览当前会话的项目：带文件类型图标的文件树、Git 工作区变更、文件 diff 与提交历史
- 只读访问，严格限制在 `projectRoot` 内，拒绝路径穿越与越界符号链接
- 跳过 `.git`、`node_modules`、`dist`、`lib`、`coverage`、`.next`、`.cache`
- 内置终端，可在项目中直接执行命令

**默认安全**

- 所有接口默认仅允许本机访问，如需开放可设 `allowRemote: true`
- API Key 通过 Harness `ctx.credentials` 解析，不会暴露给浏览器

## 安装

### 系统要求

- 已安装 DeepSeek Harness，`dsh web` 可正常启动
- 从仓库安装需要 Node.js >= 22

### 一行安装

```bash
dsh plugin --profile web add "github:deepseek-dsh/dsh-workspace#dev"
```

装完**重启 `dsh web`** 生效。

### 验证与卸载

```bash
dsh web --dump-config | grep dsh-workspace   # 确认插件层已挂载
dsh plugin --profile web remove dsh-workspace # 卸载后重启 dsh web
```

### 配置

插件零配置即可使用。以下选项可按需在 profile 配置文件中设置：

| 选项 | 默认值 | 说明 |
| --- | --- | --- |
| `baseUrl` | `https://api.deepseek.com` | DeepSeek API 地址 |
| `apiKeyEnv` | `DEEPSEEK_API_KEY` | 通过 `ctx.credentials` 解析 Key 的环境变量名 |
| `projectRoot` | — | 预览的项目根目录，默认取会话工作目录 |
| `peakWindows` | `[[540, 720], [840, 1080]]` | 高峰计费时段（分钟，北京时间） |
| `allowRemote` | `false` | 是否允许非本机访问插件接口 |

### 安装排障

| 现象 | 原因 | 解法 |
| --- | --- | --- |
| 装完侧边栏没有入口 | bundle 插件需要重启进程 | 重启 `dsh web`，再 `dsh web --dump-config \| grep dsh-workspace` 核对 |
| `[WARN] Issues with peer dependencies found` | peer 依赖（`@deepseek-ai/*`、`react`）由 profile 提供 | 正常警告，忽略即可 |
| `ERR_PNPM_IGNORED_BUILDS` | pnpm 拒绝 `node-pty` 原生构建脚本 | 在 profile 的 `pnpm-workspace.yaml` 把 `node-pty` 加进 `allowBuilds`，重新安装 |
| `Cannot find package '...'` | profile 严格布局下依赖未被提升 | 在 profile 的 `pnpm-workspace.yaml` 设 `nodeLinker: hoisted`，重新安装 |
| 今日费用一直显示估算值 | platform.deepseek.com 认证失败 | 确认 `apiKeyEnv` 指向的 Key 在 platform.deepseek.com 有效；失败时插件自动回退估算 |

## 常见问题

**装完重启了，侧边栏还是没有入口？**

A: 确认装进了 `web` profile（命令带 `--profile web`），用 `dsh web --dump-config | grep dsh-workspace` 核对插件层已挂载；页面刷新不够，需要重启 `dsh web` 进程。

**今日费用和官方账单对不上？**

A: 费用优先取平台官方账单，显示的是真实消费；若平台接口认证失败会自动回退为本地 Token 估算，估算按公开单价近似、不是账单。摘要下方会标注金额来源。

**余额变红了？**

A: 余额小于等于 10（CNY）时提示红色，提醒余额不足；只是展示提示，不影响 API 调用。

**「更新」真的会升级 Harness 吗？**

A: 会。通过 npm 安装最新发布的 Harness 版本后自动重启进程，页面自动恢复，整个过程约一分钟。

**能从手机或其他设备访问吗？**

A: 默认只允许本机（回环地址）读取项目数据。非本机浏览器访问会返回 403；确有需要可设 `allowRemote: true`，并自行确保访问安全。

**空闲/高峰状态对计费有影响吗？**

A: 该显示与 DeepSeek 实际的峰谷计费时段一致（高峰为北京 9:00–12:00、14:00–18:00，其余空闲半价）。本地估算按当前时段计价，因此已计入了高峰/空闲差价；但费用始终以官方账单优先。

## 已知限制

- 今日费用优先官方账单，取不到时回退本地估算；估算不是账户账单
- 项目 API 只读、默认仅回环地址可访问，不提供写操作
- 空闲/高峰标签同 DeepSeek 峰谷计费时段（高峰北京 9:00–12:00、14:00–18:00）；本地估算按当前时段计价
- 依赖 `node-pty` 原生模块，平台构建失败时需按安装排障处理

## 许可证

MIT