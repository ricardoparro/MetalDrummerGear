# Indexation Health — weekly snapshot

*Auto-written by `.github/workflows/check-indexation.yml`. CEO Agent: read this every run when deciding which pages need content expansion or internal-link boosting.*

**Generated:** 2026-08-17T10:06:56.927Z
**Site:** https://metalforge.io/
**Sitemap URLs total:** 3180 · **Inspected this run:** 500 (cap 500)
**Selection:** 250 fixed sentinels (top priority, same every run — trend-comparable) + 250 rotating (full sitemap covered every ~12 runs; cursor now 1250)
**Compared against:** 2026-08-10.json

**Counts:** `indexed`=369 · `duplicate`=6 · `discovered-not-indexed`=84 · `error-inspect`=14 · `redirect-or-canonical`=1 · `unknown`=18 · `duplicate-google-canonical`=7 · `error-404`=1

**Indexed share (this run's sample):** 369 / 486 = **75.9%**
**Sentinel indexed share (week-over-week comparable):** 235 / 250 = **94.0%**
**Full-site proxy:** 1695 of 3180 sitemap URLs earned ≥1 Google impression in the last 90d (a page with impressions is indexed by definition; the inverse is not guaranteed)

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

### `error-404` (1)

| URL | Coverage state | Last crawl | Notes |
| --- | --- | --- | --- |
| `https://metalforge.io/drummers/ben-koller/licks/ben-koller-aimless-arrow-hardcore` | Not found (404) | 2026-07-07 |  |

### `duplicate` (6)

| URL | Coverage state | Last crawl | Notes |
| --- | --- | --- | --- |
| `https://metalforge.io/bpm` | Duplicate without user-selected canonical | 2026-07-03 | canonical → https://metalforge.io/lists/math-metal-drummers |
| `https://metalforge.io/guides/best-cymbals-for-progressive-metal` | Duplicate without user-selected canonical | 2026-07-04 | canonical → https://metalforge.io/lists/math-metal-drummers |
| `https://metalforge.io/guides/best-drum-hardware-for-metal` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/lists/math-metal-drummers |
| `https://metalforge.io/drummer/martin-axenrot/cymbals` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/lists/math-metal-drummers |
| `https://metalforge.io/drummers/abe-cunningham/licks/cunningham-diamond-eyes-fill` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/lists/math-metal-drummers |
| `https://metalforge.io/drummers/abe-cunningham/licks/cunningham-white-pony-groove` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/bands/tool |

### `duplicate-google-canonical` (7)

| URL | Coverage state | Last crawl | Notes |
| --- | --- | --- | --- |
| `https://metalforge.io/drummers/adrian-erlandsson/licks/adrian-erlandsson-at-war-with-reality-drum-setup` | Duplicate, Google chose different canonical than user | 2026-07-12 | canonical → https://metalforge.io/drummer/36 |
| `https://metalforge.io/drummers/adrian-erlandsson/licks/adrian-erlandsson-slaughter-of-the-soul-drum-setup` | Duplicate, Google chose different canonical than user | 2026-07-12 | canonical → https://metalforge.io/drummer/36 |
| `https://metalforge.io/drummers/adrian-erlandsson/licks/adrian-erlandsson-to-drink-from-the-night-itself-drum-setup` | Duplicate, Google chose different canonical than user | 2026-07-13 | canonical → https://metalforge.io/drummer/36 |
| `https://metalforge.io/drummers/alex-bent/licks/alex-bent-a-crisis-of-revelation-drum-setup` | Duplicate, Google chose different canonical than user | 2026-08-01 | canonical → https://metalforge.io/drummer/68 |
| `https://metalforge.io/drummers/alex-rudinger/licks/alex-rudinger-autotheist-movement-iii-deconsecrate-fills` | Duplicate, Google chose different canonical than user | 2026-07-31 | canonical → https://metalforge.io/drummer/68 |
| `https://metalforge.io/drummers/arin-ilejay/licks/arin-ilejay-hail-to-the-king-halftime` | Duplicate, Google chose different canonical than user | 2026-07-12 | canonical → https://metalforge.io/drummer/36 |
| `https://metalforge.io/drummers/art-cruz/licks/art-cruz-new-colossal-hate-drum-setup` | Duplicate, Google chose different canonical than user | 2026-08-02 | canonical → https://metalforge.io/drummer/71 |

### `discovered-not-indexed` (84)

| URL | Coverage state | Last crawl | Notes |
| --- | --- | --- | --- |
| `https://metalforge.io/guides/best-china-cymbals-for-mathcore` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/guides/best-china-cymbals-for-sludge-metal` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/guides/best-drum-hardware-for-groove-metal` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/guides/best-drum-thrones-for-metal` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/kevin-talley/hardware` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/kevin-talley/snare` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/lars-ulrich/drums` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/lars-ulrich/hardware` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/mario-duplantier/sticks` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/martin-lopez/cymbals` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/martin-lopez/drums` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/martin-lopez/sticks` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/matt-garstka/drums` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/matt-garstka/hardware` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/matt-garstka/snare` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/matt-garstka/sticks` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/matt-greiner/cymbals` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/matt-greiner/hardware` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/matt-halpern/drums` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/matt-halpern/hardware` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/matt-halpern/sticks` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/mike-mangini/cymbals` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/mike-mangini/drums` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/mike-mangini/hardware` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/mike-mangini/sticks` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/mike-portnoy/cymbals` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/mike-portnoy/drums` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/mike-portnoy/hardware` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/mike-portnoy/snare` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/mike-portnoy/sticks` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/mikkey-dee/cymbals` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/mikkey-dee/snare` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/mikkey-dee/sticks` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/morgan-agren/hardware` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/morgan-agren/snare` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/morgan-agren/sticks` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/navene-koperweis/cymbals` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/navene-koperweis/hardware` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/navene-koperweis/snare` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/navene-koperweis/sticks` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/nick-augusto/hardware` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/nick-augusto/sticks` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/nicko-mcbrain/cymbals` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/paul-bostaph/sticks` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/paul-mazurkiewicz/snare` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/pete-sandoval/hardware` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/ray-luzier/snare` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/ray-luzier/sticks` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/raymond-herrera/drums` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/raymond-herrera/snare` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/raymond-herrera/sticks` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/richard-christy/cymbals` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/richard-christy/drums` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/richard-christy/hardware` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/richard-christy/snare` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/richard-christy/sticks` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/ryan-van-poederooyen/cymbals` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/ryan-van-poederooyen/hardware` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/ryan-van-poederooyen/snare` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/ryan-van-poederooyen/sticks` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/scott-travis/drums` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/shannon-larkin/drums` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/shannon-larkin/hardware` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/shannon-larkin/sticks` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/tim-yeung/cymbals` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/tim-yeung/drums` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/tomas-haake/cymbals` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/tomas-haake/drums` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/tomas-haake/hardware` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/tomas-haake/snare` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/travis-orbin/cymbals` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/travis-orbin/drums` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/travis-orbin/snare` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/vinnie-paul/cymbals` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/vinnie-paul/drums` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/vinnie-paul/snare` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummer/vinnie-paul/sticks` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/abe-cunningham/licks/abe-cunningham-my-own-summer-groove` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/alex-bent/licks/alex-bent-betrayer-groove` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/aquiles-priester/licks/aquiles-priester-heroes-of-sand` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/arin-ilejay/licks/arin-ilejay-god-forsaken-fill-cascade` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/arin-ilejay/licks/arin-ilejay-shepherd-of-fire-double-bass` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/art-cruz/licks/art-cruz-gomorrah-blast-groove` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/art-cruz/licks/art-cruz-memento-mori-groove` | Discovered - currently not indexed | — |  |

### `indexed` (369)

| URL | Coverage state | Last crawl | Notes |
| --- | --- | --- | --- |
| `https://metalforge.io/` | Submitted and indexed | 2026-08-14 |  |
| `https://metalforge.io/guess-the-kit` | Submitted and indexed | 2026-07-01 |  |
| `https://metalforge.io/guides/beginner-metal-drummer-setup` | Submitted and indexed | 2026-07-01 |  |
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
| `https://metalforge.io/guides/best-drum-hardware-for-mathcore` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-drum-hardware-for-metalcore` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-drum-hardware-for-nu-metal` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-drum-hardware-for-post-metal` | Submitted and indexed | 2026-07-12 |  |
| _…and 269 more — see snapshot file_ | | | |

### `redirect-or-canonical` (1)

| URL | Coverage state | Last crawl | Notes |
| --- | --- | --- | --- |
| `https://metalforge.io/guides/best-drum-pedals-for-black-metal` | Alternate page with proper canonical tag | 2026-07-02 | canonical → https://metalforge.io/guides/budget-metal-drum-setup-1000 |

### `unknown` (18)

| URL | Coverage state | Last crawl | Notes |
| --- | --- | --- | --- |
| `https://metalforge.io/guides/best-ride-cymbals-for-extreme-metal` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummer/kevin-talley/cymbals` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummer/kevin-talley/sticks` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummer/lars-ulrich/sticks` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummer/mario-duplantier/hardware` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummer/matt-greiner/drums` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummer/morgan-agren/cymbals` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummer/nicko-mcbrain/hardware` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummer/pete-sandoval/cymbals` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummer/ray-luzier/cymbals` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummer/ray-luzier/drums` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummer/ray-luzier/hardware` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummer/scott-travis/cymbals` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummer/scott-travis/hardware` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummer/tim-yeung/snare` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummer/vinnie-paul/hardware` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummers/abe-cunningham/licks/abe-cunningham-change-groove` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummers/alex-bent/licks/alex-bent-beyond-oblivion-groove` | URL is unknown to Google | — |  |
