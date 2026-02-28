// Kit Quiz Data - "Guess the Drummer by Kit" viral quiz (Issue #551)

export const KIT_QUIZ_QUESTIONS = [
  { id: 1, drummerId: 4, kitImage: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=600&fit=crop', hint: 'This thrash metal pioneer helped define the genre with Slayer', options: [{ id: 4, name: 'Dave Lombardo', band: 'Slayer' }, { id: 1, name: 'Lars Ulrich', band: 'Metallica' }, { id: 12, name: 'Charlie Benante', band: 'Anthrax' }, { id: 29, name: 'Igor Cavalera', band: 'Sepultura' }], correctAnswer: 4 },
  { id: 2, drummerId: 5, kitImage: 'https://images.unsplash.com/photo-1485579149621-3123dd979885?w=600&fit=crop', hint: 'Known for polyrhythmic mastery and Sonor endorsement', options: [{ id: 14, name: 'Danny Carey', band: 'Tool' }, { id: 5, name: 'Tomas Haake', band: 'Meshuggah' }, { id: 18, name: 'Matt Halpern', band: 'Periphery' }, { id: 16, name: 'Brann Dailor', band: 'Mastodon' }], correctAnswer: 5 },
  { id: 3, drummerId: 2, kitImage: 'https://images.unsplash.com/photo-1461784121038-f088ca1e7714?w=600&fit=crop', hint: 'The masked drummer known for intense speed and rotating drum riser', options: [{ id: 10, name: 'Jay Weinberg', band: 'Slipknot' }, { id: 2, name: 'Joey Jordison', band: 'Slipknot' }, { id: 19, name: 'Inferno', band: 'Behemoth' }, { id: 6, name: 'George Kollias', band: 'Nile' }], correctAnswer: 2 },
  { id: 4, drummerId: 13, kitImage: 'https://images.unsplash.com/photo-1524230659092-07f99a75c013?w=600&fit=crop', hint: 'Progressive metal legend with massive Tama kit', options: [{ id: 13, name: 'Mike Portnoy', band: 'Dream Theater' }, { id: 14, name: 'Danny Carey', band: 'Tool' }, { id: 3, name: 'Gene Hoglan', band: 'Death' }, { id: 16, name: 'Brann Dailor', band: 'Mastodon' }], correctAnswer: 13 },
  { id: 5, drummerId: 15, kitImage: 'https://images.unsplash.com/photo-1571327073757-71d13c24de30?w=600&fit=crop', hint: 'French death metal innovator with unique swirling technique', options: [{ id: 15, name: 'Mario Duplantier', band: 'Gojira' }, { id: 17, name: 'Chris Adler', band: 'Lamb of God' }, { id: 6, name: 'George Kollias', band: 'Nile' }, { id: 25, name: 'Alex Bent', band: 'Trivium' }], correctAnswer: 15 },
  { id: 6, drummerId: 11, kitImage: 'https://images.unsplash.com/photo-1543443258-92b04ad5ec6b?w=600&fit=crop', hint: 'Groove metal pioneer, co-founded Pantera with his brother', options: [{ id: 22, name: 'Art Cruz', band: 'Lamb of God' }, { id: 11, name: 'Vinnie Paul', band: 'Pantera' }, { id: 26, name: 'Shannon Larkin', band: 'Godsmack' }, { id: 17, name: 'Chris Adler', band: 'Lamb of God' }], correctAnswer: 11 },
  { id: 7, drummerId: 6, kitImage: 'https://images.unsplash.com/photo-1504898770365-14faca6a7320?w=600&fit=crop', hint: 'Speed demon known for extreme blast beats and educational videos', options: [{ id: 21, name: 'Pete Sandoval', band: 'Morbid Angel' }, { id: 6, name: 'George Kollias', band: 'Nile' }, { id: 19, name: 'Inferno', band: 'Behemoth' }, { id: 20, name: 'Hellhammer', band: 'Mayhem' }], correctAnswer: 6 },
  { id: 8, drummerId: 14, kitImage: 'https://images.unsplash.com/photo-1558369178-6556d97855d0?w=600&fit=crop', hint: 'Tall prog-metal master with Sonor and Paiste setup', options: [{ id: 5, name: 'Tomas Haake', band: 'Meshuggah' }, { id: 13, name: 'Mike Portnoy', band: 'Dream Theater' }, { id: 14, name: 'Danny Carey', band: 'Tool' }, { id: 28, name: 'Morgan Ågren', band: 'Kaipa' }], correctAnswer: 14 },
  { id: 9, drummerId: 7, kitImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&fit=crop', hint: 'Brazilian powerhouse, current Slipknot and former Sepultura drummer', options: [{ id: 7, name: 'Eloy Casagrande', band: 'Slipknot' }, { id: 29, name: 'Igor Cavalera', band: 'Sepultura' }, { id: 25, name: 'Alex Bent', band: 'Trivium' }, { id: 10, name: 'Jay Weinberg', band: 'Slipknot' }], correctAnswer: 7 },
  { id: 10, drummerId: 3, kitImage: 'https://images.unsplash.com/photo-1514649923863-ceaf75b7ec00?w=600&fit=crop', hint: 'The Atomic Clock - legendary for precision and versatility', options: [{ id: 4, name: 'Dave Lombardo', band: 'Slayer' }, { id: 3, name: 'Gene Hoglan', band: 'Death' }, { id: 12, name: 'Charlie Benante', band: 'Anthrax' }, { id: 21, name: 'Pete Sandoval', band: 'Morbid Angel' }], correctAnswer: 3 },
];

export const SCORING = { correctAnswer: 10, hintPenalty: 3, timeBonus: { under5Seconds: 5, under10Seconds: 3, under15Seconds: 1 } };

export const RESULT_MESSAGES = [
  { minPercent: 90, emoji: '🏆', title: 'Drum God!', message: "You're a true metal drumming expert!" },
  { minPercent: 70, emoji: '🔥', title: 'Blast Beat Master!', message: 'Impressive knowledge of metal drummers!' },
  { minPercent: 50, emoji: '🥁', title: 'Solid Groove!', message: 'You know your metal drummers pretty well!' },
  { minPercent: 30, emoji: '🎸', title: 'Getting There!', message: 'Keep exploring the world of metal drumming!' },
  { minPercent: 0, emoji: '😅', title: 'Time to Study!', message: 'Check out our drummer profiles to learn more!' },
];

export function getResultMessage(percentage) {
  for (const msg of RESULT_MESSAGES) { if (percentage >= msg.minPercent) return msg; }
  return RESULT_MESSAGES[RESULT_MESSAGES.length - 1];
}

export function calculateScore(answers, questions) {
  let score = 0, correct = 0;
  answers.forEach((answer, index) => {
    const question = questions[index];
    if (answer.selectedId === question.correctAnswer) {
      correct++;
      score += SCORING.correctAnswer;
      if (answer.timeSeconds < 5) score += SCORING.timeBonus.under5Seconds;
      else if (answer.timeSeconds < 10) score += SCORING.timeBonus.under10Seconds;
      else if (answer.timeSeconds < 15) score += SCORING.timeBonus.under15Seconds;
      if (answer.usedHint) score -= SCORING.hintPenalty;
    }
  });
  const percentage = Math.round((correct / questions.length) * 100);
  return { score: Math.max(0, score), correct, total: questions.length, percentage, message: getResultMessage(percentage) };
}

export function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; }
  return shuffled;
}

export function getShuffledQuestions() {
  return KIT_QUIZ_QUESTIONS.map(q => ({ ...q, options: shuffleArray(q.options) }));
}
