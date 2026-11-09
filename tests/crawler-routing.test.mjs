import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire, register } from 'node:module';
import middleware from '../middleware.js';
register('../scripts/_ext-resolve-hook.mjs', import.meta.url);
const { default: handler, getMetaForPath, resolveSocialImage } = await import('../api/meta/[...path].js');
const { drummers } = await import('../api/drummers/index.js');
const require = createRequire(import.meta.url);
const { matchesRewriteSource } = require('../scripts/check-vercel-rewrites.cjs');
const vercel = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url)));
const botRules = vercel.rewrites.filter(rule => rule.destination.includes('/api/meta/') && rule.has?.some(c => c.key === 'user-agent'));
const agents = ['Googlebot', 'Google-InspectionTool', 'Bingbot', 'bingbot/2.0', 'GPTBot', 'ChatGPT-User',
  'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'Claude-Web', 'anthropic-ai', 'PerplexityBot',
  'Perplexity-User', 'Applebot-Extended', 'cohere-ai', 'Google-Extended', 'OAI-SearchBot',
  // Search engines, AI fetchers and link unfurlers that used to get the empty SPA shell.
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Safari/605.1.15 (Applebot/0.1; +http://www.apple.com/go/applebot)',
  'DuckDuckBot/1.1; (+http://duckduckgo.com/duckduckbot.html)', 'DuckAssistBot/1.2; (+http://duckduckgo.com/duckassistbot.html)',
  'Mozilla/5.0 (compatible; YandexBot/3.0; +http://yandex.com/bots)', 'Mozilla/5.0 (compatible; GoogleOther)',
  'CCBot/2.0 (https://commoncrawl.org/faq/)', 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Amazonbot/0.1; +https://developer.amazon.com/support/amazonbot)',
  'meta-externalagent/1.1 (+https://developers.facebook.com/docs/sharing/webmasters/crawler)',
  'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; MistralAI-User/1.0; +https://docs.mistral.ai/robots)',
  'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)', 'Twitterbot/1.0',
  'Slackbot-LinkExpanding 1.0 (+https://api.slack.com/robots)', 'WhatsApp/2.23.20.0', 'Mozilla/5.0 (compatible; Discordbot/2.0; +https://discordapp.com)',
  'LinkedInBot/1.0 (compatible; Mozilla/5.0; Apache-HttpClient +http://www.linkedin.com)', 'TelegramBot (like TwitterBot)',
  'Mozilla/5.0 (compatible; Pinterestbot/1.0; +http://www.pinterest.com/bot.html)', 'Mozilla/5.0 (compatible; redditbot/1.0; +http://www.reddit.com/feedback)',
  'Mozilla/5.0 (compatible; Bluesky Cardyb/1.1; +mailto:support@bsky.app)',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36; compatible; OAI-SearchBot/1.4; +https://openai.com/searchbot'];
const browser = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/131.0.0.0 Safari/537.36';
// Real people inside app webviews: must never be routed to the crawler document.
const inAppBrowsers = [
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 [Pinterest/iOS]',
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 [LinkedInApp]/9.29.8',
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/21F90 [FBAN/FBIOS;FBAV/470.0.0.31.108;FBDV/iPhone15,2]',
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Twitter for iPhone/10.48',
  'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/126.0.0.0 Mobile Safari/537.36 Instagram 336.0.0.35.90 Android',
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1',
];

for (const agent of agents) {
  test(`crawler receives homepage HTML and matches all route families: ${agent}`, () => {
    const response = middleware(new Request('https://metalforge.io/', { headers: { 'user-agent': agent } }));
    assert.equal(response.headers.get('x-middleware-rewrite'), 'https://metalforge.io/api/meta/[...path]?path=');
    assert.equal(response.headers.get('vary'), 'Accept, User-Agent');
    assert.ok(botRules.length >= 99);
    for (const rule of botRules) {
      const pattern = rule.has.find(c => c.key === 'user-agent').value;
      assert.match(agent, new RegExp(`^(?:${pattern})$`), rule.source);
      assert.doesNotMatch(browser, new RegExp(`^(?:${pattern})$`), rule.source);
      for (const ua of inAppBrowsers) assert.doesNotMatch(ua, new RegExp(`^(?:${pattern})$`), rule.source);
    }
  });
}

test('ordinary browsers retain the SPA; explicit Markdown retains content negotiation', () => {
  assert.equal(middleware(new Request('https://metalforge.io/', { headers: { 'user-agent': browser } })).headers.get('x-middleware-next'), '1');
  for (const ua of inAppBrowsers) assert.equal(middleware(new Request('https://metalforge.io/', { headers: { 'user-agent': ua } })).headers.get('x-middleware-next'), '1', ua);
  for (const [path, target] of [['/', '/api/home/markdown'], ['/drummer/joey-jordison', '/llms/drummers/joey-jordison.md']]) {
    const response = middleware(new Request(`https://metalforge.io${path}`, { headers: { accept: 'text/markdown', 'user-agent': 'OAI-SearchBot' } }));
    assert.equal(response.headers.get('x-middleware-rewrite'), `https://metalforge.io${target}`);
    assert.equal(response.headers.get('vary'), 'Accept, User-Agent');
  }
});

test('rewrite coverage recognizes named segments without accepting missing families', () => {
  assert.equal(matchesRewriteSource('/bands/:slug', '/bands/drum-chair-changes'), true);
  assert.equal(matchesRewriteSource('/bands/:slug', '/bands/a/b'), false);
  assert.equal(matchesRewriteSource('/bands/:slug', '/articles/example'), false);
});

for (const path of ['/', '/drummers', '/drummer/joey-jordison', '/drummer/joey-jordison/cymbals', '/articles/slipknot-self-titled-drum-setup']) {
  test(`crawler route renders canonical HTML and JSON-LD: ${path}`, () => {
    assert.ok(botRules.some(rule => matchesRewriteSource(rule.source, path)), path);
    const headers = {};
    let status, html;
    handler({ query: { path: path.slice(1) } }, {
      setHeader(key, value) { headers[key] = value; },
      status(code) { status = code; return this; },
      send(body) { html = body; },
    });
    assert.equal(status, 200);
    assert.equal(headers['X-Meta-Handler'], 'hit-v1');
    assert.equal(headers.Vary, 'Accept, User-Agent');
    assert.ok(html.includes(`rel="canonical" href="https://metalforge.io${path === '/' ? '' : path}"`));
    assert.match(html, /<h1>/);
    assert.match(html, /application\/ld\+json/);
    if (path.includes('joey-jordison') || path.includes('slipknot')) assert.match(html, /Joey|Slipknot/);
  });
}

test('comparison JSON-LD omits unknown gear and fabricated freshness', () => {
  const drummer = drummers.find(d => d.name === 'Lars Ulrich');
  const original = drummer.gear;
  try {
    drummer.gear = {};
    const meta = getMetaForPath('/vs/lars-ulrich-vs-joey-jordison');
    assert.ok(meta.faqSchema.length > 0);
    assert.ok(meta.faqSchema.every(faq => !faq.question.includes('Lars Ulrich')));
    assert.doesNotMatch(JSON.stringify(meta.faqSchema), /custom drum kit|Zildjian/);
    assert.equal(meta.articleSchema.dateModified, undefined);
    assert.equal(meta.articleSchema.datePublished, undefined);
    drummer.gear = { drums: 'Verified kit', cymbals: 'Verified cymbals' };
    const known = getMetaForPath('/vs/lars-ulrich-vs-joey-jordison');
    assert.ok(known.faqSchema.some(faq => faq.answer.includes('Verified kit')));
    assert.ok(known.faqSchema.some(faq => faq.answer.includes('Verified cymbals')));
  } finally { drummer.gear = original; }
});

test('comparison, battle, and endorsement routes never guess missing gear or sponsors', () => {
  const drummer = drummers.find(d => d.name === 'Lars Ulrich');
  const gear = drummer.gear, endorsements = drummer.endorsements;
  try {
    drummer.gear = {};
    drummer.endorsements = [];
    for (const path of ['/vs/lars-ulrich-vs-joey-jordison', '/tools/compare/lars-ulrich-vs-joey-jordison',
      '/battles/lars-ulrich-vs-dave-lombardo', '/drummers/lars-ulrich/endorsements', '/drummer/lars-ulrich/endorsements']) {
      const meta = getMetaForPath(path);
      assert.ok(Array.isArray(meta.faqSchema), path);
      assert.doesNotMatch(JSON.stringify(meta.faqSchema), /a custom drum kit|various gear brands/);
      assert.ok(meta.faqSchema.every(faq => !/^What (drum kit|cymbals|brands).*Lars Ulrich/.test(faq.question)), path);
    }
    drummer.gear = { drums: 'Used kit without endorsement evidence' };
    assert.deepEqual(getMetaForPath('/drummer/lars-ulrich/endorsements').faqSchema, []);
    drummer.endorsements = [{ name: 'Verified Sponsor' }];
    assert.match(getMetaForPath('/drummer/lars-ulrich/endorsements').faqSchema[0].answer, /Verified Sponsor/);
  } finally { drummer.gear = gear; drummer.endorsements = endorsements; }
});

// ---- 2026-11 audit regressions -------------------------------------------

function render(path) {
  const headers = {};
  let status, html = '';
  handler({ query: { path: path.slice(1) } }, {
    setHeader(key, value) { headers[key] = value; },
    status(code) { status = code; return this; },
    send(body) { html = body; },
    writeHead(code, extra) { status = code; Object.assign(headers, extra); },
    end() {},
  });
  return { status, headers, html };
}

test('unknown slugs inside a known family answer 404 + noindex, never a soft 404', () => {
  for (const path of ['/drummer/not-a-real-drummer', '/drummer/lars-ulrich/notacategory', '/compare/nope',
    '/vs/foo-vs-bar', '/bands/not-a-band', '/lists/not-a-list']) {
    const { status, headers, html } = render(path);
    assert.equal(status, 404, path);
    assert.equal(headers['X-Robots-Tag'], 'noindex', path);
    assert.match(html, /<meta name="robots" content="noindex/, path);
    assert.doesNotMatch(html, /rel="canonical"/, path);
    assert.doesNotMatch(html, /undefined|Notacategory/, path);
  }
});

test('crawler document never redirects or refreshes to itself', () => {
  // Google-InspectionTool was routed here by vercel.json but failed the old
  // client-side "is this a bot?" regex, so it reloaded the page forever.
  for (const path of ['/', '/drummer/joey-jordison', '/articles/slipknot-self-titled-drum-setup']) {
    const { html } = render(path);
    assert.doesNotMatch(html, /http-equiv="refresh"/, path);
    assert.doesNotMatch(html, /navigator\.userAgent/, path);
  }
});

test('every sitemap URL resolves, with an absolute og:image that exists', async () => {
  const { buildSitemapXml } = await import('../api/sitemap.js');
  const { existsSync } = await import('node:fs');
  const { fileURLToPath } = await import('node:url');
  const repoFile = rel => fileURLToPath(new URL(`../${rel}`, import.meta.url));
  const paths = [...buildSitemapXml().matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1].replace('https://metalforge.io', '') || '/');
  assert.ok(paths.length > 3000);
  for (const path of paths) {
    const meta = getMetaForPath(path);
    assert.notEqual(meta.notFound, true, `sitemap URL falls through to the 404 fallback: ${path}`);
    const image = resolveSocialImage(meta.image);
    assert.match(image, /^https:\/\//, `${path} -> ${image}`);
    if (!image.startsWith('https://metalforge.io/')) continue;
    const pathname = new URL(image).pathname;
    if (pathname.startsWith('/api/og')) {
      const name = pathname.replace(/^\/api\/og\/?/, '') || 'index';
      assert.ok(existsSync(repoFile(`api/og/${name}.js`)), `${path} -> ${image}`);
    } else if (pathname.startsWith('/api/card/')) {
      assert.ok(existsSync(repoFile('api/card/[slug].js')), `${path} -> ${image}`);
    } else {
      assert.ok(existsSync(repoFile(`public${pathname}`)), `${path} -> ${image}`);
    }
  }
});

test('meta attributes survive quotes in titles and descriptions', () => {
  const { html } = render('/songs/enter-sandman');
  assert.match(html, /<meta name="title" content="&quot;Enter Sandman&quot; by Metallica[^"]*">/);
  for (const tag of html.match(/<meta [^>]*>/g)) assert.doesNotMatch(tag, /content="[^"]*"[^\s/>]/, tag);
});

test("a drummer profile links the drummer's own articles before ones that only mention them", () => {
  const { html } = render('/drummer/joey-jordison');
  const links = [...html.matchAll(/href="\/articles\/([^"]+)"/g)].map(m => m[1]);
  assert.ok(links.length > 0);
  assert.ok(links.slice(0, 3).every(slug => /slipknot|iowa|subliminal|all-hope|joey/.test(slug)), links.join(', '));
});

test('image functions are plain .js so Vercel deploys them, and cover every drummer', async () => {
  // Vercel only auto-detects api/**/*.{js,mjs,ts,tsx}; the former .jsx files
  // were silently never deployed and every og:image pointing at them 404'd.
  const { readdirSync } = await import('node:fs');
  const { fileURLToPath } = await import('node:url');
  const walk = dir => readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(`${dir}/${e.name}`) : [`${dir}/${e.name}`]);
  const apiDir = fileURLToPath(new URL('../api', import.meta.url));
  assert.deepEqual(walk(apiDir).filter(f => f.endsWith('.jsx')), []);
  const card = (await import('../api/card/[slug].js')).default;
  for (const drummer of drummers) {
    const image = getMetaForPath(`/drummer/${drummer.name.toLowerCase().replace(/[åä]/g, 'a').replace(/ö/g, 'o').replace(/ü/g, 'u').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`).image;
    if (!image.includes('/api/card/')) continue;
    const slug = new URL(image).pathname.split('/').pop();
    const response = await card(new Request(`https://metalforge.io/api/card/${slug}`)).catch(e => e);
    assert.notEqual(response.status, 404, `no card for ${slug}`);
  }
});
