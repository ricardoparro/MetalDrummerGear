// Script to add spotlight data to drummers
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../api/drummers/index.js');
let content = fs.readFileSync(filePath, 'utf8');

// Spotlight data for 10 drummers
const spotlightData = {
  1: { // Lars Ulrich
    quickFacts: [
      "Co-founded Metallica with James Hetfield in 1981 in Los Angeles",
      "First metal drummer inducted into Rock and Roll Hall of Fame (2009)",
      "Co-produced every Metallica album since the Black Album"
    ],
    iconicMoment: "His double bass work on 'One' (1988) became a blueprint for thrash drumming. The Monsters of Rock 1991 performance drew 1.6 million fans.",
    gearHighlight: "Tama Starclassic Maple with signature LU1465 snare and Ahead aluminum sticks for durability."
  },
  2: { // Joey Jordison
    quickFacts: [
      "Performed on a rotating/inverting drum platform during Slipknot's legendary live shows",
      "Voted #1 drummer by Rhythm magazine and won Kerrang! 'Best Drummer' award",
      "Also played guitar for Murderdolls and filled in for Metallica and Korn"
    ],
    iconicMoment: "The 'Disasterpieces' drum solo (2002) - playing at superhuman speed while spinning upside-down became one of metal's most legendary performances.",
    gearHighlight: "Pearl Reference Series with signature 13x6.5\" snare and the iconic rotating drum platform."
  },
  3: { // Gene Hoglan
    quickFacts: [
      "Nicknamed 'The Atomic Clock' for his metronomic precision at extreme speeds",
      "Has recorded with 40+ bands including Death, Testament, Strapping Young Lad, and Dethklok",
      "Completely self-taught - never took a formal drum lesson in his life"
    ],
    iconicMoment: "His work on Death's 'Individual Thought Patterns' (1993) redefined technical death metal, combining jazz musicality with extreme power.",
    gearHighlight: "Pearl Reference Pure with 15\" Sabian AAX Hi-Hats and two single pedals instead of a double for maximum control."
  },
  4: { // Dave Lombardo
    quickFacts: [
      "Born in Cuba, moved to LA at age 2 - became the 'Godfather of Double Bass'",
      "Pioneered the double bass drumming style that defined thrash metal in the 1980s",
      "Has collaborated with Mike Patton in Fantômas, Dead Cross, and Mr. Bungle"
    ],
    iconicMoment: "'Reign in Blood' (1986) - 29 minutes of the fastest, most intense drumming ever recorded, redefining what was possible in metal.",
    gearHighlight: "Tama Starclassic with Paiste RUDE cymbals and his signature Promark 2Bx sticks for power and speed."
  },
  5: { // Tomas Haake
    quickFacts: [
      "Pioneered polyrhythmic drumming that spawned the entire 'djent' movement",
      "Uses two single pedals instead of a double for independent foot control",
      "'Bleed' took 6 months of daily practice - now considered one of metal's hardest drum tracks"
    ],
    iconicMoment: "The mind-bending polyrhythms on 'obZen' (2008) that seem to defy physics, playing in multiple time signatures simultaneously.",
    gearHighlight: "Sonor SQ2 Heavy Beech with 24\"x18\" bass drum and Wincent signature sticks - massive sound, surgical precision."
  },
  6: { // George Kollias
    quickFacts: [
      "Holds multiple speed records - consistently clocks 280+ BPM single-stroke rolls",
      "Co-designed the Pearl Demon XR double pedal with Pearl engineers",
      "Runs a successful drum school in Athens and has released acclaimed instructional DVDs"
    ],
    iconicMoment: "The 'Shall Rise Shall Be Dead' playthrough (5M+ views) showcasing extreme speed while discussing technique - the gold standard for death metal drumming tutorials.",
    gearHighlight: "Pearl Masterworks Stadium Exotic with signature 14x6.5\" snare and Vic Firth SGK signature sticks."
  },
  11: { // Vinnie Paul
    quickFacts: [
      "Co-founded Pantera with brother Dimebag Darrell - defined the groove metal sound",
      "Pantera received four Grammy nominations for Best Metal Performance",
      "His massive double bass sound influenced an entire generation of metal drummers"
    ],
    iconicMoment: "The crushing groove on 'Walk' (1992) and 'Cowboys From Hell' created the template for groove metal that countless bands still follow today.",
    gearHighlight: "ddrum Vinnie Paul Signature Series with massive 14x8\" signature snare - the heaviest sound in metal."
  },
  13: { // Mike Portnoy
    quickFacts: [
      "Won 30+ 'Drummer of the Year' awards from Modern Drummer magazine readers",
      "Co-founded Dream Theater and defined progressive metal drumming for 25 years",
      "Rejoined Dream Theater in 2023 after 13 years - one of metal's most anticipated reunions"
    ],
    iconicMoment: "The 'Instrumedley' performance (4.5M views) - 15+ minutes of seamlessly transitioning between Dream Theater's most complex sections.",
    gearHighlight: "Tama Starclassic with Sabian HHX cymbals and signature Melody Master snare - the progressive metal standard."
  },
  14: { // Danny Carey
    quickFacts: [
      "Voted best drummer by Modern Drummer readers multiple times",
      "Incorporates sacred geometry and occult symbolism into his drumming approach",
      "Stands 6'5\" and plays one of the largest drum kits in rock music"
    ],
    iconicMoment: "The 10+ minute drum performance in 'Pneuma' showcasing polyrhythmic mastery - his live drum cam videos have tens of millions of views.",
    gearHighlight: "Sonor SQ2 Heavy Beech with massive 14x8\" bronze signature snare and Mandala electronic pads."
  },
  29: { // Igor Cavalera
    quickFacts: [
      "Co-founded Sepultura with brother Max in 1984 at age 14",
      "Pioneered the blend of thrash metal with tribal/world music influences",
      "Now explores electronic music with Mixhell and plays with Soulwax"
    ],
    iconicMoment: "The tribal drumming on 'Roots' (1996) fused Brazilian percussion with extreme metal, creating a genre-defining album that influenced countless bands.",
    gearHighlight: "Tama Starclassic Maple with Paiste RUDE cymbals - from thrash speed to tribal grooves."
  }
};

// Find each drummer by id and add spotlight after videos/quotes
for (const [id, spotlight] of Object.entries(spotlightData)) {
  const idNum = parseInt(id);
  
  // Create the spotlight object string
  const spotlightStr = `,
    spotlight: {
      quickFacts: ${JSON.stringify(spotlight.quickFacts, null, 8).replace(/\n/g, '\n    ')},
      iconicMoment: "${spotlight.iconicMoment.replace(/"/g, '\\"')}",
      gearHighlight: "${spotlight.gearHighlight.replace(/"/g, '\\"')}"
    }`;
  
  // Find the pattern: end of drummer object before next id
  // We need to find the closing ] of videos or quotes array, followed by closing }
  // Then insert the spotlight before the }
  
  // Pattern: look for the drummer by id and find where to insert
  const idPattern = new RegExp(`(id: ${idNum},\\s*\\n[\\s\\S]*?)(\\n  \\},\\n  \\{\\n    id: ${idNum + 1},|\\n];\\n\\nexport)`, 'm');
  
  const match = content.match(idPattern);
  if (match && !match[1].includes('spotlight:')) {
    // Find the last ] before the closing }
    const drummerContent = match[1];
    const lastArrayClose = drummerContent.lastIndexOf('    ]');
    if (lastArrayClose !== -1) {
      const insertPos = drummerContent.indexOf('\n', lastArrayClose);
      const beforeInsert = drummerContent.substring(0, insertPos);
      const afterInsert = drummerContent.substring(insertPos);
      const newDrummerContent = beforeInsert + spotlightStr + afterInsert;
      content = content.replace(match[1], newDrummerContent);
      console.log(`Added spotlight to drummer id ${id}`);
    }
  } else if (match && match[1].includes('spotlight:')) {
    console.log(`Spotlight already exists for drummer id ${id}`);
  } else {
    console.log(`Could not find drummer id ${id}`);
  }
}

fs.writeFileSync(filePath, content);
console.log('Done!');
