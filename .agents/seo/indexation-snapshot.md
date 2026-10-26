# Indexation Health — weekly snapshot

*Auto-written by `.github/workflows/check-indexation.yml`. CEO Agent: read this every run when deciding which pages need content expansion or internal-link boosting.*

**Generated:** 2026-10-26T09:41:58.500Z
**Site:** https://metalforge.io/
**Sitemap URLs total:** 3159 · **Inspected this run:** 500 (cap 500)
**Selection:** 250 fixed sentinels (top priority, same every run — trend-comparable) + 250 rotating (full sitemap covered every ~12 runs; cursor now 838)
**Compared against:** 2026-10-19.json

**Counts:** `indexed`=429 · `duplicate`=12 · `duplicate-google-canonical`=3 · `discovered-not-indexed`=17 · `unknown`=5 · `redirect-or-canonical`=1 · `crawled-not-indexed`=27 · `error-inspect`=3 · `error-404`=1 · `soft-404`=2

**Indexed share (this run's sample):** 429 / 497 = **86.3%**
**Sentinel indexed share (week-over-week comparable):** 238 / 250 = **95.2%**
**Full-site proxy:** 2268 of 3159 sitemap URLs earned ≥1 Google impression in the last 90d (a page with impressions is indexed by definition; the inverse is not guaranteed)

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

### `crawled-not-indexed` (27)

| URL | Coverage state | Last crawl | Notes |
| --- | --- | --- | --- |
| `https://metalforge.io/guides/best-drum-pedals-for-groove-metal` | Crawled - currently not indexed | 2026-08-19 |  |
| `https://metalforge.io/drummers/richard-christy/gear-history` | Crawled - currently not indexed | 2026-07-07 |  |
| `https://metalforge.io/drummers/tim-yeung/licks` | Crawled - currently not indexed | 2026-06-27 |  |
| `https://metalforge.io/gear` | Crawled - currently not indexed | 2026-07-01 |  |
| `https://metalforge.io/gear/hardware` | Crawled - currently not indexed | 2026-06-27 |  |
| `https://metalforge.io/guides` | Crawled - currently not indexed | 2026-08-09 |  |
| `https://metalforge.io/guides/how-to-sound-like-arin-ilejay` | Crawled - currently not indexed | 2026-07-07 |  |
| `https://metalforge.io/guides/how-to-sound-like-blake-richardson` | Crawled - currently not indexed | 2026-07-02 |  |
| `https://metalforge.io/guides/how-to-sound-like-jocke-wallgren` | Crawled - currently not indexed | 2026-07-02 |  |
| `https://metalforge.io/lists` | Crawled - currently not indexed | 2026-07-17 |  |
| `https://metalforge.io/quotes` | Crawled - currently not indexed | 2026-07-02 |  |
| `https://metalforge.io/vs` | Crawled - currently not indexed | 2026-08-20 |  |
| `https://metalforge.io/battles/tomas-haake-vs-mario-duplantier` | Crawled - currently not indexed | 2026-06-27 |  |
| `https://metalforge.io/battles/vinnie-paul-vs-dave-lombardo` | Crawled - currently not indexed | 2026-06-27 |  |
| `https://metalforge.io/drummer/abe-cunningham/heads` | Crawled - currently not indexed | 2026-07-12 |  |
| `https://metalforge.io/drummer/abe-cunningham/snare` | Crawled - currently not indexed | 2026-06-28 |  |
| `https://metalforge.io/drummer/alex-bent/cymbals` | Crawled - currently not indexed | 2026-06-27 |  |
| `https://metalforge.io/drummer/alex-bent/drums` | Crawled - currently not indexed | 2026-06-27 |  |
| `https://metalforge.io/drummer/alex-bent/snare` | Crawled - currently not indexed | 2026-06-27 |  |
| `https://metalforge.io/drummer/alex-bent/sticks` | Crawled - currently not indexed | 2026-06-27 |  |
| `https://metalforge.io/drummer/ben-koller/heads` | Crawled - currently not indexed | 2026-07-12 |  |
| `https://metalforge.io/drummer/ben-koller/sticks` | Crawled - currently not indexed | 2026-06-28 |  |
| `https://metalforge.io/drummer/blake-richardson/drums` | Crawled - currently not indexed | 2026-06-27 |  |
| `https://metalforge.io/drummer/brann-dailor/snare` | Crawled - currently not indexed | 2026-06-27 |  |
| `https://metalforge.io/drummer/brann-dailor/sticks` | Crawled - currently not indexed | 2026-06-28 |  |
| `https://metalforge.io/drummer/charlie-benante/sticks` | Crawled - currently not indexed | 2026-06-28 |  |
| `https://metalforge.io/drummer/chris-adler/hardware` | Crawled - currently not indexed | 2026-06-27 |  |

### `error-404` (1)

| URL | Coverage state | Last crawl | Notes |
| --- | --- | --- | --- |
| `https://metalforge.io/drummers/paul-mazurkiewicz/gear-history` | Not found (404) | 2026-07-06 |  |

### `soft-404` (2)

| URL | Coverage state | Last crawl | Notes |
| --- | --- | --- | --- |
| `https://metalforge.io/stats` | Soft 404 | 2026-07-06 |  |
| `https://metalforge.io/stats/gear-insights` | Soft 404 | 2026-06-29 |  |

### `duplicate` (12)

| URL | Coverage state | Last crawl | Notes |
| --- | --- | --- | --- |
| `https://metalforge.io/bpm` | Duplicate without user-selected canonical | 2026-07-03 | canonical → https://metalforge.io/lists/math-metal-drummers |
| `https://metalforge.io/guides/best-cymbals-for-progressive-metal` | Duplicate without user-selected canonical | 2026-07-04 | canonical → https://metalforge.io/lists/math-metal-drummers |
| `https://metalforge.io/guides/best-drum-hardware-for-metal` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/lists/math-metal-drummers |
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
| `https://metalforge.io/guides/beginner-metal-drummer-setup` | Duplicate, Google chose different canonical than user | 2026-08-22 | canonical → https://metalforge.io/guides/best-snares-for-doom-metal |
| `https://metalforge.io/drummers/paul-bostaph/gear-history` | Duplicate, Google chose different canonical than user | 2026-07-07 | canonical → https://metalforge.io/drummer/71 |
| `https://metalforge.io/guides/how-to-sound-like-adrian-erlandsson` | Duplicate, Google chose different canonical than user | 2026-07-07 | canonical → https://metalforge.io/guides/best-snares-for-doom-metal |

### `discovered-not-indexed` (17)

| URL | Coverage state | Last crawl | Notes |
| --- | --- | --- | --- |
| `https://metalforge.io/guides/best-china-cymbals-for-mathcore` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/guides/best-china-cymbals-for-sludge-metal` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/guides/best-drum-thrones-for-metal` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/guides/best-ride-cymbals-for-extreme-metal` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/paul-bostaph/licks` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/songs` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/arin-ilejay/cymbals` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/art-cruz/drums` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/ben-koller/cymbals` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/bill-ward/hardware` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/blake-richardson/cymbals` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/blake-richardson/hardware` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/charlie-benante/cymbals` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/chris-turner/hardware` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/daniel-erlandsson/cymbals` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/danny-carey/drums` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/danny-carey/snare` | Discovered - currently not indexed | — |  |

### `indexed` (429)

| URL | Coverage state | Last crawl | Notes |
| --- | --- | --- | --- |
| `https://metalforge.io/` | Submitted and indexed | 2026-10-25 |  |
| `https://metalforge.io/guess-the-kit` | Submitted and indexed | 2026-08-17 |  |
| `https://metalforge.io/guides/best-bass-drum-pedals-for-black-metal` | Submitted and indexed | 2026-10-21 |  |
| `https://metalforge.io/guides/best-bass-drum-pedals-for-death-metal` | Submitted and indexed | 2026-10-20 |  |
| `https://metalforge.io/guides/best-bass-drum-pedals-for-deathcore` | Submitted and indexed | 2026-09-05 |  |
| `https://metalforge.io/guides/best-bass-drum-pedals-for-djent` | Submitted and indexed | 2026-08-14 |  |
| `https://metalforge.io/guides/best-bass-drum-pedals-for-doom-metal` | Submitted and indexed | 2026-10-20 |  |
| `https://metalforge.io/guides/best-bass-drum-pedals-for-extreme-metal` | Submitted and indexed | 2026-10-24 |  |
| `https://metalforge.io/guides/best-bass-drum-pedals-for-groove-metal` | Submitted and indexed | 2026-10-21 |  |
| `https://metalforge.io/guides/best-bass-drum-pedals-for-mathcore` | Submitted and indexed | 2026-10-20 |  |
| `https://metalforge.io/guides/best-bass-drum-pedals-for-metal` | Submitted and indexed | 2026-10-10 |  |
| `https://metalforge.io/guides/best-bass-drum-pedals-for-metalcore` | Submitted and indexed | 2026-10-21 |  |
| `https://metalforge.io/guides/best-bass-drum-pedals-for-nu-metal` | Submitted and indexed | 2026-10-25 |  |
| `https://metalforge.io/guides/best-bass-drum-pedals-for-post-metal` | Submitted and indexed | 2026-08-08 |  |
| `https://metalforge.io/guides/best-bass-drum-pedals-for-power-metal` | Submitted and indexed | 2026-10-21 |  |
| `https://metalforge.io/guides/best-bass-drum-pedals-for-progressive-metal` | Submitted and indexed | 2026-10-25 |  |
| `https://metalforge.io/guides/best-bass-drum-pedals-for-sludge-metal` | Submitted and indexed | 2026-10-20 |  |
| `https://metalforge.io/guides/best-bass-drum-pedals-for-symphonic-metal` | Submitted and indexed | 2026-10-24 |  |
| `https://metalforge.io/guides/best-bass-drum-pedals-for-technical-death-metal` | Submitted and indexed | 2026-09-12 |  |
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
| `https://metalforge.io/guides/best-china-cymbals-for-death-metal` | Submitted and indexed | 2026-08-26 |  |
| `https://metalforge.io/guides/best-china-cymbals-for-deathcore` | Submitted and indexed | 2026-10-21 |  |
| `https://metalforge.io/guides/best-china-cymbals-for-djent` | Submitted and indexed | 2026-08-10 |  |
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
| `https://metalforge.io/guides/best-crash-cymbals-for-djent` | Submitted and indexed | 2026-10-09 |  |
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
| `https://metalforge.io/guides/best-crash-cymbals-for-thrash-metal` | Submitted and indexed | 2026-08-09 |  |
| `https://metalforge.io/guides/best-cymbals-for-black-metal` | Submitted and indexed | 2026-10-17 |  |
| `https://metalforge.io/guides/best-cymbals-for-death-metal` | Submitted and indexed | 2026-10-22 |  |
| `https://metalforge.io/guides/best-cymbals-for-deathcore` | Submitted and indexed | 2026-07-31 |  |
| `https://metalforge.io/guides/best-cymbals-for-djent` | Submitted and indexed | 2026-10-22 |  |
| `https://metalforge.io/guides/best-cymbals-for-doom-metal` | Submitted and indexed | 2026-10-26 |  |
| `https://metalforge.io/guides/best-cymbals-for-extreme-metal` | Submitted and indexed | 2026-10-20 |  |
| `https://metalforge.io/guides/best-cymbals-for-groove-metal` | Submitted and indexed | 2026-10-24 |  |
| `https://metalforge.io/guides/best-cymbals-for-mathcore` | Submitted and indexed | 2026-07-08 |  |
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
| _…and 329 more — see snapshot file_ | | | |

### `redirect-or-canonical` (1)

| URL | Coverage state | Last crawl | Notes |
| --- | --- | --- | --- |
| `https://metalforge.io/guides/best-drum-pedals-for-black-metal` | Alternate page with proper canonical tag | 2026-07-02 | canonical → https://metalforge.io/guides/best-snares-for-doom-metal |

### `unknown` (5)

| URL | Coverage state | Last crawl | Notes |
| --- | --- | --- | --- |
| `https://metalforge.io/guides/best-drum-hardware-for-groove-metal` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummers/sean-reinert/gear-history` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummers/shannon-larkin/gear-history` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummers/vinnie-paul/gear-history` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummer/abe-cunningham/hardware` | URL is unknown to Google | — |  |
