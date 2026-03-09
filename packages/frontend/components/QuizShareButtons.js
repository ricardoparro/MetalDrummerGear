/**
 * QuizShareButtons - Social share buttons for quiz results
 * Issue #678: Add viral social sharing to drive growth
 * 
 * Features:
 * - Twitter/X, Facebook, WhatsApp, Copy Link buttons
 * - Pre-filled share text: "I got [Drummer Name]! 🤘 Which legendary metal drummer matches your style? Take the quiz: [URL]"
 * - GA4 event tracking (event: quiz_share, params: drummer, platform)
 * - Mobile responsive design
 * - Matches MetalForge brand colors
 */

import React, { useState } from 'react';
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
const trackQuizShare = (drummer, platform) => {
  if (Platform.OS === 'web' && typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'quiz_share', {
      drummer: drummer.name,
      platform: platform,
      drummer_id: drummer.id,
      drummer_band: drummer.band,
    });
  }
};

// Generate share URL - always links to quiz for viral loop
const getShareUrl = () => 'https://metalforge.io/quiz';

// Generate pre-filled share text
const getShareText = (drummer) => 
  `I got ${drummer.name}! 🤘 Which legendary metal drummer matches your style? Take the quiz:`;

// Share handlers for each platform
const shareHandlers = {
  twitter: async (drummer) => {
    const shareUrl = getShareUrl();
    const shareText = getShareText(drummer);
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}&hashtags=MetalDrummer,MetalDrumGear`;
    
    trackQuizShare(drummer, 'twitter');
    
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.open(url, '_blank', 'width=600,height=400,scrollbars=yes');
    }
  },
  
  facebook: async (drummer) => {
    const shareUrl = getShareUrl();
    const shareText = getShareText(drummer);
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
    
    trackQuizShare(drummer, 'facebook');
    
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.open(url, '_blank', 'width=600,height=400,scrollbars=yes');
    }
  },
  
  whatsapp: async (drummer) => {
    const shareUrl = getShareUrl();
    const shareText = getShareText(drummer);
    const url = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`;
    
    trackQuizShare(drummer, 'whatsapp');
    
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.open(url, '_blank', 'width=600,height=400');
    }
  },
  
  copy: async (drummer, setCopied) => {
    const shareUrl = getShareUrl();
    const shareText = getShareText(drummer);
    const fullText = `${shareText} ${shareUrl}`;
    
    trackQuizShare(drummer, 'copy');
    
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
};

/**
 * QuizShareButtons Component
 * 
 * @param {Object} props
 * @param {Object} props.drummer - The matched drummer object { id, name, band, image }
 * @param {Object} props.theme - Theme object with colors
 * @param {string} [props.title] - Optional custom title (default: "🔥 Share Your Result")
 * @param {boolean} [props.showLabels] - Show platform labels under icons (default: false on mobile)
 * @param {function} [props.onShare] - Optional callback when a share is triggered
 */
export function QuizShareButtons({ 
  drummer, 
  theme, 
  title = "🔥 Share Your Result",
  showLabels,
  onShare,
}) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const [copied, setCopied] = useState(false);
  
  // Default showLabels based on screen size
  const displayLabels = showLabels ?? !isMobile;

  if (!drummer) return null;

  const handleShare = async (platform) => {
    if (platform === 'copy') {
      await shareHandlers.copy(drummer, setCopied);
    } else {
      await shareHandlers[platform](drummer);
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
        "I got {drummer.name}! 🤘 Which legendary metal drummer matches your style?"
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
});

// Also export individual share functions for flexibility
export { trackQuizShare, getShareUrl, getShareText, shareHandlers };

export default QuizShareButtons;
