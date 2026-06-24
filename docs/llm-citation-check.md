# LLM citation check

Weekly automated test that measures the **"AI citations / week"** sub-KPI directly. For each query in `.agents/llm-citation-targets.json`, ask an LLM the question and check whether `metalforge.io` appears in the response body or in the cited URLs. Track the gaps via a **single auto-maintained GitHub issue**, same lifecycle as the broken-images check.

## Why this exists

The CEO roadmap lists "AI citations / week (Perplexity + ChatGPT)" as a primary sub-KPI, currently marked _not yet tracked_. This loop is the cheapest, most direct way to make that number real: a deterministic verifier (`metalforge.io` substring + URL host check) on a real LLM response, week over week, producing actionable follow-ups.

It is the **only loop** in this repo so far that puts an LLM in the verifier seat with an objective gate, instead of self-grading. The article that motivated this design (Kopadze, Loops Explained) calls this out as the heart of any production loop:

> Verify is the heart of the loop. Without a real check on the result, you do not have a loop, you have the agent agreeing with itself on repeat.

## Pieces

| File | Role |
| --- | --- |
| `.agents/llm-citation-targets.json` | **Hand-curated override list.** Brand queries, new pages not yet in GSC, future bets. Edit freely — re-read every run. Includes a `_competitors` allowlist used to flag which rival sites win the queries we lose. |
| `.agents/seo/gsc-history/<latest>.json` | **Auto-source.** v2 reads the most recent L1 snapshot and pulls every query with ≥5 impressions AND position ≤20. So queries with real organic traffic are auto-tested for LLM citation — no manual curation. |
| `.agents/scripts/check-llm-citations.cjs` | Pure crawler. Merges curated + GSC-derived (deduped, capped at 100 total, sorted by impressions desc). For each query, fires every configured provider, parses body + citations, classifies into `us` / `competitor` / `other`. No GitHub calls. |
| `.agents/scripts/render-llm-citation-issue.cjs` | Pure transform. JSON report → Markdown issue body, split into ❌ Not cited / ✅ Cited / ⚠️ Errored. |
| `.github/workflows/check-llm-citations.yml` | Mutator. Cron `30 7 * * 1` (Mondays 07:30 UTC) + `workflow_dispatch`. Opens / edits / closes the umbrella issue. |

## Required secret

- `PERPLEXITY_API_KEY` — Pro tier ~$5/mo covers ~50 queries/week. Add at Settings → Secrets and variables → Actions.

If the secret is absent the workflow exits 1 **before** touching any issue. Safe to merge before configuring.

## Umbrella issue lifecycle

| Crawler result | Issue state | Action |
|---|---|---|
| `notCited > 0` | none open | **create** with labels `llm-citations` + `seo-proposal` |
| `notCited > 0` | one open | **edit body in place** + refresh comment |
| `notCited = 0` | one open | **close** with "all clear" comment |
| `notCited = 0` | none open | no-op |

## How to act on the report

Per the article's "cost per accepted change" framing, the goal is not to track citations — it's to **close** the gap on the queries that matter.

For each row in **❌ Not cited anywhere**:

1. Open the competitor URL listed in the "Competitors winning" column.
2. Identify the format the LLM is choosing them for. Common patterns: FAQ schema with the exact question phrased the same way; a `<h2>` with the exact query as text; LLM-friendly markdown index (`/llms/<entity>.md`); rich `Article` JSON-LD with `about: { @type: Person }`.
3. Find the equivalent MetalForge page (column `target_entity` points at it).
4. Open one `ai-fix` issue: "Match competitor format for query 'X' — gap is Y".
5. Ralph implements. Next weekly run confirms whether the gap closed.

## Local run

```bash
PERPLEXITY_API_KEY=pplx-... \
  node .agents/scripts/check-llm-citations.cjs \
    --targets .agents/llm-citation-targets.json \
    --out /tmp/llm-citations.json

node .agents/scripts/render-llm-citation-issue.cjs \
  --report /tmp/llm-citations.json \
  --out /tmp/issue-body.md
```

Flags on the crawler:

- `--targets <path>` — alternative target list (default `.agents/llm-citation-targets.json`)
- `--providers perplexity` — restrict to a subset (default: every provider with its env key set)
- `--delay 1500` — ms between queries to be polite + dodge 429
- `--timeout 60000` — per-request timeout
- `--out <path>` — output JSON

## Adding more providers

Each provider is a function `(query) -> { body, citations[] }` registered in the `PROVIDERS` table in `.agents/scripts/check-llm-citations.cjs`. To add OpenAI's Responses API with `web_search`, or Claude with web search, follow the same shape. The renderer auto-adapts: every provider becomes a column in the "Not cited" table.

## How the GSC merge works (v2)

L2 closes the loop with L1: any query that's getting Google organic traffic is automatically tested for LLM citation too, so you measure both channels for the same intent. The script:

1. Reads `.agents/llm-citation-targets.json` (curated — always kept).
2. Reads the most recent file in `.agents/seo/gsc-history/`.
3. Filters GSC queries: `impressions ≥ 5` AND `position ≤ 20` (configurable via `--gsc-min-impressions` and `--gsc-max-position`).
4. Sorts GSC-eligible by impressions descending.
5. Merges curated + GSC-derived, dedupes by lowercase query string, caps at 100 total (`--cap`).

With ~186 queries in a typical week's GSC, ~40 pass the filter. Combined with 25 curated → ~65 queries tested per run.

If the gsc-history directory doesn't exist yet (first time, or L1 hasn't run), the script falls back gracefully to curated-only and logs that it would have merged more.

## Cost model

Perplexity sonar pricing (mid-2026): ~$1 per 1M input tokens + $1 per 1M output tokens. A typical query consumes a few thousand tokens. At 50 queries × 4 weeks ≈ 200 calls / month, you should land under $5.

If the bill creeps above expectations, the `--providers` flag can pin to a single cheap provider and the cron cadence can drop to bi-weekly without losing the loop's value.
