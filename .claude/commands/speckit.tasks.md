---
description: 把技术方案拆成可执行、有依赖顺序的任务清单（SDD Tasks 阶段）
argument-hint: [plan 路径，可留空自动取最新]
allowed-tools: Read, Glob, Write
---

你正在执行 SDD 的 **Tasks** 阶段。读取技术方案，产出有序任务清单，落盘为版本化文件。

输入：$ARGUMENTS

## 步骤
1. 定位方案：`$ARGUMENTS` 若为空，则用 Glob 取 `docs/specs/` 下编号最大的 `design.md`。
2. 在对应规格目录生成 `tasks.md`，每条任务：
   - 一个复选框 `- [ ]`，一个编号 T1/T2/…
   - 标注依赖（depends on）
   - 用一句话说清内容
   - 带「DoD（完成定义）」：可客观验证的验收标准
3. 按「基础设施 → 数据/类型 → 状态 → 逻辑 → UI → 页面 → 验证」排序。
4. 每条任务必须自包含到「另一个 agent 无需追问即可执行」。

## 禁止
- 不要过度拆分（一个阶段一条任务即可）。
- 不要把实现代码写进 tasks.md。
