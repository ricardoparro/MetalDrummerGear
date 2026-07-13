#!/usr/bin/env node
// CI guard against #4266-class drift: a static `path === '/...'` handler
// added to api/meta/[...path].js needs a matching bot-UA rewrite entry in
// vercel.json's rewrites list, or crawlers (Googlebot, GPTBot, ClaudeBot,
// etc.) hitting that path fall through to the generic SPA shell instead of
// the handler's title/description/JSON-LD. This has shipped broken at least
// four times (#3934, #3972, #4110, #4266) because nothing enforced the two
// files stay in sync. See also #4205, which covers the analogous drift
// between the /llms/*.md generators and their routes.

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const META_HANDLER_PATH = path.join(ROOT, 'api/meta/[...path].js');
const VERCEL_CONFIG_PATH = path.join(ROOT, 'vercel.json');

const BOT_UA_REWRITE_REGEX = /path === ['"]([^'"]+)['"]/g;

// Static handler paths that exist in api/meta/[...path].js but are
// intentionally NOT expected to have a bot-UA rewrite in vercel.json.
// Keep this list short, and document *why* each entry is here.
const SKIP_LIST = new Set([
  // Served directly by api/facts.js via an unconditional (non bot-gated)
  // rewrite that returns the same SSR HTML + FAQPage JSON-LD to everyone,
  // bots included. The api/meta handler is unused legacy code.
  '/facts',
  // Confirmed dead/orphaned in #4266 (commit 970d48e8): no live client-side
  // route and no sitemap entry links to these paths.
  '/signature-licks',
  '/tools/signature-licks',
  '/tools/gear-finder',
]);

function extractMetaHandlerPaths(source) {
  const paths = new Set();
  let match;
  BOT_UA_REWRITE_REGEX.lastIndex = 0;
  while ((match = BOT_UA_REWRITE_REGEX.exec(source))) {
    paths.add(match[1]);
  }
  paths.delete(''); // `path === ''` covers the root alongside `path === '/'`
  return paths;
}

function extractBotGatedRewriteSources(vercelConfig) {
  const sources = new Set();
  for (const rewrite of vercelConfig.rewrites || []) {
    if (!rewrite.destination || !rewrite.destination.includes('/api/meta/')) continue;
    const isBotGated = (rewrite.has || []).some(
      (condition) => condition.type === 'header' && condition.key === 'user-agent'
    );
    if (isBotGated) sources.add(rewrite.source);
  }
  return sources;
}

function main() {
  const metaSource = fs.readFileSync(META_HANDLER_PATH, 'utf8');
  const vercelConfig = JSON.parse(fs.readFileSync(VERCEL_CONFIG_PATH, 'utf8'));

  const handlerPaths = extractMetaHandlerPaths(metaSource);
  const rewriteSources = extractBotGatedRewriteSources(vercelConfig);

  const missing = [...handlerPaths]
    .filter((p) => !SKIP_LIST.has(p))
    .filter((p) => !rewriteSources.has(p))
    .sort();

  if (missing.length > 0) {
    console.error(
      `\ncheck-vercel-rewrites: found ${missing.length} static handler path(s) in api/meta/[...path].js with no matching bot-UA rewrite in vercel.json:\n`
    );
    for (const p of missing) console.error(`  - ${p}`);
    console.error(
      `\nEach path above renders fine for regular users via the SPA fallback, but ` +
      `crawlers (Googlebot, GPTBot, ClaudeBot, PerplexityBot, ...) hitting it never ` +
      `reach the api/meta handler's title/description/JSON-LD.\n\n` +
      `Fix: add a rewrite entry to vercel.json's bot-detection rewrite list, mirroring ` +
      `an existing "destination": "/api/meta/[...path]?path=..." entry.\n` +
      `If the path is genuinely unreachable (no client-side route, not in the sitemap), ` +
      `add it to SKIP_LIST in scripts/check-vercel-rewrites.cjs with a comment explaining why.\n`
    );
    process.exitCode = 1;
    return;
  }

  const checked = [...handlerPaths].filter((p) => !SKIP_LIST.has(p)).length;
  console.log(
    `check-vercel-rewrites: OK - ${checked} static handler(s) in api/meta/[...path].js all have a matching vercel.json bot-UA rewrite (${SKIP_LIST.size} skip-listed).`
  );
}

main();
