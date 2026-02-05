// Quiz Questions and Drummer Profiles - extracted for code splitting
// This file is lazy-loaded only when the quiz is accessed

export const QUIZ_QUESTIONS = [
  {
    id: 'genre',
    question: "What's your preferred metal subgenre?",
    options: [
      { value: 'thrash', label: '🤘 Thrash Metal', description: 'Fast riffs, aggressive drumming' },
      { value: 'death', label: '💀 Death Metal', description: 'Brutal blast beats, technical precision' },
      { value: 'progressive', label: '🌀 Progressive Metal', description: 'Complex time signatures, musical exploration' },
      { value: 'nu-metal', label: '🔥 Nu-Metal', description: 'Groovy, hip-hop influenced' },
      { value: 'black', label: '⚫ Black Metal', description: 'Raw, atmospheric, relentless' },
      { value: 'groove', label: '💪 Groove Metal', description: 'Heavy grooves, powerful rhythms' },
    ]
  },
  {
    id: 'tempo',
    question: "What's your preferred playing tempo?",
    options: [
      { value: 'extreme', label: '🚀 Extreme (220+ BPM)', description: 'Blast beats, grindcore speed' },
      { value: 'fast', label: '⚡ Fast (180-220 BPM)', description: 'Thrash and speed metal territory' },
      { value: 'medium', label: '🎯 Medium (120-180 BPM)', description: 'Groove-friendly, headbang zone' },
      { value: 'slow', label: '🌊 Slow & Heavy (<120 BPM)', description: 'Doom, sludge, crushing weight' },
      { value: 'varied', label: '🔄 All Over the Map', description: 'Love tempo changes and dynamics' },
    ]
  },
  {
    id: 'style',
    question: "How would you describe your playing style?",
    options: [
      { value: 'speed', label: '⚡ Speed Demon', description: 'Faster is better, blast beats all day' },
      { value: 'groove', label: '🎯 Groove Master', description: 'Lock in the pocket, make heads bang' },
      { value: 'technical', label: '🧠 Technical Wizard', description: 'Complex patterns, odd time signatures' },
      { value: 'power', label: '💥 Power Hitter', description: 'Heavy and loud, shake the stage' },
      { value: 'versatile', label: '🎭 Versatile Player', description: 'Adapt to any situation' },
    ]
  },
  {
    id: 'kit',
    question: "What's your ideal drum kit setup?",
    options: [
      { value: 'massive', label: '🏔️ Massive Kit', description: 'Double bass, multiple toms, all the cymbals' },
      { value: 'minimal', label: '🎯 Minimal Setup', description: 'Just the essentials, stripped down' },
      { value: 'hybrid', label: '🔌 Hybrid Kit', description: 'Acoustic + electronic triggers' },
      { value: 'classic', label: '🥁 Classic 4-Piece', description: 'Traditional setup, timeless sound' },
    ]
  },
  {
    id: 'brand',
    question: "Which drum brand speaks to you?",
    options: [
      { value: 'tama', label: 'Tama', description: 'Precision engineering, versatile sound' },
      { value: 'pearl', label: 'Pearl', description: 'Industry standard, reliable power' },
      { value: 'sonor', label: 'Sonor', description: 'German craftsmanship, unique tone' },
      { value: 'dw', label: 'DW', description: 'Premium quality, custom options' },
      { value: 'mapex', label: 'Mapex', description: 'Innovation meets value' },
      { value: 'any', label: "Doesn't matter", description: 'Sound over brand' },
    ]
  },
  {
    id: 'personality',
    question: "What drives you as a drummer?",
    options: [
      { value: 'pioneer', label: '🚀 Pioneer', description: 'Push boundaries, create new sounds' },
      { value: 'perfectionist', label: '✨ Perfectionist', description: 'Every note must be precise' },
      { value: 'showman', label: '🎪 Showman', description: 'Entertain the crowd, visual spectacle' },
      { value: 'servant', label: '🎵 Song Servant', description: 'Serve the music, support the band' },
      { value: 'innovator', label: '💡 Innovator', description: 'Experiment with new techniques' },
    ]
  },
  {
    id: 'era',
    question: "Which era of metal drumming inspires you most?",
    options: [
      { value: '80s', label: '🎸 80s', description: 'Birth of thrash, classic metal' },
      { value: '90s', label: '📼 90s', description: 'Death metal peak, nu-metal rise' },
      { value: '2000s', label: '💿 2000s', description: 'Metalcore, djent emergence' },
      { value: '2010s', label: '📱 2010s+', description: 'Modern technical mastery' },
    ]
  },
];

// Drummer matching profiles (maps answers to drummer traits)
export const DRUMMER_PROFILES = {
  1: { // Lars Ulrich
    genres: ['thrash'],
    styles: ['power', 'groove'],
    kits: ['massive', 'classic'],
    eras: ['80s'],
    tempos: ['fast', 'medium'],
    fills: ['power', 'minimal'],
    doubleBass: ['moderate', 'occasional'],
  },
  2: { // Joey Jordison
    genres: ['nu-metal', 'death'],
    styles: ['speed', 'technical'],
    kits: ['massive', 'hybrid'],
    eras: ['90s', '2000s'],
    tempos: ['extreme', 'fast'],
    fills: ['flashy', 'technical'],
    doubleBass: ['essential', 'important'],
  },
  3: { // Gene Hoglan
    genres: ['death', 'thrash', 'progressive'],
    styles: ['technical', 'speed'],
    kits: ['massive'],
    eras: ['80s', '90s'],
    tempos: ['extreme', 'fast', 'varied'],
    fills: ['technical', 'creative'],
    doubleBass: ['essential', 'important'],
  },
  4: { // Dave Lombardo
    genres: ['thrash'],
    styles: ['speed', 'power'],
    kits: ['classic', 'massive'],
    eras: ['80s'],
    tempos: ['extreme', 'fast'],
    fills: ['flashy', 'power'],
    doubleBass: ['essential', 'important'],
  },
  5: { // Tomas Haake
    genres: ['progressive'],
    styles: ['technical', 'groove'],
    kits: ['hybrid', 'massive'],
    eras: ['90s', '2000s'],
    tempos: ['medium', 'varied'],
    fills: ['technical', 'creative'],
    doubleBass: ['important', 'moderate'],
  },
  6: { // George Kollias
    genres: ['death'],
    styles: ['speed', 'technical'],
    kits: ['massive'],
    eras: ['2000s'],
    tempos: ['extreme'],
    fills: ['technical', 'flashy'],
    doubleBass: ['essential'],
  },
  7: { // Eloy Casagrande
    genres: ['thrash', 'nu-metal'],
    styles: ['speed', 'versatile'],
    kits: ['massive'],
    eras: ['2010s'],
    tempos: ['extreme', 'fast', 'varied'],
    fills: ['flashy', 'technical'],
    doubleBass: ['essential', 'important'],
  },
  8: { // Ray Luzier
    genres: ['nu-metal'],
    styles: ['groove', 'versatile'],
    kits: ['classic', 'massive'],
    eras: ['2000s'],
    tempos: ['medium', 'varied'],
    fills: ['creative', 'technical'],
    doubleBass: ['moderate', 'important'],
  },
  9: { // John Otto
    genres: ['nu-metal'],
    styles: ['groove'],
    kits: ['classic'],
    eras: ['90s'],
    tempos: ['medium', 'slow'],
    fills: ['minimal', 'creative'],
    doubleBass: ['occasional', 'minimal'],
  },
  10: { // Jay Weinberg
    genres: ['nu-metal'],
    styles: ['power', 'speed'],
    kits: ['massive'],
    eras: ['2010s'],
    tempos: ['fast', 'extreme'],
    fills: ['power', 'flashy'],
    doubleBass: ['essential', 'important'],
  },
  11: { // Vinnie Paul
    genres: ['groove', 'thrash'],
    styles: ['groove', 'power'],
    kits: ['massive'],
    eras: ['80s', '90s'],
    tempos: ['medium', 'fast'],
    fills: ['power', 'flashy'],
    doubleBass: ['important', 'essential'],
  },
  12: { // Charlie Benante
    genres: ['thrash'],
    styles: ['speed', 'technical'],
    kits: ['classic', 'hybrid'],
    eras: ['80s'],
    tempos: ['fast', 'extreme'],
    fills: ['technical', 'flashy'],
    doubleBass: ['essential', 'important'],
  },
  13: { // Mike Portnoy
    genres: ['progressive'],
    styles: ['technical', 'versatile'],
    kits: ['massive', 'hybrid'],
    eras: ['80s', '90s', '2000s'],
    tempos: ['varied', 'fast', 'medium'],
    fills: ['flashy', 'technical', 'creative'],
    doubleBass: ['important', 'essential'],
  },
  14: { // Danny Carey
    genres: ['progressive'],
    styles: ['technical', 'groove'],
    kits: ['massive', 'hybrid'],
    eras: ['90s'],
    tempos: ['medium', 'varied'],
    fills: ['creative', 'technical'],
    doubleBass: ['moderate', 'important'],
  },
  15: { // Mario Duplantier
    genres: ['death', 'progressive'],
    styles: ['power', 'technical'],
    kits: ['classic', 'massive'],
    eras: ['2000s'],
    tempos: ['fast', 'varied'],
    fills: ['creative', 'power'],
    doubleBass: ['essential', 'important'],
  },
  16: { // Brann Dailor
    genres: ['progressive', 'groove'],
    styles: ['technical', 'versatile'],
    kits: ['classic'],
    eras: ['2000s'],
    tempos: ['varied', 'fast'],
    fills: ['technical', 'creative'],
    doubleBass: ['moderate', 'occasional'],
  },
  17: { // Chris Adler
    genres: ['groove'],
    styles: ['groove', 'power'],
    kits: ['classic', 'massive'],
    eras: ['2000s'],
    tempos: ['fast', 'medium'],
    fills: ['power', 'technical'],
    doubleBass: ['essential', 'important'],
  },
  18: { // Matt Halpern
    genres: ['progressive'],
    styles: ['technical', 'groove'],
    kits: ['hybrid', 'massive'],
    eras: ['2010s'],
    tempos: ['medium', 'varied'],
    fills: ['technical', 'creative'],
    doubleBass: ['important', 'moderate'],
  },
  19: { // Inferno
    genres: ['black', 'death'],
    styles: ['speed', 'power'],
    kits: ['massive'],
    eras: ['90s'],
    tempos: ['extreme'],
    fills: ['flashy', 'power'],
    doubleBass: ['essential'],
  },
  20: { // Hellhammer
    genres: ['black'],
    styles: ['speed', 'power'],
    kits: ['classic'],
    eras: ['80s', '90s'],
    tempos: ['extreme', 'fast'],
    fills: ['power', 'minimal'],
    doubleBass: ['essential', 'important'],
  },
  21: { // Pete Sandoval
    genres: ['death'],
    styles: ['speed', 'technical'],
    kits: ['massive'],
    eras: ['80s'],
    tempos: ['extreme'],
    fills: ['flashy', 'technical'],
    doubleBass: ['essential'],
  },
  22: { // Art Cruz
    genres: ['groove', 'thrash'],
    styles: ['power', 'groove'],
    kits: ['massive'],
    eras: ['2010s'],
    tempos: ['fast', 'medium'],
    fills: ['power', 'flashy'],
    doubleBass: ['essential', 'important'],
  },
  23: { // Arin Ilejay
    genres: ['thrash', 'progressive'],
    styles: ['power', 'versatile'],
    kits: ['classic', 'massive'],
    eras: ['2010s'],
    tempos: ['fast', 'medium', 'varied'],
    fills: ['power', 'technical'],
    doubleBass: ['important', 'moderate'],
  },
  24: { // Navene Koperweis
    genres: ['progressive', 'death'],
    styles: ['technical', 'groove'],
    kits: ['hybrid', 'massive'],
    eras: ['2010s'],
    tempos: ['varied', 'medium'],
    fills: ['creative', 'technical'],
    doubleBass: ['moderate', 'important'],
  },
  25: { // Alex Bent
    genres: ['thrash', 'death'],
    styles: ['technical', 'speed'],
    kits: ['massive'],
    eras: ['2010s'],
    tempos: ['extreme', 'fast'],
    fills: ['technical', 'flashy'],
    doubleBass: ['essential', 'important'],
  },
  26: { // Shannon Larkin
    genres: ['nu-metal', 'groove'],
    styles: ['groove', 'power'],
    kits: ['classic', 'massive'],
    eras: ['90s', '2000s'],
    tempos: ['medium', 'slow'],
    fills: ['power', 'minimal'],
    doubleBass: ['moderate', 'occasional'],
  },
  27: { // Raymond Herrera
    genres: ['groove', 'death'],
    styles: ['technical', 'power'],
    kits: ['massive'],
    eras: ['90s'],
    tempos: ['fast', 'extreme'],
    fills: ['technical', 'power'],
    doubleBass: ['essential', 'important'],
  },
  28: { // Morgan Ågren
    genres: ['progressive'],
    styles: ['technical', 'versatile'],
    kits: ['hybrid', 'classic'],
    eras: ['90s', '2000s'],
    tempos: ['varied'],
    fills: ['creative', 'technical'],
    doubleBass: ['moderate', 'occasional'],
  },
  29: { // Igor Cavalera
    genres: ['thrash', 'groove', 'death'],
    styles: ['power', 'groove'],
    kits: ['classic', 'massive'],
    eras: ['80s', '90s'],
    tempos: ['fast', 'medium'],
    fills: ['power', 'creative'],
    doubleBass: ['important', 'essential'],
  },
  30: { // Bill Ward
    genres: ['groove'],
    styles: ['groove', 'versatile'],
    kits: ['classic'],
    eras: ['80s'],
    tempos: ['slow', 'medium'],
    fills: ['creative', 'minimal'],
    doubleBass: ['minimal', 'occasional'],
  },
};

// Calculate match scores for all drummers
export function calculateMatches(answers, drummers) {
  const scores = drummers.map(drummer => {
    const profile = DRUMMER_PROFILES[drummer.id];
    if (!profile) return { drummer, score: 0, reasons: [] };

    let score = 0;
    const reasons = [];

    // Genre match (high weight - 25 points)
    if (answers.genre && profile.genres.includes(answers.genre)) {
      score += 25;
      reasons.push('genre preference');
    }

    // Tempo match (high weight - 20 points)
    if (answers.tempo && profile.tempos && profile.tempos.includes(answers.tempo)) {
      score += 20;
      reasons.push('tempo preference');
    }

    // Style match (high weight - 20 points)
    if (answers.style && profile.styles.includes(answers.style)) {
      score += 20;
      reasons.push('playing style');
    }

    // Fill preference match (medium weight - 12 points)
    if (answers.fills && profile.fills && profile.fills.includes(answers.fills)) {
      score += 12;
      reasons.push('fill style');
    }

    // Double bass importance match (medium weight - 12 points)
    if (answers.doubleBass && profile.doubleBass && profile.doubleBass.includes(answers.doubleBass)) {
      score += 12;
      reasons.push('double bass approach');
    }

    // Kit preference match (lower weight - 6 points)
    if (answers.kit && profile.kits.includes(answers.kit)) {
      score += 6;
      reasons.push('kit setup');
    }

    // Era match (lower weight - 5 points)
    if (answers.era && profile.eras.includes(answers.era)) {
      score += 5;
      reasons.push('era influence');
    }

    return { drummer, score, reasons };
  });

  // Sort by score descending
  return scores.sort((a, b) => b.score - a.score);
}
