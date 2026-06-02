#!/bin/bash
# Generic agent runner — invokes any agent defined in .agents/<name>/PROMPT.md
# with --dangerously-skip-permissions so scheduled / cron / Actions runs do
# not stall waiting for human approval.
#
# Usage:
#   ./.agents/run-agent.sh ceo
#   ./.agents/run-agent.sh writer
#   ./.agents/run-agent.sh seo
#
# Optional second arg: a one-line task override appended after the prompt.
#   ./.agents/run-agent.sh ceo "Focus on TikTok engagement this run"
#
# Logs go to .agents/<name>/run.log (rotated when > 1 MB).

set -e
cd "$(dirname "$0")/.."

AGENT="${1:?usage: run-agent.sh <agent-name> [extra-task]}"
EXTRA="${2:-}"
PROMPT_FILE=".agents/$AGENT/PROMPT.md"
LOG_FILE=".agents/$AGENT/run.log"

if [ ! -f "$PROMPT_FILE" ]; then
  echo "Error: $PROMPT_FILE not found" >&2
  exit 1
fi

mkdir -p "$(dirname "$LOG_FILE")"
if [ -f "$LOG_FILE" ] && [ "$(stat -c%s "$LOG_FILE" 2>/dev/null || stat -f%z "$LOG_FILE")" -gt 1048576 ]; then
  mv "$LOG_FILE" "$LOG_FILE.old"
fi

# Pre-run: refresh metrics so the agent reads fresh GA4/GSC data
if [ "$AGENT" = "ceo" ] && [ -f ".agents/scripts/fetch-metrics.cjs" ]; then
  node .agents/scripts/fetch-metrics.cjs 2>&1 | tee -a "$LOG_FILE" || \
    echo "Warning: fetch-metrics failed (continuing with stale metrics.md)" | tee -a "$LOG_FILE"
fi

{
  echo "=== $(date -u +%FT%TZ) — agent=$AGENT ==="
  {
    cat "$PROMPT_FILE"
    if [ -n "$EXTRA" ]; then
      echo
      echo "## Extra task this run"
      echo "$EXTRA"
    fi
  } | claude --print --dangerously-skip-permissions
  echo "=== done $(date -u +%FT%TZ) ==="
} >> "$LOG_FILE" 2>&1

echo "Agent '$AGENT' finished. Log: $LOG_FILE"
