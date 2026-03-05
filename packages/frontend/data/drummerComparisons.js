// Drummer vs Drummer Comparison Data for MetalForge
// Issue #558: Drummer comparison pages (/vs/:slug-vs-slug)

/**
 * Drummer comparison data with SEO-optimized content and structured data
 * Each comparison pairs two legendary metal drummers for side-by-side analysis
 */

export const drummerComparisons = {
  // Thrash Legends
  'lars-ulrich-vs-dave-lombardo': {
    slug: 'lars-ulrich-vs-dave-lombardo',
    title: 'Lars Ulrich vs Dave Lombardo',
    metaTitle: 'Lars Ulrich vs Dave Lombardo - Thrash Drumming Legends Compared | MetalForge',
    metaDescription: 'Compare Metallica\'s Lars Ulrich and Slayer\'s Dave Lombardo. Gear, technique, speed, and influence analyzed. Who is the ultimate thrash drumming icon?',
    category: 'thrash',
    drummers: ['lars-ulrich', 'dave-lombardo'],
    comparison: {
      style: 'Lars brings groove-oriented thrash with iconic mid-tempo stomps. Dave delivers relentless speed and technical precision with blast beat pioneering.',
      technique: 'Lars favors powerful, punchy patterns with signature fills. Dave revolutionized double bass in thrash with surgical timing and speed.',
      gear: 'Both endorse Tama drums. Lars uses Zildjian cymbals for bright attack; Dave prefers Paiste RUDE for aggressive cut.',
      influence: 'Lars shaped mainstream metal drumming through Metallica\'s commercial success. Dave defined extreme thrash drumming and influenced death metal.',
    },
    verdict: 'Lars Ulrich defined accessible thrash drumming for millions. Dave Lombardo pushed technical boundaries that influenced generations of extreme drummers. Both are irreplaceable icons of the genre.',
  },

  // Progressive Titans
  'mario-duplantier-vs-tomas-haake': {
    slug: 'mario-duplantier-vs-tomas-haake',
    title: 'Mario Duplantier vs Tomas Haake',
    metaTitle: 'Mario Duplantier vs Tomas Haake - Progressive Metal Drumming Giants | MetalForge',
    metaDescription: 'Gojira\'s Mario Duplantier vs Meshuggah\'s Tomas Haake. Polyrhythms, stamina, and progressive metal innovation compared. The ultimate prog metal showdown.',
    category: 'progressive',
    drummers: ['mario-duplantier', 'tomas-haake'],
    comparison: {
      style: 'Mario combines tribal rhythms with technical death metal. Tomas invented djent drumming with polyrhythmic complexity.',
      technique: 'Mario uses raw power and endurance with explosive fills. Tomas employs machine-like precision with complex time signatures.',
      gear: 'Mario endorses Meinl cymbals for dark, complex tones. Tomas plays Sonor drums with Sabian cymbals for focused attack.',
      influence: 'Mario influenced modern progressive death metal. Tomas pioneered the djent movement and polyrhythmic metal.',
    },
    verdict: 'Two masters of progressive metal drumming. Mario brings organic power and tribal energy. Tomas delivers robotic precision and mathematical complexity. Both have redefined what\'s possible behind the kit.',
  },

  // Death Metal Speed Kings
  'george-kollias-vs-pete-sandoval': {
    slug: 'george-kollias-vs-pete-sandoval',
    title: 'George Kollias vs Pete Sandoval',
    metaTitle: 'George Kollias vs Pete Sandoval - Death Metal Speed Comparison | MetalForge',
    metaDescription: 'Nile\'s George Kollias vs Morbid Angel\'s Pete Sandoval. Blast beats, speed, and extreme metal drumming mastery. Who is the fastest death metal drummer?',
    category: 'extreme',
    drummers: ['george-kollias', 'pete-sandoval'],
    comparison: {
      style: 'George combines Greek precision with Egyptian-themed technicality. Pete brought Florida death metal intensity with relentless aggression.',
      technique: 'George uses heel-toe technique for sustained blast beats at extreme tempos. Pete pioneered gravity blasts with raw power.',
      gear: 'George plays Pearl drums with Pearl Demon Drive pedals for speed. Pete used Tama drums with Iron Cobra pedals.',
      influence: 'George raised the bar for technical death metal drumming. Pete helped define the Florida death metal sound and blast beat vocabulary.',
    },
    verdict: 'Pete Sandoval laid the foundation for extreme death metal drumming. George Kollias elevated it to new technical heights. Both are essential figures in death metal history.',
  },

  // Nu-Metal Icons
  'joey-jordison-vs-john-otto': {
    slug: 'joey-jordison-vs-john-otto',
    title: 'Joey Jordison vs John Otto',
    metaTitle: 'Joey Jordison vs John Otto - Nu-Metal Drumming Legends | MetalForge',
    metaDescription: 'Slipknot\'s Joey Jordison vs Limp Bizkit\'s John Otto. Nu-metal drumming styles, speed, and groove compared. The iconic drummers of the nu-metal era.',
    category: 'other',
    drummers: ['joey-jordison', 'john-otto'],
    comparison: {
      style: 'Joey brought extreme metal intensity to nu-metal with blast beats and speed. John focused on groove, hip-hop influenced rhythms and pocket.',
      technique: 'Joey combined death metal speed with theatrical showmanship. John mastered syncopated grooves and dynamic control.',
      gear: 'Joey played Pearl drums with custom kits. John endorses Pearl with emphasis on tight, punchy tones.',
      influence: 'Joey proved nu-metal could be technically extreme. John showed nu-metal\'s rhythmic connection to hip-hop and funk.',
    },
    verdict: 'Joey Jordison redefined nu-metal\'s technical ceiling. John Otto exemplified groove-based nu-metal drumming. Together they represent the genre\'s full spectrum.',
  },

  // Progressive Legends
  'mike-portnoy-vs-danny-carey': {
    slug: 'mike-portnoy-vs-danny-carey',
    title: 'Mike Portnoy vs Danny Carey',
    metaTitle: 'Mike Portnoy vs Danny Carey - Prog Metal Drumming Masters | MetalForge',
    metaDescription: 'Dream Theater\'s Mike Portnoy vs Tool\'s Danny Carey. Progressive metal drumming, odd time signatures, and artistic vision compared.',
    category: 'progressive',
    drummers: ['mike-portnoy', 'danny-carey'],
    comparison: {
      style: 'Mike brings theatrical prog metal with complex arrangements. Danny delivers hypnotic, tribal progressive with occult undertones.',
      technique: 'Mike excels at rapid-fire transitions and theatrical fills. Danny masters polyrhythmic patterns and electronic integration.',
      gear: 'Mike plays Tama drums with Sabian cymbals. Danny uses Sonor drums with Paiste cymbals, including custom Mandala pads.',
      influence: 'Mike shaped 90s progressive metal through Dream Theater. Danny defined Tool\'s unique sound and influenced modern prog rock.',
    },
    verdict: 'Mike Portnoy epitomizes technical progressive metal. Danny Carey represents artistic, spiritual drumming. Both are genre-defining visionaries.',
  },

  // Speed Icons
  'gene-hoglan-vs-charlie-benante': {
    slug: 'gene-hoglan-vs-charlie-benante',
    title: 'Gene Hoglan vs Charlie Benante',
    metaTitle: 'Gene Hoglan vs Charlie Benante - Speed Metal Drumming Legends | MetalForge',
    metaDescription: 'Gene "The Atomic Clock" Hoglan vs Anthrax\'s Charlie Benante. Timing, speed, and thrash metal drumming precision compared.',
    category: 'thrash',
    drummers: ['gene-hoglan', 'charlie-benante'],
    comparison: {
      style: 'Gene brings scientific precision to death and thrash metal. Charlie combines thrash aggression with hardcore punk energy.',
      technique: 'Gene is known for inhuman timing and signature gravity blast technique. Charlie pioneered skank beats and aggressive double bass.',
      gear: 'Gene endorses Pearl drums for power and projection. Charlie plays Pearl with emphasis on attack and cut.',
      influence: 'Gene influenced progressive death metal and technical thrash. Charlie helped define East Coast thrash and crossover styles.',
    },
    verdict: 'Gene Hoglan earned "Atomic Clock" for unmatched precision. Charlie Benante brought punk energy to thrash metal. Both are essential thrash icons.',
  },

  // Modern Technical Masters
  'matt-halpern-vs-alex-bent': {
    slug: 'matt-halpern-vs-alex-bent',
    title: 'Matt Halpern vs Alex Bent',
    metaTitle: 'Matt Halpern vs Alex Bent - Modern Metal Drumming Comparison | MetalForge',
    metaDescription: 'Periphery\'s Matt Halpern vs Trivium\'s Alex Bent. Djent, modern metal, and technical drumming compared. The future of metal drumming.',
    category: 'progressive',
    drummers: ['matt-halpern', 'alex-bent'],
    comparison: {
      style: 'Matt pioneered djent drumming with Periphery. Alex brings technical death metal precision to modern thrash.',
      technique: 'Matt masters groove-focused polyrhythms and ghost notes. Alex combines blast beats with melodic thrash patterns.',
      gear: 'Matt plays Pearl drums with Meinl cymbals for dark tones. Alex uses Pearl with precision-focused cymbal selection.',
      influence: 'Matt helped define the djent sound and YouTube drum community. Alex represents the new generation of versatile metal drummers.',
    },
    verdict: 'Matt Halpern shaped djent drumming for a generation. Alex Bent proves technical versatility in modern metal. Both represent the future of the genre.',
  },

  // Black Metal Legends
  'hellhammer-vs-inferno': {
    slug: 'hellhammer-vs-inferno',
    title: 'Hellhammer vs Inferno',
    metaTitle: 'Hellhammer vs Inferno - Black Metal Drumming Titans | MetalForge',
    metaDescription: 'Mayhem\'s Hellhammer vs Behemoth\'s Inferno. Black metal blast beats, speed, and extreme drumming compared. The legends of extreme metal.',
    category: 'extreme',
    drummers: ['hellhammer', 'inferno'],
    comparison: {
      style: 'Hellhammer defines Norwegian black metal with cold, precise aggression. Inferno brings Polish death/black metal intensity with technical flair.',
      technique: 'Hellhammer pioneered black metal blast beats with signature one-foot technique. Inferno combines blast beats with death metal complexity.',
      gear: 'Hellhammer plays Pearl drums with focus on power. Inferno uses Pearl with emphasis on speed and projection.',
      influence: 'Hellhammer defined the second wave black metal sound. Inferno pushed black metal drumming into more technical territory.',
    },
    verdict: 'Hellhammer is the blueprint for black metal drumming. Inferno evolved it with death metal technicality. Both are essential to extreme metal.',
  },

  // Mastodon vs Gojira
  'brann-dailor-vs-mario-duplantier': {
    slug: 'brann-dailor-vs-mario-duplantier',
    title: 'Brann Dailor vs Mario Duplantier',
    metaTitle: 'Brann Dailor vs Mario Duplantier - Progressive Sludge Drumming | MetalForge',
    metaDescription: 'Mastodon\'s Brann Dailor vs Gojira\'s Mario Duplantier. Sludge, progressive metal, and technical drumming compared. Two modern prog metal icons.',
    category: 'progressive',
    drummers: ['brann-dailor', 'mario-duplantier'],
    comparison: {
      style: 'Brann brings jazzy, proggy fills to sludge metal. Mario combines tribal rhythms with technical death metal.',
      technique: 'Brann uses constant motion with signature flowing fills. Mario delivers raw power with explosive accents.',
      gear: 'Brann plays DW drums with Sabian cymbals. Mario uses Tama drums with Meinl cymbals for dark tones.',
      influence: 'Brann helped define the progressive sludge sound. Mario influenced environmental metal and modern prog death.',
    },
    verdict: 'Brann Dailor and Mario Duplantier represent two paths of modern progressive metal drumming. Both push boundaries while maintaining musical identity.',
  },

  // Sepultura Legends
  'igor-cavalera-vs-eloy-casagrande': {
    slug: 'igor-cavalera-vs-eloy-casagrande',
    title: 'Igor Cavalera vs Eloy Casagrande',
    metaTitle: 'Igor Cavalera vs Eloy Casagrande - Sepultura Drummers Compared | MetalForge',
    metaDescription: 'Sepultura founding drummer Igor Cavalera vs current drummer Eloy Casagrande. Brazilian metal drumming legends compared.',
    category: 'thrash',
    drummers: ['igor-cavalera', 'eloy-casagrande'],
    comparison: {
      style: 'Igor pioneered groove-based thrash with tribal influences. Eloy brings modern technical precision to Sepultura\'s legacy.',
      technique: 'Igor invented the tribal-metal fusion with signature grooves. Eloy combines death metal speed with groove mastery.',
      gear: 'Igor played various brands throughout his career. Eloy endorses Tama drums with Meinl cymbals.',
      influence: 'Igor defined Brazilian metal and groove metal. Eloy carries the torch while adding modern technical elements.',
    },
    verdict: 'Igor Cavalera created Sepultura\'s iconic sound. Eloy Casagrande honors it while pushing technical boundaries. Both represent Brazilian metal excellence.',
  },

  // Classic vs Modern Thrash
  'vinnie-paul-vs-art-cruz': {
    slug: 'vinnie-paul-vs-art-cruz',
    title: 'Vinnie Paul vs Art Cruz',
    metaTitle: 'Vinnie Paul vs Art Cruz - Pantera & Lamb of God Drumming | MetalForge',
    metaDescription: 'Pantera\'s Vinnie Paul vs Lamb of God\'s Art Cruz. Groove metal drumming legacy compared. Power, groove, and metal drumming icons.',
    category: 'thrash',
    drummers: ['vinnie-paul', 'art-cruz'],
    comparison: {
      style: 'Vinnie defined groove metal with powerful, punchy patterns. Art brings Lamb of God intensity with Chris Adler\'s legacy.',
      technique: 'Vinnie pioneered the "power groove" with massive snare hits. Art combines groove with technical death metal precision.',
      gear: 'Vinnie endorsed ddrum with Sabian cymbals. Art plays Pearl drums for modern attack.',
      influence: 'Vinnie created the Pantera sound that defined 90s metal. Art continues the Lamb of God legacy with his own style.',
    },
    verdict: 'Vinnie Paul is the godfather of groove metal drumming. Art Cruz proves the genre\'s evolution continues. Both represent the power of American metal.',
  },

  // Korn vs Deftones Generation
  'ray-luzier-vs-abe-cunningham': {
    slug: 'ray-luzier-vs-abe-cunningham',
    title: 'Ray Luzier vs Abe Cunningham',
    metaTitle: 'Ray Luzier vs Abe Cunningham - Alternative Metal Drumming | MetalForge',
    metaDescription: 'Korn\'s Ray Luzier vs Deftones\' Abe Cunningham. Alternative metal drumming, groove, and feel compared. Nu-metal\'s finest.',
    category: 'other',
    drummers: ['ray-luzier', 'abe-cunningham'],
    comparison: {
      style: 'Ray brings session musician precision to Korn\'s heavy grooves. Abe delivers atmospheric, dynamic playing with emotional depth.',
      technique: 'Ray excels at tight, syncopated patterns with David Silveria\'s legacy. Abe masters dynamics and textural playing.',
      gear: 'Ray endorses Pearl drums with Zildjian cymbals. Abe plays DW drums with Zildjian for warm tones.',
      influence: 'Ray maintains Korn\'s classic sound while adding technical flair. Abe helped define the Deftones\' atmospheric metal approach.',
    },
    verdict: 'Ray Luzier honors and evolves Korn\'s signature sound. Abe Cunningham pioneered atmospheric metal drumming. Both define alternative metal\'s evolution.',
  },

  // Issue #598: Lars Ulrich vs Joey Jordison - Metal Icons Showdown
  'lars-ulrich-vs-joey-jordison': {
    slug: 'lars-ulrich-vs-joey-jordison',
    title: 'Lars Ulrich vs Joey Jordison',
    metaTitle: 'Lars Ulrich vs Joey Jordison - Metallica vs Slipknot Drummers | MetalForge',
    metaDescription: 'Compare Metallica\'s Lars Ulrich and Slipknot\'s Joey Jordison. Thrash metal pioneer vs nu-metal icon. Gear, technique, speed, and legacy compared.',
    category: 'thrash',
    drummers: ['lars-ulrich', 'joey-jordison'],
    comparison: {
      style: 'Lars defined accessible thrash with groove-oriented power. Joey brought extreme metal intensity to mainstream nu-metal with blast beats and speed.',
      technique: 'Lars favors mid-tempo stomps with powerful fills and iconic ride patterns. Joey combined death metal speed with theatrical showmanship on a rotating drum kit.',
      gear: 'Lars plays Tama Starclassic with Zildjian cymbals and Ahead sticks. Joey endorsed Pearl drums with Paiste cymbals for aggressive attack.',
      influence: 'Lars shaped how millions perceive metal drumming through Metallica\'s commercial success. Joey proved extreme techniques could work in mainstream metal.',
    },
    verdict: 'Lars Ulrich co-founded the biggest metal band in history and became the voice of the metal drummer. Joey Jordison revolutionized what a masked metal drummer could achieve. Both transcended their eras to become immortal icons of heavy music.',
  },

  // Issue #598: Danny Carey vs Mario Duplantier - Progressive Titans
  'danny-carey-vs-mario-duplantier': {
    slug: 'danny-carey-vs-mario-duplantier',
    title: 'Danny Carey vs Mario Duplantier',
    metaTitle: 'Danny Carey vs Mario Duplantier - Tool vs Gojira Drummers | MetalForge',
    metaDescription: 'Tool\'s Danny Carey vs Gojira\'s Mario Duplantier. Progressive metal drumming excellence compared. Polyrhythms, power, and artistic vision analyzed.',
    category: 'progressive',
    drummers: ['danny-carey', 'mario-duplantier'],
    comparison: {
      style: 'Danny creates hypnotic, spiritual progressive rock with occult undertones. Mario combines tribal rhythms with technical death metal for environmental metal.',
      technique: 'Danny masters polyrhythmic patterns with electronic integration and Fibonacci-based compositions. Mario delivers raw tribal power with explosive accents and relentless endurance.',
      gear: 'Danny plays Sonor drums with Paiste cymbals and custom Mandala pads. Mario endorses Tama drums with Meinl cymbals for dark, complex tones.',
      influence: 'Danny defined Tool\'s unique sound and influenced a generation of progressive rock drummers. Mario pioneered the "environmental metal" drumming style with Gojira.',
    },
    verdict: 'Danny Carey is the philosopher-drummer whose mathematical approach created Tool\'s sonic universe. Mario Duplantier is the primal force whose organic power drives Gojira\'s environmental message. Both represent the pinnacle of thinking drummers.',
  },

  // Issue #598: Gene Hoglan vs George Kollias - Speed Demons
  'gene-hoglan-vs-george-kollias': {
    slug: 'gene-hoglan-vs-george-kollias',
    title: 'Gene Hoglan vs George Kollias',
    metaTitle: 'Gene Hoglan vs George Kollias - Extreme Metal Drumming Legends | MetalForge',
    metaDescription: 'Gene "The Atomic Clock" Hoglan vs Nile\'s George Kollias. Death metal speed, precision, and technical mastery compared. Who is the ultimate extreme drummer?',
    category: 'extreme',
    drummers: ['gene-hoglan', 'george-kollias'],
    comparison: {
      style: 'Gene brings scientific precision to progressive death and thrash metal with inhuman timing. George delivers Egyptian-themed technical brutality with sustained extreme tempos.',
      technique: 'Gene pioneered the gravity blast and is known for impossibly tight double bass and timing. George uses heel-toe technique for sustained blast beats at 280+ BPM.',
      gear: 'Gene endorses Pearl drums for power and projection with signature sticks. George plays Pearl drums with Pearl Demon Drive pedals for ultimate speed.',
      influence: 'Gene influenced three decades of extreme metal through Death, Dark Angel, Testament, and more. George raised the bar for technical death metal and extreme speed drumming.',
    },
    verdict: 'Gene Hoglan earned "The Atomic Clock" nickname through legendary precision across 40+ years. George Kollias represents the modern evolution of extreme drumming speed and technique. Together they span death metal\'s entire history.',
  },
};

/**
 * Get all drummer comparisons
 */
export function getAllDrummerComparisons() {
  return Object.values(drummerComparisons);
}

/**
 * Get drummer comparison by slug
 */
export function getDrummerComparisonBySlug(slug) {
  return drummerComparisons[slug] || null;
}

/**
 * Check if a drummer comparison exists
 */
export function hasDrummerComparison(slug) {
  return slug in drummerComparisons;
}

/**
 * Get all drummer comparison slugs
 */
export function getAllDrummerComparisonSlugs() {
  return Object.keys(drummerComparisons);
}

/**
 * Get drummer comparisons by category
 */
export function getDrummerComparisonsByCategory(category) {
  return Object.values(drummerComparisons).filter(c => c.category === category);
}

/**
 * Get comparisons featuring a specific drummer
 */
export function getComparisonsForDrummer(drummerSlug) {
  return Object.values(drummerComparisons).filter(c => 
    c.drummers.includes(drummerSlug)
  );
}

/**
 * Generate URL-friendly comparison slug from two drummer names
 */
export function generateComparisonSlug(drummer1, drummer2) {
  const slug1 = drummer1.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  const slug2 = drummer2.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  return `${slug1}-vs-${slug2}`;
}

/**
 * Dynamic Comparison Generator - Issue #650
 * Generates comparison content for any two drummers that don't have curated content
 * @param {Object} drummer1 - First drummer object with full data
 * @param {Object} drummer2 - Second drummer object with full data
 * @returns {Object} Generated comparison data
 */
export function generateDynamicComparison(drummer1, drummer2) {
  if (!drummer1 || !drummer2) return null;
  
  const slug1 = drummer1.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  const slug2 = drummer2.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  const comparisonSlug = `${slug1}-vs-${slug2}`;
  
  // Check if curated comparison exists (in either direction)
  if (drummerComparisons[comparisonSlug]) {
    return drummerComparisons[comparisonSlug];
  }
  const reverseSlug = `${slug2}-vs-${slug1}`;
  if (drummerComparisons[reverseSlug]) {
    return drummerComparisons[reverseSlug];
  }
  
  // Determine category based on genres
  const genre1 = (drummer1.genre || '').toLowerCase();
  const genre2 = (drummer2.genre || '').toLowerCase();
  let category = 'other';
  if (genre1.includes('thrash') || genre2.includes('thrash')) category = 'thrash';
  else if (genre1.includes('death') || genre2.includes('death') || genre1.includes('extreme') || genre2.includes('extreme')) category = 'extreme';
  else if (genre1.includes('progressive') || genre2.includes('progressive') || genre1.includes('djent') || genre2.includes('djent')) category = 'progressive';
  
  // Generate dynamic content
  const generateStyleComparison = () => {
    const style1 = drummer1.genre || 'metal';
    const style2 = drummer2.genre || 'metal';
    return `${drummer1.name} brings ${style1.toLowerCase()} intensity with ${drummer1.band}'s signature sound. ${drummer2.name} delivers ${style2.toLowerCase()} power through ${drummer2.band}'s approach.`;
  };
  
  const generateGearComparison = () => {
    const drums1 = drummer1.gear?.drums || 'custom drums';
    const drums2 = drummer2.gear?.drums || 'custom drums';
    const cymbals1 = drummer1.gear?.cymbals?.split(' ')[0] || 'signature';
    const cymbals2 = drummer2.gear?.cymbals?.split(' ')[0] || 'signature';
    return `${drummer1.name} plays ${drums1} with ${cymbals1} cymbals. ${drummer2.name} uses ${drums2} with ${cymbals2} cymbals.`;
  };
  
  const generateTechniqueComparison = () => {
    return `Both drummers showcase exceptional technique in their respective genres. ${drummer1.name} developed their style through ${drummer1.band}, while ${drummer2.name} refined their craft with ${drummer2.band}.`;
  };
  
  const generateInfluenceComparison = () => {
    return `${drummer1.name} has influenced ${(drummer1.genre || 'metal').toLowerCase()} drumming significantly. ${drummer2.name} has made a lasting impact on ${(drummer2.genre || 'metal').toLowerCase()} drummers worldwide.`;
  };
  
  const generateVerdict = () => {
    return `Both ${drummer1.name} and ${drummer2.name} are exceptional drummers who have left their mark on metal music. Each brings unique qualities - compare their gear, technique, and style above to decide who matches your preferences!`;
  };
  
  return {
    slug: comparisonSlug,
    title: `${drummer1.name} vs ${drummer2.name}`,
    metaTitle: `${drummer1.name} vs ${drummer2.name} - Metal Drummers Compared | MetalForge`,
    metaDescription: `Compare ${drummer1.name} (${drummer1.band}) and ${drummer2.name} (${drummer2.band}). Gear, technique, and style side-by-side. Vote for your favorite!`,
    category,
    drummers: [slug1, slug2],
    isGenerated: true, // Flag to indicate this is dynamically generated
    comparison: {
      style: generateStyleComparison(),
      technique: generateTechniqueComparison(),
      gear: generateGearComparison(),
      influence: generateInfluenceComparison(),
    },
    verdict: generateVerdict(),
  };
}

/**
 * Get comparison by slug - returns curated or generates dynamic
 * @param {string} slug - Comparison slug (e.g., 'lars-ulrich-vs-joey-jordison')
 * @param {Array} allDrummers - Array of all drummer objects (for dynamic generation)
 * @returns {Object|null} Comparison data
 */
export function getComparisonBySlugWithDynamic(slug, allDrummers) {
  // Check for curated comparison
  if (drummerComparisons[slug]) {
    return drummerComparisons[slug];
  }
  
  // Try reverse order
  const parts = slug.split('-vs-');
  if (parts.length === 2) {
    const reverseSlug = `${parts[1]}-vs-${parts[0]}`;
    if (drummerComparisons[reverseSlug]) {
      return drummerComparisons[reverseSlug];
    }
  }
  
  // Generate dynamic comparison if drummers exist
  if (allDrummers && parts.length === 2) {
    const toSlug = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    const drummer1 = allDrummers.find(d => toSlug(d.name) === parts[0]);
    const drummer2 = allDrummers.find(d => toSlug(d.name) === parts[1]);
    
    if (drummer1 && drummer2) {
      return generateDynamicComparison(drummer1, drummer2);
    }
  }
  
  return null;
}

/**
 * Generate all possible comparison slugs for SEO/sitemap
 * @param {Array} allDrummers - Array of all drummer objects
 * @returns {Array} Array of all possible comparison slugs
 */
export function generateAllComparisonSlugs(allDrummers) {
  if (!allDrummers || allDrummers.length < 2) return [];
  
  const toSlug = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  const slugs = new Set();
  
  // Add all curated slugs first
  Object.keys(drummerComparisons).forEach(slug => slugs.add(slug));
  
  // Generate all possible pairs
  for (let i = 0; i < allDrummers.length; i++) {
    for (let j = i + 1; j < allDrummers.length; j++) {
      const slug1 = toSlug(allDrummers[i].name);
      const slug2 = toSlug(allDrummers[j].name);
      // Alphabetical order for consistency
      const orderedSlug = slug1 < slug2 ? `${slug1}-vs-${slug2}` : `${slug2}-vs-${slug1}`;
      slugs.add(orderedSlug);
    }
  }
  
  return Array.from(slugs);
}
