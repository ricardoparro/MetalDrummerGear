// Best Bass Drum Pedals for Metal — Issue #4433 (split 2/3 of #4394)
// Buying-guide content for /pedals/best-for-metal. High commercial-intent
// page: double-bass focus, then a drive-type recommendation matrix by
// playing style. pedals.js has no price field, so this guide makes no price
// claims (#10824) — every recommendation card is CTA-ready and falls back
// to a link to the drummer's pedal setup page until affiliate links exist.
//
// Style/drive-type/example rows are grounded in data/pedals.js (PEDALS,
// #4391) — never hardcoded speculation — so the guide can't drift out of
// sync with the verified drummer->pedal mapping. Same "cite source, don't
// guess" discipline as data/pedalReferencePages.js (phase 2).

const BASE_URL = 'https://metalforge.io';

export const BEST_FOR_METAL_PAGE = {
  slug: 'best-for-metal',
  title: 'Best Bass Drum Pedals for Metal: Drive Type & Budget Guide | MetalForge',
  description:
    'Chain vs direct drive, matched to your playing style — plus the verified double bass pedals legendary metal drummers actually play.',
  keywords: 'best bass drum pedal for metal, best double bass pedal, direct drive vs chain pedal for metal, metal drummer pedal recommendations',
  h1: 'Best Bass Drum Pedals for Metal',
  intro:
    'There is no single "correct" metal pedal — playing style pushes toward different answers. But the verified roster shows a clear pattern: how fast and sustained your footwork needs to be decides the drive type worth paying for. This guide covers double bass as the metal default, then matches drive type to playing style, all anchored to the confirmed pedals below.',
  doubleBassDefault: {
    heading: 'Double bass is the default — but not universal',
    body:
      'Of the 55 verified pedal records in our database, 47 are double-pedal setups (a second, slave-driven beater on the same head), 5 are confirmed single pedals, and 3 have an unconfirmed configuration. See the /pedals/single-vs-double guide for the full mechanism and when a single pedal still makes sense — Nicko McBrain\'s "Single Bass Drum Pedal" (Iron Maiden\'s galloping traditional heavy metal) is the clearest example on the roster of a top metal drummer who never needed a second beater.',
  },
  matchingDriveToStyle: {
    heading: 'Matching drive type to playing style',
    body:
      'See the /pedals/drive-types guide for the full chain-vs-belt-vs-direct-drive breakdown. Chain drive covers 22 of the 55 verified roster pedals — it\'s the metal default, with a small amount of natural give most drummers find comfortable at any tempo. Direct drive covers 12 of the 55, concentrated among drummers who chase sustained, extreme-speed footwork; belt drive doesn\'t appear in any confirmed roster driveType, staying a niche option relative to the other two. The remaining 20 records name a specific pedal but don\'t confirm a drive type in the source material — those are left unspecified rather than guessed.',
  },
  matrix: [
    {
      style: 'Doom / traditional heavy metal',
      driveType: 'Chain drive or single pedal',
      budgetTier: 'Entry',
      example: 'Nicko McBrain (Iron Maiden) — single bass drum pedal',
    },
    {
      style: 'Groove metal / thrash / classic double bass',
      driveType: 'Chain drive, double pedal',
      budgetTier: 'Mid',
      example: 'Lars Ulrich (Metallica) — Tama Iron Cobra 900 Power Glide, chain drive',
    },
    {
      style: 'Progressive / technical / djent',
      driveType: 'Chain drive, longboard',
      budgetTier: 'Upper-mid',
      example: 'Tomas Haake (Meshuggah) — Tama Speed Cobra, chain drive',
    },
    {
      style: 'Extreme, blast-beat-driven metal (black, death, brutal tech-death)',
      driveType: 'Direct drive',
      budgetTier: 'Pro / flagship',
      example: 'Hellhammer (Mayhem) — Axis double pedal, direct drive',
    },
  ],
  budgetTiers: [
    {
      heading: 'Entry',
      body:
        'A chain-drive single or double pedal at this tier covers doom, traditional heavy metal, and most groove metal without needing direct drive\'s zero-slack response. Chain drive\'s slight natural flex is a genuine feature at moderate tempos, not just a budget compromise.',
    },
    {
      heading: 'Mid / gigging',
      body:
        'This is where most of the verified roster\'s double pedals actually sit: chain-drive workhorses like the Tama Iron Cobra and DW 9000 Series, plus longboard chain-drive models like the Tama Speed Cobra for drummers who want more footboard length for complex, odd-grouping footwork.',
    },
    {
      heading: 'Pro / flagship',
      body:
        'Direct-drive pedals — Axis (the direct-drive specialist brand, no chain or belt at all), Pearl\'s Demon Drive and Demon XR, and boutique CNC-machined pedals like the Trick Pro1-V — remove all slack between footboard and beater for the fastest, most consistent response. This tier is concentrated among drummers chasing sustained, extreme-speed blast beats rather than a general upgrade every metal drummer needs.',
    },
  ],
  faq: [
    {
      question: 'What is the best bass drum pedal for metal?',
      answer:
        'There is no single best pedal — it depends on playing style and budget. Chain drive (Tama Iron Cobra, DW 9000) covers most metal styles at an accessible price; direct drive (Axis, Pearl Demon Drive) is worth the extra cost mainly for drummers chasing sustained, extreme-speed blast beats. See the matrix above for the drive type and budget tier that fits your style.',
    },
    {
      question: 'Do I need direct drive for metal, or is chain drive enough?',
      answer:
        'Chain drive is enough for the large majority of metal styles — it covers 22 of the 55 verified roster pedals, including thrash, groove, and progressive metal drummers. Direct drive (12 of 55) is concentrated among drummers specifically chasing sustained, extreme-speed footwork, like Hellhammer\'s blast-beat-driven black metal. See the /pedals/drive-types guide for the full comparison.',
    },
    {
      question: 'How much should I budget for a metal double bass pedal?',
      answer:
        'It depends on drive type: chain-drive pedals like the Tama Iron Cobra and DW 9000 Series cover most gigging metal drummers\' needs, while direct-drive flagships like the Axis and Pearl Demon Drive sit at the top end for drummers chasing sustained, extreme-speed footwork. Check current pricing at your preferred retailer — we don\'t track pricing data.',
    },
    {
      question: 'Do I need a double bass pedal for metal?',
      answer:
        'For most metal styles, yes — 47 of the 55 verified roster pedals are double-pedal setups. Doom, traditional heavy metal, and some groove metal are the main exceptions; Nicko McBrain\'s single pedal setup with Iron Maiden is a confirmed example. See the /pedals/single-vs-double guide for the full breakdown.',
    },
  ],
  sources: [
    { label: 'Sweetwater InSync — Kick Pedal Drive Types Explained', url: 'https://www.sweetwater.com/insync/kick-pedal-drive-types-explained/' },
    { label: 'Sound Pure — Bass Drum Pedal Drive Types', url: 'https://www.soundpure.com/a/expert-advice/drums/bass-drum-pedal-drive-types/' },
  ],
};

export function generateBestForMetalCanonicalUrl() {
  return `${BASE_URL}/pedals/best-for-metal`;
}

export function generateBestForMetalFaqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: BEST_FOR_METAL_PAGE.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

export function generateBestForMetalArticleSchema() {
  const url = generateBestForMetalCanonicalUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: BEST_FOR_METAL_PAGE.h1,
    description: BEST_FOR_METAL_PAGE.description,
    url,
    author: { '@type': 'Organization', name: 'MetalForge Editorial' },
    publisher: { '@type': 'Organization', name: 'MetalForge', url: BASE_URL },
  };
}

// ItemList of the verified drummer pedals, for rich-result eligibility.
// `pedals` is the live PEDALS array, passed in by the caller so this module
// never needs to import data/pedals.js directly (keeps the dependency
// direction the same as the rest of the /pedals data modules).
export function generateBestForMetalItemListSchema(pedals) {
  if (!pedals || pedals.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Verified bass drum pedals played by metal drummers',
    itemListElement: pedals.map((pedal, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Product',
        name: `${pedal.brand ? `${pedal.brand} ` : ''}${pedal.model || pedal.summary}`,
        ...(pedal.brand ? { brand: { '@type': 'Brand', name: pedal.brand } } : {}),
        category: 'Bass Drum Pedals',
        url: `${BASE_URL}/pedals/setups/${pedal.drummerSlug}`,
      },
    })),
  };
}

export function generateBestForMetalBreadcrumbSchema() {
  const url = generateBestForMetalCanonicalUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Pedals', item: `${BASE_URL}/pedals` },
      { '@type': 'ListItem', position: 2, name: 'Best for Metal', item: url },
    ],
  };
}

export default {
  BEST_FOR_METAL_PAGE,
  generateBestForMetalCanonicalUrl,
  generateBestForMetalFaqSchema,
  generateBestForMetalArticleSchema,
  generateBestForMetalItemListSchema,
  generateBestForMetalBreadcrumbSchema,
};
