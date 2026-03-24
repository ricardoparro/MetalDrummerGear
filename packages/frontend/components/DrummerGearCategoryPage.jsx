// Drummer Gear Category Page Component
// Issue #770: SEO Blitz — Auto-Generate 50 Long-Tail Keyword Pages (Gear-Specific)
//
// Renders /drummer/:slug/:category pages with SEO-optimized content

import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView, Pressable, ActivityIndicator, StyleSheet, Platform } from 'react-native';
import { ThemeContext } from '../ThemeContext';
import {
  VALID_CATEGORIES,
  CATEGORY_META,
  isDrummerGearCategoryPage,
  getDrummerGearCategoryFromURL,
  fetchDrummerGearCategoryData,
  updateGearCategoryMeta,
  generateSchemaMarkup,
} from '../data/drummerGearCategoryPages';

// SEO Schema injection
function injectSchema(schema) {
  if (typeof document === 'undefined' || !schema) return;
  
  // Remove existing schema
  const existing = document.querySelector('script[type="application/ld+json"][data-page="gear-category"]');
  if (existing) existing.remove();
  
  // Add new schema
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute('data-page', 'gear-category');
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

// Gear item card component
function GearItemCard({ item, theme }) {
  return (
    <View style={[styles.gearItemCard, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
      <Text style={[styles.gearItemName, { color: theme.text }]}>{item.name}</Text>
      {item.brand && (
        <Text style={[styles.gearItemBrand, { color: theme.primary }]}>{item.brand}</Text>
      )}
      {item.size && (
        <Text style={[styles.gearItemSize, { color: theme.secondaryText }]}>Size: {item.size}</Text>
      )}
    </View>
  );
}

// FAQ section component
function FAQSection({ faq, theme }) {
  const [expanded, setExpanded] = useState({});
  
  return (
    <View style={styles.faqSection}>
      <Text style={[styles.sectionTitle, { color: theme.text }]}>❓ Frequently Asked Questions</Text>
      {faq.map((item, index) => (
        <Pressable 
          key={index}
          onPress={() => setExpanded(prev => ({ ...prev, [index]: !prev[index] }))}
          style={[styles.faqItem, { backgroundColor: theme.cardBg, borderColor: theme.border }]}
        >
          <Text style={[styles.faqQuestion, { color: theme.text }]}>
            {expanded[index] ? '▼' : '▶'} {item.question}
          </Text>
          {expanded[index] && (
            <Text style={[styles.faqAnswer, { color: theme.secondaryText }]}>{item.answer}</Text>
          )}
        </Pressable>
      ))}
    </View>
  );
}

// Related drummers section
function RelatedDrummersSection({ drummers, category, theme, onNavigate }) {
  if (!drummers || drummers.length === 0) return null;
  
  return (
    <View style={styles.relatedSection}>
      <Text style={[styles.sectionTitle, { color: theme.text }]}>
        🤘 Other Drummers Using Similar {CATEGORY_META[category]?.title || category}
      </Text>
      {drummers.map((drummer, index) => (
        <Pressable 
          key={index}
          onPress={() => onNavigate && onNavigate(drummer.slug, category)}
          style={[styles.relatedDrummerCard, { backgroundColor: theme.cardBg, borderColor: theme.border }]}
          accessibilityRole="link"
          accessibilityLabel={`${drummer.name} - ${drummer.band}`}
        >
          <Text style={[styles.relatedDrummerName, { color: theme.text }]}>{drummer.name}</Text>
          <Text style={[styles.relatedDrummerBand, { color: theme.secondaryText }]}>{drummer.band}</Text>
          {drummer.brand && (
            <Text style={[styles.relatedDrummerBrand, { color: theme.primary }]}>{drummer.brand} {CATEGORY_META[category]?.title}</Text>
          )}
        </Pressable>
      ))}
    </View>
  );
}

// Navigation links to other categories
function OtherCategoriesNav({ categories, currentCategory, drummerSlug, drummerName, theme, onNavigate }) {
  if (!categories || categories.length === 0) return null;
  
  return (
    <View style={styles.categoriesNav}>
      <Text style={[styles.sectionTitle, { color: theme.text }]}>
        📦 Explore {drummerName}'s Other Gear
      </Text>
      <View style={styles.categoriesRow}>
        {categories.map((cat, index) => (
          <Pressable
            key={index}
            onPress={() => onNavigate && onNavigate(drummerSlug, cat.category)}
            style={[
              styles.categoryChip,
              { backgroundColor: theme.primary + '20', borderColor: theme.primary },
            ]}
            accessibilityRole="link"
          >
            <Text style={[styles.categoryChipText, { color: theme.primary }]}>
              {CATEGORY_META[cat.category]?.emoji} {cat.title}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

// Breadcrumb navigation
function Breadcrumbs({ items, theme }) {
  return (
    <View style={styles.breadcrumbs}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <Text style={[styles.breadcrumbSeparator, { color: theme.secondaryText }]}> › </Text>}
          <Text 
            style={[
              styles.breadcrumbText, 
              { color: index === items.length - 1 ? theme.text : theme.primary }
            ]}
            accessibilityRole="link"
          >
            {item.name}
          </Text>
        </React.Fragment>
      ))}
    </View>
  );
}

// Main Page Component
export function DrummerGearCategoryPage({ drummerSlug: propSlug, category: propCategory, onBack, onNavigate, onNavigateToDrummer }) {
  const theme = useContext(ThemeContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Get slug and category from props or URL
  const urlInfo = getDrummerGearCategoryFromURL();
  const drummerSlug = propSlug || urlInfo?.drummerSlug;
  const category = propCategory || urlInfo?.category;
  
  useEffect(() => {
    if (!drummerSlug || !category) {
      setError('Invalid page URL');
      setLoading(false);
      return;
    }
    
    async function loadData() {
      setLoading(true);
      setError(null);
      
      const result = await fetchDrummerGearCategoryData(drummerSlug, category);
      
      if (!result) {
        setError('Failed to load gear data');
        setLoading(false);
        return;
      }
      
      setData(result);
      setLoading(false);
      
      // Update meta tags for SEO
      updateGearCategoryMeta(result);
      
      // Inject schema markup
      const schema = generateSchemaMarkup(result);
      injectSchema(schema);
    }
    
    loadData();
  }, [drummerSlug, category]);
  
  // Handle navigation to different category
  const handleCategoryNavigate = (slug, cat) => {
    if (onNavigate) {
      onNavigate(slug, cat);
    } else if (Platform.OS === 'web') {
      window.history.pushState({}, '', `/drummer/${slug}/${cat}`);
      window.location.reload();
    }
  };
  
  // Handle navigation back to drummer profile
  const handleBackToDrummer = () => {
    if (onNavigateToDrummer && data?.drummer?.slug) {
      onNavigateToDrummer(data.drummer.slug);
    } else if (Platform.OS === 'web' && data?.drummer?.slug) {
      window.history.pushState({}, '', `/drummer/${data.drummer.slug}`);
      window.location.reload();
    }
  };
  
  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.primary} />
        <Text style={[styles.loadingText, { color: theme.secondaryText }]}>Loading gear data...</Text>
      </View>
    );
  }
  
  if (error) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={[styles.errorText, { color: theme.error || '#ff4444' }]}>⚠️ {error}</Text>
        {onBack && (
          <Pressable onPress={onBack} style={[styles.backButton, { backgroundColor: theme.primary }]}>
            <Text style={styles.backButtonText}>← Go Back</Text>
          </Pressable>
        )}
      </View>
    );
  }
  
  if (!data) return null;
  
  const { drummer, gear, schema, relatedDrummers, relatedLinks } = data;
  const catMeta = CATEGORY_META[category];
  
  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.scrollContent}
    >
      {/* Breadcrumbs */}
      <Breadcrumbs items={schema?.breadcrumbs || []} theme={theme} />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.pageTitle, { color: theme.text }]}>
          {catMeta?.emoji} {drummer.name}'s {catMeta?.title}
        </Text>
        <Text style={[styles.subtitle, { color: theme.secondaryText }]}>
          Complete {catMeta?.title?.toLowerCase()} setup for the {drummer.band} drummer
        </Text>
      </View>
      
      {/* Main Gear Info */}
      <View style={[styles.gearCard, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
        {gear.brand && (
          <View style={[styles.brandBadge, { backgroundColor: theme.primary }]}>
            <Text style={styles.brandBadgeText}>{gear.brand}</Text>
          </View>
        )}
        
        <Text style={[styles.gearRaw, { color: theme.text }]}>
          {gear.raw}
        </Text>
        
        {gear.verified && (
          <View style={styles.verifiedBadge}>
            <Text style={styles.verifiedText}>✅ Verified Setup</Text>
            {gear.verifiedAt && (
              <Text style={[styles.verifiedDate, { color: theme.secondaryText }]}>
                Last updated: {gear.verifiedAt}
              </Text>
            )}
          </View>
        )}
        
        {gear.sources && gear.sources.length > 0 && (
          <View style={styles.sources}>
            <Text style={[styles.sourcesTitle, { color: theme.secondaryText }]}>Sources:</Text>
            {gear.sources.map((source, idx) => (
              <Text key={idx} style={[styles.sourceLink, { color: theme.primary }]}>
                • {source.replace(/https?:\/\//, '').split('/')[0]}
              </Text>
            ))}
          </View>
        )}
      </View>
      
      {/* Gear Items Breakdown */}
      {gear.items && gear.items.length > 1 && (
        <View style={styles.gearItemsSection}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>📋 Detailed Breakdown</Text>
          {gear.items.map((item, index) => (
            <GearItemCard key={index} item={item} theme={theme} />
          ))}
        </View>
      )}
      
      {/* Video Section */}
      {data.videos && data.videos.length > 0 && (
        <View style={styles.videosSection}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>🎬 Watch {drummer.name} Play</Text>
          {data.videos.map((video, index) => (
            <View key={index} style={[styles.videoCard, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
              <Text style={[styles.videoTitle, { color: theme.text }]}>{video.title}</Text>
              <Text style={[styles.videoYear, { color: theme.secondaryText }]}>{video.year}</Text>
            </View>
          ))}
        </View>
      )}
      
      {/* FAQ Section */}
      {schema?.faq && schema.faq.length > 0 && (
        <FAQSection faq={schema.faq} theme={theme} />
      )}
      
      {/* Other Categories */}
      <OtherCategoriesNav 
        categories={relatedLinks?.otherCategories}
        currentCategory={category}
        drummerSlug={drummer.slug}
        drummerName={drummer.name}
        theme={theme}
        onNavigate={handleCategoryNavigate}
      />
      
      {/* Related Drummers */}
      <RelatedDrummersSection 
        drummers={relatedDrummers}
        category={category}
        theme={theme}
        onNavigate={handleCategoryNavigate}
      />
      
      {/* Back to Profile Link */}
      <Pressable 
        onPress={handleBackToDrummer}
        style={[styles.backToProfileButton, { backgroundColor: theme.primary }]}
        accessibilityRole="link"
      >
        <Text style={styles.backToProfileText}>← View {drummer.name}'s Full Profile</Text>
      </Pressable>
      
      {/* Endorsements */}
      {data.endorsements && data.endorsements.length > 0 && (
        <View style={styles.endorsementsSection}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>🏆 Official Endorsements</Text>
          {data.endorsements.map((endorsement, index) => (
            <View key={index} style={[styles.endorsementCard, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
              <Text style={[styles.endorsementName, { color: theme.text }]}>{endorsement.name}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

// Export utilities for external use
export {
  isDrummerGearCategoryPage,
  getDrummerGearCategoryFromURL,
  VALID_CATEGORIES,
  CATEGORY_META,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 16,
  },
  errorText: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 20,
  },
  backButton: {
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  breadcrumbs: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  breadcrumbText: {
    fontSize: 14,
  },
  breadcrumbSeparator: {
    fontSize: 14,
  },
  header: {
    marginBottom: 20,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 22,
  },
  gearCard: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 20,
  },
  brandBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 12,
  },
  brandBadgeText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  gearRaw: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
  },
  verifiedBadge: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  verifiedText: {
    color: '#4CAF50',
    fontWeight: '600',
    fontSize: 14,
  },
  verifiedDate: {
    fontSize: 12,
    marginTop: 4,
  },
  sources: {
    marginTop: 12,
  },
  sourcesTitle: {
    fontSize: 12,
    marginBottom: 4,
  },
  sourceLink: {
    fontSize: 12,
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
    marginTop: 8,
  },
  gearItemsSection: {
    marginBottom: 20,
  },
  gearItemCard: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 12,
  },
  gearItemName: {
    fontSize: 16,
    fontWeight: '600',
  },
  gearItemBrand: {
    fontSize: 14,
    marginTop: 4,
  },
  gearItemSize: {
    fontSize: 14,
    marginTop: 4,
  },
  faqSection: {
    marginBottom: 20,
  },
  faqItem: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 12,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '600',
  },
  faqAnswer: {
    fontSize: 14,
    marginTop: 12,
    lineHeight: 22,
  },
  relatedSection: {
    marginBottom: 20,
  },
  relatedDrummerCard: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 12,
  },
  relatedDrummerName: {
    fontSize: 16,
    fontWeight: '600',
  },
  relatedDrummerBand: {
    fontSize: 14,
    marginTop: 4,
  },
  relatedDrummerBrand: {
    fontSize: 14,
    marginTop: 8,
    fontStyle: 'italic',
  },
  categoriesNav: {
    marginBottom: 20,
  },
  categoriesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
    marginBottom: 8,
  },
  categoryChipText: {
    fontSize: 14,
    fontWeight: '600',
  },
  videosSection: {
    marginBottom: 20,
  },
  videoCard: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 12,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  videoYear: {
    fontSize: 14,
    marginTop: 4,
  },
  backToProfileButton: {
    alignSelf: 'center',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 8,
    marginVertical: 20,
  },
  backToProfileText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  endorsementsSection: {
    marginBottom: 20,
  },
  endorsementCard: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 8,
  },
  endorsementName: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default DrummerGearCategoryPage;
