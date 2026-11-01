import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { readdirSync, readFileSync } from 'node:fs';
const require = createRequire(import.meta.url);
const { generatorOrder, preserveUnchangedContent } = require('../scripts/generate-all-llms.cjs');
const { buildGearSection, buildFAQAnswer } = require('../scripts/generate-llms-vs.cjs');

test('unchanged documents retain their actual update date across build days', () => {
  const old = '# Profile\n*Last updated: 2026-10-01 · Source: MetalForge*\n# Generated: 2026-10-01';
  assert.equal(preserveUnchangedContent(old, old.replaceAll('2026-10-01', '2026-11-01')), old);
  const frontmatter = 'last_updated: "2026-10-01"';
  assert.equal(preserveUnchangedContent(frontmatter, frontmatter.replace('2026-10-01', '2026-11-01')), frontmatter);
  const changed = old.replace('Profile', 'Corrected profile').replaceAll('2026-10-01', '2026-11-01');
  assert.equal(preserveUnchangedContent(old, changed), changed);
  assert.equal(preserveUnchangedContent(undefined, changed), changed);
  assert.equal(preserveUnchangedContent('Recorded 2026-10-01', 'Recorded 2026-11-01'), 'Recorded 2026-11-01');
});

test('full generation includes every family once, before its consumers', () => {
  const names = readdirSync(new URL('../scripts/', import.meta.url)).filter(name => /^generate-llms-.*\.cjs$/.test(name));
  const ordered = generatorOrder(names);
  assert.deepEqual([...ordered].sort(), names.sort());
  const before = (producer, consumer) => assert.ok(ordered.indexOf(`generate-llms-${producer}.cjs`) < ordered.indexOf(`generate-llms-${consumer}.cjs`));
  before('endorsements', 'drummers');
  before('drummers', 'articles');
  before('drummers', 'genre-gear-guides');
  before('articles', 'index');
  before('genre-gear-guides', 'index');
  assert.match(readFileSync(new URL('../scripts/build.sh', import.meta.url), 'utf8'), /npm run generate:llms/);
});

test('comparison markdown omits unknown gear and preserves complete known values', () => {
  const missing = { name: 'Unknown', gear: {} };
  assert.equal(buildGearSection(missing, missing.name).trim(), '');
  assert.match(buildFAQAnswer({}, 'Unknown', 'Missing', missing, null), /not documented/);
  assert.doesNotMatch(buildFAQAnswer({}, 'Unknown', 'Missing', missing, null), /custom|signature|Zildjian/i);
  const known = { name: 'Known', gear: { drums: 'Example Kit', cymbals: 'Paiste 2002 and Signature' } };
  assert.match(buildFAQAnswer({}, 'Known', 'Unknown', known, missing), /Paiste 2002 and Signature/);
  assert.doesNotMatch(buildGearSection(known, known.name), /Snare/);
});

const { buildMarkdown: buildBattle } = require('../scripts/generate-llms-battles.cjs');
test('battle markdown does not invent prices, cymbals, snares, or pedals for missing records', () => {
  const a = { id: 9001, name: 'A', band: 'Example', genre: 'Metal', gear: {} };
  const b = { ...a, id: 9002, name: 'B' };
  const { md } = buildBattle({ drummer1Id: a.id, drummer2Id: b.id, title: 'Test' }, { [a.id]: a, [b.id]: b });
  assert.match(md, /Not documented/);
  assert.doesNotMatch(md, /custom|signature snare|double pedal|\$8,000|more expensive|plays undefined|plays null/i);
});
