/**
 * Band data structure for MetalForge
 * Contains band information with drummer history
 * Combined data from multiple PRs (#352, #360, #349, #361)
 */

export const bands = {
  metallica: {
    slug: "metallica",
    name: "Metallica",
    formed: 1981,
    origin: "Los Angeles, California, USA",
    genres: ["thrash-metal", "heavy-metal", "hard-rock"],
    status: "active",

    // SEO fields
    metaTitle: "Metallica - Drummer History, Gear & Legacy | MetalForge",
    metaDescription:
      "Explore Metallica's drumming legacy with Lars Ulrich. Discover his complete gear setup, drumming style, and evolution from thrash pioneers to metal legends. The Big Four of Thrash.",
    summary:
      "Metallica, formed in 1981 in Los Angeles, is one of the most influential and commercially successful heavy metal bands in history. Co-founded by drummer Lars Ulrich and guitarist/vocalist James Hetfield, the band pioneered thrash metal alongside Slayer, Megadeth, and Anthrax—collectively known as the 'Big Four.' Metallica has sold over 125 million albums worldwide, won 9 Grammy Awards, and been inducted into the Rock and Roll Hall of Fame.",
    keywords: [
      "metallica",
      "lars ulrich",
      "james hetfield",
      "thrash metal",
      "big four thrash",
      "metal drums",
      "drummer gear",
      "master of puppets",
      "black album",
      "rock hall of fame",
    ],

    // Extended bio/history
    bio: {
      formation: `Metallica was formed in Los Angeles, California in October 1981 when Danish drummer Lars Ulrich placed a classified ad in a local newspaper seeking musicians to form a metal band. Guitarist and vocalist James Hetfield responded, and the two became the core of what would become one of the most important bands in heavy metal history.`,
      earlyYears: `After cycling through several early members including Dave Mustaine (who would later form Megadeth), the classic lineup solidified with Kirk Hammett on lead guitar and Cliff Burton on bass. This lineup recorded the first three albums: "Kill 'Em All" (1983), "Ride the Lightning" (1984), and "Master of Puppets" (1986).`,
      tragedy: `On September 27, 1986, during a European tour supporting "Master of Puppets," the band's tour bus crashed in Sweden. Bassist Cliff Burton was killed at age 24.`,
      mainstreamBreakthrough: `The self-titled 1991 album (commonly called "The Black Album") represented a deliberate shift toward more accessible songwriting while maintaining heavy riffs. It has sold over 16 million copies in the US alone.`,
      modernEra: `After the departure of Jason Newsted in 2001, Metallica returned with "St. Anger" (2003), "Death Magnetic" (2008), "Hardwired...to Self-Destruct" (2016), and "72 Seasons" (2023). Robert Trujillo has been their bassist since 2003.`,
    },

    // Drummer history with detailed info
    drummerHistory: [
      {
        drummer: "lars-ulrich",
        drummerId: 1,
        name: "Lars Ulrich",
        period: "1981-present",
        notes: "Co-founder, primary drummer, band spokesman",
        birthDate: "1963-12-26",
        birthPlace: "Gentofte, Denmark",
        highlights: [
          "Co-founded Metallica with James Hetfield in 1981",
          "First Danish-born musician inducted into Rock Hall of Fame (2009)",
          "Pioneer of thrash metal drumming style",
        ],
        gear: {
          current: {
            drums: "Tama Starclassic Maple",
            snare: "Tama LU1465 Signature (14x6.5 Steel)",
            cymbals: "Zildjian A Custom series",
            hardware: "Tama Iron Cobra 900 Power Glide",
            sticks: "Ahead Lars Ulrich Signature (Aluminum)",
            heads: "Remo Emperor/Ambassador",
          },
        },
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
          "72 Seasons (2023)",
        ],
      },
    ],

    // Discography highlights
    discography: [
      {
        title: "Kill 'Em All",
        year: 1983,
        certification: "3x Platinum (US)",
        notes: "Debut album, established thrash metal template",
      },
      {
        title: "Master of Puppets",
        year: 1986,
        certification: "6x Platinum (US)",
        notes: "Widely considered one of greatest metal albums ever",
      },
      {
        title: "Metallica (The Black Album)",
        year: 1991,
        certification: "16x Platinum (US)",
        notes: "Best-selling album, mainstream breakthrough",
      },
      {
        title: "72 Seasons",
        year: 2023,
        certification: "Gold (US)",
        notes: "Eleventh studio album",
      },
    ],

    // Notable achievements
    achievements: [
      {
        category: "Sales",
        items: [
          "Over 125 million albums sold worldwide",
          "The Black Album: 16x Platinum in US",
        ],
      },
      {
        category: "Awards",
        items: [
          "9 Grammy Awards (23 nominations)",
          "Rock and Roll Hall of Fame inductees (2009)",
        ],
      },
    ],

    // FAQ Schema data
    faq: [
      {
        question: "Who is the drummer of Metallica?",
        answer:
          "Lars Ulrich has been the drummer and co-founder of Metallica since the band formed in 1981.",
      },
      {
        question: "What drum kit does Lars Ulrich use?",
        answer:
          "Lars Ulrich uses Tama Starclassic Maple drums with his signature Tama LU1465 steel snare drum.",
      },
      {
        question: "What is the Big Four of thrash metal?",
        answer:
          "The Big Four of thrash metal refers to Metallica, Slayer, Megadeth, and Anthrax.",
      },
      {
        question: "How many albums has Metallica sold?",
        answer:
          "Metallica has sold over 125 million albums worldwide.",
      },
    ],

    relatedBands: ["slayer", "megadeth", "anthrax", "pantera", "slipknot", "sepultura"],
    drummerIds: [1],
    associatedBrands: ["Tama", "Zildjian", "Ahead", "Remo"],

    links: {
      official: "https://www.metallica.com",
      wikipedia: "https://en.wikipedia.org/wiki/Metallica",
      instagram: "https://www.instagram.com/metallica",
      twitter: "https://twitter.com/Metallica",
    },
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
      "Explore Slipknot's legendary drumming legacy from Joey Jordison to Jay Weinberg to Eloy Casagrande.",
    summary:
      "Slipknot, formed in 1995 in Des Moines, Iowa, revolutionized heavy metal with their aggressive sound and theatrical masks.",
    keywords: [
      "slipknot",
      "joey jordison",
      "jay weinberg",
      "eloy casagrande",
      "nu metal",
    ],

    history: {
      formation:
        "Slipknot was formed in Des Moines, Iowa in 1995 by percussionist Shawn Crahan, drummer Joey Jordison, and bassist Paul Gray.",
      breakthrough:
        "Their self-titled debut album (1999) went platinum within months.",
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
      "Explore Sepultura's complete drummer history from Igor Cavalera to Eloy Casagrande.",
    summary:
      "Sepultura is a Brazilian heavy metal band formed in 1984. One of the most influential bands from South America.",
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
      "Explore Dream Theater's complete drummer history featuring Mike Portnoy and Mike Mangini.",
    summary:
      "Dream Theater is an American progressive metal band formed in 1985 in Boston. Known for their technical proficiency.",
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

  death: {
    slug: "death",
    name: "Death",
    formed: 1984,
    disbanded: 2001,
    origin: "Altamonte Springs, Florida, USA",
    genres: ["death-metal", "progressive-death-metal", "technical-death-metal"],
    status: "disbanded",

    metaTitle: "Death - Pioneers of Death Metal | Drummer History & Legacy | MetalForge",
    metaDescription:
      "Discover Death, the pioneering death metal band founded by Chuck Schuldiner. Explore their legendary drummers including Sean Reinert, Gene Hoglan, and Richard Christy.",
    summary:
      "Death, formed in 1984 by Chuck Schuldiner, is widely credited as one of the founding bands of the death metal genre.",
    keywords: [
      "death",
      "death metal",
      "chuck schuldiner",
      "sean reinert",
      "gene hoglan",
      "richard christy",
      "technical death metal",
      "florida death metal",
    ],

    history: {
      overview:
        "Death is one of the most important bands in extreme metal. Founded by Chuck Schuldiner in 1984, the band pioneered death metal across seven studio albums.",
      legacy:
        "Death helped establish death metal and pushed boundaries with progressive compositions. Chuck Schuldiner passed away December 13, 2001, from brain cancer at age 34.",
    },

    achievements: [
      "Pioneers of the death metal genre",
      "Seven studio albums (1987-1998)",
      "Influenced countless bands across death metal",
    ],

    discography: [
      { album: "Scream Bloody Gore", year: 1987, drummer: "chris-reifert", note: "First true death metal album" },
      { album: "Leprosy", year: 1988, drummer: "bill-andrews" },
      { album: "Spiritual Healing", year: 1990, drummer: "bill-andrews" },
      { album: "Human", year: 1991, drummer: "sean-reinert", note: "Landmark progressive death metal" },
      { album: "Individual Thought Patterns", year: 1993, drummer: "gene-hoglan", note: "Technical masterpiece" },
      { album: "Symbolic", year: 1995, drummer: "gene-hoglan", note: "Magnum opus" },
      { album: "The Sound of Perseverance", year: 1998, drummer: "richard-christy", note: "Final album" },
    ],

    drummerHistory: [
      { drummer: "kam-lee", name: "Kam Lee", period: "1984-1985", albums: [], notes: "Original drummer" },
      { drummer: "chris-reifert", name: "Chris Reifert", period: "1986-1987", albums: ["Scream Bloody Gore"], notes: "Later founded Autopsy" },
      { drummer: "bill-andrews", name: "Bill Andrews", period: "1987-1990", albums: ["Leprosy", "Spiritual Healing"], notes: "Technical precision" },
      { drummer: "sean-reinert", name: "Sean Reinert", period: "1991-1992", albums: ["Human"], notes: "Jazz-influenced, later formed Cynic" },
      { drummer: "gene-hoglan", name: "Gene Hoglan", period: "1993-1995", albums: ["Individual Thought Patterns", "Symbolic"], notes: "The Atomic Clock" },
      { drummer: "richard-christy", name: "Richard Christy", period: "1996-2001", albums: ["The Sound of Perseverance"], notes: "Final Death drummer" },
    ],

    relatedBands: ["cynic", "atheist", "pestilence", "obituary", "morbid-angel", "autopsy", "control-denied"],

    faq: [
      { question: "Who founded Death?", answer: "Death was founded by Chuck Schuldiner in 1984 in Florida." },
      { question: "Why is Death considered pioneers of death metal?", answer: "Their 1987 debut Scream Bloody Gore is widely regarded as one of the first true death metal albums." },
      { question: "Who were the drummers in Death?", answer: "Kam Lee, Chris Reifert, Bill Andrews, Sean Reinert, Gene Hoglan, and Richard Christy." },
      { question: "What happened to Chuck Schuldiner?", answer: "Chuck passed away December 13, 2001, from brain cancer at age 34." },
      { question: "What is Death's best album?", answer: "Symbolic (1995) and Human (1991) are often cited as Death's greatest albums." },
    ],
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
