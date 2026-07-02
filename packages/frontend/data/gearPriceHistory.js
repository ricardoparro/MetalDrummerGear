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
  // Issue #3252: Pre-1981 annual averages added for Bill Ward's 1970 Black Sabbath era
  1968: 34.8,
  1969: 36.7,
  1970: 38.8,
  1971: 40.5,
  1972: 41.8,
  1973: 44.4,
  1974: 49.3,
  1975: 53.8,
  1976: 56.9,
  1977: 60.6,
  1978: 65.2,
  1979: 72.6,
  1980: 82.4,
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

  // ==========================================
  // MIKE PORTNOY - 1992 Images and Words Era
  // Tama Artstar II Setup
  // ==========================================
  'mike-portnoy': {
    slug: 'mike-portnoy',
    name: 'Mike Portnoy',
    band: 'Dream Theater',
    iconicYear: 1992,
    era: 'Images and Words Era',
    albumReference: 'Images and Words (1992)',
    profileImage: '/images/drummers/mike-portnoy.webp',

    summary: "Mike Portnoy's 1992 setup that defined progressive metal drumming on Images and Words. A technically ambitious multi-tom Tama Artstar II configuration built for the complex polyrhythms, odd-time signatures, and extended suite structures that established Dream Theater as prog-metal's premier act. This kit, paired with Zildjian A Custom cymbals and a DW double pedal, produced one of the most technically demanding drum performances ever recorded in the genre. The 8-piece layout gave Portnoy the tonal range needed to move fluidly between the jazz-influenced passages and full-throttle metal sections that define the album — particularly on 'A Fortune in Lies,' 'Pull Me Under,' and the 23-minute opus 'A Change of Seasons' performed in that era. The original retail cost sat just over $5,000 in 1992 dollars — a serious professional investment that now inflates to nearly $12,000 in 2026 terms. Portnoy's approach to kit configuration was unusually systematic for the era: he mapped each tom to specific pitch zones in the songs, treating the drum kit as a melodic instrument rather than a purely rhythmic one. The Tama Artstar II's maple shells provided the warmth and sustain that this musical approach demanded, distinguishing his recorded sound from the harder, drier birch tones common in early-1990s metal production. Zildjian's A Custom series, introduced just a few years earlier, offered the focused, bell-forward projection that cut through layered keyboards and twin-guitar arrangements without becoming strident — a critical balance for a band whose dynamic range spanned whisper-quiet passages and full-force metal climaxes within a single track.",

    setup: {
      drums: {
        item: 'Tama Artstar II',
        model: '8-piece custom configuration',
        specs: '22"x18" kick, 8"x8" rack, 10"x10" rack, 12"x10" rack, 14"x14" floor, 16"x16" floor, 18"x16" floor',
        originalPrice: 2800,
        year: 1992,
        source: 'Tama Artstar II professional catalog MSRP 1992, Modern Drummer archive estimates',
        notes: 'Multi-tom layout for Portnoy\'s complex fills and metric modulation patterns. Tama Artstar II was the flagship professional series with maple shells.',
        vintageValue2026: 3500,
        modernEquivalent: {
          item: 'Tama Starclassic Walnut/Birch',
          price: 3200,
          link: 'tama-starclassic-walnut-birch-drums',
        },
      },
      snare: {
        item: 'Tama Artstar II Steel 14"x6.5"',
        model: 'Steel shell snare',
        specs: '14"x6.5" steel shell, 10-lug',
        originalPrice: 350,
        year: 1992,
        source: 'Tama snare catalog 1992',
        notes: 'Bright, cutting steel snare. Portnoy later developed multiple signature snare models across different eras.',
        vintageValue2026: 450,
        modernEquivalent: {
          item: 'Tama S.L.P. Sonic Steel 14"x6.5"',
          price: 480,
          link: 'tama-slp-sonic-steel',
        },
      },
      cymbals: {
        item: 'Zildjian A Custom Series',
        model: 'Full A Custom configuration',
        specs: '14" A Custom Hi-Hats, 16" A Custom Crash, 18" A Custom Crash, 20" A Custom Medium Ride, 18" A Custom China',
        originalPrice: 1200,
        year: 1992,
        source: 'Zildjian A Custom series retail pricing, 1992 Zildjian catalog',
        notes: 'Zildjian A Custom — bright, focused projection ideal for layered progressive studio recordings. Portnoy\'s primary endorsement throughout his Dream Theater tenure.',
        vintageValue2026: 1400,
        modernEquivalent: {
          item: 'Zildjian A Custom Box Set',
          price: 1500,
          link: 'zildjian-a-custom-series-cymbals',
        },
      },
      hardware: {
        item: 'DW 5002 Double Pedal + Tama Hardware',
        model: 'DW 5002 chain drive + Tama stands',
        specs: 'Chain drive double pedal, hi-hat stand, 6 boom cymbal stands, snare stand',
        originalPrice: 650,
        year: 1992,
        source: 'DW hardware retail 1992, Tama hardware catalog',
        notes: 'DW 5002 was the double pedal of choice for prog and metal drummers in the early 90s. Multi-cymbal setup required additional boom stands.',
        vintageValue2026: 700,
        modernEquivalent: {
          item: 'Pearl Demon Drive + hardware pack',
          price: 800,
          link: 'pearl-demon-drive-double-pedal',
        },
      },
      sticks: {
        item: 'Pro-Mark 747 Oak',
        model: 'Rock model',
        specs: 'Oak, wood tip, .551" diameter',
        originalPrice: 10,
        year: 1992,
        source: 'Standard retail price',
        notes: 'Portnoy used various sticks in the early 90s before settling on signature models later in his career.',
        vintageValue2026: null,
        modernEquivalent: {
          item: 'Vic Firth American Classic 5B',
          price: 14,
          link: 'vic-firth-american-classic-5b',
        },
      },
      heads: {
        item: 'Remo Ambassador / Powerstroke',
        model: 'Clear Ambassadors (toms), Powerstroke (kick)',
        specs: 'Clear Ambassador toms, coated snare batter, Powerstroke P3 kick',
        originalPrice: 90,
        year: 1992,
        source: 'Remo retail pricing 1992',
        notes: 'Standard professional complement. Ambassador clear toms for controlled attack with sustained tone.',
        vintageValue2026: null,
        modernEquivalent: {
          item: 'Remo Emperor ProPack',
          price: 120,
          link: 'remo-emperor-pack',
        },
      },
    },

    totals: {
      originalTotal: 5100,
      inflationAdjusted2026: null, // Calculated dynamically
      vintageTotal2026: 6050,
      modernEquivalentTotal: 6114,
    },

    priceEvolution: [
      { year: 1992, price: 5100, label: 'Original Purchase', event: 'Images and Words recording' },
      { year: 1994, price: 5400, label: 'Awake era', event: 'Dream Theater expands prog-metal audience' },
      { year: 1999, price: 6500, label: 'Scenes from a Memory', event: 'Metropolis Pt. 2 critical peak' },
      { year: 2005, price: 8000, label: 'Octavarium era', event: 'Prog-metal mainstream crossover' },
      { year: 2010, price: 9500, label: 'Post-DT departure', event: 'Collector interest spike' },
      { year: 2023, price: 11200, label: 'DT reunion', event: 'Portnoy returns to Dream Theater' },
      { year: 2026, price: 11900, label: 'Current adjusted', event: 'Inflation-adjusted value' },
    ],

    sources: [
      { title: 'Tama Artstar II Professional Catalog', year: 1992, type: 'catalog' },
      { title: 'Modern Drummer - Mike Portnoy Feature', year: 1993, type: 'interview' },
      { title: 'Zildjian Artist Profiles Archive', year: 1992, type: 'manufacturer' },
      { title: 'Reverb Price Guide — Vintage Tama', year: 2025, type: 'market' },
    ],

    meta: {
      title: "Mike Portnoy 1992 Dream Theater Drum Setup Cost | Images and Words Gear Prices",
      description: "How much did Mike Portnoy's 1992 Dream Theater drum kit cost? Original ~$5,100, inflation-adjusted to ~$11,900 today. Complete Tama Artstar II breakdown from the Images and Words era.",
      keywords: ['mike portnoy 1992 setup', 'dream theater drum cost', 'tama artstar price', 'images and words drums', 'mike portnoy gear cost today'],
    },
  },

  // ==========================================
  // GENE HOGLAN - 1993 Death / Individual Thought Patterns Era
  // Pearl Session Elite Setup
  // ==========================================
  'gene-hoglan': {
    slug: 'gene-hoglan',
    name: 'Gene Hoglan',
    band: 'Death',
    iconicYear: 1993,
    era: 'Individual Thought Patterns Era',
    albumReference: 'Individual Thought Patterns (1993)',
    profileImage: '/images/drummers/gene-hoglan.webp',

    summary: "Gene Hoglan's 1993 kit for Death's Individual Thought Patterns — one of technical death metal's landmark albums. Coming off a Dark Angel career defined by a massive 22-piece setup, Hoglan deliberately stripped down for Death, demonstrating that precision and musicality could coexist with extreme speed. His Pearl Session Elite configuration provided the clean attack and tonal consistency needed for Scott Burns' clinical studio production. The kit cost roughly $3,578 in 1993 — a professional mid-range choice that reflected Hoglan's focus on function over spectacle. Adjusted for 2026 inflation, that investment is equivalent to approximately $8,100 today. His unique crossover from Dark Angel thrash to Chuck Schuldiner's progressive death metal vision produced a drumming style that influenced an entire generation of technical drummers — one that demands reexamination of what a relatively lean setup can accomplish in extreme metal. The Pearl Session Elite's birch and maple hybrid shells offered a tonally balanced response across the full dynamic range Hoglan employed: from delicate ghost notes woven through Schuldiner's clean guitar passages to the explosive double bass volleys that close out tracks like 'Overactive Imagination' and 'Trapped in a Corner.' Scott Burns' production approach at Morrisound Recording benefited from the Session Elite's articulate attack — a kit that didn't need corrective EQ to sound precise on tape, which translated directly to the crisp, defined drum sound that became Individual Thought Patterns' sonic signature. Hoglan later acknowledged that keeping the setup lean forced him to be more inventive with patterns, rather than filling space with additional drums.",

    setup: {
      drums: {
        item: 'Pearl Session Elite',
        model: '6-piece shell pack',
        specs: '22"x16" kick, 10"x9" rack, 12"x10" rack, 14"x11" rack, 16"x16" floor, 18"x16" floor',
        originalPrice: 1800,
        year: 1993,
        source: 'Pearl Session Elite MSRP 1993, DrummerWorld forum archives',
        notes: 'Birch/maple hybrid shells. A professional but not excessive setup — deliberately stripped back from Hoglan\'s massive Dark Angel rig. Clean, punchy attack perfect for Scott Burns\' clinical production on Individual Thought Patterns.',
        vintageValue2026: 2200,
        modernEquivalent: {
          item: 'Pearl Reference Series',
          price: 4800,
          link: 'pearl-reference-series-drums',
        },
      },
      snare: {
        item: 'Pearl Sensitone Steel 14"x6.5"',
        model: 'Steel shell snare',
        specs: '14"x6.5" seamless steel shell, 8-lug',
        originalPrice: 250,
        year: 1993,
        source: 'Pearl Sensitone catalog 1993',
        notes: 'Bright, cutting steel snare with excellent projection. Critical for the sharp, defined snare tone on Individual Thought Patterns.',
        vintageValue2026: 400,
        modernEquivalent: {
          item: 'Pearl Sensitone Elite Steel',
          price: 350,
          link: 'pearl-sensitone-elite',
        },
      },
      cymbals: {
        item: 'Zildjian A Series',
        model: 'Mixed A Series configuration',
        specs: '14" A Hi-Hats, 16" A Thin Crash, 18" A Thin Crash, 20" A Medium Ride, 18" A China',
        originalPrice: 900,
        year: 1993,
        source: 'Zildjian A Series retail pricing 1993',
        notes: 'Standard Zildjian A — responsive and versatile. Hoglan used a relatively traditional cymbal spread compared to his later setups.',
        vintageValue2026: 950,
        modernEquivalent: {
          item: 'Zildjian A Custom Box Set',
          price: 1200,
          link: 'zildjian-a-custom-series-cymbals',
        },
      },
      hardware: {
        item: 'DW 5000 Double Pedal + Pearl Hardware',
        model: 'DW 5000 Turbo + Pearl stands',
        specs: 'Chain drive double pedal, hi-hat stand, 4 cymbal boom stands, snare stand',
        originalPrice: 550,
        year: 1993,
        source: 'DW and Pearl hardware retail 1993',
        notes: 'DW 5000 Turbo for the double bass patterns central to Hoglan\'s style. Pearl stands for the drum kit configuration.',
        vintageValue2026: 600,
        modernEquivalent: {
          item: 'Tama Iron Cobra 900 + hardware',
          price: 750,
          link: 'tama-iron-cobra-900-double-pedal',
        },
      },
      sticks: {
        item: 'Pro-Mark 747 Oak',
        model: 'Rock model',
        specs: 'Oak, wood tip, .551" diameter',
        originalPrice: 8,
        year: 1993,
        source: 'Standard retail price',
        notes: 'Heavy oak for power and durability. Hoglan\'s aggressive technique requires robust sticks.',
        vintageValue2026: null,
        modernEquivalent: {
          item: 'Vic Firth American Classic 5B',
          price: 14,
          link: 'vic-firth-american-classic-5b',
        },
      },
      heads: {
        item: 'Remo Emperor',
        model: 'Double-ply',
        specs: 'Emperor clear toms, coated snare batter, Powerstroke kick',
        originalPrice: 70,
        year: 1993,
        source: 'Remo professional pricing 1993',
        notes: 'Double-ply Emperor for attack and durability under Hoglan\'s powerful stroke.',
        vintageValue2026: null,
        modernEquivalent: {
          item: 'Remo Emperor ProPack',
          price: 110,
          link: 'remo-emperor-pack',
        },
      },
    },

    totals: {
      originalTotal: 3578,
      inflationAdjusted2026: null, // Calculated dynamically
      vintageTotal2026: 4150,
      modernEquivalentTotal: 7224,
    },

    priceEvolution: [
      { year: 1993, price: 3578, label: 'Original Purchase', event: 'Individual Thought Patterns recording' },
      { year: 1995, price: 3800, label: 'Symbolic era', event: 'Death releases Symbolic' },
      { year: 1998, price: 4200, label: 'Post-Death projects', event: 'Hoglan joins Strapping Young Lad' },
      { year: 2006, price: 5800, label: 'Dark Angel reunion', event: 'Thrash revival interest' },
      { year: 2013, price: 7200, label: 'Testament era', event: 'Hoglan anchors Testament globally' },
      { year: 2020, price: 9000, label: 'Vintage tech-death boom', event: 'Death reissues drive catalog interest' },
      { year: 2026, price: 8100, label: 'Current adjusted', event: 'Inflation-adjusted value' },
    ],

    sources: [
      { title: 'Pearl Professional Catalog', year: 1993, type: 'catalog' },
      { title: 'Modern Drummer - Gene Hoglan Interview', year: 1994, type: 'interview' },
      { title: 'DrummerWorld Archive — Gene Hoglan Equipment', year: 2024, type: 'forum' },
      { title: 'Reverb Price Guide — Vintage Pearl', year: 2025, type: 'market' },
    ],

    meta: {
      title: "Gene Hoglan 1993 Death Drum Setup Cost | Individual Thought Patterns Gear Prices",
      description: "How much did Gene Hoglan's 1993 Death drum kit cost? Original ~$3,578, inflation-adjusted to ~$8,100 today. Complete Pearl Session Elite breakdown from the Individual Thought Patterns era.",
      keywords: ['gene hoglan 1993 setup', 'death drum kit cost', 'gene hoglan early kit', 'individual thought patterns drums', 'gene hoglan gear today'],
    },
  },

  // ==========================================
  // DANNY CAREY - 1994 Tool / Undertow Era
  // Pearl Masters + Electronics Setup
  // ==========================================
  'danny-carey': {
    slug: 'danny-carey',
    name: 'Danny Carey',
    band: 'Tool',
    iconicYear: 1994,
    era: 'Undertow/Aenima Era',
    albumReference: 'Undertow (1993) / Aenima (1996)',
    profileImage: '/images/drummers/danny-carey.webp',

    summary: "Danny Carey's mid-1990s setup for Tool's defining Undertow and Aenima era — one of the most unusual and technically sophisticated configurations in alternative metal history. Carey blended a standard acoustic Pearl Masters Studio kit with electronic percussion, gongs, and unconventional tunings influenced by his background in jazz and his interest in sacred geometry and polyrhythmic composition. This hybrid approach, rare for heavy guitar-driven music in 1994, produced the foundation for tracks like 'Prison Sex,' 'Sober,' 'Eulogy,' and the Aenima title track. The setup represented roughly $5,645 in mid-1990s dollars — a substantial investment driven by the electronic components that distinguished Carey from contemporaries. Adjusted for 2026 inflation, that figure reaches approximately $12,480, not counting the appreciating collector value of the vintage electronics. No drummer in heavy music has since replicated Carey's specific intersection of groove, odd time, and ritual-inflected sonic texture. The Pearl Masters Studio maple shells provided the warm, open resonance that Tool's dynamic production demanded: Adam Jones and Justin Chancellor's instruments occupied the mid and low frequencies, leaving Carey's drums needing both presence and sustain to project through the dense sonic canvas. The Roland R-8 trigger integration was not a concession to commercial convenience but an artistic choice — Carey used the layered samples to extend the acoustic kit's timbral vocabulary into territory no acoustic instrument could reach, a philosophy that foreshadowed his later adoption of Moog synthesizers and MIDI-controlled gongs. The Zildjian A Custom cymbals, introduced to his setup around this era, offered a brighter, more focused sound than the darker A Series that defined earlier Tool performances, allowing individual cymbal voices to articulate clearly within the band's signature wall of sound.",

    setup: {
      drums: {
        item: 'Pearl Masters Studio',
        model: '7-piece shell pack',
        specs: '22"x18" kick, 10"x8" rack, 12"x9" rack, 14"x11" rack, 16"x16" floor, 18"x16" floor',
        originalPrice: 2400,
        year: 1994,
        source: 'Pearl Masters Studio MSRP 1994, Modern Drummer archive estimates',
        notes: 'Maple shells for warm, full-bodied tone. Pearl was Carey\'s primary drum endorsement through the early Tool albums.',
        vintageValue2026: 3000,
        modernEquivalent: {
          item: 'Pearl Reference Series',
          price: 4800,
          link: 'pearl-reference-series-drums',
        },
      },
      snare: {
        item: 'Pearl Free-Floating Steel 14"x5.5"',
        model: 'Free-floating system',
        specs: '14"x5.5" steel shell, free-floating lugs',
        originalPrice: 300,
        year: 1994,
        source: 'Pearl snare catalog 1994',
        notes: 'The free-floating design maximizes resonance, important for Carey\'s wide dynamic range — from delicate jazz-influenced passages to explosive metal hits.',
        vintageValue2026: 550,
        modernEquivalent: {
          item: 'Pearl Free-Floating Steel 14"x6.5"',
          price: 550,
          link: 'pearl-sensitone-elite',
        },
      },
      cymbals: {
        item: 'Zildjian A and A Custom Series',
        model: 'Mixed A/A Custom + gong',
        specs: '14" A Custom Hi-Hats, 17" A Thin Crash, 19" A Medium Crash, 20" A Custom Ride, 18" A China, 22" Paiste gong',
        originalPrice: 1500,
        year: 1994,
        source: 'Zildjian retail pricing 1994, Paiste gong catalog',
        notes: 'Carey combined standard A Custom cymbals with a large gong for the ritualistic, ambient textures on Undertow. The gong appears prominently on extended outro passages.',
        vintageValue2026: 1800,
        modernEquivalent: {
          item: 'Zildjian A Custom Box Set + China',
          price: 1800,
          link: 'zildjian-a-custom-series-cymbals',
        },
      },
      hardware: {
        item: 'DW 5002 Double Pedal + Pearl Hardware',
        model: 'DW 5002 chain drive + Pearl stands',
        specs: 'Chain drive double pedal, hi-hat stand, 5 boom cymbal stands, gong stand, snare stand',
        originalPrice: 750,
        year: 1994,
        source: 'DW and Pearl hardware retail 1994',
        notes: 'DW 5002 for Carey\'s complex double bass patterns. Additional stands required for gong and extended cymbal array.',
        vintageValue2026: 800,
        modernEquivalent: {
          item: 'Pearl Demon Drive + hardware pack',
          price: 900,
          link: 'pearl-demon-drive-double-pedal',
        },
      },
      sticks: {
        item: 'Vic Firth 5A Hickory',
        model: 'American Classic 5A',
        specs: 'Hickory, wood tip, .565" diameter',
        originalPrice: 10,
        year: 1994,
        source: 'Standard retail price',
        notes: 'Carey used standard Vic Firth sticks in the early Tool era before developing signature stick relationships. The 5A provides balance between power and control.',
        vintageValue2026: null,
        modernEquivalent: {
          item: 'Vic Firth American Classic 5B',
          price: 14,
          link: 'vic-firth-american-classic-5b',
        },
      },
      heads: {
        item: 'Remo Ambassador Clear',
        model: 'Clear Ambassador (toms), Powerstroke (kick)',
        specs: 'Clear Ambassador toms, coated snare batter, Powerstroke P3 kick',
        originalPrice: 85,
        year: 1994,
        source: 'Remo retail pricing 1994',
        notes: 'Clear Ambassadors for open, resonant tom tone — critical for Carey\'s wide-interval tuning approach and the sustained ring on Undertow and Aenima.',
        vintageValue2026: null,
        modernEquivalent: {
          item: 'Remo Emperor ProPack',
          price: 120,
          link: 'remo-emperor-pack',
        },
      },
      electronics: {
        item: 'Roland R-8 Drum Machine + Triggers',
        model: 'R-8 trigger brain + acoustic triggers',
        specs: 'Kick and tom triggers, R-8 brain for sample layering',
        originalPrice: 600,
        year: 1994,
        source: 'Roland R-8 MSRP, electronic percussion pricing 1994',
        notes: 'Carey used electronic triggers for sound layering and electronic percussion elements. The hybrid acoustic/electronic approach was highly unusual for heavy guitar music in 1994 and became a Tool signature.',
        vintageValue2026: 350,
        modernEquivalent: {
          item: 'Roland RT-30 Series Triggers',
          price: 400,
          link: 'roland-rt30-triggers',
        },
      },
    },

    totals: {
      originalTotal: 5645,
      inflationAdjusted2026: null, // Calculated dynamically
      vintageTotal2026: 6500,
      modernEquivalentTotal: 8584,
    },

    priceEvolution: [
      { year: 1994, price: 5645, label: 'Original Purchase', event: 'Undertow touring / Aenima pre-production' },
      { year: 1996, price: 6000, label: 'Aenima era', event: 'Aenima releases to critical acclaim' },
      { year: 2001, price: 7500, label: 'Lateralus era', event: 'Tool\'s commercial peak' },
      { year: 2006, price: 9000, label: '10,000 Days', event: 'Tool hiatus drives catalog demand' },
      { year: 2019, price: 12500, label: 'Fear Inoculum', event: 'First new album in 13 years' },
      { year: 2022, price: 13500, label: 'Streaming uplift', event: 'Tool catalog hits streaming' },
      { year: 2026, price: 12480, label: 'Current adjusted', event: 'Inflation-adjusted value' },
    ],

    sources: [
      { title: 'Pearl Masters Studio Catalog', year: 1994, type: 'catalog' },
      { title: 'Modern Drummer - Danny Carey Interview', year: 1997, type: 'interview' },
      { title: 'Roland R-8 Product Archives', year: 1994, type: 'manufacturer' },
      { title: 'DrummerWorld Archive — Danny Carey Equipment', year: 2024, type: 'forum' },
    ],

    meta: {
      title: "Danny Carey 1994 Tool Drum Setup Cost | Undertow Era Gear Prices",
      description: "How much did Danny Carey's 1994 Tool drum kit cost? Original ~$5,645, inflation-adjusted to ~$12,480 today. Complete Pearl Masters + electronics breakdown from the Undertow/Aenima era.",
      keywords: ['danny carey 1994 setup', 'tool drum kit cost', 'danny carey 90s gear', 'undertow era drums', 'danny carey gear today'],
    },
  },
  // ==========================================
  // TOMAS HAAKE - 1998 Meshuggah / Chaosphere Era
  // Tama Superstar Setup
  // ==========================================
  'tomas-haake': {
    slug: 'tomas-haake',
    name: 'Tomas Haake',
    band: 'Meshuggah',
    iconicYear: 1998,
    era: 'Chaosphere Era',
    albumReference: 'Chaosphere (1998)',
    profileImage: '/images/drummers/tomas-haake.webp',

    summary: "Tomas Haake's 1998 Chaosphere-era setup — the kit behind one of extreme metal's most disorienting and technically demanding albums. Running an intermediate Tama shell pack with Sabian B8 Pro cymbals and a DW 5002 double pedal, Haake executed the polymetric, offset-grid drumming patterns that would define Meshuggah's 'djent' blueprint for a generation. The stripped-down, budget-conscious configuration contrasts sharply with the extreme complexity of what he played on it. The setup cost approximately $2,315 in 1998 dollars — equivalent to around $4,650 in 2026. By the ÖBZen era (2008), Haake had moved to Tama Starclassic Maple with Meinl Byzance cymbals, and the cost of replicating the full rig had grown by over 150%. Few drummers demonstrate so stark a contrast between the modesty of the instrument and the extremity of the music produced on it.",

    setup: {
      drums: {
        item: 'Tama Superstar',
        model: '5-piece shell pack',
        specs: '22"x16" kick, 10"x9" rack, 12"x10" rack, 14"x14" floor, 16"x16" floor',
        originalPrice: 1200,
        year: 1998,
        source: 'Tama Superstar MSRP 1998, DrummerWorld equipment archives',
        notes: 'Intermediate Tama Superstar with maple/birch hybrid shells. Haake was not yet on a full professional endorsement in the Chaosphere era — the Superstar was the workhorse of touring metal drummers on mid-range budgets.',
        vintageValue2026: 1600,
        modernEquivalent: {
          item: 'Tama Starclassic Walnut/Birch',
          price: 3200,
          link: 'tama-starclassic-walnut-birch-drums',
        },
      },
      snare: {
        item: 'Tama Steel Snare 14"x5"',
        model: 'Steel shell snare',
        specs: '14"x5" seamless steel shell, 8-lug',
        originalPrice: 200,
        year: 1998,
        source: 'Tama snare catalog 1998',
        notes: 'Bright, cutting steel snare providing sharp attack critical for the fast, precise rim shots on Chaosphere. Haake later developed the Tamas Haake Signature snare as his profile grew.',
        vintageValue2026: 300,
        modernEquivalent: {
          item: 'Tama S.L.P. Sonic Steel 14"x5.5"',
          price: 450,
          link: 'tama-slp-sonic-steel',
        },
      },
      cymbals: {
        item: 'Sabian B8 Pro Series',
        model: 'B8 Pro configuration',
        specs: '14" B8 Pro Hi-Hats, 16" B8 Pro Thin Crash, 18" B8 Pro Thin Crash, 20" B8 Pro Medium Ride',
        originalPrice: 450,
        year: 1998,
        source: 'Sabian B8 Pro retail pricing 1998',
        notes: 'Entry-to-mid-range B8 Pro cymbals — a common choice for European extreme metal drummers in the late 1990s before full endorsement deals. Haake later transitioned to Meinl Byzance, which commands 3× the price.',
        vintageValue2026: 500,
        modernEquivalent: {
          item: 'Meinl Byzance Dark Box Set',
          price: 1800,
          link: 'meinl-byzance-dark-set',
        },
      },
      hardware: {
        item: 'DW 5002 Double Pedal + Tama Hardware',
        model: 'DW 5002 chain drive + Tama stands',
        specs: 'Chain drive double pedal, hi-hat stand, 3 boom cymbal stands, snare stand',
        originalPrice: 380,
        year: 1998,
        source: 'DW hardware retail 1998, Tama hardware catalog',
        notes: "DW 5002 chain drive for Haake's relentless double bass patterns. Meshuggah's offset-grid polyrhythms demand exceptional pedal precision and consistency — the 5002 was the preferred touring choice for budget-conscious double bass specialists of the era.",
        vintageValue2026: 400,
        modernEquivalent: {
          item: 'Tama Iron Cobra 900 Power Glide + hardware',
          price: 750,
          link: 'tama-iron-cobra-900-double-pedal',
        },
      },
      sticks: {
        item: 'Pro-Mark 5B Hickory',
        model: 'American Classic 5B',
        specs: 'Hickory, wood tip, .595" diameter',
        originalPrice: 10,
        year: 1998,
        source: 'Standard retail price',
        notes: "Standard Pro-Mark 5B before Haake developed a signature model. The 5B weight profile suits Meshuggah's intense, repetitive patterns without fatiguing the wrist.",
        vintageValue2026: null,
        modernEquivalent: {
          item: 'Pro-Mark Tomas Haake Signature',
          price: 16,
          link: 'promark-tomas-haake',
        },
      },
      heads: {
        item: 'Remo Ambassador',
        model: 'Clear Ambassador (toms), Powerstroke P3 (kick)',
        specs: 'Clear Ambassador toms, coated snare batter, Powerstroke P3 kick batter',
        originalPrice: 75,
        year: 1998,
        source: 'Remo retail pricing 1998',
        notes: 'Clear Ambassadors for controlled attack. The Powerstroke P3 kick head gives the focused, punchy low-end thump essential for Meshuggah\'s low-tuned, syncopated bass drum patterns.',
        vintageValue2026: null,
        modernEquivalent: {
          item: 'Remo Emperor ProPack',
          price: 110,
          link: 'remo-emperor-pack',
        },
      },
    },

    totals: {
      originalTotal: 2315,
      inflationAdjusted2026: null, // Calculated dynamically
      vintageTotal2026: 2800,
      modernEquivalentTotal: 6326,
    },

    priceEvolution: [
      { year: 1998, price: 2315, label: 'Original Purchase', event: 'Chaosphere recording' },
      { year: 2002, price: 2500, label: 'Nothing era', event: 'Meshuggah releases Nothing' },
      { year: 2008, price: 3200, label: 'ÖBZen era', event: 'Haake upgrades to Tama Starclassic + Meinl Byzance' },
      { year: 2012, price: 3800, label: 'Koloss era', event: 'Meshuggah reaches global audiences' },
      { year: 2016, price: 4200, label: 'The Violent Sleep of Reason', event: 'Full-album live performances' },
      { year: 2022, price: 5100, label: 'Immutable', event: 'Career peak commercial success' },
      { year: 2026, price: 4650, label: 'Current adjusted', event: 'Inflation-adjusted value' },
    ],

    sources: [
      { title: 'Tama Drums Professional Catalog', year: 1998, type: 'catalog' },
      { title: 'Modern Drummer — Tomas Haake Interview', year: 2009, type: 'interview' },
      { title: 'Sabian B8 Pro Retail Price List', year: 1998, type: 'manufacturer' },
      { title: 'DrummerWorld Archive — Tomas Haake Equipment', year: 2024, type: 'forum' },
    ],

    meta: {
      title: 'Tomas Haake 1998 Meshuggah Drum Setup Cost | Chaosphere Era Gear Prices',
      description: "How much did Tomas Haake's 1998 Chaosphere-era drum kit cost? Original ~$2,315, inflation-adjusted to ~$4,650 today. Complete Tama Superstar breakdown with Sabian B8 Pro cymbal pricing.",
      keywords: ['tomas haake 1998 setup', 'meshuggah drum kit cost', 'chaosphere era drums', 'tomas haake gear history', 'meshuggah drummer kit by year'],
    },
  },

  // ==========================================
  // PETE SANDOVAL - 1989 Morbid Angel / Altars of Madness Era
  // Pearl Export Setup
  // ==========================================
  'pete-sandoval': {
    slug: 'pete-sandoval',
    name: 'Pete Sandoval',
    band: 'Morbid Angel',
    iconicYear: 1989,
    era: 'Altars of Madness Era',
    albumReference: 'Altars of Madness (1989)',
    profileImage: '/images/drummers/pete-sandoval.webp',

    summary: "Pete Sandoval's 1989 setup for Morbid Angel's Altars of Madness — the album that codified the Florida death metal sound and introduced the first commercially recorded blast beats at a sustained technical level. Sandoval played a Pearl Export shell pack with budget-tier Sabian cymbals, a DW 5000 double pedal, and standard Remo heads. The contrast between this modest ~$1,591 configuration and the brutality it produced is remarkable even by extreme metal standards. No major endorsement, no high-end hardware — just precise, mechanical speed that left producers and drummers across the industry reconsidering what an entry-level kit could do. Adjusted for 2026 inflation, the original setup cost is equivalent to approximately $4,200. By the Covenant era (1993), Sandoval had moved to a Tama shell pack as Morbid Angel's touring budget expanded, and the gear cost gap between the two eras reflects both equipment upgrades and broader musical instrument price inflation through the 1990s.",

    setup: {
      drums: {
        item: 'Pearl Export Series',
        model: '5-piece shell pack',
        specs: '22"x16" kick (×2 for double bass), 12"x10" rack, 14"x14" floor',
        originalPrice: 650,
        year: 1989,
        source: 'Pearl Export MSRP 1989, vintage catalog estimates',
        notes: 'Pearl Export was the industry-standard budget professional kit for touring metal drummers in the late 1980s. Sandoval ran a true double-kick configuration — two separate 22" bass drums rather than a double pedal — which required purchasing a second kick separately.',
        vintageValue2026: 900,
        modernEquivalent: {
          item: 'Pearl Export EXX',
          price: 800,
          link: 'pearl-export-exx',
        },
      },
      snare: {
        item: 'Pearl Steel Snare 14"x5.5"',
        model: 'Steel shell snare',
        specs: '14"x5.5" seamless steel shell, 8-lug',
        originalPrice: 180,
        year: 1989,
        source: 'Pearl snare catalog 1989',
        notes: 'Bright, cutting steel snare providing sharp crack for Sandoval\'s blast beat snare hits. The steel shell projects strongly through dense, down-tuned guitar tracks — essential on a 1989 Scott Burns recording.',
        vintageValue2026: 280,
        modernEquivalent: {
          item: 'Pearl Sensitone Elite Steel 14"x5"',
          price: 350,
          link: 'pearl-sensitone-elite',
        },
      },
      cymbals: {
        item: 'Sabian B8 Series',
        model: 'B8 basic configuration',
        specs: '14" B8 Hi-Hats, 16" B8 Thin Crash, 18" B8 Medium Crash, 20" B8 Ride, 16" B8 China',
        originalPrice: 420,
        year: 1989,
        source: 'Sabian B8 retail pricing 1989',
        notes: 'Entry-level Sabian B8 — the most affordable professional cymbal range of the era. Death metal production in 1989 typically buried cymbals in dense guitar low-end, reducing the audible impact of premium cymbal investment.',
        vintageValue2026: 450,
        modernEquivalent: {
          item: 'Sabian AAX Stage Set',
          price: 1200,
          link: 'sabian-aax-stage-set',
        },
      },
      hardware: {
        item: 'DW 5000 Single Pedal (×2) + Pearl Hardware',
        model: 'DW 5000 Turbo + Pearl stands',
        specs: 'Two DW 5000 Turbo single pedals (one per bass drum), hi-hat stand, 4 cymbal stands',
        originalPrice: 280,
        year: 1989,
        source: 'DW hardware retail 1989, Pearl hardware catalog',
        notes: 'Sandoval used two separate DW 5000 single pedals on two independent bass drums — the preferred extreme-speed configuration for early death metal. True double-kick provides marginally different resonance per drum and was considered the mark of serious extreme drummers.',
        vintageValue2026: 350,
        modernEquivalent: {
          item: 'DW 5000 TD4 Double Pedal + Pearl hardware',
          price: 700,
          link: 'dw-5000-pearl',
        },
      },
      sticks: {
        item: 'Pro-Mark 747 Oak',
        model: 'Rock model',
        specs: 'Oak, wood tip, .551" diameter',
        originalPrice: 6,
        year: 1989,
        source: 'Standard retail price',
        notes: 'Heavy oak sticks for durability and power. Blast beats at extreme tempos destroy lighter sticks rapidly; oak provided the density needed for sustained live and studio punishment.',
        vintageValue2026: null,
        modernEquivalent: {
          item: 'Vic Firth American Classic 5B',
          price: 14,
          link: 'vic-firth-american-classic-5b',
        },
      },
      heads: {
        item: 'Remo Ambassador',
        model: 'Clear Ambassador (toms), Powerstroke (kick)',
        specs: 'Clear Ambassador toms, coated snare batter, Powerstroke P3 kick',
        originalPrice: 55,
        year: 1989,
        source: 'Remo retail pricing 1989',
        notes: 'Standard Remo complement for the era. The coated snare batter added warmth to the steel shell snare, balancing crack with body on the Altars of Madness recording.',
        vintageValue2026: null,
        modernEquivalent: {
          item: 'Remo Emperor ProPack',
          price: 110,
          link: 'remo-emperor-pack',
        },
      },
    },

    totals: {
      originalTotal: 1591,
      inflationAdjusted2026: null, // Calculated dynamically
      vintageTotal2026: 1980,
      modernEquivalentTotal: 3174,
    },

    priceEvolution: [
      { year: 1989, price: 1591, label: 'Original Purchase', event: 'Altars of Madness recording' },
      { year: 1993, price: 1800, label: 'Covenant era', event: 'Morbid Angel upgrades to Tama' },
      { year: 1995, price: 2200, label: 'Domination era', event: 'Morbid Angel reaches peak influence' },
      { year: 2003, price: 3200, label: 'Heretic era', event: 'Vintage death metal interest grows' },
      { year: 2014, price: 4500, label: 'Health hiatus', event: 'Sandoval retires due to back injury' },
      { year: 2020, price: 5200, label: 'Collector premium', event: 'Altars of Madness 30th anniversary' },
      { year: 2026, price: 4200, label: 'Current adjusted', event: 'Inflation-adjusted value' },
    ],

    sources: [
      { title: 'Pearl Export Professional Catalog', year: 1989, type: 'catalog' },
      { title: 'Metal Maniacs — Pete Sandoval Interview', year: 1990, type: 'interview' },
      { title: 'Sabian Cymbal Retail Price List', year: 1989, type: 'manufacturer' },
      { title: 'DrummerWorld Archive — Pete Sandoval Equipment', year: 2024, type: 'forum' },
    ],

    meta: {
      title: 'Pete Sandoval 1989 Morbid Angel Drum Setup Cost | Altars of Madness Gear Prices',
      description: "How much did Pete Sandoval's 1989 Altars of Madness drum kit cost? Original ~$1,591, inflation-adjusted to ~$4,200 today. Complete Pearl Export breakdown with Sabian B8 pricing.",
      keywords: ['pete sandoval 1989 setup', 'morbid angel drum kit cost', 'altars of madness drums', 'pete sandoval drum kit history', 'morbid angel drummer gear evolution'],
    },
  },

  // ==========================================
  // VINNIE PAUL - 1990 Pantera / Cowboys from Hell Era
  // Premier Drum Kit Setup
  // ==========================================
  // ==========================================
  // IGOR CAVALERA - 1996 Roots Era
  // Pearl Masters Custom Setup
  // ==========================================
  'igor-cavalera': {
    slug: 'igor-cavalera',
    name: 'Igor Cavalera',
    band: 'Sepultura',
    iconicYear: 1996,
    era: 'Roots Era',
    albumReference: 'Roots (1996)',
    profileImage: '/images/drummers/igor-cavalera.webp',

    summary: "Igor Cavalera's gear journey from Belo Horizonte's underground metal scene to Pearl's international endorsement roster is one of extreme metal's most remarkable origin stories. In 1984, when he and his brother Max founded Sepultura at ages 16 and 15 respectively, the family could barely afford food, let alone professional drum equipment. Igor's first kit — an unnamed Brazilian-made instrument cobbled together from mismatched shells — cost roughly $200 in mid-1980s Brazilian cruzeiros, barely enough to hold a tune at rehearsal speed. That this setup produced the seeds of one of extreme metal's most important bands remains striking decades later.\n\nAs Sepultura signed with Cogumelo Records and later Roadrunner Records, the kit budget expanded incrementally. The Beneath the Remains sessions (1989) saw Igor behind a Pearl Export — the global default for budget-conscious metal drummers — paired with basic Sabian cymbals and a DW 5000 pedal. The contrast between the low-budget configuration and the album's unrelenting speed and precision announced Igor as a legitimate force in the thrash-death underground.\n\nBy Arise (1991), Sepultura's rising profile earned Igor a Pearl endorsement, and the Chaos AD sessions (1993) — recorded largely in Tampa, Florida — showed him increasingly focused on groove and tribal rhythmic elements rather than pure speed. The setup grew in refinement but not excessively in cost.\n\nThe Roots era (1996) represents Igor's most fully realized endorsed configuration. Working with producer Ross Robinson and incorporating members of the Xavante tribe, Igor built a setup centered on Pearl Masters Custom shells with Sabian AA cymbals and a DW double pedal — optimized for the polyrhythmic, groove-heavy drumming that defined the album. The complete Roots-era rig cost approximately $4,703 in 1996 dollars, equivalent to roughly $9,800 in 2026 terms after CPI adjustment.\n\nIgor departed Sepultura in 1996 following the Roots tour. No other endorsement story in Brazilian metal covers so dramatic a cost arc — from a $200 unnamed kit in 1984 to a $4,703 professional Pearl configuration twelve years later, producing music that permanently altered the extreme metal landscape on both sides of the Atlantic.",

    setup: {
      drums: {
        item: 'Pearl Masters Custom',
        model: '5-piece shell pack',
        specs: '22"x16" kick, 10"x9" rack, 12"x10" rack, 16"x16" floor',
        originalPrice: 2600,
        year: 1996,
        source: 'Pearl Masters Custom MSRP 1996, Modern Drummer archive estimates',
        notes: 'Pearl Masters Custom maple shells — Pearl\'s mid-tier professional line in 1996. The endorsement followed Sepultura\'s Roadrunner contract expansion and gave Igor access to consistent, reliable hardware for grueling world tours.',
        vintageValue2026: 2800,
        modernEquivalent: {
          item: 'Pearl Masters Complete',
          price: 4200,
          link: 'pearl-masters-maple',
        },
      },
      snare: {
        item: 'Pearl Chrome Steel 14"x6.5"',
        model: 'Steel shell snare',
        specs: '14"x6.5" seamless steel shell, 10-lug',
        originalPrice: 280,
        year: 1996,
        source: 'Pearl snare catalog 1996',
        notes: 'Bright, cutting steel snare providing the sharp crack needed to cut through Roots\' dense, down-tuned guitar textures and tribal percussion layers. Ross Robinson\'s production emphasized the snare\'s transient attack.',
        vintageValue2026: 380,
        modernEquivalent: {
          item: 'Pearl Sensitone Elite Steel',
          price: 350,
          link: 'pearl-sensitone-elite',
        },
      },
      cymbals: {
        item: 'Sabian AA Series',
        model: 'Mixed AA configuration',
        specs: '14" AA Hi-Hats, 16" AA Thin Crash, 18" AA Medium Crash, 20" AA Ride, 18" AA China',
        originalPrice: 1100,
        year: 1996,
        source: 'Sabian AA retail pricing 1996',
        notes: 'Sabian AA — a common endorsement choice for Brazilian metal acts in the mid-1990s. The AA Series balanced projection and warmth, well-suited to both studio recording and outdoor festival performances on the Roots world tour.',
        vintageValue2026: 900,
        modernEquivalent: {
          item: 'Sabian AAX Stage Set',
          price: 1500,
          link: 'sabian-aax-stage-set',
        },
      },
      hardware: {
        item: 'Pearl Hardware + DW 5002 Double Pedal',
        model: 'Pearl stands + DW 5002 chain drive',
        specs: 'Chain drive double pedal, hi-hat stand, 4 boom cymbal stands, snare stand',
        originalPrice: 650,
        year: 1996,
        source: 'DW hardware retail 1996, Pearl hardware catalog',
        notes: 'DW 5002 chain drive for the groove-heavy double bass work on Roots. Pearl stands rounded out the rig. Igor\'s tribal-influenced playing on Roots placed as much demand on hi-hat feel as on double bass speed.',
        vintageValue2026: 500,
        modernEquivalent: {
          item: 'DW 5000 TD4 + Pearl hardware',
          price: 700,
          link: 'dw-5000-pearl',
        },
      },
      sticks: {
        item: 'Vic Firth 5A Hickory',
        model: 'American Classic 5A',
        specs: 'Hickory, wood tip, .565" diameter',
        originalPrice: 8,
        year: 1996,
        source: 'Standard retail price',
        notes: 'Standard Vic Firth before a signature model. The 5A weight profile balanced power with the finesse required for the tribal percussion patterns featured throughout Roots.',
        vintageValue2026: null,
        modernEquivalent: {
          item: 'Vic Firth American Classic 5B',
          price: 14,
          link: 'vic-firth-american-classic-5b',
        },
      },
      heads: {
        item: 'Remo Emperor',
        model: 'Double-ply configuration',
        specs: 'Emperor clear toms, coated snare batter, Powerstroke kick',
        originalPrice: 65,
        year: 1996,
        source: 'Remo professional pricing 1996',
        notes: 'Double-ply Emperor for durability and attack. The Powerstroke kick head contributed to the punchy, mid-forward bass drum sound prominent in Ross Robinson\'s Roots production.',
        vintageValue2026: null,
        modernEquivalent: {
          item: 'Remo Emperor ProPack',
          price: 110,
          link: 'remo-emperor-pack',
        },
      },
    },

    totals: {
      originalTotal: 4703,
      inflationAdjusted2026: null, // Calculated dynamically
      vintageTotal2026: 5200,
      modernEquivalentTotal: 6874,
    },

    priceEvolution: [
      { year: 1996, price: 4703, label: 'Original Purchase', event: 'Roots recording and world tour' },
      { year: 1998, price: 4900, label: 'Post-Sepultura', event: 'Igor departs; Roots legacy solidifies' },
      { year: 2004, price: 5600, label: 'Cavalera Conspiracy era', event: 'Brothers reunite, renewing Sepultura catalog interest' },
      { year: 2010, price: 7200, label: 'Roots 15th anniversary', event: 'Full album live performances drive vintage gear demand' },
      { year: 2016, price: 8400, label: 'Roots 20th anniversary', event: 'Landmark reissues; Brazilian metal collector premium' },
      { year: 2021, price: 9100, label: 'Pandemic appreciation', event: 'Vintage Sepultura gear demand spikes globally' },
      { year: 2026, price: 9800, label: 'Current adjusted', event: 'Inflation-adjusted value' },
    ],

    sources: [
      { title: 'Pearl Masters Custom Professional Catalog', year: 1996, type: 'catalog' },
      { title: 'Modern Drummer — Igor Cavalera Interview', year: 1996, type: 'interview' },
      { title: 'Metal Hammer — Sepultura Roots Feature', year: 1996, type: 'interview' },
      { title: 'Reverb Price Guide — Vintage Pearl Masters', year: 2025, type: 'market' },
    ],

    meta: {
      title: 'Igor Cavalera 1996 Sepultura Drum Setup Cost | Roots Era Gear Prices',
      description: "How much did Igor Cavalera's 1996 Roots-era drum kit cost? Original ~$4,703, inflation-adjusted to ~$9,800 today. Pearl Masters Custom breakdown from Sepultura's most iconic album.",
      keywords: ['igor cavalera drum kit history', 'sepultura roots drum cost', 'igor cavalera gear evolution', 'roots era drums price', 'igor cavalera pearl setup'],
    },
  },

  // ==========================================
  // NICKO McBRAIN - 1984 Powerslave Era
  // Pearl DLX Setup
  // ==========================================
  'nicko-mcbrain': {
    slug: 'nicko-mcbrain',
    name: 'Nicko McBrain',
    band: 'Iron Maiden',
    iconicYear: 1984,
    era: 'Powerslave Era',
    albumReference: 'Powerslave (1984)',
    profileImage: '/images/drummers/nicko-mcbrain.webp',

    summary: "Nicko McBrain's association with Pearl Drums is among the longest and most commercially visible endorsement relationships in metal history. When he joined Iron Maiden in 1982, McBrain was already a seasoned professional, having toured extensively with French rock act Trust and later the Steve Hackett Band. His drumming style — built on a foundation of jazz training, powerful right-hand ride work, and a metronomic precision that contrasts with his extroverted stage personality — found its ideal commercial vehicle in Maiden's expanding theatrical set productions.\n\nMcBrain's Powerslave era (1984) represents a pivotal consolidation of his Pearl relationship. The Powerslave world tour, which produced the iconic Live After Death concert film, exposed his setup to stadium-sized audiences across North America, Europe, and Japan. His Pearl DLX kit, configured with an expanded tom setup to accommodate Maiden's complex arrangements, became one of the most photographed drum configurations of the decade. The seven-piece shell pack, paired with Zildjian A Series cymbals and a DW 5000 single pedal, cost approximately $3,891 in 1984 dollars — equivalent to around $12,300 in 2026 inflation-adjusted terms.\n\nWhat distinguishes McBrain's Pearl tenure from contemporaries is its sheer duration. While Lars Ulrich spent time with Ludwig and Joey Jordison cycled through multiple endorsements, McBrain's Pearl relationship has remained essentially unbroken for over forty years. This consistency reflects both Pearl's commitment to its flagship artists and McBrain's methodical approach to kit selection: once he identifies a setup that serves the music, he stays with it.\n\nThe Powerslave setup demonstrates his priorities clearly: a large but not excessive kit, tuned for punchy attack and clarity in arena environments, with a single bass drum and right-hand ride technique that emphasizes groove and dynamics over sheer speed. McBrain has always positioned himself as a drummer who serves the song rather than demonstrating technique for its own sake — a philosophy that has made Maiden's drum sound consistently accessible across an enormous catalog stretching from the New Wave of British Heavy Metal to the present. The 1984 configuration anchors one of metal's most enduring endorsement stories, with a cost arc from $3,891 to $12,300 in inflation-adjusted 2026 terms.",

    setup: {
      drums: {
        item: 'Pearl DLX Series',
        model: '7-piece shell pack',
        specs: '22"x16" kick, 10"x9" rack, 12"x10" rack, 13"x11" rack, 14"x14" floor, 16"x16" floor',
        originalPrice: 2200,
        year: 1984,
        source: 'Pearl DLX professional series MSRP 1984, DrummerWorld archive estimates',
        notes: 'Pearl DLX — Pearl\'s professional-tier offering in the early 1980s, before the Masters and Reference lines. McBrain chose a larger-than-standard tom configuration to accommodate Maiden\'s complex, compositionally demanding arrangements. The kit became one of the most recognisable in NWOBHM.',
        vintageValue2026: 3500,
        modernEquivalent: {
          item: 'Pearl Reference Series',
          price: 6800,
          link: 'pearl-reference-series-drums',
        },
      },
      snare: {
        item: 'Pearl Steel Snare 14"x6.5"',
        model: 'Steel shell snare',
        specs: '14"x6.5" seamless steel shell, 8-lug',
        originalPrice: 220,
        year: 1984,
        source: 'Pearl snare catalog 1984',
        notes: 'Bright, cutting steel snare with strong projection — essential for Maiden\'s dynamic range, from quiet clean passages to full-band fortissimo. McBrain\'s right-hand-led playing required a snare with fast recovery and consistent attack across a wide tuning range.',
        vintageValue2026: 450,
        modernEquivalent: {
          item: 'Pearl Sensitone Elite Steel 14"x6.5"',
          price: 450,
          link: 'pearl-sensitone-elite',
        },
      },
      cymbals: {
        item: 'Zildjian A Series',
        model: 'Large mixed A Series configuration',
        specs: '14" A Hi-Hats, 16" A Thin Crash, 18" A Medium Crash, 20" A Medium Ride, 18" A China',
        originalPrice: 950,
        year: 1984,
        source: 'Zildjian A Series retail pricing 1984, Zildjian catalog',
        notes: 'Zildjian A Series — the dominant professional cymbal choice across all metal sub-genres in 1984. McBrain\'s right-hand ride work on the Zildjian A medium ride is one of the defining cymbal sounds of the NWOBHM era.',
        vintageValue2026: 1100,
        modernEquivalent: {
          item: 'Zildjian A Custom Box Set',
          price: 1500,
          link: 'zildjian-a-custom-series-cymbals',
        },
      },
      hardware: {
        item: 'Pearl Hardware + DW 5000 Single Pedal',
        model: 'Pearl stands + DW 5000 Turbo',
        specs: 'DW 5000 single pedal, hi-hat stand, 5 boom cymbal stands, snare stand',
        originalPrice: 450,
        year: 1984,
        source: 'DW hardware retail 1984, Pearl hardware catalog',
        notes: 'Pearl hardware pack for the extended tom and cymbal configuration. McBrain used a single bass drum with a single pedal — his powerful single-kick technique has been a defining characteristic throughout his career, and he has rarely used double pedal on record.',
        vintageValue2026: 350,
        modernEquivalent: {
          item: 'Pearl hardware pack + DW 5002',
          price: 700,
          link: 'dw-5000-pearl',
        },
      },
      sticks: {
        item: 'Vic Firth 5B Hickory',
        model: 'American Classic 5B',
        specs: 'Hickory, wood tip, .595" diameter',
        originalPrice: 6,
        year: 1984,
        source: 'Standard retail price',
        notes: 'Standard 5B before signature models. The heavier 5B profile suited McBrain\'s powerful, driving right-hand technique on the Zildjian A ride — a defining element of Maiden\'s rhythmic engine in the Powerslave era.',
        vintageValue2026: null,
        modernEquivalent: {
          item: 'Vic Firth American Classic 5B',
          price: 14,
          link: 'vic-firth-american-classic-5b',
        },
      },
      heads: {
        item: 'Remo Ambassador',
        model: 'Clear Ambassador (toms), Powerstroke (kick)',
        specs: 'Clear Ambassador toms, coated snare batter, Powerstroke P3 kick',
        originalPrice: 65,
        year: 1984,
        source: 'Remo professional pricing 1984',
        notes: 'Clear Ambassadors for open, resonant tom tone consistent with Maiden\'s melodic compositional approach. The Powerstroke kick batter gave the bass drum its characteristic focused punch on Powerslave\'s studio recording.',
        vintageValue2026: null,
        modernEquivalent: {
          item: 'Remo Emperor ProPack',
          price: 95,
          link: 'remo-emperor-pack',
        },
      },
    },

    totals: {
      originalTotal: 3891,
      inflationAdjusted2026: null, // Calculated dynamically
      vintageTotal2026: 5400,
      modernEquivalentTotal: 9559,
    },

    priceEvolution: [
      { year: 1984, price: 3891, label: 'Original Purchase', event: 'Powerslave recording and world tour' },
      { year: 1990, price: 4700, label: 'No Prayer for the Dying era', event: 'Maiden\'s sustained commercial peak' },
      { year: 1998, price: 6200, label: 'Virtual XI era', event: 'Classic Maiden catalog drives vintage interest' },
      { year: 2006, price: 8000, label: 'A Matter of Life and Death', event: 'NWOBHM collector resurgence' },
      { year: 2015, price: 10400, label: 'Book of Souls era', event: '40-year Pearl endorsement milestone' },
      { year: 2021, price: 11800, label: 'Legacy appreciation', event: 'Pandemic drives vintage British metal gear demand' },
      { year: 2026, price: 12300, label: 'Current adjusted', event: 'Inflation-adjusted value' },
    ],

    sources: [
      { title: 'Pearl DLX Professional Catalog', year: 1984, type: 'catalog' },
      { title: 'Modern Drummer — Nicko McBrain Interview', year: 1985, type: 'interview' },
      { title: 'Metal Forces — Iron Maiden Gear Rundown', year: 1984, type: 'interview' },
      { title: 'Reverb Price Guide — Vintage Pearl Drums', year: 2025, type: 'market' },
    ],

    meta: {
      title: 'Nicko McBrain 1984 Iron Maiden Drum Setup Cost | Powerslave Era Gear Prices',
      description: "How much did Nicko McBrain's 1984 Powerslave-era drum kit cost? Original ~$3,891, inflation-adjusted to ~$12,300 today. Complete Pearl DLX breakdown from Iron Maiden's most iconic touring era.",
      keywords: ['nicko mcbrain kit history', 'iron maiden drum setup cost', 'nicko mcbrain pearl drums', 'powerslave era drum gear', 'nicko mcbrain gear through the years'],
    },
  },

  // ==========================================
  // MATT GREINER - 2011 Leveler Era
  // Pearl Reference Setup
  // ==========================================
  'matt-greiner': {
    slug: 'matt-greiner',
    name: 'Matt Greiner',
    band: 'August Burns Red',
    iconicYear: 2011,
    era: 'Leveler Era',
    albumReference: 'Leveler (2011)',
    profileImage: '/images/drummers/matt-greiner.webp',

    summary: "Matt Greiner's 2011 Leveler-era configuration represents the technical and financial apex of his documented gear evolution with August Burns Red. When ABR formed in Lancaster, Pennsylvania in 2003, Greiner was playing standard mid-range equipment — the kind of Pearl Export shell pack that serves thousands of aspiring metal drummers. By the time Leveler dropped in 2011, the band had spent three albums building a reputation for rhythmically complex metalcore with frequent odd-time signatures, polyrhythmic passages, and production-studio precision that placed unusual demands on drum equipment quality.\n\nThe Leveler setup centered on a Pearl Reference shell pack — Pearl's flagship acoustic series featuring a multi-ply, multi-species shell construction designed to optimize resonance across all registers. Paired with Meinl Byzance Traditional cymbals (prized for their hand-hammered dark tonality) and a Pearl Demon Drive double pedal, the configuration cost approximately $8,632 in 2011 dollars — equivalent to roughly $12,600 in 2026 after CPI adjustment. This represented a nearly tenfold increase in setup cost from Greiner's early-band days, tracking closely with ABR's trajectory from regional metalcore act to internationally touring headliners.\n\nGreiner's playing style places specific demands on equipment: his technical proficiency includes complex double bass patterns, frequent metric displacement, and dynamic control across a wide range — from delicate hi-hat work on clean passages to explosive blast fills. The Pearl Reference's multi-ply shell design responds well to this variety, offering focused attack on aggressive passages without sacrificing the warmth needed for dynamic contrasts. The Meinl Byzance Traditional series, with its darker, more complex overtone structure compared to brighter cymbal lines, suited the textural depth ABR sought on Leveler's production.\n\nBy the Constellations (2009) and Leveler (2011) era, Greiner had consolidated a full Pearl endorsement covering drums, hardware, and pedals. This endorsement stability allowed him to focus on refining his technique rather than managing gear logistics on demanding world tours — a shift visible in the increased rhythmic precision and compositional ambition that distinguishes Leveler from ABR's earlier catalog. The $8,632 setup that powered Leveler in 2011 now represents a $12,600 investment in 2026 terms, underscoring the rapid appreciation of professional drum equipment across the 2010s and early 2020s.",

    setup: {
      drums: {
        item: 'Pearl Reference',
        model: '5-piece shell pack',
        specs: '22"x18" kick, 10"x8" rack, 12"x9" rack, 16"x16" floor',
        originalPrice: 4800,
        year: 2011,
        source: 'Pearl Reference MSRP 2011, Drummer World archive estimates',
        notes: 'Pearl Reference — Pearl\'s flagship acoustic shell pack with multi-ply, multi-species construction. Greiner\'s endorsement deal placed him on the Reference series for the Leveler sessions, providing the tonal depth required for ABR\'s studio recordings and international festival appearances.',
        vintageValue2026: 5500,
        modernEquivalent: {
          item: 'Pearl Reference Pure',
          price: 5200,
          link: 'pearl-reference-series-drums',
        },
      },
      snare: {
        item: 'Pearl Reference 14"x5"',
        model: 'Maple/Birch Hybrid',
        specs: '14"x5" Reference hybrid shell',
        originalPrice: 500,
        year: 2011,
        source: 'Pearl Reference snare MSRP 2011',
        notes: 'Pearl Reference snare — punchy, articulate response suited to Greiner\'s fast, precise snare work. The 14"x5" depth provided a bright attack without excessive ring, critical for the studio clarity ABR\'s complex arrangements demand.',
        vintageValue2026: 600,
        modernEquivalent: {
          item: 'Pearl Reference Pure Snare 14"x5"',
          price: 550,
          link: 'pearl-reference-series-drums',
        },
      },
      cymbals: {
        item: 'Meinl Byzance Traditional Series',
        model: 'Mixed Byzance Traditional',
        specs: '14" Byzance Traditional Hi-Hats, 16" Byzance Traditional Thin Crash, 18" Byzance Traditional Medium Crash, 20" Byzance Traditional Ride, 18" Byzance Traditional China',
        originalPrice: 1800,
        year: 2011,
        source: 'Meinl Byzance Traditional retail pricing 2011',
        notes: 'Meinl Byzance Traditional — hand-hammered, dark, complex tonal character ideal for ABR\'s layered production style. Greiner\'s Meinl endorsement positioned the Byzance series as the preferred choice for technically sophisticated metalcore drummers. The series commands 2–3× the price of entry-level cymbals.',
        vintageValue2026: 1600,
        modernEquivalent: {
          item: 'Meinl Byzance Dark Box Set',
          price: 1800,
          link: 'meinl-byzance-dark-set',
        },
      },
      hardware: {
        item: 'Pearl Demon Drive Double Pedal + Pearl Hardware',
        model: 'Pearl Demon Drive + Pearl hardware pack',
        specs: 'Cam-driven double pedal, hi-hat stand, 4 boom cymbal stands, snare stand',
        originalPrice: 1400,
        year: 2011,
        source: 'Pearl hardware retail 2011, Pearl Demon Drive MSRP',
        notes: 'Pearl Demon Drive cam-driven double pedal for Greiner\'s complex double bass patterns. Pearl\'s direct-cam drive offered the precise, responsive feel needed for ABR\'s demanding touring schedule. Pearl hardware throughout maintains setup consistency between studio and live environments.',
        vintageValue2026: 1200,
        modernEquivalent: {
          item: 'Pearl Demon Drive + hardware pack',
          price: 1600,
          link: 'pearl-demon-drive-double-pedal',
        },
      },
      sticks: {
        item: 'Vic Firth 5B Hickory',
        model: 'American Classic 5B',
        specs: 'Hickory, wood tip, .595" diameter',
        originalPrice: 12,
        year: 2011,
        source: 'Standard retail price',
        notes: 'Standard 5B before developing a deeper signature relationship. The heavier 5B profile suited ABR\'s aggressive live show while maintaining the control needed for technically complex studio passages.',
        vintageValue2026: null,
        modernEquivalent: {
          item: 'Vic Firth American Classic 5B',
          price: 14,
          link: 'vic-firth-american-classic-5b',
        },
      },
      heads: {
        item: 'Evans EC2 / EMAD',
        model: 'EC2 toms, EMAD kick',
        specs: 'EC2 clear toms, coated snare batter, EMAD2 kick batter',
        originalPrice: 120,
        year: 2011,
        source: 'Evans retail pricing 2011',
        notes: 'Evans EC2 for controlled, focused tom tone. The EMAD2 kick head provides the defined, punchy low-end thump that distinguishes ABR\'s live bass drum sound — important for maintaining clarity at high stage volumes and in dense arena mixes.',
        vintageValue2026: null,
        modernEquivalent: {
          item: 'Evans EC2S + EMAD2',
          price: 150,
          link: 'evans-ec2-emad',
        },
      },
    },

    totals: {
      originalTotal: 8632,
      inflationAdjusted2026: null, // Calculated dynamically
      vintageTotal2026: 9200,
      modernEquivalentTotal: 9314,
    },

    priceEvolution: [
      { year: 2011, price: 8632, label: 'Original Purchase', event: 'Leveler recording and release' },
      { year: 2013, price: 9200, label: 'Back Burner era', event: 'ABR EP; steadily growing fanbase' },
      { year: 2016, price: 9800, label: 'Rescue & Restore era', event: 'ABR headlining major metalcore festivals' },
      { year: 2019, price: 10600, label: 'Messengers anniversary', event: 'Decade-of-Messengers tour drives early ABR interest' },
      { year: 2021, price: 11500, label: 'Pandemic studio investment', event: 'Home recording boom lifts Pearl Reference demand' },
      { year: 2023, price: 12100, label: 'Death Below era', event: 'ABR career peak; Greiner\'s endorsement profile expands' },
      { year: 2026, price: 12600, label: 'Current adjusted', event: 'Inflation-adjusted value' },
    ],

    sources: [
      { title: 'Pearl Reference Professional Catalog', year: 2011, type: 'catalog' },
      { title: 'Modern Drummer — Matt Greiner Interview', year: 2011, type: 'interview' },
      { title: 'Meinl Byzance Artist Profile Archives', year: 2011, type: 'manufacturer' },
      { title: 'Reverb Price Guide — Pearl Reference Series', year: 2025, type: 'market' },
    ],

    meta: {
      title: 'Matt Greiner 2011 August Burns Red Drum Setup Cost | Leveler Era Gear Prices',
      description: "How much did Matt Greiner's 2011 Leveler-era drum kit cost? Original ~$8,632, inflation-adjusted to ~$12,600 today. Complete Pearl Reference + Meinl Byzance breakdown from ABR's breakthrough album.",
      keywords: ['matt greiner drum setup evolution', 'august burns red leveler drum cost', 'matt greiner pearl reference', 'matt greiner gear history', 'abr drummer kit by year'],
    },
  },

  'vinnie-paul': {
    slug: 'vinnie-paul',
    name: 'Vinnie Paul',
    band: 'Pantera',
    iconicYear: 1990,
    era: 'Cowboys from Hell Era',
    albumReference: 'Cowboys from Hell (1990)',
    profileImage: '/images/drummers/vinnie-paul.webp',

    summary: "Vinnie Paul Abbott's 1990 Cowboys from Hell setup — the kit that launched Pantera into the mainstream metal consciousness and defined the groove metal drum sound for the decade. Paul played a Premier drum kit with Zildjian A Series cymbals and a DW double pedal, delivering the thunderous, pocket-locked groove that underpinned Dimebag Darrell's guitar work. The setup cost approximately $2,728 in 1990 dollars — equivalent to about $6,840 in 2026. By Far Beyond Driven (1994), Paul had transitioned to a Pearl Custom Series configuration with expanded hardware. And by the Damage Plan era, he was with DW. Each phase of this gear evolution represents both Paul's growing commercial success and clear inflationary trends in professional drum equipment across the decade. Vinnie Paul's playing has been cited by drummers including Dave Grohl and Chad Smith as a defining influence on power groove drumming — his combination of tight backbeats and explosive fills remains one of the most studied approaches in heavy metal.",

    setup: {
      drums: {
        item: 'Premier Resonator Series',
        model: '5-piece shell pack',
        specs: '22"x16" kick, 12"x10" rack, 13"x11" rack, 16"x16" floor',
        originalPrice: 1400,
        year: 1990,
        source: 'Premier drum catalog MSRP 1990, Modern Drummer archive estimates',
        notes: 'UK-made Premier Resonator — a respected professional-tier kit popular with American metal drummers in the late 1980s and early 1990s. Premier\'s birch shells delivered a warm, punchy attack suited to Pantera\'s groove-heavy approach. Paul ran a single bass drum with a double pedal rather than true double-kick.',
        vintageValue2026: 2000,
        modernEquivalent: {
          item: 'DW Collector\'s Series Maple',
          price: 4800,
          link: 'dw-collectors-maple',
        },
      },
      snare: {
        item: 'Premier Steel Snare 14"x5.5"',
        model: 'Steel shell snare',
        specs: '14"x5.5" steel shell, 10-lug',
        originalPrice: 220,
        year: 1990,
        source: 'Premier catalog 1990',
        notes: "Matching Premier steel snare with a cutting, bright tone. Vinnie Paul's snare sound on Cowboys from Hell is notably dry and punchy — the steel shell, controlled tuning, and coated batter head contributed to the pocket-locked groove sound central to the album's production.",
        vintageValue2026: 350,
        modernEquivalent: {
          item: 'DW Design Series Steel 14"x5.5"',
          price: 450,
          link: 'dw-design-steel-snare',
        },
      },
      cymbals: {
        item: 'Zildjian A Series',
        model: 'Full A Series configuration',
        specs: '14" A Hi-Hats, 16" A Thin Crash, 18" A Medium Crash, 20" A Medium Ride, 18" A China',
        originalPrice: 650,
        year: 1990,
        source: 'Zildjian A Series retail pricing 1990',
        notes: 'Zildjian A Series was the dominant professional cymbal choice across all metal sub-genres in 1990. Paul used a relatively straightforward configuration — no elaborate splash or effect cymbal setup — reflecting his groove-first playing philosophy.',
        vintageValue2026: 800,
        modernEquivalent: {
          item: 'Zildjian A Custom Box Set',
          price: 1500,
          link: 'zildjian-a-custom-series-cymbals',
        },
      },
      hardware: {
        item: 'DW 5002 Double Pedal + Premier Hardware',
        model: 'DW 5002 chain drive + Premier stands',
        specs: 'Chain drive double pedal, hi-hat stand, 4 boom cymbal stands, snare stand',
        originalPrice: 380,
        year: 1990,
        source: 'DW hardware retail 1990, Premier hardware catalog',
        notes: "DW 5002 chain drive double pedal for Paul's hard-hitting double bass work on Cowboys from Hell. Paul's double bass approach on tracks like 'Domination' and 'Primal Concrete Sledge' prioritised power and groove over sheer speed — the 5002's spring tension was well-matched to his style.",
        vintageValue2026: 450,
        modernEquivalent: {
          item: 'DW 9002 Double Pedal + hardware pack',
          price: 900,
          link: 'dw-9002-double-pedal',
        },
      },
      sticks: {
        item: 'Vic Firth 5B Hickory',
        model: 'American Classic 5B',
        specs: 'Hickory, wood tip, .595" diameter',
        originalPrice: 8,
        year: 1990,
        source: 'Standard retail price',
        notes: "Standard Vic Firth 5B before Paul developed a signature model. The 5B's heavier profile suited Pantera's hard-hitting live show — Paul was documented as one of the harder-hitting drummers in groove metal.",
        vintageValue2026: null,
        modernEquivalent: {
          item: 'Vic Firth American Classic 5B',
          price: 14,
          link: 'vic-firth-american-classic-5b',
        },
      },
      heads: {
        item: 'Remo Ambassador / Powerstroke',
        model: 'Clear Ambassador (toms), Powerstroke P3 (kick)',
        specs: 'Clear Ambassador toms, coated snare batter, Powerstroke P3 kick batter',
        originalPrice: 70,
        year: 1990,
        source: 'Remo retail pricing 1990',
        notes: "Remo Ambassador clear for open, punchy tom tone. The Powerstroke P3 kick head gave Cowboys from Hell's bass drum its characteristic focused thump — important for the locked groove between Vinnie's kick and Rex Brown's bass lines.",
        vintageValue2026: null,
        modernEquivalent: {
          item: 'Remo Emperor ProPack',
          price: 110,
          link: 'remo-emperor-pack',
        },
      },
    },

    totals: {
      originalTotal: 2728,
      inflationAdjusted2026: null, // Calculated dynamically
      vintageTotal2026: 3600,
      modernEquivalentTotal: 7774,
    },

    priceEvolution: [
      { year: 1990, price: 2728, label: 'Original Purchase', event: 'Cowboys from Hell recording' },
      { year: 1992, price: 2900, label: 'Vulgar Display era', event: 'Pantera reaches mainstream peak' },
      { year: 1994, price: 3800, label: 'Far Beyond Driven', event: 'Paul upgrades to Pearl Custom' },
      { year: 2000, price: 5200, label: 'Reinventing the Steel', event: 'Pantera final studio album' },
      { year: 2004, price: 5800, label: 'Damage Plan era', event: 'Paul moves to DW' },
      { year: 2018, price: 8500, label: 'Legacy premium', event: 'Vinnie Paul passes away; collector interest spikes' },
      { year: 2026, price: 6840, label: 'Current adjusted', event: 'Inflation-adjusted value' },
    ],

    sources: [
      { title: 'Premier Drums Professional Catalog', year: 1990, type: 'catalog' },
      { title: 'Modern Drummer — Vinnie Paul Interview', year: 1994, type: 'interview' },
      { title: 'Guitar World Gear Rundown — Pantera', year: 1992, type: 'interview' },
      { title: 'Reverb Price Guide — Vintage Premier Drums', year: 2025, type: 'market' },
    ],

    meta: {
      title: 'Vinnie Paul 1990 Pantera Drum Setup Cost | Cowboys from Hell Gear Prices',
      description: "How much did Vinnie Paul's 1990 Cowboys from Hell drum kit cost? Original ~$2,728, inflation-adjusted to ~$6,840 today. Complete Premier drum breakdown with Zildjian A Series pricing.",
      keywords: ['vinnie paul 1990 setup', 'pantera drum kit cost', 'cowboys from hell drums', 'vinnie paul drum kit by album', 'pantera drummer gear history'],
    },
  },

  // ==========================================
  // CHARLIE BENANTE - 1987 Among the Living Era
  // Issue #2238: Gear Price History Batch 11
  // Tama Artstar II + Sabian HH Setup
  // ==========================================
  'charlie-benante': {
    slug: 'charlie-benante',
    name: 'Charlie Benante',
    band: 'Anthrax',
    iconicYear: 1987,
    era: 'Among the Living Era',
    albumReference: 'Among the Living (1987)',
    profileImage: '/images/drummers/charlie-benante.webp',

    summary: "Charlie Benante's 1987 thrash metal setup during Anthrax's commercial breakthrough. Built around a Tama Artstar II shell pack with Sabian HH cymbals, this rig defined the tightly controlled yet explosive thrash sound that placed Anthrax at the forefront of the Big 4. Benante was already noted for his clean technique and speed — skills that translated into a setup prizing clarity and projection over sheer volume. The Artstar II's birch shells delivered the bright, punchy attack that made tracks like 'Indians' and 'I Am the Law' instantly recognisable.",

    setup: {
      drums: {
        item: 'Tama Artstar II',
        model: '7-piece shell pack',
        specs: '22"x18" kick, 8"x8" rack, 10"x9" rack, 12"x10" rack, 14"x14" floor, 16"x16" floor',
        originalPrice: 1400,
        year: 1987,
        source: 'Tama Artstar II professional catalog MSRP 1987, Modern Drummer archive estimates',
        notes: "Tama Artstar II was the top-of-line Tama offering in the mid-1980s, favoured by many thrash players for its punchy birch shells. Benante's endorsement helped cement Tama's thrash credibility alongside Lars Ulrich.",
        vintageValue2026: 2000,
        modernEquivalent: {
          item: 'Tama Starclassic Walnut/Birch',
          price: 3200,
          link: 'tama-starclassic-walnut-birch',
        },
      },
      snare: {
        item: 'Pearl Free-Floating Steel 14"x5"',
        model: 'Free-Floating steel snare',
        specs: '14"x5" steel shell, free-floating strainer',
        originalPrice: 200,
        year: 1987,
        source: 'Pearl catalog pricing 1987, estimated from free-floating series retail',
        notes: 'The free-floating design eliminated snare-basket contact with the shell for a more open, resonant crack — perfect for the crisp backbeat Benante needed in thrash settings.',
        vintageValue2026: 400,
        modernEquivalent: {
          item: 'Pearl Free-Floating Brass 14"x5"',
          price: 550,
          link: 'pearl-free-floating-brass',
        },
      },
      cymbals: {
        item: 'Sabian HH Series',
        model: 'Hand Hammered mixed setup',
        specs: '14" HH Hi-Hats, 16" HH Crash, 18" HH Crash, 20" HH Ride',
        originalPrice: 450,
        year: 1987,
        source: 'Sabian HH series 1987 catalog pricing',
        notes: 'Benante was an early Sabian endorser after the Sabian/Zildjian split in 1981. The hand-hammered B20 bronze delivered complex, trashy overtones suited to the chaotic energy of thrash.',
        vintageValue2026: 700,
        modernEquivalent: {
          item: 'Sabian HHX Evolution Set',
          price: 1100,
          link: 'sabian-hhx-evolution',
        },
      },
      hardware: {
        item: 'Tama Hardware + DW 5000 Double Pedal',
        model: 'Mixed hardware with DW double kick pedal',
        specs: 'Hi-hat stand, 3 boom stands, snare stand, DW 5000 double pedal',
        originalPrice: 350,
        year: 1987,
        source: 'DW 5000 double pedal MSRP 1987, hardware pack estimates',
        notes: "The DW 5000 double pedal was the choice for thrash drummers needing reliable double-kick performance. Benante's double-kick work on 'Among the Living' and 'A.I.R.' was a defining feature of Anthrax's sound.",
        vintageValue2026: 500,
        modernEquivalent: {
          item: 'DW 9000 Hardware Pack + Double Pedal',
          price: 950,
          link: 'dw-9000-hardware',
        },
      },
      sticks: {
        item: 'Vic Firth 5B Hickory',
        model: 'American Classic 5B',
        specs: 'Hickory, wood tip, 16"',
        originalPrice: 8,
        year: 1987,
        source: 'Standard retail price',
        notes: 'Standard 5B sticks suited to thrash aggression — heavier than 5A for more attack without sacrificing speed.',
        vintageValue2026: null,
        modernEquivalent: {
          item: 'Vic Firth 5B American Classic',
          price: 14,
          link: 'vic-firth-5b',
        },
      },
      heads: {
        item: 'Remo Ambassador',
        model: 'Clear Ambassador (toms), Coated Ambassador (snare), Powerstroke P3 (kick)',
        specs: 'Clear ambassador toms, coated snare batter, Powerstroke P3 kick batter',
        originalPrice: 70,
        year: 1987,
        source: 'Remo retail pricing 1987',
        notes: 'Ambassador heads provided the open, punchy attack that thrash required — not too dampened but controlled enough for fast playing at extended tempos.',
        vintageValue2026: null,
        modernEquivalent: {
          item: 'Remo Ambassador Pro Pack',
          price: 100,
          link: 'remo-ambassador-pack',
        },
      },
    },

    totals: {
      originalTotal: 2478,
      inflationAdjusted2026: null, // Calculated dynamically
      vintageTotal2026: 3600,
      modernEquivalentTotal: 5914,
    },

    priceEvolution: [
      { year: 1987, price: 2478, label: 'Original Purchase', event: 'Among the Living recording' },
      { year: 1990, price: 2700, label: 'Persistence of Time era', event: 'Anthrax matures thrash sound' },
      { year: 1994, price: 3200, label: 'Sound of White Noise', event: 'Benante transitions to Pearl' },
      { year: 2000, price: 4500, label: 'Vintage appreciation', event: 'Tama Artstar II gains collector status' },
      { year: 2010, price: 5500, label: 'Collector interest', event: 'Big 4 reunion boosts Anthrax nostalgia' },
      { year: 2020, price: 6500, label: 'Pandemic premium', event: 'Home studio demand for vintage gear' },
      { year: 2026, price: 7147, label: 'Current adjusted', event: 'Inflation-adjusted value' },
    ],

    sources: [
      { title: 'Tama Artstar II Professional Catalog', year: 1987, type: 'catalog' },
      { title: 'Modern Drummer — Charlie Benante Interview', year: 1988, type: 'interview' },
      { title: 'Sabian Artist Profiles — Benante Era', year: 1987, type: 'manufacturer' },
      { title: 'Reverb Price Guide — Vintage Tama Artstar II', year: 2025, type: 'market' },
    ],

    meta: {
      title: "Charlie Benante 1987 Anthrax Drum Setup Cost | Among the Living Era Gear Prices",
      description: "How much did Charlie Benante's 1987 Anthrax drum kit cost? Original ~$2,478, inflation-adjusted to ~$7,147 today. Complete Tama Artstar II breakdown from the Among the Living era.",
      keywords: ['charlie benante drum kit', 'anthrax drummer gear history', 'among the living drums', 'charlie benante 1987 setup', 'anthrax drum kit cost'],
    },
  },

  // ==========================================
  // NICK MENZA - 1990 Rust in Peace Era
  // Issue #2238: Gear Price History Batch 11
  // Tama Swingstar Stripped Thrash Setup
  // ==========================================
  'nick-menza': {
    slug: 'nick-menza',
    name: 'Nick Menza',
    band: 'Megadeth',
    iconicYear: 1990,
    era: 'Rust in Peace Era',
    albumReference: 'Rust in Peace (1990)',
    profileImage: '/images/drummers/nick-menza.webp',

    summary: "Nick Menza's iconic Rust in Peace-era setup — the stripped-down thrash weapon behind Megadeth's technical masterpiece. Built around a Tama Swingstar with Zildjian A cymbals, Menza's minimalist approach proved that raw speed and precision mattered more than gear prestige. The tight, dry drum sound on Rust in Peace is widely cited as a benchmark for thrash drum production. Menza's machine-gun double-kick on 'Holy Wars' and 'Tornado of Souls' showcased what a working drummer's kit could achieve with good engineering.",

    setup: {
      drums: {
        item: 'Tama Swingstar',
        model: '5-piece shell pack',
        specs: '22"x16" kick, 12"x10" rack, 13"x11" rack, 16"x16" floor',
        originalPrice: 900,
        year: 1990,
        source: 'Tama Swingstar retail pricing 1990, Music Trades Magazine archive',
        notes: "The Tama Swingstar was a mid-range kit — not the budget bottom of the line, but a working drummer's practical choice. Its poplar shells gave a tight, punchy tone well-suited to thrash. Menza's choice of an affordable kit over a prestige endorsement reflected the practical sensibility that defined his playing.",
        vintageValue2026: 1200,
        modernEquivalent: {
          item: 'Tama Imperialstar 5-piece',
          price: 800,
          link: 'tama-imperialstar-5piece',
        },
      },
      snare: {
        item: 'Tama Steel Snare 14"x5.5"',
        model: 'Steel shell snare drum',
        specs: '14"x5.5" steel shell, 8-lug',
        originalPrice: 150,
        year: 1990,
        source: 'Tama catalog pricing 1990',
        notes: "A steel snare complemented the poplar toms with additional brightness and crack — essential for cutting through Megadeth's dense guitar arrangements on Rust in Peace.",
        vintageValue2026: 300,
        modernEquivalent: {
          item: "Tama S.L.P. Sonic Steel 14\"x5.5\"",
          price: 400,
          link: 'tama-slp-sonic-steel',
        },
      },
      cymbals: {
        item: 'Zildjian A Series',
        model: 'Mixed A Series setup',
        specs: '14" A Hi-Hats, 16" A Crash, 18" A Crash, 20" A Ride',
        originalPrice: 500,
        year: 1990,
        source: '1990 Zildjian A series catalog pricing',
        notes: "Standard Zildjian A setup — versatile and durable, delivering the balanced attack needed across Rust in Peace's technical passages. Menza's cymbal work on 'Holy Wars' is a clinic in controlled aggression.",
        vintageValue2026: 700,
        modernEquivalent: {
          item: 'Zildjian A Series Cymbal Pack',
          price: 1100,
          link: 'zildjian-a-series-pack',
        },
      },
      hardware: {
        item: 'Mixed Hardware + DW 5000 Double Pedal',
        model: 'Various stands and DW double pedal',
        specs: 'Hi-hat stand, 2 boom stands, snare stand, DW 5000 double pedal',
        originalPrice: 280,
        year: 1990,
        source: 'DW 5000 double pedal MSRP 1990, hardware pack estimates',
        notes: "The DW 5000 double pedal was the standard for thrash drummers in 1990. Menza's bass drum work on Rust in Peace demanded reliability under punishing extended show conditions.",
        vintageValue2026: 500,
        modernEquivalent: {
          item: 'DW 5000 Series Double Pedal + Hardware Pack',
          price: 750,
          link: 'dw-5000-hardware',
        },
      },
      sticks: {
        item: 'Vic Firth 5B Hickory',
        model: 'American Classic 5B',
        specs: 'Hickory, wood tip',
        originalPrice: 8,
        year: 1990,
        source: 'Standard retail price',
        notes: "The 5B was Menza's choice for its balance between speed and attack — heavier than 5A but not as fatiguing as 2B for extended live sets.",
        vintageValue2026: null,
        modernEquivalent: {
          item: 'Vic Firth 5B American Classic',
          price: 14,
          link: 'vic-firth-5b',
        },
      },
      heads: {
        item: 'Remo Ambassador',
        model: 'Clear Ambassador (toms), Powerstroke P3 (kick)',
        specs: 'Clear ambassador toms, coated snare batter, Powerstroke P3 kick batter',
        originalPrice: 60,
        year: 1990,
        source: 'Remo retail pricing 1990',
        notes: 'Clear Ambassador heads on toms for open, articulate thrash playing. The Powerstroke P3 kick batter gave focused low-end punch without excessive sustain.',
        vintageValue2026: null,
        modernEquivalent: {
          item: 'Remo Emperor Pro Pack',
          price: 95,
          link: 'remo-emperor-pack',
        },
      },
    },

    totals: {
      originalTotal: 1898,
      inflationAdjusted2026: null, // Calculated dynamically
      vintageTotal2026: 2700,
      modernEquivalentTotal: 3159,
    },

    priceEvolution: [
      { year: 1990, price: 1898, label: 'Original Purchase', event: 'Rust in Peace recording' },
      { year: 1992, price: 2100, label: 'Countdown era', event: 'Menza upgrades to Tama Artstar' },
      { year: 1994, price: 2400, label: 'Youthanasia era', event: 'Premier Signia endorsement begins' },
      { year: 1999, price: 3000, label: 'Reunion tour', event: 'Classic kit nostalgia grows' },
      { year: 2010, price: 4200, label: 'Collector interest', event: 'Rust in Peace 20th anniversary' },
      { year: 2020, price: 5200, label: 'Pandemic spike', event: 'Home studio demand drives vintage prices' },
      { year: 2026, price: 4757, label: 'Current adjusted', event: 'Inflation-adjusted value' },
    ],

    sources: [
      { title: 'Tama Swingstar Retail Catalog', year: 1990, type: 'catalog' },
      { title: 'Modern Drummer — Nick Menza Feature', year: 1991, type: 'interview' },
      { title: 'Metal Hammer — Megadeth Rust in Peace Gear Profile', year: 1990, type: 'interview' },
      { title: 'Reverb Price Guide — Vintage Tama Swingstar', year: 2025, type: 'market' },
    ],

    meta: {
      title: "Nick Menza 1990 Megadeth Drum Setup Cost | Rust in Peace Era Gear Prices",
      description: "How much did Nick Menza's 1990 Megadeth drum kit cost? Original ~$1,898, inflation-adjusted to ~$4,757 today. Complete Tama Swingstar breakdown from the Rust in Peace era.",
      keywords: ['nick menza drum kit', 'megadeth rust in peace drums', 'nick menza 1990 setup', 'rust in peace drummer gear', 'megadeth drummer drum cost'],
    },
  },

  // ==========================================
  // INFERNO - 2004 Demigod Era (Behemoth)
  // Issue #2238: Gear Price History Batch 11
  // Pearl Reference Custom + Meinl Byzance Setup
  // ==========================================
  // ==========================================
  // CHRIS ADLER - 2004 Ashes of the Wake Era
  // DW Collector's Series Setup
  // ==========================================
  'chris-adler': {
    slug: 'chris-adler',
    name: 'Chris Adler',
    band: 'Lamb of God',
    iconicYear: 2004,
    era: 'Ashes of the Wake Era',
    albumReference: 'Ashes of the Wake (2004)',
    profileImage: '/images/drummers/chris-adler.webp',

    summary: "Chris Adler's 2004 DW Collector's Series setup from Lamb of God's Ashes of the Wake — the album that cemented LoG as leaders of the New Wave of American Heavy Metal. Adler combined a high-end DW custom shell pack with Zildjian A Custom cymbals and DW 9002 double pedals to produce the precise, powerful groove that defined modern American groove metal drumming. The DW Collector's maple shells delivered a focused mid-range punch with fast attack, ideal for the tight polyrhythmic patterns and explosive double-kick runs throughout the album. This setup's blend of premium hardware and pro-grade consistency helped Adler earn a reputation as one of the most technically precise groove metal drummers of his generation.",

    setup: {
      drums: {
        item: "DW Collector's Series Maple",
        model: '6-piece shell pack with double kick',
        specs: '22"x18" kick (×2), 10"x8" rack, 12"x9" rack, 14"x12" floor, 16"x14" floor — custom lacquer finish',
        originalPrice: 4000,
        year: 2004,
        source: "DW Collector's Series MSRP 2004, adjusted for custom configuration",
        notes: "DW Collector's maple shells gave Adler a focused, punchy attack ideal for groove metal's precision riffing. The dual 22\" kicks were essential for the alternating kick patterns throughout Ashes of the Wake.",
        vintageValue2026: 3500,
        modernEquivalent: {
          item: "DW Collector's Series 6-piece",
          price: 5200,
          link: 'dw-collectors-series',
        },
      },
      snare: {
        item: 'DW Collector\'s Series 14"x6.5" Aluminum',
        model: 'Collector\'s aluminum snare',
        specs: '14"x6.5" aluminum shell, True-Pitch tension rods',
        originalPrice: 450,
        year: 2004,
        source: "DW Collector's snare MSRP 2004",
        notes: "The aluminum shell delivered a sharp, bright crack that cut through the dense guitar layers on Ashes of the Wake. Adler's rimshots on tracks like 'Laid to Rest' became a defining sound of mid-2000s metal production.",
        vintageValue2026: 600,
        modernEquivalent: {
          item: 'DW Collector\'s Series Aluminum Snare',
          price: 700,
          link: 'dw-collectors-aluminum-snare',
        },
      },
      cymbals: {
        item: 'Zildjian A Custom Series',
        model: 'Mixed A Custom setup',
        specs: '14" A Custom Hi-Hats, 16" A Custom Crash, 18" A Custom Crash, 20" A Custom Ride',
        originalPrice: 1100,
        year: 2004,
        source: 'Zildjian A Custom MSRP 2004 catalog pricing',
        notes: "Zildjian A Custom cymbals balanced brightness and complexity — their thin, responsive feel suited Adler's fast hi-hat work and explosive crash accents throughout Ashes of the Wake's dynamic range.",
        vintageValue2026: 750,
        modernEquivalent: {
          item: 'Zildjian A Custom Box Set',
          price: 1600,
          link: 'zildjian-a-custom-box',
        },
      },
      hardware: {
        item: 'DW 9000 Series Hardware + DW 9002 Double Pedal',
        model: 'DW 9000 series stands and DW 9002 double pedal',
        specs: 'DW 9002 double pedal, DW 9300 hi-hat stand, 3× DW 9700 boom stands, DW 9300 snare stand',
        originalPrice: 1100,
        year: 2004,
        source: 'DW 9000 series MSRP 2004, DW 9002 MSRP 2004',
        notes: "The DW 9002's turbo-drive cam system gave Adler the fast rebound and consistent stroke needed for the intricate double-kick patterns across Ashes of the Wake. Its legacy as the industry-standard metal double pedal was already established by 2004.",
        vintageValue2026: 1400,
        modernEquivalent: {
          item: 'DW 9002 Double Pedal + 9000 Hardware Pack',
          price: 1800,
          link: 'dw-9002-double-pedal',
        },
      },
      sticks: {
        item: 'ProMark TX5AW Hickory',
        model: 'ProMark 5A American Hickory',
        specs: 'Hickory, wood tip, 5A diameter',
        originalPrice: 8,
        year: 2004,
        source: 'Standard retail price',
        notes: "Adler favoured a lighter 5A stick for speed and finesse, allowing the fast ghost-note work and articulate hi-hat patterns central to Lamb of God's groove-driven rhythms.",
        vintageValue2026: null,
        modernEquivalent: {
          item: 'ProMark TX5AW Classic 5A',
          price: 14,
          link: 'promark-5a-hickory',
        },
      },
      heads: {
        item: 'Evans Drumheads',
        model: 'G2 Clear (toms), EMAD (kick), Genera HD Dry (snare)',
        specs: 'Evans G2 clear tom batters, EMAD kick batter, Genera HD Dry snare batter',
        originalPrice: 140,
        year: 2004,
        source: 'Evans retail pricing 2004',
        notes: "Evans heads were Adler's choice for their consistent response under heavy use. The EMAD's built-in dampening ring focused the kick's attack, tightening the low-end punch integral to Ashes of the Wake's dense production.",
        vintageValue2026: null,
        modernEquivalent: {
          item: 'Evans UV2 Tom Pack + EMAD2',
          price: 180,
          link: 'evans-uv2-pack',
        },
      },
    },

    totals: {
      originalTotal: 6798,
      inflationAdjusted2026: null, // Calculated dynamically
      vintageTotal2026: 6250,
      modernEquivalentTotal: 9494,
    },

    priceEvolution: [
      { year: 2004, price: 6798, label: 'Original Purchase', event: 'Ashes of the Wake recording' },
      { year: 2006, price: 7200, label: 'Sacrament era', event: 'Lamb of God wins Grammy nomination' },
      { year: 2009, price: 7800, label: 'Wrath era', event: 'LoG headlining arena tours' },
      { year: 2012, price: 8400, label: 'Pearl endorsement', event: 'Adler transitions to Pearl Reference Pure' },
      { year: 2015, price: 9000, label: 'VII era', event: 'LoG reaches commercial peak' },
      { year: 2020, price: 10500, label: 'Pandemic premium', event: "Vintage DW Collector's values rise" },
      { year: 2026, price: 11788, label: 'Current adjusted', event: 'Inflation-adjusted value' },
    ],

    sources: [
      { title: "DW Collector's Series Professional Catalog", year: 2004, type: 'catalog' },
      { title: 'Modern Drummer — Chris Adler Ashes of the Wake Feature', year: 2004, type: 'interview' },
      { title: 'Metal Hammer — Lamb of God Drum Rundown', year: 2005, type: 'interview' },
      { title: "Reverb Price Guide — DW Collector's Series Vintage", year: 2025, type: 'market' },
    ],

    meta: {
      title: "Chris Adler 2004 Drum Setup Cost | Ashes of the Wake Era Gear Prices",
      description: "How much did Chris Adler's 2004 Lamb of God drum kit cost? Original ~$6,798, inflation-adjusted to ~$11,788 today. Complete DW Collector's breakdown from the Ashes of the Wake era.",
      keywords: ['chris adler drum kit', 'lamb of god drummer gear', 'ashes of the wake drums', 'chris adler dw setup', 'lamb of god drum kit cost'],
    },
  },

  // ==========================================
  // DANIEL ERLANDSSON - 2001 Wages of Sin Era
  // Pearl Masters Premium Setup
  // ==========================================
  'daniel-erlandsson': {
    slug: 'daniel-erlandsson',
    name: 'Daniel Erlandsson',
    band: 'Arch Enemy',
    iconicYear: 2001,
    era: 'Wages of Sin Era',
    albumReference: 'Wages of Sin (2001)',
    profileImage: '/images/drummers/daniel-erlandsson.webp',

    summary: "Daniel Erlandsson's 2001 Pearl Masters Premium setup from Arch Enemy's Wages of Sin — the album that introduced Angela Gossow as vocalist and elevated Arch Enemy to international melodic death metal prominence. Erlandsson combined Pearl's professional-grade maple shells with Meinl cymbals to produce the precise, powerful foundation beneath Michael Amott's harmony guitar leads. His approach favoured clean attack and dynamic control over sheer brutality, making the Pearl Masters Premium's articulate tone an ideal match for melodic death metal's balance of aggression and melody. The setup established the sonic signature that Erlandsson would develop through Anthems of Rebellion, Doomsday Machine, and beyond.",

    setup: {
      drums: {
        item: 'Pearl Masters Premium',
        model: '6-piece maple shell pack',
        specs: '22"x18" kick, 10"x8" rack, 12"x9" rack, 14"x12" floor, 16"x14" floor — natural finish',
        originalPrice: 2800,
        year: 2001,
        source: 'Pearl Masters Premium catalog MSRP 2001',
        notes: "Pearl Masters Premium maple shells delivered balanced projection across all frequencies — the warm, round fundamental complemented Arch Enemy's dual-guitar harmonic layers while maintaining clarity at melodic death metal tempos.",
        vintageValue2026: 2200,
        modernEquivalent: {
          item: 'Pearl Reference Pure 6-piece',
          price: 5500,
          link: 'pearl-reference-pure',
        },
      },
      snare: {
        item: 'Pearl Free-Floating Steel 14"x5"',
        model: 'Free-Floating steel snare',
        specs: '14"x5" steel shell, free-floating strainer',
        originalPrice: 380,
        year: 2001,
        source: 'Pearl Free-Floating catalog pricing 2001',
        notes: "The free-floating design gave Erlandsson's snare an open, sustaining crack free of shell-contact dampening. The crisp attack cut cleanly through Arch Enemy's layered guitar production without piercing harshness.",
        vintageValue2026: 550,
        modernEquivalent: {
          item: 'Pearl Free-Floating Steel 14"x5"',
          price: 600,
          link: 'pearl-free-floating-steel',
        },
      },
      cymbals: {
        item: 'Meinl Byzance Series',
        model: 'Byzance Traditional mixed setup',
        specs: '14" Byzance Traditional Hi-Hats, 16" Byzance Crash, 18" Byzance Crash, 20" Byzance Ride, 18" Byzance China',
        originalPrice: 1100,
        year: 2001,
        source: 'Meinl Byzance MSRP 2001, estimated from catalog pricing',
        notes: "Meinl Byzance cymbals were a defining element of Erlandsson's tone — their complex, dark B20 bronze character added richness without the clinical brightness of some American alternatives. The traditional hammering gave nuanced overtones that matched Arch Enemy's melodic sensibility.",
        vintageValue2026: 700,
        modernEquivalent: {
          item: 'Meinl Byzance Traditional Cymbal Set',
          price: 1800,
          link: 'meinl-byzance-traditional',
        },
      },
      hardware: {
        item: 'Pearl Eliminator Double Pedal + Pearl Hardware',
        model: 'Pearl Eliminator P-2002B and boom stands',
        specs: 'Pearl Eliminator P-2002B double pedal, hi-hat stand, 3 boom stands, snare stand',
        originalPrice: 800,
        year: 2001,
        source: 'Pearl Eliminator P-2002B MSRP 2001, hardware pack estimates',
        notes: "The Pearl Eliminator's cam adjustment system allowed Erlandsson to dial in a consistent feel between strokes — critical for melodic death metal's blend of blast-beat aggression and mid-tempo groove.",
        vintageValue2026: 1100,
        modernEquivalent: {
          item: 'Pearl Eliminator Redline + Pearl 900 Hardware Pack',
          price: 1400,
          link: 'pearl-eliminator-redline',
        },
      },
      sticks: {
        item: 'Vic Firth 5B Hickory',
        model: 'American Classic 5B',
        specs: 'Hickory, wood tip',
        originalPrice: 8,
        year: 2001,
        source: 'Standard retail price',
        notes: "The 5B weight gave Erlandsson the balance between mass for projection and control for fast single-stroke passages. A standard choice for melodic death metal drummers seeking volume without compromising speed.",
        vintageValue2026: null,
        modernEquivalent: {
          item: 'Vic Firth 5B American Classic',
          price: 14,
          link: 'vic-firth-5b',
        },
      },
      heads: {
        item: 'Remo Ambassador Drumheads',
        model: 'Ambassador Clear (toms), Coated Ambassador (snare), Powerstroke 3 (kick)',
        specs: 'Remo Ambassador clear tom batters, Coated Ambassador snare batter, Powerstroke 3 kick batter',
        originalPrice: 100,
        year: 2001,
        source: 'Remo retail pricing 2001',
        notes: "Remo Ambassadors provided the open, resonant response suited to melodic death metal's mix requirements — enough sustain for tom tom melodic fills without muddying the kick-driven low end on tracks like 'Enemy Within'.",
        vintageValue2026: null,
        modernEquivalent: {
          item: 'Remo Emperor Pro Pack',
          price: 130,
          link: 'remo-emperor-pack',
        },
      },
    },

    totals: {
      originalTotal: 5188,
      inflationAdjusted2026: null, // Calculated dynamically
      vintageTotal2026: 4550,
      modernEquivalentTotal: 9444,
    },

    priceEvolution: [
      { year: 2001, price: 5188, label: 'Original Purchase', event: 'Wages of Sin recording' },
      { year: 2003, price: 5400, label: 'Anthems era', event: 'Arch Enemy expands international touring' },
      { year: 2005, price: 5700, label: 'Doomsday Machine era', event: 'Arch Enemy enters mainstream metal' },
      { year: 2007, price: 6000, label: 'Rise of the Tyrant era', event: 'Arch Enemy reaches commercial peak' },
      { year: 2011, price: 6800, label: 'Reference Pure switch', event: 'Erlandsson transitions to Pearl Reference Pure' },
      { year: 2020, price: 8200, label: 'Pandemic premium', event: 'Vintage Pearl Masters values rise' },
      { year: 2026, price: 9597, label: 'Current adjusted', event: 'Inflation-adjusted value' },
    ],

    sources: [
      { title: 'Pearl Masters Premium Professional Catalog', year: 2001, type: 'catalog' },
      { title: 'Modern Drummer — Daniel Erlandsson Arch Enemy Feature', year: 2003, type: 'interview' },
      { title: 'Metal Hammer — Wages of Sin Drum Setup Rundown', year: 2001, type: 'interview' },
      { title: 'Reverb Price Guide — Pearl Masters Premium Vintage', year: 2025, type: 'market' },
    ],

    meta: {
      title: "Daniel Erlandsson 2001 Drum Setup Cost | Wages of Sin Era Gear Prices",
      description: "How much did Daniel Erlandsson's 2001 Arch Enemy drum kit cost? Original ~$5,188, inflation-adjusted to ~$9,597 today. Complete Pearl Masters Premium breakdown from the Wages of Sin era.",
      keywords: ['daniel erlandsson drum kit', 'arch enemy drummer gear', 'wages of sin drums', 'daniel erlandsson pearl setup', 'arch enemy drum kit cost'],
    },
  },

  // ==========================================
  // RAY LUZIER - 2010 Korn III Era
  // DW Collector's Series Setup
  // ==========================================
  'ray-luzier': {
    slug: 'ray-luzier',
    name: 'Ray Luzier',
    band: 'Korn',
    iconicYear: 2010,
    era: 'Korn III Era',
    albumReference: 'Korn III: Remember Who You Are (2010)',
    profileImage: '/images/drummers/ray-luzier.webp',

    summary: "Ray Luzier's 2010 DW Collector's Series setup from Korn III: Remember Who You Are — his first full studio album as Korn's permanent drummer after replacing Joey Jordison. Luzier combined a high-spec DW custom shell pack with Paiste 2002 cymbals and DW 9002 double pedals to deliver the massive, groove-driven sound Korn demanded. His setup supported a style built on powerful kick patterns, fat snare cracks, and textured ride cymbal work that contrasted with the band's down-tuned, processed guitar layers. Luzier's DW Collector's Series quickly became one of the most recognisable premium kits in mainstream metal, affirming his place among the elite pro-level heavy drummers of his era.",

    setup: {
      drums: {
        item: "DW Collector's Series Maple/Mahogany",
        model: '7-piece shell pack with double kick, custom finish',
        specs: '22"x18" kick (×2), 10"x8" rack, 12"x9" rack, 14"x12" floor, 16"x14" floor — custom Korn livery',
        originalPrice: 5500,
        year: 2010,
        source: "DW Collector's Series MSRP 2010, adjusted for custom finish and configuration",
        notes: "DW Collector's maple/mahogany hybrid shells gave Luzier a deeper, warmer fundamental than pure maple — matching Korn's low-end-heavy production. The custom finish reinforced Korn's visual identity at major festival and arena level.",
        vintageValue2026: 5000,
        modernEquivalent: {
          item: "DW Collector's Series 7-piece",
          price: 6500,
          link: 'dw-collectors-series',
        },
      },
      snare: {
        item: 'DW Collector\'s Series 14"x6.5" Aluminum',
        model: 'Collector\'s aluminum snare',
        specs: '14"x6.5" aluminum shell, True-Pitch tension rods',
        originalPrice: 550,
        year: 2010,
        source: "DW Collector's aluminum snare MSRP 2010",
        notes: "The aluminum shell gave Luzier a sharp, cutting backbeat that punched through Korn's dense low-end mix. The 6.5\" depth added extra body compared to standard-depth models, matching the band's heavy production approach.",
        vintageValue2026: 700,
        modernEquivalent: {
          item: 'DW Collector\'s Series Aluminum Snare',
          price: 750,
          link: 'dw-collectors-aluminum-snare',
        },
      },
      cymbals: {
        item: 'Paiste 2002 Series',
        model: 'Paiste 2002 mixed setup',
        specs: '14" 2002 Sound Edge Hi-Hats, 18" 2002 Crash, 20" 2002 Crash, 22" 2002 Ride, 18" 2002 China',
        originalPrice: 1600,
        year: 2010,
        source: 'Paiste 2002 series MSRP 2010 catalog pricing',
        notes: "Paiste 2002 cymbals brought a powerful, full-frequency voice to Korn's live and studio sound. Their bright, cutting attack and strong sustain supported Luzier's dynamic range — from subdued verses to explosive breakdowns — throughout Korn III.",
        vintageValue2026: 1200,
        modernEquivalent: {
          item: 'Paiste 2002 Cymbal Set',
          price: 2200,
          link: 'paiste-2002-set',
        },
      },
      hardware: {
        item: 'DW 9000 Series Hardware + DW 9002D Double Pedal',
        model: 'DW 9000 series stands and DW 9002D double pedal',
        specs: 'DW 9002D double pedal, DW 9300 hi-hat stand, 3× DW 9700 boom stands, DW 9300 snare stand',
        originalPrice: 1300,
        year: 2010,
        source: 'DW 9000 series MSRP 2010, DW 9002D MSRP 2010',
        notes: "The DW 9002D's direct-drive variant gave Luzier a more linear, immediate response suited to Korn's mid-tempo groove work. The 9000-series hardware provided the rock-solid stability needed for extended stadium and festival sets.",
        vintageValue2026: 1800,
        modernEquivalent: {
          item: 'DW 9002D Double Pedal + 9000 Hardware Pack',
          price: 2200,
          link: 'dw-9002-double-pedal',
        },
      },
      sticks: {
        item: 'Vic Firth 5A Hickory',
        model: 'American Classic 5A',
        specs: 'Hickory, wood tip',
        originalPrice: 10,
        year: 2010,
        source: 'Standard retail price',
        notes: "Luzier's 5A choice balanced attack weight with the speed needed for Korn's rhythmically complex patterns — particularly the syncopated ghost-note work and rapid hi-hat passages throughout Korn III.",
        vintageValue2026: null,
        modernEquivalent: {
          item: 'Vic Firth 5A American Classic',
          price: 14,
          link: 'vic-firth-5a',
        },
      },
      heads: {
        item: 'Evans Drumheads',
        model: 'G2 Clear (toms), EMAD2 (kick), Genera HD Dry (snare)',
        specs: 'Evans G2 clear tom batters, EMAD2 kick batter, Genera HD Dry snare batter',
        originalPrice: 180,
        year: 2010,
        source: 'Evans retail pricing 2010',
        notes: "Evans heads suited Korn's studio production — the EMAD2's built-in dampening ring tightened the kick attack for the processed, punchy low end characteristic of Rick Rubin's production on Korn III.",
        vintageValue2026: null,
        modernEquivalent: {
          item: 'Evans UV2 Tom Pack + EMAD2',
          price: 220,
          link: 'evans-uv2-pack',
        },
      },
    },

    totals: {
      originalTotal: 9140,
      inflationAdjusted2026: null, // Calculated dynamically
      vintageTotal2026: 8700,
      modernEquivalentTotal: 11884,
    },

    priceEvolution: [
      { year: 2010, price: 9140, label: 'Original Purchase', event: 'Korn III: Remember Who You Are recording' },
      { year: 2011, price: 9400, label: 'Path of Totality era', event: 'Korn explores dubstep fusion' },
      { year: 2013, price: 9800, label: 'Paradigm Shift era', event: 'Korn returns to heavier sound' },
      { year: 2016, price: 10500, label: 'Serenity of Suffering era', event: 'Korn headlining major festivals' },
      { year: 2019, price: 11200, label: 'The Nothing era', event: 'Korn continues arena-level touring' },
      { year: 2022, price: 12800, label: 'Post-pandemic premium', event: "Vintage DW Collector's values peak" },
      { year: 2026, price: 13728, label: 'Current adjusted', event: 'Inflation-adjusted value' },
    ],

    sources: [
      { title: "DW Collector's Series Professional Catalog", year: 2010, type: 'catalog' },
      { title: 'Modern Drummer — Ray Luzier Korn Feature', year: 2010, type: 'interview' },
      { title: 'Drum! Magazine — Ray Luzier DW Setup Rundown', year: 2011, type: 'interview' },
      { title: "Reverb Price Guide — DW Collector's Series 2010s", year: 2025, type: 'market' },
    ],

    meta: {
      title: "Ray Luzier 2010 Drum Setup Cost | Korn III Era Gear Prices",
      description: "How much did Ray Luzier's 2010 Korn drum kit cost? Original ~$9,140, inflation-adjusted to ~$13,728 today. Complete DW Collector's breakdown from the Korn III era.",
      keywords: ['ray luzier drum kit', 'korn drummer gear', 'korn iii drums', 'ray luzier dw setup', 'korn drum kit cost'],
    },
  },

  'inferno': {
    slug: 'inferno',
    name: 'Inferno',
    band: 'Behemoth',
    iconicYear: 2004,
    era: 'Demigod Era',
    albumReference: 'Demigod (2004)',
    profileImage: '/images/drummers/inferno.webp',

    summary: "Inferno's extreme black/death metal setup from Behemoth's Demigod era — one of the most technically demanding drum rigs in extreme metal. Built around a Pearl Reference Custom with Meinl Byzance cymbals, this setup supported Inferno's blistering blast-beat work at extreme tempos. The crystal clarity of the Pearl Reference Custom allowed each individual stroke to cut through Behemoth's dense, layered production. Inferno's combination of speed, power, and consistent accuracy across marathon live sets made this kit one of the most respected extreme metal rigs of the 2000s.",

    setup: {
      drums: {
        item: 'Pearl Reference Custom',
        model: '6-piece shell pack',
        specs: '22"x18" kick, 10"x8" rack, 12"x9" rack, 14"x14" floor, 16"x16" floor',
        originalPrice: 3000,
        year: 2004,
        source: 'Pearl Reference Custom catalog MSRP 2004, adjusted for custom configuration',
        notes: "The Pearl Reference Custom featured a multi-wood shell construction optimised for projection at extreme volumes. Its balanced low-end and crisp attack were ideal for Inferno's double-kick blast work on Demigod.",
        vintageValue2026: 3500,
        modernEquivalent: {
          item: 'Pearl Reference Pure 6-piece',
          price: 5500,
          link: 'pearl-reference-pure',
        },
      },
      snare: {
        item: 'Pearl Free-Floating Steel 14"x5.5"',
        model: 'Free-Floating steel snare',
        specs: '14"x5.5" steel shell, free-floating strainer',
        originalPrice: 500,
        year: 2004,
        source: 'Pearl Free-Floating catalog pricing 2004',
        notes: "The free-floating design gave Inferno's snare a wide-open crack with minimal shell contact. Critical for cutting through Behemoth's guitar density on Demigod's extreme metal production.",
        vintageValue2026: 600,
        modernEquivalent: {
          item: 'Pearl Free-Floating Steel 14"x5.5"',
          price: 650,
          link: 'pearl-free-floating-steel',
        },
      },
      cymbals: {
        item: 'Meinl Byzance Series',
        model: 'Traditional and Dark mixed setup',
        specs: '14" Byzance Traditional Hi-Hats, 16" Byzance Dark Crash, 18" Byzance Dark Crash, 20" Byzance Traditional Ride',
        originalPrice: 700,
        year: 2004,
        source: 'Meinl Byzance series MSRP 2004, estimated from catalog pricing',
        notes: 'Meinl Byzance cymbals were chosen for their complex, dark overtones that blend into extreme metal without piercing harshness. The Turkish-hammered B20 bronze gives sustained complexity at blast-beat tempos.',
        vintageValue2026: 800,
        modernEquivalent: {
          item: 'Meinl Byzance Dark Cymbal Set',
          price: 1400,
          link: 'meinl-byzance-dark',
        },
      },
      hardware: {
        item: 'Pearl Eliminator Double Pedal + Pearl Hardware',
        model: 'Pearl Eliminator P2002B and boom stands',
        specs: 'Pearl Eliminator P2002B double pedal, hi-hat stand, 3 boom stands, snare stand',
        originalPrice: 500,
        year: 2004,
        source: 'Pearl Eliminator P2002B MSRP 2004, hardware pack estimates',
        notes: "The Pearl Eliminator double pedal's cam system allowed Inferno to achieve extremely fast, consistent double-kick patterns. Its lightweight feel and adjustable cam made it ideal for extreme metal's extended blast-beat sections.",
        vintageValue2026: 700,
        modernEquivalent: {
          item: 'Pearl Eliminator Redline P2002BL',
          price: 900,
          link: 'pearl-eliminator-redline',
        },
      },
      sticks: {
        item: 'Vic Firth 5B Hickory',
        model: 'American Classic 5B',
        specs: 'Hickory, wood tip',
        originalPrice: 10,
        year: 2004,
        source: 'Standard retail price',
        notes: "The 5B's balance between mass and control was critical for Inferno's extreme tempos — lighter sticks fatigue quickly; heavier sticks sacrifice speed.",
        vintageValue2026: null,
        modernEquivalent: {
          item: 'Vic Firth 5B American Classic',
          price: 14,
          link: 'vic-firth-5b',
        },
      },
      heads: {
        item: 'Evans Drumheads',
        model: 'G2 Clear (toms), EC2 Coated (snare), EMAD2 (kick)',
        specs: 'Evans G2 clear tom batters, EC2 coated snare batter, EMAD2 kick batter',
        originalPrice: 90,
        year: 2004,
        source: 'Evans retail pricing 2004',
        notes: "Evans heads were chosen for their consistent response and durability under extreme playing. The EMAD2 kick batter's built-in dampening ring focused the low-end punch critical for Behemoth's death metal production.",
        vintageValue2026: null,
        modernEquivalent: {
          item: 'Evans Drumhead Performance Pack',
          price: 140,
          link: 'evans-performance-pack',
        },
      },
    },

    totals: {
      originalTotal: 4800,
      inflationAdjusted2026: null, // Calculated dynamically
      vintageTotal2026: 5600,
      modernEquivalentTotal: 8604,
    },

    priceEvolution: [
      { year: 2004, price: 4800, label: 'Original Purchase', event: 'Demigod recording' },
      { year: 2007, price: 5200, label: 'Apostasy era', event: 'Behemoth grows international fanbase' },
      { year: 2009, price: 5500, label: 'Evangelion era', event: 'Behemoth enters mainstream metal' },
      { year: 2012, price: 6200, label: 'Reference Pure switch', event: 'Inferno transitions to Pearl Reference Pure' },
      { year: 2014, price: 6800, label: 'The Satanist era', event: 'Behemoth reaches commercial peak' },
      { year: 2020, price: 7800, label: 'Pandemic premium', event: 'Vintage Pearl Reference Custom values rise' },
      { year: 2026, price: 8329, label: 'Current adjusted', event: 'Inflation-adjusted value' },
    ],

    sources: [
      { title: 'Pearl Reference Custom Professional Catalog', year: 2004, type: 'catalog' },
      { title: 'Modern Drummer — Inferno Behemoth Feature', year: 2007, type: 'interview' },
      { title: 'Metal Hammer — Demigod Drum Setup Rundown', year: 2004, type: 'interview' },
      { title: 'Reverb Price Guide — Pearl Reference Custom', year: 2025, type: 'market' },
    ],

    meta: {
      title: "Inferno 2004 Behemoth Drum Setup Cost | Demigod Era Gear Prices",
      description: "How much did Inferno's 2004 Behemoth drum kit cost? Original ~$4,800, inflation-adjusted to ~$8,329 today. Complete Pearl Reference Custom breakdown from the Demigod era.",
      keywords: ['inferno drum kit', 'behemoth drummer gear', 'demigod drums', 'inferno behemoth 2004 setup', 'behemoth drum kit cost'],
    },
  },

  // ==========================================
  // PAUL MAZURKIEWICZ - 1992 Tomb of the Mutilated Era
  // Pearl Export Setup
  // ==========================================
  'paul-mazurkiewicz': {
    slug: 'paul-mazurkiewicz',
    name: 'Paul Mazurkiewicz',
    band: 'Cannibal Corpse',
    iconicYear: 1992,
    era: 'Tomb of the Mutilated Era',
    albumReference: 'Tomb of the Mutilated (1992)',
    profileImage: '/images/drummers/paul-mazurkiewicz.webp',

    summary: "Paul Mazurkiewicz's 1992 Cannibal Corpse setup — the kit behind Tomb of the Mutilated, one of death metal's most extreme and influential albums. Starting on a budget Pearl Export configuration, Mazurkiewicz developed the punishing, precise blast-beat style that anchored Cannibal Corpse's relentless death metal for over three decades. His stripped-down, function-over-flash approach made him one of death metal's most reliable and identifiable drummers.",

    setup: {
      drums: {
        item: 'Pearl Export Series',
        model: '5-piece shell pack',
        specs: '22"x16" kick, 12"x10" rack, 13"x11" rack, 16"x16" floor — natural finish',
        originalPrice: 900,
        year: 1992,
        source: 'Pearl Export series MSRP 1992, Music Trades retail estimates',
        notes: 'The Pearl Export was the workhorse kit for mid-tier death metal in the early 1990s — affordable, durable, and loud enough to cut through heavily down-tuned guitars. Mazurkiewicz used a compact 5-piece throughout the early Cannibal Corpse era, prioritising function over spectacle.',
        vintageValue2026: 700,
        modernEquivalent: {
          item: 'Pearl Export EXX',
          price: 950,
          link: 'pearl-export-exx',
        },
      },
      snare: {
        item: 'Pearl Steel Free-Floating 14"x5.5"',
        model: 'Steel shell snare',
        specs: '14"x5.5" steel shell, 8-lug strainer',
        originalPrice: 200,
        year: 1992,
        source: 'Pearl steel snare MSRP estimates 1992',
        notes: 'Mazurkiewicz favoured a steel-shell snare for its sharp, penetrating crack that cut through Chris Barnes and later George Fisher vocals and dense, down-tuned guitar layers. The steel shell delivered the clinical, aggressive backbeat that defines the Cannibal Corpse sound.',
        vintageValue2026: 350,
        modernEquivalent: {
          item: 'Pearl Free-Floating Steel 14"x5.5"',
          price: 480,
          link: 'pearl-free-floating-steel',
        },
      },
      cymbals: {
        item: 'Sabian AA Series',
        model: 'Mixed AA configuration',
        specs: '14" AA Hi-Hats, 16" AA Medium Crash, 18" AA Medium Crash, 20" AA Medium Ride',
        originalPrice: 580,
        year: 1992,
        source: 'Sabian AA series catalog pricing 1992',
        notes: 'Sabian AA cymbals were chosen for their bright, cutting attack that projected over Cannibal Corpse\'s wall-of-noise guitar tone. The AA series delivered the sharp crash transients needed for Mazurkiewicz\'s dense, technically demanding patterns — particularly the blast-beat-to-groove transitions on Tomb of the Mutilated.',
        vintageValue2026: 700,
        modernEquivalent: {
          item: 'Sabian AA Performance Set',
          price: 1400,
          link: 'sabian-aa-performance-set',
        },
      },
      hardware: {
        item: 'Pearl Hardware Pack + DW 5000 Single Pedal',
        model: 'Pearl P-900 series stands + DW 5000',
        specs: 'Hi-hat stand, 2 boom stands, snare stand, DW 5000 single pedal',
        originalPrice: 280,
        year: 1992,
        source: 'Pearl hardware estimates 1992, DW 5000 retail pricing',
        notes: 'Mazurkiewicz used a single kick drum in the early Cannibal Corpse era — relying on extreme right-foot speed rather than a double-kick setup. The DW 5000 single pedal was the industry standard for reliable, responsive action.',
        vintageValue2026: 400,
        modernEquivalent: {
          item: 'Pearl H-1050 Hi-Hat + DW 5000 Single Pedal',
          price: 600,
          link: 'dw-5000-single-pedal',
        },
      },
      sticks: {
        item: 'Vic Firth 5A Hickory',
        model: 'American Classic 5A',
        specs: 'Hickory, wood tip',
        originalPrice: 8,
        year: 1992,
        source: 'Standard retail price',
        notes: 'The 5A was the standard workhorse stick for early death metal drummers. Mazurkiewicz later developed his own playing identity around heavier stick choices to sustain extended blast-beat sections.',
        vintageValue2026: null,
        modernEquivalent: {
          item: 'Vic Firth 5A American Classic',
          price: 14,
          link: 'vic-firth-5a',
        },
      },
      heads: {
        item: 'Remo Ambassador',
        model: 'Clear tom batters, coated snare batter',
        specs: 'Remo Ambassador clear (toms), Remo Ambassador coated (snare), Remo Powerstroke kick',
        originalPrice: 60,
        year: 1992,
        source: 'Remo retail pricing 1992',
        notes: 'Standard Remo Ambassador heads — the industry choice for clear tone and durability. The Powerstroke kick head tightened the low-end attack critical for Cannibal Corpse\'s relentless double-time death metal production.',
        vintageValue2026: null,
        modernEquivalent: {
          item: 'Remo Ambassador Tom Pack',
          price: 90,
          link: 'remo-ambassador-pack',
        },
      },
    },

    totals: {
      originalTotal: 2028,
      inflationAdjusted2026: null, // Calculated dynamically
      vintageTotal2026: 2150,
      modernEquivalentTotal: 3534,
    },

    priceEvolution: [
      { year: 1992, price: 2028, label: 'Original Purchase', event: 'Tomb of the Mutilated recording' },
      { year: 1994, price: 2100, label: 'The Bleeding era', event: 'Cannibal Corpse becomes death metal institution' },
      { year: 1998, price: 2350, label: 'Gallery of Suicide era', event: 'George Fisher joins as vocalist' },
      { year: 2006, price: 3200, label: 'Kill era', event: 'Pearl Reference Custom endorsement begins' },
      { year: 2014, price: 4100, label: 'A Skeletal Domain era', event: 'Pearl Masters Maple Complete upgrade' },
      { year: 2020, price: 4700, label: 'Violence Unimagined era', event: 'Pandemic vintage market surge' },
      { year: 2026, price: 4737, label: 'Current adjusted', event: 'Inflation-adjusted value' },
    ],

    sources: [
      { title: 'Pearl Export Series Retail Catalog', year: 1992, type: 'catalog' },
      { title: 'Modern Drummer — Cannibal Corpse Feature', year: 1994, type: 'interview' },
      { title: 'Drummerworld — Paul Mazurkiewicz Gear Profile', year: 2010, type: 'interview' },
      { title: 'Reverb Price Guide — Pearl Export Vintage', year: 2025, type: 'market' },
    ],

    meta: {
      title: "Paul Mazurkiewicz 1992 Drum Setup Cost | Tomb of the Mutilated Gear Prices",
      description: "How much did Paul Mazurkiewicz's 1992 Cannibal Corpse drum kit cost? Original ~$2,028, inflation-adjusted to ~$4,737 today. Complete Pearl Export breakdown from the Tomb of the Mutilated era.",
      keywords: ['paul mazurkiewicz drum kit', 'cannibal corpse drummer gear', 'tomb of the mutilated drums', 'paul mazurkiewicz pearl setup', 'cannibal corpse drum kit cost'],
    },
  },

  // ==========================================
  // FLO MOUNIER - 1996 None So Vile Era
  // Pearl Session Elite Setup
  // ==========================================
  'flo-mounier': {
    slug: 'flo-mounier',
    name: 'Flo Mounier',
    band: 'Cryptopsy',
    iconicYear: 1996,
    era: 'None So Vile Era',
    albumReference: 'None So Vile (1996)',
    profileImage: '/images/drummers/flo-mounier.webp',

    summary: "Flo Mounier's 1996 Cryptopsy setup from None So Vile — widely regarded as the greatest technical death metal album ever recorded and a landmark of extreme drumming. Mounier's Pearl Session Elite configuration delivered the terrifying blast-beat precision, ultra-fast double bass patterns, and limb independence that redefined what was technically achievable in extreme metal. The setup cost approximately $2,984 in 1996, equivalent to over $6,200 inflation-adjusted today.",

    setup: {
      drums: {
        item: 'Pearl Session Elite',
        model: '6-piece shell pack with double kick configuration',
        specs: '22"x18" kick (×2), 10"x9" rack, 12"x10" rack, 14"x14" floor, 16"x16" floor — birch shells',
        originalPrice: 1200,
        year: 1996,
        source: 'Pearl Session Elite MSRP 1996, adjusted for double-kick configuration',
        notes: "Pearl Session Elite's birch shells gave Mounier a focused, punchy tone that cut through Cryptopsy's dense, chaotic guitar layers. The double-kick configuration was essential for his signature hyper-speed double-bass passages — particularly the legendary blast-beat sections on 'Slit Your Guts' and 'Phobophile'.",
        vintageValue2026: 1800,
        modernEquivalent: {
          item: 'Pearl Session Studio Select',
          price: 2100,
          link: 'pearl-session-studio-select',
        },
      },
      snare: {
        item: 'Pearl Free-Floating Steel 14"x6.5"',
        model: 'Free-Floating steel snare',
        specs: '14"x6.5" steel shell, free-floating strainer, 8-lug',
        originalPrice: 400,
        year: 1996,
        source: 'Pearl Free-Floating steel snare MSRP 1996',
        notes: "Mounier's steel snare choice delivered the devastating, surgical crack heard throughout None So Vile. The free-floating lug design maximised shell resonance, producing the bright, cutting attack that pierced through Cryptopsy's layered guitar and bass frequencies at extreme BPMs.",
        vintageValue2026: 600,
        modernEquivalent: {
          item: 'Pearl Free-Floating Steel 14"x6.5"',
          price: 650,
          link: 'pearl-free-floating-steel',
        },
      },
      cymbals: {
        item: 'Zildjian A Series',
        model: 'A Series mixed setup',
        specs: '14" A Hi-Hats, 16" A Medium Crash, 18" A Medium Crash, 20" A Medium Ride, 18" A China',
        originalPrice: 700,
        year: 1996,
        source: 'Zildjian A series catalog pricing 1996',
        notes: "Zildjian A Series cymbals provided the cutting, bright voice needed for Mounier's blast-beat-heavy style. At the extreme tempos on None So Vile — some passages exceeding 250 BPM — the A Series' tight, focused crash response prevented cymbal wash from overwhelming the mix.",
        vintageValue2026: 900,
        modernEquivalent: {
          item: 'Zildjian A Series Cymbal Set',
          price: 1600,
          link: 'zildjian-a-series-set',
        },
      },
      hardware: {
        item: 'DW 5002 Double Pedal + Pearl Hardware',
        model: 'DW 5002 chain drive double pedal + Pearl stands',
        specs: 'DW 5002 chain drive double pedal, Pearl hi-hat stand, 3 boom stands, snare stand',
        originalPrice: 600,
        year: 1996,
        source: 'DW 5002 MSRP 1996, Pearl hardware estimates',
        notes: "The DW 5002's chain drive mechanism gave Mounier the consistent, linear response needed for the hyper-fast double-bass runs that define None So Vile. His double-kick technique is studied by extreme metal drummers worldwide as the benchmark for controlled speed at the limits of human ability.",
        vintageValue2026: 750,
        modernEquivalent: {
          item: 'DW 5002AD4 Double Pedal + Hardware Pack',
          price: 1200,
          link: 'dw-5002-double-pedal',
        },
      },
      sticks: {
        item: 'Vic Firth 5B Hickory',
        model: 'American Classic 5B',
        specs: 'Hickory, wood tip',
        originalPrice: 9,
        year: 1996,
        source: 'Standard retail price',
        notes: "Mounier's 5B choice provided the extra mass needed for sustained blast-beat sections without sacrificing control. The heavier 5B (vs 5A) helped maintain consistent stroke weight across extended extreme-tempo passages.",
        vintageValue2026: null,
        modernEquivalent: {
          item: 'Vic Firth 5B American Classic',
          price: 14,
          link: 'vic-firth-5b',
        },
      },
      heads: {
        item: 'Remo Emperor / Powerstroke',
        model: 'Emperor double-ply (toms), coated (snare), Powerstroke (kick)',
        specs: 'Remo Emperor clear tom batters, Emperor coated snare batter, Powerstroke kick batter',
        originalPrice: 75,
        year: 1996,
        source: 'Remo retail pricing 1996',
        notes: "Remo Emperor double-ply heads on the toms gave Mounier durability and controlled sustain at extreme playing intensities. The Powerstroke kick batter provided focused low-end punch critical for the hyper-fast double-bass clarity on None So Vile.",
        vintageValue2026: null,
        modernEquivalent: {
          item: 'Remo Emperor Tom Pack',
          price: 110,
          link: 'remo-emperor-pack',
        },
      },
    },

    totals: {
      originalTotal: 2984,
      inflationAdjusted2026: null, // Calculated dynamically
      vintageTotal2026: 4050,
      modernEquivalentTotal: 5674,
    },

    priceEvolution: [
      { year: 1996, price: 2984, label: 'Original Purchase', event: 'None So Vile recording' },
      { year: 2000, price: 3400, label: 'And Then You\'ll Beg era', event: 'Cryptopsy lineup changes; Mounier remains constant' },
      { year: 2005, price: 4100, label: 'Sonor SQ2 upgrade', event: 'Mounier transitions to high-end Sonor SQ2 custom kit' },
      { year: 2008, price: 4800, label: 'The Unspoken King era', event: 'Tama Starclassic Bubinga added to arsenal' },
      { year: 2012, price: 5500, label: 'Cryptopsy (self-titled) era', event: 'Return to brutal technical death metal sound' },
      { year: 2020, price: 6000, label: 'Vintage appeal grows', event: 'None So Vile legacy drives Pearl Session Elite collector interest' },
      { year: 2026, price: 6230, label: 'Current adjusted', event: 'Inflation-adjusted value' },
    ],

    sources: [
      { title: 'Pearl Session Elite Professional Catalog', year: 1996, type: 'catalog' },
      { title: 'Modern Drummer — Flo Mounier Cryptopsy Feature', year: 1998, type: 'interview' },
      { title: 'Sick Drummer Magazine — Flo Mounier Gear Interview', year: 2006, type: 'interview' },
      { title: 'Reverb Price Guide — Pearl Session Elite 1990s', year: 2025, type: 'market' },
    ],

    meta: {
      title: "Flo Mounier 1996 Drum Setup Cost | None So Vile Era Gear Prices",
      description: "How much did Flo Mounier's 1996 Cryptopsy drum kit cost? Original ~$2,984, inflation-adjusted to ~$6,230 today. Complete Pearl Session Elite breakdown from the None So Vile era.",
      keywords: ['flo mounier drum kit', 'cryptopsy drummer gear', 'none so vile drums', 'flo mounier pearl setup', 'flo mounier drum setup cost'],
    },
  },

  // ==========================================
  // ELOY CASAGRANDE - 2017 Machine Messiah Era
  // Mapex Meridian Maple Setup (Sepultura)
  // ==========================================
  'eloy-casagrande': {
    slug: 'eloy-casagrande',
    name: 'Eloy Casagrande',
    band: 'Sepultura / Slipknot',
    iconicYear: 2017,
    era: 'Machine Messiah Era',
    albumReference: 'Machine Messiah (2017)',
    profileImage: '/images/drummers/eloy-casagrande.webp',

    summary: "Eloy Casagrande's 2017 Sepultura setup from Machine Messiah — the album that cemented his reputation as one of the most complete heavy metal drummers of his generation. His Mapex Meridian Maple configuration delivered the power, precision, and versatility needed to handle Sepultura's hybrid of thrash, groove metal, and progressive complexity. Casagrande later joined Slipknot in 2023–24, upgrading to a Pearl Reference touring rig for stadium-scale performances.",

    setup: {
      drums: {
        item: 'Mapex Meridian Maple',
        model: '6-piece shell pack with double kick',
        specs: '22"x18" kick (×2), 10"x8" rack, 12"x9" rack, 14"x14" floor, 16"x16" floor — custom finish',
        originalPrice: 1600,
        year: 2017,
        source: 'Mapex Meridian Maple MSRP 2017, catalog pricing',
        notes: "Casagrande's Mapex Meridian Maple delivered the warm, focused tone needed for Sepultura's studio production on Machine Messiah. The maple shell construction gave him a versatile fundamental — wide enough for the album's progressive passages, punchy enough for the thrash-influenced sections.",
        vintageValue2026: 1400,
        modernEquivalent: {
          item: 'Mapex Storm 6-piece',
          price: 1800,
          link: 'mapex-storm-kit',
        },
      },
      snare: {
        item: 'Mapex Black Panther 14"x6.5"',
        model: 'Black Panther steel snare',
        specs: '14"x6.5" steel shell, Black Panther series',
        originalPrice: 380,
        year: 2017,
        source: 'Mapex Black Panther MSRP 2017',
        notes: "The Mapex Black Panther steel snare gave Casagrande a fat, cutting crack that cut through Sepultura's dense guitar mix. The 6.5\" depth delivered the extra body and volume needed for Machine Messiah's heavier sections without over-dampening.",
        vintageValue2026: 350,
        modernEquivalent: {
          item: 'Mapex Black Panther Design Lab Snare',
          price: 500,
          link: 'mapex-black-panther-snare',
        },
      },
      cymbals: {
        item: 'Paiste PST 8 / 2002 Series',
        model: 'Mixed Paiste configuration',
        specs: '14" PST 8 Hi-Hats, 16" 2002 Crash, 18" 2002 Crash, 20" 2002 Ride, 18" 2002 China',
        originalPrice: 1200,
        year: 2017,
        source: 'Paiste PST 8 and 2002 series MSRP 2017',
        notes: "Casagrande's Paiste setup combined the cost-effective PST 8 hi-hats with 2002 series crashes and ride for studio and touring. Paiste 2002 cymbals delivered the powerful, full-frequency voice needed for Sepultura's rhythmically complex and dynamically varied Machine Messiah production.",
        vintageValue2026: 1100,
        modernEquivalent: {
          item: 'Paiste 2002 Cymbal Set',
          price: 2200,
          link: 'paiste-2002-set',
        },
      },
      hardware: {
        item: 'Pearl Eliminator Double Pedal + Mapex Hardware',
        model: 'Pearl P-2002B Eliminator + Mapex TH800 stands',
        specs: 'Pearl P-2002B Eliminator double pedal, Mapex hi-hat stand, 3 boom stands, snare stand',
        originalPrice: 800,
        year: 2017,
        source: 'Pearl Eliminator P-2002B MSRP 2017, Mapex hardware estimates',
        notes: "The Pearl Eliminator double pedal's cam system gave Casagrande the speed and control for Sepultura's rhythmically demanding passages. Its lightweight design minimised fatigue across extended live and studio sessions, while the interchangeable cam options allowed tuning to his personal technique preferences.",
        vintageValue2026: 700,
        modernEquivalent: {
          item: 'Pearl Eliminator Redline P2002BL + Hardware Pack',
          price: 1200,
          link: 'pearl-eliminator-redline',
        },
      },
      sticks: {
        item: 'Vic Firth 5A Hickory',
        model: 'American Classic 5A',
        specs: 'Hickory, wood tip',
        originalPrice: 14,
        year: 2017,
        source: 'Standard retail price',
        notes: "The 5A balanced power and speed for Casagrande's technique — lighter and faster than a 5B but with enough mass to deliver the forceful backbeat Sepultura's groove-metal passages demanded.",
        vintageValue2026: null,
        modernEquivalent: {
          item: 'Vic Firth 5A American Classic',
          price: 16,
          link: 'vic-firth-5a',
        },
      },
      heads: {
        item: 'Evans Drumheads',
        model: 'G2 Clear (toms), EMAD2 (kick), Genera HD Dry (snare)',
        specs: 'Evans G2 clear tom batters, EMAD2 kick batter, Genera HD Dry snare batter',
        originalPrice: 130,
        year: 2017,
        source: 'Evans retail pricing 2017',
        notes: "Evans G2 heads gave Casagrande controlled sustain on toms — expressive enough for Machine Messiah's progressive sections without excessive ring. The EMAD2 kick batter's built-in dampening focused the low-end punch for the album's drop-tuned, heavy production.",
        vintageValue2026: null,
        modernEquivalent: {
          item: 'Evans UV2 Tom Pack + EMAD2',
          price: 180,
          link: 'evans-uv2-pack',
        },
      },
    },

    totals: {
      originalTotal: 4124,
      inflationAdjusted2026: null, // Calculated dynamically
      vintageTotal2026: 3550,
      modernEquivalentTotal: 5896,
    },

    priceEvolution: [
      { year: 2017, price: 4124, label: 'Original Purchase', event: 'Machine Messiah recording' },
      { year: 2019, price: 4500, label: 'Quadra era', event: 'Casagrande continues Sepultura evolution' },
      { year: 2021, price: 5100, label: 'SepulQuarta era', event: 'Sepultura releases live acoustic album' },
      { year: 2023, price: 5400, label: 'Slipknot announcement', event: 'Casagrande named as new Slipknot drummer' },
      { year: 2024, price: 5600, label: 'Pearl Reference era', event: 'Casagrande upgrades to Pearl Reference for Slipknot touring rig' },
      { year: 2025, price: 5750, label: 'Slipknot touring', event: 'Casagrande on international Slipknot tour circuit' },
      { year: 2026, price: 5510, label: 'Current adjusted', event: 'Inflation-adjusted value' },
    ],

    sources: [
      { title: 'Mapex Meridian Maple Professional Catalog', year: 2017, type: 'catalog' },
      { title: 'Modern Drummer — Eloy Casagrande Sepultura Feature', year: 2017, type: 'interview' },
      { title: 'Drum! Magazine — Eloy Casagrande Gear Rundown', year: 2019, type: 'interview' },
      { title: 'Reverb Price Guide — Mapex Meridian Maple 2017', year: 2025, type: 'market' },
    ],

    meta: {
      title: "Eloy Casagrande 2017 Drum Setup Cost | Machine Messiah Era Gear Prices",
      description: "How much did Eloy Casagrande's 2017 Sepultura drum kit cost? Original ~$4,124, inflation-adjusted to ~$5,510 today. Complete Mapex Meridian Maple breakdown from the Machine Messiah era, plus his Slipknot-era Pearl Reference upgrade.",
      keywords: ['eloy casagrande drum kit', 'sepultura drummer gear', 'machine messiah drums', 'eloy casagrande mapex setup', 'slipknot new drummer gear cost'],
    },
  },

  // ==========================================
  // ALEX BENT - 2017 Trivium / The Sin and the Sentence Era
  // Issue #3187: Gear Price History Batch 27
  // Pearl Reference Series + Axis A21 Longboard Setup
  // ==========================================
  'alex-bent': {
    slug: 'alex-bent',
    name: 'Alex Bent',
    band: 'Trivium',
    iconicYear: 2017,
    era: 'The Sin and the Sentence Era',
    albumReference: 'The Sin and the Sentence (2017)',
    profileImage: '/images/drummers/alex-bent.webp',

    summary: "Alex Bent's 2017 arrival behind Trivium's kit on The Sin and the Sentence marked a pivot point for the band — and for technical death metal drummers seeking mainstream relevance. Bent spent nearly a decade in the underground with Arkaik, Brain Drill, and Battlecross, building the extreme speed and precision that made him an Axis Percussion endorser years before signing with a recognizable band name. When producer Mark Lewis recommended him to Trivium following Paul Wandtke's departure, Bent inherited a kit built for arena scale rather than club-circuit death metal: a Pearl Reference Series double-bass configuration in custom matte black, paired with Meinl Byzance Brilliant cymbals and his long-standing Axis A21 Longboard double pedal. The double 22\"x18\" kick drums gave him the acoustic power and trigger-consistency needed for festival-sized PA systems, while a deliberately minimalist tom array — just 10\" and 12\" racks plus 14\" and 16\" floors — kept his blistering fills efficient rather than cluttered. The setup cost approximately $11,310 in 2017 dollars, equivalent to roughly $15,100 in 2026 terms after CPI adjustment. Over four albums — The Sin and the Sentence, What the Dead Men Say, In the Court of the Dragon, and Struck Dead — Bent's rig barely changed in brand, but his profile within it grew enormously: a tech-death journeyman became one of modern metal's most studied double-bass technicians. His October 2025 departure from Trivium closed an eight-year chapter, but the Pearl Reference/Meinl Byzance/Axis combination he established remains the reference setup for drummers chasing his blend of extreme-metal speed and arena-ready power.",

    setup: {
      drums: {
        item: 'Pearl Reference Series',
        model: 'Double-bass 6-piece configuration (Custom Matte Black)',
        specs: '22"x18" kick (×2), 10"x8" rack, 12"x9" rack, 14"x14" floor, 16"x16" floor — maple/birch hybrid shells',
        originalPrice: 6500,
        year: 2017,
        source: 'Pearl Reference Series MSRP 2017; MetalForge album-article gear breakdown ($5,000–$8,000 estimated value)',
        notes: "Bent's double-kick Reference Series configuration was built for translating technical death metal precision to arena-scale power. The maple/birch hybrid shells delivered warmth and sustain for Trivium's melodic passages alongside the cut needed for its heavier sections.",
        vintageValue2026: 6800,
        modernEquivalent: {
          item: 'Pearl Reference Series (current spec)',
          price: 6800,
          link: 'pearl-reference-series-drums',
        },
      },
      snare: {
        item: 'Pearl Reference Snare 14"x6.5"',
        model: 'Maple/Birch Hybrid',
        specs: '14"x6.5" Reference hybrid shell',
        originalPrice: 600,
        year: 2017,
        source: 'Pearl Reference snare catalog 2017',
        notes: "The hybrid maple/birch shell balanced warmth for Trivium's dynamic sections with the attack needed to punch through down-tuned guitars on faster, more aggressive tracks.",
        vintageValue2026: 650,
        modernEquivalent: {
          item: 'Pearl Reference Pure Snare 14"x6.5"',
          price: 650,
          link: 'pearl-reference-series-drums',
        },
      },
      cymbals: {
        item: 'Meinl Byzance Brilliant Series',
        model: 'Full Brilliant configuration',
        specs: '14" Brilliant Medium Hi-Hats, 16"/18"/19" Brilliant Medium Thin Crashes, 21" Brilliant Medium Ride, 18" Brilliant China, 10" Brilliant Splash',
        originalPrice: 3000,
        year: 2017,
        source: 'Meinl Byzance Brilliant series retail pricing 2017',
        notes: "The Byzance Brilliant finish gave Bent's setup extra shimmer and projection, complementing Trivium's polished production while maintaining stick articulation at high tempos inherited from his tech-death background.",
        vintageValue2026: 2800,
        modernEquivalent: {
          item: 'Meinl Byzance Brilliant Box Set',
          price: 3200,
          link: 'meinl-byzance-brilliant-set',
        },
      },
      hardware: {
        item: 'Axis A21 Longboard Double Pedal + Pearl Hardware',
        model: 'Axis A21 direct drive + Pearl H-2050/D-3500BR',
        specs: 'Axis A21 Longboard double pedal, Pearl H-2050 Eliminator hi-hat stand, Pearl D-3500BR Roadster throne',
        originalPrice: 1100,
        year: 2017,
        source: 'Axis Percussion MSRP 2017, Pearl hardware catalog',
        notes: "Bent's Axis endorsement predates Trivium by years — his direct-drive A21 Longboard pedals were already central to his footwork during his Arkaik and Battlecross days, carried over unchanged into the Trivium era.",
        vintageValue2026: 950,
        modernEquivalent: {
          item: 'Axis A21 Longboard + Pearl hardware pack',
          price: 1200,
          link: 'axis-a21-longboard-double-pedal',
        },
      },
      sticks: {
        item: 'Vic Firth 5B Hickory',
        model: 'American Classic 5B',
        specs: 'Hickory, wood tip',
        originalPrice: 10,
        year: 2017,
        source: 'Standard retail price',
        notes: 'A classic 5B for balance of power and speed — unchanged across Bent\'s Trivium tenure.',
        vintageValue2026: null,
        modernEquivalent: {
          item: 'Vic Firth American Classic 5B',
          price: 14,
          link: 'vic-firth-american-classic-5b',
        },
      },
      heads: {
        item: 'Evans Drumheads',
        model: 'EMAD2 (kick), G2 Clear (toms), EC Reverse Dot (snare)',
        specs: 'Evans EMAD2 kick batter, G2 Clear tom batters, EC Reverse Dot snare batter, Hazy 300 resonant',
        originalPrice: 100,
        year: 2017,
        source: 'Evans retail pricing 2017',
        notes: 'Evans heads throughout gave Bent the trigger-friendly consistency needed for extreme-speed passages without sacrificing acoustic character.',
        vintageValue2026: null,
        modernEquivalent: {
          item: 'Evans Pro Pack (EMAD2 + G2 + EC2)',
          price: 130,
          link: 'evans-pro-pack',
        },
      },
    },

    totals: {
      originalTotal: 11310,
      inflationAdjusted2026: null, // Calculated dynamically
      vintageTotal2026: 11200,
      modernEquivalentTotal: 11994,
    },

    priceEvolution: [
      { year: 2017, price: 11310, label: 'Original Purchase', event: 'The Sin and the Sentence recording' },
      { year: 2018, price: 11500, label: 'Touring expansion', event: 'Trivium tours The Sin and the Sentence worldwide' },
      { year: 2020, price: 12000, label: 'What the Dead Men Say era', event: 'Pandemic-delayed album cycle' },
      { year: 2021, price: 12600, label: 'In the Court of the Dragon era', event: 'Trivium expands rhythmic complexity' },
      { year: 2025, price: 14200, label: 'Bent departs Trivium', event: 'October 2025 lineup change after four acclaimed albums' },
      { year: 2026, price: 15100, label: 'Current adjusted', event: 'Inflation-adjusted value' },
    ],

    sources: [
      { title: 'Pearl Reference Series Professional Catalog', year: 2017, type: 'catalog' },
      { title: 'Modern Drummer Magazine — Alex Bent Interview', year: 2019, type: 'interview' },
      { title: 'Meinl Byzance Artist Profile Archives', year: 2018, type: 'manufacturer' },
      { title: 'MetalForge Album Article — Alex Bent Trivium Gear Breakdown', year: 2026, type: 'fan-compiled' },
    ],

    meta: {
      title: "Alex Bent 2017 Trivium Drum Setup Cost | The Sin and the Sentence Gear Prices",
      description: "How much did Alex Bent's 2017 Trivium drum kit cost? Original ~$11,310, inflation-adjusted to ~$15,100 today. Complete Pearl Reference Series breakdown from The Sin and the Sentence era.",
      keywords: ['alex bent drum kit cost', 'trivium drummer gear history', 'alex bent pearl reference setup', 'the sin and the sentence drums', 'alex bent gear today'],
    },
  },

  // ==========================================
  // MATT GARSTKA - 2014 Animals as Leaders / The Joy of Motion Era
  // Issue #3187: Gear Price History Batch 27
  // Pearl Masterworks Maple + Meinl Byzance Setup
  // ==========================================
  'matt-garstka': {
    slug: 'matt-garstka',
    name: 'Matt Garstka',
    band: 'Animals as Leaders',
    iconicYear: 2014,
    era: 'The Joy of Motion Era',
    albumReference: 'The Joy of Motion (2014)',
    profileImage: '/images/drummers/matt-garstka.webp',

    summary: "Matt Garstka's 2014 debut with Animals as Leaders on The Joy of Motion introduced metal audiences to a drummer who approached djent with a jazz-fusion vocabulary. A Berklee College of Music graduate who replaced Navene Koperweis in 2012, Garstka built his AAL-era rig around a compact Pearl Masterworks Maple four-piece — deliberately smaller than the sprawling kits favored by many progressive metal peers, with a 20\"x16\" kick chosen for quick articulation over raw size. His Pearl Reference snare (still pre-signature at this point) and a developing Meinl Byzance cymbal array gave him the dynamic range needed for the ghost-note-heavy, traditional-grip style he brought from his jazz background. A Pearl Demon Drive double pedal anchored the footwork beneath The Joy of Motion's dense polyrhythms. The complete 2014 setup cost approximately $7,949 — equivalent to roughly $11,000 in 2026 after inflation. Within two years, Garstka's profile had grown enough to earn a Pearl Matt Garstka Signature Snare and Vic Firth signature sticks, products that remain in production today and that define his \"peak era\" setup across The Madness of Many (2016) and Parrhesia (2022). What distinguishes Garstka's gear story is how little the underlying philosophy changed even as the products became personalized: smaller drums, dark Byzance cymbals, and a traditional-grip-friendly stick taper, all built around dynamics rather than raw power. The Joy of Motion remains the foundational document of that approach — and the album that first proved jazz sophistication could anchor a progressive metal rhythm section.",

    setup: {
      drums: {
        item: 'Pearl Masterworks Maple',
        model: '4-piece compact configuration',
        specs: '20"x16" kick, 10"x7" rack, 12"x8" rack, 14"x14" floor — maple shells with MasterCast hoops',
        originalPrice: 3800,
        year: 2014,
        source: 'Pearl Masterworks Maple MSRP 2014; MetalForge album-article gear breakdown ($4,000–$6,000 estimated value)',
        notes: "Garstka's smaller-than-typical 20\" bass drum prioritized quick attack and clear articulation over the massive low end common in metal — a deliberate choice reflecting his jazz-influenced, dynamics-first approach to The Joy of Motion's intricate kick patterns.",
        vintageValue2026: 4200,
        modernEquivalent: {
          item: 'Pearl Masterworks Maple (current spec)',
          price: 5000,
          link: 'pearl-masterworks-maple-drums',
        },
      },
      snare: {
        item: 'Pearl Reference Snare 14"x5"',
        model: 'Maple/Birch Hybrid (pre-signature)',
        specs: '14"x5" Reference hybrid shell',
        originalPrice: 350,
        year: 2014,
        source: 'Pearl Reference snare catalog 2014',
        notes: "Before his 2016 signature model, Garstka recorded The Joy of Motion on a standard Pearl Reference snare — already shallow and quick-responding, foreshadowing the sensitivity-first design of the signature drum that followed.",
        vintageValue2026: 400,
        modernEquivalent: {
          item: 'Pearl Matt Garstka Signature Snare',
          price: 450,
          link: 'pearl-matt-garstka-signature-snare',
        },
      },
      cymbals: {
        item: 'Meinl Byzance Series',
        model: 'Early Byzance configuration',
        specs: '15" Dual Hi-Hats, 18" Extra Dry Thin Crash, 19"/20" Dual Crashes, 22" Sand Ride, 18" Vintage Trash Hat China',
        originalPrice: 2800,
        year: 2014,
        source: 'Meinl Byzance series retail pricing 2014',
        notes: "The dark, hand-hammered Byzance line suited Garstka's preference for musical warmth over the brighter, more aggressive cymbals typical of metal — the 22\" Sand Ride's dry articulation became one of his signature sounds on The Joy of Motion.",
        vintageValue2026: 2600,
        modernEquivalent: {
          item: 'Meinl Byzance Full Setup (current spec)',
          price: 4000,
          link: 'meinl-byzance-dual-set',
        },
      },
      hardware: {
        item: 'Pearl Demon Drive Double Pedal + Hardware',
        model: 'Pearl Demon Drive + Roadster stands',
        specs: 'Pearl Demon Drive double pedal, Demon Drive hi-hat stand, Pearl Roadster throne',
        originalPrice: 900,
        year: 2014,
        source: 'Pearl hardware catalog 2014',
        notes: "The Demon Drive's direct-drive mechanism gave Garstka the instant response his intricate kick patterns required — even milliseconds of chain lag would have disrupted The Joy of Motion's polyrhythmic interplay.",
        vintageValue2026: 800,
        modernEquivalent: {
          item: 'Pearl Demon Drive + hardware pack',
          price: 1100,
          link: 'pearl-demon-drive-double-pedal',
        },
      },
      sticks: {
        item: 'Vic Firth 5A Hickory',
        model: 'American Classic 5A (pre-signature)',
        specs: 'Hickory, wood tip',
        originalPrice: 9,
        year: 2014,
        source: 'Standard retail price',
        notes: 'Standard Vic Firth 5A before his 2016 signature stick — already suited to traditional grip and dynamic control.',
        vintageValue2026: null,
        modernEquivalent: {
          item: 'Vic Firth Matt Garstka Signature',
          price: 15,
          link: 'vic-firth-matt-garstka-signature',
        },
      },
      heads: {
        item: 'Remo / Evans Mix',
        model: 'Ambassador Coated (toms/snare), Evans EMAD (kick)',
        specs: 'Remo Ambassador Coated toms, coated snare batter, Evans EMAD kick batter',
        originalPrice: 90,
        year: 2014,
        source: 'Remo and Evans retail pricing 2014',
        notes: 'Medium-weight heads balancing sensitivity for ghost notes with durability for touring.',
        vintageValue2026: null,
        modernEquivalent: {
          item: 'Evans Pro Pack (G2 + G1 + EMAD2)',
          price: 130,
          link: 'evans-pro-pack',
        },
      },
    },

    totals: {
      originalTotal: 7949,
      inflationAdjusted2026: null, // Calculated dynamically
      vintageTotal2026: 8000,
      modernEquivalentTotal: 10695,
    },

    priceEvolution: [
      { year: 2014, price: 7949, label: 'Original Purchase', event: 'The Joy of Motion recording' },
      { year: 2016, price: 8600, label: 'Signature products launch', event: 'Pearl Matt Garstka Signature Snare and Vic Firth signature sticks released' },
      { year: 2019, price: 9400, label: 'Drumeo presence grows', event: 'Garstka becomes one of the most-watched drum educators online' },
      { year: 2022, price: 10200, label: 'Parrhesia era', event: 'AAL returns with its most dynamically ambitious album' },
      { year: 2024, price: 10800, label: 'Touring Parrhesia', event: 'Continued global clinics and touring' },
      { year: 2026, price: 11000, label: 'Current adjusted', event: 'Inflation-adjusted value' },
    ],

    sources: [
      { title: 'Pearl Masterworks Maple Professional Catalog', year: 2014, type: 'catalog' },
      { title: 'Modern Drummer — Matt Garstka Interview', year: 2015, type: 'interview' },
      { title: 'Meinl Byzance Artist Profile Archives', year: 2014, type: 'manufacturer' },
      { title: 'MetalForge Album Article — Matt Garstka Gear Breakdown', year: 2026, type: 'fan-compiled' },
    ],

    meta: {
      title: "Matt Garstka 2014 Animals as Leaders Drum Setup Cost | The Joy of Motion Gear Prices",
      description: "How much did Matt Garstka's 2014 Animals as Leaders drum kit cost? Original ~$7,949, inflation-adjusted to ~$11,000 today. Complete Pearl Masterworks breakdown from The Joy of Motion era.",
      keywords: ['matt garstka drum kit cost', 'animals as leaders drummer gear history', 'matt garstka pearl masterworks setup', 'the joy of motion drums', 'matt garstka gear today'],
    },
  },

  // ==========================================
  // MATT HALPERN - 2016 Periphery / Select Difficulty Era
  // Issue #3187: Gear Price History Batch 27
  // Mapex Saturn + Mapex Black Panther Signature Snare Setup
  // ==========================================
  'matt-halpern': {
    slug: 'matt-halpern',
    name: 'Matt Halpern',
    band: 'Periphery',
    iconicYear: 2016,
    era: 'Select Difficulty Era',
    albumReference: 'Periphery III: Select Difficulty (2016)',
    profileImage: '/images/drummers/matt-halpern.webp',

    summary: "Matt Halpern's 2016 setup behind Periphery III: Select Difficulty captures the moment djent drumming earned formal recognition from the mainstream music industry — the album's \"The Price Is Wrong\" brought Periphery a Grammy nomination for Best Metal Performance, the first for any djent-identified act. By 2016, Halpern's gear story had completed a full arc: the DW Collector's Series and Sabian HHX cymbals that recorded Periphery's 2010 self-titled debut had given way, via the transitional Periphery II (2012) sessions, to a full Mapex Saturn endorsement and a comprehensive Meinl Byzance cymbal setup. The Mapex Saturn's maple/walnut hybrid shells and SONIClear bearing edges delivered the focused attack that producer Jens Bogren's mix demanded, while a Mapex Black Panther Design Lab snare — offered in cherry, brass, maple, and steel shell options — gave Halpern a signature-tier drum that could shift from explosive backbeat authority to whisper-quiet ghost notes within a single measure. DW 9000 double pedals, chosen for their organic chain-drive feel over the more clinical direct-drive alternatives common in extreme metal, anchored hardware that also included Mapex's flagship Falcon hi-hat stand and Saddle throne. The complete 2016 rig cost approximately $10,398, equivalent to roughly $14,200 in 2026 after CPI adjustment. Halpern's gear has since evolved again — into the Mapex Saturn V MH Exotic series that powers Hail Stan (2019) and Aliens (2023) — but Select Difficulty remains the high-water mark where the Mapex/Meinl combination first proved capable of Grammy-caliber recognition, cementing Halpern's status as one of progressive metal's most influential drum-gear tastemakers.",

    setup: {
      drums: {
        item: 'Mapex Saturn Series',
        model: 'Maple/Walnut Hybrid shell pack',
        specs: '22"x18" kick, 10"x7" rack, 12"x8" rack, 14"x14" floor, 16"x16" floor — SONIClear bearing edges',
        originalPrice: 5750,
        year: 2016,
        source: 'Mapex Saturn Series MSRP 2016; MetalForge album-article gear breakdown ($4,500–$7,000 estimated value)',
        notes: "The Saturn's maple-and-walnut hybrid shells gave Halpern punchy low end and focused attack — the tonal palette Jens Bogren's mix needed for Select Difficulty's most direct, compressed Periphery record to that point.",
        vintageValue2026: 6000,
        modernEquivalent: {
          item: 'Mapex Saturn V MH Exotic (current spec)',
          price: 7000,
          link: 'mapex-saturn-v-mh-exotic-drums',
        },
      },
      snare: {
        item: 'Mapex Black Panther Design Lab',
        model: '14"x6" Design Lab (cherry/brass/maple options)',
        specs: '14"x6" Design Lab shell, variable wood/metal shell options',
        originalPrice: 625,
        year: 2016,
        source: 'Mapex Black Panther Design Lab catalog 2016',
        notes: "The Design Lab's variety of shell materials let Halpern match snare character to musical context across Select Difficulty's nine tracks — explosive backbeat authority on \"The Price Is Wrong,\" subtle dynamic shading elsewhere.",
        vintageValue2026: 700,
        modernEquivalent: {
          item: 'Mapex Black Panther Design Lab (current spec)',
          price: 750,
          link: 'mapex-black-panther-design-lab-snare',
        },
      },
      cymbals: {
        item: 'Meinl Byzance Series',
        model: 'Extra Dry / Dual / Traditional / Brilliant mix',
        specs: '14" Byzance Dual Hi-Hats, 18" Byzance Extra Dry Thin Crash, 19" Byzance Dual Crash, 20" Byzance Traditional Medium Crash, 22" Byzance Extra Dry Medium Ride, 18" Byzance Brilliant China',
        originalPrice: 3000,
        year: 2016,
        source: 'Meinl Byzance series retail pricing 2016',
        notes: "By Select Difficulty, Halpern's Byzance setup was the fully realized system that began evolving on Periphery II — the dark, handcrafted B20 bronze voice that became as fundamental to Periphery's sound as Misha Mansoor's guitar tone.",
        vintageValue2026: 2800,
        modernEquivalent: {
          item: 'Meinl Byzance Full Setup (current spec)',
          price: 3500,
          link: 'meinl-byzance-dual-set',
        },
      },
      hardware: {
        item: 'DW 9000 Double Pedal + Mapex Hardware',
        model: 'DW 9000 chain drive + Mapex Falcon/Saddle',
        specs: 'DW 9000 double pedal, Mapex Falcon hi-hat stand, Mapex Saddle throne',
        originalPrice: 900,
        year: 2016,
        source: 'DW hardware retail 2016, Mapex hardware catalog',
        notes: "Halpern valued the DW 9000's organic chain-drive feel over the more clinical direct-drive setups common in extreme metal — a quality that contributes to the groove distinguishing his playing even on the album's most aggressive tracks.",
        vintageValue2026: 800,
        modernEquivalent: {
          item: 'DW 9000 + Mapex Falcon hardware pack',
          price: 1100,
          link: 'dw-9000-mapex-falcon-hardware',
        },
      },
      sticks: {
        item: 'Vic Firth Matt Halpern Signature',
        model: 'Signature taper',
        specs: 'Hickory, established Halpern signature model',
        originalPrice: 13,
        year: 2016,
        source: 'Vic Firth signature retail pricing 2016',
        notes: "Halpern's signature stick was already an established touring and recording choice by Select Difficulty, consistent across all of his Periphery sessions.",
        vintageValue2026: null,
        modernEquivalent: {
          item: 'Vic Firth Matt Halpern Signature',
          price: 15,
          link: 'vic-firth-matt-halpern-signature',
        },
      },
      heads: {
        item: 'Evans Drumheads',
        model: 'EMAD2 (kick), G2 Coated (toms), UV1 (snare)',
        specs: 'Evans EMAD2 kick batter, G2 Coated tom batters, UV1 snare batter, Hazy 300 resonant',
        originalPrice: 110,
        year: 2016,
        source: 'Evans retail pricing 2016',
        notes: "UV1 batter provided focus and durability for the demanding Select Difficulty sessions, while Hazy 300 kept the snare wire sensitivity that gives Halpern's ghost notes their audibility.",
        vintageValue2026: null,
        modernEquivalent: {
          item: 'Evans Pro Pack (EMAD2 + G2 + UV1)',
          price: 140,
          link: 'evans-pro-pack',
        },
      },
    },

    totals: {
      originalTotal: 10398,
      inflationAdjusted2026: null, // Calculated dynamically
      vintageTotal2026: 10300,
      modernEquivalentTotal: 12505,
    },

    priceEvolution: [
      { year: 2016, price: 10398, label: 'Original Purchase', event: 'Periphery III: Select Difficulty recording' },
      { year: 2017, price: 10700, label: 'Grammy nomination', event: "'The Price Is Wrong' earns a Best Metal Performance nomination at the 59th Grammy Awards" },
      { year: 2019, price: 11800, label: 'Hail Stan era', event: 'Halpern upgrades to Mapex Saturn V MH Exotic' },
      { year: 2023, price: 13200, label: 'Aliens era', event: 'Mature Saturn V MH Exotic configuration on Periphery V' },
      { year: 2025, price: 13800, label: 'Continued Mapex/Meinl endorsement', event: "Halpern remains one of djent's most influential gear tastemakers" },
      { year: 2026, price: 14200, label: 'Current adjusted', event: 'Inflation-adjusted value' },
    ],

    sources: [
      { title: 'Mapex Saturn Series Professional Catalog', year: 2016, type: 'catalog' },
      { title: 'Modern Drummer — Matt Halpern Interview', year: 2017, type: 'interview' },
      { title: 'Meinl Byzance Artist Profile Archives', year: 2016, type: 'manufacturer' },
      { title: 'MetalForge Album Article — Periphery III: Select Difficulty Drum Setup', year: 2026, type: 'fan-compiled' },
    ],

    meta: {
      title: "Matt Halpern 2016 Periphery Drum Setup Cost | Select Difficulty Gear Prices",
      description: "How much did Matt Halpern's 2016 Periphery III: Select Difficulty drum kit cost? Original ~$10,398, inflation-adjusted to ~$14,200 today. Complete Mapex Saturn breakdown from the Grammy-nominated era.",
      keywords: ['matt halpern drum kit cost', 'periphery drummer gear history', 'matt halpern mapex saturn setup', 'select difficulty drums', 'matt halpern signature snare'],
    },
  },

  // ==========================================
  // BILL WARD - 1970 Black Sabbath Debut Era
  // Ludwig Super Classic + Paiste Giant Beat Setup
  // Issue #3252
  // ==========================================
  'bill-ward': {
    slug: 'bill-ward',
    name: 'Bill Ward',
    band: 'Black Sabbath',
    iconicYear: 1970,
    era: 'Black Sabbath Debut Era',
    albumReference: 'Black Sabbath (1970)',
    profileImage: '/images/drummers/bill-ward.webp',

    summary: "Bill Ward's 1970 setup behind Black Sabbath's self-titled debut — the album widely credited with inventing heavy metal. Recorded in roughly twelve hours with no click track and no overdubs, the record relied on a modest, professional-grade Ludwig and Paiste rig rather than anything exotic. Ward's jazz-trained background (Gene Krupa, Buddy Rich) shaped how he used that gear: a 3-ply Ludwig Super Classic kit for warm, resonant tone, a bright aluminum-shell Supraphonic snare for cut, and Paiste's oversized Giant Beat cymbals for an open, washy quality that let his swing-influenced fills breathe under Tony Iommi's downtuned riffs. The whole rig cost roughly $906 in 1970 dollars — modest even for the era — and that figure now translates to over $7,600 once adjusted for nearly six decades of inflation, before accounting for the substantial collector premium vintage Ludwig and Paiste gear from this period commands today. Ward carried this foundational setup, with incremental upgrades, through Paranoid (1970) and Master of Reality (1971), the records that codified heavy metal as a genre. The Ludwig Super Classic's three-ply maple construction gave Ward's drums a controlled, articulate low end that distinguished his sound from the looser, more cavernous kits common in late-1960s blues-rock — a tonal choice that proved essential once Iommi's guitar tone got heavier and the drums needed to anchor rather than just accompany.",

    setup: {
      drums: {
        item: 'Ludwig Super Classic',
        model: '3-ply maple shell pack',
        specs: '20" kick, 12"/13" rack toms, 16" floor tom',
        originalPrice: 450,
        year: 1970,
        source: 'Ludwig catalog estimate 1970, vintage drum collector guides',
        notes: 'A standard professional kit of the late 1960s/early 1970s — Ward\'s first major endorsement, chosen for its warm, resonant tone suited to his jazz-derived dynamic range.',
        vintageValue2026: 2500,
        modernEquivalent: {
          item: 'Ludwig Classic Maple',
          price: 1800,
          link: 'ludwig-classic-maple',
        },
      },
      snare: {
        item: 'Ludwig Supraphonic 14"x5" Aluminum',
        model: 'Aluminum shell snare',
        specs: '14"x5" aluminum shell, 8-lug',
        originalPrice: 120,
        year: 1970,
        source: 'Estimated from vintage Ludwig Supraphonic pricing',
        notes: 'The bright, cutting Ludwig snare sound that anchors "Black Sabbath" and "N.I.B." — among the most recognizable snare tones in heavy metal\'s founding era.',
        vintageValue2026: 600,
        modernEquivalent: {
          item: 'Ludwig Supraphonic 14"x6.5" LM402',
          price: 280,
          link: 'ludwig-supraphonic-lm402',
        },
      },
      cymbals: {
        item: 'Paiste Giant Beat',
        model: 'Oversized professional series',
        specs: '15" Hi-Hats, 18" Crash, 20" Crash, 22" Ride',
        originalPrice: 220,
        year: 1970,
        source: '1970 Paiste catalog pricing estimate',
        notes: 'Large-format Paiste cymbals giving Ward\'s kit an open, washy character that supported his jazz-influenced approach to heavy material.',
        vintageValue2026: 900,
        modernEquivalent: {
          item: 'Paiste 2002 Series Set',
          price: 1100,
          link: 'paiste-2002-series-set',
        },
      },
      hardware: {
        item: 'Ludwig Speed King Single Pedal + Basic Stands',
        model: 'Single bass drum pedal, hi-hat and cymbal stands',
        specs: 'Single pedal, hi-hat stand, 2 cymbal stands, snare stand',
        originalPrice: 70,
        year: 1970,
        source: 'Ludwig hardware catalog estimate 1970',
        notes: 'Standard single-pedal setup of the era — Ward\'s heaviness came from feel and dynamics, not double-bass technique.',
        vintageValue2026: 250,
        modernEquivalent: {
          item: 'Ludwig Atlas Pro Double Pedal',
          price: 320,
          link: 'ludwig-atlas-pro-pedal',
        },
      },
      sticks: {
        item: 'Ludwig 2B Hickory',
        model: 'Heavy hickory sticks',
        specs: 'Hickory, wood tip',
        originalPrice: 6,
        year: 1970,
        source: 'Standard retail price 1970',
        notes: 'A heavier stick model that let Ward\'s jazz-trained hands generate real power on the proto-metal material.',
        vintageValue2026: null,
        modernEquivalent: {
          item: 'Vic Firth American Classic 2B',
          price: 14,
          link: 'vic-firth-2b',
        },
      },
      heads: {
        item: 'Remo Ambassador',
        model: 'Single-ply, open and resonant',
        specs: 'Clear toms, coated snare batter',
        originalPrice: 40,
        year: 1970,
        source: 'Remo retail pricing estimate 1970',
        notes: 'Open, resonant heads appropriate to the loose, breathing feel of the debut sessions.',
        vintageValue2026: null,
        modernEquivalent: {
          item: 'Remo Ambassador Pro Pack',
          price: 85,
          link: 'remo-ambassador-pack',
        },
      },
    },

    totals: {
      originalTotal: 906,
      inflationAdjusted2026: null, // Calculated dynamically
      vintageTotal2026: 4250,
      modernEquivalentTotal: 3599,
    },

    priceEvolution: [
      { year: 1970, price: 906, label: 'Original Purchase', event: 'Black Sabbath debut recording' },
      { year: 1975, price: 1500, label: 'Sabotage era', event: 'Progressive ambition, expanded Paiste 2002 cymbals' },
      { year: 1978, price: 1800, label: 'Never Say Die! era', event: 'Final original-lineup studio album' },
      { year: 1990, price: 2800, label: 'Doom revival interest', event: 'Sabbath legacy reassessment grows' },
      { year: 2005, price: 4200, label: 'Vintage Ludwig boom', event: 'Collector market for early-70s Ludwig grows' },
      { year: 2016, price: 6000, label: "Sabbath farewell tour era", event: "The End tour boosts nostalgia value" },
      { year: 2026, price: 7649, label: 'Current adjusted', event: 'Inflation-adjusted value' },
    ],

    sources: [
      { title: 'Ludwig Drum Company Vintage Catalog', year: 1970, type: 'catalog' },
      { title: 'Modern Drummer — Bill Ward Interview', year: 1991, type: 'interview' },
      { title: 'Paiste Cymbals Vintage Archive', year: 1970, type: 'manufacturer' },
      { title: 'Reverb Price Guide — Vintage Ludwig & Paiste', year: 2025, type: 'market' },
    ],

    meta: {
      title: "Bill Ward 1970 Black Sabbath Drum Setup Cost | Vintage Gear Prices",
      description: "How much did Bill Ward's 1970 Black Sabbath drum kit cost? Original ~$906, inflation-adjusted to ~$7,649 today. Complete Ludwig Super Classic and Paiste Giant Beat breakdown from the genre-founding debut era.",
      keywords: ['bill ward 1970 setup', 'black sabbath drum kit cost', 'vintage ludwig price', 'bill ward gear cost today', 'black sabbath debut drums'],
    },
  },

  // ==========================================
  // SHANNON LARKIN - 2002 Godsmack / Faceless Era
  // Tama Starclassic Performer MX Setup
  // Issue #3252
  // ==========================================
  'shannon-larkin': {
    slug: 'shannon-larkin',
    name: 'Shannon Larkin',
    band: 'Godsmack',
    iconicYear: 2002,
    era: 'Faceless Era',
    albumReference: 'Faceless (2003)',
    profileImage: '/images/drummers/shannon-larkin.webp',

    summary: "Shannon Larkin's 2002 setup marked his arrival in Godsmack after more than a decade grinding through Wrathchild America, Souls at Zero, Ugly Kid Joe, and Amen. The Tama Starclassic Performer MX — a maple/birch hybrid shell pack — gave him the punch and warmth needed to anchor one of rock radio's heaviest, most recognizable sounds on Faceless (2003) and IV (2006). Paired with a full Sabian HHX cymbal set, a Tama Iron Cobra double pedal, and his first Vater signature stick model, the original rig cost roughly $8,250 — a serious professional investment for a drummer who had spent years on budget gear in smaller bands. Adjusted for 2026 inflation, that figure is equivalent to approximately $15,000. Larkin's kit evolved steadily across Godsmack's catalog — upgrading to Tama Starclassic Maple for The Oracle (2010) and 1000hp (2014), then to Starclassic Walnut/Birch for When Legends Rise (2018) — before he exited the band in 2024 after a 22-year tenure, the longest of any Godsmack drummer. His verified current setup centers on a ddrum Dios Series kit with Sabian AAX/HHX cymbals, a DW 9000 double pedal, and Vic Firth American Classic 5B sticks — a different chapter from the Tama/Vater rig that defined his Godsmack breakthrough, but one built on the same hard-hitting, groove-first foundation that made him one of hard rock's most dependable drummers for two decades.",

    setup: {
      drums: {
        item: 'Tama Starclassic Performer MX',
        model: 'Maple/birch hybrid 5-piece',
        specs: '22"x18" kick, 10"/12"/14" rack toms, 16" floor tom',
        originalPrice: 4500,
        year: 2002,
        source: 'Tama Starclassic Performer MX catalog MSRP 2002, Modern Drummer archive estimates',
        notes: 'First major Tama endorsement — the maple/birch hybrid gave Larkin the punch and warmth needed for Godsmack\'s arena-filling rock sound.',
        vintageValue2026: 2200,
        modernEquivalent: {
          item: 'ddrum Dios Series',
          price: 2800,
          link: 'ddrum-dios-series',
        },
      },
      snare: {
        item: 'Tama Starclassic Performer MX 14"x6.5"',
        model: 'Maple/birch hybrid shell',
        specs: '14"x6.5" maple/birch hybrid shell',
        originalPrice: 350,
        year: 2002,
        source: 'Tama snare catalog 2002',
        notes: 'The punchy, cutting snare sound heard on Faceless and IV — one of rock radio\'s most recognizable snare tones of the mid-2000s.',
        vintageValue2026: 300,
        modernEquivalent: {
          item: 'ddrum Dios 14"x6.5" Maple',
          price: 420,
          link: 'ddrum-dios-maple-snare',
        },
      },
      cymbals: {
        item: 'Sabian HHX Series',
        model: 'Full HHX configuration',
        specs: '14" HHX Hi-Hats, 16"/18" HHX Crashes, 21" HHX Ride, 18" HHX China',
        originalPrice: 2600,
        year: 2002,
        source: 'Sabian HHX series retail pricing 2002',
        notes: 'Upgraded to Sabian HHX for more complex, musical cymbal tones suited to Godsmack\'s rock/metal hybrid sound — the beginning of Larkin\'s decades-long Sabian relationship.',
        vintageValue2026: 1800,
        modernEquivalent: {
          item: 'Sabian AAX/HHX Mixed Set',
          price: 2200,
          link: 'sabian-aax-hhx-set',
        },
      },
      hardware: {
        item: 'Tama Iron Cobra HP900 Double Pedal',
        model: 'Power Glide cam double pedal + stands',
        specs: 'Double pedal, hi-hat stand, 4 cymbal boom stands, snare stand',
        originalPrice: 700,
        year: 2002,
        source: 'Tama hardware catalog 2002',
        notes: 'Switched to Tama Iron Cobra to match the new kit endorsement — the standard double pedal for hard rock drummers of the era.',
        vintageValue2026: 400,
        modernEquivalent: {
          item: 'DW 9000 Series Double Pedal',
          price: 650,
          link: 'dw-9000-double-pedal',
        },
      },
      sticks: {
        item: 'Vater Shannon Larkin Signature',
        model: 'Custom taper hickory',
        specs: 'Hickory, medium-weight signature taper',
        originalPrice: 10,
        year: 2002,
        source: 'Vater signature retail pricing 2002',
        notes: 'Larkin\'s first signature stick deal, launched around his Godsmack arrival.',
        vintageValue2026: null,
        modernEquivalent: {
          item: 'Vic Firth American Classic 5B',
          price: 14,
          link: 'vic-firth-5b',
        },
      },
      heads: {
        item: 'Evans G2 / EMAD',
        model: 'G2 toms, EMAD kick',
        specs: 'G2 coated tom batters, EMAD kick batter',
        originalPrice: 90,
        year: 2002,
        source: 'Evans retail pricing 2002',
        notes: 'Moved to Evans heads for better studio and live consistency — a relationship Larkin maintained throughout his Godsmack tenure.',
        vintageValue2026: null,
        modernEquivalent: {
          item: 'Evans G2/EMAD2 Pack',
          price: 110,
          link: 'evans-g2-emad2-pack',
        },
      },
    },

    totals: {
      originalTotal: 8250,
      inflationAdjusted2026: null, // Calculated dynamically
      vintageTotal2026: 4700,
      modernEquivalentTotal: 6194,
    },

    priceEvolution: [
      { year: 2002, price: 8250, label: 'Original Purchase', event: 'Joins Godsmack, Faceless recording sessions' },
      { year: 2006, price: 9000, label: 'IV era', event: 'Godsmack IV debuts at #1 on Billboard' },
      { year: 2010, price: 11500, label: 'The Oracle era', event: 'Upgrade to Tama Starclassic Maple' },
      { year: 2018, price: 14000, label: 'When Legends Rise era', event: 'Switch to Tama Starclassic Walnut/Birch' },
      { year: 2024, price: 15500, label: 'Godsmack departure', event: 'Larkin exits Godsmack after a 22-year tenure' },
      { year: 2026, price: 15023, label: 'Current adjusted', event: 'Inflation-adjusted value, ddrum Dios era' },
    ],

    sources: [
      { title: 'Tama Starclassic Performer MX Catalog', year: 2002, type: 'catalog' },
      { title: 'Modern Drummer — Shannon Larkin Interview', year: 2004, type: 'interview' },
      { title: 'Sabian Artist Profile Archives', year: 2003, type: 'manufacturer' },
      { title: 'Reverb Marketplace Analysis — Vintage Tama Starclassic', year: 2025, type: 'market' },
    ],

    meta: {
      title: "Shannon Larkin Drum Setup Cost | Godsmack Gear Price History",
      description: "How much was Shannon Larkin's Godsmack-era drum kit worth? Original Tama Starclassic setup ~$8,250 in 2002, inflation-adjusted to ~$15,000+ today. Complete gear breakdown across his 22-year Godsmack tenure.",
      keywords: ['shannon larkin drum setup cost', 'godsmack drum kit price', 'tama starclassic performer mx price', 'shannon larkin gear cost today', 'ddrum dios series price'],
    },
  },

  // ==========================================
  // JOHN OTTO - 1999 Significant Other Era
  // Sonor Force 3007 / Paiste 2002 Setup
  // Issue #2918: SEO batch — gear price history batch 23
  // ==========================================
  'john-otto': {
    slug: 'john-otto',
    name: 'John Otto',
    band: 'Limp Bizkit',
    iconicYear: 1999,
    era: 'Significant Other Era',
    albumReference: 'Significant Other (1999)',
    profileImage: '/images/drummers/john-otto.webp',

    summary: "John Otto's 1999 setup powered Limp Bizkit's commercial breakthrough, \"Significant Other\" — debuting at #1 on the Billboard 200 and eventually certified 15x Platinum. A Sonor Force 3007 kit with beech shells gave Otto's jazz-and-hip-hop-informed groove the tonal balance to cut through Wes Borland's detuned guitars and DJ Lethal's turntable work, while Paiste 2002 cymbals supplied the bright, projecting attack the dense nu-metal mix demanded. The original rig — kit, snare, cymbals, Pearl P-2002 Eliminator pedal, and Zildjian sticks — cost roughly $4,876 in 1999. Adjusted for 2026 inflation, that's equivalent to approximately $9,590 today. Otto carried the same Sonor/Paiste setup into 2000's \"Chocolate Starfish and the Hot Dog Flavored Water,\" which debuted with the largest first-week sales total in SoundScan history at the time. His gear has since evolved: he later moved through a long Pearl hardware endorsement before settling into his current Orange County Drum and Percussion (OCDP) custom kit with Zildjian cymbals and Gibraltar hardware — a setup that still carries the same groove-first philosophy he brought to Limp Bizkit's biggest records.",

    setup: {
      drums: {
        item: 'Sonor Force 3007',
        model: '5-piece beech shell pack',
        specs: '22"x18" bass drum (single kick), 10"x8"/12"x10" rack toms, 14"x14"/16"x16" floor toms',
        originalPrice: 2400,
        year: 1999,
        source: 'Sonor Force 3007 catalog MSRP 1999, Modern Drummer archive estimates',
        notes: 'Beech shells balanced warmth with attack, suiting Otto\'s dynamic range between ghost notes and full-power backbeats.',
        vintageValue2026: 1300,
        modernEquivalent: {
          item: 'OCDP Custom Maple/Ash Kit',
          price: 2900,
          link: 'ocdp-custom-maple-ash',
        },
      },
      snare: {
        item: 'Sonor Signature Series Steel Snare',
        model: '14"x6.5" steel shell',
        specs: '14"x6.5" steel, medium-high tension',
        originalPrice: 320,
        year: 1999,
        source: 'Sonor snare catalog 1999',
        notes: 'Steel crack cut through the dense nu-metal mix while staying sensitive enough for Otto\'s ghost-note work on tracks like "Nookie."',
        vintageValue2026: 280,
        modernEquivalent: {
          item: 'OCDP 14"x7" Maple/Ash Snare',
          price: 380,
          link: 'ocdp-maple-ash-snare',
        },
      },
      cymbals: {
        item: 'Paiste 2002 Series',
        model: 'Full 2002 configuration',
        specs: '14" Hi-Hats, 16"/18" Crashes, 20" Ride, 18" China, 10" Splash',
        originalPrice: 1700,
        year: 1999,
        source: 'Paiste 2002 series retail pricing 1999',
        notes: 'Bright CuSn8 bronze tone cut through the album\'s dense turntable-and-guitar arrangements.',
        vintageValue2026: 950,
        modernEquivalent: {
          item: 'Zildjian K Custom Series',
          price: 1900,
          link: 'zildjian-k-custom-set',
        },
      },
      hardware: {
        item: 'Pearl P-2002 Eliminator Pedal + Pearl H-1000 Hi-Hat Stand',
        model: 'Single pedal + stands',
        specs: 'Single bass drum pedal, hi-hat stand, 2 cymbal boom stands, Roc-N-Soc throne',
        originalPrice: 380,
        year: 1999,
        source: 'Pearl hardware catalog 1999',
        notes: 'Single-kick setup reflecting Otto\'s hip-hop-informed groove approach rather than the double-kick norm of the era.',
        vintageValue2026: 250,
        modernEquivalent: {
          item: 'Gibraltar 9000 Series Hardware',
          price: 420,
          link: 'gibraltar-9000-hardware',
        },
      },
      sticks: {
        item: 'Zildjian 5A Wood Tip',
        model: 'Hickory, wood tip',
        specs: 'Standard 5A weight',
        originalPrice: 6,
        year: 1999,
        source: 'Standard retail pricing 1999',
        notes: 'Versatile weight for the groove and power demands of nu-metal.',
        vintageValue2026: null,
        modernEquivalent: {
          item: 'Zildjian Artist Series 5A',
          price: 12,
          link: 'zildjian-artist-5a',
        },
      },
      heads: {
        item: 'Remo Powerstroke 3 / Ambassador',
        model: 'PS3 kick, Ambassador toms and snare',
        specs: 'Remo Powerstroke 3 (kick batter/reso), Remo Ambassador Coated (toms/snare)',
        originalPrice: 70,
        year: 1999,
        source: 'Remo retail pricing 1999',
        notes: 'Standard Remo head package for late-90s touring durability and tone consistency.',
        vintageValue2026: null,
        modernEquivalent: {
          item: 'Remo Powerstroke 3 / Ambassador Pack',
          price: 95,
          link: 'remo-powerstroke3-ambassador-pack',
        },
      },
    },

    totals: {
      originalTotal: 4876,
      inflationAdjusted2026: null, // Calculated dynamically
      vintageTotal2026: 2780,
      modernEquivalentTotal: 5707,
    },

    priceEvolution: [
      { year: 1999, price: 4876, label: 'Original Purchase', event: 'Significant Other debuts at #1, eventually 15x Platinum' },
      { year: 2000, price: 5100, label: 'Chocolate Starfish era', event: 'Album sets largest first-week SoundScan total at the time' },
      { year: 2009, price: 6800, label: 'Reunion tour', event: 'Original lineup reunites for world tour' },
      { year: 2021, price: 8700, label: 'Still Sucks era', event: 'First Limp Bizkit album in 10 years' },
      { year: 2026, price: 9588, label: 'Current adjusted', event: 'Inflation-adjusted value, OCDP custom kit era' },
    ],

    sources: [
      { title: 'Sonor Force 3007 Catalog', year: 1999, type: 'catalog' },
      { title: 'Paiste 2002 Series Retail Pricing Archive', year: 1999, type: 'catalog' },
      { title: 'Modern Drummer — John Otto Interview', year: 2004, type: 'interview' },
      { title: 'Reverb Marketplace Analysis — Vintage Sonor Force', year: 2025, type: 'market' },
    ],

    meta: {
      title: "John Otto Drum Setup Cost | Limp Bizkit Gear Price History",
      description: "How much was John Otto's 1999 Limp Bizkit drum kit worth? Original Sonor Force 3007 + Paiste 2002 setup ~$4,876 in 1999, inflation-adjusted to ~$9,590 today. Complete gear breakdown from Significant Other to today.",
      keywords: ['john otto drum setup cost', 'limp bizkit drum kit price', 'sonor force 3007 price', 'john otto gear cost today', 'paiste 2002 cymbals price'],
    },
  },

  // ==========================================
  // DIRK VERBEUREN - 2016 Dystopia Era
  // DW Collector's Maple / Zildjian A Custom Setup
  // Issue #2918: SEO batch — gear price history batch 23
  // ==========================================
  'dirk-verbeuren': {
    slug: 'dirk-verbeuren',
    name: 'Dirk Verbeuren',
    band: 'Megadeth',
    iconicYear: 2016,
    era: 'Dystopia Era',
    albumReference: 'Dystopia (2016)',
    profileImage: '/images/drummers/dirk-verbeuren.webp',

    summary: "Dirk Verbeuren's 2016 setup recorded his Grammy-winning debut with Megadeth, \"Dystopia\" — Best Metal Performance at the 59th Grammy Awards and the band's most successful album in nearly two decades. After 18 years anchoring Swedish melodic death metal act Soilwork, Verbeuren stepped into Dave Mustaine's band on short notice and recorded all of his parts in under two weeks at Vic's Garage. His DW Collector's Series Maple kit delivered the warm, punchy low end Dann Huff's production demanded, paired with Zildjian A Custom cymbals for bright, fast-recovering attack and a DW 9002XF double pedal for high-speed footwork. The original rig cost roughly $10,048 in 2016 — a serious professional investment reflecting DW's handcrafted Oxnard, California construction. Adjusted for 2026 inflation, that's equivalent to approximately $13,716 today. Verbeuren's current verified setup centers on Tama Starclassic Maple with Meinl Byzance cymbals, Tama Speed Cobra 910 pedals, and Vater sticks — a different brand alignment from his Dystopia-era DW/Zildjian rig, but one that continues to deliver the precision and power that earns him praise for honoring Megadeth's legacy while bringing his own flair. The contrast with Nick Menza's classic-era Pearl setup, already documented in this gear price index, captures how dramatically the cost of a top-tier Megadeth drum rig has shifted across the band's history.",

    setup: {
      drums: {
        item: "DW Collector's Series Maple",
        model: 'All-maple shell pack, custom lacquer',
        specs: '22"x18" bass drum, 10"x8"/12"x9" rack toms, 14"x14"/16"x16" floor toms',
        originalPrice: 6750,
        year: 2016,
        source: "DW Collector's Series catalog MSRP 2016, handcrafted Oxnard CA configuration",
        notes: 'All-maple shells delivered the warm fundamental and clear attack Dann Huff\'s production needed to cut through dense Mustaine/Broderick-era riffing.',
        vintageValue2026: 4200,
        modernEquivalent: {
          item: 'Tama Starclassic Maple',
          price: 5800,
          link: 'tama-starclassic-maple',
        },
      },
      snare: {
        item: "DW Collector's Steel Snare",
        model: '14"x6.5" steel shell',
        specs: '14"x6.5" steel, medium-high tension',
        originalPrice: 550,
        year: 2016,
        source: "DW Collector's snare catalog 2016",
        notes: 'Focused, bright attack with tight overtones for cutting cleanly through Dystopia\'s dense guitar arrangements.',
        vintageValue2026: 400,
        modernEquivalent: {
          item: 'Tama S.L.P. G-Maple 14"x6.5"',
          price: 480,
          link: 'tama-slp-g-maple-snare',
        },
      },
      cymbals: {
        item: 'Zildjian A Custom Series',
        model: 'Full A Custom configuration',
        specs: '14" Hi-Hats, 16"/18"/19" Crashes, 20" Ride, 18" China',
        originalPrice: 1900,
        year: 2016,
        source: 'Zildjian A Custom series retail pricing 2016',
        notes: 'Brilliant machine finish gave focused, fast attack matched to Dann Huff\'s precise production capture.',
        vintageValue2026: 1300,
        modernEquivalent: {
          item: 'Meinl Byzance Mixed Set',
          price: 2400,
          link: 'meinl-byzance-mixed-set',
        },
      },
      hardware: {
        item: 'DW 9002XF Double Pedal + DW 9000 Series Stands',
        model: 'Double pedal + hardware pack',
        specs: 'Double bass drum pedal, hi-hat stand, cymbal stands, DW 9120M throne',
        originalPrice: 750,
        year: 2016,
        source: 'DW 9000 Series hardware catalog 2016',
        notes: 'Extended footboard ("XF") and chain drive gave Verbeuren the heel-toe response his high-speed double bass passages required.',
        vintageValue2026: 500,
        modernEquivalent: {
          item: 'Tama Speed Cobra 910 Double Pedal',
          price: 650,
          link: 'tama-speed-cobra-910',
        },
      },
      sticks: {
        item: 'Vic Firth 5B',
        model: 'Hickory',
        specs: 'Standard 5B weight',
        originalPrice: 8,
        year: 2016,
        source: 'Vic Firth retail pricing 2016',
        notes: 'Balance of speed and power suited to thrash playing.',
        vintageValue2026: null,
        modernEquivalent: {
          item: 'Vater Power 5B',
          price: 13,
          link: 'vater-power-5b',
        },
      },
      heads: {
        item: 'Remo Emperor / Powerstroke 3',
        model: 'Emperor Coated snare/toms, PS3 kick',
        specs: 'Remo Powerstroke 3 Clear with Evans EMAD dampening ring (kick), Remo Emperor Clear/Ambassador Clear (toms)',
        originalPrice: 90,
        year: 2016,
        source: 'Remo retail pricing 2016',
        notes: 'Modern head package built for studio consistency and Mustaine-era thrash tempos.',
        vintageValue2026: null,
        modernEquivalent: {
          item: 'Remo Emperor / EMAD2 Pack',
          price: 115,
          link: 'remo-emperor-emad2-pack',
        },
      },
    },

    totals: {
      originalTotal: 10048,
      inflationAdjusted2026: null, // Calculated dynamically
      vintageTotal2026: 6400,
      modernEquivalentTotal: 9458,
    },

    priceEvolution: [
      { year: 2016, price: 10048, label: 'Original Purchase', event: 'Joins Megadeth, records Dystopia at Vic\'s Garage' },
      { year: 2017, price: 10400, label: 'Grammy win', event: 'Dystopia wins Best Metal Performance, 59th Grammy Awards' },
      { year: 2022, price: 12600, label: "The Sick, the Dying... and the Dead! era", event: 'First full studio album written and recorded with Megadeth' },
      { year: 2024, price: 13300, label: 'Crush the World tour', event: 'Ongoing Megadeth touring cycle' },
      { year: 2026, price: 13716, label: 'Current adjusted', event: 'Inflation-adjusted value, Tama Starclassic era' },
    ],

    sources: [
      { title: "DW Collector's Series Catalog", year: 2016, type: 'catalog' },
      { title: 'Zildjian A Custom Series Retail Pricing Archive', year: 2016, type: 'catalog' },
      { title: 'Megadeth Dystopia Album Credits & Grammy Archives', year: 2017, type: 'press' },
      { title: 'Reverb Marketplace Analysis — DW Collector\'s Maple', year: 2025, type: 'market' },
    ],

    meta: {
      title: "Dirk Verbeuren Drum Setup Cost | Megadeth Gear Price History",
      description: "How much was Dirk Verbeuren's Grammy-winning Megadeth drum kit worth? Original DW Collector's Maple + Zildjian A Custom setup ~$10,048 in 2016, inflation-adjusted to ~$13,716 today. Complete Dystopia-era gear breakdown.",
      keywords: ['dirk verbeuren drum setup cost', 'megadeth drum kit price', 'dw collectors maple price', 'dirk verbeuren gear cost today', 'zildjian a custom price'],
    },
  },

  // ==========================================
  // MARTIN AXENROT - 2008 Watershed Era
  // Sonor Designer/SQ2 / Meinl Byzance Setup
  // Issue #2918: SEO batch — gear price history batch 23
  // ==========================================
  'martin-axenrot': {
    slug: 'martin-axenrot',
    name: 'Martin Axenrot',
    band: 'Opeth',
    iconicYear: 2008,
    era: 'Watershed Era',
    albumReference: 'Watershed (2008)',
    profileImage: '/images/drummers/martin-axenrot.webp',

    summary: "Martin Axenrot's 2008 setup recorded his studio debut with Opeth, \"Watershed\" — the album that closed the Martin Lopez era and debuted at #23 on the Billboard 200, the band's highest US chart placement to that point. His Sonor Designer/SQ2 kit, built around twin 22\"x18\" bass drums, was a deliberate departure from Lopez's single-kick rig — a heavier, more aggressive configuration informed by Axenrot's extreme metal background in Bloodbath, Witchery, and Nifelheim. Meinl Byzance cymbals supplied the dark, hand-hammered character that continued Opeth's progressive death metal cymbal vocabulary. The original rig — twin-kick Sonor custom build, Meinl Byzance set, Sonor Giant Step direct-drive pedals, and Vic Firth sticks — cost roughly $13,378 in 2008, reflecting the premium of German custom-shell craftsmanship. Adjusted for 2026 inflation, that's equivalent to approximately $20,356 today. Axenrot has stayed on Sonor and Meinl gear throughout his Opeth tenure, carrying the same twin-kick SQ2 platform through Heritage (2011), Pale Communion (2014), Sorceress (2016), and In Cauda Venenum (2019) — a level of gear consistency that makes the Watershed-era price point a reliable anchor for what a premium, fully custom Sonor SQ2 setup costs versus Martin Lopez's earlier Noble & Cooley/Zildjian rig.",

    setup: {
      drums: {
        item: 'Sonor Designer / SQ2 Series',
        model: 'Twin-kick custom configuration, European maple shells',
        specs: '22"x18" Bass Drum x2, 10"x8"/12"x9" rack toms, 14"x14"/16"x16" floor toms',
        originalPrice: 9500,
        year: 2008,
        source: 'Sonor SQ2 custom-build pricing 2008, Designer Series catalog MSRP',
        notes: 'Twin 22" bass drums signaled the drum chair had changed hands — a heavier, more aggressive setup than Lopez\'s single-kick rig.',
        vintageValue2026: 7200,
        modernEquivalent: {
          item: 'Sonor SQ2 Heavy Beech Custom',
          price: 10500,
          link: 'sonor-sq2-heavy-beech',
        },
      },
      snare: {
        item: 'Sonor Designer Maple Snare',
        model: '14"x5.75" European maple shell',
        specs: '14"x5.75" maple, medium tension',
        originalPrice: 700,
        year: 2008,
        source: 'Sonor Designer Series snare catalog 2008',
        notes: 'Warm fundamental with enough body to anchor heavy backbeats while rendering ghost-note vocabulary inherited from Lopez.',
        vintageValue2026: 550,
        modernEquivalent: {
          item: 'Sonor SQ2 14"x5.75" Maple',
          price: 780,
          link: 'sonor-sq2-maple-snare',
        },
      },
      cymbals: {
        item: 'Meinl Byzance Series',
        model: 'Traditional/Dark/Brilliant mixed configuration',
        specs: '14" Hi-Hats, 16"/18"/19" Crashes, 22" Ride, 18" China',
        originalPrice: 2600,
        year: 2008,
        source: 'Meinl Byzance series retail pricing 2008',
        notes: 'Hand-hammered Turkish-style cymbals delivered the dark, complex character Opeth\'s progressive death metal vocabulary required.',
        vintageValue2026: 1900,
        modernEquivalent: {
          item: 'Meinl Byzance Mixed Set (current)',
          price: 2900,
          link: 'meinl-byzance-mixed-set-current',
        },
      },
      hardware: {
        item: 'Sonor Giant Step Twin Pedals + Sonor 600 Series Hi-Hat Stand',
        model: 'Direct-drive twin pedals + hardware pack',
        specs: 'Twin direct-drive bass drum pedals, hi-hat stand, Roc-N-Soc Nitro throne',
        originalPrice: 500,
        year: 2008,
        source: 'Sonor hardware catalog 2008',
        notes: 'Direct-drive twin pedals gave faster response and more precise articulation than chain-drive for sustained double-bass passages.',
        vintageValue2026: 380,
        modernEquivalent: {
          item: 'Sonor Giant Step Direct Drive (current)',
          price: 560,
          link: 'sonor-giant-step-current',
        },
      },
      sticks: {
        item: 'Vic Firth American Classic 5B',
        model: 'Hickory',
        specs: 'Standard 5B weight',
        originalPrice: 8,
        year: 2008,
        source: 'Vic Firth retail pricing 2008',
        notes: 'Slightly heavier than 5A — suited Axenrot\'s more aggressive attack and twin-kick setup.',
        vintageValue2026: null,
        modernEquivalent: {
          item: 'Vic Firth American Classic 5B (current)',
          price: 14,
          link: 'vic-firth-5b-current',
        },
      },
      heads: {
        item: 'Remo Powerstroke 3 / Emperor / Ambassador',
        model: 'PS3 kick, Emperor/Ambassador toms and snare',
        specs: 'Remo Powerstroke 3 Clear (kick), Remo Emperor Clear/Ambassador Clear (toms), Remo Ambassador Coated (snare)',
        originalPrice: 70,
        year: 2008,
        source: 'Remo retail pricing 2008',
        notes: 'Standard Remo head package for Fascination Street Studios sessions with Jens Bogren.',
        vintageValue2026: null,
        modernEquivalent: {
          item: 'Remo Emperor / Ambassador Pack',
          price: 100,
          link: 'remo-emperor-ambassador-pack',
        },
      },
    },

    totals: {
      originalTotal: 13378,
      inflationAdjusted2026: null, // Calculated dynamically
      vintageTotal2026: 10030,
      modernEquivalentTotal: 14854,
    },

    priceEvolution: [
      { year: 2008, price: 13378, label: 'Original Purchase', event: 'Studio debut on Watershed, Opeth\'s highest US chart placement at the time' },
      { year: 2011, price: 14600, label: 'Heritage era', event: 'Opeth\'s prog-rock turn, twin-kick Sonor setup carries over' },
      { year: 2016, price: 17200, label: 'Sorceress era', event: 'Continued Sonor SQ2/Meinl Byzance setup' },
      { year: 2019, price: 18900, label: 'In Cauda Venenum era', event: 'Most recent Opeth studio album to date' },
      { year: 2026, price: 20356, label: 'Current adjusted', event: 'Inflation-adjusted value' },
    ],

    sources: [
      { title: 'Sonor SQ2 / Designer Series Catalog', year: 2008, type: 'catalog' },
      { title: 'Meinl Byzance Series Retail Pricing Archive', year: 2008, type: 'catalog' },
      { title: 'Opeth Watershed Album Credits', year: 2008, type: 'press' },
      { title: "Reverb Marketplace Analysis — Sonor SQ2 Custom", year: 2025, type: 'market' },
    ],

    meta: {
      title: "Martin Axenrot Drum Setup Cost | Opeth Gear Price History",
      description: "How much was Martin Axenrot's Opeth drum kit worth? Original Sonor SQ2 twin-kick + Meinl Byzance setup ~$13,378 in 2008, inflation-adjusted to ~$20,356 today. Complete Watershed-era gear breakdown.",
      keywords: ['martin axenrot drum setup cost', 'opeth drum kit price', 'sonor sq2 price', 'martin axenrot gear cost today', 'meinl byzance cymbals price'],
    },
  },

  // ==========================================
  // MARIO DUPLANTIER - 2001 Terra Incognita Era
  // Pearl Export Dual-Kick Setup — Issue #2974
  // ==========================================
  'mario-duplantier': {
    slug: 'mario-duplantier',
    name: 'Mario Duplantier',
    band: 'Gojira',
    iconicYear: 2001,
    era: 'Terra Incognita Era',
    albumReference: 'Terra Incognita (2001)',
    profileImage: '/images/drummers/mario-duplantier.webp',

    summary: "Mario Duplantier's 2001 setup behind Gojira's (then Godzilla) debut Terra Incognita — a budget Pearl Export dual-kick rig assembled in Bayonne, France with whatever the fledgling band could afford. The dual 22\" kick configuration Mario established here became the defining foundation of his playing, carrying the tribal tom patterns and jazz-inflected extreme metal vocabulary that would eventually take Gojira from French underground clubs to Gretsch and Sonor SQ2 endorsements on stadium stages worldwide.",

    setup: {
      drums: {
        item: 'Pearl Export Series',
        model: '6-piece dual-kick shell pack',
        specs: 'Dual 22"x16" kicks, 10"x9" rack, 12"x10" rack, 13"x11" rack, 16"x16" floor',
        originalPrice: 1600,
        year: 2001,
        source: 'Pearl Export series catalog pricing 2001, Music Trades retail estimates',
        notes: "The Pearl Export was the affordable choice for a developing French band. Mario prioritised the dual-kick configuration from the very start — it became the structural core of Gojira's sound and remains a constant across every subsequent kit upgrade.",
        vintageValue2026: 1400,
        modernEquivalent: {
          item: 'Pearl Export EXX',
          price: 1400,
          link: 'pearl-export-exx',
        },
      },
      snare: {
        item: 'Pearl Sensitone Steel 14"x5.5"',
        model: 'Chrome steel shell snare',
        specs: '14"x5.5" chrome steel shell, standard hoops',
        originalPrice: 180,
        year: 2001,
        source: 'Pearl Sensitone catalog pricing 2001',
        notes: "A basic steel snare with the cutting crack needed to compete with Joe Duplantier's dense, down-tuned guitar tone on Terra Incognita.",
        vintageValue2026: 320,
        modernEquivalent: {
          item: 'Pearl Sensitone Elite Steel 14"x5.5"',
          price: 380,
          link: 'pearl-sensitone-elite-steel',
        },
      },
      cymbals: {
        item: 'Paiste 2002',
        model: 'Mixed 2002 configuration',
        specs: '14" hi-hats, 16"/18" crashes, 20" ride, 18" China',
        originalPrice: 650,
        year: 2001,
        source: 'Paiste 2002 series catalog pricing 2001',
        notes: 'Paiste 2002 was the standard European extreme metal cymbal choice — loud, cutting, and durable enough for the punishing club touring circuit Gojira ran through Bayonne and beyond.',
        vintageValue2026: 750,
        modernEquivalent: {
          item: 'Paiste 2002 Classic Set',
          price: 1250,
          link: 'paiste-2002-classic-set',
        },
      },
      hardware: {
        item: 'Pearl P-2002C Eliminator Double Pedal + Hardware',
        model: 'Cam-driven double pedal and stands',
        specs: 'Hi-hat stand, 2 boom stands, snare stand, Eliminator double pedal',
        originalPrice: 320,
        year: 2001,
        source: 'Pearl Eliminator P-2002C MSRP 2001, hardware pack estimates',
        notes: "The Eliminator's cam system was central to the fluid dual-bass patterns Mario developed on tracks like \"Remembrance\" and \"Satan is a Lawyer.\"",
        vintageValue2026: 420,
        modernEquivalent: {
          item: 'Pearl Eliminator Redline P2002BL',
          price: 560,
          link: 'pearl-eliminator-redline',
        },
      },
      sticks: {
        item: 'Vic Firth 5B Hickory',
        model: 'American Classic 5B',
        specs: 'Hickory, wood tip',
        originalPrice: 8,
        year: 2001,
        source: 'Standard retail price',
        notes: 'Off-the-shelf sticks matched to the aggressive attack required for early Gojira material — no signature deal yet.',
        vintageValue2026: null,
        modernEquivalent: {
          item: 'Vic Firth 5B American Classic',
          price: 14,
          link: 'vic-firth-5b',
        },
      },
      heads: {
        item: 'Remo Ambassador',
        model: 'Clear toms, coated snare',
        specs: 'Remo Ambassador Clear (toms), Remo Ambassador Coated (snare)',
        originalPrice: 70,
        year: 2001,
        source: 'Remo retail pricing 2001',
        notes: 'Standard Ambassador configuration, replaced frequently during heavy club touring on almost no budget.',
        vintageValue2026: null,
        modernEquivalent: {
          item: 'Remo Ambassador Pack',
          price: 100,
          link: 'remo-ambassador-pack',
        },
      },
    },

    totals: {
      originalTotal: 2828,
      inflationAdjusted2026: null, // Calculated dynamically
      vintageTotal2026: 2890,
      modernEquivalentTotal: 3704,
    },

    priceEvolution: [
      { year: 2001, price: 2828, label: 'Original Purchase', event: 'Terra Incognita recording — Bayonne DIY dual-kick setup' },
      { year: 2005, price: 9000, label: 'From Mars to Sirius era', event: 'First Gretsch USA Custom endorsement, international breakthrough' },
      { year: 2012, price: 12500, label: "L'Enfant Sauvage era", event: 'Meinl Byzance cymbal switch, expanded Gretsch rig with 8" rack tom' },
      { year: 2021, price: 18000, label: 'Fortitude era', event: 'Switch to Sonor SQ2 custom kit; Tama Mario Duplantier signature sticks launched' },
      { year: 2026, price: 5231, label: 'Current adjusted', event: 'Inflation-adjusted value of original 2001 setup' },
    ],

    sources: [
      { title: 'Pearl Export Series Catalog', year: 2001, type: 'catalog' },
      { title: 'Modern Drummer — Gojira Feature', year: 2006, type: 'interview' },
      { title: 'Metal Hammer — Mario Duplantier Interview', year: 2005, type: 'interview' },
      { title: 'Reverb Price Guide — Pearl Export Vintage', year: 2025, type: 'market' },
    ],

    meta: {
      title: "Mario Duplantier 2001 Gojira Drum Setup Cost | Terra Incognita Era Gear Prices",
      description: "How much did Mario Duplantier's 2001 Gojira drum kit cost? Original Pearl Export dual-kick setup ~$2,828, inflation-adjusted to ~$5,231 today. Complete Terra Incognita-era gear breakdown.",
      keywords: ['mario duplantier drum kit', 'gojira drummer gear', 'terra incognita drums', 'mario duplantier 2001 setup', 'gojira drum kit cost'],
    },
  },

  // ==========================================
  // HELLHAMMER - 1994 De Mysteriis Dom Sathanas Era
  // Pearl Kit — Issue #2974
  // ==========================================
  'hellhammer': {
    slug: 'hellhammer',
    name: 'Hellhammer',
    band: 'Mayhem',
    iconicYear: 1994,
    era: 'De Mysteriis Dom Sathanas Era',
    albumReference: 'De Mysteriis Dom Sathanas (1994)',
    profileImage: '/images/drummers/hellhammer.webp',

    summary: "Hellhammer's 1994 setup behind Mayhem's De Mysteriis Dom Sathanas — the benchmark black metal album and the raw, developing-endorsement Pearl kit that set the template for blast-beat drumming. Recorded at Grieghallen Studio in Bergen under producer Pytten, this stripped-down rig favoured a bright-tuned steel snare and standard Zildjian A cymbals over prestige gear, letting speed and precision carry the performance. Jan Axel Blomberg joined Mayhem in 1988, replacing founding drummer Manheim, and his gear has evolved through 35+ years and a second simultaneous career with Dimmu Borgir since 1999.",

    setup: {
      drums: {
        item: 'Pearl Kit (developing endorsement)',
        model: '5-piece shell pack',
        specs: '22"x16" kick, 10"x9" rack, 12"x10" rack, 16"x16" floor',
        originalPrice: 1100,
        year: 1994,
        source: 'Pearl catalog estimates 1994, Norwegian retail pricing',
        notes: 'A durable, unpolished production-era Pearl shell pack — Hellhammer\'s Pearl relationship was still developing when De Mysteriis Dom Sathanas was recorded, but the shells suited the raw production aesthetic of early Norwegian black metal.',
        vintageValue2026: 1600,
        modernEquivalent: {
          item: 'Pearl Export EXX',
          price: 1000,
          link: 'pearl-export-exx',
        },
      },
      snare: {
        item: 'Pearl Steel Snare 14"x5.5"',
        model: 'Steel shell, tuned bright',
        specs: '14"x5.5" steel shell, 8-lug, tuned for maximum crack',
        originalPrice: 160,
        year: 1994,
        source: 'Pearl catalog pricing 1994',
        notes: "Tuned bright to cut through De Mysteriis Dom Sathanas's cold, layered guitar mix — the crack heard on the album is largely a product of this tuning rather than the shell itself.",
        vintageValue2026: 280,
        modernEquivalent: {
          item: 'Pearl Sensitone Steel 14"x5.5"',
          price: 280,
          link: 'pearl-sensitone-steel',
        },
      },
      cymbals: {
        item: 'Zildjian A Series',
        model: 'Mixed A Series setup',
        specs: '14" A Hi-Hats, 16"/18" A Crash, 20" A Ride',
        originalPrice: 480,
        year: 1994,
        source: 'Zildjian A series catalog pricing 1994',
        notes: 'The bright, cutting character Hellhammer would refine across the next three decades begins here, serving Euronymous and Blackthorn\'s guitar tones on the album.',
        vintageValue2026: 700,
        modernEquivalent: {
          item: 'Zildjian A Series Cymbal Pack',
          price: 1100,
          link: 'zildjian-a-series-pack',
        },
      },
      hardware: {
        item: 'Pearl Double Bass Pedal (chain-drive)',
        model: 'Early chain-drive double pedal',
        specs: 'Hi-hat stand, 2 boom stands, snare stand, chain-drive double pedal',
        originalPrice: 250,
        year: 1994,
        source: 'Pearl hardware catalog estimates 1994',
        notes: "An early pedal platform that supported the blast-beat foundation Hellhammer was building — a template later drummers across Norwegian black metal would study closely.",
        vintageValue2026: 380,
        modernEquivalent: {
          item: 'Pearl Demon Drive Double Pedal',
          price: 550,
          link: 'pearl-demon-drive',
        },
      },
      sticks: {
        item: 'Vic Firth American Classic 5B',
        model: 'Hickory',
        specs: 'Standard 5B weight',
        originalPrice: 8,
        year: 1994,
        source: 'Standard retail price',
        notes: 'The one constant across Hellhammer\'s entire career — unchanged from his earliest Mayhem years through to today.',
        vintageValue2026: null,
        modernEquivalent: {
          item: 'Vic Firth American Classic 5B',
          price: 14,
          link: 'vic-firth-5b',
        },
      },
      heads: {
        item: 'Remo Ambassador',
        model: 'Standard coated/clear configuration',
        specs: 'Remo Ambassador Clear (toms), Remo Ambassador Coated (snare)',
        originalPrice: 70,
        year: 1994,
        source: 'Remo retail pricing 1994',
        notes: 'Basic, durable heads typical of the raw early-1990s black metal underground.',
        vintageValue2026: null,
        modernEquivalent: {
          item: 'Remo Ambassador / Pinstripe Pack',
          price: 110,
          link: 'remo-ambassador-pinstripe-pack',
        },
      },
    },

    totals: {
      originalTotal: 2068,
      inflationAdjusted2026: null, // Calculated dynamically
      vintageTotal2026: 2960,
      modernEquivalentTotal: 3054,
    },

    priceEvolution: [
      { year: 1994, price: 2068, label: 'Original Purchase', event: 'De Mysteriis Dom Sathanas recorded at Grieghallen Studio' },
      { year: 1999, price: 5500, label: 'Dimmu Borgir dual-era begins', event: 'Upgrade to Pearl Reference Series; joins Dimmu Borgir while remaining Mayhem\'s drummer' },
      { year: 2007, price: 8000, label: 'Ordo Ad Chao era', event: 'Pearl Demon Drive direct-drive pedal adopted; Mayhem records without a bassist' },
      { year: 2019, price: 9200, label: 'Daemon era', event: 'Zildjian Z Custom Dark Ride added; Pearl Reference/Demon Drive confirmed as current rig' },
      { year: 2026, price: 4571, label: 'Current adjusted', event: 'Inflation-adjusted value of original 1994 setup' },
    ],

    sources: [
      { title: 'Pearl Percussion Catalog Archive', year: 1994, type: 'catalog' },
      { title: 'Modern Drummer — Hellhammer Feature', year: 2007, type: 'interview' },
      { title: 'Metal Hammer — Mayhem Ordo Ad Chao Rundown', year: 2008, type: 'interview' },
      { title: 'Reverb Price Guide — Vintage Pearl Kits', year: 2025, type: 'market' },
    ],

    meta: {
      title: "Hellhammer 1994 Mayhem Drum Setup Cost | De Mysteriis Dom Sathanas Era Gear Prices",
      description: "How much did Hellhammer's 1994 Mayhem drum kit cost? Original Pearl setup ~$2,068, inflation-adjusted to ~$4,571 today. Complete De Mysteriis Dom Sathanas-era gear breakdown.",
      keywords: ['hellhammer drum kit', 'mayhem drummer gear', 'de mysteriis dom sathanas drums', 'hellhammer 1994 setup', 'mayhem drum kit cost'],
    },
  },

  // ==========================================
  // BEN KOLLER - 2001 Jane Doe Era
  // Tama Rockstar Setup — Issue #2974
  // ==========================================
  'ben-koller': {
    slug: 'ben-koller',
    name: 'Ben Koller',
    band: 'Converge',
    iconicYear: 2001,
    era: 'Jane Doe Era',
    albumReference: 'Jane Doe (2001)',
    profileImage: '/images/drummers/ben-koller.webp',

    summary: "Ben Koller's 2001 setup behind Converge's Jane Doe — the record that redefined what hardcore could be. Moving up from secondhand DIY kits to a more stable Tama Rockstar configuration, Koller's chaotic, jazz-influenced rhythmic structures found a durable platform for Kurt Ballou's dense production style. The stripped-down, direct sound of Jane Doe and its follow-ups You Fail Me (2004) and No Heroes (2006) reflected deliberate restraint in gear as well as composition, before Koller's rig grew into the Tama Starclassic Maple setup of Converge's modern Epitaph-era records.",

    setup: {
      drums: {
        item: 'Tama Rockstar Series',
        model: '5-piece shell pack',
        specs: '22"x16" kick, 10"x9" rack, 12"x10" rack, 16"x16" floor',
        originalPrice: 950,
        year: 2001,
        source: 'Tama Rockstar series retail pricing 2001',
        notes: "The first consistent endorsement-adjacent platform of Koller's career — the maple/poplar hybrid gave a punchy, mid-forward tone suited to Kurt Ballou's dense production on Jane Doe.",
        vintageValue2026: 1100,
        modernEquivalent: {
          item: 'Tama Imperialstar 5-piece',
          price: 800,
          link: 'tama-imperialstar-5piece',
        },
      },
      snare: {
        item: 'Tama Steel Snare 14"x5.5"',
        model: 'Steel shell, increased depth',
        specs: '14"x5.5" steel shell, 8-lug',
        originalPrice: 160,
        year: 2001,
        source: 'Tama catalog pricing 2001',
        notes: 'A deeper shell than his earlier DIY-era snares, improving projection and body for studio recordings that would reach a far wider audience than Converge\'s 1990s independent releases.',
        vintageValue2026: 280,
        modernEquivalent: {
          item: 'Tama S.L.P. Sonic Steel 14"x5.5"',
          price: 400,
          link: 'tama-slp-sonic-steel',
        },
      },
      cymbals: {
        item: 'Zildjian A Series',
        model: 'A New Beat mixed setup',
        specs: '14" A New Beat Hi-Hats, 16"/17" A Crash, 20" A Ride',
        originalPrice: 580,
        year: 2001,
        source: 'Zildjian A series catalog pricing 2001',
        notes: 'A move up from budget brass to Zildjian A Series — brighter, more defined response suited to the increasingly precise, jazz-influenced rhythmic structures of Jane Doe.',
        vintageValue2026: 750,
        modernEquivalent: {
          item: 'Zildjian A Series Cymbal Pack',
          price: 1100,
          link: 'zildjian-a-series-pack',
        },
      },
      hardware: {
        item: 'Tama Iron Cobra Double Pedal',
        model: 'Power Glide cam, chain drive',
        specs: 'Hi-hat stand, 2 boom stands, snare stand, Iron Cobra double pedal',
        originalPrice: 280,
        year: 2001,
        source: 'Tama Iron Cobra MSRP 2001',
        notes: "A significant upgrade from Koller's earlier budget pedal hardware — the Power Glide cam's smooth response gave him improved control at Jane Doe's extreme tempos.",
        vintageValue2026: 380,
        modernEquivalent: {
          item: 'Tama Iron Cobra 900 Double Pedal',
          price: 520,
          link: 'tama-iron-cobra-900',
        },
      },
      sticks: {
        item: 'Vic Firth 5B Hickory',
        model: 'American Classic 5B',
        specs: 'Hickory, wood tip',
        originalPrice: 8,
        year: 2001,
        source: 'Standard retail price',
        notes: "Koller's heavier 5B stick preference — established during the DIY hardcore years — carried through unchanged into the Jane Doe era.",
        vintageValue2026: null,
        modernEquivalent: {
          item: 'Vic Firth American Classic 5B',
          price: 14,
          link: 'vic-firth-5b',
        },
      },
      heads: {
        item: 'Remo Emperor / Powerstroke 3',
        model: 'Emperor toms, Powerstroke 3 kick',
        specs: 'Remo Emperor Clear (toms), Remo Powerstroke 3 Clear (kick), Remo Ambassador Coated (snare)',
        originalPrice: 85,
        year: 2001,
        source: 'Remo retail pricing 2001',
        notes: "Emperor's double-ply durability sustained the demands of Jane Doe, You Fail Me, and No Heroes' live performances, while Powerstroke 3 gave a focused, punchy kick attack.",
        vintageValue2026: null,
        modernEquivalent: {
          item: 'Remo Emperor / Powerstroke Pack',
          price: 130,
          link: 'remo-emperor-powerstroke-pack',
        },
      },
    },

    totals: {
      originalTotal: 2063,
      inflationAdjusted2026: null, // Calculated dynamically
      vintageTotal2026: 2510,
      modernEquivalentTotal: 2964,
    },

    priceEvolution: [
      { year: 2001, price: 2063, label: 'Original Purchase', event: 'Jane Doe recorded — hardcore/mathcore breakthrough on Hydra Head Records' },
      { year: 2004, price: 2900, label: 'You Fail Me era', event: 'Deeper Tama steel snare; stripped-down, direct production approach' },
      { year: 2009, price: 7200, label: 'Axe to Fall era', event: 'Switch to Tama Starclassic Maple; Converge\'s Epitaph Records debut' },
      { year: 2017, price: 10500, label: 'The Dusk in Us era', event: 'Expanded Zildjian A Custom/K Custom cymbal setup; Tama Iron Cobra 900 upgrade' },
      { year: 2026, price: 3816, label: 'Current adjusted', event: 'Inflation-adjusted value of original 2001 setup' },
    ],

    sources: [
      { title: 'Tama Rockstar Series Catalog', year: 2001, type: 'catalog' },
      { title: 'Decibel Magazine — Ben Koller Interview', year: 2011, type: 'interview' },
      { title: 'Modern Drummer — Converge Feature', year: 2013, type: 'interview' },
      { title: 'Reverb Price Guide — Vintage Tama Kits', year: 2025, type: 'market' },
    ],

    meta: {
      title: "Ben Koller 2001 Converge Drum Setup Cost | Jane Doe Era Gear Prices",
      description: "How much did Ben Koller's 2001 Converge drum kit cost? Original Tama Rockstar setup ~$2,063, inflation-adjusted to ~$3,816 today. Complete Jane Doe-era gear breakdown.",
      keywords: ['ben koller drum kit', 'converge drummer gear', 'jane doe drums', 'ben koller 2001 setup', 'converge drum kit cost'],
    },
  },

  // ==========================================
  // SCOTT TRAVIS - 1990 Painkiller Era
  // Issue #2905: Gear Price History (re-scoped from batch 21)
  // Tama Artstar II Double-Bass Setup
  // ==========================================
  'scott-travis': {
    slug: 'scott-travis',
    name: 'Scott Travis',
    band: 'Judas Priest',
    iconicYear: 1990,
    era: 'Painkiller Era',
    albumReference: 'Painkiller (1990)',
    profileImage: '/images/drummers/scott-travis.webp',

    summary: "Scott Travis's 1990 Painkiller-era setup marks one of the most consequential gear configurations in metal history. When Travis joined Judas Priest in 1989 — replacing Dave Holland and becoming the first American to ever hold the drum seat in a defining British metal institution — he brought with him the neo-classical shred pedigree of Racer X, the Paul Gilbert-fronted band that had already established him as one of the genre's most technically gifted players. Within months of joining, he was in the studio tracking Painkiller, an album so relentlessly fast that it single-handedly redefined what heavy metal drumming could sound like at the dawn of the 1990s.\n\nThe Painkiller kit centered on a Tama Artstar II — a birch-shelled, double-bass-drum configuration chosen specifically for its aggressive high-frequency attack. Where maple shells favor warmth, birch cuts, and Travis needed every ounce of that cutting power to punch through Judas Priest's dual-guitar wall of K.K. Downing and Glenn Tipton at tempos that bordered on physically unreasonable. The title track's sustained double-kick intro — arguably metal's most iconic drum opening — was produced not by a linked double pedal but by two independently operated Tama Iron Cobra HP900 pedals, a foot-independence approach Travis has carried through every subsequent era of his career. Paired with Paiste Signature and 2002 series cymbals — an endorsement relationship Travis established in May 1987 during his Racer X years and that colored Priest's sound throughout the Painkiller cycle — the complete rig cost approximately $4,200 in 1990 dollars, equivalent to roughly $10,527 in 2026 after CPI adjustment.\n\nWhat makes the Painkiller setup remarkable is how directly the gear served the performance. The Tama Artstar II's die-cast hoops sharpened rim shot clarity for the album's snare-intensive patterns, while the steel 14\"x6.5\" Artstar II snare delivered the crack needed to stay audible through a mix stacked with layered guitars and Rob Halford's operatic screams. Vic Firth 5B hickory sticks — standard issue before Travis's later signature relationships — gave him the heft to drive the kit at extreme tempos without sacrificing control, and Remo Emperor and Ambassador heads rounded out a configuration built entirely around speed, articulation, and durability across a grueling world tour.\n\nTravis carried this same Tama and Paiste rig through Jugulator (1997) before beginning a gradual migration toward Pearl's Reference Series in the 2000s and eventually returning to Tama's maple-shelled Starclassic line for Firepower (2018) and Invincible Shield (2024). But it is the 1990 Artstar II configuration — the kit that produced the Painkiller title track's machine-gun assault — that remains the most searched, most cited, and most historically significant setup of his 35-plus year tenure with Judas Priest. A $4,200 investment in 1990 now represents roughly $10,527 in 2026 purchasing power, tracking the broader appreciation of vintage professional drum equipment from metal's speed-metal golden age.",

    setup: {
      drums: {
        item: 'Tama Artstar II',
        model: '7-piece double-bass shell pack',
        specs: 'Birch shells, Piano Black finish; double 22"x16" bass drums, 10"x9"/12"x10"/13"x11" rack toms, 14"x14"/16"x16" floor toms',
        originalPrice: 2300,
        year: 1990,
        source: 'Tama Artstar II professional catalog MSRP 1990, Modern Drummer archive estimates',
        notes: 'Birch shells were chosen for their high-frequency attack — critical for cutting through Judas Priest\'s dual-guitar arrangements at Painkiller\'s extreme tempos. The double bass drum configuration (two independently pedaled kicks rather than a linked double pedal) became a career-long signature.',
        vintageValue2026: 3200,
        modernEquivalent: {
          item: 'Tama Starclassic Maple',
          price: 5200,
          link: 'tama-starclassic-maple',
        },
      },
      snare: {
        item: 'Tama Artstar II Steel 14"x6.5"',
        model: 'Steel shell snare',
        specs: '14"x6.5" seamless steel shell, 8-lug, die-cast hoops',
        originalPrice: 220,
        year: 1990,
        source: 'Tama snare catalog pricing 1990',
        notes: 'The die-cast hoops sharpened rim shot definition for Painkiller\'s snare-intensive patterns, giving Travis the crack needed to stay present in a dense, guitar-heavy mix.',
        vintageValue2026: 380,
        modernEquivalent: {
          item: 'Tama Starphonic Brass 14"x6"',
          price: 550,
          link: 'tama-starphonic-brass',
        },
      },
      cymbals: {
        item: 'Paiste Signature / 2002 Series',
        model: 'Mixed Signature and 2002 configuration',
        specs: '14" Signature Hi-Hats, 16" and 18" 2002 Crashes, 20" Signature Ride, 18" 2002 China',
        originalPrice: 950,
        year: 1990,
        source: 'Paiste professional pricing 1990, Paiste artist archive',
        notes: 'Travis established his Paiste endorsement in May 1987 during his Racer X years — a relationship he maintained throughout the Painkiller cycle. Vintage Paiste 2002 cymbals from this era are now highly sought after by collectors for their bright, cutting overtone character.',
        vintageValue2026: 1400,
        modernEquivalent: {
          item: 'Paiste Signature Reflector Set',
          price: 1800,
          link: 'paiste-signature-reflector',
        },
      },
      hardware: {
        item: 'Tama Iron Cobra HP900 (x2) + Tama Hardware',
        model: 'Two independent bass drum pedals, hi-hat stand, boom stands, throne',
        specs: 'Two Tama Iron Cobra HP900 single pedals, Iron Cobra hi-hat stand, 5 boom cymbal stands, Tama 1st Chair throne',
        originalPrice: 650,
        year: 1990,
        source: 'Tama hardware catalog 1990',
        notes: 'Travis ran two independently pedaled bass drums rather than a linked double pedal — a foot-independence approach that produced Painkiller\'s machine-gun double-kick intro and that he has kept for his entire career.',
        vintageValue2026: 450,
        modernEquivalent: {
          item: 'Tama Speed Cobra HP910LSW (x2)',
          price: 900,
          link: 'tama-speed-cobra-hp910',
        },
      },
      sticks: {
        item: 'Vic Firth 5B Hickory',
        model: 'American Classic 5B',
        specs: 'Hickory, wood tip, .595" diameter',
        originalPrice: 8,
        year: 1990,
        source: 'Standard retail price',
        notes: 'Standard 5B sticks established from Travis\'s first sessions with Priest, before his later Vater signature relationship.',
        vintageValue2026: null,
        modernEquivalent: {
          item: 'Vic Firth American Classic 5B',
          price: 14,
          link: 'vic-firth-american-classic-5b',
        },
      },
      heads: {
        item: 'Remo Emperor Coated / Ambassador',
        model: 'Emperor Coated (toms), Ambassador Snare Side (resonant), Powerstroke P3 (kick)',
        specs: 'Coated Emperor toms, Ambassador snare side resonant, Powerstroke P3 kick batter',
        originalPrice: 72,
        year: 1990,
        source: 'Remo professional pricing 1990',
        notes: 'Standard Remo configuration chosen for touring durability and focused attack across Painkiller\'s grueling world tour schedule.',
        vintageValue2026: null,
        modernEquivalent: {
          item: 'Remo Emperor Pro Pack',
          price: 95,
          link: 'remo-emperor-pack',
        },
      },
    },

    totals: {
      originalTotal: 4200,
      inflationAdjusted2026: null, // Calculated dynamically
      vintageTotal2026: 5430,
      modernEquivalentTotal: 8559,
    },

    priceEvolution: [
      { year: 1990, price: 4200, label: 'Original Purchase', event: 'Painkiller recording and world tour' },
      { year: 1997, price: 4800, label: 'Jugulator era', event: 'Tim "Ripper" Owens era; same Tama/Paiste rig continues' },
      { year: 2005, price: 6200, label: 'Angel of Retribution era', event: 'Rob Halford reunion drives Priest nostalgia market' },
      { year: 2010, price: 7800, label: 'Collector interest grows', event: 'Vintage Tama Artstar II and Paiste 2002 gain collector status' },
      { year: 2018, price: 9200, label: 'Firepower era', event: 'Travis returns to Tama, boosting vintage Artstar II demand' },
      { year: 2022, price: 10100, label: 'Post-pandemic premium', event: 'Home studio demand for vintage speed-metal gear' },
      { year: 2026, price: 10527, label: 'Current adjusted', event: 'Inflation-adjusted value' },
    ],

    sources: [
      { title: 'Tama Artstar II Professional Catalog', year: 1990, type: 'catalog' },
      { title: 'Modern Drummer — Scott Travis Interview', year: 1991, type: 'interview' },
      { title: 'Paiste Artist Profiles — Travis Signature Era', year: 1990, type: 'manufacturer' },
      { title: 'Reverb Price Guide — Vintage Tama Artstar II / Paiste 2002', year: 2025, type: 'market' },
    ],

    meta: {
      title: "Scott Travis 1990 Judas Priest Drum Setup Cost | Painkiller Era Gear Prices",
      description: "How much did Scott Travis's 1990 Painkiller-era drum kit cost? Original ~$4,200, inflation-adjusted to ~$10,527 today. Complete Tama Artstar II breakdown from Judas Priest's speed metal landmark.",
      keywords: ['scott travis drum kit', 'judas priest drummer gear history', 'painkiller drums cost', 'scott travis 1990 setup', 'judas priest drum kit cost'],
    },
  },

  // ==========================================
  // GAVIN HARRISON - 2007 Fear of a Blank Planet Era
  // Issue #2912: Gear Price History (batch 22)
  // Sonor SQ2 Custom / Zildjian K Custom Special Dry Setup
  // ==========================================
  'gavin-harrison': {
    slug: 'gavin-harrison',
    name: 'Gavin Harrison',
    band: 'Porcupine Tree',
    iconicYear: 2007,
    era: 'Fear of a Blank Planet Era',
    albumReference: 'Fear of a Blank Planet (2007)',
    profileImage: '/images/drummers/gavin-harrison.webp',

    summary: "Gavin Harrison's 2007 Porcupine Tree setup captures progressive drumming at its most refined. By the time Fear of a Blank Planet arrived, Harrison had spent five years building out a custom Sonor SQ2 kit and a Zildjian cymbal collaboration specifically engineered around his polyrhythmic, ghost-note-heavy vocabulary — instruments that reward subtlety rather than raw volume. The thin maple SQ2 shells, the brass-shell signature snare, and the dry, fast-decaying K Custom Special Dry cymbals all exist to keep complex, layered rhythmic ideas individually audible, a problem few other rigs are built to solve.\n\nWhat makes this setup historically significant is how directly it maps onto Harrison's career arc. He established the Sonor and Zildjian relationships during In Absentia (2002), his first album with Porcupine Tree, then refined them into their definitive form for Fear of a Blank Planet — the record, and specifically the 17-minute \"Anesthetize,\" that drumming schools worldwide now use as a polyrhythm teaching text. The complete rig cost approximately $11,660 in 2007 dollars, equivalent to roughly $18,432 in 2026 after CPI adjustment — a substantial investment reflecting the fully custom nature of the Sonor SQ2 program, where no two kits are built the same.\n\nThe setup proved durable rather than transitional. Harrison carried the same core Sonor/Zildjian rig into King Crimson's revolutionary three-drummer lineup in 2008, added a 12\" Protean signature snare for The Pineapple Thief's more intimate studio work in the mid-2010s, and returned to it essentially unchanged for Porcupine Tree's 2022 reunion album Closure/Continuation — remarkable consistency for gear built around such demanding technical requirements. A $11,660 investment in 2007 now represents roughly $18,432 in 2026 purchasing power, tracking both general inflation and the growing collector interest in fully custom Sonor SQ2 configurations.",

    setup: {
      drums: {
        item: 'Sonor SQ2 Series',
        model: 'Custom-order shell pack, thin maple',
        specs: '22"x17" bass drum, 10"x8"/12"x9" rack toms, 14"x13"/16"x15" floor toms',
        originalPrice: 7200,
        year: 2007,
        source: 'Sonor SQ2 custom-order catalog pricing 2007',
        notes: "Fully custom-order German engineering — no two SQ2 kits are identical. Harrison's configuration prioritizes thin maple shells for maximum sensitivity, letting whisper-quiet ghost notes and full-force accents register with equal clarity on Fear of a Blank Planet.",
        vintageValue2026: 9500,
        modernEquivalent: {
          item: 'Sonor SQ2 Custom (2026 pricing)',
          price: 11000,
          link: 'sonor-sq2-custom',
        },
      },
      snare: {
        item: 'Sonor Gavin Harrison Signature Snare',
        model: '14"x5.25" brass shell',
        specs: 'Brass shell, die-cast hoops, 8-lug',
        originalPrice: 780,
        year: 2007,
        source: 'Sonor signature snare catalog pricing 2007',
        notes: "The brass shell's warmth lets soft ghost notes sing rather than rattle, while still projecting enough to cut through Porcupine Tree's dense, Steven Wilson-produced arrangements on rimshot accents.",
        vintageValue2026: 1100,
        modernEquivalent: {
          item: 'Sonor Gavin Harrison Signature Snare (current)',
          price: 950,
          link: 'sonor-gavin-harrison-signature-snare',
        },
      },
      cymbals: {
        item: 'Zildjian K Custom Special Dry',
        model: 'Co-developed signature series',
        specs: '14" Special Dry Hi-Hats, 16"/18" Special Dry Crashes, 21" Special Dry Ride, 18" Trash China',
        originalPrice: 2150,
        year: 2007,
        source: 'Zildjian K Custom Special Dry catalog pricing 2007',
        notes: 'Developed in direct collaboration with Harrison, this dry, fast-decaying series prevents the wash buildup that would otherwise obscure his layered polyrhythmic patterns — essential for tracks like the title track and "Anesthetize."',
        vintageValue2026: 2800,
        modernEquivalent: {
          item: 'Zildjian K Custom Special Dry Pack (current)',
          price: 2600,
          link: 'zildjian-k-custom-special-dry-pack',
        },
      },
      hardware: {
        item: 'Sonor Perfect Balance Pedal + 600 Series Hardware',
        model: 'Single pedal, hi-hat stand, boom stands, throne',
        specs: 'Sonor Perfect Balance Pedal, Sonor 600 Series hi-hat stand and boom stands, Sonor Professional Throne',
        originalPrice: 1450,
        year: 2007,
        source: 'Sonor hardware catalog pricing 2007',
        notes: "The Perfect Balance pedal's even resistance throughout the stroke gives Harrison the bass drum dynamic range his cross-rhythmic patterns require — essential when the kick functions as a melodic voice rather than just a time-keeper.",
        vintageValue2026: 1700,
        modernEquivalent: {
          item: 'Sonor Perfect Balance Pedal + 600 Series Hardware (current)',
          price: 1750,
          link: 'sonor-perfect-balance-600-series',
        },
      },
      sticks: {
        item: 'Vic Firth Gavin Harrison Signature',
        model: '16" length, .570" diameter, barrel tip',
        specs: 'Hickory, barrel tip',
        originalPrice: 12,
        year: 2007,
        source: 'Vic Firth signature stick retail pricing 2007',
        notes: "Harrison's own barrel-tip design, close to a 5A in weight but with a custom taper developed for balance and rebound during extended polyrhythmic passages.",
        vintageValue2026: null,
        modernEquivalent: {
          item: 'Vic Firth Gavin Harrison Signature (current)',
          price: 16,
          link: 'vic-firth-gavin-harrison-signature',
        },
      },
      heads: {
        item: 'Remo Ambassador Coated / Snare Side',
        model: 'Coated batter, snare-side resonant',
        specs: 'Remo Ambassador Coated (toms/snare batter), Remo Ambassador Snare Side (resonant)',
        originalPrice: 68,
        year: 2007,
        source: 'Remo retail pricing 2007',
        notes: 'Standard Ambassador configuration chosen for the sensitivity and controlled overtones needed to keep tuned melodic toms clear within dense mixes.',
        vintageValue2026: null,
        modernEquivalent: {
          item: 'Remo Ambassador Coated/Snare Side Pack',
          price: 95,
          link: 'remo-ambassador-pack',
        },
      },
    },

    totals: {
      originalTotal: 11660,
      inflationAdjusted2026: null, // Calculated dynamically
      vintageTotal2026: 15100,
      modernEquivalentTotal: 16427,
    },

    priceEvolution: [
      { year: 2002, price: 9200, label: 'In Absentia era', event: 'Joins Porcupine Tree — establishes Sonor SQ2 and Zildjian K Custom Special Dry endorsement' },
      { year: 2007, price: 11660, label: 'Original Purchase', event: 'Fear of a Blank Planet recorded — signature Sonor 14"x5.25" brass snare and K Custom Special Dry collaboration finalized' },
      { year: 2008, price: 13400, label: 'King Crimson era', event: "Joins King Crimson's revolutionary three-drummer lineup; expanded rack tom configuration" },
      { year: 2018, price: 15200, label: 'Pineapple Thief era', event: '12" Protean signature snare added for Dissolution studio sessions' },
      { year: 2022, price: 16800, label: 'Porcupine Tree reunion', event: 'Closure/Continuation reunion album — same core rig after 12-year hiatus' },
      { year: 2026, price: 18427, label: 'Current adjusted', event: 'Inflation-adjusted value of original 2007 setup' },
    ],

    sources: [
      { title: 'Sonor SQ2 Custom-Order Catalog', year: 2007, type: 'catalog' },
      { title: 'Modern Drummer — Gavin Harrison Interview', year: 2008, type: 'interview' },
      { title: 'Zildjian Artist Profiles — K Custom Special Dry Development', year: 2007, type: 'manufacturer' },
      { title: 'Reverb Price Guide — Custom Sonor SQ2 Kits', year: 2025, type: 'market' },
    ],

    meta: {
      title: "Gavin Harrison 2007 Porcupine Tree Drum Setup Cost | Fear of a Blank Planet Era Gear Prices",
      description: "How much did Gavin Harrison's 2007 Porcupine Tree drum kit cost? Original Sonor SQ2 setup ~$11,660, inflation-adjusted to ~$18,432 today. Complete Fear of a Blank Planet-era gear breakdown.",
      keywords: ['gavin harrison drum kit cost', 'porcupine tree drummer gear', 'fear of a blank planet drums cost', 'gavin harrison 2007 setup', 'gavin harrison sonor sq2 price'],
    },
  },

  // ==========================================
  // MIKE MANGINI - 2011 A Dramatic Turn of Events Era
  // Issue #2912: Gear Price History (batch 22)
  // Pearl Masterworks Custom / Meinl Byzance / DW Setup
  // ==========================================
  'mike-mangini': {
    slug: 'mike-mangini',
    name: 'Mike Mangini',
    band: 'Dream Theater',
    iconicYear: 2011,
    era: 'A Dramatic Turn of Events Era',
    albumReference: 'A Dramatic Turn of Events (2011)',
    profileImage: '/images/drummers/mike-mangini.webp',

    summary: "Mike Mangini's 2011 setup marks one of the most consequential drum-chair transitions in progressive metal. When Mangini won the highly publicized audition to replace founding member Mike Portnoy in 2010, he inherited a fanbase that studies drum performances note-by-note — and he answered with A Dramatic Turn of Events, an album built entirely around his own technical vocabulary rather than an imitation of his predecessor. The rig he brought into the studio centered on a custom Pearl Masterworks kit, Meinl Byzance Traditional cymbals, and DW pedals and hardware — a combination distinct from both Portnoy's prior setup and from the Pearl/Sabian rig Mangini would eventually settle into years later.\n\nThe complete 2011 setup cost approximately $12,356, equivalent to roughly $17,999 in 2026 after CPI adjustment. That price reflects the fully custom nature of the Masterworks shell pack, a full seven-piece Meinl Byzance cymbal spread, and DW's premium 9000-series hardware and 9002 double pedal — a configuration built to handle Dream Theater's demanding odd-meter, high-speed passages without sacrificing the dynamic control Mangini's Berklee-honed technique requires.\n\nWhat makes Mangini's gear history unusually well-documented is how much it changed across a single band's catalog. He briefly swapped in Ludwig Keystone X Maple shells for Dream Theater's 2013 self-titled album before returning to Pearl for The Astonishing (2016) — all while keeping the Meinl/DW hardware combination. Then, starting with Distance Over Time (2019) and continuing through A View from the Top of the World (2021), Mangini made a wholesale switch to Pearl Reference Pure shells, Sabian HHX/AAX cymbals, and Pearl's own Eliminator Redline double pedal, retiring the DW hardware entirely. That two-stage evolution — DW/Meinl through the mid-2010s, then Pearl/Sabian from 2019 onward — makes his rig one of the most instructive case studies in how a signature progressive metal setup evolves under one drummer across more than a decade with the same band.",

    setup: {
      drums: {
        item: 'Pearl Masterworks Custom',
        model: '6-piece custom shell pack',
        specs: '22"x18" bass drum, 10"x8"/12"x9" rack toms, 14"x14"/16"x16" floor toms',
        originalPrice: 8500,
        year: 2011,
        source: 'Pearl Masterworks custom-order catalog pricing 2011',
        notes: "Pearl's fully custom Masterworks program let Mangini specify shell composition and hardware placement to suit Dream Theater's extreme-tempo, odd-meter demands on A Dramatic Turn of Events.",
        vintageValue2026: 10500,
        modernEquivalent: {
          item: 'Pearl Reference Pure (current Mangini kit)',
          price: 11000,
          link: 'pearl-reference-pure',
        },
      },
      snare: {
        item: 'Pearl Free-Floating Brass Snare',
        model: '14"x6.5" brass shell, free-floating suspension',
        specs: 'Brass shell, free-floating mounting system, 10-lug',
        originalPrice: 520,
        year: 2011,
        source: 'Pearl snare catalog pricing 2011',
        notes: "The free-floating suspension isolates the shell from hardware-induced overtones, giving Mangini's rapid single-stroke and paradiddle-based patterns maximum sensitivity and sustain.",
        vintageValue2026: 750,
        modernEquivalent: {
          item: 'Pearl Reference Brass Snare (current)',
          price: 650,
          link: 'pearl-reference-brass-snare',
        },
      },
      cymbals: {
        item: 'Meinl Byzance Traditional',
        model: 'Full seven-piece traditional-finish setup',
        specs: '14" Hi-Hats, 16" Thin Crash, 18"/20" Medium Crashes, 22" Medium Ride, 18" China, 10" Splash',
        originalPrice: 2300,
        year: 2011,
        source: 'Meinl Byzance Traditional catalog pricing 2011',
        notes: "Meinl's traditional hand-hammered finish gave Mangini's setup a darker, more complex overtone structure than the brighter B20 cymbals common in prog metal at the time.",
        vintageValue2026: 3000,
        modernEquivalent: {
          item: 'Sabian HHX/AAX Evolution Pack (current)',
          price: 3200,
          link: 'sabian-hhx-aax-evolution-pack',
        },
      },
      hardware: {
        item: 'DW 9002 Double Pedal + 9000 Series Hardware',
        model: 'Double bass pedal, hi-hat stand, boom stands, throne',
        specs: 'DW 9002 double bass pedal, DW 9000 Series hi-hat stand and boom stands, DW 9120M throne',
        originalPrice: 950,
        year: 2011,
        source: 'DW hardware catalog pricing 2011',
        notes: "DW's 9000 Series was chosen for the smooth, adjustable cam action the 9002 pedal needed to keep Mangini's extreme-tempo double-kick patterns even and controlled.",
        vintageValue2026: 1300,
        modernEquivalent: {
          item: 'Pearl Eliminator Redline Double Pedal + Hardware (current)',
          price: 1400,
          link: 'pearl-eliminator-redline-hardware',
        },
      },
      sticks: {
        item: 'Vic Firth Mike Mangini Signature',
        model: 'Signature model',
        specs: 'Hickory, wood tip',
        originalPrice: 11,
        year: 2011,
        source: 'Vic Firth signature stick retail pricing 2011',
        notes: "Mangini's signature stick balances the weight needed for extended double-bass work with the control required for his intricate hand technique.",
        vintageValue2026: null,
        modernEquivalent: {
          item: 'Vic Firth Mike Mangini Signature (current)',
          price: 16,
          link: 'vic-firth-mike-mangini-signature',
        },
      },
      heads: {
        item: 'Remo Powerstroke 3 / Emperor / Ambassador',
        model: 'Powerstroke 3 (kick), Emperor Clear (toms), Coated Ambassador (snare)',
        specs: 'Remo Powerstroke 3 Clear (kick batter), Remo Emperor Clear (tom batter), Remo Ambassador Clear (tom resonant), Remo Coated Ambassador (snare batter)',
        originalPrice: 75,
        year: 2011,
        source: 'Remo professional pricing 2011',
        notes: 'Standard Remo configuration built for touring durability across Dream Theater\'s demanding set lengths and extreme dynamic range.',
        vintageValue2026: null,
        modernEquivalent: {
          item: 'Remo Powerstroke/Emperor/Ambassador Pack',
          price: 100,
          link: 'remo-powerstroke-emperor-ambassador-pack',
        },
      },
    },

    totals: {
      originalTotal: 12356,
      inflationAdjusted2026: null, // Calculated dynamically
      vintageTotal2026: 15550,
      modernEquivalentTotal: 15966,
    },

    priceEvolution: [
      { year: 2010, price: 10500, label: 'Joins Dream Theater', event: 'Wins publicized audition to replace Mike Portnoy; assembles Pearl/Meinl/DW rig' },
      { year: 2011, price: 12356, label: 'Original Purchase', event: 'A Dramatic Turn of Events recorded — Mangini\'s studio debut with Dream Theater' },
      { year: 2013, price: 13800, label: 'Self-titled era', event: 'Temporary switch to Ludwig Keystone X Maple shells for Dream Theater (2013)' },
      { year: 2016, price: 15200, label: 'The Astonishing era', event: 'Returns to Pearl Masterworks Maple; same Meinl/DW hardware continues' },
      { year: 2019, price: 17600, label: 'Distance Over Time era', event: 'Major switch to Pearl Reference Pure shells, Sabian HHX/AAX cymbals, and Pearl Eliminator Redline pedal' },
      { year: 2021, price: 18900, label: 'A View from the Top of the World era', event: 'Same Pearl/Sabian rig continues; Roland SPD-SX sampling pad added for hybrid passages' },
      { year: 2026, price: 17998, label: 'Current adjusted', event: 'Inflation-adjusted value of original 2011 setup' },
    ],

    sources: [
      { title: 'Pearl Masterworks Custom-Order Catalog', year: 2011, type: 'catalog' },
      { title: 'Modern Drummer — Mike Mangini Interview', year: 2012, type: 'interview' },
      { title: 'Meinl Artist Profiles — Byzance Traditional Series', year: 2011, type: 'manufacturer' },
      { title: 'Reverb Price Guide — Pearl Masterworks Custom Kits', year: 2025, type: 'market' },
    ],

    meta: {
      title: "Mike Mangini 2011 Dream Theater Drum Setup Cost | A Dramatic Turn of Events Era Gear Prices",
      description: "How much did Mike Mangini's 2011 Dream Theater drum kit cost? Original Pearl Masterworks setup ~$12,356, inflation-adjusted to ~$17,999 today. Complete A Dramatic Turn of Events-era gear breakdown.",
      keywords: ['mike mangini drum kit cost', 'dream theater drummer gear', 'a dramatic turn of events drums cost', 'mike mangini 2011 setup', 'mike mangini pearl masterworks price'],
    },
  },

  // ==========================================
  // JASON BITTNER - 2004 The War Within Era
  // Issue #2912: Gear Price History (batch 22)
  // Tama Starclassic Performer B/B / Sabian / DW Setup
  // ==========================================
  'jason-bittner': {
    slug: 'jason-bittner',
    name: 'Jason Bittner',
    band: 'Shadows Fall',
    iconicYear: 2004,
    era: 'The War Within Era',
    albumReference: 'The War Within (2004)',
    profileImage: '/images/drummers/jason-bittner.webp',

    summary: "Jason Bittner's 2004 setup powered one of thrash-tinged metalcore's defining commercial breakthroughs. The War Within — Shadows Fall's Grammy-nominated fourth album — built on the technical foundation Bittner established with 2002's The Art of Balance, centering on a Tama Starclassic Performer B/B shell pack, a Tama Starphonic Steel snare, Sabian HHX/HH cymbals, and DW's 9002 double pedal. Every component in the rig was chosen to deliver the steel-edged crack and controlled double-kick response that NWOAHM's dense, layered arrangements demanded.\n\nThe complete 2004 setup cost approximately $4,773, equivalent to roughly $8,279 in 2026 after CPI adjustment. That figure reflects a working touring drummer's rig rather than a boutique custom build — Bittner's gear philosophy has always prioritized durability and consistency across a grueling road schedule over rare or exotic materials, a pragmatic approach that served him across Shadows Fall's rise through The Art of Balance (2002) and Threads of Life (2007).\n\nWhat makes Bittner's gear history a useful case study in touring-thrash economics is the scale of the change when his career pivoted. After Shadows Fall's 2015 breakup, Bittner carried his Tama rig into Flotsam & Jetsam's Dreams of Death before making a wholesale switch in 2017: Mapex Saturn V all-maple shells, Zildjian K & A Custom cymbals, and a Mapex Falcon double pedal, assembled fresh for his new chair in Overkill. That same Mapex/Zildjian rig has carried through to his work in the thrash supergroup Category 7 since 2024 — illustrating how a single gear-brand transition, triggered by a band change rather than gradual upgrades, can reset an entire touring rig's cost basis in one move.",

    setup: {
      drums: {
        item: 'Tama Starclassic Performer B/B',
        model: 'Birch/bubinga hybrid shell pack',
        specs: '22"x18" bass drum, 10"x8"/12"x9" rack toms, 14"x14"/16"x16" floor toms',
        originalPrice: 2600,
        year: 2004,
        source: 'Tama Starclassic Performer B/B catalog pricing 2004',
        notes: "The birch/bubinga hybrid shells cut through Shadows Fall's layered guitar arrangements with a punchy, mid-forward attack — essential for The War Within's dense NWOAHM production.",
        vintageValue2026: 3400,
        modernEquivalent: {
          item: 'Mapex Saturn V (current Bittner kit)',
          price: 3200,
          link: 'mapex-saturn-v',
        },
      },
      snare: {
        item: 'Tama Starphonic Steel',
        model: '14"x6.5" steel shell',
        specs: 'Steel shell, 8-lug, die-cast hoops',
        originalPrice: 280,
        year: 2004,
        source: 'Tama Starphonic catalog pricing 2004',
        notes: "The steel shell's crack and projection kept Bittner's backbeat audible through Shadows Fall's dual-guitar wall on The War Within's biggest singles.",
        vintageValue2026: 420,
        modernEquivalent: {
          item: 'Mapex Black Panther 14"x6.5" Brass (current)',
          price: 380,
          link: 'mapex-black-panther-brass',
        },
      },
      cymbals: {
        item: 'Sabian HHX/HH Series',
        model: 'Mixed HHX and HH configuration',
        specs: '14" HH Hi-Hats, 16"/18" HHX Crashes, 20" HH Ride, HHX China',
        originalPrice: 1400,
        year: 2004,
        source: 'Sabian HHX/HH catalog pricing 2004',
        notes: "Sabian's hand-hammered HHX/HH blend gave Bittner both the dark, controlled crashes and cutting ride definition needed for Shadows Fall's mix of thrash riffing and metalcore breakdowns.",
        vintageValue2026: 1900,
        modernEquivalent: {
          item: 'Zildjian K & A Custom Pack (current)',
          price: 2100,
          link: 'zildjian-k-a-custom-pack',
        },
      },
      hardware: {
        item: 'DW 9002 Double Bass Pedal',
        model: 'Chain-drive double pedal + stands',
        specs: 'DW 9002 double bass pedal, hi-hat stand, boom stands, throne',
        originalPrice: 420,
        year: 2004,
        source: 'DW hardware catalog pricing 2004',
        notes: "The 9002's smooth chain-drive action gave Bittner the control needed for the sustained double-kick passages that define Shadows Fall's thrash-metalcore hybrid sound.",
        vintageValue2026: 580,
        modernEquivalent: {
          item: 'Mapex Falcon Double Pedal + T865 Throne (current)',
          price: 650,
          link: 'mapex-falcon-t865-throne',
        },
      },
      sticks: {
        item: 'Vic Firth 5B Hickory',
        model: 'American Classic 5B',
        specs: 'Hickory, wood tip',
        originalPrice: 8,
        year: 2004,
        source: 'Standard retail price',
        notes: "Bittner's standard 5B stick preference from his Shadows Fall years, before his later Promark signature relationship.",
        vintageValue2026: null,
        modernEquivalent: {
          item: 'Promark Jason Bittner Signature 5BX (current)',
          price: 14,
          link: 'promark-jason-bittner-signature-5bx',
        },
      },
      heads: {
        item: 'Remo Powerstroke 3 / Ambassador Coated',
        model: 'Powerstroke 3 (kick), Coated Ambassador (snare)',
        specs: 'Remo Powerstroke 3 Clear (kick), Remo Coated Ambassador (snare batter), Remo Ambassador Snare Side (resonant)',
        originalPrice: 65,
        year: 2004,
        source: 'Remo professional pricing 2004',
        notes: 'Standard Remo configuration chosen for touring durability across Shadows Fall\'s relentless mid-2000s touring schedule.',
        vintageValue2026: null,
        modernEquivalent: {
          item: 'Evans Heavyweight/EC2 Pack (current)',
          price: 90,
          link: 'evans-heavyweight-ec2-pack',
        },
      },
    },

    totals: {
      originalTotal: 4773,
      inflationAdjusted2026: null, // Calculated dynamically
      vintageTotal2026: 6300,
      modernEquivalentTotal: 6444,
    },

    priceEvolution: [
      { year: 2002, price: 4100, label: 'The Art of Balance era', event: "Shadows Fall's Century Media breakthrough; establishes Tama Starclassic and Sabian HHX/HH rig" },
      { year: 2004, price: 4773, label: 'Original Purchase', event: "The War Within recorded — Shadows Fall's Grammy-nominated NWOAHM breakthrough" },
      { year: 2007, price: 5600, label: 'Threads of Life era', event: 'Same Tama/Sabian/DW rig carries through Shadows Fall\'s continued rise' },
      { year: 2016, price: 6800, label: 'Flotsam & Jetsam era', event: "Shadows Fall disbands (2015); Bittner brings the Tama rig to Flotsam & Jetsam's Dreams of Death" },
      { year: 2017, price: 8900, label: 'Overkill era', event: 'Joins Overkill; switches to Mapex Saturn V shells, Zildjian K & A Custom cymbals, and a Mapex Falcon double pedal' },
      { year: 2024, price: 9800, label: 'Category 7 era', event: 'Same Mapex/Zildjian rig carries into thrash supergroup Category 7' },
      { year: 2026, price: 8278, label: 'Current adjusted', event: 'Inflation-adjusted value of original 2004 setup' },
    ],

    sources: [
      { title: 'Tama Starclassic Performer B/B Catalog', year: 2004, type: 'catalog' },
      { title: 'Modern Drummer — Jason Bittner Interview', year: 2005, type: 'interview' },
      { title: 'Mapex Artist Profiles — Jason Bittner', year: 2017, type: 'manufacturer' },
      { title: 'Reverb Price Guide — Vintage Tama Starclassic Performer', year: 2025, type: 'market' },
    ],

    meta: {
      title: "Jason Bittner 2004 Shadows Fall Drum Setup Cost | The War Within Era Gear Prices",
      description: "How much did Jason Bittner's 2004 Shadows Fall drum kit cost? Original Tama Starclassic setup ~$4,773, inflation-adjusted to ~$8,279 today. Complete The War Within-era gear breakdown.",
      keywords: ['jason bittner drum kit cost', 'shadows fall drummer gear', 'the war within drums cost', 'jason bittner 2004 setup', 'jason bittner tama starclassic price'],
    },
  },

  // Issue #2445: Gear price history batch 16 — Raymond Herrera, Kevin Talley, Tim Yeung
  'raymond-herrera': {
    slug: 'raymond-herrera',
    name: 'Raymond Herrera',
    band: 'Fear Factory',
    iconicYear: 1995,
    era: 'Demanufacture Era',
    albumReference: 'Demanufacture (1995)',
    profileImage: '/images/drummers/raymond-herrera.webp',

    summary: "Raymond Herrera's 1995 setup behind Fear Factory's Demanufacture pioneered a template that industrial and groove metal drummers still study today: a fully acoustic Pearl Reference Series kit fitted end-to-end with ddrum and Roland electronic triggers. Every kick, snare, and tom stroke fired an electronically processed sample alongside the acoustic hit, giving producer Colin Richardson the raw material to build the mechanical, dehumanized drum sound that made Demanufacture the founding document of industrial metal drumming. The complete rig — Pearl Reference Series shells, a Pearl Eliminator double pedal driving Herrera's machine-gun double-kick patterns, Zildjian Z Custom cymbals for cutting projection, and the ddrum/Roland trigger system itself — cost approximately $5,202 in 1995 dollars, equivalent to roughly $11,182 in 2026 after CPI adjustment.\n\nWhat sets Herrera's gear history apart from most 1990s metal drummers is that a meaningful share of that budget went toward electronics rather than shells or cymbals: at $850, the trigger hardware alone represented over 16% of the total rig cost, a category that simply didn't exist in a standard death or thrash metal drummer's budget of the same era. That premium bought Fear Factory its defining sonic signature across Demanufacture and 1998's Obsolete, and it previewed a hybrid acoustic/electronic approach that later became standard across modern metal, djent, and metalcore. Herrera's rig has since consolidated onto Tama — Starclassic shells, Zildjian A Custom and Z Custom cymbals, and a DW 5000 double pedal — dropping the dedicated trigger rack in favor of a more conventional acoustic setup, even as modern trigger modules like the Roland TM-2 make hybrid triggering far more compact and affordable than the rack-mounted brains Herrera ran in 1995.",

    setup: {
      drums: {
        item: 'Pearl Reference Series',
        model: 'Maple shell pack, triggered',
        specs: '22"x18" bass drum (x2, double kick, each fitted with a ddrum trigger), 10"/12" rack toms (triggered), 14"x14"/16"x16" floor toms',
        originalPrice: 2200,
        year: 1995,
        source: 'Pearl Reference Series catalog pricing 1995',
        notes: "The maple shells gave Herrera's triggered hits consistent acoustic response across the full kit — essential for producer Colin Richardson to layer processed samples over the natural attack on Demanufacture's title track and \"Replica.\"",
        vintageValue2026: 3200,
        modernEquivalent: {
          item: 'Tama Starclassic (current Herrera kit)',
          price: 2900,
          link: 'tama-starclassic',
        },
      },
      snare: {
        item: 'Pearl Custom 14"x6.5" Steel',
        model: 'Steel shell, triggered',
        specs: '14"x6.5" steel shell with fitted ddrum trigger sensor',
        originalPrice: 340,
        year: 1995,
        source: 'Pearl Custom snare catalog pricing 1995',
        notes: "The triggered snare was central to Fear Factory's mechanical crack — the acoustic hit layered with an electronically processed sample for the robotic snap that defined the album's sound.",
        vintageValue2026: 520,
        modernEquivalent: {
          item: 'Tama 14"x6.5" Brass (current)',
          price: 300,
          link: 'tama-brass-snare',
        },
      },
      cymbals: {
        item: 'Zildjian Z Custom Series',
        model: 'Full Z Custom configuration',
        specs: '14" Z Custom Hi-Hats, 16"/18" Z Custom Crashes, 20" Z Custom Ride, Z Custom China',
        originalPrice: 1350,
        year: 1995,
        source: 'Zildjian Z Custom catalog pricing 1995',
        notes: "Z Custom's bright, machine-hammered projection cut above Fear Factory's heavily processed, down-tuned guitar wall and held up to Herrera's high-impact touring schedule.",
        vintageValue2026: 1700,
        modernEquivalent: {
          item: 'Zildjian A Custom & Z Custom Series (current)',
          price: 1900,
          link: 'zildjian-a-custom-z-custom',
        },
      },
      hardware: {
        item: 'Pearl Eliminator Double Pedal',
        model: 'Cam-adjustable double bass pedal',
        specs: 'Pearl Eliminator double pedal, hi-hat stand, boom stands, throne',
        originalPrice: 380,
        year: 1995,
        source: 'Pearl hardware catalog pricing 1995',
        notes: "The Eliminator's cam-adjustable action kept both feet's trigger timing consistent — critical when every kick stroke also fired an electronic sample.",
        vintageValue2026: 480,
        modernEquivalent: {
          item: 'DW 5000 Series Double Pedal + Tama Wide Rider Throne (current)',
          price: 520,
          link: 'dw-5000-double-pedal',
        },
      },
      electronics: {
        item: 'ddrum / Roland Trigger System',
        model: 'Full-kit acoustic triggers + brain module',
        specs: 'Kick, snare, and tom triggers routed through a ddrum/Roland trigger module for sample layering',
        originalPrice: 850,
        year: 1995,
        source: 'ddrum and Roland electronic percussion pricing 1995',
        notes: "Herrera's full-kit triggering was unusually extensive for 1995 metal — a genuine 'pioneer of double-kick triggering' cost that had no equivalent line item in a standard thrash or death metal drummer's budget of the same year.",
        vintageValue2026: 500,
        modernEquivalent: {
          item: 'Roland TM-2 Trigger Module',
          price: 700,
          link: 'roland-tm-2-trigger-module',
        },
      },
      sticks: {
        item: 'Vater Power 5B',
        model: 'Power 5B hickory',
        specs: 'Hickory, wood tip, extra mass for high-impact playing',
        originalPrice: 7,
        year: 1995,
        source: 'Standard retail price',
        notes: "Herrera's heavier stick choice for driving both the acoustic shells and the trigger sensors with consistent, repeatable force.",
        vintageValue2026: null,
        modernEquivalent: {
          item: 'Pro-Mark 5A Oak Nylon Tip (current)',
          price: 9,
          link: 'promark-5a-oak-nylon-tip',
        },
      },
      heads: {
        item: 'Remo Pinstripe / Ambassador Coated',
        model: 'Pinstripe (kick/snare batter), Ambassador (toms)',
        specs: 'Remo Pinstripe or Ambassador Coated batter with trigger sensor fitted, Remo Ambassador Clear resonant',
        originalPrice: 75,
        year: 1995,
        source: 'Remo professional pricing 1995',
        notes: 'Controlled-attack heads chosen for consistent trigger sensitivity across the full triggered kit.',
        vintageValue2026: null,
        modernEquivalent: {
          item: 'Attack Drumheads (current)',
          price: 95,
          link: 'attack-drumheads',
        },
      },
    },

    totals: {
      originalTotal: 5202,
      inflationAdjusted2026: null, // Calculated dynamically
      vintageTotal2026: 6400,
      modernEquivalentTotal: 6424,
    },

    priceEvolution: [
      { year: 1992, price: 4300, label: 'Soul of a New Machine era', event: "Early Pearl/ddrum hybrid trigger rig established on Fear Factory's debut" },
      { year: 1995, price: 5202, label: 'Original Purchase', event: "Demanufacture recorded — the founding template of industrial metal's hybrid triggered drum sound" },
      { year: 1998, price: 5900, label: 'Obsolete era', event: 'Rhys Fulber-produced hybrid kit refined further; commercial peak for Fear Factory' },
      { year: 2001, price: 6400, label: 'Digimortal era', event: 'Same Pearl/Zildjian/ddrum rig carries through' },
      { year: 2009, price: 7800, label: 'Arkaea era', event: 'Post-Fear Factory project; gear consolidates toward a more conventional acoustic setup' },
      { year: 2016, price: 9500, label: 'Current Tama era', event: 'Tama Starclassic + Zildjian A/Z Custom becomes Herrera\'s standard rig' },
      { year: 2026, price: 11182, label: 'Current adjusted', event: 'Inflation-adjusted value of original 1995 setup' },
    ],

    sources: [
      { title: 'Pearl Reference Series Catalog', year: 1995, type: 'catalog' },
      { title: 'Rhythm Magazine — Raymond Herrera Interview', year: 1996, type: 'interview' },
      { title: 'ddrum Trigger Systems Archive', year: 1995, type: 'manufacturer' },
      { title: 'Reverb Price Guide — Vintage Pearl Reference Series', year: 2025, type: 'market' },
    ],

    meta: {
      title: "Raymond Herrera 1995 Fear Factory Drum Setup Cost | Demanufacture Era Gear Prices",
      description: "How much did Raymond Herrera's 1995 Fear Factory drum kit cost? Original Pearl Reference Series + ddrum/Roland trigger setup ~$5,202, inflation-adjusted to ~$11,182 today. Complete Demanufacture-era gear breakdown.",
      keywords: ['raymond herrera drum kit price', 'fear factory drummer gear', 'demanufacture drums cost', 'raymond herrera 1995 setup', 'raymond herrera trigger setup cost'],
    },
  },

  'kevin-talley': {
    slug: 'kevin-talley',
    name: 'Kevin Talley',
    band: 'Dying Fetus',
    iconicYear: 2000,
    era: 'Destroy the Opposition Era',
    albumReference: 'Destroy the Opposition (2000)',
    profileImage: '/images/drummers/kevin-talley.webp',

    summary: "Kevin Talley's 2000 setup behind Dying Fetus's Destroy the Opposition shows how a genuinely entry-level rig produced one of brutal death metal's most technically influential recordings. Talley's polyrhythmic double-kick patterns — shifting between straight and triplet groupings at 200+ BPM while the snare held a separate pulse — became a reference point for extreme metal drummers, and he built that reputation on a Pearl Export-tier shell pack, a basic steel snare, Zildjian A/A Custom cymbals, and a standard DW double bass pedal. The complete rig cost approximately $2,846 in 2000 dollars, equivalent to roughly $5,414 in 2026 after CPI adjustment — a genuinely accessible price point for the technical ceiling it helped Talley reach.\n\nThat gap between gear cost and technical output is the throughline of Talley's career: rather than chasing boutique hardware, he carried the same Pearl/Zildjian/DW combination through Misery Index's Retaliate (2003) and Discordia (2006) and Dying Fetus's War of Attrition (2007) — refining touring reliability rather than upgrading tier. Talley's setup has since moved to Pearl Masters Premium Legend shells, Sabian AAX cymbals, and a Pearl Eliminator double pedal, a step up in build quality but still squarely professional-tier rather than custom or boutique gear. For drummers researching how far extreme technique can be pushed on a mid-tier budget, Talley's Destroy the Opposition rig remains one of the clearest documented cases: the blast-speed ceiling was set by technique, not equipment.",

    setup: {
      drums: {
        item: 'Pearl Export Series',
        model: '6-piece double-kick shell pack',
        specs: '22"x18" bass drum (x2, double kick), 10"x8"/12"x9" rack toms, 16"x14"/18"x16" floor toms',
        originalPrice: 1400,
        year: 2000,
        source: 'Pearl Export Series catalog pricing 2000',
        notes: "An entry-level Pearl shell pack, chosen for durable double-kick performance rather than premium tone — the twin 22\" kicks generated the sub-bass mass behind Talley's polyrhythmic patterns on Destroy the Opposition.",
        vintageValue2026: 1900,
        modernEquivalent: {
          item: 'Pearl Masters Premium Legend (current Talley kit)',
          price: 2800,
          link: 'pearl-masters-premium-legend',
        },
      },
      snare: {
        item: 'Pearl Steel Snare 14"x6.5"',
        model: 'Basic steel shell',
        specs: '14"x6.5" steel shell, bright tuning for blast-beat cut',
        originalPrice: 180,
        year: 2000,
        source: 'Pearl snare catalog pricing 2000',
        notes: 'A bright, budget steel snare tuned for explosive crack — the discrete articulation required at 200+ BPM alternating kick-snare patterns.',
        vintageValue2026: 260,
        modernEquivalent: {
          item: 'Pearl Masters 14"x5.5" Maple (current)',
          price: 340,
          link: 'pearl-masters-maple-snare',
        },
      },
      cymbals: {
        item: 'Zildjian A / A Custom Series',
        model: 'Mixed A and A Custom configuration',
        specs: '14" A Custom Hi-Hats, 16"/18" A Custom Crashes, 20" A Medium Ride, 18" A China',
        originalPrice: 900,
        year: 2000,
        source: 'Zildjian A/A Custom catalog pricing 2000',
        notes: "Fast-attacking, controlled-decay cymbals that articulated clearly above Dying Fetus's down-tuned guitars without requiring premium hardware.",
        vintageValue2026: 1150,
        modernEquivalent: {
          item: 'Sabian AAX Series (current)',
          price: 1400,
          link: 'sabian-aax-series',
        },
      },
      hardware: {
        item: 'DW Double Bass Pedal',
        model: 'Chain-drive double pedal + stands',
        specs: 'DW double bass pedal, hi-hat stand, boom stands, throne',
        originalPrice: 300,
        year: 2000,
        source: 'DW hardware catalog pricing 2000',
        notes: "Consistent cam action was the one non-negotiable spec in Talley's budget rig — his polyrhythmic kick patterns depend on mechanical reliability, not tier.",
        vintageValue2026: 380,
        modernEquivalent: {
          item: 'Pearl Eliminator Double Pedal (current)',
          price: 380,
          link: 'pearl-eliminator-double-pedal',
        },
      },
      sticks: {
        item: 'Vic Firth 5B Hickory',
        model: 'American Classic 5B',
        specs: 'Hickory, wood tip',
        originalPrice: 6,
        year: 2000,
        source: 'Standard retail price',
        notes: "Talley's standard heavier 5B for driving through cymbals and heads across extended brutal death metal sets.",
        vintageValue2026: null,
        modernEquivalent: {
          item: 'Vic Firth American Classic 5B (current)',
          price: 14,
          link: 'vic-firth-american-classic-5b',
        },
      },
      heads: {
        item: 'Remo Powerstroke 3 / Coated Ambassador',
        model: 'Powerstroke 3 (kick), Coated Ambassador (snare/toms)',
        specs: 'Remo Powerstroke 3 (kick batter), Remo Coated Ambassador (snare/tom batter)',
        originalPrice: 60,
        year: 2000,
        source: 'Remo professional pricing 2000',
        notes: 'Standard durable Remo configuration for touring reliability rather than boutique tone-shaping.',
        vintageValue2026: null,
        modernEquivalent: {
          item: 'Remo (current)',
          price: 85,
          link: 'remo-heads-pack',
        },
      },
    },

    totals: {
      originalTotal: 2846,
      inflationAdjusted2026: null, // Calculated dynamically
      vintageTotal2026: 3690,
      modernEquivalentTotal: 5019,
    },

    priceEvolution: [
      { year: 1999, price: 2600, label: 'Joins Dying Fetus', event: 'Entry-level Pearl/Zildjian/DW rig established' },
      { year: 2000, price: 2846, label: 'Original Purchase', event: 'Destroy the Opposition recorded — landmark polyrhythmic blast beat brutal death metal album' },
      { year: 2003, price: 3400, label: 'Misery Index era', event: 'Retaliate recorded; same Pearl/Zildjian/DW rig carries into a grindcore-adjacent context' },
      { year: 2007, price: 4400, label: 'War of Attrition era', event: 'Dying Fetus return; most documented touring configuration of the DW-pedal era' },
      { year: 2018, price: 5600, label: 'Current rig era', event: 'Pearl Masters Premium Legend / Sabian AAX / Pearl Eliminator setup established' },
      { year: 2026, price: 5414, label: 'Current adjusted', event: 'Inflation-adjusted value of original 2000 setup' },
    ],

    sources: [
      { title: 'Pearl Export Series Catalog', year: 2000, type: 'catalog' },
      { title: 'Blabbermouth — Kevin Talley Gear Interview', year: 2008, type: 'interview' },
      { title: 'Pearl Artist Profiles — Kevin Talley', year: 2018, type: 'manufacturer' },
      { title: 'Reverb Price Guide — Vintage Pearl Export/Masters', year: 2025, type: 'market' },
    ],

    meta: {
      title: "Kevin Talley 2000 Dying Fetus Drum Setup Cost | Destroy the Opposition Era Gear Prices",
      description: "How much did Kevin Talley's 2000 Dying Fetus drum kit cost? Original entry-level Pearl/Zildjian/DW setup ~$2,846, inflation-adjusted to ~$5,414 today. Complete Destroy the Opposition-era gear breakdown.",
      keywords: ['kevin talley drum setup', 'dying fetus drummer gear', 'destroy the opposition drums cost', 'kevin talley 2000 setup', 'kevin talley drum kit price'],
    },
  },

  'tim-yeung': {
    slug: 'tim-yeung',
    name: 'Tim Yeung',
    band: 'Hate Eternal',
    iconicYear: 2005,
    era: 'I, Monarch Era',
    albumReference: 'Hate Eternal - I, Monarch (2005)',
    profileImage: '/images/drummers/tim-yeung.webp',

    summary: "Tim Yeung's 2005 setup behind Hate Eternal's I, Monarch documents one of technical death metal's fastest and most cited drum performances — a Pearl Reference Series kit, Sabian AAX cymbals, and a DW double bass pedal assembled to sustain 200-280 BPM blast beats without the technique degrading over a full album. Recorded under Erik Rutan at the height of Hate Eternal's technical peak, I, Monarch and its 2008 follow-up Fury & Flames established Yeung as one of the genre's most technically studied drummers. The complete rig cost approximately $4,377 in 2005 dollars, equivalent to roughly $7,342 in 2026 after CPI adjustment — a professional-tier extreme metal setup rather than a boutique custom build.\n\nYeung's technique — relaxed, rebound-based footwork rather than tension-based power striking — is the reason his gear history reads as a study in speed-per-dollar rather than raw investment: the DW double bass pedal's smooth, predictable cam action mattered more to his output than shell tier or custom finishes. That same Pearl/Sabian/DW combination carried through his 2011 arrival in Morbid Angel for Illud Divinum Insanus and into 2017's Kingdoms Disdained, by which point his rig had evolved to Tama Starclassic Bubinga shells, a Tama S.L.P. Big Black Steel snare, and a Tama Speed Cobra 910 double pedal — an upgrade in construction quality that still serves the same underlying principle: mechanical consistency in service of some of the fastest documented BPMs in recorded death metal.",

    setup: {
      drums: {
        item: 'Pearl Reference Series',
        model: 'Maple/mahogany hybrid shell pack, developing configuration',
        specs: '22"x18" bass drum (x2, double kick), 10"x8"/12"x9" rack toms, 16"x14"/18"x16" floor toms',
        originalPrice: 2600,
        year: 2005,
        source: 'Pearl Reference Series catalog pricing 2005',
        notes: "The twin 22\" kicks gave Yeung's double bass patterns the sub-bass mass needed to sustain 200+ BPM without individual strokes blurring into a wash — foundational to his fastest documented performances.",
        vintageValue2026: 3400,
        modernEquivalent: {
          item: 'Tama Starclassic Bubinga (current Yeung kit)',
          price: 3300,
          link: 'tama-starclassic-bubinga',
        },
      },
      snare: {
        item: 'Pearl Steel Snare 14"x6.5"',
        model: 'Steel shell, bright tuning',
        specs: '14"x6.5" steel shell, bright tuning for Erik Rutan\'s production context',
        originalPrice: 260,
        year: 2005,
        source: 'Pearl snare catalog pricing 2005',
        notes: 'A bright, fast-articulating snare tuned to cut through Hate Eternal\'s dense technical death metal arrangements at blast beat tempo.',
        vintageValue2026: 380,
        modernEquivalent: {
          item: 'Tama S.L.P. Big Black Steel 14"x6.5" (current)',
          price: 340,
          link: 'tama-slp-big-black-steel',
        },
      },
      cymbals: {
        item: 'Sabian AAX Series',
        model: 'Full AAX configuration',
        specs: '14" AAX Hi-Hats, 16"/18" AAX Crashes, 20" HHX Ride, 18" AAX China',
        originalPrice: 1100,
        year: 2005,
        source: 'Sabian AAX catalog pricing 2005',
        notes: "Fast-attacking, controlled-decay cymbals that articulate cleanly at Yeung's 250+ BPM hi-hat pulse without blurring into overlapping sustain.",
        vintageValue2026: 1350,
        modernEquivalent: {
          item: 'Sabian AAX & HHX Series (current)',
          price: 1500,
          link: 'sabian-aax-hhx-series',
        },
      },
      hardware: {
        item: 'DW Double Bass Pedal',
        model: 'Direct-drive double pedal + stands',
        specs: 'DW double bass pedal, hi-hat stand, boom stands, throne',
        originalPrice: 340,
        year: 2005,
        source: 'DW hardware catalog pricing 2005',
        notes: "Smooth, predictable cam action that rewarded Yeung's relaxed, rebound-based double-kick technique rather than tension-based power striking.",
        vintageValue2026: 420,
        modernEquivalent: {
          item: 'Tama Speed Cobra 910 Double Pedal (current)',
          price: 460,
          link: 'tama-speed-cobra-910-double-pedal',
        },
      },
      sticks: {
        item: 'Vic Firth American Classic 5A',
        model: 'American Classic 5A',
        specs: 'Hickory, wood tip',
        originalPrice: 7,
        year: 2005,
        source: 'Standard retail price',
        notes: "Yeung's standard stick choice, balanced for extended blast beat sets without excessive fatigue.",
        vintageValue2026: null,
        modernEquivalent: {
          item: 'Vic Firth American Classic 5A (current)',
          price: 10,
          link: 'vic-firth-american-classic-5a',
        },
      },
      heads: {
        item: 'Remo Powerstroke 3 / Emperor Coated',
        model: 'Powerstroke 3 (kick), Emperor Coated (toms)',
        specs: 'Remo Powerstroke 3 (kick batter), Remo Emperor Coated (tom batter), Remo Coated Ambassador (snare batter)',
        originalPrice: 70,
        year: 2005,
        source: 'Remo professional pricing 2005',
        notes: 'Two-ply durability chosen for extended technical death metal touring at extreme double-kick tempos.',
        vintageValue2026: null,
        modernEquivalent: {
          item: 'Evans (current)',
          price: 95,
          link: 'evans-heads-pack',
        },
      },
    },

    totals: {
      originalTotal: 4377,
      inflationAdjusted2026: null, // Calculated dynamically
      vintageTotal2026: 5550,
      modernEquivalentTotal: 5705,
    },

    priceEvolution: [
      { year: 1999, price: 3200, label: 'Conquering the Throne era', event: "Hate Eternal debut — Yeung's recording debut and technical death metal breakout" },
      { year: 2005, price: 4377, label: 'Original Purchase', event: 'I, Monarch recorded — extreme double bass speed establishes the Pearl/Sabian/DW rig' },
      { year: 2008, price: 5100, label: 'Fury & Flames era', event: 'Technical death metal peak; widely cited blast beat benchmark recording' },
      { year: 2011, price: 5900, label: 'Morbid Angel era', event: 'Joins Morbid Angel for Illud Divinum Insanus' },
      { year: 2017, price: 6900, label: 'Kingdoms Disdained era', event: 'Tama Starclassic Bubinga + Speed Cobra 910 current rig established' },
      { year: 2026, price: 7342, label: 'Current adjusted', event: 'Inflation-adjusted value of original 2005 setup' },
    ],

    sources: [
      { title: 'Pearl Reference Series Catalog', year: 2005, type: 'catalog' },
      { title: 'Blabbermouth — Tim Yeung Gear Interview', year: 2009, type: 'interview' },
      { title: 'Tama Artist Profiles — Tim Yeung', year: 2017, type: 'manufacturer' },
      { title: 'Reverb Price Guide — Vintage Pearl Reference Series', year: 2025, type: 'market' },
    ],

    meta: {
      title: "Tim Yeung 2005 Hate Eternal Drum Setup Cost | I, Monarch Era Gear Prices",
      description: "How much did Tim Yeung's 2005 Hate Eternal drum kit cost? Original Pearl/Sabian/DW extreme death metal rig ~$4,377, inflation-adjusted to ~$7,342 today. Complete I, Monarch-era gear breakdown.",
      keywords: ['tim yeung fastest drummer gear', 'hate eternal drummer setup', 'tim yeung drum kit cost', 'i monarch drums', 'tim yeung 2005 setup'],
    },
  },

  // ==========================================
  // ABE CUNNINGHAM - 2000 White Pony Era
  // Issue #3219: Gear Price History (batch 29)
  // Pearl Custom / Zildjian K Setup
  // ==========================================
  'abe-cunningham': {
    slug: 'abe-cunningham',
    name: 'Abe Cunningham',
    band: 'Deftones',
    iconicYear: 2000,
    era: 'White Pony Era',
    albumReference: 'White Pony (2000)',
    profileImage: '/images/drummers/abe-cunningham.webp',

    summary: "Abe Cunningham's 2000 setup behind Deftones' White Pony documents the moment his drumming shifted from nu-metal aggression to something more spacious and atmospheric. Cunningham switched from the ddrum kit he'd used since the band's 1988 Sacramento founding to a Pearl Custom Series maple shell pack, paired with a Pearl Free-Floating Brass snare and darker Zildjian K Series cymbals in place of the brighter A Custom set from Around the Fur — a deliberate move toward warmth and dynamic range as the band's songwriting grew more textured. White Pony went on to win the Grammy Award for Best Metal Performance ('Elite') in 2001 and is widely regarded as Deftones' artistic high-water mark. The complete rig cost approximately $7,898 in 2000 dollars, equivalent to roughly $15,025 in 2026 after CPI adjustment.\n\nWhat makes the White Pony kit significant is how directly the gear served the songwriting shift. The Pearl Custom maple shells gave Cunningham a rounder, more resonant tone than the ddrum kit's punchier attack, letting tracks like 'Digital Bath' and 'Teenager' breathe in a way nu-metal drumming rarely allowed. The Pearl Free-Floating Brass snare's free-floating lug system maximized resonance and sensitivity, supporting a dynamic range that stretched from near-silent verses to full-volume choruses without retuning. Paired with a Pearl Eliminator double pedal for precise, controllable footwork, the setup let Cunningham prioritize space and groove over sheer force — a philosophy he's carried through every subsequent Deftones era.\n\nCunningham didn't stay on Pearl for long: he switched to a Gretsch USA Custom kit for the Saturday Night Wrist and Diamond Eyes years (2003–2012) before returning to Pearl with the flagship Reference Series for Koi No Yokan, Gore, and Ohms. But the White Pony configuration — the kit that turned Deftones from nu-metal contenders into critical darlings — remains the most searched and most historically cited setup of his 35-plus year career. A $7,898 investment in 2000 now represents roughly $15,025 in 2026 purchasing power, tracking both general inflation and the collector interest in vintage Pearl Custom shells from alternative metal's turn-of-the-millennium peak.",

    setup: {
      drums: {
        item: 'Pearl Custom Series',
        model: 'Maple shell pack',
        specs: '22"x18" kick, 10"x8"/12"x10"/14"x12" rack toms, 16"x16" floor tom',
        originalPrice: 3200,
        year: 2000,
        source: 'Pearl Custom Series catalog MSRP 2000, Modern Drummer archive estimates',
        notes: "Switched from ddrum to Pearl Custom for White Pony — the maple shells gave Cunningham a warmer, more resonant tone suited to the album's atmospheric arrangements and Terry Date's layered production.",
        vintageValue2026: 4200,
        modernEquivalent: {
          item: 'Pearl Reference Series (current Cunningham kit)',
          price: 4800,
          link: 'pearl-reference-series-drums',
        },
      },
      snare: {
        item: 'Pearl Free-Floating Brass 14"x6.5"',
        model: 'Free-floating brass shell',
        specs: '14"x6.5" brass shell, free-floating lug system',
        originalPrice: 550,
        year: 2000,
        source: 'Pearl Free-Floating snare catalog pricing 2000',
        notes: "Warm, full brass tone that supported White Pony's dynamic range — from whisper-quiet passages to full-volume peaks — without needing to retune between sections.",
        vintageValue2026: 800,
        modernEquivalent: {
          item: 'Pearl Free-Floating Brass 14"x6.5" (current)',
          price: 650,
          link: 'pearl-free-floating-brass-snare',
        },
      },
      cymbals: {
        item: 'Zildjian K Series',
        model: 'Dark K Series configuration',
        specs: '14" K Hi-Hats, 16"/18" K Crashes, 20" K Ride',
        originalPrice: 2850,
        year: 2000,
        source: 'Zildjian K Series catalog pricing 2000',
        notes: "Switched from the brighter A Custom cymbals of the Around the Fur era to darker, more complex Zildjian K — suited to White Pony's textured, atmospheric sound design.",
        vintageValue2026: 3400,
        modernEquivalent: {
          item: 'Zildjian K Custom Dark Series (current Cunningham setup)',
          price: 3200,
          link: 'zildjian-k-custom-dark-series',
        },
      },
      hardware: {
        item: 'Pearl Eliminator Double Pedal + Hardware',
        model: 'Multi-cam double pedal, stands, throne',
        specs: 'Pearl Eliminator double pedal, hi-hat stand, 4 boom cymbal stands, snare stand, throne',
        originalPrice: 1200,
        year: 2000,
        source: 'Pearl hardware catalog pricing 2000',
        notes: "Precise, adjustable double pedal that allowed the subtle foot work White Pony's nuanced arrangements required, replacing the simpler DW 5000 from the nu-metal years.",
        vintageValue2026: 1500,
        modernEquivalent: {
          item: 'Pearl Demon Drive + hardware pack',
          price: 1400,
          link: 'pearl-demon-drive-double-pedal',
        },
      },
      sticks: {
        item: 'Vic Firth 5A',
        model: 'American Classic 5A',
        specs: 'Hickory, wood tip',
        originalPrice: 8,
        year: 2000,
        source: 'Standard retail price',
        notes: "Switched to lighter 5A from the heavier 5B of the nu-metal years — more appropriate for the dynamic, atmospheric drumming White Pony's quieter passages required.",
        vintageValue2026: null,
        modernEquivalent: {
          item: 'Vater 5A (current)',
          price: 12,
          link: 'vater-5a',
        },
      },
      heads: {
        item: 'Remo Emperor / Coated Ambassador',
        model: 'Emperor toms, coated snare batter',
        specs: 'Remo Emperor clear (toms), Coated Ambassador (snare batter)',
        originalPrice: 90,
        year: 2000,
        source: 'Remo professional pricing 2000',
        notes: "Coated snare head for warmer, more controlled attack across White Pony's full dynamic range.",
        vintageValue2026: null,
        modernEquivalent: {
          item: 'Remo Emperor Pro Pack',
          price: 120,
          link: 'remo-emperor-pack',
        },
      },
    },

    totals: {
      originalTotal: 7898,
      inflationAdjusted2026: null, // Calculated dynamically
      vintageTotal2026: 9900,
      modernEquivalentTotal: 10182,
    },

    priceEvolution: [
      { year: 1995, price: 4000, label: 'Adrenaline era', event: 'Deftones major label debut; ddrum kit and Zildjian A Series established' },
      { year: 1997, price: 5500, label: 'Around the Fur era', event: 'Nu-metal breakthrough; expanded ddrum setup and A Custom cymbals' },
      { year: 2000, price: 7898, label: 'Original Purchase', event: 'White Pony recorded — switch to Pearl Custom and Zildjian K' },
      { year: 2001, price: 8200, label: 'Grammy win', event: "White Pony wins Best Metal Performance for 'Elite'" },
      { year: 2010, price: 10500, label: 'Diamond Eyes era', event: 'Gretsch USA Custom kit era in full swing' },
      { year: 2020, price: 13800, label: 'Ohms era', event: 'Pearl Reference Series and Roland SPD-SX electronics established' },
      { year: 2026, price: 15025, label: 'Current adjusted', event: 'Inflation-adjusted value of original 2000 setup' },
    ],

    sources: [
      { title: 'Pearl Custom Series Catalog', year: 2000, type: 'catalog' },
      { title: 'Modern Drummer — Abe Cunningham Interview', year: 2001, type: 'interview' },
      { title: 'Zildjian Artist Profiles — K Series Era', year: 2000, type: 'manufacturer' },
      { title: 'Reverb Price Guide — Vintage Pearl Custom Series', year: 2025, type: 'market' },
    ],

    meta: {
      title: "Abe Cunningham 2000 Deftones Drum Setup Cost | White Pony Era Gear Prices",
      description: "How much did Abe Cunningham's 2000 Deftones drum kit cost? Original Pearl Custom/Zildjian K setup ~$7,898, inflation-adjusted to ~$15,025 today. Complete White Pony-era gear breakdown.",
      keywords: ['abe cunningham drum kit cost', 'deftones drummer gear history', 'white pony drums cost', 'abe cunningham 2000 setup', 'deftones drum kit cost'],
    },
  },

  // ==========================================
  // JAY WEINBERG - 2019 We Are Not Your Kind Era
  // Issue #3219: Gear Price History (batch 29)
  // SJC Custom / Zildjian K Custom Setup
  // ==========================================
  'jay-weinberg': {
    slug: 'jay-weinberg',
    name: 'Jay Weinberg',
    band: 'Slipknot',
    iconicYear: 2019,
    era: 'We Are Not Your Kind Era',
    albumReference: 'We Are Not Your Kind (2019)',
    profileImage: '/images/drummers/jay-weinberg.webp',

    summary: "Jay Weinberg's 2019 setup behind Slipknot's We Are Not Your Kind marks the point where his rig fully matured beyond the production-line Pearl Reference Pure he debuted on .5: The Gray Chapter (2014). By We Are Not Your Kind — Slipknot's chart-topping, critically acclaimed fifth album — Weinberg had moved to a boutique SJC Custom Drums shell pack finished to match the band's visual identity, switched his snare to a Tama SLP for a more focused crack, and traded the brighter Zildjian A series for the darker, more complex K Custom series. The complete rig cost approximately $6,592 in 2019 dollars, equivalent to roughly $8,446 in 2026 after CPI adjustment.\n\nThe gear shift tracked directly with the album's heavier, more atmospheric production. The custom-built SJC kit's maple shells, finished in a Slipknot-themed wrap, gave Weinberg a fuller low end than the Pearl production shells he'd used on .5: The Gray Chapter, while the Tama SLP snare's steel/brass hybrid construction delivered the immediate attack needed to register the ghost notes he'd developed from his hardcore touring background. The K Custom cymbal set — 14\" hi-hats, 17\"/19\" dark crashes, a 20\" ride, 18\" China, and 10\" splash — replaced the bright A series entirely, giving tracks like 'Unsainted' and 'Solway Firth' a weightier low-mid presence that matched the record's darker tone. Vater became his stick brand during this era, replacing the Vic Firth signature model from the Gray Chapter years.\n\nWeinberg carried the SJC/K Custom platform through The End, So Far (2022) with added Roland trigger integration before his December 2023 departure from Slipknot. He took the same SJC foundation into Suicidal Tendencies, building it out around his first full signature snare — the SJC 'The Crucible' — and an expanded Zildjian arsenal. But the We Are Not Your Kind configuration remains the setup most associated with his nine-year Slipknot tenure and the most searched entry point for 'jay weinberg slipknot drum kit' queries. A $6,592 investment in 2019 now represents roughly $8,446 in 2026 purchasing power.",

    setup: {
      drums: {
        item: 'SJC Custom Drums',
        model: 'Custom Slipknot-themed shell pack, maple',
        specs: 'Double 22"x18" bass drums, four rack toms, two floor toms',
        originalPrice: 3000,
        year: 2019,
        source: 'SJC Custom Drums boutique pricing 2019, Modern Drummer archive estimates',
        notes: "Switched from production Pearl Reference Pure shells to a boutique, hand-built SJC kit finished to match Slipknot's stage aesthetic — a hallmark of the We Are Not Your Kind era.",
        vintageValue2026: 3600,
        modernEquivalent: {
          item: 'SJC Custom Drums (OBEY x ST Collaboration Kit, current Weinberg kit)',
          price: 4200,
          link: 'sjc-custom-drums-collaboration',
        },
      },
      snare: {
        item: 'Tama SLP (Sound Lab Project) 14"x6.5"',
        model: 'Steel/brass SLP model',
        specs: '14"x6.5" steel/brass hybrid shell',
        originalPrice: 450,
        year: 2019,
        source: 'Tama SLP catalog pricing 2019',
        notes: "Boutique Tama snare chosen for immediate attack and controlled sustain — sensitive enough to register the ghost notes Weinberg developed from his hardcore background.",
        vintageValue2026: 550,
        modernEquivalent: {
          item: 'SJC Jay Weinberg "The Crucible" 14"x6.5" (current signature snare)',
          price: 750,
          link: 'sjc-the-crucible-snare',
        },
      },
      cymbals: {
        item: 'Zildjian K Custom Series',
        model: 'Dark configuration',
        specs: '14" K Custom Hi-Hats, 17"/19" K Custom Dark Crashes, 20" K Custom Ride, 18" K Custom China, 10" Splash',
        originalPrice: 2100,
        year: 2019,
        source: 'Zildjian K Custom catalog pricing 2019',
        notes: "Darker, more complex B20 alloy replacing the brighter A series — matched to We Are Not Your Kind's heavier, more atmospheric sound.",
        vintageValue2026: 2500,
        modernEquivalent: {
          item: 'Zildjian A New Beat / A Custom / K Custom / K China blend (current setup)',
          price: 2800,
          link: 'zildjian-jay-weinberg-current-set',
        },
      },
      hardware: {
        item: 'DW 9000 Series Double Bass Pedal + Hardware',
        model: 'Dual-chain drive double pedal, stands',
        specs: 'DW 9000 double bass pedal, hi-hat stand, boom stands, throne',
        originalPrice: 950,
        year: 2019,
        source: 'DW hardware catalog pricing 2019',
        notes: 'Carried forward from the Gray Chapter era — no change to his core pedal setup, a consistent platform across his Slipknot tenure.',
        vintageValue2026: 1100,
        modernEquivalent: {
          item: 'DW 9000 Series Double Pedal + DW 9100 Throne (current)',
          price: 1300,
          link: 'dw-9000-double-pedal-9100-throne',
        },
      },
      sticks: {
        item: 'Vater 5A',
        model: 'American hickory',
        specs: 'Hickory, wood tip',
        originalPrice: 7,
        year: 2019,
        source: 'Standard retail price',
        notes: 'Switched from Vic Firth to Vater during this era, ahead of his own signature model that would follow with Suicidal Tendencies.',
        vintageValue2026: null,
        modernEquivalent: {
          item: 'Vater Jay Weinberg 908 Signature (current)',
          price: 14,
          link: 'vater-jay-weinberg-908-signature',
        },
      },
      heads: {
        item: 'Evans Hybrid / G2 Coated',
        model: 'Balanced attack and warmth batters',
        specs: 'Evans Hybrid (kick), G2 Coated (toms and snare)',
        originalPrice: 85,
        year: 2019,
        source: 'Evans professional pricing 2019',
        notes: "Upgraded head models from the EC2/EMAD configuration of the Gray Chapter era, matched to We Are Not Your Kind's production.",
        vintageValue2026: null,
        modernEquivalent: {
          item: 'Evans Black Chrome (current)',
          price: 110,
          link: 'evans-black-chrome-pack',
        },
      },
    },

    totals: {
      originalTotal: 6592,
      inflationAdjusted2026: null, // Calculated dynamically
      vintageTotal2026: 7750,
      modernEquivalentTotal: 9174,
    },

    priceEvolution: [
      { year: 2013, price: 4500, label: 'Gray Chapter era', event: 'Joins Slipknot; debuts on Pearl Reference Pure' },
      { year: 2019, price: 6592, label: 'Original Purchase', event: 'We Are Not Your Kind recorded — switch to SJC Custom and Zildjian K Custom' },
      { year: 2022, price: 7300, label: 'The End, So Far era', event: 'Roland trigger integration added for hybrid live show' },
      { year: 2023, price: 8500, label: 'Suicidal Tendencies era', event: 'Departs Slipknot; joins Suicidal Tendencies with SJC "The Crucible" signature snare' },
      { year: 2026, price: 8446, label: 'Current adjusted', event: 'Inflation-adjusted value of original 2019 setup' },
    ],

    sources: [
      { title: 'SJC Custom Drums Boutique Pricing', year: 2019, type: 'catalog' },
      { title: 'DRUM! Magazine — Jay Weinberg Interview', year: 2019, type: 'interview' },
      { title: 'Zildjian Artist Profiles — K Custom Era', year: 2019, type: 'manufacturer' },
      { title: 'Reverb Price Guide — SJC Custom Drums', year: 2025, type: 'market' },
    ],

    meta: {
      title: "Jay Weinberg 2019 Slipknot Drum Setup Cost | We Are Not Your Kind Era Gear Prices",
      description: "How much did Jay Weinberg's 2019 Slipknot drum kit cost? Original SJC/Zildjian K Custom setup ~$6,592, inflation-adjusted to ~$8,446 today. Complete We Are Not Your Kind-era gear breakdown.",
      keywords: ['jay weinberg drum kit cost', 'slipknot drummer gear history', 'we are not your kind drums cost', 'jay weinberg 2019 setup', 'jay weinberg slipknot drum kit'],
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
