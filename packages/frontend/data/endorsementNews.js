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
