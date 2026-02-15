/**
 * Band data structure for MetalForge
 * Contains band information with drummer history
 * Issue #359: Added Sepultura band data
 * Issue #429: Added sameAs links for MusicGroup schema
 */

export const bands = {
  metallica: {
    slug: "metallica",
    name: "Metallica",
    formed: 1981,
    origin: "Los Angeles, California, USA",
    genres: ["thrash-metal", "heavy-metal"],
    status: "active",
    metaTitle: "Metallica - Drummer History & Gear | MetalForge",
    metaDescription: "Explore Metallica drumming legacy with Lars Ulrich.",
    summary: "Metallica, formed in 1981 in Los Angeles, is one of the most influential thrash metal bands.",
    keywords: ["metallica", "lars ulrich", "thrash metal", "metal drums", "drummer gear"],
    drummerHistory: [{ drummer: "lars-ulrich", period: "1981-present", notes: "Co-founder" }],
    relatedBands: ["slayer", "megadeth", "anthrax"],
    sameAs: [
      "https://en.wikipedia.org/wiki/Metallica",
      "https://www.discogs.com/artist/18839-Metallica",
      "https://musicbrainz.org/artist/65f4f0c5-ef9e-490c-aee3-909e7ae6b2ab",
      "https://www.wikidata.org/wiki/Q15920"
    ],
  },
  sepultura: {
    slug: "sepultura",
    name: "Sepultura",
    formed: 1984,
    origin: "Belo Horizonte, Brazil",
    genres: ["thrash-metal", "groove-metal", "death-metal"],
    status: "disbanded",
    metaTitle: "Sepultura Drummer History - Igor to Eloy | MetalForge",
    metaDescription: "Complete Sepultura drummer history from Igor Cavalera to Eloy Casagrande.",
    summary: "Sepultura formed 1984, Brazilian thrash pioneers, disbanded 2024.",
    keywords: ["sepultura", "igor cavalera", "eloy casagrande", "brazilian metal"],
    drummerHistory: [
      { drummer: "igor-cavalera", period: "1984-2006", notes: "Co-founder with brother Max" },
      { drummer: "jean-dolabella", period: "2006-2011", notes: "" },
      { drummer: "eloy-casagrande", period: "2011-2024", notes: "Final drummer, now in Slipknot" }
    ],
    relatedBands: ["soulfly", "cavalera-conspiracy", "slipknot"],
    sameAs: [
      "https://en.wikipedia.org/wiki/Sepultura",
      "https://www.discogs.com/artist/18291-Sepultura",
      "https://musicbrainz.org/artist/c44e9c22-ef82-4a77-9bcd-af6c958446d6",
      "https://www.wikidata.org/wiki/Q207036"
    ],
    faq: [
      { q: "Is Sepultura still active?", a: "No, they completed a farewell tour in 2024." },
      { q: "Who was Sepultura's last drummer?", a: "Eloy Casagrande (2011-2024), now in Slipknot." },
      { q: "Why did Igor Cavalera leave?", a: "He left in 2006 due to conflicts with management." }
    ],
  },
  tool: {
    slug: "tool",
    name: "Tool",
    formed: 1990,
    origin: "Los Angeles, California, USA",
    genres: ["progressive-metal", "alternative-metal", "art-rock"],
    status: "active",
    metaTitle: "Tool - Danny Carey Drummer Profile & Gear | MetalForge",
    metaDescription: "Discover Tool's legendary drummer Danny Carey and his gear setup.",
    summary: "Tool, formed in 1990 in Los Angeles, is known for complex time signatures and visual artistry.",
    keywords: ["tool", "danny carey", "progressive metal", "polyrhythm", "drummer gear"],
    drummerHistory: [{ drummer: "danny-carey", period: "1990-present", notes: "Founding member" }],
    relatedBands: ["a-perfect-circle", "puscifer"],
    sameAs: [
      "https://en.wikipedia.org/wiki/Tool_(band)",
      "https://www.discogs.com/artist/24069-Tool",
      "https://musicbrainz.org/artist/66fc5bf8-daa4-4241-b378-9bc9077571d6",
      "https://www.wikidata.org/wiki/Q184188"
    ],
  },
  gojira: {
    slug: "gojira",
    name: "Gojira",
    formed: 1996,
    origin: "Bayonne, France",
    genres: ["progressive-death-metal", "groove-metal", "technical-metal"],
    status: "active",
    metaTitle: "Gojira - Mario Duplantier Drummer Profile & Gear | MetalForge",
    metaDescription: "Explore Gojira's powerhouse drummer Mario Duplantier and his complete gear setup.",
    summary: "Gojira, formed in 1996 in France, pioneered eco-conscious progressive death metal.",
    keywords: ["gojira", "mario duplantier", "progressive death metal", "french metal", "drummer gear"],
    drummerHistory: [{ drummer: "mario-duplantier", period: "1996-present", notes: "Co-founder with brother Joe" }],
    relatedBands: ["mastodon", "opeth", "meshuggah"],
    sameAs: [
      "https://en.wikipedia.org/wiki/Gojira_(band)",
      "https://www.discogs.com/artist/283955-Gojira",
      "https://musicbrainz.org/artist/1c5e1c3b-3f69-4bfe-9143-4e60c6ed8bf5",
      "https://www.wikidata.org/wiki/Q645883"
    ],
  },
  slipknot: {
    slug: "slipknot",
    name: "Slipknot",
    formed: 1995,
    origin: "Des Moines, Iowa, USA",
    genres: ["nu-metal", "alternative-metal", "heavy-metal"],
    status: "active",
    metaTitle: "Slipknot - Drummer History & Gear | MetalForge",
    metaDescription: "Complete history of Slipknot drummers from Joey Jordison to Eloy Casagrande.",
    summary: "Slipknot, formed in 1995 in Des Moines, pioneered the masked nu-metal movement.",
    keywords: ["slipknot", "joey jordison", "jay weinberg", "eloy casagrande", "nu metal", "drummer gear"],
    drummerHistory: [
      { drummer: "joey-jordison", period: "1995-2013", notes: "Founding member, iconic masked drummer" },
      { drummer: "jay-weinberg", period: "2014-2023", notes: "Son of Max Weinberg" },
      { drummer: "eloy-casagrande", period: "2023-present", notes: "Former Sepultura drummer" }
    ],
    relatedBands: ["stone-sour", "murderdolls", "sepultura"],
    sameAs: [
      "https://en.wikipedia.org/wiki/Slipknot_(band)",
      "https://www.discogs.com/artist/163683-Slipknot",
      "https://musicbrainz.org/artist/a466c2a2-6517-42fb-a160-1087c3bafd9f",
      "https://www.wikidata.org/wiki/Q188840"
    ],
  },
  slayer: {
    slug: "slayer",
    name: "Slayer",
    formed: 1981,
    origin: "Huntington Park, California, USA",
    genres: ["thrash-metal", "speed-metal"],
    status: "disbanded",
    metaTitle: "Slayer - Dave Lombardo Drummer Profile & Gear | MetalForge",
    metaDescription: "Explore Slayer's legendary drummer Dave Lombardo and his iconic gear.",
    summary: "Slayer, formed in 1981, defined extreme thrash metal with aggressive drumming.",
    keywords: ["slayer", "dave lombardo", "thrash metal", "double bass", "drummer gear"],
    drummerHistory: [
      { drummer: "dave-lombardo", period: "1981-1992, 2001-2013", notes: "Co-founder, pioneered extreme thrash drumming" },
      { drummer: "paul-bostaph", period: "1992-2001, 2013-2019", notes: "Two separate stints" }
    ],
    relatedBands: ["metallica", "megadeth", "anthrax", "testament"],
    sameAs: [
      "https://en.wikipedia.org/wiki/Slayer",
      "https://www.discogs.com/artist/18843-Slayer",
      "https://musicbrainz.org/artist/bdacc37b-8633-4bf0-9a08-fc8c98014ad5",
      "https://www.wikidata.org/wiki/Q188859"
    ],
  },
  meshuggah: {
    slug: "meshuggah",
    name: "Meshuggah",
    formed: 1987,
    origin: "Umeå, Sweden",
    genres: ["progressive-metal", "djent", "extreme-metal"],
    status: "active",
    metaTitle: "Meshuggah - Tomas Haake Drummer Profile & Gear | MetalForge",
    metaDescription: "Discover Tomas Haake's revolutionary polyrhythmic drumming with Meshuggah.",
    summary: "Meshuggah, formed in 1987 in Sweden, pioneered djent and polyrhythmic metal.",
    keywords: ["meshuggah", "tomas haake", "djent", "polyrhythm", "progressive metal", "drummer gear"],
    drummerHistory: [{ drummer: "tomas-haake", period: "1990-present", notes: "Joined shortly after formation" }],
    relatedBands: ["periphery", "animals-as-leaders", "tesseract"],
    sameAs: [
      "https://en.wikipedia.org/wiki/Meshuggah",
      "https://www.discogs.com/artist/73547-Meshuggah",
      "https://musicbrainz.org/artist/cf8b3b8c-118e-4136-8d1d-c37091173413",
      "https://www.wikidata.org/wiki/Q498476"
    ],
  },
  "dream-theater": {
    slug: "dream-theater",
    name: "Dream Theater",
    formed: 1985,
    origin: "Boston, Massachusetts, USA",
    genres: ["progressive-metal", "progressive-rock"],
    status: "active",
    metaTitle: "Dream Theater - Mike Portnoy Drummer Profile & Gear | MetalForge",
    metaDescription: "Explore Mike Portnoy's legendary progressive metal drumming with Dream Theater.",
    summary: "Dream Theater, formed in 1985, defined progressive metal with virtuosic musicianship.",
    keywords: ["dream theater", "mike portnoy", "progressive metal", "technical drumming", "drummer gear"],
    drummerHistory: [
      { drummer: "mike-portnoy", period: "1985-2010, 2023-present", notes: "Co-founder, returned in 2023" },
      { drummer: "mike-mangini", period: "2010-2023", notes: "Berklee professor" }
    ],
    relatedBands: ["liquid-tension-experiment", "transatlantic", "sons-of-apollo"],
    sameAs: [
      "https://en.wikipedia.org/wiki/Dream_Theater",
      "https://www.discogs.com/artist/140607-Dream-Theater",
      "https://musicbrainz.org/artist/28503ab7-8bf2-4666-a7bd-2644bfc7cb1d",
      "https://www.wikidata.org/wiki/Q191248"
    ],
  },
  pantera: {
    slug: "pantera",
    name: "Pantera",
    formed: 1981,
    origin: "Arlington, Texas, USA",
    genres: ["groove-metal", "thrash-metal", "heavy-metal"],
    status: "active",
    metaTitle: "Pantera - Vinnie Paul & Charlie Benante Drummer History | MetalForge",
    metaDescription: "Complete history of Pantera drummers from Vinnie Paul to Charlie Benante.",
    summary: "Pantera, formed in 1981, defined groove metal with Vinnie Paul's powerful drumming.",
    keywords: ["pantera", "vinnie paul", "charlie benante", "groove metal", "drummer gear"],
    drummerHistory: [
      { drummer: "vinnie-paul", period: "1981-2003", notes: "Co-founder with brother Dimebag Darrell" },
      { drummer: "charlie-benante", period: "2022-present", notes: "Anthrax drummer filling in for reunion" }
    ],
    relatedBands: ["damageplan", "hellyeah", "anthrax"],
    sameAs: [
      "https://en.wikipedia.org/wiki/Pantera",
      "https://www.discogs.com/artist/81780-Pantera",
      "https://musicbrainz.org/artist/eb11dd1b-83ff-4e0e-9f0f-e78ad639a5d3",
      "https://www.wikidata.org/wiki/Q334382"
    ],
  },
  anthrax: {
    slug: "anthrax",
    name: "Anthrax",
    formed: 1981,
    origin: "New York City, USA",
    genres: ["thrash-metal", "speed-metal"],
    status: "active",
    metaTitle: "Anthrax - Charlie Benante Drummer Profile & Gear | MetalForge",
    metaDescription: "Discover Charlie Benante's pioneering thrash drumming with Anthrax.",
    summary: "Anthrax, formed in 1981, is one of the Big Four of thrash metal.",
    keywords: ["anthrax", "charlie benante", "thrash metal", "big four", "drummer gear"],
    drummerHistory: [{ drummer: "charlie-benante", period: "1983-present", notes: "Joined shortly after formation" }],
    relatedBands: ["metallica", "slayer", "megadeth", "pantera"],
    sameAs: [
      "https://en.wikipedia.org/wiki/Anthrax_(American_band)",
      "https://www.discogs.com/artist/79761-Anthrax",
      "https://musicbrainz.org/artist/f5511464-5e72-415c-8336-0e5f31e36633",
      "https://www.wikidata.org/wiki/Q188836"
    ],
  },
};

export function getBand(slug) { return bands[slug] || null; }
export function getAllBandSlugs() { return Object.keys(bands); }
export function getAllBands() { return Object.values(bands); }
export function hasBand(slug) { return slug in bands; }
export function hasFaq(slug) { const band = bands[slug]; return band && Array.isArray(band.faq) && band.faq.length > 0; }
export function getBandFaq(slug) { const band = bands[slug]; return band?.faq || null; }

/**
 * Get bands for a drummer based on their slug
 * @param {string} drummerSlug - The drummer's slug (e.g., "lars-ulrich")
 * @returns {Array} Array of band data objects
 */
export function getBandsForDrummer(drummerSlug) {
  return Object.values(bands).filter(band => 
    band.drummerHistory?.some(h => h.drummer === drummerSlug)
  );
}

/**
 * Generate MusicGroup JSON-LD schema for a band
 * Issue #429: Added for enhanced SEO entity recognition
 * @param {Object} band - Band data object
 * @returns {Object} MusicGroup schema object
 */
export function generateMusicGroupSchema(band) {
  if (!band) return null;
  
  const schema = {
    "@type": "MusicGroup",
    "@id": `https://metalforge.io/bands/${band.slug}#band`,
    "name": band.name,
    "url": `https://metalforge.io/bands/${band.slug}`,
  };
  
  // Add founding date if available
  if (band.formed) {
    schema.foundingDate = String(band.formed);
  }
  
  // Add origin location
  if (band.origin) {
    schema.foundingLocation = {
      "@type": "Place",
      "name": band.origin
    };
  }
  
  // Add genres (convert slug format to readable)
  if (band.genres && band.genres.length > 0) {
    schema.genre = band.genres.map(g => 
      g.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    );
  }
  
  // Add sameAs links for entity disambiguation
  if (band.sameAs && band.sameAs.length > 0) {
    schema.sameAs = band.sameAs;
  }
  
  // Add description
  if (band.summary) {
    schema.description = band.summary;
  }
  
  return schema;
}

/**
 * Generate MusicGroup schema from drummer data (fallback when band data not available)
 * Issue #429: Enhanced schema generation for drummers without full band data
 * @param {Object} drummer - Drummer data object with band and genre fields
 * @returns {Object} MusicGroup schema object
 */
export function generateMusicGroupSchemaFromDrummer(drummer) {
  if (!drummer || !drummer.band) return null;
  
  // Generate slug from band name
  const bandSlug = drummer.band.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
  
  // Check if we have full band data
  const bandData = getBand(bandSlug);
  if (bandData) {
    return generateMusicGroupSchema(bandData);
  }
  
  // Fallback: generate basic schema from drummer data
  const schema = {
    "@type": "MusicGroup",
    "@id": `https://metalforge.io/bands/${bandSlug}#band`,
    "name": drummer.band,
  };
  
  // Add genre from drummer data
  if (drummer.genre) {
    // Handle multiple genres separated by slashes
    const genres = drummer.genre.split(/\s*[\/,]\s*/).map(g => g.trim());
    schema.genre = genres;
  }
  
  // Generate basic sameAs links (Wikipedia-based fallback)
  const wikiSlug = drummer.band.replace(/\s+/g, '_');
  schema.sameAs = [
    `https://en.wikipedia.org/wiki/${encodeURIComponent(wikiSlug)}`
  ];
  
  return schema;
}

export default bands;
