/**
 * Components index - Re-export all components for cleaner imports
 */

// SEO Head - Social Meta Tags (Issue #769)
export {
  SeoHead,
  SEO_CONFIGS,
  getDrummerSeo,
  getVsComparisonSeo,
  getSoundLikeSeo,
} from './SeoHead';

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

// Gear Cards Gallery (Issue #747)
export {
  GearCardsGalleryPage,
  isGearCardsPage,
  updateGearCardsMeta,
  trackCardEvent
} from './GearCardsGallery';

// Signature Licks Database (Issue #749)
export {
  LicksHubPage,
  LickDetailPage,
  isLicksHubPage,
  isLickDetailPage,
  isLicksPage,
  getDrummerSlugFromLicksURL,
  getLickSlugFromURL,
  updateLickMeta,
  updateLicksHubMeta
} from './SignatureLicks';

// Dream Setup Builder (Issue #761)
export {
  default as DreamSetupBuilderPage,
  isSetupBuilderPage,
  getSetupFromURL,
  updateSetupURL,
  generateShareableURL as generateSetupShareableURL,
  updateSetupBuilderMeta,
  calculateTotalCost as calculateSetupTotalCost,
  findGearById,
  getRecommendedGear,
  findSimilarDrummers as findSetupSimilarDrummers,
  getSmartSuggestions,
  getSetupBuilderThomannLink,
  getSetupBuilderSweetwaterLink,
  generateSetupSchema,
  trackSetupBuilderEvent,
  BUDGET_OPTIONS,
  GENRE_OPTIONS,
  SKILL_OPTIONS,
  PRIORITY_OPTIONS,
  WIZARD_STEPS,
  SETUP_CATEGORIES,
} from './DreamSetupBuilder';

// Tier List Builder (Issue #763)
export {
  default as TierListBuilderPage,
  isTierListPage,
  isTierListSharePage,
  getTierListIdFromUrl,
  updateTierListMeta,
  getTierListShareUrl,
  trackTierListEvent,
  TIER_CONFIG,
  TIER_ORDER,
  PRESET_CATEGORIES,
} from './TierListBuilder';

// Gear Card Share Component (Issue #764)
export {
  GearCardShare,
  GearCardShareInline,
  trackGearCardEvent,
  getCardUrl,
} from './GearCardShare';

// Drummer Gear Evolution Timeline (Issue #767)
export {
  DrummerEvolutionPage,
  default as DrummerEvolutionPageDefault,
} from './DrummerEvolutionPage';

// Sticky CTA - Conversion Optimization (Issue #820)
export {
  default as StickyCTA,
} from './StickyCTA';

// Wishlist - Conversion Funnel (Issue #823)
export {
  default as WishlistPage,
  isWishlistPage,
  updateWishlistMeta,
} from './WishlistPage';

export {
  default as WishlistButton,
  WishlistBadge,
  FloatingWishlistButton,
} from './WishlistButton';
