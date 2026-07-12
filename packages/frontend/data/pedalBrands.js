// Pedal Brand Pages data module — Issue #4432 (split 1/3 of #4394)
// Provides positioning + metal-relevant-line content for /pedals/brands (hub)
// and /pedals/brands/<brand> (per-brand detail): Tama, Pearl, DW, Axis, Trick.
//
// Confirmed-drummer links are computed live from data/pedals.js (PEDALS, via
// the existing getPedalsByBrand helper) by matching each brand's
// `dataBrandNames` — never hardcoded here. That keeps the "no fabricated
// endorsements" rule mechanical: a brand page can only ever show a drummer
// that already has a verified entry in the pedals data module.
//
// Company-history facts (founded/parent) are reused verbatim from the
// already-verified data/brands.js museum module (Tama, Pearl, DW, Axis all
// have full /brands/<slug> pages there); Trick has no museum entry yet, so
// its page omits founded/parent rather than guessing. Positioning/line facts
// otherwise draw on data/pedalReferencePages.js and data/pedalBestForMetal.js
// (both already source-cited to Sweetwater/Sound Pure) — no new unverified
// facts are introduced by this module.

import { getPedalsByBrand } from './pedals.js';
import { hasBrand as hasFullBrandPage } from './brands.js';

const BASE_URL = 'https://metalforge.io';
export const BRANDS_BASE_PATH = '/pedals/brands';

export const PEDAL_BRANDS = [
  {
    slug: 'tama',
    name: 'Tama',
    dataBrandNames: ['Tama'],
    founded: '1974, Nagoya, Japan (Hoshino Gakki)',
    parent: 'Part of Hoshino Gakki, which also owns the Ibanez guitar brand',
    positioning:
      "Tama is the single most common pedal brand across MetalForge's verified metal roster. Its 1993-launched Iron Cobra bass drum pedal became a metal-industry-standard chain-drive double pedal, and the newer Speed Cobra extends that chain-drive design with a longboard footboard for extra leverage. Lars Ulrich has been an official Tama artist since the mid-1980s, building his kits around Tama shells and, later, the Iron Cobra pedal.",
    notableLines: [
      { name: 'Iron Cobra (incl. 900 / Power Glide)', description: 'Chain drive — the most common single pedal model across the verified metal roster, from Lars Ulrich to Dave Lombardo.' },
      { name: 'Speed Cobra (incl. 910)', description: 'Chain drive with a longboard footboard for extra leverage; used across the roster by drummers including Tomas Haake and Dirk Verbeuren.' },
      { name: 'Dyna-Sync', description: "Tama's direct-drive pedal — not yet confirmed on the verified roster, but part of the brand's current lineup alongside the chain-drive Cobra pedals." },
    ],
    source: { label: 'Tama — official site', url: 'https://www.tama.com' },
  },
  {
    slug: 'pearl',
    name: 'Pearl',
    dataBrandNames: ['Pearl'],
    founded: '1946, Tokyo, Japan',
    parent: 'Independent — one of the largest drum manufacturers in the world',
    positioning:
      "Pearl is one of the world's largest drum manufacturers, and its direct-drive Demon Drive (and newer Demon XR) is the extreme-metal pedal standard on the verified roster — used across black, death, and technical metal by drummers including Joey Jordison, Gene Hoglan, and George Kollias. The chain-drive Eliminator sits alongside Demon Drive as Pearl's other verified metal pedal line.",
    notableLines: [
      { name: 'Demon Drive', description: 'Direct drive — Pearl\'s extreme-metal flagship, the most common Pearl pedal across the verified roster.' },
      { name: 'Demon XR', description: 'Direct drive, co-designed with George Kollias for extreme-speed technical death metal playing.' },
      { name: 'Eliminator', description: 'Chain drive — a more traditional-feeling alternative to Demon Drive, used by drummers including Kevin Talley and Paul Bostaph.' },
    ],
    source: { label: 'Pearl Drums — company history (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Pearl_Drums' },
  },
  {
    slug: 'dw',
    name: 'DW',
    dataBrandNames: ['DW'],
    founded: '1972, Santa Monica, California, USA',
    parent: 'Independent, California custom shop',
    positioning:
      "DW's pedal lineage traces back to the 1979 DW 5000, an update of the old Camco 5000 design that became an industry benchmark for bass drum pedal hardware. The 9000 Series is DW's most common chain-drive pedal across the verified metal roster, while the direct-drive MDD extends the lineup for drummers who want a rigid, zero-slack alternative to the 5000/9000's chain drive.",
    notableLines: [
      { name: '9000 Series', description: 'Chain drive — DW\'s most common pedal on the verified metal roster, prized for adjustability and touring reliability.' },
      { name: '5000 (incl. 5000 Series)', description: "DW's original 1979 pedal design, still in the current catalog as a chain-drive option; used by drummers including Sean Reinert and Nick Menza." },
      { name: 'MDD (Machined Direct Drive)', description: "DW's direct-drive pedal — not yet confirmed on the verified roster, but part of the brand's current direct-drive lineup alongside the chain-drive 5000/9000 Series." },
    ],
    source: { label: 'DW — The DW Story', url: 'https://dwdrums.com/the-dw-story/' },
  },
  {
    slug: 'axis',
    name: 'Axis',
    dataBrandNames: ['Axis'],
    founded: '1990, Southern California, USA (founder Darrell Johnston)',
    parent: 'Independent — now AXiS Pedal & Drum Co.',
    positioning:
      "Axis is built entirely around direct drive — a rigid rod connecting footboard straight to beater, with no chain or belt at all — making it the extreme-metal direct-drive icon on the verified roster. That zero-lag, zero-slack feel is why drummers chasing maximum blast-beat speed, from Hellhammer (Mayhem) to Alex Bent (Trivium) and Martin Lopez (ex-Opeth, Soen), have built their kits around Axis pedals.",
    notableLines: [
      { name: 'AXiS A / A Longboard', description: 'Direct drive with an adjustable cam; the Longboard extends the footboard for extra leverage — used by Alex Bent (Trivium).' },
      { name: 'AXiS Percussion Double Pedal', description: 'Direct drive — used by Martin Lopez (ex-Opeth, Soen).' },
      { name: 'Axis Double Pedal (base model)', description: 'Direct drive — used by Jan Axel "Hellhammer" Blomberg (Mayhem).' },
    ],
    source: { label: 'Axis Percussion — About Axis', url: 'https://axispdc.com/pages/about-axis' },
  },
  {
    slug: 'trick',
    name: 'Trick',
    dataBrandNames: ['Trick'],
    positioning:
      "Trick is a boutique, CNC-machined pedal maker whose direct-drive Pro1-V and Bigfoot models are built for technically elite players who've outgrown production hardware. On the verified roster, Art Cruz (Lamb of God) plays a Trick Pro 1-V double pedal, matching the direct-drive-for-extreme-speed pattern set by Axis and Pearl's Demon Drive.",
    notableLines: [
      { name: 'Pro1-V (Pro 1-V)', description: 'Direct drive, CNC-machined — used by Art Cruz (Lamb of God).' },
      { name: 'Bigfoot', description: "Direct drive — part of Trick's catalog alongside the Pro1-V; not yet confirmed on the verified roster." },
    ],
    source: { label: 'Sweetwater InSync — Kick Pedal Drive Types Explained', url: 'https://www.sweetwater.com/insync/kick-pedal-drive-types-explained/' },
  },
];

export function getBrand(slug) {
  if (!slug) return null;
  return PEDAL_BRANDS.find((b) => b.slug === slug.toLowerCase()) || null;
}

export function isValidBrandSlug(slug) {
  return !!getBrand(slug);
}

// All PEDALS entries whose `brand` field matches this brand's dataBrandNames
// — i.e. the confirmed, verified drummer mapping for this brand. Never
// hand-authored; always derived from data/pedals.js via getPedalsByBrand.
export function getConfirmedPedalsForBrand(brand) {
  if (!brand || !brand.dataBrandNames || brand.dataBrandNames.length === 0) return [];
  return brand.dataBrandNames.flatMap((name) => getPedalsByBrand(name));
}

export function hasBrandMuseumPage(slug) {
  return hasFullBrandPage(slug);
}

export function generateBrandCanonicalUrl(slug) {
  return `${BASE_URL}${BRANDS_BASE_PATH}/${slug}`;
}

export function generateBrandsHubCanonicalUrl() {
  return `${BASE_URL}${BRANDS_BASE_PATH}`;
}

export function generateBrandTitle(brand) {
  return `${brand.name} Bass Drum Pedals: Metal-Relevant Lines & Which Drummers Use Them | MetalForge`;
}

export function generateBrandDescription(brand, confirmedPedals) {
  if (confirmedPedals.length > 0) {
    const count = confirmedPedals.length;
    return `${brand.name} bass drum pedals — positioning, metal-relevant lines, and the ${count} metal drummer${count === 1 ? '' : 's'} in our database confirmed to play them.`;
  }
  return `${brand.name} bass drum pedals — positioning and notable metal-relevant lines.`;
}

// ItemList (confirmed drummers) + BreadcrumbList JSON-LD for a single brand
// page. Returns a plain array safe to JSON.stringify.
export function generateBrandSchema(brand, confirmedPedals) {
  if (!brand) return null;
  const canonicalUrl = generateBrandCanonicalUrl(brand.slug);

  const schemas = [];

  if (confirmedPedals.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: `${brand.name} pedal setups played by metal drummers`,
      itemListElement: confirmedPedals.map((pedal, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'Product',
          name: `${brand.name} pedal setup`,
          brand: { '@type': 'Brand', name: brand.name },
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
      { '@type': 'ListItem', position: 2, name: 'Brands', item: `${BASE_URL}${BRANDS_BASE_PATH}` },
      { '@type': 'ListItem', position: 3, name: brand.name, item: canonicalUrl },
    ],
  });

  return schemas;
}

// ItemList + BreadcrumbList JSON-LD for the /pedals/brands hub.
export function generateBrandsHubSchema() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Bass drum pedal brands',
      itemListElement: PEDAL_BRANDS.map((brand, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'Brand',
          name: brand.name,
          url: generateBrandCanonicalUrl(brand.slug),
        },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Pedals', item: `${BASE_URL}/pedals` },
        { '@type': 'ListItem', position: 2, name: 'Brands', item: `${BASE_URL}${BRANDS_BASE_PATH}` },
      ],
    },
  ];
}

export default {
  PEDAL_BRANDS,
  BRANDS_BASE_PATH,
  getBrand,
  isValidBrandSlug,
  getConfirmedPedalsForBrand,
  hasBrandMuseumPage,
  generateBrandCanonicalUrl,
  generateBrandsHubCanonicalUrl,
  generateBrandTitle,
  generateBrandDescription,
  generateBrandSchema,
  generateBrandsHubSchema,
};
