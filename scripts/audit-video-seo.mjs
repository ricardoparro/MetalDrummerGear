#!/usr/bin/env node
// Issue #4771 (round 2, post-#3698): video SEO coverage + consistency audit.
//
// For every VideoObject that api/meta/[...path].js's real handler actually
// emits (calls the live function — no re-implementation of its routing/data
// logic to drift from), asserts:
//   (a) the page's SSR HTML contains a matching <iframe> (the #3698 pattern
//       — a VideoObject with no matching iframe is exactly what Google
//       Search Console flags as "Video isn't on a watch page")
//   (b) the video id resolves via YouTube oEmbed (200)
//   (c) api/sitemap.js's <video:video> extension declares that page
//
// The candidate page universe is every sitemap.xml URL (so any route family
// — known or newly added — gets swept) PLUS every lick/technique page
// straight from source data (so a page that carries a VideoObject but never
// made it into the sitemap is still caught — the sitemap can't report its
// own gaps).
//
// Usage: node scripts/audit-video-seo.mjs [--no-network]
//   --no-network  skip the oEmbed liveness check (useful offline, or in a
//                 sandboxed runner with no egress)

import { register } from 'node:module';

register('./_ext-resolve-hook.mjs', import.meta.url);

const { getMetaForPath, generateMetaHtml } = await import('../api/meta/[...path].js');
const { buildSitemapXml } = await import('../api/sitemap.js');
const { SIGNATURE_LICKS } = await import('../packages/frontend/data/signatureLicks.js');
const { getAllTechniques } = await import('../packages/frontend/data/techniques.js');

const BASE_URL = 'https://metalforge.io';
const NO_NETWORK = process.argv.includes('--no-network');

function extractYouTubeId(url) {
  if (!url) return null;
  const m = String(url).match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return m ? m[1] : null;
}

// Every VideoObject node inside a page's articleSchema, with its YouTube id.
function extractVideoObjects(meta) {
  if (!meta?.articleSchema) return [];
  let parsed;
  try {
    parsed = JSON.parse(meta.articleSchema);
  } catch {
    return [];
  }
  const nodes = Array.isArray(parsed['@graph']) ? parsed['@graph'] : [parsed];
  return nodes
    .filter(n => n && n['@type'] === 'VideoObject')
    .map(n => ({
      name: n.name,
      youtubeId: extractYouTubeId(n.embedUrl) || extractYouTubeId(n.contentUrl),
    }))
    .filter(v => v.youtubeId);
}

// loc -> { videoIds: string[] } for every <url> block in the sitemap that
// carries a <video:video> extension.
function parseSitemapVideoEntries(xml) {
  const map = new Map();
  for (const block of xml.split('<url>').slice(1)) {
    const loc = block.match(/<loc>([^<]*)<\/loc>/)?.[1];
    if (!loc) continue;
    const videoIds = [...block.matchAll(/\/(?:embed|watch\?v=)\/?([a-zA-Z0-9_-]{11})/g)].map(m => m[1]);
    map.set(loc, videoIds);
  }
  return map;
}

// Candidate paths: every sitemap URL, plus every lick/technique page direct
// from source data (independent of whether the sitemap already lists it).
function candidatePaths(sitemapXml) {
  const fromSitemap = [...sitemapXml.matchAll(/<loc>https:\/\/metalforge\.io([^<]*)<\/loc>/g)]
    .map(m => m[1])
    .filter(p => !p.endsWith('.md') && !p.endsWith('.xml'));
  const fromLicks = Object.values(SIGNATURE_LICKS).map(l => `/drummers/${l.drummerSlug}/licks/${l.slug}`);
  const fromTechniques = getAllTechniques().map(t => `/techniques/${t.slug}`);
  return [...new Set([...fromSitemap, ...fromLicks, ...fromTechniques])];
}

const oembedCache = new Map();
async function checkOembed(youtubeId) {
  if (NO_NETWORK) return { checked: false, ok: true };
  if (oembedCache.has(youtubeId)) return oembedCache.get(youtubeId);
  const url = `https://www.youtube.com/oembed?url=${encodeURIComponent(`https://www.youtube.com/watch?v=${youtubeId}`)}&format=json`;
  let result;
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(10000) });
    result = { ok: res.status === 200, status: res.status };
  } catch (err) {
    result = { ok: false, status: `ERR:${err.message}` };
  }
  oembedCache.set(youtubeId, result);
  return result;
}

function report(title, list, formatter) {
  console.log(`${list.length === 0 ? '✓' : '✗'} ${title}: ${list.length}`);
  for (const item of list.slice(0, 25)) console.log(`   - ${formatter(item)}`);
  if (list.length > 25) console.log(`   ... and ${list.length - 25} more`);
}

async function main() {
  const sitemapXml = buildSitemapXml();
  const sitemapVideoByLoc = parseSitemapVideoEntries(sitemapXml);
  const paths = candidatePaths(sitemapXml);

  const pagesWithVideo = [];
  for (const p of paths) {
    const meta = getMetaForPath(p);
    if (!meta) continue;
    const videos = extractVideoObjects(meta);
    if (videos.length === 0) continue;
    pagesWithVideo.push({ path: p, meta, videos });
  }

  console.log(`audit-video-seo: ${paths.length} candidate pages scanned, ${pagesWithVideo.length} carry a VideoObject.\n`);

  const missingIframe = [];
  const missingSitemapEntry = [];
  const uniqueIds = new Set();

  for (const { path: p, meta, videos } of pagesWithVideo) {
    const html = generateMetaHtml(meta, BASE_URL + p);
    const sitemapIds = sitemapVideoByLoc.get(BASE_URL + p) || null;

    for (const v of videos) {
      uniqueIds.add(v.youtubeId);

      const iframeRe = new RegExp(`<iframe[^>]*src="https://www\\.youtube\\.com/embed/${v.youtubeId}"`);
      if (!iframeRe.test(html)) {
        missingIframe.push({ path: p, videoId: v.youtubeId, name: v.name });
      }

      if (!sitemapIds || !sitemapIds.includes(v.youtubeId)) {
        missingSitemapEntry.push({ path: p, videoId: v.youtubeId, name: v.name });
      }
    }
  }

  const ids = [...uniqueIds];
  const results = await Promise.all(ids.map(async id => ({ id, result: await checkOembed(id) })));
  const deadIds = results
    .filter(({ result }) => !result.ok)
    .map(({ id, result }) => ({ videoId: id, status: result.status }));

  console.log(`Unique YouTube video ids referenced: ${ids.length}`);
  console.log(NO_NETWORK
    ? 'oEmbed check: SKIPPED (--no-network)\n'
    : `oEmbed check: ${ids.length - deadIds.length}/${ids.length} resolved 200\n`);

  report('Pages with VideoObject but no matching SSR iframe', missingIframe, i => `${i.path} (video ${i.videoId})`);
  report('Pages with VideoObject but no sitemap video:video entry', missingSitemapEntry, i => `${i.path} (video ${i.videoId})`);
  report('Dead video ids (oEmbed non-200)', deadIds, i => `${i.videoId} — ${i.status}`);

  const failed = missingIframe.length > 0 || missingSitemapEntry.length > 0 || deadIds.length > 0;
  console.log(failed
    ? '\naudit-video-seo: FAILED — see mismatches above.'
    : `\naudit-video-seo: OK — every VideoObject page is iframe-consistent and sitemap-declared${NO_NETWORK ? '.' : ', all video ids resolve via oEmbed.'}`);
  process.exitCode = failed ? 1 : 0;
}

main();
