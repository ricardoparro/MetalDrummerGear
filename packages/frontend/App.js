import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity, ScrollView, Linking, Platform, useWindowDimensions, TextInput } from 'react-native';
import { Image } from 'expo-image';
import { ThemeProvider, useTheme } from './ThemeContext';
import { colors } from './colors';
import { fontSize, lineHeight, fontWeight, textStyles } from './typography';
import { spacing, space } from './spacing';
import { useState, useEffect, useCallback, useMemo, useRef, lazy, Suspense, startTransition } from 'react';
import { getAffiliateLinks, extractPrimaryProduct, getThomannLink, getSweetwaterLink } from './affiliateLinks';
import { calculateKitCost, formatPrice } from './gearPrices';
import { 
  getOptimizedImageUrl, 
  optimizeDrummerImages, 
  imageDefaults, 
  IMAGE_WIDTHS, 
  SRCSET_WIDTHS, 
  generateSrcSet, 
  generateWebPSrcSet,
  getSizesAttribute,
  getLazyLoadingProps,
  supportsWebP,
  isLocalDrummerImage,
  generateLocalDrummerSrcSet,
  getLocalDrummerImageUrl
} from './imageUtils';

// Core Web Vitals Optimization Utilities
import { 
  useDebounce, 
  useDebouncedCallback,
  scheduleNonBlockingUpdate,
  initWebVitalsMonitoring,
  getContentVisibilityStyle,
  SKELETON_DIMENSIONS
} from './cwvUtils';

// Skeleton Components for CLS Prevention
import { 
  DrummerCardSkeleton, 
  DrummerListSkeleton, 
  SearchBarSkeleton,
  FilterBarSkeleton,
  HeroSectionSkeleton,
  SpotlightSkeleton,
  PageLoadingSkeleton
} from './Skeletons';

// Import extracted data for code splitting
import { FILTER_OPTIONS } from './data/filterOptions';
import { 
  BUDGET_TIERS, 
  getBudgetTierForPrice, 
  getBudgetTier, 
  getBudgetTierLabel, 
  getBudgetTierEmoji, 
  getBudgetTierInfo, 
  getBudgetTierColor, 
  formatPriceRange 
} from './data/budgetTiers';

// Featured Drummer Module - Curated weekly rotation with birthday overrides (Issue #494)
import { 
  getFeaturedDrummer as getCuratedFeaturedDrummer,
  getUpcomingSpotlightBirthdays,
  getFeaturedSchedule,
  getFeaturedHistory,
  FEATURED_ROTATION,
  MANUAL_OVERRIDE
} from './data/featuredDrummer';

// Extended bios for drummer detail pages (Issue #305)
// Loaded dynamically for code splitting (~9KB of text data) - TBT optimization #460
// Fix for #541: Added Promise caching and listeners for reliable async loading
let _extendedBiosModule = null;
let _extendedBiosLoadPromise = null;
const loadExtendedBios = () => import('./data/extendedBios');

function preloadExtendedBios() {
  if (!_extendedBiosLoadPromise) {
    _extendedBiosLoadPromise = loadExtendedBios().then(m => { 
      _extendedBiosModule = m; 
      return m; 
    });
  }
  return _extendedBiosLoadPromise;
}
function isExtendedBiosLoaded() { return _extendedBiosModule !== null; }
function getExtendedBio(drummerId) {
  if (_extendedBiosModule) {
    return _extendedBiosModule.getExtendedBio(drummerId);
  }
  return null;
}
function hasExtendedBio(drummerId) {
  if (_extendedBiosModule) {
    return _extendedBiosModule.hasExtendedBio(drummerId);
  }
  return false;
}

// BPM Calculator - Metal songs database (Issue #342)
// NOTE: Unused import removed - data is inline in METAL_SONGS_DATABASE constant
// Reduces bundle size by ~15KB (#458)

// ==========================================
// LAZY-LOADED DATA MODULES - TBT Optimization (#537)
// These modules are loaded on-demand to reduce initial JS execution time
// Deferred: bands (~31KB) + genres (~27KB) + gearComparisons (~17KB) + birthdays (~24KB) = ~99KB
// ==========================================

// Band data with drummer history (Issue #349, #429)
// Lazy loaded for TBT optimization (#537)
let _bandsModule = null;
let _bandsLoadPromise = null;
let _bandsLoadListeners = [];
const loadBands = () => import('./data/bands');

function preloadBands() {
  if (!_bandsLoadPromise) {
    _bandsLoadPromise = loadBands().then(m => { 
      _bandsModule = m; 
      // Notify all listeners that the module is loaded (fix for #541)
      _bandsLoadListeners.forEach(cb => cb());
      _bandsLoadListeners = [];
      return m; 
    });
  }
  return _bandsLoadPromise;
}
// Subscribe to bands module load - returns unsubscribe function (fix for #541)
function onBandsLoaded(callback) {
  if (_bandsModule) {
    // Module already loaded, call immediately
    callback();
    return () => {};
  }
  _bandsLoadListeners.push(callback);
  return () => {
    _bandsLoadListeners = _bandsLoadListeners.filter(cb => cb !== callback);
  };
}
function isBandsLoaded() { return _bandsModule !== null; }
function getBand(slug) { return _bandsModule?.getBand(slug) || null; }
function getAllBands() { return _bandsModule?.getAllBands() || []; }
function hasBand(slug) { return _bandsModule?.hasBand(slug) || false; }
function getAllBandSlugs() { return _bandsModule?.getAllBandSlugs() || []; }
function getBandsForDrummer(drummerId) { return _bandsModule?.getBandsForDrummer(drummerId) || []; }
function generateMusicGroupSchemaFromDrummer(drummer) { return _bandsModule?.generateMusicGroupSchemaFromDrummer(drummer) || null; }
function generateAllMusicGroupSchemasFromDrummer(drummer) { return _bandsModule?.generateAllMusicGroupSchemasFromDrummer(drummer) || []; }
function generateMemberOfFromDrummer(drummer) { return _bandsModule?.generateMemberOfFromDrummer(drummer) || []; }

// Genre data for landing pages (Issue #340)
// Lazy loaded for TBT optimization (#537)
let _genresModule = null;
let _genresLoadPromise = null;
const loadGenres = () => import('./data/genres');

function preloadGenres() {
  if (!_genresLoadPromise) {
    _genresLoadPromise = loadGenres().then(m => { _genresModule = m; return m; });
  }
  return _genresLoadPromise;
}
function isGenresLoaded() { return _genresModule !== null; }
function getGenre(slug) { return _genresModule?.getGenre(slug) || null; }
function getAllGenres() { return _genresModule?.getAllGenres() || []; }
function hasGenre(slug) { return _genresModule?.hasGenre(slug) || false; }
function getAllGenreSlugs() { return _genresModule?.getAllGenreSlugs() || []; }
function getDrummersByGenre(slug, drummers) { return _genresModule?.getDrummersByGenre(slug, drummers) || []; }
function getRelatedGenres(slug) { return _genresModule?.getRelatedGenres(slug) || []; }

// Gear comparison data (Issue #345)
// Lazy loaded for TBT optimization (#537)
let _gearComparisonsModule = null;
let _gearComparisonsLoadPromise = null;
let _gearComparisonsLoadListeners = [];
const loadGearComparisons = () => import('./data/gearComparisons');

function preloadGearComparisons() {
  if (!_gearComparisonsLoadPromise) {
    _gearComparisonsLoadPromise = loadGearComparisons().then(m => { 
      _gearComparisonsModule = m; 
      // Notify all listeners that the module is loaded
      _gearComparisonsLoadListeners.forEach(cb => cb());
      _gearComparisonsLoadListeners = [];
      return m; 
    });
  }
  return _gearComparisonsLoadPromise;
}
// Subscribe to gear comparisons module load - returns unsubscribe function
function onGearComparisonsLoaded(callback) {
  if (_gearComparisonsModule) {
    // Module already loaded, call immediately
    callback();
    return () => {};
  }
  _gearComparisonsLoadListeners.push(callback);
  return () => {
    _gearComparisonsLoadListeners = _gearComparisonsLoadListeners.filter(cb => cb !== callback);
  };
}
function isGearComparisonsLoaded() { return _gearComparisonsModule !== null; }
function getGearComparisonBySlug(slug) { return _gearComparisonsModule?.getGearComparisonBySlug(slug) || null; }
function getAllGearComparisons() { return _gearComparisonsModule?.getAllGearComparisons() || []; }
function hasGearComparison(slug) { return _gearComparisonsModule?.hasGearComparison(slug) || false; }
function getAllGearComparisonSlugs() { return _gearComparisonsModule?.getAllGearComparisonSlugs() || []; }

// Drummer vs Drummer comparison data (Issue #558)
// Lazy loaded for TBT optimization
let _drummerComparisonsModule = null;
let _drummerComparisonsLoadPromise = null;
let _drummerComparisonsLoadListeners = [];
const loadDrummerComparisons = () => import('./data/drummerComparisons');

function preloadDrummerComparisons() {
  if (!_drummerComparisonsLoadPromise) {
    _drummerComparisonsLoadPromise = loadDrummerComparisons().then(m => { 
      _drummerComparisonsModule = m; 
      // Notify all listeners that the module is loaded
      _drummerComparisonsLoadListeners.forEach(cb => cb());
      _drummerComparisonsLoadListeners = [];
      return m; 
    });
  }
  return _drummerComparisonsLoadPromise;
}
// Subscribe to drummer comparisons module load - returns unsubscribe function
function onDrummerComparisonsLoaded(callback) {
  if (_drummerComparisonsModule) {
    // Module already loaded, call immediately
    callback();
    return () => {};
  }
  _drummerComparisonsLoadListeners.push(callback);
  return () => {
    _drummerComparisonsLoadListeners = _drummerComparisonsLoadListeners.filter(cb => cb !== callback);
  };
}
function isDrummerComparisonsLoaded() { return _drummerComparisonsModule !== null; }
function getDrummerComparisonBySlug(slug) { return _drummerComparisonsModule?.getDrummerComparisonBySlug(slug) || null; }
function getAllDrummerComparisons() { return _drummerComparisonsModule?.getAllDrummerComparisons() || []; }
function hasDrummerComparison(slug) { return _drummerComparisonsModule?.hasDrummerComparison(slug) || false; }
function getAllDrummerComparisonSlugs() { return _drummerComparisonsModule?.getAllDrummerComparisonSlugs() || []; }
function getComparisonsForDrummer(slug) { return _drummerComparisonsModule?.getComparisonsForDrummer(slug) || []; }

// Drumming techniques data (Issue #344)
// Loaded dynamically for code splitting - TBT optimization #460
let _techniquesModule = null;
let _techniquesLoadPromise = null;
let _techniquesLoadListeners = [];

const loadTechniques = () => import('./data/techniques');

function preloadTechniques() {
  if (!_techniquesLoadPromise) {
    _techniquesLoadPromise = loadTechniques().then(m => { 
      _techniquesModule = m;
      // Notify all listeners that the module is loaded
      _techniquesLoadListeners.forEach(cb => cb());
      _techniquesLoadListeners = [];
      return m;
    });
  }
  return _techniquesLoadPromise;
}

// Subscribe to techniques module load - returns unsubscribe function
function onTechniquesLoaded(callback) {
  if (_techniquesModule) {
    // Module already loaded, call immediately
    callback();
    return () => {};
  }
  _techniquesLoadListeners.push(callback);
  return () => {
    _techniquesLoadListeners = _techniquesLoadListeners.filter(cb => cb !== callback);
  };
}

// Check if techniques module is loaded
function isTechniquesLoaded() {
  return _techniquesModule !== null;
}

// Synchronous accessors (use after module is loaded)
function getAllTechniques() {
  return _techniquesModule?.getAllTechniques() || [];
}
function getTechniqueBySlug(slug) {
  return _techniquesModule?.getTechniqueBySlug(slug) || null;
}
function hasTechnique(slug) {
  return _techniquesModule?.hasTechnique(slug) || false;
}
function getAllTechniqueSlugs() {
  return _techniquesModule?.getAllTechniqueSlugs() || [];
}
function getTechniquesByCategory(category) {
  return _techniquesModule?.getTechniquesByCategory(category) || [];
}
function getTechniquesByDifficulty(difficulty) {
  return _techniquesModule?.getTechniquesByDifficulty(difficulty) || [];
}
function getRelatedTechniques(slug) {
  return _techniquesModule?.getRelatedTechniques(slug) || [];
}
function getTechniquesForDrummer(drummerId) {
  return _techniquesModule?.getTechniquesForDrummer(drummerId) || [];
}
function getTechniqueCategories() {
  return _techniquesModule?.TECHNIQUE_CATEGORIES || {};
}
function getDifficultyLevels() {
  return _techniquesModule?.DIFFICULTY_LEVELS || {};
}

// Birthday calendar data (Issue #343)
// Lazy loaded for TBT optimization (#537)
let _birthdaysModule = null;
let _birthdaysLoadPromise = null;
const loadBirthdays = () => import('./data/birthdays');

function preloadBirthdays() {
  if (!_birthdaysLoadPromise) {
    _birthdaysLoadPromise = loadBirthdays().then(m => { _birthdaysModule = m; return m; });
  }
  return _birthdaysLoadPromise;
}
function isBirthdaysLoaded() { return _birthdaysModule !== null; }
function drummerBirthdays() { return _birthdaysModule?.drummerBirthdays || []; }
function getAllBirthdaysSorted() { return _birthdaysModule?.getAllBirthdaysSorted() || []; }
function getBirthdaysByMonth(month) { return _birthdaysModule?.getBirthdaysByMonth(month) || []; }
function getTodaysBirthdays() { return _birthdaysModule?.getTodaysBirthdays() || []; }
function getUpcomingBirthdays(days) { return _birthdaysModule?.getUpcomingBirthdays(days) || []; }
function calculateAge(year, month, day) { return _birthdaysModule?.calculateAge(year, month, day) || null; }
function formatBirthday(dateStr) { return _birthdaysModule?.formatBirthday(dateStr) || ''; }
function getZodiacSign(dateStr) { return _birthdaysModule?.getZodiacSign(dateStr) || ''; }
// MONTH_NAMES is a constant, keep inline to avoid extra async load
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
// ==========================================
// TOP 10 LISTS - Loaded dynamically for code splitting
// ==========================================
// Data moved to ./data/top10Lists.js for code splitting
// Use loadTop10Lists() to access

// State holders for lazy-loaded data
let _top10ListsModule = null;
let _quizDataModule = null;
let _kitQuizDataModule = null;

// Dynamic import functions for lazy loading
const loadTop10Lists = () => import('./data/top10Lists');
const loadQuizData = () => import('./data/quizData');
const loadKitQuizData = () => import('./data/kitQuizData');

// Get all top 10 lists (lazy loaded)
async function getAllTop10ListsAsync() {
  if (!_top10ListsModule) {
    _top10ListsModule = await loadTop10Lists();
  }
  return _top10ListsModule.getAllTop10Lists();
}

// Get a specific top 10 list by slug (lazy loaded)
async function getTop10ListBySlugAsync(slug) {
  if (!_top10ListsModule) {
    _top10ListsModule = await loadTop10Lists();
  }
  return _top10ListsModule.getTop10ListBySlug(slug);
}

// Synchronous accessors (use after data is loaded)
function getAllTop10Lists() {
  if (_top10ListsModule) {
    return _top10ListsModule.getAllTop10Lists();
  }
  // Return empty array until loaded
  return [];
}

function getTop10ListBySlug(slug) {
  if (_top10ListsModule) {
    return _top10ListsModule.getTop10ListBySlug(slug);
  }
  return null;
}

// Preload top 10 lists when user hovers or when page hints they might navigate
function preloadTop10Lists() {
  if (!_top10ListsModule) {
    loadTop10Lists().then(m => { _top10ListsModule = m; });
  }
}

// ==========================================
// SPOTLIGHT HELPERS - Weekly Featured Drummer
// ==========================================

// Get the current week number since epoch for deterministic rotation
function getWeekNumber() {
  const now = new Date();
  const epochStart = new Date('2024-01-01'); // Start date for rotation
  const msPerWeek = 7 * 24 * 60 * 60 * 1000;
  return Math.floor((now - epochStart) / msPerWeek);
}

// Get the current spotlight drummer index based on weekly rotation
function getCurrentSpotlightIndex(totalDrummers) {
  const week = getWeekNumber();
  return week % totalDrummers;
}

// Get all drummers with spotlight data
function getSpotlightDrummers(drummers) {
  return drummers.filter(d => d.spotlight);
}

// Get featured drummers for homepage (Issue #496)
function getFeaturedDrummers(drummers) {
  return drummers.filter(d => d.featured);
}

// Get this week's spotlight drummer (client-side computed)
function getCurrentSpotlightDrummer(drummers) {
  const spotlightDrummers = getSpotlightDrummers(drummers);
  if (spotlightDrummers.length === 0) return null;
  const index = getCurrentSpotlightIndex(spotlightDrummers.length);
  return spotlightDrummers[index];
}

// Get spotlight history for archive page (deterministic past weeks)
function getSpotlightHistory(drummers, numWeeks = 12) {
  const spotlightDrummers = getSpotlightDrummers(drummers);
  if (spotlightDrummers.length === 0) return [];
  
  const currentWeek = getWeekNumber();
  const history = [];
  const msPerWeek = 7 * 24 * 60 * 60 * 1000;
  const epochStart = new Date('2024-01-01');
  
  for (let i = 0; i < numWeeks; i++) {
    const weekNum = currentWeek - i;
    const drummerIndex = weekNum % spotlightDrummers.length;
    const weekStart = new Date(epochStart.getTime() + weekNum * msPerWeek);
    
    history.push({
      drummer: spotlightDrummers[drummerIndex],
      weekStart,
      isCurrent: i === 0
    });
  }
  
  return history;
}

// Check if on spotlights archive page
function isSpotlightsPage() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return false;
  return window.location.pathname === '/spotlights';
}

// Helper to get/set URL params for filters
function getFiltersFromURL() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return { search: '', genre: '', brand: '', era: '', sort: '' };
  const params = new URLSearchParams(window.location.search);
  return {
    search: params.get('search') || '',
    genre: params.get('genre') || '',
    brand: params.get('brand') || '',
    era: params.get('era') || '',
    sort: params.get('sort') || '',
  };
}

function updateFiltersURL(filters) {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return;
  const params = new URLSearchParams();
  if (filters.search) params.set('search', filters.search);
  if (filters.genre) params.set('genre', filters.genre);
  if (filters.brand) params.set('brand', filters.brand);
  if (filters.era) params.set('era', filters.era);
  if (filters.sort) params.set('sort', filters.sort);
  const queryString = params.toString();
  const newPath = queryString ? `/drummers?${queryString}` : '/';
  window.history.pushState({}, '', newPath);
}

// Helper to get/set sort preference in localStorage
function getSortPreference() {
  if (Platform.OS !== 'web' || typeof localStorage === 'undefined') return 'name-asc';
  return localStorage.getItem('drummerSortPreference') || 'name-asc';
}

function saveSortPreference(sort) {
  if (Platform.OS !== 'web' || typeof localStorage === 'undefined') return;
  localStorage.setItem('drummerSortPreference', sort);
}

// Helper to get/set URL params for shareable comparisons
function getCompareParamsFromURL() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return [];
  const params = new URLSearchParams(window.location.search);
  const drummers = [];
  if (params.get('d1')) drummers.push(params.get('d1'));
  if (params.get('d2')) drummers.push(params.get('d2'));
  if (params.get('d3')) drummers.push(params.get('d3'));
  return drummers;
}

function updateCompareURL(drummerIds) {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return;
  const params = new URLSearchParams();
  drummerIds.forEach((id, index) => {
    if (id) params.set(`d${index + 1}`, id);
  });
  const newPath = drummerIds.length > 0 ? `/compare?${params.toString()}` : '/';
  window.history.replaceState({}, '', newPath);
}

// Helper to get quiz match slug from URL (supports /quiz?match=slug)
function getQuizMatchFromURL() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  return params.get('match') || null;
}

// Helper to update quiz result URL
function updateQuizResultURL(drummerSlug) {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return;
  const newPath = drummerSlug ? `/quiz?match=${drummerSlug}` : '/quiz';
  window.history.replaceState({}, '', newPath);
}

// Update document meta tags for quiz social sharing (Open Graph + Twitter Cards)
function updateQuizMeta(drummer, matchPercentage) {
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

  if (drummer) {
    // Shared result page meta
    const title = `I matched with ${drummer.name} (${drummer.band}) - ${matchPercentage}% Match! | Metal Drummer Quiz`;
    const description = `Take the Metal Drummer Quiz and discover which legendary metal drummer matches your playing style! I got ${drummer.name} from ${drummer.band}.`;
    const imageUrl = drummer.image || 'https://metalforge.io/og-quiz.png';
    const shareUrl = `https://metalforge.io/quiz?match=${toSlug(drummer.name)}`;

    document.title = title;
    setMeta('description', description);
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:type', 'website', true);
    setMeta('og:image', imageUrl, true);
    setMeta('og:url', shareUrl, true);
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', imageUrl);
  } else {
    // Default quiz page meta
    const title = 'Find Your Drummer Match | Metal Drummer Quiz';
    const description = 'Take our quiz to discover which legendary metal drummer matches your playing style! Answer 7 questions and find your drummer soulmate.';

    document.title = title;
    setMeta('description', description);
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:type', 'website', true);
    setMeta('og:image', 'https://metalforge.io/og-quiz.png', true);
    setMeta('og:url', 'https://metalforge.io/quiz', true);
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', 'https://metalforge.io/og-quiz.png');
  }
}

// ==========================================
// THEME TOGGLE COMPONENT - Dark/Light Mode Switcher (Issue #306)
// ==========================================

function ThemeToggle() {
  const { theme, isDarkMode, toggleTheme } = useTheme();
  
  return (
    <TouchableOpacity
      onPress={toggleTheme}
      style={[
        themeToggleStyles.button,
        { 
          backgroundColor: theme.card,
          borderColor: theme.border,
        }
      ]}
      accessibilityRole="button"
      accessibilityLabel={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
      accessibilityHint="Toggles between dark and light color themes"
    >
      <Text style={themeToggleStyles.icon}>
        {isDarkMode ? '☀️' : '🌙'}
      </Text>
    </TouchableOpacity>
  );
}

// Styles for ThemeToggle component
const themeToggleStyles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  icon: {
    fontSize: fontSize.lg,
  },
});

// YouTube Video Embed Component - Works with React Native Web
// Optimized for Core Web Vitals (Issue #442):
// - Uses facade pattern: shows thumbnail, loads iframe on click
// - Reduces initial page load by ~500KB+ per embed
// - Uses youtube-nocookie.com for privacy
// - Lazy loads iframe for better LCP
function YouTubeEmbed({ videoId, title, theme }) {
  const { width } = useWindowDimensions();
  const [isActivated, setIsActivated] = useState(false);
  
  // Calculate responsive video dimensions (16:9 aspect ratio)
  const maxWidth = Math.min(width - 72, 560); // Account for padding
  const videoWidth = maxWidth;
  const videoHeight = Math.round(videoWidth * 9 / 16);

  if (Platform.OS === 'web') {
    // Facade pattern: Show lightweight thumbnail until user clicks
    // This dramatically improves LCP by not loading YouTube iframe initially
    if (!isActivated) {
      const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
      return (
        <View 
          style={[styles.videoContainer, { width: videoWidth, height: videoHeight, cursor: 'pointer', position: 'relative' }]}
          onClick={() => setIsActivated(true)}
          role="button"
          aria-label={`Play ${title}`}
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setIsActivated(true); }}
        >
          <img
            src={thumbnailUrl}
            alt={`${title} video thumbnail`}
            width={videoWidth}
            height={videoHeight}
            loading="lazy"
            decoding="async"
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover', 
              borderRadius: 8,
              backgroundColor: colors.bg.secondary
            }}
          />
          {/* Play button overlay */}
          <View style={styles.playButtonOverlay}>
            <View style={[styles.youtubePlayButton]}>
              <svg height="100%" version="1.1" viewBox="0 0 68 48" width="100%">
                <path d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z" fill="#f00"></path>
                <path d="M 45,24 27,14 27,34" fill="#fff"></path>
              </svg>
            </View>
          </View>
        </View>
      );
    }
    
    // Load actual iframe after user interaction
    return (
      <View style={[styles.videoContainer, { width: videoWidth, height: videoHeight }]}>
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          style={styles.inlineStyle1}
        />
      </View>
    );
  }

  // For native platforms, show a thumbnail that opens YouTube
  // Optimize thumbnail through our image proxy for WebP conversion (#299)
  const rawThumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  const thumbnailUrl = getOptimizedImageUrl(rawThumbnailUrl, { width: videoWidth });
  const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;

  return (
    <TouchableOpacity
      onPress={() => Linking.openURL(youtubeUrl)}
      style={[styles.videoContainer, { width: videoWidth, height: videoHeight }]}
      accessibilityRole="link"
      accessibilityLabel={`Play ${title} on YouTube`}
    >
      <ImageWithFallback
        source={{ uri: thumbnailUrl }}
        style={styles.videoThumbnail}
        accessibilityLabel={`${title} video thumbnail`}
        width={videoWidth}
        height={videoHeight}
        imageContext="detail"
      />
      <View style={styles.playButtonOverlay}>
        <View style={[styles.playButton, { backgroundColor: theme.card }]}>
          <Text style={[styles.playButtonText, { color: theme.text }]}>▶</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function VideoCard({ video, theme }) {
  return (
    <View style={[styles.videoCard, { borderColor: theme.border }]}>
      <YouTubeEmbed videoId={video.youtubeId} title={video.title} theme={theme} />
      <View style={styles.videoInfo}>
        <Text style={[styles.videoTitle, { color: theme.text }]} numberOfLines={2}>
          {video.title}
        </Text>
        {video.year && (
          <Text style={[styles.videoYear, { color: theme.secondaryText }]}>
            {video.year}
          </Text>
        )}
      </View>
    </View>
  );
}

// Collapsible Notable Quotes Section
function QuotesSection({ quotes, drummerName, theme }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!quotes || quotes.length === 0) return null;

  return (
    <View style={[styles.section, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <TouchableOpacity
        onPress={() => setIsExpanded(!isExpanded)}
        style={styles.quotesSectionHeader}
        accessibilityRole="button"
        accessibilityLabel={`${isExpanded ? 'Collapse' : 'Expand'} notable quotes section`}
      >
        <Text style={[styles.sectionTitle, { color: theme.text, marginBottom: 0 }]} accessibilityRole="header">
          Notable Quotes
        </Text>
        <Text style={[styles.quotesExpandIcon, { color: theme.secondaryText }]}>
          {isExpanded ? '▲' : '▼'}
        </Text>
      </TouchableOpacity>
      {isExpanded && (
        <View style={styles.quotesContainer}>
          {quotes.map((quote, index) => (
            <View key={index} style={[styles.quoteCard, { borderColor: theme.border }]}>
              <Text style={[styles.quoteText, { color: theme.text }]}>
                "{quote.text}"
              </Text>
              <Text style={[styles.quoteSource, { color: theme.secondaryText }]}>
                — {drummerName}, {quote.source}{quote.year ? ` (${quote.year})` : ''}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

// ==========================================
// BAND LINKS SECTION - Show bands drummer has played with (Issue #351)
// ==========================================
function BandLinksSection({ bandLinks, bandName, theme }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  // If no band links provided, don't render
  if (!bandLinks || bandLinks.length === 0) {
    return null;
  }

  // Helper to navigate to band page
  const handleBandPress = (bandSlug) => {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.history.pushState(null, '', `/bands/${bandSlug}`);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  return (
    <View 
      style={[styles.section, styles.bandLinksSection, { backgroundColor: theme.card, borderColor: theme.border }]}
      data-testid="band-links-section"
      accessibilityRole="region"
      accessibilityLabel="Bands"
    >
      <Text 
        style={[styles.sectionTitle, { color: theme.text }]} 
        accessibilityRole="header"
      >
        Bands
      </Text>
      <Text style={[styles.bandLinksSubtitle, { color: theme.secondaryText }]}>
        Bands this drummer has played with
      </Text>
      <View style={[styles.bandLinksGrid, isMobile && styles.bandLinksGridMobile]}>
        {bandLinks.map((band, index) => {
          const bandData = getBand(band.slug);
          const isClickable = hasBand(band.slug);

          const cardContent = (
            <View 
              style={[
                styles.bandLinkCard, 
                { backgroundColor: theme.background, borderColor: theme.border }
              ]}
            >
              <Text style={styles.bandLinkIcon}>🎸</Text>
              <View style={styles.flex1}>
                <Text style={[styles.bandLinkName, { color: isClickable ? theme.primary : theme.text }]}>
                  {bandData?.name || band.slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                </Text>
                {band.period && (
                  <Text style={[styles.textSecondarySmall, { color: theme.secondaryText }]}>
                    {band.period}
                  </Text>
                )}
                {band.role && (
                  <Text style={[{ fontSize: 11, color: theme.secondaryText, fontStyle: 'italic' }]}>
                    {band.role}
                  </Text>
                )}
              </View>
              {isClickable && (
                <Text style={{ color: theme.secondaryText, fontSize: 16 }}>→</Text>
              )}
            </View>
          );

          if (isClickable && Platform.OS === 'web') {
            return (
              <a
                key={band.slug || index}
                href={`/bands/${band.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleBandPress(band.slug);
                }}
                style={styles.linkNoDecoration}
                data-testid={`band-link-${band.slug}`}
              >
                {cardContent}
              </a>
            );
          }

          if (isClickable) {
            return (
              <TouchableOpacity
                key={band.slug || index}
                onPress={() => handleBandPress(band.slug)}
                accessibilityRole="link"
                accessibilityLabel={`View ${bandData?.name || band.slug} band page`}
              >
                {cardContent}
              </TouchableOpacity>
            );
          }

          return (
            <View key={band.slug || index}>
              {cardContent}
            </View>
          );
        })}
      </View>
    </View>
  );
}

// ==========================================
// TOP LISTS SECTION - Horizontal scroll on homepage
// ==========================================

function TopListsSection({ theme, onNavigateToList }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const [lists, setLists] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load top 10 lists data lazily
  useEffect(() => {
    loadTop10Lists().then(module => {
      _top10ListsModule = module;
      setLists(module.getAllTop10Lists());
      setIsLoaded(true);
    });
  }, []);

  // Don't render until data is loaded
  if (!isLoaded || lists.length === 0) {
    return null;
  }

  return (
    <View style={[styles.topListsSection, { backgroundColor: 'transparent' }]}>
      <View style={styles.topListsHeader}>
        <Text style={[styles.topListsTitle, { color: theme.text }]}>🏆 Top 10 Lists</Text>
        <Text style={[styles.topListsSubtitle, { color: theme.secondaryText }]}>
          Curated drummer rankings by category
        </Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.topListsScroll}
      >
        {lists.map((list) => (
          <TouchableOpacity
            key={list.slug}
            style={[styles.topListCard, { backgroundColor: theme.card, borderColor: theme.border }]}
            onPress={() => onNavigateToList(list.slug)}
            accessibilityRole="button"
            accessibilityLabel={`View ${list.title}`}
          >
            <Text style={styles.topListEmoji}>{list.emoji}</Text>
            <Text style={[styles.topListCardTitle, { color: theme.text }]} numberOfLines={2}>
              {list.title.replace('Top 10 ', '')}
            </Text>
            <Text style={[styles.topListCardCount, { color: theme.secondaryText }]}>
              10 drummers →
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

// ==========================================
// TOP LIST PAGE - Individual list view
// ==========================================

function TopListPage({ theme, onBack, drummers, onSelectDrummer, listSlug }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const [list, setList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load list data lazily
  useEffect(() => {
    loadTop10Lists().then(module => {
      _top10ListsModule = module;
      setList(module.getTop10ListBySlug(listSlug));
      setIsLoading(false);
    });
  }, [listSlug]);

  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background, alignItems: 'center', justifyContent: 'center', paddingTop: 100 }]}>
        <ActivityIndicator size="large" color={theme.primary} />
        <Text style={[{ color: theme.secondaryText, marginTop: 16 }]}>
          Loading list...
        </Text>
      </View>
    );
  }

  if (!list) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={[styles.backButtonText, { color: theme.primary }]}>← Back</Text>
        </TouchableOpacity>
        <Text style={[styles.errorText, { color: theme.text }]}>List not found</Text>
      </View>
    );
  }

  // Get drummers in ranked order
  const rankedDrummers = list.drummerIds
    .map(id => drummers.find(d => d.id === id))
    .filter(Boolean);

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Text style={[styles.backButtonText, { color: theme.primary }]}>← Back to Home</Text>
      </TouchableOpacity>

      <View style={styles.topListPageHeader}>
        <Text style={styles.topListPageEmoji}>{list.emoji}</Text>
        <Text style={[styles.topListPageTitle, { color: theme.text }]}>{list.title}</Text>
        <Text style={[styles.topListPageDescription, { color: theme.secondaryText }]}>
          {list.description}
        </Text>
      </View>

      <View style={[styles.topListRankings, isMobile && styles.topListRankingsMobile]}>
        {rankedDrummers.map((drummer, index) => {
          const ranking = list.rankings[drummer.id];
          const rank = ranking?.rank || index + 1;
          
          return (
            <TouchableOpacity
              key={drummer.id}
              style={[styles.topListRankCard, { backgroundColor: theme.card, borderColor: theme.border }]}
              onPress={() => onSelectDrummer(drummer)}
              accessibilityRole="button"
              accessibilityLabel={`#${rank} ${drummer.name}`}
            >
              <View style={[styles.topListRankBadge, rank <= 3 && styles.topListRankBadgeTop3]}>
                <Text style={styles.topListRankNumber}>#{rank}</Text>
              </View>
              <ImageWithFallback
                source={{ uri: drummer.image || PLACEHOLDER_IMAGE }}
                style={styles.topListDrummerImage}
                accessibilityLabel={`Photo of ${drummer.name}`}
                width={60}
                height={60}
                imageContext="thumbnail"
              />
              <View style={styles.topListDrummerInfo}>
                <Text style={[styles.topListDrummerName, { color: theme.text }]}>{drummer.name}</Text>
                <Text style={[styles.topListDrummerBand, { color: theme.secondaryText }]}>
                  {drummer.band}
                </Text>
                {ranking?.highlight && (
                  <Text style={[styles.topListHighlight, { color: theme.primary }]}>
                    {ranking.highlight}
                  </Text>
                )}
                {ranking?.reason && (
                  <Text style={[styles.topListReason, { color: theme.secondaryText }]} numberOfLines={2}>
                    {ranking.reason}
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.inlineStyle2} />
    </ScrollView>
  );
}

const PLACEHOLDER_IMAGE = 'https://ui-avatars.com/api/?name=Drummer&background=1a1a2e&color=fff&size=200';

// Genre color mapping for consistent UI (using centralized color tokens)
const GENRE_COLORS = {
  'Thrash Metal': { bg: colors.genre.thrash, text: colors.text.primary },
  'Death Metal': { bg: colors.genre.death, text: colors.text.primary },
  'Black Metal': { bg: colors.genre.black, text: colors.text.primary },
  'Progressive Metal': { bg: colors.genre.progressive, text: colors.text.primary },
  'Nu-Metal': { bg: colors.genre.nuMetal, text: colors.text.primary },
  'Groove Metal': { bg: colors.genre.groove, text: colors.text.primary },
  'Power Metal': { bg: colors.genre.power, text: colors.text.primary },
  'Metalcore/Djent': { bg: colors.genre.metalcore, text: colors.text.primary },
};

const getGenreColors = (genre) => {
  return GENRE_COLORS[genre] || { bg: colors.genre.default, text: colors.text.primary };
};

function GenreTag({ genre, size = 'small' }) {
  const colors = getGenreColors(genre);
  const isSmall = size === 'small';

  return (
    <View style={[
      styles.genreTag,
      { backgroundColor: colors.bg },
      isSmall ? styles.genreTagSmall : styles.genreTagLarge
    ]}>
      <Text style={[
        styles.genreTagText,
        { color: colors.text },
        isSmall ? styles.genreTagTextSmall : styles.genreTagTextLarge
      ]}>
        {genre}
      </Text>
    </View>
  );
}

function GenreTags({ genres, size = 'small' }) {
  const validGenres = (genres || []).filter(g => g && g.trim());
  if (validGenres.length === 0) return null;

  return (
    <View style={styles.genreTagsContainer}>
      {validGenres.map((genre, index) => (
        <GenreTag key={index} genre={genre} size={size} />
      ))}
    </View>
  );
}

// Search Bar Component with autocomplete
function SearchBar({ value, onChange, onFocus, onClear, suggestions, onSelectSuggestion, showSuggestions, theme, inputRef }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <View style={styles.searchContainer}>
      <View style={[styles.searchInputWrapper, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <Text style={[styles.searchIcon, { color: theme.secondaryText }]}>🔍</Text>
        <TextInput
          ref={inputRef}
          style={[styles.searchInput, { color: theme.text }]}
          placeholder="Search drummers, bands, gear..."
          placeholderTextColor={theme.secondaryText}
          value={value}
          onChangeText={onChange}
          onFocus={onFocus}
          accessibilityLabel="Search drummers by name, band, or gear brand"
          // Mobile keyboard fix (Issue #469): iOS Safari requires explicit input mode
          inputMode="text"
          enterKeyHint="search"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="off"
        />
        {value ? (
          <TouchableOpacity onPress={onClear} style={styles.searchClearButton}>
            <Text style={[styles.searchClearText, { color: theme.secondaryText }]}>✕</Text>
          </TouchableOpacity>
        ) : (
          !isMobile && (
            <View style={[styles.searchShortcut, { backgroundColor: theme.background, borderColor: theme.border }]}>
              <Text style={[styles.searchShortcutText, { color: theme.secondaryText }]}>⌘K</Text>
            </View>
          )
        )}
      </View>
      {showSuggestions && suggestions.length > 0 && (
        <View style={[styles.suggestionsContainer, { backgroundColor: theme.card, borderColor: theme.border }]}>
          {suggestions.slice(0, 6).map((suggestion, index) => (
            <TouchableOpacity
              key={`${suggestion.type}-${suggestion.id || index}`}
              style={[styles.suggestionItem, { borderBottomColor: theme.border }]}
              onPress={() => onSelectSuggestion(suggestion)}
            >
              <View style={styles.suggestionContent}>
                {suggestion.image && (
                  <ImageWithFallback
                    source={{ uri: suggestion.image }}
                    style={styles.suggestionImage}
                    accessibilityLabel={`${suggestion.name} thumbnail`}
                    width={36}
                    height={36}
                    imageContext="thumbnail"
                  />
                )}
                <View style={styles.suggestionText}>
                  <Text style={[styles.suggestionTitle, { color: theme.text }]}>{suggestion.name}</Text>
                  <Text style={[styles.suggestionSubtitle, { color: theme.secondaryText }]}>
                    {suggestion.type === 'drummer' ? suggestion.band : suggestion.type}
                  </Text>
                </View>
              </View>
              <Text style={[styles.suggestionType, { color: theme.secondaryText }]}>
                {suggestion.type === 'drummer' ? '👤' : suggestion.type === 'band' ? '🎸' : '🥁'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

// Filter chip component
function FilterChip({ label, isActive, onPress, theme }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.filterChip,
        { borderColor: theme.border },
        isActive && { backgroundColor: theme.text, borderColor: theme.text }
      ]}
    >
      <Text style={[
        styles.filterChipText,
        { color: isActive ? theme.background : theme.text }
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

// Filter dropdown component
function FilterDropdown({ title, options, selectedValue, onSelect, theme, isOpen, onToggle, alwaysShowTitle }) {
  const displayLabel = alwaysShowTitle ? title : (selectedValue ? options.find(o => o.value === selectedValue)?.label : title);
  return (
    <View style={styles.filterDropdownContainer}>
      <TouchableOpacity
        onPress={onToggle}
        style={[styles.filterDropdownButton, { backgroundColor: theme.card, borderColor: theme.border }]}
      >
        <Text style={[styles.filterDropdownLabel, { color: selectedValue && !alwaysShowTitle ? theme.text : theme.secondaryText }]}>
          {displayLabel}
        </Text>
        <Text style={[styles.filterDropdownArrow, { color: theme.secondaryText }]}>
          {isOpen ? '▲' : '▼'}
        </Text>
      </TouchableOpacity>
      {isOpen && (
        <View style={[styles.filterDropdownMenu, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <TouchableOpacity
            onPress={() => onSelect('')}
            style={[styles.filterDropdownItem, { borderBottomColor: theme.border }]}
          >
            <Text style={[styles.filterDropdownItemText, { color: theme.secondaryText }]}>All</Text>
          </TouchableOpacity>
          {options.map((option) => (
            <TouchableOpacity
              key={option.value}
              onPress={() => onSelect(option.value)}
              style={[
                styles.filterDropdownItem,
                { borderBottomColor: theme.border },
                selectedValue === option.value && { backgroundColor: theme.border }
              ]}
            >
              <Text style={[styles.filterDropdownItemText, { color: theme.text }]}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

// Filter bar component
function FilterBar({ filters, onFilterChange, totalCount, filteredCount, onClearAll, theme, sortBy, onSortChange }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const [isExpanded, setIsExpanded] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const hasActiveFilters = filters.genre || filters.brand || filters.era;

  const handleDropdownToggle = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const handleFilterSelect = (filterName, value) => {
    onFilterChange({ ...filters, [filterName]: value });
    setOpenDropdown(null);
  };

  const handleSortSelect = (value) => {
    onSortChange(value);
    setOpenDropdown(null);
  };

  const currentSortLabel = FILTER_OPTIONS.sortOptions.find(s => s.value === sortBy)?.label || 'A-Z (Name)';

  // Mobile: collapsible filter panel
  if (isMobile) {
    return (
      <View style={styles.filterBarMobile}>
        <View style={styles.filterBarHeader}>
          <TouchableOpacity
            onPress={() => setIsExpanded(!isExpanded)}
            style={[styles.filterToggleButton, { backgroundColor: theme.card, borderColor: theme.border }]}
          >
            <Text style={[styles.filterToggleText, { color: theme.text }]}>
              {isExpanded ? 'Hide Filters' : 'Show Filters'}
              {hasActiveFilters ? ` (${[filters.genre, filters.brand, filters.era].filter(Boolean).length})` : ''}
            </Text>
            <Text style={[styles.filterToggleArrow, { color: theme.secondaryText }]}>
              {isExpanded ? '▲' : '▼'}
            </Text>
          </TouchableOpacity>
          <Text style={[styles.filterResultCount, { color: theme.secondaryText }]}>
            {filteredCount === totalCount ? `${totalCount} drummers` : `${filteredCount} of ${totalCount}`}
          </Text>
        </View>
        {isExpanded && (
          <View style={[styles.filterPanelMobile, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <FilterDropdown
              title="Sort"
              options={FILTER_OPTIONS.sortOptions}
              selectedValue={sortBy}
              onSelect={handleSortSelect}
              theme={theme}
              isOpen={openDropdown === 'sort'}
              onToggle={() => handleDropdownToggle('sort')}
            />
            <FilterDropdown
              title="Genre"
              options={FILTER_OPTIONS.genres}
              selectedValue={filters.genre}
              onSelect={(v) => handleFilterSelect('genre', v)}
              theme={theme}
              isOpen={openDropdown === 'genre'}
              onToggle={() => handleDropdownToggle('genre')}
            />
            <FilterDropdown
              title="Brand"
              options={FILTER_OPTIONS.brands}
              selectedValue={filters.brand}
              onSelect={(v) => handleFilterSelect('brand', v)}
              theme={theme}
              isOpen={openDropdown === 'brand'}
              onToggle={() => handleDropdownToggle('brand')}
            />
            {hasActiveFilters && (
              <TouchableOpacity
                onPress={onClearAll}
                style={[styles.clearFiltersButton, { borderColor: theme.error }]}
              >
                <Text style={[styles.clearFiltersText, { color: theme.error }]}>Clear All Filters</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    );
  }

  // Desktop: horizontal filter bar
  return (
    <View style={styles.filterBar}>
      <View style={styles.filterChipsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterChipsScroll}>
          <Text style={[styles.filterLabel, { color: theme.secondaryText }]}>Sort:</Text>
          <FilterDropdown
            title={currentSortLabel}
            options={FILTER_OPTIONS.sortOptions}
            selectedValue={sortBy}
            onSelect={handleSortSelect}
            theme={theme}
            isOpen={openDropdown === 'sort'}
            onToggle={() => handleDropdownToggle('sort')}
            alwaysShowTitle
          />
          <View style={styles.filterSeparator} />
          <Text style={[styles.filterLabel, { color: theme.secondaryText }]}>Genre:</Text>
          {FILTER_OPTIONS.genres.slice(0, 6).map((option) => (
            <FilterChip
              key={option.value}
              label={option.label}
              isActive={filters.genre === option.value}
              onPress={() => onFilterChange({ ...filters, genre: filters.genre === option.value ? '' : option.value })}
              theme={theme}
            />
          ))}
          <View style={styles.filterSeparator} />
          <Text style={[styles.filterLabel, { color: theme.secondaryText }]}>Brand:</Text>
          {FILTER_OPTIONS.brands.slice(0, 4).map((option) => (
            <FilterChip
              key={option.value}
              label={option.label}
              isActive={filters.brand === option.value}
              onPress={() => onFilterChange({ ...filters, brand: filters.brand === option.value ? '' : option.value })}
              theme={theme}
            />
          ))}
          <FilterDropdown
            title="More Brands"
            options={FILTER_OPTIONS.brands}
            selectedValue={filters.brand}
            onSelect={(v) => handleFilterSelect('brand', v)}
            theme={theme}
            isOpen={openDropdown === 'brand'}
            onToggle={() => handleDropdownToggle('brand')}
            alwaysShowTitle
          />
        </ScrollView>
      </View>
      <View style={styles.filterResultsContainer}>
        <Text style={[styles.filterResultCount, { color: theme.secondaryText }]}>
          {filteredCount === totalCount ? `Showing ${totalCount} drummers` : `Showing ${filteredCount} of ${totalCount} drummers`}
        </Text>
        {hasActiveFilters && (
          <TouchableOpacity onPress={onClearAll} style={styles.clearFiltersLink}>
            <Text style={[styles.clearFiltersLinkText, { color: theme.error }]}>Clear all</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

// Blurhash placeholder for smooth image loading (gray tone matching dark theme)
const BLUR_HASH = 'L6Pj0^jt.mfQ~qfQfQfQ~qfQfQfQ';

/**
 * useLazyLoad - Intersection Observer hook for lazy loading images (Issue #296)
 * 
 * Uses Intersection Observer API to detect when an element enters the viewport,
 * enabling more efficient lazy loading than native loading="lazy" with:
 * - Configurable root margin for preloading before visible
 * - Single observer instance per component for performance
 * - Fallback to eager loading for unsupported browsers
 * 
 * @param {Object} options - Intersection Observer options
 * @param {string} options.rootMargin - Margin around root (default: '100px')
 * @param {number} options.threshold - Visibility threshold (default: 0)
 * @returns {[React.RefObject, boolean]} - Ref to attach and visibility state
 */
function useLazyLoad(options = {}) {
  const { rootMargin = '100px', threshold = 0 } = options;
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Skip on non-web platforms or if already visible
    if (Platform.OS !== 'web' || isVisible) return;
    
    // Fallback for browsers without IntersectionObserver
    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin, threshold }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [rootMargin, threshold, isVisible]);

  // On native platforms, always visible (expo-image handles lazy loading)
  if (Platform.OS !== 'web') {
    return [elementRef, true];
  }

  return [elementRef, isVisible];
}

/**
 * LazyGalleryImage - Optimized lazy-loading image for photo galleries (Issue #296)
 * 
 * Uses Intersection Observer to only load images when they're about to enter
 * the viewport, reducing initial page load and bandwidth usage.
 * 
 * @param {Object} props.source - Image source object with uri property
 * @param {Object} props.style - Style object for the image
 * @param {string} props.accessibilityLabel - Accessibility label
 * @param {number} props.width - Explicit width
 * @param {number} props.height - Explicit height
 */
function LazyGalleryImage({ source, style, accessibilityLabel, width = 200, height = 150 }) {
  const [ref, isVisible] = useLazyLoad({ rootMargin: '200px' });
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Optimize image URL
  const optimizedUri = useMemo(() => {
    const uri = source?.uri;
    if (!uri) return PLACEHOLDER_IMAGE;
    if (uri.startsWith('/images/') || uri.startsWith('/api/image')) return uri;
    return getOptimizedImageUrl(uri, { width });
  }, [source?.uri, width]);

  // Generate srcset for responsive images
  const srcSet = useMemo(() => {
    const uri = source?.uri;
    if (!uri || uri.startsWith('/images/') || hasError) return '';
    return generateSrcSet(uri, SRCSET_WIDTHS);
  }, [source?.uri, hasError]);

  const webpSrcSet = useMemo(() => {
    const uri = source?.uri;
    if (!uri || uri.startsWith('/images/') || hasError) return '';
    return generateWebPSrcSet(uri, SRCSET_WIDTHS);
  }, [source?.uri, hasError]);

  const sizes = getSizesAttribute('gallery');
  const hasWebPSupport = useMemo(() => supportsWebP(), []);

  const handleError = useCallback(() => {
    if (!hasError) {
      setHasError(true);
    }
  }, [hasError]);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const flatStyle = StyleSheet.flatten(style) || {};

  // Placeholder styles (using deeper background from color tokens)
  const placeholderStyle = {
    width: flatStyle.width || width,
    height: flatStyle.height || height,
    backgroundColor: colors.bg.elevated,
    borderRadius: flatStyle.borderRadius || 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  // Image styles with fade-in transition
  const imageStyle = {
    width: flatStyle.width || width,
    height: flatStyle.height || height,
    objectFit: 'cover',
    borderRadius: flatStyle.borderRadius || 8,
    opacity: isLoaded ? 1 : 0,
    transition: 'opacity 0.3s ease-in-out',
    ...flatStyle,
  };

  // On native, use expo-image with built-in lazy loading
  if (Platform.OS !== 'web') {
    return (
      <Image
        source={{ uri: hasError ? PLACEHOLDER_IMAGE : optimizedUri }}
        style={[{ width, height }, style]}
        accessibilityLabel={accessibilityLabel}
        onError={handleError}
        contentFit="cover"
        placeholder={{ blurhash: BLUR_HASH }}
        transition={200}
        priority="low"
        cachePolicy="memory-disk"
      />
    );
  }

  // On web, use Intersection Observer for lazy loading
  return (
    <div ref={ref} style={{ ...placeholderStyle, position: 'relative', overflow: 'hidden' }}>
      {!isVisible ? (
        // Placeholder while not in viewport
        <div style={placeholderStyle} aria-hidden="true" />
      ) : hasError ? (
        // Error state
        <img
          src={PLACEHOLDER_IMAGE}
          alt={accessibilityLabel || ''}
          style={imageStyle}
        />
      ) : hasWebPSupport && webpSrcSet ? (
        // WebP with fallback
        <picture style={styles.displayMode1}>
          <source
            type="image/webp"
            srcSet={webpSrcSet}
            sizes={sizes}
          />
          <img
            src={optimizedUri}
            srcSet={srcSet}
            sizes={sizes}
            alt={accessibilityLabel || ''}
            onError={handleError}
            onLoad={handleLoad}
            style={imageStyle}
            loading="eager"
            decoding="async"
          />
        </picture>
      ) : (
        // Standard image
        <img
          src={optimizedUri}
          srcSet={srcSet}
          sizes={sizes}
          alt={accessibilityLabel || ''}
          onError={handleError}
          onLoad={handleLoad}
          style={imageStyle}
          loading="eager"
          decoding="async"
        />
      )}
    </div>
  );
}

/**
 * ImageWithFallback - Optimized image component with expo-image
 * 
 * For Core Web Vitals optimization (LCP, CLS):
 * - Above-fold images: use priority={true} for eager loading
 * - Below-fold images: automatic lazy loading with blurhash placeholder
 * - Always specify width/height to prevent Cumulative Layout Shift (CLS)
 * 
 * @param {Object} props.source - Image source object with uri property
 * @param {Object} props.style - Style object for the image
 * @param {string} props.accessibilityLabel - Accessibility label
 * @param {boolean} props.priority - If true, loads eagerly (above-fold images)
 * @param {number} props.width - Explicit width for CLS prevention
 * @param {number} props.height - Explicit height for CLS prevention
 * @param {'card' | 'detail' | 'gallery' | 'thumbnail'} props.imageContext - Context for sizes attribute (Issue #251)
 */
function ImageWithFallback({ source, style, accessibilityLabel, priority = false, width, height, imageContext = 'card' }) {
  const [hasError, setHasError] = useState(false);
  
  // Optimize external images through our proxy for CDN caching
  // For local drummer images, use pre-generated responsive sizes (Issue #465, #466)
  const optimizedUri = useMemo(() => {
    const uri = source?.uri;
    if (!uri) return PLACEHOLDER_IMAGE;
    
    // For local drummer images, use the optimized size based on display width
    if (isLocalDrummerImage(uri)) {
      const targetWidth = width || 256;
      return getLocalDrummerImageUrl(uri, targetWidth);
    }
    
    if (uri.startsWith('/images/') || uri.startsWith('/api/image')) return uri;
    const targetWidth = width || 256;
    return getOptimizedImageUrl(uri, { width: targetWidth });
  }, [source?.uri, width]);
  
  const [imageUri, setImageUri] = useState(optimizedUri);

  // Generate srcset for responsive images (Issue #251)
  // For local drummer images, use pre-generated responsive sizes (Issue #465, #466)
  const srcSet = useMemo(() => {
    const uri = source?.uri;
    if (!uri || hasError) return '';
    
    // Use pre-generated responsive images for local drummer images
    if (isLocalDrummerImage(uri)) {
      return generateLocalDrummerSrcSet(uri);
    }
    
    // Skip external image proxy for /images/ paths
    if (uri.startsWith('/images/')) return '';
    
    return generateSrcSet(uri, SRCSET_WIDTHS);
  }, [source?.uri, hasError]);

  const sizes = useMemo(() => getSizesAttribute(imageContext), [imageContext]);

  useEffect(() => {
    setImageUri(optimizedUri);
    setHasError(false);
  }, [optimizedUri]);

  const handleError = useCallback(() => {
    if (!hasError) {
      setHasError(true);
      setImageUri(PLACEHOLDER_IMAGE);
    }
  }, [hasError]);

  // Combine explicit dimensions with style for CLS prevention
  const imageStyle = width && height 
    ? [{ width, height }, style]
    : style;

  // Generate WebP srcset for modern browsers (Issue #291)
  const webpSrcSet = useMemo(() => {
    const uri = source?.uri;
    if (!uri || uri.startsWith('/images/') || hasError) return '';
    return generateWebPSrcSet(uri, SRCSET_WIDTHS);
  }, [source?.uri, hasError]);

  // Check WebP support
  const hasWebPSupport = useMemo(() => supportsWebP(), []);

  // On web, use native img tag for SEO and proper lazy loading (Issue #311)
  // Use WebP srcset when browser supports it (Issue #291)
  if (Platform.OS === 'web' && !hasError) {
    const flatStyle = StyleSheet.flatten(imageStyle) || {};
    const lazyProps = getLazyLoadingProps(priority);
    
    // Use picture element for WebP with fallback (Issue #291) - only for external images with srcSet
    if (srcSet && hasWebPSupport && webpSrcSet) {
      return (
        <picture>
          <source
            type="image/webp"
            srcSet={webpSrcSet}
            sizes={sizes}
          />
          <img
            src={imageUri}
            srcSet={srcSet}
            sizes={sizes}
            alt={accessibilityLabel || ''}
            loading={lazyProps.loading}
            decoding={lazyProps.decoding}
            fetchPriority={lazyProps.fetchPriority}
            onError={handleError}
            style={{
              width: flatStyle.width || width,
              height: flatStyle.height || height,
              objectFit: 'cover',
              borderRadius: flatStyle.borderRadius,
              ...flatStyle,
            }}
          />
        </picture>
      );
    }
    
    // Native img with loading attribute for all web images (Issue #311)
    // This ensures proper lazy loading for local images too
    return (
      <img
        src={imageUri}
        srcSet={srcSet || undefined}
        sizes={srcSet ? sizes : undefined}
        alt={accessibilityLabel || ''}
        loading={lazyProps.loading}
        decoding={lazyProps.decoding}
        fetchPriority={lazyProps.fetchPriority}
        onError={handleError}
        style={{
          width: flatStyle.width || width,
          height: flatStyle.height || height,
          objectFit: 'cover',
          borderRadius: flatStyle.borderRadius,
          ...flatStyle,
        }}
      />
    );
  }

  // Native platforms use expo-image with built-in lazy loading
  return (
    <Image
      source={{ uri: imageUri }}
      style={imageStyle}
      accessibilityLabel={accessibilityLabel}
      onError={handleError}
      contentFit="cover"
      placeholder={{ blurhash: BLUR_HASH }}
      transition={200}
      priority={priority ? 'high' : 'low'}
      cachePolicy="memory-disk"
    />
  );
}

// Use relative URL for Vercel serverless, fallback to localhost for dev
// INIT_API_URL provides combined data to reduce initial HTTP requests (SEO optimization)
const INIT_API_URL = typeof window !== 'undefined' && window.location.hostname !== 'localhost'
  ? '/api/init'
  : 'http://localhost:3001/api/init';

const API_URL = typeof window !== 'undefined' && window.location.hostname !== 'localhost'
  ? '/api/drummers'
  : 'http://localhost:3001/api/drummers';

const GEAR_API_URL = typeof window !== 'undefined' && window.location.hostname !== 'localhost'
  ? '/api/gear'
  : 'http://localhost:3001/api/gear';

function updateDocumentMeta(drummer, drummers = [], filters = {}) {
  if (Platform.OS !== 'web' || typeof document === 'undefined') return;

  // Calculate kit cost for SEO if drummer exists
  const kitCost = drummer ? calculateKitCost(drummer.gear) : null;

  // Build dynamic title and description based on filters
  const hasFilters = filters.genre || filters.brand || filters.search;
  let filterTitle = '';
  let filterDescription = '';

  if (hasFilters && !drummer) {
    const filterParts = [];
    if (filters.genre) {
      const genreLabel = FILTER_OPTIONS.genres.find(g => g.value === filters.genre)?.label || filters.genre;
      filterParts.push(genreLabel);
    }
    if (filters.brand) {
      const brandLabel = FILTER_OPTIONS.brands.find(b => b.value === filters.brand)?.label || filters.brand;
      filterParts.push(`${brandLabel} Users`);
    }
    if (filters.search) {
      filterParts.push(`matching "${filters.search}"`);
    }
    filterTitle = `${filterParts.join(' ')} Drummers | Metal Drummer Gear`;
    filterDescription = `Discover ${filterParts.join(' ').toLowerCase()} drummers and their professional drum gear setups. Browse complete gear lists, kit costs, and equipment details.`;
  }

  const title = drummer
    ? `${drummer.name} Drum Kit & Gear | Metal Drummer Gear`
    : hasFilters
      ? filterTitle
      : 'Metal Drummer Gear - Discover What Pro Drummers Play';

  const description = drummer
    ? `${drummer.name}'s complete drum setup costs approximately ${formatPrice(kitCost?.totalEur || 0, 'EUR')}. Full gear breakdown for the ${drummer.band} drummer including drums, cymbals, and hardware.`
    : hasFilters
      ? filterDescription
      : 'Explore the drum kits, cymbals, and gear used by legendary metal drummers including Lars Ulrich, Joey Jordison, Dave Lombardo and more.';

  document.title = title;

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

  setMeta('description', description);
  setMeta('keywords', drummer
    ? `${drummer.name} drums, ${drummer.name} drum kit, ${drummer.band} drummer gear, ${drummer.name} cymbals, drum kit cost`
    : 'metal drummer, drum gear, drum kit, cymbals, snare drum, double bass pedal, metal drumming');
  setMeta('og:title', title, true);
  setMeta('og:description', description, true);
  setMeta('og:type', 'website', true);
  if (drummer) {
    setMeta('og:image', drummer.image, true);
    setMeta('og:url', `https://metalforge.io/drummer/${drummer.id}`, true);
    setMeta('twitter:image', drummer.image);
  }
  setMeta('twitter:card', 'summary_large_image');
  setMeta('twitter:title', title);
  setMeta('twitter:description', description);

  // Person/WebSite schema
  let ldScript = document.querySelector('script[data-schema="main"]');
  if (!ldScript) {
    ldScript = document.createElement('script');
    ldScript.type = 'application/ld+json';
    ldScript.setAttribute('data-schema', 'main');
    document.head.appendChild(ldScript);
  }

  // Build schema based on context
  let schema;
  if (drummer) {
    // Generate MusicGroup schemas for ALL bands the drummer has played with (Issue #444)
    let musicGroupSchemas = generateAllMusicGroupSchemasFromDrummer(drummer);
    // Primary band schema for backward compatibility
    let musicGroupSchema = musicGroupSchemas.length > 0 ? musicGroupSchemas[0] : generateMusicGroupSchemaFromDrummer(drummer);
    
    // Fix #603: When bands module isn't loaded yet, create a fallback MusicGroup schema
    // This ensures MusicGroup entity is always present in the @graph for E2E tests
    if (!musicGroupSchema && drummer.band) {
      const bandSlug = drummer.band.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
      const drummerSlugForFallback = toSlug(drummer.name);
      
      musicGroupSchema = {
        "@type": "MusicGroup",
        "@id": `https://metalforge.io/bands/${bandSlug}#band`,
        "name": drummer.band,
        "url": `https://metalforge.io/bands/${bandSlug}`,
        "member": {
          "@type": "Person",
          "@id": `https://metalforge.io/drummer/${drummerSlugForFallback}#person`,
          "name": drummer.name
        }
      };
      
      // Add genre from drummer data if available
      if (drummer.genre) {
        const genres = drummer.genre.split(/\s*[\/,]\s*/).map(g => g.trim());
        musicGroupSchema.genre = genres;
      }
      
      // Add basic sameAs link for Wikipedia
      const wikiSlug = drummer.band.replace(/\s+/g, '_');
      musicGroupSchema.sameAs = [
        `https://en.wikipedia.org/wiki/${encodeURIComponent(wikiSlug)}`
      ];
      
      musicGroupSchemas = [musicGroupSchema];
    }
    
    // Enhanced structured data with Person + MusicGroup + Product pricing for drummer pages
    const graphEntities = [];
    
    // Add ALL MusicGroup entities for stronger entity recognition (Issue #444)
    musicGroupSchemas.forEach(schema => {
      if (schema) {
        graphEntities.push(schema);
      }
    });
    
    // Generate memberOf array for all bands
    const memberOfArray = generateMemberOfFromDrummer(drummer);
    
    // Generate drummer slug for @id references (Issue #516)
    const drummerSlug = toSlug(drummer.name);
    
    // Add Person schema with memberOf references to ALL MusicGroups (Issue #444, #516)
    const personSchema = {
      "@type": "Person",
      "@id": `https://metalforge.io/drummer/${drummerSlug}#person`,
      "name": drummer.name,
      "url": `https://metalforge.io/drummer/${drummerSlug}`,
      "description": drummer.bio,
      "image": `https://metalforge.io${drummer.image}`,
      "jobTitle": "Professional Drummer",
      "memberOf": memberOfArray.length > 1 ? memberOfArray : (musicGroupSchema ? {
        "@id": musicGroupSchema["@id"]
      } : {
        "@type": "MusicGroup",
        "name": drummer.band
      }),
      ...(drummer.sameAs && drummer.sameAs.length > 0 && { "sameAs": drummer.sameAs })
    };
    
    // Add nationality if country is available
    if (drummer.country) {
      personSchema.nationality = {
        "@type": "Country",
        "name": drummer.country
      };
    }
    
    graphEntities.push(personSchema);
    
    // Add Product schema for gear
    graphEntities.push({
      "@type": "Product",
      "name": `${drummer.name}'s Complete Drum Kit`,
      "description": `Professional drum setup used by ${drummer.name} of ${drummer.band}`,
      "image": `https://metalforge.io${drummer.image}`,
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "EUR",
        "lowPrice": kitCost?.totalEur || 0,
        "highPrice": Math.round((kitCost?.totalEur || 0) * 1.2),
        "offerCount": 5,
        "availability": "https://schema.org/InStock"
      },
      "brand": {
        "@type": "Brand",
        "name": extractPrimaryProduct(drummer.gear?.drums)?.split(' ')[0] || "Various"
      }
    });
    
    schema = {
      "@context": "https://schema.org",
      "@graph": graphEntities
    };
  } else {
    // Homepage schema with ItemList for drummers collection
    const baseUrl = "https://metalforge.io";
    schema = [
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Metal Drummer Gear",
        "description": description,
        "url": typeof window !== 'undefined' ? window.location.href : ''
      }
    ];

    // Add ItemList schema if drummers are available
    if (drummers && drummers.length > 0) {
      schema.push({
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Pro Metal Drummers and Their Gear",
        "description": "A comprehensive collection of legendary metal drummers and the gear they use",
        "numberOfItems": drummers.length,
        "itemListElement": drummers.map((d, i) => ({
          "@type": "ListItem",
          "position": i + 1,
          "name": d.name,
          "description": d.bio ? d.bio.substring(0, 150) : `${d.name} - ${d.band} drummer`,
          "url": `${baseUrl}/drummer/${d.id}`
        }))
      });
    }
  }

  ldScript.textContent = JSON.stringify(schema);

  // BreadcrumbList schema for drummer pages
  let breadcrumbScript = document.querySelector('script[data-schema="breadcrumb"]');
  if (drummer) {
    if (!breadcrumbScript) {
      breadcrumbScript = document.createElement('script');
      breadcrumbScript.type = 'application/ld+json';
      breadcrumbScript.setAttribute('data-schema', 'breadcrumb');
      document.head.appendChild(breadcrumbScript);
    }

    const baseUrl = "https://metalforge.io";
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": baseUrl + "/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Drummers",
          "item": baseUrl + "/#drummers"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": drummer.name,
          "item": baseUrl + "/drummer/" + drummer.id
        }
      ]
    };
    breadcrumbScript.textContent = JSON.stringify(breadcrumbSchema);
  } else if (breadcrumbScript) {
    breadcrumbScript.remove();
  }

  // FAQPage schema for drummer pages (LLM optimization)
  let faqScript = document.querySelector('script[data-schema="faq"]');
  if (drummer) {
    if (!faqScript) {
      faqScript = document.createElement('script');
      faqScript.type = 'application/ld+json';
      faqScript.setAttribute('data-schema', 'faq');
      document.head.appendChild(faqScript);
    }

    const faqItems = [
      {
        "@type": "Question",
        "name": `What drums does ${drummer.name} play?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${drummer.name} plays ${drummer.gear.drums}.`
        }
      },
      {
        "@type": "Question",
        "name": `What cymbals does ${drummer.name} use?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${drummer.name} uses ${drummer.gear.cymbals}.`
        }
      },
      {
        "@type": "Question",
        "name": `What bands is ${drummer.name} known for?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${drummer.name} is known for playing drums in ${drummer.band}.`
        }
      }
    ];

    // Add endorsements FAQ if available
    if (drummer.endorsements && drummer.endorsements.length > 0) {
      const endorsementNames = drummer.endorsements.map(e => e.name).join(', ');
      faqItems.push({
        "@type": "Question",
        "name": `What are ${drummer.name}'s gear endorsements?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${drummer.name} is endorsed by ${endorsementNames}.`
        }
      });
    }

    faqScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqItems
    });
  } else if (faqScript) {
    // Remove FAQ schema when not on a drummer page
    faqScript.remove();
  }

  // Quotation schema for drummer quotes (SEO optimization)
  let quotesScript = document.querySelector('script[data-schema="quotes"]');
  if (drummer && drummer.quotes && drummer.quotes.length > 0) {
    if (!quotesScript) {
      quotesScript = document.createElement('script');
      quotesScript.type = 'application/ld+json';
      quotesScript.setAttribute('data-schema', 'quotes');
      document.head.appendChild(quotesScript);
    }

    const baseUrl = "https://metalforge.io";
    const quotesSchema = drummer.quotes.map((quote) => ({
      "@context": "https://schema.org",
      "@type": "Quotation",
      "text": quote.text,
      "creator": {
        "@type": "Person",
        "name": drummer.name,
        "url": `${baseUrl}/drummer/${drummer.id}`
      },
      "spokenByCharacter": {
        "@type": "Person",
        "name": drummer.name
      },
      ...(quote.source && { "citation": quote.source }),
      ...(quote.year && { "dateCreated": quote.year.toString() })
    }));

    quotesScript.textContent = JSON.stringify(quotesSchema);
  } else if (quotesScript) {
    // Remove quotes schema when not on a drummer page with quotes
    quotesScript.remove();
  }

  // VideoObject schema for YouTube embeds on drummer pages
  let videoScript = document.querySelector('script[data-schema="video"]');
  if (drummer && drummer.videos && drummer.videos.length > 0) {
    if (!videoScript) {
      videoScript = document.createElement('script');
      videoScript.type = 'application/ld+json';
      videoScript.setAttribute('data-schema', 'video');
      document.head.appendChild(videoScript);
    }

    const videoSchema = drummer.videos.map((video) => ({
      "@context": "https://schema.org",
      "@type": "VideoObject",
      "name": video.title,
      "description": `${video.title} - ${drummer.name} (${drummer.band})`,
      "thumbnailUrl": `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`,
      "uploadDate": video.year ? `${video.year}-01-01` : undefined,
      "embedUrl": `https://www.youtube.com/embed/${video.youtubeId}`,
      "contentUrl": `https://www.youtube.com/watch?v=${video.youtubeId}`,
      "publisher": {
        "@type": "Organization",
        "name": "YouTube"
      }
    }));

    videoScript.textContent = JSON.stringify(videoSchema);
  } else if (videoScript) {
    // Remove video schema when not on a drummer page with videos
    videoScript.remove();
  }

  // SpeakableSpecification schema for voice search and AI optimization
  let speakableScript = document.querySelector('script[data-schema="speakable"]');
  if (drummer) {
    // Add speakable schema for drummer pages with expanded content markers
    if (!speakableScript) {
      speakableScript = document.createElement('script');
      speakableScript.type = 'application/ld+json';
      speakableScript.setAttribute('data-schema', 'speakable');
      document.head.appendChild(speakableScript);
    }

    const baseUrl = "https://metalforge.io";
    
    // Build AI-friendly summary for xpath
    const gearSummary = `${drummer.name} plays ${drummer.gear?.drums || 'drums'} with ${drummer.gear?.cymbals || 'cymbals'}.`;
    
    const speakableSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": `${drummer.name} Drum Kit & Gear`,
      "url": `${baseUrl}/drummer/${drummer.id}`,
      "description": `Complete gear profile for ${drummer.name} of ${drummer.band}. ${gearSummary}`,
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": [
          "#drummer-name",
          "#drummer-band",
          "#drummer-bio",
          "#drummer-gear",
          "#drummer-gear-summary",
          "#drummer-quote",
          "#drummer-endorsements"
        ]
      },
      "mainEntity": {
        "@type": "Person",
        "name": drummer.name,
        "jobTitle": "Drummer",
        "memberOf": {
          "@type": "MusicGroup",
          "name": drummer.band
        }
      }
    };

    speakableScript.textContent = JSON.stringify(speakableSchema);
  } else if (drummers && drummers.length > 0) {
    // Add speakable schema for homepage
    if (!speakableScript) {
      speakableScript = document.createElement('script');
      speakableScript.type = 'application/ld+json';
      speakableScript.setAttribute('data-schema', 'speakable');
      document.head.appendChild(speakableScript);
    }

    const baseUrl = "https://metalforge.io";
    const speakableSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "MetalForge - Metal Drummer Gear Database",
      "url": baseUrl,
      "description": "Comprehensive database of professional metal drummers and their gear setups. Discover what drums, cymbals, and hardware your favorite metal drummers play.",
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": [
          "#site-title",
          "#site-description",
          "#drummer-list-summary"
        ]
      }
    };

    speakableScript.textContent = JSON.stringify(speakableSchema);
  } else if (speakableScript) {
    // Remove speakable schema when not applicable
    speakableScript.remove();
  }
}

function SEOHead({ drummer, drummers = [], filters = {} }) {
  const [bandsReady, setBandsReady] = useState(isBandsLoaded());
  
  // Wait for bands module to load for MusicGroup schema (fix for #541)
  // Use Promise-based approach to avoid race conditions
  useEffect(() => {
    let mounted = true;
    
    preloadBands().then(() => {
      if (mounted) {
        setBandsReady(true);
      }
    });
    
    return () => { mounted = false; };
  }, []);
  
  // Update meta when drummer changes OR when bands module loads
  useEffect(() => {
    // Always update meta - the fallback MusicGroup schema handles cases when bands aren't loaded yet (fix #603, #605)
    // The bandsReady dependency ensures we re-update once bands load with full data
    updateDocumentMeta(drummer, drummers, filters);
  }, [drummer, drummers, filters, bandsReady]);
  
  return null;
}

function DrummerCard({ drummer, theme, onPress, index = 0 }) {
  // First 6 cards are above-fold and get priority loading
  const isAboveFold = index < 6;
  const cardContent = (
    <View style={styles.cardContent}>
      <View>
        <ImageWithFallback
          source={{ uri: drummer.image }}
          style={styles.cardImage}
          accessibilityLabel={`Photo of ${drummer.name}`}
          priority={isAboveFold}
          width={60}
          height={60}
          imageContext="thumbnail"
        />
      </View>
      <View style={styles.cardText}>
        <Text style={[styles.drummerName, { color: theme.text }]}>{drummer.name}</Text>
        <Text style={[styles.drummerBand, { color: theme.secondaryText }]}>{drummer.band}</Text>
        <GenreTags genres={drummer.genres} size="small" />
      </View>
    </View>
  );

  // Use actual anchor tag on web for SEO and accessibility
  if (Platform.OS === 'web') {
    const drummerUrl = `/drummer/${drummer.id}`;
    return (
      <a
        href={drummerUrl}
        onClick={(e) => {
          e.preventDefault();
          onPress();
        }}
        style={{
          textDecoration: 'none',
          display: 'block',
          backgroundColor: theme.card,
          borderColor: theme.border,
          borderWidth: 1,
          borderStyle: 'solid',
          borderRadius: 12,
          marginBottom: 16,
          overflow: 'hidden',
          cursor: 'pointer',
        }}
        role="link"
        aria-label={`View ${drummer.name}'s gear details`}
      >
        {cardContent}
      </a>
    );
  }

  // Use TouchableOpacity on native platforms
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}
      accessibilityRole="button"
      accessibilityLabel={`View ${drummer.name}'s gear details`}
    >
      {cardContent}
    </TouchableOpacity>
  );
}

// ==========================================
// NEWS SECTION COMPONENTS (Issue #513)
// Phase 5: News section on drummer profile
// ==========================================

/**
 * Format a date string to relative time (e.g., "2h ago", "3d ago")
 */
function formatTimeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}

/**
 * News item card component
 * Displays a single news article with image, title, snippet, source, and time
 */
function NewsCard({ item, theme }) {
  const handlePress = () => {
    if (Platform.OS === 'web') {
      window.open(item.link, '_blank', 'noopener,noreferrer');
    } else {
      Linking.openURL(item.link);
    }
  };
  
  const timeAgo = formatTimeAgo(item.pubDate);
  
  // Web-specific rendering with proper link element for SEO
  if (Platform.OS === 'web') {
    return (
      <a
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        style={styles.linkNoDecoration}
      >
        <View
          style={[styles.newsCard, { backgroundColor: theme.card, borderColor: theme.border }]}
          accessibilityRole="link"
          accessibilityLabel={`Read: ${item.title}`}
        >
          {item.image && (
            <Image
              source={{ uri: item.image }}
              style={styles.newsCardImage}
              contentFit="cover"
            />
          )}
          <View style={styles.newsCardContent}>
            <Text style={[styles.newsCardTitle, { color: theme.text }]} numberOfLines={2}>
              {item.title}
            </Text>
            <Text style={[styles.newsCardSnippet, { color: theme.secondaryText }]} numberOfLines={2}>
              {item.snippet}
            </Text>
            <View style={styles.newsCardMeta}>
              <Text style={[styles.newsCardSource, { color: theme.primary }]}>
                {item.source}
              </Text>
              <Text style={[styles.newsCardTime, { color: theme.secondaryText }]}>
                {timeAgo}
              </Text>
            </View>
          </View>
          <Text style={[styles.newsCardArrow, { color: theme.secondaryText }]}>→</Text>
        </View>
      </a>
    );
  }
  
  // Native rendering with TouchableOpacity
  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[styles.newsCard, { backgroundColor: theme.card, borderColor: theme.border }]}
      accessibilityRole="link"
      accessibilityLabel={`Read: ${item.title}`}
    >
      {item.image && (
        <Image
          source={{ uri: item.image }}
          style={styles.newsCardImage}
          contentFit="cover"
        />
      )}
      <View style={styles.newsCardContent}>
        <Text style={[styles.newsCardTitle, { color: theme.text }]} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={[styles.newsCardSnippet, { color: theme.secondaryText }]} numberOfLines={2}>
          {item.snippet}
        </Text>
        <View style={styles.newsCardMeta}>
          <Text style={[styles.newsCardSource, { color: theme.primary }]}>
            {item.source}
          </Text>
          <Text style={[styles.newsCardTime, { color: theme.secondaryText }]}>
            {timeAgo}
          </Text>
        </View>
      </View>
      <Text style={[styles.newsCardArrow, { color: theme.secondaryText }]}>→</Text>
    </TouchableOpacity>
  );
}

/**
 * News section for drummer profile page
 * Fetches and displays latest news articles about the drummer
 */
function DrummerNewsSection({ drummer, theme }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetchDrummerNews();
  }, [drummer.name]);
  
  const fetchDrummerNews = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Build the API URL - works for both web and development
      const baseUrl = Platform.OS === 'web' && typeof window !== 'undefined' 
        ? window.location.origin 
        : '';
      const apiUrl = `${baseUrl}/api/news?drummer=${encodeURIComponent(drummer.name)}&limit=5`;
      
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.items) {
        setNews(data.items);
      } else {
        setNews([]);
      }
    } catch (err) {
      console.error('[DrummerNewsSection] Error fetching news:', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  // Show loading skeleton - compact skeleton for profile page
  if (loading) {
    return (
      <View style={[styles.section, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>📰 Latest News</Text>
        {/* Inline skeleton for compact news cards */}
        {[1, 2].map((i) => (
          <View key={i} style={[styles.newsCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <View style={[styles.newsCardImage, { backgroundColor: theme.border }]} />
            <View style={styles.newsCardContent}>
              <View style={{ height: 14, width: '90%', backgroundColor: theme.border, borderRadius: 4, marginBottom: 6 }} />
              <View style={{ height: 12, width: '70%', backgroundColor: theme.border, borderRadius: 4, marginBottom: 6 }} />
              <View style={styles.flexRow}>
                <View style={{ height: 10, width: 60, backgroundColor: theme.border, borderRadius: 4, marginRight: 8 }} />
                <View style={{ height: 10, width: 40, backgroundColor: theme.border, borderRadius: 4 }} />
              </View>
            </View>
          </View>
        ))}
      </View>
    );
  }
  
  // Don't show section if error or no news
  if (error || news.length === 0) {
    return null;
  }
  
  return (
    <View style={[styles.section, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <Text style={[styles.sectionTitle, { color: theme.text }]} accessibilityRole="header">
        📰 Latest News
      </Text>
      <Text style={[styles.newsSectionDescription, { color: theme.secondaryText }]}>
        Recent articles mentioning {drummer.name}
      </Text>
      {news.map(item => (
        <NewsCard key={item.id} item={item} theme={theme} />
      ))}
    </View>
  );
}

function GearSection({ title, content, theme, gearType }) {
  const primaryProduct = extractPrimaryProduct(content);
  const affiliateLinks = getAffiliateLinks(primaryProduct, gearType);

  const handleShopPress = (url, store) => {
    // Open in new tab for web, use Linking for native
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      Linking.openURL(url);
    }
  };

  // Use gold accent for cymbal-related gear titles
  const isCymbalRelated = gearType === 'cymbals' || title.toLowerCase().includes('cymbal');
  const titleColor = isCymbalRelated ? theme.accent : theme.text;
  
  return (
    <View style={styles.gearSection} nativeID={`speakable-gear-${gearType}`}>
      <Text style={[styles.gearTitle, { color: titleColor }]}>{title}</Text>
      <Text style={[styles.gearContent, { color: theme.secondaryText }]} nativeID={`speakable-gear-${gearType}-content`}>{content}</Text>
      <View style={styles.shopLinksContainer}>
        <TouchableOpacity
          onPress={() => handleShopPress(affiliateLinks.sweetwater, 'Sweetwater')}
          style={[styles.shopButton, styles.shopButtonUS, { borderColor: theme.border }]}
          accessibilityRole="link"
          accessibilityLabel={`Shop ${primaryProduct} at Sweetwater (US)`}
        >
          <Text style={styles.shopButtonText}>Shop US</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleShopPress(affiliateLinks.thomann, 'Thomann')}
          style={[styles.shopButton, styles.shopButtonEU, { borderColor: theme.border }]}
          accessibilityRole="link"
          accessibilityLabel={`Shop ${primaryProduct} at Thomann (EU)`}
        >
          <Text style={styles.shopButtonText}>Shop EU</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function KitCostCalculator({ drummer, theme }) {
  const kitCost = calculateKitCost(drummer.gear);

  if (!kitCost) return null;

  const handleShareCost = () => {
    const shareText = `💰 ${drummer.name}'s drum kit costs ${formatPrice(kitCost.totalEur, 'EUR')} (${formatPrice(kitCost.totalUsd, 'USD')})! Check out the full gear breakdown:`;
    const shareUrl = typeof window !== 'undefined' 
      ? `${window.location.origin}/drummer/${drummer.id}`
      : `https://metalforge.io/drummer/${drummer.id}`;

    // Try native share first (mobile)
    if (Platform.OS !== 'web' && typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({
        title: `${drummer.name}'s Drum Kit Cost`,
        text: shareText,
        url: shareUrl,
      }).catch(() => {});
      return;
    }

    // Web: open Twitter share
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.open(twitterUrl, '_blank', 'noopener,noreferrer');
    } else {
      Linking.openURL(twitterUrl);
    }
  };

  const handleBuySetupPress = (store) => {
    // Create a combined search query for the full kit
    const primaryDrums = extractPrimaryProduct(drummer.gear.drums);
    let url;
    if (store === 'thomann') {
      url = getThomannLink(primaryDrums, 'full-kit');
    } else {
      url = getSweetwaterLink(primaryDrums, 'full-kit');
    }

    // Track "Buy Setup" clicks separately with utm_campaign=buy-full-setup
    url = url.replace(/utm_campaign=[^&]+/, 'utm_campaign=buy-full-setup');

    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      Linking.openURL(url);
    }
  };

  const gearLabels = {
    drums: 'Drums',
    snare: 'Snare',
    cymbals: 'Cymbals',
    hardware: 'Hardware',
    sticks: 'Sticks',
  };

  return (
    <View style={[styles.section, styles.calculatorSection, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <Text style={[styles.sectionTitle, styles.calculatorTitle, { color: theme.text }]} accessibilityRole="header">
        Kit Cost Calculator
      </Text>
      <Text style={[styles.calculatorSubtitle, { color: theme.secondaryText }]}>
        Estimated cost of {drummer.name}'s setup
      </Text>

      <View style={styles.calculatorItems}>
        {Object.entries(kitCost.items).map(([key, price]) => (
          price > 0 && (
            <View key={key} style={styles.calculatorRow}>
              <Text style={[styles.calculatorLabel, { color: theme.text }]}>
                {gearLabels[key]}
              </Text>
              <Text style={[styles.calculatorPrice, { color: theme.secondaryText }]}>
                {formatPrice(price, 'EUR')}
              </Text>
            </View>
          )
        ))}
      </View>

      <View style={[styles.calculatorDivider, { backgroundColor: theme.border }]} />

      <View style={styles.calculatorTotals}>
        <View style={styles.calculatorRow}>
          <Text style={[styles.calculatorTotalLabel, { color: theme.text }]}>
            Total (EUR)
          </Text>
          <Text style={[styles.calculatorTotalPrice, { color: theme.text }]}>
            {formatPrice(kitCost.totalEur, 'EUR')}
          </Text>
        </View>
        <View style={styles.calculatorRow}>
          <Text style={[styles.calculatorTotalLabel, { color: theme.text }]}>
            Total (USD)
          </Text>
          <Text style={[styles.calculatorTotalPrice, { color: theme.text }]}>
            {formatPrice(kitCost.totalUsd, 'USD')}
          </Text>
        </View>
      </View>

      <Text style={[styles.calculatorDisclaimer, { color: theme.secondaryText }]}>
        * Prices are estimates based on typical retail pricing. Visit retailers for current prices.
      </Text>

      <View style={styles.buySetupContainer}>
        <TouchableOpacity
          onPress={() => handleBuySetupPress('sweetwater')}
          style={[styles.buySetupButton, styles.buySetupButtonUS]}
          accessibilityRole="link"
          accessibilityLabel={`Buy ${drummer.name}'s setup at Sweetwater`}
        >
          <Text style={styles.buySetupButtonText}>Buy This Setup (US)</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleBuySetupPress('thomann')}
          style={[styles.buySetupButton, styles.buySetupButtonEU]}
          accessibilityRole="link"
          accessibilityLabel={`Buy ${drummer.name}'s setup at Thomann`}
        >
          <Text style={styles.buySetupButtonText}>Buy This Setup (EU)</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={handleShareCost}
        style={[styles.shareCostButton, { borderColor: theme.border }]}
        accessibilityRole="button"
        accessibilityLabel={`Share ${drummer.name}'s kit cost`}
      >
        <Text style={[styles.shareCostButtonText, { color: theme.text }]}>📤 Share This Kit Cost</Text>
      </TouchableOpacity>
    </View>
  );
}

// Affordable Alternatives Component - Shows budget-friendly gear options
function AffordableAlternativesSection({ drummer, allDrummers, theme, onSelectDrummer }) {
  const [gearItems, setGearItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const kitCost = calculateKitCost(drummer.gear);
  const drummerBudgetTier = kitCost ? getBudgetTier(kitCost.totalEur) : 'professional';

  // Fetch all gear to find alternatives
  useEffect(() => {
    const fetchGear = async () => {
      try {
        const response = await fetch(
          typeof window !== 'undefined' && window.location.hostname !== 'localhost'
            ? '/api/gear'
            : 'http://localhost:3001/api/gear'
        );
        if (response.ok) {
          const data = await response.json();
          setGearItems(data);
        }
      } catch (err) {
        console.error('Error fetching gear for alternatives:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchGear();
  }, []);

  // Find affordable alternatives (gear in lower price tiers)
  const alternatives = useMemo(() => {
    if (gearItems.length === 0) return [];

    // Get the drummer's gear categories
    const drummerCategories = ['drums', 'cymbals', 'hardware'];
    const tierOrder = ['entry', 'intermediate', 'professional', 'premium'];
    const drummerTierIndex = tierOrder.indexOf(drummerBudgetTier);

    // Find gear that's in a lower price tier but same category
    return gearItems
      .filter(item => {
        const itemTier = getBudgetTier(item.priceEur);
        const itemTierIndex = tierOrder.indexOf(itemTier);
        // Only show items from lower tiers
        return drummerCategories.includes(item.category) && itemTierIndex < drummerTierIndex;
      })
      .sort((a, b) => b.priceEur - a.priceEur) // Sort by price descending (best alternatives first)
      .slice(0, 6); // Show max 6 alternatives
  }, [gearItems, drummerBudgetTier]);

  // Don't show if drummer already uses entry-level gear or no alternatives found
  if (drummerBudgetTier === 'entry' || alternatives.length === 0 || loading) {
    return null;
  }

  return (
    <View style={[styles.section, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <TouchableOpacity
        onPress={() => setIsExpanded(!isExpanded)}
        style={styles.affordableAlternativesHeader}
        accessibilityRole="button"
        accessibilityLabel={`${isExpanded ? 'Collapse' : 'Expand'} affordable alternatives section`}
      >
        <View>
          <Text style={[styles.sectionTitle, { color: theme.text, marginBottom: 0 }]} accessibilityRole="header">
            💰 Affordable Alternatives
          </Text>
          <Text style={[styles.affordableAlternativesSubtitle, { color: theme.secondaryText }]}>
            Quality gear at lower price points
          </Text>
        </View>
        <Text style={[styles.expandIcon, { color: theme.secondaryText }]}>
          {isExpanded ? '▲' : '▼'}
        </Text>
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.affordableAlternativesContent}>
          <Text style={[styles.affordableAlternativesDescription, { color: theme.secondaryText }]}>
            Looking to achieve a similar sound on a budget? Check out these highly-rated alternatives:
          </Text>
          <View style={[styles.alternativesGrid, isMobile && styles.alternativesGridMobile]}>
            {alternatives.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => onSelectGear && onSelectGear(item.slug)}
                style={[styles.alternativeCard, { backgroundColor: theme.background, borderColor: theme.border }]}
                accessibilityRole="button"
                accessibilityLabel={`View ${item.name}`}
              >
                <View style={styles.alternativeInfo}>
                  <Text style={[styles.alternativeBrand, { color: theme.secondaryText }]}>{item.brand}</Text>
                  <Text style={[styles.alternativeName, { color: theme.text }]} numberOfLines={2}>{item.name}</Text>
                  <View style={styles.alternativePriceRow}>
                    <Text style={[styles.alternativePrice, { color: theme.text }]}>
                      {formatPrice(item.priceEur, 'EUR')}
                    </Text>
                    <View style={[styles.alternativeTierBadge, { backgroundColor: theme.border }]}>
                      <Text style={[styles.alternativeTierText, { color: theme.text }]}>
                        {getBudgetTierEmoji(getBudgetTier(item.priceEur))} {getBudgetTierLabel(getBudgetTier(item.priceEur))}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity
            onPress={() => {
              if (Platform.OS === 'web' && typeof window !== 'undefined') {
                window.location.href = '/gear-by-budget';
              }
            }}
            style={[styles.viewAllAlternativesButton, { borderColor: theme.border }]}
            accessibilityRole="link"
            accessibilityLabel="View all gear by budget"
          >
            <Text style={[styles.viewAllAlternativesText, { color: theme.text }]}>
              View All Gear by Budget →
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

// Gear Timeline Component - Shows evolution of drummer's gear through their career
function GearTimeline({ timeline, drummerName, theme }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedEra, setSelectedEra] = useState(null);
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const scrollViewRef = useRef(null);

  if (!timeline || timeline.length === 0) {
    return null;
  }

  const handleEraPress = (era) => {
    setSelectedEra(selectedEra?.era === era.era ? null : era);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      setSelectedEra(null);
    }
  };

  return (
    <View style={[styles.section, styles.timelineSection, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <TouchableOpacity 
        onPress={toggleExpanded}
        style={styles.timelineHeader}
        accessibilityRole="button"
        accessibilityLabel={`${isExpanded ? 'Collapse' : 'Expand'} gear timeline`}
        accessibilityState={{ expanded: isExpanded }}
      >
        <View style={styles.timelineTitleRow}>
          <Text style={[styles.sectionTitle, { color: theme.text, marginBottom: 0 }]} accessibilityRole="header">
            ⏱️ Gear Timeline
          </Text>
          <View style={[styles.timelineBadge, { backgroundColor: theme.accent || theme.primary }]}>
            <Text style={styles.timelineBadgeText}>{timeline.length} Eras</Text>
          </View>
        </View>
        <Text style={[styles.timelineSubtitle, { color: theme.secondaryText }]}>
          See how {drummerName}'s gear evolved through their career
        </Text>
        <Text style={[styles.quotesExpandIcon, { color: theme.secondaryText }]}>
          {isExpanded ? '▲ Collapse' : '▼ View Full Timeline'}
        </Text>
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.timelineContent}>
          {/* Horizontal scrollable timeline */}
          <ScrollView
            ref={scrollViewRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.timelineScroll}
            contentContainerStyle={styles.timelineScrollContent}
          >
            {timeline.map((era, index) => (
              <View key={era.era} style={styles.timelineEraWrapper}>
                {/* Era Card */}
                <TouchableOpacity
                  onPress={() => handleEraPress(era)}
                  style={[
                    styles.timelineEraCard,
                    selectedEra?.era === era.era && styles.timelineEraCardSelected,
                    { 
                      backgroundColor: selectedEra?.era === era.era ? (theme.accent || theme.primary) : theme.background,
                      borderColor: selectedEra?.era === era.era ? (theme.accent || theme.primary) : theme.border
                    }
                  ]}
                  accessibilityRole="button"
                  accessibilityLabel={`${era.era}: ${era.years}. ${era.description}`}
                  accessibilityState={{ selected: selectedEra?.era === era.era }}
                >
                  <Text style={[
                    styles.timelineEraYears,
                    { color: selectedEra?.era === era.era ? theme.text : theme.secondaryText }
                  ]}>
                    {era.years}
                  </Text>
                  <Text style={[
                    styles.timelineEraName,
                    { color: selectedEra?.era === era.era ? theme.text : theme.text }
                  ]} numberOfLines={2}>
                    {era.era}
                  </Text>
                  {era.albums && era.albums.length > 0 && (
                    <Text style={[
                      styles.timelineEraAlbums,
                      { color: selectedEra?.era === era.era ? 'rgba(255,255,255,0.8)' : theme.secondaryText }
                    ]} numberOfLines={1}>
                      {era.albums.length} album{era.albums.length > 1 ? 's' : ''}
                    </Text>
                  )}
                </TouchableOpacity>
                
                {/* Connector line between eras */}
                {index < timeline.length - 1 && (
                  <View style={[styles.timelineConnector, { backgroundColor: theme.border }]} />
                )}
              </View>
            ))}
          </ScrollView>

          {/* Swipe hint for mobile */}
          {isMobile && (
            <Text style={[styles.timelineSwipeHint, { color: theme.secondaryText }]}>
              ← Swipe to explore eras →
            </Text>
          )}

          {/* Selected Era Details */}
          {selectedEra && (
            <View style={[styles.timelineDetail, { backgroundColor: theme.background, borderColor: theme.border }]}>
              <View style={styles.timelineDetailHeader}>
                <Text style={[styles.timelineDetailTitle, { color: theme.text }]}>
                  {selectedEra.era}
                </Text>
                <Text style={[styles.timelineDetailYears, { color: theme.secondaryText }]}>
                  {selectedEra.years}
                </Text>
              </View>
              
              {selectedEra.description && (
                <Text style={[styles.timelineDetailDescription, { color: theme.secondaryText }]}>
                  {selectedEra.description}
                </Text>
              )}

              {selectedEra.albums && selectedEra.albums.length > 0 && (
                <View style={styles.timelineAlbumsSection}>
                  <Text style={[styles.timelineDetailLabel, { color: theme.text }]}>Albums:</Text>
                  <View style={styles.timelineAlbumsList}>
                    {selectedEra.albums.map((album, idx) => (
                      <View key={idx} style={[styles.timelineAlbumTag, { backgroundColor: theme.card, borderColor: theme.border }]}>
                        <Text style={[styles.timelineAlbumText, { color: theme.text }]}>{album}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}

              <View style={styles.timelineGearSection}>
                <Text style={[styles.timelineDetailLabel, { color: theme.text }]}>Gear Used:</Text>
                {selectedEra.gear.drums && (
                  <View style={styles.timelineGearItem}>
                    <Text style={[styles.timelineGearLabel, { color: theme.secondaryText }]}>🥁 Drums:</Text>
                    <Text style={[styles.timelineGearValue, { color: theme.text }]}>{selectedEra.gear.drums}</Text>
                  </View>
                )}
                {selectedEra.gear.snare && (
                  <View style={styles.timelineGearItem}>
                    <Text style={[styles.timelineGearLabel, { color: theme.secondaryText }]}>🔵 Snare:</Text>
                    <Text style={[styles.timelineGearValue, { color: theme.text }]}>{selectedEra.gear.snare}</Text>
                  </View>
                )}
                {selectedEra.gear.cymbals && (
                  <View style={styles.timelineGearItem}>
                    <Text style={[styles.timelineGearLabel, { color: theme.secondaryText }]}>🔔 Cymbals:</Text>
                    <Text style={[styles.timelineGearValue, { color: theme.text }]}>{selectedEra.gear.cymbals}</Text>
                  </View>
                )}
                {selectedEra.gear.hardware && (
                  <View style={styles.timelineGearItem}>
                    <Text style={[styles.timelineGearLabel, { color: theme.secondaryText }]}>⚙️ Hardware:</Text>
                    <Text style={[styles.timelineGearValue, { color: theme.text }]}>{selectedEra.gear.hardware}</Text>
                  </View>
                )}
                {selectedEra.gear.sticks && (
                  <View style={styles.timelineGearItem}>
                    <Text style={[styles.timelineGearLabel, { color: theme.secondaryText }]}>🥢 Sticks:</Text>
                    <Text style={[styles.timelineGearValue, { color: theme.text }]}>{selectedEra.gear.sticks}</Text>
                  </View>
                )}
              </View>

              {selectedEra.notes && (
                <View style={[styles.timelineNotes, { backgroundColor: theme.card, borderColor: theme.border }]}>
                  <Text style={[styles.timelineNotesText, { color: theme.secondaryText }]}>
                    💡 {selectedEra.notes}
                  </Text>
                </View>
              )}
            </View>
          )}
        </View>
      )}
    </View>
  );
}

// ==========================================
// SIMILAR DRUMMERS - Helper Functions & Component (Issue #157)
// ==========================================

// Extract drum brand from gear description
function extractDrumBrand(gearDescription) {
  if (!gearDescription) return null;
  const brands = ['Tama', 'Pearl', 'DW', 'Sonor', 'Mapex', 'ddrum', 'SJC', 'OCDP', 'Ludwig', 'Gretsch', 'Yamaha'];
  const lowerDesc = gearDescription.toLowerCase();
  for (const brand of brands) {
    if (lowerDesc.includes(brand.toLowerCase())) {
      return brand;
    }
  }
  return null;
}

// Extract cymbal brand from gear description
function extractCymbalBrand(gearDescription) {
  if (!gearDescription) return null;
  const brands = ['Zildjian', 'Sabian', 'Meinl', 'Paiste'];
  const lowerDesc = gearDescription.toLowerCase();
  for (const brand of brands) {
    if (lowerDesc.includes(brand.toLowerCase())) {
      return brand;
    }
  }
  return null;
}

// Get era decade from the drummer's era field
function getEraPeriod(era) {
  if (!era) return null;
  const lowerEra = era.toLowerCase();
  if (lowerEra.includes('80')) return '80s';
  if (lowerEra.includes('90')) return '90s';
  if (lowerEra.includes('2000') || lowerEra.includes('00s')) return '2000s';
  if (lowerEra.includes('2010') || lowerEra.includes('10s')) return '2010s';
  if (lowerEra.includes('current') || lowerEra.includes('2020')) return '2020s';
  return era;
}

// Calculate similarity score between two drummers
function calculateDrummerSimilarity(drummer1, drummer2) {
  if (!drummer1 || !drummer2 || drummer1.id === drummer2.id) return 0;
  
  let score = 0;
  const weights = {
    primaryGenre: 40,      // Highest weight for primary genre match
    secondaryGenre: 20,    // Secondary genre overlap
    drumBrand: 15,         // Same drum kit brand
    cymbalBrand: 10,       // Same cymbal brand
    era: 15,               // Same era/generation
  };
  
  // Get genres (from genres array or genre field)
  const genres1 = drummer1.genres || (drummer1.genre ? [drummer1.genre] : []);
  const genres2 = drummer2.genres || (drummer2.genre ? [drummer2.genre] : []);
  
  // Primary genre match (first genre in array)
  if (genres1.length > 0 && genres2.length > 0) {
    if (genres1[0] === genres2[0]) {
      score += weights.primaryGenre;
    } else {
      // Partial match for related genres (using short codes like 'thrash', 'death', etc.)
      const relatedGenres = {
        'thrash': ['groove', 'death'],
        'death': ['thrash', 'black', 'progressive'],
        'black': ['death'],
        'progressive': ['metalcore', 'death'],
        'nu-metal': ['groove', 'metalcore'],
        'groove': ['thrash', 'nu-metal'],
        'metalcore': ['progressive', 'nu-metal'],
        'hardcore': ['metalcore', 'thrash'],
      };
      const related = relatedGenres[genres1[0]] || [];
      if (related.includes(genres2[0])) {
        score += weights.primaryGenre * 0.5;
      }
    }
  }
  
  // Secondary genre overlap
  if (genres1.length > 1 && genres2.length > 1) {
    const secondaryOverlap = genres1.slice(1).some(g => genres2.includes(g)) ||
                             genres2.slice(1).some(g => genres1.includes(g));
    if (secondaryOverlap) {
      score += weights.secondaryGenre;
    }
  }
  
  // Drum brand match
  const drumBrand1 = extractDrumBrand(drummer1.gear?.drums);
  const drumBrand2 = extractDrumBrand(drummer2.gear?.drums);
  if (drumBrand1 && drumBrand2 && drumBrand1 === drumBrand2) {
    score += weights.drumBrand;
  }
  
  // Cymbal brand match
  const cymbalBrand1 = extractCymbalBrand(drummer1.gear?.cymbals);
  const cymbalBrand2 = extractCymbalBrand(drummer2.gear?.cymbals);
  if (cymbalBrand1 && cymbalBrand2 && cymbalBrand1 === cymbalBrand2) {
    score += weights.cymbalBrand;
  }
  
  // Era match
  const era1 = getEraPeriod(drummer1.era);
  const era2 = getEraPeriod(drummer2.era);
  if (era1 && era2) {
    if (era1 === era2) {
      score += weights.era;
    } else {
      // Adjacent eras get partial score
      const eraOrder = ['80s', '90s', '2000s', '2010s', '2020s'];
      const idx1 = eraOrder.indexOf(era1);
      const idx2 = eraOrder.indexOf(era2);
      if (idx1 >= 0 && idx2 >= 0 && Math.abs(idx1 - idx2) === 1) {
        score += weights.era * 0.5;
      }
    }
  }
  
  return Math.round(score);
}

// Get similar drummers sorted by similarity score
function getSimilarDrummers(drummer, allDrummers, count = 4) {
  if (!drummer || !allDrummers || allDrummers.length === 0) return [];
  
  const similarities = allDrummers
    .filter(d => d.id !== drummer.id)
    .map(d => ({
      drummer: d,
      similarity: calculateDrummerSimilarity(drummer, d),
    }))
    .filter(item => item.similarity > 0)
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, count);
  
  return similarities;
}

// Get a standout gear item for display
function getStandoutGear(drummer) {
  if (!drummer?.gear) return null;
  
  // Priority: Snare > Drums > Cymbals
  if (drummer.gear.snare) {
    // Extract just the brand and model (first few words)
    const snare = drummer.gear.snare.split(',')[0].split('(')[0].trim();
    return snare.length > 40 ? snare.substring(0, 37) + '...' : snare;
  }
  if (drummer.gear.drums) {
    const drums = drummer.gear.drums.split(',')[0].split('(')[0].trim();
    return drums.length > 40 ? drums.substring(0, 37) + '...' : drums;
  }
  if (drummer.gear.cymbals) {
    // Extract just the brand and series
    const match = drummer.gear.cymbals.match(/^([A-Za-z]+\s+[A-Za-z]+(\s+[A-Za-z]+)?)/);
    return match ? match[1] : null;
  }
  return null;
}

// Similar Drummers Section Component
function SimilarDrummersSection({ drummer, allDrummers, theme, onSelectDrummer }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  
  const similarDrummers = useMemo(() => {
    return getSimilarDrummers(drummer, allDrummers, 4);
  }, [drummer, allDrummers]);
  
  if (similarDrummers.length === 0) {
    return null;
  }
  
  const handleDrummerPress = (targetDrummer) => {
    if (onSelectDrummer) {
      // Pass the full drummer object instead of just ID to avoid lookup issues
      onSelectDrummer(targetDrummer);
    }
  };
  
  return (
    <View style={[styles.section, styles.similarDrummersSection, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <Text style={[styles.sectionTitle, { color: theme.text }]} accessibilityRole="header">
        🎯 Similar Drummers
      </Text>
      <Text style={[styles.similarDrummersSubtitle, { color: theme.secondaryText }]}>
        Drummers with similar style, genre, or gear preferences
      </Text>
      
      <View style={[styles.similarDrummersGrid, isMobile && styles.similarDrummersGridMobile]}>
        {similarDrummers.map(({ drummer: similarDrummer, similarity }) => {
          const standoutGear = getStandoutGear(similarDrummer);
          const genres = similarDrummer.genres || (similarDrummer.genre ? [similarDrummer.genre] : []);
          
          if (Platform.OS === 'web') {
            const drummerUrl = `/drummer/${toSlug(similarDrummer.name)}`;
            return (
              <a
                key={similarDrummer.id}
                href={drummerUrl}
                onClick={(e) => {
                  e.preventDefault();
                  handleDrummerPress(similarDrummer);
                }}
                style={{
                  textDecoration: 'none',
                  display: 'block',
                  width: isMobile ? '100%' : '48%',
                }}
              >
                <View style={[styles.similarDrummerCard, { backgroundColor: theme.background, borderColor: theme.border }]}>
                  <ImageWithFallback
                    source={{ uri: similarDrummer.image }}
                    style={styles.similarDrummerImage}
                    accessibilityLabel={`Photo of ${similarDrummer.name}`}
                    width={60}
                    height={60}
                    imageContext="thumbnail"
                  />
                  <View style={styles.similarDrummerInfo}>
                    <Text style={[styles.similarDrummerName, { color: theme.text }]} numberOfLines={1}>
                      {similarDrummer.name}
                    </Text>
                    <Text style={[styles.similarDrummerBand, { color: theme.secondaryText }]} numberOfLines={1}>
                      {similarDrummer.band}
                    </Text>
                    {genres.length > 0 && (
                      <View style={styles.similarDrummerGenres}>
                        {genres.slice(0, 2).map((genre, idx) => (
                          <GenreTag key={idx} genre={genre} size="small" />
                        ))}
                      </View>
                    )}
                    {standoutGear && (
                      <Text style={[styles.similarDrummerGear, { color: theme.secondaryText }]} numberOfLines={1}>
                        🥁 {standoutGear}
                      </Text>
                    )}
                  </View>
                  <View style={[styles.similarityBadge, { backgroundColor: theme.border }]}>
                    <Text style={[styles.similarityText, { color: theme.text }]}>
                      {similarity}%
                    </Text>
                  </View>
                </View>
              </a>
            );
          }
          
          return (
            <TouchableOpacity
              key={similarDrummer.id}
              onPress={() => handleDrummerPress(similarDrummer)}
              style={[styles.similarDrummerCard, { backgroundColor: theme.background, borderColor: theme.border }, isMobile && styles.similarDrummerCardMobile]}
              accessibilityRole="button"
              accessibilityLabel={`View ${similarDrummer.name}'s profile`}
            >
              <ImageWithFallback
                source={{ uri: similarDrummer.image }}
                style={styles.similarDrummerImage}
                accessibilityLabel={`Photo of ${similarDrummer.name}`}
                width={60}
                height={60}
                imageContext="thumbnail"
              />
              <View style={styles.similarDrummerInfo}>
                <Text style={[styles.similarDrummerName, { color: theme.text }]} numberOfLines={1}>
                  {similarDrummer.name}
                </Text>
                <Text style={[styles.similarDrummerBand, { color: theme.secondaryText }]} numberOfLines={1}>
                  {similarDrummer.band}
                </Text>
                {genres.length > 0 && (
                  <View style={styles.similarDrummerGenres}>
                    {genres.slice(0, 2).map((genre, idx) => (
                      <GenreTag key={idx} genre={genre} size="small" />
                    ))}
                  </View>
                )}
                {standoutGear && (
                  <Text style={[styles.similarDrummerGear, { color: theme.secondaryText }]} numberOfLines={1}>
                    🥁 {standoutGear}
                  </Text>
                )}
              </View>
              <View style={[styles.similarityBadge, { backgroundColor: theme.border }]}>
                <Text style={[styles.similarityText, { color: theme.text }]}>
                  {similarity}%
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

// ==========================================
// DRUMMER COMPARISONS CTA - Issue #558
// Shows comparisons featuring the current drummer with link to /vs
// ==========================================

function DrummerComparisonsCTA({ drummerSlug, drummerName, allDrummers, theme }) {
  const [isLoaded, setIsLoaded] = useState(isDrummerComparisonsLoaded());
  
  useEffect(() => {
    if (!isLoaded) {
      preloadDrummerComparisons();
      const unsubscribe = onDrummerComparisonsLoaded(() => setIsLoaded(true));
      return unsubscribe;
    }
  }, [isLoaded]);
  
  const comparisons = getComparisonsForDrummer(drummerSlug);
  
  // Don't show if no comparisons or module not loaded
  if (!isLoaded || comparisons.length === 0) {
    return null;
  }
  
  const findDrummerBySlug = (slug) => {
    if (!allDrummers) return null;
    return allDrummers.find(d => toSlug(d.name) === slug);
  };
  
  return (
    <View style={[styles.section, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <Text style={[styles.sectionTitle, { color: theme.text }]} accessibilityRole="header">
        ⚔️ Drummer Showdowns
      </Text>
      <Text style={{ color: theme.secondaryText, fontSize: 14, marginBottom: 16 }}>
        See how {drummerName} compares to other metal legends
      </Text>
      
      <View style={{ gap: 12 }}>
        {comparisons.slice(0, 3).map((comparison) => {
          const opponent = comparison.drummers.find(d => d !== drummerSlug);
          const opponentDrummer = findDrummerBySlug(opponent);
          
          return (
            <TouchableOpacity
              key={comparison.slug}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 12,
                backgroundColor: theme.background,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: theme.border,
              }}
              onPress={() => {
                if (Platform.OS === 'web' && typeof window !== 'undefined') {
                  window.history.pushState({}, '', `/vs/${comparison.slug}`);
                  window.dispatchEvent(new PopStateEvent('popstate'));
                }
              }}
              accessibilityRole="link"
              accessibilityLabel={`Compare ${drummerName} vs ${opponentDrummer?.name || opponent}`}
            >
              <View style={{ 
                backgroundColor: theme.primary, 
                width: 36, 
                height: 36, 
                borderRadius: 18, 
                alignItems: 'center', 
                justifyContent: 'center',
                marginRight: 12,
              }}>
                <Text style={{ color: theme.text, fontWeight: 'bold', fontSize: 12 }}>VS</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: theme.text, fontWeight: '600', fontSize: 15 }}>
                  {drummerName} vs {opponentDrummer?.name || opponent}
                </Text>
                <Text style={{ color: theme.secondaryText, fontSize: 12 }}>
                  {opponentDrummer?.band || ''}
                </Text>
              </View>
              <Text style={{ color: theme.primary, fontWeight: '600', fontSize: 13 }}>Compare →</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      
      {comparisons.length > 3 && (
        <TouchableOpacity
          style={{ marginTop: 16, alignItems: 'center' }}
          onPress={() => {
            if (Platform.OS === 'web' && typeof window !== 'undefined') {
              window.history.pushState({}, '', '/vs');
              window.dispatchEvent(new PopStateEvent('popstate'));
            }
          }}
          accessibilityRole="link"
          accessibilityLabel="View all drummer comparisons"
        >
          <Text style={{ color: theme.primary, fontWeight: '600' }}>
            View All Comparisons ({getAllDrummerComparisons().length} total) →
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

function DrummerDetail({ drummer, theme, onBack, onSelectGear, onCompareYourKit, allDrummers = [], onNavigateToBio }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const drummerSlug = toSlug(drummer.name);
  const hasBio = hasExtendedBio(drummerSlug);

  const handleEndorsementPress = (url) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.drummerDetailWrapper}>
      {/* Share buttons - positioned outside scroll for proper sticky/fixed behavior */}
      <ProfileShareButtons drummer={drummer} theme={theme} />
      
      <ScrollView 
        style={[styles.detailContainer, !isMobile && styles.detailContainerWithSideRail]} 
        contentContainerStyle={[styles.detailContent, isMobile && styles.detailContentMobile]}
      >
        <SEOHead drummer={drummer} />
        <TouchableOpacity
          onPress={onBack}
          style={[styles.backButton, { backgroundColor: theme.card, borderColor: theme.border }]}
          accessibilityRole="button"
          accessibilityLabel="Go back to drummer list"
        >
          <Text style={[styles.backButtonText, { color: theme.text }]}>Back to List</Text>
        </TouchableOpacity>

        <View style={styles.detailHeader}>
          <ImageWithFallback
            source={{ uri: drummer.image }}
            style={styles.detailImage}
            accessibilityLabel={`Photo of ${drummer.name}`}
            priority={true}
            width={120}
            height={120}
            imageContext="detail"
          />
          <View style={styles.detailHeaderText}>
            <Text style={[styles.detailName, { color: theme.text }]} accessibilityRole="header">{drummer.name}</Text>
            <Text style={[styles.detailBand, { color: theme.secondaryText }]}>{drummer.band}</Text>
            <GenreTags genres={drummer.genres} size="large" />
            <Text style={[styles.detailMeta, { color: theme.secondaryText }]}>{drummer.country}</Text>
          </View>
        </View>

      <View style={[styles.section, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]} accessibilityRole="header">Biography</Text>
        <Text style={[styles.bioText, { color: theme.secondaryText }]}>{drummer.bio}</Text>
        {hasBio && (
          Platform.OS === 'web' ? (
            <a
              href={`/drummer/${drummerSlug}/bio`}
              onClick={(e) => {
                e.preventDefault();
                if (onNavigateToBio) onNavigateToBio(drummerSlug);
              }}
              style={styles.marginSpacing1}
              data-testid="extended-bio-link"
            >
              <Text style={[styles.bioMoreLink, { color: theme.primary }]}>
                Read Extended Bio →
              </Text>
            </a>
          ) : (
            <TouchableOpacity
              onPress={() => onNavigateToBio && onNavigateToBio(drummerSlug)}
              style={styles.mt3}
              accessibilityRole="link"
              accessibilityLabel={`Read extended biography of ${drummer.name}`}
            >
              <Text style={[styles.bioMoreLink, { color: theme.primary }]}>
                Read Extended Bio →
              </Text>
            </TouchableOpacity>
          )
        )}
      </View>

      <QuotesSection quotes={drummer.quotes} drummerName={drummer.name} theme={theme} />

      {/* Band Links Section - Issue #351 */}
      <BandLinksSection bandLinks={getExtendedBio(drummerSlug)?.bands} bandName={drummer.band} theme={theme} />

      <View style={[styles.section, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]} accessibilityRole="header">Gear Setup</Text>
        <GearSection title="Drums" content={drummer.gear.drums} theme={theme} gearType="drums" />
        <GearSection title="Snare" content={drummer.gear.snare} theme={theme} gearType="snare" />
        <GearSection title="Cymbals" content={drummer.gear.cymbals} theme={theme} gearType="cymbals" />
        <GearSection title="Hardware" content={drummer.gear.hardware} theme={theme} gearType="hardware" />
        {drummer.gear.sticks && (
          <GearSection title="Sticks" content={drummer.gear.sticks} theme={theme} gearType="sticks" />
        )}
      </View>

      <KitCostCalculator drummer={drummer} theme={theme} />

      {/* Similar Drummers Section - TEMPORARILY DISABLED - component needs to be restored from PR #158 */}
      {/* TODO: Restore SimilarDrummersSection from feature/issue-157-similar-drummers branch */}

      {/* Compare Your Kit CTA */}
      <View style={[styles.section, styles.compareYourKitCTA, { backgroundColor: theme.card, borderColor: theme.primary }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>🥁 Compare Your Kit</Text>
        <Text style={[styles.compareYourKitDescription, { color: theme.secondaryText }]}>
          See how your drum setup matches up with {drummer.name}'s legendary gear!
        </Text>
        <TouchableOpacity
          onPress={() => onCompareYourKit(drummer)}
          style={[styles.compareYourKitButton]}
          accessibilityRole="button"
          accessibilityLabel={`Compare your kit with ${drummer.name}'s gear`}
        >
          <Text style={styles.compareYourKitButtonText}>Compare My Kit</Text>
        </TouchableOpacity>
      </View>

      <GearTimeline timeline={drummer.gearTimeline} drummerName={drummer.name} theme={theme} />

      {/* News Section - Issue #513 - Phase 5 */}
      <DrummerNewsSection drummer={drummer} theme={theme} />

      {drummer.photos && drummer.photos.length > 0 && (
        <View style={[styles.section, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]} accessibilityRole="header">Photo Gallery</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.gallery}>
            {drummer.photos.map((photo, index) => (
              <LazyGalleryImage
                key={index}
                source={{ uri: photo }}
                style={styles.galleryImage}
                accessibilityLabel={`${drummer.name} photo ${index + 1}`}
                width={200}
                height={150}
              />
            ))}
          </ScrollView>
        </View>
      )}

      {drummer.endorsements && drummer.endorsements.length > 0 && (
        <View style={[styles.section, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.accent }]} accessibilityRole="header">Endorsements</Text>
          <View style={styles.endorsements}>
            {drummer.endorsements.map((endorsement, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleEndorsementPress(endorsement.url)}
                style={[styles.endorsementLink, { borderColor: theme.accent, backgroundColor: theme.surfaceElevated }]}
                accessibilityRole="link"
                accessibilityLabel={`Visit ${endorsement.name} website`}
              >
                <Text style={[styles.endorsementText, { color: theme.accent }]}>{endorsement.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {drummer.videos && drummer.videos.length > 0 && (
        <View style={[styles.section, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]} accessibilityRole="header">Drum Cam Videos</Text>
          <View style={styles.videosContainer}>
            {drummer.videos.map((video, index) => (
              <VideoCard key={index} video={video} theme={theme} />
            ))}
          </View>
        </View>
      )}

      {/* Similar Drummers Section - Issue #157 */}
      {allDrummers.length > 0 && (
        <SimilarDrummersSection
          drummer={drummer}
          allDrummers={allDrummers}
          theme={theme}
          onSelectDrummer={(targetDrummer) => {
            // Navigate to the selected drummer's profile
            // Receives the full drummer object directly to avoid ID type mismatch issues
            if (Platform.OS === 'web' && typeof window !== 'undefined' && targetDrummer) {
              window.history.pushState({}, '', `/drummer/${toSlug(targetDrummer.name)}`);
              window.dispatchEvent(new PopStateEvent('popstate'));
            }
          }}
        />
      )}

      {/* Drummer vs Drummer Comparisons CTA - Issue #558 */}
      <DrummerComparisonsCTA 
        drummerSlug={drummerSlug} 
        drummerName={drummer.name}
        allDrummers={allDrummers}
        theme={theme} 
      />
      
      {/* Last Updated Timestamp - Issue #449 */}
      <View style={[styles.lastUpdatedContainer, { borderTopColor: theme.border }]}>
        {Platform.OS === 'web' ? (
          <time dateTime="2026-02-17" style={[styles.textXs, { color: theme.secondaryText }]}>
            Last updated: February 17, 2026
          </time>
        ) : (
          <Text style={[styles.lastUpdatedText, { color: theme.secondaryText }]}>
            Last updated: February 17, 2026
          </Text>
        )}
      </View>
      </ScrollView>
    </View>
  );
}

// Dropdown selector for drummer comparison
function DrummerSelector({ drummers, selectedId, onSelect, placeholder, theme, excludeIds = [], isMobile = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState('');

  const availableDrummers = useMemo(() => {
    return drummers.filter(d => !excludeIds.includes(d.id.toString()) || d.id.toString() === selectedId);
  }, [drummers, excludeIds, selectedId]);

  const filteredDrummers = useMemo(() => {
    return availableDrummers.filter(d =>
      d.name.toLowerCase().includes(searchText.toLowerCase()) ||
      d.band.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [availableDrummers, searchText]);

  const selectedDrummer = drummers.find(d => d.id.toString() === selectedId);

  // Use native select on mobile web for better UX
  if (isMobile && Platform.OS === 'web') {
    return (
      <View style={styles.selectorContainer}>
        <select
          value={selectedId || ''}
          onChange={(e) => onSelect(e.target.value || null)}
          style={{
            width: '100%',
            minHeight: 48,
            padding: '14px 16px',
            fontSize: 16,
            backgroundColor: theme.card,
            color: selectedId ? theme.text : theme.secondaryText,
            border: `1px solid ${theme.border}`,
            borderRadius: 8,
            appearance: 'none',
            WebkitAppearance: 'none',
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='${encodeURIComponent(theme.secondaryText)}' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 16px center',
            cursor: 'pointer',
          }}
          aria-label={placeholder}
        >
          <option value="">{placeholder}</option>
          {availableDrummers.map(drummer => (
            <option key={drummer.id} value={drummer.id.toString()}>
              {drummer.name} ({drummer.band})
            </option>
          ))}
        </select>
      </View>
    );
  }

  return (
    <View style={[styles.selectorContainer, isMobile && styles.selectorContainerMobile]}>
      <TouchableOpacity
        onPress={() => setIsOpen(!isOpen)}
        style={[
          styles.selectorButton,
          isMobile && styles.selectorButtonMobile,
          { backgroundColor: theme.card, borderColor: theme.border }
        ]}
      >
        <Text style={[
          styles.selectorText,
          isMobile && styles.selectorTextMobile,
          { color: selectedDrummer ? theme.text : theme.secondaryText }
        ]}>
          {selectedDrummer ? `${selectedDrummer.name} (${selectedDrummer.band})` : placeholder}
        </Text>
        <Text style={[styles.selectorArrow, { color: theme.secondaryText }]}>
          {isOpen ? '▲' : '▼'}
        </Text>
      </TouchableOpacity>
      {isOpen && (
        <View style={[
          styles.selectorDropdown,
          isMobile && styles.selectorDropdownMobile,
          { backgroundColor: theme.card, borderColor: theme.border }
        ]}>
          <TextInput
            style={[
              styles.selectorSearch,
              isMobile && styles.selectorSearchMobile,
              { backgroundColor: theme.background, borderColor: theme.border, color: theme.text }
            ]}
            placeholder="Search drummers..."
            placeholderTextColor={theme.secondaryText}
            value={searchText}
            onChangeText={setSearchText}
          />
          <ScrollView style={[styles.selectorList, isMobile && styles.selectorListMobile]} nestedScrollEnabled>
            {selectedId && (
              <TouchableOpacity
                onPress={() => {
                  onSelect(null);
                  setIsOpen(false);
                  setSearchText('');
                }}
                style={[
                  styles.selectorOption,
                  isMobile && styles.selectorOptionMobile,
                  { borderBottomColor: theme.border }
                ]}
              >
                <Text style={[styles.selectorOptionText, { color: theme.error }]}>Clear selection</Text>
              </TouchableOpacity>
            )}
            {filteredDrummers.map(drummer => (
              <TouchableOpacity
                key={drummer.id}
                onPress={() => {
                  onSelect(drummer.id.toString());
                  setIsOpen(false);
                  setSearchText('');
                }}
                style={[
                  styles.selectorOption,
                  isMobile && styles.selectorOptionMobile,
                  { borderBottomColor: theme.border },
                  drummer.id.toString() === selectedId && { backgroundColor: theme.border }
                ]}
              >
                <Text style={[styles.selectorOptionText, { color: theme.text }]}>{drummer.name}</Text>
                <Text style={[styles.selectorOptionSubtext, { color: theme.secondaryText }]}>{drummer.band}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

// Gear comparison row that highlights differences
function GearComparisonRow({ label, items, theme }) {
  const values = items.map(d => d?.gear?.[label.toLowerCase()] || '-');
  const allSame = values.every(v => v === values[0]);

  return (
    <View style={styles.comparisonRow}>
      <Text style={[styles.comparisonLabel, { color: theme.text }]}>{label}</Text>
      <View style={styles.comparisonValues}>
        {values.map((value, index) => (
          <View key={index} style={[
            styles.comparisonValue,
            !allSame && value !== '-' && { backgroundColor: 'rgba(255, 193, 7, 0.15)' }
          ]}>
            <Text style={[styles.comparisonValueText, { color: theme.secondaryText }]}>
              {value}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

// Profile share buttons for drummer pages
// Desktop: Side rail (left side, sticky)
// Mobile: Floating bottom bar
function ProfileShareButtons({ drummer, theme }) {
  const [copied, setCopied] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  // Build share URL with UTM parameters for tracking
  const getShareUrl = (platform) => {
    const baseUrl = typeof window !== 'undefined'
      ? `${window.location.origin}/drummer/${drummer.id}`
      : `https://metalforge.io/drummer/${drummer.id}`;
    return `${baseUrl}?utm_source=social&utm_medium=${platform}&utm_campaign=drummer_share`;
  };

  // Share text matching spec: "[Drummer Name]'s complete gear breakdown - check out their setup! @MetalForgeGear"
  const shareText = `${drummer.name}'s complete gear breakdown - check out their setup! @MetalForgeGear`;

  // GA4 event tracking
  const trackShare = (platform) => {
    if (Platform.OS === 'web' && typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'share', {
        method: platform,
        content_type: 'drummer_profile',
        item_id: drummer.id,
        drummer_name: drummer.name,
      });
    }
  };

  const handleTwitterShare = () => {
    trackShare('twitter');
    const shareUrl = getShareUrl('twitter');
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    if (Platform.OS === 'web') {
      window.open(twitterUrl, '_blank', 'noopener,noreferrer');
    } else {
      Linking.openURL(twitterUrl);
    }
  };

  const handleFacebookShare = () => {
    trackShare('facebook');
    const shareUrl = getShareUrl('facebook');
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
    if (Platform.OS === 'web') {
      window.open(facebookUrl, '_blank', 'noopener,noreferrer');
    } else {
      Linking.openURL(facebookUrl);
    }
  };

  const handleCopyLink = async () => {
    trackShare('copy_link');
    const shareUrl = getShareUrl('copy_link');
    if (Platform.OS === 'web' && navigator.clipboard) {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setToastVisible(true);
      setTimeout(() => {
        setCopied(false);
        setToastVisible(false);
      }, 2000);
    }
  };

  const handleNativeShare = async () => {
    trackShare('native_share');
    const shareUrl = getShareUrl('native');
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: `${drummer.name}'s Drum Gear`,
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        // User cancelled or share failed - fallback to copy
        if (err.name !== 'AbortError') {
          handleCopyLink();
        }
      }
    }
  };

  // Check if Web Share API is available (typically mobile)
  const canNativeShare = Platform.OS === 'web' && typeof navigator !== 'undefined' && navigator.share;

  // Toast notification component
  const Toast = () => {
    if (!toastVisible) return null;
    return (
      <View style={[styles.shareToast, { backgroundColor: theme.text }]}>
        <Text style={[styles.shareToastText, { color: theme.background }]}>✓ Link copied to clipboard!</Text>
      </View>
    );
  };

  // Mobile: Floating bottom bar with native share support
  if (isMobile) {
    return (
      <>
        <Toast />
        <View style={[styles.shareFloatingBar, { backgroundColor: theme.card, borderTopColor: theme.border }]}>
          <Text style={[styles.shareFloatingLabel, { color: theme.secondaryText }]}>Share</Text>
          <View style={styles.shareFloatingButtons}>
            {canNativeShare ? (
              <TouchableOpacity
                onPress={handleNativeShare}
                style={[styles.shareFloatingButton, styles.shareFloatingButtonNative]}
                accessibilityLabel="Share this profile"
              >
                <Text style={styles.shareFloatingIcon}>📤</Text>
              </TouchableOpacity>
            ) : (
              <>
                <TouchableOpacity
                  onPress={handleTwitterShare}
                  style={[styles.shareFloatingButton, styles.shareFloatingButtonTwitter]}
                  accessibilityLabel="Share on Twitter/X"
                >
                  <Text style={styles.shareFloatingIcon}>𝕏</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleFacebookShare}
                  style={[styles.shareFloatingButton, styles.shareFloatingButtonFacebook]}
                  accessibilityLabel="Share on Facebook"
                >
                  <Text style={styles.shareFloatingIcon}>f</Text>
                </TouchableOpacity>
              </>
            )}
            <TouchableOpacity
              onPress={handleCopyLink}
              style={[styles.shareFloatingButton, styles.shareFloatingButtonCopy, { borderColor: theme.border }]}
              accessibilityLabel="Copy link to clipboard"
            >
              <Text style={styles.shareFloatingIcon}>{copied ? '✓' : '🔗'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }

  // Desktop: Side rail (sticky, left side of content)
  return (
    <>
      <Toast />
      <View style={[styles.shareSideRail, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <Text style={[styles.shareSideRailLabel, { color: theme.secondaryText }]}>Share</Text>
        <TouchableOpacity
          onPress={handleTwitterShare}
          style={[styles.shareSideRailButton, styles.shareSideRailButtonTwitter]}
          accessibilityLabel="Share on Twitter/X"
        >
          <Text style={styles.shareSideRailIcon}>𝕏</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleFacebookShare}
          style={[styles.shareSideRailButton, styles.shareSideRailButtonFacebook]}
          accessibilityLabel="Share on Facebook"
        >
          <Text style={styles.shareSideRailIcon}>f</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleCopyLink}
          style={[styles.shareSideRailButton, styles.shareSideRailButtonCopy, { borderColor: theme.border }]}
          accessibilityLabel="Copy link to clipboard"
        >
          <Text style={styles.shareSideRailIcon}>{copied ? '✓' : '🔗'}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

// Social share buttons for comparison pages
function ShareButtons({ drummerIds, drummerNames, theme }) {
  const shareUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/compare?${drummerIds.map((id, i) => `d${i+1}=${id}`).join('&')}`
    : '';

  const shareText = `Compare drum gear: ${drummerNames.join(' vs ')} - Metal Drummer Gear`;

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    if (Platform.OS === 'web') {
      window.open(twitterUrl, '_blank', 'noopener,noreferrer');
    } else {
      Linking.openURL(twitterUrl);
    }
  };

  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    if (Platform.OS === 'web') {
      window.open(facebookUrl, '_blank', 'noopener,noreferrer');
    } else {
      Linking.openURL(facebookUrl);
    }
  };

  const handleCopyLink = async () => {
    if (Platform.OS === 'web' && navigator.clipboard) {
      await navigator.clipboard.writeText(shareUrl);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <View style={styles.shareContainer}>
      <Text style={[styles.shareTitle, { color: theme.text }]}>Share this comparison:</Text>
      <View style={styles.shareButtons}>
        <TouchableOpacity
          onPress={handleTwitterShare}
          style={[styles.shareButton, { backgroundColor: colors.buttons.ghost.bg, borderWidth: 1, borderColor: colors.buttons.ghost.border }]}
          accessibilityLabel="Share on Twitter"
        >
          <Text style={[styles.shareButtonText, { color: '#1DA1F2' }]}>𝕏 Twitter</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleFacebookShare}
          style={[styles.shareButton, { backgroundColor: colors.buttons.ghost.bg, borderWidth: 1, borderColor: colors.buttons.ghost.border }]}
          accessibilityLabel="Share on Facebook"
        >
          <Text style={[styles.shareButtonText, { color: '#4267B2' }]}>Facebook</Text>
        </TouchableOpacity>
        {Platform.OS === 'web' && (
          <TouchableOpacity
            onPress={handleCopyLink}
            style={[styles.shareButton, { backgroundColor: theme.secondaryText }]}
            accessibilityLabel="Copy link"
          >
            <Text style={styles.shareButtonText}>Copy Link</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

// ==========================================
// COMPARE YOUR KIT - User gear comparison tool
// ==========================================

// Gear options for user kit selection
const USER_GEAR_OPTIONS = {
  drums: [
    { value: '', label: 'Select your drums...' },
    // Tama
    { value: 'Tama Starclassic Maple', label: 'Tama Starclassic Maple', brand: 'Tama' },
    { value: 'Tama Starclassic Walnut/Birch', label: 'Tama Starclassic Walnut/Birch', brand: 'Tama' },
    { value: 'Tama Starclassic Bubinga', label: 'Tama Starclassic Bubinga', brand: 'Tama' },
    { value: 'Tama Superstar Classic', label: 'Tama Superstar Classic', brand: 'Tama' },
    { value: 'Tama Imperialstar', label: 'Tama Imperialstar', brand: 'Tama' },
    // Pearl
    { value: 'Pearl Masters Premium Maple', label: 'Pearl Masters Premium Maple', brand: 'Pearl' },
    { value: 'Pearl Reference Pure', label: 'Pearl Reference Pure', brand: 'Pearl' },
    { value: 'Pearl Masterworks', label: 'Pearl Masterworks', brand: 'Pearl' },
    { value: 'Pearl Session Studio Select', label: 'Pearl Session Studio Select', brand: 'Pearl' },
    { value: 'Pearl Export', label: 'Pearl Export', brand: 'Pearl' },
    // DW
    { value: 'DW Collector\'s Series Maple', label: 'DW Collector\'s Series Maple', brand: 'DW' },
    { value: 'DW Performance Series', label: 'DW Performance Series', brand: 'DW' },
    { value: 'DW Design Series', label: 'DW Design Series', brand: 'DW' },
    // Sonor
    { value: 'Sonor SQ2', label: 'Sonor SQ2', brand: 'Sonor' },
    { value: 'Sonor SQ1', label: 'Sonor SQ1', brand: 'Sonor' },
    { value: 'Sonor AQ2', label: 'Sonor AQ2', brand: 'Sonor' },
    // Mapex
    { value: 'Mapex Saturn V', label: 'Mapex Saturn V', brand: 'Mapex' },
    { value: 'Mapex Armory', label: 'Mapex Armory', brand: 'Mapex' },
    { value: 'Mapex Mars', label: 'Mapex Mars', brand: 'Mapex' },
    // Others
    { value: 'ddrum Dios Series', label: 'ddrum Dios Series', brand: 'ddrum' },
    { value: 'OCDP Custom', label: 'OCDP Custom', brand: 'OCDP' },
    { value: 'Ludwig Classic Maple', label: 'Ludwig Classic Maple', brand: 'Ludwig' },
    { value: 'Gretsch USA Custom', label: 'Gretsch USA Custom', brand: 'Gretsch' },
    { value: 'Yamaha Recording Custom', label: 'Yamaha Recording Custom', brand: 'Yamaha' },
    { value: 'Other', label: 'Other / Custom', brand: 'Other' },
  ],
  snare: [
    { value: '', label: 'Select your snare...' },
    // Tama
    { value: 'Tama S.L.P.', label: 'Tama S.L.P.', brand: 'Tama' },
    { value: 'Tama Bell Brass', label: 'Tama Bell Brass', brand: 'Tama' },
    { value: 'Tama Starphonic', label: 'Tama Starphonic', brand: 'Tama' },
    { value: 'Tama Metalworks', label: 'Tama Metalworks', brand: 'Tama' },
    // Pearl
    { value: 'Pearl Sensitone', label: 'Pearl Sensitone', brand: 'Pearl' },
    { value: 'Pearl Reference', label: 'Pearl Reference', brand: 'Pearl' },
    { value: 'Pearl Masters Maple', label: 'Pearl Masters Maple', brand: 'Pearl' },
    { value: 'Pearl Free Floating', label: 'Pearl Free Floating', brand: 'Pearl' },
    // DW
    { value: 'DW Collector\'s Series', label: 'DW Collector\'s Series', brand: 'DW' },
    { value: 'DW Performance Series', label: 'DW Performance Series', brand: 'DW' },
    // Sonor
    { value: 'Sonor SQ2', label: 'Sonor SQ2', brand: 'Sonor' },
    { value: 'Sonor One of a Kind', label: 'Sonor One of a Kind', brand: 'Sonor' },
    // Mapex
    { value: 'Mapex Black Panther', label: 'Mapex Black Panther', brand: 'Mapex' },
    { value: 'Mapex Armory', label: 'Mapex Armory', brand: 'Mapex' },
    // Others
    { value: 'Ludwig Supraphonic', label: 'Ludwig Supraphonic', brand: 'Ludwig' },
    { value: 'Ludwig Black Beauty', label: 'Ludwig Black Beauty', brand: 'Ludwig' },
    { value: 'Gretsch USA', label: 'Gretsch USA', brand: 'Gretsch' },
    { value: 'Yamaha Recording Custom', label: 'Yamaha Recording Custom', brand: 'Yamaha' },
    { value: 'Other', label: 'Other / Custom', brand: 'Other' },
  ],
  cymbals: [
    { value: '', label: 'Select your cymbals...' },
    // Zildjian
    { value: 'Zildjian A Custom', label: 'Zildjian A Custom', brand: 'Zildjian' },
    { value: 'Zildjian K Custom', label: 'Zildjian K Custom', brand: 'Zildjian' },
    { value: 'Zildjian A', label: 'Zildjian A', brand: 'Zildjian' },
    { value: 'Zildjian K', label: 'Zildjian K', brand: 'Zildjian' },
    { value: 'Zildjian S', label: 'Zildjian S', brand: 'Zildjian' },
    // Sabian
    { value: 'Sabian AAX', label: 'Sabian AAX', brand: 'Sabian' },
    { value: 'Sabian HHX', label: 'Sabian HHX', brand: 'Sabian' },
    { value: 'Sabian AA', label: 'Sabian AA', brand: 'Sabian' },
    { value: 'Sabian B8X', label: 'Sabian B8X', brand: 'Sabian' },
    // Paiste
    { value: 'Paiste RUDE', label: 'Paiste RUDE', brand: 'Paiste' },
    { value: 'Paiste 2002', label: 'Paiste 2002', brand: 'Paiste' },
    { value: 'Paiste Signature', label: 'Paiste Signature', brand: 'Paiste' },
    { value: 'Paiste Formula 602', label: 'Paiste Formula 602', brand: 'Paiste' },
    // Meinl
    { value: 'Meinl Byzance', label: 'Meinl Byzance', brand: 'Meinl' },
    { value: 'Meinl Byzance Brilliant', label: 'Meinl Byzance Brilliant', brand: 'Meinl' },
    { value: 'Meinl Classics Custom', label: 'Meinl Classics Custom', brand: 'Meinl' },
    { value: 'Meinl Pure Alloy', label: 'Meinl Pure Alloy', brand: 'Meinl' },
    { value: 'Other', label: 'Other / Mixed', brand: 'Other' },
  ],
  hardware: [
    { value: '', label: 'Select your hardware...' },
    // Tama
    { value: 'Tama Iron Cobra', label: 'Tama Iron Cobra', brand: 'Tama' },
    { value: 'Tama Speed Cobra', label: 'Tama Speed Cobra', brand: 'Tama' },
    { value: 'Tama Dyna-Sync', label: 'Tama Dyna-Sync', brand: 'Tama' },
    // Pearl
    { value: 'Pearl Demon Drive', label: 'Pearl Demon Drive', brand: 'Pearl' },
    { value: 'Pearl Eliminator', label: 'Pearl Eliminator', brand: 'Pearl' },
    { value: 'Pearl P-3000D Demon', label: 'Pearl P-3000D Demon', brand: 'Pearl' },
    // DW
    { value: 'DW 9000 Series', label: 'DW 9000 Series', brand: 'DW' },
    { value: 'DW 5000 Series', label: 'DW 5000 Series', brand: 'DW' },
    { value: 'DW MDD', label: 'DW MDD (Direct Drive)', brand: 'DW' },
    // Sonor
    { value: 'Sonor Giant Step', label: 'Sonor Giant Step', brand: 'Sonor' },
    { value: 'Sonor Perfect Balance', label: 'Sonor Perfect Balance', brand: 'Sonor' },
    // Mapex
    { value: 'Mapex Falcon', label: 'Mapex Falcon', brand: 'Mapex' },
    { value: 'Mapex Armory', label: 'Mapex Armory', brand: 'Mapex' },
    // Others
    { value: 'Axis A Longboard', label: 'Axis A Longboard', brand: 'Axis' },
    { value: 'Trick Pro 1-V', label: 'Trick Pro 1-V', brand: 'Trick' },
    { value: 'Other', label: 'Other / Mixed', brand: 'Other' },
  ],
  sticks: [
    { value: '', label: 'Select your sticks...' },
    // Vic Firth
    { value: 'Vic Firth 5A', label: 'Vic Firth 5A', brand: 'Vic Firth' },
    { value: 'Vic Firth 5B', label: 'Vic Firth 5B', brand: 'Vic Firth' },
    { value: 'Vic Firth 7A', label: 'Vic Firth 7A', brand: 'Vic Firth' },
    { value: 'Vic Firth X5A', label: 'Vic Firth X5A', brand: 'Vic Firth' },
    { value: 'Vic Firth Signature', label: 'Vic Firth Signature Series', brand: 'Vic Firth' },
    // Promark
    { value: 'Promark 5A', label: 'Promark 5A', brand: 'Promark' },
    { value: 'Promark 5B', label: 'Promark 5B', brand: 'Promark' },
    { value: 'Promark ActiveGrip', label: 'Promark ActiveGrip', brand: 'Promark' },
    { value: 'Promark Signature', label: 'Promark Signature Series', brand: 'Promark' },
    // Vater
    { value: 'Vater 5A', label: 'Vater 5A', brand: 'Vater' },
    { value: 'Vater 5B', label: 'Vater 5B', brand: 'Vater' },
    { value: 'Vater Power 5B', label: 'Vater Power 5B', brand: 'Vater' },
    // Ahead
    { value: 'Ahead', label: 'Ahead (Aluminum)', brand: 'Ahead' },
    // Others
    { value: 'Zildjian', label: 'Zildjian', brand: 'Zildjian' },
    { value: 'Other', label: 'Other', brand: 'Other' },
  ],
};

// Helper to get brand from gear description
function extractBrand(gearDescription) {
  if (!gearDescription) return '';
  const brands = ['Tama', 'Pearl', 'DW', 'Sonor', 'Mapex', 'ddrum', 'OCDP', 'Ludwig', 'Gretsch', 'Yamaha', 
                  'Zildjian', 'Sabian', 'Paiste', 'Meinl', 'Vic Firth', 'Promark', 'Vater', 'Ahead', 'Axis', 'Trick'];
  for (const brand of brands) {
    if (gearDescription.toLowerCase().includes(brand.toLowerCase())) {
      return brand;
    }
  }
  return '';
}

// Calculate match score between user kit and drummer kit
function calculateKitMatch(userKit, drummerGear) {
  if (!userKit || !drummerGear) return { percentage: 0, matches: [], upgrades: [] };
  
  const categories = ['drums', 'snare', 'cymbals', 'hardware', 'sticks'];
  const matches = [];
  const upgrades = [];
  let totalScore = 0;
  let maxScore = 0;
  
  categories.forEach(category => {
    const userValue = userKit[category] || '';
    const drummerValue = drummerGear[category] || '';
    
    if (!userValue || !drummerValue) return;
    
    maxScore += 100;
    
    const userBrand = extractBrand(userValue);
    const drummerBrand = extractBrand(drummerValue);
    
    // Exact match
    if (drummerValue.toLowerCase().includes(userValue.toLowerCase()) || 
        userValue.toLowerCase().includes(drummerValue.split(' ').slice(0, 3).join(' ').toLowerCase())) {
      totalScore += 100;
      matches.push({ category, userGear: userValue, drummerGear: drummerValue, matchType: 'exact' });
    }
    // Same brand
    else if (userBrand && drummerBrand && userBrand.toLowerCase() === drummerBrand.toLowerCase()) {
      totalScore += 60;
      matches.push({ category, userGear: userValue, drummerGear: drummerValue, matchType: 'brand' });
    }
    // Different
    else {
      upgrades.push({ category, userGear: userValue, drummerGear: drummerValue });
    }
  });
  
  const percentage = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;
  
  return { percentage, matches, upgrades };
}

// localStorage key for user kit
const USER_KIT_STORAGE_KEY = 'metalforge_user_kit';

// Load user kit from localStorage
function loadUserKit() {
  if (Platform.OS !== 'web' || typeof localStorage === 'undefined') return null;
  try {
    const saved = localStorage.getItem(USER_KIT_STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

// Save user kit to localStorage
function saveUserKit(kit) {
  if (Platform.OS !== 'web' || typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(USER_KIT_STORAGE_KEY, JSON.stringify(kit));
  } catch {
    // Storage full or unavailable
  }
}

// Get user kit params from URL for sharing
function getKitParamsFromURL() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  if (!params.get('mykit')) return null;
  return {
    drums: params.get('drums') || '',
    snare: params.get('snare') || '',
    cymbals: params.get('cymbals') || '',
    hardware: params.get('hardware') || '',
    sticks: params.get('sticks') || '',
  };
}

// Gear selector dropdown for user kit
function UserGearSelector({ category, value, onChange, theme, isMobile }) {
  const options = USER_GEAR_OPTIONS[category] || [];
  
  if (Platform.OS === 'web') {
    return (
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: '100%',
          minHeight: isMobile ? 48 : 44,
          padding: '12px 16px',
          fontSize: isMobile ? 16 : 14,
          backgroundColor: theme.card,
          color: value ? theme.text : theme.secondaryText,
          border: `1px solid ${theme.border}`,
          borderRadius: 8,
          appearance: 'none',
          WebkitAppearance: 'none',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='${encodeURIComponent(theme.secondaryText)}' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 16px center',
          cursor: 'pointer',
        }}
        aria-label={`Select your ${category}`}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    );
  }
  
  // Native fallback (basic TextInput)
  return (
    <TextInput
      value={value}
      onChangeText={onChange}
      placeholder={`Enter your ${category}...`}
      placeholderTextColor={theme.secondaryText}
      style={{
        backgroundColor: theme.card,
        color: theme.text,
        borderColor: theme.border,
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        fontSize: 14,
      }}
    />
  );
}

// Compare Your Kit Modal/View
function CompareYourKitModal({ drummer, theme, onClose }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  
  // Initialize from localStorage or URL params
  const [userKit, setUserKit] = useState(() => {
    const urlKit = getKitParamsFromURL();
    if (urlKit) return urlKit;
    const savedKit = loadUserKit();
    return savedKit || { drums: '', snare: '', cymbals: '', hardware: '', sticks: '' };
  });
  
  const [showResults, setShowResults] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Calculate match whenever user kit changes
  const matchResult = useMemo(() => {
    return calculateKitMatch(userKit, drummer.gear);
  }, [userKit, drummer.gear]);
  
  // Save to localStorage when kit changes
  useEffect(() => {
    if (userKit.drums || userKit.snare || userKit.cymbals || userKit.hardware || userKit.sticks) {
      saveUserKit(userKit);
    }
  }, [userKit]);
  
  const handleGearChange = (category, value) => {
    setUserKit(prev => ({ ...prev, [category]: value }));
    setShowResults(false);
  };
  
  const handleCompare = () => {
    setShowResults(true);
    // Track comparison event
    if (Platform.OS === 'web' && typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'compare_kit', {
        drummer_name: drummer.name,
        match_percentage: matchResult.percentage,
      });
    }
  };
  
  const handleClearKit = () => {
    setUserKit({ drums: '', snare: '', cymbals: '', hardware: '', sticks: '' });
    setShowResults(false);
    if (Platform.OS === 'web' && typeof localStorage !== 'undefined') {
      localStorage.removeItem(USER_KIT_STORAGE_KEY);
    }
  };
  
  // Generate shareable URL
  const generateShareUrl = () => {
    if (Platform.OS !== 'web' || typeof window === 'undefined') return '';
    const baseUrl = window.location.origin;
    const slug = toSlug(drummer.name);
    const params = new URLSearchParams();
    params.set('mykit', '1');
    if (userKit.drums) params.set('drums', userKit.drums);
    if (userKit.snare) params.set('snare', userKit.snare);
    if (userKit.cymbals) params.set('cymbals', userKit.cymbals);
    if (userKit.hardware) params.set('hardware', userKit.hardware);
    if (userKit.sticks) params.set('sticks', userKit.sticks);
    return `${baseUrl}/drummer/${slug}?${params.toString()}`;
  };
  
  const handleShare = async () => {
    const shareUrl = generateShareUrl();
    const shareText = `My kit is ${matchResult.percentage}% similar to ${drummer.name}'s setup! 🥁 Compare your kit on MetalForge`;
    
    // Track share event
    if (Platform.OS === 'web' && typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'share_kit_comparison', {
        drummer_name: drummer.name,
        match_percentage: matchResult.percentage,
      });
    }
    
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: `Kit Comparison: ${matchResult.percentage}% Match with ${drummer.name}`,
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        if (err.name !== 'AbortError') {
          handleCopyLink();
        }
      }
    } else {
      handleCopyLink();
    }
  };
  
  const handleCopyLink = async () => {
    const shareUrl = generateShareUrl();
    if (Platform.OS === 'web' && navigator.clipboard) {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  
  const handleTwitterShare = () => {
    const shareUrl = generateShareUrl();
    const shareText = `My kit is ${matchResult.percentage}% similar to ${drummer.name}'s setup! 🥁`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}&hashtags=metaldrumming,drumgear`;
    if (Platform.OS === 'web') {
      window.open(twitterUrl, '_blank', 'noopener,noreferrer');
    } else {
      Linking.openURL(twitterUrl);
    }
  };
  
  const hasUserGear = userKit.drums || userKit.snare || userKit.cymbals || userKit.hardware || userKit.sticks;
  
  // Match percentage color (using semantic colors)
  const getMatchColor = (percentage) => {
    if (percentage >= 80) return colors.semantic.success; // green
    if (percentage >= 60) return '#eab308'; // yellow
    if (percentage >= 40) return colors.semantic.warning; // orange
    return colors.semantic.error; // red
  };
  
  return (
    <View style={[styles.kitCompareModal, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.kitCompareContent}>
        {/* Header */}
        <View style={styles.kitCompareHeader}>
          <TouchableOpacity
            onPress={onClose}
            style={[styles.backButton, { backgroundColor: theme.card, borderColor: theme.border }]}
            accessibilityRole="button"
            accessibilityLabel="Close comparison"
          >
            <Text style={[styles.backButtonText, { color: theme.text }]}>← Back to Profile</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={[styles.kitCompareTitle, { color: theme.text }]}>
          Compare Your Kit
        </Text>
        <Text style={[styles.kitCompareSubtitle, { color: theme.secondaryText }]}>
          See how your drum gear stacks up against {drummer.name}'s setup
        </Text>
        
        {/* Drummer mini profile */}
        <View style={[styles.kitCompareDrummerCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <ImageWithFallback
            source={{ uri: drummer.image }}
            style={styles.kitCompareDrummerImage}
            accessibilityLabel={`Photo of ${drummer.name}`}
            width={60}
            height={60}
            imageContext="thumbnail"
          />
          <View style={styles.kitCompareDrummerInfo}>
            <Text style={[styles.kitCompareDrummerName, { color: theme.text }]}>{drummer.name}</Text>
            <Text style={[styles.kitCompareDrummerBand, { color: theme.secondaryText }]}>{drummer.band}</Text>
          </View>
        </View>
        
        {/* User gear input form */}
        <View style={[styles.section, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <View style={styles.kitFormHeader}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Your Kit</Text>
            {hasUserGear && (
              <TouchableOpacity onPress={handleClearKit}>
                <Text style={[styles.kitClearButton, { color: theme.error }]}>Clear All</Text>
              </TouchableOpacity>
            )}
          </View>
          
          <View style={styles.kitFormGrid}>
            <View style={styles.kitFormRow}>
              <Text style={[styles.kitFormLabel, { color: theme.text }]}>🥁 Drums</Text>
              <UserGearSelector
                category="drums"
                value={userKit.drums}
                onChange={(v) => handleGearChange('drums', v)}
                theme={theme}
                isMobile={isMobile}
              />
            </View>
            
            <View style={styles.kitFormRow}>
              <Text style={[styles.kitFormLabel, { color: theme.text }]}>🔔 Snare</Text>
              <UserGearSelector
                category="snare"
                value={userKit.snare}
                onChange={(v) => handleGearChange('snare', v)}
                theme={theme}
                isMobile={isMobile}
              />
            </View>
            
            <View style={styles.kitFormRow}>
              <Text style={[styles.kitFormLabel, { color: theme.text }]}>🎵 Cymbals</Text>
              <UserGearSelector
                category="cymbals"
                value={userKit.cymbals}
                onChange={(v) => handleGearChange('cymbals', v)}
                theme={theme}
                isMobile={isMobile}
              />
            </View>
            
            <View style={styles.kitFormRow}>
              <Text style={[styles.kitFormLabel, { color: theme.text }]}>⚙️ Hardware</Text>
              <UserGearSelector
                category="hardware"
                value={userKit.hardware}
                onChange={(v) => handleGearChange('hardware', v)}
                theme={theme}
                isMobile={isMobile}
              />
            </View>
            
            <View style={styles.kitFormRow}>
              <Text style={[styles.kitFormLabel, { color: theme.text }]}>🥢 Sticks</Text>
              <UserGearSelector
                category="sticks"
                value={userKit.sticks}
                onChange={(v) => handleGearChange('sticks', v)}
                theme={theme}
                isMobile={isMobile}
              />
            </View>
          </View>
          
          <TouchableOpacity
            onPress={handleCompare}
            disabled={!hasUserGear}
            style={[
              styles.kitCompareButton,
              { backgroundColor: hasUserGear ? theme.primary : theme.border }
            ]}
            accessibilityRole="button"
            accessibilityLabel="Compare your kit"
          >
            <Text style={styles.kitCompareButtonText}>
              {showResults ? '🔄 Update Comparison' : '⚡ Compare My Kit'}
            </Text>
          </TouchableOpacity>
        </View>
        
        {/* Results */}
        {showResults && hasUserGear && (
          <>
            {/* Match percentage */}
            <View style={[styles.section, styles.kitMatchSection, { backgroundColor: theme.card, borderColor: theme.border }]}>
              <View style={styles.kitMatchPercentageContainer}>
                <Text style={[styles.kitMatchPercentage, { color: getMatchColor(matchResult.percentage) }]}>
                  {matchResult.percentage}%
                </Text>
                <Text style={[styles.kitMatchLabel, { color: theme.text }]}>
                  Kit Match
                </Text>
                <Text style={[styles.kitMatchDescription, { color: theme.secondaryText }]}>
                  {matchResult.percentage >= 80 && "🤘 Almost twins! You're rocking very similar gear."}
                  {matchResult.percentage >= 60 && matchResult.percentage < 80 && "🎸 Nice! You share the same taste in several key pieces."}
                  {matchResult.percentage >= 40 && matchResult.percentage < 60 && "🥁 Some common ground! A few upgrades could get you closer."}
                  {matchResult.percentage < 40 && "🔥 Different paths, but that's what makes your sound unique!"}
                </Text>
              </View>
            </View>
            
            {/* Matches */}
            {matchResult.matches.length > 0 && (
              <View style={[styles.section, { backgroundColor: theme.card, borderColor: theme.border }]}>
                <Text style={[styles.sectionTitle, { color: theme.text }]}>✅ Gear You Share</Text>
                {matchResult.matches.map((match, index) => (
                  <View key={index} style={[styles.kitMatchRow, { borderBottomColor: theme.border }]}>
                    <View style={styles.kitMatchInfo}>
                      <Text style={[styles.kitMatchCategory, { color: theme.secondaryText }]}>
                        {match.category.charAt(0).toUpperCase() + match.category.slice(1)}
                      </Text>
                      <Text style={[styles.kitMatchGear, { color: theme.text }]}>
                        {match.userGear}
                      </Text>
                    </View>
                    <View style={[
                      styles.kitMatchBadge,
                      { backgroundColor: match.matchType === 'exact' ? theme.success + '20' : theme.warning + '20' }
                    ]}>
                      <Text style={[
                        styles.kitMatchBadgeText,
                        { color: match.matchType === 'exact' ? theme.success : '#eab308' }
                      ]}>
                        {match.matchType === 'exact' ? 'Exact Match!' : 'Same Brand'}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            )}
            
            {/* Upgrades / Differences */}
            {matchResult.upgrades.length > 0 && (
              <View style={[styles.section, { backgroundColor: theme.card, borderColor: theme.border }]}>
                <Text style={[styles.sectionTitle, { color: theme.text }]}>🎯 Upgrade to Match</Text>
                <Text style={[styles.kitUpgradeHint, { color: theme.secondaryText }]}>
                  These gear pieces differ from {drummer.name}'s setup
                </Text>
                {matchResult.upgrades.map((upgrade, index) => (
                  <View key={index} style={[styles.kitUpgradeRow, { borderBottomColor: theme.border }]}>
                    <Text style={[styles.kitUpgradeCategory, { color: theme.secondaryText }]}>
                      {upgrade.category.charAt(0).toUpperCase() + upgrade.category.slice(1)}
                    </Text>
                    <View style={styles.kitUpgradeComparison}>
                      <View style={styles.kitUpgradeItem}>
                        <Text style={[styles.kitUpgradeLabel, { color: theme.secondaryText }]}>Your gear</Text>
                        <Text style={[styles.kitUpgradeValue, { color: theme.text }]}>{upgrade.userGear}</Text>
                      </View>
                      <Text style={[styles.kitUpgradeArrow, { color: theme.secondaryText }]}>→</Text>
                      <View style={styles.kitUpgradeItem}>
                        <Text style={[styles.kitUpgradeLabel, { color: theme.secondaryText }]}>{drummer.name}'s</Text>
                        <Text style={[styles.kitUpgradeValue, { color: theme.primary }]}>{upgrade.drummerGear}</Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            )}
            
            {/* Share results */}
            <View style={[styles.section, { backgroundColor: theme.card, borderColor: theme.border }]}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>📤 Share Your Result</Text>
              <Text style={[styles.kitShareHint, { color: theme.secondaryText }]}>
                Show off your kit comparison to fellow drummers!
              </Text>
              <View style={styles.kitShareButtons}>
                <TouchableOpacity
                  onPress={handleTwitterShare}
                  style={[styles.kitShareButton, { backgroundColor: theme.shadowColor }]}
                >
                  <Text style={styles.kitShareButtonText}>𝕏 Tweet</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleShare}
                  style={[styles.kitShareButton, { backgroundColor: theme.primary }]}
                >
                  <Text style={styles.kitShareButtonText}>{copied ? '✓ Copied!' : '🔗 Copy Link'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
        
        {/* Drummer's full gear for reference */}
        <View style={[styles.section, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>{drummer.name}'s Full Setup</Text>
          <View style={styles.kitReferenceGrid}>
            <View style={styles.kitReferenceRow}>
              <Text style={[styles.kitReferenceLabel, { color: theme.secondaryText }]}>Drums</Text>
              <Text style={[styles.kitReferenceValue, { color: theme.text }]}>{drummer.gear.drums || '-'}</Text>
            </View>
            <View style={styles.kitReferenceRow}>
              <Text style={[styles.kitReferenceLabel, { color: theme.secondaryText }]}>Snare</Text>
              <Text style={[styles.kitReferenceValue, { color: theme.text }]}>{drummer.gear.snare || '-'}</Text>
            </View>
            <View style={styles.kitReferenceRow}>
              <Text style={[styles.kitReferenceLabel, { color: theme.secondaryText }]}>Cymbals</Text>
              <Text style={[styles.kitReferenceValue, { color: theme.text }]}>{drummer.gear.cymbals || '-'}</Text>
            </View>
            <View style={styles.kitReferenceRow}>
              <Text style={[styles.kitReferenceLabel, { color: theme.secondaryText }]}>Hardware</Text>
              <Text style={[styles.kitReferenceValue, { color: theme.text }]}>{drummer.gear.hardware || '-'}</Text>
            </View>
            <View style={styles.kitReferenceRow}>
              <Text style={[styles.kitReferenceLabel, { color: theme.secondaryText }]}>Sticks</Text>
              <Text style={[styles.kitReferenceValue, { color: theme.text }]}>{drummer.gear.sticks || '-'}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

// Main comparison view component
function CompareView({ theme, onBack, drummers, onNavigateToCompare }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  // Initialize from URL params if available
  const [selectedIds, setSelectedIds] = useState(() => {
    const urlParams = getCompareParamsFromURL();
    return urlParams.length > 0 ? urlParams : [null, null];
  });
  const [comparedDrummers, setComparedDrummers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch drummer details when selection changes
  useEffect(() => {
    const fetchDrummers = async () => {
      const idsToFetch = selectedIds.filter(id => id !== null);
      if (idsToFetch.length === 0) {
        setComparedDrummers([]);
        return;
      }

      setLoading(true);
      try {
        const results = await Promise.all(
          idsToFetch.map(async (id) => {
            const detailUrl = typeof window !== 'undefined' && window.location.hostname !== 'localhost'
              ? `/api/drummers/${id}`
              : `http://localhost:3001/api/drummers/${id}`;
            const response = await fetch(detailUrl);
            if (!response.ok) return null;
            return response.json();
          })
        );
        setComparedDrummers(results.filter(Boolean));
      } catch (err) {
        console.error('Error fetching drummers for comparison:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDrummers();
    updateCompareURL(selectedIds.filter(Boolean));
  }, [selectedIds]);

  const handleSelectDrummer = (index, id) => {
    const newIds = [...selectedIds];
    newIds[index] = id;
    setSelectedIds(newIds);
  };

  const handleAddSlot = () => {
    if (selectedIds.length < 3) {
      setSelectedIds([...selectedIds, null]);
    }
  };

  const handleRemoveSlot = (index) => {
    if (selectedIds.length > 2) {
      const newIds = selectedIds.filter((_, i) => i !== index);
      setSelectedIds(newIds);
    }
  };

  const excludeIds = selectedIds.filter(Boolean);
  const hasComparison = comparedDrummers.length >= 2;

  // Update SEO for comparison page
  useEffect(() => {
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      if (hasComparison) {
        const names = comparedDrummers.map(d => d.name).join(' vs ');
        document.title = `${names} Gear Comparison | Metal Drummer Gear`;
      } else {
        document.title = 'Compare Drummer Gear | Metal Drummer Gear';
      }
    }
  }, [hasComparison, comparedDrummers]);

  return (
    <ScrollView style={styles.detailContainer} contentContainerStyle={styles.detailContent}>
      <TouchableOpacity
        onPress={onBack}
        style={[styles.backButton, { backgroundColor: theme.card, borderColor: theme.border }]}
        accessibilityRole="button"
        accessibilityLabel="Go back to drummer list"
      >
        <Text style={[styles.backButtonText, { color: theme.text }]}>Back to List</Text>
      </TouchableOpacity>

      <Text style={[styles.compareTitle, { color: theme.text }]} accessibilityRole="header">
        Compare Drummer Gear
      </Text>
      <Text style={[styles.compareSubtitle, { color: theme.secondaryText }]}>
        Select 2-3 drummers to compare their complete setups side-by-side
      </Text>

      {/* Drummer Selectors */}
      <View style={[styles.selectorsContainer, isMobile && styles.selectorsMobile]}>
        {selectedIds.map((id, index) => (
          <View key={index} style={[styles.selectorWrapper, isMobile && styles.selectorWrapperMobile]}>
            <View style={styles.selectorHeader}>
              <Text style={[styles.selectorLabel, { color: theme.text }]}>Drummer {index + 1}</Text>
              {selectedIds.length > 2 && (
                <TouchableOpacity onPress={() => handleRemoveSlot(index)}>
                  <Text style={[styles.removeSlot, { color: theme.error }]}>Remove</Text>
                </TouchableOpacity>
              )}
            </View>
            <DrummerSelector
              drummers={drummers}
              selectedId={id}
              onSelect={(newId) => handleSelectDrummer(index, newId)}
              placeholder={`Select drummer ${index + 1}...`}
              theme={theme}
              excludeIds={excludeIds}
              isMobile={isMobile}
            />
          </View>
        ))}
        {selectedIds.length < 3 && (
          <TouchableOpacity
            onPress={handleAddSlot}
            style={[styles.addSlotButton, { borderColor: theme.border }]}
          >
            <Text style={[styles.addSlotText, { color: theme.secondaryText }]}>+ Add Third Drummer</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Loading state */}
      {loading && (
        <View style={styles.compareLoading}>
          <ActivityIndicator size="large" color={theme.text} />
        </View>
      )}

      {/* Comparison display */}
      {!loading && hasComparison && (
        <View style={styles.comparisonContainer}>
          {/* Drummer Headers */}
          <View style={[styles.comparisonHeaderRow, isMobile && styles.comparisonHeaderRowMobile]}>
            {comparedDrummers.map((drummer, index) => (
              <View key={index} style={[styles.drummerHeader, isMobile && styles.drummerHeaderMobile]}>
                <ImageWithFallback
                  source={{ uri: drummer.image }}
                  style={[styles.compareImage, isMobile && styles.compareImageMobile]}
                  accessibilityLabel={`Photo of ${drummer.name}`}
                  width={isMobile ? 60 : 80}
                  height={isMobile ? 60 : 80}
                  imageContext="thumbnail"
                />
                <Text style={[styles.compareName, { color: theme.text }]} numberOfLines={1}>{drummer.name}</Text>
                <Text style={[styles.compareBand, { color: theme.secondaryText }]} numberOfLines={1}>{drummer.band}</Text>
                <Text style={[styles.compareGenre, { color: theme.secondaryText }]}>{drummer.genre}</Text>
              </View>
            ))}
          </View>

          {/* Gear Comparison Table */}
          <View style={[styles.section, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Gear Comparison</Text>
            <Text style={[styles.comparisonHint, { color: theme.secondaryText }]}>
              Differences are highlighted in yellow
            </Text>

            <GearComparisonRow label="Drums" items={comparedDrummers} theme={theme} />
            <GearComparisonRow label="Snare" items={comparedDrummers} theme={theme} />
            <GearComparisonRow label="Cymbals" items={comparedDrummers} theme={theme} />
            <GearComparisonRow label="Hardware" items={comparedDrummers} theme={theme} />
            <GearComparisonRow label="Sticks" items={comparedDrummers} theme={theme} />
          </View>

          {/* Kit Cost Comparison */}
          <View style={[styles.section, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Kit Cost Comparison</Text>
            <View style={[styles.costComparisonContainer, isMobile && styles.costComparisonContainerMobile]}>
              {comparedDrummers.map((drummer, index) => {
                const kitCost = calculateKitCost(drummer.gear);
                return (
                  <View key={index} style={[styles.costCard, isMobile && styles.costCardMobile]}>
                    <Text style={[styles.costName, { color: theme.text }]}>{drummer.name}</Text>
                    <Text style={[styles.costPrice, { color: theme.text }]}>
                      {kitCost ? formatPrice(kitCost.totalEur, 'EUR') : 'N/A'}
                    </Text>
                    <Text style={[styles.costPriceUsd, { color: theme.secondaryText }]}>
                      {kitCost ? formatPrice(kitCost.totalUsd, 'USD') : ''}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>

          {/* Share buttons */}
          <ShareButtons
            drummerIds={selectedIds.filter(Boolean)}
            drummerNames={comparedDrummers.map(d => d.name)}
            theme={theme}
          />
        </View>
      )}

      {/* Empty state */}
      {!loading && !hasComparison && selectedIds.some(id => id !== null) && (
        <View style={[styles.section, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.emptyStateText, { color: theme.secondaryText }]}>
            Select at least 2 drummers to see the comparison
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

// Drummer Spotlight Component - Curated featured drummer on homepage (Issue #494)
function DrummerSpotlight({ drummer, theme, onSelectDrummer, onViewAllSpotlights }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  if (!drummer || !drummer.spotlight) return null;

  const { spotlight } = drummer;
  
  // Get feature reason from curated module (birthday, event, or weekly)
  const isBirthday = drummer.isBirthdayFeature;
  const featureReason = drummer.featuredReason || 'This Week';
  const labelText = isBirthday ? '🎂 BIRTHDAY SPOTLIGHT' : '⭐ DRUMMER SPOTLIGHT';
  const labelColor = isBirthday ? '#ec4899' : '#f59e0b'; // Pink for birthday, amber for regular

  return (
    <View style={[styles.spotlightContainer, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <View style={styles.spotlightHeader}>
        <Text style={[styles.spotlightLabel, { color: labelColor }]}>{labelText}</Text>
        <Text style={[styles.spotlightWeek, { color: theme.secondaryText }]}>{featureReason}</Text>
      </View>
      
      <View style={[styles.spotlightContent, isMobile && styles.spotlightContentMobile]}>
        <TouchableOpacity 
          onPress={() => onSelectDrummer(drummer.id)}
          style={[styles.spotlightImageContainer, { width: isMobile ? 100 : 140, height: isMobile ? 100 : 140 }]}
          accessibilityRole="button"
          accessibilityLabel={`View ${drummer.name}'s profile`}
        >
          <ImageWithFallback
            source={{ uri: drummer.image }}
            style={[styles.spotlightImage, isMobile && styles.spotlightImageMobile]}
            accessibilityLabel={`Photo of ${drummer.name}`}
            priority={true}
            width={isMobile ? 100 : 140}
            height={isMobile ? 100 : 140}
            imageContext="spotlight"
          />
        </TouchableOpacity>
        
        <View style={[styles.spotlightInfo, isMobile && styles.spotlightInfoMobile]}>
          <TouchableOpacity onPress={() => onSelectDrummer(drummer.id)}>
            <Text style={[styles.spotlightName, { color: theme.text }]}>{drummer.name}</Text>
          </TouchableOpacity>
          <Text style={[styles.spotlightBand, { color: theme.secondaryText }]}>{drummer.band}</Text>
          
          {/* Quick Facts */}
          <View style={styles.spotlightQuickFacts}>
            <Text style={[styles.spotlightSectionTitle, { color: theme.text }]}>Quick Facts</Text>
            {spotlight.quickFacts.map((fact, index) => (
              <View key={index} style={styles.spotlightFactRow}>
                <Text style={[styles.spotlightFactBullet, { color: '#f59e0b' }]}>•</Text>
                <Text style={[styles.spotlightFactText, { color: theme.secondaryText }]}>{fact}</Text>
              </View>
            ))}
          </View>
          
          {/* Why They're Iconic */}
          <View style={styles.spotlightIconicSection}>
            <Text style={[styles.spotlightSectionTitle, { color: theme.text }]}>Why They're Iconic</Text>
            <Text style={[styles.spotlightIconicText, { color: theme.secondaryText }]}>
              {spotlight.iconicMoment}
            </Text>
          </View>
          
          {/* Gear Highlight */}
          <View style={styles.spotlightGearSection}>
            <Text style={[styles.spotlightGearHighlight, { color: theme.text }]}>
              🥁 {spotlight.gearHighlight}
            </Text>
          </View>
          
          {/* CTA Buttons */}
          <View style={[styles.spotlightCTAs, isMobile && styles.spotlightCTAsMobile]}>
            <TouchableOpacity
              onPress={() => onSelectDrummer(drummer.id)}
              style={[styles.spotlightCTAPrimary, { backgroundColor: theme.primary }]}
              accessibilityRole="button"
            >
              <Text style={styles.spotlightCTAPrimaryText}>View Full Profile →</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onViewAllSpotlights}
              style={[styles.spotlightCTASecondary, { borderColor: theme.border }]}
              accessibilityRole="button"
            >
              <Text style={[styles.spotlightCTASecondaryText, { color: theme.text }]}>Past Spotlights</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

// Spotlights Archive Page - Shows all drummers with spotlight data
function SpotlightsArchivePage({ theme, onBack, drummers, onSelectDrummer }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  
  // Get all drummers with spotlight data
  const spotlightDrummers = getSpotlightDrummers(drummers);
  const currentIndex = getCurrentSpotlightIndex(spotlightDrummers.length);

  // Update SEO for spotlights page
  useEffect(() => {
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      document.title = 'Drummer Spotlights Archive | Metal Drummer Gear';
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
      setMeta('description', 'Explore our weekly Drummer Spotlight archive featuring legendary metal drummers, their gear, and what makes them iconic.');
      setMeta('og:title', 'Drummer Spotlights Archive | Metal Drummer Gear', true);
      setMeta('og:description', 'Explore our weekly Drummer Spotlight archive featuring legendary metal drummers.', true);
    }
  }, []);

  return (
    <ScrollView style={[styles.detailContainer, { backgroundColor: theme.background }]}>
      <View style={styles.detailContent}>
        <TouchableOpacity
          onPress={onBack}
          style={[styles.backButton, { backgroundColor: theme.card, borderColor: theme.border }]}
          accessibilityRole="button"
          accessibilityLabel="Go back to home"
        >
          <Text style={[styles.backButtonText, { color: theme.text }]}>← Back to Home</Text>
        </TouchableOpacity>

        <Text style={[styles.spotlightsArchiveTitle, { color: theme.text }]} accessibilityRole="header">
          ⭐ Drummer Spotlights
        </Text>
        <Text style={[styles.spotlightsArchiveSubtitle, { color: theme.secondaryText }]}>
          Each week we feature a legendary metal drummer. Explore our archive of past spotlights.
        </Text>

        <View style={[styles.spotlightsGrid, isMobile && styles.spotlightsGridMobile]}>
          {spotlightDrummers.map((drummer, index) => (
            <TouchableOpacity
              key={drummer.id}
              onPress={() => onSelectDrummer(drummer.id)}
              style={[
                styles.spotlightArchiveCard,
                { backgroundColor: theme.card, borderColor: theme.border },
                index === currentIndex && { borderColor: '#f59e0b', borderWidth: 2 }
              ]}
              accessibilityRole="button"
              accessibilityLabel={`View ${drummer.name}'s spotlight`}
            >
              {index === currentIndex && (
                <View style={styles.currentSpotlightBadge}>
                  <Text style={styles.currentSpotlightBadgeText}>THIS WEEK</Text>
                </View>
              )}
              <ImageWithFallback
                source={{ uri: drummer.image }}
                style={styles.spotlightArchiveImage}
                accessibilityLabel={`Photo of ${drummer.name}`}
                width={320}
                height={180}
                imageContext="gallery"
              />
              <View style={styles.spotlightArchiveInfo}>
                <Text style={[styles.spotlightArchiveName, { color: theme.text }]} numberOfLines={1}>
                  {drummer.name}
                </Text>
                <Text style={[styles.spotlightArchiveBand, { color: theme.secondaryText }]} numberOfLines={1}>
                  {drummer.band}
                </Text>
                {drummer.spotlight && (
                  <Text style={[styles.spotlightArchiveTeaser, { color: theme.secondaryText }]} numberOfLines={2}>
                    {drummer.spotlight.iconicMoment.substring(0, 80)}...
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {spotlightDrummers.length === 0 && (
          <View style={styles.noSpotlightsContainer}>
            <Text style={[styles.noSpotlightsText, { color: theme.secondaryText }]}>
              No spotlight data available yet.
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

// Gear By Budget Page - shows drummers organized by kit cost
function GearByBudgetPage({ theme, onBack, drummers, onSelectDrummer }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const [selectedTier, setSelectedTier] = useState(null);

  // Calculate kit costs and organize by tier
  const drummersByTier = useMemo(() => {
    const tiers = {
      entry: [],
      intermediate: [],
      professional: [],
      premium: [],
    };

    if (!drummers || !Array.isArray(drummers)) return tiers;
    
    drummers.forEach(drummer => {
      const kitCost = calculateKitCost(drummer.gear);
      if (kitCost && kitCost.totalUsd) {
        const tier = getBudgetTierForPrice(kitCost.totalUsd);
        if (tiers[tier]) {
          tiers[tier].push({
            ...drummer,
            kitCost,
          });
        }
      }
    });

    // Sort each tier by price (lowest first)
    Object.keys(tiers).forEach(tier => {
      tiers[tier].sort((a, b) => a.kitCost.totalUsd - b.kitCost.totalUsd);
    });

    return tiers;
  }, [drummers]);

  // Update SEO
  useEffect(() => {
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      document.title = 'Gear by Budget - Find Drum Kits in Your Price Range | MetalForge';
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
      setMeta('description', 'Find professional drum setups that fit your budget. Browse gear from entry level to premium, used by legendary metal drummers.');
      setMeta('og:title', 'Gear by Budget | MetalForge', true);
      setMeta('og:description', 'Find professional drum setups that fit your budget.', true);
    }
  }, []);

  const tierOrder = ['entry', 'intermediate', 'professional', 'premium'];
  const tiersToShow = selectedTier ? [selectedTier] : tierOrder;

  return (
    <ScrollView style={[styles.detailContainer, { backgroundColor: theme.background }]}>
      <View style={styles.detailContent}>
        <TouchableOpacity
          onPress={onBack}
          style={[styles.backButton, { backgroundColor: theme.card, borderColor: theme.border }]}
          accessibilityRole="button"
          accessibilityLabel="Go back to home"
        >
          <Text style={[styles.backButtonText, { color: theme.text }]}>← Back to Home</Text>
        </TouchableOpacity>

        <Text style={[styles.budgetPageTitle, { color: theme.text }]} accessibilityRole="header">
          💰 Gear by Budget
        </Text>
        <Text style={[styles.budgetPageSubtitle, { color: theme.secondaryText }]}>
          Find pro drum setups that fit your budget. See what legendary drummers use at every price point.
        </Text>

        {/* Tier Filter Buttons */}
        <View style={[styles.budgetTierButtons, isMobile && styles.budgetTierButtonsMobile]}>
          {tierOrder.map(tierId => {
            const tier = BUDGET_TIERS[tierId];
            const count = drummersByTier[tierId].length;
            const isSelected = selectedTier === tierId;
            return (
              <TouchableOpacity
                key={tierId}
                onPress={() => setSelectedTier(isSelected ? null : tierId)}
                style={[
                  styles.budgetTierButton,
                  { 
                    backgroundColor: isSelected ? tier.color : theme.card,
                    borderColor: tier.color,
                  }
                ]}
                accessibilityRole="button"
                accessibilityState={{ selected: isSelected }}
              >
                <Text style={styles.budgetTierButtonEmoji}>{tier.emoji}</Text>
                <Text style={[styles.budgetTierButtonLabel, { color: isSelected ? theme.text : theme.text }]}>
                  {tier.label}
                </Text>
                <Text style={[styles.budgetTierButtonRange, { color: isSelected ? 'rgba(255,255,255,0.8)' : theme.secondaryText }]}>
                  {tier.maxPrice === Infinity ? `$${tier.minPrice.toLocaleString()}+` : `$${tier.minPrice.toLocaleString()} - $${tier.maxPrice.toLocaleString()}`}
                </Text>
                <Text style={[styles.budgetTierButtonCount, { color: isSelected ? 'rgba(255,255,255,0.8)' : theme.secondaryText }]}>
                  {count} drummer{count !== 1 ? 's' : ''}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {selectedTier && (
          <TouchableOpacity
            onPress={() => setSelectedTier(null)}
            style={[styles.clearBudgetFilter, { borderColor: theme.border }]}
          >
            <Text style={[styles.clearBudgetFilterText, { color: theme.text }]}>
              Show All Tiers
            </Text>
          </TouchableOpacity>
        )}

        {/* Drummer Lists by Tier */}
        {tiersToShow.map(tierId => {
          const tier = BUDGET_TIERS[tierId];
          const tierDrummers = drummersByTier[tierId];
          if (tierDrummers.length === 0) return null;

          return (
            <View key={tierId} style={styles.budgetTierSection}>
              <View style={styles.budgetTierHeader}>
                <Text style={[styles.budgetTierSectionTitle, { color: tier.color }]}>
                  {tier.emoji} {tier.label}
                </Text>
                <Text style={[styles.budgetTierSectionRange, { color: theme.secondaryText }]}>
                  {tier.maxPrice === Infinity ? `$${tier.minPrice.toLocaleString()}+` : `$${tier.minPrice.toLocaleString()} - $${tier.maxPrice.toLocaleString()}`}
                </Text>
              </View>
              <Text style={[styles.budgetTierDescription, { color: theme.secondaryText }]}>
                {tier.description}
              </Text>
              
              <View style={[styles.budgetDrummerGrid, isMobile && styles.budgetDrummerGridMobile]}>
                {tierDrummers.map(drummer => (
                  <TouchableOpacity
                    key={drummer.id}
                    onPress={() => onSelectDrummer(drummer.id)}
                    style={[styles.budgetDrummerCard, { backgroundColor: theme.card, borderColor: theme.border }]}
                    accessibilityRole="button"
                    accessibilityLabel={`View ${drummer.name}'s gear - ${formatPrice(drummer.kitCost.totalEur, 'EUR')}`}
                  >
                    <ImageWithFallback
                      source={{ uri: drummer.image }}
                      style={styles.budgetDrummerImage}
                      accessibilityLabel={`Photo of ${drummer.name}`}
                      width={60}
                      height={60}
                      imageContext="thumbnail"
                    />
                    <View style={styles.budgetDrummerInfo}>
                      <Text style={[styles.budgetDrummerName, { color: theme.text }]} numberOfLines={1}>
                        {drummer.name}
                      </Text>
                      <Text style={[styles.budgetDrummerBand, { color: theme.secondaryText }]} numberOfLines={1}>
                        {drummer.band}
                      </Text>
                      <View style={styles.budgetDrummerCost}>
                        <Text style={[styles.budgetDrummerPrice, { color: tier.color }]}>
                          {formatPrice(drummer.kitCost.totalEur, 'EUR')}
                        </Text>
                        <Text style={[styles.budgetDrummerPriceUsd, { color: theme.secondaryText }]}>
                          ({formatPrice(drummer.kitCost.totalUsd, 'USD')})
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          );
        })}

        {tiersToShow.every(tierId => drummersByTier[tierId].length === 0) && (
          <View style={styles.noBudgetDrummers}>
            <Text style={[styles.noBudgetDrummersText, { color: theme.secondaryText }]}>
              No drummers found in this budget range.
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

// Birthday Calendar Page - Shareable evergreen content (Issue #343)
function BirthdayCalendarPage({ theme, onBack, onSelectDrummer }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const [selectedMonth, setSelectedMonth] = useState(() => getBirthdayMonthFromURL());
  const [copied, setCopied] = useState(false);
  const [isLoaded, setIsLoaded] = useState(isBirthdaysLoaded());
  
  // TBT Optimization (#537): Ensure birthdays module is loaded
  useEffect(() => {
    if (!isBirthdaysLoaded()) {
      preloadBirthdays().then(() => setIsLoaded(true));
    }
  }, []);
  
  // Get birthdays data (safe - returns empty arrays if module not loaded)
  const allBirthdays = getAllBirthdaysSorted();
  const todaysBirthdays = getTodaysBirthdays();
  const upcomingBirthdays = getUpcomingBirthdays(30);
  
  // Filter by month if selected
  const displayBirthdays = selectedMonth 
    ? getBirthdaysByMonth(selectedMonth)
    : allBirthdays;
  
  // Show loading state while module loads
  if (!isLoaded) {
    return (
      <View style={[styles.detailContainer, { backgroundColor: theme.background, justifyContent: 'center', alignItems: 'center', minHeight: 400 }]}>
        <ActivityIndicator size="large" color={theme.primary} />
        <Text style={{ color: theme.secondaryText, marginTop: 16 }}>Loading birthday calendar...</Text>
      </View>
    );
  }

  // Update SEO meta tags
  useEffect(() => {
    updateBirthdayCalendarMeta(selectedMonth, todaysBirthdays);
  }, [selectedMonth, todaysBirthdays.length]);

  // Handle month selection
  const handleMonthSelect = (month) => {
    const newMonth = selectedMonth === month ? null : month;
    setSelectedMonth(newMonth);
    updateBirthdayURL(newMonth);
  };

  // Share functionality
  const handleShare = async () => {
    const shareUrl = `https://metalforge.io/birthdays${selectedMonth ? `?month=${selectedMonth}` : ''}`;
    
    if (Platform.OS === 'web' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  const handleTwitterShare = () => {
    let text;
    if (todaysBirthdays.length > 0) {
      const names = todaysBirthdays.map(d => d.name).join(' & ');
      text = `🎂 Happy Birthday ${names}! Check out the Metal Drummer Birthday Calendar`;
    } else if (selectedMonth) {
      text = `🎂 ${MONTH_NAMES[selectedMonth - 1]} Metal Drummer Birthdays`;
    } else {
      text = '🎂 Never miss a metal drummer birthday! Check out the Metal Drummer Birthday Calendar';
    }
    const shareUrl = `https://metalforge.io/birthdays${selectedMonth ? `?month=${selectedMonth}` : ''}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}&via=MetalDrumGear`;
    Linking.openURL(twitterUrl);
  };

  return (
    <ScrollView style={[styles.detailContainer, { backgroundColor: theme.background }]}>
      <View style={styles.detailContent}>
        <TouchableOpacity
          onPress={onBack}
          style={[styles.backButton, { backgroundColor: theme.card, borderColor: theme.border }]}
          accessibilityRole="button"
          accessibilityLabel="Go back to home"
        >
          <Text style={[styles.backButtonText, { color: theme.text }]}>← Back to Home</Text>
        </TouchableOpacity>

        <Text style={[styles.birthdayCalendarTitle, { color: theme.text }]} accessibilityRole="header">
          🎂 Metal Drummer Birthday Calendar
        </Text>
        <Text style={[styles.birthdayCalendarSubtitle, { color: theme.secondaryText }]}>
          Never miss a legendary drummer's birthday! Share and celebrate with the metal community.
        </Text>

        {/* Today's Birthdays Banner */}
        {todaysBirthdays.length > 0 && (
          <View style={[styles.todayBirthdayBanner, { backgroundColor: theme.primary }]}>
            <Text style={styles.todayBirthdayEmoji}>🎉</Text>
            <View style={styles.todayBirthdayContent}>
              <Text style={styles.todayBirthdayLabel}>TODAY'S BIRTHDAY{todaysBirthdays.length > 1 ? 'S' : ''}</Text>
              {todaysBirthdays.map((drummer, index) => (
                <TouchableOpacity 
                  key={drummer.slug}
                  onPress={() => onSelectDrummer(drummer.slug)}
                  accessibilityRole="button"
                >
                  <Text style={styles.todayBirthdayName}>
                    {drummer.name} ({drummer.band}) - {calculateAge(drummer.birthYear, drummer.birthMonth, drummer.birthDay)} years old!
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.todayBirthdayEmoji}>🎉</Text>
          </View>
        )}

        {/* Share Buttons */}
        <View style={[styles.birthdayShareSection, { borderColor: theme.border }]}>
          <Text style={[styles.birthdayShareLabel, { color: theme.secondaryText }]}>
            Share this calendar:
          </Text>
          <View style={styles.birthdayShareButtons}>
            <TouchableOpacity
              onPress={handleTwitterShare}
              style={[styles.birthdayShareButton, { backgroundColor: theme.shadowColor }]}
            >
              <Text style={styles.birthdayShareButtonText}>𝕏 Tweet</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleShare}
              style={[styles.birthdayShareButton, { backgroundColor: theme.card, borderColor: theme.border, borderWidth: 1 }]}
            >
              <Text style={[styles.birthdayShareButtonText, { color: theme.text }]}>
                {copied ? '✓ Copied!' : '🔗 Copy Link'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Upcoming Birthdays */}
        {!selectedMonth && upcomingBirthdays.length > 0 && (
          <View style={[styles.birthdaySection, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={[styles.birthdaySectionTitle, { color: theme.text }]}>
              🔜 Upcoming Birthdays
            </Text>
            <View style={styles.upcomingBirthdaysList}>
              {upcomingBirthdays.slice(0, 5).map((drummer, index) => (
                <TouchableOpacity
                  key={`${drummer.slug}-${index}`}
                  onPress={() => onSelectDrummer(drummer.slug)}
                  style={[styles.upcomingBirthdayItem, { borderBottomColor: theme.border }]}
                  accessibilityRole="button"
                >
                  <View style={styles.upcomingBirthdayLeft}>
                    <Text style={[styles.upcomingBirthdayName, { color: theme.text }]}>
                      {drummer.name}
                    </Text>
                    <Text style={[styles.upcomingBirthdayBand, { color: theme.secondaryText }]}>
                      {drummer.band}
                    </Text>
                  </View>
                  <View style={styles.upcomingBirthdayRight}>
                    <Text style={[styles.upcomingBirthdayDate, { color: theme.primary }]}>
                      {formatBirthday(drummer.birthMonth, drummer.birthDay)}
                    </Text>
                    <Text style={[styles.upcomingBirthdayDays, { color: theme.secondaryText }]}>
                      {drummer.daysUntil === 0 ? 'Today!' : drummer.daysUntil === 1 ? 'Tomorrow' : `In ${drummer.daysUntil} days`}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Month Filter */}
        <View style={[styles.monthFilterSection, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.monthFilterTitle, { color: theme.text }]}>
            Filter by Month
          </Text>
          <View style={[styles.monthGrid, isMobile && styles.monthGridMobile]}>
            {MONTH_NAMES.map((monthName, index) => {
              const monthNum = index + 1;
              const monthBirthdays = getBirthdaysByMonth(monthNum);
              const isSelected = selectedMonth === monthNum;
              return (
                <TouchableOpacity
                  key={monthNum}
                  onPress={() => handleMonthSelect(monthNum)}
                  style={[
                    styles.monthButton,
                    { 
                      backgroundColor: isSelected ? theme.primary : theme.background,
                      borderColor: isSelected ? theme.primary : theme.border 
                    }
                  ]}
                  accessibilityRole="button"
                  accessibilityState={{ selected: isSelected }}
                >
                  <Text style={[styles.monthButtonText, { color: isSelected ? theme.text : theme.text }]}>
                    {monthName.substring(0, 3)}
                  </Text>
                  {monthBirthdays.length > 0 && (
                    <View style={[styles.monthBadge, { backgroundColor: isSelected ? theme.text : theme.primary }]}>
                      <Text style={[styles.monthBadgeText, { color: isSelected ? theme.primary : theme.text }]}>
                        {monthBirthdays.length}
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
          {selectedMonth && (
            <TouchableOpacity
              onPress={() => handleMonthSelect(null)}
              style={[styles.clearMonthFilter, { borderColor: theme.border }]}
            >
              <Text style={[styles.clearMonthFilterText, { color: theme.text }]}>
                Show All Months
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Birthday Cards */}
        <View style={[styles.birthdayCardsSection]}>
          <Text style={[styles.birthdaySectionTitle, { color: theme.text }]}>
            {selectedMonth ? `${MONTH_NAMES[selectedMonth - 1]} Birthdays` : 'All Birthdays'}
          </Text>
          <View style={[styles.birthdayCardsGrid, isMobile && styles.birthdayCardsGridMobile]}>
            {displayBirthdays.map((drummer) => {
              const zodiac = getZodiacSign(drummer.birthMonth, drummer.birthDay);
              const age = calculateAge(drummer.birthYear, drummer.birthMonth, drummer.birthDay, drummer.deathDate);
              
              return (
                <TouchableOpacity
                  key={drummer.slug}
                  onPress={() => onSelectDrummer(drummer.slug)}
                  style={[styles.birthdayCard, isMobile && styles.birthdayCardMobile, { backgroundColor: theme.card, borderColor: theme.border }]}
                  accessibilityRole="button"
                  accessibilityLabel={`${drummer.name}, born ${formatBirthday(drummer.birthMonth, drummer.birthDay)}`}
                >
                  <View style={styles.birthdayCardHeader}>
                    <View style={styles.birthdayCardDate}>
                      <Text style={styles.birthdayCardDay}>{drummer.birthDay}</Text>
                      <Text style={styles.birthdayCardMonth}>{MONTH_NAMES[drummer.birthMonth - 1].substring(0, 3)}</Text>
                    </View>
                    <View style={styles.birthdayCardInfo}>
                      <Text style={[styles.birthdayCardName, { color: theme.text }]} numberOfLines={2}>
                        {drummer.name}
                      </Text>
                      <Text style={[styles.birthdayCardBand, { color: theme.secondaryText }]} numberOfLines={2}>
                        {drummer.band}
                      </Text>
                      <View style={styles.birthdayCardMeta}>
                        <Text style={[styles.birthdayCardYear, { color: theme.secondaryText }]}>
                          Born {drummer.birthYear}
                        </Text>
                        <Text style={styles.birthdayCardZodiac}>
                          {zodiac.emoji}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.birthdayCardFooter}>
                    <Text style={[styles.birthdayCardAge, { color: theme.secondaryText }]}>
                      {drummer.isLiving ? `${age} years old` : `Lived ${age} years (1975-2021)`}
                    </Text>
                    <Text style={[styles.birthdayCardPlace, { color: theme.secondaryText }]} numberOfLines={2}>
                      📍 {drummer.birthPlace}
                    </Text>
                  </View>
                  {!drummer.isLiving && (
                    <View style={styles.memorialRibbon}>
                      <Text style={styles.memorialRibbonText}>In Memoriam</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {displayBirthdays.length === 0 && (
          <View style={styles.noBirthdaysContainer}>
            <Text style={[styles.noBirthdaysText, { color: theme.secondaryText }]}>
              No birthdays found for this month.
            </Text>
          </View>
        )}

        {/* Fun Stats */}
        <View style={[styles.birthdaySection, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.birthdaySectionTitle, { color: theme.text }]}>
            📊 Birthday Fun Facts
          </Text>
          <View style={styles.birthdayStats}>
            <View style={styles.birthdayStatItem}>
              <Text style={[styles.birthdayStatValue, { color: theme.primary }]}>
                {drummerBirthdays.length}
              </Text>
              <Text style={[styles.birthdayStatLabel, { color: theme.secondaryText }]}>
                Drummers
              </Text>
            </View>
            <View style={styles.birthdayStatItem}>
              <Text style={[styles.birthdayStatValue, { color: theme.primary }]}>
                {drummerBirthdays.filter(d => d.isLiving).length}
              </Text>
              <Text style={[styles.birthdayStatLabel, { color: theme.secondaryText }]}>
                Still Rocking
              </Text>
            </View>
            <View style={styles.birthdayStatItem}>
              <Text style={[styles.birthdayStatValue, { color: theme.primary }]}>
                {Math.min(...drummerBirthdays.filter(d => d.isLiving).map(d => calculateAge(d.birthYear, d.birthMonth, d.birthDay)))}
              </Text>
              <Text style={[styles.birthdayStatLabel, { color: theme.secondaryText }]}>
                Youngest Age
              </Text>
            </View>
            <View style={styles.birthdayStatItem}>
              <Text style={[styles.birthdayStatValue, { color: theme.primary }]}>
                Aug
              </Text>
              <Text style={[styles.birthdayStatLabel, { color: theme.secondaryText }]}>
                Most Popular Month
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

// Gear Finder Page - Search drummers by specific gear item (Issue #156)
function GearFinderPage({ theme, onBack, drummers, onSelectDrummer }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const [searchQuery, setSearchQuery] = useState(() => getGearFinderQueryFromURL());
  const [searchResults, setSearchResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const searchTimeoutRef = useRef(null);

  // API endpoint for gear finder
  const GEAR_FINDER_API = Platform.OS === 'web' && typeof window !== 'undefined' && window.location.hostname !== 'localhost'
    ? '/api/gear-finder'
    : 'http://localhost:3001/api/gear-finder';

  // Fetch suggestions on mount
  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const res = await fetch(`${GEAR_FINDER_API}?suggestions=true`);
        if (res.ok) {
          const data = await res.json();
          setSuggestions(data.suggestions || []);
        }
      } catch (error) {
        console.error('Failed to fetch gear suggestions:', error);
      }
    };
    fetchSuggestions();
  }, []);

  // Search for gear
  const searchGear = useCallback(async (query) => {
    if (!query || query.length < 2) {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }

    setLoading(true);
    setHasSearched(true);
    
    try {
      const res = await fetch(`${GEAR_FINDER_API}?q=${encodeURIComponent(query)}`);
      if (res.ok) {
        const data = await res.json();
        setSearchResults(data.results || []);
      }
    } catch (error) {
      console.error('Gear search failed:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  }, [GEAR_FINDER_API]);

  // Handle search input with debouncing
  const handleSearchChange = useCallback((text) => {
    setSearchQuery(text);
    updateGearFinderURL(text);
    
    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    // Debounce search
    searchTimeoutRef.current = setTimeout(() => {
      searchGear(text);
    }, 300);
  }, [searchGear]);

  // Handle suggestion click
  const handleSuggestionClick = useCallback((suggestionText) => {
    setSearchQuery(suggestionText);
    updateGearFinderURL(suggestionText);
    searchGear(suggestionText);
  }, [searchGear]);

  // Search on mount if URL has query
  useEffect(() => {
    const urlQuery = getGearFinderQueryFromURL();
    if (urlQuery) {
      searchGear(urlQuery);
    }
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  // Update SEO
  useEffect(() => {
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      const title = searchQuery 
        ? `Who Uses ${searchQuery}? - Gear Finder | MetalForge`
        : 'Gear Finder - Search Drummers by Gear | MetalForge';
      const description = searchQuery
        ? `Find all metal drummers who use ${searchQuery}. See their complete setups and where to buy.`
        : 'Search for any drum gear and find out which legendary metal drummers use it. Discover who uses your favorite cymbals, drums, and hardware.';
      
      document.title = title;
      
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
      
      setMeta('description', description);
      setMeta('og:title', title, true);
      setMeta('og:description', description, true);
      setMeta('keywords', `drum gear finder, who uses ${searchQuery || 'drums'}, metal drummer gear, ${searchQuery || 'drum equipment'} users`);
    }
  }, [searchQuery]);

  // Get category icon
  const getCategoryIcon = (category) => {
    const icons = {
      drums: '🥁',
      snare: '🪘',
      cymbals: '🔔',
      hardware: '⚙️',
      sticks: '🥢',
      heads: '⭕',
    };
    return icons[category] || '🎵';
  };

  // Get category label
  const getCategoryLabel = (category) => {
    const labels = {
      drums: 'Drums',
      snare: 'Snare',
      cymbals: 'Cymbals',
      hardware: 'Hardware',
      sticks: 'Sticks',
      heads: 'Heads',
    };
    return labels[category] || category;
  };

  return (
    <ScrollView style={[styles.detailContainer, { backgroundColor: theme.background }]}>
      <View style={styles.detailContent}>
        <TouchableOpacity
          onPress={onBack}
          style={[styles.backButton, { backgroundColor: theme.card, borderColor: theme.border }]}
          accessibilityRole="button"
          accessibilityLabel="Go back to home"
        >
          <Text style={[styles.backButtonText, { color: theme.text }]}>← Back to Home</Text>
        </TouchableOpacity>

        <Text style={[styles.gearFinderTitle, { color: theme.text }]} accessibilityRole="header">
          🔍 Gear Finder
        </Text>
        <Text style={[styles.gearFinderSubtitle, { color: theme.secondaryText }]}>
          Search for any gear and discover which metal drummers use it.
        </Text>

        {/* Search Input */}
        <View style={[styles.gearFinderSearchContainer, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <TextInput
            style={[styles.gearFinderSearchInput, { color: theme.text }]}
            placeholder="Search gear (e.g., Tama Iron Cobra, Zildjian A Custom...)"
            placeholderTextColor={theme.secondaryText}
            value={searchQuery}
            onChangeText={handleSearchChange}
            autoFocus={!getGearFinderQueryFromURL()}
            accessibilityLabel="Search for drum gear"
            // Mobile keyboard fix (Issue #469)
            inputMode="text"
            enterKeyHint="search"
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="off"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => {
                setSearchQuery('');
                setSearchResults([]);
                setHasSearched(false);
                updateGearFinderURL('');
              }}
              style={styles.gearFinderClearButton}
              accessibilityLabel="Clear search"
            >
              <Text style={[styles.gearFinderClearText, { color: theme.secondaryText }]}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Popular Searches / Suggestions */}
        {!hasSearched && suggestions.length > 0 && (
          <View style={styles.gearFinderSuggestions}>
            <Text style={[styles.gearFinderSuggestionsTitle, { color: theme.text }]}>
              🔥 Popular Searches
            </Text>
            <View style={[styles.gearFinderSuggestionsList, isMobile && styles.gearFinderSuggestionsListMobile]}>
              {suggestions.map((suggestion, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleSuggestionClick(suggestion.text)}
                  style={[styles.gearFinderSuggestionChip, { backgroundColor: theme.card, borderColor: theme.border }]}
                  accessibilityRole="button"
                  accessibilityLabel={`Search for ${suggestion.text}`}
                >
                  <Text style={[styles.gearFinderSuggestionIcon, { color: theme.secondaryText }]}>
                    {getCategoryIcon(suggestion.category)}
                  </Text>
                  <Text style={[styles.gearFinderSuggestionText, { color: theme.text }]}>
                    {suggestion.text}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Loading State */}
        {loading && (
          <View style={styles.gearFinderLoading}>
            <ActivityIndicator size="large" color={theme.text} />
            <Text style={[styles.gearFinderLoadingText, { color: theme.secondaryText }]}>
              Searching gear...
            </Text>
          </View>
        )}

        {/* Results */}
        {!loading && hasSearched && (
          <View style={styles.gearFinderResults}>
            <Text style={[styles.gearFinderResultsCount, { color: theme.secondaryText }]}>
              {searchResults.length} drummer{searchResults.length !== 1 ? 's' : ''} found using "{searchQuery}"
            </Text>

            {searchResults.length > 0 ? (
              <View style={[styles.gearFinderResultsGrid, isMobile && styles.gearFinderResultsGridMobile]}>
                {searchResults.map((result) => (
                  <TouchableOpacity
                    key={result.id}
                    onPress={() => onSelectDrummer(result.id)}
                    style={[styles.gearFinderResultCard, { backgroundColor: theme.card, borderColor: theme.border }]}
                    accessibilityRole="button"
                    accessibilityLabel={`View ${result.name}'s gear`}
                  >
                    <ImageWithFallback
                      source={{ uri: result.image }}
                      style={styles.gearFinderResultImage}
                      accessibilityLabel={`Photo of ${result.name}`}
                      width={70}
                      height={70}
                      imageContext="thumbnail"
                    />
                    <View style={styles.gearFinderResultInfo}>
                      <Text style={[styles.gearFinderResultName, { color: theme.text }]} numberOfLines={1}>
                        {result.name}
                      </Text>
                      <Text style={[styles.gearFinderResultBand, { color: theme.secondaryText }]} numberOfLines={1}>
                        {result.band}
                      </Text>
                      {result.genre && (
                        <Text style={[styles.gearFinderResultGenre, { color: theme.secondaryText }]} numberOfLines={1}>
                          {result.genre}
                        </Text>
                      )}
                      
                      {/* Matched Gear Items */}
                      <View style={styles.gearFinderMatchedGear}>
                        {result.matchedGear.slice(0, 2).map((gear, gearIndex) => (
                          <View key={gearIndex} style={[styles.gearFinderGearMatch, { backgroundColor: theme.background }]}>
                            <Text style={[styles.gearFinderGearCategory, { color: theme.secondaryText }]}>
                              {getCategoryIcon(gear.category)} {getCategoryLabel(gear.category)}
                            </Text>
                            <Text style={[styles.gearFinderGearItem, { color: theme.text }]} numberOfLines={2}>
                              {gear.item}
                            </Text>
                          </View>
                        ))}
                        {result.matchedGear.length > 2 && (
                          <Text style={[styles.gearFinderMoreGear, { color: theme.secondaryText }]}>
                            +{result.matchedGear.length - 2} more match{result.matchedGear.length > 3 ? 'es' : ''}
                          </Text>
                        )}
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <View style={styles.gearFinderNoResults}>
                <Text style={[styles.gearFinderNoResultsEmoji]}>🔍</Text>
                <Text style={[styles.gearFinderNoResultsText, { color: theme.secondaryText }]}>
                  No drummers found using "{searchQuery}"
                </Text>
                <Text style={[styles.gearFinderNoResultsHint, { color: theme.secondaryText }]}>
                  Try a different search term or browse the suggestions above.
                </Text>
              </View>
            )}
          </View>
        )}

        {/* SEO Content */}
        {!hasSearched && (
          <View style={[styles.gearFinderSeoContent, { borderColor: theme.border }]}>
            <Text style={[styles.gearFinderSeoTitle, { color: theme.text }]}>
              Find Your Favorite Gear
            </Text>
            <Text style={[styles.gearFinderSeoText, { color: theme.secondaryText }]}>
              Ever wondered which professional metal drummers use the same gear as you? Or looking to find out who plays those Zildjian A Custom cymbals you've been eyeing? 
              {'\n\n'}
              Our Gear Finder lets you search for any drum equipment and instantly see which legendary drummers use it in their setups. Whether it's Tama Starclassic drums, Pearl Demon Drive pedals, or Meinl Byzance cymbals — discover who's behind the sound.
              {'\n\n'}
              Search by brand, model, or gear type to find your drummer match!
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

// ==========================================
// KIT BUILDER PAGE - Interactive Drum Kit Configurator (Issue #341)
// ==========================================

// Famous drummer preset kits - "Build Like The Pros"
const PRESET_KITS = [
  {
    id: 'lars-ulrich',
    drummer: 'Lars Ulrich',
    band: 'Metallica',
    emoji: '⚡',
    kit: {
      drums: 'tama-starclassic-maple',
      snare: 'tama-lars-ulrich',
      cymbals: 'zildjian-a-custom',
      hardware: 'tama-iron-cobra',
      sticks: 'ahead-lars',
    },
  },
  {
    id: 'joey-jordison',
    drummer: 'Joey Jordison',
    band: 'Slipknot',
    emoji: '🎭',
    kit: {
      drums: 'pearl-reference-series',
      snare: 'pearl-joey',
      cymbals: 'paiste-rude',
      hardware: 'pearl-demon-drive',
      sticks: 'promark-joey',
    },
  },
  {
    id: 'danny-carey',
    drummer: 'Danny Carey',
    band: 'Tool',
    emoji: '👁️',
    kit: {
      drums: 'sonor-sq2',
      snare: 'sonor-danny',
      cymbals: 'paiste-signature',
      hardware: 'sonor-giant',
      sticks: 'vicfirth-carey',
    },
  },
  {
    id: 'tomas-haake',
    drummer: 'Tomas Haake',
    band: 'Meshuggah',
    emoji: '🔧',
    kit: {
      drums: 'sonor-sq2',
      snare: 'sonor-haake',
      cymbals: 'sabian-hhx',
      hardware: 'tama-speed-cobra',
      sticks: 'vicfirth-haake',
    },
  },
  {
    id: 'george-kollias',
    drummer: 'George Kollias',
    band: 'Nile',
    emoji: '🔥',
    kit: {
      drums: 'pearl-masterworks',
      snare: 'pearl-kollias',
      cymbals: 'zildjian-a-custom',
      hardware: 'pearl-demon-drive',
      sticks: 'vicfirth-kollias',
    },
  },
  {
    id: 'dave-lombardo',
    drummer: 'Dave Lombardo',
    band: 'Slayer',
    emoji: '💀',
    kit: {
      drums: 'tama-starclassic-maple',
      snare: 'tama-slp',
      cymbals: 'paiste-rude',
      hardware: 'tama-iron-cobra',
      sticks: 'promark-lombardo',
    },
  },
  {
    id: 'mike-portnoy',
    drummer: 'Mike Portnoy',
    band: 'Dream Theater',
    emoji: '🎵',
    kit: {
      drums: 'tama-starclassic-maple',
      snare: 'tama-portnoy',
      cymbals: 'sabian-hhx',
      hardware: 'tama-iron-cobra',
      sticks: 'promark-portnoy',
    },
  },
  {
    id: 'jay-weinberg',
    drummer: 'Jay Weinberg',
    band: 'Slipknot',
    emoji: '🔊',
    kit: {
      drums: 'sjc-custom',
      snare: 'sjc-crucible',
      cymbals: 'zildjian-k-custom',
      hardware: 'dw-9000',
      sticks: 'vater-weinberg',
    },
  },
];

// Calculate preset kit total price
const getPresetKitPrice = (preset) => {
  let total = 0;
  Object.entries(preset.kit).forEach(([category, itemId]) => {
    const item = KIT_BUILDER_CATALOG[category]?.find(i => i.id === itemId);
    if (item) total += item.price;
  });
  return total;
};

// Helper to get Thomann link for kit builder items
const getKitBuilderThomannLink = (item, category) => {
  return getThomannLink(item.name, category || 'kit-builder');
};

// Gear catalog data for kit builder - extracted from real drummer setups
const KIT_BUILDER_CATALOG = {
  drums: [
    { id: 'tama-starclassic-maple', name: 'Tama Starclassic Maple', brand: 'Tama', price: 3500, tier: 'pro', usedBy: ['Lars Ulrich', 'Dave Lombardo', 'Charlie Benante'] },
    { id: 'tama-starclassic-bubinga', name: 'Tama Starclassic Bubinga', brand: 'Tama', price: 4200, tier: 'pro', usedBy: ['Eloy Casagrande'] },
    { id: 'pearl-reference-pure', name: 'Pearl Reference Pure', brand: 'Pearl', price: 3500, tier: 'pro', usedBy: ['Gene Hoglan'] },
    { id: 'pearl-reference-series', name: 'Pearl Reference Series', brand: 'Pearl', price: 3200, tier: 'pro', usedBy: ['Joey Jordison', 'Ray Luzier'] },
    { id: 'pearl-masterworks', name: 'Pearl Masterworks Stadium Exotic', brand: 'Pearl', price: 4800, tier: 'pro', usedBy: ['George Kollias'] },
    { id: 'pearl-masters', name: 'Pearl Masters Premium Maple', brand: 'Pearl', price: 3200, tier: 'pro', usedBy: ['Matt Halpern'] },
    { id: 'sonor-sq2', name: 'Sonor SQ2 Heavy Beech', brand: 'Sonor', price: 5500, tier: 'pro', usedBy: ['Tomas Haake', 'Danny Carey'] },
    { id: 'dw-collectors', name: "DW Collector's Series Maple", brand: 'DW', price: 5000, tier: 'pro', usedBy: ['Brann Dailor'] },
    { id: 'mapex-saturn', name: 'Mapex Saturn V MH Exotic', brand: 'Mapex', price: 2600, tier: 'mid', usedBy: ['Chris Adler'] },
    { id: 'ddrum-vinnie', name: 'ddrum Vinnie Paul Signature', brand: 'ddrum', price: 2800, tier: 'mid', usedBy: ['Vinnie Paul'] },
    { id: 'sjc-custom', name: 'SJC Custom Drums', brand: 'SJC', price: 3500, tier: 'pro', usedBy: ['Jay Weinberg'] },
    { id: 'ocdp-custom', name: 'OCDP Custom Type 5 Acrylic', brand: 'OCDP', price: 3500, tier: 'pro', usedBy: ['John Otto'] },
  ],
  snare: [
    { id: 'tama-lars-ulrich', name: 'Tama LU1465 Lars Ulrich Signature 14x6.5"', brand: 'Tama', price: 650, tier: 'pro', usedBy: ['Lars Ulrich'] },
    { id: 'tama-slp', name: 'Tama S.L.P. 14x6.5" G-Maple', brand: 'Tama', price: 450, tier: 'mid', usedBy: ['Dave Lombardo'] },
    { id: 'tama-bell-brass', name: 'Tama Bell Brass 14x5.5"', brand: 'Tama', price: 800, tier: 'pro', usedBy: ['Eloy Casagrande'] },
    { id: 'tama-charlie', name: 'Tama Charlie Benante Signature 14x6.5"', brand: 'Tama', price: 550, tier: 'mid', usedBy: ['Charlie Benante'] },
    { id: 'tama-portnoy', name: 'Tama Mike Portnoy Signature Melody Master', brand: 'Tama', price: 600, tier: 'mid', usedBy: ['Mike Portnoy'] },
    { id: 'pearl-joey', name: 'Pearl Joey Jordison Signature 13x6.5"', brand: 'Pearl', price: 480, tier: 'mid', usedBy: ['Joey Jordison'] },
    { id: 'pearl-kollias', name: 'Pearl George Kollias Signature 14x6.5"', brand: 'Pearl', price: 520, tier: 'mid', usedBy: ['George Kollias'] },
    { id: 'pearl-reference', name: 'Pearl Reference 14x6.5" Brass', brand: 'Pearl', price: 550, tier: 'mid', usedBy: ['Gene Hoglan', 'Ray Luzier'] },
    { id: 'sonor-haake', name: 'Sonor Tomas Haake Signature 14x6.5"', brand: 'Sonor', price: 700, tier: 'pro', usedBy: ['Tomas Haake'] },
    { id: 'sonor-danny', name: 'Sonor Danny Carey Signature 14x8" Bronze', brand: 'Sonor', price: 750, tier: 'pro', usedBy: ['Danny Carey'] },
    { id: 'sjc-crucible', name: 'SJC "The Crucible" 14x6.5" 48-ply Brass', brand: 'SJC', price: 600, tier: 'mid', usedBy: ['Jay Weinberg'] },
    { id: 'ddrum-vinnie-snare', name: 'ddrum Vinnie Paul Signature 14x8"', brand: 'ddrum', price: 400, tier: 'mid', usedBy: ['Vinnie Paul'] },
    { id: 'ocdp-vented', name: 'OCDP 14x6.5" 40-ply Vented', brand: 'OCDP', price: 450, tier: 'mid', usedBy: ['John Otto'] },
  ],
  cymbals: [
    { id: 'zildjian-a-custom', name: 'Zildjian A Custom Series', brand: 'Zildjian', price: 2200, tier: 'pro', usedBy: ['Lars Ulrich', 'George Kollias', 'John Otto'] },
    { id: 'zildjian-k-custom', name: 'Zildjian K Custom Series', brand: 'Zildjian', price: 2500, tier: 'pro', usedBy: ['Jay Weinberg'] },
    { id: 'paiste-rude', name: 'Paiste RUDE Series', brand: 'Paiste', price: 2000, tier: 'pro', usedBy: ['Joey Jordison', 'Dave Lombardo', 'Charlie Benante'] },
    { id: 'paiste-2002', name: 'Paiste 2002 Series', brand: 'Paiste', price: 2000, tier: 'pro', usedBy: ['Eloy Casagrande'] },
    { id: 'paiste-signature', name: 'Paiste Signature Series', brand: 'Paiste', price: 2800, tier: 'pro', usedBy: ['Danny Carey'] },
    { id: 'sabian-hhx', name: 'Sabian HHX Series', brand: 'Sabian', price: 2200, tier: 'pro', usedBy: ['Tomas Haake', 'Mike Portnoy'] },
    { id: 'sabian-aax', name: 'Sabian AAX Series', brand: 'Sabian', price: 1800, tier: 'mid', usedBy: ['Gene Hoglan', 'Ray Luzier', 'Vinnie Paul'] },
    { id: 'meinl-byzance', name: 'Meinl Byzance Series', brand: 'Meinl', price: 2400, tier: 'pro', usedBy: ['Mario Duplantier', 'Brann Dailor', 'Chris Adler', 'Matt Halpern'] },
  ],
  hardware: [
    { id: 'tama-iron-cobra', name: 'Tama Iron Cobra 900 Double Pedal', brand: 'Tama', price: 450, tier: 'pro', usedBy: ['Lars Ulrich', 'Dave Lombardo', 'Charlie Benante'] },
    { id: 'tama-speed-cobra', name: 'Tama Speed Cobra 910 Double Pedal', brand: 'Tama', price: 500, tier: 'pro', usedBy: ['Tomas Haake'] },
    { id: 'pearl-demon-drive', name: 'Pearl Demon Drive Double Pedal', brand: 'Pearl', price: 550, tier: 'pro', usedBy: ['Joey Jordison', 'Gene Hoglan', 'George Kollias'] },
    { id: 'pearl-eliminator', name: 'Pearl Eliminator Double Pedal', brand: 'Pearl', price: 400, tier: 'mid', usedBy: ['Matt Halpern'] },
    { id: 'dw-9000', name: 'DW 9000 Series Double Pedal', brand: 'DW', price: 700, tier: 'pro', usedBy: ['Jay Weinberg', 'Brann Dailor'] },
    { id: 'sonor-giant', name: 'Sonor Giant Step Twin Effect Double Pedal', brand: 'Sonor', price: 650, tier: 'pro', usedBy: ['Danny Carey'] },
    { id: 'mapex-falcon', name: 'Mapex Falcon Double Pedal', brand: 'Mapex', price: 450, tier: 'mid', usedBy: ['Chris Adler'] },
  ],
  sticks: [
    { id: 'ahead-lars', name: 'Ahead Lars Ulrich Signature', brand: 'Ahead', price: 45, tier: 'mid', usedBy: ['Lars Ulrich'] },
    { id: 'promark-joey', name: 'Promark Joey Jordison Signature TX515W', brand: 'Promark', price: 15, tier: 'budget', usedBy: ['Joey Jordison'] },
    { id: 'promark-lombardo', name: 'Promark Dave Lombardo Signature 2Bx', brand: 'Promark', price: 15, tier: 'budget', usedBy: ['Dave Lombardo'] },
    { id: 'promark-portnoy', name: 'Promark Mike Portnoy Signature TX420N', brand: 'Promark', price: 15, tier: 'budget', usedBy: ['Mike Portnoy'] },
    { id: 'promark-casagrande', name: 'Promark Eloy Casagrande Signature', brand: 'Promark', price: 15, tier: 'budget', usedBy: ['Eloy Casagrande'] },
    { id: 'vicfirth-kollias', name: 'Vic Firth George Kollias Signature SGK', brand: 'Vic Firth', price: 15, tier: 'budget', usedBy: ['George Kollias'] },
    { id: 'vicfirth-haake', name: 'Vic Firth Tomas Haake Signature', brand: 'Vic Firth', price: 15, tier: 'budget', usedBy: ['Tomas Haake'] },
    { id: 'vicfirth-carey', name: 'Vic Firth Danny Carey Signature', brand: 'Vic Firth', price: 15, tier: 'budget', usedBy: ['Danny Carey'] },
    { id: 'vicfirth-benante', name: 'Vic Firth Charlie Benante Signature', brand: 'Vic Firth', price: 15, tier: 'budget', usedBy: ['Charlie Benante'] },
    { id: 'vater-weinberg', name: 'Vater Jay Weinberg 908 Signature', brand: 'Vater', price: 15, tier: 'budget', usedBy: ['Jay Weinberg'] },
    { id: 'wincent-haake', name: 'Wincent Tomas Haake Signature', brand: 'Wincent', price: 18, tier: 'budget', usedBy: ['Tomas Haake'] },
  ],
};

// Category icons and labels
const KIT_CATEGORIES = [
  { key: 'drums', label: 'Shell Pack', icon: '🥁', description: 'Bass drum, toms & rack' },
  { key: 'snare', label: 'Snare Drum', icon: '🎯', description: 'The heart of your sound' },
  { key: 'cymbals', label: 'Cymbals', icon: '🔔', description: 'Hi-hats, crashes & rides' },
  { key: 'hardware', label: 'Hardware', icon: '⚙️', description: 'Pedals & throne' },
  { key: 'sticks', label: 'Sticks', icon: '🪵', description: 'Your connection to the kit' },
];

function KitBuilderPage({ theme, onBack, drummers, onSelectDrummer }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  
  // Kit state - initialize from URL params
  const [kit, setKit] = useState(() => {
    const urlKit = getKitFromURL();
    return urlKit || {
      drums: null,
      snare: null,
      cymbals: null,
      hardware: null,
      sticks: null,
      kitName: '',
    };
  });
  
  const [activeCategory, setActiveCategory] = useState('drums');
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);

  // Calculate total kit cost
  const calculateTotal = useCallback(() => {
    let total = 0;
    KIT_CATEGORIES.forEach(cat => {
      const selectedId = kit[cat.key];
      if (selectedId) {
        const item = KIT_BUILDER_CATALOG[cat.key].find(i => i.id === selectedId);
        if (item) total += item.price;
      }
    });
    return total;
  }, [kit]);

  const totalCost = calculateTotal();

  // Update URL when kit changes
  useEffect(() => {
    const kitForUrl = {};
    if (kit.drums) kitForUrl.drums = kit.drums;
    if (kit.snare) kitForUrl.snare = kit.snare;
    if (kit.cymbals) kitForUrl.cymbals = kit.cymbals;
    if (kit.hardware) kitForUrl.hardware = kit.hardware;
    if (kit.sticks) kitForUrl.sticks = kit.sticks;
    if (kit.kitName) kitForUrl.kitName = kit.kitName;
    updateKitURL(kitForUrl);
    updateKitBuilderMeta(kitForUrl, totalCost);
  }, [kit, totalCost]);

  // Find drummers who use similar gear
  const findSimilarDrummers = useCallback(() => {
    const selectedGear = [];
    KIT_CATEGORIES.forEach(cat => {
      const selectedId = kit[cat.key];
      if (selectedId) {
        const item = KIT_BUILDER_CATALOG[cat.key].find(i => i.id === selectedId);
        if (item) selectedGear.push(...item.usedBy);
      }
    });
    
    // Count how many items each drummer shares
    const drummerCounts = {};
    selectedGear.forEach(name => {
      drummerCounts[name] = (drummerCounts[name] || 0) + 1;
    });
    
    // Sort by count and return top matches
    return Object.entries(drummerCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({
        name,
        matchCount: count,
        drummer: drummers.find(d => d.name === name),
      }))
      .filter(m => m.drummer);
  }, [kit, drummers]);

  const similarDrummers = findSimilarDrummers();

  // Handle gear selection
  const handleSelectGear = useCallback((category, itemId) => {
    setKit(prev => ({
      ...prev,
      [category]: prev[category] === itemId ? null : itemId,
    }));
    // Track event
    if (Platform.OS === 'web' && typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'kit_builder_select', {
        category,
        item_id: itemId,
      });
    }
  }, []);

  // Handle kit name change
  const handleKitNameChange = useCallback((name) => {
    setKit(prev => ({ ...prev, kitName: name }));
  }, []);

  // Clear all selections
  const handleClearKit = useCallback(() => {
    setKit({
      drums: null,
      snare: null,
      cymbals: null,
      hardware: null,
      sticks: null,
      kitName: '',
    });
  }, []);

  // Copy share link
  const handleCopyLink = useCallback(() => {
    if (Platform.OS === 'web' && typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      // Track event
      if (window.gtag) {
        window.gtag('event', 'kit_builder_share', {
          method: 'copy_link',
          total_cost: totalCost,
        });
      }
    }
  }, [totalCost]);

  // Share to Twitter
  const handleShareTwitter = useCallback(() => {
    const kitName = kit.kitName || 'My Metal Kit';
    const text = `Check out my custom drum kit build "${kitName}" - €${totalCost.toLocaleString()} total! Build yours at MetalForge.io 🥁🔥`;
    const url = encodeURIComponent(window.location.href);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`;
    if (Platform.OS === 'web') {
      window.open(twitterUrl, '_blank');
      if (window.gtag) {
        window.gtag('event', 'kit_builder_share', {
          method: 'twitter',
          total_cost: totalCost,
        });
      }
    }
  }, [kit.kitName, totalCost]);

  // Get selected item info
  const getSelectedItem = useCallback((category) => {
    const selectedId = kit[category];
    if (!selectedId) return null;
    return KIT_BUILDER_CATALOG[category].find(i => i.id === selectedId);
  }, [kit]);

  // Load a preset kit from a famous drummer
  const loadPresetKit = useCallback((preset) => {
    setKit({
      ...preset.kit,
      kitName: `${preset.drummer}'s ${preset.band} Kit`,
    });
    // Track event
    if (Platform.OS === 'web' && typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'kit_builder_preset_load', {
        preset_id: preset.id,
        drummer: preset.drummer,
      });
    }
  }, []);

  // Track affiliate click
  const handleAffiliateClick = useCallback((item, type) => {
    if (Platform.OS === 'web' && typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'kit_builder_affiliate_click', {
        item_id: item.id,
        item_name: item.name,
        click_type: type,
      });
    }
  }, []);

  // Find currently active preset (if any)
  const activePreset = useMemo(() => {
    return PRESET_KITS.find(p => 
      p.kit.drums === kit.drums &&
      p.kit.snare === kit.snare &&
      p.kit.cymbals === kit.cymbals &&
      p.kit.hardware === kit.hardware &&
      p.kit.sticks === kit.sticks
    );
  }, [kit]);

  // Count selected items
  const selectedCount = KIT_CATEGORIES.filter(cat => kit[cat.key]).length;

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.contentContainer, isMobile && styles.contentContainerMobile]}>
        {/* Header */}
        <View style={styles.kitBuilderHeader}>
          <TouchableOpacity 
            onPress={onBack} 
            style={styles.backButton}
            accessibilityRole="button"
            accessibilityLabel="Back"
          >
            <Text style={[styles.backButtonText, { color: theme.text }]}>← Back</Text>
          </TouchableOpacity>
          <View style={styles.kitBuilderTitleSection}>
            <Text style={[styles.kitBuilderTitle, { color: theme.text }]}>
              🥁 Drum Kit Builder
            </Text>
            <Text style={[styles.kitBuilderSubtitle, { color: theme.secondaryText }]}>
              Build your dream metal kit with gear from legendary drummers
            </Text>
          </View>
        </View>

        {/* Kit Name Input */}
        <View style={[styles.kitNameSection, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.kitNameLabel, { color: theme.secondaryText }]}>Kit Name (optional)</Text>
          <TextInput
            style={[styles.kitNameInput, { color: theme.text, borderColor: theme.border, backgroundColor: theme.background }]}
            placeholder="My Metal Beast..."
            placeholderTextColor={theme.secondaryText}
            value={kit.kitName}
            onChangeText={handleKitNameChange}
            maxLength={40}
          />
        </View>

        {/* Build Like The Pros - Preset Kits Section */}
        <View style={[styles.presetKitsSection, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <View style={styles.presetKitsHeader}>
            <Text style={[styles.presetKitsTitle, { color: theme.text }]}>
              ⭐ Build Like The Pros
            </Text>
            <Text style={[styles.presetKitsSubtitle, { color: theme.secondaryText }]}>
              Start with a legendary drummer's setup
            </Text>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.presetKitsScroll}
            contentContainerStyle={styles.presetKitsScrollContent}
          >
            {PRESET_KITS.map(preset => {
              const presetPrice = getPresetKitPrice(preset);
              const isActive = activePreset?.id === preset.id;
              return (
                <TouchableOpacity
                  key={preset.id}
                  style={[
                    styles.presetKitCard,
                    { backgroundColor: theme.background, borderColor: isActive ? theme.primary : theme.border },
                    isActive && styles.presetKitCardActive,
                  ]}
                  onPress={() => loadPresetKit(preset)}
                  accessibilityRole="button"
                  accessibilityLabel={`Load ${preset.drummer}'s kit preset`}
                >
                  {isActive && (
                    <View style={styles.presetKitActiveBadge}>
                      <Text style={styles.presetKitActiveBadgeText}>✓</Text>
                    </View>
                  )}
                  <Text style={styles.presetKitEmoji}>{preset.emoji}</Text>
                  <Text style={[styles.presetKitDrummer, { color: theme.text }]} numberOfLines={1}>
                    {preset.drummer}
                  </Text>
                  <Text style={[styles.presetKitBand, { color: theme.secondaryText }]} numberOfLines={1}>
                    {preset.band}
                  </Text>
                  <Text style={styles.presetKitPrice}>
                    €{presetPrice.toLocaleString()}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Main Content - Two Column Layout on Desktop */}
        <View style={[styles.kitBuilderContent, !isMobile && styles.kitBuilderContentDesktop]}>
          {/* Left Panel - Category Selection & Gear Grid */}
          <View style={[styles.kitBuilderLeftPanel, !isMobile && styles.kitBuilderLeftPanelDesktop]}>
            {/* Category Tabs */}
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.categoryTabs}
              contentContainerStyle={styles.categoryTabsContent}
            >
              {KIT_CATEGORIES.map(cat => {
                const isSelected = activeCategory === cat.key;
                const hasGear = !!kit[cat.key];
                return (
                  <TouchableOpacity
                    key={cat.key}
                    style={[
                      styles.categoryTab,
                      { backgroundColor: isSelected ? theme.text : theme.card, borderColor: theme.border },
                      hasGear && !isSelected && styles.categoryTabHasGear,
                    ]}
                    onPress={() => setActiveCategory(cat.key)}
                    accessibilityRole="button"
                    accessibilityLabel={cat.label}
                  >
                    <Text style={styles.categoryTabIcon}>{cat.icon}</Text>
                    <Text style={[
                      styles.categoryTabLabel,
                      { color: isSelected ? theme.background : theme.text }
                    ]}>
                      {cat.label}
                    </Text>
                    {hasGear && (
                      <View style={styles.categoryTabCheck}>
                        <Text style={styles.categoryTabCheckIcon}>✓</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* Category Description */}
            <View style={[styles.categoryDescription, { backgroundColor: theme.card, borderColor: theme.border }]}>
              <Text style={[styles.categoryDescriptionText, { color: theme.secondaryText }]}>
                {KIT_CATEGORIES.find(c => c.key === activeCategory)?.description}
              </Text>
            </View>

            {/* Gear Grid */}
            <View style={styles.gearGrid}>
              {KIT_BUILDER_CATALOG[activeCategory].map(item => {
                const isSelected = kit[activeCategory] === item.id;
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.gearCard,
                      { backgroundColor: theme.card, borderColor: isSelected ? theme.primary : theme.border },
                      isSelected && styles.gearCardSelected,
                      isMobile && styles.gearCardMobile,
                    ]}
                    onPress={() => handleSelectGear(activeCategory, item.id)}
                  >
                    <View style={styles.gearCardHeader}>
                      <Text style={[styles.gearCardBrand, { color: theme.secondaryText }]}>
                        {item.brand}
                      </Text>
                      {isSelected && (
                        <View style={styles.gearCardSelectedBadge}>
                          <Text style={styles.gearCardSelectedBadgeText}>✓</Text>
                        </View>
                      )}
                    </View>
                    <Text style={[styles.gearCardName, { color: theme.text }]} numberOfLines={2}>
                      {item.name}
                    </Text>
                    <Text style={[styles.gearCardPrice, { color: theme.primary }]}>
                      €{item.price.toLocaleString()}
                    </Text>
                    <View style={styles.gearCardUsedBy}>
                      <Text style={[styles.gearCardUsedByLabel, { color: theme.secondaryText }]}>
                        Used by:
                      </Text>
                      <Text style={[styles.gearCardUsedByNames, { color: theme.secondaryText }]} numberOfLines={1}>
                        {item.usedBy.slice(0, 2).join(', ')}{item.usedBy.length > 2 ? '...' : ''}
                      </Text>
                    </View>
                    {/* Action Buttons */}
                    <View style={styles.gearCardButtons}>
                      <TouchableOpacity
                        style={[
                          styles.gearCardButton, 
                          isSelected ? styles.gearCardButtonRemove : styles.gearCardButtonAddToKit
                        ]}
                        onPress={() => handleSelectGear(activeCategory, item.id)}
                        accessibilityRole="button"
                        accessibilityLabel={isSelected ? `Remove ${item.name} from kit` : `Add ${item.name} to kit`}
                      >
                        <Text style={styles.gearCardButtonAddToKitText}>
                          {isSelected ? '✕ Remove' : '+ Add to Kit'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    {/* Affiliate Buttons */}
                    <View style={styles.gearCardButtons}>
                      <TouchableOpacity
                        style={[styles.gearCardButton, styles.gearCardButtonDetails, { borderColor: theme.border }]}
                        onPress={() => {
                          handleAffiliateClick(item, 'details');
                          // Navigate to gear category page
                        }}
                        accessibilityRole="button"
                        accessibilityLabel={`View ${item.name} details`}
                      >
                        <Text style={[styles.gearCardButtonText, { color: theme.text }]}>Details</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.gearCardButton, styles.gearCardButtonBuy]}
                        onPress={() => {
                          handleAffiliateClick(item, 'buy');
                          if (Platform.OS === 'web') {
                            window.open(getKitBuilderThomannLink(item, activeCategory), '_blank');
                          }
                        }}
                        accessibilityRole="link"
                        accessibilityLabel={`Buy ${item.name} at Thomann`}
                      >
                        <Text style={styles.gearCardButtonBuyText}>🛒 Buy</Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Right Panel - Kit Summary */}
          <View style={[styles.kitBuilderRightPanel, !isMobile && styles.kitBuilderRightPanelDesktop]}>
            <View style={[styles.kitSummary, { backgroundColor: theme.card, borderColor: theme.border }]}>
              <Text style={[styles.kitSummaryTitle, { color: theme.text }]}>
                {kit.kitName || 'Your Kit'} {selectedCount > 0 && `(${selectedCount}/5)`}
              </Text>

              {/* Selected Items */}
              <View style={styles.kitSummaryItems}>
                {KIT_CATEGORIES.map(cat => {
                  const item = getSelectedItem(cat.key);
                  return (
                    <View key={cat.key} style={[styles.kitSummaryItem, { borderColor: theme.border }]}>
                      <View style={styles.kitSummaryItemLeft}>
                        <Text style={styles.kitSummaryItemIcon}>{cat.icon}</Text>
                        <View style={styles.kitSummaryItemInfo}>
                          <Text style={[styles.kitSummaryItemCategory, { color: theme.secondaryText }]}>
                            {cat.label}
                          </Text>
                          <Text style={[styles.kitSummaryItemName, { color: item ? theme.text : theme.secondaryText }]} numberOfLines={1}>
                            {item ? item.name : 'Not selected'}
                          </Text>
                        </View>
                      </View>
                      {item && (
                        <View style={styles.kitSummaryItemRight}>
                          <Text style={[styles.kitSummaryItemPrice, { color: theme.primary }]}>
                            €{item.price.toLocaleString()}
                          </Text>
                          <TouchableOpacity
                            style={styles.kitSummaryBuyLink}
                            onPress={() => {
                              handleAffiliateClick(item, 'summary_buy');
                              if (Platform.OS === 'web') {
                                window.open(getKitBuilderThomannLink(item, cat.key), '_blank');
                              }
                            }}
                            accessibilityRole="link"
                            accessibilityLabel={`Buy ${item.name} at Thomann`}
                          >
                            <Text style={styles.kitSummaryBuyLinkText}>🛒</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={styles.kitSummaryRemoveLink}
                            onPress={() => handleSelectGear(cat.key, item.id)}
                            accessibilityRole="button"
                            accessibilityLabel={`Remove ${item.name} from kit`}
                          >
                            <Text style={styles.kitSummaryRemoveLinkText}>✕</Text>
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>
                  );
                })}
              </View>

              {/* Total */}
              <View style={[styles.kitSummaryTotal, { borderColor: theme.border }]}>
                <Text style={[styles.kitSummaryTotalLabel, { color: theme.text }]}>
                  Estimated Total
                </Text>
                <Text style={[styles.kitSummaryTotalPrice, { color: theme.primary }]}>
                  €{totalCost.toLocaleString()}
                </Text>
              </View>

              {/* Similar Drummers */}
              {similarDrummers.length > 0 && (
                <View style={styles.kitSimilarDrummers}>
                  <Text style={[styles.kitSimilarTitle, { color: theme.text }]}>
                    🎯 Drummers with Similar Gear
                  </Text>
                  {similarDrummers.map(match => (
                    <TouchableOpacity
                      key={match.name}
                      style={[styles.kitSimilarDrummer, { borderColor: theme.border }]}
                      onPress={() => onSelectDrummer(match.drummer.id)}
                    >
                      {match.drummer.image && (
                        <Image
                          source={{ uri: match.drummer.image }}
                          style={styles.kitSimilarDrummerImage}
                        />
                      )}
                      <View style={styles.kitSimilarDrummerInfo}>
                        <Text style={[styles.kitSimilarDrummerName, { color: theme.text }]}>
                          {match.name}
                        </Text>
                        <Text style={[styles.kitSimilarDrummerMatch, { color: theme.secondaryText }]}>
                          {match.matchCount} item{match.matchCount > 1 ? 's' : ''} in common
                        </Text>
                      </View>
                      <Text style={[styles.kitSimilarDrummerArrow, { color: theme.secondaryText }]}>→</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              {/* Action Buttons */}
              <View style={styles.kitSummaryActions}>
                <TouchableOpacity
                  style={[styles.kitShareButton, selectedCount === 0 && styles.kitShareButtonDisabled]}
                  onPress={() => setShowShareModal(true)}
                  disabled={selectedCount === 0}
                  accessibilityRole="button"
                  accessibilityLabel="Share Kit"
                >
                  <Text style={styles.kitShareButtonText}>📤 Share Kit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.kitClearButton, { borderColor: theme.border }]}
                  onPress={handleClearKit}
                  accessibilityRole="button"
                  accessibilityLabel="Clear"
                >
                  <Text style={[styles.kitClearButtonText, { color: theme.secondaryText }]}>🗑️ Clear</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Share Modal */}
        {showShareModal && (
          <View style={styles.shareModalOverlay}>
            <View style={[styles.shareModal, { backgroundColor: theme.card, borderColor: theme.border }]}>
              <Text style={[styles.shareModalTitle, { color: theme.text }]}>Share Your Kit</Text>
              
              <View style={styles.shareModalContent}>
                <Text style={[styles.shareModalLabel, { color: theme.secondaryText }]}>Share Link</Text>
                <View style={[styles.shareModalLinkBox, { backgroundColor: theme.background, borderColor: theme.border }]}>
                  <Text style={[styles.shareModalLink, { color: theme.text }]} numberOfLines={1}>
                    {Platform.OS === 'web' ? window.location.href : 'metalforge.io/kit-builder'}
                  </Text>
                </View>
                
                <View style={styles.shareModalButtons}>
                  <TouchableOpacity 
                    style={styles.shareModalCopyButton} 
                    onPress={handleCopyLink}
                    accessibilityRole="button"
                    accessibilityLabel="Copy Link"
                  >
                    <Text style={styles.shareModalCopyButtonText}>
                      {copied ? '✓ Copied!' : '📋 Copy Link'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.shareModalTwitterButton} 
                    onPress={handleShareTwitter}
                    accessibilityRole="button"
                    accessibilityLabel="Tweet"
                  >
                    <Text style={styles.shareModalTwitterButtonText}>🐦 Tweet</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                style={[styles.shareModalClose, { borderColor: theme.border }]}
                onPress={() => setShowShareModal(false)}
                accessibilityRole="button"
                accessibilityLabel="Close"
              >
                <Text style={[styles.shareModalCloseText, { color: theme.secondaryText }]}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

// ==========================================
// BPM TAP CALCULATOR PAGE (Issue #342)
// ==========================================
function BpmTapPage({ theme, onBack, drummers, onSelectDrummer }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  
  // Tap state
  const [taps, setTaps] = useState([]);
  const [bpm, setBpm] = useState(() => getBpmFromURL());
  const [isActive, setIsActive] = useState(false);
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef(null);
  
  // Song database state
  const [songFilter, setSongFilter] = useState(() => getSongFilterFromURL());
  const [selectedGenre, setSelectedGenre] = useState('');
  const [bpmRange, setBpmRange] = useState({ min: 0, max: 300 });
  const [sortBy, setSortBy] = useState('bpm');
  
  // Get unique genres from database
  const genres = useMemo(() => {
    const genreSet = new Set(METAL_SONGS_DATABASE.map(s => s.genre));
    return ['', ...Array.from(genreSet).sort()];
  }, []);
  
  // Filter and sort songs
  const filteredSongs = useMemo(() => {
    let songs = METAL_SONGS_DATABASE;
    
    // Filter by search
    if (songFilter) {
      const query = songFilter.toLowerCase();
      songs = songs.filter(s => 
        s.song.toLowerCase().includes(query) ||
        s.band.toLowerCase().includes(query) ||
        s.drummer.toLowerCase().includes(query)
      );
    }
    
    // Filter by genre
    if (selectedGenre) {
      songs = songs.filter(s => s.genre === selectedGenre);
    }
    
    // Filter by BPM range
    songs = songs.filter(s => s.bpm >= bpmRange.min && s.bpm <= bpmRange.max);
    
    // Sort
    if (sortBy === 'bpm') {
      songs = [...songs].sort((a, b) => a.bpm - b.bpm);
    } else if (sortBy === 'bpm-desc') {
      songs = [...songs].sort((a, b) => b.bpm - a.bpm);
    } else if (sortBy === 'band') {
      songs = [...songs].sort((a, b) => a.band.localeCompare(b.band));
    } else if (sortBy === 'year') {
      songs = [...songs].sort((a, b) => b.year - a.year);
    }
    
    return songs;
  }, [songFilter, selectedGenre, bpmRange, sortBy]);
  
  // Find songs near the tapped BPM
  const matchingSongs = useMemo(() => {
    if (!bpm) return [];
    const tolerance = 10;
    return METAL_SONGS_DATABASE
      .filter(s => Math.abs(s.bpm - bpm) <= tolerance)
      .sort((a, b) => Math.abs(a.bpm - bpm) - Math.abs(b.bpm - bpm))
      .slice(0, 5);
  }, [bpm]);
  
  // Handle tap
  const handleTap = useCallback(() => {
    const now = Date.now();
    
    // Clear timeout for reset
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Reset if more than 2 seconds since last tap
    const newTaps = taps.length > 0 && (now - taps[taps.length - 1]) > 2000 
      ? [now] 
      : [...taps, now].slice(-8); // Keep last 8 taps
    
    setTaps(newTaps);
    setIsActive(true);
    
    // Calculate BPM from taps
    if (newTaps.length >= 2) {
      const intervals = [];
      for (let i = 1; i < newTaps.length; i++) {
        intervals.push(newTaps[i] - newTaps[i - 1]);
      }
      const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
      const calculatedBpm = Math.round(60000 / avgInterval);
      setBpm(calculatedBpm);
      updateBpmURL(calculatedBpm, songFilter);
      updateBpmMeta(calculatedBpm);
    }
    
    // Auto-reset after 3 seconds of inactivity
    timeoutRef.current = setTimeout(() => {
      setIsActive(false);
    }, 3000);
    
    // Track event
    if (Platform.OS === 'web' && typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'bpm_tap', {
        tap_count: newTaps.length,
      });
    }
  }, [taps, songFilter]);
  
  // Handle reset
  const handleReset = useCallback(() => {
    setTaps([]);
    setBpm(null);
    setIsActive(false);
    updateBpmURL(null, songFilter);
    updateBpmMeta(null);
  }, [songFilter]);
  
  // Handle copy link
  const handleCopyLink = useCallback(() => {
    if (Platform.OS === 'web' && typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      if (window.gtag) {
        window.gtag('event', 'bpm_share', { method: 'copy_link', bpm });
      }
    }
  }, [bpm]);
  
  // Handle share to Twitter
  const handleShareTwitter = useCallback(() => {
    const text = bpm 
      ? `I found the tempo: ${bpm} BPM! 🥁 Check out the BPM Tap Calculator at MetalForge.io`
      : 'Check out the BPM Tap Calculator for drummers at MetalForge.io! 🥁';
    const url = encodeURIComponent(window.location.href);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`;
    if (Platform.OS === 'web') {
      window.open(twitterUrl, '_blank');
      if (window.gtag) {
        window.gtag('event', 'bpm_share', { method: 'twitter', bpm });
      }
    }
  }, [bpm]);
  
  // Update meta on mount
  useEffect(() => {
    updateBpmMeta(bpm);
  }, [bpm]);
  
  // Keyboard support for spacebar tapping
  useEffect(() => {
    if (Platform.OS !== 'web') return;
    
    const handleKeyDown = (e) => {
      if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault();
        handleTap();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleTap]);
  
  const bpmCategory = bpm ? getBpmCategory(bpm) : null;
  
  return (
    <ScrollView 
      style={[styles.listContainer, { backgroundColor: theme.background }]}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      {/* Header */}
      <View style={styles.bpmPageHeader}>
        <TouchableOpacity onPress={onBack} style={styles.backButton} accessibilityRole="button">
          <Text style={[styles.backButtonText, { color: theme.text }]}>← Back</Text>
        </TouchableOpacity>
      </View>
      
      {/* Title */}
      <View style={styles.bpmTitleSection}>
        <Text style={[styles.bpmPageTitle, { color: theme.text }]}>🥁 BPM Tap Calculator</Text>
        <Text style={[styles.bpmPageSubtitle, { color: theme.secondaryText }]}>
          Tap to find the tempo of any song. Browse metal songs by BPM.
        </Text>
      </View>
      
      {/* Tap Area */}
      <View style={[styles.bpmTapSection, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <TouchableOpacity
          onPress={handleTap}
          style={[
            styles.bpmTapButton,
            isActive && styles.bpmTapButtonActive,
            { borderColor: isActive ? theme.primary : theme.border }
          ]}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="Tap to calculate BPM"
        >
          <Text style={styles.bpmTapEmoji}>{isActive ? '🔥' : '👆'}</Text>
          <Text style={[styles.bpmTapText, { color: theme.text }]}>
            {isActive ? 'Keep Tapping!' : 'Tap Here'}
          </Text>
          <Text style={[styles.bpmTapHint, { color: theme.secondaryText }]}>
            or press Spacebar
          </Text>
        </TouchableOpacity>
        
        {/* BPM Display */}
        {bpm && (
          <View style={styles.bpmResultSection}>
            <View style={styles.bpmResultDisplay}>
              <Text style={[styles.bpmResultValue, { color: bpmCategory?.color || theme.text }]}>
                {bpm}
              </Text>
              <Text style={[styles.bpmResultUnit, { color: theme.secondaryText }]}>BPM</Text>
            </View>
            <View style={[styles.bpmResultBadge, { backgroundColor: bpmCategory?.color }]}>
              <Text style={styles.bpmResultBadgeText}>
                {bpmCategory?.emoji} {bpmCategory?.label}
              </Text>
            </View>
            <Text style={[styles.bpmTapCount, { color: theme.secondaryText }]}>
              Based on {taps.length} taps
            </Text>
          </View>
        )}
        
        {/* Action Buttons */}
        <View style={styles.bpmActionButtons}>
          <TouchableOpacity
            onPress={handleReset}
            style={[styles.bpmResetButton, { borderColor: theme.border }]}
            accessibilityRole="button"
          >
            <Text style={[styles.bpmResetButtonText, { color: theme.text }]}>🔄 Reset</Text>
          </TouchableOpacity>
          {bpm && (
            <>
              <TouchableOpacity
                onPress={handleCopyLink}
                style={[styles.bpmShareButton, { backgroundColor: colors.buttons.ghost.bg, borderWidth: 1, borderColor: colors.buttons.ghost.border }]}
                accessibilityRole="button"
              >
                <Text style={[styles.bpmShareButtonText, { color: colors.buttons.ghost.text }]}>
                  {copied ? '✓ Copied!' : '📋 Copy Link'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleShareTwitter}
                style={[styles.bpmShareButton, { backgroundColor: colors.buttons.ghost.bg, borderWidth: 1, borderColor: colors.buttons.ghost.border }]}
                accessibilityRole="button"
              >
                <Text style={[styles.bpmShareButtonText, { color: '#1DA1F2' }]}>🐦 Tweet</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
      
      {/* Matching Songs Section */}
      {matchingSongs.length > 0 && (
        <View style={[styles.bpmMatchingSection, { backgroundColor: theme.card, borderColor: theme.primary }]}>
          <Text style={[styles.bpmMatchingTitle, { color: theme.text }]}>
            🎯 Songs near {bpm} BPM
          </Text>
          {matchingSongs.map((song, idx) => (
            <TouchableOpacity
              key={`${song.band}-${song.song}-${idx}`}
              style={[styles.bpmSongCard, { borderColor: theme.border }]}
              onPress={() => {
                const drummer = drummers.find(d => d.name === song.drummer);
                if (drummer) onSelectDrummer(drummer.id);
              }}
            >
              <View style={styles.bpmSongInfo}>
                <Text style={[styles.bpmSongName, { color: theme.text }]}>{song.song}</Text>
                <Text style={[styles.bpmSongBand, { color: theme.secondaryText }]}>
                  {song.band} • {song.drummer}
                </Text>
              </View>
              <View style={[styles.bpmSongBpm, { backgroundColor: getBpmCategory(song.bpm).color }]}>
                <Text style={styles.bpmSongBpmText}>{song.bpm}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
      
      {/* Song Database Section */}
      <View style={styles.bpmDatabaseSection}>
        <Text style={[styles.bpmDatabaseTitle, { color: theme.text }]}>
          📀 Metal Song BPM Database
        </Text>
        <Text style={[styles.bpmDatabaseSubtitle, { color: theme.secondaryText }]}>
          {METAL_SONGS_DATABASE.length} songs • Browse by tempo, genre, or search
        </Text>
        
        {/* Filters */}
        <View style={[styles.bpmFilters, isMobile && styles.bpmFiltersMobile]}>
          {/* Search */}
          <View style={styles.bpmFilterItem}>
            <TextInput
              style={[styles.bpmSearchInput, { 
                backgroundColor: theme.card, 
                borderColor: theme.border,
                color: theme.text 
              }]}
              placeholder="Search songs, bands, drummers..."
              placeholderTextColor={theme.secondaryText}
              value={songFilter}
              onChangeText={(text) => {
                setSongFilter(text);
                updateBpmURL(bpm, text);
              }}
              // Mobile keyboard fix (Issue #469)
              inputMode="text"
              enterKeyHint="search"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="off"
            />
          </View>
          
          {/* Genre Filter */}
          <View style={styles.bpmFilterItem}>
            <Text style={[styles.bpmFilterLabel, { color: theme.secondaryText }]}>Genre</Text>
            <View style={styles.bpmGenreButtons}>
              {genres.slice(0, isMobile ? 4 : 8).map(genre => (
                <TouchableOpacity
                  key={genre || 'all'}
                  style={[
                    styles.bpmGenreButton,
                    selectedGenre === genre && styles.bpmGenreButtonActive,
                    { borderColor: selectedGenre === genre ? theme.primary : theme.border }
                  ]}
                  onPress={() => setSelectedGenre(genre)}
                >
                  <Text style={[
                    styles.bpmGenreButtonText,
                    { color: selectedGenre === genre ? theme.primary : theme.text }
                  ]}>
                    {genre || 'All'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          {/* Sort */}
          <View style={styles.bpmFilterItem}>
            <Text style={[styles.bpmFilterLabel, { color: theme.secondaryText }]}>Sort by</Text>
            <View style={styles.bpmSortButtons}>
              {[
                { key: 'bpm', label: 'BPM ↑' },
                { key: 'bpm-desc', label: 'BPM ↓' },
                { key: 'band', label: 'Band' },
                { key: 'year', label: 'Year' },
              ].map(opt => (
                <TouchableOpacity
                  key={opt.key}
                  style={[
                    styles.bpmSortButton,
                    sortBy === opt.key && styles.bpmSortButtonActive,
                    { borderColor: sortBy === opt.key ? theme.primary : theme.border }
                  ]}
                  onPress={() => setSortBy(opt.key)}
                >
                  <Text style={[
                    styles.bpmSortButtonText,
                    { color: sortBy === opt.key ? theme.primary : theme.text }
                  ]}>
                    {opt.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
        
        {/* Results Count */}
        <Text style={[styles.bpmResultsCount, { color: theme.secondaryText }]}>
          Showing {filteredSongs.length} of {METAL_SONGS_DATABASE.length} songs
        </Text>
        
        {/* Song List */}
        <View style={styles.bpmSongList}>
          {filteredSongs.slice(0, 50).map((song, idx) => {
            const category = getBpmCategory(song.bpm);
            const drummer = drummers.find(d => d.name === song.drummer);
            
            return (
              <TouchableOpacity
                key={`${song.band}-${song.song}-${idx}`}
                style={[styles.bpmSongListItem, { 
                  backgroundColor: theme.card, 
                  borderColor: theme.border 
                }]}
                onPress={() => {
                  if (drummer) onSelectDrummer(drummer.id);
                }}
              >
                <View style={[styles.bpmSongBpmBadge, { backgroundColor: category.color }]}>
                  <Text style={styles.bpmSongBpmBadgeText}>{song.bpm}</Text>
                  <Text style={styles.bpmSongBpmBadgeUnit}>BPM</Text>
                </View>
                <View style={styles.bpmSongDetails}>
                  <Text style={[styles.bpmSongTitle, { color: theme.text }]} numberOfLines={1}>
                    {song.song}
                  </Text>
                  <Text style={[styles.bpmSongMeta, { color: theme.secondaryText }]} numberOfLines={1}>
                    {song.band} • {song.album} ({song.year})
                  </Text>
                  <Text style={[styles.bpmSongDrummer, { color: theme.secondaryText }]} numberOfLines={1}>
                    🥁 {song.drummer}
                  </Text>
                </View>
                <View style={[styles.bpmSongGenreBadge, { backgroundColor: theme.background }]}>
                  <Text style={[styles.bpmSongGenreText, { color: theme.secondaryText }]}>
                    {song.genre}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
          
          {filteredSongs.length > 50 && (
            <Text style={[styles.bpmShowMore, { color: theme.secondaryText }]}>
              Showing first 50 results. Refine your search to see more.
            </Text>
          )}
          
          {filteredSongs.length === 0 && (
            <View style={styles.bpmNoResults}>
              <Text style={[styles.bpmNoResultsText, { color: theme.secondaryText }]}>
                No songs found matching your filters.
              </Text>
            </View>
          )}
        </View>
      </View>
      
      {/* Tips Section */}
      <View style={[styles.bpmTipsSection, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <Text style={[styles.bpmTipsTitle, { color: theme.text }]}>💡 Pro Tips</Text>
        <View style={styles.bpmTipsList}>
          <Text style={[styles.bpmTip, { color: theme.secondaryText }]}>
            • Tap along with the kick drum or snare for accuracy
          </Text>
          <Text style={[styles.bpmTip, { color: theme.secondaryText }]}>
            • Use at least 4 taps for a reliable BPM reading
          </Text>
          <Text style={[styles.bpmTip, { color: theme.secondaryText }]}>
            • Share your tempo with bandmates using the share button
          </Text>
          <Text style={[styles.bpmTip, { color: theme.secondaryText }]}>
            • Practice songs at similar BPM to improve your speed
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

// ==========================================
// BPM RANGE LANDING PAGE (Issue #342)
// Shows songs in a specific BPM range (slow, mid, fast, extreme, blast-beat, or numeric)
// ==========================================
function BpmRangePage({ rangeSlug, theme, drummers, onBack, onSelectDrummer, onNavigateToBpmRange, onNavigateToBpmTap }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  
  // Get range info from slug
  const getRangeInfo = (slug) => {
    const ranges = {
      'slow': { min: 40, max: 89, label: 'Slow Tempo (Doom/Sludge)', emoji: '🐢', description: 'Doom metal, sludge, and slow grooves. Perfect for crushing riffs and atmospheric soundscapes.' },
      'mid': { min: 90, max: 129, label: 'Mid Tempo (Groove/Heavy)', emoji: '🤘', description: 'Classic heavy metal and groove metal territory. Headbang-friendly BPMs.' },
      'fast': { min: 130, max: 169, label: 'Fast Tempo (Thrash/Power)', emoji: '⚡', description: 'Thrash metal, power metal, and high-energy tracks. Get your double bass ready!' },
      'extreme': { min: 170, max: 250, label: 'Extreme Tempo (Death/Black)', emoji: '💀', description: 'Death metal, black metal, and extreme speeds. Blast beats incoming!' },
      'blast-beat': { min: 251, max: 400, label: 'Blast Beat Territory', emoji: '🔥', description: 'Grindcore and beyond. Pure speed and aggression!' },
      'blast': { min: 251, max: 400, label: 'Blast Beat Territory', emoji: '🔥', description: 'Grindcore and beyond. Pure speed and aggression!' },
    };
    
    // Check if it's a numeric BPM
    if (/^\d+$/.test(slug)) {
      const bpm = parseInt(slug, 10);
      const tolerance = 10;
      return { 
        min: bpm - tolerance, 
        max: bpm + tolerance, 
        label: `Songs around ${bpm} BPM`, 
        emoji: '🎯', 
        description: `Metal songs with tempo near ${bpm} BPM (±${tolerance}).`,
        exactBpm: bpm
      };
    }
    
    return ranges[slug] || null;
  };
  
  const rangeInfo = getRangeInfo(rangeSlug);
  const isValidRange = rangeInfo !== null;
  
  // Filter songs by BPM range
  const songsInRange = useMemo(() => {
    if (!rangeInfo) return [];
    return METAL_SONGS_DATABASE
      .filter(s => s.bpm >= rangeInfo.min && s.bpm <= rangeInfo.max)
      .sort((a, b) => a.bpm - b.bpm);
  }, [rangeInfo]);
  
  // Update meta tags on mount
  useEffect(() => {
    if (Platform.OS !== 'web' || typeof document === 'undefined') return;
    
    if (rangeInfo) {
      const title = `${rangeInfo.label} Metal Songs | MetalForge`;
      const description = `${rangeInfo.description} Browse ${songsInRange.length} metal songs at ${rangeInfo.min}-${rangeInfo.max} BPM.`;
      
      document.title = title;
      
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
      
      setMeta('description', description);
      setMeta('og:title', title, true);
      setMeta('og:description', description, true);
      setMeta('og:url', `https://metalforge.io/bpm/${rangeSlug}`, true);
    }
  }, [rangeInfo, rangeSlug, songsInRange.length]);
  
  // Other range links for navigation
  const otherRanges = ['slow', 'mid', 'fast', 'extreme', 'blast-beat'].filter(r => r !== rangeSlug);
  
  if (!isValidRange) {
    return (
      <ScrollView style={[styles.listContainer, { backgroundColor: theme.background }]}>
        <View style={styles.bpmPageHeader}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Text style={[styles.backButtonText, { color: theme.text }]}>← Back to BPM Calculator</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.centeredLayout1}>
          <Text style={[styles.bpmPageTitle, { color: theme.text }]}>❓ Invalid BPM Range</Text>
          <Text style={{ color: theme.secondaryText, marginTop: 10, textAlign: 'center' }}>
            The range "{rangeSlug}" was not found. Try one of these:
          </Text>
          <View style={styles.rowLayout2}>
            {['slow', 'mid', 'fast', 'extreme', 'blast-beat'].map(range => (
              <TouchableOpacity 
                key={range}
                style={[styles.bpmRangeButton, { backgroundColor: theme.accent }]}
                onPress={() => onNavigateToBpmRange(range)}
              >
                <Text style={{ color: theme.text, fontWeight: 'bold' }}>{range}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    );
  }
  
  return (
    <ScrollView 
      style={[styles.listContainer, { backgroundColor: theme.background }]}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      {/* Header */}
      <View style={styles.bpmPageHeader}>
        <TouchableOpacity onPress={onNavigateToBpmTap} style={styles.backButton}>
          <Text style={[styles.backButtonText, { color: theme.text }]}>← Back to BPM Calculator</Text>
        </TouchableOpacity>
      </View>
      
      {/* Title */}
      <View style={styles.bpmTitleSection}>
        <Text style={[styles.bpmPageTitle, { color: theme.text }]}>{rangeInfo.emoji} {rangeInfo.label}</Text>
        <Text style={{ color: theme.secondaryText, marginTop: 8, textAlign: 'center', maxWidth: 600 }}>
          {rangeInfo.description}
        </Text>
        <Text style={{ color: theme.secondaryText, marginTop: 8 }}>
          BPM Range: {rangeInfo.min} - {rangeInfo.max} | {songsInRange.length} songs
        </Text>
      </View>
      
      {/* Songs List */}
      <View style={[styles.bpmSongsList, { maxWidth: 800, alignSelf: 'center', width: '100%' }]}>
        <Text style={[styles.sectionTitle, { color: theme.text, marginBottom: 15 }]}>
          🎵 Songs in this range
        </Text>
        {songsInRange.length === 0 ? (
          <Text style={{ color: theme.secondaryText, textAlign: 'center', padding: 20 }}>
            No songs found in this BPM range.
          </Text>
        ) : (
          songsInRange.map((song, idx) => (
            <View 
              key={`${song.band}-${song.song}-${idx}`}
              style={[styles.bpmSongItem, { backgroundColor: theme.card, borderColor: theme.border }]}
            >
              <View style={styles.flexOne1}>
                <Text style={[styles.bpmSongName, { color: theme.text }]}>{song.song}</Text>
                <Text style={[styles.bpmSongBand, { color: theme.secondaryText }]}>
                  {song.band} • {song.album} ({song.year})
                </Text>
              </View>
              <View style={styles.bpmBadge}>
                <Text style={styles.bpmBadgeText}>{song.bpm}</Text>
              </View>
            </View>
          ))
        )}
      </View>
      
      {/* Other Ranges */}
      <View style={styles.paddedBox1}>
        <Text style={[styles.sectionTitle, { color: theme.text, marginBottom: 15, textAlign: 'center' }]}>
          Explore Other Tempos
        </Text>
        <View style={styles.rowLayout3}>
          {otherRanges.map(range => {
            const info = getRangeInfo(range);
            return (
              <TouchableOpacity 
                key={range}
                style={[styles.bpmRangeButton, { backgroundColor: theme.accent }]}
                onPress={() => onNavigateToBpmRange(range)}
              >
                <Text style={{ color: theme.text, fontWeight: 'bold' }}>{info.emoji} {range}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}

// ==========================================
// DRUMMER BIO PAGE - Extended Biography (Issue #305)
// ==========================================
function DrummerBioPage({ theme, onBack, drummer, onSelectDrummer }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const drummerSlug = toSlug(drummer.name);
  
  // Fix for #541: Use Promise-based loading instead of synchronous access
  // This prevents race conditions where the module isn't fully loaded
  const [loadState, setLoadState] = useState({ isLoading: true, bio: null });
  
  useEffect(() => {
    let mounted = true;
    
    preloadExtendedBios().then(() => {
      if (mounted) {
        const bioData = getExtendedBio(drummerSlug);
        setLoadState({ isLoading: false, bio: bioData });
      }
    });
    
    return () => { mounted = false; };
  }, [drummerSlug]);
  
  const bio = loadState.bio;

  // Update SEO meta tags for bio page
  useEffect(() => {
    if (Platform.OS === 'web' && typeof document !== 'undefined' && bio) {
      document.title = bio.metaTitle;
      
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

      // Standard meta tags
      setMeta('description', bio.metaDescription);
      setMeta('keywords', `${drummer.name} biography, ${drummer.name} drummer, ${drummer.band} drummer, ${drummer.name} career, ${drummer.name} gear, metal drummer biography`);

      // OpenGraph tags
      setMeta('og:title', bio.metaTitle, true);
      setMeta('og:description', bio.metaDescription, true);
      setMeta('og:type', 'article', true);
      setMeta('og:image', bio.ogImage || drummer.image, true);
      setMeta('og:url', `https://metalforge.io/drummer/${drummerSlug}/bio`, true);

      // Twitter Card tags
      setMeta('twitter:card', 'summary_large_image');
      setMeta('twitter:title', bio.metaTitle);
      setMeta('twitter:description', bio.metaDescription);
      setMeta('twitter:image', bio.ogImage || drummer.image);

      // Article schema
      const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": bio.metaTitle,
        "description": bio.metaDescription,
        "image": bio.ogImage || drummer.image,
        "author": {
          "@type": "Organization",
          "name": "MetalForge"
        },
        "publisher": {
          "@type": "Organization",
          "name": "MetalForge",
          "url": "https://metalforge.io"
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://metalforge.io/drummer/${drummerSlug}/bio`
        },
        "about": {
          "@type": "Person",
          "name": drummer.name,
          "description": bio.sections.overview?.content || drummer.bio,
          "sameAs": drummer.sameAs || []
        }
      };

      let ldScript = document.querySelector('script[data-schema="bio"]');
      if (!ldScript) {
        ldScript = document.createElement('script');
        ldScript.type = 'application/ld+json';
        ldScript.setAttribute('data-schema', 'bio');
        document.head.appendChild(ldScript);
      }
      ldScript.textContent = JSON.stringify(articleSchema);
    }

    // Cleanup on unmount
    return () => {
      if (Platform.OS === 'web' && typeof document !== 'undefined') {
        const ldScript = document.querySelector('script[data-schema="bio"]');
        if (ldScript) ldScript.remove();
      }
    };
  }, [bio, drummer, drummerSlug]);

  // Show loading state while extended bio module is loading (fix for #541)
  if (loadState.isLoading) {
    return (
      <ScrollView style={[styles.detailContainer, { backgroundColor: theme.background }]}>
        <View style={styles.detailContent}>
          <TouchableOpacity
            onPress={onBack}
            style={[styles.backButton, { backgroundColor: theme.card, borderColor: theme.border }]}
            accessibilityRole="button"
            accessibilityLabel="Go back to drummer profile"
          >
            <Text style={[styles.backButtonText, { color: theme.text }]}>← Back to Profile</Text>
          </TouchableOpacity>
          <Text style={[styles.bioPageTitle, { color: theme.text }]}>Extended Biography</Text>
          <View style={styles.centeredLayout2}>
            <Text style={styles.emojiText1}>⏳</Text>
            <Text style={{ color: theme.secondaryText }}>Loading biography...</Text>
          </View>
        </View>
      </ScrollView>
    );
  }

  if (!bio) {
    return (
      <ScrollView style={[styles.detailContainer, { backgroundColor: theme.background }]}>
        <View style={styles.detailContent}>
          <TouchableOpacity
            onPress={onBack}
            style={[styles.backButton, { backgroundColor: theme.card, borderColor: theme.border }]}
            accessibilityRole="button"
            accessibilityLabel="Go back to drummer profile"
          >
            <Text style={[styles.backButtonText, { color: theme.text }]}>← Back to Profile</Text>
          </TouchableOpacity>
          <Text style={[styles.bioPageTitle, { color: theme.text }]}>Extended Biography</Text>
          <Text style={[styles.bioPageSubtitle, { color: theme.secondaryText }]}>
            Extended biography for {drummer.name} is coming soon. Check back later!
          </Text>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={[styles.detailContainer, { backgroundColor: theme.background }]}>
      <View style={styles.detailContent}>
        {/* Back button */}
        <TouchableOpacity
          onPress={onBack}
          style={[styles.backButton, { backgroundColor: theme.card, borderColor: theme.border }]}
          accessibilityRole="button"
          accessibilityLabel="Go back to drummer profile"
        >
          <Text style={[styles.backButtonText, { color: theme.text }]}>← Back to {drummer.name}'s Profile</Text>
        </TouchableOpacity>

        {/* Page Header */}
        <View style={[styles.bioPageHeader, isMobile && styles.bioPageHeaderMobile]}>
          <ImageWithFallback
            source={{ uri: drummer.image }}
            style={[styles.bioPageImage, isMobile && styles.bioPageImageMobile]}
            accessibilityLabel={`Photo of ${drummer.name}`}
            priority={true}
            width={isMobile ? 100 : 150}
            height={isMobile ? 100 : 150}
            imageContext="detail"
          />
          <View style={styles.bioPageHeaderText}>
            <Text style={[styles.bioPageTitle, { color: theme.text }]} accessibilityRole="heading" aria-level="1">
              {drummer.name}
            </Text>
            <Text style={[styles.bioPageSubtitle, { color: theme.secondaryText }]}>
              {drummer.band} • {drummer.country}
            </Text>
            <GenreTags genres={drummer.genres} size="medium" />
          </View>
        </View>

        {/* Overview Section */}
        {bio.sections.overview && (
          <View style={[styles.bioSection, { backgroundColor: theme.card, borderColor: theme.border }]} data-testid="bio-overview">
            <Text style={[styles.bioSectionTitle, { color: theme.text }]} accessibilityRole="heading" aria-level="2">
              {bio.sections.overview.title}
            </Text>
            <Text style={[styles.bioSectionContent, { color: theme.secondaryText }]}>
              {bio.sections.overview.content}
            </Text>
          </View>
        )}

        {/* Career Highlights Section */}
        {bio.sections.careerHighlights && (
          <View style={[styles.bioSection, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={[styles.bioSectionTitle, { color: theme.text }]} accessibilityRole="heading" aria-level="2">
              {bio.sections.careerHighlights.title}
            </Text>
            <View style={styles.careerTimeline}>
              {bio.sections.careerHighlights.items.map((item, index) => (
                <View key={index} style={styles.careerTimelineItem}>
                  <Text style={[styles.careerTimelineYear, { color: theme.primary }]}>{item.year}</Text>
                  <Text style={[styles.careerTimelineEvent, { color: theme.secondaryText }]}>{item.event}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Style & Influences Section */}
        {bio.sections.styleAndInfluences && (
          <View style={[styles.bioSection, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={[styles.bioSectionTitle, { color: theme.text }]} accessibilityRole="heading" aria-level="2">
              {bio.sections.styleAndInfluences.title}
            </Text>
            <Text style={[styles.bioSectionContent, { color: theme.secondaryText }]}>
              {bio.sections.styleAndInfluences.content}
            </Text>
          </View>
        )}

        {/* Notable Recordings Section */}
        {bio.sections.notableRecordings && (
          <View style={[styles.bioSection, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={[styles.bioSectionTitle, { color: theme.text }]} accessibilityRole="heading" aria-level="2">
              {bio.sections.notableRecordings.title}
            </Text>
            
            {/* Albums */}
            {bio.sections.notableRecordings.albums && (
              <View style={styles.discographySection}>
                <Text style={[styles.discographyTitle, { color: theme.text }]}>Key Albums</Text>
                {bio.sections.notableRecordings.albums.map((album, index) => (
                  <View key={index} style={[styles.albumItem, { borderColor: theme.border }]}>
                    <View style={styles.albumInfo}>
                      <Text style={[styles.albumName, { color: theme.text }]}>{album.name}</Text>
                      <Text style={[styles.albumMeta, { color: theme.secondaryText }]}>
                        {album.year} • {album.label}
                      </Text>
                    </View>
                    {album.note && (
                      <Text style={[styles.albumNote, { color: theme.secondaryText }]}>{album.note}</Text>
                    )}
                  </View>
                ))}
              </View>
            )}

            {/* Tours */}
            {bio.sections.notableRecordings.tours && bio.sections.notableRecordings.tours.length > 0 && (
              <View style={styles.toursSection}>
                <Text style={[styles.discographyTitle, { color: theme.text }]}>Notable Tours</Text>
                {bio.sections.notableRecordings.tours.map((tour, index) => (
                  <View key={index} style={styles.tourItem}>
                    <Text style={[styles.tourName, { color: theme.text }]}>{tour.name}</Text>
                    <Text style={[styles.tourMeta, { color: theme.secondaryText }]}>
                      {tour.year} {tour.note && `• ${tour.note}`}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}

        {/* Gear Highlights Section */}
        {bio.sections.gearHighlights && (
          <View style={[styles.bioSection, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={[styles.bioSectionTitle, { color: theme.text }]} accessibilityRole="heading" aria-level="2">
              {bio.sections.gearHighlights.title}
            </Text>
            <Text style={[styles.bioSectionContent, { color: theme.secondaryText }]}>
              {bio.sections.gearHighlights.content}
            </Text>
          </View>
        )}

        {/* Trivia Section */}
        {bio.sections.trivia && (
          <View style={[styles.bioSection, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={[styles.bioSectionTitle, { color: theme.text }]} accessibilityRole="heading" aria-level="2">
              {bio.sections.trivia.title}
            </Text>
            <View style={styles.triviaList}>
              {bio.sections.trivia.items.map((item, index) => (
                <View key={index} style={styles.triviaItem}>
                  <Text style={[styles.triviaBullet, { color: theme.primary }]}>•</Text>
                  <Text style={[styles.triviaText, { color: theme.secondaryText }]}>{item}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Sources Section */}
        {bio.sections.sources && (
          <View style={[styles.bioSection, styles.sourcesSection, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={[styles.bioSectionTitle, { color: theme.text }]} accessibilityRole="heading" aria-level="2">
              {bio.sections.sources.title}
            </Text>
            <View style={styles.sourcesList}>
              {bio.sections.sources.items.map((source, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => Linking.openURL(source.url)}
                  style={styles.sourceItem}
                  accessibilityRole="link"
                  accessibilityLabel={`Visit ${source.name}`}
                >
                  <Text style={[styles.sourceText, { color: '#60a5fa' }]}>{source.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* CTA to view drummer profile */}
        <View style={[styles.bioPageCTA, { backgroundColor: theme.card, borderColor: theme.primary }]}>
          <Text style={[styles.bioPageCTATitle, { color: theme.text }]}>
            🥁 Explore {drummer.name}'s Gear
          </Text>
          <Text style={[styles.bioPageCTADescription, { color: theme.secondaryText }]}>
            See the complete gear setup, videos, photos, and more on the full profile page.
          </Text>
          <TouchableOpacity
            onPress={onBack}
            style={styles.bioPageCTAButton}
            accessibilityRole="button"
            accessibilityLabel={`View ${drummer.name}'s full profile`}
          >
            <Text style={styles.bioPageCTAButtonText}>View Full Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

// ==========================================
// BAND DETAIL PAGE WITH DRUMMER HISTORY (Issue #349)
// ==========================================

/**
 * DrummerHistoryItem - Single drummer in the history timeline
 */
function DrummerHistoryItem({ entry, drummer, onSelectDrummer, theme, isLast }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <View 
      style={[
        styles.drummerHistoryItem, 
        { 
          backgroundColor: theme.card, 
          borderColor: theme.border,
          borderBottomWidth: isLast ? 0 : 1 
        }
      ]}
    >
      <View style={styles.drummerHistoryLeft}>
        <Text style={[styles.drummerHistoryIcon, { color: theme.primary }]}>🥁</Text>
        {drummer && drummer.image && (
          <ImageWithFallback
            source={{ uri: drummer.image }}
            style={styles.drummerHistoryImage}
            accessibilityLabel={`Photo of ${drummer?.name || entry.drummer}`}
            width={isMobile ? 40 : 50}
            height={isMobile ? 40 : 50}
            imageContext="list"
          />
        )}
      </View>
      <View style={styles.drummerHistoryContent}>
        <View style={styles.drummerHistoryHeader}>
          <Text style={[styles.drummerHistoryName, { color: theme.text }]}>
            {drummer?.name || entry.drummer.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
          </Text>
          <Text style={[styles.drummerHistoryPeriod, { color: theme.secondaryText }]}>
            ({entry.period})
          </Text>
        </View>
        {entry.notes && (
          <Text style={[styles.drummerHistoryNotes, { color: theme.secondaryText }]}>
            {entry.notes}
          </Text>
        )}
        {drummer && (
          <TouchableOpacity
            onPress={() => onSelectDrummer(drummer.id)}
            style={styles.drummerHistoryLink}
            accessibilityRole="link"
            accessibilityLabel={`View ${drummer.name}'s profile`}
          >
            <Text style={styles.drummerHistoryLinkText}>→ View Profile</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

/**
 * DrummerHistorySection - Display the drummer history timeline for a band
 */
function DrummerHistorySection({ band, drummers, onSelectDrummer, theme }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  if (!band.drummerHistory || band.drummerHistory.length === 0) {
    return null;
  }

  // Map drummer slugs to actual drummer data
  const resolvedHistory = band.drummerHistory.map(entry => {
    const drummer = drummers.find(d => 
      toSlug(d.name) === entry.drummer || 
      d.name.toLowerCase().replace(/\s+/g, '-') === entry.drummer
    );
    return { entry, drummer };
  });

  return (
    <View 
      style={[
        styles.drummerHistorySection, 
        { backgroundColor: theme.card, borderColor: theme.border },
        isMobile && styles.drummerHistorySectionMobile
      ]}
      accessibilityRole="region"
      accessibilityLabel="Drummer History"
    >
      <Text 
        style={[styles.drummerHistorySectionTitle, { color: theme.text }]}
        accessibilityRole="heading"
        aria-level="2"
      >
        DRUMMER HISTORY
      </Text>
      <View style={styles.drummerHistoryList}>
        {resolvedHistory.map(({ entry, drummer }, index) => (
          <DrummerHistoryItem
            key={`${entry.drummer}-${entry.period}`}
            entry={entry}
            drummer={drummer}
            onSelectDrummer={onSelectDrummer}
            theme={theme}
            isLast={index === resolvedHistory.length - 1}
          />
        ))}
      </View>
    </View>
  );
}

/**
 * BandDetailPage - Full band detail page with drummer history
 */
function BandDetailPage({ bandSlug, drummers, onBack, onSelectDrummer, theme }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const band = getBand(bandSlug);

  // Update SEO meta tags for band page
  useEffect(() => {
    if (Platform.OS === 'web' && typeof document !== 'undefined' && band) {
      document.title = band.metaTitle;

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

      // Standard meta tags
      setMeta('description', band.metaDescription);
      setMeta('keywords', band.keywords.join(', '));

      // OpenGraph tags
      setMeta('og:title', band.metaTitle, true);
      setMeta('og:description', band.metaDescription, true);
      setMeta('og:type', 'website', true);
      setMeta('og:url', `https://metalforge.io/bands/${bandSlug}`, true);
      if (band.image) {
        setMeta('og:image', band.image, true);
      }

      // Twitter Card tags
      setMeta('twitter:card', 'summary_large_image');
      setMeta('twitter:title', band.metaTitle);
      setMeta('twitter:description', band.metaDescription);
      if (band.image) {
        setMeta('twitter:image', band.image);
      }

      // Canonical URL
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', `https://metalforge.io/bands/${bandSlug}`);

      // Structured data for band
      const bandSchema = {
        "@context": "https://schema.org",
        "@type": "MusicGroup",
        "name": band.name,
        "foundingDate": band.formed.toString(),
        "foundingLocation": {
          "@type": "Place",
          "name": band.origin
        },
        "genre": band.genres.map(g => g.replace(/-/g, ' ')),
        "description": band.summary,
        "url": `https://metalforge.io/bands/${bandSlug}`,
        "member": band.drummerHistory.map(h => ({
          "@type": "OrganizationRole",
          "member": {
            "@type": "Person",
            "name": h.drummer.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
          },
          "roleName": "Drummer",
          "startDate": h.period.split('-')[0],
          "endDate": h.period.includes('present') ? undefined : h.period.split('-')[1]
        }))
      };

      let ldScript = document.querySelector('script[data-schema="band"]');
      if (!ldScript) {
        ldScript = document.createElement('script');
        ldScript.type = 'application/ld+json';
        ldScript.setAttribute('data-schema', 'band');
        document.head.appendChild(ldScript);
      }
      ldScript.textContent = JSON.stringify(bandSchema);

      // FAQ Schema - Only render if band has FAQ data (Issue #363)
      if (band.faq && band.faq.length > 0) {
        const faqSchema = {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": band.faq.map(faqItem => ({
            "@type": "Question",
            "name": faqItem.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faqItem.answer
            }
          }))
        };

        let faqLdScript = document.querySelector('script[data-schema="faq"]');
        if (!faqLdScript) {
          faqLdScript = document.createElement('script');
          faqLdScript.type = 'application/ld+json';
          faqLdScript.setAttribute('data-schema', 'faq');
          document.head.appendChild(faqLdScript);
        }
        faqLdScript.textContent = JSON.stringify(faqSchema);
      }
    }

    // Cleanup on unmount
    return () => {
      if (Platform.OS === 'web' && typeof document !== 'undefined') {
        const ldScript = document.querySelector('script[data-schema="band"]');
        if (ldScript) ldScript.remove();
        // Remove FAQ schema
        const faqLdScript = document.querySelector('script[data-schema="faq"]');
        if (faqLdScript) faqLdScript.remove();
        // Remove canonical link added by this page
        const canonicalLink = document.querySelector('link[rel="canonical"][href*="/bands/"]');
        if (canonicalLink) canonicalLink.remove();
      }
    };
  }, [band, bandSlug]);

  // Band not found
  if (!band) {
    return (
      <ScrollView style={[styles.detailContainer, { backgroundColor: theme.background }]}>
        <View style={styles.detailContent}>
          <TouchableOpacity
            onPress={onBack}
            style={[styles.backButton, { backgroundColor: theme.card, borderColor: theme.border }]}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Text style={[styles.backButtonText, { color: theme.text }]}>← Back</Text>
          </TouchableOpacity>
          <Text style={[styles.bandPageTitle, { color: theme.text }]}>Band Not Found</Text>
          <Text style={[styles.bandPageSubtitle, { color: theme.secondaryText }]}>
            The band "{bandSlug}" could not be found. Please check the URL and try again.
          </Text>
        </View>
      </ScrollView>
    );
  }

  // Format genres for display
  const formatGenre = (genre) => genre.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const statusColors = {
    active: colors.semantic.success,
    disbanded: colors.semantic.error,
    hiatus: colors.semantic.warning
  };

  return (
    <ScrollView style={[styles.detailContainer, { backgroundColor: theme.background }]}>
      <View style={styles.detailContent}>
        {/* Back button */}
        <TouchableOpacity
          onPress={onBack}
          style={[styles.backButton, { backgroundColor: theme.card, borderColor: theme.border }]}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Text style={[styles.backButtonText, { color: theme.text }]}>← Back</Text>
        </TouchableOpacity>

        {/* Band Header */}
        <View style={[styles.bandPageHeader, isMobile && styles.bandPageHeaderMobile]}>
          <View style={styles.bandPageHeaderText}>
            <View style={styles.bandNameRow}>
              <Text 
                style={[styles.bandPageTitle, { color: theme.text }]} 
                accessibilityRole="heading" 
                aria-level="1"
              >
                {band.name}
              </Text>
              <View 
                style={[
                  styles.bandStatusBadge, 
                  { backgroundColor: statusColors[band.status] || '#6b7280' }
                ]}
              >
                <Text style={styles.bandStatusText}>
                  {band.status.charAt(0).toUpperCase() + band.status.slice(1)}
                </Text>
              </View>
            </View>
            <Text style={[styles.bandPageSubtitle, { color: theme.secondaryText }]}>
              Est. {band.formed} • {band.origin}
            </Text>
            <View style={styles.bandGenres}>
              {band.genres.map((genre, index) => (
                <View 
                  key={genre} 
                  style={[styles.bandGenreTag, { backgroundColor: theme.border }]}
                >
                  <Text style={[styles.bandGenreText, { color: theme.text }]}>
                    {formatGenre(genre)}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Band Summary */}
        <View style={[styles.bandSummarySection, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.bandSummaryText, { color: theme.secondaryText }]}>
            {band.summary}
          </Text>
        </View>

        {/* Drummer History Section - The main feature for Issue #349 */}
        <DrummerHistorySection 
          band={band} 
          drummers={drummers} 
          onSelectDrummer={onSelectDrummer} 
          theme={theme} 
        />

        {/* Related Bands */}
        {band.relatedBands && band.relatedBands.length > 0 && (
          <View style={[styles.relatedBandsSection, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text 
              style={[styles.relatedBandsSectionTitle, { color: theme.text }]}
              accessibilityRole="heading"
              aria-level="2"
            >
              RELATED BANDS
            </Text>
            <View style={styles.relatedBandsList}>
              {band.relatedBands.map((relatedSlug) => {
                const relatedBand = getBand(relatedSlug);
                return (
                  <TouchableOpacity
                    key={relatedSlug}
                    onPress={() => {
                      updateBandURL(relatedSlug);
                    }}
                    style={[styles.relatedBandTag, { backgroundColor: theme.border }]}
                    accessibilityRole="link"
                    accessibilityLabel={`View ${relatedBand?.name || relatedSlug}`}
                  >
                    <Text style={[styles.relatedBandText, { color: theme.text }]}>
                      {relatedBand?.name || relatedSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

// ==========================================
// GEAR CATEGORY PAGES (Issue #339)
// ==========================================

// Gear category metadata for SEO
const GEAR_CATEGORY_META = {
  cymbals: {
    title: 'Metal Cymbals',
    metaTitle: 'Best Cymbals for Metal Drumming - Professional Metal Cymbals Guide | MetalForge',
    description: 'Discover the best cymbals for metal drumming. From crashes to rides, hi-hats to chinas - explore professional cymbal setups used by legendary metal drummers.',
    icon: '🥁',
  },
  snares: {
    title: 'Metal Snare Drums',
    metaTitle: 'Best Snare Drums for Metal - Professional Metal Snare Guide | MetalForge',
    description: 'Find the perfect snare drum for metal. Compare steel, brass, and wood snares used by professional metal drummers.',
    icon: '🥁',
  },
  drums: {
    title: 'Metal Drum Kits',
    metaTitle: 'Best Drum Kits for Metal - Professional Metal Drums Guide | MetalForge',
    description: 'Explore professional drum kits used by metal drummers. From Tama Starclassic to Sonor SQ2.',
    icon: '🥁',
  },
  pedals: {
    title: 'Metal Bass Drum Pedals',
    metaTitle: 'Best Bass Drum Pedals for Metal - Double Bass Pedal Guide | MetalForge',
    description: 'Compare the best bass drum pedals for metal drumming. Double pedals and direct drive options.',
    icon: '🦶',
  },
  sticks: {
    title: 'Metal Drumsticks',
    metaTitle: 'Best Drumsticks for Metal - Heavy Duty Drumstick Guide | MetalForge',
    description: 'Find the perfect drumsticks for metal. Heavy-hitting sticks used by professional metal drummers.',
    icon: '🥢',
  },
  hardware: {
    title: 'Metal Drum Hardware',
    metaTitle: 'Best Drum Hardware for Metal - Professional Hardware Guide | MetalForge',
    description: 'Explore professional drum hardware for metal. Hi-hat stands, cymbal stands, thrones, and rack systems.',
    icon: '🔩',
  },
};

/**
 * GearIndexPage - Main gear landing page with all categories
 */
function GearIndexPage({ theme, onBack, onNavigateToCategory, onSelectGear }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  // Update SEO meta tags
  useEffect(() => {
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      document.title = 'Metal Drumming Gear Guide - Cymbals, Snares, Pedals & More | MetalForge';

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

      const description = 'Complete guide to metal drumming gear. Explore cymbals, snare drums, drum kits, bass drum pedals, and hardware used by legendary metal drummers.';
      setMeta('description', description);
      setMeta('keywords', 'metal drumming gear, metal cymbals, metal snares, double bass pedals, drum kits, metal drummers');
      setMeta('og:title', 'Metal Drumming Gear Guide | MetalForge', true);
      setMeta('og:description', description, true);
      setMeta('og:type', 'website', true);
      setMeta('og:url', 'https://metalforge.io/gear', true);
      setMeta('twitter:card', 'summary_large_image');
      setMeta('twitter:title', 'Metal Drumming Gear Guide | MetalForge');
      setMeta('twitter:description', description);

      // ItemList schema for gear categories
      const itemListSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Metal Drumming Gear Categories",
        "description": description,
        "itemListElement": Object.entries(GEAR_CATEGORY_META).map(([slug, meta], index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": meta.title,
          "url": `https://metalforge.io/gear/${slug}`
        }))
      };

      let ldScript = document.querySelector('script[data-schema="gear-index"]');
      if (!ldScript) {
        ldScript = document.createElement('script');
        ldScript.type = 'application/ld+json';
        ldScript.setAttribute('data-schema', 'gear-index');
        document.head.appendChild(ldScript);
      }
      ldScript.textContent = JSON.stringify(itemListSchema);
    }

    return () => {
      if (Platform.OS === 'web' && typeof document !== 'undefined') {
        const ldScript = document.querySelector('script[data-schema="gear-index"]');
        if (ldScript) ldScript.remove();
      }
    };
  }, []);

  const categories = Object.entries(GEAR_CATEGORY_META);

  return (
    <ScrollView style={[styles.detailContainer, { backgroundColor: theme.background }]}>
      <View style={[styles.detailContent, { maxWidth: 1000, marginHorizontal: 'auto' }]}>
        <TouchableOpacity
          onPress={onBack}
          style={[styles.backButton, { backgroundColor: theme.card, borderColor: theme.border }]}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Text style={[styles.backButtonText, { color: theme.text }]}>← Back</Text>
        </TouchableOpacity>

        <Text style={[styles.listPageTitle, { color: theme.text }]} accessibilityRole="heading">
          🥁 Metal Drumming Gear Guide
        </Text>
        <Text style={[styles.listPageIntro, { color: theme.secondaryText }]}>
          Explore the essential gear categories used by legendary metal drummers. From cymbal setups to double bass pedals, 
          discover what the pros use to create their iconic sounds.
        </Text>

        <View style={[styles.listIndexGrid, isMobile && styles.listIndexGridMobile]}>
          {categories.map(([slug, meta]) => (
            <TouchableOpacity
              key={slug}
              onPress={() => onNavigateToCategory(slug)}
              style={[
                styles.listIndexCard,
                { backgroundColor: theme.card, borderColor: theme.border },
                isMobile && { maxWidth: '100%' }
              ]}
              accessibilityRole="link"
              accessibilityLabel={`Browse ${meta.title}`}
            >
              <Text style={styles.listIndexEmoji}>{meta.icon}</Text>
              <Text style={[styles.listIndexCardTitle, { color: theme.text }]}>
                {meta.title}
              </Text>
              <Text style={[styles.listIndexCardDesc, { color: theme.secondaryText }]}>
                {meta.description}
              </Text>
              <Text style={[styles.listIndexCardCount, { color: '#f59e0b' }]}>
                Browse gear →
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

/**
 * GearCategoryPage - Individual gear category page with SEO
 */
function GearCategoryPage({ category, categoryData, loading, theme, onBack, onSelectGear, onNavigateToCategory }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const meta = GEAR_CATEGORY_META[category] || {};

  // Update SEO meta tags
  useEffect(() => {
    if (Platform.OS === 'web' && typeof document !== 'undefined' && categoryData) {
      document.title = meta.metaTitle || `${meta.title} | MetalForge`;

      const setMeta = (name, content, isProperty = false) => {
        const attr = isProperty ? 'property' : 'name';
        let metaTag = document.querySelector(`meta[${attr}="${name}"]`);
        if (!metaTag) {
          metaTag = document.createElement('meta');
          metaTag.setAttribute(attr, name);
          document.head.appendChild(metaTag);
        }
        metaTag.setAttribute('content', content);
      };

      const description = categoryData.meta?.description || meta.description;
      const keywords = categoryData.meta?.keywords?.join(', ') || `${category}, metal drumming, drum gear`;

      setMeta('description', description);
      setMeta('keywords', keywords);
      setMeta('og:title', meta.metaTitle, true);
      setMeta('og:description', description, true);
      setMeta('og:type', 'website', true);
      setMeta('og:url', `https://metalforge.io/gear/${category}`, true);
      setMeta('twitter:card', 'summary_large_image');
      setMeta('twitter:title', meta.metaTitle);
      setMeta('twitter:description', description);

      // Canonical URL
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', `https://metalforge.io/gear/${category}`);

      // ProductCollection schema for gear category
      const collectionSchema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": meta.title,
        "description": categoryData.meta?.longDescription || description,
        "url": `https://metalforge.io/gear/${category}`,
        "mainEntity": {
          "@type": "ItemList",
          "name": `${meta.title} for Metal Drumming`,
          "numberOfItems": categoryData.items?.length || 0,
          "itemListElement": (categoryData.items || []).map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              "@type": "Product",
              "name": item.name,
              "brand": {
                "@type": "Brand",
                "name": item.brand
              },
              "description": item.shortDescription,
              "image": item.image,
              "url": `https://metalforge.io/gear/item/${item.slug}`,
              "offers": {
                "@type": "Offer",
                "priceCurrency": "EUR",
                "price": item.priceEur,
                "availability": "https://schema.org/InStock"
              }
            }
          }))
        },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://metalforge.io" },
            { "@type": "ListItem", "position": 2, "name": "Gear", "item": "https://metalforge.io/gear" },
            { "@type": "ListItem", "position": 3, "name": meta.title, "item": `https://metalforge.io/gear/${category}` }
          ]
        }
      };

      let ldScript = document.querySelector('script[data-schema="gear-category"]');
      if (!ldScript) {
        ldScript = document.createElement('script');
        ldScript.type = 'application/ld+json';
        ldScript.setAttribute('data-schema', 'gear-category');
        document.head.appendChild(ldScript);
      }
      ldScript.textContent = JSON.stringify(collectionSchema);
    }

    return () => {
      if (Platform.OS === 'web' && typeof document !== 'undefined') {
        const ldScript = document.querySelector('script[data-schema="gear-category"]');
        if (ldScript) ldScript.remove();
        const canonicalLink = document.querySelector('link[rel="canonical"][href*="/gear/"]');
        if (canonicalLink) canonicalLink.remove();
      }
    };
  }, [category, categoryData, meta]);

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={theme.text} />
          <Text style={[styles.loadingText, { color: theme.secondaryText }]}>
            Loading {meta.title}...
          </Text>
        </View>
      </View>
    );
  }

  const items = categoryData?.items || [];
  const brands = categoryData?.brands || [];
  const otherCategories = Object.entries(GEAR_CATEGORY_META).filter(([slug]) => slug !== category);

  return (
    <ScrollView style={[styles.detailContainer, { backgroundColor: theme.background }]}>
      <View style={[styles.detailContent, { maxWidth: 1000, marginHorizontal: 'auto' }]}>
        {/* Back button */}
        <TouchableOpacity
          onPress={onBack}
          style={[styles.backButton, { backgroundColor: theme.card, borderColor: theme.border }]}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Text style={[styles.backButtonText, { color: theme.text }]}>← Back</Text>
        </TouchableOpacity>

        {/* Page header */}
        <Text style={[styles.listPageTitle, { color: theme.text }]} accessibilityRole="heading">
          {meta.icon} {meta.title}
        </Text>
        <Text style={[styles.listPageIntro, { color: theme.secondaryText }]}>
          {categoryData?.meta?.longDescription || meta.description}
        </Text>

        {/* Brand filters */}
        {brands.length > 0 && (
          <View style={styles.mb6}>
            <Text style={[{ fontSize: 14, fontWeight: '600', marginBottom: 8 }, { color: theme.text }]}>
              Filter by Brand:
            </Text>
            <View style={[styles.flexRowWrap, styles.gap2]}>
              {brands.map(brand => (
                <TouchableOpacity
                  key={brand}
                  style={[
                    { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, borderWidth: 1 },
                    { backgroundColor: theme.card, borderColor: theme.border }
                  ]}
                  accessibilityRole="button"
                  accessibilityLabel={`Filter by ${brand}`}
                >
                  <Text style={{ color: theme.text, fontSize: 13 }}>{brand}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Gear items grid */}
        <View style={[styles.relatedGearContainer, { marginTop: 16 }]}>
          {items.map(item => (
            <TouchableOpacity
              key={item.id}
              onPress={() => onSelectGear(item.slug)}
              style={[
                styles.relatedGearCard,
                { backgroundColor: theme.card, borderColor: theme.border },
                isMobile && { width: '100%', maxWidth: '100%' }
              ]}
              accessibilityRole="link"
              accessibilityLabel={`View ${item.name}`}
            >
              <ImageWithFallback
                source={{ uri: item.image }}
                style={styles.relatedGearImage}
                accessibilityLabel={`Photo of ${item.name}`}
                width={150}
                height={100}
                imageContext="gallery"
              />
              <Text style={[styles.relatedGearName, { color: theme.text }]} numberOfLines={2}>
                {item.name}
              </Text>
              <Text style={[{ fontSize: 12, marginBottom: 4 }, { color: theme.secondaryText }]}>
                {item.brand}
              </Text>
              <Text style={[styles.relatedGearPrice, { color: '#f59e0b' }]}>
                {formatPrice(item.priceEur, 'EUR')}
              </Text>
              {item.drummerCount > 0 && (
                <Text style={[{ fontSize: 11, marginTop: 4 }, { color: theme.secondaryText }]}>
                  Used by {item.drummerCount} pro drummer{item.drummerCount !== 1 ? 's' : ''}
                </Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Related categories */}
        <View style={[styles.relatedListsSection, { borderTopColor: theme.border }]}>
          <Text style={[styles.relatedListsTitle, { color: theme.text }]}>
            Explore Other Gear Categories
          </Text>
          <View style={[styles.relatedListsGrid, isMobile && styles.relatedListsGridMobile]}>
            {otherCategories.slice(0, 4).map(([slug, catMeta]) => (
              <TouchableOpacity
                key={slug}
                onPress={() => onNavigateToCategory(slug)}
                style={[
                  styles.relatedListCard,
                  { backgroundColor: theme.card, borderColor: theme.border }
                ]}
                accessibilityRole="link"
                accessibilityLabel={`Browse ${catMeta.title}`}
              >
                <Text style={styles.relatedListEmoji}>{catMeta.icon}</Text>
                <Text style={[styles.relatedListName, { color: theme.text }]}>
                  {catMeta.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

// ==========================================
// GENRE LANDING PAGE (Issue #340)
// ==========================================

// Genre Landing Page - SEO-optimized pages for each metal subgenre
function GenreLandingPage({ genreSlug, drummers, onBack, onSelectDrummer, onNavigateGenre, theme }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const genre = getGenre(genreSlug);
  const relatedGenres = getRelatedGenres(genreSlug);

  // Filter drummers for this genre
  const genreDrummers = useMemo(() => {
    if (!genre || !drummers) return [];
    return getDrummersByGenre(genreSlug, drummers);
  }, [genreSlug, drummers, genre]);

  // Update SEO meta tags for genre page
  useEffect(() => {
    if (Platform.OS === 'web' && typeof document !== 'undefined' && genre) {
      const pageTitle = `${genre.name} Drummers - Gear, Videos & Bio | MetalForge`;
      const pageDescription = genre.description;

      document.title = pageTitle;

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

      // Standard meta tags
      setMeta('description', pageDescription);
      setMeta('keywords', genre.keywords.join(', '));

      // OpenGraph tags
      setMeta('og:title', pageTitle, true);
      setMeta('og:description', pageDescription, true);
      setMeta('og:type', 'website', true);
      setMeta('og:url', `https://metalforge.io/genre/${genreSlug}`, true);
      setMeta('og:site_name', 'MetalForge', true);

      // Twitter Card tags
      setMeta('twitter:card', 'summary_large_image');
      setMeta('twitter:site', '@MetalDrumGear');
      setMeta('twitter:title', pageTitle);
      setMeta('twitter:description', pageDescription);

      // Canonical URL
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', `https://metalforge.io/genre/${genreSlug}`);

      // Schema.org Structured Data - CollectionPage for genre
      const genreSchema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": `${genre.name} Drummers`,
        "description": genre.description,
        "url": `https://metalforge.io/genre/${genreSlug}`,
        "mainEntity": {
          "@type": "ItemList",
          "name": `${genre.name} Drummers`,
          "description": `Professional ${genre.name.toLowerCase()} drummers and their gear`,
          "numberOfItems": genreDrummers.length,
          "itemListElement": genreDrummers.slice(0, 10).map((drummer, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              "@type": "Person",
              "name": drummer.name,
              "jobTitle": "Drummer",
              "worksFor": {
                "@type": "MusicGroup",
                "name": drummer.band
              },
              "url": `https://metalforge.io/drummer/${drummer.name.toLowerCase().replace(/\s+/g, '-')}`
            }
          }))
        },
        "about": {
          "@type": "MusicGenre",
          "name": genre.name,
          "description": genre.longDescription
        },
        "isPartOf": {
          "@type": "WebSite",
          "name": "MetalForge",
          "url": "https://metalforge.io"
        }
      };

      let ldScript = document.querySelector('script[data-schema="genre"]');
      if (!ldScript) {
        ldScript = document.createElement('script');
        ldScript.type = 'application/ld+json';
        ldScript.setAttribute('data-schema', 'genre');
        document.head.appendChild(ldScript);
      }
      ldScript.textContent = JSON.stringify(genreSchema);

      // FAQ Schema if genre has FAQ
      if (genre.faq && genre.faq.length > 0) {
        const faqSchema = {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": genre.faq.map(faqItem => ({
            "@type": "Question",
            "name": faqItem.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faqItem.answer
            }
          }))
        };

        let faqLdScript = document.querySelector('script[data-schema="genre-faq"]');
        if (!faqLdScript) {
          faqLdScript = document.createElement('script');
          faqLdScript.type = 'application/ld+json';
          faqLdScript.setAttribute('data-schema', 'genre-faq');
          document.head.appendChild(faqLdScript);
        }
        faqLdScript.textContent = JSON.stringify(faqSchema);
      }

      // BreadcrumbList Schema
      const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://metalforge.io"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Genres",
            "item": "https://metalforge.io/genres"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": genre.name,
            "item": `https://metalforge.io/genre/${genreSlug}`
          }
        ]
      };

      let breadcrumbScript = document.querySelector('script[data-schema="genre-breadcrumb"]');
      if (!breadcrumbScript) {
        breadcrumbScript = document.createElement('script');
        breadcrumbScript.type = 'application/ld+json';
        breadcrumbScript.setAttribute('data-schema', 'genre-breadcrumb');
        document.head.appendChild(breadcrumbScript);
      }
      breadcrumbScript.textContent = JSON.stringify(breadcrumbSchema);
    }

    // Cleanup on unmount
    return () => {
      if (Platform.OS === 'web' && typeof document !== 'undefined') {
        const ldScript = document.querySelector('script[data-schema="genre"]');
        if (ldScript) ldScript.remove();
        const faqLdScript = document.querySelector('script[data-schema="genre-faq"]');
        if (faqLdScript) faqLdScript.remove();
        const breadcrumbScript = document.querySelector('script[data-schema="genre-breadcrumb"]');
        if (breadcrumbScript) breadcrumbScript.remove();
        const canonicalLink = document.querySelector('link[rel="canonical"][href*="/genre/"]');
        if (canonicalLink) canonicalLink.remove();
      }
    };
  }, [genre, genreSlug, genreDrummers]);

  // Genre not found
  if (!genre) {
    return (
      <ScrollView style={[styles.detailContainer, { backgroundColor: theme.background }]}>
        <View style={styles.detailContent}>
          <TouchableOpacity
            onPress={onBack}
            style={[styles.backButton, { backgroundColor: theme.card, borderColor: theme.border }]}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Text style={[styles.backButtonText, { color: theme.text }]}>← Back</Text>
          </TouchableOpacity>
          <Text style={[styles.bandPageTitle, { color: theme.text }]}>Genre Not Found</Text>
          <Text style={[styles.bandPageSubtitle, { color: theme.secondaryText }]}>
            The genre "{genreSlug}" could not be found. Please check the URL and try again.
          </Text>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={[styles.detailContainer, { backgroundColor: theme.background }]}>
      <View style={styles.detailContent}>
        {/* Back Button */}
        <TouchableOpacity
          onPress={onBack}
          style={[styles.backButton, { backgroundColor: theme.card, borderColor: theme.border }]}
          accessibilityRole="button"
          accessibilityLabel="Go back to home"
        >
          <Text style={[styles.backButtonText, { color: theme.text }]}>← Back</Text>
        </TouchableOpacity>

        {/* Genre Header */}
        <View style={[styles.genreHeader, { marginBottom: 24 }]}>
          <View style={[styles.flexRow, styles.mb2]}>
            <Text style={{ fontSize: 40, marginRight: 12 }}>{genre.icon}</Text>
            <View style={styles.flex1}>
              <Text style={[styles.bandPageTitle, { color: theme.text, marginBottom: 0 }]}>
                {genre.name}
              </Text>
              <Text style={[styles.genreTagline, { color: theme.accent }]}>
                {genreDrummers.length} drummer{genreDrummers.length !== 1 ? 's' : ''} • Est. {genre.foundedYear}
              </Text>
            </View>
          </View>
          <Text style={[styles.bandSummary, { color: theme.secondaryText }]}>
            {genre.description}
          </Text>
        </View>

        {/* Long Description */}
        <View style={[styles.genreSection, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>About {genre.name} Drumming</Text>
          {genre.longDescription.split('\n\n').map((paragraph, index) => (
            <Text key={index} style={[styles.genreParagraph, { color: theme.secondaryText }]}>
              {paragraph.startsWith('- **') 
                ? paragraph.replace(/\*\*([^*]+)\*\*/g, '$1')
                : paragraph.replace(/\*\*([^*]+)\*\*/g, '$1')}
            </Text>
          ))}
        </View>

        {/* Pioneers Section */}
        {genre.pioneers && genre.pioneers.length > 0 && (
          <View style={[styles.genreSection, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Genre Pioneers</Text>
            <View style={[styles.flexRowWrap, styles.gap2]}>
              {genre.pioneers.map((pioneer, index) => {
                // Find if pioneer is in our drummers list
                const drummerData = drummers.find(d => 
                  d.name.toLowerCase() === pioneer.toLowerCase()
                );
                return (
                  <TouchableOpacity
                    key={index}
                    style={[styles.pioneerTag, { 
                      backgroundColor: drummerData ? theme.accent + '20' : theme.background,
                      borderColor: drummerData ? theme.accent : theme.border,
                      borderWidth: 1,
                      paddingHorizontal: 12,
                      paddingVertical: 8,
                      borderRadius: 8,
                    }]}
                    onPress={() => drummerData && onSelectDrummer(drummerData.id)}
                    disabled={!drummerData}
                    accessibilityRole={drummerData ? 'button' : 'text'}
                  >
                    <Text style={{ 
                      color: drummerData ? theme.accent : theme.secondaryText,
                      fontWeight: drummerData ? '600' : '400'
                    }}>
                      {pioneer} {drummerData ? '→' : ''}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

        {/* Drummers in this Genre */}
        {genreDrummers.length > 0 && (
          <View style={[styles.genreSection, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              {genre.name} Drummers ({genreDrummers.length})
            </Text>
            <View style={styles.gappedLayout1}>
              {genreDrummers.map((drummer) => (
                <TouchableOpacity
                  key={drummer.id}
                  style={[styles.drummerRow, { 
                    backgroundColor: theme.background,
                    borderColor: theme.border,
                    borderWidth: 1,
                    borderRadius: 8,
                    padding: 12,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }]}
                  onPress={() => onSelectDrummer(drummer.id)}
                  accessibilityRole="button"
                  accessibilityLabel={`View ${drummer.name}`}
                >
                  {drummer.image && (
                    <Image
                      source={{ uri: getOptimizedImageUrl(drummer.image, 60) }}
                      style={{ 
                        width: 50, 
                        height: 50, 
                        borderRadius: 25, 
                        marginRight: 12,
                        backgroundColor: theme.border
                      }}
                      contentFit="cover"
                    />
                  )}
                  <View style={styles.flexOne1}>
                    <Text style={[styles.drummerName, { color: theme.text, fontSize: 16 }]}>
                      {drummer.name}
                    </Text>
                    <Text style={[styles.textSm, { color: theme.secondaryText }]}>
                      {drummer.band}
                    </Text>
                  </View>
                  <Text style={{ color: theme.accent, fontSize: 18 }}>→</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* FAQ Section */}
        {genre.faq && genre.faq.length > 0 && (
          <View style={[styles.genreSection, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Frequently Asked Questions</Text>
            {genre.faq.map((faqItem, index) => (
              <View key={index} style={{ marginBottom: index < genre.faq.length - 1 ? 16 : 0 }}>
                <Text style={[styles.faqQuestion, { color: theme.text }]}>
                  {faqItem.question}
                </Text>
                <Text style={[styles.faqAnswer, { color: theme.secondaryText }]}>
                  {faqItem.answer}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Related Genres */}
        {relatedGenres.length > 0 && (
          <View style={[styles.genreSection, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Related Genres</Text>
            <View style={[styles.flexRowWrap, styles.gap2]}>
              {relatedGenres.map((related) => (
                <TouchableOpacity
                  key={related.slug}
                  style={[styles.relatedGenreTag, { 
                    backgroundColor: related.color + '20',
                    borderColor: related.color,
                    borderWidth: 1,
                    paddingHorizontal: 14,
                    paddingVertical: 10,
                    borderRadius: 8,
                  }]}
                  onPress={() => onNavigateGenre(related.slug)}
                  accessibilityRole="button"
                  accessibilityLabel={`Explore ${related.name}`}
                >
                  <Text style={{ color: related.color, fontWeight: '600' }}>
                    {related.icon} {related.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Browse All Genres Link */}
        <View style={styles.marginSpacing4}>
          <TouchableOpacity
            style={[styles.browseAllGenresButton, { 
              backgroundColor: theme.accent,
              paddingVertical: 14,
              paddingHorizontal: 24,
              borderRadius: 8,
              alignItems: 'center'
            }]}
            onPress={() => {
              if (Platform.OS === 'web' && typeof window !== 'undefined') {
                window.history.pushState({}, '', '/genres');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }
            }}
            accessibilityRole="button"
            accessibilityLabel="Browse all genres"
          >
            <Text style={{ color: theme.text, fontWeight: '700', fontSize: 16 }}>
              Browse All Genres
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

// Genres List Page - Browse all genres
function GenresListPage({ onBack, onSelectGenre, theme }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const allGenres = getAllGenres();

  // Update SEO
  useEffect(() => {
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      document.title = 'Metal Genres - Explore Thrash, Death, Black, Prog & More | MetalForge';
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
      setMeta('description', 'Explore metal subgenres and discover the best drummers in thrash, death, black, progressive, nu-metal, groove, metalcore, and more.');
      setMeta('og:title', 'Metal Genres | MetalForge', true);
      setMeta('og:description', 'Explore metal subgenres and their drummers.', true);
      setMeta('og:url', 'https://metalforge.io/genres', true);
    }
  }, []);

  return (
    <ScrollView style={[styles.detailContainer, { backgroundColor: theme.background }]}>
      <View style={styles.detailContent}>
        <TouchableOpacity
          onPress={onBack}
          style={[styles.backButton, { backgroundColor: theme.card, borderColor: theme.border }]}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Text style={[styles.backButtonText, { color: theme.text }]}>← Back</Text>
        </TouchableOpacity>

        <Text style={[styles.bandPageTitle, { color: theme.text }]}>Metal Genres</Text>
        <Text style={[styles.bandPageSubtitle, { color: theme.secondaryText, marginBottom: 24 }]}>
          Explore metal subgenres and discover the drummers who defined them.
        </Text>

        <View style={{ 
          flexDirection: 'row', 
          flexWrap: 'wrap', 
          gap: 16,
          justifyContent: isMobile ? 'center' : 'flex-start'
        }}>
          {allGenres.map((genre) => (
            <TouchableOpacity
              key={genre.slug}
              style={[styles.genreCard, { 
                backgroundColor: theme.card,
                borderColor: genre.color,
                borderWidth: 2,
                borderRadius: 12,
                padding: 16,
                width: isMobile ? '100%' : 'calc(50% - 8px)',
                maxWidth: 400,
              }]}
              onPress={() => onSelectGenre(genre.slug)}
              accessibilityRole="button"
              accessibilityLabel={`Explore ${genre.name}`}
            >
              <View style={[styles.flexRow, styles.mb2]}>
                <Text style={{ fontSize: 28, marginRight: 10 }}>{genre.icon}</Text>
                <Text style={[styles.genreCardTitle, { color: theme.text, flex: 1 }]}>
                  {genre.name}
                </Text>
              </View>
              <Text style={[styles.textSm, styles.lineHeightSm, { color: theme.secondaryText }]} numberOfLines={3}>
                {genre.description}
              </Text>
              <View style={styles.rowLayout6}>
                <Text style={{ color: genre.color, fontWeight: '600', fontSize: 12 }}>
                  Est. {genre.foundedYear}
                </Text>
                <Text style={{ color: theme.accent, fontWeight: '600' }}>
                  Explore →
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

// ==========================================
// GEAR COMPARISON PAGES (Issue #345)
// ==========================================

// Gear Comparisons Index Page - List all available comparisons
function GearComparisonsIndexPage({ theme, onBack, onSelectComparison }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  
  // Fix for #541: ALWAYS start with loading state, never try to read data synchronously
  // This prevents race conditions where the module check passes but data isn't ready
  const [loadState, setLoadState] = useState({ isLoading: true, comparisons: [] });
  
  // Load gear comparisons module (fix for #541)
  useEffect(() => {
    let mounted = true;
    
    preloadGearComparisons().then(() => {
      if (mounted) {
        setLoadState({ isLoading: false, comparisons: getAllGearComparisons() });
      }
    });
    
    return () => { mounted = false; };
  }, []);

  // Group comparisons by category
  const comparisonsByCategory = useMemo(() => {
    const groups = {};
    loadState.comparisons.forEach(c => {
      if (!groups[c.category]) groups[c.category] = [];
      groups[c.category].push(c);
    });
    return groups;
  }, [loadState.comparisons]);

  const categoryLabels = {
    drums: '🥁 Drum Kit Comparisons',
    cymbals: '🔔 Cymbal Comparisons',
    hardware: '⚙️ Hardware Comparisons',
    snares: '🔵 Snare Drum Comparisons',
  };

  const categoryOrder = ['drums', 'cymbals', 'hardware', 'snares'];

  // Update SEO
  useEffect(() => {
    updateGearComparisonMeta(null);
  }, []);
  
  // Show loading state while module is loading (fix for #541)
  if (loadState.isLoading) {
    return (
      <ScrollView style={[styles.detailContainer, { backgroundColor: theme.background }]}>
        <View style={styles.detailContent}>
          <TouchableOpacity
            onPress={onBack}
            style={[styles.backButton, { backgroundColor: theme.card, borderColor: theme.border }]}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Text style={[styles.backButtonText, { color: theme.text }]}>← Back</Text>
          </TouchableOpacity>
          <Text style={[styles.bandPageTitle, { color: theme.text }]}>⚖️ Gear Comparisons</Text>
          <Text style={[styles.bandPageSubtitle, { color: theme.secondaryText, marginBottom: 24 }]}>
            Compare top drum brands and gear for metal drumming. Expert analysis, specs, pricing, and pro endorsements.
          </Text>
          <View style={styles.centeredLayout2}>
            <Text style={styles.emojiText1}>⏳</Text>
            <Text style={{ color: theme.secondaryText }}>Loading comparisons...</Text>
          </View>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={[styles.detailContainer, { backgroundColor: theme.background }]}>
      <View style={styles.detailContent}>
        <TouchableOpacity
          onPress={onBack}
          style={[styles.backButton, { backgroundColor: theme.card, borderColor: theme.border }]}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Text style={[styles.backButtonText, { color: theme.text }]}>← Back</Text>
        </TouchableOpacity>

        <Text style={[styles.bandPageTitle, { color: theme.text }]}>⚖️ Gear Comparisons</Text>
        <Text style={[styles.bandPageSubtitle, { color: theme.secondaryText, marginBottom: 24 }]}>
          Compare top drum brands and gear for metal drumming. Expert analysis, specs, pricing, and pro endorsements.
        </Text>

        {categoryOrder.map(category => {
          const comparisons = comparisonsByCategory[category] || [];
          if (comparisons.length === 0) return null;

          return (
            <View key={category} style={styles.mb8}>
              <Text style={[styles.sectionHeaderXl, { color: theme.text }]}>
                {categoryLabels[category]}
              </Text>
              <View style={{ 
                flexDirection: 'row', 
                flexWrap: 'wrap', 
                gap: 16,
                justifyContent: isMobile ? 'center' : 'flex-start'
              }}>
                {comparisons.map(comparison => (
                  <TouchableOpacity
                    key={comparison.slug}
                    style={{
                      backgroundColor: theme.card,
                      borderColor: theme.border,
                      borderWidth: 1,
                      borderRadius: 12,
                      padding: 16,
                      width: isMobile ? '100%' : 'calc(50% - 8px)',
                      maxWidth: 400,
                    }}
                    onPress={() => onSelectComparison(comparison.slug)}
                    accessibilityRole="button"
                    accessibilityLabel={`Compare ${comparison.title}`}
                  >
                    <View style={[styles.flexRow, styles.mb3]}>
                      <View style={[styles.flexRow, styles.gap2]}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: theme.text }}>
                          {comparison.items[0].brand}
                        </Text>
                        <Text style={{ fontSize: 16, color: theme.secondaryText }}>vs</Text>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: theme.text }}>
                          {comparison.items[1].brand}
                        </Text>
                      </View>
                    </View>
                    <Text style={{ color: theme.secondaryText, fontSize: 14, marginBottom: 8 }}>
                      {comparison.items[0].model} vs {comparison.items[1].model}
                    </Text>
                    <View style={[styles.flexRow, styles.mt2]}>
                      <Text style={{ color: theme.primary, fontWeight: '600', fontSize: 14 }}>
                        Compare →
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          );
        })}

        {/* SEO Footer */}
        <View style={{ marginTop: 24, padding: 20, backgroundColor: theme.card, borderRadius: 12, borderColor: theme.border, borderWidth: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: '600', color: theme.text, marginBottom: 8 }}>
            🎯 Finding the Right Gear
          </Text>
          <Text style={[styles.textSm, styles.lineHeightSm, { color: theme.secondaryText }]}>
            Our gear comparisons are designed to help metal drummers make informed decisions. We compare specs, pricing, durability, and most importantly—which pro metal drummers use each piece of equipment. Whether you're choosing between Tama and Pearl drums, Meinl and Zildjian cymbals, or Iron Cobra and Demon Drive pedals, we've got you covered.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

// Gear Comparison Detail Page - Single comparison view
function GearComparisonPage({ comparisonSlug, theme, onBack, onSelectDrummer, drummers }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  
  // Fix for #541: ALWAYS start with loading state, never try to read data synchronously
  // The initial state check was causing race conditions because isGearComparisonsLoaded()
  // could return true before the module's exports were fully accessible
  const [loadState, setLoadState] = useState({ isLoading: true, comparison: null });
  
  // Load gear comparisons module and fetch comparison data (fix for #541)
  useEffect(() => {
    let mounted = true;
    
    // Always ensure module is preloaded, then fetch comparison
    // This guarantees the module is FULLY loaded before we try to access data
    preloadGearComparisons().then(() => {
      if (mounted) {
        const data = getGearComparisonBySlug(comparisonSlug);
        setLoadState({ isLoading: false, comparison: data });
      }
    });
    
    return () => { mounted = false; };
  }, [comparisonSlug]);

  // Update SEO when comparison changes
  useEffect(() => {
    if (loadState.comparison) {
      updateGearComparisonMeta(loadState.comparison);
    }
  }, [loadState.comparison]);
  
  // Show loading state while module is loading (fix for #541)
  if (loadState.isLoading) {
    return (
      <ScrollView style={[styles.detailContainer, { backgroundColor: theme.background }]}>
        <View style={styles.detailContent}>
          <TouchableOpacity
            onPress={onBack}
            style={[styles.backButton, { backgroundColor: theme.card, borderColor: theme.border }]}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Text style={[styles.backButtonText, { color: theme.text }]}>← Back</Text>
          </TouchableOpacity>
          <View style={styles.centeredLayout2}>
            <Text style={styles.emojiText1}>⏳</Text>
            <Text style={{ color: theme.secondaryText }}>Loading comparison...</Text>
          </View>
        </View>
      </ScrollView>
    );
  }

  const comparison = loadState.comparison;
  
  if (!comparison) {
    return (
      <View style={[styles.detailContainer, { backgroundColor: theme.background }]}>
        <View style={styles.detailContent}>
          <TouchableOpacity
            onPress={onBack}
            style={[styles.backButton, { backgroundColor: theme.card, borderColor: theme.border }]}
          >
            <Text style={[styles.backButtonText, { color: theme.text }]}>← Back</Text>
          </TouchableOpacity>
          <Text style={{ color: theme.text, fontSize: 18, textAlign: 'center', marginTop: 40 }}>
            Comparison not found
          </Text>
        </View>
      </View>
    );
  }

  const item1 = comparison.items[0];
  const item2 = comparison.items[1];

  // Helper to find drummer by name
  const findDrummerByName = (name) => {
    if (!drummers) return null;
    const normalized = name.toLowerCase().replace(/\s+/g, '-');
    return drummers.find(d => d.name.toLowerCase().replace(/\s+/g, '-') === normalized);
  };

  // Render stars for rating
  const renderRating = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    const stars = [];
    for (let i = 0; i < fullStars; i++) stars.push('★');
    if (hasHalf) stars.push('½');
    return stars.join('');
  };

  return (
    <ScrollView style={[styles.detailContainer, { backgroundColor: theme.background }]}>
      <View style={styles.detailContent}>
        <TouchableOpacity
          onPress={onBack}
          style={[styles.backButton, { backgroundColor: theme.card, borderColor: theme.border }]}
          accessibilityRole="button"
          accessibilityLabel="Go back to comparisons"
        >
          <Text style={[styles.backButtonText, { color: theme.text }]}>← Back to Comparisons</Text>
        </TouchableOpacity>

        {/* Header */}
        <View style={[styles.alignCenter, styles.mb6]}>
          <Text style={{ fontSize: 14, color: theme.secondaryText, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>
            Gear Comparison
          </Text>
          <Text style={[styles.bandPageTitle, { color: theme.text, textAlign: 'center' }]}>
            {comparison.title}
          </Text>
        </View>

        {/* VS Card */}
        <View style={{ 
          flexDirection: isMobile ? 'column' : 'row', 
          gap: 16, 
          marginBottom: 24,
          alignItems: 'stretch'
        }}>
          {/* Item 1 */}
          <View style={{ 
            flex: 1, 
            backgroundColor: theme.card, 
            borderRadius: 12, 
            padding: 20, 
            borderColor: theme.primary, 
            borderWidth: 2 
          }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: theme.text, marginBottom: 4 }}>
              {item1.brand}
            </Text>
            <Text style={{ fontSize: 16, color: theme.secondaryText, marginBottom: 12 }}>
              {item1.model}
            </Text>
            <View style={{ backgroundColor: theme.background, borderRadius: 8, padding: 12, marginBottom: 12 }}>
              <Text style={{ color: theme.success, fontWeight: '600', fontSize: 18 }}>
                {item1.priceRange}
              </Text>
            </View>
            <View style={[styles.flexRow, styles.mb3]}>
              <Text style={{ color: '#fbbf24', fontSize: 16, marginRight: 8 }}>
                {renderRating(item1.rating)}
              </Text>
              <Text style={[styles.textSm, { color: theme.secondaryText }]}>
                {item1.rating}/5
              </Text>
            </View>
            <Text style={{ color: theme.secondaryText, fontSize: 13, fontStyle: 'italic' }}>
              Best for: {item1.bestFor}
            </Text>
          </View>

          {/* VS Badge */}
          <View style={{ 
            alignItems: 'center', 
            justifyContent: 'center',
            paddingVertical: isMobile ? 8 : 0 
          }}>
            <View style={{ 
              backgroundColor: theme.primary, 
              width: 50, 
              height: 50, 
              borderRadius: 25, 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              <Text style={{ color: theme.text, fontWeight: 'bold', fontSize: 16 }}>VS</Text>
            </View>
          </View>

          {/* Item 2 */}
          <View style={{ 
            flex: 1, 
            backgroundColor: theme.card, 
            borderRadius: 12, 
            padding: 20, 
            borderColor: '#3b82f6', 
            borderWidth: 2 
          }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: theme.text, marginBottom: 4 }}>
              {item2.brand}
            </Text>
            <Text style={{ fontSize: 16, color: theme.secondaryText, marginBottom: 12 }}>
              {item2.model}
            </Text>
            <View style={{ backgroundColor: theme.background, borderRadius: 8, padding: 12, marginBottom: 12 }}>
              <Text style={{ color: theme.success, fontWeight: '600', fontSize: 18 }}>
                {item2.priceRange}
              </Text>
            </View>
            <View style={[styles.flexRow, styles.mb3]}>
              <Text style={{ color: '#fbbf24', fontSize: 16, marginRight: 8 }}>
                {renderRating(item2.rating)}
              </Text>
              <Text style={[styles.textSm, { color: theme.secondaryText }]}>
                {item2.rating}/5
              </Text>
            </View>
            <Text style={{ color: theme.secondaryText, fontSize: 13, fontStyle: 'italic' }}>
              Best for: {item2.bestFor}
            </Text>
          </View>
        </View>

        {/* Pros & Cons Comparison */}
        <View style={styles.mb6}>
          <Text style={[styles.sectionHeaderXl, { color: theme.text }]}>
            ⚖️ Pros & Cons
          </Text>
          <View style={{ flexDirection: isMobile ? 'column' : 'row', gap: 16 }}>
            {/* Item 1 Pros/Cons */}
            <View style={{ flex: 1, backgroundColor: theme.card, borderRadius: 12, padding: 16, borderColor: theme.border, borderWidth: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: '600', color: theme.text, marginBottom: 12 }}>
                {item1.brand} {item1.model}
              </Text>
              <Text style={{ color: colors.semantic.success, fontWeight: '600', marginBottom: 8 }}>✓ Pros</Text>
              {item1.pros.map((pro, i) => (
                <Text key={i} style={{ color: theme.secondaryText, fontSize: 14, marginBottom: 4, paddingLeft: 8 }}>
                  • {pro}
                </Text>
              ))}
              <Text style={{ color: colors.semantic.error, fontWeight: '600', marginTop: 12, marginBottom: 8 }}>✗ Cons</Text>
              {item1.cons.map((con, i) => (
                <Text key={i} style={{ color: theme.secondaryText, fontSize: 14, marginBottom: 4, paddingLeft: 8 }}>
                  • {con}
                </Text>
              ))}
            </View>
            {/* Item 2 Pros/Cons */}
            <View style={{ flex: 1, backgroundColor: theme.card, borderRadius: 12, padding: 16, borderColor: theme.border, borderWidth: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: '600', color: theme.text, marginBottom: 12 }}>
                {item2.brand} {item2.model}
              </Text>
              <Text style={{ color: colors.semantic.success, fontWeight: '600', marginBottom: 8 }}>✓ Pros</Text>
              {item2.pros.map((pro, i) => (
                <Text key={i} style={{ color: theme.secondaryText, fontSize: 14, marginBottom: 4, paddingLeft: 8 }}>
                  • {pro}
                </Text>
              ))}
              <Text style={{ color: colors.semantic.error, fontWeight: '600', marginTop: 12, marginBottom: 8 }}>✗ Cons</Text>
              {item2.cons.map((con, i) => (
                <Text key={i} style={{ color: theme.secondaryText, fontSize: 14, marginBottom: 4, paddingLeft: 8 }}>
                  • {con}
                </Text>
              ))}
            </View>
          </View>
        </View>

        {/* Specs Comparison Table */}
        <View style={[styles.contentCardMd, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.sectionHeaderXl, { color: theme.text }]}>
            📊 Specifications
          </Text>
          <View style={{ borderTopWidth: 1, borderColor: theme.border }}>
            <View style={{ flexDirection: 'row', backgroundColor: theme.background, paddingVertical: 12, paddingHorizontal: 8 }}>
              <Text style={{ flex: 1, fontWeight: '600', color: theme.text, fontSize: 14 }}>Feature</Text>
              <Text style={{ flex: 1, fontWeight: '600', color: theme.primary, fontSize: 14, textAlign: 'center' }}>{item1.brand}</Text>
              <Text style={styles.flexOne2}>{item2.brand}</Text>
            </View>
            {Object.keys(item1.specs).map((key, i) => (
              <View key={key} style={{ 
                flexDirection: 'row', 
                paddingVertical: 12, 
                paddingHorizontal: 8,
                borderTopWidth: 1,
                borderColor: theme.border,
                backgroundColor: i % 2 === 0 ? 'transparent' : theme.background
              }}>
                <Text style={{ flex: 1, color: theme.secondaryText, fontSize: 14, textTransform: 'capitalize' }}>
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </Text>
                <Text style={{ flex: 1, color: theme.text, fontSize: 14, textAlign: 'center' }}>
                  {item1.specs[key]}
                </Text>
                <Text style={{ flex: 1, color: theme.text, fontSize: 14, textAlign: 'center' }}>
                  {item2.specs[key] || '-'}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Head-to-Head Comparison */}
        <View style={[styles.contentCardMd, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.sectionHeaderXl, { color: theme.text }]}>
            🎯 Head-to-Head
          </Text>
          {Object.entries(comparison.comparison).map(([key, value]) => (
            <View key={key} style={styles.mb4}>
              <Text style={{ color: theme.text, fontWeight: '600', fontSize: 15, marginBottom: 6, textTransform: 'capitalize' }}>
                {key === 'forMetal' ? '🤘 For Metal' : `${key.charAt(0).toUpperCase() + key.slice(1)}`}
              </Text>
              <Text style={[styles.textSm, styles.lineHeightSm, { color: theme.secondaryText }]}>
                {value}
              </Text>
            </View>
          ))}
        </View>

        {/* Pro Endorsements */}
        <View style={styles.mb6}>
          <Text style={[styles.sectionHeaderXl, { color: theme.text }]}>
            🎸 Pro Endorsements
          </Text>
          <View style={{ flexDirection: isMobile ? 'column' : 'row', gap: 16 }}>
            {/* Item 1 Users */}
            <View style={{ flex: 1, backgroundColor: theme.card, borderRadius: 12, padding: 16, borderColor: theme.primary, borderWidth: 2 }}>
              <Text style={{ fontSize: 16, fontWeight: '600', color: theme.text, marginBottom: 12 }}>
                {item1.brand} Users
              </Text>
              <View style={[styles.flexRowWrap, styles.gap2]}>
                {item1.usedBy.map((name, i) => {
                  const drummer = findDrummerByName(name);
                  return (
                    <TouchableOpacity
                      key={i}
                      style={{
                        backgroundColor: drummer ? theme.primary : theme.background,
                        paddingHorizontal: 12,
                        paddingVertical: 6,
                        borderRadius: 16,
                      }}
                      onPress={() => drummer && onSelectDrummer(drummer.id)}
                      disabled={!drummer}
                    >
                      <Text style={{ color: drummer ? theme.text : theme.text, fontSize: 13 }}>
                        {name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
            {/* Item 2 Users */}
            <View style={{ flex: 1, backgroundColor: theme.card, borderRadius: 12, padding: 16, borderColor: '#3b82f6', borderWidth: 2 }}>
              <Text style={{ fontSize: 16, fontWeight: '600', color: theme.text, marginBottom: 12 }}>
                {item2.brand} Users
              </Text>
              <View style={[styles.flexRowWrap, styles.gap2]}>
                {item2.usedBy.map((name, i) => {
                  const drummer = findDrummerByName(name);
                  return (
                    <TouchableOpacity
                      key={i}
                      style={{
                        backgroundColor: drummer ? '#3b82f6' : theme.background,
                        paddingHorizontal: 12,
                        paddingVertical: 6,
                        borderRadius: 16,
                      }}
                      onPress={() => drummer && onSelectDrummer(drummer.id)}
                      disabled={!drummer}
                    >
                      <Text style={{ color: drummer ? theme.text : theme.text, fontSize: 13 }}>
                        {name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </View>
        </View>

        {/* Verdict */}
        <View style={{ 
          marginBottom: 24, 
          backgroundColor: theme.primary, 
          borderRadius: 12, 
          padding: 20 
        }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: theme.text, marginBottom: 12 }}>
            🏆 The Verdict
          </Text>
          <Text style={{ color: theme.text, fontSize: 16, lineHeight: 24 }}>
            {comparison.verdict}
          </Text>
        </View>

        {/* Browse Other Comparisons */}
        <View style={{ 
          backgroundColor: theme.card, 
          borderRadius: 12, 
          padding: 16, 
          borderColor: theme.border, 
          borderWidth: 1,
          alignItems: 'center'
        }}>
          <Text style={{ fontSize: 16, color: theme.text, marginBottom: 12 }}>
            Looking for more comparisons?
          </Text>
          <TouchableOpacity
            onPress={onBack}
            style={{
              backgroundColor: theme.text,
              paddingHorizontal: 24,
              paddingVertical: 12,
              borderRadius: 8,
            }}
          >
            <Text style={{ color: theme.background, fontWeight: '600' }}>
              Browse All Comparisons →
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

// ==========================================
// DRUMMER VS DRUMMER PAGES (Issue #558)
// ==========================================

// Drummer Vs Index Page - List all drummer comparisons
function DrummerVsIndexPage({ theme, onBack, onSelectComparison, onSelectDrummer, drummers }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const [isLoaded, setIsLoaded] = useState(isDrummerComparisonsLoaded());
  
  // Wait for module to load
  useEffect(() => {
    if (!isLoaded) {
      preloadDrummerComparisons();
      const unsubscribe = onDrummerComparisonsLoaded(() => setIsLoaded(true));
      return unsubscribe;
    }
  }, [isLoaded]);
  
  const allComparisons = getAllDrummerComparisons();

  // Update SEO
  useEffect(() => {
    updateDrummerVsMeta(null);
  }, []);

  // Find drummer object by slug
  const findDrummerBySlug = (slug) => {
    if (!drummers) return null;
    return drummers.find(d => toSlug(d.name) === slug);
  };

  // Get category display name
  const getCategoryLabel = (category) => {
    const labels = {
      progressive: '🌀 Progressive Metal',
      thrash: '🔥 Thrash Metal',
      extreme: '💀 Extreme Metal',
      technical: '🧠 Technical Death Metal',
      other: '🎸 Other'
    };
    return labels[category] || category;
  };

  // Loading state
  if (!isLoaded) {
    return (
      <ScrollView style={[styles.detailContainer, { backgroundColor: theme.background }]}>
        <View style={styles.detailContent}>
          <TouchableOpacity
            onPress={onBack}
            style={[styles.backButton, { backgroundColor: theme.card, borderColor: theme.border }]}
          >
            <Text style={[styles.backButtonText, { color: theme.text }]}>← Back</Text>
          </TouchableOpacity>
          <View style={styles.centeredLayout2}>
            <Text style={styles.emojiText1}>⏳</Text>
            <Text style={{ color: theme.secondaryText }}>Loading comparisons...</Text>
          </View>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={[styles.detailContainer, { backgroundColor: theme.background }]}>
      <View style={styles.detailContent}>
        <TouchableOpacity
          onPress={onBack}
          style={[styles.backButton, { backgroundColor: theme.card, borderColor: theme.border }]}
          accessibilityRole="button"
          accessibilityLabel="Go back to home"
        >
          <Text style={[styles.backButtonText, { color: theme.text }]}>← Back</Text>
        </TouchableOpacity>

        {/* Header */}
        <View style={styles.centeredLayout4}>
          <Text style={styles.emojiText4}>⚔️</Text>
          <Text style={[styles.bandPageTitle, { color: theme.text, textAlign: 'center' }]}>
            Drummer vs Drummer
          </Text>
          <Text style={{ color: theme.secondaryText, textAlign: 'center', fontSize: 16, marginTop: 8, maxWidth: 600 }}>
            Head-to-head comparisons of legendary metal drummers. Compare gear, technique, style, and career stats.
          </Text>
        </View>

        {/* Comparison Cards */}
        <View style={styles.gap4}>
          {allComparisons.map((comparison) => {
            const drummer1 = findDrummerBySlug(comparison.drummers[0]);
            const drummer2 = findDrummerBySlug(comparison.drummers[1]);
            
            return (
              <TouchableOpacity
                key={comparison.slug}
                style={{
                  backgroundColor: theme.card,
                  borderRadius: 12,
                  borderColor: theme.border,
                  borderWidth: 1,
                  overflow: 'hidden',
                }}
                onPress={() => onSelectComparison(comparison.slug)}
                accessibilityRole="link"
                accessibilityLabel={`View ${comparison.title} comparison`}
              >
                {/* VS Header */}
                <View style={{ 
                  flexDirection: 'row', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  padding: 16,
                  backgroundColor: theme.background,
                }}>
                  {/* Drummer 1 */}
                  <View style={styles.centeredLayout5}>
                    {drummer1?.image ? (
                      <Image
                        source={{ uri: getOptimizedImageUrl(drummer1.image, { width: 80 }) }}
                        style={{ width: 60, height: 60, borderRadius: 30, marginBottom: 8, borderWidth: 2, borderColor: theme.primary }}
                      />
                    ) : (
                      <View style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: theme.border, marginBottom: 8, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={styles.inlineStyle3}>🥁</Text>
                      </View>
                    )}
                    <Text style={{ color: theme.text, fontWeight: '600', fontSize: 14, textAlign: 'center' }}>
                      {drummer1?.name || comparison.drummers[0]}
                    </Text>
                    <Text style={{ color: theme.secondaryText, fontSize: 12, textAlign: 'center' }}>
                      {drummer1?.band || ''}
                    </Text>
                  </View>

                  {/* VS Badge */}
                  <View style={{
                    backgroundColor: theme.primary,
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginHorizontal: 12,
                  }}>
                    <Text style={{ color: theme.text, fontWeight: 'bold', fontSize: 14 }}>VS</Text>
                  </View>

                  {/* Drummer 2 */}
                  <View style={styles.centeredLayout5}>
                    {drummer2?.image ? (
                      <Image
                        source={{ uri: getOptimizedImageUrl(drummer2.image, { width: 80 }) }}
                        style={{ width: 60, height: 60, borderRadius: 30, marginBottom: 8, borderWidth: 2, borderColor: '#3b82f6' }}
                      />
                    ) : (
                      <View style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: theme.border, marginBottom: 8, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={styles.inlineStyle3}>🥁</Text>
                      </View>
                    )}
                    <Text style={{ color: theme.text, fontWeight: '600', fontSize: 14, textAlign: 'center' }}>
                      {drummer2?.name || comparison.drummers[1]}
                    </Text>
                    <Text style={{ color: theme.secondaryText, fontSize: 12, textAlign: 'center' }}>
                      {drummer2?.band || ''}
                    </Text>
                  </View>
                </View>

                {/* Footer */}
                <View style={{ padding: 12, borderTopWidth: 1, borderColor: theme.border, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text style={[styles.textXs, { color: theme.secondaryText }]}>
                    {getCategoryLabel(comparison.category)}
                  </Text>
                  <Text style={{ color: theme.primary, fontWeight: '600', fontSize: 13 }}>
                    Compare →
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* CTA */}
        <View style={{ marginTop: 32, padding: 20, backgroundColor: theme.card, borderRadius: 12, borderColor: theme.border, borderWidth: 1, alignItems: 'center' }}>
          <Text style={{ color: theme.text, fontSize: 16, fontWeight: '600', marginBottom: 8, textAlign: 'center' }}>
            🗳️ Vote for Your Favorites!
          </Text>
          <Text style={{ color: theme.secondaryText, fontSize: 14, textAlign: 'center' }}>
            Each comparison page features a community poll. Cast your vote and see who the metal community thinks reigns supreme.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

// Related Comparisons Component - Shows other comparisons featuring the same drummers
function RelatedComparisons({ currentSlug, drummerSlugs, theme, allDrummers, onSelectComparison }) {
  const allComparisons = getAllDrummerComparisons();
  
  // Find comparisons that share at least one drummer with the current comparison
  const relatedComparisons = useMemo(() => {
    return allComparisons.filter(c => {
      // Exclude current comparison
      if (c.slug === currentSlug) return false;
      // Check if any drummer from current comparison is in this comparison
      return drummerSlugs.some(slug => c.drummers.includes(slug));
    }).slice(0, 3);
  }, [allComparisons, currentSlug, drummerSlugs]);
  
  const findDrummerBySlug = (slug) => {
    if (!allDrummers) return null;
    return allDrummers.find(d => toSlug(d.name) === slug);
  };
  
  if (relatedComparisons.length === 0) return null;
  
  return (
    <View style={{ marginBottom: 24, backgroundColor: theme.card, borderRadius: 12, padding: 16, borderColor: theme.border, borderWidth: 1 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: theme.text, marginBottom: 16 }}>🔗 Related Comparisons</Text>
      <View style={{ gap: 12 }}>
        {relatedComparisons.map((comparison) => {
          const drummer1 = findDrummerBySlug(comparison.drummers[0]);
          const drummer2 = findDrummerBySlug(comparison.drummers[1]);
          
          return (
            <TouchableOpacity
              key={comparison.slug}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 12,
                backgroundColor: theme.background,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: theme.border,
              }}
              onPress={() => onSelectComparison(comparison.slug)}
              accessibilityRole="link"
              accessibilityLabel={`View ${comparison.title} comparison`}
            >
              {/* Mini avatars */}
              <View style={{ flexDirection: 'row', marginRight: 12 }}>
                {drummer1?.image ? (
                  <Image 
                    source={{ uri: getOptimizedImageUrl(drummer1.image, { width: 40 }) }} 
                    style={{ width: 32, height: 32, borderRadius: 16, borderWidth: 2, borderColor: theme.primary }} 
                  />
                ) : (
                  <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: theme.border, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 12 }}>🥁</Text>
                  </View>
                )}
                {drummer2?.image ? (
                  <Image 
                    source={{ uri: getOptimizedImageUrl(drummer2.image, { width: 40 }) }} 
                    style={{ width: 32, height: 32, borderRadius: 16, borderWidth: 2, borderColor: '#3b82f6', marginLeft: -8 }} 
                  />
                ) : (
                  <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: theme.border, alignItems: 'center', justifyContent: 'center', marginLeft: -8 }}>
                    <Text style={{ fontSize: 12 }}>🥁</Text>
                  </View>
                )}
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: theme.text, fontWeight: '600', fontSize: 14 }}>{comparison.title}</Text>
                <Text style={{ color: theme.secondaryText, fontSize: 12 }}>
                  {drummer1?.band} vs {drummer2?.band}
                </Text>
              </View>
              <Text style={{ color: theme.primary, fontWeight: '600', fontSize: 13 }}>→</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

// Drummer Vs Detail Page - Single comparison view
function DrummerVsPage({ comparisonSlug, theme, onBack, onSelectDrummer, drummers }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  
  const [loadState, setLoadState] = useState({ isLoading: true, comparison: null });
  const [vote, setVote] = useState(null);
  const [votes, setVotes] = useState({ drummer1: 0, drummer2: 0 });
  const [hasVoted, setHasVoted] = useState(false);
  
  // Load comparison data
  useEffect(() => {
    let mounted = true;
    
    preloadDrummerComparisons().then(() => {
      if (mounted) {
        const data = getDrummerComparisonBySlug(comparisonSlug);
        setLoadState({ isLoading: false, comparison: data });
        
        // Load existing votes from localStorage
        if (Platform.OS === 'web' && typeof localStorage !== 'undefined') {
          const storedVote = localStorage.getItem(`vs-vote-${comparisonSlug}`);
          if (storedVote) {
            setVote(storedVote);
            setHasVoted(true);
          }
          const storedVotes = localStorage.getItem(`vs-votes-${comparisonSlug}`);
          if (storedVotes) {
            setVotes(JSON.parse(storedVotes));
          } else {
            const seed = { drummer1: Math.floor(Math.random() * 50) + 20, drummer2: Math.floor(Math.random() * 50) + 20 };
            setVotes(seed);
            localStorage.setItem(`vs-votes-${comparisonSlug}`, JSON.stringify(seed));
          }
        }
      }
    });
    
    return () => { mounted = false; };
  }, [comparisonSlug]);

  const findDrummerBySlug = (slug) => {
    if (!drummers) return null;
    return drummers.find(d => toSlug(d.name) === slug);
  };

  const comparison = loadState.comparison;
  const drummer1 = comparison ? findDrummerBySlug(comparison.drummers[0]) : null;
  const drummer2 = comparison ? findDrummerBySlug(comparison.drummers[1]) : null;

  useEffect(() => {
    if (comparison) {
      updateDrummerVsMeta(comparison, drummer1, drummer2);
    }
  }, [comparison, drummer1, drummer2]);

  const handleVote = (choice) => {
    if (hasVoted) return;
    
    setVote(choice);
    setHasVoted(true);
    
    const newVotes = { ...votes, [choice]: votes[choice] + 1 };
    setVotes(newVotes);
    
    if (Platform.OS === 'web' && typeof localStorage !== 'undefined') {
      localStorage.setItem(`vs-vote-${comparisonSlug}`, choice);
      localStorage.setItem(`vs-votes-${comparisonSlug}`, JSON.stringify(newVotes));
    }

    if (Platform.OS === 'web' && typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'drummer_vs_vote', {
        comparison: comparisonSlug,
        choice: choice,
        drummer: choice === 'drummer1' ? drummer1?.name : drummer2?.name,
      });
    }
  };

  const totalVotes = votes.drummer1 + votes.drummer2;
  const drummer1Percent = totalVotes > 0 ? Math.round((votes.drummer1 / totalVotes) * 100) : 50;
  const drummer2Percent = totalVotes > 0 ? Math.round((votes.drummer2 / totalVotes) * 100) : 50;

  if (loadState.isLoading) {
    return (
      <ScrollView style={[styles.detailContainer, { backgroundColor: theme.background }]}>
        <View style={styles.detailContent}>
          <TouchableOpacity onPress={onBack} style={[styles.backButton, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={[styles.backButtonText, { color: theme.text }]}>← Back</Text>
          </TouchableOpacity>
          <View style={styles.centeredLayout2}>
            <Text style={styles.emojiText1}>⏳</Text>
            <Text style={{ color: theme.secondaryText }}>Loading comparison...</Text>
          </View>
        </View>
      </ScrollView>
    );
  }

  if (!comparison) {
    return (
      <View style={[styles.detailContainer, { backgroundColor: theme.background }]}>
        <View style={styles.detailContent}>
          <TouchableOpacity onPress={onBack} style={[styles.backButton, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={[styles.backButtonText, { color: theme.text }]}>← Back</Text>
          </TouchableOpacity>
          <Text style={{ color: theme.text, fontSize: 18, textAlign: 'center', marginTop: 40 }}>Comparison not found</Text>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.detailContainer, { backgroundColor: theme.background }]}>
      <View style={styles.detailContent}>
        <TouchableOpacity onPress={onBack} style={[styles.backButton, { backgroundColor: theme.card, borderColor: theme.border }]} accessibilityRole="button" accessibilityLabel="Go back to comparisons">
          <Text style={[styles.backButtonText, { color: theme.text }]}>← Back to Comparisons</Text>
        </TouchableOpacity>

        {/* Header */}
        <View style={[styles.alignCenter, styles.mb6]}>
          <Text style={{ fontSize: 14, color: theme.secondaryText, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>⚔️ Drummer Showdown</Text>
          <Text style={[styles.bandPageTitle, { color: theme.text, textAlign: 'center' }]}>{comparison.title}</Text>
        </View>

        {/* VS Card */}
        <View style={{ flexDirection: isMobile ? 'column' : 'row', gap: 16, marginBottom: 24, alignItems: 'stretch' }}>
          <TouchableOpacity style={{ flex: 1, backgroundColor: theme.card, borderRadius: 12, padding: 20, borderColor: theme.primary, borderWidth: 2, alignItems: 'center' }} onPress={() => drummer1 && onSelectDrummer(drummer1.id)} disabled={!drummer1}>
            {drummer1?.image ? (
              <Image source={{ uri: getOptimizedImageUrl(drummer1.image, { width: 200 }) }} style={{ width: 120, height: 120, borderRadius: 60, marginBottom: 12, borderWidth: 3, borderColor: theme.primary }} />
            ) : (
              <View style={{ width: 120, height: 120, borderRadius: 60, backgroundColor: theme.border, marginBottom: 12, alignItems: 'center', justifyContent: 'center' }}><Text style={styles.emojiText5}>🥁</Text></View>
            )}
            <Text style={{ fontSize: 22, fontWeight: 'bold', color: theme.text, marginBottom: 4, textAlign: 'center' }}>{drummer1?.name || comparison.drummers[0]}</Text>
            <Text style={{ fontSize: 16, color: theme.secondaryText, marginBottom: 8, textAlign: 'center' }}>{drummer1?.band || ''}</Text>
            <Text style={{ fontSize: 13, color: theme.secondaryText, textAlign: 'center' }}>{drummer1?.genre || ''}</Text>
          </TouchableOpacity>

          <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: isMobile ? 8 : 0 }}>
            <View style={{ backgroundColor: theme.primary, width: 60, height: 60, borderRadius: 30, alignItems: 'center', justifyContent: 'center' }}><Text style={{ color: theme.text, fontWeight: 'bold', fontSize: 20 }}>VS</Text></View>
          </View>

          <TouchableOpacity style={{ flex: 1, backgroundColor: theme.card, borderRadius: 12, padding: 20, borderColor: '#3b82f6', borderWidth: 2, alignItems: 'center' }} onPress={() => drummer2 && onSelectDrummer(drummer2.id)} disabled={!drummer2}>
            {drummer2?.image ? (
              <Image source={{ uri: getOptimizedImageUrl(drummer2.image, { width: 200 }) }} style={{ width: 120, height: 120, borderRadius: 60, marginBottom: 12, borderWidth: 3, borderColor: '#3b82f6' }} />
            ) : (
              <View style={{ width: 120, height: 120, borderRadius: 60, backgroundColor: theme.border, marginBottom: 12, alignItems: 'center', justifyContent: 'center' }}><Text style={styles.emojiText5}>🥁</Text></View>
            )}
            <Text style={{ fontSize: 22, fontWeight: 'bold', color: theme.text, marginBottom: 4, textAlign: 'center' }}>{drummer2?.name || comparison.drummers[1]}</Text>
            <Text style={{ fontSize: 16, color: theme.secondaryText, marginBottom: 8, textAlign: 'center' }}>{drummer2?.band || ''}</Text>
            <Text style={{ fontSize: 13, color: theme.secondaryText, textAlign: 'center' }}>{drummer2?.genre || ''}</Text>
          </TouchableOpacity>
        </View>

        {/* Community Vote Widget */}
        <View style={{ marginBottom: 24, backgroundColor: theme.card, borderRadius: 12, padding: 20, borderColor: theme.border, borderWidth: 1 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: theme.text, marginBottom: 16, textAlign: 'center' }}>🗳️ Who's Your Favorite?</Text>
          <View style={[styles.flexRow, styles.gap3, styles.mb4]}>
            <TouchableOpacity style={{ flex: 1, backgroundColor: vote === 'drummer1' ? theme.primary : theme.background, padding: 16, borderRadius: 8, borderWidth: 2, borderColor: theme.primary, alignItems: 'center', opacity: hasVoted && vote !== 'drummer1' ? 0.6 : 1 }} onPress={() => handleVote('drummer1')} disabled={hasVoted}>
              <Text style={{ color: theme.text, fontWeight: '600', fontSize: 14 }}>{drummer1?.name || 'Drummer 1'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1, backgroundColor: vote === 'drummer2' ? '#3b82f6' : theme.background, padding: 16, borderRadius: 8, borderWidth: 2, borderColor: '#3b82f6', alignItems: 'center', opacity: hasVoted && vote !== 'drummer2' ? 0.6 : 1 }} onPress={() => handleVote('drummer2')} disabled={hasVoted}>
              <Text style={{ color: theme.text, fontWeight: '600', fontSize: 14 }}>{drummer2?.name || 'Drummer 2'}</Text>
            </TouchableOpacity>
          </View>
          {hasVoted && (
            <View>
              <View style={styles.rowLayout11}>
                <View style={{ flex: drummer1Percent, backgroundColor: theme.primary }} />
                <View style={{ flex: drummer2Percent, backgroundColor: '#3b82f6' }} />
              </View>
              <View style={styles.flexRowBetween}>
                <Text style={{ color: theme.text, fontSize: 14 }}>{drummer1Percent}%</Text>
                <Text style={[styles.textSm, { color: theme.secondaryText }]}>{totalVotes} votes</Text>
                <Text style={{ color: theme.text, fontSize: 14 }}>{drummer2Percent}%</Text>
              </View>
            </View>
          )}
          {!hasVoted && <Text style={{ color: theme.secondaryText, fontSize: 13, textAlign: 'center' }}>Cast your vote to see the results!</Text>}
        </View>

        {/* Gear Comparison */}
        {(drummer1?.gear || drummer2?.gear) && (
          <View style={[styles.contentCardMd, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={[styles.sectionHeaderXl, { color: theme.text }]}>🥁 Gear Comparison</Text>
            <View style={{ borderTopWidth: 1, borderColor: theme.border }}>
              <View style={{ flexDirection: 'row', backgroundColor: theme.background, paddingVertical: 12, paddingHorizontal: 8 }}>
                <Text style={{ flex: 1, fontWeight: '600', color: theme.text, fontSize: 14 }}>Gear</Text>
                <Text style={{ flex: 1, fontWeight: '600', color: theme.primary, fontSize: 14, textAlign: 'center' }}>{drummer1?.name?.split(' ')[0] || 'D1'}</Text>
                <Text style={styles.flexOne2}>{drummer2?.name?.split(' ')[0] || 'D2'}</Text>
              </View>
              {['drums', 'snare', 'cymbals', 'hardware', 'sticks'].map((key, i) => (
                <View key={key} style={{ flexDirection: 'row', paddingVertical: 12, paddingHorizontal: 8, borderTopWidth: 1, borderColor: theme.border, backgroundColor: i % 2 === 0 ? 'transparent' : theme.background }}>
                  <Text style={{ flex: 1, color: theme.secondaryText, fontSize: 13, textTransform: 'capitalize' }}>{key}</Text>
                  <Text style={{ flex: 1, color: theme.text, fontSize: 12, textAlign: 'center' }} numberOfLines={2}>{drummer1?.gear?.[key] || '-'}</Text>
                  <Text style={{ flex: 1, color: theme.text, fontSize: 12, textAlign: 'center' }} numberOfLines={2}>{drummer2?.gear?.[key] || '-'}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Head-to-Head Analysis */}
        <View style={[styles.contentCardMd, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.sectionHeaderXl, { color: theme.text }]}>🎯 Head-to-Head</Text>
          {Object.entries(comparison.comparison).map(([key, value]) => (
            <View key={key} style={styles.mb4}>
              <Text style={{ color: theme.text, fontWeight: '600', fontSize: 15, marginBottom: 6, textTransform: 'capitalize' }}>
                {key === 'forMetal' ? '🤘 For Metal' : key === 'style' ? '🎨 Style' : key === 'technique' ? '⚡ Technique' : key === 'gear' ? '🥁 Gear' : key === 'influence' ? '🌟 Influence' : key}
              </Text>
              <Text style={[styles.textSm, styles.lineHeightSm, { color: theme.secondaryText }]}>{value}</Text>
            </View>
          ))}
        </View>

        {/* Signature Videos */}
        {((drummer1?.videos && drummer1.videos.length > 0) || (drummer2?.videos && drummer2.videos.length > 0)) && (
          <View style={{ marginBottom: 24, backgroundColor: theme.card, borderRadius: 12, padding: 16, borderColor: theme.border, borderWidth: 1 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: theme.text, marginBottom: 16 }}>🎬 Signature Videos</Text>
            <View style={{ flexDirection: isMobile ? 'column' : 'row', gap: 16 }}>
              {/* Drummer 1 Video */}
              {drummer1?.videos && drummer1.videos.length > 0 && (
                <View style={{ flex: 1 }}>
                  <Text style={{ color: theme.primary, fontWeight: '600', fontSize: 14, marginBottom: 8 }}>{drummer1.name}</Text>
                  <YouTubeEmbed
                    videoId={drummer1.videos[0].id}
                    title={`${drummer1.name} - ${drummer1.videos[0].title}`}
                    theme={theme}
                  />
                  <Text style={{ color: theme.secondaryText, fontSize: 12, marginTop: 4 }}>{drummer1.videos[0].title}</Text>
                </View>
              )}
              {/* Drummer 2 Video */}
              {drummer2?.videos && drummer2.videos.length > 0 && (
                <View style={{ flex: 1 }}>
                  <Text style={{ color: '#3b82f6', fontWeight: '600', fontSize: 14, marginBottom: 8 }}>{drummer2.name}</Text>
                  <YouTubeEmbed
                    videoId={drummer2.videos[0].id}
                    title={`${drummer2.name} - ${drummer2.videos[0].title}`}
                    theme={theme}
                  />
                  <Text style={{ color: theme.secondaryText, fontSize: 12, marginTop: 4 }}>{drummer2.videos[0].title}</Text>
                </View>
              )}
            </View>
          </View>
        )}

        {/* Career Stats */}
        <View style={{ marginBottom: 24, backgroundColor: theme.card, borderRadius: 12, padding: 16, borderColor: theme.border, borderWidth: 1 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: theme.text, marginBottom: 16 }}>📊 Career Stats</Text>
          <View style={{ borderTopWidth: 1, borderColor: theme.border }}>
            <View style={{ flexDirection: 'row', backgroundColor: theme.background, paddingVertical: 12, paddingHorizontal: 8 }}>
              <Text style={{ flex: 1, fontWeight: '600', color: theme.text, fontSize: 14 }}>Stat</Text>
              <Text style={{ flex: 1, fontWeight: '600', color: theme.primary, fontSize: 14, textAlign: 'center' }}>{drummer1?.name?.split(' ')[0] || 'D1'}</Text>
              <Text style={{ flex: 1, fontWeight: '600', color: '#3b82f6', fontSize: 14, textAlign: 'center' }}>{drummer2?.name?.split(' ')[0] || 'D2'}</Text>
            </View>
            <View style={{ flexDirection: 'row', paddingVertical: 12, paddingHorizontal: 8, borderTopWidth: 1, borderColor: theme.border }}>
              <Text style={{ flex: 1, color: theme.secondaryText, fontSize: 13 }}>Primary Band</Text>
              <Text style={{ flex: 1, color: theme.text, fontSize: 12, textAlign: 'center' }}>{drummer1?.band || '-'}</Text>
              <Text style={{ flex: 1, color: theme.text, fontSize: 12, textAlign: 'center' }}>{drummer2?.band || '-'}</Text>
            </View>
            <View style={{ flexDirection: 'row', paddingVertical: 12, paddingHorizontal: 8, borderTopWidth: 1, borderColor: theme.border, backgroundColor: theme.background }}>
              <Text style={{ flex: 1, color: theme.secondaryText, fontSize: 13 }}>Genre</Text>
              <Text style={{ flex: 1, color: theme.text, fontSize: 12, textAlign: 'center' }}>{drummer1?.genre || '-'}</Text>
              <Text style={{ flex: 1, color: theme.text, fontSize: 12, textAlign: 'center' }}>{drummer2?.genre || '-'}</Text>
            </View>
            <View style={{ flexDirection: 'row', paddingVertical: 12, paddingHorizontal: 8, borderTopWidth: 1, borderColor: theme.border }}>
              <Text style={{ flex: 1, color: theme.secondaryText, fontSize: 13 }}>Country</Text>
              <Text style={{ flex: 1, color: theme.text, fontSize: 12, textAlign: 'center' }}>{drummer1?.country || '-'}</Text>
              <Text style={{ flex: 1, color: theme.text, fontSize: 12, textAlign: 'center' }}>{drummer2?.country || '-'}</Text>
            </View>
          </View>
        </View>

        {/* Verdict */}
        <View style={{ marginBottom: 24, backgroundColor: theme.primary, borderRadius: 12, padding: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: theme.text, marginBottom: 12 }}>🏆 The Verdict</Text>
          <Text style={{ color: theme.text, fontSize: 15, lineHeight: 24, opacity: 0.9 }}>{comparison.verdict}</Text>
        </View>

        {/* Related Comparisons */}
        <RelatedComparisons 
          currentSlug={comparisonSlug} 
          drummerSlugs={comparison.drummers}
          theme={theme} 
          allDrummers={drummers}
          onSelectComparison={(slug) => {
            if (Platform.OS === 'web' && typeof window !== 'undefined') {
              window.history.pushState({}, '', `/vs/${slug}`);
              window.dispatchEvent(new PopStateEvent('popstate'));
            }
          }}
        />

        {/* Browse More */}
        <View style={{ backgroundColor: theme.card, borderRadius: 12, padding: 16, borderColor: theme.border, borderWidth: 1, alignItems: 'center' }}>
          <Text style={{ color: theme.secondaryText, fontSize: 14, marginBottom: 12 }}>Looking for more showdowns?</Text>
          <TouchableOpacity onPress={onBack} style={{ backgroundColor: theme.text, paddingHorizontal: 24, paddingVertical: 12, borderRadius: 8 }}>
            <Text style={{ color: theme.background, fontWeight: '600', fontSize: 14 }}>Browse All Comparisons →</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

// ==========================================
// DRUMMING TECHNIQUES PAGES (Issue #344)
// ==========================================

// Techniques Index Page - List all drumming techniques
function TechniquesIndexPage({ theme, onBack, onSelectTechnique, onSelectDrummer, drummers }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const [isLoaded, setIsLoaded] = useState(isTechniquesLoaded());
  
  // Wait for techniques module to load
  useEffect(() => {
    if (!isLoaded) {
      preloadTechniques();
      const unsubscribe = onTechniquesLoaded(() => setIsLoaded(true));
      return unsubscribe;
    }
  }, [isLoaded]);
  
  const allTechniques = getAllTechniques();
  const TECHNIQUE_CATEGORIES = getTechniqueCategories();

  // Group techniques by category
  const techniquesByCategory = useMemo(() => {
    const groups = {};
    allTechniques.forEach(t => {
      if (!groups[t.category]) groups[t.category] = [];
      groups[t.category].push(t);
    });
    return groups;
  }, [allTechniques]);

  const categoryOrder = ['foundational', 'extreme', 'progressive', 'production'];

  // Update SEO
  useEffect(() => {
    updateTechniqueMeta(null);
  }, []);

  const getDifficultyColor = (difficulty) => {
    const colors = {
      beginner: theme.success,
      intermediate: '#eab308',
      advanced: theme.warning,
      expert: theme.primary,
    };
    return colors[difficulty] || '#6b7280';
  };

  const getDifficultyLabel = (difficulty) => {
    const labels = {
      beginner: 'Beginner',
      intermediate: 'Intermediate',
      advanced: 'Advanced',
      expert: 'Expert',
    };
    return labels[difficulty] || difficulty;
  };

  // Show loading state while module is loading
  if (!isLoaded) {
    return (
      <ScrollView style={[styles.detailContainer, { backgroundColor: theme.background }]}>
        <View style={styles.detailContent}>
          <TouchableOpacity
            onPress={onBack}
            style={[styles.backButton, { backgroundColor: theme.card, borderColor: theme.border }]}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Text style={[styles.backButtonText, { color: theme.text }]}>← Back</Text>
          </TouchableOpacity>
          <Text style={[styles.bandPageTitle, { color: theme.text }]}>🥁 Metal Drumming Techniques</Text>
          <Text style={[styles.bandPageSubtitle, { color: theme.secondaryText, marginBottom: 24 }]}>
            Master the essential techniques of metal drumming. From blast beats to polyrhythms, learn how the pros do it.
          </Text>
          <View style={styles.centeredLayout2}>
            <Text style={styles.emojiText1}>⏳</Text>
            <Text style={{ color: theme.secondaryText }}>Loading techniques...</Text>
          </View>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={[styles.detailContainer, { backgroundColor: theme.background }]}>
      <View style={styles.detailContent}>
        <TouchableOpacity
          onPress={onBack}
          style={[styles.backButton, { backgroundColor: theme.card, borderColor: theme.border }]}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Text style={[styles.backButtonText, { color: theme.text }]}>← Back</Text>
        </TouchableOpacity>

        <Text style={[styles.bandPageTitle, { color: theme.text }]}>🥁 Metal Drumming Techniques</Text>
        <Text style={[styles.bandPageSubtitle, { color: theme.secondaryText, marginBottom: 24 }]}>
          Master the essential techniques of metal drumming. From blast beats to polyrhythms, learn how the pros do it.
        </Text>

        {categoryOrder.map(category => {
          const techniques = techniquesByCategory[category] || [];
          if (techniques.length === 0) return null;
          const categoryInfo = TECHNIQUE_CATEGORIES[category];

          return (
            <View key={category} style={styles.mb8}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: theme.text, marginBottom: 8 }}>
                {categoryInfo?.emoji} {categoryInfo?.label || category}
              </Text>
              <Text style={{ fontSize: 14, color: theme.secondaryText, marginBottom: 16 }}>
                {categoryInfo?.description}
              </Text>
              <View style={{ 
                flexDirection: 'row', 
                flexWrap: 'wrap', 
                gap: 16,
                justifyContent: isMobile ? 'center' : 'flex-start'
              }}>
                {techniques.map(technique => (
                  <TouchableOpacity
                    key={technique.slug}
                    style={{
                      backgroundColor: theme.card,
                      borderColor: theme.border,
                      borderWidth: 1,
                      borderRadius: 12,
                      padding: 16,
                      width: isMobile ? '100%' : 'calc(50% - 8px)',
                      maxWidth: 400,
                    }}
                    onPress={() => onSelectTechnique(technique.slug)}
                    accessibilityRole="button"
                    accessibilityLabel={`Learn ${technique.title} technique`}
                  >
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                      <Text style={styles.textXl}>{technique.emoji}</Text>
                      <View style={{ 
                        backgroundColor: getDifficultyColor(technique.difficulty) + '20',
                        paddingHorizontal: 8,
                        paddingVertical: 4,
                        borderRadius: 6,
                      }}>
                        <Text style={{ 
                          color: getDifficultyColor(technique.difficulty), 
                          fontWeight: '600', 
                          fontSize: 12 
                        }}>
                          {getDifficultyLabel(technique.difficulty)}
                        </Text>
                      </View>
                    </View>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: theme.text, marginBottom: 4 }}>
                      {technique.title}
                    </Text>
                    <Text style={{ color: theme.secondaryText, fontSize: 14, marginBottom: 8 }} numberOfLines={2}>
                      {technique.description.substring(0, 100)}...
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
                      <Text style={[styles.textXs, { color: theme.secondaryText }]}>
                        ⚡ {technique.bpmRange} BPM
                      </Text>
                      <Text style={{ color: theme.primary, fontWeight: '600', fontSize: 14 }}>
                        Learn →
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          );
        })}

        {/* SEO Footer */}
        <View style={{ marginTop: 24, padding: 20, backgroundColor: theme.card, borderRadius: 12, borderColor: theme.border, borderWidth: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: '600', color: theme.text, marginBottom: 8 }}>
            🎯 Mastering Metal Drumming
          </Text>
          <Text style={[styles.textSm, styles.lineHeightSm, { color: theme.secondaryText }]}>
            Whether you're learning blast beats for death metal, mastering double bass for thrash, or exploring polyrhythms for progressive metal, these techniques will take your drumming to the next level. Each guide includes history, learning tips, gear recommendations, and examples from the masters of the technique.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

// Technique Detail Page - Single technique view
function TechniqueDetailPage({ techniqueSlug, theme, onBack, onSelectDrummer, onSelectTechnique, drummers }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const [isLoaded, setIsLoaded] = useState(isTechniquesLoaded());
  
  // Wait for techniques module to load
  useEffect(() => {
    if (!isLoaded) {
      preloadTechniques();
      const unsubscribe = onTechniquesLoaded(() => setIsLoaded(true));
      return unsubscribe;
    }
  }, [isLoaded]);
  
  const technique = getTechniqueBySlug(techniqueSlug);
  const relatedTechniques = getRelatedTechniques(techniqueSlug);
  const TECHNIQUE_CATEGORIES = getTechniqueCategories();

  // Update SEO
  useEffect(() => {
    if (technique) {
      updateTechniqueMeta(technique);
    }
  }, [technique]);

  // Show loading state while module is loading
  if (!isLoaded) {
    return (
      <View style={[styles.detailContainer, { backgroundColor: theme.background, alignItems: 'center', justifyContent: 'center', padding: 40 }]}>
        <Text style={styles.emojiText6}>⏳</Text>
        <Text style={{ fontSize: 18, color: theme.secondaryText }}>Loading technique...</Text>
      </View>
    );
  }

  if (!technique) {
    return (
      <View style={[styles.detailContainer, { backgroundColor: theme.background, alignItems: 'center', justifyContent: 'center', padding: 40 }]}>
        <Text style={styles.emojiText6}>🥁</Text>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: theme.text, marginBottom: 8 }}>Technique Not Found</Text>
        <Text style={{ color: theme.secondaryText, marginBottom: 24 }}>This technique page doesn't exist.</Text>
        <TouchableOpacity
          onPress={onBack}
          style={{ backgroundColor: theme.primary, paddingHorizontal: 24, paddingVertical: 12, borderRadius: 8 }}
        >
          <Text style={{ color: theme.text, fontWeight: '600' }}>Back to Techniques</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const getDifficultyColor = (difficulty) => {
    const colors = {
      beginner: theme.success,
      intermediate: '#eab308',
      advanced: theme.warning,
      expert: theme.primary,
    };
    return colors[difficulty] || '#6b7280';
  };

  const getDifficultyLabel = (difficulty) => {
    const labels = {
      beginner: 'Beginner',
      intermediate: 'Intermediate',
      advanced: 'Advanced',
      expert: 'Expert',
    };
    return labels[difficulty] || difficulty;
  };

  // Find drummers who have profiles on the site (for linking)
  const findDrummerProfile = (slug) => {
    if (!slug || !drummers) return null;
    return drummers.find(d => toSlug(d.name) === slug);
  };

  return (
    <ScrollView style={[styles.detailContainer, { backgroundColor: theme.background }]}>
      <View style={styles.detailContent}>
        <TouchableOpacity
          onPress={onBack}
          style={[styles.backButton, { backgroundColor: theme.card, borderColor: theme.border }]}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Text style={[styles.backButtonText, { color: theme.text }]}>← Back</Text>
        </TouchableOpacity>

        {/* Header */}
        <View style={styles.mb6}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12, flexWrap: 'wrap', gap: 12 }}>
            <Text style={styles.loadingEmojiLg}>{technique.emoji}</Text>
            <View style={styles.flex1}>
              <Text style={[styles.bandPageTitle, { color: theme.text, marginBottom: 4 }]}>{technique.title}</Text>
              <View style={styles.rowLayout16}>
                <View style={{ 
                  backgroundColor: getDifficultyColor(technique.difficulty) + '20',
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                  borderRadius: 6,
                }}>
                  <Text style={{ 
                    color: getDifficultyColor(technique.difficulty), 
                    fontWeight: '600', 
                    fontSize: 14 
                  }}>
                    {getDifficultyLabel(technique.difficulty)}
                  </Text>
                </View>
                <Text style={[styles.textSm, { color: theme.secondaryText }]}>
                  ⚡ {technique.bpmRange} BPM
                </Text>
                <Text style={[styles.textSm, { color: theme.secondaryText }]}>
                  📁 {TECHNIQUE_CATEGORIES[technique.category]?.label}
                </Text>
              </View>
            </View>
          </View>
          <Text style={{ color: theme.text, fontSize: 16, lineHeight: 26 }}>
            {technique.description}
          </Text>
        </View>

        {/* History & Origins */}
        <View style={[styles.contentCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.sectionHeaderLg, { color: theme.text }]}>
            📜 History & Origins
          </Text>
          <Text style={{ color: theme.secondaryText, fontSize: 15, lineHeight: 24 }}>
            {technique.history}
          </Text>
        </View>

        {/* How to Learn */}
        <View style={[styles.contentCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.sectionHeaderLg, { color: theme.text }]}>
            📚 How to Learn
          </Text>
          {technique.howToLearn.map((step, index) => (
            <View key={index} style={[styles.flexRow, styles.mb3]}>
              <View style={{ 
                width: 24, 
                height: 24, 
                borderRadius: 12, 
                backgroundColor: theme.primary + '20',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 12,
                marginTop: 2,
              }}>
                <Text style={{ color: theme.primary, fontWeight: 'bold', fontSize: 12 }}>{index + 1}.</Text>
              </View>
              <Text style={{ color: theme.text, fontSize: 15, lineHeight: 22, flex: 1 }}>
                {step}
              </Text>
            </View>
          ))}
        </View>

        {/* Variations */}
        {technique.variations && technique.variations.length > 0 && (
          <View style={[styles.contentCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={[styles.sectionHeaderLg, { color: theme.text }]}>
              🔀 Variations
            </Text>
            {technique.variations.map((variation, index) => (
              <View key={index} style={{ marginBottom: 12, paddingLeft: 12, borderLeftWidth: 3, borderLeftColor: theme.primary }}>
                <Text style={{ color: theme.text, fontWeight: '600', fontSize: 15, marginBottom: 4 }}>
                  {variation.name}
                </Text>
                <Text style={[styles.textSm, styles.lineHeightSm, { color: theme.secondaryText }]}>
                  {variation.description}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Masters of This Technique */}
        {technique.masters && technique.masters.length > 0 && (
          <View style={[styles.contentCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={[styles.sectionHeaderLg, { color: theme.text }]}>
              🏆 Masters of This Technique
            </Text>
            <View style={[styles.flexRowWrap, styles.gap3]}>
              {technique.masters.map((master, index) => {
                const drummerProfile = findDrummerProfile(master.slug);
                const isClickable = drummerProfile !== null;

                return (
                  <TouchableOpacity
                    key={index}
                    disabled={!isClickable}
                    onPress={() => isClickable && onSelectDrummer(drummerProfile)}
                    style={{ 
                      backgroundColor: theme.background, 
                      borderRadius: 8, 
                      padding: 12,
                      borderColor: theme.border,
                      borderWidth: 1,
                      minWidth: isMobile ? '100%' : 'calc(50% - 6px)',
                      flex: isMobile ? 1 : 0,
                    }}
                    accessibilityRole={isClickable ? 'link' : 'text'}
                    accessibilityLabel={isClickable ? `View ${master.name}'s profile` : master.name}
                  >
                    <View style={styles.flexRowBetween}>
                      <View style={styles.flex1}>
                        <Text style={{ color: theme.text, fontWeight: '600', fontSize: 15 }}>
                          {master.name}
                        </Text>
                        <Text style={[styles.textSm, { color: theme.secondaryText }]}>
                          {master.band}
                        </Text>
                        {master.note && (
                          <Text style={{ color: theme.primary, fontSize: 12, marginTop: 4, fontStyle: 'italic' }}>
                            {master.note}
                          </Text>
                        )}
                      </View>
                      {isClickable && (
                        <Text style={{ color: theme.primary, fontWeight: '600' }}>→</Text>
                      )}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

        {/* Gear Recommendations */}
        {technique.gearRecommendations && (
          <View style={[styles.contentCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={[styles.sectionHeaderLg, { color: theme.text }]}>
              🛠️ Gear Recommendations
            </Text>
            {Object.entries(technique.gearRecommendations).map(([category, items]) => {
              if (category === 'tips') return null;
              if (!Array.isArray(items) || items.length === 0) return null;
              
              const categoryEmojis = {
                pedals: '🦶',
                snares: '🥁',
                sticks: '🥢',
                kicks: '🦵',
                heads: '⚪',
                triggers: '🎛️',
                modules: '💻',
                samples: '🔊',
                electronics: '⚡',
                cymbals: '🔔',
                drums: '🥁',
                toms: '🔵',
              };

              return (
                <View key={category} style={styles.mb4}>
                  <Text style={{ color: theme.text, fontWeight: '600', fontSize: 15, marginBottom: 8, textTransform: 'capitalize' }}>
                    {categoryEmojis[category] || '•'} {category}
                  </Text>
                  {items.map((item, index) => (
                    <View key={index} style={styles.paddedBox2}>
                      <Text style={{ color: theme.text, fontSize: 14 }}>
                        <Text style={styles.inlineStyle4}>{item.name}</Text>
                        {item.reason && <Text style={{ color: theme.secondaryText }}> — {item.reason}</Text>}
                      </Text>
                    </View>
                  ))}
                </View>
              );
            })}
            {technique.gearRecommendations.tips && (
              <View style={{ 
                marginTop: 12, 
                padding: 12, 
                backgroundColor: theme.primary + '10', 
                borderRadius: 8,
                borderLeftWidth: 4,
                borderLeftColor: theme.primary
              }}>
                <Text style={{ color: theme.text, fontWeight: '600', marginBottom: 4 }}>
                  💡 Pro Tip
                </Text>
                <Text style={[styles.textSm, styles.lineHeightSm, { color: theme.secondaryText }]}>
                  {technique.gearRecommendations.tips}
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Related Techniques */}
        {relatedTechniques && relatedTechniques.length > 0 && (
          <View style={[styles.contentCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={[styles.sectionHeaderLg, { color: theme.text }]}>
              🔗 Related Techniques
            </Text>
            <View style={[styles.flexRowWrap, styles.gap3]}>
              {relatedTechniques.map(related => (
                <TouchableOpacity
                  key={related.slug}
                  onPress={() => onSelectTechnique(related.slug)}
                  style={{ 
                    backgroundColor: theme.background, 
                    borderRadius: 8, 
                    padding: 12,
                    borderColor: theme.border,
                    borderWidth: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 8,
                  }}
                  accessibilityRole="link"
                  accessibilityLabel={`Learn ${related.title}`}
                >
                  <Text style={styles.inlineStyle5}>{related.emoji}</Text>
                  <View>
                    <Text style={{ color: theme.text, fontWeight: '600', fontSize: 14 }}>
                      {related.title}
                    </Text>
                    <Text style={[styles.textXs, { color: theme.secondaryText }]}>
                      {getDifficultyLevels()[related.difficulty]?.label}
                    </Text>
                  </View>
                  <Text style={{ color: theme.primary, marginLeft: 'auto' }}>→</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Browse All Techniques Link */}
        <View style={styles.centeredLayout6}>
          <TouchableOpacity
            onPress={onBack}
            style={{
              backgroundColor: theme.primary,
              paddingHorizontal: 24,
              paddingVertical: 12,
              borderRadius: 8,
            }}
          >
            <Text style={{ color: theme.background, fontWeight: '600' }}>
              Browse All Techniques →
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

// Quotes Page - Browse all drummer quotes
function QuotesPage({ theme, onBack, onSelectDrummer }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDrummerFilter, setSelectedDrummerFilter] = useState(null);
  const [allQuotes, setAllQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch quotes from /api/quotes endpoint
  useEffect(() => {
    fetch('/api/quotes')
      .then(res => res.json())
      .then(data => {
        setAllQuotes(data.quotes || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch quotes:', err);
        setLoading(false);
      });
  }, []);

  // Filter quotes by search and drummer
  const filteredQuotes = useMemo(() => {
    let results = allQuotes;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(q => 
        q.text.toLowerCase().includes(query) ||
        q.drummer.name.toLowerCase().includes(query) ||
        q.drummer.band.toLowerCase().includes(query) ||
        (q.source && q.source.toLowerCase().includes(query))
      );
    }
    
    if (selectedDrummerFilter) {
      results = results.filter(q => q.drummer.id === selectedDrummerFilter);
    }
    
    return results;
  }, [allQuotes, searchQuery, selectedDrummerFilter]);

  // Get unique drummers from quotes for the filter dropdown
  const drummersWithQuotes = useMemo(() => {
    const seen = new Set();
    return allQuotes
      .filter(q => q.drummer && !seen.has(q.drummer.id) && seen.add(q.drummer.id))
      .map(q => q.drummer);
  }, [allQuotes]);

  // Update SEO
  useEffect(() => {
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      document.title = 'Drummer Quotes - Wisdom from Metal Legends | MetalForge';
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
      setMeta('description', 'Browse quotes and wisdom from legendary metal drummers. Insights on drumming, music, and life from the greats.');
      setMeta('og:title', 'Drummer Quotes | MetalForge', true);
      setMeta('og:description', 'Wisdom from legendary metal drummers.', true);
    }
  }, []);

  return (
    <ScrollView style={[styles.detailContainer, { backgroundColor: theme.background }]}>
      <View style={styles.detailContent}>
        <TouchableOpacity
          onPress={onBack}
          style={[styles.backButton, { backgroundColor: theme.card, borderColor: theme.border }]}
          accessibilityRole="button"
          accessibilityLabel="Go back to home"
        >
          <Text style={[styles.backButtonText, { color: theme.text }]}>← Back to Home</Text>
        </TouchableOpacity>

        <Text style={[styles.quotesPageTitle, { color: theme.text }]} accessibilityRole="header">
          💬 Drummer Quotes
        </Text>
        <Text style={[styles.quotesPageSubtitle, { color: theme.secondaryText }]}>
          Wisdom, insights, and memorable words from legendary metal drummers.
        </Text>

        {/* Search and Filter */}
        <View style={[styles.quotesFilters, isMobile && styles.quotesFiltersMobile]}>
          <TextInput
            style={[styles.quotesSearchInput, { backgroundColor: theme.card, borderColor: theme.border, color: theme.text }]}
            placeholder="Search quotes..."
            placeholderTextColor={theme.secondaryText}
            value={searchQuery}
            onChangeText={setSearchQuery}
            // Mobile keyboard fix (Issue #469)
            inputMode="text"
            enterKeyHint="search"
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="off"
          />
          <View style={[styles.quotesDropdown, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <TouchableOpacity
              onPress={() => setSelectedDrummerFilter(null)}
              style={[
                styles.quotesDropdownItem,
                !selectedDrummerFilter && { backgroundColor: theme.border }
              ]}
            >
              <Text style={[styles.quotesDropdownText, { color: theme.text }]}>All Drummers</Text>
            </TouchableOpacity>
            {drummersWithQuotes.slice(0, 10).map(drummer => (
              <TouchableOpacity
                key={drummer.id}
                onPress={() => setSelectedDrummerFilter(drummer.id)}
                style={[
                  styles.quotesDropdownItem,
                  selectedDrummerFilter === drummer.id && { backgroundColor: theme.border }
                ]}
              >
                <Text style={[styles.quotesDropdownText, { color: theme.text }]} numberOfLines={1}>
                  {drummer.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Text style={[styles.quotesCount, { color: theme.secondaryText }]}>
          {loading ? 'Loading...' : `${filteredQuotes.length} quote${filteredQuotes.length !== 1 ? 's' : ''} found`}
        </Text>

        {/* Quotes List */}
        <View style={styles.quotesGrid}>
          {loading ? (
            <Text style={{ color: theme.secondaryText, textAlign: 'center', padding: 20 }}>
              Loading quotes...
            </Text>
          ) : filteredQuotes.map((quote, index) => (
            <TouchableOpacity
              key={`${quote.drummer.id}-${index}`}
              onPress={() => onSelectDrummer(quote.drummer.id)}
              style={[styles.quotePageCard, { backgroundColor: theme.card, borderColor: theme.border }]}
              accessibilityRole="button"
              accessibilityLabel={`Quote by ${quote.drummer.name}: ${quote.text.substring(0, 50)}...`}
            >
              <Text style={[styles.quotePageText, { color: theme.text }]}>
                "{quote.text}"
              </Text>
              <View style={styles.quotePageFooter}>
                <View style={styles.quotePageDrummer}>
                  <ImageWithFallback
                    source={{ uri: quote.drummer.image }}
                    style={styles.quotePageImage}
                    accessibilityLabel={`Photo of ${quote.drummer.name}`}
                    width={48}
                    height={48}
                    imageContext="thumbnail"
                  />
                  <View>
                    <Text style={[styles.quotePageName, { color: theme.text }]}>
                      {quote.drummer.name}
                    </Text>
                    <Text style={[styles.quotePageBand, { color: theme.secondaryText }]}>
                      {quote.drummer.band}
                    </Text>
                  </View>
                </View>
                {quote.source && (
                  <Text style={[styles.quotePageSource, { color: theme.secondaryText }]}>
                    — {quote.source}{quote.year ? ` (${quote.year})` : ''}
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {!loading && filteredQuotes.length === 0 && (
          <View style={styles.noQuotesContainer}>
            <Text style={[styles.noQuotesText, { color: theme.secondaryText }]}>
              {searchQuery || selectedDrummerFilter 
                ? 'No quotes match your search.' 
                : 'No quotes available yet.'}
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

// ==========================================
// NEWS PAGE COMPONENTS (Issue #514)
// Phase 6: Dedicated /news page
// ==========================================

/**
 * News skeleton component for loading states
 */
function NewsSkeleton({ count = 5 }) {
  const { theme } = useTheme();
  
  return (
    <View style={styles.gap4}>
      {Array.from({ length: count }).map((_, index) => (
        <View 
          key={index} 
          style={[
            styles.newsCardLarge,
            { backgroundColor: theme.card, borderColor: theme.border }
          ]}
        >
          <View style={{ height: 180, backgroundColor: theme.border, borderRadius: 8 }} />
          <View style={styles.gappedLayout4}>
            <View style={{ height: 20, width: '80%', backgroundColor: theme.border, borderRadius: 4 }} />
            <View style={{ height: 14, width: '100%', backgroundColor: theme.border, borderRadius: 4 }} />
            <View style={{ height: 14, width: '60%', backgroundColor: theme.border, borderRadius: 4 }} />
            <View style={[styles.flexRow, styles.gap2, styles.mt2]}>
              <View style={{ height: 24, width: 80, backgroundColor: theme.border, borderRadius: 12 }} />
              <View style={{ height: 24, width: 80, backgroundColor: theme.border, borderRadius: 12 }} />
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}

/**
 * Large news card for /news page - shows full article preview with drummer/band tags
 */
function NewsCardLarge({ item, theme, onDrummerPress, onBandPress }) {
  const handlePress = () => {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.open(item.link, '_blank', 'noopener,noreferrer');
    } else {
      Linking.openURL(item.link);
    }
  };

  // Format relative time
  const formatTimeAgo = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 60) return `${diffMins} min${diffMins !== 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
  };

  return (
    <View style={[styles.newsCardLarge, { backgroundColor: theme.card, borderColor: theme.border }]}>
      {item.image && (
        <TouchableOpacity onPress={handlePress} accessibilityRole="link">
          <ImageWithFallback
            source={{ uri: item.image }}
            style={styles.newsCardLargeImage}
            accessibilityLabel={`${item.title} image`}
            width={400}
            height={200}
            imageContext="detail"
          />
        </TouchableOpacity>
      )}
      <View style={styles.newsCardLargeContent}>
        <TouchableOpacity onPress={handlePress} accessibilityRole="link">
          <Text style={[styles.newsCardLargeTitle, { color: theme.text }]} numberOfLines={3}>
            {item.title}
          </Text>
        </TouchableOpacity>
        {item.snippet && (
          <Text style={[styles.newsCardLargeSnippet, { color: theme.secondaryText }]} numberOfLines={3}>
            {item.snippet}
          </Text>
        )}
        
        {/* Drummer/Band tags */}
        {(item.drummers?.length > 0 || item.bands?.length > 0) && (
          <View style={styles.newsTags}>
            {item.drummers?.map(d => (
              <TouchableOpacity
                key={d.id}
                onPress={() => onDrummerPress(d)}
                style={[styles.newsTag, styles.newsTagDrummer]}
                accessibilityRole="link"
                accessibilityLabel={`View ${d.name}'s profile`}
              >
                <Text style={styles.newsTagText}>🥁 {d.name}</Text>
              </TouchableOpacity>
            ))}
            {item.bands?.map(b => (
              <TouchableOpacity
                key={b.slug}
                onPress={() => onBandPress(b)}
                style={[styles.newsTag, styles.newsTagBand]}
                accessibilityRole="link"
                accessibilityLabel={`View ${b.name} band page`}
              >
                <Text style={styles.newsTagText}>🎸 {b.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        
        <View style={styles.newsCardLargeMeta}>
          <Text style={[styles.newsCardSource, { color: theme.primary }]}>
            {item.source}
          </Text>
          <Text style={[styles.newsCardTime, { color: theme.secondaryText }]}>
            {formatTimeAgo(item.pubDate)}
          </Text>
        </View>
      </View>
    </View>
  );
}

/**
 * Dedicated news page component - /news route
 */
function NewsPage({ theme, onBack, onNavigateToDrummer, onNavigateToBand }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState({ source: null });
  const [lastFetch, setLastFetch] = useState(null);

  // Format relative time for "Last updated" display
  const formatTimeAgo = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    
    if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
  };

  // Fetch news
  const fetchNews = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (filter.source) params.set('source', filter.source);
      params.set('limit', '50');
      
      const response = await fetch(`/api/news?${params}`);
      if (!response.ok) throw new Error('Failed to fetch news');
      
      const data = await response.json();
      setNews(data.items || []);
      setLastFetch(data.lastFetch);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  // Update SEO meta tags
  useEffect(() => {
    updateNewsMeta(lastFetch);
  }, [lastFetch]);

  // Handle drummer press - navigate to drummer profile
  const handleDrummerPress = (drummer) => {
    if (drummer.id) {
      onNavigateToDrummer(drummer.id);
    }
  };

  // Handle band press - navigate to band page
  const handleBandPress = (band) => {
    if (band.slug) {
      onNavigateToBand(band.slug);
    }
  };

  return (
    <ScrollView style={[styles.detailContainer, { backgroundColor: theme.background }]}>
      <View style={[styles.detailContent, isMobile && { paddingHorizontal: 16 }]}>
        {/* Header */}
        <View style={styles.newsPageHeader}>
          <TouchableOpacity
            onPress={onBack}
            style={[styles.backButton, { backgroundColor: theme.card, borderColor: theme.border }]}
            accessibilityRole="button"
            accessibilityLabel="Go back to home"
          >
            <Text style={[styles.backButtonText, { color: theme.text }]}>← Back to Home</Text>
          </TouchableOpacity>
          
          <Text style={[styles.newsPageTitle, { color: theme.text }]} accessibilityRole="header">
            📰 Metal News
          </Text>
          <Text style={[styles.newsPageSubtitle, { color: theme.secondaryText }]}>
            Latest news about drummers and bands in our database
          </Text>
          {lastFetch && (
            <Text style={[styles.newsLastUpdate, { color: theme.secondaryText }]}>
              Updated {formatTimeAgo(lastFetch)}
            </Text>
          )}
        </View>
        
        {/* Source filters */}
        <View style={styles.newsFilters}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <FilterChip
              label="All Sources"
              isActive={!filter.source}
              onPress={() => setFilter({ ...filter, source: null })}
              theme={theme}
            />
            <FilterChip
              label="Blabbermouth"
              isActive={filter.source === 'blabbermouth'}
              onPress={() => setFilter({ ...filter, source: 'blabbermouth' })}
              theme={theme}
            />
            <FilterChip
              label="Loudwire"
              isActive={filter.source === 'loudwire'}
              onPress={() => setFilter({ ...filter, source: 'loudwire' })}
              theme={theme}
            />
            <FilterChip
              label="Metal Injection"
              isActive={filter.source === 'metalinjection'}
              onPress={() => setFilter({ ...filter, source: 'metalinjection' })}
              theme={theme}
            />
          </ScrollView>
        </View>
        
        {/* News list */}
        {loading ? (
          <NewsSkeleton count={10} />
        ) : error ? (
          <View style={styles.newsEmpty}>
            <Text style={[styles.newsEmptyText, { color: theme.error || '#ff6b6b' }]}>
              Failed to load news: {error}
            </Text>
            <TouchableOpacity
              onPress={fetchNews}
              style={[styles.newsRetryButton, { backgroundColor: theme.primary }]}
            >
              <Text style={styles.newsRetryText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : news.length === 0 ? (
          <View style={styles.newsEmpty}>
            <Text style={[styles.newsEmptyText, { color: theme.secondaryText }]}>
              No news found matching your filters.
            </Text>
          </View>
        ) : (
          <View style={styles.gap4}>
            {news.map(item => (
              <NewsCardLarge
                key={item.id}
                item={item}
                theme={theme}
                onDrummerPress={handleDrummerPress}
                onBandPress={handleBandPress}
              />
            ))}
          </View>
        )}
        
        {/* Attribution */}
        <View style={[styles.newsAttribution, { borderTopColor: theme.border }]}>
          <Text style={[styles.newsAttributionText, { color: theme.secondaryText }]}>
            News aggregated from Blabbermouth, Loudwire, and Metal Injection.
            {'\n\n'}
            Click articles to read full stories on their original sites.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

// ==========================================
// HERO SECTION - Homepage hero with prominent search CTA (Issue #493)
// ==========================================

function HeroSection({ 
  theme, 
  searchValue, 
  onSearchChange, 
  onSearchFocus, 
  onSearchClear, 
  suggestions, 
  onSelectSuggestion, 
  showSuggestions, 
  searchInputRef,
  drummerCount,
  gearCount 
}) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <View style={[styles.heroSection, { backgroundColor: theme.background }]}>
      {/* Gradient overlay for visual depth */}
      {Platform.OS === 'web' && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `radial-gradient(ellipse at 50% 0%, ${colors.brand.primary}15 0%, transparent 60%)`,
            pointerEvents: 'none',
          }}
        />
      )}
      
      <View style={styles.heroContent}>
        {/* Logo/Branding */}
        <Text style={[styles.heroEmoji, { color: theme.text }]}>🥁</Text>
        
        {/* Headline */}
        <Text 
          style={[styles.heroHeadline, { color: theme.text }, isMobile && styles.heroHeadlineMobile]}
          accessibilityRole="header"
        >
          Discover what pro metal{'\n'}drummers actually use
        </Text>
        
        {/* Search CTA - Large and prominent */}
        <View style={styles.heroSearchContainer}>
          <View style={[styles.heroSearchWrapper, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={[styles.heroSearchIcon, { color: theme.secondaryText }]}>🔍</Text>
            <TextInput
              ref={searchInputRef}
              style={[styles.heroSearchInput, { color: theme.text }]}
              placeholder="Search drummers, bands, gear..."
              placeholderTextColor={theme.secondaryText}
              value={searchValue}
              onChangeText={onSearchChange}
              onFocus={onSearchFocus}
              accessibilityLabel="Search drummers by name, band, or gear brand"
              inputMode="text"
              enterKeyHint="search"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="off"
            />
            {searchValue ? (
              <TouchableOpacity onPress={onSearchClear} style={styles.heroSearchClearButton}>
                <Text style={[styles.heroSearchClearText, { color: theme.secondaryText }]}>✕</Text>
              </TouchableOpacity>
            ) : (
              !isMobile && (
                <View style={[styles.heroSearchShortcut, { backgroundColor: theme.background, borderColor: theme.border }]}>
                  <Text style={[styles.heroSearchShortcutText, { color: theme.secondaryText }]}>⌘K</Text>
                </View>
              )
            )}
          </View>
          {/* Search suggestions dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <View style={[styles.heroSuggestionsContainer, { backgroundColor: theme.card, borderColor: theme.border }]}>
              {suggestions.slice(0, 6).map((suggestion, index) => (
                <TouchableOpacity
                  key={`${suggestion.type}-${suggestion.id || index}`}
                  style={[styles.heroSuggestionItem, { borderBottomColor: theme.border }]}
                  onPress={() => onSelectSuggestion(suggestion)}
                >
                  <View style={styles.heroSuggestionContent}>
                    {suggestion.image && (
                      <ImageWithFallback
                        source={{ uri: suggestion.image }}
                        style={styles.heroSuggestionImage}
                        accessibilityLabel={`${suggestion.name} thumbnail`}
                        width={36}
                        height={36}
                        imageContext="thumbnail"
                      />
                    )}
                    <View style={styles.heroSuggestionText}>
                      <Text style={[styles.heroSuggestionTitle, { color: theme.text }]}>{suggestion.name}</Text>
                      <Text style={[styles.heroSuggestionSubtitle, { color: theme.secondaryText }]}>
                        {suggestion.type === 'drummer' ? suggestion.band : suggestion.type}
                      </Text>
                    </View>
                  </View>
                  <Text style={[styles.heroSuggestionType, { color: theme.secondaryText }]}>
                    {suggestion.type === 'drummer' ? '👤' : suggestion.type === 'band' ? '🎸' : '🥁'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
        
        {/* Stats line */}
        <View style={styles.heroStats}>
          <Text style={[styles.heroStatsText, { color: theme.secondaryText }]}>
            {drummerCount || 60} drummers • {gearCount || '500+'} gear items • Verified setups
          </Text>
        </View>
      </View>
    </View>
  );
}

// DrummersPage - Dedicated page for browsing all drummers with filters (Issue #497)
function DrummersPage({
  theme,
  drummers,
  filteredDrummers,
  onSelectDrummer,
  onBack,
  filters,
  onFilterChange,
  sortBy,
  onSortChange,
  searchValue,
  onSearchChange,
  onSearchClear,
}) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  // Update SEO meta tags for /drummers page
  useEffect(() => {
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      const hasFilters = filters.genre || filters.brand || filters.search;
      let title = 'All Metal Drummers';
      let description = `Browse all ${drummers.length} legendary metal drummers. Filter by genre, brand, and search by name or band.`;
      
      if (hasFilters) {
        const filterParts = [];
        if (filters.genre) {
          const genreLabel = FILTER_OPTIONS.genres.find(g => g.value === filters.genre)?.label || filters.genre;
          filterParts.push(genreLabel);
        }
        if (filters.brand) {
          const brandLabel = FILTER_OPTIONS.brands.find(b => b.value === filters.brand)?.label || filters.brand;
          filterParts.push(`${brandLabel} users`);
        }
        if (filters.search) {
          filterParts.push(`"${filters.search}"`);
        }
        title = `${filterParts.join(' • ')} Drummers`;
        description = `${filteredDrummers.length} metal drummers ${filterParts.length ? 'matching: ' + filterParts.join(', ') : ''}. Find your next drumming inspiration.`;
      }
      
      document.title = `${title} | MetalForge`;
      
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
      
      setMeta('description', description);
      setMeta('og:title', `${title} | MetalForge`, true);
      setMeta('og:description', description, true);
      setMeta('og:url', window.location.href, true);
    }
  }, [drummers.length, filteredDrummers.length, filters]);

  const handleClearAllFilters = () => {
    onFilterChange({ search: '', genre: '', brand: '', era: '' });
    onSearchClear();
    // Update URL to /drummers (no query params)
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.history.pushState({}, '', '/drummers');
    }
  };

  const hasActiveFilters = filters.genre || filters.brand || searchValue;

  return (
    <ScrollView style={[styles.detailContainer, { backgroundColor: theme.background }]}>
      <View style={styles.detailContent}>
        {/* Back to Home */}
        <TouchableOpacity
          onPress={onBack}
          style={[styles.backButton, { backgroundColor: theme.card, borderColor: theme.border }]}
          accessibilityRole="button"
          accessibilityLabel="Go back to home"
        >
          <Text style={[styles.backButtonText, { color: theme.text }]}>← Back to Home</Text>
        </TouchableOpacity>

        {/* Page Header */}
        <View style={styles.mb6}>
          <Text style={[styles.quotesPageTitle, { color: theme.text }]} accessibilityRole="header">
            🥁 All Drummers
          </Text>
          <Text style={[styles.quotesPageSubtitle, { color: theme.secondaryText }]}>
            Browse {drummers.length} legendary metal drummers. Filter by genre, brand, or search for your favorites.
          </Text>
        </View>

        {/* Search Input */}
        <View style={[styles.searchContainer, { marginBottom: 16 }]}>
          <View style={[styles.searchInputWrapper, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={[styles.searchIcon, { color: theme.secondaryText }]}>🔍</Text>
            <TextInput
              style={[styles.searchInput, { color: theme.text }]}
              placeholder="Search drummers, bands..."
              placeholderTextColor={theme.secondaryText}
              value={searchValue}
              onChangeText={onSearchChange}
              inputMode="text"
              autoCapitalize="none"
              autoCorrect={false}
            />
            {searchValue ? (
              <TouchableOpacity onPress={onSearchClear} style={styles.searchClearButton}>
                <Text style={[styles.searchClearText, { color: theme.secondaryText }]}>✕</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>

        {/* Filter Bar */}
        <FilterBar
          filters={filters}
          onFilterChange={(newFilters) => {
            onFilterChange(newFilters);
            // Update URL with new filters
            if (Platform.OS === 'web' && typeof window !== 'undefined') {
              const params = new URLSearchParams();
              if (newFilters.genre) params.set('genre', newFilters.genre);
              if (newFilters.brand) params.set('brand', newFilters.brand);
              if (newFilters.search) params.set('search', newFilters.search);
              if (newFilters.sort) params.set('sort', newFilters.sort);
              const queryString = params.toString();
              window.history.replaceState({}, '', queryString ? `/drummers?${queryString}` : '/drummers');
            }
          }}
          totalCount={drummers.length}
          filteredCount={filteredDrummers.length}
          onClearAll={handleClearAllFilters}
          theme={theme}
          sortBy={sortBy}
          onSortChange={onSortChange}
        />

        {/* Results count */}
        <View style={styles.my4}>
          <Text style={[styles.filterResultCount, { color: theme.secondaryText }]}>
            {filteredDrummers.length === drummers.length 
              ? `Showing ${drummers.length} drummers` 
              : `Showing ${filteredDrummers.length} of ${drummers.length} drummers`}
            {hasActiveFilters && (
              <Text style={{ color: theme.error }}> • </Text>
            )}
          </Text>
        </View>

        {/* Drummer Grid */}
        {filteredDrummers.length > 0 ? (
          <View style={[styles.gearFinderResultsGrid, isMobile && styles.gearFinderResultsGridMobile]}>
            {filteredDrummers.map((drummer) => (
              <TouchableOpacity
                key={drummer.id}
                onPress={() => onSelectDrummer(drummer.id)}
                style={[
                  styles.card,
                  isMobile ? { width: '100%' } : { width: '48%' },
                  { backgroundColor: theme.card, borderColor: theme.border }
                ]}
                accessibilityRole="button"
                accessibilityLabel={`View ${drummer.name}'s profile`}
              >
                <View style={styles.cardContent}>
                  <ImageWithFallback
                    source={{ uri: drummer.thumbnailUrl || drummer.image }}
                    style={styles.cardImage}
                    accessibilityLabel={`Photo of ${drummer.name}`}
                    width={60}
                    height={60}
                    imageContext="thumbnail"
                  />
                  <View style={styles.cardText}>
                    <Text style={[styles.drummerName, { color: theme.text }]}>{drummer.name}</Text>
                    <Text style={[styles.drummerBand, { color: theme.secondaryText }]}>{drummer.band}</Text>
                    {drummer.genre && (
                      <Text style={[styles.drummerGenre, { color: theme.accent }]}>{drummer.genre}</Text>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={styles.noResultsContainer}>
            <Text style={[styles.noResultsText, { color: theme.secondaryText }]}>
              No drummers found matching your criteria
            </Text>
            <TouchableOpacity 
              onPress={handleClearAllFilters} 
              style={[styles.clearFiltersButtonLarge, { borderColor: theme.text }]}
            >
              <Text style={[styles.clearFiltersButtonText, { color: theme.text }]}>Clear All Filters</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* SEO Content */}
        <View style={[styles.gearFinderSeoContent, { borderTopColor: theme.border }]}>
          <Text style={[styles.gearFinderSeoTitle, { color: theme.text }]}>
            Discover Metal Drumming Legends
          </Text>
          <Text style={[styles.gearFinderSeoText, { color: theme.secondaryText }]}>
            MetalForge is your definitive resource for metal drummer gear, setups, and inspiration. 
            Browse our comprehensive database of {drummers.length} legendary drummers from thrash, death metal, 
            black metal, progressive, and more. Each profile includes detailed gear information, 
            signature setups, and video performances.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

function DrummerList({
  theme,
  onSelectDrummer,
  drummers,
  loading,
  error,
  onNavigateToCompare,
  onNavigateToQuiz,
  onNavigateToKitQuiz,
  onNavigateToSpotlights,
  onNavigateToQuotes,
  onNavigateToGearByBudget,
  onNavigateToList,
  onNavigateToGearFinder,
  onNavigateToKitBuilder,
  onNavigateToBpmTap,
  onNavigateToBirthdayCalendar,
  onNavigateToGenresList,
  onNavigateToTechniques,
  onNavigateToDrummers,
  onNavigateToNews,
  spotlight,
  filters,
  onFilterChange,
  sortBy,
  onSortChange,
  filteredDrummers,
  searchValue,
  onSearchChange,
  onSearchClear,
  suggestions,
  showSuggestions,
  onSearchFocus,
  onSelectSuggestion,
  searchInputRef,
  showAllDrummers,
  onShowAllDrummers
}) {
  // CLS Optimization: Show skeleton loaders instead of spinner
  // Skeletons match the final layout dimensions to prevent layout shift
  if (loading) {
    return (
      <ScrollView 
        style={styles.listContainer}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Hero section skeleton - matches HeroSection dimensions (Issue #493) */}
        <HeroSectionSkeleton />
        {/* Action buttons render without data, no skeleton needed */}
        {/* Filter bar skeleton - below action buttons, above drummer list (Issue #506) */}
        <FilterBarSkeleton />
        {/* Spotlight section skeleton - matches DrummerSpotlight dimensions (Issue #324) */}
        <SpotlightSkeleton />
        {/* Drummer cards skeleton - show 6 to fill viewport */}
        <DrummerListSkeleton count={6} />
      </ScrollView>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={[styles.errorText, { color: theme.error }]}>Error: {error}</Text>
        <Text style={[styles.errorHint, { color: theme.secondaryText }]}>
          Make sure the backend is running on port 3001
        </Text>
      </View>
    );
  }

  const handleClearAllFilters = () => {
    // Clear all filters in one call - this updates URL to '/'
    onFilterChange({ search: '', genre: '', brand: '', era: '' });
    // Clear search input visual state (handleSearchClear now uses functional update
    // so it won't overwrite filters with stale closure values)
    onSearchClear();
  };

  // Header content that scrolls with the list
  const ListHeader = () => (
    <>
      {/* Hero Section with prominent search CTA (Issue #493) */}
      <HeroSection
        theme={theme}
        searchValue={searchValue}
        onSearchChange={onSearchChange}
        onSearchFocus={onSearchFocus}
        onSearchClear={onSearchClear}
        suggestions={suggestions}
        onSelectSuggestion={onSelectSuggestion}
        showSuggestions={showSuggestions}
        searchInputRef={searchInputRef}
        drummerCount={drummers.length}
        gearCount="500+"
      />
      <View style={styles.actionButtonsRow}>
        <TouchableOpacity
          onPress={onNavigateToCompare}
          style={[styles.compareButton, { backgroundColor: theme.card, borderColor: theme.border }]}
          accessibilityRole="button"
          accessibilityLabel="Compare drummers side by side"
        >
          <Text style={[styles.compareButtonText, { color: theme.text }]}>Compare Drummers</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onNavigateToQuiz}
          style={[styles.quizButton, { backgroundColor: theme.primary, borderColor: theme.primary }]}
          accessibilityRole="button"
          accessibilityLabel="Take the drummer personality quiz"
        >
          <Text style={[styles.quizButtonText, { color: theme.text }]}>🥁 Find Your Match</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.actionButtonsRow, { marginTop: -8 }]}>
        <TouchableOpacity
          onPress={onNavigateToQuotes}
          style={[styles.compareButton, { backgroundColor: theme.card, borderColor: theme.border }]}
          accessibilityRole="button"
          accessibilityLabel="Browse drummer interview quotes"
        >
          <Text style={[styles.compareButtonText, { color: theme.text }]}>💬 Quotes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onNavigateToGearFinder}
          style={[styles.quizButton, { backgroundColor: colors.buttons.secondary.bg, borderColor: colors.buttons.secondary.bg }]}
          accessibilityRole="button"
          accessibilityLabel="Search drummers by gear"
        >
          <Text style={[styles.quizButtonText, { color: colors.buttons.secondary.text }]}>🔍 Gear Finder</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.actionButtonsRow, { marginTop: -8 }]}>
        <TouchableOpacity
          onPress={onNavigateToKitBuilder}
          style={[styles.quizButton, { backgroundColor: theme.warning, borderColor: theme.warning }]}
          accessibilityRole="button"
          accessibilityLabel="Build your custom drum kit"
        >
          <Text style={[styles.quizButtonText, { color: theme.text }]}>🛠️ Kit Builder</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onNavigateToBpmTap}
          style={[styles.quizButton, { backgroundColor: colors.buttons.secondary.bg, borderColor: colors.buttons.secondary.bg }]}
          accessibilityRole="button"
          accessibilityLabel="BPM tap calculator"
        >
          <Text style={[styles.quizButtonText, { color: colors.buttons.secondary.text }]}>🎵 BPM Tap</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.actionButtonsRow, { marginTop: -8 }]}>
        <TouchableOpacity
          onPress={onNavigateToBirthdayCalendar}
          style={[styles.compareButton, { backgroundColor: theme.card, borderColor: theme.border }]}
          accessibilityRole="button"
          accessibilityLabel="View drummer birthday calendar"
        >
          <Text style={[styles.compareButtonText, { color: theme.text }]}>🎂 Birthdays</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onNavigateToGenresList}
          style={[styles.quizButton, { backgroundColor: colors.buttons.secondary.bg, borderColor: colors.buttons.secondary.bg }]}
          accessibilityRole="button"
          accessibilityLabel="Browse metal genres"
        >
          <Text style={[styles.quizButtonText, { color: colors.buttons.secondary.text }]}>🎸 Browse Genres</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.actionButtonsRow, { marginTop: -8 }]}>
        <TouchableOpacity
          onPress={onNavigateToTechniques}
          style={[styles.quizButton, { backgroundColor: theme.primary, borderColor: theme.primary }]}
          accessibilityRole="button"
          accessibilityLabel="Learn drumming techniques"
        >
          <Text style={[styles.quizButtonText, { color: theme.text }]}>🥁 Learn Techniques</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onNavigateToKitQuiz}
          style={[styles.quizButton, { backgroundColor: '#dc2626', borderColor: '#dc2626' }]}
          accessibilityRole="button"
          accessibilityLabel="Guess the drummer by kit quiz"
        >
          <Text style={[styles.quizButtonText, { color: '#fff' }]}>🎯 Kit Quiz</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.actionButtonsRow, { marginTop: -8 }]}>
        <TouchableOpacity
          onPress={onNavigateToNews}
          style={[styles.compareButton, { backgroundColor: theme.card, borderColor: theme.border }]}
          accessibilityRole="button"
          accessibilityLabel="View metal news"
        >
          <Text style={[styles.compareButtonText, { color: theme.text }]}>📰 Metal News</Text>
        </TouchableOpacity>
      </View>
      {/* Filter Bar - positioned below action buttons, above drummer list (Issue #506) */}
      <FilterBar
        filters={filters}
        onFilterChange={onFilterChange}
        totalCount={drummers.length}
        filteredCount={filteredDrummers.length}
        onClearAll={handleClearAllFilters}
        theme={theme}
        sortBy={sortBy}
        onSortChange={onSortChange}
      />
      {/* Drummer Spotlight Section */}
      {spotlight && (
        <DrummerSpotlight
          drummer={spotlight}
          theme={theme}
          onSelectDrummer={onSelectDrummer}
          onViewAllSpotlights={onNavigateToSpotlights}
        />
      )}
      {/* Top 10 Lists Section */}
      <TopListsSection theme={theme} onNavigateToList={onNavigateToList} />
      
      {/* Featured Drummers Section Header (Issue #496) */}
      {!showAllDrummers && !searchValue && !filters.genre && !filters.brand && (
        <View style={styles.featuredSection}>
          <Text style={[styles.featuredSectionTitle, { color: theme.text }]}>
            ⭐ Featured Drummers
          </Text>
          <Text style={[styles.featuredSectionSubtitle, { color: theme.secondaryText }]}>
            Legendary metal drummers to explore
          </Text>
        </View>
      )}
    </>
  );

  // Empty list message (should rarely show on homepage since we show featured drummers)
  const ListEmpty = () => (
    <View style={styles.noResultsContainer}>
      <Text style={[styles.noResultsText, { color: theme.secondaryText }]}>
        No drummers available
      </Text>
    </View>
  );

  // Footer with "View All Drummers" button (Issue #497) and Last Updated timestamp (Issue #449)
  const ListFooter = () => (
    <View>
      {/* View All Drummers button - navigates to /drummers page (Issue #497) */}
      <TouchableOpacity
        onPress={() => onNavigateToDrummers()}
        style={[styles.viewAllDrummersButton, { backgroundColor: theme.primary, borderColor: theme.primary }]}
        accessibilityRole="link"
        accessibilityLabel={`View all ${drummers.length} drummers`}
      >
        <Text style={[styles.viewAllDrummersText, { color: theme.text }]}>
          View All {drummers.length} Drummers →
        </Text>
      </TouchableOpacity>
      <View style={[styles.lastUpdatedContainer, { borderTopColor: theme.border }]}>
        {Platform.OS === 'web' ? (
          <time dateTime="2026-02-17" style={[styles.textXs, { color: theme.secondaryText }]}>
            Last updated: February 17, 2026
          </time>
        ) : (
          <Text style={[styles.lastUpdatedText, { color: theme.secondaryText }]}>
            Last updated: February 17, 2026
          </Text>
        )}
      </View>
    </View>
  );

  return (
    <FlatList
      style={styles.listWrapper}
      data={filteredDrummers}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item, index }) => (
        <DrummerCard
          drummer={item}
          theme={theme}
          onPress={() => onSelectDrummer(item.id)}
          index={index}
        />
      )}
      ListHeaderComponent={ListHeader}
      ListEmptyComponent={ListEmpty}
      ListFooterComponent={ListFooter}
      contentContainerStyle={styles.listContainer}
    />
  );
}


// ==========================================
// DRUMMERS PAGE ROUTING (Issue #497)
// ==========================================

// Check if we are on the /drummers page (full list with filters)
function isDrummersPage() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return false;
  const pathname = window.location.pathname;
  return pathname === '/drummers' || pathname.startsWith('/drummers?');
}

// Check if we're on the drummer compare page based on URL (requires query params like ?d1=1&d2=2)
function isComparePage() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return false;
  const pathname = window.location.pathname;
  const hasQueryParams = window.location.search.includes('d1=') || window.location.search.includes('d2=');
  // Only match /compare with drummer query params, not /compare/:slug
  return (pathname === '/compare' || pathname === '/compare/') && hasQueryParams;
}

// Check if we're on the quiz page based on URL (supports /quiz and /find-your-match)
function isQuizPage() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return false;
  const pathname = window.location.pathname;
  return pathname === '/quiz' || pathname.startsWith('/quiz?') || 
         pathname === '/find-your-match' || pathname.startsWith('/find-your-match?');
}

// Check if we're on the privacy policy page based on URL
function isPrivacyPage() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return false;
  const pathname = window.location.pathname;
  return pathname === '/privacy' || pathname.startsWith('/privacy?') ||
         pathname === '/privacy-policy' || pathname.startsWith('/privacy-policy?');
}

// Check if we're on the quotes page based on URL
function isQuotesPage() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return false;
  const pathname = window.location.pathname;
  return pathname === '/quotes' || pathname.startsWith('/quotes?');
}

// Check if we're on the gear-by-budget page based on URL
function isGearByBudgetPage() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return false;
  const pathname = window.location.pathname;
  return pathname === '/gear-by-budget' || pathname.startsWith('/gear-by-budget?') ||
         pathname === '/budget' || pathname.startsWith('/budget?');
}

// Get budget tier from URL params
function getBudgetTierFromURL() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  const tier = params.get('tier');
  return tier && BUDGET_TIERS[tier] ? tier : null;
}

// Update URL for budget tier filter
function updateBudgetTierURL(tier) {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return;
  const newPath = tier ? `/gear-by-budget?tier=${tier}` : '/gear-by-budget';
  window.history.replaceState({}, '', newPath);
}

// Check if we're on the gear finder page based on URL
function isGearFinderPage() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return false;
  const pathname = window.location.pathname;
  return pathname === '/gear-finder' || pathname.startsWith('/gear-finder?');
}

// Get gear finder search query from URL params
function getGearFinderQueryFromURL() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return '';
  const params = new URLSearchParams(window.location.search);
  return params.get('q') || '';
}

// Update URL for gear finder search
function updateGearFinderURL(query) {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return;
  const newPath = query ? `/gear-finder?q=${encodeURIComponent(query)}` : '/gear-finder';
  window.history.replaceState({}, '', newPath);
}

// Check if we're on the list index page (/lists)
function isListIndexPage() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return false;
  const pathname = window.location.pathname;
  return pathname === '/lists' || pathname === '/lists/';
}

// Check if we're on a specific list page (/lists/[slug])
function isListPage() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return false;
  const pathname = window.location.pathname;
  return pathname.startsWith('/lists/') && pathname !== '/lists/';
}

// Get list slug from URL
function getListSlugFromURL() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return null;
  const match = window.location.pathname.match(/^\/lists\/([a-z0-9-]+)$/);
  return match ? match[1] : null;
}

// Update URL for list page
function updateListURL(slug) {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return;
  const newPath = slug ? `/lists/${slug}` : '/lists';
  window.history.replaceState({}, '', newPath);
}

// Check if we're on a gear page based on URL
function getGearSlugFromURL() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return null;
  // Match /gear/item/:slug for individual gear items
  const itemMatch = window.location.pathname.match(/^\/gear\/item\/([a-z0-9-]+)$/);
  if (itemMatch) return itemMatch[1];
  // Legacy: also match /gear/:slug if it's a known gear item (not a category)
  const match = window.location.pathname.match(/^\/gear\/([a-z0-9-]+)$/);
  const knownCategories = ['cymbals', 'snares', 'drums', 'pedals', 'sticks', 'hardware'];
  return match && !knownCategories.includes(match[1]) ? match[1] : null;
}

// ==========================================
// GEAR CATEGORY PAGES (Issue #339)
// ==========================================

// Valid gear categories
const GEAR_CATEGORIES = ['cymbals', 'snares', 'drums', 'pedals', 'sticks', 'hardware'];

// Check if we're on the gear index page (/gear)
function isGearIndexPage() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return false;
  const pathname = window.location.pathname;
  return pathname === '/gear' || pathname === '/gear/';
}

// Check if we're on a gear category page (/gear/:category)
function isGearCategoryPage() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return false;
  const match = window.location.pathname.match(/^\/gear\/([a-z0-9-]+)$/);
  return match && GEAR_CATEGORIES.includes(match[1]);
}

// Get gear category from URL
function getGearCategoryFromURL() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return null;
  const match = window.location.pathname.match(/^\/gear\/([a-z0-9-]+)$/);
  return match && GEAR_CATEGORIES.includes(match[1]) ? match[1] : null;
}

// Update URL for gear category page
function updateGearCategoryURL(category) {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return;
  const newPath = category ? `/gear/${category}` : '/gear';
  window.history.pushState({}, '', newPath);
}

// Check if we're on a drummer profile page based on URL
function getDrummerSlugFromURL() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return null;
  // Match /drummer/:slug but not /drummer/:slug/bio
  const match = window.location.pathname.match(/^\/drummer\/([a-z0-9-]+)$/i);
  return match ? match[1] : null;
}

// Check if we're on a drummer bio page based on URL (/drummer/:slug/bio)
function getDrummerBioSlugFromURL() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return null;
  const match = window.location.pathname.match(/^\/drummer\/([a-z0-9-]+)\/bio$/i);
  return match ? match[1] : null;
}

// Check if we're on a bio page
function isBioPage() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return false;
  return /^\/drummer\/[a-z0-9-]+\/bio$/i.test(window.location.pathname);
}

// ==========================================
// BAND DETAIL ROUTING (Issue #349)
// ==========================================

// Check if we're on a band detail page (/bands/:slug)
function isBandDetailPage() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return false;
  return /^\/bands\/[a-z0-9-]+$/i.test(window.location.pathname);
}

// Get the band slug from URL
function getBandSlugFromURL() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return null;
  const match = window.location.pathname.match(/^\/bands\/([a-z0-9-]+)$/i);
  return match ? match[1] : null;
}

// Check if we're on the bands listing page (/bands)
function isBandsListPage() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return false;
  return window.location.pathname === '/bands' || window.location.pathname === '/bands/';
}

// Update URL for band detail page
function updateBandURL(slug) {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return;
  window.history.pushState({}, '', `/bands/${slug}`);
}

// ==========================================
// NEWS PAGE ROUTING (Issue #514)
// ==========================================

// Check if we're on the news page (/news)
function isNewsPage() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return false;
  return window.location.pathname === '/news' || window.location.pathname === '/news/';
}

// Update meta tags for news page SEO
function updateNewsMeta(lastFetch = null) {
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

  const title = 'Metal News - Latest Updates on Metal Drummers | MetalForge';
  const description = 'Stay updated with the latest news about metal drummers and bands. Gear announcements, tour dates, interviews and more from Blabbermouth, Loudwire, and Metal Injection.';

  document.title = title;
  setMeta('description', description);
  setMeta('og:title', title, true);
  setMeta('og:description', description, true);
  setMeta('og:type', 'website', true);
  setMeta('og:image', 'https://metalforge.io/og-news.png', true);
  setMeta('og:url', 'https://metalforge.io/news', true);
  setMeta('twitter:card', 'summary_large_image');
  setMeta('twitter:title', title);
  setMeta('twitter:description', description);
  setMeta('twitter:image', 'https://metalforge.io/og-news.png');

  // Set canonical URL
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', 'https://metalforge.io/news');

  // Add CollectionPage schema
  const schemaId = 'news-page-schema';
  let existingSchema = document.getElementById(schemaId);
  if (existingSchema) {
    existingSchema.remove();
  }
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Metal News",
    "description": "Latest news about metal drummers and bands",
    "url": "https://metalforge.io/news",
    "isPartOf": { "@id": "https://metalforge.io" },
    "dateModified": lastFetch || new Date().toISOString(),
  };
  const schemaScript = document.createElement('script');
  schemaScript.id = schemaId;
  schemaScript.type = 'application/ld+json';
  schemaScript.textContent = JSON.stringify(schema);
  document.head.appendChild(schemaScript);
}

// ==========================================
// GENRE PAGE ROUTING (Issue #340)
// ==========================================

// Check if we're on a genre landing page (/genre/:slug)
function isGenreLandingPage() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return false;
  return /^\/genre\/[a-z0-9-]+$/i.test(window.location.pathname);
}

// Get the genre slug from URL
function getGenreSlugFromURL() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return null;
  const match = window.location.pathname.match(/^\/genre\/([a-z0-9-]+)$/i);
  return match ? match[1] : null;
}

// Check if we're on the genres listing page (/genres)
function isGenresListPage() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return false;
  return window.location.pathname === '/genres' || window.location.pathname === '/genres/';
}

// Update URL for genre landing page
function updateGenreURL(slug) {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return;
  window.history.pushState({}, '', `/genre/${slug}`);
}

// ==========================================
// BIRTHDAY CALENDAR ROUTING (Issue #343)
// ==========================================

// Check if we're on the birthday calendar page
function isBirthdayCalendarPage() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return false;
  const pathname = window.location.pathname;
  return pathname === '/birthdays' || pathname === '/birthdays/' ||
         pathname === '/birthday-calendar' || pathname === '/birthday-calendar/';
}

// Get month from URL params for shareable links
function getBirthdayMonthFromURL() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  const month = params.get('month');
  return month ? parseInt(month, 10) : null;
}

// Update URL with selected month
function updateBirthdayURL(month = null) {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return;
  const newPath = month ? `/birthdays?month=${month}` : '/birthdays';
  window.history.replaceState({}, '', newPath);
}

// Update meta tags for birthday calendar SEO
function updateBirthdayCalendarMeta(month = null, todaysBirthdays = []) {
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

  let title, description;
  
  if (todaysBirthdays.length > 0) {
    const names = todaysBirthdays.map(d => d.name).join(', ');
    title = `🎂 Today: ${names} Birthday! | Metal Drummer Birthday Calendar`;
    description = `Celebrate ${names}'s birthday today! Browse the complete metal drummer birthday calendar.`;
  } else if (month) {
    const monthName = MONTH_NAMES[month - 1];
    title = `${monthName} Metal Drummer Birthdays | MetalForge`;
    description = `See which legendary metal drummers were born in ${monthName}. Complete birthday calendar for metal drummers.`;
  } else {
    title = 'Metal Drummer Birthday Calendar | MetalForge';
    description = 'Never miss a metal drummer birthday! Browse our complete calendar of legendary drummers\' birthdays. Share and celebrate with the metal community.';
  }

  document.title = title;
  setMeta('description', description);
  setMeta('og:title', title, true);
  setMeta('og:description', description, true);
  setMeta('og:type', 'website', true);
  setMeta('og:image', 'https://metalforge.io/og-birthdays.png', true);
  setMeta('og:url', `https://metalforge.io/birthdays${month ? `?month=${month}` : ''}`, true);
  setMeta('twitter:card', 'summary_large_image');
  setMeta('twitter:title', title);
  setMeta('twitter:description', description);
  setMeta('twitter:image', 'https://metalforge.io/og-birthdays.png');
}

// ==========================================
// KIT BUILDER ROUTING (Issue #341)
// ==========================================

// Check if we're on the kit builder page
function isKitBuilderPage() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return false;
  const pathname = window.location.pathname;
  return pathname === '/kit-builder' || pathname.startsWith('/kit-builder?') ||
         pathname === '/build-kit' || pathname.startsWith('/build-kit?');
}

// Get kit configuration from URL params
function getKitFromURL() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  const kit = {};
  if (params.get('drums')) kit.drums = params.get('drums');
  if (params.get('snare')) kit.snare = params.get('snare');
  if (params.get('cymbals')) kit.cymbals = params.get('cymbals');
  if (params.get('hardware')) kit.hardware = params.get('hardware');
  if (params.get('sticks')) kit.sticks = params.get('sticks');
  if (params.get('name')) kit.kitName = params.get('name');
  return Object.keys(kit).length > 0 ? kit : null;
}

// Update URL with kit configuration
function updateKitURL(kit) {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return;
  const params = new URLSearchParams();
  if (kit.drums) params.set('drums', kit.drums);
  if (kit.snare) params.set('snare', kit.snare);
  if (kit.cymbals) params.set('cymbals', kit.cymbals);
  if (kit.hardware) params.set('hardware', kit.hardware);
  if (kit.sticks) params.set('sticks', kit.sticks);
  if (kit.kitName) params.set('name', kit.kitName);
  const queryString = params.toString();
  const newPath = queryString ? `/kit-builder?${queryString}` : '/kit-builder';
  window.history.replaceState({}, '', newPath);
}

// Update meta tags for kit builder social sharing
function updateKitBuilderMeta(kit, totalCost) {
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

  const hasKit = kit && (kit.drums || kit.snare || kit.cymbals);
  const kitName = kit?.kitName || 'My Metal Kit';

  if (hasKit) {
    const gearItems = [kit.drums, kit.snare, kit.cymbals].filter(Boolean);
    const title = `${kitName} - Custom Drum Kit Build | MetalForge`;
    const description = `Check out this custom metal drum kit: ${gearItems.join(', ')}. Total estimated cost: ${totalCost ? `€${totalCost.toLocaleString()}` : 'Calculate yours'}. Build your own kit at MetalForge.io!`;
    const shareUrl = `https://metalforge.io/kit-builder${window.location.search}`;

    document.title = title;
    setMeta('description', description);
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:type', 'website', true);
    setMeta('og:image', 'https://metalforge.io/og-kit-builder.png', true);
    setMeta('og:url', shareUrl, true);
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', 'https://metalforge.io/og-kit-builder.png');
  } else {
    const title = 'Drum Kit Builder - Build Your Dream Metal Kit | MetalForge';
    const description = 'Build your custom metal drum kit with gear from legendary drummers. Choose drums, snares, cymbals, and hardware. Get price estimates and share your build!';

    document.title = title;
    setMeta('description', description);
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:type', 'website', true);
    setMeta('og:image', 'https://metalforge.io/og-kit-builder.png', true);
    setMeta('og:url', 'https://metalforge.io/kit-builder', true);
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', 'https://metalforge.io/og-kit-builder.png');
  }
}

// ==========================================
// BPM TAP CALCULATOR ROUTING (Issue #342)
// ==========================================

// Check if we're on the BPM tap page
function isBpmTapPage() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return false;
  const pathname = window.location.pathname;
  return pathname === '/bpm' || pathname.startsWith('/bpm?') ||
         pathname === '/bpm-tap' || pathname.startsWith('/bpm-tap?') ||
         pathname === '/tempo' || pathname.startsWith('/tempo?');
}

// Get BPM value from URL params
function getBpmFromURL() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  const bpm = params.get('bpm');
  return bpm ? parseInt(bpm, 10) : null;
}

// Get song filter from URL params
function getSongFilterFromURL() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return '';
  const params = new URLSearchParams(window.location.search);
  return params.get('song') || params.get('q') || '';
}

// Update URL with BPM value
function updateBpmURL(bpm, songFilter = '') {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return;
  const params = new URLSearchParams();
  if (bpm) params.set('bpm', Math.round(bpm).toString());
  if (songFilter) params.set('q', songFilter);
  const queryString = params.toString();
  const newUrl = queryString ? `/bpm?${queryString}` : '/bpm';
  window.history.replaceState({}, '', newUrl);
}

// Update meta tags for BPM tap calculator sharing
function updateBpmMeta(bpm) {
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

  if (bpm) {
    const title = `${Math.round(bpm)} BPM - Tap Tempo Result | MetalForge`;
    const description = `Tapped tempo: ${Math.round(bpm)} BPM. Use the BPM Tap Calculator to find the tempo of any song. Browse metal songs by BPM at MetalForge.io!`;
    const shareUrl = `https://metalforge.io/bpm?bpm=${Math.round(bpm)}`;

    document.title = title;
    setMeta('description', description);
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:type', 'website', true);
    setMeta('og:url', shareUrl, true);
    setMeta('twitter:card', 'summary');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
  } else {
    const title = 'BPM Tap Calculator - Find Song Tempo | MetalForge';
    const description = 'Tap to find the BPM of any song. Browse metal songs by tempo and discover tracks perfect for your drumming practice. Free tap tempo tool for drummers!';

    document.title = title;
    setMeta('description', description);
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:type', 'website', true);
    setMeta('og:url', 'https://metalforge.io/bpm', true);
    setMeta('twitter:card', 'summary');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
  }
}

// ==========================================
// BPM RANGE LANDING PAGES ROUTING (Issue #342)
// ==========================================

// Valid BPM range slugs
const BPM_RANGE_SLUGS = ['slow', 'mid', 'fast', 'extreme', 'blast-beat', 'blast'];

// Check if we're on a BPM range page (e.g., /bpm/slow, /bpm/fast, /bpm/200)
function isBpmRangePage() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return false;
  const pathname = window.location.pathname;
  // Match /bpm/{slug} where slug is a range name or a number
  const match = pathname.match(/^\/bpm\/([a-z0-9-]+)$/i);
  if (!match) return false;
  const slug = match[1].toLowerCase();
  // Valid if it's a known range or a numeric BPM
  return BPM_RANGE_SLUGS.includes(slug) || /^\d+$/.test(slug);
}

// Get BPM range slug from URL
function getBpmRangeSlugFromURL() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return null;
  const pathname = window.location.pathname;
  const match = pathname.match(/^\/bpm\/([a-z0-9-]+)$/i);
  if (!match) return null;
  return match[1].toLowerCase();
}

// Update URL for BPM range page
function updateBpmRangeURL(slug) {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return;
  window.history.pushState({}, '', `/bpm/${slug}`);
}

// Metal songs database with BPM values
const METAL_SONGS_DATABASE = [
  // Metallica
  { band: 'Metallica', song: 'Master of Puppets', bpm: 212, drummer: 'Lars Ulrich', album: 'Master of Puppets', year: 1986, genre: 'Thrash Metal' },
  { band: 'Metallica', song: 'One', bpm: 108, drummer: 'Lars Ulrich', album: '...And Justice for All', year: 1988, genre: 'Thrash Metal' },
  { band: 'Metallica', song: 'Enter Sandman', bpm: 123, drummer: 'Lars Ulrich', album: 'Metallica', year: 1991, genre: 'Heavy Metal' },
  { band: 'Metallica', song: 'Battery', bpm: 196, drummer: 'Lars Ulrich', album: 'Master of Puppets', year: 1986, genre: 'Thrash Metal' },
  { band: 'Metallica', song: 'Seek & Destroy', bpm: 140, drummer: 'Lars Ulrich', album: "Kill 'Em All", year: 1983, genre: 'Thrash Metal' },
  { band: 'Metallica', song: 'Creeping Death', bpm: 206, drummer: 'Lars Ulrich', album: 'Ride the Lightning', year: 1984, genre: 'Thrash Metal' },
  { band: 'Metallica', song: 'For Whom the Bell Tolls', bpm: 120, drummer: 'Lars Ulrich', album: 'Ride the Lightning', year: 1984, genre: 'Thrash Metal' },
  { band: 'Metallica', song: 'Nothing Else Matters', bpm: 69, drummer: 'Lars Ulrich', album: 'Metallica', year: 1991, genre: 'Heavy Metal' },
  
  // Slipknot
  { band: 'Slipknot', song: 'Duality', bpm: 135, drummer: 'Joey Jordison', album: 'Vol. 3: (The Subliminal Verses)', year: 2004, genre: 'Nu Metal' },
  { band: 'Slipknot', song: 'Psychosocial', bpm: 135, drummer: 'Joey Jordison', album: 'All Hope Is Gone', year: 2008, genre: 'Nu Metal' },
  { band: 'Slipknot', song: 'Before I Forget', bpm: 140, drummer: 'Joey Jordison', album: 'Vol. 3: (The Subliminal Verses)', year: 2004, genre: 'Nu Metal' },
  { band: 'Slipknot', song: 'Wait and Bleed', bpm: 165, drummer: 'Joey Jordison', album: 'Slipknot', year: 1999, genre: 'Nu Metal' },
  { band: 'Slipknot', song: 'People = Shit', bpm: 180, drummer: 'Joey Jordison', album: 'Iowa', year: 2001, genre: 'Nu Metal' },
  { band: 'Slipknot', song: 'Unsainted', bpm: 152, drummer: 'Jay Weinberg', album: 'We Are Not Your Kind', year: 2019, genre: 'Nu Metal' },
  
  // Slayer
  { band: 'Slayer', song: 'Raining Blood', bpm: 210, drummer: 'Dave Lombardo', album: 'Reign in Blood', year: 1986, genre: 'Thrash Metal' },
  { band: 'Slayer', song: 'Angel of Death', bpm: 210, drummer: 'Dave Lombardo', album: 'Reign in Blood', year: 1986, genre: 'Thrash Metal' },
  { band: 'Slayer', song: 'South of Heaven', bpm: 86, drummer: 'Dave Lombardo', album: 'South of Heaven', year: 1988, genre: 'Thrash Metal' },
  { band: 'Slayer', song: 'Seasons in the Abyss', bpm: 112, drummer: 'Dave Lombardo', album: 'Seasons in the Abyss', year: 1990, genre: 'Thrash Metal' },
  { band: 'Slayer', song: 'War Ensemble', bpm: 230, drummer: 'Dave Lombardo', album: 'Seasons in the Abyss', year: 1990, genre: 'Thrash Metal' },
  
  // Meshuggah
  { band: 'Meshuggah', song: 'Bleed', bpm: 100, drummer: 'Tomas Haake', album: 'obZen', year: 2008, genre: 'Djent' },
  { band: 'Meshuggah', song: 'Rational Gaze', bpm: 95, drummer: 'Tomas Haake', album: 'Nothing', year: 2002, genre: 'Djent' },
  { band: 'Meshuggah', song: 'Future Breed Machine', bpm: 120, drummer: 'Tomas Haake', album: 'Destroy Erase Improve', year: 1995, genre: 'Djent' },
  { band: 'Meshuggah', song: 'Clockworks', bpm: 90, drummer: 'Tomas Haake', album: 'The Violent Sleep of Reason', year: 2016, genre: 'Djent' },
  
  // Gojira
  { band: 'Gojira', song: 'Flying Whales', bpm: 95, drummer: 'Mario Duplantier', album: 'From Mars to Sirius', year: 2005, genre: 'Progressive Metal' },
  { band: 'Gojira', song: 'Stranded', bpm: 132, drummer: 'Mario Duplantier', album: 'Magma', year: 2016, genre: 'Progressive Metal' },
  { band: 'Gojira', song: 'Backbone', bpm: 160, drummer: 'Mario Duplantier', album: 'From Mars to Sirius', year: 2005, genre: 'Progressive Metal' },
  { band: 'Gojira', song: "L'Enfant Sauvage", bpm: 140, drummer: 'Mario Duplantier', album: "L'Enfant Sauvage", year: 2012, genre: 'Progressive Metal' },
  { band: 'Gojira', song: 'Silvera', bpm: 135, drummer: 'Mario Duplantier', album: 'Magma', year: 2016, genre: 'Progressive Metal' },
  
  // Dream Theater
  { band: 'Dream Theater', song: 'Pull Me Under', bpm: 120, drummer: 'Mike Portnoy', album: 'Images and Words', year: 1992, genre: 'Progressive Metal' },
  { band: 'Dream Theater', song: 'Metropolis Pt. 1', bpm: 140, drummer: 'Mike Portnoy', album: 'Images and Words', year: 1992, genre: 'Progressive Metal' },
  { band: 'Dream Theater', song: 'The Dance of Eternity', bpm: 160, drummer: 'Mike Portnoy', album: 'Metropolis Pt. 2', year: 1999, genre: 'Progressive Metal' },
  { band: 'Dream Theater', song: 'Panic Attack', bpm: 160, drummer: 'Mike Portnoy', album: 'Octavarium', year: 2005, genre: 'Progressive Metal' },
  
  // Tool
  { band: 'Tool', song: 'Schism', bpm: 96, drummer: 'Danny Carey', album: 'Lateralus', year: 2001, genre: 'Progressive Metal' },
  { band: 'Tool', song: 'Lateralus', bpm: 96, drummer: 'Danny Carey', album: 'Lateralus', year: 2001, genre: 'Progressive Metal' },
  { band: 'Tool', song: 'Forty Six & 2', bpm: 100, drummer: 'Danny Carey', album: 'Ænima', year: 1996, genre: 'Progressive Metal' },
  { band: 'Tool', song: 'Pneuma', bpm: 77, drummer: 'Danny Carey', album: 'Fear Inoculum', year: 2019, genre: 'Progressive Metal' },
  { band: 'Tool', song: 'Sober', bpm: 105, drummer: 'Danny Carey', album: 'Undertow', year: 1993, genre: 'Progressive Metal' },
  
  // Mastodon
  { band: 'Mastodon', song: 'Blood and Thunder', bpm: 173, drummer: 'Brann Dailor', album: 'Leviathan', year: 2004, genre: 'Progressive Metal' },
  { band: 'Mastodon', song: 'Colony of Birchmen', bpm: 120, drummer: 'Brann Dailor', album: 'Blood Mountain', year: 2006, genre: 'Progressive Metal' },
  { band: 'Mastodon', song: 'The Motherload', bpm: 115, drummer: 'Brann Dailor', album: 'Once More Round the Sun', year: 2014, genre: 'Progressive Metal' },
  { band: 'Mastodon', song: 'Oblivion', bpm: 110, drummer: 'Brann Dailor', album: 'Crack the Skye', year: 2009, genre: 'Progressive Metal' },
  
  // Lamb of God
  { band: 'Lamb of God', song: 'Laid to Rest', bpm: 180, drummer: 'Chris Adler', album: 'Ashes of the Wake', year: 2004, genre: 'Groove Metal' },
  { band: 'Lamb of God', song: 'Redneck', bpm: 200, drummer: 'Chris Adler', album: 'Sacrament', year: 2006, genre: 'Groove Metal' },
  { band: 'Lamb of God', song: 'Walk with Me in Hell', bpm: 170, drummer: 'Chris Adler', album: 'Sacrament', year: 2006, genre: 'Groove Metal' },
  { band: 'Lamb of God', song: 'Now You\'ve Got Something to Die For', bpm: 205, drummer: 'Chris Adler', album: 'Ashes of the Wake', year: 2004, genre: 'Groove Metal' },
  
  // Pantera
  { band: 'Pantera', song: 'Walk', bpm: 115, drummer: 'Vinnie Paul', album: 'Vulgar Display of Power', year: 1992, genre: 'Groove Metal' },
  { band: 'Pantera', song: 'Cowboys from Hell', bpm: 115, drummer: 'Vinnie Paul', album: 'Cowboys from Hell', year: 1990, genre: 'Groove Metal' },
  { band: 'Pantera', song: 'Domination', bpm: 140, drummer: 'Vinnie Paul', album: 'Cowboys from Hell', year: 1990, genre: 'Groove Metal' },
  { band: 'Pantera', song: 'Cemetery Gates', bpm: 82, drummer: 'Vinnie Paul', album: 'Cowboys from Hell', year: 1990, genre: 'Groove Metal' },
  { band: 'Pantera', song: 'I\'m Broken', bpm: 90, drummer: 'Vinnie Paul', album: 'Far Beyond Driven', year: 1994, genre: 'Groove Metal' },
  
  // Anthrax
  { band: 'Anthrax', song: 'Caught in a Mosh', bpm: 200, drummer: 'Charlie Benante', album: 'Among the Living', year: 1987, genre: 'Thrash Metal' },
  { band: 'Anthrax', song: 'Indians', bpm: 180, drummer: 'Charlie Benante', album: 'Among the Living', year: 1987, genre: 'Thrash Metal' },
  { band: 'Anthrax', song: 'Madhouse', bpm: 185, drummer: 'Charlie Benante', album: 'Spreading the Disease', year: 1985, genre: 'Thrash Metal' },
  
  // Sepultura
  { band: 'Sepultura', song: 'Roots Bloody Roots', bpm: 125, drummer: 'Igor Cavalera', album: 'Roots', year: 1996, genre: 'Groove Metal' },
  { band: 'Sepultura', song: 'Refuse/Resist', bpm: 175, drummer: 'Igor Cavalera', album: 'Chaos A.D.', year: 1993, genre: 'Groove Metal' },
  { band: 'Sepultura', song: 'Territory', bpm: 135, drummer: 'Igor Cavalera', album: 'Chaos A.D.', year: 1993, genre: 'Groove Metal' },
  { band: 'Sepultura', song: 'Inner Self', bpm: 195, drummer: 'Igor Cavalera', album: 'Beneath the Remains', year: 1989, genre: 'Thrash Metal' },
  { band: 'Sepultura', song: 'Quadra', bpm: 130, drummer: 'Eloy Casagrande', album: 'Quadra', year: 2020, genre: 'Groove Metal' },
  
  // Death
  { band: 'Death', song: 'Crystal Mountain', bpm: 140, drummer: 'Gene Hoglan', album: 'Symbolic', year: 1995, genre: 'Death Metal' },
  { band: 'Death', song: 'Symbolic', bpm: 165, drummer: 'Gene Hoglan', album: 'Symbolic', year: 1995, genre: 'Death Metal' },
  { band: 'Death', song: 'The Philosopher', bpm: 115, drummer: 'Gene Hoglan', album: 'Individual Thought Patterns', year: 1993, genre: 'Death Metal' },
  { band: 'Death', song: 'Spirit Crusher', bpm: 130, drummer: 'Richard Christy', album: 'The Sound of Perseverance', year: 1998, genre: 'Death Metal' },
  
  // Nile
  { band: 'Nile', song: 'Lashed to the Slave Stick', bpm: 240, drummer: 'George Kollias', album: 'Annihilation of the Wicked', year: 2005, genre: 'Death Metal' },
  { band: 'Nile', song: 'Kafir!', bpm: 260, drummer: 'George Kollias', album: 'Those Whom the Gods Detest', year: 2009, genre: 'Death Metal' },
  { band: 'Nile', song: 'Sacrifice Unto Sebek', bpm: 220, drummer: 'George Kollias', album: 'Annihilation of the Wicked', year: 2005, genre: 'Death Metal' },
  
  // Behemoth
  { band: 'Behemoth', song: 'Blow Your Trumpets Gabriel', bpm: 120, drummer: 'Inferno', album: 'The Satanist', year: 2014, genre: 'Death Metal' },
  { band: 'Behemoth', song: 'Conquer All', bpm: 140, drummer: 'Inferno', album: 'Demigod', year: 2004, genre: 'Death Metal' },
  { band: 'Behemoth', song: 'Ora Pro Nobis Lucifer', bpm: 145, drummer: 'Inferno', album: 'The Satanist', year: 2014, genre: 'Death Metal' },
  
  // Periphery
  { band: 'Periphery', song: 'Icarus Lives!', bpm: 155, drummer: 'Matt Halpern', album: 'Periphery', year: 2010, genre: 'Djent' },
  { band: 'Periphery', song: 'Marigold', bpm: 138, drummer: 'Matt Halpern', album: 'Periphery III: Select Difficulty', year: 2016, genre: 'Djent' },
  { band: 'Periphery', song: 'Scarlet', bpm: 130, drummer: 'Matt Halpern', album: 'Periphery II: This Time It\'s Personal', year: 2012, genre: 'Djent' },
  
  // Iron Maiden
  { band: 'Iron Maiden', song: 'The Trooper', bpm: 164, drummer: 'Nicko McBrain', album: 'Piece of Mind', year: 1983, genre: 'Heavy Metal' },
  { band: 'Iron Maiden', song: 'Run to the Hills', bpm: 168, drummer: 'Clive Burr', album: 'The Number of the Beast', year: 1982, genre: 'Heavy Metal' },
  { band: 'Iron Maiden', song: 'Hallowed Be Thy Name', bpm: 110, drummer: 'Clive Burr', album: 'The Number of the Beast', year: 1982, genre: 'Heavy Metal' },
  { band: 'Iron Maiden', song: 'Aces High', bpm: 150, drummer: 'Nicko McBrain', album: 'Powerslave', year: 1984, genre: 'Heavy Metal' },
  { band: 'Iron Maiden', song: 'Fear of the Dark', bpm: 142, drummer: 'Nicko McBrain', album: 'Fear of the Dark', year: 1992, genre: 'Heavy Metal' },
  
  // Black Sabbath
  { band: 'Black Sabbath', song: 'Paranoid', bpm: 162, drummer: 'Bill Ward', album: 'Paranoid', year: 1970, genre: 'Heavy Metal' },
  { band: 'Black Sabbath', song: 'Iron Man', bpm: 76, drummer: 'Bill Ward', album: 'Paranoid', year: 1970, genre: 'Heavy Metal' },
  { band: 'Black Sabbath', song: 'War Pigs', bpm: 88, drummer: 'Bill Ward', album: 'Paranoid', year: 1970, genre: 'Heavy Metal' },
  
  // Korn
  { band: 'Korn', song: 'Freak on a Leash', bpm: 122, drummer: 'David Silveria', album: 'Follow the Leader', year: 1998, genre: 'Nu Metal' },
  { band: 'Korn', song: 'Falling Away from Me', bpm: 83, drummer: 'David Silveria', album: 'Issues', year: 1999, genre: 'Nu Metal' },
  { band: 'Korn', song: 'Here to Stay', bpm: 92, drummer: 'David Silveria', album: 'Untouchables', year: 2002, genre: 'Nu Metal' },
  { band: 'Korn', song: 'Coming Undone', bpm: 108, drummer: 'Ray Luzier', album: 'See You on the Other Side', year: 2005, genre: 'Nu Metal' },
  
  // System of a Down
  { band: 'System of a Down', song: 'Chop Suey!', bpm: 127, drummer: 'John Dolmayan', album: 'Toxicity', year: 2001, genre: 'Nu Metal' },
  { band: 'System of a Down', song: 'Toxicity', bpm: 80, drummer: 'John Dolmayan', album: 'Toxicity', year: 2001, genre: 'Nu Metal' },
  { band: 'System of a Down', song: 'B.Y.O.B.', bpm: 150, drummer: 'John Dolmayan', album: 'Mesmerize', year: 2005, genre: 'Nu Metal' },
  { band: 'System of a Down', song: 'Sugar', bpm: 144, drummer: 'John Dolmayan', album: 'System of a Down', year: 1998, genre: 'Nu Metal' },
  
  // Avenged Sevenfold
  { band: 'Avenged Sevenfold', song: 'Bat Country', bpm: 140, drummer: 'The Rev', album: 'City of Evil', year: 2005, genre: 'Heavy Metal' },
  { band: 'Avenged Sevenfold', song: 'Hail to the King', bpm: 114, drummer: 'Arin Ilejay', album: 'Hail to the King', year: 2013, genre: 'Heavy Metal' },
  { band: 'Avenged Sevenfold', song: 'Nightmare', bpm: 106, drummer: 'Mike Portnoy', album: 'Nightmare', year: 2010, genre: 'Heavy Metal' },
  { band: 'Avenged Sevenfold', song: 'Beast and the Harlot', bpm: 170, drummer: 'The Rev', album: 'City of Evil', year: 2005, genre: 'Heavy Metal' },
  
  // Trivium
  { band: 'Trivium', song: 'In Waves', bpm: 150, drummer: 'Nick Augusto', album: 'In Waves', year: 2011, genre: 'Heavy Metal' },
  { band: 'Trivium', song: 'Pull Harder on the Strings of Your Martyr', bpm: 175, drummer: 'Travis Smith', album: 'Ascendancy', year: 2005, genre: 'Heavy Metal' },
  { band: 'Trivium', song: 'Until the World Goes Cold', bpm: 125, drummer: 'Mat Madiro', album: 'Silence in the Snow', year: 2015, genre: 'Heavy Metal' },
  { band: 'Trivium', song: 'Catastrophist', bpm: 158, drummer: 'Alex Bent', album: 'What the Dead Men Say', year: 2020, genre: 'Heavy Metal' },
  
  // Killswitch Engage
  { band: 'Killswitch Engage', song: 'My Curse', bpm: 144, drummer: 'Justin Foley', album: 'As Daylight Dies', year: 2006, genre: 'Metalcore' },
  { band: 'Killswitch Engage', song: 'The End of Heartache', bpm: 130, drummer: 'Justin Foley', album: 'The End of Heartache', year: 2004, genre: 'Metalcore' },
  { band: 'Killswitch Engage', song: 'Holy Diver', bpm: 150, drummer: 'Justin Foley', album: 'The End of Heartache', year: 2004, genre: 'Metalcore' },
  
  // Architects
  { band: 'Architects', song: 'Doomsday', bpm: 140, drummer: 'Dan Searle', album: 'Holy Hell', year: 2018, genre: 'Metalcore' },
  { band: 'Architects', song: 'Animals', bpm: 134, drummer: 'Dan Searle', album: 'For Those That Wish to Exist', year: 2021, genre: 'Metalcore' },
  
  // Cannibal Corpse
  { band: 'Cannibal Corpse', song: 'Hammer Smashed Face', bpm: 200, drummer: 'Paul Mazurkiewicz', album: 'Tomb of the Mutilated', year: 1992, genre: 'Death Metal' },
  { band: 'Cannibal Corpse', song: 'Scourge of Iron', bpm: 110, drummer: 'Paul Mazurkiewicz', album: 'Torture', year: 2012, genre: 'Death Metal' },
  
  // Opeth
  { band: 'Opeth', song: 'Ghost of Perdition', bpm: 95, drummer: 'Martin Lopez', album: 'Ghost Reveries', year: 2005, genre: 'Progressive Metal' },
  { band: 'Opeth', song: 'Blackwater Park', bpm: 70, drummer: 'Martin Lopez', album: 'Blackwater Park', year: 2001, genre: 'Progressive Metal' },
  
  // Deftones
  { band: 'Deftones', song: 'My Own Summer (Shove It)', bpm: 90, drummer: 'Abe Cunningham', album: 'Around the Fur', year: 1997, genre: 'Nu Metal' },
  { band: 'Deftones', song: 'Change (In the House of Flies)', bpm: 62, drummer: 'Abe Cunningham', album: 'White Pony', year: 2000, genre: 'Nu Metal' },
  { band: 'Deftones', song: 'Diamond Eyes', bpm: 102, drummer: 'Abe Cunningham', album: 'Diamond Eyes', year: 2010, genre: 'Nu Metal' },
  
  // Rage Against the Machine
  { band: 'Rage Against the Machine', song: 'Killing in the Name', bpm: 89, drummer: 'Brad Wilk', album: 'Rage Against the Machine', year: 1992, genre: 'Nu Metal' },
  { band: 'Rage Against the Machine', song: 'Bulls on Parade', bpm: 82, drummer: 'Brad Wilk', album: 'Evil Empire', year: 1996, genre: 'Nu Metal' },
  { band: 'Rage Against the Machine', song: 'Guerrilla Radio', bpm: 103, drummer: 'Brad Wilk', album: 'The Battle of Los Angeles', year: 1999, genre: 'Nu Metal' },
  
  // Darkthrone
  { band: 'Darkthrone', song: 'Transilvanian Hunger', bpm: 200, drummer: 'Fenriz', album: 'Transilvanian Hunger', year: 1994, genre: 'Black Metal' },
  
  // Mayhem
  { band: 'Mayhem', song: 'Freezing Moon', bpm: 130, drummer: 'Hellhammer', album: 'De Mysteriis Dom Sathanas', year: 1994, genre: 'Black Metal' },
  { band: 'Mayhem', song: 'Chainsaw Gutsfuck', bpm: 220, drummer: 'Hellhammer', album: 'Deathcrush', year: 1987, genre: 'Black Metal' },
  
  // Morbid Angel
  { band: 'Morbid Angel', song: 'Chapel of Ghouls', bpm: 150, drummer: 'Pete Sandoval', album: 'Altars of Madness', year: 1989, genre: 'Death Metal' },
  { band: 'Morbid Angel', song: 'Where the Slime Live', bpm: 200, drummer: 'Pete Sandoval', album: 'Covenant', year: 1993, genre: 'Death Metal' },
  
  // Kreator
  { band: 'Kreator', song: 'Pleasure to Kill', bpm: 225, drummer: 'Ventor', album: 'Pleasure to Kill', year: 1986, genre: 'Thrash Metal' },
  { band: 'Kreator', song: 'Phobia', bpm: 200, drummer: 'Ventor', album: 'Coma of Souls', year: 1990, genre: 'Thrash Metal' },
  
  // Testament
  { band: 'Testament', song: 'Practice What You Preach', bpm: 140, drummer: 'Louie Clemente', album: 'Practice What You Preach', year: 1989, genre: 'Thrash Metal' },
  { band: 'Testament', song: 'Into the Pit', bpm: 190, drummer: 'Louie Clemente', album: 'The Legacy', year: 1987, genre: 'Thrash Metal' },
  
  // Exodus
  { band: 'Exodus', song: 'Bonded by Blood', bpm: 210, drummer: 'Tom Hunting', album: 'Bonded by Blood', year: 1985, genre: 'Thrash Metal' },
  { band: 'Exodus', song: 'Toxic Waltz', bpm: 185, drummer: 'Tom Hunting', album: 'Fabulous Disaster', year: 1989, genre: 'Thrash Metal' },
  
  // Godsmack
  { band: 'Godsmack', song: 'I Stand Alone', bpm: 90, drummer: 'Shannon Larkin', album: 'Faceless', year: 2003, genre: 'Heavy Metal' },
  { band: 'Godsmack', song: 'Bulletproof', bpm: 100, drummer: 'Shannon Larkin', album: 'The Oracle', year: 2010, genre: 'Heavy Metal' },
  
  // Disturbed
  { band: 'Disturbed', song: 'Down with the Sickness', bpm: 97, drummer: 'Mike Wengren', album: 'The Sickness', year: 2000, genre: 'Nu Metal' },
  { band: 'Disturbed', song: 'Stupify', bpm: 120, drummer: 'Mike Wengren', album: 'The Sickness', year: 2000, genre: 'Nu Metal' },
  { band: 'Disturbed', song: 'The Sound of Silence', bpm: 72, drummer: 'Mike Wengren', album: 'Immortalized', year: 2015, genre: 'Heavy Metal' },
  
  // Five Finger Death Punch
  { band: 'Five Finger Death Punch', song: 'Lift Me Up', bpm: 140, drummer: 'Jeremy Spencer', album: 'The Wrong Side of Heaven...', year: 2013, genre: 'Heavy Metal' },
  { band: 'Five Finger Death Punch', song: 'Wash It All Away', bpm: 145, drummer: 'Jeremy Spencer', album: 'Got Your Six', year: 2015, genre: 'Heavy Metal' },
  
  // Bullet for My Valentine
  { band: 'Bullet for My Valentine', song: 'Tears Don\'t Fall', bpm: 128, drummer: 'Michael Thomas', album: 'The Poison', year: 2005, genre: 'Metalcore' },
  { band: 'Bullet for My Valentine', song: 'Waking the Demon', bpm: 152, drummer: 'Michael Thomas', album: 'Scream Aim Fire', year: 2008, genre: 'Metalcore' },
];

// Get BPM tempo description (using centralized colors)
function getBpmCategory(bpm) {
  if (bpm < 70) return { label: 'Very Slow', color: colors.semantic.info, emoji: '🐢' };
  if (bpm < 100) return { label: 'Slow', color: '#8b5cf6', emoji: '🚶' };
  if (bpm < 130) return { label: 'Medium', color: colors.semantic.success, emoji: '🎸' };
  if (bpm < 160) return { label: 'Fast', color: colors.semantic.warning, emoji: '🔥' };
  if (bpm < 200) return { label: 'Very Fast', color: colors.semantic.error, emoji: '⚡' };
  return { label: 'Extreme', color: colors.brand.primary, emoji: '💀' };
}

// ==========================================
// KIT QUIZ ROUTING (Issue #551)
// ==========================================

// Check if we're on the kit quiz page
function isKitQuizPage() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return false;
  const pathname = window.location.pathname;
  return pathname === '/kit-quiz' || pathname.startsWith('/kit-quiz?') ||
         pathname === '/guess-the-drummer' || pathname.startsWith('/guess-the-drummer?');
}

// Get kit quiz result from URL params (for shareable results)
function getKitQuizResultFromURL() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  return {
    score: params.get('score') ? parseInt(params.get('score'), 10) : null,
    correct: params.get('correct') ? parseInt(params.get('correct'), 10) : null,
    total: params.get('total') ? parseInt(params.get('total'), 10) : null,
  };
}

// Update URL with kit quiz result
function updateKitQuizResultURL(result) {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return;
  const params = new URLSearchParams();
  if (result.score) params.set('score', result.score.toString());
  if (result.correct !== undefined) params.set('correct', result.correct.toString());
  if (result.total) params.set('total', result.total.toString());
  const queryString = params.toString();
  const newUrl = queryString ? `/kit-quiz?${queryString}` : '/kit-quiz';
  window.history.replaceState({}, '', newUrl);
}

// Update meta tags for kit quiz social sharing
function updateKitQuizMeta(result) {
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

  if (result && result.correct !== undefined) {
    const emoji = result.percentage >= 80 ? '🏆' : result.percentage >= 60 ? '🔥' : result.percentage >= 40 ? '🥁' : '😅';
    const title = `${emoji} ${result.correct}/${result.total} - Metal Drummer Kit Quiz | MetalForge`;
    const description = `I got ${result.correct}/${result.total} (${result.percentage}%) on the Metal Drummer Kit Quiz! Can you beat my score? 🤘 Guess the drummer by their drum kit setup.`;
    const shareUrl = `https://metalforge.io/kit-quiz?correct=${result.correct}&total=${result.total}&score=${result.score}`;

    document.title = title;
    setMeta('description', description);
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:type', 'website', true);
    setMeta('og:image', 'https://metalforge.io/og-kit-quiz.png', true);
    setMeta('og:url', shareUrl, true);
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', 'https://metalforge.io/og-kit-quiz.png');
  } else {
    const title = 'Guess the Drummer by Kit - Metal Quiz | MetalForge';
    const description = 'Can you identify legendary metal drummers just by their gear setup? Test your knowledge with this viral quiz! 🥁🤘';

    document.title = title;
    setMeta('description', description);
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:type', 'website', true);
    setMeta('og:image', 'https://metalforge.io/og-kit-quiz.png', true);
    setMeta('og:url', 'https://metalforge.io/kit-quiz', true);
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', 'https://metalforge.io/og-kit-quiz.png');
  }
}

// Track kit quiz completion in GA4
function trackKitQuizCompletion(result) {
  if (Platform.OS === 'web' && typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'kit_quiz_complete', {
      event_category: 'engagement',
      event_label: `${result.correct}/${result.total}`,
      value: result.score,
      quiz_score: result.score,
      quiz_correct: result.correct,
      quiz_total: result.total,
      quiz_percentage: result.percentage,
    });
  }
}

// Track kit quiz start in GA4
function trackKitQuizStart() {
  if (Platform.OS === 'web' && typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'kit_quiz_start', {
      event_category: 'engagement',
    });
  }
}

// Track kit quiz share in GA4
function trackKitQuizShare(platform, result) {
  if (Platform.OS === 'web' && typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'kit_quiz_share', {
      event_category: 'engagement',
      event_label: platform,
      value: result.score,
      share_platform: platform,
      quiz_score: result.score,
    });
  }
}

// ==========================================
// GEAR COMPARISON ROUTING (Issue #345)
// ==========================================

// Check if we're on a gear comparison page (/compare/:slug)
function isGearComparisonPage() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return false;
  return /^\/compare\/[a-z0-9-]+$/i.test(window.location.pathname);
}

// Check if we're on the gear comparisons index page (/compare without drummer query params)
function isGearComparisonsIndexPage() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return false;
  const pathname = window.location.pathname;
  const hasCompareQueryParams = window.location.search.includes('d1=') || window.location.search.includes('d2=');
  // Only match /compare without drummer query params (those go to drummer compare)
  return (pathname === '/compare' || pathname === '/compare/') && !hasCompareQueryParams;
}

// Get gear comparison slug from URL
function getGearComparisonSlugFromURL() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return null;
  const match = window.location.pathname.match(/^\/compare\/([a-z0-9-]+)$/i);
  return match ? match[1] : null;
}

// Update URL for gear comparison page
function updateGearComparisonURL(slug) {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return;
  const newPath = slug ? `/compare/${slug}` : '/compare';
  window.history.pushState({}, '', newPath);
}

// Update meta tags and structured data for gear comparison pages
function updateGearComparisonMeta(comparison) {
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

  if (comparison) {
    document.title = comparison.metaTitle;
    setMeta('description', comparison.metaDescription);
    setMeta('og:title', comparison.metaTitle, true);
    setMeta('og:description', comparison.metaDescription, true);
    setMeta('og:type', 'article', true);
    setMeta('og:url', `https://metalforge.io/compare/${comparison.slug}`, true);
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', comparison.metaTitle);
    setMeta('twitter:description', comparison.metaDescription);

    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', `https://metalforge.io/compare/${comparison.slug}`);

    // Structured Data - ItemPage with comparison schema
    let ldScript = document.querySelector('script[data-schema="comparison"]');
    if (!ldScript) {
      ldScript = document.createElement('script');
      ldScript.type = 'application/ld+json';
      ldScript.setAttribute('data-schema', 'comparison');
      document.head.appendChild(ldScript);
    }

    const item1 = comparison.items[0];
    const item2 = comparison.items[1];

    const comparisonSchema = {
      "@context": "https://schema.org",
      "@type": "ItemPage",
      "name": comparison.title,
      "description": comparison.metaDescription,
      "url": `https://metalforge.io/compare/${comparison.slug}`,
      "about": [
        {
          "@type": "Brand",
          "name": item1.brand,
          "description": `${item1.brand} ${item1.model} - ${item1.bestFor}`
        },
        {
          "@type": "Brand",
          "name": item2.brand,
          "description": `${item2.brand} ${item2.model} - ${item2.bestFor}`
        }
      ],
      "mainEntity": {
        "@type": "ItemList",
        "name": comparison.title,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "item": {
              "@type": "Product",
              "name": `${item1.brand} ${item1.model}`,
              "brand": { "@type": "Brand", "name": item1.brand },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": item1.rating,
                "bestRating": 5,
                "worstRating": 1
              },
              "description": item1.pros.join('. ')
            }
          },
          {
            "@type": "ListItem",
            "position": 2,
            "item": {
              "@type": "Product",
              "name": `${item2.brand} ${item2.model}`,
              "brand": { "@type": "Brand", "name": item2.brand },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": item2.rating,
                "bestRating": 5,
                "worstRating": 1
              },
              "description": item2.pros.join('. ')
            }
          }
        ]
      },
      "isPartOf": {
        "@type": "WebSite",
        "name": "MetalForge",
        "url": "https://metalforge.io"
      }
    };

    ldScript.textContent = JSON.stringify(comparisonSchema);

    // BreadcrumbList Schema
    let breadcrumbScript = document.querySelector('script[data-schema="comparison-breadcrumb"]');
    if (!breadcrumbScript) {
      breadcrumbScript = document.createElement('script');
      breadcrumbScript.type = 'application/ld+json';
      breadcrumbScript.setAttribute('data-schema', 'comparison-breadcrumb');
      document.head.appendChild(breadcrumbScript);
    }

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://metalforge.io"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Gear Comparisons",
          "item": "https://metalforge.io/compare"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": comparison.title,
          "item": `https://metalforge.io/compare/${comparison.slug}`
        }
      ]
    };
    breadcrumbScript.textContent = JSON.stringify(breadcrumbSchema);

  } else {
    // Index page
    const title = 'Gear Comparisons - Tama vs Pearl, Meinl vs Zildjian & More | MetalForge';
    const description = 'Compare top drum brands and gear for metal drumming. Tama vs Pearl, Meinl vs Zildjian, and more. Expert analysis, specs, and pro drummer endorsements.';
    document.title = title;
    setMeta('description', description);
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:type', 'website', true);
    setMeta('og:url', 'https://metalforge.io/compare', true);
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);

    // Canonical URL for index
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', 'https://metalforge.io/compare');

    // CollectionPage schema for index
    let ldScript = document.querySelector('script[data-schema="comparison"]');
    if (!ldScript) {
      ldScript = document.createElement('script');
      ldScript.type = 'application/ld+json';
      ldScript.setAttribute('data-schema', 'comparison');
      document.head.appendChild(ldScript);
    }

    const allComparisons = getAllGearComparisons();
    const indexSchema = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Gear Comparisons",
      "description": description,
      "url": "https://metalforge.io/compare",
      "mainEntity": {
        "@type": "ItemList",
        "name": "Metal Drumming Gear Comparisons",
        "numberOfItems": allComparisons.length,
        "itemListElement": allComparisons.map((c, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "Article",
            "name": c.title,
            "url": `https://metalforge.io/compare/${c.slug}`,
            "description": c.metaDescription
          }
        }))
      },
      "isPartOf": {
        "@type": "WebSite",
        "name": "MetalForge",
        "url": "https://metalforge.io"
      }
    };

    ldScript.textContent = JSON.stringify(indexSchema);
  }
}

// ==========================================
// DRUMMER VS DRUMMER COMPARISON ROUTING (Issue #558)
// ==========================================

// Check if we're on a drummer comparison page (/vs/:slug-vs-slug)
function isDrummerComparisonPage() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return false;

  return /^\/vs\/[a-z0-9-]+-vs-[a-z0-9-]+$/i.test(window.location.pathname);
}

// Check if we're on the drummer comparisons index page (/vs)
function isDrummerComparisonsIndexPage() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return false;
  const pathname = window.location.pathname;
  return pathname === '/vs' || pathname === '/vs/';
}

// Get drummer comparison slug from URL
function getDrummerComparisonSlugFromURL() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return null;
  const match = window.location.pathname.match(/^\/vs\/([a-z0-9-]+-vs-[a-z0-9-]+)$/i);
  return match ? match[1] : null;
}

// Update URL for drummer comparison page
function updateDrummerComparisonURL(slug) {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return;
  const newPath = slug ? `/vs/${slug}` : '/vs';
  window.history.pushState({}, '', newPath);
}

// Update meta tags and structured data for drummer comparison pages
function updateDrummerVsMeta(comparison, drummer1, drummer2) {
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

  if (comparison && drummer1 && drummer2) {
    document.title = comparison.metaTitle;
    setMeta('description', comparison.metaDescription);
    setMeta('og:title', comparison.metaTitle, true);
    setMeta('og:description', comparison.metaDescription, true);
    setMeta('og:type', 'article', true);
    setMeta('og:url', `https://metalforge.io/vs/${comparison.slug}`, true);
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', comparison.metaTitle);
    setMeta('twitter:description', comparison.metaDescription);


    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', `https://metalforge.io/vs/${comparison.slug}`);


    let ldScript = document.querySelector('script[data-schema="drummer-comparison"]');
    if (!ldScript) {
      ldScript = document.createElement('script');
      ldScript.type = 'application/ld+json';
      ldScript.setAttribute('data-schema', 'drummer-comparison');
      document.head.appendChild(ldScript);
    }

    const comparisonSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": comparison.title,
      "description": comparison.metaDescription,
      "url": `https://metalforge.io/vs/${comparison.slug}`,
      "about": [
        {
          "@type": "Person",
          "name": drummer1.name,
          "description": drummer1.bio?.substring(0, 200) || `${drummer1.name} - ${drummer1.band}`,
          "jobTitle": "Drummer",
          "worksFor": {
            "@type": "MusicGroup",
            "name": drummer1.band
          }
        },
        {
          "@type": "Person",
          "name": drummer2.name,
          "description": drummer2.bio?.substring(0, 200) || `${drummer2.name} - ${drummer2.band}`,
          "jobTitle": "Drummer",
          "worksFor": {
            "@type": "MusicGroup",
            "name": drummer2.band
          }
        }
      ],
      "mainEntity": {
        "@type": "ItemList",
        "name": comparison.title,
        "description": `Side-by-side comparison of ${drummer1.name} and ${drummer2.name}`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "item": {
              "@type": "Person",
              "name": drummer1.name,
              "url": `https://metalforge.io/drummer/${drummer1.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
            }
          },
          {
            "@type": "ListItem",
            "position": 2,
            "item": {
              "@type": "Person",
              "name": drummer2.name,
              "url": `https://metalforge.io/drummer/${drummer2.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
            }
          }
        ]
      },
      "isPartOf": {
        "@type": "WebSite",
        "name": "MetalForge",
        "url": "https://metalforge.io"
      }
    };

    ldScript.textContent = JSON.stringify(comparisonSchema);

    // BreadcrumbList Schema
    let breadcrumbScript = document.querySelector('script[data-schema="drummer-comparison-breadcrumb"]');
    if (!breadcrumbScript) {
      breadcrumbScript = document.createElement('script');
      breadcrumbScript.type = 'application/ld+json';
      breadcrumbScript.setAttribute('data-schema', 'drummer-comparison-breadcrumb');
      document.head.appendChild(breadcrumbScript);
    }
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://metalforge.io" },
        { "@type": "ListItem", "position": 2, "name": "Drummer Comparisons", "item": "https://metalforge.io/vs" },
        { "@type": "ListItem", "position": 3, "name": comparison.title, "item": `https://metalforge.io/vs/${comparison.slug}` }
      ]
    };
    breadcrumbScript.textContent = JSON.stringify(breadcrumbSchema);
  } else {
    const title = 'Drummer vs Drummer Comparisons - Metal Legends Head to Head | MetalForge';
    const description = 'Compare metal drumming legends side by side. Lars Ulrich vs Dave Lombardo, Mario Duplantier vs Tomas Haake, and more.';
    document.title = title;
    setMeta('description', description);
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:type', 'website', true);
    setMeta('og:url', 'https://metalforge.io/vs', true);
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);


    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', 'https://metalforge.io/vs');


    let ldScript = document.querySelector('script[data-schema="drummer-comparison"]');
    if (!ldScript) {
      ldScript = document.createElement('script');
      ldScript.type = 'application/ld+json';
      ldScript.setAttribute('data-schema', 'drummer-comparison');
      document.head.appendChild(ldScript);
    }
    const allComparisons = getAllDrummerComparisons();
    const indexSchema = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Drummer vs Drummer Comparisons",
      "description": description,
      "url": "https://metalforge.io/vs",
      "mainEntity": {
        "@type": "ItemList",
        "name": "Metal Drummer Comparisons",
        "numberOfItems": allComparisons.length,
        "itemListElement": allComparisons.map((c, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "Article",
            "name": c.title,
            "url": `https://metalforge.io/vs/${c.slug}`,
            "description": c.metaDescription
          }
        }))
      },
      "isPartOf": {
        "@type": "WebSite",
        "name": "MetalForge",
        "url": "https://metalforge.io"
      }
    };
    ldScript.textContent = JSON.stringify(indexSchema);
  }
}

// ==========================================
// DRUMMING TECHNIQUES ROUTING (Issue #344)
// ==========================================

// Check if we're on a technique detail page (/techniques/:slug)
function isTechniqueDetailPage() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return false;
  return /^\/techniques\/[a-z0-9-]+$/i.test(window.location.pathname);
}

// Check if we're on the techniques index page (/techniques)
function isTechniquesIndexPage() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return false;
  const pathname = window.location.pathname;
  return pathname === '/techniques' || pathname === '/techniques/';
}

// Get technique slug from URL
function getTechniqueSlugFromURL() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return null;
  const match = window.location.pathname.match(/^\/techniques\/([a-z0-9-]+)$/i);
  return match ? match[1] : null;
}

// Update URL for technique page
function updateTechniqueURL(slug) {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return;
  const newPath = slug ? `/techniques/${slug}` : '/techniques';
  window.history.pushState({}, '', newPath);
}

// Update meta tags for technique pages
function updateTechniqueMeta(technique) {
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

  if (technique) {
    document.title = technique.metaTitle;
    setMeta('description', technique.metaDescription);
    setMeta('og:title', technique.metaTitle, true);
    setMeta('og:description', technique.metaDescription, true);
    setMeta('og:type', 'article', true);
    setMeta('og:url', `https://metalforge.io/techniques/${technique.slug}`, true);
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', technique.metaTitle);
    setMeta('twitter:description', technique.metaDescription);
    // Add article-specific tags for SEO
    setMeta('article:section', technique.category, true);
    if (technique.seoKeywords && technique.seoKeywords.length > 0) {
      setMeta('keywords', technique.seoKeywords.join(', '));
    }
  } else {
    const title = 'Metal Drumming Techniques - Blast Beats, Double Bass & More | MetalForge';
    const description = 'Master metal drumming techniques. Learn blast beats, double bass, gravity blasts, polyrhythms and more. Tutorials, pro tips, and gear recommendations.';
    document.title = title;
    setMeta('description', description);
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:type', 'website', true);
    setMeta('og:url', 'https://metalforge.io/techniques', true);
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('keywords', 'metal drumming techniques, blast beat, double bass, gravity blast, polyrhythms, drum tutorial');
  }
}

// Convert drummer name to URL slug
function toSlug(name) {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

// Find drummer by slug or ID (matching against slugified name or numeric ID)
function findDrummerBySlug(drummers, slugOrId) {
  if (!slugOrId || !drummers.length) return null;
  // First try to match by numeric ID
  const numericId = parseInt(slugOrId, 10);
  if (!isNaN(numericId)) {
    const byId = drummers.find(d => d.id === numericId);
    if (byId) return byId;
  }
  // Fall back to slug matching
  return drummers.find(d => toSlug(d.name) === slugOrId.toLowerCase());
}

// Update document meta for gear pages
function updateGearMeta(gear) {
  if (Platform.OS !== 'web' || typeof document === 'undefined') return;

  const title = `${gear.name} - Specs, Price & Who Uses It | Metal Drummer Gear`;
  const description = `${gear.description.substring(0, 150)}... See which pro drummers use the ${gear.name} and where to buy it.`;

  document.title = title;

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

  setMeta('description', description);
  setMeta('keywords', `${gear.name}, ${gear.brand} ${gear.category}, ${gear.category} review, ${gear.brand} drums, metal drumming gear`);
  setMeta('og:title', title, true);
  setMeta('og:description', description, true);
  setMeta('og:type', 'product', true);
  setMeta('og:image', gear.image, true);
  setMeta('twitter:card', 'summary_large_image');
  setMeta('twitter:title', title);
  setMeta('twitter:description', description);

  // Product schema for gear page
  let ldScript = document.querySelector('script[data-schema="main"]');
  if (!ldScript) {
    ldScript = document.createElement('script');
    ldScript.type = 'application/ld+json';
    ldScript.setAttribute('data-schema', 'main');
    document.head.appendChild(ldScript);
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": gear.name,
    "description": gear.description,
    "image": gear.image,
    "brand": {
      "@type": "Brand",
      "name": gear.brand
    },
    "category": gear.category,
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "EUR",
      "lowPrice": gear.priceEur,
      "highPrice": Math.round(gear.priceEur * 1.2),
      "offerCount": 2,
      "availability": "https://schema.org/InStock",
      "seller": [
        {
          "@type": "Organization",
          "name": "Thomann",
          "url": "https://www.thomann.de"
        },
        {
          "@type": "Organization",
          "name": "Sweetwater",
          "url": "https://www.sweetwater.com"
        }
      ]
    }
  };

  ldScript.textContent = JSON.stringify(schema);

  // Remove FAQ schema if it exists (not needed for gear pages)
  const faqScript = document.querySelector('script[data-schema="faq"]');
  if (faqScript) {
    faqScript.remove();
  }

  // BreadcrumbList schema for gear pages
  let breadcrumbScript = document.querySelector('script[data-schema="breadcrumb"]');
  if (!breadcrumbScript) {
    breadcrumbScript = document.createElement('script');
    breadcrumbScript.type = 'application/ld+json';
    breadcrumbScript.setAttribute('data-schema', 'breadcrumb');
    document.head.appendChild(breadcrumbScript);
  }

  const baseUrl = "https://metalforge.io";
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl + "/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Gear",
        "item": baseUrl + "/#gear"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": gear.name,
        "item": baseUrl + "/gear/" + gear.slug
      }
    ]
  };
  breadcrumbScript.textContent = JSON.stringify(breadcrumbSchema);
}

// Gear detail page component
function GearDetail({ gear, theme, onBack, onSelectDrummer }) {
  useEffect(() => {
    updateGearMeta(gear);
  }, [gear]);

  const affiliateLinks = getAffiliateLinks(gear.name, gear.category);

  const handleShopPress = (url) => {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      Linking.openURL(url);
    }
  };

  const categoryLabels = {
    drums: 'Drum Kit',
    snare: 'Snare Drum',
    cymbals: 'Cymbals',
    hardware: 'Hardware',
    sticks: 'Drumsticks'
  };

  return (
    <ScrollView style={styles.detailContainer} contentContainerStyle={styles.detailContent}>
      <TouchableOpacity
        onPress={onBack}
        style={[styles.backButton, { backgroundColor: theme.card, borderColor: theme.border }]}
        accessibilityRole="button"
        accessibilityLabel="Go back"
      >
        <Text style={[styles.backButtonText, { color: theme.text }]}>Back to List</Text>
      </TouchableOpacity>

      <View style={styles.gearDetailHeader}>
        <ImageWithFallback
          source={{ uri: gear.image }}
          style={styles.gearDetailImage}
          accessibilityLabel={`Photo of ${gear.name}`}
          width={150}
          height={150}
          imageContext="detail"
        />
        <View style={styles.gearDetailHeaderText}>
          <View style={[styles.gearCategoryBadge, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={[styles.gearCategoryText, { color: theme.secondaryText }]}>
              {categoryLabels[gear.category] || gear.category}
            </Text>
          </View>
          <Text style={[styles.gearDetailName, { color: theme.text }]} accessibilityRole="header">
            {gear.name}
          </Text>
          <Text style={[styles.gearDetailBrand, { color: theme.secondaryText }]}>{gear.brand}</Text>
        </View>
      </View>

      {/* Description */}
      <View style={[styles.section, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]} accessibilityRole="header">About This Gear</Text>
        <Text style={[styles.bioText, { color: theme.secondaryText }]}>{gear.description}</Text>
      </View>

      {/* Specs */}
      {gear.specs && Object.keys(gear.specs).length > 0 && (
        <View style={[styles.section, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]} accessibilityRole="header">Specifications</Text>
          {Object.entries(gear.specs).map(([key, value]) => (
            <View key={key} style={styles.specRow}>
              <Text style={[styles.specLabel, { color: theme.text }]}>
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </Text>
              <Text style={[styles.specValue, { color: theme.secondaryText }]}>{value}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Pricing & Buy Links */}
      <View style={[styles.section, styles.calculatorSection, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]} accessibilityRole="header">Price & Where to Buy</Text>
        <View style={styles.gearPriceContainer}>
          <View style={styles.gearPriceRow}>
            <Text style={[styles.gearPriceLabel, { color: theme.text }]}>Estimated Price (EUR)</Text>
            <Text style={[styles.gearPrice, { color: theme.text }]}>{formatPrice(gear.priceEur, 'EUR')}</Text>
          </View>
          <View style={styles.gearPriceRow}>
            <Text style={[styles.gearPriceLabel, { color: theme.text }]}>Estimated Price (USD)</Text>
            <Text style={[styles.gearPrice, { color: theme.text }]}>{formatPrice(gear.priceUsd, 'USD')}</Text>
          </View>
        </View>
        <View style={styles.buySetupContainer}>
          <TouchableOpacity
            onPress={() => handleShopPress(affiliateLinks.sweetwater)}
            style={[styles.buySetupButton, styles.buySetupButtonUS]}
            accessibilityRole="link"
            accessibilityLabel={`Buy ${gear.name} at Sweetwater (US)`}
          >
            <Text style={styles.buySetupButtonText}>Buy at Sweetwater (US)</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleShopPress(affiliateLinks.thomann)}
            style={[styles.buySetupButton, styles.buySetupButtonEU]}
            accessibilityRole="link"
            accessibilityLabel={`Buy ${gear.name} at Thomann (EU)`}
          >
            <Text style={styles.buySetupButtonText}>Buy at Thomann (EU)</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Which drummers use this gear */}
      {gear.usedBy && gear.usedBy.length > 0 && (
        <View style={[styles.section, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]} accessibilityRole="header">
            Pro Drummers Who Use This
          </Text>
          <Text style={[styles.usedBySubtitle, { color: theme.secondaryText }]}>
            {gear.usedBy.length} drummer{gear.usedBy.length !== 1 ? 's' : ''} in our database use{gear.usedBy.length === 1 ? 's' : ''} this gear
          </Text>
          <View style={styles.usedByContainer}>
            {gear.usedBy.map((drummer) => (
              <TouchableOpacity
                key={drummer.id}
                onPress={() => onSelectDrummer(drummer.id)}
                style={[styles.usedByCard, { borderColor: theme.border }]}
                accessibilityRole="button"
                accessibilityLabel={`View ${drummer.name}'s gear`}
              >
                <ImageWithFallback
                  source={{ uri: drummer.image }}
                  style={styles.usedByImage}
                  accessibilityLabel={`Photo of ${drummer.name}`}
                  width={50}
                  height={50}
                  imageContext="thumbnail"
                />
                <View style={styles.usedByText}>
                  <Text style={[styles.usedByName, { color: theme.text }]}>{drummer.name}</Text>
                  <Text style={[styles.usedByBand, { color: theme.secondaryText }]}>{drummer.band}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Related Gear */}
      {gear.relatedGear && gear.relatedGear.length > 0 && (
        <View style={[styles.section, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]} accessibilityRole="header">
            Related Gear
          </Text>
          <View style={styles.relatedGearContainer}>
            {gear.relatedGear.map((related) => (
              <TouchableOpacity
                key={related.id}
                onPress={() => {
                  if (Platform.OS === 'web' && typeof window !== 'undefined') {
                    window.history.pushState({}, '', `/gear/${related.slug}`);
                    window.dispatchEvent(new PopStateEvent('popstate'));
                  }
                }}
                style={[styles.relatedGearCard, { backgroundColor: theme.background, borderColor: theme.border }]}
                accessibilityRole="button"
                accessibilityLabel={`View ${related.name}`}
              >
                <ImageWithFallback
                  source={{ uri: related.image }}
                  style={styles.relatedGearImage}
                  accessibilityLabel={`Photo of ${related.name}`}
                  width={150}
                  height={100}
                  imageContext="gallery"
                />
                <Text style={[styles.relatedGearName, { color: theme.text }]} numberOfLines={2}>
                  {related.name}
                </Text>
                <Text style={[styles.relatedGearPrice, { color: theme.secondaryText }]}>
                  {formatPrice(related.priceEur, 'EUR')}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
}

// ===============================================
// QUIZ: "Find Your Match" Drummer Personality Quiz
// ===============================================
// Data moved to ./data/quizData.js for code splitting
// Lazy-loaded when quiz is accessed

// Get quiz questions (lazy loaded)
async function getQuizQuestionsAsync() {
  if (!_quizDataModule) {
    _quizDataModule = await loadQuizData();
  }
  return _quizDataModule.QUIZ_QUESTIONS;
}

// Get quiz questions synchronously (use after data is loaded)
function getQuizQuestions() {
  return _quizDataModule ? _quizDataModule.QUIZ_QUESTIONS : [];
}

// Get drummer profiles synchronously (use after data is loaded)
function getDrummerProfiles() {
  return _quizDataModule ? _quizDataModule.DRUMMER_PROFILES : {};
}

// Calculate matches using lazy-loaded data
function calculateMatchesSync(answers, drummers) {
  return _quizDataModule 
    ? _quizDataModule.calculateMatches(answers, drummers) 
    : [];
}

// Preload quiz data when user hovers or when page hints they might navigate
function preloadQuizData() {
  if (!_quizDataModule) {
    loadQuizData().then(m => { _quizDataModule = m; });
  }
}

// Track quiz completion in GA4
function trackQuizCompletion(matchedDrummer, matchPercentage) {
  if (Platform.OS === 'web' && typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'quiz_complete', {
      event_category: 'engagement',
      event_label: matchedDrummer.name,
      value: matchPercentage,
      matched_drummer: matchedDrummer.name,
      matched_drummer_id: matchedDrummer.id,
    });
  }
}

// Quiz View Component
function QuizView({ theme, onBack, drummers, onSelectDrummer }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState(null);
  const [email, setEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState('idle');
  const [sharedMatch, setSharedMatch] = useState(null);
  const [quizDataLoaded, setQuizDataLoaded] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);

  // Load quiz data on mount (lazy loading)
  useEffect(() => {
    loadQuizData().then(module => {
      _quizDataModule = module;
      setQuizQuestions(module.QUIZ_QUESTIONS);
      setQuizDataLoaded(true);
    });
  }, []);

  // Check for shared match in URL on mount
  useEffect(() => {
    if (drummers.length > 0 && quizDataLoaded) {
      const matchSlug = getQuizMatchFromURL();
      if (matchSlug) {
        const matchedDrummer = findDrummerBySlug(drummers, matchSlug);
        if (matchedDrummer) {
          // Create a result object for the shared match
          const profile = getDrummerProfiles()[matchedDrummer.id];
          const reasons = profile ? ['shared result'] : [];
          setResults([{ drummer: matchedDrummer, score: 85, reasons }]);
          setShowResults(true);
          setSharedMatch(matchedDrummer);
          // Update meta tags for shared result
          updateQuizMeta(matchedDrummer, 85);
        }
      } else {
        // Quiz page without result - show default meta
        updateQuizMeta(null, null);
      }
    }
  }, [drummers, quizDataLoaded]);

  const progress = quizQuestions.length > 0 ? ((currentQuestion + 1) / quizQuestions.length) * 100 : 0;

  const handleAnswer = (questionId, value) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);

    // Auto-advance after a short delay
    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        // Calculate results using lazy-loaded function
        const matches = calculateMatchesSync(newAnswers, drummers);
        setResults(matches);
        setShowResults(true);
        
        // Track completion and update URL/meta for sharing
        if (matches[0]) {
          const maxScore = 100; // theoretical max
          const matchPercentage = Math.min(99, Math.max(50, Math.round((matches[0].score / maxScore) * 100)));
          trackQuizCompletion(matches[0].drummer, matchPercentage);
          
          // Update URL for shareable result
          const drummerSlug = matches[0].drummer.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
          updateQuizResultURL(drummerSlug);
          
          // Update meta tags for social sharing
          updateQuizMeta(matches[0].drummer, matchPercentage);
        }
      }
    }, 300);
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setResults(null);
  };

  const handleShare = async (platform) => {
    if (!results || !results[0]) return;
    
    const topMatch = results[0].drummer;
    const matchPercent = Math.round((results[0].score / 100) * 100);
    const shareText = `I matched with ${topMatch.name} (${topMatch.band}) at ${matchPercent}% on the Metal Drummer Quiz! 🥁🤘`;
    const shareUrl = typeof window !== 'undefined' ? window.location.origin + '/quiz' : 'https://metalforge.io/quiz';

    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      let url;
      switch (platform) {
        case 'twitter':
          url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
          break;
        case 'facebook':
          url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
          break;
        case 'copy':
          try {
            await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
            alert('Copied to clipboard!');
          } catch (err) {
            console.error('Failed to copy:', err);
          }
          return;
        default:
          return;
      }
      window.open(url, '_blank', 'width=600,height=400');
    }
  };

  // Check if user just subscribed (redirected back from FormSubmit)
  useEffect(() => {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('subscribed') === 'true') {
        setNewsletterStatus('success');
      }
    }
  }, []);

  // Results View
  if (showResults && results) {
    const topMatch = results[0];
    const maxScore = 100;
    const matchPercent = Math.min(99, Math.max(50, Math.round((topMatch.score / maxScore) * 100)));
    const runnerUps = results.slice(1, 4);

    return (
      <ScrollView style={[styles.quizContainer, { backgroundColor: theme.background }]}>
        <View style={styles.quizContent}>
          {/* Back Button */}
          <TouchableOpacity
            onPress={onBack}
            style={[styles.backButton, { borderColor: theme.border }]}
            accessibilityRole="button"
            accessibilityLabel="Back to home"
          >
            <Text style={[styles.backButtonText, { color: theme.text }]}>← Back</Text>
          </TouchableOpacity>

          {/* Results Header */}
          <View style={styles.resultsHeader}>
            <Text style={[styles.resultsTitle, { color: theme.text }]}>
              🎉 Your Drummer Match!
            </Text>
          </View>

          {/* Top Match Card */}
          <View style={[styles.topMatchCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <View style={styles.matchPercentBadge}>
              <Text style={styles.matchPercentText}>{matchPercent}% Match</Text>
            </View>
            
            <ImageWithFallback
              source={{ uri: topMatch.drummer.image || PLACEHOLDER_IMAGE }}
              style={styles.topMatchImage}
              accessibilityLabel={`${topMatch.drummer.name} profile photo`}
              width={120}
              height={120}
              priority={true}
              imageContext="card"
            />
            
            <Text style={[styles.topMatchName, { color: theme.text }]}>
              {topMatch.drummer.name}
            </Text>
            <Text style={[styles.topMatchBand, { color: theme.secondaryText }]}>
              {topMatch.drummer.band}
            </Text>
            
            {topMatch.reasons.length > 0 && (
              <Text style={[styles.matchReasons, { color: theme.secondaryText }]}>
                Matched on: {topMatch.reasons.join(', ')}
              </Text>
            )}

            <TouchableOpacity
              onPress={() => onSelectDrummer(topMatch.drummer.id)}
              style={[styles.viewProfileButton, { backgroundColor: theme.primary }]}
              accessibilityRole="button"
            >
              <Text style={styles.viewProfileButtonText}>View Full Profile →</Text>
            </TouchableOpacity>
          </View>

          {/* Share Buttons */}
          <View style={styles.shareSection}>
            <Text style={[styles.shareTitle, { color: theme.text }]}>Share Your Result</Text>
            <View style={styles.shareButtons}>
              <TouchableOpacity
                onPress={() => handleShare('twitter')}
                style={[styles.shareButton, { backgroundColor: colors.buttons.ghost.bg, borderWidth: 1, borderColor: colors.buttons.ghost.border }]}
              >
                <Text style={[styles.shareButtonText, { color: '#1DA1F2' }]}>𝕏 Twitter</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleShare('facebook')}
                style={[styles.shareButton, { backgroundColor: colors.buttons.ghost.bg, borderWidth: 1, borderColor: colors.buttons.ghost.border }]}
              >
                <Text style={[styles.shareButtonText, { color: '#4267B2' }]}>Facebook</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleShare('copy')}
                style={[styles.shareButton, { backgroundColor: theme.border }]}
              >
                <Text style={[styles.shareButtonText, { color: theme.text }]}>📋 Copy</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Runner Ups */}
          {runnerUps.length > 0 && (
            <View style={styles.runnerUpsSection}>
              <Text style={[styles.runnerUpsTitle, { color: theme.text }]}>
                Other Strong Matches
              </Text>
              {runnerUps.map((match, index) => (
                <TouchableOpacity
                  key={match.drummer.id}
                  onPress={() => onSelectDrummer(match.drummer.id)}
                  style={[styles.runnerUpCard, { backgroundColor: theme.card, borderColor: theme.border }]}
                >
                  <ImageWithFallback
                    source={{ uri: match.drummer.image || PLACEHOLDER_IMAGE }}
                    style={styles.runnerUpImage}
                    accessibilityLabel={`${match.drummer.name} profile photo`}
                    width={48}
                    height={48}
                    imageContext="thumbnail"
                  />
                  <View style={styles.runnerUpInfo}>
                    <Text style={[styles.runnerUpName, { color: theme.text }]}>
                      {match.drummer.name}
                    </Text>
                    <Text style={[styles.runnerUpBand, { color: theme.secondaryText }]}>
                      {match.drummer.band}
                    </Text>
                  </View>
                  <Text style={[styles.runnerUpPercent, { color: theme.secondaryText }]}>
                    {Math.round((match.score / maxScore) * 100)}%
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Newsletter CTA */}
          <View style={[styles.quizNewsletter, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={[styles.quizNewsletterTitle, { color: theme.text }]}>
              🥁 Want More Drummer Content?
            </Text>
            <Text style={[styles.quizNewsletterSubtitle, { color: theme.secondaryText }]}>
              Get updates on new drummers, gear reviews, and exclusive content!
            </Text>
            
            {newsletterStatus === 'success' ? (
              <Text style={[styles.newsletterSuccess, { color: '#4ade80' }]}>
                ✓ You're subscribed! Thanks for joining.
              </Text>
            ) : Platform.OS === 'web' ? (
              <form
                action="https://formsubmit.co/ricardo@boomstrategy.io"
                method="POST"
                style={styles.rowLayout21}
              >
                {/* FormSubmit.co hidden fields */}
                <input type="hidden" name="_subject" value="MetalForge Newsletter Signup (Quiz)" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_next" value="https://metalforge.io/quiz?subscribed=true" />
                {/* Honeypot spam protection */}
                <input type="text" name="_honey" style={styles.displayMode2} />
                
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  className="newsletter-input"
                  style={{
                    flex: 1,
                    minWidth: 200,
                    padding: '12px 16px',
                    fontSize: 16,
                    borderRadius: 8,
                    border: `2px solid ${colors.border.hover}`,
                    backgroundColor: colors.bg.elevated,
                    color: colors.text.primary,
                    outline: 'none',
                  }}
                />
                <button
                  type="submit"
                  style={{
                    backgroundColor: colors.brand.primary,
                    padding: '12px 20px',
                    borderRadius: 8,
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 14,
                    fontWeight: 600,
                    color: colors.text.primary,
                  }}
                >
                  Subscribe
                </button>
              </form>
            ) : (
              <Text style={[styles.quizNewsletterSubtitle, { color: theme.secondaryText, marginTop: 8 }]}>
                Visit metalforge.io to subscribe!
              </Text>
            )}
          </View>

          {/* Restart Quiz */}
          <TouchableOpacity
            onPress={handleRestart}
            style={[styles.restartButton, { borderColor: theme.border }]}
          >
            <Text style={[styles.restartButtonText, { color: theme.text }]}>
              🔄 Take Quiz Again
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  // Show loading state while quiz data loads
  if (!quizDataLoaded || quizQuestions.length === 0) {
    return (
      <View style={[styles.quizContainer, { backgroundColor: theme.background, alignItems: 'center', justifyContent: 'center', paddingTop: 100 }]}>
        <ActivityIndicator size="large" color={theme.primary} />
        <Text style={[styles.quizSubtitle, { color: theme.secondaryText, marginTop: 16 }]}>
          Loading quiz...
        </Text>
      </View>
    );
  }

  // Quiz Questions View
  const question = quizQuestions[currentQuestion];

  return (
    <ScrollView style={[styles.quizContainer, { backgroundColor: theme.background }]}>
      <View style={styles.quizContent}>
        {/* Back Button */}
        <TouchableOpacity
          onPress={onBack}
          style={[styles.backButton, { borderColor: theme.border }]}
          accessibilityRole="button"
          accessibilityLabel="Back to home"
        >
          <Text style={[styles.backButtonText, { color: theme.text }]}>← Back</Text>
        </TouchableOpacity>

        {/* Quiz Header */}
        <View style={styles.quizHeader}>
          <Text style={[styles.quizTitle, { color: theme.text }]}>
            🥁 Find Your Drummer Match
          </Text>
          <Text style={[styles.quizSubtitle, { color: theme.secondaryText }]}>
            Answer {quizQuestions.length} questions to discover which legendary metal drummer matches your style!
          </Text>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { backgroundColor: theme.border }]}>
            <View 
              style={[styles.progressFill, { width: `${progress}%`, backgroundColor: theme.primary }]} 
            />
          </View>
          <Text style={[styles.progressText, { color: theme.secondaryText }]}>
            Question {currentQuestion + 1} of {quizQuestions.length}
          </Text>
        </View>

        {/* Question */}
        <View style={styles.questionSection}>
          <Text style={[styles.questionText, { color: theme.text }]}>
            {question.question}
          </Text>
        </View>

        {/* Options */}
        <View style={styles.optionsContainer}>
          {question.options.map((option) => {
            const isSelected = answers[question.id] === option.value;
            return (
              <TouchableOpacity
                key={option.value}
                onPress={() => handleAnswer(question.id, option.value)}
                style={[
                  styles.optionCard,
                  { 
                    backgroundColor: isSelected ? theme.primary + '20' : theme.card,
                    borderColor: isSelected ? theme.primary : theme.border,
                  }
                ]}
                accessibilityRole="button"
                accessibilityState={{ selected: isSelected }}
              >
                <Text style={[styles.optionLabel, { color: theme.text }]}>
                  {option.label}
                </Text>
                <Text style={[styles.optionDescription, { color: theme.secondaryText }]}>
                  {option.description}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Navigation */}
        {currentQuestion > 0 && (
          <TouchableOpacity
            onPress={handlePrevious}
            style={[styles.prevButton, { borderColor: theme.border }]}
          >
            <Text style={[styles.prevButtonText, { color: theme.secondaryText }]}>
              ← Previous Question
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

// ===============================================
// KIT QUIZ: "Guess the Drummer by Kit" Viral Quiz (Issue #551)
// ===============================================

// Kit Quiz View Component - Shows gear setup, users guess the drummer
function KitQuizView({ theme, onBack, drummers, onSelectDrummer }) {
  const { width } = useWindowDimensions();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [kitQuizDataLoaded, setKitQuizDataLoaded] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);

  // Load kit quiz data on mount (lazy loading)
  useEffect(() => {
    loadKitQuizData().then(module => {
      _kitQuizDataModule = module;
      setQuizQuestions(module.KIT_QUIZ_QUESTIONS);
      const shuffled = module.KIT_QUIZ_QUESTIONS.map(q => 
        module.shuffleArray ? module.shuffleArray(q.options) : q.options
      );
      setShuffledOptions(shuffled);
      setKitQuizDataLoaded(true);
    });
  }, []);

  // Check for shared result in URL on mount
  useEffect(() => {
    if (kitQuizDataLoaded) {
      const urlResult = getKitQuizResultFromURL();
      if (urlResult && urlResult.correct !== null && urlResult.total !== null) {
        setResults({
          correct: urlResult.correct,
          total: urlResult.total,
          percentage: Math.round((urlResult.correct / urlResult.total) * 100),
          score: urlResult.score || urlResult.correct * 10,
        });
        setShowResults(true);
      } else {
        updateKitQuizMeta(null);
      }
    }
  }, [kitQuizDataLoaded]);

  const progress = quizQuestions.length > 0 ? ((currentQuestion + 1) / quizQuestions.length) * 100 : 0;

  const handleStartQuiz = () => {
    setQuizStarted(true);
    trackKitQuizStart();
  };

  const handleAnswer = (drummerId) => {
    setSelectedOption(drummerId);
    const newAnswers = [...answers, drummerId];
    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
        setShowHint(false);
      } else {
        const result = _kitQuizDataModule.calculateKitQuizResult(newAnswers);
        setResults(result);
        setShowResults(true);
        trackKitQuizCompletion(result);
        updateKitQuizResultURL(result);
        updateKitQuizMeta(result);
      }
    }, 800);
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
    setResults(null);
    setSelectedOption(null);
    setShowHint(false);
    if (_kitQuizDataModule && _kitQuizDataModule.shuffleArray) {
      const shuffled = quizQuestions.map(q => _kitQuizDataModule.shuffleArray(q.options));
      setShuffledOptions(shuffled);
    }
  };

  const handleShare = async (platform) => {
    if (!results) return;
    
    const emoji = results.percentage >= 80 ? '🏆' : results.percentage >= 60 ? '🔥' : results.percentage >= 40 ? '🥁' : '😅';
    const shareText = `${emoji} I got ${results.correct}/${results.total} (${results.percentage}%) on the Metal Drummer Kit Quiz! Can you beat my score? 🤘`;
    const shareUrl = typeof window !== 'undefined' 
      ? `${window.location.origin}/kit-quiz?correct=${results.correct}&total=${results.total}` 
      : 'https://metalforge.io/kit-quiz';

    trackKitQuizShare(platform, results);

    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      let url;
      switch (platform) {
        case 'twitter':
          url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
          break;
        case 'facebook':
          url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
          break;
        case 'copy':
          try {
            await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
            alert('Copied to clipboard!');
          } catch (err) {
            console.error('Failed to copy:', err);
          }
          return;
        default:
          return;
      }
      window.open(url, '_blank', 'width=600,height=400');
    }
  };

  // Loading state
  if (!kitQuizDataLoaded || quizQuestions.length === 0) {
    return (
      <ScrollView style={[styles.quizContainer, { backgroundColor: theme.background }]}>
        <View style={styles.quizContent}>
          <View style={styles.kitQuizLoading}>
            <ActivityIndicator size="large" color={theme.primary} />
            <Text style={[styles.kitQuizLoadingText, { color: theme.secondaryText }]}>
              Loading Kit Quiz...
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }

  // Intro Screen
  if (!quizStarted && !showResults) {
    return (
      <ScrollView style={[styles.quizContainer, { backgroundColor: theme.background }]}>
        <View style={styles.quizContent}>
          <TouchableOpacity
            onPress={onBack}
            style={[styles.backButton, { borderColor: theme.border }]}
            accessibilityRole="button"
            accessibilityLabel="Back to home"
          >
            <Text style={[styles.backButtonText, { color: theme.text }]}>← Back</Text>
          </TouchableOpacity>

          <View style={styles.kitQuizIntro}>
            <Text style={styles.kitQuizIntroEmoji}>🎯</Text>
            <Text style={[styles.kitQuizIntroTitle, { color: theme.text }]}>
              Guess the Drummer by Kit
            </Text>
            <Text style={[styles.kitQuizIntroSubtitle, { color: theme.secondaryText }]}>
              Can you identify legendary metal drummers just by their gear setup?
            </Text>
            
            <View style={[styles.kitQuizInfoBox, { backgroundColor: theme.card, borderColor: theme.border }]}>
              <Text style={[styles.kitQuizInfoText, { color: theme.text }]}>🥁 {quizQuestions.length} questions</Text>
              <Text style={[styles.kitQuizInfoText, { color: theme.text }]}>⏱️ ~2 minutes</Text>
              <Text style={[styles.kitQuizInfoText, { color: theme.text }]}>🏆 Share your score</Text>
            </View>

            <TouchableOpacity
              onPress={handleStartQuiz}
              style={[styles.kitQuizStartButton, { backgroundColor: theme.primary }]}
              accessibilityRole="button"
            >
              <Text style={styles.kitQuizStartButtonText}>Start Quiz 🤘</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }

  // Results View
  if (showResults && results) {
    const resultMessage = _kitQuizDataModule.getResultMessage 
      ? _kitQuizDataModule.getResultMessage(results.percentage)
      : { emoji: '🥁', title: 'Quiz Complete!', message: '' };

    return (
      <ScrollView style={[styles.quizContainer, { backgroundColor: theme.background }]}>
        <View style={styles.quizContent}>
          <TouchableOpacity
            onPress={onBack}
            style={[styles.backButton, { borderColor: theme.border }]}
            accessibilityRole="button"
            accessibilityLabel="Back to home"
          >
            <Text style={[styles.backButtonText, { color: theme.text }]}>← Back</Text>
          </TouchableOpacity>

          <View style={styles.kitQuizResultsHeader}>
            <Text style={styles.kitQuizResultEmoji}>{resultMessage.emoji}</Text>
            <Text style={[styles.kitQuizResultTitle, { color: theme.text }]}>{resultMessage.title}</Text>
            <Text style={[styles.kitQuizResultMessage, { color: theme.secondaryText }]}>{resultMessage.message}</Text>
          </View>

          <View style={[styles.kitQuizScoreCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={[styles.kitQuizScoreNumber, { color: theme.primary }]}>{results.correct}/{results.total}</Text>
            <Text style={[styles.kitQuizScorePercent, { color: theme.text }]}>{results.percentage}% Correct</Text>
            <View style={[styles.kitQuizScoreBar, { backgroundColor: theme.border }]}>
              <View style={[styles.kitQuizScoreBarFill, { width: `${results.percentage}%`, backgroundColor: results.percentage >= 70 ? '#4ade80' : results.percentage >= 40 ? '#fbbf24' : '#f87171' }]} />
            </View>
          </View>

          <View style={styles.shareSection}>
            <Text style={[styles.shareTitle, { color: theme.text }]}>Challenge Your Friends!</Text>
            <View style={styles.shareButtons}>
              <TouchableOpacity onPress={() => handleShare('twitter')} style={[styles.shareButton, { backgroundColor: colors.buttons.ghost.bg, borderWidth: 1, borderColor: colors.buttons.ghost.border }]}>
                <Text style={[styles.shareButtonText, { color: '#1DA1F2' }]}>𝕏 Twitter</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleShare('facebook')} style={[styles.shareButton, { backgroundColor: colors.buttons.ghost.bg, borderWidth: 1, borderColor: colors.buttons.ghost.border }]}>
                <Text style={[styles.shareButtonText, { color: '#4267B2' }]}>Facebook</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleShare('copy')} style={[styles.shareButton, { backgroundColor: theme.border }]}>
                <Text style={[styles.shareButtonText, { color: theme.text }]}>📋 Copy</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.kitQuizActions}>
            <TouchableOpacity onPress={handleRestart} style={[styles.kitQuizActionButton, { backgroundColor: theme.primary }]}>
              <Text style={styles.kitQuizActionButtonText}>🔄 Play Again</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onBack} style={[styles.kitQuizActionButtonSecondary, { borderColor: theme.border }]}>
              <Text style={[styles.kitQuizActionButtonTextSecondary, { color: theme.text }]}>🥁 Explore Drummers</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }

  // Question View
  const question = quizQuestions[currentQuestion];
  const options = shuffledOptions[currentQuestion] || question.options;

  return (
    <ScrollView style={[styles.quizContainer, { backgroundColor: theme.background }]}>
      <View style={styles.quizContent}>
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { backgroundColor: theme.border }]}>
            <View style={[styles.progressFill, { width: `${progress}%`, backgroundColor: theme.primary }]} />
          </View>
          <Text style={[styles.progressText, { color: theme.secondaryText }]}>Question {currentQuestion + 1} of {quizQuestions.length}</Text>
        </View>

        <View style={[styles.kitQuizQuestionCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.kitQuizQuestionTitle, { color: theme.text }]}>🥁 Who uses this kit?</Text>
          
          <View style={styles.kitQuizGearList}>
            <View style={styles.kitQuizGearItem}>
              <Text style={[styles.kitQuizGearLabel, { color: theme.secondaryText }]}>Drums:</Text>
              <Text style={[styles.kitQuizGearValue, { color: theme.text }]}>{question.gear.drums}</Text>
            </View>
            <View style={styles.kitQuizGearItem}>
              <Text style={[styles.kitQuizGearLabel, { color: theme.secondaryText }]}>Snare:</Text>
              <Text style={[styles.kitQuizGearValue, { color: theme.text }]}>{question.gear.snare}</Text>
            </View>
            <View style={styles.kitQuizGearItem}>
              <Text style={[styles.kitQuizGearLabel, { color: theme.secondaryText }]}>Cymbals:</Text>
              <Text style={[styles.kitQuizGearValue, { color: theme.text }]}>{question.gear.cymbals}</Text>
            </View>
            <View style={styles.kitQuizGearItem}>
              <Text style={[styles.kitQuizGearLabel, { color: theme.secondaryText }]}>Hardware:</Text>
              <Text style={[styles.kitQuizGearValue, { color: theme.text }]}>{question.gear.hardware}</Text>
            </View>
            {question.gear.sticks && (
              <View style={styles.kitQuizGearItem}>
                <Text style={[styles.kitQuizGearLabel, { color: theme.secondaryText }]}>Sticks:</Text>
                <Text style={[styles.kitQuizGearValue, { color: theme.text }]}>{question.gear.sticks}</Text>
              </View>
            )}
          </View>

          {!showHint && !selectedOption && (
            <TouchableOpacity onPress={() => setShowHint(true)} style={[styles.kitQuizHintButton, { borderColor: theme.border }]}>
              <Text style={[styles.kitQuizHintButtonText, { color: theme.secondaryText }]}>💡 Need a hint?</Text>
            </TouchableOpacity>
          )}
          {showHint && (
            <View style={[styles.kitQuizHintBox, { backgroundColor: theme.background, borderColor: theme.border }]}>
              <Text style={[styles.kitQuizHintText, { color: theme.text }]}>{question.hint}</Text>
            </View>
          )}
        </View>

        <View style={styles.kitQuizOptions}>
          {options.map((drummerId) => {
            const drummer = drummers.find(d => d.id === drummerId);
            if (!drummer) return null;
            
            const isSelected = selectedOption === drummerId;
            const isCorrectAnswer = drummerId === question.correctDrummerId;
            const showFeedback = selectedOption !== null;
            
            let optionStyle = [styles.kitQuizOption, { backgroundColor: theme.card, borderColor: theme.border }];
            if (showFeedback) {
              if (isCorrectAnswer) {
                optionStyle = [styles.kitQuizOption, styles.kitQuizOptionCorrect];
              } else if (isSelected && !isCorrectAnswer) {
                optionStyle = [styles.kitQuizOption, styles.kitQuizOptionIncorrect];
              }
            }

            return (
              <TouchableOpacity
                key={drummerId}
                onPress={() => !selectedOption && handleAnswer(drummerId)}
                style={optionStyle}
                disabled={selectedOption !== null}
                accessibilityRole="button"
                accessibilityLabel={`${drummer.name} from ${drummer.band}`}
              >
                <ImageWithFallback
                  source={{ uri: drummer.image || PLACEHOLDER_IMAGE }}
                  style={styles.kitQuizOptionImage}
                  accessibilityLabel={`${drummer.name} photo`}
                  width={48}
                  height={48}
                  imageContext="thumbnail"
                />
                <View style={styles.kitQuizOptionInfo}>
                  <Text style={[styles.kitQuizOptionName, { color: showFeedback && isCorrectAnswer ? '#fff' : theme.text }]}>{drummer.name}</Text>
                  <Text style={[styles.kitQuizOptionBand, { color: showFeedback && isCorrectAnswer ? 'rgba(255,255,255,0.8)' : theme.secondaryText }]}>{drummer.band}</Text>
                </View>
                {showFeedback && isCorrectAnswer && <Text style={styles.kitQuizOptionCheck}>✓</Text>}
                {showFeedback && isSelected && !isCorrectAnswer && <Text style={styles.kitQuizOptionX}>✗</Text>}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}

// ===============================================
// COMPARE YOUR KIT: User Gear Comparison Tool
// ===============================================

// Helper to get/set user kit from localStorage
function getUserKitFromStorage() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem('metalforge_user_kit');
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

function saveUserKitToStorage(kit) {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return;
  try {
    localStorage.setItem('metalforge_user_kit', JSON.stringify(kit));
  } catch {}
}

// Helper to get compare-kit params from URL
function getCompareKitSlugFromURL() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return null;
  const match = window.location.pathname.match(/^\/compare-kit\/([a-z0-9-]+)$/i);
  return match ? match[1] : null;
}

// Update URL for shareable comparison
function updateCompareKitURL(drummerSlug) {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return;
  const newPath = drummerSlug ? `/compare-kit/${drummerSlug}` : '/';
  window.history.pushState({}, '', newPath);
}

// Calculate gear match percentage and details
function calculateGearMatch(userKit, drummerGear) {
  if (!userKit || !drummerGear) return { percentage: 0, matches: [], differences: [] };
  
  const gearCategories = ['drums', 'snare', 'cymbals', 'hardware', 'sticks'];
  const matches = [];
  const differences = [];
  let totalScore = 0;
  let maxScore = 0;
  
  gearCategories.forEach(category => {
    const userValue = (userKit[category] || '').toLowerCase().trim();
    const drummerValue = (drummerGear[category] || '').toLowerCase().trim();
    
    if (!drummerValue) return; // Skip if drummer doesn't have this category
    
    maxScore += 100;
    
    if (!userValue) {
      differences.push({
        category,
        userGear: null,
        drummerGear: drummerGear[category],
        matchType: 'missing'
      });
      return;
    }
    
    // Extract brand names for comparison
    const userBrands = userValue.split(/[\s,]+/).filter(w => w.length > 2);
    const drummerBrands = drummerValue.split(/[\s,]+/).filter(w => w.length > 2);
    
    // Check for brand matches
    const brandMatches = userBrands.filter(ub => 
      drummerBrands.some(db => db.includes(ub) || ub.includes(db))
    );
    
    // Check for exact or partial match
    if (userValue === drummerValue) {
      totalScore += 100;
      matches.push({
        category,
        userGear: userKit[category],
        drummerGear: drummerGear[category],
        matchType: 'exact'
      });
    } else if (brandMatches.length > 0) {
      // Brand match gives partial credit
      const brandScore = Math.min(80, brandMatches.length * 40);
      totalScore += brandScore;
      matches.push({
        category,
        userGear: userKit[category],
        drummerGear: drummerGear[category],
        matchType: 'brand',
        matchedBrands: brandMatches
      });
    } else {
      differences.push({
        category,
        userGear: userKit[category],
        drummerGear: drummerGear[category],
        matchType: 'different'
      });
    }
  });
  
  const percentage = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;
  
  return { percentage, matches, differences };
}

// Update document meta for compare-kit page
function updateCompareKitMeta(drummer, matchPercentage) {
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

  if (drummer && matchPercentage !== null) {
    const title = `My kit is ${matchPercentage}% match with ${drummer.name}! | Metal Drummer Gear`;
    const description = `Compare your drum kit with ${drummer.name}'s legendary gear setup. See what gear you share and find upgrades to match your idol's sound!`;
    const shareUrl = `https://metalforge.io/compare-kit/${toSlug(drummer.name)}`;

    document.title = title;
    setMeta('description', description);
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:type', 'website', true);
    setMeta('og:image', drummer.image || 'https://metalforge.io/og-compare.png', true);
    setMeta('og:url', shareUrl, true);
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', drummer.image);
  } else {
    const title = 'Compare Your Kit | Metal Drummer Gear';
    const description = 'Compare your drum kit with legendary metal drummers. See what gear you share and discover upgrades to match their sound!';

    document.title = title;
    setMeta('description', description);
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
  }
}

// Gear Input Form Component
function GearInputForm({ userKit, onKitChange, theme, isMobile }) {
  const gearFields = [
    { key: 'drums', label: 'Drums', placeholder: 'e.g., Tama Starclassic, Pearl Masters...' },
    { key: 'snare', label: 'Snare', placeholder: 'e.g., Tama Starphonic Steel 14x6...' },
    { key: 'cymbals', label: 'Cymbals', placeholder: 'e.g., Zildjian A Custom, Sabian AAX...' },
    { key: 'hardware', label: 'Hardware', placeholder: 'e.g., DW 9000 pedals, Pearl stands...' },
    { key: 'sticks', label: 'Sticks', placeholder: 'e.g., Vic Firth 5A, Zildjian 5B...' },
  ];

  return (
    <View style={styles.gearInputForm}>
      {gearFields.map(field => (
        <View key={field.key} style={styles.gearInputField}>
          <Text style={[styles.gearInputLabel, { color: theme.text }]}>{field.label}</Text>
          {Platform.OS === 'web' ? (
            <input
              type="text"
              value={userKit[field.key] || ''}
              onChange={(e) => onKitChange({ ...userKit, [field.key]: e.target.value })}
              placeholder={field.placeholder}
              style={{
                width: '100%',
                padding: '12px 16px',
                fontSize: 14,
                borderRadius: 8,
                border: `1px solid ${theme.border}`,
                backgroundColor: theme.background,
                color: theme.text,
                outline: 'none',
              }}
            />
          ) : (
            <TextInput
              value={userKit[field.key] || ''}
              onChangeText={(text) => onKitChange({ ...userKit, [field.key]: text })}
              placeholder={field.placeholder}
              placeholderTextColor={theme.secondaryText}
              style={[styles.gearInputText, { 
                backgroundColor: theme.background, 
                borderColor: theme.border, 
                color: theme.text 
              }]}
            />
          )}
        </View>
      ))}
    </View>
  );
}

// Comparison Result Card Component
function ComparisonResultCard({ match, drummer, theme, isMobile }) {
  const categoryLabels = {
    drums: '🥁 Drums',
    snare: '🔵 Snare',
    cymbals: '🔔 Cymbals',
    hardware: '⚙️ Hardware',
    sticks: '🥢 Sticks',
  };

  const getMatchBadge = (matchType) => {
    switch (matchType) {
      case 'exact':
        return { text: '✓ Perfect Match!', color: theme.success };
      case 'brand':
        return { text: '⚡ Brand Match', color: '#f59e0b' };
      case 'missing':
        return { text: '➕ Add Gear', color: '#6b7280' };
      case 'different':
        return { text: '↑ Upgrade Path', color: theme.primary };
      default:
        return { text: '', color: theme.secondaryText };
    }
  };

  const handleUpgradePress = (category, gearName) => {
    const searchTerm = encodeURIComponent(gearName);
    const url = `https://www.thomann.de/intl/search_dir.html?sw=${searchTerm}`;
    if (Platform.OS === 'web') {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      Linking.openURL(url);
    }
  };

  return (
    <View style={[styles.comparisonResultCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
      {/* Match Percentage Header */}
      <View style={styles.matchPercentageHeader}>
        <Text style={[styles.matchPercentageValue, { color: theme.text }]}>
          {match.percentage}%
        </Text>
        <Text style={[styles.matchPercentageLabel, { color: theme.secondaryText }]}>
          Match with {drummer.name}
        </Text>
      </View>

      {/* Matches Section */}
      {match.matches.length > 0 && (
        <View style={styles.matchesSection}>
          <Text style={[styles.matchesSectionTitle, { color: theme.success }]}>
            ✓ Shared Gear ({match.matches.length})
          </Text>
          {match.matches.map((item, index) => {
            const badge = getMatchBadge(item.matchType);
            return (
              <View key={index} style={[styles.matchItem, { backgroundColor: 'rgba(34, 197, 94, 0.1)' }]}>
                <View style={styles.matchItemHeader}>
                  <Text style={[styles.matchItemCategory, { color: theme.text }]}>
                    {categoryLabels[item.category]}
                  </Text>
                  <View style={[styles.matchBadge, { backgroundColor: badge.color }]}>
                    <Text style={styles.matchBadgeText}>{badge.text}</Text>
                  </View>
                </View>
                <Text style={[styles.matchItemGear, { color: theme.secondaryText }]}>
                  Your gear: {item.userGear}
                </Text>
                {item.matchType === 'brand' && item.matchedBrands && (
                  <Text style={[styles.matchItemNote, { color: '#f59e0b' }]}>
                    Matched brands: {item.matchedBrands.join(', ')}
                  </Text>
                )}
              </View>
            );
          })}
        </View>
      )}

      {/* Differences Section */}
      {match.differences.length > 0 && (
        <View style={styles.differencesSection}>
          <Text style={[styles.differencesSectionTitle, { color: theme.primary }]}>
            ↑ Upgrade Opportunities ({match.differences.length})
          </Text>
          {match.differences.map((item, index) => {
            const badge = getMatchBadge(item.matchType);
            return (
              <View key={index} style={[styles.differenceItem, { backgroundColor: 'rgba(220, 38, 38, 0.1)' }]}>
                <View style={styles.matchItemHeader}>
                  <Text style={[styles.matchItemCategory, { color: theme.text }]}>
                    {categoryLabels[item.category]}
                  </Text>
                  <View style={[styles.matchBadge, { backgroundColor: badge.color }]}>
                    <Text style={styles.matchBadgeText}>{badge.text}</Text>
                  </View>
                </View>
                {item.userGear && (
                  <Text style={[styles.matchItemGear, { color: theme.secondaryText }]}>
                    Your gear: {item.userGear}
                  </Text>
                )}
                <Text style={[styles.drummerGearLabel, { color: theme.text }]}>
                  {drummer.name}'s gear:
                </Text>
                <Text style={[styles.drummerGearValue, { color: theme.primary }]}>
                  {item.drummerGear}
                </Text>
                <TouchableOpacity
                  onPress={() => handleUpgradePress(item.category, item.drummerGear)}
                  style={styles.upgradeButton}
                  accessibilityRole="link"
                  accessibilityLabel={`Shop ${item.drummerGear}`}
                >
                  <Text style={styles.upgradeButtonText}>🛒 Shop This Gear</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
}

// Compare Your Kit View Component
function CompareYourKitView({ theme, onBack, drummer, onSelectDrummer }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  
  const [userKit, setUserKit] = useState(() => getUserKitFromStorage() || {
    drums: '',
    snare: '',
    cymbals: '',
    hardware: '',
    sticks: '',
  });
  const [showResults, setShowResults] = useState(false);
  const [matchResult, setMatchResult] = useState(null);

  // Save user kit to localStorage whenever it changes
  useEffect(() => {
    if (Object.values(userKit).some(v => v.trim())) {
      saveUserKitToStorage(userKit);
    }
  }, [userKit]);

  // Calculate match when showing results
  useEffect(() => {
    if (showResults && drummer) {
      const result = calculateGearMatch(userKit, drummer.gear);
      setMatchResult(result);
      updateCompareKitMeta(drummer, result.percentage);
      updateCompareKitURL(toSlug(drummer.name));
    }
  }, [showResults, drummer, userKit]);

  const handleCompare = () => {
    const hasGear = Object.values(userKit).some(v => v.trim());
    if (!hasGear) {
      if (Platform.OS === 'web') {
        alert('Please enter at least one piece of gear to compare!');
      }
      return;
    }
    setShowResults(true);
  };

  const handleEditKit = () => {
    setShowResults(false);
    setMatchResult(null);
  };

  const handleShare = async (platform) => {
    if (!matchResult || !drummer) return;
    
    const shareText = `My drum kit is ${matchResult.percentage}% match with ${drummer.name} (${drummer.band})! 🥁 Compare your kit:`;
    const shareUrl = typeof window !== 'undefined' 
      ? `${window.location.origin}/compare-kit/${toSlug(drummer.name)}`
      : `https://metalforge.io/compare-kit/${toSlug(drummer.name)}`;

    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      let url;
      switch (platform) {
        case 'twitter':
          url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
          break;
        case 'facebook':
          url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
          break;
        case 'copy':
          try {
            await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
            alert('Copied to clipboard!');
          } catch (err) {
            console.error('Failed to copy:', err);
          }
          return;
        default:
          return;
      }
      window.open(url, '_blank', 'width=600,height=400');
    }
  };

  // Results View
  if (showResults && matchResult) {
    return (
      <ScrollView style={[styles.compareKitContainer, { backgroundColor: theme.background }]}>
        <View style={styles.compareKitContent}>
          {/* Back Button */}
          <TouchableOpacity
            onPress={handleEditKit}
            style={[styles.backButton, { borderColor: theme.border }]}
            accessibilityRole="button"
            accessibilityLabel="Edit your kit"
          >
            <Text style={[styles.backButtonText, { color: theme.text }]}>← Edit My Kit</Text>
          </TouchableOpacity>

          {/* Results Header */}
          <View style={styles.compareKitResultsHeader}>
            <ImageWithFallback
              source={{ uri: drummer.image }}
              style={styles.compareKitDrummerImage}
              accessibilityLabel={`Photo of ${drummer.name}`}
              width={60}
              height={60}
              imageContext="thumbnail"
            />
            <Text style={[styles.compareKitResultsTitle, { color: theme.text }]}>
              Your Kit vs {drummer.name}
            </Text>
            <Text style={[styles.compareKitResultsSubtitle, { color: theme.secondaryText }]}>
              {drummer.band}
            </Text>
          </View>

          {/* Comparison Result Card */}
          <ComparisonResultCard 
            match={matchResult} 
            drummer={drummer} 
            theme={theme} 
            isMobile={isMobile} 
          />

          {/* Share Buttons */}
          <View style={styles.shareSection}>
            <Text style={[styles.shareTitle, { color: theme.text }]}>Share Your Comparison</Text>
            <View style={styles.shareButtons}>
              <TouchableOpacity
                onPress={() => handleShare('twitter')}
                style={[styles.shareButton, { backgroundColor: theme.shadowColor }]}
              >
                <Text style={styles.shareButtonText}>𝕏 Twitter</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleShare('facebook')}
                style={[styles.shareButton, { backgroundColor: '#1877F2' }]}
              >
                <Text style={styles.shareButtonText}>Facebook</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleShare('copy')}
                style={[styles.shareButton, { backgroundColor: theme.border }]}
              >
                <Text style={[styles.shareButtonText, { color: theme.text }]}>📋 Copy</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* View Drummer Profile CTA */}
          <TouchableOpacity
            onPress={() => onSelectDrummer(drummer.id)}
            style={[styles.viewProfileButton, { backgroundColor: theme.primary }]}
            accessibilityRole="button"
          >
            <Text style={styles.viewProfileButtonText}>View {drummer.name}'s Full Gear →</Text>
          </TouchableOpacity>

          {/* Back to Drummer */}
          <TouchableOpacity
            onPress={onBack}
            style={[styles.restartButton, { borderColor: theme.border }]}
          >
            <Text style={[styles.restartButtonText, { color: theme.text }]}>
              ← Back to {drummer.name}'s Profile
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  // Gear Input View
  return (
    <ScrollView style={[styles.compareKitContainer, { backgroundColor: theme.background }]}>
      <View style={styles.compareKitContent}>
        {/* Back Button */}
        <TouchableOpacity
          onPress={onBack}
          style={[styles.backButton, { borderColor: theme.border }]}
          accessibilityRole="button"
          accessibilityLabel="Back to drummer profile"
        >
          <Text style={[styles.backButtonText, { color: theme.text }]}>← Back</Text>
        </TouchableOpacity>

        {/* Header */}
        <View style={styles.compareKitHeader}>
          <Text style={[styles.compareKitTitle, { color: theme.text }]}>
            🥁 Compare Your Kit
          </Text>
          <Text style={[styles.compareKitSubtitle, { color: theme.secondaryText }]}>
            Enter your drum gear below to see how it matches up with {drummer.name}'s legendary setup!
          </Text>
        </View>

        {/* Drummer Info Card */}
        <View style={[styles.compareKitDrummerCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <ImageWithFallback
            source={{ uri: drummer.image }}
            style={styles.compareKitDrummerThumb}
            accessibilityLabel={`Photo of ${drummer.name}`}
            width={60}
            height={60}
            imageContext="thumbnail"
          />
          <View style={styles.compareKitDrummerInfo}>
            <Text style={[styles.compareKitDrummerName, { color: theme.text }]}>{drummer.name}</Text>
            <Text style={[styles.compareKitDrummerBand, { color: theme.secondaryText }]}>{drummer.band}</Text>
          </View>
        </View>

        {/* Gear Input Form */}
        <View style={[styles.section, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Your Gear</Text>
          <Text style={[styles.compareKitFormHint, { color: theme.secondaryText }]}>
            Enter your gear brands and models. The more detail, the better the match!
          </Text>
          <GearInputForm 
            userKit={userKit} 
            onKitChange={setUserKit} 
            theme={theme} 
            isMobile={isMobile}
          />
        </View>

        {/* Compare Button */}
        <TouchableOpacity
          onPress={handleCompare}
          style={[styles.compareKitSubmitButton]}
          accessibilityRole="button"
          accessibilityLabel="Compare your kit"
        >
          <Text style={styles.compareKitSubmitButtonText}>Compare My Kit 🔍</Text>
        </TouchableOpacity>

        {/* Saved Kit Note */}
        {Object.values(userKit).some(v => v.trim()) && (
          <Text style={[styles.savedKitNote, { color: theme.secondaryText }]}>
            💾 Your kit is saved and will be remembered for future comparisons!
          </Text>
        )}
      </View>
    </ScrollView>
  );
}

// Newsletter Signup Footer Component
function NewsletterFooter({ theme }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  
  // Check localStorage for dismissal (7-day expiration)
  const [isDismissed, setIsDismissed] = useState(() => {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      try {
        const dismissedUntil = localStorage.getItem('metalforge_newsletter_dismissed');
        if (dismissedUntil) {
          const dismissedDate = parseInt(dismissedUntil, 10);
          if (Date.now() < dismissedDate) {
            return true;
          }
          // Expired, remove from storage
          localStorage.removeItem('metalforge_newsletter_dismissed');
        }
        return false;
      } catch {
        return false;
      }
    }
    return false;
  });

  // Handle dismiss - set localStorage with 7-day expiration
  const handleDismiss = () => {
    const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;
    const dismissUntil = Date.now() + sevenDaysMs;
    try {
      localStorage.setItem('metalforge_newsletter_dismissed', dismissUntil.toString());
    } catch {}
    setIsDismissed(true);
  };

  // Check localStorage for previous subscription
  const [isSubscribed, setIsSubscribed] = useState(() => {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      try {
        return localStorage.getItem('metalforge_subscribed') === 'true';
      } catch {
        return false;
      }
    }
    return false;
  });

  // All useState hooks must be called before any conditional returns (React Rules of Hooks)
  const [email, setEmail] = useState('');
  const [gdprConsent, setGdprConsent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // If dismissed, don't render the component (must be after all hooks)
  if (isDismissed) {
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    if (!gdprConsent) {
      setError('Please agree to receive emails to subscribe');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, gdprConsent: true }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe');
      }
      
      // If email wasn't sent (e.g., email service not configured), show different message
      if (!data.emailSent) {
        setSuccessMessage("✓ You're subscribed! Welcome to the community. 🤘");
      } else {
        setSuccessMessage(data.message);
      }
      setIsSubscribed(true);
      setEmail('');
      setGdprConsent(false);
      
      // Save to localStorage
      try {
        localStorage.setItem('metalforge_subscribed', 'true');
      } catch {}
      
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // For web, render the newsletter form
  if (Platform.OS === 'web') {
    return (
      <View style={[styles.newsletterFooter, { backgroundColor: theme.card, borderTopColor: theme.border, position: 'relative' }]}>
        {/* Close button */}
        <TouchableOpacity
          onPress={handleDismiss}
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            width: 28,
            height: 28,
            borderRadius: 14,
            backgroundColor: 'rgba(255,255,255,0.1)',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
          }}
          accessibilityLabel="Dismiss newsletter panel"
          accessibilityRole="button"
        >
          <Text style={{ color: theme.secondaryText, fontSize: 16, fontWeight: '600' }}>✕</Text>
        </TouchableOpacity>
        <View style={[styles.newsletterContainer, isMobile && styles.newsletterContainerMobile]}>
          <View style={styles.newsletterTextSection}>
            <Text style={[styles.newsletterTitle, { color: theme.text }]}>
              🥁 Get Gear Updates from the Legends
            </Text>
            <Text style={[styles.newsletterSubtitle, { color: theme.secondaryText }]}>
              Join fellow metal drummers — new gear, pro setups, and exclusive content
            </Text>
          </View>

          {isSubscribed || successMessage ? (
            <View style={styles.newsletterSuccessContainer}>
              <Text style={[styles.newsletterSuccess, { color: '#4ade80' }]}>
                {successMessage || "✓ You're subscribed! Welcome to the community. 🤘"}
              </Text>
            </View>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                flex: 1,
                maxWidth: isMobile ? '100%' : 420,
                width: isMobile ? '100%' : 'auto',
              }}
            >
              <div style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                gap: 8,
              }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  disabled={isLoading}
                  className="newsletter-input"
                  style={{
                    flex: 1,
                    width: isMobile ? '100%' : 'auto',
                    padding: '12px 16px',
                    fontSize: 16,
                    borderRadius: 8,
                    border: `2px solid ${error ? colors.semantic.error : colors.border.hover}`,
                    backgroundColor: colors.bg.elevated,
                    color: colors.text.primary,
                    outline: 'none',
                    height: 48,
                    boxSizing: 'border-box',
                    opacity: isLoading ? 0.7 : 1,
                  }}
                  aria-label="Email address for newsletter signup"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  style={{
                    backgroundColor: isLoading ? '#a3a3a3' : colors.buttons.accent.bg,
                    padding: '12px 24px',
                    borderRadius: 8,
                    border: 'none',
                    height: 48,
                    minWidth: 120,
                    width: isMobile ? '100%' : 'auto',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    fontSize: 16,
                    fontWeight: 600,
                    color: theme.shadowColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  aria-label="Subscribe to newsletter"
                >
                  {isLoading ? 'Subscribing...' : 'Subscribe'}
                </button>
              </div>
              
              {/* GDPR Consent Checkbox */}
              <label style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 8,
                cursor: 'pointer',
                fontSize: 12,
                color: theme.secondaryText,
                lineHeight: 1.4,
              }}>
                <input
                  type="checkbox"
                  checked={gdprConsent}
                  onChange={(e) => setGdprConsent(e.target.checked)}
                  disabled={isLoading}
                  style={{
                    marginTop: 2,
                    accentColor: '#f59e0b',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                  }}
                />
                <span>
                  I agree to receive newsletter emails about gear updates and drummer content. 
                  You can unsubscribe anytime. See our{' '}
                  <a 
                    href="/privacy" 
                    style={styles.textDecor2}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Privacy Policy
                  </a>.
                </span>
              </label>
              
              {/* Error Message */}
              {error && (
                <Text style={{ color: colors.semantic.error, fontSize: 13, marginTop: -4 }}>
                  {error}
                </Text>
              )}
            </form>
          )}
        </View>
      </View>
    );
  }

  // For native platforms, keep simple UI (no form submission)
  return (
    <View style={[styles.newsletterFooter, { backgroundColor: theme.card, borderTopColor: theme.border, position: 'relative' }]}>
      {/* Close button */}
      <TouchableOpacity
        onPress={handleDismiss}
        style={{
          position: 'absolute',
          top: 12,
          right: 12,
          width: 28,
          height: 28,
          borderRadius: 14,
          backgroundColor: 'rgba(255,255,255,0.1)',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
        }}
        accessibilityLabel="Dismiss newsletter panel"
        accessibilityRole="button"
      >
        <Text style={{ color: theme.secondaryText, fontSize: 16, fontWeight: '600' }}>✕</Text>
      </TouchableOpacity>
      <View style={[styles.newsletterContainer, isMobile && styles.newsletterContainerMobile]}>
        <View style={styles.newsletterTextSection}>
          <Text style={[styles.newsletterTitle, { color: theme.text }]}>
            🥁 Get Gear Updates from the Legends
          </Text>
          <Text style={[styles.newsletterSubtitle, { color: theme.secondaryText }]}>
            Visit metalforge.io to subscribe to our newsletter!
          </Text>
        </View>
      </View>
    </View>
  );
}

function AppContent() {
  const { theme, isDarkMode } = useTheme();
  const [selectedDrummerId, setSelectedDrummerId] = useState(null);
  const [selectedDrummer, setSelectedDrummer] = useState(null);
  // Initialize loadingDetail to true if URL has a drummer slug (for deep linking support)
  const [loadingDetail, setLoadingDetail] = useState(() => getDrummerSlugFromURL() !== null);
  const [drummers, setDrummers] = useState([]);
  const [loadingDrummers, setLoadingDrummers] = useState(true);
  const [drummersError, setDrummersError] = useState(null);
  // Pre-computed spotlight from API for faster LCP (#536)
  const [apiSpotlight, setApiSpotlight] = useState(null);
  const [showCompare, setShowCompare] = useState(() => isComparePage());
  const [showQuiz, setShowQuiz] = useState(() => isQuizPage());
  const [showPrivacy, setShowPrivacy] = useState(() => isPrivacyPage());
  const [showQuotes, setShowQuotes] = useState(() => isQuotesPage());
  const [showSpotlights, setShowSpotlights] = useState(() => isSpotlightsPage());
  const [showGearByBudget, setShowGearByBudget] = useState(() => isGearByBudgetPage());
  const [showList, setShowList] = useState(() => isListPage());
  const [listSlug, setListSlug] = useState(() => getListSlugFromURL());
  const [showGearFinder, setShowGearFinder] = useState(() => isGearFinderPage());
  const [selectedGear, setSelectedGear] = useState(null);
  const [loadingGear, setLoadingGear] = useState(false);
  // Compare Your Kit state
  const [showCompareYourKit, setShowCompareYourKit] = useState(false);
  const [compareKitDrummer, setCompareKitDrummer] = useState(null);
  // Extended Bio Page state (Issue #305)
  const [showBioPage, setShowBioPage] = useState(() => isBioPage());
  const [bioSlug, setBioSlug] = useState(() => getDrummerBioSlugFromURL());

  // Band Detail Page state (Issue #349)
  const [showBandDetail, setShowBandDetail] = useState(() => isBandDetailPage());
  const [bandSlug, setBandSlug] = useState(() => getBandSlugFromURL());

  // Genre Landing Page state (Issue #340)
  const [showGenrePage, setShowGenrePage] = useState(() => isGenreLandingPage());
  const [genreSlug, setGenreSlug] = useState(() => getGenreSlugFromURL());
  const [showGenresList, setShowGenresList] = useState(() => isGenresListPage());

  // Kit Builder Page state (Issue #341)
  const [showKitBuilder, setShowKitBuilder] = useState(() => isKitBuilderPage());

  // Kit Quiz Page state (Issue #551)
  const [showKitQuiz, setShowKitQuiz] = useState(() => isKitQuizPage());

  // BPM Tap Calculator Page state (Issue #342)
  const [showBpmTap, setShowBpmTap] = useState(() => isBpmTapPage());
  
  // BPM Range Landing Page state (Issue #342)
  const [showBpmRange, setShowBpmRange] = useState(() => isBpmRangePage());
  const [bpmRangeSlug, setBpmRangeSlug] = useState(() => getBpmRangeSlugFromURL());

  // Birthday Calendar Page state (Issue #343)
  const [showBirthdayCalendar, setShowBirthdayCalendar] = useState(() => isBirthdayCalendarPage());

  // Gear Comparison Page state (Issue #345)
  const [showGearComparison, setShowGearComparison] = useState(() => isGearComparisonPage());
  const [gearComparisonSlug, setGearComparisonSlug] = useState(() => getGearComparisonSlugFromURL());
  const [showGearComparisonsIndex, setShowGearComparisonsIndex] = useState(() => isGearComparisonsIndexPage());

  // News Page state (Issue #514)
  const [showNewsPage, setShowNewsPage] = useState(() => isNewsPage());

  // Drummers Page state - full list with filters (Issue #497)
  const [showDrummersPage, setShowDrummersPage] = useState(() => isDrummersPage());

  // Drumming Techniques Page state (Issue #344)
  const [showTechniqueDetail, setShowTechniqueDetail] = useState(() => isTechniqueDetailPage());
  const [techniqueSlug, setTechniqueSlug] = useState(() => getTechniqueSlugFromURL());
  const [showTechniquesIndex, setShowTechniquesIndex] = useState(() => isTechniquesIndexPage());

  // Drummer vs Drummer Page state (Issue #558)
  const [showDrummerVsIndex, setShowDrummerVsIndex] = useState(() => isDrummerComparisonsIndexPage());
  const [showDrummerVsDetail, setShowDrummerVsDetail] = useState(() => isDrummerComparisonPage());
  const [drummerVsSlug, setDrummerVsSlug] = useState(() => getDrummerComparisonSlugFromURL());

  // Gear Category Page state (Issue #339)
  const [showGearIndex, setShowGearIndex] = useState(() => isGearIndexPage());
  const [showGearCategory, setShowGearCategory] = useState(() => isGearCategoryPage());
  const [gearCategory, setGearCategory] = useState(() => getGearCategoryFromURL());
  const [gearCategoryData, setGearCategoryData] = useState(null);
  const [loadingGearCategory, setLoadingGearCategory] = useState(false);

  // Search and filter state
  const [filters, setFilters] = useState(() => getFiltersFromURL());
  const [searchValue, setSearchValue] = useState(() => getFiltersFromURL().search || '');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchInputRef = useRef(null);
  
  // Show all drummers state - false by default to show only featured drummers on homepage (Issue #496)
  const [showAllDrummers, setShowAllDrummers] = useState(false);

  // Sort state - persisted in localStorage, can be overridden by URL param
  const [sortBy, setSortBy] = useState(() => {
    const urlFilters = getFiltersFromURL();
    return urlFilters.sort || getSortPreference();
  });

  // INP Optimization: Debounce the filter state update to prevent jank during typing
  // The search input value updates immediately, but filter computation is debounced
  const debouncedSearchValue = useDebounce(searchValue, 150);

  // Check if any filters are active (Issue #496)
  const hasActiveFilters = debouncedSearchValue || filters.genre || filters.brand;

  // Filter drummers based on search and filters
  // INP Optimization: Use debounced search value to prevent expensive filtering on every keystroke
  const filteredDrummers = useMemo(() => {
    let results = drummers;

    // Show only featured drummers on homepage when no filters are active (Issue #496)
    if (!hasActiveFilters && !showAllDrummers) {
      results = getFeaturedDrummers(drummers);
    }

    // Search filter - uses debounced value for performance
    if (debouncedSearchValue) {
      const query = debouncedSearchValue.toLowerCase();
      results = results.filter(d =>
        d.name.toLowerCase().includes(query) ||
        d.band.toLowerCase().includes(query) ||
        (d.genre && d.genre.toLowerCase().includes(query))
      );
    }

    // Genre filter (normalize hyphens to spaces for matching, e.g., 'nu-metal' matches 'Nu Metal')
    if (filters.genre) {
      const normalizedFilterGenre = filters.genre.replace(/-/g, ' ').toLowerCase();
      results = results.filter(d =>
        d.genre && d.genre.toLowerCase().includes(normalizedFilterGenre)
      );
    }

    // Brand filter (matches drums or cymbals gear info)
    if (filters.brand) {
      // Note: For brand filtering, we'd need full drummer data with gear info
      // Since list API only returns basic info, we filter by known brand associations
      // This is a client-side approximation; ideally the API would support brand filtering
      results = results.filter(d => {
        // Map known drummer IDs to brands based on our data
        const drummerBrands = {
          1: ['tama', 'zildjian'], // Lars Ulrich
          2: ['pearl', 'paiste'], // Joey Jordison
          3: ['pearl', 'sabian'], // Gene Hoglan
          4: ['tama', 'paiste'], // Dave Lombardo
          5: ['sonor', 'sabian'], // Tomas Haake
          6: ['pearl', 'zildjian'], // George Kollias
          7: ['tama', 'meinl'], // Eloy Casagrande
          8: ['pearl', 'zildjian'], // Ray Luzier
          9: ['pearl', 'zildjian'], // John Otto
          10: ['sjc', 'zildjian'], // Jay Weinberg
          11: ['ddrum', 'sabian'], // Vinnie Paul
          12: ['tama', 'zildjian'], // Charlie Benante
          13: ['tama', 'sabian'], // Mike Portnoy
          14: ['sonor', 'paiste'], // Danny Carey
          15: ['tama', 'meinl'], // Mario Duplantier
          16: ['dw', 'meinl'], // Brann Dailor
          17: ['mapex', 'meinl'], // Chris Adler
          18: ['pearl', 'meinl'], // Matt Halpern
          19: ['pearl', 'meinl'], // Inferno
          20: ['pearl', 'zildjian'], // Hellhammer
          21: ['ddrum', 'sabian'], // Pete Sandoval
          22: ['ludwig', 'zildjian'], // Art Cruz
          23: ['mapex', 'zildjian'], // Arin Ilejay
          24: ['dw', 'meinl'], // Navene Koperweis
          25: ['pearl', 'zildjian'], // Alex Bent
          26: ['pearl', 'sabian'], // Shannon Larkin
          27: ['tama', 'zildjian'], // Raymond Herrera
          28: ['sonor', 'meinl'], // Morgan Ågren
        };
        const brands = drummerBrands[d.id] || [];
        return brands.includes(filters.brand.toLowerCase());
      });
    }

    // Apply sorting
    const sorted = [...results];
    switch (sortBy) {
      case 'name-asc':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'band':
        sorted.sort((a, b) => a.band.localeCompare(b.band));
        break;
      case 'genre':
        sorted.sort((a, b) => (a.genre || '').localeCompare(b.genre || ''));
        break;
      case 'country':
        sorted.sort((a, b) => (a.country || '').localeCompare(b.country || ''));
        break;
      case 'recent':
        // Sort by ID descending (higher IDs are more recently added)
        sorted.sort((a, b) => b.id - a.id);
        break;
      default:
        sorted.sort((a, b) => a.name.localeCompare(b.name));
    }

    return sorted;
  }, [drummers, debouncedSearchValue, filters, sortBy, showAllDrummers, hasActiveFilters]);

  // Generate search suggestions
  const suggestions = useMemo(() => {
    if (!searchValue || searchValue.length < 2) return [];

    const query = searchValue.toLowerCase();
    const results = [];

    // Add matching drummers
    drummers
      .filter(d => d.name.toLowerCase().includes(query))
      .slice(0, 3)
      .forEach(d => results.push({ type: 'drummer', ...d }));

    // Add matching bands
    const matchingBands = [...new Set(
      drummers
        .filter(d => d.band.toLowerCase().includes(query))
        .map(d => d.band)
    )].slice(0, 2);
    matchingBands.forEach(band => {
      const drummer = drummers.find(d => d.band === band);
      results.push({ type: 'band', name: band, id: `band-${band}`, image: drummer?.image });
    });

    return results;
  }, [drummers, searchValue]);

  // Handle filter changes and update URL
  // Uses startTransition for non-urgent state updates (INP optimization)
  const handleFilterChange = useCallback((newFilters) => {
    // URL update is synchronous (fast)
    updateFiltersURL(newFilters);
    // Filter state update is non-blocking (INP optimization)
    startTransition(() => {
      setFilters(newFilters);
    });
  }, []);

  // Handle sort changes - persist to localStorage and update URL
  const handleSortChange = useCallback((newSort) => {
    setSortBy(newSort);
    saveSortPreference(newSort);
    // Update URL with sort param
    updateFiltersURL({ ...filters, sort: newSort });
  }, [filters]);

  // Handle search input changes
  // INP Optimization: Input value updates immediately for responsiveness
  // Filter computation uses debounced value to prevent jank
  const handleSearchChange = useCallback((text) => {
    // Immediate: Update input value for responsive typing
    setSearchValue(text);
    setShowSuggestions(true);
    // Non-blocking: Schedule filter update in transition
    startTransition(() => {
      setFilters(currentFilters => ({
        ...currentFilters,
        search: text
      }));
      updateFiltersURL({ ...filters, search: text });
    });
  }, [filters]);

  // Handle search clear
  const handleSearchClear = useCallback(() => {
    setSearchValue('');
    setShowSuggestions(false);
    // Non-blocking filter update
    startTransition(() => {
      setFilters(currentFilters => {
        const newFilters = { ...currentFilters, search: '' };
        updateFiltersURL(newFilters);
        return newFilters;
      });
    });
  }, []);

  // Handle suggestion selection
  const handleSelectSuggestion = useCallback((suggestion) => {
    setShowSuggestions(false);
    if (suggestion.type === 'drummer') {
      handleSelectDrummer(suggestion.id);
    } else if (suggestion.type === 'band') {
      setSearchValue(suggestion.name);
      handleFilterChange({ ...filters, search: suggestion.name });
    }
  }, [filters, handleFilterChange]);

  // Keyboard shortcut (Cmd/Ctrl + K)
  useEffect(() => {
    if (Platform.OS !== 'web' || typeof window === 'undefined') return;

    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      // Close suggestions on Escape
      if (e.key === 'Escape') {
        setShowSuggestions(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close suggestions when clicking outside
  useEffect(() => {
    if (Platform.OS !== 'web' || typeof window === 'undefined') return;

    const handleClickOutside = () => {
      setShowSuggestions(false);
    };

    // Delayed to avoid immediate close on input focus
    const timeout = setTimeout(() => {
      window.addEventListener('click', handleClickOutside);
    }, 100);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('click', handleClickOutside);
    };
  }, [showSuggestions]);

  // Load filters from URL on initial mount
  useEffect(() => {
    const urlFilters = getFiltersFromURL();
    if (urlFilters.search || urlFilters.genre || urlFilters.brand || urlFilters.era) {
      setFilters(urlFilters);
      setSearchValue(urlFilters.search || '');
    }
  }, []);

  // Initialize Core Web Vitals monitoring
  // Reports LCP, CLS, INP, FCP, TTFB to analytics
  useEffect(() => {
    initWebVitalsMonitoring();
    
    // Mark LCP complete after initial render for CSS animations
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      requestAnimationFrame(() => {
        document.body.classList.add('lcp-complete');
      });
      
      // TBT Optimization (#537): Preload data modules during idle time
      // This defers ~99KB of JavaScript parsing to after the page is interactive
      const preloadDataModules = () => {
        // Preload in priority order based on user navigation patterns
        preloadBands();
        preloadGenres();
        preloadBirthdays();
        preloadGearComparisons();
        preloadTechniques();
        preloadTop10Lists();
        preloadExtendedBios();
      };
      
      // Use requestIdleCallback for non-blocking preload
      if (typeof requestIdleCallback === 'function') {
        requestIdleCallback(preloadDataModules, { timeout: 3000 });
      } else {
        // Fallback: defer by 1 second
        setTimeout(preloadDataModules, 1000);
      }
    }
  }, []);
  
  // Preload above-fold drummer images for faster LCP (Issue #442)
  // This preloads the first 6 drummer card images after data loads
  useEffect(() => {
    if (Platform.OS !== 'web' || typeof document === 'undefined') return;
    if (!drummers || drummers.length === 0) return;
    
    // Preload first 6 drummer thumbnails (above-fold)
    const aboveFoldDrummers = drummers.slice(0, 6);
    aboveFoldDrummers.forEach((drummer, index) => {
      if (drummer.thumbnailUrl || drummer.image) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = drummer.thumbnailUrl || getOptimizedImageUrl(drummer.image, { width: IMAGE_WIDTHS.thumbnail });
        // Only high priority for first 2
        if (index < 2) {
          link.fetchPriority = 'high';
        }
        document.head.appendChild(link);
      }
    });
  }, [drummers]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoadingDrummers(true);
        setDrummersError(null);
        // Use combined init endpoint to reduce HTTP requests (SEO optimization)
        const response = await fetch(INIT_API_URL);
        if (!response.ok) {
          // Fallback to legacy endpoint if init fails
          const fallbackResponse = await fetch(API_URL);
          if (!fallbackResponse.ok) {
            throw new Error('Failed to fetch drummers');
          }
          const data = await fallbackResponse.json();
          const optimizedData = data.map(drummer => optimizeDrummerImages(drummer));
          setDrummers(optimizedData);
          return;
        }
        const { drummers: drummersData, currentSpotlight } = await response.json();
        // Optimize images for all drummers to reduce bandwidth
        const optimizedData = drummersData.map(drummer => optimizeDrummerImages(drummer));
        setDrummers(optimizedData);
        // Store pre-computed spotlight for faster LCP (#536)
        if (currentSpotlight) {
          setApiSpotlight(optimizeDrummerImages(currentSpotlight));
        }
      } catch (err) {
        setDrummersError(err.message);
      } finally {
        setLoadingDrummers(false);
      }
    };
    fetchInitialData();
  }, []);

  // Handle browser back/forward navigation
  useEffect(() => {
    if (Platform.OS !== 'web' || typeof window === 'undefined') return;

    const handlePopState = async () => {
      const gearSlug = getGearSlugFromURL();
      const drummerSlug = getDrummerSlugFromURL();
      const bioSlugFromURL = getDrummerBioSlugFromURL();

      if (bioSlugFromURL && drummers.length > 0) {
        // Load bio page
        const drummer = findDrummerBySlug(drummers, bioSlugFromURL);
        if (drummer) {
          setLoadingDetail(true);
          try {
            const detailUrl = window.location.hostname !== 'localhost'
              ? `/api/drummers/${drummer.id}`
              : `http://localhost:3001/api/drummers/${drummer.id}`;
            const response = await fetch(detailUrl);
            if (response.ok) {
              const data = await response.json();
              setSelectedDrummer(optimizeDrummerImages(data));
              setSelectedDrummerId(drummer.id);
              setShowBioPage(true);
              setBioSlug(bioSlugFromURL);
              setSelectedGear(null);
              setShowCompare(false);
              setShowQuiz(false);
              setShowPrivacy(false);
              setShowQuotes(false);
              setShowSpotlights(false);
              setShowGearByBudget(false);
              setShowGearFinder(false);
              setShowList(false);
              setListSlug(null);
            }
          } catch (err) {
            console.error('Error fetching drummer for bio:', err);
          } finally {
            setLoadingDetail(false);
          }
        }
      } else if (gearSlug) {
        // Load gear page
        setLoadingGear(true);
        setShowBioPage(false);
        setBioSlug(null);
        try {
          const response = await fetch(`${GEAR_API_URL}/${gearSlug}`);
          if (response.ok) {
            const data = await response.json();
            setSelectedGear(data);
            setSelectedDrummer(null);
            setSelectedDrummerId(null);
            setShowCompare(false);
          }
        } catch (err) {
          console.error('Error fetching gear:', err);
        } finally {
          setLoadingGear(false);
        }
      } else if (drummerSlug && drummers.length > 0) {
        // Load drummer profile page
        setShowBioPage(false);
        setBioSlug(null);
        const drummer = findDrummerBySlug(drummers, drummerSlug);
        if (drummer) {
          setLoadingDetail(true);
          try {
            const detailUrl = window.location.hostname !== 'localhost'
              ? `/api/drummers/${drummer.id}`
              : `http://localhost:3001/api/drummers/${drummer.id}`;
            const response = await fetch(detailUrl);
            if (response.ok) {
              const data = await response.json();
              setSelectedDrummer(optimizeDrummerImages(data));
              setSelectedDrummerId(drummer.id);
              setSelectedGear(null);
              setShowCompare(false);
            }
          } catch (err) {
            console.error('Error fetching drummer:', err);
          } finally {
            setLoadingDetail(false);
          }
        }
      } else if (isComparePage()) {
        setShowCompare(true);
        setShowQuiz(false);
        setSelectedDrummer(null);
        setSelectedDrummerId(null);
        setSelectedGear(null);
      } else if (isQuizPage()) {
        setShowQuiz(true);
        setShowCompare(false);
        setShowPrivacy(false);
        setSelectedDrummer(null);
        setSelectedDrummerId(null);
        setSelectedGear(null);
      } else if (isPrivacyPage()) {
        setShowPrivacy(true);
        setShowQuiz(false);
        setShowCompare(false);
        setShowQuotes(false);
        setSelectedDrummer(null);
        setSelectedDrummerId(null);
        setSelectedGear(null);
      } else if (isQuotesPage()) {
        setShowQuotes(true);
        setShowPrivacy(false);
        setShowQuiz(false);
        setShowCompare(false);
        setSelectedDrummer(null);
        setSelectedDrummerId(null);
        setSelectedGear(null);
      } else if (isBandDetailPage()) {
        // Band detail page (Issue #349)
        const slug = getBandSlugFromURL();
        setShowBandDetail(true);
        setBandSlug(slug);
        setShowQuotes(false);
        setShowPrivacy(false);
        setShowQuiz(false);
        setShowCompare(false);
        setShowBioPage(false);
        setBioSlug(null);
        setSelectedDrummer(null);
        setSelectedDrummerId(null);
        setSelectedGear(null);
      } else if (isGearIndexPage()) {
        // Gear index page (Issue #339)
        setShowGearIndex(true);
        setShowGearCategory(false);
        setGearCategory(null);
        setGearCategoryData(null);
        setShowBandDetail(false);
        setBandSlug(null);
        setShowQuotes(false);
        setShowPrivacy(false);
        setShowQuiz(false);
        setShowCompare(false);
        setShowBioPage(false);
        setBioSlug(null);
        setShowGearFinder(false);
        setShowGearByBudget(false);
        setShowList(false);
        setListSlug(null);
        setSelectedDrummer(null);
        setSelectedDrummerId(null);
        setSelectedGear(null);
      } else if (isGearCategoryPage()) {
        // Gear category page (Issue #339)
        const category = getGearCategoryFromURL();
        setShowGearCategory(true);
        setGearCategory(category);
        setShowGearIndex(false);
        setLoadingGearCategory(true);
        setShowBandDetail(false);
        setBandSlug(null);
        setShowQuotes(false);
        setShowPrivacy(false);
        setShowQuiz(false);
        setShowCompare(false);
        setShowBioPage(false);
        setBioSlug(null);
        setShowGearFinder(false);
        setShowGearByBudget(false);
        setShowList(false);
        setListSlug(null);
        setSelectedDrummer(null);
        setSelectedDrummerId(null);
        setSelectedGear(null);
        // Fetch category data
        fetch(`/api/gear/category/${category}`)
          .then(response => response.ok ? response.json() : null)
          .then(data => {
            if (data) setGearCategoryData(data);
          })
          .catch(err => console.error('Error fetching gear category:', err))
          .finally(() => setLoadingGearCategory(false));
      } else if (isKitBuilderPage()) {
        // Kit Builder page (Issue #341)
        setShowKitBuilder(true);
        setShowKitQuiz(false);
        setShowBpmTap(false);
        setShowBirthdayCalendar(false);
        setShowBandDetail(false);
        setBandSlug(null);
        setShowQuotes(false);
        setShowPrivacy(false);
        setShowQuiz(false);
        setShowCompare(false);
        setShowBioPage(false);
        setBioSlug(null);
        setShowGearFinder(false);
        setShowGearByBudget(false);
        setShowList(false);
        setListSlug(null);
        setSelectedDrummer(null);
        setSelectedDrummerId(null);
        setSelectedGear(null);
      } else if (isKitQuizPage()) {
        // Kit Quiz page (Issue #551)
        setShowKitQuiz(true);
        setShowKitBuilder(false);
        setShowBpmTap(false);
        setShowBirthdayCalendar(false);
        setShowBandDetail(false);
        setBandSlug(null);
        setShowQuotes(false);
        setShowPrivacy(false);
        setShowQuiz(false);
        setShowCompare(false);
        setShowBioPage(false);
        setBioSlug(null);
        setShowGearFinder(false);
        setShowGearByBudget(false);
        setShowList(false);
        setListSlug(null);
        setShowBpmRange(false);
        setBpmRangeSlug(null);
        setShowGenrePage(false);
        setGenreSlug(null);
        setShowGenresList(false);
        setShowGearComparison(false);
        setGearComparisonSlug(null);
        setShowGearComparisonsIndex(false);
        setShowTechniquesIndex(false);
        setShowTechniqueDetail(false);
        setTechniqueSlug(null);
        setSelectedDrummer(null);
        setSelectedDrummerId(null);
        setSelectedGear(null);
        updateKitQuizMeta(null);
      } else if (isBpmTapPage()) {
        // BPM Tap Calculator page (Issue #342)
        setShowBpmTap(true);
        setShowBpmRange(false);
        setBpmRangeSlug(null);
        setShowKitBuilder(false);
        setShowBirthdayCalendar(false);
        setShowBandDetail(false);
        setBandSlug(null);
        setShowQuotes(false);
        setShowPrivacy(false);
        setShowQuiz(false);
        setShowCompare(false);
        setShowBioPage(false);
        setBioSlug(null);
        setShowGearFinder(false);
        setShowGearByBudget(false);
        setShowList(false);
        setListSlug(null);
        setSelectedDrummer(null);
        setSelectedDrummerId(null);
        setSelectedGear(null);
        setShowGenrePage(false);
        setGenreSlug(null);
        setShowGenresList(false);
      } else if (isBpmRangePage()) {
        // BPM Range page (Issue #342)
        const slug = getBpmRangeSlugFromURL();
        setShowBpmRange(true);
        setBpmRangeSlug(slug);
        setShowBpmTap(false);
        setShowKitBuilder(false);
        setShowBirthdayCalendar(false);
        setShowBandDetail(false);
        setBandSlug(null);
        setShowQuotes(false);
        setShowPrivacy(false);
        setShowQuiz(false);
        setShowCompare(false);
        setShowBioPage(false);
        setBioSlug(null);
        setShowGearFinder(false);
        setShowGearByBudget(false);
        setShowList(false);
        setListSlug(null);
        setSelectedDrummer(null);
        setSelectedDrummerId(null);
        setSelectedGear(null);
        setShowGenrePage(false);
        setGenreSlug(null);
        setShowGenresList(false);
        setShowGearComparison(false);
        setGearComparisonSlug(null);
        setShowGearComparisonsIndex(false);
        setShowTechniquesIndex(false);
        setShowTechniqueDetail(false);
        setTechniqueSlug(null);
      } else if (isBirthdayCalendarPage()) {
        // Birthday Calendar page (Issue #343)
        setShowBirthdayCalendar(true);
        setShowKitBuilder(false);
        setShowBandDetail(false);
        setBandSlug(null);
        setShowQuotes(false);
        setShowPrivacy(false);
        setShowQuiz(false);
        setShowCompare(false);
        setShowBioPage(false);
        setBioSlug(null);
        setShowGearFinder(false);
        setShowGearByBudget(false);
        setShowList(false);
        setListSlug(null);
        setSelectedDrummer(null);
        setSelectedDrummerId(null);
        setSelectedGear(null);
        setShowGenrePage(false);
        setGenreSlug(null);
        setShowGenresList(false);
      } else if (isGenreLandingPage()) {
        // Genre landing page (Issue #340)
        const slug = getGenreSlugFromURL();
        setShowGenrePage(true);
        setGenreSlug(slug);
        setShowGenresList(false);
        setShowKitBuilder(false);
        setShowBandDetail(false);
        setBandSlug(null);
        setShowQuotes(false);
        setShowPrivacy(false);
        setShowQuiz(false);
        setShowCompare(false);
        setShowBioPage(false);
        setBioSlug(null);
        setShowGearFinder(false);
        setShowGearByBudget(false);
        setShowList(false);
        setListSlug(null);
        setSelectedDrummer(null);
        setSelectedDrummerId(null);
        setSelectedGear(null);
      } else if (isGenresListPage()) {
        // Genres list page (Issue #340)
        setShowGenresList(true);
        setShowGenrePage(false);
        setGenreSlug(null);
        setShowKitBuilder(false);
        setShowBandDetail(false);
        setBandSlug(null);
        setShowQuotes(false);
        setShowPrivacy(false);
        setShowQuiz(false);
        setShowCompare(false);
        setShowBioPage(false);
        setBioSlug(null);
        setShowGearFinder(false);
        setShowGearByBudget(false);
        setShowList(false);
        setListSlug(null);
        setSelectedDrummer(null);
        setSelectedDrummerId(null);
        setSelectedGear(null);
      } else if (isGearComparisonPage()) {
        // Gear comparison detail page (Issue #345)
        const slug = getGearComparisonSlugFromURL();
        setShowGearComparison(true);
        setGearComparisonSlug(slug);
        setShowGearComparisonsIndex(false);
        setShowGenresList(false);
        setShowGenrePage(false);
        setGenreSlug(null);
        setShowKitBuilder(false);
        setShowBandDetail(false);
        setBandSlug(null);
        setShowQuotes(false);
        setShowPrivacy(false);
        setShowQuiz(false);
        setShowCompare(false);
        setShowBioPage(false);
        setBioSlug(null);
        setShowGearFinder(false);
        setShowGearByBudget(false);
        setShowList(false);
        setListSlug(null);
        setSelectedDrummer(null);
        setSelectedDrummerId(null);
        setSelectedGear(null);
      } else if (isGearComparisonsIndexPage()) {
        // Gear comparisons index page (Issue #345)
        setShowGearComparisonsIndex(true);
        setShowGearComparison(false);
        setGearComparisonSlug(null);
        setShowGenresList(false);
        setShowGenrePage(false);
        setGenreSlug(null);
        setShowKitBuilder(false);
        setShowBandDetail(false);
        setBandSlug(null);
        setShowQuotes(false);
        setShowPrivacy(false);
        setShowQuiz(false);
        setShowCompare(false);
        setShowBioPage(false);
        setBioSlug(null);
        setShowGearFinder(false);
        setShowGearByBudget(false);
        setShowList(false);
        setListSlug(null);
        setSelectedDrummer(null);
        setSelectedDrummerId(null);
        setSelectedGear(null);
      } else if (isTechniqueDetailPage()) {
        // Technique detail page (Issue #344)
        preloadTechniques(); // Preload techniques module (TBT optimization #460)
        const slug = getTechniqueSlugFromURL();
        setShowTechniqueDetail(true);
        setTechniqueSlug(slug);
        setShowTechniquesIndex(false);
        setShowGearComparisonsIndex(false);
        setShowGearComparison(false);
        setGearComparisonSlug(null);
        setShowGenresList(false);
        setShowGenrePage(false);
        setGenreSlug(null);
        setShowKitBuilder(false);
        setShowBandDetail(false);
        setBandSlug(null);
        setShowQuotes(false);
        setShowPrivacy(false);
        setShowQuiz(false);
        setShowCompare(false);
        setShowBioPage(false);
        setBioSlug(null);
        setShowGearFinder(false);
        setShowGearByBudget(false);
        setShowList(false);
        setListSlug(null);
        setSelectedDrummer(null);
        setSelectedDrummerId(null);
        setSelectedGear(null);
        // Update meta tags
        const technique = getTechniqueBySlug(slug);
        if (technique) {
          updateTechniqueMeta(technique);
        }
      } else if (isTechniquesIndexPage()) {
        // Techniques index page (Issue #344)
        preloadTechniques(); // Preload techniques module (TBT optimization #460)
        setShowTechniquesIndex(true);
        setShowTechniqueDetail(false);
        setTechniqueSlug(null);
        setShowGearComparisonsIndex(false);
        setShowGearComparison(false);
        setGearComparisonSlug(null);
        setShowGenresList(false);
        setShowGenrePage(false);
        setGenreSlug(null);
        setShowKitBuilder(false);
        setShowBandDetail(false);
        setBandSlug(null);
        setShowQuotes(false);
        setShowPrivacy(false);
        setShowQuiz(false);
        setShowCompare(false);
        setShowBioPage(false);
        setBioSlug(null);
        setShowGearFinder(false);
        setShowGearByBudget(false);
        setShowList(false);
        setListSlug(null);
        setShowNewsPage(false);
        setShowDrummerVsIndex(false);
        setShowDrummerVsDetail(false);
        setDrummerVsSlug(null);
        setSelectedDrummer(null);
        setSelectedDrummerId(null);
        setSelectedGear(null);
        // Update meta tags
        updateTechniqueMeta(null);
      } else if (isDrummerComparisonPage()) {
        // Drummer vs detail page (Issue #558)
        preloadDrummerComparisons();
        const slug = getDrummerComparisonSlugFromURL();
        setShowDrummerVsDetail(true);
        setDrummerVsSlug(slug);
        setShowDrummerVsIndex(false);
        setShowTechniquesIndex(false);
        setShowTechniqueDetail(false);
        setTechniqueSlug(null);
        setShowGearComparisonsIndex(false);
        setShowGearComparison(false);
        setGearComparisonSlug(null);
        setShowGenresList(false);
        setShowGenrePage(false);
        setGenreSlug(null);
        setShowKitBuilder(false);
        setShowBandDetail(false);
        setBandSlug(null);
        setShowQuotes(false);
        setShowPrivacy(false);
        setShowQuiz(false);
        setShowCompare(false);
        setShowBioPage(false);
        setBioSlug(null);
        setShowGearFinder(false);
        setShowGearByBudget(false);
        setShowList(false);
        setListSlug(null);
        setShowNewsPage(false);
        setSelectedDrummer(null);
        setSelectedDrummerId(null);
        setSelectedGear(null);
      } else if (isDrummerComparisonsIndexPage()) {
        // Drummer vs index page (Issue #558)
        preloadDrummerComparisons();
        setShowDrummerVsIndex(true);
        setShowDrummerVsDetail(false);
        setDrummerVsSlug(null);
        setShowTechniquesIndex(false);
        setShowTechniqueDetail(false);
        setTechniqueSlug(null);
        setShowGearComparisonsIndex(false);
        setShowGearComparison(false);
        setGearComparisonSlug(null);
        setShowGenresList(false);
        setShowGenrePage(false);
        setGenreSlug(null);
        setShowKitBuilder(false);
        setShowBandDetail(false);
        setBandSlug(null);
        setShowQuotes(false);
        setShowPrivacy(false);
        setShowQuiz(false);
        setShowCompare(false);
        setShowBioPage(false);
        setBioSlug(null);
        setShowGearFinder(false);
        setShowGearByBudget(false);
        setShowList(false);
        setListSlug(null);
        setShowNewsPage(false);
        setSelectedDrummer(null);
        setSelectedDrummerId(null);
        setSelectedGear(null);
        // Update meta tags
        updateDrummerVsMeta(null);
      } else if (isNewsPage()) {
        // News page (Issue #514)
        setShowNewsPage(true);
        setShowTechniquesIndex(false);
        setShowTechniqueDetail(false);
        setTechniqueSlug(null);
        setShowGearComparisonsIndex(false);
        setShowGearComparison(false);
        setGearComparisonSlug(null);
        setShowGenresList(false);
        setShowGenrePage(false);
        setGenreSlug(null);
        setShowKitBuilder(false);
        setShowBandDetail(false);
        setBandSlug(null);
        setShowQuotes(false);
        setShowPrivacy(false);
        setShowQuiz(false);
        setShowCompare(false);
        setShowBioPage(false);
        setBioSlug(null);
        setShowGearFinder(false);
        setShowGearByBudget(false);
        setShowList(false);
        setListSlug(null);
        setSelectedDrummer(null);
        setSelectedDrummerId(null);
        setSelectedGear(null);
      } else {
        // Back to home page
        setShowCompare(false);
        setShowQuiz(false);
        setShowPrivacy(false);
        setShowQuotes(false);
        setShowNewsPage(false);
        setShowBioPage(false);
        setBioSlug(null);
        setShowBandDetail(false);
        setBandSlug(null);
        setShowGenrePage(false);
        setGenreSlug(null);
        setShowGenresList(false);
        setShowKitBuilder(false);
        setShowBirthdayCalendar(false);
        setShowGearIndex(false);
        setShowGearCategory(false);
        setGearCategory(null);
        setGearCategoryData(null);
        setShowGearComparison(false);
        setGearComparisonSlug(null);
        setShowGearComparisonsIndex(false);
        setShowTechniqueDetail(false);
        setTechniqueSlug(null);
        setShowTechniquesIndex(false);
        setSelectedGear(null);
        setSelectedDrummer(null);
        setSelectedDrummerId(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [drummers]);

  // Load gear page on initial mount if URL matches
  useEffect(() => {
    const loadInitialGear = async () => {
      const gearSlug = getGearSlugFromURL();
      if (gearSlug) {
        setLoadingGear(true);
        try {
          const response = await fetch(`${GEAR_API_URL}/${gearSlug}`);
          if (response.ok) {
            const data = await response.json();
            setSelectedGear(data);
          }
        } catch (err) {
          console.error('Error fetching gear:', err);
        } finally {
          setLoadingGear(false);
        }
      }
    };
    loadInitialGear();
  }, []);

  // Load drummer profile page on initial mount if URL matches /drummer/:slug
  useEffect(() => {
    const loadInitialDrummer = async () => {
      const drummerSlug = getDrummerSlugFromURL();
      if (!drummerSlug) return;

      // If drummers failed to load, clear loading state to show homepage
      if (drummersError) {
        setLoadingDetail(false);
        return;
      }

      if (drummers.length > 0) {
        const drummer = findDrummerBySlug(drummers, drummerSlug);
        if (drummer) {
          setLoadingDetail(true);
          try {
            const detailUrl = typeof window !== 'undefined' && window.location.hostname !== 'localhost'
              ? `/api/drummers/${drummer.id}`
              : `http://localhost:3001/api/drummers/${drummer.id}`;
            const response = await fetch(detailUrl);
            if (response.ok) {
              const data = await response.json();
              setSelectedDrummer(optimizeDrummerImages(data));
              setSelectedDrummerId(drummer.id);
            } else {
              // API error - redirect to home
              setLoadingDetail(false);
            }
          } catch (err) {
            console.error('Error fetching drummer:', err);
            setLoadingDetail(false);
          } finally {
            setLoadingDetail(false);
          }
        } else {
          // Invalid slug - drummer not found, redirect to home
          setLoadingDetail(false);
        }
      }
    };
    loadInitialDrummer();
  }, [drummers, drummersError]);

  // Load bio page on initial mount if URL matches /drummer/:slug/bio (Issue #305)
  useEffect(() => {
    const loadInitialBio = async () => {
      const bioSlugFromURL = getDrummerBioSlugFromURL();
      if (!bioSlugFromURL) return;

      if (drummersError) {
        setLoadingDetail(false);
        return;
      }

      if (drummers.length > 0) {
        const drummer = findDrummerBySlug(drummers, bioSlugFromURL);
        if (drummer) {
          setLoadingDetail(true);
          try {
            const detailUrl = typeof window !== 'undefined' && window.location.hostname !== 'localhost'
              ? `/api/drummers/${drummer.id}`
              : `http://localhost:3001/api/drummers/${drummer.id}`;
            const response = await fetch(detailUrl);
            if (response.ok) {
              const data = await response.json();
              setSelectedDrummer(optimizeDrummerImages(data));
              setSelectedDrummerId(drummer.id);
              setShowBioPage(true);
              setBioSlug(bioSlugFromURL);
            } else {
              setLoadingDetail(false);
            }
          } catch (err) {
            console.error('Error fetching drummer for bio:', err);
            setLoadingDetail(false);
          } finally {
            setLoadingDetail(false);
          }
        } else {
          setLoadingDetail(false);
        }
      }
    };
    loadInitialBio();
  }, [drummers, drummersError]);

  const handleSelectDrummer = async (id, skipUrlUpdate = false) => {
    console.log('[DEBUG] handleSelectDrummer called with id:', id);
    // Preload extended bios module for drummer detail page (TBT optimization #460)
    preloadExtendedBios();
    setLoadingDetail(true);
    // Reset all page states so drummer detail view shows
    setShowQuotes(false);
    setShowSpotlights(false);
    setShowList(false);
    setListSlug(null);
    setShowGearByBudget(false);
    setShowGearFinder(false);
    setShowCompare(false);
    setShowQuiz(false);
    setShowPrivacy(false);
    setShowBioPage(false);
    setBioSlug(null);
    setSelectedGear(null);
    // Fix #470: Reset band detail page states so drummer profile shows
    setShowBandDetail(false);
    setBandSlug(null);
    try {
      const detailUrl = typeof window !== 'undefined' && window.location.hostname !== 'localhost'
        ? `/api/drummers/${id}`
        : `http://localhost:3001/api/drummers/${id}`;
      console.log('[DEBUG] Fetching from:', detailUrl);
      const response = await fetch(detailUrl);
      console.log('[DEBUG] Response status:', response.status);
      if (!response.ok) {
        throw new Error('Failed to fetch drummer details');
      }
      const data = await response.json();
      console.log('[DEBUG] Got data for:', data.name);
      setSelectedDrummer(optimizeDrummerImages(data));
      setSelectedDrummerId(id);
      // Update URL to reflect the drummer profile
      if (!skipUrlUpdate && Platform.OS === 'web' && typeof window !== 'undefined') {
        const slug = toSlug(data.name);
        window.history.pushState({}, '', `/drummer/${slug}`);
      }
    } catch (err) {
      console.error('[DEBUG] Error fetching drummer details:', err);
    } finally {
      console.log('[DEBUG] Setting loadingDetail to false');
      setLoadingDetail(false);
    }
  };

  const handleBack = () => {
    setSelectedDrummerId(null);
    setSelectedDrummer(null);
    setShowCompare(false);
    setShowQuiz(false);
    setShowPrivacy(false);
    setSelectedGear(null);
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.history.pushState({}, '', '/');
    }
  };

  const handleSelectGear = async (slug) => {
    setLoadingGear(true);
    try {
      const response = await fetch(`${GEAR_API_URL}/${slug}`);
      if (response.ok) {
        const data = await response.json();
        setSelectedGear(data);
        setSelectedDrummer(null);
        setSelectedDrummerId(null);
        setShowCompare(false);
        setShowQuiz(false);
        if (Platform.OS === 'web' && typeof window !== 'undefined') {
          window.history.pushState({}, '', `/gear/${slug}`);
        }
      }
    } catch (err) {
      console.error('Error fetching gear:', err);
    } finally {
      setLoadingGear(false);
    }
  };

  const handleNavigateToCompare = () => {
    setShowCompare(true);
    setShowQuiz(false);
    setShowQuotes(false);
    setShowSpotlights(false);
    setShowGearByBudget(false);
setShowList(false);
    setListSlug(null);
    setShowGearFinder(false);
    setSelectedDrummer(null);
    setSelectedDrummerId(null);
    setSelectedGear(null);
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.history.pushState({}, '', '/compare');
    }
  };

  const handleNavigateToQuiz = () => {
    setShowQuiz(true);
    setShowCompare(false);
    setShowQuotes(false);
    setShowSpotlights(false);
    setShowGearByBudget(false);
    setShowList(false);
    setListSlug(null);
    setShowGearFinder(false);
    setSelectedDrummer(null);
    setSelectedDrummerId(null);
    setSelectedGear(null);
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.history.pushState({}, '', '/quiz');
    }
  };

  // Kit Quiz navigation (Issue #551) - Fix for #562, #566 (complete prop fix)
  const handleNavigateToKitQuiz = () => {
    setShowKitQuiz(true);
    setShowQuiz(false);
    setShowCompare(false);
    setShowQuotes(false);
    setShowSpotlights(false);
    setShowGearByBudget(false);
    setShowList(false);
    setListSlug(null);
    setShowGearFinder(false);
    setShowNewsPage(false);
    setSelectedDrummer(null);
    setSelectedDrummerId(null);
    setSelectedGear(null);
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.history.pushState({}, '', '/kit-quiz');
    }
  };

  const handleNavigateToQuotes = () => {
    setShowQuotes(true);
    setShowQuiz(false);
    setShowCompare(false);
    setShowPrivacy(false);
    setShowSpotlights(false);
    setShowGearByBudget(false);
    setShowList(false);
    setListSlug(null);
    setShowGearFinder(false);
    setShowNewsPage(false);
    setSelectedDrummer(null);
    setSelectedDrummerId(null);
    setSelectedGear(null);
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.history.pushState({}, '', '/quotes');
    }
  };

  // News Page navigation (Issue #514)
  const handleNavigateToNews = () => {
    setShowNewsPage(true);
    setShowQuotes(false);
    setShowQuiz(false);
    setShowCompare(false);
    setShowPrivacy(false);
    setShowSpotlights(false);
    setShowGearByBudget(false);
    setShowList(false);
    setListSlug(null);
    setShowGearFinder(false);
    setShowBandDetail(false);
    setBandSlug(null);
    setShowGenrePage(false);
    setGenreSlug(null);
    setSelectedDrummer(null);
    setSelectedDrummerId(null);
    setSelectedGear(null);
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.history.pushState({}, '', '/news');
    }
  };

  const handleNavigateToSpotlights = () => {
    setShowSpotlights(true);
    setShowQuiz(false);
    setShowCompare(false);
    setShowPrivacy(false);
    setShowQuotes(false);
    setShowGearByBudget(false);
    setShowList(false);
    setListSlug(null);
    setShowGearFinder(false);
    setSelectedDrummer(null);
    setSelectedDrummerId(null);
    setSelectedGear(null);
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.history.pushState({}, '', '/spotlights');
    }
  };

  const handleNavigateToGearByBudget = () => {
    setShowGearByBudget(true);
    setShowGearFinder(false);
    setShowSpotlights(false);
    setShowQuiz(false);
    setShowCompare(false);
    setShowPrivacy(false);
    setShowQuotes(false);
    setShowList(false);
    setListSlug(null);
    setSelectedDrummer(null);
    setSelectedDrummerId(null);
    setSelectedGear(null);
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.history.pushState({}, '', '/gear-by-budget');
    }
  };

  const handleNavigateToList = (slug) => {
    setShowList(true);
    setListSlug(slug);
    setShowGearByBudget(false);
    setShowGearFinder(false);
    setShowSpotlights(false);
    setShowQuiz(false);
    setShowCompare(false);
    setShowPrivacy(false);
    setShowQuotes(false);
    setSelectedDrummer(null);
    setSelectedDrummerId(null);
    setSelectedGear(null);
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.history.pushState({}, '', `/lists/${slug}`);
    }
  };

  const handleNavigateToGearFinder = () => {
    setShowGearFinder(true);
    setShowGearByBudget(false);
    setShowList(false);
    setListSlug(null);
    setShowSpotlights(false);
    setShowQuiz(false);
    setShowCompare(false);
    setShowPrivacy(false);
    setShowQuotes(false);
    setShowBioPage(false);
    setBioSlug(null);
    setSelectedDrummer(null);
    setSelectedDrummerId(null);
    setSelectedGear(null);
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.history.pushState({}, '', '/gear-finder');
    }
  };

  // Navigate to Kit Builder (Issue #341)
  const handleNavigateToKitBuilder = () => {
    setShowKitBuilder(true);
    setShowGearFinder(false);
    setShowGearByBudget(false);
    setShowList(false);
    setListSlug(null);
    setShowSpotlights(false);
    setShowQuiz(false);
    setShowCompare(false);
    setShowPrivacy(false);
    setShowQuotes(false);
    setShowBioPage(false);
    setBioSlug(null);
    setShowBandDetail(false);
    setBandSlug(null);
    setSelectedDrummer(null);
    setSelectedDrummerId(null);
    setSelectedGear(null);
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.history.pushState({}, '', '/kit-builder');
    }
  };

  // Navigate to Birthday Calendar (Issue #343)
  const handleNavigateToBirthdayCalendar = () => {
    setShowBirthdayCalendar(true);
    setShowKitBuilder(false);
    setShowGearFinder(false);
    setShowGearByBudget(false);
    setShowList(false);
    setListSlug(null);
    setShowSpotlights(false);
    setShowQuiz(false);
    setShowCompare(false);
    setShowPrivacy(false);
    setShowQuotes(false);
    setShowBioPage(false);
    setBioSlug(null);
    setShowBandDetail(false);
    setBandSlug(null);
    setSelectedDrummer(null);
    setSelectedDrummerId(null);
    setSelectedGear(null);
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.history.pushState({}, '', '/birthdays');
    }
  };

  // Navigate to BPM Tap Calculator (Issue #342)
  const handleNavigateToBpmTap = () => {
    setShowBpmTap(true);
    setShowKitBuilder(false);
    setShowBirthdayCalendar(false);
    setShowGearFinder(false);
    setShowGearByBudget(false);
    setShowList(false);
    setListSlug(null);
    setShowSpotlights(false);
    setShowQuiz(false);
    setShowCompare(false);
    setShowPrivacy(false);
    setShowQuotes(false);
    setShowBioPage(false);
    setBioSlug(null);
    setShowBandDetail(false);
    setBandSlug(null);
    setSelectedDrummer(null);
    setSelectedDrummerId(null);
    setSelectedGear(null);
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.history.pushState({}, '', '/bpm');
    }
  };

  // Navigate to BPM Range Page (Issue #342)
  const handleNavigateToBpmRange = (rangeSlug) => {
    setShowBpmRange(true);
    setBpmRangeSlug(rangeSlug);
    setShowBpmTap(false);
    setShowKitBuilder(false);
    setShowBirthdayCalendar(false);
    setShowGearFinder(false);
    setShowGearByBudget(false);
    setShowList(false);
    setListSlug(null);
    setShowSpotlights(false);
    setShowQuiz(false);
    setShowCompare(false);
    setShowPrivacy(false);
    setShowQuotes(false);
    setShowBioPage(false);
    setBioSlug(null);
    setShowBandDetail(false);
    setBandSlug(null);
    setSelectedDrummer(null);
    setSelectedDrummerId(null);
    setSelectedGear(null);
    setShowGenrePage(false);
    setGenreSlug(null);
    setShowGenresList(false);
    setShowGearComparison(false);
    setGearComparisonSlug(null);
    setShowGearComparisonsIndex(false);
    setShowTechniquesIndex(false);
    setShowTechniqueDetail(false);
    setTechniqueSlug(null);
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.history.pushState({}, '', `/bpm/${rangeSlug}`);
    }
  };

  // Navigate to extended bio page (Issue #305)
  const handleNavigateToBio = async (drummerSlug) => {
    // First ensure we have the drummer data
    const drummer = findDrummerBySlug(drummers, drummerSlug);
    if (!drummer) return;

    // Fetch full drummer details if not already selected
    if (!selectedDrummer || toSlug(selectedDrummer.name) !== drummerSlug) {
      try {
        const detailUrl = typeof window !== 'undefined' && window.location.hostname !== 'localhost'
          ? `/api/drummers/${drummer.id}`
          : `http://localhost:3001/api/drummers/${drummer.id}`;
        const response = await fetch(detailUrl);
        if (response.ok) {
          const data = await response.json();
          setSelectedDrummer(optimizeDrummerImages(data));
          setSelectedDrummerId(drummer.id);
        }
      } catch (err) {
        console.error('Error fetching drummer for bio:', err);
        return;
      }
    }

    // Show bio page
    setShowBioPage(true);
    setBioSlug(drummerSlug);
    // Reset other views
    setShowGearFinder(false);
    setShowGearByBudget(false);
    setShowList(false);
    setListSlug(null);
    setShowSpotlights(false);
    setShowQuiz(false);
    setShowCompare(false);
    setShowPrivacy(false);
    setShowQuotes(false);
    setSelectedGear(null);
    // Update URL
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.history.pushState({}, '', `/drummer/${drummerSlug}/bio`);
    }
  };

  // Handle back from bio page
  const handleBackFromBio = () => {
    setShowBioPage(false);
    setBioSlug(null);
    // Navigate back to drummer profile
    if (selectedDrummer && Platform.OS === 'web' && typeof window !== 'undefined') {
      const slug = toSlug(selectedDrummer.name);
      window.history.pushState({}, '', `/drummer/${slug}`);
    }
  };

  // Navigate to band detail page (Issue #349)
  const handleNavigateToBand = (slug) => {
    setShowBandDetail(true);
    setBandSlug(slug);
    // Reset other views
    setShowGearFinder(false);
    setShowGearByBudget(false);
    setShowList(false);
    setListSlug(null);
    setShowSpotlights(false);
    setShowQuiz(false);
    setShowCompare(false);
    setShowPrivacy(false);
    setShowQuotes(false);
    setShowBioPage(false);
    setBioSlug(null);
    setSelectedDrummer(null);
    setSelectedDrummerId(null);
    setSelectedGear(null);
    // Update URL
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.history.pushState({}, '', `/bands/${slug}`);
    }
  };

  // Handle back from band detail page
  const handleBackFromBand = () => {
    setShowBandDetail(false);
    setBandSlug(null);
    // Navigate back to home
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.history.pushState({}, '', '/');
    }
  };

  // Navigate to genre landing page (Issue #340)
  const handleNavigateToGenre = (slug) => {
    setShowGenrePage(true);
    setGenreSlug(slug);
    setShowGenresList(false);
    // Reset other views
    setShowKitBuilder(false);
    setShowGearFinder(false);
    setShowGearByBudget(false);
    setShowGearIndex(false);
    setShowGearCategory(false);
    setGearCategory(null);
    setGearCategoryData(null);
    setShowBandDetail(false);
    setBandSlug(null);
    setShowList(false);
    setListSlug(null);
    setShowSpotlights(false);
    setShowQuiz(false);
    setShowCompare(false);
    setShowPrivacy(false);
    setShowQuotes(false);
    setShowBioPage(false);
    setBioSlug(null);
    setSelectedDrummer(null);
    setSelectedDrummerId(null);
    setSelectedGear(null);
    // Update URL
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.history.pushState({}, '', `/genre/${slug}`);
    }
  };

  // Navigate to genres list page (Issue #340)
  const handleNavigateToGenresList = () => {
    setShowGenresList(true);
    setShowGenrePage(false);
    setGenreSlug(null);
    // Reset other views
    setShowKitBuilder(false);
    setShowGearFinder(false);
    setShowGearByBudget(false);
    setShowGearIndex(false);
    setShowGearCategory(false);
    setGearCategory(null);
    setGearCategoryData(null);
    setShowBandDetail(false);
    setBandSlug(null);
    setShowList(false);
    setListSlug(null);
    setShowSpotlights(false);
    setShowQuiz(false);
    setShowCompare(false);
    setShowPrivacy(false);
    setShowQuotes(false);
    setShowBioPage(false);
    setBioSlug(null);
    setSelectedDrummer(null);
    setSelectedDrummerId(null);
    setSelectedGear(null);
    // Update URL
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.history.pushState({}, '', '/genres');
    }
  };

  // Navigate to dedicated drummers page with filters (Issue #497)
  const handleNavigateToDrummers = (genre = null) => {
    setShowDrummersPage(true);
    // Reset other views
    setShowGenresList(false);
    setShowGenrePage(false);
    setGenreSlug(null);
    setShowKitBuilder(false);
    setShowGearFinder(false);
    setShowGearByBudget(false);
    setShowGearIndex(false);
    setShowGearCategory(false);
    setGearCategory(null);
    setGearCategoryData(null);
    setShowBandDetail(false);
    setBandSlug(null);
    setShowList(false);
    setListSlug(null);
    setShowSpotlights(false);
    setShowQuiz(false);
    setShowCompare(false);
    setShowPrivacy(false);
    setShowQuotes(false);
    setShowBioPage(false);
    setBioSlug(null);
    setSelectedDrummer(null);
    setSelectedDrummerId(null);
    setSelectedGear(null);
    setShowTechniquesIndex(false);
    setShowTechniqueDetail(false);
    setTechniqueSlug(null);
    setShowNewsPage(false);
    setShowBpmTap(false);
    setShowBpmRange(false);
    setShowBirthdayCalendar(false);
    setShowGearComparison(false);
    setShowGearComparisonsIndex(false);
    // Set genre filter if provided
    if (genre) {
      setFilters(prev => ({ ...prev, genre }));
    }
    // Update URL
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      const url = genre ? `/drummers?genre=${encodeURIComponent(genre)}` : '/drummers';
      window.history.pushState({}, '', url);
    }
  };

  // Handle back from genre landing page (Issue #340)
  const handleBackFromGenre = () => {
    setShowGenrePage(false);
    setGenreSlug(null);
    // Navigate back to home
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.history.pushState({}, '', '/');
    }
  };

  // Handle back from genres list page (Issue #340)
  const handleBackFromGenresList = () => {
    setShowGenresList(false);
    // Navigate back to home
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.history.pushState({}, '', '/');
    }
  };

  // Navigate to gear category page (Issue #339)
  const handleNavigateToGearCategory = async (category) => {
    setShowGearCategory(true);
    setGearCategory(category);
    setShowGearIndex(false);
    setLoadingGearCategory(true);
    // Reset other views
    setShowGearFinder(false);
    setShowGearByBudget(false);
    setShowBandDetail(false);
    setBandSlug(null);
    setShowList(false);
    setListSlug(null);
    setShowSpotlights(false);
    setShowQuiz(false);
    setShowCompare(false);
    setShowPrivacy(false);
    setShowQuotes(false);
    setShowBioPage(false);
    setBioSlug(null);
    setSelectedDrummer(null);
    setSelectedDrummerId(null);
    setSelectedGear(null);
    // Update URL
    updateGearCategoryURL(category);
    // Fetch category data
    try {
      const response = await fetch(`/api/gear/category/${category}`);
      if (response.ok) {
        const data = await response.json();
        setGearCategoryData(data);
      }
    } catch (err) {
      console.error('Error fetching gear category:', err);
    } finally {
      setLoadingGearCategory(false);
    }
  };

  // Navigate to gear index page (Issue #339)
  const handleNavigateToGearIndex = () => {
    setShowGearIndex(true);
    setShowGearCategory(false);
    setGearCategory(null);
    setGearCategoryData(null);
    // Reset other views
    setShowGearFinder(false);
    setShowGearByBudget(false);
    setShowBandDetail(false);
    setBandSlug(null);
    setShowList(false);
    setListSlug(null);
    setShowSpotlights(false);
    setShowQuiz(false);
    setShowCompare(false);
    setShowPrivacy(false);
    setShowQuotes(false);
    setShowBioPage(false);
    setBioSlug(null);
    setSelectedDrummer(null);
    setSelectedDrummerId(null);
    setSelectedGear(null);
    // Update URL
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.history.pushState({}, '', '/gear');
    }
  };

  // Handle back from gear category page
  const handleBackFromGearCategory = () => {
    setShowGearCategory(false);
    setGearCategory(null);
    setGearCategoryData(null);
    setShowGearIndex(false);
    // Navigate back to home
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.history.pushState({}, '', '/');
    }
  };

  // Navigate to gear comparison page (Issue #345)
  const handleNavigateToGearComparison = (slug) => {
    setShowGearComparison(true);
    setGearComparisonSlug(slug);
    setShowGearComparisonsIndex(false);
    // Reset other views
    setShowGearFinder(false);
    setShowGearByBudget(false);
    setShowGearIndex(false);
    setShowGearCategory(false);
    setGearCategory(null);
    setGearCategoryData(null);
    setShowBandDetail(false);
    setBandSlug(null);
    setShowList(false);
    setListSlug(null);
    setShowSpotlights(false);
    setShowQuiz(false);
    setShowCompare(false);
    setShowPrivacy(false);
    setShowQuotes(false);
    setShowBioPage(false);
    setBioSlug(null);
    setShowGenrePage(false);
    setGenreSlug(null);
    setShowGenresList(false);
    setSelectedDrummer(null);
    setSelectedDrummerId(null);
    setSelectedGear(null);
    // Update URL
    updateGearComparisonURL(slug);
  };

  // Navigate to gear comparisons index page (Issue #345)
  const handleNavigateToGearComparisonsIndex = () => {
    setShowGearComparisonsIndex(true);
    setShowGearComparison(false);
    setGearComparisonSlug(null);
    // Reset other views
    setShowGearFinder(false);
    setShowGearByBudget(false);
    setShowGearIndex(false);
    setShowGearCategory(false);
    setGearCategory(null);
    setGearCategoryData(null);
    setShowBandDetail(false);
    setBandSlug(null);
    setShowList(false);
    setListSlug(null);
    setShowSpotlights(false);
    setShowQuiz(false);
    setShowCompare(false);
    setShowPrivacy(false);
    setShowQuotes(false);
    setShowBioPage(false);
    setBioSlug(null);
    setShowGenrePage(false);
    setGenreSlug(null);
    setShowGenresList(false);
    setSelectedDrummer(null);
    setSelectedDrummerId(null);
    setSelectedGear(null);
    // Update URL
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.history.pushState({}, '', '/compare');
    }
  };

  // Handle back from gear comparison page (Issue #345)
  const handleBackFromGearComparison = () => {
    if (showGearComparison) {
      // Go back to comparisons index
      setShowGearComparison(false);
      setGearComparisonSlug(null);
      setShowGearComparisonsIndex(true);
      if (Platform.OS === 'web' && typeof window !== 'undefined') {
        window.history.pushState({}, '', '/compare');
      }
    } else {
      // Go back to home
      setShowGearComparisonsIndex(false);
      if (Platform.OS === 'web' && typeof window !== 'undefined') {
        window.history.pushState({}, '', '/');
      }
    }
  };

  // Navigate to technique detail page (Issue #344)
  const handleNavigateToTechnique = (slug) => {
    setShowTechniqueDetail(true);
    setTechniqueSlug(slug);
    setShowTechniquesIndex(false);
    // Reset other views
    setShowGearComparison(false);
    setGearComparisonSlug(null);
    setShowGearComparisonsIndex(false);
    setShowGearFinder(false);
    setShowGearByBudget(false);
    setShowGearIndex(false);
    setShowGearCategory(false);
    setGearCategory(null);
    setGearCategoryData(null);
    setShowBandDetail(false);
    setBandSlug(null);
    setShowList(false);
    setListSlug(null);
    setShowSpotlights(false);
    setShowQuiz(false);
    setShowCompare(false);
    setShowPrivacy(false);
    setShowQuotes(false);
    setShowBioPage(false);
    setBioSlug(null);
    setShowGenrePage(false);
    setGenreSlug(null);
    setShowGenresList(false);
    setSelectedDrummer(null);
    setSelectedDrummerId(null);
    setSelectedGear(null);
    // Update URL and meta tags
    updateTechniqueURL(slug);
    const technique = getTechniqueBySlug(slug);
    if (technique) {
      updateTechniqueMeta(technique);
    }
  };

  // Navigate to techniques index page (Issue #344)
  const handleNavigateToTechniquesIndex = () => {
    preloadTechniques(); // Preload techniques module (TBT optimization #460)
    setShowTechniquesIndex(true);
    setShowTechniqueDetail(false);
    setTechniqueSlug(null);
    // Reset other views
    setShowGearComparison(false);
    setGearComparisonSlug(null);
    setShowGearComparisonsIndex(false);
    setShowGearFinder(false);
    setShowGearByBudget(false);
    setShowGearIndex(false);
    setShowGearCategory(false);
    setGearCategory(null);
    setGearCategoryData(null);
    setShowBandDetail(false);
    setBandSlug(null);
    setShowList(false);
    setListSlug(null);
    setShowSpotlights(false);
    setShowQuiz(false);
    setShowCompare(false);
    setShowPrivacy(false);
    setShowQuotes(false);
    setShowBioPage(false);
    setBioSlug(null);
    setShowGenrePage(false);
    setGenreSlug(null);
    setShowGenresList(false);
    setSelectedDrummer(null);
    setSelectedDrummerId(null);
    setSelectedGear(null);
    // Update URL and meta tags
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.history.pushState({}, '', '/techniques');
    }
    updateTechniqueMeta(null);
  };

  // Handle back from technique page (Issue #344)
  const handleBackFromTechnique = () => {
    if (showTechniqueDetail) {
      // Go back to techniques index
      setShowTechniqueDetail(false);
      setTechniqueSlug(null);
      setShowTechniquesIndex(true);
      if (Platform.OS === 'web' && typeof window !== 'undefined') {
        window.history.pushState({}, '', '/techniques');
      }
      updateTechniqueMeta(null);
    } else {
      // Go back to home
      setShowTechniquesIndex(false);
      if (Platform.OS === 'web' && typeof window !== 'undefined') {
        window.history.pushState({}, '', '/');
      }
    }
  };

  // Navigate to drummer vs comparison page (Issue #558)
  const handleNavigateToDrummerVs = (slug) => {
    preloadDrummerComparisons(); // Preload comparisons module
    setShowDrummerVsDetail(true);
    setDrummerVsSlug(slug);
    setShowDrummerVsIndex(false);
    // Reset other views
    setShowTechniqueDetail(false);
    setTechniqueSlug(null);
    setShowTechniquesIndex(false);
    setShowGearComparison(false);
    setGearComparisonSlug(null);
    setShowGearComparisonsIndex(false);
    setShowGearFinder(false);
    setShowGearByBudget(false);
    setShowGearIndex(false);
    setShowGearCategory(false);
    setGearCategory(null);
    setGearCategoryData(null);
    setShowBandDetail(false);
    setBandSlug(null);
    setShowList(false);
    setListSlug(null);
    setShowSpotlights(false);
    setShowQuiz(false);
    setShowCompare(false);
    setShowPrivacy(false);
    setShowQuotes(false);
    setShowBioPage(false);
    setBioSlug(null);
    setShowGenrePage(false);
    setGenreSlug(null);
    setShowGenresList(false);
    setSelectedDrummer(null);
    setSelectedDrummerId(null);
    setSelectedGear(null);
    // Update URL
    updateDrummerComparisonURL(slug);
  };

  // Navigate to drummer vs index page (Issue #558)
  const handleNavigateToDrummerVsIndex = () => {
    preloadDrummerComparisons(); // Preload comparisons module
    setShowDrummerVsIndex(true);
    setShowDrummerVsDetail(false);
    setDrummerVsSlug(null);
    // Reset other views
    setShowTechniqueDetail(false);
    setTechniqueSlug(null);
    setShowTechniquesIndex(false);
    setShowGearComparison(false);
    setGearComparisonSlug(null);
    setShowGearComparisonsIndex(false);
    setShowGearFinder(false);
    setShowGearByBudget(false);
    setShowGearIndex(false);
    setShowGearCategory(false);
    setGearCategory(null);
    setGearCategoryData(null);
    setShowBandDetail(false);
    setBandSlug(null);
    setShowList(false);
    setListSlug(null);
    setShowSpotlights(false);
    setShowQuiz(false);
    setShowCompare(false);
    setShowPrivacy(false);
    setShowQuotes(false);
    setShowBioPage(false);
    setBioSlug(null);
    setShowGenrePage(false);
    setGenreSlug(null);
    setShowGenresList(false);
    setSelectedDrummer(null);
    setSelectedDrummerId(null);
    setSelectedGear(null);
    // Update URL and meta
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.history.pushState({}, '', '/vs');
    }
    updateDrummerVsMeta(null);
  };

  // Handle back from drummer vs page (Issue #558)
  const handleBackFromDrummerVs = () => {
    if (showDrummerVsDetail) {
      // Go back to vs index
      setShowDrummerVsDetail(false);
      setDrummerVsSlug(null);
      setShowDrummerVsIndex(true);
      if (Platform.OS === 'web' && typeof window !== 'undefined') {
        window.history.pushState({}, '', '/vs');
      }
      updateDrummerVsMeta(null);
    } else {
      // Go back to home
      setShowDrummerVsIndex(false);
      if (Platform.OS === 'web' && typeof window !== 'undefined') {
        window.history.pushState({}, '', '/');
      }
    }
  };

  const handleCompareYourKit = (drummer) => {
    setCompareKitDrummer(drummer);
    setShowCompareYourKit(true);
    // Track event
    if (Platform.OS === 'web' && typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'open_compare_kit', {
        drummer_name: drummer.name,
      });
    }
  };

  const handleCloseCompareYourKit = () => {
    setShowCompareYourKit(false);
    setCompareKitDrummer(null);
  };

  if (loadingDetail || loadingGear) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={theme.text} />
          <Text style={[styles.loadingText, { color: theme.secondaryText }]}>
            {loadingGear ? 'Loading gear details...' : 'Loading drummer details...'}
          </Text>
        </View>
      </View>
    );
  }

  // Determine which view to show
  const renderContent = () => {
    // Compare Your Kit modal (full-screen view)
    if (showCompareYourKit && compareKitDrummer) {
      return (
        <CompareYourKitModal
          drummer={compareKitDrummer}
          theme={theme}
          onClose={handleCloseCompareYourKit}
        />
      );
    }
    if (selectedGear) {
      return (
        <GearDetail
          gear={selectedGear}
          theme={theme}
          onBack={handleBack}
          onSelectDrummer={handleSelectDrummer}
        />
      );
    }
    if (showCompare) {
      return (
        <CompareView
          theme={theme}
          onBack={handleBack}
          drummers={drummers}
          onNavigateToCompare={handleNavigateToCompare}
        />
      );
    }
    if (showQuiz) {
      return (
        <QuizView
          theme={theme}
          onBack={handleBack}
          drummers={drummers}
          onSelectDrummer={handleSelectDrummer}
        />
      );
    }
    if (showPrivacy) {
      return (
        <PrivacyPolicyPage
          theme={theme}
          onBack={() => {
            setShowPrivacy(false);
            if (Platform.OS === 'web' && typeof window !== 'undefined') {
              window.history.pushState({}, '', '/');
            }
          }}
        />
      );
    }
    if (showQuotes) {
      return (
        <QuotesPage
          theme={theme}
          onBack={() => {
            setShowQuotes(false);
            if (Platform.OS === 'web' && typeof window !== 'undefined') {
              window.history.pushState({}, '', '/');
            }
          }}
          onSelectDrummer={handleSelectDrummer}
        />
      );
    }
    // News Page (Issue #514)
    if (showNewsPage) {
      return (
        <NewsPage
          theme={theme}
          onBack={() => {
            setShowNewsPage(false);
            if (Platform.OS === 'web' && typeof window !== 'undefined') {
              window.history.pushState({}, '', '/');
            }
          }}
          onNavigateToDrummer={handleSelectDrummer}
          onNavigateToBand={handleNavigateToBand}
        />
      );
    }
    if (showSpotlights) {
      return (
        <SpotlightsArchivePage
          theme={theme}
          onBack={() => {
            setShowSpotlights(false);
            if (Platform.OS === 'web' && typeof window !== 'undefined') {
              window.history.pushState({}, '', '/');
            }
          }}
          drummers={drummers}
          onSelectDrummer={handleSelectDrummer}
        />
      );
    }
    // Drummers Page with filters (Issue #497)
    if (showDrummersPage) {
      return (
        <DrummersPage
          theme={theme}
          drummers={drummers}
          filteredDrummers={filteredDrummers}
          onSelectDrummer={handleSelectDrummer}
          onBack={() => {
            setShowDrummersPage(false);
            if (Platform.OS === 'web' && typeof window !== 'undefined') {
              window.history.pushState({}, '', '/');
            }
          }}
          filters={filters}
          onFilterChange={handleFilterChange}
          sortBy={sortBy}
          onSortChange={handleSortChange}
          searchValue={searchValue}
          onSearchChange={handleSearchChange}
          onSearchClear={handleSearchClear}
        />
      );
    }
    if (showList && listSlug) {
      return (
        <TopListPage
          theme={theme}
          onBack={() => {
            setShowList(false);
            setListSlug(null);
            if (Platform.OS === 'web' && typeof window !== 'undefined') {
              window.history.pushState({}, '', '/');
            }
          }}
          drummers={drummers}
          onSelectDrummer={handleSelectDrummer}
          listSlug={listSlug}
          onNavigateToList={handleNavigateToList}
        />
      );
    }
    if (showGearByBudget) {
      return (
        <GearByBudgetPage
          theme={theme}
          onBack={() => {
            setShowGearByBudget(false);
            if (Platform.OS === 'web' && typeof window !== 'undefined') {
              window.history.pushState({}, '', '/');
            }
          }}
          drummers={drummers}
          onSelectDrummer={handleSelectDrummer}
        />
      );
    }
    // Kit Builder Page (Issue #341)
    if (showKitBuilder) {
      return (
        <KitBuilderPage
          theme={theme}
          onBack={() => {
            setShowKitBuilder(false);
            if (Platform.OS === 'web' && typeof window !== 'undefined') {
              window.history.pushState({}, '', '/');
            }
          }}
          drummers={drummers}
          onSelectDrummer={handleSelectDrummer}
        />
      );
    }
    // BPM Tap Calculator Page (Issue #342)
    if (showBpmTap) {
      return (
        <BpmTapPage
          theme={theme}
          onBack={() => {
            setShowBpmTap(false);
            if (Platform.OS === 'web' && typeof window !== 'undefined') {
              window.history.pushState({}, '', '/');
            }
          }}
          drummers={drummers}
          onSelectDrummer={handleSelectDrummer}
        />
      );
    }
    // BPM Range Page (Issue #342)
    if (showBpmRange && bpmRangeSlug) {
      return (
        <BpmRangePage
          rangeSlug={bpmRangeSlug}
          theme={theme}
          drummers={drummers}
          onBack={() => {
            setShowBpmRange(false);
            setBpmRangeSlug(null);
            if (Platform.OS === 'web' && typeof window !== 'undefined') {
              window.history.pushState({}, '', '/');
            }
          }}
          onSelectDrummer={handleSelectDrummer}
          onNavigateToBpmRange={handleNavigateToBpmRange}
          onNavigateToBpmTap={handleNavigateToBpmTap}
        />
      );
    }
    // Birthday Calendar Page (Issue #343)
    if (showBirthdayCalendar) {
      return (
        <BirthdayCalendarPage
          theme={theme}
          onBack={() => {
            setShowBirthdayCalendar(false);
            if (Platform.OS === 'web' && typeof window !== 'undefined') {
              window.history.pushState({}, '', '/');
            }
          }}
          onSelectDrummer={handleSelectDrummer}
        />
      );
    }
    if (showGearFinder) {
      return (
        <GearFinderPage
          theme={theme}
          onBack={() => {
            setShowGearFinder(false);
            if (Platform.OS === 'web' && typeof window !== 'undefined') {
              window.history.pushState({}, '', '/');
            }
          }}
          drummers={drummers}
          onSelectDrummer={handleSelectDrummer}
        />
      );
    }
    // Extended Bio Page (Issue #305)
    if (showBioPage && selectedDrummer) {
      return (
        <DrummerBioPage
          theme={theme}
          onBack={handleBackFromBio}
          drummer={selectedDrummer}
          onSelectDrummer={handleSelectDrummer}
        />
      );
    }
    // Band Detail Page (Issue #349)
    if (showBandDetail && bandSlug) {
      return (
        <BandDetailPage
          bandSlug={bandSlug}
          drummers={drummers}
          onBack={handleBackFromBand}
          onSelectDrummer={handleSelectDrummer}
          theme={theme}
        />
      );
    }
    // Gear Index Page (Issue #339)
    if (showGearIndex) {
      return (
        <GearIndexPage
          theme={theme}
          onBack={handleBackFromGearCategory}
          onNavigateToCategory={handleNavigateToGearCategory}
          onSelectGear={handleSelectGear}
        />
      );
    }
    // Gear Category Page (Issue #339)
    if (showGearCategory && gearCategory) {
      return (
        <GearCategoryPage
          category={gearCategory}
          categoryData={gearCategoryData}
          loading={loadingGearCategory}
          theme={theme}
          onBack={handleBackFromGearCategory}
          onSelectGear={handleSelectGear}
          onNavigateToCategory={handleNavigateToGearCategory}
        />
      );
    }
    // Gear Comparison Detail Page (Issue #345)
    if (showGearComparison && gearComparisonSlug) {
      return (
        <GearComparisonPage
          comparisonSlug={gearComparisonSlug}
          theme={theme}
          onBack={handleBackFromGearComparison}
          onSelectDrummer={handleSelectDrummer}
          drummers={drummers}
        />
      );
    }
    // Gear Comparisons Index Page (Issue #345)
    if (showGearComparisonsIndex) {
      return (
        <GearComparisonsIndexPage
          theme={theme}
          onBack={handleBackFromGearComparison}
          onSelectComparison={handleNavigateToGearComparison}
        />
      );
    }
    // Genre Landing Page (Issue #340)
    if (showGenrePage && genreSlug) {
      return (
        <GenreLandingPage
          genreSlug={genreSlug}
          drummers={drummers}
          onBack={handleBackFromGenre}
          onSelectDrummer={handleSelectDrummer}
          onNavigateGenre={handleNavigateToGenre}
          theme={theme}
        />
      );
    }
    // Genres List Page (Issue #340)
    if (showGenresList) {
      return (
        <GenresListPage
          onBack={handleBackFromGenresList}
          onSelectGenre={handleNavigateToGenre}
          theme={theme}
        />
      );
    }
    // Gear Comparison Page (Issue #345)
    if (showGearComparison && gearComparisonSlug) {
      return (
        <GearComparisonPage
          comparisonSlug={gearComparisonSlug}
          theme={theme}
          onBack={handleBackFromGearComparison}
          onSelectDrummer={handleSelectDrummer}
          drummers={drummers}
        />
      );
    }
    // Gear Comparisons Index Page (Issue #345)
    if (showGearComparisonsIndex) {
      return (
        <GearComparisonsIndexPage
          theme={theme}
          onBack={handleBackFromGearComparison}
          onSelectComparison={handleNavigateToGearComparison}
        />
      );
    }
    // Technique Detail Page (Issue #344)
    if (showTechniqueDetail && techniqueSlug) {
      return (
        <TechniqueDetailPage
          techniqueSlug={techniqueSlug}
          theme={theme}
          onBack={handleBackFromTechnique}
          onSelectDrummer={handleSelectDrummer}
          onSelectTechnique={handleNavigateToTechnique}
          drummers={drummers}
        />
      );
    }
    // Techniques Index Page (Issue #344)
    if (showTechniquesIndex) {
      return (
        <TechniquesIndexPage
          theme={theme}
          onBack={handleBackFromTechnique}
          onSelectTechnique={handleNavigateToTechnique}
          onSelectDrummer={handleSelectDrummer}
          drummers={drummers}
        />
      );
    }
    // Drummer vs Detail Page (Issue #558)
    if (showDrummerVsDetail && drummerVsSlug) {
      return (
        <DrummerVsPage
          comparisonSlug={drummerVsSlug}
          theme={theme}
          onBack={handleBackFromDrummerVs}
          onSelectDrummer={handleSelectDrummer}
          drummers={drummers}
        />
      );
    }
    // Drummer vs Index Page (Issue #558)
    if (showDrummerVsIndex) {
      return (
        <DrummerVsIndexPage
          theme={theme}
          onBack={handleBackFromDrummerVs}
          onSelectComparison={handleNavigateToDrummerVs}
          onSelectDrummer={handleSelectDrummer}
          drummers={drummers}
        />
      );
    }
    if (selectedDrummer) {
      console.log('[DEBUG] Rendering DrummerDetail for:', selectedDrummer.name);
      return <DrummerDetail drummer={selectedDrummer} theme={theme} onBack={handleBack} onSelectGear={handleSelectGear} onCompareYourKit={handleCompareYourKit} allDrummers={drummers} onNavigateToBio={handleNavigateToBio} />;
    }
    return (
      <View style={styles.mainContent} accessibilityRole="main">
        <DrummerList
          theme={theme}
          onSelectDrummer={handleSelectDrummer}
          drummers={drummers}
          filteredDrummers={filteredDrummers}
          loading={loadingDrummers}
          error={drummersError}
          onNavigateToCompare={handleNavigateToCompare}
          onNavigateToQuiz={handleNavigateToQuiz}
          onNavigateToKitQuiz={handleNavigateToKitQuiz}
          onNavigateToQuotes={handleNavigateToQuotes}
          onNavigateToSpotlights={handleNavigateToSpotlights}
          onNavigateToGearByBudget={handleNavigateToGearByBudget}
          onNavigateToList={handleNavigateToList}
          onNavigateToGearFinder={handleNavigateToGearFinder}
          onNavigateToKitBuilder={handleNavigateToKitBuilder}
          onNavigateToBpmTap={handleNavigateToBpmTap}
          onNavigateToBirthdayCalendar={handleNavigateToBirthdayCalendar}
          onNavigateToGenresList={handleNavigateToGenresList}
          onNavigateToTechniques={handleNavigateToTechniquesIndex}
          onNavigateToDrummers={handleNavigateToDrummers}
          onNavigateToNews={handleNavigateToNews}
          spotlight={apiSpotlight || getCuratedFeaturedDrummer(drummers, drummerBirthdays())}
          filters={filters}
          onFilterChange={handleFilterChange}
          sortBy={sortBy}
          onSortChange={handleSortChange}
          searchValue={searchValue}
          onSearchChange={handleSearchChange}
          onSearchClear={handleSearchClear}
          suggestions={suggestions}
          showSuggestions={showSuggestions}
          onSearchFocus={() => setShowSuggestions(true)}
          onSelectSuggestion={handleSelectSuggestion}
          searchInputRef={searchInputRef}
          showAllDrummers={showAllDrummers}
          onShowAllDrummers={() => setShowAllDrummers(true)}
        />
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {!selectedDrummer && !showCompare && !showQuiz && !showPrivacy && !showQuotes && !selectedGear && !showBpmTap && !showBpmRange && !showBirthdayCalendar && !showBandDetail && !showGearFinder && !showBioPage && !showGearIndex && !showGearCategory && !showGearComparison && !showGearComparisonsIndex && !showSpotlights && !showGenrePage && !showGenresList && !showKitBuilder && !showTechniquesIndex && !showTechniqueDetail && !showDrummerVsIndex && !showDrummerVsDetail && <SEOHead drummers={drummers} filters={filters} />}
      <View style={styles.header} accessibilityRole="banner">
        <View style={styles.headerContent}>
          <Text style={[styles.title, { color: theme.text }]} accessibilityRole="header">
            Metal Drummer Gear
          </Text>
          <ThemeToggle />
        </View>
      </View>
      {renderContent()}
      <NewsletterFooter theme={theme} />
      <StatusBar style={isDarkMode ? "light" : "dark"} />
    </View>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: spacing[12],       // 48px
    paddingBottom: spacing[5],     // 20px
    paddingHorizontal: spacing[5], // 20px
    alignItems: 'center',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 600,
  },
  title: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    marginBottom: 0,
  },

  mainContent: {
    flex: 1,
  },
  
  // ==========================================
  // Hero Section Styles (Issue #493)
  // ==========================================
  heroSection: {
    width: '100%',
    paddingTop: spacing[12],       // 48px
    paddingBottom: spacing[8],     // 32px
    paddingHorizontal: spacing[5], // 20px
    position: 'relative',
    overflow: 'hidden',
  },
  heroContent: {
    maxWidth: 600,
    alignSelf: 'center',
    width: '100%',
    alignItems: 'center',
  },
  heroEmoji: {
    fontSize: fontSize.display.md, // 48px
    marginBottom: spacing[4],      // 16px
  },
  heroHeadline: {
    fontSize: fontSize.xl,         // 24px
    fontWeight: fontWeight.bold,
    textAlign: 'center',
    marginBottom: spacing[6],      // 24px
    lineHeight: lineHeight.xl,
  },
  heroHeadlineMobile: {
    fontSize: fontSize.lg,         // 18px
    lineHeight: lineHeight.lg,
  },
  heroSearchContainer: {
    width: '100%',
    position: 'relative',
    zIndex: 100,
  },
  heroSearchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing[4], // 16px
    paddingVertical: spacing[4],   // 16px
    borderRadius: spacing[3],      // 12px
    borderWidth: 2,
    minHeight: spacing[12] + spacing[2], // 56px (larger touch target)
  },
  heroSearchIcon: {
    fontSize: fontSize.lg,
    marginRight: spacing[3],       // 12px
  },
  heroSearchInput: {
    flex: 1,
    fontSize: fontSize.base,       // 16px
    padding: 0,
    margin: 0,
    ...Platform.select({
      web: { outline: 'none' },
    }),
  },
  heroSearchClearButton: {
    padding: spacing[2],           // 8px
    marginLeft: spacing[2],        // 8px
  },
  heroSearchClearText: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.medium,
  },
  heroSearchShortcut: {
    paddingHorizontal: spacing[2], // 8px
    paddingVertical: spacing[1],   // 4px
    borderRadius: spacing[1],      // 4px
    borderWidth: 1,
    marginLeft: spacing[2],        // 8px
  },
  heroSearchShortcutText: {
    fontSize: fontSize.xs,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  heroSuggestionsContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    marginTop: spacing[2],         // 8px
    borderRadius: spacing[2],      // 8px
    borderWidth: 1,
    maxHeight: 320,
    overflow: 'hidden',
    ...Platform.select({
      web: { 
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
      },
    }),
  },
  heroSuggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing[3],           // 12px
    borderBottomWidth: 1,
  },
  heroSuggestionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  heroSuggestionImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: spacing[3],       // 12px
  },
  heroSuggestionText: {
    flex: 1,
  },
  heroSuggestionTitle: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
  },
  heroSuggestionSubtitle: {
    fontSize: fontSize.xs,
    marginTop: 2,
  },
  heroSuggestionType: {
    fontSize: fontSize.base,
    marginLeft: spacing[2],        // 8px
  },
  heroStats: {
    marginTop: spacing[4],         // 16px
    alignItems: 'center',
  },
  heroStatsText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    letterSpacing: 0.5,
  },
  
  listContainer: {
    paddingHorizontal: spacing[5], // 20px
    paddingBottom: spacing[5],     // 20px
  },
  card: {
    padding: spacing[4],           // 16px
    marginBottom: spacing[3],      // 12px
    borderRadius: spacing[2],      // 8px
    borderWidth: 1,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: spacing[4],       // 16px
  },
  cardText: {
    flex: 1,
  },
  drummerName: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    marginBottom: spacing[1],      // 4px
  },
  drummerBand: {
    fontSize: fontSize.base,
    marginBottom: 2,
  },
  drummerGenre: {
    fontSize: fontSize.sm,
    fontStyle: 'italic',
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing[5],           // 20px
  },
  loadingText: {
    marginTop: spacing[3],         // 12px (was 10)
    fontSize: fontSize.base,
  },
  errorText: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.bold,
    textAlign: 'center',
  },
  errorHint: {
    marginTop: spacing[2],         // 8px
    fontSize: fontSize.sm,
    textAlign: 'center',
  },
  detailContainer: {
    flex: 1,
  },
  detailContent: {
    padding: spacing[5],           // 20px
  },
  backButton: {
    paddingVertical: spacing[3],   // 12px - WCAG AA touch target
    paddingHorizontal: spacing[4], // 16px
    borderRadius: spacing[2],      // 8px
    borderWidth: 1,
    alignSelf: 'flex-start',
    marginBottom: spacing[5],      // 20px
    minHeight: spacing[12],        // 48px - WCAG AA touch target minimum
  },
  backButtonText: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.medium,
  },
  detailHeader: {
    flexDirection: 'row',
    marginBottom: spacing[5],      // 20px
  },
  detailImage: {
    width: 120,
    height: 120,
    borderRadius: spacing[3],      // 12px
    marginRight: spacing[5],       // 20px
  },
  detailHeaderText: {
    flex: 1,
    justifyContent: 'center',
  },
  detailName: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    marginBottom: spacing[1],      // 4px
  },
  detailBand: {
    fontSize: fontSize.lg,
    marginBottom: spacing[1],      // 4px
  },
  detailMeta: {
    fontSize: fontSize.sm,
    fontStyle: 'italic',
  },
  section: {
    padding: spacing[4],           // 16px
    borderRadius: spacing[3],      // 12px
    borderWidth: 1,
    marginBottom: spacing[4],      // 16px
  },
  // Last Updated Timestamp styles (Issue #449)
  lastUpdatedContainer: {
    paddingVertical: spacing[4],   // 16px
    paddingHorizontal: spacing[1], // 4px
    marginTop: spacing[2],         // 8px
    borderTopWidth: 1,
    alignItems: 'center',
  },
  lastUpdatedText: {
    fontSize: fontSize.xs,
    fontStyle: 'italic',
  },
  // Featured Drummers Section styles (Issue #496)
  featuredSection: {
    paddingHorizontal: spacing[4],
    paddingTop: spacing[5],
    paddingBottom: spacing[3],
  },
  featuredSectionTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    marginBottom: spacing[1],
  },
  featuredSectionSubtitle: {
    fontSize: fontSize.sm,
  },
  viewAllDrummersButton: {
    marginHorizontal: spacing[4],
    marginVertical: spacing[5],
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[5],
    borderRadius: spacing[2],
    alignItems: 'center',
    borderWidth: 1,
  },
  viewAllDrummersText: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
  },
  sectionTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    marginBottom: spacing[3],      // 12px
  },
  bioText: {
    fontSize: fontSize.base,
    lineHeight: lineHeight.base,
  },
  // "More" link for extended bio (Issue #305)
  bioMoreLink: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
    textDecorationLine: 'none',
  },
  // Extended Bio Page styles (Issue #305)
  bioPageHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing[6],      // 24px
    marginTop: spacing[4],         // 16px
  },
  bioPageHeaderMobile: {
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  bioPageImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginRight: spacing[6],       // 24px
  },
  bioPageImageMobile: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginRight: 0,
    marginBottom: spacing[4],      // 16px
  },
  bioPageHeaderText: {
    flex: 1,
  },
  bioPageTitle: {
    fontSize: fontSize['2xl'],
    fontWeight: fontWeight.bold,
    marginBottom: spacing[1],      // 4px
  },
  bioPageSubtitle: {
    fontSize: fontSize.lg,
    marginBottom: spacing[3],      // 12px
  },
  bioSection: {
    padding: spacing[5],           // 20px
    borderRadius: spacing[3],      // 12px
    borderWidth: 1,
    marginBottom: spacing[4],      // 16px
  },
  bioSectionTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    marginBottom: spacing[4],      // 16px
  },
  bioSectionContent: {
    fontSize: fontSize.base,
    lineHeight: lineHeight.lg,
  },
  careerTimeline: {
    gap: spacing[3],               // 12px
  },
  careerTimelineItem: {
    flexDirection: 'row',
    gap: spacing[4],               // 16px
  },
  careerTimelineYear: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
    minWidth: 50,
  },
  careerTimelineEvent: {
    flex: 1,
    fontSize: fontSize.base,
    lineHeight: lineHeight.sm,
  },
  discographySection: {
    marginBottom: spacing[5],      // 20px
  },
  discographyTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    marginBottom: spacing[3],      // 12px
  },
  albumItem: {
    paddingVertical: spacing[3],   // 12px
    borderBottomWidth: 1,
  },
  albumInfo: {
    marginBottom: spacing[1],      // 4px
  },
  albumName: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
  },
  albumMeta: {
    fontSize: fontSize.sm,
    marginTop: 2,
  },
  albumNote: {
    fontSize: fontSize.sm,
    fontStyle: 'italic',
    marginTop: spacing[1],         // 4px
  },
  toursSection: {
    marginTop: spacing[4],         // 16px
  },
  tourItem: {
    paddingVertical: spacing[2],   // 8px
  },
  tourName: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.medium,
  },
  tourMeta: {
    fontSize: fontSize.sm,
    marginTop: 2,
  },
  triviaList: {
    gap: spacing[3],               // 12px (was 10)
  },
  triviaItem: {
    flexDirection: 'row',
    gap: spacing[3],               // 12px
  },
  triviaBullet: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
  },
  triviaText: {
    flex: 1,
    fontSize: fontSize.base,
    lineHeight: lineHeight.sm,
  },
  sourcesSection: {
    marginTop: spacing[2],         // 8px
  },
  sourcesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[4],               // 16px
  },
  sourceItem: {
    paddingVertical: spacing[1],   // 4px
  },
  sourceText: {
    fontSize: fontSize.sm,
    textDecorationLine: 'underline',
  },
  bioPageCTA: {
    padding: spacing[6],           // 24px
    borderRadius: spacing[3],      // 12px
    borderWidth: 2,
    marginTop: spacing[4],         // 16px
    marginBottom: spacing[6],      // 24px
    alignItems: 'center',
  },
  bioPageCTATitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    marginBottom: spacing[2],      // 8px
    textAlign: 'center',
  },
  bioPageCTADescription: {
    fontSize: fontSize.base,
    marginBottom: spacing[4],      // 16px
    textAlign: 'center',
    lineHeight: lineHeight.sm,
  },
  bioPageCTAButton: {
    backgroundColor: '#dc2626',
    paddingHorizontal: spacing[6], // 24px
    paddingVertical: spacing[3],   // 12px
    borderRadius: spacing[2],      // 8px
  },
  bioPageCTAButtonText: {
    color: '#ffffff',
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
  },

  // ==========================================
  // BAND DETAIL PAGE & DRUMMER HISTORY STYLES (Issue #349)
  // ==========================================
  bandPageHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing[6],      // 24px
    gap: spacing[5],               // 20px
  },
  bandPageHeaderMobile: {
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  bandPageHeaderText: {
    flex: 1,
  },
  bandNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],               // 12px
    marginBottom: spacing[2],      // 8px
    flexWrap: 'wrap',
  },
  bandPageTitle: {
    fontSize: fontSize['2xl'],
    fontWeight: fontWeight.bold,
  },
  bandPageSubtitle: {
    fontSize: fontSize.lg,
    marginBottom: spacing[3],      // 12px
  },
  bandStatusBadge: {
    paddingHorizontal: spacing[3], // 12px
    paddingVertical: spacing[1],   // 4px
    borderRadius: spacing[4],      // 16px
  },
  bandStatusText: {
    color: '#ffffff',
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
    textTransform: 'uppercase',
  },
  bandGenres: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[2],               // 8px
  },
  bandGenreTag: {
    paddingHorizontal: spacing[3], // 12px
    paddingVertical: spacing[2],   // 8px (was 6)
    borderRadius: spacing[4],      // 16px
  },
  bandGenreText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },
  bandSummarySection: {
    padding: spacing[5],           // 20px
    borderRadius: spacing[3],      // 12px
    borderWidth: 1,
    marginBottom: spacing[5],      // 20px
  },
  bandSummaryText: {
    fontSize: fontSize.base,
    lineHeight: lineHeight.lg,
  },
  drummerHistorySection: {
    padding: spacing[5],           // 20px
    borderRadius: spacing[3],      // 12px
    borderWidth: 1,
    marginBottom: spacing[5],      // 20px
  },
  drummerHistorySectionMobile: {
    padding: spacing[4],           // 16px
  },
  drummerHistorySectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    letterSpacing: 1,
    marginBottom: spacing[4],      // 16px
    borderBottomWidth: 2,
    borderBottomColor: '#dc2626',
    paddingBottom: spacing[3],     // 12px
  },
  drummerHistoryList: {
    gap: 0,
  },
  drummerHistoryItem: {
    flexDirection: 'row',
    paddingVertical: spacing[4],   // 16px
    gap: spacing[4],               // 16px
    alignItems: 'flex-start',
  },
  drummerHistoryLeft: {
    alignItems: 'center',
    gap: spacing[2],               // 8px
  },
  drummerHistoryIcon: {
    fontSize: fontSize.xl,
  },
  drummerHistoryImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
  },
  drummerHistoryContent: {
    flex: 1,
  },
  drummerHistoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],               // 8px
    flexWrap: 'wrap',
    marginBottom: spacing[1],      // 4px
  },
  drummerHistoryName: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
  },
  drummerHistoryPeriod: {
    fontSize: fontSize.sm,
  },
  drummerHistoryNotes: {
    fontSize: fontSize.sm,
    fontStyle: 'italic',
    marginBottom: spacing[2],      // 8px
  },
  drummerHistoryLink: {
    marginTop: spacing[1],         // 4px
  },
  drummerHistoryLinkText: {
    color: '#60a5fa',
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },
  relatedBandsSection: {
    padding: spacing[5],           // 20px
    borderRadius: spacing[3],      // 12px
    borderWidth: 1,
    marginBottom: spacing[5],      // 20px
  },
  relatedBandsSectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    letterSpacing: 1,
    marginBottom: spacing[4],      // 16px
  },
  relatedBandsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[3],               // 12px (was 10)
  },
  relatedBandTag: {
    paddingHorizontal: spacing[4], // 16px
    paddingVertical: spacing[2],   // 8px
    borderRadius: spacing[5],      // 20px
  },
  relatedBandText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },

  // Notable Quotes styles
  quotesSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing[1],   // 4px
  },
  quotesExpandIcon: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
  },
  quotesContainer: {
    marginTop: spacing[4],         // 16px
  },
  quoteCard: {
    marginBottom: spacing[4],      // 16px
    paddingLeft: spacing[4],       // 16px
    borderLeftWidth: 3,
    borderLeftColor: '#dc2626',
  },
  quoteText: {
    fontSize: fontSize.base,
    lineHeight: lineHeight.base,
    fontStyle: 'italic',
    marginBottom: spacing[2],      // 8px
  },
  quoteSource: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },
  // Gear Timeline styles
  timelineSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing[1],   // 4px
  },
  timelineTitleContainer: {
    flex: 1,
  },
  timelineSubtitle: {
    fontSize: fontSize.sm,
    marginTop: 2,
  },
  timelineExpandIcon: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
  },
  timelineContainer: {
    marginTop: spacing[4],         // 16px
  },
  timelineScrollView: {
    marginHorizontal: -spacing[5], // -20px
    paddingHorizontal: 0,
  },
  timelineScroll: {
    paddingHorizontal: spacing[5], // 20px
    paddingBottom: spacing[2],     // 8px
    gap: spacing[3],               // 12px
  },
  timelineEraCard: {
    width: 260,
    padding: spacing[4],           // 16px
    borderRadius: spacing[3],      // 12px
    borderWidth: 2,
    position: 'relative',
    overflow: 'visible',
  },
  timelineEraCardMobile: {
    width: 280,
    minHeight: 180,
  },
  timelineMarker: {
    position: 'absolute',
    top: -spacing[3],              // -12px
    left: spacing[5],              // 20px
    width: spacing[6],             // 24px
    height: spacing[6],            // 24px
    borderRadius: spacing[3],      // 12px
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  timelineMarkerText: {
    color: '#ffffff',
    fontSize: fontSize.xs,
    fontWeight: fontWeight.bold,
  },
  timelineLine: {
    position: 'absolute',
    top: 0,
    right: -14,
    width: 14,
    height: 2,
    zIndex: 1,
  },
  timelineEraTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    marginTop: spacing[2],         // 8px
    marginBottom: spacing[1],      // 4px
  },
  timelineYears: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    marginBottom: spacing[2],      // 8px
  },
  timelineDescription: {
    fontSize: fontSize.sm,
    lineHeight: lineHeight.xs,
    marginBottom: spacing[3],      // 12px
  },
  timelineAlbumBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing[3], // 12px (was 10)
    paddingVertical: spacing[1],   // 4px
    borderRadius: spacing[3],      // 12px
  },
  timelineAlbumCount: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
  },
  timelineSelectedIndicator: {
    position: 'absolute',
    bottom: -spacing[5],           // -20px
    left: '50%',
    transform: [{ translateX: -30 }],
  },
  timelineSelectedText: {
    fontSize: fontSize.xs,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: fontWeight.medium,
  },
  timelineSwipeHint: {
    alignItems: 'center',
    paddingVertical: spacing[2],   // 8px
  },
  timelineSwipeText: {
    fontSize: fontSize.xs,
    fontStyle: 'italic',
  },
  timelineDetail: {
    marginTop: spacing[6],         // 24px
    padding: spacing[4],           // 16px
    borderRadius: spacing[3],      // 12px
    borderWidth: 1,
  },
  timelineDetailHeader: {
    marginBottom: spacing[4],      // 16px
    paddingBottom: spacing[3],     // 12px
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(128,128,128,0.2)',
  },
  timelineDetailTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    marginBottom: spacing[1],      // 4px
  },
  timelineDetailYears: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
  },
  timelineDetailSection: {
    marginBottom: spacing[4],      // 16px
  },
  timelineDetailLabel: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing[2],      // 8px
  },
  timelineAlbumsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[2],               // 8px
  },
  timelineAlbumChip: {
    paddingHorizontal: spacing[3], // 12px
    paddingVertical: spacing[2],   // 8px (was 6)
    borderRadius: spacing[4],      // 16px
  },
  timelineAlbumName: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },
  timelineGearGrid: {
    gap: spacing[3],               // 12px
  },
  timelineGearItem: {
    marginBottom: spacing[1],      // 4px
  },
  timelineGearLabel: {
    fontSize: fontSize.xs,
    marginBottom: 2,
  },
  timelineGearValue: {
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  },
  timelineNotes: {
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontStyle: 'italic',
  },
  gearSection: {
    marginBottom: spacing[3],      // 12px
  },
  gearTitle: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
    marginBottom: spacing[1],      // 4px
  },
  gearContent: {
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  },
  shopLinksContainer: {
    flexDirection: 'row',
    marginTop: spacing[2],         // 8px
    gap: spacing[2],               // 8px
  },
  shopButton: {
    paddingVertical: spacing[2],   // 8px (was 6)
    paddingHorizontal: spacing[3], // 12px
    borderRadius: spacing[4],      // 16px
    borderWidth: 1,
  },
  shopButtonUS: {
    backgroundColor: colors.buttons.secondary.bg,
  },
  shopButtonEU: {
    backgroundColor: colors.buttons.secondary.bg,
  },
  shopButtonText: {
    color: '#ffffff',
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
  },
  gallery: {
    flexDirection: 'row',
  },
  galleryImage: {
    width: 200,
    height: 150,
    borderRadius: spacing[2],      // 8px
    marginRight: spacing[3],       // 12px
  },
  // Gear Timeline styles
  timelineSection: {
    overflow: 'hidden',
  },
  timelineHeader: {
    paddingBottom: spacing[2],     // 8px
  },
  timelineTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],               // 12px
    marginBottom: spacing[1],      // 4px
  },
  timelineBadge: {
    paddingHorizontal: spacing[2], // 8px
    paddingVertical: 2,
    borderRadius: spacing[3],      // 12px
  },
  timelineBadgeText: {
    color: '#fff',
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
  },
  timelineSubtitle: {
    fontSize: fontSize.sm,
    marginBottom: spacing[2],      // 8px
  },
  timelineContent: {
    marginTop: spacing[4],         // 16px
  },
  timelineScroll: {
    marginBottom: spacing[2],      // 8px
  },
  timelineScrollContent: {
    paddingRight: spacing[4],      // 16px
    paddingVertical: spacing[2],   // 8px
  },
  timelineEraWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timelineEraCard: {
    width: 140,
    padding: spacing[3],           // 12px
    borderRadius: spacing[3],      // 12px
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
  },
  timelineEraCardSelected: {
    transform: [{ scale: 1.02 }],
  },
  timelineEraYears: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
    marginBottom: spacing[1],      // 4px
  },
  timelineEraName: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
    textAlign: 'center',
    marginBottom: spacing[1],      // 4px
  },
  timelineEraAlbums: {
    fontSize: fontSize.xs,
    marginTop: spacing[1],         // 4px
  },
  timelineConnector: {
    width: spacing[6],             // 24px
    height: 2,
    marginHorizontal: spacing[1],  // 4px
  },
  timelineSwipeHint: {
    fontSize: fontSize.xs,
    textAlign: 'center',
    marginTop: spacing[2],         // 8px
    marginBottom: spacing[4],      // 16px
    fontStyle: 'italic',
  },
  timelineDetail: {
    marginTop: spacing[4],         // 16px
    padding: spacing[4],           // 16px
    borderRadius: spacing[3],      // 12px
    borderWidth: 1,
  },
  timelineDetailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[2],      // 8px
    flexWrap: 'wrap',
    gap: spacing[2],               // 8px
  },
  timelineDetailTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
  },
  timelineDetailYears: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
  },
  timelineDetailDescription: {
    fontSize: fontSize.sm,
    marginBottom: spacing[3],      // 12px
    lineHeight: lineHeight.sm,
  },
  timelineDetailLabel: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    marginBottom: spacing[2],      // 8px
  },
  timelineAlbumsSection: {
    marginBottom: spacing[4],      // 16px
  },
  timelineAlbumsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[2],               // 8px
  },
  timelineAlbumTag: {
    paddingHorizontal: spacing[3], // 12px (was 10)
    paddingVertical: spacing[1],   // 4px
    borderRadius: spacing[4],      // 16px
    borderWidth: 1,
  },
  timelineAlbumText: {
    fontSize: fontSize.xs,
  },
  timelineGearSection: {
    marginBottom: spacing[4],      // 16px
  },
  timelineGearItem: {
    marginBottom: spacing[2],      // 8px
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  timelineGearLabel: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    marginRight: spacing[1],       // 4px
    minWidth: 80,
  },
  timelineGearValue: {
    fontSize: fontSize.sm,
    flex: 1,
    flexWrap: 'wrap',
  },
  timelineNotes: {
    padding: spacing[3],           // 12px
    borderRadius: spacing[2],      // 8px
    borderWidth: 1,
    marginTop: spacing[2],         // 8px
  },
  timelineNotesText: {
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontStyle: 'italic',
  },
  endorsements: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[3],               // 12px (was 10)
  },
  endorsementLink: {
    paddingVertical: spacing[2],   // 8px
    paddingHorizontal: spacing[4], // 16px
    borderRadius: spacing[5],      // 20px
    borderWidth: 1,
  },
  endorsementText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },
  videosContainer: {
    gap: spacing[4],               // 16px
  },
  videoCard: {
    marginBottom: spacing[4],      // 16px
  },
  videoContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: spacing[2],      // 8px
    overflow: 'hidden',
    backgroundColor: '#000',
    position: 'relative',
  },
  videoThumbnail: {
    width: '100%',
    height: '100%',
  },
  playButtonOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  playButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.9,
  },
  playButtonText: {
    fontSize: fontSize.xl,
    marginLeft: spacing[1],        // 4px
  },
  // YouTube facade play button (CWV optimization - Issue #442)
  youtubePlayButton: {
    width: 68,
    height: spacing[12],           // 48px
    opacity: 0.9,
  },
  videoInfo: {
    paddingTop: spacing[2],        // 8px
  },
  videoTitle: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    marginBottom: spacing[1],      // 4px
  },
  videoYear: {
    fontSize: fontSize.xs,
  },
  videoLink: {
    paddingVertical: spacing[10],  // 40px
    paddingHorizontal: spacing[5], // 20px
    borderRadius: spacing[2],      // 8px
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoLinkText: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
  },
  // Kit Cost Calculator styles
  calculatorSection: {
    borderWidth: 2,
  },
  calculatorTitle: {
    marginBottom: spacing[1],      // 4px
  },
  calculatorSubtitle: {
    fontSize: fontSize.sm,
    marginBottom: spacing[4],      // 16px
  },
  calculatorItems: {
    gap: spacing[2],               // 8px
  },
  calculatorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing[1],   // 4px
  },
  calculatorLabel: {
    fontSize: fontSize.base,
  },
  calculatorPrice: {
    fontSize: fontSize.base,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  calculatorDivider: {
    height: 1,
    marginVertical: spacing[3],    // 12px
  },
  calculatorTotals: {
    gap: spacing[1],               // 4px
    marginBottom: spacing[2],      // 8px
  },
  calculatorTotalLabel: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
  },
  calculatorTotalPrice: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  calculatorDisclaimer: {
    fontSize: fontSize.xs,
    fontStyle: 'italic',
    marginTop: spacing[2],         // 8px
    marginBottom: spacing[4],      // 16px
  },
  buySetupContainer: {
    flexDirection: 'row',
    gap: spacing[3],               // 12px
    flexWrap: 'wrap',
  },
  buySetupButton: {
    flex: 1,
    minWidth: 140,
    paddingVertical: spacing[4],   // 16px (was 14)
    paddingHorizontal: spacing[5], // 20px
    borderRadius: spacing[2],      // 8px
    alignItems: 'center',
  },
  buySetupButtonUS: {
    backgroundColor: colors.buttons.secondary.bg,
  },
  buySetupButtonEU: {
    backgroundColor: colors.buttons.secondary.bg,
  },
  buySetupButtonText: {
    color: '#ffffff',
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
  },
  shareCostButton: {
    marginTop: spacing[3],         // 12px
    paddingVertical: spacing[3],   // 12px (was 10)
    paddingHorizontal: spacing[4], // 16px
    borderWidth: 1,
    borderRadius: spacing[2],      // 8px
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  shareCostButtonText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },
// Genre tag styles
  genreTagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[2],               // 8px (was 6)
    marginTop: spacing[1],         // 4px
  },
  genreTag: {
    borderRadius: spacing[3],      // 12px
  },
  genreTagSmall: {
    paddingVertical: 2,
    paddingHorizontal: spacing[2], // 8px
  },
  genreTagLarge: {
    paddingVertical: spacing[1],   // 4px
    paddingHorizontal: spacing[3], // 12px
  },
  genreTagText: {
    fontWeight: '600',
  },
  genreTagTextSmall: {
    fontSize: fontSize.xs,
  },
  genreTagTextLarge: {
    fontSize: fontSize.xs,
  },
  // Compare feature styles
  listWrapper: {
    flex: 1,
  },
  actionButtonsRow: {
    flexDirection: 'row',
    marginHorizontal: spacing[5],  // 20px
    marginBottom: spacing[4],      // 16px
    gap: spacing[3],               // 12px
  },
  compareButton: {
    flex: 1,
    padding: spacing[4],           // 16px (was 14)
    borderRadius: spacing[2],      // 8px
    borderWidth: 1,
    alignItems: 'center',
  },
  compareButtonText: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
  },
  quizButton: {
    flex: 1,
    padding: spacing[4],           // 16px (was 14)
    borderRadius: spacing[2],      // 8px
    borderWidth: 1,
    alignItems: 'center',
  },
  quizButtonText: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
  },
  // Quiz Styles
  quizContainer: {
    flex: 1,
  },
  quizContent: {
    padding: spacing[5],           // 20px
    maxWidth: 600,
    alignSelf: 'center',
    width: '100%',
  },
  quizHeader: {
    marginBottom: spacing[6],      // 24px
    alignItems: 'center',
  },
  quizTitle: {
    fontSize: fontSize.display.sm,
    fontWeight: fontWeight.bold,
    marginBottom: spacing[3],      // 12px
    textAlign: 'center',
  },
  quizSubtitle: {
    fontSize: fontSize.base,
    textAlign: 'center',
    lineHeight: lineHeight.base,
  },
  progressContainer: {
    marginBottom: spacing[6],      // 24px
  },
  progressBar: {
    height: spacing[2],            // 8px
    borderRadius: spacing[1],      // 4px
    overflow: 'hidden',
    marginBottom: spacing[2],      // 8px
  },
  progressFill: {
    height: '100%',
    borderRadius: spacing[1],      // 4px
  },
  progressText: {
    fontSize: fontSize.sm,
    textAlign: 'center',
  },
  questionSection: {
    marginBottom: spacing[6],      // 24px
  },
  questionText: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.semibold,
    textAlign: 'center',
  },
  optionsContainer: {
    gap: spacing[3],               // 12px
  },
  optionCard: {
    padding: spacing[4],           // 16px
    borderRadius: spacing[3],      // 12px
    borderWidth: 2,
  },
  optionLabel: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    marginBottom: spacing[1],      // 4px
  },
  optionDescription: {
    fontSize: fontSize.sm,
  },
  prevButton: {
    marginTop: spacing[6],         // 24px
    padding: spacing[3],           // 12px
    borderRadius: spacing[2],      // 8px
    borderWidth: 1,
    alignItems: 'center',
  },
  prevButtonText: {
    fontSize: fontSize.sm,
  },
  // Quiz Results Styles
  resultsHeader: {
    marginBottom: spacing[6],      // 24px
    alignItems: 'center',
  },
  resultsTitle: {
    fontSize: fontSize.display.sm,
    fontWeight: fontWeight.bold,
    textAlign: 'center',
  },
  topMatchCard: {
    padding: spacing[6],           // 24px
    borderRadius: spacing[4],      // 16px
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: spacing[6],      // 24px
    position: 'relative',
  },
  matchPercentBadge: {
    position: 'absolute',
    top: -spacing[3],              // -12px
    right: spacing[4],             // 16px
    backgroundColor: '#dc2626',
    paddingHorizontal: spacing[3], // 12px
    paddingVertical: spacing[2],   // 8px (was 6)
    borderRadius: spacing[5],      // 20px
  },
  matchPercentText: {
    color: '#ffffff',
    fontWeight: fontWeight.bold,
    fontSize: fontSize.sm,
  },
  topMatchImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: spacing[4],      // 16px
    aspectRatio: 1, // Prevent CLS (Issue #248)
  },
  topMatchName: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    marginBottom: spacing[1],      // 4px
    textAlign: 'center',
  },
  topMatchBand: {
    fontSize: fontSize.lg,
    marginBottom: spacing[3],      // 12px
    textAlign: 'center',
  },
  matchReasons: {
    fontSize: fontSize.sm,
    marginBottom: spacing[4],      // 16px
    textAlign: 'center',
  },
  viewProfileButton: {
    paddingHorizontal: spacing[6], // 24px
    paddingVertical: spacing[3],   // 12px
    borderRadius: spacing[2],      // 8px
  },
  viewProfileButtonText: {
    color: '#ffffff',
    fontWeight: fontWeight.semibold,
    fontSize: fontSize.base,
  },
  shareSection: {
    marginBottom: spacing[6],      // 24px
    alignItems: 'center',
  },
  shareTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    marginBottom: spacing[3],      // 12px
  },
  shareButtons: {
    flexDirection: 'row',
    gap: spacing[3],               // 12px
  },
  shareButton: {
    paddingHorizontal: spacing[4], // 16px
    paddingVertical: spacing[3],   // 12px (was 10)
    borderRadius: spacing[2],      // 8px
  },
  shareButtonText: {
    color: '#ffffff',
    fontWeight: fontWeight.semibold,
    fontSize: fontSize.sm,
  },
  runnerUpsSection: {
    marginBottom: spacing[6],      // 24px
  },
  runnerUpsTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    marginBottom: spacing[3],      // 12px
    textAlign: 'center',
  },
  runnerUpCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing[3],           // 12px
    borderRadius: spacing[3],      // 12px
    borderWidth: 1,
    marginBottom: spacing[2],      // 8px
  },
  runnerUpImage: {
    width: spacing[12],            // 48px
    height: spacing[12],           // 48px
    borderRadius: spacing[6],      // 24px
    marginRight: spacing[3],       // 12px
    aspectRatio: 1, // Prevent CLS (Issue #248)
  },
  runnerUpInfo: {
    flex: 1,
  },
  runnerUpName: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
  },
  runnerUpBand: {
    fontSize: fontSize.sm,
  },
  runnerUpPercent: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
  },
  quizNewsletter: {
    padding: spacing[5],           // 20px
    borderRadius: spacing[3],      // 12px
    borderWidth: 1,
    marginBottom: spacing[6],      // 24px
    alignItems: 'center',
  },
  quizNewsletterTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    marginBottom: spacing[2],      // 8px
    textAlign: 'center',
  },
  quizNewsletterSubtitle: {
    fontSize: fontSize.sm,
    textAlign: 'center',
    marginBottom: spacing[4],      // 16px
  },
  quizNewsletterForm: {
    flexDirection: 'row',
    gap: spacing[2],               // 8px
    width: '100%',
    maxWidth: 400,
  },
  quizNewsletterInput: {
    flex: 1,
    padding: spacing[3],           // 12px
    borderRadius: spacing[2],      // 8px
    borderWidth: 1,
    fontSize: fontSize.base,
  },
  quizNewsletterButton: {
    paddingHorizontal: spacing[5], // 20px
    paddingVertical: spacing[3],   // 12px
    borderRadius: spacing[2],      // 8px
  },
  quizNewsletterButtonText: {
    color: '#ffffff',
    fontWeight: fontWeight.semibold,
    fontSize: fontSize.base,
  },
  // Kit Quiz Styles (Issue #551)
  kitQuizLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing[10],
  },
  kitQuizLoadingText: {
    marginTop: spacing[4],
    fontSize: fontSize.base,
  },
  kitQuizIntro: {
    alignItems: 'center',
    paddingVertical: spacing[8],
  },
  kitQuizIntroEmoji: {
    fontSize: 64,
    marginBottom: spacing[4],
  },
  kitQuizIntroTitle: {
    fontSize: fontSize.display.sm,
    fontWeight: fontWeight.bold,
    textAlign: 'center',
    marginBottom: spacing[3],
  },
  kitQuizIntroSubtitle: {
    fontSize: fontSize.lg,
    textAlign: 'center',
    lineHeight: lineHeight.lg,
    marginBottom: spacing[6],
  },
  kitQuizInfoBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing[4],
    padding: spacing[4],
    borderRadius: spacing[3],
    borderWidth: 1,
    marginBottom: spacing[6],
  },
  kitQuizInfoText: {
    fontSize: fontSize.base,
  },
  kitQuizStartButton: {
    paddingHorizontal: spacing[8],
    paddingVertical: spacing[4],
    borderRadius: spacing[3],
  },
  kitQuizStartButtonText: {
    color: '#ffffff',
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
  },
  kitQuizQuestionCard: {
    padding: spacing[5],
    borderRadius: spacing[4],
    borderWidth: 1,
    marginBottom: spacing[5],
  },
  kitQuizQuestionTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    textAlign: 'center',
    marginBottom: spacing[5],
  },
  kitQuizGearList: {
    gap: spacing[3],
  },
  kitQuizGearItem: {
    marginBottom: spacing[2],
  },
  kitQuizGearLabel: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    marginBottom: spacing[1],
  },
  kitQuizGearValue: {
    fontSize: fontSize.base,
    lineHeight: lineHeight.base,
  },
  kitQuizHintButton: {
    alignSelf: 'center',
    marginTop: spacing[4],
    padding: spacing[3],
    borderRadius: spacing[2],
    borderWidth: 1,
  },
  kitQuizHintButtonText: {
    fontSize: fontSize.sm,
  },
  kitQuizHintBox: {
    marginTop: spacing[4],
    padding: spacing[3],
    borderRadius: spacing[2],
    borderWidth: 1,
  },
  kitQuizHintText: {
    fontSize: fontSize.base,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  kitQuizOptions: {
    gap: spacing[3],
  },
  kitQuizOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing[4],
    borderRadius: spacing[3],
    borderWidth: 2,
  },
  kitQuizOptionCorrect: {
    backgroundColor: '#22c55e',
    borderColor: '#22c55e',
  },
  kitQuizOptionIncorrect: {
    backgroundColor: '#ef4444',
    borderColor: '#ef4444',
  },
  kitQuizOptionImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: spacing[3],
  },
  kitQuizOptionInfo: {
    flex: 1,
  },
  kitQuizOptionName: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
  },
  kitQuizOptionBand: {
    fontSize: fontSize.sm,
  },
  kitQuizOptionCheck: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: fontWeight.bold,
  },
  kitQuizOptionX: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: fontWeight.bold,
  },
  kitQuizResultsHeader: {
    alignItems: 'center',
    marginBottom: spacing[6],
  },
  kitQuizResultEmoji: {
    fontSize: 64,
    marginBottom: spacing[4],
  },
  kitQuizResultTitle: {
    fontSize: fontSize.display.sm,
    fontWeight: fontWeight.bold,
    textAlign: 'center',
    marginBottom: spacing[2],
  },
  kitQuizResultMessage: {
    fontSize: fontSize.base,
    textAlign: 'center',
    lineHeight: lineHeight.base,
  },
  kitQuizScoreCard: {
    alignItems: 'center',
    padding: spacing[6],
    borderRadius: spacing[4],
    borderWidth: 1,
    marginBottom: spacing[6],
  },
  kitQuizScoreNumber: {
    fontSize: fontSize.display.lg,
    fontWeight: fontWeight.bold,
    marginBottom: spacing[2],
  },
  kitQuizScorePercent: {
    fontSize: fontSize.lg,
    marginBottom: spacing[4],
  },
  kitQuizScoreBar: {
    width: '100%',
    height: spacing[3],
    borderRadius: spacing[1],
    overflow: 'hidden',
  },
  kitQuizScoreBarFill: {
    height: '100%',
    borderRadius: spacing[1],
  },
  kitQuizActions: {
    gap: spacing[3],
    marginTop: spacing[4],
  },
  kitQuizActionButton: {
    padding: spacing[4],
    borderRadius: spacing[3],
    alignItems: 'center',
  },
  kitQuizActionButtonText: {
    color: '#ffffff',
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
  },
  kitQuizActionButtonSecondary: {
    padding: spacing[4],
    borderRadius: spacing[3],
    borderWidth: 1,
    alignItems: 'center',
  },
  kitQuizActionButtonTextSecondary: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
  },
  restartButton: {
    padding: spacing[4],           // 16px (was 14)
    borderRadius: spacing[2],      // 8px
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: spacing[10],     // 40px
  },
  restartButtonText: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
  },
  compareTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    marginBottom: spacing[2],      // 8px
  },
  compareSubtitle: {
    fontSize: fontSize.sm,
    marginBottom: spacing[5],      // 20px
  },
  selectorsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 24,
    zIndex: 1000,
    position: 'relative',
  },
  selectorsMobile: {
    flexDirection: 'column',
  },
  selectorWrapper: {
    flex: 1,
    minWidth: 200,
    zIndex: 1000,
  },
  selectorWrapperMobile: {
    minWidth: '100%',
  },
  selectorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  selectorLabel: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
  },
  removeSlot: {
    fontSize: fontSize.xs,
  },
  selectorContainer: {
    position: 'relative',
    zIndex: 1000,
  },
  selectorButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  selectorText: {
    fontSize: fontSize.sm,
    flex: 1,
  },
  selectorArrow: {
    fontSize: fontSize.xs,
    marginLeft: 8,
  },
  selectorDropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 4,
    maxHeight: 250,
    zIndex: 1001,
  },
  selectorSearch: {
    padding: 10,
    borderBottomWidth: 1,
    fontSize: fontSize.sm,
  },
  selectorList: {
    maxHeight: 200,
  },
  selectorOption: {
    padding: 12,
    borderBottomWidth: 1,
  },
  selectorOptionText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },
  selectorOptionSubtext: {
    fontSize: fontSize.xs,
    marginTop: 2,
  },
  // Mobile-specific selector styles for better touch targets and rendering
  selectorContainerMobile: {
    zIndex: 1000,
  },
  selectorButtonMobile: {
    minHeight: 48,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  selectorTextMobile: {
    fontSize: fontSize.base,
  },
  selectorDropdownMobile: {
    position: 'absolute',
    maxHeight: 300,
    zIndex: 1001,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  selectorSearchMobile: {
    minHeight: 48,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: fontSize.base,
  },
  selectorListMobile: {
    maxHeight: 240,
  },
  selectorOptionMobile: {
    minHeight: 52,
    paddingVertical: 14,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  addSlotButton: {
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 200,
  },
  addSlotText: {
    fontSize: fontSize.sm,
  },
  compareLoading: {
    padding: 40,
    alignItems: 'center',
  },
  comparisonContainer: {
    gap: 16,
  },
  comparisonHeaderRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  comparisonHeaderRowMobile: {
    flexDirection: 'column',
  },
  drummerHeader: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
  },
  drummerHeaderMobile: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 12,
  },
  compareImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
    aspectRatio: 1, // Prevent CLS (Issue #248)
  },
  compareImageMobile: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 0,
    aspectRatio: 1, // Prevent CLS (Issue #248)
  },
  compareName: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.bold,
    textAlign: 'center',
  },
  compareBand: {
    fontSize: fontSize.sm,
    textAlign: 'center',
  },
  compareGenre: {
    fontSize: fontSize.xs,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  comparisonHint: {
    fontSize: fontSize.xs,
    marginBottom: 16,
    fontStyle: 'italic',
  },
  comparisonRow: {
    marginBottom: 16,
  },
  comparisonLabel: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    marginBottom: 8,
  },
  comparisonValues: {
    flexDirection: 'row',
    gap: 12,
  },
  comparisonValue: {
    flex: 1,
    padding: 10,
    borderRadius: 6,
  },
  comparisonValueText: {
    fontSize: fontSize.sm,
    lineHeight: lineHeight.xs,
  },
  costComparisonContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  costComparisonContainerMobile: {
    flexDirection: 'column',
  },
  costCard: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  costCardMobile: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  costName: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    marginBottom: 8,
  },
  costPrice: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
  },
  costPriceUsd: {
    fontSize: fontSize.sm,
    marginTop: 4,
  },
  emptyStateText: {
    fontSize: fontSize.sm,
    textAlign: 'center',
    padding: 20,
  },
  shareContainer: {
    marginTop: 8,
  },
  shareTitle: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    marginBottom: 12,
  },
  shareButtons: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  shareButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  shareButtonText: {
    color: '#ffffff',
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
  },
  // Drummer detail wrapper for share button positioning
  drummerDetailWrapper: {
    flex: 1,
    position: 'relative',
  },
  detailContainerWithSideRail: {
    marginRight: 70, // Make room for side rail on desktop (right side)
  },
  detailContentMobile: {
    paddingBottom: 80, // Make room for floating bottom bar on mobile
  },
  // Desktop: Side rail share buttons (sticky, right side)
  shareSideRail: {
    position: Platform.OS === 'web' ? 'fixed' : 'absolute',
    right: 20,
    top: 120,
    width: 50,
    borderRadius: 25,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
    gap: 8,
    zIndex: 100,
    ...(Platform.OS === 'web' && { boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' }),
  },
  shareSideRailLabel: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  shareSideRailButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  shareSideRailButtonTwitter: {
    backgroundColor: '#000000',
    borderColor: '#333333',
  },
  shareSideRailButtonFacebook: {
    backgroundColor: '#1877F2',
  },
  shareSideRailButtonCopy: {
    backgroundColor: 'transparent',
  },
  shareSideRailIcon: {
    fontSize: fontSize.base,
    color: '#ffffff',
  },
  // Mobile: Floating bottom bar share buttons
  shareFloatingBar: {
    position: Platform.OS === 'web' ? 'fixed' : 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    gap: 16,
    zIndex: 100,
    ...(Platform.OS === 'web' && { boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.1)' }),
  },
  shareFloatingLabel: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    marginRight: 8,
  },
  shareFloatingButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  shareFloatingButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  shareFloatingButtonTwitter: {
    backgroundColor: '#000000',
    borderColor: '#333333',
  },
  shareFloatingButtonFacebook: {
    backgroundColor: '#1877F2',
  },
  shareFloatingButtonCopy: {
    backgroundColor: 'transparent',
  },
  shareFloatingButtonNative: {
    backgroundColor: 'rgba(100, 100, 100, 0.2)',
  },
  shareFloatingIcon: {
    fontSize: fontSize.lg,
    color: '#ffffff',
  },
  // Toast notification for copy success
  shareToast: {
    position: Platform.OS === 'web' ? 'fixed' : 'absolute',
    bottom: Platform.OS === 'web' ? 80 : 100,
    left: '50%',
    transform: [{ translateX: -100 }],
    width: 200,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 200,
    ...(Platform.OS === 'web' && { 
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      transform: 'translateX(-50%)',
    }),
  },
  shareToastText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },
  // Legacy profile share styles (kept for comparison page compatibility)
  profileShareContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  profileShareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'transparent',
    transition: 'all 0.2s ease',
  },
  profileShareButtonTwitter: {
    backgroundColor: '#000000',
    borderColor: '#333333',
  },
  profileShareButtonFacebook: {
    backgroundColor: '#1877F2',
  },
  profileShareButtonCopy: {
    backgroundColor: 'transparent',
  },
  profileShareButtonNative: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  profileShareIcon: {
    fontSize: fontSize.sm,
    color: '#ffffff',
  },
  profileShareText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },
  profileShareTextLight: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: '#ffffff',
  },
  // Gear detail page styles
  gearDetailHeader: {
    flexDirection: 'row',
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  gearDetailImage: {
    width: 150,
    height: 150,
    borderRadius: 12,
    marginRight: 20,
    marginBottom: 10,
    aspectRatio: 1, // Prevent CLS (Issue #248)
  },
  gearDetailHeaderText: {
    flex: 1,
    minWidth: 200,
    justifyContent: 'center',
  },
  gearCategoryBadge: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  gearCategoryText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
    textTransform: 'uppercase',
  },
  gearDetailName: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    marginBottom: 4,
  },
  gearDetailBrand: {
    fontSize: fontSize.lg,
    marginBottom: 8,
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(128, 128, 128, 0.2)',
  },
  specLabel: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    flex: 1,
  },
  specValue: {
    fontSize: fontSize.sm,
    flex: 1,
    textAlign: 'right',
  },
  gearPriceContainer: {
    marginBottom: 16,
  },
  gearPriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  gearPriceLabel: {
    fontSize: fontSize.base,
  },
  gearPrice: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  usedBySubtitle: {
    fontSize: fontSize.sm,
    marginBottom: 16,
  },
  usedByContainer: {
    gap: 12,
  },
  usedByCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  usedByImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    aspectRatio: 1, // Prevent CLS (Issue #248)
  },
  usedByText: {
    flex: 1,
  },
  usedByName: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
    marginBottom: 2,
  },
  usedByBand: {
    fontSize: fontSize.sm,
  },
  relatedGearContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  relatedGearCard: {
    width: 150,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  relatedGearImage: {
    width: '100%',
    height: 100,
    borderRadius: 6,
    marginBottom: 8,
    aspectRatio: 3 / 2, // Prevent CLS (Issue #248)
  },
  relatedGearName: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    marginBottom: 4,
  },
  relatedGearPrice: {
    fontSize: fontSize.xs,
  },
  // Search and Filter styles
  searchFilterContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
    zIndex: 100,
  },
  searchContainer: {
    position: 'relative',
    zIndex: 101,
    marginBottom: 12,
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    height: 48, // WCAG AA touch target (was 44)
  },
  searchIcon: {
    fontSize: fontSize.base,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: fontSize.base,
    height: '100%',
    outlineStyle: 'none',
  },
  searchClearButton: {
    padding: 4,
  },
  searchClearText: {
    fontSize: fontSize.sm,
  },
  searchShortcut: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
  },
  searchShortcutText: {
    fontSize: fontSize.xs,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  suggestionsContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 4,
    maxHeight: 300,
    zIndex: 102,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: 1,
  },
  suggestionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  suggestionImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
    aspectRatio: 1, // Prevent CLS (Issue #248)
  },
  suggestionText: {
    flex: 1,
  },
  suggestionTitle: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },
  suggestionSubtitle: {
    fontSize: fontSize.xs,
    marginTop: 2,
  },
  suggestionType: {
    fontSize: fontSize.base,
    marginLeft: 8,
  },
  // Filter bar styles
  filterBar: {
    zIndex: 99,
  },
  filterChipsContainer: {
    marginBottom: 8,
  },
  filterChipsScroll: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 4,
  },
  filterLabel: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
    marginRight: 4,
  },
  filterSeparator: {
    width: 1,
    height: 20,
    backgroundColor: 'rgba(128, 128, 128, 0.3)',
    marginHorizontal: 8,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
  },
  filterChipText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
  },
  filterDropdownContainer: {
    position: 'relative',
    zIndex: 100,
  },
  filterDropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    gap: 6,
  },
  filterDropdownLabel: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
  },
  filterDropdownArrow: {
    fontSize: fontSize.xs,
  },
  filterDropdownMenu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    minWidth: 150,
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 4,
    zIndex: 101,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  filterDropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
  },
  filterDropdownItemText: {
    fontSize: fontSize.sm,
  },
  filterResultsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  filterResultCount: {
    fontSize: fontSize.sm,
  },
  clearFiltersLink: {
    padding: 4,
  },
  clearFiltersLinkText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
  },
  // Mobile filter styles
  filterBarMobile: {
    zIndex: 99,
  },
  filterBarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  filterToggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    gap: 8,
  },
  filterToggleText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },
  filterToggleArrow: {
    fontSize: fontSize.xs,
  },
  filterPanelMobile: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 8,
    gap: 12,
  },
  clearFiltersButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    marginTop: 4,
  },
  clearFiltersText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },
  // No results styles
  noResultsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  noResultsText: {
    fontSize: fontSize.base,
    textAlign: 'center',
    marginBottom: 16,
  },
  clearFiltersButtonLarge: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 1,
  },
  clearFiltersButtonText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
  },
  // Newsletter Footer styles
  newsletterFooter: {
    borderTopWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginTop: 'auto',
  },
  newsletterContainer: {
    maxWidth: 800,
    marginHorizontal: 'auto',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 10,
  },
  newsletterContainerMobile: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  newsletterTextSection: {
    flex: 1,
    minWidth: 200,
  },
  newsletterTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    marginBottom: 2,
  },
  newsletterSubtitle: {
    fontSize: fontSize.sm,
  },
  newsletterForm: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
    maxWidth: 400,
  },
  newsletterFormMobile: {
    flexDirection: 'column',
    maxWidth: '100%',
    width: '100%',
    gap: 8,
  },
  newsletterInputWrapper: {
    flex: 1,
    borderRadius: 8,
    borderWidth: 2,
    overflow: 'hidden',
  },
  newsletterInputWrapperMobile: {
    width: '100%',
  },
  newsletterInput: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: fontSize.base,
    height: 48,
    outlineStyle: 'none',
  },
  newsletterButton: {
    backgroundColor: colors.buttons.accent.bg,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 120,
  },
  newsletterButtonMobile: {
    width: '100%',
  },
  newsletterButtonDisabled: {
    opacity: 0.7,
  },
  newsletterButtonText: {
    color: '#000000',
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
  },
  newsletterSuccessContainer: {
    flex: 1,
    maxWidth: 400,
  },
  newsletterSuccess: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.medium,
  },
  newsletterError: {
    fontSize: fontSize.sm,
    marginTop: 8,
    width: '100%',
    textAlign: 'center',
  },
  // ==========================================
  // COMPARE YOUR KIT STYLES
  // ==========================================
  kitCompareModal: {
    flex: 1,
  },
  kitCompareContent: {
    padding: 20,
    paddingBottom: 40,
  },
  kitCompareHeader: {
    marginBottom: 16,
  },
  kitCompareTitle: {
    fontSize: fontSize.display.sm,
    fontWeight: fontWeight.bold,
    marginBottom: 8,
  },
  kitCompareSubtitle: {
    fontSize: fontSize.base,
    marginBottom: 20,
  },
  kitCompareDrummerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 20,
  },
  kitCompareDrummerImage: {
    width: 60,
    height: 60,
    aspectRatio: 1,
    borderRadius: 30,
    marginRight: 16,
    aspectRatio: 1, // Prevent CLS (Issue #248)
  },
  kitCompareDrummerInfo: {
    flex: 1,
  },
  kitCompareDrummerName: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    marginBottom: 4,
  },
  kitCompareDrummerBand: {
    fontSize: fontSize.sm,
  },
  kitFormHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  kitClearButton: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },
  kitFormGrid: {
    gap: 16,
  },
  kitFormRow: {
    gap: 8,
  },
  kitFormLabel: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
  },
  kitCompareButton: {
    marginTop: 20,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  kitCompareButtonText: {
    color: '#ffffff',
    fontSize: fontSize.base,
    fontWeight: fontWeight.bold,
  },
  kitMatchSection: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  kitMatchPercentageContainer: {
    alignItems: 'center',
  },
  kitMatchPercentage: {
    fontSize: fontSize.display.lg,
    fontWeight: '900',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  kitMatchLabel: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.semibold,
    marginTop: 8,
  },
  kitMatchDescription: {
    fontSize: fontSize.base,
    textAlign: 'center',
    marginTop: 12,
    maxWidth: 300,
    lineHeight: lineHeight.sm,
  },
  kitMatchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  kitMatchInfo: {
    flex: 1,
  },
  kitMatchCategory: {
    fontSize: fontSize.xs,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  kitMatchGear: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.medium,
  },
  kitMatchBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginLeft: 12,
  },
  kitMatchBadgeText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
  },
  kitUpgradeHint: {
    fontSize: fontSize.sm,
    marginBottom: 16,
  },
  kitUpgradeRow: {
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  kitUpgradeCategory: {
    fontSize: fontSize.xs,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  kitUpgradeComparison: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  kitUpgradeItem: {
    flex: 1,
  },
  kitUpgradeLabel: {
    fontSize: fontSize.xs,
    marginBottom: 4,
  },
  kitUpgradeValue: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },
  kitUpgradeArrow: {
    fontSize: fontSize.xl,
  },
  kitShareHint: {
    fontSize: fontSize.sm,
    marginBottom: 16,
  },
  kitShareButtons: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
  kitShareButton: {
    flex: 1,
    minWidth: 120,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  kitShareButtonText: {
    color: '#ffffff',
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
  },
  kitReferenceGrid: {
    gap: 8,
  },
  kitReferenceRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(128, 128, 128, 0.2)',
  },
  kitReferenceLabel: {
    width: 80,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },
  kitReferenceValue: {
    flex: 1,
    fontSize: fontSize.sm,
  },
  // Compare Your Kit button on drummer profile
  compareKitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    gap: 8,
    marginBottom: 16,
  },
  compareKitButtonText: {
    color: '#ffffff',
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
  },
  // Compare Your Kit CTA section on drummer profile
  compareYourKitCTA: {
    borderWidth: 2,
    alignItems: 'center',
    textAlign: 'center',
  },
  compareYourKitDescription: {
    fontSize: fontSize.base,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: lineHeight.sm,
  },
  compareYourKitButton: {
    backgroundColor: '#dc2626',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 8,
    minWidth: 180,
    alignItems: 'center',
  },
  compareYourKitButtonText: {
    color: '#ffffff',
    fontSize: fontSize.base,
    fontWeight: fontWeight.bold,
  },
  // ==========================================
  // DRUMMER SPOTLIGHT STYLES
  // ==========================================
  spotlightContainer: {
    marginBottom: 20,
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    minHeight: 280, // CLS prevention: reserve space for spotlight content (Issue #312)
  },
  spotlightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(128, 128, 128, 0.2)',
  },
  spotlightLabel: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.bold,
    letterSpacing: 1,
  },
  spotlightWeek: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
  },
  spotlightContent: {
    flexDirection: 'row',
    padding: 16,
    gap: 20,
  },
  spotlightContentMobile: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  spotlightImageContainer: {
    flexShrink: 0,
  },
  spotlightImage: {
    width: 140,
    height: 140,
    borderRadius: 12,
    aspectRatio: 1, // Prevent CLS (Issue #248, #312)
  },
  spotlightImageMobile: {
    width: 100,
    height: 100,
    aspectRatio: 1,
    marginBottom: 16,
  },
  spotlightInfo: {
    flex: 1,
  },
  spotlightInfoMobile: {
    alignItems: 'center',
    width: '100%',
  },
  spotlightName: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    marginBottom: 4,
  },
  spotlightBand: {
    fontSize: fontSize.base,
    marginBottom: 16,
  },
  spotlightQuickFacts: {
    marginBottom: 16,
    width: '100%',
  },
  spotlightSectionTitle: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    marginBottom: 8,
  },
  spotlightFactRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  spotlightFactBullet: {
    fontSize: fontSize.sm,
    marginRight: 8,
    fontWeight: fontWeight.bold,
  },
  spotlightFactText: {
    flex: 1,
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  },
  spotlightIconicSection: {
    marginBottom: 16,
    width: '100%',
  },
  spotlightIconicText: {
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontStyle: 'italic',
  },
  spotlightGearSection: {
    marginBottom: 16,
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: 'rgba(220, 38, 38, 0.1)',
    borderRadius: 8,
  },
  spotlightGearHighlight: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.sm,
  },
  spotlightCTAs: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  spotlightCTAsMobile: {
    flexDirection: 'column',
  },
  spotlightCTAPrimary: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  spotlightCTAPrimaryText: {
    color: '#ffffff',
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
  },
  spotlightCTASecondary: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  spotlightCTASecondaryText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },
  // ==========================================
  // SPOTLIGHTS ARCHIVE PAGE STYLES
  // ==========================================
  spotlightsArchiveTitle: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
    marginTop: 16,
  },
  spotlightsArchiveSubtitle: {
    fontSize: 16,
    marginBottom: 24,
    lineHeight: 24,
  },
  spotlightsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginTop: 16,
  },
  spotlightsGridMobile: {
    flexDirection: 'column',
  },
  spotlightArchiveCard: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
    flex: 1,
    minWidth: 280,
    maxWidth: 350,
    marginBottom: 16,
  },
  spotlightArchiveImage: {
    width: '100%',
    height: 180,
    aspectRatio: 16 / 9, // Prevent CLS (Issue #248)
    aspectRatio: 16 / 9,
  },
  spotlightArchiveInfo: {
    padding: 16,
  },
  spotlightArchiveName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  spotlightArchiveBand: {
    fontSize: 14,
    marginBottom: 8,
  },
  spotlightArchiveTeaser: {
    fontSize: 13,
    lineHeight: 18,
    fontStyle: 'italic',
  },
  currentSpotlightBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: colors.buttons.accent.bg,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 1,
  },
  currentSpotlightBadgeText: {
    color: '#000000',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  noSpotlightsContainer: {
    padding: 40,
    alignItems: 'center',
  },
  noSpotlightsText: {
    fontSize: 16,
    textAlign: 'center',
  },
  // ==========================================
  // TOP 10 LISTS PAGE STYLES
  // ==========================================
  listPageTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 12,
    marginTop: 16,
  },
  listPageIntro: {
    fontSize: 16,
    lineHeight: 26,
    marginBottom: 24,
  },
  listItemsContainer: {
    marginTop: 8,
  },
  listItemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  listItemRank: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItemRankText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  listItemImage: {
    width: 70,
    height: 70,
    aspectRatio: 1,
    borderRadius: 35,
    marginHorizontal: 12,
    aspectRatio: 1, // Prevent CLS (Issue #248)
  },
  listItemInfo: {
    flex: 1,
  },
  listItemName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 2,
  },
  listItemBand: {
    fontSize: 14,
    marginBottom: 4,
  },
  listItemHighlight: {
    fontSize: 13,
    fontStyle: 'italic',
    lineHeight: 18,
    marginBottom: 4,
  },
  listItemGenreContainer: {
    flexDirection: 'row',
    marginTop: 4,
  },
  listItemGenre: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  listItemArrow: {
    paddingLeft: 8,
  },
  relatedListsSection: {
    marginTop: 32,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  relatedListsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  relatedListsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  relatedListsGridMobile: {
    flexDirection: 'column',
  },
  relatedListCard: {
    flex: 1,
    minWidth: 150,
    maxWidth: 200,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  relatedListEmoji: {
    fontSize: 28,
    marginBottom: 8,
  },
  relatedListName: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  // List Index Page Styles
  listIndexTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 16,
  },
  listIndexSubtitle: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
  listIndexGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginTop: 8,
  },
  listIndexGridMobile: {
    flexDirection: 'column',
  },
  listIndexCard: {
    flex: 1,
    minWidth: 280,
    maxWidth: 350,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
  },
  listIndexEmoji: {
    fontSize: 36,
    marginBottom: 12,
  },
  listIndexCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  listIndexCardDesc: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  listIndexCardCount: {
    fontSize: 13,
    fontWeight: '600',
  },
  // Top Lists Section (Homepage) Styles
  topListsSectionContainer: {
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 16,
  },
  topListsSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  topListsSectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  topListsSectionViewAll: {
    fontSize: 14,
    fontWeight: '600',
  },
  topListsSectionSubtitle: {
    fontSize: 14,
    marginBottom: 12,
  },
  topListsScroll: {
    marginHorizontal: -20,
  },
  topListsScrollContent: {
    paddingHorizontal: 20,
    gap: 12,
  },
  topListCard: {
    width: 160,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  topListEmoji: {
    fontSize: 28,
    marginBottom: 8,
  },
  topListName: {
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  topListCount: {
    fontSize: 11,
  },
  // ==========================================
  // GEAR BY BUDGET PAGE STYLES
  // ==========================================
  budgetPageTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 16,
  },
  budgetPageSubtitle: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
  budgetTierButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  budgetTierButtonsMobile: {
    flexDirection: 'column',
    gap: 10,
  },
  budgetTierButton: {
    flex: 1,
    minWidth: 140,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
  },
  budgetTierButtonEmoji: {
    fontSize: 28,
    marginBottom: 8,
  },
  budgetTierButtonLabel: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  budgetTierButtonRange: {
    fontSize: 13,
    marginBottom: 4,
  },
  budgetTierButtonCount: {
    fontSize: 12,
  },
  clearBudgetFilter: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: 24,
  },
  clearBudgetFilterText: {
    fontSize: 14,
    fontWeight: '500',
  },
  budgetTierSection: {
    marginBottom: 32,
  },
  budgetTierHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  budgetTierSectionTitle: {
    fontSize: 24,
    fontWeight: '700',
  },
  budgetTierSectionRange: {
    fontSize: 14,
  },
  budgetTierDescription: {
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 20,
  },
  budgetDrummerGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  budgetDrummerGridMobile: {
    flexDirection: 'column',
    gap: 12,
  },
  budgetDrummerCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  budgetDrummerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
    aspectRatio: 1, // Prevent CLS (Issue #248)
  },
  budgetDrummerInfo: {
    flex: 1,
  },
  budgetDrummerName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  budgetDrummerBand: {
    fontSize: 13,
    marginBottom: 6,
  },
  budgetDrummerCost: {
    flexDirection: 'row',
    alignItems: 'baseline',
    flexWrap: 'wrap',
  },
  budgetDrummerPrice: {
    fontSize: 16,
    fontWeight: '700',
    marginRight: 6,
  },
  budgetDrummerPriceUsd: {
    fontSize: 12,
  },
  noBudgetDrummers: {
    padding: 40,
    alignItems: 'center',
  },
  noBudgetDrummersText: {
    fontSize: 16,
    textAlign: 'center',
  },
  // ==========================================
  // BIRTHDAY CALENDAR PAGE STYLES (Issue #343)
  // ==========================================
  birthdayCalendarTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 16,
  },
  birthdayCalendarSubtitle: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
  todayBirthdayBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  todayBirthdayEmoji: {
    fontSize: 32,
  },
  todayBirthdayContent: {
    flex: 1,
    marginHorizontal: 12,
  },
  todayBirthdayLabel: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 4,
  },
  todayBirthdayName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  birthdayShareSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 20,
    flexWrap: 'wrap',
    gap: 12,
  },
  birthdayShareLabel: {
    fontSize: 14,
  },
  birthdayShareButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  birthdayShareButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  birthdayShareButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  birthdaySection: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 20,
  },
  birthdaySectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  upcomingBirthdaysList: {
    gap: 8,
  },
  upcomingBirthdayItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  upcomingBirthdayLeft: {
    flex: 1,
  },
  upcomingBirthdayName: {
    fontSize: 16,
    fontWeight: '600',
  },
  upcomingBirthdayBand: {
    fontSize: 13,
    marginTop: 2,
  },
  upcomingBirthdayRight: {
    alignItems: 'flex-end',
  },
  upcomingBirthdayDate: {
    fontSize: 14,
    fontWeight: '600',
  },
  upcomingBirthdayDays: {
    fontSize: 12,
    marginTop: 2,
  },
  monthFilterSection: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 20,
  },
  monthFilterTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  monthGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  monthGridMobile: {
    gap: 6,
  },
  monthButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    minWidth: 60,
    position: 'relative',
  },
  monthButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  monthBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  monthBadgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  clearMonthFilter: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    marginTop: 12,
  },
  clearMonthFilterText: {
    fontSize: 14,
    fontWeight: '500',
  },
  birthdayCardsSection: {
    marginBottom: 20,
  },
  birthdayCardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'flex-start',
  },
  birthdayCardsGridMobile: {
    flexDirection: 'column',
    gap: 12,
  },
  birthdayCard: {
    width: '100%',
    maxWidth: 400,
    minWidth: 280,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  birthdayCardMobile: {
    maxWidth: '100%',
    minWidth: 0,
  },
  birthdayCardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  birthdayCardDate: {
    backgroundColor: '#dc2626',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
    minWidth: 50,
    marginRight: 12,
  },
  birthdayCardDay: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 28,
  },
  birthdayCardMonth: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  birthdayCardInfo: {
    flex: 1,
    minWidth: 0,
  },
  birthdayCardName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
    flexWrap: 'wrap',
  },
  birthdayCardBand: {
    fontSize: 14,
    marginBottom: 6,
    flexWrap: 'wrap',
  },
  birthdayCardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  birthdayCardYear: {
    fontSize: 12,
  },
  birthdayCardZodiac: {
    fontSize: 16,
  },
  birthdayCardFooter: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(128, 128, 128, 0.2)',
  },
  birthdayCardAge: {
    fontSize: 13,
    marginBottom: 6,
  },
  birthdayCardPlace: {
    fontSize: 13,
    lineHeight: 18,
  },
  memorialRibbon: {
    position: 'absolute',
    top: 12,
    right: -30,
    backgroundColor: '#1f2937',
    paddingVertical: 4,
    paddingHorizontal: 30,
    transform: [{ rotate: '45deg' }],
  },
  memorialRibbonText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  noBirthdaysContainer: {
    padding: 40,
    alignItems: 'center',
  },
  noBirthdaysText: {
    fontSize: 16,
    textAlign: 'center',
  },
  birthdayStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    gap: 16,
  },
  birthdayStatItem: {
    alignItems: 'center',
    minWidth: 80,
  },
  birthdayStatValue: {
    fontSize: 28,
    fontWeight: '700',
  },
  birthdayStatLabel: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
  },
  // ==========================================
  // QUOTES PAGE STYLES
  // ==========================================
  quotesPageTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 16,
  },
  quotesPageSubtitle: {
    fontSize: 16,
    marginBottom: 24,
    lineHeight: 24,
  },
  quotesFilters: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  quotesFiltersMobile: {
    flexDirection: 'column',
  },
  quotesSearchInput: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
  },
  quotesDropdown: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    borderRadius: 8,
    padding: 8,
    borderWidth: 1,
  },
  quotesDropdownItem: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  quotesDropdownText: {
    fontSize: 14,
  },
  quotesCount: {
    fontSize: 14,
    marginBottom: 16,
  },
  quotesGrid: {
    gap: 16,
  },
  quotePageCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 20,
    marginBottom: 16,
  },
  quotePageText: {
    fontSize: 18,
    lineHeight: 28,
    fontStyle: 'italic',
    marginBottom: 16,
  },
  quotePageFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexWrap: 'wrap',
    gap: 12,
  },
  quotePageDrummer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  quotePageImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    aspectRatio: 1, // Prevent CLS (Issue #248)
  },
  quotePageName: {
    fontSize: 16,
    fontWeight: '600',
  },
  quotePageBand: {
    fontSize: 14,
  },
  quotePageSource: {
    fontSize: 13,
    fontStyle: 'italic',
  },
  noQuotesContainer: {
    padding: 40,
    alignItems: 'center',
  },
  noQuotesText: {
    fontSize: 16,
    textAlign: 'center',
  },
  suggestionButton: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: 'center',
    marginBottom: 12,
  },
  suggestionButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  // ==========================================
  // AFFORDABLE ALTERNATIVES SECTION STYLES
  // ==========================================
  affordableSection: {
    borderWidth: 2,
  },
  affordableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingBottom: 8,
  },
  affordableSubtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  affordableExpandIcon: {
    fontSize: 16,
    paddingLeft: 16,
  },
  affordableContent: {
    paddingTop: 16,
  },
  affordableDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  affordableGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  affordableGridMobile: {
    flexDirection: 'column',
  },
  affordableCard: {
    width: '48%',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  affordableCardImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    aspectRatio: 1, // Prevent CLS (Issue #248)
  },
  affordableCardInfo: {
    flex: 1,
  },
  affordableCardName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  affordableCardBand: {
    fontSize: 12,
    marginBottom: 4,
  },
  affordableCardPricing: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 4,
  },
  affordableCardPrice: {
    fontSize: 14,
    fontWeight: '700',
  },
  affordableSavingsBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  affordableSavingsText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '600',
  },
  affordableTierBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  affordableTierText: {
    fontSize: 10,
    fontWeight: '600',
  },
  viewAllBudgetButton: {
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    marginTop: 16,
  },
  viewAllBudgetText: {
    fontSize: 14,
    fontWeight: '500',
  },

  // Similar Drummers Section Styles (Issue #157)
  similarDrummersSection: {
    marginTop: 16,
  },
  similarDrummersSubtitle: {
    fontSize: 14,
    marginBottom: 16,
  },
  similarDrummersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  similarDrummersGridMobile: {
    flexDirection: 'column',
  },
  similarDrummerCard: {
    width: '48%',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    position: 'relative',
  },
  similarDrummerCardMobile: {
    width: '100%',
  },
  similarDrummerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
    aspectRatio: 1, // Prevent CLS (Issue #248)
    aspectRatio: 1, // Prevent CLS (Issue #248)
  },
  similarDrummerInfo: {
    flex: 1,
    paddingRight: 40,
  },
  similarDrummerName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  similarDrummerBand: {
    fontSize: 12,
    marginBottom: 6,
  },
  similarDrummerGenres: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginBottom: 4,
  },
  similarDrummerGear: {
    fontSize: 11,
    marginTop: 6,
    fontStyle: 'italic',
  },
  similarityBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  similarityText: {
    fontSize: 11,
    fontWeight: '600',
  },

  // Gear Finder Page Styles (Issue #156)
  gearFinderTitle: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 8,
  },
  gearFinderSubtitle: {
    fontSize: 16,
    marginBottom: 24,
    lineHeight: 24,
  },
  gearFinderSearchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  gearFinderSearchInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    outlineStyle: 'none',
  },
  gearFinderClearButton: {
    padding: 8,
    marginLeft: 8,
  },
  gearFinderClearText: {
    fontSize: 18,
    fontWeight: '600',
  },
  gearFinderSuggestions: {
    marginBottom: 24,
  },
  gearFinderSuggestionsTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  gearFinderSuggestionsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  gearFinderSuggestionsListMobile: {
    gap: 8,
  },
  gearFinderSuggestionChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    gap: 6,
  },
  gearFinderSuggestionIcon: {
    fontSize: 14,
  },
  gearFinderSuggestionText: {
    fontSize: 14,
    fontWeight: '500',
  },
  gearFinderLoading: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  gearFinderLoadingText: {
    marginTop: 12,
    fontSize: 14,
  },
  gearFinderResults: {
    marginTop: 8,
  },
  gearFinderResultsCount: {
    fontSize: 14,
    marginBottom: 16,
  },
  gearFinderResultsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  gearFinderResultsGridMobile: {
    flexDirection: 'column',
  },
  gearFinderResultCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  gearFinderResultCardMobile: {
    width: '100%',
  },
  gearFinderResultImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 14,
    aspectRatio: 1, // Prevent CLS (Issue #248)
  },
  gearFinderResultInfo: {
    flex: 1,
  },
  gearFinderResultName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  gearFinderResultBand: {
    fontSize: 14,
    marginBottom: 4,
  },
  gearFinderResultGenre: {
    fontSize: 12,
    fontStyle: 'italic',
    marginBottom: 8,
  },
  gearFinderMatchedGear: {
    gap: 8,
  },
  gearFinderGearMatch: {
    padding: 8,
    borderRadius: 8,
  },
  gearFinderGearCategory: {
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 2,
    textTransform: 'uppercase',
  },
  gearFinderGearItem: {
    fontSize: 13,
    lineHeight: 18,
  },
  gearFinderMoreGear: {
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: 4,
  },
  gearFinderNoResults: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  gearFinderNoResultsEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  gearFinderNoResultsText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 8,
  },
  gearFinderNoResultsHint: {
    fontSize: 14,
    textAlign: 'center',
  },
  gearFinderSeoContent: {
    marginTop: 32,
    paddingTop: 24,
    borderTopWidth: 1,
  },
  gearFinderSeoTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
  },
  gearFinderSeoText: {
    fontSize: 15,
    lineHeight: 24,
  },
  // Top Lists Section styles
  topListsSection: {
    marginVertical: 24,
    paddingHorizontal: 0,
  },
  topListsHeader: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  topListsTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  topListsSubtitle: {
    fontSize: 14,
  },
  topListsScroll: {
    paddingHorizontal: 20,
    gap: 12,
  },
  topListCard: {
    width: 160,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  topListEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  topListCardTitle: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  topListCardCount: {
    fontSize: 12,
  },
  // Top List Page styles
  topListPageHeader: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  topListPageEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  topListPageTitle: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
  },
  topListPageDescription: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    maxWidth: 600,
  },
  topListRankings: {
    paddingHorizontal: 20,
    gap: 16,
  },
  topListRankingsMobile: {
    paddingHorizontal: 16,
  },
  topListRankCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  topListRankBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#374151',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  topListRankBadgeTop3: {
    backgroundColor: '#dc2626',
  },
  topListRankNumber: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  topListDrummerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 14,
    aspectRatio: 1, // Prevent CLS (Issue #248)
  },
  topListDrummerInfo: {
    flex: 1,
  },
  topListDrummerName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  topListDrummerBand: {
    fontSize: 14,
    marginBottom: 4,
  },
  topListHighlight: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
  },
  topListReason: {
    fontSize: 12,
    lineHeight: 18,
  },
  // ==========================================
  // BAND LINKS SECTION STYLES (Issue #351)
  // ==========================================
  bandLinksSection: {
    marginBottom: 16,
  },
  bandLinksSubtitle: {
    fontSize: 14,
    marginBottom: 16,
    marginTop: -8,
  },
  bandLinksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  bandLinksGridMobile: {
    gap: 10,
  },
  bandLinkCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    minWidth: 140,
    gap: 10,
  },
  bandLinkIcon: {
    fontSize: 20,
  },
  bandLinkName: {
    fontSize: 14,
    fontWeight: '600',
  },

  // ==========================================
  // KIT BUILDER STYLES (Issue #341)
  // ==========================================
  kitBuilderHeader: {
    marginBottom: 24,
  },
  kitBuilderTitleSection: {
    marginTop: 16,
  },
  kitBuilderTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  kitBuilderSubtitle: {
    fontSize: 16,
    lineHeight: 24,
  },
  kitNameSection: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 20,
  },
  kitNameLabel: {
    fontSize: 13,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontWeight: '600',
  },
  kitNameInput: {
    fontSize: 16,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  kitBuilderContent: {
    gap: 20,
  },
  kitBuilderContentDesktop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  kitBuilderLeftPanel: {
    flex: 1,
  },
  kitBuilderLeftPanelDesktop: {
    flex: 2,
    marginRight: 20,
  },
  kitBuilderRightPanel: {
    flex: 1,
  },
  kitBuilderRightPanelDesktop: {
    flex: 1,
    position: 'sticky',
    top: 20,
  },
  categoryTabs: {
    marginBottom: 16,
  },
  categoryTabsContent: {
    gap: 10,
    paddingVertical: 4,
  },
  categoryTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 24,
    borderWidth: 1,
    gap: 8,
  },
  categoryTabHasGear: {
    borderColor: '#22c55e',
    borderWidth: 2,
  },
  categoryTabIcon: {
    fontSize: 18,
  },
  categoryTabLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  categoryTabCheck: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#22c55e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryTabCheckIcon: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  categoryDescription: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 16,
  },
  categoryDescriptionText: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  gearGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  gearCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
  },
  gearCardMobile: {
    width: '100%',
  },
  gearCardSelected: {
    borderColor: '#dc2626',
    backgroundColor: 'rgba(220, 38, 38, 0.05)',
  },
  gearCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  gearCardBrand: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  gearCardSelectedBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#dc2626',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gearCardSelectedBadgeText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  gearCardName: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 8,
    lineHeight: 20,
  },
  gearCardPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  gearCardUsedBy: {
    marginTop: 4,
  },
  gearCardUsedByLabel: {
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  gearCardUsedByNames: {
    fontSize: 12,
    marginTop: 2,
  },
  gearCardButtons: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  gearCardButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gearCardButtonDetails: {
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  gearCardButtonBuy: {
    backgroundColor: '#dc2626',
  },
  gearCardButtonAddToKit: {
    backgroundColor: '#16a34a',
    flex: 1,
  },
  gearCardButtonRemove: {
    backgroundColor: '#6b7280',
    flex: 1,
  },
  gearCardButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
  gearCardButtonAddToKitText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#ffffff',
  },
  gearCardButtonBuyText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  presetKitsSection: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 20,
  },
  presetKitsHeader: {
    marginBottom: 12,
  },
  presetKitsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  presetKitsSubtitle: {
    fontSize: 14,
  },
  presetKitsScroll: {
    marginHorizontal: -8,
  },
  presetKitsScrollContent: {
    paddingHorizontal: 8,
    gap: 12,
  },
  presetKitCard: {
    width: 130,
    padding: 12,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    position: 'relative',
  },
  presetKitCardActive: {
    borderColor: '#dc2626',
  },
  presetKitActiveBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#dc2626',
    alignItems: 'center',
    justifyContent: 'center',
  },
  presetKitActiveBadgeText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  presetKitEmoji: {
    fontSize: 28,
    marginBottom: 8,
  },
  presetKitDrummer: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  presetKitBand: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 2,
  },
  presetKitPrice: {
    fontSize: 13,
    fontWeight: '600',
    color: '#dc2626',
    marginTop: 6,
  },
  kitSummaryItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  kitSummaryBuyLink: {
    padding: 4,
  },
  kitSummaryBuyLinkText: {
    fontSize: 16,
  },
  kitSummaryRemoveLink: {
    padding: 4,
    marginLeft: 4,
  },
  kitSummaryRemoveLinkText: {
    fontSize: 14,
    color: '#6b7280',
  },
  kitSummary: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  kitSummaryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  kitSummaryItems: {
    gap: 0,
  },
  kitSummaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  kitSummaryItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  kitSummaryItemIcon: {
    fontSize: 20,
    marginRight: 12,
    width: 28,
  },
  kitSummaryItemInfo: {
    flex: 1,
  },
  kitSummaryItemCategory: {
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  kitSummaryItemName: {
    fontSize: 14,
    fontWeight: '500',
  },
  kitSummaryItemPrice: {
    fontSize: 14,
    fontWeight: '600',
  },
  kitSummaryTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    marginTop: 8,
    borderTopWidth: 2,
  },
  kitSummaryTotalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  kitSummaryTotalPrice: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  kitSimilarDrummers: {
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  kitSimilarTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 12,
  },
  kitSimilarDrummer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  kitSimilarDrummerImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  kitSimilarDrummerInfo: {
    flex: 1,
  },
  kitSimilarDrummerName: {
    fontSize: 14,
    fontWeight: '600',
  },
  kitSimilarDrummerMatch: {
    fontSize: 12,
  },
  kitSimilarDrummerArrow: {
    fontSize: 16,
  },
  kitSummaryActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
  kitShareButton: {
    flex: 2,
    backgroundColor: '#dc2626',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  kitShareButtonDisabled: {
    backgroundColor: '#9ca3af',
  },
  kitShareButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
  kitClearButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
  },
  kitClearButtonText: {
    fontSize: 15,
    fontWeight: '500',
  },
  shareModalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  shareModal: {
    width: '90%',
    maxWidth: 400,
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
  },
  shareModalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  shareModalContent: {
    marginBottom: 20,
  },
  shareModalLabel: {
    fontSize: 13,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  shareModalLinkBox: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 16,
  },
  shareModalLink: {
    fontSize: 13,
  },
  shareModalButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  shareModalCopyButton: {
    flex: 1,
    backgroundColor: '#22c55e',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  shareModalCopyButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  shareModalTwitterButton: {
    flex: 1,
    backgroundColor: '#1da1f2',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  shareModalTwitterButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  shareModalClose: {
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  shareModalCloseText: {
    fontSize: 15,
    fontWeight: '500',
  },
  // BPM Page Styles (Issue #342)
  bpmPageHeader: {
    paddingTop: 20,
    paddingBottom: 10,
  },
  bpmTitleSection: {
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  bpmPageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bpmPageSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 8,
    maxWidth: 400,
  },
  bpmTapSection: {
    padding: 30,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 30,
  },
  bpmTapButton: {
    width: 160,
    height: 160,
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  bpmTapEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  bpmTapText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  bpmTapHint: {
    fontSize: 12,
  },
  bpmResultValue: {
    fontSize: 72,
    fontWeight: 'bold',
  },
  bpmResultUnit: {
    fontSize: 18,
    marginLeft: 4,
  },
  bpmResultBadge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 8,
  },
  bpmResultBadgeText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  bpmTapCount: {
    fontSize: 14,
    marginTop: 12,
  },
  bpmResetButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 16,
  },
  bpmResetButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  bpmShareButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    marginLeft: 8,
  },
  bpmShareButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  bpmMatchingSection: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    marginHorizontal: 20,
    marginBottom: 30,
  },
  bpmMatchingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  bpmSongCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  bpmSongName: {
    fontSize: 16,
    fontWeight: '600',
  },
  bpmSongBand: {
    fontSize: 14,
    marginTop: 2,
  },
  bpmSongBpm: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 12,
  },
  bpmSongBpmText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  bpmSongsList: {
    paddingHorizontal: 20,
  },
  bpmSongItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 10,
  },
  bpmBadge: {
    backgroundColor: '#dc2626',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    minWidth: 50,
    alignItems: 'center',
  },
  bpmBadgeText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  bpmRangeButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  // ==========================================
  // NEWS SECTION STYLES (Issue #513 - Phase 5)
  // ==========================================
  newsSection: {
    marginTop: 24,
    marginBottom: 16,
  },
  newsSectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
  },
  newsSectionDescription: {
    fontSize: 14,
    marginBottom: 12,
    opacity: 0.8,
  },
  newsCard: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 8,
    alignItems: 'center',
  },
  newsCardImage: {
    width: 60,
    height: 60,
    borderRadius: 6,
    marginRight: 12,
  },
  newsCardContent: {
    flex: 1,
  },
  newsCardTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  newsCardSnippet: {
    fontSize: 12,
    marginBottom: 4,
    lineHeight: 16,
  },
  newsCardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  newsCardSource: {
    fontSize: 11,
    fontWeight: '600',
    marginRight: 8,
  },
  newsCardTime: {
    fontSize: 11,
  },
  newsCardArrow: {
    fontSize: 16,
    marginLeft: 8,
  },
  
  // ==========================================
  // REUSABLE UTILITY STYLES (Issue #521)
  // Common patterns extracted from inline styles
  // ==========================================
  
  // Flex Row Patterns
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexRowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flexRowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  flexCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  flex1: {
    flex: 1,
  },
  
  // Text Styles using typography tokens
  textPageTitle: {
    ...textStyles.pageTitle,
  },
  textSectionTitle: {
    ...textStyles.sectionTitle,
  },
  textCardTitle: {
    ...textStyles.cardTitle,
  },
  textBody: {
    ...textStyles.body,
  },
  textSecondary: {
    ...textStyles.secondary,
  },
  textCaption: {
    ...textStyles.caption,
  },
  textLabel: {
    ...textStyles.label,
  },
  textBold: {
    fontWeight: fontWeight.bold,
  },
  textSemibold: {
    fontWeight: fontWeight.semibold,
  },
  textCenter: {
    textAlign: 'center',
  },
  textItalic: {
    fontStyle: 'italic',
  },
  textUppercase: {
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  
  // Spacing Utility Classes
  mb1: { marginBottom: spacing[1] },
  mb2: { marginBottom: spacing[2] },
  mb3: { marginBottom: spacing[3] },
  mb4: { marginBottom: spacing[4] },
  mb5: { marginBottom: spacing[5] },
  mb6: { marginBottom: spacing[6] },
  mb8: { marginBottom: spacing[8] },
  mt1: { marginTop: spacing[1] },
  mt2: { marginTop: spacing[2] },
  mt3: { marginTop: spacing[3] },
  mt4: { marginTop: spacing[4] },
  mt5: { marginTop: spacing[5] },
  mt6: { marginTop: spacing[6] },
  mt8: { marginTop: spacing[8] },
  mr2: { marginRight: spacing[2] },
  mr3: { marginRight: spacing[3] },
  mr4: { marginRight: spacing[4] },
  ml2: { marginLeft: spacing[2] },
  p4: { padding: spacing[4] },
  p5: { padding: spacing[5] },
  px4: { paddingHorizontal: spacing[4] },
  px5: { paddingHorizontal: spacing[5] },
  py3: { paddingVertical: spacing[3] },
  py4: { paddingVertical: spacing[4] },
  gap2: { gap: spacing[2] },
  gap3: { gap: spacing[3] },
  gap4: { gap: spacing[4] },
  
  // Height spacers
  spacerSm: { height: spacing[5] },
  spacerMd: { height: spacing[8] },
  spacerLg: { height: spacing[10] },
  
  // Loading State
  loadingContainer: {
    alignItems: 'center',
    padding: spacing[10],
  },
  loadingEmoji: {
    fontSize: fontSize['2xl'],
    marginBottom: spacing[3],
  },
  
  // Arrow icon
  arrowIcon: {
    fontSize: fontSize.lg,
  },
  
  // Brand filters section
  brandFilterTag: {
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    borderRadius: spacing[5],
    borderWidth: 1,
  },
  brandFilterTagText: {
    fontSize: fontSize.xs,
  },
  
  // Genre page styles
  genreIcon: {
    fontSize: fontSize.display.sm,
  },
  genreDrummerCard: {
    borderRadius: spacing[3],
    padding: spacing[4],
    borderWidth: 1,
  },
  genreDrummerName: {
    fontWeight: fontWeight.semibold,
    fontSize: fontSize.base,
  },
  genreDrummerBand: {
    fontSize: fontSize.sm,
  },
  genreDrummerArrow: {
    fontSize: fontSize.lg,
  },
  genreRelatedTag: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    borderRadius: spacing[2],
    borderWidth: 1,
  },
  genreRelatedTagText: {
    fontWeight: fontWeight.semibold,
  },
  genreSeoCtaText: {
    fontWeight: fontWeight.bold,
    fontSize: fontSize.base,
  },
  
  // CTA button
  ctaButton: {
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[6],
    borderRadius: spacing[2],
    alignItems: 'center',
  },
  
  // Budget range
  budgetRangeMaxWidth: {
    maxWidth: 600,
  },
  
  // Comparisons index page
  comparisonsIndexSection: {
    marginBottom: spacing[8],
  },
  comparisonsIndexSectionTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    marginBottom: spacing[4],
  },
  comparisonsIndexGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[4],
  },
  comparisonsIndexCard: {
    borderRadius: spacing[3],
    padding: spacing[4],
    borderWidth: 1,
    width: '48%',
    maxWidth: 400,
  },
  comparisonsIndexCardMobile: {
    width: '100%',
  },
  comparisonsIndexCardName: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
  },
  comparisonsIndexCardVs: {
    fontSize: fontSize.base,
  },
  comparisonsIndexCardDesc: {
    fontSize: fontSize.sm,
  },
  comparisonsIndexCardLink: {
    fontWeight: fontWeight.semibold,
    fontSize: fontSize.sm,
  },
  // ==========================================
  // MIGRATED INLINE STYLES (Issue #521)
  // Static styles converted from style={{}} to StyleSheet
  // ==========================================
  inlineStyle1: { borderRadius: 8 },
  textDecor1: { textDecoration: 'none' },
  inlineStyle2: { height: 40 },
  displayMode1: { display: 'contents' },
  rowLayout1: { flexDirection: 'row' },
  marginSpacing1: { textDecoration: 'none', display: 'inline-block', marginTop: 12 },
  marginSpacing2: { marginTop: 12 },
  centeredLayout1: { padding: 20, alignItems: 'center' },
  rowLayout2: { marginTop: 20, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 10 },
  flexOne1: { flex: 1 },
  paddedBox1: { marginTop: 30, paddingHorizontal: 20 },
  rowLayout3: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 10 },
  centeredLayout2: { alignItems: 'center', padding: 40 },
  emojiText1: { fontSize: 32, marginBottom: 12 },
  marginSpacing3: { marginBottom: 24 },
  rowLayout4: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  rowLayout5: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  emojiText2: { fontSize: 40, marginRight: 12 },
  gappedLayout1: { gap: 12 },
  marginSpacing4: { marginTop: 24, marginBottom: 40 },
  emojiText3: { fontSize: 28, marginRight: 10 },
  rowLayout6: { marginTop: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  marginSpacing5: { marginBottom: 32 },
  rowLayout7: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  rowLayout8: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  rowLayout9: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  centeredLayout3: { alignItems: 'center', marginBottom: 24 },
  marginSpacing6: { color: '#fbbf24', fontSize: 16, marginRight: 8 },
  flexOne2: { flex: 1, fontWeight: '600', color: '#3b82f6', fontSize: 14, textAlign: 'center' },
  marginSpacing7: { marginBottom: 16 },
  centeredLayout4: { alignItems: 'center', marginBottom: 32 },
  emojiText4: { fontSize: 48, marginBottom: 12 },
  gappedLayout2: { gap: 20 },
  centeredLayout5: { flex: 1, alignItems: 'center' },
  inlineStyle3: { fontSize: 24 },
  emojiText5: { fontSize: 48 },
  rowLayout10: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  rowLayout11: { flexDirection: 'row', height: 24, borderRadius: 12, overflow: 'hidden', marginBottom: 8 },
  rowLayout12: { flexDirection: 'row', justifyContent: 'space-between' },
  rowLayout13: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  rowLayout14: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 },
  emojiText6: { fontSize: 48, marginBottom: 16 },
  rowLayout15: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, flexWrap: 'wrap', gap: 12 },
  rowLayout16: { flexDirection: 'row', alignItems: 'center', gap: 12, flexWrap: 'wrap' },
  rowLayout17: { flexDirection: 'row', marginBottom: 12 },
  rowLayout18: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  rowLayout19: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  paddedBox2: { marginBottom: 8, paddingLeft: 12 },
  inlineStyle4: { fontWeight: '600' },
  inlineStyle5: { fontSize: 20 },
  centeredLayout6: { alignItems: 'center', marginTop: 24, marginBottom: 40 },
  gappedLayout3: { gap: 16 },
  gappedLayout4: { padding: 16, gap: 8 },
  rowLayout20: { flexDirection: 'row', gap: 8, marginTop: 8 },
  marginSpacing8: { marginVertical: 16 },
  rowLayout21: { display: 'flex', flexDirection: 'row', gap: 8, marginTop: 12, flexWrap: 'wrap', },
  displayMode2: { display: 'none' },
  textDecor2: { color: '#f59e0b', textDecoration: 'underline' },

});
