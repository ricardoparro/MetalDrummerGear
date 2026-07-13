#!/usr/bin/env node
// Perf gate (#4410, phase 3 of epic #4407): run after `bash scripts/build.sh`.
//
// 1. Bundle budget: index-*.js + __common-*.js raw size vs perf-budgets.json.
// 2. Homepage request-graph: serve dist/ + a stub /api/init, load `/` in
//    headless chromium, fail if any non-homepage route chunk is requested or
//    any image is requested more than once (see #4407/#4408 duplicate-fetch
//    regressions this locks in).
//
// Budgets live in perf-budgets.json at the repo root so raising them is an
// explicit, reviewable diff.

import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import initHandler from '../api/init/index.js';

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST_DIR = path.join(REPO_ROOT, 'packages/frontend/dist');
const JS_DIR = path.join(DIST_DIR, '_expo/static/js/web');
const BUDGETS = JSON.parse(fs.readFileSync(path.join(REPO_ROOT, 'perf-budgets.json'), 'utf8'));

const HASH_JS_RE = /^(.*)-([0-9a-f]{32})\.js$/;
const CONTENT_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
};

function formatKB(bytes) {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

function checkBundleBudget() {
  const files = fs.readdirSync(JS_DIR);
  const indexFile = files.find((f) => /^index-.*\.js$/.test(f));
  const commonFile = files.find((f) => /^__common-.*\.js$/.test(f));
  if (!indexFile || !commonFile) {
    throw new Error(`Could not find index-*.js / __common-*.js in ${JS_DIR}`);
  }
  const indexSize = fs.statSync(path.join(JS_DIR, indexFile)).size;
  const commonSize = fs.statSync(path.join(JS_DIR, commonFile)).size;
  const total = indexSize + commonSize;
  const { budgetBytes, warnBytes } = BUDGETS.bundle;
  const status = total > budgetBytes ? 'FAIL' : total > warnBytes ? 'WARN' : 'OK';
  return { indexFile, indexSize, commonFile, commonSize, total, budgetBytes, warnBytes, status };
}

// Adapts the real Vercel-style (req, res) handler to plain node http so the
// request graph check exercises the actual /api/init response shape.
function serveApiInit(req, res) {
  const fakeRes = {
    _status: 200,
    setHeader: (k, v) => res.setHeader(k, v),
    status(code) {
      this._status = code;
      return this;
    },
    json(body) {
      res.statusCode = this._status;
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.end(JSON.stringify(body));
    },
    end(body) {
      res.statusCode = this._status;
      res.end(body);
    },
  };
  initHandler({ method: req.method, headers: req.headers }, fakeRes);
}

function startServer() {
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, 'http://localhost');
    if (url.pathname === '/api/init') {
      serveApiInit(req, res);
      return;
    }
    const relPath = url.pathname === '/' ? 'index.html' : decodeURIComponent(url.pathname).replace(/^\/+/, '');
    const filePath = path.join(DIST_DIR, relPath);
    if (!filePath.startsWith(DIST_DIR)) {
      res.writeHead(403).end();
      return;
    }
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404).end('Not found');
        return;
      }
      res.setHeader('Content-Type', CONTENT_TYPES[path.extname(filePath)] || 'application/octet-stream');
      res.end(data);
    });
  });
  return new Promise((resolve) => {
    // 127.0.0.1, not 'localhost' — App.js special-cases hostname === 'localhost'
    // to point at a dev backend on :3001 instead of using a relative /api/init.
    server.listen(0, '127.0.0.1', () => resolve(server));
  });
}

async function checkRequestGraph(origin) {
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();
    const requestUrls = [];
    page.on('request', (req) => requestUrls.push(req.url()));
    await page.goto(`${origin}/`, { waitUntil: 'load', timeout: 30000 });
    // Give post-mount effects a beat to fire: the /api/init fetch, image
    // preloads, and the app's progressive idle-preload queue (App.js
    // `preloadTasks`, ~13 tasks x 150ms stagger — see perf-budgets.json's
    // homepageRequestGraph comment for why those chunks are allow-listed).
    await page.waitForTimeout(10000);

    const forbiddenChunks = new Set();
    const imageCounts = new Map();

    for (const url of requestUrls) {
      if (!url.startsWith(origin)) continue; // ignore cross-origin (GA, AdSense, etc.)
      const pathname = url.slice(origin.length).split('?')[0];
      const basename = path.basename(pathname);
      const jsMatch = basename.match(HASH_JS_RE);
      if (jsMatch) {
        const chunkName = jsMatch[1];
        if (!BUDGETS.homepageRequestGraph.allowedChunks.includes(chunkName)) {
          forbiddenChunks.add(chunkName);
        }
        continue;
      }
      if (/\.(webp|png|jpe?g|svg|gif|ico)$/i.test(pathname)) {
        imageCounts.set(pathname, (imageCounts.get(pathname) || 0) + 1);
      }
    }

    const maxPerImage = BUDGETS.homepageRequestGraph.maxRequestsPerImage;
    const duplicateImages = [...imageCounts.entries()].filter(([, count]) => count > maxPerImage);

    return { forbiddenChunks: [...forbiddenChunks].sort(), duplicateImages };
  } finally {
    await browser.close();
  }
}

function buildReport(bundle, graph) {
  const lines = [];
  lines.push('## Perf budget gate (#4410)', '');
  lines.push('### Bundle size', '');
  lines.push('| File | Size | Budget | Warn at |');
  lines.push('|---|---|---|---|');
  lines.push(`| ${bundle.indexFile} | ${formatKB(bundle.indexSize)} | — | — |`);
  lines.push(`| ${bundle.commonFile} | ${formatKB(bundle.commonSize)} | — | — |`);
  lines.push(
    `| **Total (index + common)** | **${formatKB(bundle.total)}** | ${formatKB(bundle.budgetBytes)} | ${formatKB(bundle.warnBytes)} |`
  );
  lines.push('', `Status: **${bundle.status}**`, '');

  lines.push('### Homepage request graph', '');
  if (graph.forbiddenChunks.length === 0) {
    lines.push('- No route chunks requested on `/` — OK.');
  } else {
    lines.push(`- Route chunks requested on \`/\` (should be none): ${graph.forbiddenChunks.join(', ')}`);
  }
  if (graph.duplicateImages.length === 0) {
    lines.push('- No image requested more than once — OK.');
  } else {
    lines.push('- Images requested more than once:');
    for (const [imgPath, count] of graph.duplicateImages) {
      lines.push(`  - \`${imgPath}\` — ${count}x`);
    }
  }

  return lines.join('\n');
}

async function main() {
  const bundle = checkBundleBudget();
  const server = await startServer();
  const { port } = server.address();
  let graph;
  try {
    graph = await checkRequestGraph(`http://127.0.0.1:${port}`);
  } finally {
    server.close();
  }

  const report = buildReport(bundle, graph);
  console.log(report);

  if (process.env.GITHUB_STEP_SUMMARY) {
    fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, `${report}\n`);
  }

  const failed = bundle.status === 'FAIL' || graph.forbiddenChunks.length > 0 || graph.duplicateImages.length > 0;
  if (failed) {
    console.error('\nPerf budget gate FAILED.');
    process.exit(1);
  }
  if (bundle.status === 'WARN') {
    console.warn('\nPerf budget gate: bundle size is within 5% of budget.');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
