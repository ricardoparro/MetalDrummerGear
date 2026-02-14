// GearBrandPage Component - Browse gear by brand
// Issue #339: Individual gear pages for SEO

import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, useWindowDimensions, Platform, ActivityIndicator } from 'react-native';
import { Image } from 'expo-image';

const PLACEHOLDER_IMAGE = 'https://ui-avatars.com/api/?name=Gear&background=1a1a2e&color=fff&size=200';

// Category emojis
const CATEGORY_EMOJIS = {
  snare: '🥁',
  cymbals: '🔔',
  pedals: '🦶',
  drums: '🪘',
  sticks: '🥢',
  hardware: '🔧'
};

function GearCard({ gear, theme, onPress }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const cardWidth = isMobile ? width - 32 : 280;

  return (
    <TouchableOpacity
      onPress={() => onPress(gear.slug)}
      style={[
        styles.gearCard,
        { 
          backgroundColor: theme.card, 
          borderColor: theme.border,
          width: cardWidth
        }
      ]}
      accessibilityRole="link"
      accessibilityLabel={`View ${gear.name}`}
    >
      <Image
        source={{ uri: gear.image || PLACEHOLDER_IMAGE }}
        style={styles.gearCardImage}
        contentFit="cover"
        placeholder={{ blurhash: 'L6Pj0^jt.mfQ~qfQfQfQ~qfQfQfQ' }}
        transition={200}
      />
      <View style={styles.gearCardContent}>
        <Text style={[styles.gearCardName, { color: theme.text }]} numberOfLines={2}>
          {gear.name}
        </Text>
        {gear.shortDescription && (
          <Text style={[styles.gearCardDescription, { color: theme.secondaryText }]} numberOfLines={2}>
            {gear.shortDescription}
          </Text>
        )}
        {gear.priceEur && (
          <Text style={[styles.gearCardPrice, { color: theme.primary || '#dc2626' }]}>
            €{gear.priceEur.toLocaleString()}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default function GearBrandPage({ theme, onBack, onSelectGear, brandSlug, onBackToGearList }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  
  const [brandData, setBrandData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch brand data
  useEffect(() => {
    const fetchBrandGear = async () => {
      if (!brandSlug) return;
      
      try {
        setLoading(true);
        setError(null);
        const url = Platform.OS === 'web' && typeof window !== 'undefined' && window.location.hostname !== 'localhost'
          ? `/api/gear/brand/${brandSlug}`
          : `http://localhost:3001/api/gear/brand/${brandSlug}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Brand not found');
        }
        const data = await response.json();
        setBrandData(data);
      } catch (err) {
        console.error('Error fetching brand gear:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBrandGear();
  }, [brandSlug]);

  // Update page meta for SEO
  useEffect(() => {
    if (Platform.OS === 'web' && typeof document !== 'undefined' && brandData) {
      document.title = `${brandData.brand} Drum Gear | MetalForge`;
      
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
      
      const description = brandData.meta?.description || 
        `Browse ${brandData.total} ${brandData.brand} products used by professional metal drummers.`;
      
      setMeta('description', description);
      setMeta('og:title', document.title, true);
      setMeta('og:description', description, true);
    }
  }, [brandData]);

  const handleSelectGear = (slug) => {
    if (onSelectGear) {
      onSelectGear(slug);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.text} />
          <Text style={[styles.loadingText, { color: theme.secondaryText }]}>
            Loading {brandSlug} gear...
          </Text>
        </View>
      </View>
    );
  }

  if (error || !brandData) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={[styles.content, isMobile && styles.contentMobile]}>
          <TouchableOpacity
            onPress={onBackToGearList || onBack}
            style={[styles.backButton, { backgroundColor: theme.card, borderColor: theme.border }]}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Text style={[styles.backButtonText, { color: theme.text }]}>← Back to Gear</Text>
          </TouchableOpacity>
          <View style={styles.errorContainer}>
            <Text style={[styles.errorEmoji]}>😕</Text>
            <Text style={[styles.errorTitle, { color: theme.text }]}>Brand Not Found</Text>
            <Text style={[styles.errorText, { color: theme.secondaryText }]}>
              We couldn't find any gear for "{brandSlug}"
            </Text>
            <TouchableOpacity
              onPress={onBackToGearList || onBack}
              style={[styles.errorButton, { borderColor: theme.border }]}
            >
              <Text style={[styles.errorButtonText, { color: theme.text }]}>Browse All Gear</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.content, isMobile && styles.contentMobile]}>
        {/* Back Button */}
        <TouchableOpacity
          onPress={onBackToGearList || onBack}
          style={[styles.backButton, { backgroundColor: theme.card, borderColor: theme.border }]}
          accessibilityRole="button"
          accessibilityLabel="Go back to gear list"
        >
          <Text style={[styles.backButtonText, { color: theme.text }]}>← Back to Gear</Text>
        </TouchableOpacity>

        {/* Brand Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]} accessibilityRole="heading">
            {brandData.brand}
          </Text>
          <Text style={[styles.subtitle, { color: theme.secondaryText }]}>
            {brandData.total} product{brandData.total !== 1 ? 's' : ''} used by professional metal drummers
          </Text>
        </View>

        {/* Categories */}
        {brandData.categories.map(category => (
          <View key={category.category} style={styles.categorySection}>
            <View style={styles.categorySectionHeader}>
              <Text style={styles.categorySectionEmoji}>
                {CATEGORY_EMOJIS[category.category] || '🎵'}
              </Text>
              <Text style={[styles.categorySectionTitle, { color: theme.text }]}>
                {category.label}
              </Text>
              <Text style={[styles.categorySectionCount, { color: theme.secondaryText }]}>
                ({category.items.length})
              </Text>
            </View>
            <View style={[styles.gearGrid, isMobile && styles.gearGridMobile]}>
              {category.items.map(gear => (
                <GearCard
                  key={gear.id}
                  gear={gear}
                  theme={theme}
                  onPress={handleSelectGear}
                />
              ))}
            </View>
          </View>
        ))}

        <View style={{ height: 40 }} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 24,
  },
  backButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
  },
  errorContainer: {
    alignItems: 'center',
    padding: 40,
  },
  errorEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  errorText: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: 'center',
  },
  errorButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  errorButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  categorySection: {
    marginBottom: 32,
  },
  categorySectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  categorySectionEmoji: {
    fontSize: 20,
    marginRight: 8,
  },
  categorySectionTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  categorySectionCount: {
    fontSize: 14,
    marginLeft: 8,
  },
  gearGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  gearGridMobile: {
    flexDirection: 'column',
  },
  gearCard: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 8,
  },
  gearCardImage: {
    width: '100%',
    height: 160,
  },
  gearCardContent: {
    padding: 16,
  },
  gearCardName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    lineHeight: 22,
  },
  gearCardDescription: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 8,
  },
  gearCardPrice: {
    fontSize: 16,
    fontWeight: '700',
  },
});
