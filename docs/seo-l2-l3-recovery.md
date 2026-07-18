# L2 / L3 recovery — analysis, decisions, and open items

*Founder-commissioned analysis, 2026-07-16 ("I am not happy with L2 and L3"). This is the
durable record: what was found, what shipped, what remains, and how to verify it worked.
Read this before proposing any L2/L3 change — do not re-derive the analysis from scratch.*

---

## The findings (2026-07-16)

### L3 — the headline number was measuring an 8% sample, forever

1. **No rotation.** `check-indexation.cjs` promised rotation in its header comment but
   inspected the same fixed top-500-priority slice every week. 90%+ of sitemap URLs had
   never been inspected once. The digest's "74.6% indexed" described only that slice.
2. **Sitemap bloat.** 6,523 URLs, of which two-thirds were low-value:
   - 2,211 `/vs/` all-pairs drummer comparisons (67×66/2) — demand evidence: **2 of 335**
     GSC queries with impressions were vs-queries (10 impressions combined).
   - ~1,900 `/llms/**.md` mirrors — built for AI crawlers (discovered via `llms.txt`),
     but the sitemap invited *Google* to crawl them as near-duplicate markdown copies.
   - For a low-authority domain this dilutes crawl budget and drags down the perceived
     average quality of the site.

### L2 — flat 8/84, three stacked problems

1. **Single-provider lens.** KPI names Perplexity + ChatGPT + AI Overviews; only a
   `PERPLEXITY_API_KEY` exists, so the checker measures 1 of 3 surfaces.
2. **Polluted denominator.** The GSC auto-merge (≥5 impressions) imported junk queries
   (`fiafap`, `blake richardson actor/movies`, `jason cavalera`) and burns slots on
   near-duplicate variants (6× "joey jordison drum kit/set/setup/gear").
3. **Wrong lever.** The wins (Eloy, Greiner, Duplantier, Hellhammer, Lateralus) are all
   **niche entities where our page is the best on the internet**. Losses are head terms
   lost to authority (moderndrummer/drumeo) or queries where Perplexity cites no gear
   site at all. Schema/FAQ refinements had hit their ceiling — **L2 grows through
   citable facts nobody else has** (drum-chair histories #4753, verified BPMs #4758,
   data studies #4763) **and domain authority** (studies backlinks), not more on-page
   passes.

---

## What shipped

| Fix | PR | Status |
| --- | --- | --- |
| **#1 Sitemap diet** — `/llms/**.md` dropped from sitemap; `/vs/` gated by `VS_DEMAND_DRUMMERS` (24 GSC-evidenced slugs) → 6,523 → ~2,800 URLs. Pages stay live; reversible in one commit. | #4867 (2026-07-16) | ✅ live |
| **#2 L3 rotation + full-site proxy** — 250 fixed sentinels (WoW-comparable) + 250 rotating (full sitemap per ~11 runs, cursor in history JSON); plus `earningPages`: GSC Search-Analytics-by-page, 90d — pages with ≥1 impression are indexed by definition, zero inspection quota. Digest shows both. | #4868 (2026-07-16) | ✅ live |
| Digest clarity — L3 states its sample honestly; L1/L2 lines in plain PT; "só Perplexity" caveat. | #4867/#4868 | ✅ live |

## Open items (approved in analysis, NOT yet approved to ship)

| # | Item | Blocker |
| --- | --- | --- |
| 3 | **Clean L2 targets** — purge junk gsc-derived queries, add relevance filter (gear/drum token or known entity) to the auto-merge in `check-llm-citations.cjs`, dedupe to one-per-entity-per-intent. Makes the KPI honest immediately. | founder go |
| 4 | **Second L2 provider** — OpenAI web-search API exposes citations; `PROVIDERS` table in `check-llm-citations.cjs` is pluggable. | **founder must create an OpenAI API key** (~$5–10/mo at weekly cadence; ChatGPT subscription does NOT cover API) |
| 5 | **CEO prompt L2 strategy note** — citable-fact creation + authority over further schema passes. | founder go |

## How to verify the fixes worked (expectations + dates)

- **Sitemap diet**: Google re-reads the sitemap within days; crawl re-concentration takes
  1–3 weeks. Watch: `discovered-not-indexed` count falling in L3 snapshots;
  `earningPages.inSitemap` rising over the following weeks.
- **Earning-pages baseline**: the FIRST run's full-site number will look low vs the old
  74.6% — that is not a regression, it's the first honest full-site measurement.
- **Rotation**: `rotationCursor` in `.agents/seo/indexation-history/<date>.json` must
  advance ~250/run and wrap at ~2,550. Full-coverage cycle ≈ 11 weekly runs
  (first complete pass ≈ end of September 2026).
- **L2**: do not judge L2 progress by 8/84 until item #3 ships (the denominator is
  dirty). After the bands/songs/studies epics land, expect wins to appear first on
  "who is the drummer of X" / "what bpm is X" / study-stat queries.

## Standing rules extracted (also in `.agents/seo/learned-patterns.md`)

- **Never re-add `/llms/**.md` mirrors to the sitemap.** They are for AI crawlers via
  `llms.txt`; to Google they are duplicate markdown.
- **`/vs/` pages enter the sitemap only via `VS_DEMAND_DRUMMERS`** (grow the set from
  GSC evidence, never by intuition) or the curated narrative list in `api/sitemap.js`.
- **Combinatorial page generation (all-pairs, all-combos) is banned without a demand
  gate** — the /vs/ matrix is the cautionary tale: 2,211 pages, ~0 demand, 34% of the
  sitemap.
- **Any sampled metric must state its sample in every surface that reports it** (digest,
  snapshot, issues). The "74.6% indexed" ambiguity hid the blind spot for weeks.
