import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Switch } from 'react-native';
import { ThemeProvider, useTheme } from './ThemeContext';

function AppContent() {
  const { theme, isDarkMode, toggleTheme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>
        Welcome to WebAppLab
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  toggleLabel: {
    fontSize: 16,
  },
});
