#!/usr/bin/env node
/**
 * Precomputes the content-richness gate's album-article and signature-lick
 * cross-references for every song in metalSongsBpm.js, so the browser bundle
 * never has to import the full ALBUM_ARTICLES (12MB) / SIGNATURE_LICKS (1.6MB)
 * data modules just to look up ~86 small derived fields.
 *
 * Issue #5169 (L4 perf regression): #4761 added getSongPageGate() to
 * metalSongsBpm.js with top-level `import { ALBUM_ARTICLES } from
 * './albumArticles/index.js'` and `import { SIGNATURE_LICKS } from
 * './licks/index.js'`. Because metalSongsBpm.js is statically imported by
 * three separate lazy route chunks (SongsHubPage, SongsListPages,
 * SongDetailPage) while albumArticles/licks were already reachable from a
 * fourth (App.js's own loadAlbumArticles), Metro's web serializer hoisted
 * both multi-megabyte modules into the shared __common bundle — downloaded
 * on every single page, not just /songs pages. This script moves the join
 * to build time; the runtime gate only imports this tiny generated table.
 *
 * GENERATED FILE — do not edit packages/frontend/data/songPageGate.js by hand.
 * Regenerate with: node scripts/compute-song-page-gate.cjs
 * Re-run whenever metalSongsBpm.js's song list, data/albumArticles/, or
 * data/licks/ change, so the table can't silently drift from its sources.
 */

const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const ROOT = path.join(__dirname, '..');
const METAL_SONGS_BPM_PATH = path.join(ROOT, 'packages/frontend/data/metalSongsBpm.js');
const OUT_PATH = path.join(ROOT, 'packages/frontend/data/songPageGate.js');

async function main() {
  const metalSongsBpm = await import(pathToFileURL(METAL_SONGS_BPM_PATH).href);
  const metalSongs = metalSongsBpm.default;
  const { getSongPageGate } = metalSongsBpm;

  const gate = {};
  for (const song of metalSongs) {
    const g = getSongPageGate(song);
    gate[song.slug] = {
      inRoster: g.inRoster,
      hasLick: !!g.lick,
      lickDescription: g.lick ? (g.lick.description || null) : null,
      albumArticle: g.albumArticle ? { slug: g.albumArticle.slug, title: g.albumArticle.title } : null,
      video: g.video,
      criteriaCount: g.criteriaCount,
      qualifies: g.qualifies,
    };
  }

  const qualifyingCount = Object.values(gate).filter((g) => g.qualifies).length;

  const header = `/**
 * Content-richness gate results for every song in metalSongsBpm.js — one
 * entry per song slug, keyed exactly like metalSongsBpm's own song.slug.
 *
 * GENERATED FILE — do not edit by hand.
 * Regenerate with: node scripts/compute-song-page-gate.cjs
 *
 * Source of truth: metalSongsBpm.js's own getSongPageGate() logic, run once
 * here against the full data/albumArticles/ and data/licks/ modules so the
 * browser bundle only ever imports this small derived table (issue #5169).
 * Dataset: ${metalSongs.length} songs, ${qualifyingCount} qualifying for a /songs/<slug> page.
 */

export const SONG_PAGE_GATE = ${JSON.stringify(gate, null, 2)};

export default SONG_PAGE_GATE;
`;

  fs.writeFileSync(OUT_PATH, header);
  console.log(`✅ Wrote ${path.relative(ROOT, OUT_PATH)}`);
  console.log(`   Dataset: ${metalSongs.length} songs, ${qualifyingCount} qualify for a /songs/<slug> page`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
