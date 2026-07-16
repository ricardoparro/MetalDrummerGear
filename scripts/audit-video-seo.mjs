#!/usr/bin/env node
// Video SEO coverage + consistency audit (issue #4771, round 2 of #3698).
//
// #3698 made lick pages emit a real crawlable <iframe> in the bot-facing SSR
// shell so Google would treat them as "watch pages", not just VideoObject
// schema markup. This script verifies that guarantee actually holds for
// EVERY page that emits a VideoObject, not just the ones #3698 originally
// covered — and checks the same three things GSC's "Video isn't on a watch
// page" report effectively checks:
//
//   (a) the page's SSR HTML (as served to bots by api/meta/[...path].js)
//       contains a real <iframe src="youtube.com/embed/<id>"> matching the
//       page's resolved video — not just JSON-LD schema.
//   (b) that video id actually resolves (YouTube oEmbed 200).
//   (c) the video sitemap (api/sitemap.js) declares a matching
//       <video:video> entry for the page's <url>.
//
// All three surfaces resolve "which video is THIS page's video" through the
// same single-source helpers in packages/frontend/data/videoSeo.js — see
// that file for why a second, independently-computed registry is exactly
// the bug class this script exists to catch.
//
// Usage:
//   node scripts/audit-video-seo.mjs             # scan + report (informational, exit 0)
//   node scripts/audit-video-seo.mjs --json out.json
//   node scripts/audit-video-seo.mjs --strict     # non-zero exit if any check fails

import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { writeFileSync } from 'node:fs';
import https from 'node:https';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');
const BASE_URL = 'https://metalforge.io';
const CONCURRENCY = 8;
const REQUEST_TIMEOUT_MS = 10000;

const { resolveLickVideo, resolveTechniqueVideo } = await import(`file://${join(REPO_ROOT, 'packages/frontend/data/videoSeo.js')}`);
const { SIGNATURE_LICKS } = await import(`file://${join(REPO_ROOT, 'packages/frontend/data/licks/index.js')}`);
const { getAllTechniques } = await import(`file://${join(REPO_ROOT, 'packages/frontend/data/techniques.js')}`);
const { getMetaForPath, generateMetaHtml } = await import(`file://${join(REPO_ROOT, 'api/meta/[...path].js')}`);
const { buildSitemapXml } = await import(`file://${join(REPO_ROOT, 'api/sitemap.js')}`);

// ---------------------------------------------------------------------------
// 1. Enumerate every page that carries a VideoObject, via the same resolvers
//    api/meta/[...path].js and api/sitemap.js use.
// ---------------------------------------------------------------------------

function collectPages() {
  const pages = [];
  for (const lick of Object.values(SIGNATURE_LICKS)) {
    const video = resolveLickVideo(lick);
    if (!video) continue;
    pages.push({
      kind: 'lick',
      name: lick.name,
      path: `/drummers/${lick.drummerSlug}/licks/${lick.slug}`,
      video,
    });
  }
  for (const technique of getAllTechniques()) {
    const video = resolveTechniqueVideo(technique);
    if (!video) continue;
    pages.push({
      kind: 'technique',
      name: technique.title,
      path: `/techniques/${technique.slug}`,
      video,
    });
  }
  return pages;
}

// ---------------------------------------------------------------------------
// 2. (a) SSR HTML contains the matching iframe.
// ---------------------------------------------------------------------------

function checkIframe(page) {
  let meta, html;
  try {
    meta = getMetaForPath(page.path);
    html = generateMetaHtml(meta, `${BASE_URL}${page.path}`);
  } catch (e) {
    return { ok: false, reason: `getMetaForPath/generateMetaHtml threw: ${e.message}` };
  }
  if (!meta || !meta.videoEmbed) {
    return { ok: false, reason: 'SSR meta has no videoEmbed at all (route family not handled by api/meta/[...path].js)' };
  }
  if (meta.videoEmbed.youtubeId !== page.video.youtubeId) {
    return { ok: false, reason: `videoEmbed id ${meta.videoEmbed.youtubeId} != resolved video id ${page.video.youtubeId}` };
  }
  const needle = `src="https://www.youtube.com/embed/${page.video.youtubeId}"`;
  if (!html.includes(needle)) {
    return { ok: false, reason: 'videoEmbed set but no matching <iframe src> found in rendered HTML' };
  }
  return { ok: true };
}

// ---------------------------------------------------------------------------
// 3. (c) sitemap has a matching <video:video> entry for the page's <url>.
// ---------------------------------------------------------------------------

function parseSitemapVideoEntries(xml) {
  const byLoc = new Map();
  const urlBlockRe = /<url>([\s\S]*?)<\/url>/g;
  let m;
  while ((m = urlBlockRe.exec(xml)) !== null) {
    const block = m[1];
    const locMatch = block.match(/<loc>([^<]+)<\/loc>/);
    if (!locMatch) continue;
    const loc = locMatch[1];
    const videoMatch = block.match(/<video:player_loc[^>]*>https:\/\/www\.youtube\.com\/embed\/([A-Za-z0-9_-]{11})<\/video:player_loc>/);
    byLoc.set(loc, videoMatch ? videoMatch[1] : null);
  }
  return byLoc;
}

function checkSitemap(page, sitemapByLoc) {
  const loc = `${BASE_URL}${page.path}`;
  if (!sitemapByLoc.has(loc)) {
    return { ok: false, reason: 'page URL not present in sitemap.xml at all' };
  }
  const videoId = sitemapByLoc.get(loc);
  if (!videoId) {
    return { ok: false, reason: 'page URL present in sitemap but with no <video:video> entry' };
  }
  if (videoId !== page.video.youtubeId) {
    return { ok: false, reason: `sitemap video id ${videoId} != resolved video id ${page.video.youtubeId}` };
  }
  return { ok: true };
}

// ---------------------------------------------------------------------------
// 4. (b) YouTube oEmbed 200 check.
// ---------------------------------------------------------------------------

function fetchStatus(url) {
  return new Promise((resolve) => {
    const req = https.get(url, { timeout: REQUEST_TIMEOUT_MS, headers: { 'User-Agent': 'metalforge-video-seo-auditor/1.0' } }, (res) => {
      res.resume();
      resolve({ status: res.statusCode });
    });
    req.on('error', (err) => resolve({ status: 0, error: err.code || err.message }));
    req.on('timeout', () => { req.destroy(); resolve({ status: 0, error: 'TIMEOUT' }); });
  });
}

async function checkOembed(youtubeId) {
  const url = `https://www.youtube.com/oembed?url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D${youtubeId}&format=json`;
  const res = await fetchStatus(url);
  if (res.status === 200) return { ok: true };
  if (res.status === 401) return { ok: false, reason: 'oEmbed 401 (embedding disabled)' };
  if (res.status === 404) return { ok: false, reason: 'oEmbed 404 (video not found / removed)' };
  if (res.status === 0) return { ok: false, reason: `network error (${res.error})`, unknown: true };
  return { ok: false, reason: `oEmbed HTTP ${res.status}`, unknown: true };
}

async function runWithConcurrency(items, worker, concurrency) {
  const results = new Array(items.length);
  let cursor = 0;
  async function next() {
    while (cursor < items.length) {
      const i = cursor++;
      results[i] = await worker(items[i], i);
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, next));
  return results;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

(async () => {
  const args = process.argv.slice(2);
  const jsonIdx = args.indexOf('--json');
  const jsonOut = jsonIdx >= 0 ? args[jsonIdx + 1] : null;
  const strict = args.includes('--strict');

  const pages = collectPages();
  process.stderr.write(`Found ${pages.length} pages with a resolved VideoObject (${pages.filter(p => p.kind === 'lick').length} licks, ${pages.filter(p => p.kind === 'technique').length} techniques).\n`);

  const sitemapXml = buildSitemapXml();
  const sitemapByLoc = parseSitemapVideoEntries(sitemapXml);

  const iframeResults = pages.map(p => ({ page: p, result: checkIframe(p) }));
  const sitemapResults = pages.map(p => ({ page: p, result: checkSitemap(p, sitemapByLoc) }));

  process.stderr.write(`Verifying ${pages.length} video IDs via YouTube oEmbed (concurrency=${CONCURRENCY})...\n`);
  const uniqueIds = [...new Set(pages.map(p => p.video.youtubeId))];
  const oembedById = new Map();
  const oembedChecks = await runWithConcurrency(uniqueIds, async (id) => ({ id, result: await checkOembed(id) }), CONCURRENCY);
  for (const { id, result } of oembedChecks) oembedById.set(id, result);

  const iframeFailures = iframeResults.filter(r => !r.result.ok);
  const sitemapFailures = sitemapResults.filter(r => !r.result.ok);
  const deadVideoIds = uniqueIds.filter(id => !oembedById.get(id).ok && !oembedById.get(id).unknown);
  const unknownVideoIds = uniqueIds.filter(id => oembedById.get(id).unknown);

  const lines = [];
  lines.push('# Video SEO Coverage + Consistency Audit');
  lines.push('');
  lines.push(`- Pages with a VideoObject: **${pages.length}** (${pages.filter(p => p.kind === 'lick').length} licks, ${pages.filter(p => p.kind === 'technique').length} techniques)`);
  lines.push(`- Pages missing a matching SSR iframe: **${iframeFailures.length}**`);
  lines.push(`- Pages missing a matching sitemap video entry: **${sitemapFailures.length}**`);
  lines.push(`- Unique video IDs checked via oEmbed: **${uniqueIds.length}**`);
  lines.push(`- Dead video IDs (oEmbed 401/404): **${deadVideoIds.length}**`);
  lines.push(`- Unverifiable video IDs (network error): **${unknownVideoIds.length}**`);
  lines.push('');

  if (iframeFailures.length > 0) {
    lines.push(`## Pages with VideoObject but no matching iframe (${iframeFailures.length})`);
    lines.push('');
    for (const { page, result } of iframeFailures) {
      lines.push(`- \`${page.path}\` (${page.kind}: ${page.name}) — ${result.reason}`);
    }
    lines.push('');
  }

  if (sitemapFailures.length > 0) {
    lines.push(`## Pages with VideoObject but no matching sitemap video entry (${sitemapFailures.length})`);
    lines.push('');
    for (const { page, result } of sitemapFailures) {
      lines.push(`- \`${page.path}\` (${page.kind}: ${page.name}) — ${result.reason}`);
    }
    lines.push('');
  }

  if (deadVideoIds.length > 0) {
    lines.push(`## Dead video IDs (${deadVideoIds.length})`);
    lines.push('');
    for (const id of deadVideoIds) {
      const affected = pages.filter(p => p.video.youtubeId === id);
      lines.push(`- \`${id}\` — ${oembedById.get(id).reason} — https://www.youtube.com/watch?v=${id}`);
      for (const p of affected) lines.push(`  - \`${p.path}\``);
    }
    lines.push('');
  }

  if (unknownVideoIds.length > 0) {
    lines.push(`## Unverifiable video IDs (network error, not blocking) (${unknownVideoIds.length})`);
    lines.push('');
    for (const id of unknownVideoIds) lines.push(`- \`${id}\` — ${oembedById.get(id).reason}`);
    lines.push('');
  }

  if (iframeFailures.length === 0 && sitemapFailures.length === 0 && deadVideoIds.length === 0) {
    lines.push('All checks passed: every VideoObject page has a matching SSR iframe, a matching sitemap video entry, and a live video ID. ✅');
  }

  const markdown = lines.join('\n');
  process.stdout.write(markdown + '\n');
  if (process.env.GITHUB_STEP_SUMMARY) {
    writeFileSync(process.env.GITHUB_STEP_SUMMARY, markdown + '\n', { flag: 'a' });
  }

  if (jsonOut) {
    const payload = {
      totals: {
        pages: pages.length,
        iframeFailures: iframeFailures.length,
        sitemapFailures: sitemapFailures.length,
        uniqueVideoIds: uniqueIds.length,
        deadVideoIds: deadVideoIds.length,
        unknownVideoIds: unknownVideoIds.length,
      },
      iframeFailures: iframeFailures.map(({ page, result }) => ({ path: page.path, kind: page.kind, reason: result.reason })),
      sitemapFailures: sitemapFailures.map(({ page, result }) => ({ path: page.path, kind: page.kind, reason: result.reason })),
      deadVideoIds: deadVideoIds.map(id => ({ id, reason: oembedById.get(id).reason, pages: pages.filter(p => p.video.youtubeId === id).map(p => p.path) })),
    };
    writeFileSync(jsonOut, JSON.stringify(payload, null, 2));
    process.stderr.write(`Wrote ${jsonOut}\n`);
  }

  if (strict && (iframeFailures.length > 0 || sitemapFailures.length > 0 || deadVideoIds.length > 0)) {
    process.exit(1);
  }
  process.exit(0);
})();
