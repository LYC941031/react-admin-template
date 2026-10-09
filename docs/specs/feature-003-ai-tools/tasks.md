# 任务清单：AI 工具管理 (Feature 003)

> 顺序执行，前一条完成（含 DoD 验证）后才能开始下一条。

- [ ] **T1 类型与 mock 数据**
  - 依赖：无
  - 内容：在 `src/types/index.ts` 中补充 `AiTool`、`AiToolCategory`、`AiToolStatus`；在 `src/mock/data.ts` 增加初始工具数据
  - DoD：`npm run type-check` 通过，数据结构可被服务调用

- [ ] **T2 服务层**
  - 依赖：T1
  - 内容：新增 `src/services/aiTool.ts`，实现 `fetchAiTools` / `createAiTool` / `updateAiTool` / `deleteAiTool`
  - DoD：调用服务返回 `Promise`，数据支持筛选与分页

- [ ] **T3 页面与路由**
  - 依赖：T2
  - 内容：新增 `src/pages/ai-tools/index.tsx`，并在 `src/router/index.tsx` / `src/layouts/BasicLayout.tsx` 注册菜单和路由
  - DoD：登录后可访问 `/ai-tools` 页面，菜单项正确显示

- [ ] **T4 验证与回归**
  - 依赖：T3
  - 内容：运行 `npm run build` 验证项目无类型和编译错误
  - DoD：构建成功，模块新增功能可正常展示与操作
