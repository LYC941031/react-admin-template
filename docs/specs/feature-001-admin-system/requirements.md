# 需求规格：后台管理系统 (Feature 001)

> 用 EARS 记法书写。每条验收标准必须可测试、不含实现细节（不写技术栈、不写组件名）。

## 1. 用户场景 (User Scenarios)

- 作为系统用户，我希望登录后进入仪表盘，以便总览关键指标。
- 作为管理员，我希望对用户进行增删改查，以便维护账号。
- 作为访客（只读角色），我希望查看角色列表，以便了解权限划分。
- 作为系统用户，我希望在系统设置里修改站点配置，以便定制系统。

## 2. 功能需求 (Functional Requirements, EARS)

### 登录 (Login)
- WHEN 用户输入任意非空用户名与密码并提交，THE SYSTEM SHALL 校验通过并跳转到 `/dashboard`。
- WHILE 未登录（无 token），THE SYSTEM SHALL 将访问受保护页面的请求重定向到 `/login`。
- WHEN 用户点击「退出登录」，THE SYSTEM SHALL 清除登录态并回到 `/login`。

### 仪表盘 (Dashboard)
- WHEN 用户进入仪表盘，THE SYSTEM SHALL 展示「用户总数 / 角色数 / 本月新增 / 待办事项」四个统计卡片。
- THE SYSTEM SHALL 在仪表盘展示一段欢迎与模板说明文案。

### 用户管理 (User Management)
- WHEN 用户进入用户管理页，THE SYSTEM SHALL 以分页表格展示用户列表（姓名、用户名、邮箱、角色、状态、创建时间）。
- WHEN 用户在搜索框输入关键词并查询，THE SYSTEM SHALL 按姓名或用户名模糊过滤列表。
- WHEN 用户选择角色进行筛选，THE SYSTEM SHALL 仅展示该角色的用户。
- WHEN 用户点击「新建用户」并提交合法表单，THE SYSTEM SHALL 新增一条用户记录并刷新列表。
- WHEN 用户点击「编辑」并提交修改，THE SYSTEM SHALL 更新该用户记录。
- WHEN 用户点击「删除」并确认，THE SYSTEM SHALL 删除该用户记录。
- IF 表单中姓名/用户名/邮箱为空或邮箱格式非法，THEN THE SYSTEM SHALL 阻止提交并提示错误。

### 角色管理 (Role Management)
- WHEN 用户进入角色管理页，THE SYSTEM SHALL 展示角色列表（名称、编码、描述、权限标签）。

### 系统设置 (Settings)
- WHEN 用户修改站点名称并保存，THE SYSTEM SHALL 提示保存成功（示例，不持久化）。
- WHEN 用户切换「开放注册」开关，THE SYSTEM SHALL 反映该开关状态。

### 404
- WHEN 用户访问不存在的路由，THE SYSTEM SHALL 展示 404 页面并提供「返回首页」入口。

## 3. 关键实体 (Key Entities)

- `User`：id、name、username、email、role（admin/editor/viewer）、status（active/disabled）、createdAt。
- `Role`：id、name、code、description、permissions（字符串数组）。

## 4. 非目标 / 边界

- 不含真实后端与数据库（当前为内存 mock）。
- 不含真实鉴权（token 为 mock 生成）。
- 不含角色权限的细粒度按钮级控制（仅演示角色字段展示）。

## 5. 待澄清问题

1. 用户删除是否需要软删除（保留记录）？
2. 权限控制是否需要在路由/按钮层面落地，还是仅展示？
3. 是否需要在仪表盘接入图表（如折线图/柱状图）？
