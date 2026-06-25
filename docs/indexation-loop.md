# Indexation Health loop (L3)

Weekly automated check on how many of our sitemap URLs Google actually indexes — and which ones got rejected, broke, or regressed. Closes the most expensive gap in the SEO pipeline: pages that ship but never reach the index.

## Why this exists

Every URL in `sitemap.xml` was paid for in Ralph minutes + Claude tokens. Google typically indexes 40–60% of declared sitemap URLs for a site of MetalForge's authority. The rest sit in two purgatories:

- **Crawled - currently not indexed** — Google fetched the page and explicitly decided it wasn't worth indexing. **This is a content-quality signal.** Either expand and improve, or remove from sitemap.
- **Discovered - currently not indexed** — Google found the URL (likely via sitemap) but never crawled it. **This is an internal-linking signal.** Boost via hub pages or related-entity chains.

Before L3, these were invisible. The CEO had no way to know whether the article Ralph just merged actually landed in Google's index. L3 closes that — every Monday morning, every URL in the sitemap gets its index status inspected and classified.

Pairs with L1 (organic position) and L2 (LLM citations) as the third deterministic verifier in the SEO pipeline.

## Pieces

| File | Role |
| --- | --- |
| `.agents/scripts/check-indexation.cjs` | Pure crawler. Fetches `metalforge.io/sitemap.xml`, takes top-N by priority, calls GSC URL Inspection API for each, classifies. |
| `.agents/scripts/render-indexation-issue.cjs` | Pure transform. JSON → Markdown for both umbrella (actionable only) and snapshot file (every URL by class). |
| `.github/workflows/check-indexation.yml` | Mutator. Cron `0 9 * * 1` + `workflow_dispatch`. Idempotent umbrella + commits snapshot + history. |
| `.agents/seo/indexation-history/YYYY-MM-DD.json` | Per-week cache. Used to detect WoW regressions (was indexed → now not). |
| `.agents/seo/indexation-snapshot.md` | CEO Agent reads this on every run. |

## Classification rules

| Class | Trigger (Google GSC coverage state) | Actionable |
| --- | --- | --- |
| `indexed` | Submitted and indexed (PASS verdict) | No |
| `indexed-with-issues` | PARTIAL verdict (mobile usability, etc.) | Investigate if high-traffic |
| `crawled-not-indexed` | "Crawled - currently not indexed" | **YES** — quality issue, fix or remove |
| `discovered-not-indexed` | "Discovered - currently not indexed" | Internal-link boost |
| `error-404`, `error-5xx`, `soft-404` | Broken | **YES** — fix or remove from sitemap |
| `duplicate` | "Duplicate without user-selected canonical" | **YES** — set canonical |
| `excluded-noindex` | Page declares `noindex` | No (intentional) |
| `redirect-or-canonical` | Redirect chain / alt canonical | No |
| `blocked-by-robots` | robots.txt forbids | Investigate if unintentional |

## Umbrella issue lifecycle

The umbrella (`indexation-watch` + `seo-proposal`) **only opens** when actionable classes are non-empty (or there are regressions):

| Result | Issue state | Action |
|---|---|---|
| `actionable > 0` | none open | **create** |
| `actionable > 0` | one open | **edit body in place** + comment |
| `actionable = 0` | one open | **close** with all-clear comment |
| `actionable = 0` | none open | no-op (snapshot still commits) |

## Quota

GSC URL Inspection API has a hard cap of **2000 inspections/day** per property. The script caps at **500 URLs per run** by default (configurable via `--max-urls` or workflow input). With ~2000 sitemap URLs, top-priority pages get re-inspected weekly; lower-priority ones rotate over ~4 weeks.

## Required secrets

Already configured for the CEO Agent — no new ones needed:
- `GA_SERVICE_ACCOUNT_JSON` — service account must have `Read & Analyze` access on the GSC property
- `GSC_SITE` — e.g. `https://metalforge.io/`

## CEO Agent behaviour

The CEO Agent prompt reads `.agents/seo/indexation-snapshot.md` every run, alongside L1 and L2 snapshots. Decision rules:

- 🔴 **crawled-not-indexed clustered on a route pattern** → open `ai-fix` issue: "Expand `/articles/X-drum-setup` template — N URLs flagged Crawled-not-indexed (Google rejected content quality)".
- 💥 **error-404 / error-5xx** → open `ai-fix` per pattern.
- 🔁 **duplicate** → set canonical or merge content.
- ⚠️ **regressions** → urgent. Cross-check the recent merges.
- 🌫️ **discovered-not-indexed clustered on a route** → file internal-linking batch.
- **Indexed share % WoW** → log to learned-patterns.md if it moves significantly.

## Local run

```bash
GOOGLE_APPLICATION_CREDENTIALS=/path/to/sa.json \
GSC_SITE='https://metalforge.io/' \
node .agents/scripts/check-indexation.cjs \
  --history-dir .agents/seo/indexation-history \
  --max-urls 100 \
  --out /tmp/indexation.json

node .agents/scripts/render-indexation-issue.cjs \
  --report /tmp/indexation.json \
  --issue /tmp/issue-body.md \
  --snapshot /tmp/indexation-snapshot.md
```

## How this composes with the rest

| Loop | Cadence | Gates which KPI |
| --- | --- | --- |
| `check-broken-images.yml` | weekly Mon 06:30 UTC | Page hygiene |
| `check-llm-citations.yml` (L2) | weekly Mon 07:30 UTC | AI citations / week |
| `check-gsc-watched-queries.yml` (L1) | weekly Mon 08:00 UTC | Google organic position / clicks |
| **`check-indexation.yml` (L3)** | **weekly Mon 09:00 UTC** | **Indexed page count** (the input to L1) |

L3 measures the input (indexed pages); L1 measures the throughput (organic position); L2 measures the AI channel. Together they cover the full "indexed pages × organic CTR" KPI from the roadmap.
