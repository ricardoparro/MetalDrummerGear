#!/usr/bin/env node
/**
 * 60-Second Setup Build - Data Extraction Script
 * 
 * Extracts drummer gear data for video production.
 * Outputs JSON with all information needed for video creation.
 * 
 * Usage: node scripts/video-production/extract-drummer-data.cjs
 */

const path = require('path');

// Import drummers data
const { drummers } = require('../../api/drummers/index.js');

// Target drummers for Phase 1 (Issue #827)
const TARGET_DRUMMERS = [
  'Joey Jordison',
  'Lars Ulrich',
  'George Kollias',
  'Mario Duplantier',
  'Dave Lombardo'
];

// Approximate gear prices (EUR) - sourced from major retailers
const GEAR_PRICES = {
  // Drum kits
  'Pearl Reference Series': 4500,
  'Pearl Reference Pure': 5200,
  'Pearl Masterworks Stadium Exotic': 8500,
  'Tama Starclassic Maple': 3800,
  'Tama Starclassic Bubinga': 5500,
  'Tama Starclassic Walnut/Birch': 4200,
  'Sonor SQ2 Heavy Beech': 7500,
  
  // Snares
  'Pearl Joey Jordison Signature 13x6.5"': 450,
  'Tama LU1465 Lars Ulrich Signature 14x6.5"': 550,
  'Pearl George Kollias Signature 14x6.5"': 480,
  'Tama S.L.P. 14x6.5" G-Maple': 420,
  'Tama S.L.P. 14x6.5\" G-Maple': 420,
  
  // Cymbals (full set estimate)
  'Paiste RUDE & 2002 Series': 2800,
  'Zildjian A Custom Series': 2400,
  'Zildjian (14" K Sweet Hi-Hats': 2600,
  'Zildjian': 2500,
  'Paiste': 2600,
  
  // Hardware
  'Pearl Demon Drive Double Pedal': 650,
  'Pearl Demon XR Double Pedal': 550,
  'Tama Iron Cobra 900 Power Glide Double Pedal': 480,
  'Tama Iron Cobra 900 Double Pedal': 480,
  
  // Sticks (annual estimate for tour)
  'Promark Joey Jordison Signature TX515W': 180,
  'Ahead Lars Ulrich Signature Drumsticks': 200,
  'Vic Firth George Kollias Signature SGK': 160,
  'Tama Mario Duplantier Signature': 150,
  'Promark Dave Lombardo Signature 2Bx': 170,
  
  // Throne
  'Pearl D-2000BR Throne': 280,
  'Pearl D-3000 Throne': 350,
  'Tama 1st Chair Throne': 320,
  'Tama 1st Chair Ergo-Rider Throne': 380,
  
  // Rack system (if applicable)
  'Pearl DR-501C Icon Rack': 1200,
};

// Parse gear string to extract individual items
function parseGear(gearObj) {
  const items = [];
  
  if (gearObj.drums) {
    items.push({ category: 'Drums', name: gearObj.drums, icon: '🥁' });
  }
  if (gearObj.snare) {
    items.push({ category: 'Snare', name: gearObj.snare, icon: '🪘' });
  }
  if (gearObj.cymbals) {
    items.push({ category: 'Cymbals', name: gearObj.cymbals, icon: '🔔' });
  }
  if (gearObj.hardware) {
    items.push({ category: 'Hardware', name: gearObj.hardware, icon: '⚙️' });
  }
  if (gearObj.sticks) {
    items.push({ category: 'Sticks', name: gearObj.sticks, icon: '🥢' });
  }
  if (gearObj.heads) {
    items.push({ category: 'Heads', name: gearObj.heads, icon: '⭕' });
  }
  
  return items;
}

// Estimate price for a gear item
function estimatePrice(itemName) {
  // Direct match
  if (GEAR_PRICES[itemName]) {
    return GEAR_PRICES[itemName];
  }
  
  // Partial match
  for (const [key, price] of Object.entries(GEAR_PRICES)) {
    if (itemName.toLowerCase().includes(key.toLowerCase()) || 
        key.toLowerCase().includes(itemName.toLowerCase().split(' ').slice(0, 2).join(' '))) {
      return price;
    }
  }
  
  // Category-based fallback estimates
  if (itemName.includes('Pearl') && itemName.includes('Reference')) return 4500;
  if (itemName.includes('Tama') && itemName.includes('Starclassic')) return 4200;
  if (itemName.includes('Sonor') && itemName.includes('SQ2')) return 7000;
  if (itemName.includes('Snare') || itemName.includes('14x')) return 400;
  if (itemName.includes('Cymbal') || itemName.includes('Hi-Hat')) return 2500;
  if (itemName.includes('Double Pedal') || itemName.includes('Pedal')) return 500;
  if (itemName.includes('Throne') || itemName.includes('Chair')) return 300;
  if (itemName.includes('Stick') || itemName.includes('Signature')) return 150;
  if (itemName.includes('Remo') || itemName.includes('Evans') || itemName.includes('heads')) return 200;
  
  return 500; // Default estimate
}

// Calculate total setup cost
function calculateTotalCost(gearItems) {
  return gearItems.reduce((total, item) => {
    const price = estimatePrice(item.name);
    item.estimatedPrice = price;
    return total + price;
  }, 0);
}

// Format price for display
function formatPrice(price) {
  return `€${price.toLocaleString('en-US')}`;
}

// Extract data for a single drummer
function extractDrummerData(drummer) {
  const gearItems = parseGear(drummer.gear);
  const totalCost = calculateTotalCost(gearItems);
  
  return {
    id: drummer.id,
    name: drummer.name,
    band: drummer.band,
    genre: drummer.genre,
    country: drummer.country,
    
    // Images
    profileImage: drummer.image,
    photos: drummer.photos || [drummer.image],
    
    // Gear breakdown
    gear: {
      raw: drummer.gear,
      items: gearItems,
      totalCost: totalCost,
      totalCostFormatted: formatPrice(totalCost),
    },
    
    // Video script elements
    videoScript: {
      title: `Building ${drummer.name}'s ${formatPrice(totalCost)} Setup`,
      subtitle: `${drummer.band} • ${drummer.genre}`,
      cta: `Explore full setup → metalforge.io/${drummer.name.toLowerCase().replace(/\s+/g, '-')}`,
      hashtags: [
        `#${drummer.name.replace(/\s+/g, '')}`,
        '#MetalDrummer',
        '#DrumSetup',
        '#DrumGear',
        '#MetalForge',
        `#${drummer.band.replace(/[^a-zA-Z0-9]/g, '')}`
      ]
    },
    
    // Build sequence (order in which gear appears)
    buildSequence: [
      { step: 1, item: 'Bass Drums', duration: 8, cumulative: gearItems[0]?.estimatedPrice || 0 },
      { step: 2, item: 'Toms', duration: 10, cumulative: Math.round(totalCost * 0.3) },
      { step: 3, item: 'Snare', duration: 8, cumulative: Math.round(totalCost * 0.4) },
      { step: 4, item: 'Cymbals', duration: 12, cumulative: Math.round(totalCost * 0.7) },
      { step: 5, item: 'Hardware', duration: 10, cumulative: Math.round(totalCost * 0.85) },
      { step: 6, item: 'Accessories', duration: 8, cumulative: totalCost },
      { step: 7, item: 'Final Reveal', duration: 4, cumulative: totalCost }
    ],
    
    // Endorsements for brand mentions
    endorsements: drummer.endorsements || [],
    
    // Videos for reference
    referenceVideos: drummer.videos || [],
    
    // Quotes for potential overlay text
    quotes: drummer.quotes || [],
    
    // Timeline/eras (for historical context if needed)
    gearTimeline: drummer.gearTimeline || null
  };
}

// Main extraction
function main() {
  console.log('='.repeat(60));
  console.log('60-SECOND SETUP BUILD - Data Extraction');
  console.log('Issue #827: Viral Video Series');
  console.log('='.repeat(60));
  console.log();
  
  const videoData = [];
  
  for (const targetName of TARGET_DRUMMERS) {
    const drummer = drummers.find(d => d.name === targetName);
    
    if (!drummer) {
      console.error(`❌ Drummer not found: ${targetName}`);
      continue;
    }
    
    const data = extractDrummerData(drummer);
    videoData.push(data);
    
    console.log(`\n✅ ${data.name} (${data.band})`);
    console.log(`   Total Setup Cost: ${data.gear.totalCostFormatted}`);
    console.log(`   Gear Items: ${data.gear.items.length}`);
    console.log(`   Video Title: "${data.videoScript.title}"`);
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('SUMMARY');
  console.log('='.repeat(60));
  console.log(`Total drummers extracted: ${videoData.length}`);
  console.log(`Output file: video-production-data.json`);
  
  // Save to JSON
  const fs = require('fs');
  const outputPath = path.join(__dirname, 'video-production-data.json');
  fs.writeFileSync(outputPath, JSON.stringify(videoData, null, 2));
  console.log(`\n📁 Data saved to: ${outputPath}`);
  
  // Also output a simplified script sheet
  const scriptSheet = videoData.map(d => ({
    drummer: d.name,
    band: d.band,
    title: d.videoScript.title,
    subtitle: d.videoScript.subtitle,
    cta: d.videoScript.cta,
    hashtags: d.videoScript.hashtags.join(' '),
    gearBreakdown: d.gear.items.map(i => `${i.icon} ${i.category}: ${formatPrice(i.estimatedPrice)}`).join('\n'),
    totalCost: d.gear.totalCostFormatted,
    profileImage: d.profileImage
  }));
  
  const scriptPath = path.join(__dirname, 'video-scripts.json');
  fs.writeFileSync(scriptPath, JSON.stringify(scriptSheet, null, 2));
  console.log(`📝 Script sheet saved to: ${scriptPath}`);
  
  return videoData;
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { extractDrummerData, TARGET_DRUMMERS, main };
