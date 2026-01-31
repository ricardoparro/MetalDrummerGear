#!/bin/bash
# Ralph dev loop - autonomous coding agent
# Usage: ./ralph.sh "task description"

set -e
cd "$(dirname "$0")"

TASK="${1:-$(cat .ralph/fix_plan.md 2>/dev/null || echo 'No task specified')}"

# Update PROMPT.md with task
sed "s|{{TASK_DESCRIPTION}}|$TASK|g" .ralph/PROMPT.md > /tmp/ralph-prompt.md

echo "🤖 Ralph starting task: $TASK"
echo "---"

# Run Claude in print mode (non-interactive)
cat /tmp/ralph-prompt.md | claude --print --dangerously-skip-permissions

echo "---"
echo "✅ Ralph completed"
