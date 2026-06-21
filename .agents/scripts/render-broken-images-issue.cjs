#!/usr/bin/env node
/**
 * Renders the JSON report from check-broken-images.cjs into the umbrella
 * issue body (Markdown). Kept separate so the crawler stays pure and the
 * issue layout can evolve without touching network code.
 */

const fs = require('node:fs');
const path = require('node:path');

function argv(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 && i + 1 < process.argv.length ? process.argv[i + 1] : fallback;
}

const REPORT = argv('report', 'broken-images.json');
const OUT = argv('out', 'issue-body.md');
const MAX_PAGES_IN_BODY = parseInt(argv('max-pages-in-body', '50'), 10);
const MAX_IMAGES_PER_PAGE = parseInt(argv('max-images-per-page', '8'), 10);

const report = JSON.parse(fs.readFileSync(REPORT, 'utf8'));

const lines = [];
lines.push(`> 🤖 **Auto-generated** by \`.github/workflows/check-broken-images.yml\` — refreshed weekly.`);
lines.push('');
lines.push(`**Generated:** ${report.generatedAt}`);
lines.push(`**Base URL:** ${report.baseUrl}`);
lines.push(`**Pages scanned:** ${report.pagesScanned} / ${report.pagesAttempted}` + (report.pageFetchFailures ? `  (⚠️ ${report.pageFetchFailures} page fetches failed)` : ''));
lines.push(`**Images checked:** ${report.imagesChecked}`);
lines.push(`**Broken unique images:** ${report.brokenImagesUnique}`);
lines.push(`**Affected pages:** ${report.affectedPages}`);
lines.push('');
lines.push('## Why each image is broken');
lines.push('');
lines.push('| Kind | Meaning |');
lines.push('| --- | --- |');
lines.push('| `missing` | HTTP 404 — file does not exist at the URL the page emitted. |');
lines.push('| `hotlink-blocked` | HTTP 403, or 200 with a non-image Content-Type (origin refusing the hot-link). |');
lines.push('| `server-error` | HTTP 5xx — upstream is failing, may be transient. |');
lines.push('| `network` | TCP/TLS/DNS error or timeout — host unreachable. |');
lines.push('| `invalid` | URL did not parse as a valid URL when extracted from HTML. |');
lines.push('| `empty` | HTTP 200 but zero-length body. |');
lines.push('| `other` | Other 4xx not in the buckets above. |');
lines.push('');
lines.push('## How to fix');
lines.push('');
lines.push('1. **Fix the source, not the rendered output.** Most images come from `packages/frontend/data/drummers.js` (and siblings), `packages/frontend/data/albumArticles.js`, or `public/images/`. Locate the field that emits the broken URL and either correct it or replace the asset.');
lines.push('2. **Drummer profile images** live at `public/images/drummers/<slug>.{webp,jpg}` and are referenced via the `image` field in `api/drummers/index.js`. A 404 means either the file is missing or the slug-to-filename mapping drifted.');
lines.push('3. **Album/article cover images** live at `public/images/albums/<slug>.webp` and are referenced via `ogImage` in `packages/frontend/data/albumArticles.js`.');
lines.push('4. **Hotlinked third-party images** (Wikipedia, YouTube thumbnails, brand sites) that get 403 or content-type mismatch are usually anti-hotlink — host the image locally instead of linking.');
lines.push('5. The `onError` fallback in `<DrummerImage>` (App.js) is a safety net, **not** the fix.');
lines.push('');
lines.push('## Affected pages (top ' + Math.min(report.pages.length, MAX_PAGES_IN_BODY) + ')');
lines.push('');

let pageBudgetExceeded = false;
for (const [i, p] of report.pages.entries()) {
  if (i >= MAX_PAGES_IN_BODY) { pageBudgetExceeded = true; break; }
  const entity = p.entity ? ` — \`${p.entity}\`` : '';
  lines.push(`### ${p.pageUrl}${entity} — ${p.brokenCount} broken`);
  lines.push('');
  lines.push('| Image URL | HTTP | Kind | Error |');
  lines.push('| --- | --- | --- | --- |');
  for (const [j, img] of p.images.entries()) {
    if (j >= MAX_IMAGES_PER_PAGE) {
      lines.push(`| _…and ${p.images.length - MAX_IMAGES_PER_PAGE} more_ | | | |`);
      break;
    }
    const u = img.imageUrl.replace(/\|/g, '\\|');
    lines.push(`| \`${u}\` | ${img.status || '—'} | ${img.kind} | ${img.error || ''} |`);
  }
  lines.push('');
}
if (pageBudgetExceeded) {
  lines.push(`> _…and ${report.pages.length - MAX_PAGES_IN_BODY} more affected pages — see the full JSON in the workflow artifact._`);
  lines.push('');
}

lines.push('---');
lines.push('');
lines.push('<sub>Update this issue by editing the data source(s). The next weekly run will refresh this body automatically; opening additional broken-image issues will be deduplicated — please leave this one open.</sub>');

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, lines.join('\n'));
process.stderr.write(`[render] wrote ${OUT} (${report.pages.length} pages, ${report.brokenImagesUnique} broken)\n`);
