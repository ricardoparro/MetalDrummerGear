/**
 * GearCardsGallery Component - Issue #747
 * Auto-Generated Drummer Gear Cards for Viral Social Sharing
 * 
 * Features:
 * - Gallery of all drummer gear cards
 * - Multiple card formats (Instagram, Twitter)
 * - Multiple card types (Full, Stats, Spotlight)
 * - Download button with analytics tracking
 * - Social sharing integration
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Linking, Platform, useWindowDimensions } from 'react-native';
import { Image } from 'expo-image';
import { colors } from '../colors';
import { spacing } from '../spacing';
import { fontSize, fontWeight, textStyles } from '../typography';

// Analytics tracking
export function trackCardEvent(action, cardSlug, cardType, format) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: 'gear_cards',
      event_label: `${cardSlug}_${cardType}_${format}`,
      card_slug: cardSlug,
      card_type: cardType,
      card_format: format,
    });
  }
}

// URL helpers
export function isGearCardsPage() {
  if (typeof window === 'undefined') return false;
  const path = window.location.pathname;
  return path === '/cards' || path === '/gear-cards';
}

export function updateGearCardsMeta() {
  if (typeof document === 'undefined') return;
  
  const title = 'Drummer Gear Cards - Share Your Favorite Metal Drummer Setup | MetalForge';
  const description = 'Download and share auto-generated gear cards for 21 legendary metal drummers. Instagram-ready, Twitter-optimized visuals featuring complete kit setups and stats.';
  
  document.title = title;
  
  const metaTags = {
    'og:title': title,
    'og:description': description,
    'og:type': 'website',
    'og:url': 'https://metalforge.io/cards',
    'og:image': 'https://metalforge.io/api/card/joey-jordison?format=twitter',
    'twitter:card': 'summary_large_image',
    'twitter:title': title,
    'twitter:description': description,
    'twitter:image': 'https://metalforge.io/api/card/joey-jordison?format=twitter',
  };
  
  Object.entries(metaTags).forEach(([property, content]) => {
    let meta = document.querySelector(`meta[property="${property}"]`) || 
               document.querySelector(`meta[name="${property}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute(property.startsWith('og:') ? 'property' : 'name', property);
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);
  });
}

// Card data
const CARD_DRUMMERS = [
  { slug: 'lars-ulrich', name: 'Lars Ulrich', band: 'Metallica', genre: 'Thrash Metal', stats: { pieces: 42, cost: 27450 } },
  { slug: 'joey-jordison', name: 'Joey Jordison', band: 'Slipknot', genre: 'Nu Metal', stats: { pieces: 38, cost: 24800 } },
  { slug: 'gene-hoglan', name: 'Gene Hoglan', band: 'Testament', genre: 'Death/Thrash Metal', stats: { pieces: 45, cost: 28200 } },
  { slug: 'dave-lombardo', name: 'Dave Lombardo', band: 'Slayer', genre: 'Thrash Metal', stats: { pieces: 40, cost: 26500 } },
  { slug: 'tomas-haake', name: 'Tomas Haake', band: 'Meshuggah', genre: 'Progressive Metal', stats: { pieces: 35, cost: 32500 } },
  { slug: 'danny-carey', name: 'Danny Carey', band: 'Tool', genre: 'Progressive Metal', stats: { pieces: 48, cost: 45000 } },
  { slug: 'chris-adler', name: 'Chris Adler', band: 'Lamb of God', genre: 'Groove Metal', stats: { pieces: 32, cost: 18500 } },
  { slug: 'george-kollias', name: 'George Kollias', band: 'Nile', genre: 'Death Metal', stats: { pieces: 36, cost: 22800 } },
  { slug: 'mike-portnoy', name: 'Mike Portnoy', band: 'Dream Theater', genre: 'Progressive Metal', stats: { pieces: 55, cost: 38000 } },
  { slug: 'vinnie-paul', name: 'Vinnie Paul', band: 'Pantera', genre: 'Groove Metal', stats: { pieces: 44, cost: 28500 } },
  { slug: 'charlie-benante', name: 'Charlie Benante', band: 'Anthrax', genre: 'Thrash Metal', stats: { pieces: 38, cost: 25800 } },
  { slug: 'igor-cavalera', name: 'Igor Cavalera', band: 'Sepultura', genre: 'Thrash/Groove Metal', stats: { pieces: 28, cost: 18000 } },
  { slug: 'nicko-mcbrain', name: 'Nicko McBrain', band: 'Iron Maiden', genre: 'Heavy Metal', stats: { pieces: 42, cost: 35000 } },
  { slug: 'abe-cunningham', name: 'Abe Cunningham', band: 'Deftones', genre: 'Alternative Metal', stats: { pieces: 30, cost: 24000 } },
  { slug: 'brann-dailor', name: 'Brann Dailor', band: 'Mastodon', genre: 'Progressive Metal', stats: { pieces: 34, cost: 28000 } },
  { slug: 'mario-duplantier', name: 'Mario Duplantier', band: 'Gojira', genre: 'Progressive Death Metal', stats: { pieces: 32, cost: 19500 } },
  { slug: 'eloy-casagrande', name: 'Eloy Casagrande', band: 'Sepultura/Slipknot', genre: 'Thrash/Nu Metal', stats: { pieces: 38, cost: 26500 } },
  { slug: 'inferno', name: 'Inferno', band: 'Behemoth', genre: 'Black/Death Metal', stats: { pieces: 40, cost: 28000 } },
  { slug: 'flo-mounier', name: 'Flo Mounier', band: 'Cryptopsy', genre: 'Technical Death Metal', stats: { pieces: 35, cost: 22000 } },
  { slug: 'hellhammer', name: 'Hellhammer', band: 'Mayhem', genre: 'Black Metal', stats: { pieces: 36, cost: 21500 } },
  { slug: 'pete-sandoval', name: 'Pete Sandoval', band: 'Morbid Angel', genre: 'Death Metal', stats: { pieces: 38, cost: 24000 } },
];

const CARD_TYPES = [
  { id: 'full', label: 'Full Setup', description: 'Complete gear list with stats' },
  { id: 'stats', label: 'Stats Card', description: 'Quick stats overview' },
  { id: 'spotlight', label: 'Spotlight', description: 'Focus on signature gear' },
];

const CARD_FORMATS = [
  { id: 'instagram', label: 'Instagram', dimensions: '1080×1080', icon: '📸' },
  { id: 'twitter', label: 'Twitter/X', dimensions: '1200×675', icon: '🐦' },
];

// Format currency
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Get card URL
function getCardUrl(slug, type = 'full', format = 'instagram') {
  const baseUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/api/card/${slug}`
    : `https://metalforge.io/api/card/${slug}`;
  
  const params = new URLSearchParams();
  if (type !== 'full') params.set('type', type);
  if (format !== 'instagram') params.set('format', format);
  
  return params.toString() ? `${baseUrl}?${params}` : baseUrl;
}

// Download card
async function downloadCard(slug, name, type, format) {
  try {
    trackCardEvent('download', slug, type, format);
    
    const url = getCardUrl(slug, type, format);
    const response = await fetch(url);
    const blob = await response.blob();
    
    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `${slug}-gear-card-${type}-${format}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    console.error('Failed to download card:', error);
    // Fallback: open in new tab
    window.open(getCardUrl(slug, type, format), '_blank');
  }
}

// Share card
function shareCard(slug, name, type, format) {
  trackCardEvent('share', slug, type, format);
  
  const cardUrl = getCardUrl(slug, type, format);
  const shareText = `Check out ${name}'s complete drum setup! 🥁🔥 #MetalForge #DrumGear`;
  const shareUrl = `https://metalforge.io/drummer/${slug}`;
  
  if (Platform.OS === 'web' && navigator.share) {
    navigator.share({
      title: `${name} Gear Card - MetalForge`,
      text: shareText,
      url: shareUrl,
    }).catch(() => {});
  } else {
    // Fallback to Twitter
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    Linking.openURL(twitterUrl);
  }
}

// Individual Card Preview Component
function CardPreview({ drummer, selectedType, selectedFormat, onDownload, onShare }) {
  const cardUrl = getCardUrl(drummer.slug, selectedType, selectedFormat);
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  
  // Calculate preview dimensions
  const previewWidth = isMobile ? width - 40 : Math.min(400, (width - 100) / 3);
  const aspectRatio = selectedFormat === 'twitter' ? 1200/675 : 1;
  const previewHeight = previewWidth / aspectRatio;
  
  return (
    <View style={[styles.cardPreview, { width: previewWidth }]}>
      {/* Card Image */}
      <View style={[styles.cardImageContainer, { height: previewHeight }]}>
        <Image
          source={{ uri: cardUrl }}
          style={styles.cardImage}
          contentFit="cover"
          transition={200}
          accessibilityLabel={`${drummer.name} gear card`}
        />
      </View>
      
      {/* Card Info */}
      <View style={styles.cardInfo}>
        <Text style={styles.cardName}>{drummer.name}</Text>
        <Text style={styles.cardBand}>{drummer.band}</Text>
        <View style={styles.cardStats}>
          <Text style={styles.cardStat}>🥁 {drummer.stats.pieces} pieces</Text>
          <Text style={styles.cardStat}>💰 {formatCurrency(drummer.stats.cost)}</Text>
        </View>
      </View>
      
      {/* Action Buttons */}
      <View style={styles.cardActions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.downloadButton]}
          onPress={() => onDownload(drummer.slug, drummer.name, selectedType, selectedFormat)}
          accessibilityLabel={`Download ${drummer.name} gear card`}
        >
          <Text style={styles.actionButtonText}>⬇️ Download</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.shareButton]}
          onPress={() => onShare(drummer.slug, drummer.name, selectedType, selectedFormat)}
          accessibilityLabel={`Share ${drummer.name} gear card`}
        >
          <Text style={styles.actionButtonText}>🔗 Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Main Gallery Component
export function GearCardsGalleryPage({ onClose }) {
  const [selectedType, setSelectedType] = useState('full');
  const [selectedFormat, setSelectedFormat] = useState('instagram');
  const [filter, setFilter] = useState('');
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  
  // Update meta on mount
  useEffect(() => {
    updateGearCardsMeta();
    trackCardEvent('page_view', 'gallery', 'all', 'all');
  }, []);
  
  // Filter drummers
  const filteredDrummers = useMemo(() => {
    if (!filter) return CARD_DRUMMERS;
    const lowerFilter = filter.toLowerCase();
    return CARD_DRUMMERS.filter(d => 
      d.name.toLowerCase().includes(lowerFilter) ||
      d.band.toLowerCase().includes(lowerFilter) ||
      d.genre.toLowerCase().includes(lowerFilter)
    );
  }, [filter]);
  
  const handleDownload = useCallback((slug, name, type, format) => {
    downloadCard(slug, name, type, format);
  }, []);
  
  const handleShare = useCallback((slug, name, type, format) => {
    shareCard(slug, name, type, format);
  }, []);
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>🎴 Drummer Gear Cards</Text>
          <Text style={styles.subtitle}>
            Auto-generated social cards for 21 metal legends
          </Text>
        </View>
      </View>
      
      {/* Filters */}
      <View style={styles.filtersSection}>
        {/* Card Type Selector */}
        <View style={styles.filterGroup}>
          <Text style={styles.filterLabel}>Card Type</Text>
          <View style={styles.filterOptions}>
            {CARD_TYPES.map(type => (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.filterOption,
                  selectedType === type.id && styles.filterOptionActive
                ]}
                onPress={() => setSelectedType(type.id)}
              >
                <Text style={[
                  styles.filterOptionText,
                  selectedType === type.id && styles.filterOptionTextActive
                ]}>
                  {type.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        {/* Format Selector */}
        <View style={styles.filterGroup}>
          <Text style={styles.filterLabel}>Format</Text>
          <View style={styles.filterOptions}>
            {CARD_FORMATS.map(format => (
              <TouchableOpacity
                key={format.id}
                style={[
                  styles.filterOption,
                  selectedFormat === format.id && styles.filterOptionActive
                ]}
                onPress={() => setSelectedFormat(format.id)}
              >
                <Text style={[
                  styles.filterOptionText,
                  selectedFormat === format.id && styles.filterOptionTextActive
                ]}>
                  {format.icon} {format.label}
                </Text>
                <Text style={styles.formatDimensions}>{format.dimensions}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        {/* Search Filter */}
        <View style={styles.searchContainer}>
          <Text style={styles.filterLabel}>Search</Text>
          <View style={styles.searchInput}>
            <Text style={styles.searchIcon}>🔍</Text>
            <input
              type="text"
              placeholder="Filter by name, band, or genre..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                border: 'none',
                color: '#ffffff',
                fontSize: 16,
                outline: 'none',
                width: '100%',
              }}
            />
          </View>
        </View>
      </View>
      
      {/* Cards Grid */}
      <View style={[styles.cardsGrid, isMobile && styles.cardsGridMobile]}>
        {filteredDrummers.map(drummer => (
          <CardPreview
            key={drummer.slug}
            drummer={drummer}
            selectedType={selectedType}
            selectedFormat={selectedFormat}
            onDownload={handleDownload}
            onShare={handleShare}
          />
        ))}
      </View>
      
      {/* Empty State */}
      {filteredDrummers.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateIcon}>🔍</Text>
          <Text style={styles.emptyStateText}>No drummers found</Text>
          <TouchableOpacity onPress={() => setFilter('')}>
            <Text style={styles.clearFilterText}>Clear filter</Text>
          </TouchableOpacity>
        </View>
      )}
      
      {/* Usage Tips */}
      <View style={styles.usageTips}>
        <Text style={styles.tipsTitle}>📱 Sharing Tips</Text>
        <View style={styles.tipsList}>
          <Text style={styles.tipItem}>• <Text style={styles.tipHighlight}>Instagram:</Text> Use 1080×1080 cards for feed posts</Text>
          <Text style={styles.tipItem}>• <Text style={styles.tipHighlight}>Twitter/X:</Text> Use 1200×675 cards for optimal timeline display</Text>
          <Text style={styles.tipItem}>• <Text style={styles.tipHighlight}>Stats Cards:</Text> Great for quick comparison shares</Text>
          <Text style={styles.tipItem}>• <Text style={styles.tipHighlight}>Full Setup:</Text> Perfect for detailed gear discussions</Text>
          <Text style={styles.tipItem}>• Tag <Text style={styles.tipHighlight}>@MetalDrumGear</Text> when sharing!</Text>
        </View>
      </View>
      
      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          🔥 Cards auto-generated from MetalForge drummer database
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    padding: spacing.md,
    paddingBottom: spacing.xl * 2,
  },
  header: {
    marginBottom: spacing.lg,
  },
  backButton: {
    marginBottom: spacing.sm,
  },
  backButtonText: {
    color: colors.primary,
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
  },
  titleContainer: {
    alignItems: 'center',
  },
  title: {
    ...textStyles.h1,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...textStyles.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  filtersSection: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.lg,
    gap: spacing.md,
  },
  filterGroup: {
    marginBottom: spacing.sm,
  },
  filterLabel: {
    ...textStyles.label,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  filterOption: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  filterOptionActive: {
    backgroundColor: 'rgba(255, 107, 53, 0.2)',
    borderColor: colors.primary,
  },
  filterOptionText: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },
  filterOptionTextActive: {
    color: colors.primary,
    fontWeight: fontWeight.bold,
  },
  formatDimensions: {
    color: colors.textMuted,
    fontSize: fontSize.xs,
    marginTop: 2,
  },
  searchContainer: {
    marginTop: spacing.sm,
  },
  searchInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  searchIcon: {
    marginRight: spacing.sm,
    fontSize: 16,
  },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    justifyContent: 'center',
  },
  cardsGridMobile: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  cardPreview: {
    backgroundColor: colors.card,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  cardImageContainer: {
    width: '100%',
    backgroundColor: '#0a0a0a',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardInfo: {
    padding: spacing.md,
  },
  cardName: {
    ...textStyles.h3,
    color: colors.text,
    marginBottom: 4,
  },
  cardBand: {
    ...textStyles.body,
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  cardStats: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  cardStat: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
  },
  cardActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  actionButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
  },
  downloadButton: {
    borderRightWidth: 1,
    borderRightColor: 'rgba(255, 255, 255, 0.1)',
  },
  shareButton: {},
  actionButtonText: {
    color: colors.text,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },
  emptyState: {
    alignItems: 'center',
    padding: spacing.xl,
  },
  emptyStateIcon: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  emptyStateText: {
    ...textStyles.h3,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  clearFilterText: {
    color: colors.primary,
    fontSize: fontSize.md,
  },
  usageTips: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: spacing.lg,
    marginTop: spacing.lg,
  },
  tipsTitle: {
    ...textStyles.h3,
    color: colors.text,
    marginBottom: spacing.md,
  },
  tipsList: {
    gap: spacing.xs,
  },
  tipItem: {
    ...textStyles.body,
    color: colors.textSecondary,
  },
  tipHighlight: {
    color: colors.primary,
    fontWeight: fontWeight.semibold,
  },
  footer: {
    alignItems: 'center',
    padding: spacing.lg,
    marginTop: spacing.lg,
  },
  footerText: {
    color: colors.textMuted,
    fontSize: fontSize.sm,
  },
});

export default GearCardsGalleryPage;
