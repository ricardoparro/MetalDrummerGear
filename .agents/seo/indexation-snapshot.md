# Indexation Health — weekly snapshot

*Auto-written by `.github/workflows/check-indexation.yml`. CEO Agent: read this every run when deciding which pages need content expansion or internal-link boosting.*

**Generated:** 2026-11-02T09:30:31.005Z
**Site:** https://metalforge.io/
**Sitemap URLs total:** 3159 · **Inspected this run:** 500 (cap 500)
**Selection:** 250 fixed sentinels (top priority, same every run — trend-comparable) + 250 rotating (full sitemap covered every ~12 runs; cursor now 1088)
**Compared against:** 2026-10-26.json

**Counts:** `indexed`=431 · `duplicate`=4 · `duplicate-google-canonical`=1 · `unknown`=13 · `discovered-not-indexed`=21 · `redirect-or-canonical`=1 · `crawled-not-indexed`=29

**Indexed share (this run's sample):** 431 / 500 = **86.2%**
**Sentinel indexed share (week-over-week comparable):** 237 / 250 = **94.8%**
**Full-site proxy:** 2270 of 3159 sitemap URLs earned ≥1 Google impression in the last 90d (a page with impressions is indexed by definition; the inverse is not guaranteed)

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

### `crawled-not-indexed` (29)

| URL | Coverage state | Last crawl | Notes |
| --- | --- | --- | --- |
| `https://metalforge.io/guides/best-drum-pedals-for-groove-metal` | Crawled - currently not indexed | 2026-08-19 |  |
| `https://metalforge.io/guides/best-drumsticks-for-groove-metal` | Crawled - currently not indexed | 2026-11-01 |  |
| `https://metalforge.io/guides/best-hi-hats-for-power-metal` | Crawled - currently not indexed | 2026-10-31 |  |
| `https://metalforge.io/drummer/daray/cymbals` | Crawled - currently not indexed | 2026-06-28 |  |
| `https://metalforge.io/drummer/dave-lombardo/snare` | Crawled - currently not indexed | 2026-06-27 |  |
| `https://metalforge.io/drummer/derek-roddy/cymbals` | Crawled - currently not indexed | 2026-06-27 |  |
| `https://metalforge.io/drummer/derek-roddy/pedals` | Crawled - currently not indexed | 2026-07-12 |  |
| `https://metalforge.io/drummer/flo-mounier/cymbals` | Crawled - currently not indexed | 2026-06-27 |  |
| `https://metalforge.io/drummer/flo-mounier/drums` | Crawled - currently not indexed | 2026-06-27 |  |
| `https://metalforge.io/drummer/frost/hardware` | Crawled - currently not indexed | 2026-06-27 |  |
| `https://metalforge.io/drummer/gavin-harrison/cymbals` | Crawled - currently not indexed | 2026-08-07 |  |
| `https://metalforge.io/drummer/george-kollias/hardware` | Crawled - currently not indexed | 2026-06-28 |  |
| `https://metalforge.io/drummer/george-kollias/heads` | Crawled - currently not indexed | 2026-07-12 |  |
| `https://metalforge.io/drummer/george-kollias/pedals` | Crawled - currently not indexed | 2026-07-12 |  |
| `https://metalforge.io/drummer/hannes-grossmann/drums` | Crawled - currently not indexed | 2026-06-27 |  |
| `https://metalforge.io/drummer/hellhammer/pedals` | Crawled - currently not indexed | 2026-07-12 |  |
| `https://metalforge.io/drummer/igor-cavalera/drums` | Crawled - currently not indexed | 2026-06-28 |  |
| `https://metalforge.io/drummer/jaska-raatikainen/drums` | Crawled - currently not indexed | 2026-06-28 |  |
| `https://metalforge.io/drummer/jaska-raatikainen/pedals` | Crawled - currently not indexed | 2026-07-12 |  |
| `https://metalforge.io/drummer/jay-weinberg/sticks` | Crawled - currently not indexed | 2026-06-27 |  |
| `https://metalforge.io/drummer/john-otto/heads` | Crawled - currently not indexed | 2026-07-13 |  |
| `https://metalforge.io/drummer/kevin-talley/drums` | Crawled - currently not indexed | 2026-06-27 |  |
| `https://metalforge.io/drummer/kevin-talley/pedals` | Crawled - currently not indexed | 2026-07-13 |  |
| `https://metalforge.io/drummer/mario-duplantier/snare` | Crawled - currently not indexed | 2026-06-28 |  |
| `https://metalforge.io/drummer/martin-lopez/hardware` | Crawled - currently not indexed | 2026-06-28 |  |
| `https://metalforge.io/drummer/martin-lopez/heads` | Crawled - currently not indexed | 2026-07-15 |  |
| `https://metalforge.io/drummer/matt-greiner/pedals` | Crawled - currently not indexed | 2026-07-13 |  |
| `https://metalforge.io/drummer/matt-halpern/pedals` | Crawled - currently not indexed | 2026-07-12 |  |
| `https://metalforge.io/drummer/navene-koperweis/heads` | Crawled - currently not indexed | 2026-07-13 |  |

### `duplicate` (4)

| URL | Coverage state | Last crawl | Notes |
| --- | --- | --- | --- |
| `https://metalforge.io/bpm` | Duplicate without user-selected canonical | 2026-07-03 | canonical → https://metalforge.io/lists/math-metal-drummers |
| `https://metalforge.io/guides/best-cymbals-for-progressive-metal` | Duplicate without user-selected canonical | 2026-07-04 | canonical → https://metalforge.io/lists/math-metal-drummers |
| `https://metalforge.io/guides/best-drum-hardware-for-metal` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/lists/math-metal-drummers |
| `https://metalforge.io/drummer/martin-axenrot/cymbals` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/lists/math-metal-drummers |

### `duplicate-google-canonical` (1)

| URL | Coverage state | Last crawl | Notes |
| --- | --- | --- | --- |
| `https://metalforge.io/guides/beginner-metal-drummer-setup` | Duplicate, Google chose different canonical than user | 2026-08-22 | canonical → https://metalforge.io/guides/best-snares-for-doom-metal |

### `discovered-not-indexed` (21)

| URL | Coverage state | Last crawl | Notes |
| --- | --- | --- | --- |
| `https://metalforge.io/guides/best-china-cymbals-for-sludge-metal` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/guides/best-drum-hardware-for-groove-metal` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/guides/best-drum-thrones-for-metal` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/guides/best-ride-cymbals-for-extreme-metal` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/danny-carey/sticks` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/daray/drums` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/eloy-casagrande/drums` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/eloy-casagrande/hardware` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/george-kollias/cymbals` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/hellhammer/hardware` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/isaac-lamb/drums` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/jaska-raatikainen/hardware` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/jocke-wallgren/heads` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/joey-jordison/hardware` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/joey-jordison/snare` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/kevin-talley/cymbals` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/lars-ulrich/sticks` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/mario-duplantier/sticks` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/matt-halpern/drums` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/mike-mangini/cymbals` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/navene-koperweis/sticks` | Discovered - currently not indexed | — |  |

### `indexed` (431)

| URL | Coverage state | Last crawl | Notes |
| --- | --- | --- | --- |
| `https://metalforge.io/` | Submitted and indexed | 2026-10-25 |  |
| `https://metalforge.io/guess-the-kit` | Submitted and indexed | 2026-08-17 |  |
| `https://metalforge.io/guides/best-bass-drum-pedals-for-black-metal` | Submitted and indexed | 2026-10-21 |  |
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
| `https://metalforge.io/guides/best-bass-drums-for-death-metal` | Submitted and indexed | 2026-10-21 |  |
| `https://metalforge.io/guides/best-bass-drums-for-deathcore` | Submitted and indexed | 2026-10-12 |  |
| `https://metalforge.io/guides/best-bass-drums-for-djent` | Submitted and indexed | 2026-10-21 |  |
| `https://metalforge.io/guides/best-bass-drums-for-doom-metal` | Submitted and indexed | 2026-10-20 |  |
| `https://metalforge.io/guides/best-bass-drums-for-extreme-metal` | Submitted and indexed | 2026-08-18 |  |
| `https://metalforge.io/guides/best-bass-drums-for-groove-metal` | Submitted and indexed | 2026-10-24 |  |
| `https://metalforge.io/guides/best-bass-drums-for-mathcore` | Submitted and indexed | 2026-10-21 |  |
| `https://metalforge.io/guides/best-bass-drums-for-metal` | Submitted and indexed | 2026-10-21 |  |
| `https://metalforge.io/guides/best-bass-drums-for-metalcore` | Submitted and indexed | 2026-10-20 |  |
| `https://metalforge.io/guides/best-bass-drums-for-nu-metal` | Submitted and indexed | 2026-10-21 |  |
| `https://metalforge.io/guides/best-bass-drums-for-post-metal` | Submitted and indexed | 2026-10-20 |  |
| `https://metalforge.io/guides/best-bass-drums-for-power-metal` | Submitted and indexed | 2026-10-21 |  |
| `https://metalforge.io/guides/best-bass-drums-for-progressive-metal` | Submitted and indexed | 2026-10-21 |  |
| `https://metalforge.io/guides/best-bass-drums-for-sludge-metal` | Submitted and indexed | 2026-10-20 |  |
| `https://metalforge.io/guides/best-bass-drums-for-symphonic-metal` | Submitted and indexed | 2026-10-21 |  |
| `https://metalforge.io/guides/best-bass-drums-for-technical-death-metal` | Submitted and indexed | 2026-10-25 |  |
| `https://metalforge.io/guides/best-bass-drums-for-thrash-metal` | Submitted and indexed | 2026-10-21 |  |
| `https://metalforge.io/guides/best-china-cymbals-for-black-metal` | Submitted and indexed | 2026-10-24 |  |
| `https://metalforge.io/guides/best-china-cymbals-for-death-metal` | Submitted and indexed | 2026-10-31 |  |
| `https://metalforge.io/guides/best-china-cymbals-for-deathcore` | Submitted and indexed | 2026-10-21 |  |
| `https://metalforge.io/guides/best-china-cymbals-for-djent` | Submitted and indexed | 2026-11-01 |  |
| `https://metalforge.io/guides/best-china-cymbals-for-doom-metal` | Submitted and indexed | 2026-10-21 |  |
| `https://metalforge.io/guides/best-china-cymbals-for-extreme-metal` | Submitted and indexed | 2026-10-21 |  |
| `https://metalforge.io/guides/best-china-cymbals-for-groove-metal` | Submitted and indexed | 2026-10-20 |  |
| `https://metalforge.io/guides/best-china-cymbals-for-metal` | Submitted and indexed | 2026-10-21 |  |
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
| `https://metalforge.io/guides/best-crash-cymbals-for-djent` | Submitted and indexed | 2026-10-31 |  |
| `https://metalforge.io/guides/best-crash-cymbals-for-doom-metal` | Submitted and indexed | 2026-10-21 |  |
| `https://metalforge.io/guides/best-crash-cymbals-for-extreme-metal` | Submitted and indexed | 2026-10-20 |  |
| `https://metalforge.io/guides/best-crash-cymbals-for-groove-metal` | Submitted and indexed | 2026-10-20 |  |
| `https://metalforge.io/guides/best-crash-cymbals-for-mathcore` | Submitted and indexed | 2026-10-21 |  |
| `https://metalforge.io/guides/best-crash-cymbals-for-metal` | Submitted and indexed | 2026-10-25 |  |
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
| `https://metalforge.io/guides/best-cymbals-for-death-metal` | Submitted and indexed | 2026-10-22 |  |
| `https://metalforge.io/guides/best-cymbals-for-deathcore` | Submitted and indexed | 2026-10-31 |  |
| `https://metalforge.io/guides/best-cymbals-for-djent` | Submitted and indexed | 2026-11-01 |  |
| `https://metalforge.io/guides/best-cymbals-for-doom-metal` | Submitted and indexed | 2026-10-26 |  |
| `https://metalforge.io/guides/best-cymbals-for-extreme-metal` | Submitted and indexed | 2026-10-20 |  |
| `https://metalforge.io/guides/best-cymbals-for-groove-metal` | Submitted and indexed | 2026-10-24 |  |
| `https://metalforge.io/guides/best-cymbals-for-mathcore` | Submitted and indexed | 2026-10-31 |  |
| `https://metalforge.io/guides/best-cymbals-for-metal` | Submitted and indexed | 2026-07-27 |  |
| `https://metalforge.io/guides/best-cymbals-for-metalcore` | Submitted and indexed | 2026-10-25 |  |
| `https://metalforge.io/guides/best-cymbals-for-nu-metal` | Submitted and indexed | 2026-10-21 |  |
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
| `https://metalforge.io/guides/best-drum-hardware-for-mathcore` | Submitted and indexed | 2026-10-20 |  |
| `https://metalforge.io/guides/best-drum-hardware-for-metalcore` | Submitted and indexed | 2026-10-21 |  |
| `https://metalforge.io/guides/best-drum-hardware-for-nu-metal` | Submitted and indexed | 2026-10-24 |  |
| `https://metalforge.io/guides/best-drum-hardware-for-post-metal` | Submitted and indexed | 2026-10-20 |  |
| `https://metalforge.io/guides/best-drum-hardware-for-power-metal` | Submitted and indexed | 2026-10-21 |  |
| _…and 331 more — see snapshot file_ | | | |

### `redirect-or-canonical` (1)

| URL | Coverage state | Last crawl | Notes |
| --- | --- | --- | --- |
| `https://metalforge.io/guides/best-drum-pedals-for-black-metal` | Alternate page with proper canonical tag | 2026-07-02 | canonical → https://metalforge.io/guides/best-snares-for-doom-metal |

### `unknown` (13)

| URL | Coverage state | Last crawl | Notes |
| --- | --- | --- | --- |
| `https://metalforge.io/guides/best-china-cymbals-for-mathcore` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummer/daray/sticks` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummer/dave-lombardo/sticks` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummer/derek-roddy/snare` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummer/dirk-verbeuren/cymbals` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummer/eloy-casagrande/cymbals` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummer/gavin-harrison/snare` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummer/gene-hoglan/hardware` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummer/john-otto/hardware` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummer/kevin-talley/sticks` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummer/mike-mangini/drums` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummer/morgan-agren/snare` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummer/navene-koperweis/hardware` | URL is unknown to Google | — |  |
