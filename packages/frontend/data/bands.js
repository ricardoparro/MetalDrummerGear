/**
 * Band data structure for MetalForge
 * Contains band information with drummer history
 * Issue #357: Added Gojira band data
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
    relatedBands: ["slayer", "megadeth", "anthrax", "gojira"],
  },

  // Issue #357: Gojira band data
  gojira: {
    slug: "gojira",
    name: "Gojira",
    formed: 1996,
    origin: "Bayonne, France",
    genres: ["progressive-death-metal", "groove-metal", "technical-metal"],
    status: "active",

    // SEO fields
    metaTitle: "Gojira - Drummer History, Gear & Legacy | MetalForge",
    metaDescription:
      "Explore Gojira's powerful drumming legacy with Mario Duplantier. Discover the technical death metal pioneers' environmental activism, unique tribal drumming style, and complete gear setups.",
    summary:
      "Gojira, formed in 1996 in Bayonne, France (originally as Godzilla), is one of the most influential progressive death metal bands of the 21st century. Founded by brothers Joe (vocals/guitar) and Mario Duplantier (drums), the band is renowned for their technically complex yet groove-oriented sound, environmental activism, and Mario's powerful tribal-influenced drumming. Albums like 'From Mars to Sirius' (2005), 'Magma' (2016), and 'Fortitude' (2021) established them as modern metal leaders.",
    keywords: [
      "gojira",
      "mario duplantier",
      "joe duplantier",
      "progressive death metal",
      "french metal",
      "environmental metal",
      "flying whales",
      "technical metal drums",
      "tribal metal drumming",
      "amazonia",
      "magma",
      "fortitude",
    ],

    // Extended history
    history: {
      overview:
        "Gojira was formed in 1996 in Bayonne, in the Basque region of southwestern France, originally under the name Godzilla. Brothers Joe Duplantier (vocals/guitar) and Mario Duplantier (drums) founded the band with a vision to create technically proficient yet emotionally powerful metal. The band changed their name to Gojira (the Japanese name for Godzilla) in 2001 due to trademark issues.",
      musicalEvolution:
        "Throughout the early 2000s, Gojira developed their unique sound—a blend of death metal heaviness, progressive complexity, and groove-oriented rhythms. Mario Duplantier's drumming incorporated tribal elements and polyrhythmic patterns that would become the band's signature. The breakthrough came with 'From Mars to Sirius' (2005), featuring the now-legendary track 'Flying Whales.'",
      environmentalActivism:
        "Gojira has become one of metal's most environmentally conscious bands. They have partnered with Sea Shepherd Conservation Society and the Rainforest Foundation. In 2021, they released 'Amazonia,' with all proceeds going to The Articulation of Indigenous Peoples of Brazil to protect the Amazon rainforest.",
      legacy:
        "Today, Gojira stands as one of metal's most respected and successful bands. They have headlined major festivals including Download, Hellfest, and Rock am Ring, and have supported Metallica on multiple world tours.",
    },

    // Drummer history
    drummerHistory: [
      {
        drummer: "mario-duplantier",
        name: "Mario Duplantier",
        period: "1996-present",
        albums: ["Terra Incognita", "The Link", "From Mars to Sirius", "The Way of All Flesh", "L'Enfant Sauvage", "Magma", "Fortitude"],
        notes: "Co-founder, visual artist for all album artwork. Uses dual bass drums for visual and tonal impact",
      },
    ],

    // Discography highlights
    discography: [
      { album: "Terra Incognita", year: 2001, significance: "Debut album as Gojira" },
      { album: "The Link", year: 2003, significance: "Established signature sound" },
      { album: "From Mars to Sirius", year: 2005, significance: "International breakthrough, 'Flying Whales'" },
      { album: "The Way of All Flesh", year: 2008, significance: "Critical acclaim, philosophical themes" },
      { album: "L'Enfant Sauvage", year: 2012, significance: "First Grammy nomination" },
      { album: "Magma", year: 2016, significance: "#1 Billboard Hard Rock, mainstream breakthrough" },
      { album: "Fortitude", year: 2021, significance: "Grammy-nominated, environmental themes" },
    ],

    // Notable achievements
    achievements: [
      "Multiple Grammy nominations including Best Metal Performance",
      "Billboard Hard Rock Album #1 with 'Magma' (2016)",
      "'Flying Whales' became one of the most iconic metal songs of the 2000s",
      "Partnership with Sea Shepherd and Rainforest Foundation",
      "Pioneered French metal's international recognition",
      "Known for unique 'pick scrape' guitar technique and tribal drumming",
      "Headlined Download, Hellfest, Rock am Ring festivals",
      "Supported Metallica on multiple world tours",
    ],

    // Related bands
    relatedBands: ["meshuggah", "mastodon", "opeth", "sepultura", "death", "metallica"],

    // FAQ schema for SEO
    faq: [
      {
        question: "Who is Gojira's drummer?",
        answer: "Mario Duplantier has been Gojira's drummer since the band's formation in 1996. He co-founded the band with his brother Joe Duplantier and is also the visual artist behind all of Gojira's album artwork and merchandise.",
      },
      {
        question: "What drum kit does Mario Duplantier use?",
        answer: "Mario Duplantier uses Tama Starclassic Bubinga drums with dual 22x18\" bass drums. He plays a Tama S.L.P. G-Maple snare, Zildjian K and A Custom cymbals, Tama Iron Cobra 900 Power Glide pedals, and his signature Tama sticks.",
      },
      {
        question: "Why is Gojira known for environmental activism?",
        answer: "Gojira has partnered with Sea Shepherd and the Rainforest Foundation, released 'Amazonia' to raise funds for Amazon protection, and incorporates environmental themes throughout their music, especially on 'From Mars to Sirius' and 'Fortitude.'",
      },
      {
        question: "What is Gojira's most famous song?",
        answer: "'Flying Whales' from 'From Mars to Sirius' (2005) is widely considered Gojira's most iconic song, featuring Mario Duplantier's powerful tribal drumming and environmental themes about whale conservation.",
      },
      {
        question: "What makes Mario Duplantier's drumming unique?",
        answer: "Mario Duplantier's drumming combines crushing power with tribal rhythmic elements, polyrhythmic complexity, and exceptional dynamic control. He uses dual bass drums for both visual and tonal impact.",
      },
      {
        question: "Where is Gojira from?",
        answer: "Gojira is from Bayonne, in the Basque region of southwestern France. The Duplantier brothers formed the band there in 1996, originally as Godzilla before changing to Gojira in 2001.",
      },
      {
        question: "What does 'Gojira' mean?",
        answer: "Gojira is the Japanese name for Godzilla. The band changed their name from Godzilla to Gojira in 2001 due to trademark issues.",
      },
      {
        question: "Has Gojira won a Grammy?",
        answer: "While Gojira has received multiple Grammy nominations including Best Metal Performance, they have not yet won a Grammy as of 2024. They remain one of the most nominated metal bands of recent years.",
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

export default bands;
