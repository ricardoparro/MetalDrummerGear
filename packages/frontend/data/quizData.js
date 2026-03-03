// Quiz Questions and Drummer Profiles - extracted for code splitting
// Issue #637: "Which Metal Drummer Are You?" interactive quiz
// This file is lazy-loaded only when the quiz is accessed

export const QUIZ_QUESTIONS = [
  {
    id: 'tempo',
    question: "What's your go-to tempo?",
    options: [
      { value: 'slow', label: '🌊 Slow Grooves', description: 'Doom & sludge territory, crushing weight' },
      { value: 'mid', label: '🎯 Mid-Tempo', description: 'Groove-friendly, headbang zone' },
      { value: 'fast', label: '⚡ Fast', description: 'Thrash and speed metal territory' },
      { value: 'blast', label: '🚀 Blast Beats', description: 'Extreme speed, grindcore intensity' },
    ]
  },
  {
    id: 'genre',
    question: "Favorite metal subgenre?",
    options: [
      { value: 'thrash', label: '🤘 Thrash', description: 'Fast riffs, aggressive drumming' },
      { value: 'death', label: '💀 Death', description: 'Brutal blast beats, technical precision' },
      { value: 'black', label: '⚫ Black', description: 'Raw, atmospheric, relentless' },
      { value: 'prog', label: '🌀 Progressive', description: 'Complex time signatures, musical exploration' },
      { value: 'djent', label: '🔌 Djent', description: 'Polyrhythms, tight syncopation' },
      { value: 'groove', label: '💪 Groove', description: 'Heavy grooves, powerful rhythms' },
    ]
  },
  {
    id: 'cymbals',
    question: "Cymbal setup size?",
    options: [
      { value: 'minimal', label: '🎯 Minimal (3-4)', description: 'Just the essentials' },
      { value: 'moderate', label: '⚖️ Moderate (5-7)', description: 'Balanced selection' },
      { value: 'forest', label: '🏔️ Forest (8+)', description: 'Maximum options' },
    ]
  },
  {
    id: 'doubleBass',
    question: "Double bass usage?",
    options: [
      { value: 'rarely', label: '🦶 Rarely', description: 'Single pedal vibes' },
      { value: 'sometimes', label: '🎵 Sometimes', description: 'When the song calls for it' },
      { value: 'often', label: '🔥 Often', description: 'Key part of your sound' },
      { value: 'always', label: '💥 Always', description: 'Double bass is life' },
    ]
  },
  {
    id: 'budget',
    question: "Budget preference?",
    options: [
      { value: 'practical', label: '💰 Practical', description: 'Value for money, smart choices' },
      { value: 'balanced', label: '⚖️ Balanced', description: 'Quality meets affordability' },
      { value: 'premium', label: '💎 Premium', description: 'Top-tier gear, pro quality' },
      { value: 'unlimited', label: '🚀 No Limits', description: 'Only the best will do' },
    ]
  },
  {
    id: 'presence',
    question: "Stage presence?",
    options: [
      { value: 'technical', label: '🎯 Technical Precision', description: 'Every note perfect, clean execution' },
      { value: 'energy', label: '⚡ High Energy', description: 'Showmanship, visual spectacle' },
      { value: 'power', label: '💥 Brutal Power', description: 'Heavy hits, shake the venue' },
    ]
  },
  {
    id: 'snare',
    question: "Snare sound?",
    options: [
      { value: 'tight', label: '🔔 Tight/Poppy', description: 'Crisp attack, cutting through' },
      { value: 'mid', label: '🥁 Mid/Balanced', description: 'Versatile, well-rounded' },
      { value: 'deep', label: '🌊 Deep/Thunder', description: 'Fat tone, massive presence' },
    ]
  },
  {
    id: 'complexity',
    question: "Setup complexity?",
    options: [
      { value: 'simple', label: '🎯 Simple & Reliable', description: 'Less is more, road-ready' },
      { value: 'moderate', label: '⚖️ Moderate', description: 'Enough options without overkill' },
      { value: 'complex', label: '🔧 Complex & Custom', description: 'Every piece tailored to you' },
    ]
  },
];

// Drummer matching profiles (maps answers to drummer traits)
// Scores are weighted by how strongly each trait matches the drummer
export const DRUMMER_PROFILES = {
  1: { // Lars Ulrich
    tempos: ['mid', 'fast'],
    genres: ['thrash'],
    cymbals: ['moderate', 'forest'],
    doubleBass: ['sometimes', 'often'],
    budget: ['premium', 'unlimited'],
    presence: ['energy', 'power'],
    snare: ['mid', 'tight'],
    complexity: ['moderate'],
  },
  2: { // Joey Jordison
    tempos: ['fast', 'blast'],
    genres: ['death', 'groove'],
    cymbals: ['forest'],
    doubleBass: ['always', 'often'],
    budget: ['premium', 'unlimited'],
    presence: ['energy', 'power'],
    snare: ['tight', 'mid'],
    complexity: ['complex'],
  },
  3: { // Gene Hoglan
    tempos: ['fast', 'blast'],
    genres: ['death', 'thrash', 'prog'],
    cymbals: ['forest'],
    doubleBass: ['always', 'often'],
    budget: ['premium'],
    presence: ['technical', 'power'],
    snare: ['mid', 'deep'],
    complexity: ['complex'],
  },
  4: { // Dave Lombardo
    tempos: ['fast', 'blast'],
    genres: ['thrash'],
    cymbals: ['moderate', 'forest'],
    doubleBass: ['always', 'often'],
    budget: ['premium', 'unlimited'],
    presence: ['energy', 'power'],
    snare: ['tight', 'mid'],
    complexity: ['moderate'],
  },
  5: { // Tomas Haake
    tempos: ['mid', 'fast'],
    genres: ['prog', 'djent'],
    cymbals: ['forest'],
    doubleBass: ['often', 'always'],
    budget: ['premium', 'unlimited'],
    presence: ['technical'],
    snare: ['tight'],
    complexity: ['complex'],
  },
  6: { // George Kollias
    tempos: ['blast', 'fast'],
    genres: ['death'],
    cymbals: ['forest'],
    doubleBass: ['always'],
    budget: ['premium', 'unlimited'],
    presence: ['technical', 'power'],
    snare: ['tight'],
    complexity: ['complex'],
  },
  7: { // Eloy Casagrande
    tempos: ['fast', 'blast'],
    genres: ['thrash', 'death'],
    cymbals: ['forest'],
    doubleBass: ['always', 'often'],
    budget: ['premium'],
    presence: ['energy', 'technical'],
    snare: ['tight', 'mid'],
    complexity: ['complex', 'moderate'],
  },
  8: { // Ray Luzier
    tempos: ['mid', 'fast'],
    genres: ['groove', 'prog'],
    cymbals: ['moderate', 'forest'],
    doubleBass: ['sometimes', 'often'],
    budget: ['premium'],
    presence: ['technical', 'energy'],
    snare: ['mid', 'tight'],
    complexity: ['moderate'],
  },
  9: { // John Otto
    tempos: ['mid', 'slow'],
    genres: ['groove'],
    cymbals: ['minimal', 'moderate'],
    doubleBass: ['rarely', 'sometimes'],
    budget: ['balanced', 'practical'],
    presence: ['energy'],
    snare: ['mid', 'deep'],
    complexity: ['simple'],
  },
  10: { // Jay Weinberg
    tempos: ['fast', 'blast'],
    genres: ['groove', 'death'],
    cymbals: ['forest'],
    doubleBass: ['always', 'often'],
    budget: ['premium', 'unlimited'],
    presence: ['energy', 'power'],
    snare: ['tight', 'mid'],
    complexity: ['complex'],
  },
  11: { // Vinnie Paul
    tempos: ['mid', 'fast'],
    genres: ['groove', 'thrash'],
    cymbals: ['forest'],
    doubleBass: ['often', 'always'],
    budget: ['premium', 'unlimited'],
    presence: ['power', 'energy'],
    snare: ['deep', 'mid'],
    complexity: ['complex', 'moderate'],
  },
  12: { // Charlie Benante
    tempos: ['fast', 'blast'],
    genres: ['thrash'],
    cymbals: ['moderate', 'forest'],
    doubleBass: ['often', 'always'],
    budget: ['premium'],
    presence: ['technical', 'energy'],
    snare: ['tight', 'mid'],
    complexity: ['moderate'],
  },
  13: { // Mike Portnoy
    tempos: ['mid', 'fast'],
    genres: ['prog'],
    cymbals: ['forest'],
    doubleBass: ['often', 'always'],
    budget: ['unlimited', 'premium'],
    presence: ['technical', 'energy'],
    snare: ['mid'],
    complexity: ['complex'],
  },
  14: { // Danny Carey
    tempos: ['mid', 'slow'],
    genres: ['prog'],
    cymbals: ['forest'],
    doubleBass: ['sometimes', 'often'],
    budget: ['unlimited', 'premium'],
    presence: ['technical'],
    snare: ['deep', 'mid'],
    complexity: ['complex'],
  },
  15: { // Mario Duplantier
    tempos: ['fast', 'mid'],
    genres: ['death', 'prog'],
    cymbals: ['moderate', 'forest'],
    doubleBass: ['often', 'always'],
    budget: ['premium'],
    presence: ['technical', 'power'],
    snare: ['mid', 'deep'],
    complexity: ['moderate'],
  },
  16: { // Brann Dailor
    tempos: ['mid', 'fast'],
    genres: ['prog', 'groove'],
    cymbals: ['moderate'],
    doubleBass: ['sometimes', 'often'],
    budget: ['premium', 'balanced'],
    presence: ['technical'],
    snare: ['mid', 'tight'],
    complexity: ['moderate'],
  },
  17: { // Chris Adler
    tempos: ['fast', 'mid'],
    genres: ['groove', 'thrash'],
    cymbals: ['moderate', 'forest'],
    doubleBass: ['often', 'always'],
    budget: ['premium'],
    presence: ['technical', 'power'],
    snare: ['tight', 'mid'],
    complexity: ['moderate'],
  },
  18: { // Matt Halpern
    tempos: ['mid'],
    genres: ['djent', 'prog'],
    cymbals: ['moderate', 'forest'],
    doubleBass: ['often'],
    budget: ['premium'],
    presence: ['technical'],
    snare: ['tight'],
    complexity: ['moderate', 'complex'],
  },
  19: { // Inferno
    tempos: ['blast', 'fast'],
    genres: ['black', 'death'],
    cymbals: ['forest'],
    doubleBass: ['always'],
    budget: ['premium'],
    presence: ['power', 'energy'],
    snare: ['tight'],
    complexity: ['complex'],
  },
  20: { // Hellhammer
    tempos: ['blast', 'fast'],
    genres: ['black'],
    cymbals: ['moderate', 'forest'],
    doubleBass: ['always', 'often'],
    budget: ['balanced', 'premium'],
    presence: ['power'],
    snare: ['tight', 'mid'],
    complexity: ['simple', 'moderate'],
  },
  21: { // Pete Sandoval
    tempos: ['blast', 'fast'],
    genres: ['death'],
    cymbals: ['forest'],
    doubleBass: ['always'],
    budget: ['premium'],
    presence: ['technical', 'power'],
    snare: ['tight'],
    complexity: ['moderate', 'complex'],
  },
  22: { // Art Cruz
    tempos: ['fast', 'mid'],
    genres: ['groove', 'thrash'],
    cymbals: ['forest'],
    doubleBass: ['often', 'always'],
    budget: ['premium'],
    presence: ['power', 'energy'],
    snare: ['mid', 'deep'],
    complexity: ['moderate'],
  },
  23: { // Arin Ilejay
    tempos: ['fast', 'mid'],
    genres: ['thrash', 'prog'],
    cymbals: ['moderate', 'forest'],
    doubleBass: ['often', 'sometimes'],
    budget: ['balanced', 'premium'],
    presence: ['energy', 'technical'],
    snare: ['mid', 'tight'],
    complexity: ['moderate'],
  },
  24: { // Navene Koperweis
    tempos: ['mid', 'fast'],
    genres: ['prog', 'djent'],
    cymbals: ['moderate'],
    doubleBass: ['sometimes', 'often'],
    budget: ['balanced', 'premium'],
    presence: ['technical'],
    snare: ['mid', 'tight'],
    complexity: ['moderate'],
  },
  25: { // Alex Bent
    tempos: ['fast', 'blast'],
    genres: ['thrash', 'death'],
    cymbals: ['forest'],
    doubleBass: ['always', 'often'],
    budget: ['premium'],
    presence: ['technical', 'energy'],
    snare: ['tight'],
    complexity: ['complex', 'moderate'],
  },
  26: { // Shannon Larkin
    tempos: ['mid', 'slow'],
    genres: ['groove'],
    cymbals: ['minimal', 'moderate'],
    doubleBass: ['sometimes', 'rarely'],
    budget: ['balanced', 'practical'],
    presence: ['power', 'energy'],
    snare: ['deep', 'mid'],
    complexity: ['simple'],
  },
  27: { // Raymond Herrera
    tempos: ['fast', 'blast'],
    genres: ['groove', 'death'],
    cymbals: ['forest'],
    doubleBass: ['always', 'often'],
    budget: ['premium'],
    presence: ['technical', 'power'],
    snare: ['tight', 'mid'],
    complexity: ['complex'],
  },
  28: { // Morgan Ågren
    tempos: ['mid', 'fast'],
    genres: ['prog'],
    cymbals: ['moderate'],
    doubleBass: ['sometimes'],
    budget: ['premium'],
    presence: ['technical'],
    snare: ['mid'],
    complexity: ['complex'],
  },
  29: { // Igor Cavalera
    tempos: ['fast', 'mid'],
    genres: ['thrash', 'groove', 'death'],
    cymbals: ['moderate', 'forest'],
    doubleBass: ['often', 'always'],
    budget: ['balanced', 'premium'],
    presence: ['power', 'energy'],
    snare: ['mid', 'deep'],
    complexity: ['moderate', 'simple'],
  },
  30: { // Bill Ward
    tempos: ['slow', 'mid'],
    genres: ['groove'],
    cymbals: ['minimal', 'moderate'],
    doubleBass: ['rarely'],
    budget: ['balanced', 'practical'],
    presence: ['power'],
    snare: ['deep'],
    complexity: ['simple'],
  },
};

// Scoring weights for each question type
const SCORING_WEIGHTS = {
  genre: 25,      // High weight - primary identifier
  tempo: 20,      // High weight - core style
  doubleBass: 15, // Medium-high weight
  presence: 12,   // Medium weight
  cymbals: 10,    // Medium weight
  snare: 8,       // Lower weight
  complexity: 5,  // Lower weight
  budget: 5,      // Lower weight
};

// Calculate match scores for all drummers
export function calculateMatches(answers, drummers) {
  const scores = drummers.map(drummer => {
    const profile = DRUMMER_PROFILES[drummer.id];
    if (!profile) return { drummer, score: 0, reasons: [] };

    let score = 0;
    const reasons = [];

    // Check each answer against the drummer's profile
    Object.entries(answers).forEach(([questionId, answerValue]) => {
      if (profile[questionId] && profile[questionId].includes(answerValue)) {
        const weight = SCORING_WEIGHTS[questionId] || 5;
        // Give more points if it's the first preference (index 0)
        const preferenceBonus = profile[questionId][0] === answerValue ? weight : weight * 0.7;
        score += preferenceBonus;
        reasons.push(questionId.replace(/([A-Z])/g, ' $1').toLowerCase().trim());
      }
    });

    return { drummer, score, reasons };
  });

  // Sort by score descending, with random tie-breaker
  return scores.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return Math.random() - 0.5; // Random tie-breaker
  });
}

// Get maximum possible score (for percentage calculation)
export function getMaxPossibleScore() {
  return Object.values(SCORING_WEIGHTS).reduce((sum, weight) => sum + weight, 0);
}

// Quiz completion counter key for localStorage
export const QUIZ_COUNTER_KEY = 'metalforge_quiz_completions';

// Get quiz completion count from localStorage (with mock base)
export function getQuizCompletionCount() {
  const baseCount = 12847; // Social proof base
  if (typeof window === 'undefined' || !window.localStorage) return baseCount;
  try {
    const stored = parseInt(localStorage.getItem(QUIZ_COUNTER_KEY) || '0', 10);
    return baseCount + stored;
  } catch {
    return baseCount;
  }
}

// Increment quiz completion count
export function incrementQuizCount() {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    const current = parseInt(localStorage.getItem(QUIZ_COUNTER_KEY) || '0', 10);
    localStorage.setItem(QUIZ_COUNTER_KEY, String(current + 1));
  } catch {
    // Silently fail
  }
}
