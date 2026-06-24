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

  // Issue #691: Top 20 SEO Comparison Pages - Slipknot Succession
  'joey-jordison-vs-jay-weinberg': {
    slug: 'joey-jordison-vs-jay-weinberg',
    title: 'Joey Jordison vs Jay Weinberg',
    metaTitle: 'Joey Jordison vs Jay Weinberg: Complete Gear Comparison 2026 | MetalForge',
    metaDescription: 'Compare Slipknot\'s legendary drummers. Joey Jordison vs Jay Weinberg - gear, technique, and style analyzed. The Slipknot succession showdown.',
    category: 'other',
    drummers: ['joey-jordison', 'jay-weinberg'],
    comparison: {
      style: 'Joey defined Slipknot\'s chaotic, extreme drumming style with blast beats and theatrical intensity. Jay brought a more groove-oriented approach while honoring Joey\'s legacy.',
      technique: 'Joey pioneered the rotating drum platform and extreme speed in nu-metal. Jay delivers powerful, precise playing with massive groove and dynamic control.',
      gear: 'Joey played Pearl drums with Paiste cymbals. Jay uses Pearl Masters with Zildjian A Custom cymbals for aggressive attack.',
      influence: 'Joey created the template for Slipknot drumming that defined a generation. Jay has carved his own legacy while respecting the foundation Joey built.',
    },
    verdict: 'The Slipknot succession represents two eras of metal drumming excellence. Joey Jordison was the irreplaceable original; Jay Weinberg proved worthy of carrying the torch. Both embody what it means to be a Slipknot drummer.',
  },

  // Issue #691: Top 20 SEO Comparison Pages - Thrash Titans
  'dave-lombardo-vs-gene-hoglan': {
    slug: 'dave-lombardo-vs-gene-hoglan',
    title: 'Dave Lombardo vs Gene Hoglan',
    metaTitle: 'Dave Lombardo vs Gene Hoglan: Complete Gear Comparison 2026 | MetalForge',
    metaDescription: 'Slayer\'s Dave Lombardo vs Gene "The Atomic Clock" Hoglan. Two titans of extreme metal drumming compared. Gear, speed, and technique analyzed.',
    category: 'extreme',
    drummers: ['dave-lombardo', 'gene-hoglan'],
    comparison: {
      style: 'Dave pioneered thrash metal drumming with relentless aggression and speed. Gene brought scientific precision to death metal with inhuman timing.',
      technique: 'Dave revolutionized double bass speed and blast beats in thrash. Gene invented the gravity blast and is known for impossibly tight timing.',
      gear: 'Dave plays Pearl drums with Paiste RUDE cymbals for aggressive cut. Gene endorses Pearl for power and projection with signature sticks.',
      influence: 'Dave defined the Slayer sound that influenced all of extreme metal. Gene has been the backbone of Death, Testament, and countless legendary bands.',
    },
    verdict: 'Two drummers who defined extreme metal drumming. Dave Lombardo is thrash metal royalty. Gene Hoglan is "The Atomic Clock." Together they represent the pinnacle of speed and precision.',
  },

  // Issue #691: Top 20 SEO Comparison Pages - Tech Drummers
  'tomas-haake-vs-matt-halpern': {
    slug: 'tomas-haake-vs-matt-halpern',
    title: 'Tomas Haake vs Matt Halpern',
    metaTitle: 'Tomas Haake vs Matt Halpern: Complete Gear Comparison 2026 | MetalForge',
    metaDescription: 'Meshuggah\'s Tomas Haake vs Periphery\'s Matt Halpern. Two masters of polyrhythmic metal compared. Djent drumming analyzed.',
    category: 'progressive',
    drummers: ['tomas-haake', 'matt-halpern'],
    comparison: {
      style: 'Tomas invented the djent drumming template with Meshuggah\'s polyrhythmic complexity. Matt refined and evolved the style for modern progressive metal.',
      technique: 'Tomas employs machine-like precision with robotic feel and complex time signatures. Matt combines groove-focused polyrhythms with exceptional ghost notes.',
      gear: 'Tomas plays Sonor drums with Sabian cymbals for focused attack. Matt uses Pearl drums with Meinl cymbals for dark, complex tones.',
      influence: 'Tomas pioneered the djent movement and influenced an entire generation. Matt shaped the modern djent sound and built the YouTube drum community.',
    },
    verdict: 'The architect vs the innovator. Tomas Haake created the djent blueprint; Matt Halpern evolved it for a new generation. Both are essential to understanding modern progressive metal drumming.',
  },

  // Issue #691: Top 20 SEO Comparison Pages - Thrash vs Nu-Metal
  'chris-adler-vs-joey-jordison': {
    slug: 'chris-adler-vs-joey-jordison',
    title: 'Chris Adler vs Joey Jordison',
    metaTitle: 'Chris Adler vs Joey Jordison: Complete Gear Comparison 2026 | MetalForge',
    metaDescription: 'Lamb of God\'s Chris Adler vs Slipknot\'s Joey Jordison. Groove metal vs nu-metal intensity compared. Two defining drummers of 2000s metal.',
    category: 'thrash',
    drummers: ['chris-adler', 'joey-jordison'],
    comparison: {
      style: 'Chris defined modern groove metal with Lamb of God\'s aggressive yet technical approach. Joey brought extreme metal intensity to mainstream nu-metal with Slipknot.',
      technique: 'Chris mastered precision groove drumming with signature triplet patterns. Joey combined death metal speed with theatrical showmanship.',
      gear: 'Chris played DW drums with Meinl cymbals for dark attack. Joey endorsed Pearl drums with Paiste cymbals for aggressive tone.',
      influence: 'Chris shaped the new wave of American heavy metal drumming. Joey proved extreme techniques could work in mainstream metal.',
    },
    verdict: 'Two drummers who defined 2000s heavy metal. Chris Adler brought technical precision to groove metal. Joey Jordison brought extreme metal to the masses. Both changed what was possible.',
  },

  // Issue #691: Top 20 SEO Comparison Pages - Classic Metal Icons
  'nicko-mcbrain-vs-lars-ulrich': {
    slug: 'nicko-mcbrain-vs-lars-ulrich',
    title: 'Nicko McBrain vs Lars Ulrich',
    metaTitle: 'Nicko McBrain vs Lars Ulrich: Complete Gear Comparison 2026 | MetalForge',
    metaDescription: 'Iron Maiden\'s Nicko McBrain vs Metallica\'s Lars Ulrich. Two icons of classic heavy metal drumming compared. Gear, technique, and legacy analyzed.',
    category: 'thrash',
    drummers: ['nicko-mcbrain', 'lars-ulrich'],
    comparison: {
      style: 'Nicko brings galloping rhythms and technical precision to Iron Maiden\'s progressive metal. Lars defined accessible thrash with groove-oriented power.',
      technique: 'Nicko is known for complex patterns, signature gallops, and single-bass mastery. Lars favors powerful, punchy patterns with iconic ride patterns.',
      gear: 'Nicko plays Sonor drums with Paiste cymbals for bright, cutting tone. Lars uses Tama Starclassic with Zildjian cymbals.',
      influence: 'Nicko shaped British heavy metal drumming through four decades with Maiden. Lars shaped how millions perceive metal drumming through Metallica.',
    },
    verdict: 'Two pillars of classic heavy metal. Nicko McBrain is the technical master of Iron Maiden\'s galloping sound. Lars Ulrich is the heartbeat of the biggest metal band ever. Both are irreplaceable legends.',
  },

  // Issue #691: Top 20 SEO Comparison Pages - British Metal
  'scott-travis-vs-nicko-mcbrain': {
    slug: 'scott-travis-vs-nicko-mcbrain',
    title: 'Scott Travis vs Nicko McBrain',
    metaTitle: 'Scott Travis vs Nicko McBrain: Complete Gear Comparison 2026 | MetalForge',
    metaDescription: 'Judas Priest\'s Scott Travis vs Iron Maiden\'s Nicko McBrain. British heavy metal\'s finest drummers compared. Technique and gear analyzed.',
    category: 'thrash',
    drummers: ['scott-travis', 'nicko-mcbrain'],
    comparison: {
      style: 'Scott brought modern double bass power to Judas Priest\'s classic sound. Nicko delivers complex patterns and signature gallops for Iron Maiden.',
      technique: 'Scott excels at powerful double bass and precision timing. Nicko masters intricate patterns with single-bass footwork and dynamic control.',
      gear: 'Scott plays Pearl drums with Paiste cymbals for aggressive attack. Nicko uses Sonor drums with Paiste for bright, cutting tone.',
      influence: 'Scott modernized Judas Priest\'s sound while respecting their legacy. Nicko defined Iron Maiden\'s drumming for over 40 years.',
    },
    verdict: 'The rivalry of British metal. Scott Travis brought Priest into the modern era. Nicko McBrain is Iron Maiden\'s irreplaceable heartbeat. Both represent the best of NWOBHM evolution.',
  },

  // Issue #691: Top 20 SEO Comparison Pages - Extreme Metal Icons
  'joey-jordison-vs-dave-lombardo': {
    slug: 'joey-jordison-vs-dave-lombardo',
    title: 'Joey Jordison vs Dave Lombardo',
    metaTitle: 'Joey Jordison vs Dave Lombardo: Complete Gear Comparison 2026 | MetalForge',
    metaDescription: 'Slipknot\'s Joey Jordison vs Slayer\'s Dave Lombardo. Nu-metal intensity vs thrash metal pioneering compared. Two extreme drumming icons.',
    category: 'extreme',
    drummers: ['joey-jordison', 'dave-lombardo'],
    comparison: {
      style: 'Joey brought extreme metal intensity to mainstream nu-metal with blast beats and speed. Dave pioneered thrash metal drumming with relentless aggression.',
      technique: 'Joey combined death metal speed with theatrical showmanship on a rotating kit. Dave revolutionized double bass and blast beats in thrash.',
      gear: 'Joey played Pearl drums with Paiste cymbals. Dave uses Pearl drums with Paiste RUDE cymbals for aggressive cut.',
      influence: 'Joey proved extreme techniques could work in mainstream metal. Dave defined the Slayer sound that influenced all of extreme metal.',
    },
    verdict: 'Two generations of extreme metal. Dave Lombardo invented thrash drumming; Joey Jordison brought it to a new audience. Both pushed the limits of speed and intensity.',
  },

  // Issue #691: Top 20 SEO Comparison Pages - Progressive Metal
  'danny-carey-vs-brann-dailor': {
    slug: 'danny-carey-vs-brann-dailor',
    title: 'Danny Carey vs Brann Dailor',
    metaTitle: 'Danny Carey vs Brann Dailor: Complete Gear Comparison 2026 | MetalForge',
    metaDescription: 'Tool\'s Danny Carey vs Mastodon\'s Brann Dailor. Two progressive metal drumming visionaries compared. Polyrhythms, technique, and artistry analyzed.',
    category: 'progressive',
    drummers: ['danny-carey', 'brann-dailor'],
    comparison: {
      style: 'Danny creates hypnotic, spiritual progressive rock with occult undertones. Brann brings jazzy, proggy fills to sludge metal with constant motion.',
      technique: 'Danny masters polyrhythmic patterns with electronic integration and Fibonacci-based compositions. Brann uses constant flowing fills with signature tom work.',
      gear: 'Danny plays Sonor drums with Paiste cymbals and custom Mandala pads. Brann uses DW drums with Sabian cymbals.',
      influence: 'Danny defined Tool\'s unique sound and influenced a generation of prog drummers. Brann helped define the progressive sludge sound.',
    },
    verdict: 'Two artists who transcend drumming. Danny Carey is the philosopher-mathematician behind the kit. Brann Dailor is perpetual motion incarnate. Both have created unique voices in progressive metal.',
  },

  // Issue #1975: SEO batch — NWOBHM legends
  'nicko-mcbrain-vs-mikkey-dee': {
    slug: 'nicko-mcbrain-vs-mikkey-dee',
    title: 'Nicko McBrain vs Mikkey Dee',
    metaTitle: 'Nicko McBrain vs Mikkey Dee: Comparing Two Classic Heavy Metal Icons | MetalForge',
    metaDescription: 'Iron Maiden\'s Nicko McBrain vs Motörhead\'s Mikkey Dee. Two titans of British heavy metal drumming compared. Technique, gear, and legacy analyzed.',
    category: 'thrash',
    drummers: ['nicko-mcbrain', 'mikkey-dee'],
    comparison: {
      style: 'Nicko delivers galloping rhythms and complex patterns that underpin Iron Maiden\'s progressive metal epics. Mikkey brings explosive raw power and relentless drive to Motörhead\'s high-speed rock and roll.',
      technique: 'Nicko is a single-bass master known for intricate galloping patterns and dynamic control across long songs. Mikkey employs double bass for thunderous speed, hard-hitting snare, and a no-frills aggressive attack.',
      gear: 'Nicko plays Sonor SQ2 drums with Paiste 2002 cymbals for a bright, cutting tone. Mikkey endorses Sonor drums with Zildjian A Custom and K Series cymbals for aggressive projection.',
      influence: 'Nicko shaped British heavy metal drumming through four decades and hundreds of millions of Iron Maiden records sold. Mikkey anchored Motörhead\'s final and most celebrated live era, earning legendary status in hard rock and metal.',
    },
    verdict: 'Nicko McBrain is the technical architect of Iron Maiden\'s galloping sound — complex, melodic, and precise. Mikkey Dee is the raw force that made Motörhead\'s final years their most powerful. Both are irreplaceable NWOBHM legends who defined their respective bands\' sound.',
  },

  // Issue #1975: SEO batch — Nu-metal era rivals
  'john-otto-vs-ray-luzier': {
    slug: 'john-otto-vs-ray-luzier',
    title: 'John Otto vs Ray Luzier',
    metaTitle: 'John Otto vs Ray Luzier: Comparing Two Nu-Metal Era Legends | MetalForge',
    metaDescription: 'Limp Bizkit\'s John Otto vs Korn\'s Ray Luzier. Nu-metal drumming compared: groove vs technical precision. The Limp Bizkit vs Korn drummer showdown.',
    category: 'other',
    drummers: ['john-otto', 'ray-luzier'],
    comparison: {
      style: 'John Otto blends jazz sophistication, hip-hop groove, and metal power into Limp Bizkit\'s rap-rock foundation. Ray Luzier brings session-musician precision and modern technique to Korn\'s heavy alternative metal.',
      technique: 'John studied jazz at the Douglas Anderson School of the Arts, using syncopated patterns and funky ghost notes to create Limp Bizkit\'s signature groove. Ray excels at tight, controlled patterns with double bass fluency and dynamic range.',
      gear: 'John Otto plays Pearl drums with a hip-hop-inspired setup focused on groove and pocket. Ray endorses Pearl Reference drums with Sabian AAX cymbals for a bright, punchy attack.',
      influence: 'John Otto defined the rhythmic DNA of one of the best-selling bands of the late 1990s, bringing jazz vocabulary to mainstream metal. Ray Luzier maintains Korn\'s heavyweight nu-metal legacy while adding modern technical flair.',
    },
    verdict: 'John Otto\'s jazz-meets-hip-hop grooves made Limp Bizkit\'s sound instantly recognizable and commercially unstoppable. Ray Luzier\'s technical precision has sustained Korn\'s intensity for over a decade. Both represent nu-metal drumming at its finest.',
  },

  // Issue #1975: SEO batch — Modern thrash rivals
  'dirk-verbeuren-vs-chris-adler': {
    slug: 'dirk-verbeuren-vs-chris-adler',
    title: 'Dirk Verbeuren vs Chris Adler',
    metaTitle: 'Dirk Verbeuren vs Chris Adler: Comparing Two Modern Thrash Icons | MetalForge',
    metaDescription: 'Megadeth\'s Dirk Verbeuren vs Lamb of God\'s Chris Adler. Modern thrash drumming precision compared. Grammy-nominated rivals — technique, gear, and legacy.',
    category: 'thrash',
    drummers: ['dirk-verbeuren', 'chris-adler'],
    comparison: {
      style: 'Dirk brings European technical precision to Megadeth\'s classic thrash with blinding speed and mathematical accuracy. Chris forged a southern groove-infused thrash style with Lamb of God that defined New Wave of American Heavy Metal.',
      technique: 'Dirk is known for extreme double bass speed, technical fills, and seamless transitions between blast beats and groove. Chris pioneered precise triplet-based groove drumming with signature kick patterns and explosive snare accents.',
      gear: 'Dirk endorses Tama Starclassic Walnut/Birch drums with Zildjian A Custom and K Custom cymbals for versatile attack. Chris played DW drums with Meinl Byzance cymbals for a dark, aggressive tone.',
      influence: 'Dirk brought a new level of technical sophistication to Megadeth after joining in 2016, contributing to their Grammy-nominated "Dystopia." Chris defined the NWOAHM drumming template with Lamb of God\'s Grammy-nominated work across the 2000s and 2010s.',
    },
    verdict: 'Dirk Verbeuren is the technical perfectionist who elevated Megadeth\'s modern sound to new extremes. Chris Adler is the groove-thrash architect who built Lamb of God into a defining force of 21st-century metal. Both earned Grammy recognition — proof of their artistry.',
  },

  // Issue #1975: SEO batch — Progressive rock/metal legends
  'mike-portnoy-vs-gavin-harrison': {
    slug: 'mike-portnoy-vs-gavin-harrison',
    title: 'Mike Portnoy vs Gavin Harrison',
    metaTitle: 'Mike Portnoy vs Gavin Harrison: Comparing Two Progressive Drumming Legends | MetalForge',
    metaDescription: 'Dream Theater\'s Mike Portnoy vs Porcupine Tree\'s Gavin Harrison. The ultimate prog drummer debate: power vs finesse. Technique, gear, and legacy compared.',
    category: 'progressive',
    drummers: ['mike-portnoy', 'gavin-harrison'],
    comparison: {
      style: 'Mike Portnoy delivers theatrical progressive metal with aggressive power, massive fills, and dramatic arrangement complexity. Gavin Harrison plays with restrained sophistication, using polyrhythms and ghost notes to create prog textures that reward close listening.',
      technique: 'Mike excels at rapid-fire transitions, extreme endurance across marathon compositions, and theatrical showmanship on massive multi-bass drum kits. Gavin masterfully weaves intricate polyrhythmic patterns through odd time signatures while maintaining groove and musicality.',
      gear: 'Mike plays Tama Starclassic Maple/Birch drums with Sabian cymbals on his iconic multi-bass signature setup. Gavin uses Sonor SQ2 drums, known for their craftsmanship and tonal depth, paired with a streamlined kit philosophy.',
      influence: 'Mike Portnoy co-founded Dream Theater and shaped 1990s progressive metal, mentoring countless drummers through instructional work and YouTube presence. Gavin Harrison is a multiple Modern Drummer award winner who elevated Porcupine Tree, King Crimson, and The Pineapple Thief.',
    },
    verdict: 'Mike Portnoy is the definitive progressive metal powerhouse — explosive, theatrical, and relentless. Gavin Harrison is the prog drummer\'s drummer — subtle, sophisticated, and polyrhythmically brilliant. The debate between power and finesse makes this the ultimate prog drumming comparison.',
  },

  // Issue #2177: SEO batch — Tampa vs Miami death metal legends
  'paul-mazurkiewicz-vs-pete-sandoval': {
    slug: 'paul-mazurkiewicz-vs-pete-sandoval',
    title: 'Paul Mazurkiewicz vs Pete Sandoval',
    metaTitle: 'Paul Mazurkiewicz vs Pete Sandoval: Tampa vs Miami Death Metal Drumming | MetalForge',
    metaDescription: 'Cannibal Corpse\'s Paul Mazurkiewicz vs Morbid Angel\'s Pete Sandoval. The Tampa vs Miami school of US death metal compared. Double kick technique, blast beats, and legacy analyzed.',
    category: 'extreme',
    drummers: ['paul-mazurkiewicz', 'pete-sandoval'],
    comparison: {
      style: 'Paul anchors Cannibal Corpse\'s relentless brutality with thunderous alternating-leg double kick that drives some of death metal\'s most violent riffs. Pete defined Morbid Angel\'s occult intensity with single-footed hyperblasts and savage gravity blast technique.',
      technique: 'Paul uses a traditional alternating-leg double kick approach to sustain brutal tempos across marathon brutal death compositions. Pete pioneered the gravity blast — letting gravity and rebound do the work — enabling inhuman single-footed blast beat speeds that redefined what was physically possible.',
      gear: 'Paul plays Pearl Reference drums with Pearl Demon Drive double pedals for controlled power. Pete used Tama Artstar drums with Tama Iron Cobra pedals throughout his peak Morbid Angel years.',
      influence: 'Paul has been the backbone of the world\'s best-selling death metal band for over 35 years, anchoring every Cannibal Corpse record from "Eaten Back to Life" through the modern era. Pete\'s gravity blast invention spread through all of extreme metal — virtually every death and black metal drummer since the mid-1990s has learned the technique.',
    },
    verdict: 'Paul Mazurkiewicz is the definition of consistent, punishing death metal drumming — 35 years of brutal reliability behind the world\'s biggest death metal band. Pete Sandoval invented a physical technique that changed how drummers approach extreme speed. The Tampa vs Miami rivalry produced two of the most influential death metal drummers in history, each defining their band\'s sound absolutely.',
  },

  // Issue #2177: SEO batch — Progressive/avant-garde innovators
  'brann-dailor-vs-tomas-haake': {
    slug: 'brann-dailor-vs-tomas-haake',
    title: 'Brann Dailor vs Tomas Haake',
    metaTitle: 'Brann Dailor vs Tomas Haake: Jazz Chaos vs Polyrhythmic Machine | MetalForge',
    metaDescription: 'Mastodon\'s Brann Dailor vs Meshuggah\'s Tomas Haake. Two of metal\'s most innovative drummers compared. Jazz-informed progressive chaos vs mathematical djent precision.',
    category: 'progressive',
    drummers: ['brann-dailor', 'tomas-haake'],
    comparison: {
      style: 'Brann brings jazz-informed free-flowing chaos to Mastodon\'s progressive sludge — fills that overflow every bar, melodic tom runs that sing over the riffs, and a constant motion that makes his drumming feel alive and unpredictable. Tomas constructs polyrhythmic machinery with Meshuggah — interlocking kick, snare, and cymbal patterns across extended time signatures that feel like a computer running at human-hostile precision.',
      technique: 'Brann treats the entire kit as a melodic instrument, using his snare and toms to carry melody lines and signature fills that are as recognizable as guitar riffs. Tomas dissects rhythm into pure mathematics — his kick and snare patterns cycle across groupings that create hypnotic polyrhythms independent of the guitar riff, inventing the djent rhythmic vocabulary.',
      gear: 'Brann plays DW Collector\'s Series drums with Sabian HHX cymbals for a warm, musical tone that suits his melodic approach. Tomas uses Sonor SQ2 drums with Sabian Vault and HH Series cymbals, chosen for focused attack and projection that cut through Meshuggah\'s dense tuning.',
      influence: 'Brann co-defined the progressive sludge metal drumming approach with Mastodon from "Remission" (2002) through "Emperor of Sand," influencing a generation of rock and metal drummers to treat fills as compositional elements rather than transitions. Tomas invented djent drumming with Meshuggah from "Destroy Erase Improve" (1995) onward — every djent drummer from Periphery to Animals as Leaders traces their rhythmic DNA back to Haake.',
    },
    verdict: 'Brann Dailor is jazz chaos incarnate — a drummer who makes fills feel like melodies and turns progressive metal into an improvised conversation. Tomas Haake is the polyrhythmic machine — a drummer whose mathematical precision created an entirely new genre. Both are among the most innovative drummers in metal history, representing two opposite philosophical poles: organic freedom vs mathematical structure.',
  },

  // Issue #2177: SEO batch — Two Megadeth drummers across generations
  'nick-menza-vs-dirk-verbeuren': {
    slug: 'nick-menza-vs-dirk-verbeuren',
    title: 'Nick Menza vs Dirk Verbeuren',
    metaTitle: 'Nick Menza vs Dirk Verbeuren: Two Megadeth Drummer Eras Compared | MetalForge',
    metaDescription: 'Megadeth\'s Nick Menza (Rust in Peace era) vs Dirk Verbeuren (Dystopia era). Two generations of Megadeth drumming compared. Technique, gear, and legacy analyzed.',
    category: 'thrash',
    drummers: ['nick-menza', 'dirk-verbeuren'],
    comparison: {
      style: 'Nick Menza defined Megadeth\'s golden thrash era with aggressive power, driving grooves, and the muscular double bass that underpins "Rust in Peace" and "Countdown to Extinction." Dirk Verbeuren brought European technical extreme metal precision to Megadeth\'s modern era, adding blast beats and mathematical speed while honoring the thrash foundation.',
      technique: 'Nick combined powerful single and double bass work with aggressive fills and the driving pocket that made Megadeth\'s 1990–1994 material so punishing. Dirk applies Soilwork-trained extreme metal technique to Megadeth\'s thrash framework — seamlessly shifting from groove thrash to blast-beat-driven extreme speed within the same song.',
      gear: 'Nick played Pearl drums with Zildjian cymbals throughout his classic Megadeth tenure. Dirk endorses Tama Starclassic Walnut/Birch drums with Zildjian A Custom and K Custom cymbals, using Tama Iron Cobra 910 double pedals for technical speed.',
      influence: 'Nick Menza\'s drumming on "Rust in Peace" (1990) is canonical thrash metal — his parts on "Tornado of Souls," "Holy Wars," and "Hangar 18" are studied by every thrash drummer. Dirk Verbeuren brought Megadeth\'s drumming into the modern extreme metal era, contributing to "Dystopia" (2016) which won the Grammy for Best Metal Performance.',
    },
    verdict: 'Nick Menza\'s "Rust in Peace" drumming is one of thrash metal\'s defining performances — raw, powerful, and perfectly matched to Megadeth\'s most celebrated material. Dirk Verbeuren\'s Grammy-winning "Dystopia" work proves Megadeth\'s drumming can evolve without losing identity. The Menza era defined Megadeth\'s peak; the Verbeuren era secured their modern relevance. Both are essential chapters in one of metal\'s greatest drumming stories.',
  },

  // Issue #691: Top 20 SEO Comparison Pages - Speed vs Artistry
  'joey-jordison-vs-mike-portnoy': {
    slug: 'joey-jordison-vs-mike-portnoy',
    title: 'Joey Jordison vs Mike Portnoy',
    metaTitle: 'Joey Jordison vs Mike Portnoy: Complete Gear Comparison 2026 | MetalForge',
    metaDescription: 'Slipknot\'s Joey Jordison vs Dream Theater\'s Mike Portnoy. Extreme metal speed vs progressive metal artistry. Two iconic drummers compared.',
    category: 'progressive',
    drummers: ['joey-jordison', 'mike-portnoy'],
    comparison: {
      style: 'Joey brought extreme metal intensity to mainstream nu-metal with raw aggression. Mike delivers theatrical prog metal with complex arrangements.',
      technique: 'Joey excels at blast beats, extreme speed, and theatrical showmanship. Mike masters rapid-fire transitions, theatrical fills, and complex time signatures.',
      gear: 'Joey played Pearl drums with Paiste cymbals. Mike uses Tama drums with Sabian cymbals for his iconic sound.',
      influence: 'Joey proved extreme techniques could work in mainstream metal. Mike shaped 90s progressive metal through Dream Theater.',
    },
    verdict: 'Two different paths to drumming greatness. Joey Jordison brought extreme metal to the masses. Mike Portnoy elevated progressive metal to new heights. Both are essential to understanding modern metal drumming.',
  },

  // Issue #2164: Batch 7 — Prog/Tech Metal Comparisons
  'brann-dailor-vs-mike-portnoy': {
    slug: 'brann-dailor-vs-mike-portnoy',
    title: 'Brann Dailor vs Mike Portnoy',
    metaTitle: 'Brann Dailor vs Mike Portnoy - Mastodon vs Dream Theater Drummers | MetalForge',
    metaDescription: 'Mastodon\'s Brann Dailor vs Dream Theater\'s Mike Portnoy. Two iconic American progressive drummers — texture-as-fills vs technique-as-spectacle. Gear, style, and legacy compared.',
    category: 'progressive',
    drummers: ['brann-dailor', 'mike-portnoy'],
    comparison: {
      style: 'Brann Dailor uses drumming as a melodic texture, weaving flowing fills and jazz-influenced patterns into Mastodon\'s sludge metal. Mike Portnoy delivers technique-as-spectacle progressive metal with theatrical fills and dramatic arrangement complexity.',
      technique: 'Brann\'s constant motion style treats fills as melodic lines, blending jazz vocabulary with heavy metal energy. Mike masters rapid-fire transitions, complex time signatures, and endurance across marathon compositions on his massive multi-bass drum kit.',
      gear: 'Brann plays Tama Starclassic Performer B/B with Meinl Byzance cymbals and Vater 5B sticks. Mike uses Tama Starclassic Maple/Birch with Sabian HHX cymbals on his iconic multi-bass-drum signature setup.',
      influence: 'Brann helped define progressive sludge metal and influenced a generation of drummers who treat fills as melodic statements rather than technical showcases. Mike co-founded Dream Theater and shaped 1990s progressive metal through instructional DVDs and YouTube presence.',
    },
    verdict: 'Brann Dailor represents the organic, melody-driven approach to progressive metal drumming — his fills are the song. Mike Portnoy represents the theatrical, technically overpowering approach — his fills are the spectacle. Both are quintessentially American visions of what progressive metal drumming can be.',
  },

  'danny-carey-vs-gavin-harrison': {
    slug: 'danny-carey-vs-gavin-harrison',
    title: 'Danny Carey vs Gavin Harrison',
    metaTitle: 'Danny Carey vs Gavin Harrison - Tool vs Porcupine Tree Drummers | MetalForge',
    metaDescription: 'Tool\'s Danny Carey vs Porcupine Tree\'s Gavin Harrison. Math rock meets progressive rock — two of the deepest technical vocabularies in metal drumming compared.',
    category: 'progressive',
    drummers: ['danny-carey', 'gavin-harrison'],
    comparison: {
      style: 'Danny Carey creates hypnotic, spiritually charged progressive metal with polyrhythmic patterns built on Fibonacci sequences and sacred geometry. Gavin Harrison constructs intricate progressive rock grooves with masterful ghost notes and odd-time navigation that rewards close listening.',
      technique: 'Danny integrates Mandala electronic pads with acoustic drumming, using mathematical structures to build Tool\'s labyrinthine compositions. Gavin weaves polyrhythmic patterns through complex odd time signatures with restrained sophistication, prioritizing groove and musicality over spectacle.',
      gear: 'Danny plays Sonor SQ2 Heavy Beech drums with Paiste Signature cymbals and custom Mandala pads. Gavin uses Sonor SQ2 Series drums with Paiste Signature & 2002 cymbals — both sharing a Sonor/Paiste foundation with different approaches.',
      influence: 'Danny defined Tool\'s unique sonic universe and influenced an entire generation of prog drummers toward mathematical, spiritual approaches. Gavin elevated Porcupine Tree, King Crimson, and The Pineapple Thief with multiple Modern Drummer award wins and a reputation as the prog drummer\'s drummer.',
    },
    verdict: 'Danny Carey is the shaman-mathematician who turned Tool\'s albums into percussive spiritual experiences. Gavin Harrison is the craftsman-musician who makes impossible polyrhythms feel like conversation. Both own the deepest technical vocabularies in progressive drumming — Danny\'s draws from sacred geometry, Gavin\'s from decades of refined musicality.',
  },

  'mario-duplantier-vs-george-kollias': {
    slug: 'mario-duplantier-vs-george-kollias',
    title: 'Mario Duplantier vs George Kollias',
    metaTitle: 'Mario Duplantier vs George Kollias - Modern Extreme Metal Drumming | MetalForge',
    metaDescription: 'Gojira\'s Mario Duplantier vs Nile\'s George Kollias. Eco-metal atmospheric power vs ancient Egyptian death metal speed. Two modern extreme metal drumming giants compared.',
    category: 'extreme',
    drummers: ['mario-duplantier', 'george-kollias'],
    comparison: {
      style: 'Mario Duplantier combines tribal, atmospheric drumming with progressive death metal for Gojira\'s "environmental metal" sound. George Kollias delivers relentless ancient-Egyptian-themed technical brutality with Nile, sustaining extreme blast beats at speeds that redefine human limits.',
      technique: 'Mario uses tribal power, explosive accents, and stamina-driven endurance across Gojira\'s massive, atmospheric compositions. George employs heel-toe technique for sustained blast beats at 280+ BPM, combining mechanical precision with technical death metal complexity.',
      gear: 'Mario endorses Tama Starclassic Bubinga drums with Zildjian K Sweet and A Custom cymbals and Tama signature sticks. George plays Pearl Reference drums with Pearl Demon Drive pedals specifically engineered for extreme-tempo double bass.',
      influence: 'Mario pioneered the environmental metal drumming style and influences modern prog-death drummers worldwide, with 20%+ organic search CTR on Gojira-related queries. George raised the ceiling for technical death metal speed and precision, inspiring a generation of extreme drummers.',
    },
    verdict: 'Mario Duplantier brings atmospheric, eco-conscious tribal power to extreme metal — his drumming breathes with the music. George Kollias brings ancient-world ferocity and machine-like speed to death metal — his drumming overwhelms with precision. Both are the defining modern voices of extreme metal drumming, each operating at the peak of their chosen approach.',
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
  
  // Issue #691: Include year in title for SEO
  const currentYear = new Date().getFullYear();
  
  return {
    slug: comparisonSlug,
    title: `${drummer1.name} vs ${drummer2.name}`,
    metaTitle: `${drummer1.name} vs ${drummer2.name}: Complete Gear Comparison ${currentYear} | MetalForge`,
    metaDescription: `Compare ${drummer1.name} (${drummer1.band}) and ${drummer2.name} (${drummer2.band}). Drums, cymbals, hardware side-by-side. Vote for your favorite!`,
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
