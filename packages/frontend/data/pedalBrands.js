// Pedal Brand Pages data module — Issue #4432 (split 1/3 of #4394)
// Provides positioning + notable-line content for /pedals/brands/<brand>
// (Tama, Pearl, DW, Axis, Trick).
//
// Confirmed-drummer links are computed live from data/pedals.js (PEDALS) by
// matching each brand's `dataBrandNames` against each pedal record's `brand`
// field — never hardcoded here. That keeps the "no fabricated endorsements"
// rule mechanical: a brand page can only ever show a drummer that already has
// a verified pedal record in data/pedals.js (#4391, itself parsed from
// verified roster gear.hardware strings).
//
// Positioning/line facts are drawn from data/pedals.js, data/pedalReferencePages.js
// (#4392) and, for Tama/Pearl/DW/Axis, the founding facts already verified in
// data/brands.js (#656 and #4389) — no new unverified facts are introduced.
// Trick has no /brands/<slug> museum page and no verified founding-history
// facts anywhere in the codebase, so its `founded`/`parent` fields are
// intentionally omitted rather than guessed.

import { PEDALS } from './pedals.js';

const BASE_URL = 'https://metalforge.io';
export const BRANDS_BASE_PATH = '/pedals/brands';

export const PEDAL_BRANDS = [
  {
    slug: 'tama',
    name: 'Tama',
    dataBrandNames: ['Tama'],
    founded: '1974, Nagoya, Japan (Hoshino Gakki)',
    parent: 'Hoshino Gakki also owns the Ibanez guitar brand',
    positioning:
      "Tama is the single most common pedal brand across the verified metal roster, anchored by the Iron Cobra — launched in 1993 and still a metal-industry standard — and the longboard-footboard Speed Cobra. Both are chain drive, giving the natural, slightly cushioned feel that most drummers find comfortable and powerful, while the direct-drive Dyna-Sync sits alongside them for players who want a zero-slack, cam-less feel from a Tama pedal.",
    notableLines: [
      { name: 'Iron Cobra', description: 'Chain drive, standard-length footboard — the industry-standard double pedal since its 1993 launch, and the most common single model across the verified metal roster.' },
      { name: 'Speed Cobra', description: 'Chain drive with an extended longboard footboard, trading a touch of raw power for less foot strength per stroke — built for fast footwork and heel-toe technique.' },
      { name: 'Dyna-Sync', description: "Tama's direct-drive pedal, connecting footboard to beater with a rigid rod for the zero-slack feel extreme-metal specialists reach for." },
    ],
    source: { label: 'Tama — official site', url: 'https://www.tama.com' },
  },
  {
    slug: 'pearl',
    name: 'Pearl',
    dataBrandNames: ['Pearl'],
    founded: '1946, Tokyo, Japan',
    parent: 'Independent; one of the largest drum manufacturers in the world',
    positioning:
      "Pearl's pedal lineup splits into two verified-roster standards: the chain-drive Eliminator, and the direct-drive Demon Drive (and its Demon XR sibling) built specifically for speed and durability under heavy touring use. Demon Drive in particular is the extreme-metal and technical-metal default on this roster, played by drummers from Gene Hoglan and Joey Jordison to Mike Mangini.",
    notableLines: [
      { name: 'Demon Drive', description: 'Direct drive, engineered for maximum speed — the most common single pedal model on the verified extreme/technical metal roster, from Gene Hoglan to Mike Mangini.' },
      { name: 'Demon XR', description: 'A direct-drive evolution of the Demon Drive, co-designed with roster drummer George Kollias.' },
      { name: 'Eliminator', description: 'Chain drive — a more traditional-feel double pedal used by drummers including Paul Bostaph and Jaska Raatikainen.' },
    ],
    source: { label: 'Pearl Drums — Wikipedia (company history)', url: 'https://en.wikipedia.org/wiki/Pearl_Drums' },
  },
  {
    slug: 'dw',
    name: 'DW',
    dataBrandNames: ['DW'],
    founded: '1972, Santa Monica, California, USA',
    parent: 'Drum Workshop, Inc.',
    positioning:
      "DW built its pedal reputation on chain drive: the DW 5000, launched in 1979 as an improved take on the old Camco 5000 design, became an industry-benchmark piece of hardware, and the 9000 Series is the brand's current heavy-duty chain-drive standard across the verified roster. The direct-drive MDD (Machined Direct Drive) extends that lineup for drummers who want DW's build quality with a zero-slack feel.",
    notableLines: [
      { name: '9000 Series', description: 'Chain drive — DW\'s current heavy-duty double pedal, the most common DW model across the verified roster (Jay Weinberg, Shannon Larkin, Scott Travis, and others).' },
      { name: '5000 (Series)', description: 'Chain drive — DW\'s original 1979 pedal design, an industry benchmark still used on the verified roster (Raymond Herrera, Sean Reinert, Nick Menza).' },
      { name: 'MDD (Machined Direct Drive)', description: 'Direct drive — DW\'s zero-slack, cam-less pedal for players who want DW build quality without chain flex.' },
    ],
    source: { label: 'DW — The DW Story', url: 'https://dwdrums.com/the-dw-story/' },
  },
  {
    slug: 'axis',
    name: 'Axis',
    dataBrandNames: ['Axis'],
    founded: '1990, Southern California, USA',
    parent: 'AXiS Pedal & Drum Co.',
    positioning:
      "Axis is the direct-drive specialist: founded in 1990 by drummer and machinist Darrell Johnston specifically to eliminate the flex and lag of chain-drive designs, every Axis pedal connects footboard to beater with a rigid rod and an adjustable cam — no chain, no belt, at any price point. That rigid, zero-lag feel has made Axis an extreme-metal icon, built into the setups of drummers chasing maximum, sustained blast-beat speed.",
    notableLines: [
      { name: 'AXiS A / AXiS A Longboard', description: "Axis's flagship direct-drive double pedal, with a Longboard variant offering an extended footboard for more leverage — used by Alex Bent (Trivium)." },
      { name: 'AXiS Percussion Double Pedal', description: 'Direct-drive double pedal built for zero-lag speed and consistency — used by Martin Lopez (ex-Opeth, Soen).' },
    ],
    source: { label: 'Axis Percussion — About Axis', url: 'https://axispdc.com/pages/about-axis' },
  },
  {
    slug: 'trick',
    name: 'Trick',
    dataBrandNames: ['Trick'],
    positioning:
      'Trick is a boutique, CNC-machined pedal maker whose direct-drive Pro1-V and Bigfoot models are built for technically elite players who have outgrown production hardware — a smaller-run, precision-machined alternative to the chain-drive majors, verified on this roster through Art Cruz\'s Pro1-V.',
    notableLines: [
      { name: 'Pro1-V', description: 'CNC-machined, direct-drive double pedal — the verified-roster model, used by Art Cruz (Lamb of God).' },
      { name: 'Bigfoot', description: "Trick's direct-drive single-pedal model, built with the same CNC-machined precision as the Pro1-V." },
    ],
    source: { label: 'MetalForge — Pedals Guide (verified roster data)', url: `${BASE_URL}/pedals` },
  },
];

export function getBrand(slug) {
  if (!slug) return null;
  return PEDAL_BRANDS.find((b) => b.slug === slug.toLowerCase()) || null;
}

export function isValidBrandSlug(slug) {
  return !!getBrand(slug);
}

// Finds the brand-page entry for a PEDALS record whose `brand` field matches
// this brand's data name — used by the drummer-page pedal block to link a
// drummer to the matching /pedals/brands/<brand> page.
export function getBrandForPedal(pedal) {
  if (!pedal || !pedal.brand) return null;
  return PEDAL_BRANDS.find((b) => b.dataBrandNames.includes(pedal.brand)) || null;
}

// All PEDALS entries whose `brand` field matches this brand's dataBrandNames
// — i.e. the confirmed, verified drummer mapping for this brand. Never
// hand-authored; always derived from data/pedals.js.
export function getPedalsForBrand(brand) {
  if (!brand || !brand.dataBrandNames || brand.dataBrandNames.length === 0) return [];
  return PEDALS.filter((pedal) => pedal.brand && brand.dataBrandNames.includes(pedal.brand));
}

export function generateBrandCanonicalUrl(slug) {
  return `${BASE_URL}${BRANDS_BASE_PATH}/${slug}`;
}

export function generateBrandTitle(brand) {
  return `${brand.name} Pedals: Metal-Relevant Models & Which Drummers Use Them | MetalForge`;
}

export function generateBrandDescription(brand, pedals) {
  if (pedals.length > 0) {
    const count = pedals.length;
    return `${brand.name} bass drum pedals — positioning, metal-relevant models, and the ${count} metal drummer${count === 1 ? '' : 's'} in our database confirmed to play them.`;
  }
  return `${brand.name} bass drum pedals — company background, positioning, and notable metal-relevant models.`;
}

// ItemList (confirmed drummers) + BreadcrumbList JSON-LD for a single brand
// page. Returns a plain array safe to JSON.stringify.
export function generateBrandSchema(brand, pedals) {
  if (!brand) return null;
  const canonicalUrl = generateBrandCanonicalUrl(brand.slug);

  const schemas = [];

  if (pedals.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: `${brand.name} pedal setups played by metal drummers`,
      itemListElement: pedals.map((pedal, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'Product',
          name: `${brand.name} ${pedal.model || 'pedal'}`,
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
      { '@type': 'ListItem', position: 2, name: brand.name, item: canonicalUrl },
    ],
  });

  return schemas;
}

export default {
  PEDAL_BRANDS,
  BRANDS_BASE_PATH,
  getBrand,
  isValidBrandSlug,
  getBrandForPedal,
  getPedalsForBrand,
  generateBrandCanonicalUrl,
  generateBrandTitle,
  generateBrandDescription,
  generateBrandSchema,
};
