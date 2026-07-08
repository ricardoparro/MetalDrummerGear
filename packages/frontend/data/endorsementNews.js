// Endorsement News & Timeline Data
// Issue #802: Drummer Endorsement Tracker & News Section
// CEO Idea: CEO-017 - Endorsement changes drive traffic + social engagement

/**
 * Endorsement categories
 */
export const ENDORSEMENT_CATEGORIES = {
  DRUMS: 'drums',
  CYMBALS: 'cymbals',
  STICKS: 'sticks',
  HEADS: 'heads',
  HARDWARE: 'hardware',
  ELECTRONICS: 'electronics',
};

/**
 * Change type for highlighting what happened
 */
export const ENDORSEMENT_CHANGE_TYPES = {
  SIGNED: 'signed',         // New endorsement deal signed
  RENEWED: 'renewed',       // Existing deal renewed
  SWITCHED: 'switched',     // Switched from one brand to another
  ENDED: 'ended',           // Endorsement ended
  SIGNATURE: 'signature',   // Got signature product
};

/**
 * Get emoji for change type
 */
export function getChangeTypeEmoji(changeType) {
  switch (changeType) {
    case ENDORSEMENT_CHANGE_TYPES.SIGNED:
      return '✍️';
    case ENDORSEMENT_CHANGE_TYPES.RENEWED:
      return '🔄';
    case ENDORSEMENT_CHANGE_TYPES.SWITCHED:
      return '🔀';
    case ENDORSEMENT_CHANGE_TYPES.ENDED:
      return '👋';
    case ENDORSEMENT_CHANGE_TYPES.SIGNATURE:
      return '⭐';
    default:
      return '📰';
  }
}

/**
 * Get label for change type
 */
export function getChangeTypeLabel(changeType) {
  switch (changeType) {
    case ENDORSEMENT_CHANGE_TYPES.SIGNED:
      return 'New Deal';
    case ENDORSEMENT_CHANGE_TYPES.RENEWED:
      return 'Renewed';
    case ENDORSEMENT_CHANGE_TYPES.SWITCHED:
      return 'Brand Switch';
    case ENDORSEMENT_CHANGE_TYPES.ENDED:
      return 'Ended';
    case ENDORSEMENT_CHANGE_TYPES.SIGNATURE:
      return 'Signature Gear';
    default:
      return 'Update';
  }
}

/**
 * Format date for display
 */
export function formatEndorsementDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Get relative time (e.g., "2 weeks ago")
 */
export function formatRelativeTime(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 14) return '1 week ago';
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 60) return '1 month ago';
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} year${Math.floor(diffDays / 365) > 1 ? 's' : ''} ago`;
}

/**
 * Recent endorsement news (last 6 months of changes)
 * This is the data for the homepage widget and news section
 */
export const ENDORSEMENT_NEWS = [
  {
    id: 'eloy-slipknot-2024',
    drummerSlug: 'eloy-casagrande',
    drummerName: 'Eloy Casagrande',
    band: 'Slipknot',
    date: '2024-04-01',
    changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
    category: ENDORSEMENT_CATEGORIES.DRUMS,
    title: 'Eloy Casagrande Joins Slipknot',
    headline: 'Eloy Casagrande announced as new Slipknot drummer',
    description: 'Former Sepultura drummer Eloy Casagrande replaces Jay Weinberg as Slipknot\'s new drummer. He maintains his existing endorsements with Yamaha drums, Paiste cymbals, and Evans heads.',
    brands: {
      kept: ['Yamaha', 'Paiste', 'Evans'],
    },
    source: 'Official Slipknot announcement',
    sourceUrl: 'https://slipknot1.com',
    impact: 'high',
    featured: true,
  },
  {
    id: 'jay-weinberg-suicidal-2024',
    drummerSlug: 'jay-weinberg',
    drummerName: 'Jay Weinberg',
    band: 'Suicidal Tendencies',
    date: '2024-01-15',
    changeType: ENDORSEMENT_CHANGE_TYPES.SWITCHED,
    category: ENDORSEMENT_CATEGORIES.DRUMS,
    title: 'Jay Weinberg Joins Suicidal Tendencies',
    headline: 'After Slipknot departure, Jay Weinberg joins Suicidal Tendencies',
    description: 'Following his departure from Slipknot in November 2023, Jay Weinberg joins Suicidal Tendencies and Infectious Grooves. He continues with SJC drums, Zildjian cymbals, and Vater sticks.',
    brands: {
      kept: ['SJC Custom Drums', 'Zildjian', 'Vater', 'Evans'],
    },
    source: 'Suicidal Tendencies announcement',
    impact: 'high',
    featured: true,
  },
  {
    id: 'mike-portnoy-dt-return-2023',
    drummerSlug: 'mike-portnoy',
    drummerName: 'Mike Portnoy',
    band: 'Dream Theater',
    date: '2023-10-26',
    changeType: ENDORSEMENT_CHANGE_TYPES.RENEWED,
    category: ENDORSEMENT_CATEGORIES.DRUMS,
    title: 'Mike Portnoy Returns to Dream Theater',
    headline: 'Mike Portnoy returns to Dream Theater after 13 years',
    description: 'Legendary drummer Mike Portnoy rejoins Dream Theater after 13 years, continuing his longtime partnerships with Tama drums and Sabian cymbals. This marks one of metal\'s most anticipated reunions.',
    brands: {
      kept: ['Tama', 'Sabian', 'Promark', 'Remo'],
    },
    source: 'Dream Theater official',
    impact: 'high',
    featured: true,
  },
  {
    id: 'charlie-benante-pantera-2022',
    drummerSlug: 'charlie-benante',
    drummerName: 'Charlie Benante',
    band: 'Pantera (touring)',
    date: '2022-12-01',
    changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
    category: ENDORSEMENT_CATEGORIES.DRUMS,
    title: 'Charlie Benante Drums for Pantera Reunion',
    headline: 'Anthrax\'s Charlie Benante fills in for late Vinnie Paul in Pantera reunion',
    description: 'Charlie Benante steps in to fill the legendary drum throne left by the late Vinnie Paul for Pantera\'s reunion tours. He continues using his Tama kit setup with Paiste cymbals.',
    brands: {
      kept: ['Tama', 'Paiste', 'Vic Firth', 'Evans'],
    },
    source: 'Pantera reunion announcement',
    impact: 'high',
    featured: true,
  },
  {
    id: 'alex-bent-trivium-2016',
    drummerSlug: 'alex-bent',
    drummerName: 'Alex Bent',
    band: 'Trivium',
    date: '2016-07-15',
    changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
    category: ENDORSEMENT_CATEGORIES.DRUMS,
    title: 'Alex Bent Joins Trivium',
    headline: 'Alex Bent becomes Trivium\'s new permanent drummer',
    description: 'After several drummer changes, Trivium finds stability with Alex Bent. He brings his Pearl Masters setup and Zildjian cymbals to the band.',
    brands: {
      new: ['Pearl', 'Zildjian', 'Vic Firth', 'Evans'],
    },
    source: 'Trivium official',
    impact: 'medium',
  },
  {
    id: 'art-cruz-lamb-of-god-2019',
    drummerSlug: 'art-cruz',
    drummerName: 'Art Cruz',
    band: 'Lamb of God',
    date: '2019-07-19',
    changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
    category: ENDORSEMENT_CATEGORIES.DRUMS,
    title: 'Art Cruz Replaces Chris Adler in Lamb of God',
    headline: 'Art Cruz becomes Lamb of God\'s new drummer',
    description: 'Following Chris Adler\'s departure, Art Cruz becomes Lamb of God\'s permanent drummer. He uses Pearl drums, Meinl cymbals, and Promark sticks.',
    brands: {
      new: ['Pearl', 'Meinl', 'Promark', 'Evans'],
    },
    source: 'Lamb of God announcement',
    impact: 'high',
  },
];

/**
 * Comprehensive endorsement timeline data for each drummer
 * Tracks brand switches and endorsement history throughout their career
 */
export const ENDORSEMENT_TIMELINE = {
  'lars-ulrich': {
    slug: 'lars-ulrich',
    name: 'Lars Ulrich',
    band: 'Metallica',
    currentEndorsements: {
      drums: { brand: 'Tama', model: 'Starclassic Maple', since: '1986', signature: 'LU1465 Snare' },
      cymbals: { brand: 'Zildjian', model: 'A Custom Series', since: '1981' },
      sticks: { brand: 'Ahead', model: 'Lars Ulrich Signature', since: '1996', signature: true },
      heads: { brand: 'Remo', since: '1986' },
      hardware: { brand: 'Tama', model: 'Iron Cobra 900', since: '1990s' },
    },
    timeline: [
      {
        year: 1981,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.CYMBALS,
        from: null,
        to: 'Zildjian',
        notes: 'Started with Zildjian A series cymbals when forming Metallica',
      },
      {
        year: 1984,
        changeType: ENDORSEMENT_CHANGE_TYPES.SWITCHED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: 'Camco',
        to: 'Tama',
        notes: 'Upgraded from Camco to Tama Artstar II during Ride the Lightning era',
      },
      {
        year: 1996,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNATURE,
        category: ENDORSEMENT_CATEGORIES.STICKS,
        brand: 'Ahead',
        product: 'Lars Ulrich Signature Aluminum Sticks',
        notes: 'First signature drumstick, made with aluminum for durability',
      },
      {
        year: 2000,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNATURE,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        brand: 'Tama',
        product: 'LU1465 Signature Snare Drum',
        notes: '14x6.5" signature snare drum with steel shell',
      },
    ],
  },
  'joey-jordison': {
    slug: 'joey-jordison',
    name: 'Joey Jordison',
    band: 'Slipknot',
    currentEndorsements: {
      drums: { brand: 'Pearl', model: 'Reference Series', since: '2010' },
      cymbals: { brand: 'Paiste', model: 'RUDE & 2002 Series', since: '2000' },
      sticks: { brand: 'Promark', model: 'TX515W Joey Jordison', since: '2008', signature: true },
      heads: { brand: 'Evans', since: '2005' },
      hardware: { brand: 'Pearl', model: 'Demon Drive', since: '2010' },
    },
    timeline: [
      {
        year: 1999,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: 'ddrum',
        to: 'Pearl',
        notes: 'Signed with Pearl after Slipknot debut album success',
      },
      {
        year: 1999,
        changeType: ENDORSEMENT_CHANGE_TYPES.SWITCHED,
        category: ENDORSEMENT_CATEGORIES.CYMBALS,
        from: 'Zildjian',
        to: 'Paiste',
        notes: 'Switched to Paiste RUDE series for heavier, more aggressive sound',
      },
      {
        year: 2008,
        changeType: ENDORSEMENT_CHANGE_TYPES.SWITCHED,
        category: ENDORSEMENT_CATEGORIES.STICKS,
        from: 'Ahead',
        to: 'Promark',
        notes: 'Moved from Ahead aluminum sticks to Promark signature wood sticks',
      },
      {
        year: 2010,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNATURE,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        brand: 'Pearl',
        product: 'Joey Jordison Signature Snare 13x6.5"',
        notes: 'Signature snare with unique blood splatter finish',
      },
    ],
  },
  'tomas-haake': {
    slug: 'tomas-haake',
    name: 'Tomas Haake',
    band: 'Meshuggah',
    currentEndorsements: {
      drums: { brand: 'Sonor', model: 'SQ2 Series', since: '2005' },
      cymbals: { brand: 'Sabian', model: 'HHX & AAX Series', since: '2000s' },
      sticks: { brand: 'Wincent', model: 'Tomas Haake Signature', since: '2010', signature: true },
      heads: { brand: 'Remo', model: 'Coated Emperor', since: '2000s' },
      hardware: { brand: 'Tama', model: 'Speed Cobra', since: '2010s' },
    },
    timeline: [
      {
        year: 2005,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: null,
        to: 'Sonor',
        notes: 'Long-term partnership with Sonor for SQ2 series drums',
      },
      {
        year: 2010,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNATURE,
        category: ENDORSEMENT_CATEGORIES.STICKS,
        brand: 'Wincent',
        product: 'Tomas Haake Signature Sticks',
        notes: 'Custom signature sticks designed for polymetric playing',
      },
    ],
  },
  'dave-lombardo': {
    slug: 'dave-lombardo',
    name: 'Dave Lombardo',
    band: 'Slayer / Dead Cross',
    currentEndorsements: {
      drums: { brand: 'Pearl', model: 'Reference Series', since: '2000s' },
      cymbals: { brand: 'Paiste', model: 'RUDE Series', since: '2000s' },
      sticks: { brand: 'Vic Firth', since: '1990s' },
      heads: { brand: 'Remo', since: '1980s' },
    },
    timeline: [
      {
        year: 1981,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: null,
        to: 'Pearl',
        notes: 'First kit was Pearl Maxwin, started long relationship with Pearl',
      },
      {
        year: 1986,
        changeType: ENDORSEMENT_CHANGE_TYPES.RENEWED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        brand: 'Pearl',
        notes: 'Continued with Pearl through Reign in Blood era',
      },
    ],
  },
  'george-kollias': {
    slug: 'george-kollias',
    name: 'George Kollias',
    band: 'Nile',
    currentEndorsements: {
      drums: { brand: 'Pearl', model: 'Masterworks Series', since: '2000s' },
      cymbals: { brand: 'Zildjian', model: 'A Custom Series', since: '2000s' },
      sticks: { brand: 'Vic Firth', since: '2000s' },
      heads: { brand: 'Evans', since: '2000s' },
      hardware: { brand: 'Pearl', model: 'Demon XR Pedals', since: '2010s', signature: true },
    },
    timeline: [
      {
        year: 2015,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNATURE,
        category: ENDORSEMENT_CATEGORIES.HARDWARE,
        brand: 'Pearl',
        product: 'Demon XR Bass Drum Pedals',
        notes: 'Co-designed signature bass drum pedals with Pearl for extreme speed',
      },
    ],
  },
  'eloy-casagrande': {
    slug: 'eloy-casagrande',
    name: 'Eloy Casagrande',
    band: 'Slipknot',
    currentEndorsements: {
      drums: { brand: 'Yamaha', since: '2010s' },
      cymbals: { brand: 'Paiste', model: '2002, Formula 602, Masters', since: '2005' },
      sticks: { brand: 'Vic Firth', since: '2010s' },
      heads: { brand: 'Evans', since: '2010s' },
    },
    timeline: [
      {
        year: 2005,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.CYMBALS,
        from: null,
        to: 'Paiste',
        notes: 'Became Paiste artist at age 17, youngest to sign with the brand at the time',
      },
      {
        year: 2024,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        brand: 'Yamaha',
        notes: 'Maintained Yamaha endorsement after joining Slipknot',
      },
    ],
  },
  'jay-weinberg': {
    slug: 'jay-weinberg',
    name: 'Jay Weinberg',
    band: 'Suicidal Tendencies',
    currentEndorsements: {
      drums: { brand: 'SJC Custom Drums', since: '2014' },
      cymbals: { brand: 'Zildjian', since: '2014' },
      sticks: { brand: 'Vater', model: '5B', since: '2014' },
      heads: { brand: 'Evans', since: '2014' },
      hardware: { brand: 'DW', since: '2014' },
    },
    timeline: [
      {
        year: 2014,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: null,
        to: 'SJC Custom Drums',
        notes: 'Joined SJC when becoming Slipknot drummer',
      },
      {
        year: 2023,
        changeType: ENDORSEMENT_CHANGE_TYPES.ENDED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        brand: 'SJC',
        notes: 'Left Slipknot in November 2023, maintained all endorsements',
      },
      {
        year: 2024,
        changeType: ENDORSEMENT_CHANGE_TYPES.RENEWED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        brand: 'SJC Custom Drums',
        notes: 'Continued with SJC after joining Suicidal Tendencies',
      },
    ],
  },
  'mike-portnoy': {
    slug: 'mike-portnoy',
    name: 'Mike Portnoy',
    band: 'Dream Theater',
    currentEndorsements: {
      drums: { brand: 'Tama', since: '1980s' },
      cymbals: { brand: 'Sabian', since: '1980s' },
      sticks: { brand: 'Promark', since: '2000s' },
      heads: { brand: 'Remo', since: '1980s' },
    },
    timeline: [
      {
        year: 1985,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: null,
        to: 'Tama',
        notes: 'One of the longest-running Tama endorsements in metal',
      },
      {
        year: 1985,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.CYMBALS,
        from: null,
        to: 'Sabian',
        notes: 'Long-term Sabian artist with signature cymbals',
      },
      {
        year: 2023,
        changeType: ENDORSEMENT_CHANGE_TYPES.RENEWED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        brand: 'Tama',
        notes: 'Returned to Dream Theater with same Tama setup after 13 years',
      },
    ],
  },
  'danny-carey': {
    slug: 'danny-carey',
    name: 'Danny Carey',
    band: 'Tool',
    currentEndorsements: {
      drums: { brand: 'Sonor', model: 'Custom', since: '2000s' },
      cymbals: { brand: 'Paiste', model: 'Signature Series', since: '1990s', signature: true },
      sticks: { brand: 'Vic Firth', model: 'Danny Carey Signature', since: '2000s', signature: true },
      heads: { brand: 'Evans', since: '2000s' },
      electronics: { brand: 'Mandala', since: '2000s' },
    },
    timeline: [
      {
        year: 2000,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNATURE,
        category: ENDORSEMENT_CATEGORIES.CYMBALS,
        brand: 'Paiste',
        product: 'Dry Heavy Ride - Monad',
        notes: 'Signature ride cymbal with unique sound characteristics',
      },
      {
        year: 2005,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNATURE,
        category: ENDORSEMENT_CATEGORIES.STICKS,
        brand: 'Vic Firth',
        product: 'Danny Carey Signature Sticks',
        notes: 'Custom signature sticks designed for dynamic playing',
      },
    ],
  },
  'mario-duplantier': {
    slug: 'mario-duplantier',
    name: 'Mario Duplantier',
    band: 'Gojira',
    currentEndorsements: {
      drums: { brand: 'Tama', since: '2010s' },
      cymbals: { brand: 'Meinl', since: '2010s' },
      sticks: { brand: 'Vic Firth', since: '2010s' },
      heads: { brand: 'Remo', since: '2010s' },
    },
    timeline: [
      {
        year: 2010,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: null,
        to: 'Tama',
        notes: 'Signed with Tama during The Way of All Flesh touring cycle',
      },
    ],
  },
  'brann-dailor': {
    slug: 'brann-dailor',
    name: 'Brann Dailor',
    band: 'Mastodon',
    currentEndorsements: {
      drums: { brand: 'Tama', model: 'Starclassic Performer B/B', since: '2000s' },
      cymbals: { brand: 'Meinl', model: 'Mb20 & Mb8 Series', since: '2000s' },
      sticks: { brand: 'Vater', model: '5B', since: '2000s' },
      heads: { brand: 'Evans', model: 'G2 Clear', since: '2000s' },
      hardware: { brand: 'Tama', model: 'Speed Cobra', since: '2010s' },
    },
    timeline: [
      {
        year: 2002,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: null,
        to: 'Tama',
        notes: 'Joined Tama family during Remission era',
      },
      {
        year: 2004,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.CYMBALS,
        from: null,
        to: 'Meinl',
        notes: 'Switched to Meinl for their dark, complex tones',
      },
    ],
  },
  'chris-adler': {
    slug: 'chris-adler',
    name: 'Chris Adler',
    band: 'ex-Lamb of God / Firstborne',
    currentEndorsements: {
      drums: { brand: 'Mapex', model: 'Saturn in Satin Black Maple Burl', since: '2010s', signature: true },
      cymbals: { brand: 'Meinl', model: 'Byzance & Pure Alloy', since: '2000s' },
      sticks: { brand: 'Promark', model: 'TX5AXW Chris Adler Signature', since: '2000s', signature: true },
      heads: { brand: 'Evans', since: '2000s' },
      hardware: { brand: 'Trick', model: 'Pro V', since: '2010s' },
    },
    timeline: [
      {
        year: 2005,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNATURE,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        brand: 'Mapex',
        product: 'Warbird Signature Snare',
        notes: 'Signature snare designed for aggressive attack',
      },
      {
        year: 2008,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNATURE,
        category: ENDORSEMENT_CATEGORIES.STICKS,
        brand: 'Promark',
        product: 'TX5AXW Chris Adler Signature',
        notes: 'Signature sticks with modified 5AX design',
      },
      {
        year: 2019,
        changeType: ENDORSEMENT_CHANGE_TYPES.ENDED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        brand: 'Mapex',
        notes: 'Left Lamb of God due to Musician\'s Dystonia, continued with Mapex for Firstborne',
      },
    ],
  },
  'matt-halpern': {
    slug: 'matt-halpern',
    name: 'Matt Halpern',
    band: 'Periphery',
    currentEndorsements: {
      drums: { brand: 'Pearl', since: '2015', signature: true },
      cymbals: { brand: 'Meinl', model: 'Artist Concept', since: '2010s', signature: true },
      sticks: { brand: 'Promark', since: '2015', signature: true },
      heads: { brand: 'Evans', since: '2010s' },
    },
    timeline: [
      {
        year: 2010,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: 'Mapex',
        to: 'Yamaha',
        notes: 'Initial endorsement with Yamaha during early Periphery days',
      },
      {
        year: 2015,
        changeType: ENDORSEMENT_CHANGE_TYPES.SWITCHED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: 'Yamaha',
        to: 'Pearl',
        notes: 'Switched to Pearl with signature snare drum deal',
      },
      {
        year: 2016,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNATURE,
        category: ENDORSEMENT_CATEGORIES.CYMBALS,
        brand: 'Meinl',
        product: 'Artist Concept Double Down Stack',
        notes: 'Signature cymbal stack for djent-style playing',
      },
    ],
  },
  'inferno': {
    slug: 'inferno',
    name: 'Inferno',
    band: 'Behemoth',
    currentEndorsements: {
      drums: { brand: 'Pearl', model: 'Reference Series', since: '2000s' },
      cymbals: { brand: 'Paiste', model: 'RUDE Series', since: '2000s' },
      sticks: { brand: 'Vic Firth', model: 'American Classic Extreme 5B', since: '2000s' },
      heads: { brand: 'Evans', since: '2000s' },
      hardware: { brand: 'Monolit', model: 'Czarcie Kopyto', since: '2010s' },
    },
    timeline: [
      {
        year: 2005,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: null,
        to: 'Pearl',
        notes: 'Long-term Pearl endorser through Behemoth\'s rise',
      },
    ],
  },
  'charlie-benante': {
    slug: 'charlie-benante',
    name: 'Charlie Benante',
    band: 'Anthrax / Pantera (touring)',
    currentEndorsements: {
      drums: { brand: 'Tama', since: '1980s' },
      cymbals: { brand: 'Paiste', since: '1980s' },
      sticks: { brand: 'Vic Firth', since: '1990s' },
      heads: { brand: 'Evans', since: '2000s' },
      hardware: { brand: 'Tama', model: 'Speed Cobra', since: '2010s' },
    },
    timeline: [
      {
        year: 1985,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: null,
        to: 'Tama',
        notes: 'Pioneer of thrash drumming, early Tama endorser',
      },
      {
        year: 2022,
        changeType: ENDORSEMENT_CHANGE_TYPES.RENEWED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        brand: 'Tama',
        notes: 'Continued with Tama for Pantera reunion tours',
      },
    ],
  },
  'jaska-raatikainen': {
    slug: 'jaska-raatikainen',
    name: 'Jaska Raatikainen',
    band: 'Children of Bodom',
    currentEndorsements: {
      drums: { brand: 'Pearl', model: 'Masters Premium Maple', since: '2005' },
      cymbals: { brand: 'Zildjian', model: 'A Custom & K Custom Series', since: '1999' },
      sticks: { brand: 'Vic Firth', model: 'American Classic 5A', since: '1999' },
      heads: { brand: 'Remo', since: '2005' },
      hardware: { brand: 'Pearl', model: 'Eliminator Double Pedal', since: '2005' },
    },
    timeline: [
      {
        year: 1999,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: null,
        to: 'Tama',
        notes: 'Moved to an early Tama custom maple kit for Hatebreeder (1999), Children of Bodom\'s first endorsed gear setup after the pre-endorsement Pearl kit used on debut Something Wild (1997)',
      },
      {
        year: 1999,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.CYMBALS,
        from: null,
        to: 'Zildjian',
        notes: 'Zildjian A Series cymbals became an official partnership on Hatebreeder (1999), continuing the brand Raatikainen had played since Something Wild',
      },
      {
        year: 2005,
        changeType: ENDORSEMENT_CHANGE_TYPES.SWITCHED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: 'Tama',
        to: 'Pearl',
        notes: 'Are You Dead Yet? (2005) marked the switch to Pearl Masters Premium Maple — the kit he played through Children of Bodom\'s final album Hexed (2019)',
      },
      {
        year: 2005,
        changeType: ENDORSEMENT_CHANGE_TYPES.SWITCHED,
        category: ENDORSEMENT_CATEGORIES.HARDWARE,
        from: 'DW',
        to: 'Pearl',
        notes: 'The Pearl Eliminator double pedal replaced the DW 5000 used since Hatebreeder, debuting alongside the Pearl Masters kit on Are You Dead Yet?',
      },
    ],
  },
  'bill-ward': {
    slug: 'bill-ward',
    name: 'Bill Ward',
    band: 'Black Sabbath',
    currentEndorsements: {
      drums: { brand: 'Ludwig', model: 'Classic Maple', since: '1968' },
      cymbals: { brand: 'Paiste', model: '2002 & Giant Beat Series', since: '1975' },
      sticks: { brand: 'Vic Firth', model: 'American Classic 2B', since: '1970s' },
      heads: { brand: 'Remo', since: '1970s' },
      hardware: { brand: 'Ludwig', model: 'Atlas Pro Double Pedal', since: '1970s' },
    },
    timeline: [
      {
        year: 1970,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: null,
        to: 'Ludwig',
        notes: 'Black Sabbath\'s debut album introduced Ward\'s Ludwig Super Classic kit, anchored by a Ludwig Acrolite snare and Speed King pedal used throughout the classic Ozzy-era lineup',
      },
      {
        year: 1970,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.CYMBALS,
        from: null,
        to: 'Zildjian',
        notes: 'Avedis Zildjian hi-hats, ride, and crash carried Paranoid (1970) and Master of Reality (1971)',
      },
      {
        year: 1975,
        changeType: ENDORSEMENT_CHANGE_TYPES.SWITCHED,
        category: ENDORSEMENT_CATEGORIES.CYMBALS,
        from: 'Zildjian',
        to: 'Paiste',
        notes: 'Sabotage marked the switch to an expanded Paiste 2002 setup — 15" hi-hats, a 24" ride, and Ward\'s first-ever 18" China cymbal',
      },
    ],
  },
  'john-otto': {
    slug: 'john-otto',
    name: 'John Otto',
    band: 'Limp Bizkit',
    currentEndorsements: {
      drums: { brand: 'OCDP', model: 'Custom Type 5 Acrylic', since: '2003' },
      cymbals: { brand: 'Zildjian', model: 'A & A Custom Series', since: '1997' },
      sticks: { brand: 'Zildjian', model: 'Artist Series', since: '1997' },
      heads: { brand: 'Remo', model: 'Emperor Coated', since: '1997' },
      hardware: { brand: 'Gibraltar', model: 'G Class Bass Drum Pedals', since: '2003' },
    },
    timeline: [
      {
        year: 1997,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: null,
        to: 'Pearl',
        notes: 'Limp Bizkit\'s debut Three Dollar Bill, Y\'all$ (1997) documented Otto\'s Pearl Export kit',
      },
      {
        year: 1997,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.CYMBALS,
        from: null,
        to: 'Zildjian',
        notes: 'Zildjian A and A Custom cymbals have anchored Otto\'s kit since Limp Bizkit\'s 1997 debut',
      },
      {
        year: 1999,
        changeType: ENDORSEMENT_CHANGE_TYPES.SWITCHED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: 'Pearl',
        to: 'Sonor',
        notes: 'Significant Other (1999) saw Otto move to a Sonor Force 3007 kit with a 14x6.5" steel snare',
      },
      {
        year: 2003,
        changeType: ENDORSEMENT_CHANGE_TYPES.SWITCHED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: 'Sonor',
        to: 'OCDP',
        notes: 'Results May Vary (2003) introduced the custom Orange County Drum & Percussion maple-shell kit Otto has played ever since, through Gold Cobra (2011) and Still Sucks (2021)',
      },
    ],
  },
  'ben-koller': {
    slug: 'ben-koller',
    name: 'Ben Koller',
    band: 'Converge / Mutoid Man / Killer Be Killed',
    currentEndorsements: {
      drums: { brand: 'Tama', model: 'Starclassic Maple', since: '2001' },
      cymbals: { brand: 'Sabian', model: 'HHX & AAX Series', since: '2001' },
      sticks: { brand: 'Vic Firth', model: 'American Classic 5B', since: '2001' },
      heads: { brand: 'Remo', since: '2001' },
      hardware: { brand: 'Tama', model: 'Iron Cobra 900 Double Pedal', since: '2001' },
    },
    timeline: [
      {
        year: 2001,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: null,
        to: 'Tama',
        notes: 'Converge\'s Jane Doe (2001) debuted the Tama kit and 14x6.5" brass snare formula that has anchored Koller\'s sound for two decades',
      },
      {
        year: 2001,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.CYMBALS,
        from: null,
        to: 'Sabian',
        notes: 'Jane Doe also introduced the Sabian HHX/AAX combination (14" HHX Groove Hats, HHX Raw Bell Dry Ride, AAX crashes) Koller has used on every Converge album since',
      },
      {
        year: 2006,
        changeType: ENDORSEMENT_CHANGE_TYPES.RENEWED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        brand: 'Tama',
        notes: 'No Heroes (2006) continued the same brass-shell Tama snare formula used since Jane Doe, now deployed with three albums\' worth of studio confidence',
      },
    ],
  },
  'matt-greiner': {
    slug: 'matt-greiner',
    name: 'Matt Greiner',
    band: 'August Burns Red',
    currentEndorsements: {
      drums: { brand: 'Greiner & Kilmer', model: 'Custom', since: '2012' },
      cymbals: { brand: 'Meinl', model: 'Byzance Series', since: '2015' },
      sticks: { brand: 'Vic Firth', model: 'American Classic 5A', since: '2005' },
      heads: { brand: 'Evans', since: '2005' },
      hardware: { brand: 'DW', model: '9000 Series Double Pedal', since: '2007' },
    },
    timeline: [
      {
        year: 2005,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.CYMBALS,
        from: null,
        to: 'Sabian',
        notes: 'August Burns Red\'s debut Thrill Seeker (2005) documented Greiner\'s Sabian B8 series cymbals',
      },
      {
        year: 2007,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: null,
        to: 'Mapex',
        notes: 'Messengers (2007) introduced the Mapex Saturn IV hybrid maple/walnut kit that carried ABR\'s commercial breakthrough through Constellations (2009)',
      },
      {
        year: 2011,
        changeType: ENDORSEMENT_CHANGE_TYPES.SWITCHED,
        category: ENDORSEMENT_CATEGORIES.CYMBALS,
        from: 'Zildjian',
        to: 'Paiste',
        notes: 'Leveler (2011) paired a Ludwig Classic Maple kit with a switch to Paiste 2002 cymbals for ABR\'s Grammy-nominated record',
      },
      {
        year: 2012,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNATURE,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        brand: 'Greiner & Kilmer',
        product: 'Greiner & Kilmer Custom',
        notes: 'Greiner co-founded the custom drum company Greiner & Kilmer with fellow drummer Kaleb Kilmer, developing the custom kit he plays today',
      },
    ],
  },
  'mikkey-dee': {
    slug: 'mikkey-dee',
    name: 'Mikkey Dee',
    band: 'Scorpions / Motörhead',
    currentEndorsements: {
      drums: { brand: 'Yamaha', model: 'Recording Custom', since: '1999' },
      cymbals: { brand: 'Zildjian', model: 'A Custom & K Series', since: '1999' },
      sticks: { brand: 'Vic Firth', model: 'Mikkey Dee Signature', since: '1999', signature: true },
      heads: { brand: 'Remo', since: '1999' },
      hardware: { brand: 'Yamaha', model: 'FP9 Double Pedal', since: '1999' },
    },
    timeline: [
      {
        year: 1992,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: null,
        to: 'Tama',
        notes: 'Joining Motörhead in 1992, Dee brought a Tama Artstar II/Swingstar kit documented on his debut Bastards (1993)',
      },
      {
        year: 1992,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.CYMBALS,
        from: null,
        to: 'Paiste',
        notes: 'Paiste Giant Beat hi-hats and 2002 series cymbals powered Dee\'s early Motörhead era on Bastards (1993)',
      },
      {
        year: 1999,
        changeType: ENDORSEMENT_CHANGE_TYPES.SWITCHED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: 'Tama',
        to: 'Yamaha',
        notes: 'Dee transitioned to a Yamaha Recording Custom kit in the late 1990s, audible from We Are Motörhead (2000) through Inferno (2004)',
      },
      {
        year: 1999,
        changeType: ENDORSEMENT_CHANGE_TYPES.SWITCHED,
        category: ENDORSEMENT_CATEGORIES.CYMBALS,
        from: 'Paiste',
        to: 'Zildjian',
        notes: 'The Yamaha switch came paired with a move to Zildjian A Custom and K Series cymbals — the combination Dee still plays with Scorpions today',
      },
    ],
  },
  'gavin-harrison': {
    slug: 'gavin-harrison',
    name: 'Gavin Harrison',
    band: 'Porcupine Tree / King Crimson',
    currentEndorsements: {
      drums: { brand: 'Sonor', model: 'SQ2 Series', since: '2002' },
      cymbals: { brand: 'Zildjian', model: 'K Custom Special Dry', since: '2002' },
      sticks: { brand: 'Vic Firth', model: 'Gavin Harrison Signature', since: '2007', signature: true },
      heads: { brand: 'Remo', model: 'Ambassador', since: '2002' },
      hardware: { brand: 'Sonor', model: 'Perfect Balance Pedal', since: '2007' },
    },
    timeline: [
      {
        year: 2002,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: null,
        to: 'Sonor',
        notes: 'Joining Porcupine Tree for In Absentia (2002), Harrison began an evolving custom Sonor maple kit relationship that grew into the full SQ2 series',
      },
      {
        year: 2002,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.CYMBALS,
        from: null,
        to: 'Zildjian',
        notes: 'In Absentia debuted the Zildjian K Custom Special Dry cymbals — co-developed with Zildjian — that Harrison has used for his entire Porcupine Tree and King Crimson tenure',
      },
      {
        year: 2007,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNATURE,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        brand: 'Sonor',
        product: 'Gavin Harrison Signature 14" x 5.25" Snare',
        notes: 'Fear of a Blank Planet (2007) marked the fully realized Sonor Gavin Harrison Signature brass snare and Sonor Perfect Balance pedal, the product of years of collaboration with Sonor',
      },
    ],
  },
  'hellhammer': {
    slug: 'hellhammer',
    name: 'Hellhammer',
    band: 'Mayhem',
    currentEndorsements: {
      drums: { brand: 'Pearl', model: 'Reference Series', since: '2004' },
      cymbals: { brand: 'Zildjian', model: 'A Custom', since: '2004' },
      sticks: { brand: 'Vic Firth', model: 'American Classic 5B', since: '1994' },
      heads: { brand: 'Remo', since: '1994' },
      hardware: { brand: 'Pearl', model: 'Demon Drive', since: '1994' },
    },
    timeline: [
      {
        year: 1994,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: null,
        to: 'Pearl',
        notes: 'The Grieghallen sessions for Mayhem\'s genre-defining De Mysteriis Dom Sathanas (1994) used a Pearl kit paired with a Ludwig Acrolite snare and Gibraltar hardware',
      },
      {
        year: 1994,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.CYMBALS,
        from: null,
        to: 'Paiste',
        notes: 'Paiste 2002 Sound Edge hi-hats and a RUDE China shaped the cold, cutting cymbal sound of De Mysteriis Dom Sathanas',
      },
      {
        year: 2004,
        changeType: ENDORSEMENT_CHANGE_TYPES.RENEWED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        brand: 'Pearl',
        notes: 'Chimera (2004) documented the flagship Pearl Reference Series configuration that remained Hellhammer\'s kit through Esoteric Warfare (2014) and Daemon (2019)',
      },
      {
        year: 2004,
        changeType: ENDORSEMENT_CHANGE_TYPES.SWITCHED,
        category: ENDORSEMENT_CATEGORIES.CYMBALS,
        from: 'Paiste',
        to: 'Zildjian',
        notes: 'The Pearl Reference era brought a parallel switch to Zildjian A Custom cymbals, explicitly confirmed as Hellhammer\'s setup as of Daemon (2019)',
      },
    ],
  },
  'flo-mounier': {
    slug: 'flo-mounier',
    name: 'Flo Mounier',
    band: 'Cryptopsy',
    currentEndorsements: {
      drums: { brand: 'Tama', model: 'Starclassic Maple', since: '2012' },
      cymbals: { brand: 'Sabian', model: 'AAX & HHX', since: '2012' },
      sticks: { brand: 'Vic Firth', model: 'American Classic 5A', since: '1996' },
      heads: { brand: 'Evans', since: '1996' },
      hardware: { brand: 'Tama', model: 'Speed Cobra', since: '2012' },
    },
    timeline: [
      {
        year: 1996,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: null,
        to: 'Pearl',
        notes: 'Cryptopsy\'s genre-defining None So Vile (1996) documented Mounier\'s Pearl MX Series kit and Pearl Eliminator double pedal',
      },
      {
        year: 1996,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.CYMBALS,
        from: null,
        to: 'Sabian',
        notes: 'None So Vile also introduced Sabian AA cymbals, Mounier\'s first endorsed cymbal setup',
      },
      {
        year: 2005,
        changeType: ENDORSEMENT_CHANGE_TYPES.SWITCHED,
        category: ENDORSEMENT_CATEGORIES.CYMBALS,
        from: 'Paiste',
        to: 'Zildjian',
        notes: 'Once Was Not (2005) brought a switch to Zildjian ZXT cymbals and a new Yamaha Recording Custom kit, replacing the Paiste Alpha series used since Whisper Supremacy (1998)',
      },
      {
        year: 2012,
        changeType: ENDORSEMENT_CHANGE_TYPES.SWITCHED,
        category: ENDORSEMENT_CATEGORIES.CYMBALS,
        from: 'Zildjian',
        to: 'Sabian',
        notes: 'Mounier\'s modern Tama Starclassic Maple kit and return to Sabian AAX/HHX cymbals define his current setup, documented on Cryptopsy\'s 2012 self-titled album through 2023\'s As Gomorrah Burns',
      },
    ],
  },
};

/**
 * Get recent endorsement news (last N days)
 */
export function getRecentEndorsementNews(days = 30) {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  
  return ENDORSEMENT_NEWS
    .filter(news => new Date(news.date) >= cutoffDate)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

/**
 * Get all endorsement news sorted by date
 */
export function getAllEndorsementNews() {
  return [...ENDORSEMENT_NEWS].sort((a, b) => new Date(b.date) - new Date(a.date));
}

/**
 * Get featured endorsement news
 */
export function getFeaturedEndorsementNews() {
  return ENDORSEMENT_NEWS
    .filter(news => news.featured)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

/**
 * Get endorsement timeline for a specific drummer
 */
export function getEndorsementTimeline(drummerSlug) {
  return ENDORSEMENT_TIMELINE[drummerSlug] || null;
}

/**
 * Check if a drummer has endorsement timeline data
 */
export function hasEndorsementTimeline(drummerSlug) {
  return !!ENDORSEMENT_TIMELINE[drummerSlug];
}

/**
 * Get all drummers with endorsement timelines
 */
export function getDrummersWithEndorsements() {
  return Object.keys(ENDORSEMENT_TIMELINE);
}

/**
 * Generate SEO metadata for endorsement page
 */
export function generateEndorsementMeta(drummer) {
  if (!drummer) return null;
  
  return {
    title: `${drummer.name} Endorsements & Brand History | MetalForge`,
    description: `Complete endorsement history for ${drummer.name} (${drummer.band}). Track brand deals, gear switches, and signature products throughout their career.`,
    keywords: `${drummer.name} endorsements, ${drummer.name} gear, ${drummer.name} sponsors, ${drummer.band} drummer gear`,
  };
}

/**
 * Generate JSON-LD schema for endorsement page
 */
export function generateEndorsementSchema(drummer, timeline) {
  if (!drummer || !timeline) return null;
  
  const currentEndorsements = Object.entries(timeline.currentEndorsements || {})
    .map(([category, data]) => ({
      '@type': 'Brand',
      name: data.brand,
      description: `${category} endorsement for ${drummer.name}`,
    }));
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: drummer.name,
    jobTitle: 'Drummer',
    memberOf: {
      '@type': 'MusicGroup',
      name: drummer.band,
    },
    brand: currentEndorsements,
  };
}
