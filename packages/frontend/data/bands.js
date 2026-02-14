/**
 * Band data structure for MetalForge
 * Contains band information with drummer history
 * Issue #360: Added Slayer band data
 */

export const bands = {
  metallica: {
    slug: "metallica",
    name: "Metallica",
    formed: 1981,
    origin: "Los Angeles, California, USA",
    genres: ["thrash-metal", "heavy-metal"],
    status: "active", // active | disbanded | hiatus

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
        period: "1981-present",
        notes: "Co-founder",
      },
    ],

    // Related
    relatedBands: ["slayer", "megadeth", "anthrax"],

    // FAQ - Issue #352
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
  },

  // Issue #360: Slayer - Big Four of Thrash
  slayer: {
    slug: "slayer",
    name: "Slayer",
    formed: 1981,
    origin: "Huntington Park, California, USA",
    genres: ["thrash-metal", "speed-metal"],
    status: "disbanded", // final tour 2019

    // SEO fields
    metaTitle: "Slayer Drummer History - Lombardo & Bostaph | MetalForge",
    metaDescription:
      "Slayer drummer history: Dave Lombardo and Paul Bostaph. Reign in Blood legacy.",
    summary:
      "Slayer formed 1981, Big Four of thrash, disbanded 2019.",
    keywords: ["slayer", "dave lombardo", "reign in blood", "thrash metal"],

    // Drummer history
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

    // Related
    relatedBands: ["metallica", "megadeth", "anthrax", "fantomas"],

    // FAQ
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
};

/**
 * Get a band by its slug
 * @param {string} slug - The band's URL slug
 * @returns {object|null} The band object or null if not found
 */
export function getBand(slug) {
  return bands[slug] || null;
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

export default bands;
