// Vercel Serverless Function - List all genres with metadata
// Issue #340: Genre filter and genre landing pages

export const genres = [
  {
    id: 'thrash-metal',
    name: 'Thrash Metal',
    description: 'Thrash metal emerged in the early 1980s, characterized by fast tempos, aggressive riffs, and complex guitar work. Drumming in thrash emphasizes speed, precision, and powerful double bass patterns. Pioneered by bands like Metallica, Slayer, Megadeth, and Anthrax, thrash drumming requires exceptional endurance and tight coordination with rapid tempo changes.',
    characteristics: [
      'Fast double bass drumming (160-220+ BPM)',
      'Aggressive, driving snare patterns',
      'Quick hi-hat work and ride cymbal attacks',
      'Complex fill patterns between sections',
      'Tight synchronization with palm-muted guitar riffs'
    ],
    relatedGenres: ['heavy-metal', 'death-metal', 'groove-metal', 'hardcore-punk'],
    era: '1983-present',
    icon: '⚡'
  },
  {
    id: 'death-metal',
    name: 'Death Metal',
    description: 'Death metal pushes extreme drumming to its limits with blast beats, gravity blasts, and relentless double bass. Originating in the mid-1980s from bands like Death, Morbid Angel, and Obituary, the genre demands extraordinary stamina and technical precision. Drummers often incorporate complex time signatures and polyrhythmic patterns.',
    characteristics: [
      'Blast beats (200-280+ BPM)',
      'Gravity blasts and one-handed rolls',
      'Constant double bass patterns',
      'Brutal, low-tuned drum sounds',
      'Polyrhythmic complexity'
    ],
    relatedGenres: ['technical-death-metal', 'thrash-metal', 'grindcore', 'black-metal'],
    era: '1985-present',
    icon: '💀'
  },
  {
    id: 'black-metal',
    name: 'Black Metal',
    description: 'Black metal drumming is characterized by relentless blast beats, tremolo picking accompaniment, and raw, lo-fi production. Originating in Norway in the early 1990s with bands like Mayhem, Darkthrone, and Emperor, black metal drums create an atmospheric wall of sound that supports the genre\'s dark, aggressive aesthetic.',
    characteristics: [
      'Continuous blast beats',
      'Raw, organic drum sound',
      'D-beat and punk influences',
      'Atmospheric cymbal work',
      'Minimalist yet intense approach'
    ],
    relatedGenres: ['death-metal', 'thrash-metal', 'doom-metal'],
    era: '1990-present',
    icon: '🖤'
  },
  {
    id: 'progressive-metal',
    name: 'Progressive Metal',
    description: 'Progressive metal combines heavy metal with complex compositions, unusual time signatures, and technical virtuosity. Drummers like Mike Portnoy (Dream Theater) and Danny Carey (Tool) defined the genre with intricate polyrhythms, odd meters, and jazz-influenced techniques. The style demands both power and finesse.',
    characteristics: [
      'Complex time signatures (7/8, 11/8, 13/16)',
      'Polyrhythmic layering',
      'Dynamic range from soft to heavy',
      'Jazz and fusion influences',
      'Extended compositions with multiple sections'
    ],
    relatedGenres: ['djent', 'technical-death-metal', 'heavy-metal'],
    era: '1985-present',
    icon: '🎭'
  },
  {
    id: 'nu-metal',
    name: 'Nu Metal',
    description: 'Nu metal emerged in the late 1990s, blending heavy metal with hip-hop, grunge, and alternative rock. Drummers like Joey Jordison (Slipknot), John Otto (Limp Bizkit), and David Silveria (Korn) created groovy, syncopated patterns that emphasized feel over pure speed. The style features heavy use of samples and electronic elements.',
    characteristics: [
      'Hip-hop influenced grooves',
      'Syncopated, bouncy patterns',
      'Heavy emphasis on snare and bass drum interplay',
      'Incorporation of electronic elements',
      'Powerful, produced drum sounds'
    ],
    relatedGenres: ['groove-metal', 'heavy-metal', 'hardcore-punk'],
    era: '1994-2005 (peak), ongoing',
    icon: '🔥'
  },
  {
    id: 'groove-metal',
    name: 'Groove Metal',
    description: 'Groove metal emphasizes mid-tempo, heavy grooves over speed. Pioneered by Pantera, Exhumer, and Machine Head in the early 1990s, the style features powerful, syncopated rhythms that make audiences headbang. Drummers like Vinnie Paul perfected the art of the heavy groove with impeccable timing and thunderous double bass.',
    characteristics: [
      'Mid-tempo, heavy grooves (90-140 BPM)',
      'Syncopated kick patterns',
      'Powerful, punchy snare hits',
      'Half-time feel sections',
      'Tight lock with bass guitar'
    ],
    relatedGenres: ['thrash-metal', 'nu-metal', 'heavy-metal', 'sludge-metal'],
    era: '1990-present',
    icon: '💪'
  },
  {
    id: 'metalcore',
    name: 'Metalcore',
    description: 'Metalcore fuses heavy metal with hardcore punk, featuring breakdowns, blast beats, and dynamic song structures. Drummers must navigate between crushing breakdowns and intense verse sections. Bands like Killswitch Engage, As I Lay Dying, and Parkway Drive showcase the genre\'s demanding drumming requirements.',
    characteristics: [
      'Breakdown sections with half-time grooves',
      'Blast beats in verse sections',
      'Dynamic tempo changes',
      'China cymbal accents',
      'Punk-influenced energy with metal precision'
    ],
    relatedGenres: ['hardcore-punk', 'melodic-death-metal', 'thrash-metal'],
    era: '1998-present',
    icon: '⚔️'
  },
  {
    id: 'djent',
    name: 'Djent',
    description: 'Djent is characterized by heavily palm-muted, syncopated guitar riffs and polyrhythmic drumming. Named after the distinctive guitar tone, the style was pioneered by Meshuggah and expanded by bands like Periphery, Animals As Leaders, and TesseracT. Drummers must master complex polymeters and maintain precision at various tempos.',
    characteristics: [
      'Polyrhythmic patterns against 4/4',
      'Syncopated kick drum patterns',
      'Ghost notes and intricate hi-hat work',
      'Metric modulation',
      'Electronic hybrid drum setups'
    ],
    relatedGenres: ['progressive-metal', 'technical-death-metal', 'metalcore'],
    era: '2002-present',
    icon: '🔧'
  },
  {
    id: 'heavy-metal',
    name: 'Heavy Metal',
    description: 'Heavy metal is the foundation of all metal subgenres, originating with Black Sabbath, Judas Priest, and Iron Maiden. Classic heavy metal drumming emphasizes power, groove, and the ability to drive a song forward. Drummers like Clive Burr, Nicko McBrain, and Scott Travis set the template for metal drumming.',
    characteristics: [
      'Powerful, driving beats',
      'Galloping rhythms (NWOBHM)',
      'Solid groove and pocket',
      'Tasteful use of double bass',
      'Dynamic fills and transitions'
    ],
    relatedGenres: ['thrash-metal', 'power-metal', 'groove-metal'],
    era: '1970-present',
    icon: '🤘'
  },
  {
    id: 'power-metal',
    name: 'Power Metal',
    description: 'Power metal features fast tempos, melodic vocals, and triumphant, anthemic compositions. Drumming emphasizes double bass speed with driving beats that support soaring melodies. European power metal bands like Helloween, Blind Guardian, and Stratovarius popularized the genre\'s signature sound.',
    characteristics: [
      'Fast double bass (140-180 BPM)',
      'Driving, uplifting beats',
      'Galloping patterns',
      'Dynamic crescendos',
      'Precise, clean technique'
    ],
    relatedGenres: ['heavy-metal', 'thrash-metal', 'progressive-metal'],
    era: '1984-present',
    icon: '🛡️'
  },
  {
    id: 'technical-death-metal',
    name: 'Technical Death Metal',
    description: 'Technical death metal pushes instrumental virtuosity to the extreme. Drummers like George Kollias (Nile), Flo Mounier (Cryptopsy), and Sean Reinert (Cynic) showcase superhuman speed, precision, and creativity. The style demands mastery of blast beats, odd time signatures, and complex polyrhythmic patterns.',
    characteristics: [
      'Extreme speed blast beats (250+ BPM)',
      'Complex time signature changes',
      'Polyrhythmic and polymetric patterns',
      'Jazz-influenced fills',
      'Incredible stamina and precision'
    ],
    relatedGenres: ['death-metal', 'progressive-metal', 'grindcore'],
    era: '1990-present',
    icon: '🧠'
  },
  {
    id: 'melodic-death-metal',
    name: 'Melodic Death Metal',
    description: 'Melodic death metal combines the aggression of death metal with melodic guitar harmonies and more structured songwriting. Originating in Gothenburg, Sweden, bands like At The Gates, In Flames, and Dark Tranquillity created the "Gothenburg sound." Drumming balances blast beats with groovier sections.',
    characteristics: [
      'Blend of blast beats and grooves',
      'Driving double bass under melodies',
      'Dynamic song structures',
      'Tight coordination with twin guitar harmonies',
      'Scandinavian influence'
    ],
    relatedGenres: ['death-metal', 'thrash-metal', 'metalcore'],
    era: '1993-present',
    icon: '🎸'
  },
  {
    id: 'sludge-metal',
    name: 'Sludge Metal',
    description: 'Sludge metal combines the slow, heavy riffs of doom metal with the aggression of hardcore punk. Bands like Mastodon, Crowbar, and Eyehategod feature drumming that ranges from crushing slow tempos to explosive, fast sections. The style emphasizes groove, heaviness, and raw power.',
    characteristics: [
      'Slow to mid-tempo heaviness',
      'Punk-influenced sections',
      'Raw, powerful drum sound',
      'Dynamic tempo shifts',
      'Heavy groove emphasis'
    ],
    relatedGenres: ['doom-metal', 'hardcore-punk', 'groove-metal'],
    era: '1988-present',
    icon: '🐌'
  },
  {
    id: 'industrial-metal',
    name: 'Industrial Metal',
    description: 'Industrial metal merges heavy metal with electronic music, sampling, and mechanical rhythms. Bands like Ministry, Fear Factory, and Rammstein feature drumming that locks in with programmed elements. Drummers must balance human feel with machine-like precision.',
    characteristics: [
      'Machine-like precision',
      'Integration with electronic elements',
      'Heavy, triggered drum sounds',
      'Repetitive, hypnotic patterns',
      'Syncopation with programmed beats'
    ],
    relatedGenres: ['groove-metal', 'nu-metal', 'death-metal'],
    era: '1989-present',
    icon: '⚙️'
  },
  {
    id: 'hardcore-punk',
    name: 'Hardcore / Crossover',
    description: 'Hardcore punk drumming emphasizes raw energy, speed, and aggression. Crossover thrash combines this with metal\'s technicality. Bands like D.R.I., Suicidal Tendencies, and Municipal Waste feature drummers who blend punk\'s raw power with metal\'s precision.',
    characteristics: [
      'D-beat and skank beats',
      'Fast, aggressive tempos',
      'Raw, energetic approach',
      'Tight, punchy sound',
      'Seamless punk-metal transitions'
    ],
    relatedGenres: ['thrash-metal', 'metalcore', 'grindcore'],
    era: '1980-present',
    icon: '💥'
  },
  {
    id: 'grindcore',
    name: 'Grindcore',
    description: 'Grindcore is one of the most extreme metal subgenres, featuring ultra-fast tempos, blast beats, and microsecond-length songs. Drummers must maintain extreme speeds while navigating chaotic song structures. Napalm Death, Carcass, and Brutal Truth defined the genre\'s punishing percussion.',
    characteristics: [
      'Extreme blast beats (280+ BPM)',
      'Gravity blast technique',
      'Chaotic song structures',
      'Punk-derived energy',
      'Relentless intensity'
    ],
    relatedGenres: ['death-metal', 'hardcore-punk', 'technical-death-metal'],
    era: '1986-present',
    icon: '💣'
  },
  {
    id: 'doom-metal',
    name: 'Doom Metal',
    description: 'Doom metal features slow, heavy riffs and a dark, melancholic atmosphere. Drumming emphasizes powerful, deliberate hits that support the genre\'s crushing weight. Bands like Black Sabbath, Candlemass, and Electric Wizard showcase the importance of groove and dynamics in slower tempos.',
    characteristics: [
      'Slow, crushing tempos (40-80 BPM)',
      'Powerful, deliberate hits',
      'Sparse but impactful patterns',
      'Dynamic use of space',
      'Heavy, resonant drum sounds'
    ],
    relatedGenres: ['sludge-metal', 'heavy-metal', 'black-metal'],
    era: '1970-present',
    icon: '⚰️'
  }
];

// Get genre by slug
export function getGenreBySlug(slug) {
  return genres.find(g => g.id === slug);
}

// Get related genres with full objects
export function getRelatedGenres(genreId) {
  const genre = getGenreBySlug(genreId);
  if (!genre) return [];
  return genre.relatedGenres
    .map(id => getGenreBySlug(id))
    .filter(Boolean);
}

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Return all genres with their metadata
  res.status(200).json(genres.map(g => ({
    id: g.id,
    name: g.name,
    description: g.description,
    characteristics: g.characteristics,
    relatedGenres: g.relatedGenres,
    era: g.era,
    icon: g.icon
  })));
}
