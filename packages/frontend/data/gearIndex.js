/**
 * Gear Index — brand → series → drummers-using mapping.
 * Issue #995 (split 1/4 of #871): data layer for /gear/<brand>/<series>/drummers-using.
 *
 * GENERATED FILE — do not edit by hand.
 * Regenerate with: node scripts/build-gear-index.cjs
 *
 * Source of truth: api/drummers/index.js (current gear fields only).
 * Series used by fewer than 2 drummers are omitted.
 *
 * Shape: GEAR_INDEX = { [brand]: { [series]: [{ id, name, slug, configString }] } }
 *
 * Issue #3714: GEAR_INDEX_BRAND_LEVEL is a sibling brand-only index sourced from the
 * `heads` field (drumhead brands are almost always model-less — see file header).
 * Shape: GEAR_INDEX_BRAND_LEVEL = { [brand]: [{ id, name, slug, configString }] }
 */

export const GEAR_INDEX = {
  "DW": {
    "5000 Double Pedal": [
      {
        "id": 64,
        "name": "Sean Reinert",
        "slug": "sean-reinert",
        "configString": "DW 5000 Double Pedal"
      },
      {
        "id": 65,
        "name": "Nick Menza",
        "slug": "nick-menza",
        "configString": "DW 5000 Double Pedal"
      }
    ],
    "9000 Series Double Pedal, DW 9100 Throne": [
      {
        "id": 10,
        "name": "Jay Weinberg",
        "slug": "jay-weinberg",
        "configString": "DW 9000 Series Double Pedal, DW 9100 Throne"
      },
      {
        "id": 32,
        "name": "Matt Greiner",
        "slug": "matt-greiner",
        "configString": "DW 9000 Series Double Pedal, DW 9100 Throne"
      }
    ]
  },
  "Ludwig": {
    "Classic Maple": [
      {
        "id": 30,
        "name": "Bill Ward",
        "slug": "bill-ward",
        "configString": "Ludwig Classic Maple"
      },
      {
        "id": 67,
        "name": "Jon Dette",
        "slug": "jon-dette",
        "configString": "Ludwig Classic Maple"
      }
    ]
  },
  "Mapex": {
    "Black Panther Design Lab": [
      {
        "id": 17,
        "name": "Chris Adler",
        "slug": "chris-adler",
        "configString": "Mapex Black Panther Design Lab"
      },
      {
        "id": 32,
        "name": "Matt Greiner",
        "slug": "matt-greiner",
        "configString": "Mapex Black Panther Design Lab"
      }
    ],
    "Falcon Double Pedal, Mapex T865 Throne": [
      {
        "id": 17,
        "name": "Chris Adler",
        "slug": "chris-adler",
        "configString": "Mapex Falcon Double Pedal, Mapex T865 Throne"
      },
      {
        "id": 23,
        "name": "Arin Ilejay",
        "slug": "arin-ilejay",
        "configString": "Mapex Falcon Double Pedal, Mapex T865 Throne"
      },
      {
        "id": 37,
        "name": "Jason Bittner",
        "slug": "jason-bittner",
        "configString": "Mapex Falcon Double Pedal, Mapex T865 Throne"
      }
    ]
  },
  "Meinl": {
    "Byzance": [
      {
        "id": 16,
        "name": "Brann Dailor",
        "slug": "brann-dailor",
        "configString": "Meinl Byzance Series (14\" Dark Hi-Hats, 18\" & 19\" Brilliant Heavy Hammered Crashes, 21\" Ghost Ride, 18\" Extra Dry China)"
      },
      {
        "id": 17,
        "name": "Chris Adler",
        "slug": "chris-adler",
        "configString": "Meinl Byzance Series (14\" Dark Hi-Hats, 18\" & 19\" Dark Crashes, 21\" Transition Ride, 18\" Extra Dry China)"
      },
      {
        "id": 18,
        "name": "Matt Halpern",
        "slug": "matt-halpern",
        "configString": "Meinl Byzance Series (15\" Dark Hi-Hats, 18\" & 20\" Extra Dry Medium Crashes, 22\" Transition Ride, 18\" Extra Dry China)"
      },
      {
        "id": 24,
        "name": "Navene Koperweis",
        "slug": "navene-koperweis",
        "configString": "Meinl Byzance Series (15\" Dual Hi-Hats, 18\" & 19\" Extra Dry Medium Crashes, 21\" Transition Ride, 18\" Extra Dry China, 10\" Splash)"
      },
      {
        "id": 40,
        "name": "Chris Turner",
        "slug": "chris-turner",
        "configString": "Meinl Byzance Series (15\" Dual Hi-Hats, 18\" & 20\" Extra Dry Medium Crashes, 22\" Dual Ride, 18\" Extra Dry China)"
      },
      {
        "id": 53,
        "name": "Matt Garstka",
        "slug": "matt-garstka",
        "configString": "Meinl Byzance Series (15\" Dual Hi-Hats, 18\" & 20\" Extra Dry Medium Crashes, 22\" Dual Ride)"
      },
      {
        "id": 56,
        "name": "Hannes Grossmann",
        "slug": "hannes-grossmann",
        "configString": "Meinl Byzance Series (14\" Byzance Traditional Hi-Hats, 18\" & 19\" Byzance Brilliant Crashes, 21\" Byzance Traditional Ride)"
      },
      {
        "id": 62,
        "name": "Martin Axenrot",
        "slug": "martin-axenrot",
        "configString": "Meinl Byzance Series (14\" Traditional Medium Hi-Hats, 16\" & 18\" & 19\" Crashes, 22\" Traditional Ride, 18\" China)"
      }
    ]
  },
  "Paiste": {
    "RUDE & 2002": [
      {
        "id": 2,
        "name": "Joey Jordison",
        "slug": "joey-jordison",
        "configString": "Paiste RUDE & 2002 Series (14\" Wild Hi-Hats, 16\", 17\", 18\", 19\" Power Crashes, 20\" & 22\" Wild Chinas, 22\" Power Ride)"
      },
      {
        "id": 4,
        "name": "Dave Lombardo",
        "slug": "dave-lombardo",
        "configString": "Paiste RUDE & 2002 Series (15\" Sound Edge Hi-Hats, 18\" & 19\" Crashes, 22\" Reign Power Ride, 18\" China)"
      },
      {
        "id": 12,
        "name": "Charlie Benante",
        "slug": "charlie-benante",
        "configString": "Paiste RUDE & 2002 Series (14\" Hi-Hats, 18\" & 19\" Crashes, 20\" Power Ride, 18\" China)"
      },
      {
        "id": 29,
        "name": "Igor Cavalera",
        "slug": "igor-cavalera",
        "configString": "Paiste RUDE & 2002 Series (14\" RUDE Hi-Hats, 18\" & 19\" RUDE Crashes, 22\" RUDE Power Ride, 18\" 2002 China)"
      },
      {
        "id": 42,
        "name": "Scott Travis",
        "slug": "scott-travis",
        "configString": "Paiste RUDE & 2002 Series (14\" RUDE Hi-Hats, 18\" & 19\" RUDE Crashes, 22\" RUDE Power Ride, 18\" RUDE China)"
      },
      {
        "id": 54,
        "name": "Daniel Erlandsson",
        "slug": "daniel-erlandsson",
        "configString": "Paiste RUDE & 2002 Series (14\" RUDE Hi-Hats, 18\" & 19\" RUDE Crashes, 22\" RUDE Power Ride)"
      },
      {
        "id": 57,
        "name": "Daray",
        "slug": "daray",
        "configString": "Paiste RUDE & 2002 Series (14\" RUDE Hi-Hats, 17\" & 18\" RUDE Crashes, 22\" RUDE Power Ride)"
      }
    ],
    "Signature": [
      {
        "id": 14,
        "name": "Danny Carey",
        "slug": "danny-carey",
        "configString": "Paiste Signature Series (14\" Sound Edge Hi-Hats, 18\" & 20\" Power Crashes, 22\" Dry Heavy Ride \"Monad\", 2002 & Signature China cymbals)"
      },
      {
        "id": 43,
        "name": "Mikkey Dee",
        "slug": "mikkey-dee",
        "configString": "Paiste Signature Series (14\" Sound Edge Hi-Hats, 19\" & 20\" Power Crashes, 22\" Power Ride, 18\" Heavy China)"
      }
    ]
  },
  "Pearl": {
    "Demon Drive Double Pedal": [
      {
        "id": 51,
        "name": "Paul Mazurkiewicz",
        "slug": "paul-mazurkiewicz",
        "configString": "Pearl Demon Drive Double Pedal"
      },
      {
        "id": 54,
        "name": "Daniel Erlandsson",
        "slug": "daniel-erlandsson",
        "configString": "Pearl Demon Drive Double Pedal"
      },
      {
        "id": 58,
        "name": "Jocke Wallgren",
        "slug": "jocke-wallgren",
        "configString": "Pearl Demon Drive Double Pedal"
      }
    ],
    "Demon Drive Double Pedal, Pearl D-2000 Throne": [
      {
        "id": 3,
        "name": "Gene Hoglan",
        "slug": "gene-hoglan",
        "configString": "Pearl Demon Drive Double Pedal, Pearl D-2000 Throne"
      },
      {
        "id": 18,
        "name": "Matt Halpern",
        "slug": "matt-halpern",
        "configString": "Pearl Demon Drive Double Pedal, Pearl D-2000 Throne"
      },
      {
        "id": 31,
        "name": "Nick Augusto",
        "slug": "nick-augusto",
        "configString": "Pearl Demon Drive Double Pedal, Pearl D-2000 Throne"
      }
    ],
    "Demon Drive Double Pedal, Pearl D-3000 Throne": [
      {
        "id": 35,
        "name": "Flo Mounier",
        "slug": "flo-mounier",
        "configString": "Pearl Demon Drive Double Pedal, Pearl D-3000 Throne"
      },
      {
        "id": 36,
        "name": "Ryan Van Poederooyen",
        "slug": "ryan-van-poederooyen",
        "configString": "Pearl Demon Drive Double Pedal, Pearl D-3000 Throne"
      }
    ],
    "Eliminator Double Pedal": [
      {
        "id": 55,
        "name": "Jaska Raatikainen",
        "slug": "jaska-raatikainen",
        "configString": "Pearl Eliminator Double Pedal"
      },
      {
        "id": 60,
        "name": "Kevin Talley",
        "slug": "kevin-talley",
        "configString": "Pearl Eliminator Double Pedal"
      },
      {
        "id": 63,
        "name": "Paul Bostaph",
        "slug": "paul-bostaph",
        "configString": "Pearl Eliminator Double Pedal"
      }
    ],
    "Masters 14x5.5\" Maple": [
      {
        "id": 35,
        "name": "Flo Mounier",
        "slug": "flo-mounier",
        "configString": "Pearl Masters 14x5.5\" Maple"
      },
      {
        "id": 55,
        "name": "Jaska Raatikainen",
        "slug": "jaska-raatikainen",
        "configString": "Pearl Masters 14x5.5\" Maple"
      },
      {
        "id": 60,
        "name": "Kevin Talley",
        "slug": "kevin-talley",
        "configString": "Pearl Masters 14x5.5\" Maple"
      }
    ],
    "Masters Maple Complete": [
      {
        "id": 35,
        "name": "Flo Mounier",
        "slug": "flo-mounier",
        "configString": "Pearl Masters Maple Complete"
      },
      {
        "id": 51,
        "name": "Paul Mazurkiewicz",
        "slug": "paul-mazurkiewicz",
        "configString": "Pearl Masters Maple Complete"
      },
      {
        "id": 63,
        "name": "Paul Bostaph",
        "slug": "paul-bostaph",
        "configString": "Pearl Masters Maple Complete (MCX)"
      }
    ],
    "Masterworks Stadium Exotic": [
      {
        "id": 6,
        "name": "George Kollias",
        "slug": "george-kollias",
        "configString": "Pearl Masterworks Stadium Exotic (Piano Black with Gold Hardware)"
      },
      {
        "id": 57,
        "name": "Daray",
        "slug": "daray",
        "configString": "Pearl Masterworks Stadium Exotic"
      }
    ],
    "Reference": [
      {
        "id": 2,
        "name": "Joey Jordison",
        "slug": "joey-jordison",
        "configString": "Pearl Reference Series"
      },
      {
        "id": 8,
        "name": "Ray Luzier",
        "slug": "ray-luzier",
        "configString": "Pearl Reference Series"
      },
      {
        "id": 18,
        "name": "Matt Halpern",
        "slug": "matt-halpern",
        "configString": "Pearl Reference Series"
      },
      {
        "id": 36,
        "name": "Ryan Van Poederooyen",
        "slug": "ryan-van-poederooyen",
        "configString": "Pearl Reference Series"
      },
      {
        "id": 50,
        "name": "Aquiles Priester",
        "slug": "aquiles-priester",
        "configString": "Pearl Reference Series"
      },
      {
        "id": 52,
        "name": "Mike Mangini",
        "slug": "mike-mangini",
        "configString": "Pearl Reference Series"
      }
    ],
    "Reference 14x6.5\" Brass": [
      {
        "id": 3,
        "name": "Gene Hoglan",
        "slug": "gene-hoglan",
        "configString": "Pearl Reference 14x6.5\" Brass"
      },
      {
        "id": 8,
        "name": "Ray Luzier",
        "slug": "ray-luzier",
        "configString": "Pearl Reference 14x6.5\" Brass"
      },
      {
        "id": 18,
        "name": "Matt Halpern",
        "slug": "matt-halpern",
        "configString": "Pearl Reference 14x6.5\" Brass"
      },
      {
        "id": 31,
        "name": "Nick Augusto",
        "slug": "nick-augusto",
        "configString": "Pearl Reference 14x6.5\" Brass"
      },
      {
        "id": 36,
        "name": "Ryan Van Poederooyen",
        "slug": "ryan-van-poederooyen",
        "configString": "Pearl Reference 14x6.5\" Brass"
      },
      {
        "id": 50,
        "name": "Aquiles Priester",
        "slug": "aquiles-priester",
        "configString": "Pearl Reference 14x6.5\" Brass"
      },
      {
        "id": 58,
        "name": "Jocke Wallgren",
        "slug": "jocke-wallgren",
        "configString": "Pearl Reference 14x6.5\" Brass"
      }
    ],
    "Reference Pure": [
      {
        "id": 3,
        "name": "Gene Hoglan",
        "slug": "gene-hoglan",
        "configString": "Pearl Reference Pure"
      },
      {
        "id": 25,
        "name": "Alex Bent",
        "slug": "alex-bent",
        "configString": "Pearl Reference Pure Series"
      },
      {
        "id": 31,
        "name": "Nick Augusto",
        "slug": "nick-augusto",
        "configString": "Pearl Reference Pure"
      },
      {
        "id": 54,
        "name": "Daniel Erlandsson",
        "slug": "daniel-erlandsson",
        "configString": "Pearl Reference Pure"
      },
      {
        "id": 58,
        "name": "Jocke Wallgren",
        "slug": "jocke-wallgren",
        "configString": "Pearl Reference Pure"
      }
    ]
  },
  "Sabian": {
    "AAX": [
      {
        "id": 3,
        "name": "Gene Hoglan",
        "slug": "gene-hoglan",
        "configString": "Sabian AAX Series (15\" Hi-Hats, 18\" & 20\" Crashes, 22\" Ride, 20\" China)"
      },
      {
        "id": 8,
        "name": "Ray Luzier",
        "slug": "ray-luzier",
        "configString": "Sabian AAX Series (14\" Stage Hi-Hats, 18\" & 19\" X-Plosion Crashes, 21\" Stage Ride, 18\" AAXtreme China)"
      },
      {
        "id": 31,
        "name": "Nick Augusto",
        "slug": "nick-augusto",
        "configString": "Sabian AAX Series (14\" Stage Hi-Hats, 18\" & 19\" X-Plosion Crashes, 21\" Stage Ride, 18\" AAXtreme China)"
      },
      {
        "id": 51,
        "name": "Paul Mazurkiewicz",
        "slug": "paul-mazurkiewicz",
        "configString": "Sabian AAX Series (14\" Stage Hi-Hats, 18\" & 19\" X-Plosion Crashes, 21\" Raw Bell Dry Ride, 18\" AAXtreme China)"
      },
      {
        "id": 60,
        "name": "Kevin Talley",
        "slug": "kevin-talley",
        "configString": "Sabian AAX Series (14\" Stage Hi-Hats, 17\" & 18\" X-Plosion Crashes, 20\" Stage Ride)"
      },
      {
        "id": 63,
        "name": "Paul Bostaph",
        "slug": "paul-bostaph",
        "configString": "Sabian AAX Series (14\" AAX Stage Hi-Hats, 17\" & 19\" AAX X-Plosion Crashes, 21\" AAX Stage Ride, 18\" AAXtreme China)"
      }
    ],
    "AAX & HHX": [
      {
        "id": 26,
        "name": "Shannon Larkin",
        "slug": "shannon-larkin",
        "configString": "Sabian AAX & HHX Series (14\" AAX Stage Hi-Hats, 18\" & 19\" AAX X-Plosion Crashes, 21\" HHX Raw Bell Dry Ride, 10\" AAX Splash, 18\" AAX Chinese)"
      },
      {
        "id": 35,
        "name": "Flo Mounier",
        "slug": "flo-mounier",
        "configString": "Sabian AAX & HHX Series (14\" HHX Stage Hi-Hats, 17\" & 18\" AAX X-Plosion Crashes, 21\" HHX Raw Bell Dry Ride, 18\" AAXtreme China)"
      },
      {
        "id": 49,
        "name": "Richard Christy",
        "slug": "richard-christy",
        "configString": "Sabian AAX & HHX Series (14\" AAX Stage Hi-Hats, 18\" & 19\" AAX X-Plosion Crashes, 21\" HHX Raw Bell Dry Ride, 18\" AAX Chinese)"
      },
      {
        "id": 59,
        "name": "Tim Yeung",
        "slug": "tim-yeung",
        "configString": "Sabian AAX & HHX Series (14\" AAX Stage Hi-Hats, 18\" & 19\" AAX X-Plosion Crashes, 21\" HHX Raw Bell Dry Ride)"
      }
    ],
    "HHX & AAX": [
      {
        "id": 5,
        "name": "Tomas Haake",
        "slug": "tomas-haake",
        "configString": "Sabian HHX & AAX Series (14\" HHX Compression Hi-Hats, 15\" Artisan Hi-Hats, 19\" & 20\" & 21\" HHX Stage Crashes, 22\" Legacy Ride, 19\" AAXtreme China)"
      },
      {
        "id": 36,
        "name": "Ryan Van Poederooyen",
        "slug": "ryan-van-poederooyen",
        "configString": "Sabian HHX & AAX Series (14\" HHX Evolution Hi-Hats, 18\" & 20\" HHX Evolution Crashes, 21\" HHX Raw Bell Dry Ride, 19\" AAXtreme China)"
      },
      {
        "id": 50,
        "name": "Aquiles Priester",
        "slug": "aquiles-priester",
        "configString": "Sabian HHX & AAX Series (14\" HHX Evolution Hi-Hats, 18\" & 19\" HHX X-Plosion Crashes, 21\" HHX Groove Ride, 18\" AAX Chinese)"
      },
      {
        "id": 52,
        "name": "Mike Mangini",
        "slug": "mike-mangini",
        "configString": "Sabian HHX & AAX Series (14\" HHX Evolution Hi-Hats, 17\", 18\", 19\" HHX Evolution Crashes, 21\" HHX Raw Bell Dry Ride)"
      }
    ]
  },
  "Sonor": {
    "SQ2": [
      {
        "id": 43,
        "name": "Mikkey Dee",
        "slug": "mikkey-dee",
        "configString": "Sonor SQ2"
      },
      {
        "id": 47,
        "name": "Gavin Harrison",
        "slug": "gavin-harrison",
        "configString": "Sonor SQ2 Series"
      },
      {
        "id": 62,
        "name": "Martin Axenrot",
        "slug": "martin-axenrot",
        "configString": "Sonor SQ2 Series"
      }
    ],
    "SQ2 Heavy Beech": [
      {
        "id": 5,
        "name": "Tomas Haake",
        "slug": "tomas-haake",
        "configString": "Sonor SQ2 Heavy Beech (24\"x18\" Bass, 10\"x8\", 12\"x9\", 13\"x10\", 16\"x14\", 18\"x16\" Toms)"
      },
      {
        "id": 14,
        "name": "Danny Carey",
        "slug": "danny-carey",
        "configString": "Sonor SQ2 Heavy Beech"
      },
      {
        "id": 20,
        "name": "Hellhammer",
        "slug": "hellhammer",
        "configString": "Sonor SQ2 Heavy Beech"
      }
    ]
  },
  "Tama": {
    "S.L.P. 14x6.5\" G-Maple": [
      {
        "id": 4,
        "name": "Dave Lombardo",
        "slug": "dave-lombardo",
        "configString": "Tama S.L.P. 14x6.5\" G-Maple"
      },
      {
        "id": 15,
        "name": "Mario Duplantier",
        "slug": "mario-duplantier",
        "configString": "Tama S.L.P. 14x6.5\" G-Maple"
      },
      {
        "id": 16,
        "name": "Brann Dailor",
        "slug": "brann-dailor",
        "configString": "Tama S.L.P. 14x6.5\" G-Maple"
      },
      {
        "id": 29,
        "name": "Igor Cavalera",
        "slug": "igor-cavalera",
        "configString": "Tama S.L.P. 14x6.5\" G-Maple"
      }
    ],
    "S.L.P. Big Black Steel 14x6.5\"": [
      {
        "id": 45,
        "name": "Dirk Verbeuren",
        "slug": "dirk-verbeuren",
        "configString": "Tama S.L.P. Big Black Steel 14x6.5\""
      },
      {
        "id": 59,
        "name": "Tim Yeung",
        "slug": "tim-yeung",
        "configString": "Tama S.L.P. Big Black Steel 14x6.5\""
      }
    ],
    "Speed Cobra 910 Double Pedal": [
      {
        "id": 44,
        "name": "Derek Roddy",
        "slug": "derek-roddy",
        "configString": "Tama Speed Cobra 910 Double Pedal"
      },
      {
        "id": 53,
        "name": "Matt Garstka",
        "slug": "matt-garstka",
        "configString": "Tama Speed Cobra 910 Double Pedal"
      },
      {
        "id": 59,
        "name": "Tim Yeung",
        "slug": "tim-yeung",
        "configString": "Tama Speed Cobra 910 Double Pedal"
      }
    ],
    "Starclassic": [
      {
        "id": 12,
        "name": "Charlie Benante",
        "slug": "charlie-benante",
        "configString": "Tama Starclassic"
      },
      {
        "id": 27,
        "name": "Raymond Herrera",
        "slug": "raymond-herrera",
        "configString": "Tama Starclassic"
      }
    ],
    "Starclassic Bubinga": [
      {
        "id": 7,
        "name": "Eloy Casagrande",
        "slug": "eloy-casagrande",
        "configString": "Tama Starclassic Bubinga (22\"x16\" & 24\"x14\" Bass Drums, 10\", 12\", 13\" Toms, 16\" & 18\" Floor Toms)"
      },
      {
        "id": 15,
        "name": "Mario Duplantier",
        "slug": "mario-duplantier",
        "configString": "Tama Starclassic Bubinga (22\"x18\" Bass Drums x2, 12\"x9\" & 13\"x10\" Toms, 16\"x16\" Floor Tom)"
      },
      {
        "id": 33,
        "name": "Blake Richardson",
        "slug": "blake-richardson",
        "configString": "Tama Starclassic Bubinga (Custom Finish)"
      },
      {
        "id": 44,
        "name": "Derek Roddy",
        "slug": "derek-roddy",
        "configString": "Tama Starclassic Bubinga"
      },
      {
        "id": 46,
        "name": "Frost",
        "slug": "frost",
        "configString": "Tama Starclassic Bubinga"
      },
      {
        "id": 48,
        "name": "Abe Cunningham",
        "slug": "abe-cunningham",
        "configString": "Tama Starclassic Bubinga (Egyptian Night Mist)"
      },
      {
        "id": 59,
        "name": "Tim Yeung",
        "slug": "tim-yeung",
        "configString": "Tama Starclassic Bubinga"
      },
      {
        "id": 66,
        "name": "Adrian Erlandsson",
        "slug": "adrian-erlandsson",
        "configString": "Tama Starclassic Bubinga"
      }
    ],
    "Starclassic Maple": [
      {
        "id": 1,
        "name": "Lars Ulrich",
        "slug": "lars-ulrich",
        "configString": "Tama Starclassic Maple"
      },
      {
        "id": 4,
        "name": "Dave Lombardo",
        "slug": "dave-lombardo",
        "configString": "Tama Starclassic Maple"
      },
      {
        "id": 29,
        "name": "Igor Cavalera",
        "slug": "igor-cavalera",
        "configString": "Tama Starclassic Maple"
      },
      {
        "id": 34,
        "name": "Ben Koller",
        "slug": "ben-koller",
        "configString": "Tama Starclassic Maple"
      }
    ],
    "Starclassic Performer B/B": [
      {
        "id": 16,
        "name": "Brann Dailor",
        "slug": "brann-dailor",
        "configString": "Tama Starclassic Performer B/B"
      },
      {
        "id": 70,
        "name": "Alex Rüdinger",
        "slug": "alex-rudinger",
        "configString": "Tama Starclassic Performer B/B"
      }
    ]
  },
  "Vic Firth": {
    "American Classic 5A": [
      {
        "id": 23,
        "name": "Arin Ilejay",
        "slug": "arin-ilejay",
        "configString": "Vic Firth American Classic 5A"
      },
      {
        "id": 28,
        "name": "Morgan Ågren",
        "slug": "morgan-agren",
        "configString": "Vic Firth American Classic 5A"
      },
      {
        "id": 35,
        "name": "Flo Mounier",
        "slug": "flo-mounier",
        "configString": "Vic Firth American Classic 5A"
      },
      {
        "id": 38,
        "name": "Martin Lopez",
        "slug": "martin-lopez",
        "configString": "Vic Firth American Classic 5A"
      },
      {
        "id": 40,
        "name": "Chris Turner",
        "slug": "chris-turner",
        "configString": "Vic Firth American Classic 5A"
      },
      {
        "id": 49,
        "name": "Richard Christy",
        "slug": "richard-christy",
        "configString": "Vic Firth American Classic 5A"
      },
      {
        "id": 55,
        "name": "Jaska Raatikainen",
        "slug": "jaska-raatikainen",
        "configString": "Vic Firth American Classic 5A"
      },
      {
        "id": 59,
        "name": "Tim Yeung",
        "slug": "tim-yeung",
        "configString": "Vic Firth American Classic 5A"
      },
      {
        "id": 64,
        "name": "Sean Reinert",
        "slug": "sean-reinert",
        "configString": "Vic Firth American Classic 5A"
      }
    ],
    "American Classic 5B": [
      {
        "id": 20,
        "name": "Hellhammer",
        "slug": "hellhammer",
        "configString": "Vic Firth American Classic 5B"
      },
      {
        "id": 22,
        "name": "Art Cruz",
        "slug": "art-cruz",
        "configString": "Vic Firth American Classic 5B"
      },
      {
        "id": 24,
        "name": "Navene Koperweis",
        "slug": "navene-koperweis",
        "configString": "Vic Firth American Classic 5B"
      },
      {
        "id": 25,
        "name": "Alex Bent",
        "slug": "alex-bent",
        "configString": "Vic Firth American Classic 5B"
      },
      {
        "id": 26,
        "name": "Shannon Larkin",
        "slug": "shannon-larkin",
        "configString": "Vic Firth American Classic 5B"
      },
      {
        "id": 29,
        "name": "Igor Cavalera",
        "slug": "igor-cavalera",
        "configString": "Vic Firth American Classic 5B"
      },
      {
        "id": 31,
        "name": "Nick Augusto",
        "slug": "nick-augusto",
        "configString": "Vic Firth American Classic 5B"
      },
      {
        "id": 34,
        "name": "Ben Koller",
        "slug": "ben-koller",
        "configString": "Vic Firth American Classic 5B"
      },
      {
        "id": 36,
        "name": "Ryan Van Poederooyen",
        "slug": "ryan-van-poederooyen",
        "configString": "Vic Firth American Classic 5B"
      },
      {
        "id": 39,
        "name": "Travis Orbin",
        "slug": "travis-orbin",
        "configString": "Vic Firth American Classic 5B"
      },
      {
        "id": 42,
        "name": "Scott Travis",
        "slug": "scott-travis",
        "configString": "Vic Firth American Classic 5B"
      },
      {
        "id": 51,
        "name": "Paul Mazurkiewicz",
        "slug": "paul-mazurkiewicz",
        "configString": "Vic Firth American Classic 5B"
      },
      {
        "id": 54,
        "name": "Daniel Erlandsson",
        "slug": "daniel-erlandsson",
        "configString": "Vic Firth American Classic 5B"
      },
      {
        "id": 56,
        "name": "Hannes Grossmann",
        "slug": "hannes-grossmann",
        "configString": "Vic Firth American Classic 5B"
      },
      {
        "id": 58,
        "name": "Jocke Wallgren",
        "slug": "jocke-wallgren",
        "configString": "Vic Firth American Classic 5B"
      },
      {
        "id": 60,
        "name": "Kevin Talley",
        "slug": "kevin-talley",
        "configString": "Vic Firth American Classic 5B"
      },
      {
        "id": 62,
        "name": "Martin Axenrot",
        "slug": "martin-axenrot",
        "configString": "Vic Firth American Classic 5B"
      },
      {
        "id": 65,
        "name": "Nick Menza",
        "slug": "nick-menza",
        "configString": "Vic Firth American Classic 5B"
      }
    ],
    "American Classic Extreme 5B": [
      {
        "id": 46,
        "name": "Frost",
        "slug": "frost",
        "configString": "Vic Firth American Classic Extreme 5B"
      },
      {
        "id": 57,
        "name": "Daray",
        "slug": "daray",
        "configString": "Vic Firth American Classic Extreme 5B"
      }
    ]
  },
  "Zildjian": {
    "A Custom & K Custom": [
      {
        "id": 55,
        "name": "Jaska Raatikainen",
        "slug": "jaska-raatikainen",
        "configString": "Zildjian A Custom & K Custom Series (14\" A Custom Hi-Hats, 17\" & 18\" A Custom Crashes, 20\" K Custom Ride)"
      },
      {
        "id": 58,
        "name": "Jocke Wallgren",
        "slug": "jocke-wallgren",
        "configString": "Zildjian A Custom & K Custom Series (14\" A Custom Hi-Hats, 18\" & 19\" A Custom Crashes, 21\" K Custom Ride)"
      }
    ]
  }
};

export const GEAR_INDEX_BRAND_LEVEL = {
  "Evans": [
    {
      "id": 2,
      "name": "Joey Jordison",
      "slug": "joey-jordison",
      "configString": "Evans"
    },
    {
      "id": 3,
      "name": "Gene Hoglan",
      "slug": "gene-hoglan",
      "configString": "Evans"
    },
    {
      "id": 6,
      "name": "George Kollias",
      "slug": "george-kollias",
      "configString": "Evans"
    },
    {
      "id": 7,
      "name": "Eloy Casagrande",
      "slug": "eloy-casagrande",
      "configString": "Evans"
    },
    {
      "id": 10,
      "name": "Jay Weinberg",
      "slug": "jay-weinberg",
      "configString": "Evans Black Chrome"
    },
    {
      "id": 22,
      "name": "Art Cruz",
      "slug": "art-cruz",
      "configString": "Evans"
    },
    {
      "id": 23,
      "name": "Arin Ilejay",
      "slug": "arin-ilejay",
      "configString": "Evans"
    },
    {
      "id": 24,
      "name": "Navene Koperweis",
      "slug": "navene-koperweis",
      "configString": "Evans"
    },
    {
      "id": 26,
      "name": "Shannon Larkin",
      "slug": "shannon-larkin",
      "configString": "Evans"
    },
    {
      "id": 29,
      "name": "Igor Cavalera",
      "slug": "igor-cavalera",
      "configString": "Evans"
    },
    {
      "id": 31,
      "name": "Nick Augusto",
      "slug": "nick-augusto",
      "configString": "Evans"
    },
    {
      "id": 32,
      "name": "Matt Greiner",
      "slug": "matt-greiner",
      "configString": "Evans G2 / EMAD2"
    },
    {
      "id": 33,
      "name": "Blake Richardson",
      "slug": "blake-richardson",
      "configString": "Evans (Hybrid on snare, EMAD on kicks, EC2 SST on toms)"
    },
    {
      "id": 35,
      "name": "Flo Mounier",
      "slug": "flo-mounier",
      "configString": "Evans"
    },
    {
      "id": 36,
      "name": "Ryan Van Poederooyen",
      "slug": "ryan-van-poederooyen",
      "configString": "Evans"
    },
    {
      "id": 37,
      "name": "Jason Bittner",
      "slug": "jason-bittner",
      "configString": "Evans"
    },
    {
      "id": 39,
      "name": "Travis Orbin",
      "slug": "travis-orbin",
      "configString": "Evans"
    },
    {
      "id": 40,
      "name": "Chris Turner",
      "slug": "chris-turner",
      "configString": "Evans"
    },
    {
      "id": 43,
      "name": "Mikkey Dee",
      "slug": "mikkey-dee",
      "configString": "Evans"
    },
    {
      "id": 44,
      "name": "Derek Roddy",
      "slug": "derek-roddy",
      "configString": "Evans"
    },
    {
      "id": 45,
      "name": "Dirk Verbeuren",
      "slug": "dirk-verbeuren",
      "configString": "Evans"
    },
    {
      "id": 49,
      "name": "Richard Christy",
      "slug": "richard-christy",
      "configString": "Evans"
    },
    {
      "id": 50,
      "name": "Aquiles Priester",
      "slug": "aquiles-priester",
      "configString": "Evans"
    },
    {
      "id": 51,
      "name": "Paul Mazurkiewicz",
      "slug": "paul-mazurkiewicz",
      "configString": "Evans"
    },
    {
      "id": 52,
      "name": "Mike Mangini",
      "slug": "mike-mangini",
      "configString": "Evans"
    },
    {
      "id": 53,
      "name": "Matt Garstka",
      "slug": "matt-garstka",
      "configString": "Evans"
    },
    {
      "id": 54,
      "name": "Daniel Erlandsson",
      "slug": "daniel-erlandsson",
      "configString": "Evans"
    },
    {
      "id": 56,
      "name": "Hannes Grossmann",
      "slug": "hannes-grossmann",
      "configString": "Evans"
    },
    {
      "id": 57,
      "name": "Daray",
      "slug": "daray",
      "configString": "Evans"
    },
    {
      "id": 58,
      "name": "Jocke Wallgren",
      "slug": "jocke-wallgren",
      "configString": "Evans"
    },
    {
      "id": 59,
      "name": "Tim Yeung",
      "slug": "tim-yeung",
      "configString": "Evans"
    },
    {
      "id": 66,
      "name": "Adrian Erlandsson",
      "slug": "adrian-erlandsson",
      "configString": "Evans EMAD Onyx / EC Reverse Dot"
    },
    {
      "id": 68,
      "name": "Jimmy DeGrasso",
      "slug": "jimmy-degrasso",
      "configString": "Evans"
    },
    {
      "id": 70,
      "name": "Alex Rüdinger",
      "slug": "alex-rudinger",
      "configString": "Evans (UV EQ4 Coated bass batter, G2 Clear tom batters, HD Dry snare batter, Snare Side 300, G1 Clear/EQ3-NP Black bass reso)"
    }
  ],
  "Remo": [
    {
      "id": 1,
      "name": "Lars Ulrich",
      "slug": "lars-ulrich",
      "configString": "Remo"
    },
    {
      "id": 5,
      "name": "Tomas Haake",
      "slug": "tomas-haake",
      "configString": "Remo"
    },
    {
      "id": 9,
      "name": "John Otto",
      "slug": "john-otto",
      "configString": "Remo Emperor Coated"
    },
    {
      "id": 15,
      "name": "Mario Duplantier",
      "slug": "mario-duplantier",
      "configString": "Remo Emperor (toms), Remo Powerstroke 3 (bass drums)"
    },
    {
      "id": 25,
      "name": "Alex Bent",
      "slug": "alex-bent",
      "configString": "Remo"
    },
    {
      "id": 28,
      "name": "Morgan Ågren",
      "slug": "morgan-agren",
      "configString": "Remo"
    },
    {
      "id": 30,
      "name": "Bill Ward",
      "slug": "bill-ward",
      "configString": "Remo"
    },
    {
      "id": 34,
      "name": "Ben Koller",
      "slug": "ben-koller",
      "configString": "Remo"
    },
    {
      "id": 38,
      "name": "Martin Lopez",
      "slug": "martin-lopez",
      "configString": "Remo"
    },
    {
      "id": 41,
      "name": "Nicko McBrain",
      "slug": "nicko-mcbrain",
      "configString": "Remo Emperor"
    },
    {
      "id": 42,
      "name": "Scott Travis",
      "slug": "scott-travis",
      "configString": "Remo"
    },
    {
      "id": 46,
      "name": "Frost",
      "slug": "frost",
      "configString": "Remo"
    },
    {
      "id": 47,
      "name": "Gavin Harrison",
      "slug": "gavin-harrison",
      "configString": "Remo Ambassador"
    },
    {
      "id": 48,
      "name": "Abe Cunningham",
      "slug": "abe-cunningham",
      "configString": "Remo (Powerstroke P3, Pinstripe, Ambassador)"
    },
    {
      "id": 55,
      "name": "Jaska Raatikainen",
      "slug": "jaska-raatikainen",
      "configString": "Remo"
    },
    {
      "id": 60,
      "name": "Kevin Talley",
      "slug": "kevin-talley",
      "configString": "Remo"
    },
    {
      "id": 62,
      "name": "Martin Axenrot",
      "slug": "martin-axenrot",
      "configString": "Remo"
    },
    {
      "id": 63,
      "name": "Paul Bostaph",
      "slug": "paul-bostaph",
      "configString": "Remo Powerstroke 3 / Emperor Coated / Ambassador"
    },
    {
      "id": 64,
      "name": "Sean Reinert",
      "slug": "sean-reinert",
      "configString": "Remo Powerstroke 3 / Ambassador"
    },
    {
      "id": 65,
      "name": "Nick Menza",
      "slug": "nick-menza",
      "configString": "Remo Ambassador / Powerstroke 3"
    },
    {
      "id": 67,
      "name": "Jon Dette",
      "slug": "jon-dette",
      "configString": "Remo Powerstroke 3 (Kick) / Emperor Coated (Toms) / Coated Ambassador (Snare)"
    }
  ]
};

export default GEAR_INDEX;
