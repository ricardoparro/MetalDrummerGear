/**
 * Components index - Re-export all components for cleaner imports
 */

// Quiz Share Buttons (Issue #678)
export { QuizShareButtons, trackQuizShare, getShareUrl, getShareText, shareHandlers } from './QuizShareButtons';

// Sound Like Guides (Issue #685)
export { 
  GuidesHubPage, 
  GuidePage, 
  isGuidesHubPage, 
  isGuidePage, 
  getGuideSlugFromURL 
} from './SoundLikeGuides';

// Metal Drummer Name Generator (Issue #704)
export {
  MetalDrummerNameGeneratorPage,
  isNameGeneratorPage,
  updateNameGeneratorMeta,
  trackNameGenerate,
  trackNameShare,
  trackDrummerMatchClick
} from './MetalDrummerNameGenerator';

// Gear Comparison Tool (Issue #721, #732)
export {
  default as GearComparisonToolPage,
  isGearComparisonToolPage,
  isShortCompareRoute,
  updateGearComparisonToolMeta,
  trackComparisonView,
  trackComparisonGenerate,
  trackComparisonShare,
  trackComparisonVote,
  trackComparisonAffiliateClick,
  getComparisonSlugsFromURL,
  updateComparisonURL,
  TOP_20_COMPARISONS
} from './GearComparisonTool';

// Kit Builder (Issue #724)
export {
  KIT_BUILDER_CATALOG,
  KIT_CATEGORIES,
  PRESET_KITS,
  BUDGET_TEMPLATES,
  isKitBuilderPage,
  getKitFromURL,
  updateKitURL,
  generateShareableURL,
  calculateKitStats,
  getRecommendations,
  findSimilarDrummers,
  generateKitSchema,
  getKitBuilderThomannLink,
  getKitBuilderSweetwaterLink,
  trackKitBuilderEvent,
  kitBuilderStyles
} from './KitBuilder';

// Signature Gear Spotlight (Issue #739)
export {
  SignatureGearSpotlightPage,
  isSignatureGearPage,
  isSignatureGearListPage,
  getGearSlugFromURL,
  getDrummerSlugFromGearURL,
  updateSignatureGearMeta
} from './SignatureGearSpotlight';
