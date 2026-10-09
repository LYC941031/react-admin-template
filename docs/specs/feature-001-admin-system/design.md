# 技术方案：后台管理系统 (Feature 001)

## 1. 目标

一个可运行的后台管理系统模板，含登录、仪表盘、用户管理（CRUD）、角色管理、系统设置、404，全部使用内存 mock 数据，开箱即用，并作为 SDD 工作流的演示载体。

## 2. 技术选型与理由

| 决策 | 选择 | 理由 |
|------|------|------|
| 框架 | React 19 | 最新稳定版，函数式 + hooks 生态成熟 |
| 构建 | Vite 6 | 启动/构建快，SPA 场景下无 SSR 负担 |
| UI | Ant Design 5 | 后台管理系统事实标准，表格/表单/弹窗齐全 |
| 路由 | react-router-dom v7 | `createBrowserRouter` 数据路由，支持路由守卫 |
| 服务端状态 | @tanstack/react-query | 缓存/失效/乐观更新，替代手写 loading/error 逻辑 |
| 客户端状态 | zustand | 极简 API，无 boilerplate，persist 中间件存登录态 |
| 数据 | 内存 mock + async 服务层 | 无后端也能跑通全流程，切真实 API 只需替换 services |

## 3. 目录结构

```
src/
├── main.tsx              # 入口：ConfigProvider + QueryClientProvider + App
├── App.tsx               # RouterProvider
├── router/index.tsx      # 路由表 + RequireAuth 守卫
├── layouts/BasicLayout.tsx  # 侧边栏 + 顶栏 + 内容区（Outlet）
├── pages/
│   ├── login/            # 登录
│   ├── dashboard/        # 仪表盘（统计卡片）
│   ├── users/            # 用户管理（CRUD 表格）
│   ├── roles/            # 角色管理（只读表格）
│   ├── settings/         # 系统设置（表单）
│   └── error/NotFound.tsx # 404
├── services/             # 服务层（user.ts / role.ts）
├── store/auth.ts         # 登录态（zustand + persist）
├── mock/data.ts          # 内存 mock 数据
└── types/index.ts        # 共享类型
```

## 4. 数据模型 (TypeScript)

```ts
type Role = 'admin' | 'editor' | 'viewer'

interface User {
  id: number
  name: string
  username: string
  email: string
  role: Role
  status: 'active' | 'disabled'
  createdAt: string
}

interface RoleItem {
  id: number
  name: string
  code: string
  description: string
  permissions: string[]
}

interface PageResult<T> { list: T[]; total: number }
interface PageParams { page: number; pageSize: number }
```

## 5. 关键设计决策 (ADR)

- **服务层用 async mock 而非 axios 直连**：模板无后端，用返回 `Promise` 的 `services/*` 模拟真实 API 的异步形态，切换真实后端时只需替换函数体，页面层零改动。
- **登录态用 zustand persist**：token 与用户信息存 `localStorage`，刷新页面登录态不丢。
- **路由守卫 `RequireAuth`**：在 `createBrowserRouter` 的父路由层包裹 `BasicLayout`，无 token 时 `Navigate` 到 `/login`。
- **React 19 兼容**：引入 `@ant-design/v5-patch-for-react-19` 补丁，解决 antd v5 在 React 19 下的兼容问题。

## 6. 备选方案与拒绝理由

- **拒绝用 Context + useReducer 管全局状态**：跨组件频繁更新易引发整树重渲染，zustand 订阅式更新更精准。
- **拒绝用 axios + MSW**：增加依赖与配置复杂度，对本模板「开箱即用」目标而言收益低；mock 服务层已足够演示，且 README 给出 axios 切换路径。
- **拒绝用图表库**：首版避免引入 `@ant-design/charts` 等重依赖，仪表盘用 `Statistic` 卡片演示即可，后续按需加。

## 7. 风险与缓解

| 风险 | 缓解 |
|------|------|
| mock 数据刷新后重置 | 这是演示预期；真实后端接入后由 API 持久化 |
| antd v5 与 React 19 兼容 | 已引入官方 patch 包 |
| 静态 `message` 的 context 警告 | 不影响功能；后续可迁移到 `App.useApp()` |
