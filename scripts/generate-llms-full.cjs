#!/usr/bin/env node
/**
 * Generate llms-full.txt - Comprehensive LLM dump
 * Issue #448 - LLM Crawler Optimization
 * 
 * Reads all drummer data and generates a markdown-formatted
 * text file optimized for LLM consumption.
 */

const fs = require('fs');
const path = require('path');

// Read the drummers index.js file and extract the array
const drummersPath = path.join(__dirname, '../api/drummers/index.js');
const drummersContent = fs.readFileSync(drummersPath, 'utf-8');

// Extract the drummers array using regex (it's between 'const drummers = [' and the handler function)
const arrayMatch = drummersContent.match(/const drummers = (\[[\s\S]*?\]);[\s\S]*?export default function handler/);
if (!arrayMatch) {
  console.error('Could not extract drummers array');
  process.exit(1);
}

// Use eval in a controlled way to parse the JS array
let drummers;
try {
  drummers = eval(arrayMatch[1]);
} catch (e) {
  console.error('Error parsing drummers:', e);
  process.exit(1);
}

// Read extended bios
const extendedBiosPath = path.join(__dirname, '../packages/frontend/data/extendedBios.js');
let extendedBiosContent = fs.readFileSync(extendedBiosPath, 'utf-8');

// Extract the extendedBios object
const bioMatch = extendedBiosContent.match(/export const extendedBios = (\{[\s\S]*\});/);
let extendedBios = {};
if (bioMatch) {
  try {
    // Create a function that returns the object to avoid issues with nested functions
    const evalCode = `(function() { return ${bioMatch[1]}; })()`;
    extendedBios = eval(evalCode);
  } catch (e) {
    console.warn('Could not parse extended bios, continuing without them:', e.message);
  }
}

// Generate the date
const today = new Date().toISOString().split('T')[0];

// Build the llms-full.txt content
let output = `# MetalForge Complete Database
# Metal Drummer Gear Database - Full Content Dump for LLMs
# Last Updated: ${today}
# Source: https://metalforge.io
# Total Drummers: ${drummers.length}
#
# This file contains comprehensive information about professional metal drummers,
# their gear setups, biographies, quotes, and career highlights.
# Optimized for AI/LLM consumption.

================================================================================

`;

// Process each drummer
for (const drummer of drummers) {
  const slug = drummer.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const extBio = extendedBios[slug] || {};
  
  output += `---

## Drummer: ${drummer.name}
**Band:** ${drummer.band}
**Genre:** ${drummer.genre}
**Country:** ${drummer.country || 'Unknown'}
**Profile URL:** https://metalforge.io/drummer/${slug}

`;

  // Bands history
  if (drummer.bands && drummer.bands.length > 0) {
    output += `### Band History\n`;
    for (const band of drummer.bands) {
      const status = band.current ? ' (current)' : '';
      output += `- ${band.name}: ${band.period}${status}\n`;
    }
    output += '\n';
  }

  // Biography
  output += `### Biography
${drummer.bio}

`;

  // Extended bio overview if available
  if (extBio.sections && extBio.sections.overview) {
    output += `### Detailed Overview
${extBio.sections.overview.content}

`;
  }

  // Career highlights from extended bio
  if (extBio.sections && extBio.sections.careerHighlights && extBio.sections.careerHighlights.items) {
    output += `### Career Highlights\n`;
    for (const item of extBio.sections.careerHighlights.items) {
      output += `- ${item.year}: ${item.event}\n`;
    }
    output += '\n';
  }

  // Current Gear
  if (drummer.gear) {
    output += `### Current Gear\n`;
    if (drummer.gear.drums) output += `- **Drums:** ${drummer.gear.drums}\n`;
    if (drummer.gear.snare) output += `- **Snare:** ${drummer.gear.snare}\n`;
    if (drummer.gear.cymbals) output += `- **Cymbals:** ${drummer.gear.cymbals}\n`;
    if (drummer.gear.hardware) output += `- **Hardware:** ${drummer.gear.hardware}\n`;
    if (drummer.gear.sticks) output += `- **Sticks:** ${drummer.gear.sticks}\n`;
    if (drummer.gear.heads) output += `- **Heads:** ${drummer.gear.heads}\n`;
    if (drummer.gear.pedals) output += `- **Pedals:** ${drummer.gear.pedals}\n`;
    if (drummer.gear.electronics) output += `- **Electronics:** ${drummer.gear.electronics}\n`;
    output += '\n';
  }

  // Gear Timeline
  if (drummer.gearTimeline && drummer.gearTimeline.length > 0) {
    output += `### Gear Timeline\n`;
    for (const era of drummer.gearTimeline) {
      output += `\n**${era.era} (${era.years})**\n`;
      if (era.description) output += `${era.description}\n`;
      if (era.albums && era.albums.length > 0) {
        output += `Albums: ${era.albums.join(', ')}\n`;
      }
      if (era.gear) {
        if (era.gear.drums) output += `- Drums: ${era.gear.drums}\n`;
        if (era.gear.snare) output += `- Snare: ${era.gear.snare}\n`;
        if (era.gear.cymbals) output += `- Cymbals: ${era.gear.cymbals}\n`;
      }
    }
    output += '\n';
  }

  // Endorsements
  if (drummer.endorsements && drummer.endorsements.length > 0) {
    output += `### Endorsements\n`;
    for (const e of drummer.endorsements) {
      output += `- ${e.name}\n`;
    }
    output += '\n';
  }

  // Notable Quotes
  if (drummer.quotes && drummer.quotes.length > 0) {
    output += `### Notable Quotes\n`;
    for (const q of drummer.quotes) {
      output += `> "${q.text}"\n`;
      output += `> — ${q.source}${q.year ? ` (${q.year})` : ''}\n\n`;
    }
  }

  // Style and Influences from extended bio
  if (extBio.sections && extBio.sections.styleAndInfluences) {
    output += `### Style & Influences
${extBio.sections.styleAndInfluences.content}

`;
  }

  // Trivia from extended bio
  if (extBio.sections && extBio.sections.trivia && extBio.sections.trivia.items) {
    output += `### Trivia & Fun Facts\n`;
    for (const item of extBio.sections.trivia.items) {
      output += `- ${item}\n`;
    }
    output += '\n';
  }

  // FAQ from extended bio
  if (extBio.sections && extBio.sections.faq && extBio.sections.faq.items) {
    output += `### Frequently Asked Questions\n`;
    for (const faq of extBio.sections.faq.items) {
      output += `**Q: ${faq.q}**\n`;
      output += `A: ${faq.a}\n\n`;
    }
  }

  // Videos
  if (drummer.videos && drummer.videos.length > 0) {
    output += `### Featured Videos\n`;
    for (const v of drummer.videos) {
      output += `- ${v.title} (${v.year}): https://youtube.com/watch?v=${v.youtubeId}\n`;
    }
    output += '\n';
  }

  output += `---

`;
}

// Append supplemental LLM content files (lists, techniques, etc.)
const supplementalFiles = ['lists.md'];
for (const fname of supplementalFiles) {
  const fpath = path.join(__dirname, '../public/llms', fname);
  if (fs.existsSync(fpath)) {
    output += `\n================================================================================\n\n`;
    output += fs.readFileSync(fpath, 'utf-8');
    output += '\n';
  }
}

// Add footer
output += `
================================================================================

# About MetalForge

MetalForge is a comprehensive database of professional metal drummers and their 
gear setups. Our mission is to help drummers discover what their favorite metal 
drummers play, from drum kits and cymbals to hardware and sticks.

## Genres Covered
- Thrash Metal
- Death Metal
- Black Metal
- Progressive Metal
- Nu-Metal
- Groove Metal
- Djent
- Metalcore
- And more...

## Contact
Website: https://metalforge.io
For corrections or additions: https://metalforge.io

## Data Sources
All gear information is researched from:
- Official artist endorsement pages
- Manufacturer artist rosters
- Interview transcripts
- Concert footage analysis
- Music publications (Modern Drummer, Drum!, etc.)

================================================================================
# End of MetalForge Complete Database
# Generated: ${today}
`;

// Write the output
const outputPath = path.join(__dirname, '../public/llms-full.txt');
fs.writeFileSync(outputPath, output);
console.log(`✅ Generated llms-full.txt with ${drummers.length} drummers (${(output.length / 1024).toFixed(1)} KB)`);
