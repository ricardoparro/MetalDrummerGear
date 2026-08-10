# Indexation Health — weekly snapshot

*Auto-written by `.github/workflows/check-indexation.yml`. CEO Agent: read this every run when deciding which pages need content expansion or internal-link boosting.*

**Generated:** 2026-08-10T09:55:26.482Z
**Site:** https://metalforge.io/
**Sitemap URLs total:** 3180 · **Inspected this run:** 500 (cap 500)
**Selection:** 250 fixed sentinels (top priority, same every run — trend-comparable) + 250 rotating (full sitemap covered every ~12 runs; cursor now 1000)
**Compared against:** 2026-08-03.json

**Counts:** `indexed`=366 · `duplicate`=2 · `discovered-not-indexed`=103 · `error-inspect`=25 · `unknown`=4

**Indexed share (this run's sample):** 366 / 475 = **77.1%**
**Sentinel indexed share (week-over-week comparable):** 228 / 250 = **91.2%**
**Full-site proxy:** 1601 of 3180 sitemap URLs earned ≥1 Google impression in the last 90d (a page with impressions is indexed by definition; the inverse is not guaranteed)

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

### `duplicate` (2)

| URL | Coverage state | Last crawl | Notes |
| --- | --- | --- | --- |
| `https://metalforge.io/bpm` | Duplicate without user-selected canonical | 2026-07-03 | canonical → https://metalforge.io/lists/math-metal-drummers |
| `https://metalforge.io/guides/best-drum-hardware-for-metal` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/lists/math-metal-drummers |

### `discovered-not-indexed` (103)

| URL | Coverage state | Last crawl | Notes |
| --- | --- | --- | --- |
| `https://metalforge.io/guides/best-china-cymbals-for-mathcore` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/guides/best-china-cymbals-for-sludge-metal` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/guides/best-drum-hardware-for-groove-metal` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/guides/best-ride-cymbals-for-extreme-metal` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/alex-bent/hardware` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/aquiles-priester/cymbals` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/aquiles-priester/drums` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/aquiles-priester/hardware` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/aquiles-priester/snare` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/arin-ilejay/cymbals` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/arin-ilejay/drums` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/arin-ilejay/hardware` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/arin-ilejay/snare` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/art-cruz/cymbals` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/art-cruz/drums` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/art-cruz/sticks` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/ben-koller/cymbals` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/ben-koller/hardware` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/ben-koller/snare` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/blake-richardson/cymbals` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/blake-richardson/hardware` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/blake-richardson/snare` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/blake-richardson/sticks` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/brann-dailor/cymbals` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/brann-dailor/drums` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/brann-dailor/hardware` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/charlie-benante/drums` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/charlie-benante/hardware` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/charlie-benante/snare` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/chris-adler/drums` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/chris-adler/sticks` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/chris-turner/cymbals` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/chris-turner/hardware` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/chris-turner/snare` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/chris-turner/sticks` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/daniel-erlandsson/cymbals` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/daniel-erlandsson/drums` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/daniel-erlandsson/hardware` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/daniel-erlandsson/sticks` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/danny-carey/cymbals` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/danny-carey/drums` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/danny-carey/hardware` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/danny-carey/snare` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/danny-carey/sticks` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/daray/drums` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/daray/sticks` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/dave-lombardo/drums` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/dave-lombardo/hardware` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/dave-lombardo/sticks` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/derek-roddy/snare` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/dirk-verbeuren/cymbals` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/dirk-verbeuren/drums` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/dirk-verbeuren/hardware` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/dirk-verbeuren/snare` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/dirk-verbeuren/sticks` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/eloy-casagrande/cymbals` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/eloy-casagrande/drums` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/eloy-casagrande/snare` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/eloy-casagrande/sticks` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/flo-mounier/hardware` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/flo-mounier/sticks` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/frost/cymbals` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/gavin-harrison/snare` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/gene-hoglan/cymbals` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/gene-hoglan/drums` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/gene-hoglan/hardware` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/gene-hoglan/snare` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/gene-hoglan/sticks` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/george-kollias/cymbals` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/george-kollias/snare` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/george-kollias/sticks` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/hannes-grossmann/cymbals` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/hannes-grossmann/hardware` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/hannes-grossmann/snare` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/hannes-grossmann/sticks` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/hellhammer/drums` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/hellhammer/hardware` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/hellhammer/snare` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/igor-cavalera/cymbals` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/igor-cavalera/snare` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/inferno/cymbals` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/inferno/drums` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/inferno/hardware` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/isaac-lamb/drums` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/isaac-lamb/snare` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/isaac-lamb/sticks` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/jaska-raatikainen/cymbals` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/jaska-raatikainen/hardware` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/jaska-raatikainen/snare` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/jaska-raatikainen/sticks` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/jason-bittner/cymbals` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/jason-bittner/hardware` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/jason-bittner/snare` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/jason-bittner/sticks` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/jay-weinberg/cymbals` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/jay-weinberg/snare` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/jocke-wallgren/drums` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/jocke-wallgren/hardware` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/jocke-wallgren/heads` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/joey-jordison/drums` | Discovered - currently not indexed | — |  |
| _…and 3 more — see snapshot file_ | | | |

### `indexed` (366)

| URL | Coverage state | Last crawl | Notes |
| --- | --- | --- | --- |
| `https://metalforge.io/` | Submitted and indexed | 2026-08-05 |  |
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
| `https://metalforge.io/guides/best-bass-drums-for-extreme-metal` | Submitted and indexed | 2026-07-03 |  |
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
| `https://metalforge.io/guides/best-china-cymbals-for-death-metal` | Submitted and indexed | 2026-07-12 |  |
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
| `https://metalforge.io/guides/best-crash-cymbals-for-thrash-metal` | Submitted and indexed | 2026-08-09 |  |
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
| `https://metalforge.io/guides/best-cymbals-for-nu-metal` | Submitted and indexed | 2026-08-07 |  |
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
| `https://metalforge.io/guides/best-drum-hardware-for-metalcore` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-drum-hardware-for-nu-metal` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-drum-hardware-for-post-metal` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-drum-hardware-for-power-metal` | Submitted and indexed | 2026-07-13 |  |
| _…and 266 more — see snapshot file_ | | | |

### `unknown` (4)

| URL | Coverage state | Last crawl | Notes |
| --- | --- | --- | --- |
| `https://metalforge.io/drummer/art-cruz/snare` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummer/bill-ward/hardware` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummer/charlie-benante/cymbals` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummer/derek-roddy/hardware` | URL is unknown to Google | — |  |
