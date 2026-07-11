// Cymbal Setup Pages Data Module — Issue #4306 (phase 3 of epic #4303)
//
// Provides URL detection, page-ready content, and schema generation for the
// /cymbals/setups/<drummer> pages that target "what cymbals does <drummer>
// use". Data layer lives in data/cymbalSetups.js (CYMBAL_SETUPS); this module
// turns a drummer's parsed setup into page content. Only drummers with an
// entry in CYMBAL_SETUPS get a page — callers should gate rendering on
// getSetupForDrummer(slug) returning a setup (see CymbalSetupPage.jsx). No
// page without verified data.

import { getSetupForDrummer } from './cymbalSetups';

const BASE_URL = 'https://metalforge.io';
export const CYMBAL_SETUP_BASE_PATH = '/cymbals/setups';

export function isCymbalSetupPage() {
  return typeof window !== 'undefined' &&
    /^\/cymbals\/setups\/[a-z0-9-]+\/?$/i.test(window.location.pathname);
}

export function getCymbalSetupSlugFromURL() {
  if (typeof window === 'undefined') return null;
  const match = window.location.pathname.match(/^\/cymbals\/setups\/([a-z0-9-]+)\/?$/i);
  return match ? match[1].toLowerCase() : null;
}

// Builds the page-ready record for a drummer, or null if there's no verified
// cymbal setup — the caller must treat null as "render nothing" (no thin page).
export function getCymbalSetupPageData(drummerSlug, drummerName) {
  if (!drummerSlug || !drummerName) return null;
  const setup = getSetupForDrummer(drummerSlug);
  if (!setup) return null;
  const url = `${CYMBAL_SETUP_BASE_PATH}/${drummerSlug}`;
  return {
    drummerSlug,
    drummerName,
    setup,
    url,
    canonicalUrl: `${BASE_URL}${url}`,
    drummerUrl: `/drummer/${drummerSlug}`,
    hubUrl: '/cymbals',
  };
}

export function generateCymbalSetupTitle(data) {
  return `What Cymbals Does ${data.drummerName} Use? Full Setup Breakdown | MetalForge`;
}

export function generateCymbalSetupDescription(data) {
  const { setup, drummerName } = data;
  return `${drummerName} plays ${setup.summary} — piece-by-piece breakdown of every cymbal in the setup, with sizes and series.`;
}

// The direct-answer sentence FAQ/LLM-citation formats favor: a single
// self-contained paragraph answering "What cymbals does X use?".
export function generateCymbalSetupAnswer(data) {
  const { setup, drummerName } = data;
  return `${drummerName} uses ${setup.summary}.`;
}

// SEO meta for the page. Mutates document head; no-op on server/no data.
export function updateCymbalSetupMeta(data) {
  if (typeof document === 'undefined' || !data) return;
  const title = generateCymbalSetupTitle(data);
  const description = generateCymbalSetupDescription(data);
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

function pieceName(piece) {
  return [piece.series, piece.model].filter(Boolean).join(' ');
}

// ItemList + BreadcrumbList + FAQPage JSON-LD. Returns a plain array safe to
// JSON.stringify; never throws.
export function generateCymbalSetupSchema(data) {
  if (!data) return null;
  const { setup, drummerName, canonicalUrl } = data;

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${drummerName}'s Cymbal Setup`,
    description: `Every cymbal in ${drummerName}'s setup — type, size, series, and model.`,
    numberOfItems: setup.pieces.length,
    itemListElement: setup.pieces.map((piece, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      item: {
        '@type': 'Product',
        name: `${piece.sizeIn}" ${pieceName(piece)}`,
        category: piece.type,
        brand: setup.brands[0] ? { '@type': 'Brand', name: setup.brands[0] } : undefined,
      },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Cymbals', item: `${BASE_URL}/cymbals` },
      { '@type': 'ListItem', position: 2, name: `${drummerName}'s Cymbal Setup`, item: canonicalUrl },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What cymbals does ${drummerName} use?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: generateCymbalSetupAnswer(data),
        },
      },
    ],
  };

  return [itemListSchema, breadcrumbSchema, faqSchema];
}
