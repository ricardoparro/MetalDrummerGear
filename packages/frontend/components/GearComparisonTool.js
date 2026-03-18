/**
 * GearComparisonTool - Side-by-Side Drummer Setup Battles
 * Issue #721: Gear Comparison Tool at /tools/compare
 * 
 * Features:
 * - Select interface with dropdowns, quick picks, and random button
 * - Side-by-side comparison view with drummer photos, stats, and gear categories
 * - Visual highlights for price differences, shared brands, unique items
 * - Engagement features: share, vote, switch drummers
 * - SEO-optimized URLs like /tools/compare/joey-jordison-vs-george-kollias
 * - Affiliate integration with clickable gear links
 * - Mobile-first responsive design
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
} from 'react-native';
import { Image } from 'expo-image';
import { colors } from '../colors';
import { fontSize, fontWeight, lineHeight } from '../typography';
import { spacing } from '../spacing';
import { toSlug } from '../utils/urlHelpers';
import { calculateKitCost, formatPrice } from '../gearPrices';
import { getAffiliateLinks } from '../affiliateLinks';
import { getOptimizedImageUrl } from '../imageUtils';

// ==========================================
// CONSTANTS
// ==========================================

// Popular matchups for quick picks
const POPULAR_MATCHUPS = [
  { d1: 'joey-jordison', d2: 'george-kollias', label: 'Speed Demons', emoji: '⚡' },
  { d1: 'lars-ulrich', d2: 'dave-lombardo', label: 'Thrash Titans', emoji: '🤘' },
  { d1: 'mario-duplantier', d2: 'tomas-haake', label: 'Prog Masters', emoji: '🧠' },
  { d1: 'mike-portnoy', d2: 'danny-carey', label: 'Prog Legends', emoji: '🎭' },
  { d1: 'gene-hoglan', d2: 'pete-sandoval', label: 'Death Metal Icons', emoji: '💀' },
  { d1: 'hellhammer', d2: 'inferno', label: 'Black Metal Kings', emoji: '🖤' },
];

// Gear categories for comparison
const GEAR_CATEGORIES = [
  { key: 'drums', label: 'Drums', emoji: '🥁', color: '#FF6B35' },
  { key: 'snare', label: 'Snare', emoji: '🔊', color: '#4ECDC4' },
  { key: 'cymbals', label: 'Cymbals', emoji: '🎵', color: '#FFE66D' },
  { key: 'hardware', label: 'Hardware', emoji: '⚙️', color: '#95E1D3' },
  { key: 'sticks', label: 'Sticks', emoji: '🪵', color: '#F38181' },
  { key: 'heads', label: 'Heads', emoji: '🎯', color: '#AA96DA' },
];

// ==========================================
// GA4 EVENT TRACKING
// ==========================================

export const trackComparisonView = (d1Slug, d2Slug) => {
  if (Platform.OS === 'web' && typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'comparison_view', {
      drummer1: d1Slug,
      drummer2: d2Slug,
      comparison_slug: `${d1Slug}-vs-${d2Slug}`,
    });
  }
};

export const trackComparisonGenerate = (d1Slug, d2Slug, source) => {
  if (Platform.OS === 'web' && typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'comparison_generate', {
      drummer1: d1Slug,
      drummer2: d2Slug,
      source: source, // 'dropdown', 'quick-pick', 'random', 'url'
    });
  }
};

export const trackComparisonShare = (platform, d1Slug, d2Slug) => {
  if (Platform.OS === 'web' && typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'comparison_share', {
      platform: platform,
      drummer1: d1Slug,
      drummer2: d2Slug,
    });
  }
};

export const trackComparisonVote = (winnerId, d1Slug, d2Slug) => {
  if (Platform.OS === 'web' && typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'comparison_vote', {
      winner: winnerId,
      drummer1: d1Slug,
      drummer2: d2Slug,
    });
  }
};

export const trackComparisonAffiliateClick = (brand, gearType, drummerSlug) => {
  if (Platform.OS === 'web' && typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'comparison_affiliate_click', {
      brand: brand,
      gear_type: gearType,
      drummer: drummerSlug,
    });
  }
};

export const trackComparisonSwitch = () => {
  if (Platform.OS === 'web' && typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'comparison_switch_drummers');
  }
};

// ==========================================
// URL UTILITIES
// ==========================================

export function isGearComparisonToolPage() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return false;
  const pathname = window.location.pathname;
  return pathname === '/tools/compare' || 
         pathname === '/tools/compare/' ||
         pathname.startsWith('/tools/compare/');
}

export function getComparisonSlugsFromURL() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return { d1: null, d2: null };
  const pathname = window.location.pathname;
  
  // Check for SEO URL pattern: /tools/compare/joey-jordison-vs-george-kollias
  const match = pathname.match(/^\/tools\/compare\/([a-z0-9-]+)-vs-([a-z0-9-]+)$/i);
  if (match) {
    return { d1: match[1], d2: match[2] };
  }
  
  // Check for query params: /tools/compare?d1=joey-jordison&d2=george-kollias
  const params = new URLSearchParams(window.location.search);
  return {
    d1: params.get('d1') || null,
    d2: params.get('d2') || null,
  };
}

export function updateComparisonURL(d1Slug, d2Slug, useHistory = true) {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return;
  
  let newPath;
  if (d1Slug && d2Slug) {
    // Use SEO-friendly URL
    newPath = `/tools/compare/${d1Slug}-vs-${d2Slug}`;
  } else {
    newPath = '/tools/compare';
  }
  
  if (useHistory) {
    window.history.pushState({}, '', newPath);
  } else {
    window.history.replaceState({}, '', newPath);
  }
}

// ==========================================
// META TAG UTILITIES
// ==========================================

export function updateGearComparisonToolMeta(drummer1 = null, drummer2 = null) {
  if (Platform.OS !== 'web' || typeof document === 'undefined') return;
  
  const setMeta = (name, content, isProperty = false) => {
    const attr = isProperty ? 'property' : 'name';
    let meta = document.querySelector(`meta[${attr}="${name}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute(attr, name);
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);
  };
  
  let title, description, url, image;
  
  if (drummer1 && drummer2) {
    title = `${drummer1.name} vs ${drummer2.name} - Gear Setup Comparison | MetalForge`;
    description = `Compare ${drummer1.name}'s (${drummer1.band}) complete gear setup with ${drummer2.name}'s (${drummer2.band}). Side-by-side drums, cymbals, hardware, and more. Who has the better kit?`;
    url = `https://metalforge.io/tools/compare/${toSlug(drummer1.name)}-vs-${toSlug(drummer2.name)}`;
    image = `https://metalforge.io/api/og/compare?d1=${encodeURIComponent(drummer1.name)}&d2=${encodeURIComponent(drummer2.name)}`;
  } else {
    title = 'Gear Comparison Tool - Side-by-Side Drummer Setup Battles | MetalForge';
    description = 'Compare any two metal drummers\' complete gear setups side-by-side. Drums, cymbals, hardware, and more. Find out who has the ultimate kit!';
    url = 'https://metalforge.io/tools/compare';
    image = 'https://metalforge.io/images/og/gear-comparison.jpg';
  }
  
  document.title = title;
  
  setMeta('description', description);
  setMeta('keywords', 'drum comparison, drummer gear, metal drummer equipment, drum kit comparison, ' + 
    (drummer1 ? `${drummer1.name} gear, ` : '') + 
    (drummer2 ? `${drummer2.name} gear, ` : '') +
    'metal drumming, drum setup battle');
  setMeta('og:title', title, true);
  setMeta('og:description', description, true);
  setMeta('og:url', url, true);
  setMeta('og:type', 'website', true);
  setMeta('og:image', image, true);
  setMeta('twitter:card', 'summary_large_image');
  setMeta('twitter:title', title);
  setMeta('twitter:description', description);
  setMeta('twitter:image', image);
  
  // Update canonical URL
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', url);
  
  // Add structured data
  injectComparisonSchema(drummer1, drummer2);
}

function injectComparisonSchema(drummer1, drummer2) {
  if (Platform.OS !== 'web' || typeof document === 'undefined') return;
  
  // Remove existing schema
  const existing = document.querySelector('script[data-schema="gear-comparison-tool"]');
  if (existing) existing.remove();
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Metal Drummer Gear Comparison Tool",
    "description": "Compare any two metal drummers' complete gear setups side-by-side",
    "url": "https://metalforge.io/tools/compare",
    "applicationCategory": "MusicApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "publisher": {
      "@type": "Organization",
      "name": "MetalForge",
      "url": "https://metalforge.io"
    }
  };
  
  // Add comparison-specific data if both drummers selected
  if (drummer1 && drummer2) {
    schema["mainEntity"] = {
      "@type": "ItemList",
      "name": `${drummer1.name} vs ${drummer2.name} Gear Comparison`,
      "itemListElement": [
        {
          "@type": "Person",
          "name": drummer1.name,
          "jobTitle": "Drummer",
          "memberOf": { "@type": "MusicGroup", "name": drummer1.band }
        },
        {
          "@type": "Person",
          "name": drummer2.name,
          "jobTitle": "Drummer",
          "memberOf": { "@type": "MusicGroup", "name": drummer2.band }
        }
      ]
    };
  }
  
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute('data-schema', 'gear-comparison-tool');
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

// ==========================================
// SHARE UTILITIES
// ==========================================

const getShareUrl = (d1Slug, d2Slug) => {
  return `https://metalforge.io/tools/compare/${d1Slug}-vs-${d2Slug}`;
};

const getShareText = (drummer1, drummer2) => {
  return `⚔️ ${drummer1.name} vs ${drummer2.name} - Who has the better drum setup? Compare their gear! 🥁`;
};

const shareHandlers = {
  twitter: (drummer1, drummer2) => {
    const shareUrl = getShareUrl(toSlug(drummer1.name), toSlug(drummer2.name));
    const shareText = getShareText(drummer1, drummer2);
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}&hashtags=MetalDrummer,GearComparison,MetalForge`;
    
    trackComparisonShare('twitter', toSlug(drummer1.name), toSlug(drummer2.name));
    
    if (typeof window !== 'undefined') {
      window.open(url, '_blank', 'width=600,height=400');
    }
  },
  
  facebook: (drummer1, drummer2) => {
    const shareUrl = getShareUrl(toSlug(drummer1.name), toSlug(drummer2.name));
    const shareText = getShareText(drummer1, drummer2);
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
    
    trackComparisonShare('facebook', toSlug(drummer1.name), toSlug(drummer2.name));
    
    if (typeof window !== 'undefined') {
      window.open(url, '_blank', 'width=600,height=400');
    }
  },
  
  whatsapp: (drummer1, drummer2) => {
    const shareUrl = getShareUrl(toSlug(drummer1.name), toSlug(drummer2.name));
    const shareText = getShareText(drummer1, drummer2);
    const url = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`;
    
    trackComparisonShare('whatsapp', toSlug(drummer1.name), toSlug(drummer2.name));
    
    if (typeof window !== 'undefined') {
      window.open(url, '_blank');
    }
  },
  
  copy: async (drummer1, drummer2, setCopied) => {
    const shareUrl = getShareUrl(toSlug(drummer1.name), toSlug(drummer2.name));
    const shareText = `${getShareText(drummer1, drummer2)} ${shareUrl}`;
    
    trackComparisonShare('copy', toSlug(drummer1.name), toSlug(drummer2.name));
    
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(shareText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  },
};

// ==========================================
// HELPER FUNCTIONS
// ==========================================

// Extract brand from gear string
function extractBrand(gearString) {
  if (!gearString) return null;
  const brands = ['Tama', 'Pearl', 'DW', 'Sonor', 'Ludwig', 'Mapex', 'Gretsch', 'Yamaha', 'SJC', 'ddrum',
                  'Zildjian', 'Paiste', 'Sabian', 'Meinl',
                  'Vic Firth', 'Promark', 'Ahead', 'Vater',
                  'Remo', 'Evans', 'Aquarian',
                  'Iron Cobra', 'Demon Drive', 'Speed Cobra', 'Axis'];
  for (const brand of brands) {
    if (gearString.toLowerCase().includes(brand.toLowerCase())) {
      return brand;
    }
  }
  return null;
}

// Check if two drummers share a brand for a gear category
function hasSharedBrand(gear1, gear2, category) {
  const brand1 = extractBrand(gear1?.[category]);
  const brand2 = extractBrand(gear2?.[category]);
  return brand1 && brand2 && brand1.toLowerCase() === brand2.toLowerCase();
}

// Get drummer by slug from list
function getDrummerBySlug(drummers, slug) {
  if (!slug || !drummers) return null;
  return drummers.find(d => toSlug(d.name) === slug);
}

// Get local vote from storage
function getLocalVote(d1Slug, d2Slug) {
  if (Platform.OS !== 'web' || typeof localStorage === 'undefined') return null;
  const key = `vote_${d1Slug}_vs_${d2Slug}`;
  const reverseKey = `vote_${d2Slug}_vs_${d1Slug}`;
  return localStorage.getItem(key) || localStorage.getItem(reverseKey);
}

// Save local vote
function saveLocalVote(d1Slug, d2Slug, winnerId) {
  if (Platform.OS !== 'web' || typeof localStorage === 'undefined') return;
  const key = `vote_${d1Slug}_vs_${d2Slug}`;
  localStorage.setItem(key, winnerId);
}

// ==========================================
// COMPONENTS
// ==========================================

// Dropdown Select Component
function DrummerSelect({ drummers, selectedSlug, onSelect, placeholder, theme, isMobile }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);
  
  const filteredDrummers = useMemo(() => {
    if (!searchQuery) return drummers;
    const query = searchQuery.toLowerCase();
    return drummers.filter(d => 
      d.name.toLowerCase().includes(query) || 
      d.band.toLowerCase().includes(query)
    );
  }, [drummers, searchQuery]);
  
  const selectedDrummer = selectedSlug ? getDrummerBySlug(drummers, selectedSlug) : null;
  
  // Close dropdown when clicking outside
  useEffect(() => {
    if (Platform.OS === 'web' && isOpen) {
      const handleClickOutside = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
          setIsOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);
  
  return (
    <View ref={dropdownRef} style={[styles.selectContainer, isMobile && styles.selectContainerMobile]}>
      <TouchableOpacity 
        style={[styles.selectButton, { backgroundColor: theme.card, borderColor: theme.border }]}
        onPress={() => setIsOpen(!isOpen)}
        accessibilityRole="button"
        accessibilityLabel={selectedDrummer ? `Selected: ${selectedDrummer.name}` : placeholder}
      >
        {selectedDrummer ? (
          <View style={styles.selectedDrummer}>
            <Image
              source={{ uri: getOptimizedImageUrl(selectedDrummer.image, { width: 32 }) }}
              style={styles.selectThumb}
              contentFit="cover"
            />
            <View style={styles.selectedInfo}>
              <Text style={[styles.selectedName, { color: theme.text }]} numberOfLines={1}>
                {selectedDrummer.name}
              </Text>
              <Text style={[styles.selectedBand, { color: theme.secondaryText }]} numberOfLines={1}>
                {selectedDrummer.band}
              </Text>
            </View>
          </View>
        ) : (
          <Text style={[styles.placeholder, { color: theme.secondaryText }]}>
            {placeholder}
          </Text>
        )}
        <Text style={[styles.chevron, { color: theme.secondaryText }]}>
          {isOpen ? '▲' : '▼'}
        </Text>
      </TouchableOpacity>
      
      {isOpen && (
        <View style={[styles.dropdown, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <TextInput
            style={[styles.searchInput, { 
              backgroundColor: theme.background, 
              color: theme.text,
              borderColor: theme.border 
            }]}
            placeholder="Search drummers..."
            placeholderTextColor={theme.secondaryText}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
          />
          <ScrollView style={styles.dropdownList} nestedScrollEnabled>
            {filteredDrummers.map(drummer => (
              <TouchableOpacity
                key={drummer.id}
                style={[
                  styles.dropdownItem,
                  toSlug(drummer.name) === selectedSlug && { backgroundColor: colors.primary + '20' }
                ]}
                onPress={() => {
                  onSelect(toSlug(drummer.name));
                  setIsOpen(false);
                  setSearchQuery('');
                }}
              >
                <Image
                  source={{ uri: getOptimizedImageUrl(drummer.image, { width: 40 }) }}
                  style={styles.dropdownThumb}
                  contentFit="cover"
                />
                <View style={styles.dropdownInfo}>
                  <Text style={[styles.dropdownName, { color: theme.text }]}>
                    {drummer.name}
                  </Text>
                  <Text style={[styles.dropdownBand, { color: theme.secondaryText }]}>
                    {drummer.band} • {drummer.genre}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
            {filteredDrummers.length === 0 && (
              <Text style={[styles.noResults, { color: theme.secondaryText }]}>
                No drummers found
              </Text>
            )}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

// Quick Pick Buttons
function QuickPicks({ onSelect, theme, isMobile }) {
  return (
    <View style={[styles.quickPicks, isMobile && styles.quickPicksMobile]}>
      <Text style={[styles.quickPicksLabel, { color: theme.secondaryText }]}>
        🔥 Popular Matchups:
      </Text>
      <View style={styles.quickPicksRow}>
        {POPULAR_MATCHUPS.map((matchup, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.quickPickBtn, { backgroundColor: theme.card, borderColor: theme.border }]}
            onPress={() => onSelect(matchup.d1, matchup.d2)}
            accessibilityRole="button"
            accessibilityLabel={`Compare ${matchup.label}`}
          >
            <Text style={styles.quickPickEmoji}>{matchup.emoji}</Text>
            <Text style={[styles.quickPickText, { color: theme.text }]} numberOfLines={1}>
              {matchup.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// Gear Category Row
function GearCategoryRow({ category, gear1, gear2, theme, onAffiliateClick, drummer1Slug, drummer2Slug }) {
  const shared = hasSharedBrand(gear1, gear2, category.key);
  const value1 = gear1?.[category.key] || 'Unknown';
  const value2 = gear2?.[category.key] || 'Unknown';
  const brand1 = extractBrand(value1);
  const brand2 = extractBrand(value2);
  
  return (
    <View style={[styles.gearRow, { borderBottomColor: theme.border }]}>
      <View style={[styles.gearCategory, { backgroundColor: category.color + '20' }]}>
        <Text style={styles.gearCategoryEmoji}>{category.emoji}</Text>
        <Text style={[styles.gearCategoryLabel, { color: theme.text }]}>{category.label}</Text>
      </View>
      
      <View style={styles.gearComparison}>
        <TouchableOpacity 
          style={[styles.gearItem, shared && styles.gearItemShared]}
          onPress={() => brand1 && onAffiliateClick(brand1, category.key, drummer1Slug)}
          disabled={!brand1}
        >
          <Text style={[styles.gearText, { color: theme.text }]} numberOfLines={3}>
            {value1}
          </Text>
          {brand1 && (
            <Text style={[styles.affiliateHint, { color: colors.primary }]}>
              Shop {brand1} →
            </Text>
          )}
        </TouchableOpacity>
        
        <View style={styles.gearDivider}>
          {shared ? (
            <View style={[styles.sharedBadge, { backgroundColor: colors.success + '20' }]}>
              <Text style={[styles.sharedText, { color: colors.success }]}>SAME</Text>
            </View>
          ) : (
            <Text style={[styles.vsDivider, { color: theme.secondaryText }]}>vs</Text>
          )}
        </View>
        
        <TouchableOpacity 
          style={[styles.gearItem, shared && styles.gearItemShared]}
          onPress={() => brand2 && onAffiliateClick(brand2, category.key, drummer2Slug)}
          disabled={!brand2}
        >
          <Text style={[styles.gearText, { color: theme.text }]} numberOfLines={3}>
            {value2}
          </Text>
          {brand2 && (
            <Text style={[styles.affiliateHint, { color: colors.primary }]}>
              Shop {brand2} →
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Drummer Card for comparison header
function DrummerCompareCard({ drummer, theme, isMobile, position, onSelectDrummer }) {
  if (!drummer) return (
    <View style={[styles.drummerCard, styles.drummerCardEmpty, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <Text style={[styles.emptyText, { color: theme.secondaryText }]}>
        Select a drummer
      </Text>
    </View>
  );
  
  const kitCost = calculateKitCost(drummer.gear);
  
  return (
    <TouchableOpacity
      style={[
        styles.drummerCard, 
        { backgroundColor: theme.card, borderColor: theme.border },
        position === 'left' && styles.drummerCardLeft,
        position === 'right' && styles.drummerCardRight,
      ]}
      onPress={() => onSelectDrummer && onSelectDrummer(drummer.id)}
      accessibilityRole="button"
      accessibilityLabel={`View ${drummer.name}'s full profile`}
    >
      <Image
        source={{ uri: getOptimizedImageUrl(drummer.image, { width: 200 }) }}
        style={styles.drummerImage}
        contentFit="cover"
      />
      <View style={styles.drummerInfo}>
        <Text style={[styles.drummerName, { color: theme.text }]} numberOfLines={1}>
          {drummer.name}
        </Text>
        <Text style={[styles.drummerBand, { color: theme.secondaryText }]} numberOfLines={1}>
          {drummer.band}
        </Text>
        <View style={styles.drummerStats}>
          <View style={[styles.statBadge, { backgroundColor: colors.primary + '20' }]}>
            <Text style={[styles.statText, { color: colors.primary }]}>
              {drummer.genre || 'Metal'}
            </Text>
          </View>
        </View>
        <View style={styles.kitCostContainer}>
          <Text style={[styles.kitCostLabel, { color: theme.secondaryText }]}>Est. Kit Value</Text>
          <Text style={[styles.kitCostValue, { color: colors.success }]}>
            {formatPrice(kitCost)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

// Share Buttons
function ShareButtons({ drummer1, drummer2, theme, isMobile }) {
  const [copied, setCopied] = useState(false);
  
  if (!drummer1 || !drummer2) return null;
  
  return (
    <View style={[styles.shareSection, isMobile && styles.shareSectionMobile]}>
      <Text style={[styles.shareLabel, { color: theme.secondaryText }]}>
        Share this comparison:
      </Text>
      <View style={styles.shareButtons}>
        <TouchableOpacity
          style={[styles.shareBtn, styles.shareBtnTwitter]}
          onPress={() => shareHandlers.twitter(drummer1, drummer2)}
          accessibilityLabel="Share on Twitter"
        >
          <Text style={styles.shareBtnText}>𝕏</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.shareBtn, styles.shareBtnFacebook]}
          onPress={() => shareHandlers.facebook(drummer1, drummer2)}
          accessibilityLabel="Share on Facebook"
        >
          <Text style={styles.shareBtnText}>f</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.shareBtn, styles.shareBtnWhatsapp]}
          onPress={() => shareHandlers.whatsapp(drummer1, drummer2)}
          accessibilityLabel="Share on WhatsApp"
        >
          <Text style={styles.shareBtnText}>📱</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.shareBtn, { backgroundColor: copied ? colors.success : theme.card, borderColor: theme.border }]}
          onPress={() => shareHandlers.copy(drummer1, drummer2, setCopied)}
          accessibilityLabel="Copy link"
        >
          <Text style={[styles.shareBtnText, { color: copied ? '#fff' : theme.text }]}>
            {copied ? '✓' : '🔗'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Vote Section
function VoteSection({ drummer1, drummer2, theme, isMobile }) {
  const d1Slug = toSlug(drummer1?.name);
  const d2Slug = toSlug(drummer2?.name);
  const [voted, setVoted] = useState(() => getLocalVote(d1Slug, d2Slug));
  
  if (!drummer1 || !drummer2) return null;
  
  const handleVote = (winnerId) => {
    const winnerSlug = winnerId === drummer1.id ? d1Slug : d2Slug;
    saveLocalVote(d1Slug, d2Slug, winnerSlug);
    setVoted(winnerSlug);
    trackComparisonVote(winnerSlug, d1Slug, d2Slug);
  };
  
  return (
    <View style={[styles.voteSection, isMobile && styles.voteSectionMobile]}>
      <Text style={[styles.voteLabel, { color: theme.text }]}>
        🏆 Who has the better kit?
      </Text>
      <View style={styles.voteButtons}>
        <TouchableOpacity
          style={[
            styles.voteBtn,
            { backgroundColor: theme.card, borderColor: theme.border },
            voted === d1Slug && { backgroundColor: colors.primary, borderColor: colors.primary }
          ]}
          onPress={() => handleVote(drummer1.id)}
          disabled={!!voted}
        >
          <Text style={[styles.voteBtnText, { color: voted === d1Slug ? '#fff' : theme.text }]}>
            {drummer1.name}
          </Text>
          {voted === d1Slug && <Text style={styles.voteCheck}>✓</Text>}
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.voteBtn,
            { backgroundColor: theme.card, borderColor: theme.border },
            voted === d2Slug && { backgroundColor: colors.primary, borderColor: colors.primary }
          ]}
          onPress={() => handleVote(drummer2.id)}
          disabled={!!voted}
        >
          <Text style={[styles.voteBtnText, { color: voted === d2Slug ? '#fff' : theme.text }]}>
            {drummer2.name}
          </Text>
          {voted === d2Slug && <Text style={styles.voteCheck}>✓</Text>}
        </TouchableOpacity>
      </View>
      {voted && (
        <Text style={[styles.votedMessage, { color: theme.secondaryText }]}>
          Thanks for voting! 🤘
        </Text>
      )}
    </View>
  );
}

// ==========================================
// MAIN COMPONENT
// ==========================================

export default function GearComparisonToolPage({ theme, drummers = [], onBack, onSelectDrummer }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  
  // State
  const [drummer1Slug, setDrummer1Slug] = useState(null);
  const [drummer2Slug, setDrummer2Slug] = useState(null);
  const [drummer1, setDrummer1] = useState(null);
  const [drummer2, setDrummer2] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchingDetails, setFetchingDetails] = useState(false);
  
  // Initialize from URL
  useEffect(() => {
    const { d1, d2 } = getComparisonSlugsFromURL();
    if (d1) setDrummer1Slug(d1);
    if (d2) setDrummer2Slug(d2);
    setLoading(false);
    
    // Track if coming from URL with comparison
    if (d1 && d2) {
      trackComparisonView(d1, d2);
    }
  }, []);
  
  // Fetch full drummer details when slugs change
  useEffect(() => {
    const fetchDrummerDetails = async (slug, setDrummer) => {
      if (!slug) {
        setDrummer(null);
        return;
      }
      
      // First try to find in local drummers list
      const localDrummer = getDrummerBySlug(drummers, slug);
      if (localDrummer) {
        // Fetch full details from API for complete gear info
        try {
          setFetchingDetails(true);
          const response = await fetch(`/api/drummers/${localDrummer.id}`);
          if (response.ok) {
            const fullDrummer = await response.json();
            setDrummer(fullDrummer);
          } else {
            setDrummer(localDrummer);
          }
        } catch (err) {
          console.error('Failed to fetch drummer details:', err);
          setDrummer(localDrummer);
        } finally {
          setFetchingDetails(false);
        }
      }
    };
    
    fetchDrummerDetails(drummer1Slug, setDrummer1);
    fetchDrummerDetails(drummer2Slug, setDrummer2);
  }, [drummer1Slug, drummer2Slug, drummers]);
  
  // Update URL and meta when selection changes
  useEffect(() => {
    if (drummer1Slug && drummer2Slug) {
      updateComparisonURL(drummer1Slug, drummer2Slug, true);
    }
    updateGearComparisonToolMeta(drummer1, drummer2);
  }, [drummer1, drummer2, drummer1Slug, drummer2Slug]);
  
  // Handlers
  const handleSelectDrummer1 = useCallback((slug) => {
    setDrummer1Slug(slug);
    if (slug && drummer2Slug) {
      trackComparisonGenerate(slug, drummer2Slug, 'dropdown');
    }
  }, [drummer2Slug]);
  
  const handleSelectDrummer2 = useCallback((slug) => {
    setDrummer2Slug(slug);
    if (drummer1Slug && slug) {
      trackComparisonGenerate(drummer1Slug, slug, 'dropdown');
    }
  }, [drummer1Slug]);
  
  const handleQuickPick = useCallback((d1, d2) => {
    setDrummer1Slug(d1);
    setDrummer2Slug(d2);
    trackComparisonGenerate(d1, d2, 'quick-pick');
  }, []);
  
  const handleRandom = useCallback(() => {
    if (drummers.length < 2) return;
    const shuffled = [...drummers].sort(() => Math.random() - 0.5);
    const d1 = toSlug(shuffled[0].name);
    const d2 = toSlug(shuffled[1].name);
    setDrummer1Slug(d1);
    setDrummer2Slug(d2);
    trackComparisonGenerate(d1, d2, 'random');
  }, [drummers]);
  
  const handleSwitch = useCallback(() => {
    const temp = drummer1Slug;
    setDrummer1Slug(drummer2Slug);
    setDrummer2Slug(temp);
    trackComparisonSwitch();
  }, [drummer1Slug, drummer2Slug]);
  
  const handleAffiliateClick = useCallback((brand, gearType, drummerSlug) => {
    trackComparisonAffiliateClick(brand, gearType, drummerSlug);
    const links = getAffiliateLinks(brand);
    if (links?.thomann) {
      window.open(links.thomann, '_blank');
    } else if (links?.sweetwater) {
      window.open(links.sweetwater, '_blank');
    }
  }, []);
  
  const hasComparison = drummer1 && drummer2;
  
  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.loadingContainer}>
          <Text style={[styles.loadingText, { color: theme.text }]}>Loading...</Text>
        </View>
      </View>
    );
  }
  
  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Header */}
      <View style={[styles.header, isMobile && styles.headerMobile]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={onBack}
          accessibilityRole="button"
          accessibilityLabel="Back to Tools"
        >
          <Text style={[styles.backText, { color: theme.secondaryText }]}>← Back to Tools</Text>
        </TouchableOpacity>
        
        <View style={styles.titleContainer}>
          <Text style={[styles.title, { color: theme.text }]}>
            ⚔️ Gear Comparison Tool
          </Text>
          <Text style={[styles.subtitle, { color: theme.secondaryText }]}>
            Side-by-side drummer setup battles
          </Text>
        </View>
      </View>
      
      {/* Selection Interface */}
      <View style={[styles.selectionSection, isMobile && styles.selectionSectionMobile]}>
        <View style={[styles.selectorsRow, isMobile && styles.selectorsRowMobile]}>
          <DrummerSelect
            drummers={drummers}
            selectedSlug={drummer1Slug}
            onSelect={handleSelectDrummer1}
            placeholder="Select Drummer 1"
            theme={theme}
            isMobile={isMobile}
          />
          
          <View style={styles.vsContainer}>
            <TouchableOpacity 
              style={[styles.switchBtn, { backgroundColor: theme.card, borderColor: theme.border }]}
              onPress={handleSwitch}
              accessibilityLabel="Switch drummers"
            >
              <Text style={styles.switchIcon}>⇄</Text>
            </TouchableOpacity>
            <Text style={[styles.vsText, { color: theme.secondaryText }]}>VS</Text>
          </View>
          
          <DrummerSelect
            drummers={drummers}
            selectedSlug={drummer2Slug}
            onSelect={handleSelectDrummer2}
            placeholder="Select Drummer 2"
            theme={theme}
            isMobile={isMobile}
          />
        </View>
        
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={[styles.randomBtn, { backgroundColor: colors.primary }]}
            onPress={handleRandom}
            accessibilityLabel="Random matchup"
          >
            <Text style={styles.randomBtnText}>🎲 Random Matchup</Text>
          </TouchableOpacity>
        </View>
        
        <QuickPicks onSelect={handleQuickPick} theme={theme} isMobile={isMobile} />
      </View>
      
      {/* Comparison View */}
      {hasComparison && (
        <View style={styles.comparisonSection}>
          {/* Drummer Cards Header */}
          <View style={[styles.drummerCardsRow, isMobile && styles.drummerCardsRowMobile]}>
            <DrummerCompareCard 
              drummer={drummer1} 
              theme={theme} 
              isMobile={isMobile}
              position="left"
              onSelectDrummer={onSelectDrummer}
            />
            <DrummerCompareCard 
              drummer={drummer2} 
              theme={theme} 
              isMobile={isMobile}
              position="right"
              onSelectDrummer={onSelectDrummer}
            />
          </View>
          
          {/* Gear Categories */}
          <View style={[styles.gearSection, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={[styles.gearSectionTitle, { color: theme.text }]}>
              🥁 Complete Gear Breakdown
            </Text>
            {GEAR_CATEGORIES.map(category => (
              <GearCategoryRow
                key={category.key}
                category={category}
                gear1={drummer1?.gear}
                gear2={drummer2?.gear}
                theme={theme}
                onAffiliateClick={handleAffiliateClick}
                drummer1Slug={drummer1Slug}
                drummer2Slug={drummer2Slug}
              />
            ))}
          </View>
          
          {/* Vote Section */}
          <VoteSection 
            drummer1={drummer1} 
            drummer2={drummer2} 
            theme={theme} 
            isMobile={isMobile}
          />
          
          {/* Share Section */}
          <ShareButtons 
            drummer1={drummer1} 
            drummer2={drummer2} 
            theme={theme} 
            isMobile={isMobile}
          />
        </View>
      )}
      
      {/* Empty State */}
      {!hasComparison && (
        <View style={[styles.emptyState, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={styles.emptyEmoji}>🥁</Text>
          <Text style={[styles.emptyTitle, { color: theme.text }]}>
            Select two drummers to compare
          </Text>
          <Text style={[styles.emptyDescription, { color: theme.secondaryText }]}>
            Choose from the dropdowns above or click a popular matchup to see a side-by-side gear comparison.
          </Text>
        </View>
      )}
      
      {/* SEO Footer */}
      <View style={[styles.seoFooter, { borderTopColor: theme.border }]}>
        <Text style={[styles.seoTitle, { color: theme.text }]}>
          About the Gear Comparison Tool
        </Text>
        <Text style={[styles.seoText, { color: theme.secondaryText }]}>
          Compare any two metal drummers' complete gear setups side-by-side. See their drums, snares, cymbals, 
          hardware, sticks, and heads. Discover which legendary drummers use similar brands, and find links 
          to shop their exact equipment. Perfect for drummers looking to upgrade their kit or learn what 
          the pros use.
        </Text>
      </View>
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
    paddingBottom: 60,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  loadingText: {
    fontSize: fontSize.lg,
  },
  
  // Header
  header: {
    padding: spacing.lg,
    paddingTop: spacing.xl,
  },
  headerMobile: {
    padding: spacing.md,
  },
  backButton: {
    marginBottom: spacing.md,
  },
  backText: {
    fontSize: fontSize.md,
  },
  titleContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: fontSize.md,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  
  // Selection Section
  selectionSection: {
    padding: spacing.lg,
  },
  selectionSectionMobile: {
    padding: spacing.md,
  },
  selectorsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  selectorsRowMobile: {
    flexDirection: 'column',
    gap: spacing.md,
  },
  vsContainer: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  vsText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
  },
  switchBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchIcon: {
    fontSize: fontSize.lg,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.lg,
    gap: spacing.md,
  },
  randomBtn: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: 8,
  },
  randomBtnText: {
    color: '#fff',
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
  },
  
  // Dropdown Select
  selectContainer: {
    flex: 1,
    maxWidth: 300,
    zIndex: 1000,
  },
  selectContainerMobile: {
    maxWidth: '100%',
    width: '100%',
  },
  selectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.sm,
    borderRadius: 8,
    borderWidth: 1,
    minHeight: 56,
  },
  selectedDrummer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  selectThumb: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: spacing.sm,
  },
  selectedInfo: {
    flex: 1,
  },
  selectedName: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
  },
  selectedBand: {
    fontSize: fontSize.sm,
  },
  placeholder: {
    fontSize: fontSize.md,
  },
  chevron: {
    fontSize: fontSize.sm,
    marginLeft: spacing.sm,
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 4,
    maxHeight: 300,
    zIndex: 1001,
    ...Platform.select({
      web: {
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      },
    }),
  },
  searchInput: {
    margin: spacing.sm,
    padding: spacing.sm,
    borderRadius: 6,
    borderWidth: 1,
    fontSize: fontSize.md,
  },
  dropdownList: {
    maxHeight: 220,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.sm,
  },
  dropdownThumb: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: spacing.sm,
  },
  dropdownInfo: {
    flex: 1,
  },
  dropdownName: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
  },
  dropdownBand: {
    fontSize: fontSize.sm,
  },
  noResults: {
    padding: spacing.md,
    textAlign: 'center',
    fontSize: fontSize.sm,
  },
  
  // Quick Picks
  quickPicks: {
    marginTop: spacing.xl,
  },
  quickPicksMobile: {
    marginTop: spacing.lg,
  },
  quickPicksLabel: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  quickPicksRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  quickPickBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: 20,
    borderWidth: 1,
    gap: spacing.xs,
  },
  quickPickEmoji: {
    fontSize: fontSize.md,
  },
  quickPickText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },
  
  // Comparison Section
  comparisonSection: {
    padding: spacing.lg,
  },
  drummerCardsRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  drummerCardsRowMobile: {
    flexDirection: 'column',
  },
  
  // Drummer Card
  drummerCard: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  drummerCardLeft: {
    marginRight: spacing.xs,
  },
  drummerCardRight: {
    marginLeft: spacing.xs,
  },
  drummerCardEmpty: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
  },
  emptyText: {
    fontSize: fontSize.md,
  },
  drummerImage: {
    width: '100%',
    height: 150,
  },
  drummerInfo: {
    padding: spacing.md,
  },
  drummerName: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
  },
  drummerBand: {
    fontSize: fontSize.md,
    marginTop: 2,
  },
  drummerStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginTop: spacing.sm,
  },
  statBadge: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  statText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
  },
  kitCostContainer: {
    marginTop: spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  kitCostLabel: {
    fontSize: fontSize.sm,
  },
  kitCostValue: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
  },
  
  // Gear Section
  gearSection: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: spacing.lg,
  },
  gearSectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    padding: spacing.md,
    textAlign: 'center',
  },
  gearRow: {
    borderBottomWidth: 1,
  },
  gearCategory: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.sm,
    gap: spacing.xs,
  },
  gearCategoryEmoji: {
    fontSize: fontSize.lg,
  },
  gearCategoryLabel: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
  },
  gearComparison: {
    flexDirection: 'row',
    padding: spacing.sm,
  },
  gearItem: {
    flex: 1,
    padding: spacing.sm,
  },
  gearItemShared: {
    backgroundColor: 'rgba(76, 175, 80, 0.05)',
  },
  gearText: {
    fontSize: fontSize.sm,
    lineHeight: lineHeight.md,
  },
  affiliateHint: {
    fontSize: fontSize.xs,
    marginTop: spacing.xs,
    fontWeight: fontWeight.medium,
  },
  gearDivider: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vsDivider: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
  },
  sharedBadge: {
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
  },
  sharedText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.bold,
  },
  
  // Vote Section
  voteSection: {
    alignItems: 'center',
    padding: spacing.lg,
  },
  voteSectionMobile: {
    padding: spacing.md,
  },
  voteLabel: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    marginBottom: spacing.md,
  },
  voteButtons: {
    flexDirection: 'row',
    gap: spacing.md,
    width: '100%',
    maxWidth: 400,
  },
  voteBtn: {
    flex: 1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  voteBtnText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
  },
  voteCheck: {
    color: '#fff',
    fontSize: fontSize.md,
  },
  votedMessage: {
    marginTop: spacing.md,
    fontSize: fontSize.sm,
  },
  
  // Share Section
  shareSection: {
    alignItems: 'center',
    padding: spacing.lg,
  },
  shareSectionMobile: {
    padding: spacing.md,
  },
  shareLabel: {
    fontSize: fontSize.sm,
    marginBottom: spacing.sm,
  },
  shareButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  shareBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  shareBtnTwitter: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  shareBtnFacebook: {
    backgroundColor: '#1877F2',
    borderColor: '#1877F2',
  },
  shareBtnWhatsapp: {
    backgroundColor: '#25D366',
    borderColor: '#25D366',
  },
  shareBtnText: {
    fontSize: fontSize.lg,
    color: '#fff',
    fontWeight: fontWeight.bold,
  },
  
  // Empty State
  emptyState: {
    margin: spacing.lg,
    padding: spacing.xl,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: spacing.md,
  },
  emptyTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  emptyDescription: {
    fontSize: fontSize.md,
    textAlign: 'center',
    lineHeight: lineHeight.lg,
    maxWidth: 400,
  },
  
  // SEO Footer
  seoFooter: {
    margin: spacing.lg,
    marginTop: spacing.xl,
    paddingTop: spacing.lg,
    borderTopWidth: 1,
  },
  seoTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    marginBottom: spacing.sm,
  },
  seoText: {
    fontSize: fontSize.sm,
    lineHeight: lineHeight.lg,
  },
});
