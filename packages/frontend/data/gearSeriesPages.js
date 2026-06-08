// Gear Series Pages Data Module
// Issue #996 (split 2/4 of #871): /gear/<brand>/<series>/drummers-using
//
// Provides URL detection, data assembly, and schema generation for the
// "drummers using <brand> <series>" SEO landing pages. Data layer (#995)
// lives in data/gearIndex.js; this module turns it into page-ready content.

import { GEAR_INDEX } from './gearIndex';
import { GEAR_PRICES, EUR_TO_USD, formatPrice } from '../gearPrices';
import { getThomannLink, getSweetwaterLink } from '../affiliateLinks';

const BASE_URL = 'https://metalforge.io';

// Lowercase, hyphen-separated slug. Drops punctuation so commas/quotes in
// series strings don't leak into URLs.
export function slugifySeries(str) {
  return String(str)
    .toLowerCase()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Build a deterministic lookup: brandSlug -> seriesSlug -> { brand, series, drummers }.
// Built once (module-level) since GEAR_INDEX is a static generated file.
let _slugMap = null;
function getSlugMap() {
  if (_slugMap) return _slugMap;
  const map = {};
  for (const [brand, seriesObj] of Object.entries(GEAR_INDEX)) {
    const brandSlug = slugifySeries(brand);
    if (!map[brandSlug]) map[brandSlug] = {};
    for (const [series, drummers] of Object.entries(seriesObj)) {
      // Only series with ≥2 drummers earn a page (generator already filters,
      // but we guard here so a hand-edit can't ship a thin page).
      if (!Array.isArray(drummers) || drummers.length < 2) continue;
      const seriesSlug = slugifySeries(series);
      // First series wins a given slug to keep URLs stable/unique.
      if (!map[brandSlug][seriesSlug]) {
        map[brandSlug][seriesSlug] = { brand, series, drummers };
      }
    }
  }
  _slugMap = map;
  return map;
}

const SERIES_PAGE_RE = /^\/gear\/([a-z0-9-]+)\/([a-z0-9-]+)\/drummers-using\/?$/i;

// Is the current URL a gear/series page?
export function isGearSeriesPage() {
  if (typeof window === 'undefined') return false;
  const match = window.location.pathname.match(SERIES_PAGE_RE);
  if (!match) return false;
  const brands = getSlugMap();
  return Boolean(brands[match[1].toLowerCase()]?.[match[2].toLowerCase()]);
}

// Extract { brandSlug, seriesSlug } from the URL (no validation against index).
export function getGearSeriesFromURL() {
  if (typeof window === 'undefined') return null;
  const match = window.location.pathname.match(SERIES_PAGE_RE);
  if (!match) return null;
  return { brandSlug: match[1].toLowerCase(), seriesSlug: match[2].toLowerCase() };
}

// Best-effort price for a series across all gear categories. Scans GEAR_PRICES
// for a key contained in "<brand> <series>"; falls back to a category default
// inferred from keywords. Returns { eur, category } or null.
function estimateSeriesPrice(brand, series) {
  const haystack = `${brand} ${series}`.toLowerCase();
  for (const [category, prices] of Object.entries(GEAR_PRICES)) {
    for (const [key, price] of Object.entries(prices)) {
      if (haystack.includes(key.toLowerCase())) {
        return { eur: price, category };
      }
    }
  }
  // Keyword-based category guess for unmatched series.
  const defaults = { drums: 3000, snare: 500, cymbals: 2000, hardware: 800, sticks: 15 };
  let category = 'drums';
  if (/snare|s\.l\.p/.test(haystack)) category = 'snare';
  else if (/pedal|throne|stand|hardware|rack/.test(haystack)) category = 'hardware';
  else if (/cymbal|hi-?hat|ride|crash|china/.test(haystack)) category = 'cymbals';
  else if (/stick/.test(haystack)) category = 'sticks';
  return { eur: defaults[category], category };
}

// Assemble full page data. `drummers` is the app's drummer list (for band/image
// enrichment); pass [] if unavailable and the page degrades gracefully.
export function getGearSeriesData(brandSlug, seriesSlug, drummers = []) {
  const entry = getSlugMap()[brandSlug]?.[seriesSlug];
  if (!entry) return null;

  const { brand, series } = entry;
  const drummerBySlug = {};
  const drummerById = {};
  for (const d of drummers || []) {
    if (d?.slug) drummerBySlug[d.slug] = d;
    if (d?.id != null) drummerById[d.id] = d;
  }

  const drummerList = entry.drummers.map((d) => {
    const full = drummerBySlug[d.slug] || drummerById[d.id] || {};
    return {
      id: d.id,
      name: d.name,
      slug: d.slug,
      configString: d.configString,
      band: full.band || '',
      image: full.image || '',
    };
  });

  const price = estimateSeriesPrice(brand, series);
  const priceLabel = price ? formatPrice(price.eur) : 'Varies';
  const priceUsd = price ? formatPrice(Math.round(price.eur * EUR_TO_USD), 'USD') : null;

  // Related series: other series under the same brand (≥2 drummers).
  const relatedSeries = [];
  const brandSeries = getSlugMap()[brandSlug] || {};
  for (const [otherSlug, otherEntry] of Object.entries(brandSeries)) {
    if (otherSlug === seriesSlug) continue;
    relatedSeries.push({
      brandSlug,
      seriesSlug: otherSlug,
      brand: otherEntry.brand,
      series: otherEntry.series,
      drummerCount: otherEntry.drummers.length,
      url: `/gear/${brandSlug}/${otherSlug}/drummers-using`,
    });
  }
  relatedSeries.sort((a, b) => b.drummerCount - a.drummerCount);

  const affiliate = {
    thomann: getThomannLink(`${brand} ${series}`, price?.category || 'drums'),
    sweetwater: getSweetwaterLink(`${brand} ${series}`, price?.category || 'drums'),
  };

  const signatureDrummer = drummerList[0]?.name || '';
  const url = `${BASE_URL}/gear/${brandSlug}/${seriesSlug}/drummers-using`;

  const faq = buildFAQ({ brand, series, drummerList, priceLabel, relatedSeries });

  const data = {
    brand,
    series,
    brandSlug,
    seriesSlug,
    url,
    priceLabel,
    priceUsd,
    drummerCount: drummerList.length,
    signatureDrummer,
    drummers: drummerList,
    relatedSeries,
    affiliate,
    faq,
  };
  data.schema = generateGearSeriesSchema(data);
  return data;
}

function buildFAQ({ brand, series, drummerList, priceLabel, relatedSeries }) {
  const names = drummerList.map((d) => d.name);
  const proList = names.length > 2
    ? `${names.slice(0, -1).join(', ')}, and ${names[names.length - 1]}`
    : names.join(' and ');
  const faq = [
    {
      question: `Which pro drummers use the ${brand} ${series}?`,
      answer: `${drummerList.length} metal drummers in our database play the ${brand} ${series}, including ${proList}. Each profile lists their exact configuration and full kit.`,
    },
    {
      question: `How much does the ${brand} ${series} cost?`,
      answer: `The ${brand} ${series} is estimated at around ${priceLabel} (street price). Actual pricing varies by retailer, finish, and configuration — check Thomann (EU) or Sweetwater (US) for current deals.`,
    },
    {
      question: `Is the ${brand} ${series} good for metal drumming?`,
      answer: `Yes — it is a proven choice in the metal scene, used by ${drummerList.length} of the drummers we track. ${names[0]} is among the signature players relying on this ${brand} gear for high-intensity playing.`,
    },
  ];
  if (relatedSeries.length > 0) {
    faq.push({
      question: `What other ${brand} series do pros use?`,
      answer: `Beyond the ${series}, ${brand} players in our database also use the ${relatedSeries
        .slice(0, 3)
        .map((r) => r.series)
        .join(', ')}. See each series page for the drummers behind it.`,
    });
  }
  return faq;
}

// FAQPage + Product JSON-LD (with affiliate offer). Returns a plain object
// safe to JSON.stringify; never throws.
export function generateGearSeriesSchema(data) {
  if (!data) return null;
  const { brand, series, url, priceLabel, drummers, affiliate, faq } = data;

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${brand} ${series}`,
    brand: { '@type': 'Brand', name: brand },
    category: 'Drums & Percussion',
    description: `${brand} ${series} — used by ${drummers.length} professional metal drummers. ${priceLabel} street price.`,
    url,
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'EUR',
      lowPrice: String((priceLabel.match(/[\d,]+/) || ['0'])[0].replace(/,/g, '')),
      availability: 'https://schema.org/InStock',
      offerCount: 2,
      offers: [
        { '@type': 'Offer', url: affiliate.thomann, seller: { '@type': 'Organization', name: 'Thomann' } },
        { '@type': 'Offer', url: affiliate.sweetwater, seller: { '@type': 'Organization', name: 'Sweetwater' } },
      ],
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: (faq || []).map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };

  return [productSchema, faqSchema];
}

// SEO meta for the page. Mutates document head; no-op on server.
export function updateGearSeriesMeta(data) {
  if (typeof document === 'undefined' || !data) return;
  const title = `${data.drummerCount} Drummers Who Use the ${data.brand} ${data.series} | MetalForge`;
  const description = `See the ${data.drummerCount} pro metal drummers who play the ${data.brand} ${data.series}, their exact configs, prices, and where to buy. Signature player: ${data.signatureDrummer}.`;
  document.title = title;
  setMeta('description', description);
  setMeta('og:title', title, 'property');
  setMeta('og:description', description, 'property');
  setCanonical(data.url);
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

// All gear/series page paths — consumed by #997 (sitemap). Each brand/series
// with ≥2 drummers yields one entry.
export function getGearSeriesUrls() {
  const urls = [];
  const map = getSlugMap();
  for (const [brandSlug, seriesObj] of Object.entries(map)) {
    for (const seriesSlug of Object.keys(seriesObj)) {
      urls.push(`/gear/${brandSlug}/${seriesSlug}/drummers-using`);
    }
  }
  return urls;
}
