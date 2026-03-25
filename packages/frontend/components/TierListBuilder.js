/**
 * TierListBuilder - Interactive drag-and-drop tier list maker
 * Issue #763: Metal Drummer Tier List Builder — Viral Community Ranking Tool
 * 
 * Features:
 * - Drag-and-drop interface (S/A/B/C/D/F tiers)
 * - All drummers as draggable cards (photo + name + band)
 * - Preset categories: Technical Skill, Influence, Speed, Showmanship, Custom
 * - Generate shareable PNG images (1080x1080)
 * - MetalForge branding (subtle watermark)
 * - Shareable URLs: /tier-list/[unique-id]
 * - Mobile-optimized touch interactions
 * - Dark metal theme with tier colors
 */

import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  useWindowDimensions,
  ScrollView,
  TextInput,
  Modal,
} from 'react-native';
import { Image } from 'expo-image';
import { colors } from '../colors';
import { fontSize, fontWeight, lineHeight } from '../typography';
import { spacing } from '../spacing';
import { injectWebApplicationSchema, TOOL_SCHEMAS } from '../utils/webApplicationSchema';

// ==========================================
// TIER CONFIGURATION
// ==========================================

export const TIER_CONFIG = {
  S: { label: 'S', color: '#ff7f7f', textColor: '#000000', description: 'God Tier' },
  A: { label: 'A', color: '#ffbf7f', textColor: '#000000', description: 'Excellent' },
  B: { label: 'B', color: '#ffdf7f', textColor: '#000000', description: 'Great' },
  C: { label: 'C', color: '#ffff7f', textColor: '#000000', description: 'Good' },
  D: { label: 'D', color: '#bfff7f', textColor: '#000000', description: 'Average' },
  F: { label: 'F', color: '#7fbfff', textColor: '#000000', description: 'Below Average' },
};

export const TIER_ORDER = ['S', 'A', 'B', 'C', 'D', 'F'];

// ==========================================
// PRESET CATEGORIES
// ==========================================

export const PRESET_CATEGORIES = [
  { id: 'custom', name: 'Custom', emoji: '🎨', description: 'Create your own tier list' },
  { id: 'technical', name: 'Technical Skill', emoji: '🎯', description: 'Raw technical ability' },
  { id: 'influence', name: 'Influence', emoji: '🌟', description: 'Impact on drumming' },
  { id: 'speed', name: 'Speed', emoji: '⚡', description: 'Pure velocity' },
  { id: 'showmanship', name: 'Showmanship', emoji: '🎭', description: 'Stage presence' },
  { id: 'versatility', name: 'Versatility', emoji: '🎪', description: 'Range of styles' },
  { id: 'power', name: 'Power', emoji: '💪', description: 'Hard-hitting ability' },
];

// ==========================================
// GA4 EVENT TRACKING
// ==========================================

export const trackTierListEvent = (action, params = {}) => {
  if (Platform.OS === 'web' && typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', `tier_list_${action}`, params);
  }
};

// ==========================================
// URL & SHARING UTILITIES
// ==========================================

const generateUniqueId = () => {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let id = '';
  for (let i = 0; i < 8; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
};

export const getTierListShareUrl = (id) => {
  return `https://metalforge.io/tier-list/${id}`;
};

export const getShareText = (category) => {
  const categoryName = PRESET_CATEGORIES.find(c => c.id === category)?.name || 'Custom';
  return `Check out my Metal Drummer ${categoryName} Tier List! 🤘🥁`;
};

// ==========================================
// META TAG UPDATES
// ==========================================

export const updateTierListMeta = (category = 'custom') => {
  if (Platform.OS !== 'web' || typeof document === 'undefined') return;
  
  const categoryInfo = PRESET_CATEGORIES.find(c => c.id === category) || PRESET_CATEGORIES[0];
  const title = `Metal Drummer Tier List: ${categoryInfo.name} | MetalForge`;
  const description = `Create and share your metal drummer tier list. ${categoryInfo.description}. Drag and drop to rank the best drummers in metal!`;
  
  document.title = title;
  
  // Update meta tags
  const metaTags = {
    'description': description,
    'og:title': title,
    'og:description': description,
    'og:type': 'website',
    'og:url': 'https://metalforge.io/tools/tier-list',
    'og:image': 'https://metalforge.io/images/og/tier-list.png',
    'twitter:card': 'summary_large_image',
    'twitter:title': title,
    'twitter:description': description,
  };
  
  Object.entries(metaTags).forEach(([name, content]) => {
    const selector = name.startsWith('og:') || name.startsWith('twitter:')
      ? `meta[property="${name}"]`
      : `meta[name="${name}"]`;
    let meta = document.querySelector(selector);
    if (meta) {
      meta.setAttribute('content', content);
    }
  });
  
  // Inject WebApplication schema for SEO (Issue #778)
  injectWebApplicationSchema({
    ...TOOL_SCHEMAS.tierList,
    description: description, // Use dynamic description based on category
  });
};

// ==========================================
// CHECK IF ON TIER LIST PAGE
// ==========================================

export const isTierListPage = () => {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return false;
  const pathname = window.location.pathname;
  return pathname === '/tools/tier-list' || 
         pathname === '/tools/tier-list/' ||
         pathname.startsWith('/tier-list/');
};

export const isTierListSharePage = () => {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return false;
  return window.location.pathname.startsWith('/tier-list/') && 
         window.location.pathname !== '/tier-list/';
};

export const getTierListIdFromUrl = () => {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return null;
  const match = window.location.pathname.match(/^\/tier-list\/([a-z0-9]+)$/);
  return match ? match[1] : null;
};

// ==========================================
// DRUMMER CARD COMPONENT
// ==========================================

function DrummerCard({ drummer, isDragging, onDragStart, onDragEnd, onTouchStart, onTouchMove, onTouchEnd, compact }) {
  const cardRef = useRef(null);
  
  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', drummer.id.toString());
    e.dataTransfer.effectAllowed = 'move';
    onDragStart?.(drummer.id);
  };
  
  const handleDragEnd = (e) => {
    onDragEnd?.();
  };
  
  const handleTouchStart = (e) => {
    onTouchStart?.(e, drummer.id);
  };
  
  return (
    <div
      ref={cardRef}
      draggable={Platform.OS === 'web'}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onTouchStart={handleTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      style={{
        ...styles.drummerCard,
        ...(compact ? styles.drummerCardCompact : {}),
        opacity: isDragging ? 0.5 : 1,
        cursor: 'grab',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        touchAction: 'none',
      }}
    >
      <Image
        source={{ uri: drummer.image }}
        style={compact ? styles.drummerImageCompact : styles.drummerImage}
        contentFit="cover"
        transition={200}
      />
      <View style={compact ? styles.drummerInfoCompact : styles.drummerInfo}>
        <Text style={compact ? styles.drummerNameCompact : styles.drummerName} numberOfLines={1}>
          {drummer.name}
        </Text>
        {!compact && (
          <Text style={styles.drummerBand} numberOfLines={1}>
            {drummer.band}
          </Text>
        )}
      </View>
    </div>
  );
}

// ==========================================
// TIER ROW COMPONENT
// ==========================================

function TierRow({ tier, drummers, onDrop, onDragOver, onRemoveDrummer, compact }) {
  const config = TIER_CONFIG[tier];
  
  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    onDragOver?.(tier);
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    const drummerId = parseInt(e.dataTransfer.getData('text/plain'), 10);
    if (!isNaN(drummerId)) {
      onDrop?.(drummerId, tier);
    }
  };
  
  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      style={{
        ...styles.tierRow,
        borderColor: config.color,
      }}
    >
      <div style={{ ...styles.tierLabel, backgroundColor: config.color }}>
        <Text style={{ ...styles.tierLabelText, color: config.textColor }}>{tier}</Text>
      </div>
      <div style={styles.tierContent}>
        {drummers.map((drummer) => (
          <div key={drummer.id} style={{ position: 'relative' }}>
            <DrummerCard drummer={drummer} compact={compact} />
            <TouchableOpacity
              onPress={() => onRemoveDrummer?.(drummer.id, tier)}
              style={styles.removeButton}
            >
              <Text style={styles.removeButtonText}>×</Text>
            </TouchableOpacity>
          </div>
        ))}
        {drummers.length === 0 && (
          <Text style={styles.emptyTierText}>Drop drummers here</Text>
        )}
      </div>
    </div>
  );
}

// ==========================================
// DRUMMER POOL COMPONENT
// ==========================================

function DrummerPool({ drummers, searchQuery, onSearchChange, onDragStart, onDragEnd, compact }) {
  const filteredDrummers = useMemo(() => {
    if (!searchQuery) return drummers;
    const q = searchQuery.toLowerCase();
    return drummers.filter(d => 
      d.name.toLowerCase().includes(q) || 
      d.band.toLowerCase().includes(q)
    );
  }, [drummers, searchQuery]);
  
  return (
    <View style={styles.drummerPool}>
      <View style={styles.poolHeader}>
        <Text style={styles.poolTitle}>Drummers ({filteredDrummers.length})</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor={colors.text.muted}
          value={searchQuery}
          onChangeText={onSearchChange}
        />
      </View>
      <ScrollView 
        style={styles.poolContent}
        contentContainerStyle={styles.poolGrid}
        horizontal={false}
      >
        {filteredDrummers.map((drummer) => (
          <DrummerCard
            key={drummer.id}
            drummer={drummer}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            compact={compact}
          />
        ))}
        {filteredDrummers.length === 0 && (
          <Text style={styles.emptyPoolText}>
            {searchQuery ? 'No drummers match your search' : 'All drummers have been ranked!'}
          </Text>
        )}
      </ScrollView>
    </View>
  );
}

// ==========================================
// CATEGORY SELECTOR
// ==========================================

function CategorySelector({ selectedCategory, onSelectCategory }) {
  return (
    <View style={styles.categorySelector}>
      <Text style={styles.categorySelectorTitle}>Category</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}
      >
        {PRESET_CATEGORIES.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              selectedCategory === category.id && styles.categoryButtonActive,
            ]}
            onPress={() => onSelectCategory(category.id)}
          >
            <Text style={styles.categoryEmoji}>{category.emoji}</Text>
            <Text style={[
              styles.categoryName,
              selectedCategory === category.id && styles.categoryNameActive,
            ]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

// ==========================================
// SHARE MODAL
// ==========================================

function ShareModal({ visible, onClose, tierData, category }) {
  const [shareUrl, setShareUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);
  
  const handleSaveAndShare = async () => {
    setSaving(true);
    try {
      const id = generateUniqueId();
      const response = await fetch('/api/tier-list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          category,
          tiers: tierData,
          createdAt: new Date().toISOString(),
        }),
      });
      
      if (response.ok) {
        const url = getTierListShareUrl(id);
        setShareUrl(url);
        trackTierListEvent('save', { category, id });
      }
    } catch (err) {
      console.error('Failed to save tier list:', err);
    } finally {
      setSaving(false);
    }
  };
  
  const handleCopy = async () => {
    if (navigator.clipboard && shareUrl) {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      trackTierListEvent('copy_url', { category });
    }
  };
  
  const handleDownloadImage = async () => {
    setGenerating(true);
    try {
      await generateTierListImage(tierData, category);
      trackTierListEvent('download_image', { category });
    } catch (err) {
      console.error('Failed to generate image:', err);
    } finally {
      setGenerating(false);
    }
  };
  
  const shareOnTwitter = () => {
    const text = getShareText(category);
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl || 'https://metalforge.io/tools/tier-list')}&hashtags=MetalDrummer,TierList,MetalForge`;
    window.open(url, '_blank', 'width=600,height=400');
    trackTierListEvent('share_twitter', { category });
  };
  
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Share Your Tier List</Text>
          
          {!shareUrl ? (
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleSaveAndShare}
              disabled={saving}
            >
              <Text style={styles.primaryButtonText}>
                {saving ? 'Saving...' : '💾 Generate Share Link'}
              </Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.shareUrlContainer}>
              <Text style={styles.shareUrlLabel}>Share URL:</Text>
              <View style={styles.shareUrlRow}>
                <Text style={styles.shareUrl} numberOfLines={1}>{shareUrl}</Text>
                <TouchableOpacity style={styles.copyButton} onPress={handleCopy}>
                  <Text style={styles.copyButtonText}>{copied ? '✓' : '📋'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          
          <View style={styles.shareButtons}>
            <TouchableOpacity
              style={styles.shareButton}
              onPress={shareOnTwitter}
            >
              <Text style={styles.shareButtonText}>🐦 Twitter/X</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.shareButton}
              onPress={handleDownloadImage}
              disabled={generating}
            >
              <Text style={styles.shareButtonText}>
                {generating ? '⏳ Generating...' : '📷 Download PNG'}
              </Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

// ==========================================
// IMAGE GENERATION (Canvas API)
// ==========================================

const generateTierListImage = async (tierData, category) => {
  if (typeof document === 'undefined') return;
  
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  // 1080x1080 for social media
  const WIDTH = 1080;
  const HEIGHT = 1080;
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  
  // Background
  ctx.fillStyle = colors.bg.primary;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  
  // Header
  const categoryInfo = PRESET_CATEGORIES.find(c => c.id === category) || PRESET_CATEGORIES[0];
  ctx.fillStyle = colors.text.primary;
  ctx.font = 'bold 48px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(`Metal Drummer Tier List: ${categoryInfo.name}`, WIDTH / 2, 60);
  
  // Tier rows
  const TIER_HEIGHT = 120;
  const TIER_LABEL_WIDTH = 80;
  const CARD_SIZE = 80;
  const CARD_GAP = 8;
  const START_Y = 100;
  
  for (let i = 0; i < TIER_ORDER.length; i++) {
    const tier = TIER_ORDER[i];
    const config = TIER_CONFIG[tier];
    const y = START_Y + (i * (TIER_HEIGHT + 10));
    const drummers = tierData[tier] || [];
    
    // Tier background
    ctx.fillStyle = colors.bg.secondary;
    ctx.fillRect(20, y, WIDTH - 40, TIER_HEIGHT);
    
    // Tier label
    ctx.fillStyle = config.color;
    ctx.fillRect(20, y, TIER_LABEL_WIDTH, TIER_HEIGHT);
    
    ctx.fillStyle = config.textColor;
    ctx.font = 'bold 48px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(tier, 20 + TIER_LABEL_WIDTH / 2, y + TIER_HEIGHT / 2);
    
    // Drummer cards (simplified - just names due to async image loading complexity)
    ctx.textAlign = 'left';
    ctx.font = '20px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = colors.text.primary;
    
    drummers.forEach((drummer, j) => {
      const x = TIER_LABEL_WIDTH + 30 + (j * (CARD_SIZE + CARD_GAP));
      if (x + CARD_SIZE < WIDTH - 40) {
        // Card background
        ctx.fillStyle = colors.bg.elevated;
        ctx.fillRect(x, y + 10, CARD_SIZE, TIER_HEIGHT - 20);
        
        // Name (rotated for vertical cards)
        ctx.save();
        ctx.fillStyle = colors.text.primary;
        ctx.font = '12px system-ui, -apple-system, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(drummer.name.split(' ')[0], x + CARD_SIZE / 2, y + TIER_HEIGHT / 2);
        ctx.restore();
      }
    });
  }
  
  // Watermark
  ctx.fillStyle = colors.text.muted;
  ctx.font = '24px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('metalforge.io', WIDTH / 2, HEIGHT - 30);
  
  // MetalForge logo mark
  ctx.fillStyle = colors.brand.primary;
  ctx.font = 'bold 24px system-ui, -apple-system, sans-serif';
  ctx.fillText('🔥 MetalForge', WIDTH / 2, HEIGHT - 60);
  
  // Download
  const link = document.createElement('a');
  link.download = `metalforge-tier-list-${category}-${Date.now()}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
};

// ==========================================
// MAIN TIER LIST BUILDER COMPONENT
// ==========================================

export default function TierListBuilder({ drummers: allDrummers, onBack }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  
  const [selectedCategory, setSelectedCategory] = useState('custom');
  const [tiers, setTiers] = useState(() => {
    const initial = {};
    TIER_ORDER.forEach(tier => { initial[tier] = []; });
    return initial;
  });
  const [availableDrummers, setAvailableDrummers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [draggedId, setDraggedId] = useState(null);
  const [dragOverTier, setDragOverTier] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Load drummers
  useEffect(() => {
    if (allDrummers && allDrummers.length > 0) {
      setAvailableDrummers(allDrummers);
      setLoading(false);
    } else {
      // Fetch drummers if not provided
      fetch('/api/drummers')
        .then(res => res.json())
        .then(data => {
          setAvailableDrummers(data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Failed to load drummers:', err);
          setLoading(false);
        });
    }
  }, [allDrummers]);
  
  // Update meta tags
  useEffect(() => {
    updateTierListMeta(selectedCategory);
    trackTierListEvent('view', { category: selectedCategory });
  }, [selectedCategory]);
  
  // Load shared tier list from URL
  useEffect(() => {
    const id = getTierListIdFromUrl();
    if (id) {
      fetch(`/api/tier-list/${id}`)
        .then(res => res.json())
        .then(data => {
          if (data.tiers) {
            setTiers(data.tiers);
            setSelectedCategory(data.category || 'custom');
            // Remove placed drummers from available pool
            const placedIds = new Set(
              Object.values(data.tiers).flat().map(d => d.id)
            );
            setAvailableDrummers(prev => prev.filter(d => !placedIds.has(d.id)));
          }
        })
        .catch(err => console.error('Failed to load tier list:', err));
    }
  }, []);
  
  // Handle drop
  const handleDrop = useCallback((drummerId, tier) => {
    const drummer = availableDrummers.find(d => d.id === drummerId);
    if (drummer) {
      setTiers(prev => ({
        ...prev,
        [tier]: [...prev[tier], drummer],
      }));
      setAvailableDrummers(prev => prev.filter(d => d.id !== drummerId));
      trackTierListEvent('drop', { tier, drummer_id: drummerId });
    } else {
      // Might be moving from one tier to another
      for (const t of TIER_ORDER) {
        const existingDrummer = tiers[t].find(d => d.id === drummerId);
        if (existingDrummer) {
          setTiers(prev => ({
            ...prev,
            [t]: prev[t].filter(d => d.id !== drummerId),
            [tier]: [...prev[tier], existingDrummer],
          }));
          break;
        }
      }
    }
    setDraggedId(null);
    setDragOverTier(null);
  }, [availableDrummers, tiers]);
  
  // Handle remove from tier
  const handleRemove = useCallback((drummerId, tier) => {
    const drummer = tiers[tier].find(d => d.id === drummerId);
    if (drummer) {
      setTiers(prev => ({
        ...prev,
        [tier]: prev[tier].filter(d => d.id !== drummerId),
      }));
      setAvailableDrummers(prev => [...prev, drummer]);
      trackTierListEvent('remove', { tier, drummer_id: drummerId });
    }
  }, [tiers]);
  
  // Reset tier list
  const handleReset = useCallback(() => {
    const allPlaced = Object.values(tiers).flat();
    setAvailableDrummers(prev => [...prev, ...allPlaced]);
    setTiers(() => {
      const initial = {};
      TIER_ORDER.forEach(tier => { initial[tier] = []; });
      return initial;
    });
    trackTierListEvent('reset', { category: selectedCategory });
  }, [tiers, selectedCategory]);
  
  // Get tier data for sharing (with drummer info)
  const getTierDataForShare = useCallback(() => {
    return tiers;
  }, [tiers]);
  
  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading drummers...</Text>
        </View>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>🥁 Tier List Builder</Text>
          <Text style={styles.headerSubtitle}>Rank the greatest metal drummers</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
            <Text style={styles.resetButtonText}>🔄 Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.shareButtonHeader} 
            onPress={() => setShowShareModal(true)}
          >
            <Text style={styles.shareButtonHeaderText}>📤 Share</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Category Selector */}
      <CategorySelector
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      
      <ScrollView style={styles.content} contentContainerStyle={styles.contentInner}>
        {/* Tier Rows */}
        <View style={styles.tiersContainer}>
          {TIER_ORDER.map((tier) => (
            <TierRow
              key={tier}
              tier={tier}
              drummers={tiers[tier]}
              onDrop={handleDrop}
              onDragOver={setDragOverTier}
              onRemoveDrummer={handleRemove}
              compact={isMobile}
            />
          ))}
        </View>
        
        {/* Drummer Pool */}
        <DrummerPool
          drummers={availableDrummers}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onDragStart={setDraggedId}
          onDragEnd={() => setDraggedId(null)}
          compact={isMobile}
        />
      </ScrollView>
      
      {/* Share Modal */}
      <ShareModal
        visible={showShareModal}
        onClose={() => setShowShareModal(false)}
        tierData={getTierDataForShare()}
        category={selectedCategory}
      />
    </View>
  );
}

// ==========================================
// STYLES
// ==========================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg.primary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: colors.text.secondary,
    fontSize: fontSize.lg,
  },
  
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.default,
    backgroundColor: colors.bg.secondary,
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  backButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  backButtonText: {
    color: colors.text.secondary,
    fontSize: fontSize.md,
  },
  headerTitleContainer: {
    flex: 1,
    minWidth: 200,
  },
  headerTitle: {
    color: colors.text.primary,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
  },
  headerSubtitle: {
    color: colors.text.secondary,
    fontSize: fontSize.sm,
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  resetButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.bg.elevated,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border.default,
  },
  resetButtonText: {
    color: colors.text.secondary,
    fontSize: fontSize.sm,
  },
  shareButtonHeader: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.brand.primary,
    borderRadius: 8,
  },
  shareButtonHeaderText: {
    color: colors.text.primary,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
  },
  
  // Category Selector
  categorySelector: {
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.default,
  },
  categorySelectorTitle: {
    color: colors.text.secondary,
    fontSize: fontSize.sm,
    marginBottom: spacing.sm,
  },
  categoryScroll: {
    flexDirection: 'row',
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    marginRight: spacing.sm,
    backgroundColor: colors.bg.elevated,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border.default,
  },
  categoryButtonActive: {
    backgroundColor: colors.brand.primary,
    borderColor: colors.brand.primary,
  },
  categoryEmoji: {
    fontSize: fontSize.lg,
    marginRight: spacing.xs,
  },
  categoryName: {
    color: colors.text.secondary,
    fontSize: fontSize.sm,
  },
  categoryNameActive: {
    color: colors.text.primary,
    fontWeight: fontWeight.semibold,
  },
  
  // Content
  content: {
    flex: 1,
  },
  contentInner: {
    padding: spacing.md,
  },
  
  // Tier Rows
  tiersContainer: {
    marginBottom: spacing.xl,
  },
  tierRow: {
    flexDirection: 'row',
    minHeight: 100,
    marginBottom: spacing.sm,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: colors.bg.secondary,
    borderWidth: 2,
  },
  tierLabel: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.sm,
  },
  tierLabelText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  tierContent: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    padding: spacing.sm,
    minHeight: 80,
    gap: spacing.xs,
  },
  emptyTierText: {
    color: colors.text.muted,
    fontSize: fontSize.sm,
    fontStyle: 'italic',
  },
  
  // Drummer Cards
  drummerCard: {
    width: 100,
    backgroundColor: colors.bg.elevated,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border.default,
    margin: 2,
  },
  drummerCardCompact: {
    width: 70,
  },
  drummerImage: {
    width: '100%',
    height: 80,
  },
  drummerImageCompact: {
    width: '100%',
    height: 50,
  },
  drummerInfo: {
    padding: spacing.xs,
  },
  drummerInfoCompact: {
    padding: 4,
  },
  drummerName: {
    color: colors.text.primary,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
  },
  drummerNameCompact: {
    color: colors.text.primary,
    fontSize: 10,
    fontWeight: fontWeight.semibold,
  },
  drummerBand: {
    color: colors.text.muted,
    fontSize: 10,
  },
  removeButton: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: colors.text.primary,
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 16,
  },
  
  // Drummer Pool
  drummerPool: {
    backgroundColor: colors.bg.secondary,
    borderRadius: 8,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border.default,
  },
  poolHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  poolTitle: {
    color: colors.text.primary,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
  },
  searchInput: {
    backgroundColor: colors.bg.elevated,
    borderRadius: 8,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    color: colors.text.primary,
    fontSize: fontSize.sm,
    minWidth: 150,
    borderWidth: 1,
    borderColor: colors.border.default,
  },
  poolContent: {
    maxHeight: 400,
  },
  poolGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  emptyPoolText: {
    color: colors.text.muted,
    fontSize: fontSize.md,
    textAlign: 'center',
    paddingVertical: spacing.xl,
  },
  
  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  modalContent: {
    backgroundColor: colors.bg.secondary,
    borderRadius: 12,
    padding: spacing.xl,
    width: '100%',
    maxWidth: 400,
    borderWidth: 1,
    borderColor: colors.border.default,
  },
  modalTitle: {
    color: colors.text.primary,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  primaryButton: {
    backgroundColor: colors.brand.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 8,
    marginBottom: spacing.lg,
  },
  primaryButtonText: {
    color: colors.text.primary,
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    textAlign: 'center',
  },
  shareUrlContainer: {
    marginBottom: spacing.lg,
  },
  shareUrlLabel: {
    color: colors.text.secondary,
    fontSize: fontSize.sm,
    marginBottom: spacing.xs,
  },
  shareUrlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bg.elevated,
    borderRadius: 8,
    overflow: 'hidden',
  },
  shareUrl: {
    flex: 1,
    color: colors.text.primary,
    fontSize: fontSize.sm,
    padding: spacing.sm,
  },
  copyButton: {
    padding: spacing.sm,
    backgroundColor: colors.bg.primary,
  },
  copyButtonText: {
    fontSize: fontSize.lg,
  },
  shareButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
    flexWrap: 'wrap',
  },
  shareButton: {
    flex: 1,
    minWidth: 120,
    backgroundColor: colors.bg.elevated,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border.default,
  },
  shareButtonText: {
    color: colors.text.primary,
    fontSize: fontSize.sm,
    textAlign: 'center',
  },
  closeButton: {
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  closeButtonText: {
    color: colors.text.secondary,
    fontSize: fontSize.md,
  },
});
