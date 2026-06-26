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
