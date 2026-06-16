#!/usr/bin/env bash
# PR Merger — deterministic implementation of .agents/pr-merger/MERGER-AGENT.md
# Finds open PRs to main that are MERGEABLE + CLEAN and squash-merges them,
# draining the queue (oldest first) until none remain or the wall-time cap hits.
# No LLM: pure gh + jq gating. Respects branch protection (only merges CLEAN).
set -uo pipefail

REPO="${REPO:-ricardoparro/MetalDrummerGear}"
BASE="main"
BLOCKING_LABELS=("human-founder" "do-not-merge" "hold" "wip" "blocked")
WALL_CAP_SECS=$((45 * 60))   # whole-run cap
CI_POLL_SECS=10
CI_POLL_MAX=60               # 10 min per BEHIND PR
START=$(date +%s)

declare -A SKIP=()           # PR numbers we've decided to skip this run
declare -a MERGED=()
declare -a SKIPPED_LINES=()

log() { echo "[$(date -u +%H:%M:%S)] $*"; }
elapsed() { echo $(( $(date +%s) - START )); }

is_blocked_by_label() {
  local labels_json="$1" lbl
  for lbl in "${BLOCKING_LABELS[@]}"; do
    if echo "$labels_json" | jq -e --arg l "$lbl" 'any(.[]; .name == $l)' >/dev/null; then
      return 0
    fi
  done
  return 1
}

comment_conflict_once() {
  local n="$1"
  if ! gh pr view "$n" --repo "$REPO" --json comments \
        --jq '.comments[].body' 2>/dev/null | grep -q "<!-- pr-merger -->"; then
    gh pr comment "$n" --repo "$REPO" --body $'<!-- pr-merger -->\n🤖 Auto-merge skipped: this branch has conflicts with `main`. Please rebase/resolve, and I\'ll merge it on the next pass once CI is green.' || true
  fi
}

merge_pr() {
  local n="$1"
  if gh pr merge "$n" --repo "$REPO" --squash --delete-branch; then
    MERGED+=("#$n")
    log "MERGED #$n"
    return 0
  fi
  log "merge command failed for #$n"
  return 1
}

OPEN_AT_START=$(gh pr list --repo "$REPO" --state open --base "$BASE" --json number --jq 'length' 2>/dev/null || echo "?")

while :; do
  if (( $(elapsed) > WALL_CAP_SECS )); then
    log "Wall-time cap (${WALL_CAP_SECS}s) hit — stopping."
    break
  fi

  # Oldest-first list of open PRs to main
  LIST=$(gh pr list --repo "$REPO" --state open --base "$BASE" \
    --json number,title,isDraft,labels,mergeable,mergeStateStatus,createdAt \
    --jq 'sort_by(.createdAt)' 2>/dev/null || echo '[]')

  # Pick the oldest PR we haven't already skipped this run
  CAND=""
  while read -r n; do
    [[ -z "$n" ]] && continue
    [[ -n "${SKIP[$n]:-}" ]] && continue
    CAND="$n"; break
  done < <(echo "$LIST" | jq -r '.[].number')

  if [[ -z "$CAND" ]]; then
    log "No more actionable candidates."
    break
  fi

  # Re-check this PR's live state right before acting (strict mode invalidates stale reads)
  ST=$(gh pr view "$CAND" --repo "$REPO" --json number,title,isDraft,labels,mergeable,mergeStateStatus 2>/dev/null || echo '{}')
  TITLE=$(echo "$ST" | jq -r '.title // ""')
  IS_DRAFT=$(echo "$ST" | jq -r '.isDraft // false')
  MERGEABLE=$(echo "$ST" | jq -r '.mergeable // "UNKNOWN"')
  MSS=$(echo "$ST" | jq -r '.mergeStateStatus // "UNKNOWN"')
  LABELS=$(echo "$ST" | jq -c '.labels // []')

  # Ineligible → skip for the rest of this run
  if [[ "$IS_DRAFT" == "true" ]]; then
    SKIP[$CAND]=1; SKIPPED_LINES+=("#$CAND held (draft)"); continue
  fi
  if is_blocked_by_label "$LABELS"; then
    SKIP[$CAND]=1; SKIPPED_LINES+=("#$CAND held (blocking label)"); continue
  fi
  if [[ "$MERGEABLE" == "CONFLICTING" || "$MSS" == "DIRTY" ]]; then
    comment_conflict_once "$CAND"
    SKIP[$CAND]=1; SKIPPED_LINES+=("#$CAND conflicts"); continue
  fi
  if [[ "$MERGEABLE" == "UNKNOWN" ]]; then
    SKIP[$CAND]=1; SKIPPED_LINES+=("#$CAND mergeability UNKNOWN (retry next run)"); continue
  fi

  case "$MSS" in
    CLEAN)
      merge_pr "$CAND" || { SKIP[$CAND]=1; SKIPPED_LINES+=("#$CAND merge failed"); }
      # loop: re-list and continue
      ;;
    BEHIND)
      log "#$CAND BEHIND → update-branch, waiting for CI (≤10 min)"
      gh pr update-branch "$CAND" --repo "$REPO" 2>/dev/null \
        || gh api -X PUT "repos/$REPO/pulls/$CAND/update-branch" >/dev/null 2>&1 || true
      MERGED_THIS=0
      for ((i=1; i<=CI_POLL_MAX; i++)); do
        if (( $(elapsed) > WALL_CAP_SECS )); then break; fi
        sleep "$CI_POLL_SECS"
        STATE=$(gh pr view "$CAND" --repo "$REPO" --json mergeStateStatus --jq .mergeStateStatus 2>/dev/null || echo UNKNOWN)
        case "$STATE" in
          CLEAN) merge_pr "$CAND" && MERGED_THIS=1; break ;;
          BLOCKED|UNSTABLE|DIRTY) break ;;
          *) continue ;;  # BEHIND/UNKNOWN/pending → keep polling
        esac
      done
      if [[ "$MERGED_THIS" != "1" ]]; then
        SKIP[$CAND]=1; SKIPPED_LINES+=("#$CAND BEHIND→CI not green within wait")
      fi
      ;;
    BLOCKED)
      SKIP[$CAND]=1; SKIPPED_LINES+=("#$CAND checks pending/blocked (retry next run)") ;;
    UNSTABLE)
      SKIP[$CAND]=1; SKIPPED_LINES+=("#$CAND UNSTABLE — non-required check red (needs human)") ;;
    *)
      SKIP[$CAND]=1; SKIPPED_LINES+=("#$CAND state $MSS (skipped)") ;;
  esac
done

# ---- Report ----
WALL=$(( $(elapsed) ))
{
  echo "## 🔀 PR Merger"
  echo "- Open PRs at start: ${OPEN_AT_START}  ·  Wall time: ${WALL}s"
  echo "- Merged this run (${#MERGED[@]}): ${MERGED[*]:-none}"
  echo "- Skipped/deferred (${#SKIPPED_LINES[@]}):"
  if ((${#SKIPPED_LINES[@]})); then printf '  - %s\n' "${SKIPPED_LINES[@]}"; else echo "  - none"; fi
} | tee -a "${GITHUB_STEP_SUMMARY:-/dev/stdout}"
