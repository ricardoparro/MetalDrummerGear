// Studies registry (epic #4763; phase 1: issue #4764, phase 2: issue #4765).
//
// Single source of truth for which /studies/<slug> pages exist. The /studies hub,
// the sitemap (api/sitemap.js), and the bot-facing SSR handler (api/meta/[...path].js)
// all read this list instead of hand-listing studies in three places that can drift.
//
// Hand-authored: title/description/methodology copy for each study. NOT
// hand-authored: any number referenced from that copy — those come from
// STUDY_HEADLINES (see below).

// Issue #7150: this file used to import all four full generated datasets
// (mostUsedGearBrands.js/tempoBySubgenre.js/drumEndorsementLandscape.js/
// kitConfigurations.js, ~200KB) just to compute each study's headlineStat/
// dateModified/datasetSize. StudiesHubPage + every individual /studies/<slug> page
// (which each already import their OWN dataset directly for their full rankings
// table) all share this one file, so a shared-chunk bundler was hoisting all four
// datasets into the always-preloaded web bundle. STUDY_HEADLINES/getDrummerStudyLinks/
// getGenreStudyLinks/getBrandStudyLinks are precomputed from those same datasets by
// scripts/compute-studies.cjs into membershipIndex.js — small enough that every
// shared consumer of this file (including packages/frontend/App.js and the four
// *BrandPage components) no longer needs the full datasets at all.
import { STUDY_HEADLINES, getDrummerStudyLinks, getGenreStudyLinks, getBrandStudyLinks } from './membershipIndex.js';

export { getDrummerStudyLinks, getGenreStudyLinks, getBrandStudyLinks };

export const STUDIES = [
  {
    slug: 'most-used-gear-brands-metal',
    title: 'Most-Used Drum & Cymbal Brands in Metal',
    seoTitle: `Most-Used Drum & Cymbal Brands in Metal: An Analysis of ${STUDY_HEADLINES['most-used-gear-brands-metal'].datasetSize} Verified Kits`,
    description:
      `A data-driven breakdown of which drum, cymbal, snare, stick, and pedal brands metal’s professional drummers actually play, counted across the ${STUDY_HEADLINES['most-used-gear-brands-metal'].datasetSize} drummers documented on MetalForge.`,
    dateModified: STUDY_HEADLINES['most-used-gear-brands-metal'].dateModified,
    datasetSize: STUDY_HEADLINES['most-used-gear-brands-metal'].datasetSize,
    datasetUnit: 'drummers',
    headlineStat: STUDY_HEADLINES['most-used-gear-brands-metal'].headlineStat,
  },
  {
    slug: 'metal-tempo-by-subgenre',
    title: 'Metal Tempo by Subgenre: How Fast Is Death Metal, Really?',
    seoTitle: `Metal Tempo by Subgenre: Average BPM Across ${STUDY_HEADLINES['metal-tempo-by-subgenre'].datasetSize} Songs`,
    description:
      `Average, median, and max BPM for thrash, death, black, and 12 other metal subgenres, computed across the ${STUDY_HEADLINES['metal-tempo-by-subgenre'].datasetSize} songs in MetalForge’s tempo database, plus the 200+ BPM "hall of speed."`,
    dateModified: STUDY_HEADLINES['metal-tempo-by-subgenre'].dateModified,
    datasetSize: STUDY_HEADLINES['metal-tempo-by-subgenre'].datasetSize,
    datasetUnit: 'songs',
    headlineStat: STUDY_HEADLINES['metal-tempo-by-subgenre'].headlineStat,
  },
  {
    slug: 'drum-endorsement-landscape',
    title: 'The Drum Endorsement Landscape in Metal',
    seoTitle: `Which Brands Endorse the Most Metal Drummers? A ${STUDY_HEADLINES['drum-endorsement-landscape'].datasetSize}-Drummer Analysis`,
    description:
      `Which drum, cymbal, snare, stick, and pedal brands reach the most drummers across MetalForge’s ${STUDY_HEADLINES['drum-endorsement-landscape'].datasetSize}-drummer roster, signature-model counts by brand, and kit-brand patterns by genre.`,
    dateModified: STUDY_HEADLINES['drum-endorsement-landscape'].dateModified,
    datasetSize: STUDY_HEADLINES['drum-endorsement-landscape'].datasetSize,
    datasetUnit: 'drummers',
    headlineStat: STUDY_HEADLINES['drum-endorsement-landscape'].headlineStat,
  },
  {
    slug: 'metal-kit-configurations',
    title: 'Metal Drum Kit Configurations: Double Bass vs. Double Pedal',
    seoTitle: 'Metal Drum Kit Configurations: Double Bass vs. Double Pedal, by Genre',
    description:
      `How MetalForge’s ${STUDY_HEADLINES['metal-kit-configurations'].datasetSize} documented metal drummers set up double-kick sound — physical double bass, double pedal, or twin single pedals — plus cymbal-setup size by genre.`,
    dateModified: STUDY_HEADLINES['metal-kit-configurations'].dateModified,
    datasetSize: STUDY_HEADLINES['metal-kit-configurations'].datasetSize,
    datasetUnit: 'drummers',
    headlineStat: STUDY_HEADLINES['metal-kit-configurations'].headlineStat,
  },
];

export function getStudyBySlug(slug) {
  return STUDIES.find((s) => s.slug === slug) || null;
}

export function getAllStudySlugs() {
  return STUDIES.map((s) => s.slug);
}

export default STUDIES;
