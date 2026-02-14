// Vercel Serverless Function - Kit Builder API
// Handles preset kits, custom kit creation, and kit listing

import { drummers } from '../drummers/index.js';
import crypto from 'crypto';

// In-memory store for custom kits (in production, use a database)
// For now, we'll use a Map that resets on cold starts
const customKits = new Map();

// Gear categories with available options
const gearCategories = {
  shellPack: {
    label: 'Shell Pack',
    icon: '🥁',
    options: [
      { id: 'tama-starclassic', brand: 'Tama', name: 'Starclassic Maple', priceEur: 3200 },
      { id: 'tama-starclassic-wb', brand: 'Tama', name: 'Starclassic Walnut/Birch', priceEur: 3800 },
      { id: 'tama-starclassic-bubinga', brand: 'Tama', name: 'Starclassic Bubinga', priceEur: 4200 },
      { id: 'pearl-reference', brand: 'Pearl', name: 'Reference Series', priceEur: 3500 },
      { id: 'pearl-reference-pure', brand: 'Pearl', name: 'Reference Pure', priceEur: 3800 },
      { id: 'pearl-masterworks', brand: 'Pearl', name: 'Masterworks', priceEur: 4500 },
      { id: 'sonor-sq2', brand: 'Sonor', name: 'SQ2 Heavy Beech', priceEur: 5500 },
      { id: 'sonor-sq2-maple', brand: 'Sonor', name: 'SQ2 Designer Maple', priceEur: 4800 },
      { id: 'dw-collectors', brand: 'DW', name: 'Collectors Series', priceEur: 5200 },
      { id: 'ludwig-classic', brand: 'Ludwig', name: 'Classic Maple', priceEur: 3400 },
      { id: 'mapex-saturn', brand: 'Mapex', name: 'Saturn V', priceEur: 2800 },
      { id: 'mapex-black-panther', brand: 'Mapex', name: 'Black Panther Design Lab', priceEur: 3200 },
      { id: 'sjc-custom', brand: 'SJC', name: 'Custom Drums', priceEur: 4000 },
      { id: 'yamaha-recording', brand: 'Yamaha', name: 'Recording Custom', priceEur: 3600 },
      { id: 'ddrum-dios', brand: 'ddrum', name: 'Dios Series', priceEur: 2200 },
    ]
  },
  snare: {
    label: 'Snare Drum',
    icon: '🪘',
    options: [
      { id: 'tama-slp-gmpl', brand: 'Tama', name: 'S.L.P. G-Maple 14x6.5"', priceEur: 480 },
      { id: 'tama-bell-brass', brand: 'Tama', name: 'Bell Brass 14x6.5"', priceEur: 650 },
      { id: 'tama-starphonic', brand: 'Tama', name: 'STARPHONIC Brass 14x6"', priceEur: 550 },
      { id: 'pearl-reference-brass', brand: 'Pearl', name: 'Reference 14x6.5" Brass', priceEur: 520 },
      { id: 'pearl-sensitone', brand: 'Pearl', name: 'Sensitone Heritage Alloy', priceEur: 450 },
      { id: 'sonor-artist', brand: 'Sonor', name: 'Artist Bronze 14x6.5"', priceEur: 580 },
      { id: 'ludwig-supraphonic', brand: 'Ludwig', name: 'Supraphonic LM402 14x6.5"', priceEur: 550 },
      { id: 'ludwig-black-beauty', brand: 'Ludwig', name: 'Black Beauty 14x6.5"', priceEur: 850 },
      { id: 'dw-collectors-brass', brand: 'DW', name: 'Collectors Brass 14x6.5"', priceEur: 680 },
      { id: 'mapex-black-panther-brass', brand: 'Mapex', name: 'Black Panther Brass 14x6.5"', priceEur: 420 },
    ]
  },
  cymbals: {
    label: 'Cymbal Set',
    icon: '🔔',
    options: [
      { id: 'zildjian-a-custom', brand: 'Zildjian', name: 'A Custom Series', priceEur: 2200 },
      { id: 'zildjian-k-custom', brand: 'Zildjian', name: 'K Custom Series', priceEur: 2600 },
      { id: 'zildjian-k-dark', brand: 'Zildjian', name: 'K Dark Series', priceEur: 2400 },
      { id: 'sabian-aax', brand: 'Sabian', name: 'AAX Series', priceEur: 2000 },
      { id: 'sabian-hhx', brand: 'Sabian', name: 'HHX Series', priceEur: 2200 },
      { id: 'sabian-hhx-evolution', brand: 'Sabian', name: 'HHX Evolution', priceEur: 2400 },
      { id: 'meinl-byzance', brand: 'Meinl', name: 'Byzance Series', priceEur: 2400 },
      { id: 'meinl-byzance-dual', brand: 'Meinl', name: 'Byzance Dual Series', priceEur: 2600 },
      { id: 'paiste-rude', brand: 'Paiste', name: 'RUDE Series', priceEur: 2000 },
      { id: 'paiste-2002', brand: 'Paiste', name: '2002 Series', priceEur: 2200 },
      { id: 'paiste-signature', brand: 'Paiste', name: 'Signature Series', priceEur: 2600 },
    ]
  },
  hiHat: {
    label: 'Hi-Hat',
    icon: '🎵',
    options: [
      { id: 'zildjian-a-custom-hh', brand: 'Zildjian', name: 'A Custom 14" Mastersound', priceEur: 420 },
      { id: 'zildjian-k-custom-hh', brand: 'Zildjian', name: 'K Custom 14" Dark', priceEur: 480 },
      { id: 'sabian-aax-hh', brand: 'Sabian', name: 'AAX 14" Stage', priceEur: 380 },
      { id: 'sabian-hhx-hh', brand: 'Sabian', name: 'HHX 14" Evolution', priceEur: 450 },
      { id: 'meinl-byzance-hh', brand: 'Meinl', name: 'Byzance 14" Dark', priceEur: 420 },
      { id: 'meinl-byzance-dual-hh', brand: 'Meinl', name: 'Byzance 15" Dual', priceEur: 480 },
      { id: 'paiste-rude-hh', brand: 'Paiste', name: 'RUDE 14" Sound Edge', priceEur: 360 },
      { id: 'paiste-2002-hh', brand: 'Paiste', name: '2002 15" Sound Edge', priceEur: 400 },
    ]
  },
  pedals: {
    label: 'Bass Drum Pedal',
    icon: '⚙️',
    options: [
      { id: 'tama-iron-cobra-900', brand: 'Tama', name: 'Iron Cobra 900 Power Glide Double', priceEur: 450 },
      { id: 'tama-speed-cobra-910', brand: 'Tama', name: 'Speed Cobra 910 Double', priceEur: 480 },
      { id: 'pearl-demon-drive', brand: 'Pearl', name: 'Demon Drive Double', priceEur: 550 },
      { id: 'pearl-eliminator', brand: 'Pearl', name: 'Eliminator Redline Double', priceEur: 420 },
      { id: 'dw-9000', brand: 'DW', name: '9000 Series Double', priceEur: 600 },
      { id: 'dw-5000', brand: 'DW', name: '5000 Series Double', priceEur: 450 },
      { id: 'mapex-falcon', brand: 'Mapex', name: 'Falcon Double', priceEur: 400 },
      { id: 'axis-longboard', brand: 'Axis', name: 'A Longboard Double', priceEur: 700 },
      { id: 'trick-pro1v', brand: 'Trick', name: 'Pro 1-V Double', priceEur: 850 },
      { id: 'sonor-giant-step', brand: 'Sonor', name: 'Giant Step Double', priceEur: 550 },
    ]
  },
  throne: {
    label: 'Drum Throne',
    icon: '🪑',
    options: [
      { id: 'tama-1st-chair', brand: 'Tama', name: '1st Chair Ergo-Rider', priceEur: 280 },
      { id: 'pearl-d2000', brand: 'Pearl', name: 'D-2000 Roadster', priceEur: 220 },
      { id: 'pearl-d3000', brand: 'Pearl', name: 'D-3000', priceEur: 320 },
      { id: 'roc-n-soc-nitro', brand: 'Roc-n-Soc', name: 'Nitro Extended', priceEur: 350 },
      { id: 'dw-9100', brand: 'DW', name: '9100 Series', priceEur: 280 },
      { id: 'porter-davies-bc2', brand: 'Porter & Davies', name: 'BC2 Tactile Monitor', priceEur: 900 },
      { id: 'gibraltar-9608', brand: 'Gibraltar', name: '9608 Moto Style', priceEur: 200 },
    ]
  },
  sticks: {
    label: 'Drumsticks',
    icon: '🥢',
    options: [
      { id: 'vic-firth-5a', brand: 'Vic Firth', name: 'American Classic 5A', priceEur: 12 },
      { id: 'vic-firth-5b', brand: 'Vic Firth', name: 'American Classic 5B', priceEur: 12 },
      { id: 'vic-firth-extreme-5b', brand: 'Vic Firth', name: 'Extreme 5B', priceEur: 14 },
      { id: 'promark-5a', brand: 'Promark', name: 'Classic 5A', priceEur: 11 },
      { id: 'promark-5b', brand: 'Promark', name: 'Classic 5B', priceEur: 11 },
      { id: 'vater-5a', brand: 'Vater', name: 'Los Angeles 5A', priceEur: 10 },
      { id: 'vater-5b', brand: 'Vater', name: 'Power 5B', priceEur: 10 },
      { id: 'ahead-aluminum', brand: 'Ahead', name: 'Aluminum 5B', priceEur: 35 },
      { id: 'wincent-5a', brand: 'Wincent', name: '5A Hickory', priceEur: 11 },
    ]
  }
};

// Preset kits from famous drummers
const presetKits = [
  {
    id: 'lars-ulrich',
    name: "Lars Ulrich's Metallica Setup",
    drummer: 'Lars Ulrich',
    band: 'Metallica',
    image: '/images/drummers/lars-ulrich.webp',
    description: 'The iconic thrash metal setup that defined Metallica\'s sound',
    gear: {
      shellPack: 'tama-starclassic',
      snare: 'tama-bell-brass',
      cymbals: 'zildjian-a-custom',
      hiHat: 'zildjian-a-custom-hh',
      pedals: 'tama-iron-cobra-900',
      throne: 'tama-1st-chair',
      sticks: 'ahead-aluminum'
    }
  },
  {
    id: 'joey-jordison',
    name: "Joey Jordison's Slipknot Setup",
    drummer: 'Joey Jordison',
    band: 'Slipknot',
    image: '/images/drummers/joey-jordison.webp',
    description: 'The legendary setup behind Iowa and the rotating drum riser',
    gear: {
      shellPack: 'pearl-reference',
      snare: 'pearl-sensitone',
      cymbals: 'paiste-rude',
      hiHat: 'paiste-rude-hh',
      pedals: 'pearl-demon-drive',
      throne: 'pearl-d2000',
      sticks: 'promark-5b'
    }
  },
  {
    id: 'danny-carey',
    name: "Danny Carey's Tool Rig",
    drummer: 'Danny Carey',
    band: 'Tool',
    image: '/images/drummers/danny-carey.webp',
    description: 'The massive progressive setup with signature polyrhythms',
    gear: {
      shellPack: 'sonor-sq2',
      snare: 'sonor-artist',
      cymbals: 'paiste-signature',
      hiHat: 'paiste-2002-hh',
      pedals: 'sonor-giant-step',
      throne: 'porter-davies-bc2',
      sticks: 'vic-firth-5b'
    }
  },
  {
    id: 'dave-lombardo',
    name: "Dave Lombardo's Reign in Blood Setup",
    drummer: 'Dave Lombardo',
    band: 'Slayer',
    image: '/images/drummers/dave-lombardo.webp',
    description: 'The thrash metal pioneer\'s legendary kit',
    gear: {
      shellPack: 'tama-starclassic',
      snare: 'tama-slp-gmpl',
      cymbals: 'paiste-rude',
      hiHat: 'paiste-rude-hh',
      pedals: 'tama-iron-cobra-900',
      throne: 'tama-1st-chair',
      sticks: 'promark-5b'
    }
  },
  {
    id: 'tomas-haake',
    name: "Tomas Haake's Meshuggah Machine",
    drummer: 'Tomas Haake',
    band: 'Meshuggah',
    image: '/images/drummers/tomas-haake.webp',
    description: 'The polyrhythmic djent pioneer\'s precise setup',
    gear: {
      shellPack: 'sonor-sq2',
      snare: 'sonor-artist',
      cymbals: 'sabian-hhx',
      hiHat: 'sabian-hhx-hh',
      pedals: 'tama-speed-cobra-910',
      throne: 'porter-davies-bc2',
      sticks: 'wincent-5a'
    }
  },
  {
    id: 'mario-duplantier',
    name: "Mario Duplantier's Gojira Kit",
    drummer: 'Mario Duplantier',
    band: 'Gojira',
    image: '/images/drummers/mario-duplantier.webp',
    description: 'Powerful progressive death metal setup with dual bass drums',
    gear: {
      shellPack: 'tama-starclassic-bubinga',
      snare: 'tama-slp-gmpl',
      cymbals: 'zildjian-k-custom',
      hiHat: 'zildjian-k-custom-hh',
      pedals: 'tama-iron-cobra-900',
      throne: 'tama-1st-chair',
      sticks: 'vic-firth-5a'
    }
  },
  {
    id: 'gene-hoglan',
    name: "Gene Hoglan's Atomic Clock Setup",
    drummer: 'Gene Hoglan',
    band: 'Death / Testament',
    image: '/images/drummers/gene-hoglan.webp',
    description: 'The death metal legend\'s precise and powerful kit',
    gear: {
      shellPack: 'pearl-reference-pure',
      snare: 'pearl-reference-brass',
      cymbals: 'sabian-aax',
      hiHat: 'sabian-aax-hh',
      pedals: 'pearl-demon-drive',
      throne: 'pearl-d2000',
      sticks: 'promark-5b'
    }
  },
  {
    id: 'matt-garstka',
    name: "Matt Garstka's AAL Setup",
    drummer: 'Matt Garstka',
    band: 'Animals as Leaders',
    image: '/images/drummers/matt-garstka.webp',
    description: 'Modern progressive djent with fusion influences',
    gear: {
      shellPack: 'tama-starclassic-wb',
      snare: 'tama-slp-gmpl',
      cymbals: 'meinl-byzance-dual',
      hiHat: 'meinl-byzance-dual-hh',
      pedals: 'tama-speed-cobra-910',
      throne: 'tama-1st-chair',
      sticks: 'vic-firth-5a'
    }
  }
];

// Generate a unique kit ID
function generateKitId() {
  return crypto.randomBytes(6).toString('base64url').toLowerCase().substring(0, 8);
}

// Calculate total kit price
function calculateKitPrice(gearSelections) {
  let total = 0;
  for (const [category, gearId] of Object.entries(gearSelections)) {
    if (gearCategories[category]) {
      const gear = gearCategories[category].options.find(g => g.id === gearId);
      if (gear) {
        total += gear.priceEur;
      }
    }
  }
  return total;
}

// Find matching drummer based on gear similarity
function findMatchingDrummer(gearSelections, allDrummers) {
  let bestMatch = null;
  let highestScore = 0;

  for (const drummer of allDrummers) {
    if (!drummer.gear) continue;
    
    let score = 0;
    const drummerGear = JSON.stringify(drummer.gear).toLowerCase();
    
    for (const [category, gearId] of Object.entries(gearSelections)) {
      if (gearCategories[category]) {
        const gear = gearCategories[category].options.find(g => g.id === gearId);
        if (gear) {
          // Check if drummer uses this brand
          if (drummerGear.includes(gear.brand.toLowerCase())) {
            score += 1;
          }
          // Check for specific product match
          if (drummerGear.includes(gear.name.toLowerCase().split(' ')[0])) {
            score += 2;
          }
        }
      }
    }
    
    if (score > highestScore) {
      highestScore = score;
      bestMatch = {
        drummer: {
          id: drummer.id,
          name: drummer.name,
          band: drummer.band,
          image: drummer.image
        },
        matchScore: score,
        matchPercentage: Math.min(100, Math.round((score / 14) * 100))
      };
    }
  }
  
  return bestMatch;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // GET - Return categories, presets, or specific kit
  if (req.method === 'GET') {
    const { presets, categories } = req.query;
    
    // Return gear categories
    if (categories === 'true') {
      return res.status(200).json({
        categories: gearCategories
      });
    }
    
    // Return preset kits
    if (presets === 'true') {
      const presetsWithPrices = presetKits.map(kit => ({
        ...kit,
        totalPrice: calculateKitPrice(kit.gear)
      }));
      
      return res.status(200).json({
        presets: presetsWithPrices
      });
    }
    
    // Default: return both
    return res.status(200).json({
      categories: gearCategories,
      presets: presetKits.map(kit => ({
        ...kit,
        totalPrice: calculateKitPrice(kit.gear)
      }))
    });
  }

  // POST - Create a new kit
  if (req.method === 'POST') {
    try {
      const { gear, name } = req.body;
      
      if (!gear || typeof gear !== 'object') {
        return res.status(400).json({ error: 'Invalid gear configuration' });
      }
      
      // Validate gear selections
      for (const [category, gearId] of Object.entries(gear)) {
        if (!gearCategories[category]) {
          return res.status(400).json({ error: `Invalid category: ${category}` });
        }
        if (gearId && !gearCategories[category].options.find(g => g.id === gearId)) {
          return res.status(400).json({ error: `Invalid gear ID for ${category}: ${gearId}` });
        }
      }
      
      const kitId = generateKitId();
      const totalPrice = calculateKitPrice(gear);
      const matchingDrummer = findMatchingDrummer(gear, drummers);
      
      const kit = {
        id: kitId,
        name: name || 'My Custom Metal Kit',
        gear,
        totalPrice,
        matchingDrummer,
        createdAt: new Date().toISOString()
      };
      
      // Store kit (in memory for now)
      customKits.set(kitId, kit);
      
      return res.status(201).json({
        success: true,
        kit
      });
    } catch (error) {
      console.error('Error creating kit:', error);
      return res.status(500).json({ error: 'Failed to create kit' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

// Export for use in other files
export { gearCategories, presetKits, calculateKitPrice, findMatchingDrummer };
