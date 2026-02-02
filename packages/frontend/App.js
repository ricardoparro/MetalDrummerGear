import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Switch, FlatList, ActivityIndicator, Image, TouchableOpacity, ScrollView, Linking, Platform, useWindowDimensions, TextInput } from 'react-native';
import { ThemeProvider, useTheme } from './ThemeContext';
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { getAffiliateLinks, extractPrimaryProduct, getThomannLink, getSweetwaterLink } from './affiliateLinks';
import { calculateKitCost, formatPrice } from './gearPrices';

// Filter options configuration
const FILTER_OPTIONS = {
  genres: [
    { value: 'thrash', label: 'Thrash Metal' },
    { value: 'death', label: 'Death Metal' },
    { value: 'black', label: 'Black Metal' },
    { value: 'progressive', label: 'Progressive' },
    { value: 'nu-metal', label: 'Nu-Metal' },
    { value: 'groove', label: 'Groove Metal' },
    { value: 'metalcore', label: 'Metalcore/Djent' },
    { value: 'hardcore', label: 'Hardcore' },
  ],
  brands: [
    { value: 'tama', label: 'Tama' },
    { value: 'pearl', label: 'Pearl' },
    { value: 'dw', label: 'DW' },
    { value: 'sonor', label: 'Sonor' },
    { value: 'mapex', label: 'Mapex' },
    { value: 'ddrum', label: 'ddrum' },
    { value: 'sjc', label: 'SJC' },
    { value: 'ocdp', label: 'OCDP' },
    { value: 'zildjian', label: 'Zildjian' },
    { value: 'sabian', label: 'Sabian' },
    { value: 'meinl', label: 'Meinl' },
    { value: 'paiste', label: 'Paiste' },
  ],
  eras: [
    { value: '80s', label: '80s' },
    { value: '90s', label: '90s' },
    { value: '2000s', label: '2000s' },
    { value: '2010s', label: '2010s' },
    { value: 'current', label: 'Current' },
  ],
};

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
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;

  return (
    <TouchableOpacity
      onPress={() => Linking.openURL(youtubeUrl)}
      style={[styles.videoContainer, { width: videoWidth, height: videoHeight }]}
      accessibilityRole="link"
      accessibilityLabel={`Play ${title} on YouTube`}
    >
      <Image
        source={{ uri: thumbnailUrl }}
        style={styles.videoThumbnail}
        resizeMode="cover"
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
                  <Image source={{ uri: suggestion.image }} style={styles.suggestionImage} />
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

function ImageWithFallback({ source, style, accessibilityLabel }) {
  const [hasError, setHasError] = useState(false);
  const [imageUri, setImageUri] = useState(source?.uri || PLACEHOLDER_IMAGE);

  useEffect(() => {
    setImageUri(source?.uri || PLACEHOLDER_IMAGE);
    setHasError(false);
  }, [source?.uri]);

  const handleError = useCallback(() => {
    if (!hasError) {
      setHasError(true);
      setImageUri(PLACEHOLDER_IMAGE);
    }
  }, [hasError]);

  return (
    <Image
      source={{ uri: imageUri }}
      style={style}
      accessibilityLabel={accessibilityLabel}
      onError={handleError}
      resizeMode="cover"
    />
  );
}

// Use relative URL for Vercel serverless, fallback to localhost for dev
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
  if (drummer) setMeta('og:image', drummer.image, true);
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
}

function SEOHead({ drummer, drummers = [], filters = {} }) {
  useEffect(() => {
    updateDocumentMeta(drummer, drummers, filters);
  }, [drummer, drummers, filters]);
  return null;
}

function DrummerCard({ drummer, theme, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}
      accessibilityRole="button"
      accessibilityLabel={`View ${drummer.name}'s gear details`}
    >
      <View style={styles.cardContent}>
        <TouchableOpacity onPress={onPress} accessibilityRole="image">
          <ImageWithFallback
            source={{ uri: drummer.image }}
            style={styles.cardImage}
            accessibilityLabel={`Photo of ${drummer.name}`}
          />
        </TouchableOpacity>
        <View style={styles.cardText}>
          <Text style={[styles.drummerName, { color: theme.text }]}>{drummer.name}</Text>
          <Text style={[styles.drummerBand, { color: theme.secondaryText }]}>{drummer.band}</Text>
          <GenreTags genres={drummer.genres} size="small" />
        </View>
      </View>
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
    <View style={styles.gearSection}>
      <Text style={[styles.gearTitle, { color: theme.text }]}>{title}</Text>
      <Text style={[styles.gearContent, { color: theme.secondaryText }]}>{content}</Text>
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

function DrummerDetail({ drummer, theme, onBack, onSelectGear }) {
  const handleEndorsementPress = (url) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.detailContainer} contentContainerStyle={styles.detailContent}>
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

      {drummer.photos && drummer.photos.length > 0 && (
        <View style={[styles.section, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]} accessibilityRole="header">Photo Gallery</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.gallery}>
            {drummer.photos.map((photo, index) => (
              <ImageWithFallback
                key={index}
                source={{ uri: photo }}
                style={styles.galleryImage}
                accessibilityLabel={`${drummer.name} photo ${index + 1}`}
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
    </ScrollView>
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

// Social share buttons
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

function DrummerList({
  theme,
  onSelectDrummer,
  drummers,
  loading,
  error,
  onNavigateToCompare,
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
  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={theme.text} />
        <Text style={[styles.loadingText, { color: theme.secondaryText }]}>Loading drummers...</Text>
      </View>
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
    onFilterChange({ search: '', genre: '', brand: '', era: '' });
    onSearchClear();
  };

  return (
    <View style={styles.listWrapper}>
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
      <TouchableOpacity
        onPress={onNavigateToCompare}
        style={[styles.compareButton, { backgroundColor: theme.card, borderColor: theme.border }]}
        accessibilityRole="button"
        accessibilityLabel="Compare drummers side by side"
      >
        <Text style={[styles.compareButtonText, { color: theme.text }]}>Compare Drummers</Text>
      </TouchableOpacity>
      {filteredDrummers.length === 0 ? (
        <View style={styles.noResultsContainer}>
          <Text style={[styles.noResultsText, { color: theme.secondaryText }]}>
            No drummers found matching your criteria
          </Text>
          <TouchableOpacity onPress={handleClearAllFilters} style={[styles.clearFiltersButtonLarge, { borderColor: theme.text }]}>
            <Text style={[styles.clearFiltersButtonText, { color: theme.text }]}>Clear All Filters</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={filteredDrummers}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <DrummerCard
              drummer={item}
              theme={theme}
              onPress={() => onSelectDrummer(item.id)}
            />
          )}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
}

// Check if we're on the compare page based on URL
function isComparePage() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return false;
  return window.location.pathname === '/compare' || window.location.pathname.startsWith('/compare?');
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

// Find drummer by slug (matching against slugified name)
function findDrummerBySlug(drummers, slug) {
  if (!slug || !drummers.length) return null;
  return drummers.find(d => toSlug(d.name) === slug.toLowerCase());
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

// Newsletter Signup Footer Component
function NewsletterFooter({ theme }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');

  // Email validation regex
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    // Reset previous error
    setErrorMessage('');

    // Validate email format
    if (!email.trim()) {
      setErrorMessage('Please enter your email address');
      setStatus('error');
      return;
    }

    if (!isValidEmail(email)) {
      setErrorMessage('Please enter a valid email address');
      setStatus('error');
      return;
    }

    setStatus('loading');

    try {
      // Placeholder: log to console and store in localStorage for now
      // Real email service integration will come later
      console.log('Newsletter signup:', email);
      
      if (Platform.OS === 'web' && typeof window !== 'undefined') {
        const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
        if (subscribers.includes(email)) {
          setErrorMessage('This email is already subscribed');
          setStatus('error');
          return;
        }
        subscribers.push(email);
        localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));
      }

      // Simulate a short delay for UX
      await new Promise(resolve => setTimeout(resolve, 500));

      setStatus('success');
      setEmail('');
    } catch (err) {
      console.error('Newsletter signup error:', err);
      setErrorMessage('Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' || e.nativeEvent?.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <View style={[styles.newsletterFooter, { backgroundColor: theme.card, borderTopColor: theme.border }]}>
      <View style={[styles.newsletterContainer, isMobile && styles.newsletterContainerMobile]}>
        <View style={styles.newsletterTextSection}>
          <Text style={[styles.newsletterTitle, { color: theme.text }]}>
            🥁 Stay in the Loop
          </Text>
          <Text style={[styles.newsletterSubtitle, { color: theme.secondaryText }]}>
            Get updates on new drummers and gear
          </Text>
        </View>

        {status === 'success' ? (
          <View style={styles.newsletterSuccessContainer}>
            <Text style={[styles.newsletterSuccess, { color: '#4ade80' }]}>
              ✓ You're subscribed! Thanks for joining.
            </Text>
          </View>
        ) : (
          <View style={[styles.newsletterForm, isMobile && styles.newsletterFormMobile]}>
            <View style={[
              styles.newsletterInputWrapper,
              isMobile && styles.newsletterInputWrapperMobile,
              { backgroundColor: theme.background, borderColor: status === 'error' ? theme.error : theme.border }
            ]}>
              <TextInput
                style={[styles.newsletterInput, { color: theme.text }]}
                placeholder="Enter your email"
                placeholderTextColor={theme.secondaryText}
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (status === 'error') setStatus('idle');
                }}
                onKeyPress={handleKeyPress}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                editable={status !== 'loading'}
                accessibilityLabel="Email address for newsletter signup"
              />
            </View>
            <TouchableOpacity
              onPress={handleSubmit}
              disabled={status === 'loading'}
              style={[
                styles.newsletterButton,
                isMobile && styles.newsletterButtonMobile,
                status === 'loading' && styles.newsletterButtonDisabled
              ]}
              accessibilityRole="button"
              accessibilityLabel="Subscribe to newsletter"
            >
              {status === 'loading' ? (
                <ActivityIndicator size="small" color="#000000" />
              ) : (
                <Text style={styles.newsletterButtonText}>Subscribe</Text>
              )}
            </TouchableOpacity>
          </View>
        )}

        {status === 'error' && errorMessage && (
          <Text style={[styles.newsletterError, { color: theme.error }]}>
            {errorMessage}
          </Text>
        )}
      </View>
    </View>
  );
}

function AppContent() {
  const { theme, isDarkMode, toggleTheme } = useTheme();
  const [selectedDrummerId, setSelectedDrummerId] = useState(null);
  const [selectedDrummer, setSelectedDrummer] = useState(null);
  // Initialize loadingDetail to true if URL has a drummer slug (for deep linking support)
  const [loadingDetail, setLoadingDetail] = useState(() => getDrummerSlugFromURL() !== null);
  const [drummers, setDrummers] = useState([]);
  const [loadingDrummers, setLoadingDrummers] = useState(true);
  const [drummersError, setDrummersError] = useState(null);
  const [showCompare, setShowCompare] = useState(() => isComparePage());
  const [selectedGear, setSelectedGear] = useState(null);
  const [loadingGear, setLoadingGear] = useState(false);

  // Search and filter state
  const [filters, setFilters] = useState(() => getFiltersFromURL());
  const [searchValue, setSearchValue] = useState(() => getFiltersFromURL().search || '');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchInputRef = useRef(null);

  // Filter drummers based on search and filters
  const filteredDrummers = useMemo(() => {
    let results = drummers;

    // Search filter
    if (searchValue) {
      const query = searchValue.toLowerCase();
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
        };
        const brands = drummerBrands[d.id] || [];
        return brands.includes(filters.brand.toLowerCase());
      });
    }

    return results;
  }, [drummers, searchValue, filters]);

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
  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
    updateFiltersURL(newFilters);
  }, []);

  // Handle search input changes
  const handleSearchChange = useCallback((text) => {
    setSearchValue(text);
    setShowSuggestions(true);
    handleFilterChange({ ...filters, search: text });
  }, [filters, handleFilterChange]);

  // Handle search clear
  const handleSearchClear = useCallback(() => {
    setSearchValue('');
    setShowSuggestions(false);
    handleFilterChange({ ...filters, search: '' });
  }, [filters, handleFilterChange]);

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

  useEffect(() => {
    const fetchDrummers = async () => {
      try {
        setLoadingDrummers(true);
        setDrummersError(null);
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch drummers');
        }
        const data = await response.json();
        setDrummers(data);
      } catch (err) {
        setDrummersError(err.message);
      } finally {
        setLoadingDrummers(false);
      }
    };
    fetchDrummers();
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
              setSelectedDrummer(data);
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
        setSelectedDrummer(null);
        setSelectedDrummerId(null);
        setSelectedGear(null);
      } else {
        // Back to home page
        setShowCompare(false);
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
              setSelectedDrummer(data);
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
  }, [drummers]);

  const handleSelectDrummer = async (id, skipUrlUpdate = false) => {
    setLoadingDetail(true);
    try {
      const detailUrl = typeof window !== 'undefined' && window.location.hostname !== 'localhost'
        ? `/api/drummers/${id}`
        : `http://localhost:3001/api/drummers/${id}`;
      const response = await fetch(detailUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch drummer details');
      }
      const data = await response.json();
      setSelectedDrummer(data);
      setSelectedDrummerId(id);
      // Update URL to reflect the drummer profile
      if (!skipUrlUpdate && Platform.OS === 'web' && typeof window !== 'undefined') {
        const slug = toSlug(data.name);
        window.history.pushState({}, '', `/drummer/${slug}`);
      }
    } catch (err) {
      console.error('Error fetching drummer details:', err);
    } finally {
      setLoadingDetail(false);
    }
  };

  const handleBack = () => {
    setSelectedDrummerId(null);
    setSelectedDrummer(null);
    setShowCompare(false);
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
    setSelectedDrummer(null);
    setSelectedDrummerId(null);
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.history.pushState({}, '', '/compare');
    }
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
    if (selectedDrummer) {
      return <DrummerDetail drummer={selectedDrummer} theme={theme} onBack={handleBack} onSelectGear={handleSelectGear} />;
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
      {!selectedDrummer && !showCompare && !selectedGear && <SEOHead drummers={drummers} filters={filters} />}
      <View style={styles.header} accessibilityRole="banner">
        <Text style={[styles.title, { color: theme.text }]} accessibilityRole="header">
          Metal Drummer Gear
        </Text>
        <View style={styles.toggleContainer}>
          <Text style={[styles.toggleLabel, { color: theme.secondaryText }]}>
            {isDarkMode ? 'Dark Mode' : 'Light Mode'}
          </Text>
          <TouchableOpacity
            onPress={toggleTheme}
            style={styles.switchTouchTarget}
            accessibilityRole="switch"
            accessibilityState={{ checked: isDarkMode }}
            accessibilityLabel={`Toggle ${isDarkMode ? 'light' : 'dark'} mode`}
          >
            <Switch
              value={isDarkMode}
              onValueChange={toggleTheme}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
            />
          </TouchableOpacity>
        </View>
      </View>
      {renderContent()}
      <NewsletterFooter theme={theme} />
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
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
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    minHeight: 44, // WCAG AA touch target minimum
  },
  switchTouchTarget: {
    minWidth: 44,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleLabel: {
    fontSize: 16,
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
  compareButton: {
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  compareButtonText: {
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
  },
  compareImageMobile: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 0,
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
    paddingVertical: 24,
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
    gap: 16,
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
    marginBottom: 4,
  },
  newsletterSubtitle: {
    fontSize: 14,
  },
  newsletterForm: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
    maxWidth: 400,
  },
  newsletterFormMobile: {
    flexDirection: 'column',
    maxWidth: '100%',
    width: '100%',
  },
  newsletterInputWrapper: {
    flex: 1,
    borderRadius: 8,
    borderWidth: 1,
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
});
