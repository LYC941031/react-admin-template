# 需求规格：公告管理 (Feature 002)

> EARS 记法。每条验收标准可测试、不含实现细节（不写技术栈、不写组件名）。

## 1. 用户场景 (User Scenarios)

- 作为管理员，我希望发布公告，以便向用户传达通知。
- 作为管理员，我希望置顶重要公告，以便它们排在列表前面。
- 作为管理员，我希望下架过期公告，以便列表保持整洁。

## 2. 功能需求 (Functional Requirements, EARS)

### 列表展示
- THE SYSTEM SHALL 以分页表格展示公告列表，包含标题、状态、置顶标记、发布时间。
- WHILE 公告处于置顶状态，THE SYSTEM SHALL 在列表中排在最前。
- WHILE 公告处于「已下架」状态，THE SYSTEM SHALL 在列表中置灰显示。

### 新建
- WHEN 管理员点击「新建公告」并提交合法表单，THE SYSTEM SHALL 创建一条状态为「已发布」的公告。
- IF 标题或内容为空就提交，THEN THE SYSTEM SHALL 提示错误且不创建。

### 编辑
- WHEN 管理员点击「编辑」并提交修改，THE SYSTEM SHALL 更新该公告的标题/内容/置顶标记。

### 置顶
- WHEN 管理员点击「置顶」，THE SYSTEM SHALL 将该公告标记为置顶。
- WHEN 管理员点击「取消置顶」，THE SYSTEM SHALL 移除该公告的置顶标记。

### 上下架
- WHEN 管理员点击「下架」，THE SYSTEM SHALL 将该公告状态改为「已下架」。
- WHEN 管理员点击「上架」，THE SYSTEM SHALL 将该公告状态改为「已发布」。

### 删除
- WHEN 管理员点击「删除」并确认，THE SYSTEM SHALL 删除该公告。

### 筛选
- WHEN 用户选择状态筛选，THE SYSTEM SHALL 仅展示该状态的公告。
- WHEN 用户输入关键词并查询，THE SYSTEM SHALL 过滤出标题匹配的公告。

## 3. 关键实体 (Key Entities)

- `Notice`：id、title、content、status（published/offline）、isPinned、publishedAt。

## 4. 非目标 / 边界 (Out of Scope)

- 不做公告的定时发布。
- 不做用户端评论/点赞/阅读回执。
- 不做公告的富文本编辑器（首版用纯文本）。
- 不做物理删除之外的软删除回收站。

## 5. 已澄清决策 (Clarified Decisions)

> 原待澄清问题已确认如下，作为本规格的既定前提：

1. **下架后普通用户是否可见？** —— 本模板为管理后台，仅管理员可见全部公告（下架置灰）；用户端展示不在本次范围。
2. **置顶数量是否限制？** —— 不限制。
3. **删除方式？** —— 物理删除（直接移除，不进回收站）。
