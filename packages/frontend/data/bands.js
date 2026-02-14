// Bands data - linking bands to their drummers and providing band context
// This enables band-centric navigation and rich band information

export const BANDS = {
  'metallica': {
    id: 'metallica',
    name: 'Metallica',
    slug: 'metallica',
    genre: 'Thrash Metal',
    genres: ['Thrash Metal', 'Heavy Metal'],
    country: 'USA',
    formed: 1981,
    formedYear: 1981,
    origin: 'Los Angeles, California',
    status: 'active',
    summary: 'Metallica is an American heavy metal band formed in 1981 in Los Angeles. The band is one of the founding members of the "Big Four" of thrash metal, alongside Slayer, Megadeth, and Anthrax. Metallica has sold over 125 million albums worldwide, making them one of the best-selling music artists of all time.',
    description: 'Metallica is an American heavy metal band formed in 1981 in Los Angeles. The band is one of the founding members of the "Big Four" of thrash metal, alongside Slayer, Megadeth, and Anthrax. Metallica has sold over 125 million albums worldwide, making them one of the best-selling music artists of all time.',
    metaTitle: 'Metallica Drummer History & Gear | MetalForge',
    metaDescription: 'Explore Metallica\'s complete drummer history featuring Lars Ulrich. Discover the drum kits, cymbals, and gear used throughout the band\'s legendary career since 1981.',
    bio: 'Metallica was founded in 1981 by drummer Lars Ulrich and guitarist/vocalist James Hetfield after Ulrich placed an ad in a Los Angeles newspaper. The band went through several lineup changes before settling on the classic formation with lead guitarist Kirk Hammett (who replaced Dave Mustaine in 1983) and bassist Cliff Burton. After Burton\'s tragic death in 1986, Jason Newsted joined and later Robert Trujillo in 2003. Metallica\'s first four albums—"Kill \'Em All" (1983), "Ride the Lightning" (1984), "Master of Puppets" (1986), and "...And Justice for All" (1988)—are considered thrash metal classics. Their self-titled 1991 album, known as "The Black Album," brought them mainstream success with songs like "Enter Sandman" and "Nothing Else Matters." The band has won nine Grammy Awards and was inducted into the Rock and Roll Hall of Fame in 2009.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/07/Metallica_at_The_O2_Arena_London_2008.jpg',
    sameAs: [
      'https://en.wikipedia.org/wiki/Metallica',
      'https://www.metallica.com/',
      'https://www.instagram.com/metallica/',
      'https://twitter.com/Metallica',
      'https://www.discogs.com/artist/18839-Metallica',
      'https://www.allmusic.com/artist/metallica-mn0000446509',
      'https://open.spotify.com/artist/2ye2Wgw4gimLv2eAKyk1NB'
    ],
    drummerHistory: [
      {
        drummer: 'lars-ulrich',
        drummerId: 1, // Lars Ulrich
        name: 'Lars Ulrich',
        period: '1981-present',
        albums: [
          'Kill \'Em All (1983)',
          'Ride the Lightning (1984)',
          'Master of Puppets (1986)',
          '...And Justice for All (1988)',
          'Metallica (1991)',
          'Load (1996)',
          'ReLoad (1997)',
          'St. Anger (2003)',
          'Death Magnetic (2008)',
          'Hardwired... to Self-Destruct (2016)',
          '72 Seasons (2023)'
        ],
        notes: 'Co-founder and the only drummer in Metallica\'s history. First Danish musician inducted into the Rock and Roll Hall of Fame.'
      }
    ],
    notableAlbums: [
      {
        name: 'Master of Puppets',
        year: 1986,
        description: 'Widely regarded as one of the greatest and most influential heavy metal albums of all time'
      },
      {
        name: 'Metallica (The Black Album)',
        year: 1991,
        description: 'The best-selling album of the SoundScan era, with over 16 million copies sold in the US alone'
      },
      {
        name: 'Ride the Lightning',
        year: 1984,
        description: 'The album that established Metallica as a major force in thrash metal'
      },
      {
        name: '...And Justice for All',
        year: 1988,
        description: 'Known for its complex arrangements and the hit single "One"'
      },
      {
        name: '72 Seasons',
        year: 2023,
        description: 'Their most recent studio album, showing the band still going strong after 40+ years'
      }
    ],
    drummerIds: [1],
    associatedBrands: ['Tama', 'Zildjian', 'Ahead', 'Remo'],
    keywords: ['metallica', 'thrash metal', 'big four', 'lars ulrich', 'james hetfield', 'enter sandman', 'master of puppets', 'black album']
  },
  'sepultura': {
    id: 'sepultura',
    name: 'Sepultura',
    slug: 'sepultura',
    genre: 'Thrash Metal',
    genres: ['Thrash Metal', 'Groove Metal', 'Death Metal'],
    country: 'Brazil',
    formed: 1984,
    formedYear: 1984,
    origin: 'Belo Horizonte, Minas Gerais, Brazil',
    status: 'active',
    summary: 'Sepultura is a Brazilian heavy metal band formed in 1984 in Belo Horizonte. They are considered one of the most influential bands to emerge from South America, helping pioneer the thrash and death metal scenes in Brazil. Their music blends aggressive thrash metal with elements of death metal, hardcore punk, and Brazilian tribal rhythms.',
    description: 'Sepultura is a Brazilian heavy metal band formed in 1984 in Belo Horizonte. They are considered one of the most influential bands to emerge from South America, helping pioneer the thrash and death metal scenes in Brazil. Their music blends aggressive thrash metal with elements of death metal, hardcore punk, and Brazilian tribal rhythms.',
    metaTitle: 'Sepultura Drummer History & Gear | MetalForge',
    metaDescription: 'Explore Sepultura\'s complete drummer history from Igor Cavalera to Eloy Casagrande. Discover the drum kits and gear used by Brazil\'s legendary thrash metal pioneers.',
    bio: 'Sepultura was founded in 1984 by brothers Max and Igor Cavalera. The band\'s early albums "Morbid Visions" (1986) and "Schizophrenia" (1987) established them as leaders of the Brazilian extreme metal scene. Their breakthrough came with "Beneath the Remains" (1989) and "Arise" (1991), which brought them international recognition. "Chaos A.D." (1993) and "Roots" (1996) incorporated tribal percussion and Brazilian influences, creating a unique sound that influenced the nu-metal movement. After Max Cavalera\'s departure in 1996, Derrick Green became the vocalist. Igor Cavalera left in 2006. The band has continued to release critically acclaimed albums and tour worldwide, becoming one of the most enduring acts in metal history. Sepultura announced their farewell tour in 2023, celebrating 40 years of existence.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/5/55/Sepultura_Logo.png',
    sameAs: [
      'https://en.wikipedia.org/wiki/Sepultura',
      'https://www.sepultura.com.br/',
      'https://www.instagram.com/sepaborgesepultura/',
      'https://twitter.com/sepaborgesepultura',
      'https://www.discogs.com/artist/18943-Sepultura',
      'https://www.allmusic.com/artist/sepultura-mn0000474965',
      'https://open.spotify.com/artist/6JW8wliOEwaDZ231ZY7cf4'
    ],
    drummerHistory: [
      {
        drummerId: null, // Igor Cavalera not yet in database
        name: 'Igor Cavalera',
        period: '1984-2006',
        albums: [
          'Morbid Visions (1986)',
          'Schizophrenia (1987)',
          'Beneath the Remains (1989)',
          'Arise (1991)',
          'Chaos A.D. (1993)',
          'Roots (1996)',
          'Against (1998)',
          'Nation (2001)',
          'Roorback (2003)',
          'Dante XXI (2006)'
        ],
        notes: 'Co-founder and original drummer. Known for incorporating tribal percussion and Brazilian rhythms. Left in 2006 and later reunited with his brother Max in Cavalera Conspiracy.'
      },
      {
        drummerId: null, // Jean Dolabella not yet in database
        name: 'Jean Dolabella',
        period: '2006-2011',
        albums: [
          'A-Lex (2009)'
        ],
        notes: 'Brazilian drummer who brought a more technical approach to the band.'
      },
      {
        drummerId: 7, // Eloy Casagrande
        name: 'Eloy Casagrande',
        period: '2011-2024',
        albums: [
          'Kairos (2011)',
          'The Mediator Between Head and Hands Must Be the Heart (2013)',
          'Machine Messiah (2017)',
          'Quadra (2020)'
        ],
        notes: 'Brought explosive energy and technical precision to the band. Left in 2024 to join Slipknot.'
      },
      {
        drummerId: null, // Greyson Nekrutman not yet in database
        name: 'Greyson Nekrutman',
        period: '2024-present',
        albums: [],
        notes: 'Current touring drummer for the band\'s farewell tour.'
      }
    ],
    notableAlbums: [
      {
        name: 'Beneath the Remains',
        year: 1989,
        description: 'Their breakthrough album that gained international recognition and is considered a thrash metal classic'
      },
      {
        name: 'Arise',
        year: 1991,
        description: 'Refined their sound and became one of the defining thrash metal albums of the early 90s'
      },
      {
        name: 'Chaos A.D.',
        year: 1993,
        description: 'Marked a shift toward groove metal with politically charged lyrics and tribal influences'
      },
      {
        name: 'Roots',
        year: 1996,
        description: 'Groundbreaking album that fused metal with Brazilian tribal music, influencing the nu-metal movement'
      },
      {
        name: 'Quadra',
        year: 2020,
        description: 'Critically acclaimed album showcasing the band\'s continued evolution and relevance'
      }
    ],
    drummerIds: [7],
    associatedBrands: ['Tama', 'Paiste', 'Promark', 'Evans'],
    keywords: ['sepultura', 'thrash metal', 'brazilian metal', 'igor cavalera', 'max cavalera', 'eloy casagrande', 'roots', 'arise', 'chaos ad', 'beneath the remains']
  },
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

// Alias for getBandBySlug (used in App.js)
export function getBand(slug) {
  return getBandBySlug(slug);
}

// Check if a band exists by slug
export function hasBand(slug) {
  return slug in BANDS;
}

// Get all band slugs
export function getAllBandSlugs() {
  return Object.keys(BANDS);
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
