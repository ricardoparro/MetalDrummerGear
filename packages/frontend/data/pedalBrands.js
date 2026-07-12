// Pedal Brand Pages data module — Issue #4432 (split 1/3 of #4394, epic #4387
// phase 4/4). Provides positioning + notable-line content for
// /pedals/brands/<brand> for the five brands named in the issue: Tama, Pearl,
// DW, Axis, Trick.
//
// Confirmed-drummer links are computed live from data/pedals.js (PEDALS) by
// matching each brand's `dataBrandNames` against each pedal's `brand` field —
// never hardcoded here, so a brand page can only ever show a drummer that
// already has a verified pedal record. All positioning/notable-line facts are
// drawn from data already verified elsewhere in this repo: data/brands.js
// (museum brand histories), data/pedals.js (#4391 roster parse),
// data/pedalReferencePages.js (#4392 drive-type research), and
// data/genreGearGuides.js (Trick Bigfoot buying-guide entry) — no new,
// unverified facts are introduced here.

import { PEDALS } from './pedals.js';
import { hasBrand } from './brands.js';

const BASE_URL = 'https://metalforge.io';
export const BRANDS_BASE_PATH = '/pedals/brands';

export const PEDAL_BRANDS = [
  {
    slug: 'tama',
    name: 'Tama',
    dataBrandNames: ['Tama'],
    museumSlug: 'tama',
    positioning:
      "Tama is the single most common pedal brand across the verified metal roster. Its 1993 Iron Cobra launch became one of the most widely used double pedals in professional drumming and remains a metal-industry standard today — the pedal that put Tama's hardware, not just its shells, in front of touring metal drummers.",
    notableLines: [
      { name: 'Iron Cobra (900 Power Glide)', description: 'Chain-drive double pedal — Tama\'s original 1993 design, still the metal-industry standard; the Power Glide cam gives a consistent feel across the stroke range.' },
      { name: 'Speed Cobra (910)', description: 'A longboard, chain-drive double pedal — the extended footboard acts as a longer lever, needing less foot strength per stroke, which suits fast footwork and heel-toe technique.' },
      { name: 'Dyna-Sync', description: 'A direct-drive Tama pedal — a rigid connection between footboard and beater with no chain or belt, for players who want zero-slack response.' },
    ],
    source: { label: 'MetalForge brand history (data/brands.js) + verified roster pedal data', url: `${BASE_URL}/brands/tama` },
  },
  {
    slug: 'pearl',
    name: 'Pearl',
    dataBrandNames: ['Pearl'],
    museumSlug: 'pearl',
    positioning:
      "Pearl's Demon Drive and Demon XR direct-drive pedals, alongside the chain-drive Eliminator, are the extreme-metal and technical-metal standard across the verified roster — from black metal's Hellhammer-adjacent direct-drive camp to George Kollias' co-designed Demon XR.",
    notableLines: [
      { name: 'Demon Drive', description: 'Direct-drive double pedal — a rigid rod with no chain or belt, giving the fastest, most consistent response of any drive type; the most common Pearl pedal on the verified roster.' },
      { name: 'Demon XR', description: 'A co-designed evolution of the Demon Drive, direct drive, used by technical-death-metal specialists chasing sustained blast-beat speed.' },
      { name: 'Eliminator', description: 'Chain-drive double pedal — Pearl\'s more traditional-feel option alongside its direct-drive Demon line.' },
    ],
    source: { label: 'MetalForge brand history (data/brands.js) + verified roster pedal data', url: `${BASE_URL}/brands/pearl` },
  },
  {
    slug: 'dw',
    name: 'DW',
    dataBrandNames: ['DW'],
    museumSlug: 'dw',
    positioning:
      "DW's pedal lineage traces back to the 1979 DW 5000, an improved version of the old Camco 5000 design that became an industry-standard piece of hardware. The 5000 and 9000 Series chain-drive pedals appear throughout the verified metal roster, prized for precision and touring reliability, alongside the direct-drive MDD for drummers who want DW's build quality without any chain.",
    notableLines: [
      { name: '5000 Series', description: 'Chain drive — DW\'s original 1979 pedal design, an industry benchmark that the whole 9000 lineage descends from.' },
      { name: '9000 Series', description: 'Chain drive — DW\'s heavy-duty, fully adjustable flagship double pedal, the most common DW pedal on the verified roster.' },
      { name: 'MDD (Machined Direct Drive)', description: 'Direct drive — DW\'s no-chain, no-belt option, giving the rigid, zero-slack feel extreme metal drummers chasing sustained speed look for.' },
    ],
    source: { label: 'MetalForge brand history (data/brands.js) + verified roster pedal data', url: `${BASE_URL}/brands/dw` },
  },
  {
    slug: 'axis',
    name: 'Axis',
    dataBrandNames: ['Axis'],
    museumSlug: 'axis',
    positioning:
      "Axis Percussion was founded in 1990 by drummer and machinist Darrell Johnston specifically to eliminate the flex and lag inherent in chain-drive pedals. Every Axis model is direct drive — no chain or belt at all — which has made the brand an extreme-metal icon among drummers chasing maximum, zero-lag blast-beat speed, including Mayhem's Jan Axel \"Hellhammer\" Blomberg.",
    notableLines: [
      { name: 'A Longboard', description: 'Direct-drive double pedal with an extended footboard for extra leverage — used by Trivium\'s Alex Bent.' },
      { name: 'Percussion Double Pedal', description: 'Direct-drive double pedal built for zero-lag speed and consistency — used by Martin Lopez (ex-Opeth, Soen).' },
    ],
    source: { label: 'MetalForge brand history (data/brands.js) + verified roster pedal data', url: `${BASE_URL}/brands/axis` },
  },
  {
    slug: 'trick',
    name: 'Trick',
    dataBrandNames: ['Trick'],
    museumSlug: null,
    positioning:
      "Trick is the niche, ultra-premium end of the metal pedal market — direct-drive pedals CNC-machined from billet aluminum to tolerances tighter than production hardware. It's the end-game upgrade for technically elite players who have already mastered technique on production pedals and want to eliminate every remaining mechanical variable, rather than a brand aimed at drummers still building technique.",
    notableLines: [
      { name: 'Pro1-V', description: 'Direct-drive double pedal — the model Art Cruz (Lamb of God) plays; CNC-machined for an action that experienced drummers describe as transformative.' },
      { name: 'Bigfoot', description: 'Direct-drive double pedal with a fully adjustable footboard and cam geometry — the boutique choice for drummers who\'ve outgrown production pedals.' },
    ],
    source: { label: 'MetalForge genre gear guide (data/genreGearGuides.js) + verified roster pedal data', url: `${BASE_URL}/pedals` },
  },
];

export function getPedalBrand(slug) {
  if (!slug) return null;
  return PEDAL_BRANDS.find((b) => b.slug === slug.toLowerCase()) || null;
}

export function isValidPedalBrandSlug(slug) {
  return !!getPedalBrand(slug);
}

// All PEDALS entries whose `brand` field matches this brand's dataBrandNames
// — i.e. the confirmed, verified drummer mapping for this pedal brand. Never
// hand-authored; always derived from data/pedals.js.
export function getConfirmedPedalsForBrand(brand) {
  if (!brand || !brand.dataBrandNames || brand.dataBrandNames.length === 0) return [];
  return PEDALS.filter((pedal) => pedal.brand && brand.dataBrandNames.includes(pedal.brand));
}

// Whether this pedal brand has a matching /brands/<slug> museum page (#4386/#4388).
export function hasMuseumBrandPage(brand) {
  return !!(brand && brand.museumSlug && hasBrand(brand.museumSlug));
}

export function generateBrandCanonicalUrl(slug) {
  return `${BASE_URL}${BRANDS_BASE_PATH}/${slug}`;
}

export function generateBrandTitle(brand) {
  return `${brand.name} Bass Drum Pedals: Lines, Positioning & Which Drummers Use Them | MetalForge`;
}

export function generateBrandDescription(brand, confirmedPedals) {
  if (confirmedPedals.length > 0) {
    const count = confirmedPedals.length;
    return `${brand.name} bass drum pedals — positioning, notable lines, and the ${count} metal drummer${count === 1 ? '' : 's'} in our database confirmed to play them.`;
  }
  return `${brand.name} bass drum pedals — company background, positioning, and notable product lines for metal drummers.`;
}

// ItemList (confirmed pedals) + BreadcrumbList JSON-LD for a single pedal
// brand page. Returns a plain array safe to JSON.stringify.
export function generateBrandSchema(brand, confirmedPedals) {
  if (!brand) return null;
  const canonicalUrl = generateBrandCanonicalUrl(brand.slug);

  const schemas = [];

  if (confirmedPedals.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: `${brand.name} signature bass drum pedals played by metal drummers`,
      itemListElement: confirmedPedals.map((pedal, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'Product',
          name: `${pedal.brand}${pedal.model ? ` ${pedal.model}` : ''}`,
          brand: { '@type': 'Brand', name: pedal.brand },
          category: 'Bass Drum Pedals',
          url: `${BASE_URL}/pedals/setups/${pedal.drummerSlug}`,
        },
      })),
    });
  }

  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Pedals', item: `${BASE_URL}/pedals` },
      { '@type': 'ListItem', position: 2, name: brand.name, item: canonicalUrl },
    ],
  });

  return schemas;
}

export default {
  PEDAL_BRANDS,
  BRANDS_BASE_PATH,
  getPedalBrand,
  isValidPedalBrandSlug,
  getConfirmedPedalsForBrand,
  hasMuseumBrandPage,
  generateBrandCanonicalUrl,
  generateBrandTitle,
  generateBrandDescription,
  generateBrandSchema,
};
