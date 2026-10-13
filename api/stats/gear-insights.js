// Vercel Serverless Function - Gear Statistics & Insights
// Issue #695: Create 'Metal Drummer Gear Statistics' data hub page
// Issue #8996: drums/snare/cymbals are derived from the canonical `gear`
// object in drummers/index.js (CLAUDE.md Rule 1 — one data module per
// domain) instead of a hand-maintained duplicate that had drifted out of
// sync (e.g. John Otto's drums were fabricated as Pearl; he plays OCDP).

import { drummers as canonicalDrummers } from '../drummers/index.js';

const NOT_DOCUMENTED = 'Not publicly documented';

// `kitCost` is an estimated total-rig price with no canonical source
// elsewhere in the codebase, so it stays a standalone lookup keyed by name.
// `id`/`genre` are this stats page's own roster bookkeeping; `id` must match
// the canonical drummer id (consumed by the frontend's onSelectDrummer) —
// Ryan Van Poederooyen was previously mis-numbered 62, which pointed the
// /studies profile link at the wrong drummer (canonical id 36).
const ROSTER = [
  { id: 1, name: 'Lars Ulrich', genre: 'Thrash Metal', kitCost: 8500 },
  { id: 2, name: 'Joey Jordison', genre: 'Nu Metal', kitCost: 9200 },
  { id: 3, name: 'Gene Hoglan', genre: 'Death Metal', kitCost: 7800 },
  { id: 4, name: 'Dave Lombardo', genre: 'Thrash Metal', kitCost: 7500 },
  { id: 5, name: 'Tomas Haake', genre: 'Progressive Metal', kitCost: 12500 },
  { id: 6, name: 'George Kollias', genre: 'Death Metal', kitCost: 8200 },
  { id: 7, name: 'Eloy Casagrande', genre: 'Thrash Metal', kitCost: 9800 },
  { id: 8, name: 'Ray Luzier', genre: 'Nu Metal', kitCost: 8500 },
  { id: 9, name: 'John Otto', genre: 'Nu Metal', kitCost: 7200 },
  { id: 10, name: 'Jay Weinberg', genre: 'Nu Metal', kitCost: 9500 },
  { id: 11, name: 'Vinnie Paul', genre: 'Groove Metal', kitCost: 6800 },
  { id: 12, name: 'Charlie Benante', genre: 'Thrash Metal', kitCost: 7500 },
  { id: 13, name: 'Mike Portnoy', genre: 'Progressive Metal', kitCost: 11500 },
  { id: 14, name: 'Danny Carey', genre: 'Progressive Metal', kitCost: 15000 },
  { id: 15, name: 'Mario Duplantier', genre: 'Progressive Metal', kitCost: 10200 },
  { id: 16, name: 'Brann Dailor', genre: 'Progressive Metal', kitCost: 12800 },
  { id: 17, name: 'Chris Adler', genre: 'Groove Metal', kitCost: 7200 },
  { id: 18, name: 'Matt Halpern', genre: 'Progressive Metal', kitCost: 8500 },
  { id: 19, name: 'Inferno', genre: 'Black Metal', kitCost: 7800 },
  { id: 20, name: 'Hellhammer', genre: 'Black Metal', kitCost: 7000 },
  { id: 21, name: 'Pete Sandoval', genre: 'Death Metal', kitCost: 7500 },
  { id: 22, name: 'Art Cruz', genre: 'Groove Metal', kitCost: 8800 },
  { id: 23, name: 'Arin Ilejay', genre: 'Metalcore', kitCost: 7200 },
  { id: 24, name: 'Navene Koperweis', genre: 'Progressive Metal', kitCost: 11000 },
  { id: 25, name: 'Alex Bent', genre: 'Thrash Metal', kitCost: 8500 },
  { id: 26, name: 'Shannon Larkin', genre: 'Nu Metal', kitCost: 7500 },
  { id: 27, name: 'Raymond Herrera', genre: 'Industrial Metal', kitCost: 7000 },
  { id: 28, name: 'Morgan Ågren', genre: 'Progressive Metal', kitCost: 10500 },
  { id: 29, name: 'Igor Cavalera', genre: 'Thrash Metal', kitCost: 7800 },
  { id: 30, name: 'Bill Ward', genre: 'Doom Metal', kitCost: 6500 },
  { id: 31, name: 'Nick Augusto', genre: 'Thrash Metal', kitCost: 7200 },
  { id: 32, name: 'Matt Greiner', genre: 'Metalcore', kitCost: 9200 },
  { id: 33, name: 'Blake Richardson', genre: 'Progressive Metal', kitCost: 8800 },
  { id: 34, name: 'Ben Koller', genre: 'Metalcore', kitCost: 7500 },
  { id: 35, name: 'Flo Mounier', genre: 'Death Metal', kitCost: 8200 },
  { id: 37, name: 'Jason Bittner', genre: 'Thrash Metal', kitCost: 7000 },
  { id: 38, name: 'Martin Lopez', genre: 'Progressive Metal', kitCost: 10000 },
  { id: 39, name: 'Travis Orbin', genre: 'Progressive Metal', kitCost: 9500 },
  { id: 40, name: 'Chris Turner', genre: 'Progressive Metal', kitCost: 11500 },
  { id: 41, name: 'Nicko McBrain', genre: 'Heavy Metal', kitCost: 11000 },
  { id: 42, name: 'Scott Travis', genre: 'Heavy Metal', kitCost: 7500 },
  { id: 43, name: 'Mikkey Dee', genre: 'Heavy Metal', kitCost: 10500 },
  { id: 44, name: 'Derek Roddy', genre: 'Death Metal', kitCost: 8500 },
  { id: 45, name: 'Dirk Verbeuren', genre: 'Thrash Metal', kitCost: 8200 },
  { id: 46, name: 'Frost', genre: 'Black Metal', kitCost: 7800 },
  { id: 47, name: 'Gavin Harrison', genre: 'Progressive Metal', kitCost: 12000 },
  { id: 48, name: 'Abe Cunningham', genre: 'Nu Metal', kitCost: 10500 },
  { id: 49, name: 'Richard Christy', genre: 'Death Metal', kitCost: 7800 },
  { id: 50, name: 'Aquiles Priester', genre: 'Power Metal', kitCost: 8500 },
  { id: 51, name: 'Paul Mazurkiewicz', genre: 'Death Metal', kitCost: 7200 },
  { id: 52, name: 'Mike Mangini', genre: 'Progressive Metal', kitCost: 11000 },
  { id: 53, name: 'Matt Garstka', genre: 'Progressive Metal', kitCost: 9800 },
  { id: 54, name: 'Daniel Erlandsson', genre: 'Melodic Death Metal', kitCost: 7500 },
  { id: 55, name: 'Jaska Raatikainen', genre: 'Melodic Death Metal', kitCost: 7800 },
  { id: 56, name: 'Hannes Grossmann', genre: 'Technical Death Metal', kitCost: 8500 },
  { id: 57, name: 'Daray', genre: 'Black Metal', kitCost: 7500 },
  { id: 58, name: 'Jocke Wallgren', genre: 'Melodic Death Metal', kitCost: 8800 },
  { id: 59, name: 'Tim Yeung', genre: 'Death Metal', kitCost: 7200 },
  { id: 60, name: 'Kevin Talley', genre: 'Death Metal', kitCost: 7500 },
  { id: 61, name: 'Isaac Lamb', genre: 'Progressive Metal', kitCost: 11000 },
  { id: 36, name: 'Ryan Van Poederooyen', genre: 'Progressive Metal', kitCost: 9200 },
];

const canonicalByName = new Map(canonicalDrummers.map((d) => [d.name, d]));

const drummers = ROSTER.map((entry) => {
  const gear = (canonicalByName.get(entry.name) || {}).gear || {};
  return {
    ...entry,
    drums: gear.drums || NOT_DOCUMENTED,
    snare: gear.snare || NOT_DOCUMENTED,
    cymbals: gear.cymbals || NOT_DOCUMENTED,
  };
});

// Calculate statistics
function calculateStats() {
  const totalDrummers = drummers.length;
  
  // 1. Cymbal brand breakdown
  const cymbalBrands = {};
  drummers.forEach(d => {
    const cymbal = d.cymbals.toLowerCase();
    if (cymbal.includes('zildjian')) cymbalBrands['Zildjian'] = (cymbalBrands['Zildjian'] || 0) + 1;
    else if (cymbal.includes('paiste')) cymbalBrands['Paiste'] = (cymbalBrands['Paiste'] || 0) + 1;
    else if (cymbal.includes('meinl')) cymbalBrands['Meinl'] = (cymbalBrands['Meinl'] || 0) + 1;
    else if (cymbal.includes('sabian')) cymbalBrands['Sabian'] = (cymbalBrands['Sabian'] || 0) + 1;
  });
  
  const cymbalStats = Object.entries(cymbalBrands)
    .map(([brand, count]) => ({
      brand,
      count,
      percentage: Math.round((count / totalDrummers) * 100),
      drummers: drummers.filter(d => d.cymbals.toLowerCase().includes(brand.toLowerCase())).map(d => ({ id: d.id, name: d.name }))
    }))
    .sort((a, b) => b.count - a.count);
  
  // 2. Drum kit brand breakdown
  const drumBrands = {};
  drummers.forEach(d => {
    const drums = d.drums.toLowerCase();
    if (drums.includes('tama')) drumBrands['Tama'] = (drumBrands['Tama'] || 0) + 1;
    else if (drums.includes('pearl')) drumBrands['Pearl'] = (drumBrands['Pearl'] || 0) + 1;
    else if (drums.includes('sonor')) drumBrands['Sonor'] = (drumBrands['Sonor'] || 0) + 1;
    else if (drums.includes('dw') || drums.includes('drum workshop')) drumBrands['DW'] = (drumBrands['DW'] || 0) + 1;
    else if (drums.includes('mapex')) drumBrands['Mapex'] = (drumBrands['Mapex'] || 0) + 1;
    else if (drums.includes('sjc')) drumBrands['SJC'] = (drumBrands['SJC'] || 0) + 1;
    else if (drums.includes('ddrum')) drumBrands['ddrum'] = (drumBrands['ddrum'] || 0) + 1;
    else if (drums.includes('ludwig')) drumBrands['Ludwig'] = (drumBrands['Ludwig'] || 0) + 1;
  });
  
  const drumStats = Object.entries(drumBrands)
    .map(([brand, count]) => ({
      brand,
      count,
      percentage: Math.round((count / totalDrummers) * 100),
      drummers: drummers.filter(d => d.drums.toLowerCase().includes(brand.toLowerCase())).map(d => ({ id: d.id, name: d.name }))
    }))
    .sort((a, b) => b.count - a.count);
  
  // 3. Average setup cost by genre
  const genreCosts = {};
  drummers.forEach(d => {
    // Normalize genre names
    let genre = d.genre;
    if (genre.includes('Death') || genre.includes('Technical Death') || genre.includes('Melodic Death')) genre = 'Death Metal';
    if (genre.includes('Thrash')) genre = 'Thrash Metal';
    if (genre.includes('Progressive')) genre = 'Progressive Metal';
    if (genre.includes('Nu Metal')) genre = 'Nu Metal';
    if (genre.includes('Black')) genre = 'Black Metal';
    if (genre.includes('Groove')) genre = 'Groove Metal';
    if (genre.includes('Metalcore')) genre = 'Metalcore';
    if (genre.includes('Heavy Metal') || genre.includes('Doom') || genre.includes('Power')) genre = 'Heavy Metal';
    
    if (!genreCosts[genre]) {
      genreCosts[genre] = { total: 0, count: 0 };
    }
    genreCosts[genre].total += d.kitCost;
    genreCosts[genre].count += 1;
  });
  
  const genreStats = Object.entries(genreCosts)
    .map(([genre, data]) => ({
      genre,
      averageCost: Math.round(data.total / data.count),
      sampleSize: data.count
    }))
    .sort((a, b) => b.averageCost - a.averageCost);
  
  // 4. Most common snare drums (top 10)
  const snares = {};
  drummers.forEach(d => {
    // Normalize snare name
    let snare = d.snare;
    snares[snare] = (snares[snare] || 0) + 1;
  });
  
  const snareStats = Object.entries(snares)
    .map(([snare, count]) => ({
      snare,
      count,
      drummers: drummers.filter(d => d.snare === snare).map(d => ({ id: d.id, name: d.name }))
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
  
  // 5. Top 10 most expensive setups
  const expensiveSetups = [...drummers]
    .sort((a, b) => b.kitCost - a.kitCost)
    .slice(0, 10)
    .map(d => ({
      id: d.id,
      name: d.name,
      genre: d.genre,
      drums: d.drums,
      cymbals: d.cymbals,
      kitCost: d.kitCost
    }));
  
  // 6. Overall stats
  const overallStats = {
    totalDrummers,
    averageKitCost: Math.round(drummers.reduce((acc, d) => acc + d.kitCost, 0) / totalDrummers),
    mostExpensiveKit: expensiveSetups[0],
    leastExpensiveKit: [...drummers].sort((a, b) => a.kitCost - b.kitCost)[0],
    lastUpdated: new Date().toISOString().split('T')[0]
  };
  
  return {
    cymbalStats,
    drumStats,
    genreStats,
    snareStats,
    expensiveSetups,
    overallStats
  };
}

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Cache for 1 hour
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.setHeader('Content-Type', 'application/json');
  
  try {
    const stats = calculateStats();
    return res.status(200).json(stats);
  } catch (error) {
    console.error('Error calculating stats:', error);
    return res.status(500).json({ error: 'Failed to calculate statistics' });
  }
}
