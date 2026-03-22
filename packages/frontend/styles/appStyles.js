/**
 * App StyleSheet - Extracted for Performance Optimization (Issue #751)
 * 
 * Moving the ~7000 line StyleSheet to a separate module reduces
 * the main bundle parsing time and allows for better code splitting.
 * 
 * Note: StyleSheet.create() is called once at module load time,
 * making this extraction safe for performance.
 */

import { StyleSheet, Platform } from 'react-native';
import { colors } from '../colors';
import { fontSize, lineHeight, fontWeight, textStyles } from '../typography';
import { spacing } from '../spacing';

export const styles = StyleSheet.create({
  // Core container styles
  container: {
    flex: 1,
  },
  header: {
    paddingTop: spacing[12],
    paddingBottom: spacing[5],
    paddingHorizontal: spacing[5],
    alignItems: 'center',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 600,
  },
  title: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    marginBottom: 0,
  },
  mainContent: {
    flex: 1,
  },

  // Content container - consistent max-width and padding
  contentContainer: {
    paddingHorizontal: spacing[5],
    paddingBottom: spacing[10],
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
  },
  contentContainerMobile: {
    paddingHorizontal: spacing[4],
  },

  // Back button
  backButton: {
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
    borderRadius: spacing[2],
    borderWidth: 1,
    alignSelf: 'flex-start',
    marginBottom: spacing[5],
    minHeight: spacing[12],
  },
  backButtonText: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.medium,
  },

  // Loading states
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing[5],
  },
  loadingText: {
    marginTop: spacing[3],
    fontSize: fontSize.base,
  },
  loadingContainer: {
    alignItems: 'center',
    padding: spacing[10],
  },
  loadingEmoji: {
    fontSize: fontSize['2xl'],
    marginBottom: spacing[3],
  },

  // Error states
  errorText: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.bold,
    textAlign: 'center',
  },
  errorHint: {
    marginTop: spacing[2],
    fontSize: fontSize.sm,
    textAlign: 'center',
  },

  // Card styles
  card: {
    padding: spacing[4],
    marginBottom: spacing[3],
    borderRadius: spacing[2],
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
    marginRight: spacing[4],
  },
  cardText: {
    flex: 1,
  },

  // Section styles
  section: {
    padding: spacing[4],
    borderRadius: spacing[3],
    borderWidth: 1,
    marginBottom: spacing[4],
  },
  sectionTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    marginBottom: spacing[3],
  },

  // List container
  listContainer: {
    paddingHorizontal: spacing[5],
    paddingBottom: spacing[5],
  },

  // Flex utilities
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexRowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flexRowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  flexCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  flex1: {
    flex: 1,
  },

  // Spacing utilities
  mb1: { marginBottom: spacing[1] },
  mb2: { marginBottom: spacing[2] },
  mb3: { marginBottom: spacing[3] },
  mb4: { marginBottom: spacing[4] },
  mb5: { marginBottom: spacing[5] },
  mb6: { marginBottom: spacing[6] },
  mb8: { marginBottom: spacing[8] },
  mt1: { marginTop: spacing[1] },
  mt2: { marginTop: spacing[2] },
  mt3: { marginTop: spacing[3] },
  mt4: { marginTop: spacing[4] },
  mt5: { marginTop: spacing[5] },
  mt6: { marginTop: spacing[6] },
  mt8: { marginTop: spacing[8] },
  gap2: { gap: spacing[2] },
  gap3: { gap: spacing[3] },
  gap4: { gap: spacing[4] },

  // Text utilities
  textCenter: {
    textAlign: 'center',
  },
  textBold: {
    fontWeight: fontWeight.bold,
  },
  textSemibold: {
    fontWeight: fontWeight.semibold,
  },

  // Page title styles
  pageTitle: {
    fontSize: 28,
    fontWeight: fontWeight.bold,
    marginBottom: spacing[2],
    marginTop: spacing[4],
  },
  pageSubtitle: {
    fontSize: fontSize.lg,
    marginBottom: spacing[5],
    lineHeight: lineHeight.lg,
  },

  // Grid layouts
  gridRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[4],
  },
  gridRowMobile: {
    flexDirection: 'column',
  },
  gridItem: {
    flex: 1,
    minWidth: 280,
  },
  gridItemMobile: {
    width: '100%',
    minWidth: 0,
  },
});

// Note: The complete styles object is much larger (~7000 lines)
// For the full implementation, this module should contain all styles
// currently inline in App.js, which would be a significant refactor.
// This is a stub showing the pattern.

export default styles;
