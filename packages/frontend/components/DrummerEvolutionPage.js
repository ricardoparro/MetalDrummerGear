/**
 * Drummer Gear Evolution Timeline Page Component
 * Issue #767: Visual History of Setup Changes
 * URL: /drummers/[slug]/evolution
 * 
 * Shows how legendary drummers' gear evolved over their careers.
 * Initial launch: Lars Ulrich, Joey Jordison, Dave Lombardo
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  useWindowDimensions,
  Linking,
} from 'react-native';
import { 
  getDrummerEvolution, 
  hasEvolutionData, 
  getEvolutionDrummerSlugs,
  getChangeTypeInfo,
  updateEvolutionMeta,
  generateEvolutionSchema,
  getEvolutionShareUrl,
} from '../data/drummerEvolution';
import { colors } from '../colors';
import { spacing, fontSize, fontWeight, lineHeight } from '../spacing';

// ==========================================
// Styles
// ==========================================
const styles = {
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: spacing[4],
    paddingBottom: spacing[10],
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[2],
    marginBottom: spacing[2],
  },
  backButtonText: {
    fontSize: fontSize.base,
    marginLeft: spacing[2],
  },
  header: {
    marginBottom: spacing[6],
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing[4],
  },
  headerTopMobile: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  drummerImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginRight: spacing[5],
  },
  drummerImageMobile: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 0,
    marginBottom: spacing[4],
  },
  headerInfo: {
    flex: 1,
  },
  headerInfoMobile: {
    alignItems: 'center',
    textAlign: 'center',
  },
  drummerName: {
    fontSize: fontSize['3xl'],
    fontWeight: fontWeight.bold,
    marginBottom: spacing[1],
  },
  drummerNameMobile: {
    fontSize: fontSize['2xl'],
  },
  bandName: {
    fontSize: fontSize.xl,
    marginBottom: spacing[2],
  },
  yearsActive: {
    fontSize: fontSize.base,
    marginBottom: spacing[3],
  },
  summary: {
    fontSize: fontSize.base,
    lineHeight: lineHeight.lg,
  },
  summaryMobile: {
    textAlign: 'center',
  },
  timelineNav: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[2],
    marginBottom: spacing[6],
    paddingVertical: spacing[3],
  },
  eraButton: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
    borderRadius: spacing[2],
    borderWidth: 1,
  },
  eraButtonActive: {
    borderWidth: 2,
  },
  eraButtonText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },
  eraButtonYears: {
    fontSize: fontSize.xs,
  },
  eraSection: {
    marginBottom: spacing[8],
    padding: spacing[5],
    borderRadius: spacing[3],
    borderWidth: 1,
  },
  eraHeader: {
    marginBottom: spacing[5],
    paddingBottom: spacing[4],
    borderBottomWidth: 1,
  },
  eraTitle: {
    fontSize: fontSize['2xl'],
    fontWeight: fontWeight.bold,
    marginBottom: spacing[2],
  },
  eraTitleMobile: {
    fontSize: fontSize.xl,
  },
  eraYears: {
    fontSize: fontSize.lg,
    marginBottom: spacing[3],
  },
  eraDescription: {
    fontSize: fontSize.base,
    lineHeight: lineHeight.lg,
  },
  eraMetaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[4],
    marginTop: spacing[4],
  },
  eraMetaItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
    minWidth: 200,
  },
  eraMetaIcon: {
    fontSize: fontSize.lg,
    marginRight: spacing[2],
  },
  eraMetaLabel: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    marginBottom: spacing[1],
  },
  eraMetaText: {
    fontSize: fontSize.sm,
    lineHeight: lineHeight.md,
  },
  gearSetup: {
    marginTop: spacing[5],
  },
  gearSetupTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    marginBottom: spacing[4],
  },
  gearGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[3],
  },
  gearCard: {
    padding: spacing[4],
    borderRadius: spacing[2],
    borderWidth: 1,
    minWidth: 280,
    flex: 1,
    maxWidth: '100%',
  },
  gearCardMobile: {
    minWidth: '100%',
    maxWidth: '100%',
  },
  gearCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing[2],
  },
  gearCategory: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  changeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1],
    borderRadius: spacing[1],
  },
  changeBadgeText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
    marginLeft: spacing[1],
    color: '#fff',
  },
  gearItem: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
    marginBottom: spacing[1],
  },
  gearDetails: {
    fontSize: fontSize.sm,
    marginBottom: spacing[1],
  },
  gearNotes: {
    fontSize: fontSize.sm,
    fontStyle: 'italic',
    marginTop: spacing[2],
  },
  costSection: {
    marginTop: spacing[5],
    padding: spacing[4],
    borderRadius: spacing[2],
    borderWidth: 1,
  },
  costHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing[2],
  },
  costTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    marginLeft: spacing[2],
  },
  costRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing[2],
  },
  costLabel: {
    fontSize: fontSize.base,
  },
  costValue: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.bold,
  },
  keyChangesSection: {
    marginTop: spacing[5],
    padding: spacing[4],
    borderRadius: spacing[2],
    borderWidth: 1,
  },
  keyChangesTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    marginBottom: spacing[3],
  },
  keyChangeItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing[2],
  },
  keyChangeBullet: {
    fontSize: fontSize.base,
    marginRight: spacing[2],
  },
  keyChangeText: {
    flex: 1,
    fontSize: fontSize.base,
    lineHeight: lineHeight.md,
  },
  quoteSection: {
    marginTop: spacing[5],
    padding: spacing[5],
    borderRadius: spacing[2],
    borderLeftWidth: 4,
  },
  quoteText: {
    fontSize: fontSize.lg,
    fontStyle: 'italic',
    lineHeight: lineHeight.lg,
    marginBottom: spacing[2],
  },
  quoteSource: {
    fontSize: fontSize.sm,
    textAlign: 'right',
  },
  videoSection: {
    marginTop: spacing[5],
  },
  videoTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    marginBottom: spacing[3],
  },
  videoList: {
    gap: spacing[2],
  },
  videoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing[3],
    borderRadius: spacing[2],
    borderWidth: 1,
  },
  videoIcon: {
    fontSize: fontSize.xl,
    marginRight: spacing[3],
  },
  videoName: {
    flex: 1,
    fontSize: fontSize.base,
  },
  thenVsNowSection: {
    marginTop: spacing[6],
    padding: spacing[5],
    borderRadius: spacing[3],
    borderWidth: 1,
  },
  thenVsNowHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing[4],
  },
  thenVsNowTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
  },
  thenVsNowToggle: {
    flexDirection: 'row',
    borderRadius: spacing[2],
    overflow: 'hidden',
  },
  toggleButton: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
  },
  toggleButtonText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },
  comparisonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[4],
  },
  comparisonColumn: {
    flex: 1,
    minWidth: 280,
    padding: spacing[4],
    borderRadius: spacing[2],
    borderWidth: 1,
  },
  comparisonColumnTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    marginBottom: spacing[3],
    textAlign: 'center',
  },
  shareSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[2],
    marginTop: spacing[6],
    justifyContent: 'center',
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
    borderRadius: spacing[2],
    borderWidth: 1,
  },
  shareButtonText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    marginLeft: spacing[2],
  },
  otherTimelinesSection: {
    marginTop: spacing[8],
    padding: spacing[5],
    borderRadius: spacing[3],
    borderWidth: 1,
  },
  otherTimelinesTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    marginBottom: spacing[4],
  },
  otherTimelinesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[3],
  },
  otherTimelineCard: {
    padding: spacing[4],
    borderRadius: spacing[2],
    borderWidth: 1,
    minWidth: 200,
    flex: 1,
    maxWidth: 300,
  },
  otherTimelineImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: spacing[2],
    alignSelf: 'center',
  },
  otherTimelineName: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
    textAlign: 'center',
    marginBottom: spacing[1],
  },
  otherTimelineBand: {
    fontSize: fontSize.sm,
    textAlign: 'center',
  },
  noDataContainer: {
    padding: spacing[8],
    alignItems: 'center',
  },
  noDataIcon: {
    fontSize: 64,
    marginBottom: spacing[4],
  },
  noDataTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    marginBottom: spacing[2],
    textAlign: 'center',
  },
  noDataText: {
    fontSize: fontSize.base,
    textAlign: 'center',
    marginBottom: spacing[4],
  },
};

// ==========================================
// Helper Components
// ==========================================

function GearCard({ category, gear, theme, isMobile }) {
  const changeInfo = gear.change ? getChangeTypeInfo(gear.change) : null;
  
  const categoryLabels = {
    drums: '🥁 Drums',
    snare: '🔊 Snare',
    cymbals: '🎵 Cymbals',
    hardware: '⚙️ Hardware',
    sticks: '🥢 Sticks',
    heads: '⭕ Heads',
    electronics: '🔌 Electronics',
  };

  return (
    <View style={[
      styles.gearCard, 
      { backgroundColor: theme.card, borderColor: theme.border },
      isMobile && styles.gearCardMobile
    ]}>
      <View style={styles.gearCardHeader}>
        <Text style={[styles.gearCategory, { color: theme.primary }]}>
          {categoryLabels[category] || category}
        </Text>
        {changeInfo && (
          <View style={[styles.changeBadge, { backgroundColor: changeInfo.color }]}>
            <Text>{changeInfo.emoji}</Text>
            <Text style={styles.changeBadgeText}>{changeInfo.label}</Text>
          </View>
        )}
      </View>
      <Text style={[styles.gearItem, { color: theme.text }]}>{gear.item}</Text>
      {gear.details && (
        <Text style={[styles.gearDetails, { color: theme.secondaryText }]}>{gear.details}</Text>
      )}
      {gear.notes && (
        <Text style={[styles.gearNotes, { color: theme.secondaryText }]}>{gear.notes}</Text>
      )}
    </View>
  );
}

function EraSection({ era, theme, isMobile, isActive }) {
  if (!isActive) return null;

  const gearCategories = Object.entries(era.gear || {});

  return (
    <View style={[styles.eraSection, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <View style={[styles.eraHeader, { borderBottomColor: theme.border }]}>
        <Text style={[styles.eraTitle, { color: theme.text }, isMobile && styles.eraTitleMobile]}>
          {era.era}
        </Text>
        <Text style={[styles.eraYears, { color: theme.primary }]}>
          📅 {era.years}
        </Text>
        <Text style={[styles.eraDescription, { color: theme.secondaryText }]}>
          {era.description}
        </Text>
        
        <View style={styles.eraMetaRow}>
          {era.albums && era.albums.length > 0 && (
            <View style={styles.eraMetaItem}>
              <Text style={styles.eraMetaIcon}>💿</Text>
              <View>
                <Text style={[styles.eraMetaLabel, { color: theme.text }]}>Albums</Text>
                <Text style={[styles.eraMetaText, { color: theme.secondaryText }]}>
                  {era.albums.join(', ')}
                </Text>
              </View>
            </View>
          )}
          {era.tours && era.tours.length > 0 && (
            <View style={styles.eraMetaItem}>
              <Text style={styles.eraMetaIcon}>🎤</Text>
              <View>
                <Text style={[styles.eraMetaLabel, { color: theme.text }]}>Tours</Text>
                <Text style={[styles.eraMetaText, { color: theme.secondaryText }]}>
                  {era.tours.join(', ')}
                </Text>
              </View>
            </View>
          )}
        </View>
      </View>

      <View style={styles.gearSetup}>
        <Text style={[styles.gearSetupTitle, { color: theme.text }]}>
          ⚡ Gear Setup
        </Text>
        <View style={styles.gearGrid}>
          {gearCategories.map(([category, gear]) => (
            <GearCard 
              key={category}
              category={category}
              gear={gear}
              theme={theme}
              isMobile={isMobile}
            />
          ))}
        </View>
      </View>

      {era.estimatedCost && (
        <View style={[styles.costSection, { backgroundColor: theme.background, borderColor: theme.border }]}>
          <View style={styles.costHeader}>
            <Text>💰</Text>
            <Text style={[styles.costTitle, { color: theme.text }]}>Estimated Setup Cost</Text>
          </View>
          <View style={styles.costRow}>
            <Text style={[styles.costLabel, { color: theme.secondaryText }]}>Original Price ({era.startYear})</Text>
            <Text style={[styles.costValue, { color: theme.text }]}>
              ${era.estimatedCost.original.toLocaleString()}
            </Text>
          </View>
          <View style={styles.costRow}>
            <Text style={[styles.costLabel, { color: theme.secondaryText }]}>Today's Value (Inflation-Adjusted)</Text>
            <Text style={[styles.costValue, { color: theme.primary }]}>
              ~${era.estimatedCost.inflationAdjusted.toLocaleString()}
            </Text>
          </View>
        </View>
      )}

      {era.keyChanges && era.keyChanges.length > 0 && (
        <View style={[styles.keyChangesSection, { backgroundColor: theme.background, borderColor: theme.border }]}>
          <Text style={[styles.keyChangesTitle, { color: theme.text }]}>
            🔄 Key Changes This Era
          </Text>
          {era.keyChanges.map((change, index) => (
            <View key={index} style={styles.keyChangeItem}>
              <Text style={[styles.keyChangeBullet, { color: theme.primary }]}>•</Text>
              <Text style={[styles.keyChangeText, { color: theme.secondaryText }]}>{change}</Text>
            </View>
          ))}
        </View>
      )}

      {era.quote && (
        <View style={[styles.quoteSection, { backgroundColor: theme.background, borderLeftColor: theme.primary }]}>
          <Text style={[styles.quoteText, { color: theme.text }]}>
            "{era.quote.text}"
          </Text>
          <Text style={[styles.quoteSource, { color: theme.secondaryText }]}>
            — {era.quote.source}
          </Text>
        </View>
      )}

      {era.videos && era.videos.length > 0 && (
        <View style={styles.videoSection}>
          <Text style={[styles.videoTitle, { color: theme.text }]}>
            🎬 Watch This Era
          </Text>
          <View style={styles.videoList}>
            {era.videos.map((video, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.videoItem, { backgroundColor: theme.background, borderColor: theme.border }]}
                onPress={() => {
                  if (Platform.OS === 'web') {
                    window.open(video.url, '_blank');
                  } else {
                    Linking.openURL(video.url);
                  }
                }}
              >
                <Text style={styles.videoIcon}>▶️</Text>
                <Text style={[styles.videoName, { color: theme.text }]}>{video.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

// ==========================================
// Main Component
// ==========================================

export function DrummerEvolutionPage({ 
  theme, 
  drummerSlug, 
  drummers = [],
  onBack, 
  onSelectDrummer,
  onNavigateToEvolution 
}) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  
  const [activeEraIndex, setActiveEraIndex] = useState(0);
  const [showThenVsNow, setShowThenVsNow] = useState(false);
  
  const drummerData = useMemo(() => {
    return getDrummerEvolution(drummerSlug);
  }, [drummerSlug]);
  
  const otherDrummers = useMemo(() => {
    const slugs = getEvolutionDrummerSlugs();
    return slugs
      .filter(slug => slug !== drummerSlug)
      .map(slug => getDrummerEvolution(slug))
      .filter(Boolean);
  }, [drummerSlug]);
  
  useEffect(() => {
    if (drummerData) {
      updateEvolutionMeta(drummerData);
      
      if (Platform.OS === 'web' && typeof document !== 'undefined') {
        const schema = generateEvolutionSchema(drummerData);
        if (schema) {
          let scriptTag = document.getElementById('evolution-schema');
          if (!scriptTag) {
            scriptTag = document.createElement('script');
            scriptTag.id = 'evolution-schema';
            scriptTag.type = 'application/ld+json';
            document.head.appendChild(scriptTag);
          }
          scriptTag.textContent = JSON.stringify(schema);
        }
      }
      
      if (Platform.OS === 'web' && typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'page_view', {
          page_title: drummerData.metaTitle,
          page_location: window.location.href,
          page_path: `/drummers/${drummerSlug}/evolution`,
          drummer_slug: drummerSlug,
        });
      }
    }
    
    return () => {
      if (Platform.OS === 'web' && typeof document !== 'undefined') {
        const scriptTag = document.getElementById('evolution-schema');
        if (scriptTag) {
          scriptTag.remove();
        }
      }
    };
  }, [drummerData, drummerSlug]);
  
  const handleShare = useCallback((platform) => {
    const url = getEvolutionShareUrl(drummerSlug);
    const text = drummerData ? `Check out how ${drummerData.name}'s drum setup evolved over ${drummerData.totalYearsActive}!` : '';
    
    let shareUrl = '';
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'copy':
        if (Platform.OS === 'web' && navigator.clipboard) {
          navigator.clipboard.writeText(url);
        }
        return;
      default:
        return;
    }
    
    if (Platform.OS === 'web') {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    } else {
      Linking.openURL(shareUrl);
    }
    
    if (Platform.OS === 'web' && typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'share', {
        method: platform,
        content_type: 'evolution_timeline',
        item_id: drummerSlug,
      });
    }
  }, [drummerSlug, drummerData]);
  
  if (!drummerData) {
    return (
      <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.contentContainer}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Text style={{ color: theme.primary }}>←</Text>
            <Text style={[styles.backButtonText, { color: theme.primary }]}>Back</Text>
          </TouchableOpacity>
          
          <View style={styles.noDataContainer}>
            <Text style={styles.noDataIcon}>📅</Text>
            <Text style={[styles.noDataTitle, { color: theme.text }]}>
              Evolution Data Not Available
            </Text>
            <Text style={[styles.noDataText, { color: theme.secondaryText }]}>
              We don't have evolution timeline data for this drummer yet. 
              Check out one of our featured timelines below!
            </Text>
            
            <View style={styles.otherTimelinesList}>
              {otherDrummers.map(drummer => (
                <TouchableOpacity
                  key={drummer.slug}
                  style={[styles.otherTimelineCard, { backgroundColor: theme.card, borderColor: theme.border }]}
                  onPress={() => onNavigateToEvolution && onNavigateToEvolution(drummer.slug)}
                >
                  {drummer.profileImage && (
                    <Image 
                      source={{ uri: drummer.profileImage }}
                      style={styles.otherTimelineImage}
                    />
                  )}
                  <Text style={[styles.otherTimelineName, { color: theme.text }]}>
                    {drummer.name}
                  </Text>
                  <Text style={[styles.otherTimelineBand, { color: theme.secondaryText }]}>
                    {drummer.band}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
  
  const activeEra = drummerData.eras[activeEraIndex];
  const firstEra = drummerData.eras[0];
  const lastEra = drummerData.eras[drummerData.eras.length - 1];

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={{ color: theme.primary, fontSize: 20 }}>←</Text>
        <Text style={[styles.backButtonText, { color: theme.primary }]}>Back</Text>
      </TouchableOpacity>
      
      <View style={styles.header}>
        <View style={[styles.headerTop, isMobile && styles.headerTopMobile]}>
          {drummerData.profileImage && (
            <Image
              source={{ uri: drummerData.profileImage }}
              style={[styles.drummerImage, isMobile && styles.drummerImageMobile]}
            />
          )}
          <View style={[styles.headerInfo, isMobile && styles.headerInfoMobile]}>
            <Text style={[styles.drummerName, { color: theme.text }, isMobile && styles.drummerNameMobile]}>
              {drummerData.name}
            </Text>
            <Text style={[styles.bandName, { color: theme.primary }]}>
              {drummerData.band}
            </Text>
            <Text style={[styles.yearsActive, { color: theme.secondaryText }]}>
              🎸 Active: {drummerData.totalYearsActive}
            </Text>
            <Text style={[styles.summary, { color: theme.secondaryText }, isMobile && styles.summaryMobile]}>
              {drummerData.summary}
            </Text>
          </View>
        </View>
      </View>
      
      <Text style={[styles.gearSetupTitle, { color: theme.text, marginBottom: spacing[3] }]}>
        📅 Timeline
      </Text>
      <View style={styles.timelineNav}>
        {drummerData.eras.map((era, index) => (
          <TouchableOpacity
            key={era.id}
            style={[
              styles.eraButton,
              { 
                backgroundColor: activeEraIndex === index ? theme.primary : theme.card,
                borderColor: activeEraIndex === index ? theme.primary : theme.border,
              },
              activeEraIndex === index && styles.eraButtonActive
            ]}
            onPress={() => {
              setActiveEraIndex(index);
              if (Platform.OS === 'web' && typeof window !== 'undefined' && window.gtag) {
                window.gtag('event', 'evolution_era_select', {
                  drummer_slug: drummerSlug,
                  era_id: era.id,
                  era_name: era.era,
                });
              }
            }}
          >
            <Text style={[
              styles.eraButtonText, 
              { color: activeEraIndex === index ? '#fff' : theme.text }
            ]}>
              {era.era}
            </Text>
            <Text style={[
              styles.eraButtonYears, 
              { color: activeEraIndex === index ? 'rgba(255,255,255,0.8)' : theme.secondaryText }
            ]}>
              {era.years}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <EraSection 
        era={activeEra} 
        theme={theme} 
        isMobile={isMobile}
        isActive={true}
      />
      
      {drummerData.eras.length > 1 && (
        <View style={[styles.thenVsNowSection, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <View style={styles.thenVsNowHeader}>
            <Text style={[styles.thenVsNowTitle, { color: theme.text }]}>
              ⚡ Then vs Now
            </Text>
            <TouchableOpacity
              onPress={() => setShowThenVsNow(!showThenVsNow)}
              style={[styles.thenVsNowToggle, { backgroundColor: theme.background }]}
            >
              <View style={[
                styles.toggleButton, 
                { backgroundColor: showThenVsNow ? theme.primary : 'transparent' }
              ]}>
                <Text style={[
                  styles.toggleButtonText, 
                  { color: showThenVsNow ? '#fff' : theme.text }
                ]}>
                  {showThenVsNow ? 'Comparing' : 'Compare'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          
          {showThenVsNow && (
            <View style={styles.comparisonGrid}>
              <View style={[styles.comparisonColumn, { backgroundColor: theme.background, borderColor: theme.border }]}>
                <Text style={[styles.comparisonColumnTitle, { color: theme.text }]}>
                  🕰️ {firstEra.era} ({firstEra.years})
                </Text>
                {Object.entries(firstEra.gear || {}).map(([category, gear]) => (
                  <View key={category} style={{ marginBottom: spacing[2] }}>
                    <Text style={[styles.gearCategory, { color: theme.primary }]}>
                      {category.toUpperCase()}
                    </Text>
                    <Text style={[styles.gearItem, { color: theme.text }]}>{gear.item}</Text>
                  </View>
                ))}
                <View style={{ marginTop: spacing[3], paddingTop: spacing[3], borderTopWidth: 1, borderTopColor: theme.border }}>
                  <Text style={[styles.costLabel, { color: theme.secondaryText }]}>Setup Cost</Text>
                  <Text style={[styles.costValue, { color: theme.text }]}>
                    ~${firstEra.estimatedCost?.inflationAdjusted?.toLocaleString() || 'N/A'}
                  </Text>
                </View>
              </View>
              
              <View style={[styles.comparisonColumn, { backgroundColor: theme.background, borderColor: theme.border }]}>
                <Text style={[styles.comparisonColumnTitle, { color: theme.text }]}>
                  🔥 {lastEra.era} ({lastEra.years})
                </Text>
                {Object.entries(lastEra.gear || {}).map(([category, gear]) => (
                  <View key={category} style={{ marginBottom: spacing[2] }}>
                    <Text style={[styles.gearCategory, { color: theme.primary }]}>
                      {category.toUpperCase()}
                    </Text>
                    <Text style={[styles.gearItem, { color: theme.text }]}>{gear.item}</Text>
                  </View>
                ))}
                <View style={{ marginTop: spacing[3], paddingTop: spacing[3], borderTopWidth: 1, borderTopColor: theme.border }}>
                  <Text style={[styles.costLabel, { color: theme.secondaryText }]}>Setup Cost</Text>
                  <Text style={[styles.costValue, { color: theme.primary }]}>
                    ~${lastEra.estimatedCost?.inflationAdjusted?.toLocaleString() || 'N/A'}
                  </Text>
                </View>
              </View>
            </View>
          )}
        </View>
      )}
      
      <View style={styles.shareSection}>
        <TouchableOpacity
          style={[styles.shareButton, { borderColor: '#1DA1F2', backgroundColor: 'rgba(29, 161, 242, 0.1)' }]}
          onPress={() => handleShare('twitter')}
        >
          <Text>🐦</Text>
          <Text style={[styles.shareButtonText, { color: '#1DA1F2' }]}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.shareButton, { borderColor: '#4267B2', backgroundColor: 'rgba(66, 103, 178, 0.1)' }]}
          onPress={() => handleShare('facebook')}
        >
          <Text>📘</Text>
          <Text style={[styles.shareButtonText, { color: '#4267B2' }]}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.shareButton, { borderColor: theme.border }]}
          onPress={() => handleShare('copy')}
        >
          <Text>🔗</Text>
          <Text style={[styles.shareButtonText, { color: theme.text }]}>Copy Link</Text>
        </TouchableOpacity>
      </View>
      
      {otherDrummers.length > 0 && (
        <View style={[styles.otherTimelinesSection, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.otherTimelinesTitle, { color: theme.text }]}>
            🥁 More Gear Evolutions
          </Text>
          <View style={styles.otherTimelinesList}>
            {otherDrummers.map(drummer => (
              <TouchableOpacity
                key={drummer.slug}
                style={[styles.otherTimelineCard, { backgroundColor: theme.background, borderColor: theme.border }]}
                onPress={() => onNavigateToEvolution && onNavigateToEvolution(drummer.slug)}
              >
                {drummer.profileImage && (
                  <Image 
                    source={{ uri: drummer.profileImage }}
                    style={styles.otherTimelineImage}
                  />
                )}
                <Text style={[styles.otherTimelineName, { color: theme.text }]}>
                  {drummer.name}
                </Text>
                <Text style={[styles.otherTimelineBand, { color: theme.secondaryText }]}>
                  {drummer.band}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
}

export default DrummerEvolutionPage;
