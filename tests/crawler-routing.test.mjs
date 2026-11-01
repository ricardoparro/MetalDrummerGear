import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire, register } from 'node:module';
import middleware from '../middleware.js';
register('../scripts/_ext-resolve-hook.mjs', import.meta.url);
const { default: handler, getMetaForPath } = await import('../api/meta/[...path].js');
const { drummers } = await import('../api/drummers/index.js');
const require = createRequire(import.meta.url);
const { matchesRewriteSource } = require('../scripts/check-vercel-rewrites.cjs');
const vercel = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url)));
const botRules = vercel.rewrites.filter(rule => rule.destination.includes('/api/meta/') && rule.has?.some(c => c.key === 'user-agent'));
const agents = ['Googlebot', 'Google-InspectionTool', 'Bingbot', 'bingbot/2.0', 'GPTBot', 'ChatGPT-User',
  'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'Claude-Web', 'anthropic-ai', 'PerplexityBot',
  'Perplexity-User', 'Applebot-Extended', 'cohere-ai', 'Google-Extended', 'OAI-SearchBot',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36; compatible; OAI-SearchBot/1.4; +https://openai.com/searchbot'];
const browser = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/131.0.0.0 Safari/537.36';

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
    }
  });
}

test('ordinary browsers retain the SPA; explicit Markdown retains content negotiation', () => {
  assert.equal(middleware(new Request('https://metalforge.io/', { headers: { 'user-agent': browser } })).headers.get('x-middleware-next'), '1');
  for (const [path, target] of [['/', '/api/home/markdown'], ['/drummer/joey-jordison', '/api/drummer/joey-jordison/markdown']]) {
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
