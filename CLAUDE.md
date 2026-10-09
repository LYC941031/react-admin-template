# Project Constitution — 入口

本文件是 Claude Code 的项目级上下文入口。完整规范见 `docs/constitution.md`。

## 技术栈（不可擅自变更）
- React 19 + TypeScript（strict 模式）+ Vite
- UI：Ant Design 5（`@ant-design/icons`）
- 路由：react-router-dom v7
- 状态：zustand（客户端全局状态）+ @tanstack/react-query（服务端状态）
- 包管理：npm

## 常用命令
- 启动：`npm run dev`
- 构建：`npm run build`（先 `tsc --noEmit` 类型检查，再 `vite build`）
- 类型检查：`npm run type-check`

## 架构边界（不可违背）
- UI 组件不得直接操作数据，必须经由 `src/services/*` 服务层
- 全局状态（如登录态）只通过 `src/store/*` 的 action 修改
- 服务端数据一律用 TanStack Query 的 `useQuery` / `useMutation` 获取与变更
- 共享类型集中在 `src/types/index.ts`

## 编码规范（不可违背）
- 所有类型显式声明，禁止 `any`（除非有注释说明）
- 组件用函数式 + 具名导出；禁止 default export 之外的匿名组件滥用
- 命名：组件 PascalCase，工具函数 camelCase，类型名 PascalCase

## SDD 工作流
新功能/新需求先走规格流程，不要直接写代码：
1. `/speckit.specify` → 生成 `docs/specs/###-<slug>/requirements.md`
2. `/speckit.plan` → 生成 `design.md`
3. `/speckit.tasks` → 生成 `tasks.md`
4. 按 `tasks.md` 逐条实现，每完成一条对照「DoD」验证

## 禁区
- 不要修改 `CLAUDE.md`、`.claude/**`（由保护 hook 强制，见 `.claude/hooks/protect-config.sh`）
- 不要在 `specs/` 之外新增未在 `requirements.md` 声明的功能
- 不要直接 `git push`（见 `.claude/settings.json` 的 permissions.deny）

@docs/constitution.md
