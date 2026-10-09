# 技术方案：公告管理 (Feature 002)

## 1. 目标

在现有后台系统中新增「公告管理」页面，支持公告的列表展示、新建、编辑、置顶、上下架、删除，复用现有分层与 mock 数据模式。

## 2. 技术选型

完全复用 `docs/constitution.md` 已锁定的技术栈，不新增任何依赖：
- 数据获取：@tanstack/react-query（`useQuery` / `useMutation`）
- UI：Ant Design 5（`Table` / `Modal` / `Form` / `Switch` / `Popconfirm`）
- 数据：内存 mock + async 服务层（与 `user.ts` 同模式）

## 3. 数据模型

```ts
type NoticeStatus = 'published' | 'offline'

interface Notice {
  id: number
  title: string
  content: string
  status: NoticeStatus
  isPinned: boolean
  publishedAt: string  // YYYY-MM-DD
}
```

## 4. 关键设计决策 (ADR)

- **排序规则**：置顶优先，其次按 `publishedAt` 倒序——在服务层 `fetchNotices` 内完成，保证分页前顺序正确。
- **状态切换复用 `updateNotice`**：置顶/取消置顶/上下架都是对 `Notice` 的局部字段更新，统一走 `updateNotice(id, partial)`，不单独造函数。
- **上下架用 toggle**：操作按钮文案随状态切换（`下架` ↔ `上架`），逻辑上互斥。

## 5. 改动清单

| 文件 | 改动 |
|------|------|
| `src/types/index.ts` | 新增 `NoticeStatus` / `Notice` |
| `src/mock/data.ts` | 新增 `notices` 演示数据 |
| `src/services/notice.ts` | 新增（新建）`fetchNotices` / `createNotice` / `updateNotice` / `deleteNotice` |
| `src/pages/notices/index.tsx` | 新增（新建）公告管理页面 |
| `src/router/index.tsx` | 新增 `/notices` 路由 |
| `src/layouts/BasicLayout.tsx` | 侧边栏新增「公告管理」菜单 |
