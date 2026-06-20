/**
 * Signature Licks Component - Issue #749
 * Displays drummer signature drum fills, patterns, and beats with video tutorials
 * URL: /drummers/[slug]/licks and /drummers/[slug]/licks/[lick-slug]
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  Linking,
  useWindowDimensions,
  StyleSheet,
  TextInput,
} from 'react-native';
import { Image } from 'expo-image';
import {
  getLickBySlug,
  getLicksByDrummerSlug,
  getAllLicks,
  filterLicks,
  generateLickSchema,
  getLickThumbId,
  generateLicksHubSchema,
  generateLicksIndexSchema,
  getAvailableDifficulties,
  getAvailableStyles,
  getAvailableTechniques,
  getBpmRanges,
  getRandomLick,
  getLickOfTheDay,
  getLickOfTheDayDate,
  getPlaylist,
  getAllPlaylists,
  getNextLickInPlaylist,
  getPreviousLickInPlaylist,
  generateLickOfTheDaySchema,
} from '../data/signatureLicks';
import { colors } from '../colors';
import { fontSize, fontWeight, lineHeight } from '../typography';
import { spacing } from '../spacing';
import { injectWebApplicationSchema, TOOL_SCHEMAS } from '../utils/webApplicationSchema';
import { getTechniqueBySlug } from '../data/techniques';

// ==========================================
// URL Detection Helpers
// ==========================================

/**
 * Check if current URL is a licks hub page
 * Matches: /drummers/:drummerSlug/licks
 */
export function isLicksHubPage() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return false;
  const pathname = window.location.pathname;
  return /^\/drummers\/[a-z0-9-]+\/licks\/?$/i.test(pathname);
}

/**
 * Check if current URL is a single lick page
 * Matches: /drummers/:drummerSlug/licks/:lickSlug
 */
export function isLickDetailPage() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return false;
  const pathname = window.location.pathname;
  return /^\/drummers\/[a-z0-9-]+\/licks\/[a-z0-9-]+$/i.test(pathname);
}

/**
 * Check if current URL is the top-level licks index hub (Issue #1042)
 * Matches: /licks
 */
export function isLicksIndexPage() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return false;
  return /^\/licks\/?$/i.test(window.location.pathname);
}

/**
 * Check if on any licks page
 */
export function isLicksPage() {
  return isLicksIndexPage() || isLicksHubPage() || isLickDetailPage();
}

/**
 * Get drummer slug from licks URL
 */
export function getDrummerSlugFromLicksURL() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return null;
  const match = window.location.pathname.match(/^\/drummers\/([a-z0-9-]+)\/licks/i);
  return match ? match[1] : null;
}

/**
 * Get lick slug from URL
 */
export function getLickSlugFromURL() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return null;
  const match = window.location.pathname.match(/^\/drummers\/[a-z0-9-]+\/licks\/([a-z0-9-]+)$/i);
  return match ? match[1] : null;
}

// ==========================================
// OG Meta Tags Update
// ==========================================

export function updateLickMeta(lick) {
  if (Platform.OS !== 'web' || typeof document === 'undefined' || !lick) return;

  const setMeta = (name, content, isProperty = false) => {
    const attr = isProperty ? 'property' : 'name';
    let tag = document.querySelector(`meta[${attr}="${name}"]`);
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute(attr, name);
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
  };

  const title = lick.seo.title;
  const description = lick.seo.description;
  const thumbId = getLickThumbId(lick);
  const image = thumbId
    ? `https://i.ytimg.com/vi/${thumbId}/maxresdefault.jpg`
    : 'https://metalforge.io/images/og/signature-licks.png';
  const url = `https://metalforge.io/drummers/${lick.drummerSlug}/licks/${lick.slug}`;

  document.title = title;
  setMeta('description', description);
  setMeta('keywords', lick.seo.keywords.join(', '));

  // Open Graph
  setMeta('og:title', title, true);
  setMeta('og:description', description, true);
  setMeta('og:image', image, true);
  setMeta('og:url', url, true);
  setMeta('og:type', lick.video ? 'video.other' : 'article', true);
  if (lick.video) {
    setMeta('og:video', `https://www.youtube.com/embed/${lick.video.youtubeId}`, true);
  }

  // Twitter
  setMeta('twitter:card', 'summary_large_image');
  setMeta('twitter:title', title);
  setMeta('twitter:description', description);
  setMeta('twitter:image', image);
  if (lick.video) {
    setMeta('twitter:player', `https://www.youtube.com/embed/${lick.video.youtubeId}`);
  }

  // Canonical URL
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', url);

  // Add JSON-LD Schema
  const schemaId = 'lick-schema';
  let existingSchema = document.getElementById(schemaId);
  if (existingSchema) existingSchema.remove();

  const schema = generateLickSchema(lick);
  const schemaScript = document.createElement('script');
  schemaScript.id = schemaId;
  schemaScript.type = 'application/ld+json';
  schemaScript.textContent = JSON.stringify(schema);
  document.head.appendChild(schemaScript);
}

export function updateLicksHubMeta(drummerName, drummerSlug, licks) {
  if (Platform.OS !== 'web' || typeof document === 'undefined') return;

  const setMeta = (name, content, isProperty = false) => {
    const attr = isProperty ? 'property' : 'name';
    let tag = document.querySelector(`meta[${attr}="${name}"]`);
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute(attr, name);
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
  };

  const title = `${drummerName} Signature Licks - Drum Patterns & Tutorials | MetalForge`;
  const description = `Learn ${drummerName}'s most iconic drum fills, patterns, and techniques. Video tutorials, gear info, and practice tips for ${licks.length} signature licks.`;
  const url = `https://metalforge.io/drummers/${drummerSlug}/licks`;

  document.title = title;
  setMeta('description', description);

  // Open Graph
  setMeta('og:title', title, true);
  setMeta('og:description', description, true);
  setMeta('og:url', url, true);
  setMeta('og:type', 'website', true);

  // Twitter
  setMeta('twitter:card', 'summary_large_image');
  setMeta('twitter:title', title);
  setMeta('twitter:description', description);

  // Canonical URL
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', url);

  // Add JSON-LD Schema
  const schemaId = 'licks-hub-schema';
  let existingSchema = document.getElementById(schemaId);
  if (existingSchema) existingSchema.remove();

  const schema = generateLicksHubSchema(drummerName, drummerSlug, licks);
  const schemaScript = document.createElement('script');
  schemaScript.id = schemaId;
  schemaScript.type = 'application/ld+json';
  schemaScript.textContent = JSON.stringify(schema);
  document.head.appendChild(schemaScript);
  
  // Inject WebApplication schema for SEO (Issue #778)
  injectWebApplicationSchema({
    ...TOOL_SCHEMAS.signatureLicks,
    description: description, // Use dynamic description
  });
}

/**
 * Update meta tags + JSON-LD for the top-level /licks index hub (Issue #1042)
 */
export function updateLicksIndexMeta(licks) {
  if (Platform.OS !== 'web' || typeof document === 'undefined') return;

  const setMeta = (name, content, isProperty = false) => {
    const attr = isProperty ? 'property' : 'name';
    let tag = document.querySelector(`meta[${attr}="${name}"]`);
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute(attr, name);
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
  };

  const count = licks.length;
  const title = `Signature Metal Drum Licks — ${count}+ Iconic Fills & Beats | MetalForge`;
  const description = `Browse ${count}+ iconic metal drum licks, fills, and beats from the world's best drummers — with tempo, technique breakdown, and video for each.`;
  const url = 'https://metalforge.io/licks';

  document.title = title;
  setMeta('description', description);
  setMeta('keywords', 'metal drum licks, famous metal drum fills, signature metal drum beats, iconic metal drum patterns, metal drumming tutorials');

  // Open Graph
  setMeta('og:title', title, true);
  setMeta('og:description', description, true);
  setMeta('og:url', url, true);
  setMeta('og:type', 'website', true);

  // Twitter
  setMeta('twitter:card', 'summary_large_image');
  setMeta('twitter:title', title);
  setMeta('twitter:description', description);

  // Self-referencing canonical (Issue #1015 consistency)
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', url);

  // JSON-LD: CollectionPage + ItemList + BreadcrumbList
  const schemaId = 'licks-index-schema';
  const existingSchema = document.getElementById(schemaId);
  if (existingSchema) existingSchema.remove();

  const schema = generateLicksIndexSchema(licks);
  const schemaScript = document.createElement('script');
  schemaScript.id = schemaId;
  schemaScript.type = 'application/ld+json';
  schemaScript.textContent = JSON.stringify(schema);
  document.head.appendChild(schemaScript);
}

/**
 * Update meta tags for the Signature Licks Discovery Engine page
 * URL: /tools/signature-licks
 */
export function updateSignatureLicksDiscoveryMeta(lickCount) {
  if (Platform.OS !== 'web' || typeof document === 'undefined') return;

  const setMeta = (name, content, isProperty = false) => {
    const attr = isProperty ? 'property' : 'name';
    let tag = document.querySelector(`meta[${attr}="${name}"]`);
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute(attr, name);
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
  };

  const title = 'Signature Licks Discovery Engine - Learn Metal Drum Patterns | MetalForge';
  const description = `Explore ${lickCount || 'iconic'} signature drum fills, beats, and patterns from legendary metal drummers. Video tutorials, technique breakdowns, and practice tips.`;
  const url = 'https://metalforge.io/tools/signature-licks';

  document.title = title;
  setMeta('description', description);

  // Open Graph
  setMeta('og:title', title, true);
  setMeta('og:description', description, true);
  setMeta('og:url', url, true);
  setMeta('og:type', 'website', true);
  setMeta('og:image', 'https://metalforge.io/images/og/signature-licks.png', true);

  // Twitter
  setMeta('twitter:card', 'summary_large_image');
  setMeta('twitter:title', title);
  setMeta('twitter:description', description);
  setMeta('twitter:image', 'https://metalforge.io/images/og/signature-licks.png');

  // Canonical URL
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', url);

  // Inject WebApplication schema for SEO (Issue #778)
  injectWebApplicationSchema({
    ...TOOL_SCHEMAS.signatureLicks,
    description: description,
  });
}

// ==========================================
// YouTube Embed Component (Lazy-loaded facade)
// ==========================================

function YouTubeEmbed({ videoId, title, theme, startTime, endTime }) {
  const { width } = useWindowDimensions();
  const [isActivated, setIsActivated] = useState(false);

  const maxWidth = Math.min(width - 48, 720);
  const videoWidth = maxWidth;
  const videoHeight = Math.round(videoWidth * 9 / 16);

  const embedUrl = useMemo(() => {
    let url = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`;
    if (startTime) url += `&start=${startTime}`;
    if (endTime) url += `&end=${endTime}`;
    return url;
  }, [videoId, startTime, endTime]);

  if (Platform.OS === 'web') {
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
              borderRadius: 12,
              backgroundColor: colors.bg.secondary
            }}
          />
          <View style={styles.playButtonOverlay}>
            <View style={styles.youtubePlayButton}>
              <svg height="100%" version="1.1" viewBox="0 0 68 48" width="100%">
                <path d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z" fill="#f00"></path>
                <path d="M 45,24 27,14 27,34" fill="#fff"></path>
              </svg>
            </View>
          </View>
          {startTime > 0 && (
            <View style={styles.timestampBadge}>
              <Text style={styles.timestampText}>Starts at {Math.floor(startTime / 60)}:{String(startTime % 60).padStart(2, '0')}</Text>
            </View>
          )}
        </View>
      );
    }

    return (
      <View style={[styles.videoContainer, { width: videoWidth, height: videoHeight }]}>
        <iframe
          width="100%"
          height="100%"
          src={embedUrl}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          style={{ borderRadius: 12 }}
        />
      </View>
    );
  }

  // Native: show thumbnail that opens YouTube
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  const youtubeUrl = startTime
    ? `https://www.youtube.com/watch?v=${videoId}&t=${startTime}`
    : `https://www.youtube.com/watch?v=${videoId}`;

  return (
    <TouchableOpacity
      onPress={() => Linking.openURL(youtubeUrl)}
      style={[styles.videoContainer, { width: videoWidth, height: videoHeight }]}
      accessibilityLabel={`Watch ${title} on YouTube`}
    >
      <Image
        source={{ uri: thumbnailUrl }}
        style={{ width: '100%', height: '100%', borderRadius: 12 }}
        contentFit="cover"
      />
      <View style={styles.playButtonOverlay}>
        <Text style={styles.playIcon}>▶️</Text>
      </View>
    </TouchableOpacity>
  );
}

// ==========================================
// Difficulty Badge Component
// ==========================================

function DifficultyBadge({ difficulty, rating, theme }) {
  const difficultyColors = {
    beginner: '#22c55e',
    intermediate: '#eab308',
    advanced: '#f97316',
    expert: '#ef4444',
  };

  const difficultyLabels = {
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
    expert: 'Expert',
  };

  return (
    <View style={[styles.difficultyBadge, { backgroundColor: difficultyColors[difficulty] + '20', borderColor: difficultyColors[difficulty] }]}>
      <Text style={[styles.difficultyText, { color: difficultyColors[difficulty] }]}>
        {difficultyLabels[difficulty]} {'★'.repeat(rating)}
      </Text>
    </View>
  );
}

// ==========================================
// BPM Badge Component
// ==========================================

function BpmBadge({ bpm, theme }) {
  const getBpmColor = () => {
    if (bpm < 120) return '#22c55e';
    if (bpm < 180) return '#eab308';
    if (bpm < 220) return '#f97316';
    return '#ef4444';
  };

  return (
    <View style={[styles.bpmBadge, { backgroundColor: theme.card, borderColor: getBpmColor() }]}>
      <Text style={[styles.bpmText, { color: getBpmColor() }]}>🥁 {bpm} BPM</Text>
    </View>
  );
}

// ==========================================
// Filter Bar Component
// ==========================================

function FilterBar({ filters, onFilterChange, theme, isMobile }) {
  const difficulties = getAvailableDifficulties();
  const styles_local = getAvailableStyles();
  const bpmRanges = getBpmRanges();

  return (
    <View style={[styles.filterBar, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <Text style={[styles.filterTitle, { color: theme.text }]}>🎯 Filter Licks</Text>

      <View style={[styles.filterRow, isMobile && styles.filterRowMobile]}>
        {/* Difficulty Filter */}
        <View style={styles.filterGroup}>
          <Text style={[styles.filterLabel, { color: theme.secondaryText }]}>Difficulty</Text>
          <View style={styles.filterOptions}>
            <TouchableOpacity
              style={[styles.filterChip, !filters.difficulty && styles.filterChipActive]}
              onPress={() => onFilterChange({ ...filters, difficulty: null })}
            >
              <Text style={[styles.filterChipText, !filters.difficulty && styles.filterChipTextActive]}>All</Text>
            </TouchableOpacity>
            {difficulties.map(d => (
              <TouchableOpacity
                key={d}
                style={[styles.filterChip, filters.difficulty === d && styles.filterChipActive]}
                onPress={() => onFilterChange({ ...filters, difficulty: filters.difficulty === d ? null : d })}
              >
                <Text style={[styles.filterChipText, filters.difficulty === d && styles.filterChipTextActive]}>
                  {d.charAt(0).toUpperCase() + d.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* BPM Filter */}
        <View style={styles.filterGroup}>
          <Text style={[styles.filterLabel, { color: theme.secondaryText }]}>Speed</Text>
          <View style={styles.filterOptions}>
            <TouchableOpacity
              style={[styles.filterChip, !filters.bpmRange && styles.filterChipActive]}
              onPress={() => onFilterChange({ ...filters, bpmRange: null })}
            >
              <Text style={[styles.filterChipText, !filters.bpmRange && styles.filterChipTextActive]}>All</Text>
            </TouchableOpacity>
            {bpmRanges.map(r => (
              <TouchableOpacity
                key={r.label}
                style={[styles.filterChip, filters.bpmRange?.label === r.label && styles.filterChipActive]}
                onPress={() => onFilterChange({ ...filters, bpmRange: filters.bpmRange?.label === r.label ? null : r })}
              >
                <Text style={[styles.filterChipText, filters.bpmRange?.label === r.label && styles.filterChipTextActive]}>
                  {r.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}

// ==========================================
// Lick Card Component (for listing)
// ==========================================

function LickCard({ lick, theme, onPress, isMobile }) {
  const thumbId = getLickThumbId(lick);
  const thumbnailUrl = thumbId ? `https://i.ytimg.com/vi/${thumbId}/mqdefault.jpg` : null;

  return (
    <TouchableOpacity
      style={[styles.lickCard, { backgroundColor: theme.card, borderColor: theme.border }]}
      onPress={onPress}
      accessibilityLabel={`View ${lick.name} by ${lick.drummerName}`}
    >
      <View style={styles.lickCardContent}>
        {/* Thumbnail */}
        <View style={styles.lickCardThumbnail}>
          {thumbnailUrl ? (
            <Image
              source={{ uri: thumbnailUrl }}
              style={styles.lickCardImage}
              contentFit="cover"
              accessibilityLabel={`${lick.name} by ${lick.drummerName} thumbnail`}
            />
          ) : (
            <View style={[styles.lickCardImage, { backgroundColor: theme.border, alignItems: 'center', justifyContent: 'center' }]}>
              <Text style={{ fontSize: 28 }}>🥁</Text>
            </View>
          )}
          <View style={styles.lickCardPlayIcon}>
            <Text style={{ fontSize: 20 }}>▶️</Text>
          </View>
        </View>

        {/* Info */}
        <View style={styles.lickCardInfo}>
          <Text style={[styles.lickCardTitle, { color: theme.text }]} numberOfLines={2}>
            {lick.name}
          </Text>
          <Text style={[styles.lickCardSubtitle, { color: theme.secondaryText }]}>
            {lick.drummerName} • {lick.song}
          </Text>

          <View style={styles.lickCardMeta}>
            <DifficultyBadge difficulty={lick.difficulty} rating={lick.difficultyRating} theme={theme} />
            <BpmBadge bpm={lick.bpm} theme={theme} />
          </View>

          <View style={styles.lickCardTechniques}>
            {lick.techniques.slice(0, 3).map(t => (
              <View key={t} style={[styles.techniquePill, { backgroundColor: theme.primary + '20' }]}>
                <Text style={[styles.techniquePillText, { color: theme.primary }]}>
                  {t.replace(/-/g, ' ')}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

// ==========================================
// Licks Hub Page
// ==========================================

export function LicksHubPage({ theme, onBack, drummers, drummerSlug, onSelectLick }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const [filters, setFilters] = useState({ difficulty: null, bpmRange: null });
  const [showAllLicks, setShowAllLicks] = useState(!drummerSlug);
  const [playlistMode, setPlaylistMode] = useState(false);

  // Get playlist for current drummer
  const playlist = useMemo(() => {
    if (!drummerSlug) return null;
    return getPlaylist(drummerSlug);
  }, [drummerSlug]);

  // Handle random lick discovery
  const handleRandomLick = useCallback(() => {
    const randomLick = getRandomLick({ drummerSlug });
    if (randomLick) {
      // Track GA4 event
      if (Platform.OS === 'web' && typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'random_lick_click', {
          drummer: randomLick.drummerName,
          lick_name: randomLick.name,
          difficulty: randomLick.difficulty,
        });
      }
      handleLickPress(randomLick);
    }
  }, [drummerSlug]);

  // Handle playlist mode start
  const handleStartPlaylist = useCallback(() => {
    if (playlist && playlist.licks.length > 0) {
      // Track GA4 event
      if (Platform.OS === 'web' && typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'playlist_start', {
          drummer: playlist.drummerName,
          lick_count: playlist.count,
        });
      }
      // Start with the first (easiest) lick
      handleLickPress(playlist.licks[0]);
    }
  }, [playlist]);

  // Get licks based on whether we're viewing a specific drummer or all
  const allLicks = useMemo(() => {
    let licks = drummerSlug ? getLicksByDrummerSlug(drummerSlug) : getAllLicks();

    // Apply filters
    if (filters.difficulty) {
      licks = licks.filter(l => l.difficulty === filters.difficulty);
    }
    if (filters.bpmRange) {
      licks = licks.filter(l => l.bpm >= filters.bpmRange.min && l.bpm <= filters.bpmRange.max);
    }

    return licks;
  }, [drummerSlug, filters]);

  // Get drummer info
  const drummer = useMemo(() => {
    if (!drummerSlug) return null;
    return drummers?.find(d =>
      d.name.toLowerCase().replace(/\s+/g, '-') === drummerSlug ||
      d.slug === drummerSlug
    );
  }, [drummerSlug, drummers]);

  const drummerName = drummer?.name || allLicks[0]?.drummerName || 'Metal Drummers';

  // Update meta tags
  useEffect(() => {
    if (drummerSlug) {
      updateLicksHubMeta(drummerName, drummerSlug, allLicks);
    } else {
      // Discovery page - show all licks
      updateSignatureLicksDiscoveryMeta(allLicks.length);
    }
  }, [drummerSlug, drummerName, allLicks]);

  // Track page view
  useEffect(() => {
    if (Platform.OS === 'web' && typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: `${drummerName} Signature Licks`,
        page_location: window.location.href,
        page_path: window.location.pathname,
      });
    }
  }, [drummerName]);

  const handleLickPress = useCallback((lick) => {
    if (onSelectLick) {
      onSelectLick(lick);
    } else if (Platform.OS === 'web') {
      window.history.pushState({}, '', `/drummers/${lick.drummerSlug}/licks/${lick.slug}`);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  }, [onSelectLick]);

  // Group licks by drummer when showing all
  const licksByDrummer = useMemo(() => {
    if (drummerSlug) return null;
    const grouped = {};
    allLicks.forEach(lick => {
      if (!grouped[lick.drummerSlug]) {
        grouped[lick.drummerSlug] = {
          drummerName: lick.drummerName,
          drummerSlug: lick.drummerSlug,
          band: lick.band,
          licks: [],
        };
      }
      grouped[lick.drummerSlug].licks.push(lick);
    });
    return Object.values(grouped);
  }, [allLicks, drummerSlug]);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.bg }]}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={[styles.backText, { color: theme.primary }]}>← Back</Text>
        </TouchableOpacity>

        <Text style={[styles.pageTitle, { color: theme.text }]}>
          {drummerSlug ? `${drummerName}'s Signature Licks` : '🥁 Signature Licks Library'}
        </Text>

        <Text style={[styles.pageSubtitle, { color: theme.secondaryText }]}>
          {drummerSlug
            ? `Learn ${allLicks.length} iconic drum patterns from ${drummer?.band || allLicks[0]?.band}`
            : `${allLicks.length} signature patterns from metal's greatest drummers`}
        </Text>
      </View>

      {/* Filter Bar */}
      <FilterBar filters={filters} onFilterChange={setFilters} theme={theme} isMobile={isMobile} />

      {/* Discovery Actions (Issue #759) */}
      <View style={[styles.discoveryActions, isMobile && styles.discoveryActionsMobile]}>
        {/* Random Lick Button */}
        <TouchableOpacity
          style={[styles.discoveryButton, { backgroundColor: theme.primary }]}
          onPress={handleRandomLick}
          accessibilityLabel="Get a random lick"
        >
          <Text style={styles.discoveryButtonEmoji}>🎲</Text>
          <Text style={styles.discoveryButtonText}>Random Lick</Text>
        </TouchableOpacity>

        {/* Playlist Button (only for single drummer view) */}
        {drummerSlug && playlist && (
          <TouchableOpacity
            style={[styles.discoveryButton, styles.playlistButton, { backgroundColor: theme.card, borderColor: theme.primary }]}
            onPress={handleStartPlaylist}
            accessibilityLabel={`Watch all ${playlist.count} licks from ${playlist.drummerName}`}
          >
            <Text style={styles.discoveryButtonEmoji}>▶️</Text>
            <View>
              <Text style={[styles.discoveryButtonText, { color: theme.primary }]}>
                Watch All {playlist.count} Licks
              </Text>
              <Text style={[styles.playlistDuration, { color: theme.secondaryText }]}>
                ~{playlist.estimatedDurationDisplay}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>

      {/* Licks List */}
      {drummerSlug ? (
        // Single drummer view
        <View style={styles.licksGrid}>
          {allLicks.map(lick => (
            <LickCard
              key={lick.slug}
              lick={lick}
              theme={theme}
              onPress={() => handleLickPress(lick)}
              isMobile={isMobile}
            />
          ))}
        </View>
      ) : (
        // All drummers view (grouped)
        licksByDrummer?.map(group => (
          <View key={group.drummerSlug} style={styles.drummerSection}>
            <TouchableOpacity
              onPress={() => {
                if (Platform.OS === 'web') {
                  window.history.pushState({}, '', `/drummers/${group.drummerSlug}/licks`);
                  window.dispatchEvent(new PopStateEvent('popstate'));
                }
              }}
            >
              <Text style={[styles.drummerSectionTitle, { color: theme.text }]}>
                {group.drummerName}
              </Text>
              <Text style={[styles.drummerSectionSubtitle, { color: theme.secondaryText }]}>
                {group.band} • {group.licks.length} licks
              </Text>
            </TouchableOpacity>

            <View style={styles.licksGrid}>
              {group.licks.map(lick => (
                <LickCard
                  key={lick.slug}
                  lick={lick}
                  theme={theme}
                  onPress={() => handleLickPress(lick)}
                  isMobile={isMobile}
                />
              ))}
            </View>
          </View>
        ))
      )}

      {/* Empty State */}
      {allLicks.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={[styles.emptyStateText, { color: theme.secondaryText }]}>
            No licks match your filters. Try adjusting the criteria.
          </Text>
          <TouchableOpacity
            style={[styles.resetButton, { backgroundColor: theme.primary }]}
            onPress={() => setFilters({ difficulty: null, bpmRange: null })}
          >
            <Text style={styles.resetButtonText}>Reset Filters</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

// ==========================================
// Licks Index Hub (Issue #1042) - /licks
// Top-level landing page aggregating EVERY signature lick across all drummers.
// Completes the hub family (/techniques, /lists, /vs, /brands, /guides, /tools).
// ==========================================

export function LicksIndexPage({ theme, onBack, onSelectLick }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  // Client-side filters: technique, difficulty, style (data already carries these)
  const [filters, setFilters] = useState({ technique: null, difficulty: null, style: null });

  const techniques = useMemo(() => getAvailableTechniques(), []);
  const difficulties = useMemo(() => getAvailableDifficulties(), []);
  const stylesList = useMemo(() => getAvailableStyles(), []);

  // All licks (unfiltered) — used for schema/meta so the structured data
  // always reflects the full corpus regardless of the active filter.
  const allLicks = useMemo(() => getAllLicks(), []);

  // Filtered licks for display
  const visibleLicks = useMemo(() => {
    return allLicks.filter(lick => {
      if (filters.technique && !lick.techniques.includes(filters.technique)) return false;
      if (filters.difficulty && lick.difficulty !== filters.difficulty) return false;
      if (filters.style && lick.style !== filters.style) return false;
      return true;
    });
  }, [allLicks, filters]);

  // Group visible licks by drummer
  const licksByDrummer = useMemo(() => {
    const grouped = {};
    visibleLicks.forEach(lick => {
      if (!grouped[lick.drummerSlug]) {
        grouped[lick.drummerSlug] = {
          drummerName: lick.drummerName,
          drummerSlug: lick.drummerSlug,
          band: lick.band,
          licks: [],
        };
      }
      grouped[lick.drummerSlug].licks.push(lick);
    });
    // Alphabetical by drummer name for a stable, scannable order
    return Object.values(grouped).sort((a, b) => a.drummerName.localeCompare(b.drummerName));
  }, [visibleLicks]);

  // Update meta tags + JSON-LD (schema reflects the full corpus)
  useEffect(() => {
    updateLicksIndexMeta(allLicks);
  }, [allLicks]);

  // Track page view
  useEffect(() => {
    if (Platform.OS === 'web' && typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: 'Signature Metal Drum Licks',
        page_location: window.location.href,
        page_path: window.location.pathname,
      });
    }
  }, []);

  const handleLickPress = useCallback((lick) => {
    if (onSelectLick) {
      onSelectLick(lick);
    } else if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.history.pushState({}, '', `/drummers/${lick.drummerSlug}/licks/${lick.slug}`);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  }, [onSelectLick]);

  const goToDrummerHub = useCallback((drummerSlug) => {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.history.pushState({}, '', `/drummers/${drummerSlug}/licks`);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  }, []);

  const drummerCount = useMemo(
    () => new Set(allLicks.map(l => l.drummerSlug)).size,
    [allLicks]
  );

  const formatLabel = (s) => s.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  // Reusable chip row
  const ChipRow = ({ label, options, active, onSelect, getKey, getText }) => (
    <View style={styles.filterGroup}>
      <Text style={[styles.filterLabel, { color: theme.secondaryText }]}>{label}</Text>
      <View style={styles.filterOptions}>
        <TouchableOpacity
          style={[styles.filterChip, !active && styles.filterChipActive]}
          onPress={() => onSelect(null)}
        >
          <Text style={[styles.filterChipText, !active && styles.filterChipTextActive]}>All</Text>
        </TouchableOpacity>
        {options.map(opt => {
          const key = getKey(opt);
          return (
            <TouchableOpacity
              key={key}
              style={[styles.filterChip, active === key && styles.filterChipActive]}
              onPress={() => onSelect(active === key ? null : key)}
            >
              <Text style={[styles.filterChipText, active === key && styles.filterChipTextActive]}>
                {getText(opt)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.bg }]}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={[styles.backText, { color: theme.primary }]}>← Back</Text>
        </TouchableOpacity>

        <Text style={[styles.pageTitle, { color: theme.text }]}>
          🥁 Signature Metal Drum Licks
        </Text>
        <Text style={[styles.pageSubtitle, { color: theme.secondaryText }]}>
          {`Browse ${allLicks.length}+ iconic metal drum licks, fills, and beats from ${drummerCount} legendary drummers — with tempo, technique breakdown, and video for each.`}
        </Text>
      </View>

      {/* Answer-first, quotable intro (≥300 words, LLM-citation friendly) */}
      <View style={[styles.introBlock, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <Text style={[styles.introText, { color: theme.text }]}>
          A signature metal drum lick is a short, recognisable fill, beat, or pattern that defines a
          drummer's style on a specific song — think Joey Jordison's blast-driven intro to Slipknot's
          "The Heretic Anthem," Danny Carey's hypnotic 9/8 groove on Tool's "Pneuma," or Gene Hoglan's
          machine-precise double bass on Death's "The Philosopher." This page is the complete index of
          every signature lick on MetalForge, gathered from across the site's per-drummer libraries into
          one place so you can browse, compare, and learn them all without hunting drummer by drummer.
        </Text>
        <Text style={[styles.introText, { color: theme.text }]}>
          Each lick below carries the details a drummer actually needs to learn it: the exact tempo in
          BPM, the time signature, a difficulty rating from beginner to expert, the core techniques it
          trains (double bass, blast beats, odd-time signatures, polyrhythms, fill vocabulary, and
          groove control), and a video reference — usually an official playthrough or drum-cam — so you
          can see and hear the part before you sit down at the kit. The licks span the full spectrum of
          metal: death metal, metalcore, mathcore, progressive metal, thrash, and more, played by the
          genre's most influential drummers.
        </Text>
        <Text style={[styles.introText, { color: theme.text }]}>
          Use the filters to narrow the list by technique, difficulty, or style and zero in on what you
          want to practise — for example, expert-level double-bass death metal licks, or intermediate
          metalcore grooves. Every card links straight to a full breakdown with step-by-step technique
          notes, gear used, and practice tips, and each drummer heading links to that drummer's complete
          signature-lick collection. Whether you are building speed, expanding your fill vocabulary, or
          studying how the greats lock a part to a riff, this hub is the fastest way to find a lick worth
          learning and start working on it today. The library grows continually as new signature licks
          are transcribed and added, so it is worth bookmarking and returning to as your playing develops.
        </Text>
      </View>

      {/* Filter Bar: technique / difficulty / style */}
      <View style={[styles.filterBar, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <Text style={[styles.filterTitle, { color: theme.text }]}>🎯 Filter Licks</Text>
        <View style={[styles.filterRow, isMobile && styles.filterRowMobile]}>
          <ChipRow
            label="Technique"
            options={techniques}
            active={filters.technique}
            onSelect={(v) => setFilters(f => ({ ...f, technique: v }))}
            getKey={(t) => t}
            getText={(t) => formatLabel(t)}
          />
          <ChipRow
            label="Difficulty"
            options={difficulties}
            active={filters.difficulty}
            onSelect={(v) => setFilters(f => ({ ...f, difficulty: v }))}
            getKey={(d) => d}
            getText={(d) => d.charAt(0).toUpperCase() + d.slice(1)}
          />
          <ChipRow
            label="Style"
            options={stylesList}
            active={filters.style}
            onSelect={(v) => setFilters(f => ({ ...f, style: v }))}
            getKey={(s) => s}
            getText={(s) => formatLabel(s)}
          />
        </View>
        <Text style={[styles.pageSubtitle, { color: theme.secondaryText, marginTop: spacing.sm, marginBottom: 0 }]}>
          {`Showing ${visibleLicks.length} of ${allLicks.length} licks`}
        </Text>
      </View>

      {/* Licks grouped by drummer */}
      {licksByDrummer.map(group => (
        <View key={group.drummerSlug} style={styles.drummerSection}>
          <TouchableOpacity
            onPress={() => goToDrummerHub(group.drummerSlug)}
            accessibilityLabel={`View all ${group.drummerName} signature licks`}
          >
            <Text style={[styles.drummerSectionTitle, { color: theme.text }]}>
              {group.drummerName}
            </Text>
            <Text style={[styles.drummerSectionSubtitle, { color: theme.secondaryText }]}>
              {group.band} • {group.licks.length} {group.licks.length === 1 ? 'lick' : 'licks'} →
            </Text>
          </TouchableOpacity>

          <View style={styles.licksGrid}>
            {group.licks.map(lick => (
              <LickCard
                key={lick.slug}
                lick={lick}
                theme={theme}
                onPress={() => handleLickPress(lick)}
                isMobile={isMobile}
              />
            ))}
          </View>
        </View>
      ))}

      {/* Empty state */}
      {visibleLicks.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={[styles.emptyStateText, { color: theme.secondaryText }]}>
            No licks match your filters. Try adjusting the criteria.
          </Text>
          <TouchableOpacity
            style={[styles.resetButton, { backgroundColor: theme.primary }]}
            onPress={() => setFilters({ technique: null, difficulty: null, style: null })}
          >
            <Text style={styles.resetButtonText}>Reset Filters</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

// ==========================================
// Lick Detail Page
// ==========================================

export function LickDetailPage({ theme, onBack, lickSlug, drummers }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const lick = useMemo(() => getLickBySlug(lickSlug), [lickSlug]);

  // Get related licks from same drummer
  const relatedLicks = useMemo(() => {
    if (!lick) return [];
    return getLicksByDrummerSlug(lick.drummerSlug)
      .filter(l => l.slug !== lick.slug)
      .slice(0, 3);
  }, [lick]);

  // Playlist navigation (Issue #759)
  const playlist = useMemo(() => {
    if (!lick) return null;
    return getPlaylist(lick.drummerSlug);
  }, [lick]);

  const nextLick = useMemo(() => {
    if (!lick) return null;
    return getNextLickInPlaylist(lick.slug, lick.drummerSlug);
  }, [lick]);

  const prevLick = useMemo(() => {
    if (!lick) return null;
    return getPreviousLickInPlaylist(lick.slug, lick.drummerSlug);
  }, [lick]);

  const currentPosition = useMemo(() => {
    if (!playlist || !lick) return null;
    const index = playlist.licks.findIndex(l => l.slug === lick.slug);
    return index >= 0 ? index + 1 : null;
  }, [playlist, lick]);

  // Technique hub cross-links (Issue #1272)
  const relatedTechniqueObjects = useMemo(() => {
    if (!lick || !lick.techniques) return [];
    return lick.techniques.map(slug => getTechniqueBySlug(slug)).filter(Boolean);
  }, [lick]);

  // Navigate to lick
  const navigateToLick = useCallback((targetLick) => {
    if (!targetLick) return;
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      // Track GA4 event
      if (window.gtag) {
        window.gtag('event', 'playlist_navigate', {
          from_lick: lick?.name,
          to_lick: targetLick.name,
          drummer: targetLick.drummerName,
        });
      }
      window.history.pushState({}, '', `/drummers/${targetLick.drummerSlug}/licks/${targetLick.slug}`);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  }, [lick]);

  // Update meta tags
  useEffect(() => {
    if (lick) {
      updateLickMeta(lick);
    }
  }, [lick]);

  // Track page view
  useEffect(() => {
    if (Platform.OS === 'web' && typeof window !== 'undefined' && window.gtag && lick) {
      window.gtag('event', 'page_view', {
        page_title: lick.seo.title,
        page_location: window.location.href,
        page_path: window.location.pathname,
      });
      window.gtag('event', 'lick_view', {
        lick_name: lick.name,
        drummer: lick.drummerName,
        difficulty: lick.difficulty,
        bpm: lick.bpm,
      });
    }
  }, [lick]);

  if (!lick) {
    return (
      <View style={[styles.container, { backgroundColor: theme.bg }]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Text style={[styles.backText, { color: theme.primary }]}>← Back</Text>
          </TouchableOpacity>
          <Text style={[styles.pageTitle, { color: theme.text }]}>Lick Not Found</Text>
        </View>
      </View>
    );
  }

  const handleGearClick = (gear) => {
    if (gear.link && Platform.OS === 'web') {
      window.history.pushState({}, '', gear.link);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.bg }]}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Breadcrumb */}
      <View style={styles.breadcrumb}>
        <TouchableOpacity onPress={onBack}>
          <Text style={[styles.breadcrumbLink, { color: theme.primary }]}>
            {lick.drummerName}'s Licks
          </Text>
        </TouchableOpacity>
        <Text style={[styles.breadcrumbSeparator, { color: theme.secondaryText }]}> / </Text>
        <Text style={[styles.breadcrumbCurrent, { color: theme.text }]}>{lick.shortName}</Text>
      </View>

      {/* Playlist Navigation (Issue #759) */}
      {playlist && playlist.count > 1 && (
        <View style={[styles.playlistNav, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <TouchableOpacity
            style={[styles.playlistNavButton, !prevLick && styles.playlistNavButtonDisabled]}
            onPress={() => navigateToLick(prevLick)}
            disabled={!prevLick}
            accessibilityLabel="Previous lick"
          >
            <Text style={[styles.playlistNavArrow, { color: prevLick ? theme.primary : theme.secondaryText }]}>
              ⏮️
            </Text>
            <Text style={[styles.playlistNavLabel, { color: theme.secondaryText }]}>
              Previous
            </Text>
          </TouchableOpacity>

          <View style={styles.playlistNavCenter}>
            <Text style={[styles.playlistNavPosition, { color: theme.text }]}>
              Lick {currentPosition} of {playlist.count}
            </Text>
            <Text style={[styles.playlistNavDrummer, { color: theme.secondaryText }]}>
              {playlist.drummerName}'s Playlist
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.playlistNavButton, !nextLick && styles.playlistNavButtonDisabled]}
            onPress={() => navigateToLick(nextLick)}
            disabled={!nextLick}
            accessibilityLabel="Next lick"
          >
            <Text style={[styles.playlistNavArrow, { color: nextLick ? theme.primary : theme.secondaryText }]}>
              ⏭️
            </Text>
            <Text style={[styles.playlistNavLabel, { color: theme.secondaryText }]}>
              Next
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Header Section */}
      <View style={styles.detailHeader}>
        <Text style={[styles.detailTitle, { color: theme.text }]}>{lick.name}</Text>
        <Text style={[styles.detailSubtitle, { color: theme.secondaryText }]}>
          {lick.drummerName} • {lick.band}
        </Text>
        <Text style={[styles.detailSong, { color: theme.primary }]}>
          🎵 {lick.song} from {lick.album}
        </Text>

        <View style={styles.detailBadges}>
          <DifficultyBadge difficulty={lick.difficulty} rating={lick.difficultyRating} theme={theme} />
          <BpmBadge bpm={lick.bpm} theme={theme} />
          <View style={[styles.timeSigBadge, { backgroundColor: theme.card }]}>
            <Text style={[styles.timeSigText, { color: theme.text }]}>🎼 {lick.timeSignature}</Text>
          </View>
        </View>
      </View>

      {/* Main Video (only when a primary video exists) */}
      {lick.video && lick.video.youtubeId && (
        <View style={styles.videoSection}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>📹 Watch & Learn</Text>
          <YouTubeEmbed
            videoId={lick.video.youtubeId}
            title={lick.video.title}
            theme={theme}
            startTime={lick.video.startTime}
            endTime={lick.video.endTime}
          />
          <Text style={[styles.videoDescription, { color: theme.secondaryText }]}>
            {lick.video.description}
          </Text>
        </View>
      )}

      {/* Description */}
      <View style={[styles.section, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>📖 About This Lick</Text>
        <Text style={[styles.descriptionText, { color: theme.text }]}>{lick.description}</Text>
      </View>

      {/* Technique Details */}
      <View style={[styles.section, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>🎯 Technique Breakdown</Text>

        <View style={styles.techniquesList}>
          <Text style={[styles.techniquesLabel, { color: theme.secondaryText }]}>Key Techniques:</Text>
          <View style={styles.techniquesRow}>
            {lick.techniques.map(t => (
              <TouchableOpacity
                key={t}
                style={[styles.techniquePillLarge, { backgroundColor: theme.primary + '20', borderColor: theme.primary }]}
                onPress={() => {
                  if (Platform.OS === 'web') {
                    window.history.pushState({}, '', `/techniques/${t}`);
                    window.dispatchEvent(new PopStateEvent('popstate'));
                  }
                }}
              >
                <Text style={[styles.techniquePillLargeText, { color: theme.primary }]}>
                  {t.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.detailsList}>
          {lick.techniqueDetails.map((detail, index) => (
            <View key={index} style={styles.detailItem}>
              <Text style={[styles.detailBullet, { color: theme.primary }]}>•</Text>
              <Text style={[styles.detailItemText, { color: theme.text }]}>{detail}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Learning Tips */}
      <View style={[styles.section, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>💡 Practice Tips</Text>
        <View style={styles.tipsList}>
          {lick.learningTips.map((tip, index) => (
            <View key={index} style={styles.tipItem}>
              <Text style={[styles.tipNumber, { backgroundColor: theme.primary }]}>{index + 1}</Text>
              <Text style={[styles.tipText, { color: theme.text }]}>{tip}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Tutorial Video (if available) */}
      {lick.tutorial && lick.tutorial.youtubeId && (
        <View style={styles.videoSection}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>🎓 Tutorial Video</Text>
          <YouTubeEmbed
            videoId={lick.tutorial.youtubeId}
            title={lick.tutorial.title}
            theme={theme}
            startTime={lick.tutorial.startTime}
          />
          <Text style={[styles.videoDescription, { color: theme.secondaryText }]}>
            {lick.tutorial.description}
          </Text>
        </View>
      )}

      {/* Gear Used */}
      <View style={[styles.section, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>🥁 Gear Used</Text>
        <View style={styles.gearList}>
          {lick.gearUsed.map((gear, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.gearItem, gear.link && styles.gearItemClickable, { borderColor: theme.border }]}
              onPress={() => gear.link && handleGearClick(gear)}
              disabled={!gear.link}
            >
              <View style={styles.gearIcon}>
                <Text style={{ fontSize: 20 }}>
                  {gear.type === 'snare' ? '🥁' :
                   gear.type === 'drums' ? '🪘' :
                   gear.type === 'cymbals' ? '🔔' :
                   gear.type === 'pedals' ? '🦶' :
                   gear.type === 'sticks' ? '🥢' : '🎛️'}
                </Text>
              </View>
              <View style={styles.gearInfo}>
                <Text style={[styles.gearName, { color: theme.text }]}>{gear.name}</Text>
                <Text style={[styles.gearType, { color: theme.secondaryText }]}>
                  {gear.type.charAt(0).toUpperCase() + gear.type.slice(1)}
                </Text>
              </View>
              {gear.link && (
                <Text style={[styles.gearArrow, { color: theme.primary }]}>→</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Related Licks */}
      {relatedLicks.length > 0 && (
        <View style={styles.relatedSection}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            More from {lick.drummerName}
          </Text>
          <View style={styles.relatedGrid}>
            {relatedLicks.map(related => (
              <LickCard
                key={related.slug}
                lick={related}
                theme={theme}
                onPress={() => {
                  if (Platform.OS === 'web') {
                    window.history.pushState({}, '', `/drummers/${related.drummerSlug}/licks/${related.slug}`);
                    window.dispatchEvent(new PopStateEvent('popstate'));
                  }
                }}
                isMobile={isMobile}
              />
            ))}
          </View>
        </View>
      )}

      {/* Related Techniques — lick → technique hub cross-link (Issue #1272) */}
      {relatedTechniqueObjects.length > 0 && (
        <View style={[styles.section, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>🔗 Related Techniques</Text>
          <View style={styles.techniquesRow}>
            {relatedTechniqueObjects.map(technique => {
              const label = `See all ${technique.title} drummers`;
              if (Platform.OS === 'web') {
                return (
                  <a
                    key={technique.slug}
                    href={`/technique/${technique.slug}/drummers`}
                    aria-label={label}
                    style={{ textDecoration: 'none' }}
                  >
                    <View style={[styles.techniquePillLarge, { backgroundColor: theme.primary + '20', borderColor: theme.primary }]}>
                      <Text style={[styles.techniquePillLargeText, { color: theme.primary }]}>{label} →</Text>
                    </View>
                  </a>
                );
              }
              return (
                <TouchableOpacity
                  key={technique.slug}
                  style={[styles.techniquePillLarge, { backgroundColor: theme.primary + '20', borderColor: theme.primary }]}
                  onPress={() => {
                    window.history.pushState({}, '', `/technique/${technique.slug}/drummers`);
                    window.dispatchEvent(new PopStateEvent('popstate'));
                  }}
                  accessibilityRole="link"
                  accessibilityLabel={label}
                >
                  <Text style={[styles.techniquePillLargeText, { color: theme.primary }]}>{label} →</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      )}

      {/* Share Section */}
      <View style={[styles.shareSection, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <Text style={[styles.shareSectionTitle, { color: theme.text }]}>
          🤘 Found this helpful? Share it!
        </Text>
        <View style={styles.shareButtons}>
          <TouchableOpacity
            style={[styles.shareButton, { backgroundColor: '#1DA1F2' }]}
            onPress={() => {
              const url = `https://metalforge.io/drummers/${lick.drummerSlug}/licks/${lick.slug}`;
              const text = `Learning ${lick.name} by ${lick.drummerName} 🥁 Check it out:`;
              Linking.openURL(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`);
            }}
          >
            <Text style={styles.shareButtonText}>Twitter</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.shareButton, { backgroundColor: '#E4405F' }]}
            onPress={() => {
              const url = `https://metalforge.io/drummers/${lick.drummerSlug}/licks/${lick.slug}`;
              // Instagram doesn't support direct share, copy to clipboard
              if (Platform.OS === 'web' && navigator.clipboard) {
                navigator.clipboard.writeText(url);
                alert('Link copied! Share it on Instagram.');
              }
            }}
          >
            <Text style={styles.shareButtonText}>Copy Link</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

// ==========================================
// Styles
// ==========================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: spacing.xl * 2,
  },
  header: {
    padding: spacing.lg,
    paddingTop: spacing.xl,
  },
  backButton: {
    marginBottom: spacing.md,
  },
  backText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
  },
  pageTitle: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    marginBottom: spacing.xs,
  },
  pageSubtitle: {
    fontSize: fontSize.md,
    lineHeight: lineHeight.relaxed,
  },

  // Breadcrumb
  breadcrumb: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    paddingBottom: spacing.sm,
  },
  breadcrumbLink: {
    fontSize: fontSize.sm,
  },
  breadcrumbSeparator: {
    fontSize: fontSize.sm,
    marginHorizontal: spacing.xs,
  },
  breadcrumbCurrent: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },

  // Filter Bar
  introBlock: {
    margin: spacing.lg,
    marginTop: 0,
    padding: spacing.md,
    borderRadius: 12,
    borderWidth: 1,
  },
  introText: {
    fontSize: fontSize.md,
    lineHeight: lineHeight.relaxed,
    marginBottom: spacing.md,
  },
  filterBar: {
    margin: spacing.lg,
    marginTop: 0,
    padding: spacing.md,
    borderRadius: 12,
    borderWidth: 1,
  },
  filterTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    marginBottom: spacing.md,
  },
  filterRow: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  filterRowMobile: {
    flexDirection: 'column',
    gap: spacing.md,
  },
  filterGroup: {
    flex: 1,
  },
  filterLabel: {
    fontSize: fontSize.sm,
    marginBottom: spacing.xs,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  filterChip: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  filterChipActive: {
    backgroundColor: '#dc2626',
  },
  filterChipText: {
    fontSize: fontSize.sm,
    color: '#9ca3af',
  },
  filterChipTextActive: {
    color: '#fff',
    fontWeight: fontWeight.medium,
  },

  // Lick Cards
  licksGrid: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  lickCard: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  lickCardContent: {
    flexDirection: 'row',
    padding: spacing.md,
    gap: spacing.md,
  },
  lickCardThumbnail: {
    width: 120,
    height: 80,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  lickCardImage: {
    width: '100%',
    height: '100%',
  },
  lickCardPlayIcon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -10 }, { translateY: -10 }],
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 4,
  },
  lickCardInfo: {
    flex: 1,
  },
  lickCardTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    marginBottom: spacing.xs / 2,
  },
  lickCardSubtitle: {
    fontSize: fontSize.sm,
    marginBottom: spacing.sm,
  },
  lickCardMeta: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  lickCardTechniques: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },

  // Badges
  difficultyBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
  },
  difficultyText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
  },
  bpmBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
  },
  bpmText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
  },
  timeSigBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: 4,
  },
  timeSigText: {
    fontSize: fontSize.xs,
  },
  techniquePill: {
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: 4,
  },
  techniquePillText: {
    fontSize: fontSize.xs,
    textTransform: 'capitalize',
  },
  techniquePillLarge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 8,
    borderWidth: 1,
  },
  techniquePillLargeText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },

  // Drummer Section (grouped view)
  drummerSection: {
    marginBottom: spacing.xl,
  },
  drummerSectionTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xs / 2,
  },
  drummerSectionSubtitle: {
    fontSize: fontSize.sm,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },

  // Detail Page
  detailHeader: {
    padding: spacing.lg,
    paddingTop: 0,
  },
  detailTitle: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    marginBottom: spacing.xs,
  },
  detailSubtitle: {
    fontSize: fontSize.lg,
    marginBottom: spacing.xs,
  },
  detailSong: {
    fontSize: fontSize.md,
    marginBottom: spacing.md,
  },
  detailBadges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },

  // Video Section
  videoSection: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  videoContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: spacing.sm,
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
  youtubePlayButton: {
    width: 68,
    height: 48,
  },
  playIcon: {
    fontSize: 48,
  },
  timestampBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  timestampText: {
    color: '#fff',
    fontSize: 12,
  },
  videoDescription: {
    fontSize: fontSize.sm,
    fontStyle: 'italic',
  },

  // Sections
  section: {
    margin: spacing.lg,
    marginTop: 0,
    padding: spacing.lg,
    borderRadius: 12,
    borderWidth: 1,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    marginBottom: spacing.md,
  },
  descriptionText: {
    fontSize: fontSize.md,
    lineHeight: lineHeight.relaxed,
  },

  // Techniques
  techniquesList: {
    marginBottom: spacing.md,
  },
  techniquesLabel: {
    fontSize: fontSize.sm,
    marginBottom: spacing.sm,
  },
  techniquesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  detailsList: {
    gap: spacing.sm,
  },
  detailItem: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  detailBullet: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
  },
  detailItemText: {
    flex: 1,
    fontSize: fontSize.md,
    lineHeight: lineHeight.relaxed,
  },

  // Tips
  tipsList: {
    gap: spacing.md,
  },
  tipItem: {
    flexDirection: 'row',
    gap: spacing.md,
    alignItems: 'flex-start',
  },
  tipNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    textAlign: 'center',
    lineHeight: 24,
    color: '#fff',
    fontWeight: fontWeight.bold,
    fontSize: fontSize.sm,
  },
  tipText: {
    flex: 1,
    fontSize: fontSize.md,
    lineHeight: lineHeight.relaxed,
  },

  // Gear
  gearList: {
    gap: spacing.sm,
  },
  gearItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: 8,
    borderWidth: 1,
    gap: spacing.md,
  },
  gearItemClickable: {
    cursor: 'pointer',
  },
  gearIcon: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gearInfo: {
    flex: 1,
  },
  gearName: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
  },
  gearType: {
    fontSize: fontSize.sm,
  },
  gearArrow: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
  },

  // Related Licks
  relatedSection: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing.lg,
  },
  relatedGrid: {
    gap: spacing.md,
  },

  // Share
  shareSection: {
    margin: spacing.lg,
    padding: spacing.lg,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  shareSectionTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  shareButtons: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  shareButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 8,
  },
  shareButtonText: {
    color: '#fff',
    fontWeight: fontWeight.semibold,
    fontSize: fontSize.sm,
  },

  // Empty State
  emptyState: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: fontSize.md,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  resetButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 8,
  },
  resetButtonText: {
    color: '#fff',
    fontWeight: fontWeight.semibold,
  },

  // Discovery Actions (Issue #759)
  discoveryActions: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  discoveryActionsMobile: {
    flexDirection: 'column',
  },
  discoveryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: 12,
    flex: 1,
    justifyContent: 'center',
  },
  playlistButton: {
    borderWidth: 2,
    backgroundColor: 'transparent',
  },
  discoveryButtonEmoji: {
    fontSize: 20,
  },
  discoveryButtonText: {
    color: '#fff',
    fontWeight: fontWeight.bold,
    fontSize: fontSize.md,
  },
  playlistDuration: {
    fontSize: fontSize.xs,
    marginTop: 2,
  },

  // Playlist Navigation (Issue #759)
  playlistNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    padding: spacing.md,
    borderRadius: 12,
    borderWidth: 1,
  },
  playlistNavButton: {
    alignItems: 'center',
    padding: spacing.sm,
    minWidth: 70,
  },
  playlistNavButtonDisabled: {
    opacity: 0.4,
  },
  playlistNavArrow: {
    fontSize: 24,
    marginBottom: 2,
  },
  playlistNavLabel: {
    fontSize: fontSize.xs,
  },
  playlistNavCenter: {
    alignItems: 'center',
    flex: 1,
  },
  playlistNavPosition: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
  },
  playlistNavDrummer: {
    fontSize: fontSize.xs,
    marginTop: 2,
  },
});

// ==========================================
// Lick of the Day Widget (Issue #759)
// Homepage widget showing daily featured lick
// ==========================================

export function LickOfTheDayWidget({ theme, onNavigate }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const lickOfTheDay = useMemo(() => getLickOfTheDay(), []);
  const dateString = useMemo(() => getLickOfTheDayDate(), []);

  if (!lickOfTheDay) return null;

  const thumbId = getLickThumbId(lickOfTheDay);
  const thumbnailUrl = thumbId ? `https://i.ytimg.com/vi/${thumbId}/mqdefault.jpg` : null;

  const handlePress = useCallback(() => {
    // Track GA4 event
    if (Platform.OS === 'web' && typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'lick_of_the_day_click', {
        lick_name: lickOfTheDay.name,
        drummer: lickOfTheDay.drummerName,
        difficulty: lickOfTheDay.difficulty,
        date: dateString,
      });
    }

    if (onNavigate) {
      onNavigate(lickOfTheDay);
    } else if (Platform.OS === 'web') {
      window.history.pushState({}, '', `/drummers/${lickOfTheDay.drummerSlug}/licks/${lickOfTheDay.slug}`);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  }, [lickOfTheDay, onNavigate, dateString]);

  return (
    <View style={[lickOfTheDayStyles.container, { backgroundColor: 'transparent' }]}>
      <View style={lickOfTheDayStyles.header}>
        <Text style={[lickOfTheDayStyles.title, { color: theme.text }]} accessibilityRole="header">
          🥁 Lick of the Day
        </Text>
        <Text style={[lickOfTheDayStyles.date, { color: theme.secondaryText }]}>
          {dateString}
        </Text>
      </View>

      <TouchableOpacity
        style={[lickOfTheDayStyles.card, { backgroundColor: theme.card, borderColor: theme.border }]}
        onPress={handlePress}
        accessibilityLabel={`Today's lick: ${lickOfTheDay.name} by ${lickOfTheDay.drummerName}`}
      >
        {/* Video Thumbnail */}
        <View style={lickOfTheDayStyles.thumbnailContainer}>
          {thumbnailUrl ? (
            <Image
              source={{ uri: thumbnailUrl }}
              style={lickOfTheDayStyles.thumbnail}
              contentFit="cover"
              accessibilityLabel={`${lickOfTheDay.name} by ${lickOfTheDay.drummerName} - Lick of the Day`}
            />
          ) : (
            <View style={[lickOfTheDayStyles.thumbnail, { backgroundColor: theme.border, alignItems: 'center', justifyContent: 'center' }]}>
              <Text style={{ fontSize: 40 }}>🥁</Text>
            </View>
          )}
          <View style={lickOfTheDayStyles.playOverlay}>
            <View style={lickOfTheDayStyles.playButton}>
              <Text style={{ fontSize: 28 }}>▶️</Text>
            </View>
          </View>
          <View style={[lickOfTheDayStyles.difficultyTag, { backgroundColor: getDifficultyColor(lickOfTheDay.difficulty) }]}>
            <Text style={lickOfTheDayStyles.difficultyTagText}>
              {lickOfTheDay.difficulty.toUpperCase()}
            </Text>
          </View>
        </View>

        {/* Lick Info */}
        <View style={lickOfTheDayStyles.info}>
          <Text style={[lickOfTheDayStyles.lickName, { color: theme.text }]} numberOfLines={2}>
            {lickOfTheDay.name}
          </Text>
          <Text style={[lickOfTheDayStyles.drummerInfo, { color: theme.secondaryText }]}>
            {lickOfTheDay.drummerName} • {lickOfTheDay.band}
          </Text>
          <Text style={[lickOfTheDayStyles.songInfo, { color: theme.primary }]}>
            🎵 {lickOfTheDay.song}
          </Text>

          <View style={lickOfTheDayStyles.meta}>
            <View style={[lickOfTheDayStyles.metaBadge, { backgroundColor: theme.primary + '20' }]}>
              <Text style={[lickOfTheDayStyles.metaText, { color: theme.primary }]}>
                {lickOfTheDay.bpmDisplay}
              </Text>
            </View>
            <View style={[lickOfTheDayStyles.metaBadge, { backgroundColor: theme.primary + '20' }]}>
              <Text style={[lickOfTheDayStyles.metaText, { color: theme.primary }]}>
                {lickOfTheDay.timeSignature}
              </Text>
            </View>
          </View>

          <View style={[lickOfTheDayStyles.cta, { backgroundColor: theme.primary }]}>
            <Text style={lickOfTheDayStyles.ctaText}>Learn This Lick →</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

// Helper function for difficulty colors
function getDifficultyColor(difficulty) {
  const colors = {
    beginner: '#22c55e',
    intermediate: '#eab308',
    advanced: '#f97316',
    expert: '#ef4444',
  };
  return colors[difficulty] || '#9ca3af';
}

// Styles for Lick of the Day widget
const lickOfTheDayStyles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    marginVertical: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  title: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
  },
  date: {
    fontSize: fontSize.sm,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  thumbnailContainer: {
    position: 'relative',
    width: '100%',
    aspectRatio: 16 / 9,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  playOverlay: {
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
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  difficultyTag: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 4,
  },
  difficultyTagText: {
    color: '#fff',
    fontSize: fontSize.xs,
    fontWeight: fontWeight.bold,
  },
  info: {
    padding: spacing.lg,
  },
  lickName: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    marginBottom: spacing.xs,
  },
  drummerInfo: {
    fontSize: fontSize.md,
    marginBottom: spacing.xs / 2,
  },
  songInfo: {
    fontSize: fontSize.sm,
    marginBottom: spacing.md,
  },
  meta: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  metaBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 4,
  },
  metaText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
  },
  cta: {
    paddingVertical: spacing.sm,
    borderRadius: 8,
    alignItems: 'center',
  },
  ctaText: {
    color: '#fff',
    fontWeight: fontWeight.bold,
    fontSize: fontSize.md,
  },
});

export default {
  LicksHubPage,
  LicksIndexPage,
  LickDetailPage,
  LickOfTheDayWidget,
  isLicksHubPage,
  isLicksIndexPage,
  isLickDetailPage,
  isLicksPage,
  getDrummerSlugFromLicksURL,
  getLickSlugFromURL,
  updateLickMeta,
  updateLicksHubMeta,
  updateLicksIndexMeta,
};
