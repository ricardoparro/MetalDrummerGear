/**
 * QuizShareButtons - Social share buttons for quiz results
 * Issue #678: Add viral social sharing to drive growth
 * Issue #680: Enhancements - Native Share API, match %, OG meta updates
 * Issue #682: Dynamic OG images with MetalForge branding for social previews
 * 
 * Features:
 * - Twitter/X, Facebook, WhatsApp, Copy Link, Native Share buttons
 * - Pre-filled share text: "I got [Drummer Name]! 🤘 Which legendary metal drummer matches your style? Take the quiz: [URL]"
 * - GA4 event tracking (event: quiz_share, params: drummer, platform)
 * - Mobile responsive design with Native Share API
 * - Updates OG meta tags for rich social previews
 * - Dynamic OG images with drummer photo and MetalForge branding (#682)
 * - Matches MetalForge brand colors
 */

import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Platform,
  useWindowDimensions,
  Alert,
} from 'react-native';
import { colors } from '../colors';
import { fontSize, fontWeight } from '../typography';
import { spacing } from '../spacing';

// GA4 event tracking for quiz shares
const trackQuizShare = (drummer, platform, matchPercentage = null) => {
  if (Platform.OS === 'web' && typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'quiz_share', {
      drummer: drummer.name,
      platform: platform,
      drummer_id: drummer.id,
      drummer_band: drummer.band,
      match_percentage: matchPercentage,
    });
  }
};

// Generate share URL with UTM tracking parameters (Issue #684)
// UTM params: utm_source=[platform], utm_medium=social, utm_campaign=quiz_share
const getShareUrl = (drummer = null, platform = 'share') => {
  const baseUrl = 'https://metalforge.io/quiz';
  const utmParams = `utm_source=${platform}&utm_medium=social&utm_campaign=quiz_share`;
  if (drummer) {
    const drummerSlug = drummer.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    return `${baseUrl}?drummer=${drummerSlug}&${utmParams}`;
  }
  return `${baseUrl}?${utmParams}`;
};

// Generate pre-filled share text with optional match percentage
const getShareText = (drummer, matchPercentage = null) => {
  const matchText = matchPercentage ? ` (${matchPercentage}% match!)` : '';
  return `I got ${drummer.name}!${matchText} 🤘 Which legendary metal drummer matches your style? Take the quiz:`;
};

// Check if Native Share API is available
const isNativeShareSupported = () => {
  return Platform.OS === 'web' && 
         typeof navigator !== 'undefined' && 
         typeof navigator.share === 'function';
};

// Generate dynamic OG image URL with MetalForge branding (#682)
const getDynamicOgImageUrl = (drummer, matchPercentage = null) => {
  const drummerSlug = drummer.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const match = matchPercentage || 85;
  return `https://metalforge.io/api/og/quiz?drummer=${drummerSlug}&match=${match}`;
};

// Update OG meta tags for social preview
const updateShareMeta = (drummer, matchPercentage = null) => {
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
  
  const drummerSlug = drummer.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const matchText = matchPercentage ? ` - ${matchPercentage}% Match` : '';
  const title = `I Drum Like ${drummer.name}!${matchText} | MetalForge Quiz`;
  const description = `I got ${drummer.name} (${drummer.band})! Take the Metal Drummer Quiz to find out which legendary drummer's setup and style matches yours! 🤘`;
  const shareUrl = `https://metalforge.io/quiz?result=${drummerSlug}`;
  
  // Issue #682: Use dynamic OG image with MetalForge branding
  const image = getDynamicOgImageUrl(drummer, matchPercentage);
  
  document.title = title;
  setMeta('description', description);
  setMeta('og:title', title, true);
  setMeta('og:description', description, true);
  setMeta('og:type', 'website', true);
  setMeta('og:url', shareUrl, true);
  setMeta('og:image', image, true);
  setMeta('og:image:width', '1200', true);
  setMeta('og:image:height', '630', true);
  setMeta('og:site_name', 'MetalForge', true);
  setMeta('twitter:card', 'summary_large_image');
  setMeta('twitter:site', '@MetalDrumGear');
  setMeta('twitter:title', title);
  setMeta('twitter:description', description);
  setMeta('twitter:image', image);
  
  // Update URL without refresh for better sharing
  if (typeof window !== 'undefined' && window.history) {
    window.history.replaceState({}, '', shareUrl);
  }
};

// Share handlers for each platform
// Each handler passes platform to getShareUrl for UTM tracking (Issue #684)
const shareHandlers = {
  twitter: async (drummer, matchPercentage = null) => {
    const shareUrl = getShareUrl(drummer, 'twitter');
    const shareText = getShareText(drummer, matchPercentage);
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}&hashtags=MetalDrummer,MetalDrumGear`;
    
    trackQuizShare(drummer, 'twitter', matchPercentage);
    
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.open(url, '_blank', 'width=600,height=400,scrollbars=yes');
    }
  },
  
  facebook: async (drummer, matchPercentage = null) => {
    const shareUrl = getShareUrl(drummer, 'facebook');
    const shareText = getShareText(drummer, matchPercentage);
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
    
    trackQuizShare(drummer, 'facebook', matchPercentage);
    
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.open(url, '_blank', 'width=600,height=400,scrollbars=yes');
    }
  },
  
  whatsapp: async (drummer, matchPercentage = null) => {
    const shareUrl = getShareUrl(drummer, 'whatsapp');
    const shareText = getShareText(drummer, matchPercentage);
    const url = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`;
    
    trackQuizShare(drummer, 'whatsapp', matchPercentage);
    
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.open(url, '_blank', 'width=600,height=400');
    }
  },
  
  copy: async (drummer, setCopied, matchPercentage = null) => {
    const shareUrl = getShareUrl(drummer, 'copy');
    const shareText = getShareText(drummer, matchPercentage);
    const fullText = `${shareText} ${shareUrl}`;
    
    trackQuizShare(drummer, 'copy', matchPercentage);
    
    if (Platform.OS === 'web' && typeof navigator !== 'undefined' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(fullText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
        Alert.alert('Error', 'Failed to copy link');
      }
    }
  },
  
  native: async (drummer, matchPercentage = null) => {
    const shareUrl = getShareUrl(drummer, 'native');
    const shareText = getShareText(drummer, matchPercentage);
    
    trackQuizShare(drummer, 'native', matchPercentage);
    
    if (isNativeShareSupported()) {
      try {
        await navigator.share({
          title: `I Drum Like ${drummer.name}! | MetalForge Quiz`,
          text: shareText,
          url: shareUrl,
        });
        return true;
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Native share failed:', err);
        }
        return false;
      }
    }
    return false;
  },
};

/**
 * QuizShareButtons Component
 * 
 * @param {Object} props
 * @param {Object} props.drummer - The matched drummer object { id, name, band, image }
 * @param {Object} props.theme - Theme object with colors
 * @param {string} [props.title] - Optional custom title (default: "🔥 Share Your Result")
 * @param {boolean} [props.showLabels] - Show platform labels under icons (default: false on mobile)
 * @param {number} [props.matchPercentage] - Match percentage to include in share text
 * @param {function} [props.onShare] - Optional callback when a share is triggered
 */
export function QuizShareButtons({ 
  drummer, 
  theme, 
  title = "🔥 Share Your Result",
  showLabels,
  matchPercentage,
  onShare,
}) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const [copied, setCopied] = useState(false);
  const [hasNativeShare, setHasNativeShare] = useState(false);
  
  // Default showLabels based on screen size
  const displayLabels = showLabels ?? !isMobile;

  // Check for native share support and update meta tags
  useEffect(() => {
    setHasNativeShare(isNativeShareSupported());
    
    // Update OG meta tags when drummer result is shown
    if (drummer) {
      updateShareMeta(drummer, matchPercentage);
    }
  }, [drummer, matchPercentage]);

  if (!drummer) return null;

  const handleShare = async (platform) => {
    if (platform === 'copy') {
      await shareHandlers.copy(drummer, setCopied, matchPercentage);
    } else if (platform === 'native') {
      await shareHandlers.native(drummer, matchPercentage);
    } else {
      await shareHandlers[platform](drummer, matchPercentage);
    }
    
    // Call optional callback
    if (onShare) {
      onShare(platform, drummer);
    }
  };

  return (
    <View style={styles.container}>
      {title && (
        <Text style={[styles.title, { color: theme.text }]}>
          {title}
        </Text>
      )}
      
      <View style={[styles.buttonsRow, isMobile && styles.buttonsRowMobile]}>
        {/* Native Share (mobile only when supported) */}
        {hasNativeShare && isMobile && (
          <TouchableOpacity
            onPress={() => handleShare('native')}
            style={[styles.button, styles.buttonNative, { backgroundColor: theme.primary }]}
            accessibilityRole="button"
            accessibilityLabel="Share result"
          >
            <Text style={styles.buttonIcon}>📤</Text>
            {displayLabels && <Text style={styles.buttonLabel}>Share</Text>}
          </TouchableOpacity>
        )}

        {/* Twitter/X */}
        <TouchableOpacity
          onPress={() => handleShare('twitter')}
          style={[styles.button, styles.buttonTwitter]}
          accessibilityRole="button"
          accessibilityLabel="Share on Twitter"
        >
          <Text style={styles.buttonIcon}>𝕏</Text>
          {displayLabels && <Text style={styles.buttonLabel}>Twitter</Text>}
        </TouchableOpacity>

        {/* Facebook */}
        <TouchableOpacity
          onPress={() => handleShare('facebook')}
          style={[styles.button, styles.buttonFacebook]}
          accessibilityRole="button"
          accessibilityLabel="Share on Facebook"
        >
          <Text style={styles.buttonIcon}>f</Text>
          {displayLabels && <Text style={styles.buttonLabel}>Facebook</Text>}
        </TouchableOpacity>

        {/* WhatsApp */}
        <TouchableOpacity
          onPress={() => handleShare('whatsapp')}
          style={[styles.button, styles.buttonWhatsApp]}
          accessibilityRole="button"
          accessibilityLabel="Share on WhatsApp"
        >
          <Text style={styles.buttonIcon}>💬</Text>
          {displayLabels && <Text style={styles.buttonLabel}>WhatsApp</Text>}
        </TouchableOpacity>

        {/* Copy Link */}
        <TouchableOpacity
          onPress={() => handleShare('copy')}
          style={[styles.button, styles.buttonCopy, { backgroundColor: theme.border }]}
          accessibilityRole="button"
          accessibilityLabel={copied ? "Link copied!" : "Copy link"}
        >
          <Text style={[styles.buttonIcon, { color: theme.text }]}>
            {copied ? '✓' : '🔗'}
          </Text>
          {displayLabels && (
            <Text style={[styles.buttonLabel, { color: theme.text }]}>
              {copied ? 'Copied!' : 'Copy'}
            </Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Share preview text */}
      <Text style={[styles.previewText, { color: theme.secondaryText }]}>
        "I got {drummer.name}!{matchPercentage ? ` (${matchPercentage}% match!)` : ''} 🤘 Which legendary metal drummer matches your style?"
      </Text>

      {/* Viral loop hint */}
      <Text style={[styles.viralHint, { color: theme.secondaryText }]}>
        Share to challenge your friends!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[3],
  },
  title: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    marginBottom: spacing[4],
    textAlign: 'center',
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing[3],
    flexWrap: 'wrap',
  },
  buttonsRowMobile: {
    gap: spacing[4],
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    // Shadow for depth
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonTwitter: {
    backgroundColor: '#000000', // X/Twitter black
  },
  buttonFacebook: {
    backgroundColor: '#1877F2', // Facebook blue
  },
  buttonWhatsApp: {
    backgroundColor: '#25D366', // WhatsApp green
  },
  buttonCopy: {
    backgroundColor: colors.border.default,
  },
  buttonNative: {
    backgroundColor: '#dc2626', // MetalForge primary red
  },
  buttonIcon: {
    color: '#ffffff',
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
  },
  buttonLabel: {
    color: '#ffffff',
    fontSize: 10,
    marginTop: 2,
    fontWeight: fontWeight.medium,
  },
  previewText: {
    marginTop: spacing[4],
    fontSize: fontSize.sm,
    fontStyle: 'italic',
    textAlign: 'center',
    maxWidth: 300,
    lineHeight: 20,
  },
  viralHint: {
    marginTop: spacing[2],
    fontSize: fontSize.xs,
    textAlign: 'center',
    opacity: 0.8,
  },
});

// Also export individual share functions for flexibility
export { 
  trackQuizShare, 
  getShareUrl, 
  getShareText, 
  shareHandlers, 
  updateShareMeta, 
  isNativeShareSupported,
  getDynamicOgImageUrl,  // Issue #682: Export for use in ogMetaTags.js
};

export default QuizShareButtons;
