#!/bin/bash
# Roadie dev loop - autonomous coding agent
# Usage: ./roadie.sh "task description"

set -e
cd "$(dirname "$0")"

TASK="${1:-$(cat .roadie/fix_plan.md 2>/dev/null || echo 'No task specified')}"

# Update PROMPT.md with task
sed "s|{{TASK_DESCRIPTION}}|$TASK|g" .roadie/PROMPT.md > /tmp/roadie-prompt.md

echo "🤖 Roadie starting task: $TASK"
echo "---"

# Run Claude in print mode (non-interactive)
cat /tmp/roadie-prompt.md | claude --print --dangerously-skip-permissions

echo "---"
echo "✅ Roadie completed"
