# React Admin Template

一个基于 **Spec-Driven Development（规格驱动开发）** 的后台管理系统模板。技术栈：**Vite + React 19 + TypeScript + Ant Design 5**。

它不仅是"一个能跑的后台系统"，更是一套完整的 **AI 需求落地工作流**：规格文档、Claude Code 配置、验证钩子一应俱全，开箱即用。

<div align="center">

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)
![Ant Design](https://img.shields.io/badge/Ant_Design-5-0170FE?logo=antdesign&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

</div>

---

## 目录

- [✨ 特性](#-特性)
- [🧱 技术栈](#-技术栈)
- [📁 目录结构](#-目录结构)
- [🚀 快速开始](#-快速开始)
- [🔐 登录凭据](#-登录凭据)
- [🧭 SDD 工作流](#-sdd-工作流)
- [🤖 Claude Code 配置](#-claude-code-配置)
- [🔌 接入真实后端](#-接入真实后端)
- [📜 可用脚本](#-可用脚本)
- [📄 许可证](#-许可证)

---

## ✨ 特性

- **SDD 规格驱动**：需求（`requirements.md`）→ 方案（`design.md`）→ 任务（`tasks.md`）全部版本化进 Git。
- **Claude Code 工作流**：内置 `/speckit.*` 命令、架构师/审查子 agent、写规格 skill、保护与验证 hook。
- **完整后台示例**：登录、仪表盘、用户 CRUD、角色管理、系统设置、404。
- **分层清晰**：`pages` → `services` → `mock`，UI 不直接触碰数据。
- **服务端状态管理**：TanStack Query 管理缓存与失效；zustand 管理登录态。
- **开箱即用**：内存 mock 数据，无需后端即可跑通全流程。

## 🧱 技术栈

| 类别 | 选型 |
|------|------|
| UI 框架 | React 19 |
| 语言 | TypeScript（strict） |
| 构建 | Vite 6 |
| 组件库 | Ant Design 5 + `@ant-design/icons` |
| 路由 | react-router-dom v7 |
| 服务端状态 | @tanstack/react-query v5 |
| 客户端状态 | zustand v5 |

## 📁 目录结构

```
react-admin-template/
├── CLAUDE.md                  # 项目宪法入口（Claude Code 上下文）
├── README.md
├── docs/
│   ├── constitution.md        # 项目宪章（技术栈/架构边界/编码规范）
│   └── specs/
│       └── feature-001-admin-system/
│           ├── requirements.md  # 需求规格（EARS 记法）
│           ├── design.md        # 技术方案（含 ADR）
│           └── tasks.md         # 有序任务清单（含 DoD）
├── .claude/
│   ├── settings.json          # hooks + permissions
│   ├── hooks/
│   │   ├── protect-config.sh  # 保护 CLAUDE.md / .claude/**
│   │   └── verify.sh          # 写文件后自动类型检查
│   ├── commands/              # /speckit.specify / .plan / .tasks
│   ├── agents/                # architect / code-reviewer
│   └── skills/write-spec/     # 写规格 skill
└── src/
    ├── main.tsx               # 入口（Provider 装配）
    ├── router/index.tsx       # 路由表 + RequireAuth 守卫
    ├── layouts/BasicLayout.tsx
    ├── pages/                 # login / dashboard / users / roles / settings / 404
    ├── services/              # 服务层（user / role）
    ├── store/auth.ts          # 登录态（zustand persist）
    ├── mock/data.ts           # 内存 mock 数据
    └── types/index.ts         # 共享类型
```

## 🚀 快速开始

### 环境要求

- Node.js ≥ 18（推荐 20+）
- npm ≥ 9

### 安装与启动

```bash
# 1. 克隆（或直接使用本目录）
git clone <your-repo-url> react-admin-template
cd react-admin-template

# 2. 安装依赖
npm install

# 3. 启动开发服务器（默认 http://localhost:5173）
npm run dev

# 4. 生产构建 + 预览
npm run build
npm run preview
```

## 🔐 登录凭据

当前为 **mock 登录**，任意非空账号密码均可通过：

| 字段 | 值 |
|------|-----|
| 用户名 | `admin`（或任意非空） |
| 密码 | 任意非空 |

- 用户名 `admin` 登录后显示为「管理员」，其余显示为用户名本身。
- 登录态经 zustand `persist` 存入 `localStorage`，刷新页面不丢。

## 🧭 SDD 工作流

本模板的核心价值是把「AI 写代码」变成「规格驱动」的结构化流程：

```
Specify（写规格）→ Plan（出方案）→ Tasks（拆任务）→ Implement（实现）→ Verify（验证）
```

### 三个规格文件（版本化进 Git）

| 文件 | 作用 | 记法 |
|------|------|------|
| `requirements.md` | 需求与验收标准 | **EARS**（`WHEN … THE SYSTEM SHALL …`） |
| `design.md` | 技术方案与决策 | ADR（含备选方案与拒绝理由） |
| `tasks.md` | 有序任务清单 | 每条带依赖 + **DoD**（完成定义） |

### 新增一个功能的标准流程

1. **Specify**：把想法写进 `requirements.md`（不写技术栈，只写"什么"与"为什么"）。
2. **Plan**：产出 `design.md`（技术选型必须与 `constitution.md` 一致）。
3. **Tasks**：拆成有序、可独立执行、带 DoD 的任务。
4. **Implement**：按 `tasks.md` 逐条实现，每完成一条对照 DoD 验证。
5. **Verify**：`npm run build` 通过 + 走通用户流程。

> **为什么不用"直接让 AI 写"？** 纯聊天式开发有三大失败模式：设计决策碎片化、prompt 漂移、隐藏假设。SDD 把"未知"显性化——需求、方案、任务都成为可评审、可回滚的 Git 制品。

## 🤖 Claude Code 配置

如果你使用 [Claude Code](https://claude.com/claude-code)，本模板已内置一套开箱即用的工作流配置：

### 自定义命令（`.claude/commands/`）

| 命令 | 作用 |
|------|------|
| `/speckit.specify <想法>` | 生成 `requirements.md` |
| `/speckit.plan [spec路径]` | 生成 `design.md` |
| `/speckit.tasks [plan路径]` | 生成 `tasks.md` |

### 子 agent（`.claude/agents/`）

- `architect`：架构设计与评审（Opus，只产出设计不改代码）。
- `code-reviewer`：代码质量与正确性审查（按 P0/P1/P2 分级）。

### Skill（`.claude/skills/`）

- `write-spec`：说"写需求 / 出规格 / spec 这个功能"时自动触发。

### Hooks（`.claude/settings.json`）

- **保护**：禁止 agent 修改 `CLAUDE.md`、`.claude/**`（`protect-config.sh`）。
- **验证门**：写文件后自动跑 `npm run type-check`（`verify.sh`）。

### 权限（`.claude/settings.json`）

- 允许：只读命令与 `npm run dev/build/type-check`。
- 拦截：`git push`、`rm -rf`、读取 `.env*`。

> **Windows 用户**：hook 脚本为 `.sh`，需要 Git Bash 环境；若你的 Claude Code 用 cmd/PowerShell 执行 hook，请把脚本换成等价的 `.cmd`/`.ps1`。

> **自检命令**：`/doctor`、`/config`、`/agents`、`/hooks`。

## 🔌 接入真实后端

当前 `src/services/` 返回内存 mock（`src/mock/data.ts`），异步形态与真实 API 一致。切换步骤：

1. 安装 HTTP 客户端：

   ```bash
   npm install axios
   ```

2. 新建 `src/services/http.ts`：

   ```ts
   import axios from 'axios'

   export const http = axios.create({
     baseURL: import.meta.env.VITE_API_BASE_URL,
     timeout: 10000,
   })
   ```

3. 改写 `src/services/user.ts`，例如：

   ```ts
   import { http } from './http'
   import type { PageParams, PageResult, User, UserRole } from '../types'

   export interface UserQuery extends PageParams {
     keyword?: string
     role?: UserRole
   }

   export async function fetchUsers(query: UserQuery): Promise<PageResult<User>> {
     const { data } = await http.get('/users', { params: query })
     return data
   }

   export async function createUser(payload: Omit<User, 'id' | 'createdAt'>): Promise<User> {
     const { data } = await http.post('/users', payload)
     return data
   }
   ```

4. 在 `.env` 中配置 `VITE_API_BASE_URL`（记得 `.env` 已在 `.gitignore` 与 permissions.deny 中保护）。

> 页面层代码**零改动**——因为页面只依赖 `services/*` 的函数签名。

## 📜 可用脚本

| 脚本 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 类型检查 + 生产构建 |
| `npm run preview` | 预览生产构建 |
| `npm run type-check` | 仅 TypeScript 类型检查 |

## 📄 许可证

[MIT](./LICENSE) © 2026 React Admin Template Contributors

---

## 🙏 参考

- [Spec-Driven Development with AI（设计思路）](https://devops.com/githubs-spec-kit-puts-the-spec-back-in-software-development/)
- [GitHub Spec Kit（/speckit 命令范式）](https://github.com/github/spec-kit)
- [Claude Code 文档](https://code.claude.com/docs)
