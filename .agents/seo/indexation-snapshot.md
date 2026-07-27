# Indexation Health — weekly snapshot

*Auto-written by `.github/workflows/check-indexation.yml`. CEO Agent: read this every run when deciding which pages need content expansion or internal-link boosting.*

**Generated:** 2026-07-27T10:37:42.369Z
**Site:** https://metalforge.io/
**Sitemap URLs total:** 3180 · **Inspected this run:** 500 (cap 500)
**Selection:** 250 fixed sentinels (top priority, same every run — trend-comparable) + 250 rotating (full sitemap covered every ~12 runs; cursor now 500)
**Compared against:** 2026-07-20.json

**Counts:** `indexed`=406 · `duplicate`=36 · `discovered-not-indexed`=39 · `redirect-or-canonical`=11 · `unknown`=6 · `crawled-not-indexed`=1 · `duplicate-google-canonical`=1

**Indexed share (this run's sample):** 406 / 500 = **81.2%**
**Sentinel indexed share (week-over-week comparable):** 239 / 250 = **95.6%**
**Full-site proxy:** 1211 of 3180 sitemap URLs earned ≥1 Google impression in the last 90d (a page with impressions is indexed by definition; the inverse is not guaranteed)

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

### `crawled-not-indexed` (1)

| URL | Coverage state | Last crawl | Notes |
| --- | --- | --- | --- |
| `https://metalforge.io/drummers` | Crawled - currently not indexed | 2026-06-22 |  |

### `duplicate` (36)

| URL | Coverage state | Last crawl | Notes |
| --- | --- | --- | --- |
| `https://metalforge.io/bpm` | Duplicate without user-selected canonical | 2026-07-03 | canonical → https://metalforge.io/drummer/navene-koperweis |
| `https://metalforge.io/guides/best-cymbals-for-progressive-metal` | Duplicate without user-selected canonical | 2026-07-04 | canonical → https://metalforge.io/drummer/navene-koperweis |
| `https://metalforge.io/guides/best-drum-hardware-for-metal` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/drummer/navene-koperweis |
| `https://metalforge.io/articles/lighting-up-the-sky-drum-setup` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/drummer/navene-koperweis |
| `https://metalforge.io/articles/messengers-drum-setup` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/drummer/navene-koperweis |
| `https://metalforge.io/articles/octavarium-drum-setup` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/drummer/navene-koperweis |
| `https://metalforge.io/articles/opvs-contra-natvram-drum-setup` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/drummer/navene-koperweis |
| `https://metalforge.io/articles/periphery-ii-drum-setup` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/drummer/navene-koperweis |
| `https://metalforge.io/articles/red-before-black-drum-setup` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/drummer/navene-koperweis |
| `https://metalforge.io/articles/relentless-reckless-forever-drum-setup` | Duplicate without user-selected canonical | 2026-07-03 | canonical → https://metalforge.io/drummer/navene-koperweis |
| `https://metalforge.io/articles/resolution-drum-setup` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/drummer/navene-koperweis |
| `https://metalforge.io/articles/ride-the-lightning-drum-setup` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/drummer/navene-koperweis |
| `https://metalforge.io/articles/satanica-drum-setup` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/drummer/navene-koperweis |
| `https://metalforge.io/articles/schizophrenia-drum-setup` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/drummer/navene-koperweis |
| `https://metalforge.io/articles/seasons-in-the-abyss-drum-setup` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/drummer/navene-koperweis |
| `https://metalforge.io/articles/shannon-larkin-drum-setup` | Duplicate without user-selected canonical | 2026-07-03 | canonical → https://metalforge.io/drummer/navene-koperweis |
| `https://metalforge.io/articles/show-no-mercy-drum-setup` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/drummer/navene-koperweis |
| `https://metalforge.io/articles/significant-other-drum-setup` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/drummer/navene-koperweis |
| `https://metalforge.io/articles/something-wild-drum-setup` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/drummer/navene-koperweis |
| `https://metalforge.io/articles/still-life-drum-setup` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/drummer/navene-koperweis |
| `https://metalforge.io/articles/systematic-chaos-drum-setup` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/drummer/navene-koperweis |
| `https://metalforge.io/articles/technical-ecstasy-drum-setup` | Duplicate without user-selected canonical | 2026-07-03 | canonical → https://metalforge.io/drummer/navene-koperweis |
| `https://metalforge.io/articles/the-bleeding-drum-setup` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/drummer/navene-koperweis |
| `https://metalforge.io/articles/the-mediator-between-head-and-hands-drum-setup` | Duplicate without user-selected canonical | 2026-07-03 | canonical → https://metalforge.io/drummer/navene-koperweis |
| `https://metalforge.io/articles/the-oracle-drum-setup` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/drummer/navene-koperweis |
| `https://metalforge.io/articles/the-paradigm-shift-drum-setup` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/drummer/navene-koperweis |
| `https://metalforge.io/articles/the-wretched-spawn-drum-setup` | Duplicate without user-selected canonical | 2026-07-03 | canonical → https://metalforge.io/drummer/navene-koperweis |
| `https://metalforge.io/articles/threads-of-life-drum-setup` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/drummer/navene-koperweis |
| `https://metalforge.io/articles/titans-of-creation-drum-setup` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/drummer/navene-koperweis |
| `https://metalforge.io/articles/torture-drum-setup` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/drummer/navene-koperweis |
| `https://metalforge.io/articles/vile-drum-setup` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/drummer/navene-koperweis |
| `https://metalforge.io/articles/violence-unimagined-drum-setup` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/drummer/navene-koperweis |
| `https://metalforge.io/articles/when-legends-rise-drum-setup` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/drummer/navene-koperweis |
| `https://metalforge.io/articles/worship-music-drum-setup` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/drummer/navene-koperweis |
| `https://metalforge.io/articles/you-fail-me-drum-setup` | Duplicate without user-selected canonical | 2026-07-03 | canonical → https://metalforge.io/drummer/navene-koperweis |
| `https://metalforge.io/drummers/alex-bent/gear-history` | Duplicate without user-selected canonical | 2026-07-04 | canonical → https://metalforge.io/drummer/navene-koperweis |

### `duplicate-google-canonical` (1)

| URL | Coverage state | Last crawl | Notes |
| --- | --- | --- | --- |
| `https://metalforge.io/drummers/adrian-erlandsson/gear-history` | Duplicate, Google chose different canonical than user | 2026-07-07 | canonical → https://metalforge.io/drummer/36 |

### `discovered-not-indexed` (39)

| URL | Coverage state | Last crawl | Notes |
| --- | --- | --- | --- |
| `https://metalforge.io/guides/best-china-cymbals-for-mathcore` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/guides/best-china-cymbals-for-sludge-metal` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/guides/best-drum-hardware-for-groove-metal` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/guides/best-drum-pedals-for-death-metal` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/guides/best-drum-thrones-for-metal` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/guides/best-ride-cymbals-for-extreme-metal` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/guides/best-snare-drums-for-deathcore` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/articles/mario-duplantier-gear` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/articles/morgan-agren-drum-setup` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/articles/most-expensive-drum-setups` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/articles/obzen-drum-setup` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/articles/painkiller-drum-setup` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/articles/ryan-van-poederooyen-drum-setup` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/articles/sound-of-perseverance-drum-setup` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/articles/symbolic-drum-setup` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/articles/the-apostasy-drum-setup` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/articles/traced-in-air-drum-setup` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/articles/whats-in-abe-cunninghams-kit` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/articles/whats-in-bill-wards-kit` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/articles/whats-in-chris-adlers-kit` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/articles/whats-in-dave-lombardos-kit` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/articles/whats-in-derek-roddys-kit` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/articles/whats-in-eloy-casagrandes-kit` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/articles/whats-in-george-kollias-kit` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/articles/whats-in-igor-cavaleras-kit` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/articles/whats-in-infernos-kit` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/articles/whats-in-mario-duplantiers-kit` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/articles/whats-in-mike-manginis-kit` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/articles/whats-in-paul-bostaphs-kit` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/articles/whats-in-pete-sandovals-kit` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/articles/whats-in-vinnie-pauls-kit` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/articles/white-pony-drum-setup` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/alex-bent/licks` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/alex-rudinger/gear-history` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/alex-rudinger/licks` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/aquiles-priester/licks` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/arin-ilejay/licks` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/art-cruz/licks` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/bill-ward/gear-history` | Discovered - currently not indexed | — |  |

### `indexed` (406)

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
| `https://metalforge.io/guides/best-cymbals-for-deathcore` | Submitted and indexed | 2026-07-12 |  |
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
| _…and 306 more — see snapshot file_ | | | |

### `redirect-or-canonical` (11)

| URL | Coverage state | Last crawl | Notes |
| --- | --- | --- | --- |
| `https://metalforge.io/guides/best-drum-pedals-for-black-metal` | Alternate page with proper canonical tag | 2026-07-02 | canonical → https://metalforge.io/guides/budget-metal-drum-setup-1000 |
| `https://metalforge.io/articles/persistence-of-time-drum-setup` | Alternate page with proper canonical tag | 2026-07-02 | canonical → https://metalforge.io/lists/groove-metal-drummers |
| `https://metalforge.io/articles/skeletal-domain-drum-setup` | Alternate page with proper canonical tag | 2026-07-02 | canonical → https://metalforge.io/lists/groove-metal-drummers |
| `https://metalforge.io/articles/the-end-so-far-drum-setup` | Alternate page with proper canonical tag | 2026-07-02 | canonical → https://metalforge.io/lists/groove-metal-drummers |
| `https://metalforge.io/articles/the-way-of-all-flesh-drum-setup` | Alternate page with proper canonical tag | 2026-07-02 | canonical → https://metalforge.io/lists/groove-metal-drummers |
| `https://metalforge.io/articles/trivium-what-the-dead-men-say-drum-setup` | Alternate page with proper canonical tag | 2026-07-02 | canonical → https://metalforge.io/lists/groove-metal-drummers |
| `https://metalforge.io/articles/unspoken-king-drum-setup` | Alternate page with proper canonical tag | 2026-07-02 | canonical → https://metalforge.io/lists/groove-metal-drummers |
| `https://metalforge.io/articles/vile-nilotic-rites-drum-setup` | Alternate page with proper canonical tag | 2026-07-08 | canonical → https://metalforge.io/lists/groove-metal-drummers |
| `https://metalforge.io/articles/vol-4-drum-setup` | Alternate page with proper canonical tag | 2026-07-02 | canonical → https://metalforge.io/lists/groove-metal-drummers |
| `https://metalforge.io/articles/world-painted-blood-drum-setup` | Alternate page with proper canonical tag | 2026-07-02 | canonical → https://metalforge.io/lists/groove-metal-drummers |
| `https://metalforge.io/bands` | Alternate page with proper canonical tag | 2026-07-01 | canonical → https://metalforge.io/ |

### `unknown` (6)

| URL | Coverage state | Last crawl | Notes |
| --- | --- | --- | --- |
| `https://metalforge.io/articles/raymond-herrera-drum-setup` | URL is unknown to Google | — |  |
| `https://metalforge.io/articles/whats-in-sean-reinerts-kit` | URL is unknown to Google | — |  |
| `https://metalforge.io/articles/whats-in-tomas-haakes-kit` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummers/abe-cunningham/gear-history` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummers/abe-cunningham/licks` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummers/blake-richardson/licks` | URL is unknown to Google | — |  |
