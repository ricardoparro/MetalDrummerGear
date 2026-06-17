#!/usr/bin/env bash
# Ralph drain-the-queue runner (Watcher + Ralph combined, GitHub Actions).
# Implements EVERY eligible open issue (any label, or none) — NOT just `ai-fix`.
# Skips only human-flagged (`human`, `human-founder`), non-actionable
# (`wontfix`/`invalid`/`duplicate`/`question`), pre-triage (`seo-proposal`),
# hold (`do-not-merge`/`hold`/`wip`/`blocked`) and in-flight
# (`in-progress`/`pr-opened`/`needs-human`) issues. Picks all the rest, oldest
# first, finishing only when none remain. One issue → one branch → one PR
# (Closes #N). No per-run issue-count limit.
#
# The only stop conditions are:
#   (a) no eligible issue remains, or
#   (b) the wall-clock guard (default 320 min) trips — GitHub hard-kills jobs at
#       6h, so we exit cleanly before that and the next scheduled run resumes.
#
# Env: REPO, GH_TOKEN, CLAUDE_CODE_OAUTH_TOKEN (subscription auth — set instead of
#      ANTHROPIC_API_KEY to bill the Pro/Max plan, not the API).
#      Optional: WALL_CAP_MIN, PER_ISSUE_TIMEOUT, RALPH_WORKER_OFFSET (distinct
#      per worker when run as a parallel fleet — see .github/workflows/ralph-night-fleet.yml).
# Safe to run as N concurrent workers: each claims a different issue (offset +
# `in-progress` label + pre-PR dup guard), so the fleet parallelises the drain.
set -uo pipefail

REPO="${REPO:?REPO required}"
START=$(date +%s)
WALL_CAP=$(( ${WALL_CAP_MIN:-320} * 60 ))
PER_ISSUE_TIMEOUT="${PER_ISSUE_TIMEOUT:-1500}"   # 25 min per issue
# Parallel-fleet support: each concurrent worker passes a distinct offset so they
# claim DIFFERENT issues from the same eligible list, avoiding simultaneous
# double-picks. Workers still coordinate via the `in-progress` label + the
# pre-PR dup guard below. Single-worker runs leave this at 0 (no behaviour change).
RALPH_WORKER_OFFSET="${RALPH_WORKER_OFFSET:-0}"
RUNS_DIR=".agents/ralph-runs"
mkdir -p "$RUNS_DIR"

declare -a DONE_PR=() DONE_HUMAN=() DONE_NOOP=() DONE_ERR=()
elapsed() { echo $(( $(date +%s) - START )); }
log() { echo "[$(date -u +%H:%M:%S)] $*"; }

# A branch (anywhere on origin) whose name contains the issue number as a token
branch_exists_for() {
  git ls-remote --heads origin 2>/dev/null | awk '{print $2}' \
    | grep -qE "(^|[^0-9])$1([^0-9]|$)"
}
# An open PR references the issue in its title/body
open_pr_for() {
  [ -n "$(gh pr list --repo "$REPO" --state open --search "$1 in:title,body" --json number --jq '.[0].number // ""' 2>/dev/null)" ]
}

# Self-heal: clear `in-progress` orphaned by a previously killed run
# (issue has in-progress but no open PR and no branch → reclaim it).
reclaim_orphans() {
  local n
  for n in $(gh issue list --repo "$REPO" --state open --limit 300 \
              --json number,labels \
              --jq '[.[]|select([.labels[].name]|index("in-progress"))]|.[].number' 2>/dev/null); do
    if ! open_pr_for "$n" && ! branch_exists_for "$n"; then
      log "Reclaiming orphaned in-progress on #$n"
      gh issue edit "$n" --repo "$REPO" --remove-label in-progress >/dev/null 2>&1 || true
    fi
  done
}

# Oldest open issue (any label, or none) that is eligible and truly unworked.
# Hard-skip if it carries any blocking/human/non-actionable/in-flight label.
# `seo-proposal` is a SOFT skip — excluded only while awaiting CEO triage; once
# the CEO promotes it (adds `ai-fix`), it becomes eligible even if the
# seo-proposal label lingers.
next_issue() {
  local n; local -a claimable=()
  for n in $(gh issue list --repo "$REPO" --state open --limit 300 \
      --json number,labels \
      --jq '[.[] | select(
              (([.labels[].name] - ["human","human-founder","needs-human","in-progress","pr-opened","wontfix","invalid","duplicate","question","do-not-merge","hold","wip","blocked"]) == [.labels[].name])
              and (([.labels[].name] | index("seo-proposal") | not) or ([.labels[].name] | index("ai-fix")))
            )] | sort_by(.number) | .[].number' 2>/dev/null); do
    open_pr_for "$n" && continue
    branch_exists_for "$n" && continue
    claimable+=("$n")
    # Collect a few past our offset, then stop — no need to probe the whole queue.
    (( ${#claimable[@]} > RALPH_WORKER_OFFSET + 1 )) && break
  done
  (( ${#claimable[@]} == 0 )) && return 1
  # This worker takes the issue at its offset; if fewer remain than the offset
  # (tail of the queue), fall back to the oldest claimable so no worker idles.
  local idx=$RALPH_WORKER_OFFSET
  (( idx >= ${#claimable[@]} )) && idx=0
  echo "${claimable[$idx]}"; return 0
}

implement_issue() {
  local n="$1"
  gh issue edit "$n" --repo "$REPO" --add-label in-progress >/dev/null 2>&1 || true

  git checkout -q main 2>/dev/null || git checkout -qB main origin/main
  git fetch -q origin main && git reset -q --hard origin/main
  local br="ralph/issue-$n-$(date -u +%Y%m%d%H%M%S)"
  git checkout -qb "$br"

  gh issue view "$n" --repo "$REPO" --json title,body > "$RUNS_DIR/issue-$n.json"
  local title body
  title=$(jq -r .title "$RUNS_DIR/issue-$n.json")
  body=$(jq -r .body "$RUNS_DIR/issue-$n.json")

  {
    echo "# Task"; echo
    echo "Fix GitHub issue #${n}: ${title}"; echo
    echo "$body"; echo
    echo "---"; echo
    cat .ralph/AGENT.md
    echo; echo "---"; echo
    echo "## Instructions"; echo
    echo "1. Read the issue carefully. If it specifies files/templates, follow them field-for-field."
    echo "2. Make minimal, focused changes. Do NOT refactor unrelated code."
    echo "3. Validate: \`node --check\` any .js/.cjs you touched; run available tests."
    echo "4. Any external resource you embed (e.g. a YouTube id) MUST be real and verified —"
    echo "   never fabricate ids/links. Verify YouTube ids resolve (oEmbed 200) before using."
    echo "5. Commit with: \"fix: #${n} <one-line summary>\". Do NOT push or open a PR — the runner does that."
    echo "6. If blocked on a human decision or a guardrail, output one line: NEEDS_HUMAN: <reason> and stop."
    echo; echo "Output a 5-line summary when done: problem, files changed, fix, validation, follow-ups."
  } > "/tmp/ralph-$n.md"

  log "Running Ralph on #$n ($title)"
  timeout "${PER_ISSUE_TIMEOUT}s" claude --print --dangerously-skip-permissions \
    < "/tmp/ralph-$n.md" > "$RUNS_DIR/issue-$n.log" 2>&1
  local rc=$?
  [ "$rc" = "124" ] && log "#$n timed out after ${PER_ISSUE_TIMEOUT}s"

  if grep -q '^NEEDS_HUMAN:' "$RUNS_DIR/issue-$n.log"; then
    local reason; reason=$(grep '^NEEDS_HUMAN:' "$RUNS_DIR/issue-$n.log" | head -1 | sed 's/^NEEDS_HUMAN: *//')
    gh issue comment "$n" --repo "$REPO" --body "🤖 Ralph stopped: ${reason}" >/dev/null 2>&1 || true
    gh issue edit "$n" --repo "$REPO" --remove-label in-progress --add-label needs-human >/dev/null 2>&1 || true
    DONE_HUMAN+=("$n"); return
  fi

  if [ -z "$(git log origin/main..HEAD --oneline 2>/dev/null)" ]; then
    gh issue comment "$n" --repo "$REPO" --body "🤖 Ralph produced no commits this run (rc=$rc). Retrying next pass." >/dev/null 2>&1 || true
    gh issue edit "$n" --repo "$REPO" --remove-label in-progress >/dev/null 2>&1 || true
    DONE_NOOP+=("$n"); return
  fi

  # Parallel-fleet dup guard: another worker may have opened a PR for this issue
  # between our claim and now. If so, discard our work rather than open a 2nd PR.
  if open_pr_for "$n"; then
    log "#$n already has a PR (raced by another worker) — discarding our branch"
    gh issue edit "$n" --repo "$REPO" --remove-label in-progress >/dev/null 2>&1 || true
    DONE_NOOP+=("$n"); return
  fi

  if git push -q origin "$br" && \
     gh pr create --repo "$REPO" --base main --head "$br" \
       --title "fix: #${n} ${title}" \
       --body "Closes #${n}"$'\n\n'"Implemented autonomously by Ralph (cloud). Run #${GITHUB_RUN_ID:-local}." >/dev/null 2>&1; then
    gh issue edit "$n" --repo "$REPO" --remove-label in-progress --add-label pr-opened >/dev/null 2>&1 || true
    DONE_PR+=("$n"); log "Opened PR for #$n"
  else
    gh issue edit "$n" --repo "$REPO" --remove-label in-progress >/dev/null 2>&1 || true
    DONE_ERR+=("$n"); log "push/PR failed for #$n"
  fi
}

reclaim_orphans

while :; do
  if (( $(elapsed) > WALL_CAP )); then
    log "Wall-clock guard (${WALL_CAP}s) hit — exiting cleanly; next run resumes the drain."
    break
  fi
  ISSUE=$(next_issue) || { log "No eligible issues remain — queue drained."; break; }
  implement_issue "$ISSUE"
done

{
  echo "## 🤖 Ralph drain"
  echo "- Wall time: $(elapsed)s"
  echo "- PRs opened (${#DONE_PR[@]}): ${DONE_PR[*]:-none}"
  echo "- Handed to human (${#DONE_HUMAN[@]}): ${DONE_HUMAN[*]:-none}"
  echo "- No-op/retry (${#DONE_NOOP[@]}): ${DONE_NOOP[*]:-none}"
  echo "- Push/PR errors (${#DONE_ERR[@]}): ${DONE_ERR[*]:-none}"
} | tee -a "${GITHUB_STEP_SUMMARY:-/dev/stdout}"
