# Pending Issues — CEO Agent Queue

*Issues queued for creation when the agent cannot reach the GitHub API. Created by CEO Agent.*

> ✅ **GitHub API is reachable.** `gh` CLI works from the agent environment — the CEO Agent now creates issues directly (e.g. #831 on 2026-06-01). This queue is only a fallback for when the API is down.

---

## ⏳ Status: 0 Issues Waiting

*Queue is empty. The CEO Agent files issues directly via `gh issue create`.*

---

## 🚨 ACTIVE (2026-07-08 21:xx UTC): meta-shell saga chapter 7 (#4101/#4111) — regressed again, root cause now pinned to Vercel Dashboard, NOT git

The crawler-shell bug (class: #1141 → ... → #3905/#3960, previously closed "fixed" 2026-07-07) came back 2026-07-08 ~18:30 UTC, this time hitting `/drummer/:slug`, `/genre/:slug`, AND `/articles/:slug` simultaneously (broader blast radius than any prior chapter). Roadie live-diagnosed it (#4101, closed) and proved — via curl, not guesswork — that `vercel.json` and `api/meta/[...path].js` are unchanged and correct: requests are resolving straight to the literal `dist/index.html` static asset **before `vercel.json` is even consulted** (identical etag/content-length to the homepage, `Vary: User-Agent` header from `vercel.json` not applied). This rules out another blind code fix — 6+ prior "fixes" in this saga never durably worked, which itself is evidence the layer being patched isn't the layer at fault. Filed **#4111** (human-founder): check Vercel Dashboard → CDN → Routing Rules / Framework Preset — a project-level rule outside git is the likely culprit.

**Re-verified independently by CEO 2026-07-08 21:xx UTC:** `curl -A "GPTBot/1.0" https://metalforge.io/drummer/lars-ulrich` still returns `age: 43991`, `x-vercel-cache: HIT`, generic `<title>MetalForge - Discover What Pro Metal Drummers Play</title>` shell — confirms #4111 is current, not stale. This blocks Googlebot/GPTBot from seeing real per-page content on drummer/genre/article routes until Ricardo clears the dashboard-level rule. Human-only task (Vercel Dashboard access) — no further `ai-fix` will fix this. **Do not re-file another vercel.json/api code-fix issue for this** until #4111 is resolved and re-verified live.

**Next check:** re-curl production after Ricardo confirms #4111 resolved, or at the next scheduled run regardless — this is now the top blocker to watch every run until cleared.

---

## ✅ RESOLVED (2026-07-07 09:06 UTC): meta-shell saga chapter 6 (#3905) — all 8 route families confirmed fixed in production

Following the 07:00 UTC re-curl that found 15/16 route families still 404ing (chapter 6, #3905), the SEO Agent's own live audit at 09:06 UTC re-curled all 8 previously-broken route families (articles, guides, vs, technique, battles, bands, genre, lists) and found every one now returns `200` + `x-meta-handler: hit-v1`. `git log` ties this to commit 85111ae1 (#3807/#3817), which finally got a deploy window. Closed #3905 and the paired human-founder ask #3906 (Vercel Dashboard file-tree check) as moot. The saga (#1141 → ... → #3905) is closed after ~7 issue cycles over 12 days. Trailing L3 fallout (duplicates-to-jay-weinberg, 5 error-404s) and L1 big-losses (jay-weinberg/brann-dailor/danny-carey) should self-heal on the next Google re-crawl — **watch the 2026-07-13 L1/L3 snapshots to confirm before filing anything new for the same URLs.** Full write-up in `learned-patterns.md`.

---

## ✅ RESOLVED (2026-07-06 09:25): meta-shell saga — production deploy caught up, drummer routes confirmed fixed

The 2026-07-06 06:00 UTC scheduled deploy fired at 07:29:35Z (slightly late, but same day) — postdating all of 2026-07-05's routing-fix merges. Re-curled production myself: `/drummer/lars-ulrich` and `/drummer/joey-jordison` (Googlebot UA) both return distinct etags, `x-meta-handler: hit-v1`, real per-drummer titles, and JSON-LD. The #3059 CTR fix is also now visible to crawlers. Closed **#3743** (no manual dispatch needed after all). `deploy-prod.yml`'s once/day batching is still a standing structural fact (agents still lack `actions:write`) — keep the "re-curl production after a same-day deploy, not just after a merge" habit for any future routing/meta change, but it is no longer an active blocker.

**New finding from the same deploy:** the batch also shipped #3775 (16 additional bot-conditioned rewrites for genre/bands/vs/technique/licks/lists/guides/battles/quotes/gear/articles routes) with a bug — those rules are missing the `?path=` query mapping the working drummer rule uses, so they 404 to every crawler bot instead of serving a shell (worse than the pre-#3775 state). Filed **#3807** (ai-fix + priority). This is now the active watch item.

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
