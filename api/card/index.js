// Vercel Serverless Function - List all available Gear Cards
// Issue #747: Gear Cards Gallery
// Issue #764: Enhanced with proper API URLs and download support

export default function handler(req, res) {
  const baseUrl = process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : 'https://metalforge.io';

  // Helper to generate card URLs for a drummer
  const getCardUrls = (slug) => ({
    // Instagram format (1080x1080)
    instagram: `${baseUrl}/api/card/${slug}`,
    instagramDownload: `${baseUrl}/api/card/${slug}?download=true`,
    // Twitter format (1200x675)
    twitter: `${baseUrl}/api/card/${slug}?format=twitter`,
    twitterDownload: `${baseUrl}/api/card/${slug}?format=twitter&download=true`,
    // Card types
    stats: `${baseUrl}/api/card/${slug}?type=stats`,
    statsTwitter: `${baseUrl}/api/card/${slug}?type=stats&format=twitter`,
    spotlight: `${baseUrl}/api/card/${slug}?type=spotlight`,
    spotlightTwitter: `${baseUrl}/api/card/${slug}?type=spotlight&format=twitter`,
  });

  // Drummer data for gear cards
  const drummerData = [
    { slug: 'lars-ulrich', name: 'Lars Ulrich', band: 'Metallica', genre: 'Thrash Metal', country: 'Denmark', totalPieces: 42, totalCost: 27450 },
    { slug: 'joey-jordison', name: 'Joey Jordison', band: 'Slipknot', genre: 'Nu Metal', country: 'USA', totalPieces: 38, totalCost: 24800 },
    { slug: 'gene-hoglan', name: 'Gene Hoglan', band: 'Testament', genre: 'Death/Thrash Metal', country: 'USA', totalPieces: 45, totalCost: 28200 },
    { slug: 'dave-lombardo', name: 'Dave Lombardo', band: 'Slayer', genre: 'Thrash Metal', country: 'USA', totalPieces: 40, totalCost: 26500 },
    { slug: 'tomas-haake', name: 'Tomas Haake', band: 'Meshuggah', genre: 'Progressive Metal', country: 'Sweden', totalPieces: 35, totalCost: 32500 },
    { slug: 'danny-carey', name: 'Danny Carey', band: 'Tool', genre: 'Progressive Metal', country: 'USA', totalPieces: 48, totalCost: 45000 },
    { slug: 'chris-adler', name: 'Chris Adler', band: 'Lamb of God', genre: 'Groove Metal', country: 'USA', totalPieces: 32, totalCost: 18500 },
    { slug: 'george-kollias', name: 'George Kollias', band: 'Nile', genre: 'Death Metal', country: 'Greece', totalPieces: 36, totalCost: 22800 },
    { slug: 'mike-portnoy', name: 'Mike Portnoy', band: 'Dream Theater', genre: 'Progressive Metal', country: 'USA', totalPieces: 55, totalCost: 38000 },
    { slug: 'vinnie-paul', name: 'Vinnie Paul', band: 'Pantera', genre: 'Groove Metal', country: 'USA', totalPieces: 44, totalCost: 28500 },
    { slug: 'charlie-benante', name: 'Charlie Benante', band: 'Anthrax', genre: 'Thrash Metal', country: 'USA', totalPieces: 38, totalCost: 25800 },
    { slug: 'igor-cavalera', name: 'Igor Cavalera', band: 'Sepultura', genre: 'Thrash/Groove Metal', country: 'Brazil', totalPieces: 28, totalCost: 18000 },
    { slug: 'nicko-mcbrain', name: 'Nicko McBrain', band: 'Iron Maiden', genre: 'Heavy Metal', country: 'UK', totalPieces: 42, totalCost: 35000 },
    { slug: 'abe-cunningham', name: 'Abe Cunningham', band: 'Deftones', genre: 'Alternative Metal', country: 'USA', totalPieces: 30, totalCost: 24000 },
    { slug: 'brann-dailor', name: 'Brann Dailor', band: 'Mastodon', genre: 'Progressive Metal', country: 'USA', totalPieces: 34, totalCost: 28000 },
    { slug: 'mario-duplantier', name: 'Mario Duplantier', band: 'Gojira', genre: 'Progressive Death Metal', country: 'France', totalPieces: 32, totalCost: 19500 },
    { slug: 'eloy-casagrande', name: 'Eloy Casagrande', band: 'Sepultura/Slipknot', genre: 'Thrash/Nu Metal', country: 'Brazil', totalPieces: 38, totalCost: 26500 },
    { slug: 'inferno', name: 'Inferno', band: 'Behemoth', genre: 'Black/Death Metal', country: 'Poland', totalPieces: 40, totalCost: 28000 },
    { slug: 'flo-mounier', name: 'Flo Mounier', band: 'Cryptopsy', genre: 'Technical Death Metal', country: 'Canada', totalPieces: 35, totalCost: 22000 },
    { slug: 'hellhammer', name: 'Hellhammer', band: 'Mayhem', genre: 'Black Metal', country: 'Norway', totalPieces: 36, totalCost: 21500 },
    { slug: 'pete-sandoval', name: 'Pete Sandoval', band: 'Morbid Angel', genre: 'Death Metal', country: 'USA', totalPieces: 38, totalCost: 24000 },
  ];

  // Generate full card data with URLs
  const cards = drummerData.map(d => ({
    slug: d.slug,
    name: d.name,
    band: d.band,
    genre: d.genre,
    country: d.country,
    stats: { 
      totalPieces: d.totalPieces, 
      totalCost: d.totalCost 
    },
    cardUrls: getCardUrls(d.slug),
    profileUrl: `${baseUrl}/drummer/${d.slug}`,
  }));

  // Set caching headers
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  
  res.status(200).json({
    total: cards.length,
    cards,
    formats: {
      instagram: { 
        dimensions: '1080x1080', 
        description: 'Square format for Instagram feed posts' 
      },
      twitter: { 
        dimensions: '1200x675', 
        description: 'Landscape format for Twitter/X cards' 
      },
    },
    types: {
      full: 'Complete gear list with drummer info - best for social sharing',
      stats: 'Key statistics (pieces count, total cost) - great for quick sharing',
      spotlight: 'Focus on signature gear - ideal for brand highlights',
    },
    usage: {
      download: 'Add ?download=true to any card URL to trigger a file download',
      format: 'Add ?format=twitter for Twitter-optimized dimensions (default: instagram)',
      type: 'Add ?type=stats or ?type=spotlight for different card styles (default: full)',
    },
    apiEndpoint: `${baseUrl}/api/card/[drummer-slug]`,
    galleryUrl: `${baseUrl}/cards`,
  });
}
