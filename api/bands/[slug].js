// Vercel Serverless Function - Get band by slug
// Issue #348: Band detail page

import { getBandBySlug, getAllBands } from '../../packages/frontend/data/bands.js';
import { genres } from '../genres/index.js';

/**
 * Get genre details with links
 * @param {string[]} bandGenres - Array of genre names
 * @returns {object[]} Array of genre objects with id and name
 */
function getGenreDetails(bandGenres) {
  return bandGenres.map(genreName => {
    // Convert genre name to slug (e.g., "Thrash Metal" -> "thrash-metal")
    const genreSlug = genreName.toLowerCase().replace(/\s+/g, '-');
    const genreData = genres.find(g => g.id === genreSlug);
    
    return {
      id: genreSlug,
      name: genreName,
      icon: genreData?.icon || '🎸',
    };
  });
}

/**
 * Get related bands based on shared genres
 * @param {object} band - The current band
 * @param {number} limit - Maximum number of related bands to return
 * @returns {object[]} Array of related band summaries
 */
function getRelatedBands(band, limit = 4) {
  const allBands = getAllBands();
  
  return allBands
    .filter(b => b.slug !== band.slug)
    .map(b => {
      // Calculate genre overlap
      const sharedGenres = b.genres.filter(g => 
        band.genres.some(bg => bg.toLowerCase() === g.toLowerCase())
      );
      return {
        ...b,
        sharedGenreCount: sharedGenres.length,
        sharedGenres,
      };
    })
    .filter(b => b.sharedGenreCount > 0)
    .sort((a, b) => b.sharedGenreCount - a.sharedGenreCount)
    .slice(0, limit)
    .map(b => ({
      id: b.id,
      name: b.name,
      slug: b.slug,
      image: b.image,
      genres: b.genres,
      sharedGenres: b.sharedGenres,
    }));
}

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { slug } = req.query;

  if (!slug) {
    return res.status(400).json({ error: 'Band slug is required' });
  }

  const band = getBandBySlug(slug);

  if (!band) {
    return res.status(404).json({ error: 'Band not found' });
  }

  // Build full band detail response
  const bandDetail = {
    id: band.id,
    name: band.name,
    slug: band.slug,
    formed: band.formed,
    origin: band.country,
    status: band.currentDrummer ? 'active' : 'disbanded',
    image: band.image,
    description: band.description,
    
    // Genres with links
    genres: getGenreDetails(band.genres),
    
    // Drummer history
    drummerHistory: band.drummerHistory.map((drummer, index) => ({
      name: drummer,
      slug: drummer.toLowerCase().replace(/\s+/g, '-'),
      isCurrent: drummer === band.currentDrummer,
      order: index + 1,
    })),
    currentDrummer: band.currentDrummer ? {
      name: band.currentDrummer,
      slug: band.currentDrummer.toLowerCase().replace(/\s+/g, '-'),
    } : null,
    
    // Related bands
    relatedBands: getRelatedBands(band),
    
    // SEO meta
    meta: {
      title: `${band.name} - Drummer History & Gear | MetalForge`,
      description: `${band.description} Explore ${band.name}'s drummer history${band.currentDrummer ? `, currently featuring ${band.currentDrummer}` : ''}.`,
      keywords: [
        band.name.toLowerCase(),
        ...band.genres.map(g => g.toLowerCase()),
        'metal band',
        'drummer history',
        band.currentDrummer?.toLowerCase(),
      ].filter(Boolean),
    },
  };

  res.status(200).json(bandDetail);
}
