# 技术方案：AI 工具管理 (Feature 003)

## 1. 目标

提供一个后台管理页，用于维护企业内部的 AI 工具清单，支持新增、编辑、删除、状态切换和筛选查询，并保留工具备注信息。

## 2. 技术选型与理由

| 决策 | 选择 | 理由 |
|------|------|------|
| 数据模型 | TypeScript 接口 + mock 服务 | 与现有模板一致，开箱可用且便于后续对接真实 API |
| 列表呈现 | Ant Design Table + Tag + Form | 适用于 CRUD 管理后台，开发效率高 |
| 交互方式 | Modal 表单 + 过滤表单 | 和用户管理/公告管理保持一致的交互语言 |
| 数据来源 | services/aiTool.ts + mock/data.ts | 保持 UI 层不直接触碰数据，遵循项目架构边界 |

## 3. 目录结构

```
src/
├── mock/data.ts            # AI 工具初始数据
├── services/aiTool.ts      # fetch/create/update/delete mock 服务
├── pages/ai-tools/index.tsx # AI 工具管理页面
├── router/index.tsx        # 路由注册
├── layouts/BasicLayout.tsx # 侧边栏菜单
└── types/index.ts          # AI 工具类型定义
```

## 4. 数据模型 (TypeScript)

```ts
type AiToolCategory = 'chat' | 'coding' | 'image' | 'search'
type AiToolStatus = 'active' | 'disabled'

interface AiTool {
  id: number
  name: string
  category: AiToolCategory
  description: string
  note: string
  status: AiToolStatus
  createdAt: string
}
```

## 5. 关键设计决策 (ADR)

- **统一使用 mock async service**：UI 只调用 `fetchAiTools/createAiTool/updateAiTool/deleteAiTool`，后续切真实 API 时无需改页面代码。
- **备注字段保留为纯文本长文本**：满足管理后台录入要求，减少复杂度，保持和当前模板一致。
- **分类与状态视图分离**：分类筛选用于查找，状态用于快速判断启用/停用，便于管理。

## 6. 备选方案与拒绝理由

- **拒绝用单一表单页布局**：管理列表页更符合后台工作流，新增/编辑用弹窗更节省空间。
- **拒绝建立多维度关系模型**：AI 工具本身不依赖复杂关联，不需要额外实体表。
- **拒绝直接把备注做成富文本**：超出本模板需求，且增加依赖和渲染复杂度。

## 7. 风险与缓解

| 风险 | 缓解 |
|------|------|
| mock 数据重置 | 本模板设计即为演示，真实 API 接入后由服务层持久化 |
| 备注过长导致表格拥挤 | 采用表格 + `ellipsis` 样式，详情可在弹窗中查看 |
| 多个筛选条件组合 | 使用查询对象统一封装，便于后续扩展 |
