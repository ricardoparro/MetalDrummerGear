// Bands data - linking bands to their drummers and providing band context
// This enables band-centric navigation and rich band information

export const BANDS = {
  'dream-theater': {
    id: 'dream-theater',
    name: 'Dream Theater',
    slug: 'dream-theater',
    genre: 'Progressive Metal',
    genres: ['Progressive Metal'],
    country: 'USA',
    formedYear: 1985,
    origin: 'Boston, Massachusetts',
    status: 'Active',
    description: 'Dream Theater is an American progressive metal band formed in 1985 in Boston, Massachusetts. The band is known for their technical proficiency, complex compositions, and epic concept albums. They are considered one of the most influential bands in the progressive metal genre, having sold over 12 million records worldwide.',
    bio: 'Dream Theater was founded under the name Majesty by guitarist John Petrucci, bassist John Myung, and drummer Mike Portnoy while they were students at Berklee College of Music. After adding keyboardist Kevin Moore and vocalist Charlie Dominici, they recorded their debut album "When Dream and Day Unite" in 1989. The band achieved mainstream success with their 1992 album "Images and Words," featuring the hit single "Pull Me Under." Known for their virtuosic musicianship and complex song structures, Dream Theater has released 15 studio albums and influenced countless progressive metal and rock bands. The band has featured two legendary drummers: Mike Portnoy (1985-2010, 2023-present) and Mike Mangini (2010-2023).',
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Dream_Theater_logo.png',
    sameAs: [
      'https://en.wikipedia.org/wiki/Dream_Theater',
      'https://www.dreamtheater.net/',
      'https://www.instagram.com/dreamtheaterofficial/',
      'https://twitter.com/dreamaboratory',
      'https://www.discogs.com/artist/17691-Dream-Theater',
      'https://www.allmusic.com/artist/dream-theater-mn0000184089'
    ],
    drummerHistory: [
      {
        drummerId: 13, // Mike Portnoy
        name: 'Mike Portnoy',
        period: '1985-2010, 2023-present',
        albums: [
          'When Dream and Day Unite (1989)',
          'Images and Words (1992)',
          'Awake (1994)',
          'A Change of Seasons (1995)',
          'Falling into Infinity (1997)',
          'Metropolis Pt. 2: Scenes from a Memory (1999)',
          'Six Degrees of Inner Turbulence (2002)',
          'Train of Thought (2003)',
          'Octavarium (2005)',
          'Systematic Chaos (2007)',
          'Black Clouds & Silver Linings (2009)',
          'Parasomnia (2025)'
        ],
        notes: 'Co-founder and original drummer. Left in 2010, rejoined in 2023 for their reunion tour.'
      },
      {
        drummerId: 52, // Mike Mangini
        name: 'Mike Mangini',
        period: '2010-2023',
        albums: [
          'A Dramatic Turn of Events (2011)',
          'Dream Theater (2013)',
          'The Astonishing (2016)',
          'Distance over Time (2019)',
          'A View from the Top of the World (2021)'
        ],
        notes: 'Selected through a competitive audition process documented in the DVD "The Spirit Carries On."'
      }
    ],
    notableAlbums: [
      {
        name: 'Images and Words',
        year: 1992,
        description: 'Breakthrough album featuring "Pull Me Under" and "Metropolis—Part I"'
      },
      {
        name: 'Metropolis Pt. 2: Scenes from a Memory',
        year: 1999,
        description: 'Concept album widely considered their masterpiece'
      },
      {
        name: 'Train of Thought',
        year: 2003,
        description: 'Heavier direction influenced by Metallica and Pantera'
      },
      {
        name: 'Octavarium',
        year: 2005,
        description: 'Features the 24-minute title track epic'
      }
    ],
    // Drummers who have played with this band (by ID)
    drummerIds: [13, 52],
    // Associated gear brands commonly used by band's drummers
    associatedBrands: ['Tama', 'Pearl', 'Sabian', 'Vic Firth', 'Roland'],
    // Keywords for search
    keywords: ['dream theater', 'progressive metal', 'prog metal', 'technical', 'john petrucci', 'mike portnoy', 'mike mangini']
  }
};

// Get all bands as array
export function getAllBands() {
  return Object.values(BANDS);
}

// Get band by slug
export function getBandBySlug(slug) {
  return BANDS[slug] || null;
}

// Get band by name (case-insensitive)
export function getBandByName(name) {
  const normalizedName = name.toLowerCase().trim();
  return Object.values(BANDS).find(
    band => band.name.toLowerCase() === normalizedName
  ) || null;
}

// Get bands for a specific drummer ID
export function getBandsForDrummer(drummerId) {
  return Object.values(BANDS).filter(
    band => band.drummerIds.includes(drummerId)
  );
}

// Search bands by keyword
export function searchBands(query) {
  if (!query) return [];
  const q = query.toLowerCase();
  return Object.values(BANDS).filter(band =>
    band.name.toLowerCase().includes(q) ||
    band.keywords.some(kw => kw.includes(q)) ||
    band.genres.some(g => g.toLowerCase().includes(q))
  );
}

// Get drummer history for a band
export function getDrummerHistory(bandSlug) {
  const band = BANDS[bandSlug];
  return band ? band.drummerHistory : [];
}
