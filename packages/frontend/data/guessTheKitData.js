// Guess the Kit Photo Quiz Data - Issue #706
// Viral photo challenge: See drum kit photos, guess which metal drummer uses it
// Uses actual drum kit/setup photos from drummer profiles

// Quiz questions: Each shows kit photo(s) and 4 drummer options
// Questions are randomized from pool of eligible drummers
export function generateKitPhotoQuestions(drummers, questionCount = 10) {
  // Filter drummers who have kit photos available
  const eligibleDrummers = drummers.filter(d => 
    d.image && // Main profile image (often kit shot)
    d.id && 
    d.name &&
    d.band
  );

  if (eligibleDrummers.length < 4) {
    console.error('Not enough drummers with photos for quiz');
    return [];
  }

  // Shuffle drummers for random selection
  const shuffled = shuffleArray([...eligibleDrummers]);
  
  // Select drummers for questions (limited to questionCount)
  const selectedDrummers = shuffled.slice(0, Math.min(questionCount, shuffled.length));
  
  // Generate questions
  const questions = selectedDrummers.map((drummer, index) => {
    // Get 3 random distractors (other drummers)
    const distractors = getRandomDistractors(drummer, eligibleDrummers, 3);
    
    // Shuffle options (correct + distractors)
    const options = shuffleArray([drummer.id, ...distractors.map(d => d.id)]);
    
    return {
      id: index + 1,
      correctDrummerId: drummer.id,
      correctDrummerName: drummer.name,
      correctDrummerBand: drummer.band,
      kitPhoto: drummer.image, // Primary kit/profile photo
      kitPhotos: drummer.photos || [drummer.image], // All available photos
      options: options,
      hint: generateHint(drummer),
    };
  });

  return questions;
}

// Get random distractor drummers (excluding correct answer)
function getRandomDistractors(correctDrummer, allDrummers, count) {
  const others = allDrummers.filter(d => d.id !== correctDrummer.id);
  const shuffled = shuffleArray([...others]);
  return shuffled.slice(0, count);
}

// Generate hint based on drummer info
function generateHint(drummer) {
  const hints = [];
  
  // Genre-based hints
  if (drummer.genre) {
    const genreHints = {
      'Thrash Metal': '🤘 Thrash Metal Legend',
      'Death Metal': '💀 Death Metal Pioneer', 
      'Nu Metal': '👹 Nu Metal Icon',
      'Progressive Metal': '🌀 Prog Metal Visionary',
      'Black Metal': '⛧ Black Metal Master',
      'Heavy Metal': '🎸 Heavy Metal Classic',
      'Groove Metal': '🔥 Groove Metal Powerhouse',
      'Metalcore': '⚡ Metalcore Force',
      'Djent': '🔢 Djent Precision',
    };
    hints.push(genreHints[drummer.genre] || `🥁 ${drummer.genre} Drummer`);
  }

  // Band hint
  if (drummer.band) {
    const bandClues = {
      'Metallica': 'Co-founder of one of the Big Four',
      'Slipknot': 'Masked mayhem with nine members',
      'Tool': 'Spiral out, keep going...',
      'Meshuggah': 'Polyrhythmic Swedish pioneers',
      'Gojira': 'French progressive death metal',
      'Lamb of God': 'American groove metal',
      'Dream Theater': 'Progressive metal pioneers',
      'Pantera': 'Texas groove legends',
      'Slayer': 'Reign in Blood',
      'Nile': 'Ancient Egyptian death metal',
      'Behemoth': 'Polish extreme metal',
      'Trivium': 'Modern thrash revival',
    };
    if (bandClues[drummer.band]) {
      hints.push(bandClues[drummer.band]);
    }
  }

  // Country hint
  if (drummer.country) {
    hints.push(`🌍 From ${drummer.country}`);
  }

  return hints.length > 0 ? hints[0] : '🥁 Metal Drumming Legend';
}

// Calculate quiz results
export function calculateQuizResult(answers, questions) {
  const total = questions.length;
  let correct = 0;
  const answerDetails = [];

  answers.forEach((answer, index) => {
    const question = questions[index];
    const isCorrect = answer === question.correctDrummerId;
    if (isCorrect) correct++;
    
    answerDetails.push({
      questionId: question.id,
      selectedId: answer,
      correctId: question.correctDrummerId,
      isCorrect,
    });
  });

  const percentage = Math.round((correct / total) * 100);
  const score = correct * 10; // 10 points per correct answer

  return {
    correct,
    total,
    percentage,
    score,
    answerDetails,
  };
}

// Get result message based on score percentage
export function getResultMessage(percentage) {
  if (percentage >= 90) {
    return {
      emoji: '🏆',
      title: 'Legendary Kit Expert!',
      message: 'You can identify metal drummers by their kits blindfolded! Incredible knowledge!',
      tier: 'legendary',
    };
  } else if (percentage >= 70) {
    return {
      emoji: '🔥',
      title: 'True Metal Head!',
      message: 'Impressive kit knowledge! You clearly follow the scene closely.',
      tier: 'expert',
    };
  } else if (percentage >= 50) {
    return {
      emoji: '🥁',
      title: 'Solid Drummer Fan!',
      message: 'Good effort! You know your way around metal drummer setups.',
      tier: 'intermediate',
    };
  } else if (percentage >= 30) {
    return {
      emoji: '🎸',
      title: 'Learning the Ropes!',
      message: "Keep exploring! There's a lot more gear knowledge to discover.",
      tier: 'beginner',
    };
  } else {
    return {
      emoji: '😅',
      title: 'Time to Study!',
      message: "No worries! Check out our drummer profiles to learn more about their gear.",
      tier: 'newbie',
    };
  }
}

// Get share text for results
export function getShareText(result) {
  const emoji = result.percentage >= 80 ? '🏆' : result.percentage >= 60 ? '🔥' : result.percentage >= 40 ? '🥁' : '😅';
  return `${emoji} I got ${result.correct}/${result.total} (${result.percentage}%) on the "Guess the Metal Drummer by Their Kit" photo quiz! Can you beat my score? 🤘`;
}

// Get share URL
export function getShareUrl(result) {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://metalforge.io';
  return `${baseUrl}/guess-the-kit?correct=${result.correct}&total=${result.total}&score=${result.score}`;
}

// Shuffle array (Fisher-Yates)
export function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Get drummer name by ID
export function getDrummerNameById(drummerId, drummers) {
  const drummer = drummers.find(d => d.id === drummerId);
  return drummer ? drummer.name : 'Unknown';
}

// Get drummer by ID
export function getDrummerById(drummerId, drummers) {
  return drummers.find(d => d.id === drummerId) || null;
}
