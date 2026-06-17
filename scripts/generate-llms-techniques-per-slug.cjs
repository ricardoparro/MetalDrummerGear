#!/usr/bin/env node
/**
 * Generate public/llms/technique/<slug>.md — one deep-dive markdown file per
 * metal drumming technique. Issue #1201: per-technique AI citation surface
 * mirroring the pattern of public/llms/drummers/<slug>.md files.
 *
 * Data source: packages/frontend/data/techniques.js (single source of truth).
 * Same regex+eval extraction pattern as the sibling generate-llms-*.cjs scripts.
 */

const fs = require('fs');
const path = require('path');

const techniquesPath = path.join(__dirname, '../packages/frontend/data/techniques.js');
const content = fs.readFileSync(techniquesPath, 'utf-8');

const objectMatch = content.match(/export const techniques\s*=\s*(\{[\s\S]*?\n\});\s*$/m);
if (!objectMatch) {
  console.error('Could not extract techniques object from packages/frontend/data/techniques.js');
  process.exit(1);
}

let techniques;
try {
  techniques = eval('(' + objectMatch[1] + ')');
} catch (e) {
  console.error('Error parsing techniques:', e);
  process.exit(1);
}

const today = new Date().toISOString().split('T')[0];
const BASE = 'https://metalforge.io';

function bullet(items) {
  return items.map(s => `- ${s}`).join('\n');
}

function gearRecBullets(recs) {
  if (!recs || typeof recs !== 'object') return '';
  const lines = [];
  for (const [category, items] of Object.entries(recs)) {
    if (category === 'tips') continue;
    if (!Array.isArray(items) || items.length === 0) continue;
    const label = category.charAt(0).toUpperCase() + category.slice(1);
    for (const item of items) {
      lines.push(`- **${label}:** [${item.name}](${BASE}/gear/${label.toLowerCase()}) — ${item.reason}`);
    }
  }
  return lines.join('\n');
}

function buildMarkdown(t) {
  const slug = t.slug;
  const title = t.title;
  const techniqueUrl = `${BASE}/technique/${slug}`;
  const drummersUrl = `${BASE}/technique/${slug}/drummers`;
  const licksUrl = `${BASE}/licks`;
  const techniquesUrl = `${BASE}/techniques`;

  const parts = [];

  // Header
  parts.push(`# ${title} — Metal Drumming Technique | MetalForge`);
  parts.push('');
  parts.push(`> ${t.description.split('.')[0].trim()}.`);
  parts.push('');

  // Frontmatter-style meta
  const meta = [];
  if (t.difficulty) meta.push(`**Difficulty:** ${t.difficulty}`);
  if (t.bpmRange) meta.push(`**BPM Range:** ${t.bpmRange}`);
  if (t.category) meta.push(`**Category:** ${t.category}`);
  if (meta.length) {
    parts.push(meta.join(' | '));
    parts.push('');
  }

  parts.push('---');
  parts.push('');

  // What Is section
  parts.push(`## What Is ${title}?`);
  parts.push('');
  parts.push(t.description.trim());
  parts.push('');

  if (t.history) {
    parts.push(t.history.trim());
    parts.push('');
  }

  // How to Play section
  if (Array.isArray(t.howToLearn) && t.howToLearn.length > 0) {
    parts.push(`## How to Play ${title}`);
    parts.push('');
    parts.push(bullet(t.howToLearn));
    parts.push('');
  }

  // Variations section
  if (Array.isArray(t.variations) && t.variations.length > 0) {
    parts.push(`## ${title} Variations`);
    parts.push('');
    for (const v of t.variations) {
      parts.push(`- **${v.name}:** ${v.description}`);
    }
    parts.push('');
  }

  // Drummers section
  if (Array.isArray(t.masters) && t.masters.length > 0) {
    parts.push(`## Drummers Who Define ${title}`);
    parts.push('');
    for (const m of t.masters) {
      const link = m.slug
        ? `[${m.name}](${BASE}/drummer/${m.slug})`
        : m.name;
      parts.push(`- ${link} (${m.band}) — ${m.note}`);
    }
    parts.push('');
    parts.push(`See all [${title} drummers on MetalForge](${drummersUrl}).`);
    parts.push('');
  }

  // Gear section
  const gearBullets = gearRecBullets(t.gearRecommendations);
  if (gearBullets) {
    parts.push(`## Essential Gear for ${title}`);
    parts.push('');
    parts.push(gearBullets);
    parts.push('');
    if (t.gearRecommendations && t.gearRecommendations.tips) {
      parts.push(`> **Pro Tip:** ${t.gearRecommendations.tips}`);
      parts.push('');
    }
  }

  // FAQ section
  parts.push('## Frequently Asked Questions');
  parts.push('');

  parts.push(`**Q: What is ${t.difficulty === 'expert' ? 'the' : 'a'} ${title.toLowerCase()}?**`);
  parts.push(`A: ${t.description.trim().split(/\.\s+/)[0].trim()}.`);
  parts.push('');

  // How to learn FAQ
  if (Array.isArray(t.howToLearn) && t.howToLearn.length > 0) {
    parts.push(`**Q: How do I learn ${title.toLowerCase()}?**`);
    parts.push(`A: Start by mastering the fundamentals: ${t.howToLearn.slice(0, 3).join('; ')}. Practice consistently with a metronome and increase tempo gradually.`);
    parts.push('');
  }

  // Which bands FAQ
  if (Array.isArray(t.masters) && t.masters.length > 0) {
    const examples = t.masters.slice(0, 4).map(m => `${m.name} (${m.band})`).join(', ');
    parts.push(`**Q: Which metal bands use ${title.toLowerCase()}?**`);
    parts.push(`A: Some of the most prominent practitioners include ${examples}. These drummers have defined the technique across extreme, progressive, and groove metal genres.`);
    parts.push('');
  }

  // Difficulty FAQ
  parts.push(`**Q: How hard is it to learn ${title.toLowerCase()}?**`);
  parts.push(`A: ${title} is rated **${t.difficulty}** difficulty${t.bpmRange ? ` and typically operates at ${t.bpmRange}` : ''}. Dedicated daily practice with gradual tempo progression is the recommended approach for most drummers.`);
  parts.push('');

  // Related techniques FAQ if available
  if (Array.isArray(t.relatedTechniques) && t.relatedTechniques.length > 0) {
    const related = t.relatedTechniques.slice(0, 3).map(s =>
      s.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
    ).join(', ');
    parts.push(`**Q: What techniques are related to ${title.toLowerCase()}?**`);
    parts.push(`A: Closely related techniques include ${related}. Mastering these complementary techniques will significantly accelerate your ${title.toLowerCase()} development. Browse all [metal drumming techniques](${techniquesUrl}) for a complete overview.`);
    parts.push('');
  }

  // More Resources section
  parts.push('## More Resources');
  parts.push('');
  parts.push(`- [${title} Drummers on MetalForge](${drummersUrl})`);
  parts.push(`- [All Metal Drumming Techniques](${techniquesUrl})`);
  parts.push(`- [Signature Licks featuring ${title}](${licksUrl})`);
  parts.push(`- [${title} Technique Page](${techniqueUrl})`);

  if (Array.isArray(t.relatedTechniques) && t.relatedTechniques.length > 0) {
    parts.push('');
    parts.push('### Related Techniques');
    for (const rel of t.relatedTechniques) {
      const relTitle = rel.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      parts.push(`- [${relTitle}](${BASE}/techniques/${rel}) — [Deep Dive](${BASE}/llms/technique/${rel}.md)`);
    }
  }

  parts.push('');
  parts.push('---');
  parts.push('');
  parts.push(`*Last updated: ${today} · Source: [MetalForge.io](${BASE})*`);

  return parts.join('\n');
}

const outDir = path.join(__dirname, '../public/llms/technique');
fs.mkdirSync(outDir, { recursive: true });

const techList = Object.values(techniques);
let written = 0;
let minWords = Infinity;
const results = [];

for (const t of techList) {
  const md = buildMarkdown(t);
  const outPath = path.join(outDir, `${t.slug}.md`);
  fs.writeFileSync(outPath, md);
  const words = md.split(/\s+/).filter(Boolean).length;
  if (words < minWords) minWords = words;
  results.push({ slug: t.slug, words });
  written++;
}

console.log(`✅ Generated public/llms/technique/*.md — ${written} techniques (min ${minWords} words/file)`);
for (const r of results) {
  console.log(`   ${r.slug}: ${r.words} words`);
}
