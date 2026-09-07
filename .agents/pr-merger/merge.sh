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
# CI gate (2026-09-07): `main` has NO required status checks, so a fresh PR reports
# CLEAN within seconds of opening — before slow CI (the perf-budget gate needs a
# ~2 min build) has even been assigned a runner. Between 2026-07-13 and 2026-09-07
# that meant ~830 runs of perf-budget.yml with exactly ONE success: the merger
# squash-merged each Roadie PR ~20s after it opened, the branch vanished, and the
# run died with 0 jobs. The bundle drifted over budget on main unnoticed. So the
# merger now enforces the checks in GATE_CHECKS itself: a PR is merged only once
# each gate check on its head SHA has completed green; pending → defer to the next
# run (the gate's own `check_suite completed` event re-triggers us); failed → HOLD
# the PR (comment once, flag the linked issue `needs-human`). Branch protection
# with required checks would do the same thing at the GitHub level — this is the
# in-script equivalent so the guarantee doesn't depend on repo settings.
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
# Check-run NAMES (= the job `name:` in the workflow) that must be green before a
# merge. Only listed here because GitHub has no required checks on main.
GATE_CHECKS=("Bundle budget + homepage request graph")   # perf-budget.yml (#4410)
GATE_GRACE_SECS=180          # a gate run may take a few seconds to appear on a fresh SHA
GATE_STUCK_SECS=$((45 * 60)) # a gate still pending this long after the commit is treated as failed
GATE_MARKER='<!-- pr-merger-gate -->'
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

# ---- CI gate -----------------------------------------------------------------
# Prints exactly one of: ok | pending | fail:<check name>|<html url>
# Looks at the latest check run per name on the PR's head SHA. A gate check that
# does not exist for the SHA is "not applicable" (its workflow has a `paths:`
# filter) once the commit is older than GATE_GRACE_SECS; before that it may simply
# not have been created yet, so we defer. Any API hiccup also defers — deferring is
# always safe, merging blind is not.
gate_state() {
  local n="$1" sha commit_date age_secs runs
  sha=$(gh pr view "$n" --repo "$REPO" --json headRefOid --jq '.headRefOid // ""' 2>/dev/null)
  [[ -z "$sha" ]] && { echo pending; return; }
  commit_date=$(gh api "repos/$REPO/commits/$sha" --jq '.commit.committer.date // ""' 2>/dev/null)
  # Unknown commit age → 0 (= "fresh"), so an API/date hiccup can only make us
  # defer, never treat a missing gate run as "not applicable" or "stuck".
  age_secs=0
  if [[ -n "$commit_date" ]]; then
    local ts; ts=$(date -u -d "$commit_date" +%s 2>/dev/null) || ts=""
    [[ -n "$ts" ]] && age_secs=$(( $(date +%s) - ts ))
  fi
  runs=$(gh api "repos/$REPO/commits/$sha/check-runs?per_page=100" \
    --jq '.check_runs[] | [.name, .status, (.conclusion // ""), (.html_url // "")] | @tsv' 2>/dev/null) \
    || { echo pending; return; }
  local name line status conclusion url
  for name in "${GATE_CHECKS[@]}"; do
    line=$(printf '%s\n' "$runs" | awk -F'\t' -v n="$name" '$1==n' | head -1)
    if [[ -z "$line" ]]; then
      (( age_secs < GATE_GRACE_SECS )) && { echo pending; return; }
      continue   # older commit, no such check → workflow's paths filter did not match
    fi
    status=$(printf '%s' "$line" | cut -f2)
    conclusion=$(printf '%s' "$line" | cut -f3)
    url=$(printf '%s' "$line" | cut -f4)
    if [[ "$status" != "completed" ]]; then
      (( age_secs > GATE_STUCK_SECS )) && { echo "fail:${name} (stuck ${status} for $((age_secs/60)) min)|${url}"; return; }
      echo pending; return
    fi
    case "$conclusion" in
      success|neutral|skipped) ;;
      *) echo "fail:${name} (${conclusion:-no conclusion})|${url}"; return ;;
    esac
  done
  echo ok
}

# A gate check failed on this PR: leave one explanatory comment, flag the linked
# issue `needs-human`, and keep the PR open (never merged, never reaped — a
# perf regression is not something Roadie should blindly retry from scratch).
hold_gate_failure() {
  local n="$1" detail="$2" issue
  local what="${detail%%|*}" url="${detail#*|}"
  log "HOLD #$n — CI gate failed: $what"
  # Idempotent: the PR comment carries the marker; everything below (issue label +
  # issue comment) happens only the first time, so a held PR that the merger
  # re-evaluates every 15 min does not spam its issue.
  if gh pr view "$n" --repo "$REPO" --json comments \
        --jq '.comments[].body' 2>/dev/null | grep -q "$GATE_MARKER"; then
    return 0
  fi
  gh pr comment "$n" --repo "$REPO" --body "${GATE_MARKER}
🤖 Auto-merge held: the CI gate **${what}** is red on this PR${url:+ (${url})}. This check is enforced by the PR Merger even though \`main\` has no required checks. Fix the regression on this branch (or, for a deliberate bundle growth, bump \`perf-budgets.json\` in the same PR with a note on why) and I'll merge on the next pass once it's green." >/dev/null 2>&1 || true
  issue=$(gh pr view "$n" --repo "$REPO" --json body,title \
    --jq '((.body // "") + " " + (.title // "")) | capture("#(?<i>[0-9]+)").i // ""' 2>/dev/null)
  if [[ -n "$issue" ]]; then
    gh issue edit "$issue" --repo "$REPO" --add-label needs-human >/dev/null 2>&1 || true
    gh issue comment "$issue" --repo "$REPO" --body "${GATE_MARKER}
🤖 PR #${n} for this issue is held by the PR Merger: CI gate **${what}** failed. Needs a human look (or a fix pushed to the PR branch)." >/dev/null 2>&1 || true
  fi
}

# merge_pr behind the CI gate. Returns 0 only on an actual merge; on
# pending/failed it records the reason and returns 1.
gated_merge() {
  local n="$1" gs
  gs=$(gate_state "$n")
  case "$gs" in
    ok) merge_pr "$n" && return 0
        SKIP[$n]=1; SKIPPED_LINES+=("#$n merge failed"); return 1 ;;
    pending) SKIP[$n]=1; SKIPPED_LINES+=("#$n CI gate still running (retry next run)"); return 1 ;;
    fail:*) hold_gate_failure "$n" "${gs#fail:}"
        SKIP[$n]=1; SKIPPED_LINES+=("#$n HELD — CI gate failed: ${gs#fail:}"); return 1 ;;
    *) SKIP[$n]=1; SKIPPED_LINES+=("#$n gate state '$gs' (retry next run)"); return 1 ;;
  esac
}

merge_pr() {
  local n="$1"
  # Parse the linked issue BEFORE merging (same heuristic as reap): first
  # "#<number>" in the body ("Closes #N") or title ("fix: #N ...").
  local issue
  issue=$(gh pr view "$n" --repo "$REPO" --json body,title \
    --jq '((.body // "") + " " + (.title // "")) | capture("#(?<i>[0-9]+)").i // ""' 2>/dev/null)
  if gh pr merge "$n" --repo "$REPO" --squash --delete-branch; then
    MERGED+=("#$n")
    log "MERGED #$n"
    # ⚠️ Do NOT rely on GitHub's "Closes #N" keyword auto-close — it was observed
    # NOT firing here (merged issues stayed open + still labelled `ai-fix`, so the
    # night fleet re-implemented the SAME issues every run, producing 2-3 duplicate
    # PRs each and burning most of the merge throughput on already-shipped work).
    # Close + de-queue the linked issue explicitly so a merged issue never returns
    # to the eligible queue.
    if [[ -n "$issue" ]]; then
      gh issue close "$issue" --repo "$REPO" --reason completed >/dev/null 2>&1 || true
      gh issue edit "$issue" --repo "$REPO" \
        --remove-label ai-fix --remove-label in-progress --remove-label pr-opened >/dev/null 2>&1 || true
      log "Closed + de-queued linked issue #$issue"
    else
      log "MERGED #$n (no linked issue parsed — nothing to close)"
    fi
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
      gated_merge "$CAND" || true
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
          CLEAN)
            GS=$(gate_state "$CAND")
            case "$GS" in
              ok) merge_pr "$CAND" && MERGED_THIS=1; break ;;
              pending) continue ;;   # CI gate still running → keep polling
              fail:*) hold_gate_failure "$CAND" "${GS#fail:}"; SKIPPED_LINES+=("#$CAND HELD — CI gate failed: ${GS#fail:}"); MERGED_THIS=2; break ;;
              *) continue ;;
            esac ;;
          BLOCKED|UNSTABLE|DIRTY) break ;;
          *) continue ;;  # BEHIND/UNKNOWN/pending → keep polling
        esac
      done
      if [[ "$MERGED_THIS" == "2" ]]; then
        SKIP[$CAND]=1   # held by the gate — reason already recorded
      elif [[ "$MERGED_THIS" != "1" ]]; then
        SKIP[$CAND]=1; SKIPPED_LINES+=("#$CAND BEHIND→CI not green within wait")
      fi
      ;;
    BLOCKED)
      SKIP[$CAND]=1; SKIPPED_LINES+=("#$CAND checks pending/blocked (retry next run)") ;;
    UNSTABLE)
      # Required checks pass (else GitHub would report BLOCKED); only a
      # non-required check is red/pending → safe to merge per policy.
      log "#$CAND UNSTABLE → required checks pass; merging if the CI gate is green (other non-required checks may be red/pending)"
      gated_merge "$CAND" || true ;;
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
