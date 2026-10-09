#!/usr/bin/env bash
# 写文件后自动跑类型检查，作为最小验证门
# 退出码：0 = 通过；2 = 阻断（把错误反馈给 Claude 让其修复）
set -euo pipefail

cd "$CLAUDE_PROJECT_DIR"

if ! npm run type-check 2>&1; then
  echo "类型检查失败，请修复后再继续。" >&2
  exit 2
fi

exit 0
