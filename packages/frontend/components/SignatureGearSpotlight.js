/**
 * Signature Gear Spotlight Component - Issue #739
 * Dedicated pages for iconic signature gear pieces
 * URL: /drummers/[slug]/signature/[gear-slug]
 */

import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Platform, 
  Linking,
  useWindowDimensions,
  StyleSheet
} from 'react-native';
import { Image } from 'expo-image';
import {
  getSignatureGearBySlug,
  generateSignatureGearSchema,
  generateGearBreadcrumbSchema,
  generateGearFAQSchema,
  getSignatureGearByDrummerSlug
} from '../data/signatureGear';
import { colors } from '../colors';
import { fontSize, fontWeight, lineHeight } from '../typography';
import { spacing } from '../spacing';

// ==========================================
// URL Detection Helpers
// ==========================================

/**
 * Check if current URL is a signature gear page
 * Matches: /drummers/:drummerSlug/signature/:gearSlug
 */
export function isSignatureGearPage() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return false;
  const pathname = window.location.pathname;
  return /^\/drummers\/[a-z0-9-]+\/signature\/[a-z0-9-]+$/i.test(pathname);
}

/**
 * Get gear slug from URL
 */
export function getGearSlugFromURL() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return null;
  const match = window.location.pathname.match(/^\/drummers\/[a-z0-9-]+\/signature\/([a-z0-9-]+)$/i);
  return match ? match[1] : null;
}

/**
 * Get drummer slug from signature gear URL
 */
export function getDrummerSlugFromGearURL() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return null;
  const match = window.location.pathname.match(/^\/drummers\/([a-z0-9-]+)\/signature/i);
  return match ? match[1] : null;
}

/**
 * Check if on signature gear listing page
 * Matches: /drummers/:drummerSlug/signature
 */
export function isSignatureGearListPage() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return false;
  const pathname = window.location.pathname;
  return /^\/drummers\/[a-z0-9-]+\/signature\/?$/i.test(pathname);
}

// ==========================================
// OG Meta Tags Update
// ==========================================

export function updateSignatureGearMeta(gear) {
  if (Platform.OS !== 'web' || typeof document === 'undefined' || !gear) return;

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

  const title = gear.seo.title;
  const description = gear.seo.description;
  const image = `https://metalforge.io${gear.seo.ogImage}`;
  const url = `https://metalforge.io/drummers/${gear.drummerSlug}/signature/${gear.slug}`;

  document.title = title;
  setMeta('description', description);
  setMeta('keywords', gear.seo.keywords.join(', '));
  
  // Open Graph
  setMeta('og:title', title, true);
  setMeta('og:description', description, true);
  setMeta('og:image', image, true);
  setMeta('og:url', url, true);
  setMeta('og:type', 'product', true);
  
  // Twitter
  setMeta('twitter:card', 'summary_large_image');
  setMeta('twitter:title', title);
  setMeta('twitter:description', description);
  setMeta('twitter:image', image);

  // Article metadata
  setMeta('article:published_time', gear.datePublished, true);
  setMeta('article:modified_time', gear.dateModified, true);
  setMeta('article:author', gear.author, true);

  // Product specific
  setMeta('product:brand', gear.brand, true);
  setMeta('product:price:amount', gear.affiliate.currentPrice.range.split('-')[0].replace(/[^0-9]/g, ''), true);
  setMeta('product:price:currency', 'USD', true);

  // Canonical URL
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', url);
}

// ==========================================
// YouTube Embed Component (Lazy-loaded facade)
// ==========================================

function YouTubeEmbed({ videoId, title, theme }) {
  const { width } = useWindowDimensions();
  const [isActivated, setIsActivated] = useState(false);
  
  const maxWidth = Math.min(width - 48, 640);
  const videoWidth = maxWidth;
  const videoHeight = Math.round(videoWidth * 9 / 16);

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
        </View>
      );
    }
    
    return (
      <View style={[styles.videoContainer, { width: videoWidth, height: videoHeight }]}>
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
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
  const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;

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
// Sticky Affiliate CTA Bar (Mobile)
// ==========================================

function StickyAffiliateCTA({ gear, theme, visible }) {
  if (!visible) return null;
  
  const handleShopClick = () => {
    // Track event
    if (Platform.OS === 'web' && typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'signature_gear_shop_click', {
        gear_name: gear.name,
        gear_slug: gear.slug,
        drummer: gear.drummerName,
        price: gear.affiliate.currentPrice.range,
      });
    }
    // Could open a modal or navigate to retailers
  };

  return (
    <View style={[styles.stickyCTA, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <View style={styles.stickyCTAContent}>
        <View>
          <Text style={[styles.stickyCTAName, { color: theme.text }]} numberOfLines={1}>
            {gear.name}
          </Text>
          <Text style={[styles.stickyCTAPrice, { color: theme.primary }]}>
            {gear.affiliate.currentPrice.range}
          </Text>
        </View>
        <TouchableOpacity 
          style={[styles.stickyCTAButton, { backgroundColor: theme.primary }]}
          onPress={handleShopClick}
          accessibilityLabel={`Shop ${gear.name}`}
        >
          <Text style={styles.stickyCTAButtonText}>Shop Now →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ==========================================
// Section Components
// ==========================================

// Hero Section
function HeroSection({ gear, theme, isMobile }) {
  return (
    <View style={[styles.heroSection, { backgroundColor: theme.card }]}>
      {gear.hero.heroImage && (
        <Image
          source={{ uri: gear.hero.heroImage }}
          style={[styles.heroImage, isMobile && styles.heroImageMobile]}
          contentFit="cover"
          priority
          accessibilityLabel={`${gear.fullName} hero image`}
        />
      )}
      <View style={styles.heroOverlay}>
        <View style={[styles.heroBadge, { backgroundColor: theme.primary }]}>
          <Text style={styles.heroBadgeText}>{gear.hero.badgeText}</Text>
        </View>
        <Text style={[styles.heroTitle, { color: '#fff' }, isMobile && styles.heroTitleMobile]}>
          {gear.fullName}
        </Text>
        <Text style={[styles.heroSubtitle, { color: 'rgba(255,255,255,0.9)' }]}>
          {gear.hero.subtitle}
        </Text>
        <View style={styles.heroDrummerBadge}>
          <Text style={{ color: 'rgba(255,255,255,0.8)' }}>
            🥁 Used by <Text style={{ fontWeight: '700' }}>{gear.drummerName}</Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

// Story Section
function StorySection({ story, theme, isMobile }) {
  const [expanded, setExpanded] = useState(false);
  const maxLength = 800;
  const shouldTruncate = story.content.length > maxLength && !expanded;
  const displayContent = shouldTruncate ? story.content.substring(0, maxLength) + '...' : story.content;

  return (
    <View style={[styles.section, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <Text style={[styles.sectionTitle, { color: theme.text }]}>📖 {story.title}</Text>
      <Text style={[styles.storyContent, { color: theme.secondaryText }]}>
        {displayContent}
      </Text>
      {story.content.length > maxLength && (
        <TouchableOpacity 
          onPress={() => setExpanded(!expanded)}
          style={styles.expandButton}
          accessibilityLabel={expanded ? 'Show less' : 'Read more'}
        >
          <Text style={[styles.expandButtonText, { color: theme.primary }]}>
            {expanded ? 'Show Less ↑' : 'Read More ↓'}
          </Text>
        </TouchableOpacity>
      )}
      {story.images && story.images.length > 0 && (
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.storyImages}
        >
          {story.images.map((img, idx) => (
            <View key={idx} style={styles.storyImageWrapper}>
              <Image
                source={{ uri: img.src }}
                style={styles.storyImage}
                contentFit="cover"
                accessibilityLabel={img.caption || `Story image ${idx + 1}`}
              />
              {img.caption && (
                <Text style={[styles.storyImageCaption, { color: theme.secondaryText }]}>
                  {img.caption}
                </Text>
              )}
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

// Specs Section
function SpecsSection({ specs, theme, isMobile }) {
  return (
    <View style={[styles.section, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <Text style={[styles.sectionTitle, { color: theme.text }]}>📐 {specs.title}</Text>
      
      {/* Dimensions Summary */}
      <View style={[styles.specsDimensions, { backgroundColor: theme.bg, borderColor: theme.border }]}>
        {Object.entries(specs.dimensions).map(([key, value]) => (
          <View key={key} style={styles.specsDimensionItem}>
            <Text style={[styles.specsDimensionLabel, { color: theme.secondaryText }]}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </Text>
            <Text style={[styles.specsDimensionValue, { color: theme.text }]}>{value}</Text>
          </View>
        ))}
      </View>
      
      {/* Features List */}
      <View style={styles.specsFeatures}>
        {specs.features.map((feature, idx) => (
          <View key={idx} style={[styles.specsFeatureRow, { borderBottomColor: theme.border }]}>
            <View style={styles.specsFeatureHeader}>
              <Text style={[styles.specsFeatureName, { color: theme.text }]}>{feature.name}</Text>
              <Text style={[styles.specsFeatureValue, { color: theme.primary }]}>{feature.value}</Text>
            </View>
            {feature.description && (
              <Text style={[styles.specsFeatureDesc, { color: theme.secondaryText }]}>
                {feature.description}
              </Text>
            )}
          </View>
        ))}
      </View>
      
      {/* Tuning Tips */}
      {specs.tuningTips && specs.tuningTips.length > 0 && (
        <View style={[styles.tuningTips, { backgroundColor: theme.bg }]}>
          <Text style={[styles.tuningTipsTitle, { color: theme.text }]}>🎯 Tuning Tips</Text>
          {specs.tuningTips.map((tip, idx) => (
            <View key={idx} style={styles.tuningTipItem}>
              <Text style={[styles.tuningTipBullet, { color: theme.primary }]}>•</Text>
              <Text style={[styles.tuningTipText, { color: theme.secondaryText }]}>{tip}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

// Sound Section with Videos
function SoundSection({ sound, theme, isMobile }) {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);

  return (
    <View style={[styles.section, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <Text style={[styles.sectionTitle, { color: theme.text }]}>🔊 {sound.title}</Text>
      <Text style={[styles.sectionDescription, { color: theme.secondaryText }]}>
        {sound.description}
      </Text>
      
      {/* Video Player */}
      {sound.videos && sound.videos.length > 0 && (
        <View style={styles.videoSection}>
          <YouTubeEmbed
            videoId={sound.videos[activeVideoIndex].youtubeId}
            title={sound.videos[activeVideoIndex].title}
            theme={theme}
          />
          <Text style={[styles.videoTitle, { color: theme.text }]}>
            {sound.videos[activeVideoIndex].title}
          </Text>
          <Text style={[styles.videoDescription, { color: theme.secondaryText }]}>
            {sound.videos[activeVideoIndex].description}
          </Text>
          
          {/* Video Selector */}
          {sound.videos.length > 1 && (
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.videoSelector}
            >
              {sound.videos.map((video, idx) => (
                <TouchableOpacity
                  key={idx}
                  onPress={() => setActiveVideoIndex(idx)}
                  style={[
                    styles.videoSelectorItem,
                    { 
                      borderColor: idx === activeVideoIndex ? theme.primary : theme.border,
                      backgroundColor: idx === activeVideoIndex ? `${theme.primary}20` : 'transparent'
                    }
                  ]}
                >
                  <Image
                    source={{ uri: `https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg` }}
                    style={styles.videoSelectorThumb}
                    contentFit="cover"
                    accessibilityLabel={`${video.title} video thumbnail`}
                  />
                  <Text 
                    style={[
                      styles.videoSelectorTitle, 
                      { color: idx === activeVideoIndex ? theme.primary : theme.secondaryText }
                    ]}
                    numberOfLines={2}
                  >
                    {video.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>
      )}
      
      {/* Featured Tracks */}
      {sound.featuredTracks && sound.featuredTracks.length > 0 && (
        <View style={styles.featuredTracks}>
          <Text style={[styles.featuredTracksTitle, { color: theme.text }]}>Featured On:</Text>
          {sound.featuredTracks.map((track, idx) => (
            <View key={idx} style={[styles.featuredTrackItem, { borderLeftColor: theme.primary }]}>
              <Text style={[styles.featuredTrackName, { color: theme.text }]}>
                🎵 {track.song}
              </Text>
              <Text style={[styles.featuredTrackAlbum, { color: theme.secondaryText }]}>
                {track.album}
              </Text>
              {track.note && (
                <Text style={[styles.featuredTrackNote, { color: theme.secondaryText }]}>
                  → {track.note}
                </Text>
              )}
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

// Affiliate CTA Section
function AffiliateSection({ affiliate, gear, theme, isMobile }) {
  const handleRetailerClick = (retailer) => {
    // Track event
    if (Platform.OS === 'web' && typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'affiliate_click', {
        gear_name: gear.name,
        gear_slug: gear.slug,
        retailer: retailer.name,
        price: affiliate.currentPrice.range,
      });
    }
    Linking.openURL(retailer.url);
  };

  return (
    <View style={[styles.section, styles.affiliateSection, { backgroundColor: theme.primary + '15', borderColor: theme.primary }]}>
      <Text style={[styles.sectionTitle, { color: theme.text }]}>🛒 {affiliate.title}</Text>
      <Text style={[styles.sectionDescription, { color: theme.secondaryText }]}>
        {affiliate.description}
      </Text>
      
      {/* Price Display */}
      <View style={[styles.priceDisplay, { backgroundColor: theme.card }]}>
        <Text style={[styles.priceLabel, { color: theme.secondaryText }]}>Price Range</Text>
        <Text style={[styles.priceValue, { color: theme.primary }]}>
          {affiliate.currentPrice.range}
        </Text>
        {affiliate.currentPrice.note && (
          <Text style={[styles.priceNote, { color: theme.secondaryText }]}>
            {affiliate.currentPrice.note}
          </Text>
        )}
      </View>
      
      {/* Retailers */}
      <View style={styles.retailers}>
        {affiliate.retailers.map((retailer, idx) => (
          <TouchableOpacity
            key={idx}
            onPress={() => handleRetailerClick(retailer)}
            style={[styles.retailerButton, { backgroundColor: theme.card, borderColor: theme.border }]}
            accessibilityLabel={`Shop at ${retailer.name}`}
          >
            <Text style={[styles.retailerName, { color: theme.text }]}>
              {retailer.name}
            </Text>
            <Text style={[styles.retailerArrow, { color: theme.primary }]}>→</Text>
          </TouchableOpacity>
        ))}
      </View>
      
      {/* Alternatives */}
      {affiliate.alternatives && affiliate.alternatives.length > 0 && (
        <View style={styles.alternatives}>
          <Text style={[styles.alternativesTitle, { color: theme.text }]}>💡 Budget Alternatives</Text>
          {affiliate.alternatives.map((alt, idx) => (
            <View key={idx} style={[styles.alternativeItem, { borderColor: theme.border }]}>
              <View style={styles.alternativeHeader}>
                <Text style={[styles.alternativeName, { color: theme.text }]}>{alt.name}</Text>
                <Text style={[styles.alternativePrice, { color: theme.primary }]}>{alt.price}</Text>
              </View>
              <Text style={[styles.alternativeReason, { color: theme.secondaryText }]}>
                {alt.reason}
              </Text>
            </View>
          ))}
        </View>
      )}
      
      {/* Used Market Info */}
      {affiliate.usedMarket && (
        <View style={[styles.usedMarket, { backgroundColor: theme.bg }]}>
          <Text style={[styles.usedMarketTitle, { color: theme.text }]}>🔍 Used Market</Text>
          <Text style={[styles.usedMarketPrice, { color: theme.primary }]}>
            {affiliate.usedMarket.priceRange}
          </Text>
          <Text style={[styles.usedMarketTips, { color: theme.secondaryText }]}>
            {affiliate.usedMarket.tips}
          </Text>
        </View>
      )}
    </View>
  );
}

// Used On Section (Albums/Tours)
function UsedOnSection({ usedOn, theme, isMobile }) {
  return (
    <View style={[styles.section, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <Text style={[styles.sectionTitle, { color: theme.text }]}>🎸 {usedOn.title}</Text>
      
      {/* Albums */}
      {usedOn.albums && usedOn.albums.length > 0 && (
        <View style={styles.albumsGrid}>
          <Text style={[styles.subsectionTitle, { color: theme.text }]}>Albums</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {usedOn.albums.map((album, idx) => (
              <View key={idx} style={[styles.albumCard, { backgroundColor: theme.bg }]}>
                <Image
                  source={{ uri: album.cover }}
                  style={styles.albumCover}
                  contentFit="cover"
                  accessibilityLabel={`${album.title} by ${album.artist} album cover`}
                />
                <Text style={[styles.albumTitle, { color: theme.text }]} numberOfLines={1}>
                  {album.title}
                </Text>
                <Text style={[styles.albumArtist, { color: theme.secondaryText }]} numberOfLines={1}>
                  {album.artist} ({album.year})
                </Text>
                {album.note && (
                  <Text style={[styles.albumNote, { color: theme.primary }]} numberOfLines={2}>
                    {album.note}
                  </Text>
                )}
              </View>
            ))}
          </ScrollView>
        </View>
      )}
      
      {/* Tours */}
      {usedOn.tours && usedOn.tours.length > 0 && (
        <View style={styles.toursList}>
          <Text style={[styles.subsectionTitle, { color: theme.text }]}>Tours</Text>
          <View style={styles.toursGrid}>
            {usedOn.tours.map((tour, idx) => (
              <View key={idx} style={[styles.tourBadge, { backgroundColor: theme.bg }]}>
                <Text style={[styles.tourName, { color: theme.text }]}>🎤 {tour}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

// Similar Gear Section
function SimilarGearSection({ similarGear, theme, isMobile, onNavigateToGear }) {
  return (
    <View style={[styles.section, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <Text style={[styles.sectionTitle, { color: theme.text }]}>🔗 {similarGear.title}</Text>
      
      {/* Similar Items */}
      {similarGear.items && similarGear.items.length > 0 && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {similarGear.items.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              style={[styles.similarGearCard, { backgroundColor: theme.bg, borderColor: theme.border }]}
              onPress={() => onNavigateToGear && onNavigateToGear(item.slug)}
              accessibilityLabel={`View ${item.name}`}
            >
              <Image
                source={{ uri: item.image }}
                style={styles.similarGearImage}
                contentFit="cover"
              />
              <Text style={[styles.similarGearName, { color: theme.text }]} numberOfLines={2}>
                {item.name}
              </Text>
              <Text style={[styles.similarGearPrice, { color: theme.primary }]}>
                {item.price}
              </Text>
              <Text style={[styles.similarGearReason, { color: theme.secondaryText }]} numberOfLines={2}>
                {item.reason}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
      
      {/* Drummer Alternatives */}
      {similarGear.drummerAlternatives && similarGear.drummerAlternatives.length > 0 && (
        <View style={styles.drummerAlternatives}>
          <Text style={[styles.subsectionTitle, { color: theme.text }]}>What Other Drummers Use</Text>
          {similarGear.drummerAlternatives.map((alt, idx) => (
            <View key={idx} style={[styles.drummerAltItem, { borderColor: theme.border }]}>
              <Text style={[styles.drummerAltName, { color: theme.text }]}>
                🥁 {alt.drummer}
              </Text>
              <Text style={[styles.drummerAltGear, { color: theme.secondaryText }]}>
                {alt.snare}
              </Text>
              {alt.note && (
                <Text style={[styles.drummerAltNote, { color: theme.primary }]}>
                  {alt.note}
                </Text>
              )}
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

// Breadcrumb Navigation
// FAQ Section
function FAQSection({ faq, theme, isMobile }) {
  const [openIndex, setOpenIndex] = useState(null);

  if (!faq || faq.length === 0) return null;

  return (
    <View style={[styles.section, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <Text style={[styles.sectionTitle, { color: theme.text }]}>❓ Frequently Asked Questions</Text>
      {faq.map((item, idx) => (
        <View key={idx} style={[styles.faqItem, { borderBottomColor: theme.border }]}>
          <TouchableOpacity
            onPress={() => setOpenIndex(openIndex === idx ? null : idx)}
            style={styles.faqQuestion}
            accessibilityLabel={item.question}
            accessibilityRole="button"
          >
            <Text style={[styles.faqQuestionText, { color: theme.text }]}>{item.question}</Text>
            <Text style={[styles.faqToggle, { color: theme.primary }]}>
              {openIndex === idx ? '▲' : '▼'}
            </Text>
          </TouchableOpacity>
          {openIndex === idx && (
            <Text style={[styles.faqAnswer, { color: theme.secondaryText }]}>{item.answer}</Text>
          )}
        </View>
      ))}
    </View>
  );
}

function Breadcrumbs({ gear, theme, onNavigate }) {
  const crumbs = [
    { label: 'Home', path: '/' },
    { label: 'Drummers', path: '/drummers' },
    { label: gear.drummerName, path: `/drummer/${gear.drummerSlug}` },
    { label: 'Signature Gear', path: `/drummers/${gear.drummerSlug}/signature` },
    { label: gear.name, path: null },
  ];

  return (
    <View style={styles.breadcrumbs}>
      {crumbs.map((crumb, idx) => (
        <View key={idx} style={styles.breadcrumbItem}>
          {crumb.path ? (
            <TouchableOpacity
              onPress={() => onNavigate && onNavigate(crumb.path)}
              accessibilityLabel={`Navigate to ${crumb.label}`}
            >
              <Text style={[styles.breadcrumbLink, { color: theme.primary }]}>
                {crumb.label}
              </Text>
            </TouchableOpacity>
          ) : (
            <Text style={[styles.breadcrumbCurrent, { color: theme.secondaryText }]}>
              {crumb.label}
            </Text>
          )}
          {idx < crumbs.length - 1 && (
            <Text style={[styles.breadcrumbSeparator, { color: theme.secondaryText }]}> / </Text>
          )}
        </View>
      ))}
    </View>
  );
}

// ==========================================
// Main Component
// ==========================================

export function SignatureGearSpotlightPage({ theme, onBack, onSelectDrummer, allDrummers = [] }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const [gear, setGear] = useState(null);
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const slug = getGearSlugFromURL();
    if (slug) {
      const loadedGear = getSignatureGearBySlug(slug);
      setGear(loadedGear);

      if (loadedGear) {
        // Update OG meta
        updateSignatureGearMeta(loadedGear);

        // Inject schema markup
        if (Platform.OS === 'web' && typeof document !== 'undefined') {
          // Product schema
          const drummer = allDrummers.find(d => d.id === loadedGear.drummerId);
          const productSchema = generateSignatureGearSchema(loadedGear, drummer);
          if (productSchema) {
            let ldScript = document.querySelector('script[data-schema="signature-gear-product"]');
            if (!ldScript) {
              ldScript = document.createElement('script');
              ldScript.type = 'application/ld+json';
              ldScript.setAttribute('data-schema', 'signature-gear-product');
              document.head.appendChild(ldScript);
            }
            ldScript.textContent = JSON.stringify(productSchema);
          }

          // Breadcrumb schema
          const breadcrumbSchema = generateGearBreadcrumbSchema(loadedGear);
          if (breadcrumbSchema) {
            let bcScript = document.querySelector('script[data-schema="signature-gear-breadcrumb"]');
            if (!bcScript) {
              bcScript = document.createElement('script');
              bcScript.type = 'application/ld+json';
              bcScript.setAttribute('data-schema', 'signature-gear-breadcrumb');
              document.head.appendChild(bcScript);
            }
            bcScript.textContent = JSON.stringify(breadcrumbSchema);
          }

          // FAQ schema
          const faqSchema = generateGearFAQSchema(loadedGear);
          if (faqSchema) {
            let faqScript = document.querySelector('script[data-schema="signature-gear-faq"]');
            if (!faqScript) {
              faqScript = document.createElement('script');
              faqScript.type = 'application/ld+json';
              faqScript.setAttribute('data-schema', 'signature-gear-faq');
              document.head.appendChild(faqScript);
            }
            faqScript.textContent = JSON.stringify(faqSchema);
          }
        }

        // Track page view
        if (Platform.OS === 'web' && typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'page_view', {
            page_title: loadedGear.seo.title,
            page_location: window.location.href,
            gear_name: loadedGear.name,
            gear_slug: loadedGear.slug,
            drummer: loadedGear.drummerName,
          });
        }
      }
    }

    // Cleanup schemas on unmount
    return () => {
      if (Platform.OS === 'web' && typeof document !== 'undefined') {
        const productScript = document.querySelector('script[data-schema="signature-gear-product"]');
        const bcScript = document.querySelector('script[data-schema="signature-gear-breadcrumb"]');
        const faqScript = document.querySelector('script[data-schema="signature-gear-faq"]');
        if (productScript) productScript.remove();
        if (bcScript) bcScript.remove();
        if (faqScript) faqScript.remove();
      }
    };
  }, [allDrummers]);

  const handleScroll = useCallback((event) => {
    const y = event.nativeEvent.contentOffset.y;
    setScrollY(y);
    setShowStickyCTA(isMobile && y > 400);
  }, [isMobile]);

  const handleNavigate = useCallback((path) => {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  }, []);

  const handleNavigateToGear = useCallback((gearSlug) => {
    if (gear && Platform.OS === 'web' && typeof window !== 'undefined') {
      window.history.pushState({}, '', `/drummers/${gear.drummerSlug}/signature/${gearSlug}`);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  }, [gear]);

  if (!gear) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.bg }]}>
        <Text style={[styles.loadingText, { color: theme.secondaryText }]}>Loading gear details...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={[styles.container, { backgroundColor: theme.bg }]}
        contentContainerStyle={styles.contentContainer}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {/* Breadcrumbs */}
        <Breadcrumbs gear={gear} theme={theme} onNavigate={handleNavigate} />
        
        {/* Back Button */}
        <TouchableOpacity
          onPress={onBack || (() => handleNavigate(`/drummer/${gear.drummerSlug}`))}
          style={[styles.backButton, { backgroundColor: theme.card, borderColor: theme.border }]}
          accessibilityLabel="Go back"
        >
          <Text style={[styles.backButtonText, { color: theme.text }]}>← Back to {gear.drummerName}</Text>
        </TouchableOpacity>

        {/* Hero Section */}
        <HeroSection gear={gear} theme={theme} isMobile={isMobile} />

        {/* Story Section */}
        <StorySection story={gear.story} theme={theme} isMobile={isMobile} />

        {/* Specs Section */}
        <SpecsSection specs={gear.specs} theme={theme} isMobile={isMobile} />

        {/* Sound Section with Videos */}
        <SoundSection sound={gear.sound} theme={theme} isMobile={isMobile} />

        {/* Affiliate CTA Section */}
        <AffiliateSection affiliate={gear.affiliate} gear={gear} theme={theme} isMobile={isMobile} />

        {/* Used On Section */}
        <UsedOnSection usedOn={gear.usedOn} theme={theme} isMobile={isMobile} />

        {/* FAQ Section */}
        <FAQSection faq={gear.faq} theme={theme} isMobile={isMobile} />

        {/* Similar Gear Section */}
        <SimilarGearSection 
          similarGear={gear.similarGear} 
          theme={theme} 
          isMobile={isMobile}
          onNavigateToGear={handleNavigateToGear}
        />

        {/* Footer spacing for sticky CTA */}
        {isMobile && <View style={{ height: 80 }} />}
      </ScrollView>

      {/* Sticky Affiliate CTA (Mobile) */}
      <StickyAffiliateCTA gear={gear} theme={theme} visible={showStickyCTA} />
    </View>
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
    paddingBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  loadingText: {
    fontSize: 16,
  },
  
  // Breadcrumbs
  breadcrumbs: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    paddingBottom: 8,
  },
  breadcrumbItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  breadcrumbLink: {
    fontSize: 13,
    fontWeight: '500',
  },
  breadcrumbCurrent: {
    fontSize: 13,
  },
  breadcrumbSeparator: {
    fontSize: 13,
    marginHorizontal: 4,
  },
  
  // Back Button
  backButton: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  
  // Hero Section
  heroSection: {
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    minHeight: 300,
  },
  heroImage: {
    width: '100%',
    height: 350,
  },
  heroImageMobile: {
    height: 250,
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    background: 'linear-gradient(transparent, rgba(0,0,0,0.9))',
  },
  heroBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 12,
  },
  heroBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 8,
  },
  heroTitleMobile: {
    fontSize: 24,
  },
  heroSubtitle: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
  },
  heroDrummerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  // Section Base
  section: {
    marginHorizontal: 16,
    marginBottom: 20,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
  },
  sectionDescription: {
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 16,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    marginTop: 8,
  },
  
  // Story Section
  storyContent: {
    fontSize: 15,
    lineHeight: 26,
    whiteSpace: 'pre-line',
  },
  expandButton: {
    marginTop: 12,
    alignItems: 'center',
  },
  expandButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  storyImages: {
    marginTop: 20,
  },
  storyImageWrapper: {
    marginRight: 16,
    width: 250,
  },
  storyImage: {
    width: 250,
    height: 180,
    borderRadius: 12,
  },
  storyImageCaption: {
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: 8,
    textAlign: 'center',
  },
  
  // Specs Section
  specsDimensions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 20,
    gap: 16,
  },
  specsDimensionItem: {
    minWidth: 80,
    alignItems: 'center',
  },
  specsDimensionLabel: {
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  specsDimensionValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  specsFeatures: {
    marginBottom: 16,
  },
  specsFeatureRow: {
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  specsFeatureHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  specsFeatureName: {
    fontSize: 14,
    fontWeight: '600',
  },
  specsFeatureValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  specsFeatureDesc: {
    fontSize: 13,
    lineHeight: 18,
  },
  tuningTips: {
    padding: 16,
    borderRadius: 12,
  },
  tuningTipsTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 12,
  },
  tuningTipItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  tuningTipBullet: {
    fontSize: 14,
    marginRight: 8,
    fontWeight: '700',
  },
  tuningTipText: {
    fontSize: 14,
    lineHeight: 20,
    flex: 1,
  },
  
  // Sound/Video Section
  videoSection: {
    marginBottom: 20,
  },
  videoContainer: {
    alignSelf: 'center',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
  },
  playButtonOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  youtubePlayButton: {
    width: 68,
    height: 48,
  },
  playIcon: {
    fontSize: 48,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
    textAlign: 'center',
  },
  videoDescription: {
    fontSize: 13,
    textAlign: 'center',
    marginTop: 4,
  },
  videoSelector: {
    marginTop: 16,
  },
  videoSelectorItem: {
    width: 140,
    marginRight: 12,
    borderRadius: 8,
    borderWidth: 2,
    overflow: 'hidden',
    padding: 8,
  },
  videoSelectorThumb: {
    width: '100%',
    height: 70,
    borderRadius: 6,
    marginBottom: 8,
  },
  videoSelectorTitle: {
    fontSize: 12,
    fontWeight: '500',
  },
  featuredTracks: {
    marginTop: 16,
  },
  featuredTracksTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 12,
  },
  featuredTrackItem: {
    paddingLeft: 12,
    borderLeftWidth: 3,
    marginBottom: 12,
  },
  featuredTrackName: {
    fontSize: 14,
    fontWeight: '600',
  },
  featuredTrackAlbum: {
    fontSize: 13,
    marginTop: 2,
  },
  featuredTrackNote: {
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: 4,
  },
  
  // Affiliate Section
  affiliateSection: {
    borderWidth: 2,
  },
  priceDisplay: {
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  priceLabel: {
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  priceValue: {
    fontSize: 32,
    fontWeight: '800',
  },
  priceNote: {
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  },
  retailers: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  retailerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    minWidth: 140,
    flex: 1,
  },
  retailerName: {
    fontSize: 15,
    fontWeight: '600',
  },
  retailerArrow: {
    fontSize: 18,
    fontWeight: '700',
  },
  alternatives: {
    marginBottom: 16,
  },
  alternativesTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  alternativeItem: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 8,
  },
  alternativeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  alternativeName: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  alternativePrice: {
    fontSize: 14,
    fontWeight: '700',
  },
  alternativeReason: {
    fontSize: 13,
  },
  usedMarket: {
    padding: 16,
    borderRadius: 12,
  },
  usedMarketTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 8,
  },
  usedMarketPrice: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  usedMarketTips: {
    fontSize: 13,
    lineHeight: 18,
  },
  
  // Used On Section
  albumsGrid: {
    marginBottom: 20,
  },
  albumCard: {
    width: 140,
    marginRight: 12,
    borderRadius: 10,
    overflow: 'hidden',
    padding: 8,
  },
  albumCover: {
    width: '100%',
    height: 124,
    borderRadius: 8,
    marginBottom: 8,
  },
  albumTitle: {
    fontSize: 13,
    fontWeight: '600',
  },
  albumArtist: {
    fontSize: 11,
    marginTop: 2,
  },
  albumNote: {
    fontSize: 11,
    fontStyle: 'italic',
    marginTop: 4,
  },
  toursList: {
    marginTop: 16,
  },
  toursGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tourBadge: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  tourName: {
    fontSize: 13,
  },
  
  // Similar Gear Section
  similarGearCard: {
    width: 180,
    marginRight: 12,
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
  },
  similarGearImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 10,
  },
  similarGearName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  similarGearPrice: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  similarGearReason: {
    fontSize: 12,
  },
  drummerAlternatives: {
    marginTop: 20,
  },
  drummerAltItem: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 8,
  },
  drummerAltName: {
    fontSize: 14,
    fontWeight: '600',
  },
  drummerAltGear: {
    fontSize: 13,
    marginTop: 2,
  },
  drummerAltNote: {
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: 4,
  },
  
  // FAQ Section
  faqItem: {
    borderBottomWidth: 1,
    paddingVertical: 2,
  },
  faqQuestion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
  },
  faqQuestionText: {
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
    paddingRight: 8,
  },
  faqToggle: {
    fontSize: 12,
    fontWeight: '700',
  },
  faqAnswer: {
    fontSize: 14,
    lineHeight: 22,
    paddingBottom: 14,
  },

  // Sticky CTA
  stickyCTA: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    borderTopWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  stickyCTAContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stickyCTAName: {
    fontSize: 14,
    fontWeight: '600',
    maxWidth: 180,
  },
  stickyCTAPrice: {
    fontSize: 12,
    fontWeight: '700',
  },
  stickyCTAButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  stickyCTAButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
});

export default SignatureGearSpotlightPage;
