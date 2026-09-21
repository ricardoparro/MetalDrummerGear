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
import { getBrandForPedal } from './pedalBrands';
import { getExtendedBio } from './extendedBios';

const BASE_URL = 'https://metalforge.io';
export const PEDAL_SETUP_BASE_PATH = '/pedals/setups';

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
  };
}

// Issue #7907: the /pedals/setups/<drummer> template was thin relative to
// the site's other entity-page families (a single hardware item vs. a
// multi-piece cymbal breakdown), which drew a crawled-not-indexed verdict
// for igor-cavalera. Both additions below reuse data already verified and
// sourced elsewhere (data/pedalBrands.js, data/extendedBios.js) rather than
// inventing new facts — never duplicated verbatim on another page.

// Brand-level positioning copy + (if this pedal's model matches a named
// line) the specific model-line description from data/pedalBrands.js, plus
// that brand's own external citation. Returns null when the pedal's brand
// has no /pedals/brands/<slug> entry.
export function getPedalSetupBrandContext(pedal) {
  const brand = getBrandForPedal(pedal);
  if (!brand) return null;
  const notableLine = pedal.model
    ? (brand.notableLines || []).find(
        (line) => pedal.model.includes(line.name) || line.name.includes(pedal.model)
      )
    : null;
  return { brand, notableLine: notableLine || null };
}

// The drummer's own extended-bio FAQ answer to "what pedal(s) does X use" —
// richer and more specific (era, playing style) than the generic
// generatePedalSetupDirectAnswer() below, since it's hand-authored per
// drummer rather than templated from the bare pedal record. Returns null
// when the drummer has no extended bio or no pedal-related FAQ entry.
export function getPedalSetupContextFaq(drummerSlug) {
  const bio = getExtendedBio(drummerSlug);
  const items = bio?.sections?.faq?.items || [];
  return items.find((item) => /pedal/i.test(item.q)) || null;
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
  const { pedal, drummerName, canonicalUrl, drummerSlug } = data;

  const schemas = [];
  const descriptor = pedalDescriptor(pedal);
  const contextFaq = getPedalSetupContextFaq(drummerSlug);

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

  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What pedals does ${drummerName} use?`,
        acceptedAnswer: { '@type': 'Answer', text: generatePedalSetupDirectAnswer(data) },
      },
      ...(contextFaq
        ? [
            {
              '@type': 'Question',
              name: contextFaq.q,
              acceptedAnswer: { '@type': 'Answer', text: contextFaq.a },
            },
          ]
        : []),
    ],
  });

  return schemas;
}
