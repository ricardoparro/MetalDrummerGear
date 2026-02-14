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

  slipknot: {
    slug: "slipknot",
    name: "Slipknot",
    formed: 1995,
    origin: "Des Moines, Iowa, USA",
    genres: ["nu-metal", "alternative-metal", "heavy-metal"],
    status: "active",

    // SEO fields
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
      "drummer gear",
      "iowa",
      "maggots",
    ],

    // Extended band bio/history
    history: {
      formation:
        "Slipknot was formed in Des Moines, Iowa in 1995 by percussionist Shawn Crahan, drummer Joey Jordison, and bassist Paul Gray. The band evolved from earlier projects including The Pale Ones and Meld.",
      breakthrough:
        "Their self-titled debut album (1999) went platinum within months, driven by singles 'Wait and Bleed' and '(sic)'. The album introduced their signature sound: aggressive vocals, dual percussionists, sampling, and a DJ.",
      evolution:
        "The band's sophomore album 'Iowa' (2001) is considered one of the heaviest albums ever recorded. They continued to evolve through 'Vol. 3: (The Subliminal Verses)' (2004), which showed more melodic elements while maintaining their intensity.",
      tragedy:
        "The band faced significant losses: bassist Paul Gray passed away in 2010, and founding drummer Joey Jordison was dismissed in 2013, later revealed to be due to transverse myelitis. Joey passed away in 2021.",
      modernEra:
        "Jay Weinberg joined as drummer in 2014, contributing to '.5: The Gray Chapter', 'We Are Not Your Kind', and 'The End, So Far'. In 2023, Jay departed and was replaced by Eloy Casagrande (formerly of Sepultura) in 2024.",
    },

    // Notable achievements
    achievements: [
      {
        year: 2006,
        achievement: "Grammy Award for Best Metal Performance ('Before I Forget')",
      },
      {
        year: 1999,
        achievement: "Self-titled album certified 2x Platinum (US)",
      },
      {
        year: 2001,
        achievement: "'Iowa' debuted at #3 on Billboard 200",
      },
      {
        year: 2004,
        achievement: "'Vol. 3' reached #2 on Billboard 200, certified Platinum",
      },
      {
        year: 2019,
        achievement: "'We Are Not Your Kind' debuted at #1 in 12 countries",
      },
      {
        year: 2008,
        achievement: "'All Hope Is Gone' - first #1 Billboard 200 album",
      },
      {
        year: 2000,
        achievement: "MTV Video Music Award nomination for 'Wait and Bleed'",
      },
      {
        year: 2020,
        achievement: "Over 30 million albums sold worldwide",
      },
    ],

    // Discography highlights
    discography: [
      {
        album: "Slipknot",
        year: 1999,
        drummer: "joey-jordison",
        notes: "Debut album. 2x Platinum. Defined nu-metal drumming.",
        highlights: ["'Wait and Bleed'", "'(sic)'", "'Surfacing'"],
      },
      {
        album: "Iowa",
        year: 2001,
        drummer: "joey-jordison",
        notes: "Considered one of the heaviest albums ever. Joey's drumming at its most intense.",
        highlights: ["'People = Shit'", "'Disasterpiece'", "'My Plague'"],
      },
      {
        album: "Vol. 3: (The Subliminal Verses)",
        year: 2004,
        drummer: "joey-jordison",
        notes: "More melodic approach. Grammy Award for 'Before I Forget'.",
        highlights: ["'Duality'", "'Before I Forget'", "'Vermilion'"],
      },
      {
        album: "All Hope Is Gone",
        year: 2008,
        drummer: "joey-jordison",
        notes: "First #1 album on Billboard 200. Joey's final album with the band.",
        highlights: ["'Psychosocial'", "'Dead Memories'", "'Snuff'"],
      },
      {
        album: ".5: The Gray Chapter",
        year: 2014,
        drummer: "jay-weinberg",
        notes: "Tribute to Paul Gray. Jay Weinberg's debut. #1 in multiple countries.",
        highlights: ["'The Devil in I'", "'Custer'", "'Killpop'"],
      },
      {
        album: "We Are Not Your Kind",
        year: 2019,
        drummer: "jay-weinberg",
        notes: "Critically acclaimed return to heavier sound. #1 in 12 countries.",
        highlights: ["'Unsainted'", "'Solway Firth'", "'Nero Forte'"],
      },
      {
        album: "The End, So Far",
        year: 2022,
        drummer: "jay-weinberg",
        notes: "Jay Weinberg's final album. Most experimental work to date.",
        highlights: ["'The Dying Song (Time To Sing)'", "'Yen'", "'Hive Mind'"],
      },
    ],

    // Drummer history
    drummerHistory: [
      {
        drummer: "joey-jordison",
        drummerId: 2,
        period: "1995-2013",
        notes: "Founding member. Defined Slipknot's drumming style. Known for rotating drum riser performances. Ranked among greatest metal drummers of all time.",
        albums: ["Slipknot", "Iowa", "Vol. 3", "All Hope Is Gone"],
      },
      {
        drummer: "jay-weinberg",
        drummerId: 13,
        period: "2014-2023",
        notes: "Son of E Street Band's Max Weinberg. Maintained band's intensity while adding his own style. Departed November 2023.",
        albums: [".5: The Gray Chapter", "We Are Not Your Kind", "The End, So Far"],
      },
      {
        drummer: "eloy-casagrande",
        drummerId: 10,
        period: "2024-present",
        notes: "Former Sepultura drummer. Named #1 Metal Drummer by Modern Drummer 2024. Brazilian technical powerhouse.",
        albums: [],
      },
    ],

    // FAQ Schema for SEO
    faq: [
      {
        question: "Who is Slipknot's current drummer?",
        answer:
          "As of 2024, Slipknot's drummer is Eloy Casagrande, formerly of Sepultura. He replaced Jay Weinberg, who departed the band in November 2023.",
      },
      {
        question: "Who was Slipknot's original drummer?",
        answer:
          "Joey Jordison was Slipknot's founding drummer from 1995 to 2013. He is widely regarded as one of the greatest metal drummers of all time and defined Slipknot's aggressive drumming style.",
      },
      {
        question: "How many drummers has Slipknot had?",
        answer:
          "Slipknot has had three main drummers: Joey Jordison (1995-2013), Jay Weinberg (2014-2023), and Eloy Casagrande (2024-present).",
      },
      {
        question: "What drums did Joey Jordison use?",
        answer:
          "Joey Jordison used Pearl drums throughout most of his career, including Pearl Reference and MasterWorks Series kits. He had his own signature snare drum, the Pearl Joey Jordison Signature 13x6.5\".",
      },
      {
        question: "Why did Jay Weinberg leave Slipknot?",
        answer:
          "Jay Weinberg's departure from Slipknot was announced in November 2023. The exact reasons were not publicly detailed. Jay subsequently joined Suicidal Tendencies for their tour with Metallica.",
      },
      {
        question: "What genre is Slipknot?",
        answer:
          "Slipknot is primarily classified as nu-metal and alternative metal, though their sound incorporates elements of death metal, thrash metal, and industrial music. Their aggressive style helped define the nu-metal movement of the late 1990s and early 2000s.",
      },
      {
        question: "How many members does Slipknot have?",
        answer:
          "Slipknot is known for having nine members, including a DJ, two percussionists (in addition to the drummer), and a sampler. Each member is identified by a number (#0-#8) and wears a unique mask.",
      },
    ],

    // Related bands
    relatedBands: ["korn", "mudvayne", "mushroomhead", "stone-sour", "sepultura"],

    // External links for SEO
    sameAs: [
      "https://en.wikipedia.org/wiki/Slipknot_(band)",
      "https://www.instagram.com/slipknot/",
      "https://twitter.com/slaboracadabra",
      "https://www.facebook.com/slipknot",
      "https://www.discogs.com/artist/30295-Slipknot",
    ],

    // Band members note (for context)
    memberNote:
      "Slipknot is known for its nine-member lineup with numbered members (0-8). The drummer position is #1. Joey Jordison, Jay Weinberg, and Eloy Casagrande have each worn #1 during their tenure.",
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
