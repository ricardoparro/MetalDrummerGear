/**
 * Study Membership Index — small derived slug/rank index for the link-derivation
 * helpers in packages/frontend/data/studies/links.js (getBrandStudyLinks/
 * getDrummerStudyLinks/getGenreStudyLinks). Exists so App.js's eager bundle and the
 * brand-page lazy chunks (PedalBrandPage.jsx etc.) never need to import the full
 * ~200KB of study datasets (mostUsedGearBrands.js/drumEndorsementLandscape.js/
 * tempoBySubgenre.js/kitConfigurations.js) just to check study membership (issue
 * #7150).
 *
 * GENERATED FILE — do not edit by hand.
 * Regenerate with: node scripts/compute-studies.cjs
 *
 * Source of truth: the same in-memory structures used to write mostUsedGearBrands.js,
 * drumEndorsementLandscape.js, tempoBySubgenre.js, and kitConfigurations.js above —
 * every field here is copied from those, never re-derived independently. Dataset
 * snapshot date: 2026-07-25.
 *
 * Consumed by: packages/frontend/data/studies/links.js only. Each individual
 * /studies/<slug> page reads its own full dataset directly instead (e.g.
 * MostUsedGearBrandsStudyPage.jsx imports mostUsedGearBrands.js); the STUDIES
 * registry's own headlineStat numbers come from studySummary.js, not this file.
 */

export const STUDY_MEMBERSHIP = {
  "generatedAt": "2026-07-25",
  "mostUsedGearBrands": {
    "categories": {
      "kits": {
        "label": "Drum Kits",
        "ranked": [
          {
            "brand": "Tama",
            "percent": 29.2
          },
          {
            "brand": "Pearl",
            "percent": 27.8
          },
          {
            "brand": "Sonor",
            "percent": 9.7
          },
          {
            "brand": "DW",
            "percent": 8.3
          },
          {
            "brand": "ddrum",
            "percent": 5.6
          },
          {
            "brand": "Mapex",
            "percent": 5.6
          },
          {
            "brand": "Ludwig",
            "percent": 4.2
          },
          {
            "brand": "SJC",
            "percent": 2.8
          },
          {
            "brand": "Noble & Cooley",
            "percent": 1.4
          },
          {
            "brand": "OCDP",
            "percent": 1.4
          },
          {
            "brand": "Yamaha",
            "percent": 1.4
          }
        ]
      },
      "snares": {
        "label": "Snares",
        "ranked": [
          {
            "brand": "Tama",
            "percent": 27.8
          },
          {
            "brand": "Pearl",
            "percent": 23.6
          },
          {
            "brand": "Sonor",
            "percent": 9.7
          },
          {
            "brand": "DW",
            "percent": 8.3
          },
          {
            "brand": "ddrum",
            "percent": 5.6
          },
          {
            "brand": "Mapex",
            "percent": 4.2
          },
          {
            "brand": "Ludwig",
            "percent": 2.8
          },
          {
            "brand": "SJC",
            "percent": 2.8
          },
          {
            "brand": "Noble & Cooley",
            "percent": 1.4
          },
          {
            "brand": "OCDP",
            "percent": 1.4
          },
          {
            "brand": "Yamaha",
            "percent": 1.4
          }
        ]
      },
      "cymbals": {
        "label": "Cymbals",
        "ranked": [
          {
            "brand": "Sabian",
            "percent": 30.6
          },
          {
            "brand": "Zildjian",
            "percent": 30.6
          },
          {
            "brand": "Paiste",
            "percent": 19.4
          },
          {
            "brand": "Meinl",
            "percent": 16.7
          }
        ]
      },
      "sticks": {
        "label": "Sticks",
        "ranked": [
          {
            "brand": "Vic Firth",
            "percent": 50
          },
          {
            "brand": "Promark",
            "percent": 26.4
          },
          {
            "brand": "Vater",
            "percent": 9.7
          },
          {
            "brand": "Wincent",
            "percent": 4.2
          },
          {
            "brand": "Tama",
            "percent": 2.8
          },
          {
            "brand": "Ahead",
            "percent": 1.4
          },
          {
            "brand": "Zildjian",
            "percent": 1.4
          }
        ]
      },
      "pedals": {
        "label": "Pedals",
        "ranked": [
          {
            "brand": "Tama",
            "percent": 30.6
          },
          {
            "brand": "DW",
            "percent": 19.4
          },
          {
            "brand": "Pearl",
            "percent": 19.4
          },
          {
            "brand": "Axis",
            "percent": 5.6
          },
          {
            "brand": "Sonor",
            "percent": 4.2
          },
          {
            "brand": "Czarcie Kopyto",
            "percent": 2.8
          },
          {
            "brand": "ddrum",
            "percent": 2.8
          },
          {
            "brand": "Trick",
            "percent": 2.8
          },
          {
            "brand": "Gibraltar",
            "percent": 1.4
          },
          {
            "brand": "Ludwig",
            "percent": 1.4
          },
          {
            "brand": "Mapex",
            "percent": 1.4
          }
        ]
      }
    },
    "topDrummerSlugs": [
      "lars-ulrich",
      "dave-lombardo",
      "eloy-casagrande",
      "charlie-benante",
      "mike-portnoy",
      "mario-duplantier",
      "brann-dailor",
      "alex-bent",
      "raymond-herrera",
      "blake-richardson",
      "ben-koller",
      "flo-mounier",
      "chris-turner",
      "derek-roddy",
      "dirk-verbeuren",
      "frost",
      "abe-cunningham",
      "daray",
      "tim-yeung",
      "adrian-erlandsson",
      "alex-rudinger",
      "gene-hoglan",
      "tomas-haake",
      "ray-luzier",
      "vinnie-paul",
      "shannon-larkin",
      "nick-augusto",
      "ryan-van-poederooyen",
      "richard-christy",
      "mike-mangini",
      "daniel-erlandsson",
      "kevin-talley",
      "martin-axenrot",
      "paul-bostaph",
      "nick-menza",
      "jon-dette",
      "jimmy-degrasso",
      "waltteri-vayrynen",
      "george-kollias",
      "danny-carey",
      "inferno",
      "hellhammer",
      "art-cruz",
      "navene-koperweis",
      "morgan-agren",
      "igor-cavalera",
      "matt-greiner",
      "martin-lopez",
      "travis-orbin",
      "nicko-mcbrain",
      "scott-travis",
      "gavin-harrison",
      "paul-mazurkiewicz",
      "matt-garstka",
      "jaska-raatikainen",
      "hannes-grossmann",
      "jocke-wallgren",
      "sean-reinert"
    ]
  },
  "drumEndorsementLandscape": {
    "brandReach": [
      {
        "brand": "Vic Firth",
        "percent": 50
      },
      {
        "brand": "Tama",
        "percent": 36.1
      },
      {
        "brand": "Sabian",
        "percent": 30.6
      },
      {
        "brand": "Zildjian",
        "percent": 30.6
      },
      {
        "brand": "Pearl",
        "percent": 29.2
      },
      {
        "brand": "Promark",
        "percent": 26.4
      },
      {
        "brand": "DW",
        "percent": 22.2
      },
      {
        "brand": "Paiste",
        "percent": 19.4
      },
      {
        "brand": "Meinl",
        "percent": 16.7
      },
      {
        "brand": "Sonor",
        "percent": 11.1
      },
      {
        "brand": "Vater",
        "percent": 9.7
      },
      {
        "brand": "Axis",
        "percent": 5.6
      },
      {
        "brand": "ddrum",
        "percent": 5.6
      },
      {
        "brand": "Mapex",
        "percent": 5.6
      },
      {
        "brand": "Ludwig",
        "percent": 4.2
      },
      {
        "brand": "Wincent",
        "percent": 4.2
      },
      {
        "brand": "Czarcie Kopyto",
        "percent": 2.8
      },
      {
        "brand": "SJC",
        "percent": 2.8
      },
      {
        "brand": "Trick",
        "percent": 2.8
      },
      {
        "brand": "Ahead",
        "percent": 1.4
      },
      {
        "brand": "Gibraltar",
        "percent": 1.4
      },
      {
        "brand": "Noble & Cooley",
        "percent": 1.4
      },
      {
        "brand": "OCDP",
        "percent": 1.4
      },
      {
        "brand": "Yamaha",
        "percent": 1.4
      }
    ],
    "topDrummerSlugs": [
      "george-kollias",
      "ray-luzier",
      "vinnie-paul",
      "charlie-benante",
      "danny-carey",
      "inferno",
      "hellhammer",
      "art-cruz",
      "navene-koperweis",
      "alex-bent",
      "shannon-larkin",
      "morgan-agren",
      "igor-cavalera",
      "matt-greiner",
      "blake-richardson",
      "ben-koller",
      "flo-mounier",
      "ryan-van-poederooyen",
      "martin-lopez",
      "travis-orbin",
      "chris-turner",
      "nicko-mcbrain",
      "scott-travis",
      "frost",
      "gavin-harrison",
      "richard-christy",
      "paul-mazurkiewicz",
      "matt-garstka",
      "jaska-raatikainen",
      "hannes-grossmann",
      "daray",
      "jocke-wallgren",
      "tim-yeung",
      "kevin-talley",
      "sean-reinert",
      "adrian-erlandsson"
    ]
  },
  "tempoBySubgenre": {
    "genres": [
      {
        "genre": "thrash-metal",
        "label": "Thrash Metal",
        "avgBpm": 166.9,
        "songCount": 37
      },
      {
        "genre": "heavy-metal",
        "label": "Heavy Metal",
        "avgBpm": 131.5,
        "songCount": 32
      },
      {
        "genre": "death-metal",
        "label": "Death Metal",
        "avgBpm": 176.9,
        "songCount": 27
      },
      {
        "genre": "groove-metal",
        "label": "Groove Metal",
        "avgBpm": 117.8,
        "songCount": 25
      },
      {
        "genre": "progressive-metal",
        "label": "Progressive Metal",
        "avgBpm": 127.2,
        "songCount": 25
      },
      {
        "genre": "nu-metal",
        "label": "Nu Metal",
        "avgBpm": 121.8,
        "songCount": 22
      },
      {
        "genre": "metalcore",
        "label": "Metalcore",
        "avgBpm": 147.8,
        "songCount": 20
      },
      {
        "genre": "djent",
        "label": "Djent",
        "avgBpm": 126.7,
        "songCount": 13
      },
      {
        "genre": "progressive-death-metal",
        "label": "Progressive Death Metal",
        "avgBpm": 117,
        "songCount": 9
      },
      {
        "genre": "black-metal",
        "label": "Black Metal",
        "avgBpm": 169.4,
        "songCount": 8
      },
      {
        "genre": "doom-metal",
        "label": "Doom Metal",
        "avgBpm": 60.3,
        "songCount": 7
      },
      {
        "genre": "alternative-metal",
        "label": "Alternative Metal",
        "avgBpm": 107.6,
        "songCount": 5
      },
      {
        "genre": "blackened-death-metal",
        "label": "Blackened Death Metal",
        "avgBpm": 153,
        "songCount": 5
      },
      {
        "genre": "melodic-death-metal",
        "label": "Melodic Death Metal",
        "avgBpm": 187.8,
        "songCount": 5
      },
      {
        "genre": "deathcore",
        "label": "Deathcore",
        "avgBpm": 121.7,
        "songCount": 3
      },
      {
        "genre": "symphonic-black-metal",
        "label": "Symphonic Black Metal",
        "avgBpm": 165,
        "songCount": 3
      },
      {
        "genre": "technical-death-metal",
        "label": "Technical Death Metal",
        "avgBpm": 219.3,
        "songCount": 3
      },
      {
        "genre": "progressive-sludge-metal",
        "label": "Progressive Sludge Metal",
        "avgBpm": 117.5,
        "songCount": 2
      },
      {
        "genre": "industrial-metal",
        "label": "Industrial Metal",
        "avgBpm": 112,
        "songCount": 1
      },
      {
        "genre": "mathcore",
        "label": "Mathcore",
        "avgBpm": 168,
        "songCount": 1
      },
      {
        "genre": "power-metal",
        "label": "Power Metal",
        "avgBpm": 170,
        "songCount": 1
      }
    ]
  },
  "kitConfigurations": {
    "genres": [
      "Progressive Metal",
      "Thrash Metal",
      "Death Metal",
      "Heavy Metal",
      "Technical Death Metal",
      "Black Metal",
      "Melodic Death Metal",
      "Metalcore",
      "Nu Metal",
      "Groove Metal",
      "Progressive",
      "Progressive Death Metal"
    ]
  }
};

export default STUDY_MEMBERSHIP;
