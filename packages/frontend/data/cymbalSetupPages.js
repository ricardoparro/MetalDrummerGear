// Cymbal Setup Pages Data Module — Issue #4306 (phase 3/4 of epic #4303)
//
// Provides URL detection, page-ready content, and schema generation for the
// /cymbals/setups/<drummer> pages that target "what cymbals does <drummer>
// use". Data layer lives in data/cymbalSetups.js (CYMBAL_SETUPS); this module
// turns a drummer's verified cymbal setup into page content. Only drummers
// with a confirmed setup get a page — callers should gate rendering on
// getSetupForDrummer(slug) returning a setup (see CymbalSetupPage.jsx).

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

function pieceLabel(piece) {
  return `${piece.sizeIn}" ${piece.series ? `${piece.series} ` : ''}${piece.model}`;
}

// Single-paragraph, direct-answer text for "What cymbals does <drummer> use?"
// — shared verbatim between the visible FAQ block on the page and the
// FAQPage schema so the two never drift. This is the format LLMs cite.
export function generateCymbalSetupDirectAnswer(data) {
  const { setup, drummerName } = data;
  const brandPart = setup.brands.length > 0 ? setup.brands.join(' & ') : 'a';
  if (setup.pieces.length === 0) {
    return `${drummerName} plays ${brandPart} cymbals: ${setup.summary}.`;
  }
  const pieceList = setup.pieces.map(pieceLabel).join(', ');
  return `${drummerName} plays ${brandPart} cymbals: ${pieceList}.`;
}

export function generateCymbalSetupTitle(data) {
  return `What Cymbals Does ${data.drummerName} Use? Full Setup | MetalForge`;
}

export function generateCymbalSetupDescription(data) {
  const { setup, drummerName } = data;
  return `${drummerName}'s complete cymbal setup — ${setup.summary}. Per-piece breakdown, sizes, and series.`;
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

// ItemList (pieces) + BreadcrumbList + FAQPage JSON-LD. Returns a plain array
// safe to JSON.stringify; never throws.
export function generateCymbalSetupSchema(data) {
  if (!data) return null;
  const { setup, drummerName, canonicalUrl } = data;

  const schemas = [];

  if (setup.pieces.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: `${drummerName}'s cymbal setup`,
      itemListElement: setup.pieces.map((piece, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'Product',
          name: pieceLabel(piece),
          brand: setup.brands[0] ? { '@type': 'Brand', name: setup.brands[0] } : undefined,
          category: `Cymbals - ${piece.type}`,
        },
      })),
    });
  }

  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Cymbals', item: `${BASE_URL}/cymbals` },
      { '@type': 'ListItem', position: 2, name: `${drummerName}'s Cymbals`, item: canonicalUrl },
    ],
  });

  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What cymbals does ${drummerName} use?`,
        acceptedAnswer: { '@type': 'Answer', text: generateCymbalSetupDirectAnswer(data) },
      },
    ],
  });

  return schemas;
}
