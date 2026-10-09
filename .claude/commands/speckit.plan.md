---
description: 基于需求规格生成技术实现方案（SDD Plan 阶段）
argument-hint: [spec 路径，可留空自动取最新]
allowed-tools: Read, Grep, Glob, Write
---

你正在执行 SDD 的 **Plan** 阶段。读取需求规格，产出技术方案，落盘为版本化文件。

输入：$ARGUMENTS

## 步骤
1. 定位规格：`$ARGUMENTS` 若为空，则用 Glob 取 `docs/specs/` 下编号最大的 `requirements.md`。
2. 通读根 `CLAUDE.md` 与 `docs/constitution.md`，技术选型必须与 Constitution 一致；有冲突必须显式标注风险。
3. 在对应规格目录生成 `design.md`，包含：
   - 目标
   - 技术选型与理由（表格）
   - 目录结构
   - 数据模型（TypeScript interface）
   - 关键设计决策（ADR）
   - 备选方案与拒绝理由
   - 风险与缓解
4. 结论先行，Markdown 输出。

## 禁止
- 不要把 task 粒度写进 plan（那是 `/speckit.tasks` 的事）。
- 不要偏离 Constitution 已锁定的技术栈。
