#!/usr/bin/env node
/**
 * Broken-image crawler for MetalForge.
 *
 * Strategy:
 *   1. Pull URL list from /sitemap.xml (configurable, defaults to live site).
 *   2. For each page, fetch the HTML with a real browser UA so SSR meta plus
 *      crawler-only routes (api/meta) all render normally.
 *   3. Extract image URLs from <img src>, <img srcset>, <source srcset>, and
 *      OG/Twitter meta image tags.
 *   4. HEAD each unique image URL, classifying status: 200 ok, 4xx broken,
 *      5xx broken, network error, redirect-to-error.
 *   5. Group broken images by referring page + image URL and emit a JSON
 *      report. The workflow then transforms that into a single GitHub issue.
 *
 * Deliberately keeps state out of the script — the GitHub Action is the
 * mutator (issue create/update). The script is pure (input → JSON report).
 *
 * Local run:
 *     node .agents/scripts/check-broken-images.cjs \
 *         --base https://metalforge.io \
 *         --max-pages 200 \
 *         --out /tmp/broken-images.json
 *
 * Exit codes:
 *   0 — completed (no broken images found, or report written without crash)
 *   1 — fatal error (sitemap unreachable, no pages, etc.) — do NOT open an
 *       issue in this case; something else broke.
 */

const fs = require('node:fs');
const path = require('node:path');

function argv(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 && i + 1 < process.argv.length ? process.argv[i + 1] : fallback;
}

const BASE_URL = (argv('base', 'https://metalforge.io')).replace(/\/$/, '');
const MAX_PAGES = parseInt(argv('max-pages', '300'), 10);
const PER_PAGE_TIMEOUT_MS = parseInt(argv('page-timeout', '15000'), 10);
const PER_IMAGE_TIMEOUT_MS = parseInt(argv('image-timeout', '8000'), 10);
const CONCURRENCY = parseInt(argv('concurrency', '6'), 10);
const OUT = argv('out', '/tmp/broken-images.json');

// A few entity types we want to prioritize even if the sitemap is huge.
// Drummer pages and album/article pages have most user-facing imagery.
const PATH_PRIORITY = [/^\/drummer\//, /^\/articles\//, /^\/bands?\//, /^\/gear\//];

const USER_AGENT =
  'MetalForge-BrokenImageCheck/1.0 (+https://metalforge.io; bot; contact via GH issues)';

function log(msg) { process.stderr.write(`[broken-images] ${msg}\n`); }

async function fetchWithTimeout(url, opts, timeoutMs) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    return await fetch(url, { ...opts, signal: ctrl.signal });
  } finally {
    clearTimeout(t);
  }
}

async function fetchSitemap(base) {
  const url = `${base}/sitemap.xml`;
  log(`fetching ${url}`);
  const r = await fetchWithTimeout(url, { headers: { 'User-Agent': USER_AGENT } }, 30_000);
  if (!r.ok) throw new Error(`sitemap ${r.status}`);
  const xml = await r.text();
  // Lightweight parse — sitemap urls live in <loc> tags. No deps.
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].trim());
  // Dedupe + same-origin only.
  const seen = new Set();
  const out = [];
  for (const loc of locs) {
    if (!loc.startsWith(base)) continue;
    if (seen.has(loc)) continue;
    seen.add(loc);
    out.push(loc);
  }
  return out;
}

function sortByPriority(urls) {
  return urls.sort((a, b) => {
    const pa = PATH_PRIORITY.findIndex(rx => rx.test(new URL(a).pathname));
    const pb = PATH_PRIORITY.findIndex(rx => rx.test(new URL(b).pathname));
    const sa = pa === -1 ? 99 : pa;
    const sb = pb === -1 ? 99 : pb;
    return sa - sb || a.localeCompare(b);
  });
}

// Extract <img src>, <img srcset>, <source srcset>, and OG/Twitter image meta.
// We rely on regex — the HTML is React-rendered, well-formed, and we only care
// about resource URLs, not DOM structure.
function extractImageUrls(html, baseUrl) {
  const urls = new Set();
  const push = raw => {
    if (!raw) return;
    const trimmed = raw.trim();
    if (!trimmed) return;
    if (trimmed.startsWith('data:')) return;
    try {
      const abs = new URL(trimmed, baseUrl).toString();
      urls.add(abs);
    } catch {
      // invalid URL — record as such so the report flags it
      urls.add(`INVALID::${trimmed}`);
    }
  };

  // <img ... src="..."> and <img ... src='...'>
  for (const m of html.matchAll(/<img\b[^>]*?\bsrc\s*=\s*"([^"]*)"/gi)) push(m[1]);
  for (const m of html.matchAll(/<img\b[^>]*?\bsrc\s*=\s*'([^']*)'/gi)) push(m[1]);
  // srcset (img + source) — comma-separated, each "url descriptor"
  for (const m of html.matchAll(/\bsrcset\s*=\s*"([^"]*)"/gi)) {
    for (const part of m[1].split(',')) push(part.trim().split(/\s+/)[0]);
  }
  for (const m of html.matchAll(/\bsrcset\s*=\s*'([^']*)'/gi)) {
    for (const part of m[1].split(',')) push(part.trim().split(/\s+/)[0]);
  }
  // OG / Twitter image meta — these get crawled too and break on social shares.
  for (const m of html.matchAll(/<meta\b[^>]*?\b(?:property|name)\s*=\s*"(?:og:image|twitter:image)"[^>]*?\bcontent\s*=\s*"([^"]*)"/gi)) {
    push(m[1]);
  }
  return [...urls];
}

async function fetchPage(url) {
  try {
    const r = await fetchWithTimeout(url, {
      headers: { 'User-Agent': USER_AGENT, 'Accept': 'text/html' },
      redirect: 'follow',
    }, PER_PAGE_TIMEOUT_MS);
    if (!r.ok) return { url, status: r.status, error: `page ${r.status}` };
    const html = await r.text();
    return { url, status: r.status, html };
  } catch (e) {
    return { url, status: 0, error: e.message || String(e) };
  }
}

async function checkImage(imageUrl) {
  if (imageUrl.startsWith('INVALID::')) {
    return { status: 0, error: 'invalid-url', kind: 'invalid' };
  }
  try {
    // HEAD first — cheap. If the origin refuses HEAD (some CDNs do), fall back
    // to a GET with Range so we never download the full body.
    let r = await fetchWithTimeout(imageUrl, {
      method: 'HEAD',
      headers: { 'User-Agent': USER_AGENT, 'Accept': 'image/*' },
      redirect: 'follow',
    }, PER_IMAGE_TIMEOUT_MS);
    if (r.status === 405 || r.status === 501) {
      r = await fetchWithTimeout(imageUrl, {
        method: 'GET',
        headers: { 'User-Agent': USER_AGENT, 'Accept': 'image/*', 'Range': 'bytes=0-0' },
        redirect: 'follow',
      }, PER_IMAGE_TIMEOUT_MS);
    }
    const status = r.status;
    if (status >= 200 && status < 300) {
      // Some hosts return 200 with an HTML "blocked" page (hotlink protection).
      // Cheap signal: Content-Type must look like image/*.
      const ct = (r.headers.get('content-type') || '').toLowerCase();
      if (!ct.startsWith('image/')) {
        return { status, error: `bad-content-type:${ct || 'unknown'}`, kind: 'hotlink-blocked' };
      }
      // 0-length body usually means corrupted/blocked.
      const cl = parseInt(r.headers.get('content-length') || '0', 10);
      if (cl === 0 && status !== 206) {
        return { status, error: 'empty-body', kind: 'empty' };
      }
      return { status, ok: true };
    }
    if (status === 403) return { status, error: 'forbidden', kind: 'hotlink-blocked' };
    if (status === 404) return { status, error: 'not-found', kind: 'missing' };
    if (status >= 500) return { status, error: `server-${status}`, kind: 'server-error' };
    return { status, error: `http-${status}`, kind: 'other' };
  } catch (e) {
    return { status: 0, error: e.message || String(e), kind: 'network' };
  }
}

async function pool(items, n, worker) {
  const out = new Array(items.length);
  let i = 0;
  async function run() {
    while (true) {
      const idx = i++;
      if (idx >= items.length) return;
      out[idx] = await worker(items[idx], idx);
    }
  }
  await Promise.all(Array.from({ length: Math.min(n, items.length) }, run));
  return out;
}

function entityFromPath(pathname) {
  const m = pathname.match(/^\/(drummer|articles?|bands?|gear)\/([^\/]+)/);
  return m ? `${m[1]}:${m[2]}` : '';
}

(async () => {
  let pages;
  try {
    pages = await fetchSitemap(BASE_URL);
  } catch (e) {
    log(`FATAL: ${e.message}`);
    process.exit(1);
  }
  if (!pages.length) {
    log('FATAL: sitemap returned zero URLs');
    process.exit(1);
  }
  log(`sitemap: ${pages.length} URLs`);
  pages = sortByPriority(pages).slice(0, MAX_PAGES);
  log(`scanning ${pages.length} pages (cap ${MAX_PAGES})`);

  // Fetch pages, extract image URLs.
  const pageResults = await pool(pages, CONCURRENCY, fetchPage);
  const imageRefs = new Map(); // imageUrl -> Set(pageUrl)
  let pageFetchFailures = 0;
  for (const pr of pageResults) {
    if (!pr.html) { pageFetchFailures++; continue; }
    const imgs = extractImageUrls(pr.html, pr.url);
    for (const img of imgs) {
      if (!imageRefs.has(img)) imageRefs.set(img, new Set());
      imageRefs.get(img).add(pr.url);
    }
  }
  log(`extracted ${imageRefs.size} unique image URLs from ${pages.length - pageFetchFailures}/${pages.length} pages`);

  // Check every image.
  const imageList = [...imageRefs.keys()];
  const imageResults = await pool(imageList, CONCURRENCY * 2, checkImage);

  const broken = [];
  for (let i = 0; i < imageList.length; i++) {
    const imageUrl = imageList[i];
    const result = imageResults[i];
    if (result.ok) continue;
    broken.push({
      imageUrl,
      status: result.status,
      kind: result.kind || 'other',
      error: result.error,
      pages: [...imageRefs.get(imageUrl)],
    });
  }

  // Group by referring page for readable output.
  const byPage = new Map();
  for (const b of broken) {
    for (const p of b.pages) {
      if (!byPage.has(p)) byPage.set(p, []);
      byPage.get(p).push({ imageUrl: b.imageUrl, status: b.status, kind: b.kind, error: b.error });
    }
  }
  const pagesReport = [...byPage.entries()]
    .map(([url, items]) => ({
      pageUrl: url,
      entity: entityFromPath(new URL(url).pathname),
      brokenCount: items.length,
      images: items.sort((a, b) => a.imageUrl.localeCompare(b.imageUrl)),
    }))
    .sort((a, b) => b.brokenCount - a.brokenCount || a.pageUrl.localeCompare(b.pageUrl));

  const report = {
    baseUrl: BASE_URL,
    generatedAt: new Date().toISOString(),
    pagesScanned: pages.length - pageFetchFailures,
    pagesAttempted: pages.length,
    pageFetchFailures,
    imagesChecked: imageList.length,
    brokenImagesUnique: broken.length,
    affectedPages: pagesReport.length,
    pages: pagesReport,
  };

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(report, null, 2));
  log(`wrote ${OUT}`);
  log(`summary: ${broken.length} broken unique images across ${pagesReport.length} pages (page fetch failures: ${pageFetchFailures})`);
})().catch(e => {
  log(`FATAL: ${e.stack || e.message || e}`);
  process.exit(1);
});
