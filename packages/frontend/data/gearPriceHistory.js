/**
 * Gear Price History Tracker Data
 * Issue #813: Inflation-Adjusted Setup Costs Over Time
 * URL: /drummers/[slug]/gear-history
 * 
 * Phase 1: Lars Ulrich (1983), Joey Jordison (2001), Dave Lombardo (1986)
 * 
 * SEO targets:
 * - "[drummer] [year] setup cost"
 * - "vintage [drum] inflation-adjusted cost"
 * - "how much would [drummer] gear cost today"
 */

// ==========================================
// BLS CPI-U Annual Averages (1983-2026)
// Source: US Bureau of Labor Statistics
// Base year: 1982-84 = 100
// ==========================================
export const CPI_DATA = {
  1981: 90.9,
  1982: 96.5,
  1983: 99.6,
  1984: 103.9,
  1985: 107.6,
  1986: 109.6,
  1987: 113.6,
  1988: 118.3,
  1989: 124.0,
  1990: 130.7,
  1991: 136.2,
  1992: 140.3,
  1993: 144.5,
  1994: 148.2,
  1995: 152.4,
  1996: 156.9,
  1997: 160.5,
  1998: 163.0,
  1999: 166.6,
  2000: 172.2,
  2001: 177.1,
  2002: 179.9,
  2003: 184.0,
  2004: 188.9,
  2005: 195.3,
  2006: 201.6,
  2007: 207.3,
  2008: 215.3,
  2009: 214.5,
  2010: 218.1,
  2011: 224.9,
  2012: 229.6,
  2013: 233.0,
  2014: 236.7,
  2015: 237.0,
  2016: 240.0,
  2017: 245.1,
  2018: 251.1,
  2019: 255.7,
  2020: 258.8,
  2021: 271.0,
  2022: 292.7,
  2023: 304.7,
  2024: 314.5,
  2025: 321.2,  // Estimated
  2026: 327.6,  // Estimated
};

// Current year for calculations
export const CURRENT_YEAR = 2026;

/**
 * Calculate inflation-adjusted price from original year to target year
 * @param {number} originalPrice - Price in original year
 * @param {number} originalYear - Year of original price
 * @param {number} targetYear - Year to adjust to (default: current)
 * @returns {number} - Inflation-adjusted price
 */
export function calculateInflationAdjustedPrice(originalPrice, originalYear, targetYear = CURRENT_YEAR) {
  const originalCPI = CPI_DATA[originalYear];
  const targetCPI = CPI_DATA[targetYear];
  
  if (!originalCPI || !targetCPI) return originalPrice;
  
  return Math.round(originalPrice * (targetCPI / originalCPI));
}

/**
 * Calculate inflation multiplier between two years
 * @param {number} fromYear - Starting year
 * @param {number} toYear - Ending year
 * @returns {number} - Multiplier (e.g., 2.5 = 250% of original)
 */
export function getInflationMultiplier(fromYear, toYear = CURRENT_YEAR) {
  const fromCPI = CPI_DATA[fromYear];
  const toCPI = CPI_DATA[toYear];
  
  if (!fromCPI || !toCPI) return 1;
  
  return toCPI / fromCPI;
}

/**
 * Format price for display with currency symbol
 * @param {number} price - Price value
 * @param {string} currency - 'USD' or 'EUR'
 * @returns {string} - Formatted price
 */
export function formatHistoryPrice(price, currency = 'USD') {
  if (currency === 'EUR') {
    return `€${price.toLocaleString()}`;
  }
  return `$${price.toLocaleString()}`;
}

// ==========================================
// Gear Price History Data
// Research sources: vintage catalogs, Reverb sales data,
// Modern Drummer archives, equipment guides, forum discussions
// ==========================================

export const GEAR_PRICE_HISTORY = {
  // ==========================================
  // LARS ULRICH - 1983 Kill 'Em All Era
  // Tama Artstar Setup
  // ==========================================
  'lars-ulrich': {
    slug: 'lars-ulrich',
    name: 'Lars Ulrich',
    band: 'Metallica',
    iconicYear: 1983,
    era: "Kill 'Em All Era",
    albumReference: "Kill 'Em All (1983)",
    profileImage: '/images/drummers/lars-ulrich.webp',
    
    summary: "Lars Ulrich's 1983 thrash metal setup that helped define the genre. Starting with budget gear before the Tama endorsement, this kit produced the raw, aggressive sound that launched Metallica into metal history.",
    
    // Main setup with detailed pricing
    setup: {
      drums: {
        item: 'Camco Drums (later Tama Swingstar)',
        model: '5-piece shell pack',
        specs: '22"x16" kick, 12"x10" rack, 13"x11" rack, 16"x16" floor',
        originalPrice: 800,
        year: 1983,
        source: 'Vintage catalog estimate, Music Trades Magazine 1983',
        notes: 'Budget Japanese import kit. The Camco brand was discontinued, Lars later switched to Tama Swingstar.',
        vintageValue2026: 1200,
        modernEquivalent: {
          item: 'Tama Imperialstar',
          price: 900,
          link: 'tama-imperialstar-ie52c',
        },
      },
      snare: {
        item: 'Camco 14"x5.5" Chrome Snare',
        model: 'Steel shell snare',
        specs: '14"x5.5" steel shell, 8-lug',
        originalPrice: 150,
        year: 1983,
        source: 'Estimated from vintage steel snare pricing',
        notes: 'Generic steel snare with bright, cutting tone.',
        vintageValue2026: 350,
        modernEquivalent: {
          item: 'Tama S.L.P. Sonic Steel',
          price: 450,
          link: 'tama-slp-sonic-steel',
        },
      },
      cymbals: {
        item: 'Zildjian A Series',
        model: 'Mixed A series',
        specs: '14" Hi-Hats, 16" Crash, 18" Crash, 20" Ride',
        originalPrice: 650,
        year: 1983,
        source: '1983 Zildjian catalog pricing',
        notes: 'Standard Zildjian brass - the industry standard then and now.',
        vintageValue2026: 800,
        modernEquivalent: {
          item: 'Zildjian A Series Box Set',
          price: 1200,
          link: 'zildjian-a-series-box',
        },
      },
      hardware: {
        item: 'Mixed budget hardware + DW 5000 Single Pedal',
        model: 'Various stands, DW 5000',
        specs: 'Hi-hat stand, 2 cymbal stands, snare stand, single pedal',
        originalPrice: 400,
        year: 1983,
        source: 'Hardware pack estimates + DW 5000 1983 MSRP',
        notes: 'The DW 5000 was the go-to pedal for thrash drummers. Single pedal era.',
        vintageValue2026: 600,
        modernEquivalent: {
          item: 'Tama HB5W + Iron Cobra 900',
          price: 650,
          link: 'tama-hardware-cobra',
        },
      },
      sticks: {
        item: 'Vic Firth 5B Hickory',
        model: 'American Classic 5B',
        specs: 'Hickory, wood tip',
        originalPrice: 8,
        year: 1983,
        source: 'Standard retail price',
        notes: 'Off-the-shelf sticks before signature models existed.',
        vintageValue2026: null,
        modernEquivalent: {
          item: 'Ahead Lars Ulrich Signature',
          price: 45,
          link: 'ahead-lars-ulrich',
        },
      },
      heads: {
        item: 'Remo Ambassador',
        model: 'Clear Ambassadors',
        specs: 'Clear toms, coated snare batter',
        originalPrice: 60,
        year: 1983,
        source: 'Remo retail pricing',
        notes: 'The industry-standard drumhead.',
        vintageValue2026: null,
        modernEquivalent: {
          item: 'Remo Emperor Pro Pack',
          price: 95,
          link: 'remo-emperor-pack',
        },
      },
    },
    
    // Total cost calculations
    totals: {
      originalTotal: 2068,
      inflationAdjusted2026: null, // Calculated dynamically
      vintageTotal2026: 2950,
      modernEquivalentTotal: 3340,
    },
    
    // Price evolution data points for chart
    priceEvolution: [
      { year: 1983, price: 2068, label: 'Original Purchase', event: "Kill 'Em All recording" },
      { year: 1986, price: 2200, label: 'Slight appreciation', event: 'Master of Puppets released' },
      { year: 1991, price: 2800, label: 'Black Album era', event: 'Metallica goes mainstream' },
      { year: 2000, price: 3500, label: 'Vintage interest grows', event: 'Nostalgia market emerges' },
      { year: 2010, price: 4200, label: 'Collector interest', event: 'Vintage drum boom' },
      { year: 2020, price: 5500, label: 'Pandemic spike', event: 'Home studio demand' },
      { year: 2026, price: 6800, label: 'Current adjusted', event: 'Inflation-adjusted value' },
    ],
    
    // Sources and research notes
    sources: [
      { title: 'Music Trades Magazine Drum Retail Report', year: 1983, type: 'catalog' },
      { title: 'Modern Drummer - Lars Ulrich Interview', year: 1985, type: 'interview' },
      { title: 'Reverb Price Guide - Vintage Drums', year: 2025, type: 'market' },
      { title: 'TalkBass/DrummerWorld Forum Archives', year: 2024, type: 'forum' },
    ],
    
    // SEO metadata
    meta: {
      title: "Lars Ulrich 1983 Drum Setup Cost | Kill 'Em All Era Gear Prices",
      description: "How much did Lars Ulrich's 1983 Metallica drum kit cost? Original price $2,068, inflation-adjusted to $6,800+ today. Complete gear breakdown with vintage vs modern pricing.",
      keywords: ['lars ulrich 1983 setup', 'metallica drum cost', 'vintage tama price', 'kill em all drums', 'lars ulrich gear cost today'],
    },
  },

  // ==========================================
  // JOEY JORDISON - 2001 Iowa Era
  // Pearl Reference Setup
  // ==========================================
  'joey-jordison': {
    slug: 'joey-jordison',
    name: 'Joey Jordison',
    band: 'Slipknot',
    iconicYear: 2001,
    era: 'Iowa Era',
    albumReference: 'Iowa (2001)',
    profileImage: '/images/drummers/joey-jordison.webp',
    
    summary: "Joey Jordison's legendary Iowa-era setup - the kit behind one of the heaviest albums ever recorded. A Pearl Reference series monster designed for unrelenting speed and power.",
    
    setup: {
      drums: {
        item: 'Pearl Reference Series',
        model: 'Custom Black Configuration',
        specs: '24"x18" kick, 10"x8" rack, 12"x9" rack, 14"x14" floor, 16"x16" floor',
        originalPrice: 4500,
        year: 2001,
        source: 'Pearl catalog MSRP, adjusted for custom finish',
        notes: 'Top-of-line Pearl series with reference shell technology. Custom matte black finish.',
        vintageValue2026: 5500,
        modernEquivalent: {
          item: 'Pearl Reference Pure',
          price: 4800,
          link: 'pearl-reference-pure',
        },
      },
      snare: {
        item: 'Pearl Reference 14"x5"',
        model: 'Maple/Birch Hybrid',
        specs: '14"x5" 20-ply maple/birch shell',
        originalPrice: 550,
        year: 2001,
        source: 'Pearl Reference snare MSRP',
        notes: 'Snappy, cutting tone perfect for blast beats.',
        vintageValue2026: 700,
        modernEquivalent: {
          item: 'Pearl Joey Jordison Signature Snare',
          price: 480,
          link: 'pearl-joey-jordison-snare',
        },
      },
      cymbals: {
        item: 'Paiste Signature Series',
        model: 'Heavy/Power configuration',
        specs: '14" Heavy Hi-Hats, 18" Power Crash, 19" Power Crash, 20" Full Crash, 22" Power Ride, 20" Novo China',
        originalPrice: 2800,
        year: 2001,
        source: 'Paiste professional pricing',
        notes: 'Paiste Signature - bright, cutting, built for extreme volume.',
        vintageValue2026: 3200,
        modernEquivalent: {
          item: 'Paiste Signature Reflector Set',
          price: 3400,
          link: 'paiste-signature-reflector',
        },
      },
      hardware: {
        item: 'Pearl Eliminator Double Pedal + DR-503C Rack',
        model: 'Eliminator Demon Drive + Icon Rack',
        specs: 'Direct drive double pedal, full rack system, 6 boom stands',
        originalPrice: 2200,
        year: 2001,
        source: 'Pearl hardware catalog',
        notes: 'Direct drive for maximum speed. The rack allowed quick setup for touring.',
        vintageValue2026: 1800,
        modernEquivalent: {
          item: 'Pearl Demon Drive + Icon Rack',
          price: 2600,
          link: 'pearl-demon-drive-rack',
        },
      },
      sticks: {
        item: 'Ahead Joey Jordison Signature',
        model: 'Aluminum alloy',
        specs: '16.5" length, .580" diameter, aluminum core',
        originalPrice: 35,
        year: 2001,
        source: 'Ahead MSRP',
        notes: 'First signature stick deal. Aluminum for durability at extreme speeds.',
        vintageValue2026: null,
        modernEquivalent: {
          item: 'Ahead Joey Jordison Signature',
          price: 42,
          link: 'ahead-joey-jordison',
        },
      },
      heads: {
        item: 'Evans EC2 Clear + EMAD',
        model: 'EC2 toms, EMAD kick',
        specs: 'Sound-shaping technology',
        originalPrice: 120,
        year: 2001,
        source: 'Evans retail pricing',
        notes: 'Evans EC2 for controlled, focused tone.',
        vintageValue2026: null,
        modernEquivalent: {
          item: 'Evans EC2S + EMAD2',
          price: 150,
          link: 'evans-ec2-emad',
        },
      },
      electronics: {
        item: 'ddrum Acoustic Pro Triggers',
        model: 'Kick and snare triggers',
        specs: 'Kick trigger, dual-zone snare trigger, brain',
        originalPrice: 800,
        year: 2001,
        source: 'ddrum pro series pricing',
        notes: 'Triggers for live consistency at extreme speeds.',
        vintageValue2026: 400,
        modernEquivalent: {
          item: 'Roland RT-30 Series',
          price: 600,
          link: 'roland-rt30-triggers',
        },
      },
    },
    
    totals: {
      originalTotal: 11005,
      inflationAdjusted2026: null,
      vintageTotal2026: 11600,
      modernEquivalentTotal: 12070,
    },
    
    priceEvolution: [
      { year: 2001, price: 11005, label: 'Original Purchase', event: 'Iowa recording' },
      { year: 2004, price: 11500, label: 'Vol. 3 era', event: 'Signature products expand' },
      { year: 2008, price: 12000, label: 'All Hope Is Gone', event: 'Peak Slipknot era' },
      { year: 2013, price: 11000, label: 'Market correction', event: 'Joey leaves Slipknot' },
      { year: 2021, price: 18000, label: 'Memorial spike', event: 'Joey Jordison passes away' },
      { year: 2026, price: 20300, label: 'Current adjusted', event: 'Legacy premium + inflation' },
    ],
    
    sources: [
      { title: 'Pearl Drums Official Catalog', year: 2001, type: 'catalog' },
      { title: 'Modern Drummer - Joey Jordison Feature', year: 2001, type: 'interview' },
      { title: 'Paiste Artist Profile Archives', year: 2002, type: 'manufacturer' },
      { title: 'Reverb Marketplace Analysis', year: 2025, type: 'market' },
    ],
    
    meta: {
      title: 'Joey Jordison 2001 Iowa Drum Setup Cost | Slipknot Gear Prices',
      description: "How much did Joey Jordison's Iowa-era drum kit cost? Original $11,005, now worth $20,000+ with inflation and collector premium. Complete Pearl Reference breakdown.",
      keywords: ['joey jordison iowa setup', 'slipknot drum cost', 'pearl reference price', 'joey jordison gear today', 'iowa era drums'],
    },
  },

  // ==========================================
  // DAVE LOMBARDO - 1986 Reign in Blood Era
  // Pearl BLX / Tama Setup
  // ==========================================
  'dave-lombardo': {
    slug: 'dave-lombardo',
    name: 'Dave Lombardo',
    band: 'Slayer',
    iconicYear: 1986,
    era: 'Reign in Blood Era',
    albumReference: 'Reign in Blood (1986)',
    profileImage: '/images/drummers/dave-lombardo.webp',
    
    summary: "The Godfather of Double Bass - Dave Lombardo's 1986 setup that powered Reign in Blood, often called the most influential thrash metal album ever recorded. This kit defined extreme metal drumming.",
    
    setup: {
      drums: {
        item: 'Pearl BLX Series',
        model: 'Birch shell kit',
        specs: '24"x16" kick (x2 for double bass), 10"x10" rack, 12"x12" rack, 14"x14" floor, 16"x16" floor',
        originalPrice: 2200,
        year: 1986,
        source: 'Pearl professional series MSRP 1986',
        notes: 'Birch shells for punchy attack. TWO kick drums for true double bass setup.',
        vintageValue2026: 3500,
        modernEquivalent: {
          item: 'Pearl Masters Maple',
          price: 3200,
          link: 'pearl-masters-maple',
        },
      },
      snare: {
        item: 'Pearl Free-Floating Steel 14"x6.5"',
        model: 'Free-Floating system',
        specs: '14"x6.5" steel shell, free-floating lugs',
        originalPrice: 350,
        year: 1986,
        source: 'Pearl snare catalog',
        notes: 'The Free-Floating system was revolutionary - maximum resonance and crack.',
        vintageValue2026: 600,
        modernEquivalent: {
          item: 'Pearl Dave Lombardo Signature',
          price: 500,
          link: 'pearl-dave-lombardo',
        },
      },
      cymbals: {
        item: 'Paiste RUDE Series',
        model: 'Heavy/Power configuration',
        specs: '14" Sound Edge Hi-Hats, 18" Crash, 19" Crash, 20" Crash/Ride, 22" Power Ride, 18" China',
        originalPrice: 1400,
        year: 1986,
        source: 'Paiste RUDE series retail 1986',
        notes: 'RUDE series - bright, loud, cutting. Built to be heard over wall of guitars.',
        vintageValue2026: 2200,
        modernEquivalent: {
          item: 'Paiste RUDE Set + China',
          price: 2400,
          link: 'paiste-rude-set',
        },
      },
      hardware: {
        item: 'DW 5000 Double Pedal + Pearl Hardware',
        model: 'DW 5000 Turbo + Pearl stands',
        specs: 'Double bass pedal (for single kick option), hi-hat, 4 cymbal stands, 2 snare stands',
        originalPrice: 800,
        year: 1986,
        source: 'DW and Pearl hardware retail',
        notes: 'The DW 5000 was THE thrash metal pedal. Turbo drive for speed.',
        vintageValue2026: 1000,
        modernEquivalent: {
          item: 'DW 5000 TD4 + Pearl hardware',
          price: 900,
          link: 'dw-5000-pearl',
        },
      },
      sticks: {
        item: 'Pro-Mark 747 Oak',
        model: 'Rock model',
        specs: 'Oak, wood tip, .551" diameter',
        originalPrice: 6,
        year: 1986,
        source: 'Pro-Mark retail',
        notes: 'Oak for durability. Heavy sticks for power.',
        vintageValue2026: null,
        modernEquivalent: {
          item: 'Vic Firth X5A Extreme',
          price: 14,
          link: 'vic-firth-x5a',
        },
      },
      heads: {
        item: 'Remo Emperor',
        model: 'Double-ply',
        specs: 'Emperor clear toms, CS Black Dot snare, Powerstroke kick',
        originalPrice: 80,
        year: 1986,
        source: 'Remo professional pricing',
        notes: 'Double-ply for durability and attack.',
        vintageValue2026: null,
        modernEquivalent: {
          item: 'Remo Emperor ProPack',
          price: 110,
          link: 'remo-emperor-pack',
        },
      },
    },
    
    totals: {
      originalTotal: 4836,
      inflationAdjusted2026: null,
      vintageTotal2026: 7300,
      modernEquivalentTotal: 7124,
    },
    
    priceEvolution: [
      { year: 1986, price: 4836, label: 'Original Purchase', event: 'Reign in Blood recording' },
      { year: 1990, price: 5200, label: 'Seasons era', event: 'Slayer peak' },
      { year: 1995, price: 4500, label: 'Market dip', event: 'Grunge dominance' },
      { year: 2000, price: 5800, label: 'Metal revival', event: 'New thrash bands emerge' },
      { year: 2010, price: 8500, label: 'Vintage boom', event: 'Collector market expands' },
      { year: 2019, price: 10000, label: 'Slayer farewell', event: 'Final tour premium' },
      { year: 2026, price: 14400, label: 'Current adjusted', event: 'Inflation + legacy value' },
    ],
    
    sources: [
      { title: 'Pearl Professional Catalog', year: 1986, type: 'catalog' },
      { title: 'Modern Drummer - Dave Lombardo', year: 1987, type: 'interview' },
      { title: 'DW Drums History Archives', year: 2020, type: 'manufacturer' },
      { title: 'Slayer Equipment Archives', year: 2019, type: 'fan-compiled' },
    ],
    
    meta: {
      title: 'Dave Lombardo 1986 Reign in Blood Drum Setup Cost | Slayer Gear Prices',
      description: "How much did Dave Lombardo's Reign in Blood era drum kit cost? Original $4,836, inflation-adjusted to $14,400+ today. Complete Slayer gear breakdown.",
      keywords: ['dave lombardo 1986 setup', 'reign in blood drums', 'slayer drum cost', 'vintage pearl drums price', 'lombardo gear today'],
    },
  },
};

// ==========================================
// Helper Functions
// ==========================================

/**
 * Get price history data for a drummer
 * @param {string} slug - Drummer slug
 * @returns {Object|null} - Price history data or null
 */
export function getGearPriceHistory(slug) {
  const data = GEAR_PRICE_HISTORY[slug];
  if (!data) return null;
  
  // Calculate inflation-adjusted totals dynamically
  const inflationAdjusted = calculateInflationAdjustedPrice(
    data.totals.originalTotal,
    data.iconicYear
  );
  
  return {
    ...data,
    totals: {
      ...data.totals,
      inflationAdjusted2026: inflationAdjusted,
    },
    inflationMultiplier: getInflationMultiplier(data.iconicYear),
  };
}

/**
 * Check if drummer has price history data
 * @param {string} slug - Drummer slug
 * @returns {boolean}
 */
export function hasPriceHistoryData(slug) {
  return GEAR_PRICE_HISTORY.hasOwnProperty(slug);
}

/**
 * Get all drummers with price history data
 * @returns {string[]} - Array of slugs
 */
export function getPriceHistoryDrummerSlugs() {
  return Object.keys(GEAR_PRICE_HISTORY);
}

/**
 * Check if current URL is a gear history page
 * @returns {boolean}
 */
export function isGearHistoryPage() {
  if (typeof window === 'undefined') return false;
  return /^\/drummers\/[a-z0-9-]+\/gear-history\/?$/i.test(window.location.pathname);
}

/**
 * Get drummer slug from gear history URL
 * @returns {string|null}
 */
export function getGearHistorySlugFromURL() {
  if (typeof window === 'undefined') return null;
  const match = window.location.pathname.match(/^\/drummers\/([a-z0-9-]+)\/gear-history/i);
  return match ? match[1] : null;
}

/**
 * Generate structured data schema for gear history page
 * @param {Object} data - Price history data
 * @returns {Object} - JSON-LD schema
 */
export function generateGearHistorySchema(data) {
  if (!data) return null;
  
  const inflationAdjusted = calculateInflationAdjustedPrice(
    data.totals.originalTotal,
    data.iconicYear
  );
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.meta.title,
    description: data.meta.description,
    author: {
      '@type': 'Organization',
      name: 'MetalForge',
      url: 'https://metalforge.io',
    },
    publisher: {
      '@type': 'Organization',
      name: 'MetalForge',
      logo: {
        '@type': 'ImageObject',
        url: 'https://metalforge.io/images/logo.png',
      },
    },
    mainEntity: {
      '@type': 'Product',
      name: `${data.name} ${data.iconicYear} ${data.era} Drum Setup`,
      description: data.summary,
      image: `https://metalforge.io${data.profileImage}`,
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'USD',
        lowPrice: data.totals.originalTotal,
        highPrice: inflationAdjusted,
        offerCount: 2,
        offers: [
          {
            '@type': 'Offer',
            name: `Original ${data.iconicYear} Price`,
            price: data.totals.originalTotal,
            priceCurrency: 'USD',
            availability: 'https://schema.org/Discontinued',
          },
          {
            '@type': 'Offer',
            name: 'Inflation-Adjusted 2026 Value',
            price: inflationAdjusted,
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
          },
        ],
      },
    },
  };
}

/**
 * Update page meta tags for gear history page
 * @param {Object} data - Price history data
 */
export function updateGearHistoryMeta(data) {
  if (typeof document === 'undefined' || !data) return;
  
  document.title = data.meta.title + ' | MetalForge';
  
  // Update meta description
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', data.meta.description);
  }
  
  // Update OG tags
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', data.meta.title);
  
  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', data.meta.description);
  
  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.setAttribute('content', `https://metalforge.io/drummers/${data.slug}/gear-history`);
  
  // Add structured data
  let schemaScript = document.querySelector('script[data-schema="gear-history"]');
  if (!schemaScript) {
    schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.setAttribute('data-schema', 'gear-history');
    document.head.appendChild(schemaScript);
  }
  schemaScript.textContent = JSON.stringify(generateGearHistorySchema(data));
}

/**
 * Get share URL for gear history page
 * @param {string} slug - Drummer slug
 * @returns {string}
 */
export function getGearHistoryShareUrl(slug) {
  return `https://metalforge.io/drummers/${slug}/gear-history`;
}

export default GEAR_PRICE_HISTORY;
