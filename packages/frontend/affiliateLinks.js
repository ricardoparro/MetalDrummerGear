// Affiliate Links Configuration
// Thomann (EU) and Sweetwater (US) affiliate link generators

// Affiliate IDs - Replace with actual affiliate IDs when obtained
const THOMANN_AFFILIATE_ID = 'metaldrummergear';
const SWEETWATER_AFFILIATE_ID = 'metaldrummergear';

// UTM parameters for tracking
const UTM_SOURCE = 'metaldrummergear';
const UTM_MEDIUM = 'affiliate';

/**
 * Generate a Thomann affiliate search link (EU market)
 * @param {string} productName - The gear item name to search for
 * @param {string} gearType - Type of gear (drums, snare, cymbals, hardware, sticks)
 * @returns {string} - Thomann affiliate search URL
 */
export function getThomannLink(productName, gearType) {
  const searchQuery = encodeURIComponent(productName);
  const utmParams = `utm_source=${UTM_SOURCE}&utm_medium=${UTM_MEDIUM}&utm_campaign=${gearType}`;
  return `https://www.thomann.de/intl/search_dir.html?sw=${searchQuery}&ref=${THOMANN_AFFILIATE_ID}&${utmParams}`;
}

/**
 * Generate a Sweetwater affiliate search link (US market)
 * @param {string} productName - The gear item name to search for
 * @param {string} gearType - Type of gear (drums, snare, cymbals, hardware, sticks)
 * @returns {string} - Sweetwater affiliate search URL
 */
export function getSweetwaterLink(productName, gearType) {
  const searchQuery = encodeURIComponent(productName);
  const utmParams = `utm_source=${UTM_SOURCE}&utm_medium=${UTM_MEDIUM}&utm_campaign=${gearType}`;
  return `https://www.sweetwater.com/store/search?s=${searchQuery}&ref=${SWEETWATER_AFFILIATE_ID}&${utmParams}`;
}

/**
 * Get both affiliate links for a gear item
 * @param {string} productName - The gear item name
 * @param {string} gearType - Type of gear (drums, snare, cymbals, hardware, sticks)
 * @returns {Object} - Object containing both Thomann and Sweetwater links
 */
export function getAffiliateLinks(productName, gearType) {
  return {
    thomann: getThomannLink(productName, gearType),
    sweetwater: getSweetwaterLink(productName, gearType),
  };
}

/**
 * Extract the primary product name for better search results
 * Takes the first product mentioned (before comma) for cleaner search queries
 * @param {string} gearContent - Full gear description string
 * @returns {string} - Primary product name
 */
export function extractPrimaryProduct(gearContent) {
  if (!gearContent) return '';
  // Take first item before comma or full string
  const primary = gearContent.split(',')[0].trim();
  // Remove specification details in parentheses for cleaner search
  return primary.replace(/\s*\([^)]*\)\s*/g, '').trim();
}
