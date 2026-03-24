/**
 * GearCardShare Component - Issue #764
 * Download & Share Buttons for Drummer Gear Cards
 * 
 * Embeddable component for individual drummer profiles that enables:
 * - One-click download of gear cards (Instagram/Twitter formats)
 * - Social sharing (Twitter, Instagram story, copy link)
 * - Preview of generated cards
 * - Analytics tracking for viral metrics
 */

import { useState, useCallback, memo } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, Linking, Platform } from 'react-native';
import { Image } from 'expo-image';
import { colors } from '../colors';
import { spacing } from '../spacing';
import { fontSize, fontWeight, textStyles } from '../typography';

// Analytics tracking
export function trackGearCardEvent(action, drummerSlug, format) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: 'gear_cards',
      event_label: drummerSlug,
      card_format: format,
      drummer_slug: drummerSlug,
    });
  }
}

// Get card API URL
export function getCardUrl(slug, format = 'instagram', type = 'full') {
  const baseUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/api/card/${slug}`
    : `https://metalforge.io/api/card/${slug}`;
  
  const params = new URLSearchParams();
  if (format !== 'instagram') params.set('format', format);
  if (type !== 'full') params.set('type', type);
  
  return params.toString() ? `${baseUrl}?${params}` : baseUrl;
}

// Download card with analytics
async function downloadCard(slug, name, format) {
  trackGearCardEvent('download_gear_card', slug, format);
  
  try {
    const url = `${getCardUrl(slug, format)}&download=true`;
    const response = await fetch(url);
    const blob = await response.blob();
    
    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `${name.toLowerCase().replace(/\s+/g, '-')}-gear-card-${format}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(downloadUrl);
    
    return true;
  } catch (error) {
    console.error('Failed to download card:', error);
    // Fallback: open in new tab
    window.open(getCardUrl(slug, format), '_blank');
    return false;
  }
}

// Share handlers
const shareHandlers = {
  twitter: (slug, name, band) => {
    trackGearCardEvent('share_twitter', slug, 'twitter');
    const text = `Check out ${name}'s complete drum setup from ${band}! 🥁🔥\n\n#MetalDrumGear #DrumSetup #${band.replace(/\s+/g, '')}`;
    const url = `https://metalforge.io/drummer/${slug}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    Linking.openURL(twitterUrl);
  },
  
  instagram: (slug, name, format) => {
    trackGearCardEvent('share_instagram', slug, format);
    // Instagram doesn't have direct share URL, so we download for stories
    downloadCard(slug, name, 'instagram');
    // Show instructions
    if (typeof alert !== 'undefined') {
      alert('Card downloaded! Open Instagram, create a Story, and add the downloaded image.');
    }
  },
  
  copyLink: (slug, name) => {
    trackGearCardEvent('share_copy_link', slug, 'link');
    const url = `https://metalforge.io/drummer/${slug}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      return true;
    }
    return false;
  },
  
  native: async (slug, name, band) => {
    if (Platform.OS === 'web' && navigator.share) {
      trackGearCardEvent('share_native', slug, 'native');
      try {
        await navigator.share({
          title: `${name} Gear Setup - MetalForge`,
          text: `Check out ${name}'s complete drum setup from ${band}! 🥁🔥`,
          url: `https://metalforge.io/drummer/${slug}`,
        });
        return true;
      } catch (e) {
        return false;
      }
    }
    return false;
  },
};

// Inline Share Button
const ShareButton = memo(({ icon, label, onPress, style }) => (
  <TouchableOpacity 
    style={[styles.shareButton, style]} 
    onPress={onPress}
    accessibilityLabel={label}
    accessibilityRole="button"
  >
    <Text style={styles.shareButtonIcon}>{icon}</Text>
    <Text style={styles.shareButtonLabel}>{label}</Text>
  </TouchableOpacity>
));

// Download Button
const DownloadButton = memo(({ icon, label, format, onPress, isLoading }) => (
  <TouchableOpacity 
    style={[styles.downloadButton, isLoading && styles.buttonLoading]} 
    onPress={onPress}
    disabled={isLoading}
    accessibilityLabel={`Download ${format} card`}
    accessibilityRole="button"
  >
    <Text style={styles.downloadButtonIcon}>{isLoading ? '⏳' : icon}</Text>
    <View style={styles.downloadButtonContent}>
      <Text style={styles.downloadButtonLabel}>{label}</Text>
      <Text style={styles.downloadButtonFormat}>{format === 'instagram' ? '1080×1080' : '1200×675'}</Text>
    </View>
  </TouchableOpacity>
));

// Preview Modal
const CardPreviewModal = memo(({ visible, onClose, cardUrl, drummerName, format }) => (
  <Modal
    visible={visible}
    transparent
    animationType="fade"
    onRequestClose={onClose}
  >
    <TouchableOpacity 
      style={styles.modalBackdrop} 
      activeOpacity={1} 
      onPress={onClose}
    >
      <View style={styles.modalContent}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>{drummerName} Gear Card</Text>
          <TouchableOpacity onPress={onClose} style={styles.modalClose}>
            <Text style={styles.modalCloseText}>✕</Text>
          </TouchableOpacity>
        </View>
        <View style={[
          styles.previewContainer,
          format === 'twitter' ? styles.previewTwitter : styles.previewInstagram
        ]}>
          <Image
            source={{ uri: cardUrl }}
            style={styles.previewImage}
            contentFit="contain"
            transition={300}
          />
        </View>
        <Text style={styles.modalHint}>Tap outside to close</Text>
      </View>
    </TouchableOpacity>
  </Modal>
));

/**
 * GearCardShare - Main Component
 * 
 * @param {Object} props
 * @param {string} props.drummerSlug - URL slug for the drummer
 * @param {string} props.drummerName - Display name of the drummer
 * @param {string} props.bandName - Band name for share text
 * @param {boolean} props.compact - Use compact layout (default: false)
 * @param {boolean} props.showPreview - Show preview button (default: true)
 */
export function GearCardShare({ 
  drummerSlug, 
  drummerName, 
  bandName,
  compact = false,
  showPreview = true,
}) {
  const [isDownloading, setIsDownloading] = useState({ instagram: false, twitter: false });
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewFormat, setPreviewFormat] = useState('instagram');
  const [copied, setCopied] = useState(false);
  
  // Handle download
  const handleDownload = useCallback(async (format) => {
    setIsDownloading(prev => ({ ...prev, [format]: true }));
    await downloadCard(drummerSlug, drummerName, format);
    setIsDownloading(prev => ({ ...prev, [format]: false }));
  }, [drummerSlug, drummerName]);
  
  // Handle share
  const handleShare = useCallback((platform) => {
    if (platform === 'copyLink') {
      const success = shareHandlers.copyLink(drummerSlug, drummerName);
      if (success) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } else if (platform === 'instagram') {
      shareHandlers.instagram(drummerSlug, drummerName, 'instagram');
    } else if (platform === 'twitter') {
      shareHandlers.twitter(drummerSlug, drummerName, bandName);
    } else if (platform === 'native') {
      shareHandlers.native(drummerSlug, drummerName, bandName);
    }
  }, [drummerSlug, drummerName, bandName]);
  
  // Handle preview
  const handlePreview = useCallback((format) => {
    trackGearCardEvent('preview_gear_card', drummerSlug, format);
    setPreviewFormat(format);
    setPreviewVisible(true);
  }, [drummerSlug]);
  
  // Check for native share support
  const hasNativeShare = Platform.OS === 'web' && typeof navigator !== 'undefined' && navigator.share;
  
  if (compact) {
    return (
      <View style={styles.compactContainer}>
        <TouchableOpacity 
          style={styles.compactButton}
          onPress={() => handleDownload('instagram')}
        >
          <Text style={styles.compactButtonText}>⬇️ Download Card</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.compactButton}
          onPress={() => handleShare(hasNativeShare ? 'native' : 'twitter')}
        >
          <Text style={styles.compactButtonText}>🔗 Share</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      {/* Section Header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>🎴 Gear Card</Text>
        <Text style={styles.sectionSubtitle}>Download & share on social media</Text>
      </View>
      
      {/* Download Buttons */}
      <View style={styles.downloadSection}>
        <Text style={styles.downloadLabel}>Download</Text>
        <View style={styles.downloadButtons}>
          <DownloadButton
            icon="📸"
            label="Instagram"
            format="instagram"
            onPress={() => handleDownload('instagram')}
            isLoading={isDownloading.instagram}
          />
          <DownloadButton
            icon="🐦"
            label="Twitter/X"
            format="twitter"
            onPress={() => handleDownload('twitter')}
            isLoading={isDownloading.twitter}
          />
        </View>
      </View>
      
      {/* Preview Buttons */}
      {showPreview && (
        <View style={styles.previewSection}>
          <Text style={styles.previewLabel}>Preview</Text>
          <View style={styles.previewButtons}>
            <TouchableOpacity 
              style={styles.previewButton}
              onPress={() => handlePreview('instagram')}
            >
              <Text style={styles.previewButtonText}>👁️ Instagram</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.previewButton}
              onPress={() => handlePreview('twitter')}
            >
              <Text style={styles.previewButtonText}>👁️ Twitter</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      
      {/* Share Buttons */}
      <View style={styles.shareSection}>
        <Text style={styles.shareLabel}>Share</Text>
        <View style={styles.shareButtons}>
          <ShareButton
            icon="🐦"
            label="Twitter"
            onPress={() => handleShare('twitter')}
          />
          <ShareButton
            icon="📷"
            label="Instagram"
            onPress={() => handleShare('instagram')}
          />
          <ShareButton
            icon={copied ? "✅" : "🔗"}
            label={copied ? "Copied!" : "Copy Link"}
            onPress={() => handleShare('copyLink')}
            style={copied && styles.copiedButton}
          />
          {hasNativeShare && (
            <ShareButton
              icon="📤"
              label="More"
              onPress={() => handleShare('native')}
            />
          )}
        </View>
      </View>
      
      {/* Tip */}
      <View style={styles.tipContainer}>
        <Text style={styles.tipText}>
          💡 Tag <Text style={styles.tipHighlight}>@MetalDrumGear</Text> when sharing!
        </Text>
      </View>
      
      {/* Preview Modal */}
      <CardPreviewModal
        visible={previewVisible}
        onClose={() => setPreviewVisible(false)}
        cardUrl={getCardUrl(drummerSlug, previewFormat)}
        drummerName={drummerName}
        format={previewFormat}
      />
    </View>
  );
}

// Compact inline share for list views
export function GearCardShareInline({ drummerSlug, drummerName, bandName }) {
  const [downloading, setDownloading] = useState(false);
  
  const handleQuickShare = useCallback(async () => {
    setDownloading(true);
    await downloadCard(drummerSlug, drummerName, 'instagram');
    setDownloading(false);
  }, [drummerSlug, drummerName]);
  
  return (
    <TouchableOpacity 
      style={styles.inlineButton}
      onPress={handleQuickShare}
      disabled={downloading}
    >
      <Text style={styles.inlineButtonText}>
        {downloading ? '⏳' : '🎴'} {downloading ? 'Downloading...' : 'Get Gear Card'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: spacing.md,
    marginVertical: spacing.md,
  },
  sectionHeader: {
    marginBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    paddingBottom: spacing.sm,
  },
  sectionTitle: {
    ...textStyles.h3,
    color: colors.text,
    marginBottom: 4,
  },
  sectionSubtitle: {
    ...textStyles.small,
    color: colors.textSecondary,
  },
  
  // Download Section
  downloadSection: {
    marginBottom: spacing.md,
  },
  downloadLabel: {
    ...textStyles.label,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.sm,
  },
  downloadButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  downloadButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 107, 53, 0.15)',
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 12,
    padding: spacing.sm,
    gap: spacing.sm,
  },
  downloadButtonIcon: {
    fontSize: 24,
  },
  downloadButtonContent: {
    flex: 1,
  },
  downloadButtonLabel: {
    color: colors.text,
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
  },
  downloadButtonFormat: {
    color: colors.textMuted,
    fontSize: fontSize.xs,
    marginTop: 2,
  },
  buttonLoading: {
    opacity: 0.6,
  },
  
  // Preview Section
  previewSection: {
    marginBottom: spacing.md,
  },
  previewLabel: {
    ...textStyles.label,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.sm,
  },
  previewButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  previewButton: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
    padding: spacing.sm,
  },
  previewButtonText: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
  },
  
  // Share Section
  shareSection: {
    marginBottom: spacing.md,
  },
  shareLabel: {
    ...textStyles.label,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.sm,
  },
  shareButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 8,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    gap: 6,
  },
  shareButtonIcon: {
    fontSize: 16,
  },
  shareButtonLabel: {
    color: colors.text,
    fontSize: fontSize.sm,
  },
  copiedButton: {
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
    borderColor: '#22c55e',
  },
  
  // Tip
  tipContainer: {
    alignItems: 'center',
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  tipText: {
    color: colors.textMuted,
    fontSize: fontSize.sm,
  },
  tipHighlight: {
    color: colors.primary,
    fontWeight: fontWeight.semibold,
  },
  
  // Compact Layout
  compactContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  compactButton: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 107, 53, 0.1)',
    borderRadius: 8,
    paddingVertical: spacing.sm,
  },
  compactButtonText: {
    color: colors.text,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },
  
  // Inline Button
  inlineButton: {
    backgroundColor: 'rgba(255, 107, 53, 0.15)',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  inlineButtonText: {
    color: colors.primary,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },
  
  // Modal
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.md,
  },
  modalContent: {
    width: '100%',
    maxWidth: 600,
    backgroundColor: colors.card,
    borderRadius: 16,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  modalTitle: {
    ...textStyles.h3,
    color: colors.text,
  },
  modalClose: {
    padding: spacing.xs,
  },
  modalCloseText: {
    color: colors.textSecondary,
    fontSize: 20,
  },
  previewContainer: {
    width: '100%',
    backgroundColor: '#0a0a0a',
  },
  previewInstagram: {
    aspectRatio: 1,
  },
  previewTwitter: {
    aspectRatio: 1200/675,
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  modalHint: {
    color: colors.textMuted,
    fontSize: fontSize.sm,
    textAlign: 'center',
    padding: spacing.sm,
  },
});

export default GearCardShare;
