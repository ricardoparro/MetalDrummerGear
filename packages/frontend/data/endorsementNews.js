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
      drums: { brand: 'Pearl', model: 'Masters Premium Maple', since: '2004' },
      cymbals: { brand: 'Zildjian', model: 'A Custom & K Custom Series', since: '2000s' },
      sticks: { brand: 'Vic Firth', model: 'American Classic 5A', since: '1990s' },
      heads: { brand: 'Remo', model: 'Emperor Coated / Powerstroke 3', since: '1997' },
      hardware: { brand: 'Pearl', model: 'Eliminator Double Bass Pedal', since: '2000s' },
    },
    timeline: [
      {
        year: 1997,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: null,
        to: 'Pearl',
        notes: 'Pre-endorsement Pearl configuration used on Children of Bodom\'s debut "Something Wild"',
      },
      {
        year: 1999,
        changeType: ENDORSEMENT_CHANGE_TYPES.SWITCHED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: 'Pearl',
        to: 'Tama',
        notes: 'Moved to an early Tama Starclassic configuration for "Hatebreeder," carried through "Follow the Reaper" and "Hate Crew Deathroll"',
      },
      {
        year: 2004,
        changeType: ENDORSEMENT_CHANGE_TYPES.SWITCHED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: 'Tama',
        to: 'Pearl',
        notes: 'Settled into the Pearl Masters Premium Maple endorsement around "Are You Dead Yet?," maintained through "Hexed" and the band\'s 2019 dissolution',
      },
      {
        year: 2005,
        changeType: ENDORSEMENT_CHANGE_TYPES.SWITCHED,
        category: ENDORSEMENT_CATEGORIES.CYMBALS,
        from: 'Zildjian A Series',
        to: 'Zildjian A Custom & K Custom',
        notes: 'Cymbal setup evolved from Zildjian A Series toward the A Custom/K Custom combination that became his standard configuration by the mid-2000s',
      },
    ],
  },
  'bill-ward': {
    slug: 'bill-ward',
    name: 'Bill Ward',
    band: 'Black Sabbath',
    currentEndorsements: {
      drums: { brand: 'Ludwig', model: 'Standard / Club Date Series', since: '1968' },
      cymbals: { brand: 'Zildjian', model: 'Avedis Series', since: '1968' },
      sticks: { brand: 'Pro-Mark', model: 'Standard 5A/5B equivalent', since: '1970' },
      heads: { brand: 'Remo', model: 'Ambassador Coated', since: '1970' },
      hardware: { brand: 'Ludwig', model: 'Speed King Pedal', since: '1970' },
    },
    timeline: [
      {
        year: 1968,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: null,
        to: 'Ludwig',
        notes: 'Played a Ludwig kit from Black Sabbath\'s formation in Birmingham through the "Paranoid" and "Master of Reality" sessions',
      },
      {
        year: 1970,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.CYMBALS,
        from: null,
        to: 'Zildjian',
        notes: 'Avedis Zildjian hi-hats, ride, and crash set the cymbal template heard on "Black Sabbath" and "Paranoid"',
      },
      {
        year: 1971,
        changeType: ENDORSEMENT_CHANGE_TYPES.RENEWED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        brand: 'Ludwig',
        notes: 'Upgraded to a 22" Ludwig bass drum (from the 20" used on "Paranoid") to match Tony Iommi\'s down-tuned riffs on "Master of Reality"',
      },
    ],
  },
  'john-otto': {
    slug: 'john-otto',
    name: 'John Otto',
    band: 'Limp Bizkit',
    currentEndorsements: {
      drums: { brand: 'Orange County Drum & Percussion', model: 'OCDP Custom Kit', since: '2003' },
      cymbals: { brand: 'Zildjian', model: 'A & A Custom Series', since: '1994' },
      sticks: { brand: 'Zildjian', model: 'Drumsticks', since: '1994' },
      heads: { brand: 'Remo', model: 'Emperor Coated / Powerstroke 3', since: '1994' },
      hardware: { brand: 'Gibraltar', model: 'Professional Series', since: '1999' },
    },
    timeline: [
      {
        year: 1994,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: null,
        to: 'Pearl',
        notes: 'Played a Pearl kit through Limp Bizkit\'s Jacksonville formation and the "Three Dollar Bill, Y\'all$" debut',
      },
      {
        year: 1999,
        changeType: ENDORSEMENT_CHANGE_TYPES.SWITCHED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: 'Pearl',
        to: 'Orange County Drum & Percussion',
        notes: 'Transitioned to an OCDP setup during the "Significant Other" / "Chocolate Starfish" commercial peak',
      },
      {
        year: 2003,
        changeType: ENDORSEMENT_CHANGE_TYPES.RENEWED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        brand: 'Orange County Drum & Percussion',
        notes: 'OCDP custom kit fully established as his standard configuration through "Results May Vary," "Gold Cobra," and "Still Sucks"',
      },
      {
        year: 1994,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.CYMBALS,
        from: null,
        to: 'Zildjian',
        notes: 'Zildjian cymbal and stick endorsement established alongside Limp Bizkit\'s formation, expanded to A Custom models by the "Significant Other" era',
      },
    ],
  },
  'ben-koller': {
    slug: 'ben-koller',
    name: 'Ben Koller',
    band: 'Converge',
    currentEndorsements: {
      drums: { brand: 'Tama', model: 'Starclassic Performer B/B', since: '2017' },
      cymbals: { brand: 'Zildjian', model: 'K Custom & A Custom Series', since: '2004' },
      sticks: { brand: 'Vic Firth', model: 'American Classic 5B', since: '1999' },
      heads: { brand: 'Evans', model: 'G1/G2 Coated', since: '1999' },
      hardware: { brand: 'Tama', model: 'Iron Cobra Double Pedal', since: '2004' },
    },
    timeline: [
      {
        year: 1999,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: null,
        to: 'Tama',
        notes: 'Joined Converge in 1999 playing standard touring-grade Tama kits through "Jane Doe" (2001)',
      },
      {
        year: 2004,
        changeType: ENDORSEMENT_CHANGE_TYPES.SWITCHED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: 'Tama (standard)',
        to: 'Tama Starclassic',
        notes: 'Upgraded to Tama Starclassic shells and solidified the Zildjian K Custom/A Custom cymbal setup through "Axe to Fall" and "All We Love We Leave Behind"',
      },
      {
        year: 2017,
        changeType: ENDORSEMENT_CHANGE_TYPES.RENEWED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        brand: 'Tama',
        notes: 'Settled into the Tama Starclassic Performer B/B birch/bubinga kit still used on "The Dusk in Us" and "Bloodmoon: I"',
      },
    ],
  },
  'matt-greiner': {
    slug: 'matt-greiner',
    name: 'Matt Greiner',
    band: 'August Burns Red',
    currentEndorsements: {
      drums: { brand: 'Pearl', model: 'Reference Pure', since: '2011' },
      cymbals: { brand: 'Meinl', model: 'Byzance Series', since: '2011' },
      sticks: { brand: 'Vic Firth', model: 'Matt Greiner Signature', since: '2017', signature: true },
      heads: { brand: 'Remo', model: 'Controlled Sound Coated', since: '2003' },
      hardware: { brand: 'Pearl', model: 'Demon Drive Double Pedal', since: '2011' },
    },
    timeline: [
      {
        year: 2003,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: null,
        to: 'Pearl',
        notes: 'Co-founded August Burns Red playing Pearl Export/Vision kits, with a developing Meinl cymbal endorsement',
      },
      {
        year: 2011,
        changeType: ENDORSEMENT_CHANGE_TYPES.RENEWED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        brand: 'Pearl',
        notes: 'Upgraded to Pearl Reference kits and solidified the Meinl Byzance cymbal setup around "Leveler" and "Found in Far Away Places"',
      },
      {
        year: 2017,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNATURE,
        category: ENDORSEMENT_CATEGORIES.STICKS,
        brand: 'Vic Firth',
        product: 'Matt Greiner Signature Drumsticks',
        notes: 'Received a Vic Firth signature stick model with a custom taper and bead',
      },
      {
        year: 2017,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNATURE,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        brand: 'Pearl',
        product: 'Matt Greiner Signature Snare',
        notes: 'Pearl released a Matt Greiner signature snare drum, part of the Reference Pure era setup',
      },
    ],
  },
  'mikkey-dee': {
    slug: 'mikkey-dee',
    name: 'Mikkey Dee',
    band: 'Scorpions / Motörhead',
    currentEndorsements: {
      drums: { brand: 'Yamaha', model: 'Recording Custom / Oak Custom', since: '1990s' },
      cymbals: { brand: 'Zildjian', model: 'A Custom & K Custom Series', since: '1990s' },
      sticks: { brand: 'Vic Firth', model: '2B / American Classic 5B', since: '1985' },
      heads: { brand: 'Remo', model: 'Emperor Coated / Powerstroke 3', since: '1992' },
      hardware: { brand: 'Yamaha', model: 'FP9 Flying Dragon Pedal', since: '1990s' },
    },
    timeline: [
      {
        year: 1992,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: null,
        to: 'Tama',
        notes: 'Joined Motörhead playing a Tama Artstar II/Swingstar kit with Paiste cymbals, first heard on "March ör Die" and "Bastards"',
      },
      {
        year: 1999,
        changeType: ENDORSEMENT_CHANGE_TYPES.SWITCHED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: 'Tama',
        to: 'Yamaha',
        notes: 'Gradually transitioned to Yamaha Recording Custom drums, audible from "We Are Motörhead" (2000) and "Inferno" (2004) onward',
      },
      {
        year: 1999,
        changeType: ENDORSEMENT_CHANGE_TYPES.SWITCHED,
        category: ENDORSEMENT_CATEGORIES.CYMBALS,
        from: 'Paiste',
        to: 'Zildjian',
        notes: 'Cymbal setup moved from Paiste to Zildjian alongside the Yamaha drum transition',
      },
      {
        year: 2016,
        changeType: ENDORSEMENT_CHANGE_TYPES.RENEWED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        brand: 'Yamaha',
        notes: 'Carried the Yamaha/Zildjian setup into Scorpions after joining the band in 2016 following Lemmy Kilmister\'s death',
      },
    ],
  },
  'gavin-harrison': {
    slug: 'gavin-harrison',
    name: 'Gavin Harrison',
    band: 'Porcupine Tree / King Crimson',
    currentEndorsements: {
      drums: { brand: 'Sonor', model: 'SQ2 Series', since: '2002' },
      cymbals: { brand: 'Zildjian', model: 'K Custom Special Dry', since: '2007' },
      sticks: { brand: 'Vic Firth', model: 'Gavin Harrison Signature', since: '2007', signature: true },
      heads: { brand: 'Remo', model: 'Ambassador Coated', since: '2002' },
      hardware: { brand: 'Sonor', model: 'Perfect Balance Pedal', since: '2002' },
    },
    timeline: [
      {
        year: 2002,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: null,
        to: 'Sonor',
        notes: 'Brought a custom Sonor SQ2 shell pack to Porcupine Tree upon joining for "In Absentia," refined through "Deadwing"',
      },
      {
        year: 2007,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNATURE,
        category: ENDORSEMENT_CATEGORIES.CYMBALS,
        brand: 'Zildjian',
        product: 'Zildjian K Custom Special Dry Series',
        notes: 'Co-developed the K Custom Special Dry cymbal line with Zildjian, in full use on "Fear of a Blank Planet"',
      },
      {
        year: 2007,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNATURE,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        brand: 'Sonor',
        product: 'Sonor Gavin Harrison Signature Snares (14"x5.25" brass and 12" Protean)',
        notes: 'Sonor released signature snare drums developed with Harrison for ghost-note sensitivity and rimshot projection',
      },
    ],
  },
  'hellhammer': {
    slug: 'hellhammer',
    name: 'Hellhammer',
    band: 'Mayhem / Dimmu Borgir',
    currentEndorsements: {
      drums: { brand: 'Pearl', model: 'Reference Series', since: '1999' },
      cymbals: { brand: 'Zildjian', model: 'A Custom Series', since: '1988' },
      sticks: { brand: 'Vic Firth', model: 'American Classic 5B', since: '1999' },
      heads: { brand: 'Remo', model: 'Coated Ambassador', since: '1988' },
      hardware: { brand: 'Pearl', model: 'Demon Drive Double Pedal', since: '1999' },
    },
    timeline: [
      {
        year: 1988,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: null,
        to: 'Pearl',
        notes: 'Developing Pearl endorsement during his early Mayhem years, in use on "De Mysteriis Dom Sathanas" (1994)',
      },
      {
        year: 1999,
        changeType: ENDORSEMENT_CHANGE_TYPES.RENEWED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        brand: 'Pearl',
        notes: 'Moved to the Pearl Reference series while drumming simultaneously for Dimmu Borgir and Mayhem',
      },
      {
        year: 1999,
        changeType: ENDORSEMENT_CHANGE_TYPES.RENEWED,
        category: ENDORSEMENT_CATEGORIES.CYMBALS,
        brand: 'Zildjian',
        notes: 'Cymbal setup expanded to a full Zildjian A Custom configuration used consistently across both bands',
      },
    ],
  },
  'flo-mounier': {
    slug: 'flo-mounier',
    name: 'Flo Mounier',
    band: 'Cryptopsy',
    currentEndorsements: {
      drums: { brand: 'Tama', model: 'Starclassic Maple', since: '2012' },
      cymbals: { brand: 'Sabian', model: 'AAX / HHX Series', since: '2012' },
      sticks: { brand: 'Vic Firth', model: '5A American Classic', since: '1992' },
      heads: { brand: 'Evans', model: 'EC Reverse Dot', since: '2012' },
      hardware: { brand: 'Tama', model: 'Speed Cobra 910 Twin Pedal', since: '2012' },
    },
    timeline: [
      {
        year: 1992,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: null,
        to: 'Pearl',
        notes: 'Co-founded Cryptopsy playing Pearl kits (MX Series by the "None So Vile" era) through the mid-1990s',
      },
      {
        year: 2000,
        changeType: ENDORSEMENT_CHANGE_TYPES.RENEWED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        brand: 'Pearl',
        notes: 'Upgraded to the Pearl Masters BRX flagship kit, including a 26" bass drum, for "And Then You\'ll Beg"',
      },
      {
        year: 2005,
        changeType: ENDORSEMENT_CHANGE_TYPES.SWITCHED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: 'Pearl',
        to: 'Yamaha',
        notes: 'Switched to a Yamaha Recording Custom kit paired with Zildjian ZXT cymbals for "Once Was Not"',
      },
      {
        year: 2012,
        changeType: ENDORSEMENT_CHANGE_TYPES.SWITCHED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: 'Yamaha',
        to: 'Tama',
        notes: 'Moved to the Tama Starclassic Maple kit and Sabian cymbal setup that remains his current configuration through "As Gomorrah Burns"',
      },
    ],
  },
  'scott-travis': {
    slug: 'scott-travis',
    name: 'Scott Travis',
    band: 'Judas Priest',
    currentEndorsements: {
      drums: { brand: 'Tama', model: 'Starclassic Maple', since: '2018' },
      cymbals: { brand: 'Paiste', model: 'Signature / 2002 Series', since: '1987' },
      sticks: { brand: 'Vater', since: '2000s' },
      heads: { brand: 'Remo', since: '1990' },
      hardware: { brand: 'Tama', model: 'Iron Cobra / Speed Cobra Pedals', since: '1990' },
    },
    timeline: [
      {
        year: 1987,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.CYMBALS,
        from: null,
        to: 'Paiste',
        notes: 'Established his Paiste endorsement during his Racer X years, before joining Judas Priest',
      },
      {
        year: 1990,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: null,
        to: 'Tama',
        notes: 'Debuted on Tama Artstar II kit for "Painkiller," one of metal\'s most influential drumming performances',
      },
      {
        year: 2005,
        changeType: ENDORSEMENT_CHANGE_TYPES.SWITCHED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: 'Tama',
        to: 'Pearl',
        notes: 'Gradual migration to Pearl\'s Reference Series through the 2000s',
      },
      {
        year: 2018,
        changeType: ENDORSEMENT_CHANGE_TYPES.SWITCHED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: 'Pearl',
        to: 'Tama',
        notes: 'Returned to Tama\'s maple-shelled Starclassic line for "Firepower" and 2024\'s "Invincible Shield"',
      },
    ],
  },
  'nicko-mcbrain': {
    slug: 'nicko-mcbrain',
    name: 'Nicko McBrain',
    band: 'Iron Maiden',
    currentEndorsements: {
      drums: { brand: 'Sonor', model: 'SQ2', since: '2010s' },
      cymbals: { brand: 'Paiste', since: '1980s' },
      sticks: { brand: 'Vic Firth', model: 'Nicko McBrain Signature SNM', since: '2000s' },
      heads: { brand: 'Remo', since: '1984' },
      hardware: { brand: 'DW', model: '5000 Single Pedal', since: '1984' },
    },
    timeline: [
      {
        year: 1984,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: null,
        to: 'Pearl',
        notes: 'Pearl DLX kit used for the "Powerslave" world tour and "Live After Death"',
      },
      {
        year: 1984,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.HARDWARE,
        from: null,
        to: 'DW',
        notes: 'Adopted a DW 5000 single pedal, kept exclusively (no double bass) throughout his career',
      },
      {
        year: 1985,
        changeType: ENDORSEMENT_CHANGE_TYPES.SWITCHED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: 'Pearl',
        to: 'Yamaha',
        notes: 'Moved to a Yamaha Recording Custom kit, used through 2010',
      },
      {
        year: 2010,
        changeType: ENDORSEMENT_CHANGE_TYPES.SWITCHED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: 'Yamaha',
        to: 'Sonor',
        notes: 'Switched to the Sonor SQ2 signature kit that remains his current setup',
      },
    ],
  },
  'vinnie-paul': {
    slug: 'vinnie-paul',
    name: 'Vinnie Paul',
    band: 'Pantera / Damageplan / Hellyeah',
    currentEndorsements: {
      drums: { brand: 'ddrum', model: 'Vinnie Paul Signature Series', since: '2008' },
      cymbals: { brand: 'Sabian', model: 'AA / AAX Series', since: '1990s' },
      sticks: { brand: 'Vic Firth', model: 'American Classic 5B', since: '1990s' },
      heads: { brand: 'Evans', since: '2008' },
      hardware: { brand: 'ddrum', since: '2008' },
    },
    timeline: [
      {
        year: 1990,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: null,
        to: 'Tama',
        notes: 'Played Tama drums during Pantera\'s major-label breakthrough on "Cowboys from Hell"',
      },
      {
        year: 1996,
        changeType: ENDORSEMENT_CHANGE_TYPES.SWITCHED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: 'Tama',
        to: 'Pearl',
        notes: 'Moved to Pearl drums, spanning "The Great Southern Trendkill" and "Reinventing the Steel"',
      },
      {
        year: 2008,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: 'Pearl',
        to: 'ddrum',
        notes: 'Signed with ddrum, who developed his Vinnie Paul Signature Series kit and snare for Hellyeah',
      },
    ],
  },
  'paul-bostaph': {
    slug: 'paul-bostaph',
    name: 'Paul Bostaph',
    band: 'Slayer / Testament / Exodus',
    currentEndorsements: {
      drums: { brand: 'Pearl', model: 'Masters Maple Complete (MCX)', since: '2015' },
      cymbals: { brand: 'Sabian', model: 'AAX Series', since: '2015' },
      sticks: { brand: 'Vater', model: 'Power 5B', since: '2015' },
      heads: { brand: 'Remo', model: 'Emperor / Ambassador', since: '2015' },
      hardware: { brand: 'Pearl', model: 'Eliminator Double Pedal', since: '2015' },
    },
    timeline: [
      {
        year: 1994,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: null,
        to: 'Tama',
        notes: 'Debut Slayer studio album "Divine Intervention" recorded on a Tama Artstar II kit with Paiste RUDE cymbals',
      },
      {
        year: 1998,
        changeType: ENDORSEMENT_CHANGE_TYPES.SWITCHED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: 'Tama',
        to: 'DW',
        notes: 'Moved to a DW Collector\'s Series Maple kit and Zildjian A Custom cymbals for "Diabolus in Musica"',
      },
      {
        year: 2001,
        changeType: ENDORSEMENT_CHANGE_TYPES.SWITCHED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: 'DW',
        to: 'Tama',
        notes: 'Returned to Tama with a Starclassic Maple kit and Paiste 2002 cymbals for "God Hates Us All"',
      },
      {
        year: 2015,
        changeType: ENDORSEMENT_CHANGE_TYPES.SWITCHED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: 'Tama',
        to: 'Pearl',
        notes: 'Producer Terry Date moved him to a Pearl Masters Maple Complete kit and Sabian AAX cymbals for "Repentless"',
      },
    ],
  },
  'gene-hoglan': {
    slug: 'gene-hoglan',
    name: 'Gene Hoglan',
    band: 'Death / Testament / Dethklok',
    currentEndorsements: {
      drums: { brand: 'Tama', model: 'Starclassic Walnut/Birch', since: '2018' },
      cymbals: { brand: 'Zildjian', model: 'A Custom Series', since: '1991' },
      sticks: { brand: 'Vater', model: '5B Wood Tip', since: '2018' },
      heads: { brand: 'Evans', since: '1980s' },
      hardware: { brand: 'Tama', model: 'Speed Cobra 910 Double Pedal', since: '2008' },
    },
    timeline: [
      {
        year: 1983,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: null,
        to: 'Tama',
        notes: 'Debuted on a Tama Superstar kit during his Dark Angel years, developing the metronomic precision that earned him the "Atomic Clock" nickname',
      },
      {
        year: 1983,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.CYMBALS,
        from: null,
        to: 'Zildjian',
        notes: 'Paired his Tama kit with Zildjian A Series cymbals from his earliest thrash recordings with Dark Angel',
      },
      {
        year: 1991,
        changeType: ENDORSEMENT_CHANGE_TYPES.RENEWED,
        category: ENDORSEMENT_CATEGORIES.CYMBALS,
        brand: 'Zildjian',
        notes: 'Upgraded to Zildjian\'s A Custom Series for the technical precision demanded by Death\'s "Individual Thought Patterns" and "Symbolic"',
      },
      {
        year: 2008,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNATURE,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        brand: 'Tama',
        product: 'Gene Hoglan Signature Snare 14x8"',
        notes: 'First signature snare drum, an exceptionally deep 14x8" model built for thunderous power during his Testament and Dethklok era',
      },
      {
        year: 2018,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.STICKS,
        from: null,
        to: 'Vater',
        notes: 'Settled on Vater 5B Wood Tip sticks for his current Tama Starclassic Walnut/Birch setup, favoring their balance across marathon touring and clinic schedules',
      },
    ],
  },
  'shannon-larkin': {
    slug: 'shannon-larkin',
    name: 'Shannon Larkin',
    band: 'Godsmack',
    currentEndorsements: {
      drums: { brand: 'Pearl', model: 'Reference Pure', since: '2002' },
      cymbals: { brand: 'Sabian', model: 'AAX Series', since: '2002' },
      sticks: { brand: 'Promark', model: 'Shannon Larkin Signature', since: '2012', signature: true },
      heads: { brand: 'Evans', since: '2002' },
      hardware: { brand: 'Pearl', model: 'Demon Drive Double Pedal', since: '2002' },
    },
    timeline: [
      {
        year: 2002,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: null,
        to: 'Pearl',
        notes: 'Joined Godsmack in 2002, replacing Tommy Stewart, and brought his Pearl Reference kit into the band\'s platinum-selling run',
      },
      {
        year: 2002,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.CYMBALS,
        from: null,
        to: 'Sabian',
        notes: 'Adopted Sabian AAX Series cymbals for the powerful, cutting attack behind Godsmack\'s "Faceless" (2003) breakthrough',
      },
      {
        year: 2002,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.STICKS,
        from: null,
        to: 'Promark',
        notes: 'Began playing Promark sticks alongside his new Pearl/Sabian setup at the start of the Godsmack era',
      },
      {
        year: 2012,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNATURE,
        category: ENDORSEMENT_CATEGORIES.STICKS,
        brand: 'Promark',
        product: 'Shannon Larkin Signature',
        notes: 'Promark released a Shannon Larkin signature stick model, reflecting his long-running tenure as Godsmack\'s drummer',
      },
    ],
  },
  'igor-cavalera': {
    slug: 'igor-cavalera',
    name: 'Igor Cavalera',
    band: 'Sepultura / Cavalera Conspiracy',
    currentEndorsements: {
      drums: { brand: 'ddrum', model: 'Hybrid Kit', since: '2006' },
      cymbals: { brand: 'Zildjian', model: 'A Custom Series', since: '2006' },
      sticks: { brand: 'Vic Firth', model: 'American Classic 5B', since: '1993' },
      heads: { brand: 'Remo', since: '2006' },
      hardware: { brand: 'DW', model: '5000 Series Double Pedal', since: '2006' },
    },
    timeline: [
      {
        year: 1993,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: null,
        to: 'Tama',
        notes: 'Played a Tama Starclassic Maple kit through Sepultura\'s genre-defining "Chaos A.D." (1993), fusing tribal Brazilian percussion with thrash metal',
      },
      {
        year: 1993,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.CYMBALS,
        from: null,
        to: 'Paiste',
        notes: 'Cut through Sepultura\'s groove-metal aggression with Paiste RUDE & 2002 Series cymbals, a setup kept through "Roots" (1996)',
      },
      {
        year: 2006,
        changeType: ENDORSEMENT_CHANGE_TYPES.SWITCHED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: 'Tama',
        to: 'ddrum',
        notes: 'Left Sepultura in 2006 and reunited with brother Max in Cavalera Conspiracy, moving to a ddrum Hybrid Kit',
      },
      {
        year: 2006,
        changeType: ENDORSEMENT_CHANGE_TYPES.SWITCHED,
        category: ENDORSEMENT_CATEGORIES.CYMBALS,
        from: 'Paiste',
        to: 'Zildjian',
        notes: 'Switched to Zildjian A Custom Series cymbals for the Cavalera Conspiracy era, starting with "Inflikted"',
      },
    ],
  },
  'dirk-verbeuren': {
    slug: 'dirk-verbeuren',
    name: 'Dirk Verbeuren',
    band: 'Megadeth',
    currentEndorsements: {
      drums: { brand: 'Tama', model: 'Starclassic Maple', since: '2016', signature: 'Signature Series Snare' },
      cymbals: { brand: 'Meinl', model: 'Byzance Brilliant Heavy Hammered / Classics Custom Dark', since: '2022' },
      sticks: { brand: 'Vater', model: '5B / Power 5B', since: '2002', signature: false },
      heads: { brand: 'Evans', model: 'G2 / EMAD2', since: '2016' },
      hardware: { brand: 'Tama', model: 'Speed Cobra 910 Double Pedal', since: '2016' },
    },
    timeline: [
      {
        year: 2002,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: null,
        to: 'Tama',
        notes: 'Documented on a Tama Starclassic Performer kit during his early Soilwork tenure, first captured on "Natural Born Chaos" (2002)',
      },
      {
        year: 2002,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.CYMBALS,
        from: null,
        to: 'Meinl',
        notes: 'Adopted Meinl Byzance Dark cymbals for Soilwork\'s melodic death metal sound, a dark-voiced setup he carried for two decades into his Megadeth years',
      },
      {
        year: 2016,
        changeType: ENDORSEMENT_CHANGE_TYPES.SWITCHED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: 'Tama Starclassic Performer',
        to: 'Tama Starclassic Maple',
        notes: 'Joining Megadeth\'s touring lineup after Chris Adler recorded "Dystopia," upgraded to an all-maple Tama Starclassic Maple kit for a deeper, punchier low end',
      },
      {
        year: 2016,
        changeType: ENDORSEMENT_CHANGE_TYPES.SWITCHED,
        category: ENDORSEMENT_CATEGORIES.HEADS,
        from: 'Remo Ambassador',
        to: 'Evans G2 / EMAD2',
        notes: 'Moved to Evans heads for the Megadeth era, pairing EMAD2 kick heads with Tama\'s Speed Cobra pedals for consistent attack',
      },
      {
        year: 2022,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNATURE,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        brand: 'Tama',
        product: 'Signature Series Dirk Verbeuren Snare 14x5.5"',
        notes: 'Debuted his first signature snare on "The Sick, the Dying... and the Dead!" — a shallower steel model built to his specs after six years with the band',
      },
      {
        year: 2022,
        changeType: ENDORSEMENT_CHANGE_TYPES.SWITCHED,
        category: ENDORSEMENT_CATEGORIES.CYMBALS,
        from: 'Meinl Byzance Dark',
        to: 'Meinl Byzance Brilliant Heavy Hammered / Classics Custom Dark',
        notes: 'Expanded to a dual-line Meinl setup pairing brighter Byzance Brilliant Heavy Hammered with darker Classics Custom Dark for wider tonal range on his Megadeth studio debut',
      },
    ],
  },
  'frost': {
    slug: 'frost',
    name: 'Frost',
    band: 'Satyricon',
    currentEndorsements: {
      drums: { brand: 'Pearl', model: 'Custom / Reference Series', since: '1996' },
      cymbals: { brand: 'Zildjian', model: 'A Series', since: '2013' },
      sticks: { brand: 'Vic Firth', model: '5B', since: '1996', signature: false },
      heads: { brand: 'Remo', model: 'Ambassador / Controlled Sound Coated', since: '1996' },
      hardware: { brand: 'Pearl', model: 'Eliminator / DW 9000 Double Pedals + Roland RT Triggers', since: '2013' },
    },
    timeline: [
      {
        year: 1996,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: null,
        to: 'Pearl',
        notes: 'Recorded Satyricon\'s "Nemesis Divina" on a Pearl Export kit, the entry-level setup behind Norwegian black metal\'s defining blast-beat record',
      },
      {
        year: 1996,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.CYMBALS,
        from: null,
        to: 'Paiste',
        notes: 'Paired his Pearl kit with Paiste 2002 series cymbals, the icy, aggressive voice of the early-1990s Norwegian black metal scene',
      },
      {
        year: 1996,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.STICKS,
        from: null,
        to: 'Vic Firth',
        notes: 'Settled on Vic Firth 5B sticks for the single-pedal blast-beat work that built his reputation on "Nemesis Divina"',
      },
      {
        year: 2013,
        changeType: ENDORSEMENT_CHANGE_TYPES.SWITCHED,
        category: ENDORSEMENT_CATEGORIES.CYMBALS,
        from: 'Paiste 2002',
        to: 'Zildjian A Series',
        notes: 'Moved to a Zildjian A series setup (A New Beat hi-hats, A Medium crashes/ride, China) as Satyricon\'s self-titled album pushed toward more dynamically refined production',
      },
      {
        year: 2013,
        changeType: ENDORSEMENT_CHANGE_TYPES.SWITCHED,
        category: ENDORSEMENT_CATEGORIES.HARDWARE,
        from: 'entry-level basic hardware',
        to: 'Pearl/DW double pedals with Roland RT triggers',
        notes: 'Upgraded from the "Nemesis Divina"-era basic single pedal to Pearl/DW double bass pedals and Roland kick triggers for Satyricon\'s more produced modern era',
      },
    ],
  },
  'abe-cunningham': {
    slug: 'abe-cunningham',
    name: 'Abe Cunningham',
    band: 'Deftones',
    currentEndorsements: {
      drums: { brand: 'Tama', model: 'Starclassic Maple/Bubinga', since: '1997' },
      cymbals: { brand: 'Zildjian', model: 'A Custom / K Custom hybrid', since: '2022' },
      sticks: { brand: 'Zildjian', model: 'Abe Cunningham Artist Series', since: '2022', signature: true },
      heads: { brand: 'Evans', model: 'EMAD / G2', since: '1997' },
      hardware: { brand: 'Tama', model: 'Iron Cobra 900 Rolling Glide', since: '1997' },
    },
    timeline: [
      {
        year: 1997,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: null,
        to: 'Tama',
        notes: 'Played a Tama Starclassic kit on Deftones\' breakthrough debut "Around the Fur," the start of a Tama relationship that has lasted his entire career',
      },
      {
        year: 1997,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.CYMBALS,
        from: null,
        to: 'Zildjian',
        notes: 'Built his cymbal voice on Zildjian A/K Custom cymbals starting with "Around the Fur" (1997), through "White Pony" (2000) and the self-titled "Deftones" (2003)',
      },
      {
        year: 2010,
        changeType: ENDORSEMENT_CHANGE_TYPES.SWITCHED,
        category: ENDORSEMENT_CATEGORIES.CYMBALS,
        from: 'Zildjian',
        to: 'Sabian HHX',
        notes: 'Moved to a Sabian HHX setup for "Diamond Eyes" (2010), carrying the darker HHX voice through "Koi No Yokan" (2012), "Gore" (2016), and "Ohms" (2020)',
      },
      {
        year: 2022,
        changeType: ENDORSEMENT_CHANGE_TYPES.SWITCHED,
        category: ENDORSEMENT_CATEGORIES.CYMBALS,
        from: 'Sabian HHX',
        to: 'Zildjian A Custom/K Custom',
        notes: 'Returned to a Zildjian hybrid setup in the years following the "Ohms" touring cycle, pairing brighter A Custom crashes with a darker K Custom ride and hi-hats',
      },
      {
        year: 2022,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNATURE,
        category: ENDORSEMENT_CATEGORIES.STICKS,
        brand: 'Zildjian',
        product: 'Abe Cunningham Artist Series',
        notes: 'Debuted his signature Artist Series stick alongside the return to Zildjian cymbals, balanced for groove playing with extra heft for power accents',
      },
    ],
  },
  'travis-orbin': {
    slug: 'travis-orbin',
    name: 'Travis Orbin',
    band: 'Periphery (ex) / Sky Harbor / Darkest Hour',
    currentEndorsements: {
      drums: { brand: 'DW', model: "Collector's Series", since: '2009' },
      cymbals: { brand: 'Zildjian', model: 'K Custom Dark / A Custom hybrid', since: '2010' },
      sticks: { brand: 'Vic Firth', model: 'American Classic 5B', since: '2010', signature: false },
      heads: { brand: 'Evans', model: 'EMAD / G2 Coated', since: '2010' },
      hardware: { brand: 'DW', model: '9000 Series Double Pedal + Roland SPD-SX', since: '2010' },
    },
    timeline: [
      {
        year: 2009,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: null,
        to: 'DW',
        notes: 'Built his Collector\'s Series double-bass kit while assembling Periphery\'s self-titled debut, the record that gave djent its technical vocabulary',
      },
      {
        year: 2010,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.CYMBALS,
        from: null,
        to: 'Zildjian',
        notes: 'Paired his DW kit with Zildjian K Custom Dark and A Custom cymbals on Periphery\'s 2010 debut, a dark-under/bright-over setup built to cut through djent\'s mid-scooped guitar tone',
      },
      {
        year: 2010,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.STICKS,
        from: null,
        to: 'Vic Firth',
        notes: 'Settled on Vic Firth American Classic 5B sticks for the balance of accent power and ghost-note control his linear patterns require',
      },
      {
        year: 2011,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.ELECTRONICS,
        from: null,
        to: 'Roland',
        notes: 'Integrated a Roland SPD-SX sampling pad and bass drum trigger system on the "Icarus" EP, building the hybrid acoustic/electronic rig that defined his sound',
      },
      {
        year: 2016,
        changeType: ENDORSEMENT_CHANGE_TYPES.RENEWED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        brand: 'DW',
        notes: 'Remained a DW/Zildjian endorsee after departing Periphery in 2012, carrying the same Collector\'s Series and Roland trigger rig through his Sky Harbor and Darkest Hour session work and viral educational content',
      },
    ],
  },
  // Issue #4169: derek-roddy, hannes-grossmann, isaac-lamb, jason-bittner, jocke-wallgren
  'derek-roddy': {
    slug: 'derek-roddy',
    name: 'Derek Roddy',
    band: 'Nile (ex-Hate Eternal)',
    currentEndorsements: {
      drums: { brand: 'DW', model: "Collector's Series Maple", since: '2001' },
      cymbals: { brand: 'Sabian', model: 'HHX / AAX Series', since: '1994' },
      sticks: { brand: 'Vater', model: '5B', since: '2001', signature: false },
      heads: { brand: 'Evans', since: '2001' },
      hardware: { brand: 'Axis', model: 'A Longboard Double Pedal', since: '2000' },
    },
    timeline: [
      {
        year: 1994,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.CYMBALS,
        from: null,
        to: 'Sabian',
        notes: 'Began his career with Sabian cymbals in the underground death metal scene during his formative years with Aurora Borealis',
      },
      {
        year: 2000,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.HARDWARE,
        from: null,
        to: 'Axis',
        notes: 'Adopted Axis A Longboard double pedals during his stint as Nile\'s live drummer, the direct-drive longboard action his heel-toe technique relies on at extreme tempos',
      },
      {
        year: 2001,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: null,
        to: 'DW',
        notes: 'Signed with DW Collector\'s Series drums at the start of his Hate Eternal tenure, the kit heard on King of All Kings (2002) and I, Monarch (2005)',
      },
      {
        year: 2001,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.STICKS,
        from: null,
        to: 'Vater',
        notes: 'Settled on Vater 5B sticks for the balance of control and endurance his freehand/gravity blast beat technique requires',
      },
    ],
  },
  'hannes-grossmann': {
    slug: 'hannes-grossmann',
    name: 'Hannes Grossmann',
    band: 'Alkaloid (ex-Obscura, ex-Necrophagist)',
    currentEndorsements: {
      drums: { brand: 'DW', model: 'Collectors Series', since: '2014' },
      cymbals: { brand: 'Meinl', model: 'Byzance Series', since: '2001' },
      sticks: { brand: 'Vic Firth', model: 'American Classic 5B', since: '2014', signature: false },
      heads: { brand: 'Evans', since: '2001' },
      hardware: { brand: 'DW', model: '9000 Series Double Pedal', since: '2014' },
    },
    timeline: [
      {
        year: 2001,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.CYMBALS,
        from: null,
        to: 'Meinl',
        notes: 'Began his Meinl Byzance relationship recording Necrophagist\'s genre-defining Epitaph (2004), a partnership that has continued unbroken through Obscura and Alkaloid',
      },
      {
        year: 2001,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: null,
        to: 'Tama',
        notes: 'Played a Tama Starclassic Maple kit with Tama Iron Cobra pedals throughout his Necrophagist and Obscura eras (2001-2014), including Cosmogenesis (2009) and Omnivium (2011)',
      },
      {
        year: 2014,
        changeType: ENDORSEMENT_CHANGE_TYPES.SWITCHED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: 'Tama',
        to: 'DW',
        notes: 'Transitioned to a DW Collectors Series kit when co-founding Alkaloid, moving on from the Tama Starclassic Maple setup used across Necrophagist and Obscura\'s Cosmogenesis/Omnivium era',
      },
      {
        year: 2014,
        changeType: ENDORSEMENT_CHANGE_TYPES.SWITCHED,
        category: ENDORSEMENT_CATEGORIES.HARDWARE,
        from: 'Tama Iron Cobra',
        to: 'DW 9000 Series Double Pedal',
        notes: 'Paired the DW kit switch with a DW 9000 double pedal for the adjustable cam action Alkaloid\'s avant-garde two-footed patterns demand',
      },
    ],
  },
  'isaac-lamb': {
    slug: 'isaac-lamb',
    name: 'Isaac Lamb',
    band: 'Kublai Khan TX',
    currentEndorsements: {
      drums: { brand: 'SJC Custom Drums', model: 'Custom Series', since: '2009' },
      cymbals: { brand: 'Meinl', model: 'Classics Custom Dark Series', since: '2009' },
      sticks: { brand: 'Vic Firth', model: 'American Classic 2B', since: '2009', signature: false },
      heads: { brand: 'Evans', model: 'Hydraulic', since: '2009' },
      hardware: { brand: 'DW', model: '9000 Series Double Pedal', since: '2009' },
    },
    timeline: [
      {
        year: 2009,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: null,
        to: 'SJC Custom Drums',
        notes: 'Founding drummer of Kublai Khan TX began his boutique SJC Custom Drums endorsement relationship at the band\'s 2009 formation in Sherman, Texas',
      },
      {
        year: 2009,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.CYMBALS,
        from: null,
        to: 'Meinl',
        notes: 'Built his cymbal voice on the Meinl Classics Custom Dark series from the band\'s earliest recordings, prized for staying out of the way of high-gain guitar frequencies',
      },
      {
        year: 2009,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.HARDWARE,
        from: null,
        to: 'DW',
        notes: 'Adopted the DW 9000 Series double pedal for the chain-drive consistency his groove, blast, and breakdown passages all require',
      },
      {
        year: 2019,
        changeType: ENDORSEMENT_CHANGE_TYPES.RENEWED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        brand: 'SJC Custom Drums',
        notes: 'Renewed and expanded his SJC endorsement as Kublai Khan TX\'s Absolute (2019) marked the band\'s creative peak, with a complete Meinl Classics Custom Dark setup and Vic Firth 2B sticks locked in',
      },
    ],
  },
  'jason-bittner': {
    slug: 'jason-bittner',
    name: 'Jason Bittner',
    band: 'Shadows Fall / Overkill',
    currentEndorsements: {
      drums: { brand: 'Tama', model: 'Starclassic Performer B/B', since: '1997' },
      cymbals: { brand: 'Sabian', model: 'HHX / HH Series', since: '1997' },
      sticks: { brand: 'Vic Firth', model: '5B', since: '2002', signature: false },
      heads: { brand: 'Remo', since: '2002' },
      hardware: { brand: 'DW', model: '9002 Double Bass Pedal', since: '2002' },
    },
    timeline: [
      {
        year: 1997,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: null,
        to: 'Tama',
        notes: 'Joined Shadows Fall in 1997 and began developing his Tama endorsement, an early Starclassic configuration that formalized into the birch/bubinga Performer B/B by 2002',
      },
      {
        year: 1997,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.CYMBALS,
        from: null,
        to: 'Sabian',
        notes: 'Began his Sabian relationship in Shadows Fall\'s formative NWOAHM years, later formalizing into the full HHX/HH configuration',
      },
      {
        year: 2002,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.HARDWARE,
        from: null,
        to: 'DW',
        notes: 'Locked in the DW 9002 double bass pedal ahead of The Art of Balance (2002), the record now considered NWOAHM\'s technical benchmark',
      },
      {
        year: 2012,
        changeType: ENDORSEMENT_CHANGE_TYPES.RENEWED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        brand: 'Tama',
        notes: 'Carried his Tama Starclassic Performer B/B, Sabian HHX/HH, and DW 9002 setup unchanged into his 2012 appointment as Overkill\'s full-time drummer, proving the rig\'s versatility across NWOAHM and straight thrash',
      },
    ],
  },
  'jocke-wallgren': {
    slug: 'jocke-wallgren',
    name: 'Jocke Wallgren',
    band: 'Amon Amarth',
    currentEndorsements: {
      drums: { brand: 'Tama', model: 'Starclassic Performer B/B', since: '2013' },
      cymbals: { brand: 'Meinl', model: 'Byzance Series', since: '2005' },
      sticks: { brand: 'Vic Firth', model: '5B', since: '2013', signature: false },
      heads: { brand: 'Remo', since: '2013' },
      hardware: { brand: 'DW', model: '9002 Double Bass Pedal', since: '2013' },
    },
    timeline: [
      {
        year: 2005,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.CYMBALS,
        from: null,
        to: 'Meinl',
        notes: 'Began his Meinl relationship during his Rage and Evergrey years in European power/prog metal, early Byzance usage that carried into his Amon Amarth setup',
      },
      {
        year: 2013,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: null,
        to: 'Tama',
        notes: 'Joined Amon Amarth in 2013 and fully configured his Tama Starclassic Performer B/B kit for Deceiver of the Gods, the album that launched the post-Fredrik Andersson era',
      },
      {
        year: 2013,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.HARDWARE,
        from: null,
        to: 'DW',
        notes: 'Adopted the DW 9002 double bass pedal for the smooth cam action Amon Amarth\'s galloping double-kick patterns require across full headline sets',
      },
      {
        year: 2022,
        changeType: ENDORSEMENT_CHANGE_TYPES.RENEWED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        brand: 'Tama',
        notes: 'Carried his fully evolved Tama/Meinl/DW touring rig into The Great Heathen Army (2022) era, Amon Amarth\'s most commercially successful album cycle',
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
