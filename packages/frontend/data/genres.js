/**
 * Genre data structure for MetalForge
 * Provides genre information for SEO landing pages
 * Issue #340: Genre Filter Landing Pages
 */

export const genres = {
  thrash: {
    slug: "thrash",
    name: "Thrash Metal",
    metaTitle: "Thrash Metal Drummers - Gear & Techniques | MetalForge",
    metaDescription:
      "Explore thrash metal's legendary drummers. From Lars Ulrich to Dave Lombardo, discover the gear and techniques that defined the genre.",
    summary:
      "Thrash metal emerged in the early 1980s, characterized by aggressive tempos, low-register guitar riffs, and shredding-style lead work. Drumming in thrash metal emphasizes speed, power, and precision.",
    keywords: ["thrash metal", "thrash drums", "speed metal", "big four"],
    relatedGenres: ["death", "groove", "hardcore"],
    characteristics: [
      "Fast double bass drumming",
      "Aggressive snare patterns",
      "Quick tempo changes",
      "Tight cymbal work",
    ],
  },

  death: {
    slug: "death",
    name: "Death Metal",
    metaTitle: "Death Metal Drummers - Gear & Techniques | MetalForge",
    metaDescription:
      "Explore death metal's most technical drummers. Discover the blast beats, gravity blasts, and extreme techniques that define the genre.",
    summary:
      "Death metal drumming pushes the boundaries of speed and technicality. Known for blast beats, gravity rolls, and complex polyrhythms.",
    keywords: ["death metal", "blast beats", "technical drums", "extreme metal"],
    relatedGenres: ["thrash", "black", "progressive"],
    characteristics: [
      "Blast beats",
      "Gravity blasts",
      "Technical patterns",
      "Extreme speed",
    ],
  },

  black: {
    slug: "black",
    name: "Black Metal",
    metaTitle: "Black Metal Drummers - Gear & Techniques | MetalForge",
    metaDescription:
      "Explore black metal's distinctive drumming style. From raw blast beats to atmospheric passages.",
    summary:
      "Black metal drumming ranges from raw, primitive blast beats to complex atmospheric patterns. Speed and atmosphere are key elements.",
    keywords: ["black metal", "blast beats", "atmospheric drums"],
    relatedGenres: ["death", "thrash"],
    characteristics: [
      "Raw production",
      "Continuous blast beats",
      "Atmospheric patterns",
      "Hypnotic repetition",
    ],
  },

  progressive: {
    slug: "progressive",
    name: "Progressive Metal",
    metaTitle: "Progressive Metal Drummers - Gear & Techniques | MetalForge",
    metaDescription:
      "Explore progressive metal's most skilled drummers. Complex time signatures, polyrhythms, and technical mastery.",
    summary:
      "Progressive metal drumming emphasizes technical proficiency, odd time signatures, and complex polyrhythms. Often features extended solos and intricate patterns.",
    keywords: ["prog metal", "odd time signatures", "polyrhythms", "technical drums"],
    relatedGenres: ["death", "nu-metal"],
    characteristics: [
      "Odd time signatures",
      "Complex polyrhythms",
      "Technical precision",
      "Dynamic range",
    ],
  },

  "nu-metal": {
    slug: "nu-metal",
    name: "Nu-Metal",
    metaTitle: "Nu-Metal Drummers - Gear & Techniques | MetalForge",
    metaDescription:
      "Explore nu-metal's groove-heavy drumming. From Slipknot to Korn, discover the drummers who defined the genre.",
    summary:
      "Nu-metal drumming combines heavy metal with hip-hop and funk influences. Features syncopated rhythms, heavy grooves, and creative percussion.",
    keywords: ["nu metal", "groove drums", "alternative metal"],
    relatedGenres: ["groove", "metalcore", "hardcore"],
    characteristics: [
      "Syncopated grooves",
      "Hip-hop influences",
      "Heavy toms",
      "Creative percussion",
    ],
  },

  groove: {
    slug: "groove",
    name: "Groove Metal",
    metaTitle: "Groove Metal Drummers - Gear & Techniques | MetalForge",
    metaDescription:
      "Explore groove metal's hard-hitting drummers. Mid-tempo power and headbang-worthy rhythms.",
    summary:
      "Groove metal drumming emphasizes mid-tempo, heavy rhythms designed for maximum impact. Power and groove take precedence over speed.",
    keywords: ["groove metal", "heavy drums", "mid-tempo metal"],
    relatedGenres: ["thrash", "nu-metal", "metalcore"],
    characteristics: [
      "Mid-tempo power",
      "Heavy snare hits",
      "Syncopated patterns",
      "Headbang-worthy grooves",
    ],
  },

  metalcore: {
    slug: "metalcore",
    name: "Metalcore/Djent",
    metaTitle: "Metalcore & Djent Drummers - Gear & Techniques | MetalForge",
    metaDescription:
      "Explore metalcore and djent drumming. Breakdowns, polyrhythms, and modern metal techniques.",
    summary:
      "Metalcore and djent drumming blends hardcore punk breakdowns with metal technicality. Features syncopated rhythms and complex patterns.",
    keywords: ["metalcore", "djent", "breakdowns", "polyrhythms"],
    relatedGenres: ["progressive", "groove", "hardcore"],
    characteristics: [
      "Breakdown sections",
      "Djent-style syncopation",
      "Technical fills",
      "Modern production",
    ],
  },

  hardcore: {
    slug: "hardcore",
    name: "Hardcore",
    metaTitle: "Hardcore Drummers - Gear & Techniques | MetalForge",
    metaDescription:
      "Explore hardcore's raw drumming energy. D-beats, blast beats, and punk-influenced metal drumming.",
    summary:
      "Hardcore drumming brings punk energy to metal. Features D-beats, blast beats, and aggressive, raw playing styles.",
    keywords: ["hardcore", "d-beats", "punk metal"],
    relatedGenres: ["thrash", "metalcore", "nu-metal"],
    characteristics: [
      "D-beat patterns",
      "Raw energy",
      "Punk influences",
      "Aggressive attack",
    ],
  },
};

// Alias for backward compatibility
export const GENRES = genres;

/**
 * Get a genre by its slug
 * @param {string} slug - The genre's URL slug
 * @returns {object|null} The genre object or null if not found
 */
export function getGenre(slug) {
  return genres[slug] || null;
}

/**
 * Get all genres as array
 * @returns {object[]} Array of all genre objects
 */
export function getAllGenres() {
  return Object.values(genres);
}

/**
 * Check if a genre exists
 * @param {string} slug - The genre's URL slug
 * @returns {boolean} True if the genre exists
 */
export function hasGenre(slug) {
  return slug in genres;
}

/**
 * Get all genre slugs
 * @returns {string[]} Array of all genre slugs
 */
export function getAllGenreSlugs() {
  return Object.keys(genres);
}

/**
 * Get drummers by genre (stub - would need drummers data)
 * @param {string} genreSlug - The genre's URL slug
 * @returns {object[]} Array of drummers in that genre
 */
export function getDrummersByGenre(genreSlug) {
  // This would need integration with drummers data
  // Returns empty array as stub
  return [];
}

/**
 * Get related genres for a genre
 * @param {string} genreSlug - The genre's URL slug
 * @returns {string[]} Array of related genre slugs
 */
export function getRelatedGenres(genreSlug) {
  const genre = genres[genreSlug];
  return genre?.relatedGenres || [];
}

export default genres;
