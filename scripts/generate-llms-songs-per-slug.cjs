#!/usr/bin/env node
/**
 * Generate public/llms/songs/<slug>.md — one AI-citation markdown mirror per
 * qualifying song. Issue #4761 (songs epic #4758, phase 3/4): mirrors are
 * only generated for songs that clear the content-richness gate in
 * metalSongsBpm.js (getSongPageSlugs) — the same gate that decides which
 * songs get a real /songs/<slug> page, so this file set can never drift
 * ahead of what's actually live.
 *
 * Data source: packages/frontend/data/metalSongsBpm.js (single source of
 * truth). Unlike the regex+eval sibling generate-llms-*.cjs scripts, this
 * module has real logic (imports + gate functions), not a plain object
 * literal, so it's loaded with a dynamic import() — same pattern as
 * generate-llms-studies.cjs.
 */

const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const BASE = 'https://metalforge.io';
const DATA_PATH = path.join(__dirname, '../packages/frontend/data/metalSongsBpm.js');

function titleCaseSlug(slug) {
  if (!slug) return '';
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function buildMarkdown(song, today) {
  const songUrl = `${BASE}/songs/${song.slug}`;
  const drummerName = titleCaseSlug(song.drummer);
  const parts = [];

  parts.push(`# "${song.song}" by ${song.band} — BPM, Drummer & Tempo | MetalForge`);
  parts.push('');
  parts.push(`> Per-song AI citation reference: verified BPM, tempo tier, and recording drummer for "${song.song}" by ${song.band}.`);
  parts.push(`> Optimised for queries like '${song.song} bpm', '${song.song} drummer', 'how fast is ${song.song}'.`);
  parts.push('');

  parts.push('## Song Overview');
  parts.push('');
  parts.push(`- **Band:** ${song.band}`);
  parts.push(`- **Album:** ${song.album} (${song.year})`);
  parts.push(`- **BPM:** ${song.bpm} (${song.tier.label}, ${song.tier.min}-${song.tier.max} BPM range)`);
  parts.push(`- **Genre:** ${song.genre}`);
  parts.push(`- **Drummer:** [${drummerName}](${BASE}/drummer/${song.drummer})`);
  if (song.bpmNote) parts.push(`- **Tempo note:** ${song.bpmNote}`);
  parts.push('');

  if (song.techniqueSummary) {
    parts.push('## Technique Notes');
    parts.push('');
    parts.push(song.techniqueSummary.trim());
    parts.push('');
  }

  if (song.albumArticle) {
    parts.push('## Album');
    parts.push('');
    parts.push(`Full drum-setup breakdown: [${song.albumArticle.title}](${BASE}/articles/${song.albumArticle.slug})`);
    parts.push('');
  }

  if (song.video) {
    parts.push('## Video');
    parts.push('');
    parts.push(`[${song.video.title}](https://www.youtube.com/watch?v=${song.video.youtubeId})`);
    parts.push('');
  }

  parts.push('## FAQ');
  parts.push('');
  parts.push(`**Q: What BPM is ${song.song}?**`);
  parts.push(song.bpmNote
    ? `A: "${song.song}" by ${song.band} is ${song.bpm} BPM (${song.tier.label} tempo range). ${song.bpmNote}.`
    : `A: "${song.song}" by ${song.band} is ${song.bpm} BPM (${song.tier.label} tempo range, ${song.tier.min}-${song.tier.max} BPM).`);
  parts.push('');
  parts.push(`**Q: Who played drums on ${song.song}?**`);
  parts.push(`A: ${drummerName} played drums on "${song.song}" by ${song.band}, from the album ${song.album} (${song.year}).`);
  parts.push('');

  parts.push('## Source');
  parts.push('');
  parts.push(song.source);
  parts.push('');

  if (song.relatedSongs.length > 0) {
    parts.push('## Related Songs');
    parts.push('');
    for (const s of song.relatedSongs) {
      parts.push(`- [${s.song}](${BASE}/songs/${s.slug}) — ${s.band}, ${s.bpm} BPM`);
    }
    parts.push('');
  }

  parts.push('---');
  parts.push('');
  parts.push(`**Full song page:** [${song.song} on MetalForge](${songUrl})`);
  parts.push('');
  parts.push(`**More resources:** [Metal Songs Database](${BASE}/songs) · [Site index](${BASE}/llms.txt)`);
  parts.push('');
  parts.push(`*Last updated: ${today} · Source: [MetalForge.io](${BASE})*`);

  return parts.join('\n');
}

/**
 * Issue #5134: markdown mirror for the /songs/fastest-metal-songs flagship
 * page. That slug is reserved (SONGS_RESERVED_SLUGS in App.js) so it's a
 * ranked list, not an individual song, and never comes out of
 * getSongPageSlugs()/getSongPageData() above — it needs its own builder
 * sourced from getFastestMetalSongs(), mirroring the ranking table and FAQ
 * answer already live in api/meta/[...path].js for this route.
 */
function buildFastestSongsMarkdown(songs, minBpm, today) {
  const top = songs[0];
  const parts = [];

  parts.push('# Fastest Metal Songs, Ranked by BPM | MetalForge');
  parts.push('');
  parts.push(`> Per-list AI citation reference: verified BPM ranking of the fastest metal songs`);
  parts.push(`> in MetalForge's database (${minBpm}+ BPM). Optimised for queries like 'fastest metal song',`);
  parts.push(`> 'fastest metal songs by bpm'.`);
  parts.push('');

  parts.push('## Ranking');
  parts.push('');
  songs.forEach((s, i) => {
    parts.push(`${i + 1}. ${s.song} — ${s.band} (${s.bpm} BPM, drummer: ${titleCaseSlug(s.drummer)})`);
  });
  parts.push('');

  parts.push('## FAQ');
  parts.push('');
  parts.push('**Q: What is the fastest metal song?**');
  parts.push(top
    ? `A: The fastest metal song in MetalForge's database is "${top.song}" by ${top.band} at ${top.bpm} BPM, drummed by ${titleCaseSlug(top.drummer)}. Source: ${top.source}. Note that BPM figures in this database aren't audio-metronome-measured for every entry — see each song's source for its specific verification method, and double-time passages can make a track feel considerably faster than its listed BPM.`
    : 'A: No songs currently clear the fastest-songs BPM threshold.');
  parts.push('');

  if (top) {
    parts.push('## Source');
    parts.push('');
    parts.push(top.source);
    parts.push('');
  }

  parts.push('---');
  parts.push('');
  parts.push(`**Full ranked page:** [Fastest Metal Songs on MetalForge](${BASE}/songs/fastest-metal-songs)`);
  parts.push('');
  parts.push(`**More resources:** [Metal Songs Database](${BASE}/songs) · [Site index](${BASE}/llms.txt)`);
  parts.push('');
  parts.push(`*Last updated: ${today} · Source: [MetalForge.io](${BASE})*`);

  return parts.join('\n');
}

const FASTEST_SONGS_SLUG = 'fastest-metal-songs';

async function main() {
  const mod = await import(pathToFileURL(DATA_PATH).href);
  const { getSongPageSlugs, getSongPageData, getFastestMetalSongs, FASTEST_SONGS_MIN_BPM } = mod;

  const today = new Date().toISOString().split('T')[0];
  const outDir = path.join(__dirname, '../public/llms/songs');
  fs.mkdirSync(outDir, { recursive: true });

  const slugs = getSongPageSlugs();

  // Remove stale per-song files for slugs that no longer clear the gate so
  // coverage can never silently drift ahead of what's actually live. The
  // reserved fastest-metal-songs slug is written separately below, so it's
  // exempted from this per-song cleanup pass.
  const currentSlugs = new Set(slugs);
  if (fs.existsSync(outDir)) {
    for (const file of fs.readdirSync(outDir)) {
      if (!file.endsWith('.md')) continue;
      const slug = file.slice(0, -3);
      if (slug === FASTEST_SONGS_SLUG) continue;
      if (!currentSlugs.has(slug)) fs.unlinkSync(path.join(outDir, file));
    }
  }

  let written = 0;
  for (const slug of slugs) {
    const song = getSongPageData(slug);
    if (!song) continue;
    const md = buildMarkdown(song, today);
    fs.writeFileSync(path.join(outDir, `${slug}.md`), md);
    written++;
  }

  const fastestSongs = getFastestMetalSongs();
  const fastestMd = buildFastestSongsMarkdown(fastestSongs, FASTEST_SONGS_MIN_BPM, today);
  fs.writeFileSync(path.join(outDir, `${FASTEST_SONGS_SLUG}.md`), fastestMd);
  written++;

  console.log(`Wrote ${written} files to ${outDir} (${slugs.length} qualifying songs from the gate + 1 flagship ranking)`);
}

main().catch((e) => { console.error(`FATAL: ${e.stack || e.message}`); process.exit(1); });
