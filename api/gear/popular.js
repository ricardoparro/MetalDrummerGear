// Vercel Serverless Function - Get most popular gear across all drummers
// Issue #640: Most Popular Gear section for homepage

// Cache for computed popular gear (regenerated on cold start)
let cachedPopularGear = null;
let cacheTimestamp = 0;
const CACHE_TTL = 3600000; // 1 hour in milliseconds

// Helper to normalize gear names for aggregation
function normalizeGearName(name) {
  if (!name) return null;
  // Remove specific size/specs in parentheses for aggregation
  // e.g., "Pearl Reference Series (22x18, 10x8...)" -> "Pearl Reference Series"
  return name.replace(/\s*\([^)]*\)\s*$/, '').trim();
}

// Helper to extract brand from gear string
function extractBrand(gearString) {
  if (!gearString) return 'Unknown';
  const brands = [
    'Tama', 'Pearl', 'DW', 'Sonor', 'Yamaha', 'Ludwig', 'Gretsch', 'Mapex', 'PDP', 'SJC', 'ddrum', 'OCDP',
    'Zildjian', 'Sabian', 'Paiste', 'Meinl',
    'Promark', 'Vic Firth', 'Vater', 'Ahead', 'Wincent',
    'Remo', 'Evans', 'Aquarian'
  ];
  for (const brand of brands) {
    if (gearString.toLowerCase().startsWith(brand.toLowerCase())) {
      return brand;
    }
  }
  // Try to extract first word as brand
  const firstWord = gearString.split(' ')[0];
  return firstWord || 'Unknown';
}

// Aggregate gear data from drummers
function aggregateGear(drummers) {
  const gearStats = {
    kits: {},
    cymbals: {},
    snares: {}
  };

  drummers.forEach(drummer => {
    if (!drummer.gear) return;
    
    const drummerInfo = {
      id: drummer.id,
      name: drummer.name,
      slug: drummer.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      image: drummer.image,
      band: drummer.band
    };

    // Aggregate drum kits
    if (drummer.gear.drums) {
      const kitName = normalizeGearName(drummer.gear.drums);
      if (kitName) {
        if (!gearStats.kits[kitName]) {
          gearStats.kits[kitName] = {
            name: kitName,
            brand: extractBrand(drummer.gear.drums),
            count: 0,
            drummers: []
          };
        }
        gearStats.kits[kitName].count++;
        gearStats.kits[kitName].drummers.push(drummerInfo);
      }
    }

    // Aggregate cymbals (by brand/series)
    if (drummer.gear.cymbals) {
      // Extract the main cymbal brand/series (before specific sizes)
      const cymbalString = drummer.gear.cymbals;
      const brand = extractBrand(cymbalString);
      // Try to get series info
      const seriesMatch = cymbalString.match(/^([A-Za-z]+)\s+([\w\s&]+?)(?:\s+Series|\s*\(|$)/);
      const cymbalKey = seriesMatch 
        ? `${seriesMatch[1]} ${seriesMatch[2]}`.trim()
        : brand;
      
      if (cymbalKey) {
        if (!gearStats.cymbals[cymbalKey]) {
          gearStats.cymbals[cymbalKey] = {
            name: cymbalKey,
            brand: brand,
            count: 0,
            drummers: []
          };
        }
        gearStats.cymbals[cymbalKey].count++;
        gearStats.cymbals[cymbalKey].drummers.push(drummerInfo);
      }
    }

    // Aggregate snare drums
    if (drummer.gear.snare) {
      const snareName = normalizeGearName(drummer.gear.snare);
      if (snareName) {
        if (!gearStats.snares[snareName]) {
          gearStats.snares[snareName] = {
            name: snareName,
            brand: extractBrand(drummer.gear.snare),
            count: 0,
            drummers: []
          };
        }
        gearStats.snares[snareName].count++;
        gearStats.snares[snareName].drummers.push(drummerInfo);
      }
    }
  });

  // Sort by count and take top 5 for each category
  const sortByCount = (a, b) => b.count - a.count;
  
  return {
    kits: Object.values(gearStats.kits).sort(sortByCount).slice(0, 5),
    cymbals: Object.values(gearStats.cymbals).sort(sortByCount).slice(0, 5),
    snares: Object.values(gearStats.snares).sort(sortByCount).slice(0, 5),
    generatedAt: new Date().toISOString()
  };
}

// Inline drummers data (subset needed for aggregation)
const DRUMMERS_DATA = [
  { id: 1, name: 'Lars Ulrich', band: 'Metallica', image: '/images/drummers/lars-ulrich.webp', gear: { drums: 'Tama Starclassic Maple', snare: 'Tama LU1465 Lars Ulrich Signature 14x6.5"', cymbals: 'Zildjian A Custom Series' } },
  { id: 2, name: 'Joey Jordison', band: 'Slipknot', image: '/images/drummers/joey-jordison.webp', gear: { drums: 'Pearl Reference Series', snare: 'Pearl Joey Jordison Signature 13x6.5"', cymbals: 'Paiste RUDE & 2002 Series' } },
  { id: 3, name: 'Gene Hoglan', band: 'Death / Testament', image: '/images/drummers/gene-hoglan.webp', gear: { drums: 'Pearl Reference Pure', snare: 'Pearl Reference 14x6.5" Brass', cymbals: 'Sabian AAX Series' } },
  { id: 4, name: 'Dave Lombardo', band: 'Slayer', image: '/images/drummers/dave-lombardo.webp', gear: { drums: 'Tama Starclassic Maple', snare: 'Tama S.L.P. 14x6.5" G-Maple', cymbals: 'Paiste RUDE & 2002 Series' } },
  { id: 5, name: 'Tomas Haake', band: 'Meshuggah', image: '/images/drummers/tomas-haake.webp', gear: { drums: 'Sonor SQ2 Heavy Beech', snare: 'Sonor Tomas Haake Signature 14x6.5"', cymbals: 'Sabian HHX & AAX Series' } },
  { id: 6, name: 'George Kollias', band: 'Nile', image: '/images/drummers/george-kollias.webp', gear: { drums: 'Pearl Masterworks Stadium Exotic', snare: 'Pearl George Kollias Signature 14x6.5"', cymbals: 'Zildjian K Custom' } },
  { id: 7, name: 'Eloy Casagrande', band: 'Slipknot', image: '/images/drummers/eloy-casagrande.webp', gear: { drums: 'Tama Starclassic Bubinga', snare: 'Tama Bell Brass 14x5.5"', cymbals: 'Paiste Masters & 2002' } },
  { id: 8, name: 'Ray Luzier', band: 'Korn', image: '/images/drummers/ray-luzier.webp', gear: { drums: 'Pearl Reference Series', snare: 'Pearl Reference 14x6.5" Brass', cymbals: 'Sabian AAX Series' } },
  { id: 9, name: 'John Otto', band: 'Limp Bizkit', image: '/images/drummers/john-otto.webp', gear: { drums: 'Orange County Drum & Percussion (OCDP) Custom Type 5 Acrylic', snare: 'OCDP 14x6.5" 40-ply Vented', cymbals: 'Zildjian A Custom' } },
  { id: 10, name: 'Jay Weinberg', band: 'Suicidal Tendencies', image: '/images/drummers/jay-weinberg.webp', gear: { drums: 'SJC Custom Drums', snare: 'SJC Jay Weinberg "The Crucible" 14x6.5"', cymbals: 'Zildjian K Custom' } },
  { id: 11, name: 'Vinnie Paul', band: 'Pantera', image: '/images/drummers/vinnie-paul.webp', gear: { drums: 'ddrum Vinnie Paul Signature Series', snare: 'ddrum Vinnie Paul Signature 14x8"', cymbals: 'Sabian AA & AAX Series' } },
  { id: 12, name: 'Charlie Benante', band: 'Anthrax', image: '/images/drummers/charlie-benante.webp', gear: { drums: 'Tama Starclassic', snare: 'Tama Charlie Benante Signature 14x6.5"', cymbals: 'Paiste RUDE & 2002 Series' } },
  { id: 13, name: 'Mike Portnoy', band: 'Dream Theater', image: '/images/drummers/mike-portnoy.webp', gear: { drums: 'Tama Starclassic Maple/Birch', snare: 'Tama Mike Portnoy Signature Melody Master 14x5.5"', cymbals: 'Sabian HHX Series' } },
  { id: 14, name: 'Danny Carey', band: 'Tool', image: '/images/drummers/danny-carey.webp', gear: { drums: 'Sonor SQ2', snare: 'Sonor Danny Carey Signature 14x8"', cymbals: 'Paiste Signature & 2002' } },
  { id: 15, name: 'Flo Mounier', band: 'Cryptopsy', image: '/images/drummers/flo-mounier.webp', gear: { drums: 'Pearl Reference', snare: 'Pearl Reference 14x5"', cymbals: 'Sabian AAX & HHX' } },
  { id: 16, name: 'Mario Duplantier', band: 'Gojira', image: '/images/drummers/mario-duplantier.webp', gear: { drums: 'Tama Starclassic Performer', snare: 'Tama S.L.P. 14x6"', cymbals: 'Meinl Byzance' } },
  { id: 17, name: 'Brann Dailor', band: 'Mastodon', image: '/images/drummers/brann-dailor.webp', gear: { drums: "DW Collector's Series", snare: "DW Collector's 14x6.5\"", cymbals: 'Meinl Byzance' } },
  { id: 18, name: 'Arin Ilejay', band: 'Ex-Avenged Sevenfold', image: '/images/drummers/arin-ilejay.webp', gear: { drums: "DW Collector's", snare: 'DW 14x6.5"', cymbals: 'Zildjian A Custom' } },
  { id: 19, name: 'Brooks Wackerman', band: 'Avenged Sevenfold', image: '/images/drummers/brooks-wackerman.webp', gear: { drums: "DW Collector's Series", snare: 'DW 14x5.5"', cymbals: 'Zildjian K Custom' } },
  { id: 20, name: 'Chris Adler', band: 'Lamb of God', image: '/images/drummers/chris-adler.webp', gear: { drums: 'Mapex Saturn IV', snare: 'Mapex Black Panther 14x6.5"', cymbals: 'Meinl Byzance' } },
  { id: 21, name: 'Art Cruz', band: 'Lamb of God', image: '/images/drummers/art-cruz.webp', gear: { drums: 'Pearl Masterworks', snare: 'Pearl Reference 14x5"', cymbals: 'Zildjian A Custom' } }
];

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Cache headers for CDN
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const now = Date.now();
    
    // Return cached data if still valid
    if (cachedPopularGear && (now - cacheTimestamp) < CACHE_TTL) {
      return res.status(200).json(cachedPopularGear);
    }

    // Compute popular gear from drummers data
    const popularGear = aggregateGear(DRUMMERS_DATA);
    
    // Cache the result
    cachedPopularGear = popularGear;
    cacheTimestamp = now;

    return res.status(200).json(popularGear);
  } catch (error) {
    console.error('Error computing popular gear:', error);
    return res.status(500).json({ error: 'Failed to compute popular gear' });
  }
}
