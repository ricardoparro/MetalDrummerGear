/**
 * Most-Used Gear Brands study — brand-frequency counts across the current
 * 72-drummer roster, split by kits/snares/cymbals/sticks/pedals.
 *
 * GENERATED FILE — do not edit by hand.
 * Regenerate with: node scripts/compute-studies.cjs
 *
 * Source of truth: api/drummers/index.js (current gear fields only — gearTimeline
 * historical entries are intentionally excluded, same convention as
 * scripts/build-gear-index.cjs). Dataset snapshot date: 2026-07-25.
 *
 * Methodology: a drummer counts once per brand per category (a dual-brand cymbal
 * setup like "Sabian / Zildjian" credits both). Percentages are of the full
 * 72-drummer roster, so a category's percentages can sum past 100%
 * when multi-brand setups are common (see "pedals", parsed only from hardware-field
 * segments that mention "pedal", to avoid crediting throne/rack brands).
 *
 * Consumed by: /studies/most-used-gear-brands-metal (packages/frontend/pages) and
 * the bot-facing SSR handler (api/meta/[...path].js).
 */

export const MOST_USED_GEAR_BRANDS = {
  "generatedAt": "2026-07-25",
  "totalDrummers": 72,
  "categories": {
    "kits": {
      "label": "Drum Kits",
      "ranked": [
        {
          "brand": "Tama",
          "count": 21,
          "percent": 29.2,
          "drummers": [
            {
              "id": 1,
              "name": "Lars Ulrich",
              "slug": "lars-ulrich",
              "band": "Metallica",
              "configString": "Tama Starclassic Maple"
            },
            {
              "id": 4,
              "name": "Dave Lombardo",
              "slug": "dave-lombardo",
              "band": "Slayer",
              "configString": "Tama Starclassic Walnut/Birch"
            },
            {
              "id": 7,
              "name": "Eloy Casagrande",
              "slug": "eloy-casagrande",
              "band": "Slipknot",
              "configString": "Tama Starclassic Bubinga (22\"x16\" & 24\"x14\" Bass Drums, 10\", 12\", 13\" Toms, 16\" & 18\" Floor Toms)"
            },
            {
              "id": 12,
              "name": "Charlie Benante",
              "slug": "charlie-benante",
              "band": "Anthrax / S.O.D. / Pantera",
              "configString": "Tama Starclassic"
            },
            {
              "id": 13,
              "name": "Mike Portnoy",
              "slug": "mike-portnoy",
              "band": "Dream Theater / Liquid Tension Experiment / The Winery Dogs",
              "configString": "Tama Starclassic Maple + Starclassic Bubinga (\"Dream Monster\" dual kit)"
            },
            {
              "id": 15,
              "name": "Mario Duplantier",
              "slug": "mario-duplantier",
              "band": "Gojira",
              "configString": "Tama Starclassic Bubinga (22\"x18\" Bass Drums x2, 12\"x9\" & 13\"x10\" Toms, 16\"x16\" Floor Tom)"
            },
            {
              "id": 16,
              "name": "Brann Dailor",
              "slug": "brann-dailor",
              "band": "Mastodon",
              "configString": "Tama Starclassic Performer B/B"
            },
            {
              "id": 25,
              "name": "Alex Bent",
              "slug": "alex-bent",
              "band": "ex-Trivium / Arkaik / Dragonlord",
              "configString": "Tama Starclassic Maple"
            },
            {
              "id": 27,
              "name": "Raymond Herrera",
              "slug": "raymond-herrera",
              "band": "Fear Factory / Arkaea / Brujeria",
              "configString": "Tama Starclassic"
            },
            {
              "id": 33,
              "name": "Blake Richardson",
              "slug": "blake-richardson",
              "band": "Between the Buried and Me",
              "configString": "Tama Starclassic Bubinga (Custom Finish)"
            },
            {
              "id": 34,
              "name": "Ben Koller",
              "slug": "ben-koller",
              "band": "Converge / Mutoid Man / Killer Be Killed",
              "configString": "Tama Starclassic Performer B/B"
            },
            {
              "id": 35,
              "name": "Flo Mounier",
              "slug": "flo-mounier",
              "band": "Cryptopsy",
              "configString": "Tama Starclassic Maple"
            },
            {
              "id": 40,
              "name": "Chris Turner",
              "slug": "chris-turner",
              "band": "Oceans Ate Alaska",
              "configString": "Tama Starclassic Maple/Birch"
            },
            {
              "id": 44,
              "name": "Derek Roddy",
              "slug": "derek-roddy",
              "band": "Hate Eternal / Nile",
              "configString": "Tama Starclassic Bubinga"
            },
            {
              "id": 45,
              "name": "Dirk Verbeuren",
              "slug": "dirk-verbeuren",
              "band": "Megadeth",
              "configString": "Tama Starclassic Maple"
            },
            {
              "id": 46,
              "name": "Frost",
              "slug": "frost",
              "band": "Satyricon / 1349",
              "configString": "Tama Starclassic Bubinga"
            },
            {
              "id": 48,
              "name": "Abe Cunningham",
              "slug": "abe-cunningham",
              "band": "Deftones",
              "configString": "Tama Starclassic Bubinga (Egyptian Night Mist)"
            },
            {
              "id": 57,
              "name": "Daray",
              "slug": "daray",
              "band": "Dimmu Borgir / Vader",
              "configString": "Tama Starclassic Performer B/B, Piano Black"
            },
            {
              "id": 59,
              "name": "Tim Yeung",
              "slug": "tim-yeung",
              "band": "Morbid Angel / Hate Eternal / Vital Remains",
              "configString": "Tama Starclassic Bubinga"
            },
            {
              "id": 66,
              "name": "Adrian Erlandsson",
              "slug": "adrian-erlandsson",
              "band": "At the Gates",
              "configString": "Tama Starclassic Bubinga"
            },
            {
              "id": 70,
              "name": "Alex Rüdinger",
              "slug": "alex-rudinger",
              "band": "Trivium",
              "configString": "Tama Starclassic Performer B/B"
            }
          ]
        },
        {
          "brand": "Pearl",
          "count": 20,
          "percent": 27.8,
          "drummers": [
            {
              "id": 2,
              "name": "Joey Jordison",
              "slug": "joey-jordison",
              "band": "Slipknot",
              "configString": "Pearl Reference Series"
            },
            {
              "id": 3,
              "name": "Gene Hoglan",
              "slug": "gene-hoglan",
              "band": "Death / Testament / Dethklok",
              "configString": "Pearl Reference Pure"
            },
            {
              "id": 6,
              "name": "George Kollias",
              "slug": "george-kollias",
              "band": "Nile",
              "configString": "Pearl Masterworks Stadium Exotic (Piano Black with Gold Hardware)"
            },
            {
              "id": 8,
              "name": "Ray Luzier",
              "slug": "ray-luzier",
              "band": "Korn",
              "configString": "Pearl Reference Series"
            },
            {
              "id": 18,
              "name": "Matt Halpern",
              "slug": "matt-halpern",
              "band": "Periphery",
              "configString": "Pearl Reference Series"
            },
            {
              "id": 19,
              "name": "Inferno",
              "slug": "inferno",
              "band": "Behemoth",
              "configString": "Pearl Reference Series"
            },
            {
              "id": 31,
              "name": "Nick Augusto",
              "slug": "nick-augusto",
              "band": "ex-Trivium",
              "configString": "Pearl Reference Pure"
            },
            {
              "id": 36,
              "name": "Ryan Van Poederooyen",
              "slug": "ryan-van-poederooyen",
              "band": "Devin Townsend Project",
              "configString": "Pearl Reference Series"
            },
            {
              "id": 49,
              "name": "Richard Christy",
              "slug": "richard-christy",
              "band": "Death / Iced Earth",
              "configString": "Pearl Masters Custom"
            },
            {
              "id": 51,
              "name": "Paul Mazurkiewicz",
              "slug": "paul-mazurkiewicz",
              "band": "Cannibal Corpse",
              "configString": "Pearl Reference"
            },
            {
              "id": 52,
              "name": "Mike Mangini",
              "slug": "mike-mangini",
              "band": "Godsmack (2026-present); Dream Theater (2010-2023)",
              "configString": "Pearl Reference Pure"
            },
            {
              "id": 54,
              "name": "Daniel Erlandsson",
              "slug": "daniel-erlandsson",
              "band": "Arch Enemy",
              "configString": "Pearl Reference Pure"
            },
            {
              "id": 55,
              "name": "Jaska Raatikainen",
              "slug": "jaska-raatikainen",
              "band": "Children of Bodom",
              "configString": "Pearl Masters Premium Maple"
            },
            {
              "id": 58,
              "name": "Jocke Wallgren",
              "slug": "jocke-wallgren",
              "band": "Amon Amarth",
              "configString": "Pearl Reference Pure"
            },
            {
              "id": 60,
              "name": "Kevin Talley",
              "slug": "kevin-talley",
              "band": "Dying Fetus / Misery Index / Six Feet Under",
              "configString": "Pearl Masters Custom / Reference Series"
            },
            {
              "id": 63,
              "name": "Paul Bostaph",
              "slug": "paul-bostaph",
              "band": "Slayer",
              "configString": "Pearl Masters Maple Complete (MCX)"
            },
            {
              "id": 65,
              "name": "Nick Menza",
              "slug": "nick-menza",
              "band": "Megadeth",
              "configString": "Pearl Reference Custom"
            },
            {
              "id": 68,
              "name": "Jimmy DeGrasso",
              "slug": "jimmy-degrasso",
              "band": "Megadeth",
              "configString": "Pearl"
            },
            {
              "id": 71,
              "name": "John Longstreth",
              "slug": "john-longstreth",
              "band": "Origin",
              "configString": "Pearl (endorsement confirmed via his own Scorpion Percussion artist bio; specific kit model/shell sizes not independently documented — omitted rather than guessed)"
            },
            {
              "id": 72,
              "name": "Waltteri Väyrynen",
              "slug": "waltteri-vayrynen",
              "band": "Opeth",
              "configString": "Pearl (endorsement confirmed via Pearl's own artist roster and corroborated by Antelope Audio's 2020 studio-session writeup; specific kit model/shell sizes not independently documented — omitted rather than guessed)"
            }
          ]
        },
        {
          "brand": "Sonor",
          "count": 7,
          "percent": 9.7,
          "drummers": [
            {
              "id": 5,
              "name": "Tomas Haake",
              "slug": "tomas-haake",
              "band": "Meshuggah",
              "configString": "Sonor SQ2 Heavy Beech (24\"x18\" Bass, 10\"x8\", 12\"x9\", 13\"x10\", 16\"x14\", 18\"x16\" Toms)"
            },
            {
              "id": 14,
              "name": "Danny Carey",
              "slug": "danny-carey",
              "band": "Tool",
              "configString": "Sonor SQ2 Heavy Beech"
            },
            {
              "id": 20,
              "name": "Hellhammer",
              "slug": "hellhammer",
              "band": "Mayhem",
              "configString": "Sonor SQ2 Heavy Beech"
            },
            {
              "id": 28,
              "name": "Morgan Ågren",
              "slug": "morgan-agren",
              "band": "Mats/Morgan Band / Kaipa / Fredrik Thordendal's Special Defects",
              "configString": "Sonor SQ2 Beech"
            },
            {
              "id": 43,
              "name": "Mikkey Dee",
              "slug": "mikkey-dee",
              "band": "Scorpions / Motörhead",
              "configString": "Sonor SQ2"
            },
            {
              "id": 47,
              "name": "Gavin Harrison",
              "slug": "gavin-harrison",
              "band": "Porcupine Tree / King Crimson",
              "configString": "Sonor SQ2 Series"
            },
            {
              "id": 69,
              "name": "Nick Barker",
              "slug": "nick-barker",
              "band": "Dimmu Borgir",
              "configString": "Sonor"
            }
          ]
        },
        {
          "brand": "DW",
          "count": 6,
          "percent": 8.3,
          "drummers": [
            {
              "id": 23,
              "name": "Arin Ilejay",
              "slug": "arin-ilejay",
              "band": "ex-Avenged Sevenfold",
              "configString": "DW Collector's Series"
            },
            {
              "id": 24,
              "name": "Navene Koperweis",
              "slug": "navene-koperweis",
              "band": "Entheos / ex-Animals as Leaders",
              "configString": "DW Drums Performance Series"
            },
            {
              "id": 53,
              "name": "Matt Garstka",
              "slug": "matt-garstka",
              "band": "Animals as Leaders",
              "configString": "DW Collector's Series"
            },
            {
              "id": 56,
              "name": "Hannes Grossmann",
              "slug": "hannes-grossmann",
              "band": "Obscura / ex-Necrophagist / Alkaloid",
              "configString": "DW Collectors Series"
            },
            {
              "id": 62,
              "name": "Martin Axenrot",
              "slug": "martin-axenrot",
              "band": "Opeth",
              "configString": "DW (Drum Workshop) — custom, maple/gum shells"
            },
            {
              "id": 64,
              "name": "Sean Reinert",
              "slug": "sean-reinert",
              "band": "Death / Cynic",
              "configString": "DW Collector's Series"
            }
          ]
        },
        {
          "brand": "ddrum",
          "count": 4,
          "percent": 5.6,
          "drummers": [
            {
              "id": 11,
              "name": "Vinnie Paul",
              "slug": "vinnie-paul",
              "band": "Pantera / Damageplan / Hellyeah",
              "configString": "ddrum (brand confirmed; specific kit series unverified)"
            },
            {
              "id": 21,
              "name": "Pete Sandoval",
              "slug": "pete-sandoval",
              "band": "Morbid Angel",
              "configString": "ddrum (specific series unconfirmed)"
            },
            {
              "id": 26,
              "name": "Shannon Larkin",
              "slug": "shannon-larkin",
              "band": "Godsmack / Ugly Kid Joe / Wrathchild America",
              "configString": "ddrum Dios Series"
            },
            {
              "id": 42,
              "name": "Scott Travis",
              "slug": "scott-travis",
              "band": "Judas Priest",
              "configString": "ddrum Dominion Series"
            }
          ]
        },
        {
          "brand": "Mapex",
          "count": 4,
          "percent": 5.6,
          "drummers": [
            {
              "id": 17,
              "name": "Chris Adler",
              "slug": "chris-adler",
              "band": "Lamb of God",
              "configString": "Mapex Saturn in Satin Black Maple Burl"
            },
            {
              "id": 32,
              "name": "Matt Greiner",
              "slug": "matt-greiner",
              "band": "August Burns Red",
              "configString": "Mapex Black Panther Design Lab"
            },
            {
              "id": 37,
              "name": "Jason Bittner",
              "slug": "jason-bittner",
              "band": "Shadows Fall / Overkill / Category 7",
              "configString": "Mapex Saturn V"
            },
            {
              "id": 50,
              "name": "Aquiles Priester",
              "slug": "aquiles-priester",
              "band": "Angra / W.A.S.P.",
              "configString": "Mapex Saturn Evolution All Maple (signature kit)"
            }
          ]
        },
        {
          "brand": "Ludwig",
          "count": 3,
          "percent": 4.2,
          "drummers": [
            {
              "id": 22,
              "name": "Art Cruz",
              "slug": "art-cruz",
              "band": "Lamb of God",
              "configString": "Ludwig Drums"
            },
            {
              "id": 30,
              "name": "Bill Ward",
              "slug": "bill-ward",
              "band": "Black Sabbath",
              "configString": "Ludwig Standard / Club Date Series"
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
          "brand": "SJC",
          "count": 2,
          "percent": 2.8,
          "drummers": [
            {
              "id": 10,
              "name": "Jay Weinberg",
              "slug": "jay-weinberg",
              "band": "ex-Slipknot / Suicidal Tendencies",
              "configString": "SJC Custom Drums (OBEY x ST Collaboration Kit)"
            },
            {
              "id": 39,
              "name": "Travis Orbin",
              "slug": "travis-orbin",
              "band": "Darkest Hour / ex-Periphery",
              "configString": "SJC Custom Drums"
            }
          ]
        },
        {
          "brand": "Noble & Cooley",
          "count": 1,
          "percent": 1.4,
          "drummers": [
            {
              "id": 38,
              "name": "Martin Lopez",
              "slug": "martin-lopez",
              "band": "Soen / ex-Opeth",
              "configString": "Noble & Cooley Walnut"
            }
          ]
        },
        {
          "brand": "OCDP",
          "count": 1,
          "percent": 1.4,
          "drummers": [
            {
              "id": 9,
              "name": "John Otto",
              "slug": "john-otto",
              "band": "Limp Bizkit",
              "configString": "Orange County Drum & Percussion (OCDP) Custom Type 5 Acrylic"
            }
          ]
        },
        {
          "brand": "Yamaha",
          "count": 1,
          "percent": 1.4,
          "drummers": [
            {
              "id": 29,
              "name": "Igor Cavalera",
              "slug": "igor-cavalera",
              "band": "Sepultura / Cavalera Conspiracy / Soulwax",
              "configString": "Yamaha Absolute Hybrid Maple"
            }
          ]
        }
      ],
      "skippedCount": 2,
      "skipped": [
        {
          "slug": "nicko-mcbrain",
          "name": "Nicko McBrain",
          "raw": "British Drum Co."
        },
        {
          "slug": "isaac-lamb",
          "name": "Isaac Lamb",
          "raw": "Not publicly documented"
        }
      ]
    },
    "snares": {
      "label": "Snares",
      "ranked": [
        {
          "brand": "Tama",
          "count": 20,
          "percent": 27.8,
          "drummers": [
            {
              "id": 1,
              "name": "Lars Ulrich",
              "slug": "lars-ulrich",
              "band": "Metallica",
              "configString": "Tama LU1465 Lars Ulrich Signature 14x6.5\""
            },
            {
              "id": 4,
              "name": "Dave Lombardo",
              "slug": "dave-lombardo",
              "band": "Slayer",
              "configString": "Tama S.L.P. 14x6.5\""
            },
            {
              "id": 7,
              "name": "Eloy Casagrande",
              "slug": "eloy-casagrande",
              "band": "Slipknot",
              "configString": "Tama Bell Brass 14x5.5\" (BB146)"
            },
            {
              "id": 12,
              "name": "Charlie Benante",
              "slug": "charlie-benante",
              "band": "Anthrax / S.O.D. / Pantera",
              "configString": "Tama Charlie Benante Signature 14x6.5\""
            },
            {
              "id": 13,
              "name": "Mike Portnoy",
              "slug": "mike-portnoy",
              "band": "Dream Theater / Liquid Tension Experiment / The Winery Dogs",
              "configString": "Tama Mike Portnoy Signature Melody Master 14x5.5\""
            },
            {
              "id": 15,
              "name": "Mario Duplantier",
              "slug": "mario-duplantier",
              "band": "Gojira",
              "configString": "Tama S.L.P. 14x6.5\" G-Maple"
            },
            {
              "id": 16,
              "name": "Brann Dailor",
              "slug": "brann-dailor",
              "band": "Mastodon",
              "configString": "Tama S.L.P. 14x6.5\" G-Maple"
            },
            {
              "id": 25,
              "name": "Alex Bent",
              "slug": "alex-bent",
              "band": "ex-Trivium / Arkaik / Dragonlord",
              "configString": "Tama Starclassic Maple 14x5\""
            },
            {
              "id": 27,
              "name": "Raymond Herrera",
              "slug": "raymond-herrera",
              "band": "Fear Factory / Arkaea / Brujeria",
              "configString": "Tama 14x6.5\" Brass"
            },
            {
              "id": 33,
              "name": "Blake Richardson",
              "slug": "blake-richardson",
              "band": "Between the Buried and Me",
              "configString": "Tama STARPHONIC 14x6\" Brass"
            },
            {
              "id": 34,
              "name": "Ben Koller",
              "slug": "ben-koller",
              "band": "Converge / Mutoid Man / Killer Be Killed",
              "configString": "Tama S.L.P. 14x6\" Brass"
            },
            {
              "id": 40,
              "name": "Chris Turner",
              "slug": "chris-turner",
              "band": "Oceans Ate Alaska",
              "configString": "Tama S.L.P. 14x5.5\" G-Maple"
            },
            {
              "id": 44,
              "name": "Derek Roddy",
              "slug": "derek-roddy",
              "band": "Hate Eternal / Nile",
              "configString": "Tama SLP Black Brass 14x6.5\""
            },
            {
              "id": 45,
              "name": "Dirk Verbeuren",
              "slug": "dirk-verbeuren",
              "band": "Megadeth",
              "configString": "Tama S.L.P. Dynamic Bronze 14x5.5\""
            },
            {
              "id": 46,
              "name": "Frost",
              "slug": "frost",
              "band": "Satyricon / 1349",
              "configString": "Tama Starclassic Bubinga 14x5.5\""
            },
            {
              "id": 48,
              "name": "Abe Cunningham",
              "slug": "abe-cunningham",
              "band": "Deftones",
              "configString": "Tama Starclassic matching snare (no separate model documented)"
            },
            {
              "id": 57,
              "name": "Daray",
              "slug": "daray",
              "band": "Dimmu Borgir / Vader",
              "configString": "Tama S.L.P. Black Brass LBR1465"
            },
            {
              "id": 59,
              "name": "Tim Yeung",
              "slug": "tim-yeung",
              "band": "Morbid Angel / Hate Eternal / Vital Remains",
              "configString": "Tama S.L.P. Big Black Steel 14x6.5\""
            },
            {
              "id": 66,
              "name": "Adrian Erlandsson",
              "slug": "adrian-erlandsson",
              "band": "At the Gates",
              "configString": "Tama Starclassic Bubinga 14x6.5\""
            },
            {
              "id": 70,
              "name": "Alex Rüdinger",
              "slug": "alex-rudinger",
              "band": "Trivium",
              "configString": "Tama STARPHONIC Brass 14x6\" (or SLP Black Brass alternate)"
            }
          ]
        },
        {
          "brand": "Pearl",
          "count": 17,
          "percent": 23.6,
          "drummers": [
            {
              "id": 2,
              "name": "Joey Jordison",
              "slug": "joey-jordison",
              "band": "Slipknot",
              "configString": "Pearl Joey Jordison Signature 13x6.5\""
            },
            {
              "id": 3,
              "name": "Gene Hoglan",
              "slug": "gene-hoglan",
              "band": "Death / Testament / Dethklok",
              "configString": "Pearl Reference 14x6.5\" Brass"
            },
            {
              "id": 6,
              "name": "George Kollias",
              "slug": "george-kollias",
              "band": "Nile",
              "configString": "Pearl George Kollias Signature 14x6.5\""
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
              "configString": "Pearl Matt Halpern Signature 14x6\" Brass (MH1460/B)"
            },
            {
              "id": 19,
              "name": "Inferno",
              "slug": "inferno",
              "band": "Behemoth",
              "configString": "Pearl Reference 14x5\" Steel"
            },
            {
              "id": 31,
              "name": "Nick Augusto",
              "slug": "nick-augusto",
              "band": "ex-Trivium",
              "configString": "Pearl Reference 14x6.5\" Brass"
            },
            {
              "id": 36,
              "name": "Ryan Van Poederooyen",
              "slug": "ryan-van-poederooyen",
              "band": "Devin Townsend Project",
              "configString": "Pearl Reference 14x6.5\" Brass"
            },
            {
              "id": 49,
              "name": "Richard Christy",
              "slug": "richard-christy",
              "band": "Death / Iced Earth",
              "configString": "Pearl Masters Custom 14x6.5\" Maple"
            },
            {
              "id": 51,
              "name": "Paul Mazurkiewicz",
              "slug": "paul-mazurkiewicz",
              "band": "Cannibal Corpse",
              "configString": "Pearl Free-Floating Steel"
            },
            {
              "id": 54,
              "name": "Daniel Erlandsson",
              "slug": "daniel-erlandsson",
              "band": "Arch Enemy",
              "configString": "Pearl Reference Pure"
            },
            {
              "id": 55,
              "name": "Jaska Raatikainen",
              "slug": "jaska-raatikainen",
              "band": "Children of Bodom",
              "configString": "Pearl Masters 14x5.5\" Maple"
            },
            {
              "id": 58,
              "name": "Jocke Wallgren",
              "slug": "jocke-wallgren",
              "band": "Amon Amarth",
              "configString": "Pearl Reference Pure 14x6.5\""
            },
            {
              "id": 60,
              "name": "Kevin Talley",
              "slug": "kevin-talley",
              "band": "Dying Fetus / Misery Index / Six Feet Under",
              "configString": "Pearl Masters 14\"x6.5\" Steel"
            },
            {
              "id": 63,
              "name": "Paul Bostaph",
              "slug": "paul-bostaph",
              "band": "Slayer",
              "configString": "Pearl Masters Steel 14x6.5\""
            },
            {
              "id": 65,
              "name": "Nick Menza",
              "slug": "nick-menza",
              "band": "Megadeth",
              "configString": "Pearl Reference Custom 14x5.5\""
            },
            {
              "id": 68,
              "name": "Jimmy DeGrasso",
              "slug": "jimmy-degrasso",
              "band": "Megadeth",
              "configString": "Pearl JD1455 Jimmy DeGrasso Signature 14x5.5\" Hammered Brass"
            }
          ]
        },
        {
          "brand": "Sonor",
          "count": 7,
          "percent": 9.7,
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
              "configString": "Sonor Danny Carey Signature 14x8\" Bronze"
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
              "configString": "Sonor SQ2 Beech 14x5.5\" Maple"
            },
            {
              "id": 41,
              "name": "Nicko McBrain",
              "slug": "nicko-mcbrain",
              "band": "Iron Maiden",
              "configString": "Sonor Nicko McBrain Signature 14x6.5\""
            },
            {
              "id": 43,
              "name": "Mikkey Dee",
              "slug": "mikkey-dee",
              "band": "Scorpions / Motörhead",
              "configString": "Sonor Mikkey Dee Signature 14x7.25\" Birch"
            },
            {
              "id": 47,
              "name": "Gavin Harrison",
              "slug": "gavin-harrison",
              "band": "Porcupine Tree / King Crimson",
              "configString": "Sonor Gavin Harrison Signature 12x5\" & 14x5.25\""
            }
          ]
        },
        {
          "brand": "DW",
          "count": 6,
          "percent": 8.3,
          "drummers": [
            {
              "id": 23,
              "name": "Arin Ilejay",
              "slug": "arin-ilejay",
              "band": "ex-Avenged Sevenfold",
              "configString": "DW Collector's Series"
            },
            {
              "id": 24,
              "name": "Navene Koperweis",
              "slug": "navene-koperweis",
              "band": "Entheos / ex-Animals as Leaders",
              "configString": "DW Performance 14x6.5\" Steel"
            },
            {
              "id": 53,
              "name": "Matt Garstka",
              "slug": "matt-garstka",
              "band": "Animals as Leaders",
              "configString": "DW Collector's Series Purpleheart"
            },
            {
              "id": 56,
              "name": "Hannes Grossmann",
              "slug": "hannes-grossmann",
              "band": "Obscura / ex-Necrophagist / Alkaloid",
              "configString": "DW Collectors 14x5.5\" Maple"
            },
            {
              "id": 62,
              "name": "Martin Axenrot",
              "slug": "martin-axenrot",
              "band": "Opeth",
              "configString": "DW custom (specific model unverified)"
            },
            {
              "id": 64,
              "name": "Sean Reinert",
              "slug": "sean-reinert",
              "band": "Death / Cynic",
              "configString": "DW Collector's Series Maple Shell"
            }
          ]
        },
        {
          "brand": "ddrum",
          "count": 4,
          "percent": 5.6,
          "drummers": [
            {
              "id": 11,
              "name": "Vinnie Paul",
              "slug": "vinnie-paul",
              "band": "Pantera / Damageplan / Hellyeah",
              "configString": "ddrum Vinnie Paul Signature 14x8\" (8-ply maple, 10 lugs, die-cast hoops)"
            },
            {
              "id": 21,
              "name": "Pete Sandoval",
              "slug": "pete-sandoval",
              "band": "Morbid Angel",
              "configString": "ddrum (specific model unconfirmed)"
            },
            {
              "id": 26,
              "name": "Shannon Larkin",
              "slug": "shannon-larkin",
              "band": "Godsmack / Ugly Kid Joe / Wrathchild America",
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
          "count": 3,
          "percent": 4.2,
          "drummers": [
            {
              "id": 17,
              "name": "Chris Adler",
              "slug": "chris-adler",
              "band": "Lamb of God",
              "configString": "Mapex Chris Adler Signature 14x5.5\" Walnut/Maple"
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
              "configString": "Mapex Black Panther 14x6.5\" Brass"
            }
          ]
        },
        {
          "brand": "Ludwig",
          "count": 2,
          "percent": 2.8,
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
              "configString": "Ludwig Supraphonic 14x6.5\" LM402"
            }
          ]
        },
        {
          "brand": "SJC",
          "count": 2,
          "percent": 2.8,
          "drummers": [
            {
              "id": 10,
              "name": "Jay Weinberg",
              "slug": "jay-weinberg",
              "band": "ex-Slipknot / Suicidal Tendencies",
              "configString": "SJC Jay Weinberg \"The Crucible\" 14x6.5\" 48-ply Brass"
            },
            {
              "id": 39,
              "name": "Travis Orbin",
              "slug": "travis-orbin",
              "band": "Darkest Hour / ex-Periphery",
              "configString": "SJC Custom 14x6.5\" Maple"
            }
          ]
        },
        {
          "brand": "Noble & Cooley",
          "count": 1,
          "percent": 1.4,
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
          "percent": 1.4,
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
          "brand": "Yamaha",
          "count": 1,
          "percent": 1.4,
          "drummers": [
            {
              "id": 29,
              "name": "Igor Cavalera",
              "slug": "igor-cavalera",
              "band": "Sepultura / Cavalera Conspiracy / Soulwax",
              "configString": "Yamaha"
            }
          ]
        }
      ],
      "skippedCount": 8,
      "skipped": [
        {
          "slug": "flo-mounier",
          "name": "Flo Mounier",
          "raw": ""
        },
        {
          "slug": "aquiles-priester",
          "name": "Aquiles Priester",
          "raw": ""
        },
        {
          "slug": "mike-mangini",
          "name": "Mike Mangini",
          "raw": ""
        },
        {
          "slug": "isaac-lamb",
          "name": "Isaac Lamb",
          "raw": "Not publicly documented"
        },
        {
          "slug": "jon-dette",
          "name": "Jon Dette",
          "raw": "14x6.5\" Metal or Maple Snare"
        },
        {
          "slug": "nick-barker",
          "name": "Nick Barker",
          "raw": ""
        },
        {
          "slug": "john-longstreth",
          "name": "John Longstreth",
          "raw": ""
        },
        {
          "slug": "waltteri-vayrynen",
          "name": "Waltteri Väyrynen",
          "raw": ""
        }
      ]
    },
    "cymbals": {
      "label": "Cymbals",
      "ranked": [
        {
          "brand": "Sabian",
          "count": 22,
          "percent": 30.6,
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
              "configString": "Sabian (brand per secondary sources; specific models unverified)"
            },
            {
              "id": 13,
              "name": "Mike Portnoy",
              "slug": "mike-portnoy",
              "band": "Dream Theater / Liquid Tension Experiment / The Winery Dogs",
              "configString": "Sabian HHX MAX / AAX MAXX Series (22\" HHX MAX Ride, 18\" AAX X-Plosion Crash, 19\" HHX X-Plosion Crash, 18\" AAX O-Zone Crash, 18\" HHX Chinese, 19\" Paragon Chinese, 7\"/9\"/11\" AAX MAXX Splashes, 6\"/6.5\"/7\" AA MAX Chimes)"
            },
            {
              "id": 26,
              "name": "Shannon Larkin",
              "slug": "shannon-larkin",
              "band": "Godsmack / Ugly Kid Joe / Wrathchild America",
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
              "configString": "Sabian AA/AAX Series (14\" AAX Stage Hi-Hats, 18\" & 19\" AAX X-Plosion Crashes, 18\" AAX Chinese)"
            },
            {
              "id": 52,
              "name": "Mike Mangini",
              "slug": "mike-mangini",
              "band": "Godsmack (2026-present); Dream Theater (2010-2023)",
              "configString": "Sabian HHX & AAX Series (14\" HHX Evolution Hi-Hats, 17\", 18\", 19\" HHX Evolution Crashes, 21\" HHX Raw Bell Dry Ride)"
            },
            {
              "id": 54,
              "name": "Daniel Erlandsson",
              "slug": "daniel-erlandsson",
              "band": "Arch Enemy",
              "configString": "Sabian AAX / HHX Series"
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
              "id": 62,
              "name": "Martin Axenrot",
              "slug": "martin-axenrot",
              "band": "Opeth",
              "configString": "SABIAN HHX / AAX Series (HHX Groove Hats, HHX Evolution O-Zone Crash, HHX Legacy Ride, HHX Chinese, AAX Splash)"
            },
            {
              "id": 63,
              "name": "Paul Bostaph",
              "slug": "paul-bostaph",
              "band": "Slayer",
              "configString": "Sabian AAX Series (14\" AAX Stage Hi-Hats, 17\" & 19\" AAX X-Plosion Crashes, 21\" AAX Stage Ride, 18\" AAXtreme China)"
            },
            {
              "id": 65,
              "name": "Nick Menza",
              "slug": "nick-menza",
              "band": "Megadeth",
              "configString": "Sabian AA / Signature Series"
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
            },
            {
              "id": 68,
              "name": "Jimmy DeGrasso",
              "slug": "jimmy-degrasso",
              "band": "Megadeth",
              "configString": "Sabian"
            },
            {
              "id": 72,
              "name": "Waltteri Väyrynen",
              "slug": "waltteri-vayrynen",
              "band": "Opeth",
              "configString": "Sabian (endorsed artist; confirmed favourite piece per Sabian's own artist page: 22\" HH Power Bell Ride — full setup not itemized there, so omitted rather than guessed)"
            }
          ]
        },
        {
          "brand": "Zildjian",
          "count": 22,
          "percent": 30.6,
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
              "configString": "Zildjian (13\" A Custom Mastersound Hi-Hats, 16\" & 17\" A Custom Projection Crashes, 20\" A Custom EFX, 20\" FX Oriental Crash of Doom)"
            },
            {
              "id": 10,
              "name": "Jay Weinberg",
              "slug": "jay-weinberg",
              "band": "ex-Slipknot / Suicidal Tendencies",
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
              "id": 29,
              "name": "Igor Cavalera",
              "slug": "igor-cavalera",
              "band": "Sepultura / Cavalera Conspiracy / Soulwax",
              "configString": "Zildjian A Custom Series"
            },
            {
              "id": 30,
              "name": "Bill Ward",
              "slug": "bill-ward",
              "band": "Black Sabbath",
              "configString": "Zildjian Avedis Series"
            },
            {
              "id": 34,
              "name": "Ben Koller",
              "slug": "ben-koller",
              "band": "Converge / Mutoid Man / Killer Be Killed",
              "configString": "Zildjian K Custom & A Custom Series (14\" K Custom Thin Hi-Hats, 18\" & 19\" K Custom Medium Thin Crashes, 21\" K Custom Ride, 18\" K China)"
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
              "id": 46,
              "name": "Frost",
              "slug": "frost",
              "band": "Satyricon / 1349",
              "configString": "Zildjian A Series"
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
              "configString": "Zildjian K Custom Series"
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
          "brand": "Paiste",
          "count": 14,
          "percent": 19.4,
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
              "configString": "Paiste Signature Series (14\" Sound Edge Hi-Hats, 18\" & 20\" Power Crashes, 22\" Dry Heavy Ride \"Monad\", 2002 & Signature China cymbals)"
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
              "id": 43,
              "name": "Mikkey Dee",
              "slug": "mikkey-dee",
              "band": "Scorpions / Motörhead",
              "configString": "Paiste Signature Series (14\" Sound Edge Hi-Hats, 19\" & 20\" Power Crashes, 22\" Power Ride, 18\" Heavy China)"
            },
            {
              "id": 50,
              "name": "Aquiles Priester",
              "slug": "aquiles-priester",
              "band": "Angra / W.A.S.P.",
              "configString": "Paiste Custom red-coated set incl. 18\" Psychoctopus Giga Bell Ride"
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
          "brand": "Meinl",
          "count": 12,
          "percent": 16.7,
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
              "configString": "Meinl Byzance Series (14\" Traditional Medium Hi-Hats, 18\" & 20\" Traditional Extra Thin Hammered Crashes, 21\" Byzance Dark Double Down Crash-Ride, plus Artist Concept \"Double Down Stack\")"
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
              "id": 45,
              "name": "Dirk Verbeuren",
              "slug": "dirk-verbeuren",
              "band": "Megadeth",
              "configString": "Meinl Byzance Brilliant & Classics Custom Dark Series (14\" Byzance Brilliant Hi-Hat, 18\"-21\" Classics Custom Dark Crashes, 22\" Byzance Brilliant Ride, 18\" Byzance Brilliant China)"
            },
            {
              "id": 51,
              "name": "Paul Mazurkiewicz",
              "slug": "paul-mazurkiewicz",
              "band": "Cannibal Corpse",
              "configString": "Meinl Classics Custom & Byzance Series"
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
              "id": 70,
              "name": "Alex Rüdinger",
              "slug": "alex-rudinger",
              "band": "Trivium",
              "configString": "Meinl Cymbals (Byzance and MB20 series; specific models not independently documented — omitted rather than guessed)"
            },
            {
              "id": 71,
              "name": "John Longstreth",
              "slug": "john-longstreth",
              "band": "Origin",
              "configString": "Meinl Classics Custom Dark Series (8\" Dark Splash, 14\" Dark Hihat, 18\" Dark China) + Meinl Generation X 12\"/14\" Trash Hat"
            }
          ]
        }
      ],
      "skippedCount": 3,
      "skipped": [
        {
          "slug": "pete-sandoval",
          "name": "Pete Sandoval",
          "raw": "Cymbal brand/model not publicly documented"
        },
        {
          "slug": "isaac-lamb",
          "name": "Isaac Lamb",
          "raw": "Not publicly documented"
        },
        {
          "slug": "nick-barker",
          "name": "Nick Barker",
          "raw": ""
        }
      ]
    },
    "sticks": {
      "label": "Sticks",
      "ranked": [
        {
          "brand": "Vic Firth",
          "count": 36,
          "percent": 50,
          "drummers": [
            {
              "id": 6,
              "name": "George Kollias",
              "slug": "george-kollias",
              "band": "Nile",
              "configString": "Vic Firth"
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
              "configString": "Vic Firth (specific in-career model unverified)"
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
              "band": "Godsmack / Ugly Kid Joe / Wrathchild America",
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
              "configString": "Vic Firth Paul Mazurkiewicz Signature"
            },
            {
              "id": 53,
              "name": "Matt Garstka",
              "slug": "matt-garstka",
              "band": "Animals as Leaders",
              "configString": "Vic Firth Matt Garstka Signature"
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
              "id": 64,
              "name": "Sean Reinert",
              "slug": "sean-reinert",
              "band": "Death / Cynic",
              "configString": "Vic Firth American Classic 5A"
            },
            {
              "id": 66,
              "name": "Adrian Erlandsson",
              "slug": "adrian-erlandsson",
              "band": "At the Gates",
              "configString": "Vic Firth Rock Nylon Tip (At the Gates Signature)"
            }
          ]
        },
        {
          "brand": "Promark",
          "count": 19,
          "percent": 26.4,
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
              "configString": "Promark Mike Portnoy Signature TXMP420XW-AG"
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
              "id": 23,
              "name": "Arin Ilejay",
              "slug": "arin-ilejay",
              "band": "ex-Avenged Sevenfold",
              "configString": "Promark 5B"
            },
            {
              "id": 27,
              "name": "Raymond Herrera",
              "slug": "raymond-herrera",
              "band": "Fear Factory / Arkaea / Brujeria",
              "configString": "Pro-Mark 5A Oak Nylon Tip"
            },
            {
              "id": 30,
              "name": "Bill Ward",
              "slug": "bill-ward",
              "band": "Black Sabbath",
              "configString": "Pro-Mark Standard 5A/5B equivalent"
            },
            {
              "id": 31,
              "name": "Nick Augusto",
              "slug": "nick-augusto",
              "band": "ex-Trivium",
              "configString": "Pro-Mark Nylon Tip 5B"
            },
            {
              "id": 37,
              "name": "Jason Bittner",
              "slug": "jason-bittner",
              "band": "Shadows Fall / Overkill / Category 7",
              "configString": "Promark Jason Bittner Signature 5BX"
            },
            {
              "id": 48,
              "name": "Abe Cunningham",
              "slug": "abe-cunningham",
              "band": "Deftones",
              "configString": "Pro-Mark"
            },
            {
              "id": 50,
              "name": "Aquiles Priester",
              "slug": "aquiles-priester",
              "band": "Angra / W.A.S.P.",
              "configString": "ProMark Aquiles Priester Signature"
            },
            {
              "id": 54,
              "name": "Daniel Erlandsson",
              "slug": "daniel-erlandsson",
              "band": "Arch Enemy",
              "configString": "ProMark 5B"
            },
            {
              "id": 62,
              "name": "Martin Axenrot",
              "slug": "martin-axenrot",
              "band": "Opeth",
              "configString": "Pro-Mark"
            },
            {
              "id": 67,
              "name": "Jon Dette",
              "slug": "jon-dette",
              "band": "Slayer",
              "configString": "Promark / Vater 5B"
            },
            {
              "id": 68,
              "name": "Jimmy DeGrasso",
              "slug": "jimmy-degrasso",
              "band": "Megadeth",
              "configString": "Promark"
            }
          ]
        },
        {
          "brand": "Vater",
          "count": 7,
          "percent": 9.7,
          "drummers": [
            {
              "id": 10,
              "name": "Jay Weinberg",
              "slug": "jay-weinberg",
              "band": "ex-Slipknot / Suicidal Tendencies",
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
              "configString": "Vater 5B"
            },
            {
              "id": 52,
              "name": "Mike Mangini",
              "slug": "mike-mangini",
              "band": "Godsmack (2026-present); Dream Theater (2010-2023)",
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
              "id": 65,
              "name": "Nick Menza",
              "slug": "nick-menza",
              "band": "Megadeth",
              "configString": "Vater Nick Menza Signature"
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
          "brand": "Wincent",
          "count": 3,
          "percent": 4.2,
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
            },
            {
              "id": 72,
              "name": "Waltteri Väyrynen",
              "slug": "waltteri-vayrynen",
              "band": "Opeth",
              "configString": "Wincent W-5BXL"
            }
          ]
        },
        {
          "brand": "Tama",
          "count": 2,
          "percent": 2.8,
          "drummers": [
            {
              "id": 15,
              "name": "Mario Duplantier",
              "slug": "mario-duplantier",
              "band": "Gojira",
              "configString": "Tama Mario Duplantier Signature"
            },
            {
              "id": 45,
              "name": "Dirk Verbeuren",
              "slug": "dirk-verbeuren",
              "band": "Megadeth",
              "configString": "Tama O-DVM2 Dirk Verbeuren Signature"
            }
          ]
        },
        {
          "brand": "Ahead",
          "count": 1,
          "percent": 1.4,
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
          "brand": "Zildjian",
          "count": 1,
          "percent": 1.4,
          "drummers": [
            {
              "id": 9,
              "name": "John Otto",
              "slug": "john-otto",
              "band": "Limp Bizkit",
              "configString": "Zildjian Artist Series"
            }
          ]
        }
      ],
      "skippedCount": 4,
      "skipped": [
        {
          "slug": "isaac-lamb",
          "name": "Isaac Lamb",
          "raw": "Not publicly documented"
        },
        {
          "slug": "nick-barker",
          "name": "Nick Barker",
          "raw": ""
        },
        {
          "slug": "alex-rudinger",
          "name": "Alex Rüdinger",
          "raw": ""
        },
        {
          "slug": "john-longstreth",
          "name": "John Longstreth",
          "raw": "Scorpion Percussion \"Wee Heavy\" Signature Drumsticks"
        }
      ]
    },
    "pedals": {
      "label": "Pedals",
      "ranked": [
        {
          "brand": "Tama",
          "count": 22,
          "percent": 30.6,
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
              "configString": "Tama Iron Cobra Power Glide Twin Pedal (HP900PSW)"
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
              "configString": "Tama Iron Cobra Double Pedal"
            },
            {
              "id": 35,
              "name": "Flo Mounier",
              "slug": "flo-mounier",
              "band": "Cryptopsy",
              "configString": "Tama Speed Cobra 910 Twin Pedal"
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
              "id": 46,
              "name": "Frost",
              "slug": "frost",
              "band": "Satyricon / 1349",
              "configString": "Tama Iron Cobra Power Glide Pedal"
            },
            {
              "id": 48,
              "name": "Abe Cunningham",
              "slug": "abe-cunningham",
              "band": "Deftones",
              "configString": "Tama Iron Cobra Power Glide Twin Pedal (HP900PTW)"
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
              "id": 65,
              "name": "Nick Menza",
              "slug": "nick-menza",
              "band": "Megadeth",
              "configString": "Tama Iron Cobra Double Pedal"
            },
            {
              "id": 67,
              "name": "Jon Dette",
              "slug": "jon-dette",
              "band": "Slayer",
              "configString": "DW 9000 or Tama Iron Cobra Double Pedal"
            },
            {
              "id": 70,
              "name": "Alex Rüdinger",
              "slug": "alex-rudinger",
              "band": "Trivium",
              "configString": "Tama Speed Cobra Bass Drum Pedals"
            }
          ]
        },
        {
          "brand": "DW",
          "count": 15,
          "percent": 20.8,
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
              "band": "ex-Slipknot / Suicidal Tendencies",
              "configString": "DW 9000 Series Double Pedal"
            },
            {
              "id": 23,
              "name": "Arin Ilejay",
              "slug": "arin-ilejay",
              "band": "ex-Avenged Sevenfold",
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
              "band": "Godsmack / Ugly Kid Joe / Wrathchild America",
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
              "id": 31,
              "name": "Nick Augusto",
              "slug": "nick-augusto",
              "band": "ex-Trivium",
              "configString": "DW 9000 Series Double Pedal"
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
              "id": 43,
              "name": "Mikkey Dee",
              "slug": "mikkey-dee",
              "band": "Scorpions / Motörhead",
              "configString": "DW 5000 Series Pedal"
            },
            {
              "id": 50,
              "name": "Aquiles Priester",
              "slug": "aquiles-priester",
              "band": "Angra / W.A.S.P.",
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
              "id": 64,
              "name": "Sean Reinert",
              "slug": "sean-reinert",
              "band": "Death / Cynic",
              "configString": "DW 9000 Double Pedal"
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
          "brand": "Pearl",
          "count": 13,
          "percent": 18.1,
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
              "id": 18,
              "name": "Matt Halpern",
              "slug": "matt-halpern",
              "band": "Periphery",
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
              "id": 51,
              "name": "Paul Mazurkiewicz",
              "slug": "paul-mazurkiewicz",
              "band": "Cannibal Corpse",
              "configString": "Pearl Eliminator Double Bass Pedal"
            },
            {
              "id": 52,
              "name": "Mike Mangini",
              "slug": "mike-mangini",
              "band": "Godsmack (2026-present); Dream Theater (2010-2023)",
              "configString": "Pearl Eliminator Redline Double Pedal"
            },
            {
              "id": 54,
              "name": "Daniel Erlandsson",
              "slug": "daniel-erlandsson",
              "band": "Arch Enemy",
              "configString": "Pearl Eliminator Double Bass Pedal"
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
              "configString": "Pearl Demon Drive Double Bass Pedal"
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
          "brand": "Axis",
          "count": 4,
          "percent": 5.6,
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
            },
            {
              "id": 49,
              "name": "Richard Christy",
              "slug": "richard-christy",
              "band": "Death / Iced Earth",
              "configString": "Axis A Longboard Double Pedal"
            }
          ]
        },
        {
          "brand": "Sonor",
          "count": 3,
          "percent": 4.2,
          "drummers": [
            {
              "id": 14,
              "name": "Danny Carey",
              "slug": "danny-carey",
              "band": "Tool",
              "configString": "Sonor Giant Step Twin Effect Double Pedal"
            },
            {
              "id": 28,
              "name": "Morgan Ågren",
              "slug": "morgan-agren",
              "band": "Mats/Morgan Band / Kaipa / Fredrik Thordendal's Special Defects",
              "configString": "Sonor Giant Step Double Pedal"
            },
            {
              "id": 47,
              "name": "Gavin Harrison",
              "slug": "gavin-harrison",
              "band": "Porcupine Tree / King Crimson",
              "configString": "Sonor Perfect Balance Pedal"
            }
          ]
        },
        {
          "brand": "Czarcie Kopyto",
          "count": 2,
          "percent": 2.8,
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
          "brand": "ddrum",
          "count": 2,
          "percent": 2.8,
          "drummers": [
            {
              "id": 11,
              "name": "Vinnie Paul",
              "slug": "vinnie-paul",
              "band": "Pantera / Damageplan / Hellyeah",
              "configString": "ddrum hardware (brand confirmed via 2009 interview; specific pedal/throne models unverified)"
            },
            {
              "id": 21,
              "name": "Pete Sandoval",
              "slug": "pete-sandoval",
              "band": "Morbid Angel",
              "configString": "ddrum (specific pedal/hardware model unconfirmed)"
            }
          ]
        },
        {
          "brand": "Trick",
          "count": 2,
          "percent": 2.8,
          "drummers": [
            {
              "id": 17,
              "name": "Chris Adler",
              "slug": "chris-adler",
              "band": "Lamb of God",
              "configString": "Trick Pro V Double Pedal"
            },
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
          "brand": "Ludwig",
          "count": 1,
          "percent": 1.4,
          "drummers": [
            {
              "id": 30,
              "name": "Bill Ward",
              "slug": "bill-ward",
              "band": "Black Sabbath",
              "configString": "Ludwig Speed King Pedal"
            }
          ]
        },
        {
          "brand": "Mapex",
          "count": 1,
          "percent": 1.4,
          "drummers": [
            {
              "id": 37,
              "name": "Jason Bittner",
              "slug": "jason-bittner",
              "band": "Shadows Fall / Overkill / Category 7",
              "configString": "Mapex Falcon Double Pedal"
            }
          ]
        }
      ],
      "skippedCount": 2,
      "skipped": [
        {
          "slug": "nicko-mcbrain",
          "name": "Nicko McBrain",
          "raw": "Single Bass Drum Pedal"
        },
        {
          "slug": "john-longstreth",
          "name": "John Longstreth",
          "raw": "ACD Unlimited Bass Drum Pedals"
        }
      ]
    }
  }
};

export default MOST_USED_GEAR_BRANDS;
