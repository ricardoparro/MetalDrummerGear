/**
 * Band data structure for MetalForge
 * Contains band information with drummer history
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

export default bands;
