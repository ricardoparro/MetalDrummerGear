#!/usr/bin/env bash
# Roadie drain-the-queue runner (Watcher + Roadie combined, GitHub Actions).
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
#      Optional: CLAUDE_CODE_OAUTH_TOKEN_2 — a SECOND subscription used as backup.
#      The preferred token is always tried first; on a usage/rate limit the run
#      fails over to the backup for the rest of the run (see run_claude below).
#      Optional: WALL_CAP_MIN, PER_ISSUE_TIMEOUT, ROADIE_WORKER_OFFSET (distinct
#      per worker when run as a parallel fleet — see .github/workflows/roadie-night-fleet.yml).
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
ROADIE_WORKER_OFFSET="${ROADIE_WORKER_OFFSET:-${RALPH_WORKER_OFFSET:-0}}"
RUNS_DIR=".agents/roadie-runs"
mkdir -p "$RUNS_DIR"

declare -a DONE_PR=() DONE_HUMAN=() DONE_NOOP=() DONE_ERR=()
# Issues attempted in THIS run — never re-pick one in the same run. Without this,
# an issue that produces no commit (e.g. Claude throttled/erroring) is the oldest
# eligible issue again on the next loop iteration, so the run busy-loops on it for
# the whole wall-clock window (observed: 430× on one issue, 0 PRs, GitHub API
# rate-limit exhausted by the per-iteration gh calls).
declare -A TRIED=()
# Circuit breaker: consecutive no-op/error iterations. A burst means something
# global is wrong (Claude subscription rate-limit, bad token) — bail fast instead
# of grinding the whole queue and burning the GitHub API quota.
CONSEC_FAIL=0
NOOP_CIRCUIT="${NOOP_CIRCUIT:-12}"
# Dual-subscription failover. Set CLAUDE_CODE_OAUTH_TOKEN (preferred) and,
# optionally, CLAUDE_CODE_OAUTH_TOKEN_2 (backup). Each run starts on the
# preferred token; the FIRST time it hits a usage/rate limit we switch to the
# backup for the rest of THIS run (PRIMARY_DEAD), so the preferred plan is always
# used first and we only spend the backup once the preferred is exhausted. When
# both are limited the circuit breaker above bails the run.
ROADIE_TOKEN_PRIMARY="${CLAUDE_CODE_OAUTH_TOKEN:-}"
ROADIE_TOKEN_BACKUP="${CLAUDE_CODE_OAUTH_TOKEN_2:-}"
PRIMARY_DEAD=0
elapsed() { echo $(( $(date +%s) - START )); }
log() { echo "[$(date -u +%H:%M:%S)] $*"; }

# True if the claude output log looks like a subscription usage / rate limit.
looks_rate_limited() {
  grep -qiE "usage limit|rate.?limit|limit reached|too many requests|\b429\b|quota|overloaded|insufficient" "$1" 2>/dev/null
}

# Run claude for one issue with preferred→backup failover.
#   $1 = prompt file, $2 = output log. Returns claude's exit code.
run_claude() {
  local prompt="$1" out="$2" tok t0 dt rc
  if (( PRIMARY_DEAD )) && [ -n "$ROADIE_TOKEN_BACKUP" ]; then
    tok="$ROADIE_TOKEN_BACKUP"
  else
    tok="$ROADIE_TOKEN_PRIMARY"
  fi
  t0=$(date +%s)
  CLAUDE_CODE_OAUTH_TOKEN="$tok" timeout "${PER_ISSUE_TIMEOUT}s" \
    claude --print --dangerously-skip-permissions < "$prompt" > "$out" 2>&1
  rc=$?
  dt=$(( $(date +%s) - t0 ))
  # Fail over to the backup once, retrying THIS issue, when the preferred token
  # is limited. Signal = an explicit limit message OR a non-zero exit that
  # returned almost instantly (a real implementation never finishes in <30s; a
  # ~7s non-zero exit is the throttle signature we observed).
  if (( ! PRIMARY_DEAD )) && [ -n "$ROADIE_TOKEN_BACKUP" ] && [ "$rc" -ne 0 ] \
     && { looks_rate_limited "$out" || (( dt < 30 )); }; then
    log "preferred Claude token looks limited (rc=$rc, ${dt}s) — failing over to backup token for the rest of this run"
    PRIMARY_DEAD=1
    t0=$(date +%s)
    CLAUDE_CODE_OAUTH_TOKEN="$ROADIE_TOKEN_BACKUP" timeout "${PER_ISSUE_TIMEOUT}s" \
      claude --print --dangerously-skip-permissions < "$prompt" > "$out" 2>&1
    rc=$?
  fi
  return $rc
}

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
    [ -n "${TRIED[$n]:-}" ] && continue   # already attempted this run — don't loop on it
    open_pr_for "$n" && continue
    branch_exists_for "$n" && continue
    claimable+=("$n")
    # Collect a few past our offset, then stop — no need to probe the whole queue.
    (( ${#claimable[@]} > ROADIE_WORKER_OFFSET + 1 )) && break
  done
  (( ${#claimable[@]} == 0 )) && return 1
  # This worker takes the issue at its offset; if fewer remain than the offset
  # (tail of the queue), fall back to the oldest claimable so no worker idles.
  local idx=$ROADIE_WORKER_OFFSET
  (( idx >= ${#claimable[@]} )) && idx=0
  echo "${claimable[$idx]}"; return 0
}

implement_issue() {
  local n="$1"
  TRIED[$n]=1   # record the attempt up-front so no outcome can cause a re-pick this run
  gh issue edit "$n" --repo "$REPO" --add-label in-progress >/dev/null 2>&1 || true

  git checkout -q main 2>/dev/null || git checkout -qB main origin/main
  git fetch -q origin main && git reset -q --hard origin/main
  local br="roadie/issue-$n-$(date -u +%Y%m%d%H%M%S)"
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
    cat .roadie/AGENT.md
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
  } > "/tmp/roadie-$n.md"

  log "Running Roadie on #$n ($title)"
  run_claude "/tmp/roadie-$n.md" "$RUNS_DIR/issue-$n.log"
  local rc=$?
  [ "$rc" = "124" ] && log "#$n timed out after ${PER_ISSUE_TIMEOUT}s"

  if grep -q '^NEEDS_HUMAN:' "$RUNS_DIR/issue-$n.log"; then
    local reason; reason=$(grep '^NEEDS_HUMAN:' "$RUNS_DIR/issue-$n.log" | head -1 | sed 's/^NEEDS_HUMAN: *//')
    gh issue comment "$n" --repo "$REPO" --body "🤖 Roadie stopped: ${reason}" >/dev/null 2>&1 || true
    gh issue edit "$n" --repo "$REPO" --remove-label in-progress --add-label needs-human >/dev/null 2>&1 || true
    DONE_HUMAN+=("$n"); return
  fi

  if [ -z "$(git log origin/main..HEAD --oneline 2>/dev/null)" ]; then
    # No commit produced. Do NOT comment on the issue — doing it every pass spammed
    # one issue with 2000+ comments and burned the GitHub API quota. Just log it;
    # the TRIED set stops us re-picking it this run, and the run summary records it.
    log "#$n produced no commits (rc=$rc) — skipping for this run"
    gh issue edit "$n" --repo "$REPO" --remove-label in-progress >/dev/null 2>&1 || true
    DONE_NOOP+=("$n"); CONSEC_FAIL=$((CONSEC_FAIL+1)); return
  fi

  # Parallel-fleet dup guard: another worker may have opened a PR for this issue
  # between our claim and now. If so, discard our work rather than open a 2nd PR.
  if open_pr_for "$n"; then
    log "#$n already has a PR (raced by another worker) — discarding our branch"
    gh issue edit "$n" --repo "$REPO" --remove-label in-progress >/dev/null 2>&1 || true
    DONE_NOOP+=("$n"); CONSEC_FAIL=0; return   # a race means the system is working, not stuck
  fi

  if git push -q origin "$br" && \
     gh pr create --repo "$REPO" --base main --head "$br" \
       --title "fix: #${n} ${title}" \
       --body "Closes #${n}"$'\n\n'"Implemented autonomously by Roadie (cloud). Run #${GITHUB_RUN_ID:-local}." >/dev/null 2>&1; then
    gh issue edit "$n" --repo "$REPO" --remove-label in-progress --add-label pr-opened >/dev/null 2>&1 || true
    DONE_PR+=("$n"); CONSEC_FAIL=0; log "Opened PR for #$n"
  else
    gh issue edit "$n" --repo "$REPO" --remove-label in-progress >/dev/null 2>&1 || true
    DONE_ERR+=("$n"); CONSEC_FAIL=$((CONSEC_FAIL+1)); log "push/PR failed for #$n"
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
  if (( CONSEC_FAIL >= NOOP_CIRCUIT )); then
    log "Circuit breaker: ${CONSEC_FAIL} consecutive no-ops/errors — likely Claude rate-limit or auth; bailing so we don't grind the queue or burn the GitHub API. Next run resumes."
    break
  fi
done

{
  echo "## 🤖 Roadie drain"
  echo "- Wall time: $(elapsed)s"
  echo "- PRs opened (${#DONE_PR[@]}): ${DONE_PR[*]:-none}"
  echo "- Handed to human (${#DONE_HUMAN[@]}): ${DONE_HUMAN[*]:-none}"
  echo "- No-op/retry (${#DONE_NOOP[@]}): ${DONE_NOOP[*]:-none}"
  echo "- Push/PR errors (${#DONE_ERR[@]}): ${DONE_ERR[*]:-none}"
} | tee -a "${GITHUB_STEP_SUMMARY:-/dev/stdout}"
