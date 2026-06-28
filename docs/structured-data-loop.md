# Structured-Data Validation loop

Weekly automated check that the **live, rendered JSON-LD** on metalforge.io pages carries the fields Google requires for each schema `@type`. Catches the class of bug Google Search Console flags as *"VideoObject — Missing field `uploadDate`"* **before** Google does — and before it silently drops the rich result.

This is a **quality verifier**, not an L-numbered SEO impact loop (L1/L2/L3 measure real-world outcomes — organic position, AI citations, index coverage). Structured-data validation gates page hygiene, alongside the broken-image and broken-video sweeps.

## Why this exists

The incident: GSC flagged VideoObject nodes across lick pages as *"Missing field `uploadDate`"*. The JSON-LD is assembled **at render time** from the data modules — so the missing field never appeared in any source file as a literal. That means:

- **`node --check` can't catch it** — the syntax is fine; the *value* is absent.
- **A build-time lint can't catch it** — the JSON-LD object is constructed dynamically; the gap only exists in the shipped HTML.
- **`verify-data-modules.yml` can't catch it** — that gate proves the modules `import()`, not that the rendered schema is complete.

The only place the bug is observable is the **rendered output of a live page**. By the time GSC reports it, the rich result is already gone and re-earning eligibility takes a recrawl cycle. This loop closes that gap: every Monday it pulls the real JSON-LD off live pages and asserts Google's required-field set per `@type`.

## Pieces

| File | Role |
| --- | --- |
| `.agents/scripts/check-structured-data.cjs` | Pure crawler. Fetches `metalforge.io/sitemap.xml`, samples a type-balanced slice, fetches each page's HTML, extracts every `application/ld+json` block, flattens `@graph`, validates each node against the ruleset. No GitHub calls. |
| `.agents/scripts/render-structured-data-issue.cjs` | Pure transform. JSON → Markdown for the umbrella (actionable failures, grouped `@type` → field → URLs) and the snapshot file (every scanned URL by class). |
| `.github/workflows/check-structured-data.yml` | Mutator. Cron `0 10 * * 1` + `workflow_dispatch`. Self-tests the rule engine, runs the crawler + renderer, maintains one idempotent umbrella issue, commits snapshot + history. Uses only `GITHUB_TOKEN`. |
| `.agents/seo/structured-data-history/YYYY-MM-DD.json` | Per-week cache (class + problem keys per URL). Used to compute WoW deltas (new failures vs fixed). |
| `.agents/seo/structured-data-snapshot.md` | CEO Agent reads this on every run. |

## The ruleset (Google-required fields only)

Only Google's documented *required* fields are checked — recommended fields are deliberately excluded to keep the signal actionable and noise-free. A type not in this table is ignored entirely (no false positives on schema we don't gate).

| `@type` | Required fields asserted |
| --- | --- |
| `VideoObject` | `name`, `description`, `thumbnailUrl`, `uploadDate` |
| `Article` / `BlogPosting` / `NewsArticle` | `headline`, `image`, `datePublished` |
| `FAQPage` | `mainEntity` (non-empty); each Question needs `name` + `acceptedAnswer.text` |
| `HowTo` | `name`, `step` (non-empty) |
| `MusicAlbum` | `name` |
| `MusicRecording` | `name` |
| `BreadcrumbList` | `itemListElement` (non-empty); each needs `position` + `name` + `item` |
| `Product` | `name`, `offers` |

"Present" means present **and non-empty**: `""`, `[]`, `{}`, `null`, and `undefined` all fail. A node's `@type` may be a string or an array; every type in it is checked.

## Classification

Each scanned URL gets exactly one class:

| Class | Trigger | Actionable |
| --- | --- | --- |
| `ok` | Every JSON-LD node passed its ruleset. | No |
| `missing-fields` | At least one node is missing/empty a required field (records exact `@type` + field list). | **YES** |
| `invalid-json` | A `<script type="application/ld+json">` block failed `JSON.parse`. | **YES** |
| `no-jsonld` | Page emitted no JSON-LD. | Context only (intentional on some routes) |
| `page-error` | Page fetch failed (non-2xx / network). | Investigate (overlaps the indexation loop) |

## URL sampling

The sitemap is grouped by URL *type* (path shape): `/articles/*`, `/drummers/*/licks/*`, `/drummer/*`, `/guides/*`, `/bands/*`, `/lists/*`. `/llms/*` is excluded. Within each type, URLs are ordered by `<priority>` descending, then the sample is built **round-robin across types** so every type gets coverage before any single type is exhausted. Total is capped (default **150**, `--limit` / workflow input).

There is **no silent truncation**: the run logs (and the issue/snapshot show) how many URLs of each type were sampled vs skipped when the cap is hit (`type=licks sampled 60/420 (360 not scanned)`).

## Umbrella issue lifecycle

The umbrella (`structured-data` + `seo` labels, keyed by the title prefix `Structured-data`) **only stays open** while there are actionable failures:

| Result | Issue state | Action |
|---|---|---|
| `actionable > 0` | none open | **create** |
| `actionable > 0` | one open | **edit body in place** + comment |
| `actionable = 0` | one open | **close** with all-clear comment |
| `actionable = 0` | none open | no-op (snapshot still commits) |

`actionable = missing-fields + invalid-json`. The body lists failures grouped `@type` → field → URL list, plus a one-line summary (`X scanned · Y clean · Z with issues · WoW +new/−fixed`).

## Week-over-week deltas

Each run diffs against the most recent prior `structured-data-history/*.json`: a URL that was clean last week and fails now is a **new failure** (highlighted in the umbrella); one that failed and is now clean is **fixed**. This is how a regression introduced by a recent merge surfaces fast.

## No API key by design

Unlike L2 (Perplexity) or L1/L3 (GSC service account), this loop needs **no external API and no secret beyond the built-in `GITHUB_TOKEN`** — it only fetches public HTML and parses it locally. That keeps it cheap, free of quota, and trivial to run anywhere.

## Self-test

`check-structured-data.cjs --self-test` runs the field-validator against two inline fixtures with **no network**:

- a **GOOD** graph (VideoObject with all 4 fields, valid Article + FAQPage) → must yield **zero** failures;
- a **BAD** graph (VideoObject missing `uploadDate`, FAQPage with empty `mainEntity`) → must yield **exactly** those two failures;
- plus a malformed block → must classify `invalid-json`.

It exits non-zero on any mismatch. The workflow runs it as a sanity gate **before** the crawler, so a broken ruleset can never silently pass.

## CEO Agent behaviour

The CEO Agent reads `.agents/seo/structured-data-snapshot.md` every run, alongside the L1/L2/L3 snapshots. Decision rules:

- **`missing-fields` clustered on a route pattern** → open an `ai-fix`: e.g. *"All `/drummers/*/licks/*` VideoObject nodes missing `uploadDate` — backfill date into the lick records / renderer."* This is the highest-leverage fix: one template change clears dozens of URLs.
- **`invalid-json`** → open an `ai-fix` for the offending template's serializer (unescaped quote, trailing comma, `undefined` interpolated).
- **New WoW failures** → urgent; cross-check against recent merges.
- **Clean share % WoW** → log to `learned-patterns.md` if it moves significantly.

## Local run

```bash
# Real crawl (needs network access to metalforge.io)
node .agents/scripts/check-structured-data.cjs \
  --history-dir .agents/seo/structured-data-history \
  --limit 50 \
  --json /tmp/structured-data.json

node .agents/scripts/render-structured-data-issue.cjs \
  --report /tmp/structured-data.json \
  --issue /tmp/issue-body.md \
  --snapshot /tmp/structured-data-snapshot.md

# Rule-engine only (no network)
node .agents/scripts/check-structured-data.cjs --self-test
```

## How this composes with the rest

| Loop | Cadence (UTC) | Gates |
| --- | --- | --- |
| `check-broken-images.yml` | Mon 06:30 | Image hygiene |
| `check-llm-citations.yml` (L2) | Mon 07:30 | AI citations / week |
| `check-gsc-watched-queries.yml` (L1) | Mon 08:00 | Google organic position |
| `check-indexation.yml` (L3) | Mon 09:00 | Indexed page count |
| **`check-structured-data.yml`** | **Mon 10:00** | **Rich-result eligibility (JSON-LD completeness)** |

It runs last in the Monday chain so it never competes for runner time with the impact verifiers. Where L3 asks *"is the page indexed?"*, this loop asks *"is the page's structured data complete enough to earn the rich result?"* — the next eligibility tier up.
