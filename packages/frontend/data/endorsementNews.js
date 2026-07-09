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
  // Issue #4168: aquiles-priester, arin-ilejay, blake-richardson, chris-turner, daniel-erlandsson
  'aquiles-priester': {
    slug: 'aquiles-priester',
    name: 'Aquiles Priester',
    band: 'Angra / W.A.S.P.',
    currentEndorsements: {
      drums: { brand: 'Trick Drums', model: 'Custom Configuration', since: '2023' },
      cymbals: { brand: 'Ufip', model: 'Series (14" hi-hats through 21" ride)', since: '2023' },
      sticks: { brand: 'Vater', model: 'Fusion 55A', since: '2023', signature: false },
      heads: { brand: 'Remo', model: 'Coated Ambassador / Powerstroke 3', since: '1996' },
      hardware: { brand: 'DW', model: '9000 Series Double Pedal', since: '2023' },
    },
    timeline: [
      {
        year: 1996,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: null,
        to: 'Mapex',
        notes: 'Built his early Mapex Saturn Series kit during his formative Hangar years, before joining Angra in 2000',
      },
      {
        year: 1996,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.CYMBALS,
        from: null,
        to: 'Sabian',
        notes: 'Paired his Mapex kit with Sabian HH/HHX cymbals and an Axis A double pedal prized for its light, fast action',
      },
      {
        year: 2004,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNATURE,
        category: ENDORSEMENT_CATEGORIES.STICKS,
        brand: 'Vic Firth',
        product: 'Aquiles Priester Signature',
        notes: 'Developed a Vic Firth signature stick during the Angra classic era (Rebirth, Temple of Shadows), balancing power and ghost-note control at high tempos',
      },
      {
        year: 2012,
        changeType: ENDORSEMENT_CHANGE_TYPES.SWITCHED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: 'Mapex Saturn Series',
        to: 'Pearl Reference Series',
        notes: 'Moved to a Pearl Reference Series kit and Meinl Byzance cymbals during his post-Angra W.A.S.P./Hangar-focused years',
      },
      {
        year: 2023,
        changeType: ENDORSEMENT_CHANGE_TYPES.SWITCHED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: 'Pearl Reference Series',
        to: 'Trick Drums',
        notes: 'Built a new Trick Drums custom maple configuration upon returning to Angra for their 2023 album cycle',
      },
      {
        year: 2023,
        changeType: ENDORSEMENT_CHANGE_TYPES.SWITCHED,
        category: ENDORSEMENT_CATEGORIES.CYMBALS,
        from: 'Meinl Byzance',
        to: 'Ufip',
        notes: 'Adopted the Italian Ufip cymbal line and DW 9000 hardware for the Angra reunion touring and recording setup',
      },
    ],
  },
  'arin-ilejay': {
    slug: 'arin-ilejay',
    name: 'Arin Ilejay',
    band: 'Avenged Sevenfold (ex) / Confide',
    currentEndorsements: {
      drums: { brand: 'DW', model: "Collector's Series", since: '2011' },
      cymbals: { brand: 'Zildjian', model: 'A Custom Series', since: '2011' },
      sticks: { brand: 'Vic Firth', model: '5B', since: '2011', signature: false },
      heads: { brand: 'Remo', model: 'Ambassador Coated / Powerstroke 3', since: '2011' },
      hardware: { brand: 'DW', model: '9000 Series Double Pedal', since: '2011' },
    },
    timeline: [
      {
        year: 2011,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: null,
        to: 'DW',
        notes: "Adopted a DW Collector's Series kit upon joining Avenged Sevenfold as permanent drummer, replacing the late Jimmy \"The Rev\" Sullivan",
      },
      {
        year: 2011,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.CYMBALS,
        from: null,
        to: 'Zildjian',
        notes: "Set up a Zildjian A Custom cymbal arsenal calibrated for A7X's arena-scale touring",
      },
      {
        year: 2011,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.HARDWARE,
        from: null,
        to: 'DW',
        notes: 'Adopted DW 9000 Series double bass pedals for consistent double-kick action across the A7X world tour',
      },
      {
        year: 2013,
        changeType: ENDORSEMENT_CHANGE_TYPES.RENEWED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        brand: 'DW',
        notes: "Recorded Hail to the King (2013) on his DW Collector's Series kit, the only full studio album he tracked as A7X's drummer",
      },
      {
        year: 2015,
        changeType: ENDORSEMENT_CHANGE_TYPES.ENDED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        brand: 'DW',
        notes: 'Departed Avenged Sevenfold in late 2014 (split announced 2015), ending his DW-backed A7X run; Brooks Wackerman took over the drum chair',
      },
    ],
  },
  'blake-richardson': {
    slug: 'blake-richardson',
    name: 'Blake Richardson',
    band: 'Between the Buried and Me',
    currentEndorsements: {
      drums: { brand: 'Pearl', model: 'Reference Pure', since: '2018' },
      cymbals: { brand: 'Meinl', model: 'Byzance Dark / Extra Dry / Traditional', since: '2018' },
      sticks: { brand: 'Vic Firth', model: 'American Classic 5B', since: '2006', signature: false },
      heads: { brand: 'Evans', model: 'G2 Coated / Hazy 300', since: '2018' },
      hardware: { brand: 'DW', model: '9002 Double Bass Pedal', since: '2006' },
    },
    timeline: [
      {
        year: 2006,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: null,
        to: 'DW',
        notes: "Built his foundational DW Collector's Series all-maple kit for Alaska (2005), the album that announced BTBAM's progressive metal sound",
      },
      {
        year: 2006,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.CYMBALS,
        from: null,
        to: 'Meinl',
        notes: 'Paired his DW kit with Meinl Byzance Extra Dry cymbals on Alaska, establishing the dark, hand-hammered voice that carried through two decades of BTBAM records',
      },
      {
        year: 2006,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.STICKS,
        from: null,
        to: 'Vic Firth',
        notes: 'Settled on Vic Firth American Classic 5B sticks for the mass and control needed across BTBAM\'s blast-beat-to-ghost-note dynamic range',
      },
      {
        year: 2006,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.HARDWARE,
        from: null,
        to: 'DW',
        notes: 'Adopted the DW 9002 chain-drive double bass pedal on Alaska, his kick foundation through the Colors, Parallax, and Automata eras',
      },
      {
        year: 2018,
        changeType: ENDORSEMENT_CHANGE_TYPES.SWITCHED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: 'DW',
        to: 'Pearl',
        notes: "Moved to an all-maple Pearl Reference Pure kit for Automata I & II, favoring its warmer resonance for BTBAM's Sumerian Records-era production",
      },
      {
        year: 2018,
        changeType: ENDORSEMENT_CHANGE_TYPES.SWITCHED,
        category: ENDORSEMENT_CATEGORIES.HEADS,
        from: 'Remo',
        to: 'Evans',
        notes: 'Moved his snare batter/reso heads to Evans G2 Coated and Hazy 300 by the Automata era',
      },
    ],
  },
  'chris-turner': {
    slug: 'chris-turner',
    name: 'Chris Turner',
    band: 'Oceans Ate Alaska',
    currentEndorsements: {
      drums: { brand: 'Tama', model: 'Starclassic Maple/Birch', since: '2017' },
      cymbals: { brand: 'Meinl', model: 'Byzance Series (Extra Dry / Dual)', since: '2017' },
      sticks: { brand: 'Vic Firth', model: 'American Classic 5A', since: '2017', signature: false },
      heads: { brand: 'Evans', model: 'EMAD / G2 Coated / EQ3', since: '2017' },
      hardware: { brand: 'Tama', model: 'Speed Cobra 910 Double Pedal', since: '2017' },
    },
    timeline: [
      {
        year: 2010,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: null,
        to: 'Tama',
        notes: 'Began developing his Tama Starclassic configuration while founding Oceans Ate Alaska in Birmingham, UK',
      },
      {
        year: 2013,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.CYMBALS,
        from: null,
        to: 'Meinl',
        notes: 'Recorded the Lost What Remains EP on an early Meinl Byzance setup paired with an initial Tama Speed Cobra pedal',
      },
      {
        year: 2017,
        changeType: ENDORSEMENT_CHANGE_TYPES.SWITCHED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: 'Tama Starclassic (developing configuration)',
        to: 'Tama Starclassic Maple/Birch',
        notes: 'Locked in the full touring Starclassic Maple/Birch kit and Tama S.L.P. G-Maple snare for Hikari, the album that made his playthrough videos go viral',
      },
      {
        year: 2017,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.STICKS,
        from: null,
        to: 'Vic Firth',
        notes: 'Settled on Vic Firth American Classic 5A sticks for the ghost-note-to-rimshot dynamic range Hikari required',
      },
      {
        year: 2022,
        changeType: ENDORSEMENT_CHANGE_TYPES.RENEWED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        brand: 'Tama',
        notes: 'Carried the same Starclassic Maple/Birch, Byzance Extra Dry, and Speed Cobra 910 setup into Disparity (2022)',
      },
    ],
  },
  'daniel-erlandsson': {
    slug: 'daniel-erlandsson',
    name: 'Daniel Erlandsson',
    band: 'Arch Enemy',
    currentEndorsements: {
      drums: { brand: 'Pearl', model: 'Reference Pure', since: '2001' },
      cymbals: { brand: 'Sabian', model: 'AAX / HHX Series', since: '2014' },
      sticks: { brand: 'ProMark', model: '5B', since: '2001', signature: false },
      heads: { brand: 'Remo', model: 'Emperor Coated / Powerstroke 3', since: '2001' },
      hardware: { brand: 'Pearl', model: 'Eliminator Double Bass Pedal', since: '2001' },
    },
    timeline: [
      {
        year: 1989,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: null,
        to: 'Pearl',
        notes: 'Began playing a developing Pearl kit with early Gothenburg act Eucharist, the foundation of the Pearl relationship carried into Arch Enemy',
      },
      {
        year: 1989,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.CYMBALS,
        from: null,
        to: 'Sabian',
        notes: 'Adopted an early professional Sabian cymbal setup during his Eucharist years, ahead of the AA/HH configuration used on Arch Enemy\'s breakthrough albums',
      },
      {
        year: 2002,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: 'Pearl Masters',
        to: 'Pearl Reference Pure',
        notes: "Reached his fully documented Pearl Reference Pure configuration on Wages of Sin (2002), paired with a Pearl Free-Floating Brass 14\"x6.5\" snare",
      },
      {
        year: 2005,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNATURE,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        brand: 'Pearl',
        product: 'Daniel Erlandsson Signature Snare 14"x5.5"',
        notes: 'Co-designed a personal 14"x5.5" signature snare with Pearl during the Doomsday Machine era, replacing his earlier Pearl Free-Floating Brass snare',
      },
      {
        year: 2014,
        changeType: ENDORSEMENT_CHANGE_TYPES.SWITCHED,
        category: ENDORSEMENT_CATEGORIES.CYMBALS,
        from: 'Sabian AA/HH',
        to: 'Sabian AAX/HHX',
        notes: 'Refined his Sabian setup to the brighter AAX crashes and darker HHX ride heard from the War Eternal era onward',
      },
    ],
  },
  'mike-mangini': {
    slug: 'mike-mangini',
    name: 'Mike Mangini',
    band: 'Dream Theater',
    currentEndorsements: {
      drums: { brand: 'Pearl', model: 'Masterworks Maple', since: '2011' },
      cymbals: { brand: 'Sabian', model: 'HHX / AAX Combination', since: '2011' },
      sticks: { brand: 'Vic Firth', model: 'Mike Mangini Signature', since: '2011' },
      heads: { brand: 'Remo', model: 'Emperor Coated / Powerstroke 3', since: '2011' },
      hardware: { brand: 'Pearl', model: 'Eliminator Redline Double Pedal', since: '2011' },
    },
    timeline: [
      {
        year: 2010,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: null,
        to: 'Pearl',
        notes: 'Signed with Pearl after winning the Dream Theater audition documented in "The Spirit Carries On," bringing his Masterworks Maple configuration to "A Dramatic Turn of Events" (2011)',
      },
      {
        year: 2011,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.CYMBALS,
        from: null,
        to: 'Sabian',
        notes: 'Adopted the Sabian HHX/AAX combination for his Dream Theater debut, pairing HHX Evolution hi-hats with AAX X-Plosion crashes',
      },
      {
        year: 2011,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.STICKS,
        from: null,
        to: 'Vic Firth',
        notes: 'Began playing what became his Vic Firth Mike Mangini Signature model, designed around his biomechanical analysis of stick motion',
      },
      {
        year: 2019,
        changeType: ENDORSEMENT_CHANGE_TYPES.SWITCHED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: 'Pearl Masterworks Maple',
        to: 'Pearl Reference Pure',
        notes: 'Moved to Pearl\'s single-species maple Reference Pure shells for "Distance Over Time" (2019), suited to the album\'s live-in-the-studio approach at Yonderbarn Studios',
      },
    ],
  },
  'morgan-agren': {
    slug: 'morgan-agren',
    name: 'Morgan Ågren',
    band: "Mats/Morgan Band / Devin Townsend Project",
    currentEndorsements: {
      drums: { brand: 'Sonor', model: 'SQ2 Beech', since: '2012' },
      cymbals: { brand: 'Meinl', model: 'Byzance Series', since: '1988' },
      sticks: { brand: 'Vic Firth', model: 'American Classic 5A', since: '1988' },
      heads: { brand: 'Remo', model: 'Ambassador Coated / Emperor Coated', since: '1988' },
      hardware: { brand: 'DW', model: 'Double Bass Pedal', since: '2012' },
    },
    timeline: [
      {
        year: 1988,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.CYMBALS,
        from: null,
        to: 'Meinl',
        notes: 'Developing Meinl Byzance relationship in place around the time Frank Zappa personally selected the then-20-year-old Ågren for his touring band',
      },
      {
        year: 2012,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: null,
        to: 'Sonor',
        notes: 'Settled into the Sonor SQ2 Beech custom shell configuration around the time Devin Townsend recruited him for the Devin Townsend Project\'s "Epicloud" (2012)',
      },
      {
        year: 2014,
        changeType: ENDORSEMENT_CHANGE_TYPES.RENEWED,
        category: ENDORSEMENT_CATEGORIES.CYMBALS,
        brand: 'Meinl',
        notes: 'Carried the Meinl Byzance Sand hi-hats and Traditional ride into "Z²" (2014), where the odd-time metric modulations demanded the line\'s layered overtone complexity',
      },
    ],
  },
  'navene-koperweis': {
    slug: 'navene-koperweis',
    name: 'Navene Koperweis',
    band: 'Entheos / ex-Animals as Leaders',
    currentEndorsements: {
      drums: { brand: 'DW', model: 'Performance Series', since: '2015' },
      cymbals: { brand: 'Meinl', model: 'Byzance Extra Dry', since: '2010' },
      sticks: { brand: 'Vic Firth', model: 'American Classic 5B', since: '2015' },
      heads: { brand: 'Evans', model: 'Genera HD Dry / EC2 Clear', since: '2015' },
      hardware: { brand: 'DW', model: '9000 Series Double Pedal', since: '2015' },
    },
    timeline: [
      {
        year: 2010,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.CYMBALS,
        from: null,
        to: 'Meinl',
        notes: 'Meinl Byzance cymbals already central to his kit during the Animals as Leaders era, heard on "Weightless" (2011) alongside Tosin Abasi\'s genre-defining guitar work',
      },
      {
        year: 2015,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: 'Tama Birch Silverstar',
        to: 'DW',
        notes: 'Moved from the Tama Birch Silverstar used on Entheos\' "Primal" EP (2015) to DW Performance Series, unifying his hardware under one endorsement as his session career expanded',
      },
      {
        year: 2015,
        changeType: ENDORSEMENT_CHANGE_TYPES.SWITCHED,
        category: ENDORSEMENT_CATEGORIES.HARDWARE,
        from: 'Tama Speed Cobra',
        to: 'DW 9000 Series',
        notes: 'Switched to the DW 9000 double pedal\'s adjustable eccentric cam to dial in the acceleration curve his riff-locked, heel-up double bass technique requires',
      },
      {
        year: 2015,
        changeType: ENDORSEMENT_CHANGE_TYPES.SWITCHED,
        category: ENDORSEMENT_CATEGORIES.CYMBALS,
        from: 'Meinl Byzance',
        to: 'Meinl Byzance Extra Dry',
        notes: 'Refined to the Extra Dry sub-series for its fast decay and controlled sustain, preventing cymbal bleed in Entheos\' tight djent riffing',
      },
    ],
  },
  'nick-augusto': {
    slug: 'nick-augusto',
    name: 'Nick Augusto',
    band: 'ex-Trivium',
    currentEndorsements: {
      drums: { brand: 'Tama', model: 'Starclassic Performer B/B', since: '2011' },
      cymbals: { brand: 'Meinl', model: 'MB20 / Classics Custom Series', since: '2011' },
      sticks: { brand: 'Promark', model: '5B Hickory', since: '2011' },
      heads: { brand: 'Evans', model: 'Genera Dry / 300 Snare Side', since: '2011' },
      hardware: { brand: 'Tama', model: 'Iron Cobra 900 Double Bass Pedal', since: '2011' },
    },
    timeline: [
      {
        year: 2007,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: null,
        to: 'DW',
        notes: 'Joined Trivium in 2007 playing a DW Performance Series kit, recorded on "Shogun" (2008) with a DW Edge 14x6.5" steel snare',
      },
      {
        year: 2008,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.CYMBALS,
        from: null,
        to: 'Meinl',
        notes: 'Debuted Meinl Byzance cymbals on "Shogun" (2008) — 14" Traditional hi-hats, 16"/18" Medium crashes, and an 18" Byzance China for breakdown accents',
      },
      {
        year: 2011,
        changeType: ENDORSEMENT_CHANGE_TYPES.SWITCHED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: 'DW Performance Series',
        to: 'Tama Starclassic Performer B/B',
        notes: 'Switched to a Tama Starclassic Performer B/B birch/bubinga hybrid kit with a Tama S.L.P. steel snare for "In Waves" (2011)',
      },
      {
        year: 2011,
        changeType: ENDORSEMENT_CHANGE_TYPES.SWITCHED,
        category: ENDORSEMENT_CATEGORIES.CYMBALS,
        from: 'Meinl Byzance',
        to: 'Meinl MB20 / Classics Custom',
        notes: 'Moved to the MB20 heavy-weight crashes and Classics Custom hi-hats/ride for "In Waves," carried unchanged into "Vengeance Falls" (2013)',
      },
    ],
  },
  'paul-mazurkiewicz': {
    slug: 'paul-mazurkiewicz',
    name: 'Paul Mazurkiewicz',
    band: 'Cannibal Corpse',
    currentEndorsements: {
      drums: { brand: 'Pearl', model: 'Reference', since: '1990s' },
      cymbals: { brand: 'Meinl', model: 'Classics Custom / Byzance Series', since: '1990s' },
      sticks: { brand: 'Vic Firth', model: 'Paul Mazurkiewicz Signature', since: '2000s' },
      heads: { brand: 'Remo', model: 'Powerstroke 3 / Emperor Coated', since: '1990s' },
      hardware: { brand: 'Pearl', model: 'Eliminator Double Bass Pedal', since: '1990s' },
    },
    timeline: [
      {
        year: 1990,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: null,
        to: 'Pearl',
        notes: 'Played a pre-endorsement Pearl Export-range kit on Cannibal Corpse\'s debut "Eaten Back to Life" (1990), recorded at Morrisound with producer Scott Burns',
      },
      {
        year: 1990,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.CYMBALS,
        from: 'Paiste/Zildjian (budget setup)',
        to: 'Meinl',
        notes: 'Moved on from the budget Paiste/Zildjian cymbals used on "Eaten Back to Life" as the Meinl endorsement developed through the early Morrisound era',
      },
      {
        year: 1996,
        changeType: ENDORSEMENT_CHANGE_TYPES.SWITCHED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: 'Pearl Export',
        to: 'Pearl Reference',
        notes: 'Solidified the Pearl Reference maple/African mahogany hybrid shell pack as his primary kit, paired with a Pearl Free-Floating steel snare',
      },
      {
        year: 2000,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNATURE,
        category: ENDORSEMENT_CATEGORIES.STICKS,
        brand: 'Vic Firth',
        product: 'Paul Mazurkiewicz Signature',
        notes: 'Developed a Vic Firth signature stick spec — heavier overall weight and a durable wood tip built for the power demands of 180-250 BPM blast beats',
      },
    ],
  },
  'pete-sandoval': {
    slug: 'pete-sandoval',
    name: 'Pete Sandoval',
    band: 'Morbid Angel',
    currentEndorsements: {
      drums: { brand: 'Pearl', model: 'Reference / Masterworks', since: '1993' },
      cymbals: { brand: 'Sabian', model: 'AA Series', since: '1993' },
      sticks: { brand: 'Vic Firth', model: 'American Classic 2B/5B', since: '1990s' },
      heads: { brand: 'Remo', model: 'Ambassador Coated / Powerstroke 3', since: '1989' },
      hardware: { brand: 'Pearl', model: 'Demon Drive Double Bass Pedal', since: '1993' },
    },
    timeline: [
      {
        year: 1989,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: null,
        to: 'Tama',
        notes: 'Played a Tama Superstar/Artstar II kit with individual chain-drive pedals on Morbid Angel\'s debut "Altars of Madness" (1989), the album that helped invent death metal drumming',
      },
      {
        year: 1993,
        changeType: ENDORSEMENT_CHANGE_TYPES.SWITCHED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: 'Tama',
        to: 'Pearl',
        notes: 'Switched to a Pearl Reference Series maple/poplar hybrid kit for "Covenant" (1993), adding shell mass for his 230+ BPM double-bass work; later carried the endorsement into the Pearl Masterworks line',
      },
      {
        year: 1993,
        changeType: ENDORSEMENT_CHANGE_TYPES.SWITCHED,
        category: ENDORSEMENT_CATEGORIES.CYMBALS,
        from: 'Paiste RUDE/2002',
        to: 'Sabian',
        notes: 'Moved from Paiste RUDE/2002 to Sabian AA cymbals (14" Medium Hi-Hats, 16"/18" Medium Crashes, 20" Metal Ride, 18" China) for "Covenant," trading Paiste\'s longer sustain for Sabian\'s faster-decaying attack at extreme tempos',
      },
    ],
  },
  'ray-luzier': {
    slug: 'ray-luzier',
    name: 'Ray Luzier',
    band: 'Korn',
    currentEndorsements: {
      drums: { brand: 'Pearl', model: 'Reference Maple', since: '2013' },
      cymbals: { brand: 'Sabian', model: 'AAX Series', since: '2013' },
      sticks: { brand: 'Promark', model: 'Ray Luzier Signature TX420X', since: '2013' },
      heads: { brand: 'Evans', model: 'EC2 Coated / EMAD2', since: '2010' },
      hardware: { brand: 'Pearl', model: 'Demon Drive Double Bass Pedal', since: '2013' },
    },
    timeline: [
      {
        year: 2010,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: null,
        to: 'DW',
        notes: 'Ran a DW Collector\'s Series kit with a DW 9002 double bass pedal for "Korn III: Remember Who You Are" (2010), his debut studio album with Korn',
      },
      {
        year: 2013,
        changeType: ENDORSEMENT_CHANGE_TYPES.SWITCHED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: 'DW',
        to: 'Pearl',
        notes: 'Transitioned from DW to a Pearl Reference Maple kit with Pearl Demon Drive double pedals for "The Paradigm Shift" (2013), beginning his current Pearl endorsement',
      },
      {
        year: 2013,
        changeType: ENDORSEMENT_CHANGE_TYPES.SWITCHED,
        category: ENDORSEMENT_CATEGORIES.CYMBALS,
        from: 'Paiste 2002 / Meinl Byzance',
        to: 'Sabian AAX',
        notes: 'Switched from his Paiste 2002/Meinl Byzance mix to Sabian AAX cymbals alongside the Pearl move for "The Paradigm Shift" (2013), a setup he has kept through "Requiem" (2022)',
      },
      {
        year: 2013,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNATURE,
        category: ENDORSEMENT_CATEGORIES.STICKS,
        brand: 'Promark',
        product: 'Ray Luzier Signature TX420X',
        notes: 'Moved from stock Promark Hickory 5B to his own Promark Ray Luzier Signature TX420X model starting with "The Paradigm Shift" (2013)',
      },
    ],
  },
  'raymond-herrera': {
    slug: 'raymond-herrera',
    name: 'Raymond Herrera',
    band: 'Fear Factory',
    currentEndorsements: {
      drums: { brand: 'Pearl', model: 'Reference Series', since: '1995' },
      cymbals: { brand: 'Zildjian', model: 'Z Custom', since: '1995' },
      sticks: { brand: 'Vater', model: 'Power 5B', since: '1995' },
      heads: { brand: 'Remo', model: 'Pinstripe / Ambassador', since: '1995' },
      hardware: { brand: 'Pearl', model: 'Eliminator Double Pedal', since: '1995' },
    },
    timeline: [
      {
        year: 1995,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: null,
        to: 'Pearl',
        notes: 'Built his hybrid acoustic/electronic setup around a Pearl Reference Series kit for "Demanufacture" (1995), the album that defined industrial metal drumming; kept unchanged through "Obsolete" (1998) and "Digimortal" (2001)',
      },
      {
        year: 1995,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.CYMBALS,
        from: null,
        to: 'Zildjian',
        notes: 'Chose Zildjian Z Custom cymbals for their durability and bright, cutting projection above Fear Factory\'s down-tuned guitars, starting on "Demanufacture" (1995)',
      },
      {
        year: 1995,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.ELECTRONICS,
        from: null,
        to: 'ddrum / Roland',
        notes: 'Wired his Pearl kit with ddrum triggers into a Roland drum module for "Demanufacture," creating the mechanical, processed drum sound at the core of Fear Factory\'s identity',
      },
    ],
  },
  'richard-christy': {
    slug: 'richard-christy',
    name: 'Richard Christy',
    band: 'Death',
    currentEndorsements: {
      drums: { brand: 'Pearl', model: 'Masters Custom', since: '1998' },
      cymbals: { brand: 'Sabian', model: 'AA / AAX Series', since: '1998' },
      sticks: { brand: 'Vic Firth', model: 'American Classic 5A/5B', since: '1998' },
      heads: { brand: 'Remo / Evans', model: 'Emperor / Pinstripe / G2', since: '1998' },
      hardware: { brand: 'Pearl', model: 'PowerShifter Eliminator', since: '1998' },
    },
    timeline: [
      {
        year: 1998,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: null,
        to: 'Pearl',
        notes: 'Recorded Death\'s final album "The Sound of Perseverance" (1998) on a Pearl Masters Custom maple kit with a deeper-than-typical 22" x 18" kick for the low-end weight Chuck Schuldiner wanted; carried the same kit into Control Denied and Iced Earth',
      },
      {
        year: 1998,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.CYMBALS,
        from: null,
        to: 'Sabian',
        notes: 'Paired the Pearl kit with Sabian AA and AAX cymbals (14" AA Regular Hi-Hats, 16" AAX Studio Crash, 20" AA Medium Ride, 18" AAX Chinese) on "The Sound of Perseverance" (1998)',
      },
    ],
  },
  'ryan-van-poederooyen': {
    slug: 'ryan-van-poederooyen',
    name: 'Ryan Van Poederooyen',
    band: 'Devin Townsend Project',
    currentEndorsements: {
      drums: { brand: 'Pearl', model: 'Reference Series', since: '2000' },
      cymbals: { brand: 'Sabian', model: 'AAX / HHX Series', since: '2000' },
      sticks: { brand: 'Vic Firth', model: 'American Classic 5B', since: '2000' },
      heads: { brand: 'Evans / Remo', model: 'EMAD/EC2 / Powerstroke 3', since: '2000' },
      hardware: { brand: 'Tama', model: 'Iron Cobra Double Bass Pedal', since: '2000' },
    },
    timeline: [
      {
        year: 2000,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: null,
        to: 'Pearl',
        notes: 'Anchored Devin Townsend\'s "Physicist" (2000) — his recording debut with Townsend — on a Pearl Reference Series maple/mahogany hybrid kit with dual 22" x 18" kicks, a setup he has kept across the entire Devin Townsend Project catalogue',
      },
      {
        year: 2000,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.CYMBALS,
        from: null,
        to: 'Sabian',
        notes: 'Built his cymbal setup around Sabian AAX and HHX pieces (14" AAX Hi-Hats, 16" AAX Crash, 18" HHX Crash, 20" HHX Ride, 18" AAX China) starting with "Physicist" (2000), unchanged through "Deconstruction" (2011) and "Empath" (2019)',
      },
      {
        year: 2011,
        changeType: ENDORSEMENT_CHANGE_TYPES.RENEWED,
        category: ENDORSEMENT_CATEGORIES.HARDWARE,
        brand: 'Tama / DW',
        notes: 'Alternated between Tama Iron Cobra and DW 9000 double bass pedals across "Deconstruction" and "Ghost" (both 2011), released the same day and recorded on the same physical kit',
      },
    ],
  },
  'tim-yeung': {
    slug: 'tim-yeung',
    name: 'Tim Yeung',
    band: 'Morbid Angel',
    currentEndorsements: {
      drums: { brand: 'Pearl', model: 'Reference Masters', since: '2005' },
      cymbals: { brand: 'Sabian', model: 'AAX / HHX Series', since: '2005' },
      sticks: { brand: 'Vic Firth', model: '5B', since: '2005' },
      heads: { brand: 'Remo', model: 'Powerstroke 3', since: '2005' },
      hardware: { brand: 'DW', model: '9002 Double Bass Pedal', since: '2005' },
    },
    timeline: [
      {
        year: 2005,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        from: null,
        to: 'Pearl',
        notes: 'Established his Pearl Reference Masters maple/mahogany kit with Erik Rutan\'s Hate Eternal on "I, Monarch" (2005), the setup he later carried unchanged into Divine Heresy and Morbid Angel',
      },
      {
        year: 2005,
        changeType: ENDORSEMENT_CHANGE_TYPES.SIGNED,
        category: ENDORSEMENT_CATEGORIES.CYMBALS,
        from: null,
        to: 'Sabian',
        notes: 'Paired the Pearl kit with Sabian AAX/HHX cymbals starting on Hate Eternal\'s "I, Monarch" (2005), the same combination he used on Divine Heresy\'s "Bleed the Fifth" (2007) and Morbid Angel\'s "Illud Divinum Insanus" (2011)',
      },
      {
        year: 2011,
        changeType: ENDORSEMENT_CHANGE_TYPES.RENEWED,
        category: ENDORSEMENT_CATEGORIES.DRUMS,
        brand: 'Pearl',
        notes: 'Carried the Pearl Reference Masters / Sabian / DW 9002 setup into his debut Morbid Angel album "Illud Divinum Insanus" (2011), maintaining it through "Kingdoms Disdained" (2017)',
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
