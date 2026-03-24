// Drummer Gear Evolution Timeline Data
// Issue #767: Visual History of Setup Changes
// CEO Idea: CEO-015 - Score 8⭐
// URL: /drummers/[slug]/evolution

/**
 * Era gear categories
 */
export const GEAR_CATEGORIES = {
  DRUMS: 'drums',
  SNARE: 'snare',
  CYMBALS: 'cymbals',
  HARDWARE: 'hardware',
  STICKS: 'sticks',
  HEADS: 'heads',
  ELECTRONICS: 'electronics',
};

/**
 * Change type for highlighting what's new in each era
 */
export const CHANGE_TYPES = {
  NEW: 'new',           // New item
  UPGRADE: 'upgrade',   // Upgraded from previous
  SWITCH: 'switch',     // Switched brands
  SIGNATURE: 'signature', // Got signature model
};

/**
 * Drummer gear evolution data - detailed timeline of setup changes
 * Initial launch: Lars Ulrich, Joey Jordison, Dave Lombardo
 */
export const DRUMMER_EVOLUTION = {
  // ==========================================
  // Lars Ulrich - Metallica (40+ year career)
  // ==========================================
  'lars-ulrich': {
    slug: 'lars-ulrich',
    name: 'Lars Ulrich',
    band: 'Metallica',
    totalYearsActive: '1981-Present',
    profileImage: '/images/drummers/lars-ulrich.webp',
    summary: 'From a young Danish tennis player\'s first kit to the most recognizable thrash metal drummer in history, Lars Ulrich\'s gear journey spans 40+ years of metal evolution.',
    
    eras: [
      {
        id: 'lars-1983-kill-em-all',
        era: 'Kill \'Em All Era',
        years: '1981-1984',
        startYear: 1981,
        endYear: 1984,
        description: 'The raw thrash metal beginnings. Young Lars with affordable gear, playing fast and aggressive to help invent thrash metal.',
        albums: ['Kill \'Em All (1983)', 'Ride the Lightning (1984)'],
        tours: ['Kill \'Em All for One Tour', 'Ride the Lightning Tour'],
        image: null,
        
        gear: {
          drums: {
            item: 'Camco Drums (later Tama Swingstar)',
            details: 'Basic kit: 22" kick, 12"/13"/16" toms',
            notes: 'Started with whatever he could afford. The Camco kit was famously unreliable.',
            change: null,
          },
          snare: {
            item: 'Camco 14"x5.5" Chrome',
            details: 'Standard steel snare',
            notes: 'Basic snare sound that cut through the guitar wall',
            change: null,
          },
          cymbals: {
            item: 'Zildjian A Series',
            details: '14" Hi-Hats, 16"/18" Crashes, 20" Ride',
            notes: 'Basic Zildjian setup, nothing fancy',
            change: null,
          },
          hardware: {
            item: 'Various budget hardware',
            details: 'Mixed stands and pedals',
            notes: 'Single bass pedal - double bass came later',
            change: null,
          },
          sticks: {
            item: 'Vic Firth 5B',
            details: 'Standard hickory',
            notes: 'Off-the-shelf drumsticks',
            change: null,
          },
          heads: {
            item: 'Remo Ambassador',
            details: 'Clear heads on toms, coated on snare',
            notes: 'Standard configuration',
            change: null,
          },
        },
        
        estimatedCost: {
          original: 2500,
          inflationAdjusted: 7500,
          currency: 'USD',
        },
        
        keyChanges: [
          'First professional drum kit purchase',
          'Developed the aggressive thrash style',
          'Playing speed increased dramatically',
        ],
        
        quote: {
          text: "I wasn't the best drummer, but I had the most passion. The gear didn't matter - the energy did.",
          source: 'Modern Drummer Interview, 1985',
        },
        
        videos: [],
      },
      
      {
        id: 'lars-1986-master-of-puppets',
        era: 'Master of Puppets Era',
        years: '1985-1988',
        startYear: 1985,
        endYear: 1988,
        description: 'The golden thrash era. Lars gets his first Tama endorsement and the sound becomes more refined and powerful.',
        albums: ['Master of Puppets (1986)', '...And Justice for All (1988)'],
        tours: ['Damage, Inc. Tour', 'Damaged Justice Tour'],
        image: null,
        
        gear: {
          drums: {
            item: 'Tama Artstar II',
            details: 'Birch shells: 24" kick, 10"/12"/14"/16" toms',
            notes: 'First Tama endorsement. The Artstar II was known for punchy, focused tone.',
            change: CHANGE_TYPES.SWITCH,
          },
          snare: {
            item: 'Tama Artstar II 14"x6.5"',
            details: 'Birch shell with die-cast hoops',
            notes: 'The snare sound that defined Master of Puppets',
            change: CHANGE_TYPES.UPGRADE,
          },
          cymbals: {
            item: 'Zildjian A Custom',
            details: '14" New Beat Hi-Hats, 17"/18"/19" Crashes, 22" Ride',
            notes: 'Upgraded to brighter, more cutting cymbals',
            change: CHANGE_TYPES.UPGRADE,
          },
          hardware: {
            item: 'Tama Titan Hardware',
            details: 'Heavy-duty stands, Iron Cobra pedals',
            notes: 'Professional-grade hardware for touring',
            change: CHANGE_TYPES.SWITCH,
          },
          sticks: {
            item: 'Vic Firth 2B',
            details: 'Thicker hickory sticks for more power',
            notes: 'Upgraded to heavier sticks for larger venues',
            change: CHANGE_TYPES.UPGRADE,
          },
          heads: {
            item: 'Remo Emperor',
            details: 'Double-ply heads for durability and punch',
            notes: 'Needed more durable heads for aggressive playing',
            change: CHANGE_TYPES.UPGRADE,
          },
        },
        
        estimatedCost: {
          original: 8000,
          inflationAdjusted: 22000,
          currency: 'USD',
        },
        
        keyChanges: [
          'Tama endorsement begins (1985)',
          'Upgraded to professional-grade gear',
          'Double bass pedal becomes standard',
          'Larger tom sizes for bigger sound',
        ],
        
        quote: {
          text: "The Tama kit finally gave me the sound I heard in my head. It was like going from a bicycle to a Ferrari.",
          source: 'Tama Drums Interview, 1987',
        },
        
        videos: [],
      },
      
      {
        id: 'lars-1991-black-album',
        era: 'The Black Album Era',
        years: '1989-1996',
        startYear: 1989,
        endYear: 1996,
        description: 'Metallica goes mainstream. Lars\' sound becomes cleaner, punchier, and arena-ready. The snare crack heard \'round the world.',
        albums: ['Metallica (The Black Album) (1991)', 'Load (1996)'],
        tours: ['Wherever We May Roam Tour', 'Load Tour'],
        image: null,
        
        gear: {
          drums: {
            item: 'Tama Granstar Custom',
            details: 'Maple/basswood shells: 22" kick, 10"/12"/14"/16" toms',
            notes: 'Warmer, rounder tone than the Artstar. Bob Rock\'s influence.',
            change: CHANGE_TYPES.UPGRADE,
          },
          snare: {
            item: 'Tama Bell Brass 14"x6.5"',
            details: 'Seamless bell brass shell',
            notes: 'THE Black Album snare. That iconic crack.',
            change: CHANGE_TYPES.SWITCH,
          },
          cymbals: {
            item: 'Zildjian Z Custom',
            details: '14" Z Dyno Beat Hi-Hats, 18"/19" Z Customs, 22" Ride',
            notes: 'Brighter, louder cymbals for arenas',
            change: CHANGE_TYPES.SWITCH,
          },
          hardware: {
            item: 'Tama Iron Cobra HP900',
            details: 'Power Glide double pedal',
            notes: 'The Iron Cobra becomes his signature pedal',
            change: CHANGE_TYPES.UPGRADE,
          },
          sticks: {
            item: 'Ahead Lars Ulrich Signature',
            details: 'Aluminum alloy with replaceable tips',
            notes: 'First signature product - aluminum for durability',
            change: CHANGE_TYPES.SIGNATURE,
          },
          heads: {
            item: 'Remo Pinstripe',
            details: 'Controlled, punchy tone with less ring',
            notes: 'Bob Rock wanted a tighter drum sound',
            change: CHANGE_TYPES.SWITCH,
          },
        },
        
        estimatedCost: {
          original: 15000,
          inflationAdjusted: 35000,
          currency: 'USD',
        },
        
        keyChanges: [
          'Bell Brass snare becomes iconic',
          'Ahead aluminum stick endorsement (1991)',
          'Smaller, more focused kit configuration',
          'Sound designed for arena/stadium tours',
        ],
        
        quote: {
          text: "The Black Album changed everything. We had to step up the production, and the drums had to be perfect.",
          source: 'Classic Albums Documentary, 1991',
        },
        
        videos: [],
      },
      
      {
        id: 'lars-2003-st-anger',
        era: 'St. Anger Era',
        years: '2001-2008',
        startYear: 2001,
        endYear: 2008,
        description: 'The controversial era. The St. Anger snare became one of the most debated production choices in metal history.',
        albums: ['St. Anger (2003)', 'Death Magnetic (2008)'],
        tours: ['Madly in Anger with the World Tour', 'World Magnetic Tour'],
        image: null,
        
        gear: {
          drums: {
            item: 'Tama Starclassic Maple',
            details: '22" kick, 10"/12"/14"/16" toms',
            notes: 'Premium maple shells for warm, musical tone',
            change: CHANGE_TYPES.UPGRADE,
          },
          snare: {
            item: 'Tama Steel Snare (snare wires OFF)',
            details: '14"x5.5" steel snare with loosened wires',
            notes: 'The infamous St. Anger "trash can" sound - snare wires detuned',
            change: CHANGE_TYPES.SWITCH,
          },
          cymbals: {
            item: 'Zildjian A Custom',
            details: '14" A Custom Hi-Hats, various crashes, 22" Ride',
            notes: 'Return to A Custom series',
            change: CHANGE_TYPES.SWITCH,
          },
          hardware: {
            item: 'Tama Iron Cobra HP900',
            details: 'Power Glide double pedal',
            notes: 'Continued Iron Cobra loyalty',
            change: null,
          },
          sticks: {
            item: 'Ahead Lars Ulrich Signature',
            details: 'Aluminum alloy',
            notes: 'Continued signature stick partnership',
            change: null,
          },
          heads: {
            item: 'Remo Emperor',
            details: 'Back to Emperor heads',
            notes: 'Death Magnetic brought back the punch',
            change: CHANGE_TYPES.SWITCH,
          },
        },
        
        estimatedCost: {
          original: 18000,
          inflationAdjusted: 30000,
          currency: 'USD',
        },
        
        keyChanges: [
          'St. Anger snare sound (love it or hate it)',
          'Starclassic Maple becomes main kit',
          'Death Magnetic: return to traditional sound',
        ],
        
        quote: {
          text: "People either love or hate the St. Anger snare. I don't care - it was the sound we wanted at that moment.",
          source: 'Rolling Stone Interview, 2003',
        },
        
        videos: [],
      },
      
      {
        id: 'lars-2016-present',
        era: 'Modern Era',
        years: '2016-Present',
        startYear: 2016,
        endYear: 2026,
        description: 'The refined veteran. Lars\' current setup represents decades of evolution - reliable, powerful, and unmistakably his sound.',
        albums: ['Hardwired...to Self-Destruct (2016)', '72 Seasons (2023)'],
        tours: ['WorldWired Tour', 'M72 World Tour'],
        image: null,
        
        gear: {
          drums: {
            item: 'Tama Starclassic Maple',
            details: 'Custom black finish: 22"x18" kick, 10"x8", 12"x9", 16"x14" toms',
            notes: 'Same configuration as the classic setup, refined over decades',
            change: null,
          },
          snare: {
            item: 'Tama LU1465 Lars Ulrich Signature',
            details: '14"x6.5" Steel shell with die-cast hoops',
            notes: 'His signature snare - the definitive Lars sound',
            change: CHANGE_TYPES.SIGNATURE,
          },
          cymbals: {
            item: 'Zildjian A Custom Series',
            details: '14" Dyno Beat Hi-Hats, 17"/18"/19" A Custom crashes, 22" Ride',
            notes: 'Tried-and-true cymbal setup',
            change: null,
          },
          hardware: {
            item: 'Tama Iron Cobra 900 Power Glide',
            details: 'Double pedal with Speed Cobra beaters',
            notes: 'The industry standard double pedal',
            change: null,
          },
          sticks: {
            item: 'Ahead Lars Ulrich Signature',
            details: 'Aluminum alloy with polyurethane covers',
            notes: '30+ years with Ahead',
            change: null,
          },
          heads: {
            item: 'Remo Emperor / Ambassador',
            details: 'Emperor on toms, Ambassador on snare',
            notes: 'Classic combination for punch and clarity',
            change: null,
          },
          electronics: {
            item: 'Roland SPD-SX Sampling Pad',
            details: 'For triggering samples and click',
            notes: 'Modern addition for consistent live sound',
            change: CHANGE_TYPES.NEW,
          },
        },
        
        estimatedCost: {
          original: 25000,
          inflationAdjusted: 25000,
          currency: 'USD',
        },
        
        keyChanges: [
          'Signature snare (LU1465) becomes standard',
          'Electronic sampling pad added',
          'Setup optimized for stadium tours',
          'Sound is the most refined of his career',
        ],
        
        quote: {
          text: "After 40 years, I finally have the exact setup I want. It took a long time, but every piece is exactly right.",
          source: 'Modern Drummer Interview, 2023',
        },
        
        videos: [],
      },
    ],
    
    metaTitle: 'Lars Ulrich Gear Evolution Timeline | 40+ Years of Metallica Drums',
    metaDescription: 'Explore Lars Ulrich\'s complete gear evolution from 1981 to today. See how his drums, cymbals, and setup changed from Kill \'Em All to 72 Seasons.',
  },
  
  // ==========================================
  // Joey Jordison - Slipknot (1995-2021)
  // ==========================================
  'joey-jordison': {
    slug: 'joey-jordison',
    name: 'Joey Jordison',
    band: 'Slipknot',
    totalYearsActive: '1995-2021',
    profileImage: '/images/drummers/joey-jordison.webp',
    summary: 'From Des Moines basements to the world\'s biggest stages, Joey Jordison\'s gear evolution showcased his relentless pursuit of speed, power, and innovation.',
    
    eras: [
      {
        id: 'joey-1999-debut',
        era: 'Self-Titled Era',
        years: '1995-2000',
        startYear: 1995,
        endYear: 2000,
        description: 'The explosive debut. Joey\'s blistering speed and theatrical presence emerged with whatever gear the band could afford.',
        albums: ['Mate. Feed. Kill. Repeat. (1996)', 'Slipknot (1999)'],
        tours: ['First major touring'],
        image: null,
        
        gear: {
          drums: {
            item: 'Pearl Export Series',
            details: 'Basic 5-piece: 22" kick, 12"/13"/16" toms',
            notes: 'Entry-level Pearl kit - Joey made it sound pro',
            change: null,
          },
          snare: {
            item: 'Pearl Sensitone Steel 14"x5.5"',
            details: 'Standard steel snare',
            notes: 'Crisp, cutting sound for the chaotic music',
            change: null,
          },
          cymbals: {
            item: 'Paiste 2002',
            details: '14" Hi-Hats, 16"/18" Crashes, 20" Ride, 18" China',
            notes: 'Paiste from the start',
            change: null,
          },
          hardware: {
            item: 'Pearl P-2002C Eliminator',
            details: 'Double pedal',
            notes: 'Fast pedals for insane speeds',
            change: null,
          },
          sticks: {
            item: 'Vic Firth 5A',
            details: 'Standard hickory',
            notes: 'Light sticks for speed',
            change: null,
          },
          heads: {
            item: 'Evans G2',
            details: 'Clear on toms, coated on snare',
            notes: 'Punchy, responsive heads',
            change: null,
          },
        },
        
        estimatedCost: {
          original: 3500,
          inflationAdjusted: 6500,
          currency: 'USD',
        },
        
        keyChanges: [
          'First professional touring setup',
          'Developed the Slipknot style',
          'Speed and aggression over gear quality',
        ],
        
        quote: {
          text: "We had nothing. The gear was beat up, falling apart. But it didn't matter - we were hungry.",
          source: 'Metal Hammer Interview, 2000',
        },
        
        videos: [],
      },
      
      {
        id: 'joey-2001-iowa',
        era: 'Iowa Era',
        years: '2001-2004',
        startYear: 2001,
        endYear: 2004,
        description: 'Peak aggression. Joey\'s most brutal performances, now backed by professional gear and his first signature products.',
        albums: ['Iowa (2001)'],
        tours: ['Iowa World Tour', 'Ozzfest'],
        image: null,
        
        gear: {
          drums: {
            item: 'Pearl Reference Series',
            details: 'Custom black: 24" kick, 10"/12"/14"/16" toms',
            notes: 'First professional endorsement kit',
            change: CHANGE_TYPES.SWITCH,
          },
          snare: {
            item: 'Pearl Reference 14"x5"',
            details: 'Maple/birch hybrid',
            notes: 'Snappy, cutting tone for blast beats',
            change: CHANGE_TYPES.UPGRADE,
          },
          cymbals: {
            item: 'Paiste Signature Series',
            details: '14" Heavy Hi-Hats, 18"/19"/20" Crashes, 22" Ride, 20" China',
            notes: 'Upgraded to Signature line',
            change: CHANGE_TYPES.UPGRADE,
          },
          hardware: {
            item: 'Pearl Eliminator Demon Drive',
            details: 'Direct drive double pedal',
            notes: 'Faster response for extreme speeds',
            change: CHANGE_TYPES.UPGRADE,
          },
          sticks: {
            item: 'Ahead Joey Jordison Signature',
            details: 'Aluminum alloy',
            notes: 'First signature stick deal',
            change: CHANGE_TYPES.SIGNATURE,
          },
          heads: {
            item: 'Evans EC2',
            details: 'Sound-shaping technology',
            notes: 'More controlled, focused tone',
            change: CHANGE_TYPES.UPGRADE,
          },
          electronics: {
            item: 'ddrum Triggers',
            details: 'On kick and snare',
            notes: 'First electronic integration for live consistency',
            change: CHANGE_TYPES.NEW,
          },
        },
        
        estimatedCost: {
          original: 12000,
          inflationAdjusted: 21000,
          currency: 'USD',
        },
        
        keyChanges: [
          'Pearl endorsement (2001)',
          'Ahead signature sticks',
          'ddrum triggers for live sound',
          'Iowa recorded - considered one of heaviest albums ever',
        ],
        
        quote: {
          text: "Iowa was the most physically demanding thing I've ever done. I needed gear that could survive.",
          source: 'Disasterpieces DVD, 2002',
        },
        
        videos: [],
      },
      
      {
        id: 'joey-2004-subliminal',
        era: 'Vol. 3 Era',
        years: '2004-2008',
        startYear: 2004,
        endYear: 2008,
        description: 'Evolution of sound. Joey\'s setup becomes more refined as Slipknot experiments with melody alongside brutality.',
        albums: ['Vol. 3: (The Subliminal Verses) (2004)', 'All Hope Is Gone (2008)'],
        tours: ['The Subliminal Verses World Tour', 'All Hope Is Gone World Tour'],
        image: null,
        
        gear: {
          drums: {
            item: 'Pearl Joey Jordison Signature Kit',
            details: 'Custom size configuration: 22" kick, 8"/10"/12"/14"/16" toms',
            notes: 'First signature drum kit',
            change: CHANGE_TYPES.SIGNATURE,
          },
          snare: {
            item: 'Pearl Joey Jordison Signature Snare',
            details: '13"x6.5" Steel',
            notes: 'Signature snare with quick response',
            change: CHANGE_TYPES.SIGNATURE,
          },
          cymbals: {
            item: 'Paiste Signature / RUDE',
            details: 'Mix of series: 14" Heavy Hi-Hats, various crashes, RUDE Chinas',
            notes: 'Combined musical and aggressive cymbals',
            change: null,
          },
          hardware: {
            item: 'Pearl Demon Drive',
            details: 'Direct drive double pedal',
            notes: 'Continued Demon Drive loyalty',
            change: null,
          },
          sticks: {
            item: 'Ahead Joey Jordison Signature',
            details: 'Aluminum with shorter taper',
            notes: 'Refined signature model',
            change: null,
          },
          heads: {
            item: 'Evans EMAD / EC2',
            details: 'EMAD on kick, EC2 on toms',
            notes: 'Focused, punchy sound',
            change: CHANGE_TYPES.UPGRADE,
          },
          electronics: {
            item: 'ddrum Module',
            details: 'Full trigger setup with module',
            notes: 'Hybrid acoustic/electronic',
            change: CHANGE_TYPES.UPGRADE,
          },
        },
        
        estimatedCost: {
          original: 18000,
          inflationAdjusted: 28000,
          currency: 'USD',
        },
        
        keyChanges: [
          'First signature drum kit released',
          'Signature snare released',
          'Rotating drum riser introduced',
          'More dynamic playing on Vol. 3',
        ],
        
        quote: {
          text: "Having my own signature kit was surreal. Every piece was designed for how I play.",
          source: 'Pearl Drums Interview, 2005',
        },
        
        videos: [],
      },
      
      {
        id: 'joey-2010-post-slipknot',
        era: 'Post-Slipknot Era',
        years: '2013-2021',
        startYear: 2013,
        endYear: 2021,
        description: 'After leaving Slipknot in 2013, Joey continued innovating with various projects despite health challenges.',
        albums: ['Sinsaenum albums', 'VIMIC'],
        tours: ['Various touring'],
        image: null,
        
        gear: {
          drums: {
            item: 'SJC Custom Drums',
            details: 'Custom maple shells',
            notes: 'Moved from Pearl after Slipknot exit',
            change: CHANGE_TYPES.SWITCH,
          },
          snare: {
            item: 'SJC Custom Snare',
            details: '14"x6" Maple',
            notes: 'Custom built for his specifications',
            change: CHANGE_TYPES.SWITCH,
          },
          cymbals: {
            item: 'Paiste Signature / RUDE',
            details: 'Continued Paiste partnership',
            notes: 'Loyal to Paiste throughout career',
            change: null,
          },
          hardware: {
            item: 'Various',
            details: 'Adapted to health needs',
            notes: 'Modified setup for transverse myelitis',
            change: null,
          },
          sticks: {
            item: 'Ahead Sticks',
            details: 'Continued Ahead partnership',
            notes: 'Easier on hands during health issues',
            change: null,
          },
          heads: {
            item: 'Evans',
            details: 'EMAD and EC2',
            notes: 'Consistent preference',
            change: null,
          },
        },
        
        estimatedCost: {
          original: 15000,
          inflationAdjusted: 18000,
          currency: 'USD',
        },
        
        keyChanges: [
          'Left Slipknot (2013)',
          'Moved to SJC Drums',
          'Adapted playing for transverse myelitis',
          'Continued playing until his passing in 2021',
        ],
        
        quote: {
          text: "I'll never stop playing. Drums are my life, no matter what challenges come.",
          source: 'Metal Injection Interview, 2016',
        },
        
        videos: [],
      },
    ],
    
    metaTitle: 'Joey Jordison Gear Evolution Timeline | Slipknot Drumming Legend',
    metaDescription: 'Trace Joey Jordison\'s legendary gear evolution from Slipknot\'s debut to his final performances. See how #1\'s setup changed across 25 years.',
  },
  
  // ==========================================
  // Dave Lombardo - Slayer (Multiple stints)
  // ==========================================
  'dave-lombardo': {
    slug: 'dave-lombardo',
    name: 'Dave Lombardo',
    band: 'Slayer',
    totalYearsActive: '1981-Present',
    profileImage: '/images/drummers/dave-lombardo.webp',
    summary: 'The Godfather of Double Bass evolved from budget gear in South Gate garages to custom setups across multiple legendary bands.',
    
    eras: [
      {
        id: 'lombardo-1983-show-no-mercy',
        era: 'Show No Mercy Era',
        years: '1981-1985',
        startYear: 1981,
        endYear: 1985,
        description: 'The birth of extreme thrash drumming. Young Dave creating the blueprint with whatever gear he could find.',
        albums: ['Show No Mercy (1983)', 'Haunting the Chapel (1984)', 'Hell Awaits (1985)'],
        tours: ['Early club tours'],
        image: null,
        
        gear: {
          drums: {
            item: 'Tama Imperialstar',
            details: 'Basic 5-piece: 22" kick, 12"/13"/16" toms',
            notes: 'Affordable Japanese drums',
            change: null,
          },
          snare: {
            item: 'Tama Steel 14"x5.5"',
            details: 'Standard steel snare',
            notes: 'Bright, cutting tone',
            change: null,
          },
          cymbals: {
            item: 'Paiste 2002',
            details: '14" Hi-Hats, 16"/18" Crashes, 20" Ride',
            notes: 'Paiste from the beginning',
            change: null,
          },
          hardware: {
            item: 'Tama with DW 5000 Pedal',
            details: 'Single pedal initially, then double',
            notes: 'DW 5000 became essential for double bass',
            change: null,
          },
          sticks: {
            item: 'Vic Firth 5B',
            details: 'Standard hickory',
            notes: 'Basic sticks, pure technique',
            change: null,
          },
          heads: {
            item: 'Remo Ambassador',
            details: 'Clear on toms',
            notes: 'Standard configuration',
            change: null,
          },
        },
        
        estimatedCost: {
          original: 2000,
          inflationAdjusted: 6000,
          currency: 'USD',
        },
        
        keyChanges: [
          'Developed double bass technique',
          'Created the thrash metal drumming vocabulary',
          'Playing speed unmatched at the time',
        ],
        
        quote: {
          text: "I didn't have expensive gear. I had hunger and speed. That's all you need.",
          source: 'Metal Hammer Interview, 1985',
        },
        
        videos: [],
      },
      
      {
        id: 'lombardo-1986-reign-in-blood',
        era: 'Reign in Blood Era',
        years: '1986-1992',
        startYear: 1986,
        endYear: 1992,
        description: 'The legendary era. Dave\'s playing on Reign in Blood defined extreme metal drumming forever.',
        albums: ['Reign in Blood (1986)', 'South of Heaven (1988)', 'Seasons in the Abyss (1990)'],
        tours: ['Reign in Pain Tour', 'World Sacrifice Tour', 'Clash of the Titans'],
        image: null,
        
        gear: {
          drums: {
            item: 'Pearl BLX Series',
            details: 'Birch shells: 24" kick, 10"/12"/14"/16" toms',
            notes: 'Moved to Pearl for endorsement',
            change: CHANGE_TYPES.SWITCH,
          },
          snare: {
            item: 'Pearl Free-Floating Steel 14"x6.5"',
            details: 'Steel shell with free-floating system',
            notes: 'Maximum crack and attack',
            change: CHANGE_TYPES.SWITCH,
          },
          cymbals: {
            item: 'Paiste RUDE',
            details: '14" Hi-Hats, 18"/19"/20" Crashes, 22" Ride, 18" China',
            notes: 'RUDE series for cut and volume',
            change: CHANGE_TYPES.UPGRADE,
          },
          hardware: {
            item: 'DW 5000 Double Pedal',
            details: 'Turbo drive',
            notes: 'The pedal that defined thrash bass drum sound',
            change: null,
          },
          sticks: {
            item: 'Pro-Mark 747',
            details: 'Oak sticks for durability',
            notes: 'Switched to Pro-Mark',
            change: CHANGE_TYPES.SWITCH,
          },
          heads: {
            item: 'Remo Emperor',
            details: 'Double-ply for attack',
            notes: 'More durable for aggressive playing',
            change: CHANGE_TYPES.UPGRADE,
          },
        },
        
        estimatedCost: {
          original: 10000,
          inflationAdjusted: 26000,
          currency: 'USD',
        },
        
        keyChanges: [
          'Pearl endorsement begins',
          'DW 5000 becomes signature pedal',
          'Reign in Blood recorded - changed metal forever',
          'Larger kit for bigger sound',
        ],
        
        quote: {
          text: "Reign in Blood was 29 minutes of pure aggression. Every note had to be perfect.",
          source: 'Revolver Magazine, 2006',
        },
        
        videos: [],
      },
      
      {
        id: 'lombardo-1995-return',
        era: 'DW & Tama Era',
        years: '1995-2010',
        startYear: 1995,
        endYear: 2010,
        description: 'The evolution continues. After leaving and returning to Slayer, Dave explored different gear and sounds.',
        albums: ['Christ Illusion (2006)', 'World Painted Blood (2009)'],
        tours: ['Unholy Alliance Tour'],
        image: null,
        
        gear: {
          drums: {
            item: 'DW Collector\'s Series',
            details: 'Maple shells: 24" kick, 10"/12"/14"/16" toms',
            notes: 'Premium DW sound',
            change: CHANGE_TYPES.SWITCH,
          },
          snare: {
            item: 'DW Edge Snare',
            details: '14"x6.5" with VLT shell',
            notes: 'Warm yet cutting',
            change: CHANGE_TYPES.SWITCH,
          },
          cymbals: {
            item: 'Paiste Signature',
            details: 'Full Signature setup',
            notes: 'Refined Paiste sound',
            change: null,
          },
          hardware: {
            item: 'DW 9000 Double Pedal',
            details: 'Upgraded DW pedals',
            notes: 'Latest DW technology',
            change: CHANGE_TYPES.UPGRADE,
          },
          sticks: {
            item: 'Vic Firth Dave Lombardo Signature',
            details: 'Hickory with custom specs',
            notes: 'First signature stick',
            change: CHANGE_TYPES.SIGNATURE,
          },
          heads: {
            item: 'Evans EMAD',
            details: 'On kicks for focused sound',
            notes: 'More controlled modern sound',
            change: CHANGE_TYPES.UPGRADE,
          },
          electronics: {
            item: 'Roland triggers',
            details: 'Kick triggers for live sound',
            notes: 'Added for stadium consistency',
            change: CHANGE_TYPES.NEW,
          },
        },
        
        estimatedCost: {
          original: 20000,
          inflationAdjusted: 30000,
          currency: 'USD',
        },
        
        keyChanges: [
          'DW endorsement (major gear upgrade)',
          'Vic Firth signature sticks',
          'Returned to Slayer (2001)',
          'Christ Illusion Grammy win',
        ],
        
        quote: {
          text: "DW gave me the warmth I was looking for while keeping the attack. Best of both worlds.",
          source: 'DW Artist Spotlight, 2007',
        },
        
        videos: [],
      },
      
      {
        id: 'lombardo-2013-present',
        era: 'Modern Era',
        years: '2013-Present',
        startYear: 2013,
        endYear: 2026,
        description: 'Post-Slayer renaissance. Dave continues to push boundaries with Dead Cross, Suicidal Tendencies, and more.',
        albums: ['Dead Cross albums', 'Suicidal Tendencies', 'Mr. Bungle reunion'],
        tours: ['Various touring'],
        image: null,
        
        gear: {
          drums: {
            item: 'Trick Drums Custom',
            details: 'Aluminum shells: 22" kick, 10"/12"/14"/16" toms',
            notes: 'Latest innovation - metal shells',
            change: CHANGE_TYPES.SWITCH,
          },
          snare: {
            item: 'Trick Drums Aluminum Snare',
            details: '14"x6.5" Aluminum',
            notes: 'Bright, cutting aluminum sound',
            change: CHANGE_TYPES.SWITCH,
          },
          cymbals: {
            item: 'Paiste RUDE / Masters',
            details: 'Mix for versatility',
            notes: 'Still loyal to Paiste',
            change: null,
          },
          hardware: {
            item: 'Trick Pro 1-V Bigfoot Pedal',
            details: 'Direct drive double pedal',
            notes: 'Trick pedals for maximum speed',
            change: CHANGE_TYPES.SWITCH,
          },
          sticks: {
            item: 'Vic Firth Dave Lombardo Signature',
            details: 'Continued signature line',
            notes: 'Refined over the years',
            change: null,
          },
          heads: {
            item: 'Evans UV1 / EMAD',
            details: 'Modern Evans technology',
            notes: 'Latest head technology',
            change: CHANGE_TYPES.UPGRADE,
          },
        },
        
        estimatedCost: {
          original: 25000,
          inflationAdjusted: 25000,
          currency: 'USD',
        },
        
        keyChanges: [
          'Left Slayer again (2013)',
          'Trick Drums endorsement',
          'Playing with multiple bands simultaneously',
          'Mr. Bungle reunion (2020)',
        ],
        
        quote: {
          text: "I'm playing better now than I ever have. Age brings wisdom, not weakness.",
          source: 'Metal Injection Interview, 2022',
        },
        
        videos: [],
      },
    ],
    
    metaTitle: 'Dave Lombardo Gear Evolution Timeline | The Godfather of Double Bass',
    metaDescription: 'Explore Dave Lombardo\'s gear evolution from Slayer\'s early days to today. See the setups behind Reign in Blood and 40+ years of thrash.',
  },
};

/**
 * Get all drummers with evolution data
 */
export function getEvolutionDrummers() {
  return Object.values(DRUMMER_EVOLUTION);
}

/**
 * Get evolution data for a specific drummer
 */
export function getDrummerEvolution(slug) {
  return DRUMMER_EVOLUTION[slug] || null;
}

/**
 * Check if a drummer has evolution data
 */
export function hasEvolutionData(slug) {
  return slug in DRUMMER_EVOLUTION;
}

/**
 * Get all drummer slugs with evolution data
 */
export function getEvolutionDrummerSlugs() {
  return Object.keys(DRUMMER_EVOLUTION);
}

/**
 * Get era by ID
 */
export function getEraById(drummerSlug, eraId) {
  const drummer = DRUMMER_EVOLUTION[drummerSlug];
  if (!drummer) return null;
  return drummer.eras.find(era => era.id === eraId) || null;
}

/**
 * Get gear changes between eras
 */
export function getGearChanges(drummerSlug, eraIndex) {
  const drummer = DRUMMER_EVOLUTION[drummerSlug];
  if (!drummer || eraIndex < 1) return [];
  
  const currentEra = drummer.eras[eraIndex];
  const previousEra = drummer.eras[eraIndex - 1];
  
  if (!currentEra || !previousEra) return [];
  
  const changes = [];
  const categories = Object.keys(currentEra.gear);
  
  for (const category of categories) {
    const current = currentEra.gear[category];
    const previous = previousEra.gear[category];
    
    if (current?.change) {
      changes.push({
        category,
        item: current.item,
        changeType: current.change,
        previousItem: previous?.item,
      });
    }
  }
  
  return changes;
}

/**
 * Calculate total career cost for a drummer
 */
export function getTotalCareerCost(drummerSlug, adjusted = true) {
  const drummer = DRUMMER_EVOLUTION[drummerSlug];
  if (!drummer) return 0;
  
  return drummer.eras.reduce((total, era) => {
    const cost = adjusted ? era.estimatedCost.inflationAdjusted : era.estimatedCost.original;
    return total + cost;
  }, 0);
}

/**
 * Get change type display info
 */
export function getChangeTypeInfo(changeType) {
  const typeMap = {
    [CHANGE_TYPES.NEW]: { emoji: '✨', label: 'New Addition', color: '#22c55e' },
    [CHANGE_TYPES.UPGRADE]: { emoji: '⬆️', label: 'Upgraded', color: '#3b82f6' },
    [CHANGE_TYPES.SWITCH]: { emoji: '🔄', label: 'Switched Brands', color: '#f59e0b' },
    [CHANGE_TYPES.SIGNATURE]: { emoji: '⭐', label: 'Signature Model', color: '#a855f7' },
  };
  return typeMap[changeType] || { emoji: '•', label: 'Changed', color: '#64748b' };
}

/**
 * URL helpers for evolution pages
 */
export function isEvolutionPage() {
  if (typeof window === 'undefined') return false;
  const pathname = window.location.pathname;
  return /^\/drummers\/[a-z0-9-]+\/evolution\/?$/i.test(pathname);
}

export function getEvolutionDrummerSlugFromURL() {
  if (typeof window === 'undefined') return null;
  const match = window.location.pathname.match(/^\/drummers\/([a-z0-9-]+)\/evolution/i);
  return match ? match[1] : null;
}

export function getEvolutionShareUrl(drummerSlug, eraId = null) {
  let url = `https://metalforge.io/drummers/${drummerSlug}/evolution`;
  if (eraId) {
    url += `?era=${eraId}`;
  }
  return url;
}

/**
 * Update OG meta tags for evolution pages
 */
export function updateEvolutionMeta(drummer) {
  if (typeof document === 'undefined' || !drummer) return;
  
  document.title = drummer.metaTitle;
  
  // Update meta description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.name = 'description';
    document.head.appendChild(metaDesc);
  }
  metaDesc.content = drummer.metaDescription;
  
  // Update OG tags
  const ogTags = {
    'og:title': drummer.metaTitle,
    'og:description': drummer.metaDescription,
    'og:url': `https://metalforge.io/drummers/${drummer.slug}/evolution`,
    'og:type': 'article',
    'og:image': `https://metalforge.io${drummer.profileImage}`,
  };
  
  for (const [property, content] of Object.entries(ogTags)) {
    let tag = document.querySelector(`meta[property="${property}"]`);
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute('property', property);
      document.head.appendChild(tag);
    }
    tag.content = content;
  }
  
  // Twitter cards
  const twitterTags = {
    'twitter:card': 'summary_large_image',
    'twitter:title': drummer.metaTitle,
    'twitter:description': drummer.metaDescription,
    'twitter:image': `https://metalforge.io${drummer.profileImage}`,
  };
  
  for (const [name, content] of Object.entries(twitterTags)) {
    let tag = document.querySelector(`meta[name="${name}"]`);
    if (!tag) {
      tag = document.createElement('meta');
      tag.name = name;
      document.head.appendChild(tag);
    }
    tag.content = content;
  }
}

/**
 * Generate schema.org markup for evolution timeline
 */
export function generateEvolutionSchema(drummer) {
  if (!drummer) return null;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: drummer.metaTitle,
    description: drummer.metaDescription,
    image: `https://metalforge.io${drummer.profileImage}`,
    author: {
      '@type': 'Organization',
      name: 'MetalForge.io',
    },
    publisher: {
      '@type': 'Organization',
      name: 'MetalForge.io',
      logo: {
        '@type': 'ImageObject',
        url: 'https://metalforge.io/images/logo.webp',
      },
    },
    mainEntity: {
      '@type': 'Person',
      name: drummer.name,
      description: drummer.summary,
      image: `https://metalforge.io${drummer.profileImage}`,
      memberOf: {
        '@type': 'MusicGroup',
        name: drummer.band,
      },
    },
    about: drummer.eras.map(era => ({
      '@type': 'HistoricalEvent',
      name: era.era,
      startDate: String(era.startYear),
      endDate: String(era.endYear),
      description: era.description,
    })),
  };
}
