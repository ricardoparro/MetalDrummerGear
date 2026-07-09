// Drumstick Brand Pages data module — Issue #4139 (epic #4135 phase 4/4)
// Provides positioning + notable-line content for /drumsticks/brands (hub) and
// /drumsticks/brands/<brand> (per-brand detail).
//
// Confirmed-drummer links are computed live from data/drumsticks.js (DRUMSTICKS)
// by matching each brand's `dataBrandNames` against each stick's `brand` field —
// never hardcoded here. That keeps the "no fabricated endorsements" rule
// mechanical: a brand page can only ever show a drummer that already has a
// verified entry in the drumsticks data module. Several of these brands (Vater,
// Zildjian, Los Cabos, Regal Tip, Meinl, Wincent) currently have no confirmed
// drummer mapping — their pages stay substantive on positioning + notable-line
// content alone rather than naming an unverified endorsement.
//
// Positioning/line facts were cross-checked against the cited `source` URL
// (brand site, or an independent citation where the brand's own site is a
// JS-rendered storefront with no stable per-line documentation page) before
// being written here — same "cite source, don't guess" discipline as
// data/drumstickReferencePages.js (phase 2).

import { DRUMSTICKS } from './drumsticks.js';

const BASE_URL = 'https://metalforge.io';
export const BRANDS_BASE_PATH = '/drumsticks/brands';

export const DRUMSTICK_BRANDS = [
  {
    slug: 'vic-firth',
    name: 'Vic Firth',
    dataBrandNames: ['Vic Firth'],
    founded: '1963, Massachusetts, USA',
    parent: "Part of the Avedis Zildjian Company's family of brands (merged December 2010)",
    positioning:
      "Vic Firth is generally regarded as the industry's most prestigious stick and mallet maker, with a catalog spanning orchestral, marching, and drum-set playing. Its American Classic line functions as the de facto reference point that other brands' number-and-letter sizing gets compared against — it's the line the /drumsticks/sizes spec table on this site is anchored to.",
    notableLines: [
      { name: 'American Classic® Metal', description: 'A long, thick American Classic variant built for extra reach and power on hard-hitting parts.' },
      { name: 'American Classic® Extreme (X5A / X5B)', description: 'Stretched-length versions of the 5A/5B for drummers who want more leverage without moving up a full weight class.' },
    ],
    source: { label: 'Vic Firth — American Classic Metal', url: 'https://vicfirth.com/products/american-classicr-metal' },
  },
  {
    slug: 'vater',
    name: 'Vater Percussion',
    dataBrandNames: [],
    founded: '1990 (roots to a 1956 family drumstick shop), Holbrook, Massachusetts, USA',
    parent: 'Independent, family-owned — not part of a larger drum/cymbal conglomerate',
    positioning:
      "Vater positions itself as a premium, 100%-USA-manufactured alternative to the larger stick makers, built on straightness and batch-to-batch consistency. That consistency pitch — every pair playing identically — is part of why it has a following among hard-hitting rock and metal drummers who don't want their feel changing from pack to pack.",
    notableLines: [
      { name: 'Power series', description: "Extra-thick, extra-durable models aimed at hard-hitting players — check vater.com for the current lineup, since exact model names and specs change over time." },
    ],
    source: { label: 'Vater Percussion — company background (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Vater_Percussion' },
  },
  {
    slug: 'pro-mark',
    name: 'Pro-Mark',
    dataBrandNames: ['ProMark'],
    founded: '1957, Houston, Texas, USA',
    parent: "Owned by D'Addario since 2011",
    positioning:
      "Pro-Mark was the first stick maker to bring Japanese Shira Kashi white oak to the US market, and its catalog remains one of the largest in the industry. Since the 2011 D'Addario acquisition it has kept a broad artist roster across rock and metal alongside jazz and marching, distributed through D'Addario's retail network.",
    notableLines: [
      { name: 'Model 2B', description: "Described on Pro-Mark's own site as \"extra-heavy weight and extra-wide diameter... ideal for the hardest of hitters.\"" },
    ],
    source: { label: "D'Addario / Pro-Mark — Find Your Drumstick", url: 'https://www.daddario.com/pages/promark-find-your-drumstick' },
  },
  {
    slug: 'ahead',
    name: 'Ahead',
    dataBrandNames: ['Ahead'],
    founded: '1992, founded by Rick Grossman',
    parent: 'Distributed by Big Bang Distribution (USA); independent brand',
    positioning:
      "Ahead pioneered aluminum-core drumsticks with a replaceable outer sleeve — when the sleeve wears out you replace the sleeve, not the whole stick, and the aluminum core essentially can't break the way wood can. That durability pitch (the brand markets a multiple-times-longer lifespan than wood) is why it has a strong following among touring hard-rock and metal drummers who go through sticks fast.",
    notableLines: [
      { name: 'Speed Metal (JJ1 / MT)', description: "Originally released as Joey Jordison's signature model; kept the same specs and renamed \"Speed Metal\" after his departure from the endorsement." },
    ],
    source: { label: 'Ahead Drumsticks — About', url: 'http://www.aheaddrumsticks.com/about.html' },
  },
  {
    slug: 'zildjian',
    name: 'Zildjian',
    dataBrandNames: [],
    founded: '1623, Constantinople; US operations since 1929, Norwell, Massachusetts',
    parent: 'The Avedis Zildjian Company also owns Vic Firth and Balter Mallets',
    positioning:
      "Zildjian is best known as a cymbal maker — one of the oldest family businesses in the world — but it has also sold its own drumstick line since 1989. The stick catalog sits alongside its cymbal business rather than as the brand's headline product, but it's a legitimate option from a company whose whole identity is built around how a stick meets a cymbal.",
    notableLines: [
      { name: 'Absolute Rock', description: 'A heavier-build stick with a dual butt-end design, marketed toward heavier-handed players.' },
      { name: 'DIP Series', description: 'Sticks with a tacky grip coating rather than a raw or lacquered finish, for control during sweaty, high-intensity sets.' },
    ],
    source: { label: 'Avedis Zildjian Company — history (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Avedis_Zildjian_Company' },
  },
  {
    slug: 'los-cabos',
    name: 'Los Cabos Drumsticks',
    dataBrandNames: [],
    founded: '2005, Fredericton (Hanwell), New Brunswick, Canada',
    parent: 'Independent, family-owned',
    positioning:
      "Los Cabos markets itself as Canada's leading drumstick brand, built around hand-inspected wood selection rather than a huge product catalog. It's a smaller operation than the majors, positioned on wood quality and consistency rather than novelty materials.",
    notableLines: [
      { name: 'Red Hickory', description: 'Made from denser heartwood; described on the official product page as "extra durable for heavy hitters... especially great for rock and metal artists."' },
    ],
    source: { label: 'Los Cabos Drumsticks — Red Hickory', url: 'https://loscabosdrumsticks.com/products/red-hickory/' },
  },
  {
    slug: 'regal-tip',
    name: 'Regal Tip',
    dataBrandNames: [],
    founded: '1958, Niagara Falls, New York, USA (Calato family)',
    parent: 'Still independently family-owned',
    positioning:
      "Regal Tip (made by Calato) is one of the oldest and largest US stick makers and is credited with inventing the nylon-tip drumstick. Its catalog spans wood and nylon sticks, mallets, and brushes, with a longer operating history than most of the brands on this page.",
    notableLines: [
      { name: 'X-Series — Rock-X', description: "A heavier X-Series model described by independent reviewers as \"ideal for heavy playing.\"" },
    ],
    source: { label: 'Regal Tip — company history (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Regal_Tip' },
  },
  {
    slug: 'meinl',
    name: 'Meinl Stick & Brush',
    dataBrandNames: [],
    founded: 'Parent company Roland Meinl Musikinstrumente founded 1951, Gutenstetten, Germany; Stick & Brush sub-brand launched 2018',
    parent: 'Part of the Meinl percussion/cymbal group',
    positioning:
      'Meinl Stick & Brush is the drumstick arm of the German Meinl percussion and cymbal group, built on American hickory and hard maple with German-manufactured quality control as its main pitch.',
    notableLines: [
      { name: 'Heavy series (SB108 / SB110)', description: 'A thicker-shouldered 5A/5B/2B line built for more power and energy transfer than the Standard series.' },
    ],
    source: { label: 'Meinl Stick & Brush — SB108 Heavy 5A', url: 'https://meinlstickandbrush.com/en/products/sb108-m5959.html' },
  },
  {
    slug: 'wincent',
    name: 'Wincent',
    dataBrandNames: [],
    founded: '1992, founded by Dan Nylén, Gränna, Sweden',
    parent: 'Independent Swedish company',
    positioning:
      "Wincent is a Swedish stick maker known for proprietary centerless-grinding manufacturing and weight-matching sticks within a few grams of each other — a precision-craftsmanship pitch rather than a mass-market one.",
    notableLines: [
      { name: 'Rock/Metal series (incl. the METAL model)', description: 'A dedicated heavier line built for high-power playing, positioned by the brand as its longest-reach, hardest-hitting option, alongside a companion ROCK model.' },
    ],
    source: { label: 'Wincent — Rock/Metal Series', url: 'https://www.wincentdrumsticks.com/drumsticks/rock-metal-series/' },
  },
  {
    slug: 'tama',
    name: 'Tama',
    dataBrandNames: ['Tama'],
    founded: 'Parent company Hoshino Gakki founded 1908, Japan; TAMA brand name since 1974',
    parent: 'Hoshino Gakki',
    positioning:
      "Tama is best known as a drum kit and hardware maker whose gear was shaped by demand from hard-hitting rock and metal drummers wanting heavier-duty stands and pedals. It also sells its own drumstick lineup — separate from that kit business — spanning general-purpose wood sticks and a small roster of artist signature models.",
    notableLines: [
      { name: 'Signature series', description: "Tama's own artist-signature stick line, which is where Mario Duplantier's HMD model sits — a standalone signature rather than part of a broader \"heavy\" product line." },
    ],
    source: { label: 'Tama — Drumsticks', url: 'https://www.tama.com/usa/products/sticks/' },
  },
];

export function getBrand(slug) {
  if (!slug) return null;
  return DRUMSTICK_BRANDS.find((b) => b.slug === slug.toLowerCase()) || null;
}

// Finds the brand-page entry for a DRUMSTICKS record by its `brand` field
// (e.g. 'ProMark' -> the 'pro-mark' brand page) — a straight toSlug() of the
// data brand name won't always match the page slug, so this is the
// authoritative lookup for "which brand page does this stick belong to".
export function getBrandForStick(stick) {
  if (!stick || !stick.brand) return null;
  return DRUMSTICK_BRANDS.find((b) => b.dataBrandNames.includes(stick.brand)) || null;
}

export function isValidBrandSlug(slug) {
  return !!getBrand(slug);
}

// All DRUMSTICKS entries whose `brand` field matches this brand's
// dataBrandNames — i.e. the confirmed, verified drummer mapping for this
// brand. Never hand-authored; always derived from data/drumsticks.js.
export function getConfirmedSticksForBrand(brand) {
  if (!brand || !brand.dataBrandNames || brand.dataBrandNames.length === 0) return [];
  return DRUMSTICKS.filter((stick) => brand.dataBrandNames.includes(stick.brand));
}

export function generateBrandCanonicalUrl(slug) {
  return `${BASE_URL}${BRANDS_BASE_PATH}/${slug}`;
}

export function generateBrandsHubCanonicalUrl() {
  return `${BASE_URL}${BRANDS_BASE_PATH}`;
}

export function generateBrandTitle(brand) {
  return `${brand.name} Drumsticks: Lines, Positioning & Which Drummers Use Them | MetalForge`;
}

export function generateBrandDescription(brand, confirmedSticks) {
  if (confirmedSticks.length > 0) {
    const count = confirmedSticks.length;
    return `${brand.name} drumsticks — positioning, notable lines, and the ${count} metal drummer${count === 1 ? '' : 's'} in our database confirmed to play them.`;
  }
  return `${brand.name} drumsticks — company background, positioning, and notable product lines for metal drummers.`;
}

// CollectionPage/ItemList (confirmed sticks) + BreadcrumbList JSON-LD for a
// single brand page. Returns a plain array safe to JSON.stringify.
export function generateBrandSchema(brand, confirmedSticks) {
  if (!brand) return null;
  const canonicalUrl = generateBrandCanonicalUrl(brand.slug);

  const schemas = [];

  if (confirmedSticks.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: `${brand.name} signature drumsticks played by metal drummers`,
      itemListElement: confirmedSticks.map((stick, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'Product',
          name: `${stick.brand} ${stick.model}`,
          brand: { '@type': 'Brand', name: stick.brand },
          category: 'Drumsticks',
          material: stick.material,
          url: `${BASE_URL}/drumsticks/signature/${stick.drummerSlug}`,
        },
      })),
    });
  }

  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Drumsticks', item: `${BASE_URL}/drumsticks` },
      { '@type': 'ListItem', position: 2, name: 'Brands', item: `${BASE_URL}${BRANDS_BASE_PATH}` },
      { '@type': 'ListItem', position: 3, name: brand.name, item: canonicalUrl },
    ],
  });

  return schemas;
}

// ItemList + BreadcrumbList JSON-LD for the /drumsticks/brands hub.
export function generateBrandsHubSchema() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Drumstick brands',
      itemListElement: DRUMSTICK_BRANDS.map((brand, i) => ({
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
        { '@type': 'ListItem', position: 1, name: 'Drumsticks', item: `${BASE_URL}/drumsticks` },
        { '@type': 'ListItem', position: 2, name: 'Brands', item: `${BASE_URL}${BRANDS_BASE_PATH}` },
      ],
    },
  ];
}

export default {
  DRUMSTICK_BRANDS,
  BRANDS_BASE_PATH,
  getBrand,
  isValidBrandSlug,
  getConfirmedSticksForBrand,
  generateBrandCanonicalUrl,
  generateBrandsHubCanonicalUrl,
  generateBrandTitle,
  generateBrandDescription,
  generateBrandSchema,
  generateBrandsHubSchema,
};
