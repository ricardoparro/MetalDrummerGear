// Recently Viewed tracking — Issue #1240
//
// Client-only localStorage history of visited drummer/gear pages, used to power
// the homepage "Continue exploring" rail. No auth, no PII — just page identity
// (url/title/subtitle/image) plus which kind of page it was.

const STORAGE_KEY = 'metalforge_recently_viewed';
const MAX_ITEMS = 8;

function isStorageAvailable() {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') return false;
  try {
    const testKey = '__metalforge_storage_test__';
    localStorage.setItem(testKey, '1');
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
}

// Ordered most-recent-first, capped to MAX_ITEMS.
export function getRecentlyViewed() {
  if (!isStorageAvailable()) return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.slice(0, MAX_ITEMS) : [];
  } catch (e) {
    return [];
  }
}

// Record a page view. Re-viewing an already-tracked url moves it back to the front.
export function recordRecentlyViewed({ url, title, subtitle, image, type }) {
  if (!isStorageAvailable() || !url || !title) return;
  try {
    const existing = getRecentlyViewed().filter((item) => item.url !== url);
    const next = [{ url, title, subtitle, image, type }, ...existing].slice(0, MAX_ITEMS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch (e) {
    // Storage full/unavailable — degrade silently, losing history isn't fatal
  }
}
