/**
 * Beginner Metal Drummer Gear Guide Component - Issue #702
 * The Ultimate Beginner Metal Drummer Gear Guide Under $1000
 * URL: /guides/beginner-metal-drummer-setup
 */

import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Platform, 
  Linking,
  useWindowDimensions
} from 'react-native';
import { Image } from 'expo-image';
import { 
  getBeginnerGuideBySlug,
  generateBeginnerGuideSchema,
  generateProductSchemas,
  generateBeginnerFaqSchema 
} from '../data/beginnerGuides';

// ==========================================
// URL Detection Helpers
// ==========================================
export function isBeginnerGuidePage() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return false;
  const pathname = window.location.pathname;
  return pathname === '/guides/beginner-metal-drummer-setup' || 
         pathname === '/guides/beginner-metal-drummer-setup/' ||
         pathname === '/beginner-setup' ||
         pathname === '/beginner-setup/';
}

export function getBeginnerGuideSlugFromURL() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return null;
  const pathname = window.location.pathname;
  if (pathname.includes('beginner-metal-drummer-setup') || pathname.includes('beginner-setup')) {
    return 'beginner-metal-drummer-setup';
  }
  return null;
}

// ==========================================
// OG Meta Tags Update
// ==========================================
export function updateBeginnerGuideMeta(guide) {
  if (Platform.OS !== 'web' || typeof document === 'undefined') return;

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

  if (guide) {
    const title = guide.title;
    const description = guide.description;
    const image = `https://metalforge.io${guide.ogImage}`;
    const url = 'https://metalforge.io/guides/beginner-metal-drummer-setup';

    document.title = `${title} | MetalForge`;
    setMeta('description', description);
    setMeta('keywords', guide.seoKeywords.join(', '));
    
    // Open Graph
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:image', image, true);
    setMeta('og:url', url, true);
    setMeta('og:type', 'article', true);
    
    // Twitter
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', image);

    // Article metadata
    setMeta('article:published_time', guide.datePublished, true);
    setMeta('article:modified_time', guide.dateModified, true);
    setMeta('article:author', guide.author, true);
  }
}

// ==========================================
// Main Component
// ==========================================
export function BeginnerGearGuidePage({ theme, onBack, onSelectDrummer }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const [guide, setGuide] = useState(null);
  const [activeSection, setActiveSection] = useState('intro');
  const [expandedFaq, setExpandedFaq] = useState({});

  useEffect(() => {
    const loadedGuide = getBeginnerGuideBySlug('beginner-metal-drummer-setup');
    setGuide(loadedGuide);

    if (loadedGuide) {
      // Update OG meta
      updateBeginnerGuideMeta(loadedGuide);

      // Inject schema markup
      if (Platform.OS === 'web' && typeof document !== 'undefined') {
        // HowTo schema
        const howToSchema = generateBeginnerGuideSchema(loadedGuide);
        if (howToSchema) {
          let ldScript = document.querySelector('script[data-schema="beginner-howto"]');
          if (!ldScript) {
            ldScript = document.createElement('script');
            ldScript.type = 'application/ld+json';
            ldScript.setAttribute('data-schema', 'beginner-howto');
            document.head.appendChild(ldScript);
          }
          ldScript.textContent = JSON.stringify(howToSchema);
        }

        // Product schemas
        const productSchemas = generateProductSchemas(loadedGuide);
        if (productSchemas.length > 0) {
          let productScript = document.querySelector('script[data-schema="beginner-products"]');
          if (!productScript) {
            productScript = document.createElement('script');
            productScript.type = 'application/ld+json';
            productScript.setAttribute('data-schema', 'beginner-products');
            document.head.appendChild(productScript);
          }
          productScript.textContent = JSON.stringify(productSchemas);
        }

        // FAQ schema
        const faqSchema = generateBeginnerFaqSchema(loadedGuide);
        if (faqSchema) {
          let faqScript = document.querySelector('script[data-schema="beginner-faq"]');
          if (!faqScript) {
            faqScript = document.createElement('script');
            faqScript.type = 'application/ld+json';
            faqScript.setAttribute('data-schema', 'beginner-faq');
            document.head.appendChild(faqScript);
          }
          faqScript.textContent = JSON.stringify(faqSchema);
        }
      }

      // Track page view
      if (Platform.OS === 'web' && typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'page_view', {
          page_title: 'Beginner Metal Drummer Gear Guide',
          page_location: window.location.href,
          content_type: 'beginner_guide'
        });
      }
    }

    // Cleanup schemas on unmount
    return () => {
      if (Platform.OS === 'web' && typeof document !== 'undefined') {
        ['beginner-howto', 'beginner-products', 'beginner-faq'].forEach(schemaId => {
          const script = document.querySelector(`script[data-schema="${schemaId}"]`);
          if (script) script.remove();
        });
      }
    };
  }, []);

  const toggleFaq = (index) => {
    setExpandedFaq(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const handleAffiliateClick = (item, platform, url) => {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      // Track affiliate click
      if (window.gtag) {
        window.gtag('event', 'affiliate_click', {
          guide: 'beginner-metal-drummer-setup',
          item: item,
          platform: platform
        });
      }
      // Open link
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleShare = (platform) => {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      const url = window.location.href;
      const text = 'The Ultimate Beginner Metal Drummer Gear Guide Under $1000 - Everything you need to start playing metal! 🥁🔥';
      
      let shareUrl;
      if (platform === 'twitter') {
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
      } else if (platform === 'facebook') {
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
      } else if (platform === 'reddit') {
        shareUrl = `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`;
      } else if (platform === 'copy') {
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
        return;
      }
      
      if (shareUrl) {
        window.open(shareUrl, '_blank', 'noopener,noreferrer');
      }

      // Track share
      if (window.gtag) {
        window.gtag('event', 'guide_share', {
          guide: 'beginner-metal-drummer-setup',
          platform: platform
        });
      }
    }
  };

  const handleDrummerClick = (drummerId) => {
    if (onSelectDrummer) {
      onSelectDrummer(drummerId);
    } else if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.location.href = `/drummer/${drummerId}`;
    }
  };

  if (!guide) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={[styles.backButton, { borderColor: theme.border }]}>
            <Text style={[styles.backButtonText, { color: theme.text }]}>← Back</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.loadingContainer}>
          <Text style={[styles.loadingText, { color: theme.text }]}>Loading guide...</Text>
        </View>
      </View>
    );
  }

  const sections = [
    { id: 'intro', label: '📖 Intro', icon: '📖' },
    { id: 'budget', label: '💰 Budget', icon: '💰' },
    { id: 'kits', label: '🥁 Kits', icon: '🥁' },
    { id: 'cymbals', label: '🎪 Cymbals', icon: '🎪' },
    { id: 'hardware', label: '⚙️ Hardware', icon: '⚙️' },
    { id: 'technique', label: '🎯 Technique', icon: '🎯' },
    { id: 'setup', label: '🔧 Setup', icon: '🔧' },
    { id: 'upgrades', label: '📈 Upgrades', icon: '📈' },
    { id: 'tips', label: '💡 Tips', icon: '💡' },
    { id: 'faq', label: '❓ FAQ', icon: '❓' }
  ];

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={[styles.backButton, { borderColor: theme.border }]}>
          <Text style={[styles.backButtonText, { color: theme.text }]}>← Back to Guides</Text>
        </TouchableOpacity>
      </View>

      {/* Hero Section */}
      <View style={[styles.heroSection, { backgroundColor: theme.card }]}>
        <View style={[styles.heroBadge, { backgroundColor: theme.primary }]}>
          <Text style={styles.heroBadgeText}>{guide.hero.badge}</Text>
        </View>
        <Text style={[styles.heroTitle, { color: theme.text }]}>{guide.hero.title}</Text>
        <Text style={[styles.heroSubtitle, { color: theme.secondaryText }]}>{guide.hero.subtitle}</Text>
        
        <View style={styles.heroStats}>
          {guide.hero.stats.map((stat, index) => (
            <View key={index} style={[styles.heroStat, { backgroundColor: theme.background }]}>
              <Text style={[styles.heroStatValue, { color: theme.primary }]}>{stat.value}</Text>
              <Text style={[styles.heroStatLabel, { color: theme.secondaryText }]}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Share Buttons */}
        <View style={styles.shareButtons}>
          <TouchableOpacity 
            style={[styles.shareButton, { backgroundColor: '#1DA1F2' }]}
            onPress={() => handleShare('twitter')}
          >
            <Text style={styles.shareButtonText}>𝕏 Share</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.shareButton, { backgroundColor: '#FF4500' }]}
            onPress={() => handleShare('reddit')}
          >
            <Text style={styles.shareButtonText}>Reddit</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.shareButton, { backgroundColor: theme.border }]}
            onPress={() => handleShare('copy')}
          >
            <Text style={[styles.shareButtonText, { color: theme.text }]}>🔗 Copy</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Section Navigation */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.sectionNav}
        contentContainerStyle={styles.sectionNavContent}
      >
        {sections.map((section) => (
          <TouchableOpacity
            key={section.id}
            style={[
              styles.sectionNavButton,
              activeSection === section.id && { backgroundColor: theme.primary },
              { borderColor: theme.primary }
            ]}
            onPress={() => setActiveSection(section.id)}
          >
            <Text style={[
              styles.sectionNavText,
              { color: activeSection === section.id ? '#fff' : theme.primary }
            ]}>
              {isMobile ? section.icon : section.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Introduction Section */}
      {activeSection === 'intro' && (
        <View style={[styles.section, { backgroundColor: theme.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>{guide.intro.title}</Text>
          <Text style={[styles.sectionContent, { color: theme.secondaryText }]}>
            {guide.intro.content}
          </Text>
          
          <View style={[styles.keyPointsBox, { backgroundColor: theme.background, borderColor: theme.primary }]}>
            <Text style={[styles.keyPointsTitle, { color: theme.text }]}>🔑 Key Takeaways</Text>
            {guide.intro.keyPoints.map((point, index) => (
              <Text key={index} style={[styles.keyPoint, { color: theme.secondaryText }]}>
                • {point}
              </Text>
            ))}
          </View>

          <View style={[styles.trustBadge, { backgroundColor: theme.primary + '15' }]}>
            <Text style={[styles.trustText, { color: theme.primary }]}>
              ✓ {guide.intro.whyTrustUs}
            </Text>
          </View>
        </View>
      )}

      {/* Budget Breakdown Section */}
      {activeSection === 'budget' && (
        <View style={[styles.section, { backgroundColor: theme.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>{guide.budgetBreakdown.title}</Text>
          <Text style={[styles.sectionContent, { color: theme.secondaryText }]}>
            {guide.budgetBreakdown.description}
          </Text>
          
          <View style={[styles.totalBudgetBox, { backgroundColor: theme.primary + '20' }]}>
            <Text style={[styles.totalBudgetLabel, { color: theme.secondaryText }]}>Total Budget</Text>
            <Text style={[styles.totalBudgetValue, { color: theme.primary }]}>
              ${guide.budgetBreakdown.totalBudget.toLocaleString()}
            </Text>
          </View>

          {/* Budget Categories */}
          {guide.budgetBreakdown.categories.map((category, index) => (
            <View key={index} style={[styles.budgetCategory, { borderColor: theme.border }]}>
              <View style={styles.budgetCategoryHeader}>
                <Text style={[styles.budgetEmoji, { color: theme.text }]}>{category.emoji}</Text>
                <View style={styles.budgetCategoryInfo}>
                  <Text style={[styles.budgetCategoryName, { color: theme.text }]}>{category.name}</Text>
                  <Text style={[styles.budgetCategoryAmount, { color: theme.primary }]}>{category.amount}</Text>
                </View>
                <View style={[styles.budgetPercentage, { backgroundColor: theme.primary + '20' }]}>
                  <Text style={[styles.budgetPercentageText, { color: theme.primary }]}>{category.percentage}%</Text>
                </View>
              </View>
              <View style={[styles.budgetBar, { backgroundColor: theme.border }]}>
                <View style={[styles.budgetBarFill, { width: `${category.percentage}%`, backgroundColor: theme.primary }]} />
              </View>
              <View style={styles.budgetCategoryMeta}>
                <Text style={[styles.budgetPriority, { 
                  color: category.priority === 'CRITICAL' ? '#ef4444' : 
                         category.priority === 'HIGH' ? '#f97316' : theme.secondaryText 
                }]}>
                  {category.priority}
                </Text>
                <Text style={[styles.budgetNotes, { color: theme.secondaryText }]}>{category.notes}</Text>
              </View>
            </View>
          ))}

          <View style={[styles.proTipBox, { backgroundColor: '#fef3c7', borderColor: '#f59e0b' }]}>
            <Text style={[styles.proTipLabel, { color: '#92400e' }]}>💡 Pro Tip</Text>
            <Text style={[styles.proTipText, { color: '#78350f' }]}>{guide.budgetBreakdown.proTip}</Text>
          </View>
        </View>
      )}

      {/* Drum Kit Recommendations Section */}
      {activeSection === 'kits' && (
        <View style={[styles.section, { backgroundColor: theme.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>{guide.kitRecommendations.title}</Text>
          <Text style={[styles.sectionContent, { color: theme.secondaryText }]}>
            {guide.kitRecommendations.description}
          </Text>

          {/* Ideal Specs */}
          <View style={[styles.specsBox, { backgroundColor: theme.background, borderColor: theme.border }]}>
            <Text style={[styles.specsTitle, { color: theme.text }]}>{guide.kitRecommendations.idealSpecs.title}</Text>
            {guide.kitRecommendations.idealSpecs.specs.map((spec, index) => (
              <View key={index} style={styles.specRow}>
                <Text style={[styles.specIcon, { color: theme.text }]}>{spec.icon}</Text>
                <Text style={[styles.specLabel, { color: theme.text }]}>{spec.spec}:</Text>
                <Text style={[styles.specValue, { color: theme.secondaryText }]}>{spec.ideal}</Text>
              </View>
            ))}
          </View>

          {/* Kit Cards */}
          {guide.kitRecommendations.kits.map((kit, index) => (
            <View key={index} style={[styles.kitCard, { backgroundColor: theme.background, borderColor: theme.border }]}>
              <View style={styles.kitCardHeader}>
                <View style={[styles.rankBadge, { backgroundColor: index === 0 ? '#fbbf24' : index === 1 ? '#9ca3af' : '#cd7f32' }]}>
                  <Text style={styles.rankBadgeText}>#{kit.rank}</Text>
                </View>
                <View style={styles.kitCardTitleArea}>
                  <Text style={[styles.kitName, { color: theme.text }]}>{kit.name}</Text>
                  <Text style={[styles.kitBrand, { color: theme.secondaryText }]}>{kit.brand}</Text>
                </View>
                <View style={styles.kitPriceArea}>
                  <Text style={[styles.kitPrice, { color: theme.primary }]}>{kit.price}</Text>
                  <View style={styles.kitRating}>
                    <Text style={[styles.kitRatingText, { color: '#fbbf24' }]}>★ {kit.rating}</Text>
                  </View>
                </View>
              </View>

              <Text style={[styles.kitDescription, { color: theme.secondaryText }]}>{kit.description}</Text>

              {/* Shell Info */}
              <View style={[styles.kitSpecs, { borderColor: theme.border }]}>
                <Text style={[styles.kitSpecsTitle, { color: theme.text }]}>Shell Material: {kit.shellMaterial}</Text>
                <View style={styles.kitSizes}>
                  <Text style={[styles.kitSize, { color: theme.secondaryText }]}>Kick: {kit.sizes.kick}</Text>
                  <Text style={[styles.kitSize, { color: theme.secondaryText }]}>Snare: {kit.sizes.snare}</Text>
                  <Text style={[styles.kitSize, { color: theme.secondaryText }]}>Toms: {kit.sizes.toms.join(', ')}</Text>
                  <Text style={[styles.kitSize, { color: theme.secondaryText }]}>Floor: {kit.sizes.floorTom}</Text>
                </View>
              </View>

              {/* Pros & Cons */}
              <View style={styles.prosConsContainer}>
                <View style={styles.prosSection}>
                  <Text style={[styles.prosTitle, { color: '#22c55e' }]}>✓ Pros</Text>
                  {kit.pros.map((pro, i) => (
                    <Text key={i} style={[styles.proItem, { color: theme.secondaryText }]}>• {pro}</Text>
                  ))}
                </View>
                <View style={styles.consSection}>
                  <Text style={[styles.consTitle, { color: '#ef4444' }]}>✗ Cons</Text>
                  {kit.cons.map((con, i) => (
                    <Text key={i} style={[styles.conItem, { color: theme.secondaryText }]}>• {con}</Text>
                  ))}
                </View>
              </View>

              <Text style={[styles.bestFor, { color: theme.primary }]}>🎯 {kit.bestFor}</Text>
              <Text style={[styles.metalVerdict, { color: theme.text }]}>{kit.metalVerdict}</Text>

              {/* Affiliate Links */}
              <View style={styles.affiliateButtons}>
                <TouchableOpacity
                  style={[styles.affiliateButton, { backgroundColor: '#0066cc' }]}
                  onPress={() => handleAffiliateClick(kit.name, 'thomann', kit.affiliateLinks.thomann)}
                >
                  <Text style={styles.affiliateButtonText}>🛒 Thomann</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.affiliateButton, { backgroundColor: '#ff6b35' }]}
                  onPress={() => handleAffiliateClick(kit.name, 'sweetwater', kit.affiliateLinks.sweetwater)}
                >
                  <Text style={styles.affiliateButtonText}>🛒 Sweetwater</Text>
                </TouchableOpacity>
              </View>

              {/* Related Drummers */}
              {kit.relatedDrummers && kit.relatedDrummers.length > 0 && (
                <View style={styles.relatedDrummers}>
                  <Text style={[styles.relatedDrummersLabel, { color: theme.secondaryText }]}>
                    Used by pros like:
                  </Text>
                  <View style={styles.relatedDrummerLinks}>
                    {kit.relatedDrummers.map((drummerId, i) => (
                      <TouchableOpacity
                        key={i}
                        style={[styles.drummerLink, { backgroundColor: theme.primary + '20' }]}
                        onPress={() => handleDrummerClick(drummerId)}
                      >
                        <Text style={[styles.drummerLinkText, { color: theme.primary }]}>
                          {drummerId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}
            </View>
          ))}

          {/* Used Market Tips */}
          <View style={[styles.usedTipsBox, { backgroundColor: theme.background, borderColor: theme.primary }]}>
            <Text style={[styles.usedTipsTitle, { color: theme.text }]}>
              🏷️ {guide.kitRecommendations.usedMarketTips.title}
            </Text>
            <Text style={[styles.usedSavings, { color: theme.primary }]}>
              Expected savings: {guide.kitRecommendations.usedMarketTips.expectedSavings}
            </Text>
            {guide.kitRecommendations.usedMarketTips.tips.map((tip, index) => (
              <Text key={index} style={[styles.usedTip, { color: theme.secondaryText }]}>• {tip}</Text>
            ))}
          </View>
        </View>
      )}

      {/* Cymbals Section */}
      {activeSection === 'cymbals' && (
        <View style={[styles.section, { backgroundColor: theme.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>{guide.cymbals.title}</Text>
          <Text style={[styles.sectionContent, { color: theme.secondaryText }]}>
            {guide.cymbals.description}
          </Text>

          <View style={[styles.warningBox, { backgroundColor: '#fef2f2', borderColor: '#ef4444' }]}>
            <Text style={[styles.warningText, { color: '#b91c1c' }]}>{guide.cymbals.warning}</Text>
          </View>

          {/* Essential Metal Cymbals */}
          <View style={[styles.essentialCymbalsBox, { borderColor: theme.border }]}>
            <Text style={[styles.essentialTitle, { color: theme.text }]}>
              {guide.cymbals.essentialMetalCymbals.title}
            </Text>
            {guide.cymbals.essentialMetalCymbals.cymbals.map((cymbal, index) => (
              <View key={index} style={[styles.cymbalTypeRow, { borderColor: theme.border }]}>
                <View style={styles.cymbalTypeHeader}>
                  <Text style={[styles.cymbalTypeName, { color: theme.text }]}>{cymbal.type}</Text>
                  <Text style={[styles.cymbalImportance, { 
                    color: cymbal.importance === 'CRITICAL' ? '#ef4444' : 
                           cymbal.importance === 'HIGH' ? '#f97316' : theme.secondaryText 
                  }]}>
                    {cymbal.importance}
                  </Text>
                </View>
                <Text style={[styles.cymbalDescription, { color: theme.secondaryText }]}>{cymbal.description}</Text>
                <Text style={[styles.cymbalTip, { color: theme.primary }]}>💡 {cymbal.metalTip}</Text>
              </View>
            ))}
          </View>

          {/* Cymbal Set Options */}
          <Text style={[styles.subsectionTitle, { color: theme.text }]}>Recommended Cymbal Sets</Text>
          {guide.cymbals.categories[0].options.map((option, index) => (
            <View key={index} style={[styles.cymbalSetCard, { backgroundColor: theme.background, borderColor: theme.border }]}>
              <View style={styles.cymbalSetHeader}>
                <Text style={[styles.cymbalSetName, { color: theme.text }]}>{option.name}</Text>
                <Text style={[styles.cymbalSetPrice, { color: theme.primary }]}>{option.price}</Text>
              </View>
              <Text style={[styles.cymbalSetDescription, { color: theme.secondaryText }]}>{option.description}</Text>
              
              <View style={styles.cymbalSetContents}>
                <Text style={[styles.cymbalSetContentsTitle, { color: theme.text }]}>Includes:</Text>
                <View style={styles.cymbalSetList}>
                  {option.contents.map((item, i) => (
                    <Text key={i} style={[styles.cymbalSetItem, { color: theme.secondaryText }]}>• {item}</Text>
                  ))}
                </View>
              </View>

              <Text style={[styles.metalRating, { color: theme.text }]}>{option.metalRating}</Text>
              <Text style={[styles.bestFor, { color: theme.primary }]}>🎯 {option.bestFor}</Text>

              {/* Affiliate Links */}
              <View style={styles.affiliateButtons}>
                <TouchableOpacity
                  style={[styles.affiliateButton, { backgroundColor: '#0066cc' }]}
                  onPress={() => handleAffiliateClick(option.name, 'thomann', option.affiliateLinks.thomann)}
                >
                  <Text style={styles.affiliateButtonText}>🛒 Thomann</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.affiliateButton, { backgroundColor: '#ff6b35' }]}
                  onPress={() => handleAffiliateClick(option.name, 'sweetwater', option.affiliateLinks.sweetwater)}
                >
                  <Text style={styles.affiliateButtonText}>🛒 Sweetwater</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}

          <View style={[styles.proTipBox, { backgroundColor: '#fef3c7', borderColor: '#f59e0b' }]}>
            <Text style={[styles.proTipLabel, { color: '#92400e' }]}>💡 Pro Tip</Text>
            <Text style={[styles.proTipText, { color: '#78350f' }]}>{guide.cymbals.proTip}</Text>
          </View>
        </View>
      )}

      {/* Hardware Section */}
      {activeSection === 'hardware' && (
        <View style={[styles.section, { backgroundColor: theme.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>{guide.hardware.title}</Text>
          <Text style={[styles.sectionContent, { color: theme.secondaryText }]}>
            {guide.hardware.description}
          </Text>

          {guide.hardware.essentialHardware.map((hw, index) => (
            <View key={index} style={[styles.hardwareCard, { backgroundColor: theme.background, borderColor: theme.border }]}>
              <View style={styles.hardwareHeader}>
                <Text style={[styles.hardwareName, { color: theme.text }]}>{hw.item}</Text>
                <Text style={[styles.hardwareImportance, { 
                  color: hw.importance === 'CRITICAL' ? '#ef4444' : 
                         hw.importance === 'HIGH' ? '#f97316' : theme.secondaryText 
                }]}>
                  {hw.importance}
                </Text>
              </View>
              <Text style={[styles.hardwareDescription, { color: theme.secondaryText }]}>{hw.description}</Text>

              {/* Budget Options for Pedals */}
              {hw.budgetOptions && (
                <View style={styles.pedalOptions}>
                  {hw.budgetOptions.map((pedal, i) => (
                    <View key={i} style={[styles.pedalOption, { borderColor: theme.border }]}>
                      <Text style={[styles.pedalName, { color: theme.text }]}>{pedal.name}</Text>
                      <Text style={[styles.pedalPrice, { color: theme.primary }]}>{pedal.price}</Text>
                      <Text style={[styles.pedalDescription, { color: theme.secondaryText }]}>{pedal.description}</Text>
                      {pedal.affiliateLinks && (
                        <View style={styles.affiliateButtons}>
                          <TouchableOpacity
                            style={[styles.affiliateButtonSmall, { backgroundColor: '#0066cc' }]}
                            onPress={() => handleAffiliateClick(pedal.name, 'thomann', pedal.affiliateLinks.thomann)}
                          >
                            <Text style={styles.affiliateButtonSmallText}>Thomann</Text>
                          </TouchableOpacity>
                          {pedal.affiliateLinks.sweetwater && (
                            <TouchableOpacity
                              style={[styles.affiliateButtonSmall, { backgroundColor: '#ff6b35' }]}
                              onPress={() => handleAffiliateClick(pedal.name, 'sweetwater', pedal.affiliateLinks.sweetwater)}
                            >
                              <Text style={styles.affiliateButtonSmallText}>Sweetwater</Text>
                            </TouchableOpacity>
                          )}
                        </View>
                      )}
                    </View>
                  ))}
                </View>
              )}

              {hw.doubleBassTip && (
                <Text style={[styles.hardwareTip, { color: theme.primary }]}>
                  🦶 {hw.doubleBassTip}
                </Text>
              )}

              {hw.checkFor && (
                <View style={styles.checkForList}>
                  <Text style={[styles.checkForTitle, { color: theme.text }]}>Look for:</Text>
                  {hw.checkFor.map((item, i) => (
                    <Text key={i} style={[styles.checkForItem, { color: theme.secondaryText }]}>✓ {item}</Text>
                  ))}
                </View>
              )}

              {hw.tip && (
                <Text style={[styles.hardwareTip, { color: theme.primary }]}>💡 {hw.tip}</Text>
              )}

              {hw.backPainWarning && (
                <Text style={[styles.backPainWarning, { color: '#ef4444' }]}>⚠️ {hw.backPainWarning}</Text>
              )}
            </View>
          ))}
        </View>
      )}

      {/* Technique Basics Section */}
      {activeSection === 'technique' && (
        <View style={[styles.section, { backgroundColor: theme.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>{guide.techniqueBasics.title}</Text>
          <Text style={[styles.sectionContent, { color: theme.secondaryText }]}>
            {guide.techniqueBasics.intro}
          </Text>

          {guide.techniqueBasics.techniques.map((technique, index) => (
            <View key={index} style={[styles.techniqueCard, { backgroundColor: theme.background, borderColor: theme.border }]}>
              <View style={styles.techniqueHeader}>
                <Text style={[styles.techniqueName, { color: theme.text }]}>{technique.name}</Text>
                <Text style={[styles.techniqueDifficulty, { 
                  color: technique.difficulty === 'Beginner' ? '#22c55e' : 
                         technique.difficulty === 'Intermediate' ? '#f97316' : '#ef4444' 
                }]}>
                  {technique.difficulty}
                </Text>
              </View>
              <Text style={[styles.techniqueDescription, { color: theme.secondaryText }]}>{technique.description}</Text>
              <Text style={[styles.techniqueGoal, { color: theme.primary }]}>🎯 Goal: {technique.practiceGoal}</Text>
              <Text style={[styles.techniqueApplication, { color: theme.secondaryText }]}>
                Metal use: {technique.metalApplication}
              </Text>
              <Text style={[styles.techniqueTip, { color: theme.text }]}>💡 {technique.videoTip}</Text>

              {/* Related Drummers */}
              {technique.relatedDrummers && technique.relatedDrummers.length > 0 && (
                <View style={styles.relatedDrummers}>
                  <Text style={[styles.relatedDrummersLabel, { color: theme.secondaryText }]}>
                    Learn from:
                  </Text>
                  <View style={styles.relatedDrummerLinks}>
                    {technique.relatedDrummers.map((drummerId, i) => (
                      <TouchableOpacity
                        key={i}
                        style={[styles.drummerLink, { backgroundColor: theme.primary + '20' }]}
                        onPress={() => handleDrummerClick(drummerId)}
                      >
                        <Text style={[styles.drummerLinkText, { color: theme.primary }]}>
                          {drummerId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}
            </View>
          ))}

          {/* Daily Practice Routine */}
          <View style={[styles.practiceRoutineBox, { backgroundColor: theme.background, borderColor: theme.primary }]}>
            <Text style={[styles.practiceRoutineTitle, { color: theme.text }]}>
              ⏱️ {guide.techniqueBasics.dailyPracticeRoutine.title}
            </Text>
            {guide.techniqueBasics.dailyPracticeRoutine.steps.map((step, index) => (
              <View key={index} style={styles.practiceStep}>
                <Text style={[styles.practiceStepTime, { color: theme.primary }]}>{step.time}</Text>
                <Text style={[styles.practiceStepExercise, { color: theme.secondaryText }]}>{step.exercise}</Text>
              </View>
            ))}
            <Text style={[styles.practiceNote, { color: theme.text }]}>
              ✨ {guide.techniqueBasics.dailyPracticeRoutine.note}
            </Text>
          </View>
        </View>
      )}

      {/* Setup and Tuning Section */}
      {activeSection === 'setup' && (
        <View style={[styles.section, { backgroundColor: theme.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>{guide.setupAndTuning.title}</Text>
          <Text style={[styles.sectionContent, { color: theme.secondaryText }]}>
            {guide.setupAndTuning.intro}
          </Text>

          {/* Ergonomics */}
          <Text style={[styles.subsectionTitle, { color: theme.text }]}>{guide.setupAndTuning.ergonomics.title}</Text>
          {guide.setupAndTuning.ergonomics.tips.map((tip, index) => (
            <View key={index} style={[styles.ergonomicTip, { backgroundColor: theme.background, borderColor: theme.border }]}>
              <Text style={[styles.ergonomicArea, { color: theme.text }]}>{tip.area}</Text>
              <Text style={[styles.ergonomicAdvice, { color: theme.secondaryText }]}>{tip.tip}</Text>
              <Text style={[styles.ergonomicMistake, { color: '#ef4444' }]}>❌ Common mistake: {tip.common_mistake}</Text>
            </View>
          ))}

          {/* Tuning */}
          <Text style={[styles.subsectionTitle, { color: theme.text }]}>{guide.setupAndTuning.tuning.title}</Text>
          <Text style={[styles.tuningOverview, { color: theme.secondaryText }]}>{guide.setupAndTuning.tuning.overview}</Text>

          {guide.setupAndTuning.tuning.instruments.map((drum, index) => (
            <View key={index} style={[styles.tuningCard, { backgroundColor: theme.background, borderColor: theme.border }]}>
              <View style={styles.tuningHeader}>
                <Text style={[styles.tuningDrum, { color: theme.text }]}>{drum.drum}</Text>
                <Text style={[styles.tuningApproach, { color: theme.primary }]}>{drum.approach}</Text>
              </View>
              <View style={styles.tuningSpecs}>
                <Text style={[styles.tuningSpec, { color: theme.secondaryText }]}>Batter: {drum.batterTension}</Text>
                <Text style={[styles.tuningSpec, { color: theme.secondaryText }]}>Resonant: {drum.resoTension}</Text>
                <Text style={[styles.tuningSpec, { color: theme.secondaryText }]}>Dampening: {drum.dampening}</Text>
              </View>
              <Text style={[styles.tuningTarget, { color: theme.text }]}>🎯 Target sound: {drum.targetSound}</Text>
              <Text style={[styles.tuningTip, { color: theme.primary }]}>💡 {drum.metalTip}</Text>
            </View>
          ))}

          {/* Tuning Tips */}
          <View style={[styles.tuningTipsBox, { backgroundColor: theme.background, borderColor: theme.border }]}>
            <Text style={[styles.tuningTipsTitle, { color: theme.text }]}>🔧 Quick Tuning Tips</Text>
            {guide.setupAndTuning.tuning.tuningTips.map((tip, index) => (
              <Text key={index} style={[styles.tuningTipItem, { color: theme.secondaryText }]}>• {tip}</Text>
            ))}
          </View>
        </View>
      )}

      {/* Upgrade Path Section */}
      {activeSection === 'upgrades' && (
        <View style={[styles.section, { backgroundColor: theme.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>{guide.upgradePath.title}</Text>
          <Text style={[styles.sectionContent, { color: theme.secondaryText }]}>
            {guide.upgradePath.intro}
          </Text>

          {guide.upgradePath.upgrades.map((upgrade, index) => (
            <View key={index} style={[styles.upgradeCard, { backgroundColor: theme.background, borderColor: theme.border }]}>
              <View style={[styles.upgradePriority, { backgroundColor: theme.primary }]}>
                <Text style={styles.upgradePriorityText}>#{upgrade.priority}</Text>
              </View>
              <View style={styles.upgradeContent}>
                <Text style={[styles.upgradeItem, { color: theme.text }]}>{upgrade.item}</Text>
                <View style={styles.upgradeMeta}>
                  <Text style={[styles.upgradeWhen, { color: theme.secondaryText }]}>📅 {upgrade.when}</Text>
                  <Text style={[styles.upgradeBudget, { color: theme.primary }]}>💰 {upgrade.budget}</Text>
                </View>
                <Text style={[styles.upgradeWhy, { color: theme.secondaryText }]}>{upgrade.why}</Text>
                <Text style={[styles.upgradeRecommendation, { color: theme.text }]}>
                  ✓ Recommended: {upgrade.recommendation}
                </Text>
              </View>
            </View>
          ))}

          <View style={[styles.savingsBox, { backgroundColor: '#dcfce7', borderColor: '#22c55e' }]}>
            <Text style={[styles.savingsTitle, { color: '#166534' }]}>💰 Savings Strategy</Text>
            <Text style={[styles.savingsText, { color: '#15803d' }]}>{guide.upgradePath.savingsStrategy}</Text>
          </View>
        </View>
      )}

      {/* Buying Tips Section */}
      {activeSection === 'tips' && (
        <View style={[styles.section, { backgroundColor: theme.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>{guide.buyingTips.title}</Text>

          {guide.buyingTips.categories.map((category, catIndex) => (
            <View key={catIndex} style={[styles.tipsCategory, { backgroundColor: theme.background, borderColor: theme.border }]}>
              <Text style={[styles.tipsCategoryTitle, { color: theme.text }]}>{category.title}</Text>
              {category.tips.map((tip, tipIndex) => (
                <View key={tipIndex} style={styles.tipItem}>
                  <Text style={[styles.tipName, { color: theme.primary }]}>{tip.tip}</Text>
                  <Text style={[styles.tipDescription, { color: theme.secondaryText }]}>{tip.description}</Text>
                </View>
              ))}
            </View>
          ))}

          <View style={[styles.negotiationTip, { backgroundColor: '#dbeafe', borderColor: '#3b82f6' }]}>
            <Text style={[styles.negotiationText, { color: '#1e40af' }]}>
              🤝 {guide.buyingTips.negotiationTip}
            </Text>
          </View>

          {/* Sample Builds */}
          <Text style={[styles.subsectionTitle, { color: theme.text }]}>{guide.sampleBuilds.title}</Text>
          {guide.sampleBuilds.builds.map((build, index) => (
            <View key={index} style={[styles.buildCard, { backgroundColor: theme.background, borderColor: theme.border }]}>
              <View style={styles.buildHeader}>
                <Text style={[styles.buildName, { color: theme.text }]}>{build.name}</Text>
                <Text style={[styles.buildTotal, { color: theme.primary }]}>${build.totalCost}</Text>
              </View>
              <Text style={[styles.buildDescription, { color: theme.secondaryText }]}>{build.description}</Text>
              <View style={styles.buildItems}>
                {build.items.map((item, i) => (
                  <View key={i} style={styles.buildItem}>
                    <Text style={[styles.buildItemName, { color: theme.text }]}>{item.item}</Text>
                    <Text style={[styles.buildItemCost, { color: theme.secondaryText }]}>${item.cost}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      )}

      {/* FAQ Section */}
      {activeSection === 'faq' && (
        <View style={[styles.section, { backgroundColor: theme.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Frequently Asked Questions</Text>

          {guide.faq.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.faqItem, { backgroundColor: theme.background, borderColor: theme.border }]}
              onPress={() => toggleFaq(index)}
            >
              <View style={styles.faqQuestion}>
                <Text style={[styles.faqQuestionText, { color: theme.text }]}>{item.question}</Text>
                <Text style={[styles.faqToggle, { color: theme.primary }]}>
                  {expandedFaq[index] ? '−' : '+'}
                </Text>
              </View>
              {expandedFaq[index] && (
                <Text style={[styles.faqAnswer, { color: theme.secondaryText }]}>{item.answer}</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Related Content */}
      <View style={[styles.relatedSection, { backgroundColor: theme.card }]}>
        <Text style={[styles.relatedTitle, { color: theme.text }]}>🔗 Related Content</Text>
        
        <Text style={[styles.relatedSubtitle, { color: theme.secondaryText }]}>Learn from the pros:</Text>
        <View style={styles.relatedDrummerGrid}>
          {guide.relatedContent.drummers.map((drummer, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.relatedDrummerCard, { backgroundColor: theme.background, borderColor: theme.border }]}
              onPress={() => handleDrummerClick(drummer.id)}
            >
              <Text style={[styles.relatedDrummerName, { color: theme.text }]}>{drummer.name}</Text>
              <Text style={[styles.relatedDrummerReason, { color: theme.secondaryText }]}>{drummer.reason}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Footer CTA */}
      <View style={[styles.footerCTA, { backgroundColor: theme.primary + '15' }]}>
        <Text style={[styles.footerTitle, { color: theme.text }]}>Ready to Start Your Metal Journey? 🤘</Text>
        <Text style={[styles.footerText, { color: theme.secondaryText }]}>
          You now have everything you need to build your first metal drum kit. Remember: technique matters more than gear. 
          Start practicing today, and you'll be blasting in no time.
        </Text>
        <View style={styles.footerButtons}>
          <TouchableOpacity
            style={[styles.footerButton, { backgroundColor: theme.primary }]}
            onPress={() => handleShare('twitter')}
          >
            <Text style={styles.footerButtonText}>Share This Guide</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.footerButton, { backgroundColor: theme.card, borderColor: theme.primary, borderWidth: 1 }]}
            onPress={onBack}
          >
            <Text style={[styles.footerButtonText, { color: theme.primary }]}>Browse More Guides</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

// ==========================================
// Styles
// ==========================================
const styles = {
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 60,
  },
  header: {
    padding: 16,
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  backButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  loadingText: {
    fontSize: 16,
  },
  heroSection: {
    margin: 16,
    marginTop: 0,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
  },
  heroBadge: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginBottom: 16,
  },
  heroBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 36,
  },
  heroSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  heroStats: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  heroStat: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    minWidth: 80,
  },
  heroStatValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  heroStatLabel: {
    fontSize: 12,
  },
  shareButtons: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  shareButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  shareButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  sectionNav: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  sectionNavContent: {
    gap: 8,
    paddingRight: 16,
  },
  sectionNavButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
  },
  sectionNavText: {
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    margin: 16,
    marginTop: 0,
    padding: 20,
    borderRadius: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
  },
  sectionContent: {
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 20,
  },
  keyPointsBox: {
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    marginBottom: 16,
  },
  keyPointsTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  keyPoint: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 6,
  },
  trustBadge: {
    padding: 16,
    borderRadius: 12,
  },
  trustText: {
    fontSize: 14,
    fontWeight: '600',
  },
  totalBudgetBox: {
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  totalBudgetLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  totalBudgetValue: {
    fontSize: 36,
    fontWeight: '800',
  },
  budgetCategory: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 12,
  },
  budgetCategoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  budgetEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  budgetCategoryInfo: {
    flex: 1,
  },
  budgetCategoryName: {
    fontSize: 16,
    fontWeight: '600',
  },
  budgetCategoryAmount: {
    fontSize: 14,
    fontWeight: '700',
  },
  budgetPercentage: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  budgetPercentageText: {
    fontSize: 14,
    fontWeight: '700',
  },
  budgetBar: {
    height: 6,
    borderRadius: 3,
    marginBottom: 12,
  },
  budgetBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  budgetCategoryMeta: {
    flexDirection: 'row',
    gap: 12,
  },
  budgetPriority: {
    fontSize: 12,
    fontWeight: '700',
  },
  budgetNotes: {
    fontSize: 12,
    flex: 1,
  },
  proTipBox: {
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    marginTop: 16,
  },
  proTipLabel: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },
  proTipText: {
    fontSize: 14,
    lineHeight: 20,
  },
  warningBox: {
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    marginBottom: 20,
  },
  warningText: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
  },
  specsBox: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 20,
  },
  specsTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  specRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    flexWrap: 'wrap',
  },
  specIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  specLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginRight: 8,
  },
  specValue: {
    fontSize: 14,
    flex: 1,
  },
  kitCard: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
  },
  kitCardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  rankBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  rankBadgeText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 14,
  },
  kitCardTitleArea: {
    flex: 1,
  },
  kitName: {
    fontSize: 18,
    fontWeight: '700',
  },
  kitBrand: {
    fontSize: 14,
  },
  kitPriceArea: {
    alignItems: 'flex-end',
  },
  kitPrice: {
    fontSize: 18,
    fontWeight: '700',
  },
  kitRating: {
    marginTop: 4,
  },
  kitRatingText: {
    fontSize: 14,
    fontWeight: '600',
  },
  kitDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  kitSpecs: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
  },
  kitSpecsTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  kitSizes: {
    gap: 4,
  },
  kitSize: {
    fontSize: 13,
  },
  prosConsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  prosSection: {
    flex: 1,
  },
  consSection: {
    flex: 1,
  },
  prosTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },
  consTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },
  proItem: {
    fontSize: 13,
    marginBottom: 4,
  },
  conItem: {
    fontSize: 13,
    marginBottom: 4,
  },
  bestFor: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  metalVerdict: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 16,
  },
  affiliateButtons: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  affiliateButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  affiliateButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  affiliateButtonSmall: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  affiliateButtonSmallText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  relatedDrummers: {
    marginTop: 8,
  },
  relatedDrummersLabel: {
    fontSize: 12,
    marginBottom: 8,
  },
  relatedDrummerLinks: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  drummerLink: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  drummerLinkText: {
    fontSize: 12,
    fontWeight: '600',
  },
  usedTipsBox: {
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
  },
  usedTipsTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  usedSavings: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 12,
  },
  usedTip: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 4,
  },
  subsectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
    marginTop: 8,
  },
  essentialCymbalsBox: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 20,
  },
  essentialTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  cymbalTypeRow: {
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  cymbalTypeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cymbalTypeName: {
    fontSize: 15,
    fontWeight: '600',
  },
  cymbalImportance: {
    fontSize: 12,
    fontWeight: '700',
  },
  cymbalDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
  },
  cymbalTip: {
    fontSize: 13,
    marginTop: 4,
  },
  cymbalSetCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  cymbalSetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cymbalSetName: {
    fontSize: 16,
    fontWeight: '700',
    flex: 1,
  },
  cymbalSetPrice: {
    fontSize: 16,
    fontWeight: '700',
  },
  cymbalSetDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  cymbalSetContents: {
    marginBottom: 12,
  },
  cymbalSetContentsTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  cymbalSetList: {
    gap: 4,
  },
  cymbalSetItem: {
    fontSize: 13,
  },
  metalRating: {
    fontSize: 14,
    marginBottom: 8,
  },
  hardwareCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  hardwareHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  hardwareName: {
    fontSize: 16,
    fontWeight: '700',
  },
  hardwareImportance: {
    fontSize: 12,
    fontWeight: '700',
  },
  hardwareDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  pedalOptions: {
    gap: 12,
    marginBottom: 12,
  },
  pedalOption: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
  },
  pedalName: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  pedalPrice: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },
  pedalDescription: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 8,
  },
  hardwareTip: {
    fontSize: 14,
    marginTop: 8,
  },
  checkForList: {
    marginTop: 12,
  },
  checkForTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  checkForItem: {
    fontSize: 13,
    marginBottom: 4,
  },
  backPainWarning: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
  },
  techniqueCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  techniqueHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  techniqueName: {
    fontSize: 16,
    fontWeight: '700',
  },
  techniqueDifficulty: {
    fontSize: 12,
    fontWeight: '700',
  },
  techniqueDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  techniqueGoal: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  techniqueApplication: {
    fontSize: 13,
    marginBottom: 8,
  },
  techniqueTip: {
    fontSize: 13,
    marginBottom: 8,
  },
  practiceRoutineBox: {
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    marginTop: 16,
  },
  practiceRoutineTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  practiceStep: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  practiceStepTime: {
    fontSize: 14,
    fontWeight: '700',
    width: 50,
  },
  practiceStepExercise: {
    fontSize: 14,
    flex: 1,
  },
  practiceNote: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 12,
  },
  ergonomicTip: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  ergonomicArea: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 8,
  },
  ergonomicAdvice: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  ergonomicMistake: {
    fontSize: 13,
  },
  tuningOverview: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 16,
  },
  tuningCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  tuningHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  tuningDrum: {
    fontSize: 16,
    fontWeight: '700',
  },
  tuningApproach: {
    fontSize: 14,
    fontWeight: '700',
  },
  tuningSpecs: {
    marginBottom: 12,
    gap: 4,
  },
  tuningSpec: {
    fontSize: 14,
  },
  tuningTarget: {
    fontSize: 14,
    marginBottom: 8,
  },
  tuningTip: {
    fontSize: 13,
  },
  tuningTipsBox: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 16,
  },
  tuningTipsTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  tuningTipItem: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 4,
  },
  upgradeCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  upgradePriority: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  upgradePriorityText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 14,
  },
  upgradeContent: {
    flex: 1,
  },
  upgradeItem: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  upgradeMeta: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 8,
  },
  upgradeWhen: {
    fontSize: 13,
  },
  upgradeBudget: {
    fontSize: 13,
    fontWeight: '600',
  },
  upgradeWhy: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  upgradeRecommendation: {
    fontSize: 13,
    fontWeight: '600',
  },
  savingsBox: {
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    marginTop: 8,
  },
  savingsTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },
  savingsText: {
    fontSize: 14,
    lineHeight: 20,
  },
  tipsCategory: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  tipsCategoryTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  tipItem: {
    marginBottom: 12,
  },
  tipName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  tipDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
  negotiationTip: {
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    marginBottom: 20,
  },
  negotiationText: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
  },
  buildCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  buildHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  buildName: {
    fontSize: 16,
    fontWeight: '700',
  },
  buildTotal: {
    fontSize: 18,
    fontWeight: '800',
  },
  buildDescription: {
    fontSize: 14,
    marginBottom: 12,
  },
  buildItems: {
    gap: 4,
  },
  buildItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buildItemName: {
    fontSize: 14,
    flex: 1,
  },
  buildItemCost: {
    fontSize: 14,
    fontWeight: '600',
  },
  faqItem: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 8,
  },
  faqQuestion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestionText: {
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
    paddingRight: 12,
  },
  faqToggle: {
    fontSize: 24,
    fontWeight: '700',
  },
  faqAnswer: {
    fontSize: 14,
    lineHeight: 22,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  relatedSection: {
    margin: 16,
    padding: 20,
    borderRadius: 16,
  },
  relatedTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  relatedSubtitle: {
    fontSize: 14,
    marginBottom: 12,
  },
  relatedDrummerGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  relatedDrummerCard: {
    flex: 1,
    minWidth: 140,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  relatedDrummerName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  relatedDrummerReason: {
    fontSize: 12,
    lineHeight: 16,
  },
  footerCTA: {
    margin: 16,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
  },
  footerTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  footerText: {
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 20,
  },
  footerButtons: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  footerButton: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  footerButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
};

export default BeginnerGearGuidePage;
