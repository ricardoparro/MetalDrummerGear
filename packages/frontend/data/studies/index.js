// Studies registry (epic #4763; phase 1: issue #4764, phase 2: issue #4765).
//
// Single source of truth for which /studies/<slug> pages exist. The /studies hub,
// the sitemap (api/sitemap.js), and the bot-facing SSR handler (api/meta/[...path].js)
// all read this list instead of hand-listing studies in three places that can drift.
//
// Hand-authored: title/description/methodology copy for each study. NOT
// hand-authored: any number referenced from that copy — those come from the
// generated data file under data/studies/ (see dataModule/dataExport below).
//
// Note (issue #7150): this registry reads only STUDY_SUMMARY (a small scalar index),
// not the four full datasets — the hub page and every individual study page share
// this module, and pulling the full ~200KB datasets in here got them bundler-hoisted
// into the always-preloaded common chunk. Each individual /studies/<slug> page still
// imports its own full dataset directly for the detailed breakdown it renders.

import { STUDY_SUMMARY } from './studySummary.js';

const { mostUsedGearBrands, tempoBySubgenre, drumEndorsementLandscape, kitConfigurations } = STUDY_SUMMARY;

export const STUDIES = [
  {
    slug: 'most-used-gear-brands-metal',
    title: 'Most-Used Drum & Cymbal Brands in Metal',
    seoTitle: `Most-Used Drum & Cymbal Brands in Metal: An Analysis of ${mostUsedGearBrands.totalDrummers} Verified Kits`,
    description:
      `A data-driven breakdown of which drum, cymbal, snare, stick, and pedal brands metal’s professional drummers actually play, counted across the ${mostUsedGearBrands.totalDrummers} drummers documented on MetalForge.`,
    dateModified: mostUsedGearBrands.generatedAt,
    datasetSize: mostUsedGearBrands.totalDrummers,
    datasetUnit: 'drummers',
    headlineStat: {
      value: `${mostUsedGearBrands.topKitBrand.percent}%`,
      label: `${mostUsedGearBrands.topKitBrand.brand} — most-used drum kit brand`,
      sentence: `${mostUsedGearBrands.topKitBrand.brand} is the most-used drum kit brand in metal, played by ${mostUsedGearBrands.topKitBrand.count} of the ${mostUsedGearBrands.totalDrummers} drummers documented on MetalForge (${mostUsedGearBrands.topKitBrand.percent}%).`,
    },
  },
  {
    slug: 'metal-tempo-by-subgenre',
    title: 'Metal Tempo by Subgenre: How Fast Is Death Metal, Really?',
    seoTitle: `Metal Tempo by Subgenre: Average BPM Across ${tempoBySubgenre.totalSongs} Songs`,
    description:
      `Average, median, and max BPM for thrash, death, black, and 12 other metal subgenres, computed across the ${tempoBySubgenre.totalSongs} songs in MetalForge’s tempo database, plus the 200+ BPM "hall of speed."`,
    dateModified: tempoBySubgenre.generatedAt,
    datasetSize: tempoBySubgenre.totalSongs,
    datasetUnit: 'songs',
    headlineStat: {
      value: `${tempoBySubgenre.deathMetalAvgBpm} BPM`,
      label: 'Death Metal — average tempo',
      sentence: `Across the ${tempoBySubgenre.totalSongs} songs in MetalForge's tempo database, death metal averages ${tempoBySubgenre.deathMetalAvgBpm} BPM, well above the all-genre average of ${tempoBySubgenre.overallAvgBpm} BPM.`,
    },
  },
  {
    slug: 'drum-endorsement-landscape',
    title: 'The Drum Endorsement Landscape in Metal',
    seoTitle: `Which Brands Endorse the Most Metal Drummers? A ${drumEndorsementLandscape.totalDrummers}-Drummer Analysis`,
    description:
      `Which drum, cymbal, snare, stick, and pedal brands reach the most drummers across MetalForge’s ${drumEndorsementLandscape.totalDrummers}-drummer roster, signature-model counts by brand, and kit-brand patterns by genre.`,
    dateModified: drumEndorsementLandscape.generatedAt,
    datasetSize: drumEndorsementLandscape.totalDrummers,
    datasetUnit: 'drummers',
    headlineStat: {
      value: `${drumEndorsementLandscape.topReachBrand.percent}%`,
      label: `${drumEndorsementLandscape.topReachBrand.brand} — widest brand reach`,
      sentence: `${drumEndorsementLandscape.topReachBrand.brand} reaches more metal drummers than any other brand tracked by MetalForge, endorsed by ${drumEndorsementLandscape.topReachBrand.count} of the ${drumEndorsementLandscape.totalDrummers} documented drummers (${drumEndorsementLandscape.topReachBrand.percent}%).`,
    },
  },
  {
    slug: 'metal-kit-configurations',
    title: 'Metal Drum Kit Configurations: Double Bass vs. Double Pedal',
    seoTitle: 'Metal Drum Kit Configurations: Double Bass vs. Double Pedal, by Genre',
    description:
      `How MetalForge’s ${kitConfigurations.totalDrummers} documented metal drummers set up double-kick sound — physical double bass, double pedal, or twin single pedals — plus cymbal-setup size by genre.`,
    dateModified: kitConfigurations.generatedAt,
    datasetSize: kitConfigurations.totalDrummers,
    datasetUnit: 'drummers',
    headlineStat: {
      value: `${kitConfigurations.doublePedalPercent}%`,
      label: 'use a double-pedal setup',
      sentence: `Double pedal is by far the most common bass-drum configuration among metal drummers, used by ${kitConfigurations.doublePedalCount} of the ${kitConfigurations.totalDrummers} documented drummers on MetalForge (${kitConfigurations.doublePedalPercent}%).`,
    },
  },
];

export function getStudyBySlug(slug) {
  return STUDIES.find((s) => s.slug === slug) || null;
}

export function getAllStudySlugs() {
  return STUDIES.map((s) => s.slug);
}

// Brand/drummer/genre link-derivation helpers moved to ./links.js (issue #7150) so
// App.js and the brand-page components can import them without pulling in the full
// datasets above — re-exported here so this module's public API is unchanged for
// Node-side callers (api/meta, api/sitemap, api/card, scripts/generate-llms-*.cjs).
export { getBrandStudyLinks, getDrummerStudyLinks, getGenreStudyLinks } from './links.js';

export default STUDIES;
