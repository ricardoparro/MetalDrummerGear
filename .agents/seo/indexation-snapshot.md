# Indexation Health — weekly snapshot

*Auto-written by `.github/workflows/check-indexation.yml`. CEO Agent: read this every run when deciding which pages need content expansion or internal-link boosting.*

**Generated:** 2026-11-09T09:29:37.996Z
**Site:** https://metalforge.io/
**Sitemap URLs total:** 3159 · **Inspected this run:** 500 (cap 500)
**Selection:** 250 fixed sentinels (top priority, same every run — trend-comparable) + 250 rotating (full sitemap covered every ~12 runs; cursor now 1338)
**Compared against:** 2026-11-02.json

**Counts:** `indexed`=401 · `duplicate`=12 · `duplicate-google-canonical`=22 · `discovered-not-indexed`=19 · `unknown`=7 · `crawled-not-indexed`=37 · `redirect-or-canonical`=1 · `error-404`=1

**Indexed share (this run's sample):** 401 / 500 = **80.2%**
**Sentinel indexed share (week-over-week comparable):** 235 / 250 = **94.0%**
**Full-site proxy:** 2283 of 3159 sitemap URLs earned ≥1 Google impression in the last 90d (a page with impressions is indexed by definition; the inverse is not guaranteed)

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

### `crawled-not-indexed` (37)

| URL | Coverage state | Last crawl | Notes |
| --- | --- | --- | --- |
| `https://metalforge.io/guides/best-drum-kits-for-black-metal` | Crawled - currently not indexed | 2026-10-09 |  |
| `https://metalforge.io/guides/best-drum-modules-for-metal` | Crawled - currently not indexed | 2026-10-10 |  |
| `https://metalforge.io/guides/best-drum-pedals-for-groove-metal` | Crawled - currently not indexed | 2026-08-19 |  |
| `https://metalforge.io/guides/best-drumsticks-for-groove-metal` | Crawled - currently not indexed | 2026-11-01 |  |
| `https://metalforge.io/guides/best-hi-hats-for-power-metal` | Crawled - currently not indexed | 2026-10-31 |  |
| `https://metalforge.io/drummer/nick-augusto/snare` | Crawled - currently not indexed | 2026-06-28 |  |
| `https://metalforge.io/drummer/nicko-mcbrain/drums` | Crawled - currently not indexed | 2026-06-28 |  |
| `https://metalforge.io/drummer/nicko-mcbrain/snare` | Crawled - currently not indexed | 2026-06-28 |  |
| `https://metalforge.io/drummer/nicko-mcbrain/sticks` | Crawled - currently not indexed | 2026-06-28 |  |
| `https://metalforge.io/drummer/paul-mazurkiewicz/hardware` | Crawled - currently not indexed | 2026-06-27 |  |
| `https://metalforge.io/drummer/pete-sandoval/drums` | Crawled - currently not indexed | 2026-06-27 |  |
| `https://metalforge.io/drummer/pete-sandoval/sticks` | Crawled - currently not indexed | 2026-06-27 |  |
| `https://metalforge.io/drummer/raymond-herrera/cymbals` | Crawled - currently not indexed | 2026-06-27 |  |
| `https://metalforge.io/drummer/raymond-herrera/hardware` | Crawled - currently not indexed | 2026-06-27 |  |
| `https://metalforge.io/drummer/ryan-van-poederooyen/drums` | Crawled - currently not indexed | 2026-06-27 |  |
| `https://metalforge.io/drummer/ryan-van-poederooyen/heads` | Crawled - currently not indexed | 2026-07-13 |  |
| `https://metalforge.io/drummer/scott-travis/snare` | Crawled - currently not indexed | 2026-06-28 |  |
| `https://metalforge.io/drummer/sean-reinert/sticks` | Crawled - currently not indexed | 2026-07-12 |  |
| `https://metalforge.io/drummer/shannon-larkin/snare` | Crawled - currently not indexed | 2026-06-27 |  |
| `https://metalforge.io/drummer/tomas-haake/sticks` | Crawled - currently not indexed | 2026-06-28 |  |
| `https://metalforge.io/drummers/alex-bent/licks/alex-bent-seat-of-the-soul-drum-setup` | Crawled - currently not indexed | 2026-08-03 |  |
| `https://metalforge.io/drummers/aquiles-priester/licks/aquiles-priester-spread-your-fire` | Crawled - currently not indexed | 2026-06-27 |  |
| `https://metalforge.io/drummers/arin-ilejay/endorsements` | Crawled - currently not indexed | 2026-07-12 |  |
| `https://metalforge.io/drummers/art-cruz/licks/art-cruz-new-colossal-hate-drum-setup` | Crawled - currently not indexed | 2026-08-02 |  |
| `https://metalforge.io/drummers/ben-koller/licks/ben-koller-concubine-grind` | Crawled - currently not indexed | 2026-06-27 |  |
| `https://metalforge.io/drummers/bill-ward/licks/bill-ward-war-pigs-groove` | Crawled - currently not indexed | 2026-06-27 |  |
| `https://metalforge.io/drummers/blake-richardson/licks/blake-richardson-telos-progressive-fills` | Crawled - currently not indexed | 2026-06-28 |  |
| `https://metalforge.io/drummers/brann-dailor/licks/brann-dailor-ghost-of-karelia-groove` | Crawled - currently not indexed | 2026-06-28 |  |
| `https://metalforge.io/drummers/brann-dailor/licks/brann-dailor-hearts-alive-fills` | Crawled - currently not indexed | 2026-06-28 |  |
| `https://metalforge.io/drummers/charlie-benante/endorsements` | Crawled - currently not indexed | 2026-06-27 |  |
| `https://metalforge.io/drummers/charlie-benante/licks/charlie-benante-indians-war-dance` | Crawled - currently not indexed | 2026-08-03 |  |
| `https://metalforge.io/drummers/danny-carey/signature/danny-carey-paiste-giant-beat-gongs` | Crawled - currently not indexed | 2026-06-28 |  |
| `https://metalforge.io/drummers/daray/endorsements` | Crawled - currently not indexed | 2026-07-12 |  |
| `https://metalforge.io/drummers/dave-lombardo/licks/dave-lombardo-seasons-thrash` | Crawled - currently not indexed | 2026-06-27 |  |
| `https://metalforge.io/drummers/frost/endorsements` | Crawled - currently not indexed | 2026-07-13 |  |
| `https://metalforge.io/drummers/frost/licks/frost-mother-north-groove` | Crawled - currently not indexed | 2026-07-01 |  |
| `https://metalforge.io/drummers/gavin-harrison/licks/gavin-harrison-anesthetize` | Crawled - currently not indexed | 2026-08-09 |  |

### `error-404` (1)

| URL | Coverage state | Last crawl | Notes |
| --- | --- | --- | --- |
| `https://metalforge.io/drummers/ben-koller/licks/ben-koller-aimless-arrow-hardcore` | Not found (404) | 2026-07-07 |  |

### `duplicate` (12)

| URL | Coverage state | Last crawl | Notes |
| --- | --- | --- | --- |
| `https://metalforge.io/bpm` | Duplicate without user-selected canonical | 2026-07-03 | canonical → https://metalforge.io/lists/math-metal-drummers |
| `https://metalforge.io/guides/best-cymbals-for-progressive-metal` | Duplicate without user-selected canonical | 2026-07-04 | canonical → https://metalforge.io/lists/math-metal-drummers |
| `https://metalforge.io/guides/best-drum-hardware-for-metal` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/lists/math-metal-drummers |
| `https://metalforge.io/drummers/abe-cunningham/licks/cunningham-diamond-eyes-fill` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/lists/math-metal-drummers |
| `https://metalforge.io/drummers/abe-cunningham/licks/cunningham-white-pony-groove` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/lists/math-metal-drummers |
| `https://metalforge.io/drummers/charlie-benante/licks/charlie-benante-among-the-living-thrash-groove` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/lists/math-metal-drummers |
| `https://metalforge.io/drummers/charlie-benante/licks/charlie-benante-persistence-of-time-blast` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/lists/math-metal-drummers |
| `https://metalforge.io/drummers/chris-adler/licks/chris-adler-redneck-drum-setup` | Duplicate without user-selected canonical | 2026-07-03 | canonical → https://metalforge.io/lists/math-metal-drummers |
| `https://metalforge.io/drummers/danny-carey/licks/danny-carey-schism-odd-meter-groove` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/lists/math-metal-drummers |
| `https://metalforge.io/drummers/dave-lombardo/licks/dave-lombardo-raining-blood-lick` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/lists/math-metal-drummers |
| `https://metalforge.io/drummers/dave-lombardo/licks/dave-lombardo-south-of-heaven-lick` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/lists/math-metal-drummers |
| `https://metalforge.io/drummers/gene-hoglan/licks/gene-hoglan-darkness-descends-lick` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/lists/math-metal-drummers |

### `duplicate-google-canonical` (22)

| URL | Coverage state | Last crawl | Notes |
| --- | --- | --- | --- |
| `https://metalforge.io/guides/beginner-metal-drummer-setup` | Duplicate, Google chose different canonical than user | 2026-08-22 | canonical → https://metalforge.io/guides/best-snares-for-doom-metal |
| `https://metalforge.io/drummers/abe-cunningham/licks/cunningham-saturday-night-wrist-pattern` | Duplicate, Google chose different canonical than user | 2026-08-17 | canonical → https://metalforge.io/drummer/71 |
| `https://metalforge.io/drummers/adrian-erlandsson/licks/adrian-erlandsson-at-war-with-reality-drum-setup` | Duplicate, Google chose different canonical than user | 2026-07-12 | canonical → https://metalforge.io/drummer/71 |
| `https://metalforge.io/drummers/adrian-erlandsson/licks/adrian-erlandsson-slaughter-of-the-soul-drum-setup` | Duplicate, Google chose different canonical than user | 2026-07-12 | canonical → https://metalforge.io/drummer/71 |
| `https://metalforge.io/drummers/adrian-erlandsson/licks/adrian-erlandsson-to-drink-from-the-night-itself-drum-setup` | Duplicate, Google chose different canonical than user | 2026-07-13 | canonical → https://metalforge.io/drummer/71 |
| `https://metalforge.io/drummers/alex-bent/licks/alex-bent-a-crisis-of-revelation-drum-setup` | Duplicate, Google chose different canonical than user | 2026-08-01 | canonical → https://metalforge.io/drummer/71 |
| `https://metalforge.io/drummers/alex-rudinger/licks/alex-rudinger-autotheist-movement-iii-deconsecrate-fills` | Duplicate, Google chose different canonical than user | 2026-07-31 | canonical → https://metalforge.io/drummer/71 |
| `https://metalforge.io/drummers/arin-ilejay/licks/arin-ilejay-hail-to-the-king-halftime` | Duplicate, Google chose different canonical than user | 2026-07-12 | canonical → https://metalforge.io/drummer/71 |
| `https://metalforge.io/drummers/blake-richardson/licks/blake-richardson-prequel-sequel-7-8` | Duplicate, Google chose different canonical than user | 2026-07-15 | canonical → https://metalforge.io/drummer/71 |
| `https://metalforge.io/drummers/brann-dailor/licks/brann-dailor-blood-and-thunder-shuffle` | Duplicate, Google chose different canonical than user | 2026-07-12 | canonical → https://metalforge.io/drummer/71 |
| `https://metalforge.io/drummers/brann-dailor/licks/brann-dailor-colony-of-birchmen-funky-groove` | Duplicate, Google chose different canonical than user | 2026-08-17 | canonical → https://metalforge.io/drummer/71 |
| `https://metalforge.io/drummers/brann-dailor/licks/brann-dailor-crack-the-skye-melodic-fill` | Duplicate, Google chose different canonical than user | 2026-08-17 | canonical → https://metalforge.io/drummer/71 |
| `https://metalforge.io/drummers/charlie-benante/licks/charlie-benante-euphoria-groove` | Duplicate, Google chose different canonical than user | 2026-08-17 | canonical → https://metalforge.io/drummer/71 |
| `https://metalforge.io/drummers/chris-adler/licks/chris-adler-contractor-drum-setup` | Duplicate, Google chose different canonical than user | 2026-07-31 | canonical → https://metalforge.io/drummer/71 |
| `https://metalforge.io/drummers/danny-carey/licks/danny-carey-forty-six-and-2-steady-groove` | Duplicate, Google chose different canonical than user | 2026-08-17 | canonical → https://metalforge.io/drummer/71 |
| `https://metalforge.io/drummers/danny-carey/licks/danny-carey-lateralus-polyrhythm` | Duplicate, Google chose different canonical than user | 2026-07-13 | canonical → https://metalforge.io/drummer/71 |
| `https://metalforge.io/drummers/daray/licks/daray-council-of-wolves-groove` | Duplicate, Google chose different canonical than user | 2026-08-17 | canonical → https://metalforge.io/drummer/71 |
| `https://metalforge.io/drummers/dave-lombardo/licks/dave-lombardo-angel-of-death-lick` | Duplicate, Google chose different canonical than user | 2026-07-30 | canonical → https://metalforge.io/drummer/71 |
| `https://metalforge.io/drummers/derek-roddy/licks/derek-roddy-evilution-polyrhythm` | Duplicate, Google chose different canonical than user | 2026-08-17 | canonical → https://metalforge.io/drummer/71 |
| `https://metalforge.io/drummers/flo-mounier/licks/flo-mounier-blasphemy-made-flesh-double-kick` | Duplicate, Google chose different canonical than user | 2026-07-13 | canonical → https://metalforge.io/drummer/71 |
| `https://metalforge.io/drummers/gene-hoglan/licks/gene-hoglan-crystal-mountain-groove` | Duplicate, Google chose different canonical than user | 2026-08-17 | canonical → https://metalforge.io/drummer/71 |
| `https://metalforge.io/drummers/gene-hoglan/licks/gene-hoglan-death-symbolic-groove-blast-combo` | Duplicate, Google chose different canonical than user | 2026-07-19 | canonical → https://metalforge.io/gear/bio |

### `discovered-not-indexed` (19)

| URL | Coverage state | Last crawl | Notes |
| --- | --- | --- | --- |
| `https://metalforge.io/guides/best-china-cymbals-for-mathcore` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/guides/best-china-cymbals-for-sludge-metal` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/guides/best-drum-thrones-for-metal` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/guides/best-ride-cymbals-for-extreme-metal` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/nicko-mcbrain/cymbals` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/paul-mazurkiewicz/sticks` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/raymond-herrera/sticks` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/scott-travis/hardware` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/vinnie-paul/drums` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/abe-cunningham/licks/abe-cunningham-change-groove` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/charlie-benante/licks/charlie-benante-madhouse-thrash-groove` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/chris-adler/endorsements` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/chris-adler/licks/chris-adler-512-groove` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/daniel-erlandsson/licks/daniel-erlandsson-war-eternal` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/danny-carey/licks/danny-carey-forty-six-and-2-outro` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/danny-carey/licks/danny-carey-pneuma-groove` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/dirk-verbeuren/licks/dirk-verbeuren-mechanix` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/flo-mounier/licks/flo-mounier-sire-of-sin-blast` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/flo-mounier/licks/flo-mounier-whisper-supremacy-tom-fill` | Discovered - currently not indexed | — |  |

### `indexed` (401)

| URL | Coverage state | Last crawl | Notes |
| --- | --- | --- | --- |
| `https://metalforge.io/` | Submitted and indexed | 2026-11-02 |  |
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
| `https://metalforge.io/guides/best-china-cymbals-for-death-metal` | Submitted and indexed | 2026-11-01 |  |
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
| `https://metalforge.io/guides/best-cymbals-for-metal` | Submitted and indexed | 2026-11-03 |  |
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
| _…and 301 more — see snapshot file_ | | | |

### `redirect-or-canonical` (1)

| URL | Coverage state | Last crawl | Notes |
| --- | --- | --- | --- |
| `https://metalforge.io/guides/best-drum-pedals-for-black-metal` | Alternate page with proper canonical tag | 2026-07-02 | canonical → https://metalforge.io/guides/best-snares-for-doom-metal |

### `unknown` (7)

| URL | Coverage state | Last crawl | Notes |
| --- | --- | --- | --- |
| `https://metalforge.io/guides/best-drum-hardware-for-groove-metal` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummer/nick-augusto/sticks` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummer/paul-bostaph/sticks` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummer/paul-mazurkiewicz/cymbals` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummer/raymond-herrera/drums` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummer/tomas-haake/cymbals` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummers/flo-mounier/licks/flo-mounier-none-so-vile-gravity-blast` | URL is unknown to Google | — |  |
