# 需求规格：AI 工具管理 (Feature 003)

> EARS 记法。每条验收标准可测试、不含实现细节（不写技术栈、不写组件名）。

## 1. 用户场景 (User Scenarios)

- 作为管理员，我希望管理公司可用的 AI 工具，以便统一维护工具清单。
- 作为管理员，我希望新增 AI 工具并填写备注，以便后续使用者了解工具用途和限制。
- 作为管理员，我希望筛选和查看不同类别的 AI 工具，以便快速定位目标工具。

## 2. 功能需求 (Functional Requirements, EARS)

### 列表展示
- THE SYSTEM SHALL 以表格展示 AI 工具列表，包含名称、类别、状态、描述、备注、创建时间。
- WHEN 工具状态为「停用」时，THE SYSTEM SHALL 在列表中以不同样式标识该工具。
- WHEN 用户输入关键词并执行查询时，THE SYSTEM SHALL 根据名称/描述/备注过滤结果。

### 新建
- WHEN 管理员点击「新增工具」并提交合法表单，THE SYSTEM SHALL 创建一条新的 AI 工具记录。
- IF 工具名称、类别或备注为空时，THEN THE SYSTEM SHALL 提示错误且不创建记录。
- WHEN 新增成功时，THE SYSTEM SHALL 在列表中立即展示新工具。

### 编辑
- WHEN 管理员点击「编辑」并保存修改，THE SYSTEM SHALL 更新该工具的名称、类别、描述、备注和状态。
- IF 用户提交了无效内容，THEN THE SYSTEM SHALL 拒绝保存并给出提示。

### 删除
- WHEN 管理员点击「删除」并确认，THE SYSTEM SHALL 删除该工具记录。

### 状态管理
- WHEN 管理员切换工具状态为「启用」或「停用」，THE SYSTEM SHALL 更新该工具的状态。

## 3. 关键实体 (Key Entities)

- `AiTool`：id、name、category、description、note、status、createdAt。

## 4. 非目标 / 边界 (Out of Scope)

- 不做 AI 工具的实际接入或调用能力。
- 不做权限分级与按角色展示不同工具。
- 不做富文本备注编辑器，首版使用纯文本长文本框。
- 不做历史版本回收站或软删除。

## 5. 已澄清决策 (Clarified Decisions)

1. **工具分类如何定义？** —— 使用通用分类：对话、编程、图像、搜索。
2. **备注是否必须填写？** —— 必填，用于记录用途、使用场景或限制说明。
3. **删除方式？** —— 直接物理删除，不进入回收站。
