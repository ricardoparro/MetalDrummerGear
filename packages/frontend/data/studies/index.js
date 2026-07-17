// Studies registry (epic #4763; phase 1: issue #4764, phase 2: issue #4765).
//
// Single source of truth for which /studies/<slug> pages exist. The /studies hub,
// the sitemap (api/sitemap.js), and the bot-facing SSR handler (api/meta/[...path].js)
// all read this list instead of hand-listing studies in three places that can drift.
//
// Hand-authored: title/description/methodology copy for each study. NOT
// hand-authored: any number referenced from that copy — those come from the
// generated data file under data/studies/ (see dataModule/dataExport below).

import { MOST_USED_GEAR_BRANDS } from './mostUsedGearBrands.js';
import { TEMPO_BY_SUBGENRE } from './tempoBySubgenre.js';
import { DRUM_ENDORSEMENT_LANDSCAPE } from './drumEndorsementLandscape.js';
import { KIT_CONFIGURATIONS } from './kitConfigurations.js';

// headlineStat: the single "key number" each study answers, used by the OG card
// generator (api/card/[slug].jsx), the /llms/studies/<slug>.md mirrors, and the
// X agent's data-drop template — all computed here from the generated data
// modules so every surface quotes the exact same number (rule 1: computed,
// never hand-written). Mirrors the FAQPage answers already shipped in
// api/meta/[...path].js for the same studies.
const topKitBrand = MOST_USED_GEAR_BRANDS.categories.kits.ranked[0];
const topReachBrand = DRUM_ENDORSEMENT_LANDSCAPE.brandReach[0];
const deathMetalTempo = TEMPO_BY_SUBGENRE.genres.find((g) => g.genre === 'death-metal');
const doublePedalPercent =
  Math.round((KIT_CONFIGURATIONS.pedalConfig.overall.doublePedal / KIT_CONFIGURATIONS.totalDrummers) * 1000) / 10;

export const STUDIES = [
  {
    slug: 'most-used-gear-brands-metal',
    title: 'Most-Used Drum & Cymbal Brands in Metal',
    seoTitle: 'Most-Used Drum & Cymbal Brands in Metal: An Analysis of 67 Verified Kits',
    description:
      'A data-driven breakdown of which drum, cymbal, snare, stick, and pedal brands metal’s professional drummers actually play, counted across the 67 drummers documented on MetalForge.',
    dateModified: MOST_USED_GEAR_BRANDS.generatedAt,
    datasetSize: MOST_USED_GEAR_BRANDS.totalDrummers,
    datasetUnit: 'drummers',
    headlineStat: {
      value: `${topKitBrand.percent}%`,
      label: `${topKitBrand.brand} — most-used drum kit brand`,
      sentence: `${topKitBrand.brand} is the most-used drum kit brand in metal, played by ${topKitBrand.count} of the ${MOST_USED_GEAR_BRANDS.totalDrummers} drummers documented on MetalForge (${topKitBrand.percent}%).`,
    },
  },
  {
    slug: 'metal-tempo-by-subgenre',
    title: 'Metal Tempo by Subgenre: How Fast Is Death Metal, Really?',
    seoTitle: 'Metal Tempo by Subgenre: Average BPM Across 150 Songs',
    description:
      'Average, median, and max BPM for thrash, death, black, and 12 other metal subgenres, computed across the 150 songs in MetalForge’s tempo database, plus the 200+ BPM "hall of speed."',
    dateModified: TEMPO_BY_SUBGENRE.generatedAt,
    datasetSize: TEMPO_BY_SUBGENRE.totalSongs,
    datasetUnit: 'songs',
    headlineStat: {
      value: `${deathMetalTempo.avgBpm} BPM`,
      label: 'Death Metal — average tempo',
      sentence: `Across the ${TEMPO_BY_SUBGENRE.totalSongs} songs in MetalForge's tempo database, death metal averages ${deathMetalTempo.avgBpm} BPM, well above the all-genre average of ${TEMPO_BY_SUBGENRE.overall.avgBpm} BPM.`,
    },
  },
  {
    slug: 'drum-endorsement-landscape',
    title: 'The Drum Endorsement Landscape in Metal',
    seoTitle: 'Which Brands Endorse the Most Metal Drummers? A 67-Drummer Analysis',
    description:
      'Which drum, cymbal, snare, stick, and pedal brands reach the most drummers across MetalForge’s 67-drummer roster, signature-model counts by brand, and kit-brand patterns by genre.',
    dateModified: DRUM_ENDORSEMENT_LANDSCAPE.generatedAt,
    datasetSize: DRUM_ENDORSEMENT_LANDSCAPE.totalDrummers,
    datasetUnit: 'drummers',
    headlineStat: {
      value: `${topReachBrand.percent}%`,
      label: `${topReachBrand.brand} — widest brand reach`,
      sentence: `${topReachBrand.brand} reaches more metal drummers than any other brand tracked by MetalForge, endorsed by ${topReachBrand.count} of the ${DRUM_ENDORSEMENT_LANDSCAPE.totalDrummers} documented drummers (${topReachBrand.percent}%).`,
    },
  },
  {
    slug: 'metal-kit-configurations',
    title: 'Metal Drum Kit Configurations: Double Bass vs. Double Pedal',
    seoTitle: 'Metal Drum Kit Configurations: Double Bass vs. Double Pedal, by Genre',
    description:
      'How MetalForge’s 67 documented metal drummers set up double-kick sound — physical double bass, double pedal, or twin single pedals — plus cymbal-setup size by genre.',
    dateModified: KIT_CONFIGURATIONS.generatedAt,
    datasetSize: KIT_CONFIGURATIONS.totalDrummers,
    datasetUnit: 'drummers',
    headlineStat: {
      value: `${doublePedalPercent}%`,
      label: 'use a double-pedal setup',
      sentence: `Double pedal is by far the most common bass-drum configuration among metal drummers, used by ${KIT_CONFIGURATIONS.pedalConfig.overall.doublePedal} of the ${KIT_CONFIGURATIONS.totalDrummers} documented drummers on MetalForge (${doublePedalPercent}%).`,
    },
  },
];

export function getStudyBySlug(slug) {
  return STUDIES.find((s) => s.slug === slug) || null;
}

export function getAllStudySlugs() {
  return STUDIES.map((s) => s.slug);
}

// --- Internal-link derivation (issue #4766, phase 3/3) ----------------------
// Brand/drummer/genre pages link to the study that counts them. Every link
// below is derived from the same generated data modules the study pages
// render from — never a hand-typed slug or stat — so a stale link can't ship
// silently after the next `node scripts/compute-studies.cjs` run.

function normalizeBrandName(s) {
  return s.toLowerCase().replace(/[^a-z0-9]/g, '');
}

// Brand display names differ slightly across the per-category brand pages
// (e.g. "Vater Percussion" vs. the studies' canonical "Vater", "Pro-Mark" vs.
// "Promark") — matched by normalized substring rather than exact equality.
function brandNamesMatch(displayName, canonicalName) {
  const a = normalizeBrandName(displayName);
  const b = normalizeBrandName(canonicalName);
  return a.includes(b) || b.includes(a);
}

// Returns up to 2 links: the brand's best rank in the gear-usage study (if any
// category features it) and its rank in the endorsement-reach study (if any).
export function getBrandStudyLinks(displayBrandName) {
  const links = [];

  for (const cat of Object.values(MOST_USED_GEAR_BRANDS.categories)) {
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

  const reachIdx = DRUM_ENDORSEMENT_LANDSCAPE.brandReach.findIndex((b) => brandNamesMatch(displayBrandName, b.brand));
  if (reachIdx !== -1) {
    const b = DRUM_ENDORSEMENT_LANDSCAPE.brandReach[reachIdx];
    links.push({
      studySlug: 'drum-endorsement-landscape',
      studyTitle: 'The Drum Endorsement Landscape in Metal',
      sentence: `${b.brand} ranks #${reachIdx + 1} for overall brand reach in our endorsement-landscape study (${b.percent}% of the roster).`,
    });
  }

  return links;
}

// Drummer pages: every study whose generated data module lists this drummer
// slug in a "counted" array (top-ranked brand per category, or the endorsement
// study's top brand-reach list).
export function getDrummerStudyLinks(drummerSlug) {
  const links = [];

  const inMostUsed = Object.values(MOST_USED_GEAR_BRANDS.categories).some((cat) =>
    cat.ranked[0]?.drummers.some((d) => d.slug === drummerSlug)
  );
  if (inMostUsed) {
    links.push({
      studySlug: 'most-used-gear-brands-metal',
      studyTitle: 'Most-Used Drum & Cymbal Brands in Metal',
      sentence: 'Counted in our most-used gear brands study.',
    });
  }

  const inEndorsement = DRUM_ENDORSEMENT_LANDSCAPE.brandReach[0]?.drummers.some((d) => d.slug === drummerSlug);
  if (inEndorsement) {
    links.push({
      studySlug: 'drum-endorsement-landscape',
      studyTitle: 'The Drum Endorsement Landscape in Metal',
      sentence: 'Counted in our drum endorsement landscape study.',
    });
  }

  return links;
}

// Genre pages: tempo-by-subgenre (genre slugs, e.g. "death-metal") and
// kit-configurations (genre labels, e.g. "Death Metal") key their per-genre
// breakdowns differently — both are matched against a normalized form of the
// genre page's own slug/name.
export function getGenreStudyLinks(genreSlugOrName) {
  const norm = normalizeBrandName(genreSlugOrName);
  const links = [];

  const tempoGenre = TEMPO_BY_SUBGENRE.genres.find((g) => normalizeBrandName(g.genre) === norm || normalizeBrandName(g.label) === norm);
  if (tempoGenre) {
    links.push({
      studySlug: 'metal-tempo-by-subgenre',
      studyTitle: 'Metal Tempo by Subgenre: How Fast Is Death Metal, Really?',
      sentence: `${tempoGenre.label} averages ${tempoGenre.avgBpm} BPM across ${tempoGenre.songCount} songs in our tempo-by-subgenre study.`,
    });
  }

  const pedalGenre = KIT_CONFIGURATIONS.pedalConfig.byGenre.find((g) => normalizeBrandName(g.genre) === norm);
  if (pedalGenre) {
    links.push({
      studySlug: 'metal-kit-configurations',
      studyTitle: 'Metal Drum Kit Configurations: Double Bass vs. Double Pedal',
      sentence: `${pedalGenre.genre} drummers' bass-pedal configurations are broken down in our kit-configurations study.`,
    });
  }

  return links;
}

export default STUDIES;
