/**
 * Band data structure for MetalForge
 * Contains band information with drummer history
 * Combined data from multiple PRs
 */

export const bands = {
  metallica: {
    slug: "metallica",
    name: "Metallica",
    formed: 1981,
    origin: "Los Angeles, California, USA",
    genres: ["thrash-metal", "heavy-metal"],
    status: "active",

    // SEO fields
    metaTitle: "Metallica - Drummer History & Gear | MetalForge",
    metaDescription:
      "Explore Metallica's drumming legacy with Lars Ulrich. Discover his complete gear setup, drumming style, and evolution from thrash pioneers to metal legends.",
    summary:
      "Metallica, formed in 1981 in Los Angeles, is one of the most influential thrash metal bands in history. Co-founded by drummer Lars Ulrich, the band has sold over 125 million albums worldwide.",
    keywords: [
      "metallica",
      "lars ulrich",
      "thrash metal",
      "metal drums",
      "drummer gear",
    ],

    // Drummer history
    drummerHistory: [
      {
        drummer: "lars-ulrich",
        drummerId: 1,
        period: "1981-present",
        notes: "Co-founder",
        albums: [
          "Kill 'Em All (1983)",
          "Ride the Lightning (1984)",
          "Master of Puppets (1986)",
          "...And Justice for All (1988)",
          "Metallica (1991)",
          "Load (1996)",
          "ReLoad (1997)",
          "St. Anger (2003)",
          "Death Magnetic (2008)",
          "Hardwired... to Self-Destruct (2016)",
          "72 Seasons (2023)"
        ],
      },
    ],

    // Related
    relatedBands: ["slayer", "megadeth", "anthrax"],

    // FAQ
    faq: [
      {
        q: "Who is Metallica's drummer?",
        a: "Lars Ulrich, co-founder since 1981.",
      },
      {
        q: "Has Metallica had other drummers?",
        a: "No, Lars is the only drummer in their history.",
      },
      {
        q: "What drums does Lars Ulrich play?",
        a: "Tama Starclassic with LU1465 signature snare.",
      },
    ],

    sameAs: [
      "https://en.wikipedia.org/wiki/Metallica",
      "https://www.metallica.com/",
      "https://www.instagram.com/metallica/",
      "https://twitter.com/Metallica",
    ],
    drummerIds: [1],
    associatedBrands: ["Tama", "Zildjian", "Ahead", "Remo"],
  },

  slayer: {
    slug: "slayer",
    name: "Slayer",
    formed: 1981,
    origin: "Huntington Park, California, USA",
    genres: ["thrash-metal", "speed-metal"],
    status: "disbanded",

    metaTitle: "Slayer Drummer History - Lombardo & Bostaph | MetalForge",
    metaDescription:
      "Slayer drummer history: Dave Lombardo and Paul Bostaph. Reign in Blood legacy.",
    summary: "Slayer formed 1981, Big Four of thrash, disbanded 2019.",
    keywords: ["slayer", "dave lombardo", "reign in blood", "thrash metal"],

    drummerHistory: [
      {
        drummer: "dave-lombardo",
        period: "1981-1992",
        notes: "Founding member, first tenure",
      },
      {
        drummer: "paul-bostaph",
        period: "1992-2001",
        notes: "",
      },
      {
        drummer: "dave-lombardo",
        period: "2001-2013",
        notes: "Second tenure",
      },
      {
        drummer: "paul-bostaph",
        period: "2013-2019",
        notes: "Final drummer",
      },
    ],

    relatedBands: ["metallica", "megadeth", "anthrax", "fantomas"],

    faq: [
      {
        q: "Who was Slayer's drummer?",
        a: "Dave Lombardo (founding) and Paul Bostaph alternated.",
      },
      {
        q: "Why did Dave Lombardo leave Slayer?",
        a: "Financial disputes, twice (1992 and 2013).",
      },
      {
        q: "Is Slayer still together?",
        a: "No, they disbanded after final tour in 2019.",
      },
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
    metaDescription:
      "Explore Slipknot's legendary drumming legacy from Joey Jordison to Jay Weinberg to Eloy Casagrande. Discover complete gear setups, drumming styles, and the evolution of one of metal's most iconic bands.",
    summary:
      "Slipknot, formed in 1995 in Des Moines, Iowa, revolutionized heavy metal with their aggressive sound, theatrical masks, and nine-member lineup. Known for intense drumming and chaotic live shows, they've sold over 30 million albums worldwide and won a Grammy Award.",
    keywords: [
      "slipknot",
      "joey jordison",
      "jay weinberg",
      "eloy casagrande",
      "nu metal",
      "metal drums",
    ],

    history: {
      formation:
        "Slipknot was formed in Des Moines, Iowa in 1995 by percussionist Shawn Crahan, drummer Joey Jordison, and bassist Paul Gray.",
      breakthrough:
        "Their self-titled debut album (1999) went platinum within months, driven by singles 'Wait and Bleed' and '(sic)'.",
      evolution:
        "The band's sophomore album 'Iowa' (2001) is considered one of the heaviest albums ever recorded.",
      tragedy:
        "Bassist Paul Gray passed away in 2010, and founding drummer Joey Jordison was dismissed in 2013. Joey passed away in 2021.",
      modernEra:
        "Jay Weinberg joined as drummer in 2014. In 2023, Jay departed and was replaced by Eloy Casagrande in 2024.",
    },

    drummerHistory: [
      {
        drummer: "joey-jordison",
        drummerId: 2,
        period: "1995-2013",
        notes: "Founding member. Defined Slipknot's drumming style.",
        albums: ["Slipknot", "Iowa", "Vol. 3", "All Hope Is Gone"],
      },
      {
        drummer: "jay-weinberg",
        drummerId: 13,
        period: "2014-2023",
        notes: "Son of E Street Band's Max Weinberg.",
        albums: [".5: The Gray Chapter", "We Are Not Your Kind", "The End, So Far"],
      },
      {
        drummer: "eloy-casagrande",
        drummerId: 10,
        period: "2024-present",
        notes: "Former Sepultura drummer.",
        albums: [],
      },
    ],

    faq: [
      {
        question: "Who is Slipknot's current drummer?",
        answer: "As of 2024, Slipknot's drummer is Eloy Casagrande, formerly of Sepultura.",
      },
      {
        question: "Who was Slipknot's original drummer?",
        answer: "Joey Jordison was Slipknot's founding drummer from 1995 to 2013.",
      },
      {
        question: "How many drummers has Slipknot had?",
        answer: "Slipknot has had three main drummers: Joey Jordison, Jay Weinberg, and Eloy Casagrande.",
      },
    ],

    relatedBands: ["korn", "mudvayne", "mushroomhead", "stone-sour", "sepultura"],
  },

  sepultura: {
    slug: "sepultura",
    name: "Sepultura",
    formed: 1984,
    origin: "Belo Horizonte, Minas Gerais, Brazil",
    genres: ["thrash-metal", "groove-metal", "death-metal"],
    status: "active",

    metaTitle: "Sepultura Drummer History & Gear | MetalForge",
    metaDescription:
      "Explore Sepultura's complete drummer history from Igor Cavalera to Eloy Casagrande. Discover the drum kits and gear used by Brazil's legendary thrash metal pioneers.",
    summary:
      "Sepultura is a Brazilian heavy metal band formed in 1984 in Belo Horizonte. They are considered one of the most influential bands to emerge from South America.",
    keywords: [
      "sepultura",
      "thrash metal",
      "brazilian metal",
      "igor cavalera",
      "eloy casagrande",
      "roots",
    ],

    drummerHistory: [
      {
        drummer: "igor-cavalera",
        drummerId: null,
        period: "1984-2006",
        albums: [
          "Morbid Visions (1986)",
          "Schizophrenia (1987)",
          "Beneath the Remains (1989)",
          "Arise (1991)",
          "Chaos A.D. (1993)",
          "Roots (1996)",
        ],
        notes: "Co-founder and original drummer.",
      },
      {
        drummer: "jean-dolabella",
        drummerId: null,
        period: "2006-2011",
        albums: ["A-Lex (2009)"],
        notes: "Brazilian drummer with a more technical approach.",
      },
      {
        drummer: "eloy-casagrande",
        drummerId: 7,
        period: "2011-2024",
        albums: ["Kairos (2011)", "Machine Messiah (2017)", "Quadra (2020)"],
        notes: "Left in 2024 to join Slipknot.",
      },
      {
        drummer: "greyson-nekrutman",
        drummerId: null,
        period: "2024-present",
        albums: [],
        notes: "Current touring drummer for the farewell tour.",
      },
    ],

    relatedBands: ["soulfly", "cavalera-conspiracy", "slipknot"],
    drummerIds: [7],
    associatedBrands: ["Tama", "Paiste", "Promark", "Evans"],
  },

  "dream-theater": {
    slug: "dream-theater",
    name: "Dream Theater",
    formed: 1985,
    origin: "Boston, Massachusetts, USA",
    genres: ["progressive-metal"],
    status: "active",

    metaTitle: "Dream Theater Drummer History & Gear | MetalForge",
    metaDescription:
      "Explore Dream Theater's complete drummer history featuring Mike Portnoy and Mike Mangini. Discover the gear used by progressive metal's most technical drummers.",
    summary:
      "Dream Theater is an American progressive metal band formed in 1985 in Boston. Known for their technical proficiency and complex compositions.",
    keywords: [
      "dream theater",
      "progressive metal",
      "mike portnoy",
      "mike mangini",
      "prog metal",
    ],

    drummerHistory: [
      {
        drummer: "mike-portnoy",
        drummerId: 13,
        period: "1985-2010, 2023-present",
        albums: [
          "When Dream and Day Unite (1989)",
          "Images and Words (1992)",
          "Awake (1994)",
          "Metropolis Pt. 2: Scenes from a Memory (1999)",
          "Parasomnia (2025)",
        ],
        notes: "Co-founder and original drummer. Left in 2010, rejoined in 2023.",
      },
      {
        drummer: "mike-mangini",
        drummerId: 52,
        period: "2010-2023",
        albums: [
          "A Dramatic Turn of Events (2011)",
          "Dream Theater (2013)",
          "Distance over Time (2019)",
        ],
        notes: "Selected through a competitive audition process.",
      },
    ],

    relatedBands: ["liquid-tension-experiment", "transatlantic", "sons-of-apollo"],
    drummerIds: [13, 52],
    associatedBrands: ["Tama", "Pearl", "Sabian", "Vic Firth"],
  },
};

// Alias for backward compatibility
export const BANDS = bands;

/**
 * Get a band by its slug
 * @param {string} slug - The band's URL slug
 * @returns {object|null} The band object or null if not found
 */
export function getBand(slug) {
  return bands[slug] || null;
}

// Alias for getBand
export function getBandBySlug(slug) {
  return getBand(slug);
}

/**
 * Get all bands as array
 * @returns {object[]} Array of all band objects
 */
export function getAllBands() {
  return Object.values(bands);
}

/**
 * Get all band slugs
 * @returns {string[]} Array of all band slugs
 */
export function getAllBandSlugs() {
  return Object.keys(bands);
}

/**
 * Check if a band exists
 * @param {string} slug - The band's URL slug
 * @returns {boolean} True if the band exists
 */
export function hasBand(slug) {
  return slug in bands;
}

/**
 * Check if a band has FAQ data
 * @param {string} slug - The band's URL slug
 * @returns {boolean} True if the band has FAQ entries
 */
export function hasFaq(slug) {
  const band = bands[slug];
  return band && Array.isArray(band.faq) && band.faq.length > 0;
}

/**
 * Get FAQ data for a band
 * @param {string} slug - The band's URL slug
 * @returns {Array|null} FAQ array or null if not found
 */
export function getBandFaq(slug) {
  const band = bands[slug];
  return band?.faq || null;
}

/**
 * Get bands for a specific drummer ID
 * @param {number} drummerId - The drummer's ID
 * @returns {object[]} Array of bands featuring that drummer
 */
export function getBandsForDrummer(drummerId) {
  return Object.values(bands).filter(
    (band) => band.drummerIds && band.drummerIds.includes(drummerId)
  );
}

/**
 * Get drummer history for a band
 * @param {string} bandSlug - The band's URL slug
 * @returns {Array} Drummer history array
 */
export function getDrummerHistory(bandSlug) {
  const band = bands[bandSlug];
  return band ? band.drummerHistory : [];
}

/**
 * Search bands by keyword
 * @param {string} query - Search query
 * @returns {object[]} Matching bands
 */
export function searchBands(query) {
  if (!query) return [];
  const q = query.toLowerCase();
  return Object.values(bands).filter(
    (band) =>
      band.name.toLowerCase().includes(q) ||
      (band.keywords && band.keywords.some((kw) => kw.includes(q))) ||
      band.genres.some((g) => g.toLowerCase().includes(q))
  );
}

export default bands;
