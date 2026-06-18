// Vercel Serverless Function - video-sitemap.xml
// Issue #1402: Dedicated video sitemap for Google Video Pack eligibility.
// Covers lick pages (/drummers/<slug>/licks/<lick-slug>) and drummer profiles
// (/drummer/<slug>) — mirrors the import pattern from api/sitemap.js.

import { SIGNATURE_LICKS } from '../packages/frontend/data/signatureLicks.js';
import { drummers as DRUMMER_GEAR_DATA } from './drummers/index.js';

const BASE_URL = 'https://metalforge.io';
const PUBLICATION_DATE = '2026-06-12';

function generateSlug(name) {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

function xmlEscape(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export default function handler(req, res) {
  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 'public, max-age=86400');

  const entries = [];

  // Lick pages — /drummers/<slug>/licks/<lick-slug>
  for (const lick of Object.values(SIGNATURE_LICKS)) {
    const videoId = lick.video?.youtubeId || lick.tutorial?.youtubeId;
    if (!videoId) continue;
    const band = lick.band ? ` (${lick.band})` : '';
    entries.push({
      pageUrl: `${BASE_URL}/drummers/${lick.drummerSlug}/licks/${lick.slug}`,
      videoId,
      title: `${lick.name} — ${lick.drummerName}${band}`,
      description: lick.seo?.description || lick.description || '',
    });
  }

  // Drummer profile pages — /drummer/<slug>
  for (const drummer of DRUMMER_GEAR_DATA) {
    const videoId = drummer.videos?.[0]?.youtubeId;
    if (!videoId) continue;
    const slug = generateSlug(drummer.name);
    const band = drummer.band ? ` — ${drummer.band}` : '';
    const description = drummer.bio
      ? drummer.bio.substring(0, 500)
      : `${drummer.name} drum kit and gear setup on MetalForge.`;
    entries.push({
      pageUrl: `${BASE_URL}/drummer/${slug}`,
      videoId,
      title: `${drummer.name} Drum Setup${band}`,
      description,
    });
  }

  const xml = `<?xml version='1.0' encoding='UTF-8'?>
<urlset xmlns='http://www.sitemaps.org/schemas/sitemap/0.9'
        xmlns:video='http://www.google.com/schemas/sitemap-video/1.1'>
${entries.map(e => `  <url>
    <loc>${e.pageUrl}</loc>
    <video:video>
      <video:thumbnail_loc>https://img.youtube.com/vi/${e.videoId}/mqdefault.jpg</video:thumbnail_loc>
      <video:title>${xmlEscape(e.title)}</video:title>
      <video:description>${xmlEscape(e.description)}</video:description>
      <video:content_loc>https://www.youtube.com/watch?v=${e.videoId}</video:content_loc>
      <video:publication_date>${PUBLICATION_DATE}</video:publication_date>
    </video:video>
  </url>`).join('\n')}
</urlset>`;

  res.status(200).send(xml);
}
