# Internationalization (i18n) plan — multilingual SEO

> **STATUS: ON HOLD — do not implement.**
> Founder decision (2026-07-11): wait for more GSC data before starting.
> This document is the agreed plan for when the gate below opens. Agents
> (CEO/SEO/Roadie) must NOT file or promote issues from this plan until the
> founder explicitly green-lights it.

## Unlock criteria (all three, checked against L1/L3 verifier data)

1. **English indexation first.** L3 indexation of the sampled set ≥ ~50–60%
   (baseline 2026-06-29: **~21%** — 106/500 indexed of 3,264 sitemap URLs).
   Translating while most English pages are "discovered – not indexed" would
   multiply the crawl-budget/quality problem, not the traffic.
2. **Geo data exists.** `fetch-metrics.cjs` extended with a `country`
   dimension (GA4 + GSC) and at least ~8 weeks of data showing which
   non-English markets already generate impressions.
3. **Founder go.** Explicit approval, choosing the pilot language from that
   geo data.

## Why subdirectories + hreflang (the 4 pillars Google needs)

1. **Language subdirectories** — `/de/drummer/lars-ulrich`, `/pt/...`, `/es/...`.
   Not subdomains, not ccTLDs: subdirectories inherit metalforge.io's existing
   authority; the alternatives fragment it.
2. **Bidirectional `hreflang`** on every page — each language version lists all
   others plus `x-default` (English). Must be emitted where bots can see it:
   the **`api/meta` SSR head** (crawlers don't run the SPA's JS) and/or the
   **sitemap** via `xhtml:link` alternates — the sitemap route is the easiest
   to maintain programmatically at thousands of URLs (extend
   `scripts/generate-sitemap.mjs`).
3. **Sitemap lists every language variant** as its own URL with hreflang
   alternates.
4. **Never auto-redirect by IP/Accept-Language.** Googlebot crawls from the
   US; an auto-redirect hides the other languages from it. A dismissible
   "view this in Deutsch?" banner is fine; a redirect is not.

Quality rule: Google treats **unreviewed machine translation as scaled-content
spam**. AI translation is acceptable when reviewed and genuinely useful for the
locale. Claude-pipeline translation is fine — raw bulk MT of 3k pages is not.

## Structural advantage

The site is data-driven: thousands of pages come from data modules + templates.
So i18n cost ≠ "translate 3,264 pages":

- **UI/template strings** — one dictionary per language (cheap, one-time).
- **Prose fields in data modules** (bios, kitOverviews, album articles,
  comparisons…) — the real translation workload; Roadie can batch it like any
  content pipeline.
- **Gear specs stay untranslated** (product names are universal).

## Phased rollout

### Phase 0 — decide languages with data (can run any time, low cost)
- Add `country` dimension to `.agents/scripts/fetch-metrics.cjs` (GA4 + GSC)
  and surface a per-country impressions table in `metrics.md` / the digest.
- Hypothesis to validate, not assume: **DE** (largest metal market per capita),
  **PT-BR** (huge audience; founder writes Portuguese), **ES** (LATAM volume).
  Pick the pilot language from actual impressions, not vibes.

### Phase 1 — i18n infrastructure (one-time, no content yet)
- Locale-prefixed routing (`/<lang>/...`) in `vercel.json` + App.js locale
  context; UI string dictionary.
- `hreflang` emission in `api/meta` SSR head + sitemap alternates
  (`xhtml:link`), `x-default` → English.
- Locale-aware canonical URLs. No IP/language redirects.

### Phase 2 — surgical pilot (1 language × ~100 pages)
- Only pages with **existing impressions/rankings** (top drummer pages +
  top-traffic articles). Human-quality AI translation of prose fields, reviewed.
- Measure 4–6 weeks via L1/L3: do the translated URLs index? Do they earn
  impressions in the target country? Define kill/scale thresholds up front.

### Phase 3 — scale what worked
- Language by language, page-type by page-type, in Roadie batches.
- **L3 is the guard-rail:** if overall indexation degrades after a batch,
  pause expansion.
- Later: localized `llms.txt` surfaces, localized structured data.

## Explicitly out of scope until Phase 2 proves out
- Translating the long tail (licks, price-history, comparison grids).
- New ccTLDs/subdomains, translated newsletter, localized social pipelines.

## Notes
- Meanwhile, the single highest-leverage SEO work remains **raising English
  indexation** (79% of the site invisible to Google outweighs any new language)
  and climbing existing rankings (avg position ~9 → top 3).
