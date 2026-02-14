// Vercel Serverless Function - List all bands
// Issue #347: Bands listing page

import { getAllBands, getUniqueGenres, getUniqueCountries } from '../../packages/frontend/data/bands.js';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { genre, country } = req.query;

  let bands = getAllBands();

  // Filter by genre if provided
  if (genre) {
    bands = bands.filter(b => 
      b.genres.some(g => g.toLowerCase().replace(/\s+/g, '-') === genre.toLowerCase())
    );
  }

  // Filter by country if provided
  if (country) {
    bands = bands.filter(b => b.country.toLowerCase() === country.toLowerCase());
  }

  res.status(200).json({
    bands: bands.map(b => ({
      id: b.id,
      name: b.name,
      slug: b.slug,
      genres: b.genres,
      country: b.country,
      formed: b.formed,
      image: b.image,
      currentDrummer: b.currentDrummer,
    })),
    filters: {
      genres: getUniqueGenres(),
      countries: getUniqueCountries(),
    },
    total: bands.length,
  });
}
