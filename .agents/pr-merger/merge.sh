#!/usr/bin/env bash
# PR Merger — deterministic implementation of .agents/pr-merger/MERGER-AGENT.md
# Finds open PRs to main that are MERGEABLE + CLEAN and squash-merges them,
# draining the queue (oldest first) until none remain or the wall-time cap hits.
# No LLM: pure gh + jq gating. Respects branch protection.
#
# Merges CLEAN and UNSTABLE PRs. UNSTABLE is safe: GitHub reports UNSTABLE only
# when all *required* checks pass and a *non-required* check is red/pending
# (a failing required check would be BLOCKED instead).
#
# Reaps DIRTY (content-conflicting) Roadie PRs instead of leaving them in limbo:
# closes the PR, deletes the branch, and clears the linked issue's
# pr-opened/in-progress labels so Roadie re-implements cleanly from the latest
# main on the next run. Without this, the first PR touching a shared file merges
# and every later PR goes DIRTY forever (Roadie won't retry an issue that still
# has an open PR), so those issues stay open indefinitely. Human PRs are never
# auto-closed — only bot branches matching `roadie/*` (or legacy `ralph/*`
# during the rename transition).
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

# Reap a bot PR (roadie/* or legacy ralph/*) that conflicts with main: close it,
# delete the branch, and clear the linked issue's in-flight labels so Roadie
# re-implements it from a fresh main next run. Closing a PR (vs merging) does NOT
# auto-close the linked issue, so the issue correctly returns to the queue.
reap_dirty_bot_pr() {
  local n="$1"
  local issue
  # First "#<number>" found in the body ("Closes #N") or title ("fix: #N ...").
  issue=$(gh pr view "$n" --repo "$REPO" --json body,title \
    --jq '((.body // "") + " " + (.title // "")) | capture("#(?<i>[0-9]+)").i // ""' 2>/dev/null)
  gh pr close "$n" --repo "$REPO" --delete-branch \
    --comment $'<!-- pr-merger -->\n🤖 Auto-closed: this branch conflicts with `main` and cannot be auto-merged. Reaped so Roadie can re-implement the issue cleanly from the latest main on the next run.' >/dev/null 2>&1 || true
  if [[ -n "$issue" ]]; then
    gh issue edit "$issue" --repo "$REPO" \
      --remove-label pr-opened --remove-label in-progress >/dev/null 2>&1 || true
    log "Reaped DIRTY #$n → re-queued issue #$issue"
  else
    log "Reaped DIRTY #$n (no linked issue found)"
  fi
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
  ST=$(gh pr view "$CAND" --repo "$REPO" --json number,title,isDraft,labels,mergeable,mergeStateStatus,headRefName 2>/dev/null || echo '{}')
  TITLE=$(echo "$ST" | jq -r '.title // ""')
  IS_DRAFT=$(echo "$ST" | jq -r '.isDraft // false')
  MERGEABLE=$(echo "$ST" | jq -r '.mergeable // "UNKNOWN"')
  MSS=$(echo "$ST" | jq -r '.mergeStateStatus // "UNKNOWN"')
  LABELS=$(echo "$ST" | jq -c '.labels // []')
  HEAD_REF=$(echo "$ST" | jq -r '.headRefName // ""')

  # Ineligible → skip for the rest of this run
  if [[ "$IS_DRAFT" == "true" ]]; then
    SKIP[$CAND]=1; SKIPPED_LINES+=("#$CAND held (draft)"); continue
  fi
  if is_blocked_by_label "$LABELS"; then
    SKIP[$CAND]=1; SKIPPED_LINES+=("#$CAND held (blocking label)"); continue
  fi
  if [[ "$MERGEABLE" == "CONFLICTING" || "$MSS" == "DIRTY" ]]; then
    if [[ "$HEAD_REF" == roadie/* || "$HEAD_REF" == ralph/* ]]; then
      reap_dirty_bot_pr "$CAND"
      SKIP[$CAND]=1; SKIPPED_LINES+=("#$CAND conflicts → reaped (Roadie re-implements)")
    else
      comment_conflict_once "$CAND"
      SKIP[$CAND]=1; SKIPPED_LINES+=("#$CAND conflicts (human PR — left for rebase)")
    fi
    continue
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
      # Required checks pass (else GitHub would report BLOCKED); only a
      # non-required check is red/pending → safe to merge per policy.
      log "#$CAND UNSTABLE → required checks pass, merging (non-required check red/pending)"
      merge_pr "$CAND" || { SKIP[$CAND]=1; SKIPPED_LINES+=("#$CAND UNSTABLE merge failed"); } ;;
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
