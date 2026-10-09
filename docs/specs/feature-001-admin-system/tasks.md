# 任务清单：后台管理系统 (Feature 001)

> 顺序执行，前一条完成（含 DoD 验证）后才能开始下一条。每条任务自包含，无需追问即可执行。

- [x] **T1 项目脚手架**
  - 依赖：无
  - 内容：`package.json` / `tsconfig.json` / `vite.config.ts` / `index.html` / `.gitignore`
  - DoD：`npm install` 成功，`npm run dev` 能启动空白页

- [x] **T2 类型与 mock 数据层**
  - 依赖：T1
  - 内容：`src/types/index.ts` 定义 `User`/`RoleItem`/`PageResult`，`src/mock/data.ts` 生成演示数据
  - DoD：`npm run type-check` 通过，无 `any`

- [x] **T3 服务层与登录态**
  - 依赖：T2
  - 内容：`src/services/user.ts`、`src/services/role.ts`（async mock），`src/store/auth.ts`（zustand persist）
  - DoD：服务层函数可被调用并返回 Promise；登录态可持久化

- [x] **T4 路由与布局**
  - 依赖：T3
  - 内容：`src/router/index.tsx`（含 RequireAuth 守卫）、`src/layouts/BasicLayout.tsx`（侧边栏/顶栏/内容区）、`src/main.tsx`、`src/App.tsx`
  - DoD：未登录访问 `/dashboard` 被重定向到 `/login`；登录后侧边栏可切换页面

- [x] **T5 页面实现**
  - 依赖：T4
  - 内容：登录、仪表盘、用户管理（CRUD + 搜索 + 分页）、角色管理、系统设置、404
  - DoD：走通「登录 → 用户增删改查 → 角色查看 → 设置」完整流程，404 正常

- [x] **T6 验证与文档**
  - 依赖：T5
  - 内容：`npm run build` 通过；README 说明用法
  - DoD：`npm run build` 无类型/编译错误，`npm run preview` 可访问
