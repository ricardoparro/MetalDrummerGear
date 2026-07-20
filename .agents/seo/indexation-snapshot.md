# Indexation Health — weekly snapshot

*Auto-written by `.github/workflows/check-indexation.yml`. CEO Agent: read this every run when deciding which pages need content expansion or internal-link boosting.*

**Generated:** 2026-07-20T10:21:08.082Z
**Site:** https://metalforge.io/
**Sitemap URLs total:** 3041 · **Inspected this run:** 500 (cap 500)
**Selection:** 250 fixed sentinels (top priority, same every run — trend-comparable) + 250 rotating (full sitemap covered every ~12 runs; cursor now 250)
**Compared against:** 2026-07-13.json

**Counts:** `indexed`=442 · `duplicate`=25 · `discovered-not-indexed`=20 · `unknown`=3 · `redirect-or-canonical`=10

**Indexed share (this run's sample):** 442 / 500 = **88.4%**
**Sentinel indexed share (week-over-week comparable):** 239 / 250 = **95.6%**
**Full-site proxy:** 1037 of 3041 sitemap URLs earned ≥1 Google impression in the last 90d (a page with impressions is indexed by definition; the inverse is not guaranteed)

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

### `duplicate` (25)

| URL | Coverage state | Last crawl | Notes |
| --- | --- | --- | --- |
| `https://metalforge.io/bpm` | Duplicate without user-selected canonical | 2026-07-03 | canonical → https://metalforge.io/drummer/navene-koperweis |
| `https://metalforge.io/guides/best-cymbals-for-progressive-metal` | Duplicate without user-selected canonical | 2026-07-04 | canonical → https://metalforge.io/drummer/navene-koperweis |
| `https://metalforge.io/guides/best-drum-hardware-for-metal` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/drummer/navene-koperweis |
| `https://metalforge.io/articles/are-you-dead-yet-drum-setup` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/drummer/navene-koperweis |
| `https://metalforge.io/articles/blood-mountain-drum-setup` | Duplicate without user-selected canonical | 2026-07-03 | canonical → https://metalforge.io/drummer/navene-koperweis |
| `https://metalforge.io/articles/brave-new-world-drum-setup` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/drummer/navene-koperweis |
| `https://metalforge.io/articles/brotherhood-of-the-snake-drum-setup` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/drummer/navene-koperweis |
| `https://metalforge.io/articles/butchered-at-birth-drum-setup` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/drummer/navene-koperweis |
| `https://metalforge.io/articles/chocolate-starfish-drum-setup` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/drummer/navene-koperweis |
| `https://metalforge.io/articles/constellations-drum-setup` | Duplicate without user-selected canonical | 2026-07-03 | canonical → https://metalforge.io/drummer/navene-koperweis |
| `https://metalforge.io/articles/deceivers-drum-setup` | Duplicate without user-selected canonical | 2026-07-03 | canonical → https://metalforge.io/drummer/navene-koperweis |
| `https://metalforge.io/articles/deftones-self-titled-drum-setup` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/drummer/navene-koperweis |
| `https://metalforge.io/articles/eloy-casagrande-m72-drum-setup` | Duplicate without user-selected canonical | 2026-07-03 | canonical → https://metalforge.io/drummer/navene-koperweis |
| `https://metalforge.io/articles/falling-into-infinity-drum-setup` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/drummer/navene-koperweis |
| `https://metalforge.io/articles/focus-drum-setup` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/drummer/navene-koperweis |
| `https://metalforge.io/articles/godsmack-1000hp-drum-setup` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/drummer/navene-koperweis |
| `https://metalforge.io/articles/hail-to-the-king-drum-setup` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/drummer/navene-koperweis |
| `https://metalforge.io/articles/hushed-and-grim-drum-setup` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/drummer/navene-koperweis |
| `https://metalforge.io/articles/i-loved-you-at-your-darkest-drum-setup` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/drummer/navene-koperweis |
| `https://metalforge.io/articles/immutable-drum-setup` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/drummer/navene-koperweis |
| `https://metalforge.io/articles/in-sorte-diaboli-drum-setup` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/drummer/navene-koperweis |
| `https://metalforge.io/articles/invincible-shield-drum-setup` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/drummer/navene-koperweis |
| `https://metalforge.io/articles/jaska-raatikainen-drum-setup` | Duplicate without user-selected canonical | 2026-07-03 | canonical → https://metalforge.io/drummer/navene-koperweis |
| `https://metalforge.io/articles/jugulator-drum-setup` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/drummer/navene-koperweis |
| `https://metalforge.io/articles/leveler-drum-setup` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/drummer/navene-koperweis |

### `discovered-not-indexed` (20)

| URL | Coverage state | Last crawl | Notes |
| --- | --- | --- | --- |
| `https://metalforge.io/guides/best-china-cymbals-for-mathcore` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/guides/best-drum-pedals-for-death-metal` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/guides/best-drum-thrones-for-metal` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/guides/best-snare-drums-for-deathcore` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/guides/best-snare-drums-for-technical-death-metal` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/guides/budget-metal-drum-setup-500` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/tools/compare` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/tools/metal-drummer-name-generator` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/articles/a-dramatic-turn-of-events-drum-setup` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/articles/and-justice-for-all-drum-setup` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/articles/aquiles-priester-drum-setup` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/articles/ben-koller-drum-setup` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/articles/beneath-the-remains-drum-setup` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/articles/brann-dailor-mastodon-drum-setup` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/articles/daniel-erlandsson-drum-setup` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/articles/how-to-play-blast-beats` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/articles/iowa-drum-setup` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/articles/isaac-lamb-drum-setup` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/articles/joey-jordison-drum-setup` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/articles/joey-jordison-legacy` | Discovered - currently not indexed | — |  |

### `indexed` (442)

| URL | Coverage state | Last crawl | Notes |
| --- | --- | --- | --- |
| `https://metalforge.io/` | Submitted and indexed | 2026-07-15 |  |
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
| `https://metalforge.io/guides/best-cymbals-for-deathcore` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-cymbals-for-djent` | Submitted and indexed | 2026-07-14 |  |
| `https://metalforge.io/guides/best-cymbals-for-doom-metal` | Submitted and indexed | 2026-07-14 |  |
| `https://metalforge.io/guides/best-cymbals-for-extreme-metal` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-cymbals-for-groove-metal` | Submitted and indexed | 2026-07-08 |  |
| `https://metalforge.io/guides/best-cymbals-for-mathcore` | Submitted and indexed | 2026-07-08 |  |
| `https://metalforge.io/guides/best-cymbals-for-metal` | Submitted and indexed | 2026-07-02 |  |
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
| _…and 342 more — see snapshot file_ | | | |

### `redirect-or-canonical` (10)

| URL | Coverage state | Last crawl | Notes |
| --- | --- | --- | --- |
| `https://metalforge.io/guides/best-drum-pedals-for-black-metal` | Alternate page with proper canonical tag | 2026-07-02 | canonical → https://metalforge.io/guides/budget-metal-drum-setup-1000 |
| `https://metalforge.io/guides/budget-metal-drum-setup-2000` | Alternate page with proper canonical tag | 2026-06-28 | canonical → https://metalforge.io/ |
| `https://metalforge.io/articles` | Alternate page with proper canonical tag | 2026-06-28 | canonical → https://metalforge.io/ |
| `https://metalforge.io/articles/angel-of-retribution-drum-setup` | Alternate page with proper canonical tag | 2026-07-02 | canonical → https://metalforge.io/lists/groove-metal-drummers |
| `https://metalforge.io/articles/beacon-drum-setup` | Alternate page with proper canonical tag | 2026-07-02 | canonical → https://metalforge.io/lists/groove-metal-drummers |
| `https://metalforge.io/articles/book-of-souls-drum-setup` | Alternate page with proper canonical tag | 2026-07-02 | canonical → https://metalforge.io/lists/groove-metal-drummers |
| `https://metalforge.io/articles/countdown-to-extinction-drum-setup` | Alternate page with proper canonical tag | 2026-07-02 | canonical → https://metalforge.io/lists/groove-metal-drummers |
| `https://metalforge.io/articles/de-mysteriis-dom-sathanas-drum-setup` | Alternate page with proper canonical tag | 2026-07-02 | canonical → https://metalforge.io/lists/groove-metal-drummers |
| `https://metalforge.io/articles/divine-intervention-drum-setup` | Alternate page with proper canonical tag | 2026-07-03 | canonical → https://metalforge.io/lists/groove-metal-drummers |
| `https://metalforge.io/articles/hellhammer-drum-setup` | Alternate page with proper canonical tag | 2026-06-20 | canonical → https://metalforge.io/ |

### `unknown` (3)

| URL | Coverage state | Last crawl | Notes |
| --- | --- | --- | --- |
| `https://metalforge.io/guides/best-china-cymbals-for-sludge-metal` | URL is unknown to Google | — |  |
| `https://metalforge.io/guides/best-drum-hardware-for-groove-metal` | URL is unknown to Google | — |  |
| `https://metalforge.io/guides/best-ride-cymbals-for-extreme-metal` | URL is unknown to Google | — |  |
