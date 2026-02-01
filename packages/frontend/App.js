import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Switch, FlatList, ActivityIndicator, Image, TouchableOpacity, ScrollView, Linking, Platform, useWindowDimensions } from 'react-native';
import { ThemeProvider, useTheme } from './ThemeContext';
import { useState, useEffect, useCallback } from 'react';
import { getAffiliateLinks, extractPrimaryProduct, getThomannLink, getSweetwaterLink } from './affiliateLinks';
import { calculateKitCost, formatPrice } from './gearPrices';

// YouTube Video Embed Component - Works with React Native Web
function YouTubeEmbed({ videoId, title, theme }) {
  const { width } = useWindowDimensions();
  // Calculate responsive video dimensions (16:9 aspect ratio)
  const maxWidth = Math.min(width - 72, 560); // Account for padding
  const videoWidth = maxWidth;
  const videoHeight = Math.round(videoWidth * 9 / 16);

  if (Platform.OS === 'web') {
    return (
      <View style={[styles.videoContainer, { width: videoWidth, height: videoHeight }]}>
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ borderRadius: 8 }}
        />
      </View>
    );
  }

  // For native platforms, show a thumbnail that opens YouTube
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;

  return (
    <TouchableOpacity
      onPress={() => Linking.openURL(youtubeUrl)}
      style={[styles.videoContainer, { width: videoWidth, height: videoHeight }]}
      accessibilityRole="link"
      accessibilityLabel={`Play ${title} on YouTube`}
    >
      <Image
        source={{ uri: thumbnailUrl }}
        style={styles.videoThumbnail}
        resizeMode="cover"
      />
      <View style={styles.playButtonOverlay}>
        <View style={[styles.playButton, { backgroundColor: theme.card }]}>
          <Text style={[styles.playButtonText, { color: theme.text }]}>▶</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function VideoCard({ video, theme }) {
  return (
    <View style={[styles.videoCard, { borderColor: theme.border }]}>
      <YouTubeEmbed videoId={video.youtubeId} title={video.title} theme={theme} />
      <View style={styles.videoInfo}>
        <Text style={[styles.videoTitle, { color: theme.text }]} numberOfLines={2}>
          {video.title}
        </Text>
        {video.year && (
          <Text style={[styles.videoYear, { color: theme.secondaryText }]}>
            {video.year}
          </Text>
        )}
      </View>
    </View>
  );
}

const PLACEHOLDER_IMAGE = 'https://ui-avatars.com/api/?name=Drummer&background=1a1a2e&color=fff&size=200';

function ImageWithFallback({ source, style, accessibilityLabel }) {
  const [hasError, setHasError] = useState(false);
  const [imageUri, setImageUri] = useState(source?.uri || PLACEHOLDER_IMAGE);

  useEffect(() => {
    setImageUri(source?.uri || PLACEHOLDER_IMAGE);
    setHasError(false);
  }, [source?.uri]);

  const handleError = useCallback(() => {
    if (!hasError) {
      setHasError(true);
      setImageUri(PLACEHOLDER_IMAGE);
    }
  }, [hasError]);

  return (
    <Image
      source={{ uri: imageUri }}
      style={style}
      accessibilityLabel={accessibilityLabel}
      onError={handleError}
      resizeMode="cover"
    />
  );
}

// Use relative URL for Vercel serverless, fallback to localhost for dev
const API_URL = typeof window !== 'undefined' && window.location.hostname !== 'localhost'
  ? '/api/drummers'
  : 'http://localhost:3001/api/drummers';

function updateDocumentMeta(drummer) {
  if (Platform.OS !== 'web' || typeof document === 'undefined') return;

  // Calculate kit cost for SEO if drummer exists
  const kitCost = drummer ? calculateKitCost(drummer.gear) : null;

  const title = drummer
    ? `${drummer.name} Drum Kit & Gear | Metal Drummer Gear`
    : 'Metal Drummer Gear - Discover What Pro Drummers Play';

  const description = drummer
    ? `${drummer.name}'s complete drum setup costs approximately ${formatPrice(kitCost?.totalEur || 0, 'EUR')}. Full gear breakdown for the ${drummer.band} drummer including drums, cymbals, and hardware.`
    : 'Explore the drum kits, cymbals, and gear used by legendary metal drummers including Lars Ulrich, Joey Jordison, Dave Lombardo and more.';

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
  setMeta('keywords', drummer
    ? `${drummer.name} drums, ${drummer.name} drum kit, ${drummer.band} drummer gear, ${drummer.name} cymbals, drum kit cost`
    : 'metal drummer, drum gear, drum kit, cymbals, snare drum, double bass pedal, metal drumming');
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

  // Enhanced structured data with pricing for drummer pages
  const structuredData = drummer ? {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "name": drummer.name,
        "description": drummer.bio,
        "image": drummer.image,
        "jobTitle": "Drummer",
        "memberOf": {
          "@type": "MusicGroup",
          "name": drummer.band
        }
      },
      {
        "@type": "Product",
        "name": `${drummer.name}'s Complete Drum Kit`,
        "description": `Professional drum setup used by ${drummer.name} of ${drummer.band}`,
        "image": drummer.image,
        "offers": {
          "@type": "AggregateOffer",
          "priceCurrency": "EUR",
          "lowPrice": kitCost?.totalEur || 0,
          "highPrice": Math.round((kitCost?.totalEur || 0) * 1.2),
          "offerCount": 5,
          "availability": "https://schema.org/InStock"
        },
        "brand": {
          "@type": "Brand",
          "name": extractPrimaryProduct(drummer.gear?.drums)?.split(' ')[0] || "Various"
        }
      }
    ]
  } : {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Metal Drummer Gear",
    "description": description,
    "url": typeof window !== 'undefined' ? window.location.href : ''
  };

  ldScript.textContent = JSON.stringify(structuredData);
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
          <ImageWithFallback
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

function GearSection({ title, content, theme, gearType }) {
  const primaryProduct = extractPrimaryProduct(content);
  const affiliateLinks = getAffiliateLinks(primaryProduct, gearType);

  const handleShopPress = (url, store) => {
    // Open in new tab for web, use Linking for native
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      Linking.openURL(url);
    }
  };

  return (
    <View style={styles.gearSection}>
      <Text style={[styles.gearTitle, { color: theme.text }]}>{title}</Text>
      <Text style={[styles.gearContent, { color: theme.secondaryText }]}>{content}</Text>
      <View style={styles.shopLinksContainer}>
        <TouchableOpacity
          onPress={() => handleShopPress(affiliateLinks.sweetwater, 'Sweetwater')}
          style={[styles.shopButton, styles.shopButtonUS, { borderColor: theme.border }]}
          accessibilityRole="link"
          accessibilityLabel={`Shop ${primaryProduct} at Sweetwater (US)`}
        >
          <Text style={styles.shopButtonText}>Shop US</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleShopPress(affiliateLinks.thomann, 'Thomann')}
          style={[styles.shopButton, styles.shopButtonEU, { borderColor: theme.border }]}
          accessibilityRole="link"
          accessibilityLabel={`Shop ${primaryProduct} at Thomann (EU)`}
        >
          <Text style={styles.shopButtonText}>Shop EU</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function KitCostCalculator({ drummer, theme }) {
  const kitCost = calculateKitCost(drummer.gear);

  if (!kitCost) return null;

  const handleBuySetupPress = (store) => {
    // Create a combined search query for the full kit
    const primaryDrums = extractPrimaryProduct(drummer.gear.drums);
    let url;
    if (store === 'thomann') {
      url = getThomannLink(primaryDrums, 'full-kit');
    } else {
      url = getSweetwaterLink(primaryDrums, 'full-kit');
    }

    // Track "Buy Setup" clicks separately with utm_campaign=buy-full-setup
    url = url.replace(/utm_campaign=[^&]+/, 'utm_campaign=buy-full-setup');

    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      Linking.openURL(url);
    }
  };

  const gearLabels = {
    drums: 'Drums',
    snare: 'Snare',
    cymbals: 'Cymbals',
    hardware: 'Hardware',
    sticks: 'Sticks',
  };

  return (
    <View style={[styles.section, styles.calculatorSection, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <Text style={[styles.sectionTitle, styles.calculatorTitle, { color: theme.text }]} accessibilityRole="header">
        Kit Cost Calculator
      </Text>
      <Text style={[styles.calculatorSubtitle, { color: theme.secondaryText }]}>
        Estimated cost of {drummer.name}'s setup
      </Text>

      <View style={styles.calculatorItems}>
        {Object.entries(kitCost.items).map(([key, price]) => (
          price > 0 && (
            <View key={key} style={styles.calculatorRow}>
              <Text style={[styles.calculatorLabel, { color: theme.text }]}>
                {gearLabels[key]}
              </Text>
              <Text style={[styles.calculatorPrice, { color: theme.secondaryText }]}>
                {formatPrice(price, 'EUR')}
              </Text>
            </View>
          )
        ))}
      </View>

      <View style={[styles.calculatorDivider, { backgroundColor: theme.border }]} />

      <View style={styles.calculatorTotals}>
        <View style={styles.calculatorRow}>
          <Text style={[styles.calculatorTotalLabel, { color: theme.text }]}>
            Total (EUR)
          </Text>
          <Text style={[styles.calculatorTotalPrice, { color: theme.text }]}>
            {formatPrice(kitCost.totalEur, 'EUR')}
          </Text>
        </View>
        <View style={styles.calculatorRow}>
          <Text style={[styles.calculatorTotalLabel, { color: theme.text }]}>
            Total (USD)
          </Text>
          <Text style={[styles.calculatorTotalPrice, { color: theme.text }]}>
            {formatPrice(kitCost.totalUsd, 'USD')}
          </Text>
        </View>
      </View>

      <Text style={[styles.calculatorDisclaimer, { color: theme.secondaryText }]}>
        * Prices are estimates based on typical retail pricing. Visit retailers for current prices.
      </Text>

      <View style={styles.buySetupContainer}>
        <TouchableOpacity
          onPress={() => handleBuySetupPress('sweetwater')}
          style={[styles.buySetupButton, styles.buySetupButtonUS]}
          accessibilityRole="link"
          accessibilityLabel={`Buy ${drummer.name}'s setup at Sweetwater`}
        >
          <Text style={styles.buySetupButtonText}>Buy This Setup (US)</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleBuySetupPress('thomann')}
          style={[styles.buySetupButton, styles.buySetupButtonEU]}
          accessibilityRole="link"
          accessibilityLabel={`Buy ${drummer.name}'s setup at Thomann`}
        >
          <Text style={styles.buySetupButtonText}>Buy This Setup (EU)</Text>
        </TouchableOpacity>
      </View>
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
        <ImageWithFallback
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
        <GearSection title="Drums" content={drummer.gear.drums} theme={theme} gearType="drums" />
        <GearSection title="Snare" content={drummer.gear.snare} theme={theme} gearType="snare" />
        <GearSection title="Cymbals" content={drummer.gear.cymbals} theme={theme} gearType="cymbals" />
        <GearSection title="Hardware" content={drummer.gear.hardware} theme={theme} gearType="hardware" />
        {drummer.gear.sticks && (
          <GearSection title="Sticks" content={drummer.gear.sticks} theme={theme} gearType="sticks" />
        )}
      </View>

      <KitCostCalculator drummer={drummer} theme={theme} />

      {drummer.photos && drummer.photos.length > 0 && (
        <View style={[styles.section, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]} accessibilityRole="header">Photo Gallery</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.gallery}>
            {drummer.photos.map((photo, index) => (
              <ImageWithFallback
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

      {drummer.videos && drummer.videos.length > 0 && (
        <View style={[styles.section, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]} accessibilityRole="header">Drum Cam Videos</Text>
          <View style={styles.videosContainer}>
            {drummer.videos.map((video, index) => (
              <VideoCard key={index} video={video} theme={theme} />
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
  shopLinksContainer: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 8,
  },
  shopButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
  },
  shopButtonUS: {
    backgroundColor: '#1a5276',
  },
  shopButtonEU: {
    backgroundColor: '#1e8449',
  },
  shopButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
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
  videosContainer: {
    gap: 16,
  },
  videoCard: {
    marginBottom: 16,
  },
  videoContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#000',
    position: 'relative',
  },
  videoThumbnail: {
    width: '100%',
    height: '100%',
  },
  playButtonOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  playButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.9,
  },
  playButtonText: {
    fontSize: 24,
    marginLeft: 4,
  },
  videoInfo: {
    paddingTop: 8,
  },
  videoTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  videoYear: {
    fontSize: 12,
  },
  videoLink: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoLinkText: {
    fontSize: 16,
    fontWeight: '600',
  },
  // Kit Cost Calculator styles
  calculatorSection: {
    borderWidth: 2,
  },
  calculatorTitle: {
    marginBottom: 4,
  },
  calculatorSubtitle: {
    fontSize: 14,
    marginBottom: 16,
  },
  calculatorItems: {
    gap: 8,
  },
  calculatorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  calculatorLabel: {
    fontSize: 15,
  },
  calculatorPrice: {
    fontSize: 15,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  calculatorDivider: {
    height: 1,
    marginVertical: 12,
  },
  calculatorTotals: {
    gap: 4,
    marginBottom: 8,
  },
  calculatorTotalLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  calculatorTotalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  calculatorDisclaimer: {
    fontSize: 11,
    fontStyle: 'italic',
    marginTop: 8,
    marginBottom: 16,
  },
  buySetupContainer: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
  buySetupButton: {
    flex: 1,
    minWidth: 140,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  buySetupButtonUS: {
    backgroundColor: '#1a5276',
  },
  buySetupButtonEU: {
    backgroundColor: '#1e8449',
  },
  buySetupButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
