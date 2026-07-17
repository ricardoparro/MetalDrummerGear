#!/usr/bin/env node
/**
 * Generate public/llms/studies/<slug>.md — one markdown mirror per /studies
 * page. Issue #4766 (phase 3/3 of the studies epic, #4763): this is L2 bait —
 * LLMs cite numbers with stated methodology, so each file leads with the
 * headline finding, includes the full ranked tables in markdown (not images),
 * and closes with a methodology section (dataset size, criteria, snapshot
 * date, bias notes) — matching the same rule 3 requirement the study pages
 * themselves follow.
 *
 * Data source: packages/frontend/data/studies/ (the STUDIES registry plus its
 * four generated data modules) — single source of truth, same registry the
 * hub, sitemap, and api/meta/[...path].js already read from. Unlike the sibling
 * generate-llms-*.cjs scripts (which regex+eval-extract from files not written
 * as clean ESM), the studies data is already plain ESM, so this script loads it
 * with a dynamic import() the same way .agents/scripts/post-to-x.cjs loads
 * drumsticks.js.
 */

const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const BASE = 'https://metalforge.io';
const STUDIES_DIR = path.join(__dirname, '../packages/frontend/data/studies');

async function loadStudiesData() {
  const [index, mostUsedGearBrands, tempoBySubgenre, drumEndorsementLandscape, kitConfigurations] = await Promise.all([
    import(pathToFileURL(path.join(STUDIES_DIR, 'index.js')).href),
    import(pathToFileURL(path.join(STUDIES_DIR, 'mostUsedGearBrands.js')).href),
    import(pathToFileURL(path.join(STUDIES_DIR, 'tempoBySubgenre.js')).href),
    import(pathToFileURL(path.join(STUDIES_DIR, 'drumEndorsementLandscape.js')).href),
    import(pathToFileURL(path.join(STUDIES_DIR, 'kitConfigurations.js')).href),
  ]);
  return {
    STUDIES: index.STUDIES,
    MOST_USED_GEAR_BRANDS: mostUsedGearBrands.MOST_USED_GEAR_BRANDS,
    TEMPO_BY_SUBGENRE: tempoBySubgenre.TEMPO_BY_SUBGENRE,
    DRUM_ENDORSEMENT_LANDSCAPE: drumEndorsementLandscape.DRUM_ENDORSEMENT_LANDSCAPE,
    KIT_CONFIGURATIONS: kitConfigurations.KIT_CONFIGURATIONS,
  };
}

function mdTable(headers, rows) {
  const lines = [];
  lines.push(`| ${headers.join(' | ')} |`);
  lines.push(`| ${headers.map(() => '---').join(' | ')} |`);
  rows.forEach((row) => lines.push(`| ${row.join(' | ')} |`));
  return lines.join('\n');
}

function buildMostUsedGearBrands(study, data) {
  const { categories, totalDrummers, generatedAt } = data;
  const categoryOrder = ['kits', 'cymbals', 'snares', 'sticks', 'pedals'];
  const parts = [];

  parts.push('## Headline Finding');
  parts.push('');
  parts.push(study.headlineStat.sentence);
  parts.push('');

  parts.push('## Key Tables');
  parts.push('');
  categoryOrder.forEach((key) => {
    const cat = categories[key];
    parts.push(`### ${cat.label} — Brand Usage`);
    parts.push('');
    parts.push(mdTable(
      ['Rank', 'Brand', 'Drummers', `% of ${totalDrummers}`, 'Example'],
      cat.ranked.slice(0, 5).map((r, i) => [
        String(i + 1),
        r.brand,
        String(r.count),
        `${r.percent}%`,
        r.drummers[0] ? r.drummers[0].name : '—',
      ])
    ));
    parts.push('');
  });

  parts.push('## Methodology');
  parts.push('');
  parts.push(`Dataset: ${totalDrummers} verified drummer profiles documented on MetalForge, snapshot dated ${generatedAt}. A drummer counts once per brand per category — a dual-brand cymbal setup (e.g. "Sabian AAX / Zildjian A Series") credits both brands. Percentages are of the full ${totalDrummers}-drummer roster, so a category's percentages can sum past 100% when multi-brand setups are common. Only current gear fields are counted; historical gear-timeline entries are excluded. This reflects the roster MetalForge has documented, not the entire population of professional metal drummers — a roster-composition bias, not a random sample.`);
  parts.push('');

  return parts.join('\n');
}

function buildTempoBySubgenre(study, data) {
  const { genres, hallOfSpeed, totalSongs, bpmVerified, overall, generatedAt } = data;
  const parts = [];

  parts.push('## Headline Finding');
  parts.push('');
  parts.push(study.headlineStat.sentence);
  parts.push('');

  parts.push('## Key Tables');
  parts.push('');
  parts.push('### Average Tempo by Subgenre');
  parts.push('');
  parts.push(mdTable(
    ['Rank', 'Subgenre', 'Songs', 'Avg BPM', 'Median BPM', 'Range'],
    [...genres]
      .sort((a, b) => b.avgBpm - a.avgBpm)
      .map((g, i) => [String(i + 1), g.label, String(g.songCount), String(g.avgBpm), String(g.medianBpm), `${g.minBpm}-${g.maxBpm}`])
  ));
  parts.push('');
  parts.push('### The 200+ BPM Club');
  parts.push('');
  parts.push(mdTable(
    ['Rank', 'Song', 'Band', 'BPM', 'Genre', 'Drummer'],
    hallOfSpeed.map((s, i) => [String(i + 1), `${s.song} (${s.year})`, s.band, String(s.bpm), s.genreLabel, s.drummer.name])
  ));
  parts.push('');

  parts.push('## Methodology');
  parts.push('');
  parts.push(`Dataset: ${totalSongs} songs in MetalForge's tempo database, snapshot dated ${generatedAt}. Overall average across all songs: ${overall.avgBpm} BPM (median ${overall.medianBpm} BPM). ${bpmVerified ? 'BPMs are per-song verified audio analysis.' : 'BPMs in this dataset are approximate — sourced from common tempo markings, not per-song verified audio analysis; treat exact figures as indicative, not laboratory-precise.'} Subgenre buckets follow each song's primary genre tag; songs spanning multiple subgenres are assigned to their most commonly cited genre.`);
  parts.push('');

  return parts.join('\n');
}

function buildDrumEndorsementLandscape(study, data) {
  const { brandReach, signatureModels, genreBrandMatrix, totalDrummers, generatedAt } = data;
  const categoryLabels = { kits: 'Kits', snares: 'Snares', cymbals: 'Cymbals', sticks: 'Sticks', pedals: 'Pedals' };
  const parts = [];

  parts.push('## Headline Finding');
  parts.push('');
  parts.push(study.headlineStat.sentence);
  parts.push('');

  parts.push('## Key Tables');
  parts.push('');
  parts.push('### Brand Reach — Roster-Wide');
  parts.push('');
  parts.push(mdTable(
    ['Rank', 'Brand', 'Drummers', `% of ${totalDrummers}`, 'Categories'],
    brandReach.slice(0, 8).map((b, i) => [String(i + 1), b.brand, String(b.count), `${b.percent}%`, b.categories.map((c) => categoryLabels[c]).join(', ')])
  ));
  parts.push('');
  parts.push('### Signature Drumsticks by Brand');
  parts.push('');
  parts.push(mdTable(
    ['Brand', 'Signature Models', 'Example Drummer'],
    signatureModels.sticks.signature.byBrand.map((b) => [b.brand, String(b.modelCount), b.drummers[0] ? b.drummers[0].name : '—'])
  ));
  parts.push('');
  parts.push('### Signature Snares by Brand');
  parts.push('');
  parts.push(mdTable(
    ['Brand', 'Signature Models', 'Example Drummer'],
    signatureModels.snares.signature.byBrand.map((b) => [b.brand, String(b.modelCount), b.drummers[0] ? b.drummers[0].name : '—'])
  ));
  parts.push('');
  parts.push('### Kit Brand by Genre');
  parts.push('');
  parts.push(mdTable(
    ['Genre', 'Drummers', 'Top Kit Brand'],
    genreBrandMatrix.buckets.map((g) => [g.genre, String(g.totalDrummers), `${g.topBrand} (${g.topBrandCount})`])
  ));
  parts.push('');

  parts.push('## Methodology');
  parts.push('');
  parts.push(`Dataset: ${totalDrummers} documented drummers, snapshot dated ${generatedAt}. Brand reach counts a drummer once per brand regardless of how many categories that brand appears in for them. Signature-model counts are separate: they count named product models, not drummers — one drummer with two signature snares counts twice there. Cymbals have no per-model signature flag in this dataset — a real data-coverage gap, not evidence that no metal drummer has a signature cymbal line. Genre buckets in the brand matrix only include genres with 2 or more drummers; single-drummer genre buckets are too thin to support a brand pattern claim and are omitted.`);
  parts.push('');

  return parts.join('\n');
}

function buildKitConfigurations(study, data) {
  const { pedalConfig, cymbalSetupSize, explicitShellConfigs, totalDrummers, generatedAt } = data;
  const pedalLabels = {
    doubleBass: 'Double Bass (twin kicks)',
    twinSinglePedals: 'Twin Single Pedals',
    doublePedal: 'Double Pedal',
    singlePedal: 'Single Pedal',
    unspecified: 'Unspecified',
  };
  const pedalOrder = ['doublePedal', 'doubleBass', 'twinSinglePedals', 'singlePedal', 'unspecified'];
  const parts = [];

  parts.push('## Headline Finding');
  parts.push('');
  parts.push(study.headlineStat.sentence);
  parts.push('');

  parts.push('## Key Tables');
  parts.push('');
  parts.push('### Bass Pedal Configuration');
  parts.push('');
  parts.push(mdTable(
    ['Configuration', 'Drummers', `% of ${totalDrummers}`],
    pedalOrder
      .filter((key) => pedalConfig.overall[key] > 0)
      .map((key) => [pedalLabels[key], String(pedalConfig.overall[key]), `${Math.round((pedalConfig.overall[key] / totalDrummers) * 1000) / 10}%`])
  ));
  parts.push('');
  parts.push('### Cymbal Setup Size by Genre');
  parts.push('');
  parts.push(mdTable(
    ['Genre', 'Drummers (verified)', 'Avg Pieces', 'Median Pieces'],
    cymbalSetupSize.byGenre.map((g) => [g.genre, String(g.datasetSize), String(g.avgPieces), String(g.medianPieces)])
  ));
  parts.push('');
  parts.push('### Full Shell Configurations (Documented Subset)');
  parts.push('');
  parts.push(mdTable(
    ['Drummer', 'Band', 'Total Shells', 'Full Config'],
    explicitShellConfigs.map((c) => [c.drummerName, c.band, String(c.totalShells), c.raw])
  ));
  parts.push('');

  parts.push('## Methodology');
  parts.push('');
  parts.push(`Dataset: ${totalDrummers} documented drummers, snapshot dated ${generatedAt}. Pedal-configuration classification is text-pattern based against each drummer's literal drums/hardware fields — "unspecified" means neither field contained an unambiguous single/double-pedal marker, not that the drummer has no pedal. Cymbal-setup size covers only the ${cymbalSetupSize.datasetSize} of ${totalDrummers} drummers with a verified, fully parsed cymbal setup. Genre breakdowns only include genre buckets with 2 or more drummers.`);
  parts.push('');

  return parts.join('\n');
}

const BUILDERS = {
  'most-used-gear-brands-metal': buildMostUsedGearBrands,
  'metal-tempo-by-subgenre': buildTempoBySubgenre,
  'drum-endorsement-landscape': buildDrumEndorsementLandscape,
  'metal-kit-configurations': buildKitConfigurations,
};

function buildMarkdown(study, data, today) {
  const studyUrl = `${BASE}/studies/${study.slug}`;
  const parts = [];

  parts.push(`# ${study.title}`);
  parts.push('');
  parts.push(`> **Last updated:** ${today} · **Source:** [MetalForge.io](${BASE}) · [View full study →](${studyUrl})`);
  parts.push('');
  parts.push('---');
  parts.push('');
  parts.push('## Overview');
  parts.push('');
  parts.push(study.description);
  parts.push('');
  parts.push('---');
  parts.push('');

  const builder = BUILDERS[study.slug];
  parts.push(builder(study, data));
  parts.push('---');
  parts.push('');

  parts.push('## More Resources');
  parts.push('');
  parts.push(`- [${study.title} — Full Study](${studyUrl})`);
  parts.push(`- [All MetalForge Studies](${BASE}/studies)`);
  parts.push(`- [Studies Overview (LLM)](${BASE}/llms/studies.md)`);
  parts.push(`- [All Metal Drummers](${BASE}/drummers)`);
  parts.push('');
  parts.push('---');
  parts.push('');
  parts.push(`*Last updated: ${today} · Source: [MetalForge.io](${BASE})*`);

  return parts.join('\n');
}

function buildHubMarkdown(studies, today) {
  const parts = [];
  parts.push('# MetalForge Studies — Data-Driven Metal Drumming Analysis');
  parts.push('');
  parts.push(`> **Last updated:** ${today} · **Source:** [MetalForge.io](${BASE}) · [View hub →](${BASE}/studies)`);
  parts.push('');
  parts.push('---');
  parts.push('');
  parts.push('## Overview');
  parts.push('');
  parts.push('Data-driven studies analyzing gear, technique, and tempo trends across MetalForge’s documented roster of metal drummers. Every number traces back to a build-time stats engine (`scripts/compute-studies.cjs`), not an estimate.');
  parts.push('');
  parts.push('## Studies');
  parts.push('');
  studies.forEach((s) => {
    parts.push(`### [${s.title}](${BASE}/studies/${s.slug})`);
    parts.push('');
    parts.push(s.description);
    parts.push('');
    parts.push(`**Headline finding:** ${s.headlineStat.sentence}`);
    parts.push('');
    parts.push(`- [Full study →](${BASE}/studies/${s.slug})`);
    parts.push(`- [LLM mirror →](${BASE}/llms/studies/${s.slug}.md)`);
    parts.push('');
  });
  parts.push('---');
  parts.push('');
  parts.push(`*Last updated: ${today} · Source: [MetalForge.io](${BASE})*`);
  return parts.join('\n');
}

async function main() {
  const { STUDIES, MOST_USED_GEAR_BRANDS, TEMPO_BY_SUBGENRE, DRUM_ENDORSEMENT_LANDSCAPE, KIT_CONFIGURATIONS } = await loadStudiesData();
  const dataBySlug = {
    'most-used-gear-brands-metal': MOST_USED_GEAR_BRANDS,
    'metal-tempo-by-subgenre': TEMPO_BY_SUBGENRE,
    'drum-endorsement-landscape': DRUM_ENDORSEMENT_LANDSCAPE,
    'metal-kit-configurations': KIT_CONFIGURATIONS,
  };

  const today = new Date().toISOString().split('T')[0];
  const outDir = path.join(__dirname, '../public/llms/studies');
  fs.mkdirSync(outDir, { recursive: true });

  const results = [];
  for (const study of STUDIES) {
    const data = dataBySlug[study.slug];
    if (!data) {
      console.error(`No data module wired for study slug "${study.slug}" — skipping`);
      continue;
    }
    const md = buildMarkdown(study, data, today);
    const outPath = path.join(outDir, `${study.slug}.md`);
    fs.writeFileSync(outPath, md);
    const words = md.split(/\s+/).filter(Boolean).length;
    results.push({ slug: study.slug, words });
  }

  // Hub mirror, linked from each per-slug file's "More Resources" section.
  const hubMd = buildHubMarkdown(STUDIES, today);
  fs.writeFileSync(path.join(__dirname, '../public/llms/studies.md'), hubMd);

  const minWords = Math.min(...results.map((r) => r.words));
  console.log(`✅ Generated public/llms/studies/*.md — ${results.length} studies + hub (min ${minWords} words/file)`);
  for (const r of results) {
    const status = r.words >= 300 ? '✓' : '✗ UNDER 300';
    console.log(`   ${r.slug}: ${r.words} words ${status}`);
  }
}

main().catch((e) => { console.error(`FATAL: ${e.stack || e.message}`); process.exit(1); });
