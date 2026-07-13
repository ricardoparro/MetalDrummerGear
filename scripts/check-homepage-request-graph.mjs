// Perf gate (#4410, phase 3 of epic #4407): serve the built dist/ + the real
// /api/init handler locally, load the homepage in headless chromium, and fail
// if any scroll-gated route chunk loads eagerly or any image is fetched twice.
// Run after `bash scripts/build.sh`.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';
import initHandler from '../api/init/index.js';

const REPO_ROOT = path.resolve(import.meta.dirname, '..');
const DIST_DIR = path.join(REPO_ROOT, 'packages/frontend/dist');
const PORT = 4173;
const BASE_URL = `http://localhost:${PORT}`;
const { forbiddenChunks } = JSON.parse(fs.readFileSync(path.join(REPO_ROOT, 'perf-budgets.json'), 'utf8')).homepageRequestGraph;

const MIME = {
  '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon', '.woff2': 'font/woff2',
};

// Adapt the Vercel serverless handler's res.status()/res.json() calls onto
// a plain Node http.ServerResponse so we can serve the real /api/init logic.
function vercelResAdapter(res) {
  res.status = (code) => { res.statusCode = code; return res; };
  res.json = (obj) => { res.setHeader('content-type', 'application/json'); res.end(JSON.stringify(obj)); };
  return res;
}

function startServer() {
  const server = http.createServer((req, res) => {
    const { pathname } = new URL(req.url, BASE_URL);
    if (pathname === '/api/init') {
      return initHandler(req, vercelResAdapter(res));
    }

    let filePath = path.join(DIST_DIR, pathname);
    if (pathname === '/' || !path.extname(filePath)) {
      filePath = path.join(DIST_DIR, 'index.html');
    }
    fs.readFile(filePath, (err, data) => {
      if (err) { res.writeHead(404); return res.end('not found'); }
      res.writeHead(200, { 'content-type': MIME[path.extname(filePath)] || 'application/octet-stream' });
      res.end(data);
    });
  });
  return new Promise((resolve) => server.listen(PORT, () => resolve(server)));
}

const CHUNK_NAME_RE = /\/_expo\/static\/js\/web\/([A-Za-z0-9_]+?)-[a-f0-9]{32}\.js$/;
const IMAGE_PATH_RE = /\.(png|jpe?g|webp|gif|svg|ico)$/i;

async function probeHomepage() {
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();
    const requestedPaths = [];
    page.on('request', (req) => {
      const url = new URL(req.url());
      if (url.origin === BASE_URL) requestedPaths.push(url.pathname);
    });

    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);

    return requestedPaths;
  } finally {
    await browser.close();
  }
}

const server = await startServer();
let requestedPaths;
try {
  requestedPaths = await probeHomepage();
} finally {
  server.close();
}

const requestedChunks = new Set();
for (const p of requestedPaths) {
  const match = p.match(CHUNK_NAME_RE);
  if (match) requestedChunks.add(match[1]);
}

const imageCounts = new Map();
for (const p of requestedPaths) {
  if (IMAGE_PATH_RE.test(p)) imageCounts.set(p, (imageCounts.get(p) || 0) + 1);
}

const violations = [];

for (const chunk of forbiddenChunks) {
  if (requestedChunks.has(chunk)) {
    violations.push(`Forbidden chunk "${chunk}" was requested on the homepage.`);
  }
}

const duplicateImages = [...imageCounts.entries()].filter(([, count]) => count > 1);
for (const [imagePath, count] of duplicateImages) {
  violations.push(`Image "${imagePath}" was requested ${count} times on the homepage.`);
}

const summary = [
  `Chunks requested on homepage: ${[...requestedChunks].sort().join(', ') || '(none)'}`,
  `Forbidden chunks checked: ${forbiddenChunks.join(', ')}`,
  `Images requested: ${imageCounts.size}, duplicates: ${duplicateImages.length}`,
].join('\n');

console.log(summary);

const summaryPath = process.env.GITHUB_STEP_SUMMARY;
if (summaryPath) {
  const lines = [
    '## Homepage request-graph check',
    '',
    `- Chunks requested: ${[...requestedChunks].sort().join(', ') || '(none)'}`,
    `- Forbidden chunks checked: ${forbiddenChunks.join(', ')}`,
    `- Duplicate images: ${duplicateImages.length ? duplicateImages.map(([p, c]) => `\`${p}\` ×${c}`).join(', ') : 'none'}`,
    '',
  ];
  fs.appendFileSync(summaryPath, lines.join('\n') + '\n');
}

if (violations.length) {
  console.error('\n❌ Homepage request-graph check failed:');
  for (const v of violations) console.error(`  - ${v}`);
  process.exit(1);
}

console.log('\n✅ Homepage request-graph clean.');
