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
 */

export const GEAR_INDEX = {
  "DW": {
    "9000 Series Double Pedal": [
      {
        "id": 56,
        "name": "Hannes Grossmann",
        "slug": "hannes-grossmann",
        "configString": "DW 9000 Series Double Pedal"
      },
      {
        "id": 61,
        "name": "Isaac Lamb",
        "slug": "isaac-lamb",
        "configString": "DW 9000 Series Double Pedal"
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
  "Mapex": {
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
        "id": 32,
        "name": "Matt Greiner",
        "slug": "matt-greiner",
        "configString": "Meinl Byzance Series (15\" Dual Hi-Hats, 18\" & 19\" Dual Crashes, 21\" Transition Ride, 18\" Extra Dry China, 10\" & 12\" Splashes)"
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
        "id": 40,
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
        "id": 40,
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
        "id": 40,
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
        "id": 21,
        "name": "Pete Sandoval",
        "slug": "pete-sandoval",
        "configString": "Sabian AAX Series (14\" Stage Hi-Hats, 18\" & 19\" X-Plosion Crashes, 20\" Stage Ride, 18\" Chinese)"
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
        "id": 40,
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
        "id": 41,
        "name": "Nicko McBrain",
        "slug": "nicko-mcbrain",
        "configString": "Sonor SQ2 Series"
      },
      {
        "id": 46,
        "name": "Frost",
        "slug": "frost",
        "configString": "Sonor SQ2 Series"
      },
      {
        "id": 47,
        "name": "Gavin Harrison",
        "slug": "gavin-harrison",
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
        "id": 59,
        "name": "Tim Yeung",
        "slug": "tim-yeung",
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
      },
      {
        "id": 49,
        "name": "Richard Christy",
        "slug": "richard-christy",
        "configString": "Tama Starclassic Maple"
      }
    ],
    "Starclassic Maple/Birch": [
      {
        "id": 13,
        "name": "Mike Portnoy",
        "slug": "mike-portnoy",
        "configString": "Tama Starclassic Maple/Birch"
      },
      {
        "id": 40,
        "name": "Chris Turner",
        "slug": "chris-turner",
        "configString": "Tama Starclassic Maple/Birch"
      }
    ],
    "Starclassic Walnut/Birch": [
      {
        "id": 45,
        "name": "Dirk Verbeuren",
        "slug": "dirk-verbeuren",
        "configString": "Tama Starclassic Walnut/Birch"
      },
      {
        "id": 53,
        "name": "Matt Garstka",
        "slug": "matt-garstka",
        "configString": "Tama Starclassic Walnut/Birch"
      }
    ]
  },
  "Vic Firth": {
    "American Classic 2B": [
      {
        "id": 30,
        "name": "Bill Ward",
        "slug": "bill-ward",
        "configString": "Vic Firth American Classic 2B"
      },
      {
        "id": 48,
        "name": "Abe Cunningham",
        "slug": "abe-cunningham",
        "configString": "Vic Firth American Classic 2B"
      },
      {
        "id": 61,
        "name": "Isaac Lamb",
        "slug": "isaac-lamb",
        "configString": "Vic Firth American Classic 2B"
      }
    ],
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
        "slug": "morgan-gren",
        "configString": "Vic Firth American Classic 5A"
      },
      {
        "id": 32,
        "name": "Matt Greiner",
        "slug": "matt-greiner",
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
      }
    ],
    "American Classic 5B": [
      {
        "id": 11,
        "name": "Vinnie Paul",
        "slug": "vinnie-paul",
        "configString": "Vic Firth American Classic 5B"
      },
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
        "id": 39,
        "name": "Travis Orbin",
        "slug": "travis-orbin",
        "configString": "Vic Firth American Classic 5B"
      },
      {
        "id": 40,
        "name": "Ryan Van Poederooyen",
        "slug": "ryan-van-poederooyen",
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
    "A Custom & K": [
      {
        "id": 43,
        "name": "Mikkey Dee",
        "slug": "mikkey-dee",
        "configString": "Zildjian A Custom & K Series (14\" A Custom Hi-Hats, 18\" & 19\" A Custom Crashes, 22\" K Custom Ride, 20\" Oriental China)"
      },
      {
        "id": 46,
        "name": "Frost",
        "slug": "frost",
        "configString": "Zildjian A Custom & K Series (14\" A Custom Hi-Hats, 16\", 17\", 18\" A Custom Crashes, 22\" K Custom Dark Ride, 18\" K China)"
      }
    ],
    "A Custom & K Custom": [
      {
        "id": 45,
        "name": "Dirk Verbeuren",
        "slug": "dirk-verbeuren",
        "configString": "Zildjian A Custom & K Custom Series (14\" A Custom Hi-Hats, 17\", 18\", 19\" A Custom Crashes, 21\" K Custom Hybrid Ride, 18\" K China)"
      },
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
  },
  "ddrum": {
    "Dios": [
      {
        "id": 21,
        "name": "Pete Sandoval",
        "slug": "pete-sandoval",
        "configString": "ddrum Dios Series"
      },
      {
        "id": 26,
        "name": "Shannon Larkin",
        "slug": "shannon-larkin",
        "configString": "ddrum Dios Series"
      }
    ],
    "Dios 14x6.5\" Maple": [
      {
        "id": 21,
        "name": "Pete Sandoval",
        "slug": "pete-sandoval",
        "configString": "ddrum Dios 14x6.5\" Maple"
      },
      {
        "id": 26,
        "name": "Shannon Larkin",
        "slug": "shannon-larkin",
        "configString": "ddrum Dios 14x6.5\" Maple"
      }
    ]
  }
};

export default GEAR_INDEX;
