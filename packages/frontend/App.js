import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Switch, FlatList, ActivityIndicator } from 'react-native';
import { ThemeProvider, useTheme } from './ThemeContext';
import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3001/api/drummers';

function DrummerCard({ drummer, theme }) {
  return (
    <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <Text style={[styles.drummerName, { color: theme.text }]}>{drummer.name}</Text>
      <Text style={[styles.drummerBand, { color: theme.secondaryText }]}>{drummer.band}</Text>
      <Text style={[styles.drummerGenre, { color: theme.secondaryText }]}>{drummer.genre}</Text>
    </View>
  );
}

function DrummerList({ theme }) {
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
      renderItem={({ item }) => <DrummerCard drummer={item} theme={theme} />}
      contentContainerStyle={styles.listContainer}
    />
  );
}

function AppContent() {
  const { theme, isDarkMode, toggleTheme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>
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
          />
        </View>
      </View>
      <DrummerList theme={theme} />
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
});
