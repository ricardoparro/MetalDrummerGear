/**
 * Band data structure for MetalForge
 * Contains band information with drummer history
 * Issue #359: Added Sepultura band data
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
  },

  // Issue #359: Sepultura - Brazilian Thrash Pioneers
  sepultura: {
    slug: "sepultura",
    name: "Sepultura",
    formed: 1984,
    origin: "Belo Horizonte, Brazil",
    genres: ["thrash-metal", "groove-metal", "death-metal"],
    status: "disbanded", // farewell tour 2023-2024

    // SEO fields
    metaTitle: "Sepultura Drummer History - Igor to Eloy | MetalForge",
    metaDescription:
      "Complete Sepultura drummer history from Igor Cavalera to Eloy Casagrande.",
    summary:
      "Sepultura formed 1984, Brazilian thrash pioneers, disbanded 2024.",
    keywords: [
      "sepultura",
      "igor cavalera",
      "eloy casagrande",
      "brazilian metal",
    ],

    // Drummer history
    drummerHistory: [
      {
        drummer: "igor-cavalera",
        period: "1984-2006",
        notes: "Co-founder with brother Max",
      },
      {
        drummer: "jean-dolabella",
        period: "2006-2011",
        notes: "",
      },
      {
        drummer: "eloy-casagrande",
        period: "2011-2024",
        notes: "Final drummer, now in Slipknot",
      },
    ],

    // Related
    relatedBands: ["soulfly", "cavalera-conspiracy", "slipknot"],

    // FAQ
    faq: [
      {
        q: "Is Sepultura still active?",
        a: "No, they completed a farewell tour in 2024.",
      },
      {
        q: "Who was Sepultura's last drummer?",
        a: "Eloy Casagrande (2011-2024), now in Slipknot.",
      },
      {
        q: "Why did Igor Cavalera leave?",
        a: "He left in 2006 due to conflicts with management.",
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
