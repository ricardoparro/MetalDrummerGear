// Image optimization utilities for MetalDrummerGear
// Reduces Vercel bandwidth costs by:
// 1. Proxying external images through /api/image with CDN caching
// 2. Requesting appropriately sized images (Wikipedia thumb URLs)
// 3. Using responsive width hints

const IS_PRODUCTION = typeof window !== 'undefined' && 
  window.location && 
  !window.location.hostname.includes('localhost');

const API_BASE = IS_PRODUCTION ? '' : '';

// Domains that should be proxied through our image optimization API
const PROXY_DOMAINS = [
  'upload.wikimedia.org',
  'commons.wikimedia.org',
];

// Standard responsive breakpoints (match ALLOWED_WIDTHS in api/image)
export const IMAGE_WIDTHS = {
  thumbnail: 64,      // List items, small avatars
  small: 128,         // Grid thumbnails
  medium: 256,        // Cards, medium avatars
  large: 384,         // Large cards
  hero: 640,          // Hero images, detail pages
  full: 1080,         // Full-width images
};

// Standard srcset widths for responsive images
export const SRCSET_WIDTHS = [400, 800, 1200];

/**
 * Check if a URL should be proxied through our image optimization API
 */
function shouldProxy(url) {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    return PROXY_DOMAINS.some(domain => parsed.hostname.endsWith(domain));
  } catch {
    return false;
  }
}

/**
 * Get optimized image URL
 * @param {string} originalUrl - The original image URL
 * @param {object} options - Optimization options
 * @param {number} options.width - Desired width (will snap to nearest allowed width)
 * @param {number} options.quality - Quality 10-100 (default 80)
 * @returns {string} Optimized image URL
 */
export function getOptimizedImageUrl(originalUrl, options = {}) {
  if (!originalUrl) return originalUrl;
  
  // Local images are already optimized and cached via vercel.json headers
  if (originalUrl.startsWith('/images/') || originalUrl.startsWith('/api/')) {
    return originalUrl;
  }
  
  // Only proxy external images from allowed domains
  if (!shouldProxy(originalUrl)) {
    return originalUrl;
  }
  
  const { width, quality = 80 } = options;
  
  // Build proxy URL with optimization parameters
  const params = new URLSearchParams();
  params.set('url', originalUrl);
  
  if (width) {
    params.set('w', String(width));
  }
  
  if (quality !== 80) {
    params.set('q', String(quality));
  }
  
  return `${API_BASE}/api/image?${params.toString()}`;
}

/**
 * Get responsive image sources for different screen sizes
 * @param {string} originalUrl - The original image URL
 * @param {number[]} widths - Array of widths to generate
 * @returns {object[]} Array of { uri, width } objects
 */
export function getResponsiveImageSources(originalUrl, widths = [256, 512, 1080]) {
  return widths.map(width => ({
    uri: getOptimizedImageUrl(originalUrl, { width }),
    width,
  }));
}

/**
 * Generate srcset string for responsive images
 * @param {string} originalUrl - The original image URL  
 * @param {number[]} widths - Array of widths (default: SRCSET_WIDTHS)
 * @returns {string} srcset string for <img> tag
 */
export function generateSrcSet(originalUrl, widths = SRCSET_WIDTHS) {
  if (!originalUrl) return '';
  return widths.map(w => `${getOptimizedImageUrl(originalUrl, { width: w })} ${w}w`).join(', ');
}

/**
 * Get sizes attribute for responsive images based on context
 * @param {string} context - Image context: 'thumbnail', 'card', 'detail', 'gallery'
 * @returns {string} sizes attribute value
 */
export function getSizesAttribute(context = 'card') {
  switch (context) {
    case 'thumbnail':
      return '60px';
    case 'card':
      return '(max-width: 480px) 100vw, (max-width: 768px) 50vw, 400px';
    case 'detail':
      return '(max-width: 480px) 100vw, (max-width: 768px) 50vw, 800px';
    case 'gallery':
      return '(max-width: 480px) 90vw, (max-width: 768px) 45vw, 400px';
    default:
      return '(max-width: 768px) 100vw, 800px';
  }
}

/**
 * Precomputed optimized URLs for common drummer image sizes
 * Call this when fetching drummer data to pre-optimize URLs
 */
export function optimizeDrummerImages(drummer) {
  if (!drummer) return drummer;
  
  return {
    ...drummer,
    // Thumbnail for lists (small)
    thumbnailUrl: getOptimizedImageUrl(drummer.image, { width: IMAGE_WIDTHS.thumbnail }),
    // Medium size for cards
    cardImageUrl: getOptimizedImageUrl(drummer.image, { width: IMAGE_WIDTHS.medium }),
    // Large size for detail pages
    heroImageUrl: getOptimizedImageUrl(drummer.image, { width: IMAGE_WIDTHS.hero }),
    // Original URL preserved
    originalImageUrl: drummer.image,
    // Optimized photo gallery
    optimizedPhotos: drummer.photos?.map(photo => ({
      thumbnail: getOptimizedImageUrl(photo, { width: IMAGE_WIDTHS.small }),
      full: getOptimizedImageUrl(photo, { width: IMAGE_WIDTHS.full }),
      original: photo,
    })) || [],
  };
}

/**
 * expo-image props for optimal performance
 */
export const imageDefaults = {
  cachePolicy: 'memory-disk',
  transition: 200,
  contentFit: 'cover',
  placeholder: null,
};

export default {
  getOptimizedImageUrl,
  getResponsiveImageSources,
  generateSrcSet,
  getSizesAttribute,
  optimizeDrummerImages,
  imageDefaults,
  IMAGE_WIDTHS,
  SRCSET_WIDTHS,
};
