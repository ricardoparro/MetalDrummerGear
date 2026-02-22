// Vercel Serverless Function - TikTok Content Generator
// Issue #527 - Create TikTok slideshow content from drummer data

import { drummers } from '../../drummers/index.js';

/**
 * Generate hook variations for TikTok content
 */
function generateHooks(drummer) {
  const hooks = [
    `What drums does ${drummer.name} ACTUALLY use?`,
    `${drummer.name}'s kit is INSANE 🔥`,
    `POV: You're ${drummer.name} at soundcheck`,
  ];

  // Add band-based hooks
  if (drummer.band) {
    hooks.push(`The kit behind ${drummer.band}`);
    hooks.push(`How ${drummer.name} gets the ${drummer.band} sound`);
  }

  // Add genre-based hooks
  if (drummer.genre) {
    if (drummer.genre.toLowerCase().includes('death')) {
      hooks.push(`The fastest drummer in death metal?`);
    }
    if (drummer.genre.toLowerCase().includes('thrash')) {
      hooks.push(`Thrash metal drumming at its finest`);
    }
    if (drummer.genre.toLowerCase().includes('black')) {
      hooks.push(`Black metal blast beats hit different`);
    }
  }

  // Add famous song hooks if videos exist
  if (drummer.videos && drummer.videos.length > 0) {
    const firstVideo = drummer.videos[0];
    const songName = firstVideo.title.split(' - ')[0] || firstVideo.title;
    hooks.push(`The kit behind "${songName}"`);
  }

  return hooks.slice(0, 5); // Return max 5 hooks
}

/**
 * Generate hashtags based on drummer data
 */
function generateHashtags(drummer) {
  const hashtags = new Set();
  
  // Always include generic drum hashtags
  hashtags.add('#drums');
  hashtags.add('#drumgear');
  hashtags.add('#metaldrummer');
  hashtags.add('#drumsetup');
  
  // Drummer name hashtag
  const nameTag = drummer.name.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (nameTag) hashtags.add(`#${nameTag}`);
  
  // Band name hashtag
  if (drummer.band) {
    const bandTag = drummer.band.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (bandTag) hashtags.add(`#${bandTag}`);
  }
  
  // Genre hashtags
  if (drummer.genre) {
    const genreLower = drummer.genre.toLowerCase();
    if (genreLower.includes('death')) hashtags.add('#deathmetal');
    if (genreLower.includes('thrash')) hashtags.add('#thrashmetal');
    if (genreLower.includes('black')) hashtags.add('#blackmetal');
    if (genreLower.includes('progressive')) hashtags.add('#progmetal');
    if (genreLower.includes('doom')) hashtags.add('#doommetal');
    if (genreLower.includes('groove')) hashtags.add('#groovemetal');
    hashtags.add('#metal');
  }
  
  // Brand hashtags from gear
  if (drummer.gear) {
    const gearText = JSON.stringify(drummer.gear).toLowerCase();
    if (gearText.includes('tama')) hashtags.add('#tama');
    if (gearText.includes('pearl')) hashtags.add('#pearl');
    if (gearText.includes('dw')) hashtags.add('#dwdrums');
    if (gearText.includes('zildjian')) hashtags.add('#zildjian');
    if (gearText.includes('sabian')) hashtags.add('#sabian');
    if (gearText.includes('meinl')) hashtags.add('#meinl');
    if (gearText.includes('paiste')) hashtags.add('#paiste');
    if (gearText.includes('vic firth')) hashtags.add('#vicfirth');
  }
  
  return Array.from(hashtags).slice(0, 10);
}

/**
 * Estimate gear cost based on gear data
 */
function estimateCost(drummer) {
  // Base estimates for professional gear
  const estimates = {
    drums: 5000,
    snare: 500,
    cymbals: 2500,
    hardware: 1500,
    sticks: 50
  };
  
  const gearText = JSON.stringify(drummer.gear || {}).toLowerCase();
  
  // Adjust for premium brands/models
  if (gearText.includes('starclassic')) estimates.drums = 7000;
  if (gearText.includes('masters')) estimates.drums = 6000;
  if (gearText.includes('reference')) estimates.drums = 5500;
  if (gearText.includes('signature')) estimates.snare += 200;
  if (gearText.includes('byzance')) estimates.cymbals = 3500;
  if (gearText.includes('k custom')) estimates.cymbals = 3000;
  if (gearText.includes('iron cobra')) estimates.hardware = 500;
  if (gearText.includes('demon drive')) estimates.hardware = 700;
  if (gearText.includes('speed cobra')) estimates.hardware = 600;
  
  const total = Object.values(estimates).reduce((a, b) => a + b, 0);
  
  if (total >= 15000) return '$15,000+';
  if (total >= 10000) return '$10,000+';
  if (total >= 5000) return '$5,000+';
  return '$3,000+';
}

/**
 * Parse gear into slide content
 */
function parseGearToSlides(drummer) {
  const gear = drummer.gear || {};
  
  return [
    {
      number: 1,
      type: 'hook',
      text: `What drums does ${drummer.name} ACTUALLY use?`,
      image: 'drummer photo'
    },
    {
      number: 2,
      type: 'drums',
      text: gear.drums || 'Custom Kit',
      details: extractDrumDetails(gear.drums)
    },
    {
      number: 3,
      type: 'snare',
      text: extractBrandModel(gear.snare) || 'Signature Snare',
      details: extractSnareDetails(gear.snare)
    },
    {
      number: 4,
      type: 'cymbals',
      text: extractBrandModel(gear.cymbals) || 'Pro Cymbals',
      details: extractCymbalDetails(gear.cymbals)
    },
    {
      number: 5,
      type: 'hardware',
      text: extractBrandModel(gear.hardware) || 'Pro Hardware',
      details: gear.sticks ? `Sticks: ${gear.sticks}` : 'Full hardware setup'
    },
    {
      number: 6,
      type: 'cta',
      text: 'Full gear breakdown → link in bio',
      url: `metalforge.io/drummer/${drummer.id}`
    }
  ];
}

/**
 * Extract brand and model from gear string
 */
function extractBrandModel(gearStr) {
  if (!gearStr) return null;
  // Extract first part before any parentheses or detailed specs
  const match = gearStr.match(/^([^(]+)/);
  return match ? match[1].trim() : gearStr;
}

/**
 * Extract drum kit details
 */
function extractDrumDetails(drumStr) {
  if (!drumStr) return 'Professional drum kit';
  // Check for shell material or finish mentions
  const materials = ['maple', 'birch', 'bubinga', 'walnut', 'oak'];
  for (const mat of materials) {
    if (drumStr.toLowerCase().includes(mat)) {
      return `${mat.charAt(0).toUpperCase() + mat.slice(1)} shells`;
    }
  }
  return 'Professional configuration';
}

/**
 * Extract snare details
 */
function extractSnareDetails(snareStr) {
  if (!snareStr) return 'Pro snare drum';
  // Look for size specs like 14x6.5"
  const sizeMatch = snareStr.match(/(\d+[x×]\d+\.?\d*[""]?)/);
  if (sizeMatch) {
    return sizeMatch[1];
  }
  return 'Signature model';
}

/**
 * Extract cymbal details
 */
function extractCymbalDetails(cymbalStr) {
  if (!cymbalStr) return 'Full cymbal setup';
  // Look for size mentions
  const sizes = cymbalStr.match(/(\d+[""]?\s*(Hi-Hats?|Crashes?|Ride|China))/gi);
  if (sizes && sizes.length > 0) {
    return sizes.slice(0, 3).join(', ');
  }
  return 'Professional cymbal pack';
}

/**
 * Main API handler
 */
export default function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.query;
  
  if (!id) {
    return res.status(400).json({ error: 'Drummer ID is required' });
  }

  const drummerId = parseInt(id, 10);
  const drummer = drummers.find(d => d.id === drummerId);

  if (!drummer) {
    return res.status(404).json({ error: 'Drummer not found' });
  }

  // Generate TikTok content
  const tiktokContent = {
    drummer: {
      name: drummer.name,
      band: drummer.band,
      image: drummer.image || `/images/drummers/${drummer.name.toLowerCase().replace(/\s+/g, '-')}.webp`
    },
    slides: parseGearToSlides(drummer),
    hooks: generateHooks(drummer),
    hashtags: generateHashtags(drummer),
    estimatedCost: estimateCost(drummer),
    meta: {
      generatedAt: new Date().toISOString(),
      drummerId: drummer.id,
      profileUrl: `https://metalforge.io/drummer/${drummer.id}`
    }
  };

  res.status(200).json(tiktokContent);
}
