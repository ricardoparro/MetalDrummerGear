# GSC watch loop (L1, scan-all)

Weekly automated GSC verifier. Every Monday 08:00 UTC the workflow fetches **every query** GSC surfaced for `metalforge.io` in the last 7 days, diffs each one against the most recent prior weekly run (stored under `.agents/seo/gsc-history/`), classifies, and produces:

- `.agents/seo/gsc-watch-snapshot.md` — full per-query breakdown for the CEO Agent.
- Umbrella issue `gsc-watch` — only the actionable rows (so the issue stays digestible).

## Why this exists

The CEO roadmap KPI is "indexed pages × organic CTR". L1 turns that from a manual hope into a deterministic weekly read on what actually moved Google. Paired with L2 (LLM citations), the SEO Agent / CEO / Ralph chain now has external verifiers on both organic and AI channels.

This is v2 of L1. v1 used a hand-curated `watched-queries.json` with fixed baselines per entry — useful as a seed, didn't scale. v2 drops curation entirely: GSC is the source of truth, and the previous weekly run is the rolling baseline.

## Pieces

| File | Role |
| --- | --- |
| `.agents/scripts/check-gsc-watched-queries.cjs` | Pure crawler. Fetches all queries from GSC (rowLimit 5000), loads the most recent `.agents/seo/gsc-history/YYYY-MM-DD.json` as last-week baseline, diffs query-by-query, classifies, writes the new history file. |
| `.agents/scripts/render-gsc-watch-issue.cjs` | Pure transform. JSON → Markdown for both the umbrella issue (actionable rows only) and the full snapshot file (every query, grouped by class). |
| `.github/workflows/check-gsc-watched-queries.yml` | Mutator. Cron `0 8 * * 1` + `workflow_dispatch`. Idempotent umbrella issue lifecycle. Commits the snapshot and the new history file. |
| `.agents/seo/gsc-history/YYYY-MM-DD.json` | Per-week cache (one file per run). Used as the prior-week baseline for the next run. |

## Classification rules

| Class | Trigger |
| --- | --- |
| **big-loss** | Position worsened ≥3 (with ≥10 prior impressions), OR impressions ≤0.5x (with ≥50 prior), OR clicks halved (with ≥4 prior clicks). |
| **disappeared** | Now 0 impressions, had ≥5 clicks OR ≥50 impressions last week. |
| **ctr-gap-opportunity** | Position 3–10, ≥20 impressions, CTR < 1% — visible but not clicked. **The "Brann-Dailor pattern."** Almost always title/snippet mismatch, not a ranking problem. |
| **big-win** | Position improved ≥3 (with ≥10 current impr), OR impressions ≥2x (with ≥20 current), OR clicks 0→≥1 (with ≥10 impressions). |
| **new** | Did not appear last week, ≥5 impressions this week. |
| **null** | Movement within the noise band. |
| **noise** | Sub-threshold (e.g. new with <5 impr, gone but had <5 clicks). |

## Umbrella issue lifecycle

The umbrella (`gsc-watch` + `seo-proposal` labels) only opens for **actionable** classes (big-loss + disappeared + ctr-gap-opportunity):

| `actionable` count | Issue state | Action |
|---|---|---|
| > 0 | none open | **create** |
| > 0 | one open | **edit body in place** + refresh comment |
| 0 | one open | **close** with summary |
| 0 | none open | no-op (snapshot still commits) |

Wins/news/nulls/noise stay in the committed snapshot file, not the issue — keeps the queue noise-free.

## How the CEO uses this

The CEO Agent prompt (`.agents/ceo/PROMPT.md`) reads `.agents/seo/gsc-watch-snapshot.md` before triaging any new `seo-proposal`. Decision rules already in the prompt:

- 🏆 **big-win** → append the on-page format pattern to `.agents/seo/learned-patterns.md`; promote similar `seo-proposal` issues when triaging.
- ⚠️ **big-loss** → open `ai-fix` issue: `GSC regression: "<query>" pos X → Y`.
- 🔥 **ctr-gap-opportunity** → open ONE `ai-fix` per cluster citing the title/snippet/content gap (the highest-leverage column — pos 3–10 is "almost ranking", a dedicated page often unlocks it).
- 🌑 **disappeared** → cross-check with `broken-images` umbrella; if both flag the same page, escalate to `human-founder`.
- 🌟 **new queries** clustering on an entity we don't have a dedicated page for → file a programmatic-page issue.
- 😐 **null after 3 consecutive weeks** for an intent cluster → mark `do-not-promote` in `learned-patterns.md`.

## Required secrets

Reused from CEO agent — already configured:
- `GA_SERVICE_ACCOUNT_JSON`
- `GSC_SITE` (e.g. `https://metalforge.io/`)

## Cost

- GSC API: free (within standard quotas; this loop uses 1 query/week).
- Compute: ~30s/run.
- Storage: each history JSON ~50–500 KB, kept indefinitely (12 weeks rolling = <6 MB).

## How this composes with the rest

| Loop | Cadence | Gates which KPI |
| --- | --- | --- |
| `check-broken-images.yml` | weekly Mon 06:30 UTC | Crawl health → indexation |
| `check-llm-citations.yml` (L2) | weekly Mon 07:30 UTC | AI citations / week |
| **`check-gsc-watched-queries.yml` (L1, scan-all)** | **weekly Mon 08:00 UTC** | **Google organic position / clicks** |

All three pass the article's 4-box test (repeat weekly, deterministic auto-reject, end-to-end, "done" is objective) — unlike the LLM-driven CEO/SEO/Ralph loops which still self-grade.
