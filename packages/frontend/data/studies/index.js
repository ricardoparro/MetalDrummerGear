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
  },
];

export function getStudyBySlug(slug) {
  return STUDIES.find((s) => s.slug === slug) || null;
}

export function getAllStudySlugs() {
  return STUDIES.map((s) => s.slug);
}

export default STUDIES;
