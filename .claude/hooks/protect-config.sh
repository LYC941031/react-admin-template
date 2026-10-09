#!/usr/bin/env bash
# 保护 CLAUDE.md 与 .claude/** 不被 agent 修改
# 退出码：0 = 放行；2 = 阻断（stderr 反馈给 Claude）
set -euo pipefail

input=$(cat)
fp=$(printf '%s' "$input" | jq -r '.tool_input.file_path // empty')

case "$fp" in
  *CLAUDE.md*|*.claude/settings*.json*|*.claude/agents/*|*.claude/commands/*|*.claude/skills/*|*.claude/hooks/*)
    echo "Blocked: $fp 属于受保护配置，请让用户手动修改。" >&2
    exit 2
    ;;
esac

exit 0
