/**
 * GearSearch Component - Issue #719
 * Searchable gear database interface to find drummers by equipment brand/type
 * 
 * Features:
 * - Search bar with auto-complete
 * - Filter dropdowns: Category, Brand, Price range
 * - Quick tags: Popular Brands, Budget-Friendly, Pro Tier
 * - Drummer cards with highlighted gear
 * - Save Search, Compare, Share functionality
 * - Schema.org structured data for SEO
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
import {
  searchGear,
  getDrummersUsingGear,
  getDrummersUsingBrand,
  getGearByBrand,
  getAllBrands,
  getGearById,
  getDrummerGear,
  getTopBrands,
  GEAR_DATABASE,
  BRAND_SEO_DATA,
  PRICE_RANGES,
  QUICK_TAGS,
  getSearchParamsFromURL,
  updateSearchURL,
} from '../data/gearSearchData';

// ==========================================
// ANALYTICS TRACKING
// ==========================================

export const trackGearSearch = (query, filters) => {
  if (Platform.OS === 'web' && typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'gear_search', {
      search_query: query,
      category_filter: filters.category || 'all',
      brand_filter: filters.brand || 'all',
      price_filter: filters.price || 'all',
    });
  }
};

export const trackGearClick = (gearId, gearName) => {
  if (Platform.OS === 'web' && typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'gear_click', {
      gear_id: gearId,
      gear_name: gearName,
    });
  }
};

export const trackDrummerFromGear = (drummerSlug, gearId) => {
  if (Platform.OS === 'web' && typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'drummer_from_gear', {
      drummer_slug: drummerSlug,
      gear_id: gearId,
    });
  }
};

export const trackSaveSearch = (searchParams) => {
  if (Platform.OS === 'web' && typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'save_search', {
      search_params: JSON.stringify(searchParams),
    });
  }
};

export const trackCompareClick = (drummerSlugs) => {
  if (Platform.OS === 'web' && typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'compare_drummers', {
      drummer_count: drummerSlugs.length,
      drummers: drummerSlugs.join(','),
    });
  }
};

export const trackShareSearch = (platform) => {
  if (Platform.OS === 'web' && typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'share_search', {
      platform: platform,
    });
  }
};

export const trackAffiliateClick = (brand, url) => {
  if (Platform.OS === 'web' && typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'affiliate_click', {
      brand: brand,
      url: url,
    });
  }
};

// ==========================================
// META TAG UTILITIES
// ==========================================

export function updateGearSearchMeta(searchQuery, resultCount) {
  if (Platform.OS !== 'web' || typeof document === 'undefined') return;

  const title = searchQuery 
    ? `"${searchQuery}" - Gear Search | MetalForge`
    : 'Gear Search Engine - Find Drummers by Equipment | MetalForge';
  
  const description = searchQuery
    ? `Found ${resultCount} results for "${searchQuery}". Discover which metal drummers use this gear.`
    : 'Search our gear database to find which legendary metal drummers use specific brands and equipment. Find drummers by Tama, Pearl, Zildjian, and more.';

  document.title = title;
  
  const setMeta = (name, content, isProperty = false) => {
    const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
    let meta = document.querySelector(selector);
    if (!meta) {
      meta = document.createElement('meta');
      if (isProperty) {
        meta.setAttribute('property', name);
      } else {
        meta.setAttribute('name', name);
      }
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);
  };

  setMeta('description', description);
  setMeta('og:title', title, true);
  setMeta('og:description', description, true);
  setMeta('og:url', `https://metalforge.io/tools/gear-search${searchQuery ? `?q=${encodeURIComponent(searchQuery)}` : ''}`, true);
  setMeta('og:type', 'website', true);
  setMeta('twitter:card', 'summary_large_image');
  setMeta('twitter:title', title);
  setMeta('twitter:description', description);

  // Update canonical URL
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', 'https://metalforge.io/tools/gear-search');

  // Add structured data
  injectGearSearchSchema(searchQuery, resultCount);
}

export function updateGearBrandMeta(brandSlug) {
  if (Platform.OS !== 'web' || typeof document === 'undefined') return;

  const brand = BRAND_SEO_DATA[brandSlug];
  if (!brand) return;

  const title = brand.metaTitle || `${brand.name} Metal Drummers | MetalForge`;
  const description = brand.metaDescription || `Discover which metal drummers use ${brand.name} equipment.`;

  document.title = title;
  
  const setMeta = (name, content, isProperty = false) => {
    const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
    let meta = document.querySelector(selector);
    if (!meta) {
      meta = document.createElement('meta');
      if (isProperty) {
        meta.setAttribute('property', name);
      } else {
        meta.setAttribute('name', name);
      }
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);
  };

  setMeta('description', description);
  setMeta('keywords', (brand.keywords || []).join(', '));
  setMeta('og:title', title, true);
  setMeta('og:description', description, true);
  setMeta('og:url', `https://metalforge.io/gear/${brandSlug}`, true);
  setMeta('og:type', 'website', true);
  setMeta('twitter:card', 'summary_large_image');
  setMeta('twitter:title', title);
  setMeta('twitter:description', description);

  // Update canonical URL
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', `https://metalforge.io/gear/${brandSlug}`);

  // Add structured data
  injectBrandPageSchema(brand);
}

// ==========================================
// SCHEMA.ORG STRUCTURED DATA
// ==========================================

function injectGearSearchSchema(searchQuery, resultCount) {
  if (typeof document === 'undefined') return;

  // Remove existing schema
  const existing = document.querySelector('script[data-schema="gear-search"]');
  if (existing) existing.remove();

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    'name': searchQuery ? `"${searchQuery}" Gear Search Results` : 'Gear Search Engine',
    'description': 'Search for metal drummers by the equipment they use',
    'url': `https://metalforge.io/tools/gear-search${searchQuery ? `?q=${encodeURIComponent(searchQuery)}` : ''}`,
    'breadcrumb': {
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://metalforge.io' },
        { '@type': 'ListItem', 'position': 2, 'name': 'Tools', 'item': 'https://metalforge.io/tools' },
        { '@type': 'ListItem', 'position': 3, 'name': 'Gear Search', 'item': 'https://metalforge.io/tools/gear-search' },
      ]
    },
    'mainEntity': {
      '@type': 'SearchAction',
      'target': 'https://metalforge.io/tools/gear-search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };

  const script = document.createElement('script');
  script.setAttribute('type', 'application/ld+json');
  script.setAttribute('data-schema', 'gear-search');
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

function injectBrandPageSchema(brand) {
  if (typeof document === 'undefined') return;

  // Remove existing schema
  const existing = document.querySelector('script[data-schema="brand-page"]');
  if (existing) existing.remove();

  const drummers = getDrummersUsingBrand(brand.slug);
  const gear = getGearByBrand(brand.slug);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'name': `${brand.name} Metal Drummers`,
    'description': brand.metaDescription,
    'url': `https://metalforge.io/gear/${brand.slug}`,
    'numberOfItems': drummers.length,
    'itemListElement': drummers.slice(0, 10).map((slug, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      'url': `https://metalforge.io/drummer/${slug}`
    })),
    'breadcrumb': {
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://metalforge.io' },
        { '@type': 'ListItem', 'position': 2, 'name': 'Gear Search', 'item': 'https://metalforge.io/tools/gear-search' },
        { '@type': 'ListItem', 'position': 3, 'name': brand.name, 'item': `https://metalforge.io/gear/${brand.slug}` },
      ]
    }
  };

  const script = document.createElement('script');
  script.setAttribute('type', 'application/ld+json');
  script.setAttribute('data-schema', 'brand-page');
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

// ==========================================
// SAVED SEARCHES UTILITIES
// ==========================================

const SAVED_SEARCHES_KEY = 'metalforge_saved_searches';

function getSavedSearches() {
  if (typeof localStorage === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(SAVED_SEARCHES_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveSearch(searchParams) {
  if (typeof localStorage === 'undefined') return;
  const searches = getSavedSearches();
  const newSearch = {
    ...searchParams,
    savedAt: Date.now(),
    id: `search-${Date.now()}`
  };
  // Remove duplicates
  const filtered = searches.filter(s => 
    s.q !== searchParams.q || 
    s.category !== searchParams.category || 
    s.brand !== searchParams.brand
  );
  filtered.unshift(newSearch);
  // Keep only last 10
  const limited = filtered.slice(0, 10);
  localStorage.setItem(SAVED_SEARCHES_KEY, JSON.stringify(limited));
  trackSaveSearch(searchParams);
  return newSearch;
}

function removeSavedSearch(searchId) {
  if (typeof localStorage === 'undefined') return;
  const searches = getSavedSearches();
  const filtered = searches.filter(s => s.id !== searchId);
  localStorage.setItem(SAVED_SEARCHES_KEY, JSON.stringify(filtered));
}

// ==========================================
// SHARE UTILITIES
// ==========================================

function getShareUrl(searchParams) {
  const baseUrl = 'https://metalforge.io/tools/gear-search';
  const params = new URLSearchParams();
  if (searchParams.q) params.set('q', searchParams.q);
  if (searchParams.category) params.set('category', searchParams.category);
  if (searchParams.brand) params.set('brand', searchParams.brand);
  params.set('utm_source', 'share');
  params.set('utm_medium', 'social');
  return `${baseUrl}?${params.toString()}`;
}

function getShareText(searchParams, resultCount) {
  if (searchParams.q) {
    return `Found ${resultCount} metal drummers using "${searchParams.q}" on MetalForge! 🥁`;
  }
  if (searchParams.brand) {
    const brand = BRAND_SEO_DATA[searchParams.brand];
    return `Check out metal drummers who use ${brand?.name || searchParams.brand}! 🥁`;
  }
  return 'Search for metal drummers by the gear they use! 🥁';
}

// ==========================================
// CATEGORY LABELS
// ==========================================

const CATEGORY_LABELS = {
  drums: { label: 'Shell Packs', icon: '🥁' },
  snare: { label: 'Snare Drums', icon: '🎯' },
  cymbals: { label: 'Cymbals', icon: '🔔' },
  hardware: { label: 'Hardware', icon: '⚙️' },
  sticks: { label: 'Drumsticks', icon: '🥢' },
};

const SORT_OPTIONS = [
  { id: 'popularity', label: 'Most Popular' },
  { id: 'price-low', label: 'Price: Low to High' },
  { id: 'price-high', label: 'Price: High to Low' },
  { id: 'alpha', label: 'A-Z' },
];

// ==========================================
// GEAR SEARCH PAGE COMPONENT
// ==========================================

export function GearSearchPage({ theme, onBack, drummers, onSelectDrummer }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  
  // State
  const [searchQuery, setSearchQuery] = useState(() => getSearchParamsFromURL().q || '');
  const [filters, setFilters] = useState(() => ({
    category: getSearchParamsFromURL().category || '',
    brand: getSearchParamsFromURL().brand || '',
    price: getSearchParamsFromURL().price || '',
  }));
  const [sortBy, setSortBy] = useState(() => getSearchParamsFromURL().sort || 'popularity');
  const [results, setResults] = useState([]);
  const [selectedDrummers, setSelectedDrummers] = useState([]);
  const [showSavedSearches, setShowSavedSearches] = useState(false);
  const [savedSearches, setSavedSearches] = useState(() => getSavedSearches());
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  
  const searchInputRef = useRef(null);

  // Get all brands for filter dropdown
  const allBrands = useMemo(() => getAllBrands(), []);
  const drumBrands = useMemo(() => allBrands.filter(b => b.type === 'drums'), [allBrands]);
  const cymbalBrands = useMemo(() => allBrands.filter(b => b.type === 'cymbals'), [allBrands]);
  const otherBrands = useMemo(() => allBrands.filter(b => !['drums', 'cymbals'].includes(b.type)), [allBrands]);

  // Perform search
  const performSearch = useCallback(() => {
    const searchResults = searchGear(searchQuery, {
      category: filters.category,
      brand: filters.brand,
      tier: filters.price,
    });
    
    // Sort results
    let sorted = [...searchResults];
    switch (sortBy) {
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'alpha':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'popularity':
      default:
        // Sort by number of drummers using this gear
        sorted.sort((a, b) => {
          const aCount = getDrummersUsingGear(a.id).length;
          const bCount = getDrummersUsingGear(b.id).length;
          return bCount - aCount;
        });
    }
    
    setResults(sorted);
    setHasSearched(true);
    trackGearSearch(searchQuery, filters);
    updateSearchURL({ q: searchQuery, ...filters, sort: sortBy });
    updateGearSearchMeta(searchQuery, sorted.length);
  }, [searchQuery, filters, sortBy]);

  // Auto-search on mount if URL has params
  useEffect(() => {
    const urlParams = getSearchParamsFromURL();
    if (urlParams.q || urlParams.category || urlParams.brand || urlParams.price) {
      performSearch();
    } else {
      // Show popular gear by default
      const popularGear = searchGear('', {});
      popularGear.sort((a, b) => {
        const aCount = getDrummersUsingGear(a.id).length;
        const bCount = getDrummersUsingGear(b.id).length;
        return bCount - aCount;
      });
      setResults(popularGear.slice(0, 20));
      updateGearSearchMeta('', 0);
    }
  }, []);

  // Handle search submit
  const handleSearch = () => {
    performSearch();
  };

  // Handle filter change
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  // Handle quick tag click
  const handleQuickTag = (tagType, tagId) => {
    if (tagType === 'brand') {
      setFilters(prev => ({ ...prev, brand: tagId }));
      setSearchQuery('');
    } else {
      setSearchQuery('');
      const gearItem = getGearById(tagId);
      if (gearItem) {
        setSearchQuery(gearItem.name);
      }
    }
    setTimeout(() => performSearch(), 100);
  };

  // Handle save search
  const handleSaveSearch = () => {
    const saved = saveSearch({ q: searchQuery, ...filters });
    setSavedSearches(getSavedSearches());
  };

  // Handle compare drummers
  const handleCompare = () => {
    if (selectedDrummers.length >= 2) {
      trackCompareClick(selectedDrummers);
      const compareUrl = `/compare?d1=${selectedDrummers[0]}&d2=${selectedDrummers[1]}${selectedDrummers[2] ? `&d3=${selectedDrummers[2]}` : ''}`;
      window.history.pushState({}, '', compareUrl);
      window.location.reload();
    }
  };

  // Toggle drummer selection
  const toggleDrummerSelection = (drummerSlug) => {
    setSelectedDrummers(prev => {
      if (prev.includes(drummerSlug)) {
        return prev.filter(s => s !== drummerSlug);
      }
      if (prev.length < 3) {
        return [...prev, drummerSlug];
      }
      return prev;
    });
  };

  // Handle share
  const handleShare = async (platform) => {
    const shareUrl = getShareUrl({ q: searchQuery, ...filters });
    const shareText = getShareText({ q: searchQuery, ...filters }, results.length);

    trackShareSearch(platform);

    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
        break;
      case 'copy':
        try {
          await navigator.clipboard.writeText(shareUrl);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch (err) {
          console.error('Failed to copy:', err);
        }
        break;
    }
  };

  // Navigate to drummer
  const handleDrummerClick = (drummerSlug, gearId) => {
    trackDrummerFromGear(drummerSlug, gearId);
    const drummer = drummers.find(d => d.id === drummerSlug || d.slug === drummerSlug);
    if (drummer && onSelectDrummer) {
      onSelectDrummer(drummer);
    } else {
      window.history.pushState({}, '', `/drummer/${drummerSlug}`);
      window.location.reload();
    }
  };

  // Get drummer display info
  const getDrummerInfo = (drummerSlug) => {
    const drummer = drummers.find(d => 
      d.id === drummerSlug || 
      d.slug === drummerSlug ||
      d.name.toLowerCase().replace(/\s+/g, '-') === drummerSlug
    );
    if (drummer) {
      return { name: drummer.name, band: drummer.band, image: drummer.image };
    }
    return { 
      name: drummerSlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      band: '',
      image: null
    };
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Back Button */}
      <TouchableOpacity 
        style={styles.backButton}
        onPress={onBack}
        accessibilityRole="button"
        accessibilityLabel="Go back"
      >
        <Text style={[styles.backButtonText, { color: theme.accent }]}>← Back</Text>
      </TouchableOpacity>

      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>
          🔍 Gear Search Engine
        </Text>
        <Text style={[styles.subtitle, { color: theme.secondaryText }]}>
          Find drummers by the equipment they use
        </Text>
      </View>

      {/* Search Bar */}
      <View style={[styles.searchSection, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <View style={styles.searchInputContainer}>
          <TextInput
            ref={searchInputRef}
            style={[styles.searchInput, { color: theme.text, borderColor: theme.border }]}
            placeholder="Search gear, brands, models..."
            placeholderTextColor={theme.secondaryText}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
          <TouchableOpacity 
            style={[styles.searchButton, { backgroundColor: theme.accent }]}
            onPress={handleSearch}
          >
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>

        {/* Filters Row */}
        <View style={[styles.filtersRow, isMobile && styles.filtersRowMobile]}>
          {/* Category Filter */}
          <View style={[styles.filterItem, isMobile && styles.filterItemMobile]}>
            <Text style={[styles.filterLabel, { color: theme.secondaryText }]}>Category</Text>
            {Platform.OS === 'web' ? (
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                style={{
                  padding: 8,
                  borderRadius: 8,
                  border: `1px solid ${theme.border}`,
                  backgroundColor: theme.card,
                  color: theme.text,
                  fontSize: 14,
                  minWidth: 140,
                }}
              >
                <option value="">All Categories</option>
                {Object.entries(CATEGORY_LABELS).map(([key, { label, icon }]) => (
                  <option key={key} value={key}>{icon} {label}</option>
                ))}
              </select>
            ) : (
              <Text style={{ color: theme.text }}>{filters.category || 'All'}</Text>
            )}
          </View>

          {/* Brand Filter */}
          <View style={[styles.filterItem, isMobile && styles.filterItemMobile]}>
            <Text style={[styles.filterLabel, { color: theme.secondaryText }]}>Brand</Text>
            {Platform.OS === 'web' ? (
              <select
                value={filters.brand}
                onChange={(e) => handleFilterChange('brand', e.target.value)}
                style={{
                  padding: 8,
                  borderRadius: 8,
                  border: `1px solid ${theme.border}`,
                  backgroundColor: theme.card,
                  color: theme.text,
                  fontSize: 14,
                  minWidth: 140,
                }}
              >
                <option value="">All Brands</option>
                <optgroup label="🥁 Drum Brands">
                  {drumBrands.map(b => (
                    <option key={b.slug} value={b.slug}>{b.name}</option>
                  ))}
                </optgroup>
                <optgroup label="🔔 Cymbal Brands">
                  {cymbalBrands.map(b => (
                    <option key={b.slug} value={b.slug}>{b.name}</option>
                  ))}
                </optgroup>
                <optgroup label="🔧 Other">
                  {otherBrands.map(b => (
                    <option key={b.slug} value={b.slug}>{b.name}</option>
                  ))}
                </optgroup>
              </select>
            ) : (
              <Text style={{ color: theme.text }}>{filters.brand || 'All'}</Text>
            )}
          </View>

          {/* Price Filter */}
          <View style={[styles.filterItem, isMobile && styles.filterItemMobile]}>
            <Text style={[styles.filterLabel, { color: theme.secondaryText }]}>Price Range</Text>
            {Platform.OS === 'web' ? (
              <select
                value={filters.price}
                onChange={(e) => handleFilterChange('price', e.target.value)}
                style={{
                  padding: 8,
                  borderRadius: 8,
                  border: `1px solid ${theme.border}`,
                  backgroundColor: theme.card,
                  color: theme.text,
                  fontSize: 14,
                  minWidth: 140,
                }}
              >
                <option value="">All Prices</option>
                {PRICE_RANGES.map(range => (
                  <option key={range.id} value={range.id}>{range.emoji} {range.label}</option>
                ))}
              </select>
            ) : (
              <Text style={{ color: theme.text }}>{filters.price || 'All'}</Text>
            )}
          </View>
        </View>
      </View>

      {/* Quick Tags */}
      <View style={styles.quickTagsSection}>
        <Text style={[styles.quickTagsTitle, { color: theme.text }]}>Quick Filters</Text>
        
        {/* Popular Brands */}
        <View style={styles.tagGroup}>
          <Text style={[styles.tagGroupLabel, { color: theme.secondaryText }]}>🔥 Popular Brands</Text>
          <View style={styles.tagsList}>
            {QUICK_TAGS.popularBrands.map(tag => (
              <TouchableOpacity
                key={tag.id}
                style={[styles.tag, { backgroundColor: theme.card, borderColor: theme.border }]}
                onPress={() => handleQuickTag('brand', tag.id)}
              >
                <Text style={[styles.tagText, { color: theme.text }]}>{tag.icon} {tag.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Budget-Friendly */}
        <View style={styles.tagGroup}>
          <Text style={[styles.tagGroupLabel, { color: theme.secondaryText }]}>💰 Budget-Friendly</Text>
          <View style={styles.tagsList}>
            {QUICK_TAGS.budgetFriendly.map(tag => (
              <TouchableOpacity
                key={tag.id}
                style={[styles.tag, { backgroundColor: theme.card, borderColor: theme.border }]}
                onPress={() => handleQuickTag('gear', tag.id)}
              >
                <Text style={[styles.tagText, { color: theme.text }]}>{tag.icon} {tag.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Pro Tier */}
        <View style={styles.tagGroup}>
          <Text style={[styles.tagGroupLabel, { color: theme.secondaryText }]}>🏆 Pro Tier</Text>
          <View style={styles.tagsList}>
            {QUICK_TAGS.proTier.map(tag => (
              <TouchableOpacity
                key={tag.id}
                style={[styles.tag, { backgroundColor: theme.card, borderColor: theme.border }]}
                onPress={() => handleQuickTag('gear', tag.id)}
              >
                <Text style={[styles.tagText, { color: theme.text }]}>{tag.icon} {tag.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      {/* Results Header */}
      {hasSearched && (
        <View style={styles.resultsHeader}>
          <Text style={[styles.resultsCount, { color: theme.text }]}>
            {results.length} {results.length === 1 ? 'result' : 'results'}
            {searchQuery && ` for "${searchQuery}"`}
          </Text>
          
          <View style={styles.resultsActions}>
            {/* Sort Dropdown */}
            {Platform.OS === 'web' && (
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setTimeout(performSearch, 100);
                }}
                style={{
                  padding: 6,
                  borderRadius: 6,
                  border: `1px solid ${theme.border}`,
                  backgroundColor: theme.card,
                  color: theme.text,
                  fontSize: 13,
                }}
              >
                {SORT_OPTIONS.map(opt => (
                  <option key={opt.id} value={opt.id}>{opt.label}</option>
                ))}
              </select>
            )}

            {/* Action Buttons */}
            <TouchableOpacity 
              style={[styles.actionButton, { borderColor: theme.border }]}
              onPress={handleSaveSearch}
            >
              <Text style={[styles.actionButtonText, { color: theme.text }]}>💾 Save</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.actionButton, { borderColor: theme.border }]}
              onPress={() => setShowShareModal(true)}
            >
              <Text style={[styles.actionButtonText, { color: theme.text }]}>🔗 Share</Text>
            </TouchableOpacity>
            
            {selectedDrummers.length >= 2 && (
              <TouchableOpacity 
                style={[styles.actionButton, styles.compareButton, { backgroundColor: theme.accent }]}
                onPress={handleCompare}
              >
                <Text style={[styles.actionButtonText, { color: '#fff' }]}>
                  ⚖️ Compare ({selectedDrummers.length})
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}

      {/* Results Grid */}
      <View style={[styles.resultsGrid, isMobile && styles.resultsGridMobile]}>
        {results.map(gear => {
          const drummersUsing = getDrummersUsingGear(gear.id);
          const categoryInfo = CATEGORY_LABELS[gear.category];
          const brandInfo = BRAND_SEO_DATA[gear.brand];
          
          return (
            <View 
              key={gear.id}
              style={[styles.gearCard, { backgroundColor: theme.card, borderColor: theme.border }]}
            >
              {/* Gear Header */}
              <View style={styles.gearHeader}>
                <Text style={styles.gearIcon}>{categoryInfo?.icon || '🎵'}</Text>
                <View style={styles.gearTitleSection}>
                  <Text style={[styles.gearName, { color: theme.text }]}>{gear.name}</Text>
                  <Text style={[styles.gearBrand, { color: theme.accent }]}>
                    {brandInfo?.name || gear.brand}
                  </Text>
                </View>
                <Text style={[styles.gearPrice, { color: theme.secondaryText }]}>
                  ${gear.price.toLocaleString()}
                </Text>
              </View>

              {/* Tier Badge */}
              <View style={styles.tierBadgeRow}>
                <View style={[
                  styles.tierBadge,
                  { backgroundColor: gear.tier === 'pro' ? '#f59e0b' : gear.tier === 'mid' ? '#3b82f6' : '#22c55e' }
                ]}>
                  <Text style={styles.tierBadgeText}>
                    {gear.tier === 'pro' ? '🏆 Pro' : gear.tier === 'mid' ? '⚖️ Mid' : '💰 Budget'}
                  </Text>
                </View>
              </View>

              {/* Drummers Using This Gear */}
              <View style={styles.drummersSection}>
                <Text style={[styles.drummersTitle, { color: theme.secondaryText }]}>
                  {drummersUsing.length > 0 
                    ? `${drummersUsing.length} ${drummersUsing.length === 1 ? 'drummer uses' : 'drummers use'} this`
                    : 'Popular gear'
                  }
                </Text>
                
                <View style={styles.drummersList}>
                  {drummersUsing.slice(0, 4).map(slug => {
                    const info = getDrummerInfo(slug);
                    const isSelected = selectedDrummers.includes(slug);
                    
                    return (
                      <TouchableOpacity
                        key={slug}
                        style={[
                          styles.drummerCard,
                          { backgroundColor: theme.background, borderColor: isSelected ? theme.accent : theme.border },
                          isSelected && styles.drummerCardSelected
                        ]}
                        onPress={() => handleDrummerClick(slug, gear.id)}
                        onLongPress={() => toggleDrummerSelection(slug)}
                      >
                        <View style={styles.drummerCheckbox}>
                          <TouchableOpacity
                            onPress={(e) => {
                              e.stopPropagation();
                              toggleDrummerSelection(slug);
                            }}
                            style={[
                              styles.checkbox,
                              { borderColor: theme.border },
                              isSelected && { backgroundColor: theme.accent, borderColor: theme.accent }
                            ]}
                          >
                            {isSelected && <Text style={styles.checkmark}>✓</Text>}
                          </TouchableOpacity>
                        </View>
                        <View style={styles.drummerInfo}>
                          <Text style={[styles.drummerName, { color: theme.text }]} numberOfLines={1}>
                            {info.name}
                          </Text>
                          {info.band && (
                            <Text style={[styles.drummerBand, { color: theme.secondaryText }]} numberOfLines={1}>
                              {info.band}
                            </Text>
                          )}
                        </View>
                        <Text style={styles.drummerArrow}>→</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>

                {drummersUsing.length > 4 && (
                  <Text style={[styles.moreCount, { color: theme.accent }]}>
                    +{drummersUsing.length - 4} more
                  </Text>
                )}
              </View>

              {/* Shop CTA */}
              {brandInfo?.affiliateUrl && (
                <TouchableOpacity
                  style={[styles.shopButton, { backgroundColor: theme.accent }]}
                  onPress={() => {
                    trackAffiliateClick(gear.brand, brandInfo.affiliateUrl);
                    window.open(brandInfo.affiliateUrl, '_blank');
                  }}
                >
                  <Text style={styles.shopButtonText}>
                    🛒 Shop {brandInfo.name}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </View>

      {/* No Results */}
      {hasSearched && results.length === 0 && (
        <View style={styles.noResults}>
          <Text style={[styles.noResultsText, { color: theme.secondaryText }]}>
            No gear found matching your search. Try different keywords or filters.
          </Text>
        </View>
      )}

      {/* Newsletter CTA */}
      <View style={[styles.newsletterCta, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <Text style={[styles.newsletterTitle, { color: theme.text }]}>
          🔔 Get Brand Updates
        </Text>
        <Text style={[styles.newsletterText, { color: theme.secondaryText }]}>
          Subscribe to get notified when your favorite brands release new gear or when drummers update their setups.
        </Text>
        <TouchableOpacity
          style={[styles.newsletterButton, { backgroundColor: theme.accent }]}
          onPress={() => {
            window.history.pushState({}, '', '/#newsletter');
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
          }}
        >
          <Text style={styles.newsletterButtonText}>Subscribe to Newsletter</Text>
        </TouchableOpacity>
      </View>

      {/* Share Modal */}
      {showShareModal && (
        <View style={styles.modalOverlay}>
          <View style={[styles.modal, { backgroundColor: theme.card }]}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>Share Results</Text>
            
            <View style={styles.shareButtons}>
              <TouchableOpacity 
                style={[styles.shareButton, { backgroundColor: '#1DA1F2' }]}
                onPress={() => handleShare('twitter')}
              >
                <Text style={styles.shareButtonText}>𝕏 Twitter</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.shareButton, { backgroundColor: '#4267B2' }]}
                onPress={() => handleShare('facebook')}
              >
                <Text style={styles.shareButtonText}>📘 Facebook</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.shareButton, { backgroundColor: theme.accent }]}
                onPress={() => handleShare('copy')}
              >
                <Text style={styles.shareButtonText}>
                  {copied ? '✓ Copied!' : '📋 Copy Link'}
                </Text>
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity 
              style={styles.modalClose}
              onPress={() => setShowShareModal(false)}
            >
              <Text style={[styles.modalCloseText, { color: theme.secondaryText }]}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* SEO Content */}
      <View style={[styles.seoContent, { borderColor: theme.border }]}>
        <Text style={[styles.seoTitle, { color: theme.text }]}>
          Find Your Favorite Metal Drummers by Gear
        </Text>
        <Text style={[styles.seoText, { color: theme.secondaryText }]}>
          Our gear search engine lets you discover which legendary metal drummers use specific brands and equipment. 
          Whether you're looking for drummers who play Tama drums, Zildjian cymbals, or Pearl hardware — 
          find them all here. Search by brand, category, or specific model to see who's behind the sound you love.
        </Text>
        <Text style={[styles.seoText, { color: theme.secondaryText, marginTop: 12 }]}>
          Popular searches include: Tama metal drummers, Paiste RUDE users, Pearl Reference drummers, 
          Meinl Byzance cymbals, Sabian HHX artists, and DW custom kit players.
        </Text>
      </View>
    </ScrollView>
  );
}

// ==========================================
// GEAR BRAND PAGE COMPONENT
// ==========================================

export function GearBrandPage({ brandSlug, theme, onBack, drummers, onSelectDrummer }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  
  const brand = BRAND_SEO_DATA[brandSlug];
  const brandGear = useMemo(() => getGearByBrand(brandSlug), [brandSlug]);
  const brandDrummers = useMemo(() => getDrummersUsingBrand(brandSlug), [brandSlug]);
  const [selectedDrummers, setSelectedDrummers] = useState([]);

  // Update meta on mount
  useEffect(() => {
    updateGearBrandMeta(brandSlug);
  }, [brandSlug]);

  if (!brand) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={[styles.backButtonText, { color: theme.accent }]}>← Back</Text>
        </TouchableOpacity>
        <Text style={[styles.errorText, { color: theme.text }]}>Brand not found</Text>
      </View>
    );
  }

  const getDrummerInfo = (drummerSlug) => {
    const drummer = drummers.find(d => 
      d.id === drummerSlug || 
      d.slug === drummerSlug ||
      d.name.toLowerCase().replace(/\s+/g, '-') === drummerSlug
    );
    if (drummer) {
      return { name: drummer.name, band: drummer.band, image: drummer.image };
    }
    return { 
      name: drummerSlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      band: '',
      image: null
    };
  };

  const handleDrummerClick = (slug) => {
    trackDrummerFromGear(slug, brandSlug);
    const drummer = drummers.find(d => d.id === slug || d.slug === slug);
    if (drummer && onSelectDrummer) {
      onSelectDrummer(drummer);
    } else {
      window.history.pushState({}, '', `/drummer/${slug}`);
      window.location.reload();
    }
  };

  const toggleDrummerSelection = (drummerSlug) => {
    setSelectedDrummers(prev => {
      if (prev.includes(drummerSlug)) {
        return prev.filter(s => s !== drummerSlug);
      }
      if (prev.length < 3) {
        return [...prev, drummerSlug];
      }
      return prev;
    });
  };

  const handleCompare = () => {
    if (selectedDrummers.length >= 2) {
      trackCompareClick(selectedDrummers);
      const compareUrl = `/compare?d1=${selectedDrummers[0]}&d2=${selectedDrummers[1]}${selectedDrummers[2] ? `&d3=${selectedDrummers[2]}` : ''}`;
      window.history.pushState({}, '', compareUrl);
      window.location.reload();
    }
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={[styles.backButtonText, { color: theme.accent }]}>← Back to Search</Text>
      </TouchableOpacity>

      {/* Brand Header */}
      <View style={[styles.brandHeader, { backgroundColor: brand.color + '20', borderColor: brand.color }]}>
        <Text style={styles.brandIcon}>{brand.icon}</Text>
        <View style={styles.brandTitleSection}>
          <Text style={[styles.brandTitle, { color: theme.text }]}>{brand.name}</Text>
          <Text style={[styles.brandMeta, { color: theme.secondaryText }]}>
            Est. {brand.founded} • {brand.country}
          </Text>
          <Text style={[styles.brandDescription, { color: theme.secondaryText }]}>
            {brand.description}
          </Text>
        </View>
      </View>

      {/* Drummers Count */}
      <View style={styles.statsRow}>
        <View style={[styles.statCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.statNumber, { color: theme.accent }]}>{brandDrummers.length}</Text>
          <Text style={[styles.statLabel, { color: theme.secondaryText }]}>Drummers Use {brand.name}</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.statNumber, { color: theme.accent }]}>{brandGear.length}</Text>
          <Text style={[styles.statLabel, { color: theme.secondaryText }]}>Products in Database</Text>
        </View>
      </View>

      {/* Compare Button */}
      {selectedDrummers.length >= 2 && (
        <TouchableOpacity 
          style={[styles.floatingCompare, { backgroundColor: theme.accent }]}
          onPress={handleCompare}
        >
          <Text style={styles.floatingCompareText}>
            ⚖️ Compare Selected ({selectedDrummers.length})
          </Text>
        </TouchableOpacity>
      )}

      {/* Drummers List */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          🥁 Metal Drummers Using {brand.name}
        </Text>
        
        <View style={[styles.drummerGrid, isMobile && styles.drummerGridMobile]}>
          {brandDrummers.map(slug => {
            const info = getDrummerInfo(slug);
            const gear = getDrummerGear(slug);
            const brandGearItems = [];
            if (gear) {
              Object.values(gear).forEach(items => {
                items.forEach(item => {
                  if (item.brand === brandSlug) {
                    brandGearItems.push(item);
                  }
                });
              });
            }
            const isSelected = selectedDrummers.includes(slug);

            return (
              <View 
                key={slug}
                style={[
                  styles.drummerFullCard,
                  { backgroundColor: theme.card, borderColor: isSelected ? theme.accent : theme.border },
                  isSelected && styles.drummerFullCardSelected
                ]}
              >
                <TouchableOpacity
                  onPress={() => toggleDrummerSelection(slug)}
                  style={[
                    styles.selectCheckbox,
                    { borderColor: theme.border },
                    isSelected && { backgroundColor: theme.accent, borderColor: theme.accent }
                  ]}
                >
                  {isSelected && <Text style={styles.checkmark}>✓</Text>}
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.drummerFullCardContent}
                  onPress={() => handleDrummerClick(slug)}
                >
                  <View style={styles.drummerFullHeader}>
                    <Text style={[styles.drummerFullName, { color: theme.text }]}>{info.name}</Text>
                    {info.band && (
                      <Text style={[styles.drummerFullBand, { color: theme.secondaryText }]}>{info.band}</Text>
                    )}
                  </View>
                  
                  {brandGearItems.length > 0 && (
                    <View style={styles.drummerGearList}>
                      <Text style={[styles.drummerGearLabel, { color: theme.secondaryText }]}>
                        Uses:
                      </Text>
                      {brandGearItems.map(item => (
                        <Text key={item.id} style={[styles.drummerGearItem, { color: theme.text, backgroundColor: brand.color + '20' }]}>
                          {CATEGORY_LABELS[item.category]?.icon} {item.name}
                        </Text>
                      ))}
                    </View>
                  )}

                  <Text style={[styles.viewProfile, { color: theme.accent }]}>View Profile →</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View>

      {/* Products Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          🛍️ {brand.name} Products
        </Text>
        
        <View style={[styles.productsGrid, isMobile && styles.productsGridMobile]}>
          {brandGear.map(gear => {
            const drummersUsing = getDrummersUsingGear(gear.id);
            const categoryInfo = CATEGORY_LABELS[gear.category];
            
            return (
              <View 
                key={gear.id}
                style={[styles.productCard, { backgroundColor: theme.card, borderColor: theme.border }]}
              >
                <View style={styles.productHeader}>
                  <Text style={styles.productIcon}>{categoryInfo?.icon}</Text>
                  <View style={styles.productInfo}>
                    <Text style={[styles.productName, { color: theme.text }]}>{gear.name}</Text>
                    <Text style={[styles.productPrice, { color: theme.secondaryText }]}>
                      ${gear.price.toLocaleString()}
                    </Text>
                  </View>
                </View>
                
                {drummersUsing.length > 0 && (
                  <Text style={[styles.productUsers, { color: theme.accent }]}>
                    Used by {drummersUsing.length} {drummersUsing.length === 1 ? 'drummer' : 'drummers'}
                  </Text>
                )}
              </View>
            );
          })}
        </View>
      </View>

      {/* Shop CTA */}
      {brand.affiliateUrl && (
        <TouchableOpacity
          style={[styles.bigShopButton, { backgroundColor: brand.color }]}
          onPress={() => {
            trackAffiliateClick(brandSlug, brand.affiliateUrl);
            window.open(brand.affiliateUrl, '_blank');
          }}
        >
          <Text style={styles.bigShopButtonText}>
            🛒 Shop {brand.name} at Thomann
          </Text>
        </TouchableOpacity>
      )}

      {/* SEO Content */}
      <View style={[styles.seoContent, { borderColor: theme.border }]}>
        <Text style={[styles.seoTitle, { color: theme.text }]}>
          {brand.name} in Metal Drumming
        </Text>
        <Text style={[styles.seoText, { color: theme.secondaryText }]}>
          {brand.description} {brandDrummers.length} professional metal drummers in our database use {brand.name} equipment. 
          Explore their setups to see exactly which {brand.name} products they trust for their legendary sounds.
        </Text>
      </View>

      {/* Related Brands */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          🔗 Related Brands
        </Text>
        <View style={styles.relatedBrands}>
          {getTopBrands(6)
            .filter(b => b.slug !== brandSlug && b.type === brand.type)
            .slice(0, 4)
            .map(b => (
              <TouchableOpacity
                key={b.slug}
                style={[styles.relatedBrandTag, { backgroundColor: theme.card, borderColor: theme.border }]}
                onPress={() => {
                  window.history.pushState({}, '', `/gear/${b.slug}`);
                  window.location.reload();
                }}
              >
                <Text style={[styles.relatedBrandText, { color: theme.text }]}>
                  {b.icon} {b.name}
                </Text>
              </TouchableOpacity>
            ))}
        </View>
      </View>
    </ScrollView>
  );
}

// ==========================================
// CHECK PAGE FUNCTIONS
// ==========================================

export function isGearSearchPage() {
  if (typeof window === 'undefined') return false;
  return window.location.pathname === '/tools/gear-search' || 
         window.location.pathname === '/tools/gear-search/';
}

export function isGearBrandPage() {
  if (typeof window === 'undefined') return false;
  const pathname = window.location.pathname;
  // Match /gear/:slug but not /gear/item/:slug or existing gear category pages
  if (pathname.startsWith('/gear/item/')) return false;
  const match = pathname.match(/^\/gear\/([a-z0-9-]+)$/i);
  if (!match) return false;
  // Check if it's a brand slug
  const slug = match[1];
  return BRAND_SEO_DATA.hasOwnProperty(slug);
}

export function getGearBrandSlugFromURL() {
  if (typeof window === 'undefined') return null;
  const match = window.location.pathname.match(/^\/gear\/([a-z0-9-]+)$/i);
  if (!match) return null;
  const slug = match[1];
  return BRAND_SEO_DATA.hasOwnProperty(slug) ? slug : null;
}

// ==========================================
// STYLES
// ==========================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing.lg,
    maxWidth: 1200,
    marginHorizontal: 'auto',
    width: '100%',
  },
  backButton: {
    marginBottom: spacing.md,
  },
  backButtonText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
  },
  header: {
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: fontSize['2xl'],
    fontWeight: fontWeight.bold,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: fontSize.md,
  },
  searchSection: {
    padding: spacing.lg,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: spacing.lg,
  },
  searchInputContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  searchInput: {
    flex: 1,
    padding: spacing.md,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: fontSize.md,
  },
  searchButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: 8,
    justifyContent: 'center',
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: fontWeight.semibold,
    fontSize: fontSize.md,
  },
  filtersRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  filtersRowMobile: {
    flexDirection: 'column',
  },
  filterItem: {
    flex: 1,
  },
  filterItemMobile: {
    marginBottom: spacing.sm,
  },
  filterLabel: {
    fontSize: fontSize.sm,
    marginBottom: spacing.xs,
  },
  quickTagsSection: {
    marginBottom: spacing.xl,
  },
  quickTagsTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    marginBottom: spacing.md,
  },
  tagGroup: {
    marginBottom: spacing.md,
  },
  tagGroupLabel: {
    fontSize: fontSize.sm,
    marginBottom: spacing.xs,
  },
  tagsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  tag: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    borderWidth: 1,
  },
  tagText: {
    fontSize: fontSize.sm,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  resultsCount: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
  },
  resultsActions: {
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  actionButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 8,
    borderWidth: 1,
  },
  actionButtonText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },
  compareButton: {
    borderWidth: 0,
  },
  resultsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.lg,
    marginBottom: spacing.xl,
  },
  resultsGridMobile: {
    flexDirection: 'column',
  },
  gearCard: {
    flex: 1,
    minWidth: 300,
    maxWidth: 380,
    padding: spacing.lg,
    borderRadius: 12,
    borderWidth: 1,
  },
  gearHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  gearIcon: {
    fontSize: 32,
    marginRight: spacing.md,
  },
  gearTitleSection: {
    flex: 1,
  },
  gearName: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    marginBottom: 2,
  },
  gearBrand: {
    fontSize: fontSize.sm,
  },
  gearPrice: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
  },
  tierBadgeRow: {
    marginBottom: spacing.md,
  },
  tierBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  tierBadgeText: {
    color: '#fff',
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
  },
  drummersSection: {
    marginBottom: spacing.md,
  },
  drummersTitle: {
    fontSize: fontSize.sm,
    marginBottom: spacing.sm,
  },
  drummersList: {
    gap: spacing.sm,
  },
  drummerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.sm,
    borderRadius: 8,
    borderWidth: 1,
  },
  drummerCardSelected: {
    borderWidth: 2,
  },
  drummerCheckbox: {
    marginRight: spacing.sm,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    color: '#fff',
    fontSize: 12,
    fontWeight: fontWeight.bold,
  },
  drummerInfo: {
    flex: 1,
  },
  drummerName: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
  },
  drummerBand: {
    fontSize: fontSize.xs,
  },
  drummerArrow: {
    fontSize: fontSize.md,
    color: '#9ca3af',
  },
  moreCount: {
    fontSize: fontSize.sm,
    marginTop: spacing.xs,
  },
  shopButton: {
    padding: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
  },
  shopButtonText: {
    color: '#fff',
    fontWeight: fontWeight.semibold,
    fontSize: fontSize.sm,
  },
  noResults: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: fontSize.md,
    textAlign: 'center',
  },
  newsletterCta: {
    padding: spacing.xl,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: spacing.xl,
    alignItems: 'center',
  },
  newsletterTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    marginBottom: spacing.sm,
  },
  newsletterText: {
    fontSize: fontSize.md,
    textAlign: 'center',
    marginBottom: spacing.lg,
    maxWidth: 500,
  },
  newsletterButton: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: 8,
  },
  newsletterButtonText: {
    color: '#fff',
    fontWeight: fontWeight.semibold,
    fontSize: fontSize.md,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    padding: spacing.xl,
    borderRadius: 16,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  shareButtons: {
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  shareButton: {
    padding: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
  },
  shareButtonText: {
    color: '#fff',
    fontWeight: fontWeight.semibold,
  },
  modalClose: {
    alignItems: 'center',
  },
  modalCloseText: {
    fontSize: fontSize.md,
  },
  seoContent: {
    padding: spacing.lg,
    borderTopWidth: 1,
    marginTop: spacing.xl,
  },
  seoTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    marginBottom: spacing.sm,
  },
  seoText: {
    fontSize: fontSize.sm,
    lineHeight: lineHeight.relaxed * fontSize.sm,
  },
  errorText: {
    fontSize: fontSize.lg,
    textAlign: 'center',
    marginTop: spacing.xl,
  },
  brandHeader: {
    flexDirection: 'row',
    padding: spacing.xl,
    borderRadius: 12,
    borderWidth: 2,
    marginBottom: spacing.xl,
    alignItems: 'flex-start',
  },
  brandIcon: {
    fontSize: 48,
    marginRight: spacing.lg,
  },
  brandTitleSection: {
    flex: 1,
  },
  brandTitle: {
    fontSize: fontSize['2xl'],
    fontWeight: fontWeight.bold,
    marginBottom: spacing.xs,
  },
  brandMeta: {
    fontSize: fontSize.sm,
    marginBottom: spacing.sm,
  },
  brandDescription: {
    fontSize: fontSize.md,
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.lg,
    marginBottom: spacing.xl,
  },
  statCard: {
    flex: 1,
    padding: spacing.lg,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: fontSize['3xl'],
    fontWeight: fontWeight.bold,
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontSize: fontSize.sm,
    textAlign: 'center',
  },
  floatingCompare: {
    padding: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  floatingCompareText: {
    color: '#fff',
    fontWeight: fontWeight.semibold,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    marginBottom: spacing.lg,
  },
  drummerGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  drummerGridMobile: {
    flexDirection: 'column',
  },
  drummerFullCard: {
    flex: 1,
    minWidth: 280,
    maxWidth: 350,
    padding: spacing.lg,
    borderRadius: 12,
    borderWidth: 1,
    position: 'relative',
  },
  drummerFullCardSelected: {
    borderWidth: 2,
  },
  selectCheckbox: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  drummerFullCardContent: {
    paddingRight: 32,
  },
  drummerFullHeader: {
    marginBottom: spacing.md,
  },
  drummerFullName: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
  },
  drummerFullBand: {
    fontSize: fontSize.sm,
  },
  drummerGearList: {
    marginBottom: spacing.md,
  },
  drummerGearLabel: {
    fontSize: fontSize.xs,
    marginBottom: spacing.xs,
  },
  drummerGearItem: {
    fontSize: fontSize.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 4,
    overflow: 'hidden',
  },
  viewProfile: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  productsGridMobile: {
    flexDirection: 'column',
  },
  productCard: {
    flex: 1,
    minWidth: 250,
    maxWidth: 300,
    padding: spacing.md,
    borderRadius: 8,
    borderWidth: 1,
  },
  productHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  productIcon: {
    fontSize: 24,
    marginRight: spacing.sm,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
  },
  productPrice: {
    fontSize: fontSize.xs,
  },
  productUsers: {
    fontSize: fontSize.xs,
  },
  bigShopButton: {
    padding: spacing.lg,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  bigShopButtonText: {
    color: '#fff',
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
  },
  relatedBrands: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  relatedBrandTag: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    borderWidth: 1,
  },
  relatedBrandText: {
    fontSize: fontSize.sm,
  },
});

export default GearSearchPage;
