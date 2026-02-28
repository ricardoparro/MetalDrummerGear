// Kit Quiz Data - "Guess the Drummer by Kit" viral quiz
// Issue #551: Growth opportunity - shareable quiz format
// Shows drum kit setup → user guesses which drummer uses it

// Quiz questions: Each shows gear setup and 4 drummer options
// Uses real gear data from drummer profiles
export const KIT_QUIZ_QUESTIONS = [
  {
    id: 1,
    // Lars Ulrich
    correctDrummerId: 1,
    gear: {
      drums: 'Tama Starclassic Maple',
      snare: 'Tama LU1465 Signature 14x6.5"',
      cymbals: 'Zildjian A Custom Series',
      hardware: 'Tama Iron Cobra 900 Power Glide Double Pedal',
      sticks: 'Ahead Signature Aluminum Drumsticks',
    },
    hint: '🤘 Thrash Metal Legend - Co-founder of one of the Big Four',
    options: [1, 4, 12, 7], // Lars, Lombardo, Charlie Benante, Eloy
  },
  {
    id: 2,
    // Joey Jordison
    correctDrummerId: 2,
    gear: {
      drums: 'Pearl Masters Maple Reserve',
      snare: 'Pearl Joey Jordison Signature 13x6.5"',
      cymbals: 'Paiste RUDE & 2002 Series',
      hardware: 'Pearl Demon Drive Double Pedal',
      sticks: 'Promark Joey Jordison Signature',
    },
    hint: '👹 Masked Mayhem - Nine members, maximum chaos',
    options: [2, 10, 19, 6], // Joey, Jay Weinberg, Inferno, George Kollias
  },
  {
    id: 3,
    // Gene Hoglan
    correctDrummerId: 3,
    gear: {
      drums: 'Tama Starclassic Performer B/B',
      snare: 'Tama Gene Hoglan Signature 14x8"',
      cymbals: 'Zildjian A Custom & K Custom',
      hardware: 'Tama Speed Cobra 910 Double Pedal',
      sticks: 'Vater Gene Hoglan Signature',
    },
    hint: '⚛️ The Atomic Clock - Known for extreme precision',
    options: [3, 21, 6, 25], // Gene, Pete Sandoval, George Kollias, Alex Bent
  },
  {
    id: 4,
    // Dave Lombardo
    correctDrummerId: 4,
    gear: {
      drums: 'Pearl Masters Maple/Gum',
      snare: 'Pearl Dennis Chambers Signature',
      cymbals: 'Paiste RUDE & Signature Series',
      hardware: 'Pearl Demon Drive Double Pedal',
      sticks: 'Vic Firth Dave Lombardo Signature',
    },
    hint: '🔥 Godfather of Double Bass - Reign in... you know',
    options: [4, 1, 29, 22], // Lombardo, Lars, Igor Cavalera, Art Cruz
  },
  {
    id: 5,
    // Tomas Haake
    correctDrummerId: 5,
    gear: {
      drums: 'Sonor SQ2 Series',
      snare: 'Sonor Tomas Haake Signature 14x6.25"',
      cymbals: 'Meinl Byzance & MB20 Series',
      hardware: 'Sonor Perfect Balance Pedal',
      sticks: 'Vic Firth Tomas Haake Signature',
    },
    hint: '🔢 Polyrhythm Master - Swedish progressive pioneers',
    options: [5, 14, 18, 16], // Tomas, Danny Carey, Matt Halpern, Brann Dailor
  },
  {
    id: 6,
    // George Kollias
    correctDrummerId: 6,
    gear: {
      drums: 'Pearl Masterworks',
      snare: 'Pearl George Kollias Signature 14x6.5"',
      cymbals: 'Meinl Byzance Brilliant',
      hardware: 'Pearl Demon Drive Direct Double Pedal',
      sticks: 'Vic Firth George Kollias Signature',
    },
    hint: '💀 Fastest Feet in Metal - Ancient gods of death',
    options: [6, 21, 3, 19], // George, Pete Sandoval, Gene, Inferno
  },
  {
    id: 7,
    // Mike Portnoy
    correctDrummerId: 13,
    gear: {
      drums: 'Tama Starclassic Walnut/Birch',
      snare: 'Tama Mike Portnoy Signature 14x5.5"',
      cymbals: 'Sabian HHX & AAX Series',
      hardware: 'Tama Iron Cobra 900 Rolling Glide',
      sticks: 'Promark Mike Portnoy Signature',
    },
    hint: '🌀 Prog Metal Pioneer - Dream on, prog fans!',
    options: [13, 14, 5, 18], // Portnoy, Danny, Tomas, Matt Halpern
  },
  {
    id: 8,
    // Danny Carey
    correctDrummerId: 14,
    gear: {
      drums: 'Sonor Designer Series',
      snare: 'Sonor Danny Carey Signature 14x8"',
      cymbals: 'Paiste Signature & 2002 Series',
      hardware: 'DW 9000 Series Double Pedal',
      sticks: 'Vic Firth Danny Carey Signature',
    },
    hint: '🌀 Sacred Geometry - Spiral out, keep going',
    options: [14, 5, 13, 16], // Danny, Tomas, Portnoy, Brann
  },
  {
    id: 9,
    // Mario Duplantier
    correctDrummerId: 15,
    gear: {
      drums: 'Tama Starclassic Bubinga',
      snare: 'Tama Mario Duplantier Signature 14x6"',
      cymbals: 'Meinl Byzance Traditional & Extra Dry',
      hardware: 'Tama Speed Cobra Double Pedal',
      sticks: 'Vic Firth Mario Duplantier Signature',
    },
    hint: '🐋 Flying Whale Grooves - French progressive death',
    options: [15, 5, 3, 25], // Mario, Tomas, Gene, Alex Bent
  },
  {
    id: 10,
    // Vinnie Paul
    correctDrummerId: 11,
    gear: {
      drums: 'ddrum Vinnie Paul Signature',
      snare: 'ddrum Vinnie Paul Signature 14x8"',
      cymbals: 'Sabian AAX & HHX Series',
      hardware: 'DW 5000 Series Double Pedal',
      sticks: 'Vic Firth Vinnie Paul Signature',
    },
    hint: '🤠 Texas Groove King - Walk on home, brother!',
    options: [11, 17, 22, 4], // Vinnie, Chris Adler, Art Cruz, Lombardo
  },
];

// Calculate quiz results
export function calculateKitQuizResult(answers) {
  const total = KIT_QUIZ_QUESTIONS.length;
  let correct = 0;
  
  answers.forEach((answer, index) => {
    if (answer === KIT_QUIZ_QUESTIONS[index].correctDrummerId) {
      correct++;
    }
  });
  
  const percentage = Math.round((correct / total) * 100);
  const score = correct * 10; // 10 points per correct answer
  
  return {
    correct,
    total,
    percentage,
    score,
  };
}

// Get result message based on score
export function getResultMessage(percentage) {
  if (percentage >= 90) {
    return {
      emoji: '🏆',
      title: 'Legendary Gear Expert!',
      message: 'You know your metal drummer gear inside out! Incredible knowledge!',
    };
  } else if (percentage >= 70) {
    return {
      emoji: '🔥',
      title: 'True Metal Head!',
      message: 'Impressive gear knowledge! You clearly follow the scene closely.',
    };
  } else if (percentage >= 50) {
    return {
      emoji: '🥁',
      title: 'Solid Drummer Fan!',
      message: 'Good effort! You know your way around metal drummer setups.',
    };
  } else if (percentage >= 30) {
    return {
      emoji: '🎸',
      title: 'Learning the Ropes!',
      message: 'Keep exploring! There\'s a lot more gear knowledge to discover.',
    };
  } else {
    return {
      emoji: '😅',
      title: 'Time to Study!',
      message: 'No worries! Check out our drummer profiles to learn more about their gear.',
    };
  }
}

// Get drummer name by ID (used in quiz)
export function getDrummerNameById(drummerId, drummers) {
  const drummer = drummers.find(d => d.id === drummerId);
  return drummer ? drummer.name : 'Unknown';
}

// Get drummer band by ID (used in quiz)
export function getDrummerBandById(drummerId, drummers) {
  const drummer = drummers.find(d => d.id === drummerId);
  return drummer ? drummer.band : 'Unknown';
}

// Get drummer image by ID (used in quiz results)
export function getDrummerImageById(drummerId, drummers) {
  const drummer = drummers.find(d => d.id === drummerId);
  return drummer ? drummer.image : null;
}

// Shuffle array (Fisher-Yates) for randomizing option order
export function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
