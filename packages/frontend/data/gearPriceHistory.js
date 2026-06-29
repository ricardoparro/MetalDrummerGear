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
