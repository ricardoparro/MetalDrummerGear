#!/usr/bin/env node
/**
 * Generate public/llms/index.md - Master index for LLM crawlers
 * Issue #451 - Create markdown API endpoints
 */

const fs = require('fs');
const path = require('path');

// Read the drummers index.js file and extract the array
const drummersPath = path.join(__dirname, '../api/drummers/index.js');
const drummersContent = fs.readFileSync(drummersPath, 'utf-8');

// Extract the drummers array using regex
const arrayMatch = drummersContent.match(/const drummers = (\[[\s\S]*?\]);[\s\S]*?export default function handler/);
if (!arrayMatch) {
  console.error('Could not extract drummers array');
  process.exit(1);
}

// Parse drummers
let drummers;
try {
  drummers = eval(arrayMatch[1]);
} catch (e) {
  console.error('Error parsing drummers:', e);
  process.exit(1);
}

const today = new Date().toISOString().split('T')[0];

function generateSlug(name) {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

let output = `# MetalForge - LLM Content Index

> Last Updated: ${today}  
> Source: https://metalforge.io

## About MetalForge

MetalForge is a comprehensive database of professional metal drummers and their gear setups. 
This index provides machine-readable links to all content optimized for LLM consumption.

---

## LLM Resources

| Resource | URL | Description |
|----------|-----|-------------|
| Main Site | https://metalforge.io | Interactive web application |
| llms.txt | https://metalforge.io/llms.txt | Site overview for LLMs |
| llms-full.txt | https://metalforge.io/llms-full.txt | Complete database dump |
| Sitemap | https://metalforge.io/sitemap.xml | XML sitemap |
| API - Drummers | https://metalforge.io/api/drummers | JSON API endpoint |
| API - Quotes | https://metalforge.io/api/quotes | Drummer quotes JSON |

---

## Drummer Profiles (${drummers.length} total)

| Drummer | Band | Genre | Profile | Markdown API |
|---------|------|-------|---------|--------------|
`;

// Generate table rows for actual drummers
for (const d of drummers) {
  const slug = generateSlug(d.name);
  output += `| ${d.name} | ${d.band} | ${d.genre} | [Profile](https://metalforge.io/drummer/${slug}) | [Markdown](https://metalforge.io/api/drummer/${slug}/markdown) |\n`;
}

output += `
---

## Content Categories

### By Genre
- **Thrash Metal:** Lars Ulrich (Metallica), Dave Lombardo (Slayer), Charlie Benante (Anthrax)
- **Death Metal:** Gene Hoglan (Death/Testament), George Kollias (Nile), Pete Sandoval (Morbid Angel)
- **Black Metal:** Hellhammer (Mayhem), Inferno (Behemoth)
- **Progressive Metal:** Mike Portnoy (Dream Theater), Danny Carey (Tool), Brann Dailor (Mastodon)
- **Nu-Metal:** Joey Jordison (Slipknot), Jay Weinberg (Slipknot), Ray Luzier (Korn)
- **Groove Metal:** Vinnie Paul (Pantera), Chris Adler (Lamb of God)
- **Djent:** Tomas Haake (Meshuggah), Matt Halpern (Periphery)

### Featured Collections
- [Fastest Metal Drummers](https://metalforge.io/lists/fastest-drummers)
- [Most Innovative Drummers](https://metalforge.io/lists/most-innovative-drummers)
- [Death Metal Drummers](https://metalforge.io/lists/death-metal-drummers)
- [Quick Facts](https://metalforge.io/facts)

---

## API Usage

### Get All Drummers
\`\`\`
GET https://metalforge.io/api/drummers
Accept: application/json
\`\`\`

### Get Specific Drummer
\`\`\`
GET https://metalforge.io/api/drummers/{id}
Accept: application/json
\`\`\`

### Get Drummer as Markdown
\`\`\`
GET https://metalforge.io/api/drummer/{slug}/markdown
Accept: text/markdown
\`\`\`

---

## Structured Data

All pages include Schema.org structured data:
- \`Person\` schema for drummer profiles
- \`FAQPage\` for common gear questions
- \`VideoObject\` for embedded performances
- \`Quotation\` for drummer quotes
- \`MusicGroup\` for band information

---

## Contact & Updates

- Website: https://metalforge.io
- Twitter: [@MetalDrumGear](https://twitter.com/MetalDrumGear)

For data corrections or additions, please visit the website.

---

*This index is auto-generated and updated regularly.*
`;

// Write the output
const outputPath = path.join(__dirname, '../public/llms/index.md');
fs.writeFileSync(outputPath, output);
console.log(`✅ Generated llms/index.md with ${drummers.length} drummers`);
