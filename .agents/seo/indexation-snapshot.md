# Indexation Health — weekly snapshot

*Auto-written by `.github/workflows/check-indexation.yml`. CEO Agent: read this every run when deciding which pages need content expansion or internal-link boosting.*

**Generated:** 2026-11-23T09:29:33.277Z
**Site:** https://metalforge.io/
**Sitemap URLs total:** 3157 · **Inspected this run:** 500 (cap 500)
**Selection:** 250 fixed sentinels (top priority, same every run — trend-comparable) + 250 rotating (full sitemap covered every ~12 runs; cursor now 1838)
**Compared against:** 2026-11-16.json

**Counts:** `indexed`=448 · `duplicate`=5 · `crawled-not-indexed`=25 · `unknown`=8 · `discovered-not-indexed`=12 · `redirect-or-canonical`=2

**Indexed share (this run's sample):** 448 / 500 = **89.6%**
**Sentinel indexed share (week-over-week comparable):** 222 / 250 = **88.8%**
**Full-site proxy:** 2282 of 3157 sitemap URLs earned ≥1 Google impression in the last 90d (a page with impressions is indexed by definition; the inverse is not guaranteed)

## Classification map

| Class | What it means | Actionable? |
| --- | --- | --- |
| `indexed` | Submitted and indexed. ✅ | No |
| `indexed-with-issues` | Indexed but PARTIAL verdict (mobile usability, etc.) | Investigate when high-traffic |
| `crawled-not-indexed` | Google saw it, decided not to index it. **Quality issue.** | **YES** — improve content, expand, or remove from sitemap |
| `discovered-not-indexed` | Google found the URL but never crawled it. **Internal-link issue.** | Boost via internal linking, hub pages |
| `excluded-noindex` | Page tells Google not to index (`noindex` meta). | No (intentional) |
| `redirect-or-canonical` | URL redirects or alt-canonical-points-elsewhere. | No |
| `duplicate` | Duplicate without canonical pointer. **Canonical issue.** | Set canonical or merge |
| `error-404`, `error-5xx`, `soft-404` | Broken page. | **YES** — fix or remove from sitemap |
| `blocked-by-robots` | robots.txt forbids crawling. | Investigate if unintentional |
| `unknown` | Could not classify coverage state. | Investigate |

## All inspected URLs, grouped by class

### `crawled-not-indexed` (25)

| URL | Coverage state | Last crawl | Notes |
| --- | --- | --- | --- |
| `https://metalforge.io/guides/best-bass-drums-for-death-metal` | Crawled - currently not indexed | 2026-10-21 |  |
| `https://metalforge.io/guides/best-bass-drums-for-extreme-metal` | Crawled - currently not indexed | 2026-08-18 |  |
| `https://metalforge.io/guides/best-bass-drums-for-nu-metal` | Crawled - currently not indexed | 2026-10-21 |  |
| `https://metalforge.io/guides/best-bass-drums-for-progressive-metal` | Crawled - currently not indexed | 2026-10-21 |  |
| `https://metalforge.io/guides/best-drum-hardware-for-mathcore` | Crawled - currently not indexed | 2026-10-20 |  |
| `https://metalforge.io/guides/best-drum-hardware-for-nu-metal` | Crawled - currently not indexed | 2026-10-24 |  |
| `https://metalforge.io/guides/best-drum-hardware-for-technical-death-metal` | Crawled - currently not indexed | 2026-08-13 |  |
| `https://metalforge.io/guides/best-drum-kits-for-black-metal` | Crawled - currently not indexed | 2026-10-09 |  |
| `https://metalforge.io/guides/best-drum-kits-for-nu-metal` | Crawled - currently not indexed | 2026-10-16 |  |
| `https://metalforge.io/guides/best-drum-kits-for-post-metal` | Crawled - currently not indexed | 2026-08-26 |  |
| `https://metalforge.io/guides/best-drum-modules-for-metal` | Crawled - currently not indexed | 2026-10-10 |  |
| `https://metalforge.io/guides/best-drum-pedals-for-groove-metal` | Crawled - currently not indexed | 2026-08-19 |  |
| `https://metalforge.io/guides/best-drum-pedals-for-nu-metal` | Crawled - currently not indexed | 2026-09-13 |  |
| `https://metalforge.io/guides/best-drum-pedals-for-symphonic-metal` | Crawled - currently not indexed | 2026-10-23 |  |
| `https://metalforge.io/guides/best-drumsticks-for-groove-metal` | Crawled - currently not indexed | 2026-11-01 |  |
| `https://metalforge.io/guides/best-drumsticks-for-thrash-metal` | Crawled - currently not indexed | 2026-10-20 |  |
| `https://metalforge.io/guides/best-hi-hats-for-post-metal` | Crawled - currently not indexed | 2026-08-21 |  |
| `https://metalforge.io/guides/best-hi-hats-for-power-metal` | Crawled - currently not indexed | 2026-10-31 |  |
| `https://metalforge.io/guides/best-hi-hats-for-thrash-metal` | Crawled - currently not indexed | 2026-11-18 |  |
| `https://metalforge.io/news` | Crawled - currently not indexed | 2026-07-12 |  |
| `https://metalforge.io/pedals/brands` | Crawled - currently not indexed | 2026-07-17 |  |
| `https://metalforge.io/spotlights` | Crawled - currently not indexed | 2026-06-28 |  |
| `https://metalforge.io/tools/compare/ben-koller-vs-hellhammer` | Crawled - currently not indexed | 2026-07-24 |  |
| `https://metalforge.io/tools/compare/chris-adler-vs-brann-dailor` | Crawled - currently not indexed | 2026-06-28 |  |
| `https://metalforge.io/tools/compare/hellhammer-vs-mikkey-dee` | Crawled - currently not indexed | 2026-07-24 |  |

### `duplicate` (5)

| URL | Coverage state | Last crawl | Notes |
| --- | --- | --- | --- |
| `https://metalforge.io/bpm` | Duplicate without user-selected canonical | 2026-07-03 | canonical → https://metalforge.io/lists/math-metal-drummers |
| `https://metalforge.io/guides/best-cymbals-for-progressive-metal` | Duplicate without user-selected canonical | 2026-07-04 | canonical → https://metalforge.io/lists/math-metal-drummers |
| `https://metalforge.io/guides/best-drum-hardware-for-metal` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/lists/math-metal-drummers |
| `https://metalforge.io/gear/tama/superstar-classic/drummers-using` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/lists/math-metal-drummers |
| `https://metalforge.io/gear/yamaha/recording-custom/drummers-using` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/lists/math-metal-drummers |

### `discovered-not-indexed` (12)

| URL | Coverage state | Last crawl | Notes |
| --- | --- | --- | --- |
| `https://metalforge.io/guides/best-china-cymbals-for-sludge-metal` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/guides/best-drum-hardware-for-groove-metal` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/guides/best-ride-cymbals-for-extreme-metal` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/tools/compare/danny-carey-vs-tomas-haake` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/tools/compare/hellhammer-vs-george-kollias` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/tools/compare/inferno-vs-flo-mounier` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/tools/compare/joey-jordison-vs-george-kollias` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/tools/compare/joey-jordison-vs-lars-ulrich` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/tools/compare/martin-axenrot-vs-lars-ulrich` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/tools/compare/mike-portnoy-vs-danny-carey` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/tools/compare/nick-menza-vs-dirk-verbeuren` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/tools/compare/paul-bostaph-vs-jon-dette` | Discovered - currently not indexed | — |  |

### `indexed` (448)

| URL | Coverage state | Last crawl | Notes |
| --- | --- | --- | --- |
| `https://metalforge.io/` | Submitted and indexed | 2026-11-15 |  |
| `https://metalforge.io/guess-the-kit` | Submitted and indexed | 2026-08-17 |  |
| `https://metalforge.io/guides/beginner-metal-drummer-setup` | Submitted and indexed | 2026-11-23 |  |
| `https://metalforge.io/guides/best-bass-drum-pedals-for-black-metal` | Submitted and indexed | 2026-11-23 |  |
| `https://metalforge.io/guides/best-bass-drum-pedals-for-death-metal` | Submitted and indexed | 2026-10-20 |  |
| `https://metalforge.io/guides/best-bass-drum-pedals-for-deathcore` | Submitted and indexed | 2026-10-26 |  |
| `https://metalforge.io/guides/best-bass-drum-pedals-for-djent` | Submitted and indexed | 2026-10-31 |  |
| `https://metalforge.io/guides/best-bass-drum-pedals-for-doom-metal` | Submitted and indexed | 2026-10-20 |  |
| `https://metalforge.io/guides/best-bass-drum-pedals-for-extreme-metal` | Submitted and indexed | 2026-10-24 |  |
| `https://metalforge.io/guides/best-bass-drum-pedals-for-groove-metal` | Submitted and indexed | 2026-10-21 |  |
| `https://metalforge.io/guides/best-bass-drum-pedals-for-mathcore` | Submitted and indexed | 2026-10-20 |  |
| `https://metalforge.io/guides/best-bass-drum-pedals-for-metal` | Submitted and indexed | 2026-10-10 |  |
| `https://metalforge.io/guides/best-bass-drum-pedals-for-metalcore` | Submitted and indexed | 2026-10-21 |  |
| `https://metalforge.io/guides/best-bass-drum-pedals-for-nu-metal` | Submitted and indexed | 2026-10-25 |  |
| `https://metalforge.io/guides/best-bass-drum-pedals-for-post-metal` | Submitted and indexed | 2026-11-01 |  |
| `https://metalforge.io/guides/best-bass-drum-pedals-for-power-metal` | Submitted and indexed | 2026-10-21 |  |
| `https://metalforge.io/guides/best-bass-drum-pedals-for-progressive-metal` | Submitted and indexed | 2026-10-25 |  |
| `https://metalforge.io/guides/best-bass-drum-pedals-for-sludge-metal` | Submitted and indexed | 2026-10-20 |  |
| `https://metalforge.io/guides/best-bass-drum-pedals-for-symphonic-metal` | Submitted and indexed | 2026-10-24 |  |
| `https://metalforge.io/guides/best-bass-drum-pedals-for-technical-death-metal` | Submitted and indexed | 2026-11-01 |  |
| `https://metalforge.io/guides/best-bass-drum-pedals-for-thrash-metal` | Submitted and indexed | 2026-10-20 |  |
| `https://metalforge.io/guides/best-bass-drums-for-black-metal` | Submitted and indexed | 2026-10-20 |  |
| `https://metalforge.io/guides/best-bass-drums-for-deathcore` | Submitted and indexed | 2026-10-12 |  |
| `https://metalforge.io/guides/best-bass-drums-for-djent` | Submitted and indexed | 2026-10-21 |  |
| `https://metalforge.io/guides/best-bass-drums-for-doom-metal` | Submitted and indexed | 2026-10-20 |  |
| `https://metalforge.io/guides/best-bass-drums-for-groove-metal` | Submitted and indexed | 2026-10-24 |  |
| `https://metalforge.io/guides/best-bass-drums-for-mathcore` | Submitted and indexed | 2026-10-21 |  |
| `https://metalforge.io/guides/best-bass-drums-for-metal` | Submitted and indexed | 2026-10-21 |  |
| `https://metalforge.io/guides/best-bass-drums-for-metalcore` | Submitted and indexed | 2026-10-20 |  |
| `https://metalforge.io/guides/best-bass-drums-for-post-metal` | Submitted and indexed | 2026-10-20 |  |
| `https://metalforge.io/guides/best-bass-drums-for-power-metal` | Submitted and indexed | 2026-10-21 |  |
| `https://metalforge.io/guides/best-bass-drums-for-sludge-metal` | Submitted and indexed | 2026-10-20 |  |
| `https://metalforge.io/guides/best-bass-drums-for-symphonic-metal` | Submitted and indexed | 2026-10-21 |  |
| `https://metalforge.io/guides/best-bass-drums-for-technical-death-metal` | Submitted and indexed | 2026-10-25 |  |
| `https://metalforge.io/guides/best-bass-drums-for-thrash-metal` | Submitted and indexed | 2026-10-21 |  |
| `https://metalforge.io/guides/best-china-cymbals-for-black-metal` | Submitted and indexed | 2026-10-24 |  |
| `https://metalforge.io/guides/best-china-cymbals-for-death-metal` | Submitted and indexed | 2026-11-01 |  |
| `https://metalforge.io/guides/best-china-cymbals-for-deathcore` | Submitted and indexed | 2026-10-21 |  |
| `https://metalforge.io/guides/best-china-cymbals-for-djent` | Submitted and indexed | 2026-11-01 |  |
| `https://metalforge.io/guides/best-china-cymbals-for-doom-metal` | Submitted and indexed | 2026-10-21 |  |
| `https://metalforge.io/guides/best-china-cymbals-for-extreme-metal` | Submitted and indexed | 2026-10-21 |  |
| `https://metalforge.io/guides/best-china-cymbals-for-groove-metal` | Submitted and indexed | 2026-10-20 |  |
| `https://metalforge.io/guides/best-china-cymbals-for-metal` | Submitted and indexed | 2026-11-14 |  |
| `https://metalforge.io/guides/best-china-cymbals-for-metalcore` | Submitted and indexed | 2026-10-23 |  |
| `https://metalforge.io/guides/best-china-cymbals-for-nu-metal` | Submitted and indexed | 2026-10-21 |  |
| `https://metalforge.io/guides/best-china-cymbals-for-post-metal` | Submitted and indexed | 2026-10-20 |  |
| `https://metalforge.io/guides/best-china-cymbals-for-power-metal` | Submitted and indexed | 2026-10-20 |  |
| `https://metalforge.io/guides/best-china-cymbals-for-progressive-metal` | Submitted and indexed | 2026-10-20 |  |
| `https://metalforge.io/guides/best-china-cymbals-for-symphonic-metal` | Submitted and indexed | 2026-10-21 |  |
| `https://metalforge.io/guides/best-china-cymbals-for-technical-death-metal` | Submitted and indexed | 2026-10-21 |  |
| `https://metalforge.io/guides/best-china-cymbals-for-thrash-metal` | Submitted and indexed | 2026-10-20 |  |
| `https://metalforge.io/guides/best-crash-cymbals-for-black-metal` | Submitted and indexed | 2026-10-23 |  |
| `https://metalforge.io/guides/best-crash-cymbals-for-death-metal` | Submitted and indexed | 2026-10-21 |  |
| `https://metalforge.io/guides/best-crash-cymbals-for-deathcore` | Submitted and indexed | 2026-10-20 |  |
| `https://metalforge.io/guides/best-crash-cymbals-for-djent` | Submitted and indexed | 2026-11-21 |  |
| `https://metalforge.io/guides/best-crash-cymbals-for-doom-metal` | Submitted and indexed | 2026-10-21 |  |
| `https://metalforge.io/guides/best-crash-cymbals-for-extreme-metal` | Submitted and indexed | 2026-10-20 |  |
| `https://metalforge.io/guides/best-crash-cymbals-for-groove-metal` | Submitted and indexed | 2026-10-20 |  |
| `https://metalforge.io/guides/best-crash-cymbals-for-mathcore` | Submitted and indexed | 2026-10-21 |  |
| `https://metalforge.io/guides/best-crash-cymbals-for-metal` | Submitted and indexed | 2026-11-22 |  |
| `https://metalforge.io/guides/best-crash-cymbals-for-metalcore` | Submitted and indexed | 2026-08-28 |  |
| `https://metalforge.io/guides/best-crash-cymbals-for-nu-metal` | Submitted and indexed | 2026-10-22 |  |
| `https://metalforge.io/guides/best-crash-cymbals-for-post-metal` | Submitted and indexed | 2026-10-20 |  |
| `https://metalforge.io/guides/best-crash-cymbals-for-power-metal` | Submitted and indexed | 2026-09-25 |  |
| `https://metalforge.io/guides/best-crash-cymbals-for-progressive-metal` | Submitted and indexed | 2026-10-16 |  |
| `https://metalforge.io/guides/best-crash-cymbals-for-sludge-metal` | Submitted and indexed | 2026-10-21 |  |
| `https://metalforge.io/guides/best-crash-cymbals-for-symphonic-metal` | Submitted and indexed | 2026-10-21 |  |
| `https://metalforge.io/guides/best-crash-cymbals-for-technical-death-metal` | Submitted and indexed | 2026-10-20 |  |
| `https://metalforge.io/guides/best-crash-cymbals-for-thrash-metal` | Submitted and indexed | 2026-10-31 |  |
| `https://metalforge.io/guides/best-cymbals-for-black-metal` | Submitted and indexed | 2026-10-17 |  |
| `https://metalforge.io/guides/best-cymbals-for-death-metal` | Submitted and indexed | 2026-11-12 |  |
| `https://metalforge.io/guides/best-cymbals-for-deathcore` | Submitted and indexed | 2026-10-31 |  |
| `https://metalforge.io/guides/best-cymbals-for-djent` | Submitted and indexed | 2026-11-20 |  |
| `https://metalforge.io/guides/best-cymbals-for-doom-metal` | Submitted and indexed | 2026-10-26 |  |
| `https://metalforge.io/guides/best-cymbals-for-extreme-metal` | Submitted and indexed | 2026-10-20 |  |
| `https://metalforge.io/guides/best-cymbals-for-groove-metal` | Submitted and indexed | 2026-10-24 |  |
| `https://metalforge.io/guides/best-cymbals-for-mathcore` | Submitted and indexed | 2026-10-31 |  |
| `https://metalforge.io/guides/best-cymbals-for-metal` | Submitted and indexed | 2026-11-03 |  |
| `https://metalforge.io/guides/best-cymbals-for-metalcore` | Submitted and indexed | 2026-11-20 |  |
| `https://metalforge.io/guides/best-cymbals-for-nu-metal` | Submitted and indexed | 2026-11-20 |  |
| `https://metalforge.io/guides/best-cymbals-for-post-metal` | Submitted and indexed | 2026-10-21 |  |
| `https://metalforge.io/guides/best-cymbals-for-power-metal` | Submitted and indexed | 2026-08-19 |  |
| `https://metalforge.io/guides/best-cymbals-for-sludge-metal` | Submitted and indexed | 2026-10-20 |  |
| `https://metalforge.io/guides/best-cymbals-for-symphonic-metal` | Submitted and indexed | 2026-10-21 |  |
| `https://metalforge.io/guides/best-cymbals-for-technical-death-metal` | Submitted and indexed | 2026-10-21 |  |
| `https://metalforge.io/guides/best-cymbals-for-thrash-metal` | Submitted and indexed | 2026-10-10 |  |
| `https://metalforge.io/guides/best-drum-hardware-for-black-metal` | Submitted and indexed | 2026-10-21 |  |
| `https://metalforge.io/guides/best-drum-hardware-for-death-metal` | Submitted and indexed | 2026-10-24 |  |
| `https://metalforge.io/guides/best-drum-hardware-for-deathcore` | Submitted and indexed | 2026-10-21 |  |
| `https://metalforge.io/guides/best-drum-hardware-for-djent` | Submitted and indexed | 2026-10-20 |  |
| `https://metalforge.io/guides/best-drum-hardware-for-doom-metal` | Submitted and indexed | 2026-10-21 |  |
| `https://metalforge.io/guides/best-drum-hardware-for-extreme-metal` | Submitted and indexed | 2026-10-20 |  |
| `https://metalforge.io/guides/best-drum-hardware-for-metalcore` | Submitted and indexed | 2026-10-21 |  |
| `https://metalforge.io/guides/best-drum-hardware-for-post-metal` | Submitted and indexed | 2026-10-20 |  |
| `https://metalforge.io/guides/best-drum-hardware-for-power-metal` | Submitted and indexed | 2026-10-21 |  |
| `https://metalforge.io/guides/best-drum-hardware-for-progressive-metal` | Submitted and indexed | 2026-10-21 |  |
| `https://metalforge.io/guides/best-drum-hardware-for-sludge-metal` | Submitted and indexed | 2026-10-21 |  |
| `https://metalforge.io/guides/best-drum-hardware-for-symphonic-metal` | Submitted and indexed | 2026-10-21 |  |
| `https://metalforge.io/guides/best-drum-hardware-for-thrash-metal` | Submitted and indexed | 2026-10-20 |  |
| `https://metalforge.io/guides/best-drum-heads-for-black-metal` | Submitted and indexed | 2026-10-22 |  |
| _…and 348 more — see snapshot file_ | | | |

### `redirect-or-canonical` (2)

| URL | Coverage state | Last crawl | Notes |
| --- | --- | --- | --- |
| `https://metalforge.io/guides/best-drum-pedals-for-black-metal` | Alternate page with proper canonical tag | 2026-07-02 | canonical → https://metalforge.io/guides/best-snares-for-doom-metal |
| `https://metalforge.io/tools/compare/matt-garstka-vs-matt-halpern` | Alternate page with proper canonical tag | 2026-06-27 | canonical → https://metalforge.io/tools/compare/hellhammer-vs-mikkey-dee |

### `unknown` (8)

| URL | Coverage state | Last crawl | Notes |
| --- | --- | --- | --- |
| `https://metalforge.io/guides/best-china-cymbals-for-mathcore` | URL is unknown to Google | — |  |
| `https://metalforge.io/guides/best-drum-thrones-for-metal` | URL is unknown to Google | — |  |
| `https://metalforge.io/songs/tempo/doom` | URL is unknown to Google | — |  |
| `https://metalforge.io/tools/compare/ben-koller-vs-dirk-verbeuren` | URL is unknown to Google | — |  |
| `https://metalforge.io/tools/compare/bill-ward-vs-brann-dailor` | URL is unknown to Google | — |  |
| `https://metalforge.io/tools/compare/brann-dailor-vs-mario-duplantier` | URL is unknown to Google | — |  |
| `https://metalforge.io/tools/compare/matt-halpern-vs-alex-bent` | URL is unknown to Google | — |  |
| `https://metalforge.io/tools/compare/mike-portnoy-vs-mike-mangini` | URL is unknown to Google | — |  |
