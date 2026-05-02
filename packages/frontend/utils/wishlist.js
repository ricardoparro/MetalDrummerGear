/**
 * Wishlist Utility Module (Issue #823)
 * 
 * localStorage-based wishlist system for gear items.
 * Supports shareable URLs via base64-encoded JSON.
 * 
 * Storage key: metalforge_wishlist
 * Share URL format: /wishlist?list=base64encodeddata
 */

const STORAGE_KEY = 'metalforge_wishlist';

/**
 * WishlistItem structure:
 * {
 *   id: string,           // Unique identifier (drummer-gearType-timestamp)
 *   drummerName: string,  // Drummer name
 *   drummerSlug: string,  // Drummer URL slug
 *   gearType: string,     // drums, snare, cymbals, hardware, sticks
 *   itemName: string,     // Gear item description
 *   primaryProduct: string, // Extracted primary product for search
 *   estimatedPrice: number, // Price in EUR
 *   addedAt: number,      // Timestamp when added
 * }
 */

/**
 * Get all wishlist items from localStorage
 * @returns {Array} Array of wishlist items
 */
export function getWishlist() {
  if (typeof window === 'undefined' || !window.localStorage) {
    return [];
  }
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    
    const items = JSON.parse(stored);
    return Array.isArray(items) ? items : [];
  } catch (e) {
    console.error('Error reading wishlist:', e);
    return [];
  }
}

/**
 * Save wishlist items to localStorage
 * @param {Array} items - Array of wishlist items
 */
export function saveWishlist(items) {
  if (typeof window === 'undefined' || !window.localStorage) {
    return;
  }
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    // Dispatch custom event for cross-component sync
    window.dispatchEvent(new CustomEvent('wishlist-updated', { detail: { items } }));
  } catch (e) {
    console.error('Error saving wishlist:', e);
  }
}

/**
 * Add item to wishlist
 * @param {Object} item - Wishlist item to add
 * @returns {boolean} True if added, false if already exists
 */
export function addToWishlist(item) {
  const items = getWishlist();
  
  // Check if item already exists (by drummer + gearType combo)
  const exists = items.some(
    i => i.drummerSlug === item.drummerSlug && i.gearType === item.gearType
  );
  
  if (exists) {
    return false;
  }
  
  // Create item with unique ID and timestamp
  const newItem = {
    ...item,
    id: `${item.drummerSlug}-${item.gearType}-${Date.now()}`,
    addedAt: Date.now(),
  };
  
  items.push(newItem);
  saveWishlist(items);
  
  // Track in GA4
  trackWishlistEvent('add', newItem);
  
  return true;
}

/**
 * Remove item from wishlist by ID
 * @param {string} itemId - Item ID to remove
 */
export function removeFromWishlist(itemId) {
  const items = getWishlist();
  const newItems = items.filter(i => i.id !== itemId);
  
  if (newItems.length < items.length) {
    saveWishlist(newItems);
    trackWishlistEvent('remove', { id: itemId });
  }
}

/**
 * Clear entire wishlist
 */
export function clearWishlist() {
  saveWishlist([]);
  trackWishlistEvent('clear', { count: 0 });
}

/**
 * Check if item is in wishlist
 * @param {string} drummerSlug - Drummer slug
 * @param {string} gearType - Gear type
 * @returns {boolean}
 */
export function isInWishlist(drummerSlug, gearType) {
  const items = getWishlist();
  return items.some(
    i => i.drummerSlug === drummerSlug && i.gearType === gearType
  );
}

/**
 * Get wishlist item count
 * @returns {number}
 */
export function getWishlistCount() {
  return getWishlist().length;
}

/**
 * Calculate total wishlist cost
 * @returns {Object} { totalEur, totalUsd }
 */
export function calculateWishlistTotal() {
  const items = getWishlist();
  const EUR_TO_USD = 1.08;
  
  const totalEur = items.reduce((sum, item) => sum + (item.estimatedPrice || 0), 0);
  const totalUsd = Math.round(totalEur * EUR_TO_USD);
  
  return { totalEur, totalUsd };
}

/**
 * Generate shareable URL from current wishlist
 * @returns {string} Full URL with base64-encoded wishlist
 */
export function generateShareUrl() {
  const items = getWishlist();
  
  if (items.length === 0) {
    return '';
  }
  
  // Minify items for URL (keep only essential fields)
  const minified = items.map(item => ({
    ds: item.drummerSlug,
    dn: item.drummerName,
    gt: item.gearType,
    in: item.itemName,
    pp: item.primaryProduct,
    ep: item.estimatedPrice,
  }));
  
  const json = JSON.stringify(minified);
  const base64 = btoa(encodeURIComponent(json));
  
  const baseUrl = typeof window !== 'undefined' 
    ? window.location.origin 
    : 'https://metalforge.io';
  
  return `${baseUrl}/wishlist?list=${base64}`;
}

/**
 * Parse wishlist from URL parameter
 * @param {string} encodedList - Base64-encoded list from URL
 * @returns {Array} Array of wishlist items
 */
export function parseWishlistFromUrl(encodedList) {
  if (!encodedList) return [];
  
  try {
    const json = decodeURIComponent(atob(encodedList));
    const minified = JSON.parse(json);
    
    // Expand minified items
    return minified.map((item, index) => ({
      id: `shared-${item.ds}-${item.gt}-${index}`,
      drummerSlug: item.ds,
      drummerName: item.dn,
      gearType: item.gt,
      itemName: item.in,
      primaryProduct: item.pp,
      estimatedPrice: item.ep,
      addedAt: Date.now(),
      isShared: true, // Mark as from shared URL
    }));
  } catch (e) {
    console.error('Error parsing shared wishlist:', e);
    return [];
  }
}

/**
 * Import shared wishlist items into local storage
 * @param {Array} sharedItems - Items from parsed URL
 * @returns {number} Number of new items added
 */
export function importSharedWishlist(sharedItems) {
  const currentItems = getWishlist();
  let addedCount = 0;
  
  sharedItems.forEach(item => {
    const exists = currentItems.some(
      i => i.drummerSlug === item.drummerSlug && i.gearType === item.gearType
    );
    
    if (!exists) {
      currentItems.push({
        ...item,
        id: `${item.drummerSlug}-${item.gearType}-${Date.now()}-${addedCount}`,
        isShared: false, // Clear shared flag when imported
      });
      addedCount++;
    }
  });
  
  if (addedCount > 0) {
    saveWishlist(currentItems);
    trackWishlistEvent('import', { count: addedCount });
  }
  
  return addedCount;
}

/**
 * Generate Sweetwater "Buy All" link with UTM tracking
 * @param {Array} items - Wishlist items (optional, uses current wishlist if not provided)
 * @returns {string} Sweetwater search URL
 */
export function getBuyAllSweetwaterLink(items = null) {
  const wishlistItems = items || getWishlist();
  
  if (wishlistItems.length === 0) return '';
  
  // Use first item's primary product for search (Sweetwater doesn't support multi-search)
  // But we can create a broad search term combining key items
  const searchTerms = wishlistItems
    .slice(0, 3) // Limit to avoid URL length issues
    .map(i => i.primaryProduct)
    .filter(Boolean)
    .join(' ');
  
  const query = encodeURIComponent(searchTerms);
  const utmParams = 'utm_source=metaldrummergear&utm_medium=affiliate&utm_campaign=wishlist-buy-all';
  
  return `https://www.sweetwater.com/store/search?s=${query}&ref=metaldrummergear&${utmParams}`;
}

/**
 * Generate Thomann "Buy All" link with UTM tracking
 * @param {Array} items - Wishlist items (optional, uses current wishlist if not provided)
 * @returns {string} Thomann search URL
 */
export function getBuyAllThomannLink(items = null) {
  const wishlistItems = items || getWishlist();
  
  if (wishlistItems.length === 0) return '';
  
  const searchTerms = wishlistItems
    .slice(0, 3)
    .map(i => i.primaryProduct)
    .filter(Boolean)
    .join(' ');
  
  const query = encodeURIComponent(searchTerms);
  const utmParams = 'utm_source=metaldrummergear&utm_medium=affiliate&utm_campaign=wishlist-buy-all';
  
  return `https://www.thomann.de/intl/search_dir.html?sw=${query}&ref=metaldrummergear&${utmParams}`;
}

/**
 * Track wishlist events in GA4
 * @param {string} action - Event action (add, remove, clear, share, buy_all, import, page_view)
 * @param {Object} data - Additional event data
 */
export function trackWishlistEvent(action, data = {}) {
  if (typeof window === 'undefined' || !window.gtag) {
    return;
  }
  
  try {
    window.gtag('event', `wishlist_${action}`, {
      event_category: 'wishlist',
      event_label: data.itemName || data.primaryProduct || action,
      value: data.estimatedPrice || data.count || 0,
      drummer_name: data.drummerName || '',
      gear_type: data.gearType || '',
      items_count: getWishlistCount(),
    });
  } catch (e) {
    console.error('Error tracking wishlist event:', e);
  }
}

/**
 * React hook for wishlist state
 * Returns [items, { add, remove, clear, isInList, count, total }]
 */
export function useWishlist() {
  // Import React dynamically to avoid issues with non-React environments
  const React = require('react');
  const { useState, useEffect, useCallback } = React;
  
  const [items, setItems] = useState(() => getWishlist());
  
  // Listen for wishlist updates from other components
  useEffect(() => {
    const handleUpdate = (e) => {
      setItems(e.detail?.items || getWishlist());
    };
    
    window.addEventListener('wishlist-updated', handleUpdate);
    return () => window.removeEventListener('wishlist-updated', handleUpdate);
  }, []);
  
  const add = useCallback((item) => {
    const added = addToWishlist(item);
    if (added) {
      setItems(getWishlist());
    }
    return added;
  }, []);
  
  const remove = useCallback((itemId) => {
    removeFromWishlist(itemId);
    setItems(getWishlist());
  }, []);
  
  const clear = useCallback(() => {
    clearWishlist();
    setItems([]);
  }, []);
  
  const isInList = useCallback((drummerSlug, gearType) => {
    return items.some(
      i => i.drummerSlug === drummerSlug && i.gearType === gearType
    );
  }, [items]);
  
  return [
    items,
    {
      add,
      remove,
      clear,
      isInList,
      count: items.length,
      total: calculateWishlistTotal(),
      generateShareUrl,
      getBuyAllSweetwaterLink: () => getBuyAllSweetwaterLink(items),
      getBuyAllThomannLink: () => getBuyAllThomannLink(items),
    }
  ];
}

/**
 * Check if current page is wishlist page
 * @returns {boolean}
 */
export function isWishlistPage() {
  if (typeof window === 'undefined') return false;
  return window.location.pathname === '/wishlist' || window.location.pathname === '/wishlist/';
}

/**
 * Get shared wishlist from URL if present
 * @returns {Array|null} Shared items or null if not a shared wishlist URL
 */
export function getSharedWishlistFromUrl() {
  if (typeof window === 'undefined') return null;
  
  const params = new URLSearchParams(window.location.search);
  const listParam = params.get('list');
  
  if (!listParam) return null;
  
  return parseWishlistFromUrl(listParam);
}

/**
 * Update OG meta tags for wishlist page
 */
export function updateWishlistMeta() {
  if (typeof document === 'undefined') return;
  
  const items = getWishlist();
  const total = calculateWishlistTotal();
  const count = items.length;
  
  const title = count > 0 
    ? `My Wishlist (${count} items) - MetalForge` 
    : 'My Wishlist - MetalForge';
  
  const description = count > 0
    ? `My dream metal drum setup: ${count} gear items totaling €${total.totalEur.toLocaleString()}. Build your own wishlist at MetalForge.`
    : 'Save your dream metal drum gear to your wishlist. Compare prices and buy from Sweetwater or Thomann.';
  
  // Update meta tags
  document.title = title;
  
  const metaTags = {
    'og:title': title,
    'og:description': description,
    'twitter:title': title,
    'twitter:description': description,
    'description': description,
  };
  
  Object.entries(metaTags).forEach(([property, content]) => {
    let meta = document.querySelector(`meta[property="${property}"]`) 
      || document.querySelector(`meta[name="${property}"]`);
    
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute(property.startsWith('og:') || property.startsWith('twitter:') ? 'property' : 'name', property);
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);
  });
}
