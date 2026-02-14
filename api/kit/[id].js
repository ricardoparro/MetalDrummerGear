// Vercel Serverless Function - Get Kit by ID
// Handles preset kits and custom saved kits

import { presetKits, gearCategories, calculateKitPrice, findMatchingDrummer } from './index.js';
import { drummers } from '../drummers/index.js';

// Simple in-memory store reference (in production, use a database)
// Note: This won't persist across function invocations in serverless
const customKits = new Map();

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.query;
  
  if (!id) {
    return res.status(400).json({ error: 'Kit ID is required' });
  }

  // Check preset kits first
  const presetKit = presetKits.find(k => k.id === id);
  if (presetKit) {
    const gearDetails = {};
    
    // Expand gear IDs to full gear objects
    for (const [category, gearId] of Object.entries(presetKit.gear)) {
      if (gearCategories[category] && gearId) {
        const gear = gearCategories[category].options.find(g => g.id === gearId);
        if (gear) {
          gearDetails[category] = {
            ...gear,
            category,
            categoryLabel: gearCategories[category].label,
            categoryIcon: gearCategories[category].icon
          };
        }
      }
    }

    return res.status(200).json({
      kit: {
        ...presetKit,
        isPreset: true,
        totalPrice: calculateKitPrice(presetKit.gear),
        gearDetails
      }
    });
  }

  // Check custom kits
  const customKit = customKits.get(id);
  if (customKit) {
    const gearDetails = {};
    
    for (const [category, gearId] of Object.entries(customKit.gear)) {
      if (gearCategories[category] && gearId) {
        const gear = gearCategories[category].options.find(g => g.id === gearId);
        if (gear) {
          gearDetails[category] = {
            ...gear,
            category,
            categoryLabel: gearCategories[category].label,
            categoryIcon: gearCategories[category].icon
          };
        }
      }
    }

    return res.status(200).json({
      kit: {
        ...customKit,
        isPreset: false,
        gearDetails
      }
    });
  }

  // Kit not found - try to parse as encoded gear data
  // Format: base64url encoded JSON of gear selections
  try {
    // Decode base64url to JSON
    const decoded = Buffer.from(id, 'base64url').toString('utf8');
    const gearData = JSON.parse(decoded);
    
    if (gearData && typeof gearData === 'object') {
      const gearDetails = {};
      
      for (const [category, gearId] of Object.entries(gearData)) {
        if (gearCategories[category] && gearId) {
          const gear = gearCategories[category].options.find(g => g.id === gearId);
          if (gear) {
            gearDetails[category] = {
              ...gear,
              category,
              categoryLabel: gearCategories[category].label,
              categoryIcon: gearCategories[category].icon
            };
          }
        }
      }

      const totalPrice = calculateKitPrice(gearData);
      const matchingDrummer = findMatchingDrummer(gearData, drummers);

      return res.status(200).json({
        kit: {
          id,
          name: 'Shared Metal Kit',
          gear: gearData,
          gearDetails,
          totalPrice,
          matchingDrummer,
          isPreset: false,
          isShared: true
        }
      });
    }
  } catch (e) {
    // Not a valid encoded kit, continue to 404
  }

  return res.status(404).json({ 
    error: 'Kit not found',
    message: 'This kit may have expired or the link is invalid.'
  });
}
