/**
 * Tempo by Subgenre study — average/median/max BPM per subgenre across the
 * 150-song curated database, tempo-range distribution, and the
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
 * scripts/compute-studies.cjs. Dataset snapshot date: 2026-07-16.
 *
 * Consumed by: /studies/metal-tempo-by-subgenre (packages/frontend/pages) and
 * the bot-facing SSR handler (api/meta/[...path].js).
 */

export const TEMPO_BY_SUBGENRE = {
  "generatedAt": "2026-07-16",
  "totalSongs": 150,
  "bpmVerified": false,
  "overall": {
    "avgBpm": 132.5,
    "medianBpm": 127.5,
    "minBpm": 55,
    "maxBpm": 245,
    "tempoDistribution": {
      "slow": 14,
      "mid": 64,
      "fast": 48,
      "extreme": 24,
      "blast": 0
    }
  },
  "genres": [
    {
      "genre": "thrash-metal",
      "label": "Thrash Metal",
      "songCount": 22,
      "avgBpm": 164.9,
      "medianBpm": 170,
      "minBpm": 80,
      "maxBpm": 230,
      "tempoDistribution": {
        "slow": 1,
        "mid": 5,
        "fast": 5,
        "extreme": 11,
        "blast": 0
      }
    },
    {
      "genre": "heavy-metal",
      "label": "Heavy Metal",
      "songCount": 20,
      "avgBpm": 129.9,
      "medianBpm": 125.5,
      "minBpm": 76,
      "maxBpm": 180,
      "tempoDistribution": {
        "slow": 2,
        "mid": 9,
        "fast": 6,
        "extreme": 3,
        "blast": 0
      }
    },
    {
      "genre": "groove-metal",
      "label": "Groove Metal",
      "songCount": 16,
      "avgBpm": 117.9,
      "medianBpm": 119,
      "minBpm": 82,
      "maxBpm": 148,
      "tempoDistribution": {
        "slow": 1,
        "mid": 11,
        "fast": 4,
        "extreme": 0,
        "blast": 0
      }
    },
    {
      "genre": "progressive-metal",
      "label": "Progressive Metal",
      "songCount": 16,
      "avgBpm": 121.3,
      "medianBpm": 117.5,
      "minBpm": 91,
      "maxBpm": 170,
      "tempoDistribution": {
        "slow": 0,
        "mid": 10,
        "fast": 5,
        "extreme": 1,
        "blast": 0
      }
    },
    {
      "genre": "nu-metal",
      "label": "Nu Metal",
      "songCount": 15,
      "avgBpm": 123.3,
      "medianBpm": 127,
      "minBpm": 75,
      "maxBpm": 165,
      "tempoDistribution": {
        "slow": 1,
        "mid": 8,
        "fast": 6,
        "extreme": 0,
        "blast": 0
      }
    },
    {
      "genre": "death-metal",
      "label": "Death Metal",
      "songCount": 14,
      "avgBpm": 163.5,
      "medianBpm": 152,
      "minBpm": 95,
      "maxBpm": 245,
      "tempoDistribution": {
        "slow": 0,
        "mid": 3,
        "fast": 6,
        "extreme": 5,
        "blast": 0
      }
    },
    {
      "genre": "metalcore",
      "label": "Metalcore",
      "songCount": 11,
      "avgBpm": 135.6,
      "medianBpm": 132,
      "minBpm": 95,
      "maxBpm": 165,
      "tempoDistribution": {
        "slow": 0,
        "mid": 4,
        "fast": 7,
        "extreme": 0,
        "blast": 0
      }
    },
    {
      "genre": "djent",
      "label": "Djent",
      "songCount": 9,
      "avgBpm": 111.9,
      "medianBpm": 115,
      "minBpm": 78,
      "maxBpm": 140,
      "tempoDistribution": {
        "slow": 1,
        "mid": 5,
        "fast": 3,
        "extreme": 0,
        "blast": 0
      }
    },
    {
      "genre": "progressive-death-metal",
      "label": "Progressive Death Metal",
      "songCount": 6,
      "avgBpm": 105.5,
      "medianBpm": 92.5,
      "minBpm": 75,
      "maxBpm": 150,
      "tempoDistribution": {
        "slow": 3,
        "mid": 1,
        "fast": 2,
        "extreme": 0,
        "blast": 0
      }
    },
    {
      "genre": "doom-metal",
      "label": "Doom Metal",
      "songCount": 5,
      "avgBpm": 59.4,
      "medianBpm": 60,
      "minBpm": 55,
      "maxBpm": 65,
      "tempoDistribution": {
        "slow": 5,
        "mid": 0,
        "fast": 0,
        "extreme": 0,
        "blast": 0
      }
    },
    {
      "genre": "black-metal",
      "label": "Black Metal",
      "songCount": 4,
      "avgBpm": 178.8,
      "medianBpm": 182.5,
      "minBpm": 150,
      "maxBpm": 200,
      "tempoDistribution": {
        "slow": 0,
        "mid": 0,
        "fast": 1,
        "extreme": 3,
        "blast": 0
      }
    },
    {
      "genre": "alternative-metal",
      "label": "Alternative Metal",
      "songCount": 3,
      "avgBpm": 101,
      "medianBpm": 98,
      "minBpm": 95,
      "maxBpm": 110,
      "tempoDistribution": {
        "slow": 0,
        "mid": 3,
        "fast": 0,
        "extreme": 0,
        "blast": 0
      }
    },
    {
      "genre": "blackened-death-metal",
      "label": "Blackened Death Metal",
      "songCount": 3,
      "avgBpm": 150,
      "medianBpm": 160,
      "minBpm": 115,
      "maxBpm": 175,
      "tempoDistribution": {
        "slow": 0,
        "mid": 1,
        "fast": 1,
        "extreme": 1,
        "blast": 0
      }
    },
    {
      "genre": "deathcore",
      "label": "Deathcore",
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
      "genre": "symphonic-black-metal",
      "label": "Symphonic Black Metal",
      "songCount": 2,
      "avgBpm": 160,
      "medianBpm": 160,
      "minBpm": 155,
      "maxBpm": 165,
      "tempoDistribution": {
        "slow": 0,
        "mid": 0,
        "fast": 2,
        "extreme": 0,
        "blast": 0
      }
    }
  ],
  "hallOfSpeed": [
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
      "id": 9,
      "song": "Raining Blood",
      "band": "Slayer",
      "year": 1986,
      "bpm": 225,
      "genre": "thrash-metal",
      "genreLabel": "Thrash Metal",
      "drummer": {
        "slug": "dave-lombardo",
        "name": "Dave Lombardo",
        "inRoster": true
      }
    },
    {
      "id": 82,
      "song": "Sacrifice Unto Sebek",
      "band": "Nile",
      "year": 2002,
      "bpm": 220,
      "genre": "death-metal",
      "genreLabel": "Death Metal",
      "drummer": {
        "slug": "tony-laureano",
        "name": "Tony Laureano",
        "inRoster": false
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
