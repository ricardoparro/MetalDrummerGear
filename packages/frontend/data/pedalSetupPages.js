// Pedal Setup Pages Data Module — Issue #4393 (phase 3/4 of epic #4387)
//
// Provides URL detection, page-ready content, and schema generation for the
// /pedals/setups/<drummer> pages that target "what pedals does <drummer>
// use". Data layer lives in data/pedals.js (PEDALS); this module turns a
// drummer's verified pedal record into page content. Only drummers with a
// confirmed pedal get a page — callers should gate rendering on
// getPedalForDrummer(slug) returning a record (see PedalSetupPage.jsx),
// mirroring the /cymbals/setups pattern shipped in #4306.

import { getPedalForDrummer } from './pedals';
import { getEndorsementTimeline, ENDORSEMENT_CATEGORIES } from './endorsementNews';
import { getGearPriceHistory, hasPriceHistoryData } from './gearPriceHistory';

const BASE_URL = 'https://metalforge.io';
export const PEDAL_SETUP_BASE_PATH = '/pedals/setups';

// Pedal switch history sourced from the same verified endorsement timeline
// used on /endorsements — on this site, HARDWARE-category timeline entries
// are exclusively bass drum pedal changes. Empty array when nothing is on
// record for this drummer (never guessed).
export function getPedalHistoryForDrummer(drummerSlug) {
  const timeline = getEndorsementTimeline(drummerSlug);
  if (!timeline || !Array.isArray(timeline.timeline)) return [];
  return timeline.timeline
    .filter((entry) => entry.category === ENDORSEMENT_CATEGORIES.HARDWARE)
    .sort((a, b) => a.year - b.year);
}

// Optional earlier-era pedal snapshot from the /drummers/<slug>/gear-history
// dataset, surfaced only when that era's verified hardware notes actually
// name a pedal — never assumed, since gear-history "hardware" can just as
// easily describe stands or a throne with no pedal mentioned at all.
export function getPedalEraSnapshotForDrummer(drummerSlug) {
  if (!hasPriceHistoryData(drummerSlug)) return null;
  const history = getGearPriceHistory(drummerSlug);
  const hardware = history?.setup?.hardware;
  if (!hardware || !/pedal/i.test(`${hardware.item} ${hardware.notes || ''}`)) return null;
  return {
    era: history.era,
    year: history.iconicYear,
    item: hardware.item,
    notes: hardware.notes,
    source: hardware.source,
  };
}

export function isPedalSetupPage() {
  return typeof window !== 'undefined' &&
    /^\/pedals\/setups\/[a-z0-9-]+\/?$/i.test(window.location.pathname);
}

export function getPedalSetupSlugFromURL() {
  if (typeof window === 'undefined') return null;
  const match = window.location.pathname.match(/^\/pedals\/setups\/([a-z0-9-]+)\/?$/i);
  return match ? match[1].toLowerCase() : null;
}

// Builds the page-ready record for a drummer, or null if there's no verified
// pedal — the caller must treat null as "render nothing" (no thin page).
export function getPedalSetupPageData(drummerSlug, drummerName) {
  if (!drummerSlug || !drummerName) return null;
  const pedal = getPedalForDrummer(drummerSlug);
  if (!pedal) return null;
  const url = `${PEDAL_SETUP_BASE_PATH}/${drummerSlug}`;
  return {
    drummerSlug,
    drummerName,
    pedal,
    url,
    canonicalUrl: `${BASE_URL}${url}`,
    drummerUrl: `/drummer/${drummerSlug}`,
    hubUrl: '/pedals',
    pedalHistory: getPedalHistoryForDrummer(drummerSlug),
    eraSnapshot: getPedalEraSnapshotForDrummer(drummerSlug),
  };
}

// "Brand + model" descriptor, or null when the summary doesn't name a
// specific pedal unambiguously (e.g. Jon Dette's two-brand alternative,
// Nicko McBrain's unbranded single pedal) — never invented.
function pedalDescriptor(pedal) {
  if (pedal.brand && pedal.model) return `${pedal.brand} ${pedal.model}`;
  return pedal.brand || null;
}

function pedalConfigPhrase(pedal) {
  if (pedal.configuration === 'double') return 'double pedal';
  if (pedal.configuration === 'single') return /\(x2\)/i.test(pedal.summary) ? 'single pedals (x2)' : 'single pedal';
  return 'pedal';
}

// Single-paragraph, direct-answer text for "What pedals does <drummer> use?"
// — shared verbatim between the visible FAQ block on the page and the
// FAQPage schema so the two never drift. This is the format LLMs cite.
export function generatePedalSetupDirectAnswer(data) {
  const { pedal, drummerName } = data;
  const descriptor = pedalDescriptor(pedal);
  if (!descriptor) {
    return `${drummerName} plays a ${pedal.summary}.`;
  }
  const configPhrase = pedalConfigPhrase(pedal);
  const driveSuffix = pedal.driveType ? ` (${pedal.driveType}-drive)` : '';
  const article = configPhrase.endsWith('(x2)') ? '' : (/^[aeiou]/i.test(descriptor) ? 'an ' : 'a ');
  return `${drummerName} plays ${article}${descriptor} ${configPhrase}${driveSuffix}.`;
}

// "Has <drummer> always played this pedal?" answer built from the verified
// switch history — null when there's no recorded history (never fabricated).
export function generatePedalHistoryAnswer(data) {
  const { pedalHistory, drummerName } = data;
  if (!pedalHistory || pedalHistory.length === 0) return null;
  const switches = pedalHistory.map((entry) => {
    const phrase = entry.from ? `switched from ${entry.from} to ${entry.to}` : `signed with ${entry.to}`;
    return `${phrase} in ${entry.year}${entry.notes ? ` — ${entry.notes}` : ''}`;
  }).join('; ');
  return `${drummerName} ${switches}.`;
}

export function generatePedalSetupTitle(data) {
  return `What Pedals Does ${data.drummerName} Use? Full Setup | MetalForge`;
}

export function generatePedalSetupDescription(data) {
  const { pedal, drummerName } = data;
  return `${drummerName}'s bass drum pedal setup — ${pedal.summary}. Brand, model, configuration, and drive type.`;
}

// SEO meta for the page. Mutates document head; no-op on server/no data.
export function updatePedalSetupMeta(data) {
  if (typeof document === 'undefined' || !data) return;
  const title = generatePedalSetupTitle(data);
  const description = generatePedalSetupDescription(data);
  document.title = title;
  setMeta('description', description);
  setMeta('og:title', title, 'property');
  setMeta('og:description', description, 'property');
  setMeta('og:url', data.canonicalUrl, 'property');
  setMeta('og:type', 'article', 'property');
  setMeta('twitter:card', 'summary_large_image');
  setMeta('twitter:title', title);
  setMeta('twitter:description', description);
  setCanonical(data.canonicalUrl);
}

function setMeta(name, content, attr = 'name') {
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(href) {
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

// Product + BreadcrumbList + FAQPage JSON-LD. Returns a plain array safe to
// JSON.stringify; never throws.
export function generatePedalSetupSchema(data) {
  if (!data) return null;
  const { pedal, drummerName, canonicalUrl } = data;

  const schemas = [];
  const descriptor = pedalDescriptor(pedal);

  if (descriptor) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: descriptor,
      brand: pedal.brand ? { '@type': 'Brand', name: pedal.brand } : undefined,
      category: 'Bass Drum Pedals',
    });
  }

  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Pedals', item: `${BASE_URL}/pedals` },
      { '@type': 'ListItem', position: 2, name: `${drummerName}'s Pedals`, item: canonicalUrl },
    ],
  });

  const faqItems = [
    {
      '@type': 'Question',
      name: `What pedals does ${drummerName} use?`,
      acceptedAnswer: { '@type': 'Answer', text: generatePedalSetupDirectAnswer(data) },
    },
  ];

  const historyAnswer = generatePedalHistoryAnswer(data);
  if (historyAnswer) {
    faqItems.push({
      '@type': 'Question',
      name: `Has ${drummerName} always played this pedal?`,
      acceptedAnswer: { '@type': 'Answer', text: historyAnswer },
    });
  }

  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems,
  });

  return schemas;
}
