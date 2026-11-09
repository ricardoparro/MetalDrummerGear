// The GA4 loader injected at build time must carry the CI/bot exclusion guard
// (AGENTS.md: the `ci_test` URL flag is protected). `expo export` drops the
// guarded block in web/index.html, and for months the injected replacement
// called gtag('config') unconditionally, so CI and crawler traffic was counted.
import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { buildGaScript, GA_ID } = require('../packages/frontend/scripts/inject-ga.cjs');
const source = buildGaScript().match(/<script>([\s\S]*)<\/script>/)[1];

const SAFARI = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1';

function run({ host = 'metalforge.io', search = '', ua = SAFARI, webdriver = false, referrer = '', stored = null } = {}) {
  const loaded = [];
  const store = stored ? { ci_test: stored } : {};
  const window = { location: { hostname: host, search } };
  window.window = window;
  const context = vm.createContext({
    window,
    navigator: { userAgent: ua, webdriver },
    document: { referrer, createElement: () => ({}), head: { appendChild: el => loaded.push(el.src) } },
    sessionStorage: { getItem: key => store[key] ?? null, setItem: (key, value) => { store[key] = value; } },
    console: { log() {} },
  });
  vm.runInContext(`var dataLayer; ${source.replace('window.dataLayer = window.dataLayer || [];', 'window.dataLayer = dataLayer = [];')}`, context);
  window.gtag('event', 'probe');
  return { loaded, pushed: window.dataLayer.length, session: store.ci_test ?? null };
}

test('the injected snippet contains the protected ci_test guard', () => {
  assert.match(source, /urlHasCITest/);
  assert.match(source, /sessionStorage\.setItem\('ci_test'/);
});

test('a real production visitor is tracked', () => {
  const result = run();
  assert.deepEqual(result.loaded, [`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`]);
  assert.equal(result.pushed, 3); // js, config, and the probe event
});

test('?ci_test=1 sends nothing and persists for the session', () => {
  const first = run({ search: '?ci_test=1' });
  assert.deepEqual([first.loaded.length, first.pushed, first.session], [0, 0, '1']);
  const later = run({ stored: '1' });
  assert.deepEqual([later.loaded.length, later.pushed], [0, 0]);
});

for (const [name, options] of [
  ['WebDriver automation', { webdriver: true }],
  ['a preview deployment host', { host: 'metalforge-git-x.vercel.app' }],
  ['Googlebot', { ua: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)' }],
  ['headless Chrome', { ua: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/130.0.0.0 Safari/537.36' }],
  ['a CI referrer', { referrer: 'https://github.com/owner/repo/actions' }],
]) {
  test(`${name} sends nothing`, () => {
    const result = run(options);
    assert.deepEqual([result.loaded.length, result.pushed], [0, 0]);
  });
}
