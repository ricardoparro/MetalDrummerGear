/**
 * Skeleton Components for CLS (Cumulative Layout Shift) Prevention
 * 
 * These components reserve space during loading to prevent layout shifts.
 * Dimensions match the actual components they replace.
 * 
 * Usage:
 * - Use <DrummerCardSkeleton /> while drummers are loading
 * - Use <SearchBarSkeleton /> while search initializes
 * - Use <FilterBarSkeleton /> while filters load
 */

import { View, StyleSheet, Platform } from 'react-native';
import { useTheme } from './ThemeContext';
import { SKELETON_DIMENSIONS } from './cwvUtils';

// Shimmer animation keyframes (web only)
const shimmerKeyframes = Platform.OS === 'web' ? `
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
` : '';

// Inject shimmer animation once
if (Platform.OS === 'web' && typeof document !== 'undefined') {
  const existingStyle = document.getElementById('skeleton-shimmer');
  if (!existingStyle) {
    const style = document.createElement('style');
    style.id = 'skeleton-shimmer';
    style.textContent = shimmerKeyframes;
    document.head.appendChild(style);
  }
}

/**
 * Base skeleton component with optional shimmer animation
 */
function SkeletonBase({ style, shimmer = true, children }) {
  const { theme } = useTheme();

  const baseStyle = {
    backgroundColor: theme.card || '#2a2a2a',
    overflow: 'hidden',
  };

  // Add shimmer effect on web
  const webShimmerStyle = Platform.OS === 'web' && shimmer ? {
    background: `linear-gradient(90deg, ${theme.card || '#2a2a2a'} 25%, ${theme.border || '#3a3a3a'} 50%, ${theme.card || '#2a2a2a'} 75%)`,
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s infinite ease-in-out',
  } : {};

  return (
    <View style={[baseStyle, style, webShimmerStyle]}>
      {children}
    </View>
  );
}

/**
 * Drummer Card Skeleton
 * Matches the layout of DrummerCard component
 */
export function DrummerCardSkeleton({ index = 0 }) {
  const { theme } = useTheme();
  const dims = SKELETON_DIMENSIONS.drummerCard;
  const imgDims = SKELETON_DIMENSIONS.images.thumbnail;

  return (
    <SkeletonBase
      style={[
        styles.drummerCard,
        {
          height: dims.height,
          marginBottom: dims.marginBottom,
          borderRadius: dims.borderRadius,
          borderWidth: 1,
          borderColor: theme.border || '#3a3a3a',
        }
      ]}
    >
      <View style={styles.cardContent}>
        {/* Image placeholder */}
        <SkeletonBase
          style={[
            styles.imageCircle,
            {
              width: imgDims.width,
              height: imgDims.height,
              borderRadius: imgDims.width / 2,
            }
          ]}
          shimmer={false}
        />
        {/* Text placeholders */}
        <View style={styles.textContainer}>
          <SkeletonBase
            style={[styles.textLine, styles.nameLine]}
            shimmer={false}
          />
          <SkeletonBase
            style={[styles.textLine, styles.bandLine]}
            shimmer={false}
          />
          <SkeletonBase
            style={[styles.textLine, styles.genreLine]}
            shimmer={false}
          />
        </View>
      </View>
    </SkeletonBase>
  );
}

/**
 * Drummer List Skeleton
 * Shows multiple card skeletons during initial load
 */
export function DrummerListSkeleton({ count = 6 }) {
  return (
    <View style={styles.listContainer}>
      {Array.from({ length: count }).map((_, index) => (
        <DrummerCardSkeleton key={index} index={index} />
      ))}
    </View>
  );
}

/**
 * Search Bar Skeleton
 * Matches the layout of SearchBar component
 */
export function SearchBarSkeleton() {
  const { theme } = useTheme();
  const dims = SKELETON_DIMENSIONS.searchBar;

  return (
    <SkeletonBase
      style={[
        styles.searchBar,
        {
          height: dims.height,
          marginBottom: dims.marginBottom,
          borderRadius: dims.borderRadius,
          borderWidth: 1,
          borderColor: theme.border || '#3a3a3a',
        }
      ]}
    >
      <View style={styles.searchContent}>
        {/* Search icon placeholder */}
        <SkeletonBase
          style={styles.searchIcon}
          shimmer={false}
        />
        {/* Input placeholder */}
        <SkeletonBase
          style={styles.searchInput}
          shimmer={false}
        />
      </View>
    </SkeletonBase>
  );
}

/**
 * Filter Bar Skeleton
 * Matches the layout of FilterBar component
 */
export function FilterBarSkeleton() {
  const { theme } = useTheme();
  const dims = SKELETON_DIMENSIONS.filterBar;

  return (
    <SkeletonBase
      style={[
        styles.filterBar,
        {
          height: dims.height,
          marginBottom: dims.marginBottom,
        }
      ]}
    >
      <View style={styles.filterContent}>
        {/* Filter chips placeholders */}
        {[1, 2, 3, 4].map((i) => (
          <SkeletonBase
            key={i}
            style={styles.filterChip}
            shimmer={false}
          />
        ))}
      </View>
    </SkeletonBase>
  );
}

/**
 * Hero Section Skeleton
 * Matches the layout of the new hero section with prominent search CTA (Issue #493)
 */
export function HeroSectionSkeleton() {
  const { theme } = useTheme();
  const dims = SKELETON_DIMENSIONS.heroSection;

  return (
    <SkeletonBase
      style={[
        styles.heroSection,
        {
          minHeight: dims.height,
          marginBottom: dims.marginBottom,
          paddingTop: dims.paddingTop || 48,
          paddingBottom: dims.paddingBottom || 32,
          paddingHorizontal: 20,
        }
      ]}
    >
      <View style={styles.heroContentNew}>
        {/* Emoji placeholder */}
        <SkeletonBase
          style={{ width: 48, height: 48, borderRadius: 24, marginBottom: 16 }}
          shimmer={false}
        />
        {/* Headline placeholder */}
        <SkeletonBase 
          style={[styles.textLine, { width: '80%', height: 24, marginBottom: 8 }]} 
          shimmer={false} 
        />
        <SkeletonBase 
          style={[styles.textLine, { width: '60%', height: 24, marginBottom: 24 }]} 
          shimmer={false} 
        />
        {/* Search input placeholder */}
        <SkeletonBase
          style={{
            width: '100%',
            maxWidth: 600,
            height: 56,
            borderRadius: 12,
            marginBottom: 16,
            borderWidth: 2,
            borderColor: theme.border || '#3a3a3a',
          }}
          shimmer={false}
        />
        {/* Stats line placeholder */}
        <SkeletonBase 
          style={[styles.textLine, { width: 200, height: 14 }]} 
          shimmer={false} 
        />
      </View>
    </SkeletonBase>
  );
}

/**
 * Image Skeleton
 * Placeholder for images with specific dimensions
 */
export function ImageSkeleton({ width = 60, height = 60, borderRadius = 8, style }) {
  return (
    <SkeletonBase
      style={[
        {
          width,
          height,
          borderRadius,
        },
        style
      ]}
    />
  );
}

/**
 * Spotlight Section Skeleton
 * Matches the layout of DrummerSpotlight component (Issue #312)
 * Reserves exact space to prevent CLS
 */
export function SpotlightSkeleton() {
  const { theme } = useTheme();
  const dims = SKELETON_DIMENSIONS.spotlightSection;
  const imgDims = SKELETON_DIMENSIONS.images.spotlight;

  return (
    <SkeletonBase
      style={[
        styles.spotlightSection,
        {
          minHeight: dims.minHeight,
          marginHorizontal: dims.marginHorizontal,
          marginBottom: dims.marginBottom,
          borderRadius: dims.borderRadius,
          borderWidth: 1,
          borderColor: theme.border || '#3a3a3a',
        }
      ]}
    >
      <View style={styles.spotlightContent}>
        {/* Spotlight label placeholder */}
        <View style={styles.spotlightHeader}>
          <SkeletonBase style={[styles.textLine, { width: 140, height: 14 }]} shimmer={false} />
          <SkeletonBase style={[styles.textLine, { width: 70, height: 12 }]} shimmer={false} />
        </View>
        
        <View style={styles.spotlightBody}>
          {/* Spotlight image placeholder */}
          <SkeletonBase
            style={[
              styles.spotlightImage,
              {
                width: imgDims.width,
                height: imgDims.height,
                borderRadius: 12,
              }
            ]}
            shimmer={false}
          />
          
          {/* Spotlight text content */}
          <View style={styles.spotlightInfo}>
            <SkeletonBase style={[styles.textLine, { width: '70%', height: 20 }]} shimmer={false} />
            <SkeletonBase style={[styles.textLine, { width: '50%', height: 14, marginTop: 6 }]} shimmer={false} />
            
            {/* Quick facts placeholders */}
            <View style={styles.spotlightFacts}>
              <SkeletonBase style={[styles.textLine, { width: '90%', height: 12, marginTop: 12 }]} shimmer={false} />
              <SkeletonBase style={[styles.textLine, { width: '80%', height: 12, marginTop: 6 }]} shimmer={false} />
              <SkeletonBase style={[styles.textLine, { width: '85%', height: 12, marginTop: 6 }]} shimmer={false} />
            </View>
            
            {/* CTA buttons placeholder */}
            <View style={styles.spotlightCTAs}>
              <SkeletonBase style={[styles.ctaButton, { width: 120, height: 36 }]} shimmer={false} />
              <SkeletonBase style={[styles.ctaButton, { width: 100, height: 36, marginLeft: 8 }]} shimmer={false} />
            </View>
          </View>
        </View>
      </View>
    </SkeletonBase>
  );
}

/**
 * Full Page Loading Skeleton
 * Complete skeleton for initial page load
 */
export function PageLoadingSkeleton() {
  return (
    <View style={styles.pageContainer}>
      <HeroSectionSkeleton />
      <FilterBarSkeleton />
      <SpotlightSkeleton />
      <DrummerListSkeleton count={6} />
    </View>
  );
}

const styles = StyleSheet.create({
  // Drummer Card
  drummerCard: {
    overflow: 'hidden',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    height: '100%',
  },
  imageCircle: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  textLine: {
    height: 12,
    borderRadius: 6,
    marginBottom: 6,
  },
  nameLine: {
    width: '70%',
    height: 16,
  },
  bandLine: {
    width: '50%',
    height: 12,
  },
  genreLine: {
    width: '40%',
    height: 10,
  },

  // List
  listContainer: {
    paddingHorizontal: 16,
  },

  // Search Bar
  searchBar: {
    overflow: 'hidden',
    marginHorizontal: 16,
  },
  searchContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: '100%',
  },
  searchIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    height: 16,
    borderRadius: 8,
  },

  // Filter Bar
  filterBar: {
    marginHorizontal: 16,
    overflow: 'hidden',
  },
  filterContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    height: '100%',
  },
  filterChip: {
    width: 80,
    height: 32,
    borderRadius: 16,
    marginHorizontal: 4,
  },

  // Hero Section
  heroSection: {
    overflow: 'hidden',
  },
  heroContent: {
    flexDirection: 'row',
    padding: 16,
    height: '100%',
  },
  heroContentNew: {
    alignItems: 'center',
    maxWidth: 600,
    alignSelf: 'center',
    width: '100%',
  },
  heroImage: {
    width: 120,
    height: 120,
    borderRadius: 12,
    marginRight: 16,
  },
  heroText: {
    flex: 1,
    justifyContent: 'center',
  },

  // Page Container
  pageContainer: {
    flex: 1,
    paddingTop: 16,
  },
  
  // Spotlight Section
  spotlightSection: {
    overflow: 'hidden',
  },
  spotlightContent: {
    padding: 16,
  },
  spotlightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  spotlightBody: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  spotlightImage: {
    marginRight: 16,
  },
  spotlightInfo: {
    flex: 1,
  },
  spotlightFacts: {
    marginTop: 8,
  },
  spotlightCTAs: {
    flexDirection: 'row',
    marginTop: 16,
  },
  ctaButton: {
    borderRadius: 8,
  },
});

export default {
  DrummerCardSkeleton,
  DrummerListSkeleton,
  SearchBarSkeleton,
  FilterBarSkeleton,
  HeroSectionSkeleton,
  SpotlightSkeleton,
  ImageSkeleton,
  PageLoadingSkeleton,
};
