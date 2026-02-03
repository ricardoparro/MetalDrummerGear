// Script to add spotlight data to drummers
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'api/drummers/index.js');
let content = fs.readFileSync(filePath, 'utf8');

// Spotlight data for 10 drummers
const spotlights = {
  1: `
    spotlight: {
      quickFacts: [
        'Co-founded Metallica in 1981 in Los Angeles',
        'First metal drummer to use aluminum sticks (Ahead)',
        'Has sold over 125 million albums worldwide'
      ],
      iconicMoment: 'His aggressive double-bass patterns on "One" and the iconic drum intro to "Enter Sandman" defined thrash metal drumming for a generation.',
      gearHighlight: 'His signature Tama LU1465 snare delivers the punchy, cutting tone heard on every Metallica album since the 90s.'
    }`,
  2: `
    spotlight: {
      quickFacts: [
        'Recorded drums for Iowa album in just 10 days',
        'Famous for playing on a rotating/inverted drum riser',
        'Voted #1 in Revolver\\'s "Greatest Metal Drummers" list'
      ],
      iconicMoment: 'His blistering performance on Slipknot\\'s "Iowa" album is considered one of the most intense drumming recordings in metal history.',
      gearHighlight: 'The Pearl Joey Jordison Signature snare (13x6.5") became the go-to snare for aggressive nu-metal and death metal drummers worldwide.'
    }`,
  3: `
    spotlight: {
      quickFacts: [
        'Nicknamed "The Atomic Clock" for metronomic precision',
        'Played on Death\\'s legendary "Individual Thought Patterns"',
        'Has performed with over 20 major metal bands'
      ],
      iconicMoment: 'His work with Death on "Symbolic" elevated technical death metal drumming to an art form, inspiring countless drummers.',
      gearHighlight: 'Gene\\'s Pearl Reference Pure kit delivers the perfect balance of power and articulation for extreme metal.'
    }`,
  4: `
    spotlight: {
      quickFacts: [
        'Pioneered thrash metal double-bass drumming in the 80s',
        'Recorded "Reign in Blood" in just 3 weeks',
        'Grammy winner for Best Metal Performance (Christ Illusion)'
      ],
      iconicMoment: 'His drumming on Slayer\\'s "Reign in Blood" redefined speed and aggression in metal, making it one of the most influential albums ever.',
      gearHighlight: 'His Paiste RUDE cymbals and Tama Iron Cobra pedals deliver the cutting attack and speed that defined thrash metal.'
    }`,
  5: `
    spotlight: {
      quickFacts: [
        'Uses two single bass pedals instead of a double pedal',
        '"Bleed" took 6 months of daily practice to master',
        'His polyrhythms spawned the entire djent movement'
      ],
      iconicMoment: 'The drum pattern in "Bleed" is considered one of the most technically challenging pieces ever written for drums.',
      gearHighlight: 'His Sonor SQ2 Heavy Beech kit with Porter & Davies tactile throne provides the articulation and feel needed for polyrhythmic precision.'
    }`,
  6: `
    spotlight: {
      quickFacts: [
        'Holds multiple world records for bass drum speed',
        'Co-designed the Pearl Demon XR double pedal',
        'Also a renowned drum educator and clinician'
      ],
      iconicMoment: 'His extreme blast beat technique on Nile\\'s Egyptian-themed death metal raised the bar for technical drumming worldwide.',
      gearHighlight: 'The Pearl George Kollias Signature snare and Demon XR pedals are built for extreme speed and power.'
    }`,
  7: `
    spotlight: {
      quickFacts: [
        'Voted #1 metal drummer by Modern Drummer 2024',
        'Joined Slipknot in 2024 after 13 years with Sepultura',
        'Known for explosive live performances and showmanship'
      ],
      iconicMoment: 'His seamless transition from Sepultura to Slipknot proved he could honor both bands\\' legacies while adding his own intensity.',
      gearHighlight: 'His Tama Starclassic Bubinga with dual bass drums delivers the thunderous power needed for both thrash and nu-metal.'
    }`,
  8: `
    spotlight: {
      quickFacts: [
        'Session drummer for David Lee Roth before joining Korn',
        'Seamlessly replaced original drummer David Silveria',
        'Known for combining technical skill with heavy grooves'
      ],
      iconicMoment: 'His ability to nail Korn\\'s classic songs while bringing fresh energy proved he was the perfect fit for the nu-metal legends.',
      gearHighlight: 'His Pearl Reference Series combined with DW 9002 pedals delivers the tight, punchy sound essential for Korn\\'s down-tuned heaviness.'
    }`,
  9: `
    spotlight: {
      quickFacts: [
        'Hip-hop influenced drumming defined the rap-metal sound',
        'Uses OCDP custom acrylic drums for visual impact',
        'Founding member of Limp Bizkit since 1994'
      ],
      iconicMoment: 'His funk-meets-metal grooves on "Nookie" and "Rollin\\'" helped make Limp Bizkit one of the biggest bands of the late 90s.',
      gearHighlight: 'His OCDP Type 5 Acrylic kit with 40-ply vented snare produces the unique visual and sonic impact that defines Limp Bizkit\\'s sound.'
    }`,
  10: `
    spotlight: {
      quickFacts: [
        'Son of E Street Band drummer Max Weinberg',
        'Joined Slipknot at age 23, replacing Joey Jordison',
        'Now touring with Suicidal Tendencies on Metallica\\'s M72 tour'
      ],
      iconicMoment: 'His "Unsainted" drum playthrough video has over 15 million views, showcasing his ability to honor Joey Jordison\\'s legacy while adding his own power.',
      gearHighlight: 'His SJC Custom Drums with "The Crucible" 48-ply brass snare delivers crushing attack for both Slipknot and Suicidal Tendencies.'
    }`
};

// Add spotlight data to each drummer
for (let id = 1; id <= 10; id++) {
  // Find the pattern for each drummer's closing bracket before the next drummer
  const regex = new RegExp(`(id: ${id},[\\s\\S]*?)(\\n  },\\n  \\{\\n    id: ${id + 1},)`, 'm');
  
  if (id === 10) {
    // For the last one, match differently
    const lastRegex = new RegExp(`(id: 10,[\\s\\S]*?)(\\n  },\\n  \\{\\n    id: 11,)`, 'm');
    content = content.replace(lastRegex, (match, drummerContent, nextDrummer) => {
      // Check if spotlight already exists
      if (drummerContent.includes('spotlight:')) {
        return match;
      }
      // Insert spotlight before the closing brace
      const insertPoint = drummerContent.lastIndexOf('    ]');
      if (insertPoint === -1) {
        // If no array found, insert before the end
        return drummerContent + ',' + spotlights[id] + nextDrummer;
      }
      // Find the actual end of the drummer object
      const lines = drummerContent.split('\n');
      const lastArrayLine = lines.findIndex((line, idx) => idx > 0 && line.match(/^\s{4}\]$/) && !lines[idx+1]?.match(/^\s{4}[a-z]/));
      if (lastArrayLine > 0) {
        lines.splice(lastArrayLine + 1, 0, ',' + spotlights[id]);
        return lines.join('\n') + nextDrummer;
      }
      return match;
    });
  } else {
    content = content.replace(regex, (match, drummerContent, nextDrummer) => {
      // Check if spotlight already exists
      if (drummerContent.includes('spotlight:')) {
        return match;
      }
      // Find the last array closing bracket (usually gearTimeline or quotes)
      const lines = drummerContent.split('\n');
      let insertIdx = -1;
      for (let i = lines.length - 1; i >= 0; i--) {
        if (lines[i].match(/^\s{4}\]$/)) {
          insertIdx = i;
          break;
        }
      }
      if (insertIdx > 0) {
        lines.splice(insertIdx + 1, 0, ',' + spotlights[id]);
        return lines.join('\n') + nextDrummer;
      }
      return match;
    });
  }
}

fs.writeFileSync(filePath, content);
console.log('Spotlight data added to 10 drummers');
