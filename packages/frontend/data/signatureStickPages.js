// Signature Stick Pages Data Module — Issue #4138 (phase 3/4 of epic #4135)
//
// Provides URL detection, page-ready content, and schema generation for the
// /drumsticks/signature/<drummer> pages that target "what sticks does <drummer>
// use". Data layer lives in data/drumsticks.js (DRUMMER_STICKS); this module
// turns a drummer's mapped stick into page content. Only drummers with a
// confirmed mapping get a page — callers should gate rendering on
// getSticksForDrummer(slug) returning a stick (see SignatureStickPage.jsx).

import { getSticksForDrummer } from './drumsticks.js';

const BASE_URL = 'https://metalforge.io';
export const SIGNATURE_STICK_BASE_PATH = '/drumsticks/signature';

export function isSignatureStickPage() {
  return typeof window !== 'undefined' &&
    /^\/drumsticks\/signature\/[a-z0-9-]+\/?$/i.test(window.location.pathname);
}

export function getSignatureStickSlugFromURL() {
  if (typeof window === 'undefined') return null;
  const match = window.location.pathname.match(/^\/drumsticks\/signature\/([a-z0-9-]+)\/?$/i);
  return match ? match[1].toLowerCase() : null;
}

// Builds the page-ready record for a drummer, or null if there's no confirmed
// stick mapping — the caller must treat null as "render nothing" (no thin page).
export function getSignatureStickPageData(drummerSlug, drummerName) {
  if (!drummerSlug || !drummerName) return null;
  const stick = getSticksForDrummer(drummerSlug)[0];
  if (!stick) return null;
  const url = `${SIGNATURE_STICK_BASE_PATH}/${drummerSlug}`;
  return {
    drummerSlug,
    drummerName,
    stick,
    url,
    canonicalUrl: `${BASE_URL}${url}`,
    drummerUrl: `/drummer/${drummerSlug}`,
    hubUrl: '/drumsticks',
  };
}

export function generateSignatureStickTitle(data) {
  return `What Drumsticks Does ${data.drummerName} Use? ${data.stick.brand} ${data.stick.model} | MetalForge`;
}

export function generateSignatureStickDescription(data) {
  const { stick, drummerName } = data;
  return `${drummerName} plays the ${stick.brand} ${stick.model} — ${stick.material}, ${stick.size} ` +
    `(${stick.diameterIn}" dia. x ${stick.lengthIn}" long), ${stick.tip.toLowerCase()} tip. Full specs, source, and where it's used.`;
}

// SEO meta for the page. Mutates document head; no-op on server/no data.
export function updateSignatureStickMeta(data) {
  if (typeof document === 'undefined' || !data) return;
  const title = generateSignatureStickTitle(data);
  const description = generateSignatureStickDescription(data);
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

// Product + BreadcrumbList JSON-LD. Returns a plain array safe to JSON.stringify;
// never throws. Offers are only included once retailerUrls is populated.
export function generateSignatureStickSchema(data) {
  if (!data) return null;
  const { stick, drummerName, canonicalUrl } = data;

  const offerEntries = stick.retailerUrls ? Object.entries(stick.retailerUrls).filter(([, url]) => url) : [];

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${stick.brand} ${stick.model}`,
    brand: { '@type': 'Brand', name: stick.brand },
    category: 'Drumsticks',
    material: stick.material,
    description: `${stick.brand} ${stick.model} drumsticks — ${stick.material}, ${stick.size}, ${stick.tip} tip. Signature model played by ${drummerName}.`,
    url: canonicalUrl,
    ...(offerEntries.length > 0 ? {
      offers: {
        '@type': 'AggregateOffer',
        availability: 'https://schema.org/InStock',
        offerCount: offerEntries.length,
        offers: offerEntries.map(([retailer, url]) => ({
          '@type': 'Offer',
          url,
          seller: { '@type': 'Organization', name: retailer },
        })),
      },
    } : {}),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Drumsticks', item: `${BASE_URL}/drumsticks` },
      { '@type': 'ListItem', position: 2, name: `${drummerName}'s Sticks`, item: canonicalUrl },
    ],
  };

  return [productSchema, breadcrumbSchema];
}
