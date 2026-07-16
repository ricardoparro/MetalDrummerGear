// Studies registry (issue #4764, phase 1/3 of epic #4763).
//
// Single source of truth for which /studies/<slug> pages exist. The /studies hub,
// the sitemap (api/sitemap.js), and the bot-facing SSR handler (api/meta/[...path].js)
// all read this list instead of hand-listing studies in three places that can drift.
//
// Hand-authored: title/description/methodology copy for each study. NOT
// hand-authored: any number referenced from that copy — those come from the
// generated data file under data/studies/ (see dataModule/dataExport below).

import { MOST_USED_GEAR_BRANDS } from './mostUsedGearBrands.js';

export const STUDIES = [
  {
    slug: 'most-used-gear-brands-metal',
    title: 'Most-Used Drum & Cymbal Brands in Metal',
    seoTitle: 'Most-Used Drum & Cymbal Brands in Metal: An Analysis of 67 Verified Kits',
    description:
      'A data-driven breakdown of which drum, cymbal, snare, stick, and pedal brands metal’s professional drummers actually play, counted across the 67 drummers documented on MetalForge.',
    dateModified: MOST_USED_GEAR_BRANDS.generatedAt,
    datasetSize: MOST_USED_GEAR_BRANDS.totalDrummers,
  },
];

export function getStudyBySlug(slug) {
  return STUDIES.find((s) => s.slug === slug) || null;
}

export function getAllStudySlugs() {
  return STUDIES.map((s) => s.slug);
}

export default STUDIES;
