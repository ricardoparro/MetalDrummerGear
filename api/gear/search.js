// Vercel Serverless Function - Gear Search API
// Indexes all gear items across drummers for search functionality

// Full drummer data for gear cross-referencing
const drummers = [
  { id: 1, name: 'Lars Ulrich', band: 'Metallica', image: 'https://upload.wikimedia.org/wikipedia/commons/7/79/Lars_Ulrich_by_Gage_Skidmore_%28cropped%29.jpg', gear: { drums: 'Tama Star Classic Maple', snare: 'Tama LU1465 Lars Ulrich Signature 14x6.5"', cymbals: 'Zildjian A Custom Series', hardware: 'Tama Iron Cobra 900 Power Glide Double Pedal', sticks: 'Ahead Lars Ulrich Signature' } },
  { id: 2, name: 'Joey Jordison', band: 'Slipknot', image: 'https://upload.wikimedia.org/wikipedia/commons/b/b4/JoeyJordison.jpg', gear: { drums: 'Pearl Masters Premium Maple', snare: 'Pearl Joey Jordison Signature 13x6.5"', cymbals: 'Paiste RUDE Series', hardware: 'Pearl Demon Drive Double Pedal', sticks: 'Promark Joey Jordison Signature' } },
  { id: 3, name: 'Gene Hoglan', band: 'Death / Testament / Dethklok', image: 'https://upload.wikimedia.org/wikipedia/commons/6/60/Gene_Hoglan_-_Testament_%28cropped%29.jpg', gear: { drums: 'Tama Starclassic Walnut/Birch', snare: 'Tama Gene Hoglan Signature 14x8"', cymbals: 'Zildjian A Custom Series', hardware: 'Tama Speed Cobra 910 Double Pedal', sticks: 'Vater 5B' } },
  { id: 4, name: 'Dave Lombardo', band: 'Slayer', image: 'https://upload.wikimedia.org/wikipedia/commons/d/df/Dave_Lombardo_8.5.14.jpeg', gear: { drums: 'Pearl Masters Maple Complete', snare: 'Pearl Dave Lombardo Signature 14x5.5"', cymbals: 'Paiste RUDE & 2002 Series', hardware: 'Pearl Demon Drive Double Pedal', sticks: 'Vic Firth American Classic 5B' } },
  { id: 5, name: 'Tomas Haake', band: 'Meshuggah', image: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meshuggah_-_Rock_am_Ring_2023-44313.jpg', gear: { drums: 'Sonor SQ2 Heavy Beech', snare: 'Sonor Tomas Haake Signature 14x6.25"', cymbals: 'Meinl Byzance Series', hardware: 'Sonor Giant Step Double Pedal', sticks: 'Vic Firth Tomas Haake Signature' } },
  { id: 6, name: 'George Kollias', band: 'Nile', image: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/GK_10.jpg', gear: { drums: 'Pearl Masterworks Stadium Exotic', snare: 'Pearl George Kollias Signature 14x6.5"', cymbals: 'Zildjian A Custom Series', hardware: 'Pearl Demon Drive Double Pedal', sticks: 'Vic Firth George Kollias Signature' } },
  { id: 7, name: 'Eloy Casagrande', band: 'Sepultura / Slipknot', image: 'https://upload.wikimedia.org/wikipedia/commons/8/86/Sepultura_-_2023219214143_2023-08-07_Sepultura_-_Sven_-_1D_X_MK_II_-_0650_-_AK8I2527.jpg', gear: { drums: 'Tama Starclassic Bubinga', snare: 'Tama Bell Brass 14x6.5"', cymbals: 'Paiste Masters & 2002 Series', hardware: 'Tama Iron Cobra Power Glide Double Pedal', sticks: 'Promark' } },
  { id: 8, name: 'Ray Luzier', band: 'Korn', image: 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Ray_Luzier_of_Korn.jpg', gear: { drums: 'Pearl Masters Maple Complete', snare: 'Pearl Reference 14x6.5" Brass', cymbals: 'Sabian AAX Series', hardware: 'Pearl Demon Drive Double Pedal', sticks: 'Promark Ray Luzier Signature' } },
  { id: 9, name: 'John Otto', band: 'Limp Bizkit', image: 'https://upload.wikimedia.org/wikipedia/commons/0/0a/Drummer_John_Otto_of_Limp_Bizkit_in_2006.jpg', gear: { drums: 'OCDP Custom', snare: 'OCDP 14x7" Maple/Ash', cymbals: 'Zildjian K Custom Series', hardware: 'DW 9000 Series Double Pedal', sticks: 'Promark 747 Rock' } },
  { id: 10, name: 'Jay Weinberg', band: 'Slipknot / Suicidal Tendencies', image: 'https://upload.wikimedia.org/wikipedia/commons/4/46/Suicidal_Tendencies_Rockharz_2024_18.jpg', gear: { drums: 'Pearl Masterworks Custom', snare: 'Pearl Reference 14x6.5" Steel', cymbals: 'Zildjian A Custom & K Custom Series', hardware: 'Pearl Demon Drive Double Pedal', sticks: 'Promark ActiveGrip 5B' } },
  { id: 11, name: 'Vinnie Paul', band: 'Pantera / Damageplan / Hellyeah', image: 'https://upload.wikimedia.org/wikipedia/commons/5/55/VinniePaul2008.JPG', gear: { drums: 'ddrum Vinnie Paul Signature Series', snare: 'ddrum Vinnie Paul Signature 14x8"', cymbals: 'Sabian AA & AAX Series', hardware: 'ddrum Double Pedal', sticks: 'Vic Firth American Classic 5B' } },
  { id: 12, name: 'Charlie Benante', band: 'Anthrax / S.O.D. / Pantera', image: 'https://upload.wikimedia.org/wikipedia/commons/1/11/2017_Anthrax_-_Charlie_Benante_-_by_2eight_-_DSC1986_%28cropped%29.jpg', gear: { drums: 'Tama Starclassic', snare: 'Tama Charlie Benante Signature 14x6.5"', cymbals: 'Paiste RUDE & 2002 Series', hardware: 'Tama Speed Cobra Double Pedal', sticks: 'Vic Firth Charlie Benante Signature' } },
  { id: 13, name: 'Mike Portnoy', band: 'Dream Theater', image: 'https://upload.wikimedia.org/wikipedia/commons/2/28/Mike_Portnoy_2025_Tons_of_Rock-2.jpg', gear: { drums: 'Tama Starclassic Maple/Birch', snare: 'Tama Mike Portnoy Signature Melody Master 14x5.5"', cymbals: 'Sabian HHX Series', hardware: 'Tama Iron Cobra Power Glide Double Pedal', sticks: 'Promark Mike Portnoy Signature' } },
  { id: 14, name: 'Danny Carey', band: 'Tool', image: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Danny_Carey_Hellfest_2019.jpg', gear: { drums: 'Sonor SQ2 Heavy Beech', snare: 'Sonor Danny Carey Signature 14x8" Bronze', cymbals: 'Paiste Signature Series', hardware: 'Sonor Giant Step Twin Effect Double Pedal', sticks: 'Vic Firth Danny Carey Signature' } },
  { id: 15, name: 'Mario Duplantier', band: 'Gojira', image: 'https://upload.wikimedia.org/wikipedia/commons/0/00/Mario_Duplantier_Gojira_2012.jpg', gear: { drums: 'Tama Starclassic Walnut/Birch', snare: 'Tama S.L.P. 14x6" G-Maple', cymbals: 'Meinl Byzance Series', hardware: 'Tama Iron Cobra 900 Power Glide Double Pedal', sticks: 'Vic Firth X5A' } },
  { id: 16, name: 'Brann Dailor', band: 'Mastodon', image: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Ursynalia_2012%2C_Mastodon_03.jpg', gear: { drums: "DW Collector's Series Maple", snare: "DW Collector's Series 14x6.5\" Brass", cymbals: 'Sabian AAX Series', hardware: 'DW 9000 Series Double Pedal', sticks: 'Vater Brann Dailor Signature' } },
  { id: 17, name: 'Chris Adler', band: 'Lamb of God', image: 'https://upload.wikimedia.org/wikipedia/commons/4/44/2015_RiP_Lamb_of_God_-_Chris_Adler_by_2eight_-_3SC5483.jpg', gear: { drums: 'Mapex Black Panther Design Lab', snare: 'Mapex Chris Adler Signature 14x5.5"', cymbals: 'Meinl Byzance Series', hardware: 'Mapex Falcon Double Pedal', sticks: 'Vic Firth Chris Adler Signature' } },
  { id: 18, name: 'Matt Halpern', band: 'Periphery', image: 'https://upload.wikimedia.org/wikipedia/commons/8/80/Periphery_07_%285587554964%29.jpg', gear: { drums: 'Mapex Saturn V MH Exotic', snare: 'Mapex Black Panther Sledgehammer 14x6.5"', cymbals: 'Meinl Byzance Series', hardware: 'Mapex Falcon Double Pedal', sticks: 'Vic Firth Matt Halpern Signature' } },
  { id: 19, name: 'Inferno', band: 'Behemoth', image: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Behemoth_-_Reload_Festival_2024_01.jpg', gear: { drums: 'Pearl Reference Pure', snare: 'Pearl Reference 14x5" Steel', cymbals: 'Paiste RUDE Series', hardware: 'Pearl Demon Drive Double Pedal', sticks: 'Ahead 5B Aluminum' } },
  { id: 20, name: 'Hellhammer', band: 'Mayhem', image: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Hellhammer_Midgardsblot_2025.jpg', gear: { drums: 'Pearl Masters Premium', snare: 'Pearl Sensitone 14x5.5" Steel', cymbals: 'Meinl Byzance Series', hardware: 'Pearl Eliminator Demon Double Pedal', sticks: 'Vic Firth American Classic 5B' } },
];

// Generate slug from text
function toSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Build gear index from all drummers
function buildGearIndex() {
  const gearIndex = {};
  const categories = ['drums', 'snare', 'cymbals', 'hardware', 'sticks'];
  
  drummers.forEach(drummer => {
    if (!drummer.gear) return;
    
    categories.forEach(category => {
      const gearText = drummer.gear[category];
      if (!gearText) return;
      
      // Create a simplified gear key for grouping
      const gearKey = toSlug(gearText.split('(')[0].trim()); // Remove parenthetical details
      
      if (!gearIndex[gearKey]) {
        gearIndex[gearKey] = {
          name: gearText.split('(')[0].trim(),
          fullName: gearText,
          category,
          slug: gearKey,
          drummers: []
        };
      }
      
      gearIndex[gearKey].drummers.push({
        id: drummer.id,
        name: drummer.name,
        band: drummer.band,
        image: drummer.image,
        gearDetail: gearText
      });
    });
  });
  
  return Object.values(gearIndex);
}

// Search gear items
function searchGear(query, category = null) {
  const gearList = buildGearIndex();
  const searchTerms = query.toLowerCase().split(/\s+/).filter(Boolean);
  
  let results = gearList.filter(item => {
    const searchableText = `${item.name} ${item.fullName} ${item.category}`.toLowerCase();
    return searchTerms.every(term => searchableText.includes(term));
  });
  
  if (category) {
    results = results.filter(item => item.category === category);
  }
  
  // Sort by number of drummers using this gear (popularity)
  results.sort((a, b) => b.drummers.length - a.drummers.length);
  
  return results;
}

// Get all gear grouped by brand
function getGearByBrand() {
  const gearList = buildGearIndex();
  const brands = {};
  
  // Extract brand from gear name (first word typically)
  gearList.forEach(item => {
    const brandMatch = item.name.match(/^(Tama|Pearl|Sonor|DW|Mapex|Zildjian|Sabian|Meinl|Paiste|Vic Firth|Vater|Promark|Ahead|ddrum|OCDP)/i);
    const brand = brandMatch ? brandMatch[1] : 'Other';
    
    if (!brands[brand]) {
      brands[brand] = [];
    }
    brands[brand].push(item);
  });
  
  return brands;
}

// Get popular gear (used by most drummers)
function getPopularGear(limit = 10) {
  const gearList = buildGearIndex();
  return gearList
    .sort((a, b) => b.drummers.length - a.drummers.length)
    .slice(0, limit);
}

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { q, category, brand, popular, limit, all } = req.query;

  // Return all gear items indexed
  if (all === 'true') {
    const gearList = buildGearIndex();
    return res.status(200).json({
      total: gearList.length,
      items: gearList
    });
  }

  // Return popular gear
  if (popular === 'true') {
    const popularGear = getPopularGear(parseInt(limit) || 10);
    return res.status(200).json({
      items: popularGear
    });
  }

  // Return gear grouped by brand
  if (brand === 'all') {
    const gearByBrand = getGearByBrand();
    return res.status(200).json({
      brands: gearByBrand
    });
  }

  // Search gear by query
  if (q) {
    const results = searchGear(q, category);
    return res.status(200).json({
      query: q,
      category: category || 'all',
      total: results.length,
      items: results
    });
  }

  // Default: return all gear with basic filtering
  let gearList = buildGearIndex();
  
  if (category) {
    gearList = gearList.filter(item => item.category === category);
  }
  
  if (brand) {
    gearList = gearList.filter(item => 
      item.name.toLowerCase().includes(brand.toLowerCase())
    );
  }

  res.status(200).json({
    total: gearList.length,
    items: gearList
  });
}

// Export for use in other files
export { buildGearIndex, searchGear, toSlug };
