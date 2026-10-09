# 任务清单：公告管理 (Feature 002)

> 顺序执行，前一条完成（含 DoD 验证）后才能开始下一条。

- [x] **T1 类型与 mock 数据**
  - 依赖：无
  - 内容：`src/types/index.ts` 新增 `NoticeStatus`/`Notice`；`src/mock/data.ts` 新增 `notices` 演示数据
  - DoD：`npm run type-check` 通过

- [x] **T2 服务层**
  - 依赖：T1
  - 内容：`src/services/notice.ts` 实现 `fetchNotices`（含置顶优先排序）/ `createNotice` / `updateNotice` / `deleteNotice`
  - DoD：函数返回 Promise，筛选/排序/分页逻辑正确

- [x] **T3 页面与路由**
  - 依赖：T2
  - 内容：`src/pages/notices/index.tsx`；`src/router/index.tsx` 加 `/notices`；`src/layouts/BasicLayout.tsx` 加菜单
  - DoD：登录后侧边栏能进「公告管理」，列表正常展示

- [x] **T4 验证**
  - 依赖：T3
  - 内容：`npm run build`；手动走通新建/编辑/置顶/上下架/删除
  - DoD：构建无错误，完整操作流程可用
