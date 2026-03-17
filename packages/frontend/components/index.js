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

// Gear Comparison Tool (Issue #721)
export {
  default as GearComparisonToolPage,
  isGearComparisonToolPage,
  updateGearComparisonToolMeta,
  trackComparisonView,
  trackComparisonGenerate,
  trackComparisonShare,
  trackComparisonVote,
  trackComparisonAffiliateClick,
  getComparisonSlugsFromURL,
  updateComparisonURL
} from './GearComparisonTool';
