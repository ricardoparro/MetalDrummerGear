let newsCache = {
  items: [],
  lastFetch: null,
};

function getNewsCache() {
  return newsCache;
}

function setNewsCache(items) {
  newsCache = {
    items,
    lastFetch: new Date().toISOString(),
  };
}

/**
 * Get news for a specific drummer by name or slug
 * @param {string} drummerIdentifier - Drummer name or slug
 * @returns {Array} Matching news items
 */
function getNewsForDrummer(drummerIdentifier) {
  const identifier = drummerIdentifier.toLowerCase();
  return newsCache.items.filter(item =>
    item.drummers.some(d =>
      d.name.toLowerCase() === identifier ||
      d.slug?.toLowerCase() === identifier
    )
  );
}

/**
 * Get news for a specific band by name or slug
 * @param {string} bandIdentifier - Band name or slug
 * @returns {Array} Matching news items
 */
function getNewsForBand(bandIdentifier) {
  const identifier = bandIdentifier.toLowerCase();
  return newsCache.items.filter(item =>
    item.bands.some(b =>
      b.name.toLowerCase() === identifier ||
      b.slug?.toLowerCase() === identifier
    )
  );
}

/**
 * Get high confidence news only
 * @returns {Array} News items with at least one high confidence match
 */
function getHighConfidenceNews() {
  return newsCache.items.filter(item =>
    item.drummers.some(d => d.confidence === 'high') ||
    item.bands.some(b => b.confidence === 'high')
  );
}

/**
 * Get cross-validated news (drummer + band match in same article)
 * @returns {Array} News items with cross-validated matches
 */
function getCrossValidatedNews() {
  return newsCache.items.filter(item =>
    item.drummers.some(d => d.crossValidated) ||
    item.bands.some(b => b.crossValidated)
  );
}

module.exports = {
  getNewsCache,
  setNewsCache,
  getNewsForDrummer,
  getNewsForBand,
  getHighConfidenceNews,
  getCrossValidatedNews,
};
