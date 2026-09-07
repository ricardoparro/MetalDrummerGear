/**
 * Studies membership index — GENERATED FILE, do not edit by hand.
 * Regenerate with: node scripts/compute-studies.cjs
 *
 * Issue #7150: a small derived slice of the four datasets in this directory —
 * which drummer slugs / genre keys are linked from a /studies page, and the exact
 * (already-computed) sentence to show — so packages/frontend/App.js's "Featured in
 * MetalForge Studies" rail can resolve those links without statically importing the
 * full ~200KB of study data it never reads. See data/studies/index.js.
 */

const DRUMMER_MOST_USED_GEAR_BRANDS = ["abe-cunningham","adrian-erlandsson","alex-bent","alex-rudinger","aquiles-priester","arin-ilejay","art-cruz","ben-koller","bill-ward","blake-richardson","brann-dailor","charlie-benante","chris-turner","daniel-erlandsson","danny-carey","daray","dave-lombardo","derek-roddy","dirk-verbeuren","eloy-casagrande","flo-mounier","frost","gavin-harrison","gene-hoglan","george-kollias","hannes-grossmann","hellhammer","igor-cavalera","inferno","isaac-lamb","jaska-raatikainen","jason-bittner","jay-weinberg","jimmy-degrasso","jocke-wallgren","joey-jordison","john-longstreth","john-otto","jon-dette","kevin-talley","lars-ulrich","mario-duplantier","martin-axenrot","martin-lopez","matt-garstka","matt-greiner","matt-halpern","mike-mangini","mike-portnoy","mikkey-dee","morgan-agren","navene-koperweis","nick-augusto","nick-menza","nicko-mcbrain","paul-bostaph","paul-mazurkiewicz","ray-luzier","raymond-herrera","richard-christy","ryan-van-poederooyen","scott-travis","sean-reinert","shannon-larkin","tim-yeung","tomas-haake","travis-orbin","vinnie-paul","waltteri-vayrynen"];
const DRUM_ENDORSEMENT_LANDSCAPE_DRUMMERS = ["abe-cunningham","adrian-erlandsson","alex-bent","arin-ilejay","art-cruz","ben-koller","bill-ward","blake-richardson","charlie-benante","chris-turner","daniel-erlandsson","danny-carey","daray","flo-mounier","frost","gavin-harrison","george-kollias","hannes-grossmann","hellhammer","igor-cavalera","inferno","isaac-lamb","jaska-raatikainen","jocke-wallgren","kevin-talley","martin-axenrot","martin-lopez","matt-garstka","matt-greiner","morgan-agren","navene-koperweis","nick-augusto","nick-menza","nicko-mcbrain","paul-mazurkiewicz","ray-luzier","richard-christy","ryan-van-poederooyen","scott-travis","sean-reinert","shannon-larkin","tim-yeung","travis-orbin","vinnie-paul"];
const GENRE_TEMPO_LINKS = {
  "thrashmetal": {
    "studySlug": "metal-tempo-by-subgenre",
    "studyTitle": "Metal Tempo by Subgenre: How Fast Is Death Metal, Really?",
    "sentence": "Thrash Metal averages 166.9 BPM across 37 songs in our tempo-by-subgenre study."
  },
  "heavymetal": {
    "studySlug": "metal-tempo-by-subgenre",
    "studyTitle": "Metal Tempo by Subgenre: How Fast Is Death Metal, Really?",
    "sentence": "Heavy Metal averages 131.5 BPM across 32 songs in our tempo-by-subgenre study."
  },
  "deathmetal": {
    "studySlug": "metal-tempo-by-subgenre",
    "studyTitle": "Metal Tempo by Subgenre: How Fast Is Death Metal, Really?",
    "sentence": "Death Metal averages 176.9 BPM across 27 songs in our tempo-by-subgenre study."
  },
  "groovemetal": {
    "studySlug": "metal-tempo-by-subgenre",
    "studyTitle": "Metal Tempo by Subgenre: How Fast Is Death Metal, Really?",
    "sentence": "Groove Metal averages 117.8 BPM across 25 songs in our tempo-by-subgenre study."
  },
  "progressivemetal": {
    "studySlug": "metal-tempo-by-subgenre",
    "studyTitle": "Metal Tempo by Subgenre: How Fast Is Death Metal, Really?",
    "sentence": "Progressive Metal averages 127.2 BPM across 25 songs in our tempo-by-subgenre study."
  },
  "numetal": {
    "studySlug": "metal-tempo-by-subgenre",
    "studyTitle": "Metal Tempo by Subgenre: How Fast Is Death Metal, Really?",
    "sentence": "Nu Metal averages 121.8 BPM across 22 songs in our tempo-by-subgenre study."
  },
  "metalcore": {
    "studySlug": "metal-tempo-by-subgenre",
    "studyTitle": "Metal Tempo by Subgenre: How Fast Is Death Metal, Really?",
    "sentence": "Metalcore averages 147.8 BPM across 20 songs in our tempo-by-subgenre study."
  },
  "djent": {
    "studySlug": "metal-tempo-by-subgenre",
    "studyTitle": "Metal Tempo by Subgenre: How Fast Is Death Metal, Really?",
    "sentence": "Djent averages 126.7 BPM across 13 songs in our tempo-by-subgenre study."
  },
  "progressivedeathmetal": {
    "studySlug": "metal-tempo-by-subgenre",
    "studyTitle": "Metal Tempo by Subgenre: How Fast Is Death Metal, Really?",
    "sentence": "Progressive Death Metal averages 117 BPM across 9 songs in our tempo-by-subgenre study."
  },
  "blackmetal": {
    "studySlug": "metal-tempo-by-subgenre",
    "studyTitle": "Metal Tempo by Subgenre: How Fast Is Death Metal, Really?",
    "sentence": "Black Metal averages 169.4 BPM across 8 songs in our tempo-by-subgenre study."
  },
  "doommetal": {
    "studySlug": "metal-tempo-by-subgenre",
    "studyTitle": "Metal Tempo by Subgenre: How Fast Is Death Metal, Really?",
    "sentence": "Doom Metal averages 60.3 BPM across 7 songs in our tempo-by-subgenre study."
  },
  "alternativemetal": {
    "studySlug": "metal-tempo-by-subgenre",
    "studyTitle": "Metal Tempo by Subgenre: How Fast Is Death Metal, Really?",
    "sentence": "Alternative Metal averages 107.6 BPM across 5 songs in our tempo-by-subgenre study."
  },
  "blackeneddeathmetal": {
    "studySlug": "metal-tempo-by-subgenre",
    "studyTitle": "Metal Tempo by Subgenre: How Fast Is Death Metal, Really?",
    "sentence": "Blackened Death Metal averages 153 BPM across 5 songs in our tempo-by-subgenre study."
  },
  "melodicdeathmetal": {
    "studySlug": "metal-tempo-by-subgenre",
    "studyTitle": "Metal Tempo by Subgenre: How Fast Is Death Metal, Really?",
    "sentence": "Melodic Death Metal averages 187.8 BPM across 5 songs in our tempo-by-subgenre study."
  },
  "deathcore": {
    "studySlug": "metal-tempo-by-subgenre",
    "studyTitle": "Metal Tempo by Subgenre: How Fast Is Death Metal, Really?",
    "sentence": "Deathcore averages 121.7 BPM across 3 songs in our tempo-by-subgenre study."
  },
  "symphonicblackmetal": {
    "studySlug": "metal-tempo-by-subgenre",
    "studyTitle": "Metal Tempo by Subgenre: How Fast Is Death Metal, Really?",
    "sentence": "Symphonic Black Metal averages 165 BPM across 3 songs in our tempo-by-subgenre study."
  },
  "technicaldeathmetal": {
    "studySlug": "metal-tempo-by-subgenre",
    "studyTitle": "Metal Tempo by Subgenre: How Fast Is Death Metal, Really?",
    "sentence": "Technical Death Metal averages 219.3 BPM across 3 songs in our tempo-by-subgenre study."
  },
  "progressivesludgemetal": {
    "studySlug": "metal-tempo-by-subgenre",
    "studyTitle": "Metal Tempo by Subgenre: How Fast Is Death Metal, Really?",
    "sentence": "Progressive Sludge Metal averages 117.5 BPM across 2 songs in our tempo-by-subgenre study."
  },
  "industrialmetal": {
    "studySlug": "metal-tempo-by-subgenre",
    "studyTitle": "Metal Tempo by Subgenre: How Fast Is Death Metal, Really?",
    "sentence": "Industrial Metal averages 112 BPM across 1 songs in our tempo-by-subgenre study."
  },
  "mathcore": {
    "studySlug": "metal-tempo-by-subgenre",
    "studyTitle": "Metal Tempo by Subgenre: How Fast Is Death Metal, Really?",
    "sentence": "Mathcore averages 168 BPM across 1 songs in our tempo-by-subgenre study."
  },
  "powermetal": {
    "studySlug": "metal-tempo-by-subgenre",
    "studyTitle": "Metal Tempo by Subgenre: How Fast Is Death Metal, Really?",
    "sentence": "Power Metal averages 170 BPM across 1 songs in our tempo-by-subgenre study."
  }
};
const GENRE_PEDAL_LINKS = {
  "progressivemetal": {
    "studySlug": "metal-kit-configurations",
    "studyTitle": "Metal Drum Kit Configurations: Double Bass vs. Double Pedal",
    "sentence": "Progressive Metal drummers' bass-pedal configurations are broken down in our kit-configurations study."
  },
  "thrashmetal": {
    "studySlug": "metal-kit-configurations",
    "studyTitle": "Metal Drum Kit Configurations: Double Bass vs. Double Pedal",
    "sentence": "Thrash Metal drummers' bass-pedal configurations are broken down in our kit-configurations study."
  },
  "deathmetal": {
    "studySlug": "metal-kit-configurations",
    "studyTitle": "Metal Drum Kit Configurations: Double Bass vs. Double Pedal",
    "sentence": "Death Metal drummers' bass-pedal configurations are broken down in our kit-configurations study."
  },
  "heavymetal": {
    "studySlug": "metal-kit-configurations",
    "studyTitle": "Metal Drum Kit Configurations: Double Bass vs. Double Pedal",
    "sentence": "Heavy Metal drummers' bass-pedal configurations are broken down in our kit-configurations study."
  },
  "technicaldeathmetal": {
    "studySlug": "metal-kit-configurations",
    "studyTitle": "Metal Drum Kit Configurations: Double Bass vs. Double Pedal",
    "sentence": "Technical Death Metal drummers' bass-pedal configurations are broken down in our kit-configurations study."
  },
  "blackmetal": {
    "studySlug": "metal-kit-configurations",
    "studyTitle": "Metal Drum Kit Configurations: Double Bass vs. Double Pedal",
    "sentence": "Black Metal drummers' bass-pedal configurations are broken down in our kit-configurations study."
  },
  "melodicdeathmetal": {
    "studySlug": "metal-kit-configurations",
    "studyTitle": "Metal Drum Kit Configurations: Double Bass vs. Double Pedal",
    "sentence": "Melodic Death Metal drummers' bass-pedal configurations are broken down in our kit-configurations study."
  },
  "metalcore": {
    "studySlug": "metal-kit-configurations",
    "studyTitle": "Metal Drum Kit Configurations: Double Bass vs. Double Pedal",
    "sentence": "Metalcore drummers' bass-pedal configurations are broken down in our kit-configurations study."
  },
  "numetal": {
    "studySlug": "metal-kit-configurations",
    "studyTitle": "Metal Drum Kit Configurations: Double Bass vs. Double Pedal",
    "sentence": "Nu Metal drummers' bass-pedal configurations are broken down in our kit-configurations study."
  },
  "groovemetal": {
    "studySlug": "metal-kit-configurations",
    "studyTitle": "Metal Drum Kit Configurations: Double Bass vs. Double Pedal",
    "sentence": "Groove Metal drummers' bass-pedal configurations are broken down in our kit-configurations study."
  },
  "progressive": {
    "studySlug": "metal-kit-configurations",
    "studyTitle": "Metal Drum Kit Configurations: Double Bass vs. Double Pedal",
    "sentence": "Progressive drummers' bass-pedal configurations are broken down in our kit-configurations study."
  },
  "progressivedeathmetal": {
    "studySlug": "metal-kit-configurations",
    "studyTitle": "Metal Drum Kit Configurations: Double Bass vs. Double Pedal",
    "sentence": "Progressive Death Metal drummers' bass-pedal configurations are broken down in our kit-configurations study."
  }
};
const MOST_USED_GEAR_BRANDS_RANKS = {
  "kits": {
    "label": "Drum Kits",
    "ranked": [
      {
        "brand": "Pearl",
        "percent": 30.6
      },
      {
        "brand": "Tama",
        "percent": 29.2
      },
      {
        "brand": "Sonor",
        "percent": 12.5
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
        "brand": "SJC",
        "percent": 5.6
      },
      {
        "brand": "Ludwig",
        "percent": 4.2
      },
      {
        "brand": "DW",
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
        "percent": 29.2
      },
      {
        "brand": "Pearl",
        "percent": 27.8
      },
      {
        "brand": "Sonor",
        "percent": 11.1
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
        "brand": "SJC",
        "percent": 5.6
      },
      {
        "brand": "DW",
        "percent": 2.8
      },
      {
        "brand": "Ludwig",
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
        "brand": "Zildjian",
        "percent": 31.9
      },
      {
        "brand": "Sabian",
        "percent": 30.6
      },
      {
        "brand": "Paiste",
        "percent": 20.8
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
        "percent": 61.1
      },
      {
        "brand": "Promark",
        "percent": 18.1
      },
      {
        "brand": "Vater",
        "percent": 8.3
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
        "percent": 27.8
      },
      {
        "brand": "Pearl",
        "percent": 22.2
      },
      {
        "brand": "DW",
        "percent": 19.4
      },
      {
        "brand": "Sonor",
        "percent": 5.6
      },
      {
        "brand": "Axis",
        "percent": 4.2
      },
      {
        "brand": "Mapex",
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
        "brand": "Gibraltar",
        "percent": 1.4
      },
      {
        "brand": "Ludwig",
        "percent": 1.4
      },
      {
        "brand": "Trick",
        "percent": 1.4
      },
      {
        "brand": "Yamaha",
        "percent": 1.4
      }
    ]
  }
};
const DRUM_ENDORSEMENT_BRAND_REACH_RANKS = [
  {
    "brand": "Vic Firth",
    "percent": 61.1
  },
  {
    "brand": "Tama",
    "percent": 33.3
  },
  {
    "brand": "Zildjian",
    "percent": 31.9
  },
  {
    "brand": "Pearl",
    "percent": 30.6
  },
  {
    "brand": "Sabian",
    "percent": 30.6
  },
  {
    "brand": "Paiste",
    "percent": 20.8
  },
  {
    "brand": "DW",
    "percent": 19.4
  },
  {
    "brand": "Promark",
    "percent": 18.1
  },
  {
    "brand": "Meinl",
    "percent": 16.7
  },
  {
    "brand": "Sonor",
    "percent": 12.5
  },
  {
    "brand": "Vater",
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
    "brand": "SJC",
    "percent": 5.6
  },
  {
    "brand": "Axis",
    "percent": 4.2
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
    "brand": "Trick",
    "percent": 1.4
  },
  {
    "brand": "Yamaha",
    "percent": 1.4
  }
];
export const STUDY_HEADLINES = {
  "most-used-gear-brands-metal": {
    "dateModified": "2026-07-25",
    "datasetSize": 72,
    "headlineStat": {
      "value": "30.6%",
      "label": "Pearl — most-used drum kit brand",
      "sentence": "Pearl is the most-used drum kit brand in metal, played by 22 of the 72 drummers documented on MetalForge (30.6%)."
    }
  },
  "metal-tempo-by-subgenre": {
    "dateModified": "2026-07-25",
    "datasetSize": 254,
    "headlineStat": {
      "value": "176.9 BPM",
      "label": "Death Metal — average tempo",
      "sentence": "Across the 254 songs in MetalForge's tempo database, death metal averages 176.9 BPM, well above the all-genre average of 141.1 BPM."
    }
  },
  "drum-endorsement-landscape": {
    "dateModified": "2026-07-25",
    "datasetSize": 72,
    "headlineStat": {
      "value": "61.1%",
      "label": "Vic Firth — widest brand reach",
      "sentence": "Vic Firth reaches more metal drummers than any other brand tracked by MetalForge, endorsed by 44 of the 72 documented drummers (61.1%)."
    }
  },
  "metal-kit-configurations": {
    "dateModified": "2026-07-25",
    "datasetSize": 72,
    "headlineStat": {
      "value": "81.9%",
      "label": "use a double-pedal setup",
      "sentence": "Double pedal is by far the most common bass-drum configuration among metal drummers, used by 59 of the 72 documented drummers on MetalForge (81.9%)."
    }
  }
};

function normalizeMembershipKey(s) {
  return String(s).toLowerCase().replace(/[^a-z0-9]/g, '');
}

export function getDrummerStudyLinks(drummerSlug) {
  const links = [];
  if (DRUMMER_MOST_USED_GEAR_BRANDS.includes(drummerSlug)) {
    links.push({
      studySlug: 'most-used-gear-brands-metal',
      studyTitle: 'Most-Used Drum & Cymbal Brands in Metal',
      sentence: 'Counted in our most-used gear brands study.',
    });
  }
  if (DRUM_ENDORSEMENT_LANDSCAPE_DRUMMERS.includes(drummerSlug)) {
    links.push({
      studySlug: 'drum-endorsement-landscape',
      studyTitle: 'The Drum Endorsement Landscape in Metal',
      sentence: 'Counted in our drum endorsement landscape study.',
    });
  }
  return links;
}

export function getGenreStudyLinks(genreSlugOrName) {
  const norm = normalizeMembershipKey(genreSlugOrName);
  const links = [];
  if (GENRE_TEMPO_LINKS[norm]) links.push(GENRE_TEMPO_LINKS[norm]);
  if (GENRE_PEDAL_LINKS[norm]) links.push(GENRE_PEDAL_LINKS[norm]);
  return links;
}

// Brand display names differ slightly across the per-category brand pages (e.g.
// "Vater Percussion" vs. the studies' canonical "Vater", "Pro-Mark" vs. "Promark")
// - matched by normalized substring rather than exact equality, mirroring
// data/studies/index.js's getBrandStudyLinks (which this replaces for callers that
// only need the rank/percent, not the full per-brand drummer lists).
function brandNamesMatch(displayName, canonicalName) {
  const a = normalizeMembershipKey(displayName);
  const b = normalizeMembershipKey(canonicalName);
  return a.includes(b) || b.includes(a);
}

export function getBrandStudyLinks(displayBrandName) {
  const links = [];

  for (const cat of Object.values(MOST_USED_GEAR_BRANDS_RANKS)) {
    const idx = cat.ranked.findIndex((r) => brandNamesMatch(displayBrandName, r.brand));
    if (idx !== -1) {
      const r = cat.ranked[idx];
      links.push({
        studySlug: 'most-used-gear-brands-metal',
        studyTitle: 'Most-Used Drum & Cymbal Brands in Metal',
        sentence: `${r.brand} ranks #${idx + 1} in ${cat.label.toLowerCase()} usage in our brand-usage study (${r.percent}% of the roster).`,
      });
      break;
    }
  }

  const reachIdx = DRUM_ENDORSEMENT_BRAND_REACH_RANKS.findIndex((b) => brandNamesMatch(displayBrandName, b.brand));
  if (reachIdx !== -1) {
    const b = DRUM_ENDORSEMENT_BRAND_REACH_RANKS[reachIdx];
    links.push({
      studySlug: 'drum-endorsement-landscape',
      studyTitle: 'The Drum Endorsement Landscape in Metal',
      sentence: `${b.brand} ranks #${reachIdx + 1} for overall brand reach in our endorsement-landscape study (${b.percent}% of the roster).`,
    });
  }

  return links;
}
