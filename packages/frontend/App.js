import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity, ScrollView, Linking, Platform, useWindowDimensions, TextInput } from 'react-native';
import { Image } from 'expo-image';
import { ThemeProvider, useTheme } from './ThemeContext';
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
  supportsWebP 
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

// ==========================================
// TOP 10 LISTS - Loaded dynamically for code splitting
// ==========================================
// Data moved to ./data/top10Lists.js for code splitting
// Use loadTop10Lists() to access

// State holders for lazy-loaded data
let _top10ListsModule = null;
let _quizDataModule = null;

// Dynamic import functions for lazy loading
const loadTop10Lists = () => import('./data/top10Lists');
const loadQuizData = () => import('./data/quizData');

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
  if (Platform.OS !== 'web' || typeof window === 'undefined') return { search: '', genre: '', brand: '', era: '' };
  const params = new URLSearchParams(window.location.search);
  return {
    search: params.get('search') || '',
    genre: params.get('genre') || '',
    brand: params.get('brand') || '',
    era: params.get('era') || '',
  };
}

function updateFiltersURL(filters) {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return;
  const params = new URLSearchParams();
  if (filters.search) params.set('search', filters.search);
  if (filters.genre) params.set('genre', filters.genre);
  if (filters.brand) params.set('brand', filters.brand);
  if (filters.era) params.set('era', filters.era);
  const queryString = params.toString();
  const newPath = queryString ? `/drummers?${queryString}` : '/';
  window.history.pushState({}, '', newPath);
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

// YouTube Video Embed Component - Works with React Native Web
function YouTubeEmbed({ videoId, title, theme }) {
  const { width } = useWindowDimensions();
  // Calculate responsive video dimensions (16:9 aspect ratio)
  const maxWidth = Math.min(width - 72, 560); // Account for padding
  const videoWidth = maxWidth;
  const videoHeight = Math.round(videoWidth * 9 / 16);

  if (Platform.OS === 'web') {
    return (
      <View style={[styles.videoContainer, { width: videoWidth, height: videoHeight }]}>
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ borderRadius: 8 }}
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

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const PLACEHOLDER_IMAGE = 'https://ui-avatars.com/api/?name=Drummer&background=1a1a2e&color=fff&size=200';

// Genre color mapping for consistent UI
const GENRE_COLORS = {
  'Thrash Metal': { bg: '#dc2626', text: '#ffffff' },
  'Death Metal': { bg: '#7f1d1d', text: '#ffffff' },
  'Black Metal': { bg: '#1f2937', text: '#ffffff' },
  'Progressive Metal': { bg: '#7c3aed', text: '#ffffff' },
  'Nu-Metal': { bg: '#ea580c', text: '#ffffff' },
  'Groove Metal': { bg: '#65a30d', text: '#ffffff' },
  'Power Metal': { bg: '#0284c7', text: '#ffffff' },
  'Metalcore/Djent': { bg: '#0891b2', text: '#ffffff' },
};

const getGenreColors = (genre) => {
  return GENRE_COLORS[genre] || { bg: '#6b7280', text: '#ffffff' };
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
function FilterBar({ filters, onFilterChange, totalCount, filteredCount, onClearAll, theme }) {
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

  // Placeholder styles
  const placeholderStyle = {
    width: flatStyle.width || width,
    height: flatStyle.height || height,
    backgroundColor: '#2a2a2a',
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
        <picture style={{ display: 'contents' }}>
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
  const optimizedUri = useMemo(() => {
    const uri = source?.uri;
    if (!uri) return PLACEHOLDER_IMAGE;
    if (uri.startsWith('/images/') || uri.startsWith('/api/image')) return uri;
    const targetWidth = width || 256;
    return getOptimizedImageUrl(uri, { width: targetWidth });
  }, [source?.uri, width]);
  
  const [imageUri, setImageUri] = useState(optimizedUri);

  // Generate srcset for responsive images (Issue #251)
  const srcSet = useMemo(() => {
    const uri = source?.uri;
    if (!uri || uri.startsWith('/images/') || hasError) return '';
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

  // On web, use native img tag with srcset for SEO (Issue #251)
  // Use WebP srcset when browser supports it (Issue #291)
  if (Platform.OS === 'web' && srcSet && !hasError) {
    const flatStyle = StyleSheet.flatten(imageStyle) || {};
    const lazyProps = getLazyLoadingProps(priority);
    
    // Use picture element for WebP with fallback (Issue #291)
    if (hasWebPSupport && webpSrcSet) {
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
    
    return (
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
    );
  }

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
    // Enhanced structured data with Person + Product pricing for drummer pages
    schema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Person",
          "name": drummer.name,
          "description": drummer.bio,
          "image": drummer.image,
          "jobTitle": "Drummer",
          "memberOf": {
            "@type": "MusicGroup",
            "name": drummer.band
          },
          ...(drummer.sameAs && drummer.sameAs.length > 0 && { "sameAs": drummer.sameAs })
        },
        {
          "@type": "Product",
          "name": `${drummer.name}'s Complete Drum Kit`,
          "description": `Professional drum setup used by ${drummer.name} of ${drummer.band}`,
          "image": drummer.image,
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
        }
      ]
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
  useEffect(() => {
    updateDocumentMeta(drummer, drummers, filters);
  }, [drummer, drummers, filters]);
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

  return (
    <View style={styles.gearSection} nativeID={`speakable-gear-${gearType}`}>
      <Text style={[styles.gearTitle, { color: theme.text }]}>{title}</Text>
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
          <View style={[styles.timelineBadge, { backgroundColor: theme.accent || '#dc2626' }]}>
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
                      backgroundColor: selectedEra?.era === era.era ? (theme.accent || '#dc2626') : theme.background,
                      borderColor: selectedEra?.era === era.era ? (theme.accent || '#dc2626') : theme.border
                    }
                  ]}
                  accessibilityRole="button"
                  accessibilityLabel={`${era.era}: ${era.years}. ${era.description}`}
                  accessibilityState={{ selected: selectedEra?.era === era.era }}
                >
                  <Text style={[
                    styles.timelineEraYears,
                    { color: selectedEra?.era === era.era ? '#fff' : theme.secondaryText }
                  ]}>
                    {era.years}
                  </Text>
                  <Text style={[
                    styles.timelineEraName,
                    { color: selectedEra?.era === era.era ? '#fff' : theme.text }
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
      onSelectDrummer(targetDrummer.id);
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

function DrummerDetail({ drummer, theme, onBack, onSelectGear, onCompareYourKit, allDrummers = [] }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

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
      </View>

      <QuotesSection quotes={drummer.quotes} drummerName={drummer.name} theme={theme} />

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
      <View style={[styles.section, styles.compareYourKitCTA, { backgroundColor: theme.card, borderColor: '#dc2626' }]}>
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
          <Text style={[styles.sectionTitle, { color: theme.text }]} accessibilityRole="header">Endorsements</Text>
          <View style={styles.endorsements}>
            {drummer.endorsements.map((endorsement, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleEndorsementPress(endorsement.url)}
                style={[styles.endorsementLink, { borderColor: theme.border }]}
                accessibilityRole="link"
                accessibilityLabel={`Visit ${endorsement.name} website`}
              >
                <Text style={[styles.endorsementText, { color: theme.text }]}>{endorsement.name}</Text>
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
          onSelectDrummer={(id) => {
            // Navigate to the selected drummer's profile
            if (Platform.OS === 'web' && typeof window !== 'undefined') {
              const targetDrummer = allDrummers.find(d => d.id === id);
              if (targetDrummer) {
                window.history.pushState({}, '', `/drummer/${toSlug(targetDrummer.name)}`);
                window.dispatchEvent(new PopStateEvent('popstate'));
              }
            }
          }}
        />
      )}
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
          style={[styles.shareButton, { backgroundColor: '#1DA1F2' }]}
          accessibilityLabel="Share on Twitter"
        >
          <Text style={styles.shareButtonText}>Twitter</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleFacebookShare}
          style={[styles.shareButton, { backgroundColor: '#4267B2' }]}
          accessibilityLabel="Share on Facebook"
        >
          <Text style={styles.shareButtonText}>Facebook</Text>
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
  
  // Match percentage color
  const getMatchColor = (percentage) => {
    if (percentage >= 80) return '#22c55e'; // green
    if (percentage >= 60) return '#eab308'; // yellow
    if (percentage >= 40) return '#f97316'; // orange
    return '#ef4444'; // red
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
              { backgroundColor: hasUserGear ? '#dc2626' : theme.border }
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
                      { backgroundColor: match.matchType === 'exact' ? '#22c55e20' : '#eab30820' }
                    ]}>
                      <Text style={[
                        styles.kitMatchBadgeText,
                        { color: match.matchType === 'exact' ? '#22c55e' : '#eab308' }
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
                        <Text style={[styles.kitUpgradeValue, { color: '#dc2626' }]}>{upgrade.drummerGear}</Text>
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
                  style={[styles.kitShareButton, { backgroundColor: '#000000' }]}
                >
                  <Text style={styles.kitShareButtonText}>𝕏 Tweet</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleShare}
                  style={[styles.kitShareButton, { backgroundColor: '#dc2626' }]}
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

// Drummer Spotlight Component - Featured drummer on homepage
function DrummerSpotlight({ drummer, theme, onSelectDrummer, onViewAllSpotlights }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  if (!drummer || !drummer.spotlight) return null;

  const { spotlight } = drummer;

  return (
    <View style={[styles.spotlightContainer, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <View style={styles.spotlightHeader}>
        <Text style={[styles.spotlightLabel, { color: '#f59e0b' }]}>⭐ DRUMMER SPOTLIGHT</Text>
        <Text style={[styles.spotlightWeek, { color: theme.secondaryText }]}>This Week</Text>
      </View>
      
      <View style={[styles.spotlightContent, isMobile && styles.spotlightContentMobile]}>
        <TouchableOpacity 
          onPress={() => onSelectDrummer(drummer.id)}
          style={styles.spotlightImageContainer}
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
              style={[styles.spotlightCTAPrimary, { backgroundColor: '#dc2626' }]}
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
                height={180}
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
                <Text style={[styles.budgetTierButtonLabel, { color: isSelected ? '#fff' : theme.text }]}>
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

function DrummerList({
  theme,
  onSelectDrummer,
  drummers,
  loading,
  error,
  onNavigateToCompare,
  onNavigateToQuiz,
  onNavigateToSpotlights,
  onNavigateToQuotes,
  onNavigateToGearByBudget,
  onNavigateToList,
  onNavigateToGearFinder,
  spotlight,
  filters,
  onFilterChange,
  filteredDrummers,
  searchValue,
  onSearchChange,
  onSearchClear,
  suggestions,
  showSuggestions,
  onSearchFocus,
  onSelectSuggestion,
  searchInputRef
}) {
  // CLS Optimization: Show skeleton loaders instead of spinner
  // Skeletons match the final layout dimensions to prevent layout shift
  if (loading) {
    return (
      <ScrollView 
        style={styles.listContainer}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Search bar skeleton - matches SearchBar dimensions */}
        <SearchBarSkeleton />
        {/* Filter bar skeleton - matches FilterBar dimensions */}
        <FilterBarSkeleton />
        {/* Hero/Spotlight section skeleton */}
        <HeroSectionSkeleton />
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
      <View style={styles.searchFilterContainer}>
        <SearchBar
          value={searchValue}
          onChange={onSearchChange}
          onFocus={onSearchFocus}
          onClear={onSearchClear}
          suggestions={suggestions}
          onSelectSuggestion={onSelectSuggestion}
          showSuggestions={showSuggestions}
          theme={theme}
          inputRef={searchInputRef}
        />
        <FilterBar
          filters={filters}
          onFilterChange={onFilterChange}
          totalCount={drummers.length}
          filteredCount={filteredDrummers.length}
          onClearAll={handleClearAllFilters}
          theme={theme}
        />
      </View>
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
          style={[styles.quizButton, { backgroundColor: '#dc2626', borderColor: '#dc2626' }]}
          accessibilityRole="button"
          accessibilityLabel="Take the drummer personality quiz"
        >
          <Text style={[styles.quizButtonText, { color: '#ffffff' }]}>🥁 Find Your Match</Text>
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
          style={[styles.quizButton, { backgroundColor: '#8b5cf6', borderColor: '#8b5cf6' }]}
          accessibilityRole="button"
          accessibilityLabel="Search drummers by gear"
        >
          <Text style={[styles.quizButtonText, { color: '#ffffff' }]}>🔍 Gear Finder</Text>
        </TouchableOpacity>
      </View>
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
    </>
  );

  // Empty list message
  const ListEmpty = () => (
    <View style={styles.noResultsContainer}>
      <Text style={[styles.noResultsText, { color: theme.secondaryText }]}>
        No drummers found matching your criteria
      </Text>
      <TouchableOpacity onPress={handleClearAllFilters} style={[styles.clearFiltersButtonLarge, { borderColor: theme.text }]}>
        <Text style={[styles.clearFiltersButtonText, { color: theme.text }]}>Clear All Filters</Text>
      </TouchableOpacity>
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
      contentContainerStyle={styles.listContainer}
    />
  );
}

// Check if we're on the compare page based on URL
function isComparePage() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return false;
  return window.location.pathname === '/compare' || window.location.pathname.startsWith('/compare?');
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
  const match = window.location.pathname.match(/^\/gear\/([a-z0-9-]+)$/);
  return match ? match[1] : null;
}

// Check if we're on a drummer profile page based on URL
function getDrummerSlugFromURL() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return null;
  const match = window.location.pathname.match(/^\/drummer\/([a-z0-9-]+)$/i);
  return match ? match[1] : null;
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
                  height={100}
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
              style={[styles.viewProfileButton, { backgroundColor: '#dc2626' }]}
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
                style={[styles.shareButton, { backgroundColor: '#1DA1F2' }]}
              >
                <Text style={styles.shareButtonText}>𝕏 Twitter</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleShare('facebook')}
                style={[styles.shareButton, { backgroundColor: '#4267B2' }]}
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
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 8,
                  marginTop: 12,
                  flexWrap: 'wrap',
                }}
              >
                {/* FormSubmit.co hidden fields */}
                <input type="hidden" name="_subject" value="MetalForge Newsletter Signup (Quiz)" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_next" value="https://metalforge.io/quiz?subscribed=true" />
                {/* Honeypot spam protection */}
                <input type="text" name="_honey" style={{ display: 'none' }} />
                
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
                    border: '2px solid #555',
                    backgroundColor: '#2a2a2a',
                    color: '#ffffff',
                    outline: 'none',
                  }}
                />
                <button
                  type="submit"
                  style={{
                    backgroundColor: '#dc2626',
                    padding: '12px 20px',
                    borderRadius: 8,
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 14,
                    fontWeight: 600,
                    color: '#ffffff',
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
              style={[styles.progressFill, { width: `${progress}%`, backgroundColor: '#dc2626' }]} 
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
                    backgroundColor: isSelected ? '#dc262620' : theme.card,
                    borderColor: isSelected ? '#dc2626' : theme.border,
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
        return { text: '✓ Perfect Match!', color: '#22c55e' };
      case 'brand':
        return { text: '⚡ Brand Match', color: '#f59e0b' };
      case 'missing':
        return { text: '➕ Add Gear', color: '#6b7280' };
      case 'different':
        return { text: '↑ Upgrade Path', color: '#dc2626' };
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
          <Text style={[styles.matchesSectionTitle, { color: '#22c55e' }]}>
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
          <Text style={[styles.differencesSectionTitle, { color: '#dc2626' }]}>
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
                <Text style={[styles.drummerGearValue, { color: '#dc2626' }]}>
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
                style={[styles.shareButton, { backgroundColor: '#000000' }]}
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
            style={[styles.viewProfileButton, { backgroundColor: '#dc2626' }]}
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
                    border: `2px solid ${error ? '#ef4444' : '#555'}`,
                    backgroundColor: '#2a2a2a',
                    color: '#ffffff',
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
                    backgroundColor: isLoading ? '#a3a3a3' : '#f59e0b',
                    padding: '12px 24px',
                    borderRadius: 8,
                    border: 'none',
                    height: 48,
                    minWidth: 120,
                    width: isMobile ? '100%' : 'auto',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    fontSize: 16,
                    fontWeight: 600,
                    color: '#000000',
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
                    style={{ color: '#f59e0b', textDecoration: 'underline' }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Privacy Policy
                  </a>.
                </span>
              </label>
              
              {/* Error Message */}
              {error && (
                <Text style={{ color: '#ef4444', fontSize: 13, marginTop: -4 }}>
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
  const { theme } = useTheme();
  const [selectedDrummerId, setSelectedDrummerId] = useState(null);
  const [selectedDrummer, setSelectedDrummer] = useState(null);
  // Initialize loadingDetail to true if URL has a drummer slug (for deep linking support)
  const [loadingDetail, setLoadingDetail] = useState(() => getDrummerSlugFromURL() !== null);
  const [drummers, setDrummers] = useState([]);
  const [loadingDrummers, setLoadingDrummers] = useState(true);
  const [drummersError, setDrummersError] = useState(null);
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

  // Search and filter state
  const [filters, setFilters] = useState(() => getFiltersFromURL());
  const [searchValue, setSearchValue] = useState(() => getFiltersFromURL().search || '');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchInputRef = useRef(null);

  // INP Optimization: Debounce the filter state update to prevent jank during typing
  // The search input value updates immediately, but filter computation is debounced
  const debouncedSearchValue = useDebounce(searchValue, 150);

  // Filter drummers based on search and filters
  // INP Optimization: Use debounced search value to prevent expensive filtering on every keystroke
  const filteredDrummers = useMemo(() => {
    let results = drummers;

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

    return results;
  }, [drummers, debouncedSearchValue, filters]);

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
    }
  }, []);

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
        const { drummers: drummersData } = await response.json();
        // Optimize images for all drummers to reduce bandwidth
        const optimizedData = drummersData.map(drummer => optimizeDrummerImages(drummer));
        setDrummers(optimizedData);
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

      if (gearSlug) {
        // Load gear page
        setLoadingGear(true);
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
      } else {
        // Back to home page
        setShowCompare(false);
        setShowQuiz(false);
        setShowPrivacy(false);
        setShowQuotes(false);
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

  const handleSelectDrummer = async (id, skipUrlUpdate = false) => {
    console.log('[DEBUG] handleSelectDrummer called with id:', id);
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
    setSelectedGear(null);
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
    setSelectedDrummer(null);
    setSelectedDrummerId(null);
    setSelectedGear(null);
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.history.pushState({}, '', '/quotes');
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
    setSelectedDrummer(null);
    setSelectedDrummerId(null);
    setSelectedGear(null);
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.history.pushState({}, '', '/gear-finder');
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
    if (selectedDrummer) {
      console.log('[DEBUG] Rendering DrummerDetail for:', selectedDrummer.name);
      return <DrummerDetail drummer={selectedDrummer} theme={theme} onBack={handleBack} onSelectGear={handleSelectGear} onCompareYourKit={handleCompareYourKit} allDrummers={drummers} />;
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
          onNavigateToQuotes={handleNavigateToQuotes}
          onNavigateToSpotlights={handleNavigateToSpotlights}
          onNavigateToGearByBudget={handleNavigateToGearByBudget}
          onNavigateToList={handleNavigateToList}
          onNavigateToGearFinder={handleNavigateToGearFinder}
          spotlight={getCurrentSpotlightDrummer(drummers)}
          filters={filters}
          onFilterChange={handleFilterChange}
          searchValue={searchValue}
          onSearchChange={handleSearchChange}
          onSearchClear={handleSearchClear}
          suggestions={suggestions}
          showSuggestions={showSuggestions}
          onSearchFocus={() => setShowSuggestions(true)}
          onSelectSuggestion={handleSelectSuggestion}
          searchInputRef={searchInputRef}
        />
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {!selectedDrummer && !showCompare && !showQuiz && !showPrivacy && !showQuotes && !selectedGear && <SEOHead drummers={drummers} filters={filters} />}
      <View style={styles.header} accessibilityRole="banner">
        <Text style={[styles.title, { color: theme.text }]} accessibilityRole="header">
          Metal Drummer Gear
        </Text>
      </View>
      {renderContent()}
      <NewsletterFooter theme={theme} />
      <StatusBar style="light" />
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
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  mainContent: {
    flex: 1,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  card: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
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
    marginRight: 16,
  },
  cardText: {
    flex: 1,
  },
  drummerName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  drummerBand: {
    fontSize: 16,
    marginBottom: 2,
  },
  drummerGenre: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  errorText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorHint: {
    marginTop: 8,
    fontSize: 14,
    textAlign: 'center',
  },
  detailContainer: {
    flex: 1,
  },
  detailContent: {
    padding: 20,
  },
  backButton: {
    paddingVertical: 12, // Increased for WCAG AA touch target (was 10)
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    alignSelf: 'flex-start',
    marginBottom: 20,
    minHeight: 48, // WCAG AA touch target minimum
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  detailHeader: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  detailImage: {
    width: 120,
    height: 120,
    borderRadius: 12,
    marginRight: 20,
  },
  detailHeaderText: {
    flex: 1,
    justifyContent: 'center',
  },
  detailName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  detailBand: {
    fontSize: 18,
    marginBottom: 4,
  },
  detailMeta: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  section: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  bioText: {
    fontSize: 16,
    lineHeight: 24,
  },
  // Notable Quotes styles
  quotesSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  quotesExpandIcon: {
    fontSize: 14,
    fontWeight: '600',
  },
  quotesContainer: {
    marginTop: 16,
  },
  quoteCard: {
    marginBottom: 16,
    paddingLeft: 16,
    borderLeftWidth: 3,
    borderLeftColor: '#dc2626',
  },
  quoteText: {
    fontSize: 16,
    lineHeight: 24,
    fontStyle: 'italic',
    marginBottom: 8,
  },
  quoteSource: {
    fontSize: 13,
    fontWeight: '500',
  },
  // Gear Timeline styles
  timelineSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  timelineTitleContainer: {
    flex: 1,
  },
  timelineSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  timelineExpandIcon: {
    fontSize: 14,
    fontWeight: '600',
  },
  timelineContainer: {
    marginTop: 16,
  },
  timelineScrollView: {
    marginHorizontal: -20,
    paddingHorizontal: 0,
  },
  timelineScroll: {
    paddingHorizontal: 20,
    paddingBottom: 8,
    gap: 12,
  },
  timelineEraCard: {
    width: 260,
    padding: 16,
    borderRadius: 12,
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
    top: -12,
    left: 20,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  timelineMarkerText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
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
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
  },
  timelineYears: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  timelineDescription: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 12,
  },
  timelineAlbumBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  timelineAlbumCount: {
    fontSize: 12,
    fontWeight: '500',
  },
  timelineSelectedIndicator: {
    position: 'absolute',
    bottom: -20,
    left: '50%',
    transform: [{ translateX: -30 }],
  },
  timelineSelectedText: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '500',
  },
  timelineSwipeHint: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  timelineSwipeText: {
    fontSize: 12,
    fontStyle: 'italic',
  },
  timelineDetail: {
    marginTop: 24,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  timelineDetailHeader: {
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(128,128,128,0.2)',
  },
  timelineDetailTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  timelineDetailYears: {
    fontSize: 16,
    fontWeight: '600',
  },
  timelineDetailSection: {
    marginBottom: 16,
  },
  timelineDetailLabel: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  timelineAlbumsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  timelineAlbumChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  timelineAlbumName: {
    fontSize: 13,
    fontWeight: '500',
  },
  timelineGearGrid: {
    gap: 12,
  },
  timelineGearItem: {
    marginBottom: 4,
  },
  timelineGearLabel: {
    fontSize: 12,
    marginBottom: 2,
  },
  timelineGearValue: {
    fontSize: 14,
    lineHeight: 20,
  },
  timelineNotes: {
    fontSize: 14,
    lineHeight: 22,
    fontStyle: 'italic',
  },
  gearSection: {
    marginBottom: 12,
  },
  gearTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  gearContent: {
    fontSize: 14,
    lineHeight: 20,
  },
  shopLinksContainer: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 8,
  },
  shopButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
  },
  shopButtonUS: {
    backgroundColor: '#1a5276',
  },
  shopButtonEU: {
    backgroundColor: '#1e8449',
  },
  shopButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  gallery: {
    flexDirection: 'row',
  },
  galleryImage: {
    width: 200,
    height: 150,
    borderRadius: 8,
    marginRight: 12,
  },
  // Gear Timeline styles
  timelineSection: {
    overflow: 'hidden',
  },
  timelineHeader: {
    paddingBottom: 8,
  },
  timelineTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 4,
  },
  timelineBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  timelineBadgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
  timelineSubtitle: {
    fontSize: 14,
    marginBottom: 8,
  },
  timelineContent: {
    marginTop: 16,
  },
  timelineScroll: {
    marginBottom: 8,
  },
  timelineScrollContent: {
    paddingRight: 16,
    paddingVertical: 8,
  },
  timelineEraWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timelineEraCard: {
    width: 140,
    padding: 12,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
  },
  timelineEraCardSelected: {
    transform: [{ scale: 1.02 }],
  },
  timelineEraYears: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  timelineEraName: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  timelineEraAlbums: {
    fontSize: 11,
    marginTop: 4,
  },
  timelineConnector: {
    width: 24,
    height: 2,
    marginHorizontal: 4,
  },
  timelineSwipeHint: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 16,
    fontStyle: 'italic',
  },
  timelineDetail: {
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  timelineDetailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    flexWrap: 'wrap',
    gap: 8,
  },
  timelineDetailTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  timelineDetailYears: {
    fontSize: 14,
    fontWeight: '600',
  },
  timelineDetailDescription: {
    fontSize: 14,
    marginBottom: 12,
    lineHeight: 20,
  },
  timelineDetailLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  timelineAlbumsSection: {
    marginBottom: 16,
  },
  timelineAlbumsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  timelineAlbumTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    borderWidth: 1,
  },
  timelineAlbumText: {
    fontSize: 12,
  },
  timelineGearSection: {
    marginBottom: 16,
  },
  timelineGearItem: {
    marginBottom: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  timelineGearLabel: {
    fontSize: 13,
    fontWeight: '500',
    marginRight: 4,
    minWidth: 80,
  },
  timelineGearValue: {
    fontSize: 13,
    flex: 1,
    flexWrap: 'wrap',
  },
  timelineNotes: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 8,
  },
  timelineNotesText: {
    fontSize: 13,
    lineHeight: 20,
    fontStyle: 'italic',
  },
  endorsements: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  endorsementLink: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
  },
  endorsementText: {
    fontSize: 14,
    fontWeight: '500',
  },
  videosContainer: {
    gap: 16,
  },
  videoCard: {
    marginBottom: 16,
  },
  videoContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 8,
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
    fontSize: 24,
    marginLeft: 4,
  },
  videoInfo: {
    paddingTop: 8,
  },
  videoTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  videoYear: {
    fontSize: 12,
  },
  videoLink: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoLinkText: {
    fontSize: 16,
    fontWeight: '600',
  },
  // Kit Cost Calculator styles
  calculatorSection: {
    borderWidth: 2,
  },
  calculatorTitle: {
    marginBottom: 4,
  },
  calculatorSubtitle: {
    fontSize: 14,
    marginBottom: 16,
  },
  calculatorItems: {
    gap: 8,
  },
  calculatorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  calculatorLabel: {
    fontSize: 15,
  },
  calculatorPrice: {
    fontSize: 15,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  calculatorDivider: {
    height: 1,
    marginVertical: 12,
  },
  calculatorTotals: {
    gap: 4,
    marginBottom: 8,
  },
  calculatorTotalLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  calculatorTotalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  calculatorDisclaimer: {
    fontSize: 11,
    fontStyle: 'italic',
    marginTop: 8,
    marginBottom: 16,
  },
  buySetupContainer: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
  buySetupButton: {
    flex: 1,
    minWidth: 140,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  buySetupButtonUS: {
    backgroundColor: '#1a5276',
  },
  buySetupButtonEU: {
    backgroundColor: '#1e8449',
  },
  buySetupButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  shareCostButton: {
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  shareCostButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
// Genre tag styles
  genreTagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 4,
  },
  genreTag: {
    borderRadius: 12,
  },
  genreTagSmall: {
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  genreTagLarge: {
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  genreTagText: {
    fontWeight: '600',
  },
  genreTagTextSmall: {
    fontSize: 10,
  },
  genreTagTextLarge: {
    fontSize: 12,
  },
  // Compare feature styles
  listWrapper: {
    flex: 1,
  },
  actionButtonsRow: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 16,
    gap: 12,
  },
  compareButton: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  compareButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  quizButton: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  quizButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  // Quiz Styles
  quizContainer: {
    flex: 1,
  },
  quizContent: {
    padding: 20,
    maxWidth: 600,
    alignSelf: 'center',
    width: '100%',
  },
  quizHeader: {
    marginBottom: 24,
    alignItems: 'center',
  },
  quizTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  quizSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  progressContainer: {
    marginBottom: 24,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    textAlign: 'center',
  },
  questionSection: {
    marginBottom: 24,
  },
  questionText: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
  },
  optionsContainer: {
    gap: 12,
  },
  optionCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
  },
  optionLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
  },
  prevButton: {
    marginTop: 24,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  prevButtonText: {
    fontSize: 14,
  },
  // Quiz Results Styles
  resultsHeader: {
    marginBottom: 24,
    alignItems: 'center',
  },
  resultsTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  topMatchCard: {
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: 24,
    position: 'relative',
  },
  matchPercentBadge: {
    position: 'absolute',
    top: -12,
    right: 16,
    backgroundColor: '#dc2626',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  matchPercentText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  topMatchImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    aspectRatio: 1, // Prevent CLS (Issue #248)
  },
  topMatchName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  topMatchBand: {
    fontSize: 18,
    marginBottom: 12,
    textAlign: 'center',
  },
  matchReasons: {
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
  },
  viewProfileButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  viewProfileButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
  shareSection: {
    marginBottom: 24,
    alignItems: 'center',
  },
  shareTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  shareButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  shareButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  shareButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
  runnerUpsSection: {
    marginBottom: 24,
  },
  runnerUpsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  runnerUpCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 8,
  },
  runnerUpImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
    aspectRatio: 1, // Prevent CLS (Issue #248)
  },
  runnerUpInfo: {
    flex: 1,
  },
  runnerUpName: {
    fontSize: 16,
    fontWeight: '600',
  },
  runnerUpBand: {
    fontSize: 14,
  },
  runnerUpPercent: {
    fontSize: 16,
    fontWeight: '600',
  },
  quizNewsletter: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 24,
    alignItems: 'center',
  },
  quizNewsletterTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  quizNewsletterSubtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
  },
  quizNewsletterForm: {
    flexDirection: 'row',
    gap: 8,
    width: '100%',
    maxWidth: 400,
  },
  quizNewsletterInput: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
  },
  quizNewsletterButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  quizNewsletterButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
  restartButton: {
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: 40,
  },
  restartButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  compareTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  compareSubtitle: {
    fontSize: 14,
    marginBottom: 20,
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
    fontSize: 14,
    fontWeight: '600',
  },
  removeSlot: {
    fontSize: 12,
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
    fontSize: 14,
    flex: 1,
  },
  selectorArrow: {
    fontSize: 10,
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
    fontSize: 14,
  },
  selectorList: {
    maxHeight: 200,
  },
  selectorOption: {
    padding: 12,
    borderBottomWidth: 1,
  },
  selectorOptionText: {
    fontSize: 14,
    fontWeight: '500',
  },
  selectorOptionSubtext: {
    fontSize: 12,
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
    fontSize: 16,
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
    fontSize: 16,
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
    fontSize: 14,
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
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  compareBand: {
    fontSize: 14,
    textAlign: 'center',
  },
  compareGenre: {
    fontSize: 12,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  comparisonHint: {
    fontSize: 12,
    marginBottom: 16,
    fontStyle: 'italic',
  },
  comparisonRow: {
    marginBottom: 16,
  },
  comparisonLabel: {
    fontSize: 14,
    fontWeight: '600',
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
    fontSize: 13,
    lineHeight: 18,
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
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  costPrice: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  costPriceUsd: {
    fontSize: 14,
    marginTop: 4,
  },
  emptyStateText: {
    fontSize: 14,
    textAlign: 'center',
    padding: 20,
  },
  shareContainer: {
    marginTop: 8,
  },
  shareTitle: {
    fontSize: 14,
    fontWeight: '600',
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
    fontSize: 13,
    fontWeight: '600',
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
    fontSize: 10,
    fontWeight: '600',
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
    fontSize: 16,
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
    fontSize: 13,
    fontWeight: '600',
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
    fontSize: 18,
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
    fontSize: 14,
    fontWeight: '500',
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
    fontSize: 14,
    color: '#ffffff',
  },
  profileShareText: {
    fontSize: 13,
    fontWeight: '500',
  },
  profileShareTextLight: {
    fontSize: 13,
    fontWeight: '500',
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
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  gearDetailName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  gearDetailBrand: {
    fontSize: 18,
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
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  specValue: {
    fontSize: 14,
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
    fontSize: 15,
  },
  gearPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  usedBySubtitle: {
    fontSize: 14,
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
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  usedByBand: {
    fontSize: 14,
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
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 4,
  },
  relatedGearPrice: {
    fontSize: 12,
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
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    height: '100%',
    outlineStyle: 'none',
  },
  searchClearButton: {
    padding: 4,
  },
  searchClearText: {
    fontSize: 14,
  },
  searchShortcut: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
  },
  searchShortcutText: {
    fontSize: 12,
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
    fontSize: 14,
    fontWeight: '500',
  },
  suggestionSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  suggestionType: {
    fontSize: 16,
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
    fontSize: 12,
    fontWeight: '600',
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
    fontSize: 12,
    fontWeight: '500',
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
    fontSize: 12,
    fontWeight: '500',
  },
  filterDropdownArrow: {
    fontSize: 8,
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
    fontSize: 13,
  },
  filterResultsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  filterResultCount: {
    fontSize: 13,
  },
  clearFiltersLink: {
    padding: 4,
  },
  clearFiltersLinkText: {
    fontSize: 12,
    fontWeight: '500',
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
    fontSize: 14,
    fontWeight: '500',
  },
  filterToggleArrow: {
    fontSize: 10,
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
    fontSize: 14,
    fontWeight: '500',
  },
  // No results styles
  noResultsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  noResultsText: {
    fontSize: 16,
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
    fontSize: 14,
    fontWeight: '600',
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  newsletterSubtitle: {
    fontSize: 14,
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
    fontSize: 16,
    height: 48,
    outlineStyle: 'none',
  },
  newsletterButton: {
    backgroundColor: '#f59e0b',
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
    fontSize: 16,
    fontWeight: '600',
  },
  newsletterSuccessContainer: {
    flex: 1,
    maxWidth: 400,
  },
  newsletterSuccess: {
    fontSize: 16,
    fontWeight: '500',
  },
  newsletterError: {
    fontSize: 14,
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
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  kitCompareSubtitle: {
    fontSize: 16,
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
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  kitCompareDrummerBand: {
    fontSize: 14,
  },
  kitFormHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  kitClearButton: {
    fontSize: 14,
    fontWeight: '500',
  },
  kitFormGrid: {
    gap: 16,
  },
  kitFormRow: {
    gap: 8,
  },
  kitFormLabel: {
    fontSize: 14,
    fontWeight: '600',
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
    fontSize: 16,
    fontWeight: '700',
  },
  kitMatchSection: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  kitMatchPercentageContainer: {
    alignItems: 'center',
  },
  kitMatchPercentage: {
    fontSize: 72,
    fontWeight: '900',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  kitMatchLabel: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 8,
  },
  kitMatchDescription: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 12,
    maxWidth: 300,
    lineHeight: 22,
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
    fontSize: 12,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  kitMatchGear: {
    fontSize: 15,
    fontWeight: '500',
  },
  kitMatchBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginLeft: 12,
  },
  kitMatchBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  kitUpgradeHint: {
    fontSize: 14,
    marginBottom: 16,
  },
  kitUpgradeRow: {
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  kitUpgradeCategory: {
    fontSize: 12,
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
    fontSize: 11,
    marginBottom: 4,
  },
  kitUpgradeValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  kitUpgradeArrow: {
    fontSize: 20,
  },
  kitShareHint: {
    fontSize: 14,
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
    fontSize: 14,
    fontWeight: '600',
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
    fontSize: 13,
    fontWeight: '500',
  },
  kitReferenceValue: {
    flex: 1,
    fontSize: 13,
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
    fontSize: 15,
    fontWeight: '600',
  },
  // Compare Your Kit CTA section on drummer profile
  compareYourKitCTA: {
    borderWidth: 2,
    alignItems: 'center',
    textAlign: 'center',
  },
  compareYourKitDescription: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 22,
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
    fontSize: 16,
    fontWeight: '700',
  },
  // ==========================================
  // DRUMMER SPOTLIGHT STYLES
  // ==========================================
  spotlightContainer: {
    marginBottom: 20,
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
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
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  spotlightWeek: {
    fontSize: 12,
    fontWeight: '500',
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
    aspectRatio: 1,
    borderRadius: 12,
    aspectRatio: 1, // Prevent CLS (Issue #248)
  },
  spotlightImageMobile: {
    width: 120,
    height: 120,
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
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
  },
  spotlightBand: {
    fontSize: 16,
    marginBottom: 16,
  },
  spotlightQuickFacts: {
    marginBottom: 16,
    width: '100%',
  },
  spotlightSectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  spotlightFactRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  spotlightFactBullet: {
    fontSize: 14,
    marginRight: 8,
    fontWeight: '700',
  },
  spotlightFactText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 19,
  },
  spotlightIconicSection: {
    marginBottom: 16,
    width: '100%',
  },
  spotlightIconicText: {
    fontSize: 14,
    lineHeight: 21,
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
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 19,
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
    fontSize: 14,
    fontWeight: '600',
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
    fontSize: 14,
    fontWeight: '500',
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
    backgroundColor: '#f59e0b',
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
});
