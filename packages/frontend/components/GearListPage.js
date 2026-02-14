// GearListPage Component - Browse all gear by category
// Issue #339: Individual gear pages for SEO

import { useState, useEffect, useMemo } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet, useWindowDimensions, Platform, ActivityIndicator } from 'react-native';
import { Image } from 'expo-image';

const PLACEHOLDER_IMAGE = 'https://ui-avatars.com/api/?name=Gear&background=1a1a2e&color=fff&size=200';

// Category configuration
const CATEGORIES = [
  { key: 'all', label: 'All Gear', emoji: '🎵' },
  { key: 'snare', label: 'Snare Drums', emoji: '🥁' },
  { key: 'cymbals', label: 'Cymbals', emoji: '🔔' },
  { key: 'pedals', label: 'Pedals', emoji: '🦶' },
  { key: 'drums', label: 'Drum Kits', emoji: '🪘' },
  { key: 'sticks', label: 'Drumsticks', emoji: '🥢' },
];

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
        <View style={[styles.categoryBadge, { backgroundColor: theme.background }]}>
          <Text style={[styles.categoryBadgeText, { color: theme.secondaryText }]}>
            {CATEGORIES.find(c => c.key === gear.category)?.label || gear.category}
          </Text>
        </View>
        <Text style={[styles.gearCardName, { color: theme.text }]} numberOfLines={2}>
          {gear.name}
        </Text>
        <Text style={[styles.gearCardBrand, { color: theme.secondaryText }]}>
          {gear.brand}
        </Text>
        {gear.priceEur && (
          <Text style={[styles.gearCardPrice, { color: theme.primary || '#dc2626' }]}>
            €{gear.priceEur.toLocaleString()}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default function GearListPage({ theme, onBack, onSelectGear, onSelectBrand }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  
  const [gearItems, setGearItems] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch gear data
  useEffect(() => {
    const fetchGear = async () => {
      try {
        setLoading(true);
        const url = Platform.OS === 'web' && typeof window !== 'undefined' && window.location.hostname !== 'localhost'
          ? '/api/gear'
          : 'http://localhost:3001/api/gear';
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setGearItems(data.items || []);
          setBrands(data.brands || []);
        }
      } catch (err) {
        console.error('Error fetching gear:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchGear();
  }, []);

  // Update page meta for SEO
  useEffect(() => {
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      const categoryLabel = selectedCategory === 'all' 
        ? 'All Gear' 
        : CATEGORIES.find(c => c.key === selectedCategory)?.label || selectedCategory;
      
      document.title = selectedCategory === 'all'
        ? 'Metal Drum Gear - Browse All | MetalForge'
        : `${categoryLabel} for Metal Drummers | MetalForge`;
      
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
      
      const description = selectedCategory === 'all'
        ? 'Browse drum gear used by professional metal drummers. Find snares, cymbals, pedals, drum kits, and more.'
        : `Browse ${categoryLabel.toLowerCase()} used by professional metal drummers. See specs, prices, and which pros use each piece.`;
      
      setMeta('description', description);
      setMeta('og:title', document.title, true);
      setMeta('og:description', description, true);
    }
  }, [selectedCategory]);

  // Filter gear by category and search
  const filteredGear = useMemo(() => {
    let results = gearItems;
    
    // Category filter
    if (selectedCategory !== 'all') {
      results = results.filter(g => g.category === selectedCategory);
    }
    
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(g =>
        g.name.toLowerCase().includes(query) ||
        g.brand.toLowerCase().includes(query)
      );
    }
    
    return results;
  }, [gearItems, selectedCategory, searchQuery]);

  // Group by category for display
  const groupedGear = useMemo(() => {
    if (selectedCategory !== 'all') {
      return [{ category: selectedCategory, items: filteredGear }];
    }
    
    const groups = {};
    filteredGear.forEach(item => {
      if (!groups[item.category]) {
        groups[item.category] = [];
      }
      groups[item.category].push(item);
    });
    
    return Object.entries(groups).map(([category, items]) => ({
      category,
      label: CATEGORIES.find(c => c.key === category)?.label || category,
      emoji: CATEGORIES.find(c => c.key === category)?.emoji || '🎵',
      items
    }));
  }, [filteredGear, selectedCategory]);

  const handleSelectGear = (slug) => {
    if (onSelectGear) {
      onSelectGear(slug);
    }
  };

  const handleSelectBrand = (brand) => {
    if (onSelectBrand) {
      onSelectBrand(brand.toLowerCase().replace(/\s+/g, '-'));
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.text} />
          <Text style={[styles.loadingText, { color: theme.secondaryText }]}>
            Loading gear...
          </Text>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.content, isMobile && styles.contentMobile]}>
        {/* Back Button */}
        <TouchableOpacity
          onPress={onBack}
          style={[styles.backButton, { backgroundColor: theme.card, borderColor: theme.border }]}
          accessibilityRole="button"
          accessibilityLabel="Go back to home"
        >
          <Text style={[styles.backButtonText, { color: theme.text }]}>← Back to Home</Text>
        </TouchableOpacity>

        {/* Page Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]} accessibilityRole="heading">
            🎵 Metal Drum Gear
          </Text>
          <Text style={[styles.subtitle, { color: theme.secondaryText }]}>
            Browse gear used by professional metal drummers
          </Text>
        </View>

        {/* Search Bar */}
        <View style={[styles.searchContainer, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={[styles.searchInput, { color: theme.text }]}
            placeholder="Search gear..."
            placeholderTextColor={theme.secondaryText}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Text style={[styles.clearButton, { color: theme.secondaryText }]}>✕</Text>
            </TouchableOpacity>
          ) : null}
        </View>

        {/* Category Tabs */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoryTabs}
          contentContainerStyle={styles.categoryTabsContent}
        >
          {CATEGORIES.map(cat => (
            <TouchableOpacity
              key={cat.key}
              onPress={() => setSelectedCategory(cat.key)}
              style={[
                styles.categoryTab,
                { borderColor: theme.border },
                selectedCategory === cat.key && { backgroundColor: theme.text, borderColor: theme.text }
              ]}
              accessibilityRole="tab"
              accessibilityState={{ selected: selectedCategory === cat.key }}
            >
              <Text style={styles.categoryTabEmoji}>{cat.emoji}</Text>
              <Text style={[
                styles.categoryTabText,
                { color: selectedCategory === cat.key ? theme.background : theme.text }
              ]}>
                {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Browse by Brand */}
        <View style={styles.brandsSection}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Browse by Brand</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.brandsScroll}
          >
            {brands.map(brand => (
              <TouchableOpacity
                key={brand}
                onPress={() => handleSelectBrand(brand)}
                style={[styles.brandChip, { backgroundColor: theme.card, borderColor: theme.border }]}
                accessibilityRole="link"
                accessibilityLabel={`View ${brand} gear`}
              >
                <Text style={[styles.brandChipText, { color: theme.text }]}>{brand}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Results Count */}
        <Text style={[styles.resultsCount, { color: theme.secondaryText }]}>
          {filteredGear.length} item{filteredGear.length !== 1 ? 's' : ''} found
        </Text>

        {/* Gear Grid */}
        {groupedGear.map(group => (
          <View key={group.category} style={styles.categorySection}>
            {selectedCategory === 'all' && (
              <View style={styles.categorySectionHeader}>
                <Text style={styles.categorySectionEmoji}>{group.emoji}</Text>
                <Text style={[styles.categorySectionTitle, { color: theme.text }]}>
                  {group.label}
                </Text>
                <Text style={[styles.categorySectionCount, { color: theme.secondaryText }]}>
                  ({group.items.length})
                </Text>
              </View>
            )}
            <View style={[styles.gearGrid, isMobile && styles.gearGridMobile]}>
              {group.items.map(gear => (
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

        {filteredGear.length === 0 && (
          <View style={styles.noResults}>
            <Text style={[styles.noResultsText, { color: theme.secondaryText }]}>
              No gear found matching your criteria
            </Text>
            <TouchableOpacity
              onPress={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              style={[styles.clearFiltersButton, { borderColor: theme.border }]}
            >
              <Text style={[styles.clearFiltersText, { color: theme.text }]}>Clear Filters</Text>
            </TouchableOpacity>
          </View>
        )}

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
    marginBottom: 24,
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    outlineStyle: 'none',
  },
  clearButton: {
    fontSize: 18,
    padding: 4,
  },
  categoryTabs: {
    marginBottom: 24,
  },
  categoryTabsContent: {
    gap: 8,
  },
  categoryTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
  },
  categoryTabEmoji: {
    fontSize: 14,
    marginRight: 6,
  },
  categoryTabText: {
    fontSize: 14,
    fontWeight: '500',
  },
  brandsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  brandsScroll: {
    gap: 8,
  },
  brandChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    marginRight: 8,
  },
  brandChipText: {
    fontSize: 14,
    fontWeight: '500',
  },
  resultsCount: {
    fontSize: 14,
    marginBottom: 16,
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
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  categoryBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  gearCardName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    lineHeight: 22,
  },
  gearCardBrand: {
    fontSize: 14,
    marginBottom: 8,
  },
  gearCardPrice: {
    fontSize: 16,
    fontWeight: '700',
  },
  noResults: {
    alignItems: 'center',
    padding: 40,
  },
  noResultsText: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  clearFiltersButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
  },
  clearFiltersText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
