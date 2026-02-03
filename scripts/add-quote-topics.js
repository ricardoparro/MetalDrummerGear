// Script to add topics to all quotes in the drummers data
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../api/drummers/index.js');
let content = fs.readFileSync(filePath, 'utf8');

// Topic mappings based on quote content keywords
const topicPatterns = [
  // Philosophy
  { regex: /not the best drummer.*but.*best drummer for/i, topic: 'philosophy' },
  { regex: /Music is the most powerful/i, topic: 'philosophy' },
  { regex: /drums chose me/i, topic: 'philosophy' },
  { regex: /never wanted to be a typical/i, topic: 'philosophy' },
  { regex: /sacred geometry/i, topic: 'philosophy' },
  { regex: /approach drums as a musical instrument/i, topic: 'philosophy' },
  { regex: /Progressive music allows you to break/i, topic: 'philosophy' },
  { regex: /drumming.*serve the song/i, topic: 'philosophy' },
  { regex: /approach drums melodically/i, topic: 'philosophy' },
  { regex: /Less is more.*spaces between/i, topic: 'philosophy' },
  { regex: /approach each song as a unique puzzle/i, topic: 'philosophy' },
  
  // Technique  
  { regex: /sit behind a drum kit.*destroy it/i, topic: 'technique' },
  { regex: /Practice doesn't make perfect.*Perfect practice/i, topic: 'technique' },
  { regex: /wanted to be the best.*most musical.*precise/i, topic: 'technique' },
  { regex: /Speed is (useless|nothing) without control/i, topic: 'technique' },
  { regex: /polyrhythmic approach/i, topic: 'technique' },
  { regex: /Bleed.*months/i, topic: 'technique' },
  { regex: /practice every day/i, topic: 'technique' },
  { regex: /learn to read music/i, topic: 'technique' },
  { regex: /homeschooled.*practice/i, topic: 'technique' },
  { regex: /gravity blast/i, topic: 'technique' },
  
  // Gear
  { regex: /two single pedals instead of.*double/i, topic: 'gear' },
  { regex: /most expressive instrument/i, topic: 'gear' },
  
  // Career
  { regex: /only way to do great work.*love what you do/i, topic: 'career' },
  { regex: /Working with Chuck Schuldiner/i, topic: 'career' },
  { regex: /Reign in Blood changed everything/i, topic: 'career' },
  { regex: /Playing with Mike Portnoy/i, topic: 'career' },
  { regex: /Filling in for Charlie Benante/i, topic: 'career' },
  { regex: /Playing with Opeth/i, topic: 'career' },
  { regex: /Working with Devin/i, topic: 'career' },
  { regex: /Berklee taught me/i, topic: 'career' },
];

// Find topic for a quote
function findTopic(quoteText) {
  for (const pattern of topicPatterns) {
    if (pattern.regex.test(quoteText)) {
      return pattern.topic;
    }
  }
  return 'philosophy'; // default
}

// Find all quotes and add topics
const quoteRegex = /\{\s*text:\s*"([^"]+)",\s*source:\s*"([^"]+)",\s*year:\s*(\d+)\s*\}/g;
let quotesUpdated = 0;

content = content.replace(quoteRegex, (match, text, source, year) => {
  if (match.includes('topic:')) return match; // already has topic
  const topic = findTopic(text);
  quotesUpdated++;
  return `{ text: "${text}", source: "${source}", year: ${year}, topic: "${topic}" }`;
});

fs.writeFileSync(filePath, content, 'utf8');
console.log(`Updated ${quotesUpdated} quotes with topics`);
