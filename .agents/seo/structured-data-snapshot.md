# Structured-Data Validation — weekly snapshot

*Auto-written by `.github/workflows/check-structured-data.yml`. CEO Agent: read this every run when deciding which JSON-LD gaps to file `ai-fix` issues for. This catches the class of bug GSC flags as "Missing field X" before Google does.*

**Generated:** 2026-06-29T11:40:34.719Z
**Sitemap URLs total:** 3264 · **Sampled this run:** 150 (cap 150)
**Compared against:** _(first run — no prior week, no deltas yet)_

**150 URLs scanned · 0 clean · 0 with issues · WoW: _(first run — no prior week)_**

**Counts:** `no-jsonld`=150

**Sample coverage (by URL type):** `articles` 25/118 · `bands` 19/19 · `drummer` 25/366 · `guides` 20/20 · `licks` 25/189 · `lists` 11/11 · `other` 25/2083

> ⚠️ Cap reached — not every URL was scanned this run: `other` 2058 skipped, `articles` 93 skipped, `drummer` 341 skipped, `licks` 164 skipped.

## Classification

| Class | Meaning | Actionable |
| --- | --- | --- |
| `ok` | Every JSON-LD node has all Google-required fields for its `@type`. ✅ | No |
| `missing-fields` | A node is missing/empty a Google-required field (e.g. `VideoObject.uploadDate`). | **YES** — fix the data source / renderer |
| `invalid-json` | A `<script type="application/ld+json">` block failed `JSON.parse`. | **YES** — malformed schema, no rich result |
| `no-jsonld` | Page emitted no JSON-LD at all. | Context (intentional for some routes) |
| `page-error` | Page fetch failed (non-2xx / network). | Investigate (overlaps indexation loop) |

## Missing required fields (grouped by `@type` → field)

_(no missing-field failures)_

## Invalid JSON-LD (failed to parse)

_(no parse errors)_

## All scanned URLs, by class

### `missing-fields` (0)

_(none)_

### `invalid-json` (0)

_(none)_

### `page-error` (0)

_(none)_

### `no-jsonld` (150)

- `https://metalforge.io/articles/a-dramatic-turn-of-events-drum-setup`
- `https://metalforge.io/bands/anthrax`
- `https://metalforge.io/drummer/abe-cunningham/cymbals`
- `https://metalforge.io/guides/beginner-metal-drummer-setup`
- `https://metalforge.io/drummers/abe-cunningham/licks/abe-cunningham-change-groove`
- `https://metalforge.io/lists/black-metal-drummers`
- `https://metalforge.io/`
- `https://metalforge.io/articles/aenima-drum-setup`
- `https://metalforge.io/bands/behemoth`
- `https://metalforge.io/drummer/abe-cunningham/drums`
- `https://metalforge.io/guides/best-drum-pedals-for-death-metal`
- `https://metalforge.io/drummers/abe-cunningham/licks/abe-cunningham-digital-bath-groove`
- `https://metalforge.io/lists/death-metal-drummers`
- `https://metalforge.io/bpm`
- `https://metalforge.io/articles/altars-of-madness-drum-setup`
- `https://metalforge.io/bands/cannibal-corpse`
- `https://metalforge.io/drummer/abe-cunningham/hardware`
- `https://metalforge.io/guides/best-snare-drums-for-thrash-metal`
- `https://metalforge.io/drummers/abe-cunningham/licks/abe-cunningham-my-own-summer-groove`
- `https://metalforge.io/lists/drummers-with-budget-friendly-kits`
- `https://metalforge.io/guess-the-kit`
- `https://metalforge.io/articles/and-justice-for-all-drum-setup`
- `https://metalforge.io/bands/death`
- `https://metalforge.io/drummer/abe-cunningham/snare`
- `https://metalforge.io/guides/budget-metal-drum-setup-1000`
- `https://metalforge.io/drummers/alex-bent/licks/alex-bent-betrayer-groove`
- `https://metalforge.io/lists/fastest-double-bass-drummers`
- `https://metalforge.io/tools`
- `https://metalforge.io/articles/aquiles-priester-drum-kit-guide`
- `https://metalforge.io/bands/deftones`
- `https://metalforge.io/drummer/abe-cunningham/sticks`
- `https://metalforge.io/guides/budget-metal-drum-setup-2000`
- `https://metalforge.io/drummers/alex-bent/licks/alex-bent-beyond-oblivion-groove`
- `https://metalforge.io/lists/fastest-metal-drummers`
- `https://metalforge.io/tools/compare`
- `https://metalforge.io/articles/aquiles-priester-drum-setup`
- `https://metalforge.io/bands/dream-theater`
- `https://metalforge.io/drummer/alex-bent/cymbals`
- `https://metalforge.io/guides/budget-metal-drum-setup-500`
- `https://metalforge.io/drummers/alex-bent/licks/alex-bent-sin-and-sentence-groove`
- `https://metalforge.io/lists/most-brutal-drum-solos`
- `https://metalforge.io/tools/metal-drummer-name-generator`
- `https://metalforge.io/articles/arin-ilejay-drum-setup`
- `https://metalforge.io/bands/gojira`
- `https://metalforge.io/drummer/alex-bent/drums`
- `https://metalforge.io/guides/how-to-sound-like-brann-dailor`
- `https://metalforge.io/drummers/aquiles-priester/licks/aquiles-priester-heroes-of-sand`
- `https://metalforge.io/lists/most-expensive-drum-setups`
- `https://metalforge.io/articles`
- `https://metalforge.io/articles/ashes-of-the-wake-drum-setup`
- `https://metalforge.io/bands/korn`
- `https://metalforge.io/drummer/alex-bent/hardware`
- `https://metalforge.io/guides/how-to-sound-like-chris-adler`
- `https://metalforge.io/drummers/aquiles-priester/licks/aquiles-priester-rebirth`
- `https://metalforge.io/lists/most-innovative-drummers`
- `https://metalforge.io/bands`
- `https://metalforge.io/articles/ben-koller-drum-setup`
- `https://metalforge.io/bands/kublai-khan-tx`
- `https://metalforge.io/drummer/alex-bent/snare`
- `https://metalforge.io/guides/how-to-sound-like-danny-carey`
- `https://metalforge.io/drummers/aquiles-priester/licks/aquiles-priester-spread-your-fire`
- `https://metalforge.io/lists/nu-metal-drummers`
- `https://metalforge.io/battles`
- `https://metalforge.io/articles/beneath-the-remains-drum-setup`
- `https://metalforge.io/bands/limp-bizkit`
- `https://metalforge.io/drummer/alex-bent/sticks`
- `https://metalforge.io/guides/how-to-sound-like-dave-lombardo`
- `https://metalforge.io/drummers/arin-ilejay/licks/arin-ilejay-god-forsaken-fill-cascade`
- `https://metalforge.io/lists/progressive-metal-drummers`
- `https://metalforge.io/birthdays`
- `https://metalforge.io/articles/black-album-drum-setup`
- `https://metalforge.io/bands/meshuggah`
- `https://metalforge.io/drummer/aquiles-priester/cymbals`
- `https://metalforge.io/guides/how-to-sound-like-flo-mounier`
- `https://metalforge.io/drummers/arin-ilejay/licks/arin-ilejay-hail-to-the-king-halftime`
- `https://metalforge.io/lists/thrash-metal-drummers`
- `https://metalforge.io/bpm-tap`
- `https://metalforge.io/articles/blackwater-park-drum-setup`
- `https://metalforge.io/bands/metallica`
- `https://metalforge.io/drummer/aquiles-priester/drums`
- `https://metalforge.io/guides/how-to-sound-like-gene-hoglan`
- `https://metalforge.io/drummers/arin-ilejay/licks/arin-ilejay-shepherd-of-fire-double-bass`
- `https://metalforge.io/brands`
- `https://metalforge.io/articles/blake-richardson-drum-setup`
- `https://metalforge.io/bands/nile`
- `https://metalforge.io/drummer/aquiles-priester/hardware`
- `https://metalforge.io/guides/how-to-sound-like-george-kollias`
- `https://metalforge.io/drummers/art-cruz/licks/art-cruz-gomorrah-blast-groove`
- `https://metalforge.io/compare`
- `https://metalforge.io/articles/brann-dailor-mastodon-drum-setup`
- `https://metalforge.io/bands/pantera`
- `https://metalforge.io/drummer/aquiles-priester/snare`
- `https://metalforge.io/guides/how-to-sound-like-joey-jordison`
- `https://metalforge.io/drummers/art-cruz/licks/art-cruz-memento-mori-groove`
- `https://metalforge.io/drummers`
- `https://metalforge.io/articles/breakdown-beat-guide`
- `https://metalforge.io/bands/sepultura`
- `https://metalforge.io/drummer/aquiles-priester/sticks`
- `https://metalforge.io/guides/how-to-sound-like-lars-ulrich`
- `https://metalforge.io/drummers/art-cruz/licks/art-cruz-new-colossal-hate-snare-bass`
- `https://metalforge.io/drummers/abe-cunningham/licks`
- `https://metalforge.io/articles/chaos-ad-drum-setup`
- `https://metalforge.io/bands/slayer`
- `https://metalforge.io/drummer/arin-ilejay/cymbals`
- `https://metalforge.io/guides/how-to-sound-like-mario-duplantier`
- `https://metalforge.io/drummers/ben-koller/licks/ben-koller-aimless-arrow-hardcore`
- `https://metalforge.io/drummers/alex-bent/licks`
- `https://metalforge.io/articles/charlie-benante-among-the-living-drum-setup`
- `https://metalforge.io/bands/slipknot`
- `https://metalforge.io/drummer/arin-ilejay/drums`
- `https://metalforge.io/guides/how-to-sound-like-matt-greiner`
- `https://metalforge.io/drummers/ben-koller/licks/ben-koller-concubine-grind`
- `https://metalforge.io/drummers/aquiles-priester/licks`
- `https://metalforge.io/articles/chris-turner-drum-setup`
- `https://metalforge.io/bands/suicidal-tendencies`
- `https://metalforge.io/drummer/arin-ilejay/hardware`
- `https://metalforge.io/guides/how-to-sound-like-matt-halpern`
- `https://metalforge.io/drummers/ben-koller/licks/ben-koller-dark-horse-fills`
- `https://metalforge.io/drummers/arin-ilejay/licks`
- `https://metalforge.io/articles/cowboys-from-hell-drum-setup`
- `https://metalforge.io/bands/tool`
- `https://metalforge.io/drummer/arin-ilejay/snare`
- `https://metalforge.io/guides/how-to-sound-like-tomas-haake`
- `https://metalforge.io/drummers/bill-ward/licks/bill-ward-iron-man-groove`
- `https://metalforge.io/drummers/art-cruz/licks`
- `https://metalforge.io/articles/daniel-erlandsson-drum-setup`
- `https://metalforge.io/drummer/arin-ilejay/sticks`
- `https://metalforge.io/guides/how-to-sound-like-travis-orbin`
- `https://metalforge.io/drummers/bill-ward/licks/bill-ward-nib-shuffle`
- `https://metalforge.io/drummers/ben-koller/licks`
- `https://metalforge.io/articles/daray-drum-setup`
- `https://metalforge.io/drummer/art-cruz/cymbals`
- `https://metalforge.io/drummers/bill-ward/licks/bill-ward-war-pigs-groove`
- `https://metalforge.io/drummers/bill-ward/licks`
- `https://metalforge.io/articles/derek-roddy-hate-eternal-drum-setup`
- `https://metalforge.io/drummer/art-cruz/drums`
- `https://metalforge.io/drummers/blake-richardson/licks/blake-richardson-lay-ghosts-double-bass`
- `https://metalforge.io/drummers/blake-richardson/licks`
- `https://metalforge.io/articles/double-bass-drumming-for-metal`
- `https://metalforge.io/drummer/art-cruz/hardware`
- `https://metalforge.io/drummers/blake-richardson/licks/blake-richardson-prequel-sequel-7-8`
- `https://metalforge.io/drummers/brann-dailor/licks`
- `https://metalforge.io/articles/dystopia-drum-setup`
- `https://metalforge.io/drummer/art-cruz/snare`
- `https://metalforge.io/drummers/blake-richardson/licks/blake-richardson-telos-progressive-fills`
- `https://metalforge.io/drummers/charlie-benante/licks`
- `https://metalforge.io/articles/fastest-double-bass-drummers`
- `https://metalforge.io/drummer/art-cruz/sticks`
- `https://metalforge.io/drummers/brann-dailor/licks/brann-dailor-blood-and-thunder-groove`
- `https://metalforge.io/drummers/chris-adler/licks`

### `ok` (0)

_(none)_
