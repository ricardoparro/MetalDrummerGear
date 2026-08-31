# Indexation Health — weekly snapshot

*Auto-written by `.github/workflows/check-indexation.yml`. CEO Agent: read this every run when deciding which pages need content expansion or internal-link boosting.*

**Generated:** 2026-08-31T17:12:16.689Z
**Site:** https://metalforge.io/
**Sitemap URLs total:** 3174 · **Inspected this run:** 500 (cap 500)
**Selection:** 250 fixed sentinels (top priority, same every run — trend-comparable) + 250 rotating (full sitemap covered every ~12 runs; cursor now 1750)
**Compared against:** 2026-08-24.json

**Counts:** `indexed`=446 · `duplicate`=16 · `duplicate-google-canonical`=10 · `discovered-not-indexed`=19 · `redirect-or-canonical`=1 · `unknown`=8

**Indexed share (this run's sample):** 446 / 500 = **89.2%**
**Sentinel indexed share (week-over-week comparable):** 240 / 250 = **96.0%**
**Full-site proxy:** 1819 of 3174 sitemap URLs earned ≥1 Google impression in the last 90d (a page with impressions is indexed by definition; the inverse is not guaranteed)

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

### `duplicate` (16)

| URL | Coverage state | Last crawl | Notes |
| --- | --- | --- | --- |
| `https://metalforge.io/bpm` | Duplicate without user-selected canonical | 2026-07-03 | canonical → https://metalforge.io/lists/math-metal-drummers |
| `https://metalforge.io/guides/best-cymbals-for-progressive-metal` | Duplicate without user-selected canonical | 2026-07-04 | canonical → https://metalforge.io/lists/math-metal-drummers |
| `https://metalforge.io/guides/best-drum-hardware-for-metal` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/lists/math-metal-drummers |
| `https://metalforge.io/drummers/nick-menza/licks/nick-menza-hangar-18-technical-fill-sequence` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/lists/math-metal-drummers |
| `https://metalforge.io/drummers/sean-reinert/licks/sean-reinert-flattening-of-emotions-main-beat` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/lists/math-metal-drummers |
| `https://metalforge.io/drummers/sean-reinert/licks/sean-reinert-lack-of-comprehension-polyrhythm` | Duplicate without user-selected canonical | 2026-07-03 | canonical → https://metalforge.io/lists/math-metal-drummers |
| `https://metalforge.io/drummers/travis-orbin/licks/orbin-born-of-osiris-blast-beat` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/lists/math-metal-drummers |
| `https://metalforge.io/drummers/vinnie-paul/licks/vinnie-paul-pantera-groove-pocket` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/lists/math-metal-drummers |
| `https://metalforge.io/drummers/vinnie-paul/licks/vinnie-paul-walk-drum-groove` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/lists/math-metal-drummers |
| `https://metalforge.io/gear/dw/collectors-maple/drummers-using` | Duplicate without user-selected canonical | 2026-07-04 | canonical → https://metalforge.io/lists/math-metal-drummers |
| `https://metalforge.io/gear/dw/performance-maple/drummers-using` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/lists/math-metal-drummers |
| `https://metalforge.io/gear/gretsch/usa-custom/drummers-using` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/lists/math-metal-drummers |
| `https://metalforge.io/gear/ludwig/classic-maple/drummers-using` | Duplicate without user-selected canonical | 2026-07-03 | canonical → https://metalforge.io/lists/math-metal-drummers |
| `https://metalforge.io/gear/tama/star-classic-maple/drummers-using` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/lists/math-metal-drummers |
| `https://metalforge.io/gear/tama/superstar-classic/drummers-using` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/lists/math-metal-drummers |
| `https://metalforge.io/gear/yamaha/recording-custom/drummers-using` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/lists/math-metal-drummers |

### `duplicate-google-canonical` (10)

| URL | Coverage state | Last crawl | Notes |
| --- | --- | --- | --- |
| `https://metalforge.io/guides/beginner-metal-drummer-setup` | Duplicate, Google chose different canonical than user | 2026-08-22 | canonical → https://metalforge.io/guides/best-drum-sticks-for-metal |
| `https://metalforge.io/drummers/nick-barker/licks/nick-barker-blessings-upon-the-throne-of-tyranny-blast` | Duplicate, Google chose different canonical than user | 2026-08-01 | canonical → https://metalforge.io/drummer/68 |
| `https://metalforge.io/drummers/nick-menza/licks/nick-menza-tornado-of-souls-lick` | Duplicate, Google chose different canonical than user | 2026-08-17 | canonical → https://metalforge.io/drummer/71 |
| `https://metalforge.io/drummers/ray-luzier/licks/ray-luzier-blind-groove` | Duplicate, Google chose different canonical than user | 2026-08-17 | canonical → https://metalforge.io/drummer/71 |
| `https://metalforge.io/drummers/richard-christy/licks/richard-christy-scavenger-blast` | Duplicate, Google chose different canonical than user | 2026-08-11 | canonical → https://metalforge.io/ |
| `https://metalforge.io/drummers/shannon-larkin/licks/shannon-larkin-1000hp-double-bass` | Duplicate, Google chose different canonical than user | 2026-07-12 | canonical → https://metalforge.io/drummer/36 |
| `https://metalforge.io/drummers/shannon-larkin/licks/shannon-larkin-keep-away-groove` | Duplicate, Google chose different canonical than user | 2026-07-12 | canonical → https://metalforge.io/drummer/36 |
| `https://metalforge.io/drummers/shannon-larkin/licks/shannon-larkin-voodoo-fill` | Duplicate, Google chose different canonical than user | 2026-07-12 | canonical → https://metalforge.io/drummer/36 |
| `https://metalforge.io/drummers/vinnie-paul/licks/vinnie-paul-domination-double-bass` | Duplicate, Google chose different canonical than user | 2026-08-17 | canonical → https://metalforge.io/drummer/71 |
| `https://metalforge.io/drummers/waltteri-vayrynen/licks/waltteri-vayrynen-section-6-showcase` | Duplicate, Google chose different canonical than user | 2026-07-29 | canonical → https://metalforge.io/drummer/68 |

### `discovered-not-indexed` (19)

| URL | Coverage state | Last crawl | Notes |
| --- | --- | --- | --- |
| `https://metalforge.io/guides/best-china-cymbals-for-mathcore` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/guides/best-china-cymbals-for-sludge-metal` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/guides/best-drum-hardware-for-groove-metal` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/guides/best-drum-thrones-for-metal` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/guides/best-ride-cymbals-for-extreme-metal` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/nick-menza/endorsements` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/nicko-mcbrain/licks/nicko-mcbrain-the-number-of-the-beast` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/paul-bostaph/licks/paul-bostaph-raining-blood-double-bass` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/paul-bostaph/licks/paul-bostaph-war-ensemble-blast` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/paul-mazurkiewicz/licks/paul-mazurkiewicz-hammer-smashed-face` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/pete-sandoval/licks/pete-sandoval-immortal-rites` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/ray-luzier/licks/ray-luzier-got-the-life-groove` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/raymond-herrera/licks/raymond-herrera-edgecrusher-groove` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/travis-orbin/licks/travis-orbin-the-walk-fills` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/songs/tempo/doom` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/tools/compare/ben-koller-vs-dirk-verbeuren` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/tools/compare/bill-ward-vs-brann-dailor` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/tools/compare/hellhammer-vs-george-kollias` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/tools/compare/inferno-vs-flo-mounier` | Discovered - currently not indexed | — |  |

### `indexed` (446)

| URL | Coverage state | Last crawl | Notes |
| --- | --- | --- | --- |
| `https://metalforge.io/` | Submitted and indexed | 2026-08-22 |  |
| `https://metalforge.io/guess-the-kit` | Submitted and indexed | 2026-08-17 |  |
| `https://metalforge.io/guides/best-bass-drum-pedals-for-black-metal` | Submitted and indexed | 2026-07-13 |  |
| `https://metalforge.io/guides/best-bass-drum-pedals-for-death-metal` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-bass-drum-pedals-for-deathcore` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-bass-drum-pedals-for-djent` | Submitted and indexed | 2026-08-14 |  |
| `https://metalforge.io/guides/best-bass-drum-pedals-for-doom-metal` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-bass-drum-pedals-for-extreme-metal` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-bass-drum-pedals-for-groove-metal` | Submitted and indexed | 2026-07-13 |  |
| `https://metalforge.io/guides/best-bass-drum-pedals-for-mathcore` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-bass-drum-pedals-for-metal` | Submitted and indexed | 2026-07-02 |  |
| `https://metalforge.io/guides/best-bass-drum-pedals-for-metalcore` | Submitted and indexed | 2026-07-13 |  |
| `https://metalforge.io/guides/best-bass-drum-pedals-for-nu-metal` | Submitted and indexed | 2026-08-09 |  |
| `https://metalforge.io/guides/best-bass-drum-pedals-for-post-metal` | Submitted and indexed | 2026-08-08 |  |
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
| `https://metalforge.io/guides/best-bass-drums-for-extreme-metal` | Submitted and indexed | 2026-08-18 |  |
| `https://metalforge.io/guides/best-bass-drums-for-groove-metal` | Submitted and indexed | 2026-08-06 |  |
| `https://metalforge.io/guides/best-bass-drums-for-mathcore` | Submitted and indexed | 2026-07-13 |  |
| `https://metalforge.io/guides/best-bass-drums-for-metal` | Submitted and indexed | 2026-07-13 |  |
| `https://metalforge.io/guides/best-bass-drums-for-metalcore` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-bass-drums-for-nu-metal` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-bass-drums-for-post-metal` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-bass-drums-for-power-metal` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-bass-drums-for-progressive-metal` | Submitted and indexed | 2026-07-13 |  |
| `https://metalforge.io/guides/best-bass-drums-for-sludge-metal` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-bass-drums-for-symphonic-metal` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-bass-drums-for-technical-death-metal` | Submitted and indexed | 2026-08-09 |  |
| `https://metalforge.io/guides/best-bass-drums-for-thrash-metal` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-china-cymbals-for-black-metal` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-china-cymbals-for-death-metal` | Submitted and indexed | 2026-08-26 |  |
| `https://metalforge.io/guides/best-china-cymbals-for-deathcore` | Submitted and indexed | 2026-07-13 |  |
| `https://metalforge.io/guides/best-china-cymbals-for-djent` | Submitted and indexed | 2026-08-10 |  |
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
| `https://metalforge.io/guides/best-crash-cymbals-for-djent` | Submitted and indexed | 2026-08-21 |  |
| `https://metalforge.io/guides/best-crash-cymbals-for-doom-metal` | Submitted and indexed | 2026-07-13 |  |
| `https://metalforge.io/guides/best-crash-cymbals-for-extreme-metal` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-crash-cymbals-for-groove-metal` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-crash-cymbals-for-mathcore` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-crash-cymbals-for-metal` | Submitted and indexed | 2026-08-17 |  |
| `https://metalforge.io/guides/best-crash-cymbals-for-metalcore` | Submitted and indexed | 2026-08-28 |  |
| `https://metalforge.io/guides/best-crash-cymbals-for-nu-metal` | Submitted and indexed | 2026-07-14 |  |
| `https://metalforge.io/guides/best-crash-cymbals-for-post-metal` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-crash-cymbals-for-power-metal` | Submitted and indexed | 2026-07-13 |  |
| `https://metalforge.io/guides/best-crash-cymbals-for-progressive-metal` | Submitted and indexed | 2026-07-08 |  |
| `https://metalforge.io/guides/best-crash-cymbals-for-sludge-metal` | Submitted and indexed | 2026-07-13 |  |
| `https://metalforge.io/guides/best-crash-cymbals-for-symphonic-metal` | Submitted and indexed | 2026-07-13 |  |
| `https://metalforge.io/guides/best-crash-cymbals-for-technical-death-metal` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-crash-cymbals-for-thrash-metal` | Submitted and indexed | 2026-08-09 |  |
| `https://metalforge.io/guides/best-cymbals-for-black-metal` | Submitted and indexed | 2026-07-09 |  |
| `https://metalforge.io/guides/best-cymbals-for-death-metal` | Submitted and indexed | 2026-08-18 |  |
| `https://metalforge.io/guides/best-cymbals-for-deathcore` | Submitted and indexed | 2026-07-31 |  |
| `https://metalforge.io/guides/best-cymbals-for-djent` | Submitted and indexed | 2026-08-22 |  |
| `https://metalforge.io/guides/best-cymbals-for-doom-metal` | Submitted and indexed | 2026-08-21 |  |
| `https://metalforge.io/guides/best-cymbals-for-extreme-metal` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-cymbals-for-groove-metal` | Submitted and indexed | 2026-07-08 |  |
| `https://metalforge.io/guides/best-cymbals-for-mathcore` | Submitted and indexed | 2026-07-08 |  |
| `https://metalforge.io/guides/best-cymbals-for-metal` | Submitted and indexed | 2026-07-27 |  |
| `https://metalforge.io/guides/best-cymbals-for-metalcore` | Submitted and indexed | 2026-08-18 |  |
| `https://metalforge.io/guides/best-cymbals-for-nu-metal` | Submitted and indexed | 2026-08-07 |  |
| `https://metalforge.io/guides/best-cymbals-for-post-metal` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-cymbals-for-power-metal` | Submitted and indexed | 2026-08-19 |  |
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
| `https://metalforge.io/guides/best-drum-hardware-for-power-metal` | Submitted and indexed | 2026-07-13 |  |
| _…and 346 more — see snapshot file_ | | | |

### `redirect-or-canonical` (1)

| URL | Coverage state | Last crawl | Notes |
| --- | --- | --- | --- |
| `https://metalforge.io/guides/best-drum-pedals-for-black-metal` | Alternate page with proper canonical tag | 2026-07-02 | canonical → https://metalforge.io/guides/best-drum-sticks-for-metal |

### `unknown` (8)

| URL | Coverage state | Last crawl | Notes |
| --- | --- | --- | --- |
| `https://metalforge.io/drummers/nicko-mcbrain/licks/nicko-mcbrain-the-trooper` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummers/paul-bostaph/licks/paul-bostaph-disciple-speed-groove` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummers/scott-travis/licks/scott-travis-living-after-midnight` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummers/shannon-larkin/licks/shannon-larkin-awake-tribal-groove` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummers/tim-yeung/licks/tim-yeung-bleed-the-fifth-blast` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummers/vinnie-paul/licks/vinnie-paul-cowboys-from-hell-groove` | URL is unknown to Google | — |  |
| `https://metalforge.io/tools/compare/brann-dailor-vs-mario-duplantier` | URL is unknown to Google | — |  |
| `https://metalforge.io/tools/compare/danny-carey-vs-tomas-haake` | URL is unknown to Google | — |  |
