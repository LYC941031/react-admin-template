# 项目宪章 (Constitution)

> 本文件是项目的「不可违背原则」。所有 AI 命令（`/speckit.*`）与子 agent 都以本文件为最高约束。
> 修改本文件属于架构决策，需经团队评审后提交。

## 1. 技术栈（锁定）

| 类别 | 选型 | 说明 |
|------|------|------|
| 语言 | TypeScript（strict） | 禁止 `any`，除非注释说明 |
| UI 框架 | React 19 | 函数式组件 + hooks |
| 构建 | Vite 6 | 默认 dev server 端口 5173 |
| 组件库 | Ant Design 5 | 搭配 `@ant-design/icons`，React 19 兼容补丁已引入 |
| 路由 | react-router-dom v7 | 使用 `createBrowserRouter` 数据路由 |
| 客户端状态 | zustand v5 | 仅用于登录态等客户端全局状态 |
| 服务端状态 | @tanstack/react-query v5 | 所有服务端数据读写必须经过它 |

## 2. 架构边界（不可违背）

- **分层**：`pages`（页面）→ `services`（服务层）→ `mock`/后端。UI 组件不得直接 import mock 数据或发请求。
- **状态归属**：跨页面的全局状态进 `store/`；单个页面的局部状态用组件内 `useState`；服务端数据一律进 TanStack Query 缓存。
- **类型**：共享类型集中在 `src/types/index.ts`，业务模块不得各自散落类型定义。
- **路由守卫**：受保护页面必须经过 `RequireAuth` 校验 token。

## 3. 编码规范（不可违背）

- 组件：函数式 + 具名导出（`export default function XxxPage()`）。
- 命名：组件 `PascalCase`；函数/变量 `camelCase`；常量 `UPPER_SNAKE_CASE`；类型 `PascalCase`。
- 样式：优先 antd 组件与 `Space`/`Flex` 布局；少量覆盖用行内 style 或 `src/styles/global.css`，不引入额外 CSS 方案。
- 副作用：数据获取用 `useQuery`，变更用 `useMutation` 并在成功后 `invalidateQueries`。

## 4. 非目标（明确不做）

- 不做真实后端接入（当前用内存 mock，见 `src/mock/`），真实 API 切换方式见 README。
- 不做国际化（i18n）、微前端、monorepo。
- 不做 SSR/SEO（这是认证后的 SPA，无 SEO 需求）。
- 首版不做多人实时协同。

## 5. SDD 流程约定

- 新功能必须先在 `docs/specs/###-<slug>/` 下产出 `requirements.md` → `design.md` → `tasks.md`，再开始编码。
- 规格与代码在同一 PR 提交，保证「改需求」与「改代码」被 Git 绑定。
- 需求用 EARS 记法（`WHEN … THE SYSTEM SHALL …`）书写，验收标准必须可测试。
