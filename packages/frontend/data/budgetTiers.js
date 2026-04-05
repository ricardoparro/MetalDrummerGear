// Budget tier configuration - extracted for code splitting
export const BUDGET_TIERS = {
  entry: {
    id: 'entry',
    label: 'Entry Level',
    shortLabel: 'Entry',
    emoji: '🎯',
    color: '#22c55e',
    minPrice: 0,
    maxPrice: 2000,
    description: 'Great setups for beginners and budget-conscious drummers',
  },
  intermediate: {
    id: 'intermediate',
    label: 'Intermediate',
    shortLabel: 'Intermediate',
    emoji: '🔥',
    color: '#f59e0b',
    minPrice: 2000,
    maxPrice: 5000,
    description: 'Solid professional-grade gear without breaking the bank',
  },
  professional: {
    id: 'professional',
    label: 'Professional',
    shortLabel: 'Pro',
    emoji: '⭐',
    color: '#3b82f6',
    minPrice: 5000,
    maxPrice: 15000,
    description: 'High-end setups used by touring professionals',
  },
  premium: {
    id: 'premium',
    label: 'Premium',
    shortLabel: 'Premium',
    emoji: '👑',
    color: '#a855f7',
    minPrice: 15000,
    maxPrice: Infinity,
    description: 'The absolute best - signature series and custom builds',
  },
};

// Get budget tier for a given price (USD)
export function getBudgetTierForPrice(priceUsd) {
  if (!priceUsd || priceUsd <= 0) return null;
  for (const tier of Object.values(BUDGET_TIERS)) {
    if (priceUsd >= tier.minPrice && priceUsd < tier.maxPrice) {
      return tier.id;
    }
  }
  return 'premium'; // Fallback for very high prices
}

// Get budget tier for a given price (EUR - converts to USD internally)
export function getBudgetTier(priceEur) {
  if (!priceEur || priceEur <= 0) return null;
  // Convert EUR to USD using the rate from gearPrices.js
  const priceUsd = Math.round(priceEur * 1.08);
  return getBudgetTierForPrice(priceUsd);
}

// Get budget tier label
export function getBudgetTierLabel(tierId) {
  const tier = BUDGET_TIERS[tierId];
  return tier ? tier.shortLabel : 'Unknown';
}

// Get budget tier emoji
export function getBudgetTierEmoji(tierId) {
  const tier = BUDGET_TIERS[tierId];
  return tier ? tier.emoji : '🥁';
}

// Get budget tier full info
export function getBudgetTierInfo(tierId) {
  return BUDGET_TIERS[tierId] || null;
}

// Get budget tier color
export function getBudgetTierColor(tierId) {
  const tier = BUDGET_TIERS[tierId];
  return tier ? tier.color : '#7f7f8a'; // WCAG AA compliant fallback (~5.5:1 contrast)
}

// Format price range for display
export function formatPriceRange(minPrice, maxPrice) {
  if (maxPrice === Infinity) {
    return `$${minPrice.toLocaleString()}+`;
  }
  return `$${minPrice.toLocaleString()} - $${maxPrice.toLocaleString()}`;
}
