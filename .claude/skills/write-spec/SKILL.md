---
name: write-spec
description: 撰写需求规格(spec)。当用户说"写需求""出规格""spec 这个功能""把这个想法变成 spec"时使用。产出可测试的验收标准，不含实现细节。
allowed-tools: Read, Grep, Glob, Write
---

# 写需求规格

## 何时用
用户提出一个新功能/想法，需要先固化为规格再进入设计。

## 步骤
1. 查 `docs/specs/` 下最大编号，新规格用「下一个编号」。
2. 建 `docs/specs/###-<slug>/requirements.md`。
3. 必含：
   - 用户场景（User Scenarios）
   - 功能需求（EARS 记法：`WHEN … THE SYSTEM SHALL …`，可测试、无技术栈词）
   - 关键实体（Key Entities）
   - 待澄清问题（≥3 个）
4. 结尾列待澄清问题，不要自行假设。

## 反例（不要做）
- 不要在 spec 里选框架/库/组件名。
- 不要写 task 粒度。
