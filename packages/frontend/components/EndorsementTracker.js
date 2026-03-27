// Endorsement Tracker Component
// Issue #802: Drummer Endorsement Tracker & News Section
// URL: /drummers/[slug]/endorsements and /endorsement-news

import { StyleSheet, Text, View, ScrollView, TouchableOpacity, useWindowDimensions, Platform, Linking } from 'react-native';
import { useState, useEffect } from 'react';

import {
  ENDORSEMENT_CHANGE_TYPES,
  ENDORSEMENT_CATEGORIES,
  getChangeTypeEmoji,
  getChangeTypeLabel,
  formatEndorsementDate,
  formatRelativeTime,
  getEndorsementTimeline,
  hasEndorsementTimeline,
  getDrummersWithEndorsements,
  getAllEndorsementNews,
  getFeaturedEndorsementNews,
  getRecentEndorsementNews,
  generateEndorsementMeta,
} from '../data/endorsementNews';

// ==========================================
// URL HELPERS
// ==========================================

/**
 * Check if we're on an endorsement page
 */
export function isEndorsementPage() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return false;
  const pathname = window.location.pathname;
  return /^\/drummers\/[a-z0-9-]+\/endorsements\/?$/i.test(pathname);
}

/**
 * Check if we're on the endorsement news hub
 */
export function isEndorsementNewsPage() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return false;
  const pathname = window.location.pathname;
  return pathname === '/endorsement-news' || pathname === '/endorsement-news/';
}

/**
 * Get drummer slug from endorsement URL
 */
export function getEndorsementDrummerSlugFromURL() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return null;
  const match = window.location.pathname.match(/^\/drummers\/([a-z0-9-]+)\/endorsements/i);
  return match ? match[1] : null;
}

/**
 * Update meta tags for endorsement page
 */
export function updateEndorsementMeta(drummer, timeline) {
  if (Platform.OS !== 'web' || typeof document === 'undefined') return;
  
  const meta = generateEndorsementMeta(drummer);
  if (!meta) return;
  
  document.title = meta.title;
  
  const setMeta = (name, content) => {
    let tag = document.querySelector(`meta[name="${name}"]`) || 
              document.querySelector(`meta[property="${name}"]`);
    if (tag) {
      tag.setAttribute('content', content);
    } else {
      tag = document.createElement('meta');
      tag.setAttribute(name.startsWith('og:') ? 'property' : 'name', name);
      tag.setAttribute('content', content);
      document.head.appendChild(tag);
    }
  };
  
  setMeta('description', meta.description);
  setMeta('keywords', meta.keywords);
  setMeta('og:title', meta.title);
  setMeta('og:description', meta.description);
  setMeta('twitter:title', meta.title);
  setMeta('twitter:description', meta.description);
}

/**
 * Update meta tags for endorsement news hub
 */
export function updateEndorsementNewsMeta() {
  if (Platform.OS !== 'web' || typeof document === 'undefined') return;
  
  document.title = 'Endorsement News - Latest Metal Drummer Brand Deals | MetalForge';
  
  const setMeta = (name, content) => {
    let tag = document.querySelector(`meta[name="${name}"]`) || 
              document.querySelector(`meta[property="${name}"]`);
    if (tag) {
      tag.setAttribute('content', content);
    } else {
      tag = document.createElement('meta');
      tag.setAttribute(name.startsWith('og:') ? 'property' : 'name', name);
      tag.setAttribute('content', content);
      document.head.appendChild(tag);
    }
  };
  
  const description = 'Stay updated on the latest metal drummer endorsement deals, brand switches, and signature gear announcements. Track who\'s using what in the metal drumming world.';
  
  setMeta('description', description);
  setMeta('og:title', 'Endorsement News - Latest Metal Drummer Brand Deals | MetalForge');
  setMeta('og:description', description);
  setMeta('twitter:title', 'Endorsement News - Latest Metal Drummer Brand Deals | MetalForge');
  setMeta('twitter:description', description);
}

// ==========================================
// HOMEPAGE WIDGET - Recent Endorsement News
// ==========================================

/**
 * Homepage widget showing recent endorsement changes
 */
export function EndorsementNewsWidget({ theme, onNavigateToNews, onNavigateToDrummer, maxItems = 3 }) {
  const recentNews = getRecentEndorsementNews(90); // Last 90 days
  const featuredNews = recentNews.length > 0 ? recentNews : getFeaturedEndorsementNews();
  const displayNews = featuredNews.slice(0, maxItems);
  
  if (displayNews.length === 0) return null;
  
  return (
    <View style={[widgetStyles.container, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <View style={widgetStyles.header}>
        <Text style={[widgetStyles.title, { color: theme.text }]}>
          📰 Endorsement News
        </Text>
        <TouchableOpacity onPress={onNavigateToNews}>
          <Text style={[widgetStyles.viewAll, { color: theme.primary }]}>
            View All →
          </Text>
        </TouchableOpacity>
      </View>
      
      {displayNews.map((news, index) => (
        <TouchableOpacity
          key={news.id}
          style={[
            widgetStyles.newsItem,
            index < displayNews.length - 1 && { borderBottomWidth: 1, borderBottomColor: theme.border },
          ]}
          onPress={() => onNavigateToDrummer && onNavigateToDrummer(news.drummerSlug)}
        >
          <View style={widgetStyles.newsContent}>
            <Text style={[widgetStyles.newsEmoji]}>
              {getChangeTypeEmoji(news.changeType)}
            </Text>
            <View style={widgetStyles.newsText}>
              <Text style={[widgetStyles.newsHeadline, { color: theme.text }]} numberOfLines={2}>
                {news.headline}
              </Text>
              <Text style={[widgetStyles.newsDate, { color: theme.secondaryText }]}>
                {formatRelativeTime(news.date)} • {news.band}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const widgetStyles = StyleSheet.create({
  container: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  viewAll: {
    fontSize: 14,
    fontWeight: '600',
  },
  newsItem: {
    paddingVertical: 12,
  },
  newsContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  newsEmoji: {
    fontSize: 20,
    marginRight: 12,
  },
  newsText: {
    flex: 1,
  },
  newsHeadline: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  newsDate: {
    fontSize: 12,
  },
});

// ==========================================
// ENDORSEMENT NEWS HUB PAGE
// ==========================================

/**
 * Full endorsement news hub page
 */
export function EndorsementNewsPage({ theme, onBack, onNavigateToDrummer }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const [filter, setFilter] = useState('all'); // all, signed, switched, signature
  
  const allNews = getAllEndorsementNews();
  
  const filteredNews = filter === 'all' 
    ? allNews 
    : allNews.filter(news => news.changeType === filter);
  
  useEffect(() => {
    updateEndorsementNewsMeta();
  }, []);
  
  return (
    <ScrollView style={[pageStyles.container, { backgroundColor: theme.background }]}>
      <View style={[pageStyles.content, isMobile && pageStyles.contentMobile]}>
        {/* Back Button */}
        <TouchableOpacity
          onPress={onBack}
          style={[pageStyles.backButton, { borderColor: theme.border }]}
          accessibilityRole="button"
          accessibilityLabel="Back to home"
        >
          <Text style={[pageStyles.backButtonText, { color: theme.text }]}>← Back</Text>
        </TouchableOpacity>
        
        {/* Header */}
        <View style={pageStyles.header}>
          <Text style={[pageStyles.title, { color: theme.text }]}>
            📰 Endorsement News
          </Text>
          <Text style={[pageStyles.subtitle, { color: theme.secondaryText }]}>
            Track the latest endorsement deals, brand switches, and signature gear in metal drumming
          </Text>
        </View>
        
        {/* Filters */}
        <View style={pageStyles.filters}>
          {[
            { key: 'all', label: 'All News' },
            { key: ENDORSEMENT_CHANGE_TYPES.SIGNED, label: '✍️ New Deals' },
            { key: ENDORSEMENT_CHANGE_TYPES.SWITCHED, label: '🔀 Switches' },
            { key: ENDORSEMENT_CHANGE_TYPES.SIGNATURE, label: '⭐ Signature' },
          ].map(({ key, label }) => (
            <TouchableOpacity
              key={key}
              style={[
                pageStyles.filterButton,
                { 
                  backgroundColor: filter === key ? theme.primary : theme.card,
                  borderColor: theme.border,
                },
              ]}
              onPress={() => setFilter(key)}
            >
              <Text style={[
                pageStyles.filterText,
                { color: filter === key ? '#fff' : theme.text },
              ]}>
                {label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        
        {/* News List */}
        <View style={pageStyles.newsList}>
          {filteredNews.map((news, index) => (
            <TouchableOpacity
              key={news.id}
              style={[pageStyles.newsCard, { backgroundColor: theme.card, borderColor: theme.border }]}
              onPress={() => onNavigateToDrummer && onNavigateToDrummer(news.drummerSlug)}
            >
              <View style={pageStyles.newsCardHeader}>
                <View style={[
                  pageStyles.changeTypeBadge,
                  { backgroundColor: theme.primary + '20' },
                ]}>
                  <Text style={pageStyles.changeTypeEmoji}>
                    {getChangeTypeEmoji(news.changeType)}
                  </Text>
                  <Text style={[pageStyles.changeTypeText, { color: theme.primary }]}>
                    {getChangeTypeLabel(news.changeType)}
                  </Text>
                </View>
                <Text style={[pageStyles.newsDate, { color: theme.secondaryText }]}>
                  {formatEndorsementDate(news.date)}
                </Text>
              </View>
              
              <Text style={[pageStyles.newsTitle, { color: theme.text }]}>
                {news.title}
              </Text>
              
              <Text style={[pageStyles.newsDrummer, { color: theme.primary }]}>
                {news.drummerName} ({news.band})
              </Text>
              
              <Text style={[pageStyles.newsDescription, { color: theme.secondaryText }]}>
                {news.description}
              </Text>
              
              {news.brands && (
                <View style={pageStyles.brandsContainer}>
                  {news.brands.new && (
                    <View style={pageStyles.brandGroup}>
                      <Text style={[pageStyles.brandLabel, { color: theme.text }]}>New:</Text>
                      <View style={pageStyles.brandTags}>
                        {news.brands.new.map(brand => (
                          <View key={brand} style={[pageStyles.brandTag, { backgroundColor: theme.primary + '20' }]}>
                            <Text style={[pageStyles.brandTagText, { color: theme.primary }]}>{brand}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  )}
                  {news.brands.kept && (
                    <View style={pageStyles.brandGroup}>
                      <Text style={[pageStyles.brandLabel, { color: theme.text }]}>Keeping:</Text>
                      <View style={pageStyles.brandTags}>
                        {news.brands.kept.map(brand => (
                          <View key={brand} style={[pageStyles.brandTag, { backgroundColor: theme.border }]}>
                            <Text style={[pageStyles.brandTagText, { color: theme.text }]}>{brand}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  )}
                </View>
              )}
              
              <Text style={[pageStyles.viewProfile, { color: theme.primary }]}>
                View {news.drummerName}'s Profile →
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        
        {filteredNews.length === 0 && (
          <View style={pageStyles.emptyState}>
            <Text style={[pageStyles.emptyText, { color: theme.secondaryText }]}>
              No endorsement news matching this filter.
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

// ==========================================
// DRUMMER ENDORSEMENT TIMELINE PAGE
// ==========================================

/**
 * Individual drummer endorsement timeline page
 */
export function DrummerEndorsementPage({ drummer, theme, onBack, onNavigateToDrummer }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  
  const timeline = getEndorsementTimeline(drummer?.slug);
  
  useEffect(() => {
    if (drummer && timeline) {
      updateEndorsementMeta(drummer, timeline);
    }
  }, [drummer, timeline]);
  
  if (!drummer) {
    return (
      <View style={[pageStyles.container, { backgroundColor: theme.background }]}>
        <Text style={[pageStyles.errorText, { color: theme.text }]}>
          Drummer not found
        </Text>
      </View>
    );
  }
  
  // Get endorsements from drummer data if no timeline
  const currentEndorsements = timeline?.currentEndorsements || 
    (drummer.endorsements ? Object.fromEntries(
      drummer.endorsements.map(e => [e.name.split(' ')[0].toLowerCase(), { brand: e.name, url: e.url }])
    ) : {});
  
  return (
    <ScrollView style={[pageStyles.container, { backgroundColor: theme.background }]}>
      <View style={[pageStyles.content, isMobile && pageStyles.contentMobile]}>
        {/* Back Button */}
        <TouchableOpacity
          onPress={onBack}
          style={[pageStyles.backButton, { borderColor: theme.border }]}
          accessibilityRole="button"
          accessibilityLabel={`Back to ${drummer.name}'s profile`}
        >
          <Text style={[pageStyles.backButtonText, { color: theme.text }]}>← Back to Profile</Text>
        </TouchableOpacity>
        
        {/* Header */}
        <View style={pageStyles.header}>
          <Text style={[pageStyles.title, { color: theme.text }]}>
            {drummer.name}'s Endorsements
          </Text>
          <Text style={[pageStyles.subtitle, { color: theme.secondaryText }]}>
            {drummer.band} • Complete brand history & current deals
          </Text>
        </View>
        
        {/* Current Endorsements Grid */}
        <View style={[timelineStyles.section, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[timelineStyles.sectionTitle, { color: theme.text }]}>
            🎯 Current Endorsements
          </Text>
          
          <View style={[timelineStyles.endorsementGrid, isMobile && timelineStyles.endorsementGridMobile]}>
            {Object.entries(currentEndorsements).map(([category, data]) => (
              <View 
                key={category} 
                style={[
                  timelineStyles.endorsementCard, 
                  { backgroundColor: theme.background, borderColor: theme.border },
                  isMobile && timelineStyles.endorsementCardMobile,
                ]}
              >
                <Text style={[timelineStyles.categoryLabel, { color: theme.secondaryText }]}>
                  {getCategoryEmoji(category)} {capitalizeFirst(category)}
                </Text>
                <Text style={[timelineStyles.brandName, { color: theme.text }]}>
                  {data.brand}
                </Text>
                {data.model && (
                  <Text style={[timelineStyles.modelName, { color: theme.secondaryText }]}>
                    {data.model}
                  </Text>
                )}
                {data.since && (
                  <Text style={[timelineStyles.since, { color: theme.primary }]}>
                    Since {data.since}
                  </Text>
                )}
                {data.signature && (
                  <View style={[timelineStyles.signatureBadge, { backgroundColor: theme.primary + '20' }]}>
                    <Text style={[timelineStyles.signatureText, { color: theme.primary }]}>
                      ⭐ Signature
                    </Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>
        
        {/* Endorsement Timeline */}
        {timeline?.timeline && timeline.timeline.length > 0 && (
          <View style={[timelineStyles.section, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={[timelineStyles.sectionTitle, { color: theme.text }]}>
              📅 Endorsement Timeline
            </Text>
            
            <View style={timelineStyles.timeline}>
              {timeline.timeline
                .sort((a, b) => b.year - a.year)
                .map((event, index) => (
                  <View 
                    key={`${event.year}-${event.category}-${index}`}
                    style={[
                      timelineStyles.timelineItem,
                      index < timeline.timeline.length - 1 && { borderBottomWidth: 1, borderBottomColor: theme.border },
                    ]}
                  >
                    <View style={timelineStyles.timelineYear}>
                      <Text style={[timelineStyles.yearText, { color: theme.primary }]}>
                        {event.year}
                      </Text>
                    </View>
                    
                    <View style={timelineStyles.timelineContent}>
                      <View style={timelineStyles.timelineHeader}>
                        <Text style={timelineStyles.changeEmoji}>
                          {getChangeTypeEmoji(event.changeType)}
                        </Text>
                        <View style={[timelineStyles.changeBadge, { backgroundColor: theme.primary + '20' }]}>
                          <Text style={[timelineStyles.changeBadgeText, { color: theme.primary }]}>
                            {getChangeTypeLabel(event.changeType)}
                          </Text>
                        </View>
                        <Text style={[timelineStyles.categoryText, { color: theme.secondaryText }]}>
                          {getCategoryEmoji(event.category)} {capitalizeFirst(event.category)}
                        </Text>
                      </View>
                      
                      {event.from && event.to && (
                        <View style={timelineStyles.switchInfo}>
                          <Text style={[timelineStyles.fromBrand, { color: theme.secondaryText }]}>
                            {event.from}
                          </Text>
                          <Text style={[timelineStyles.arrow, { color: theme.primary }]}>
                            →
                          </Text>
                          <Text style={[timelineStyles.toBrand, { color: theme.text }]}>
                            {event.to}
                          </Text>
                        </View>
                      )}
                      
                      {event.brand && event.product && (
                        <Text style={[timelineStyles.productName, { color: theme.text }]}>
                          {event.brand} {event.product}
                        </Text>
                      )}
                      
                      {event.notes && (
                        <Text style={[timelineStyles.notes, { color: theme.secondaryText }]}>
                          {event.notes}
                        </Text>
                      )}
                    </View>
                  </View>
                ))}
            </View>
          </View>
        )}
        
        {/* Related Endorsement News */}
        <View style={[timelineStyles.section, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[timelineStyles.sectionTitle, { color: theme.text }]}>
            📰 Related News
          </Text>
          
          {getAllEndorsementNews()
            .filter(news => news.drummerSlug === drummer.slug)
            .slice(0, 3)
            .map(news => (
              <View 
                key={news.id}
                style={[timelineStyles.relatedNews, { borderBottomColor: theme.border }]}
              >
                <Text style={[timelineStyles.newsTitle, { color: theme.text }]}>
                  {getChangeTypeEmoji(news.changeType)} {news.title}
                </Text>
                <Text style={[timelineStyles.newsDate, { color: theme.secondaryText }]}>
                  {formatEndorsementDate(news.date)}
                </Text>
              </View>
            ))}
          
          {getAllEndorsementNews().filter(news => news.drummerSlug === drummer.slug).length === 0 && (
            <Text style={[timelineStyles.noNews, { color: theme.secondaryText }]}>
              No recent endorsement news for this drummer.
            </Text>
          )}
        </View>
        
        {/* Other Drummers with Same Brands */}
        <View style={[timelineStyles.section, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[timelineStyles.sectionTitle, { color: theme.text }]}>
            🥁 Similar Endorsements
          </Text>
          <Text style={[timelineStyles.sectionSubtitle, { color: theme.secondaryText }]}>
            Other drummers with similar gear sponsorships
          </Text>
          
          <View style={timelineStyles.relatedDrummers}>
            {getDrummersWithEndorsements()
              .filter(slug => slug !== drummer.slug)
              .filter(slug => {
                const otherTimeline = getEndorsementTimeline(slug);
                if (!otherTimeline?.currentEndorsements || !currentEndorsements) return false;
                
                // Check for shared brands
                const otherBrands = Object.values(otherTimeline.currentEndorsements).map(e => e.brand);
                const currentBrands = Object.values(currentEndorsements).map(e => e?.brand || e);
                return otherBrands.some(b => currentBrands.includes(b));
              })
              .slice(0, 4)
              .map(slug => {
                const otherTimeline = getEndorsementTimeline(slug);
                return (
                  <TouchableOpacity
                    key={slug}
                    style={[timelineStyles.relatedDrummer, { backgroundColor: theme.background, borderColor: theme.border }]}
                    onPress={() => onNavigateToDrummer && onNavigateToDrummer(slug)}
                  >
                    <Text style={[timelineStyles.relatedName, { color: theme.text }]}>
                      {otherTimeline.name}
                    </Text>
                    <Text style={[timelineStyles.relatedBand, { color: theme.secondaryText }]}>
                      {otherTimeline.band}
                    </Text>
                  </TouchableOpacity>
                );
              })}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

// ==========================================
// HELPER FUNCTIONS
// ==========================================

function getCategoryEmoji(category) {
  switch (category?.toLowerCase()) {
    case 'drums':
      return '🥁';
    case 'cymbals':
      return '🔔';
    case 'sticks':
      return '🥢';
    case 'heads':
      return '⚪';
    case 'hardware':
      return '⚙️';
    case 'electronics':
      return '🎛️';
    default:
      return '📦';
  }
}

function capitalizeFirst(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ==========================================
// STYLES
// ==========================================

const pageStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 24,
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
  },
  contentMobile: {
    padding: 16,
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 16,
  },
  backButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
  },
  filters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
  },
  newsList: {
    gap: 16,
  },
  newsCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 20,
  },
  newsCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  changeTypeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 16,
    gap: 6,
  },
  changeTypeEmoji: {
    fontSize: 14,
  },
  changeTypeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  newsDate: {
    fontSize: 12,
  },
  newsTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  newsDrummer: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  newsDescription: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 12,
  },
  brandsContainer: {
    gap: 8,
    marginBottom: 16,
  },
  brandGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  brandLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  brandTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  brandTag: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  brandTagText: {
    fontSize: 12,
    fontWeight: '500',
  },
  viewProfile: {
    fontSize: 14,
    fontWeight: '600',
  },
  emptyState: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    padding: 40,
  },
});

const timelineStyles = StyleSheet.create({
  section: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    marginBottom: 16,
  },
  endorsementGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  endorsementGridMobile: {
    flexDirection: 'column',
  },
  endorsementCard: {
    flex: 1,
    minWidth: 150,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  endorsementCardMobile: {
    minWidth: '100%',
  },
  categoryLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  brandName: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  modelName: {
    fontSize: 14,
    marginBottom: 4,
  },
  since: {
    fontSize: 12,
    fontWeight: '600',
  },
  signatureBadge: {
    marginTop: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  signatureText: {
    fontSize: 12,
    fontWeight: '600',
  },
  timeline: {
    marginTop: 16,
  },
  timelineItem: {
    flexDirection: 'row',
    paddingVertical: 16,
  },
  timelineYear: {
    width: 60,
  },
  yearText: {
    fontSize: 16,
    fontWeight: '700',
  },
  timelineContent: {
    flex: 1,
    paddingLeft: 16,
  },
  timelineHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  changeEmoji: {
    fontSize: 16,
  },
  changeBadge: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  changeBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  categoryText: {
    fontSize: 12,
  },
  switchInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  fromBrand: {
    fontSize: 14,
    textDecorationLine: 'line-through',
  },
  arrow: {
    fontSize: 16,
    fontWeight: '700',
  },
  toBrand: {
    fontSize: 14,
    fontWeight: '600',
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  notes: {
    fontSize: 13,
    lineHeight: 20,
  },
  relatedNews: {
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  newsTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  newsDate: {
    fontSize: 12,
  },
  noNews: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  relatedDrummers: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  relatedDrummer: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    minWidth: 150,
  },
  relatedName: {
    fontSize: 14,
    fontWeight: '600',
  },
  relatedBand: {
    fontSize: 12,
  },
});

export default {
  EndorsementNewsWidget,
  EndorsementNewsPage,
  DrummerEndorsementPage,
  isEndorsementPage,
  isEndorsementNewsPage,
  getEndorsementDrummerSlugFromURL,
  updateEndorsementMeta,
  updateEndorsementNewsMeta,
};
