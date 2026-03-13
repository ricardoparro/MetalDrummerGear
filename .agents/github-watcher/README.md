# GitHub Watcher Agent

Autonomous agent that monitors the MetalDrummerGear repository for issues labeled `ai-fix` and dispatches Ralph (coding sub-agent) to implement fixes.

## How It Works

```
┌─────────────────┐     ┌──────────────┐     ┌─────────────┐
│  GitHub Issue   │────▶│   Watcher    │────▶│    Ralph    │
│  (ai-fix label) │     │  (every 15m) │     │  (sub-agent)│
└─────────────────┘     └──────────────┘     └─────────────┘
                                                    │
                                                    ▼
                                             ┌─────────────┐
                                             │  Pull Request│
                                             │  (auto-created)│
                                             └─────────────┘
```

## Schedule

- **Frequency:** Every 15 minutes via OpenClaw cron
- **Cron expression:** `*/15 * * * *`

## Issue Pickup Process

### 1. Discovery
The watcher runs `gh issue list --label ai-fix --state open` to find issues.

### 2. Validation
For each issue found:
- Checks if already being worked on (avoids duplicates)
- Reads issue body for requirements
- Determines complexity

### 3. Dispatch
Spawns a sub-agent session with:
```
sessions_spawn(
  task: "Fix GitHub issue #XXX: <title>\n\n<issue body>",
  agentId: "ralph",  // or default coding agent
  label: "fix-issue-XXX"
)
```

### 4. Implementation (Ralph)
Ralph autonomously:
1. Reads the issue requirements
2. Checks out appropriate branch
3. Makes code changes
4. Runs tests if applicable
5. Creates PR with `gh pr create`
6. Links PR to issue

### 5. PR Review
- CI runs automatically (Vercel preview, health checks)
- **Branch protection requires human approval** for merge
- Once approved, PR auto-merges and closes the issue

## Labels

| Label | Meaning |
|-------|---------|
| `ai-fix` | Ready for autonomous pickup |
| `human` | Requires Ricardo's manual action |
| `blocked` | Waiting on external dependency |

## Creating AI-Fixable Issues

For best results, include:

```markdown
## Problem
Clear description of what's broken or needed

## Expected Behavior
What should happen after the fix

## Files Likely Involved
- packages/frontend/App.js
- packages/frontend/data/drummers.js

## Acceptance Criteria
- [ ] Feature X works
- [ ] No console errors
- [ ] Tests pass
```

## Monitoring

Check watcher status:
```bash
# View recent runs
gh run list --workflow=".github/workflows/..." 

# Or check OpenClaw cron
openclaw cron list
```

## Troubleshooting

### Issue not being picked up?
1. Verify `ai-fix` label is applied
2. Check issue is `open` state
3. Look at watcher logs in OpenClaw session history

### Ralph failing to complete?
1. Check sub-agent session: `sessions_list`
2. View history: `sessions_history --sessionKey fix-issue-XXX`
3. Issue may be too complex - add more context

### PR not merging?
- Branch protection requires approval
- Check CI status on PR
- May need manual review for complex changes

## Example Flow

1. **Ricardo creates issue:**
   ```
   Title: Add dark mode toggle to settings
   Labels: ai-fix
   Body: Add a toggle in settings to switch themes...
   ```

2. **Watcher picks up (within 15 min):**
   ```
   🤘 GitHub Watcher Report
   Found: #701 (Add dark mode toggle)
   Spawned: fix-issue-701 (Opus-4-5)
   ```

3. **Ralph creates PR:**
   ```
   PR #702: feat: add dark mode toggle (#701)
   - Modified: App.js, settings.js
   - CI: ✅ Vercel, ✅ Health Check
   ```

4. **Ricardo approves PR → Auto-merge → Issue closed**

---

*Part of the MetalForge autonomous agent ecosystem.*
