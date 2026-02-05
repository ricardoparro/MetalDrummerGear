// URL helper functions - shared across components
import { Platform } from 'react-native';

// Convert name to URL-friendly slug
export function toSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Helper to get quiz match slug from URL (supports /quiz?match=slug)
export function getQuizMatchFromURL() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  return params.get('match') || null;
}

// Helper to update quiz result URL
export function updateQuizResultURL(drummerSlug) {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return;
  const newPath = drummerSlug ? `/quiz?match=${drummerSlug}` : '/quiz';
  window.history.replaceState({}, '', newPath);
}

// Helper to get/set URL params for shareable comparisons
export function getCompareParamsFromURL() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return [];
  const params = new URLSearchParams(window.location.search);
  const drummers = [];
  if (params.get('d1')) drummers.push(params.get('d1'));
  if (params.get('d2')) drummers.push(params.get('d2'));
  if (params.get('d3')) drummers.push(params.get('d3'));
  return drummers;
}

export function updateCompareURL(drummerIds) {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return;
  const params = new URLSearchParams();
  drummerIds.forEach((id, index) => {
    if (id) params.set(`d${index + 1}`, id);
  });
  const newPath = drummerIds.length > 0 ? `/compare?${params.toString()}` : '/';
  window.history.replaceState({}, '', newPath);
}

// Update document meta tags for quiz social sharing (Open Graph + Twitter Cards)
export function updateQuizMeta(drummer, matchPercentage) {
  if (Platform.OS !== 'web' || typeof document === 'undefined') return;

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

  if (drummer) {
    // Shared result page meta
    const title = `I matched with ${drummer.name} (${drummer.band}) - ${matchPercentage}% Match! | Metal Drummer Quiz`;
    const description = `Take the Metal Drummer Quiz and discover which legendary metal drummer matches your playing style! I got ${drummer.name} from ${drummer.band}.`;
    const imageUrl = drummer.image || 'https://metalforge.io/og-quiz.png';
    const shareUrl = `https://metalforge.io/quiz?match=${toSlug(drummer.name)}`;

    document.title = title;
    setMeta('description', description);
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:type', 'website', true);
    setMeta('og:image', imageUrl, true);
    setMeta('og:url', shareUrl, true);
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', imageUrl);
  } else {
    // Default quiz page meta
    const title = 'Find Your Drummer Match | Metal Drummer Quiz';
    const description = 'Take our quiz to discover which legendary metal drummer matches your playing style! Answer 7 questions and find your drummer soulmate.';

    document.title = title;
    setMeta('description', description);
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:type', 'website', true);
    setMeta('og:image', 'https://metalforge.io/og-quiz.png', true);
    setMeta('og:url', 'https://metalforge.io/quiz', true);
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', 'https://metalforge.io/og-quiz.png');
  }
}
