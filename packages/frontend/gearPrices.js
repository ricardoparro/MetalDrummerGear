// Gear Price Estimation Module
// Estimated prices in EUR based on Thomann/Sweetwater pricing
// Note: These are estimates - actual prices vary by retailer and availability

// Price estimates for common drum gear categories
// Prices represent typical street prices for professional/signature gear

export const GEAR_PRICES = {
  // Shell packs (drums only, no cymbals/hardware)
  drums: {
    // Premium/Signature series
    'Tama Star Classic Maple': 3500,
    'Tama Starclassic Maple': 3500,
    'Tama Starclassic Walnut/Birch': 3800,
    'Tama Starclassic Maple/Birch': 3600,
    'Tama Starclassic': 3500,
    'Tama Starclassic Bubinga': 4200,
    'Pearl Masters Premium Maple': 3200,
    'Pearl Masters Premium': 3200,
    'Pearl Masters Maple Complete': 2800,
    'Pearl Masterworks Custom': 4500,
    'Pearl Masterworks Stadium Exotic': 4800,
    'Pearl Reference Pure Shell Pack': 3500,
    'Pearl Reference Pure': 3500,
    'Sonor SQ2 Heavy Beech': 5500,
    'DW Collector\'s Series Maple': 5000,
    'Mapex Black Panther Design Lab': 2200,
    'Mapex Saturn V MH Exotic': 2600,
    'ddrum Vinnie Paul Signature Series': 2800,
    'ddrum Dios Series': 2400,
    'Orange County Drum & Percussion (OCDP) Custom': 3500,
    'OCDP Custom': 3500,
  },
  // Snare drums
  snare: {
    // Signature snares
    'Tama LU1465 Lars Ulrich Signature': 650,
    'Tama Gene Hoglan Signature': 550,
    'Tama Charlie Benante Signature': 550,
    'Tama Mike Portnoy Signature Melody Master': 600,
    'Tama S.L.P.': 450,
    'Tama Bell Brass': 800,
    'Pearl Joey Jordison Signature': 480,
    'Pearl Dave Lombardo Signature': 500,
    'Pearl George Kollias Signature': 520,
    'Pearl Reference': 550,
    'Sonor Tomas Haake Signature': 700,
    'Sonor Danny Carey Signature': 750,
    'DW Collector\'s Series': 650,
    'Mapex Chris Adler Signature': 400,
    'Mapex Black Panther Sledgehammer': 450,
    'ddrum Vinnie Paul Signature': 400,
    'ddrum Dios': 350,
    'OCDP': 450,
    'Pearl Sensitone': 350,
    'Ahead': 380,
  },
  // Cymbal setups (full set estimate)
  cymbals: {
    'Zildjian A Custom Series': 2200,
    'Zildjian A Custom': 2200,
    'Zildjian K Custom Series': 2500,
    'Zildjian K Custom': 2500,
    'Zildjian A Custom & K Custom': 2400,
    'Paiste RUDE Series': 2000,
    'Paiste RUDE & 2002 Series': 2200,
    'Paiste RUDE': 2000,
    'Paiste 2002': 2000,
    'Paiste Signature Series': 2800,
    'Paiste Signature': 2800,
    'Meinl Byzance Series': 2400,
    'Meinl Byzance Brilliant Series': 2500,
    'Meinl Byzance': 2400,
    'Sabian AAX Series': 1800,
    'Sabian AAX': 1800,
    'Sabian AA & AAX Series': 1900,
    'Sabian HHX Series': 2200,
    'Sabian HHX': 2200,
  },
  // Hardware (pedals, thrones, stands)
  hardware: {
    // Double pedals
    'Tama Iron Cobra 900 Power Glide Double Pedal': 450,
    'Tama Iron Cobra Power Glide Double Pedal': 450,
    'Tama Speed Cobra 910 Double Pedal': 500,
    'Tama Speed Cobra Double Pedal': 500,
    'Pearl Demon Drive Double Pedal': 550,
    'Pearl Eliminator Double Pedal': 400,
    'Sonor Giant Step Double Pedal': 600,
    'Sonor Giant Step Twin Effect Double Pedal': 650,
    'DW 9000 Series Double Pedal': 700,
    'Mapex Falcon Double Pedal': 450,
    'ddrum Double Pedal': 300,
    'ddrum Mercury Double Pedal': 350,
    // Thrones
    'Tama 1st Chair Throne': 250,
    'Tama 1st Chair Round Rider Throne': 280,
    'Tama 1st Chair Ergo-Rider Throne': 350,
    'Pearl D-2000 Throne': 200,
    'Pearl D-2000BR Throne': 220,
    'Pearl D-2000 Roadster Throne': 230,
    'Pearl D-3000 Throne': 280,
    'Pearl D-1500 Throne': 180,
    'Sonor Drummer Throne': 300,
    'DW 9100 Throne': 350,
    'Mapex T865 Throne': 200,
    'ddrum Throne': 150,
    // Electronics (when included)
    'Roland Electronics': 800,
    'Mandala Drum electronic pads': 1200,
  },
  // Drumsticks
  sticks: {
    'Ahead Lars Ulrich Signature Drumsticks': 45,
    'Ahead': 40,
    'Promark Joey Jordison Signature': 15,
    'Promark Ray Luzier Signature': 15,
    'Promark Mike Portnoy Signature': 15,
    'Promark ActiveGrip 5B': 18,
    'Promark 747 Rock Wood Tip': 12,
    'Promark': 12,
    'Vic Firth American Classic 5B': 12,
    'Vic Firth Tomas Haake Signature': 15,
    'Vic Firth George Kollias Signature': 15,
    'Vic Firth Eloy Casagrande Signature': 15,
    'Vic Firth Charlie Benante Signature': 15,
    'Vic Firth Danny Carey Signature': 15,
    'Vic Firth Chris Adler Signature': 15,
    'Vic Firth Matt Halpern Signature': 15,
    'Vic Firth X5A': 12,
    'Vic Firth': 12,
    'Vater 5B Wood Tip': 12,
    'Vater Brann Dailor Signature': 15,
    'Vater': 12,
  },
};

// EUR to USD conversion rate (approximate)
export const EUR_TO_USD = 1.08;

/**
 * Get estimated price for a gear item
 * Uses fuzzy matching to find the best price match
 * @param {string} gearDescription - Full gear description
 * @param {string} category - Category: drums, snare, cymbals, hardware, sticks
 * @returns {number} - Estimated price in EUR, or 0 if not found
 */
export function getGearPrice(gearDescription, category) {
  if (!gearDescription || !category) return 0;

  const prices = GEAR_PRICES[category];
  if (!prices) return 0;

  // Try exact match first
  for (const [key, price] of Object.entries(prices)) {
    if (gearDescription.includes(key)) {
      return price;
    }
  }

  // Try partial match on first word(s)
  const descLower = gearDescription.toLowerCase();
  for (const [key, price] of Object.entries(prices)) {
    if (descLower.includes(key.toLowerCase())) {
      return price;
    }
  }

  // Return default estimates by category if no match
  const defaults = {
    drums: 3000,
    snare: 500,
    cymbals: 2000,
    hardware: 800,
    sticks: 15,
  };

  return defaults[category] || 0;
}

/**
 * Calculate total kit cost from gear object
 * @param {Object} gear - Gear object with drums, snare, cymbals, hardware, sticks
 * @returns {Object} - Object with itemized prices and totals
 */
export function calculateKitCost(gear) {
  if (!gear) return null;

  const items = {
    drums: getGearPrice(gear.drums, 'drums'),
    snare: getGearPrice(gear.snare, 'snare'),
    cymbals: getGearPrice(gear.cymbals, 'cymbals'),
    hardware: getGearPrice(gear.hardware, 'hardware'),
    sticks: getGearPrice(gear.sticks, 'sticks'),
  };

  const totalEur = Object.values(items).reduce((sum, price) => sum + price, 0);
  const totalUsd = Math.round(totalEur * EUR_TO_USD);

  return {
    items,
    totalEur,
    totalUsd,
  };
}

/**
 * Format price for display
 * @param {number} price - Price value
 * @param {string} currency - 'EUR' or 'USD'
 * @returns {string} - Formatted price string
 */
export function formatPrice(price, currency = 'EUR') {
  if (currency === 'USD') {
    return `$${price.toLocaleString()}`;
  }
  return `€${price.toLocaleString()}`;
}
