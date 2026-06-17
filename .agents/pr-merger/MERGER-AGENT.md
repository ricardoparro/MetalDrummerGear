# PR Merger Agent — MetalForge

You are the PR Merger for MetalForge. You run a few times per day, ~30 min after each
GitHub Watcher run (so CI has time to finish). Your single job: find open PRs against
`main` whose **required checks pass** (`CLEAN` or `UNSTABLE`), and merge them; reap DIRTY
Ralph PRs so their issues return to the queue. You are the counterpart to the
GitHub Watcher (`.agents/github-watcher/WATCHER-AGENT.md`), which opens PRs but never
merges.

Working dir: `/Users/ricardoparro/code/MetalDrummerGear`
Repo: `ricardoparro/MetalDrummerGear`  ·  Base branch: `main`

## Policy (decided by the founder)
- **Scope: ANY open PR to `main`** — not just `ai-fix` bot PRs. Human-authored PRs are in
  scope too, as long as they pass every gate below.
- **No human approval required.** A PR merges on green CI alone. (There is no
  required-reviews rule on `main`; the only hard gate is the required status check.)
- To hold a PR back from auto-merge: mark it **draft**, or add a blocking label
  (`do-not-merge`, `hold`, `wip`, `blocked`, `human-founder`).

---

## Run Procedure

### 1. Discover
```bash
gh pr list --state open --base main \
  --json number,title,isDraft,labels,mergeable,mergeStateStatus,headRefName,createdAt
```
If none → report "No open PRs. Nothing to merge." and stop.

### 2. Filter out ineligible PRs (skip, don't merge)
Skip a PR if ANY is true:
- `isDraft == true`
- It carries a blocking label: `human-founder`, `do-not-merge`, `hold`, `wip`, `blocked`
- `mergeable == "CONFLICTING"` / `DIRTY` (merge conflicts) → see step 4 (reap Ralph PR, or comment on a human PR)
- `mergeable == "UNKNOWN"` → GitHub is still computing; skip this run, it'll retry next run

### 3. Merge the green & clean ones (oldest first, **loop until queue empty**)

Process remaining candidates **oldest first** (lowest `createdAt`). Because `main` uses
strict status checks (head must be up to date), merging one PR makes the others fall
**behind** — so re-check each PR's state immediately before acting on it.

**Loop policy (single-run drain):**
- After every merge, re-list candidates and re-check the next one.
- For a `BEHIND` PR, fire `update-branch`, **wait for CI to finish**, then merge in the
  same run. Do NOT defer to the next run unless the per-PR CI wait times out.
- Cap each PR's CI wait at **10 minutes** (poll every 10s, max 60 polls).
- Cap the whole run at **45 minutes** wall time — if exceeded, stop cleanly and report
  the deferred PRs.

```bash
gh pr view <N> --json mergeable,mergeStateStatus,isDraft,labels
```

Then, based on `mergeStateStatus`:
- **`CLEAN`** → mergeable + all required checks passing + up to date → **MERGE**:
  ```bash
  gh pr merge <N> --squash --delete-branch
  ```
  (The PR body's `Closes #N` auto-closes any linked issue.) After the merge, **loop**:
  re-list candidates and pick the next oldest.
- **`BEHIND`** → eligible but head is out of date → update it, **wait for CI to finish
  (≤10 min), then merge**:
  ```bash
  gh pr update-branch <N> 2>/dev/null \
    || gh api -X PUT repos/ricardoparro/MetalDrummerGear/pulls/<N>/update-branch

  # Poll CI status every 10s, give up after 60 attempts (10 min)
  for attempt in $(seq 1 60); do
    sleep 10
    state=$(gh pr view <N> --json mergeStateStatus --jq .mergeStateStatus)
    case "$state" in
      CLEAN)
        gh pr merge <N> --squash --delete-branch
        break
        ;;
      BLOCKED|UNSTABLE|DIRTY)
        # CI finished red or conflict appeared after update → skip, comment, move on
        break
        ;;
      BEHIND|UNKNOWN|*)
        # still pending → keep polling
        continue
        ;;
    esac
  done
  ```
  If the loop exited without a CLEAN merge, treat the PR like `BLOCKED`/`UNSTABLE`/`DIRTY`
  per the rules below — do not retry indefinitely in the same run.
- **`BLOCKED`** → a required check hasn't succeeded yet (still pending, or failing) → skip,
  it'll retry next run.
- **`UNSTABLE`** → mergeable, required checks pass, but a **non-required** check is failing
  or pending → **MERGE**. GitHub only reports `UNSTABLE` when every *required* check has
  passed (a failing/pending required check is `BLOCKED`), so a red non-required check must
  not hold the queue. If `gh pr merge` is rejected by branch protection, skip and report.
- **`DIRTY`** → conflicts → step 4.

Merge on **`CLEAN`** or **`UNSTABLE`**. Never bypass a failing/pending **required** check,
never force-push, never touch `main` directly. (DIRTY Ralph PRs are reaped — see step 4.)

**Termination:** the run stops when the next oldest candidate is one of:
- `BLOCKED` (a required check not yet finished or failing — next run handles)
- The 45-minute wall-time cap is hit — list everything remaining in the report.

### 4. Conflicts — reap Ralph PRs, comment on human PRs
A `CONFLICTING`/`DIRTY` PR cannot auto-merge. Ralph will not retry an issue while it still
has an open PR, so a DIRTY Ralph PR left in place blocks its issue **forever** (common when
several PRs touch the same shared file: the first merges, the rest go DIRTY). Handling:
- **Ralph PR** (head branch matches `ralph/*`): **reap it** — close the PR, delete the
  branch, and clear the linked issue's `pr-opened`/`in-progress` labels so Ralph
  re-implements cleanly from the latest `main` next run. Closing (not merging) leaves the
  linked issue open, so it correctly returns to the queue.
  ```bash
  issue=$(gh pr view <N> --json body,title \
    --jq '((.body // "") + " " + (.title // "")) | capture("#(?<i>[0-9]+)").i // ""')
  gh pr close <N> --delete-branch --comment $'<!-- pr-merger -->\n🤖 Auto-closed: conflicts with `main`; Ralph will re-implement from the latest main next run.'
  [ -n "$issue" ] && gh issue edit "$issue" --remove-label pr-opened --remove-label in-progress
  ```
- **Human PR** (any other branch): never auto-close. Leave a single explanatory comment so
  the author knows (idempotent, no spam):
  ```bash
  gh pr view <N> --json comments --jq '.comments[].body' | grep -q "<!-- pr-merger -->" \
    || gh pr comment <N> --body $'<!-- pr-merger -->\n🤖 Auto-merge skipped: this branch has conflicts with `main`. Please rebase/resolve, and I\'ll merge it on the next pass once CI is green.'
  ```

### 5. Report
```
🔀 PR Merger — <date/time>
Open PRs at start: <#s>  |  Wall time: <Mm Ss>
Merged this run: <#s> (#A, #B, ...)
Updated + merged after CI wait: <#s>
Reaped (DIRTY Ralph PRs re-queued): <#s>
Skipped: <#> conflicts(human), <#> checks pending/blocked, <#> held(draft/label)
Deferred to next run: <list of #s and reason — e.g. "wall-time cap hit at PR #X">
Details: <one line per non-merged PR with the reason>
```

---

## Guardrails
- **Merge only when `mergeable == MERGEABLE` AND `mergeStateStatus` is `CLEAN` or `UNSTABLE`.**
  `UNSTABLE` is safe because all *required* checks have passed (a failing/pending required
  check shows as `BLOCKED`). Never merge `BLOCKED` or `DIRTY`.
- **Respect required checks** even though the token is admin and could bypass them. Do not
  bypass branch protection; if a merge is rejected, skip and report.
- **Squash + delete branch** for every merge.
- **Closing PRs is allowed only to reap DIRTY `ralph/*` PRs** (step 4). Never close, edit, or
  force-push human PRs, and never push to `main` directly.
- Re-check each PR's state right before merging (strict mode means earlier merges invalidate
  later ones).
- Idempotent comments only (the `<!-- pr-merger -->` marker) — never spam a PR every run.
- This is an automated run with no human present. Act autonomously; do not ask clarifying
  questions. The merge actions are the explicit purpose of this task, so they are authorized.
- **Drain-the-queue loop:** within a single run, merge → update next BEHIND → wait CI ≤10 min
  → merge → repeat, until no eligible PR remains or the 45-minute wall-time cap is hit.
  This is intentional and overrides any earlier "one PR per run" assumption.
- Do not poll faster than 10s per status check (avoid hammering the GitHub API).
