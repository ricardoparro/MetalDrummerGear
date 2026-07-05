# Pending Issues — CEO Agent Queue

*Issues queued for creation when the agent cannot reach the GitHub API. Created by CEO Agent.*

> ✅ **GitHub API is reachable.** `gh` CLI works from the agent environment — the CEO Agent now creates issues directly (e.g. #831 on 2026-06-01). This queue is only a fallback for when the API is down.

---

## ⏳ Status: 0 Issues Waiting

*Queue is empty. The CEO Agent files issues directly via `gh issue create`.*

---

## 🚨 Active blocker (2026-07-05): production deploys are batched, agents can't trigger them

`deploy-prod.yml` only fires on a 06:00 UTC daily schedule (since #1797, 2026-06-19) — pushes to `main` no longer trigger a build, and the agent GitHub token lacks `actions:write` to run `workflow_dispatch` manually. Confirmed live 2026-07-05 20:23 UTC: `/drummer/john-otto` still served the generic SPA shell to a bot UA even though 4+ crawler-rewrite fixes had merged since the last deploy (07:04 UTC that morning). Tracked in **#3743** (human-founder, open). Until Ricardo runs the workflow manually (or comments to confirm otherwise), treat any "fix merged but curl looks unchanged" as **unmeasured, not failed** — this caused a 4x misdiagnosis loop on the crawler-shell bug (#3734→#3742) before the batching was discovered. Clear this note once #3743 is resolved.

---

## 📋 Cleanup Log

**2026-06-16 (evening):** 🔓 **GSC BLOCKER RESOLVED.** The 126-day "GSC blind" saga (#910, #909) ended today — service account granted on the GSC property; metrics.md now carries a live Search Console query table (1,279 impr / 32 clicks / pos 8.6). First GSC-gap escalation filed (#1140, Joey Jordison query cluster). GSC-gap quota is now actionable going forward.

**2026-06-01 (Day 122):** Cleared 3 long-stale entries that were still listed as "waiting for creation" but had already shipped:
- **CEO-014 Gear Share Cards** → shipped (#764 / #797, closed March 2026)
- **CEO-017 Gear by Brand Pages** → shipped/superseded (#719 Gear Search by brand; `packages/frontend/data/brands.js` exists)
- **CEO-018 Gear Wishlist & Conversion Funnel** → shipped (#823 / #824, merged 2026-05-02)

The old banner also wrongly claimed "GitHub API returns 404" and "Ralph is IDLE" — both outdated. Removed.

> **Operational concern RESOLVED (2026-06-01 evening):** The "Ralph stall" is explained — a new **GitHub Watcher agent** (`.agents/github-watcher/WATCHER-AGENT.md`) now replaces the defunct OpenClaw cron. It ran 2026-06-01 20:21 UTC, triaged #830, and correctly flagged it as non-atomic, requesting a split. The CEO agent acted on that: #830 closed and split into **#832 (enabler, ai-fix)** + **#833/#834/#835 (gated content, no label until #832 merges)**. Eng pipeline is alive. See `decisions-log.md` (2026-06-01 20:23 UTC entry).
>
> **Watcher CONFIRMED ALIVE (2026-06-01 late):** The Watcher didn't just author — it *worked*. #832 (enabler) was dispatched, implemented, and merged (PR #836, 20:51 UTC). The CEO then promoted **#833** ($500 tier, split 1/3) to `ai-fix` per plan. #834/#835 stay gated (unlabeled) and get promoted one-at-a-time as each prior tier merges, because the Watcher dispatches the oldest open `ai-fix` and ignores dependencies. Eng pipeline is healthy and flowing.
>
> **Still open — the real bottleneck:** #831 (GA4 daily-views keystone) has had NO response since 09:08. Every growth decision stays blind until Ricardo pastes a traffic number. This, not eng throughput, is the binding constraint.
>
> **🚨 SUPERSEDED 2026-06-03 evening — MERGE DEADLOCK is now the binding constraint.** The eng pipeline is NO LONGER "flowing." `main` branch protection requires a status check (`Check Image & Video URLs`) that **no workflow emits**, so every PR is pinned at `BLOCKED` and the Merger (correctly, per its guardrail) can't land anything. #836 (2026-06-01) is the last merge; #867/#868/#869 are green but stuck. Filed **#876** (`human-founder`) with a one-step fix. Until #876 is resolved, Watcher authoring + founder SEO issues (#870–874) all pile up un-mergeable. See `decisions-log.md` (2026-06-03 evening entry).
