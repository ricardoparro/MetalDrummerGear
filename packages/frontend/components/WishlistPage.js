/**
 * WishlistPage Component (Issue #823)
 * 
 * Displays saved wishlist items with:
 * - Drummer, item name, category
 * - Estimated price + affiliate links
 * - Total setup cost (running sum)
 * - Remove button per item
 * - Share My Wishlist button
 * - Buy All from Sweetwater CTA
 * - Clear Wishlist button
 * 
 * Supports shared wishlist URLs: /wishlist?list=base64encodeddata
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet, 
  Platform, 
  Linking,
  useWindowDimensions,
  Share
} from 'react-native';
import { useTheme } from '../ThemeContext';
import { colors } from '../colors';
import { spacing } from '../spacing';
import { fontSize, fontWeight, textStyles } from '../typography';
import { formatPrice, EUR_TO_USD } from '../gearPrices';
import { getSweetwaterLink, getThomannLink } from '../affiliateLinks';
import {
  getWishlist,
  saveWishlist,
  removeFromWishlist,
  clearWishlist,
  calculateWishlistTotal,
  generateShareUrl,
  getBuyAllSweetwaterLink,
  getBuyAllThomannLink,
  getSharedWishlistFromUrl,
  importSharedWishlist,
  trackWishlistEvent,
  updateWishlistMeta,
} from '../utils/wishlist';

// Gear type labels and icons
const GEAR_TYPE_INFO = {
  drums: { label: 'Drums', icon: '🥁' },
  snare: { label: 'Snare', icon: '🔊' },
  cymbals: { label: 'Cymbals', icon: '🎶' },
  hardware: { label: 'Hardware', icon: '⚙️' },
  sticks: { label: 'Sticks', icon: '🥢' },
};

/**
 * Individual wishlist item card
 */
function WishlistItemCard({ item, theme, onRemove, onNavigateToDrummer, isMobile }) {
  const gearInfo = GEAR_TYPE_INFO[item.gearType] || { label: item.gearType, icon: '🎵' };
  
  const handleShopUS = () => {
    const url = getSweetwaterLink(item.primaryProduct, item.gearType);
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      Linking.openURL(url);
    }
    trackWishlistEvent('shop_item', { ...item, store: 'sweetwater' });
  };
  
  const handleShopEU = () => {
    const url = getThomannLink(item.primaryProduct, item.gearType);
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      Linking.openURL(url);
    }
    trackWishlistEvent('shop_item', { ...item, store: 'thomann' });
  };
  
  const handleDrummerClick = () => {
    if (onNavigateToDrummer && item.drummerSlug) {
      onNavigateToDrummer(item.drummerSlug);
    }
  };
  
  return (
    <View style={[
      styles.itemCard, 
      { backgroundColor: theme.card, borderColor: theme.border },
      isMobile && styles.itemCardMobile
    ]}>
      <View style={styles.itemHeader}>
        <View style={styles.itemGearBadge}>
          <Text style={styles.itemGearIcon}>{gearInfo.icon}</Text>
          <Text style={[styles.itemGearLabel, { color: theme.accent }]}>
            {gearInfo.label}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => onRemove(item.id)}
          style={styles.removeButton}
          accessibilityRole="button"
          accessibilityLabel={`Remove ${item.itemName} from wishlist`}
        >
          <Text style={styles.removeButtonText}>✕</Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity onPress={handleDrummerClick} disabled={!onNavigateToDrummer}>
        <Text style={[styles.itemDrummer, { color: theme.text }]}>
          {item.drummerName}
        </Text>
      </TouchableOpacity>
      
      <Text 
        style={[styles.itemName, { color: theme.secondaryText }]}
        numberOfLines={2}
      >
        {item.itemName}
      </Text>
      
      <View style={styles.itemFooter}>
        <Text style={[styles.itemPrice, { color: theme.accent }]}>
          {item.estimatedPrice > 0 
            ? formatPrice(item.estimatedPrice, 'EUR')
            : 'Price varies'}
        </Text>
        
        <View style={styles.shopLinks}>
          <TouchableOpacity
            onPress={handleShopUS}
            style={[styles.shopButton, styles.shopButtonUS]}
            accessibilityRole="link"
            accessibilityLabel={`Shop at Sweetwater`}
          >
            <Text style={styles.shopButtonText}>US</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleShopEU}
            style={[styles.shopButton, styles.shopButtonEU]}
            accessibilityRole="link"
            accessibilityLabel={`Shop at Thomann`}
          >
            <Text style={styles.shopButtonText}>EU</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

/**
 * Empty wishlist state
 */
function EmptyWishlist({ theme, onBack }) {
  return (
    <View style={styles.emptyState}>
      <Text style={styles.emptyIcon}>🥁</Text>
      <Text style={[styles.emptyTitle, { color: theme.text }]}>
        Your Wishlist is Empty
      </Text>
      <Text style={[styles.emptySubtitle, { color: theme.secondaryText }]}>
        Browse drummer profiles and tap "Save to Wishlist" on any gear item to start building your dream setup.
      </Text>
      <TouchableOpacity
        onPress={onBack}
        style={[styles.emptyButton, { backgroundColor: theme.accent }]}
        accessibilityRole="button"
      >
        <Text style={styles.emptyButtonText}>Browse Drummers</Text>
      </TouchableOpacity>
    </View>
  );
}

/**
 * Shared wishlist banner
 */
function SharedWishlistBanner({ sharedItems, onImport, onDismiss, theme }) {
  const total = sharedItems.reduce((sum, item) => sum + (item.estimatedPrice || 0), 0);
  
  return (
    <View style={[styles.sharedBanner, { backgroundColor: theme.accent + '20', borderColor: theme.accent }]}>
      <Text style={[styles.sharedBannerTitle, { color: theme.text }]}>
        📥 Shared Wishlist
      </Text>
      <Text style={[styles.sharedBannerText, { color: theme.secondaryText }]}>
        Someone shared {sharedItems.length} gear items with you (≈{formatPrice(total, 'EUR')})
      </Text>
      <View style={styles.sharedBannerButtons}>
        <TouchableOpacity
          onPress={onImport}
          style={[styles.sharedImportButton, { backgroundColor: theme.accent }]}
          accessibilityRole="button"
        >
          <Text style={styles.sharedImportButtonText}>Add to My Wishlist</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onDismiss}
          style={styles.sharedDismissButton}
          accessibilityRole="button"
        >
          <Text style={[styles.sharedDismissButtonText, { color: theme.secondaryText }]}>
            Dismiss
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/**
 * Main WishlistPage component
 */
export default function WishlistPage({ theme, onBack, onNavigateToDrummer }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  
  const [items, setItems] = useState(() => getWishlist());
  const [sharedItems, setSharedItems] = useState(null);
  const [showCopied, setShowCopied] = useState(false);
  
  // Check for shared wishlist URL on mount
  useEffect(() => {
    const shared = getSharedWishlistFromUrl();
    if (shared && shared.length > 0) {
      setSharedItems(shared);
    }
    
    // Update meta tags
    updateWishlistMeta();
    
    // Track page view
    trackWishlistEvent('page_view', { items_count: items.length });
  }, []);
  
  // Listen for wishlist updates
  useEffect(() => {
    const handleUpdate = () => {
      setItems(getWishlist());
    };
    
    window.addEventListener('wishlist-updated', handleUpdate);
    return () => window.removeEventListener('wishlist-updated', handleUpdate);
  }, []);
  
  const total = useMemo(() => calculateWishlistTotal(), [items]);
  
  const handleRemove = useCallback((itemId) => {
    removeFromWishlist(itemId);
    setItems(getWishlist());
  }, []);
  
  const handleClear = useCallback(() => {
    if (items.length === 0) return;
    
    // Confirm before clearing
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      if (!window.confirm('Clear all items from your wishlist?')) return;
    }
    
    clearWishlist();
    setItems([]);
  }, [items.length]);
  
  const handleShare = useCallback(async () => {
    const url = generateShareUrl();
    if (!url) return;
    
    trackWishlistEvent('share', { items_count: items.length, total: total.totalEur });
    
    // Try native share first
    if (Platform.OS !== 'web' && Share) {
      try {
        await Share.share({
          title: 'My Metal Drum Wishlist',
          message: `Check out my dream drum setup (${items.length} items, ≈${formatPrice(total.totalEur, 'EUR')}): ${url}`,
          url,
        });
        return;
      } catch (e) {
        // Fall through to clipboard
      }
    }
    
    // Copy to clipboard
    if (Platform.OS === 'web' && typeof navigator !== 'undefined' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(url);
        setShowCopied(true);
        setTimeout(() => setShowCopied(false), 2000);
      } catch (e) {
        // Fallback: show URL in prompt
        window.prompt('Copy this link to share your wishlist:', url);
      }
    }
  }, [items.length, total.totalEur]);
  
  const handleBuyAllUS = useCallback(() => {
    const url = getBuyAllSweetwaterLink(items);
    if (!url) return;
    
    trackWishlistEvent('buy_all', { store: 'sweetwater', items_count: items.length, total: total.totalEur });
    
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      Linking.openURL(url);
    }
  }, [items, total.totalEur]);
  
  const handleBuyAllEU = useCallback(() => {
    const url = getBuyAllThomannLink(items);
    if (!url) return;
    
    trackWishlistEvent('buy_all', { store: 'thomann', items_count: items.length, total: total.totalEur });
    
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      Linking.openURL(url);
    }
  }, [items, total.totalEur]);
  
  const handleImportShared = useCallback(() => {
    if (!sharedItems) return;
    
    const addedCount = importSharedWishlist(sharedItems);
    setItems(getWishlist());
    setSharedItems(null);
    
    // Clear URL param
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.history.replaceState({}, '', '/wishlist');
    }
    
    // Show toast/feedback
    if (addedCount > 0) {
      alert(`Added ${addedCount} new items to your wishlist!`);
    } else {
      alert('All items were already in your wishlist.');
    }
  }, [sharedItems]);
  
  const handleDismissShared = useCallback(() => {
    setSharedItems(null);
    // Clear URL param
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.history.replaceState({}, '', '/wishlist');
    }
  }, []);
  
  // Group items by drummer for better organization
  const groupedItems = useMemo(() => {
    const groups = {};
    items.forEach(item => {
      if (!groups[item.drummerSlug]) {
        groups[item.drummerSlug] = {
          drummerName: item.drummerName,
          drummerSlug: item.drummerSlug,
          items: [],
          total: 0,
        };
      }
      groups[item.drummerSlug].items.push(item);
      groups[item.drummerSlug].total += item.estimatedPrice || 0;
    });
    return Object.values(groups);
  }, [items]);
  
  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.content}
    >
      {/* Header */}
      <View style={[styles.header, isMobile && styles.headerMobile]}>
        <TouchableOpacity
          onPress={onBack}
          style={styles.backButton}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Text style={[styles.backButtonText, { color: theme.text }]}>← Back</Text>
        </TouchableOpacity>
        
        <View style={styles.headerTitle}>
          <Text style={[styles.title, { color: theme.text }]}>
            My Wishlist
          </Text>
          {items.length > 0 && (
            <View style={[styles.countBadge, { backgroundColor: theme.accent }]}>
              <Text style={styles.countBadgeText}>{items.length}</Text>
            </View>
          )}
        </View>
      </View>
      
      {/* Shared wishlist banner */}
      {sharedItems && sharedItems.length > 0 && (
        <SharedWishlistBanner
          sharedItems={sharedItems}
          onImport={handleImportShared}
          onDismiss={handleDismissShared}
          theme={theme}
        />
      )}
      
      {/* Empty state */}
      {items.length === 0 && !sharedItems && (
        <EmptyWishlist theme={theme} onBack={onBack} />
      )}
      
      {/* Wishlist items */}
      {items.length > 0 && (
        <>
          {/* Total cost summary */}
          <View style={[styles.totalCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={[styles.totalLabel, { color: theme.secondaryText }]}>
              Total Setup Cost
            </Text>
            <View style={styles.totalPrices}>
              <Text style={[styles.totalPrice, { color: theme.text }]}>
                {formatPrice(total.totalEur, 'EUR')}
              </Text>
              <Text style={[styles.totalPriceAlt, { color: theme.secondaryText }]}>
                ≈ {formatPrice(total.totalUsd, 'USD')}
              </Text>
            </View>
            <Text style={[styles.totalDisclaimer, { color: theme.secondaryText }]}>
              * Estimated prices. Visit retailers for current pricing.
            </Text>
          </View>
          
          {/* Action buttons */}
          <View style={[styles.actions, isMobile && styles.actionsMobile]}>
            <TouchableOpacity
              onPress={handleBuyAllUS}
              style={[styles.buyAllButton, styles.buyAllButtonUS]}
              accessibilityRole="link"
            >
              <Text style={styles.buyAllButtonText}>
                🛒 Buy All from Sweetwater
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={handleBuyAllEU}
              style={[styles.buyAllButton, styles.buyAllButtonEU]}
              accessibilityRole="link"
            >
              <Text style={styles.buyAllButtonText}>
                🛒 Buy All from Thomann
              </Text>
            </TouchableOpacity>
          </View>
          
          <View style={[styles.secondaryActions, isMobile && styles.secondaryActionsMobile]}>
            <TouchableOpacity
              onPress={handleShare}
              style={[styles.shareButton, { borderColor: theme.border }]}
              accessibilityRole="button"
            >
              <Text style={[styles.shareButtonText, { color: theme.text }]}>
                {showCopied ? '✓ Link Copied!' : '📤 Share My Wishlist'}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={handleClear}
              style={[styles.clearButton, { borderColor: theme.border }]}
              accessibilityRole="button"
            >
              <Text style={[styles.clearButtonText, { color: '#ff4444' }]}>
                🗑️ Clear Wishlist
              </Text>
            </TouchableOpacity>
          </View>
          
          {/* Items list */}
          <View style={styles.itemsList}>
            {groupedItems.map(group => (
              <View key={group.drummerSlug} style={styles.drummerGroup}>
                <View style={styles.drummerGroupHeader}>
                  <Text style={[styles.drummerGroupName, { color: theme.text }]}>
                    {group.drummerName}
                  </Text>
                  <Text style={[styles.drummerGroupTotal, { color: theme.secondaryText }]}>
                    {formatPrice(group.total, 'EUR')}
                  </Text>
                </View>
                <View style={[styles.itemsGrid, isMobile && styles.itemsGridMobile]}>
                  {group.items.map(item => (
                    <WishlistItemCard
                      key={item.id}
                      item={item}
                      theme={theme}
                      onRemove={handleRemove}
                      onNavigateToDrummer={onNavigateToDrummer}
                      isMobile={isMobile}
                    />
                  ))}
                </View>
              </View>
            ))}
          </View>
        </>
      )}
      
      {/* Footer */}
      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: theme.secondaryText }]}>
          Prices are estimates based on typical retail pricing.
          {'\n'}We may earn a commission from purchases made through our links.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
    paddingTop: spacing.xl,
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
  },
  
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
    gap: spacing.md,
  },
  headerMobile: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  backButton: {
    paddingVertical: spacing.sm,
    paddingRight: spacing.md,
  },
  backButtonText: {
    fontSize: fontSize.md,
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
  },
  countBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  countBadgeText: {
    color: '#000',
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
  },
  
  // Shared banner
  sharedBanner: {
    padding: spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: spacing.lg,
  },
  sharedBannerTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    marginBottom: spacing.xs,
  },
  sharedBannerText: {
    fontSize: fontSize.md,
    marginBottom: spacing.md,
  },
  sharedBannerButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  sharedImportButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 8,
  },
  sharedImportButtonText: {
    color: '#000',
    fontWeight: fontWeight.semiBold,
  },
  sharedDismissButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  sharedDismissButtonText: {
    fontSize: fontSize.md,
  },
  
  // Empty state
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl * 2,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: spacing.lg,
  },
  emptyTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: fontSize.md,
    textAlign: 'center',
    maxWidth: 400,
    marginBottom: spacing.lg,
  },
  emptyButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: 8,
  },
  emptyButtonText: {
    color: '#000',
    fontWeight: fontWeight.semiBold,
    fontSize: fontSize.md,
  },
  
  // Total card
  totalCard: {
    padding: spacing.lg,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: spacing.lg,
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: fontSize.md,
    marginBottom: spacing.sm,
  },
  totalPrices: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing.md,
  },
  totalPrice: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
  },
  totalPriceAlt: {
    fontSize: fontSize.lg,
  },
  totalDisclaimer: {
    fontSize: fontSize.sm,
    marginTop: spacing.sm,
  },
  
  // Actions
  actions: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  actionsMobile: {
    flexDirection: 'column',
  },
  buyAllButton: {
    flex: 1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 8,
    alignItems: 'center',
  },
  buyAllButtonUS: {
    backgroundColor: '#007AFF',
  },
  buyAllButtonEU: {
    backgroundColor: '#34C759',
  },
  buyAllButtonText: {
    color: '#fff',
    fontWeight: fontWeight.bold,
    fontSize: fontSize.md,
  },
  
  secondaryActions: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  secondaryActionsMobile: {
    flexDirection: 'column',
  },
  shareButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  shareButtonText: {
    fontWeight: fontWeight.semiBold,
  },
  clearButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  clearButtonText: {
    fontWeight: fontWeight.semiBold,
  },
  
  // Items list
  itemsList: {
    marginTop: spacing.lg,
  },
  drummerGroup: {
    marginBottom: spacing.xl,
  },
  drummerGroupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  drummerGroupName: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
  },
  drummerGroupTotal: {
    fontSize: fontSize.md,
  },
  itemsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  itemsGridMobile: {
    flexDirection: 'column',
  },
  
  // Item card
  itemCard: {
    width: 280,
    padding: spacing.md,
    borderRadius: 12,
    borderWidth: 1,
  },
  itemCardMobile: {
    width: '100%',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  itemGearBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  itemGearIcon: {
    fontSize: 16,
  },
  itemGearLabel: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semiBold,
    textTransform: 'uppercase',
  },
  removeButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255,68,68,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeButtonText: {
    color: '#ff4444',
    fontSize: 14,
    fontWeight: fontWeight.bold,
  },
  itemDrummer: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semiBold,
    marginBottom: 4,
  },
  itemName: {
    fontSize: fontSize.sm,
    lineHeight: 20,
    marginBottom: spacing.sm,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
  },
  itemPrice: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
  },
  shopLinks: {
    flexDirection: 'row',
    gap: 6,
  },
  shopButton: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  shopButtonUS: {
    backgroundColor: 'rgba(0,122,255,0.2)',
  },
  shopButtonEU: {
    backgroundColor: 'rgba(52,199,89,0.2)',
  },
  shopButtonText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semiBold,
    color: '#fff',
  },
  
  // Footer
  footer: {
    marginTop: spacing.xl,
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  footerText: {
    fontSize: fontSize.sm,
    textAlign: 'center',
    lineHeight: 20,
  },
});

// Export page detection utility
export { isWishlistPage, updateWishlistMeta } from '../utils/wishlist';
