---
description: 把一个功能想法转成结构化需求规格（SDD Specify 阶段）
argument-hint: [功能想法或 issue 描述]
allowed-tools: Read, Grep, Glob, Write
---

你正在执行 SDD 的 **Specify** 阶段。基于用户输入产出一份需求规格，落盘为版本化文件。

输入：$ARGUMENTS

## 步骤
1. 用 Glob 检查 `docs/specs/` 下已有哪些编号，新规格使用「下一个编号」。
2. 用 Read 通读 `docs/constitution.md`，确保规格不与技术约束冲突（但规格本身不写技术栈）。
3. 生成 `docs/specs/###-<slug>/requirements.md`，包含：
   - 用户场景（User Scenarios）
   - 功能需求（用 EARS 记法：`WHEN … THE SYSTEM SHALL …`，每条可测试、不含实现细节）
   - 关键实体（Key Entities）
   - 非目标/边界（Out of Scope）
   - 待澄清问题（至少 3 个，不要自行假设）
4. 输出完成后，把 3 个待澄清问题列给用户，等确认后再进入下一阶段。

## 禁止
- 不要在规格里选框架/库/组件名。
- 不要写 task 粒度（那是 `/speckit.tasks` 的事）。
