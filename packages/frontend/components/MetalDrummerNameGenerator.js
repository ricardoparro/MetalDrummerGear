/**
 * MetalDrummerNameGenerator - Viral name generator tool
 * Issue #704: Create 'Metal Drummer Name Generator' viral tool
 * 
 * Features:
 * - Input user's real name OR generate random
 * - Transform to metal drummer name with algorithm
 * - Match with famous drummer from database
 * - Social share buttons (Twitter/X, Facebook, WhatsApp, Copy Link)
 * - GA4 event tracking
 * - Mobile-first responsive design
 * - SEO optimized with schema markup
 */

import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, 
  Text, 
  TextInput,
  TouchableOpacity, 
  StyleSheet, 
  Platform,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import { Image } from 'expo-image';
import { colors } from '../colors';
import { fontSize, fontWeight, lineHeight } from '../typography';
import { spacing } from '../spacing';
import {
  generateMetalName,
  generateRandomMetalName,
  getDrummerMatchForName,
  getRandomDrummerMatch,
} from '../data/nameGeneratorData';

// ==========================================
// GA4 EVENT TRACKING
// ==========================================

// Track name generation event
export const trackNameGenerate = (hasInput) => {
  if (Platform.OS === 'web' && typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'name_generate', {
      has_input: hasInput,
    });
  }
};

// Track social share event
export const trackNameShare = (platform) => {
  if (Platform.OS === 'web' && typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'name_share', {
      platform: platform,
    });
  }
};

// Track drummer match click event
export const trackDrummerMatchClick = (drummerId) => {
  if (Platform.OS === 'web' && typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'drummer_match_click', {
      drummer_id: drummerId,
    });
  }
};

// ==========================================
// SHARE UTILITIES
// ==========================================

const getShareUrl = (metalName) => {
  const baseUrl = 'https://metalforge.io/tools/metal-drummer-name-generator';
  const utmParams = new URLSearchParams({
    utm_source: 'share',
    utm_medium: 'social',
    utm_campaign: 'name_generator',
  });
  return `${baseUrl}?${utmParams.toString()}`;
};

const getShareText = (metalName) => {
  return `My metal drummer name is ${metalName.fullName}! 🤘 What's yours?`;
};

// Check if Native Share API is available
const isNativeShareSupported = () => {
  return Platform.OS === 'web' && 
         typeof navigator !== 'undefined' && 
         typeof navigator.share === 'function';
};

// Share handlers
const shareHandlers = {
  twitter: async (metalName) => {
    const shareUrl = getShareUrl(metalName);
    const shareText = getShareText(metalName);
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}&hashtags=MetalDrummer,MetalForge`;
    
    trackNameShare('twitter');
    
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.open(url, '_blank', 'width=600,height=400,scrollbars=yes');
    }
  },
  
  facebook: async (metalName) => {
    const shareUrl = getShareUrl(metalName);
    const shareText = getShareText(metalName);
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
    
    trackNameShare('facebook');
    
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.open(url, '_blank', 'width=600,height=400,scrollbars=yes');
    }
  },
  
  whatsapp: async (metalName) => {
    const shareUrl = getShareUrl(metalName);
    const shareText = getShareText(metalName);
    const url = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`;
    
    trackNameShare('whatsapp');
    
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.open(url, '_blank', 'width=600,height=400');
    }
  },
  
  copy: async (metalName, setCopied) => {
    const shareUrl = getShareUrl(metalName);
    const shareText = getShareText(metalName);
    const fullText = `${shareText} ${shareUrl}`;
    
    trackNameShare('copy');
    
    if (Platform.OS === 'web' && typeof navigator !== 'undefined' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(fullText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  },
  
  native: async (metalName) => {
    const shareUrl = getShareUrl(metalName);
    const shareText = getShareText(metalName);
    
    trackNameShare('native');
    
    if (isNativeShareSupported()) {
      try {
        await navigator.share({
          title: 'My Metal Drummer Name | MetalForge',
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

// ==========================================
// SEO META TAGS
// ==========================================

export const updateNameGeneratorMeta = (metalName = null, drummerMatch = null) => {
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
  
  const title = metalName 
    ? `My Metal Drummer Name: ${metalName.fullName} | MetalForge`
    : 'Metal Drummer Name Generator | MetalForge';
  const description = metalName
    ? `My metal drummer name is ${metalName.fullName}! I match with ${drummerMatch?.name || 'a legendary drummer'}! Generate your metal drummer name at MetalForge.`
    : 'Discover your ultimate metal drummer name! Generate your heavy metal alias and find your legendary drummer match.';
  const url = 'https://metalforge.io/tools/metal-drummer-name-generator';
  const image = 'https://metalforge.io/images/og/name-generator.jpg';
  
  document.title = title;
  setMeta('description', description);
  setMeta('og:title', title, true);
  setMeta('og:description', description, true);
  setMeta('og:type', 'website', true);
  setMeta('og:url', url, true);
  setMeta('og:image', image, true);
  setMeta('og:image:width', '1200', true);
  setMeta('og:image:height', '630', true);
  setMeta('og:site_name', 'MetalForge', true);
  setMeta('twitter:card', 'summary_large_image');
  setMeta('twitter:site', '@MetalDrumGear');
  setMeta('twitter:title', title);
  setMeta('twitter:description', description);
  setMeta('twitter:image', image);
  
  // Set canonical
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', url);
  
  // Add WebApplication schema
  let schemaScript = document.querySelector('script[data-schema="name-generator"]');
  if (!schemaScript) {
    schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.setAttribute('data-schema', 'name-generator');
    document.head.appendChild(schemaScript);
  }
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Metal Drummer Name Generator",
    "description": "Generate your ultimate metal drummer name and find your legendary drummer match!",
    "url": url,
    "applicationCategory": "Entertainment",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "creator": {
      "@type": "Organization",
      "name": "MetalForge",
      "url": "https://metalforge.io"
    }
  };
  
  schemaScript.textContent = JSON.stringify(schema);
};

// ==========================================
// ROUTE DETECTION
// ==========================================

export function isNameGeneratorPage() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return false;
  const pathname = window.location.pathname;
  return pathname === '/tools/metal-drummer-name-generator' || 
         pathname === '/tools/metal-drummer-name-generator/' ||
         pathname === '/name-generator' ||
         pathname === '/name-generator/';
}

// ==========================================
// SHARE BUTTONS COMPONENT
// ==========================================

function ShareButtons({ metalName, theme }) {
  const [copied, setCopied] = useState(false);
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  
  const showNativeShare = isNativeShareSupported() && isMobile;
  
  const buttonStyle = [
    styles.shareBtn,
    { minWidth: isMobile ? 50 : 44, minHeight: isMobile ? 50 : 44 }
  ];
  
  return (
    <View style={styles.shareSection}>
      <Text style={[styles.shareTitle, { color: theme.text }]}>Share Your Metal Name! 🤘</Text>
      <View style={styles.shareButtons}>
        {showNativeShare && (
          <TouchableOpacity
            style={[buttonStyle, { backgroundColor: theme.accent }]}
            onPress={() => shareHandlers.native(metalName)}
            accessibilityLabel="Share via device"
            accessibilityRole="button"
          >
            <Text style={styles.shareBtnText}>📤</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity
          style={[buttonStyle, { backgroundColor: '#1DA1F2' }]}
          onPress={() => shareHandlers.twitter(metalName)}
          accessibilityLabel="Share on Twitter"
          accessibilityRole="button"
        >
          <Text style={styles.shareBtnText}>𝕏</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[buttonStyle, { backgroundColor: '#4267B2' }]}
          onPress={() => shareHandlers.facebook(metalName)}
          accessibilityLabel="Share on Facebook"
          accessibilityRole="button"
        >
          <Text style={styles.shareBtnText}>f</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[buttonStyle, { backgroundColor: '#25D366' }]}
          onPress={() => shareHandlers.whatsapp(metalName)}
          accessibilityLabel="Share on WhatsApp"
          accessibilityRole="button"
        >
          <Text style={styles.shareBtnText}>📱</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[buttonStyle, { backgroundColor: copied ? '#10b981' : theme.cardBg }]}
          onPress={() => shareHandlers.copy(metalName, setCopied)}
          accessibilityLabel={copied ? 'Copied!' : 'Copy link'}
          accessibilityRole="button"
        >
          <Text style={[styles.shareBtnText, { color: copied ? '#fff' : theme.text }]}>
            {copied ? '✓' : '🔗'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ==========================================
// RESULT CARD COMPONENT
// ==========================================

function ResultCard({ metalName, drummerMatch, theme, onGenerateAnother, onDrummerClick }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  
  return (
    <View style={[styles.resultCard, { backgroundColor: theme.cardBg, borderColor: theme.accent }]}>
      {/* Generated Name Display */}
      <View style={styles.nameDisplay}>
        <Text style={[styles.nameLabel, { color: theme.textMuted }]}>Your Metal Drummer Name:</Text>
        <Text style={[styles.generatedName, { color: theme.accent }]}>
          {metalName.fullName}
        </Text>
      </View>
      
      {/* Drummer Match */}
      <View style={styles.drummerMatch}>
        <Text style={[styles.matchLabel, { color: theme.textMuted }]}>You Match With:</Text>
        
        <TouchableOpacity
          style={[styles.drummerCard, { backgroundColor: theme.bg, borderColor: theme.border }]}
          onPress={() => onDrummerClick(drummerMatch)}
          accessibilityRole="button"
          accessibilityLabel={`View ${drummerMatch.name}'s profile`}
        >
          <Image
            source={{ uri: drummerMatch.image }}
            style={styles.drummerImage}
            contentFit="cover"
            placeholder={null}
          />
          <View style={styles.drummerInfo}>
            <Text style={[styles.drummerName, { color: theme.text }]}>
              {drummerMatch.name}
            </Text>
            <Text style={[styles.drummerBand, { color: theme.textMuted }]}>
              {drummerMatch.band}
            </Text>
            <Text style={[styles.matchQuote, { color: theme.accent }]}>
              "{drummerMatch.matchQuote}"
            </Text>
          </View>
          <Text style={[styles.viewProfile, { color: theme.accent }]}>
            View Gear →
          </Text>
        </TouchableOpacity>
      </View>
      
      {/* Share Buttons */}
      <ShareButtons metalName={metalName} theme={theme} />
      
      {/* Generate Another Button */}
      <TouchableOpacity
        style={[styles.generateAnotherBtn, { borderColor: theme.accent }]}
        onPress={onGenerateAnother}
        accessibilityRole="button"
        accessibilityLabel="Generate another name"
      >
        <Text style={[styles.generateAnotherText, { color: theme.accent }]}>
          🎲 Generate Another
        </Text>
      </TouchableOpacity>
    </View>
  );
}

// ==========================================
// MAIN COMPONENT
// ==========================================

export function MetalDrummerNameGeneratorPage({ theme, onSelectDrummer, onBack }) {
  const [inputName, setInputName] = useState('');
  const [generatedName, setGeneratedName] = useState(null);
  const [drummerMatch, setDrummerMatch] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  
  // Update meta tags on mount
  useEffect(() => {
    updateNameGeneratorMeta();
  }, []);
  
  // Update meta when result changes
  useEffect(() => {
    if (generatedName && drummerMatch) {
      updateNameGeneratorMeta(generatedName, drummerMatch);
    }
  }, [generatedName, drummerMatch]);
  
  const handleGenerate = useCallback((isRandom = false) => {
    setIsGenerating(true);
    
    // Small delay for animation effect
    setTimeout(() => {
      const name = isRandom ? generateRandomMetalName() : generateMetalName(inputName);
      const match = getDrummerMatchForName(name);
      
      setGeneratedName(name);
      setDrummerMatch(match);
      setIsGenerating(false);
      
      // Track event
      trackNameGenerate(!isRandom && inputName.trim().length > 0);
    }, 300);
  }, [inputName]);
  
  const handleGenerateFromInput = useCallback(() => {
    handleGenerate(inputName.trim().length === 0);
  }, [handleGenerate, inputName]);
  
  const handleGenerateRandom = useCallback(() => {
    handleGenerate(true);
  }, [handleGenerate]);
  
  const handleGenerateAnother = useCallback(() => {
    setGeneratedName(null);
    setDrummerMatch(null);
    setInputName('');
  }, []);
  
  const handleDrummerClick = useCallback((drummer) => {
    trackDrummerMatchClick(drummer.id);
    if (onSelectDrummer) {
      onSelectDrummer(drummer.id);
    } else if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.location.href = `/drummer/${drummer.id}`;
    }
  }, [onSelectDrummer]);
  
  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.bg }]}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Back Button (Issue #729) */}
      {onBack && (
        <View style={styles.backButtonContainer}>
          <TouchableOpacity
            onPress={onBack}
            style={[styles.backButton, { backgroundColor: theme.card }]}
            accessibilityRole="button"
            accessibilityLabel="Go back to tools"
          >
            <Text style={[styles.backButtonText, { color: theme.text }]}>← Back to Tools</Text>
          </TouchableOpacity>
        </View>
      )}
      
      {/* Hero Section */}
      <View style={styles.hero}>
        <Text style={[styles.heroEmoji]}>🥁</Text>
        <Text style={[styles.heroTitle, { color: theme.text }]}>
          What's Your Metal Drummer Name? 🤘
        </Text>
        <Text style={[styles.heroSubtitle, { color: theme.textMuted }]}>
          Transform your name into an epic metal drummer alias and discover which legendary drummer you match with!
        </Text>
      </View>
      
      {/* Show input form OR result */}
      {!generatedName ? (
        <View style={[styles.inputSection, { backgroundColor: theme.cardBg }]}>
          <TextInput
            style={[
              styles.input,
              { 
                backgroundColor: theme.bg, 
                color: theme.text,
                borderColor: theme.border,
                fontSize: isMobile ? fontSize.lg : fontSize.xl,
              }
            ]}
            placeholder="Enter your name (optional)"
            placeholderTextColor={theme.textMuted}
            value={inputName}
            onChangeText={setInputName}
            onSubmitEditing={handleGenerateFromInput}
            returnKeyType="go"
            autoCapitalize="words"
            autoCorrect={false}
          />
          
          <TouchableOpacity
            style={[
              styles.generateBtn,
              { backgroundColor: theme.accent },
              isGenerating && styles.generateBtnDisabled
            ]}
            onPress={handleGenerateFromInput}
            disabled={isGenerating}
            accessibilityRole="button"
            accessibilityLabel={inputName.trim() ? "Generate your metal name" : "Generate random metal name"}
          >
            <Text style={styles.generateBtnText}>
              {isGenerating ? '⚡ Generating...' : '🔥 Generate My Metal Name'}
            </Text>
          </TouchableOpacity>
          
          <View style={styles.orDivider}>
            <View style={[styles.dividerLine, { backgroundColor: theme.border }]} />
            <Text style={[styles.orText, { color: theme.textMuted }]}>OR</Text>
            <View style={[styles.dividerLine, { backgroundColor: theme.border }]} />
          </View>
          
          <TouchableOpacity
            style={[
              styles.randomBtn,
              { borderColor: theme.accent },
              isGenerating && styles.generateBtnDisabled
            ]}
            onPress={handleGenerateRandom}
            disabled={isGenerating}
            accessibilityRole="button"
            accessibilityLabel="Generate completely random metal name"
          >
            <Text style={[styles.randomBtnText, { color: theme.accent }]}>
              🎲 Generate Random
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ResultCard
          metalName={generatedName}
          drummerMatch={drummerMatch}
          theme={theme}
          onGenerateAnother={handleGenerateAnother}
          onDrummerClick={handleDrummerClick}
        />
      )}
      
      {/* How It Works Section */}
      <View style={[styles.howItWorks, { backgroundColor: theme.cardBg }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          How It Works
        </Text>
        <View style={styles.stepList}>
          <View style={styles.step}>
            <Text style={styles.stepEmoji}>1️⃣</Text>
            <Text style={[styles.stepText, { color: theme.textMuted }]}>
              Enter your name or go full random
            </Text>
          </View>
          <View style={styles.step}>
            <Text style={styles.stepEmoji}>2️⃣</Text>
            <Text style={[styles.stepText, { color: theme.textMuted }]}>
              Our algorithm transforms it into a metal masterpiece
            </Text>
          </View>
          <View style={styles.step}>
            <Text style={styles.stepEmoji}>3️⃣</Text>
            <Text style={[styles.stepText, { color: theme.textMuted }]}>
              Discover which legendary drummer you match with
            </Text>
          </View>
          <View style={styles.step}>
            <Text style={styles.stepEmoji}>4️⃣</Text>
            <Text style={[styles.stepText, { color: theme.textMuted }]}>
              Share your metal name with the world!
            </Text>
          </View>
        </View>
      </View>
      
      {/* Fun Facts */}
      <View style={[styles.funFacts, { borderColor: theme.border }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          🤘 Did You Know?
        </Text>
        <Text style={[styles.factText, { color: theme.textMuted }]}>
          Many metal drummers use stage names! Joey Jordison (born Nathan Jonas Jordison), 
          Nicko McBrain (born Michael Henry McBrain), and Inferno (Zbigniew Robert Promiński) 
          all adopted metal personas.
        </Text>
      </View>
    </ScrollView>
  );
}

// ==========================================
// STYLES
// ==========================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing[4],
    maxWidth: 640,
    alignSelf: 'center',
    width: '100%',
  },
  
  // Back Button (Issue #729)
  backButtonContainer: {
    marginBottom: spacing[4],
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[4],
    borderRadius: spacing[2],
    alignSelf: 'flex-start',
  },
  backButtonText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },
  
  // Hero
  hero: {
    alignItems: 'center',
    marginBottom: spacing[6],
    paddingVertical: spacing[4],
  },
  heroEmoji: {
    fontSize: 64,
    marginBottom: spacing[3],
  },
  heroTitle: {
    fontSize: fontSize['2xl'],
    fontWeight: fontWeight.bold,
    textAlign: 'center',
    marginBottom: spacing[2],
  },
  heroSubtitle: {
    fontSize: fontSize.base,
    textAlign: 'center',
    lineHeight: lineHeight.relaxed,
  },
  
  // Input Section
  inputSection: {
    borderRadius: spacing[4],
    padding: spacing[5],
    marginBottom: spacing[6],
  },
  input: {
    borderWidth: 2,
    borderRadius: spacing[3],
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[4],
    marginBottom: spacing[4],
    textAlign: 'center',
  },
  generateBtn: {
    borderRadius: spacing[3],
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[6],
    alignItems: 'center',
    justifyContent: 'center',
  },
  generateBtnText: {
    color: '#fff',
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
  },
  generateBtnDisabled: {
    opacity: 0.7,
  },
  orDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing[4],
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  orText: {
    paddingHorizontal: spacing[3],
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },
  randomBtn: {
    borderWidth: 2,
    borderRadius: spacing[3],
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[6],
    alignItems: 'center',
    justifyContent: 'center',
  },
  randomBtnText: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
  },
  
  // Result Card
  resultCard: {
    borderRadius: spacing[4],
    borderWidth: 3,
    padding: spacing[5],
    marginBottom: spacing[6],
  },
  nameDisplay: {
    alignItems: 'center',
    marginBottom: spacing[5],
    paddingBottom: spacing[5],
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  nameLabel: {
    fontSize: fontSize.sm,
    marginBottom: spacing[2],
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  generatedName: {
    fontSize: fontSize['2xl'],
    fontWeight: fontWeight.black,
    textAlign: 'center',
  },
  
  // Drummer Match
  drummerMatch: {
    marginBottom: spacing[5],
  },
  matchLabel: {
    fontSize: fontSize.sm,
    marginBottom: spacing[3],
    textTransform: 'uppercase',
    letterSpacing: 1,
    textAlign: 'center',
  },
  drummerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: spacing[3],
    borderWidth: 1,
    padding: spacing[3],
  },
  drummerImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  drummerInfo: {
    flex: 1,
    marginLeft: spacing[3],
  },
  drummerName: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
  },
  drummerBand: {
    fontSize: fontSize.sm,
    marginBottom: spacing[1],
  },
  matchQuote: {
    fontSize: fontSize.xs,
    fontStyle: 'italic',
  },
  viewProfile: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
  },
  
  // Share Section
  shareSection: {
    alignItems: 'center',
    marginBottom: spacing[4],
    paddingVertical: spacing[4],
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  shareTitle: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
    marginBottom: spacing[3],
  },
  shareButtons: {
    flexDirection: 'row',
    gap: spacing[3],
  },
  shareBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareBtnText: {
    color: '#fff',
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
  },
  
  // Generate Another
  generateAnotherBtn: {
    borderWidth: 2,
    borderRadius: spacing[3],
    paddingVertical: spacing[3],
    alignItems: 'center',
  },
  generateAnotherText: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
  },
  
  // How It Works
  howItWorks: {
    borderRadius: spacing[4],
    padding: spacing[5],
    marginBottom: spacing[4],
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    marginBottom: spacing[4],
    textAlign: 'center',
  },
  stepList: {
    gap: spacing[3],
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepEmoji: {
    fontSize: fontSize.xl,
    marginRight: spacing[3],
  },
  stepText: {
    flex: 1,
    fontSize: fontSize.base,
    lineHeight: lineHeight.relaxed,
  },
  
  // Fun Facts
  funFacts: {
    borderWidth: 1,
    borderRadius: spacing[4],
    padding: spacing[4],
    marginBottom: spacing[6],
  },
  factText: {
    fontSize: fontSize.sm,
    lineHeight: lineHeight.relaxed,
    textAlign: 'center',
  },
});

export default MetalDrummerNameGeneratorPage;
