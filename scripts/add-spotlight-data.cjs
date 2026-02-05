// Script to add spotlight data to drummers
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../api/drummers/index.js');
let content = fs.readFileSync(filePath, 'utf8');

// Spotlight data for first 10 drummers
const spotlights = {
  'Lars Ulrich': {
    quickFacts: [
      'Co-founded Metallica in 1981 after a classified ad',
      'First Danish musician inducted into Rock Hall of Fame',
      'Infamously sued Napster in 2000 over file sharing'
    ],
    iconicMoment: 'The double bass intro to "One" that redefined thrash drumming',
    gearHighlight: 'Ahead aluminum drumsticks - pioneered their use in metal'
  },
  'Joey Jordison': {
    quickFacts: [
      'Played on a rotating/inverted drum platform live',
      'Recorded Slipknot\'s debut at age 23',
      'Could play at 260+ BPM with precision'
    ],
    iconicMoment: 'The 6-minute drum solo in "Disasterpieces" while spinning upside down',
    gearHighlight: 'Pearl 13x6.5" signature snare - smaller for faster response'
  },
  'Gene Hoglan': {
    quickFacts: [
      'Nicknamed "The Atomic Clock" for metronomic timing',
      'Self-taught through playing along to Rush albums',
      'Has recorded with over 20 major metal bands'
    ],
    iconicMoment: 'The complex polyrhythms on Death\'s "Symbolic" album',
    gearHighlight: 'Uses a relatively small kit despite extreme metal credentials'
  },
  'Dave Lombardo': {
    quickFacts: [
      'Called "The Godfather of Double Bass"',
      'Joined Slayer at just 16 years old',
      'Has collaborated with John Zorn and Fantômas'
    ],
    iconicMoment: 'The relentless double bass on "Angel of Death" intro',
    gearHighlight: 'Tama Speed Cobra pedals - requires finesse over brute force'
  },
  'Tomas Haake': {
    quickFacts: [
      'Pioneer of polymetric/djent drumming',
      'Programs Meshuggah\'s click tracks himself',
      'Plays complex patterns on electronic V-Drums for writing'
    ],
    iconicMoment: 'The mind-bending 23/16 groove on "Bleed" - took 6 months to master',
    gearHighlight: 'Minimal kit setup that produces maximum complexity'
  },
  'George Kollias': {
    quickFacts: [
      'Holds speed records for single and double bass',
      'Runs his own drum instructional program',
      'Played Nile\'s complex Egyptian-themed death metal since 2004'
    ],
    iconicMoment: 'Performing "Kafir!" live - 280 BPM blast beats sustained',
    gearHighlight: 'Uses heel-toe technique for blazing single pedal speed'
  },
  'Igor Cavalera': {
    quickFacts: [
      'Founded Sepultura with brother Max at age 14',
      'Pioneered incorporating tribal rhythms into metal',
      'Now explores electronic music as a DJ'
    ],
    iconicMoment: 'The tribal percussion breakdown on "Roots Bloody Roots"',
    gearHighlight: 'Integrated Brazilian percussion into his metal kit'
  },
  'Raymond Herrera': {
    quickFacts: [
      'Pioneering industrial metal drummer with Fear Factory',
      'Known for precise, machine-like double bass',
      'His patterns influenced djent and industrial metal'
    ],
    iconicMoment: 'The mechanical precision on "Replica" - man vs machine',
    gearHighlight: 'Used triggers early to achieve his signature industrial sound'
  },
  'Vinnie Paul': {
    quickFacts: [
      'Founded Pantera with brother Dimebag Darrell',
      'Invented the "Pantera groove" with half-time feels',
      'Built his own recording studio: Chasin\' Jason Studios'
    ],
    iconicMoment: 'The iconic groove intro to "Walk" - simple but perfect',
    gearHighlight: 'Massive 26" kick drums for his huge low-end sound'
  },
  'Charlie Benante': {
    quickFacts: [
      'One of thrash metal\'s founding drummers in Anthrax',
      'Also plays guitar and contributes to songwriting',
      'First to incorporate blast beats in thrash (1984)'
    ],
    iconicMoment: 'The proto-blast beats on "Deathrider" predating death metal',
    gearHighlight: 'Pearl signature kit with extra-deep toms for power'
  }
};

// Add spotlight data after each drummer's last property (before the closing })
for (const [name, spotlight] of Object.entries(spotlights)) {
  // Find the drummer and add spotlight before their closing brace
  const namePattern = new RegExp(`(name: '${name.replace(/'/g, "\\'")}',)([\\s\\S]*?)(\\n  \\},\\n  \\{)`, 'm');
  const match = content.match(namePattern);
  
  if (match) {
    const spotlightStr = `,
    spotlight: {
      quickFacts: ${JSON.stringify(spotlight.quickFacts)},
      iconicMoment: ${JSON.stringify(spotlight.iconicMoment)},
      gearHighlight: ${JSON.stringify(spotlight.gearHighlight)}
    }`;
    
    // Insert before the closing },
    const fullMatch = match[0];
    const beforeClose = fullMatch.slice(0, -6); // Remove "\n  },\n  {"
    const afterClose = fullMatch.slice(-6); // Keep "\n  },\n  {"
    
    const newBlock = beforeClose + spotlightStr + afterClose;
    content = content.replace(fullMatch, newBlock);
    console.log(`✓ Added spotlight for ${name}`);
  } else {
    console.log(`✗ Could not find ${name}`);
  }
}

fs.writeFileSync(filePath, content);
console.log('\nDone!');
