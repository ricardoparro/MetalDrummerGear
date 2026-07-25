/**
 * Tempo by Subgenre study — average/median/max BPM per subgenre across the
 * 254-song curated database, tempo-range distribution, and the
 * 200+ BPM "hall of speed."
 *
 * GENERATED FILE — do not edit by hand.
 * Regenerate with: node scripts/compute-studies.cjs
 *
 * Source of truth: packages/frontend/data/metalSongsBpm.js. That module's BPMs
 * are approximate — sourced from common tempo markings, not per-song verified
 * audio analysis (see its own header comment). The songs epic's verified-BPM
 * phase (issue #4759) has not merged as of this snapshot (bpmVerified: false
 * below); once it has, re-run this script and flip SONGS_BPM_VERIFIED in
 * scripts/compute-studies.cjs. Dataset snapshot date: 2026-07-25.
 *
 * Consumed by: /studies/metal-tempo-by-subgenre (packages/frontend/pages) and
 * the bot-facing SSR handler (api/meta/[...path].js).
 */

export const TEMPO_BY_SUBGENRE = {
  "generatedAt": "2026-07-25",
  "totalSongs": 254,
  "bpmVerified": false,
  "overall": {
    "avgBpm": 141.1,
    "medianBpm": 140,
    "minBpm": 55,
    "maxBpm": 271,
    "tempoDistribution": {
      "slow": 18,
      "mid": 84,
      "fast": 94,
      "extreme": 55,
      "blast": 3
    }
  },
  "genres": [
    {
      "genre": "thrash-metal",
      "label": "Thrash Metal",
      "songCount": 37,
      "avgBpm": 166.9,
      "medianBpm": 175,
      "minBpm": 80,
      "maxBpm": 230,
      "tempoDistribution": {
        "slow": 2,
        "mid": 6,
        "fast": 9,
        "extreme": 20,
        "blast": 0
      }
    },
    {
      "genre": "heavy-metal",
      "label": "Heavy Metal",
      "songCount": 32,
      "avgBpm": 131.5,
      "medianBpm": 130,
      "minBpm": 76,
      "maxBpm": 210,
      "tempoDistribution": {
        "slow": 2,
        "mid": 13,
        "fast": 14,
        "extreme": 3,
        "blast": 0
      }
    },
    {
      "genre": "death-metal",
      "label": "Death Metal",
      "songCount": 27,
      "avgBpm": 176.9,
      "medianBpm": 165,
      "minBpm": 90,
      "maxBpm": 271,
      "tempoDistribution": {
        "slow": 0,
        "mid": 4,
        "fast": 10,
        "extreme": 10,
        "blast": 3
      }
    },
    {
      "genre": "groove-metal",
      "label": "Groove Metal",
      "songCount": 25,
      "avgBpm": 117.8,
      "medianBpm": 120,
      "minBpm": 76,
      "maxBpm": 148,
      "tempoDistribution": {
        "slow": 2,
        "mid": 14,
        "fast": 9,
        "extreme": 0,
        "blast": 0
      }
    },
    {
      "genre": "progressive-metal",
      "label": "Progressive Metal",
      "songCount": 25,
      "avgBpm": 127.2,
      "medianBpm": 128,
      "minBpm": 91,
      "maxBpm": 170,
      "tempoDistribution": {
        "slow": 0,
        "mid": 13,
        "fast": 11,
        "extreme": 1,
        "blast": 0
      }
    },
    {
      "genre": "nu-metal",
      "label": "Nu Metal",
      "songCount": 22,
      "avgBpm": 121.8,
      "medianBpm": 123.5,
      "minBpm": 75,
      "maxBpm": 165,
      "tempoDistribution": {
        "slow": 1,
        "mid": 12,
        "fast": 9,
        "extreme": 0,
        "blast": 0
      }
    },
    {
      "genre": "metalcore",
      "label": "Metalcore",
      "songCount": 20,
      "avgBpm": 147.8,
      "medianBpm": 147.5,
      "minBpm": 95,
      "maxBpm": 190,
      "tempoDistribution": {
        "slow": 0,
        "mid": 4,
        "fast": 12,
        "extreme": 4,
        "blast": 0
      }
    },
    {
      "genre": "djent",
      "label": "Djent",
      "songCount": 13,
      "avgBpm": 126.7,
      "medianBpm": 132,
      "minBpm": 78,
      "maxBpm": 175,
      "tempoDistribution": {
        "slow": 1,
        "mid": 5,
        "fast": 5,
        "extreme": 2,
        "blast": 0
      }
    },
    {
      "genre": "progressive-death-metal",
      "label": "Progressive Death Metal",
      "songCount": 9,
      "avgBpm": 117,
      "medianBpm": 100,
      "minBpm": 75,
      "maxBpm": 175,
      "tempoDistribution": {
        "slow": 3,
        "mid": 2,
        "fast": 3,
        "extreme": 1,
        "blast": 0
      }
    },
    {
      "genre": "black-metal",
      "label": "Black Metal",
      "songCount": 8,
      "avgBpm": 169.4,
      "medianBpm": 177.5,
      "minBpm": 116,
      "maxBpm": 200,
      "tempoDistribution": {
        "slow": 0,
        "mid": 1,
        "fast": 2,
        "extreme": 5,
        "blast": 0
      }
    },
    {
      "genre": "doom-metal",
      "label": "Doom Metal",
      "songCount": 7,
      "avgBpm": 60.3,
      "medianBpm": 60,
      "minBpm": 55,
      "maxBpm": 65,
      "tempoDistribution": {
        "slow": 7,
        "mid": 0,
        "fast": 0,
        "extreme": 0,
        "blast": 0
      }
    },
    {
      "genre": "alternative-metal",
      "label": "Alternative Metal",
      "songCount": 5,
      "avgBpm": 107.6,
      "medianBpm": 105,
      "minBpm": 95,
      "maxBpm": 130,
      "tempoDistribution": {
        "slow": 0,
        "mid": 4,
        "fast": 1,
        "extreme": 0,
        "blast": 0
      }
    },
    {
      "genre": "blackened-death-metal",
      "label": "Blackened Death Metal",
      "songCount": 5,
      "avgBpm": 153,
      "medianBpm": 160,
      "minBpm": 115,
      "maxBpm": 175,
      "tempoDistribution": {
        "slow": 0,
        "mid": 1,
        "fast": 3,
        "extreme": 1,
        "blast": 0
      }
    },
    {
      "genre": "melodic-death-metal",
      "label": "Melodic Death Metal",
      "songCount": 5,
      "avgBpm": 187.8,
      "medianBpm": 192,
      "minBpm": 149,
      "maxBpm": 250,
      "tempoDistribution": {
        "slow": 0,
        "mid": 0,
        "fast": 2,
        "extreme": 3,
        "blast": 0
      }
    },
    {
      "genre": "deathcore",
      "label": "Deathcore",
      "songCount": 3,
      "avgBpm": 121.7,
      "medianBpm": 125,
      "minBpm": 110,
      "maxBpm": 130,
      "tempoDistribution": {
        "slow": 0,
        "mid": 2,
        "fast": 1,
        "extreme": 0,
        "blast": 0
      }
    },
    {
      "genre": "symphonic-black-metal",
      "label": "Symphonic Black Metal",
      "songCount": 3,
      "avgBpm": 165,
      "medianBpm": 165,
      "minBpm": 155,
      "maxBpm": 175,
      "tempoDistribution": {
        "slow": 0,
        "mid": 0,
        "fast": 2,
        "extreme": 1,
        "blast": 0
      }
    },
    {
      "genre": "technical-death-metal",
      "label": "Technical Death Metal",
      "songCount": 3,
      "avgBpm": 219.3,
      "medianBpm": 218,
      "minBpm": 210,
      "maxBpm": 230,
      "tempoDistribution": {
        "slow": 0,
        "mid": 0,
        "fast": 0,
        "extreme": 3,
        "blast": 0
      }
    },
    {
      "genre": "progressive-sludge-metal",
      "label": "Progressive Sludge Metal",
      "songCount": 2,
      "avgBpm": 117.5,
      "medianBpm": 117.5,
      "minBpm": 110,
      "maxBpm": 125,
      "tempoDistribution": {
        "slow": 0,
        "mid": 2,
        "fast": 0,
        "extreme": 0,
        "blast": 0
      }
    },
    {
      "genre": "industrial-metal",
      "label": "Industrial Metal",
      "songCount": 1,
      "avgBpm": 112,
      "medianBpm": 112,
      "minBpm": 112,
      "maxBpm": 112,
      "tempoDistribution": {
        "slow": 0,
        "mid": 1,
        "fast": 0,
        "extreme": 0,
        "blast": 0
      }
    },
    {
      "genre": "mathcore",
      "label": "Mathcore",
      "songCount": 1,
      "avgBpm": 168,
      "medianBpm": 168,
      "minBpm": 168,
      "maxBpm": 168,
      "tempoDistribution": {
        "slow": 0,
        "mid": 0,
        "fast": 1,
        "extreme": 0,
        "blast": 0
      }
    },
    {
      "genre": "power-metal",
      "label": "Power Metal",
      "songCount": 1,
      "avgBpm": 170,
      "medianBpm": 170,
      "minBpm": 170,
      "maxBpm": 170,
      "tempoDistribution": {
        "slow": 0,
        "mid": 0,
        "fast": 0,
        "extreme": 1,
        "blast": 0
      }
    }
  ],
  "hallOfSpeed": [
    {
      "id": 153,
      "song": "Papyrus Containing the Spell to Preserve its Possessor Against Attacks From He Who is In the Water",
      "band": "Nile",
      "year": 2007,
      "bpm": 271,
      "genre": "death-metal",
      "genreLabel": "Death Metal",
      "drummer": {
        "slug": "george-kollias",
        "name": "George Kollias",
        "inRoster": true
      }
    },
    {
      "id": 154,
      "song": "I, Monarch",
      "band": "Hate Eternal",
      "year": 2005,
      "bpm": 270,
      "genre": "death-metal",
      "genreLabel": "Death Metal",
      "drummer": {
        "slug": "derek-roddy",
        "name": "Derek Roddy",
        "inRoster": true
      }
    },
    {
      "id": 82,
      "song": "Sacrifice Unto Sebek",
      "band": "Nile",
      "year": 2005,
      "bpm": 265,
      "genre": "death-metal",
      "genreLabel": "Death Metal",
      "drummer": {
        "slug": "george-kollias",
        "name": "George Kollias",
        "inRoster": true
      }
    },
    {
      "id": 152,
      "song": "Blinded by Fear",
      "band": "At the Gates",
      "year": 1995,
      "bpm": 250,
      "genre": "melodic-death-metal",
      "genreLabel": "Melodic Death Metal",
      "drummer": {
        "slug": "adrian-erlandsson",
        "name": "Adrian Erlandsson",
        "inRoster": true
      }
    },
    {
      "id": 84,
      "song": "Kafir!",
      "band": "Nile",
      "year": 2009,
      "bpm": 245,
      "genre": "death-metal",
      "genreLabel": "Death Metal",
      "drummer": {
        "slug": "george-kollias",
        "name": "George Kollias",
        "inRoster": true
      }
    },
    {
      "id": 83,
      "song": "Lashed to the Slave Stick",
      "band": "Nile",
      "year": 2005,
      "bpm": 240,
      "genre": "death-metal",
      "genreLabel": "Death Metal",
      "drummer": {
        "slug": "george-kollias",
        "name": "George Kollias",
        "inRoster": true
      }
    },
    {
      "id": 156,
      "song": "Septuagint",
      "band": "Obscura",
      "year": 2011,
      "bpm": 230,
      "genre": "technical-death-metal",
      "genreLabel": "Technical Death Metal",
      "drummer": {
        "slug": "hannes-grossmann",
        "name": "Hannes Grossmann",
        "inRoster": true
      }
    },
    {
      "id": 13,
      "song": "War Ensemble",
      "band": "Slayer",
      "year": 1990,
      "bpm": 230,
      "genre": "thrash-metal",
      "genreLabel": "Thrash Metal",
      "drummer": {
        "slug": "dave-lombardo",
        "name": "Dave Lombardo",
        "inRoster": true
      }
    },
    {
      "id": 151,
      "song": "Divine Intervention",
      "band": "Slayer",
      "year": 1994,
      "bpm": 220,
      "genre": "thrash-metal",
      "genreLabel": "Thrash Metal",
      "drummer": {
        "slug": "paul-bostaph",
        "name": "Paul Bostaph",
        "inRoster": true
      }
    },
    {
      "id": 184,
      "song": "Dyers Eve",
      "band": "Metallica",
      "year": 1988,
      "bpm": 220,
      "genre": "thrash-metal",
      "genreLabel": "Thrash Metal",
      "drummer": {
        "slug": "lars-ulrich",
        "name": "Lars Ulrich",
        "inRoster": true
      }
    },
    {
      "id": 170,
      "song": "Liege of Inveracity",
      "band": "Suffocation",
      "year": 1991,
      "bpm": 220,
      "genre": "death-metal",
      "genreLabel": "Death Metal",
      "drummer": {
        "slug": "mike-smith-suffocation",
        "name": "Mike Smith Suffocation",
        "inRoster": false
      }
    },
    {
      "id": 191,
      "song": "Trapped Under Ice",
      "band": "Metallica",
      "year": 1984,
      "bpm": 220,
      "genre": "thrash-metal",
      "genreLabel": "Thrash Metal",
      "drummer": {
        "slug": "lars-ulrich",
        "name": "Lars Ulrich",
        "inRoster": true
      }
    },
    {
      "id": 179,
      "song": "Slit Your Guts",
      "band": "Cryptopsy",
      "year": 1996,
      "bpm": 218,
      "genre": "technical-death-metal",
      "genreLabel": "Technical Death Metal",
      "drummer": {
        "slug": "flo-mounier",
        "name": "Flo Mounier",
        "inRoster": true
      }
    },
    {
      "id": 9,
      "song": "Raining Blood",
      "band": "Slayer",
      "year": 1986,
      "bpm": 216,
      "genre": "thrash-metal",
      "genreLabel": "Thrash Metal",
      "drummer": {
        "slug": "dave-lombardo",
        "name": "Dave Lombardo",
        "inRoster": true
      }
    },
    {
      "id": 10,
      "song": "Angel of Death",
      "band": "Slayer",
      "year": 1986,
      "bpm": 212,
      "genre": "thrash-metal",
      "genreLabel": "Thrash Metal",
      "drummer": {
        "slug": "dave-lombardo",
        "name": "Dave Lombardo",
        "inRoster": true
      }
    },
    {
      "id": 2,
      "song": "Master of Puppets",
      "band": "Metallica",
      "year": 1986,
      "bpm": 212,
      "genre": "thrash-metal",
      "genreLabel": "Thrash Metal",
      "drummer": {
        "slug": "lars-ulrich",
        "name": "Lars Ulrich",
        "inRoster": true
      }
    },
    {
      "id": 210,
      "song": "Black Seeds of Vengeance",
      "band": "Nile",
      "year": 2000,
      "bpm": 210,
      "genre": "death-metal",
      "genreLabel": "Death Metal",
      "drummer": {
        "slug": "pat-harrington",
        "name": "Pat Harrington",
        "inRoster": false
      }
    },
    {
      "id": 174,
      "song": "Flattening of Emotions",
      "band": "Death",
      "year": 1991,
      "bpm": 210,
      "genre": "technical-death-metal",
      "genreLabel": "Technical Death Metal",
      "drummer": {
        "slug": "sean-reinert",
        "name": "Sean Reinert",
        "inRoster": true
      }
    },
    {
      "id": 187,
      "song": "Necrophobic",
      "band": "Slayer",
      "year": 1986,
      "bpm": 210,
      "genre": "thrash-metal",
      "genreLabel": "Thrash Metal",
      "drummer": {
        "slug": "dave-lombardo",
        "name": "Dave Lombardo",
        "inRoster": true
      }
    },
    {
      "id": 71,
      "song": "Painkiller",
      "band": "Judas Priest",
      "year": 1990,
      "bpm": 210,
      "genre": "heavy-metal",
      "genreLabel": "Heavy Metal",
      "drummer": {
        "slug": "scott-travis",
        "name": "Scott Travis",
        "inRoster": true
      }
    },
    {
      "id": 219,
      "song": "Beneath the Remains",
      "band": "Sepultura",
      "year": 1989,
      "bpm": 200,
      "genre": "thrash-metal",
      "genreLabel": "Thrash Metal",
      "drummer": {
        "slug": "igor-cavalera",
        "name": "Igor Cavalera",
        "inRoster": true
      }
    },
    {
      "id": 131,
      "song": "Chainsaw Gutsfuck",
      "band": "Mayhem",
      "year": 1987,
      "bpm": 200,
      "genre": "black-metal",
      "genreLabel": "Black Metal",
      "drummer": {
        "slug": "manheim",
        "name": "Manheim",
        "inRoster": false
      }
    },
    {
      "id": 6,
      "song": "Creeping Death",
      "band": "Metallica",
      "year": 1984,
      "bpm": 200,
      "genre": "thrash-metal",
      "genreLabel": "Thrash Metal",
      "drummer": {
        "slug": "lars-ulrich",
        "name": "Lars Ulrich",
        "inRoster": true
      }
    },
    {
      "id": 128,
      "song": "Immortal Rites",
      "band": "Morbid Angel",
      "year": 1989,
      "bpm": 200,
      "genre": "death-metal",
      "genreLabel": "Death Metal",
      "drummer": {
        "slug": "pete-sandoval",
        "name": "Pete Sandoval",
        "inRoster": true
      }
    }
  ]
};

export default TEMPO_BY_SUBGENRE;
