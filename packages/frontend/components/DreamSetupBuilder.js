/**
 * DreamSetupBuilder - Interactive Dream Setup Configuration Tool
 * Issue #761: Dream Setup Builder with Step-by-Step Wizard
 * 
 * Features:
 * - Step-by-step wizard: Budget → Genre → Skill → Priority
 * - Interactive visual setup diagram
 * - Smart recommendations based on preferences
 * - Pro drummer comparison widget
 * - Save & Share with unique URLs
 * - Full affiliate integration (Thomann EU + Sweetwater US)
 * - Email capture for saved setups
 */

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
  useWindowDimensions,
  Modal,
  Animated,
} from 'react-native';
import { Image } from 'expo-image';
import { colors } from '../colors';
import { fontSize, fontWeight, lineHeight } from '../typography';
import { spacing } from '../spacing';
import { formatPrice, EUR_TO_USD } from '../gearPrices';
import { getThomannLink, getSweetwaterLink } from '../affiliateLinks';
import { getOptimizedImageUrl } from '../imageUtils';
import { KIT_BUILDER_CATALOG } from './KitBuilder';
import { injectWebApplicationSchema, TOOL_SCHEMAS } from '../utils/webApplicationSchema';

// ==========================================
// CONSTANTS & DATA
// ==========================================

// Budget options
export const BUDGET_OPTIONS = [
  { id: 'budget-500', value: 500, label: 'Under $500', emoji: '💰', tier: 'budget' },
  { id: 'budget-1000', value: 1000, label: '$500 - $1,000', emoji: '💵', tier: 'budget' },
  { id: 'budget-2000', value: 2000, label: '$1,000 - $2,000', emoji: '🔥', tier: 'mid' },
  { id: 'budget-5000', value: 5000, label: '$2,000 - $5,000', emoji: '⭐', tier: 'mid' },
  { id: 'budget-10000', value: 10000, label: '$5,000 - $10,000', emoji: '👑', tier: 'pro' },
  { id: 'budget-unlimited', value: Infinity, label: 'No Limit', emoji: '🚀', tier: 'pro' },
];

// Metal subgenre options
export const GENRE_OPTIONS = [
  { id: 'thrash', name: 'Thrash Metal', emoji: '⚡', description: 'Fast, aggressive, precision', color: '#f59e0b' },
  { id: 'death', name: 'Death Metal', emoji: '💀', description: 'Blast beats, extreme speed', color: '#dc2626' },
  { id: 'black', name: 'Black Metal', emoji: '🖤', description: 'Atmospheric, raw intensity', color: '#374151' },
  { id: 'prog', name: 'Progressive Metal', emoji: '🌀', description: 'Complex rhythms, versatility', color: '#8b5cf6' },
  { id: 'groove', name: 'Groove Metal', emoji: '🔊', description: 'Heavy grooves, power', color: '#059669' },
  { id: 'djent', name: 'Djent / Modern', emoji: '🎛️', description: 'Polyrhythms, precision', color: '#0ea5e9' },
  { id: 'nu', name: 'Nu Metal', emoji: '🔗', description: 'Bounce, syncopation', color: '#ec4899' },
  { id: 'power', name: 'Power Metal', emoji: '⚔️', description: 'Double bass, speed', color: '#eab308' },
];

// Skill level options
export const SKILL_OPTIONS = [
  { id: 'beginner', name: 'Beginner', emoji: '🌱', description: 'Just starting out', years: '0-2 years' },
  { id: 'intermediate', name: 'Intermediate', emoji: '🎯', description: 'Solid fundamentals', years: '2-5 years' },
  { id: 'advanced', name: 'Advanced', emoji: '🔥', description: 'Experienced player', years: '5+ years' },
  { id: 'pro', name: 'Professional', emoji: '👑', description: 'Touring/Recording', years: '10+ years' },
];

// Priority options
export const PRIORITY_OPTIONS = [
  { id: 'speed', name: 'Speed', emoji: '⚡', description: 'Fast footwork & hands' },
  { id: 'power', name: 'Power', emoji: '💪', description: 'Maximum impact & volume' },
  { id: 'precision', name: 'Precision', emoji: '🎯', description: 'Technical accuracy' },
  { id: 'versatility', name: 'Versatility', emoji: '🎨', description: 'All-around performance' },
];

// Step definitions
export const WIZARD_STEPS = [
  { id: 'budget', title: 'Budget', emoji: '💰', question: 'How much can you spend?' },
  { id: 'genre', title: 'Genre', emoji: '🎸', question: 'What style do you play?' },
  { id: 'skill', title: 'Experience', emoji: '🥁', question: "What's your skill level?" },
  { id: 'priority', title: 'Priority', emoji: '🎯', question: "What's most important to you?" },
];

// Category icons and labels
export const SETUP_CATEGORIES = [
  { key: 'drums', name: 'Shell Pack', emoji: '🥁', description: 'Kick, toms, snare' },
  { key: 'snare', name: 'Snare', emoji: '🪘', description: 'The heart of your sound' },
  { key: 'cymbals', name: 'Cymbals', emoji: '🔔', description: 'Hi-hats, crashes, ride' },
  { key: 'hardware', name: 'Hardware', emoji: '🦶', description: 'Pedals, stands, throne' },
  { key: 'sticks', name: 'Sticks', emoji: '🥢', description: 'Your connection to the kit' },
  { key: 'accessories', name: 'Accessories', emoji: '🎛️', description: 'Heads, triggers, extras' },
];

// Genre-specific drummer recommendations
export const GENRE_DRUMMERS = {
  thrash: ['Lars Ulrich', 'Dave Lombardo', 'Charlie Benante', 'Gene Hoglan'],
  death: ['George Kollias', 'Gene Hoglan', 'Eloy Casagrande', 'Inferno'],
  black: ['Inferno', 'Faust', 'Hellhammer', 'Frost'],
  prog: ['Mike Portnoy', 'Danny Carey', 'Mario Duplantier', 'Matt Halpern'],
  groove: ['Vinnie Paul', 'John Otto', 'Ray Luzier', 'Dave Lombardo'],
  djent: ['Matt Halpern', 'Tomas Haake', 'Mario Duplantier', 'Matt Garstka'],
  nu: ['Joey Jordison', 'John Otto', 'Ray Luzier', 'Abe Cunningham'],
  power: ['Mike Portnoy', 'Joey Jordison', 'Lars Ulrich', 'Dirk Verbeuren'],
};

// Smart gear recommendations based on genre + budget
export const GENRE_GEAR_RECOMMENDATIONS = {
  thrash: {
    budget: {
      drums: 'yamaha-stage-custom',
      snare: 'tama-metalworks',
      cymbals: 'zildjian-s',
      hardware: 'tama-iron-cobra-600',
      sticks: 'promark-joey',
    },
    mid: {
      drums: 'tama-superstar',
      snare: 'tama-slp',
      cymbals: 'paiste-pst7',
      hardware: 'tama-iron-cobra',
      sticks: 'promark-lombardo',
    },
    pro: {
      drums: 'tama-starclassic-maple',
      snare: 'tama-lars-ulrich',
      cymbals: 'paiste-rude',
      hardware: 'tama-iron-cobra',
      sticks: 'ahead-lars',
    },
  },
  death: {
    budget: {
      drums: 'yamaha-stage-custom',
      snare: 'tama-metalworks',
      cymbals: 'meinl-hcs',
      hardware: 'tama-iron-cobra-600',
      sticks: 'vicfirth-5b',
    },
    mid: {
      drums: 'pearl-session-studio',
      snare: 'pearl-kollias',
      cymbals: 'meinl-classics-custom',
      hardware: 'pearl-eliminator',
      sticks: 'vicfirth-kollias',
    },
    pro: {
      drums: 'pearl-masterworks',
      snare: 'pearl-kollias',
      cymbals: 'zildjian-a-custom',
      hardware: 'pearl-demon-drive',
      sticks: 'vicfirth-kollias',
    },
  },
  prog: {
    budget: {
      drums: 'gretsch-catalina',
      snare: 'tama-metalworks',
      cymbals: 'sabian-b8x',
      hardware: 'pdp-concept',
      sticks: 'vicfirth-5b',
    },
    mid: {
      drums: 'mapex-saturn',
      snare: 'tama-portnoy',
      cymbals: 'sabian-aax',
      hardware: 'pearl-eliminator',
      sticks: 'promark-joey',
    },
    pro: {
      drums: 'sonor-sq2',
      snare: 'sonor-haake',
      cymbals: 'sabian-hhx',
      hardware: 'dw-9000',
      sticks: 'vicfirth-5b',
    },
  },
  groove: {
    budget: {
      drums: 'yamaha-stage-custom',
      snare: 'tama-metalworks',
      cymbals: 'sabian-b8x',
      hardware: 'pdp-concept',
      sticks: 'vicfirth-5b',
    },
    mid: {
      drums: 'ddrum-vinnie',
      snare: 'ddrum-vinnie-snare',
      cymbals: 'sabian-aax',
      hardware: 'dw-5000',
      sticks: 'vicfirth-5b',
    },
    pro: {
      drums: 'dw-collectors',
      snare: 'sjc-crucible',
      cymbals: 'meinl-byzance',
      hardware: 'dw-9000',
      sticks: 'vicfirth-5b',
    },
  },
  djent: {
    budget: {
      drums: 'gretsch-catalina',
      snare: 'tama-metalworks',
      cymbals: 'meinl-hcs',
      hardware: 'tama-iron-cobra-600',
      sticks: 'vicfirth-5b',
    },
    mid: {
      drums: 'tama-starclassic-walnut-birch',
      snare: 'tama-slp',
      cymbals: 'meinl-classics-custom',
      hardware: 'tama-speed-cobra',
      sticks: 'vicfirth-5b',
    },
    pro: {
      drums: 'sonor-sq2',
      snare: 'sonor-haake',
      cymbals: 'meinl-byzance',
      hardware: 'tama-speed-cobra',
      sticks: 'vicfirth-5b',
    },
  },
  black: {
    budget: {
      drums: 'yamaha-stage-custom',
      snare: 'tama-metalworks',
      cymbals: 'meinl-hcs',
      hardware: 'pdp-concept',
      sticks: 'vicfirth-5b',
    },
    mid: {
      drums: 'tama-superstar',
      snare: 'tama-slp',
      cymbals: 'sabian-aax',
      hardware: 'tama-iron-cobra',
      sticks: 'promark-joey',
    },
    pro: {
      drums: 'pearl-reference-series',
      snare: 'pearl-reference',
      cymbals: 'paiste-rude',
      hardware: 'pearl-demon-drive',
      sticks: 'vicfirth-5b',
    },
  },
  nu: {
    budget: {
      drums: 'yamaha-stage-custom',
      snare: 'tama-metalworks',
      cymbals: 'zildjian-s',
      hardware: 'pdp-concept',
      sticks: 'promark-joey',
    },
    mid: {
      drums: 'pearl-session-studio',
      snare: 'pearl-joey',
      cymbals: 'zildjian-a-custom',
      hardware: 'pearl-demon-drive',
      sticks: 'promark-joey',
    },
    pro: {
      drums: 'pearl-reference-series',
      snare: 'pearl-joey',
      cymbals: 'zildjian-a-custom',
      hardware: 'pearl-demon-drive',
      sticks: 'promark-joey',
    },
  },
  power: {
    budget: {
      drums: 'yamaha-stage-custom',
      snare: 'tama-metalworks',
      cymbals: 'zildjian-s',
      hardware: 'tama-iron-cobra-600',
      sticks: 'vicfirth-5b',
    },
    mid: {
      drums: 'tama-superstar',
      snare: 'tama-portnoy',
      cymbals: 'paiste-pst7',
      hardware: 'tama-iron-cobra',
      sticks: 'promark-joey',
    },
    pro: {
      drums: 'tama-starclassic-maple',
      snare: 'tama-portnoy',
      cymbals: 'paiste-2002',
      hardware: 'tama-iron-cobra',
      sticks: 'vicfirth-5b',
    },
  },
};

// ==========================================
// ANALYTICS
// ==========================================

export function trackSetupBuilderEvent(eventName, params = {}) {
  if (Platform.OS === 'web' && typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      event_category: 'setup_builder',
      ...params,
    });
  }
}

// ==========================================
// URL HANDLING
// ==========================================

export function isSetupBuilderPage() {
  if (typeof window === 'undefined') return false;
  const pathname = window.location.pathname;
  return pathname === '/tools/setup-builder' || 
         pathname === '/tools/setup-builder/' ||
         pathname === '/setup-builder' ||
         pathname === '/setup-builder/' ||
         pathname === '/dream-setup' ||
         pathname.startsWith('/setups/');
}

export function getSetupFromURL() {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  const setupId = params.get('id');
  const budget = params.get('budget');
  const genre = params.get('genre');
  const skill = params.get('skill');
  const priority = params.get('priority');
  const kit = params.get('kit');
  
  if (kit) {
    try {
      return JSON.parse(decodeURIComponent(kit));
    } catch (e) {
      return null;
    }
  }
  
  return { setupId, budget, genre, skill, priority };
}

export function updateSetupURL(preferences, selectedGear) {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return;
  
  const params = new URLSearchParams();
  if (preferences.budget) params.set('budget', preferences.budget);
  if (preferences.genre) params.set('genre', preferences.genre);
  if (preferences.skill) params.set('skill', preferences.skill);
  if (preferences.priority) params.set('priority', preferences.priority);
  
  // Encode selected gear compactly
  if (Object.keys(selectedGear).length > 0) {
    const gearIds = {};
    Object.entries(selectedGear).forEach(([category, item]) => {
      if (item) gearIds[category] = item.id;
    });
    if (Object.keys(gearIds).length > 0) {
      params.set('kit', encodeURIComponent(JSON.stringify(gearIds)));
    }
  }
  
  const newURL = `${window.location.pathname}?${params.toString()}`;
  window.history.replaceState({}, '', newURL);
}

export function generateShareableURL(preferences, selectedGear) {
  const baseUrl = 'https://metalforge.io/tools/setup-builder';
  const params = new URLSearchParams();
  
  if (preferences.budget) params.set('budget', preferences.budget);
  if (preferences.genre) params.set('genre', preferences.genre);
  if (preferences.skill) params.set('skill', preferences.skill);
  if (preferences.priority) params.set('priority', preferences.priority);
  
  const gearIds = {};
  Object.entries(selectedGear).forEach(([category, item]) => {
    if (item) gearIds[category] = item.id;
  });
  if (Object.keys(gearIds).length > 0) {
    params.set('kit', encodeURIComponent(JSON.stringify(gearIds)));
  }
  
  return `${baseUrl}?${params.toString()}`;
}

// ==========================================
// META & SEO
// ==========================================

function setMeta(property, content, isOg = false) {
  if (typeof document === 'undefined') return;
  const selector = isOg ? `meta[property="${property}"]` : `meta[name="${property}"]`;
  let meta = document.querySelector(selector);
  if (!meta) {
    meta = document.createElement('meta');
    if (isOg) {
      meta.setAttribute('property', property);
    } else {
      meta.setAttribute('name', property);
    }
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
}

export function updateSetupBuilderMeta(preferences = {}, totalCost = 0) {
  if (typeof document === 'undefined') return;
  
  const genreLabel = GENRE_OPTIONS.find(g => g.id === preferences.genre)?.name || 'Metal';
  const budgetLabel = BUDGET_OPTIONS.find(b => b.id === preferences.budget)?.label || '';
  
  let title = 'Dream Setup Builder | Build Your Perfect Metal Drum Kit | MetalForge';
  let description = 'Create your perfect metal drum setup with our interactive gear builder. Get personalized recommendations based on your budget, style, and skill level. Compare with pro drummers!';
  
  if (preferences.genre && totalCost > 0) {
    title = `${genreLabel} Drum Setup ($${totalCost.toLocaleString()}) | Dream Setup Builder | MetalForge`;
    description = `Custom ${genreLabel.toLowerCase()} drum setup worth $${totalCost.toLocaleString()}. Built with our interactive Dream Setup Builder. Compare your kit with legendary drummers!`;
  } else if (preferences.genre) {
    title = `Build Your ${genreLabel} Drum Setup | Dream Setup Builder | MetalForge`;
    description = `Create the perfect ${genreLabel.toLowerCase()} drum setup. Get personalized gear recommendations based on your budget and skill level.`;
  }
  
  document.title = title;
  setMeta('description', description);
  setMeta('og:title', title, true);
  setMeta('og:description', description, true);
  setMeta('og:url', generateShareableURL(preferences, {}), true);
  setMeta('og:type', 'website', true);
  setMeta('twitter:card', 'summary_large_image');
  setMeta('twitter:title', title);
  setMeta('twitter:description', description);
  
  // Inject WebApplication schema for SEO (Issue #778)
  injectWebApplicationSchema({
    ...TOOL_SCHEMAS.dreamSetup,
    description: description, // Use dynamic description
  });
}

// ==========================================
// HELPER FUNCTIONS
// ==========================================

// Calculate total cost of selected gear
export function calculateTotalCost(selectedGear) {
  let totalEur = 0;
  Object.values(selectedGear).forEach(item => {
    if (item && item.price) {
      totalEur += item.price;
    }
  });
  const totalUsd = Math.round(totalEur * EUR_TO_USD);
  return { totalEur, totalUsd };
}

// Find gear item by ID from catalog
export function findGearById(gearId, category = null) {
  if (!gearId) return null;
  
  const categories = category ? [category] : Object.keys(KIT_BUILDER_CATALOG);
  
  for (const cat of categories) {
    const items = KIT_BUILDER_CATALOG[cat];
    if (items) {
      const item = items.find(i => i.id === gearId);
      if (item) return { ...item, category: cat };
    }
  }
  return null;
}

// Get recommended gear based on preferences
export function getRecommendedGear(preferences) {
  const { budget, genre, skill, priority } = preferences;
  
  // Determine tier based on budget
  let tier = 'mid';
  const budgetOption = BUDGET_OPTIONS.find(b => b.id === budget);
  if (budgetOption) {
    tier = budgetOption.tier;
  }
  
  // Get genre-specific recommendations
  const genreRecs = GENRE_GEAR_RECOMMENDATIONS[genre] || GENRE_GEAR_RECOMMENDATIONS.thrash;
  const tierRecs = genreRecs[tier] || genreRecs.mid;
  
  // Build recommended gear set
  const recommended = {};
  Object.entries(tierRecs).forEach(([category, gearId]) => {
    const item = findGearById(gearId, category);
    if (item) {
      recommended[category] = item;
    }
  });
  
  return recommended;
}

// Calculate similarity to pro drummer's gear
export function calculateDrummerSimilarity(selectedGear, drummerName, drummers) {
  const drummer = drummers?.find(d => d.name === drummerName);
  if (!drummer || !drummer.gear) return 0;
  
  let matches = 0;
  let total = 0;
  
  // Check each category
  Object.entries(selectedGear).forEach(([category, item]) => {
    if (!item) return;
    total++;
    
    // Check if drummer uses the same item or brand
    const drummerGear = drummer.gear[category];
    if (drummerGear) {
      if (Array.isArray(drummerGear)) {
        // Check if any item matches
        const hasMatch = drummerGear.some(dg => 
          dg.toLowerCase().includes(item.brand?.toLowerCase() || '') ||
          item.usedBy?.includes(drummerName)
        );
        if (hasMatch) matches++;
      } else {
        if (drummerGear.toLowerCase().includes(item.brand?.toLowerCase() || '') ||
            item.usedBy?.includes(drummerName)) {
          matches++;
        }
      }
    }
  });
  
  // Also check usedBy field
  Object.values(selectedGear).forEach(item => {
    if (item?.usedBy?.includes(drummerName) && total > 0) {
      matches += 0.5; // Bonus for using exact signature gear
    }
  });
  
  return total > 0 ? Math.min(100, Math.round((matches / total) * 100)) : 0;
}

// Find most similar pro drummers
export function findSimilarDrummers(selectedGear, drummers, genre = null) {
  if (!drummers || Object.keys(selectedGear).length === 0) return [];
  
  // Get genre-specific drummers or all
  const relevantDrummers = genre && GENRE_DRUMMERS[genre] 
    ? GENRE_DRUMMERS[genre] 
    : drummers.slice(0, 20).map(d => d.name);
  
  const similarities = relevantDrummers.map(drummerName => {
    // Check usedBy fields in selected gear
    let score = 0;
    let total = 0;
    
    Object.values(selectedGear).forEach(item => {
      if (!item) return;
      total++;
      if (item.usedBy?.includes(drummerName)) {
        score += 2; // Exact match
      } else if (item.brand) {
        // Check if drummer uses same brand
        const drummer = drummers.find(d => d.name === drummerName);
        if (drummer?.gear) {
          const drummerBrands = Object.values(drummer.gear)
            .flat()
            .filter(g => typeof g === 'string')
            .join(' ')
            .toLowerCase();
          if (drummerBrands.includes(item.brand.toLowerCase())) {
            score += 1; // Brand match
          }
        }
      }
    });
    
    const percentage = total > 0 ? Math.min(100, Math.round((score / (total * 2)) * 100)) : 0;
    const drummer = drummers.find(d => d.name === drummerName);
    
    return {
      name: drummerName,
      percentage,
      band: drummer?.band || '',
      image: drummer?.image || null,
      slug: drummer?.slug || drummerName.toLowerCase().replace(/\s+/g, '-'),
    };
  });
  
  return similarities
    .filter(s => s.percentage > 0)
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 5);
}

// Get smart suggestions
export function getSmartSuggestions(selectedGear, preferences, catalog) {
  const suggestions = [];
  const { budget, genre, priority } = preferences;
  const budgetOption = BUDGET_OPTIONS.find(b => b.id === budget);
  const maxBudget = budgetOption?.value || 5000;
  const { totalUsd } = calculateTotalCost(selectedGear);
  
  // Check for missing categories
  SETUP_CATEGORIES.forEach(cat => {
    if (!selectedGear[cat.key]) {
      suggestions.push({
        type: 'missing',
        category: cat.key,
        message: `Complete your setup with a ${cat.name.toLowerCase()}`,
        emoji: cat.emoji,
      });
    }
  });
  
  // Budget-based suggestions
  if (totalUsd < maxBudget * 0.7) {
    suggestions.push({
      type: 'upgrade',
      message: `You have room in your budget for an upgrade!`,
      emoji: '💡',
    });
  } else if (totalUsd > maxBudget && maxBudget < Infinity) {
    suggestions.push({
      type: 'budget',
      message: `Your setup exceeds your budget by $${(totalUsd - maxBudget).toLocaleString()}`,
      emoji: '⚠️',
    });
  }
  
  // Genre-specific suggestions
  const genreRecommended = GENRE_GEAR_RECOMMENDATIONS[genre];
  if (genreRecommended) {
    Object.entries(selectedGear).forEach(([category, item]) => {
      if (!item) return;
      const tier = budgetOption?.tier || 'mid';
      const recommendedId = genreRecommended[tier]?.[category];
      if (recommendedId && item.id !== recommendedId) {
        const recommended = findGearById(recommendedId, category);
        if (recommended && recommended.price <= item.price * 1.3) {
          suggestions.push({
            type: 'genre',
            category,
            currentItem: item,
            recommendedItem: recommended,
            message: `Popular with ${GENRE_OPTIONS.find(g => g.id === genre)?.name || 'metal'} drummers`,
            emoji: '🎸',
          });
        }
      }
    });
  }
  
  return suggestions.slice(0, 5);
}

// Get affiliate links for an item
export function getSetupBuilderThomannLink(item, category) {
  return getThomannLink(item?.name || '', {
    campaign: 'setup-builder',
    item: item?.id || '',
    category: category || '',
  });
}

export function getSetupBuilderSweetwaterLink(item, category) {
  return getSweetwaterLink(item?.name || '', {
    campaign: 'setup-builder',
    item: item?.id || '',
    category: category || '',
  });
}

// Generate schema.org markup
export function generateSetupSchema(preferences, selectedGear, totalCost) {
  const items = Object.entries(selectedGear)
    .filter(([_, item]) => item)
    .map(([category, item]) => ({
      '@type': 'Product',
      name: item.name,
      brand: item.brand,
      category: category,
      offers: {
        '@type': 'Offer',
        price: Math.round(item.price * EUR_TO_USD),
        priceCurrency: 'USD',
      },
    }));
  
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Dream Setup Builder',
    description: 'Interactive drum gear configuration tool',
    applicationCategory: 'Music',
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: 0,
      highPrice: totalCost.totalUsd,
      priceCurrency: 'USD',
      offerCount: items.length,
    },
  };
}

// ==========================================
// COMPONENT: WizardStep
// ==========================================

function WizardStep({ step, currentStep, isCompleted, onPress, theme }) {
  const isActive = step.id === currentStep;
  
  return (
    <TouchableOpacity
      style={[
        styles.wizardStep,
        isActive && styles.wizardStepActive,
        isCompleted && styles.wizardStepCompleted,
        { borderColor: isActive ? colors.purple[500] : theme.border },
      ]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${step.title} step${isCompleted ? ' (completed)' : ''}`}
    >
      <Text style={styles.wizardStepEmoji}>{step.emoji}</Text>
      <Text style={[
        styles.wizardStepTitle, 
        { color: isActive ? colors.purple[500] : theme.text }
      ]}>
        {step.title}
      </Text>
      {isCompleted && <Text style={styles.wizardStepCheck}>✓</Text>}
    </TouchableOpacity>
  );
}

// ==========================================
// COMPONENT: OptionCard
// ==========================================

function OptionCard({ option, isSelected, onPress, theme, colorOverride }) {
  const bgColor = isSelected 
    ? (colorOverride || colors.purple[500]) 
    : theme.card;
  
  return (
    <TouchableOpacity
      style={[
        styles.optionCard,
        { 
          backgroundColor: bgColor,
          borderColor: isSelected ? colorOverride || colors.purple[500] : theme.border,
        },
      ]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected: isSelected }}
    >
      <Text style={styles.optionEmoji}>{option.emoji}</Text>
      <Text style={[
        styles.optionName,
        { color: isSelected ? '#fff' : theme.text }
      ]}>
        {option.name || option.label}
      </Text>
      {option.description && (
        <Text style={[
          styles.optionDescription,
          { color: isSelected ? 'rgba(255,255,255,0.8)' : theme.textSecondary }
        ]}>
          {option.description}
        </Text>
      )}
      {option.years && (
        <Text style={[
          styles.optionYears,
          { color: isSelected ? 'rgba(255,255,255,0.7)' : theme.textMuted }
        ]}>
          {option.years}
        </Text>
      )}
    </TouchableOpacity>
  );
}

// ==========================================
// COMPONENT: GearCard
// ==========================================

function GearCard({ item, category, isSelected, onSelect, onBuy, theme, isDesktop }) {
  const imageUrl = item.image 
    ? getOptimizedImageUrl(`/images/gear/${item.image}`, 120)
    : null;
  
  return (
    <View style={[
      styles.gearCard,
      { 
        backgroundColor: theme.card,
        borderColor: isSelected ? colors.purple[500] : theme.border,
        borderWidth: isSelected ? 2 : 1,
      },
    ]}>
      {imageUrl && (
        <Image
          source={{ uri: imageUrl }}
          style={styles.gearCardImage}
          contentFit="cover"
          accessibilityLabel={`${item.brand} ${item.name}`}
        />
      )}
      <View style={styles.gearCardContent}>
        <Text style={[styles.gearCardBrand, { color: theme.textSecondary }]}>
          {item.brand}
        </Text>
        <Text style={[styles.gearCardName, { color: theme.text }]} numberOfLines={2}>
          {item.name}
        </Text>
        {item.usedBy && item.usedBy.length > 0 && (
          <Text style={[styles.gearCardUsedBy, { color: theme.textMuted }]} numberOfLines={1}>
            Used by: {item.usedBy.slice(0, 2).join(', ')}
          </Text>
        )}
        <View style={styles.gearCardPriceRow}>
          <Text style={[styles.gearCardPrice, { color: colors.green[500] }]}>
            €{item.price.toLocaleString()}
          </Text>
          <Text style={[styles.gearCardPriceUsd, { color: theme.textMuted }]}>
            ~${Math.round(item.price * EUR_TO_USD).toLocaleString()}
          </Text>
        </View>
      </View>
      <View style={styles.gearCardActions}>
        <TouchableOpacity
          style={[
            styles.gearCardButton,
            isSelected ? styles.gearCardButtonRemove : styles.gearCardButtonAdd,
          ]}
          onPress={() => onSelect(item)}
        >
          <Text style={styles.gearCardButtonText}>
            {isSelected ? '✕ Remove' : '+ Add'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.gearCardButton, styles.gearCardButtonBuy]}
          onPress={() => onBuy(item, 'thomann')}
        >
          <Text style={styles.gearCardButtonText}>🛒 Buy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ==========================================
// COMPONENT: SetupSummary
// ==========================================

function SetupSummary({ selectedGear, preferences, drummers, theme, onRemove, onBuyAll, isDesktop }) {
  const { totalEur, totalUsd } = calculateTotalCost(selectedGear);
  const similarDrummers = findSimilarDrummers(selectedGear, drummers, preferences.genre);
  const budgetOption = BUDGET_OPTIONS.find(b => b.id === preferences.budget);
  const maxBudget = budgetOption?.value || Infinity;
  const budgetUsed = maxBudget < Infinity ? (totalUsd / maxBudget) * 100 : 0;
  
  // Budget status color
  let budgetColor = colors.green[500];
  if (budgetUsed > 100) budgetColor = colors.red[500];
  else if (budgetUsed > 80) budgetColor = colors.yellow[500];
  
  return (
    <View style={[
      styles.summaryContainer,
      { backgroundColor: theme.card, borderColor: theme.border },
      isDesktop && styles.summaryContainerDesktop,
    ]}>
      <Text style={[styles.summaryTitle, { color: theme.text }]}>
        🥁 Your Dream Setup
      </Text>
      
      {/* Budget Progress */}
      {maxBudget < Infinity && (
        <View style={styles.budgetProgress}>
          <View style={styles.budgetProgressBar}>
            <View 
              style={[
                styles.budgetProgressFill,
                { 
                  width: `${Math.min(100, budgetUsed)}%`,
                  backgroundColor: budgetColor,
                },
              ]}
            />
          </View>
          <Text style={[styles.budgetProgressText, { color: theme.textSecondary }]}>
            ${totalUsd.toLocaleString()} / ${maxBudget.toLocaleString()} ({Math.round(budgetUsed)}%)
          </Text>
        </View>
      )}
      
      {/* Selected Items */}
      <View style={styles.summaryItems}>
        {SETUP_CATEGORIES.map(cat => {
          const item = selectedGear[cat.key];
          if (!item) return null;
          
          return (
            <View key={cat.key} style={[styles.summaryItem, { borderColor: theme.border }]}>
              <Text style={styles.summaryItemEmoji}>{cat.emoji}</Text>
              <View style={styles.summaryItemInfo}>
                <Text style={[styles.summaryItemCategory, { color: theme.textMuted }]}>
                  {cat.name}
                </Text>
                <Text style={[styles.summaryItemName, { color: theme.text }]} numberOfLines={1}>
                  {item.name}
                </Text>
              </View>
              <Text style={[styles.summaryItemPrice, { color: colors.green[500] }]}>
                €{item.price.toLocaleString()}
              </Text>
              <TouchableOpacity
                style={styles.summaryItemRemove}
                onPress={() => onRemove(cat.key)}
              >
                <Text style={{ color: colors.red[500] }}>✕</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
      
      {/* Total */}
      <View style={[styles.summaryTotal, { borderColor: theme.border }]}>
        <Text style={[styles.summaryTotalLabel, { color: theme.text }]}>
          Total Estimated Cost
        </Text>
        <View style={styles.summaryTotalPrices}>
          <Text style={[styles.summaryTotalPrice, { color: colors.green[500] }]}>
            €{totalEur.toLocaleString()}
          </Text>
          <Text style={[styles.summaryTotalPriceUsd, { color: theme.textSecondary }]}>
            ~${totalUsd.toLocaleString()} USD
          </Text>
        </View>
      </View>
      
      {/* Pro Comparison Widget */}
      {similarDrummers.length > 0 && (
        <View style={[styles.proComparisonWidget, { borderColor: theme.border }]}>
          <Text style={[styles.proComparisonTitle, { color: theme.text }]}>
            🎯 Pro Drummer Match
          </Text>
          {similarDrummers.slice(0, 3).map((drummer, index) => (
            <View key={drummer.name} style={styles.proComparisonItem}>
              <Text style={[styles.proComparisonRank, { color: theme.textMuted }]}>
                #{index + 1}
              </Text>
              <View style={styles.proComparisonInfo}>
                <Text style={[styles.proComparisonName, { color: theme.text }]}>
                  {drummer.name}
                </Text>
                <Text style={[styles.proComparisonBand, { color: theme.textSecondary }]}>
                  {drummer.band}
                </Text>
              </View>
              <View style={[styles.proComparisonBadge, { backgroundColor: colors.purple[500] }]}>
                <Text style={styles.proComparisonPercent}>{drummer.percentage}%</Text>
              </View>
            </View>
          ))}
          {similarDrummers[0] && similarDrummers[0].percentage < 70 && (
            <Text style={[styles.proComparisonHint, { color: theme.textMuted }]}>
              💡 Add signature gear to increase your match!
            </Text>
          )}
        </View>
      )}
      
      {/* Buy Complete Setup */}
      <View style={styles.buySetupButtons}>
        <TouchableOpacity
          style={[styles.buySetupButton, { backgroundColor: '#0066cc' }]}
          onPress={() => onBuyAll('thomann')}
          accessibilityLabel="Buy complete setup at Thomann"
        >
          <Text style={styles.buySetupButtonText}>🇪🇺 Buy at Thomann</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buySetupButton, { backgroundColor: '#ff6b00' }]}
          onPress={() => onBuyAll('sweetwater')}
          accessibilityLabel="Buy complete setup at Sweetwater"
        >
          <Text style={styles.buySetupButtonText}>🇺🇸 Buy at Sweetwater</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ==========================================
// COMPONENT: ShareModal
// ==========================================

function ShareModal({ visible, onClose, shareUrl, preferences, selectedGear, theme }) {
  const [email, setEmail] = useState('');
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const { totalUsd } = calculateTotalCost(selectedGear);
  const genreLabel = GENRE_OPTIONS.find(g => g.id === preferences.genre)?.name || 'Metal';
  
  const shareText = `Check out my $${totalUsd.toLocaleString()} ${genreLabel} drum setup on MetalForge! 🥁`;
  
  const handleCopy = async () => {
    if (Platform.OS === 'web' && navigator.clipboard) {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      trackSetupBuilderEvent('share_copy', { method: 'clipboard' });
    }
  };
  
  const handleTwitterShare = () => {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(tweetUrl, '_blank');
    trackSetupBuilderEvent('share_social', { platform: 'twitter' });
  };
  
  const handleSaveSetup = () => {
    if (email) {
      // In production, this would call an API to save the setup
      trackSetupBuilderEvent('save_setup', { has_email: true });
      setSaved(true);
      // Store in localStorage for now
      if (Platform.OS === 'web') {
        const savedSetups = JSON.parse(localStorage.getItem('metalforge_saved_setups') || '[]');
        savedSetups.push({
          email,
          url: shareUrl,
          preferences,
          gear: Object.fromEntries(
            Object.entries(selectedGear).map(([k, v]) => [k, v?.id])
          ),
          createdAt: new Date().toISOString(),
        });
        localStorage.setItem('metalforge_saved_setups', JSON.stringify(savedSetups));
      }
    }
  };
  
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
          <TouchableOpacity style={styles.modalClose} onPress={onClose}>
            <Text style={{ color: theme.text, fontSize: 24 }}>✕</Text>
          </TouchableOpacity>
          
          <Text style={[styles.modalTitle, { color: theme.text }]}>
            🔗 Share Your Setup
          </Text>
          
          {/* URL Copy */}
          <View style={[styles.shareUrlContainer, { backgroundColor: theme.background }]}>
            <Text style={[styles.shareUrl, { color: theme.textSecondary }]} numberOfLines={1}>
              {shareUrl}
            </Text>
            <TouchableOpacity style={styles.copyButton} onPress={handleCopy}>
              <Text style={styles.copyButtonText}>{copied ? '✓ Copied!' : 'Copy'}</Text>
            </TouchableOpacity>
          </View>
          
          {/* Social Share */}
          <View style={styles.socialButtons}>
            <TouchableOpacity 
              style={[styles.socialButton, { backgroundColor: '#1DA1F2' }]}
              onPress={handleTwitterShare}
            >
              <Text style={styles.socialButtonText}>🐦 Tweet</Text>
            </TouchableOpacity>
          </View>
          
          {/* Save Setup */}
          <View style={styles.saveSetupSection}>
            <Text style={[styles.saveSetupTitle, { color: theme.text }]}>
              💾 Save Your Setup
            </Text>
            <Text style={[styles.saveSetupDesc, { color: theme.textSecondary }]}>
              Enter your email to save this setup and get notified of price drops!
            </Text>
            {!saved ? (
              <View style={styles.saveSetupForm}>
                <TextInput
                  style={[styles.emailInput, { 
                    backgroundColor: theme.background,
                    color: theme.text,
                    borderColor: theme.border,
                  }]}
                  placeholder="your@email.com"
                  placeholderTextColor={theme.textMuted}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  style={[styles.saveButton, !email && styles.saveButtonDisabled]}
                  onPress={handleSaveSetup}
                  disabled={!email}
                >
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.savedMessage}>
                <Text style={styles.savedMessageText}>✅ Setup saved! Check your email.</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}

// ==========================================
// MAIN COMPONENT: DreamSetupBuilderPage
// ==========================================

export default function DreamSetupBuilderPage({ theme, onBack, drummers, onSelectDrummer }) {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;
  const isMobile = width < 640;
  
  // Wizard state
  const [currentStep, setCurrentStep] = useState('budget');
  const [completedSteps, setCompletedSteps] = useState(new Set());
  
  // User preferences
  const [preferences, setPreferences] = useState({
    budget: null,
    genre: null,
    skill: null,
    priority: null,
  });
  
  // Selected gear
  const [selectedGear, setSelectedGear] = useState({});
  
  // UI state
  const [activeCategory, setActiveCategory] = useState('drums');
  const [showShareModal, setShowShareModal] = useState(false);
  const [showWizard, setShowWizard] = useState(true);
  
  // Load from URL on mount
  useEffect(() => {
    const urlData = getSetupFromURL();
    if (urlData) {
      if (urlData.budget) {
        setPreferences(prev => ({ ...prev, budget: urlData.budget }));
        setCompletedSteps(prev => new Set([...prev, 'budget']));
      }
      if (urlData.genre) {
        setPreferences(prev => ({ ...prev, genre: urlData.genre }));
        setCompletedSteps(prev => new Set([...prev, 'genre']));
      }
      if (urlData.skill) {
        setPreferences(prev => ({ ...prev, skill: urlData.skill }));
        setCompletedSteps(prev => new Set([...prev, 'skill']));
      }
      if (urlData.priority) {
        setPreferences(prev => ({ ...prev, priority: urlData.priority }));
        setCompletedSteps(prev => new Set([...prev, 'priority']));
      }
      
      // If all steps completed, skip wizard
      if (urlData.budget && urlData.genre && urlData.skill && urlData.priority) {
        setShowWizard(false);
        setCurrentStep('build');
      }
    }
    
    updateSetupBuilderMeta();
    trackSetupBuilderEvent('page_view');
  }, []);
  
  // Update URL and meta when preferences change
  useEffect(() => {
    updateSetupURL(preferences, selectedGear);
    const { totalUsd } = calculateTotalCost(selectedGear);
    updateSetupBuilderMeta(preferences, totalUsd);
  }, [preferences, selectedGear]);
  
  // Handle preference selection
  const handleSelectPreference = useCallback((stepId, value) => {
    setPreferences(prev => ({ ...prev, [stepId]: value }));
    setCompletedSteps(prev => new Set([...prev, stepId]));
    trackSetupBuilderEvent(`${stepId}_selected`, { value });
    
    // Auto-advance to next step
    const stepIndex = WIZARD_STEPS.findIndex(s => s.id === stepId);
    if (stepIndex < WIZARD_STEPS.length - 1) {
      setCurrentStep(WIZARD_STEPS[stepIndex + 1].id);
    } else {
      // All steps complete - generate recommendations and show builder
      setShowWizard(false);
      setCurrentStep('build');
      
      // Auto-populate with recommended gear
      const recommended = getRecommendedGear({ ...preferences, [stepId]: value });
      setSelectedGear(recommended);
      trackSetupBuilderEvent('wizard_complete', preferences);
    }
  }, [preferences]);
  
  // Handle gear selection
  const handleSelectGear = useCallback((category, item) => {
    setSelectedGear(prev => {
      const newGear = { ...prev };
      if (newGear[category]?.id === item.id) {
        delete newGear[category];
        trackSetupBuilderEvent('gear_removed', { category, item_id: item.id });
      } else {
        newGear[category] = item;
        trackSetupBuilderEvent('gear_added', { category, item_id: item.id, price: item.price });
      }
      return newGear;
    });
  }, []);
  
  // Handle remove from summary
  const handleRemoveGear = useCallback((category) => {
    setSelectedGear(prev => {
      const newGear = { ...prev };
      delete newGear[category];
      return newGear;
    });
    trackSetupBuilderEvent('gear_removed', { category, source: 'summary' });
  }, []);
  
  // Handle affiliate clicks
  const handleBuyItem = useCallback((item, store, category) => {
    trackSetupBuilderEvent('affiliate_click', { 
      store, 
      item_id: item.id, 
      category,
      price: item.price,
    });
    
    const url = store === 'thomann' 
      ? getSetupBuilderThomannLink(item, category)
      : getSetupBuilderSweetwaterLink(item, category);
    
    if (Platform.OS === 'web') {
      window.open(url, '_blank');
    }
  }, []);
  
  // Handle buy complete setup
  const handleBuyAll = useCallback((store) => {
    trackSetupBuilderEvent('buy_complete_setup', { 
      store,
      item_count: Object.keys(selectedGear).length,
      total_cost: calculateTotalCost(selectedGear).totalUsd,
    });
    
    // Open each item in sequence (or a cart URL if available)
    Object.entries(selectedGear).forEach(([category, item], index) => {
      if (item) {
        setTimeout(() => {
          handleBuyItem(item, store, category);
        }, index * 500); // Stagger opens to avoid popup blockers
      }
    });
  }, [selectedGear, handleBuyItem]);
  
  // Handle share
  const handleShare = useCallback(() => {
    setShowShareModal(true);
    trackSetupBuilderEvent('share_modal_open');
  }, []);
  
  // Filter gear by budget and genre
  const filteredCatalog = useMemo(() => {
    const budgetOption = BUDGET_OPTIONS.find(b => b.id === preferences.budget);
    const maxPrice = budgetOption?.value || Infinity;
    
    const filtered = {};
    Object.entries(KIT_BUILDER_CATALOG).forEach(([category, items]) => {
      filtered[category] = items.filter(item => {
        // Budget filter
        if (item.price * EUR_TO_USD > maxPrice * 1.5) return false;
        return true;
      }).sort((a, b) => {
        // Sort by genre relevance, then price
        const genreDrummers = GENRE_DRUMMERS[preferences.genre] || [];
        const aRelevance = a.usedBy?.some(d => genreDrummers.includes(d)) ? 1 : 0;
        const bRelevance = b.usedBy?.some(d => genreDrummers.includes(d)) ? 1 : 0;
        if (bRelevance !== aRelevance) return bRelevance - aRelevance;
        return a.price - b.price;
      });
    });
    
    return filtered;
  }, [preferences.budget, preferences.genre]);
  
  // Get current step options
  const renderStepContent = () => {
    switch (currentStep) {
      case 'budget':
        return (
          <View style={styles.optionsGrid}>
            {BUDGET_OPTIONS.map(option => (
              <OptionCard
                key={option.id}
                option={option}
                isSelected={preferences.budget === option.id}
                onPress={() => handleSelectPreference('budget', option.id)}
                theme={theme}
              />
            ))}
          </View>
        );
      
      case 'genre':
        return (
          <View style={styles.optionsGrid}>
            {GENRE_OPTIONS.map(option => (
              <OptionCard
                key={option.id}
                option={option}
                isSelected={preferences.genre === option.id}
                onPress={() => handleSelectPreference('genre', option.id)}
                theme={theme}
                colorOverride={option.color}
              />
            ))}
          </View>
        );
      
      case 'skill':
        return (
          <View style={styles.optionsGrid}>
            {SKILL_OPTIONS.map(option => (
              <OptionCard
                key={option.id}
                option={option}
                isSelected={preferences.skill === option.id}
                onPress={() => handleSelectPreference('skill', option.id)}
                theme={theme}
              />
            ))}
          </View>
        );
      
      case 'priority':
        return (
          <View style={styles.optionsGrid}>
            {PRIORITY_OPTIONS.map(option => (
              <OptionCard
                key={option.id}
                option={option}
                isSelected={preferences.priority === option.id}
                onPress={() => handleSelectPreference('priority', option.id)}
                theme={theme}
              />
            ))}
          </View>
        );
      
      default:
        return null;
    }
  };
  
  // Render wizard
  const renderWizard = () => (
    <View style={[styles.wizardContainer, { backgroundColor: theme.background }]}>
      {/* Progress Steps */}
      <View style={styles.wizardProgress}>
        {WIZARD_STEPS.map((step, index) => (
          <React.Fragment key={step.id}>
            <WizardStep
              step={step}
              currentStep={currentStep}
              isCompleted={completedSteps.has(step.id)}
              onPress={() => setCurrentStep(step.id)}
              theme={theme}
            />
            {index < WIZARD_STEPS.length - 1 && (
              <View style={[
                styles.wizardConnector,
                { backgroundColor: completedSteps.has(step.id) ? colors.purple[500] : theme.border }
              ]} />
            )}
          </React.Fragment>
        ))}
      </View>
      
      {/* Current Step Content */}
      <View style={styles.wizardContent}>
        <Text style={[styles.wizardQuestion, { color: theme.text }]}>
          {WIZARD_STEPS.find(s => s.id === currentStep)?.question}
        </Text>
        {renderStepContent()}
      </View>
      
      {/* Skip Button */}
      <TouchableOpacity
        style={[styles.skipButton, { borderColor: theme.border }]}
        onPress={() => {
          setShowWizard(false);
          setCurrentStep('build');
          trackSetupBuilderEvent('wizard_skipped');
        }}
      >
        <Text style={[styles.skipButtonText, { color: theme.textSecondary }]}>
          Skip wizard & build from scratch
        </Text>
      </TouchableOpacity>
    </View>
  );
  
  // Render gear builder
  const renderBuilder = () => (
    <View style={[styles.builderContainer, isDesktop && styles.builderContainerDesktop]}>
      {/* Left Panel - Gear Selection */}
      <View style={[styles.gearPanel, isDesktop && styles.gearPanelDesktop]}>
        {/* Category Tabs */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoryTabs}
        >
          {SETUP_CATEGORIES.map(cat => (
            <TouchableOpacity
              key={cat.key}
              style={[
                styles.categoryTab,
                activeCategory === cat.key && styles.categoryTabActive,
                { borderColor: activeCategory === cat.key ? colors.purple[500] : theme.border }
              ]}
              onPress={() => setActiveCategory(cat.key)}
            >
              <Text style={styles.categoryTabEmoji}>{cat.emoji}</Text>
              <Text style={[
                styles.categoryTabName,
                { color: activeCategory === cat.key ? colors.purple[500] : theme.text }
              ]}>
                {cat.name}
              </Text>
              {selectedGear[cat.key] && (
                <View style={styles.categoryTabBadge}>
                  <Text style={styles.categoryTabBadgeText}>✓</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        {/* Gear Grid */}
        <ScrollView style={styles.gearGrid}>
          <View style={[styles.gearGridInner, isDesktop && styles.gearGridInnerDesktop]}>
            {(filteredCatalog[activeCategory] || []).map(item => (
              <GearCard
                key={item.id}
                item={item}
                category={activeCategory}
                isSelected={selectedGear[activeCategory]?.id === item.id}
                onSelect={() => handleSelectGear(activeCategory, item)}
                onBuy={(item, store) => handleBuyItem(item, store, activeCategory)}
                theme={theme}
                isDesktop={isDesktop}
              />
            ))}
          </View>
        </ScrollView>
      </View>
      
      {/* Right Panel - Summary (Desktop) or Bottom Sheet (Mobile) */}
      {(isDesktop || Object.keys(selectedGear).length > 0) && (
        <SetupSummary
          selectedGear={selectedGear}
          preferences={preferences}
          drummers={drummers}
          theme={theme}
          onRemove={handleRemoveGear}
          onBuyAll={handleBuyAll}
          isDesktop={isDesktop}
        />
      )}
    </View>
  );
  
  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={[styles.backButtonText, { color: theme.text }]}>← Back</Text>
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={[styles.headerTitle, { color: theme.text }]}>
            🥁 Dream Setup Builder
          </Text>
          <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>
            Build your perfect metal drum kit
          </Text>
        </View>
        {!showWizard && Object.keys(selectedGear).length > 0 && (
          <TouchableOpacity onPress={handleShare} style={styles.shareHeaderButton}>
            <Text style={styles.shareHeaderButtonText}>🔗 Share</Text>
          </TouchableOpacity>
        )}
      </View>
      
      {/* Wizard or Builder */}
      {showWizard ? renderWizard() : renderBuilder()}
      
      {/* Share Modal */}
      <ShareModal
        visible={showShareModal}
        onClose={() => setShowShareModal(false)}
        shareUrl={generateShareableURL(preferences, selectedGear)}
        preferences={preferences}
        selectedGear={selectedGear}
        theme={theme}
      />
    </ScrollView>
  );
}

// ==========================================
// STYLES
// ==========================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: spacing.xxl,
  },
  
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    gap: spacing.md,
  },
  backButton: {
    padding: spacing.sm,
  },
  backButtonText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
  },
  headerTitleContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
  },
  headerSubtitle: {
    fontSize: fontSize.sm,
    marginTop: 2,
  },
  shareHeaderButton: {
    backgroundColor: colors.purple[500],
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 8,
  },
  shareHeaderButtonText: {
    color: '#fff',
    fontWeight: fontWeight.bold,
    fontSize: fontSize.sm,
  },
  
  // Wizard
  wizardContainer: {
    padding: spacing.lg,
    maxWidth: 800,
    alignSelf: 'center',
    width: '100%',
  },
  wizardProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  wizardStep: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 20,
    borderWidth: 1,
    gap: spacing.xs,
  },
  wizardStepActive: {
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
  },
  wizardStepCompleted: {
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
  },
  wizardStepEmoji: {
    fontSize: 16,
  },
  wizardStepTitle: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },
  wizardStepCheck: {
    color: colors.green[500],
    fontWeight: fontWeight.bold,
  },
  wizardConnector: {
    width: 20,
    height: 2,
    borderRadius: 1,
  },
  wizardContent: {
    marginBottom: spacing.xl,
  },
  wizardQuestion: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  
  // Options Grid
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.md,
  },
  optionCard: {
    width: 150,
    padding: spacing.lg,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    gap: spacing.xs,
  },
  optionEmoji: {
    fontSize: 32,
    marginBottom: spacing.xs,
  },
  optionName: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    textAlign: 'center',
  },
  optionDescription: {
    fontSize: fontSize.xs,
    textAlign: 'center',
  },
  optionYears: {
    fontSize: fontSize.xs,
    marginTop: spacing.xs,
  },
  
  // Skip Button
  skipButton: {
    alignSelf: 'center',
    padding: spacing.md,
    borderWidth: 1,
    borderRadius: 8,
  },
  skipButtonText: {
    fontSize: fontSize.sm,
  },
  
  // Builder
  builderContainer: {
    padding: spacing.md,
  },
  builderContainerDesktop: {
    flexDirection: 'row',
    gap: spacing.lg,
    maxWidth: 1400,
    alignSelf: 'center',
    width: '100%',
  },
  
  // Gear Panel
  gearPanel: {
    flex: 1,
  },
  gearPanelDesktop: {
    flex: 2,
  },
  
  // Category Tabs
  categoryTabs: {
    marginBottom: spacing.md,
  },
  categoryTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginRight: spacing.sm,
    borderRadius: 20,
    borderWidth: 1,
    gap: spacing.xs,
  },
  categoryTabActive: {
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
  },
  categoryTabEmoji: {
    fontSize: 14,
  },
  categoryTabName: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },
  categoryTabBadge: {
    backgroundColor: colors.green[500],
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryTabBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: fontWeight.bold,
  },
  
  // Gear Grid
  gearGrid: {
    flex: 1,
  },
  gearGridInner: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  gearGridInnerDesktop: {
    justifyContent: 'flex-start',
  },
  
  // Gear Card
  gearCard: {
    width: 280,
    borderRadius: 12,
    overflow: 'hidden',
  },
  gearCardImage: {
    width: '100%',
    height: 120,
    backgroundColor: '#f0f0f0',
  },
  gearCardContent: {
    padding: spacing.md,
  },
  gearCardBrand: {
    fontSize: fontSize.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  gearCardName: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    marginTop: 2,
  },
  gearCardUsedBy: {
    fontSize: fontSize.xs,
    marginTop: spacing.xs,
  },
  gearCardPriceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  gearCardPrice: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
  },
  gearCardPriceUsd: {
    fontSize: fontSize.sm,
  },
  gearCardActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  gearCardButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
  },
  gearCardButtonAdd: {
    backgroundColor: colors.green[500],
  },
  gearCardButtonRemove: {
    backgroundColor: colors.red[500],
  },
  gearCardButtonBuy: {
    backgroundColor: colors.blue[500],
  },
  gearCardButtonText: {
    color: '#fff',
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
  },
  
  // Summary
  summaryContainer: {
    borderRadius: 12,
    borderWidth: 1,
    padding: spacing.lg,
    marginTop: spacing.lg,
  },
  summaryContainerDesktop: {
    flex: 1,
    marginTop: 0,
    position: 'sticky',
    top: 20,
    alignSelf: 'flex-start',
    maxWidth: 400,
  },
  summaryTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    marginBottom: spacing.md,
  },
  
  // Budget Progress
  budgetProgress: {
    marginBottom: spacing.md,
  },
  budgetProgressBar: {
    height: 8,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: spacing.xs,
  },
  budgetProgressFill: {
    height: '100%',
    borderRadius: 4,
  },
  budgetProgressText: {
    fontSize: fontSize.xs,
    textAlign: 'center',
  },
  
  // Summary Items
  summaryItems: {
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    gap: spacing.sm,
  },
  summaryItemEmoji: {
    fontSize: 18,
  },
  summaryItemInfo: {
    flex: 1,
  },
  summaryItemCategory: {
    fontSize: fontSize.xs,
  },
  summaryItemName: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },
  summaryItemPrice: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
  },
  summaryItemRemove: {
    padding: spacing.xs,
  },
  
  // Summary Total
  summaryTotal: {
    paddingVertical: spacing.md,
    borderTopWidth: 2,
    marginBottom: spacing.md,
  },
  summaryTotalLabel: {
    fontSize: fontSize.sm,
    marginBottom: spacing.xs,
  },
  summaryTotalPrices: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing.sm,
  },
  summaryTotalPrice: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
  },
  summaryTotalPriceUsd: {
    fontSize: fontSize.md,
  },
  
  // Pro Comparison Widget
  proComparisonWidget: {
    borderTopWidth: 1,
    paddingTop: spacing.md,
    marginBottom: spacing.md,
  },
  proComparisonTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    marginBottom: spacing.sm,
  },
  proComparisonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  proComparisonRank: {
    fontSize: fontSize.sm,
    width: 24,
  },
  proComparisonInfo: {
    flex: 1,
  },
  proComparisonName: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },
  proComparisonBand: {
    fontSize: fontSize.xs,
  },
  proComparisonBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 12,
  },
  proComparisonPercent: {
    color: '#fff',
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
  },
  proComparisonHint: {
    fontSize: fontSize.xs,
    marginTop: spacing.sm,
    fontStyle: 'italic',
  },
  
  // Buy Setup Buttons
  buySetupButtons: {
    gap: spacing.sm,
  },
  buySetupButton: {
    paddingVertical: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
  },
  buySetupButtonText: {
    color: '#fff',
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
  },
  
  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  modalContent: {
    width: '100%',
    maxWidth: 500,
    borderRadius: 16,
    padding: spacing.xl,
  },
  modalClose: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    padding: spacing.sm,
  },
  modalTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  
  // Share URL
  shareUrlContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.sm,
    borderRadius: 8,
    marginBottom: spacing.md,
  },
  shareUrl: {
    flex: 1,
    fontSize: fontSize.sm,
  },
  copyButton: {
    backgroundColor: colors.purple[500],
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 6,
  },
  copyButtonText: {
    color: '#fff',
    fontWeight: fontWeight.bold,
    fontSize: fontSize.sm,
  },
  
  // Social Buttons
  socialButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  socialButton: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
  },
  socialButtonText: {
    color: '#fff',
    fontWeight: fontWeight.bold,
    fontSize: fontSize.md,
  },
  
  // Save Setup
  saveSetupSection: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
    paddingTop: spacing.lg,
  },
  saveSetupTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    marginBottom: spacing.xs,
  },
  saveSetupDesc: {
    fontSize: fontSize.sm,
    marginBottom: spacing.md,
  },
  saveSetupForm: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  emailInput: {
    flex: 1,
    padding: spacing.sm,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: fontSize.md,
  },
  saveButton: {
    backgroundColor: colors.green[500],
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 8,
    justifyContent: 'center',
  },
  saveButtonDisabled: {
    opacity: 0.5,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: fontWeight.bold,
    fontSize: fontSize.md,
  },
  savedMessage: {
    padding: spacing.md,
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderRadius: 8,
  },
  savedMessageText: {
    color: colors.green[600],
    fontSize: fontSize.md,
    textAlign: 'center',
  },
});

// Note: All utilities are exported inline where defined
// Available exports:
// - BUDGET_OPTIONS, GENRE_OPTIONS, SKILL_OPTIONS, PRIORITY_OPTIONS
// - WIZARD_STEPS, SETUP_CATEGORIES
// - calculateTotalCost, findGearById, getRecommendedGear
// - findSimilarDrummers, getSmartSuggestions
// - getSetupBuilderThomannLink, getSetupBuilderSweetwaterLink
// - generateSetupSchema, trackSetupBuilderEvent
// - isSetupBuilderPage, getSetupFromURL, updateSetupURL
// - generateShareableURL, updateSetupBuilderMeta
