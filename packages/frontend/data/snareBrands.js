// Snare Brand Pages data module — Issue #4483 (brings /snares to parity with
// the drumsticks/cymbals/pedals /brands surfaces). Brand list is the six
// brands referenced in the "Common metal snare brands" section of
// data/snareReferencePages.js (PILLAR_PAGE.brands): Tama, Pearl, Ludwig,
// Sonor, Mapex, DW — same shape as data/pedalBrands.js.
//
// Confirmed-drummer links are computed live from data/snares.js (SNARES) by
// matching each brand's `dataBrandNames` against each snare record's `brand`
// field — never hardcoded here, matching the "no fabricated endorsements"
// discipline in pedalBrands.js/cymbalBrands.js. A brand page can only ever
// show a drummer that already has a verified snare record in data/snares.js.
//
// Founding/parent facts for Tama, Pearl, DW, Sonor, Mapex, and Ludwig were
// already verified in data/pedalBrands.js (itself sourced from data/brands.js,
// #656 and #4389) and are reused verbatim here — same companies, same facts.
// Notable-line facts are drawn from the actual model names appearing in
// data/snares.js (SNARES) plus the brand notes already in
// data/snareReferencePages.js (PILLAR_PAGE.brands) — no new unverified facts
// are introduced.

import { SNARES } from './snares.js';

const BASE_URL = 'https://metalforge.io';
export const BRANDS_BASE_PATH = '/snares/brands';

export const SNARE_BRANDS = [
  {
    slug: 'tama',
    name: 'Tama',
    dataBrandNames: ['Tama'],
    founded: '1974, Nagoya, Japan (Hoshino Gakki)',
    parent: 'Hoshino Gakki also owns the Ibanez guitar brand',
    positioning:
      "Tama is the single most common snare brand across the verified metal roster, anchored by the modular S.L.P. (Sound Lab Project) series — which spans brass, steel, and maple shells and is by far the most common single line on this roster — alongside the Starclassic maple/bubinga shells and Lars Ulrich's own LU1465 signature model.",
    notableLines: [
      { name: 'S.L.P. (Sound Lab Project)', description: 'A modular series spanning G-Maple, Brass, Big Black Steel, and Black Brass shells — the most common single snare line across the verified metal roster, used by drummers from Dave Lombardo to Dirk Verbeuren.' },
      { name: 'Starclassic', description: 'Tama\'s core maple/bubinga shell line, used on the roster by Richard Christy (maple) and Adrian Erlandsson (Bubinga).' },
      { name: 'LU1465 Lars Ulrich Signature', description: "Metallica drummer Lars Ulrich's signature 14x6.5\" snare model." },
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
      "Pearl's snare lineup splits into two verified-roster standards — the brass/steel Reference series for maximum cut, and the maple Masters series for a warmer tone — alongside multiple artist-signature models, including Joey Jordison's 13x6.5\" and George Kollias's 14x6.5\" snares.",
    notableLines: [
      { name: 'Reference', description: 'Brass and steel shells built for maximum cut and volume — the most common single Pearl series on the verified metal roster, from Gene Hoglan to Mike Mangini.' },
      { name: 'Masters', description: 'Pearl\'s maple shell line, chosen for a warmer tone by drummers including Flo Mounier, Jaska Raatikainen, and Paul Bostaph (Masters Steel).' },
      { name: 'Artist-signature models', description: 'Purpose-built signature snares for roster drummers, including Joey Jordison (13x6.5"), George Kollias, and Daniel Erlandsson.' },
    ],
    source: { label: 'Pearl Drums — Wikipedia (company history)', url: 'https://en.wikipedia.org/wiki/Pearl_Drums' },
  },
  {
    slug: 'ludwig',
    name: 'Ludwig',
    dataBrandNames: ['Ludwig'],
    founded: '1909, Chicago, Illinois, USA',
    parent: 'Conn-Selmer',
    positioning:
      "Ludwig is the oldest American drum company, and its snare identity on the verified metal roster rests on two of the most recorded shells in drumming history: the brass Black Beauty (Art Cruz) and the aluminium/steel Supraphonic (Bill Ward).",
    notableLines: [
      { name: 'Black Beauty', description: 'A brass-shell snare prized for a crisp yet warm tone — the verified-roster model played by Art Cruz (Lamb of God).' },
      { name: 'Supraphonic', description: 'An aluminium-shell snare (LM402) built for a bright, articulate tone — the verified-roster model played by Bill Ward (Black Sabbath).' },
    ],
    source: { label: 'Ludwig Drums — About', url: 'https://www.ludwig-drums.com/en-us/ludwig/about' },
  },
  {
    slug: 'sonor',
    name: 'Sonor',
    dataBrandNames: ['Sonor'],
    founded: '1875, Weissenfels an der Saale, Germany',
    parent: 'Independent; headquartered in Bad Berleburg, Germany',
    positioning:
      "Sonor is one of the oldest percussion manufacturers in the world, and on the verified metal roster its customizable maple SQ2 series is the most common single Sonor snare, used alongside artist-signature models built for Tomas Haake, Nicko McBrain, and Gavin Harrison.",
    notableLines: [
      { name: 'SQ2', description: 'A fully customizable maple shell series — the most common single Sonor snare on the verified roster, used by Hellhammer, Frost (Satyricon), and Martin Axenrot.' },
      { name: 'Artist-signature models', description: 'Purpose-built signature snares for roster drummers, including Tomas Haake (Meshuggah), Nicko McBrain (Iron Maiden), and Gavin Harrison.' },
    ],
    source: { label: 'Sonor — Wikipedia (company history)', url: 'https://en.wikipedia.org/wiki/Sonor' },
  },
  {
    slug: 'mapex',
    name: 'Mapex',
    dataBrandNames: ['Mapex'],
    founded: '1989, Taiwan',
    parent: 'KHS Musical Instruments',
    positioning:
      "Mapex's snare presence on the verified metal roster covers both ends of its catalog: Chris Adler's walnut/maple signature model (Lamb of God) and the brass-shell Black Panther series played by Jason Bittner (Overkill, Shadows Fall).",
    notableLines: [
      { name: 'Chris Adler Signature', description: 'A walnut/maple hybrid-shell snare co-designed with Chris Adler (Lamb of God).' },
      { name: 'Black Panther', description: "Mapex's brass-shell metal snare line, verified on the roster through Jason Bittner (Overkill, Shadows Fall)." },
    ],
    source: { label: 'Mapex — History', url: 'https://www.mapexdrums.com/history' },
  },
  {
    slug: 'dw',
    name: 'DW',
    dataBrandNames: ['DW'],
    founded: '1972, Santa Monica, California, USA',
    parent: 'Drum Workshop, Inc.',
    positioning:
      "DW's verified-roster snares split across its two core lines: the steel-shell Performance series (Navene Koperweis) for cut, and the maple-shell Collector's Series (Hannes Grossmann) for tonal body.",
    notableLines: [
      { name: 'Performance Series', description: 'A steel-shell snare line built for cut and projection, verified on the roster through Navene Koperweis.' },
      { name: "Collector's Series", description: "DW's maple-shell premium line, verified on the roster through Hannes Grossmann." },
    ],
    source: { label: 'DW — The DW Story', url: 'https://dwdrums.com/the-dw-story/' },
  },
];

export function getBrand(slug) {
  if (!slug) return null;
  return SNARE_BRANDS.find((b) => b.slug === slug.toLowerCase()) || null;
}

export function isValidBrandSlug(slug) {
  return !!getBrand(slug);
}

// Finds the brand-page entry for a SNARES record whose `brand` field matches
// this brand's data name — used by the drummer-page snare block to link a
// drummer to the matching /snares/brands/<brand> page.
export function getBrandForSnare(snare) {
  if (!snare || !snare.brand) return null;
  return SNARE_BRANDS.find((b) => b.dataBrandNames.includes(snare.brand)) || null;
}

// All SNARES entries whose `brand` field matches this brand's dataBrandNames
// — i.e. the confirmed, verified drummer mapping for this brand. Never
// hand-authored; always derived from data/snares.js.
export function getSnaresForBrand(brand) {
  if (!brand || !brand.dataBrandNames || brand.dataBrandNames.length === 0) return [];
  return SNARES.filter((snare) => snare.brand && brand.dataBrandNames.includes(snare.brand));
}

export function generateBrandCanonicalUrl(slug) {
  return `${BASE_URL}${BRANDS_BASE_PATH}/${slug}`;
}

export function generateBrandsHubCanonicalUrl() {
  return `${BASE_URL}${BRANDS_BASE_PATH}`;
}

export function generateBrandTitle(brand) {
  return `${brand.name} Snares: Metal-Relevant Models & Which Drummers Use Them | MetalForge`;
}

export function generateBrandDescription(brand, snares) {
  if (snares.length > 0) {
    const count = snares.length;
    return `${brand.name} snare drums — positioning, metal-relevant models, and the ${count} metal drummer${count === 1 ? '' : 's'} in our database confirmed to play them.`;
  }
  return `${brand.name} snare drums — company background, positioning, and notable metal-relevant models.`;
}

// ItemList (confirmed drummers) + BreadcrumbList JSON-LD for a single brand
// page. Returns a plain array safe to JSON.stringify.
export function generateBrandSchema(brand, snares) {
  if (!brand) return null;
  const canonicalUrl = generateBrandCanonicalUrl(brand.slug);

  const schemas = [];

  if (snares.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: `${brand.name} snare setups played by metal drummers`,
      itemListElement: snares.map((snare, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'Product',
          name: `${brand.name} ${snare.model || 'snare'}`,
          brand: { '@type': 'Brand', name: brand.name },
          category: 'Snare Drums',
          url: `${BASE_URL}/drummer/${snare.drummerSlug}`,
        },
      })),
    });
  }

  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Snares', item: `${BASE_URL}/snares` },
      { '@type': 'ListItem', position: 2, name: 'Brands', item: `${BASE_URL}${BRANDS_BASE_PATH}` },
      { '@type': 'ListItem', position: 3, name: brand.name, item: canonicalUrl },
    ],
  });

  return schemas;
}

// ItemList + BreadcrumbList JSON-LD for the /snares/brands hub.
export function generateBrandsHubSchema() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Snare brands',
      itemListElement: SNARE_BRANDS.map((brand, i) => ({
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
        { '@type': 'ListItem', position: 1, name: 'Snares', item: `${BASE_URL}/snares` },
        { '@type': 'ListItem', position: 2, name: 'Brands', item: `${BASE_URL}${BRANDS_BASE_PATH}` },
      ],
    },
  ];
}

export default {
  SNARE_BRANDS,
  BRANDS_BASE_PATH,
  getBrand,
  isValidBrandSlug,
  getBrandForSnare,
  getSnaresForBrand,
  generateBrandCanonicalUrl,
  generateBrandsHubCanonicalUrl,
  generateBrandTitle,
  generateBrandDescription,
  generateBrandSchema,
  generateBrandsHubSchema,
};
