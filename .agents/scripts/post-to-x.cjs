#!/usr/bin/env node
/**
 * X (Twitter) Agent — one automated daily post for @MetalDrumGear.
 *
 * Replaces the retired browser-automation social agent (.agents/social/PROMPT.md)
 * with the official X API v2 (POST /2/tweets, OAuth 1.0a user context — free
 * tier allows 500 writes/month; we use ~30). Zero LLM tokens: content is
 * composed deterministically from data the pipeline has already verified.
 *
 * Content priority for "today":
 *   1. Event post — an entry in .agents/events-calendar.json whose anniversary
 *      is today (death > album > birth), sharing the same verified factAnchors
 *      the Event Scanner uses for pages. Links only to KNOWN-GOOD URL shapes:
 *      the event's pageUrl, or /drummer/<slug> for drummer events; album events
 *      without a pageUrl link to the site root (never guess an article URL).
 *   2. Fallback pool — day-of-year rotation between two deterministic
 *      templates, alternating by day parity:
 *        - Gear spotlight: rotation over the verified drumsticks module
 *          (packages/frontend/data/drumsticks.js), linking to the drummer's page.
 *        - Data drop (issue #4766): rotation over the /studies registry
 *          (packages/frontend/data/studies/index.js) — one computed headline
 *          stat + a link to the study, read at runtime from the same
 *          generator-produced numbers the study pages themselves render
 *          (never hand-typed here).
 *
 * Env: X_API_KEY, X_API_SECRET, X_ACCESS_TOKEN, X_ACCESS_SECRET (repo secrets).
 *      Missing secrets → exit 0 with a NOT CONFIGURED notice, so the loop stays
 *      green until the founder creates the X developer app.
 * Flags: --dry-run (compose + print, never post). TEST_TODAY=YYYY-MM-DD pins
 *        the date for testing.
 */
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');
const { nextOccurrence } = require('./scan-events.cjs');

const SITE = 'https://metalforge.io';
const CALENDAR_PATH = path.join(__dirname, '..', 'events-calendar.json');
const STICKS_PATH = path.join(__dirname, '..', '..', 'packages', 'frontend', 'data', 'drumsticks.js');
const STUDIES_PATH = path.join(__dirname, '..', '..', 'packages', 'frontend', 'data', 'studies', 'index.js');

// RFC 3986 percent-encoding (encodeURIComponent misses !*'())
const pct = (s) => encodeURIComponent(s).replace(/[!*'()]/g, (c) => '%' + c.charCodeAt(0).toString(16).toUpperCase());

function oauthHeader(method, url, creds) {
  const p = {
    oauth_consumer_key: creds.apiKey,
    oauth_nonce: crypto.randomBytes(16).toString('hex'),
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
    oauth_token: creds.accessToken,
    oauth_version: '1.0',
  };
  // JSON bodies are excluded from the signature base string (only form-encoded
  // bodies and query params are included, per the OAuth 1.0a spec).
  const paramStr = Object.keys(p).sort().map((k) => `${pct(k)}=${pct(p[k])}`).join('&');
  const base = [method.toUpperCase(), pct(url), pct(paramStr)].join('&');
  const key = `${pct(creds.apiSecret)}&${pct(creds.accessSecret)}`;
  p.oauth_signature = crypto.createHmac('sha1', key).update(base).digest('base64');
  return 'OAuth ' + Object.keys(p).sort().map((k) => `${pct(k)}="${pct(p[k])}"`).join(', ');
}

async function postTweet(text, creds) {
  const url = 'https://api.twitter.com/2/tweets';
  const res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: oauthHeader('POST', url, creds), 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });
  const body = await res.text();
  if (!res.ok) throw new Error(`X API ${res.status}: ${body.slice(0, 400)}`);
  return JSON.parse(body);
}

// X counts every URL as 23 chars (t.co), regardless of real length.
const tweetLen = (text) => text.replace(/https?:\/\/\S+/g, 'x'.repeat(23)).length;

const titleCase = (slug) => slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

// Pick the most tweet-worthy anchor: drop ones that restate the headline
// (birth anchors start "Born YYYY-MM-DD —", death anchors start "Died ...").
function pickFact(ev) {
  const anchors = ev.factAnchors || [];
  for (const a of anchors) {
    if (ev.kind === 'birth' && /^Born /.test(a)) {
      const tail = a.split('— ')[1];
      if (tail) return tail;
      continue;
    }
    if (ev.kind === 'death-anniversary' && /^Died /.test(a)) continue;
    return a;
  }
  return '';
}

function composeEventPost(ev, occ) {
  let head, url;
  if (ev.kind === 'birth') {
    head = `🥁 Happy birthday ${ev.subject} — ${occ.anniversary} today!`;
    url = SITE + (ev.pageUrl || `/drummer/${ev.subjectSlug}`);
  } else if (ev.kind === 'death-anniversary') {
    head = `🖤 Remembering ${ev.subject} — ${occ.anniversary} year${occ.anniversary === 1 ? '' : 's'} ago today.`;
    url = SITE + (ev.pageUrl || `/drummer/${ev.subjectSlug}`);
  } else {
    // album-release / brand-founded: subjectSlug is NOT a drummer slug, so only
    // a calendar-provided pageUrl may be deep-linked.
    head = `📀 On this day, ${occ.anniversary} years ago: ${ev.subject}.`;
    url = ev.pageUrl ? SITE + ev.pageUrl : SITE;
  }
  const fact = pickFact(ev).replace(/\.$/, '');
  const tags = '#MetalDrumming #DrumGear';
  let text = fact ? `${head}\n\n${fact}.\n\n${url}\n${tags}` : `${head}\n\n${url}\n${tags}`;
  if (tweetLen(text) > 280) text = `${head}\n\n${url}\n${tags}`;
  return text;
}

async function composeSpotlight(now) {
  const mod = await import(pathToFileURL(STICKS_PATH).href);
  const sticks = mod.DRUMSTICKS.filter((s) => s.drummerSlug);
  if (!sticks.length) return null;
  const dayIndex = Math.floor(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()) / 86400000);
  const s = sticks[dayIndex % sticks.length];
  const name = titleCase(s.drummerSlug);
  const sig = s.endorsementType === 'signature-model' ? ' signature' : '';
  const text = `⚙️ Gear check: ${name}'s${sig} stick — the ${s.brand} ${s.model}. ${s.material}, ${s.tip.toLowerCase()} tip.\n\nFull setup → ${SITE}/drummer/${s.drummerSlug}\n\n#DrumGear #MetalDrumming`;
  return tweetLen(text) <= 280 ? text : `⚙️ Gear check: ${name} plays the ${s.brand} ${s.model}.\n\n${SITE}/drummer/${s.drummerSlug}\n\n#DrumGear #MetalDrumming`;
}

// Issue #4766 (phase 3/3 of the studies epic, #4763): "data drop" fallback —
// one computed headline stat per study, day-of-year rotation over the
// /studies registry. The stat text (value/label/sentence) is read at runtime
// from packages/frontend/data/studies/index.js, which itself computes it from
// the studies stats engine (scripts/compute-studies.cjs) — never hand-typed
// here, same rule composeSpotlight already follows for gear facts.
async function composeDataDrop(now) {
  const mod = await import(pathToFileURL(STUDIES_PATH).href);
  const studies = mod.STUDIES;
  if (!studies || !studies.length) return null;
  const dayIndex = Math.floor(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()) / 86400000);
  const study = studies[dayIndex % studies.length];
  const { value, label, sentence } = study.headlineStat;
  const url = `${SITE}/studies/${study.slug}`;
  const text = `📊 Data drop: ${value} — ${label}\n\n${sentence}\n\nFull study → ${url}\n\n#MetalDrumming #DataDrop`;
  return tweetLen(text) <= 280 ? text : `📊 Data drop: ${value} — ${label}\n\n${url}\n\n#MetalDrumming #DataDrop`;
}

// Fallback pool (issue #4766): alternates gear spotlight and studies data drop
// by day parity so the same template doesn't post every single day.
async function composeFallback(now) {
  const dayIndex = Math.floor(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()) / 86400000);
  return dayIndex % 2 === 0 ? composeSpotlight(now) : composeDataDrop(now);
}

function stepSummary(line) {
  if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, line + '\n');
}

async function main() {
  const dryRun = process.argv.includes('--dry-run');
  const now = process.env.TEST_TODAY ? new Date(`${process.env.TEST_TODAY}T12:00:00Z`) : new Date();

  const cal = JSON.parse(fs.readFileSync(CALENDAR_PATH, 'utf8'));
  const events = Array.isArray(cal) ? cal : cal.events;
  const todays = events
    .map((ev) => ({ ev, occ: nextOccurrence(ev, now) }))
    .filter((x) => x.occ && x.occ.daysUntil === 0);
  const kindOrder = { 'death-anniversary': 0, 'album-release': 1, 'brand-founded': 2, birth: 3 };
  todays.sort((a, b) => (kindOrder[a.ev.kind] ?? 9) - (kindOrder[b.ev.kind] ?? 9));

  const text = todays.length ? composeEventPost(todays[0].ev, todays[0].occ) : await composeFallback(now);
  if (!text) { console.log('[x-agent] nothing to post today'); return; }

  const source = todays.length ? `event: ${todays[0].ev.id}` : (text.startsWith('📊') ? 'data drop' : 'spotlight');
  console.log(`[x-agent] composed (${tweetLen(text)}/280 chars, ${source}):\n---\n${text}\n---`);
  if (dryRun) { console.log('[x-agent] dry-run — not posting'); return; }

  const creds = {
    apiKey: process.env.X_API_KEY,
    apiSecret: process.env.X_API_SECRET,
    accessToken: process.env.X_ACCESS_TOKEN,
    accessSecret: process.env.X_ACCESS_SECRET,
  };
  if (!creds.apiKey || !creds.apiSecret || !creds.accessToken || !creds.accessSecret) {
    console.log('[x-agent] NOT CONFIGURED — add repo secrets X_API_KEY, X_API_SECRET, X_ACCESS_TOKEN, X_ACCESS_SECRET (X developer app with Read+Write). Skipping.');
    stepSummary('## 📱 X Agent\n_Not configured — X API secrets missing._');
    return;
  }
  const out = await postTweet(text, creds);
  const id = out.data && out.data.id;
  console.log(`[x-agent] posted: https://x.com/MetalDrumGear/status/${id}`);
  stepSummary(`## 📱 X Agent\nPosted: https://x.com/MetalDrumGear/status/${id}\n\n> ${text.replace(/\n/g, '\n> ')}`);
}

module.exports = { composeEventPost, composeSpotlight, composeDataDrop, composeFallback, pickFact, tweetLen, oauthHeader };

if (require.main === module) {
  main().catch((e) => { console.error(`FATAL: ${e.stack || e.message}`); process.exit(1); });
}
