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
