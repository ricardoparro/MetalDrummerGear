/**
 * Drum Endorsement Landscape study — which brands endorse the most drummers
 * across the current 67-drummer roster (union of kits/snares/
 * cymbals/sticks/pedals brand usage), signature-model counts from drumsticks.js
 * and snares.js, and a kit-brand x primary-genre cross-tab.
 *
 * GENERATED FILE — do not edit by hand.
 * Regenerate with: node scripts/compute-studies.cjs
 *
 * Source of truth: this script's own phase-1 STUDY.categories (api/drummers/index.js
 * gear fields), plus packages/frontend/data/drumsticks.js and data/snares.js.
 * Dataset snapshot date: 2026-07-16.
 *
 * Methodology: brandReach counts a drummer once per brand regardless of how many
 * categories that brand appears in for them (e.g. a drummer playing Tama kits and
 * Tama... hardware still counts once for Tama's reach). Signature-model counts are
 * separate: they count named product models (drumsticks.js/snares.js entries), not
 * drummers, so one drummer with two signature snares would count twice there.
 * Cymbals have no per-model signature flag in this codebase (see
 * signatureModels.cymbalsCaveat) — this is a real data-coverage gap, not an
 * implication that no metal drummer has a signature cymbal line. genreBrandMatrix
 * only breaks out genre buckets with >= 2 drummers (bucketMinDrummers);
 * the remaining 9 drummers are in single-drummer genre buckets,
 * too thin to support a brand "pattern" claim.
 *
 * Consumed by: /studies/drum-endorsement-landscape (packages/frontend/pages) and
 * the bot-facing SSR handler (api/meta/[...path].js).
 */

export const DRUM_ENDORSEMENT_LANDSCAPE = {
  "generatedAt": "2026-07-16",
  "totalDrummers": 67,
  "brandReach": [
    {
      "brand": "Vic Firth",
      "count": 44,
      "percent": 65.7,
      "categories": [
        "sticks"
      ],
      "drummers": [
        {
          "id": 6,
          "name": "George Kollias",
          "slug": "george-kollias",
          "band": "Nile",
          "configString": "Vic Firth George Kollias Signature SGK"
        },
        {
          "id": 8,
          "name": "Ray Luzier",
          "slug": "ray-luzier",
          "band": "Korn",
          "configString": "Vic Firth Ray Luzier Signature"
        },
        {
          "id": 11,
          "name": "Vinnie Paul",
          "slug": "vinnie-paul",
          "band": "Pantera / Damageplan / Hellyeah",
          "configString": "Vic Firth American Classic 5B"
        },
        {
          "id": 12,
          "name": "Charlie Benante",
          "slug": "charlie-benante",
          "band": "Anthrax / S.O.D. / Pantera",
          "configString": "Vic Firth Charlie Benante Signature"
        },
        {
          "id": 14,
          "name": "Danny Carey",
          "slug": "danny-carey",
          "band": "Tool",
          "configString": "Vic Firth Danny Carey Signature"
        },
        {
          "id": 19,
          "name": "Inferno",
          "slug": "inferno",
          "band": "Behemoth",
          "configString": "Vic Firth 5B"
        },
        {
          "id": 20,
          "name": "Hellhammer",
          "slug": "hellhammer",
          "band": "Mayhem",
          "configString": "Vic Firth American Classic 5B"
        },
        {
          "id": 22,
          "name": "Art Cruz",
          "slug": "art-cruz",
          "band": "Lamb of God",
          "configString": "Vic Firth American Classic 5B"
        },
        {
          "id": 23,
          "name": "Arin Ilejay",
          "slug": "arin-ilejay",
          "band": "ex-Avenged Sevenfold",
          "configString": "Vic Firth American Classic 5A"
        },
        {
          "id": 24,
          "name": "Navene Koperweis",
          "slug": "navene-koperweis",
          "band": "Entheos / ex-Animals as Leaders",
          "configString": "Vic Firth American Classic 5B"
        },
        {
          "id": 25,
          "name": "Alex Bent",
          "slug": "alex-bent",
          "band": "ex-Trivium / Arkaik / Dragonlord",
          "configString": "Vic Firth American Classic 5B"
        },
        {
          "id": 26,
          "name": "Shannon Larkin",
          "slug": "shannon-larkin",
          "band": "Godsmack / Ugly Kid Joe / Amen",
          "configString": "Vic Firth American Classic 5B"
        },
        {
          "id": 28,
          "name": "Morgan Ågren",
          "slug": "morgan-agren",
          "band": "Mats/Morgan Band / Kaipa / Fredrik Thordendal's Special Defects",
          "configString": "Vic Firth American Classic 5A"
        },
        {
          "id": 29,
          "name": "Igor Cavalera",
          "slug": "igor-cavalera",
          "band": "Sepultura / Cavalera Conspiracy / Soulwax",
          "configString": "Vic Firth American Classic 5B"
        },
        {
          "id": 30,
          "name": "Bill Ward",
          "slug": "bill-ward",
          "band": "Black Sabbath",
          "configString": "Vic Firth American Classic 2B"
        },
        {
          "id": 31,
          "name": "Nick Augusto",
          "slug": "nick-augusto",
          "band": "ex-Trivium",
          "configString": "Vic Firth American Classic 5B"
        },
        {
          "id": 32,
          "name": "Matt Greiner",
          "slug": "matt-greiner",
          "band": "August Burns Red",
          "configString": "Vic Firth Matt Greiner Signature"
        },
        {
          "id": 33,
          "name": "Blake Richardson",
          "slug": "blake-richardson",
          "band": "Between the Buried and Me",
          "configString": "Vic Firth American Classic 3A"
        },
        {
          "id": 34,
          "name": "Ben Koller",
          "slug": "ben-koller",
          "band": "Converge / Mutoid Man / Killer Be Killed",
          "configString": "Vic Firth American Classic 5B"
        },
        {
          "id": 35,
          "name": "Flo Mounier",
          "slug": "flo-mounier",
          "band": "Cryptopsy",
          "configString": "Vic Firth American Classic 5A"
        },
        {
          "id": 36,
          "name": "Ryan Van Poederooyen",
          "slug": "ryan-van-poederooyen",
          "band": "Devin Townsend Project",
          "configString": "Vic Firth American Classic 5B"
        },
        {
          "id": 38,
          "name": "Martin Lopez",
          "slug": "martin-lopez",
          "band": "Soen / ex-Opeth",
          "configString": "Vic Firth American Classic 5A"
        },
        {
          "id": 39,
          "name": "Travis Orbin",
          "slug": "travis-orbin",
          "band": "Darkest Hour / ex-Periphery",
          "configString": "Vic Firth American Classic 5B"
        },
        {
          "id": 40,
          "name": "Chris Turner",
          "slug": "chris-turner",
          "band": "Oceans Ate Alaska",
          "configString": "Vic Firth American Classic 5A"
        },
        {
          "id": 41,
          "name": "Nicko McBrain",
          "slug": "nicko-mcbrain",
          "band": "Iron Maiden",
          "configString": "Vic Firth Nicko McBrain Signature"
        },
        {
          "id": 42,
          "name": "Scott Travis",
          "slug": "scott-travis",
          "band": "Judas Priest",
          "configString": "Vic Firth American Classic 5B"
        },
        {
          "id": 46,
          "name": "Frost",
          "slug": "frost",
          "band": "Satyricon / 1349",
          "configString": "Vic Firth American Classic Extreme 5B"
        },
        {
          "id": 47,
          "name": "Gavin Harrison",
          "slug": "gavin-harrison",
          "band": "Porcupine Tree / King Crimson",
          "configString": "Vic Firth Gavin Harrison Signature"
        },
        {
          "id": 48,
          "name": "Abe Cunningham",
          "slug": "abe-cunningham",
          "band": "Deftones",
          "configString": "Vic Firth American Classic 2B"
        },
        {
          "id": 49,
          "name": "Richard Christy",
          "slug": "richard-christy",
          "band": "Death / Iced Earth",
          "configString": "Vic Firth American Classic 5A"
        },
        {
          "id": 51,
          "name": "Paul Mazurkiewicz",
          "slug": "paul-mazurkiewicz",
          "band": "Cannibal Corpse",
          "configString": "Vic Firth American Classic 5B"
        },
        {
          "id": 53,
          "name": "Matt Garstka",
          "slug": "matt-garstka",
          "band": "Animals as Leaders",
          "configString": "Vic Firth Matt Garstka Signature"
        },
        {
          "id": 54,
          "name": "Daniel Erlandsson",
          "slug": "daniel-erlandsson",
          "band": "Arch Enemy",
          "configString": "Vic Firth American Classic 5B"
        },
        {
          "id": 55,
          "name": "Jaska Raatikainen",
          "slug": "jaska-raatikainen",
          "band": "Children of Bodom",
          "configString": "Vic Firth American Classic 5A"
        },
        {
          "id": 56,
          "name": "Hannes Grossmann",
          "slug": "hannes-grossmann",
          "band": "Obscura / ex-Necrophagist / Alkaloid",
          "configString": "Vic Firth American Classic 5B"
        },
        {
          "id": 57,
          "name": "Daray",
          "slug": "daray",
          "band": "Dimmu Borgir / Vader",
          "configString": "Vic Firth American Classic Extreme 5B"
        },
        {
          "id": 58,
          "name": "Jocke Wallgren",
          "slug": "jocke-wallgren",
          "band": "Amon Amarth",
          "configString": "Vic Firth American Classic 5B"
        },
        {
          "id": 59,
          "name": "Tim Yeung",
          "slug": "tim-yeung",
          "band": "Morbid Angel / Hate Eternal / Vital Remains",
          "configString": "Vic Firth American Classic 5A"
        },
        {
          "id": 60,
          "name": "Kevin Talley",
          "slug": "kevin-talley",
          "band": "Dying Fetus / Misery Index / Six Feet Under",
          "configString": "Vic Firth American Classic 5B"
        },
        {
          "id": 61,
          "name": "Isaac Lamb",
          "slug": "isaac-lamb",
          "band": "Kublai Khan TX",
          "configString": "Vic Firth American Classic 2B"
        },
        {
          "id": 62,
          "name": "Martin Axenrot",
          "slug": "martin-axenrot",
          "band": "Opeth",
          "configString": "Vic Firth American Classic 5B"
        },
        {
          "id": 64,
          "name": "Sean Reinert",
          "slug": "sean-reinert",
          "band": "Death / Cynic",
          "configString": "Vic Firth American Classic 5A"
        },
        {
          "id": 65,
          "name": "Nick Menza",
          "slug": "nick-menza",
          "band": "Megadeth",
          "configString": "Vic Firth American Classic 5B"
        },
        {
          "id": 66,
          "name": "Adrian Erlandsson",
          "slug": "adrian-erlandsson",
          "band": "At the Gates",
          "configString": "Vic Firth American Classic Rock Nylon Tip (ROCKN)"
        }
      ]
    },
    {
      "brand": "Tama",
      "count": 23,
      "percent": 34.3,
      "categories": [
        "kits",
        "snares",
        "sticks",
        "pedals"
      ],
      "drummers": [
        {
          "id": 1,
          "name": "Lars Ulrich",
          "slug": "lars-ulrich",
          "band": "Metallica",
          "configString": "Tama Iron Cobra 900 Power Glide Double Pedal"
        },
        {
          "id": 4,
          "name": "Dave Lombardo",
          "slug": "dave-lombardo",
          "band": "Slayer",
          "configString": "Tama Iron Cobra 900 Double Pedal"
        },
        {
          "id": 5,
          "name": "Tomas Haake",
          "slug": "tomas-haake",
          "band": "Meshuggah",
          "configString": "Tama Speed Cobra Single Pedals (x2)"
        },
        {
          "id": 7,
          "name": "Eloy Casagrande",
          "slug": "eloy-casagrande",
          "band": "Slipknot",
          "configString": "Tama Iron Cobra Double Pedal"
        },
        {
          "id": 12,
          "name": "Charlie Benante",
          "slug": "charlie-benante",
          "band": "Anthrax / S.O.D. / Pantera",
          "configString": "Tama Speed Cobra Double Pedal"
        },
        {
          "id": 13,
          "name": "Mike Portnoy",
          "slug": "mike-portnoy",
          "band": "Dream Theater / Liquid Tension Experiment / The Winery Dogs",
          "configString": "Tama Iron Cobra Power Glide Double Pedal"
        },
        {
          "id": 15,
          "name": "Mario Duplantier",
          "slug": "mario-duplantier",
          "band": "Gojira",
          "configString": "Tama Iron Cobra 900 Power Glide Double Pedal"
        },
        {
          "id": 16,
          "name": "Brann Dailor",
          "slug": "brann-dailor",
          "band": "Mastodon",
          "configString": "Tama Speed Cobra Double Pedal"
        },
        {
          "id": 27,
          "name": "Raymond Herrera",
          "slug": "raymond-herrera",
          "band": "Fear Factory / Arkaea / Brujeria",
          "configString": "Tama 14x6.5\" Brass"
        },
        {
          "id": 29,
          "name": "Igor Cavalera",
          "slug": "igor-cavalera",
          "band": "Sepultura / Cavalera Conspiracy / Soulwax",
          "configString": "Tama Iron Cobra Double Pedal"
        },
        {
          "id": 33,
          "name": "Blake Richardson",
          "slug": "blake-richardson",
          "band": "Between the Buried and Me",
          "configString": "Tama Iron Cobra Power Glide Single Pedals (x2)"
        },
        {
          "id": 34,
          "name": "Ben Koller",
          "slug": "ben-koller",
          "band": "Converge / Mutoid Man / Killer Be Killed",
          "configString": "Tama Iron Cobra 900 Double Pedal"
        },
        {
          "id": 40,
          "name": "Chris Turner",
          "slug": "chris-turner",
          "band": "Oceans Ate Alaska",
          "configString": "Tama Speed Cobra 910 Double Pedal"
        },
        {
          "id": 44,
          "name": "Derek Roddy",
          "slug": "derek-roddy",
          "band": "Hate Eternal / Nile",
          "configString": "Tama Speed Cobra 910 Double Pedal"
        },
        {
          "id": 45,
          "name": "Dirk Verbeuren",
          "slug": "dirk-verbeuren",
          "band": "Megadeth",
          "configString": "Tama Speed Cobra 910 Double Pedal"
        },
        {
          "id": 49,
          "name": "Richard Christy",
          "slug": "richard-christy",
          "band": "Death / Iced Earth",
          "configString": "Tama Iron Cobra 900 Double Pedal"
        },
        {
          "id": 53,
          "name": "Matt Garstka",
          "slug": "matt-garstka",
          "band": "Animals as Leaders",
          "configString": "Tama Speed Cobra 910 Double Pedal"
        },
        {
          "id": 59,
          "name": "Tim Yeung",
          "slug": "tim-yeung",
          "band": "Morbid Angel / Hate Eternal / Vital Remains",
          "configString": "Tama Speed Cobra 910 Double Pedal"
        },
        {
          "id": 62,
          "name": "Martin Axenrot",
          "slug": "martin-axenrot",
          "band": "Opeth",
          "configString": "Tama Iron Cobra Double Pedal"
        },
        {
          "id": 64,
          "name": "Sean Reinert",
          "slug": "sean-reinert",
          "band": "Death / Cynic",
          "configString": "Tama Artstar II Birch 14x5.5\""
        },
        {
          "id": 65,
          "name": "Nick Menza",
          "slug": "nick-menza",
          "band": "Megadeth",
          "configString": "Tama Steel Snare 14x5.5\""
        },
        {
          "id": 66,
          "name": "Adrian Erlandsson",
          "slug": "adrian-erlandsson",
          "band": "At the Gates",
          "configString": "Tama Starclassic Bubinga 14x6.5\""
        },
        {
          "id": 67,
          "name": "Jon Dette",
          "slug": "jon-dette",
          "band": "Slayer",
          "configString": "DW 9000 or Tama Iron Cobra Double Pedal"
        }
      ]
    },
    {
      "brand": "Zildjian",
      "count": 23,
      "percent": 34.3,
      "categories": [
        "cymbals",
        "sticks"
      ],
      "drummers": [
        {
          "id": 1,
          "name": "Lars Ulrich",
          "slug": "lars-ulrich",
          "band": "Metallica",
          "configString": "Zildjian A Custom Series (14\" Dyno Beat Hi-Hats, 16\", 17\" & 18\" Rock Crashes, 20\" Z Custom China, 22\" Ride)"
        },
        {
          "id": 6,
          "name": "George Kollias",
          "slug": "george-kollias",
          "band": "Nile",
          "configString": "Zildjian (14\" K Mastersound Hi-Hats, 17\" & 18\" K Custom Dark Crashes, 21\" A Custom Mega Bell Ride, 18\" China)"
        },
        {
          "id": 9,
          "name": "John Otto",
          "slug": "john-otto",
          "band": "Limp Bizkit",
          "configString": "Zildjian Artist Series"
        },
        {
          "id": 10,
          "name": "Jay Weinberg",
          "slug": "jay-weinberg",
          "band": "Suicidal Tendencies",
          "configString": "Zildjian (14\" A New Beat Hi-Hats, 18\" & 19\" A Custom Crashes, 21\" K Custom Ride, 19\" K China, 7\" FX Break Bell)"
        },
        {
          "id": 15,
          "name": "Mario Duplantier",
          "slug": "mario-duplantier",
          "band": "Gojira",
          "configString": "Zildjian (14\" K Sweet Hi-Hats, 14\" A Custom Hi-Hats, 18\" K Custom Hybrid Crash, 19\" A Custom Crash, 20\" K Sweet Crash, 21\" Z Custom Mega Bell Ride, 18\" & 20\" Chinas)"
        },
        {
          "id": 22,
          "name": "Art Cruz",
          "slug": "art-cruz",
          "band": "Lamb of God",
          "configString": "Zildjian (14\" A Custom Mastersound Hi-Hats, 18\" A Custom EFX, 18\" A Custom Medium Crash, 19\" A Custom Projection Crash, 20\" A Custom Crash, 21\" A Zildjian Mega Bell Ride, 19\" A Ultra Hammered Chinas, 17\" K China w/ EFX Holes, 9\" FX Trash Splashes, FX Blast Bell)"
        },
        {
          "id": 23,
          "name": "Arin Ilejay",
          "slug": "arin-ilejay",
          "band": "ex-Avenged Sevenfold",
          "configString": "Zildjian (14\" A Custom Mastersound Hi-Hats, 18\" & 19\" A Custom Crashes, 21\" A Sweet Ride, 18\" A Custom China)"
        },
        {
          "id": 25,
          "name": "Alex Bent",
          "slug": "alex-bent",
          "band": "ex-Trivium / Arkaik / Dragonlord",
          "configString": "Zildjian (14\" K Custom Hybrid Hi-Hats, 18\" & 19\" K Custom Hybrid Crashes, 21\" K Custom Hybrid Ride, 18\" A Custom China)"
        },
        {
          "id": 27,
          "name": "Raymond Herrera",
          "slug": "raymond-herrera",
          "band": "Fear Factory / Arkaea / Brujeria",
          "configString": "Zildjian A Custom & Z Custom Series (14\" A Custom Hi-Hats, 18\" & 19\" A Custom Crashes, 21\" Z Custom Mega Bell Ride, 18\" A Custom China)"
        },
        {
          "id": 34,
          "name": "Ben Koller",
          "slug": "ben-koller",
          "band": "Converge / Mutoid Man / Killer Be Killed",
          "configString": "Zildjian (14\" K Dark Thin Hi-Hats, 18\" & 19\" K Dark Medium Thin Crashes, 21\" K Custom Ride, 18\" K China)"
        },
        {
          "id": 37,
          "name": "Jason Bittner",
          "slug": "jason-bittner",
          "band": "Shadows Fall / Overkill / Category 7",
          "configString": "Zildjian K & A Custom Series (14\" K Hi-Hats, 18\" & 19\" A Custom Crashes, 21\" K Custom Ride, 18\" K China)"
        },
        {
          "id": 38,
          "name": "Martin Lopez",
          "slug": "martin-lopez",
          "band": "Soen / ex-Opeth",
          "configString": "Zildjian K Dark Series (14\" K Dark Thin Hi-Hats, 18\" & 20\" K Dark Medium Thin Crashes, 22\" K Dark Light Ride, 18\" K China)"
        },
        {
          "id": 39,
          "name": "Travis Orbin",
          "slug": "travis-orbin",
          "band": "Darkest Hour / ex-Periphery",
          "configString": "Zildjian K Custom Series (14\" K Custom Dark Hi-Hats, 18\" & 19\" K Custom Dark Crashes, 21\" K Custom Ride, 18\" K Custom China)"
        },
        {
          "id": 43,
          "name": "Mikkey Dee",
          "slug": "mikkey-dee",
          "band": "Scorpions / Motörhead",
          "configString": "Zildjian A Custom & K Series (14\" A Custom Hi-Hats, 18\" & 19\" A Custom Crashes, 22\" K Custom Ride, 20\" Oriental China)"
        },
        {
          "id": 45,
          "name": "Dirk Verbeuren",
          "slug": "dirk-verbeuren",
          "band": "Megadeth",
          "configString": "Zildjian A Custom & K Custom Series (14\" A Custom Hi-Hats, 17\", 18\", 19\" A Custom Crashes, 21\" K Custom Hybrid Ride, 18\" K China)"
        },
        {
          "id": 46,
          "name": "Frost",
          "slug": "frost",
          "band": "Satyricon / 1349",
          "configString": "Zildjian A Custom & K Series (14\" A Custom Hi-Hats, 16\", 17\", 18\" A Custom Crashes, 22\" K Custom Dark Ride, 18\" K China)"
        },
        {
          "id": 47,
          "name": "Gavin Harrison",
          "slug": "gavin-harrison",
          "band": "Porcupine Tree / King Crimson",
          "configString": "Zildjian K Custom Special Dry Series (14\" Hi-Hats, 16\" & 18\" Crashes, 21\" Special Dry Ride, 18\" Trash China)"
        },
        {
          "id": 48,
          "name": "Abe Cunningham",
          "slug": "abe-cunningham",
          "band": "Deftones",
          "configString": "Zildjian K Custom & A Custom Series (14\" K Custom Hi-Hats, 18\" & 20\" K Custom Crashes, 22\" K Custom Ride, 19\" A Custom China)"
        },
        {
          "id": 55,
          "name": "Jaska Raatikainen",
          "slug": "jaska-raatikainen",
          "band": "Children of Bodom",
          "configString": "Zildjian A Custom & K Custom Series (14\" A Custom Hi-Hats, 17\" & 18\" A Custom Crashes, 20\" K Custom Ride)"
        },
        {
          "id": 58,
          "name": "Jocke Wallgren",
          "slug": "jocke-wallgren",
          "band": "Amon Amarth",
          "configString": "Zildjian A Custom & K Custom Series (14\" A Custom Hi-Hats, 18\" & 19\" A Custom Crashes, 21\" K Custom Ride)"
        },
        {
          "id": 64,
          "name": "Sean Reinert",
          "slug": "sean-reinert",
          "band": "Death / Cynic",
          "configString": "Zildjian A/K Series (14\" A Quick Beat Hi-Hats, 16\" & 18\" A Crashes, 20\" K Custom Dry Ride, 16\" China, 10\" A Splash)"
        },
        {
          "id": 65,
          "name": "Nick Menza",
          "slug": "nick-menza",
          "band": "Megadeth",
          "configString": "Zildjian A Series (14\" A Hi-Hats, 16\" & 18\" A Crash, 20\" A Ride)"
        },
        {
          "id": 67,
          "name": "Jon Dette",
          "slug": "jon-dette",
          "band": "Slayer",
          "configString": "Sabian AAX / Zildjian A Series (14\" Hi-Hats, 16\" & 18\" Crash, 20\" Ride, 18\" China)"
        }
      ]
    },
    {
      "brand": "Sabian",
      "count": 20,
      "percent": 29.9,
      "categories": [
        "cymbals"
      ],
      "drummers": [
        {
          "id": 3,
          "name": "Gene Hoglan",
          "slug": "gene-hoglan",
          "band": "Death / Testament / Dethklok",
          "configString": "Sabian AAX Series (15\" Hi-Hats, 18\" & 20\" Crashes, 22\" Ride, 20\" China)"
        },
        {
          "id": 5,
          "name": "Tomas Haake",
          "slug": "tomas-haake",
          "band": "Meshuggah",
          "configString": "Sabian HHX & AAX Series (14\" HHX Compression Hi-Hats, 15\" Artisan Hi-Hats, 19\" & 20\" & 21\" HHX Stage Crashes, 22\" Legacy Ride, 19\" AAXtreme China)"
        },
        {
          "id": 8,
          "name": "Ray Luzier",
          "slug": "ray-luzier",
          "band": "Korn",
          "configString": "Sabian AAX Series (14\" Stage Hi-Hats, 18\" & 19\" X-Plosion Crashes, 21\" Stage Ride, 18\" AAXtreme China)"
        },
        {
          "id": 11,
          "name": "Vinnie Paul",
          "slug": "vinnie-paul",
          "band": "Pantera / Damageplan / Hellyeah",
          "configString": "Sabian AA & AAX Series (14\" Hi-Hats, 18\" & 19\" Crashes, 21\" Ride, 18\" China)"
        },
        {
          "id": 13,
          "name": "Mike Portnoy",
          "slug": "mike-portnoy",
          "band": "Dream Theater / Liquid Tension Experiment / The Winery Dogs",
          "configString": "Sabian HHX Series (14\" Evolution Hi-Hats, 18\" & 19\" Evolution Crashes, 21\" Raw Bell Dry Ride, 10\" & 12\" Evolution Splashes, 19\" O-Zone Crash)"
        },
        {
          "id": 21,
          "name": "Pete Sandoval",
          "slug": "pete-sandoval",
          "band": "Morbid Angel",
          "configString": "Sabian AAX Series (14\" Stage Hi-Hats, 18\" & 19\" X-Plosion Crashes, 20\" Stage Ride, 18\" Chinese)"
        },
        {
          "id": 26,
          "name": "Shannon Larkin",
          "slug": "shannon-larkin",
          "band": "Godsmack / Ugly Kid Joe / Amen",
          "configString": "Sabian AAX & HHX Series (14\" AAX Stage Hi-Hats, 18\" & 19\" AAX X-Plosion Crashes, 21\" HHX Raw Bell Dry Ride, 10\" AAX Splash, 18\" AAX Chinese)"
        },
        {
          "id": 31,
          "name": "Nick Augusto",
          "slug": "nick-augusto",
          "band": "ex-Trivium",
          "configString": "Sabian AAX Series (14\" Stage Hi-Hats, 18\" & 19\" X-Plosion Crashes, 21\" Stage Ride, 18\" AAXtreme China)"
        },
        {
          "id": 33,
          "name": "Blake Richardson",
          "slug": "blake-richardson",
          "band": "Between the Buried and Me",
          "configString": "Sabian (14\" HHX Evolution Hi-Hats, 18\" HHX Evolution Crash, 17\" & 21\" AAX Holy Chinas, 21\" HH Raw Bell Dry Ride, 10\" HH Duo Splash, 9\" Radia Cup Chime)"
        },
        {
          "id": 35,
          "name": "Flo Mounier",
          "slug": "flo-mounier",
          "band": "Cryptopsy",
          "configString": "Sabian AAX & HHX Series (14\" HHX Stage Hi-Hats, 17\" & 18\" AAX X-Plosion Crashes, 21\" HHX Raw Bell Dry Ride, 18\" AAXtreme China)"
        },
        {
          "id": 36,
          "name": "Ryan Van Poederooyen",
          "slug": "ryan-van-poederooyen",
          "band": "Devin Townsend Project",
          "configString": "Sabian HHX & AAX Series (14\" HHX Evolution Hi-Hats, 18\" & 20\" HHX Evolution Crashes, 21\" HHX Raw Bell Dry Ride, 19\" AAXtreme China)"
        },
        {
          "id": 49,
          "name": "Richard Christy",
          "slug": "richard-christy",
          "band": "Death / Iced Earth",
          "configString": "Sabian AAX & HHX Series (14\" AAX Stage Hi-Hats, 18\" & 19\" AAX X-Plosion Crashes, 21\" HHX Raw Bell Dry Ride, 18\" AAX Chinese)"
        },
        {
          "id": 50,
          "name": "Aquiles Priester",
          "slug": "aquiles-priester",
          "band": "Angra / W.A.S.P.",
          "configString": "Sabian HHX & AAX Series (14\" HHX Evolution Hi-Hats, 18\" & 19\" HHX X-Plosion Crashes, 21\" HHX Groove Ride, 18\" AAX Chinese)"
        },
        {
          "id": 51,
          "name": "Paul Mazurkiewicz",
          "slug": "paul-mazurkiewicz",
          "band": "Cannibal Corpse",
          "configString": "Sabian AAX Series (14\" Stage Hi-Hats, 18\" & 19\" X-Plosion Crashes, 21\" Raw Bell Dry Ride, 18\" AAXtreme China)"
        },
        {
          "id": 52,
          "name": "Mike Mangini",
          "slug": "mike-mangini",
          "band": "Dream Theater",
          "configString": "Sabian HHX & AAX Series (14\" HHX Evolution Hi-Hats, 17\", 18\", 19\" HHX Evolution Crashes, 21\" HHX Raw Bell Dry Ride)"
        },
        {
          "id": 59,
          "name": "Tim Yeung",
          "slug": "tim-yeung",
          "band": "Morbid Angel / Hate Eternal / Vital Remains",
          "configString": "Sabian AAX & HHX Series (14\" AAX Stage Hi-Hats, 18\" & 19\" AAX X-Plosion Crashes, 21\" HHX Raw Bell Dry Ride)"
        },
        {
          "id": 60,
          "name": "Kevin Talley",
          "slug": "kevin-talley",
          "band": "Dying Fetus / Misery Index / Six Feet Under",
          "configString": "Sabian AAX Series (14\" Stage Hi-Hats, 17\" & 18\" X-Plosion Crashes, 20\" Stage Ride)"
        },
        {
          "id": 63,
          "name": "Paul Bostaph",
          "slug": "paul-bostaph",
          "band": "Slayer",
          "configString": "Sabian AAX Series (14\" AAX Stage Hi-Hats, 17\" & 19\" AAX X-Plosion Crashes, 21\" AAX Stage Ride, 18\" AAXtreme China)"
        },
        {
          "id": 66,
          "name": "Adrian Erlandsson",
          "slug": "adrian-erlandsson",
          "band": "At the Gates",
          "configString": "Sabian AAX/HHX Series (15\" HHX Xcelerator Hi-Hats, 20\" AAX Iso Crash, 19\" AAX Paragon China)"
        },
        {
          "id": 67,
          "name": "Jon Dette",
          "slug": "jon-dette",
          "band": "Slayer",
          "configString": "Sabian AAX / Zildjian A Series (14\" Hi-Hats, 16\" & 18\" Crash, 20\" Ride, 18\" China)"
        }
      ]
    },
    {
      "brand": "Pearl",
      "count": 19,
      "percent": 28.4,
      "categories": [
        "kits",
        "snares",
        "pedals"
      ],
      "drummers": [
        {
          "id": 2,
          "name": "Joey Jordison",
          "slug": "joey-jordison",
          "band": "Slipknot",
          "configString": "Pearl Demon Drive Double Pedal"
        },
        {
          "id": 3,
          "name": "Gene Hoglan",
          "slug": "gene-hoglan",
          "band": "Death / Testament / Dethklok",
          "configString": "Pearl Demon Drive Double Pedal"
        },
        {
          "id": 6,
          "name": "George Kollias",
          "slug": "george-kollias",
          "band": "Nile",
          "configString": "Pearl Demon XR Double Pedal (Co-designed)"
        },
        {
          "id": 8,
          "name": "Ray Luzier",
          "slug": "ray-luzier",
          "band": "Korn",
          "configString": "Pearl Reference 14x6.5\" Brass"
        },
        {
          "id": 18,
          "name": "Matt Halpern",
          "slug": "matt-halpern",
          "band": "Periphery",
          "configString": "Pearl Demon Drive Double Pedal"
        },
        {
          "id": 19,
          "name": "Inferno",
          "slug": "inferno",
          "band": "Behemoth",
          "configString": "Pearl Reference 14x5\" Steel"
        },
        {
          "id": 25,
          "name": "Alex Bent",
          "slug": "alex-bent",
          "band": "ex-Trivium / Arkaik / Dragonlord",
          "configString": "Pearl Reference 14x5\" Brass"
        },
        {
          "id": 31,
          "name": "Nick Augusto",
          "slug": "nick-augusto",
          "band": "ex-Trivium",
          "configString": "Pearl Demon Drive Double Pedal"
        },
        {
          "id": 35,
          "name": "Flo Mounier",
          "slug": "flo-mounier",
          "band": "Cryptopsy",
          "configString": "Pearl Demon Drive Double Pedal"
        },
        {
          "id": 36,
          "name": "Ryan Van Poederooyen",
          "slug": "ryan-van-poederooyen",
          "band": "Devin Townsend Project",
          "configString": "Pearl Demon Drive Double Pedal"
        },
        {
          "id": 50,
          "name": "Aquiles Priester",
          "slug": "aquiles-priester",
          "band": "Angra / W.A.S.P.",
          "configString": "Pearl Demon Drive Double Pedal"
        },
        {
          "id": 51,
          "name": "Paul Mazurkiewicz",
          "slug": "paul-mazurkiewicz",
          "band": "Cannibal Corpse",
          "configString": "Pearl Demon Drive Double Pedal"
        },
        {
          "id": 52,
          "name": "Mike Mangini",
          "slug": "mike-mangini",
          "band": "Dream Theater",
          "configString": "Pearl Demon Drive Double Pedal"
        },
        {
          "id": 54,
          "name": "Daniel Erlandsson",
          "slug": "daniel-erlandsson",
          "band": "Arch Enemy",
          "configString": "Pearl Demon Drive Double Pedal"
        },
        {
          "id": 55,
          "name": "Jaska Raatikainen",
          "slug": "jaska-raatikainen",
          "band": "Children of Bodom",
          "configString": "Pearl Eliminator Double Pedal"
        },
        {
          "id": 57,
          "name": "Daray",
          "slug": "daray",
          "band": "Dimmu Borgir / Vader",
          "configString": "Pearl Demon XR Double Pedal"
        },
        {
          "id": 58,
          "name": "Jocke Wallgren",
          "slug": "jocke-wallgren",
          "band": "Amon Amarth",
          "configString": "Pearl Demon Drive Double Pedal"
        },
        {
          "id": 60,
          "name": "Kevin Talley",
          "slug": "kevin-talley",
          "band": "Dying Fetus / Misery Index / Six Feet Under",
          "configString": "Pearl Eliminator Double Pedal"
        },
        {
          "id": 63,
          "name": "Paul Bostaph",
          "slug": "paul-bostaph",
          "band": "Slayer",
          "configString": "Pearl Eliminator Double Pedal"
        }
      ]
    },
    {
      "brand": "Paiste",
      "count": 15,
      "percent": 22.4,
      "categories": [
        "cymbals"
      ],
      "drummers": [
        {
          "id": 2,
          "name": "Joey Jordison",
          "slug": "joey-jordison",
          "band": "Slipknot",
          "configString": "Paiste RUDE & 2002 Series (14\" Wild Hi-Hats, 16\", 17\", 18\", 19\" Power Crashes, 20\" & 22\" Wild Chinas, 22\" Power Ride)"
        },
        {
          "id": 4,
          "name": "Dave Lombardo",
          "slug": "dave-lombardo",
          "band": "Slayer",
          "configString": "Paiste RUDE & 2002 Series (15\" Sound Edge Hi-Hats, 18\" & 19\" Crashes, 22\" Reign Power Ride, 18\" China)"
        },
        {
          "id": 7,
          "name": "Eloy Casagrande",
          "slug": "eloy-casagrande",
          "band": "Slipknot",
          "configString": "Paiste (15\" Masters Dark Hi-Hats, 20\" Masters Dark Ride, 20\" & 20\" 602 Crashes, 10\" Rude Splash, 20\" Masters Dark Crash, 20\" 2002 Heavy Ride, 20\" 2002 Novo China, 10\" 2002 Mega Bell, Symphonic Gong)"
        },
        {
          "id": 12,
          "name": "Charlie Benante",
          "slug": "charlie-benante",
          "band": "Anthrax / S.O.D. / Pantera",
          "configString": "Paiste RUDE & 2002 Series (14\" Hi-Hats, 18\" & 19\" Crashes, 20\" Power Ride, 18\" China)"
        },
        {
          "id": 14,
          "name": "Danny Carey",
          "slug": "danny-carey",
          "band": "Tool",
          "configString": "Paiste Signature Series (15\" Sound Edge Hi-Hats, 18\" & 19\" Power Crashes, 22\" Dry Heavy Ride, 20\" & 22\" Chinas, various Rude crashes)"
        },
        {
          "id": 19,
          "name": "Inferno",
          "slug": "inferno",
          "band": "Behemoth",
          "configString": "Paiste RUDE Series (14\" Hi-Hats, 14\" Blast China, 18\" & 19\" Crashes, 24\" Mega Power Ride, 18\" China)"
        },
        {
          "id": 20,
          "name": "Hellhammer",
          "slug": "hellhammer",
          "band": "Mayhem",
          "configString": "Paiste (14\" RUDE Hi-Hats, 18\" & 19\" RUDE Crashes, 20\" RUDE Ride, 18\" RUDE China)"
        },
        {
          "id": 28,
          "name": "Morgan Ågren",
          "slug": "morgan-agren",
          "band": "Mats/Morgan Band / Kaipa / Fredrik Thordendal's Special Defects",
          "configString": "Paiste Signature & 2002 Series (14\" Signature Heavy Hi-Hats, 18\" & 20\" Signature Fast Crashes, 22\" Signature Dry Heavy Ride, 18\" 2002 China)"
        },
        {
          "id": 29,
          "name": "Igor Cavalera",
          "slug": "igor-cavalera",
          "band": "Sepultura / Cavalera Conspiracy / Soulwax",
          "configString": "Paiste RUDE & 2002 Series (14\" RUDE Hi-Hats, 18\" & 19\" RUDE Crashes, 22\" RUDE Power Ride, 18\" 2002 China)"
        },
        {
          "id": 30,
          "name": "Bill Ward",
          "slug": "bill-ward",
          "band": "Black Sabbath",
          "configString": "Paiste 2002 & Giant Beat Series (15\" Giant Beat Hi-Hats, 18\" & 20\" 2002 Crashes, 24\" 2002 Ride, 18\" 2002 China)"
        },
        {
          "id": 32,
          "name": "Matt Greiner",
          "slug": "matt-greiner",
          "band": "August Burns Red",
          "configString": "Paiste Formula 602 (14\" Hi-Hats, 16\"/17\"/18\" Crashes, 22\" Ride, 18\" China, 10\" Splash)"
        },
        {
          "id": 41,
          "name": "Nicko McBrain",
          "slug": "nicko-mcbrain",
          "band": "Iron Maiden",
          "configString": "Paiste 2002 & Signature Series (14\" Sound Edge Hi-Hats, 16\" & 18\" Power Crashes, 22\" Power Ride, 20\" China)"
        },
        {
          "id": 42,
          "name": "Scott Travis",
          "slug": "scott-travis",
          "band": "Judas Priest",
          "configString": "Paiste RUDE & 2002 Series (14\" RUDE Hi-Hats, 18\" & 19\" RUDE Crashes, 22\" RUDE Power Ride, 18\" RUDE China)"
        },
        {
          "id": 54,
          "name": "Daniel Erlandsson",
          "slug": "daniel-erlandsson",
          "band": "Arch Enemy",
          "configString": "Paiste RUDE & 2002 Series (14\" RUDE Hi-Hats, 18\" & 19\" RUDE Crashes, 22\" RUDE Power Ride)"
        },
        {
          "id": 57,
          "name": "Daray",
          "slug": "daray",
          "band": "Dimmu Borgir / Vader",
          "configString": "Paiste RUDE & 2002 Series (14\" RUDE Hi-Hats, 17\" & 18\" RUDE Crashes, 22\" RUDE Power Ride)"
        }
      ]
    },
    {
      "brand": "DW",
      "count": 14,
      "percent": 20.9,
      "categories": [
        "kits",
        "snares",
        "pedals"
      ],
      "drummers": [
        {
          "id": 8,
          "name": "Ray Luzier",
          "slug": "ray-luzier",
          "band": "Korn",
          "configString": "DW 9002 Double Pedal"
        },
        {
          "id": 10,
          "name": "Jay Weinberg",
          "slug": "jay-weinberg",
          "band": "Suicidal Tendencies",
          "configString": "DW 9000 Series Double Pedal"
        },
        {
          "id": 24,
          "name": "Navene Koperweis",
          "slug": "navene-koperweis",
          "band": "Entheos / ex-Animals as Leaders",
          "configString": "DW 9000 Series Double Pedal"
        },
        {
          "id": 26,
          "name": "Shannon Larkin",
          "slug": "shannon-larkin",
          "band": "Godsmack / Ugly Kid Joe / Amen",
          "configString": "DW 9000 Series Double Pedal"
        },
        {
          "id": 27,
          "name": "Raymond Herrera",
          "slug": "raymond-herrera",
          "band": "Fear Factory / Arkaea / Brujeria",
          "configString": "DW 5000 Series Double Pedal"
        },
        {
          "id": 32,
          "name": "Matt Greiner",
          "slug": "matt-greiner",
          "band": "August Burns Red",
          "configString": "DW 9000 Series Double Pedal"
        },
        {
          "id": 39,
          "name": "Travis Orbin",
          "slug": "travis-orbin",
          "band": "Darkest Hour / ex-Periphery",
          "configString": "DW 9000 Series Double Pedal"
        },
        {
          "id": 42,
          "name": "Scott Travis",
          "slug": "scott-travis",
          "band": "Judas Priest",
          "configString": "DW 9000 Series Double Pedal"
        },
        {
          "id": 48,
          "name": "Abe Cunningham",
          "slug": "abe-cunningham",
          "band": "Deftones",
          "configString": "DW 9000 Series Double Pedal"
        },
        {
          "id": 56,
          "name": "Hannes Grossmann",
          "slug": "hannes-grossmann",
          "band": "Obscura / ex-Necrophagist / Alkaloid",
          "configString": "DW 9000 Series Double Pedal"
        },
        {
          "id": 61,
          "name": "Isaac Lamb",
          "slug": "isaac-lamb",
          "band": "Kublai Khan TX",
          "configString": "DW 9000 Series Double Pedal"
        },
        {
          "id": 64,
          "name": "Sean Reinert",
          "slug": "sean-reinert",
          "band": "Death / Cynic",
          "configString": "DW 5000 Double Pedal"
        },
        {
          "id": 65,
          "name": "Nick Menza",
          "slug": "nick-menza",
          "band": "Megadeth",
          "configString": "DW 5000 Double Pedal"
        },
        {
          "id": 67,
          "name": "Jon Dette",
          "slug": "jon-dette",
          "band": "Slayer",
          "configString": "DW 9000 or Tama Iron Cobra Double Pedal"
        }
      ]
    },
    {
      "brand": "Promark",
      "count": 12,
      "percent": 17.9,
      "categories": [
        "sticks"
      ],
      "drummers": [
        {
          "id": 2,
          "name": "Joey Jordison",
          "slug": "joey-jordison",
          "band": "Slipknot",
          "configString": "Promark Joey Jordison Signature TX515W"
        },
        {
          "id": 3,
          "name": "Gene Hoglan",
          "slug": "gene-hoglan",
          "band": "Death / Testament / Dethklok",
          "configString": "Promark Classic Forward 2B"
        },
        {
          "id": 4,
          "name": "Dave Lombardo",
          "slug": "dave-lombardo",
          "band": "Slayer",
          "configString": "Promark Dave Lombardo Signature 2Bx"
        },
        {
          "id": 7,
          "name": "Eloy Casagrande",
          "slug": "eloy-casagrande",
          "band": "Slipknot",
          "configString": "Promark Eloy Casagrande Signature"
        },
        {
          "id": 13,
          "name": "Mike Portnoy",
          "slug": "mike-portnoy",
          "band": "Dream Theater / Liquid Tension Experiment / The Winery Dogs",
          "configString": "Promark Mike Portnoy Signature TX420N"
        },
        {
          "id": 17,
          "name": "Chris Adler",
          "slug": "chris-adler",
          "band": "Lamb of God",
          "configString": "Promark TX5AXW Chris Adler Signature"
        },
        {
          "id": 18,
          "name": "Matt Halpern",
          "slug": "matt-halpern",
          "band": "Periphery",
          "configString": "Promark Matt Halpern Signature"
        },
        {
          "id": 21,
          "name": "Pete Sandoval",
          "slug": "pete-sandoval",
          "band": "Morbid Angel",
          "configString": "Pro-Mark (historical endorsement — current sticks unverified)"
        },
        {
          "id": 27,
          "name": "Raymond Herrera",
          "slug": "raymond-herrera",
          "band": "Fear Factory / Arkaea / Brujeria",
          "configString": "Pro-Mark 5A Oak Nylon Tip"
        },
        {
          "id": 37,
          "name": "Jason Bittner",
          "slug": "jason-bittner",
          "band": "Shadows Fall / Overkill / Category 7",
          "configString": "Promark Jason Bittner Signature 5BX"
        },
        {
          "id": 50,
          "name": "Aquiles Priester",
          "slug": "aquiles-priester",
          "band": "Angra / W.A.S.P.",
          "configString": "Promark TX419W Aquiles Priester Autograph"
        },
        {
          "id": 67,
          "name": "Jon Dette",
          "slug": "jon-dette",
          "band": "Slayer",
          "configString": "Promark / Vater 5B"
        }
      ]
    },
    {
      "brand": "Meinl",
      "count": 10,
      "percent": 14.9,
      "categories": [
        "cymbals"
      ],
      "drummers": [
        {
          "id": 16,
          "name": "Brann Dailor",
          "slug": "brann-dailor",
          "band": "Mastodon",
          "configString": "Meinl Byzance Series (14\" Dark Hi-Hats, 18\" & 19\" Brilliant Heavy Hammered Crashes, 21\" Ghost Ride, 18\" Extra Dry China)"
        },
        {
          "id": 17,
          "name": "Chris Adler",
          "slug": "chris-adler",
          "band": "Lamb of God",
          "configString": "Meinl Byzance Series (14\" Dark Hi-Hats, 18\" & 19\" Dark Crashes, 21\" Transition Ride, 18\" Extra Dry China)"
        },
        {
          "id": 18,
          "name": "Matt Halpern",
          "slug": "matt-halpern",
          "band": "Periphery",
          "configString": "Meinl Byzance Series (15\" Dark Hi-Hats, 18\" & 20\" Extra Dry Medium Crashes, 22\" Transition Ride, 18\" Extra Dry China)"
        },
        {
          "id": 24,
          "name": "Navene Koperweis",
          "slug": "navene-koperweis",
          "band": "Entheos / ex-Animals as Leaders",
          "configString": "Meinl Byzance Series (15\" Dual Hi-Hats, 18\" & 19\" Extra Dry Medium Crashes, 21\" Transition Ride, 18\" Extra Dry China, 10\" Splash)"
        },
        {
          "id": 40,
          "name": "Chris Turner",
          "slug": "chris-turner",
          "band": "Oceans Ate Alaska",
          "configString": "Meinl Byzance Series (15\" Dual Hi-Hats, 18\" & 20\" Extra Dry Medium Crashes, 22\" Dual Ride, 18\" Extra Dry China)"
        },
        {
          "id": 44,
          "name": "Derek Roddy",
          "slug": "derek-roddy",
          "band": "Hate Eternal / Nile",
          "configString": "Meinl Byzance & Mb20 Series (14\" Byzance Heavy Hi-Hats, 18\" & 19\" Mb20 Heavy Crashes, 21\" Mb20 Heavy Ride, 18\" Byzance China)"
        },
        {
          "id": 53,
          "name": "Matt Garstka",
          "slug": "matt-garstka",
          "band": "Animals as Leaders",
          "configString": "Meinl Byzance Series (15\" Dual Hi-Hats, 18\" & 20\" Extra Dry Medium Crashes, 22\" Dual Ride)"
        },
        {
          "id": 56,
          "name": "Hannes Grossmann",
          "slug": "hannes-grossmann",
          "band": "Obscura / ex-Necrophagist / Alkaloid",
          "configString": "Meinl Byzance Series (14\" Byzance Traditional Hi-Hats, 18\" & 19\" Byzance Brilliant Crashes, 21\" Byzance Traditional Ride)"
        },
        {
          "id": 61,
          "name": "Isaac Lamb",
          "slug": "isaac-lamb",
          "band": "Kublai Khan TX",
          "configString": "Meinl Classics Custom Dark Series (14\" Hi-Hats, 18\" & 20\" Crashes, 21\" Ride, 18\" China)"
        },
        {
          "id": 62,
          "name": "Martin Axenrot",
          "slug": "martin-axenrot",
          "band": "Opeth",
          "configString": "Meinl Byzance Series (14\" Traditional Medium Hi-Hats, 16\" & 18\" & 19\" Crashes, 22\" Traditional Ride, 18\" China)"
        }
      ]
    },
    {
      "brand": "Sonor",
      "count": 8,
      "percent": 11.9,
      "categories": [
        "kits",
        "snares",
        "pedals"
      ],
      "drummers": [
        {
          "id": 5,
          "name": "Tomas Haake",
          "slug": "tomas-haake",
          "band": "Meshuggah",
          "configString": "Sonor Tomas Haake Signature 14x6.5\" & Artist Series Bronze"
        },
        {
          "id": 14,
          "name": "Danny Carey",
          "slug": "danny-carey",
          "band": "Tool",
          "configString": "Sonor Giant Step Twin Effect Double Pedal"
        },
        {
          "id": 20,
          "name": "Hellhammer",
          "slug": "hellhammer",
          "band": "Mayhem",
          "configString": "Sonor SQ2 14x5.5\" Maple"
        },
        {
          "id": 28,
          "name": "Morgan Ågren",
          "slug": "morgan-agren",
          "band": "Mats/Morgan Band / Kaipa / Fredrik Thordendal's Special Defects",
          "configString": "Sonor Giant Step Double Pedal"
        },
        {
          "id": 41,
          "name": "Nicko McBrain",
          "slug": "nicko-mcbrain",
          "band": "Iron Maiden",
          "configString": "Sonor Nicko McBrain Signature 14x6.5\""
        },
        {
          "id": 46,
          "name": "Frost",
          "slug": "frost",
          "band": "Satyricon / 1349",
          "configString": "Sonor Perfect Balance Pedal"
        },
        {
          "id": 47,
          "name": "Gavin Harrison",
          "slug": "gavin-harrison",
          "band": "Porcupine Tree / King Crimson",
          "configString": "Sonor Perfect Balance Pedal"
        },
        {
          "id": 62,
          "name": "Martin Axenrot",
          "slug": "martin-axenrot",
          "band": "Opeth",
          "configString": "Sonor SQ2 14x5.75\" Maple"
        }
      ]
    },
    {
      "brand": "Vater",
      "count": 6,
      "percent": 9,
      "categories": [
        "sticks"
      ],
      "drummers": [
        {
          "id": 10,
          "name": "Jay Weinberg",
          "slug": "jay-weinberg",
          "band": "Suicidal Tendencies",
          "configString": "Vater Jay Weinberg 908 Signature"
        },
        {
          "id": 16,
          "name": "Brann Dailor",
          "slug": "brann-dailor",
          "band": "Mastodon",
          "configString": "Vater 5B"
        },
        {
          "id": 44,
          "name": "Derek Roddy",
          "slug": "derek-roddy",
          "band": "Hate Eternal / Nile",
          "configString": "Vater Player's Design Derek Roddy Model (VHDRW)"
        },
        {
          "id": 52,
          "name": "Mike Mangini",
          "slug": "mike-mangini",
          "band": "Dream Theater",
          "configString": "Vater Mike Mangini Wicked Piston (VHMMWP)"
        },
        {
          "id": 63,
          "name": "Paul Bostaph",
          "slug": "paul-bostaph",
          "band": "Slayer",
          "configString": "Vater Power 5B"
        },
        {
          "id": 67,
          "name": "Jon Dette",
          "slug": "jon-dette",
          "band": "Slayer",
          "configString": "Promark / Vater 5B"
        }
      ]
    },
    {
      "brand": "ddrum",
      "count": 4,
      "percent": 6,
      "categories": [
        "kits",
        "snares",
        "pedals"
      ],
      "drummers": [
        {
          "id": 11,
          "name": "Vinnie Paul",
          "slug": "vinnie-paul",
          "band": "Pantera / Damageplan / Hellyeah",
          "configString": "ddrum Double Pedal"
        },
        {
          "id": 21,
          "name": "Pete Sandoval",
          "slug": "pete-sandoval",
          "band": "Morbid Angel",
          "configString": "ddrum Mercury Double Pedal"
        },
        {
          "id": 26,
          "name": "Shannon Larkin",
          "slug": "shannon-larkin",
          "band": "Godsmack / Ugly Kid Joe / Amen",
          "configString": "ddrum Dios 14x6.5\" Maple"
        },
        {
          "id": 42,
          "name": "Scott Travis",
          "slug": "scott-travis",
          "band": "Judas Priest",
          "configString": "ddrum Scott Travis Signature 14x6.5\""
        }
      ]
    },
    {
      "brand": "Mapex",
      "count": 4,
      "percent": 6,
      "categories": [
        "kits",
        "snares",
        "pedals"
      ],
      "drummers": [
        {
          "id": 17,
          "name": "Chris Adler",
          "slug": "chris-adler",
          "band": "Lamb of God",
          "configString": "Mapex Falcon Double Pedal"
        },
        {
          "id": 23,
          "name": "Arin Ilejay",
          "slug": "arin-ilejay",
          "band": "ex-Avenged Sevenfold",
          "configString": "Mapex Falcon Double Pedal"
        },
        {
          "id": 32,
          "name": "Matt Greiner",
          "slug": "matt-greiner",
          "band": "August Burns Red",
          "configString": "Mapex Black Panther 14x5.5\" Maple"
        },
        {
          "id": 37,
          "name": "Jason Bittner",
          "slug": "jason-bittner",
          "band": "Shadows Fall / Overkill / Category 7",
          "configString": "Mapex Falcon Double Pedal"
        }
      ]
    },
    {
      "brand": "SJC",
      "count": 4,
      "percent": 6,
      "categories": [
        "kits",
        "snares"
      ],
      "drummers": [
        {
          "id": 10,
          "name": "Jay Weinberg",
          "slug": "jay-weinberg",
          "band": "Suicidal Tendencies",
          "configString": "SJC Jay Weinberg \"The Crucible\" 14x6.5\" 48-ply Brass"
        },
        {
          "id": 39,
          "name": "Travis Orbin",
          "slug": "travis-orbin",
          "band": "Darkest Hour / ex-Periphery",
          "configString": "SJC Custom 14x6.5\" Maple"
        },
        {
          "id": 48,
          "name": "Abe Cunningham",
          "slug": "abe-cunningham",
          "band": "Deftones",
          "configString": "SJC Custom 14x6.5\" Brass"
        },
        {
          "id": 61,
          "name": "Isaac Lamb",
          "slug": "isaac-lamb",
          "band": "Kublai Khan TX",
          "configString": "SJC Custom 14x6.5\""
        }
      ]
    },
    {
      "brand": "Axis",
      "count": 3,
      "percent": 4.5,
      "categories": [
        "pedals"
      ],
      "drummers": [
        {
          "id": 20,
          "name": "Hellhammer",
          "slug": "hellhammer",
          "band": "Mayhem",
          "configString": "Axis Double Pedal"
        },
        {
          "id": 25,
          "name": "Alex Bent",
          "slug": "alex-bent",
          "band": "ex-Trivium / Arkaik / Dragonlord",
          "configString": "Axis A Longboard Double Pedal"
        },
        {
          "id": 38,
          "name": "Martin Lopez",
          "slug": "martin-lopez",
          "band": "Soen / ex-Opeth",
          "configString": "Axis Percussion Double Pedal"
        }
      ]
    },
    {
      "brand": "Ludwig",
      "count": 3,
      "percent": 4.5,
      "categories": [
        "kits",
        "snares",
        "pedals"
      ],
      "drummers": [
        {
          "id": 22,
          "name": "Art Cruz",
          "slug": "art-cruz",
          "band": "Lamb of God",
          "configString": "Ludwig 14x6.5\" Black Beauty"
        },
        {
          "id": 30,
          "name": "Bill Ward",
          "slug": "bill-ward",
          "band": "Black Sabbath",
          "configString": "Ludwig Atlas Pro Double Pedal"
        },
        {
          "id": 67,
          "name": "Jon Dette",
          "slug": "jon-dette",
          "band": "Slayer",
          "configString": "Ludwig Classic Maple"
        }
      ]
    },
    {
      "brand": "Czarcie Kopyto",
      "count": 2,
      "percent": 3,
      "categories": [
        "pedals"
      ],
      "drummers": [
        {
          "id": 19,
          "name": "Inferno",
          "slug": "inferno",
          "band": "Behemoth",
          "configString": "Czarcie Kopyto (Devil's Hoof) Double Pedal"
        },
        {
          "id": 66,
          "name": "Adrian Erlandsson",
          "slug": "adrian-erlandsson",
          "band": "At the Gates",
          "configString": "Monolit Czarcie Kopyto Double Pedal"
        }
      ]
    },
    {
      "brand": "Wincent",
      "count": 2,
      "percent": 3,
      "categories": [
        "sticks"
      ],
      "drummers": [
        {
          "id": 5,
          "name": "Tomas Haake",
          "slug": "tomas-haake",
          "band": "Meshuggah",
          "configString": "Wincent Tomas Haake Signature"
        },
        {
          "id": 43,
          "name": "Mikkey Dee",
          "slug": "mikkey-dee",
          "band": "Scorpions / Motörhead",
          "configString": "Wincent Mikkey Dee Signature (W-MDS)"
        }
      ]
    },
    {
      "brand": "Ahead",
      "count": 1,
      "percent": 1.5,
      "categories": [
        "sticks"
      ],
      "drummers": [
        {
          "id": 1,
          "name": "Lars Ulrich",
          "slug": "lars-ulrich",
          "band": "Metallica",
          "configString": "Ahead Lars Ulrich Signature Drumsticks"
        }
      ]
    },
    {
      "brand": "Gibraltar",
      "count": 1,
      "percent": 1.5,
      "categories": [
        "pedals"
      ],
      "drummers": [
        {
          "id": 9,
          "name": "John Otto",
          "slug": "john-otto",
          "band": "Limp Bizkit",
          "configString": "Gibraltar G Class Bass Drum Pedals"
        }
      ]
    },
    {
      "brand": "Noble & Cooley",
      "count": 1,
      "percent": 1.5,
      "categories": [
        "kits",
        "snares"
      ],
      "drummers": [
        {
          "id": 38,
          "name": "Martin Lopez",
          "slug": "martin-lopez",
          "band": "Soen / ex-Opeth",
          "configString": "Noble & Cooley Solid Shell 14x6\" Maple"
        }
      ]
    },
    {
      "brand": "OCDP",
      "count": 1,
      "percent": 1.5,
      "categories": [
        "kits",
        "snares"
      ],
      "drummers": [
        {
          "id": 9,
          "name": "John Otto",
          "slug": "john-otto",
          "band": "Limp Bizkit",
          "configString": "OCDP 14x6.5\" 40-ply Vented, OCDP 10x6\" 20-ply"
        }
      ]
    },
    {
      "brand": "Trick",
      "count": 1,
      "percent": 1.5,
      "categories": [
        "pedals"
      ],
      "drummers": [
        {
          "id": 22,
          "name": "Art Cruz",
          "slug": "art-cruz",
          "band": "Lamb of God",
          "configString": "Trick Pro 1-V Double Pedal"
        }
      ]
    },
    {
      "brand": "Yamaha",
      "count": 1,
      "percent": 1.5,
      "categories": [
        "kits",
        "snares",
        "pedals"
      ],
      "drummers": [
        {
          "id": 43,
          "name": "Mikkey Dee",
          "slug": "mikkey-dee",
          "band": "Scorpions / Motörhead",
          "configString": "Yamaha FP9 Double Pedal"
        }
      ]
    }
  ],
  "signatureModels": {
    "sticks": {
      "signature": {
        "totalModels": 30,
        "endorsedModelCount": 25,
        "byBrand": [
          {
            "brand": "Vic Firth",
            "modelCount": 9,
            "drummers": [
              {
                "id": 6,
                "name": "George Kollias",
                "slug": "george-kollias",
                "band": "Nile",
                "genre": "Technical Death Metal"
              },
              {
                "id": 12,
                "name": "Charlie Benante",
                "slug": "charlie-benante",
                "band": "Anthrax / S.O.D. / Pantera",
                "genre": "Thrash Metal"
              },
              {
                "id": 14,
                "name": "Danny Carey",
                "slug": "danny-carey",
                "band": "Tool",
                "genre": "Progressive Metal"
              },
              {
                "id": 32,
                "name": "Matt Greiner",
                "slug": "matt-greiner",
                "band": "August Burns Red",
                "genre": "Metalcore / Christian Metal"
              },
              {
                "id": 41,
                "name": "Nicko McBrain",
                "slug": "nicko-mcbrain",
                "band": "Iron Maiden",
                "genre": "Heavy Metal / NWOBHM"
              },
              {
                "id": 11,
                "name": "Vinnie Paul",
                "slug": "vinnie-paul",
                "band": "Pantera / Damageplan / Hellyeah",
                "genre": "Groove Metal / Heavy Metal"
              },
              {
                "id": 53,
                "name": "Matt Garstka",
                "slug": "matt-garstka",
                "band": "Animals as Leaders",
                "genre": "Progressive Metal / Djent"
              },
              {
                "id": 8,
                "name": "Ray Luzier",
                "slug": "ray-luzier",
                "band": "Korn",
                "genre": "Nu Metal"
              },
              {
                "id": 47,
                "name": "Gavin Harrison",
                "slug": "gavin-harrison",
                "band": "Porcupine Tree / King Crimson",
                "genre": "Progressive Metal / Progressive Rock"
              }
            ]
          },
          {
            "brand": "ProMark",
            "modelCount": 8,
            "drummers": [
              {
                "id": 4,
                "name": "Dave Lombardo",
                "slug": "dave-lombardo",
                "band": "Slayer",
                "genre": "Thrash Metal"
              },
              {
                "id": 7,
                "name": "Eloy Casagrande",
                "slug": "eloy-casagrande",
                "band": "Slipknot",
                "genre": "Nu Metal / Thrash Metal"
              },
              {
                "id": 13,
                "name": "Mike Portnoy",
                "slug": "mike-portnoy",
                "band": "Dream Theater / Liquid Tension Experiment / The Winery Dogs",
                "genre": "Progressive Metal"
              },
              {
                "id": 17,
                "name": "Chris Adler",
                "slug": "chris-adler",
                "band": "Lamb of God",
                "genre": "Groove Metal"
              },
              {
                "id": 18,
                "name": "Matt Halpern",
                "slug": "matt-halpern",
                "band": "Periphery",
                "genre": "Progressive/Djent"
              },
              {
                "id": 2,
                "name": "Joey Jordison",
                "slug": "joey-jordison",
                "band": "Slipknot",
                "genre": "Nu Metal / Death Metal"
              },
              {
                "id": 50,
                "name": "Aquiles Priester",
                "slug": "aquiles-priester",
                "band": "Angra / W.A.S.P.",
                "genre": "Power Metal / Heavy Metal"
              },
              {
                "id": 37,
                "name": "Jason Bittner",
                "slug": "jason-bittner",
                "band": "Shadows Fall / Overkill / Category 7",
                "genre": "Thrash Metal / Heavy Metal"
              }
            ]
          },
          {
            "brand": "Vater",
            "modelCount": 3,
            "drummers": [
              {
                "id": 10,
                "name": "Jay Weinberg",
                "slug": "jay-weinberg",
                "band": "Suicidal Tendencies",
                "genre": "Hardcore / Thrash Crossover"
              },
              {
                "id": 52,
                "name": "Mike Mangini",
                "slug": "mike-mangini",
                "band": "Dream Theater",
                "genre": "Progressive Metal"
              },
              {
                "id": 44,
                "name": "Derek Roddy",
                "slug": "derek-roddy",
                "band": "Hate Eternal / Nile",
                "genre": "Death Metal / Technical Death Metal"
              }
            ]
          },
          {
            "brand": "Tama",
            "modelCount": 2,
            "drummers": [
              {
                "id": 15,
                "name": "Mario Duplantier",
                "slug": "mario-duplantier",
                "band": "Gojira",
                "genre": "Progressive Death Metal"
              },
              {
                "id": 45,
                "name": "Dirk Verbeuren",
                "slug": "dirk-verbeuren",
                "band": "Megadeth",
                "genre": "Thrash Metal / Melodic Death Metal"
              }
            ]
          },
          {
            "brand": "Wincent",
            "modelCount": 2,
            "drummers": [
              {
                "id": 5,
                "name": "Tomas Haake",
                "slug": "tomas-haake",
                "band": "Meshuggah",
                "genre": "Progressive Metal / Djent"
              },
              {
                "id": 43,
                "name": "Mikkey Dee",
                "slug": "mikkey-dee",
                "band": "Scorpions / Motörhead",
                "genre": "Heavy Metal / Hard Rock"
              }
            ]
          },
          {
            "brand": "Ahead",
            "modelCount": 1,
            "drummers": [
              {
                "id": 1,
                "name": "Lars Ulrich",
                "slug": "lars-ulrich",
                "band": "Metallica",
                "genre": "Thrash Metal"
              }
            ]
          }
        ]
      },
      "artistEndorsement": {
        "totalModels": 30,
        "endorsedModelCount": 5,
        "byBrand": [
          {
            "brand": "Vic Firth",
            "modelCount": 3,
            "drummers": [
              {
                "id": 19,
                "name": "Inferno",
                "slug": "inferno",
                "band": "Behemoth",
                "genre": "Black/Death Metal"
              },
              {
                "id": 25,
                "name": "Alex Bent",
                "slug": "alex-bent",
                "band": "ex-Trivium / Arkaik / Dragonlord",
                "genre": "Heavy Metal / Thrash Metal / Technical Death Metal"
              },
              {
                "id": 66,
                "name": "Adrian Erlandsson",
                "slug": "adrian-erlandsson",
                "band": "At the Gates",
                "genre": "Melodic Death Metal"
              }
            ]
          },
          {
            "brand": "ProMark",
            "modelCount": 1,
            "drummers": [
              {
                "id": 3,
                "name": "Gene Hoglan",
                "slug": "gene-hoglan",
                "band": "Death / Testament / Dethklok",
                "genre": "Death Metal / Thrash Metal"
              }
            ]
          },
          {
            "brand": "Vater",
            "modelCount": 1,
            "drummers": [
              {
                "id": 16,
                "name": "Brann Dailor",
                "slug": "brann-dailor",
                "band": "Mastodon",
                "genre": "Progressive/Sludge Metal"
              }
            ]
          }
        ]
      }
    },
    "snares": {
      "signature": {
        "totalModels": 56,
        "endorsedModelCount": 10,
        "byBrand": [
          {
            "brand": "Pearl",
            "modelCount": 3,
            "drummers": [
              {
                "id": 2,
                "name": "Joey Jordison",
                "slug": "joey-jordison",
                "band": "Slipknot",
                "genre": "Nu Metal / Death Metal"
              },
              {
                "id": 6,
                "name": "George Kollias",
                "slug": "george-kollias",
                "band": "Nile",
                "genre": "Technical Death Metal"
              },
              {
                "id": 54,
                "name": "Daniel Erlandsson",
                "slug": "daniel-erlandsson",
                "band": "Arch Enemy",
                "genre": "Melodic Death Metal"
              }
            ]
          },
          {
            "brand": "Sonor",
            "modelCount": 3,
            "drummers": [
              {
                "id": 5,
                "name": "Tomas Haake",
                "slug": "tomas-haake",
                "band": "Meshuggah",
                "genre": "Progressive Metal / Djent"
              },
              {
                "id": 41,
                "name": "Nicko McBrain",
                "slug": "nicko-mcbrain",
                "band": "Iron Maiden",
                "genre": "Heavy Metal / NWOBHM"
              },
              {
                "id": 47,
                "name": "Gavin Harrison",
                "slug": "gavin-harrison",
                "band": "Porcupine Tree / King Crimson",
                "genre": "Progressive Metal / Progressive Rock"
              }
            ]
          },
          {
            "brand": "ddrum",
            "modelCount": 1,
            "drummers": [
              {
                "id": 42,
                "name": "Scott Travis",
                "slug": "scott-travis",
                "band": "Judas Priest",
                "genre": "Heavy Metal / Thrash Metal"
              }
            ]
          },
          {
            "brand": "Mapex",
            "modelCount": 1,
            "drummers": [
              {
                "id": 17,
                "name": "Chris Adler",
                "slug": "chris-adler",
                "band": "Lamb of God",
                "genre": "Groove Metal"
              }
            ]
          },
          {
            "brand": "Tama",
            "modelCount": 1,
            "drummers": [
              {
                "id": 1,
                "name": "Lars Ulrich",
                "slug": "lars-ulrich",
                "band": "Metallica",
                "genre": "Thrash Metal"
              }
            ]
          },
          {
            "brand": "Yamaha",
            "modelCount": 1,
            "drummers": [
              {
                "id": 43,
                "name": "Mikkey Dee",
                "slug": "mikkey-dee",
                "band": "Scorpions / Motörhead",
                "genre": "Heavy Metal / Hard Rock"
              }
            ]
          }
        ]
      }
    },
    "cymbalsCaveat": "cymbalSetups.js tracks cymbal line/series per piece but not a per-drummer signature-model flag the way drumsticks.js and snares.js do, so cymbal signature-model counts are not included here — see brandReach above for cymbal brand usage."
  },
  "genreBrandMatrix": {
    "bucketMinDrummers": 2,
    "buckets": [
      {
        "genre": "Progressive Metal",
        "totalDrummers": 11,
        "topBrand": "Sonor",
        "topBrandCount": 4,
        "brands": [
          {
            "brand": "Sonor",
            "count": 4
          },
          {
            "brand": "Tama",
            "count": 3
          },
          {
            "brand": "Pearl",
            "count": 2
          },
          {
            "brand": "DW",
            "count": 1
          },
          {
            "brand": "Noble & Cooley",
            "count": 1
          }
        ]
      },
      {
        "genre": "Thrash Metal",
        "totalDrummers": 10,
        "topBrand": "Tama",
        "topBrandCount": 6,
        "brands": [
          {
            "brand": "Tama",
            "count": 6
          },
          {
            "brand": "Ludwig",
            "count": 1
          },
          {
            "brand": "Mapex",
            "count": 1
          },
          {
            "brand": "Pearl",
            "count": 1
          },
          {
            "brand": "SJC",
            "count": 1
          }
        ]
      },
      {
        "genre": "Death Metal",
        "totalDrummers": 6,
        "topBrand": "Tama",
        "topBrandCount": 3,
        "brands": [
          {
            "brand": "Tama",
            "count": 3
          },
          {
            "brand": "Pearl",
            "count": 2
          },
          {
            "brand": "ddrum",
            "count": 1
          }
        ]
      },
      {
        "genre": "Heavy Metal",
        "totalDrummers": 6,
        "topBrand": "ddrum",
        "topBrandCount": 1,
        "brands": [
          {
            "brand": "ddrum",
            "count": 1
          },
          {
            "brand": "Ludwig",
            "count": 1
          },
          {
            "brand": "Mapex",
            "count": 1
          },
          {
            "brand": "Pearl",
            "count": 1
          },
          {
            "brand": "Sonor",
            "count": 1
          },
          {
            "brand": "Yamaha",
            "count": 1
          }
        ]
      },
      {
        "genre": "Melodic Death Metal",
        "totalDrummers": 4,
        "topBrand": "Pearl",
        "topBrandCount": 3,
        "brands": [
          {
            "brand": "Pearl",
            "count": 3
          },
          {
            "brand": "Tama",
            "count": 1
          }
        ]
      },
      {
        "genre": "Metalcore",
        "totalDrummers": 4,
        "topBrand": "Mapex",
        "topBrandCount": 1,
        "brands": [
          {
            "brand": "Mapex",
            "count": 1
          },
          {
            "brand": "Pearl",
            "count": 1
          },
          {
            "brand": "SJC",
            "count": 1
          },
          {
            "brand": "Tama",
            "count": 1
          }
        ]
      },
      {
        "genre": "Nu Metal",
        "totalDrummers": 4,
        "topBrand": "Pearl",
        "topBrandCount": 2,
        "brands": [
          {
            "brand": "Pearl",
            "count": 2
          },
          {
            "brand": "OCDP",
            "count": 1
          },
          {
            "brand": "Tama",
            "count": 1
          }
        ]
      },
      {
        "genre": "Black Metal",
        "totalDrummers": 3,
        "topBrand": "Sonor",
        "topBrandCount": 2,
        "brands": [
          {
            "brand": "Sonor",
            "count": 2
          },
          {
            "brand": "Pearl",
            "count": 1
          }
        ]
      },
      {
        "genre": "Groove Metal",
        "totalDrummers": 3,
        "topBrand": "ddrum",
        "topBrandCount": 1,
        "brands": [
          {
            "brand": "ddrum",
            "count": 1
          },
          {
            "brand": "Ludwig",
            "count": 1
          },
          {
            "brand": "Mapex",
            "count": 1
          }
        ]
      },
      {
        "genre": "Technical Death Metal",
        "totalDrummers": 3,
        "topBrand": "Pearl",
        "topBrandCount": 2,
        "brands": [
          {
            "brand": "Pearl",
            "count": 2
          },
          {
            "brand": "DW",
            "count": 1
          }
        ]
      },
      {
        "genre": "Progressive",
        "totalDrummers": 2,
        "topBrand": "Pearl",
        "topBrandCount": 1,
        "brands": [
          {
            "brand": "Pearl",
            "count": 1
          },
          {
            "brand": "Tama",
            "count": 1
          }
        ]
      },
      {
        "genre": "Progressive Death Metal",
        "totalDrummers": 2,
        "topBrand": "Tama",
        "topBrandCount": 2,
        "brands": [
          {
            "brand": "Tama",
            "count": 2
          }
        ]
      }
    ],
    "otherGenreDrummerCount": 9
  }
};

export default DRUM_ENDORSEMENT_LANDSCAPE;
