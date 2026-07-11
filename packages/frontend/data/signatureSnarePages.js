// Signature Snare Pages Data Module — Issue #4311 (phase 3 of epic #4308)
//
// Provides URL detection, page-ready content, and schema generation for the
// /snares/signature/<drummer> pages that target "what snare does <drummer>
// use" / "<model>" queries (e.g. "lars ulrich snare", "LU1465"). Data layer
// lives in data/snares.js (SNARES/getSnareForDrummer); this module turns a
// drummer's signature snare into page content. Only drummers whose record
// has isSignature: true get a page — callers should gate rendering on
// getSignatureSnarePageData(slug, name) returning non-null (see
// SignatureSnarePage.jsx). No thin pages for stock (non-signature) snares.

import { getSnareForDrummer } from './snares';

const BASE_URL = 'https://metalforge.io';
export const SIGNATURE_SNARE_BASE_PATH = '/snares/signature';

export function isSignatureSnarePage() {
  return typeof window !== 'undefined' &&
    /^\/snares\/signature\/[a-z0-9-]+\/?$/i.test(window.location.pathname);
}

export function getSignatureSnareSlugFromURL() {
  if (typeof window === 'undefined') return null;
  const match = window.location.pathname.match(/^\/snares\/signature\/([a-z0-9-]+)\/?$/i);
  return match ? match[1].toLowerCase() : null;
}

// Builds the page-ready record for a drummer, or null if there's no verified
// signature snare — the caller must treat null as "render nothing" (no thin page).
export function getSignatureSnarePageData(drummerSlug, drummerName) {
  if (!drummerSlug || !drummerName) return null;
  const snare = getSnareForDrummer(drummerSlug);
  if (!snare || !snare.isSignature) return null;
  const url = `${SIGNATURE_SNARE_BASE_PATH}/${drummerSlug}`;
  return {
    drummerSlug,
    drummerName,
    snare,
    url,
    canonicalUrl: `${BASE_URL}${url}`,
    drummerUrl: `/drummer/${drummerSlug}`,
    hubUrl: '/snares',
  };
}

export function generateSignatureSnareTitle(data) {
  const { snare, drummerName } = data;
  return `What Snare Does ${drummerName} Use? ${snare.brand} ${snare.model} | MetalForge`;
}

function sizeText(snare) {
  return `${snare.sizeIn}x${snare.depthIn}"`;
}

// The direct-answer sentence FAQ/LLM-citation formats favor: a single
// self-contained paragraph answering "What snare does X use?".
export function generateSignatureSnareAnswer(data) {
  const { snare, drummerName } = data;
  const shell = snare.shellMaterial ? `, ${snare.shellMaterial} shell` : '';
  return `${drummerName} plays the ${snare.brand} ${snare.model}, ${sizeText(snare)}${shell}.`;
}

export function generateSignatureSnareDescription(data) {
  const { snare, drummerName } = data;
  const shell = snare.shellMaterial ? `, ${snare.shellMaterial} shell` : '';
  return `${drummerName} plays the ${snare.brand} ${snare.model} — ${sizeText(snare)}${shell}. Full specs, source, and where it's used.`;
}

// SEO meta for the page. Mutates document head; no-op on server/no data.
export function updateSignatureSnareMeta(data) {
  if (typeof document === 'undefined' || !data) return;
  const title = generateSignatureSnareTitle(data);
  const description = generateSignatureSnareDescription(data);
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
// JSON.stringify; never throws. Offers are only included once retailerUrls
// is populated.
export function generateSignatureSnareSchema(data) {
  if (!data) return null;
  const { snare, drummerName, canonicalUrl } = data;

  const offerEntries = snare.retailerUrls ? Object.entries(snare.retailerUrls).filter(([, url]) => url) : [];

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${snare.brand} ${snare.model}`,
    brand: { '@type': 'Brand', name: snare.brand },
    category: 'Snare Drums',
    ...(snare.shellMaterial ? { material: snare.shellMaterial } : {}),
    description: `${snare.brand} ${snare.model} snare drum — ${sizeText(snare)}${snare.shellMaterial ? `, ${snare.shellMaterial} shell` : ''}. Signature model played by ${drummerName}.`,
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
      { '@type': 'ListItem', position: 1, name: 'Snares', item: `${BASE_URL}/snares` },
      { '@type': 'ListItem', position: 2, name: `${drummerName}'s Signature Snare`, item: canonicalUrl },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What snare does ${drummerName} use?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: generateSignatureSnareAnswer(data),
        },
      },
    ],
  };

  return [productSchema, breadcrumbSchema, faqSchema];
}
