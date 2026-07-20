# Structured-Data Validation — weekly snapshot

*Auto-written by `.github/workflows/check-structured-data.yml`. CEO Agent: read this every run when deciding which JSON-LD gaps to file `ai-fix` issues for. This catches the class of bug GSC flags as "Missing field X" before Google does.*

**Generated:** 2026-07-20T11:01:28.442Z
**Sitemap URLs total:** 3041 · **Sampled this run:** 150 (cap 150)
**Compared against:** 2026-07-13.json

**150 URLs scanned · 150 clean · 0 with issues · WoW: +0 new, −0 fixed**

**Counts:** `ok`=150

**Sample coverage (by URL type):** `articles` 22/432 · `bands` 22/36 · `drummer` 22/524 · `guides` 21/349 · `licks` 21/290 · `lists` 21/98 · `other` 21/1312

> ⚠️ Cap reached — not every URL was scanned this run: `other` 1291 skipped, `guides` 328 skipped, `lists` 77 skipped, `articles` 410 skipped, `drummer` 502 skipped, `bands` 14 skipped, `licks` 269 skipped.

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

### `no-jsonld` (0)

_(none)_

### `ok` (150)

- `https://metalforge.io/articles/10000-days-drum-setup`
- `https://metalforge.io/bands/animals-as-leaders`
- `https://metalforge.io/drummer/abe-cunningham/cymbals`
- `https://metalforge.io/guides/beginner-metal-drummer-setup`
- `https://metalforge.io/drummers/abe-cunningham/licks/abe-cunningham-change-groove`
- `https://metalforge.io/lists/2000s-metal-drummers`
- `https://metalforge.io/`
- `https://metalforge.io/articles/72-seasons-drum-setup`
- `https://metalforge.io/bands/anthrax`
- `https://metalforge.io/drummer/abe-cunningham/drums`
- `https://metalforge.io/guides/best-bass-drum-pedals-for-black-metal`
- `https://metalforge.io/drummers/abe-cunningham/licks/abe-cunningham-digital-bath-groove`
- `https://metalforge.io/lists/2010s-metal-drummers`
- `https://metalforge.io/bpm`
- `https://metalforge.io/articles/a-dramatic-turn-of-events-drum-setup`
- `https://metalforge.io/bands/behemoth`
- `https://metalforge.io/drummer/abe-cunningham/hardware`
- `https://metalforge.io/guides/best-bass-drum-pedals-for-death-metal`
- `https://metalforge.io/drummers/abe-cunningham/licks/abe-cunningham-my-own-summer-groove`
- `https://metalforge.io/lists/2020s-metal-drummers`
- `https://metalforge.io/guess-the-kit`
- `https://metalforge.io/articles/a-matter-of-life-and-death-drum-setup`
- `https://metalforge.io/bands/cannibal-corpse`
- `https://metalforge.io/drummer/abe-cunningham/heads`
- `https://metalforge.io/guides/best-bass-drum-pedals-for-deathcore`
- `https://metalforge.io/drummers/abe-cunningham/licks/cunningham-diamond-eyes-fill`
- `https://metalforge.io/lists/80s-metal-drummers`
- `https://metalforge.io/tools`
- `https://metalforge.io/articles/a-view-from-the-top-of-the-world-drum-setup`
- `https://metalforge.io/bands/cavalera-conspiracy`
- `https://metalforge.io/drummer/abe-cunningham/pedals`
- `https://metalforge.io/guides/best-bass-drum-pedals-for-djent`
- `https://metalforge.io/drummers/abe-cunningham/licks/cunningham-saturday-night-wrist-pattern`
- `https://metalforge.io/lists/90s-metal-drummers`
- `https://metalforge.io/tools/compare`
- `https://metalforge.io/articles/abr-phantom-anthem-drum-setup`
- `https://metalforge.io/bands/cynic`
- `https://metalforge.io/drummer/abe-cunningham/snare`
- `https://metalforge.io/guides/best-bass-drum-pedals-for-doom-metal`
- `https://metalforge.io/drummers/abe-cunningham/licks/cunningham-white-pony-groove`
- `https://metalforge.io/lists/ambient-metal-drummers`
- `https://metalforge.io/tools/metal-drummer-name-generator`
- `https://metalforge.io/articles/abrahadabra-drum-setup`
- `https://metalforge.io/bands/damageplan`
- `https://metalforge.io/drummer/abe-cunningham/sticks`
- `https://metalforge.io/guides/best-bass-drum-pedals-for-extreme-metal`
- `https://metalforge.io/drummers/adrian-erlandsson/licks/adrian-erlandsson-at-war-with-reality-drum-setup`
- `https://metalforge.io/lists/atmospheric-black-metal-drummers`
- `https://metalforge.io/articles`
- `https://metalforge.io/articles/absolute-drum-setup`
- `https://metalforge.io/bands/death`
- `https://metalforge.io/drummer/adrian-erlandsson/cymbals`
- `https://metalforge.io/guides/best-bass-drum-pedals-for-groove-metal`
- `https://metalforge.io/drummers/adrian-erlandsson/licks/adrian-erlandsson-slaughter-of-the-soul-drum-setup`
- `https://metalforge.io/lists/avant-garde-metal-drummers`
- `https://metalforge.io/bands`
- `https://metalforge.io/articles/aenima-drum-setup`
- `https://metalforge.io/bands/deftones`
- `https://metalforge.io/drummer/adrian-erlandsson/drums`
- `https://metalforge.io/guides/best-bass-drum-pedals-for-mathcore`
- `https://metalforge.io/drummers/adrian-erlandsson/licks/adrian-erlandsson-to-drink-from-the-night-itself-drum-setup`
- `https://metalforge.io/lists/best-2000s-metalcore-drummers`
- `https://metalforge.io/battles`
- `https://metalforge.io/articles/aftershock-drum-setup`
- `https://metalforge.io/bands/dream-theater`
- `https://metalforge.io/drummer/adrian-erlandsson/hardware`
- `https://metalforge.io/guides/best-bass-drum-pedals-for-metal`
- `https://metalforge.io/drummers/alex-bent/licks/alex-bent-a-crisis-of-revelation-drum-setup`
- `https://metalforge.io/lists/best-90s-death-metal-drummers`
- `https://metalforge.io/birthdays`
- `https://metalforge.io/articles/alaska-drum-setup`
- `https://metalforge.io/bands/drum-chair-changes`
- `https://metalforge.io/drummer/adrian-erlandsson/heads`
- `https://metalforge.io/guides/best-bass-drum-pedals-for-metalcore`
- `https://metalforge.io/drummers/alex-bent/licks/alex-bent-betrayer-groove`
- `https://metalforge.io/lists/best-alternative-metal-drummers`
- `https://metalforge.io/bpm-tap`
- `https://metalforge.io/articles/alien-drum-setup`
- `https://metalforge.io/bands/gojira`
- `https://metalforge.io/drummer/adrian-erlandsson/pedals`
- `https://metalforge.io/guides/best-bass-drum-pedals-for-nu-metal`
- `https://metalforge.io/drummers/alex-bent/licks/alex-bent-beyond-oblivion-drum-setup`
- `https://metalforge.io/lists/best-classic-heavy-metal-drummers`
- `https://metalforge.io/brands`
- `https://metalforge.io/articles/all-hope-is-gone-drum-setup`
- `https://metalforge.io/bands/hellyeah`
- `https://metalforge.io/drummer/adrian-erlandsson/snare`
- `https://metalforge.io/guides/best-bass-drum-pedals-for-post-metal`
- `https://metalforge.io/drummers/alex-bent/licks/alex-bent-beyond-oblivion-groove`
- `https://metalforge.io/lists/best-death-metal-drummers`
- `https://metalforge.io/compare`
- `https://metalforge.io/articles/all-we-love-we-leave-behind-drum-setup`
- `https://metalforge.io/bands/korn`
- `https://metalforge.io/drummer/adrian-erlandsson/sticks`
- `https://metalforge.io/guides/best-bass-drum-pedals-for-power-metal`
- `https://metalforge.io/drummers/alex-bent/licks/alex-bent-seat-of-the-soul-drum-setup`
- `https://metalforge.io/lists/best-extreme-metal-drummers-with-groove`
- `https://metalforge.io/cymbals`
- `https://metalforge.io/articles/altars-of-madness-drum-setup`
- `https://metalforge.io/bands/kublai-khan-tx`
- `https://metalforge.io/drummer/alex-bent/cymbals`
- `https://metalforge.io/guides/best-bass-drum-pedals-for-progressive-metal`
- `https://metalforge.io/drummers/alex-bent/licks/alex-bent-sin-and-sentence-groove`
- `https://metalforge.io/lists/best-left-handed-metal-drummers`
- `https://metalforge.io/cymbals/best-for-metal`
- `https://metalforge.io/articles/and-justice-for-all-drum-setup`
- `https://metalforge.io/bands/lamb-of-god`
- `https://metalforge.io/drummer/alex-bent/drums`
- `https://metalforge.io/guides/best-bass-drum-pedals-for-sludge-metal`
- `https://metalforge.io/drummers/aquiles-priester/licks/aquiles-priester-heroes-of-sand`
- `https://metalforge.io/lists/best-live-metal-drummers`
- `https://metalforge.io/drummers`
- `https://metalforge.io/articles/and-then-youll-beg-drum-setup`
- `https://metalforge.io/bands/limp-bizkit`
- `https://metalforge.io/drummer/alex-bent/hardware`
- `https://metalforge.io/guides/best-bass-drum-pedals-for-symphonic-metal`
- `https://metalforge.io/drummers/aquiles-priester/licks/aquiles-priester-rebirth`
- `https://metalforge.io/lists/best-metal-drummers-of-all-time`
- `https://metalforge.io/drummers/abe-cunningham/gear-history`
- `https://metalforge.io/articles/angel-of-retribution-drum-setup`
- `https://metalforge.io/bands/mastodon`
- `https://metalforge.io/drummer/alex-bent/heads`
- `https://metalforge.io/guides/best-bass-drum-pedals-for-technical-death-metal`
- `https://metalforge.io/drummers/aquiles-priester/licks/aquiles-priester-spread-your-fire`
- `https://metalforge.io/lists/best-metal-drummers-playing-dw-kits`
- `https://metalforge.io/drummers/abe-cunningham/licks`
- `https://metalforge.io/articles/animals-as-leaders-drum-setup`
- `https://metalforge.io/bands/megadeth`
- `https://metalforge.io/drummer/alex-bent/pedals`
- `https://metalforge.io/guides/best-bass-drum-pedals-for-thrash-metal`
- `https://metalforge.io/drummers/arin-ilejay/licks/arin-ilejay-god-forsaken-fill-cascade`
- `https://metalforge.io/lists/best-metal-drummers-playing-meinl-cymbals`
- `https://metalforge.io/drummers/adrian-erlandsson/gear-history`
- `https://metalforge.io/articles/anthems-of-rebellion-drum-setup`
- `https://metalforge.io/bands/meshuggah`
- `https://metalforge.io/drummer/alex-bent/snare`
- `https://metalforge.io/guides/best-bass-drums-for-black-metal`
- `https://metalforge.io/drummers/arin-ilejay/licks/arin-ilejay-hail-to-the-king-halftime`
- `https://metalforge.io/lists/best-metal-drummers-playing-pearl-kits`
- `https://metalforge.io/drummers/adrian-erlandsson/licks`
- `https://metalforge.io/articles/aquiles-priester-drum-kit-guide`
- `https://metalforge.io/bands/metallica`
- `https://metalforge.io/drummer/alex-bent/sticks`
- `https://metalforge.io/guides/best-bass-drums-for-death-metal`
- `https://metalforge.io/drummers/arin-ilejay/licks/arin-ilejay-shepherd-of-fire-double-bass`
- `https://metalforge.io/lists/best-metal-drummers-playing-sabian-cymbals`
- `https://metalforge.io/drummers/alex-bent/gear-history`
- `https://metalforge.io/articles/aquiles-priester-drum-setup`
- `https://metalforge.io/bands/morbid-angel`
- `https://metalforge.io/drummer/aquiles-priester/cymbals`
