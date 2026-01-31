import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Switch, FlatList, ActivityIndicator, Image, TouchableOpacity, ScrollView, Linking, Platform } from 'react-native';
import { ThemeProvider, useTheme } from './ThemeContext';
import { useState, useEffect } from 'react';

// Use relative URL for Vercel serverless, fallback to localhost for dev
const API_URL = typeof window !== 'undefined' && window.location.hostname !== 'localhost'
  ? '/api/drummers'
  : 'http://localhost:3001/api/drummers';

function updateDocumentMeta(drummer) {
  if (Platform.OS !== 'web' || typeof document === 'undefined') return;

  const title = drummer
    ? `${drummer.name} - ${drummer.band} | Drum Gear & Setup | Metal Drummer Gear`
    : 'Metal Drummer Gear - Legendary Metal Drummers & Their Gear';

  const description = drummer
    ? `Discover ${drummer.name}'s complete drum setup: ${drummer.gear?.drums}, ${drummer.gear?.snare}, ${drummer.gear?.cymbals}. Full gear list and bio.`
    : 'Explore gear setups of legendary metal drummers including Lars Ulrich, Dave Lombardo, Joey Jordison, and more. Complete drum kits, cymbals, and hardware specs.';

  document.title = title;

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

  setMeta('description', description);
  setMeta('keywords', 'metal drummer, drum gear, drum kit, cymbals, snare drum, double bass pedal, metal drumming');
  setMeta('og:title', title, true);
  setMeta('og:description', description, true);
  setMeta('og:type', 'website', true);
  if (drummer) setMeta('og:image', drummer.image, true);
  setMeta('twitter:card', 'summary_large_image');
  setMeta('twitter:title', title);
  setMeta('twitter:description', description);

  let ldScript = document.querySelector('script[type="application/ld+json"]');
  if (!ldScript) {
    ldScript = document.createElement('script');
    ldScript.type = 'application/ld+json';
    document.head.appendChild(ldScript);
  }
  ldScript.textContent = JSON.stringify(drummer ? {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": drummer.name,
    "description": drummer.bio,
    "image": drummer.image,
    "jobTitle": "Drummer",
    "memberOf": {
      "@type": "MusicGroup",
      "name": drummer.band
    }
  } : {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Metal Drummer Gear",
    "description": description,
    "url": typeof window !== 'undefined' ? window.location.href : ''
  });
}

function SEOHead({ drummer }) {
  useEffect(() => {
    updateDocumentMeta(drummer);
  }, [drummer]);
  return null;
}

function DrummerCard({ drummer, theme, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}
      accessibilityRole="button"
      accessibilityLabel={`View ${drummer.name}'s gear details`}
    >
      <View style={styles.cardContent}>
        <TouchableOpacity onPress={onPress} accessibilityRole="image">
          <Image
            source={{ uri: drummer.image }}
            style={styles.cardImage}
            accessibilityLabel={`Photo of ${drummer.name}`}
          />
        </TouchableOpacity>
        <View style={styles.cardText}>
          <Text style={[styles.drummerName, { color: theme.text }]}>{drummer.name}</Text>
          <Text style={[styles.drummerBand, { color: theme.secondaryText }]}>{drummer.band}</Text>
          <Text style={[styles.drummerGenre, { color: theme.secondaryText }]}>{drummer.genre}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function GearSection({ title, content, theme }) {
  return (
    <View style={styles.gearSection}>
      <Text style={[styles.gearTitle, { color: theme.text }]}>{title}</Text>
      <Text style={[styles.gearContent, { color: theme.secondaryText }]}>{content}</Text>
    </View>
  );
}

function DrummerDetail({ drummer, theme, onBack }) {
  const handleEndorsementPress = (url) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.detailContainer} contentContainerStyle={styles.detailContent}>
      <SEOHead drummer={drummer} />
      <TouchableOpacity
        onPress={onBack}
        style={[styles.backButton, { backgroundColor: theme.card, borderColor: theme.border }]}
        accessibilityRole="button"
        accessibilityLabel="Go back to drummer list"
      >
        <Text style={[styles.backButtonText, { color: theme.text }]}>Back to List</Text>
      </TouchableOpacity>

      <View style={styles.detailHeader}>
        <Image
          source={{ uri: drummer.image }}
          style={styles.detailImage}
          accessibilityLabel={`Photo of ${drummer.name}`}
        />
        <View style={styles.detailHeaderText}>
          <Text style={[styles.detailName, { color: theme.text }]} accessibilityRole="header">{drummer.name}</Text>
          <Text style={[styles.detailBand, { color: theme.secondaryText }]}>{drummer.band}</Text>
          <Text style={[styles.detailMeta, { color: theme.secondaryText }]}>{drummer.genre} | {drummer.country}</Text>
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]} accessibilityRole="header">Biography</Text>
        <Text style={[styles.bioText, { color: theme.secondaryText }]}>{drummer.bio}</Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]} accessibilityRole="header">Gear Setup</Text>
        <GearSection title="Drums" content={drummer.gear.drums} theme={theme} />
        <GearSection title="Snare" content={drummer.gear.snare} theme={theme} />
        <GearSection title="Cymbals" content={drummer.gear.cymbals} theme={theme} />
        <GearSection title="Hardware" content={drummer.gear.hardware} theme={theme} />
        {drummer.gear.sticks && (
          <GearSection title="Sticks" content={drummer.gear.sticks} theme={theme} />
        )}
      </View>

      {drummer.photos && drummer.photos.length > 0 && (
        <View style={[styles.section, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]} accessibilityRole="header">Photo Gallery</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.gallery}>
            {drummer.photos.map((photo, index) => (
              <Image
                key={index}
                source={{ uri: photo }}
                style={styles.galleryImage}
                accessibilityLabel={`${drummer.name} photo ${index + 1}`}
              />
            ))}
          </ScrollView>
        </View>
      )}

      {drummer.endorsements && drummer.endorsements.length > 0 && (
        <View style={[styles.section, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]} accessibilityRole="header">Endorsements</Text>
          <View style={styles.endorsements}>
            {drummer.endorsements.map((endorsement, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleEndorsementPress(endorsement.url)}
                style={[styles.endorsementLink, { borderColor: theme.border }]}
                accessibilityRole="link"
                accessibilityLabel={`Visit ${endorsement.name} website`}
              >
                <Text style={[styles.endorsementText, { color: theme.text }]}>{endorsement.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
}

function DrummerList({ theme, onSelectDrummer }) {
  const [drummers, setDrummers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDrummers();
  }, []);

  const fetchDrummers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch drummers');
      }
      const data = await response.json();
      setDrummers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={theme.text} />
        <Text style={[styles.loadingText, { color: theme.secondaryText }]}>Loading drummers...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={[styles.errorText, { color: theme.error }]}>Error: {error}</Text>
        <Text style={[styles.errorHint, { color: theme.secondaryText }]}>
          Make sure the backend is running on port 3001
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={drummers}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <DrummerCard
          drummer={item}
          theme={theme}
          onPress={() => onSelectDrummer(item.id)}
        />
      )}
      contentContainerStyle={styles.listContainer}
    />
  );
}

function AppContent() {
  const { theme, isDarkMode, toggleTheme } = useTheme();
  const [selectedDrummerId, setSelectedDrummerId] = useState(null);
  const [selectedDrummer, setSelectedDrummer] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(false);

  const handleSelectDrummer = async (id) => {
    setLoadingDetail(true);
    try {
      const detailUrl = typeof window !== 'undefined' && window.location.hostname !== 'localhost'
        ? `/api/drummers/${id}`
        : `http://localhost:3001/api/drummers/${id}`;
      const response = await fetch(detailUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch drummer details');
      }
      const data = await response.json();
      setSelectedDrummer(data);
      setSelectedDrummerId(id);
    } catch (err) {
      console.error('Error fetching drummer details:', err);
    } finally {
      setLoadingDetail(false);
    }
  };

  const handleBack = () => {
    setSelectedDrummerId(null);
    setSelectedDrummer(null);
  };

  if (loadingDetail) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={theme.text} />
          <Text style={[styles.loadingText, { color: theme.secondaryText }]}>Loading drummer details...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {!selectedDrummer && <SEOHead />}
      <View style={styles.header} accessibilityRole="banner">
        <Text style={[styles.title, { color: theme.text }]} accessibilityRole="header">
          Metal Drummer Gear
        </Text>
        <View style={styles.toggleContainer}>
          <Text style={[styles.toggleLabel, { color: theme.secondaryText }]}>
            {isDarkMode ? 'Dark Mode' : 'Light Mode'}
          </Text>
          <Switch
            value={isDarkMode}
            onValueChange={toggleTheme}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
            accessibilityLabel={`Toggle ${isDarkMode ? 'light' : 'dark'} mode`}
          />
        </View>
      </View>
      {selectedDrummer ? (
        <DrummerDetail drummer={selectedDrummer} theme={theme} onBack={handleBack} />
      ) : (
        <View style={styles.mainContent} accessibilityRole="main">
          <DrummerList theme={theme} onSelectDrummer={handleSelectDrummer} />
        </View>
      )}
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
    </View>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  toggleLabel: {
    fontSize: 16,
  },
  mainContent: {
    flex: 1,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  card: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  cardText: {
    flex: 1,
  },
  drummerName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  drummerBand: {
    fontSize: 16,
    marginBottom: 2,
  },
  drummerGenre: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  errorText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorHint: {
    marginTop: 8,
    fontSize: 14,
    textAlign: 'center',
  },
  detailContainer: {
    flex: 1,
  },
  detailContent: {
    padding: 20,
  },
  backButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  detailHeader: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  detailImage: {
    width: 120,
    height: 120,
    borderRadius: 12,
    marginRight: 20,
  },
  detailHeaderText: {
    flex: 1,
    justifyContent: 'center',
  },
  detailName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  detailBand: {
    fontSize: 18,
    marginBottom: 4,
  },
  detailMeta: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  section: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  bioText: {
    fontSize: 16,
    lineHeight: 24,
  },
  gearSection: {
    marginBottom: 12,
  },
  gearTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  gearContent: {
    fontSize: 14,
    lineHeight: 20,
  },
  gallery: {
    flexDirection: 'row',
  },
  galleryImage: {
    width: 200,
    height: 150,
    borderRadius: 8,
    marginRight: 12,
  },
  endorsements: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  endorsementLink: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
  },
  endorsementText: {
    fontSize: 14,
    fontWeight: '500',
  },
});
