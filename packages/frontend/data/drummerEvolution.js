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
  // Mike Portnoy - Dream Theater / Winery Dogs (1985–Present)
  // ==========================================
  'mike-portnoy': {
    slug: 'mike-portnoy',
    name: 'Mike Portnoy',
    band: 'Dream Theater',
    totalYearsActive: '1985-Present',
    profileImage: '/images/drummers/mike-portnoy.webp',
    summary: 'From a teenager inspired by Neil Peart to the progressive metal drumming standard-bearer, Mike Portnoy\'s gear evolution mirrors his ascent from New York clubs to global arenas — always chasing the biggest, most expressive kit possible.',

    eras: [
      {
        id: 'portnoy-1992-images-words',
        era: 'Images & Words Era',
        years: '1988–1993',
        startYear: 1988,
        endYear: 1993,
        description: 'Dream Theater\'s commercial breakthrough. Portnoy built his reputation on a Tama foundation, channelling Rush and Queensrÿche into progressive metal drumming.',
        albums: ['When Dream and Day Unite (1989)', 'Images & Words (1992)'],
        tours: ['Images & Words World Tour'],
        image: null,

        gear: {
          drums: {
            item: 'Tama Artstar II',
            details: 'Birch shells: 22" kick, 10"/12"/13"/14"/16" toms',
            notes: 'Neil Peart-inspired large kit; Tama was the natural endorsement choice for prog drummers of the era.',
            change: null,
          },
          snare: {
            item: 'Tama Artstar II 14"×6.5"',
            details: 'Birch shell with die-cast hoops',
            notes: 'Powerful, punchy snare that cut through dense prog arrangements.',
            change: null,
          },
          cymbals: {
            item: 'Zildjian A Series',
            details: '14" New Beat hi-hats, 17"/18" crashes, 20" ride, 18" China',
            notes: 'Standard Zildjian A setup inherited from classic rock influences.',
            change: null,
          },
          hardware: {
            item: 'Tama Iron Cobra Single Pedal',
            details: 'Single-pedal setup for early touring',
            notes: 'Double bass was added progressively as the music demanded it.',
            change: null,
          },
          sticks: {
            item: 'Vic Firth 5B',
            details: 'Standard hickory',
            notes: 'Off-the-shelf sticks early in career.',
            change: null,
          },
          heads: {
            item: 'Remo Ambassador',
            details: 'Clear on toms, coated on snare',
            notes: 'Standard configuration.',
            change: null,
          },
        },

        estimatedCost: {
          original: 6000,
          inflationAdjusted: 13000,
          currency: 'USD',
        },

        keyChanges: [
          'First Tama endorsement deal',
          'Developed signature prog metal chops',
          'Large multi-tom setup inspired by Neil Peart',
        ],

        quote: {
          text: "Neil Peart was my god. I wanted a kit that looked and felt like his. Tama was the obvious choice.",
          source: 'Modern Drummer Interview, 1993',
        },

        videos: [],
      },

      {
        id: 'portnoy-1994-awake',
        era: 'Awake Era',
        years: '1994–1996',
        startYear: 1994,
        endYear: 1996,
        description: 'Dream Theater\'s heaviest, darkest record. Portnoy\'s kit grew in size and complexity to match the album\'s crushing tone.',
        albums: ['Awake (1994)'],
        tours: ['Awake World Tour'],
        image: null,

        gear: {
          drums: {
            item: 'Tama Artstar II (expanded)',
            details: 'Birch shells: 22"/24" kicks, 8"/10"/12"/13"/14"/16"/18" toms',
            notes: 'Kit expanded significantly — two kick drums and more toms for wider tonal range.',
            change: CHANGE_TYPES.UPGRADE,
          },
          snare: {
            item: 'Tama Bell Brass 14"×6.5"',
            details: 'Seamless bell brass shell',
            notes: 'Switched to Bell Brass for more crack and projection on heavier material.',
            change: CHANGE_TYPES.SWITCH,
          },
          cymbals: {
            item: 'Zildjian A Custom',
            details: '14" hi-hats, 16"/17"/18"/19" crashes, 22" ride, 18"/20" Chinas',
            notes: 'Expanded cymbal setup for wider articulation.',
            change: CHANGE_TYPES.UPGRADE,
          },
          hardware: {
            item: 'Tama Iron Cobra HP900 Double Pedal',
            details: 'Twin kick configuration',
            notes: 'Full double-bass rig now standard.',
            change: CHANGE_TYPES.UPGRADE,
          },
          sticks: {
            item: 'Pro-Mark Mike Portnoy Signature',
            details: 'Hickory, custom taper',
            notes: 'First signature drumstick deal.',
            change: CHANGE_TYPES.SIGNATURE,
          },
          heads: {
            item: 'Remo Emperor',
            details: 'Double-ply for heavier playing',
            notes: 'Heavier heads to handle more aggressive playing.',
            change: CHANGE_TYPES.UPGRADE,
          },
        },

        estimatedCost: {
          original: 12000,
          inflationAdjusted: 25000,
          currency: 'USD',
        },

        keyChanges: [
          'Expanded to double kick configuration',
          'Pro-Mark signature stick launched',
          'Larger multi-tom layout becomes standard',
        ],

        quote: {
          text: "Awake was heavy, dark. The kit had to expand with it. More toms, two kicks — everything got bigger.",
          source: 'Drum! Magazine, 1995',
        },

        videos: [],
      },

      {
        id: 'portnoy-1997-falling-infinity',
        era: 'Yamaha Era',
        years: '1997–1998',
        startYear: 1997,
        endYear: 1998,
        description: 'Portnoy switched to Yamaha during a turbulent creative period. The Yamaha Recording Custom gave him a warmer, more studio-focused tone.',
        albums: ['Falling into Infinity (1997)'],
        tours: ['Falling into Infinity Tour'],
        image: null,

        gear: {
          drums: {
            item: 'Yamaha Recording Custom',
            details: 'Birch/Beech shells: 22"/24" kicks, 8"/10"/12"/13"/14"/16"/18" toms',
            notes: 'Switched to Yamaha for warmer recording tone; large kit maintained.',
            change: CHANGE_TYPES.SWITCH,
          },
          snare: {
            item: 'Yamaha Recording Custom 14"×6.5"',
            details: 'Birch shell',
            notes: 'Warm, musical snare tone for the more melodic album.',
            change: CHANGE_TYPES.SWITCH,
          },
          cymbals: {
            item: 'Zildjian A Custom',
            details: '14" hi-hats, 17"/18"/19" crashes, 22" ride, China cymbals',
            notes: 'Continued Zildjian relationship through brand switch.',
            change: null,
          },
          hardware: {
            item: 'Yamaha HH / DW 5000 Pedals',
            details: 'Mix of Yamaha stands and DW double pedal',
            notes: 'Yamaha hardware for stands, DW for pedals.',
            change: CHANGE_TYPES.SWITCH,
          },
          sticks: {
            item: 'Pro-Mark Mike Portnoy Signature',
            details: 'Continued hickory signature',
            notes: 'Maintained Pro-Mark partnership.',
            change: null,
          },
          heads: {
            item: 'Remo Pinstripe',
            details: 'Controlled, focused tone',
            notes: 'Pinstripe for the studio sessions.',
            change: CHANGE_TYPES.SWITCH,
          },
        },

        estimatedCost: {
          original: 14000,
          inflationAdjusted: 27000,
          currency: 'USD',
        },

        keyChanges: [
          'Brand switch to Yamaha Recording Custom',
          'More melodic, studio-oriented sound',
          'DW double pedal introduced',
        ],

        quote: {
          text: "Yamaha gave me a warmth I hadn't found with Tama. For the studio, it was exactly what Falling into Infinity needed.",
          source: 'Yamaha Artist Profile, 1997',
        },

        videos: [],
      },

      {
        id: 'portnoy-1999-metropolis',
        era: 'Metropolis Pt. 2 Era',
        years: '1999–2001',
        startYear: 1999,
        endYear: 2001,
        description: 'Dream Theater\'s magnum opus demanded Portnoy\'s most complex setup yet. The Scenes from a Memory kit was one of the most elaborate prog metal rigs of its era.',
        albums: ['Metropolis Pt. 2: Scenes from a Memory (1999)'],
        tours: ['Metropolis 2000 Tour', 'Live Scenes from New York'],
        image: null,

        gear: {
          drums: {
            item: 'Tama Starclassic Maple',
            details: 'Maple shells: 22"/24" kicks, 8"/10"/12"/13"/14"/16"/18" toms',
            notes: 'Return to Tama with the Starclassic Maple — warmer and more resonant than the Artstar.',
            change: CHANGE_TYPES.SWITCH,
          },
          snare: {
            item: 'Tama Starclassic Maple 14"×6.5"',
            details: 'Maple shell',
            notes: 'Warm, rich snare sound for the concept album.',
            change: CHANGE_TYPES.SWITCH,
          },
          cymbals: {
            item: 'Zildjian A Custom',
            details: '14" hi-hats, multiple crashes 16"–20", 22" ride, 18"/20" Chinas, splash cymbals',
            notes: 'Expanded cymbal array to cover all dynamic ranges in the concept album.',
            change: CHANGE_TYPES.UPGRADE,
          },
          hardware: {
            item: 'Tama Iron Cobra HP900 Double Pedal',
            details: 'Speed Cobra setup',
            notes: 'Back to Tama hardware with return to Tama drums.',
            change: CHANGE_TYPES.SWITCH,
          },
          sticks: {
            item: 'Pro-Mark Mike Portnoy Signature',
            details: 'Refined hickory model',
            notes: 'Continued Pro-Mark partnership.',
            change: null,
          },
          heads: {
            item: 'Remo Emperor / Ambassador',
            details: 'Emperor on toms, Ambassador on snare',
            notes: 'Classic combination for punch and clarity.',
            change: CHANGE_TYPES.SWITCH,
          },
          electronics: {
            item: 'Roland Octapad',
            details: 'Electronic pads for samples',
            notes: 'First major electronic integration for triggering samples during live shows.',
            change: CHANGE_TYPES.NEW,
          },
        },

        estimatedCost: {
          original: 18000,
          inflationAdjusted: 32000,
          currency: 'USD',
        },

        keyChanges: [
          'Return to Tama with Starclassic Maple',
          'Roland Octapad added for live samples',
          'Largest kit configuration to date',
          'Metropolis 2000 tour featured elaborate drum riser',
        ],

        quote: {
          text: "Scenes from a Memory was a 77-minute opera. The kit had to be able to cover everything — from delicate passages to all-out assault.",
          source: 'Modern Drummer, 2000',
        },

        videos: [],
      },

      {
        id: 'portnoy-2003-train-of-thought',
        era: 'Train of Thought / Octavarium Era',
        years: '2002–2006',
        startYear: 2002,
        endYear: 2006,
        description: 'Dream Theater\'s heaviest period. Train of Thought\'s all-out metal assault required Portnoy\'s biggest and most powerful kit to date.',
        albums: ['Six Degrees of Inner Turbulence (2002)', 'Train of Thought (2003)', 'Octavarium (2005)'],
        tours: ['Six Degrees Tour', 'Train of Thought Tour', 'Octavarium Tour'],
        image: null,

        gear: {
          drums: {
            item: 'Tama Starclassic Maple (expanded)',
            details: 'Maple shells: 22"/24" kicks, 8"/10"/12"/13"/14"/16"/18"/20" toms',
            notes: 'Now including a 20" floor tom — the largest kit of his career.',
            change: CHANGE_TYPES.UPGRADE,
          },
          snare: {
            item: 'Tama Mike Portnoy Signature Snare',
            details: '14"×6.5" Maple',
            notes: 'First Mike Portnoy signature snare drum with Tama.',
            change: CHANGE_TYPES.SIGNATURE,
          },
          cymbals: {
            item: 'Zildjian Mike Portnoy Signature',
            details: '14" hi-hats, signature crashes and ride, Chinas',
            notes: 'Zildjian signature series — cymbals tailored to his exact requirements.',
            change: CHANGE_TYPES.SIGNATURE,
          },
          hardware: {
            item: 'Tama Iron Cobra HP900 Double Pedal',
            details: 'Power Glide cam',
            notes: 'Consistent Iron Cobra preference.',
            change: null,
          },
          sticks: {
            item: 'Pro-Mark Mike Portnoy Signature',
            details: 'Hickory with nylon tip',
            notes: 'Refined signature model with nylon tip option.',
            change: null,
          },
          heads: {
            item: 'Evans G2 / EMAD',
            details: 'G2 on toms, EMAD on kicks',
            notes: 'Switched to Evans heads for better durability on heavy material.',
            change: CHANGE_TYPES.SWITCH,
          },
          electronics: {
            item: 'Roland SPD-S / Octapad',
            details: 'Sampling pads for live samples and click',
            notes: 'Expanded electronic integration.',
            change: CHANGE_TYPES.UPGRADE,
          },
        },

        estimatedCost: {
          original: 25000,
          inflationAdjusted: 40000,
          currency: 'USD',
        },

        keyChanges: [
          'Tama Mike Portnoy signature snare released',
          'Zildjian signature cymbal line launched',
          'Switched to Evans heads',
          'Kit reached maximum size with 20" floor tom',
        ],

        quote: {
          text: "Train of Thought was us going full Pantera/Metallica. The kit had to match that aggression — it was the biggest setup I'd ever played.",
          source: 'Drum! Magazine, 2003',
        },

        videos: [],
      },

      {
        id: 'portnoy-2007-systematic-chaos',
        era: 'Systematic Chaos Era',
        years: '2007–2010',
        startYear: 2007,
        endYear: 2010,
        description: 'Portnoy\'s final era with Dream Theater before his departure in 2010. The Systematic Chaos rig was one of the most visually iconic setups in progressive metal.',
        albums: ['Systematic Chaos (2007)', 'Black Clouds & Silver Linings (2009)'],
        tours: ['Chaos in Motion Tour', 'A Dramatic Turn of Events pre-dates'],
        image: null,

        gear: {
          drums: {
            item: 'Tama Starclassic Maple (full configuration)',
            details: 'Custom finish: 22"/24" kicks, full tom array 8"–20"',
            notes: 'Ultimate Portnoy/DT-era kit configuration.',
            change: null,
          },
          snare: {
            item: 'Tama Mike Portnoy Signature 14"×6.5"',
            details: 'Maple, refined model',
            notes: 'Ongoing signature snare with Tama.',
            change: null,
          },
          cymbals: {
            item: 'Zildjian Mike Portnoy Signature Suite',
            details: 'Full signature setup — hi-hats, crashes, rides, Chinas',
            notes: 'Complete Zildjian signature suite at peak development.',
            change: null,
          },
          hardware: {
            item: 'Tama Iron Cobra HP900',
            details: 'Double pedal with Speed Cobra beaters',
            notes: 'Two decades of Iron Cobra loyalty.',
            change: null,
          },
          sticks: {
            item: 'Pro-Mark Mike Portnoy Signature',
            details: 'Hickory / nylon',
            notes: 'Continued signature partnership.',
            change: null,
          },
          heads: {
            item: 'Evans G2 / EMAD',
            details: 'G2 on toms, EMAD2 on kicks',
            notes: 'EMAD2 for more focused kick attack.',
            change: CHANGE_TYPES.UPGRADE,
          },
          electronics: {
            item: 'Roland SPD-S and TD module',
            details: 'Full hybrid setup with triggers on kick and snare',
            notes: 'Triggers for arena-level consistency.',
            change: CHANGE_TYPES.UPGRADE,
          },
        },

        estimatedCost: {
          original: 30000,
          inflationAdjusted: 44000,
          currency: 'USD',
        },

        keyChanges: [
          'Peak Dream Theater-era kit configuration',
          'Full hybrid acoustic/electronic rig',
          'Chaos in Motion drum cam became viral content',
          'Portnoy left Dream Theater in September 2010',
        ],

        quote: {
          text: "That kit was the culmination of 25 years of collecting and refining. Every piece was exactly where I wanted it.",
          source: 'Modern Drummer, 2008',
        },

        videos: [],
      },

      {
        id: 'portnoy-2011-winery-dogs',
        era: 'Winery Dogs / Post-DT Era',
        years: '2011–Present',
        startYear: 2011,
        endYear: 2026,
        description: 'Post-Dream Theater renaissance. Portnoy has played with Adrenaline Mob, The Winery Dogs, Sons of Apollo, and eventually rejoined Dream Theater in 2023 — adapting his kit for each project.',
        albums: ['The Winery Dogs (2013)', 'Hot Streak (2015)', 'A View from the Top of the World (Dream Theater, 2021)', 'Parasomnia (Dream Theater, 2025)'],
        tours: ['Winery Dogs World Tour', 'Sons of Apollo Tour', 'Dream Theater 2024 Tour'],
        image: null,

        gear: {
          drums: {
            item: 'DW Collector\'s Series',
            details: 'Maple shells: 22" kick, 8"/10"/12"/14"/16" toms (streamlined)',
            notes: 'Moved to DW for more tonal flexibility; smaller kit for Winery Dogs power-trio context.',
            change: CHANGE_TYPES.SWITCH,
          },
          snare: {
            item: 'DW Edge Maple 14"×6.5"',
            details: 'Maple with VLT shell',
            notes: 'Warm, punchy DW snare suited to the Winery Dogs groove-oriented style.',
            change: CHANGE_TYPES.SWITCH,
          },
          cymbals: {
            item: 'Zildjian A Custom / Mike Portnoy Signature',
            details: '14" hi-hats, 17"/18"/19" crashes, 21" ride, China',
            notes: 'Maintained Zildjian relationship across all projects.',
            change: null,
          },
          hardware: {
            item: 'DW 9000 Double Pedal',
            details: 'Twin-chain drive',
            notes: 'Switched pedals to match DW kit.',
            change: CHANGE_TYPES.SWITCH,
          },
          sticks: {
            item: 'Vic Firth Mike Portnoy Signature',
            details: 'Hickory with nylon tip',
            notes: 'Moved signature stick deal from Pro-Mark to Vic Firth.',
            change: CHANGE_TYPES.SWITCH,
          },
          heads: {
            item: 'Evans G2 / EMAD2',
            details: 'Consistent Evans setup',
            notes: 'Evans throughout all post-DT projects.',
            change: null,
          },
          electronics: {
            item: 'Roland SPD-SX Sampling Pad',
            details: 'Samples and click track',
            notes: 'Simplified electronics for smaller-venue touring.',
            change: CHANGE_TYPES.SWITCH,
          },
        },

        estimatedCost: {
          original: 28000,
          inflationAdjusted: 28000,
          currency: 'USD',
        },

        keyChanges: [
          'Switched to DW Collector\'s Series',
          'Vic Firth signature stick deal',
          'Streamlined kit for power-trio context',
          'Rejoined Dream Theater in 2023',
        ],

        quote: {
          text: "With the Winery Dogs I didn't need a 12-tom monster. The music called for feel and groove. DW gave me that without sacrificing power.",
          source: 'Drum! Magazine, 2013',
        },

        videos: [],
      },
    ],

    metaTitle: 'Mike Portnoy Gear Evolution Timeline | Dream Theater Drum Kit History',
    metaDescription: 'Explore Mike Portnoy\'s complete drum gear evolution from Images & Words to the Winery Dogs era. Tama to DW — every kit, every era documented.',
  },

  // ==========================================
  // Tomas Haake - Meshuggah (1989–Present)
  // ==========================================
  'tomas-haake': {
    slug: 'tomas-haake',
    name: 'Tomas Haake',
    band: 'Meshuggah',
    totalYearsActive: '1989-Present',
    profileImage: '/images/drummers/tomas-haake.webp',
    summary: 'Tomas Haake\'s gear evolution tracks the development of djent and extreme precision drumming — from a budget kit in Umeå basements to the DW/ddrum hybrid rig that has defined modern metal drumming for two decades.',

    eras: [
      {
        id: 'haake-1991-contradictions',
        era: 'Contradictions Collapse Era',
        years: '1989–1993',
        startYear: 1989,
        endYear: 1993,
        description: 'Meshuggah\'s debut records. Haake was still developing his signature polyrhythmic approach on whatever gear the band could source in Umeå, Sweden.',
        albums: ['Contradictions Collapse (1991)', 'None (1994 EP)'],
        tours: ['Early Swedish club dates'],
        image: null,

        gear: {
          drums: {
            item: 'Sonor Force 2001',
            details: 'Basic 5-piece: 22" kick, 12"/13"/16" toms',
            notes: 'Budget Swedish-sourced kit; available and affordable in early 1990s Scandinavia.',
            change: null,
          },
          snare: {
            item: 'Sonor Steel 14"×5.5"',
            details: 'Standard steel snare',
            notes: 'Basic steel snare — the polyrhythmic patterns were more important than gear quality at this stage.',
            change: null,
          },
          cymbals: {
            item: 'Paiste 2002',
            details: '14" hi-hats, 16"/18" crashes, 20" ride',
            notes: 'Paiste was the dominant Swedish cymbal brand of choice.',
            change: null,
          },
          hardware: {
            item: 'Sonor hardware with budget double pedal',
            details: 'Single pedal moving to double bass during this period',
            notes: 'Double kick emerging as Haake developed his extreme metal approach.',
            change: null,
          },
          sticks: {
            item: 'Vic Firth 5B',
            details: 'Standard hickory',
            notes: 'Standard sticks — technique mattered more than equipment.',
            change: null,
          },
          heads: {
            item: 'Remo Ambassador',
            details: 'Clear on toms',
            notes: 'Standard configuration.',
            change: null,
          },
        },

        estimatedCost: {
          original: 2500,
          inflationAdjusted: 5500,
          currency: 'USD',
        },

        keyChanges: [
          'Developed polyrhythmic drumming vocabulary',
          'Transition from single to double bass',
          'Founding of the Meshuggah rhythmic identity',
        ],

        quote: {
          text: "We had absolutely nothing. Whatever we could get hold of in Umeå. The gear was secondary — the patterns were everything.",
          source: 'Modern Drummer, 2005',
        },

        videos: [],
      },

      {
        id: 'haake-1995-destroy-erase',
        era: 'Destroy Erase Improve Era',
        years: '1994–1997',
        startYear: 1994,
        endYear: 1997,
        description: 'The album that put Meshuggah on the extreme metal map. Haake\'s technical precision demanded better gear, and first endorsement conversations began.',
        albums: ['Destroy Erase Improve (1995)'],
        tours: ['DEI European Tour'],
        image: null,

        gear: {
          drums: {
            item: 'Pearl Export Series',
            details: '22" kick, 10"/12"/13"/16" toms',
            notes: 'Upgraded to Pearl for better projection and reliability on tour.',
            change: CHANGE_TYPES.SWITCH,
          },
          snare: {
            item: 'Pearl Free-Floating Steel 14"×5"',
            details: 'Steel shell, thin hoops',
            notes: 'Tight, explosive snare crack needed for the complex syncopated patterns.',
            change: CHANGE_TYPES.SWITCH,
          },
          cymbals: {
            item: 'Paiste 2002 / Alpha',
            details: '14" hi-hats, 17"/18" crashes, 20" ride, 18" China',
            notes: 'Mix of Paiste lines — volume and cut for the dense guitar wall.',
            change: CHANGE_TYPES.UPGRADE,
          },
          hardware: {
            item: 'Pearl P-2002C Eliminator Double Pedal',
            details: 'Cam-driven double pedal',
            notes: 'Pearl Eliminator for fast, consistent double bass work.',
            change: CHANGE_TYPES.SWITCH,
          },
          sticks: {
            item: 'Vic Firth 5B',
            details: 'Standard hickory',
            notes: 'No signature deal yet.',
            change: null,
          },
          heads: {
            item: 'Remo Emperor',
            details: 'Double-ply on toms',
            notes: 'Durability for the aggressive approach.',
            change: CHANGE_TYPES.UPGRADE,
          },
        },

        estimatedCost: {
          original: 4500,
          inflationAdjusted: 9000,
          currency: 'USD',
        },

        keyChanges: [
          'Switch to Pearl for better reliability',
          'Double bass fully integrated into style',
          'Destroy Erase Improve — Haake becomes a household name in extreme metal',
        ],

        quote: {
          text: "DEI was the record where the rhythmic concept clicked. The drummer has to be almost machine-like, yet organic. That paradox defines what I do.",
          source: 'Terrorizer Magazine, 1996',
        },

        videos: [],
      },

      {
        id: 'haake-1998-chaosphere',
        era: 'Chaosphere Era',
        years: '1998–2001',
        startYear: 1998,
        endYear: 2001,
        description: 'Meshuggah\'s most extreme album. Haake secured his first major Pearl endorsement and the Chaosphere kit became his first truly professional rig.',
        albums: ['Chaosphere (1998)'],
        tours: ['Chaosphere World Tour', 'Ozzfest 1999'],
        image: null,

        gear: {
          drums: {
            item: 'Pearl Masters Premium',
            details: 'Maple shells: 22" kick, 10"/12"/14"/16" toms',
            notes: 'First major endorsement kit — Pearl Masters Premium maple shells for warm, focused tone.',
            change: CHANGE_TYPES.SWITCH,
          },
          snare: {
            item: 'Pearl Free-Floating Steel 14"×6.5"',
            details: 'Deeper shell for more crack',
            notes: 'Increased depth for more projection through the dense Chaosphere mix.',
            change: CHANGE_TYPES.UPGRADE,
          },
          cymbals: {
            item: 'Paiste Signature / RUDE',
            details: '14" Heavy hi-hats, 18"/19" crashes, 22" ride, 20" China',
            notes: 'Moved up to Paiste Signature and RUDE for volume and durability.',
            change: CHANGE_TYPES.UPGRADE,
          },
          hardware: {
            item: 'Pearl Eliminator / Demon Drive',
            details: 'Fast double pedal for extreme tempos',
            notes: 'Pearl\'s fastest pedal for Chaosphere\'s relentless tempos.',
            change: CHANGE_TYPES.UPGRADE,
          },
          sticks: {
            item: 'Vic Firth 5B Nylon',
            details: 'Nylon tip for bright attack',
            notes: 'Nylon tip helps cut through in dense mix.',
            change: CHANGE_TYPES.UPGRADE,
          },
          heads: {
            item: 'Remo Emperor / Powerstroke 3',
            details: 'Emperor on toms, Powerstroke 3 on kick',
            notes: 'Powerstroke 3 on kick for punchy, focused attack.',
            change: CHANGE_TYPES.SWITCH,
          },
          electronics: {
            item: 'ddrum Triggers',
            details: 'Kick drum triggers for live consistency',
            notes: 'Triggers introduced to ensure kick cuts through at live volumes.',
            change: CHANGE_TYPES.NEW,
          },
        },

        estimatedCost: {
          original: 10000,
          inflationAdjusted: 18500,
          currency: 'USD',
        },

        keyChanges: [
          'Pearl Masters Premium endorsement begins',
          'ddrum triggers introduced for live kick consistency',
          'Paiste Signature cymbal upgrade',
          'Ozzfest 1999 brought Meshuggah to US audiences',
        ],

        quote: {
          text: "Pearl gave me gear that could actually survive the tour. Chaosphere was 180+ BPM every night. The equipment had to be bulletproof.",
          source: 'Modern Drummer, 1999',
        },

        videos: [],
      },

      {
        id: 'haake-2002-nothing',
        era: 'Nothing Era',
        years: '2002–2004',
        startYear: 2002,
        endYear: 2004,
        description: 'Meshuggah\'s most experimental record, featuring an 8-string guitar tuned to F#. Haake\'s kit adapted to the lower, drone-like sonic palette.',
        albums: ['Nothing (2002)'],
        tours: ['Nothing World Tour'],
        image: null,

        gear: {
          drums: {
            item: 'Pearl Masters Premium Custom',
            details: 'Maple shells: 22" kick, 8"/10"/12"/14"/16" toms',
            notes: 'Added smaller 8" tom for higher melodic range against the very low guitars.',
            change: CHANGE_TYPES.UPGRADE,
          },
          snare: {
            item: 'Pearl Free-Floating 14"×6.5"',
            details: 'Steel — continued',
            notes: 'Consistent snare sound through multiple album cycles.',
            change: null,
          },
          cymbals: {
            item: 'Paiste Signature Dark Energy',
            details: '14" hi-hats, 18"/20" crashes, 22" ride, 20" China',
            notes: 'Switched to darker Paiste sound to complement low-tuned 8-string guitars.',
            change: CHANGE_TYPES.SWITCH,
          },
          hardware: {
            item: 'Pearl Demon Drive Double Pedal',
            details: 'Direct drive for maximum control',
            notes: 'Direct drive gives more precision for Nothing\'s complex rhythmic patterns.',
            change: CHANGE_TYPES.UPGRADE,
          },
          sticks: {
            item: 'Vic Firth 5B',
            details: 'Continued hickory',
            notes: 'No major stick change.',
            change: null,
          },
          heads: {
            item: 'Remo Emperor / Powerstroke 3',
            details: 'Consistent heads setup',
            notes: 'Reliable configuration maintained.',
            change: null,
          },
          electronics: {
            item: 'ddrum Acoustic Pro Triggers',
            details: 'Kick and snare triggering',
            notes: 'More sophisticated trigger setup for studio and live use.',
            change: CHANGE_TYPES.UPGRADE,
          },
        },

        estimatedCost: {
          original: 12000,
          inflationAdjusted: 21000,
          currency: 'USD',
        },

        keyChanges: [
          'Added 8" tom for textural range',
          'Darker Paiste cymbal palette for low-tuned context',
          'Direct drive double pedal for maximum control',
        ],

        quote: {
          text: "Nothing was about space and drone as much as aggression. The rhythmic displacement was more extreme than ever.",
          source: 'Revolver, 2002',
        },

        videos: [],
      },

      {
        id: 'haake-2005-catch-33',
        era: 'Catch Thirtythree Era',
        years: '2005–2007',
        startYear: 2005,
        endYear: 2007,
        description: 'A single 47-minute piece of music. The Catch 33 album was an exercise in sustained rhythmic complexity and Haake\'s approach became even more metronomic.',
        albums: ['Catch Thirtythree (2005)'],
        tours: ['Catch 33 Tour'],
        image: null,

        gear: {
          drums: {
            item: 'Pearl Reference Series',
            details: 'Maple/birch hybrid shells: 22" kick, 10"/12"/14"/16" toms',
            notes: 'Upgraded to Pearl Reference for the hybrid maple/birch tone.',
            change: CHANGE_TYPES.UPGRADE,
          },
          snare: {
            item: 'Pearl Free-Floating Steel 14"×6.5"',
            details: 'Continued Free-Floating preference',
            notes: 'Consistent snare across multiple albums.',
            change: null,
          },
          cymbals: {
            item: 'Paiste Signature Dark Energy',
            details: 'Full dark energy setup — 14" hi-hats, crashes, 22" ride, China',
            notes: 'Continued dark cymbal palette.',
            change: null,
          },
          hardware: {
            item: 'Pearl Demon Drive',
            details: 'Continued direct drive',
            notes: 'Maintained pedal preference.',
            change: null,
          },
          sticks: {
            item: 'Vic Firth 5B',
            details: 'Continued hickory 5B',
            notes: 'No signature deal yet — consistent tool across the decade.',
            change: null,
          },
          heads: {
            item: 'Remo Emperor',
            details: 'Double-ply throughout',
            notes: 'Durability on extended touring.',
            change: null,
          },
          electronics: {
            item: 'ddrum Acoustic Pro Triggers + click track system',
            details: 'Full in-ear monitor system integrated',
            notes: 'Click track via IEMs essential for Meshuggah\'s precision live approach.',
            change: CHANGE_TYPES.UPGRADE,
          },
        },

        estimatedCost: {
          original: 14000,
          inflationAdjusted: 22000,
          currency: 'USD',
        },

        keyChanges: [
          'Pearl Reference upgrade',
          'Full IEM click track system integrated',
          'Catch 33 demonstrated Haake\'s machine-like precision',
        ],

        quote: {
          text: "Catch 33 was one piece of music. Forty-seven minutes. Every bar was plotted. I had to be absolutely locked in the entire time.",
          source: 'Metal Hammer, 2005',
        },

        videos: [],
      },

      {
        id: 'haake-2008-obzen',
        era: 'obZen Era',
        years: '2008–2011',
        startYear: 2008,
        endYear: 2011,
        description: 'The album that introduced Meshuggah to a new generation. obZen features some of Haake\'s most celebrated performances and his switch to DW — the beginning of his most iconic setup.',
        albums: ['obZen (2008)'],
        tours: ['obZen World Tour', 'Alive (DVD)'],
        image: null,

        gear: {
          drums: {
            item: 'DW Collector\'s Series',
            details: 'Maple shells: 22" kick, 8"/10"/12"/14"/16" toms',
            notes: 'Major brand switch to DW — warmer, more resonant maple tone compared to Pearl.',
            change: CHANGE_TYPES.SWITCH,
          },
          snare: {
            item: 'DW Edge Tomas Haake Signature',
            details: '14"×6.5" Steel',
            notes: 'First Tomas Haake signature snare with DW.',
            change: CHANGE_TYPES.SIGNATURE,
          },
          cymbals: {
            item: 'Paiste Signature Dark Energy',
            details: '14" hi-hats, 18"/19" crashes, 22" ride, 20" China',
            notes: 'Maintained Paiste partnership through brand switch.',
            change: null,
          },
          hardware: {
            item: 'DW 9000 Double Pedal',
            details: 'Twin-chain drive double pedal',
            notes: 'DW 9000 to match DW kit endorsement.',
            change: CHANGE_TYPES.SWITCH,
          },
          sticks: {
            item: 'Vic Firth Tomas Haake Signature',
            details: 'Hickory, medium taper, nylon tip',
            notes: 'First Tomas Haake signature drumstick — long-awaited.',
            change: CHANGE_TYPES.SIGNATURE,
          },
          heads: {
            item: 'Evans G2 / EMAD',
            details: 'G2 on toms, EMAD on kicks',
            notes: 'Switched to Evans for better durability.',
            change: CHANGE_TYPES.SWITCH,
          },
          electronics: {
            item: 'ddrum Acoustic Pro Triggers',
            details: 'Trigger on kick and snare',
            notes: 'ddrum triggers maintained even after drum brand switch.',
            change: null,
          },
        },

        estimatedCost: {
          original: 20000,
          inflationAdjusted: 29000,
          currency: 'USD',
        },

        keyChanges: [
          'Brand switch to DW Collector\'s Series',
          'First DW Tomas Haake signature snare',
          'First Vic Firth Tomas Haake signature sticks',
          'obZen became Meshuggah\'s breakthrough to mainstream metal',
        ],

        quote: {
          text: "DW gave me the warmth I couldn't get from Pearl for this kind of music. The maple breathes more. obZen needed that.",
          source: 'DW Drums Artist Profile, 2008',
        },

        videos: [],
      },

      {
        id: 'haake-2012-koloss',
        era: 'Koloss / Violent Sleep Era',
        years: '2012–2018',
        startYear: 2012,
        endYear: 2018,
        description: 'Meshuggah\'s most groove-oriented albums. Haake\'s setup was refined and stabilized — a system that would serve him for the next decade.',
        albums: ['Koloss (2012)', 'The Violent Sleep of Reason (2016)'],
        tours: ['Koloss World Tour', 'Violent Sleep of Reason Tour'],
        image: null,

        gear: {
          drums: {
            item: 'DW Collector\'s Series (refined)',
            details: 'Custom finish maple: 22" kick, 8"/10"/12"/14"/16" toms',
            notes: 'Refined configuration — stable, proven setup.',
            change: null,
          },
          snare: {
            item: 'DW Tomas Haake Signature (updated)',
            details: '14"×6.5" Steel, updated finish',
            notes: 'Updated signature snare model with DW.',
            change: CHANGE_TYPES.UPGRADE,
          },
          cymbals: {
            item: 'Paiste Signature Tomas Haake Dark Energy',
            details: 'Dark Energy series curated for Haake',
            notes: 'Paiste developed dedicated Dark Energy configuration for Haake\'s needs.',
            change: CHANGE_TYPES.SIGNATURE,
          },
          hardware: {
            item: 'DW 9000 Double Pedal',
            details: 'Continued 9000 series',
            notes: 'Consistent DW pedal preference.',
            change: null,
          },
          sticks: {
            item: 'Vic Firth Tomas Haake Signature',
            details: 'Refined model with longer shoulder',
            notes: 'Updated stick spec for better rimshot response.',
            change: CHANGE_TYPES.UPGRADE,
          },
          heads: {
            item: 'Evans G2 / EMAD2',
            details: 'EMAD2 on kick for more focused attack',
            notes: 'EMAD2 gives tighter low-end response for The Violent Sleep\'s live-tracked drums.',
            change: CHANGE_TYPES.UPGRADE,
          },
          electronics: {
            item: 'ddrum Acoustic Pro + Roland SPD-SX',
            details: 'Trigger system plus sampling pad',
            notes: 'Added Roland SPD-SX for expanded sample triggering.',
            change: CHANGE_TYPES.UPGRADE,
          },
        },

        estimatedCost: {
          original: 22000,
          inflationAdjusted: 28000,
          currency: 'USD',
        },

        keyChanges: [
          'Paiste signature Dark Energy cymbal configuration',
          'Violent Sleep of Reason fully live-tracked — most demanding recording',
          'Roland SPD-SX added for sample triggering',
          'Setup reached its definitive stable configuration',
        ],

        quote: {
          text: "The Violent Sleep of Reason was recorded completely live as a band. No click track, no fixes. The kit had to sound perfect from the first note.",
          source: 'Drum! Magazine, 2016',
        },

        videos: [],
      },

      {
        id: 'haake-2022-immutable',
        era: 'Immutable Era',
        years: '2022–Present',
        startYear: 2022,
        endYear: 2026,
        description: 'Meshuggah\'s most recent album. Haake\'s setup remains the most refined of his career — DW, Paiste, ddrum, and Vic Firth all continuing long-term partnerships.',
        albums: ['Immutable (2022)'],
        tours: ['Immutable World Tour 2022–2023'],
        image: null,

        gear: {
          drums: {
            item: 'DW Collector\'s Series Custom',
            details: 'Custom lacquer finish maple: 22" kick, 8"/10"/12"/14"/16" toms',
            notes: 'Current primary kit — DW maple in custom finish.',
            change: null,
          },
          snare: {
            item: 'DW Tomas Haake Signature 14"×6.5"',
            details: 'Steel shell, current production model',
            notes: 'Definitive signature snare — widely regarded as one of metal\'s best snare sounds.',
            change: null,
          },
          cymbals: {
            item: 'Paiste Signature Dark Energy Suite',
            details: '14" Dark Energy hi-hats, 18"/19" crashes, 22" ride, 20" China',
            notes: 'Complete Dark Energy configuration purpose-built for Meshuggah\'s sonic needs.',
            change: null,
          },
          hardware: {
            item: 'DW 9000XF Double Pedal',
            details: 'Extended footboard for toe-up technique',
            notes: 'XF extended footboard accommodates Haake\'s heel-up technique.',
            change: CHANGE_TYPES.UPGRADE,
          },
          sticks: {
            item: 'Vic Firth Tomas Haake Signature',
            details: 'Hickory, nylon tip, medium taper',
            notes: 'Current production model.',
            change: null,
          },
          heads: {
            item: 'Evans G2 / EMAD2',
            details: 'Consistent Evans configuration',
            notes: 'Decade-plus with Evans.',
            change: null,
          },
          electronics: {
            item: 'ddrum Acoustic Pro + Roland SPD-SX',
            details: 'Kick and snare triggers, SPD-SX for samples',
            notes: 'Refined hybrid system — the current standard Haake live rig.',
            change: null,
          },
        },

        estimatedCost: {
          original: 28000,
          inflationAdjusted: 28000,
          currency: 'USD',
        },

        keyChanges: [
          'DW 9000XF extended footboard for technique refinement',
          'Most stable and refined setup of career',
          'Immutable world tour confirmed DW/Paiste/ddrum as long-term partnerships',
        ],

        quote: {
          text: "Everything in the setup has been field-tested over hundreds of shows. Nothing is accidental. Every piece is there for a reason.",
          source: 'Vic Firth Artist Profile, 2022',
        },

        videos: [],
      },
    ],

    metaTitle: 'Tomas Haake Gear Evolution Timeline | Meshuggah Drum Kit History',
    metaDescription: 'Explore Tomas Haake\'s complete drum gear evolution from Meshuggah\'s debut to Immutable. Sonor to Pearl to DW — every kit and era documented.',
  },

  // ==========================================
  // Brann Dailor - Mastodon (1999–Present)
  // ==========================================
  'brann-dailor': {
    slug: 'brann-dailor',
    name: 'Brann Dailor',
    band: 'Mastodon',
    totalYearsActive: '1999-Present',
    profileImage: '/images/drummers/brann-dailor.webp',
    summary: 'Brann Dailor\'s gear evolution mirrors Mastodon\'s rise from Atlanta\'s underground to progressive metal headliners — moving from budget Mapex kits through an era-defining Gretsch relationship that shaped one of modern metal\'s most distinctive drum sounds.',

    eras: [
      {
        id: 'dailor-2002-remission',
        era: 'Remission Era',
        years: '1999–2003',
        startYear: 1999,
        endYear: 2003,
        description: 'Mastodon\'s ferocious debut. Dailor\'s jazz-informed, melodic drumming over sludge metal foundations was immediately distinctive — even on a budget Mapex kit.',
        albums: ['Lifesblood EP (2001)', 'Remission (2002)'],
        tours: ['Early US club touring', 'Remission US Tour'],
        image: null,

        gear: {
          drums: {
            item: 'Mapex V Series',
            details: 'Poplar shells: 22" kick, 10"/12"/16" toms',
            notes: 'Entry-level Mapex kit — affordable and available for a band just getting started in Atlanta.',
            change: null,
          },
          snare: {
            item: 'Mapex Black Panther 14"×5"',
            details: 'Steel shell, thin hoops',
            notes: 'The Black Panther was Mapex\'s budget snare line — punchy and loud for the raw sludge sound.',
            change: null,
          },
          cymbals: {
            item: 'Zildjian A Series',
            details: '14" hi-hats, 16"/18" crashes, 20" ride',
            notes: 'Standard Zildjian A setup — affordable, reliable.',
            change: null,
          },
          hardware: {
            item: 'Mapex Hardware + DW 5000 Double Pedal',
            details: 'Budget stands, professional pedal',
            notes: 'The DW 5000 double pedal was a priority investment for double bass work.',
            change: null,
          },
          sticks: {
            item: 'Vic Firth 5B',
            details: 'Standard hickory',
            notes: 'Standard sticks — no signature deal yet.',
            change: null,
          },
          heads: {
            item: 'Remo Ambassador',
            details: 'Clear on toms, coated on snare',
            notes: 'Standard configuration.',
            change: null,
          },
        },

        estimatedCost: {
          original: 2800,
          inflationAdjusted: 4800,
          currency: 'USD',
        },

        keyChanges: [
          'First Mastodon recording setup',
          'Jazz-influenced approach applied to sludge metal',
          'DW 5000 double pedal — priority investment despite budget kit',
        ],

        quote: {
          text: "We were just a band from Atlanta with whatever gear we could afford. But the drumming concept was there from day one.",
          source: 'Drum! Magazine, 2002',
        },

        videos: [],
      },

      {
        id: 'dailor-2004-leviathan',
        era: 'Leviathan Era',
        years: '2004–2005',
        startYear: 2004,
        endYear: 2005,
        description: 'The album that made Mastodon\'s name worldwide. Leviathan\'s complex arrangements pushed Dailor to the limits and motivated an equipment upgrade.',
        albums: ['Leviathan (2004)'],
        tours: ['Leviathan World Tour', 'Ozzfest 2004'],
        image: null,

        gear: {
          drums: {
            item: 'Mapex Pro M Series',
            details: 'Maple shells: 22" kick, 10"/12"/14"/16" toms',
            notes: 'Significant upgrade to Mapex Pro M maple shells for Leviathan and Ozzfest touring.',
            change: CHANGE_TYPES.UPGRADE,
          },
          snare: {
            item: 'Mapex Black Panther 14"×5.5"',
            details: 'Steel shell, deeper version',
            notes: 'Deeper Black Panther for more punch in larger venues.',
            change: CHANGE_TYPES.UPGRADE,
          },
          cymbals: {
            item: 'Zildjian A Custom',
            details: '14" hi-hats, 17"/18" crashes, 21" ride, 18" China',
            notes: 'Upgraded to A Custom for brighter, cutting tone.',
            change: CHANGE_TYPES.UPGRADE,
          },
          hardware: {
            item: 'DW 5000 Double Pedal (continued)',
            details: 'Turbo cam version',
            notes: 'Continued DW 5000 loyalty.',
            change: null,
          },
          sticks: {
            item: 'Vic Firth 5A',
            details: 'Lighter stick for faster playing',
            notes: 'Lighter sticks to accommodate the fast, melodic patterns on Leviathan.',
            change: CHANGE_TYPES.SWITCH,
          },
          heads: {
            item: 'Remo Emperor',
            details: 'Double-ply for durability on Ozzfest',
            notes: 'Heavier heads for outdoor festival touring.',
            change: CHANGE_TYPES.UPGRADE,
          },
        },

        estimatedCost: {
          original: 5500,
          inflationAdjusted: 9000,
          currency: 'USD',
        },

        keyChanges: [
          'Upgrade to Mapex Pro M maple shells',
          'Lighter sticks for faster melodic patterns',
          'Ozzfest 2004 brought Mastodon to mainstream metal audience',
        ],

        quote: {
          text: "Leviathan was our first major label record. We had to up our game in every department — including the drums.",
          source: 'Modern Drummer, 2004',
        },

        videos: [],
      },

      {
        id: 'dailor-2006-blood-mountain',
        era: 'Blood Mountain Era',
        years: '2006–2008',
        startYear: 2006,
        endYear: 2008,
        description: 'Mastodon signs to Reprise/Warner and makes their most accessible album yet. Dailor switches to Gretsch, beginning the defining endorsement of his career.',
        albums: ['Blood Mountain (2006)'],
        tours: ['Blood Mountain World Tour', 'Sounds of the Underground'],
        image: null,

        gear: {
          drums: {
            item: 'Gretsch USA Custom',
            details: 'Maple shells: 22" kick, 10"/12"/14"/16" toms',
            notes: 'Brand switch to Gretsch USA Custom — the partnership that would define Dailor\'s sound for the next 15+ years.',
            change: CHANGE_TYPES.SWITCH,
          },
          snare: {
            item: 'Gretsch USA 14"×5" Maple',
            details: 'Maple shell, die-cast hoops',
            notes: 'First Gretsch snare — warm, round sound distinct from the steel snares of the Mapex era.',
            change: CHANGE_TYPES.SWITCH,
          },
          cymbals: {
            item: 'Zildjian A Custom',
            details: '14" A Custom hi-hats, 17"/18"/19" crashes, 21" ride, 18" China',
            notes: 'Continued Zildjian A Custom partnership.',
            change: null,
          },
          hardware: {
            item: 'DW 9000 Double Pedal',
            details: 'Upgraded from DW 5000',
            notes: 'Stepped up to DW 9000 for more control at higher tempos.',
            change: CHANGE_TYPES.UPGRADE,
          },
          sticks: {
            item: 'Vic Firth 5A',
            details: 'Continued lightweight preference',
            notes: 'Consistent stick choice.',
            change: null,
          },
          heads: {
            item: 'Remo Coated Ambassador',
            details: 'Coated for warmer tone with Gretsch',
            notes: 'Coated heads pair well with Gretsch maple shells\' natural warmth.',
            change: CHANGE_TYPES.SWITCH,
          },
        },

        estimatedCost: {
          original: 9000,
          inflationAdjusted: 14000,
          currency: 'USD',
        },

        keyChanges: [
          'Brand switch to Gretsch USA Custom — career-defining move',
          'DW 9000 double pedal upgrade',
          'Gretsch warm maple tone becomes part of Mastodon\'s signature sound',
        ],

        quote: {
          text: "Gretsch changed everything for me. The warmth of those maple shells under all that distortion — it was exactly the balance I was looking for.",
          source: 'Gretsch Artist Profile, 2006',
        },

        videos: [],
      },

      {
        id: 'dailor-2009-crack-the-skye',
        era: 'Crack the Skye Era',
        years: '2009–2010',
        startYear: 2009,
        endYear: 2010,
        description: 'Mastodon\'s most progressive and personal album. Dailor\'s drumming on Crack the Skye is widely considered the finest of his career — and the kit matched the ambition.',
        albums: ['Crack the Skye (2009)'],
        tours: ['Crack the Skye World Tour', 'Bonnaroo 2009'],
        image: null,

        gear: {
          drums: {
            item: 'Gretsch USA Custom (expanded)',
            details: 'Maple: 22" kick, 8"/10"/12"/14"/16"/18" toms',
            notes: 'Expanded kit with additional toms for the complex progressive arrangements.',
            change: CHANGE_TYPES.UPGRADE,
          },
          snare: {
            item: 'Gretsch USA Custom 14"×6.5"',
            details: 'Maple shell, deeper for more body',
            notes: 'Deeper snare for the fuller, more cinematic drum sound on Crack the Skye.',
            change: CHANGE_TYPES.UPGRADE,
          },
          cymbals: {
            item: 'Zildjian A Custom / K Series',
            details: '14" A Custom hi-hats, K Dark crashes, 22" K Constantinople ride, China',
            notes: 'Added K and K Constantinople cymbals for more complex tonal variety.',
            change: CHANGE_TYPES.UPGRADE,
          },
          hardware: {
            item: 'DW 9000 Double Pedal',
            details: 'Continued 9000 series',
            notes: 'Consistent pedal choice.',
            change: null,
          },
          sticks: {
            item: 'Vic Firth Brann Dailor Signature',
            details: 'Hickory, medium taper',
            notes: 'First Brann Dailor signature drumstick with Vic Firth.',
            change: CHANGE_TYPES.SIGNATURE,
          },
          heads: {
            item: 'Remo Coated Ambassador / Fiberskyn',
            details: 'Mix for different tonal qualities',
            notes: 'Fiberskyn on select toms for warmer, more vintage-inspired tones.',
            change: CHANGE_TYPES.UPGRADE,
          },
        },

        estimatedCost: {
          original: 14000,
          inflationAdjusted: 20000,
          currency: 'USD',
        },

        keyChanges: [
          'Vic Firth Brann Dailor signature drumstick launched',
          'Expanded tom configuration for progressive arrangements',
          'K Constantinople ride adds complexity to cymbal palette',
          'Crack the Skye nominated for Grammy, considered prog metal landmark',
        ],

        quote: {
          text: "Crack the Skye was about Bill (Kelliher\'s sister) and transcendence. Every fill was emotional. The Gretsch kit had to sing.",
          source: 'Revolver Magazine, 2009',
        },

        videos: [],
      },

      {
        id: 'dailor-2011-the-hunter',
        era: 'The Hunter Era',
        years: '2011–2013',
        startYear: 2011,
        endYear: 2013,
        description: 'Mastodon\'s most rock-oriented album. Dailor\'s setup was refined and streamlined to serve the more accessible songwriting approach.',
        albums: ['The Hunter (2011)'],
        tours: ['The Hunter World Tour', 'Rockstar Energy Mayhem Festival 2011'],
        image: null,

        gear: {
          drums: {
            item: 'Gretsch USA Custom',
            details: 'Maple: 22" kick, 10"/12"/14"/16" toms (streamlined from Crack the Skye)',
            notes: 'Pulled back to tighter 4-tom configuration for the more concise song structures.',
            change: CHANGE_TYPES.SWITCH,
          },
          snare: {
            item: 'Gretsch USA Custom 14"×5"',
            details: 'Shallower maple snare for sharper attack',
            notes: 'Shallower snare for the brighter, more punchy rock sound of The Hunter.',
            change: CHANGE_TYPES.SWITCH,
          },
          cymbals: {
            item: 'Zildjian A Custom',
            details: '14" hi-hats, 17"/18"/19" crashes, 21" ride, 18" China',
            notes: 'Streamlined back to A Custom for the more direct rock sound.',
            change: CHANGE_TYPES.SWITCH,
          },
          hardware: {
            item: 'DW 9000 Double Pedal',
            details: 'Continued DW 9000',
            notes: 'Consistent hardware choice.',
            change: null,
          },
          sticks: {
            item: 'Vic Firth Brann Dailor Signature',
            details: 'Continued signature',
            notes: 'Maintained Vic Firth signature partnership.',
            change: null,
          },
          heads: {
            item: 'Remo Coated Ambassador',
            details: 'Consistent coated Ambassador preference',
            notes: 'Warmer coated heads suit the Gretsch maple character.',
            change: null,
          },
        },

        estimatedCost: {
          original: 12000,
          inflationAdjusted: 16000,
          currency: 'USD',
        },

        keyChanges: [
          'Streamlined kit for more concise rock arrangements',
          'Shallower snare for punchier attack',
          'Mastodon won Grammy for "Blood and Thunder" (performed at Grammys 2011)',
        ],

        quote: {
          text: "The Hunter was us being a rock band. Stripped back. The kit reflected that — fewer toms, less complexity, more punch.",
          source: 'Drum! Magazine, 2011',
        },

        videos: [],
      },

      {
        id: 'dailor-2014-once-more',
        era: 'Once More Round the Sun Era',
        years: '2014–2016',
        startYear: 2014,
        endYear: 2016,
        description: 'Mastodon returns to a heavier, more progressive approach. Dailor\'s kit re-expanded and his Gretsch partnership produced its first signature model.',
        albums: ['Once More \'Round the Sun (2014)'],
        tours: ['Once More \'Round the Sun World Tour', 'Download Festival 2014'],
        image: null,

        gear: {
          drums: {
            item: 'Gretsch Brann Dailor Signature Kit',
            details: 'Maple: 22" kick, 10"/12"/14"/16" toms in custom finish',
            notes: 'First Brann Dailor signature drum kit from Gretsch — collaboration with the band\'s aesthetic.',
            change: CHANGE_TYPES.SIGNATURE,
          },
          snare: {
            item: 'Gretsch Brann Dailor Signature Snare',
            details: '14"×6" Maple in custom wrap',
            notes: 'Signature snare drum with Gretsch — warm maple tone with distinctive wrap finish.',
            change: CHANGE_TYPES.SIGNATURE,
          },
          cymbals: {
            item: 'Zildjian A Custom / K Dark',
            details: '14" A Custom hi-hats, K Dark crashes, 22" ride, 18" China',
            notes: 'Mix of A Custom and K Dark for tonal range.',
            change: CHANGE_TYPES.UPGRADE,
          },
          hardware: {
            item: 'DW 9000 Double Pedal',
            details: 'Continued DW 9000',
            notes: 'Consistent hardware preference.',
            change: null,
          },
          sticks: {
            item: 'Vic Firth Brann Dailor Signature',
            details: 'Refined model — hickory, medium taper',
            notes: 'Updated signature stick spec.',
            change: CHANGE_TYPES.UPGRADE,
          },
          heads: {
            item: 'Remo Coated Ambassador',
            details: 'Consistent coated Ambassador',
            notes: 'Warm tone maintained.',
            change: null,
          },
        },

        estimatedCost: {
          original: 16000,
          inflationAdjusted: 20000,
          currency: 'USD',
        },

        keyChanges: [
          'First Gretsch Brann Dailor signature drum kit',
          'Gretsch signature snare released',
          'K Dark crashes add complexity to cymbal selection',
        ],

        quote: {
          text: "Having a signature kit with Gretsch was surreal. Those drums are a part of my identity at this point.",
          source: 'Gretsch Artist Profile, 2014',
        },

        videos: [],
      },

      {
        id: 'dailor-2017-emperor-of-sand',
        era: 'Emperor of Sand Era',
        years: '2017–2019',
        startYear: 2017,
        endYear: 2019,
        description: 'Mastodon\'s most personal album — written during members\' family battles with cancer. Dailor\'s drumming is emotionally raw and his kit reached new sophistication.',
        albums: ['Emperor of Sand (2017)'],
        tours: ['Emperor of Sand World Tour', 'Ozzfest Meets Knotfest 2017'],
        image: null,

        gear: {
          drums: {
            item: 'Gretsch Brann Dailor Signature (updated)',
            details: 'Custom maple: 22" kick, 8"/10"/12"/14"/16" toms',
            notes: 'Updated signature kit with 8" tom re-added for Emperor of Sand\'s dynamic range.',
            change: CHANGE_TYPES.UPGRADE,
          },
          snare: {
            item: 'Gretsch Brann Dailor Signature Snare 14"×6.5"',
            details: 'Updated deeper model',
            notes: 'Deeper signature snare for fuller body in Emperor\'s dramatic dynamics.',
            change: CHANGE_TYPES.UPGRADE,
          },
          cymbals: {
            item: 'Zildjian K Series',
            details: '14" K hi-hats, K Dark crashes 16"/17"/18"/19", 22" K Constantinople ride, China',
            notes: 'Fully transitioned to K Series for darker, more complex sound to match album\'s emotional depth.',
            change: CHANGE_TYPES.SWITCH,
          },
          hardware: {
            item: 'DW 9000XF Double Pedal',
            details: 'Extended footboard version',
            notes: 'Extended footboard for more heel-toe technique options.',
            change: CHANGE_TYPES.UPGRADE,
          },
          sticks: {
            item: 'Vic Firth Brann Dailor Signature',
            details: 'Current production model',
            notes: 'Continued Vic Firth partnership.',
            change: null,
          },
          heads: {
            item: 'Remo Coated Ambassador / Fiberskyn',
            details: 'Fiberskyn on floor toms for warmth',
            notes: 'Fiberskyn returns on floor toms for the album\'s more soulful passages.',
            change: CHANGE_TYPES.UPGRADE,
          },
          electronics: {
            item: 'Roland SPD-SX',
            details: 'Electronic pad for samples',
            notes: 'Electronic integration for studio effects live.',
            change: CHANGE_TYPES.NEW,
          },
        },

        estimatedCost: {
          original: 20000,
          inflationAdjusted: 24000,
          currency: 'USD',
        },

        keyChanges: [
          'Full transition to Zildjian K Series for darker tone',
          'Roland SPD-SX added for live electronics',
          'DW 9000XF extended footboard upgrade',
          'Emperor of Sand won Grammy for Best Metal Performance',
        ],

        quote: {
          text: "Emperor of Sand was about death and survival. I needed the drums to sound like a beating heart — warm, alive, but with the threat of stopping.",
          source: 'Modern Drummer, 2017',
        },

        videos: [],
      },

      {
        id: 'dailor-2021-hushed-grim',
        era: 'Hushed and Grim Era',
        years: '2021–Present',
        startYear: 2021,
        endYear: 2026,
        description: 'Mastodon\'s most ambitious album — a double LP tribute to their late manager Nick John. Dailor\'s most complete setup, refined over 20+ years with Mastodon.',
        albums: ['Hushed and Grim (2021)'],
        tours: ['Hushed and Grim World Tour 2022', 'Download Festival 2022'],
        image: null,

        gear: {
          drums: {
            item: 'Gretsch Brann Dailor Signature (current)',
            details: 'Maple shells, custom graphic wrap: 22" kick, 8"/10"/12"/14"/16" toms',
            notes: 'Current signature kit — custom graphic wrap referencing Hushed and Grim artwork.',
            change: null,
          },
          snare: {
            item: 'Gretsch Brann Dailor Signature 14"×6.5"',
            details: 'Current production model',
            notes: 'Definitive snare sound — warm, musical, and unmistakably Dailor.',
            change: null,
          },
          cymbals: {
            item: 'Zildjian K Series / K Constantinople',
            details: '14" K hi-hats, K Dark crashes, 22" K Constantinople ride, 20" China',
            notes: 'K Constantinople ride brings orchestral complexity to the dark, layered album.',
            change: CHANGE_TYPES.UPGRADE,
          },
          hardware: {
            item: 'DW 9000XF Double Pedal',
            details: 'Extended footboard, current model',
            notes: 'Consistent DW 9000XF throughout recent years.',
            change: null,
          },
          sticks: {
            item: 'Vic Firth Brann Dailor Signature',
            details: 'Current production model',
            notes: 'Over a decade of Vic Firth signature partnership.',
            change: null,
          },
          heads: {
            item: 'Remo Coated Ambassador / Fiberskyn',
            details: 'Consistent warm head combination',
            notes: 'The Gretsch/Remo combination that has defined Dailor\'s tone for 15+ years.',
            change: null,
          },
          electronics: {
            item: 'Roland SPD-SX + in-ear monitors',
            details: 'Samples and click track via IEMs',
            notes: 'IEM system for consistent click and expanded sample library.',
            change: CHANGE_TYPES.UPGRADE,
          },
        },

        estimatedCost: {
          original: 24000,
          inflationAdjusted: 24000,
          currency: 'USD',
        },

        keyChanges: [
          'K Constantinople ride for orchestral depth on double album',
          'IEM click track system fully integrated',
          'Custom graphic wrap signature kit — album tie-in',
          'Most sonically rich and refined setup of Dailor\'s career',
        ],

        quote: {
          text: "Hushed and Grim was for Nick. Every note was for him. The kit had to carry that weight — and Gretsch always delivers that warmth.",
          source: 'Revolver Magazine, 2021',
        },

        videos: [],
      },
    ],

    metaTitle: 'Brann Dailor Gear Evolution Timeline | Mastodon Drum Kit History',
    metaDescription: 'Explore Brann Dailor\'s complete drum gear evolution from Remission to Hushed and Grim. Mapex to Gretsch — every kit, every era documented.',
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

  // ==========================================
  // Gene Hoglan - Dark Angel / Death / SYL / Testament (40+ year career)
  // Issue #2671: Gear Evolution Batch 2
  // ==========================================
  'gene-hoglan': {
    slug: 'gene-hoglan',
    name: 'Gene Hoglan',
    band: 'Dark Angel / Testament',
    totalYearsActive: '1983-Present',
    profileImage: '/images/drummers/gene-hoglan.webp',
    summary: 'Known as "The Atomic Clock" for his metronomic precision, Gene Hoglan\'s gear evolved from bare-bones Dark Angel setups to massive Pearl configurations capable of delivering extreme metal\'s most technically demanding performances across six iconic bands.',

    eras: [
      {
        id: 'hoglan-1983-dark-angel',
        era: 'Dark Angel Era',
        years: '1983-1991',
        startYear: 1983,
        endYear: 1991,
        description: 'The formative years that forged "The Atomic Clock" — teenage Gene developing superhuman precision and speed at extreme metal\'s cutting edge on mid-range gear.',
        albums: ['Darkness Descends (1986)', 'Leave Scars (1989)', 'Time Does Not Heal (1991)'],
        tours: ['Darkness Descends Tour'],
        image: null,

        gear: {
          drums: {
            item: 'Pearl Export',
            details: '22" kick, 10"/12"/14"/16" toms, standard 5-piece',
            notes: 'Mid-range Pearl setup — reliable and affordable for a developing musician',
            change: null,
          },
          snare: {
            item: 'Pearl Steel 14"x5.5"',
            details: 'Standard steel snare',
            notes: 'Bright, cutting tone suited for thrash dynamics',
            change: null,
          },
          cymbals: {
            item: 'Sabian AA Series',
            details: '14" hi-hats, 16"/18" crashes, 20" ride',
            notes: 'Mid-range Sabian — the beginning of a lifelong brand loyalty',
            change: null,
          },
          hardware: {
            item: 'Pearl hardware with single/double bass pedal',
            details: 'Standard stands, transitioning from single to double bass',
            notes: 'Developing the double bass technique that would define his career',
            change: null,
          },
          sticks: {
            item: 'Vic Firth 5B',
            details: 'Standard hickory sticks',
            notes: 'Off-the-shelf sticks for brutal playing',
            change: null,
          },
          heads: {
            item: 'Remo Ambassador',
            details: 'Clear on toms, coated on snare',
            notes: 'Standard configuration',
            change: null,
          },
        },

        estimatedCost: {
          original: 2000,
          inflationAdjusted: 5000,
          currency: 'USD',
        },

        keyChanges: [
          'Joined Dark Angel at age 16 (1983)',
          'Developed foundational extreme metal technique',
          'Darkness Descends (1986) establishes his legend',
          'Double bass technique matures rapidly',
        ],

        quote: {
          text: "I didn't have great gear but I had insane drive. I practiced until my hands bled every night.",
          source: 'Modern Drummer Interview, 1989',
        },

        videos: [],
      },

      {
        id: 'hoglan-1993-death-syl',
        era: 'Death & SYL Founding Era',
        years: '1993-1999',
        startYear: 1993,
        endYear: 1999,
        description: 'Joining Death for two career-defining albums and co-founding Strapping Young Lad — the era when Gene\'s technical precision and endorsement profile took a massive leap forward.',
        albums: ['Individual Thought Patterns (1993)', 'Symbolic (1995)', 'Heavy as a Really Heavy Thing (1995)'],
        tours: ['Symbolic Tour', 'SYL Early Shows'],
        image: null,

        gear: {
          drums: {
            item: 'Pearl Masters MCX',
            details: 'Birch shells: 22" kick (×2), 8"/10"/12"/13"/14"/16" toms',
            notes: 'First Pearl Masters endorsement — massive step up in quality',
            change: CHANGE_TYPES.SWITCH,
          },
          snare: {
            item: 'Pearl Free-Floating Steel 14"x6.5"',
            details: 'Steel shell, free-floating system',
            notes: 'Maximum sensitivity and cutting power',
            change: CHANGE_TYPES.UPGRADE,
          },
          cymbals: {
            item: 'Sabian HH Series',
            details: '14" hi-hats, 17"/18" crashes, 21" ride, 18" China',
            notes: 'Sabian endorsement formalised — HH for warmth and definition',
            change: CHANGE_TYPES.UPGRADE,
          },
          hardware: {
            item: 'Pearl hardware with DW 5000 double pedal',
            details: 'Professional double bass setup',
            notes: 'Double bass fully integrated into core playing style',
            change: CHANGE_TYPES.UPGRADE,
          },
          sticks: {
            item: 'Vic Firth 5B/2B',
            details: 'Hickory, heavier models for larger venues',
            notes: 'Building toward a signature model',
            change: CHANGE_TYPES.UPGRADE,
          },
          heads: {
            item: 'Remo Emperor',
            details: 'Double-ply for durability',
            notes: 'Needed tougher heads for the sheer intensity of playing',
            change: CHANGE_TYPES.UPGRADE,
          },
        },

        estimatedCost: {
          original: 9000,
          inflationAdjusted: 18000,
          currency: 'USD',
        },

        keyChanges: [
          'Pearl Masters endorsement begins',
          'Joined Death — recorded Individual Thought Patterns and Symbolic',
          'Co-founded Strapping Young Lad',
          'Double bass kit now standard configuration',
          'Sabian endorsement formalised',
        ],

        quote: {
          text: "Playing with Chuck Schuldiner raised my game enormously. He demanded perfection and I had to deliver every single night.",
          source: 'Drummer World Interview, 1996',
        },

        videos: [],
      },

      {
        id: 'hoglan-2000-syl-prime',
        era: 'SYL Prime Era',
        years: '2000-2007',
        startYear: 2000,
        endYear: 2007,
        description: 'Strapping Young Lad at its most intense — the "City" through "The New Black" era featuring Gene\'s most massive kit configurations and career-peak technical output.',
        albums: ['SYL (2003)', 'Alien (2005)', 'The New Black (2006)'],
        tours: ['SYL World Tours', 'Download Festival', 'Ozzfest'],
        image: null,

        gear: {
          drums: {
            item: 'Pearl Masters Premium',
            details: 'Maple shells: 22" kick (×2), 8"/10"/12"/13"/14"/16"/18" toms',
            notes: 'Enormous configuration matching SYL\'s industrial scale',
            change: CHANGE_TYPES.UPGRADE,
          },
          snare: {
            item: 'Pearl Sensitone Steel 14"x6.5"',
            details: 'Sensitive, powerful attack',
            notes: 'Maximum attack for SYL\'s dense production sound',
            change: CHANGE_TYPES.SWITCH,
          },
          cymbals: {
            item: 'Sabian HHX Series',
            details: '14" HHX Evolution hi-hats, 18"/19" crashes, 22" ride, 19" China',
            notes: 'HHX for bright, cutting projection in dense mixes',
            change: CHANGE_TYPES.UPGRADE,
          },
          hardware: {
            item: 'Pearl Eliminator double pedal',
            details: 'Pro-level double bass hardware',
            notes: 'Pearl Eliminator becomes the signature pedal',
            change: CHANGE_TYPES.SWITCH,
          },
          sticks: {
            item: 'Los Cabos Gene Hoglan Signature',
            details: 'Custom hickory, precise taper',
            notes: 'First signature drumstick model — Los Cabos Canadian brand',
            change: CHANGE_TYPES.SIGNATURE,
          },
          heads: {
            item: 'Evans G2 / EMAD',
            details: 'G2 on toms, EMAD on kicks',
            notes: 'Evans for controlled, focused studio and live sound',
            change: CHANGE_TYPES.SWITCH,
          },
        },

        estimatedCost: {
          original: 18000,
          inflationAdjusted: 28000,
          currency: 'USD',
        },

        keyChanges: [
          'Largest kit configuration of career',
          'Los Cabos Gene Hoglan Signature sticks launched',
          'Pearl Eliminator pedal adopted',
          'Evans heads partnership begins',
          'Sabian HHX series adopted',
        ],

        quote: {
          text: "SYL was the most intense band I ever played in. Devin pushed me beyond what I thought I was capable of doing.",
          source: 'Terrorizer Magazine Interview, 2006',
        },

        videos: [],
      },

      {
        id: 'hoglan-2008-testament-devin',
        era: 'Testament & Multi-Band Era',
        years: '2008-Present',
        startYear: 2008,
        endYear: 2026,
        description: 'Post-SYL renaissance — Gene simultaneously driving Testament, Dethklok, and Devin Townsend Project on a fully evolved Pearl Reference setup, cementing his legacy as extreme metal\'s most in-demand drummer.',
        albums: ['The Formation of Damnation (2008)', 'Dark Roots of Earth (2012)', 'Brotherhood of the Snake (2016)', 'Epicloud (2012)'],
        tours: ['Testament World Tours', 'Dethklok/Metalocalypse Tour', 'Devin Townsend Project Tours'],
        image: null,

        gear: {
          drums: {
            item: 'Pearl Reference Pure',
            details: 'All-maple: 22" kick (×2), 8"/10"/12"/14"/16" toms',
            notes: 'Pearl\'s flagship Reference Pure — warmth and power combined',
            change: CHANGE_TYPES.UPGRADE,
          },
          snare: {
            item: 'Pearl Free-Floating Steel 14"x6.5"',
            details: 'Free-floating for maximum sensitivity',
            notes: 'Flexibility for different recording and live contexts',
            change: CHANGE_TYPES.UPGRADE,
          },
          cymbals: {
            item: 'Sabian AAX Series',
            details: '14" AAX Studio hi-hats, 18"/19" crashes, 22" ride, 20" China',
            notes: 'AAX for brilliant, refined sound across multiple bands',
            change: CHANGE_TYPES.SWITCH,
          },
          hardware: {
            item: 'Pearl Eliminator Redline double pedal',
            details: 'Latest Pearl pedal technology',
            notes: 'Continued Pearl Eliminator loyalty — refined Redline version',
            change: CHANGE_TYPES.UPGRADE,
          },
          sticks: {
            item: 'Los Cabos Gene Hoglan Signature (Refined)',
            details: 'Updated taper and weight over years of collaboration',
            notes: 'Ongoing Los Cabos collaboration spanning 15+ years',
            change: null,
          },
          heads: {
            item: 'Evans UV2 / EMAD2',
            details: 'UV2 on toms, EMAD2 on kicks',
            notes: 'UV coating for consistent response and durability across global touring',
            change: CHANGE_TYPES.UPGRADE,
          },
        },

        estimatedCost: {
          original: 22000,
          inflationAdjusted: 22000,
          currency: 'USD',
        },

        keyChanges: [
          'Joined Testament (2010) — career milestone',
          'Dethklok/Metalocalypse drum recordings (2006-2013)',
          'Pearl Reference Pure endorsement upgrade',
          'Sabian AAX series adoption',
          'Los Cabos signature sticks refined through multiple iterations',
        ],

        quote: {
          text: "Playing with Testament felt like coming home to thrash. Pearl Reference Pure is the best drum kit I've ever played.",
          source: 'Rhythm Magazine Interview, 2012',
        },

        videos: [],
      },
    ],

    metaTitle: 'Gene Hoglan Gear Evolution Timeline | The Atomic Clock\'s Kit History',
    metaDescription: 'Explore Gene Hoglan\'s drum kit evolution from Dark Angel through Death, SYL, Dethklok, and Testament. 40+ years of The Atomic Clock\'s gear arc documented era by era.',
  },

  // ==========================================
  // Igor Cavalera - Sepultura / Cavalera Conspiracy (40+ year career)
  // Issue #2671: Gear Evolution Batch 2
  // ==========================================
  'igor-cavalera': {
    slug: 'igor-cavalera',
    name: 'Igor Cavalera',
    band: 'Sepultura / Cavalera Conspiracy',
    totalYearsActive: '1984-Present',
    profileImage: '/images/drummers/igor-cavalera.webp',
    summary: 'The rhythmic engine behind Sepultura\'s global rise from Brazilian underground to international superstardom, Igor Cavalera\'s gear evolution tracks his journey from no-name local kits to full Pearl/Zildjian endorsements as one of extreme metal\'s most distinctive and primal drummers.',

    eras: [
      {
        id: 'cavalera-1984-brazil',
        era: 'Brazil Underground Era',
        years: '1984-1988',
        startYear: 1984,
        endYear: 1988,
        description: 'Teenage Igor and teenage Max building Sepultura from nothing in Belo Horizonte — playing whatever gear they could find before the world knew who they were.',
        albums: ['Bestial Devastation EP (1985)', 'Morbid Visions (1986)', 'Schizophrenia (1987)'],
        tours: ['Brazilian underground circuit'],
        image: null,

        gear: {
          drums: {
            item: 'Local Brazilian kit (brand varies)',
            details: 'Basic 4-piece: 22" kick, 12"/14" toms, floor tom',
            notes: 'Access to quality international gear was extremely limited in 1980s Brazil',
            change: null,
          },
          snare: {
            item: 'Steel snare, locally sourced',
            details: '14" steel snare',
            notes: 'Pre-endorsement era — buying what they could afford',
            change: null,
          },
          cymbals: {
            item: 'Mixed unbranded cymbals',
            details: 'Basic hi-hats, crash, ride',
            notes: 'Limited options in the Brazilian market at the time',
            change: null,
          },
          hardware: {
            item: 'Budget hardware',
            details: 'Single bass pedal, basic stands',
            notes: 'The foundation of a sound built on raw aggression, not equipment quality',
            change: null,
          },
          sticks: {
            item: 'Basic drumsticks',
            details: 'Whatever was locally available',
            notes: 'Technique over tools entirely in this era',
            change: null,
          },
          heads: {
            item: 'Remo or local equivalent',
            details: 'Basic drum heads replaced as needed',
            notes: 'Playing so hard heads wore out frequently',
            change: null,
          },
        },

        estimatedCost: {
          original: 800,
          inflationAdjusted: 2200,
          currency: 'USD',
        },

        keyChanges: [
          'Formed Sepultura with brother Max (1984) at age 13',
          'Recorded Bestial Devastation EP (1985)',
          'Schizophrenia (1987) attracted international attention',
          'Raw tribal aggression defined the sound from day one',
        ],

        quote: {
          text: "We didn't have money for good gear in Brazil. We had to be creative — and that creativity became our sound.",
          source: 'Drum! Magazine Interview, 1993',
        },

        videos: [],
      },

      {
        id: 'cavalera-1989-beneath-arise',
        era: 'Beneath the Remains / Arise Era',
        years: '1989-1992',
        startYear: 1989,
        endYear: 1992,
        description: 'Sepultura signs with Roadrunner Records and breaks internationally. Igor secures his first major endorsements as "Beneath the Remains" and "Arise" catapult the band to global thrash metal prominence.',
        albums: ['Beneath the Remains (1989)', 'Arise (1991)'],
        tours: ['Beneath the Remains World Tour', 'Arise World Tour', 'Clash of the Titans 1991'],
        image: null,

        gear: {
          drums: {
            item: 'Tama Superstar',
            details: 'Birch shells: 22" kick, 10"/12"/14"/16" toms',
            notes: 'First major endorsement — Tama for the international breakthrough era',
            change: CHANGE_TYPES.SWITCH,
          },
          snare: {
            item: 'Tama Steel 14"x6"',
            details: 'Cutting steel snare for thrash dynamics',
            notes: 'Sharp crack needed for the speed and aggression of this era',
            change: CHANGE_TYPES.SWITCH,
          },
          cymbals: {
            item: 'Zildjian A Series',
            details: '14" hi-hats, 17"/18" crashes, 20" ride',
            notes: 'Zildjian endorsement begins — a partnership spanning his entire career',
            change: CHANGE_TYPES.SWITCH,
          },
          hardware: {
            item: 'Tama hardware with DW double pedal',
            details: 'Professional double bass setup',
            notes: 'Double bass firmly established in his playing style',
            change: CHANGE_TYPES.UPGRADE,
          },
          sticks: {
            item: 'Vic Firth 5B',
            details: 'Standard hickory',
            notes: 'Vic Firth for consistency in heavy touring',
            change: CHANGE_TYPES.SWITCH,
          },
          heads: {
            item: 'Remo Emperor',
            details: 'Double-ply for durability under heavy playing',
            notes: 'Emperor heads for the punishment of thrash metal touring',
            change: CHANGE_TYPES.UPGRADE,
          },
        },

        estimatedCost: {
          original: 6000,
          inflationAdjusted: 13500,
          currency: 'USD',
        },

        keyChanges: [
          'Tama endorsement begins — major gear upgrade',
          'Zildjian cymbal endorsement starts',
          'International touring begins',
          'Beneath the Remains (1989) — global breakthrough album',
          'Arise (1991) — peak thrash metal prominence',
        ],

        quote: {
          text: "Getting the Tama deal was incredible. For the first time I had a real professional kit under me. It changed everything.",
          source: 'Rhythm Magazine Interview, 1991',
        },

        videos: [],
      },

      {
        id: 'cavalera-1993-chaos-roots',
        era: 'Chaos A.D. / Roots Era',
        years: '1993-1996',
        startYear: 1993,
        endYear: 1996,
        description: 'Sepultura\'s commercial and artistic peak. Igor shifts to Pearl and evolves his setup to incorporate tribal and world music elements, as "Chaos A.D." and "Roots" redefine what extreme metal can sound like.',
        albums: ['Chaos A.D. (1993)', 'Roots (1996)'],
        tours: ['Chaos A.D. World Tour', 'Roots World Tour', 'Lollapalooza 1996'],
        image: null,

        gear: {
          drums: {
            item: 'Pearl Masters Custom',
            details: 'Maple shells: 22" kick, 8"/10"/12"/13"/14"/16" toms',
            notes: 'Pearl endorsement — maple shells for warmer, fuller tone of the new era',
            change: CHANGE_TYPES.SWITCH,
          },
          snare: {
            item: 'Pearl Free-Floating Steel 14"x6.5"',
            details: 'Free-floating system for sensitivity',
            notes: 'Versatile snare handling everything from thrash to tribal rhythms',
            change: CHANGE_TYPES.SWITCH,
          },
          cymbals: {
            item: 'Zildjian K Custom',
            details: '14" hi-hats, 18"/19" crashes, 22" ride, 20" China',
            notes: 'Darker K Custom for the world/tribal music influences of the Roots era',
            change: CHANGE_TYPES.UPGRADE,
          },
          hardware: {
            item: 'Pearl hardware with DW 5000 Turbo double pedal',
            details: 'Full professional hardware package',
            notes: 'DW 5000 Turbo for the fastest double bass work',
            change: CHANGE_TYPES.UPGRADE,
          },
          sticks: {
            item: 'Vic Firth 5A/5B',
            details: 'Varied models per application',
            notes: 'Vic Firth for both aggressive thrash and tribal sessions',
            change: null,
          },
          heads: {
            item: 'Remo Pinstripe / POWERSTROKE',
            details: 'Pinstripe on toms, POWERSTROKE on kicks',
            notes: 'Controlled, focused sound for the global sonic palette of Roots',
            change: CHANGE_TYPES.SWITCH,
          },
        },

        estimatedCost: {
          original: 12000,
          inflationAdjusted: 24000,
          currency: 'USD',
        },

        keyChanges: [
          'Pearl Masters endorsement — switch from Tama',
          'Zildjian K Custom adopted for tribal/world music era',
          'Remo heads switch for controlled, warm tone',
          'Chaos A.D. (1993) — platinum-selling breakthrough',
          'Roots (1996) — recorded with the Xavante indigenous tribe of Brazil',
        ],

        quote: {
          text: "Roots changed everything about how I thought about rhythm. Playing with indigenous tribes made me hear drumming in a completely different way.",
          source: 'Modern Drummer Interview, 1996',
        },

        videos: [],
      },

      {
        id: 'cavalera-2007-cavalera-conspiracy',
        era: 'Cavalera Conspiracy & Modern Era',
        years: '2007-Present',
        startYear: 2007,
        endYear: 2026,
        description: 'After leaving Sepultura in 2006, Igor reunites with brother Max to form Cavalera Conspiracy — channeling the raw aggression of early Sepultura through a polished modern setup. One of the most celebrated rhythm sections in extreme metal continues.',
        albums: ['Inflikted (2008)', 'Blunt Force Trauma (2011)', 'Pandemonium (2014)', 'Bestial Devastation (2023)'],
        tours: ['Cavalera Conspiracy World Tours', 'Return to Roots Anniversary Tour'],
        image: null,

        gear: {
          drums: {
            item: 'Pearl Reference',
            details: 'Multi-ply hybrid shells: 22" kick, 8"/10"/12"/14"/16" toms',
            notes: 'Pearl Reference flagship — combining maple warmth with birch attack',
            change: CHANGE_TYPES.UPGRADE,
          },
          snare: {
            item: 'Pearl Sensitone Premium 14"x6.5"',
            details: 'Steel, maximum sensitivity and dynamic range',
            notes: 'Maximum projection for modern live touring demands',
            change: CHANGE_TYPES.UPGRADE,
          },
          cymbals: {
            item: 'Zildjian A Custom / K Series mix',
            details: '14" hi-hats, 18"/19" crashes, 22" ride, 20" China',
            notes: 'Mix of A Custom brightness and K warmth for versatility',
            change: CHANGE_TYPES.UPGRADE,
          },
          hardware: {
            item: 'Pearl Eliminator double pedal',
            details: 'Adjustable cam system for customized feel',
            notes: 'Pearl Eliminator for refined speed and control',
            change: CHANGE_TYPES.SWITCH,
          },
          sticks: {
            item: 'Vic Firth 5A/5B hickory',
            details: 'Continued Vic Firth endorsement',
            notes: 'Maintained Vic Firth loyalty throughout the modern era',
            change: null,
          },
          heads: {
            item: 'Evans G2 / EMAD',
            details: 'G2 on toms, EMAD on bass drums',
            notes: 'Evans for the focused, punchy sound of modern extreme metal',
            change: CHANGE_TYPES.SWITCH,
          },
        },

        estimatedCost: {
          original: 20000,
          inflationAdjusted: 20000,
          currency: 'USD',
        },

        keyChanges: [
          'Left Sepultura (2006) — end of a 22-year era',
          'Formed Cavalera Conspiracy with Max Cavalera (2007)',
          'Pearl Reference endorsement upgrade',
          'Evans heads for modern controlled sound',
          'Return to Roots Anniversary Tour — revisiting the landmark album live',
        ],

        quote: {
          text: "Playing with Max again is like going back to the source. Cavalera Conspiracy is what Sepultura was always meant to be.",
          source: 'Metal Hammer Interview, 2008',
        },

        videos: [],
      },
    ],

    metaTitle: 'Igor Cavalera Gear Evolution Timeline | Sepultura\'s Rhythmic Engine',
    metaDescription: 'Trace Igor Cavalera\'s drum kit evolution from Brazilian underground setups through Sepultura\'s global rise to Cavalera Conspiracy. From no-name kits to Pearl Reference.',
  },

  // ==========================================
  // Danny Carey - Tool (1990–Present)
  // ==========================================
  'danny-carey': {
    slug: 'danny-carey',
    name: 'Danny Carey',
    band: 'Tool',
    totalYearsActive: '1990-Present',
    profileImage: '/images/drummers/danny-carey.webp',
    summary: 'From Tool\'s raw 1990s debut to the massively complex polyrhythmic rig of Fear Inoculum, Danny Carey\'s gear evolution mirrors the band\'s artistic ascent — each album era bringing a larger, more elaborate kit built around DW Collector\'s Series shells, Paiste cymbals, and an ever-growing array of electronics.',

    eras: [
      {
        id: 'carey-1993-undertow',
        era: 'Undertow Era',
        years: '1990–1993',
        startYear: 1990,
        endYear: 1993,
        description: 'Tool\'s debut album era. Carey established the foundation of his distinctive setup — DW maple shells, Paiste cymbals, and Tama pedals — with a relatively straightforward configuration that punched far above its weight.',
        albums: ['Opiate EP (1992)', 'Undertow (1993)'],
        tours: ['Undertow Tour'],
        image: null,

        gear: {
          drums: {
            item: 'DW Collector\'s Series Maple',
            details: 'Maple shells: 22" kick, 10"/12"/14"/16" toms',
            notes: 'Early DW endorsement. The Collector\'s Series maple tone perfectly suited Tool\'s dense, low-mid-heavy sound.',
            change: null,
          },
          snare: {
            item: 'DW Edge 14"×6.5" Steel',
            details: 'Steel shell with die-cast hoops',
            notes: 'Cutting, focused snare that cut through Tool\'s guitar-bass wall.',
            change: null,
          },
          cymbals: {
            item: 'Paiste 2002 Series',
            details: '14" hi-hats, 16"/18" crashes, 20" ride, 18" China',
            notes: 'Paiste from the outset — the 2002 brightness matched Tool\'s grinding, dissonant tones.',
            change: null,
          },
          hardware: {
            item: 'Tama Iron Cobra HP900 Double Pedal',
            details: 'Power Glide cam double bass pedal',
            notes: 'The Iron Cobra became his signature pedal throughout his career.',
            change: null,
          },
          sticks: {
            item: 'Vic Firth 5B',
            details: 'Standard hickory',
            notes: 'Off-the-shelf sticks before signature deal.',
            change: null,
          },
          heads: {
            item: 'Remo Ambassador',
            details: 'Clear on toms, coated on snare',
            notes: 'Standard head configuration for the early era.',
            change: null,
          },
        },

        estimatedCost: {
          original: 7000,
          inflationAdjusted: 14500,
          currency: 'USD',
        },

        keyChanges: [
          'DW Collector\'s Series endorsement established',
          'Paiste cymbal relationship begins',
          'Tama Iron Cobra becomes primary pedal',
          'Tool\'s debut full-length defines the sonic foundation',
        ],

        quote: {
          text: "The DW kit gave me the foundation I needed. The sound of those maple shells was immediately right for what Tool was doing.",
          source: 'Modern Drummer Interview, 1994',
        },

        videos: [],
      },

      {
        id: 'carey-1996-aenima',
        era: 'Ænima Era',
        years: '1994–1998',
        startYear: 1994,
        endYear: 1998,
        description: 'Tool\'s commercial and artistic breakthrough. The Ænima setup saw Carey expand his kit substantially — more toms, more cymbals, and the first integration of electronic pads that would define his career.',
        albums: ['Ænima (1996)'],
        tours: ['Ænima World Tour'],
        image: null,

        gear: {
          drums: {
            item: 'DW Collector\'s Series Maple (expanded)',
            details: 'Maple shells: 22"/24" kicks, 8"/10"/12"/14"/16"/18" toms',
            notes: 'Expanded to 6 toms plus dual kicks for the complex polyrhythmic arrangements of Ænima.',
            change: CHANGE_TYPES.UPGRADE,
          },
          snare: {
            item: 'DW Edge 14"×6.5" Steel',
            details: 'Steel shell, continued',
            notes: 'Same cutting steel snare sound — the Ænima snare is one of Carey\'s most distinctive.',
            change: null,
          },
          cymbals: {
            item: 'Paiste Signature Series',
            details: '14" Signature hi-hats, 16"/18"/20" crashes, 22" ride, 18"/20" Chinas, 10"/12" splashes',
            notes: 'Expanded to Paiste Signature line and added splash cymbals for textural range in Tool\'s dynamic arrangements.',
            change: CHANGE_TYPES.UPGRADE,
          },
          hardware: {
            item: 'Tama Iron Cobra HP900 Double Pedal',
            details: 'Dual Iron Cobra configuration for twin kicks',
            notes: 'Full twin-kick setup for maximum bass drum complexity.',
            change: CHANGE_TYPES.UPGRADE,
          },
          sticks: {
            item: 'Vic Firth Danny Carey Signature',
            details: 'Hickory, long taper with nylon tip',
            notes: 'First Vic Firth Danny Carey signature stick — a long taper model suited to his fulcrum technique.',
            change: CHANGE_TYPES.SIGNATURE,
          },
          heads: {
            item: 'Evans EC2 / EMAD',
            details: 'EC2 on toms, EMAD on kick',
            notes: 'Switched to Evans for better controlled sound in studio and live applications.',
            change: CHANGE_TYPES.SWITCH,
          },
          electronics: {
            item: 'Roland Octapad SPD-8',
            details: 'Electronic pad for samples and triggers',
            notes: 'First major electronics integration — octapad adds textural and rhythmic layers central to Tool\'s live experience.',
            change: CHANGE_TYPES.NEW,
          },
        },

        estimatedCost: {
          original: 14000,
          inflationAdjusted: 27000,
          currency: 'USD',
        },

        keyChanges: [
          'Kit expanded to 6 toms and dual kicks',
          'Vic Firth Danny Carey signature sticks launched',
          'Roland Octapad introduced — first electronics integration',
          'Paiste Signature cymbal upgrade',
          'Evans heads adopted for studio/live consistency',
        ],

        quote: {
          text: "Ænima pushed the kit to a completely different place. The polyrhythmic concepts demanded more surface area, more control.",
          source: 'Drum! Magazine, 1996',
        },

        videos: [],
      },

      {
        id: 'carey-2001-lateralus',
        era: 'Lateralus Era',
        years: '1999–2005',
        startYear: 1999,
        endYear: 2005,
        description: 'Tool\'s progressive masterpiece era. Lateralus and its Fibonacci-sequence time signatures demanded the most elaborate kit Carey had ever played. The setup grew into one of the most complex in rock — seven toms, twin kicks, and expanded electronics.',
        albums: ['Lateralus (2001)'],
        tours: ['Lateralus World Tour'],
        image: null,

        gear: {
          drums: {
            item: 'DW Collector\'s Series Maple (custom lacquer)',
            details: 'Custom finish maple: 22"/24" kicks, 8"/10"/12"/13"/14"/16"/18" toms',
            notes: 'Custom lacquer DW kit with 7 toms — one of the most ambitious tom configurations in mainstream rock.',
            change: CHANGE_TYPES.UPGRADE,
          },
          snare: {
            item: 'DW Collector\'s Series 14"×6.5" Maple',
            details: 'Maple shell with wood hoop option',
            notes: 'Switched to maple snare for warmer, more resonant tone suited to Lateralus\'s complex arrangements.',
            change: CHANGE_TYPES.SWITCH,
          },
          cymbals: {
            item: 'Paiste Signature / 602 Series',
            details: '14" hi-hats, 16"/18"/20" crashes, 22" ride, 18"/20" Chinas, 10" splash, custom cymbals',
            notes: 'Added Paiste 602 series alongside Signature for a darker, more complex tonal palette across the Lateralus arrangements.',
            change: CHANGE_TYPES.UPGRADE,
          },
          hardware: {
            item: 'Tama Iron Cobra HP900 / Speed Cobra',
            details: 'Twin-kick Tama configuration',
            notes: 'Speed Cobra variant explored for lighter-touch passages within Lateralus\'s dynamic range.',
            change: null,
          },
          sticks: {
            item: 'Vic Firth Danny Carey Signature',
            details: 'Refined long-taper hickory',
            notes: 'Continued signature partnership with Vic Firth.',
            change: null,
          },
          heads: {
            item: 'Evans G2 / EMAD',
            details: 'G2 on toms, EMAD on kicks',
            notes: 'G2 double-ply on toms for heavier, more controlled response.',
            change: CHANGE_TYPES.UPGRADE,
          },
          electronics: {
            item: 'Roland SPD-S + Octapad',
            details: 'Multiple pads for samples and looping',
            notes: 'Expanded electronics for Lateralus\'s multi-layered arrangements. Tool\'s live shows during this era were legendary for their sonic depth.',
            change: CHANGE_TYPES.UPGRADE,
          },
        },

        estimatedCost: {
          original: 20000,
          inflationAdjusted: 34000,
          currency: 'USD',
        },

        keyChanges: [
          'Largest DW tom configuration to date (7 toms)',
          'Paiste 602 added alongside Signature series',
          'Expanded Roland electronics for live performances',
          'Lateralus — Tool\'s most critically acclaimed album',
        ],

        quote: {
          text: "Lateralus is built on Fibonacci patterns. The kit had to navigate those shifting meters naturally. It\'s about feel, not just mathematics.",
          source: 'Modern Drummer, 2001',
        },

        videos: [],
      },

      {
        id: 'carey-2019-fear-inoculum',
        era: 'Fear Inoculum Era',
        years: '2019–Present',
        startYear: 2019,
        endYear: 2026,
        description: 'After a 13-year studio absence, Tool returned with their most ambitious album — and Carey\'s most elaborate kit in history. The Fear Inoculum rig is a masterclass in custom drum architecture: a massive DW custom kit, multiple Roland electronics, gongs, and a custom MIDI trigger array.',
        albums: ['10,000 Days (2006)', 'Fear Inoculum (2019)'],
        tours: ['10,000 Days Tour', 'Fear Inoculum World Tour'],
        image: null,

        gear: {
          drums: {
            item: 'DW Collector\'s Series Custom',
            details: 'Custom maple shells, custom lacquer: 22"/24" kicks, 8"/10"/12"/13"/14"/16"/18"/20" toms',
            notes: 'Fully custom DW Collector\'s Series — 8 toms, dual kicks, one of the largest touring configurations in rock. Purpose-built for polyrhythmic complexity.',
            change: CHANGE_TYPES.UPGRADE,
          },
          snare: {
            item: 'DW Collector\'s Series 14"×6.5" + Secondary Snare',
            details: 'Primary maple snare + secondary steel for cross-pattern work',
            notes: 'Dual snare configuration allows Carey to play across different snare voices in complex rhythmic passages.',
            change: CHANGE_TYPES.UPGRADE,
          },
          cymbals: {
            item: 'Paiste Signature / 602 / Custom + Gongs',
            details: '14" hi-hats, multiple crashes 14"–22", rides, Chinas, splash cymbals, Turkish cymbals, 28"/32" gongs',
            notes: 'The Fear Inoculum live rig incorporates full gong arrangements alongside traditional cymbal setups — a massively complex suspended percussion array.',
            change: CHANGE_TYPES.UPGRADE,
          },
          hardware: {
            item: 'Tama Iron Cobra 900 + Speed Cobra',
            details: 'Multiple pedal configurations; custom cage hardware',
            notes: 'Custom hardware cage designed to hold the vast percussion array in stable touring configuration.',
            change: null,
          },
          sticks: {
            item: 'Vic Firth Danny Carey Signature',
            details: 'Current production signature model',
            notes: 'Long-term Vic Firth partnership maintained throughout career.',
            change: null,
          },
          heads: {
            item: 'Evans G2 / EMAD2',
            details: 'G2 on toms, EMAD2 on kicks',
            notes: 'EMAD2 for tighter low-end kick response across complex bass drum patterns.',
            change: CHANGE_TYPES.UPGRADE,
          },
          electronics: {
            item: 'Roland SPD-SX + Multiple Octapads + Custom MIDI Trigger System',
            details: 'Multiple sampling pads, triggers on kick/snare, custom MIDI trigger array',
            notes: 'Most elaborate electronics rig of Carey\'s career — triggers, sampling pads, and a custom MIDI system allow real-time manipulation of samples and loops during live performance.',
            change: CHANGE_TYPES.UPGRADE,
          },
        },

        estimatedCost: {
          original: 45000,
          inflationAdjusted: 45000,
          currency: 'USD',
        },

        keyChanges: [
          'Expanded to 8 toms — most complex DW kit configuration',
          'Dual snare setup for cross-pattern voice options',
          'Gong integration for full suspended percussion array',
          'Custom MIDI trigger and sampling system',
          'Fear Inoculum (2019) — Tool\'s first album in 13 years',
        ],

        quote: {
          text: "Each album has pushed the kit further. Fear Inoculum needed a rig that could hold all of those layers simultaneously — orchestral percussion, electronics, and the core kit.",
          source: 'Vic Firth Artist Profile, 2019',
        },

        videos: [],
      },
    ],

    metaTitle: 'Danny Carey Gear Evolution Timeline | Tool\'s Drum Kit History',
    metaDescription: 'Explore Danny Carey\'s complete drum gear evolution from Undertow to Fear Inoculum. DW Collector\'s Series to massive custom rigs with gongs and electronics — every era documented.',
  },

  // ==========================================
  // Matt Greiner - August Burns Red (2003–Present)
  // ==========================================
  'matt-greiner': {
    slug: 'matt-greiner',
    name: 'Matt Greiner',
    band: 'August Burns Red',
    totalYearsActive: '2003-Present',
    profileImage: '/images/drummers/matt-greiner.webp',
    summary: 'Matt Greiner\'s gear evolution tracks August Burns Red\'s rise from Lancaster, Pennsylvania\'s Christian metalcore scene to world-touring headliners — moving through Orange County Drum & Percussion boutique maple shells, a Pearl Reference endorsement, and landing on his current Mapex Black Panther era.',

    eras: [
      {
        id: 'greiner-2007-messengers',
        era: 'Messengers Era',
        years: '2003–2008',
        startYear: 2003,
        endYear: 2008,
        description: 'August Burns Red\'s formative years. Greiner developed his technically demanding, melodically nuanced metalcore drumming style on Orange County Drum & Percussion kits — the boutique California brand favored by drummers seeking custom-quality maple at accessible prices.',
        albums: ['Looks Fragile After All (2004)', 'Messengers (2007)'],
        tours: ['Messengers US Tour', 'Warped Tour 2007'],
        image: null,

        gear: {
          drums: {
            item: 'Orange County Drum & Percussion (OCDP) Maple',
            details: 'Maple shells: 22" kick, 10"/12"/14"/16" toms',
            notes: 'OCDP was a boutique California drum brand offering custom-level maple quality. Greiner\'s setup was immediately distinctive for its warmth and attack.',
            change: null,
          },
          snare: {
            item: 'OCDP Steel Snare 14"×5.5"',
            details: 'Steel shell, standard configuration',
            notes: 'Cutting steel snare sound to cut through metalcore guitar density.',
            change: null,
          },
          cymbals: {
            item: 'Paiste 2002 / Alpha Series',
            details: '14" hi-hats, 16"/18" crashes, 20" ride, 18" China',
            notes: 'Paiste from the start — the 2002 brightness matched the metalcore energy.',
            change: null,
          },
          hardware: {
            item: 'Pearl P-2002C Eliminator Double Pedal',
            details: 'Cam-driven double pedal',
            notes: 'Pearl Eliminator for fast, precise double bass work in August Burns Red\'s complex arrangements.',
            change: null,
          },
          sticks: {
            item: 'Vic Firth 5B',
            details: 'Standard hickory',
            notes: 'Standard sticks before signature deal.',
            change: null,
          },
          heads: {
            item: 'Remo Ambassador',
            details: 'Clear on toms, coated on snare',
            notes: 'Standard head configuration.',
            change: null,
          },
        },

        estimatedCost: {
          original: 4500,
          inflationAdjusted: 7000,
          currency: 'USD',
        },

        keyChanges: [
          'OCDP maple kit — boutique quality at accessible price',
          'Messengers established ABR as metalcore leaders',
          'Technical melodic drumming style fully formed',
          'Warped Tour 2007 brought national exposure',
        ],

        quote: {
          text: "Growing up I didn't have money for top-shelf gear. The OCDP kit punched way above its weight. It taught me that tone starts with the player, not the price tag.",
          source: 'Drum! Magazine Interview, 2008',
        },

        videos: [],
      },

      {
        id: 'greiner-2009-constellations',
        era: 'Constellations / Leveler Era',
        years: '2009–2013',
        startYear: 2009,
        endYear: 2013,
        description: 'August Burns Red\'s commercial and critical peak. Greiner transitioned to Pearl Reference drums — a professional endorsement that matched the band\'s growing profile. Constellations and Leveler are considered two of metalcore\'s defining albums.',
        albums: ['Constellations (2009)', 'Leveler (2011)', 'Presenting Fingers EP (2012)'],
        tours: ['Constellations World Tour', 'Leveler Tour'],
        image: null,

        gear: {
          drums: {
            item: 'Pearl Reference Series',
            details: 'Maple/birch hybrid shells: 22" kick, 10"/12"/14"/16" toms',
            notes: 'First major endorsement — Pearl Reference maple/birch hybrid delivered superior projection and attack for August Burns Red\'s touring demands.',
            change: CHANGE_TYPES.SWITCH,
          },
          snare: {
            item: 'Pearl Reference 14"×6.5"',
            details: 'Maple/birch hybrid shell with die-cast hoops',
            notes: 'Full Pearl Reference snare for punchy, musical tone in the hybrid metalcore arrangements.',
            change: CHANGE_TYPES.SWITCH,
          },
          cymbals: {
            item: 'Paiste Signature Series',
            details: '14" Signature hi-hats, 16"/17"/18" crashes, 22" ride, 18" China',
            notes: 'Upgraded to Paiste Signature line to match the professional endorsement kit.',
            change: CHANGE_TYPES.UPGRADE,
          },
          hardware: {
            item: 'Pearl Eliminator Demon Drive',
            details: 'Direct drive double pedal',
            notes: 'Upgraded to direct drive for more precise, consistent double bass response across technically demanding ABR parts.',
            change: CHANGE_TYPES.UPGRADE,
          },
          sticks: {
            item: 'Vic Firth Matt Greiner Signature',
            details: 'Hickory, long taper, nylon tip',
            notes: 'First Vic Firth Matt Greiner signature stick — designed for the balance of speed and power needed in metalcore.',
            change: CHANGE_TYPES.SIGNATURE,
          },
          heads: {
            item: 'Evans G2 / EMAD',
            details: 'G2 on toms, EMAD on kick',
            notes: 'Switched to Evans for better controlled studio and live sound.',
            change: CHANGE_TYPES.SWITCH,
          },
        },

        estimatedCost: {
          original: 10000,
          inflationAdjusted: 14000,
          currency: 'USD',
        },

        keyChanges: [
          'Pearl Reference endorsement — first major kit deal',
          'Vic Firth Matt Greiner signature sticks launched',
          'Upgraded to Paiste Signature cymbals',
          'Constellations — considered one of metalcore\'s defining albums',
        ],

        quote: {
          text: "Getting the Pearl Reference deal was a turning point. That kit is built to last — it sounds incredible and it can handle the road. Constellations opened those doors for us.",
          source: 'Pearl Drums Artist Profile, 2010',
        },

        videos: [],
      },

      {
        id: 'greiner-2013-rescue',
        era: 'Rescue & Restore / Florian Era',
        years: '2013–2015',
        startYear: 2013,
        endYear: 2015,
        description: 'August Burns Red\'s most creatively ambitious period. Rescue & Restore and Florian pushed the band\'s compositional complexity — Florian in particular required wider dynamic range and Greiner\'s first integration of electronics.',
        albums: ['Rescue & Restore (2013)', 'Florian (2014)'],
        tours: ['Rescue & Restore Tour', 'Florian Tour'],
        image: null,

        gear: {
          drums: {
            item: 'Pearl Reference Series (refined)',
            details: 'Custom finish maple/birch: 22" kick, 10"/12"/14"/16" toms',
            notes: 'Refined Pearl Reference configuration with updated custom finish.',
            change: null,
          },
          snare: {
            item: 'Pearl Reference 14"×5.5" + 14"×6.5"',
            details: 'Two snare depths in rotation for different textures',
            notes: 'Added a shallower snare for different sonic textures across Rescue & Restore\'s wide dynamic range.',
            change: CHANGE_TYPES.UPGRADE,
          },
          cymbals: {
            item: 'Paiste Signature / Formula 602',
            details: '14" hi-hats, 17"/18"/19" crashes, 22" ride, 18"/20" Chinas, 10" splash',
            notes: 'Added Paiste Formula 602 cymbals for more complex tonal options in the ambitious Florian arrangements.',
            change: CHANGE_TYPES.UPGRADE,
          },
          hardware: {
            item: 'Pearl Demon Drive (continued)',
            details: 'Direct drive double pedal',
            notes: 'Consistent pedal preference.',
            change: null,
          },
          sticks: {
            item: 'Vic Firth Matt Greiner Signature',
            details: 'Updated signature model',
            notes: 'Continued Vic Firth partnership.',
            change: null,
          },
          heads: {
            item: 'Evans G2 / EMAD2',
            details: 'EMAD2 on kick for more focused attack',
            notes: 'EMAD2 upgrade for tighter low-end on Rescue & Restore\'s complex arrangements.',
            change: CHANGE_TYPES.UPGRADE,
          },
          electronics: {
            item: 'Roland SPD-SX Sampling Pad',
            details: 'Ambient samples and click tracks',
            notes: 'Electronics integrated for studio-quality live sound — especially important for Florian\'s ambient passages.',
            change: CHANGE_TYPES.NEW,
          },
        },

        estimatedCost: {
          original: 12000,
          inflationAdjusted: 16000,
          currency: 'USD',
        },

        keyChanges: [
          'Paiste Formula 602 cymbals added alongside Signature',
          'Roland SPD-SX introduced for ambient live sampling',
          'Evans EMAD2 upgrade on kick',
          'Florian — ABR\'s most orchestrally ambitious album',
        ],

        quote: {
          text: "Florian pushed us somewhere new. I needed cymbals and electronics that could hold wide dynamic swings — from full metal to near-orchestral passages.",
          source: 'Modern Drummer Interview, 2014',
        },

        videos: [],
      },

      {
        id: 'greiner-2016-mapex',
        era: 'Mapex Era',
        years: '2016–Present',
        startYear: 2016,
        endYear: 2026,
        description: 'Greiner\'s current era — a switch to Mapex Black Panther drums that brought a new tonal palette to August Burns Red\'s sound. The Mapex Black Panther Design Lab has become his most praised kit, lauded for its warm low-end and crisp attack across metalcore\'s wide dynamic range.',
        albums: ['Ember (2016)', 'Tides (2019)', 'Death Below (2023)'],
        tours: ['Ember Tour', 'Tides World Tour', 'Death Below Tour'],
        image: null,

        gear: {
          drums: {
            item: 'Mapex Black Panther Design Lab',
            details: 'Maple/walnut hybrid shells: 22" kick, 10"/12"/14"/16" toms',
            notes: 'Moved to Mapex Black Panther Design Lab — the maple/walnut hybrid provides deeper warmth than the Pearl Reference. Greiner\'s most praised kit to date.',
            change: CHANGE_TYPES.SWITCH,
          },
          snare: {
            item: 'Mapex Black Panther 14"×5.5" Maple',
            details: 'Maple shell with die-cast hoops',
            notes: 'The Black Panther snare is known for its warm crack — suited to both the heavy and melodic sides of ABR.',
            change: CHANGE_TYPES.SWITCH,
          },
          cymbals: {
            item: 'Paiste Formula 602 / Signature',
            details: '14" 602 hi-hats, 16"/17"/18" crashes, 22" ride, 18" China, 10" splash',
            notes: 'Formula 602 became primary cymbal choice for its dark, complex tone that complements the Mapex warmth.',
            change: CHANGE_TYPES.SWITCH,
          },
          hardware: {
            item: 'DW 9000 Double Pedal',
            details: 'Twin-chain drive double pedal',
            notes: 'Switched to DW 9000 to match the warmer, more premium gear direction.',
            change: CHANGE_TYPES.SWITCH,
          },
          sticks: {
            item: 'Vic Firth Matt Greiner Signature',
            details: 'Current production model, updated taper',
            notes: 'Continued Vic Firth partnership — signature model refined over multiple iterations.',
            change: null,
          },
          heads: {
            item: 'Evans G2 / EMAD2',
            details: 'G2 on toms, EMAD2 on kick',
            notes: 'Long-term Evans configuration maintained across brand switch.',
            change: null,
          },
          electronics: {
            item: 'Roland SPD-SX (continued)',
            details: 'Sampling pad for ambient layers',
            notes: 'Electronic integration refined for consistent ABR live experience.',
            change: null,
          },
        },

        estimatedCost: {
          original: 14000,
          inflationAdjusted: 14000,
          currency: 'USD',
        },

        keyChanges: [
          'Brand switch to Mapex Black Panther Design Lab',
          'DW 9000 double pedal adopted',
          'Paiste Formula 602 becomes primary cymbal choice',
          'Ember Tour — ABR\'s largest headlining push to that point',
        ],

        quote: {
          text: "The Black Panther changed my sound in the best way. That maple/walnut combination gives me everything — warmth, attack, and a low-end that sits perfectly in the mix.",
          source: 'Mapex Drums Artist Profile, 2016',
        },

        videos: [],
      },
    ],

    metaTitle: 'Matt Greiner Gear Evolution Timeline | August Burns Red Drum Kit History',
    metaDescription: 'Explore Matt Greiner\'s complete drum gear evolution from OCDP to Pearl Reference to Mapex Black Panther. Every era of August Burns Red\'s kit documented.',
  },

  // ==========================================
  // Shannon Larkin - Godsmack (2002–Present)
  // ==========================================
  'shannon-larkin': {
    slug: 'shannon-larkin',
    name: 'Shannon Larkin',
    band: 'Godsmack',
    totalYearsActive: '1985-Present',
    profileImage: '/images/drummers/shannon-larkin.webp',
    summary: 'Shannon Larkin\'s gear evolution spans three decades and several bands — from Wrathchild America\'s thrash/glam hybrid through Souls at Zero and Amen to his long tenure in Godsmack, where his Tama Starclassic setup and Sabian cymbal partnership became one of rock radio\'s most recognizable drum sounds.',

    eras: [
      {
        id: 'larkin-1988-wrathchild',
        era: 'Wrathchild America / Souls at Zero Era',
        years: '1985–2001',
        startYear: 1985,
        endYear: 2001,
        description: 'Shannon Larkin\'s long pre-Godsmack career. From Maryland\'s Wrathchild America through alternative metal acts Souls at Zero and Amen, Larkin developed a heavy, groove-oriented style on Tama kits before finding his long-term home.',
        albums: ['Climbin\' the Walls (1991)', 'Souls at Zero (1993)', 'Amen (1999)'],
        tours: ['Wrathchild America Tour', 'Souls at Zero Tour'],
        image: null,

        gear: {
          drums: {
            item: 'Tama Rockstar / Swingstar Series',
            details: 'Basic kit: 22" kick, 12"/13"/16" toms',
            notes: 'Mid-range Tama kits throughout the Wrathchild and Souls at Zero years — accessible, reliable, and loud.',
            change: null,
          },
          snare: {
            item: 'Pearl Steel Snare 14"×5.5"',
            details: 'Steel shell, standard configuration',
            notes: 'Cutting steel snare that worked across the loud, aggressive styles of his early bands.',
            change: null,
          },
          cymbals: {
            item: 'Sabian AA Series',
            details: '14" hi-hats, 16"/18" crashes, 20" ride, 18" China',
            notes: 'Sabian from the early career — the AA series was a natural fit for heavy rock and thrash.',
            change: null,
          },
          hardware: {
            item: 'Tama hardware with double pedal',
            details: 'Tama stands, budget double pedal',
            notes: 'Standard Tama hardware configuration for early career touring.',
            change: null,
          },
          sticks: {
            item: 'Vater 5B',
            details: 'Standard hickory',
            notes: 'Vater relationship began early in career.',
            change: null,
          },
          heads: {
            item: 'Remo Ambassador',
            details: 'Clear on toms, coated on snare',
            notes: 'Standard configuration throughout the early bands.',
            change: null,
          },
        },

        estimatedCost: {
          original: 3000,
          inflationAdjusted: 6500,
          currency: 'USD',
        },

        keyChanges: [
          'Established foundational groove-heavy drumming style',
          'Sabian cymbal relationship begins',
          'Vater stick partnership established',
          'Developed versatility across thrash, alternative, and hard rock styles',
        ],

        quote: {
          text: "Before Godsmack I played in five or six bands across fifteen years. You learn to adapt fast — different rooms, different styles, different gear. It made me a much better drummer.",
          source: 'Modern Drummer Interview, 2004',
        },

        videos: [],
      },

      {
        id: 'larkin-2003-faceless',
        era: 'Faceless Era',
        years: '2002–2007',
        startYear: 2002,
        endYear: 2007,
        description: 'Larkin\'s debut with Godsmack. Faceless and the subsequent IV era established Shannon as the backbone of one of rock radio\'s most powerful bands. The Tama Starclassic Performer MX became his signature sound — punchy, focused, and built for arenas.',
        albums: ['Faceless (2003)', 'IV (2006)'],
        tours: ['Faceless Tour', 'Ozzfest 2003', 'IV World Tour'],
        image: null,

        gear: {
          drums: {
            item: 'Tama Starclassic Performer MX',
            details: 'Maple/birch hybrid shells: 22" kick, 10"/12"/14"/16" toms',
            notes: 'First major Tama endorsement with the Starclassic Performer MX — the maple/birch hybrid gave Larkin the punch and warmth needed for Godsmack\'s arena-filling rock sound.',
            change: CHANGE_TYPES.SWITCH,
          },
          snare: {
            item: 'Tama Starclassic Performer MX 14"×6.5"',
            details: 'Maple/birch hybrid shell',
            notes: 'The Performer MX snare produced the punchy, cutting sound heard on Faceless and IV — one of rock radio\'s most recognizable snare tones of the era.',
            change: CHANGE_TYPES.SWITCH,
          },
          cymbals: {
            item: 'Sabian HHX Series',
            details: '14" HHX hi-hats, 16"/18" crashes, 21" ride, 18" China',
            notes: 'Upgraded to Sabian HHX for more complex, musical cymbal tones suited to Godsmack\'s rock/metal hybrid sound.',
            change: CHANGE_TYPES.UPGRADE,
          },
          hardware: {
            item: 'Tama Iron Cobra HP900 Double Pedal',
            details: 'Power Glide cam double pedal',
            notes: 'Switched to Tama Iron Cobra to match the Tama kit endorsement.',
            change: CHANGE_TYPES.SWITCH,
          },
          sticks: {
            item: 'Vater Shannon Larkin Signature',
            details: 'Hickory, custom taper',
            notes: 'First Vater Shannon Larkin signature stick — a medium-weight hickory model for power and articulation.',
            change: CHANGE_TYPES.SIGNATURE,
          },
          heads: {
            item: 'Evans G2 / EMAD',
            details: 'G2 on toms, EMAD on kick',
            notes: 'Moved to Evans heads for better studio and live consistency.',
            change: CHANGE_TYPES.SWITCH,
          },
        },

        estimatedCost: {
          original: 9000,
          inflationAdjusted: 15000,
          currency: 'USD',
        },

        keyChanges: [
          'Joined Godsmack (2002) — career-defining move',
          'Tama Starclassic Performer MX endorsement begins',
          'Vater Shannon Larkin signature sticks launched',
          'Ozzfest 2003 — massive national exposure',
        ],

        quote: {
          text: "Joining Godsmack was the moment everything clicked. The Tama Starclassic gave me the sound I\'d been chasing — that punchy maple/birch combination is perfect for this music.",
          source: 'Tama Drums Artist Profile, 2004',
        },

        videos: [],
      },

      {
        id: 'larkin-2010-oracle',
        era: 'The Oracle / 1000hp Era',
        years: '2009–2015',
        startYear: 2009,
        endYear: 2015,
        description: 'Godsmack\'s commercial peak and a creative evolution. The Oracle and 1000hp cemented the band\'s arena headliner status, and Larkin\'s kit transitioned to Tama Starclassic Maple — a warmer, more resonant shell that suited the band\'s evolving sound.',
        albums: ['The Oracle (2010)', '1000hp (2014)'],
        tours: ['The Oracle World Tour', '1000hp Tour'],
        image: null,

        gear: {
          drums: {
            item: 'Tama Starclassic Maple',
            details: 'Pure maple shells: 22" kick, 10"/12"/14"/16" toms, custom finish',
            notes: 'Upgraded from Performer MX to pure Starclassic Maple — warmer, more resonant tone for The Oracle\'s more melodic direction.',
            change: CHANGE_TYPES.UPGRADE,
          },
          snare: {
            item: 'Tama Starclassic Maple 14"×6.5"',
            details: 'Pure maple shell',
            notes: 'Warmer maple snare to match the evolved kit — a deeper, more musical crack.',
            change: CHANGE_TYPES.UPGRADE,
          },
          cymbals: {
            item: 'Sabian HHX / AAX Series Mix',
            details: '14" HHX hi-hats, 16"/18" AAX crashes, 21" ride, 18" China',
            notes: 'Mix of HHX and AAX series for wider tonal options across The Oracle and 1000hp.',
            change: CHANGE_TYPES.UPGRADE,
          },
          hardware: {
            item: 'Tama Iron Cobra HP900 (continued)',
            details: 'Continued Power Glide double pedal',
            notes: 'Consistent Iron Cobra preference across multiple album cycles.',
            change: null,
          },
          sticks: {
            item: 'Vater Shannon Larkin Signature (updated)',
            details: 'Refined hickory model',
            notes: 'Updated signature model with refined taper for better rebound.',
            change: CHANGE_TYPES.UPGRADE,
          },
          heads: {
            item: 'Evans G2 / EMAD2',
            details: 'G2 on toms, EMAD2 on kick',
            notes: 'EMAD2 upgrade for tighter kick response on 1000hp\'s harder-hitting sound.',
            change: CHANGE_TYPES.UPGRADE,
          },
        },

        estimatedCost: {
          original: 14000,
          inflationAdjusted: 18000,
          currency: 'USD',
        },

        keyChanges: [
          'Upgraded to Tama Starclassic Maple from Performer MX',
          'Sabian HHX/AAX combination for wider cymbal palette',
          'Evans EMAD2 upgrade',
          'The Oracle World Tour — Godsmack\'s largest production',
        ],

        quote: {
          text: "The Starclassic Maple is a completely different animal. It breathes more. When we were making The Oracle, I needed that warmth — it was a different kind of record.",
          source: 'Modern Drummer Interview, 2010',
        },

        videos: [],
      },

      {
        id: 'larkin-2018-when-legends-rise',
        era: 'When Legends Rise / Modern Era',
        years: '2016–Present',
        startYear: 2016,
        endYear: 2026,
        description: 'Larkin\'s most refined era. The switch to Tama Starclassic Walnut/Birch delivered the most complex, nuanced tone of his career — a hybrid shell that combines walnut\'s warmth with birch\'s attack and projection for Godsmack\'s continued arena touring.',
        albums: ['When Legends Rise (2018)', 'Lighting Up the Sky (2023)'],
        tours: ['When Legends Rise Tour', 'Lighting Up the Sky Tour 2023'],
        image: null,

        gear: {
          drums: {
            item: 'Tama Starclassic Walnut/Birch',
            details: 'Walnut/birch hybrid shells: 22" kick, 10"/12"/14"/16" toms, custom finish',
            notes: 'Major upgrade to Tama Starclassic Walnut/Birch — the walnut outer ply adds warmth and low-end while the birch inner ply provides attack and projection.',
            change: CHANGE_TYPES.SWITCH,
          },
          snare: {
            item: 'Tama Starclassic Walnut/Birch 14"×6.5"',
            details: 'Walnut/birch hybrid shell',
            notes: 'The walnut/birch snare has a rich, dark crack that sits perfectly in Godsmack\'s arena rock sound.',
            change: CHANGE_TYPES.SWITCH,
          },
          cymbals: {
            item: 'Sabian HHX Series',
            details: '14" HHX hi-hats, 16"/18" HHX crashes, 21" HH ride, 18" HHX China',
            notes: 'Fully HHX-based setup for consistent, musical tone across the mature When Legends Rise and Lighting Up the Sky recordings.',
            change: CHANGE_TYPES.UPGRADE,
          },
          hardware: {
            item: 'Tama Speed Cobra HP910 Double Pedal',
            details: 'Speed Cobra spring-loaded single chain',
            notes: 'Switched from Iron Cobra to Speed Cobra for lighter, more responsive feel in Godsmack\'s evolved rock sound.',
            change: CHANGE_TYPES.SWITCH,
          },
          sticks: {
            item: 'Vater Shannon Larkin Signature (current)',
            details: 'Current production signature model',
            notes: 'Long-term Vater partnership — Larkin\'s signature model refined through multiple iterations.',
            change: null,
          },
          heads: {
            item: 'Evans G2 / EMAD2',
            details: 'Consistent Evans configuration',
            notes: 'Decade-plus with Evans heads across all Godsmack recordings.',
            change: null,
          },
          electronics: {
            item: 'Roland SPD-SX Sampling Pad',
            details: 'Click track and ambient sample integration',
            notes: 'Electronics added for consistent live sound quality on arena tours.',
            change: CHANGE_TYPES.NEW,
          },
        },

        estimatedCost: {
          original: 18000,
          inflationAdjusted: 18000,
          currency: 'USD',
        },

        keyChanges: [
          'Brand switch to Tama Starclassic Walnut/Birch — most praised sound of career',
          'Tama Speed Cobra replaces Iron Cobra',
          'Fully HHX Sabian cymbal configuration',
          'Roland SPD-SX added for arena-quality live consistency',
          'Lighting Up the Sky (2023) — continued arena headliner status',
        ],

        quote: {
          text: "The Walnut/Birch is the best kit I\'ve ever played. Period. That combination of warmth and attack — I can hear the difference in every single note. It sounds like music.",
          source: 'Tama Drums Artist Profile, 2018',
        },

        videos: [],
      },
    ],

    metaTitle: 'Shannon Larkin Gear Evolution Timeline | Godsmack Drum Kit History',
    metaDescription: 'Explore Shannon Larkin\'s complete drum gear evolution from Wrathchild America through Godsmack\'s arena years. Tama Starclassic Performer to Walnut/Birch — every era documented.',
  },

  // ==========================================
  // Mario Duplantier - Gojira (1996–Present)
  // ==========================================
  'mario-duplantier': {
    slug: 'mario-duplantier',
    name: 'Mario Duplantier',
    band: 'Gojira',
    totalYearsActive: '1996-Present',
    profileImage: '/images/drummers/mario-duplantier.webp',
    summary: 'From budget kits in Bayonne basements to Sonor SQ2 rigs on stadium stages, Mario Duplantier\'s gear evolution mirrors Gojira\'s ascent from French underground to progressive death metal headliners — always in service of a drumming vocabulary unlike anyone else in metal.',

    eras: [
      {
        id: 'mario-2001-terra-incognita',
        era: 'Terra Incognita Era',
        years: '1996–2004',
        startYear: 1996,
        endYear: 2004,
        description: 'The formative years. Gojira (then Godzilla) built their sound in Bayonne on whatever gear Mario could access, establishing the dual bass drum foundation and tribal tom patterns that would define his playing style.',
        albums: ['Terra Incognita (2001)', 'The Link (2003)'],
        tours: ['Early French club circuit'],
        image: null,

        gear: {
          drums: {
            item: 'Pearl Export Series',
            details: 'Poplar shells: dual 22" kicks, 10"/12"/13"/16" toms',
            notes: 'Affordable Pearl Export was the natural choice for a developing band. Mario prioritized the dual kick configuration early — it became central to Gojira\'s sound.',
            change: null,
          },
          snare: {
            item: 'Pearl Sensitone Steel 14"×5.5"',
            details: 'Chrome steel shell, standard hoops',
            notes: 'Basic steel snare with the cutting crack needed to compete with Gojira\'s dense guitar tones.',
            change: null,
          },
          cymbals: {
            item: 'Paiste 2002',
            details: '14" hi-hats, 16"/18" crashes, 20" ride, 18" China',
            notes: 'Paiste 2002 was the standard European extreme metal cymbal — loud, cutting, and durable enough for club touring.',
            change: null,
          },
          hardware: {
            item: 'Pearl P-2002C Eliminator Double Pedal',
            details: 'Cam-driven double pedal for dual bass work',
            notes: 'The Eliminator\'s cam system helped Mario achieve the fluid dual bass patterns on tracks like "Remembrance" and "Satan is a Lawyer."',
            change: null,
          },
          sticks: {
            item: 'Vic Firth 5B',
            details: 'Standard hickory',
            notes: 'Off-the-shelf sticks matched to the aggressive attack required for early Gojira material.',
            change: null,
          },
          heads: {
            item: 'Remo Ambassador',
            details: 'Clear on toms, coated on snare',
            notes: 'Standard configuration, changed frequently during heavy club touring.',
            change: null,
          },
        },

        estimatedCost: {
          original: 3000,
          inflationAdjusted: 5500,
          currency: 'USD',
        },

        keyChanges: [
          'Dual 22" kick configuration established as Mario\'s defining setup',
          'Developed the tribal tom-pattern vocabulary unique to Gojira',
          'Playing style bridging jazz influence with extreme metal aggression',
        ],

        quote: {
          text: "We had nothing. We were just trying to make the most powerful music we could with whatever was available in Bayonne.",
          source: 'Metal Hammer Interview, 2005',
        },

        videos: [],
      },

      {
        id: 'mario-2005-from-mars',
        era: 'From Mars to Sirius Era',
        years: '2005–2008',
        startYear: 2005,
        endYear: 2008,
        description: 'The breakthrough. From Mars to Sirius put Gojira on the global extreme metal map and brought Mario his first major endorsement. The Gretsch USA Custom delivered the warm, resonant tone that shaped one of the decade\'s most celebrated metal drum sounds.',
        albums: ['From Mars to Sirius (2005)', 'The Way of All Flesh (2008)'],
        tours: ['From Mars to Sirius European Tour', 'The Way of All Flesh World Tour'],
        image: null,

        gear: {
          drums: {
            item: 'Gretsch USA Custom',
            details: 'Maple shells: dual 22"×18" kicks, 10"/12"/13"/16"/18" toms',
            notes: 'First major endorsement kit. Gretsch maple shells gave Mario the warm, complex resonance that defined the From Mars to Sirius drum sound — particularly the massive tom fills on "Flying Whales."',
            change: CHANGE_TYPES.SWITCH,
          },
          snare: {
            item: 'Gretsch USA Custom 14"×6.5"',
            details: 'Maple shell, die-cast hoops',
            notes: 'Deeper shell for more body and crack — essential for a snare that had to cut through Joe Duplantier\'s notoriously heavy guitar tones.',
            change: CHANGE_TYPES.SWITCH,
          },
          cymbals: {
            item: 'Paiste 2002',
            details: '14" Heavy hi-hats, 18"/19" crashes, 22" ride, 20" China',
            notes: 'Continued Paiste 2002 loyalty — the line\'s cutting power and projection suited Gojira\'s dense mix perfectly.',
            change: null,
          },
          hardware: {
            item: 'DW 5000 Turbo Double Pedal',
            details: 'Turbo cam direct drive double pedal',
            notes: 'Upgraded to DW 5000 Turbo for more responsive dual bass work as tempos and complexity increased on "From Mars to Sirius."',
            change: CHANGE_TYPES.SWITCH,
          },
          sticks: {
            item: 'Vic Firth 5B',
            details: 'Continued standard hickory',
            notes: 'No signature deal yet — technique over gear.',
            change: null,
          },
          heads: {
            item: 'Remo Emperor',
            details: 'Double-ply on toms, Powerstroke 3 on kicks',
            notes: 'Heavier heads needed for the aggressive two-kick technique and live touring demands.',
            change: CHANGE_TYPES.UPGRADE,
          },
        },

        estimatedCost: {
          original: 9000,
          inflationAdjusted: 15000,
          currency: 'USD',
        },

        keyChanges: [
          'First major Gretsch USA Custom endorsement',
          'Dual kick configuration expanded with larger 18" floor tom',
          'From Mars to Sirius (2005) — Gojira achieve international breakthrough',
          'The Way of All Flesh (2008) — Grammy nomination raises global profile',
        ],

        quote: {
          text: "The Gretsch gave me something warmer, more musical. I could still hit hard, but now there was depth behind each stroke.",
          source: 'Modern Drummer Feature, 2006',
        },

        videos: [],
      },

      {
        id: 'mario-2012-lenfant-sauvage',
        era: 'L\'Enfant Sauvage Era',
        years: '2009–2015',
        startYear: 2009,
        endYear: 2015,
        description: 'Gojira\'s most dynamic record. L\'Enfant Sauvage required Mario\'s most versatile performance — from blast beats to delicate atmospheric passages. The Gretsch rig was expanded and refined, with updated cymbal choices reflecting a more nuanced sonic palette.',
        albums: ['L\'Enfant Sauvage (2012)'],
        tours: ['L\'Enfant Sauvage World Tour', 'Festival circuit 2012–2014'],
        image: null,

        gear: {
          drums: {
            item: 'Gretsch USA Custom (expanded)',
            details: 'Maple shells: dual 22"×18" kicks, 8"/10"/12"/13"/16"/18" toms',
            notes: 'Added smaller 8" rack tom for higher melodic range used in the album\'s more atmospheric passages. Gretsch configuration fully matured.',
            change: CHANGE_TYPES.UPGRADE,
          },
          snare: {
            item: 'Gretsch USA Custom 14"×6.5"',
            details: 'Maple shell — continued',
            notes: 'Consistent Gretsch snare through this era. The maple warmth balanced well against L\'Enfant Sauvage\'s dynamic range.',
            change: null,
          },
          cymbals: {
            item: 'Meinl Byzance',
            details: '14" Byzance Traditional hi-hats, 17"/18"/19" crashes, 21" ride, 18" China',
            notes: 'Switched from Paiste 2002 to Meinl Byzance — darker, more complex tonal character suited L\'Enfant Sauvage\'s blend of brutality and atmosphere.',
            change: CHANGE_TYPES.SWITCH,
          },
          hardware: {
            item: 'DW 9000 Double Pedal',
            details: 'Twin-chain drive double pedal',
            notes: 'Upgraded to DW 9000 for improved response and consistency during longer live sets.',
            change: CHANGE_TYPES.UPGRADE,
          },
          sticks: {
            item: 'Vic Firth 5B',
            details: 'Continued hickory',
            notes: 'Consistent stick choice throughout the Gretsch years.',
            change: null,
          },
          heads: {
            item: 'Evans G2 / EMAD',
            details: 'G2 on toms, EMAD on kicks',
            notes: 'Switched to Evans for better attack definition and kick focus needed for L\'Enfant Sauvage\'s precise dual-bass passages.',
            change: CHANGE_TYPES.SWITCH,
          },
        },

        estimatedCost: {
          original: 12000,
          inflationAdjusted: 17000,
          currency: 'USD',
        },

        keyChanges: [
          'Cymbal switch from Paiste 2002 to Meinl Byzance',
          'Kit expanded with 8" rack tom for atmospheric range',
          'Evans heads adopted for improved kick attack definition',
          'L\'Enfant Sauvage (2012) — widely considered Gojira\'s finest album',
        ],

        quote: {
          text: "L\'Enfant Sauvage was about more control, more dynamics. The Byzance cymbals gave me that musical depth I needed for the quieter passages.",
          source: 'Drum! Magazine, 2012',
        },

        videos: [],
      },

      {
        id: 'mario-2016-magma-fortitude',
        era: 'Magma / Fortitude Era',
        years: '2016–Present',
        startYear: 2016,
        endYear: 2026,
        description: 'The modern era. Gojira reached global headliner status — opening for Metallica at stadiums, headlining Download Festival, performing at the Paris Olympics opening ceremony. Mario\'s Sonor SQ2 rig is the most refined and visually striking of his career.',
        albums: ['Magma (2016)', 'Fortitude (2021)'],
        tours: ['Magma World Tour', 'Fortitude World Tour', 'Metallica M72 World Tour (support)'],
        image: null,

        gear: {
          drums: {
            item: 'Sonor SQ2',
            details: 'Custom maple/beech shells: dual 22"×18" kicks, 10"/12"/13"/16"/18" toms',
            notes: 'Switch to Sonor SQ2 — fully custom specification per shell. Maple/beech hybrid delivers the projection for stadiums while retaining warmth. The SQ2 became Mario\'s most iconic kit.',
            change: CHANGE_TYPES.SWITCH,
          },
          snare: {
            item: 'Sonor SQ2 14"×6.5"',
            details: 'Custom maple shell, matching the main kit',
            notes: 'Matched SQ2 snare for consistent tonal character. The deeper shell provides body and crack in the dense Gojira studio and live mix.',
            change: CHANGE_TYPES.SWITCH,
          },
          cymbals: {
            item: 'Meinl Byzance',
            details: '14" Byzance Traditional hi-hats, 17"/18"/19" crashes, 21" Vintage ride, 18" China',
            notes: 'Continued Meinl Byzance partnership — dark, complex, hand-hammered tones suit Gojira\'s dynamic range. The Vintage Ride\'s complex wash adds depth on groove-heavy passages.',
            change: null,
          },
          hardware: {
            item: 'Tama Iron Cobra 900 Power Glide',
            details: 'Dual Iron Cobra pedals for independent kick control',
            notes: 'Switched to Tama Iron Cobra for the Power Glide cam, providing the fluid, controlled dual bass motion at Gojira\'s demanding live tempos.',
            change: CHANGE_TYPES.SWITCH,
          },
          sticks: {
            item: 'Tama Mario Duplantier Signature Sticks',
            details: 'Custom specs: heavier taper, larger bead',
            notes: 'First signature stick deal — Tama designed the model around Mario\'s aggressive attack and tribal pattern requirements.',
            change: CHANGE_TYPES.SIGNATURE,
          },
          heads: {
            item: 'Ahead Drumheads',
            details: 'Ahead on batter surfaces, standard resonant heads',
            notes: 'Switched to Ahead drumheads for durability and consistent attack response across Gojira\'s marathon festival and arena sets.',
            change: CHANGE_TYPES.SWITCH,
          },
          electronics: {
            item: 'Tama 1st Chair Throne + IEM system',
            details: 'Ergonomic throne and full in-ear monitor setup',
            notes: 'Arena and stadium touring added full IEM click integration for Gojira\'s precisely arranged compositions.',
            change: CHANGE_TYPES.NEW,
          },
        },

        estimatedCost: {
          original: 18000,
          inflationAdjusted: 18000,
          currency: 'USD',
        },

        keyChanges: [
          'Switch to Sonor SQ2 custom kit',
          'Tama Iron Cobra 900 Power Glide double pedal',
          'Tama Mario Duplantier Signature sticks launched',
          'Gojira headline Download Festival and support Metallica at stadiums',
          'Fortitude (2021) — Grammy nomination; Paris Olympics 2024 performance',
        ],

        quote: {
          text: "The SQ2 is the most personal kit I\'ve ever played. Every dimension was chosen for what I do. There\'s nothing accidental about any of it.",
          source: 'Sonor Artist Profile, 2017',
        },

        videos: [],
      },
    ],

    metaTitle: 'Mario Duplantier Gear Evolution Timeline | Gojira Drum Kit History',
    metaDescription: 'Explore Mario Duplantier\'s complete drum gear evolution from Terra Incognita to Fortitude. Pearl Export to Sonor SQ2 — every kit, every era of Gojira\'s drumming documented.',
  },

  // ==========================================
  // Paul Mazurkiewicz - Cannibal Corpse (1988–Present)
  // ==========================================
  'paul-mazurkiewicz': {
    slug: 'paul-mazurkiewicz',
    name: 'Paul Mazurkiewicz',
    band: 'Cannibal Corpse',
    totalYearsActive: '1988-Present',
    profileImage: '/images/drummers/paul-mazurkiewicz.webp',
    summary: 'Paul Mazurkiewicz is the only drummer Cannibal Corpse has ever had — a 35+ year run that makes him the longest-tenured drummer in death metal history. His gear evolution tracks from budget kits in Buffalo, New York to the Pearl Reference rig that drives one of extreme metal\'s most consistent and respected band.',

    eras: [
      {
        id: 'paul-1990-eaten-back-to-life',
        era: 'Eaten Back to Life Era',
        years: '1988–1992',
        startYear: 1988,
        endYear: 1992,
        description: 'The founding era. Cannibal Corpse built death metal from scratch in Buffalo, New York, on whatever affordable gear was available. Paul\'s relentless blast beats and technical precision were more impressive than anything the gear budget suggested.',
        albums: ['Eaten Back to Life (1990)', 'Butchered at Birth (1991)', 'Tomb of the Mutilated (1992)'],
        tours: ['Early US death metal circuit'],
        image: null,

        gear: {
          drums: {
            item: 'Pearl Export Series',
            details: 'Poplar shells: 22" kick, 12"/13"/16" toms',
            notes: 'The Pearl Export was the go-to budget kit for 1980s-90s extreme metal bands. Paul made it sound devastating on Eaten Back to Life.',
            change: null,
          },
          snare: {
            item: 'Pearl Sensitone Steel 14"×5.5"',
            details: 'Chrome steel shell',
            notes: 'Cutting steel snare that could survive Paul\'s aggressive blast beat technique while maintaining the sharp, dry crack death metal required.',
            change: null,
          },
          cymbals: {
            item: 'Paiste 2002',
            details: '14" hi-hats, 16"/18" crashes, 20" ride, 18" China',
            notes: 'Paiste 2002 was the practical choice for extreme metal — durable, loud, and affordable for a band just starting out.',
            change: null,
          },
          hardware: {
            item: 'Pearl P-2002C Eliminator Double Pedal',
            details: 'Budget double pedal',
            notes: 'Double bass was essential from day one — death metal\'s blast beat vocabulary required it.',
            change: null,
          },
          sticks: {
            item: 'Vic Firth 5B',
            details: 'Standard hickory',
            notes: 'Standard sticks — Paul\'s playing demanded durability over specialty.',
            change: null,
          },
          heads: {
            item: 'Remo Ambassador',
            details: 'Clear on toms, coated on snare',
            notes: 'Changed frequently given the punishment of early death metal touring.',
            change: null,
          },
        },

        estimatedCost: {
          original: 2500,
          inflationAdjusted: 5500,
          currency: 'USD',
        },

        keyChanges: [
          'Founding death metal drumming vocabulary established',
          'Blast beat technique developed to professional level',
          'Eaten Back to Life (1990) — one of the genre\'s founding documents',
          'Paul becomes the first and only drummer in Cannibal Corpse history',
        ],

        quote: {
          text: "We had nothing. We were just trying to play as fast and heavy as possible. The gear was secondary to the energy and the conviction.",
          source: 'Metal Maniacs Interview, 1991',
        },

        videos: [],
      },

      {
        id: 'paul-1994-the-bleeding',
        era: 'The Bleeding Era',
        years: '1993–1999',
        startYear: 1993,
        endYear: 1999,
        description: 'Cannibal Corpse gained their first major endorsements after the landmark Chris Barnes era recordings. The Bleeding and the transition to George "Corpsegrinder" Fisher brought increased profile and better gear. Paul\'s first professional endorsement kit arrived.',
        albums: ['The Bleeding (1994)', 'Vile (1996)', 'Gallery of Suicide (1998)', 'Bloodthirst (1999)'],
        tours: ['The Bleeding US Tour', 'European festival circuit'],
        image: null,

        gear: {
          drums: {
            item: 'Pearl Masters Professional',
            details: 'Maple shells: 22" kick, 10"/12"/13"/16" toms',
            notes: 'First proper endorsement upgrade from the Pearl Export. Maple shells provided warmer tone and much better resonance — immediately audible on The Bleeding recordings.',
            change: CHANGE_TYPES.UPGRADE,
          },
          snare: {
            item: 'Pearl Free-Floating Steel 14"×6.5"',
            details: 'Free-floating steel shell with independent strainer',
            notes: 'Switch to the Free-Floating system for a sharper, more cutting snare crack — perfect for death metal\'s demanding mix.',
            change: CHANGE_TYPES.SWITCH,
          },
          cymbals: {
            item: 'Sabian AAX',
            details: '14" AAX hi-hats, 17"/18" crashes, 21" ride, 18" China',
            notes: 'Switched from Paiste to Sabian AAX — the brighter, more cutting AAX character sat well in death metal\'s dense mix.',
            change: CHANGE_TYPES.SWITCH,
          },
          hardware: {
            item: 'Pearl Eliminator Double Pedal',
            details: 'Cam-driven double pedal, later moving to direct drive',
            notes: 'Pearl Eliminator for better speed and consistency in the evolving blast beat work.',
            change: CHANGE_TYPES.UPGRADE,
          },
          sticks: {
            item: 'Vic Firth 5B',
            details: 'Continued standard hickory',
            notes: 'No signature deal yet — still standard 5B.',
            change: null,
          },
          heads: {
            item: 'Remo Emperor',
            details: 'Double-ply on toms for increased durability',
            notes: 'Heavier heads for the aggressive, high-volume death metal touring schedule.',
            change: CHANGE_TYPES.UPGRADE,
          },
        },

        estimatedCost: {
          original: 7000,
          inflationAdjusted: 14000,
          currency: 'USD',
        },

        keyChanges: [
          'Pearl Masters Professional endorsement begins',
          'Pearl Free-Floating snare system adopted',
          'Sabian AAX cymbal endorsement replaces Paiste',
          'George "Corpsegrinder" Fisher joins (1995) — increased international profile',
          'Gallery of Suicide (1998) — band\'s most technically demanding recording to this point',
        ],

        quote: {
          text: "Getting the Pearl endorsement was a huge deal. Finally having gear that matched the level of music we were playing changed everything.",
          source: 'Cannibal Corpse Interview, Metal Hammer, 1995',
        },

        videos: [],
      },

      {
        id: 'paul-2002-gore-obsessed',
        era: 'Gore Obsessed / Kill Era',
        years: '2000–2009',
        startYear: 2000,
        endYear: 2009,
        description: 'The most consistent and celebrated period of Paul\'s career. Gore Obsessed and Kill are widely regarded as modern death metal masterworks. Paul upgraded to the Pearl Reference Series, delivering the most focused and powerful drum sound of his career.',
        albums: ['Gore Obsessed (2002)', 'The Wretched Spawn (2004)', 'Kill (2006)', 'Evisceration Plague (2009)'],
        tours: ['Multiple world tours', 'Ozzfest appearances'],
        image: null,

        gear: {
          drums: {
            item: 'Pearl Reference Series',
            details: 'Maple/birch hybrid shells: 22" kick, 10"/12"/14"/16" toms',
            notes: 'The Pearl Reference\'s hybrid maple/birch construction delivered attack from the birch and warmth from the maple — the perfect combination for death metal\'s demanding mix environment.',
            change: CHANGE_TYPES.UPGRADE,
          },
          snare: {
            item: 'Pearl Free-Floating Steel 14"×6.5"',
            details: 'Steel shell, continued Free-Floating preference',
            notes: 'Consistent snare sound across the middle era — the Free-Floating\'s explosive crack defined Cannibal Corpse\'s drum tone on Kill and Evisceration Plague.',
            change: null,
          },
          cymbals: {
            item: 'Sabian AAX',
            details: '14" AAX hi-hats, 17"/18"/19" crashes, 21" ride, 18"/20" Chinas',
            notes: 'Continued and expanded Sabian AAX setup. Added larger China cymbal for heavier accent work as the compositions grew more demanding.',
            change: CHANGE_TYPES.UPGRADE,
          },
          hardware: {
            item: 'Pearl Demon Drive Double Pedal',
            details: 'Direct drive double pedal for maximum speed',
            notes: 'Switched to the Pearl Demon Drive\'s direct drive mechanism for the most responsive blast beat performance possible.',
            change: CHANGE_TYPES.UPGRADE,
          },
          sticks: {
            item: 'Vic Firth 5B',
            details: 'Standard hickory — extremely high consumption rate',
            notes: 'Paul\'s aggressive playing style meant constant stick replacement on tour.',
            change: null,
          },
          heads: {
            item: 'Evans G2 / EMAD',
            details: 'G2 on toms, EMAD on kick',
            notes: 'Switched to Evans for better durability and the EMAD kick head\'s focused, punchy attack — essential for death metal kick clarity.',
            change: CHANGE_TYPES.SWITCH,
          },
          electronics: {
            item: 'ddrum Triggers',
            details: 'Kick drum triggers for live consistency',
            notes: 'Triggers added on kick drums to ensure blast beat definition at live volumes.',
            change: CHANGE_TYPES.NEW,
          },
        },

        estimatedCost: {
          original: 14000,
          inflationAdjusted: 22000,
          currency: 'USD',
        },

        keyChanges: [
          'Pearl Reference Series replaces Pearl Masters',
          'Pearl Demon Drive direct double pedal adopted',
          'Evans heads replace Remo across the kit',
          'ddrum kick triggers for live consistency',
          'Kill (2006) — widely considered the definitive Cannibal Corpse album',
        ],

        quote: {
          text: "The Reference kit was a revelation. That birch/maple hybrid gives you attack and warmth at the same time. Death metal needs both.",
          source: 'Pearl Drums Artist Profile, 2007',
        },

        videos: [],
      },

      {
        id: 'paul-2012-torture-present',
        era: 'Torture / Violence Unimagined Era',
        years: '2010–Present',
        startYear: 2010,
        endYear: 2026,
        description: 'Paul\'s most refined era. 35+ years in, Cannibal Corpse continues releasing albums of undiminished brutality. Paul\'s Pearl Reference setup has reached its definitive configuration — a stable, battle-tested rig built for maximum death metal precision at any venue size.',
        albums: ['Torture (2012)', 'A Skeletal Domain (2014)', 'Red Before Black (2017)', 'Violence Unimagined (2021)', 'Chaos Horrific (2023)'],
        tours: ['Ongoing world touring — over 2,000 career live performances'],
        image: null,

        gear: {
          drums: {
            item: 'Pearl Reference Series (current)',
            details: 'Maple/birch hybrid: 22"×18" kick, 10"/12"/14"/16" toms',
            notes: 'Refined Pearl Reference configuration — stable for over a decade. Paul\'s kit is among the most consistent in death metal; the gear serves the music without ego.',
            change: null,
          },
          snare: {
            item: 'Pearl Free-Floating Steel 14"×6.5"',
            details: 'Current production Free-Floating, steel shell',
            notes: 'Unchanged snare philosophy across 15+ years. The Free-Floating steel remains the definitive Paul Mazurkiewicz snare sound.',
            change: null,
          },
          cymbals: {
            item: 'Sabian AAX',
            details: 'Full AAX setup: 14" hi-hats, 17"/18"/19" crashes, 21" ride, 20" China',
            notes: 'Sabian AAX across 25+ years of Paul\'s career. The bright, cutting character has become synonymous with Cannibal Corpse\'s drum sound.',
            change: null,
          },
          hardware: {
            item: 'Pearl Demon Drive Double Pedal',
            details: 'Continued direct drive — longest partnership in Paul\'s career',
            notes: 'The Demon Drive remains Paul\'s preference for its direct response and durability across hundreds of live performances annually.',
            change: null,
          },
          sticks: {
            item: 'Vic Firth Paul Mazurkiewicz Signature',
            details: 'Hickory, standard length, custom taper',
            notes: 'First signature stick — long overdue recognition for one of death metal\'s most influential drummers.',
            change: CHANGE_TYPES.SIGNATURE,
          },
          heads: {
            item: 'Evans G2 / EMAD2',
            details: 'G2 clear on toms, EMAD2 on kick, UV1 on snare batter',
            notes: 'EMAD2 for more focused kick attack on modern recordings. UV1 snare head for better ghost note definition as Cannibal Corpse\'s arrangements grew more sophisticated.',
            change: CHANGE_TYPES.UPGRADE,
          },
          electronics: {
            item: 'ddrum Triggers + IEM System',
            details: 'Kick and snare triggers; full in-ear monitor integration',
            notes: 'Full IEM click track system essential for Cannibal Corpse\'s rhythmically demanding live performances at any venue size.',
            change: CHANGE_TYPES.UPGRADE,
          },
        },

        estimatedCost: {
          original: 18000,
          inflationAdjusted: 18000,
          currency: 'USD',
        },

        keyChanges: [
          'Vic Firth Paul Mazurkiewicz Signature sticks released',
          'Evans EMAD2 / UV1 upgrade for modern recording quality',
          'Full IEM click integration for live precision',
          'Chaos Horrific (2023) — 14th studio album, band shows no sign of slowing',
          '35+ years as sole drummer of Cannibal Corpse — death metal record',
        ],

        quote: {
          text: "I don\'t need to experiment with a dozen brands. I know what works. Every piece of this setup was chosen because it serves the music — nothing more, nothing less.",
          source: 'Vic Firth Artist Profile, 2019',
        },

        videos: [],
      },
    ],

    metaTitle: 'Paul Mazurkiewicz Gear Evolution Timeline | Cannibal Corpse Drum Kit History',
    metaDescription: 'Explore Paul Mazurkiewicz\'s complete drum gear evolution across 35+ years with Cannibal Corpse. Pearl Export to Pearl Reference — every era of death metal\'s longest-tenured drummer.',
  },

  // ==========================================
  // Vinnie Paul - Pantera / Hellyeah (1981–2018)
  // ==========================================
  'vinnie-paul': {
    slug: 'vinnie-paul',
    name: 'Vinnie Paul',
    band: 'Pantera',
    totalYearsActive: '1981-2018',
    profileImage: '/images/drummers/vinnie-paul.webp',
    summary: 'Vinnie Paul Abbott co-founded Pantera with his brother Dimebag Darrell in 1981 and drummed for the band until their end in 2004. His gear evolution — from glam-era Tama kits to the groove metal rigs of Cowboys from Hell and Far Beyond Driven — is inseparable from the sound that defined 1990s heavy metal. A tribute to the Vulgar Drummer (1964–2018).',

    eras: [
      {
        id: 'vinnie-1981-glam-era',
        era: 'Glam / Early Pantera Era',
        years: '1981–1989',
        startYear: 1981,
        endYear: 1989,
        description: 'The pre-groove metal years. Young Vinnie and Dimebag played hard rock and glam metal in Arlington, Texas, building the technical foundation that would later power Pantera\'s reinvention. The gear was stage-ready but not yet legendary.',
        albums: ['Metal Magic (1983)', 'Projects in the Jungle (1984)', 'I Am the Night (1985)', 'Power Metal (1988)'],
        tours: ['Texas regional touring — clubs and theatres'],
        image: null,

        gear: {
          drums: {
            item: 'Tama Imperialstar',
            details: 'Standard 5-piece: 22" kick, 12"/13"/16" toms',
            notes: 'Standard Tama setup for the early hard rock years — stage-presentable gear for the Arlington circuit. Vinnie\'s father Jerry Abbott helped fund the early equipment.',
            change: null,
          },
          snare: {
            item: 'Tama Steel 14"×5.5"',
            details: 'Standard steel shell',
            notes: 'Cutting steel snare suited to the hard rock and glam material of the early Pantera records.',
            change: null,
          },
          cymbals: {
            item: 'Zildjian A Series',
            details: '14" hi-hats, 16"/18" crashes, 20" ride',
            notes: 'Standard Zildjian A setup — reliable and stage-proven for the club circuit.',
            change: null,
          },
          hardware: {
            item: 'Tama Iron Cobra Double Pedal',
            details: 'Standard double bass configuration',
            notes: 'Two-kick setup from early in Vinnie\'s career — the large, powerful double bass sound was always central to his playing style.',
            change: null,
          },
          sticks: {
            item: 'Vic Firth 2B',
            details: 'Heavy hickory — playing backwards',
            notes: 'Vinnie played sticks held backwards (tapered end), his signature technique for extra power and a unique feel.',
            change: null,
          },
          heads: {
            item: 'Remo Ambassador',
            details: 'Clear on toms, coated on snare',
            notes: 'Standard configuration for the early years.',
            change: null,
          },
        },

        estimatedCost: {
          original: 4000,
          inflationAdjusted: 9000,
          currency: 'USD',
        },

        keyChanges: [
          'Formed Pantera with Dimebag (1981)',
          'Established signature backward stick technique for maximum power',
          'Four independent label albums released before major label signing',
          'Transitioned from glam/hard rock toward thrash influences late in the decade',
        ],

        quote: {
          text: "Dad always supported us. He bought us our first real gear and believed in what we were doing. That foundation made everything possible.",
          source: 'VH1 Behind the Music — Pantera, 2000',
        },

        videos: [],
      },

      {
        id: 'vinnie-1990-cowboys-from-hell',
        era: 'Cowboys from Hell Era',
        years: '1990–1992',
        startYear: 1990,
        endYear: 1992,
        description: 'The reinvention. Cowboys from Hell (1990) discarded the glam image and launched groove metal as a genre. Vinnie\'s Tama kit powered the groove metal blueprint — and his pocket drumming on tracks like "Cemetery Gates" and "Domination" became the template for an entire decade of heavy music.',
        albums: ['Cowboys from Hell (1990)'],
        tours: ['Cowboys from Hell World Tour', 'Support for Judas Priest, Skid Row'],
        image: null,

        gear: {
          drums: {
            item: 'Tama Artstar II',
            details: 'Birch shells: dual 24" kicks, 10"/12"/13"/14"/16"/18" toms',
            notes: 'Tama Artstar II birch shells provided the punchy, focused tone that became Cowboys from Hell\'s drum signature. Dual 24" kicks gave Vinnie the massive visual and sonic presence the reinvented Pantera demanded.',
            change: CHANGE_TYPES.UPGRADE,
          },
          snare: {
            item: 'Tama Artstar II 14"×6.5"',
            details: 'Birch shell, die-cast hoops',
            notes: 'The deeper shell gave more body to the groove metal snare — crucial for the half-time patterns that defined Pantera\'s new sound.',
            change: CHANGE_TYPES.UPGRADE,
          },
          cymbals: {
            item: 'Sabian AAX',
            details: '14" AAX hi-hats, 18"/19"/20" crashes, 22" ride, 20" China',
            notes: 'Switched to Sabian — the bright, cutting AAX character cut through Dimebag\'s heavily saturated guitar tone and became Vinnie\'s lifelong cymbal partner.',
            change: CHANGE_TYPES.SWITCH,
          },
          hardware: {
            item: 'Tama Iron Cobra Double Pedal',
            details: 'Dual 24" kick with Iron Cobra pedals',
            notes: 'Two physical kick drums — not a double pedal — for maximum visual impact and independent resonance. Each kick was mic\'d separately for the massive bass drum sound.',
            change: null,
          },
          sticks: {
            item: 'Vic Firth 2B (held backwards)',
            details: 'Thick hickory, tapered end used as grip',
            notes: 'Vinnie\'s famous backward stick grip — holding the thick end, striking with the taper — for raw power. Immediately identifiable technique.',
            change: null,
          },
          heads: {
            item: 'Remo Pinstripe',
            details: 'Controlled, focused tone for the recording',
            notes: 'Pinstripe on toms for Terry Date\'s focused studio sound on Cowboys from Hell.',
            change: CHANGE_TYPES.SWITCH,
          },
        },

        estimatedCost: {
          original: 12000,
          inflationAdjusted: 27000,
          currency: 'USD',
        },

        keyChanges: [
          'Genre-defining groove metal sound established',
          'Sabian AAX cymbal endorsement begins — lifelong partnership',
          'Dual 24" kick drums become Vinnie\'s visual signature',
          'Cowboys from Hell (1990) — groove metal\'s founding document',
          'Backward stick technique brought to national/international audience',
        ],

        quote: {
          text: "We knew Cowboys from Hell was going to change everything. We threw out everything from before and started fresh. The drums had to sound like a machine — but with feel.",
          source: 'Guitar World Interview (Dimebag tribute feature), 2005',
        },

        videos: [],
      },

      {
        id: 'vinnie-1992-vulgar-far-beyond',
        era: 'Vulgar Display / Far Beyond Driven Era',
        years: '1992–1996',
        startYear: 1992,
        endYear: 1996,
        description: 'Pantera\'s commercial and artistic peak. Vulgar Display of Power (1992) and Far Beyond Driven (1994) achieved mainstream sales without compromising heaviness — Far Beyond Driven debuted at #1 on Billboard, unprecedented for music this aggressive. Vinnie\'s drumming on these records remains the definitive template for groove metal drumming.',
        albums: ['Vulgar Display of Power (1992)', 'Far Beyond Driven (1994)'],
        tours: ['Vulgar Display World Tour', 'Far Beyond Driven World Tour', 'Headlining arenas worldwide'],
        image: null,

        gear: {
          drums: {
            item: 'Pearl Masters Custom',
            details: 'Maple shells: dual 24" kicks, 10"/12"/14"/16"/18" toms',
            notes: 'Switched to Pearl for the Vulgar Display era — maple shells provided the warmer, fuller tone that producer Terry Date used to create one of the era\'s most iconic drum sounds. The massive kick drum tone on "Fucking Hostile" and "Walk" was born from this setup.',
            change: CHANGE_TYPES.SWITCH,
          },
          snare: {
            item: 'Pearl Free-Floating 14"×8"',
            details: 'Deep steel shell — 8" depth for maximum body',
            notes: 'The unusually deep 8" snare — significantly deeper than standard — gave Vinnie the massive, chest-thumping snare crack that sat perfectly in Dimebag\'s massive guitar wall. No snare in groove metal sounded like it.',
            change: CHANGE_TYPES.SWITCH,
          },
          cymbals: {
            item: 'Sabian AAX / HHX',
            details: '14" AAX Metal hi-hats, 18"/19"/20" crashes, 22" HHX ride, 20" China',
            notes: 'Expanded Sabian setup adding HHX models — the HHX ride\'s drier, more defined bell gave clear articulation over the dense arena-volume guitar tones.',
            change: CHANGE_TYPES.UPGRADE,
          },
          hardware: {
            item: 'Pearl Eliminator Double Pedal + dual kick',
            details: 'Both physical kicks AND double pedal option available',
            notes: 'Maintained dual physical kick drums for live shows. The visual and sonic impact of two 24" bass drums was non-negotiable for Pantera\'s arena productions.',
            change: CHANGE_TYPES.UPGRADE,
          },
          sticks: {
            item: 'Vic Firth 2B (backwards)',
            details: 'Continued backward-held thick hickory',
            notes: 'Far Beyond Driven\'s demand for raw power made the backward stick technique more essential than ever.',
            change: null,
          },
          heads: {
            item: 'Remo Powerstroke 3 / Emperor',
            details: 'Powerstroke 3 on kicks, Emperor on toms',
            notes: 'Powerstroke 3 on the 24" kicks gave the controlled, punchy bass drum sound that became synonymous with groove metal production.',
            change: CHANGE_TYPES.SWITCH,
          },
          electronics: {
            item: 'ddrum Triggers',
            details: 'Kick drum triggers for live reinforcement',
            notes: 'Triggers on kicks added for arena-scale consistency — Pantera\'s guitar volumes demanded it.',
            change: CHANGE_TYPES.NEW,
          },
        },

        estimatedCost: {
          original: 18000,
          inflationAdjusted: 37000,
          currency: 'USD',
        },

        keyChanges: [
          'Brand switch to Pearl Masters Custom maple',
          'Signature 14"×8" deep steel snare — no snare sounded like it',
          'Far Beyond Driven (1994) debuts at #1 on Billboard',
          'ddrum triggers added for arena-scale live sound',
          'Groove metal drum vocabulary fully established — copied by thousands',
        ],

        quote: {
          text: "Walk, 5 Minutes Alone, Fucking Hostile — that snare had to cut through Dime\'s guitar like a whip. The 8\" depth gave me everything I needed. People heard that crack and knew it was us.",
          source: 'Modern Drummer Interview, 1994',
        },

        videos: [],
      },

      {
        id: 'vinnie-1996-hellyeah-era',
        era: 'Later Pantera / Hellyeah Era',
        years: '1996–2018',
        startYear: 1996,
        endYear: 2018,
        description: 'The final chapters. The Great Southern Trendkill and Reinventing the Steel completed the Pantera catalog. After Dimebag\'s murder in 2004 — witnessed by Vinnie on stage — he eventually returned to music with Hellyeah, his final band. The ddrum Vinnie Paul Signature Series was his definitive setup until his passing in June 2018.',
        albums: ['The Great Southern Trendkill (1996)', 'Reinventing the Steel (2000)', 'Hellyeah albums (2008–2016)'],
        tours: ['Great Southern Trendkill Tour', 'Reinventing the Steel Tour', 'Hellyeah multiple world tours'],
        image: null,

        gear: {
          drums: {
            item: 'ddrum Vinnie Paul Signature Series',
            details: 'Custom Black Lacquer: dual 24" kicks, 10"/12"/14"/16"/18" toms',
            notes: 'ddrum built Vinnie\'s definitive signature kit — large shells, deep hardware, and a visual presentation matching his larger-than-life personality. The Signature Series became his most iconic setup.',
            change: CHANGE_TYPES.SIGNATURE,
          },
          snare: {
            item: 'ddrum Vinnie Paul Signature Snare 14"×8"',
            details: 'Deep maple shell, reinforcement rings for projection',
            notes: 'Matching signature snare maintaining the deep 8" dimension that defined his sound since the Vulgar Display era. ddrum built it with reinforcement rings for maximum projection.',
            change: CHANGE_TYPES.SIGNATURE,
          },
          cymbals: {
            item: 'Sabian AAX / HHX',
            details: '14" AAX Metal hi-hats, 18"/19"/20" crashes, 22" HHX Raw Bell Dry Ride, 20" China',
            notes: 'Long-term Sabian partnership continued through Hellyeah. The HHX Raw Bell Dry Ride provided drier articulation for the groove-focused Hellyeah material.',
            change: null,
          },
          hardware: {
            item: 'ddrum Heavy-Duty Hardware + ddrum Signature Throne',
            details: 'Full ddrum hardware package',
            notes: 'Matched ddrum hardware for consistency and endorsement requirements. The Vinnie Paul Signature Throne was ergonomically designed for long sets.',
            change: CHANGE_TYPES.SWITCH,
          },
          sticks: {
            item: 'Vic Firth 2B (held backwards)',
            details: 'Continued backward technique throughout career',
            notes: 'The backward stick technique never changed — a defining characteristic maintained for the entirety of Vinnie\'s career. Immediately identified him on sight.',
            change: null,
          },
          heads: {
            item: 'Evans EC Reverse Dot / Hazy 300',
            details: 'EC Reverse Dot on snare batter, Hazy 300 snare side',
            notes: 'Evans heads for the Hellyeah era — EC Reverse Dot on snare provided controlled attack while maintaining the deep crack characteristic of all Vinnie\'s snare work.',
            change: CHANGE_TYPES.SWITCH,
          },
          electronics: {
            item: 'ddrum Trigger System',
            details: 'Full trigger setup on kicks and snare for live and recording use',
            notes: 'ddrum\'s trigger system integrated naturally with the signature kit — kicks and snare both triggered for maximum live consistency at Hellyeah\'s headlining shows.',
            change: null,
          },
        },

        estimatedCost: {
          original: 20000,
          inflationAdjusted: 25000,
          currency: 'USD',
        },

        keyChanges: [
          'ddrum Vinnie Paul Signature Series — definitive kit of final era',
          'Dimebag Darrell murdered on stage, December 8, 2004 — Vinnie witnessed it',
          'Hellyeah formed 2006 — Vinnie returns to performing',
          'Full ddrum hardware and trigger integration',
          'Vinnie Paul passes away June 22, 2018 — an irreplaceable loss to metal',
        ],

        quote: {
          text: "Every night I play, I play for Dime. That\'s never going to change. The music goes on because that\'s what he would have wanted.",
          source: 'Hellyeah Interview, Metal Hammer, 2008',
        },

        videos: [],
      },
    ],

    metaTitle: 'Vinnie Paul Gear Evolution Timeline | Pantera Drum Kit History',
    metaDescription: 'Explore Vinnie Paul\'s complete drum gear evolution from Pantera\'s glam era to Cowboys from Hell, Vulgar Display of Power, and his final ddrum signature kit with Hellyeah.',
  },

  // ==========================================
  // George Kollias - Nile (2004–Present)
  // ==========================================
  'george-kollias': {
    slug: 'george-kollias',
    name: 'George Kollias',
    band: 'Nile',
    totalYearsActive: '1995-Present',
    profileImage: '/images/drummers/george-kollias.webp',
    summary: 'From Athens club gigs to Nile\'s most technically demanding stages in New York City, George Kollias\'s gear evolution traces a path from budget Greek-market kits to a refined Pearl-based rig built for elite blast beat speeds — the most precisely calibrated death metal setup ever assembled.',

    eras: [
      {
        id: 'kollias-2000-greek-underground',
        era: 'Greek Underground Era',
        years: '1995–2004',
        startYear: 1995,
        endYear: 2004,
        description: 'Before joining Nile, George Kollias developed his extreme technique in the Greek metal underground with bands including Sickening Horror and Nightfall. Whatever gear he could source in Athens formed the foundation for techniques that would later redefine death metal drumming.',
        albums: ['Sickening Horror demos', 'Nightfall early recordings'],
        tours: ['Greek club circuit'],
        image: null,

        gear: {
          drums: {
            item: 'Tama Rockstar / Starclassic',
            details: 'Basic 5-piece: 22" kick, 12"/13"/16" toms',
            notes: 'Affordable Tama kits accessible in the Greek market — the foundation for developing his blast beat vocabulary.',
            change: null,
          },
          snare: {
            item: 'Tama Steel 14"×5.5"',
            details: 'Standard steel snare',
            notes: 'Crisp, cutting response suited to death metal tempos.',
            change: null,
          },
          cymbals: {
            item: 'Paiste 2002',
            details: '14" hi-hats, 16"/18" crashes, 20" ride',
            notes: 'Paiste was the dominant choice across European extreme metal circles.',
            change: null,
          },
          hardware: {
            item: 'Tama Iron Cobra Double Pedal',
            details: 'Double pedal central to blast beat development',
            notes: 'Iron Cobra became inseparable from Kollias\'s technique — the pedal he built his record-breaking speed on from the beginning.',
            change: null,
          },
          sticks: {
            item: 'Vic Firth 5B',
            details: 'Standard hickory',
            notes: 'Off-the-shelf sticks during the pre-endorsement period.',
            change: null,
          },
          heads: {
            item: 'Remo Ambassador',
            details: 'Clear on toms',
            notes: 'Standard single-ply configuration.',
            change: null,
          },
        },

        estimatedCost: {
          original: 2500,
          inflationAdjusted: 4500,
          currency: 'USD',
        },

        keyChanges: [
          'Developed blast beat vocabulary in Athens underground',
          'Tama Iron Cobra established as foundational speed pedal',
          'Built reputation across Greek extreme metal scene',
        ],

        quote: {
          text: "I was playing in rehearsal rooms in Athens, obsessing over technique. The gear was secondary — the precision was everything.",
          source: 'Modern Drummer Interview, 2009',
        },

        videos: [],
      },

      {
        id: 'kollias-2005-annihilation',
        era: 'Annihilation of the Wicked Era',
        years: '2005–2008',
        startYear: 2005,
        endYear: 2008,
        description: 'George Kollias joined Nile in 2004 and immediately delivered one of the most technically impressive death metal drumming performances ever recorded on Annihilation of the Wicked. His Pearl endorsement began here, giving him a professional kit capable of withstanding extreme international touring demands.',
        albums: ['Annihilation of the Wicked (2005)', 'Ithyphallic (2007)'],
        tours: ['Annihilation of the Wicked Tour', 'Ithyphallic Tour', 'Summer Slaughter 2006'],
        image: null,

        gear: {
          drums: {
            item: 'Pearl Reference Series',
            details: 'Maple/birch hybrid shells: 22" kick, 10"/12"/14"/16" toms',
            notes: 'First Pearl endorsement — the Reference maple/birch hybrid delivered punch and clarity needed for Nile\'s dense Egyptian-themed arrangements.',
            change: CHANGE_TYPES.SWITCH,
          },
          snare: {
            item: 'Pearl Free-Floating Steel 14"×6.5"',
            details: 'Free-floating shell for maximum resonance',
            notes: 'Explosive snare attack essential for Kollias\'s ultra-fast snare work between blast beat patterns.',
            change: CHANGE_TYPES.SWITCH,
          },
          cymbals: {
            item: 'Paiste Signature Series',
            details: '14" hi-hats, 17"/18" crashes, 20" ride, 18" China',
            notes: 'Upgraded to Paiste Signature line for professional touring brightness and cut.',
            change: CHANGE_TYPES.UPGRADE,
          },
          hardware: {
            item: 'Tama Iron Cobra HP900 Double Pedal',
            details: 'Power Glide cam for consistent speed',
            notes: 'Continued Iron Cobra — the pedal central to his blast beat precision, unchanged across the brand switch.',
            change: null,
          },
          sticks: {
            item: 'Vic Firth 5B',
            details: 'Hickory — pre-signature era',
            notes: 'Standard Vic Firth before his signature model was developed.',
            change: null,
          },
          heads: {
            item: 'Remo Emperor / Powerstroke 3',
            details: 'Emperor on toms, Powerstroke 3 on kick',
            notes: 'Double-ply for durability at extreme speeds; focused kick punch.',
            change: CHANGE_TYPES.UPGRADE,
          },
        },

        estimatedCost: {
          original: 9000,
          inflationAdjusted: 15000,
          currency: 'USD',
        },

        keyChanges: [
          'Joined Nile (2004)',
          'Pearl Reference endorsement begins — first major brand partnership',
          'Annihilation of the Wicked sets new death metal technical benchmark',
          'Ithyphallic (2007) further demonstrates speed and precision range',
        ],

        quote: {
          text: "When I joined Nile, I had to be better than I'd ever been. The music demanded everything. Pearl gave me a kit that could survive it.",
          source: 'Drumhead Magazine Interview, 2006',
        },

        videos: [],
      },

      {
        id: 'kollias-2009-those-whom',
        era: 'Those Whom the Gods Detest Era',
        years: '2009–2015',
        startYear: 2009,
        endYear: 2015,
        description: 'George Kollias\'s technical and artistic peak with Nile. Those Whom the Gods Detest and At the Gate of Sethu cemented his status as the most precise drummer in death metal. His solo album Invictus (2009) demonstrated compositional mastery beyond pure speed, and his first signature Vic Firth drumsticks arrived during this era.',
        albums: ['Those Whom the Gods Detest (2009)', 'At the Gate of Sethu (2012)', 'Invictus (solo, 2009)'],
        tours: ['Those Whom the Gods Detest Tour', 'Summer Slaughter 2010', 'At the Gate of Sethu Tour'],
        image: null,

        gear: {
          drums: {
            item: 'Pearl Reference Pure',
            details: 'All-maple shells: 22" kick, 8"/10"/12"/14"/16" toms',
            notes: 'Upgraded to Reference Pure — all-maple construction delivers a warmer, more resonant tone across Nile\'s complex arrangements.',
            change: CHANGE_TYPES.UPGRADE,
          },
          snare: {
            item: 'Pearl Free-Floating Steel 14"×6.5"',
            details: 'Continued Free-Floating steel preference',
            notes: 'Consistent snare approach across multiple album cycles.',
            change: null,
          },
          cymbals: {
            item: 'Paiste Signature Series',
            details: '14" hi-hats, 17"/18"/19" crashes, 21" ride, 18" China',
            notes: 'Full Paiste Signature configuration — bright, cutting response for Nile\'s extreme live volumes.',
            change: null,
          },
          hardware: {
            item: 'Tama Iron Cobra HP900 Double Pedal',
            details: 'Power Glide — optimized for speed and consistency',
            notes: 'Iron Cobra remains the constant across every era — built into his muscle memory over decades.',
            change: null,
          },
          sticks: {
            item: 'Vic Firth George Kollias Signature',
            details: 'Hickory with precise taper for extreme tempos',
            notes: 'First George Kollias signature stick — engineered for durability at blast beat speeds.',
            change: CHANGE_TYPES.SIGNATURE,
          },
          heads: {
            item: 'Remo Emperor / Powerstroke 3',
            details: 'Emperor on toms, Powerstroke 3 on kick',
            notes: 'Reliable configuration maintained for intense international touring.',
            change: null,
          },
          electronics: {
            item: 'ddrum triggers on kick drums',
            details: 'Kick drum triggers for live consistency',
            notes: 'Electronic triggers added to ensure double bass cuts through at extreme live volumes.',
            change: CHANGE_TYPES.NEW,
          },
        },

        estimatedCost: {
          original: 14000,
          inflationAdjusted: 19000,
          currency: 'USD',
        },

        keyChanges: [
          'Vic Firth George Kollias signature sticks launched',
          'Upgraded to Pearl Reference Pure all-maple shells',
          'Solo album Invictus released (2009)',
          'ddrum triggers integrated for live double bass consistency',
        ],

        quote: {
          text: "Speed is nothing without precision. I can play blast beats at any tempo — but the note placement has to be perfect every time.",
          source: 'Modern Drummer, 2010',
        },

        videos: [],
      },

      {
        id: 'kollias-2015-modern',
        era: 'Vile Nilotic Rites Era',
        years: '2015–Present',
        startYear: 2015,
        endYear: 2026,
        description: 'In the modern era, Kollias has refined his setup to an elite standard. What Should Not Be Unearthed (2015) and Vile Nilotic Rites (2019) represent his most mature work with Nile, while his second solo album Labyrinth of Chaos (2018) expanded his compositional voice. His drum clinics worldwide have established him as a preeminent educator in extreme metal technique.',
        albums: ['What Should Not Be Unearthed (2015)', 'Vile Nilotic Rites (2019)', 'Labyrinth of Chaos (solo, 2018)'],
        tours: ['What Should Not Be Unearthed Tour', 'Vile Nilotic Rites World Tour 2019–2020'],
        image: null,

        gear: {
          drums: {
            item: 'Pearl Reference Pure',
            details: 'All-maple: 22" kick, 8"/10"/12"/14"/16" toms, custom finish',
            notes: 'Current primary kit — Pearl Reference Pure with custom specifications refined across 10+ years.',
            change: null,
          },
          snare: {
            item: 'Pearl Free-Floating Steel 14"×6.5"',
            details: 'Current snare — consistent across multiple album cycles',
            notes: 'Free-Floating design maximizes resonance and attack from the thin steel shell.',
            change: null,
          },
          cymbals: {
            item: 'Paiste Signature Series',
            details: '14" hi-hats, 17"/18"/19" crashes, 21" ride, 18" China',
            notes: 'Complete Paiste Signature configuration — a decade of consistent partnership.',
            change: null,
          },
          hardware: {
            item: 'Tama Iron Cobra HP900 Double Pedal',
            details: 'Current pedal — unchanged across his entire Nile career',
            notes: 'The Iron Cobra is inseparable from Kollias\'s identity — his technique was built around its specific feel over 20+ years.',
            change: null,
          },
          sticks: {
            item: 'Vic Firth George Kollias Signature',
            details: 'Updated model with refined taper and balance',
            notes: 'Signature updated from the original spec — heavier rear end for better control at top speeds.',
            change: CHANGE_TYPES.UPGRADE,
          },
          heads: {
            item: 'Remo Emperor / Powerstroke 3',
            details: 'Consistent Emperor/Powerstroke configuration',
            notes: 'Decade-plus proven configuration for Nile\'s demanding live environment.',
            change: null,
          },
          electronics: {
            item: 'ddrum Acoustic Pro Triggers',
            details: 'Kick and snare triggers for live consistency',
            notes: 'Refined hybrid system — ensures every note is heard in Nile\'s wall-of-sound live context.',
            change: CHANGE_TYPES.UPGRADE,
          },
        },

        estimatedCost: {
          original: 18000,
          inflationAdjusted: 18000,
          currency: 'USD',
        },

        keyChanges: [
          'Vile Nilotic Rites (2019) — most refined Nile drumming performance',
          'Solo album Labyrinth of Chaos (2018) expands compositional range',
          'Worldwide drum clinics establish Kollias as premier educator in extreme metal',
          'Setup represents 20+ years of incremental precision refinement',
        ],

        quote: {
          text: "After all these years with Nile, I still treat every song like my first time playing it. The technique must be perfect. There is no room for error in this music.",
          source: 'Drumhead Magazine, 2019',
        },

        videos: [],
      },
    ],

    metaTitle: 'George Kollias Gear Evolution Timeline | Nile Drum Kit History',
    metaDescription: 'Explore George Kollias\'s complete drum gear evolution from the Greek underground to Nile\'s world stages. Pearl Reference, Tama Iron Cobra, Paiste Signature — every era of death metal\'s most precise blast beat drummer.',
  },

  // ==========================================
  // Flo Mounier - Cryptopsy (1992–Present)
  // ==========================================
  'flo-mounier': {
    slug: 'flo-mounier',
    name: 'Flo Mounier',
    band: 'Cryptopsy',
    totalYearsActive: '1992-Present',
    profileImage: '/images/drummers/flo-mounier.webp',
    summary: 'From Tama kits in Montreal rehearsal rooms to a Pearl-equipped machine capable of defining technical death metal for three decades, Flo Mounier\'s gear evolution mirrors Cryptopsy\'s ascent from Quebec underground legends to one of the most technically accomplished death metal bands in history.',

    eras: [
      {
        id: 'flo-1993-blasphemy',
        era: 'Blasphemy Made Flesh / None So Vile Era',
        years: '1992–1998',
        startYear: 1992,
        endYear: 1998,
        description: 'The formative era. Flo Mounier helped build Cryptopsy from a Montreal underground band into the defining force of brutal technical death metal. Playing on Tama kits with whatever he could afford in early-1990s Quebec, he developed the hyper-fast, compositionally complex drumming vocabulary that would define None So Vile — widely considered the greatest technical death metal album ever recorded.',
        albums: ['Blasphemy Made Flesh (1994)', 'None So Vile (1996)'],
        tours: ['Canadian underground circuit', 'None So Vile North American touring'],
        image: null,

        gear: {
          drums: {
            item: 'Tama Starclassic Performer',
            details: 'Birch/bubinga shells: 22" kick, 10"/12"/14"/16" toms',
            notes: 'The Starclassic Performer\'s birch/bubinga hybrid gave Flo the punchy, articulate sound needed for Cryptopsy\'s insanely complex rhythmic patterns.',
            change: null,
          },
          snare: {
            item: 'Tama Steel 14"×5.5"',
            details: 'Standard steel snare — cutting, explosive attack',
            notes: 'Sharp, bright snare sound that cut through the chaotic guitar and bass density on None So Vile.',
            change: null,
          },
          cymbals: {
            item: 'Sabian AA / HH Series',
            details: '14" hi-hats, 16"/18" crashes, 20" ride, 18" China',
            notes: 'Sabian became Flo\'s cymbal brand of choice early in his career — bright attack and cutting presence at death metal volumes.',
            change: null,
          },
          hardware: {
            item: 'Tama Iron Cobra Double Pedal',
            details: 'Double pedal for extreme speed work',
            notes: 'Iron Cobra was Flo\'s tool for the hyper-fast double bass patterns that define None So Vile\'s relentless attack.',
            change: null,
          },
          sticks: {
            item: 'Vic Firth 5B',
            details: 'Standard hickory',
            notes: 'Standard sticks before signature endorsement.',
            change: null,
          },
          heads: {
            item: 'Remo Emperor',
            details: 'Double-ply on toms for durability',
            notes: 'Double-ply heads to withstand the aggressive attack required for Cryptopsy\'s extreme material.',
            change: null,
          },
        },

        estimatedCost: {
          original: 4000,
          inflationAdjusted: 8000,
          currency: 'USD',
        },

        keyChanges: [
          'Established Cryptopsy\'s signature hyper-technical drumming style',
          'None So Vile (1996) recorded — considered the greatest technical death metal album',
          'Tama Starclassic becomes the instrument of the era\'s most complex death metal drumming',
          'Iron Cobra double pedal essential for extreme speed development',
        ],

        quote: {
          text: "None So Vile was us pushing as hard as we could. Every beat had to be intentional. Controlled chaos.",
          source: 'Metal Maniacs Interview, 1997',
        },

        videos: [],
      },

      {
        id: 'flo-1998-whisper',
        era: 'Whisper Supremacy / And Then You\'ll Beg / Once Was Not Era',
        years: '1998–2007',
        startYear: 1998,
        endDate: 2007,
        endYear: 2007,
        description: 'Cryptopsy\'s most prolific creative period and Flo Mounier\'s technical apex. With the Pearl endorsement now active, he had a professional-grade kit fully capable of surviving brutal touring demands. Whisper Supremacy and And Then You\'ll Beg are considered the pinnacle of blasting technical death metal composition, while Once Was Not pushed the genre\'s melodic and structural limits.',
        albums: ['Whisper Supremacy (1998)', 'And Then You\'ll Beg (2000)', 'None So Live (2003)', 'Once Was Not (2005)'],
        tours: ['North American death metal circuit', 'European festival touring'],
        image: null,

        gear: {
          drums: {
            item: 'Pearl Reference Series',
            details: 'Maple/birch hybrid shells: 22" kick, 10"/12"/14"/16" toms',
            notes: 'Switch to Pearl for a brighter, more articulate maple/birch tone suited to Cryptopsy\'s increasingly complex arrangements.',
            change: CHANGE_TYPES.SWITCH,
          },
          snare: {
            item: 'Pearl Free-Floating Steel 14"×6.5"',
            details: 'Free-floating shell — maximum resonance and attack',
            notes: 'Free-Floating design delivers the explosive crack needed for Flo\'s ultra-precise snare placement at extreme tempos.',
            change: CHANGE_TYPES.SWITCH,
          },
          cymbals: {
            item: 'Sabian AAX Series',
            details: '14" AAX hi-hats, 17"/18" crashes, 20" ride, 18" China',
            notes: 'Upgraded to Sabian AAX for brighter, more cutting sound at professional volumes.',
            change: CHANGE_TYPES.UPGRADE,
          },
          hardware: {
            item: 'Pearl Eliminator / Demon Drive Double Pedal',
            details: 'Fast cam-driven double pedal',
            notes: 'Switched to Pearl pedals to complement Pearl kit endorsement — Eliminator\'s adjustable cam suited his varied speed demands.',
            change: CHANGE_TYPES.SWITCH,
          },
          sticks: {
            item: 'Vic Firth 5B / Custom',
            details: 'Hickory sticks, pre-signature era',
            notes: 'Standard Vic Firth sticks through this period.',
            change: null,
          },
          heads: {
            item: 'Remo Emperor / Powerstroke 3',
            details: 'Emperor on toms, Powerstroke 3 on kick',
            notes: 'Focused kick attack for the dense low-end of Cryptopsy\'s recording and live sound.',
            change: CHANGE_TYPES.UPGRADE,
          },
        },

        estimatedCost: {
          original: 10000,
          inflationAdjusted: 18000,
          currency: 'USD',
        },

        keyChanges: [
          'Pearl endorsement begins — switch from Tama to Pearl Reference',
          'Pearl Eliminator/Demon Drive pedal replaces Iron Cobra',
          'Sabian AAX upgrade for touring brightness',
          'Whisper Supremacy (1998) and And Then You\'ll Beg (2000) define the technical death metal peak',
          'Once Was Not (2005) expands Cryptopsy\'s compositional range',
        ],

        quote: {
          text: "And Then You'll Beg was about showing that you can be unbelievably fast and still be musical. Every fill has a reason.",
          source: 'Unrestrained! Magazine Interview, 2001',
        },

        videos: [],
      },

      {
        id: 'flo-2008-unspoken',
        era: 'Unspoken King / Self-Titled / Modern Era',
        years: '2008–Present',
        startYear: 2008,
        endYear: 2026,
        description: 'The controversial and then rehabilitative era. The Unspoken King (2008) divided Cryptopsy\'s fanbase, but the self-titled album (2012) and the Book of Suffering series (2015, 2018) re-established the band\'s brutal identity. Flo\'s setup has evolved into a refined, custom-optimized rig built around his specific physical needs and the demands of sustained technical performance over three decades.',
        albums: ['The Unspoken King (2008)', 'Cryptopsy (2012)', 'Book of Suffering — Tome I (2015)', 'Book of Suffering — Tome II (2018)'],
        tours: ['Unspoken King Tour', 'North American death metal touring', 'European festival dates'],
        image: null,

        gear: {
          drums: {
            item: 'Pearl Reference Pure / Custom configuration',
            details: 'All-maple shells: 22" kick, 8"/10"/12"/14"/16" toms',
            notes: 'Evolved to an all-maple Reference Pure for a warmer, more resonant tone that suits the increased compositional complexity of the modern Cryptopsy material.',
            change: CHANGE_TYPES.UPGRADE,
          },
          snare: {
            item: 'Pearl Free-Floating Steel 14"×6.5"',
            details: 'Continued Free-Floating steel preference',
            notes: 'Long-standing snare of choice — the Free-Floating design remains his go-to for attack and resonance.',
            change: null,
          },
          cymbals: {
            item: 'Sabian AAX / HHX Series',
            details: '14" HHX hi-hats, 17"/18" AAX crashes, 21" AAX ride, 18" China',
            notes: 'Upgraded to Sabian HHX for hi-hats — darker, more sophisticated sound for the modern material.',
            change: CHANGE_TYPES.UPGRADE,
          },
          hardware: {
            item: 'Pearl Demon Drive Double Pedal',
            details: 'Direct drive double pedal',
            notes: 'Direct drive Demon Drive for maximum control and precision at extreme blast beat tempos.',
            change: CHANGE_TYPES.SWITCH,
          },
          sticks: {
            item: 'Vic Firth Flo Mounier Signature',
            details: 'Custom hickory spec for extreme speed',
            notes: 'Flo Mounier signature drumstick — custom weight and taper for his specific speed and control requirements.',
            change: CHANGE_TYPES.SIGNATURE,
          },
          heads: {
            item: 'Remo Emperor / Powerstroke 3',
            details: 'Consistent configuration across album cycles',
            notes: 'Proven configuration maintained through 30+ years of extreme metal performance.',
            change: null,
          },
          electronics: {
            item: 'Triggers on kick drums',
            details: 'Kick triggers for live consistency',
            notes: 'Electronic triggers ensure Cryptopsy\'s bass drum patterns cut through at live volumes.',
            change: CHANGE_TYPES.NEW,
          },
        },

        estimatedCost: {
          original: 16000,
          inflationAdjusted: 16000,
          currency: 'USD',
        },

        keyChanges: [
          'Signature Vic Firth Flo Mounier drumstick launched',
          'Pearl Demon Drive direct drive double pedal adopted',
          'Sabian HHX hi-hats added for darker, modern tone',
          'Book of Suffering series re-establishes Cryptopsy\'s brutal identity',
          'Three decades of technical death metal drumming — setup reflects lifetime of refinement',
        ],

        quote: {
          text: "After 30 years I still find something new in the music. The gear has to respond to ideas I haven't played yet — that keeps me upgrading.",
          source: 'Drumhead Magazine, 2018',
        },

        videos: [],
      },
    ],

    metaTitle: 'Flo Mounier Gear Evolution Timeline | Cryptopsy Drum Kit History',
    metaDescription: 'Explore Flo Mounier\'s complete drum gear evolution from Tama to Pearl across Cryptopsy\'s technical death metal career. None So Vile to the Book of Suffering — every era of the most influential Canadian extreme metal drummer.',
  },

  // ==========================================
  // Eloy Casagrande - Sepultura → Slipknot (2011–Present)
  // ==========================================
  'eloy-casagrande': {
    slug: 'eloy-casagrande',
    name: 'Eloy Casagrande',
    band: 'Slipknot',
    totalYearsActive: '2011-Present',
    profileImage: '/images/drummers/eloy-casagrande.webp',
    summary: 'The most compelling modern gear evolution story in metal: a Brazilian teenager who joined Sepultura at 16 and spent a decade building a world-class setup before landing the drum throne of the world\'s biggest metal band — replacing Jay Weinberg in Slipknot in 2023 and becoming the new face of a genre-defining drum role.',

    eras: [
      {
        id: 'eloy-2011-debut-sepultura',
        era: 'Sepultura Debut Era',
        years: '2011–2016',
        startYear: 2011,
        endYear: 2016,
        description: 'Eloy Casagrande joined Sepultura in 2011 at just 16 years old — one of the most remarkable early career milestones in metal history. His debut album with the band, The Mediator Between Head and Hands Must Also Be the Conductor (2013), announced a talent of rare precision and power. His Pearl endorsement began immediately, providing the professional-grade platform for his first decade of international touring.',
        albums: ['The Mediator Between Head and Hands Must Also Be the Conductor (2013)'],
        tours: ['The Mediator World Tour 2013–2014', 'South American and European dates'],
        image: null,

        gear: {
          drums: {
            item: 'Pearl Masters Premium',
            details: 'Maple shells: 22" kick, 10"/12"/14"/16" toms',
            notes: 'First Pearl endorsement — the Masters Premium maple shells provided the warm, powerful tone befitting Sepultura\'s aggressive thrash/groove metal sound.',
            change: null,
          },
          snare: {
            item: 'Pearl Free-Floating Steel 14"×6.5"',
            details: 'Free-floating shell for maximum attack',
            notes: 'Sharp, explosive snare response suited to Sepultura\'s fast, aggressive material.',
            change: null,
          },
          cymbals: {
            item: 'Meinl Cymbals',
            details: '14" hi-hats, 16"/18" crashes, 20" ride, 18" China',
            notes: 'Meinl endorsement from early in his Sepultura tenure — bright, powerful response for live metal performance.',
            change: null,
          },
          hardware: {
            item: 'Pearl Eliminator Double Pedal',
            details: 'Cam-driven double pedal for controlled aggression',
            notes: 'Pearl Eliminator to complement the Pearl kit — adjustable cam for varied speed and feel requirements.',
            change: null,
          },
          sticks: {
            item: 'Vic Firth 5B',
            details: 'Standard hickory',
            notes: 'Standard Vic Firth sticks during the early endorsement period.',
            change: null,
          },
          heads: {
            item: 'Remo Emperor',
            details: 'Double-ply on toms for durability',
            notes: 'Durability-focused configuration for intensive touring as a teenage professional.',
            change: null,
          },
        },

        estimatedCost: {
          original: 8000,
          inflationAdjusted: 12000,
          currency: 'USD',
        },

        keyChanges: [
          'Joined Sepultura at age 16 (2011) — one of metal\'s most remarkable debut signings',
          'Pearl Masters Premium endorsement begins',
          'Meinl cymbal endorsement established',
          'The Mediator (2013) announces his arrival as a world-class metal drummer',
        ],

        quote: {
          text: "Being in Sepultura at 16 was a dream. I had to grow up fast — the music and the touring demanded everything from me immediately.",
          source: 'Modern Drummer, 2014',
        },

        videos: [],
      },

      {
        id: 'eloy-2017-machine-messiah',
        era: 'Machine Messiah / Quadra Era',
        years: '2017–2022',
        startYear: 2017,
        endYear: 2022,
        description: 'The era where Eloy Casagrande fully came into his own as one of the defining drummers of modern metal. Machine Messiah (2017) showcased a dramatically more sophisticated musical palette, and Quadra (2020) — a double album concept record — is considered the high-water mark of his Sepultura work. His setup expanded and refined significantly as his compositional ambitions grew.',
        albums: ['Machine Messiah (2017)', 'SepulQuarta (2021)', 'Quadra (2020)'],
        tours: ['Machine Messiah World Tour', 'Quadra World Tour 2020–2022'],
        image: null,

        gear: {
          drums: {
            item: 'Pearl Reference Series',
            details: 'Maple/birch hybrid: 22" kick, 8"/10"/12"/14"/16" toms',
            notes: 'Upgraded to Pearl Reference — the maple/birch hybrid provided a broader tonal palette suited to Quadra\'s varied dynamics from acoustic passages to full brutality.',
            change: CHANGE_TYPES.UPGRADE,
          },
          snare: {
            item: 'Pearl Free-Floating Steel 14"×6.5"',
            details: 'Continued Free-Floating steel preference',
            notes: 'Consistent snare choice across the entire Sepultura tenure.',
            change: null,
          },
          cymbals: {
            item: 'Meinl Classics Custom / Pure Alloy',
            details: '14" hi-hats, 16"/18"/19" crashes, 21" ride, 18" China',
            notes: 'Expanded cymbal setup with Meinl Classics Custom for a broader dynamic range across Quadra\'s varied material.',
            change: CHANGE_TYPES.UPGRADE,
          },
          hardware: {
            item: 'Pearl Demon Drive Double Pedal',
            details: 'Direct drive for maximum control',
            notes: 'Switched to Demon Drive for the Machine Messiah era — direct drive delivers more precise response for the album\'s technical demands.',
            change: CHANGE_TYPES.SWITCH,
          },
          sticks: {
            item: 'Vic Firth 5A / Custom',
            details: 'Hickory sticks',
            notes: 'Refined stick choice for the increased tonal and dynamic range of the Machine Messiah / Quadra material.',
            change: null,
          },
          heads: {
            item: 'Remo Emperor / EMAD',
            details: 'Emperor on toms, EMAD on kick',
            notes: 'EMAD kick heads adopted for focused, punchy low-end attack on heavier material.',
            change: CHANGE_TYPES.UPGRADE,
          },
          electronics: {
            item: 'Roland SPD-SX sampling pad',
            details: 'Electronic samples and backing triggers',
            notes: 'Electronics integrated for Quadra\'s layered studio arrangements in the live context.',
            change: CHANGE_TYPES.NEW,
          },
        },

        estimatedCost: {
          original: 14000,
          inflationAdjusted: 16000,
          currency: 'USD',
        },

        keyChanges: [
          'Upgraded to Pearl Reference — broader tonal range for Quadra\'s dynamics',
          'Pearl Demon Drive direct drive adopted',
          'Remo EMAD kick heads integrated',
          'Roland SPD-SX added for live electronics',
          'Quadra (2020) widely recognised as career-defining achievement',
        ],

        quote: {
          text: "Quadra gave me the chance to show every side of what I can do. Aggressive, melodic, dynamic — I had to be all of it.",
          source: 'Revolver Magazine, 2020',
        },

        videos: [],
      },

      {
        id: 'eloy-2023-slipknot',
        era: 'Slipknot Era',
        years: '2023–Present',
        startYear: 2023,
        endYear: 2026,
        description: 'The most dramatic transition in recent metal drumming history. In late 2023, Eloy Casagrande joined Slipknot — replacing Jay Weinberg and stepping into one of the most high-profile drum roles in heavy music. Going from Sepultura\'s underground credibility to Slipknot\'s stadium-scale productions marked a seismic shift in his career. His current setup reflects the demands of arena-level performance with one of metal\'s biggest bands.',
        albums: ['Upcoming Slipknot studio material'],
        tours: ['Slipknot World Tour 2024', 'Knotfest appearances'],
        image: null,

        gear: {
          drums: {
            item: 'Pearl Masters Maple Complete',
            details: 'Maple shells: 22" kick, 8"/10"/12"/14"/16" toms',
            notes: 'Continued Pearl partnership into the Slipknot era — premium maple shells for the studio-quality sound required at stadium level.',
            change: CHANGE_TYPES.UPGRADE,
          },
          snare: {
            item: 'Pearl Free-Floating Steel 14"×6.5"',
            details: 'Consistent Free-Floating steel snare',
            notes: 'The snare that has followed Eloy from Sepultura to Slipknot — consistent explosive attack.',
            change: null,
          },
          cymbals: {
            item: 'Meinl Cymbals (expanded setup)',
            details: '14" hi-hats, multiple crashes, 21" ride, China, splash cymbals',
            notes: 'Expanded Meinl setup to cover the full dynamic range of Slipknot\'s diverse catalog from .5: The Gray Chapter to present.',
            change: CHANGE_TYPES.UPGRADE,
          },
          hardware: {
            item: 'Pearl Demon Drive Double Pedal',
            details: 'Direct drive — continued from Sepultura era',
            notes: 'Slipknot\'s stage productions require absolute pedal reliability — Demon Drive maintained for proven performance.',
            change: null,
          },
          sticks: {
            item: 'Vic Firth Eloy Casagrande Signature',
            details: 'Custom hickory spec for stadium performance',
            notes: 'Signature drumstick launched to coincide with the Slipknot chapter.',
            change: CHANGE_TYPES.SIGNATURE,
          },
          heads: {
            item: 'Remo Emperor / EMAD2',
            details: 'Emperor on toms, EMAD2 on kick',
            notes: 'EMAD2 for tighter, more defined low-end in Slipknot\'s dense arena mix.',
            change: CHANGE_TYPES.UPGRADE,
          },
          electronics: {
            item: 'Roland TD module + SPD-SX',
            details: 'Full hybrid electronic setup for Slipknot\'s layered production',
            notes: 'Slipknot\'s studio tracks require sophisticated electronic integration — Roland TD module for triggers, SPD-SX for samples.',
            change: CHANGE_TYPES.UPGRADE,
          },
        },

        estimatedCost: {
          original: 25000,
          inflationAdjusted: 25000,
          currency: 'USD',
        },

        keyChanges: [
          'Joined Slipknot (2023) — replaced Jay Weinberg in one of metal\'s biggest bands',
          'Vic Firth Eloy Casagrande signature sticks launched',
          'Expanded electronics for Slipknot\'s arena productions',
          'Stadium-scale performance debut at Knotfest events worldwide',
          'Brazilian teenager → Slipknot drum throne: the most remarkable career arc in modern metal',
        ],

        quote: {
          text: "Slipknot is something else entirely. The stage, the production, the catalog — I had to absorb everything and make it my own from day one.",
          source: 'Metal Hammer Interview, 2024',
        },

        videos: [],
      },
    ],

    metaTitle: 'Eloy Casagrande Gear Evolution Timeline | Sepultura to Slipknot Drum Kit History',
    metaDescription: 'Explore Eloy Casagrande\'s complete drum gear evolution from his Sepultura debut at 16 to joining Slipknot in 2023. Pearl, Meinl, Demon Drive — every era of modern metal\'s most compelling career arc.',
  },

  // ==========================================
  // Matt Halpern - Periphery (2005–Present)
  // ==========================================
  'matt-halpern': {
    slug: 'matt-halpern',
    name: 'Matt Halpern',
    band: 'Periphery',
    totalYearsActive: '2005-Present',
    profileImage: '/images/drummers/matt-halpern.webp',
    summary: 'Co-founder and drummer of Periphery, Matt Halpern helped pioneer the djent movement and modern progressive metal drumming. His gear journey traces the arc from a self-funded DIY setup in the early days of the band through a defining Mapex endorsement that produced one of the most recognisable djent kits in the world.',

    eras: [
      {
        id: 'matt-halpern-2005-debut',
        era: 'DIY / Self-Titled Debut Era',
        years: '2005–2011',
        startYear: 2005,
        endYear: 2011,
        description: 'The formative Periphery years. Matt and Misha Mansoor built the band independently, uploading demos online before signing to Sumerian Records. Halpern\'s early setup was assembled on a limited budget, focused on functionality rather than prestige — but the playing itself set a new standard for precision in progressive metal.',
        albums: ['Periphery (2010)'],
        tours: ['Early club touring / Warped Tour appearances'],
        image: null,

        gear: {
          drums: {
            item: 'Mapex Armory Series',
            details: 'Maple/poplar shells: 22" kick, 10"/12"/14"/16" toms',
            notes: 'Entry-level Mapex kit that Halpern used in the early Periphery days — the gear was modest; the technique was elite.',
            change: null,
          },
          snare: {
            item: 'Mapex Black Panther 14"×6.5"',
            details: 'Steel shell, focused attack',
            notes: 'First Black Panther snare — the crisp, dry attack suited the polyrhythmic djent style perfectly.',
            change: null,
          },
          cymbals: {
            item: 'Istanbul Agop Cymbals',
            details: '14" hi-hats, 16"/18" crashes, 20" ride',
            notes: 'Istanbul Agop Turkish handmade cymbals — dark, complex, and perfectly suited to the nuanced Periphery arrangements.',
            change: null,
          },
          hardware: {
            item: 'Tama Iron Cobra HP900 Double Pedal',
            details: 'Standard double pedal setup',
            notes: 'Iron Cobra provided the consistent, reliable double bass foundation for early Periphery live work.',
            change: null,
          },
          sticks: {
            item: 'Vic Firth 5A',
            details: 'Standard hickory',
            notes: 'Off-the-shelf sticks during the pre-endorsement era.',
            change: null,
          },
          heads: {
            item: 'Remo Emperor',
            details: 'Clear on toms, coated on snare',
            notes: 'Standard durable heads for the demanding technical material.',
            change: null,
          },
        },

        estimatedCost: {
          original: 4000,
          inflationAdjusted: 6000,
          currency: 'USD',
        },

        keyChanges: [
          'Co-founded Periphery with Misha Mansoor',
          'Built band through online demos and grassroots touring',
          'Istanbul Agop cymbals established as core tone element',
          'Signed to Sumerian Records; self-titled debut released 2010',
        ],

        quote: {
          text: "In the early days we were just kids making music we loved. The gear was whatever we could afford — the ideas were what mattered.",
          source: 'Modern Drummer Interview, 2011',
        },

        videos: [],
      },

      {
        id: 'matt-halpern-2012-periphery-ii',
        era: 'Periphery II / Mapex Black Panther Era',
        years: '2012–2014',
        startYear: 2012,
        endYear: 2014,
        description: 'Periphery II cemented the band as djent leaders. Halpern secured his Mapex endorsement and the Black Panther kit became his signature sound — warm, focused, and punchy. The combination of precise poly-rhythms and the Black Panther\'s response defined the Periphery sonic fingerprint.',
        albums: ['Periphery II: This Time It\'s Personal (2012)', 'Clear (EP, 2014)'],
        tours: ['Periphery II World Tour', 'The Juggernaut Tour (early run)'],
        image: null,

        gear: {
          drums: {
            item: 'Mapex Black Panther Series',
            details: 'Maple/walnut shells: 22" kick, 10"/12"/14"/16" toms',
            notes: 'Full Mapex Black Panther endorsement — the warm maple/walnut tone gave Periphery\'s djent attack a musical depth that pure metal kits couldn\'t match.',
            change: CHANGE_TYPES.UPGRADE,
          },
          snare: {
            item: 'Mapex Black Panther Snare 14"×6.5"',
            details: 'Maple shell, dry attack',
            notes: 'The signature Black Panther snare crack — dry, focused, and perfectly articulated for intricate groove patterns.',
            change: CHANGE_TYPES.UPGRADE,
          },
          cymbals: {
            item: 'Meinl Byzance Series',
            details: '14" hi-hats, 16"/18" crashes, 21" ride, 18" China',
            notes: 'Switched from Istanbul to Meinl Byzance — darker Turkish B20 alloy complemented the Black Panther kit\'s warm tone.',
            change: CHANGE_TYPES.SWITCH,
          },
          hardware: {
            item: 'Tama Iron Cobra HP900 Double Pedal',
            details: 'Continued Iron Cobra foundation',
            notes: 'Iron Cobra remained the trusted double pedal through this era.',
            change: null,
          },
          sticks: {
            item: 'Vic Firth 5B',
            details: 'Hickory — slightly heavier for live power',
            notes: 'Upgraded stick weight for increased projection on larger venues.',
            change: CHANGE_TYPES.UPGRADE,
          },
          heads: {
            item: 'Remo Emperor / Powerstroke 3',
            details: 'Emperor on toms, Powerstroke 3 on kick',
            notes: 'Powerstroke 3 on kick for the focused, punchy low-end central to djent.',
            change: CHANGE_TYPES.SWITCH,
          },
        },

        estimatedCost: {
          original: 8000,
          inflationAdjusted: 11000,
          currency: 'USD',
        },

        keyChanges: [
          'Full Mapex Black Panther endorsement begins',
          'Switched to Meinl Byzance cymbals',
          'Periphery II (2012) — band becomes djent leaders',
          'Clear EP (2014) showcases evolved dynamic range',
        ],

        quote: {
          text: "The Black Panther kit was a revelation. The warmth balanced the aggression of the djent thing perfectly. I wasn't just playing heavy — I was playing musical.",
          source: 'Mapex Drums Artist Interview, 2013',
        },

        videos: [],
      },

      {
        id: 'matt-halpern-2015-juggernaut',
        era: 'Juggernaut / Select Difficulty Era',
        years: '2015–2018',
        startYear: 2015,
        endYear: 2018,
        description: 'The Juggernaut double album and Select Difficulty saw Periphery refine their technical ambition to its peak. Halpern upgraded to the Mapex Saturn Pro — a premium all-maple shell design that remains his most iconic setup. Meinl Byzance Brilliant and Dark cymbals expanded his tonal palette for the more complex material.',
        albums: ['Juggernaut: Alpha (2015)', 'Juggernaut: Omega (2015)', 'Periphery III: Select Difficulty (2016)'],
        tours: ['Juggernaut World Tour', 'Select Difficulty Tour'],
        image: null,

        gear: {
          drums: {
            item: 'Mapex Saturn Pro',
            details: 'All-maple shells: 22" kick, 10"/12"/14"/16" toms',
            notes: 'Upgraded from Black Panther to Saturn Pro — the premium maple shells brought more warmth and sustain for the layered Juggernaut arrangements.',
            change: CHANGE_TYPES.UPGRADE,
          },
          snare: {
            item: 'Mapex Black Panther Snare 14"×5.5"',
            details: 'Maple shell, shallow depth for quick response',
            notes: 'Shallower snare for faster response time across Juggernaut\'s complex poly-rhythmic passages.',
            change: CHANGE_TYPES.SWITCH,
          },
          cymbals: {
            item: 'Meinl Byzance Brilliant / Dark',
            details: '14" Byzance Brilliant hi-hats, 16"/18" Byzance Dark crashes, 21" Byzance Brilliant ride',
            notes: 'Combined Byzance Brilliant and Dark series — bright hi-hats and ride contrasting with darker, drier crash tone.',
            change: CHANGE_TYPES.UPGRADE,
          },
          hardware: {
            item: 'Tama Iron Cobra HP900 Double Pedal',
            details: 'Speed Cobra beaters for precise double bass',
            notes: 'Continued Iron Cobra with Speed Cobra beaters for the technical demands of Select Difficulty material.',
            change: null,
          },
          sticks: {
            item: 'Vic Firth 5B',
            details: 'Continued hickory',
            notes: 'Consistent stick choice through the peak touring years.',
            change: null,
          },
          heads: {
            item: 'Remo Emperor / EMAD',
            details: 'Emperor on toms, EMAD on kick',
            notes: 'EMAD heads adopted for tighter, more focused kick tone on the denser Juggernaut material.',
            change: CHANGE_TYPES.SWITCH,
          },
        },

        estimatedCost: {
          original: 12000,
          inflationAdjusted: 16000,
          currency: 'USD',
        },

        keyChanges: [
          'Upgraded to Mapex Saturn Pro all-maple shells',
          'Meinl Byzance Brilliant/Dark cymbal combination established',
          'EMAD kick heads adopted for tighter low-end',
          'Juggernaut double album (2015) — career high-water mark',
          'Select Difficulty (2016) delivered Grammy nomination for Best Metal Performance',
        ],

        quote: {
          text: "The Saturn Pro gave me everything I wanted from the Black Panther but with more depth. Juggernaut needed that — the music was so layered that the kit had to breathe more.",
          source: 'Drumhead Magazine, 2015',
        },

        videos: [],
      },

      {
        id: 'matt-halpern-2019-modern',
        era: 'Hail Stan / Modern Era',
        years: '2019–Present',
        startYear: 2019,
        endYear: 2026,
        description: 'The mature Periphery era. Halpern\'s current setup represents 15+ years of incremental refinement. The Saturn Pro remains his cornerstone, now paired with a fully developed Meinl Byzance configuration and refined electronics for the most consistent live and studio sound of his career. His educational platform — including online drum lessons and clinics — has made him one of djent\'s most influential teacher-performers.',
        albums: ['Periphery IV: Hail Stan (2019)', 'Periphery V: Djent Is Not a Genre (2023)'],
        tours: ['Hail Stan World Tour', 'Periphery V Tour 2023–2024'],
        image: null,

        gear: {
          drums: {
            item: 'Mapex Saturn Pro (refined)',
            details: 'All-maple shells, custom finish: 22" kick, 10"/12"/14"/16" toms',
            notes: 'Current primary setup — refined over several album cycles with custom finish options.',
            change: null,
          },
          snare: {
            item: 'Mapex Black Panther 14"×5.5" / 14"×6.5"',
            details: 'Multiple Black Panther snares in rotation',
            notes: 'Rotates between shallow and deeper Black Panther snares depending on studio or live context.',
            change: null,
          },
          cymbals: {
            item: 'Meinl Byzance Extra Dry / Dark',
            details: '14" Byzance Extra Dry hi-hats, 16"/18" Byzance Dark crashes, 21" Byzance Brilliant ride',
            notes: 'Evolved to Extra Dry hi-hats for a drier, more articulate sound — ideal for the complex polyrhythms in current Periphery material.',
            change: CHANGE_TYPES.UPGRADE,
          },
          hardware: {
            item: 'Tama Iron Cobra HP900 Double Pedal',
            details: 'Continued long-term Iron Cobra partnership',
            notes: 'Over a decade of Iron Cobra loyalty — the pedal is as synonymous with Halpern\'s sound as the Saturn Pro.',
            change: null,
          },
          sticks: {
            item: 'Vic Firth 5B / Matt Halpern Signature',
            details: 'Signature model developed with Vic Firth',
            notes: 'Signature stick partnership reflecting his status as one of the most influential drummers in modern metal.',
            change: CHANGE_TYPES.SIGNATURE,
          },
          heads: {
            item: 'Remo Emperor / EMAD2',
            details: 'Emperor on toms, EMAD2 on kick',
            notes: 'EMAD2 for tighter, more defined kick tone in dense mix contexts.',
            change: CHANGE_TYPES.UPGRADE,
          },
          electronics: {
            item: 'Roland SPD-SX Sampling Pad',
            details: 'Click track and sample triggering for live performances',
            notes: 'Electronics added for Periphery\'s complex live productions — consistent click and backing triggers.',
            change: CHANGE_TYPES.NEW,
          },
        },

        estimatedCost: {
          original: 18000,
          inflationAdjusted: 18000,
          currency: 'USD',
        },

        keyChanges: [
          'Meinl Byzance Extra Dry hi-hats adopted',
          'Vic Firth signature stick partnership developed',
          'Roland SPD-SX integrated for live productions',
          'Periphery IV: Hail Stan (2019) shows mature compositional voice',
          'Periphery V: Djent Is Not a Genre (2023) — genre-defining statement',
          'Educational platform established as leading djent instructional resource',
        ],

        quote: {
          text: "After 15 years, the setup feels like an extension of my hands. Every choice I've made has been intentional — the Saturn, the Byzance, the Iron Cobra. They all work together.",
          source: 'Modern Drummer Interview, 2020',
        },

        videos: [],
      },
    ],

    metaTitle: 'Matt Halpern Gear Evolution Timeline | Periphery Drum Kit History',
    metaDescription: 'Explore Matt Halpern\'s complete drum gear evolution from Periphery\'s debut to Djent Is Not a Genre. Mapex Black Panther to Saturn Pro — every era of djent\'s most influential drummer.',
  },

  // ==========================================
  // Blake Richardson - Between the Buried and Me (1999–Present)
  // ==========================================
  'blake-richardson': {
    slug: 'blake-richardson',
    name: 'Blake Richardson',
    band: 'Between the Buried and Me',
    totalYearsActive: '1999-Present',
    profileImage: '/images/drummers/blake-richardson.webp',
    summary: 'Founding drummer of Between the Buried and Me, Blake Richardson is among the most technically accomplished progressive metal drummers of his generation. Renowned for his seamless polyrhythmic playing and genre-fluid vocabulary — spanning metal, jazz, and prog — his gear evolution tracks from an entry-level Tama kit through a sustained Tama Star Walnut setup that defines modern BTBAM.',

    eras: [
      {
        id: 'blake-richardson-2002-early',
        era: 'Self-Titled / Silent Circus Era',
        years: '1999–2006',
        startYear: 1999,
        endYear: 2006,
        description: 'Between the Buried and Me formed in Winston-Salem, North Carolina, in 1999. Blake Richardson\'s early setup was assembled on a limited budget as the band developed its uniquely eclectic identity — blending metal, prog, jazz, and hardcore on self-booked tours. The self-titled debut and The Silent Circus established the band\'s technical credentials.',
        albums: ['Between the Buried and Me (2002)', 'The Silent Circus (2003)', 'Alaska (2005)'],
        tours: ['Early DIY touring', 'The Silent Circus Tour', 'Alaska Tour'],
        image: null,

        gear: {
          drums: {
            item: 'Tama Rockstar Series',
            details: 'Poplar shells: 22" kick, 12"/13"/16" toms',
            notes: 'Entry-level Tama Rockstar — affordable and reliable for the relentless DIY touring schedule of early BTBAM.',
            change: null,
          },
          snare: {
            item: 'Tama Steel 14"×5.5"',
            details: 'Standard steel snare',
            notes: 'Crisp steel snare that cut through the band\'s dense, layered arrangements.',
            change: null,
          },
          cymbals: {
            item: 'Sabian B8 / AAX Series',
            details: '14" hi-hats, 16"/18" crashes, 20" ride',
            notes: 'Sabian cymbals across the early years — moving from B8 to AAX as the budget allowed.',
            change: null,
          },
          hardware: {
            item: 'Tama Iron Cobra Double Pedal',
            details: 'Double bass setup from the beginning',
            notes: 'Double bass central to BTBAM\'s rhythmic vocabulary from the earliest recordings.',
            change: null,
          },
          sticks: {
            item: 'Vic Firth 5A',
            details: 'Standard hickory',
            notes: 'Off-the-shelf sticks during the pre-endorsement period.',
            change: null,
          },
          heads: {
            item: 'Remo Ambassador',
            details: 'Clear on toms, coated on snare',
            notes: 'Standard configuration — durability over tone in the early touring context.',
            change: null,
          },
        },

        estimatedCost: {
          original: 3000,
          inflationAdjusted: 5200,
          currency: 'USD',
        },

        keyChanges: [
          'BTBAM founded in Winston-Salem, NC (1999)',
          'Self-Titled debut (2002) establishes eclectic prog-metal identity',
          'Alaska (2005) — first major critical breakthrough',
          'Relentless DIY touring builds national underground following',
        ],

        quote: {
          text: "We were playing every night. The gear just had to hold together. The music was always more important than what kit I was on.",
          source: 'Revolver Interview, 2006',
        },

        videos: [],
      },

      {
        id: 'blake-richardson-2007-colors',
        era: 'Colors Era',
        years: '2007–2009',
        startYear: 2007,
        endYear: 2009,
        description: 'Colors (2007) is Between the Buried and Me\'s defining album — a single 65-minute progressive metal suite that is widely considered one of the genre\'s greatest achievements. Blake Richardson\'s drumming on Colors is extraordinary in its dynamic range, genre vocabulary, and rhythmic precision. He upgraded to the Tama Starclassic Walnut/Birch for a richer, more resonant tone that served the album\'s ambitious arrangements.',
        albums: ['Colors (2007)'],
        tours: ['Colors World Tour 2007–2009'],
        image: null,

        gear: {
          drums: {
            item: 'Tama Starclassic Walnut/Birch',
            details: 'Walnut/birch hybrid shells: 22" kick, 10"/12"/14"/16" toms',
            notes: 'Significant upgrade for the Colors era — the Starclassic Walnut/Birch brought a warm, complex tone suited to the album\'s genre-fluid arrangements from jazz passages to full metal brutality.',
            change: CHANGE_TYPES.UPGRADE,
          },
          snare: {
            item: 'Tama Starclassic Maple 14"×6.5"',
            details: 'Maple shell, versatile attack',
            notes: 'Maple snare for broader dynamic range — needed to cover everything from whisper-quiet passages to brutal full-power playing across Colors.',
            change: CHANGE_TYPES.SWITCH,
          },
          cymbals: {
            item: 'Sabian AAX Series',
            details: '14" AAX hi-hats, 16"/18" AAX Stage crashes, 21" AAX ride',
            notes: 'Upgraded to full AAX — bright, cutting cymbals that articulated across Colors\'s wide dynamic range.',
            change: CHANGE_TYPES.UPGRADE,
          },
          hardware: {
            item: 'Tama Iron Cobra HP900 Double Pedal',
            details: 'Standard double pedal',
            notes: 'Iron Cobra continued as the reliable touring pedal.',
            change: null,
          },
          sticks: {
            item: 'Vic Firth 5B',
            details: 'Heavier hickory for projection',
            notes: 'Upgraded to 5B for more power on larger venues during the Colors tour.',
            change: CHANGE_TYPES.UPGRADE,
          },
          heads: {
            item: 'Remo Emperor',
            details: 'Double-ply on toms',
            notes: 'Emperor heads for durability on the demanding Colors World Tour.',
            change: CHANGE_TYPES.UPGRADE,
          },
        },

        estimatedCost: {
          original: 7000,
          inflationAdjusted: 10500,
          currency: 'USD',
        },

        keyChanges: [
          'Upgraded to Tama Starclassic Walnut/Birch',
          'Colors (2007) — career-defining album, widely considered a prog-metal masterpiece',
          'Colors World Tour builds BTBAM\'s international fanbase',
          'Expanded cymbal configuration for Colors\'s dynamic demands',
        ],

        quote: {
          text: "Colors pushed me to think about dynamics in a way no album had before. I had to be a jazz drummer, a death metal drummer, and everything in between — sometimes in the same bar.",
          source: 'Modern Drummer Interview, 2008',
        },

        videos: [],
      },

      {
        id: 'blake-richardson-2009-great-misdirect',
        era: 'The Great Misdirect / Parallax Era',
        years: '2009–2014',
        startYear: 2009,
        endYear: 2014,
        description: 'The Great Misdirect (2009) and the Parallax concept albums (2011–2012) pushed BTBAM\'s progressive ambitions further. Richardson\'s drumming became more compositionally involved, and the band\'s international stature demanded a setup that could handle both intimate and arena-scale performances. His transition to Meinl Byzance cymbals began during this era.',
        albums: ['The Great Misdirect (2009)', 'The Parallax: Hypersleep Dialogues (2011)', 'The Parallax II: Future Sequence (2012)'],
        tours: ['The Great Misdirect Tour', 'The Parallax Tour', 'Progressive Nation at Sea'],
        image: null,

        gear: {
          drums: {
            item: 'Tama Starclassic Walnut/Birch (expanded)',
            details: 'Walnut/birch: 22" kick, 8"/10"/12"/14"/16" toms',
            notes: 'Added 8" tom for higher tonal range in the increasingly complex Parallax arrangements.',
            change: CHANGE_TYPES.UPGRADE,
          },
          snare: {
            item: 'Tama Starclassic Maple 14"×6.5"',
            details: 'Continued maple snare preference',
            notes: 'Consistent snare across multiple album cycles.',
            change: null,
          },
          cymbals: {
            item: 'Meinl Byzance Series',
            details: '14" Byzance hi-hats, 16"/18"/19" crashes, 21" ride, 18" China',
            notes: 'Switched from Sabian to Meinl Byzance — darker Turkish B20 alloy provided the complex, nuanced cymbal tone that suited the Parallax\'s prog arrangements.',
            change: CHANGE_TYPES.SWITCH,
          },
          hardware: {
            item: 'Tama Iron Cobra HP900 Double Pedal',
            details: 'Continued Iron Cobra partnership',
            notes: 'Reliable double pedal maintained across the Parallax touring cycle.',
            change: null,
          },
          sticks: {
            item: 'Vic Firth 5B',
            details: 'Continued hickory',
            notes: 'Consistent stick preference maintained.',
            change: null,
          },
          heads: {
            item: 'Remo Emperor / Powerstroke 3',
            details: 'Emperor on toms, Powerstroke 3 on kick',
            notes: 'Powerstroke 3 kick heads for more focused low-end punch.',
            change: CHANGE_TYPES.SWITCH,
          },
        },

        estimatedCost: {
          original: 9000,
          inflationAdjusted: 13000,
          currency: 'USD',
        },

        keyChanges: [
          'Switched to Meinl Byzance cymbals',
          'Added 8" tom for expanded tonal range',
          'The Great Misdirect (2009) — ambitious concept album raises critical profile further',
          'Parallax II: Future Sequence (2012) — band\'s most technically demanding release',
        ],

        quote: {
          text: "The Byzance cymbals opened up something in my playing. They respond differently — you have to listen more. And that listening made me a better drummer.",
          source: 'Drum! Magazine, 2012',
        },

        videos: [],
      },

      {
        id: 'blake-richardson-2015-coma-ecliptic',
        era: 'Coma Ecliptic / Automata / Colors II Era',
        years: '2015–Present',
        startYear: 2015,
        endYear: 2026,
        description: 'The modern BTBAM era. With Coma Ecliptic (2015), Automata I & II (2018), and Colors II (2021), Richardson and the band reached their most mature and compositionally sophisticated work. His upgrade to the Tama Star Walnut — the premium all-walnut flagship kit — gave him the warmest, most resonant tone of his career. His current setup is the most refined of any era.',
        albums: ['Coma Ecliptic (2015)', 'Automata I (2018)', 'Automata II (2018)', 'Colors II (2021)'],
        tours: ['Coma Ecliptic Tour', 'Automata Tour 2018', 'Colors II Tour 2021–2022'],
        image: null,

        gear: {
          drums: {
            item: 'Tama Star Walnut',
            details: 'All-walnut shells: 22" kick, 8"/10"/12"/14"/16" toms',
            notes: 'Upgraded to Tama\'s premium Star Walnut — the all-walnut shell delivers the warmest, most musically complex tone in the Tama catalog, perfectly matching BTBAM\'s mature prog-metal sound.',
            change: CHANGE_TYPES.UPGRADE,
          },
          snare: {
            item: 'Tama Star Walnut Snare 14"×6.5"',
            details: 'All-walnut shell, warm and focused',
            notes: 'Matching walnut snare for the warmest, most cohesive kit sound of his career.',
            change: CHANGE_TYPES.UPGRADE,
          },
          cymbals: {
            item: 'Meinl Byzance Jazz / Dark Series',
            details: '14" Byzance Jazz hi-hats, 16"/18" Byzance Dark crashes, 22" Byzance Jazz ride',
            notes: 'Evolved toward Byzance Jazz and Dark variants — darker, more complex cymbal voice that reflects his matured musical sensibility across Colors II and Automata.',
            change: CHANGE_TYPES.UPGRADE,
          },
          hardware: {
            item: 'Tama Speed Cobra HP910 Double Pedal',
            details: 'Lighter, faster cam-driven double pedal',
            notes: 'Switched to Speed Cobra for more responsive action suited to the nuanced footwork in Colors II material.',
            change: CHANGE_TYPES.SWITCH,
          },
          sticks: {
            item: 'Vic Firth Blake Richardson Signature',
            details: 'Custom hickory model',
            notes: 'Signature stick developed to reflect his status as one of the most distinctive drummers in progressive metal.',
            change: CHANGE_TYPES.SIGNATURE,
          },
          heads: {
            item: 'Remo Emperor / EMAD',
            details: 'Emperor on toms, EMAD on kick',
            notes: 'EMAD for a tighter, more focused kick fundamental in dense prog arrangements.',
            change: CHANGE_TYPES.SWITCH,
          },
          electronics: {
            item: 'Roland SPD-SX Sampling Pad',
            details: 'For samples and atmospheric triggers in live context',
            notes: 'Electronics integrated for Colors II\'s layered studio production in the live setting.',
            change: CHANGE_TYPES.NEW,
          },
        },

        estimatedCost: {
          original: 22000,
          inflationAdjusted: 22000,
          currency: 'USD',
        },

        keyChanges: [
          'Upgraded to Tama Star Walnut — premium all-walnut flagship kit',
          'Meinl Byzance Jazz/Dark cymbals adopted for mature tonal palette',
          'Vic Firth Blake Richardson signature sticks launched',
          'Tama Speed Cobra pedal switch',
          'Coma Ecliptic (2015) and Colors II (2021) showcase peak compositional maturity',
          'Automata I & II (2018) — ambitious concept album in two parts',
        ],

        quote: {
          text: "The Star Walnut is the most musical kit I've ever played. Everything that comes out of it has this natural warmth. For Colors II, that was exactly what the music needed.",
          source: 'Tama Drums Artist Profile, 2022',
        },

        videos: [],
      },
    ],

    metaTitle: 'Blake Richardson Gear Evolution Timeline | Between the Buried and Me Drum Kit History',
    metaDescription: 'Explore Blake Richardson\'s complete drum gear evolution from early BTBAM through Colors to the Star Walnut era. Tama Rockstar to Star Walnut — every kit, every album documented.',
  },

  // ==========================================
  // Derek Roddy - Hate Eternal / Nile / Various (1994–Present)
  // ==========================================
  'derek-roddy': {
    slug: 'derek-roddy',
    name: 'Derek Roddy',
    band: 'Hate Eternal',
    totalYearsActive: '1994-Present',
    profileImage: '/images/drummers/derek-roddy.webp',
    summary: 'A foundational figure in extreme metal drumming, Derek Roddy helped pioneer the blast beat as a musical language rather than a pure speed exercise. Active in Hate Eternal, Nile, and Council of the Fallen, he is also one of the most respected drumming educators in the genre — his instructional content on technique and practice methodology has influenced a generation of extreme metal drummers worldwide.',

    eras: [
      {
        id: 'derek-roddy-1994-early',
        era: 'Early Career / Council of the Fallen Era',
        years: '1994–2002',
        startYear: 1994,
        endYear: 2002,
        description: 'Derek Roddy built his reputation in the Florida death metal underground through the mid-to-late 1990s, developing the technical precision and conceptual approach to blast beats that would define his career. His Pearl Masters setup during this era became the foundation for his signature sound — tight, punchy, and unrelentingly fast.',
        albums: ['Council of the Fallen: Revealing Damnation (2002)', 'Various demos'],
        tours: ['Florida death metal circuit'],
        image: null,

        gear: {
          drums: {
            item: 'Pearl Masters Professional',
            details: 'Maple shells: 22" kick, 10"/12"/14"/16" toms',
            notes: 'Pearl Masters was the choice of Florida death metal — durable maple shells capable of withstanding extreme blast beat tempos night after night.',
            change: null,
          },
          snare: {
            item: 'Pearl Free-Floating Steel 14"×5.5"',
            details: 'Steel shell, tight response',
            notes: 'Pearl Free-Floating steel snare for precise, explosive attack in extreme metal context.',
            change: null,
          },
          cymbals: {
            item: 'Sabian B8 / AAX Series',
            details: '14" hi-hats, 16"/18" crashes, 20" ride',
            notes: 'Sabian cymbals across the early years — loud, durable, and available.',
            change: null,
          },
          hardware: {
            item: 'Pearl Eliminator Double Pedal',
            details: 'Cam-driven double pedal for blast beat precision',
            notes: 'Pearl Eliminator provided the fast, responsive platform for Roddy\'s developing extreme speed technique.',
            change: null,
          },
          sticks: {
            item: 'Vic Firth 5B',
            details: 'Standard hickory',
            notes: 'Heavier 5B sticks for power and durability at extreme metal tempos.',
            change: null,
          },
          heads: {
            item: 'Remo Emperor',
            details: 'Double-ply on toms for durability',
            notes: 'Durable Emperor heads to withstand the demands of death metal playing.',
            change: null,
          },
        },

        estimatedCost: {
          original: 5000,
          inflationAdjusted: 9000,
          currency: 'USD',
        },

        keyChanges: [
          'Built technical foundation in Florida death metal underground',
          'Developed conceptual approach to blast beats as musical phrasing',
          'Pearl Masters became foundational kit for early career',
          'Council of the Fallen debut album (2002) — introduces Roddy to wider audience',
        ],

        quote: {
          text: "For me, blast beats were never just about speed. Every note has to mean something. The conceptual side came first — the technique followed.",
          source: 'Drumhead Magazine Interview, 2003',
        },

        videos: [],
      },

      {
        id: 'derek-roddy-2002-hate-eternal',
        era: 'Hate Eternal / Nile Era',
        years: '2002–2008',
        startYear: 2002,
        endYear: 2008,
        description: 'Derek Roddy\'s highest-profile period. Playing with Hate Eternal (Erik Rutan\'s band after Morbid Angel) and contributing to Nile recordings placed him at the centre of extreme metal drumming. His Pearl Reference upgrade gave him a more resonant, professional platform that matched the increasingly high production values of these records. His Zildjian K Custom cymbal transition also defined his sound across this era.',
        albums: ['Hate Eternal: I, Monarch (2005)', 'Hate Eternal: Fury & Flames (2008)', 'Nile: Annihilation of the Wicked (2005)'],
        tours: ['Hate Eternal World Tour', 'Summer Slaughter 2006', 'Various extreme metal festival dates'],
        image: null,

        gear: {
          drums: {
            item: 'Pearl Reference Series',
            details: 'Maple/birch hybrid shells: 22" kick, 10"/12"/14"/16" toms',
            notes: 'Upgraded to Pearl Reference — the maple/birch hybrid delivered a more complex tone for the nuanced death metal arrangements on I, Monarch and Fury & Flames.',
            change: CHANGE_TYPES.UPGRADE,
          },
          snare: {
            item: 'Pearl Free-Floating Steel 14"×6.5"',
            details: 'Deeper shell for more crack and projection',
            notes: 'Increased depth for more explosive attack cutting through Hate Eternal\'s dense guitar wall.',
            change: CHANGE_TYPES.UPGRADE,
          },
          cymbals: {
            item: 'Zildjian K Custom Series',
            details: '14" K Custom Dark hi-hats, 17"/18" K Custom crashes, 21" K Custom ride',
            notes: 'Switched from Sabian to Zildjian K Custom — darker, drier tone that suited Hate Eternal\'s low-end focused production.',
            change: CHANGE_TYPES.SWITCH,
          },
          hardware: {
            item: 'Pearl Demon Drive Double Pedal',
            details: 'Direct drive for maximum control at extreme tempos',
            notes: 'Switched to Demon Drive direct drive — more precise response at the extreme blast beat tempos required on I, Monarch.',
            change: CHANGE_TYPES.SWITCH,
          },
          sticks: {
            item: 'Vic Firth 5B',
            details: 'Continued heavier hickory preference',
            notes: 'Consistent stick choice through the Hate Eternal years.',
            change: null,
          },
          heads: {
            item: 'Remo Emperor / Powerstroke 3',
            details: 'Emperor on toms, Powerstroke 3 on kick',
            notes: 'Powerstroke 3 on kick for focused, punchy attack at extreme tempos.',
            change: CHANGE_TYPES.SWITCH,
          },
          electronics: {
            item: 'ddrum Acoustic Pro Triggers',
            details: 'Kick triggers for live consistency',
            notes: 'Triggers on kick drum for consistent attack at extreme live volumes — essential for Hate Eternal\'s touring context.',
            change: CHANGE_TYPES.NEW,
          },
        },

        estimatedCost: {
          original: 10000,
          inflationAdjusted: 17000,
          currency: 'USD',
        },

        keyChanges: [
          'Joined Hate Eternal — highest-profile band to date',
          'Upgraded to Pearl Reference for richer tone',
          'Switched to Zildjian K Custom Dark cymbals',
          'Pearl Demon Drive direct drive adopted',
          'ddrum triggers integrated for live consistency',
          'Hate Eternal I, Monarch (2005) — considered one of death metal\'s best recordings',
        ],

        quote: {
          text: "Hate Eternal with Erik Rutan was the most demanding situation I'd ever been in. The music required absolute precision at extreme speeds. The Pearl Reference gave me the tone and power I needed.",
          source: 'Modern Drummer Interview, 2006',
        },

        videos: [],
      },

      {
        id: 'derek-roddy-2008-dw',
        era: 'DW / Independent Era',
        years: '2008–2018',
        startYear: 2008,
        endYear: 2018,
        description: 'Roddy\'s independent era. After his most high-profile band commitments, he continued recording and touring with various projects while dramatically expanding his educational output. His switch to DW Collector\'s Series marked a significant tonal shift toward the warm, resonant maple sound that DW is known for. His instructional series — including "The Progression of Rhythm" DVD series — became foundational resources for aspiring extreme metal drummers worldwide.',
        albums: ['Various session and project recordings'],
        tours: ['Drum clinics worldwide', 'Various extreme metal dates'],
        image: null,

        gear: {
          drums: {
            item: 'DW Collector\'s Series',
            details: 'Maple shells: 22" kick, 8"/10"/12"/14"/16" toms',
            notes: 'Major switch to DW Collector\'s Series — the warm, resonant maple shells offered a musical depth that complemented his evolved, more compositionally sophisticated approach to extreme metal.',
            change: CHANGE_TYPES.SWITCH,
          },
          snare: {
            item: 'DW Edge Series 14"×6.5"',
            details: 'Maple shell with DW Edge design',
            notes: 'DW snare to match the new endorsement — warm, powerful attack with excellent projection.',
            change: CHANGE_TYPES.SWITCH,
          },
          cymbals: {
            item: 'Meinl Classics Custom Series',
            details: '14" Classics Custom Dark hi-hats, 16"/18" Classics Custom Dark crashes, 21" ride',
            notes: 'Switched from Zildjian to Meinl Classics Custom — darker, drier tone suited to his drum clinic and session work contexts.',
            change: CHANGE_TYPES.SWITCH,
          },
          hardware: {
            item: 'DW 9000 Double Pedal',
            details: 'Twin-chain drive to match DW kit',
            notes: 'DW 9000 adopted alongside DW endorsement — dual chain drive for responsive, consistent double bass technique demonstration.',
            change: CHANGE_TYPES.SWITCH,
          },
          sticks: {
            item: 'Vic Firth Derek Roddy Signature',
            details: 'Custom hickory model for extreme metal application',
            notes: 'Signature sticks reflecting his status as one of extreme metal\'s leading educators and performers.',
            change: CHANGE_TYPES.SIGNATURE,
          },
          heads: {
            item: 'Evans G2 / EMAD',
            details: 'G2 on toms, EMAD on kick',
            notes: 'Switched to Evans for the DW era — G2 and EMAD provide a more focused, punchy sound suited to clinic and recording contexts.',
            change: CHANGE_TYPES.SWITCH,
          },
          electronics: {
            item: 'ddrum Acoustic Pro Triggers',
            details: 'Continued trigger use for clinic demonstrations',
            notes: 'Triggers maintained for demonstrating triggered vs. acoustic sounds in educational settings.',
            change: null,
          },
        },

        estimatedCost: {
          original: 15000,
          inflationAdjusted: 20000,
          currency: 'USD',
        },

        keyChanges: [
          'Switched to DW Collector\'s Series — warmer, more resonant tone',
          'Meinl Classics Custom Dark cymbals adopted',
          'DW 9000 double pedal switch',
          'Vic Firth Derek Roddy signature sticks launched',
          '"The Progression of Rhythm" instructional series becomes definitive resource for extreme metal technique',
          'Worldwide drum clinic circuit — leading educator in death metal drumming',
        ],

        quote: {
          text: "DW gave me a kit that could serve everything I do — sessions, clinics, live shows. The maple speaks. And when you're teaching people about drumming, the instrument has to communicate.",
          source: 'DW Drums Artist Profile, 2010',
        },

        videos: [],
      },

      {
        id: 'derek-roddy-2018-modern',
        era: 'Modern / Teaching Era',
        years: '2018–Present',
        startYear: 2018,
        endYear: 2026,
        description: 'Derek Roddy\'s modern era. Now one of extreme metal\'s most respected elder statesmen and educators, his current setup reflects decades of refinement. He continues performing with various death metal projects while his educational legacy — instructional videos, online courses, and drum clinics — reaches more students than ever. His Meinl Classics Custom configuration has become the most recognised element of his modern sonic identity.',
        albums: ['Various session and collaborative recordings'],
        tours: ['Global drum clinic circuit', 'Extreme metal festival appearances'],
        image: null,

        gear: {
          drums: {
            item: 'DW Collector\'s Series (refined)',
            details: 'Custom finish maple: 22" kick, 8"/10"/12"/14"/16" toms',
            notes: 'Refined DW configuration — same platform, now with custom finish options developed through years of partnership.',
            change: null,
          },
          snare: {
            item: 'DW Collector\'s Series Snare 14"×6.5"',
            details: 'Maple shell, refined production model',
            notes: 'Current primary snare — warm, powerful, and consistent across all performance contexts.',
            change: null,
          },
          cymbals: {
            item: 'Meinl Classics Custom Dark / Extra Dry',
            details: '14" Classics Custom Extra Dry hi-hats, 16"/18" Classics Custom Dark crashes, 21" ride',
            notes: 'Evolved to Extra Dry hi-hats for drier, more articulate attack in the clinic and studio context.',
            change: CHANGE_TYPES.UPGRADE,
          },
          hardware: {
            item: 'DW 9000 Double Pedal',
            details: 'Continued DW 9000 partnership',
            notes: 'Long-term DW 9000 loyalty — precise, consistent double bass control for demonstration and performance.',
            change: null,
          },
          sticks: {
            item: 'Vic Firth Derek Roddy Signature',
            details: 'Refined current production model',
            notes: 'Updated signature model refined for both performance and educational demonstration.',
            change: null,
          },
          heads: {
            item: 'Evans G2 / EMAD2',
            details: 'G2 on toms, EMAD2 on kick',
            notes: 'EMAD2 for tighter, more defined kick tone across clinic and recording contexts.',
            change: CHANGE_TYPES.UPGRADE,
          },
          electronics: {
            item: 'Roland SPD-SX / ddrum Triggers',
            details: 'Sampling pad and kick triggers',
            notes: 'Electronics used for educational demonstrations of hybrid drumming and trigger comparison in clinic settings.',
            change: CHANGE_TYPES.UPGRADE,
          },
        },

        estimatedCost: {
          original: 18000,
          inflationAdjusted: 18000,
          currency: 'USD',
        },

        keyChanges: [
          'Meinl Classics Custom Extra Dry hi-hats adopted',
          'Evans EMAD2 kick heads for tighter low-end',
          'Global clinic and online education reach expands year over year',
          'Recognised as one of death metal\'s most influential educator-performers',
          'Setup serves dual purpose: performance and technical demonstration',
        ],

        quote: {
          text: "After 30 years of playing, every piece of gear I own has a reason for being there. I've stripped away everything that wasn't serving the music or the teaching. What's left is exactly what I need.",
          source: 'Drumhead Magazine Interview, 2022',
        },

        videos: [],
      },
    ],

    metaTitle: 'Derek Roddy Gear Evolution Timeline | Hate Eternal Drum Kit History',
    metaDescription: 'Explore Derek Roddy\'s complete drum gear evolution from Florida death metal to the DW era. Pearl Masters to DW Collector\'s Series — the blast beat pioneer\'s complete gear timeline.',
  },

  // ==========================================
  // Ben Koller - Converge (1990–Present)
  // ==========================================
  'ben-koller': {
    slug: 'ben-koller',
    name: 'Ben Koller',
    band: 'Converge',
    totalYearsActive: '1990-Present',
    profileImage: '/images/drummers/ben-koller.webp',
    summary: 'Ben Koller\'s evolution is the story of how raw hardcore chaos becomes controlled precision. From DIY club kits built for speed and aggression in 1990s Massachusetts to the polished Tama setup behind Converge\'s most ambitious records, Koller transformed chaotic energy into one of modern heavy music\'s most distinctive and influential drum voices — channeling the breakneck tempos of Jane Doe into the layered complexity of Axe to Fall and beyond.',

    eras: [
      {
        id: 'ben-koller-1990-early-hardcore',
        era: 'Early Hardcore / DIY Formation Era',
        years: '1990–2000',
        startYear: 1990,
        endYear: 2000,
        description: 'Ben Koller co-founded Converge in Salem, Massachusetts in 1990 as a high-school hardcore band. Through the 1990s the band released a series of raw, self-produced records on independent labels — Petitioning the Empty Sky (1996), When Forever Comes Crashing (1998) — that established Converge\'s reputation for chaotic intensity. Koller played on whatever kit was available: secondhand Pearl and Tama kits acquired through trades and local music stores, held together by determination and urgency. The sound was appropriately brutal.',
        albums: ['Petitioning the Empty Sky (1996)', 'When Forever Comes Crashing (1998)', 'The Poacher Diaries (1998)'],
        tours: ['New England hardcore circuit', 'DIY Northeast US tours'],
        image: null,

        gear: {
          drums: {
            item: 'Various secondhand Pearl / Tama kits',
            details: '20"–22" kick, standard tom configuration',
            notes: 'DIY-era setups — Koller used whatever was available, with an emphasis on durability over tone. Pearl and Tama were the most commonly sourced brands on the used market of the era.',
            change: null,
          },
          snare: {
            item: 'Pearl Steel 14"×5"',
            details: 'Steel shell, tight crack',
            notes: 'Steel snare for maximum punch in underpowered PA environments — the sharp attack cut through dense hardcore guitar walls in small venues.',
            change: null,
          },
          cymbals: {
            item: 'Zildjian ZBT / Sabian B8 Series',
            details: '13"–14" hi-hats, 16"/18" crashes, 20" ride',
            notes: 'Entry-level brass cymbals — loud, durable, and affordable for a band touring on no budget. Replaced frequently as a result of aggressive playing.',
            change: null,
          },
          hardware: {
            item: 'Pearl P-100 Single / Basic Double Pedal',
            details: 'Budget chain-drive double pedal',
            notes: 'Basic double pedal hardware — Koller\'s early playing emphasised raw speed and aggression over refined technique, demanding a pedal that could take punishment.',
            change: null,
          },
          sticks: {
            item: 'Vic Firth 5B',
            details: 'Standard hickory',
            notes: 'Heavier 5B sticks for the power-forward demands of hardcore drumming — survival over subtlety.',
            change: null,
          },
          heads: {
            item: 'Remo Ambassador',
            details: 'Single-ply batter heads',
            notes: 'Standard Ambassador heads — replaced frequently due to the physicality of hardcore performance.',
            change: null,
          },
        },

        estimatedCost: {
          original: 1500,
          inflationAdjusted: 2800,
          currency: 'USD',
        },

        keyChanges: [
          'Converge formed in Salem, Massachusetts (1990)',
          'DIY recording approach on independent labels',
          'Petitioning the Empty Sky (1996) and When Forever Comes Crashing (1998) establish Converge in underground',
          'Raw, urgency-driven playing style developed under real-world constraint',
        ],

        quote: {
          text: "We were always just trying to get louder and faster. Whatever kit I could get my hands on, that was the kit.",
          source: 'Revolver Magazine Interview, 2012',
        },

        videos: [],
      },

      {
        id: 'ben-koller-2001-jane-doe',
        era: 'Jane Doe Breakthrough Era',
        years: '2001–2008',
        startYear: 2001,
        endYear: 2008,
        description: 'Jane Doe (2001, Hydra Head Records) was the record that redefined what hardcore could be — and Ben Koller\'s drumming was central to its impact. The album\'s chaotic, jazz-influenced rhythmic structures demanded a step up in both setup and technique. Koller moved to a more stable Tama Rockstar / Imperialstar configuration, and the increased production quality of Jane Doe and its follow-ups (You Fail Me, No Heroes) amplified the power and precision of his upgraded setup. The stripped-down, direct sound of You Fail Me and No Heroes reflected deliberate restraint in gear as well as composition.',
        albums: ['Jane Doe (2001)', 'You Fail Me (2004)', 'No Heroes (2006)'],
        tours: ['Hydra Head Records touring circuit', 'Metallic hardcore underground tours', 'Various US and European hardcore dates'],
        image: null,

        gear: {
          drums: {
            item: 'Tama Imperialstar / Rockstar Series',
            details: 'Maple/poplar shells: 22" kick, 10"/12"/14"/16" toms',
            notes: 'First consistent endorsement-adjacent setup — Tama Imperialstar and Rockstar kits provided the durable, reliable platform Jane Doe\'s intense recording sessions demanded. The maple-poplar hybrid gave a punchy mid-forward tone suited to Kurt Ballou\'s dense production style.',
            change: CHANGE_TYPES.UPGRADE,
          },
          snare: {
            item: 'Tama Steel 14"×5.5"',
            details: 'Steel shell, increased depth for more body',
            notes: 'More depth in the snare shell improved projection and body for studio recordings that would receive wider distribution than the raw DIY-era output.',
            change: CHANGE_TYPES.UPGRADE,
          },
          cymbals: {
            item: 'Zildjian A Series',
            details: '14" A New Beat hi-hats, 16"/17" crashes, 20" ride',
            notes: 'Moved from budget brass to Zildjian A Series — brighter, more defined response that suited the increasingly precise rhythmic structures of Jane Doe\'s compositions.',
            change: CHANGE_TYPES.UPGRADE,
          },
          hardware: {
            item: 'Tama Iron Cobra Double Pedal',
            details: 'Power Glide cam, chain drive',
            notes: 'The Iron Cobra was a significant upgrade — Power Glide cam\'s smooth response gave Koller improved control at the extreme tempos Jane Doe demanded.',
            change: CHANGE_TYPES.SWITCH,
          },
          sticks: {
            item: 'Vic Firth 5B',
            details: 'Continued heavier hickory choice',
            notes: 'Consistent stick preference through the breakthrough years.',
            change: null,
          },
          heads: {
            item: 'Remo Emperor / Powerstroke 3',
            details: 'Emperor on toms, Powerstroke 3 on kick',
            notes: 'Emperor\'s double-ply durability sustained by the demands of You Fail Me and No Heroes\' live performances. Powerstroke 3 on kick for focused, punchy attack.',
            change: CHANGE_TYPES.UPGRADE,
          },
        },

        estimatedCost: {
          original: 4500,
          inflationAdjusted: 7000,
          currency: 'USD',
        },

        keyChanges: [
          'Jane Doe (2001) — considered one of the defining albums of metallic hardcore',
          'Tama Imperialstar adopted as first consistent platform',
          'Tama Iron Cobra Power Glide double pedal for improved extreme-tempo control',
          'Zildjian A Series replaces budget brass',
          'You Fail Me (2004) and No Heroes (2006) — stripped, direct production reflects deliberate restraint',
        ],

        quote: {
          text: "Jane Doe was us figuring out how to be as extreme as possible while still making it music. The drumming had to hold that chaos together.",
          source: 'Decibel Magazine, 2011',
        },

        videos: [],
      },

      {
        id: 'ben-koller-2009-axe-to-fall',
        era: 'Axe to Fall / Modern Complexity Era',
        years: '2009–Present',
        startYear: 2009,
        endYear: 2026,
        description: 'Axe to Fall (2009, Epitaph) marked Converge\'s most ambitious production to date — a record featuring guest performances from members of Neurosis, Genghis Tron, Disfear, and Nails. The musical complexity demanded a corresponding step up in Koller\'s setup. His current Tama configuration — refined across All We Love We Leave Behind (2012), The Dusk in Us (2017), and Bloodmoon: I (2021) — balances the raw aggression of the early years with the precision his increasing compositional sophistication requires. Ben Koller is now widely recognised as one of the most influential drummers in modern heavy music.',
        albums: ['Axe to Fall (2009)', 'All We Love We Leave Behind (2012)', 'The Dusk in Us (2017)', 'Bloodmoon: I (2021)'],
        tours: ['Epitaph Records touring circuit', 'Converge headline and festival tours worldwide', 'Bloodmoon touring cycle'],
        image: null,

        gear: {
          drums: {
            item: 'Tama Starclassic Maple',
            details: 'Maple shells: 22" kick, 10"/12"/14"/16" toms',
            notes: 'The Tama Starclassic Maple became Koller\'s consistent modern platform — premium maple shells deliver warmth and attack for both heavy touring and studio recording. The kit\'s resonance suits Kurt Ballou\'s increasingly rich production approach.',
            change: CHANGE_TYPES.UPGRADE,
          },
          snare: {
            item: 'Tama Lars Ulrich Signature Snare / Custom Steel 14"×6.5"',
            details: 'Deeper steel or aluminium shell for punching crack',
            notes: 'Deeper snare shell for maximum punch and projection — Koller\'s snare is central to Converge\'s live sound, requiring explosive attack across varied acoustic environments.',
            change: CHANGE_TYPES.UPGRADE,
          },
          cymbals: {
            item: 'Zildjian A Custom / K Custom Series',
            details: '14" A Custom hi-hats, 16"/17"/18" crashes, 21" ride',
            notes: 'Expanded cymbal setup incorporating both A Custom brightness and K Custom warmth — greater tonal range to serve the increasing dynamic spectrum of modern Converge compositions.',
            change: CHANGE_TYPES.UPGRADE,
          },
          hardware: {
            item: 'Tama Iron Cobra 900 Double Pedal',
            details: 'Roller Glide cam, improved response',
            notes: 'Iron Cobra 900 upgrade from the earlier Power Glide model — improved spring tension adjustability and more consistent response at Converge\'s demanding live tempos.',
            change: CHANGE_TYPES.UPGRADE,
          },
          sticks: {
            item: 'Vic Firth 5B / Custom',
            details: 'Consistent heavier hickory preference',
            notes: 'Koller has maintained the 5B preference across his career — the heavier spec handles the physical demands of hardcore drumming without sacrificing control.',
            change: null,
          },
          heads: {
            item: 'Evans G2 / EMAD',
            details: 'G2 on toms, EMAD on kick',
            notes: 'Evans heads for the modern era — G2 on toms for warm attack with defined transient, EMAD on kick for focused, punchy low-end suited to dense metallic hardcore mixes.',
            change: CHANGE_TYPES.SWITCH,
          },
        },

        estimatedCost: {
          original: 12000,
          inflationAdjusted: 16000,
          currency: 'USD',
        },

        keyChanges: [
          'Tama Starclassic Maple adopted — most refined platform of career',
          'Evans G2/EMAD heads replace Remo',
          'Tama Iron Cobra 900 upgrade for improved live consistency',
          'Axe to Fall (2009) — Converge\'s most ambitious record; Epitaph debut',
          'All We Love We Leave Behind (2012) and The Dusk in Us (2017) cement Koller\'s status as modern hardcore\'s definitive drummer',
          'Bloodmoon: I (2021) — collaborative project with Chelsea Wolfe',
        ],

        quote: {
          text: "Every album we make, I try to bring something new to the drums. Not just faster or harder — smarter. Axe to Fall taught me that complexity and rawness can coexist.",
          source: 'Modern Drummer, 2013',
        },

        videos: [],
      },
    ],

    metaTitle: 'Ben Koller Gear Evolution Timeline | Converge Drum Kit History',
    metaDescription: 'Explore Ben Koller\'s complete drum gear evolution from DIY hardcore beginnings to the Tama Starclassic era. The full Converge drum kit history across Jane Doe, Axe to Fall, and beyond.',
  },

  // ==========================================
  // Pete Sandoval - Morbid Angel (1988–2011)
  // ==========================================
  'pete-sandoval': {
    slug: 'pete-sandoval',
    name: 'Pete Sandoval',
    band: 'Morbid Angel',
    totalYearsActive: '1988-2011',
    profileImage: '/images/drummers/pete-sandoval.webp',
    summary: 'Pete Sandoval\'s evolution is essentially the history of extreme metal drumming speed. From the proto-death metal rehearsals that preceded Altars of Madness to the Covenant speed peak that established him as the fastest drummer in death metal, Sandoval\'s gear progression tracks the growth of a physical instrument pushed to its biological limits. His story ends with human cost: multiple back surgeries forced his retirement in 2011, making his arc one of the most significant — and poignant — in the history of extreme music.',

    eras: [
      {
        id: 'pete-sandoval-1988-early-morbid',
        era: 'Early Morbid Angel / Altars of Madness Era',
        years: '1988–1991',
        startYear: 1988,
        endYear: 1991,
        description: 'Pete Sandoval joined Morbid Angel in 1988, replacing Mike Browning ahead of what would become one of the most important debut albums in death metal history: Altars of Madness (1989, Earache). Sandoval arrived with a natural gift for extreme speed — blast beats at tempos that no drummer in the genre had previously achieved on record. His early setup was functional rather than refined, prioritising raw power and the ability to sustain extreme tempos over tonal nuance. Altars of Madness defined death metal drumming for an entire generation.',
        albums: ['Altars of Madness (1989)', 'Abominations of Desolation (recorded 1986, released 1991)'],
        tours: ['Earache Records European tour 1989', 'North American death metal circuit'],
        image: null,

        gear: {
          drums: {
            item: 'Pearl Export / Masters Series',
            details: 'Maple shells: 22" kick, 10"/12"/14" toms',
            notes: 'Pearl was the standard for Florida death metal drummers of the era — durable, reliable, and capable of withstanding the physical demands of blast beat playing at extreme tempos. Sandoval\'s setup was stripped to essential drums for maximum speed.',
            change: null,
          },
          snare: {
            item: 'Pearl Free-Floating Steel 14"×5.5"',
            details: 'Steel shell for cutting attack in dense mix',
            notes: 'Steel Free-Floating snare for explosive, cutting attack — essential for cutting through the wall of distortion on Altars of Madness recordings and live performances.',
            change: null,
          },
          cymbals: {
            item: 'Zildjian A Series',
            details: '13" hi-hats, 16"/18" crashes, 20" ride',
            notes: 'Standard Zildjian A setup — durable and available. At the tempos Sandoval was playing, cymbal tonal nuance was secondary to durability and projection.',
            change: null,
          },
          hardware: {
            item: 'Pearl P-201 Double Pedal',
            details: 'Chain-drive double pedal',
            notes: 'Standard double pedal for the era — Sandoval\'s natural speed often exceeded what the hardware was designed for, contributing to frequent maintenance needs.',
            change: null,
          },
          sticks: {
            item: 'Vic Firth 5B',
            details: 'Standard heavier hickory',
            notes: 'Heavier sticks for power and durability at extreme tempos.',
            change: null,
          },
          heads: {
            item: 'Remo Ambassador',
            details: 'Single-ply for resonance; replaced frequently',
            notes: 'Single-ply heads for maximum resonance — Sandoval replaced them frequently due to breakage at extreme blast beat velocities.',
            change: null,
          },
        },

        estimatedCost: {
          original: 3000,
          inflationAdjusted: 6500,
          currency: 'USD',
        },

        keyChanges: [
          'Joined Morbid Angel in 1988, replacing Mike Browning',
          'Altars of Madness (1989) — one of the most important debut albums in death metal history',
          'Introduced sustained extreme blast beats to death metal recording',
          'Pearl kit provided durable platform for Florida death metal\'s most extreme drummer',
          'Established blast beat as a compositional tool rather than a transitional effect',
        ],

        quote: {
          text: "When I joined Morbid Angel, I wanted to play faster than anyone had ever played. I didn't think about technique — I just played as fast as I could and figured out the rest later.",
          source: 'Metal Maniacs Interview, 1990',
        },

        videos: [],
      },

      {
        id: 'pete-sandoval-1992-covenant-peak',
        era: 'Covenant / Speed Peak Era',
        years: '1992–2000',
        startYear: 1992,
        endYear: 2000,
        description: 'The peak of Pete Sandoval\'s physical capabilities. Covenant (1993, Giant/Earache) is widely considered the apex of his blast beat speed — recorded at tempos that most drummers considered physically impossible, it is still cited as a benchmark for extreme drumming velocity. His Pearl Reference endorsement during this period gave him the professional-grade platform his technique demanded. Blessed Are the Sick (1991) and Domination (1995) flanked the Covenant peak, while Formulas Fatal to the Flesh (1998) showed the first signs of the physical toll his extreme playing was beginning to take.',
        albums: ['Blessed Are the Sick (1991)', 'Covenant (1993)', 'Domination (1995)', 'Formulas Fatal to the Flesh (1998)'],
        tours: ['Morbid Angel world tours 1992–1999', 'Monsters of Death tour 1995', 'Various European festival dates'],
        image: null,

        gear: {
          drums: {
            item: 'Pearl Reference Series',
            details: 'Maple/birch hybrid: 22" kick, 10"/12"/14"/16" toms',
            notes: 'Pearl Reference endorsement — the maple/birch hybrid shells provided a brighter, more projecting tone suited to the increasingly high production values of 1990s death metal records. The Reference\'s durability was essential for Sandoval\'s extreme playing demands.',
            change: CHANGE_TYPES.UPGRADE,
          },
          snare: {
            item: 'Pearl Free-Floating Steel 14"×6.5"',
            details: 'Increased depth for more power and projection',
            notes: 'Deeper steel shell for greater power and projection — the deeper Free-Floating became Sandoval\'s signature snare sound on Covenant and Domination.',
            change: CHANGE_TYPES.UPGRADE,
          },
          cymbals: {
            item: 'Zildjian A Custom Series',
            details: '13"/14" hi-hats, 16"/17"/18" crashes, 20" ride',
            notes: 'Upgraded to A Custom for better attack definition and brighter crash response at extreme blast beat tempos — the A Custom\'s crisp transient suited the increasingly precise studio recordings.',
            change: CHANGE_TYPES.UPGRADE,
          },
          hardware: {
            item: 'Pearl Eliminator Double Pedal',
            details: 'Cam-driven for speed precision',
            notes: 'The Pearl Eliminator was the key hardware choice of the Covenant era — its adjustable cam system allowed Sandoval to fine-tune the speed/power ratio that defined his sound at peak tempos.',
            change: CHANGE_TYPES.SWITCH,
          },
          sticks: {
            item: 'Vic Firth 5B',
            details: 'Maintained heavier hickory preference',
            notes: 'Consistent stick choice at peak career velocity.',
            change: null,
          },
          heads: {
            item: 'Remo Emperor / Powerstroke 3',
            details: 'Emperor on toms, Powerstroke 3 on kick',
            notes: 'Double-ply Emperor heads for increased durability at the extreme velocities sustained through Covenant recording and touring.',
            change: CHANGE_TYPES.UPGRADE,
          },
          electronics: {
            item: 'Drum triggers (kick)',
            details: 'Basic kick triggers for live consistency',
            notes: 'Kick triggers introduced for live performance consistency — at Sandoval\'s extreme tempos, acoustic kick response could become inconsistent in live PA environments.',
            change: CHANGE_TYPES.NEW,
          },
        },

        estimatedCost: {
          original: 8000,
          inflationAdjusted: 16000,
          currency: 'USD',
        },

        keyChanges: [
          'Pearl Reference Series endorsement — professional-grade platform',
          'Pearl Eliminator double pedal adopted — key tool for extreme blast beat control',
          'Covenant (1993) — widely cited as the apex of death metal blast beat speed',
          'Kick triggers integrated for live consistency',
          'Formulas Fatal to the Flesh (1998) — first signs of physical strain from extreme playing demands',
        ],

        quote: {
          text: "The Eliminator gave me control I never had before. I could feel every beat, every subdivision. Covenant was us going to the absolute limit of what was possible.",
          source: 'Modern Drummer, 1994',
        },

        videos: [],
      },

      {
        id: 'pete-sandoval-2000-decline-return',
        era: 'Health Decline / Final Era',
        years: '2000–2011',
        startYear: 2000,
        endYear: 2011,
        description: 'The final chapter of Pete Sandoval\'s career as a working drummer — and its most humanly significant. Years of playing at extreme tempos with extreme physical force had taken a severe toll on his spine. He missed recording sessions for Heretic (2003), replaced by Derek Roddy, before returning to document his final period with Morbid Angel. Illud Divinum Insanus (2011) was his last album; major back surgery that same year forced his retirement. The Pearl Reference setup that had served him through the Covenant peak remained consistent through the end — Sandoval changed very little in his later configuration, as the focus shifted from optimisation to survival.',
        albums: ['Gateways to Annihilation (2000)', 'Heretic (2003, partial — Derek Roddy recorded)', 'Illud Divinum Insanus (2011)'],
        tours: ['Final Morbid Angel touring dates 2000–2010', 'Selective festival appearances only as health permitted'],
        image: null,

        gear: {
          drums: {
            item: 'Pearl Reference Series (continued)',
            details: 'Maple/birch hybrid, same configuration as peak era',
            notes: 'Sandoval maintained the Pearl Reference configuration through the end of his career — stability and familiarity were priorities as health constraints began limiting his ability to adapt to new setups.',
            change: null,
          },
          snare: {
            item: 'Pearl Free-Floating Steel 14"×6.5"',
            details: 'Consistent snare — no change from peak era',
            notes: 'The same deep Free-Floating steel snare maintained through the decline period — consistent with the Covenant sound that defined him.',
            change: null,
          },
          cymbals: {
            item: 'Zildjian A Custom Series',
            details: 'Same A Custom configuration',
            notes: 'Consistent Zildjian A Custom setup through the final era — no significant changes as the focus shifted to managing physical limitations.',
            change: null,
          },
          hardware: {
            item: 'Pearl Eliminator Double Pedal',
            details: 'Continued Eliminator use; modified settings for reduced physical strain',
            notes: 'Pedal tension and cam settings modified to reduce the physical impact of blast beat playing on his declining spine — optimisation shifted from speed to sustainability.',
            change: null,
          },
          sticks: {
            item: 'Vic Firth 5B',
            details: 'Maintained heavier hickory through retirement',
            notes: 'Consistent stick preference to the end — no concession in stick weight despite physical limitations.',
            change: null,
          },
          heads: {
            item: 'Remo Emperor / Powerstroke 3',
            details: 'Same durable configuration',
            notes: 'Double-ply configuration maintained through the final albums.',
            change: null,
          },
          electronics: {
            item: 'ddrum Acoustic Pro Triggers',
            details: 'Upgraded kick triggers for live reliability',
            notes: 'More sophisticated triggers for the final touring period — at reduced physical output, consistent electronic reinforcement became more important for maintaining the Morbid Angel sound.',
            change: CHANGE_TYPES.UPGRADE,
          },
        },

        estimatedCost: {
          original: 9000,
          inflationAdjusted: 14000,
          currency: 'USD',
        },

        keyChanges: [
          'Back injuries begin limiting live appearances and recording sessions',
          'Derek Roddy replaced Sandoval on Heretic (2003) recording',
          'Gateways to Annihilation (2000) — final complete Sandoval-era studio album before health decline',
          'Illud Divinum Insanus (2011) — final Morbid Angel album; final recording',
          'Major back surgery (2011) — retired from drumming',
          'Legacy: established blast beat as death metal\'s primary rhythmic language; influenced every extreme metal drummer who followed',
        ],

        quote: {
          text: "The body gives out before the mind does. I still hear the music perfectly. But after the surgery, I knew that part of my life was over. I have no regrets — I played as hard as any human being could.",
          source: 'Terrorizer Magazine, 2012',
        },

        videos: [],
      },
    ],

    metaTitle: 'Pete Sandoval Gear Evolution Timeline | Morbid Angel Drum Kit History',
    metaDescription: 'Explore Pete Sandoval\'s complete drum gear evolution from the Altars of Madness era through the Covenant speed peak to his 2011 retirement. The blast beat pioneer\'s full Pearl Reference gear timeline.',
  },

  // ==========================================
  // Mikkey Dee - Motörhead / Scorpions (1988–Present)
  // ==========================================
  'mikkey-dee': {
    slug: 'mikkey-dee',
    name: 'Mikkey Dee',
    band: 'Motörhead',
    totalYearsActive: '1988-Present',
    profileImage: '/images/drummers/mikkey-dee.webp',
    summary: 'Mikkey Dee holds one of the longest unbroken tenures in metal drumming history: 23 years as Motörhead\'s drummer, from Bastards in 1993 to Lemmy Kilmister\'s death in December 2015. His evolution spans a King Diamond apprenticeship, the full arc of Motörhead\'s later career as a relentless touring and recording machine, and a post-Motörhead chapter with Scorpions that continues today. His Pearl and Premier kit progression tracks nearly four decades of non-stop professional metal drumming.',

    eras: [
      {
        id: 'mikkey-dee-1988-king-diamond',
        era: 'King Diamond Era',
        years: '1988–1992',
        startYear: 1988,
        endYear: 1992,
        description: 'Mikkey Dee joined King Diamond\'s band in 1988, appearing on four albums — Them (1988), Conspiracy (1989), The Eye (1990), and In Concert 1987: Abigail (live, 1991). The King Diamond years were his professional apprenticeship: technically demanding melodic metal with theatrical staging requirements, teaching Dee the discipline of consistent performance within complex arrangements. His Pearl setup during this period was the foundation for everything that followed.',
        albums: ['Them (1988)', 'Conspiracy (1989)', 'The Eye (1990)'],
        tours: ['King Diamond world tours 1988–1991', 'North American and European touring'],
        image: null,

        gear: {
          drums: {
            item: 'Pearl Masters Professional',
            details: 'Maple shells: 22" kick, 10"/12"/14"/16" toms',
            notes: 'Pearl Masters Professional — the standard for professional touring drummers of the era. Maple shells provided the warm, powerful tone suited to King Diamond\'s melodic metal context.',
            change: null,
          },
          snare: {
            item: 'Pearl Free-Floating 14"×5.5"',
            details: 'Steel shell, sharp attack',
            notes: 'Pearl Free-Floating snare for crisp, cutting attack across King Diamond\'s theatrically varied arrangements — from delicate passages to full-power climaxes.',
            change: null,
          },
          cymbals: {
            item: 'Zildjian A Series',
            details: '14" hi-hats, 16"/18" crashes, 20" ride',
            notes: 'Standard Zildjian A setup — the professional choice for hard rock and heavy metal touring of the late 1980s. Bright, cutting, and durable across heavy touring demands.',
            change: null,
          },
          hardware: {
            item: 'Pearl P-2002C Eliminator Double Pedal',
            details: 'Cam-driven double pedal',
            notes: 'Pearl Eliminator for double bass work in King Diamond\'s demanding technical arrangements — a step up from basic chain pedals.',
            change: null,
          },
          sticks: {
            item: 'Vic Firth 5B',
            details: 'Standard heavier hickory',
            notes: 'Heavier sticks for the physical demands of consistent touring and recording.',
            change: null,
          },
          heads: {
            item: 'Remo Ambassador',
            details: 'Standard single-ply batter heads',
            notes: 'Standard Ambassador configuration for the King Diamond era.',
            change: null,
          },
        },

        estimatedCost: {
          original: 5000,
          inflationAdjusted: 11000,
          currency: 'USD',
        },

        keyChanges: [
          'Joined King Diamond\'s band in 1988',
          'Pearl Masters Professional endorsement established',
          'Them (1988) and Conspiracy (1989) — professional debut recordings',
          'Learned discipline of consistent performance within complex theatrical arrangements',
          'Foundation laid for the non-stop touring career that would define the following three decades',
        ],

        quote: {
          text: "King Diamond taught me how to be a professional. The arrangements were demanding, the shows were theatrical — you had to be precise every night. That discipline stuck with me.",
          source: 'Rhythm Magazine, 2010',
        },

        videos: [],
      },

      {
        id: 'mikkey-dee-1993-motorhead-early',
        era: 'Early Motörhead Era',
        years: '1993–2004',
        startYear: 1993,
        endYear: 2004,
        description: 'Mikkey Dee joined Motörhead in 1992, replacing Phil Taylor ahead of Bastards (1993, ZYX Music). The Bastards album introduced him to the biggest and most demanding role of his career — the sonic avatar of Motörhead\'s thundering, unrelenting rock \'n\' roll. His transition to a Premier kit aligned with Lemmy\'s British-rooted aesthetic, and the combination of Premier\'s punchy character and the band\'s massive touring schedule drove constant refinement of his live setup through albums including Sacrifice (1995), Overnight Sensation (1996), Snake Bite Love (1998), and We Are Motörhead (2000).',
        albums: ['Bastards (1993)', 'Sacrifice (1995)', 'Overnight Sensation (1996)', 'Snake Bite Love (1998)', 'We Are Motörhead (2000)'],
        tours: ['Motörhead world tours 1993–2004', 'Extensive North American and European touring', 'Lemmy\'s 50th birthday tour (1995)'],
        image: null,

        gear: {
          drums: {
            item: 'Premier Signia / Artist Series',
            details: 'Birch/maple shells: 22"×18" kick, 10"/12"/14"/16" toms',
            notes: 'Switched to Premier for the Motörhead era — the British drum company\'s punchy birch character complemented Motörhead\'s raw, driven rock sound. Dee\'s Premier endorsement became one of the defining sounds of Motörhead\'s 1990s and 2000s catalog.',
            change: CHANGE_TYPES.SWITCH,
          },
          snare: {
            item: 'Premier Signia Steel 14"×6.5"',
            details: 'Deeper steel for massive crack',
            notes: 'Deeper Premier steel snare for the explosive, walloping snare crack that became Dee\'s Motörhead signature — built to project over Lemmy\'s bass and Phil Campbell\'s guitars at extreme volumes.',
            change: CHANGE_TYPES.SWITCH,
          },
          cymbals: {
            item: 'Zildjian A / A Custom Series',
            details: '14" A New Beat hi-hats, 16"/18" A crashes, 20" A ride',
            notes: 'Maintained Zildjian relationship into the Motörhead era — the A Series\'s bright, cutting character suited Motörhead\'s raw rock production perfectly.',
            change: null,
          },
          hardware: {
            item: 'Premier / DW 5000 Double Pedal',
            details: 'Dual-chain drive for touring consistency',
            notes: 'Dependable touring pedal hardware — Motörhead\'s relentless touring schedule demanded double pedal hardware that could survive hundreds of shows per year without failure.',
            change: CHANGE_TYPES.SWITCH,
          },
          sticks: {
            item: 'Vic Firth 5B',
            details: 'Heavier hickory for Motörhead volume levels',
            notes: 'Consistent stick preference through the early Motörhead years — heavy enough for the wall-of-sound volume levels but controlled enough for the swing-influenced rhythmic approach.',
            change: null,
          },
          heads: {
            item: 'Remo Emperor / Powerstroke 3',
            details: 'Emperor on toms, Powerstroke 3 on kick for punch',
            notes: 'Powerstroke 3 on kick drums for focused, punchy attack that could cut through Motörhead\'s enormous stage volume without triggering.',
            change: CHANGE_TYPES.UPGRADE,
          },
        },

        estimatedCost: {
          original: 7000,
          inflationAdjusted: 13000,
          currency: 'USD',
        },

        keyChanges: [
          'Joined Motörhead — replaced Phil Taylor ahead of Bastards (1993)',
          'Switched to Premier Signia — British drum character suits Motörhead\'s sound',
          'Bastards (1993) debut with band; Overnight Sensation (1996) reaches new commercial peak',
          'Established one of the most consistent drummer/band combinations in metal history',
          'Motörhead touring schedule among the most relentless in rock history — up to 200 shows per year',
        ],

        quote: {
          text: "With Motörhead, you don't have to think — you just play. Lemmy sets the tempo and the room follows. My job was to be the engine. We played every night like it was the last night.",
          source: 'Modern Drummer, 2002',
        },

        videos: [],
      },

      {
        id: 'mikkey-dee-2004-motorhead-late',
        era: 'Late Motörhead / Bad Magic Era',
        years: '2004–2015',
        startYear: 2004,
        endYear: 2015,
        description: 'The final and most refined chapter of Mikkey Dee\'s Motörhead tenure. Kiss of Death (2006), Motörizer (2008), The Wörld Is Yours (2010), Aftershock (2013), and Bad Magic (2015) documented the band in full command of their identity — older, louder, and more themselves than ever. Dee\'s setup reached its most polished form during this period: Pearl Reference drums replacing Premier as his primary endorsement, a full Evans head partnership, and the expanded cymbal configuration needed to fill increasingly large arenas and festival stages. Bad Magic won a Grammy for Best Metal Performance ("Thunder & Lightning") — Motörhead\'s only Grammy, awarded weeks before Lemmy\'s death on December 28, 2015.',
        albums: ['Kiss of Death (2006)', 'Motörizer (2008)', 'The Wörld Is Yours (2010)', 'Aftershock (2013)', 'Bad Magic (2015)'],
        tours: ['Motörhead world tours 2004–2015', 'Download, Wacken, Hellfest headline slots', 'Final Motörhead touring cycle 2015'],
        image: null,

        gear: {
          drums: {
            item: 'Pearl Reference Series',
            details: 'Maple/birch hybrid: 22"×18" kick, 8"/10"/12"/14"/16" toms',
            notes: 'Switched back to Pearl Reference for the late Motörhead era — the maple/birch hybrid shells delivered a fuller, more resonant tone suited to the arena and festival stages Motörhead now regularly headlined. The Reference\'s durability remained critical for the band\'s relentless touring pace.',
            change: CHANGE_TYPES.SWITCH,
          },
          snare: {
            item: 'Pearl Free-Floating Steel 14"×6.5"',
            details: 'Returned to Pearl Free-Floating for the final era',
            notes: 'The Pearl Free-Floating returned as Dee\'s primary snare — the explosive steel crack remained his defining sound across Motörhead\'s final recordings and live performances.',
            change: CHANGE_TYPES.SWITCH,
          },
          cymbals: {
            item: 'Zildjian A Custom / K Custom Dark Series',
            details: '14" A Custom hi-hats, 17"/18" crashes, 21" K Custom ride, 19" China',
            notes: 'Expanded cymbal setup for larger stages — K Custom Dark ride added for a warmer, more complex wash on arena and festival stages. China cymbal added for the biggest production contexts.',
            change: CHANGE_TYPES.UPGRADE,
          },
          hardware: {
            item: 'Pearl Demon Drive Double Pedal',
            details: 'Direct drive for precise response',
            notes: 'Pearl Demon Drive direct drive for the final Motörhead era — precise, consistent response at all tempos across hundreds of festival and arena shows per year.',
            change: CHANGE_TYPES.SWITCH,
          },
          sticks: {
            item: 'Vic Firth Mikkey Dee Signature',
            details: 'Custom hickory for Motörhead volume levels',
            notes: 'Signature sticks reflecting his status as one of the most recognised drummers in hard rock and metal — developed for the specific power and projection demands of Motörhead\'s final era.',
            change: CHANGE_TYPES.SIGNATURE,
          },
          heads: {
            item: 'Evans G2 / EMAD',
            details: 'G2 on toms, EMAD on kick',
            notes: 'Switched to Evans heads for the final Motörhead era — G2 on toms for warm, resonant attack, EMAD on kick for focused, projecting low-end at arena volume.',
            change: CHANGE_TYPES.SWITCH,
          },
        },

        estimatedCost: {
          original: 18000,
          inflationAdjusted: 24000,
          currency: 'USD',
        },

        keyChanges: [
          'Pearl Reference replaces Premier as primary kit',
          'Evans G2/EMAD heads adopted',
          'Pearl Demon Drive direct drive switch',
          'Vic Firth Mikkey Dee signature sticks launched',
          'Expanded cymbal setup for arena and festival stages',
          'Bad Magic (2015) — Grammy winner ("Thunder & Lightning") — Motörhead\'s only Grammy',
          'Lemmy Kilmister dies December 28, 2015 — Motörhead disbands; 23-year tenure ends',
        ],

        quote: {
          text: "The last show Motörhead ever played was in Germany. We didn't know it was the last show. That's the way Lemmy would have wanted it — just another night of rock 'n' roll. Everything you had, every night.",
          source: 'Classic Rock Magazine, 2016',
        },

        videos: [],
      },

      {
        id: 'mikkey-dee-2016-scorpions',
        era: 'Scorpions Era',
        years: '2016–Present',
        startYear: 2016,
        endYear: 2026,
        description: 'Following Lemmy\'s death and Motörhead\'s dissolution, Mikkey Dee joined Scorpions in 2016 — a natural fit given the German band\'s similar commitment to hard rock fundamentals and relentless touring. He has appeared on Return to Forever (2015, which he contributed to before official joining), Crazy World Live (2019), and Rock Believer (2022). His current setup continues the Pearl Reference / Evans configuration developed in Motörhead\'s final years, now adapted for Scorpions\' more melodic hard rock context — slightly warmer cymbal choices and a more dynamic snare approach.',
        albums: ['Return to Forever (2015, contributed)', 'Rock Believer (2022)'],
        tours: ['Scorpions world tours 2016–present', 'Farewell tour appearances', 'Stadium and arena headline slots globally'],
        image: null,

        gear: {
          drums: {
            item: 'Pearl Reference Series (refined)',
            details: 'Maple/birch hybrid: 22"×18" kick, 8"/10"/12"/14"/16" toms',
            notes: 'Continued Pearl Reference partnership into the Scorpions era — same durable platform, now optimised for a wider dynamic range than Motörhead\'s all-out attack demanded.',
            change: null,
          },
          snare: {
            item: 'Pearl Free-Floating Steel 14"×6.5" / Maple 14"×6.5"',
            details: 'Steel for heavier material; maple for more dynamic passages',
            notes: 'Dee now alternates between steel and maple Free-Floating snares depending on the Scorpions setlist demands — a more nuanced approach than the consistent steel choice across the Motörhead tenure.',
            change: CHANGE_TYPES.UPGRADE,
          },
          cymbals: {
            item: 'Zildjian K Custom / K Hybrid Series',
            details: '14" K Custom Dark hi-hats, 17"/18" crashes, 21" K Custom ride, 19" China',
            notes: 'Evolved toward darker, more complex K Custom and K Hybrid choices — better suited to Scorpions\' broader dynamic range from power ballads to hard rock anthems.',
            change: CHANGE_TYPES.UPGRADE,
          },
          hardware: {
            item: 'Pearl Demon Drive Double Pedal',
            details: 'Continued Demon Drive partnership',
            notes: 'Same proven Demon Drive platform maintained through the Scorpions era — no reason to change a hardware choice that has delivered reliable performance for over a decade.',
            change: null,
          },
          sticks: {
            item: 'Vic Firth Mikkey Dee Signature',
            details: 'Refined signature model for Scorpions context',
            notes: 'Updated signature model serving both Scorpions\' live performances and ongoing educational content.',
            change: null,
          },
          heads: {
            item: 'Evans G2 / EMAD2',
            details: 'G2 on toms, EMAD2 on kick for refined low-end',
            notes: 'EMAD2 for tighter, more refined kick tone suited to Scorpions\' more polished arena production values.',
            change: CHANGE_TYPES.UPGRADE,
          },
        },

        estimatedCost: {
          original: 22000,
          inflationAdjusted: 22000,
          currency: 'USD',
        },

        keyChanges: [
          'Joined Scorpions (2016) — first major band post-Motörhead',
          'Rock Believer (2022) — first full Scorpions studio album recorded with Dee from the start',
          'Cymbal evolution toward darker K Custom / K Hybrid choices',
          'Evans EMAD2 replaces EMAD for refined low-end',
          'Dual snare configuration (steel and maple) for broader dynamic range',
          'Continues one of the longest active careers in major metal and hard rock drumming',
        ],

        quote: {
          text: "Scorpions is a different world from Motörhead — the dynamics, the ballads, the production values. But the commitment to the show is the same. You give everything every night. That part never changes.",
          source: 'Rhythm Magazine, 2022',
        },

        videos: [],
      },
    ],

    metaTitle: 'Mikkey Dee Gear Evolution Timeline | Motörhead & Scorpions Drum Kit History',
    metaDescription: 'Explore Mikkey Dee\'s complete drum gear evolution from King Diamond through 23 years with Motörhead to Scorpions. Pearl, Premier, Evans — the full timeline of one of metal\'s longest careers.',
  },

  // ==========================================
  // Chris Adler - Lamb of God (NWOAHM)
  // ==========================================
  'chris-adler': {
    slug: 'chris-adler',
    name: 'Chris Adler',
    band: 'Lamb of God',
    totalYearsActive: '1999-2019',
    profileImage: '/images/drummers/chris-adler.webp',
    summary: 'Chris Adler built Lamb of God\'s groove-driven New Wave of American Heavy Metal sound through three distinct endorsement eras — Mapex, DW, and Pearl — before a series of injuries ended his run with the band in 2019.',

    eras: [
      {
        id: 'chris-adler-2000-nwoahm',
        era: 'New American Gospel / As the Palaces Burn Era',
        years: '1999-2003',
        startYear: 1999,
        endYear: 2003,
        description: 'The Virginia groove-metal underground. Chris Adler entered the national scene with Lamb of God\'s Mapex Pro M rig — a workhorse midrange kit that delivered the tight, punchy sound on New American Gospel and As the Palaces Burn.',
        albums: ['New American Gospel (2000)', 'As the Palaces Burn (2003)'],
        tours: ['Early club touring', 'Ozzfest 2003'],
        image: null,

        gear: {
          drums: {
            item: 'Mapex Pro M Series',
            details: 'Maple shells: 22" kick, 10"/12"/14"/16" toms',
            notes: 'Mapex Pro M was a midrange workhorse chosen for its punchy maple tone and road durability. Chris used a standard 5-piece configuration during the early club years.',
            change: null,
          },
          snare: {
            item: 'Mapex Pro M 14"x6.5"',
            details: 'Maple shell, chrome hardware',
            notes: 'Matching maple snare. The depth provided the fat crack that became Adler\'s signature groove sound.',
            change: null,
          },
          cymbals: {
            item: 'Zildjian A Series',
            details: '14" hi-hats, 16"/18" crashes, 20" ride',
            notes: 'Standard Zildjian A setup — the industry-default choice for aggressive rock and metal in the early 2000s.',
            change: null,
          },
          hardware: {
            item: 'DW 5000 Double Pedal',
            details: 'Chain-drive double pedal',
            notes: 'Double bass setup consistent from the early years. Chris\'s precise double bass technique was central to LoG\'s groove-metal identity.',
            change: null,
          },
          sticks: {
            item: 'Vic Firth 5B',
            details: 'Hickory sticks',
            notes: 'Standard hickory before any signature deals.',
            change: null,
          },
          heads: {
            item: 'Remo Ambassador / Pinstripe',
            details: 'Ambassador on toms, Pinstripe on kicks',
            notes: 'Controlled, punchy head choice to reinforce the tight groove-metal sound.',
            change: null,
          },
        },

        estimatedCost: {
          original: 4000,
          inflationAdjusted: 7000,
          currency: 'USD',
        },

        keyChanges: [
          'Established the tight groove-metal double bass foundation',
          'Mapex Pro M maple shells delivered punchy, defined tone',
          'Lamb of God debut on national tours (Ozzfest 2003)',
        ],

        quote: {
          text: "We weren't trying to reinvent the wheel — we just wanted to play as heavy and as tight as possible.",
          source: 'Modern Drummer Interview, 2003',
        },

        videos: [],
      },

      {
        id: 'chris-adler-2004-aotw',
        era: 'Ashes of the Wake Era',
        years: '2004-2005',
        startYear: 2004,
        endYear: 2005,
        description: 'Lamb of God\'s major-label breakthrough. Ashes of the Wake (2004) launched the band onto the mainstream metal stage, and Chris secured his first Zildjian A Custom endorsement to pair with the upgraded Mapex setup.',
        albums: ['Ashes of the Wake (2004)'],
        tours: ['Ozzfest 2004', 'Headlining North American tour 2004-2005'],
        image: null,

        gear: {
          drums: {
            item: 'Mapex Pro M Series (continued)',
            details: 'Maple shells: 22" kick, 10"/12"/14"/16" toms',
            notes: 'Continued the Mapex Pro M through the Ashes of the Wake cycle. The kit handled the increased touring demands reliably.',
            change: null,
          },
          snare: {
            item: 'Mapex Pro M 14"x6.5"',
            details: 'Maple shell — continued',
            notes: 'Consistent snare sound through the AOTW touring cycle.',
            change: null,
          },
          cymbals: {
            item: 'Zildjian A Custom',
            details: '14" A Custom hi-hats, 17"/18" crashes, 21" ride',
            notes: 'Upgraded to Zildjian A Custom with the new endorsement. Brighter, more cutting tone for larger venues.',
            change: CHANGE_TYPES.UPGRADE,
          },
          hardware: {
            item: 'DW 5000 Double Pedal',
            details: 'Chain-drive continued',
            notes: 'Same double pedal setup — proven reliability on the road.',
            change: null,
          },
          sticks: {
            item: 'Vic Firth 5B',
            details: 'Hickory, continued',
            notes: 'No signature stick deal at this point.',
            change: null,
          },
          heads: {
            item: 'Remo Pinstripe',
            details: 'Controlled, low-ring heads on toms and kicks',
            notes: 'Refined head choice for better studio and live response.',
            change: null,
          },
        },

        estimatedCost: {
          original: 5500,
          inflationAdjusted: 9000,
          currency: 'USD',
        },

        keyChanges: [
          'Zildjian A Custom endorsement secured',
          'Ashes of the Wake (2004) — first major-label release, chart breakthrough',
          'Lamb of God establish themselves as NWOAHM leaders',
        ],

        quote: {
          text: "Ashes of the Wake was where everything clicked. The band, the gear, the audience — it all came together.",
          source: 'Drum Magazine, 2004',
        },

        videos: [],
      },

      {
        id: 'chris-adler-2006-sacrament',
        era: 'Sacrament Era',
        years: '2006-2008',
        startYear: 2006,
        endYear: 2008,
        description: 'The DW era. Chris switched to DW Collector\'s Series drums for Sacrament (2006), one of the year\'s most critically acclaimed metal releases. The DW maple shells paired with Zildjian A Custom cymbals delivered his most refined studio sound yet.',
        albums: ['Sacrament (2006)'],
        tours: ['Gigantour 2006', 'Headlining tour 2006-2007'],
        image: null,

        gear: {
          drums: {
            item: 'DW Collector\'s Series',
            details: 'Maple shells: 22" kick, 10"/12"/14"/16" toms',
            notes: 'The switch to DW Collector\'s marked a significant upgrade in shell quality. The maple shells gave the Sacrament recordings a warmer, more open tone than the Pro M.',
            change: CHANGE_TYPES.SWITCH,
          },
          snare: {
            item: 'DW Collector\'s 14"x6.5"',
            details: 'Maple, black chrome hardware',
            notes: 'Matching DW snare with a warm yet cutting tone, ideal for the precision groove work on Sacrament.',
            change: CHANGE_TYPES.SWITCH,
          },
          cymbals: {
            item: 'Zildjian A Custom',
            details: '14" hi-hats, 17"/18" crashes, 21" ride — continued',
            notes: 'A Custom setup retained through the DW era. Warm DW shells and bright A Custom cymbals defined the Sacrament sound.',
            change: null,
          },
          hardware: {
            item: 'DW 9000 Double Pedal',
            details: 'Twin-chain drive double pedal',
            notes: 'Upgraded to DW 9000 to complement the DW Collector\'s endorsement. Improved response for demanding Sacrament drum parts.',
            change: CHANGE_TYPES.UPGRADE,
          },
          sticks: {
            item: 'Vic Firth Chris Adler Signature',
            details: 'Hickory with nylon tip',
            notes: 'First signature drumstick with Vic Firth. The Adler model became a reference for tight, articulate heavy metal playing.',
            change: CHANGE_TYPES.SIGNATURE,
          },
          heads: {
            item: 'Remo Pinstripe / Powerstroke 3',
            details: 'Pinstripe on toms, Powerstroke 3 on kicks',
            notes: 'Kick head refined for the larger venues on Gigantour 2006.',
            change: null,
          },
        },

        estimatedCost: {
          original: 14000,
          inflationAdjusted: 22000,
          currency: 'USD',
        },

        keyChanges: [
          'Switch to DW Collector\'s Series — major brand change',
          'Vic Firth Chris Adler Signature drumstick introduced',
          'Sacrament (2006) — Grammy nomination, highest-charting LoG album to that point',
          'DW 9000 double pedal upgrade for precision at speed',
        ],

        quote: {
          text: "DW gave me a kit I could really dig into. Every drum responded exactly how I wanted.",
          source: 'Vic Firth Artist Interview, 2006',
        },

        videos: [],
      },

      {
        id: 'chris-adler-2009-wrath',
        era: 'Wrath Era',
        years: '2009-2011',
        startYear: 2009,
        endYear: 2011,
        description: 'The Pearl era begins. For Wrath (2009), Chris Adler switched to Pearl Reference Pure drums — an all-maple shell design from Pearl that delivered exceptional resonance and low-end projection, perfectly suited to LoG\'s heaviest album yet.',
        albums: ['Wrath (2009)'],
        tours: ['Mayhem Festival 2009', 'European tour 2009'],
        image: null,

        gear: {
          drums: {
            item: 'Pearl Reference Pure',
            details: 'All-maple shells: 22"x18" kick, 10"/12"/14"/16" toms',
            notes: 'Pearl Reference Pure used a simplified, thick all-maple shell construction for maximum resonance. The warm low-end projection was ideal for the heavy, grinding sound of Wrath.',
            change: CHANGE_TYPES.SWITCH,
          },
          snare: {
            item: 'Pearl Sensitone Elite Maple 14"x6.5"',
            details: 'Maple shell, twin-bead design',
            notes: 'Paired with the Reference Pure kit. The twin-bead maple shell produced a fuller crack than the DW alternatives.',
            change: CHANGE_TYPES.SWITCH,
          },
          cymbals: {
            item: 'Zildjian A Custom',
            details: '14" hi-hats, 17"/18" crashes, 21" ride',
            notes: 'Continued A Custom setup — the one constant across multiple kit transitions.',
            change: null,
          },
          hardware: {
            item: 'Pearl Eliminator Double Pedal',
            details: 'Cam-driven double pedal',
            notes: 'Switched to Pearl Eliminator to match the Pearl endorsement. Its multi-cam design suited Chris\'s fluid, groove-focused double bass style.',
            change: CHANGE_TYPES.SWITCH,
          },
          sticks: {
            item: 'Vic Firth Chris Adler Signature',
            details: 'Continued signature model',
            notes: 'Signature stick partnership continued through multiple kit transitions.',
            change: null,
          },
          heads: {
            item: 'Remo Emperor / Powerstroke 3',
            details: 'Emperor on toms, Powerstroke 3 on kicks',
            notes: 'Heavier head choice for Wrath\'s more aggressive, detuned guitar tones.',
            change: CHANGE_TYPES.UPGRADE,
          },
        },

        estimatedCost: {
          original: 12000,
          inflationAdjusted: 17500,
          currency: 'USD',
        },

        keyChanges: [
          'Switch to Pearl Reference Pure — third major kit change in career',
          'Pearl Eliminator double pedal replaces DW 9000',
          'Wrath (2009) — Lamb of God\'s debut at #2 on Billboard 200',
          'All-maple shell construction for maximum low-end resonance',
        ],

        quote: {
          text: "The Reference Pure has this incredible resonance. You hit it once and it just opens up. Perfect for what we do.",
          source: 'Pearl Drums Artist Interview, 2009',
        },

        videos: [],
      },

      {
        id: 'chris-adler-2012-resolution',
        era: 'Resolution / Sturm und Drang Era',
        years: '2012-2019',
        startYear: 2012,
        endYear: 2019,
        description: 'The Mapex return and eventual retirement. For Resolution (2012), Chris switched to the Mapex Black Panther Velvetone — a return to the brand that started his career, now at signature level. A serious arm injury in 2016 and subsequent health complications ultimately led to his departure from Lamb of God in 2019.',
        albums: ['Resolution (2012)', 'VII: Sturm und Drang (2015)'],
        tours: ['Resolution Tour 2012', 'Mayhem Festival 2015'],
        image: null,

        gear: {
          drums: {
            item: 'Mapex Black Panther Velvetone',
            details: 'Maple/walnut shells: 22" kick, 10"/12"/14"/16" toms',
            notes: 'The Black Panther Velvetone used maple/walnut hybrid shells for a darker, more complex tone than the Reference Pure. Chris returned to Mapex for his final active era with LoG.',
            change: CHANGE_TYPES.SWITCH,
          },
          snare: {
            item: 'Mapex Black Panther 14"x6.5"',
            details: 'Maple/walnut shell, black chrome hardware',
            notes: 'Matching Black Panther snare with a warm, slightly dark crack suited to Resolution\'s groove-centric writing.',
            change: CHANGE_TYPES.SWITCH,
          },
          cymbals: {
            item: 'Zildjian A Custom',
            details: '14" hi-hats, 17"/18" crashes, 21" ride',
            notes: 'Unbroken A Custom loyalty — the only constant through every kit transition of his career.',
            change: null,
          },
          hardware: {
            item: 'DW 9000 Double Pedal',
            details: 'Returned to DW 9000 twin-chain drive',
            notes: 'Reverted from Pearl Eliminator back to DW 9000 for Resolution — preferred feel and response for the final LoG era.',
            change: CHANGE_TYPES.SWITCH,
          },
          sticks: {
            item: 'Vic Firth Chris Adler Signature',
            details: 'Continued signature model',
            notes: 'Longest-running sponsorship of his career — Vic Firth signature from Sacrament through retirement.',
            change: null,
          },
          heads: {
            item: 'Remo Pinstripe / Powerstroke 3',
            details: 'Pinstripe on toms, Powerstroke 3 on kicks',
            notes: 'Returned to Pinstripe on toms for tighter, controlled sound on Resolution.',
            change: CHANGE_TYPES.SWITCH,
          },
        },

        estimatedCost: {
          original: 10000,
          inflationAdjusted: 13000,
          currency: 'USD',
        },

        keyChanges: [
          'Returned to Mapex — Black Panther Velvetone maple/walnut hybrid kit',
          'Resolution (2012) — first #1 Billboard 200 debut for Lamb of God',
          'VII: Sturm und Drang (2015) continues commercial run',
          'Arm injury (2016) begins chain of health issues leading to retirement',
          'Departed Lamb of God in 2019 due to continued injury complications',
        ],

        quote: {
          text: "The Black Panther Velvetone has a darkness to it that fits perfectly where we are as a band. It's warm, complex, and heavy.",
          source: 'Mapex Drums Feature, 2012',
        },

        videos: [],
      },
    ],

    metaTitle: 'Chris Adler Gear Evolution Timeline | Lamb of God Drum Kit History',
    metaDescription: 'Explore Chris Adler\'s complete drum gear evolution: Mapex Pro M → DW Collector\'s → Pearl Reference Pure → Mapex Black Panther Velvetone. Lamb of God\'s NWOAHM drum sound documented era by era.',
  },

  // ==========================================
  // Daniel Erlandsson - Arch Enemy
  // ==========================================
  'daniel-erlandsson': {
    slug: 'daniel-erlandsson',
    name: 'Daniel Erlandsson',
    band: 'Arch Enemy',
    totalYearsActive: '1999-Present',
    profileImage: '/images/drummers/daniel-erlandsson.webp',
    summary: 'Daniel Erlandsson joined Arch Enemy in 1999 and has been the rhythmic backbone of Gothenburg melodic death metal ever since — evolving from budget touring kits to Pearl Reference Pure endorsement setups across a 25-year career. Brother of Adrian Erlandsson (At the Gates).',

    eras: [
      {
        id: 'daniel-erlandsson-2001-wages',
        era: 'Wages of Sin / Anthems Era',
        years: '1999-2004',
        startYear: 1999,
        endYear: 2004,
        description: 'Daniel joined Arch Enemy for Wages of Sin (2001) and their breakthrough into the international melodic death metal scene. Early touring kits reflected a working-band budget — functional, road-ready, and suited to the high-speed Gothenburg sound.',
        albums: ['Wages of Sin (2001)', 'Anthems of Rebellion (2003)'],
        tours: ['Wages of Sin European Tour 2001', 'Anthems of Rebellion World Tour 2003-2004'],
        image: null,

        gear: {
          drums: {
            item: 'Pearl Export / Session Series',
            details: 'Poplar/maple shells: 22" kick, 10"/12"/14"/16" toms',
            notes: 'Working-band budget kit for the early touring years. Pearl Session was a step above the Export while remaining practical for Arch Enemy\'s non-stop touring schedule.',
            change: null,
          },
          snare: {
            item: 'Pearl Sensitone 14"x5.5"',
            details: 'Steel shell, chrome hardware',
            notes: 'A steel snare with the cutting crack needed to slice through Arch Enemy\'s twin-guitar density.',
            change: null,
          },
          cymbals: {
            item: 'Zildjian A Series',
            details: '14" hi-hats, 16"/18" crashes, 20" ride',
            notes: 'Standard Zildjian A setup — reliable and widely available on European touring circuits.',
            change: null,
          },
          hardware: {
            item: 'Pearl P-2002C Eliminator Double Pedal',
            details: 'Multi-cam double pedal',
            notes: 'The Eliminator\'s versatile cam system suited Daniel\'s blast beat technique and groove-death hybrid playing style.',
            change: null,
          },
          sticks: {
            item: 'Vic Firth 5B',
            details: 'Standard hickory',
            notes: 'No signature deal in the early years — reliable off-the-shelf sticks for aggressive touring.',
            change: null,
          },
          heads: {
            item: 'Remo Ambassador',
            details: 'Clear on toms, coated on snare',
            notes: 'Standard head choice. Changed frequently due to aggressive playing on long tours.',
            change: null,
          },
        },

        estimatedCost: {
          original: 3500,
          inflationAdjusted: 6500,
          currency: 'USD',
        },

        keyChanges: [
          'Joined Arch Enemy for Wages of Sin (2001) — first major international touring',
          'Established the precise blast beat / groove-death hybrid style',
          'Wages of Sin broke Arch Enemy into the international market',
        ],

        quote: {
          text: "When I joined Arch Enemy I just needed gear that could take the punishment of constant touring. Reliability was everything.",
          source: 'Rhythm Magazine, 2003',
        },

        videos: [],
      },

      {
        id: 'daniel-erlandsson-2005-doomsday',
        era: 'Doomsday Machine / Rise of the Tyrant Era',
        years: '2005-2009',
        startYear: 2005,
        endYear: 2009,
        description: 'As Arch Enemy\'s commercial profile grew, Daniel upgraded his setup significantly. The switch to a professional Pearl kit marked the transition from road-survivor to endorsee — a reflection of the band\'s growing international stature through two major album campaigns.',
        albums: ['Doomsday Machine (2005)', 'Rise of the Tyrant (2007)'],
        tours: ['Doomsday Machine World Tour 2005-2006', 'Rise of the Tyrant Tour 2007-2008'],
        image: null,

        gear: {
          drums: {
            item: 'Pearl Session Studio Select',
            details: 'Birch/basswood shells: 22" kick, 10"/12"/14"/16" toms',
            notes: 'Stepped up to Pearl Session Studio Select. Birch/basswood shells offered a focused, punchy tone well suited to the albums\' crisp production.',
            change: CHANGE_TYPES.UPGRADE,
          },
          snare: {
            item: 'Pearl Sensitone Elite 14"x6.5"',
            details: 'Steel shell, die-cast hoops',
            notes: 'Deeper steel shell for more body while retaining the cutting crack Arch Enemy\'s guitar mix required.',
            change: CHANGE_TYPES.UPGRADE,
          },
          cymbals: {
            item: 'Zildjian A Custom',
            details: '14" hi-hats, 17"/18" crashes, 21" ride',
            notes: 'Upgraded from A Series to A Custom. Brighter, more cutting tone in larger venues.',
            change: CHANGE_TYPES.UPGRADE,
          },
          hardware: {
            item: 'Pearl P-2002C Eliminator (continued)',
            details: 'Multi-cam double pedal — continued',
            notes: 'Same reliable Eliminator setup. Daniel\'s blast beat endurance relied on the Eliminator\'s consistency across long sets.',
            change: null,
          },
          sticks: {
            item: 'Vic Firth 5A',
            details: 'Lighter hickory for faster strokes',
            notes: 'Switched from 5B to 5A for increased speed on faster blast beat passages.',
            change: CHANGE_TYPES.UPGRADE,
          },
          heads: {
            item: 'Remo Emperor',
            details: 'Double-ply on toms, Powerstroke 3 on kicks',
            notes: 'Heavier heads for the extended touring cycle across two full album campaigns.',
            change: CHANGE_TYPES.UPGRADE,
          },
        },

        estimatedCost: {
          original: 8000,
          inflationAdjusted: 13000,
          currency: 'USD',
        },

        keyChanges: [
          'Upgraded to Pearl Session Studio Select professional-grade kit',
          'Zildjian A Custom endorsement begins',
          'Rise of the Tyrant (2007) — reached Top 20 in multiple European charts',
          '5A stick switch for increased speed on demanding blast passages',
        ],

        quote: {
          text: "I started to think more seriously about my sound during Doomsday Machine. The upgrade to better gear made an immediate difference in the studio.",
          source: 'Drums & Percussion Magazine, 2005',
        },

        videos: [],
      },

      {
        id: 'daniel-erlandsson-2010-khaos',
        era: 'Khaos Legions / War Eternal Era',
        years: '2010-Present',
        startYear: 2010,
        endYear: 2024,
        description: 'The Pearl Reference Pure era. Daniel secured a full Pearl endorsement built around the Reference Pure — an all-maple shell design that became his definitive sound. The Khaos Legions and War Eternal period saw Arch Enemy operate at peak international status with both Angela Gossow and Alissa White-Gluz as vocalist.',
        albums: ['Khaos Legions (2011)', 'War Eternal (2014)', 'Will to Power (2017)', 'Deceivers (2022)'],
        tours: ['Khaos Legions World Tour 2011-2012', 'War Eternal Tour 2014-2015', 'Deceivers Tour 2022-2023'],
        image: null,

        gear: {
          drums: {
            item: 'Pearl Reference Pure',
            details: 'All-maple shells: 22"x18" kick, 10"/12"/14"/16" toms',
            notes: 'Pearl Reference Pure uses thick, single-species all-maple shells for maximum resonance and warmth. A counterintuitive choice for extreme metal that adds low-end depth behind the speed.',
            change: CHANGE_TYPES.SWITCH,
          },
          snare: {
            item: 'Pearl Reference Pure 14"x6.5"',
            details: 'All-maple shell, die-cast Power Hoops',
            notes: 'Matching Reference Pure snare. Maple warmth combined with die-cast hoops delivers a full, resonant crack suited to both studio and arena environments.',
            change: CHANGE_TYPES.SWITCH,
          },
          cymbals: {
            item: 'Zildjian A Custom',
            details: '14" A Custom hi-hats, 17"/18"/19" crashes, 21" ride',
            notes: 'A Custom setup expanded to a third crash for live performance. Consistent Zildjian loyalty across the career.',
            change: CHANGE_TYPES.UPGRADE,
          },
          hardware: {
            item: 'Pearl Eliminator Redline Double Pedal',
            details: 'Belt-drive option, floating spring tension',
            notes: 'Upgraded to Eliminator Redline for improved response at blast beat speeds. Belt-drive variant for a smoother, lighter feel.',
            change: CHANGE_TYPES.UPGRADE,
          },
          sticks: {
            item: 'Vic Firth 5A',
            details: 'Continued hickory 5A',
            notes: 'Consistent stick choice for the Reference Pure era.',
            change: null,
          },
          heads: {
            item: 'Remo Pinstripe / Powerstroke 77',
            details: 'Pinstripe on toms, Powerstroke 77 on kicks',
            notes: 'Powerstroke 77 on kicks for maximum low-end focus in large venues and arenas.',
            change: CHANGE_TYPES.SWITCH,
          },
        },

        estimatedCost: {
          original: 14000,
          inflationAdjusted: 18000,
          currency: 'USD',
        },

        keyChanges: [
          'Full Pearl Reference Pure endorsement — definitive career setup',
          'All-maple shell construction adds warmth and resonance behind extreme metal speed',
          'Khaos Legions (2011) — first #1 chart position in Sweden',
          'War Eternal (2014) — Alissa White-Gluz era begins; band continues world touring',
          'Deceivers (2022) — one of melodic death metal\'s most enduring rhythm sections',
        ],

        quote: {
          text: "The Reference Pure changed how I heard my own playing. There's a warmth and depth to those shells that you don't expect from a kit designed for heavy music.",
          source: 'Pearl Drums Artist Feature, 2011',
        },

        videos: [],
      },
    ],

    metaTitle: 'Daniel Erlandsson Gear Evolution Timeline | Arch Enemy Drum Kit History',
    metaDescription: 'Explore Daniel Erlandsson\'s complete drum gear evolution: early touring kits → Pearl Session → Pearl Reference Pure. Arch Enemy\'s Gothenburg melodic death metal drum sound documented era by era.',
  },

  // ==========================================
  // Sean Reinert - Death / Cynic
  // ==========================================
  'sean-reinert': {
    slug: 'sean-reinert',
    name: 'Sean Reinert',
    band: 'Death / Cynic',
    totalYearsActive: '1989-2019',
    profileImage: '/images/drummers/sean-reinert.webp',
    summary: 'Sean Reinert was one of the most innovative drummers in extreme metal history — a jazz-trained polyrhythmic visionary who brought unprecedented subtlety and complexity to death metal on Death\'s Human and Cynic\'s Focus. He passed away in January 2020.',

    eras: [
      {
        id: 'sean-reinert-1990-spiritual-healing',
        era: 'Death — Spiritual Healing Era',
        years: '1989-1990',
        startYear: 1989,
        endYear: 1990,
        description: 'Sean Reinert\'s recording debut with Death on Spiritual Healing (1990) introduced his jazz-influenced approach to death metal — precise ghost notes, polyrhythmic groove, and dynamics that set him apart from every other death metal drummer of the era.',
        albums: ['Spiritual Healing (1990)'],
        tours: ['Spiritual Healing Tour 1990'],
        image: null,

        gear: {
          drums: {
            item: 'DW Collector\'s Series',
            details: 'Maple shells: 22" kick, 10"/12"/13"/14"/16" toms',
            notes: 'Sean was an early DW endorsee. The DW Collector\'s maple shells gave his jazz-influenced technique a warm, resonant quality rarely heard in death metal of the period.',
            change: null,
          },
          snare: {
            item: 'DW Collector\'s 14"x5.5"',
            details: 'Maple shell, die-cast hoops',
            notes: 'Shallow snare for a crisper, more jazz-influenced response — supporting the ghost note vocabulary that defined his Spiritual Healing performance.',
            change: null,
          },
          cymbals: {
            item: 'Zildjian A Series',
            details: '14" hi-hats, 16"/18" crashes, 20" ride',
            notes: 'Jazz-standard cymbal setup applied to a death metal context. The A Series ride bell was critical for Sean\'s articulate ride patterns.',
            change: null,
          },
          hardware: {
            item: 'DW 5000 Double Pedal',
            details: 'Single-chain drive double pedal',
            notes: 'Fluid double bass technique drawn more from fusion drumming than the brute-force approach of most death metal contemporaries.',
            change: null,
          },
          sticks: {
            item: 'Vic Firth 5A',
            details: 'Lighter hickory for control and finesse',
            notes: '5A weight suited the balance of power and subtlety Sean brought to death metal drumming.',
            change: null,
          },
          heads: {
            item: 'Remo Ambassador',
            details: 'Clear on toms, coated on snare',
            notes: 'Open, resonant head choice that supported the jazz-influenced dynamic range rather than suppressing it.',
            change: null,
          },
        },

        estimatedCost: {
          original: 6000,
          inflationAdjusted: 14000,
          currency: 'USD',
        },

        keyChanges: [
          'First major recording with Death — established jazz-influenced approach to death metal',
          'DW Collector\'s endorsement — warm maple tone unprecedented in the genre',
          'Ghost note vocabulary and dynamic control set a new standard for technical death metal',
        ],

        quote: {
          text: "I came from jazz. Chuck understood that and let me bring that vocabulary into Death. Spiritual Healing was where I first got to show what I could do.",
          source: 'Modern Drummer Interview, 1991',
        },

        videos: [],
      },

      {
        id: 'sean-reinert-1991-human',
        era: 'Death — Human Era',
        years: '1991',
        startYear: 1991,
        endYear: 1991,
        description: 'The landmark album. Human (1991) is widely considered one of the greatest technical death metal recordings ever made. Sean Reinert\'s drumming — recorded at Morrisound Studios with producer Scott Burns — remains a masterclass in applying jazz technique to extreme metal. The DW Collector\'s rig was refined from Spiritual Healing.',
        albums: ['Human (1991)'],
        tours: ['Human Tour 1991 (limited dates)'],
        image: null,

        gear: {
          drums: {
            item: 'DW Collector\'s Series',
            details: 'Maple shells: 22" kick, 10"/12"/13"/14"/16" toms — continued',
            notes: 'Same DW Collector\'s kit as Spiritual Healing, recorded at Morrisound Studios in Tampa, FL. The warmth of the DW maple shells was a key element of Human\'s distinctive drum sound — less compressed and more open than most death metal of the period.',
            change: null,
          },
          snare: {
            item: 'DW Collector\'s 14"x5.5"',
            details: 'Maple shell — continued',
            notes: 'The same shallow maple snare that defined the Spiritual Healing sound. The crack on Human is one of the most recognizable in technical death metal history.',
            change: null,
          },
          cymbals: {
            item: 'Zildjian A Series',
            details: '14" hi-hats, 16"/18" crashes, 20" ride — continued',
            notes: 'Continued the jazz-standard Zildjian A setup. The ride cymbal work on tracks like "Suicide Machine" and "Lack of Comprehension" demonstrated extraordinary control.',
            change: null,
          },
          hardware: {
            item: 'DW 5000 Double Pedal',
            details: 'Single-chain drive — continued',
            notes: 'The double bass work on Human is deliberately restrained and musical rather than a showcase of raw speed — a key philosophical difference from contemporaries.',
            change: null,
          },
          sticks: {
            item: 'Vic Firth 5A',
            details: 'Continued hickory 5A',
            notes: 'Consistent stick choice. The lighter weight enabled the ghost note density captured on the recording.',
            change: null,
          },
          heads: {
            item: 'Remo Ambassador',
            details: 'Continued — open and resonant',
            notes: 'Scott Burns\' production embraced the natural resonance of Sean\'s DW setup rather than deadening it.',
            change: null,
          },
        },

        estimatedCost: {
          original: 6500,
          inflationAdjusted: 14500,
          currency: 'USD',
        },

        keyChanges: [
          'Human (1991) recorded at Morrisound Studios — landmark technical death metal album',
          'Drumming widely cited as among the most influential in extreme metal history',
          'Jazz-influenced ghost notes and polyrhythmic vocabulary pushed death metal drumming forward',
          'Gear continuity from Spiritual Healing — the DW Collector\'s sound was integral to Human\'s identity',
        ],

        quote: {
          text: "Human was recorded very fast. Chuck had these incredible songs and we just played them. I tried to bring a musicality that went beyond the obvious technical approach.",
          source: 'Decibel Magazine, 2013',
        },

        videos: [],
      },

      {
        id: 'sean-reinert-1993-focus',
        era: 'Cynic — Focus Era',
        years: '1992-1993',
        startYear: 1992,
        endYear: 1993,
        description: 'The apex. Cynic\'s Focus (1993) is the defining jazz-fusion death metal record — and Sean Reinert\'s drumming is inseparable from that achievement. Co-written with Paul Masvidal, Focus fused death metal brutality with Weather Report-style complexity. The DW Collector\'s setup reached its fullest expression here, with a switch to darker Zildjian K cymbals.',
        albums: ['Focus (1993)'],
        tours: ['Focus Tour 1993 (supporting Death, limited dates)'],
        image: null,

        gear: {
          drums: {
            item: 'DW Collector\'s Series',
            details: 'Maple shells: 22" kick, 10"/12"/13"/14"/16" toms',
            notes: 'Same DW Collector\'s configuration used on Human and Spiritual Healing. The warm, open maple sound was essential to Focus\'s jazz-fusion atmosphere — a stark contrast to the compressed, triggered sound of most metal contemporaries.',
            change: null,
          },
          snare: {
            item: 'DW Collector\'s 14"x5.5"',
            details: 'Maple shell — tuned higher and more open for Focus sessions',
            notes: 'Sean tuned the snare notably higher and more open for Focus than on the Death albums — reflecting the record\'s greater jazz-fusion influence and the need to sit in a more complex harmonic texture.',
            change: CHANGE_TYPES.UPGRADE,
          },
          cymbals: {
            item: 'Zildjian K Series',
            details: '14" K hi-hats, 16"/18" K Custom crashes, 20" K ride',
            notes: 'Switched from A Series to the darker, more complex Zildjian K for Focus — a deliberate move toward jazz-fusion cymbal character over the bright, cutting A Series sound.',
            change: CHANGE_TYPES.SWITCH,
          },
          hardware: {
            item: 'DW 5000 Double Pedal',
            details: 'Single-chain drive — continued',
            notes: 'The double bass role on Focus is more compositional than aggressive — used for polyrhythmic texture rather than speed showcases.',
            change: null,
          },
          sticks: {
            item: 'Vic Firth 5A',
            details: 'Continued 5A for touch and control',
            notes: 'Focus demanded extreme dynamic sensitivity — from whisper-soft passages to death metal explosions. The 5A weight allowed this full range.',
            change: null,
          },
          heads: {
            item: 'Remo Ambassador',
            details: 'Open, resonant configuration — continued',
            notes: 'Maximally resonant head setup to support Focus\'s jazz-fusion dynamics. No heavy muffling or dampening rings.',
            change: null,
          },
        },

        estimatedCost: {
          original: 7000,
          inflationAdjusted: 15000,
          currency: 'USD',
        },

        keyChanges: [
          'Focus (1993) — the defining jazz-death fusion record',
          'Switched to Zildjian K Series for darker, more jazz-oriented cymbal voice',
          'Snare tuned higher and more open than the Death recordings',
          'Drumming cited among the greatest metal drum performances by Modern Drummer and Decibel',
        ],

        quote: {
          text: "Focus was about going somewhere no one had been before. Paul and I wanted to prove that death metal and jazz were not as far apart as people thought.",
          source: 'Decibel Magazine, Focus 20th Anniversary Issue, 2013',
        },

        videos: [],
      },
    ],

    metaTitle: 'Sean Reinert Gear Evolution Timeline | Death & Cynic Drum Kit History',
    metaDescription: 'Explore Sean Reinert\'s complete drum gear evolution across Death\'s Spiritual Healing and Human and Cynic\'s Focus — three landmark albums and the most innovative jazz-death drumming in metal history.',
  },

  // ==========================================
  // Abe Cunningham - Deftones (1988–Present)
  // ==========================================
  'abe-cunningham': {
    slug: 'abe-cunningham',
    name: 'Abe Cunningham',
    band: 'Deftones',
    totalYearsActive: '1988-Present',
    profileImage: '/images/drummers/abe-cunningham.webp',
    summary: 'One of alt-metal\'s longest-tenured drummers, Abe Cunningham has been the rhythmic backbone of the Deftones since their formation in Sacramento in 1988. His evolution spans hardcore-rooted aggression through the atmospheric breakthroughs of White Pony, the groove sophistication of Diamond Eyes, and the cinematic density of Gore and Ohms — a career arc as rich as any in modern heavy music.',

    eras: [
      {
        id: 'abe-cunningham-1988-early',
        era: 'Founding / Early Deftones Era',
        years: '1988–1994',
        startYear: 1988,
        endYear: 1994,
        description: 'Abe Cunningham co-founded the Deftones in Sacramento with Chino Moreno, Stephen Carpenter, and Chi Cheng while still in high school. The early years were shaped by hardcore punk and alternative metal — raw, hard-hitting drumming on budget gear held together by teenage energy and relentless local gigging.',
        albums: ['Adrenaline (1995) — recorded during this period'],
        tours: ['Sacramento club circuit', 'Early California DIY touring'],
        image: null,

        gear: {
          drums: {
            item: 'ddrum Dios Series',
            details: 'Maple shells: 22" kick, 12"/13"/16" toms',
            notes: 'ddrum was Cunningham\'s brand of choice through the early years — durable and punchy for the aggressive alt-metal the Deftones were developing in the Sacramento clubs.',
            change: null,
          },
          snare: {
            item: 'ddrum Steel 14"×5.5"',
            details: 'Steel shell snare, bright and cutting',
            notes: 'Tight, bright steel snare appropriate for the hardcore-influenced attack of early Deftones material.',
            change: null,
          },
          cymbals: {
            item: 'Zildjian A Series',
            details: '14" hi-hats, 16"/18" crashes, 20" ride',
            notes: 'Standard Zildjian A setup — reliable and available for a young band playing every weekend.',
            change: null,
          },
          hardware: {
            item: 'Various budget hardware',
            details: 'Mixed stands, single bass pedal',
            notes: 'Entry-level mixed hardware — single kick configuration during the earliest years.',
            change: null,
          },
          sticks: {
            item: 'Vic Firth 5B',
            details: 'Heavy hickory for aggressive playing',
            notes: 'Heavier sticks suited the hard-hitting hardcore-influenced early Deftones sound.',
            change: null,
          },
          heads: {
            item: 'Remo Ambassador',
            details: 'Clear on toms, coated on snare',
            notes: 'Standard entry-level head configuration.',
            change: null,
          },
        },

        estimatedCost: {
          original: 2500,
          inflationAdjusted: 5200,
          currency: 'USD',
        },

        keyChanges: [
          'Deftones founded in Sacramento, California (1988)',
          'Hardcore and alternative metal roots establish aggressive drumming foundation',
          'ddrum kit becomes Cunningham\'s early signature brand',
          'Signed to Maverick Records (1994)',
        ],

        quote: {
          text: "We were just kids playing in Sacramento. Nobody cared what your gear was — they just wanted you to hit hard.",
          source: 'Modern Drummer Interview, 2000',
        },

        videos: [],
      },

      {
        id: 'abe-cunningham-1995-adrenaline',
        era: 'Adrenaline / Around the Fur Era',
        years: '1995–1999',
        startYear: 1995,
        endYear: 1999,
        description: 'With Adrenaline (1995) and Around the Fur (1997), the Deftones broke into the mainstream. Cunningham\'s drumming became a defining feature of the nu-metal era — powerful, groove-forward, and more dynamic than his peers. He upgraded to a larger ddrum setup and began developing the syncopated pocket grooves that would define his mature style.',
        albums: ['Adrenaline (1995)', 'Around the Fur (1997)'],
        tours: ['Adrenaline Tour 1995–1996', 'Around the Fur Tour 1997–1999', 'Warped Tour appearances', 'Ozzfest 1998'],
        image: null,

        gear: {
          drums: {
            item: 'ddrum Dios Series (expanded)',
            details: 'Maple shells: 22" kick, 10"/12"/13"/16" toms',
            notes: 'Expanded tom configuration for more tonal range as the Deftones\' sound grew more sophisticated on Around the Fur.',
            change: CHANGE_TYPES.UPGRADE,
          },
          snare: {
            item: 'ddrum Steel 14"×6.5"',
            details: 'Deeper steel for more crack and weight',
            notes: 'Deeper snare shell for heavier projection on arena-ready recordings and the Ozzfest stage.',
            change: CHANGE_TYPES.UPGRADE,
          },
          cymbals: {
            item: 'Zildjian A Custom Series',
            details: '14" A Custom hi-hats, 16"/18" A Custom crashes, 21" A Custom ride',
            notes: 'Upgraded to A Custom — brighter, more cutting cymbals suited to the aggressive nu-metal production of Adrenaline and Around the Fur.',
            change: CHANGE_TYPES.UPGRADE,
          },
          hardware: {
            item: 'DW 5000 Double Pedal',
            details: 'Double kick for enhanced drive',
            notes: 'Added double kick configuration for the heavier material on Around the Fur.',
            change: CHANGE_TYPES.NEW,
          },
          sticks: {
            item: 'Vic Firth 5B',
            details: 'Consistent heavy hickory choice',
            notes: 'Maintained 5B sticks through the nu-metal years for power in large venues.',
            change: null,
          },
          heads: {
            item: 'Remo Emperor',
            details: 'Double-ply on toms for touring durability',
            notes: 'Switched to Emperor for the demands of constant Ozzfest and Warped Tour touring.',
            change: CHANGE_TYPES.UPGRADE,
          },
        },

        estimatedCost: {
          original: 6000,
          inflationAdjusted: 11500,
          currency: 'USD',
        },

        keyChanges: [
          'Adrenaline (1995) — major label debut; Deftones break into mainstream',
          'Around the Fur (1997) — nu-metal breakthrough; "My Own Summer" and "Be Quiet and Drive" become anthems',
          'Expanded to double kick configuration',
          'Ozzfest 1998 slot — exposure to massive audiences',
          'Groove-forward drumming style distinguishes Cunningham from heavier nu-metal peers',
        ],

        quote: {
          text: "Around the Fur changed everything. We started thinking about dynamics — when to hit hard and when to pull back. That\'s when the drumming got interesting.",
          source: 'Revolver Magazine Interview, 1998',
        },

        videos: [],
      },

      {
        id: 'abe-cunningham-2000-white-pony',
        era: 'White Pony Era',
        years: '2000–2003',
        startYear: 2000,
        endYear: 2003,
        description: 'White Pony (2000) is the Deftones\' artistic masterpiece — and Cunningham\'s drumming was central to its success. He transitioned to Pearl Custom hardware and developed the spacious, atmospheric drumming approach that made White Pony one of the most critically acclaimed metal albums of its era. This era marked a decisive shift from nu-metal aggression toward atmospheric alt-metal sophistication.',
        albums: ['White Pony (2000)', 'B-Sides & Rarities (2005 — many recorded during this period)'],
        tours: ['White Pony World Tour 2000–2002', 'Various festival headlining dates'],
        image: null,

        gear: {
          drums: {
            item: 'Pearl Custom Series',
            details: 'Maple shells: 22" kick, 10"/12"/14"/16" toms',
            notes: 'Switched from ddrum to Pearl Custom — the maple shells gave Cunningham the warmer, more resonant tone that suited White Pony\'s atmospheric arrangements and Stickles\'s layered production.',
            change: CHANGE_TYPES.SWITCH,
          },
          snare: {
            item: 'Pearl Free-Floating Brass 14"×6.5"',
            details: 'Brass shell, warm and articulate',
            notes: 'Pearl Free-Floating brass snare — warm, full tone that supported the dynamic range of White Pony from whisper-quiet passages to full-volume peaks.',
            change: CHANGE_TYPES.SWITCH,
          },
          cymbals: {
            item: 'Zildjian K Series',
            details: '14" K hi-hats, 16"/18" K crashes, 20" K ride',
            notes: 'Switched to Zildjian K — darker, more complex Turkish bronze suited to White Pony\'s textured, atmospheric sound design.',
            change: CHANGE_TYPES.SWITCH,
          },
          hardware: {
            item: 'Pearl Eliminator Double Pedal',
            details: 'Multi-cam drive, adjustable feel',
            notes: 'Pearl Eliminator — precise, responsive double pedal that allowed the subtle foot work White Pony\'s nuanced arrangements required.',
            change: CHANGE_TYPES.SWITCH,
          },
          sticks: {
            item: 'Vic Firth 5A',
            details: 'Lighter hickory for more control and nuance',
            notes: 'Switched to lighter 5A — more appropriate for the dynamic, atmospheric drumming required by White Pony\'s quieter passages.',
            change: CHANGE_TYPES.SWITCH,
          },
          heads: {
            item: 'Remo Emperor on toms, Coated Ambassador on snare',
            details: 'Mixed head configuration',
            notes: 'Coated snare head for warmer, more controlled attack across White Pony\'s dynamic range.',
            change: CHANGE_TYPES.UPGRADE,
          },
        },

        estimatedCost: {
          original: 8000,
          inflationAdjusted: 14500,
          currency: 'USD',
        },

        keyChanges: [
          'White Pony (2000) — critically acclaimed masterpiece; Grammy Award for Best Metal Performance ("Elite")',
          'Decisive transition from ddrum to Pearl Custom',
          'Switched from A Custom to Zildjian K — darker, more atmospheric tone',
          'Atmospheric, dynamic drumming replaces nu-metal aggression as defining approach',
          'White Pony establishes Deftones as a critical darling beyond genre categorization',
        ],

        quote: {
          text: "White Pony made me think about space. How much you don\'t play is as important as what you do play. The kit had to reflect that — warmer, more musical.",
          source: 'Modern Drummer Interview, 2001',
        },

        videos: [],
      },

      {
        id: 'abe-cunningham-2003-diamond-eyes',
        era: 'Saturday Night Wrist / Diamond Eyes Era',
        years: '2003–2012',
        startYear: 2003,
        endYear: 2012,
        description: 'Following the grief of Chi Cheng\'s accident (2008) and the turbulent Saturday Night Wrist sessions (2006), Cunningham rebuilt his setup around a Gretsch USA Custom kit. Diamond Eyes (2010) — written and recorded rapidly in the wake of Chi\'s accident — showed Cunningham at his most focused and groove-driven. The Gretsch USA Custom\'s warm maple tone and his refined Zildjian K cymbal setup defined this chapter.',
        albums: ['Deftones (2003)', 'Saturday Night Wrist (2006)', 'Diamond Eyes (2010)'],
        tours: ['Saturday Night Wrist Tour 2006–2007', 'Diamond Eyes World Tour 2010–2011'],
        image: null,

        gear: {
          drums: {
            item: 'Gretsch USA Custom',
            details: 'Maple shells: 22" kick, 10"/12"/14"/16" toms',
            notes: 'Switched to Gretsch USA Custom — warm, resonant maple shells gave Cunningham a slightly looser, more organic feel perfectly suited to Diamond Eyes\'s groove-forward approach.',
            change: CHANGE_TYPES.SWITCH,
          },
          snare: {
            item: 'Gretsch USA Custom 14"×6.5" Maple',
            details: 'Maple shell, warm and full',
            notes: 'Matching Gretsch maple snare — warm, full-bodied crack that sat perfectly in Diamond Eyes\'s dense mix.',
            change: CHANGE_TYPES.SWITCH,
          },
          cymbals: {
            item: 'Zildjian K Custom Series',
            details: '14" K Custom hi-hats, 16"/18" K Custom crashes, 21" K Custom ride',
            notes: 'K Custom upgrade — darker, more refined than standard K; suited to the increasingly textured Deftones production palette.',
            change: CHANGE_TYPES.UPGRADE,
          },
          hardware: {
            item: 'DW 9000 Double Pedal',
            details: 'Spring-loaded double pedal, smooth action',
            notes: 'DW 9000 for smooth, powerful double bass response across Diamond Eyes\'s harder-driving material.',
            change: CHANGE_TYPES.SWITCH,
          },
          sticks: {
            item: 'Vater 5A',
            details: 'Hickory, similar feel to Vic Firth 5A',
            notes: 'Switched to Vater endorsement while maintaining the 5A weight class preference.',
            change: CHANGE_TYPES.SWITCH,
          },
          heads: {
            item: 'Remo Emperor on toms, Powerstroke 3 on kick',
            details: 'Standard configuration for touring kit',
            notes: 'Powerstroke 3 kick head for more focused attack across Diamond Eyes\'s heavy sections.',
            change: CHANGE_TYPES.UPGRADE,
          },
        },

        estimatedCost: {
          original: 10000,
          inflationAdjusted: 16500,
          currency: 'USD',
        },

        keyChanges: [
          'Transitioned to Gretsch USA Custom — distinct organic warmth vs. Pearl',
          'Chi Cheng accident (November 2008) — traumatic context for Diamond Eyes sessions',
          'Diamond Eyes (2010) — critically acclaimed; recorded rapidly as a tribute to Chi',
          'Groove-forward drumming approach reaches full maturity on Diamond Eyes',
          'K Custom cymbal upgrade for more sophisticated tonal palette',
        ],

        quote: {
          text: "Diamond Eyes was written for Chi. Every beat had to mean something. I wanted the drumming to carry the weight of that.",
          source: 'Rolling Stone Interview, 2010',
        },

        videos: [],
      },

      {
        id: 'abe-cunningham-2012-koi-no-yokan',
        era: 'Koi No Yokan / Gore / Ohms Era',
        years: '2012–Present',
        startYear: 2012,
        endYear: 2026,
        description: 'The modern Deftones era — Koi No Yokan (2012), Gore (2016), and Ohms (2020) represent the band\'s most compositionally sophisticated and sonically adventurous work. Cunningham transitioned to Pearl Reference — the flagship series that replaced Pearl Masters in the premium tier — and refined his electronic augmentation with Roland sampling pads. His drumming on Ohms in particular is widely praised for its restraint, groove, and cinematic scope.',
        albums: ['Koi No Yokan (2012)', 'Gore (2016)', 'Ohms (2020)'],
        tours: ['Koi No Yokan Tour 2012–2013', 'Gore Tour 2016–2017', 'Ohms Tour 2021–2022'],
        image: null,

        gear: {
          drums: {
            item: 'Pearl Reference Series',
            details: 'Maple/birch hybrid shells: 22" kick, 10"/12"/14"/16" toms',
            notes: 'Returned to Pearl with the flagship Reference Series — maple/birch hybrid shells offering a broader tonal palette for the Deftones\' increasingly cinematic sound.',
            change: CHANGE_TYPES.SWITCH,
          },
          snare: {
            item: 'Pearl Free-Floating Brass 14"×6.5"',
            details: 'Pearl Free-Floating brass, warm and articulate',
            notes: 'Returned to Pearl Free-Floating brass snare — distinctive warm tone suited to the moody, textured production of Gore and Ohms.',
            change: CHANGE_TYPES.SWITCH,
          },
          cymbals: {
            item: 'Zildjian K Custom Dark Series',
            details: '14" K Custom Dark hi-hats, 16"/18"/19" K Custom Dark crashes, 21" K Custom Dark ride',
            notes: 'K Custom Dark — the darkest, most complex Zildjian offering; perfectly suited to Ohms\'s cinematic, atmospheric production.',
            change: CHANGE_TYPES.UPGRADE,
          },
          hardware: {
            item: 'DW 9000 Double Pedal (continued)',
            details: 'Consistent hardware platform across modern era',
            notes: 'Consistent DW 9000 double pedal platform across the modern era — reliable, adjustable, and well-suited to the Deftones\' wide dynamic range.',
            change: null,
          },
          sticks: {
            item: 'Vater 5A (continued)',
            details: 'Sustained Vater endorsement',
            notes: 'Long-running Vater endorsement, consistent stick choice across the modern era.',
            change: null,
          },
          heads: {
            item: 'Remo Emperor on toms, EMAD on kick',
            details: 'EMAD for focused, punchy kick in dense production',
            notes: 'Switched to Remo EMAD on kick for more controlled, focused fundamental in the dense Ohms and Gore production.',
            change: CHANGE_TYPES.UPGRADE,
          },
          electronics: {
            item: 'Roland SPD-SX Sampling Pad',
            details: 'Atmospheric samples and triggers',
            notes: 'Added Roland SPD-SX for atmospheric sample triggers that replicate the layered studio textures of Gore and Ohms in a live context.',
            change: CHANGE_TYPES.NEW,
          },
        },

        estimatedCost: {
          original: 18000,
          inflationAdjusted: 20000,
          currency: 'USD',
        },

        keyChanges: [
          'Transitioned to Pearl Reference — flagship maple/birch hybrid',
          'Koi No Yokan (2012) — most acclaimed Deftones album since White Pony',
          'Gore (2016) — dark, atmospheric direction; Cunningham\'s most restrained and sophisticated playing',
          'Ohms (2020) — pandemic-era record; cinematic scope and groove sophistication',
          'Roland SPD-SX added for live atmospheric textures',
          'K Custom Dark cymbals — darkest, most complex tonal palette of career',
        ],

        quote: {
          text: "With Ohms, I wanted every drum hit to feel like it had weight. Not just volume — weight. The Pearl Reference gives you that. You feel it as much as you hear it.",
          source: 'Drum Magazine Interview, 2020',
        },

        videos: [],
      },
    ],

    faqs: [
      {
        q: 'What drum kit does Abe Cunningham use?',
        a: 'Abe Cunningham plays a Pearl Reference Series kit — a maple/birch hybrid configured with a 22" kick and 10", 12", 14", and 16" toms. He returned to Pearl for the Koi No Yokan era after using a Gretsch USA Custom during the Diamond Eyes years and Pearl Custom during the White Pony era.',
      },
      {
        q: 'What cymbals does Abe Cunningham use?',
        a: 'Cunningham plays Zildjian K Custom Dark cymbals — the darkest series in the Zildjian range. His setup includes 14" K Custom Dark hi-hats, 16"/18"/19" crashes, and a 21" ride. He progressed from Zildjian A through K and K Custom to arrive at K Custom Dark over his four-decade career.',
      },
      {
        q: 'What drums did Abe Cunningham use on White Pony?',
        a: 'On White Pony (2000), Cunningham played Pearl Custom — switching from the ddrum kit he used on Adrenaline and Around the Fur. The Pearl maple shells gave him a warmer, more resonant tone suited to White Pony\'s atmospheric, dynamic arrangements. He also switched to Zildjian K cymbals during this era.',
      },
      {
        q: 'When did Abe Cunningham join the Deftones?',
        a: 'Abe Cunningham is a founding member of the Deftones — he co-founded the band in Sacramento, California in 1988 with Chino Moreno, Stephen Carpenter, and the late Chi Cheng. He has appeared on every Deftones studio album from Adrenaline (1995) through Ohms (2020).',
      },
      {
        q: 'What makes Abe Cunningham\'s drumming distinctive?',
        a: 'Cunningham is known for his dynamic intelligence and groove sophistication — his ability to serve the song with space, restraint, and precision. His cymbal evolution from A Custom through K Custom Dark reflects a consistent pursuit of darker, more complex tones suited to the Deftones\' atmospheric direction.',
      },
    ],

    metaTitle: 'Abe Cunningham Gear Evolution Timeline | Deftones Drum Kit History',
    metaDescription: 'Explore Abe Cunningham\'s complete drum gear evolution: ddrum beginnings → Pearl Custom (White Pony) → Gretsch USA Custom (Diamond Eyes) → Pearl Reference (Ohms). 35+ years of Deftones drumming documented era by era.',
  },

  // ==========================================
  // Nick Menza - Megadeth (1989–1998, 2004, 2016)
  // ==========================================
  'nick-menza': {
    slug: 'nick-menza',
    name: 'Nick Menza',
    band: 'Megadeth',
    totalYearsActive: '1989-2016',
    profileImage: '/images/drummers/nick-menza.webp',
    summary: 'Nick Menza was Megadeth\'s defining drummer — the powerhouse who drove Rust in Peace\'s thrash precision, navigated Countdown to Extinction\'s commercial peak, and delivered the explosive performances on Youthanasia and Cryptic Writings. He passed away on May 21, 2016, collapsing on stage during a performance with OHM — a death as dramatic as his career. His legacy in thrash drumming is cemented.',

    eras: [
      {
        id: 'nick-menza-1989-joining',
        era: 'Joining Megadeth / So Far, So Good Era',
        years: '1989–1990',
        startYear: 1989,
        endYear: 1990,
        description: 'Nick Menza joined Megadeth in 1989, initially as a drum technician before taking the drum seat. He contributed to sessions for So Far, So Good... So What! and stepped up as Megadeth\'s full-time drummer in preparation for what would become Rust in Peace. His Tama Artstar II kit — a professional-grade birch setup — became the foundation of his thrash metal sound.',
        albums: ['So Far, So Good... So What! (1988) — session contributions', 'Early Rust in Peace demos'],
        tours: ['So Far, So Good... So What! touring period'],
        image: null,

        gear: {
          drums: {
            item: 'Tama Artstar II',
            details: 'Birch shells: 22" kick, 10"/12"/14"/16" toms',
            notes: 'The Tama Artstar II — the same professional birch kit that Lars Ulrich used during his peak — was a natural choice for the precision-focused thrash metal of early Megadeth. Punchy, focused birch shells capable of withstanding extreme tempos.',
            change: null,
          },
          snare: {
            item: 'Tama Artstar II 14"×6.5" Birch',
            details: 'Birch shell, die-cast hoops',
            notes: 'Birch snare for a crisp, cutting sound that cut through Dave Mustaine\'s dense guitar arrangements.',
            change: null,
          },
          cymbals: {
            item: 'Zildjian A Series',
            details: '14" A New Beat hi-hats, 17"/18" A crashes, 22" A ride',
            notes: 'Standard Zildjian A setup — bright, cutting cymbals well-suited to the aggressive thrash production of the late 1980s.',
            change: null,
          },
          hardware: {
            item: 'Tama Titan Hardware with double pedal',
            details: 'Heavy-duty stands, double kick',
            notes: 'Heavy Tama Titan hardware — sturdy enough for the aggressive double bass demands of Megadeth\'s material.',
            change: null,
          },
          sticks: {
            item: 'Vic Firth 2B',
            details: 'Heavy hickory for maximum projection',
            notes: '2B weight for the power required in thrash metal\'s aggressive dynamic register.',
            change: null,
          },
          heads: {
            item: 'Remo Emperor',
            details: 'Double-ply on toms for durability',
            notes: 'Emperor heads to survive the demands of Megadeth\'s extreme tempo material.',
            change: null,
          },
        },

        estimatedCost: {
          original: 7000,
          inflationAdjusted: 17000,
          currency: 'USD',
        },

        keyChanges: [
          'Joined Megadeth (1989) — initially as drum tech, promoted to full-time drummer',
          'Tama Artstar II becomes foundational kit for Megadeth career',
          'Double bass configuration established from day one',
          'Precision thrash drumming style developed to match Mustaine\'s demanding compositions',
        ],

        quote: {
          text: "When I got in that band, I knew what the job was. Megadeth doesn\'t mess around. Every beat has to be exact.",
          source: 'Modern Drummer Interview, 1991',
        },

        videos: [],
      },

      {
        id: 'nick-menza-1990-rust-in-peace',
        era: 'Rust in Peace Era',
        years: '1990–1992',
        startYear: 1990,
        endYear: 1992,
        description: 'Rust in Peace (1990) is one of thrash metal\'s greatest albums — and Nick Menza\'s drumming is central to its power. Tracks like "Holy Wars," "Hangar 18," and "Tornado of Souls" feature some of the most technically demanding thrash drumming ever recorded. Menza upgraded to Pearl Masters during this period for a more resonant, powerful sound that matched the album\'s landmark production.',
        albums: ['Rust in Peace (1990)'],
        tours: ['Clash of the Titans Tour 1990', 'Rust in Peace World Tour 1990–1992'],
        image: null,

        gear: {
          drums: {
            item: 'Pearl Masters Professional',
            details: 'Maple shells: 22" kick, 10"/12"/14"/16" toms',
            notes: 'Switched to Pearl Masters — maple shells offered a warmer, more resonant tone than the Tama Artstar birch, giving Rust in Peace\'s production the depth it needed alongside Marty Friedman\'s fluid leads.',
            change: CHANGE_TYPES.SWITCH,
          },
          snare: {
            item: 'Pearl Free-Floating Steel 14"×6.5"',
            details: 'Steel shell, bright and explosive',
            notes: 'Pearl Free-Floating steel snare — explosive, cutting attack that defined the Rust in Peace snare sound heard on "Holy Wars" and "Hangar 18."',
            change: CHANGE_TYPES.SWITCH,
          },
          cymbals: {
            item: 'Zildjian A Custom Series',
            details: '14" A Custom hi-hats, 17"/18"/19" A Custom crashes, 21" A Custom ride',
            notes: 'Upgraded to A Custom — brighter and more cutting than standard A, better suited to the precise, fast-moving cymbal work on Rust in Peace.',
            change: CHANGE_TYPES.UPGRADE,
          },
          hardware: {
            item: 'Pearl Eliminator Double Pedal',
            details: 'Cam-driven double pedal',
            notes: 'Switched to Pearl Eliminator for faster, more controlled double bass response on the extreme tempos of Rust in Peace material.',
            change: CHANGE_TYPES.SWITCH,
          },
          sticks: {
            item: 'Vic Firth 2B',
            details: 'Heavy hickory for thrash power',
            notes: 'Consistent 2B choice for the power and projection required across Rust in Peace\'s extreme tempos.',
            change: null,
          },
          heads: {
            item: 'Remo Emperor on toms, Powerstroke 3 on kick',
            details: 'Standard professional configuration',
            notes: 'Powerstroke 3 on kick for controlled attack — essential for the precise double bass patterns on "Holy Wars" and "Tornado of Souls."',
            change: CHANGE_TYPES.UPGRADE,
          },
        },

        estimatedCost: {
          original: 9000,
          inflationAdjusted: 21000,
          currency: 'USD',
        },

        keyChanges: [
          'Rust in Peace (1990) — one of thrash metal\'s defining albums; Menza\'s career-defining performance',
          'Switched from Tama Artstar to Pearl Masters — critical tonal upgrade',
          'Pearl Free-Floating steel snare defines the Rust in Peace snare sound',
          '"Holy Wars," "Hangar 18," "Tornado of Souls" — extreme technical demands met with precision',
          'Clash of the Titans Tour (1990) — alongside Slayer, Anthrax, Alice in Chains',
        ],

        quote: {
          text: "Rust in Peace is the record every thrash drummer measures themselves against. I knew that going in. The pressure was enormous — but the music drove everything.",
          source: 'Drumhead Magazine Interview, 2008',
        },

        videos: [],
      },

      {
        id: 'nick-menza-1992-countdown',
        era: 'Countdown to Extinction / Youthanasia Era',
        years: '1992–1996',
        startYear: 1992,
        endYear: 1996,
        description: 'Megadeth\'s commercial peak — Countdown to Extinction (1992) went platinum and produced mainstream radio hits. Menza\'s drumming evolved to serve more accessible song structures without abandoning the technical precision that defined Rust in Peace. Youthanasia (1994) continued this polished approach. He upgraded to Pearl Masterworks for the most premium kit of his career, befitting Megadeth\'s arena status.',
        albums: ['Countdown to Extinction (1992)', 'Youthanasia (1994)'],
        tours: ['Countdown to Extinction Tour 1992–1993', 'Youthanasia Tour 1994–1995', 'Headlining arena dates'],
        image: null,

        gear: {
          drums: {
            item: 'Pearl Masterworks',
            details: 'Maple shells, custom finish: 22" kick, 10"/12"/14"/16" toms',
            notes: 'Upgraded to Pearl Masterworks — the premium custom-order Pearl tier. Maple shells in a stage-ready custom finish befitting Megadeth\'s arena headlining status.',
            change: CHANGE_TYPES.UPGRADE,
          },
          snare: {
            item: 'Pearl Free-Floating Brass 14"×6.5"',
            details: 'Brass shell, warmer than steel',
            notes: 'Switched to brass Free-Floating for a warmer, more controlled crack suited to Countdown\'s polished production.',
            change: CHANGE_TYPES.SWITCH,
          },
          cymbals: {
            item: 'Zildjian A Custom / Z Custom mix',
            details: '14" A Custom hi-hats, 18"/19" A Custom crashes, 21" A Custom ride, 18" Z Custom China',
            notes: 'Added Z Custom China for the arena-rock aggression of the Countdown era live shows.',
            change: CHANGE_TYPES.UPGRADE,
          },
          hardware: {
            item: 'Pearl Eliminator Double Pedal (continued)',
            details: 'Consistent pedal platform',
            notes: 'Pearl Eliminator maintained through the commercial peak era — reliable and responsive for the Countdown material\'s varied tempos.',
            change: null,
          },
          sticks: {
            item: 'Vic Firth 2B',
            details: 'Heavy hickory, consistent choice',
            notes: 'Maintained 2B sticks throughout the commercial peak era.',
            change: null,
          },
          heads: {
            item: 'Remo Emperor on toms, EMAD on kick',
            details: 'Modern premium head configuration',
            notes: 'EMAD kick head adopted for tighter, more focused kick attack in arena production contexts.',
            change: CHANGE_TYPES.UPGRADE,
          },
        },

        estimatedCost: {
          original: 12000,
          inflationAdjusted: 25000,
          currency: 'USD',
        },

        keyChanges: [
          'Countdown to Extinction (1992) — platinum record; "Symphony of Destruction" becomes global hit',
          'Upgraded to Pearl Masterworks custom kit — arena-ready premium setup',
          'Youthanasia (1994) — commercial follow-up; drum sound polished further',
          'Megadeth headlines arenas worldwide — massive stage production',
          'Transition from steel to brass Free-Floating snare for warmer commercial sound',
        ],

        quote: {
          text: "Countdown was different. Dave wanted something more people could get into. My job was to make sure the groove was there without losing the Megadeth edge.",
          source: 'Drum! Magazine Interview, 1993',
        },

        videos: [],
      },

      {
        id: 'nick-menza-1996-cryptic-writings',
        era: 'Cryptic Writings Era',
        years: '1996–1998',
        startYear: 1996,
        endYear: 1998,
        description: 'Cryptic Writings (1997) continued Megadeth\'s accessible direction. Menza\'s final full studio album with the band showed his groove-based drumming at its most polished. His Pearl Reference Custom setup — the flagship professional tier — was the definitive statement of his gear journey. He was fired from Megadeth in 1998 following a knee injury, ending one of thrash metal\'s most storied drummer-band partnerships.',
        albums: ['Cryptic Writings (1997)'],
        tours: ['Cryptic Writings Tour 1997–1998'],
        image: null,

        gear: {
          drums: {
            item: 'Pearl Reference Custom',
            details: 'Maple/birch hybrid shells: 22" kick, 10"/12"/14"/16" toms',
            notes: 'Upgraded to Pearl Reference Custom — the flagship professional maple/birch hybrid kit. The most refined and resonant kit of Menza\'s Megadeth tenure.',
            change: CHANGE_TYPES.UPGRADE,
          },
          snare: {
            item: 'Pearl Free-Floating Brass 14"×6.5"',
            details: 'Continued brass Free-Floating preference',
            notes: 'Consistent brass Free-Floating snare choice maintained through the final Megadeth era.',
            change: null,
          },
          cymbals: {
            item: 'Zildjian K Custom Series',
            details: '14" K Custom hi-hats, 17"/18" K Custom crashes, 21" K Custom ride, 18" K Custom China',
            notes: 'Full K Custom setup for the Cryptic Writings era — darker, more complex tone that reflected Megadeth\'s mature post-Rust production aesthetic.',
            change: CHANGE_TYPES.SWITCH,
          },
          hardware: {
            item: 'Pearl Demon Drive Double Pedal',
            details: 'Direct drive for maximum control',
            notes: 'Switched to Pearl Demon Drive direct-drive double pedal for more precise, immediate response in the demanding Cryptic Writings live set.',
            change: CHANGE_TYPES.SWITCH,
          },
          sticks: {
            item: 'Vic Firth 2B',
            details: 'Heavy hickory, consistent career choice',
            notes: 'Consistent 2B sticks throughout entire Megadeth tenure.',
            change: null,
          },
          heads: {
            item: 'Remo Emperor on toms, EMAD on kick',
            details: 'Standard professional touring configuration',
            notes: 'Consistent EMAD/Emperor configuration across the final Megadeth years.',
            change: null,
          },
        },

        estimatedCost: {
          original: 14000,
          inflationAdjusted: 27000,
          currency: 'USD',
        },

        keyChanges: [
          'Pearl Reference Custom — peak gear setup of the Megadeth years',
          'Cryptic Writings (1997) — final full studio album with Megadeth',
          'Switched to Zildjian K Custom for darker, more mature cymbal voice',
          'Pearl Demon Drive adopted for direct-drive precision',
          'Fired from Megadeth (1998) following knee injury — end of defining band partnership',
        ],

        quote: {
          text: "I gave everything I had to that band for almost a decade. Cryptic Writings was the best drumming I ever did for Megadeth. I\'m proud of every record I made with them.",
          source: 'Metal Hammer Interview, 2004',
        },

        videos: [],
      },

      {
        id: 'nick-menza-2004-post-megadeth',
        era: 'Post-Megadeth / Legacy / Live Work',
        years: '2004–2016',
        startYear: 2004,
        endYear: 2016,
        description: 'After a series of personal challenges including knee surgery and cancer treatment, Nick Menza returned to active drumming in the mid-2000s. He performed with various projects including OHM — a jazz-metal fusion group — and maintained a dedicated following in the thrash community. He passed away on May 21, 2016, collapsing on stage during an OHM performance at a Woodland Hills, California club. He was 51. His death on stage — doing what he loved — became one of metal\'s most poignant final chapters.',
        albums: ['OHM: Memorandum (2012)', 'Various live and studio projects'],
        tours: ['OHM tour dates 2010–2016', 'Various special appearances'],
        image: null,

        gear: {
          drums: {
            item: 'Pearl Reference Series',
            details: 'Maple/birch hybrid shells: 22" kick, 10"/12"/14"/16" toms',
            notes: 'Continued with Pearl Reference in the post-Megadeth years — the familiar flagship setup maintained consistency with his peak career gear.',
            change: null,
          },
          snare: {
            item: 'Pearl Free-Floating Steel 14"×6.5"',
            details: 'Returned to steel for projection in live contexts',
            notes: 'Returned to steel Free-Floating for the cutting projection needed in club and festival live environments.',
            change: CHANGE_TYPES.SWITCH,
          },
          cymbals: {
            item: 'Zildjian K Custom Series (continued)',
            details: 'Consistent K Custom palette',
            notes: 'Maintained the K Custom cymbal setup from the Cryptic Writings era through the post-Megadeth years.',
            change: null,
          },
          hardware: {
            item: 'Pearl Demon Drive Double Pedal (continued)',
            details: 'Consistent direct-drive platform',
            notes: 'Pearl Demon Drive maintained throughout post-Megadeth career.',
            change: null,
          },
          sticks: {
            item: 'Vic Firth 2B',
            details: 'Lifelong heavy hickory preference',
            notes: 'Nick Menza used Vic Firth 2B sticks throughout his entire career — a consistent signature of his power-based playing approach.',
            change: null,
          },
          heads: {
            item: 'Remo Emperor on toms, EMAD on kick',
            details: 'Consistent head configuration',
            notes: 'Maintained the same head configuration from the Cryptic Writings era through his final performances.',
            change: null,
          },
        },

        estimatedCost: {
          original: 12000,
          inflationAdjusted: 15000,
          currency: 'USD',
        },

        keyChanges: [
          'Returned to active drumming after knee surgery and cancer recovery',
          'OHM project — jazz-metal fusion showcased range beyond thrash',
          'Maintained Pearl Reference / Zildjian K Custom setup from Megadeth peak years',
          'Continued to be recognized as one of thrash metal\'s defining drummers',
          'Passed away May 21, 2016, on stage during OHM performance — Woodland Hills, California',
        ],

        quote: {
          text: "The music never stopped for me. Even when my body wasn\'t cooperating, the music kept me going. That\'s all I\'ve ever had.",
          source: 'Nick Menza Interview, 2015',
        },

        videos: [],
      },
    ],

    faqs: [
      {
        q: 'What drum kit did Nick Menza use?',
        a: 'Nick Menza played Pearl drums throughout his Megadeth career. He joined with a Tama Artstar II before upgrading to Pearl Masters for Rust in Peace (1990), progressing through Pearl Masterworks (Countdown era) to Pearl Reference Custom (Cryptic Writings). In his post-Megadeth years he played Pearl Reference, maintaining Pearl brand loyalty from 1990 until his death in 2016.',
      },
      {
        q: 'What snare did Nick Menza use on Rust in Peace?',
        a: 'On Rust in Peace, Menza played a Pearl Free-Floating Steel 14"×6.5" snare. The steel shell delivered the explosive, cutting attack heard on "Holy Wars," "Hangar 18," and "Tornado of Souls." He later switched to a Pearl Free-Floating Brass snare for the warmer tone of Countdown to Extinction\'s polished production.',
      },
      {
        q: 'How did Nick Menza die?',
        a: 'Nick Menza passed away on May 21, 2016, collapsing on stage during a performance with his band OHM at Baked Potato, a jazz club in Woodland Hills, California. He suffered a cardiac arrest while playing. He was 51 years old. His death on stage — doing what he loved — became one of metal\'s most poignant final chapters.',
      },
      {
        q: 'What is Nick Menza\'s best drumming?',
        a: 'Nick Menza is most celebrated for his work on Rust in Peace (1990), widely considered one of the greatest thrash metal albums ever made. Tracks such as "Holy Wars," "Hangar 18," and "Tornado of Souls" are consistently cited as benchmarks for thrash metal drumming — precise, powerful, and technically demanding.',
      },
      {
        q: 'What cymbals did Nick Menza use?',
        a: 'Menza used Zildjian throughout his career. He played Zildjian A Custom during the Rust in Peace and Countdown to Extinction eras, then switched to Zildjian K Custom for Cryptic Writings (1997) and maintained K Custom through his post-Megadeth years with OHM.',
      },
    ],

    metaTitle: 'Nick Menza Gear Evolution Timeline | Megadeth Drum Kit History',
    metaDescription: 'Explore Nick Menza\'s complete drum gear evolution: Tama Artstar II → Pearl Masters (Rust in Peace) → Pearl Masterworks (Countdown) → Pearl Reference Custom (Cryptic Writings). The Megadeth drummer\'s full timeline.',
  },

  // ==========================================
  // Morgan Agren - Avant-Garde / Progressive (1983–Present)
  // ==========================================
  'morgan-gren': {
    slug: 'morgan-gren',
    name: 'Morgan Ågren',
    band: 'Mats/Morgan Band',
    totalYearsActive: '1983-Present',
    profileImage: '/images/drummers/morgan-agren.webp',
    summary: 'Morgan Ågren is one of the world\'s most technically advanced and musically inventive drummers — a Swedish self-taught prodigy who rose from the underground scene in Umeå to collaborations with Frank Zappa, John Zorn, and the global avant-garde. As the rhythmic engine of the Mats/Morgan Band alongside keyboardist Mats Öberg, he has spent four decades pushing the boundaries of rhythm, polyrhythm, and drumset possibility in ways that defy genre classification.',

    eras: [
      {
        id: 'morgan-gren-1983-early',
        era: 'Self-Taught Prodigy / Umeå Underground',
        years: '1983–1989',
        startYear: 1983,
        endYear: 1989,
        description: 'Morgan Ågren began playing drums as a young child in Umeå, Sweden — largely self-taught and developing at a staggering pace. By his early teens he was already demonstrating a command of complex polyrhythms and metric modulation that would define his career. He met keyboardist Mats Öberg as children — both had exceptional abilities and developed their unique musical language together from the beginning.',
        albums: ['Early Mats/Morgan Band recordings', 'Swedish underground releases'],
        tours: ['Umeå local scene', 'Early Scandinavian dates'],
        image: null,

        gear: {
          drums: {
            item: 'Sonor Force Series',
            details: 'Beech/maple shells: 20" kick, 10"/12"/14" toms',
            notes: 'Sonor was the natural choice for a young Scandinavian drummer — durable, musical beech/maple shells from the German manufacturer with strong European distribution.',
            change: null,
          },
          snare: {
            item: 'Sonor 14"×5" Beech',
            details: 'Beech shell, warm and open',
            notes: 'Warm beech snare suited to the diverse tonal demands of Ågren\'s polyrhythmic explorations across jazz, rock, and avant-garde contexts.',
            change: null,
          },
          cymbals: {
            item: 'Paiste 2002 Series',
            details: '13" hi-hats, 16"/18" crashes, 20" ride',
            notes: 'Paiste 2002 — a Scandinavian favorite and widely respected in jazz-fusion contexts for their controlled, balanced tone.',
            change: null,
          },
          hardware: {
            item: 'Sonor hardware with single kick',
            details: 'Standard European professional hardware',
            notes: 'Single kick configuration in early years — the extreme double bass of later setups was not yet part of the picture.',
            change: null,
          },
          sticks: {
            item: 'Vic Firth 5A',
            details: 'Light hickory for control and nuance',
            notes: 'Light 5A sticks suited the precise, nuanced playing that distinguished Ågren from heavier rock drummers from the outset.',
            change: null,
          },
          heads: {
            item: 'Remo Ambassador',
            details: 'Single-ply for open, resonant tone',
            notes: 'Ambassador heads for maximum resonance and tone — appropriate for the jazz-influenced polyrhythmic approach of the early years.',
            change: null,
          },
        },

        estimatedCost: {
          original: 3000,
          inflationAdjusted: 8500,
          currency: 'USD',
        },

        keyChanges: [
          'Self-taught drumming begins in Umeå, Sweden (early 1980s)',
          'Met Mats Öberg as children — the founding Mats/Morgan musical partnership',
          'Sonor Force kit established as early career foundation',
          'Polyrhythmic and metric modulation vocabulary developed through intensive self-study',
          'Early Scandinavian underground recognition',
        ],

        quote: {
          text: "Mats and I just played. We didn\'t know what the rules were, so we made up our own. Looking back, that was the best thing that could have happened.",
          source: 'Drummer Magazine Interview, 1995',
        },

        videos: [],
      },

      {
        id: 'morgan-gren-1990-mats-morgan',
        era: 'Mats/Morgan Band Formation / Zappa Connection',
        years: '1990–1997',
        startYear: 1990,
        endYear: 1997,
        description: 'The Mats/Morgan Band took shape as a serious recording and touring project in the early 1990s. Critically, Frank Zappa discovered Ågren\'s playing and was stunned by his ability — reportedly calling him one of the greatest drummers he had ever encountered. Although Zappa\'s health prevented a full collaboration before his death in 1993, the connection brought Ågren international recognition and cemented his reputation in avant-garde circles. He transitioned to DW drums during this period.',
        albums: ['Mats/Morgan Band: Glutenfri (1993)', 'Mats/Morgan Band: Present (1995)'],
        tours: ['European avant-garde festival circuit', 'Scandinavian touring dates'],
        image: null,

        gear: {
          drums: {
            item: 'DW Collector\'s Series',
            details: 'Maple shells: 22" kick, 10"/12"/14"/16" toms',
            notes: 'Switched to DW Collector\'s — the premium American maple kit that became his platform for the next two decades. The warm, resonant maple shells suited the Mats/Morgan Band\'s textural, genre-blending music perfectly.',
            change: CHANGE_TYPES.SWITCH,
          },
          snare: {
            item: 'DW Collector\'s 14"×5.5" Maple',
            details: 'Maple shell, warm and versatile',
            notes: 'DW maple snare for a warm, versatile sound that served the Mats/Morgan Band\'s wide stylistic range from jazz to prog-metal to avant-garde.',
            change: CHANGE_TYPES.SWITCH,
          },
          cymbals: {
            item: 'Zildjian K Series',
            details: '13" K hi-hats, 16"/18" K crashes, 20" K ride',
            notes: 'Switched to Zildjian K — darker, more complex Turkish bronze. The K\'s nuanced overtone structure suited the jazz and avant-garde vocabulary at the core of the Mats/Morgan Band sound.',
            change: CHANGE_TYPES.SWITCH,
          },
          hardware: {
            item: 'DW 5000 Double Pedal',
            details: 'Double kick for expanded rhythmic vocabulary',
            notes: 'Added double kick configuration — the expanded rhythmic vocabulary of double bass became essential to Ågren\'s increasingly complex compositional ideas.',
            change: CHANGE_TYPES.NEW,
          },
          sticks: {
            item: 'Vic Firth 5A (continued)',
            details: 'Consistent light hickory preference',
            notes: 'Maintained 5A sticks — control and nuance remained priorities even as technical demands escalated.',
            change: null,
          },
          heads: {
            item: 'Remo Ambassador on toms, Diplomat on snare',
            details: 'Open, resonant head configuration',
            notes: 'Light Diplomat head on snare for maximum sensitivity and tonal variation across the Mats/Morgan Band\'s diverse arrangements.',
            change: CHANGE_TYPES.UPGRADE,
          },
        },

        estimatedCost: {
          original: 8000,
          inflationAdjusted: 16000,
          currency: 'USD',
        },

        keyChanges: [
          'Mats/Morgan Band becomes serious recording and touring project',
          'Frank Zappa discovers Ågren — calls him one of the greatest drummers he\'d heard',
          'Zappa connection (1992–1993) — limited collaboration before Zappa\'s death in December 1993',
          'Switched from Sonor to DW Collector\'s Series — defining kit transition',
          'Switched to Zildjian K cymbals — darker, jazz-oriented tone',
          'Double kick configuration added',
          'International avant-garde recognition begins',
        ],

        quote: {
          text: "When Frank heard us, I didn\'t know what to think. He was the most demanding musical mind I\'d ever encountered. That experience changed what I thought was possible.",
          source: 'Modern Drummer Feature, 1994',
        },

        videos: [],
      },

      {
        id: 'morgan-gren-1998-international',
        era: 'International Recognition / Extended DW Era',
        years: '1998–2006',
        startYear: 1998,
        endYear: 2006,
        description: 'Ågren\'s international profile grew substantially through the late 1990s and early 2000s. Collaborations with John Zorn, recordings for avant-garde labels, and a growing reputation among the world\'s most discerning drummers placed him at the centre of progressive and avant-garde drumming globally. His DW Collector\'s setup was expanded and customized during this period with additional toms and an extended cymbal arrangement.',
        albums: ['Mats/Morgan Band: Thanks for the Swans (2001)', 'Mats/Morgan Band: Live at Glenn Miller Café (2003)', 'Various collaborative recordings'],
        tours: ['European festival circuit', 'US avant-garde tour dates', 'Japan tours'],
        image: null,

        gear: {
          drums: {
            item: 'DW Collector\'s Series (expanded)',
            details: 'Maple shells: 22" kick, 8"/10"/12"/14"/16" toms',
            notes: 'Expanded DW Collector\'s configuration with an 8" tom for additional upper range in the increasingly complex Mats/Morgan Band arrangements.',
            change: CHANGE_TYPES.UPGRADE,
          },
          snare: {
            item: 'DW Collector\'s 14"×6.5" Maple',
            details: 'Deeper maple snare for more projection',
            notes: 'Deeper snare shell for more volume and crack in festival and concert hall contexts.',
            change: CHANGE_TYPES.UPGRADE,
          },
          cymbals: {
            item: 'Zildjian K Custom Series',
            details: '13" K Custom hi-hats, 16"/18"/19" K Custom crashes, 21" K Custom ride, 18" China',
            notes: 'Upgraded to K Custom for a darker, more refined tone — added China cymbal for textural contrast across the Mats/Morgan Band\'s wider dynamic range.',
            change: CHANGE_TYPES.UPGRADE,
          },
          hardware: {
            item: 'DW 9000 Double Pedal',
            details: 'Spring-loaded double pedal, smooth action',
            notes: 'Upgraded to DW 9000 — more refined feel and response for the nuanced double bass vocabulary of the Mats/Morgan Band\'s advanced compositions.',
            change: CHANGE_TYPES.UPGRADE,
          },
          sticks: {
            item: 'Vic Firth 5A (continued)',
            details: 'Consistent light preference throughout',
            notes: 'Ågren has maintained a lighter stick choice throughout his career — control and sensitivity over raw power.',
            change: null,
          },
          heads: {
            item: 'Remo Ambassador on toms, Diplomat on snare',
            details: 'Open configuration maintained',
            notes: 'Open, sensitive head configuration maintained for maximum tonal nuance.',
            change: null,
          },
        },

        estimatedCost: {
          original: 12000,
          inflationAdjusted: 20000,
          currency: 'USD',
        },

        keyChanges: [
          'International profile expands through avant-garde festival circuit',
          'Collaborations with John Zorn and other avant-garde figures',
          'DW Collector\'s expanded with additional toms',
          'Upgraded to DW 9000 pedal for more refined double bass response',
          'K Custom cymbals adopted for darker, more sophisticated tone',
          'Recognition among world\'s top drummers grows significantly',
        ],

        quote: {
          text: "For me, the kit is about serving the music. Whatever Mats needs, whatever the composition demands — that\'s what drives every setup decision.",
          source: 'Drum! Magazine Interview, 2002',
        },

        videos: [],
      },

      {
        id: 'morgan-gren-2007-hybrid',
        era: 'Avant-Garde Peak / Electronic Integration',
        years: '2007–2014',
        startYear: 2007,
        endYear: 2014,
        description: 'Ågren\'s playing reached its most widely celebrated form during this era. A growing integration of electronic percussion alongside his acoustic DW kit expanded his sonic palette dramatically. His work during this period attracted broader international media coverage, with features in Modern Drummer, Rhythm, and Drumhead highlighting his unique technical and musical approach. The hybrid acoustic/electronic configuration became a signature of his live setup.',
        albums: ['Mats/Morgan Band: In Rosenberg Ville (2007)', 'Mats/Morgan Band: Naked (2013)', 'Various collaborative projects'],
        tours: ['European festival headlining dates', 'US and Japan avant-garde tours'],
        image: null,

        gear: {
          drums: {
            item: 'DW Collector\'s Series Custom',
            details: 'Maple shells with custom configuration: 22" kick, 8"/10"/12"/14"/16" toms',
            notes: 'Custom DW Collector\'s configuration — Ågren worked directly with DW on shell specifications, tuning, and bearing edges optimized for his specific playing style and the Mats/Morgan Band\'s sound.',
            change: CHANGE_TYPES.UPGRADE,
          },
          snare: {
            item: 'DW Collector\'s 14"×5" Maple (sensitized)',
            details: 'Shallow maple snare, extremely responsive',
            notes: 'Shallower snare for maximum sensitivity — ghost notes, brush-level dynamics, and extreme dynamic range were central to Ågren\'s approach during this era.',
            change: CHANGE_TYPES.SWITCH,
          },
          cymbals: {
            item: 'Zildjian K Custom Dark / Constantinople mix',
            details: '13" K Custom hi-hats, 16"/18" K Custom Dark crashes, 22" Constantinople ride, 18" China',
            notes: 'Added Zildjian Constantinople ride — the top-tier Turkish-style cymbal for its complex, almost liquid overtone response that suited the improvisational dimension of Ågren\'s playing.',
            change: CHANGE_TYPES.UPGRADE,
          },
          hardware: {
            item: 'DW 9000 Double Pedal (continued)',
            details: 'Consistent pedal platform',
            notes: 'Maintained DW 9000 for its consistent, adjustable response across diverse musical contexts.',
            change: null,
          },
          sticks: {
            item: 'Vic Firth 5A (continued)',
            details: 'Consistent light stick preference',
            notes: 'Long-running Vic Firth 5A preference maintained through the electronic hybrid era.',
            change: null,
          },
          heads: {
            item: 'Remo Ambassador on toms, Diplomat on snare',
            details: 'Open, sensitive configuration',
            notes: 'Open head configuration for maximum sensitivity — essential for the dynamic range spanning whisper to full-power within single compositions.',
            change: null,
          },
          electronics: {
            item: 'Roland SPD-SX + Roland V-Drums module',
            details: 'Sampling pad and electronic trigger integration',
            notes: 'Integrated Roland SPD-SX sampling pad and V-Drums electronic triggers for extended tonal palette — accessing orchestral, electronic, and experimental sounds not possible on acoustic kit alone.',
            change: CHANGE_TYPES.NEW,
          },
        },

        estimatedCost: {
          original: 20000,
          inflationAdjusted: 27000,
          currency: 'USD',
        },

        keyChanges: [
          'Roland SPD-SX and V-Drums integration creates defining hybrid acoustic/electronic setup',
          'International features in Modern Drummer, Rhythm, and Drumhead',
          'Zildjian Constantinople ride adopted — top-tier Turkish-style cymbal',
          'In Rosenberg Ville (2007) — career high-water mark for Mats/Morgan Band',
          'Custom DW Collector\'s specification with optimized bearing edges',
          'Ghost note and dynamic sensitivity approach reaches peak refinement',
        ],

        quote: {
          text: "Adding electronics wasn\'t about replacing the acoustic kit. It was about giving me more colors. The acoustic drums are the foundation — the electronics are the atmosphere around them.",
          source: 'Modern Drummer Interview, 2009',
        },

        videos: [],
      },

      {
        id: 'morgan-gren-2015-modern',
        era: 'Modern Hybrid Era',
        years: '2015–Present',
        startYear: 2015,
        endYear: 2026,
        description: 'Ågren\'s most recent era consolidates everything that came before — a mature, fully realized hybrid acoustic/electronic setup centered on his customized DW Collector\'s kit, an expanded Zildjian cymbal arrangement, and sophisticated electronic trigger integration. He remains one of the most active and innovative drummers in progressive and avant-garde music globally, continuing to record and tour with the Mats/Morgan Band while taking on an increasing range of special collaborative projects.',
        albums: ['Mats/Morgan Band: Mats/Morgan (2015)', 'Recent collaborative and solo projects'],
        tours: ['Continued European and international touring', 'Avant-garde festival appearances'],
        image: null,

        gear: {
          drums: {
            item: 'DW Collector\'s Series Custom (refined)',
            details: 'Maple shells, customized hardware: 22" kick, 8"/10"/12"/14"/16" toms',
            notes: 'Further refined DW Collector\'s configuration — the result of decades of collaboration with DW on shell specifications, bearing edges, and hardware preferences optimized precisely for Ågren\'s approach.',
            change: CHANGE_TYPES.UPGRADE,
          },
          snare: {
            item: 'DW Collector\'s 14"×5" + secondary piccolo',
            details: 'Primary shallow maple + piccolo for textural contrast',
            notes: 'Two-snare configuration — primary shallow maple for sensitive playing, piccolo secondary for sharp, cutting accents in heavier passages.',
            change: CHANGE_TYPES.NEW,
          },
          cymbals: {
            item: 'Zildjian K Custom / Constantinople / A Custom mix',
            details: 'Expanded multi-series cymbal arrangement',
            notes: 'Expanded multi-series cymbal arrangement spanning K Custom Dark, Constantinople, and A Custom pieces — maximum tonal variety for the Mats/Morgan Band\'s wide-ranging music.',
            change: CHANGE_TYPES.UPGRADE,
          },
          hardware: {
            item: 'DW 9000 Double Pedal (continued)',
            details: 'Lifelong consistent pedal platform',
            notes: 'DW 9000 maintained as the consistent double pedal platform throughout the modern era.',
            change: null,
          },
          sticks: {
            item: 'Vic Firth 5A + brushes + mallets',
            details: 'Multi-implement approach for tonal variety',
            notes: 'Multi-implement approach — 5A sticks, wire brushes, and mallets all employed across performances to maximize the acoustic kit\'s tonal range.',
            change: CHANGE_TYPES.UPGRADE,
          },
          heads: {
            item: 'Remo Ambassador on toms, Diplomat on snare',
            details: 'Open, sensitive long-running configuration',
            notes: 'Lifelong open head preference maintained — Ambassador/Diplomat configuration consistent across the entire career.',
            change: null,
          },
          electronics: {
            item: 'Roland SPD-SX + expanded trigger array',
            details: 'Full hybrid electronic integration',
            notes: 'Expanded Roland electronic integration — SPD-SX sampling, cymbal triggers, and tom triggers for maximum acoustic/electronic hybrid flexibility. The fully realized version of the hybrid approach introduced in the previous era.',
            change: CHANGE_TYPES.UPGRADE,
          },
        },

        estimatedCost: {
          original: 25000,
          inflationAdjusted: 25000,
          currency: 'USD',
        },

        keyChanges: [
          'Full hybrid acoustic/electronic setup reaches definitive form',
          'Multi-implement approach — sticks, brushes, mallets across a single performance',
          'Two-snare configuration for maximum tonal contrast',
          'Expanded Zildjian multi-series cymbal arrangement',
          'Continued international touring and recording with Mats/Morgan Band',
          'Recognized globally as one of progressive and avant-garde drumming\'s defining figures',
        ],

        quote: {
          text: "After forty years I still find new things. The instrument keeps giving — if you keep asking questions of it.",
          source: 'Rhythm Magazine Interview, 2018',
        },

        videos: [],
      },
    ],

    faqs: [
      {
        q: 'Who is Morgan Ågren?',
        a: 'Morgan Ågren (born 1967 in Umeå, Sweden) is one of the world\'s most technically advanced and musically inventive drummers. He is best known as the founding drummer of the Mats/Morgan Band alongside keyboardist Mats Öberg. He was discovered by Frank Zappa in the early 1990s, who reportedly called him one of the greatest drummers he had ever heard.',
      },
      {
        q: 'What drum kit does Morgan Ågren use?',
        a: 'Morgan Ågren plays a customized DW Collector\'s Series kit — maple shells with a 22" kick and 8", 10", 12", 14", and 16" toms. He has used DW since approximately 1990, working with the company on shell specifications. His setup is augmented with an extensive Roland electronic trigger array, making it one of the most sophisticated hybrid acoustic/electronic configurations in progressive drumming.',
      },
      {
        q: 'What cymbals does Morgan Ågren use?',
        a: 'Ågren plays a multi-series Zildjian arrangement combining K Custom Dark, Constantinople, and A Custom pieces. His Zildjian Constantinople ride — the top-tier Turkish-style cymbal — is a centerpiece of his setup, prized for its complex, liquid overtone response suited to improvisational and avant-garde contexts.',
      },
      {
        q: 'Did Morgan Ågren work with Frank Zappa?',
        a: 'Yes — Frank Zappa discovered Morgan Ågren\'s playing in the early 1990s and was reportedly stunned by his ability, calling him one of the greatest drummers he had ever encountered. Although Zappa\'s illness limited the collaboration, the connection brought Ågren international recognition and cemented his reputation in avant-garde circles. Zappa died in December 1993.',
      },
      {
        q: 'What makes Morgan Ågren\'s drumming unique?',
        a: 'Ågren\'s playing combines extraordinary technical command with deep musical intelligence. His polyrhythmic vocabulary, metric modulation, and ghost note sensitivity operate at a level rarely encountered even among the world\'s most accomplished drummers. He plays with a light touch (5A sticks, open Ambassador/Diplomat heads) for extraordinary dynamic range, and his hybrid acoustic/electronic setup extends the kit\'s palette into orchestral territory.',
      },
    ],

    metaTitle: 'Morgan Ågren Gear Evolution Timeline | Avant-Garde Drum Kit History',
    metaDescription: 'Explore Morgan Ågren\'s complete drum gear evolution: Sonor beginnings → DW Collector\'s (Zappa connection) → hybrid acoustic/electronic setup. Sweden\'s most innovative drummer documented era by era.',
  },

  // ==========================================
  // Frost - Satyricon / 1349 (Norwegian Black Metal)
  // ==========================================
  'frost': {
    slug: 'frost',
    name: 'Frost',
    band: 'Satyricon / 1349',
    totalYearsActive: '1993-Present',
    profileImage: '/images/drummers/frost.webp',
    summary: 'Kjetil-Vidar Haraldstad, known as Frost, has spent over three decades defining the sound of Norwegian black metal drumming. From the raw, corpse-painted ferocity of Satyricon\'s early records through the genre\'s most sophisticated progressive evolution and into an experimental modern era, Frost\'s blast beats have set the technical standard for extreme metal worldwide.',

    eras: [
      {
        id: 'frost-1993-raw-era',
        era: 'Raw Black Metal / Corpse Paint Era',
        years: '1993-1999',
        startYear: 1993,
        endYear: 1999,
        description: 'Frost joined Satyricon in 1993, entering the second wave of Norwegian black metal alongside Satyr at the height of the scene\'s raw, corpse-painted underground period. His early playing on Nemesis Divina (1996) established the primitive, hyperspeed blast beat foundation that would define his career — relentless, metronomic, and recorded with the lo-fi, icy production aesthetic the Norwegian scene demanded. This was drumming built for atmosphere and aggression over polish.',
        albums: ['Nemesis Divina (1996)'],
        tours: ['Nemesis Divina European Tour 1996-1997'],
        image: null,

        gear: {
          drums: {
            item: 'Pearl Export Series',
            details: 'Birch/poplar shells: 22" kick, 10"/12"/14"/16" toms',
            notes: 'An affordable, durable entry-level kit typical of the early-1990s Norwegian black metal underground, where budgets were thin and corpse paint mattered more than gear endorsements.',
            change: null,
          },
          snare: {
            item: 'Pearl Export 14"x5.5" Steel',
            details: 'Basic steel shell, sharp crack',
            notes: 'A cutting, raw snare tone that suited Nemesis Divina\'s icy, unpolished production.',
            change: null,
          },
          cymbals: {
            item: 'Paiste 2002 Series',
            details: '14" hi-hats, 16"/18" crashes, 20" ride',
            notes: 'Bright, aggressive Paiste tone favored across the early Norwegian scene for cutting through dense, trebly guitar walls.',
            change: null,
          },
          hardware: {
            item: 'Basic single pedal, standard stands',
            details: 'Entry-level hardware',
            notes: 'No double bass yet — Frost\'s single-foot blast beat technique was already developing the speed that would later define his style.',
            change: null,
          },
          sticks: {
            item: 'Vic Firth 5B',
            details: 'Standard hickory',
            notes: 'Off-the-shelf sticks during the underground years before any endorsement relationships.',
            change: null,
          },
          heads: {
            item: 'Remo Ambassador',
            details: 'Standard configuration',
            notes: 'Basic heads, nothing specialized yet for extreme blast beat durability.',
            change: null,
          },
        },

        estimatedCost: {
          original: 1800,
          inflationAdjusted: 4200,
          currency: 'USD',
        },

        keyChanges: [
          'Joined Satyricon (1993), entering Norway\'s second-wave black metal scene',
          'Nemesis Divina (1996) establishes Frost as a defining black metal drummer',
          'Single-foot blast beat technique developed at hyperspeed tempos',
          'Raw, lo-fi production aesthetic of the Norwegian underground',
        ],

        quote: {
          text: 'In the beginning it was about survival and intensity, not equipment. We had what we had, and we made it sound like the end of the world.',
          source: 'Imperial Steel zine, 1997',
        },

        videos: [],
      },

      {
        id: 'frost-1999-industrial-era',
        era: 'Industrial Black Metal / Founding 1349',
        years: '1999-2006',
        startYear: 1999,
        endYear: 2006,
        description: 'Satyricon\'s Rebel Extravaganza (1999) pushed black metal into industrial territory, and Frost\'s drumming grew more architectural — blast beats began carrying internal dynamic shape rather than functioning as pure texture. He co-founded 1349 in 2001 as a vehicle for unfiltered extremity, and Liberation (2003) and Hellfire (2005) showcased some of the fastest, most disciplined blast beat drumming the genre had produced. Trigger-augmented bass drum work entered his live setup during this period to guarantee consistent attack at extreme tempos.',
        albums: ['Rebel Extravaganza (1999)', '1349: Liberation (2003)', '1349: Hellfire (2005)'],
        tours: ['Rebel Extravaganza Tour 1999-2000', '1349 Hellfire Tour 2005-2006'],
        image: null,

        gear: {
          drums: {
            item: 'Sonor Designer Series',
            details: 'Beech shells: 22" kick, 10"/12"/14"/16" toms',
            notes: 'Switch to Sonor — the start of a long-running brand relationship — for a more focused, controllable attack at sustained extreme tempos than the earlier Pearl Export could deliver.',
            change: CHANGE_TYPES.SWITCH,
          },
          snare: {
            item: 'Sonor Designer 14"x6" Maple',
            details: 'Maple shell, dry and cutting',
            notes: 'A drier, more focused crack suited to the increasingly produced sound of Rebel Extravaganza and the early 1349 records.',
            change: CHANGE_TYPES.UPGRADE,
          },
          cymbals: {
            item: 'Zildjian A Series',
            details: '14" hi-hats, 16"/18" crashes, 20" ride',
            notes: 'Switched to Zildjian for a more controlled, cutting voice as both Satyricon and the newly formed 1349 demanded tighter cymbal articulation at blast tempo.',
            change: CHANGE_TYPES.SWITCH,
          },
          hardware: {
            item: 'Double pedal with kick trigger',
            details: 'Electronic trigger augmentation added',
            notes: 'Trigger augmentation entered the live rig to guarantee consistent kick attack regardless of stage volume or acoustic conditions at extreme tempo.',
            change: CHANGE_TYPES.NEW,
          },
          sticks: {
            item: 'Vic Firth American Classic Extreme 5B',
            details: 'Reinforced hickory for durability',
            notes: 'Heavier-duty stick model adopted to survive the punishing physical demands of touring two extreme bands simultaneously.',
            change: CHANGE_TYPES.UPGRADE,
          },
          heads: {
            item: 'Remo Powerstroke 3 on kick, Ambassador on toms',
            details: 'Reinforced kick head',
            notes: 'Heavier kick head for durability under sustained hyperspeed double-kick and trigger-assisted playing.',
            change: CHANGE_TYPES.UPGRADE,
          },
        },

        estimatedCost: {
          original: 4500,
          inflationAdjusted: 8500,
          currency: 'USD',
        },

        keyChanges: [
          'Rebel Extravaganza (1999) pushes Satyricon into industrial black metal territory',
          'Co-founded 1349 (2001) alongside Ravn and Archaon as a pure extremity outlet',
          'Switched from Pearl to Sonor — beginning a decades-long brand partnership',
          'Liberation (2003) and Hellfire (2005) showcase benchmark blast beat speed',
          'Electronic kick trigger augmentation added to the live setup',
        ],

        quote: {
          text: 'Hellfire demanded a level of speed and precision where the gear itself becomes part of the technique. Every component has to be trustworthy at that tempo.',
          source: 'Terrorizer Magazine, 2005',
        },

        videos: [],
      },

      {
        id: 'frost-2006-progressive-era',
        era: 'Progressive Black Metal / Mainstream Breakthrough',
        years: '2006-2013',
        startYear: 2006,
        endYear: 2013,
        description: 'Now, Diabolical (2006) and The Age of Nero (2008) brought Satyricon to its commercial peak, with Frost\'s drumming evolving toward a more song-serving, almost rock-inflected sensibility without sacrificing extremity. By the self-titled Satyricon (2013), his playing had become a study in restraint and dynamics — knowing when to blast and when to let space define a track. His Sonor SQ2 custom kit, developed during this era, became his signature platform.',
        albums: ['Now, Diabolical (2006)', 'The Age of Nero (2008)', 'Satyricon (2013)'],
        tours: ['Now, Diabolical World Tour 2006-2007', 'Wacken Open Air headline sets'],
        image: null,

        gear: {
          drums: {
            item: 'Sonor SQ2 Series',
            details: 'Custom maple shells: 22" kick, 10"/12"/14"/16" toms',
            notes: 'Upgraded to Sonor\'s premium custom-build SQ2 platform, allowing precise specification of shell depth and bearing edges for a more powerful, focused tone matching Satyricon\'s polished mid-2000s production.',
            change: CHANGE_TYPES.UPGRADE,
          },
          snare: {
            item: 'Sonor SQ2 14"x6" Maple',
            details: 'Custom maple shell, dry crack',
            notes: 'The signature Frost snare sound — a dry, cutting maple shell that became his standard from this point forward.',
            change: CHANGE_TYPES.UPGRADE,
          },
          cymbals: {
            item: 'Zildjian A Custom & K Series',
            details: '14" A Custom hi-hats, 16"/17"/18" A Custom crashes, 22" K Custom Dark ride, 18" K China',
            notes: 'Expanded to a mixed A Custom / K Series setup — brighter A Custom for cutting accents alongside darker K Series tone for the band\'s more atmospheric passages.',
            change: CHANGE_TYPES.UPGRADE,
          },
          hardware: {
            item: 'Sonor Perfect Balance Pedal',
            details: 'Precision single pedal',
            notes: 'Adopted Sonor\'s flagship pedal for maximum speed and control — a refinement that came to define his extreme single-foot technique.',
            change: CHANGE_TYPES.SIGNATURE,
          },
          sticks: {
            item: 'Vic Firth American Classic Extreme 5B',
            details: 'Consistent reinforced hickory',
            notes: 'Maintained the heavier-duty stick model established in the previous era.',
            change: null,
          },
          heads: {
            item: 'Remo (Powerstroke 3 kick, Ambassador toms)',
            details: 'Consistent reinforced configuration',
            notes: 'Stable head configuration carried over from the previous era.',
            change: null,
          },
        },

        estimatedCost: {
          original: 7500,
          inflationAdjusted: 11500,
          currency: 'USD',
        },

        keyChanges: [
          'Now, Diabolical (2006) becomes Satyricon\'s commercial breakthrough',
          'Upgraded to Sonor SQ2 custom series — the signature Frost drum platform',
          'Sonor Perfect Balance pedal adopted for extreme speed and control',
          'Self-titled Satyricon (2013) showcases mature dynamic restraint',
          'Playing evolves toward song-serving structure without losing extremity',
        ],

        quote: {
          text: 'Black metal drumming is about channeling darkness and aggression through precision.',
          source: 'Decibel Magazine, 2010',
        },

        videos: [],
      },

      {
        id: 'frost-2013-experimental-era',
        era: 'Experimental Maturity / Dual-Band Mastery',
        years: '2013-Present',
        startYear: 2013,
        endYear: 2026,
        description: 'In the modern era, Frost balances two demanding bands — Satyricon\'s atmospheric, increasingly experimental direction on Deep calleth upon Deep (2017) and 1349\'s relentless extremity on The Infernal Pathway (2019). His Sonor SQ2 setup has been refined into its definitive configuration, and his blast beats now carry decades of architectural development: dynamic swells, deliberate cymbal voicing, and micro-variations in foot pattern that make even the densest material feel kinetic. Widely cited as one of extreme metal\'s most disciplined and influential drummers, Frost continues to set the technical benchmark for Norwegian black metal.',
        albums: ['Deep calleth upon Deep (2017)', '1349: The Infernal Pathway (2019)'],
        tours: ['Deep calleth upon Deep World Tour 2017-2018', '1349 Infernal Pathway Tour 2019-2020'],
        image: null,

        gear: {
          drums: {
            item: 'Sonor SQ2 Series (refined custom finish)',
            details: 'Custom maple shells: 22" kick, 10"/12"/14"/16" toms',
            notes: 'Final refined configuration of his long-running Sonor SQ2 platform, with custom finishes reflecting his stature as one of Sonor\'s most prominent metal endorsers.',
            change: CHANGE_TYPES.UPGRADE,
          },
          snare: {
            item: 'Sonor SQ2 14"x6" Maple',
            details: 'Signature dry, cutting tone',
            notes: 'Unchanged signature snare — the defining Frost sound across two decades of Sonor endorsement.',
            change: null,
          },
          cymbals: {
            item: 'Zildjian A Custom & K Custom Dark',
            details: '14" A Custom hi-hats, 16"/17"/18" A Custom crashes, 22" K Custom Dark ride, 18" K China',
            notes: 'Mature cymbal voicing balancing brightness and darkness for the atmospheric range spanning Satyricon and 1349.',
            change: null,
          },
          hardware: {
            item: 'Sonor Perfect Balance Pedal',
            details: 'Consistent precision single pedal',
            notes: 'Maintained as the trusted platform for his sustained blast beat technique.',
            change: null,
          },
          sticks: {
            item: 'Vic Firth American Classic Extreme 5B',
            details: 'Career-long stick choice',
            notes: 'Unchanged across two decades — durability under extreme tempo remains the priority.',
            change: null,
          },
          heads: {
            item: 'Remo (Powerstroke 3 kick, Ambassador toms)',
            details: 'Stable mature configuration',
            notes: 'Career-consistent head setup, refined for reliability across extended dual-band touring schedules.',
            change: null,
          },
        },

        estimatedCost: {
          original: 8500,
          inflationAdjusted: 9800,
          currency: 'USD',
        },

        keyChanges: [
          'Deep calleth upon Deep (2017) shows Satyricon\'s most atmospheric, experimental direction',
          'The Infernal Pathway (2019) reaffirms 1349\'s uncompromising extremity',
          'Sonor SQ2 setup reaches its definitive, fully refined configuration',
          'Recognized globally as one of black metal\'s most technically disciplined drummers',
          'Continues balancing two demanding bands across three decades of touring',
        ],

        quote: {
          text: 'Physical endurance is crucial. You cannot fake your way through a 90-minute set of blast beats.',
          source: 'Metal Hammer, 2018',
        },

        videos: [],
      },
    ],

    faqs: [
      {
        q: 'Who is Frost from Satyricon?',
        a: 'Frost (born Kjetil-Vidar Haraldstad, June 28, 1973, in Hammerfest, Norway) is a Norwegian drummer who has played for Satyricon since 1993 and co-founded 1349 in 2001. He is widely regarded as one of black metal\'s most technically disciplined and influential drummers, known for his blistering blast beats and metronomic precision.',
      },
      {
        q: 'How has Frost\'s drumming style evolved across Satyricon albums?',
        a: 'Frost\'s style evolved from the raw, primitive blast beats of Nemesis Divina (1996) through the industrial architecture of Rebel Extravaganza (1999), into the song-serving, dynamically restrained playing of Now, Diabolical (2006) and the self-titled Satyricon (2013), and finally to the atmospheric, decades-refined technique heard on Deep calleth upon Deep (2017). Across thirty years, his blast beats grew from pure intensity into a controlled, architectural tool.',
      },
      {
        q: 'What drum kit does Frost play?',
        a: 'Frost plays a Sonor SQ2 Series custom kit — his signature setup since the mid-2000s, paired with a Sonor SQ2 14"x6" maple snare, Zildjian A Custom and K Custom Dark cymbals, and a Sonor Perfect Balance pedal. Earlier in his career he used Pearl Export and Sonor Designer kits.',
      },
      {
        q: 'What is the difference between Frost\'s playing in Satyricon and 1349?',
        a: 'In Satyricon, Frost\'s drumming has grown increasingly song-serving and atmospheric, especially from Now, Diabolical (2006) onward. In 1349, founded in 2001 as a pure extremity outlet, he plays with uncompromising blast beat speed and intensity, as showcased on Hellfire (2005) and The Infernal Pathway (2019). Balancing both styles across decades demonstrates his exceptional range.',
      },
    ],

    metaTitle: 'Frost Drumming Evolution Timeline | Satyricon & 1349 Black Metal History',
    metaDescription: 'How Frost\'s drumming evolved from raw 1990s Norwegian black metal to sophisticated progressive extremity: Nemesis Divina → Rebel Extravaganza → Now, Diabolical → Deep calleth upon Deep, era by era.',
  },

  // ==========================================
  // Bill Ward - Black Sabbath (Founding Metal Drummer, 1968-1979)
  // ==========================================
  'bill-ward': {
    slug: 'bill-ward',
    name: 'Bill Ward',
    band: 'Black Sabbath',
    totalYearsActive: '1968-1980, 1983-1984, 1997-1998, 2011-2012',
    profileImage: '/images/drummers/bill-ward.webp',
    summary: 'Bill Ward co-founded Black Sabbath in 1968 and, in doing so, helped invent heavy metal drumming itself. From the blues-rock foundation of the band\'s earliest sessions through the proto-metal innovation of Paranoid, the progressive ambition of Sabotage, and the jazz-informed heaviness of his final original-era albums, Ward\'s 1968-1979 arc defines the birth of an entire genre.',

    eras: [
      {
        id: 'bill-ward-1968-founding',
        era: 'Founding Black Sabbath / Blues-Rock Foundation',
        years: '1968-1970',
        startYear: 1968,
        endYear: 1970,
        description: 'Bill Ward co-founded Black Sabbath (originally Earth) in Birmingham in 1968 alongside Tony Iommi, Geezer Butler, and Ozzy Osbourne. His drumming background was rooted in jazz and blues — Gene Krupa, Buddy Rich, and big-band swing — and he brought that vocabulary directly into the band\'s self-titled debut, recorded in roughly twelve hours with no click track and no overdubs. The result, released February 13, 1970, is widely recognized as the first heavy metal album, and Ward\'s loose, swinging, space-conscious playing is foundational to why it sounds the way it does.',
        albums: ['Black Sabbath (1970)'],
        tours: ['Early Birmingham club circuit 1968-1969'],
        image: null,

        gear: {
          drums: {
            item: 'Ludwig Super Classic',
            details: 'Three-ply maple shells: 20" kick, 12"/13" rack toms, 16" floor tom',
            notes: 'A standard professional kit of the late 1960s — Ward\'s first endorsement relationship, chosen for its warm, resonant tone suited to his jazz-derived dynamic range.',
            change: null,
          },
          snare: {
            item: 'Ludwig Supraphonic 14"x5" Aluminum',
            details: 'Aluminum shell, bright crack',
            notes: 'The classic Ludwig snare sound that anchors tracks like "Black Sabbath" and "N.I.B." — bright and cutting despite the loose, swinging feel around it.',
            change: null,
          },
          cymbals: {
            item: 'Paiste Giant Beat',
            details: '15" hi-hats, 18"/20" crashes, 22" ride',
            notes: 'Large-format Paiste cymbals giving Ward\'s kit an open, washy character that supported his jazz-influenced approach to heavy material.',
            change: null,
          },
          hardware: {
            item: 'Ludwig Speed King Single Pedal',
            details: 'Single bass drum pedal',
            notes: 'Standard single-pedal setup of the era — Ward\'s heaviness came from feel and dynamics, not double bass technique.',
            change: null,
          },
          sticks: {
            item: 'Ludwig 2B Hickory',
            details: 'Heavy hickory sticks',
            notes: 'A heavier stick model that let Ward\'s jazz-trained hands generate real power on the proto-metal material.',
            change: null,
          },
          heads: {
            item: 'Remo Ambassador',
            details: 'Single-ply, open and resonant',
            notes: 'Open, resonant heads appropriate to the loose, breathing feel of the debut sessions.',
            change: null,
          },
        },

        estimatedCost: {
          original: 800,
          inflationAdjusted: 6800,
          currency: 'USD',
        },

        keyChanges: [
          'Co-founded Black Sabbath in Birmingham (1968), initially under the name Earth',
          'Black Sabbath (1970) recorded in roughly 12 hours with no click track or overdubs',
          'Widely regarded as the first heavy metal album',
          'Jazz-influenced swing and dynamic restraint applied to proto-metal riffs',
          'Influences: Gene Krupa, Buddy Rich, Tony Williams, Ginger Baker, Elvin Jones',
        ],

        quote: {
          text: 'I wasn\'t trying to invent anything. I was just playing the way Tony\'s riffs told me to play — heavy, but with space to breathe.',
          source: 'Rolling Stone retrospective interview, 1998',
        },

        videos: [],
      },

      {
        id: 'bill-ward-1970-paranoid',
        era: 'Paranoid Era / Proto-Metal Invention',
        years: '1970-1971',
        startYear: 1970,
        endYear: 1971,
        description: 'Released just months after the debut, Paranoid (1970) and Master of Reality (1971) saw Ward refine the template he\'d helped invent. Tracks like "War Pigs," "Iron Man," and "Children of the Grave" demanded a heavier, more deliberate approach while still relying on his swing feel for groove. This is the era where Ward\'s drumming patterns — the shuffle-into-doom transitions, the triplet-laced fills, the open-handed playing as a natural left-hander on a right-handed kit — became the vocabulary that an entire genre would draw from for decades.',
        albums: ['Paranoid (1970)', 'Master of Reality (1971)'],
        tours: ['Paranoid World Tour 1970-1971'],
        image: null,

        gear: {
          drums: {
            item: 'Ludwig Vistalite',
            details: 'Clear acrylic shells: 22" kick, 13"/16" toms',
            notes: 'Switched to Ludwig\'s striking clear acrylic Vistalite kit, which delivered a punchier, more cutting attack to match the band\'s heavier riffing on Paranoid and Master of Reality.',
            change: CHANGE_TYPES.SWITCH,
          },
          snare: {
            item: 'Ludwig Supraphonic 14"x6.5" LM402',
            details: 'Deeper aluminum shell for more crack',
            notes: 'Upgraded to a deeper Supraphonic for more volume and projection — the snare crack that defines "War Pigs" and "Iron Man."',
            change: CHANGE_TYPES.UPGRADE,
          },
          cymbals: {
            item: 'Paiste 2002 Series',
            details: '15" hi-hats, 18"/20" crashes, 24" ride',
            notes: 'Switched to Paiste\'s heavier 2002 series, including one of the largest ride cymbals in rock at the time, for a darker, more powerful wash.',
            change: CHANGE_TYPES.SWITCH,
          },
          hardware: {
            item: 'Ludwig Speed King Single Pedal',
            details: 'Continued single-pedal setup',
            notes: 'Unchanged pedal — Ward\'s power came from technique and touch, not equipment.',
            change: null,
          },
          sticks: {
            item: 'Ludwig 2B Hickory',
            details: 'Consistent heavy sticks',
            notes: 'Maintained from the debut era.',
            change: null,
          },
          heads: {
            item: 'Remo Ambassador / Emperor mix',
            details: 'Heavier double-ply on toms',
            notes: 'Added Emperor heads on toms for more durability and a fatter tone under the heavier Master of Reality riffs.',
            change: CHANGE_TYPES.UPGRADE,
          },
        },

        estimatedCost: {
          original: 1200,
          inflationAdjusted: 9500,
          currency: 'USD',
        },

        keyChanges: [
          'Paranoid (1970) becomes the defining heavy metal album, featuring "War Pigs" and "Iron Man"',
          'Switched to Ludwig\'s clear acrylic Vistalite kit for a punchier attack',
          'Master of Reality (1971) pushes the band into heavier, downtuned territory',
          'Open-handed playing (left-hander on a right-handed kit) becomes a signature trait',
          'Drumming vocabulary established here becomes foundational to heavy metal as a genre',
        ],

        quote: {
          text: 'War Pigs needed something that felt like a march into hell. I just tried to play what the song was telling me — heavy, but it had to swing too.',
          source: 'Modern Drummer Magazine, 1991',
        },

        videos: [],
      },

      {
        id: 'bill-ward-1972-progressive-era',
        era: 'Sabbath Bloody Sabbath / Sabotage - Progressive Era',
        years: '1972-1975',
        startYear: 1972,
        endYear: 1975,
        description: 'Vol. 4 (1972), Sabbath Bloody Sabbath (1973), and Sabotage (1975) saw Black Sabbath embrace progressive ambition — odd meters, multi-part song structures, and orchestral arrangements. Ward\'s playing expanded accordingly, incorporating more complex fills, shifting time feels, and a heightened sense of dynamics across longer compositions like "Sabbra Cadabra" and "Symptom of the Universe." This era represents the peak of his technical and compositional ambition within Sabbath.',
        albums: ['Vol. 4 (1972)', 'Sabbath Bloody Sabbath (1973)', 'Sabotage (1975)'],
        tours: ['Vol. 4 Tour 1972-1973', 'Sabotage Tour 1975-1976'],
        image: null,

        gear: {
          drums: {
            item: 'Ludwig Standard Maple',
            details: 'Natural maple shells: 22" kick, 13"/16" toms, added 14" tom',
            notes: 'Switched from Vistalite acrylic back to traditional Ludwig maple shells for a warmer, more nuanced tone suited to the band\'s increasingly progressive arrangements.',
            change: CHANGE_TYPES.SWITCH,
          },
          snare: {
            item: 'Ludwig Supraphonic 14"x6.5" LM402',
            details: 'Continued deep aluminum snare',
            notes: 'Unchanged from the Paranoid era — the snare sound was already locked in.',
            change: null,
          },
          cymbals: {
            item: 'Paiste 2002 Series (expanded)',
            details: '15" hi-hats, 18"/20" crashes, 24" ride, 18" 2002 China',
            notes: 'Added a China cymbal for the more textured, exotic accents required by Sabbath\'s progressive arrangements on Sabotage.',
            change: CHANGE_TYPES.NEW,
          },
          hardware: {
            item: 'Ludwig Atlas Hardware',
            details: 'Upgraded stands and pedal',
            notes: 'Upgraded to Ludwig\'s heavier-duty Atlas line as the band\'s stage production grew with arena touring.',
            change: CHANGE_TYPES.UPGRADE,
          },
          sticks: {
            item: 'Ludwig 2B Hickory',
            details: 'Consistent heavy sticks',
            notes: 'Maintained career-long preference.',
            change: null,
          },
          heads: {
            item: 'Remo Emperor (toms), Ambassador (snare)',
            details: 'Double-ply toms for durability',
            notes: 'Emperor heads on toms standard by this point for the heavier, more dynamic playing the progressive material demanded.',
            change: null,
          },
        },

        estimatedCost: {
          original: 1600,
          inflationAdjusted: 11500,
          currency: 'USD',
        },

        keyChanges: [
          'Vol. 4 (1972) and Sabbath Bloody Sabbath (1973) embrace progressive song structures',
          'Switched back to traditional Ludwig maple shells from the Vistalite acrylic kit',
          'Sabotage (1975) showcases Ward\'s most complex, technically ambitious drumming',
          'Added China cymbal for exotic textural accents',
          'Peak era of compositional and technical ambition within the original lineup',
        ],

        quote: {
          text: 'Sabotage was the most we ever pushed ourselves musically. I had to really think about arrangements, not just hit hard.',
          source: 'Classic Rock Magazine, 2004',
        },

        videos: [],
      },

      {
        id: 'bill-ward-1976-jazz-heaviness',
        era: 'Technical Ecstasy / Never Say Die! - Jazz-Informed Heaviness',
        years: '1976-1979',
        startYear: 1976,
        endYear: 1979,
        description: 'Technical Ecstasy (1976) and Never Say Die! (1978) closed out Ward\'s original run with Black Sabbath, deepening the jazz vocabulary he\'d carried since the beginning into the band\'s heaviest, most exploratory final stretch. Ward even sang lead on the ballad "It\'s Alright" from Technical Ecstasy, underscoring his musicality beyond the kit. Mounting personal struggles and the band\'s internal tensions led to his departure in 1980, closing the original Ozzy-era lineup\'s defining chapter — but not before this era cemented jazz-informed heaviness as a core ingredient of metal drumming\'s DNA.',
        albums: ['Technical Ecstasy (1976)', 'Never Say Die! (1978)'],
        tours: ['Technical Ecstasy Tour 1976-1977', 'Never Say Die! Tour 1978'],
        image: null,

        gear: {
          drums: {
            item: 'Ludwig Standard Maple (continued)',
            details: 'Natural maple shells: 22" kick, 13"/14"/16" toms',
            notes: 'Maintained the warm maple platform established in the previous era, with an added tom for more melodic fill options.',
            change: null,
          },
          snare: {
            item: 'Ludwig Supraphonic 14"x6.5" LM402',
            details: 'Career-defining snare, unchanged',
            notes: 'The same Supraphonic that had defined his sound since Paranoid — by this point a signature element of the classic Sabbath sound.',
            change: null,
          },
          cymbals: {
            item: 'Paiste 2002 Series (continued)',
            details: '15" hi-hats, 18"/20" crashes, 24" ride, 18" China',
            notes: 'Stable cymbal setup carried through the band\'s final original-era albums.',
            change: null,
          },
          hardware: {
            item: 'Ludwig Atlas Hardware (continued)',
            details: 'Stable arena-touring hardware',
            notes: 'Unchanged from the progressive era — the rig was by now fully mature.',
            change: null,
          },
          sticks: {
            item: 'Ludwig 2B Hickory',
            details: 'Career-long stick choice',
            notes: 'Maintained throughout his entire original-era Sabbath tenure.',
            change: null,
          },
          heads: {
            item: 'Remo Emperor (toms), Ambassador (snare)',
            details: 'Stable mature configuration',
            notes: 'Unchanged head setup carried through to the end of the original lineup.',
            change: null,
          },
        },

        estimatedCost: {
          original: 1800,
          inflationAdjusted: 9200,
          currency: 'USD',
        },

        keyChanges: [
          'Technical Ecstasy (1976) — Ward sings lead vocals on "It\'s Alright"',
          'Never Say Die! (1978) closes out the classic original-lineup era',
          'Jazz-informed heaviness reaches its fullest expression within Sabbath',
          'Departed Black Sabbath in 1980 amid personal struggles and internal band tensions',
          'Briefly reunited for the Born Again tour (1983) and multiple Ozzfest dates (1997-2005)',
        ],

        quote: {
          text: 'Everything I played came from jazz, even on the heaviest songs. That never left me, not for one bar.',
          source: 'Drummer Magazine retrospective, 2013',
        },

        videos: [],
      },
    ],

    faqs: [
      {
        q: 'How did Bill Ward invent heavy metal drumming?',
        a: 'Bill Ward co-founded Black Sabbath in 1968 and, with no genre template to follow, applied his jazz training (Gene Krupa, Buddy Rich, Tony Williams) directly to Tony Iommi\'s heavy, downtuned riffs. The result — recorded on the band\'s 1970 debut in roughly 12 hours with no click track — combined swing, dynamic restraint, and space with unprecedented heaviness, creating the drumming vocabulary that Paranoid (1970) and Master of Reality (1971) then codified into the foundation of heavy metal.',
      },
      {
        q: 'What drum kit did Bill Ward use on Paranoid?',
        a: 'On Paranoid (1970), Bill Ward played a Ludwig Vistalite — a clear acrylic kit with a 22" kick and 13"/16" toms — paired with a Ludwig Supraphonic 14"x6.5" LM402 snare and Paiste 2002 cymbals, including a massive 24" ride. The Vistalite\'s punchy, cutting attack matched the heavier riffing on Paranoid and Master of Reality.',
      },
      {
        q: 'Why did Bill Ward leave Black Sabbath?',
        a: 'Bill Ward departed Black Sabbath in 1980 following Never Say Die! (1978), amid escalating alcoholism and internal band tensions during the period that also saw Ozzy Osbourne\'s exit. He briefly returned for the Born Again tour (1983) and multiple Ozzfest reunions with the original lineup between 1997 and 2005, but did not appear on the band\'s 2013 album "13" or its 2016-2017 farewell tour due to contract disputes.',
      },
      {
        q: 'How did Bill Ward\'s drumming style change across his original Black Sabbath tenure?',
        a: 'Ward\'s style evolved from the loose, blues-rock-and-jazz foundation of the 1970 debut through the proto-metal invention of Paranoid and Master of Reality (1970-1971), into the progressive ambition of Vol. 4, Sabbath Bloody Sabbath, and Sabotage (1972-1975), and finally into the jazz-informed heaviness of Technical Ecstasy and Never Say Die! (1976-1979). Across the entire arc, his jazz vocabulary — dynamics, swing, and space — remained the constant thread.',
      },
    ],

    metaTitle: 'Bill Ward Drumming Evolution Timeline | How He Invented Heavy Metal Drums',
    metaDescription: 'How Bill Ward\'s drumming evolved from blues-rock roots to inventing heavy metal: Black Sabbath debut → Paranoid → Sabotage → Never Say Die!, the 1968-1979 arc that defined a genre, era by era.',
  },

  // ==========================================
  // Martin Lopez - Opeth / Soen
  // ==========================================
  'martin-lopez': {
    slug: 'martin-lopez',
    name: 'Martin Lopez',
    band: 'Opeth / Soen',
    totalYearsActive: '1996-Present',
    profileImage: '/images/drummers/martin-lopez.webp',
    summary: 'Martin Lopez brought a jazz- and classically-trained sensibility into progressive death metal, becoming the rhythmic architect behind Opeth\'s most celebrated albums before health issues forced his 2006 departure — a historical inflection point in the band\'s history. He returned in 2010 to co-found Soen, carrying his dynamic, song-serving philosophy into a new progressive metal vehicle.',

    eras: [
      {
        id: 'martin-lopez-1996-pre-opeth',
        era: 'Pre-Opeth / Amon Amarth Foundation',
        years: '1996-1997',
        startYear: 1996,
        endYear: 1997,
        description: 'Before joining Opeth, Martin Lopez began his professional career with Amon Amarth in 1996, bringing a jazz- and classically-trained background that was unusual among Swedish death metal drummers of the era. His brief tenure established the technical foundation — precise dynamics, ghost notes, and a feel for space — that would soon make him one of progressive death metal\'s most distinctive voices.',
        albums: ['Early Amon Amarth sessions and demos'],
        tours: ['Amon Amarth Swedish club dates 1996-1997'],
        image: null,

        gear: {
          drums: {
            item: 'Sonor Force Series',
            details: 'Beech/maple shells: 22" kick, 10"/12"/14" toms',
            notes: 'A standard professional Swedish death metal kit of the mid-1990s, chosen for durability and a balanced tone suited to both technical and brutal material.',
            change: null,
          },
          snare: {
            item: 'Sonor Force 14"x5.5" Steel',
            details: 'Standard steel shell',
            notes: 'A cutting, straightforward snare appropriate to the raw Swedish death metal production of the period.',
            change: null,
          },
          cymbals: {
            item: 'Zildjian A Series',
            details: '14" hi-hats, 16"/18" crashes, 20" ride',
            notes: 'Standard bright Zildjian setup typical of the scene, before his later move toward darker K Series tone.',
            change: null,
          },
          hardware: {
            item: 'Basic double pedal',
            details: 'Standard hardware',
            notes: 'Entry-level double bass setup appropriate to early-career Swedish death metal touring budgets.',
            change: null,
          },
          sticks: {
            item: 'Vic Firth 5A',
            details: 'Light hickory',
            notes: 'A lighter stick choice reflecting his jazz training and emphasis on touch over pure power, even this early in his career.',
            change: null,
          },
          heads: {
            item: 'Remo Ambassador',
            details: 'Standard configuration',
            notes: 'Basic head setup of the era.',
            change: null,
          },
        },

        estimatedCost: {
          original: 2200,
          inflationAdjusted: 4400,
          currency: 'USD',
        },

        keyChanges: [
          'Began professional career with Amon Amarth (1996)',
          'Jazz- and classically-trained background set him apart from peers',
          'Foundational technical vocabulary developed: dynamics, ghost notes, sense of space',
          'Left Amon Amarth in 1997 to join Opeth',
        ],

        quote: {
          text: 'I came from jazz and classical training, so even in death metal I was always thinking about dynamics and space, not just speed.',
          source: 'Close-Up Magazine, 1999',
        },

        videos: [],
      },

      {
        id: 'martin-lopez-1997-opeth-formative',
        era: 'Opeth Formative Era / Still Life',
        years: '1997-2001',
        startYear: 1997,
        endYear: 2001,
        description: 'Lopez joined Opeth in 1997, replacing original drummer Anders Nordin, and immediately stamped the band\'s progressive death metal sound with his dynamic, jazz-informed approach. My Arms, Your Hearse (1998) introduced his playing to Opeth\'s catalog, but it was Still Life (1999) and especially Blackwater Park (2001) — recorded with Porcupine Tree\'s Steven Wilson — that established him as one of the genre\'s most musically sophisticated drummers, seamlessly bridging brutal extremity and delicate acoustic passages within single songs.',
        albums: ['My Arms, Your Hearse (1998)', 'Still Life (1999)', 'Blackwater Park (2001)'],
        tours: ['Still Life European Tour 1999-2000', 'Blackwater Park World Tour 2001-2002'],
        image: null,

        gear: {
          drums: {
            item: 'Sonor Force Series',
            details: 'Beech/maple shells: 22" kick, 10"/12"/14"/16" toms',
            notes: 'Continued with Sonor into the Opeth era, the durable beech/maple combination suiting both the band\'s crushing death metal sections and its delicate acoustic interludes.',
            change: null,
          },
          snare: {
            item: 'Sonor Force 14"x6" Maple',
            details: 'Upgraded maple shell, warmer tone',
            notes: 'A warmer maple snare than his earlier steel shell, better suited to Opeth\'s wide dynamic range between brutality and beauty.',
            change: CHANGE_TYPES.UPGRADE,
          },
          cymbals: {
            item: 'Zildjian K Series',
            details: '14" K hi-hats, 16"/18" K crashes, 20" K ride',
            notes: 'Switched to the darker, more complex Zildjian K Series — a defining tonal shift that matched Opeth\'s progressive, jazz-tinged death metal identity.',
            change: CHANGE_TYPES.SWITCH,
          },
          hardware: {
            item: 'Double pedal, upgraded stands',
            details: 'Professional touring hardware',
            notes: 'Upgraded hardware for the demands of international touring behind Blackwater Park.',
            change: CHANGE_TYPES.UPGRADE,
          },
          sticks: {
            item: 'Vic Firth American Classic 5A',
            details: 'Consistent light hickory',
            notes: 'Maintained his light stick preference, prioritizing the ghost-note sensitivity and dynamic control central to his style.',
            change: null,
          },
          heads: {
            item: 'Remo Ambassador (toms), Coated Ambassador (snare)',
            details: 'Open, resonant configuration',
            notes: 'Open, sensitive heads suited to the dynamic range demanded by Opeth\'s genre-blending arrangements.',
            change: null,
          },
        },

        estimatedCost: {
          original: 4000,
          inflationAdjusted: 7000,
          currency: 'USD',
        },

        keyChanges: [
          'Joined Opeth (1997), replacing original drummer Anders Nordin',
          'My Arms, Your Hearse (1998) — first Opeth recording',
          'Still Life (1999) establishes his progressive death metal voice',
          'Blackwater Park (2001), recorded with Steven Wilson, becomes a genre masterpiece',
          'Switched to Zildjian K Series for darker, more complex cymbal tone',
        ],

        quote: {
          text: 'With Opeth, every song could go from total brutality to something almost like a lullaby. You had to be ready to switch your whole mindset in a bar or two.',
          source: 'Terrorizer Magazine, 2001',
        },

        videos: [],
      },

      {
        id: 'martin-lopez-2002-peak-versatility',
        era: 'Deliverance / Damnation - Peak Versatility',
        years: '2002-2003',
        startYear: 2002,
        endYear: 2003,
        description: 'Opeth\'s decision to record companion albums Deliverance (2002) and Damnation (2003) back-to-back put Lopez\'s range on full display: Deliverance demanded crushing, technical heaviness while Damnation, an entirely acoustic album produced once again with Steven Wilson, called for restraint, brushwork, and jazz-informed subtlety. Few drummers in metal have demonstrated such stylistic breadth within a single recording cycle, and this era is widely considered the high point of his technical versatility.',
        albums: ['Deliverance (2002)', 'Damnation (2003)'],
        tours: ['Deliverance/Damnation World Tour 2002-2003'],
        image: null,

        gear: {
          drums: {
            item: 'Sonor Force Series (expanded)',
            details: 'Beech/maple shells: 22" kick, 8"/10"/12"/14"/16" toms',
            notes: 'Expanded tom configuration for Deliverance\'s more complex arrangements, while the same kit was used with brushes and lighter tuning for the all-acoustic Damnation sessions.',
            change: CHANGE_TYPES.UPGRADE,
          },
          snare: {
            item: 'Sonor Force 14"x6" Maple + piccolo snare',
            details: 'Primary maple plus secondary piccolo for Damnation',
            notes: 'Added a piccolo snare specifically for Damnation\'s delicate, jazz-brushed passages — a clear sonic departure from Deliverance\'s heavier material.',
            change: CHANGE_TYPES.NEW,
          },
          cymbals: {
            item: 'Zildjian K Series',
            details: '14" K hi-hats, 16"/18" K crashes, 20" K ride',
            notes: 'Continued K Series setup, equally suited to Deliverance\'s heaviness and Damnation\'s subdued, atmospheric character.',
            change: null,
          },
          hardware: {
            item: 'Double pedal, upgraded stands',
            details: 'Continued professional touring hardware',
            notes: 'Unchanged from the previous era.',
            change: null,
          },
          sticks: {
            item: 'Vic Firth American Classic 5A + brushes',
            details: 'Sticks plus wire brushes for Damnation',
            notes: 'Added wire brushes specifically for Damnation\'s acoustic sessions — a first in his recorded output with Opeth.',
            change: CHANGE_TYPES.NEW,
          },
          heads: {
            item: 'Remo Ambassador (toms), Coated Ambassador (snare)',
            details: 'Open, sensitive configuration',
            notes: 'Maintained for maximum tonal nuance across both companion albums.',
            change: null,
          },
        },

        estimatedCost: {
          original: 5000,
          inflationAdjusted: 8200,
          currency: 'USD',
        },

        keyChanges: [
          'Deliverance (2002) and Damnation (2003) recorded as companion albums in a single cycle',
          'Damnation is Opeth\'s first entirely acoustic album, again produced with Steven Wilson',
          'Added piccolo snare and wire brushes specifically for Damnation\'s subdued character',
          'Widely regarded as the peak demonstration of his stylistic versatility',
        ],

        quote: {
          text: 'Damnation was almost harder than Deliverance in a way — you had nowhere to hide. Every brush stroke had to mean something.',
          source: 'Modern Drummer Magazine, 2003',
        },

        videos: [],
      },

      {
        id: 'martin-lopez-2004-ghost-reveries-departure',
        era: 'Ghost Reveries / Departure',
        years: '2004-2006',
        startYear: 2004,
        endYear: 2006,
        description: 'Ghost Reveries (2005) became Lopez\'s final album with Opeth — widely considered one of the band\'s defining records and a high point of his recorded work, blending death metal heaviness with progressive, almost cinematic arrangements. Mounting health issues, including panic disorder, forced his departure from the band in 2006, a moment that marks a historical inflection point in Opeth\'s history and opened the door for his eventual successor, Martin Axenrot.',
        albums: ['Ghost Reveries (2005)'],
        tours: ['Ghost Reveries World Tour 2005-2006'],
        image: null,

        gear: {
          drums: {
            item: 'Sonor Force Series (mature configuration)',
            details: 'Beech/maple shells: 22" kick, 8"/10"/12"/14"/16" toms',
            notes: 'Final Opeth-era configuration of his long-running Sonor setup, refined across nearly a decade with the band.',
            change: null,
          },
          snare: {
            item: 'Sonor Force 14"x6" Maple',
            details: 'Signature warm maple tone',
            notes: 'The snare sound that had defined his entire Opeth tenure, unchanged for Ghost Reveries.',
            change: null,
          },
          cymbals: {
            item: 'Zildjian K Series (expanded)',
            details: '14" K hi-hats, 16"/18"/19" K crashes, 20" K ride, 18" K China',
            notes: 'Added a China cymbal for the more cinematic, textured arrangements on Ghost Reveries.',
            change: CHANGE_TYPES.NEW,
          },
          hardware: {
            item: 'Double pedal, professional touring hardware',
            details: 'Mature, stable setup',
            notes: 'Unchanged from previous eras — the rig was fully developed by this point.',
            change: null,
          },
          sticks: {
            item: 'Vic Firth American Classic 5A',
            details: 'Consistent light hickory',
            notes: 'Career-long preference maintained through his final Opeth recording.',
            change: null,
          },
          heads: {
            item: 'Remo Ambassador (toms), Coated Ambassador (snare)',
            details: 'Stable mature configuration',
            notes: 'Unchanged through the end of his Opeth tenure.',
            change: null,
          },
        },

        estimatedCost: {
          original: 5500,
          inflationAdjusted: 8500,
          currency: 'USD',
        },

        keyChanges: [
          'Ghost Reveries (2005) — widely considered an Opeth high point and his finest recorded work',
          'Added China cymbal for the album\'s more cinematic arrangements',
          'Health issues, including panic disorder, force his departure from Opeth in 2006',
          'Departure marks a historical inflection point, leading to successor Martin Axenrot',
        ],

        quote: {
          text: 'Ghost Reveries was some of the best work I ever did, but my health just couldn\'t keep up with the demands anymore. It was the hardest decision of my career.',
          source: 'Decibel Magazine retrospective, 2010',
        },

        videos: [],
      },

      {
        id: 'martin-lopez-2010-soen-era',
        era: 'Soen Era / Progressive Metal Reinvention',
        years: '2010-Present',
        startYear: 2010,
        endYear: 2026,
        description: 'After several years away from recording, Lopez returned in 2010 to co-found Soen alongside bassist Steve Di Giorgio, creating a new vehicle for his progressive vision. Across Cognitive (2012), Lykaia (2017), and subsequent albums through Memorial (2024), Lopez has continued to showcase the dynamic, jazz-informed musicality that distinguished his Opeth work, now built around a Noble & Cooley kit and a mature, song-first philosophy that prioritizes feel over technical display.',
        albums: ['Soen: Cognitive (2012)', 'Soen: Lykaia (2017)', 'Soen: Memorial (2024)'],
        tours: ['Soen World Tours 2012-Present'],
        image: null,

        gear: {
          drums: {
            item: 'Noble & Cooley Walnut',
            details: 'Walnut shells: 22" kick, 10"/12"/14"/16" toms',
            notes: 'Switched to boutique American maker Noble & Cooley for Soen — walnut shells deliver a warmer, more focused tone reflecting his mature, song-first approach.',
            change: CHANGE_TYPES.SWITCH,
          },
          snare: {
            item: 'Noble & Cooley Solid Shell 14"x6" Maple',
            details: 'Solid maple shell, rich tone',
            notes: 'A premium solid-shell snare for maximum tonal richness in Soen\'s progressive metal arrangements.',
            change: CHANGE_TYPES.SWITCH,
          },
          cymbals: {
            item: 'Zildjian K Dark Series',
            details: '14" K Dark Thin hi-hats, 18"/20" K Dark Medium Thin crashes, 22" K Dark Light ride, 18" K China',
            notes: 'Upgraded to the darker K Dark line for an even more complex, mature overtone structure suited to Soen\'s atmospheric progressive sound.',
            change: CHANGE_TYPES.UPGRADE,
          },
          hardware: {
            item: 'Axis Percussion Double Pedal, DW 9100 Throne',
            details: 'Premium modern hardware',
            notes: 'Upgraded to Axis Percussion\'s precision double pedal for refined response in Soen\'s technical passages.',
            change: CHANGE_TYPES.UPGRADE,
          },
          sticks: {
            item: 'Vic Firth American Classic 5A',
            details: 'Career-long light hickory',
            notes: 'Unchanged since his earliest professional years — control and touch remain the priority.',
            change: null,
          },
          heads: {
            item: 'Remo (Ambassador toms, coated snare)',
            details: 'Open, resonant configuration',
            notes: 'Consistent with his career-long preference for open, dynamic head tuning.',
            change: null,
          },
        },

        estimatedCost: {
          original: 9000,
          inflationAdjusted: 11000,
          currency: 'USD',
        },

        keyChanges: [
          'Co-founded Soen (2010) with bassist Steve Di Giorgio after recovering from health issues',
          'Switched to Noble & Cooley — a boutique American kit reflecting his mature aesthetic',
          'Cognitive (2012) through Memorial (2024) showcase continued progressive evolution',
          'Maintains jazz-informed, song-first philosophy established during the Opeth years',
          'Recognized as one of progressive metal\'s most musically tasteful drummers',
        ],

        quote: {
          text: 'Less is more. The spaces between the notes are just as important as the notes themselves.',
          source: 'Modern Drummer Magazine, 2014',
        },

        videos: [],
      },
    ],

    faqs: [
      {
        q: 'Who was Opeth\'s original drummer?',
        a: 'Opeth\'s original drummer was Anders Nordin, who played on the band\'s debut album Orchid (1995). Martin Lopez joined in 1997, replacing Nordin, and went on to record My Arms, Your Hearse (1998) through Ghost Reveries (2005) — the run of albums most associated with Opeth\'s classic progressive death metal sound. Lopez departed in 2006 due to health issues and was succeeded by Martin Axenrot.',
      },
      {
        q: 'How did Martin Lopez influence Opeth\'s progressive sound?',
        a: 'Martin Lopez brought a jazz- and classically-trained sensibility to Opeth, emphasizing dynamics, ghost notes, and seamless transitions between extreme death metal heaviness and delicate acoustic passages. His playing on Still Life (1999), Blackwater Park (2001), the companion albums Deliverance/Damnation (2002-2003), and Ghost Reveries (2005) helped define the dynamic, genre-blending identity that made Opeth one of progressive metal\'s most influential bands.',
      },
      {
        q: 'Why did Martin Lopez leave Opeth?',
        a: 'Martin Lopez departed Opeth in 2006 due to health issues, including panic disorder, that made it impossible to continue meeting the demands of touring and recording. His final album with the band was Ghost Reveries (2005), widely regarded as one of Opeth\'s defining records. He was succeeded by drummer Martin Axenrot.',
      },
      {
        q: 'What did Martin Lopez do after leaving Opeth?',
        a: 'After several years away from recording, Martin Lopez returned in 2010 to co-found the progressive metal band Soen alongside bassist Steve Di Giorgio. Soen has released albums including Cognitive (2012), Lykaia (2017), and Memorial (2024), continuing Lopez\'s dynamic, jazz-informed approach in a new musical context.',
      },
    ],

    metaTitle: 'Martin Lopez Drumming Evolution Timeline | Opeth & Soen Career History',
    metaDescription: 'How Martin Lopez\'s drumming evolved from jazz-trained roots to Opeth\'s progressive death metal peak and beyond: Still Life → Blackwater Park → Ghost Reveries → Soen, era by era.',
  },

  // ==========================================
  // Raymond Herrera - Fear Factory (1990-2009)
  // ==========================================
  'raymond-herrera': {
    slug: 'raymond-herrera',
    name: 'Raymond Herrera',
    band: 'Fear Factory',
    totalYearsActive: '1989-2009',
    profileImage: '/images/drummers/raymond-herrera.webp',
    summary: 'Raymond Herrera co-founded Fear Factory in Los Angeles in 1990 and, across nearly two decades, built the blueprint for industrial metal drumming — fusing hardcore punk aggression with electronic trigger precision to create the "machine-like" double-bass sound that defined Demanufacture and Obsolete.',

    eras: [
      {
        id: 'raymond-herrera-1989-roots',
        era: 'Brujeria / Pre-Fear Factory Roots',
        years: '1989–1990',
        startYear: 1989,
        endYear: 1990,
        description: 'Before co-founding Fear Factory, Raymond Herrera cut his teeth in the Los Angeles hardcore and death metal underground, joining Brujeria as a founding member in 1989. This period established the relentless, rhythmically aggressive foundation — rooted in Discharge-style hardcore punk and the thrash precision of Dave Lombardo — that he would later channel into industrial metal.',
        albums: ['Brujeria — early demos and formative sessions'],
        tours: ['Los Angeles underground hardcore/death metal circuit'],
        image: null,

        gear: {
          drums: {
            item: 'Entry-level maple kit',
            details: '22" kick, 12"/13"/16" toms',
            notes: 'Standard budget kit typical of the late-1980s LA underground scene — durable enough for relentless hardcore-influenced rehearsal and gigging.',
            change: null,
          },
          snare: {
            item: 'Steel shell 14"×5.5"',
            details: 'Bright, cutting steel snare',
            notes: 'Punchy steel snare suited to hardcore punk\'s rhythmic attack.',
            change: null,
          },
          cymbals: {
            item: 'Zildjian A Series',
            details: '14" hi-hats, 16"/18" crashes, 20" ride',
            notes: 'Standard A Series setup — reliable and affordable for an emerging underground player.',
            change: null,
          },
          hardware: {
            item: 'Single bass pedal, mixed stands',
            details: 'Entry-level hardware',
            notes: 'Single kick configuration — double bass and triggering were still years away.',
            change: null,
          },
          sticks: {
            item: 'Vater Power 5B',
            details: 'Heavy hickory for maximum impact',
            notes: 'Heavier stick choice that would remain a constant through his entire career.',
            change: null,
          },
          heads: {
            item: 'Remo Ambassador',
            details: 'Clear on toms, coated on snare',
            notes: 'Standard entry-level configuration.',
            change: null,
          },
        },

        estimatedCost: {
          original: 1800,
          inflationAdjusted: 4500,
          currency: 'USD',
        },

        keyChanges: [
          'Joined Brujeria as a founding member (1989) — Los Angeles underground roots',
          'Hardcore punk and thrash influences (Discharge, Dave Lombardo) establish foundation',
          'Single-kick, all-acoustic setup — no triggering yet',
          'Co-founded Fear Factory in Los Angeles (1990)',
        ],

        quote: {
          text: "Before Fear Factory, it was all hardcore and thrash. That relentless, no-let-up energy — that\'s what I brought into the industrial sound later.",
          source: 'Modern Drummer Interview, 1997',
        },

        videos: [],
      },

      {
        id: 'raymond-herrera-1990-soul-of-a-new-machine',
        era: 'Soul of a New Machine Era',
        years: '1990–1994',
        startYear: 1990,
        endYear: 1994,
        description: 'Fear Factory\'s 1992 debut Soul of a New Machine introduced Herrera\'s emerging industrial-influenced approach — acoustic drums pushed toward mechanical precision, with early experiments in triggering that hinted at the fully realized hybrid system to come. The band\'s fusion of death metal aggression with industrial electronic texture began taking shape during this formative period.',
        albums: ['Soul of a New Machine (1992)'],
        tours: ['Soul of a New Machine touring 1992–1994', 'Early club and festival dates'],
        image: null,

        gear: {
          drums: {
            item: 'Pearl Export Series',
            details: 'Maple/poplar shells: 22" kick, 12"/13"/16" toms',
            notes: 'Upgraded to Pearl as Fear Factory signed with Roadrunner Records — more consistent shells for studio recording.',
            change: CHANGE_TYPES.SWITCH,
          },
          snare: {
            item: 'Pearl Custom 14"×6.5"',
            details: 'Steel shell, deeper and louder',
            notes: 'Deeper Pearl snare for more projection in the band\'s emerging dense production.',
            change: CHANGE_TYPES.UPGRADE,
          },
          cymbals: {
            item: 'Zildjian A Custom Series',
            details: '14" hi-hats, 16"/18" crashes, 20" ride',
            notes: 'Brighter A Custom cymbals to cut through Soul of a New Machine\'s aggressive guitar tone.',
            change: CHANGE_TYPES.UPGRADE,
          },
          hardware: {
            item: 'Pearl Eliminator Double Pedal',
            details: 'Cam-driven double pedal',
            notes: 'Added double kick configuration — the start of the machine-gun double-bass approach that would define his style.',
            change: CHANGE_TYPES.NEW,
          },
          sticks: {
            item: 'Vater Power 5B',
            details: 'Continued heavy hickory choice',
            notes: 'Maintained heavy sticks for power and durability.',
            change: null,
          },
          heads: {
            item: 'Remo Pinstripe',
            details: 'Double-ply for durability and focused attack',
            notes: 'Switched to Pinstripe for a tighter, more controlled tone suited to the band\'s mechanical aesthetic.',
            change: CHANGE_TYPES.UPGRADE,
          },
        },

        estimatedCost: {
          original: 4500,
          inflationAdjusted: 9500,
          currency: 'USD',
        },

        keyChanges: [
          'Fear Factory signed to Roadrunner Records',
          'Soul of a New Machine (1992) — genre-defining debut',
          'Upgraded to Pearl Export Series and added double bass pedal',
          'Early industrial-metal hybrid drumming concept begins forming',
        ],

        quote: {
          text: "We knew we wanted something mechanical, something that didn\'t sound human. Soul of a New Machine was the first step toward figuring out how to actually do that live.",
          source: 'Metal Maniacs Interview, 1993',
        },

        videos: [],
      },

      {
        id: 'raymond-herrera-1995-demanufacture-obsolete',
        era: 'Demanufacture / Obsolete Era',
        years: '1995–2001',
        startYear: 1995,
        endYear: 2001,
        description: 'Demanufacture (1995) and Obsolete (1998) are the records that defined industrial metal drumming. Herrera moved to Pearl Reference Series and built out a full ddrum/Roland trigger system across kick, snare, and toms — fusing acoustic shell resonance with electronically processed samples to create the "machine-like" precision that became Fear Factory\'s signature. Digimortal (2001) extended this hybrid approach into the band\'s commercial peak.',
        albums: ['Demanufacture (1995)', 'Obsolete (1998)', 'Digimortal (2001)'],
        tours: ['Demanufacture World Tour 1995–1996', 'Ozzfest 1997, 1999, 2001', 'Obsolete World Tour 1998–1999'],
        image: null,

        gear: {
          drums: {
            item: 'Pearl Reference Series',
            details: 'Maple shells: dual 22" kicks, 10"/12"/14"/16" toms — fully triggered',
            notes: 'Pearl Reference maple shells provided the consistent acoustic foundation needed for reliable trigger response — essential for Demanufacture\'s machine-gun double-kick passages.',
            change: CHANGE_TYPES.UPGRADE,
          },
          snare: {
            item: 'Pearl Custom 14"×6.5" (triggered)',
            details: 'Steel shell with integral trigger',
            notes: 'Triggered snare let producers Ross Robinson and Rhys Fulber layer a processed, mechanical sample over the acoustic crack — the defining Fear Factory snare sound.',
            change: CHANGE_TYPES.UPGRADE,
          },
          cymbals: {
            item: 'Zildjian Z Custom Series',
            details: '14" hi-hats, 16"/18" crashes, 20" ride',
            notes: 'Switched to bright, machine-hammered Z Custom for maximum cut and touring durability against Fear Factory\'s heavily processed industrial guitar wall.',
            change: CHANGE_TYPES.SWITCH,
          },
          hardware: {
            item: 'Pearl Eliminator Double Pedal',
            details: 'Refined cam-driven double pedal',
            notes: 'Continued and refined Eliminator double pedal driving the machine-gun double-kick patterns at the heart of "Replica" and the Demanufacture title track.',
            change: null,
          },
          sticks: {
            item: 'Vater Power 5B',
            details: 'Continued heavy hickory choice',
            notes: 'Maintained heavy sticks for the high-impact triggered playing this era demanded.',
            change: null,
          },
          heads: {
            item: 'Remo Pinstripe (batter), Remo Ambassador Coated (snare)',
            details: 'Trigger sensors fitted to batter heads',
            notes: 'Head configuration optimized to give the trigger sensors a clean, consistent signal across kick, snare, and toms.',
            change: CHANGE_TYPES.UPGRADE,
          },
          electronics: {
            item: 'ddrum / Roland Trigger System',
            details: 'Full kit triggering — kick, snare, and toms',
            notes: 'Comprehensive ddrum and Roland module triggering across the entire kit — the core innovation that defined industrial metal\'s "machine-like" drum sound.',
            change: CHANGE_TYPES.NEW,
          },
        },

        estimatedCost: {
          original: 9500,
          inflationAdjusted: 18000,
          currency: 'USD',
        },

        keyChanges: [
          'Demanufacture (1995) — landmark industrial metal album; pioneered triggered machine-gun bass drum sound',
          'Obsolete (1998) — Fear Factory\'s commercial peak',
          'Digimortal (2001) — featuring hit single "Linchpin"',
          'Full ddrum/Roland trigger system built out across kick, snare, and toms',
          'Switched to Zildjian Z Custom for durability and cutting power on extensive touring',
          'Ozzfest appearances (1997, 1999, 2001) — major festival exposure',
        ],

        quote: {
          text: "Every drum was triggered — kick, snare, toms. That was the only way to get that consistent, mechanical sound night after night. It wasn\'t about replacing the playing, it was about making the playing sound exactly the same every single time.",
          source: 'Rhythm Magazine Interview, 1999',
        },

        videos: [],
      },

      {
        id: 'raymond-herrera-2002-archetype-departure',
        era: 'Archetype / Transgression / Departure Era',
        years: '2002–2009',
        startYear: 2002,
        endYear: 2009,
        description: 'After Fear Factory\'s 2002 split and 2003 reunion, Herrera continued refining the hybrid trigger system through Archetype (2004) and Transgression (2005), while also drumming for Brujeria and co-founding Arkaea with Christian Olde Wolbers in 2008. His departure from Fear Factory in 2009 closed out a nearly two-decade run as the architect of industrial metal\'s signature drum sound.',
        albums: ['Archetype (2004)', 'Transgression (2005)', 'Arkaea: Years in the Darkness (2009)'],
        tours: ['Archetype reunion tour 2004–2005', 'Demanufacture Anniversary Tour 2005', 'Final Fear Factory dates 2008–2009'],
        image: null,

        gear: {
          drums: {
            item: 'Pearl Reference Series (refined)',
            details: 'Maple shells, dual kick, fully triggered',
            notes: 'Continued Pearl Reference platform with refined trigger module integration for the band\'s post-reunion material.',
            change: null,
          },
          snare: {
            item: 'Pearl Custom 14"×6.5" (triggered)',
            details: 'Consistent triggered steel snare',
            notes: 'Maintained the triggered snare setup that had defined Fear Factory\'s sound since Demanufacture.',
            change: null,
          },
          cymbals: {
            item: 'Zildjian Z Custom Series (continued)',
            details: '14" hi-hats, 16"/18" crashes, 20" ride',
            notes: 'Continued Z Custom durability-focused setup through the final touring years.',
            change: null,
          },
          hardware: {
            item: 'Pearl Eliminator Double Pedal (continued)',
            details: 'Reliable cam-driven double pedal',
            notes: 'Same proven Eliminator platform that drove his signature double-kick patterns for over a decade.',
            change: null,
          },
          sticks: {
            item: 'Vater Power 5B (continued)',
            details: 'Long-running Vater endorsement',
            notes: 'Consistent stick choice maintained across his entire Fear Factory tenure.',
            change: null,
          },
          heads: {
            item: 'Remo Pinstripe / Ambassador (continued)',
            details: 'Trigger-optimized head configuration',
            notes: 'Unchanged head setup — already optimized for clean trigger response.',
            change: null,
          },
          electronics: {
            item: 'ddrum / Roland Trigger System (refined)',
            details: 'Refined full-kit triggering',
            notes: 'Continued refinement of the trigger system across Archetype and Transgression, plus side work with Brujeria and the founding of Arkaea.',
            change: CHANGE_TYPES.UPGRADE,
          },
        },

        estimatedCost: {
          original: 11000,
          inflationAdjusted: 16500,
          currency: 'USD',
        },

        keyChanges: [
          'Fear Factory split (2002) and reunion (2003)',
          'Archetype (2004) — acclaimed return-to-form record',
          'Transgression (2005) — final studio album of this era',
          'Co-founded Arkaea with Christian Olde Wolbers (2008) following another Fear Factory split',
          'Departed Fear Factory officially in 2009, closing out his founding-member tenure',
        ],

        quote: {
          text: "I gave that band almost twenty years. Every record, we tried to push the machine sound further without losing what made it human in the first place.",
          source: 'Blabbermouth Interview, 2009',
        },

        videos: [],
      },
    ],

    faqs: [
      {
        q: 'What drum kit did Raymond Herrera use in Fear Factory?',
        a: 'Raymond Herrera played a Pearl Reference Series kit — maple shells configured with dual 22" kick drums and 10"/12"/14"/16" toms, every piece fitted with ddrum and Roland triggers. He moved to Pearl Reference for the Demanufacture era after starting on a Pearl Export Series kit during Soul of a New Machine.',
      },
      {
        q: 'What cymbals did Raymond Herrera play?',
        a: 'Herrera played Zildjian Z Custom cymbals — bright, machine-hammered B20 bronze chosen for maximum cut through Fear Factory\'s heavily processed industrial guitar wall and for durability across extensive touring. He used Zildjian A and A Custom cymbals earlier in his career before switching to Z Custom around the Demanufacture era.',
      },
      {
        q: 'Why did Raymond Herrera use drum triggers?',
        a: 'Herrera built a full ddrum and Roland trigger system across his kick, snare, and toms to create the "machine-like" precision that defined Fear Factory\'s industrial metal sound. Producers Ross Robinson (Demanufacture) and Rhys Fulber (Obsolete) used the triggered signals to layer processed, electronic samples over his acoustic playing — fusing human performance with mechanical consistency.',
      },
      {
        q: 'When did Raymond Herrera leave Fear Factory?',
        a: 'Raymond Herrera officially departed Fear Factory in 2009, after co-founding the band in 1990 and recording every studio album from Soul of a New Machine (1992) through Transgression (2005). He had also co-founded the side project Arkaea with former Fear Factory guitarist Christian Olde Wolbers in 2008.',
      },
      {
        q: 'What other bands did Raymond Herrera play in?',
        a: 'Before and during his time in Fear Factory, Herrera was a founding member of Brujeria (joined 1989). After leaving Fear Factory in 2009, he had already co-founded Arkaea (2008) with Christian Olde Wolbers, releasing the album Years in the Darkness (2009).',
      },
    ],

    metaTitle: 'Raymond Herrera Gear Evolution Timeline | Fear Factory Drum Kit History',
    metaDescription: 'Explore Raymond Herrera\'s complete drum gear evolution: Brujeria roots → Pearl Export (Soul of a New Machine) → Pearl Reference triggered hybrid kit (Demanufacture/Obsolete) → Archetype-era refinement. The architect of industrial metal drumming, era by era.',
  },

  // ==========================================
  // Art Cruz - Lamb of God (2008-Present)
  // ==========================================
  'art-cruz': {
    slug: 'art-cruz',
    name: 'Art Cruz',
    band: 'Lamb of God',
    totalYearsActive: '2008-Present',
    profileImage: '/images/drummers/art-cruz.webp',
    summary: 'Art Cruz built his chops in the deathcore and industrial-groove underground with Winds of Plague and Prong before being handed one of metal\'s most demanding drum chairs — succeeding Chris Adler in Lamb of God. His gear evolution tracks that journey from developing-years budget kits to the Ludwig/Zildjian/Trick rig powering "Omens" and beyond.',

    eras: [
      {
        id: 'art-cruz-2008-winds-of-plague-prong',
        era: 'Winds of Plague / Prong Era',
        years: '2008–2018',
        startYear: 2008,
        endYear: 2018,
        description: 'Before Lamb of God, Art Cruz spent a decade in the deathcore and industrial-metal trenches. He powered Winds of Plague\'s symphonic deathcore assault through The Great Stone War, Against the World, and Blood of My Enemy, building the touring stamina and aggressive double-bass stamina that would later define his groove metal approach. A parallel run with Tommy Victor\'s Prong (Songs from the Black Hole, X – No Absolutes, Zero Days) added industrial-metal precision and a different rhythmic vocabulary to his playing.',
        albums: ['The Great Stone War (2009)', 'Against the World (2011)', 'Zero Days (2017)'],
        tours: ['Winds of Plague touring cycle 2008–2018', 'Prong club and festival dates 2012–2018'],
        image: null,

        gear: {
          drums: {
            item: 'Entry-level maple/birch kits',
            details: 'Various developing-years kits, 22" kick, standard tom config',
            notes: 'No fixed endorsement yet — Cruz cycled through whatever kits were available on deathcore and club-circuit tours.',
            change: null,
          },
          snare: {
            item: 'Steel shell 14"×6.5"',
            details: 'Standard steel snare for cutting through dense breakdowns',
            notes: 'Generic steel snare typical of the deathcore underground — punch over polish.',
            change: null,
          },
          cymbals: {
            item: 'Various brands (pre-Zildjian)',
            details: 'Mixed setups before establishing a cymbal endorsement',
            notes: 'Developing the bright, cutting preferences that would later become a full Zildjian setup with Lamb of God.',
            change: null,
          },
          hardware: {
            item: 'Standard double pedal, mixed stands',
            details: 'Entry-level double bass pedal',
            notes: 'Building the rapid-fire double-kick stamina that Winds of Plague and Prong both demanded nightly.',
            change: null,
          },
          sticks: {
            item: 'Vic Firth 5B',
            details: 'Heavy hickory for maximum impact',
            notes: 'Stick choice that would carry through to his Lamb of God years.',
            change: null,
          },
          heads: {
            item: 'Remo Ambassador / Pinstripe',
            details: 'Durable double-ply heads for relentless touring',
            notes: 'Durability-first head selection for the grueling deathcore and club touring circuit.',
            change: null,
          },
        },

        estimatedCost: {
          original: 2200,
          inflationAdjusted: 2800,
          currency: 'USD',
        },

        keyChanges: [
          'Joined Winds of Plague (2008) — symphonic deathcore touring stamina built here',
          'The Great Stone War, Against the World, Blood of My Enemy — Winds of Plague catalog',
          'Parallel run in Tommy Victor\'s Prong (2012–2018) — Songs from the Black Hole, X – No Absolutes, Zero Days',
          'No fixed gear endorsements yet — developing preferences across both bands',
        ],

        quote: {
          text: 'Winds of Plague and Prong taught me how to survive a tour bus and a stage every single night. That stamina is the foundation everything else got built on.',
          source: 'Drum! Magazine Interview, 2021',
        },

        videos: [],
      },

      {
        id: 'art-cruz-2018-fill-in',
        era: 'Lamb of God Fill-In Era',
        years: '2018–2019',
        startYear: 2018,
        endYear: 2019,
        description: 'When Chris Adler stepped back from touring in 2018, Lamb of God needed a drummer who could learn one of groove metal\'s most technically demanding catalogs on short notice. Cruz filled in on the band\'s 2018 North American tour supporting Slayer\'s farewell run, mastering Adler\'s intricate parts in weeks. The fill-in gig became a permanent position in 2019 — beginning his Zildjian endorsement and his search for a reliable double-pedal platform.',
        albums: ['Live performances of Lamb of God\'s back catalog (fill-in dates)'],
        tours: ['Slayer Final Campaign — North American Support Dates (2018)'],
        image: null,

        gear: {
          drums: {
            item: 'Transitional Ludwig setup',
            details: 'Early Ludwig configuration ahead of permanent endorsement',
            notes: 'Began moving toward the Ludwig Classic Maple platform he would adopt as a full member.',
            change: CHANGE_TYPES.SWITCH,
          },
          snare: {
            item: 'Ludwig 14"×6.5" (early)',
            details: 'Maple or brass shell, medium-high tuning',
            notes: 'Establishing the snare voice needed to cut through Mark Morton and Willie Adler\'s guitar wall.',
            change: CHANGE_TYPES.NEW,
          },
          cymbals: {
            item: 'Zildjian A Custom',
            details: 'Hi-hats, crashes, ride established during fill-in dates',
            notes: 'Zildjian endorsement begins — bright, articulate cymbals for Lamb of God\'s dense arrangements.',
            change: CHANGE_TYPES.NEW,
          },
          hardware: {
            item: 'Trick Pro 1-V Bigfoot (early adoption)',
            details: 'Direct-drive double pedal',
            notes: 'Establishing the Trick pedal preference needed to handle Chris Adler\'s notoriously intricate kick patterns on a single bass drum.',
            change: CHANGE_TYPES.NEW,
          },
          sticks: {
            item: 'Vic Firth 5B',
            details: 'Continued heavy hickory choice',
            notes: 'Unchanged from his Winds of Plague/Prong years.',
            change: null,
          },
          heads: {
            item: 'Evans G2 Coated / EMAD2',
            details: 'Transitioning to Evans for the Lamb of God sound',
            notes: 'Began adopting Evans heads to match the punchy, controlled low end LOG\'s production demands.',
            change: CHANGE_TYPES.NEW,
          },
        },

        estimatedCost: {
          original: 3500,
          inflationAdjusted: 4000,
          currency: 'USD',
        },

        keyChanges: [
          'Filled in for Chris Adler on Lamb of God\'s 2018 Slayer farewell support dates',
          'Learned Adler\'s catalog of intricate parts in a matter of weeks',
          'Fill-in role became a permanent position in 2019',
          'Zildjian cymbal and Trick pedal endorsements established during this transition',
        ],

        quote: {
          text: 'I didn\'t want to be Chris Adler 2.0. I wanted to learn his parts with respect but bring my own energy to them.',
          source: 'Modern Drummer, 2020',
        },

        videos: [],
      },

      {
        id: 'art-cruz-2020-lamb-of-god',
        era: 'Lamb of God Era',
        years: '2019–Present',
        startYear: 2019,
        endYear: 2026,
        description: 'As Lamb of God\'s full-time drummer, Cruz anchored the band\'s 2020 self-titled album and 2022\'s "Omens" — proving himself a worthy successor to one of metal\'s most iconic drum seats. His settled rig centers on a Ludwig Classic Maple kit for warm, punchy tone, a full Zildjian A Custom cymbal setup for cutting articulation, and a Trick Pro 1-V Bigfoot double pedal driving a single bass drum through Adler\'s complex patterns and his own powerful footwork.',
        albums: ['Lamb of God (2020)', 'Omens (2022)'],
        tours: ['Lamb of God World Tour 2020–2022', 'Omens World Tour 2022–2023'],
        image: null,

        gear: {
          drums: {
            item: 'Ludwig Classic Maple',
            details: '22"×18" kick, 10"/12" rack toms, 14"/16" floor toms',
            notes: 'Warm, punchy maple shells that complement Lamb of God\'s down-tuned groove metal sound while staying articulate for Cruz\'s functional, song-serving fills.',
            change: CHANGE_TYPES.SIGNATURE,
          },
          snare: {
            item: 'Ludwig 14"×6.5" (maple or brass)',
            details: 'Medium-high tuning for punch and articulation',
            notes: 'The crack that punctuates Lamb of God\'s syncopated riffs — present and authoritative without losing groove feel.',
            change: CHANGE_TYPES.UPGRADE,
          },
          cymbals: {
            item: 'Zildjian A Custom Series',
            details: '14" hi-hats, 17"/18"/19" crashes, 21" ride, 18" China, 10" splash',
            notes: 'Full A Custom setup chosen for brightness and projection against Lamb of God\'s down-tuned 7-string guitar wall.',
            change: CHANGE_TYPES.UPGRADE,
          },
          hardware: {
            item: 'Trick Pro 1-V Bigfoot Double Pedal',
            details: 'Direct-drive single-kick double pedal, Gibraltar stands and throne',
            notes: 'Direct-drive action provides the instantaneous response needed to execute Chris Adler\'s legacy patterns plus Cruz\'s own footwork — on a single bass drum rather than Adler\'s double-kick setup.',
            change: CHANGE_TYPES.SIGNATURE,
          },
          sticks: {
            item: 'Vic Firth 5B / Power 5B',
            details: 'Heavy hickory for balance of speed and power',
            notes: 'Continued from his developing years — the consistent stick choice across his whole career.',
            change: null,
          },
          heads: {
            item: 'Evans G2 Coated / EMAD2',
            details: 'G2 Coated on snare and toms, EMAD2 on kick batter',
            notes: 'Controlled, punchy low end essential for cutting through Lamb of God\'s dense, layered production.',
            change: CHANGE_TYPES.UPGRADE,
          },
        },

        estimatedCost: {
          original: 7500,
          inflationAdjusted: 7500,
          currency: 'USD',
        },

        keyChanges: [
          'Became Lamb of God\'s official drummer (2019), succeeding Chris Adler',
          'Lamb of God (2020) — first studio album as a full member',
          'Omens (2022) — proved full integration into the band\'s sound and identity',
          'Settled on Ludwig Classic Maple, Zildjian A Custom, and Trick Pro 1-V Bigfoot as his signature rig',
        ],

        quote: {
          text: 'When you join a band like Lamb of God, you\'re not just filling a drum seat — you\'re becoming part of a legacy.',
          source: 'Metal Hammer, 2022',
        },

        videos: [],
      },
    ],

    faqs: [
      {
        q: 'Who replaced Chris Adler in Lamb of God?',
        a: 'Art Cruz replaced Chris Adler as Lamb of God\'s drummer. Cruz first filled in for Adler on the band\'s 2018 North American tour supporting Slayer\'s farewell run, and the role became permanent in 2019. His studio debut with the band was the self-titled "Lamb of God" album (2020).',
      },
      {
        q: 'What drum kit does Art Cruz play?',
        a: 'Art Cruz plays a Ludwig Classic Maple kit — a 22"×18" bass drum with a 10"/12" rack tom and 14"/16" floor tom configuration. The warm maple shells suit Lamb of God\'s down-tuned groove metal sound while staying articulate for his arrangement-focused fills.',
      },
      {
        q: 'What cymbals and pedals does Art Cruz use?',
        a: 'Cruz is a Zildjian A Custom Series cymbal endorser, running 14" hi-hats, multiple crashes (17"–19"), a 21" ride, an 18" China, and a 10" splash. His double bass patterns are driven by a Trick Pro 1-V Bigfoot direct-drive pedal on a single kick drum, rather than the double-kick setup his predecessor Chris Adler used.',
      },
      {
        q: 'What bands did Art Cruz play in before Lamb of God?',
        a: 'Before joining Lamb of God, Art Cruz spent roughly a decade in the deathcore and industrial-metal underground — drumming for Winds of Plague (The Great Stone War, Against the World, Blood of My Enemy) and for Tommy Victor\'s Prong (Songs from the Black Hole, X – No Absolutes, Zero Days).',
      },
      {
        q: 'What was Art Cruz\'s first album with Lamb of God?',
        a: 'Art Cruz\'s first studio album as Lamb of God\'s full-time drummer was the band\'s self-titled "Lamb of God" (2020). He followed it with "Omens" (2022), which further established his sound within the band.',
      },
      {
        q: 'How did Art Cruz\'s playing style differ from Chris Adler\'s?',
        a: 'Cruz didn\'t try to replicate Adler\'s exact approach — he learned Adler\'s intricate, often double-kick-driven parts with respect, then added his own power and consistency on a single bass drum with a Trick double pedal. The result keeps Lamb of God\'s established groove identity while bringing fresh energy to the drum chair.',
      },
    ],

    metaTitle: 'Art Cruz Gear Evolution Timeline | Lamb of God Drum Kit History',
    metaDescription: 'Explore Art Cruz\'s complete drum gear evolution: Winds of Plague/Prong roots → Slayer farewell tour fill-in → Ludwig/Zildjian/Trick rig powering Lamb of God\'s "Omens" era. The Chris Adler succession story, era by era.',
  },

  // ==========================================
  // Hellhammer - Mayhem / Dimmu Borgir (1988-Present)
  // ==========================================
  'hellhammer': {
    slug: 'hellhammer',
    name: 'Hellhammer',
    band: 'Mayhem / Dimmu Borgir',
    totalYearsActive: '1988-Present',
    profileImage: '/images/drummers/hellhammer.webp',
    summary: 'Jan Axel "Hellhammer" Blomberg joined Mayhem in 1988 and became the architect of Norwegian black metal drumming, setting the blast-beat standard on "De Mysteriis Dom Sathanas" before adding a second, simultaneous career drumming for Dimmu Borgir\'s symphonic black metal. His gear evolution spans Pearl kits across 35+ years — from raw, barely-endorsed beginnings to the refined Pearl Reference/Demon Drive rig that powers both bands today.',

    eras: [
      {
        id: 'hellhammer-1988-early-mayhem',
        era: 'Early Mayhem Era',
        years: '1988–1994',
        startYear: 1988,
        endYear: 1994,
        description: 'Hellhammer joined Mayhem in 1988, stepping behind the kit during the band\'s most turbulent and mythologized period. The 1993 live recordings (later released as "Live in Leipzig") document him establishing the blast-beat template that "De Mysteriis Dom Sathanas" (1994) would codify into the benchmark black metal drum performance — raw, fast, and precise from the very beginning, recorded at Grieghallen Studio under producer Pytten.',
        albums: ['Live in Leipzig (1993)', 'De Mysteriis Dom Sathanas (1994)'],
        tours: ['Early Mayhem European underground dates 1988–1993'],
        image: null,

        gear: {
          drums: {
            item: 'Pearl kits (developing endorsement)',
            details: 'Raw, unpolished production-era setup',
            notes: 'Developing Pearl relationship during the formative period — durable shells suited to the raw production aesthetic of early Norwegian black metal.',
            change: null,
          },
          snare: {
            item: 'Pearl models, tuned bright',
            details: 'Tuned for maximum crack in raw production',
            notes: 'Bright tuning essential for cutting through "De Mysteriis Dom Sathanas"\'s cold, layered guitar mix.',
            change: null,
          },
          cymbals: {
            item: 'Zildjian (developing setup)',
            details: 'Standard A Series during this period',
            notes: 'The bright, cutting character he would refine across the next three decades begins here, serving Euronymous and Blackthorn\'s guitar tones.',
            change: null,
          },
          hardware: {
            item: 'Pearl double bass pedal (early configuration)',
            details: 'Chain-drive double pedal',
            notes: 'Early pedal platform supporting the blast-beat foundation he was building.',
            change: null,
          },
          sticks: {
            item: 'Vic Firth American Classic 5B',
            details: 'Standard hickory',
            notes: 'Stick choice that would remain constant across his entire career.',
            change: null,
          },
          heads: {
            item: 'Remo Ambassador',
            details: 'Standard coated/clear configuration',
            notes: 'Basic, durable heads typical of the raw early-1990s black metal underground.',
            change: null,
          },
        },

        estimatedCost: {
          original: 2000,
          inflationAdjusted: 5000,
          currency: 'USD',
        },

        keyChanges: [
          'Joined Mayhem in 1988, replacing founding drummer Manheim',
          '"Live in Leipzig" (1993) documents the blast-beat template taking shape',
          '"De Mysteriis Dom Sathanas" (1994) — the benchmark black metal album and drum performance',
          'Recorded at Grieghallen Studio, Bergen, with producer Pytten',
        ],

        quote: {
          text: 'I play barefoot because I need to feel the pedal. At the tempos I play, you can\'t afford any distance between your foot and the feedback.',
          source: 'Modern Drummer, 2007',
        },

        videos: [],
      },

      {
        id: 'hellhammer-1999-dimmu-dual-era',
        era: 'Dimmu Borgir / Mayhem Dual Era',
        years: '1999–2013',
        startYear: 1999,
        endYear: 2013,
        description: 'In 1999, Hellhammer took on a second, simultaneous career — joining symphonic black metal act Dimmu Borgir while remaining Mayhem\'s drummer. The dual commitment demanded extraordinary versatility: Dimmu Borgir\'s orchestrated grandeur required a different precision than Mayhem\'s raw, atmospheric attack. Mayhem\'s "Ordo Ad Chao" (2007), recorded without a bassist, is among his most demanding studio performances — the drums and guitars alone carrying the structural weight.',
        albums: ['Puritanical Euphoric Misanthropia (2001)', 'Death Cult Armageddon (2003)', 'Ordo Ad Chao (2007)'],
        tours: ['Dimmu Borgir world tours 1999–2013', 'Mayhem European and festival dates 1999–2013'],
        image: null,

        gear: {
          drums: {
            item: 'Pearl Reference Series',
            details: 'Flagship maple shells for dual-band schedule',
            notes: 'Upgraded to Pearl\'s flagship line to meet the demands of touring and recording with two bands simultaneously.',
            change: CHANGE_TYPES.UPGRADE,
          },
          snare: {
            item: 'Pearl Reference Snare 14"×6.5"',
            details: 'Consistent across both bands\' production contexts',
            notes: 'Same snare voice serving Mayhem\'s raw attack and Dimmu Borgir\'s orchestrated approach.',
            change: CHANGE_TYPES.UPGRADE,
          },
          cymbals: {
            item: 'Zildjian A Custom (full setup)',
            details: 'Hi-hats, crashes, ride',
            notes: 'Full A Custom setup providing consistent brightness across both bands\' contrasting production styles.',
            change: CHANGE_TYPES.UPGRADE,
          },
          hardware: {
            item: 'Pearl Demon Drive Double Pedal',
            details: 'Direct-drive double bass pedal',
            notes: 'Switched to Demon Drive\'s direct-drive mechanism — zero mechanical delay for precise blast-beat execution at extreme tempos.',
            change: CHANGE_TYPES.SWITCH,
          },
          sticks: {
            item: 'Vic Firth 5B',
            details: 'Continued hickory choice',
            notes: 'Unchanged stick preference through the dual-band era.',
            change: null,
          },
          heads: {
            item: 'Remo Ambassador / Pinstripe',
            details: 'Durable touring configuration',
            notes: 'Reliable heads for the heavy touring schedule of two active bands.',
            change: null,
          },
        },

        estimatedCost: {
          original: 7500,
          inflationAdjusted: 10500,
          currency: 'USD',
        },

        keyChanges: [
          'Joined Dimmu Borgir in 1999 while remaining Mayhem\'s drummer — a dual career unique in black metal',
          'Upgraded to Pearl Reference Series and Pearl Demon Drive direct-drive pedal',
          'Full Zildjian A Custom cymbal setup established',
          '"Ordo Ad Chao" (2007) — recorded without a bassist, among his most demanding performances',
        ],

        quote: {
          text: 'Dimmu Borgir and Mayhem ask completely different things of you. You can\'t bring one band\'s mentality into the other — but the gear stays the same, because the precision has to be there either way.',
          source: 'Metal Hammer, 2008',
        },

        videos: [],
      },

      {
        id: 'hellhammer-2014-modern-era',
        era: 'Modern Era',
        years: '2014–Present',
        startYear: 2014,
        endYear: 2026,
        description: 'Hellhammer\'s modern era refines rather than reinvents his platform — Pearl Reference and Pearl Demon Drive remain his confirmed current setup. Mayhem\'s "Esoteric Warfare" (2014) and "Daemon" (2019) balance the band\'s black metal identity with surprising melodic and textural range, and his performances continue to combine extreme blast-beat velocity with dynamic subtlety. He remains famous for playing barefoot, citing the direct tactile feedback through the pedal as essential to his tempo accuracy at 200+ BPM.',
        albums: ['Esoteric Warfare (2014)', 'Daemon (2019)'],
        tours: ['Mayhem world tours 2014–present', 'Dimmu Borgir festival dates 2014–present'],
        image: null,

        gear: {
          drums: {
            item: 'Pearl Reference (confirmed current configuration)',
            details: 'Flagship maple shells, dual 22" kick configuration',
            notes: 'Same proven Reference platform carried forward — confirmed current setup across both bands.',
            change: null,
          },
          snare: {
            item: 'Pearl Reference Snare 14"×6.5"',
            details: 'Continued from the dual-era setup',
            notes: 'Unchanged snare voice — the consistent crack underpinning his blast beats.',
            change: null,
          },
          cymbals: {
            item: 'Zildjian A Custom Hi-Hats, A Custom Crashes (17", 19"), Z Custom Dark Ride, A Custom China',
            details: 'Refined Zildjian setup',
            notes: 'Z Custom Dark Ride added for darker tonal complexity on the band\'s more atmospheric modern material.',
            change: CHANGE_TYPES.UPGRADE,
          },
          hardware: {
            item: 'Pearl Demon Drive double bass pedal',
            details: 'Direct-drive, played barefoot',
            notes: 'Played without shoes — direct tactile feedback through the pedal that he cites as essential to tempo accuracy at extreme speeds.',
            change: null,
          },
          sticks: {
            item: 'Vic Firth American Classic 5B',
            details: 'Continued from his earliest Mayhem years',
            notes: 'The one constant across 35+ years behind the kit.',
            change: null,
          },
          heads: {
            item: 'Remo Ambassador / Pinstripe',
            details: 'Durable configuration for sustained touring',
            notes: 'Reliable head choice maintained through the modern touring era.',
            change: null,
          },
        },

        estimatedCost: {
          original: 9000,
          inflationAdjusted: 9000,
          currency: 'USD',
        },

        keyChanges: [
          '"Esoteric Warfare" (2014) and "Daemon" (2019) — modern Mayhem statements',
          'Pearl Reference and Pearl Demon Drive confirmed as current setup',
          'Z Custom Dark Ride added for darker tonal complexity',
          '35+ years as Mayhem\'s drummer — the longest tenure in the band\'s history',
        ],

        quote: {
          text: 'Esoteric Warfare and Daemon let us show more range without losing what makes Mayhem dangerous. The blast beats are still there when the song needs them.',
          source: 'Decibel Magazine, 2019',
        },

        videos: [],
      },
    ],

    faqs: [
      {
        q: 'How long has Hellhammer been Mayhem\'s drummer?',
        a: 'Hellhammer (Jan Axel Blomberg) joined Mayhem in 1988, replacing founding drummer Manheim, and has remained the band\'s drummer for over 35 years — the longest tenure of any member in Mayhem\'s turbulent history.',
      },
      {
        q: 'What drum kit does Hellhammer play?',
        a: 'Hellhammer plays Pearl Reference Series drums — flagship maple shells he upgraded to during his dual Mayhem/Dimmu Borgir period beginning in 1999. He started on developing-era Pearl kits in the late 1980s before settling on the Reference Series as his confirmed current configuration.',
      },
      {
        q: 'Why does Hellhammer play barefoot?',
        a: 'Hellhammer plays without shoes because it gives him direct tactile feedback through the bass drum pedal and hi-hat stand — feedback that shoe soles absorb and distort. At blast-beat tempos exceeding 200 BPM, that physical connection is essential to maintaining tempo accuracy.',
      },
      {
        q: 'Is Hellhammer still in Dimmu Borgir?',
        a: 'Yes. Hellhammer joined Dimmu Borgir in 1999 while remaining Mayhem\'s drummer, and he has maintained both roles simultaneously ever since — one of the only drummers in extreme metal to sustain dual membership in two major bands for over two decades.',
      },
      {
        q: 'What album features Hellhammer\'s most famous drumming?',
        a: '"De Mysteriis Dom Sathanas" (1994) is widely considered Hellhammer\'s defining performance — the benchmark black metal album and the benchmark black metal drum performance, recorded at Grieghallen Studio in Bergen and still studied by extreme metal drummers today.',
      },
      {
        q: 'What cymbals and pedals does Hellhammer use?',
        a: 'Hellhammer runs a Zildjian setup — A Custom hi-hats and crashes plus a Z Custom Dark Ride for tonal complexity — driven by a Pearl Demon Drive double bass pedal, whose direct-drive mechanism eliminates mechanical delay for precise blast-beat execution.',
      },
    ],

    metaTitle: 'Hellhammer Gear Evolution Timeline | Mayhem & Dimmu Borgir Drum Kit History',
    metaDescription: 'Explore Hellhammer\'s 35+ year drum gear evolution: raw Pearl beginnings on "De Mysteriis Dom Sathanas" → Pearl Reference/Demon Drive dual-band rig for Mayhem and Dimmu Borgir → refined modern setup. Black metal\'s most enduring drummer, era by era.',
  },

  // ==========================================
  // Dirk Verbeuren - Megadeth / Soilwork (1998-Present)
  // ==========================================
  'dirk-verbeuren': {
    slug: 'dirk-verbeuren',
    name: 'Dirk Verbeuren',
    band: 'Megadeth / Soilwork',
    totalYearsActive: '1998-Present',
    profileImage: '/images/drummers/dirk-verbeuren.webp',
    summary: 'Dirk Verbeuren spent 18 years building technical precision as Soilwork\'s drummer before stepping into one of thrash metal\'s biggest seats — Megadeth, in 2016. His gear evolution is a journeyman-reaches-the-top story: Tama and Meinl gear carried across the transition, refined into the rig that helped Megadeth win a Grammy for "Dystopia" and anchor "The Sick, the Dying... and the Dead!"',

    eras: [
      {
        id: 'dirk-verbeuren-1998-soilwork',
        era: 'Soilwork Years',
        years: '1998–2016',
        startYear: 1998,
        endYear: 2016,
        description: 'Dirk Verbeuren spent 18 years as Soilwork\'s drummer, developing the signature precision and endurance that defined Swedish melodic death metal across A Predator\'s Portrait, Natural Born Chaos, Stabbing the Drama, The Living Infinite, and The Ride Majestic. This era established him as one of melodic death metal\'s premier drummers — technical, fast, and musically disciplined, on a Tama Starclassic Performer kit and Meinl Byzance cymbals.',
        albums: ['Natural Born Chaos (2002)', 'Stabbing the Drama (2005)', 'The Ride Majestic (2015)'],
        tours: ['Soilwork world tours 1998–2016'],
        image: null,

        gear: {
          drums: {
            item: 'Tama Starclassic Performer',
            details: 'Birch/maple hybrid shells',
            notes: 'Tama\'s Starclassic Performer provided the consistent, articulate foundation for Soilwork\'s technical melodic death metal arrangements.',
            change: null,
          },
          snare: {
            item: 'Various Tama snares',
            details: 'Steel and maple options depending on material',
            notes: 'Snare choice varied across Soilwork\'s catalog as the band\'s sound evolved from melodic death metal toward more modern, polished production.',
            change: null,
          },
          cymbals: {
            item: 'Meinl Byzance Series',
            details: 'Dark, complex cymbal voicing',
            notes: 'Meinl Byzance endorsement established during the Soilwork years — a cymbal voice he would carry forward into Megadeth.',
            change: null,
          },
          hardware: {
            item: 'Tama Speed Cobra Pedals',
            details: 'Precision double bass pedal',
            notes: 'Speed Cobra pedals built the precise, consistent double-bass technique that became his calling card.',
            change: null,
          },
          sticks: {
            item: 'Vater hickory sticks',
            details: 'Standard touring stick',
            notes: 'Vater endorsement maintained from the Soilwork years through his Megadeth tenure.',
            change: null,
          },
          heads: {
            item: 'Remo / Evans (varies by tour)',
            details: 'Standard touring configuration',
            notes: 'Head choice adjusted album to album as Soilwork\'s production grew more polished.',
            change: null,
          },
        },

        estimatedCost: {
          original: 6000,
          inflationAdjusted: 8500,
          currency: 'USD',
        },

        keyChanges: [
          'Joined Soilwork in 1998 — 18-year tenure as the band\'s drummer',
          'Natural Born Chaos (2002), Stabbing the Drama (2005), The Ride Majestic (2015) define his melodic death metal catalog',
          'Tama Starclassic Performer and Meinl Byzance cymbals established as his core gear',
          'Built the technical precision and endurance that defined his playing for the rest of his career',
        ],

        quote: {
          text: 'Soilwork is where I learned to be a precise drummer under pressure. Eighteen years of technical material — there\'s no faking your way through that.',
          source: 'Rhythm Magazine, 2015',
        },

        videos: [],
      },

      {
        id: 'dirk-verbeuren-2016-megadeth-transition',
        era: 'Megadeth Transition',
        years: '2016–2019',
        startYear: 2016,
        endYear: 2019,
        description: 'Megadeth recruited Verbeuren in 2016 to handle touring duties for "Dystopia" — the studio album that Chris Adler had recorded — while Dirk learned four decades of Megadeth classics from "Peace Sells" to "Rust in Peace" for the live stage. "Dystopia" went on to win the Grammy for Best Metal Performance, and Dirk\'s touring work proved he could honor Megadeth\'s legacy while bringing his own power to the kit.',
        albums: ['Dystopia (2016, touring)'],
        tours: ['Dystopia World Tour 2016–2019'],
        image: null,

        gear: {
          drums: {
            item: 'Tama Starclassic Maple',
            details: 'All-maple shells for the Megadeth transition',
            notes: 'Switched from Starclassic Performer to all-maple Starclassic for a warmer, more powerful thrash-appropriate tone.',
            change: CHANGE_TYPES.SWITCH,
          },
          snare: {
            item: 'Tama S.L.P. G-Maple',
            details: '14"×6.5" maple snare',
            notes: 'New signature-line snare adopted specifically for the precision and cut Megadeth\'s catalog demands.',
            change: CHANGE_TYPES.NEW,
          },
          cymbals: {
            item: 'Meinl Byzance / Mb20',
            details: 'Dark, complex cymbal voicing carried over from Soilwork',
            notes: 'Continued Meinl endorsement — the dark Byzance voice adds complexity that distinguishes his sound from brighter thrash cymbal setups.',
            change: null,
          },
          hardware: {
            item: 'Tama Speed Cobra 910',
            details: 'Upgraded double bass pedal',
            notes: 'Upgraded Speed Cobra model for the heavier, faster demands of Megadeth\'s thrash catalog on tour.',
            change: CHANGE_TYPES.UPGRADE,
          },
          sticks: {
            item: 'Vater hickory sticks',
            details: 'Continued from Soilwork',
            notes: 'Unchanged stick preference through the transition.',
            change: null,
          },
          heads: {
            item: 'Evans / Remo touring configuration',
            details: 'Ported front head with internal dampening',
            notes: 'Tight, controlled bass drum tone for Megadeth\'s precision-driven thrash sound.',
            change: CHANGE_TYPES.NEW,
          },
        },

        estimatedCost: {
          original: 8500,
          inflationAdjusted: 9500,
          currency: 'USD',
        },

        keyChanges: [
          'Recruited by Megadeth in 2016 for Dystopia touring duties',
          'Learned four decades of Megadeth classics for live performance',
          'Switched to Tama Starclassic Maple and Tama S.L.P. G-Maple snare',
          'Dystopia (2016) won the Grammy for Best Metal Performance',
        ],

        quote: {
          text: 'Though I didn\'t record Dystopia, every night on that tour was an audition. I had to prove I could carry that record and the entire catalog live.',
          source: 'Modern Drummer, 2018',
        },

        videos: [],
      },

      {
        id: 'dirk-verbeuren-2020-full-integration',
        era: 'Full Megadeth Integration',
        years: '2020–Present',
        startYear: 2020,
        endYear: 2026,
        description: 'Verbeuren\'s first studio album as a full member, "The Sick, the Dying... and the Dead!" (2022), showcased his complete integration into Megadeth\'s sound — technical, powerful, and unmistakably thrash. His Tama Starclassic Maple kit, Tama S.L.P. G-Maple snare, and Meinl Byzance/Mb20 cymbals remained the settled platform, joined by a refined Speed Cobra 910 setup that anchors both the album\'s precision double-bass work and the band\'s ongoing touring schedule.',
        albums: ['The Sick, the Dying... and the Dead! (2022)'],
        tours: ['The Sick, the Dying... and the Dead! World Tour 2022–2024'],
        image: null,

        gear: {
          drums: {
            item: 'Tama Starclassic Maple',
            details: 'All-maple shells, settled configuration',
            notes: 'Same platform from the transition era, now fully dialed in for studio and stage.',
            change: null,
          },
          snare: {
            item: 'Tama S.L.P. G-Maple 14"×6.5"',
            details: 'Confirmed current snare',
            notes: 'Maple shell provides warmth while medium-high tuning ensures the cut needed for classic thrash material.',
            change: null,
          },
          cymbals: {
            item: 'Meinl Byzance / Mb20',
            details: 'Dark cymbal setup, full configuration',
            notes: 'Dark Byzance/Mb20 voicing adds depth and complexity that distinguishes his sound from brighter, more conventional thrash cymbal setups.',
            change: null,
          },
          hardware: {
            item: 'Tama Speed Cobra 910',
            details: 'Confirmed current double bass pedal, full Tama Iron Cobra hardware',
            notes: 'Speed Cobra\'s consistent response underpins his precise, clean footwork across Megadeth\'s entire back catalog.',
            change: null,
          },
          sticks: {
            item: 'Vater hickory sticks',
            details: 'Continued endorsement',
            notes: 'Unchanged through his full integration into the band.',
            change: null,
          },
          heads: {
            item: 'Evans / Remo, ported front head',
            details: 'Internal dampening for tight, defined attack',
            notes: 'Settled head configuration delivering the controlled, punchy low end Megadeth\'s modern production requires.',
            change: null,
          },
        },

        estimatedCost: {
          original: 7000,
          inflationAdjusted: 7000,
          currency: 'USD',
        },

        keyChanges: [
          '"The Sick, the Dying... and the Dead!" (2022) — first full studio album as a Megadeth member',
          'Complete integration into Megadeth\'s sound — technical precision plus classic thrash power',
          'Settled Tama Starclassic Maple / S.L.P. G-Maple / Speed Cobra 910 platform',
          '18 years with Soilwork plus the Megadeth chapter — a journeyman\'s rise to thrash metal\'s top tier',
        ],

        quote: {
          text: 'The Sick, the Dying and the Dead was the record where I stopped feeling like the new guy. This is my band now too, and the drumming reflects that.',
          source: 'Metal Hammer, 2022',
        },

        videos: [],
      },
    ],

    faqs: [
      {
        q: 'Who is Megadeth\'s current drummer?',
        a: 'Dirk Verbeuren has been Megadeth\'s drummer since 2016. He joined to handle touring duties for "Dystopia" and became a full studio member, recording "The Sick, the Dying... and the Dead!" (2022) as his first complete album with the band.',
      },
      {
        q: 'What band was Dirk Verbeuren in before Megadeth?',
        a: 'Dirk Verbeuren spent 18 years (1998–2016) as the drummer for Swedish melodic death metal band Soilwork, recording albums including Natural Born Chaos, Stabbing the Drama, and The Ride Majestic before joining Megadeth.',
      },
      {
        q: 'What drum kit does Dirk Verbeuren play?',
        a: 'Dirk Verbeuren plays a Tama Starclassic Maple kit with a Tama S.L.P. G-Maple 14"×6.5" snare. He switched to this all-maple configuration when he joined Megadeth in 2016, having previously used a Tama Starclassic Performer during his Soilwork years.',
      },
      {
        q: 'Did Dirk Verbeuren play on the Dystopia album?',
        a: 'Chris Adler recorded the drum tracks on Megadeth\'s "Dystopia" (2016), but Dirk Verbeuren — who joined the band that same year — handled all touring duties for the album, learning the entire set list before becoming a full studio member.',
      },
      {
        q: 'Did Dirk Verbeuren win a Grammy?',
        a: 'Yes — Megadeth\'s "Dystopia" (2016) won the Grammy for Best Metal Performance. Verbeuren joined the band the same year the album was released and toured extensively behind it, though Chris Adler recorded the studio drum tracks.',
      },
      {
        q: 'What cymbals and pedals does Dirk Verbeuren use?',
        a: 'Verbeuren uses Meinl Byzance/Mb20 cymbals for a dark, complex tone, paired with a Tama Speed Cobra 910 double bass pedal. Both carried over from his Soilwork years and remain his confirmed current Megadeth setup.',
      },
    ],

    metaTitle: 'Dirk Verbeuren Gear Evolution Timeline | Megadeth & Soilwork Drum Kit History',
    metaDescription: 'Explore Dirk Verbeuren\'s complete drum gear evolution: 18 years with Soilwork → Tama/Meinl Megadeth touring transition → settled Starclassic Maple rig on "The Sick, the Dying... and the Dead!" The journeyman who reached thrash metal\'s top tier, era by era.',
  },

  // ==========================================
  // Inferno - Behemoth (1997-Present)
  // ==========================================
  'inferno': {
    slug: 'inferno',
    name: 'Inferno',
    band: 'Behemoth',
    totalYearsActive: '1997-Present',
    profileImage: '/images/drummers/inferno.webp',
    summary: 'Inferno (Zbigniew Robert Promiński) has been Behemoth\'s drummer since 1997, anchoring the band\'s transition from raw black metal into one of extreme metal\'s most technically demanding and commercially successful blackened death metal acts. His gear evolution tracks that journey from developing-era Pearl kits to the Pearl Reference Pure / Meinl Classics Custom Dark rig that powers "The Satanist" and "Opvs Contra Natvram."',

    eras: [
      {
        id: 'inferno-1997-early-behemoth',
        era: 'Early Behemoth Era',
        years: '1997–2003',
        startYear: 1997,
        endYear: 2003,
        description: 'Inferno joined Behemoth in 1997, replacing Baal Ravenlock as the band transitioned from pure black metal toward the blackened death metal sound that would define their career. "Satanica" (1999) marked his recording debut and the start of that stylistic shift, followed by "Thelema.6" (2000) and "Zos Kia Cultus" (2002), which progressively refined the band\'s technical death metal identity. Inferno\'s relentless blast beats and double bass drumming quickly established him as one of extreme metal\'s most disciplined players.',
        albums: ['Satanica (1999)', 'Thelema.6 (2000)', 'Zos Kia Cultus (2002)'],
        tours: ['Behemoth European underground tours 1997–2003'],
        image: null,

        gear: {
          drums: {
            item: 'Pearl kits (developing endorsement)',
            details: 'Standard production shells, double bass configuration',
            notes: 'No flagship endorsement yet — Inferno built his blast-beat foundation on entry-level Pearl kits during Behemoth\'s transition out of pure black metal.',
            change: null,
          },
          snare: {
            item: 'Pearl steel/maple snare',
            details: '14" standard configuration',
            notes: 'Tuned bright for cut, typical of the raw late-1990s extreme metal production Behemoth was working within.',
            change: null,
          },
          cymbals: {
            item: 'Developing cymbal setup',
            details: 'Mixed brands before establishing a fixed endorsement',
            notes: 'Cymbal choices varied across these early sessions before the Meinl relationship that would define his later sound.',
            change: null,
          },
          hardware: {
            item: 'Standard double bass pedal',
            details: 'Entry-level chain-drive double pedal',
            notes: 'Built the stamina and speed that would carry through Demigod and beyond.',
            change: null,
          },
          sticks: {
            item: 'Vic Firth American Classic 5B',
            details: 'Heavy hickory for power and durability',
            notes: 'Consistent stick choice that carried through his entire Behemoth career.',
            change: null,
          },
          heads: {
            item: 'Remo Ambassador / Pinstripe',
            details: 'Durable double-ply heads for touring',
            notes: 'Durability-first head selection for the demanding early touring circuit.',
            change: null,
          },
        },

        estimatedCost: {
          original: 2200,
          inflationAdjusted: 3200,
          currency: 'USD',
        },

        keyChanges: [
          'Joined Behemoth in 1997, replacing Baal Ravenlock',
          'Recording debut on "Satanica" (1999), transitioning the band toward blackened death metal',
          '"Thelema.6" (2000) and "Zos Kia Cultus" (2002) refined the technical sound',
          'No fixed gear endorsements yet — developing preferences across these early sessions',
        ],

        quote: {
          text: 'When I joined Behemoth, we were figuring out exactly what kind of band we wanted to become. The drumming had to get more technical because the music demanded it.',
          source: 'Terrorizer Magazine, 2002',
        },

        videos: [],
      },

      {
        id: 'inferno-2004-international-breakthrough',
        era: 'International Breakthrough Era',
        years: '2004–2009',
        startYear: 2004,
        endYear: 2009,
        description: '"Demigod" (2004) became Behemoth\'s international breakthrough, pushing Inferno\'s blast-beat stamina and double bass precision to a global stage. "The Apostasy" (2007) charted on the Billboard 200, and "Evangelion" (2009) pushed the band\'s brutality to a new peak. This era established Inferno\'s flagship Pearl Reference setup and his Meinl Classics Custom Dark cymbal partnership — the dark, controlled tone that blends with Behemoth\'s heavily distorted guitars rather than fighting them.',
        albums: ['Demigod (2004)', 'The Apostasy (2007)', 'Evangelion (2009)'],
        tours: ['Behemoth European and North American tours 2004–2009'],
        image: null,

        gear: {
          drums: {
            item: 'Pearl Reference Series',
            details: 'Maple/birch shells, double 22" bass drums',
            notes: 'Upgrade to Pearl\'s flagship Reference line gave Inferno the projection and consistency needed for "Demigod"\'s international touring schedule.',
            change: CHANGE_TYPES.UPGRADE,
          },
          snare: {
            item: 'Pearl Reference 14"×5.5"',
            details: 'Brass/steel shell options',
            notes: 'Tuned for clarity at extreme blast-beat tempos, replacing the standard steel snare of his developing years.',
            change: CHANGE_TYPES.UPGRADE,
          },
          cymbals: {
            item: 'Meinl Classics Custom Dark / Byzance',
            details: 'Hi-hats, multiple crashes, ride, China, splash',
            notes: 'Meinl endorsement established — the dark, controlled tonal character that became Inferno\'s signature sound, blending with Behemoth\'s heavily distorted guitar wall.',
            change: CHANGE_TYPES.NEW,
          },
          hardware: {
            item: 'Pearl Demon Drive Double Pedal',
            details: 'Direct-drive double bass pedal',
            notes: 'Direct-drive action gave Inferno the instant response his demanding double bass patterns on "Conquer All" and other Demigod-era tracks required.',
            change: CHANGE_TYPES.NEW,
          },
          sticks: {
            item: 'Vic Firth American Classic 5B',
            details: 'Continued heavy hickory choice',
            notes: 'Unchanged from his early Behemoth years.',
            change: null,
          },
          heads: {
            item: 'Remo Powerstroke P3 / Emperor',
            details: 'Reinforced batter heads for triggered consistency',
            notes: 'Heavier-duty heads supporting the trigger-assisted recording approach Behemoth adopted from "The Apostasy" onward.',
            change: CHANGE_TYPES.UPGRADE,
          },
        },

        estimatedCost: {
          original: 6500,
          inflationAdjusted: 8500,
          currency: 'USD',
        },

        keyChanges: [
          '"Demigod" (2004) — Behemoth\'s international commercial breakthrough',
          '"The Apostasy" (2007) reached #149 on the Billboard 200',
          '"Evangelion" (2009) pushed the band\'s brutality to a new peak',
          'Established Pearl Reference Series, Meinl Classics Custom Dark cymbals, and Pearl Demon Drive as his core rig',
        ],

        quote: {
          text: 'The Demon Drive pedals earn their keep on a track like "Conquer All" — sustained blasting at 200-plus BPM requires both speed and endurance.',
          source: 'Rhythm Magazine, 2008',
        },

        videos: [],
      },

      {
        id: 'inferno-2014-the-satanist-era',
        era: 'The Satanist Era',
        years: '2014–2018',
        startYear: 2014,
        endYear: 2018,
        description: '"The Satanist" (2014), recorded after Nergal\'s recovery from leukemia, is widely regarded as Behemoth\'s career-defining masterpiece. Inferno\'s drumming across the album balances groove-based dynamics with full-throttle blast beat assault, captured by an upgraded Pearl Reference Pure kit built specifically for extreme metal projection. "I Loved You at Your Darkest" (2018) continued the band\'s critical momentum, earning a Grammy nomination.',
        albums: ['The Satanist (2014)', 'I Loved You at Your Darkest (2018)'],
        tours: ['Slayer Final World Tour Support 2018–2019', 'Behemoth headlining tours 2014–2019'],
        image: null,

        gear: {
          drums: {
            item: 'Pearl Reference Pure Series',
            details: 'Custom finish, double 22"×18" bass drums, triggered for consistency',
            notes: 'Upgraded to the Reference Pure line for maximum tonal clarity at extreme tempos — Inferno prefers two separate bass drums over a single kick with double pedal for independent tonal control.',
            change: CHANGE_TYPES.UPGRADE,
          },
          snare: {
            item: 'Pearl Reference 14"×5.5" Brass/Steel',
            details: 'Alternates shell material by tour/album',
            notes: 'Die-cast hoops add focus and consistency to the rimshot attacks punctuating "The Satanist"\'s heaviest moments.',
            change: null,
          },
          cymbals: {
            item: 'Meinl Classics Custom Dark / Byzance Brilliant',
            details: 'Full setup including 19" Byzance Brilliant medium-thin crash',
            notes: 'Expanded cymbal arsenal for the dynamic range "The Satanist" demands, from atmospheric clean sections to full blast intensity.',
            change: CHANGE_TYPES.UPGRADE,
          },
          hardware: {
            item: 'Pearl Demon Drive Double Pedal',
            details: 'Continued direct-drive setup, Pearl Roadster D-3500BR throne',
            notes: 'Same direct-drive platform, now dialed in for Behemoth\'s biggest theatrical productions and elevated drum riser staging.',
            change: null,
          },
          sticks: {
            item: 'Vic Firth American Classic 5B / 2B',
            details: 'Heavy sticks for power and durability',
            notes: 'Unchanged stick preference across his entire career.',
            change: null,
          },
          heads: {
            item: 'Remo Powerstroke P3 Clear w/ Falam Slam patch',
            details: 'Emperor Clear toms, Emperor X / Evans HD Dry snare',
            notes: 'Falam Slam patch protects against the punishment of Inferno\'s demanding live performances at "The Satanist"-era intensity.',
            change: CHANGE_TYPES.UPGRADE,
          },
        },

        estimatedCost: {
          original: 8000,
          inflationAdjusted: 9000,
          currency: 'USD',
        },

        keyChanges: [
          '"The Satanist" (2014) — Behemoth\'s career-defining, critically acclaimed masterpiece',
          'Recorded after Nergal\'s recovery from leukemia',
          '"I Loved You at Your Darkest" (2018) earned a Grammy nomination',
          'Upgraded to Pearl Reference Pure Series with triggered double bass drums',
        ],

        quote: {
          text: 'Every piece of the kit is pushed to its limits on this record. The Reference Pure shells project through the wall of guitars.',
          source: 'Drum! Magazine, 2014',
        },

        videos: [],
      },

      {
        id: 'inferno-2022-modern-era',
        era: 'Modern Era',
        years: '2022–Present',
        startYear: 2022,
        endYear: 2026,
        description: '"Opvs Contra Natvram" (2022) confirmed Inferno\'s settled Pearl Reference Pure / Meinl Classics Custom Dark rig as his long-term platform, now refined across 25-plus years with Behemoth. He remains one of extreme metal\'s most consistent performers, with his trigger-supplemented studio approach and elevated drum riser staging continuing to define Behemoth\'s theatrical live shows worldwide.',
        albums: ['Opvs Contra Natvram (2022)'],
        tours: ['Behemoth World Tour 2022–2024', 'Download Festival 2020, 2022'],
        image: null,

        gear: {
          drums: {
            item: 'Pearl Reference Pure Series',
            details: 'Confirmed current configuration, double bass drums',
            notes: 'Settled platform — over a decade of refinement since "The Satanist" era.',
            change: null,
          },
          snare: {
            item: 'Pearl Reference 14"×5.5"',
            details: 'Confirmed current snare',
            notes: 'Unchanged from "The Satanist" era — the proven blast-beat foundation.',
            change: null,
          },
          cymbals: {
            item: 'Meinl Classics Custom Dark / Byzance',
            details: 'Full 7-piece setup: hi-hats, three crashes, ride, China, splash',
            notes: 'Confirmed current cymbal configuration, dialed in across two decades of Meinl endorsement.',
            change: null,
          },
          hardware: {
            item: 'Pearl Demon Drive Double Pedal',
            details: 'Confirmed current hardware, Pearl Roadster throne',
            notes: 'Long-running direct-drive platform supporting 25-plus years of relentless blast-beat performance.',
            change: null,
          },
          sticks: {
            item: 'Vic Firth American Classic 5B / 2B',
            details: 'The one constant across his entire career',
            notes: 'Unchanged since his earliest Behemoth years.',
            change: null,
          },
          heads: {
            item: 'Remo Powerstroke P3 / Emperor X',
            details: 'Confirmed current head configuration',
            notes: 'Settled, heavy-duty heads supporting his trigger-assisted modern production approach.',
            change: null,
          },
        },

        estimatedCost: {
          original: 8500,
          inflationAdjusted: 8500,
          currency: 'USD',
        },

        keyChanges: [
          '"Opvs Contra Natvram" (2022) — most recent Behemoth studio album',
          'Settled Pearl Reference Pure / Meinl Classics Custom Dark platform confirmed as long-term rig',
          'Over 25 years as Behemoth\'s drummer — the longest-serving member',
          'Continued worldwide headlining and festival touring',
        ],

        quote: {
          text: 'Behemoth\'s live shows require extreme physical endurance from me. After 25 years, the discipline is the whole job.',
          source: 'Metal Hammer, 2022',
        },

        videos: [],
      },
    ],

    faqs: [
      {
        q: 'How long has Inferno been Behemoth\'s drummer?',
        a: 'Inferno (Zbigniew Robert Promiński) joined Behemoth in 1997, replacing Baal Ravenlock, and has remained the band\'s drummer for over 25 years — the longest-serving member of the lineup. He has performed on every Behemoth album from "Satanica" (1999) onward.',
      },
      {
        q: 'What drum kit does Inferno play?',
        a: 'Inferno plays a Pearl Reference Pure Series kit with double 22"×18" bass drums, two rack toms, and two floor toms. He prefers two separate triggered bass drums over a single kick with a double pedal, giving him independent tonal control during Behemoth\'s sustained blast-beat passages.',
      },
      {
        q: 'What cymbals does Inferno use?',
        a: 'Inferno is a Meinl Cymbals endorser, running the Classics Custom Dark series alongside Byzance Brilliant crashes. The "Dark" designation is deliberate — the darker, more controlled tone blends with Behemoth\'s heavily distorted guitars rather than fighting them, unlike the brighter cymbals favored by many extreme metal drummers.',
      },
      {
        q: 'How did Inferno\'s gear change across his Behemoth career?',
        a: 'Inferno started on developing-era Pearl kits in the late 1990s before upgrading to the flagship Pearl Reference Series during the "Demigod" breakthrough (2004) and establishing his Meinl Classics Custom Dark cymbal partnership. He further upgraded to the Pearl Reference Pure Series for "The Satanist" (2014), which remains his confirmed current setup on "Opvs Contra Natvram" (2022).',
      },
      {
        q: 'What pedals does Inferno use for his double bass drumming?',
        a: 'Inferno drives his double bass drums with the Pearl Demon Drive Double Pedal, a direct-drive pedal offering instant response. He adopted the Demon Drive during the "Demigod" era (2004) and has used it consistently ever since, crediting its speed and precision for sustaining demanding tracks like "Conquer All" and "Ov Fire and the Void."',
      },
      {
        q: 'What was Inferno\'s most acclaimed album with Behemoth?',
        a: '"The Satanist" (2014) is widely considered Inferno\'s and Behemoth\'s career-defining masterpiece, recorded after frontman Nergal\'s recovery from leukemia. Inferno\'s drumming on the album balances groove-based dynamics with full-intensity blast beats, captured on his upgraded Pearl Reference Pure kit.',
      },
    ],

    metaTitle: 'Inferno Gear Evolution Timeline | Behemoth Drum Kit History',
    metaDescription: 'Explore Inferno\'s complete drum gear evolution: developing-era Pearl kits (1997) → Pearl Reference breakthrough on "Demigod" (2004) → Pearl Reference Pure / Meinl Classics Custom Dark rig powering "The Satanist" and "Opvs Contra Natvram." 25+ years as Behemoth\'s drummer, era by era.',
  },

  // ==========================================
  // John Otto - Limp Bizkit (1994-Present)
  // ==========================================
  'john-otto': {
    slug: 'john-otto',
    name: 'John Otto',
    band: 'Limp Bizkit',
    totalYearsActive: '1994-Present',
    profileImage: '/images/drummers/john-otto.webp',
    summary: 'John Otto co-founded Limp Bizkit in 1994 and has remained the band\'s one constant through three decades of lineup changes, hiatuses, and a surprise 2020s commercial revival. His jazz-trained, groove-first drumming evolved alongside his gear — from early Pearl kits on "Three Dollar Bill, Y\'all$" to the custom Orange County Drum and Percussion (OCDP) rig that has powered Limp Bizkit since their commercial peak.',

    eras: [
      {
        id: 'john-otto-1994-three-dollar-bill',
        era: 'Three Dollar Bill / Early Limp Bizkit Era',
        years: '1994–1998',
        startYear: 1994,
        endYear: 1998,
        description: 'John Otto co-founded Limp Bizkit in Jacksonville, Florida in 1994 alongside Fred Durst and Sam Rivers, building the rap-metal template the band would ride to stardom. "Three Dollar Bill, Y\'all$" (1997) introduced that synthesis nationally — Otto\'s jazz-trained groove sensibility laid the foundation that made the album credible to both metal and hip-hop listeners, a balance that became enormously commercially valuable on the records that followed.',
        albums: ['Three Dollar Bill, Y\'all$ (1997)'],
        tours: ['Early Limp Bizkit club and regional touring 1994–1998'],
        image: null,

        gear: {
          drums: {
            item: 'Pearl kit',
            details: 'Early-career standard configuration',
            notes: 'No custom or signature gear yet — Otto built his sound on a standard Pearl kit during Limp Bizkit\'s formative Jacksonville years.',
            change: null,
          },
          snare: {
            item: 'Pearl snare',
            details: 'Standard configuration for the era',
            notes: 'Off-the-shelf snare typical of a band still establishing itself outside the local scene.',
            change: null,
          },
          cymbals: {
            item: 'Zildjian A Series',
            details: 'Establishing cymbal endorsement',
            notes: 'The beginning of a Zildjian relationship that would carry through his entire career.',
            change: null,
          },
          hardware: {
            item: 'Pearl hardware / early Gibraltar',
            details: 'Standard stands and pedal',
            notes: 'Mixed Pearl and early Gibraltar hardware before settling on a dedicated rig.',
            change: null,
          },
          sticks: {
            item: 'Zildjian drumsticks',
            details: 'Standard touring stick',
            notes: 'Consistent stick brand from his earliest days with the band.',
            change: null,
          },
          heads: {
            item: 'Remo standard heads',
            details: 'Coated batter configuration',
            notes: 'Basic professional head setup for club and regional touring.',
            change: null,
          },
        },

        estimatedCost: {
          original: 1800,
          inflationAdjusted: 2800,
          currency: 'USD',
        },

        keyChanges: [
          'Co-founded Limp Bizkit in Jacksonville, Florida (1994) with Fred Durst and Sam Rivers',
          '"Three Dollar Bill, Y\'all$" (1997) — debut album introducing the rap-metal synthesis nationally',
          'Recommended to the band by bassist Sam Rivers',
          'Established early Pearl and Zildjian gear relationships',
        ],

        quote: {
          text: 'Three Dollar Bill was us figuring out how to make rap and metal actually sound like one thing instead of two things stitched together.',
          source: 'Modern Drummer Magazine, 2004',
        },

        videos: [],
      },

      {
        id: 'john-otto-1999-significant-other',
        era: 'Significant Other / Chocolate Starfish Era',
        years: '1999–2001',
        startYear: 1999,
        endYear: 2001,
        description: 'Limp Bizkit\'s commercial peak. "Significant Other" (1999) sold over 7 million copies in the US alone and included the Woodstock \'99-defining single "Nookie." "Chocolate Starfish and the Hot Dog Flavored Water" (2000) debuted at #1 on the Billboard 200. Otto\'s drumming across these two albums defines the nu-metal aesthetic at its commercial peak — hip-hop groove structure, heavy rock power, and jazz-trained sensitivity in a single rhythm section.',
        albums: ['Significant Other (1999)', 'Chocolate Starfish and the Hot Dog Flavored Water (2000)'],
        tours: ['Family Values Tour 1999', 'Anger Management Tour 2000'],
        image: null,

        gear: {
          drums: {
            item: 'Pearl / transitioning to OCDP',
            details: 'Custom shell specifications being established',
            notes: 'Began the transition from off-the-shelf Pearl drums toward Orange County Drum and Percussion as touring demands grew more specific.',
            change: CHANGE_TYPES.SWITCH,
          },
          snare: {
            item: 'Custom snare configuration',
            details: '14"x6.5" for touring demands',
            notes: 'Upgraded snare specification to handle the dual demands of arena-level nu-metal power and his jazz-influenced ghost-note sensitivity.',
            change: CHANGE_TYPES.UPGRADE,
          },
          cymbals: {
            item: 'Zildjian A and A Custom Series',
            details: 'Expanded crash and hi-hat selection',
            notes: 'A Custom crashes added for the syncopated, quick-decaying accents his hip-hop influenced playing required.',
            change: CHANGE_TYPES.UPGRADE,
          },
          hardware: {
            item: 'Gibraltar professional hardware',
            details: 'Full stand and pedal upgrade',
            notes: 'Moved to dedicated Gibraltar hardware for the rigors of Family Values and Anger Management tour-level touring.',
            change: CHANGE_TYPES.NEW,
          },
          sticks: {
            item: 'Zildjian drumsticks',
            details: 'Continued endorsement',
            notes: 'Unchanged from his earliest years with the band.',
            change: null,
          },
          heads: {
            item: 'Remo Emperor Coated',
            details: 'Upgraded touring heads',
            notes: 'More durable heads for the demands of stadium and festival touring at the band\'s commercial peak.',
            change: CHANGE_TYPES.UPGRADE,
          },
        },

        estimatedCost: {
          original: 3500,
          inflationAdjusted: 4800,
          currency: 'USD',
        },

        keyChanges: [
          '"Significant Other" (1999) sold over 7 million copies in the US',
          'Performed at Woodstock \'99 — controversial but career-defining',
          '"Chocolate Starfish and the Hot Dog Flavored Water" (2000) debuted at #1 on the Billboard 200',
          'Began transition from Pearl to custom Orange County Drum and Percussion (OCDP) drums',
        ],

        quote: {
          text: 'Modern Drummer called my playing "the grease that makes the Bizkit cook." That\'s exactly what I was going for — groove first, always.',
          source: 'Modern Drummer Magazine, 2004',
        },

        videos: [],
      },

      {
        id: 'john-otto-2003-results-may-vary',
        era: 'Results May Vary / Gold Cobra Era',
        years: '2003–2011',
        startYear: 2003,
        endYear: 2011,
        description: 'Limp Bizkit weathered lineup changes — including Wes Borland\'s departure and return — across "Results May Vary" (2003) and the original-lineup reunion that produced "Gold Cobra" (2011). Otto remained the band\'s one constant through it all, his fully established OCDP kit providing the groove foundation that brought the band back to a sound closer to the "Significant Other" formula on the reunion record.',
        albums: ['Results May Vary (2003)', 'Gold Cobra (2011)'],
        tours: ['Limp Bizkit reunion world tour 2009–2011'],
        image: null,

        gear: {
          drums: {
            item: 'OCDP custom kit',
            details: 'Established configuration — maple shells, double bass setup',
            notes: 'Orange County Drum and Percussion endorsement fully solidified; custom shells configured to Otto\'s cross-genre requirements.',
            change: CHANGE_TYPES.SIGNATURE,
          },
          snare: {
            item: 'OCDP custom snare',
            details: '14"x6.5" at medium-high tension',
            notes: 'Custom OCDP snare matched to his playing rather than off-the-shelf — punch for heavy passages, sensitivity for ghost notes.',
            change: CHANGE_TYPES.SIGNATURE,
          },
          cymbals: {
            item: 'Full Zildjian A / A Custom setup',
            details: 'Hi-hats, multiple crashes, ride, China',
            notes: 'Complete Zildjian configuration established as his standard touring and recording setup.',
            change: CHANGE_TYPES.UPGRADE,
          },
          hardware: {
            item: 'Gibraltar Professional Series',
            details: 'Confirmed throughout this era',
            notes: 'Road-grade hardware reliable across the original lineup\'s reunion touring.',
            change: null,
          },
          sticks: {
            item: 'Zildjian drumsticks',
            details: 'Continued endorsement',
            notes: 'Unchanged stick choice through lineup changes and reunion.',
            change: null,
          },
          heads: {
            item: 'Remo Emperor Coated / Powerstroke 3',
            details: 'Settled head configuration',
            notes: 'Powerstroke 3 added on kick for the focused attack the reunion-era material demanded.',
            change: CHANGE_TYPES.NEW,
          },
        },

        estimatedCost: {
          original: 4500,
          inflationAdjusted: 5500,
          currency: 'USD',
        },

        keyChanges: [
          '"Results May Vary" (2003) — first album following Wes Borland\'s initial departure',
          'Original lineup reunited for "Gold Cobra" (2011)',
          'OCDP custom kit and snare fully established as signature gear',
          'Otto remained the band\'s one constant through every lineup shift',
        ],

        quote: {
          text: 'Bands change, lineups change. I\'m the guy who\'s been here since Jacksonville, and the drums are how I keep that thread going.',
          source: 'Rhythm Magazine, 2011',
        },

        videos: [],
      },

      {
        id: 'john-otto-2021-still-sucks',
        era: 'Still Sucks / Revival Era',
        years: '2021–Present',
        startYear: 2021,
        endYear: 2026,
        description: '"Still Sucks" (2021) arrived as a surprise free release and demonstrated that Limp Bizkit\'s audience was larger than anyone anticipated for a nu-metal act in the 2020s. The 2024 touring cycle confirmed the revival, with Otto\'s groove-centered drumming — unchanged in its fundamentals since "Significant Other" — remaining the rhythmic engine of one of nu-metal\'s most commercially significant acts, over thirty years after he co-founded the band.',
        albums: ['Still Sucks (2021)'],
        tours: ['Limp Bizkit World Tours 2021–Present'],
        image: null,

        gear: {
          drums: {
            item: 'OCDP custom kit',
            details: 'Current configuration, maple shells',
            notes: 'Confirmed current setup — same OCDP platform established over two decades ago, still serving the band\'s nu-metal revival.',
            change: null,
          },
          snare: {
            item: 'OCDP custom snare',
            details: 'Confirmed current snare',
            notes: 'Unchanged from the established era — the proven crack-and-sensitivity formula.',
            change: null,
          },
          cymbals: {
            item: 'Zildjian full setup',
            details: 'A and A Custom series, confirmed current',
            notes: 'Settled cymbal configuration carried into the band\'s commercial revival.',
            change: null,
          },
          hardware: {
            item: 'Gibraltar hardware',
            details: 'Confirmed current hardware',
            notes: 'Continued road-grade reliability for global touring.',
            change: null,
          },
          sticks: {
            item: 'Zildjian drumsticks',
            details: 'The one constant across his entire career',
            notes: 'Unchanged since "Three Dollar Bill, Y\'all$."',
            change: null,
          },
          heads: {
            item: 'Remo Emperor Coated / Powerstroke 3',
            details: 'Confirmed current configuration',
            notes: 'Settled head setup supporting the band\'s renewed global touring schedule.',
            change: null,
          },
        },

        estimatedCost: {
          original: 5000,
          inflationAdjusted: 5000,
          currency: 'USD',
        },

        keyChanges: [
          '"Still Sucks" (2021) — surprise free release, first album in a decade',
          '2024 touring cycle confirmed Limp Bizkit\'s nu-metal revival',
          'OCDP / Zildjian / Gibraltar platform settled as his confirmed current rig',
          'Over thirty years as Limp Bizkit\'s drummer — the band\'s one constant',
        ],

        quote: {
          text: 'I never thought we\'d be playing to bigger crowds in our fifties than we did in our twenties, but here we are. The groove never changed — the audience just caught back up to it.',
          source: 'Drum! Magazine, 2022',
        },

        videos: [],
      },
    ],

    faqs: [
      {
        q: 'What drum gear has John Otto used throughout his career?',
        a: 'John Otto started on a standard Pearl kit during Limp Bizkit\'s "Three Dollar Bill, Y\'all$" era (1997), transitioned to custom Orange County Drum and Percussion (OCDP) drums during the band\'s "Significant Other" commercial peak (1999), and has used a fully established OCDP custom kit with Zildjian cymbals and Gibraltar hardware ever since — including on the 2021 comeback album "Still Sucks."',
      },
      {
        q: 'What drum kit does John Otto play now?',
        a: 'John Otto currently plays an Orange County Drum and Percussion (OCDP) custom kit — a California-built rig configured to his specifications, with maple shells, a double bass configuration, two rack toms, and two floor toms. He pairs it with a full Zildjian A/A Custom cymbal setup, Gibraltar hardware, Zildjian sticks, and Remo heads.',
      },
      {
        q: 'Did John Otto always play OCDP drums?',
        a: 'No. Otto played a standard Pearl kit during Limp Bizkit\'s early years, including "Three Dollar Bill, Y\'all$" (1997). He began transitioning to custom OCDP drums during the "Significant Other" era (1999) as his career and gear requirements became more specific, and the OCDP relationship became fully established by the "Results May Vary" (2003) and "Gold Cobra" (2011) era.',
      },
      {
        q: 'How long has John Otto been Limp Bizkit\'s drummer?',
        a: 'John Otto co-founded Limp Bizkit in Jacksonville, Florida in 1994 alongside Fred Durst and Sam Rivers, and has remained the band\'s drummer continuously for over thirty years — the only member to appear on every Limp Bizkit album and tour, through every lineup change.',
      },
      {
        q: 'What cymbals and sticks does John Otto use?',
        a: 'John Otto has been a Zildjian endorser since Limp Bizkit\'s earliest years, running a mix of A Series and A Custom cymbals (hi-hats, crashes, ride, China) chosen for their bright projection at festival volumes and quick response for his hip-hop influenced accent work. He uses Zildjian drumsticks as well, a consistent choice across his entire career.',
      },
      {
        q: 'What was John Otto\'s drum setup during Limp Bizkit\'s commercial peak?',
        a: 'During "Significant Other" (1999) and "Chocolate Starfish and the Hot Dog Flavored Water" (2000) — the two albums that defined Limp Bizkit\'s commercial peak — Otto was transitioning from Pearl drums to custom OCDP, running Zildjian A and A Custom cymbals and upgraded Gibraltar hardware to handle the demands of arena-level touring on the Family Values and Anger Management tours.',
      },
    ],

    metaTitle: 'John Otto Gear Evolution Timeline | Limp Bizkit Drum Kit History',
    metaDescription: 'Explore John Otto\'s complete drum gear evolution: early Pearl kit on "Three Dollar Bill, Y\'all$" (1997) → custom OCDP transition during "Significant Other" (1999) → settled OCDP/Zildjian rig powering "Gold Cobra" and "Still Sucks." Thirty years as nu-metal\'s groove king, era by era.',
  },

  // ==========================================
  // Jaska Raatikainen - Children of Bodom (1993-2019)
  // ==========================================
  'jaska-raatikainen': {
    slug: 'jaska-raatikainen',
    name: 'Jaska Raatikainen',
    band: 'Children of Bodom',
    totalYearsActive: '1993-2019',
    profileImage: '/images/drummers/jaska-raatikainen.webp',
    summary: 'Jaska Raatikainen co-founded Children of Bodom in 1993 and drummed on every album the band released across its 26-year career, from "Something Wild" (1997) to "Hexed" (2019). His gear evolution is one of steady refinement rather than reinvention — a Pearl Masters Premium Maple kit and Pearl Eliminator double pedal that grew from a developing endorsement into the fully dialed-in platform behind Children of Bodom\'s defining melodic death metal catalog.',

    eras: [
      {
        id: 'jaska-raatikainen-1997-something-wild',
        era: 'Something Wild / Hatebreeder Era',
        years: '1997–1999',
        startYear: 1997,
        endYear: 1999,
        description: 'Raatikainen co-founded what became Children of Bodom (originally Inearthed) with Alexi Laiho in 1993, and the band\'s 1997 debut "Something Wild" established the neoclassical speed metal meets death metal template. "Hatebreeder" (1999) brought international recognition, blending keyboard-driven neoclassical melodies with death metal aggression. His double-bass work on tracks like "Children of Bodom" and "Warheart" set the technical template the band would refine for the next two decades.',
        albums: ['Something Wild (1997)', 'Hatebreeder (1999)'],
        tours: ['Early Children of Bodom European club tours 1997–1999'],
        image: null,

        gear: {
          drums: {
            item: 'Pearl drums (developing endorsement)',
            details: 'Standard production shells',
            notes: 'Developing Pearl Masters endorsement relationship — not yet the flagship configuration that would define his later career.',
            change: null,
          },
          snare: {
            item: 'Pearl snare',
            details: 'Tuned medium-bright',
            notes: 'Bright tuning for cut, suited to the raw Finnish death metal production of the band\'s earliest releases.',
            change: null,
          },
          cymbals: {
            item: 'Zildjian A Series',
            details: 'Early relationship, developing toward A Custom',
            notes: 'Foundational Zildjian endorsement that would expand into a full A Custom/K Custom setup by the mid-2000s.',
            change: null,
          },
          hardware: {
            item: 'Pearl pedals',
            details: 'Early double-kick configuration',
            notes: 'Early double bass setup building the stamina his technical double-kick work would require throughout the band\'s catalog.',
            change: null,
          },
          sticks: {
            item: 'Vic Firth sticks',
            details: 'Standard configuration',
            notes: 'Early stick choice ahead of his American Classic 5A endorsement.',
            change: null,
          },
          heads: {
            item: 'Remo standard heads',
            details: 'Coated/clear configuration',
            notes: 'Standard professional head setup for the band\'s earliest touring.',
            change: null,
          },
        },

        estimatedCost: {
          original: 2000,
          inflationAdjusted: 3200,
          currency: 'USD',
        },

        keyChanges: [
          'Co-founded Inearthed (later Children of Bodom) with Alexi Laiho in 1993',
          '"Something Wild" (1997) — debut album establishing the band\'s sound',
          '"Hatebreeder" (1999) brought international recognition',
          'Developing Pearl drums and Zildjian cymbals endorsements',
        ],

        quote: {
          text: 'Hatebreeder was the album where people outside Finland started paying attention. We had to deliver live, and that meant the drumming had to be airtight.',
          source: 'Terrorizer Magazine, 2000',
        },

        videos: [],
      },

      {
        id: 'jaska-raatikainen-2000-follow-the-reaper',
        era: 'Follow the Reaper / Hate Crew Deathroll Era',
        years: '2000–2003',
        startYear: 2000,
        endYear: 2003,
        description: '"Follow the Reaper" (2000) is widely considered Children of Bodom\'s defining statement, with tracks like "Needled 24/7" and "Sixpounder" demonstrating Raatikainen\'s ability to sustain complex double-kick patterns against guitar runs that shift meter mid-phrase. "Hate Crew Deathroll" (2003), the band\'s commercial peak, pushed the setup harder — the newly adopted Pearl Eliminator pedal and Pearl Masters Premium Maple kit proving their endurance across an unrelenting touring schedule.',
        albums: ['Follow the Reaper (2000)', 'Hate Crew Deathroll (2003)'],
        tours: ['Children of Bodom European and US club tours 2000–2003'],
        image: null,

        gear: {
          drums: {
            item: 'Pearl Masters Premium Maple',
            details: 'Flagship endorsement solidified, six-ply all-maple shells',
            notes: 'Upgrade to Pearl\'s flagship production line gave Raatikainen the focused, projecting tone melodic death metal requires.',
            change: CHANGE_TYPES.UPGRADE,
          },
          snare: {
            item: 'Pearl Masters 14"×5.5" Maple',
            details: 'Confirmed snare for the defining era',
            notes: 'Maple shell construction balances warmth with the cut needed to sit against Alexi Laiho\'s neoclassical guitar runs.',
            change: CHANGE_TYPES.UPGRADE,
          },
          cymbals: {
            item: 'Zildjian A Custom',
            details: 'Hi-hats, crashes; developing K Custom ride relationship',
            notes: 'Upgraded to A Custom for the brighter, faster-responding cymbals his melodic fill work demands.',
            change: CHANGE_TYPES.UPGRADE,
          },
          hardware: {
            item: 'Pearl Eliminator Double Bass Pedal',
            details: 'Interchangeable cam system',
            notes: 'Adopted the Eliminator for its dual-chain drive consistency, sustaining complex double-kick patterns through "Follow the Reaper"\'s technical demands.',
            change: CHANGE_TYPES.NEW,
          },
          sticks: {
            item: 'Vic Firth American Classic 5A',
            details: 'Established signature stick choice',
            notes: 'Lighter 5A model suited to the speed and articulation his technical playing required.',
            change: CHANGE_TYPES.NEW,
          },
          heads: {
            item: 'Remo Emperor/Ambassador',
            details: 'Standard touring configuration',
            notes: 'Durable heads matched to the band\'s relentless early-2000s touring schedule.',
            change: null,
          },
        },

        estimatedCost: {
          original: 4500,
          inflationAdjusted: 6500,
          currency: 'USD',
        },

        keyChanges: [
          '"Follow the Reaper" (2000) — widely considered Children of Bodom\'s defining album',
          '"Hate Crew Deathroll" (2003) — the band\'s commercial peak',
          'Pearl Masters Premium Maple and Pearl Eliminator double pedal established as core gear',
          'Vic Firth American Classic 5A sticks adopted',
        ],

        quote: {
          text: 'Needled 24/7 and Sixpounder need a pedal that responds exactly the same way every single time. The Eliminator\'s cam system let me dial that in.',
          source: 'Rhythm Magazine, 2001',
        },

        videos: [],
      },

      {
        id: 'jaska-raatikainen-2005-are-you-dead-yet',
        era: 'Are You Dead Yet? / Blooddrunk Era',
        years: '2005–2008',
        startYear: 2005,
        endYear: 2008,
        description: '"Are You Dead Yet?" (2005) achieved the widest mainstream reach of any Children of Bodom album. Raatikainen\'s drumming on "In Your Face" and "Are You Dead Yet?" showed his ability to adapt to slightly more accessible song structures without abandoning the technical double-bass vocabulary that defined earlier material. "Blooddrunk" (2008) continued that evolution with a heavier, more direct sound, and his full Zildjian A Custom/K Custom cymbal setup reached its established configuration.',
        albums: ['Are You Dead Yet? (2005)', 'Blooddrunk (2008)'],
        tours: ['Ozzfest 2006', 'Children of Bodom European and US tours 2005–2008'],
        image: null,

        gear: {
          drums: {
            item: 'Pearl Masters Premium Maple',
            details: 'Consistent touring configuration',
            notes: 'Same flagship platform from the defining era, now fully dialed in for the band\'s widest mainstream exposure.',
            change: null,
          },
          snare: {
            item: 'Pearl Masters 14"×5.5" Maple',
            details: 'Confirmed configuration',
            notes: 'Unchanged from the "Follow the Reaper" era — the proven melodic death metal snare voice.',
            change: null,
          },
          cymbals: {
            item: 'Zildjian A Custom crashes, K Custom ride',
            details: 'Full setup established',
            notes: 'K Custom ride added for darker, more atmospheric overhead texture during the band\'s quieter, more melodic passages.',
            change: CHANGE_TYPES.NEW,
          },
          hardware: {
            item: 'Pearl Eliminator double bass pedal',
            details: 'Confirmed configuration',
            notes: 'Continued reliability across the Ozzfest 2006 run and extensive European/US touring.',
            change: null,
          },
          sticks: {
            item: 'Vic Firth American Classic 5A',
            details: 'Continued endorsement',
            notes: 'Unchanged from the previous era.',
            change: null,
          },
          heads: {
            item: 'Remo Emperor/Ambassador',
            details: 'Continued configuration',
            notes: 'Same durable head setup supporting the band\'s biggest touring cycle to date.',
            change: null,
          },
        },

        estimatedCost: {
          original: 4500,
          inflationAdjusted: 6000,
          currency: 'USD',
        },

        keyChanges: [
          '"Are You Dead Yet?" (2005) — widest mainstream reach of any Children of Bodom album',
          'Ozzfest 2006 — major US festival exposure',
          '"Blooddrunk" (2008) continued the band\'s evolution with a heavier sound',
          'Full Zildjian A Custom/K Custom cymbal setup established',
        ],

        quote: {
          text: 'Are You Dead Yet? had to work on rock radio without losing what made us Children of Bodom. The drums still had to hit like a freight train underneath the hooks.',
          source: 'Metal Hammer, 2005',
        },

        videos: [],
      },

      {
        id: 'jaska-raatikainen-2013-halo-of-blood',
        era: 'Halo of Blood / I Worship Chaos Era',
        years: '2013–2019',
        startYear: 2013,
        endYear: 2019,
        description: '"Halo of Blood" (2013) marked a return to the melodic focus that defined the band\'s early albums, and "I Worship Chaos" (2015) continued that mature direction — technically demanding but more compositionally focused than the peak-speed material of the early 2000s. Children of Bodom released their final album, "Hexed," in 2019 before announcing dissolution, closing a 26-year run with Raatikainen\'s Pearl Masters Premium Maple and Pearl Eliminator setup unchanged at its core since the early 2000s.',
        albums: ['Halo of Blood (2013)', 'I Worship Chaos (2015)', 'Hexed (2019)'],
        tours: ['A Chapter Called Children of Bodom Tour 2019'],
        image: null,

        gear: {
          drums: {
            item: 'Pearl Masters Premium Maple',
            details: 'Updated custom finish',
            notes: 'Most fully documented configuration of his career — the same shell line refined across nearly two decades.',
            change: null,
          },
          snare: {
            item: 'Pearl Masters 14"×5.5" Maple',
            details: 'Confirmed final-era snare',
            notes: 'Unchanged core snare voice across the band\'s entire mature catalog.',
            change: null,
          },
          cymbals: {
            item: 'Zildjian A Custom 14" Hi-Hats, 17"/18" Crashes, 20" K Custom Ride',
            details: 'Fully documented final configuration',
            notes: 'The most complete and consistent cymbal setup of his career, carried through the band\'s farewell tour.',
            change: null,
          },
          hardware: {
            item: 'Pearl Eliminator double bass pedal',
            details: 'Confirmed final-era hardware',
            notes: 'Same interchangeable-cam platform from 2000 onward — two decades of mechanical consistency.',
            change: null,
          },
          sticks: {
            item: 'Vic Firth American Classic 5A',
            details: 'Confirmed final-era sticks',
            notes: 'Unchanged since "Follow the Reaper" — the consistent stick choice across his entire Children of Bodom tenure.',
            change: null,
          },
          heads: {
            item: 'Remo Emperor/Ambassador',
            details: 'Confirmed final-era heads',
            notes: 'Same durable configuration through to the band\'s final tour in 2019.',
            change: null,
          },
        },

        estimatedCost: {
          original: 5000,
          inflationAdjusted: 5800,
          currency: 'USD',
        },

        keyChanges: [
          '"Halo of Blood" (2013) — return to the band\'s melodic roots',
          '"I Worship Chaos" (2015) — mature, compositionally focused direction',
          '"Hexed" (2019) — final Children of Bodom album before the band\'s dissolution',
          '"A Chapter Called Children of Bodom" farewell tour closed a 26-year career',
        ],

        quote: {
          text: 'Twenty-six years with the same band, the same guys, mostly the same gear. When something works, you don\'t fix it — you refine it.',
          source: 'Modern Drummer Magazine, 2019',
        },

        videos: [],
      },
    ],

    faqs: [
      {
        q: 'How did Jaska Raatikainen\'s gear change across Children of Bodom albums?',
        a: 'Jaska Raatikainen\'s gear evolved through steady refinement rather than wholesale changes. He started on a developing Pearl endorsement during "Something Wild" (1997) and "Hatebreeder" (1999), upgraded to the flagship Pearl Masters Premium Maple kit and adopted the Pearl Eliminator double pedal during "Follow the Reaper" (2000) and "Hate Crew Deathroll" (2003), and carried that same core setup — refined with an expanded Zildjian A Custom/K Custom cymbal configuration — through to the band\'s final album, "Hexed" (2019).',
      },
      {
        q: 'What drum kit did Jaska Raatikainen play in Children of Bodom?',
        a: 'Jaska Raatikainen played a Pearl Masters Premium Maple kit — a six-ply all-maple shell pack — throughout the majority of Children of Bodom\'s career, paired with a Pearl Masters 14"×5.5" maple snare. His double bass configuration used two 22"×18" kick drums with a compact two rack tom/two floor tom spread suited to the band\'s melodic fill-heavy material.',
      },
      {
        q: 'What pedal did Jaska Raatikainen use?',
        a: 'Raatikainen used the Pearl Eliminator double bass pedal from "Follow the Reaper" (2000) onward. Its defining feature is an interchangeable cam system — round, oval, and tri-cam options — that let him adjust the pedal\'s acceleration curve to his heel-up technique, providing the mechanical consistency his complex double-kick patterns demanded across two decades.',
      },
      {
        q: 'Why did Children of Bodom break up?',
        a: 'Children of Bodom announced their dissolution in 2019 after a 26-year career, releasing "Hexed" as their final album and playing a farewell tour, "A Chapter Called Children of Bodom." Guitarist and vocalist Alexi Laiho passed away in December 2020, permanently sealing the band\'s legacy.',
      },
      {
        q: 'Did Jaska Raatikainen play on every Children of Bodom album?',
        a: 'Yes. Raatikainen co-founded the band (originally as Inearthed) with Alexi Laiho in 1993 and performed on every Children of Bodom studio album from "Something Wild" (1997) through "Hexed" (2019) — a complete 26-year, ten-album discography.',
      },
      {
        q: 'What cymbals did Jaska Raatikainen use?',
        a: 'Raatikainen used a Zildjian setup that grew from a basic A Series configuration in the late 1990s into a full A Custom and K Custom combination by the mid-2000s — A Custom hi-hats and crashes for bright projection, and a K Custom ride for darker, more atmospheric texture during Children of Bodom\'s quieter, neoclassical passages.',
      },
    ],

    metaTitle: 'Jaska Raatikainen Gear Evolution Timeline | Children of Bodom Drum Kit History',
    metaDescription: 'Explore Jaska Raatikainen\'s complete drum gear evolution: developing Pearl endorsement on "Something Wild" (1997) → Pearl Masters Premium Maple/Eliminator breakthrough on "Follow the Reaper" (2000) → refined setup through "Hexed" (2019). A 26-year, ten-album Children of Bodom journey, era by era.',
  },

  // ==========================================
  // Matt Garstka - Animals as Leaders (2007–Present)
  // ==========================================
  'matt-garstka': {
    slug: 'matt-garstka',
    name: 'Matt Garstka',
    band: 'Animals as Leaders',
    totalYearsActive: '2007-Present',
    profileImage: '/images/drummers/matt-garstka.webp',
    summary: 'A Berklee-educated jazz-fusion drummer who reshaped what progressive metal drumming could sound like, Matt Garstka joined Animals as Leaders in 2012 and immediately became one of the most studied technicians of his generation. His gear evolution tracks a deliberate philosophy — from anonymous student kits during his Berklee years, through the compact, articulation-first Pearl Masterworks setup that defined The Joy of Motion, to the fully personalized Pearl and Vic Firth signature gear of the Parrhesia era.',

    eras: [
      {
        id: 'matt-garstka-2007-berklee',
        era: 'Pre-AAL / Berklee Years',
        years: '2007–2012',
        startYear: 2007,
        endYear: 2012,
        description: 'Before joining Animals as Leaders, Matt Garstka studied at Berklee College of Music in Boston, developing the jazz-fusion vocabulary — traditional grip, ghost-note sensitivity, dynamic control, and metric modulation — that would later distinguish his progressive metal playing. He worked through rotating student and session kits during this formative period, with his snare and cymbal choices already leaning toward jazz-standard gear rather than typical metal setups.',
        albums: ['Session and studio work (pre-AAL)'],
        tours: ['Boston-area jazz and fusion gigs', 'Berklee ensemble performances'],
        image: null,

        gear: {
          drums: {
            item: 'Various kits (Berklee era)',
            details: 'Rotating student and session kits, no fixed brand',
            notes: 'No consistent endorsement during the Berklee years — Garstka played whatever kit was available for a given session or ensemble class.',
            change: null,
          },
          snare: {
            item: 'Ludwig Supraphonic 14"×5"',
            details: 'Aluminum shell, the jazz-session standard',
            notes: 'The Supraphonic\'s crisp, articulate crack made it the default choice for the jazz-fusion vocabulary Garstka was developing.',
            change: null,
          },
          cymbals: {
            item: 'Zildjian K Series',
            details: 'Dark, complex Turkish-style bronze',
            notes: 'K Series cymbals suited the nuanced, dynamic playing central to his Berklee jazz training — a stark contrast to the bright, cutting cymbals typical of metal drummers.',
            change: null,
          },
          hardware: {
            item: 'Standard single-pedal hardware',
            details: 'No double kick — jazz-context setups',
            notes: 'Single pedal configuration reflecting the jazz and fusion contexts he was playing in before joining a metal band.',
            change: null,
          },
          sticks: {
            item: 'Vic Firth 5A',
            details: 'Standard hickory, off-the-shelf',
            notes: 'Off-the-shelf 5A sticks during the pre-endorsement period.',
            change: null,
          },
          heads: {
            item: 'Remo Ambassador',
            details: 'Clear on toms, coated on snare',
            notes: 'Standard jazz-session head configuration.',
            change: null,
          },
        },

        estimatedCost: {
          original: 2000,
          inflationAdjusted: 2900,
          currency: 'USD',
        },

        keyChanges: [
          'Enrolled at Berklee College of Music, Boston',
          'Developed traditional grip and jazz-fusion vocabulary that later defined his metal playing',
          'No fixed gear endorsement — rotating student and session kits',
          'Ludwig Supraphonic and Zildjian K established as personal gear preferences',
        ],

        quote: {
          text: "Berklee wasn't about metal at all. It was about touch, dynamics, and listening. Everything I do now in Animals as Leaders comes from that training.",
          source: 'DRUM! Magazine Interview, 2015',
        },

        videos: [],
      },

      {
        id: 'matt-garstka-2012-joy-of-motion',
        era: 'The Joy of Motion Era',
        years: '2012–2015',
        startYear: 2012,
        endYear: 2015,
        description: 'Garstka joined Animals as Leaders in 2012, replacing founding drummer Navene Koperweis. His first album with the band, The Joy of Motion (2014), immediately established him as one of progressive metal\'s most important new voices. He built his signature setup around a compact Pearl Masterworks Maple kit — smaller than typical metal configurations — prioritizing articulation and dynamics over raw size, paired with an extensive Meinl Byzance cymbal array.',
        albums: ['The Joy of Motion (2014)'],
        tours: ['The Joy of Motion World Tour 2014–2015'],
        image: null,

        gear: {
          drums: {
            item: 'Pearl Masterworks Maple',
            details: 'Maple shells, MasterCast hoops: 20"×16" kick, 10"×7"/12"×8" racks, 14"×14" floor',
            notes: 'Compact 4-piece configuration — deliberately smaller than typical metal kits, giving Garstka the quick attack and articulation his jazz-influenced technical playing demanded.',
            change: CHANGE_TYPES.NEW,
          },
          snare: {
            item: 'Pearl Reference 14"×5"',
            details: 'Maple/birch hybrid shell (pre-signature)',
            notes: 'Pearl Reference hybrid snare — versatile tone bridging the jazz articulation and metal projection The Joy of Motion required.',
            change: CHANGE_TYPES.NEW,
          },
          cymbals: {
            item: 'Meinl Byzance Series',
            details: '15" Dual Hi-Hats, 18" Extra Dry Thin Crash, 19"/20" Dual Crashes, 22" Sand Ride, 18" Vintage Trash Hat China',
            notes: 'Switched to an extensive Meinl Byzance setup — dark, hand-hammered Turkish B20 bronze suited to the dynamic, texture-driven approach he brought to AAL.',
            change: CHANGE_TYPES.SWITCH,
          },
          hardware: {
            item: 'Pearl Demon Drive Double Pedal',
            details: 'Direct-drive double bass pedal',
            notes: 'Demon Drive gave him the precise, responsive double kick needed for The Joy of Motion\'s odd-meter, linear-independence passages.',
            change: CHANGE_TYPES.NEW,
          },
          sticks: {
            item: 'Vic Firth 5A Hickory',
            details: 'Standard hickory (pre-signature)',
            notes: 'Continued 5A preference into his Vic Firth endorsement, ahead of his later signature model.',
            change: CHANGE_TYPES.NEW,
          },
          heads: {
            item: 'Remo Ambassador Coated / Evans EMAD',
            details: 'Coated Ambassador on toms/snare, EMAD on kick',
            notes: 'EMAD kick head for a focused, controlled low end suited to the compact 20" bass drum.',
            change: CHANGE_TYPES.NEW,
          },
        },

        estimatedCost: {
          original: 7949,
          inflationAdjusted: 11000,
          currency: 'USD',
        },

        keyChanges: [
          'Joined Animals as Leaders (2012), replacing Navene Koperweis',
          'The Joy of Motion (2014) — breakthrough debut album with the band',
          'Compact Pearl Masterworks Maple kit established as signature configuration',
          'Meinl Byzance and Pearl Demon Drive endorsements begin',
        ],

        quote: {
          text: "I wanted a kit that would let me play quiet as easily as loud. The compact bass drum, the Byzance cymbals — it's all about articulation, not just power.",
          source: 'Modern Drummer Interview, 2014',
        },

        videos: [],
      },

      {
        id: 'matt-garstka-2016-signature',
        era: 'The Madness of Many / Signature Era',
        years: '2016–2021',
        startYear: 2016,
        endYear: 2021,
        description: 'With The Madness of Many (2016), Garstka\'s gear became fully personalized. Pearl released a Matt Garstka Signature Snare and Vic Firth released a Matt Garstka Signature stick model designed around his traditional-grip technique. His Drumeo lessons, clinics, and YouTube presence made him one of the most-watched drum educators of the era, and his refined Pearl Masterworks setup became the reference point for a new generation of progressive drummers.',
        albums: ['The Madness of Many (2016)'],
        tours: ['The Madness of Many World Tour 2016–2018', 'International clinic circuit'],
        image: null,

        gear: {
          drums: {
            item: 'Pearl Masterworks Maple (refined)',
            details: 'Same compact maple configuration, refined tuning and hardware',
            notes: 'Retained the compact Masterworks Maple configuration, further refined for the increasingly complex Madness of Many material.',
            change: null,
          },
          snare: {
            item: 'Pearl Matt Garstka Signature Snare 14"×5"',
            details: 'Maple shell, custom bearing edge for sensitivity',
            notes: 'His first signature product — a maple snare with a bearing edge designed specifically for ghost-note articulation and dynamic range.',
            change: CHANGE_TYPES.SIGNATURE,
          },
          cymbals: {
            item: 'Meinl Byzance Series (expanded)',
            details: 'Expanded crash and effects configuration',
            notes: 'Expanded Byzance setup for the broader tonal palette required by The Madness of Many\'s denser arrangements.',
            change: CHANGE_TYPES.UPGRADE,
          },
          hardware: {
            item: 'Pearl Demon Drive Double Pedal (continued)',
            details: 'Consistent double-bass platform',
            notes: 'Continued Demon Drive platform, unchanged through the signature era.',
            change: null,
          },
          sticks: {
            item: 'Vic Firth Matt Garstka Signature',
            details: 'Custom hickory model with elongated taper for traditional grip',
            notes: 'His signature stick model — designed with an elongated taper suited to traditional grip, cementing his status as a leading educator.',
            change: CHANGE_TYPES.SIGNATURE,
          },
          heads: {
            item: 'Remo Ambassador Coated / Evans EMAD (continued)',
            details: 'Consistent head configuration',
            notes: 'Unchanged head configuration from The Joy of Motion era.',
            change: null,
          },
        },

        estimatedCost: {
          original: 8500,
          inflationAdjusted: 11200,
          currency: 'USD',
        },

        keyChanges: [
          'The Madness of Many (2016) — critically acclaimed; showcased evolved technical approach',
          'Pearl Matt Garstka Signature Snare released',
          'Vic Firth Matt Garstka Signature sticks released',
          'Became one of the most-watched drum educators via Drumeo, YouTube, and international clinics',
        ],

        quote: {
          text: "Having a signature snare and sticks made me think harder about what I actually needed from my gear — not what looked cool, but what let me communicate the music clearly.",
          source: 'Drumeo Interview, 2017',
        },

        videos: [],
      },

      {
        id: 'matt-garstka-2022-parrhesia',
        era: 'Parrhesia / Current Era',
        years: '2022–Present',
        startYear: 2022,
        endYear: 2026,
        description: 'Parrhesia (2022) represents the most mature and compositionally dense Animals as Leaders record to date, and Garstka\'s playing on it reflects a decade of refinement since The Joy of Motion. His current touring rig keeps the same compact Pearl Masterworks Maple philosophy and Meinl Byzance voicing that have defined his sound since 2014, now paired consistently with his own signature snare and stick line.',
        albums: ['Parrhesia (2022)'],
        tours: ['Parrhesia World Tour 2022–2023', 'Continued clinic and educational touring'],
        image: null,

        gear: {
          drums: {
            item: 'Pearl Masterworks Maple',
            details: 'Compact maple configuration, current touring spec',
            notes: 'Maintained the compact Masterworks Maple philosophy established a decade earlier — proof of a settled, deliberate gear identity.',
            change: null,
          },
          snare: {
            item: 'Pearl Matt Garstka Signature Snare',
            details: 'Current standard snare',
            notes: 'His signature snare remains the standard across the Parrhesia touring cycle.',
            change: null,
          },
          cymbals: {
            item: 'Meinl Byzance Series (current configuration)',
            details: 'Configuration adjusted per tour',
            notes: 'Byzance setup varies slightly per tour leg but retains the dark, hand-hammered voicing central to his sound since 2014.',
            change: null,
          },
          hardware: {
            item: 'Pearl Demon Drive Double Pedal',
            details: 'Consistent double-bass platform',
            notes: 'Unchanged hardware platform across the Parrhesia era.',
            change: null,
          },
          sticks: {
            item: 'Vic Firth Matt Garstka Signature',
            details: 'Current standard stick model',
            notes: 'Continued use of his own signature stick model.',
            change: null,
          },
          heads: {
            item: 'Remo Ambassador Coated / Evans EMAD',
            details: 'Consistent head configuration',
            notes: 'Unchanged head configuration from prior eras.',
            change: null,
          },
        },

        estimatedCost: {
          original: 9500,
          inflationAdjusted: 9800,
          currency: 'USD',
        },

        keyChanges: [
          'Parrhesia (2022) — most compositionally dense AAL record to date',
          'Core Pearl Masterworks Maple / Meinl Byzance setup unchanged since 2014',
          'Signature snare and sticks now the standing default across all touring',
          'Continued expansion of educational presence alongside touring',
        ],

        quote: {
          text: "My setup hasn't changed drastically since The Joy of Motion — because it already did what I needed. Parrhesia just asked me to say more with it.",
          source: 'Modern Drummer Interview, 2022',
        },

        videos: [],
      },
    ],

    faqs: [
      {
        q: 'What drum kit does Matt Garstka use?',
        a: 'Matt Garstka plays a Pearl Masterworks Maple kit in a compact 4-piece configuration: a 20"×16" bass drum, 10"×7" and 12"×8" rack toms, and a 14"×14" floor tom. The smaller-than-typical bass drum size is a deliberate choice for quick attack and articulation, a philosophy he established on The Joy of Motion (2014) and has maintained ever since.',
      },
      {
        q: 'What cymbals does Matt Garstka use?',
        a: 'Garstka uses Meinl Byzance cymbals, including 15" Dual Hi-Hats, Byzance crashes from 18" to 20", a 22" Byzance Sand Ride, and an 18" Vintage Trash Hat China. He switched to Byzance from Zildjian K when he joined Animals as Leaders in 2012, and the dark, hand-hammered voicing has defined his sound ever since.',
      },
      {
        q: 'Does Matt Garstka have a signature snare?',
        a: 'Yes. Garstka has a Pearl Matt Garstka Signature Snare — a 14"×5" maple shell released around The Madness of Many era (2016) with a bearing edge designed for sensitivity and ghost-note articulation. He also has a Vic Firth Matt Garstka Signature stick with an elongated taper designed for traditional grip players.',
      },
      {
        q: 'What grip does Matt Garstka use?',
        a: 'Matt Garstka is one of the few prominent metal drummers who uses traditional grip rather than matched grip — a holdover from his jazz training at Berklee College of Music that shapes his touch, dynamics, and ghost-note vocabulary, and the basis for his signature Vic Firth stick model.',
      },
      {
        q: 'How did Matt Garstka\'s gear change from The Joy of Motion to Parrhesia?',
        a: 'Garstka\'s core setup has been remarkably stable since joining Animals as Leaders — a compact Pearl Masterworks Maple kit paired with Meinl Byzance cymbals from The Joy of Motion (2014) onward. The main evolution has been personalization: his Pearl Matt Garstka Signature Snare and Vic Firth Matt Garstka Signature sticks, both released around 2016, replaced the pre-signature Pearl Reference snare and stock Vic Firth 5A sticks he used on his AAL debut.',
      },
    ],

    metaTitle: 'Matt Garstka Gear Evolution Timeline | Animals as Leaders Drum Kit History',
    metaDescription: 'Explore Matt Garstka\'s complete drum gear evolution: Berklee jazz-fusion roots → compact Pearl Masterworks Maple debut on The Joy of Motion (2014) → signature Pearl snare and Vic Firth sticks → Parrhesia (2022). A decade of progressive metal\'s most studied drummer, era by era.',
  },

  // ==========================================
  // Ray Luzier - KoRn (2007–Present)
  // ==========================================
  'ray-luzier': {
    slug: 'ray-luzier',
    name: 'Ray Luzier',
    band: 'KoRn',
    totalYearsActive: '2007-Present',
    profileImage: '/images/drummers/ray-luzier.webp',
    summary: 'A Musicians Institute-trained session veteran who spent a decade touring with David Lee Roth before joining KoRn in 2007, Ray Luzier brought technical precision and groove-heavy versatility to one of nu-metal\'s most identity-driven bands. His gear evolution tracks from his DW Performance Series debut through the DW Collector\'s Series and Paiste 2002 setup that has defined fifteen-plus years and five studio albums as KoRn\'s drummer.',

    eras: [
      {
        id: 'ray-luzier-2007-joining-korn',
        era: 'Pre-Korn Session / Joining KoRn Era',
        years: '2007–2009',
        startYear: 2007,
        endYear: 2009,
        description: 'Ray Luzier joined KoRn as a touring replacement in 2007 after founding drummer David Silveria\'s departure, following a decade of session and touring work with David Lee Roth, Army of Anyone, and Steel Panther. He learned 30 KoRn songs when asked to prepare just 5 for his audition. His first shows with the band began in early 2008, and he was officially announced as a full member in 2009. His DW Performance Series kit — mid-tier professional gear — was already paired with the Paiste 2002 cymbals that would define his entire KoRn tenure.',
        albums: ['Session and touring work prior to official KoRn membership'],
        tours: ['David Lee Roth touring (1997–2005)', 'Army of Anyone touring (2006–2007)', 'Early KoRn touring dates (2008)'],
        image: null,

        gear: {
          drums: {
            item: 'DW Performance Series',
            details: 'Professional-grade maple shells, 6-piece',
            notes: 'Mid-tier DW Performance kit — professional quality but below the Collector\'s Series level he would reach once confirmed as KoRn\'s full-time drummer.',
            change: null,
          },
          snare: {
            item: 'DW Performance Series 14"×5.5"',
            details: 'Maple shell, standard configuration',
            notes: 'Standard DW Performance snare from his session and David Lee Roth touring years.',
            change: null,
          },
          cymbals: {
            item: 'Paiste 2002 Series',
            details: '14" Sound Edge hi-hats, 18" crash, 20" crash, 22" ride',
            notes: 'Paiste 2002 endorsement already in place — the pairing that would remain unbroken through his entire KoRn career.',
            change: null,
          },
          hardware: {
            item: 'DW 9002 Double Pedal',
            details: 'Chain-drive double bass pedal',
            notes: 'DW 9002 established early — the pedal platform he would keep in direct-drive form throughout his KoRn tenure.',
            change: null,
          },
          sticks: {
            item: 'Vic Firth 5A Hickory',
            details: 'Standard hickory',
            notes: 'Long-running Vic Firth 5A preference from his session-player years.',
            change: null,
          },
          heads: {
            item: 'Evans G2 / EMAD / Genera',
            details: 'G2 on toms, EMAD on kick, Genera on snare',
            notes: 'Standard Evans configuration for touring durability.',
            change: null,
          },
        },

        estimatedCost: {
          original: 5500,
          inflationAdjusted: 8500,
          currency: 'USD',
        },

        keyChanges: [
          'Joined KoRn as touring replacement for David Silveria (2007)',
          'Learned 30 KoRn songs for an audition that requested 5',
          'First KoRn performance — January 13, 2008, in Dublin, Ireland',
          'Officially announced as full KoRn member (2009)',
          'Paiste 2002 and DW 9002 pedal already established as career-long gear choices',
        ],

        quote: {
          text: "They asked me to learn five songs. I learned thirty. I wanted them to know I was serious about this — this wasn't just a gig to me.",
          source: 'Rhythm Magazine Interview, 2009',
        },

        videos: [],
      },

      {
        id: 'ray-luzier-2010-korn-iii',
        era: 'Korn III: Remember Who You Are Era',
        years: '2010',
        startYear: 2010,
        endYear: 2010,
        description: 'Korn III: Remember Who You Are (2010), produced by Ross Robinson — the same producer behind KoRn\'s 1994 debut — was Luzier\'s first full studio album with the band and his DW Collector\'s Series debut. The maple/mahogany hybrid shells delivered the deeper fundamentals suited to the album\'s raw, back-to-basics production, and his 6.5"-deep aluminum snare became instantly recognizable on tracks like "Oildale (Leave Me Alone)" and "Move On."',
        albums: ['Korn III: Remember Who You Are (2010)'],
        tours: ['Korn III World Tour 2010'],
        image: null,

        gear: {
          drums: {
            item: 'DW Collector\'s Series Maple/Mahogany',
            details: '7-piece, custom Korn livery: 22"×18" kick (×2), 10"×8" rack, 12"×9" rack, 14"×12" floor, 16"×14" floor',
            notes: 'Full endorsement upgrade to DW Collector\'s — the maple/mahogany hybrid gave deeper fundamentals suited to Korn III\'s raw, back-to-basics production.',
            change: CHANGE_TYPES.UPGRADE,
          },
          snare: {
            item: 'DW Collector\'s Series 14"×6.5" Aluminum',
            details: 'Aluminum shell, sharp crack',
            notes: 'The 6.5"-deep aluminum snare\'s sharp crack became instantly recognizable on "Oildale (Leave Me Alone)" and "Move On."',
            change: CHANGE_TYPES.UPGRADE,
          },
          cymbals: {
            item: 'Paiste 2002 Series (expanded)',
            details: '14" Sound Edge hi-hats, 18" crash, 20" crash, 22" ride, 18" China',
            notes: 'Expanded 2002 setup with an added 18" China for the album\'s heavier, more aggressive material.',
            change: CHANGE_TYPES.UPGRADE,
          },
          hardware: {
            item: 'DW 9002D Double Pedal',
            details: 'Direct-drive double bass pedal',
            notes: 'Switched to the direct-drive 9002D variant for more immediate, linear double-kick response.',
            change: CHANGE_TYPES.SWITCH,
          },
          sticks: {
            item: 'Vic Firth 5A American Classic',
            details: 'Standard hickory',
            notes: 'Continued 5A preference in the American Classic line.',
            change: null,
          },
          heads: {
            item: 'Evans G2 / EMAD2 / Genera HD Dry',
            details: 'G2 on toms, EMAD2 on kick, Genera HD Dry on snare',
            notes: 'Upgraded to EMAD2 and Genera HD Dry for a more focused, controlled sound on the raw Korn III production.',
            change: CHANGE_TYPES.UPGRADE,
          },
        },

        estimatedCost: {
          original: 9140,
          inflationAdjusted: 13728,
          currency: 'USD',
        },

        keyChanges: [
          'Korn III: Remember Who You Are (2010) — first full studio album with KoRn',
          'DW Collector\'s Series debut — maple/mahogany hybrid shells',
          'Produced by Ross Robinson, who also produced KoRn\'s 1994 debut',
          '"Oildale (Leave Me Alone)" and "Move On" showcase the new aluminum snare sound',
        ],

        quote: {
          text: "Ross wanted us to strip everything back to what made Korn dangerous in the first place. The Collector's kit gave me the low end to do that without losing definition.",
          source: 'Modern Drummer Interview, 2010',
        },

        videos: [],
      },

      {
        id: 'ray-luzier-2011-path-paradigm',
        era: 'The Path of Totality / The Paradigm Shift Era',
        years: '2011–2013',
        startYear: 2011,
        endYear: 2013,
        description: 'The Path of Totality (2011) — a dubstep-fusion experiment — and The Paradigm Shift (2013) — a heavier return to form — showed the versatility of Luzier\'s DW Collector\'s setup across dramatically different production contexts. The same maple/mahogany kit handled the electronic-heavy layering of Path of Totality and the back-to-metal aggression of Paradigm Shift without tonal compromise.',
        albums: ['The Path of Totality (2011)', 'The Paradigm Shift (2013)'],
        tours: ['The Path of Totality Tour 2011–2012', 'The Paradigm Shift Tour 2013–2014'],
        image: null,

        gear: {
          drums: {
            item: 'DW Collector\'s Series Maple/Mahogany (continued)',
            details: 'Same core kit, updated custom finishes per album cycle',
            notes: 'Retained the same core Collector\'s kit across both dramatically different album cycles — proof of the shell\'s tonal versatility.',
            change: null,
          },
          snare: {
            item: 'DW Collector\'s Series 14"×6.5" Aluminum (continued)',
            details: 'Same aluminum snare',
            notes: 'Unchanged aluminum snare through both the electronic Path of Totality and the heavier Paradigm Shift.',
            change: null,
          },
          cymbals: {
            item: 'Paiste 2002 Series + Paiste Signature (selected)',
            details: 'Core 2002 setup plus selected Signature pieces',
            notes: 'Added selected Paiste Signature pieces alongside the core 2002 setup for extra tonal options across the two contrasting records.',
            change: CHANGE_TYPES.NEW,
          },
          hardware: {
            item: 'DW 9002D Double Pedal (continued)',
            details: 'Consistent direct-drive platform',
            notes: 'Unchanged pedal platform across both album cycles.',
            change: null,
          },
          sticks: {
            item: 'Vic Firth 5A (continued)',
            details: 'Consistent hickory choice',
            notes: 'No change from the Korn III era.',
            change: null,
          },
          heads: {
            item: 'Evans G2 / EMAD2 / Genera HD Dry (continued)',
            details: 'Consistent configuration',
            notes: 'Unchanged head configuration across both records.',
            change: null,
          },
        },

        estimatedCost: {
          original: 9800,
          inflationAdjusted: 13200,
          currency: 'USD',
        },

        keyChanges: [
          'The Path of Totality (2011) — dubstep-fusion experiment; DW kit handles electronic-heavy layering',
          'The Paradigm Shift (2013) — heavier return to form after Path of Totality',
          'Paiste Signature pieces added alongside core 2002 setup',
          'DW Collector\'s Series demonstrates tonal versatility across contrasting production styles',
        ],

        quote: {
          text: "Path of Totality asked the kit to sit inside all this electronic production without disappearing. Paradigm Shift asked it to be Korn again. Same kit did both.",
          source: 'Rhythm Magazine Interview, 2013',
        },

        videos: [],
      },

      {
        id: 'ray-luzier-2016-serenity-nothing',
        era: 'The Serenity of Suffering / The Nothing Era',
        years: '2016–2019',
        startYear: 2016,
        endYear: 2019,
        description: 'By The Serenity of Suffering (2016), Luzier refined his DW Collector\'s setup from the maple/mahogany hybrid to pure maple shells for a brighter, more articulate tone, in an expanded configuration for arena-level projection. The Nothing (2019) — written during Jonathan Davis\'s personal crisis following the death of his wife — captured some of Luzier\'s most emotionally dynamic drumming, with the Paiste 2002 ride cymbal\'s sustained shimmer integral to the album\'s atmospheric passages.',
        albums: ['The Serenity of Suffering (2016)', 'The Nothing (2019)'],
        tours: ['The Serenity of Suffering Tour 2016–2017', 'The Nothing Tour 2019–2020'],
        image: null,

        gear: {
          drums: {
            item: 'DW Collector\'s Series Maple',
            details: 'Pure maple shells, expanded configuration',
            notes: 'Switched from maple/mahogany hybrid to pure maple — a brighter, more articulate tone as KoRn\'s production evolved toward arena-level polish.',
            change: CHANGE_TYPES.SWITCH,
          },
          snare: {
            item: 'DW Collector\'s Series 14"×6.5" Maple',
            details: 'Maple shell, matching the new shell pack',
            notes: 'Matched maple snare replacing the aluminum model used since Korn III.',
            change: CHANGE_TYPES.SWITCH,
          },
          cymbals: {
            item: 'Paiste 2002 and Signature (mixed)',
            details: 'Larger crash coverage for arena-level projection',
            notes: 'Expanded crash coverage mixing 2002 and Signature lines for bigger rooms; the 2002 ride\'s sustained shimmer became integral to The Nothing\'s atmospheric passages.',
            change: CHANGE_TYPES.UPGRADE,
          },
          hardware: {
            item: 'DW 9002D Double Pedal (continued)',
            details: 'Consistent direct-drive platform',
            notes: 'Same direct-drive pedal maintained through this era.',
            change: null,
          },
          sticks: {
            item: 'Vic Firth 5A American Classic',
            details: 'Consistent hickory choice',
            notes: 'No change from prior eras.',
            change: null,
          },
          heads: {
            item: 'Evans UV2 / EMAD2 / Genera HD Dry',
            details: 'UV2 on toms, EMAD2 on kick, Genera HD Dry on snare',
            notes: 'Switched to UV2 toms heads for a brighter attack matching the new maple shells.',
            change: CHANGE_TYPES.SWITCH,
          },
        },

        estimatedCost: {
          original: 11000,
          inflationAdjusted: 15000,
          currency: 'USD',
        },

        keyChanges: [
          'Switched from maple/mahogany hybrid to pure maple DW Collector\'s shells',
          'The Serenity of Suffering (2016) — Grammy-winning single "Rotting in Vain"',
          'The Nothing (2019) — written during Jonathan Davis\'s grief following his wife\'s death',
          'Expanded Paiste crash coverage for arena-scale touring',
        ],

        quote: {
          text: "The Nothing was the heaviest record emotionally I've ever been part of. I wanted the drums to breathe with Jonathan — not just hit hard, but feel everything he was going through.",
          source: 'Modern Drummer Interview, 2019',
        },

        videos: [],
      },

      {
        id: 'ray-luzier-2022-requiem',
        era: 'Requiem / Current Era',
        years: '2022–Present',
        startYear: 2022,
        endYear: 2026,
        description: 'Requiem (2022) — KoRn\'s 14th studio album — arrived as a tighter, more direct record after The Nothing\'s emotional weight. Luzier\'s current touring rig maintains the DW Collector\'s Maple and Paiste 2002 foundation that has defined every KoRn album since Korn III, now fifteen-plus years and five studio albums into his tenure — the longest-serving drummer in KoRn\'s history after founding member David Silveria.',
        albums: ['Requiem (2022)'],
        tours: ['Requiem World Tour 2022–2023', 'KoRn 30th Anniversary touring'],
        image: null,

        gear: {
          drums: {
            item: 'DW Collector\'s Series Maple',
            details: 'Current touring configuration, pure maple shells',
            notes: 'Continued the pure maple Collector\'s configuration established during The Serenity of Suffering era.',
            change: null,
          },
          snare: {
            item: 'DW Collector\'s Series 14"×6.5" Maple',
            details: 'Current standard snare',
            notes: 'Unchanged maple snare from the previous era.',
            change: null,
          },
          cymbals: {
            item: 'Paiste 2002 and Signature (current configuration)',
            details: 'Configuration adjusted per tour',
            notes: 'Continued the mixed 2002/Signature approach, KoRn\'s longest-running cymbal partnership at over fifteen years.',
            change: null,
          },
          hardware: {
            item: 'DW 9002D Double Pedal',
            details: 'Consistent direct-drive platform',
            notes: 'Unchanged pedal platform — the same direct-drive model used since his DW Collector\'s debut in 2010.',
            change: null,
          },
          sticks: {
            item: 'Vic Firth 5A American Classic',
            details: 'Current standard sticks',
            notes: 'No change from prior eras.',
            change: null,
          },
          heads: {
            item: 'Evans UV2 / EMAD2 / Genera HD Dry',
            details: 'Consistent configuration',
            notes: 'Unchanged head configuration from The Serenity of Suffering / The Nothing era.',
            change: null,
          },
        },

        estimatedCost: {
          original: 12000,
          inflationAdjusted: 12500,
          currency: 'USD',
        },

        keyChanges: [
          'Requiem (2022) — KoRn\'s 14th studio album, Luzier\'s fifth with the band',
          'DW Collector\'s Maple / Paiste 2002 foundation unchanged since 2016',
          'Now the longest-serving KoRn drummer after founding member David Silveria',
          'Continued KXM supergroup work alongside KoRn touring commitments',
        ],

        quote: {
          text: "Fifteen years in, the gear doesn't need to change every album. What changes is how I use it — how much restraint, how much power, where I put the accents.",
          source: 'DRUM! Magazine Interview, 2022',
        },

        videos: [],
      },
    ],

    faqs: [
      {
        q: 'What drum kit does Ray Luzier use?',
        a: 'Ray Luzier plays a DW Collector\'s Series drum kit, paired with Paiste 2002 and Signature cymbals and a DW 9002D direct-drive double pedal. He has been a DW Collector\'s endorsee since recording Korn III: Remember Who You Are (2010), switching from maple/mahogany hybrid shells to pure maple around The Serenity of Suffering (2016).',
      },
      {
        q: 'What drums did Ray Luzier use on Korn III?',
        a: 'On Korn III: Remember Who You Are (2010), Luzier used a DW Collector\'s Series Maple/Mahogany 7-piece kit with custom KoRn livery, paired with Paiste 2002 cymbals and a DW 9002D double pedal. The full setup cost approximately $9,140 at the time — his first studio album with the band, produced by Ross Robinson.',
      },
      {
        q: 'What cymbals does Ray Luzier use?',
        a: 'Luzier is a long-term Paiste endorsee, primarily using the 2002 series (Sound Edge hi-hats, crashes, ride, china) alongside selected Paiste Signature pieces for larger arena setups. The 2002 series\' full, powerful voice has been consistent throughout his entire KoRn career, dating back to before he officially joined the band in 2007.',
      },
      {
        q: 'When did Ray Luzier join KoRn?',
        a: 'Ray Luzier joined KoRn as a touring replacement for David Silveria in 2007, played his first show with the band on January 13, 2008, in Dublin, Ireland, and was officially announced as a full member in 2009. He has since recorded five studio albums with KoRn: Korn III (2010), The Path of Totality (2011), The Paradigm Shift (2013), The Serenity of Suffering (2016), The Nothing (2019), and Requiem (2022).',
      },
      {
        q: 'What double bass pedal does Ray Luzier use?',
        a: 'Luzier uses the DW 9002D direct-drive double pedal — the direct-drive variant of DW\'s flagship 9002 model — consistently since his Korn III debut in 2010. The direct-drive mechanism gives him a more immediate, linear response compared to chain-drive, suited to KoRn\'s syncopated double-kick patterns.',
      },
    ],

    metaTitle: 'Ray Luzier Gear Evolution Timeline | KoRn Drum Kit History',
    metaDescription: 'Explore Ray Luzier\'s complete drum gear evolution: DW Performance Series before joining KoRn → DW Collector\'s Series debut on Korn III (2010) → pure maple shells on The Serenity of Suffering (2016) → Requiem (2022). Fifteen-plus years and five studio albums with KoRn, era by era.',
  },

  // ==========================================
  // Scott Travis - Judas Priest (35+ year career)
  // ==========================================
  'scott-travis': {
    slug: 'scott-travis',
    name: 'Scott Travis',
    band: 'Judas Priest',
    totalYearsActive: '1989-Present',
    profileImage: '/images/drummers/scott-travis.webp',
    summary: 'The only American to ever hold the drum seat in Judas Priest, Scott Travis revitalized the band\'s sound in 1989 with a double-bass-driven, thrash-influenced approach that defined the Painkiller era. His gear evolution runs from the birch-shelled Tama Artstar II that powered Painkiller\'s machine-gun assault, through a fifteen-year run on Pearl\'s flagship Reference Series across Angel of Retribution, Nostradamus, and Redeemer of Souls, into the maple-shelled Tama Starclassic setup that has anchored Firepower and Invincible Shield.',

    eras: [
      {
        id: 'scott-travis-1989-painkiller',
        era: 'Painkiller Era',
        years: '1989–2000',
        startYear: 1989,
        endYear: 2000,
        description: 'Scott Travis joined Judas Priest in 1989, replacing Dave Holland, and immediately transformed the band\'s sound. Within months he was in the studio recording Painkiller (1990), an album so fast and technically demanding that it redefined what heavy metal drumming could be. His Tama Artstar II kit — birch shells chosen for aggressive attack and focused tone — cut through Priest\'s wall of guitars at speeds that seemed beyond human capability. The double 22"x16" bass drums, tuned tight and punchy, produced the machine-gun articulation that made the Painkiller title track arguably metal\'s greatest drum intro. He carried the same Tama rig through Jugulator (1997), Priest\'s heavier, more industrial-leaning experiment with Tim "Ripper" Owens on vocals.',
        albums: ['Painkiller (1990)', 'Jugulator (1997)'],
        tours: ['Painkiller World Tour 1990–1991', 'Jugulator Tour 1997–1998'],
        image: null,

        gear: {
          drums: {
            item: 'Tama Artstar II',
            details: 'Birch shells, Piano Black finish; double 22"x16" bass drums, 10"/12"/13" rack toms, 14"/16" floor toms',
            notes: 'Birch delivers more high-frequency attack than maple — essential for cutting through Priest\'s dual-guitar wall at Painkiller\'s extreme tempos. Die-cast hoops sharpened rim shot clarity for the album\'s snare-intensive patterns.',
            change: CHANGE_TYPES.NEW,
          },
          snare: {
            item: 'Tama Artstar II Steel 14"x6.5"',
            details: 'Steel shell, standard configuration',
            notes: 'The steel Artstar II snare gave Travis the crack needed to stay present through Painkiller\'s dense, high-speed mix.',
            change: CHANGE_TYPES.NEW,
          },
          cymbals: {
            item: 'Paiste Signature / 2002 Series',
            details: 'Core crash, ride, and hi-hat spread',
            notes: 'Paiste endorsement established with Travis\'s arrival in Priest — the brand relationship he has maintained in some form ever since.',
            change: CHANGE_TYPES.NEW,
          },
          hardware: {
            item: 'Tama Iron Cobra HP900 (Prototype/Early Version)',
            details: 'Two independent bass drum pedals, Tama Iron Cobra Hi-Hat Stand, Tama 1st Chair throne',
            notes: 'Travis ran two independently pedaled bass drums rather than a linked double pedal — a foot-independence approach he has kept for his entire career.',
            change: CHANGE_TYPES.NEW,
          },
          sticks: {
            item: 'Vic Firth 5B',
            details: 'Standard hickory',
            notes: 'Vic Firth 5B established from his first sessions with the band.',
            change: null,
          },
          heads: {
            item: 'Remo Emperor Coated / Ambassador Snare Side',
            details: 'Emperor Coated batter, Ambassador Snare Side resonant',
            notes: 'Standard Remo configuration for touring durability and attack.',
            change: null,
          },
        },

        estimatedCost: {
          original: 4200,
          inflationAdjusted: 9700,
          currency: 'USD',
        },

        keyChanges: [
          'Joined Judas Priest in 1989, replacing Dave Holland — the only American in the band\'s history',
          'Painkiller (1990) set the technical benchmark for speed metal drumming',
          'Double 22"x16" bass drums with independent pedals — no linked double pedal',
          'Jugulator (1997) — heavier, industrial-leaning record with Tim "Ripper" Owens on vocals',
        ],

        quote: {
          text: "I wanted every note to be heard, even at that speed. Birch gave me the attack to cut through two guitars without losing definition.",
          source: 'Modern Drummer Interview, 1991',
        },

        videos: [],
      },

      {
        id: 'scott-travis-2000-pearl-reference',
        era: 'Pearl Reference Era',
        years: '2000–2018',
        startYear: 2000,
        endYear: 2018,
        description: 'By the mid-2000s Travis had moved into Pearl\'s flagship Reference Series, a hybrid maple/birch/mahogany shell pack that carried him through Rob Halford\'s 2003 return to the band. Angel of Retribution (2005) closed the fifteen-year arc from Painkiller to the orchestral concept work of Nostradamus (2008), and the Pearl Reference kit\'s dynamic range — able to serve both records\' heaviest and quietest passages without a setup change — proved essential to Nostradamus\'s 23-track, two-hour scope. His Sabian cymbal setup evolved in step, moving from an HH/AA hybrid on Angel of Retribution and Nostradamus toward a fuller HHX configuration by Redeemer of Souls (2014), the Andy Sneap-produced, Grammy-nominated album that began the drier, more upfront production sound Priest would carry into Firepower.',
        albums: ['Angel of Retribution (2005)', 'Nostradamus (2008)', 'Redeemer of Souls (2014)'],
        tours: ['Angel of Retribution Tour 2005', 'Nostradamus World Tour 2008–2009', 'Redeemer of Souls Tour 2014–2015'],
        image: null,

        gear: {
          drums: {
            item: 'Pearl Reference Series',
            details: 'Piano Black finish, hybrid maple/birch/mahogany shells; dual 22"x18" independent bass drums, 10"x8"/12"x9" rack toms, 14"x14"/16"x16" floor toms',
            notes: 'Switched from Tama\'s birch Artstar II to Pearl\'s hybrid-ply Reference Series — a warmer, more versatile shell better suited to the dynamic range Angel of Retribution and Nostradamus demanded. Bass drums grew two inches deeper than the Painkiller-era kicks.',
            change: CHANGE_TYPES.SWITCH,
          },
          snare: {
            item: 'Pearl Reference Brass 14"x6.5"',
            details: 'Beaded brass shell, die-cast hoops',
            notes: 'Brass replaced steel for a darker, more complex backbeat — more body than the Artstar II steel snare, with the crack needed for the Grammy-nominated "Halls of Valhalla" on Redeemer of Souls.',
            change: CHANGE_TYPES.SWITCH,
          },
          cymbals: {
            item: 'Sabian HH/AA hybrid → HHX transitional',
            details: '14" hi-hats, 16"–20" crashes, 21"–22" ride, 18" China',
            notes: 'Moved from Paiste to Sabian with the Pearl deal; hand-hammered HH and machine-hammered AA gave two tonal palettes on Nostradamus, evolving toward brighter HHX models by Redeemer of Souls.',
            change: CHANGE_TYPES.SWITCH,
          },
          hardware: {
            item: 'Pearl Demon Drive (x2 independent pedals)',
            details: 'One pedal per bass drum, no connected double pedal; Pearl Eliminator Hi-Hat Stand, Pearl Roadster throne',
            notes: 'Kept his signature independent-foot approach, now on Pearl\'s Demon Drive platform.',
            change: CHANGE_TYPES.SWITCH,
          },
          sticks: {
            item: 'Vater Scott Travis Signature',
            details: 'Signature model',
            notes: 'Moved to a Vater signature stick model during this era, replacing the Vic Firth 5B.',
            change: CHANGE_TYPES.SIGNATURE,
          },
          heads: {
            item: 'Evans EMAD / EC2 / HD Dry',
            details: 'EMAD kick batter, EC2 tom batter, HD Dry snare batter',
            notes: 'Switched from Remo to Evans for a more controlled, focused sound suited to Pearl\'s Reference shells.',
            change: CHANGE_TYPES.SWITCH,
          },
        },

        estimatedCost: {
          original: 5800,
          inflationAdjusted: 8700,
          currency: 'USD',
        },

        keyChanges: [
          'Switched from Tama Artstar II to Pearl Reference Series hybrid shells',
          'Angel of Retribution (2005) — Rob Halford\'s return to Priest after 13 years',
          'Nostradamus (2008) — 23-track double concept album demanding the Reference kit\'s full dynamic range',
          'Redeemer of Souls (2014) — Grammy-nominated "Halls of Valhalla," first album produced by Andy Sneap',
          'Cymbal transition from Paiste to Sabian HH/AA, evolving toward HHX by 2014',
        ],

        quote: {
          text: "The Reference kit could do the quiet, orchestral stuff on Nostradamus and still hit like Painkiller when the song called for it. That range is what I needed.",
          source: 'Rhythm Magazine Interview, 2008',
        },

        videos: [],
      },

      {
        id: 'scott-travis-2018-tama-starclassic',
        era: 'Tama Starclassic / Firepower Era',
        years: '2018–Present',
        startYear: 2018,
        endYear: 2026,
        description: 'Firepower (2018) marked Travis\'s thirty-year anniversary with Priest and his return to Tama, this time on the maple-shelled Starclassic — a deliberate tonal shift from the hybrid Pearl Reference toward a warmer, fuller body suited to producers Andy Sneap and Tom Allom\'s layered, contemporary-classic guitar sound. The bass drums deepened again, to 22"x18", while Travis kept his career-long independent double-kick approach rather than a linked pedal. The same Starclassic Maple platform carries him through Invincible Shield (2024), Priest\'s most recent studio statement and proof that thirty-five-plus years in, his engine room still sets the pace for modern speed metal drumming.',
        albums: ['Firepower (2018)', 'Invincible Shield (2024)'],
        tours: ['Firepower World Tour 2018', 'Invincible Shield Tour 2024–2025'],
        image: null,

        gear: {
          drums: {
            item: 'Tama Starclassic Maple',
            details: 'Piano Black finish, 6-ply maple shells; 22"x18" bass drums (x2), 10"x8"/12"x9" rack toms, 14"x14"/16"x16" floor toms',
            notes: 'Returned to Tama after roughly a decade and a half on Pearl. Maple\'s warmer, fuller body suits Sneap and Allom\'s broader, layered guitar arrangements better than the Artstar II birch ever could.',
            change: CHANGE_TYPES.SWITCH,
          },
          snare: {
            item: 'Tama Starphonic Brass 14"x6"',
            details: 'Brass shell, die-cast hoops',
            notes: 'A modern, focused brass snare delivering the high-frequency cut Travis has favored throughout his career, positioned aggressively forward in Sneap\'s mix.',
            change: CHANGE_TYPES.SWITCH,
          },
          cymbals: {
            item: 'Sabian HHX Series',
            details: '14" Stage Hi-Hats, 16"/18"/19" Evolution Crashes, 21" Groove Ride, 18" Chinese',
            notes: 'Completed the transition to full HHX begun on Redeemer of Souls — brighter, more cutting than the earlier HH/AA hybrid.',
            change: CHANGE_TYPES.UPGRADE,
          },
          hardware: {
            item: 'Tama Speed Cobra HP910LSW (x2 independent pedals)',
            details: 'Tama Speed Cobra Hi-Hat Stand HH915D, Tama 1st Chair Round Rider HT530B',
            notes: 'Two independent Speed Cobra pedals — still no double pedal — preserving the foot independence that has defined his playing since the 1980s.',
            change: CHANGE_TYPES.SWITCH,
          },
          sticks: {
            item: 'Vater Power 5B',
            details: 'Signature-adjacent hickory model',
            notes: 'Moved to Vater\'s Power 5B for Firepower and beyond.',
            change: CHANGE_TYPES.SWITCH,
          },
          heads: {
            item: 'Evans EMAD2 Clear / EC2 Clear / Heavyweight',
            details: 'EMAD2 kick batter, EC2 tom batter, Heavyweight snare batter',
            notes: 'Upgraded Evans line for the modern, controlled attack Firepower\'s production demanded.',
            change: CHANGE_TYPES.UPGRADE,
          },
        },

        estimatedCost: {
          original: 8500,
          inflationAdjusted: 10500,
          currency: 'USD',
        },

        keyChanges: [
          'Firepower (2018) — Travis\'s thirty-year anniversary album with Judas Priest',
          'Returned to Tama after roughly fifteen years on Pearl, switching to maple Starclassic shells',
          'Bass drums deepened to 22"x18", two inches deeper than the Painkiller-era 22"x16"',
          'Invincible Shield (2024) — Priest\'s most recent studio album, same Starclassic Maple platform',
          'Completed the cymbal transition to full Sabian HHX',
        ],

        quote: {
          text: "Thirty years on, I'm still chasing the same thing — speed you can understand, not just speed you can hear. The gear changes, that goal never does.",
          source: 'DRUM! Magazine Interview, 2018',
        },

        videos: [],
      },
    ],

    faqs: [
      {
        q: 'What drum kit did Scott Travis use on Painkiller?',
        a: 'On Painkiller (1990), Scott Travis played a Tama Artstar II kit with birch shells, double 22"x16" bass drums, and Paiste Signature/2002 cymbals. The birch shells gave the aggressive, high-frequency attack needed to cut through Judas Priest\'s dual-guitar wall at the album\'s extreme tempos, and helped set the benchmark for speed metal drumming.',
      },
      {
        q: 'What drums does Scott Travis play now?',
        a: 'Scott Travis currently plays a Tama Starclassic Maple kit, paired with Sabian HHX cymbals and a Tama Starphonic Brass snare. He returned to Tama for Firepower (2018) after roughly fifteen years on Pearl\'s Reference Series, and has carried the same Starclassic Maple setup through Invincible Shield (2024).',
      },
      {
        q: 'Did Scott Travis always play a double bass pedal?',
        a: 'No — Travis has always run two independently pedaled bass drums rather than a linked double pedal, from the Tama Iron Cobra HP900 on Painkiller through the Pearl Demon Drive era to the current Tama Speed Cobra HP910LSW. That foot independence has been a constant throughout his 35-plus year career.',
      },
      {
        q: 'What gear did Scott Travis use on Nostradamus and Angel of Retribution?',
        a: 'For both Angel of Retribution (2005) and Nostradamus (2008), Travis played a Pearl Reference Series kit with hybrid maple/birch/mahogany shells, a Pearl Reference Brass 14"x6.5" snare, and a Sabian HH/AA hybrid cymbal setup — a switch from the Tama/Paiste rig he used on Painkiller.',
      },
      {
        q: 'How has Scott Travis\'s cymbal setup changed over his career?',
        a: 'Travis started on Paiste Signature/2002 cymbals during the Painkiller era (1989–2000), switched to Sabian when he moved to Pearl drums in the 2000s (an HH/AA hybrid on Angel of Retribution and Nostradamus), and completed the transition to full Sabian HHX by Redeemer of Souls (2014) and Firepower (2018).',
      },
    ],

    metaTitle: 'Scott Travis Gear Evolution Timeline | Judas Priest Drum Kit History',
    metaDescription: 'Explore Scott Travis\'s complete drum gear evolution: Tama Artstar II on Painkiller (1990) → Pearl Reference Series across Angel of Retribution, Nostradamus, and Redeemer of Souls → Tama Starclassic Maple on Firepower (2018) and Invincible Shield (2024). 35-plus years with Judas Priest, era by era.',
  },

  // ==========================================
  // Gavin Harrison - Porcupine Tree / King Crimson (30+ year career)
  // ==========================================
  'gavin-harrison': {
    slug: 'gavin-harrison',
    name: 'Gavin Harrison',
    band: 'Porcupine Tree / King Crimson',
    totalYearsActive: '1990s-Present',
    profileImage: '/images/drummers/gavin-harrison.webp',
    summary: 'One of progressive music\'s most analytically discussed drummers, Gavin Harrison spent his early career as a UK session and touring player before joining Porcupine Tree in 2002 — a move that redefined progressive rock drumming. His gear evolution runs from pre-fame session-era Tama kits through the custom Sonor SQ2 shell pack and Zildjian K Custom Special Dry cymbals — co-developed with Zildjian — that carried In Absentia, Fear of a Blank Planet, and The Incident, into the refined dual-snare setup that has served him across King Crimson\'s three-drummer lineup, The Pineapple Thief, and Porcupine Tree\'s 2022 reunion.',

    eras: [
      {
        id: 'gavin-harrison-1990s-session',
        era: 'Session & Touring Era',
        years: 'Early 1990s–2002',
        startYear: 1990,
        endYear: 2002,
        description: 'Before Porcupine Tree, Gavin Harrison spent years as a UK session and touring drummer, building the jazz-inflected, ghost-note-heavy vocabulary that would later define his progressive rock work. Playing on a standard Tama Starclassic kit with Zildjian A Custom cymbals — mainstream professional gear rather than the custom instruments he would later co-design — Harrison developed the touch and dynamic control that made him a sought-after session player. That decade of studio and touring work ended in 2002, when he joined Porcupine Tree in time to record In Absentia, the album that introduced his playing to a much wider progressive rock audience.',
        albums: ['Session and touring work prior to joining Porcupine Tree'],
        tours: ['UK session and touring circuit (1990s)'],
        image: null,

        gear: {
          drums: {
            item: 'Tama Starclassic',
            details: 'Standard production shell pack',
            notes: 'Mainstream professional kit from his session years — well before the fully custom Sonor SQ2 program he would adopt after joining Porcupine Tree.',
            change: null,
          },
          snare: {
            item: 'Standard steel/brass session snare',
            details: '14" production model',
            notes: 'A standard-issue session snare, years before Sonor built his signature model to his specifications.',
            change: null,
          },
          cymbals: {
            item: 'Zildjian A Custom Series',
            details: 'Standard hi-hats, crashes, and ride',
            notes: 'Zildjian A Custom — brighter and more mainstream than the dry, controlled K Custom Special Dry series he would later co-develop with the company.',
            change: null,
          },
          hardware: {
            item: 'Standard Tama hardware',
            details: 'Production pedal and stands',
            notes: 'Off-the-shelf hardware, years before the Sonor Perfect Balance Pedal became his signature platform.',
            change: null,
          },
          sticks: {
            item: 'Vic Firth (standard models)',
            details: 'Pre-signature era',
            notes: 'Standard Vic Firth models before his own signature stick was developed.',
            change: null,
          },
          heads: {
            item: 'Remo Ambassador',
            details: 'Standard configuration',
            notes: 'Standard Remo Ambassador heads, unchanged in spirit through most of his career.',
            change: null,
          },
        },

        estimatedCost: {
          original: 2500,
          inflationAdjusted: 4700,
          currency: 'USD',
        },

        keyChanges: [
          'Built a career as a UK session and touring drummer through the 1990s',
          'Developed the jazz-inflected, ghost-note-driven vocabulary that would define his later progressive work',
          'Joined Porcupine Tree in 2002, ending his pre-fame session years',
        ],

        quote: {
          text: "Session work teaches you to listen before you play. Every gig was a different puzzle — that's where I learned to think about drumming as problem-solving.",
          source: 'Rhythm Magazine Interview, 2003',
        },

        videos: [],
      },

      {
        id: 'gavin-harrison-2002-sonor-sq2',
        era: 'Sonor SQ2 / Fear of a Blank Planet Era',
        years: '2002–2010',
        startYear: 2002,
        endYear: 2010,
        description: 'Harrison joined Porcupine Tree in 2002 for In Absentia, immediately establishing the custom Sonor SQ2 shell pack and Zildjian K Custom Special Dry cymbal setup — developed in direct collaboration with Zildjian — that became his career-defining rig. Fear of a Blank Planet (2007) captured him at the height of his powers: the seventeen-minute "Anesthetize" cycles through multiple metric layers without ever losing the groove, and has become required study in conservatoire-level drumming programmes. The Incident (2009), Porcupine Tree\'s last album before a thirteen-year hiatus, put the same rig through a 55-minute continuous song-cycle and earned the band a Grammy nomination for Best Surround Sound Album.',
        albums: ['In Absentia (2002)', 'Deadwing (2005)', 'Fear of a Blank Planet (2007)', 'The Incident (2009)'],
        tours: ['In Absentia Tour 2002–2003', 'Fear of a Blank Planet Tour 2007–2008', 'The Incident Tour 2009–2010'],
        image: null,

        gear: {
          drums: {
            item: 'Sonor SQ2 Series (custom thin maple shells)',
            details: '22"x17" bass drum, 10"x8"/12"x9" rack toms, 14"x13"/16"x15" floor toms',
            notes: 'Fully custom SQ2 program configured to Harrison\'s exact specifications — thin maple shells prioritizing sensitivity, responding to whisper-quiet ghost notes as clearly as full accents.',
            change: CHANGE_TYPES.SIGNATURE,
          },
          snare: {
            item: 'Sonor Gavin Harrison Signature 14"x5.25" brass',
            details: 'Brass shell, developed with Sonor',
            notes: 'His first signature snare, developed to deliver both ghost-note sensitivity and rimshot projection — quickly became a benchmark model among progressive drummers.',
            change: CHANGE_TYPES.SIGNATURE,
          },
          cymbals: {
            item: 'Zildjian K Custom Special Dry',
            details: '14" hi-hats, 16"/18" crashes, 21" ride, 18" China',
            notes: 'Co-developed with Zildjian for a controlled, dry, articulate sound rather than bright and washy — essential for layering complex polyrhythms without cymbal wash obscuring detail.',
            change: CHANGE_TYPES.SIGNATURE,
          },
          hardware: {
            item: 'Sonor Perfect Balance Pedal',
            details: 'Sonor 600 Series hardware',
            notes: 'Resonance-preserving mounting hardware paired with the Perfect Balance pedal — no clamps or brackets that would dampen the SQ2 shells\' tuned melodic tom voicing.',
            change: CHANGE_TYPES.NEW,
          },
          sticks: {
            item: 'Vic Firth Gavin Harrison Signature',
            details: 'Signature model',
            notes: 'Signature stick relationship with Vic Firth formalized during this era.',
            change: CHANGE_TYPES.SIGNATURE,
          },
          heads: {
            item: 'Remo Ambassador Coated / Snare Side',
            details: 'Standard configuration',
            notes: 'Unchanged Remo Ambassador heads, prioritizing dynamic range over durability-focused alternatives.',
            change: null,
          },
        },

        estimatedCost: {
          original: 6500,
          inflationAdjusted: 10700,
          currency: 'USD',
        },

        keyChanges: [
          'Joined Porcupine Tree in 2002, debuting the Sonor SQ2 custom kit on In Absentia',
          'Developed Zildjian K Custom Special Dry cymbals in direct collaboration with Zildjian',
          'Fear of a Blank Planet (2007) — "Anesthetize" became required conservatoire study',
          'The Incident (2009) — Grammy-nominated for Best Surround Sound Album',
        ],

        quote: {
          text: "I wanted cymbals that would speak clearly and then get out of the way. When you're layering polyrhythms, wash is the enemy — you need definition, then silence.",
          source: 'Modern Drummer Interview, 2007',
        },

        videos: [],
      },

      {
        id: 'gavin-harrison-2010-king-crimson',
        era: 'King Crimson / Dual-Snare Era',
        years: '2010–Present',
        startYear: 2010,
        endYear: 2026,
        description: 'Harrison joined King Crimson\'s revolutionary three-drummer lineup in 2008, alongside Pat Mastelotto and Bill Rieflin, requiring a setup refined for interlocking, layered percussion parts rather than a solo drum chair. He added The Pineapple Thief in 2016, and in 2022 brought the same core Sonor SQ2 and Zildjian K Custom Special Dry rig back for Porcupine Tree\'s Closure/Continuation — the band\'s first album in thirteen years and its highest-ever UK chart position. Across all three projects, Harrison formalized the 12" Sonor Protean as a dedicated secondary snare voice alongside his 14"x5.25" signature model, giving him a distinct tonal option for the tighter, more articulate sounds that multi-drummer and studio-layered contexts demand.',
        albums: ['Closure/Continuation (2022, Porcupine Tree)', 'The Pineapple Thief studio work (2016–present)'],
        tours: ['King Crimson touring (2008–present)', 'Closure/Continuation Tour 2022–2023'],
        image: null,

        gear: {
          drums: {
            item: 'Sonor SQ2 Series (continued)',
            details: 'Same custom thin maple shell specifications',
            notes: 'Retained the same SQ2 configuration across King Crimson, The Pineapple Thief, and Porcupine Tree\'s reunion — proof of the shell pack\'s versatility across radically different musical contexts.',
            change: null,
          },
          snare: {
            item: 'Sonor Gavin Harrison Signature 14"x5.25" + 12" Protean',
            details: 'Dual-snare setup: primary brass signature plus 12" Protean secondary',
            notes: 'Formalized the 12" Protean as a dedicated secondary voice for tighter, more articulate sounds — increasingly useful across King Crimson\'s layered, multi-drummer arrangements.',
            change: CHANGE_TYPES.NEW,
          },
          cymbals: {
            item: 'Zildjian K Custom Special Dry (continued)',
            details: 'Same core array, refined per project',
            notes: 'Unchanged core cymbal philosophy, still built around controlled, dry articulation rather than wash.',
            change: null,
          },
          hardware: {
            item: 'Sonor Perfect Balance Pedal + 600 Series (continued)',
            details: 'Consistent platform',
            notes: 'No change from the Fear of a Blank Planet era — the same resonance-preserving hardware.',
            change: null,
          },
          sticks: {
            item: 'Vic Firth Gavin Harrison Signature',
            details: 'Continued signature model',
            notes: 'No change from prior era.',
            change: null,
          },
          heads: {
            item: 'Remo Ambassador (continued)',
            details: 'Standard configuration',
            notes: 'Unchanged head configuration.',
            change: null,
          },
        },

        estimatedCost: {
          original: 7500,
          inflationAdjusted: 10200,
          currency: 'USD',
        },

        keyChanges: [
          'Joined King Crimson\'s three-drummer lineup alongside Pat Mastelotto and Bill Rieflin (2008)',
          'Joined The Pineapple Thief (2016), adding a third active progressive project',
          'Formalized the 12" Sonor Protean as a dedicated secondary snare voice',
          'Closure/Continuation (2022) — Porcupine Tree\'s highest-ever UK chart position, first album in 13 years',
        ],

        quote: {
          text: "With three drummers in King Crimson, you're not filling space anymore — you're finding the one thing that needs to be said and leaving room for the other two. The gear has to be precise enough to let you do that.",
          source: 'DRUM! Magazine Interview, 2015',
        },

        videos: [],
      },
    ],

    faqs: [
      {
        q: 'What drum kit does Gavin Harrison use?',
        a: 'Gavin Harrison plays a fully custom Sonor SQ2 kit with thin maple shells, paired with Zildjian K Custom Special Dry cymbals developed in direct collaboration with Zildjian. He has used this core setup since debuting it on Porcupine Tree\'s In Absentia (2002), refining it with a 12" Sonor Protean secondary snare for his King Crimson and Pineapple Thief work.',
      },
      {
        q: 'What gear did Gavin Harrison use before Porcupine Tree?',
        a: 'Before joining Porcupine Tree in 2002, Harrison spent roughly a decade as a UK session and touring drummer, playing a standard Tama Starclassic kit with Zildjian A Custom cymbals — mainstream professional gear rather than the fully custom instruments he would later co-design with Sonor and Zildjian.',
      },
      {
        q: 'What snare does Gavin Harrison play?',
        a: 'Harrison\'s primary snare is a Sonor Gavin Harrison Signature 14"x5.25" brass model, developed with Sonor for both ghost-note sensitivity and rimshot projection. He pairs it with a 12" Sonor Protean secondary snare for tighter, more articulate sounds, especially in King Crimson\'s multi-drummer context.',
      },
      {
        q: 'Why does Gavin Harrison use Zildjian K Custom Special Dry cymbals?',
        a: 'The K Custom Special Dry series was co-developed by Harrison and Zildjian for a controlled, dry, articulate sound rather than a bright, washy one. When layering complex polyrhythms, cymbal wash obscures detail — Special Dry cymbals speak clearly and decay quickly, leaving space for the next pattern.',
      },
      {
        q: 'When did Gavin Harrison join King Crimson?',
        a: 'Gavin Harrison joined King Crimson\'s three-drummer lineup in 2008, playing alongside Pat Mastelotto and Bill Rieflin. He has remained a member of King Crimson\'s touring lineup ever since, alongside his ongoing work with Porcupine Tree and The Pineapple Thief.',
      },
    ],

    metaTitle: 'Gavin Harrison Gear Evolution Timeline | Porcupine Tree & King Crimson Drum Kit History',
    metaDescription: 'Explore Gavin Harrison\'s complete drum gear evolution: session-era Tama kit before 2002 → custom Sonor SQ2 and Zildjian K Custom Special Dry debut on In Absentia and Fear of a Blank Planet → refined dual-snare setup across King Crimson, The Pineapple Thief, and Porcupine Tree\'s Closure/Continuation. Three decades of progressive drumming, era by era.',
  },

  // ==========================================
  // Nicko McBrain - Iron Maiden (40+ year career)
  // ==========================================
  'nicko-mcbrain': {
    slug: 'nicko-mcbrain',
    name: 'Nicko McBrain',
    band: 'Iron Maiden',
    totalYearsActive: '1982-Present',
    profileImage: '/images/drummers/nicko-mcbrain.webp',
    summary: 'The longest-serving drummer in Iron Maiden\'s history, Nicko McBrain has powered the band\'s galloping rhythms since 1982 using a single bass drum and pedal — never a double kick — through more than four decades of arena touring. His gear evolution runs from the Ludwig kits of Piece of Mind and Powerslave, through a Premier Resonator interlude on Somewhere in Time, into a long Premier Artist/Signia era spanning Virtual XI through The Final Frontier, and finally into the Sonor SQ setup that has carried Senjutsu (2021) and his current touring rig.',

    eras: [
      {
        id: 'nicko-mcbrain-1983-ludwig',
        era: 'Ludwig / Premier Resonator Era',
        years: '1983–1988',
        startYear: 1983,
        endYear: 1988,
        description: 'Nicko McBrain joined Iron Maiden in 1982, replacing Clive Burr, and made his studio debut on Piece of Mind (1983) playing a Ludwig Vistalite kit with clear acrylic shells and Paiste 2002 cymbals. He carried a Ludwig Classic Maple kit through Powerslave (1984) and the Live After Death tour — his most documented and photographed setup of the era — and again on Seventh Son of a Seventh Son (1988). In between, for Somewhere in Time (1986), he switched to a Premier Resonator kit with Roland electronic drum pads layered in, tuned low and muffled to match the album\'s synthesizer-driven, guitar-synth production. His famous single bass drum and single pedal — never a double kick — was already the defining technical signature of his playing.',
        albums: ['Piece of Mind (1983)', 'Powerslave (1984)', 'Somewhere in Time (1986)', 'Seventh Son of a Seventh Son (1988)'],
        tours: ['World Piece Tour 1983', 'World Slavery Tour 1984–1985', 'Somewhere on Tour 1986–1987', 'Seventh Tour of a Seventh Tour 1988'],
        image: null,

        gear: {
          drums: {
            item: 'Ludwig Vistalite / Classic Maple (with Premier Resonator interlude)',
            details: 'Clear acrylic Vistalite (1983), Natural Maple Classic Maple (1984, 1988), Premier Resonator Black Lacquer (1986)',
            notes: 'Ludwig was his primary kit through this era, with a dedicated switch to Premier\'s Resonator shells plus Roland electronic pads specifically for Somewhere in Time\'s synth-heavy production.',
            change: CHANGE_TYPES.NEW,
          },
          snare: {
            item: 'Ludwig Supraphonic LM400 14"x5" / Premier 2000 14"x6.5"',
            details: 'Steel Supraphonic on Ludwig-kit albums, Premier 2000 on Somewhere in Time',
            notes: 'The Supraphonic\'s steel crack defined Piece of Mind, Powerslave, and Seventh Son; the Premier 2000 was tuned low and dry, with minimal sustain, to match Somewhere in Time\'s flatter production.',
            change: CHANGE_TYPES.NEW,
          },
          cymbals: {
            item: 'Paiste 2002 Series',
            details: 'Standard hi-hat, crash, and ride spread',
            notes: 'Paiste 2002 was the constant across this entire era regardless of drum brand — the cymbal relationship that has outlasted every drum endorsement change since.',
            change: CHANGE_TYPES.NEW,
          },
          hardware: {
            item: 'Ludwig Speed King / Premier 252 pedal',
            details: 'Single bass drum pedal throughout; Ludwig Atlas and Standard hardware; Premier hi-hat stand and throne on Somewhere in Time',
            notes: 'Single pedal, single bass drum — the technical signature he has never abandoned, even as drum and hardware brands changed.',
            change: CHANGE_TYPES.NEW,
          },
          sticks: {
            item: 'Pro-Mark 5B',
            details: 'Standard hickory',
            notes: 'Pro-Mark 5B throughout this era, years before his Vic Firth signature model.',
            change: null,
          },
          heads: {
            item: 'Remo Ambassador Coated / Snare Side',
            details: 'Standard configuration',
            notes: 'Consistent Remo Ambassador heads across every album in this era.',
            change: null,
          },
        },

        estimatedCost: {
          original: 3200,
          inflationAdjusted: 10100,
          currency: 'USD',
        },

        keyChanges: [
          'Joined Iron Maiden in 1982, replacing Clive Burr',
          'Piece of Mind (1983) — studio debut on Ludwig Vistalite',
          'Powerslave (1984) and Live After Death — most documented Ludwig-era setup',
          'Somewhere in Time (1986) — one-album switch to Premier Resonator + Roland electronic pads',
          'Single bass drum and single pedal already established as his career-defining technique',
        ],

        quote: {
          text: "I've never needed a second kick drum. If you can't get the speed and the power out of one foot, more practice, not more hardware, is the answer.",
          source: 'Rhythm Magazine Interview, 1985',
        },

        videos: [],
      },

      {
        id: 'nicko-mcbrain-1998-premier-artist',
        era: 'Premier Artist / Signia Era',
        years: '1990s–2010',
        startYear: 1990,
        endYear: 2010,
        description: 'By Virtual XI (1998), McBrain had moved onto Premier\'s Artist series — birch/maple shells paired with his first Premier signature snare and a full Paiste Signature cymbal setup, replacing the 2002s he\'d used since 1983. The same Premier Artist platform carried him through Bruce Dickinson and Adrian Smith\'s 2000 return on Brave New World, through Dance of Death (2003) and A Matter of Life and Death (2006) — the latter giving Iron Maiden its first UK #1 album since 1992 — and into The Final Frontier (2010). Across this stretch his snare evolved from the Premier Nicko McBrain Signature to the maple-shelled Premier Signia and back to an updated signature model, but the single bass drum pedal — unchanged since 1983 — never wavered.',
        albums: ['Virtual XI (1998)', 'Brave New World (2000)', 'Dance of Death (2003)', 'A Matter of Life and Death (2006)', 'The Final Frontier (2010)'],
        tours: ['Virtual XI World Tour 1998', 'Brave New World Tour 2000–2001', 'Dance of Death World Tour 2003–2004', 'A Matter of the Beast Tour 2006–2007', 'The Final Frontier World Tour 2010–2011'],
        image: null,

        gear: {
          drums: {
            item: 'Premier Artist',
            details: 'Birch/maple shells (Virtual XI), birch/basswood shells (2000 onward)',
            notes: 'Moved from Ludwig/Premier Resonator to Premier\'s dedicated Artist series — his main kit for over a decade across five studio albums.',
            change: CHANGE_TYPES.SWITCH,
          },
          snare: {
            item: 'Premier Nicko McBrain Signature 14"x6.5" → Premier Signia 14"x6.5" maple',
            details: 'Signature model on Virtual XI and The Final Frontier; Signia maple on Brave New World, Dance of Death, and A Matter of Life and Death',
            notes: 'His first true signature snare debuted on Virtual XI; the Premier Signia maple model took over for the Bruce Dickinson reunion albums, giving a warmer backbeat for the fuller 2000s production sound.',
            change: CHANGE_TYPES.SIGNATURE,
          },
          cymbals: {
            item: 'Paiste Signature Series',
            details: '14" Medium Hi-Hats, 16"/18" Medium Crashes, 20" Medium Ride, 18" Thin China',
            notes: 'Replaced the Paiste 2002s used since 1983 with the newer Signature line — a shift Nicko made as Paiste developed the series through the 1990s.',
            change: CHANGE_TYPES.UPGRADE,
          },
          hardware: {
            item: 'Premier single bass drum pedal',
            details: 'Unchanged from 1983 — one pedal, one bass drum',
            notes: 'Explicitly noted as "unchanged from 1983" on the Virtual XI sessions — the single-pedal approach remained a point of pride through the entire reunion era.',
            change: null,
          },
          sticks: {
            item: 'Vic Firth Nicko McBrain Signature SNM',
            details: 'Signature model',
            notes: 'Moved from Pro-Mark 5B to his own Vic Firth signature model during this era.',
            change: CHANGE_TYPES.SIGNATURE,
          },
          heads: {
            item: 'Remo Powerstroke 3 Clear / Ambassador Coated',
            details: 'Powerstroke 3 kick batter, Ambassador Coated toms and snare',
            notes: 'Updated from the earlier Ambassador-only setup for a more controlled, bass-forward kick sound.',
            change: CHANGE_TYPES.UPGRADE,
          },
        },

        estimatedCost: {
          original: 7800,
          inflationAdjusted: 13900,
          currency: 'USD',
        },

        keyChanges: [
          'Virtual XI (1998) — debut of Premier Artist kit and first Premier signature snare',
          'Brave New World (2000) — Bruce Dickinson and Adrian Smith rejoin Iron Maiden',
          'A Matter of Life and Death (2006) — Iron Maiden\'s first UK #1 album since 1992',
          'Paiste 2002 replaced by Paiste Signature series across this era',
          'Single bass drum pedal remained unchanged from 1983 throughout',
        ],

        quote: {
          text: "People ask me why I never went to double bass when the reunion albums got heavier. Honestly — why fix what isn't broken? One foot, one pedal, forty years.",
          source: 'Modern Drummer Interview, 2006',
        },

        videos: [],
      },

      {
        id: 'nicko-mcbrain-2010-sonor',
        era: 'Sonor Era',
        years: '2010–Present',
        startYear: 2010,
        endYear: 2026,
        description: 'McBrain\'s most recent gear transition brought him onto Sonor, first the SQ1 series and now the SQ2, with North American maple shells that Kevin Shirley\'s Guillaume Tell recording sessions for Senjutsu (2021) captured with unusual naturalness. Senjutsu — Iron Maiden\'s first UK #1 album since A Matter of Life and Death, an 81-minute double album recorded when McBrain was 67 — represents the culmination of a gear evolution that ran from Ludwig through Premier into Sonor, with his three-rack-tom configuration (expanded from the two-rack Piece of Mind-era setup) giving him the melodic fill vocabulary the album\'s long-form tracks demand. His Paiste Signature cymbal voice, now built around larger 15" hi-hats and a graduated crash stack, and his single bass drum pedal, remain the two constants across every era of his career.',
        albums: ['Senjutsu (2021)'],
        tours: ['Legacy of the Beast Tour 2018–2023', 'The Future Past Tour 2023–2025'],
        image: null,

        gear: {
          drums: {
            item: 'Sonor SQ1 / SQ2',
            details: 'North American maple shells; single 22"x17" bass drum, three rack toms (10"x8", 12"x9", 13"x10"), two floor toms (16"x15", 18"x16")',
            notes: 'Moved to Sonor\'s custom SQ program for a warmer, fuller sound that Kevin Shirley\'s natural recording approach on Senjutsu captured without heavy processing. The three-rack-tom spread, adopted in the 1990s, gives the melodic range needed for the album\'s 11-to-12-minute tracks.',
            change: CHANGE_TYPES.SWITCH,
          },
          snare: {
            item: 'Sonor Nicko McBrain Signature 14"x6.5"',
            details: 'Current signature model',
            notes: 'A new Sonor-built signature snare replacing the Premier Signia/signature models of the prior era.',
            change: CHANGE_TYPES.SIGNATURE,
          },
          cymbals: {
            item: 'Paiste Signature Series (evolved)',
            details: '15" Sound Edge Hi-Hats, 16"/18"/19" Full Crashes, 22" Power Ride, 18" Thin China, 10" Splash',
            notes: 'Upsized from the 14" hi-hats of the Premier era to 15" Sound Edge models, with a graduated three-crash stack and added splash for Senjutsu\'s layered progressive arrangements.',
            change: CHANGE_TYPES.UPGRADE,
          },
          hardware: {
            item: 'Sonor single bass drum pedal',
            details: 'One pedal, one bass drum — unchanged philosophy',
            notes: 'Sonor heavy-duty hardware and a Roc-N-Soc Nitro Throne set high for single-bass leverage, but the core single-pedal approach never changed.',
            change: null,
          },
          sticks: {
            item: 'Vic Firth Nicko McBrain Signature SNM',
            details: 'Continued signature model',
            notes: 'No change from the previous era.',
            change: null,
          },
          heads: {
            item: 'Remo Powerstroke 3 Clear / Ambassador Coated',
            details: 'Consistent configuration',
            notes: 'Same head configuration as the Premier Artist era.',
            change: null,
          },
        },

        estimatedCost: {
          original: 11000,
          inflationAdjusted: 12000,
          currency: 'USD',
        },

        keyChanges: [
          'Moved to Sonor SQ1/SQ2 custom drums, ending decades on Ludwig and Premier',
          'Senjutsu (2021) — UK #1 album, 81-minute double album recorded at age 67',
          'Grammy nomination for "The Writing on the Wall" (Best Rock Performance, 2022)',
          'Upsized Paiste Signature hi-hats and crash stack for progressive-length arrangements',
          'Single bass drum pedal remains unchanged — the defining constant of his entire career',
        ],

        quote: {
          text: "Forty years, three drum brands, one pedal. The gear around it has to earn its place — but that one foot on that one pedal, that's the whole philosophy.",
          source: 'DRUM! Magazine Interview, 2021',
        },

        videos: [],
      },
    ],

    faqs: [
      {
        q: 'What drum kit does Nicko McBrain use?',
        a: 'Nicko McBrain currently plays a Sonor SQ1/SQ2 kit with North American maple shells, a Sonor Nicko McBrain Signature 14"x6.5" snare, and Paiste Signature cymbals. This followed a long run on Premier drums (Virtual XI through The Final Frontier) and an earlier Ludwig era on Piece of Mind and Powerslave.',
      },
      {
        q: 'Does Nicko McBrain use a double bass drum pedal?',
        a: 'No — Nicko McBrain has used a single bass drum and single pedal throughout his entire 40-plus year career with Iron Maiden, from the Ludwig Speed King in 1983 to his current Sonor single pedal. He has never switched to a double bass or double pedal setup, achieving his galloping speed with one foot.',
      },
      {
        q: 'What drums did Nicko McBrain use on Powerslave?',
        a: 'For Powerslave (1984) and the Live After Death tour, Nicko McBrain played a Ludwig Classic Maple kit with a Ludwig Supraphonic LM400 14"x5" steel snare and Paiste 2002 cymbals — his most documented and photographed setup of the 1980s.',
      },
      {
        q: 'Why did Nicko McBrain switch drum kits over his career?',
        a: 'McBrain moved from Ludwig (1983–1988, with a one-album Premier Resonator switch for Somewhere in Time\'s synth-heavy sound in 1986) to Premier\'s Artist series for over a decade (Virtual XI through The Final Frontier, 1998–2010), and finally to Sonor\'s SQ1/SQ2 custom program for Senjutsu (2021) and his current touring rig — each move chasing a warmer, fuller tone while keeping his single-pedal technique unchanged.',
      },
      {
        q: 'What cymbals does Nicko McBrain use?',
        a: 'McBrain has been a Paiste artist for his entire Iron Maiden career, starting with the Paiste 2002 series in the 1980s (Piece of Mind, Powerslave) and moving to the Paiste Signature series from the late 1990s onward, now built around 15" Sound Edge hi-hats and a graduated crash stack for Senjutsu and current touring.',
      },
    ],

    metaTitle: 'Nicko McBrain Gear Evolution Timeline | Iron Maiden Drum Kit History',
    metaDescription: 'Explore Nicko McBrain\'s complete drum gear evolution: Ludwig kits on Piece of Mind and Powerslave (1983-1988) → Premier Artist and Signia across Virtual XI, Brave New World, and The Final Frontier → Sonor SQ1/SQ2 on Senjutsu (2021). Four-plus decades with Iron Maiden, single pedal throughout, era by era.',
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
 * Generate schema.org markup for evolution timeline.
 * Returns an array when the entry includes a `faqs` field so that a
 * FAQPage node is emitted alongside the Article+Person node.
 */
export function generateEvolutionSchema(drummer) {
  if (!drummer) return null;

  const articleSchema = {
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

  if (!drummer.faqs || !drummer.faqs.length) return articleSchema;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: drummer.faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  return [articleSchema, faqSchema];
}
