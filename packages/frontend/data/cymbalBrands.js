// Cymbal Brand Pages data module — Issue #4307 (epic #4303 phase 4/4)
// Provides positioning + notable-line content for /cymbals/brands (hub) and
// /cymbals/brands/<brand> (per-brand detail).
//
// Confirmed-drummer links are computed live from data/cymbalSetups.js
// (CYMBAL_SETUPS) by matching each brand's `dataBrandNames` against each
// setup's `brands` array — never hardcoded here. That keeps the "no
// fabricated endorsements" rule mechanical: a brand page can only ever show a
// drummer that already has a verified entry in the cymbal setups data module.
//
// Positioning/line facts were cross-checked against the cited `source` URL
// (brand site, or an independent citation where the brand's own site has no
// stable per-line documentation page) before being written here — same "cite
// source, don't guess" discipline as data/cymbalReferencePages.js (phase 2).
//
// Only the four brands actually present in CYMBAL_SETUPS are covered here
// (Zildjian, Paiste, Sabian, Meinl). Istanbul Agop / Mehmet do not appear in
// any verified roster cymbal setup, so no page is added for them — adding one
// would have nothing roster-relevant to link to and risks reading as padding.

import { CYMBAL_SETUPS } from './cymbalSetups.js';

const BASE_URL = 'https://metalforge.io';
export const BRANDS_BASE_PATH = '/cymbals/brands';

export const CYMBAL_BRANDS = [
  {
    slug: 'zildjian',
    name: 'Zildjian',
    dataBrandNames: ['Zildjian'],
    founded: '1623, Constantinople; US operations since 1929, Norwell, Massachusetts',
    parent: 'The Avedis Zildjian Company also owns Vic Firth and Balter Mallets',
    positioning:
      "Zildjian is the oldest cymbal maker in the world and one of the oldest family-run businesses of any kind, with a proprietary cast-bronze alloy and manufacturing process it has never publicly disclosed. In metal specifically, its A Custom and K Custom lines are a default reference point — A Custom for a brighter, more cutting attack, K Custom for a darker, more complex one — with Z Custom sitting above both as the loudest, most aggressive option in the catalog.",
    notableLines: [
      { name: 'A Custom', description: 'A bright, cutting, mid-to-high-pitched line built for fast articulation and projection through a dense mix — one of the most common single series across the verified metal roster.' },
      { name: 'Z Custom', description: 'Zildjian\'s loudest, most powerful cast line, aimed at extreme-volume live and studio playing; frequently paired with A Custom for a darker, heavier china or ride.' },
      { name: 'K Custom (incl. K Custom Dark / Hybrid)', description: 'A darker, more complex-overtone alternative to A Custom, often chosen for crashes and rides where a drier, less cutting tone is wanted.' },
    ],
    source: { label: 'Zildjian — Frequently Asked Questions (company history & alloy)', url: 'https://zildjian.com/pages/frequently-asked-questions' },
  },
  {
    slug: 'paiste',
    name: 'Paiste',
    dataBrandNames: ['Paiste'],
    founded: '1901, St. Petersburg, Russia; relocated to Switzerland in the 1930s-40s (current HQ in Nottwil)',
    parent: 'Independent, family-owned (Paiste family)',
    positioning:
      'Paiste is a Swiss cymbal maker whose RUDE and 2002 series were built specifically for the volume and abuse of loud rock and metal playing, rather than adapted from a jazz or orchestral line. RUDE in particular is marketed around an intentionally raw, unlathed or partially-lathed finish that trades refinement for maximum cut and durability under hard, sustained hitting.',
    notableLines: [
      { name: 'RUDE', description: 'A raw-finish, extra-heavy series designed for explosive volume and durability — a long-running staple among thrash, death, and groove metal drummers on this roster.' },
      { name: '2002', description: 'Paiste\'s original high-volume rock/metal alloy line (predating RUDE), still widely used for crashes, rides, and chinas that need to cut through distortion.' },
      { name: 'Signature', description: 'A more refined, versatile professional line that still covers heavy, powerful options (e.g. Signature Heavy/Dry Heavy) used by some metal drummers who want more tonal range than RUDE/2002 offer.' },
    ],
    source: { label: 'Paiste — Company History', url: 'https://www.paiste.com/pages/history' },
  },
  {
    slug: 'sabian',
    name: 'Sabian',
    dataBrandNames: ['Sabian'],
    founded: '1981, Meductic, New Brunswick, Canada — founded by Robert Zildjian after the 1979 split of the Zildjian family cymbal business',
    parent: 'Independent, family-owned (Sabian/Zildjian family)',
    positioning:
      'Sabian was founded by Robert Zildjian after the Zildjian company split between his and his sister\'s branches of the family, and it has since built its own identity around two flagship metal-relevant lines: AAX for a bright, fast, cutting sound, and HHX for a darker, more complex, hand-hammered one. Both show up extensively across thrash, groove, and progressive metal setups on this roster.',
    notableLines: [
      { name: 'AAX', description: 'A bright, fast-responding, cast B20 line built for aggressive projection — one of the most common series across the verified metal roster, especially for crashes and hi-hats.' },
      { name: 'HHX', description: 'A hand-hammered, darker, more complex-overtone counterpart to AAX, often chosen for rides and crashes where more tonal depth is wanted at similar cutting power.' },
      { name: 'HH', description: 'Sabian\'s original hand-hammered line, predating HHX — still shows up on some verified setups, typically for rides.' },
    ],
    source: { label: 'Sabian — About Us / Company History', url: 'https://sabian.com/en/pages/about-us' },
  },
  {
    slug: 'meinl',
    name: 'Meinl',
    dataBrandNames: ['Meinl'],
    founded: '1951, Gutenstetten, Germany (Roland Meinl Musikinstrumente)',
    parent: 'Independent, family-owned (Meinl family); also owns the Meinl Stick & Brush drumstick sub-brand',
    positioning:
      "Meinl is a German percussion and cymbal maker whose Byzance series — hand-hammered in Turkey using traditional B20 bronze — is a favorite among progressive, technical, and modern extreme metal drummers for its complex, darker overtones. Its dedicated Mb20 heavy-metal line and the more budget-tier Classics Custom Dark series extend that darker-toned identity across different price points.",
    notableLines: [
      { name: 'Byzance (incl. Dark, Extra Dry, Traditional)', description: 'Hand-hammered B20 bronze, prized for complex, dark overtones — the most common Meinl series across the verified metal roster, especially for progressive and technical metal setups.' },
      { name: 'Mb20', description: 'A line built specifically for heavy, high-volume metal playing, sitting alongside Byzance in some verified setups (e.g. paired hi-hats/crashes from one line with a ride from the other).' },
      { name: 'Classics Custom Dark', description: 'A more affordable dark-toned line extending the Byzance-style tonal identity to a lower price point — not yet present in a verified roster setup, but a common recommendation for metal drummers on a budget.' },
    ],
    source: { label: 'Meinl Cymbals — Wiki (company background & Byzance manufacturing)', url: 'https://meinlcymbals.com/en/Wiki' },
  },
];

export function getBrand(slug) {
  if (!slug) return null;
  return CYMBAL_BRANDS.find((b) => b.slug === slug.toLowerCase()) || null;
}

export function isValidBrandSlug(slug) {
  return !!getBrand(slug);
}

// Finds the brand-page entry for a CYMBAL_SETUPS record whose `brands` array
// includes this brand's data name — used by the drummer-page cymbals block to
// link a drummer to the matching /cymbals/brands/<brand> page.
export function getBrandForCymbalSetup(setup) {
  if (!setup || !setup.brands || setup.brands.length === 0) return null;
  return CYMBAL_BRANDS.find((b) => b.dataBrandNames.some((name) => setup.brands.includes(name))) || null;
}

// All CYMBAL_SETUPS entries whose `brands` array includes this brand's
// dataBrandNames — i.e. the confirmed, verified drummer mapping for this
// brand. Never hand-authored; always derived from data/cymbalSetups.js.
export function getConfirmedSetupsForBrand(brand) {
  if (!brand || !brand.dataBrandNames || brand.dataBrandNames.length === 0) return [];
  return CYMBAL_SETUPS.filter((setup) => setup.brands.some((b) => brand.dataBrandNames.includes(b)));
}

export function generateBrandCanonicalUrl(slug) {
  return `${BASE_URL}${BRANDS_BASE_PATH}/${slug}`;
}

export function generateBrandsHubCanonicalUrl() {
  return `${BASE_URL}${BRANDS_BASE_PATH}`;
}

export function generateBrandTitle(brand) {
  return `${brand.name} Cymbals: Metal-Relevant Series & Which Drummers Use Them | MetalForge`;
}

export function generateBrandDescription(brand, confirmedSetups) {
  if (confirmedSetups.length > 0) {
    const count = confirmedSetups.length;
    return `${brand.name} cymbals — positioning, metal-relevant series, and the ${count} metal drummer${count === 1 ? '' : 's'} in our database confirmed to play them.`;
  }
  return `${brand.name} cymbals — company background, positioning, and notable metal-relevant series.`;
}

// ItemList (confirmed drummers) + BreadcrumbList JSON-LD for a single brand
// page. Returns a plain array safe to JSON.stringify.
export function generateBrandSchema(brand, confirmedSetups) {
  if (!brand) return null;
  const canonicalUrl = generateBrandCanonicalUrl(brand.slug);

  const schemas = [];

  if (confirmedSetups.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: `${brand.name} cymbal setups played by metal drummers`,
      itemListElement: confirmedSetups.map((setup, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'Product',
          name: `${brand.name} cymbal setup`,
          brand: { '@type': 'Brand', name: brand.name },
          category: 'Cymbals',
          url: `${BASE_URL}/cymbals/setups/${setup.drummerSlug}`,
        },
      })),
    });
  }

  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Cymbals', item: `${BASE_URL}/cymbals` },
      { '@type': 'ListItem', position: 2, name: 'Brands', item: `${BASE_URL}${BRANDS_BASE_PATH}` },
      { '@type': 'ListItem', position: 3, name: brand.name, item: canonicalUrl },
    ],
  });

  return schemas;
}

// ItemList + BreadcrumbList JSON-LD for the /cymbals/brands hub.
export function generateBrandsHubSchema() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Cymbal brands',
      itemListElement: CYMBAL_BRANDS.map((brand, i) => ({
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
        { '@type': 'ListItem', position: 1, name: 'Cymbals', item: `${BASE_URL}/cymbals` },
        { '@type': 'ListItem', position: 2, name: 'Brands', item: `${BASE_URL}${BRANDS_BASE_PATH}` },
      ],
    },
  ];
}

export default {
  CYMBAL_BRANDS,
  BRANDS_BASE_PATH,
  getBrand,
  isValidBrandSlug,
  getBrandForCymbalSetup,
  getConfirmedSetupsForBrand,
  generateBrandCanonicalUrl,
  generateBrandsHubCanonicalUrl,
  generateBrandTitle,
  generateBrandDescription,
  generateBrandSchema,
  generateBrandsHubSchema,
};
