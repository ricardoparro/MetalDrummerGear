// Kit Quiz Data - "Guess the Drummer by Kit"
// Viral quiz feature for growth (Issue #551)
// This file is lazy-loaded only when the kit quiz is accessed

// Quiz questions with drum kit descriptions
// Each question shows gear info and 4 drummer options
export const KIT_QUIZ_QUESTIONS = [
  {
    id: 1,
    correctDrummerId: 1,
    hint: 'This legendary thrash drummer is known for co-founding one of the Big Four bands.',
    gear: {
      drums: 'Tama Starclassic Maple',
      snare: 'Tama Signature 14x6.5"',
      cymbals: 'Zildjian A Custom Series (14" Dyno Beat Hi-Hats, Rock Crashes, Z Custom China, 22" Ride)',
      hardware: 'Tama Iron Cobra 900 Power Glide Double Pedal',
      sticks: 'Ahead Signature Aluminum Drumsticks',
    },
    options: [
      { id: 1, name: 'Lars Ulrich', band: 'Metallica' },
      { id: 4, name: 'Dave Lombardo', band: 'Slayer' },
      { id: 12, name: 'Charlie Benante', band: 'Anthrax' },
      { id: 11, name: 'Vinnie Paul', band: 'Pantera' },
    ],
    difficulty: 'medium',
  },
  {
    id: 2,
    correctDrummerId: 2,
    hint: 'This masked drummer was famous for his incredible speed and theatrical stage presence.',
    gear: {
      drums: 'Pearl Reference Series',
      snare: 'Pearl Signature 13x6.5"',
      cymbals: 'Paiste RUDE & 2002 Series (Wild Hi-Hats, Power Crashes, Wild Chinas, Power Ride)',
      hardware: 'Pearl Eliminator Double Pedal',
      sticks: 'Vic Firth Signature',
    },
    options: [
      { id: 10, name: 'Jay Weinberg', band: 'Slipknot' },
      { id: 2, name: 'Joey Jordison', band: 'Slipknot' },
      { id: 9, name: 'John Otto', band: 'Limp Bizkit' },
      { id: 8, name: 'Ray Luzier', band: 'Korn' },
    ],
    difficulty: 'easy',
  },
  {
    id: 3,
    correctDrummerId: 5,
    hint: 'Known for polyrhythmic mastery and playing with one of the heaviest progressive metal bands.',
    gear: {
      drums: 'Sonor SQ2 Heavy Beech (24"x18" Bass, Multiple Toms)',
      snare: 'Sonor Signature 14x6.5" & Artist Series Bronze',
      cymbals: 'Sabian HHX & AAX Series (Compression Hi-Hats, Stage Crashes, Legacy Ride, AAXtreme China)',
      hardware: 'Sonor Giant Step Double Pedal',
      sticks: 'Vic Firth Signature',
    },
    options: [
      { id: 14, name: 'Danny Carey', band: 'Tool' },
      { id: 5, name: 'Tomas Haake', band: 'Meshuggah' },
      { id: 13, name: 'Mike Portnoy', band: 'Dream Theater' },
      { id: 18, name: 'Matt Halpern', band: 'Periphery' },
    ],
    difficulty: 'medium',
  },
  {
    id: 4,
    correctDrummerId: 6,
    hint: 'The fastest feet in death metal, known for extreme blast beats and Egyptian-themed music.',
    gear: {
      drums: 'Pearl Masterworks Stadium Exotic (Piano Black with Gold Hardware)',
      snare: 'Pearl Signature 14x6.5"',
      cymbals: 'Zildjian (K Mastersound Hi-Hats, K Custom Dark Crashes, A Custom Mega Bell Ride)',
      hardware: 'Pearl Demon Drive Double Pedal',
      sticks: 'Vic Firth Signature',
    },
    options: [
      { id: 6, name: 'George Kollias', band: 'Nile' },
      { id: 21, name: 'Pete Sandoval', band: 'Morbid Angel' },
      { id: 3, name: 'Gene Hoglan', band: 'Death' },
      { id: 19, name: 'Inferno', band: 'Behemoth' },
    ],
    difficulty: 'hard',
  },
  {
    id: 5,
    correctDrummerId: 4,
    hint: 'Pioneer of thrash drumming, known for his two-handed hi-hat technique and work with a legendary thrash band.',
    gear: {
      drums: 'Tama Starclassic Maple',
      snare: 'Tama S.L.P. 14x6.5" G-Maple',
      cymbals: 'Paiste RUDE & 2002 Series (Sound Edge Hi-Hats, Crashes, Reign Power Ride)',
      hardware: 'Tama Iron Cobra Double Pedal',
      sticks: 'Vater Signature',
    },
    options: [
      { id: 1, name: 'Lars Ulrich', band: 'Metallica' },
      { id: 12, name: 'Charlie Benante', band: 'Anthrax' },
      { id: 4, name: 'Dave Lombardo', band: 'Slayer' },
      { id: 29, name: 'Igor Cavalera', band: 'Sepultura' },
    ],
    difficulty: 'medium',
  },
  {
    id: 6,
    correctDrummerId: 3,
    hint: 'Nicknamed "The Atomic Clock" for his incredible precision, known for extreme metal drumming.',
    gear: {
      drums: 'Pearl Reference Pure',
      snare: 'Pearl Reference 14x6.5" Brass',
      cymbals: 'Sabian AAX Series (15" Hi-Hats, Crashes, Ride, China)',
      hardware: 'Pearl Demon Drive Double Pedal',
      sticks: 'Vic Firth American Classic',
    },
    options: [
      { id: 6, name: 'George Kollias', band: 'Nile' },
      { id: 3, name: 'Gene Hoglan', band: 'Death / Testament' },
      { id: 25, name: 'Alex Bent', band: 'Trivium' },
      { id: 21, name: 'Pete Sandoval', band: 'Morbid Angel' },
    ],
    difficulty: 'hard',
  },
  {
    id: 7,
    correctDrummerId: 14,
    hint: 'This prog-metal legend is known for his complex rhythms, occult interests, and massive drum kit.',
    gear: {
      drums: 'Sonor Designer Series (Bronze/Maple hybrid)',
      snare: 'Sonor Signature 14x8" Bronze',
      cymbals: 'Paiste (Signature & Masters Dark series, Custom gongs)',
      hardware: 'Sonor Perfect Balance Pedal',
      sticks: 'Vic Firth Signature (extra long)',
    },
    options: [
      { id: 13, name: 'Mike Portnoy', band: 'Dream Theater' },
      { id: 5, name: 'Tomas Haake', band: 'Meshuggah' },
      { id: 14, name: 'Danny Carey', band: 'Tool' },
      { id: 16, name: 'Brann Dailor', band: 'Mastodon' },
    ],
    difficulty: 'medium',
  },
  {
    id: 8,
    correctDrummerId: 15,
    hint: 'This French drummer is known for his unique "swivel" bass drum technique and progressive death metal.',
    gear: {
      drums: 'Tama Starclassic Bubinga/Birch',
      snare: 'Tama Signature 14x6.5"',
      cymbals: 'Meinl Byzance (Extra Dry Hi-Hats, Dual & Dark Crashes, Sand Ride)',
      hardware: 'Tama Speed Cobra Double Pedal',
      sticks: 'Vic Firth Signature',
    },
    options: [
      { id: 15, name: 'Mario Duplantier', band: 'Gojira' },
      { id: 17, name: 'Chris Adler', band: 'Lamb of God' },
      { id: 7, name: 'Eloy Casagrande', band: 'Slipknot' },
      { id: 25, name: 'Alex Bent', band: 'Trivium' },
    ],
    difficulty: 'hard',
  },
  {
    id: 9,
    correctDrummerId: 11,
    hint: 'This groove metal pioneer helped define the sound of heavy metal in the 90s with his brother.',
    gear: {
      drums: 'ddrum Custom Kit',
      snare: 'ddrum Signature 14x8"',
      cymbals: 'Sabian (AAX & AA Series, Big & Ugly collection)',
      hardware: 'ddrum Double Pedal',
      sticks: 'Vater Signature',
    },
    options: [
      { id: 22, name: 'Art Cruz', band: 'Lamb of God' },
      { id: 11, name: 'Vinnie Paul', band: 'Pantera' },
      { id: 17, name: 'Chris Adler', band: 'Lamb of God' },
      { id: 26, name: 'Shannon Larkin', band: 'Godsmack' },
    ],
    difficulty: 'medium',
  },
  {
    id: 10,
    correctDrummerId: 7,
    hint: 'The newest addition to the masked nine, this Brazilian powerhouse replaced a legend.',
    gear: {
      drums: 'Tama Starclassic Bubinga (22" & 24" Bass Drums, Multiple Toms)',
      snare: 'Tama Bell Brass 14x5.5"',
      cymbals: 'Paiste (Masters Dark Hi-Hats & Ride, 602 Crashes, Rude Splash, 2002 China, Symphonic Gong)',
      hardware: 'Tama Speed Cobra Double Pedal',
      sticks: 'Vic Firth 5B',
    },
    options: [
      { id: 2, name: 'Joey Jordison', band: 'Slipknot' },
      { id: 10, name: 'Jay Weinberg', band: 'Suicidal Tendencies' },
      { id: 7, name: 'Eloy Casagrande', band: 'Slipknot' },
      { id: 29, name: 'Igor Cavalera', band: 'Sepultura' },
    ],
    difficulty: 'medium',
  },
];

// Calculate quiz results
export function calculateKitQuizResult(answers) {
  let correct = 0;
  let total = KIT_QUIZ_QUESTIONS.length;
  
  KIT_QUIZ_QUESTIONS.forEach((question, index) => {
    if (answers[index] === question.correctDrummerId) {
      correct++;
    }
  });
  
  const percentage = Math.round((correct / total) * 100);
  
  // Score ranges for shareable result
  let title, emoji;
  if (percentage === 100) {
    title = 'Drum Tech Legend!';
    emoji = '🏆';
  } else if (percentage >= 80) {
    title = 'Gear Expert';
    emoji = '🥇';
  } else if (percentage >= 60) {
    title = 'Kit Connoisseur';
    emoji = '🥈';
  } else if (percentage >= 40) {
    title = 'Aspiring Drummer';
    emoji = '🥉';
  } else if (percentage >= 20) {
    title = 'Drum Newbie';
    emoji = '🥁';
  } else {
    title = 'Keep Practicing!';
    emoji = '😅';
  }
  
  return {
    correct,
    total,
    percentage,
    title,
    emoji,
    score: correct * 10, // 10 points per correct answer
  };
}

// Get share text for social media
export function getShareText(result) {
  return `${result.emoji} I scored ${result.correct}/${result.total} (${result.percentage}%) on the Metal Drummer Kit Quiz!\n\nCan you beat my score? 🤘\n\nhttps://metalforge.io/kit-quiz`;
}

// Twitter share URL
export function getTwitterShareUrl(result) {
  const text = encodeURIComponent(`${result.emoji} I scored ${result.correct}/${result.total} (${result.percentage}%) on the Metal Drummer Kit Quiz! Can you beat me? 🤘`);
  return `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent('https://metalforge.io/kit-quiz')}`;
}

// Facebook share URL
export function getFacebookShareUrl() {
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://metalforge.io/kit-quiz')}`;
}
