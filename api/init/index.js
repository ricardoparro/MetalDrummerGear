// Vercel Serverless Function - Combined initial data endpoint
// Issue #536: spotlight for LCP | Issue #511: news preview | Issue #494: curated rotation

import { drummers } from '../drummers/index.js';
import { getNewsCache } from '../../packages/backend/src/data/news.js';
import { drummerBirthdays } from '../../packages/frontend/data/birthdays.js';

const FEATURED_ROTATION = [5, 14, 4, 1, 15, 3, 6, 12, 8, 21, 2, 10, 7, 11, 9, 13, 16, 17, 18, 19, 20];

function getWeekNumber() {
  return Math.floor((Date.now() - new Date('2024-01-01').getTime()) / (7 * 24 * 60 * 60 * 1000));
}

function toSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function checkBirthdayToday(bi) {
  if (!bi || !bi.birthMonth || !bi.birthDay) return false;
  const today = new Date();
  return today.getMonth() + 1 === bi.birthMonth && today.getDate() === bi.birthDay;
}

function getCuratedFeaturedDrummer() {
  const spotlightDrummers = drummers.filter(d => d.spotlight);
  for (const drummer of spotlightDrummers) {
    const bi = drummerBirthdays.find(b => b.slug === toSlug(drummer.name) || b.name === drummer.name);
    if (bi && checkBirthdayToday(bi)) {
      return { drummer, reason: `🎂 Happy Birthday ${drummer.name.split(' ')[0]}!`, type: 'birthday', isBirthdayFeature: true };
    }
  }
  const featuredId = FEATURED_ROTATION[getWeekNumber() % FEATURED_ROTATION.length];
  const drummer = drummers.find(d => d.id === featuredId) || spotlightDrummers[0];
  return drummer ? { drummer, reason: "This Week's Featured", type: 'weekly', isBirthdayFeature: false } : null;
}

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const drummersList = drummers.map(({ id, name, band, genre, country, image }) => ({ id, name, band, genre, country, image }));
  const featured = getCuratedFeaturedDrummer();
  const spotlightData = featured?.drummer ? {
    id: featured.drummer.id, name: featured.drummer.name, band: featured.drummer.band,
    image: featured.drummer.image, spotlight: featured.drummer.spotlight,
    featuredReason: featured.reason, isBirthdayFeature: featured.isBirthdayFeature
  } : null;
  const newsCache = getNewsCache();

  res.status(200).json({
    drummers: drummersList, currentSpotlight: spotlightData, spotlightWeek: getWeekNumber(),
    spotlightType: featured?.type || 'weekly', newsPreview: newsCache.items.slice(0, 5),
    newsLastFetch: newsCache.lastFetch, version: '1.3', timestamp: Date.now()
  });
}
