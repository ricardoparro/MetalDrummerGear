// Vercel Serverless Function - Get genre details by slug

import { genres, getGenreBySlug, getRelatedGenres } from './index.js';
import { drummers } from '../drummers/index.js';

// Normalize genre names for matching
function normalizeGenre(genre) {
  return genre
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Check if a drummer's genre matches the requested genre
function drummerMatchesGenre(drummerGenre, genreId) {
  const genreNames = drummerGenre.split('/').map(g => g.trim());
  return genreNames.some(name => {
    const normalized = normalizeGenre(name);
    // Handle variations and aliases
    const aliases = {
      'thrash-metal': ['thrash-metal', 'thrash'],
      'death-metal': ['death-metal', 'death', 'technical-death-metal', 'progressive-death-metal', 'melodic-death-metal', 'brutal-death-metal'],
      'black-metal': ['black-metal', 'black', 'black-death-metal'],
      'progressive-metal': ['progressive-metal', 'progressive', 'prog-metal', 'prog'],
      'nu-metal': ['nu-metal', 'nu', 'nü-metal', 'rap-metal'],
      'groove-metal': ['groove-metal', 'groove'],
      'metalcore': ['metalcore', 'christian-metal', 'progressive-metalcore'],
      'djent': ['djent'],
      'heavy-metal': ['heavy-metal', 'heavy', 'nwobhm', 'hard-rock'],
      'power-metal': ['power-metal', 'power'],
      'technical-death-metal': ['technical-death-metal', 'tech-death'],
      'melodic-death-metal': ['melodic-death-metal', 'melodeath', 'viking-metal'],
      'sludge-metal': ['sludge-metal', 'sludge', 'progressive-sludge-metal'],
      'industrial-metal': ['industrial-metal', 'industrial'],
      'hardcore-punk': ['hardcore', 'hardcore-punk', 'crossover', 'thrash-crossover'],
      'grindcore': ['grindcore', 'brutal-death-metal'],
      'doom-metal': ['doom-metal', 'doom', 'stoner-metal']
    };
    
    const targetAliases = aliases[genreId] || [genreId];
    return targetAliases.some(alias => normalized.includes(alias) || alias.includes(normalized));
  });
}

// Get drummers for a specific genre
function getDrummersForGenre(genreId) {
  return drummers.filter(d => drummerMatchesGenre(d.genre, genreId));
}

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { id } = req.query;
  
  if (!id) {
    return res.status(400).json({ error: 'Genre ID required' });
  }

  const genre = getGenreBySlug(id);
  
  if (!genre) {
    return res.status(404).json({ error: 'Genre not found' });
  }

  // Get drummers for this genre
  const genreDrummers = getDrummersForGenre(id);
  
  // Get related genres with full objects
  const related = getRelatedGenres(id);

  res.status(200).json({
    ...genre,
    drummers: genreDrummers.map(({ id, name, band, genre, country, image }) => ({
      id, name, band, genre, country, image
    })),
    drummerCount: genreDrummers.length,
    relatedGenresData: related.map(g => ({
      id: g.id,
      name: g.name,
      icon: g.icon
    }))
  });
}
