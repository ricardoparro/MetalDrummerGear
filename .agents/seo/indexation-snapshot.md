# Indexation Health — weekly snapshot

*Auto-written by `.github/workflows/check-indexation.yml`. CEO Agent: read this every run when deciding which pages need content expansion or internal-link boosting.*

**Generated:** 2026-08-24T10:08:13.511Z
**Site:** https://metalforge.io/
**Sitemap URLs total:** 3175 · **Inspected this run:** 500 (cap 500)
**Selection:** 250 fixed sentinels (top priority, same every run — trend-comparable) + 250 rotating (full sitemap covered every ~12 runs; cursor now 1500)
**Compared against:** 2026-08-17.json

**Counts:** `indexed`=311 · `duplicate`=23 · `discovered-not-indexed`=99 · `unknown`=27 · `redirect-or-canonical`=1 · `duplicate-google-canonical`=38 · `error-404`=1

**Indexed share (this run's sample):** 311 / 500 = **62.2%**
**Sentinel indexed share (week-over-week comparable):** 241 / 250 = **96.4%**
**Full-site proxy:** 1755 of 3175 sitemap URLs earned ≥1 Google impression in the last 90d (a page with impressions is indexed by definition; the inverse is not guaranteed)

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
| `https://metalforge.io/drummers/jon-dette/licks/jon-dette-postmortem-precision` | Not found (404) | 2026-07-06 |  |

### `duplicate` (23)

| URL | Coverage state | Last crawl | Notes |
| --- | --- | --- | --- |
| `https://metalforge.io/bpm` | Duplicate without user-selected canonical | 2026-07-03 | canonical → https://metalforge.io/lists/math-metal-drummers |
| `https://metalforge.io/guides/best-cymbals-for-progressive-metal` | Duplicate without user-selected canonical | 2026-07-04 | canonical → https://metalforge.io/lists/math-metal-drummers |
| `https://metalforge.io/guides/best-drum-hardware-for-metal` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/lists/math-metal-drummers |
| `https://metalforge.io/drummers/charlie-benante/licks/charlie-benante-among-the-living-thrash-groove` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/lists/math-metal-drummers |
| `https://metalforge.io/drummers/charlie-benante/licks/charlie-benante-persistence-of-time-blast` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/bands/tool |
| `https://metalforge.io/drummers/chris-adler/licks/chris-adler-redneck-drum-setup` | Duplicate without user-selected canonical | 2026-07-03 | canonical → https://metalforge.io/lists/math-metal-drummers |
| `https://metalforge.io/drummers/danny-carey/licks/danny-carey-schism-odd-meter-groove` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/lists/math-metal-drummers |
| `https://metalforge.io/drummers/dave-lombardo/licks/dave-lombardo-raining-blood-lick` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/lists/math-metal-drummers |
| `https://metalforge.io/drummers/dave-lombardo/licks/dave-lombardo-south-of-heaven-lick` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/lists/math-metal-drummers |
| `https://metalforge.io/drummers/gene-hoglan/licks/gene-hoglan-darkness-descends-lick` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/lists/math-metal-drummers |
| `https://metalforge.io/drummers/inferno/licks/inferno-demigod-double-kick` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/lists/math-metal-drummers |
| `https://metalforge.io/drummers/jaska-raatikainen/licks/jaska-raatikainen-hatebreeder-double-bass` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/lists/math-metal-drummers |
| `https://metalforge.io/drummers/joey-jordison/licks/joey-jordison-iowa-double-bass` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/lists/math-metal-drummers |
| `https://metalforge.io/drummers/lars-ulrich/licks/lars-ulrich-one-building-thrash` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/lists/math-metal-drummers |
| `https://metalforge.io/drummers/mario-duplantier/licks/mario-duplantier-flying-whales-groove` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/lists/math-metal-drummers |
| `https://metalforge.io/drummers/mario-duplantier/licks/mario-duplantier-stranded-intro-fill` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/lists/math-metal-drummers |
| `https://metalforge.io/drummers/matt-greiner/licks/matt-greiner-constellations-polyrhythm` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/lists/math-metal-drummers |
| `https://metalforge.io/drummers/matt-greiner/licks/matt-greiner-messengers-intro-groove` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/lists/math-metal-drummers |
| `https://metalforge.io/drummers/matt-halpern/licks/matt-halpern-masamune-ghost-notes` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/lists/math-metal-drummers |
| `https://metalforge.io/drummers/matt-halpern/licks/matt-halpern-ragnarok-blast` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/lists/math-metal-drummers |
| `https://metalforge.io/drummers/mike-mangini/licks/mangini-systematic-chaos-paradiddle-lick` | Duplicate without user-selected canonical | 2026-07-02 | canonical → https://metalforge.io/lists/math-metal-drummers |
| `https://metalforge.io/drummers/mike-portnoy/licks/mike-portnoy-in-the-presence-of-enemies-blast` | Duplicate without user-selected canonical | 2026-07-03 | canonical → https://metalforge.io/lists/math-metal-drummers |
| `https://metalforge.io/drummers/mikkey-dee/licks/mikkey-dee-overkill-double-bass` | Duplicate without user-selected canonical | 2026-07-03 | canonical → https://metalforge.io/lists/math-metal-drummers |

### `duplicate-google-canonical` (38)

| URL | Coverage state | Last crawl | Notes |
| --- | --- | --- | --- |
| `https://metalforge.io/drummers/blake-richardson/licks/blake-richardson-prequel-sequel-7-8` | Duplicate, Google chose different canonical than user | 2026-07-15 | canonical → https://metalforge.io/drummer/36 |
| `https://metalforge.io/drummers/brann-dailor/licks/brann-dailor-blood-and-thunder-shuffle` | Duplicate, Google chose different canonical than user | 2026-07-12 | canonical → https://metalforge.io/drummer/36 |
| `https://metalforge.io/drummers/brann-dailor/licks/brann-dailor-colony-of-birchmen-funky-groove` | Duplicate, Google chose different canonical than user | 2026-08-17 | canonical → https://metalforge.io/drummer/71 |
| `https://metalforge.io/drummers/brann-dailor/licks/brann-dailor-crack-the-skye-melodic-fill` | Duplicate, Google chose different canonical than user | 2026-08-17 | canonical → https://metalforge.io/drummer/71 |
| `https://metalforge.io/drummers/charlie-benante/licks/charlie-benante-euphoria-groove` | Duplicate, Google chose different canonical than user | 2026-08-17 | canonical → https://metalforge.io/drummer/71 |
| `https://metalforge.io/drummers/charlie-benante/licks/charlie-benante-indians-war-dance` | Duplicate, Google chose different canonical than user | 2026-08-03 | canonical → https://metalforge.io/drummer/71 |
| `https://metalforge.io/drummers/chris-adler/licks/chris-adler-contractor-drum-setup` | Duplicate, Google chose different canonical than user | 2026-07-31 | canonical → https://metalforge.io/drummer/68 |
| `https://metalforge.io/drummers/danny-carey/licks/danny-carey-forty-six-and-2-steady-groove` | Duplicate, Google chose different canonical than user | 2026-08-17 | canonical → https://metalforge.io/drummer/71 |
| `https://metalforge.io/drummers/danny-carey/licks/danny-carey-lateralus-polyrhythm` | Duplicate, Google chose different canonical than user | 2026-07-13 | canonical → https://metalforge.io/drummer/36 |
| `https://metalforge.io/drummers/daray/licks/daray-council-of-wolves-groove` | Duplicate, Google chose different canonical than user | 2026-08-17 | canonical → https://metalforge.io/drummer/71 |
| `https://metalforge.io/drummers/dave-lombardo/licks/dave-lombardo-angel-of-death-lick` | Duplicate, Google chose different canonical than user | 2026-07-30 | canonical → https://metalforge.io/drummer/68 |
| `https://metalforge.io/drummers/derek-roddy/licks/derek-roddy-evilution-polyrhythm` | Duplicate, Google chose different canonical than user | 2026-08-17 | canonical → https://metalforge.io/drummer/71 |
| `https://metalforge.io/drummers/flo-mounier/licks/flo-mounier-blasphemy-made-flesh-double-kick` | Duplicate, Google chose different canonical than user | 2026-07-13 | canonical → https://metalforge.io/drummer/36 |
| `https://metalforge.io/drummers/gavin-harrison/licks/gavin-harrison-anesthetize` | Duplicate, Google chose different canonical than user | 2026-08-09 | canonical → https://metalforge.io/ |
| `https://metalforge.io/drummers/gene-hoglan/licks/gene-hoglan-crystal-mountain-groove` | Duplicate, Google chose different canonical than user | 2026-08-17 | canonical → https://metalforge.io/drummer/71 |
| `https://metalforge.io/drummers/gene-hoglan/licks/gene-hoglan-death-symbolic-groove-blast-combo` | Duplicate, Google chose different canonical than user | 2026-07-19 | canonical → https://metalforge.io/drummer/71 |
| `https://metalforge.io/drummers/gene-hoglan/licks/gene-hoglan-pull-the-plug-lick` | Duplicate, Google chose different canonical than user | 2026-07-19 | canonical → https://metalforge.io/drummer/71 |
| `https://metalforge.io/drummers/gene-hoglan/licks/gene-hoglan-zero-tolerance-groove` | Duplicate, Google chose different canonical than user | 2026-08-17 | canonical → https://metalforge.io/drummer/71 |
| `https://metalforge.io/drummers/igor-cavalera/licks/igor-cavalera-chaos-ad-groove` | Duplicate, Google chose different canonical than user | 2026-08-01 | canonical → https://metalforge.io/drummer/71 |
| `https://metalforge.io/drummers/igor-cavalera/licks/igor-cavalera-schizophrenia-blast-groove` | Duplicate, Google chose different canonical than user | 2026-07-15 | canonical → https://metalforge.io/drummer/36 |
| `https://metalforge.io/drummers/isaac-lamb/licks/isaac-lamb-bc-beatdown-groove` | Duplicate, Google chose different canonical than user | 2026-07-16 | canonical → https://metalforge.io/drummer/71 |
| `https://metalforge.io/drummers/jaska-raatikainen/licks/jaska-raatikainen-follow-the-reaper-groove` | Duplicate, Google chose different canonical than user | 2026-08-03 | canonical → https://metalforge.io/drummer/71 |
| `https://metalforge.io/drummers/jimmy-degrasso/licks/jimmy-degrasso-1000-times-goodbye-groove` | Duplicate, Google chose different canonical than user | 2026-07-31 | canonical → https://metalforge.io/drummer/68 |
| `https://metalforge.io/drummers/joey-jordison/licks/joey-jordison-people-snare-pattern` | Duplicate, Google chose different canonical than user | 2026-07-20 | canonical → https://metalforge.io/drummer/71 |
| `https://metalforge.io/drummers/john-longstreth/licks/john-longstreth-expulsion-of-fury-blast` | Duplicate, Google chose different canonical than user | 2026-07-28 | canonical → https://metalforge.io/drummer/68 |
| `https://metalforge.io/drummers/kevin-talley/licks/kevin-talley-destroy-the-opposition-groove` | Duplicate, Google chose different canonical than user | 2026-07-17 | canonical → https://metalforge.io/drummer/71 |
| `https://metalforge.io/drummers/lars-ulrich/licks/lars-ulrich-blackened-open-hihat` | Duplicate, Google chose different canonical than user | 2026-07-12 | canonical → https://metalforge.io/drummer/36 |
| `https://metalforge.io/drummers/martin-axenrot/licks/martin-axenrot-devils-orchard-meter-shifts` | Duplicate, Google chose different canonical than user | 2026-07-07 | canonical → https://metalforge.io/drummer/36 |
| `https://metalforge.io/drummers/martin-axenrot/licks/martin-axenrot-sorceress-riff-lock` | Duplicate, Google chose different canonical than user | 2026-07-12 | canonical → https://metalforge.io/drummer/36 |
| `https://metalforge.io/drummers/martin-lopez/licks/martin-lopez-blackwater-park-shuffle` | Duplicate, Google chose different canonical than user | 2026-07-12 | canonical → https://metalforge.io/drummer/36 |
| `https://metalforge.io/drummers/martin-lopez/licks/martin-lopez-deliverance-blast` | Duplicate, Google chose different canonical than user | 2026-07-13 | canonical → https://metalforge.io/drummer/36 |
| `https://metalforge.io/drummers/martin-lopez/licks/martin-lopez-drapery-falls-dynamics` | Duplicate, Google chose different canonical than user | 2026-08-11 | canonical → https://metalforge.io/ |
| `https://metalforge.io/drummers/matt-garstka/licks/matt-garstka-lippincott-polyrhythm` | Duplicate, Google chose different canonical than user | 2026-08-17 | canonical → https://metalforge.io/drummer/71 |
| `https://metalforge.io/drummers/matt-greiner/licks/matt-greiner-leveler-double-bass` | Duplicate, Google chose different canonical than user | 2026-07-15 | canonical → https://metalforge.io/drummer/36 |
| `https://metalforge.io/drummers/matt-greiner/licks/matt-greiner-leveler-polyrhythm` | Duplicate, Google chose different canonical than user | 2026-07-16 | canonical → https://metalforge.io/drummer/71 |
| `https://metalforge.io/drummers/mike-mangini/licks/mangini-distance-over-time-fill` | Duplicate, Google chose different canonical than user | 2026-07-15 | canonical → https://metalforge.io/drummer/36 |
| `https://metalforge.io/drummers/mike-portnoy/licks/mike-portnoy-pull-me-under-fill` | Duplicate, Google chose different canonical than user | 2026-08-18 | canonical → https://metalforge.io/drummer/71 |
| `https://metalforge.io/drummers/mike-portnoy/licks/mike-portnoy-the-dance-of-eternity-meter-change` | Duplicate, Google chose different canonical than user | 2026-08-17 | canonical → https://metalforge.io/drummer/71 |

### `discovered-not-indexed` (99)

| URL | Coverage state | Last crawl | Notes |
| --- | --- | --- | --- |
| `https://metalforge.io/guides/best-china-cymbals-for-mathcore` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/guides/best-china-cymbals-for-sludge-metal` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/guides/best-ride-cymbals-for-extreme-metal` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/bill-ward/licks/bill-ward-nib-shuffle` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/blake-richardson/licks/blake-richardson-lay-ghosts-double-bass` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/brann-dailor/licks/brann-dailor-blood-and-thunder-groove` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/charlie-benante/licks/charlie-benante-madhouse-thrash-groove` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/chris-adler/endorsements` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/chris-adler/licks/chris-adler-laid-to-rest-groove` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/chris-adler/licks/chris-adler-walk-with-me-in-hell-groove` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/daniel-erlandsson/licks/daniel-erlandsson-avalanche` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/daniel-erlandsson/licks/daniel-erlandsson-nemesis` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/daniel-erlandsson/licks/daniel-erlandsson-war-eternal` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/danny-carey/endorsements` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/danny-carey/licks/danny-carey-forty-six-and-2-outro` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/danny-carey/licks/danny-carey-pneuma-groove` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/danny-carey/licks/danny-carey-schism-intro` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/daray/licks/daray-progenies-double-bass` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/dave-lombardo/licks/dave-lombardo-raining-blood-double-bass` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/dave-lombardo/licks/dave-lombardo-slayer-reign-in-blood-double-bass` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/dave-lombardo/signature/dave-lombardo-promark-2bx-signature` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/derek-roddy/licks/derek-roddy-sons-of-darkness-speed` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/dirk-verbeuren/licks/dirk-verbeuren-king-of-the-threshold` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/dirk-verbeuren/licks/dirk-verbeuren-mechanix` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/dirk-verbeuren/licks/dirk-verbeuren-tipping-point` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/eloy-casagrande/endorsements` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/eloy-casagrande/licks/eloy-casagrande-arise-double-bass` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/eloy-casagrande/licks/eloy-casagrande-isolation-blast` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/eloy-casagrande/licks/eloy-casagrande-means-to-an-end-groove` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/flo-mounier/licks/flo-mounier-none-so-vile-gravity-blast` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/flo-mounier/licks/flo-mounier-phobophile-gravity-blast` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/flo-mounier/licks/flo-mounier-sire-of-sin-blast` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/flo-mounier/licks/flo-mounier-slit-your-guts-blast` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/flo-mounier/licks/flo-mounier-whisper-supremacy-tom-fill` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/gavin-harrison/licks/gavin-harrison-the-sound-of-muzak` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/gene-hoglan/licks/gene-hoglan-the-philosopher-groove` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/george-kollias/endorsements` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/george-kollias/licks/george-kollias-polyrhythmic-mayhem` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/george-kollias/licks/george-kollias-sustained-blast` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/hannes-grossmann/licks/hannes-grossmann-in-turmoils-swirling-reaches` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/hellhammer/licks/hellhammer-deathcrush-battery` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/hellhammer/licks/hellhammer-freezing-moon-blast` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/igor-cavalera/licks/igor-cavalera-beneath-the-remains-blast` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/igor-cavalera/licks/igor-cavalera-beneath-the-remains-double-bass` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/igor-cavalera/licks/igor-cavalera-refuse-resist-double-bass` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/igor-cavalera/licks/igor-cavalera-roots-bloody-roots-tribal-groove` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/inferno/licks/inferno-blow-trumpets-gabriel` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/inferno/licks/inferno-conquer-all-blast` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/inferno/licks/inferno-evangelion-blast-sequence` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/isaac-lamb/licks/isaac-lamb-boomslang-groove-power` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/isaac-lamb/licks/isaac-lamb-true-fear-hardcore-intensity` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/jaska-raatikainen/licks/jaska-raatikainen-sixpounder-double-bass` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/jason-bittner/licks/jason-bittner-light-that-blinds-groove` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/jason-bittner/licks/jason-bittner-overkill-double-bass-run` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/jason-bittner/licks/jason-bittner-what-drives-the-weak-fill` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/jay-weinberg/endorsements` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/jocke-wallgren/licks/jocke-wallgren-twilight-double-bass` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/joey-jordison/endorsements` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/joey-jordison/licks/joey-jordison-disasterpiece-chaos` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/joey-jordison/licks/joey-jordison-eyeless-blast` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/joey-jordison/signature/joey-jordison-pearl-signature-snare` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/john-otto/licks/john-otto-nookie-fill` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/jon-dette/licks/jon-dette-serenity-in-fire-groove` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/kevin-talley/licks/kevin-talley-killing-on-adrenaline-two-handed-blast` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/lars-ulrich/endorsements` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/lars-ulrich/licks/lars-ulrich-enter-sandman-groove` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/lars-ulrich/licks/lars-ulrich-one-intro` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/mario-duplantier/endorsements` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/mario-duplantier/licks/mario-duplantier-backbone-groove` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/mario-duplantier/licks/mario-duplantier-polyrhythmic-groove` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/mario-duplantier/signature/mario-duplantier-tama-starphonic-bronze` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/martin-lopez/licks/martin-lopez-antagonist-soen-groove` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/martin-lopez/licks/martin-lopez-demon-of-the-fall-opening` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/matt-garstka/licks/matt-garstka-monomyth-polyrhythm` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/matt-garstka/licks/matt-garstka-physical-education-fill` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/matt-garstka/licks/matt-garstka-tempting-time-groove` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/matt-garstka/licks/matt-garstka-woven-web-linear` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/matt-greiner/licks/matt-greiner-composure-syncopation` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/matt-greiner/licks/matt-greiner-constellations-blast-groove` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/matt-greiner/licks/matt-greiner-meridian-double-bass` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/matt-greiner/licks/matt-greiner-sonic-salvation-groove` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/matt-halpern/endorsements` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/matt-halpern/licks/matt-halpern-icarus-lives-groove` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/matt-halpern/licks/matt-halpern-scarlet-groove` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/matt-halpern/licks/matt-halpern-the-bad-thing-groove` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/mike-mangini/licks/mike-mangini-the-looking-glass` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/mike-portnoy/endorsements` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/mike-portnoy/licks/mike-portnoy-dance-of-eternity` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/mike-portnoy/licks/mike-portnoy-pull-me-under-groove` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/mikkey-dee/licks/mikkey-dee-ace-of-spades` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/mikkey-dee/licks/mikkey-dee-killed-by-death` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/mikkey-dee/licks/mikkey-dee-overkill` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/morgan-agren/licks/morgan-agren-neyveli-prog-groove` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/morgan-agren/licks/morgan-agren-odd-meter-improvisation` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/morgan-agren/licks/morgan-agren-sprite-metric-modulation` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/navene-koperweis/licks/navene-koperweis-an-end-to-everything` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/navene-koperweis/licks/navene-koperweis-chemical-flashback-djent` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/navene-koperweis/licks/navene-koperweis-interior-wilderness` | Discovered - currently not indexed | — |  |
| `https://metalforge.io/drummers/nick-augusto/licks/nick-augusto-built-to-fall-fill` | Discovered - currently not indexed | — |  |

### `indexed` (311)

| URL | Coverage state | Last crawl | Notes |
| --- | --- | --- | --- |
| `https://metalforge.io/` | Submitted and indexed | 2026-08-14 |  |
| `https://metalforge.io/guess-the-kit` | Submitted and indexed | 2026-08-17 |  |
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
| `https://metalforge.io/guides/best-crash-cymbals-for-djent` | Submitted and indexed | 2026-08-21 |  |
| `https://metalforge.io/guides/best-crash-cymbals-for-doom-metal` | Submitted and indexed | 2026-07-13 |  |
| `https://metalforge.io/guides/best-crash-cymbals-for-extreme-metal` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-crash-cymbals-for-groove-metal` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-crash-cymbals-for-mathcore` | Submitted and indexed | 2026-07-12 |  |
| `https://metalforge.io/guides/best-crash-cymbals-for-metal` | Submitted and indexed | 2026-08-17 |  |
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
| _…and 211 more — see snapshot file_ | | | |

### `redirect-or-canonical` (1)

| URL | Coverage state | Last crawl | Notes |
| --- | --- | --- | --- |
| `https://metalforge.io/guides/best-drum-pedals-for-black-metal` | Alternate page with proper canonical tag | 2026-07-02 | canonical → https://metalforge.io/guides/best-drum-sticks-for-metal |

### `unknown` (27)

| URL | Coverage state | Last crawl | Notes |
| --- | --- | --- | --- |
| `https://metalforge.io/guides/best-drum-hardware-for-groove-metal` | URL is unknown to Google | — |  |
| `https://metalforge.io/guides/best-drum-thrones-for-metal` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummers/bill-ward/licks/bill-ward-iron-man-groove` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummers/brann-dailor/endorsements` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummers/charlie-benante/licks/charlie-benante-caught-in-a-mosh-groove` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummers/chris-adler/licks/chris-adler-512-groove` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummers/chris-turner/licks/chris-turner-hansha-polyrhythm` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummers/dave-lombardo/licks/dave-lombardo-angel-of-death-chaos` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummers/derek-roddy/licks/derek-roddy-king-of-all-kings-blast` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummers/frost/licks/frost-fuel-for-hatred-blast` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummers/frost/licks/frost-king-mid-tempo-groove` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummers/gavin-harrison/licks/gavin-harrison-harridan` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummers/gene-hoglan/signature/gene-hoglan-pearl-reference-kit` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummers/george-kollias/licks/george-kollias-gravity-blast` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummers/hannes-grossmann/licks/hannes-grossmann-septuagint-odd-time` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummers/inferno/endorsements` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummers/jaska-raatikainen/licks/jaska-raatikainen-lake-bodom-fills` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummers/jay-weinberg/licks/jay-weinberg-duality` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummers/jay-weinberg/licks/jay-weinberg-unsainted` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummers/john-otto/licks/john-otto-break-stuff-groove` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummers/john-otto/licks/john-otto-rollin-groove` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummers/kevin-talley/licks/kevin-talley-epidemic-of-hate-gravity-blast` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummers/lars-ulrich/signature/lars-ulrich-paiste-rude-china` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummers/mario-duplantier/licks/mario-duplantier-blast-variation` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummers/matt-halpern/licks/matt-halpern-marigold-groove` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummers/mike-mangini/licks/mike-mangini-breaking-all-illusions` | URL is unknown to Google | — |  |
| `https://metalforge.io/drummers/mike-mangini/licks/mike-mangini-on-the-backs-of-angels` | URL is unknown to Google | — |  |
