# Indexation Health — weekly snapshot

*Auto-written by `.github/workflows/check-indexation.yml`. CEO Agent: read this every run when deciding which pages need content expansion or internal-link boosting.*

**Generated:** 2026-08-03T10:36:50.034Z
**Site:** https://metalforge.io/
**Sitemap URLs total:** 3180 · **Inspected this run:** 500 (cap 500)
**Selection:** 250 fixed sentinels (top priority, same every run — trend-comparable) + 250 rotating (full sitemap covered every ~12 runs; cursor now 750)
**Compared against:** 2026-07-27.json

**Counts:** `indexed`=408 · `duplicate`=18 · `discovered-not-indexed`=55 · `redirect-or-canonical`=1 · `unknown`=8 · `error-404`=3 · `duplicate-google-canonical`=3 · `crawled-not-indexed`=2 · `soft-404`=2

**Indexed share (this run's sample):** 408 / 500 = **81.6%**
**Sentinel indexed share (week-over-week comparable):** 241 / 250 = **96.4%**
**Full-site proxy:** 1455 of 3180 sitemap URLs earned ≥1 Google impression in the last 90d (a page with impressions is indexed by definition; the inverse is not guaranteed)

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

### `crawled-not-indexed` (2)

| URL | Coverage state | Last crawl | Notes |
| --- | --- | --- | --- |
| `https://metalforge.io/gear` | Crawled - currently not indexed | 2026-07-01 |  |
| `https://metalforge.io/quotes` | Crawled - currently not indexed | 2026-07-02 |  |

### `error-404` (3)

| URL | Coverage state | Last crawl | Notes |
| --- | --- | --- | --- |
| `https://metalforge.io/drummers/george-kollias/gear-history` | Not found (404) | 2026-07-07 |  |
| `https://metalforge.io/drummers/martin-axenrot/gear-history` | Not found (404) | 2026-07-07 |  |
| `https://metalforge.io/drummers/paul-mazurkiewicz/gear-history` | Not found (404) | 2026-07-06 |  |

### `soft-404` (2)

| URL | Coverage state | Last crawl | Notes |
| --- | --- | --- | --- |
| `https://metalforge.io/stats` | Soft 404 | 2026-07-06 |  |
| `https://metalforge.io/stats/gear-insights` | Soft 404 | 2026-06-29 |  |

### `duplicate` (18)

| URL | Coverage state | Last crawl | Notes |
| --- | --- | --- | --- |
| `https://metalforge.io/bpm` | Duplicate without user-selected canonical | 2026-07-03 | canonical → https://metalforge.io/lists/math-metal-drummers |
| `https://metalforge.io/guides/best-cymbals-for-progressive-metal` | Duplicate without user-selected canonical | 2026-07-04 | canonical → https://metalforge.io/lists/math-metal-drummers |
| `https://metalforge.io/guides/best-drum-hardware-for-metal` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/lists/math-metal-drummers |
| `https://metalforge.io/drummers/charlie-benante/gear-history` | Duplicate without user-selected canonical | 2026-07-03 | canonical → https://metalforge.io/lists/math-metal-drummers |
| `https://metalforge.io/drummers/jaska-raatikainen/gear-history` | Duplicate without user-selected canonical | 2026-07-04 | canonical → https://metalforge.io/lists/math-metal-drummers |
| `https://metalforge.io/drummers/john-otto/gear-history` | Duplicate without user-selected canonical | 2026-07-03 | canonical → https://metalforge.io/lists/math-metal-drummers |
| `https://metalforge.io/drummers/kevin-talley/gear-history` | Duplicate without user-selected canonical | 2026-07-03 | canonical → https://metalforge.io/lists/math-metal-drummers |
| `https://metalforge.io/drummers/matt-garstka/gear-history` | Duplicate without user-selected canonical | 2026-07-03 | canonical → https://metalforge.io/lists/math-metal-drummers |
| `https://metalforge.io/drummers/mike-mangini/gear-history` | Duplicate without user-selected canonical | 2026-07-03 | canonical → https://metalforge.io/lists/math-metal-drummers |
| `https://metalforge.io/drummers/sean-reinert/licks` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/lists/math-metal-drummers |
| `https://metalforge.io/guides/how-to-sound-like-chris-turner` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/lists/math-metal-drummers |
| `https://metalforge.io/guides/how-to-sound-like-jaska-raatikainen` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/lists/math-metal-drummers |
| `https://metalforge.io/guides/how-to-sound-like-jay-weinberg` | Duplicate without user-selected canonical | 2026-07-03 | canonical → https://metalforge.io/lists/math-metal-drummers |
| `https://metalforge.io/guides/how-to-sound-like-mikkey-dee` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/lists/math-metal-drummers |
| `https://metalforge.io/guides/how-to-sound-like-navene-koperweis` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/lists/math-metal-drummers |
| `https://metalforge.io/guides/how-to-sound-like-nick-menza` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/lists/math-metal-drummers |
| `https://metalforge.io/guides/how-to-sound-like-scott-travis` | Duplicate without user-selected canonical | 2026-07-03 | canonical → https://metalforge.io/lists/math-metal-drummers |
| `https://metalforge.io/guides/how-to-sound-like-tomas-haake` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/lists/math-metal-drummers |

### `duplicate-google-canonical` (3)

| URL | Coverage state | Last crawl | Notes |
| --- | --- | --- | --- |
| `https://metalforge.io/drummers/nick-menza/gear-history` | Duplicate, Google chose different canonical than user | 2026-07-07 | canonical → https://metalforge.io/drummer/36 |
| `https://metalforge.io/drummers/paul-bostaph/gear-history` | Duplicate, Google chose different canonical than user | 2026-07-07 | canonical → https://metalforge.io/drummer/36 |
| `https://metalforge.io/guides/how-to-sound-like-adrian-erlandsson` | Duplicate, Google chose different canonical than user | 2026-07-07 | canonical → https://metalforge.io/guides/budget-metal-drum-setup-500 |

### `discovered-not-indexed` (55)

| URL | Coverage state | Last crawl | Notes |
| --- | --- | --- | --- |
| `https://metalforge.io/guides/best-china-cymbals-for-mathcore` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/guides/best-china-cymbals-for-sludge-metal` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/guides/best-drum-hardware-for-groove-metal` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/guides/best-ride-cymbals-for-extreme-metal` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/brann-dailor/licks` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/chris-turner/gear-history` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/chris-turner/licks` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/daniel-erlandsson/licks` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/danny-carey/gear-history` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/dave-lombardo/gear-history` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/dave-lombardo/licks` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/derek-roddy/licks` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/dirk-verbeuren/gear-history` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/dirk-verbeuren/licks` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/eloy-casagrande/licks` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/flo-mounier/licks` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/hannes-grossmann/gear-history` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/hannes-grossmann/licks` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/igor-cavalera/licks` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/inferno/licks` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/jason-bittner/licks` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/jay-weinberg/licks` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/jocke-wallgren/gear-history` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/joey-jordison/gear-history` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/joey-jordison/licks` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/john-otto/licks` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/kevin-talley/licks` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/lars-ulrich/gear-history` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/lars-ulrich/licks` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/matt-greiner/licks` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/matt-halpern/gear-history` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/mike-portnoy/gear-history` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/mikkey-dee/licks` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/morgan-agren/gear-history` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/nick-augusto/licks` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/paul-bostaph/licks` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/paul-mazurkiewicz/licks` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/pete-sandoval/gear-history` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/ray-luzier/licks` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/raymond-herrera/licks` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/richard-christy/licks` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/ryan-van-poederooyen/gear-history` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/scott-travis/gear-history` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/scott-travis/licks` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/sean-reinert/gear-history` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/shannon-larkin/gear-history` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/tomas-haake/gear-history` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/vinnie-paul/gear-history` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/vinnie-paul/licks` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/guides/how-to-sound-like-gene-hoglan` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/guides/how-to-sound-like-matt-greiner` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/pedals` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/songs` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/abe-cunningham/drums` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/abe-cunningham/hardware` | Discovered - currently not indexed | — |  |

### `indexed` (408)

| URL | Coverage state | Last crawl | Notes |
| --- | --- | --- | --- |
| `https://metalforge.io/` | Submitted and indexed | 2026-07-24 |  |
| `https://metalforge.io/guess-the-kit` | Submitted and indexed | 2026-07-01 |  |
| `https://metalforge.io/guides/beginner-metal-drummer-setup` | Submitted and indexed | 2026-07-01 |  |
| `https://metalforge.io/guides/best-bass-drum-pedals-for-black-metal` | Submitted and indexed | 2026-07-13 |  |
| `https://metalforge.io/guides/best-bass-drum-pedals-for-death-metal` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-bass-drum-pedals-for-deathcore` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-bass-drum-pedals-for-djent` | Submitted and indexed | 2026-07-13 |  |
| `https://metalforge.io/guides/best-bass-drum-pedals-for-doom-metal` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-bass-drum-pedals-for-extreme-metal` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-bass-drum-pedals-for-groove-metal` | Submitted and indexed | 2026-07-13 |  |
| `https://metalforge.io/guides/best-bass-drum-pedals-for-mathcore` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-bass-drum-pedals-for-metal` | Submitted and indexed | 2026-07-02 |  |
| `https://metalforge.io/guides/best-bass-drum-pedals-for-metalcore` | Submitted and indexed | 2026-07-13 |  |
| `https://metalforge.io/guides/best-bass-drum-pedals-for-nu-metal` | Submitted and indexed | 2026-07-13 |  |
| `https://metalforge.io/guides/best-bass-drum-pedals-for-post-metal` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-bass-drum-pedals-for-power-metal` | Submitted and indexed | 2026-07-13 |  |
| `https://metalforge.io/guides/best-bass-drum-pedals-for-progressive-metal` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-bass-drum-pedals-for-sludge-metal` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-bass-drum-pedals-for-symphonic-metal` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-bass-drum-pedals-for-technical-death-metal` | Submitted and indexed | 2026-07-13 |  |
| `https://metalforge.io/guides/best-bass-drum-pedals-for-thrash-metal` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-bass-drums-for-black-metal` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-bass-drums-for-death-metal` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-bass-drums-for-deathcore` | Submitted and indexed | 2026-07-08 |  |
| `https://metalforge.io/guides/best-bass-drums-for-djent` | Submitted and indexed | 2026-07-13 |  |
| `https://metalforge.io/guides/best-bass-drums-for-doom-metal` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-bass-drums-for-extreme-metal` | Submitted and indexed | 2026-07-03 |  |
| `https://metalforge.io/guides/best-bass-drums-for-groove-metal` | Submitted and indexed | 2026-07-09 |  |
| `https://metalforge.io/guides/best-bass-drums-for-mathcore` | Submitted and indexed | 2026-07-13 |  |
| `https://metalforge.io/guides/best-bass-drums-for-metal` | Submitted and indexed | 2026-07-13 |  |
| `https://metalforge.io/guides/best-bass-drums-for-metalcore` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-bass-drums-for-nu-metal` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-bass-drums-for-post-metal` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-bass-drums-for-power-metal` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-bass-drums-for-progressive-metal` | Submitted and indexed | 2026-07-13 |  |
| `https://metalforge.io/guides/best-bass-drums-for-sludge-metal` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-bass-drums-for-symphonic-metal` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-bass-drums-for-technical-death-metal` | Submitted and indexed | 2026-07-13 |  |
| `https://metalforge.io/guides/best-bass-drums-for-thrash-metal` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-china-cymbals-for-black-metal` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-china-cymbals-for-death-metal` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-china-cymbals-for-deathcore` | Submitted and indexed | 2026-07-13 |  |
| `https://metalforge.io/guides/best-china-cymbals-for-djent` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-china-cymbals-for-doom-metal` | Submitted and indexed | 2026-07-13 |  |
| `https://metalforge.io/guides/best-china-cymbals-for-extreme-metal` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-china-cymbals-for-groove-metal` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-china-cymbals-for-metal` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-china-cymbals-for-metalcore` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-china-cymbals-for-nu-metal` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-china-cymbals-for-post-metal` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-china-cymbals-for-power-metal` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-china-cymbals-for-progressive-metal` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-china-cymbals-for-symphonic-metal` | Submitted and indexed | 2026-07-13 |  |
| `https://metalforge.io/guides/best-china-cymbals-for-technical-death-metal` | Submitted and indexed | 2026-07-13 |  |
| `https://metalforge.io/guides/best-china-cymbals-for-thrash-metal` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-crash-cymbals-for-black-metal` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-crash-cymbals-for-death-metal` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-crash-cymbals-for-deathcore` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-crash-cymbals-for-djent` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-crash-cymbals-for-doom-metal` | Submitted and indexed | 2026-07-13 |  |
| `https://metalforge.io/guides/best-crash-cymbals-for-extreme-metal` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-crash-cymbals-for-groove-metal` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-crash-cymbals-for-mathcore` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-crash-cymbals-for-metal` | Submitted and indexed | 2026-07-09 |  |
| `https://metalforge.io/guides/best-crash-cymbals-for-metalcore` | Submitted and indexed | 2026-07-07 |  |
| `https://metalforge.io/guides/best-crash-cymbals-for-nu-metal` | Submitted and indexed | 2026-07-14 |  |
| `https://metalforge.io/guides/best-crash-cymbals-for-post-metal` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-crash-cymbals-for-power-metal` | Submitted and indexed | 2026-07-13 |  |
| `https://metalforge.io/guides/best-crash-cymbals-for-progressive-metal` | Submitted and indexed | 2026-07-08 |  |
| `https://metalforge.io/guides/best-crash-cymbals-for-sludge-metal` | Submitted and indexed | 2026-07-13 |  |
| `https://metalforge.io/guides/best-crash-cymbals-for-symphonic-metal` | Submitted and indexed | 2026-07-13 |  |
| `https://metalforge.io/guides/best-crash-cymbals-for-technical-death-metal` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-crash-cymbals-for-thrash-metal` | Submitted and indexed | 2026-07-13 |  |
| `https://metalforge.io/guides/best-cymbals-for-black-metal` | Submitted and indexed | 2026-07-09 |  |
| `https://metalforge.io/guides/best-cymbals-for-death-metal` | Submitted and indexed | 2026-07-03 |  |
| `https://metalforge.io/guides/best-cymbals-for-deathcore` | Submitted and indexed | 2026-07-31 |  |
| `https://metalforge.io/guides/best-cymbals-for-djent` | Submitted and indexed | 2026-07-14 |  |
| `https://metalforge.io/guides/best-cymbals-for-doom-metal` | Submitted and indexed | 2026-07-14 |  |
| `https://metalforge.io/guides/best-cymbals-for-extreme-metal` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-cymbals-for-groove-metal` | Submitted and indexed | 2026-07-08 |  |
| `https://metalforge.io/guides/best-cymbals-for-mathcore` | Submitted and indexed | 2026-07-08 |  |
| `https://metalforge.io/guides/best-cymbals-for-metal` | Submitted and indexed | 2026-07-27 |  |
| `https://metalforge.io/guides/best-cymbals-for-metalcore` | Submitted and indexed | 2026-07-11 |  |
| `https://metalforge.io/guides/best-cymbals-for-nu-metal` | Submitted and indexed | 2026-07-11 |  |
| `https://metalforge.io/guides/best-cymbals-for-post-metal` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-cymbals-for-power-metal` | Submitted and indexed | 2026-07-08 |  |
| `https://metalforge.io/guides/best-cymbals-for-sludge-metal` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-cymbals-for-symphonic-metal` | Submitted and indexed | 2026-07-13 |  |
| `https://metalforge.io/guides/best-cymbals-for-technical-death-metal` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-cymbals-for-thrash-metal` | Submitted and indexed | 2026-07-02 |  |
| `https://metalforge.io/guides/best-drum-hardware-for-black-metal` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-drum-hardware-for-death-metal` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-drum-hardware-for-deathcore` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-drum-hardware-for-djent` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-drum-hardware-for-doom-metal` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-drum-hardware-for-extreme-metal` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-drum-hardware-for-mathcore` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-drum-hardware-for-metalcore` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-drum-hardware-for-nu-metal` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-drum-hardware-for-post-metal` | Submitted and indexed | 2026-07-12 |  |
| _…and 308 more — see snapshot file_ | | | |

### `redirect-or-canonical` (1)

| URL | Coverage state | Last crawl | Notes |
| --- | --- | --- | --- |
| `https://metalforge.io/guides/best-drum-pedals-for-black-metal` | Alternate page with proper canonical tag | 2026-07-02 | canonical → https://metalforge.io/guides/budget-metal-drum-setup-1000 |

### `unknown` (8)

| URL | Coverage state | Last crawl | Notes |
| --- | --- | --- | --- |
| `https://metalforge.io/guides/best-drum-thrones-for-metal` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummers/daray/licks` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummers/george-kollias/licks` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummers/isaac-lamb/licks` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummers/jocke-wallgren/licks` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummers/jon-dette/gear-history` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummers/mike-mangini/licks` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummers/ryan-van-poederooyen/licks` | URL is unknown to Google | — |  |
