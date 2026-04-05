/**
 * Gear Price History Page Component
 * Issue #813: Inflation-Adjusted Setup Costs Over Time
 * URL: /drummers/[slug]/gear-history
 * 
 * Shows how legendary drummers' gear costs evolved with inflation.
 * Includes visual line chart, price breakdown, vintage vs modern comparison.
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
  getGearPriceHistory, 
  hasPriceHistoryData, 
  getPriceHistoryDrummerSlugs,
  formatHistoryPrice,
  calculateInflationAdjustedPrice,
  getInflationMultiplier,
  updateGearHistoryMeta,
  getGearHistoryShareUrl,
  CURRENT_YEAR,
  CPI_DATA,
} from '../data/gearPriceHistory';
import { colors } from '../colors';
import { spacing } from '../spacing';

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
    fontSize: 16,
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
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: spacing[1],
  },
  drummerNameMobile: {
    fontSize: 26,
  },
  bandName: {
    fontSize: 20,
    marginBottom: spacing[2],
  },
  eraLabel: {
    fontSize: 16,
    marginBottom: spacing[2],
    fontStyle: 'italic',
  },
  summary: {
    fontSize: 16,
    lineHeight: 24,
  },
  summaryMobile: {
    textAlign: 'center',
  },
  
  // Price Summary Cards
  priceCardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[4],
    marginBottom: spacing[8],
    marginTop: spacing[4],
  },
  priceCard: {
    flex: 1,
    minWidth: 200,
    padding: spacing[4],
    borderRadius: spacing[3],
    borderWidth: 1,
  },
  priceCardTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: spacing[2],
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  priceCardValue: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: spacing[1],
  },
  priceCardSubtitle: {
    fontSize: 14,
  },
  priceCardHighlight: {
    borderWidth: 2,
  },
  inflationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing[2],
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1],
    borderRadius: spacing[1],
    alignSelf: 'flex-start',
  },
  inflationBadgeText: {
    fontSize: 13,
    fontWeight: '600',
  },
  
  // Chart Section
  chartSection: {
    marginBottom: spacing[8],
    padding: spacing[5],
    borderRadius: spacing[3],
    borderWidth: 1,
  },
  chartTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: spacing[4],
  },
  chartContainer: {
    height: 280,
    marginBottom: spacing[4],
  },
  chartSvg: {
    width: '100%',
    height: '100%',
  },
  chartLegend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[3],
    justifyContent: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: spacing[2],
  },
  legendText: {
    fontSize: 14,
  },
  
  // Gear Breakdown Section
  breakdownSection: {
    marginBottom: spacing[8],
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: spacing[4],
  },
  gearItem: {
    padding: spacing[4],
    borderRadius: spacing[2],
    borderWidth: 1,
    marginBottom: spacing[3],
  },
  gearItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing[2],
  },
  gearItemName: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    marginRight: spacing[2],
  },
  gearItemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  gearItemModel: {
    fontSize: 15,
    marginBottom: spacing[2],
  },
  gearItemSpecs: {
    fontSize: 14,
    marginBottom: spacing[2],
    fontStyle: 'italic',
  },
  gearItemNotes: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: spacing[3],
  },
  gearItemPriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing[3],
    borderTopWidth: 1,
  },
  gearItemPriceLabel: {
    fontSize: 13,
  },
  gearItemPriceValue: {
    fontSize: 15,
    fontWeight: '600',
  },
  modernEquivalent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing[2],
    padding: spacing[2],
    borderRadius: spacing[1],
  },
  modernEquivalentText: {
    fontSize: 14,
    flex: 1,
  },
  modernEquivalentPrice: {
    fontSize: 14,
    fontWeight: '600',
  },
  
  // Sources Section
  sourcesSection: {
    marginBottom: spacing[6],
    padding: spacing[4],
    borderRadius: spacing[3],
    borderWidth: 1,
  },
  sourceItem: {
    flexDirection: 'row',
    marginBottom: spacing[2],
  },
  sourceIcon: {
    fontSize: 14,
    marginRight: spacing[2],
  },
  sourceText: {
    fontSize: 14,
    flex: 1,
  },
  
  // Share Section
  shareSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[3],
    marginBottom: spacing[6],
    justifyContent: 'center',
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    borderRadius: spacing[2],
  },
  shareButtonText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: spacing[2],
  },
  
  // Related Links
  relatedSection: {
    marginTop: spacing[6],
  },
  relatedTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: spacing[3],
  },
  relatedLink: {
    padding: spacing[3],
    borderRadius: spacing[2],
    borderWidth: 1,
    marginBottom: spacing[2],
    flexDirection: 'row',
    alignItems: 'center',
  },
  relatedLinkText: {
    fontSize: 15,
    flex: 1,
  },
  relatedLinkArrow: {
    fontSize: 16,
  },
  
  // No Data State
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing[8],
  },
  noDataText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: spacing[4],
  },
  noDataEmoji: {
    fontSize: 48,
    marginBottom: spacing[4],
  },
};

// ==========================================
// Simple SVG Line Chart Component
// ==========================================
function PriceLineChart({ data, theme, width }) {
  if (!data || data.length < 2) return null;
  
  const chartWidth = Math.min(width - 80, 900);
  const chartHeight = 220;
  const padding = { top: 20, right: 20, bottom: 40, left: 70 };
  
  const innerWidth = chartWidth - padding.left - padding.right;
  const innerHeight = chartHeight - padding.top - padding.bottom;
  
  // Calculate scales
  const years = data.map(d => d.year);
  const prices = data.map(d => d.price);
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);
  const maxPrice = Math.max(...prices) * 1.1;
  
  const xScale = (year) => padding.left + ((year - minYear) / (maxYear - minYear)) * innerWidth;
  const yScale = (price) => padding.top + innerHeight - (price / maxPrice) * innerHeight;
  
  // Generate path
  const pathPoints = data.map(d => `${xScale(d.year)},${yScale(d.price)}`).join(' L ');
  const linePath = `M ${pathPoints}`;
  
  // Area fill path
  const areaPath = `M ${xScale(data[0].year)},${yScale(0)} L ${pathPoints} L ${xScale(data[data.length - 1].year)},${yScale(0)} Z`;
  
  // Grid lines
  const gridLines = [];
  const priceStep = Math.ceil(maxPrice / 5 / 1000) * 1000;
  for (let p = 0; p <= maxPrice; p += priceStep) {
    gridLines.push(p);
  }
  
  const primaryColor = '#ef4444'; // Red for metal theme
  const areaColor = 'rgba(239, 68, 68, 0.15)';
  
  if (Platform.OS !== 'web') {
    // Simplified chart for native
    return (
      <View style={[styles.chartContainer, { backgroundColor: theme.cardBg }]}>
        <Text style={[styles.chartTitle, { color: theme.text }]}>📈 Price Evolution</Text>
        {data.map((point, i) => (
          <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: spacing[1] }}>
            <Text style={{ color: theme.secondaryText }}>{point.year}</Text>
            <Text style={{ color: theme.text, fontWeight: '600' }}>{formatHistoryPrice(point.price)}</Text>
            <Text style={{ color: theme.secondaryText, fontSize: 12 }}>{point.label}</Text>
          </View>
        ))}
      </View>
    );
  }
  
  return (
    <View style={styles.chartContainer}>
      <svg width={chartWidth} height={chartHeight} style={{ overflow: 'visible' }}>
        {/* Grid lines */}
        {gridLines.map((price, i) => (
          <g key={`grid-${i}`}>
            <line
              x1={padding.left}
              y1={yScale(price)}
              x2={chartWidth - padding.right}
              y2={yScale(price)}
              stroke={theme.border}
              strokeDasharray="4,4"
              strokeWidth={1}
            />
            <text
              x={padding.left - 10}
              y={yScale(price) + 4}
              textAnchor="end"
              fill={theme.secondaryText}
              fontSize={12}
            >
              ${(price / 1000).toFixed(0)}k
            </text>
          </g>
        ))}
        
        {/* Area fill */}
        <path d={areaPath} fill={areaColor} />
        
        {/* Line */}
        <path
          d={linePath}
          fill="none"
          stroke={primaryColor}
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Data points */}
        {data.map((point, i) => (
          <g key={`point-${i}`}>
            <circle
              cx={xScale(point.year)}
              cy={yScale(point.price)}
              r={6}
              fill={primaryColor}
              stroke="#fff"
              strokeWidth={2}
            />
            {/* Year label */}
            <text
              x={xScale(point.year)}
              y={chartHeight - 10}
              textAnchor="middle"
              fill={theme.secondaryText}
              fontSize={11}
            >
              {point.year}
            </text>
            {/* Event label (for key points) */}
            {(i === 0 || i === data.length - 1 || point.event.includes('recording') || point.event.includes('passes')) && (
              <text
                x={xScale(point.year)}
                y={yScale(point.price) - 15}
                textAnchor="middle"
                fill={theme.text}
                fontSize={10}
                fontWeight="600"
              >
                {formatHistoryPrice(point.price)}
              </text>
            )}
          </g>
        ))}
      </svg>
    </View>
  );
}

// ==========================================
// Main Component
// ==========================================
export function GearPriceHistoryPage({ drummerSlug, theme, onNavigate, drummers = [] }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  
  // Get price history data
  const priceData = useMemo(() => {
    return getGearPriceHistory(drummerSlug);
  }, [drummerSlug]);
  
  // Find drummer info from drummers list
  const drummerInfo = useMemo(() => {
    return drummers.find(d => d.slug === drummerSlug);
  }, [drummers, drummerSlug]);
  
  // Update meta tags on mount
  useEffect(() => {
    if (priceData) {
      updateGearHistoryMeta(priceData);
    }
  }, [priceData]);
  
  // Calculate inflation metrics
  const inflationStats = useMemo(() => {
    if (!priceData) return null;
    
    const multiplier = getInflationMultiplier(priceData.iconicYear);
    const percentIncrease = Math.round((multiplier - 1) * 100);
    
    return {
      multiplier: multiplier.toFixed(2),
      percentIncrease,
      yearsAgo: CURRENT_YEAR - priceData.iconicYear,
    };
  }, [priceData]);
  
  // Handle navigation
  const handleBack = useCallback(() => {
    if (onNavigate) {
      onNavigate(`/drummers/${drummerSlug}`);
    } else if (typeof window !== 'undefined') {
      window.history.back();
    }
  }, [drummerSlug, onNavigate]);
  
  const handleShare = useCallback((platform) => {
    if (!priceData) return;
    
    const url = getGearHistoryShareUrl(priceData.slug);
    const text = `🥁 ${priceData.name}'s ${priceData.iconicYear} drum setup cost ${formatHistoryPrice(priceData.totals.originalTotal)}. With inflation, that's ${formatHistoryPrice(priceData.totals.inflationAdjusted2026)} today!`;
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      reddit: `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`,
    };
    
    if (shareUrls[platform]) {
      Linking.openURL(shareUrls[platform]);
    }
  }, [priceData]);
  
  // No data state
  if (!priceData) {
    return (
      <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.contentContainer}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={handleBack}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Text style={{ fontSize: 20 }}>←</Text>
            <Text style={[styles.backButtonText, { color: theme.primary }]}>Back to Drummer</Text>
          </TouchableOpacity>
          
          <View style={styles.noDataContainer}>
            <Text style={styles.noDataEmoji}>📊</Text>
            <Text style={[styles.noDataText, { color: theme.text }]}>
              Price history data is not yet available for this drummer.
            </Text>
            <Text style={[styles.noDataText, { color: theme.secondaryText }]}>
              Currently featuring: Lars Ulrich, Joey Jordison, and Dave Lombardo.
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
  
  // Setup items as array
  const setupItems = Object.entries(priceData.setup).map(([category, item]) => ({
    category,
    ...item,
  }));
  
  // Source type icons
  const sourceIcons = {
    catalog: '📖',
    interview: '🎤',
    market: '💰',
    forum: '💬',
    manufacturer: '🏭',
    'fan-compiled': '🤘',
  };
  
  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Back Button */}
      <TouchableOpacity 
        style={styles.backButton}
        onPress={handleBack}
        accessibilityRole="button"
        accessibilityLabel="Go back to drummer page"
      >
        <Text style={{ fontSize: 20 }}>←</Text>
        <Text style={[styles.backButtonText, { color: theme.primary }]}>Back to {priceData.name}</Text>
      </TouchableOpacity>
      
      {/* Header */}
      <View style={styles.header}>
        <View style={[styles.headerTop, isMobile && styles.headerTopMobile]}>
          <Image
            source={{ uri: priceData.profileImage }}
            style={[styles.drummerImage, isMobile && styles.drummerImageMobile]}
            accessibilityLabel={`${priceData.name} photo`}
          />
          <View style={[styles.headerInfo, isMobile && styles.headerInfoMobile]}>
            <Text style={[styles.drummerName, { color: theme.text }, isMobile && styles.drummerNameMobile]}>
              {priceData.name}
            </Text>
            <Text style={[styles.bandName, { color: theme.primary }]}>
              {priceData.band}
            </Text>
            <Text style={[styles.eraLabel, { color: theme.secondaryText }]}>
              💿 {priceData.era} • {priceData.albumReference}
            </Text>
            <Text style={[styles.summary, { color: theme.secondaryText }, isMobile && styles.summaryMobile]}>
              {priceData.summary}
            </Text>
          </View>
        </View>
      </View>
      
      {/* Price Summary Cards */}
      <View style={styles.priceCardsContainer}>
        {/* Original Price Card */}
        <View style={[
          styles.priceCard,
          { backgroundColor: theme.cardBg, borderColor: theme.border }
        ]}>
          <Text style={[styles.priceCardTitle, { color: theme.secondaryText }]}>
            📅 Original {priceData.iconicYear} Cost
          </Text>
          <Text style={[styles.priceCardValue, { color: theme.text }]}>
            {formatHistoryPrice(priceData.totals.originalTotal)}
          </Text>
          <Text style={[styles.priceCardSubtitle, { color: theme.secondaryText }]}>
            {inflationStats.yearsAgo} years ago
          </Text>
        </View>
        
        {/* Inflation-Adjusted Card (highlighted) */}
        <View style={[
          styles.priceCard,
          styles.priceCardHighlight,
          { backgroundColor: theme.cardBg, borderColor: theme.primary }
        ]}>
          <Text style={[styles.priceCardTitle, { color: theme.primary }]}>
            📈 Inflation-Adjusted Today
          </Text>
          <Text style={[styles.priceCardValue, { color: theme.primary }]}>
            {formatHistoryPrice(priceData.totals.inflationAdjusted2026)}
          </Text>
          <View style={[styles.inflationBadge, { backgroundColor: 'rgba(239, 68, 68, 0.15)' }]}>
            <Text style={[styles.inflationBadgeText, { color: theme.primary }]}>
              ↑ {inflationStats.percentIncrease}% ({inflationStats.multiplier}x)
            </Text>
          </View>
        </View>
        
        {/* Modern Equivalent Card */}
        <View style={[
          styles.priceCard,
          { backgroundColor: theme.cardBg, borderColor: theme.border }
        ]}>
          <Text style={[styles.priceCardTitle, { color: theme.secondaryText }]}>
            🛒 Modern Equivalent
          </Text>
          <Text style={[styles.priceCardValue, { color: theme.text }]}>
            {formatHistoryPrice(priceData.totals.modernEquivalentTotal)}
          </Text>
          <Text style={[styles.priceCardSubtitle, { color: theme.secondaryText }]}>
            Similar gear today
          </Text>
        </View>
        
        {/* Vintage Value Card */}
        <View style={[
          styles.priceCard,
          { backgroundColor: theme.cardBg, borderColor: theme.border }
        ]}>
          <Text style={[styles.priceCardTitle, { color: theme.secondaryText }]}>
            🏛️ Vintage Market Value
          </Text>
          <Text style={[styles.priceCardValue, { color: theme.text }]}>
            {formatHistoryPrice(priceData.totals.vintageTotal2026)}
          </Text>
          <Text style={[styles.priceCardSubtitle, { color: theme.secondaryText }]}>
            Original gear if found
          </Text>
        </View>
      </View>
      
      {/* Price Evolution Chart */}
      <View style={[
        styles.chartSection,
        { backgroundColor: theme.cardBg, borderColor: theme.border }
      ]}>
        <Text style={[styles.chartTitle, { color: theme.text }]}>
          📊 Price Evolution Over Time
        </Text>
        <PriceLineChart 
          data={priceData.priceEvolution} 
          theme={theme}
          width={width - spacing[8]}
        />
        <View style={styles.chartLegend}>
          {priceData.priceEvolution.filter(p => p.event).slice(0, 4).map((point, i) => (
            <View key={i} style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: theme.primary }]} />
              <Text style={[styles.legendText, { color: theme.secondaryText }]}>
                {point.year}: {point.event}
              </Text>
            </View>
          ))}
        </View>
      </View>
      
      {/* Gear Breakdown */}
      <View style={styles.breakdownSection}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          🥁 Complete Setup Breakdown
        </Text>
        
        {setupItems.map((item, index) => {
          const adjustedPrice = calculateInflationAdjustedPrice(item.originalPrice, priceData.iconicYear);
          const categoryEmoji = {
            drums: '🥁',
            snare: '🎵',
            cymbals: '🔔',
            hardware: '⚙️',
            sticks: '🥢',
            heads: '🔲',
            electronics: '⚡',
          };
          
          return (
            <View 
              key={index}
              style={[styles.gearItem, { backgroundColor: theme.cardBg, borderColor: theme.border }]}
            >
              <View style={styles.gearItemHeader}>
                <Text style={[styles.gearItemName, { color: theme.text }]}>
                  {categoryEmoji[item.category] || '📦'} {item.item}
                </Text>
                <Text style={[styles.gearItemPrice, { color: theme.primary }]}>
                  {formatHistoryPrice(item.originalPrice)}
                </Text>
              </View>
              
              {item.model && (
                <Text style={[styles.gearItemModel, { color: theme.secondaryText }]}>
                  {item.model}
                </Text>
              )}
              
              {item.specs && (
                <Text style={[styles.gearItemSpecs, { color: theme.secondaryText }]}>
                  {item.specs}
                </Text>
              )}
              
              {item.notes && (
                <Text style={[styles.gearItemNotes, { color: theme.text }]}>
                  {item.notes}
                </Text>
              )}
              
              <View style={[styles.gearItemPriceRow, { borderTopColor: theme.border }]}>
                <View>
                  <Text style={[styles.gearItemPriceLabel, { color: theme.secondaryText }]}>
                    Inflation-Adjusted:
                  </Text>
                  <Text style={[styles.gearItemPriceValue, { color: theme.text }]}>
                    {formatHistoryPrice(adjustedPrice)}
                  </Text>
                </View>
                
                {item.vintageValue2026 && (
                  <View>
                    <Text style={[styles.gearItemPriceLabel, { color: theme.secondaryText }]}>
                      Vintage Value:
                    </Text>
                    <Text style={[styles.gearItemPriceValue, { color: theme.text }]}>
                      {formatHistoryPrice(item.vintageValue2026)}
                    </Text>
                  </View>
                )}
              </View>
              
              {item.modernEquivalent && (
                <View style={[styles.modernEquivalent, { backgroundColor: theme.background }]}>
                  <Text style={[styles.modernEquivalentText, { color: theme.secondaryText }]}>
                    🔄 Modern: {item.modernEquivalent.item}
                  </Text>
                  <Text style={[styles.modernEquivalentPrice, { color: theme.primary }]}>
                    {formatHistoryPrice(item.modernEquivalent.price)}
                  </Text>
                </View>
              )}
              
              {item.source && (
                <Text style={{ fontSize: 12, color: theme.secondaryText, marginTop: spacing[2], fontStyle: 'italic' }}>
                  Source: {item.source}
                </Text>
              )}
            </View>
          );
        })}
      </View>
      
      {/* Sources Section */}
      <View style={[styles.sourcesSection, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
        <Text style={[styles.sectionTitle, { color: theme.text, marginBottom: spacing[3] }]}>
          📚 Research Sources
        </Text>
        {priceData.sources.map((source, i) => (
          <View key={i} style={styles.sourceItem}>
            <Text style={styles.sourceIcon}>
              {sourceIcons[source.type] || '📄'}
            </Text>
            <Text style={[styles.sourceText, { color: theme.secondaryText }]}>
              {source.title} ({source.year})
            </Text>
          </View>
        ))}
        <Text style={{ fontSize: 13, color: theme.secondaryText, marginTop: spacing[3], fontStyle: 'italic' }}>
          💡 Prices are estimates based on vintage catalogs, market research, and historical data. 
          Actual prices varied by region and retailer.
        </Text>
      </View>
      
      {/* Share Section */}
      <View style={styles.shareSection}>
        <TouchableOpacity
          style={[styles.shareButton, { backgroundColor: '#1DA1F2' }]}
          onPress={() => handleShare('twitter')}
          accessibilityRole="button"
          accessibilityLabel="Share on Twitter"
        >
          <Text style={{ color: '#fff' }}>𝕏</Text>
          <Text style={[styles.shareButtonText, { color: '#fff' }]}>Tweet</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.shareButton, { backgroundColor: '#4267B2' }]}
          onPress={() => handleShare('facebook')}
          accessibilityRole="button"
          accessibilityLabel="Share on Facebook"
        >
          <Text style={{ color: '#fff' }}>f</Text>
          <Text style={[styles.shareButtonText, { color: '#fff' }]}>Share</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.shareButton, { backgroundColor: '#FF4500' }]}
          onPress={() => handleShare('reddit')}
          accessibilityRole="button"
          accessibilityLabel="Share on Reddit"
        >
          <Text style={{ color: '#fff' }}>r/</Text>
          <Text style={[styles.shareButtonText, { color: '#fff' }]}>Reddit</Text>
        </TouchableOpacity>
      </View>
      
      {/* Related Links */}
      <View style={styles.relatedSection}>
        <Text style={[styles.relatedTitle, { color: theme.text }]}>
          🔗 Related Pages
        </Text>
        
        <TouchableOpacity
          style={[styles.relatedLink, { backgroundColor: theme.cardBg, borderColor: theme.border }]}
          onPress={() => onNavigate?.(`/drummers/${priceData.slug}`)}
          accessibilityRole="link"
        >
          <Text style={[styles.relatedLinkText, { color: theme.text }]}>
            👤 {priceData.name}'s Full Profile & Gear List
          </Text>
          <Text style={[styles.relatedLinkArrow, { color: theme.secondaryText }]}>→</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.relatedLink, { backgroundColor: theme.cardBg, borderColor: theme.border }]}
          onPress={() => onNavigate?.(`/drummers/${priceData.slug}/evolution`)}
          accessibilityRole="link"
        >
          <Text style={[styles.relatedLinkText, { color: theme.text }]}>
            📈 {priceData.name}'s Gear Evolution Timeline
          </Text>
          <Text style={[styles.relatedLinkArrow, { color: theme.secondaryText }]}>→</Text>
        </TouchableOpacity>
        
        {/* Other drummers with price history */}
        {getPriceHistoryDrummerSlugs()
          .filter(slug => slug !== priceData.slug)
          .map(slug => {
            const otherData = getGearPriceHistory(slug);
            return (
              <TouchableOpacity
                key={slug}
                style={[styles.relatedLink, { backgroundColor: theme.cardBg, borderColor: theme.border }]}
                onPress={() => onNavigate?.(`/drummers/${slug}/gear-history`)}
                accessibilityRole="link"
              >
                <Text style={[styles.relatedLinkText, { color: theme.text }]}>
                  💰 {otherData.name}'s {otherData.iconicYear} Setup Costs
                </Text>
                <Text style={[styles.relatedLinkArrow, { color: theme.secondaryText }]}>→</Text>
              </TouchableOpacity>
            );
          })}
      </View>
      
      {/* Footer Note */}
      <View style={{ marginTop: spacing[8], paddingVertical: spacing[4], borderTopWidth: 1, borderTopColor: theme.border }}>
        <Text style={{ fontSize: 14, color: theme.secondaryText, textAlign: 'center', lineHeight: 22 }}>
          💡 Understanding gear costs helps appreciate the investment behind legendary recordings.
          Inflation data from US Bureau of Labor Statistics CPI-U.
        </Text>
      </View>
    </ScrollView>
  );
}

/**
 * Check if current page is a gear history page
 */
export function isGearHistoryPage() {
  if (typeof window === 'undefined') return false;
  return /^\/drummers\/[a-z0-9-]+\/gear-history\/?$/i.test(window.location.pathname);
}

/**
 * Get drummer slug from URL
 */
export function getGearHistorySlugFromURL() {
  if (typeof window === 'undefined') return null;
  const match = window.location.pathname.match(/^\/drummers\/([a-z0-9-]+)\/gear-history/i);
  return match ? match[1] : null;
}

export default GearPriceHistoryPage;
