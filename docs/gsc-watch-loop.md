# GSC watch loop (L1)

Weekly auto-test that closes the loop on the **SEO Agent → CEO → Ralph → merged PR** pipeline. For each query you put on the watch list, it measures whether the work shipped against that query actually moved the ranking in the next 7+ days. Patterns that consistently **win** get re-enforced; patterns that consistently **null** get flagged for de-prioritisation.

## Why this exists

Today the CEO Agent / SEO Agent / Ralph chain produces dozens of PRs a week, none of which are objectively verified against the outcome they were filed for. That's the article's "Ralph Wiggum loop" failure mode at scale — the agent declares done, ships, the loop keeps running. This loop adds the missing **external verifier** so the chain learns instead of just iterating.

Pairs with L2 (`check-llm-citations.yml`): L2 measures AI-citation movement, L1 measures Google-organic movement. Together they cover both legs of the primary KPI ("indexed pages × organic CTR") with deterministic gates.

## Pieces

| File | Role |
| --- | --- |
| `.agents/seo/watched-queries.json` | The watch list — each entry is a query you track over time, with baseline numbers captured when you add it. Edit freely; re-read every run. |
| `.agents/scripts/check-gsc-watched-queries.cjs` | Pure crawler. For each watch, fetches the last 7 days via Search Console API, compares to baseline, classifies. Pure: JSON in → JSON out, no GitHub calls. |
| `.agents/scripts/render-gsc-watch-issue.cjs` | Pure transform. JSON → Markdown for both the umbrella issue AND `.agents/seo/gsc-watch-snapshot.md` (the CEO Agent reads the latter every run). |
| `.github/workflows/check-gsc-watched-queries.yml` | Mutator. Cron `0 8 * * 1` (Mondays 08:00 UTC) + `workflow_dispatch`. Opens / edits / closes the umbrella issue. Commits the refreshed snapshot. |

## Classification rules

| Class | Trigger |
| --- | --- |
| **win** | Position improved ≥3, OR impressions doubled, OR clicks went from 0 to ≥1. |
| **loss** | Position worsened ≥3, OR impressions dropped ≥50%, OR clicks halved. |
| **mixed** | At least one win and one loss signal on the same query. |
| **null** | Within the noise band. |
| **no-data** | Query did not surface at all in the current 7-day window. |
| **baselining** | Entry was added without a baseline; this run records it. |

## Required secrets

Same as the CEO/SEO Agent workflows — already configured:

- `GA_SERVICE_ACCOUNT_JSON` — Google service-account credentials JSON
- `GSC_SITE` — e.g. `https://metalforge.io/`

## Umbrella issue lifecycle

The umbrella issue (`gsc-watch` + `seo-proposal` labels) only opens when there is a **loss** to act on:

| Crawler result | Issue state | Action |
|---|---|---|
| `losses > 0` | none open | **create** umbrella issue |
| `losses > 0` | one open | **edit body in place** + refresh comment |
| `losses = 0` | one open | **close** with summary |
| `losses = 0` | none open | no-op (snapshot still gets committed) |

Wins/nulls/baselining are surfaced via the committed snapshot file, not the issue — keeps the issue queue noise-free.

## Adding a query to the watch list

```bash
# Print a ready-to-paste entry with current 7-day numbers as the baseline
GOOGLE_APPLICATION_CREDENTIALS=/path/to/sa.json GSC_SITE='https://metalforge.io/' \
  node .agents/scripts/check-gsc-watched-queries.cjs \
    --query 'matt greiner blast beat' \
    --baseline
```

Paste the printed JSON into the `watches` array in `.agents/seo/watched-queries.json`, fill `target_entity` and `source_issue`, commit.

If you have no baseline yet, leave the `baseline_*` fields as `null` and the next run will record them as the baseline ("baselining" class).

## How to act on the report

- 🏆 **Wins** → note the merged PR / on-page format that moved each query. Add the pattern to `.agents/seo/learned-patterns.md` (manual or via CEO Agent prompt evolution).
- ⚠️ **Losses** → open `ai-fix` issue: "Investigate ranking regression for `<query>`". Often caused by a recent merge that displaced the right content (a new article ranking instead of the target page, schema regression, etc.).
- 😐 **Null after 60+ days from `added_at`** → remove from the watch list OR pivot the content strategy for that intent cluster.
- 🌑 **No-data** → page may have been deindexed; cross-check with the broken-images report and GSC coverage.
- 🌱 **Baselining** → no action; baseline records next run.

## Cost

- GSC API: free (within standard quotas — ~2000 queries/day, this loop uses tens).
- Compute: ~30s/run × 4 runs/month = negligible.

## How this composes with the rest

| Loop | Cadence | KPI it gates |
| --- | --- | --- |
| `check-broken-images.yml` | weekly Mon 06:30 UTC | Crawl health → indexation |
| `check-llm-citations.yml` (L2) | weekly Mon 07:30 UTC | AI citations / week |
| **`check-gsc-watched-queries.yml` (L1)** | **weekly Mon 08:00 UTC** | **Google organic position / clicks** |

All three are pure-script loops with deterministic verifiers — they pass the article's 4-box test cleanly, unlike the LLM-driven loops (CEO/SEO/Ralph) which still self-grade.
