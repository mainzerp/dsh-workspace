# dsh-workspace

[![Release](https://img.shields.io/github/v/release/NasonZH/dsh-workspace?style=flat-square)](https://github.com/NasonZH/dsh-workspace/releases)
[![Stars](https://img.shields.io/github/stars/NasonZH/dsh-workspace?style=flat-square)](https://github.com/NasonZH/dsh-workspace)
[![Forks](https://img.shields.io/github/forks/NasonZH/dsh-workspace?style=flat-square)](https://github.com/NasonZH/dsh-workspace)
[![License](https://img.shields.io/github/license/NasonZH/dsh-workspace?style=flat-square)](https://github.com/NasonZH/dsh-workspace)

**DeepSeek Harness (DSH) Web UI 增强插件：侧边栏余额 / 今日费用 / 空闲高峰状态 + 右侧项目文件与 Git 变更预览**

[功能](#功能) · [安装](#安装) · [配置](#配置) · [常见问题](#常见问题) · [已知限制](#已知限制) · [许可证](#许可证)

## 功能

- Harness 左下角显示余额、今日费用与空闲/高峰状态
- 余额默认绿色，小于等于 10 时变红
- 空闲状态绿色、高峰状态红色
- 右侧固定面板预览当前会话的项目文件与 Git 工作区变更
- 文件读取严格限制在 `projectRoot`，拒绝路径穿越与越界符号链接
- 跳过 `.git`、`node_modules`、`dist`、`lib`、`coverage`、`.next`、`.cache`

余额、今日费用与项目预览全部由本插件自己的 Host 接口提供，直接读取 `ctx.sessionPersistence` 并调用 DeepSeek 接口，不依赖、不导入也不请求 `@dsh-plugins/usage`。

今日费用**优先取 DeepSeek 官方账单**（platform.deepseek.com 按 API Key 的实时费用接口），取不到时回退为本地 Token 估算。本地估算按 2026-04-24 公开 V4 CNY 单价汇总，未知模型不计价并显示 `+`；估算不是账户账单。余额与费用通过 Harness `ctx.credentials` 解析的 Key 调用，不会把 Key 暴露给浏览器。

默认把 UTC+8 的 00:30–08:30 标记为“空闲”，其余时间为“高峰”。此状态仅作流量调度提示，DeepSeek 当前为统一价格，没有分时优惠。

## 安装

### 系统要求

- 已安装 DeepSeek Harness，`dsh web` 可正常启动
- 从仓库安装需要 Node.js >= 22

### 一行安装

```bash
dsh plugin --profile web add "github:NasonZH/dsh-workspace#main"
```

装完**重启 `dsh web`** 生效。

### 验证与卸载

```bash
dsh web --dump-config | grep dsh-workspace   # 确认插件层已挂载
dsh plugin --profile web remove dsh-workspace # 卸载后重启 dsh web
```

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

**能从手机或其他设备访问吗？**

A: 默认只允许本机（回环地址）读取项目数据。非本机浏览器访问会返回 403；确有需要可设 `allowRemote: true`，并自行确保访问安全。

**空闲/高峰状态是省钱的吗？**

A: 不是。DeepSeek 当前为统一价格、没有分时优惠，该状态仅作流量调度提示。

## 已知限制

- 今日费用优先官方账单，取不到时回退本地估算；估算不是账户账单
- 项目 API 只读、默认仅回环地址可访问，不提供写操作
- 空闲/高峰仅作调度提示，不改变计费
- 依赖 `node-pty` 原生模块，平台构建失败时需按安装排障处理

## 许可证

MIT