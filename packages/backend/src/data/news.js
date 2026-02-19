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

function getNewsForDrummer(drummerName) {
  return newsCache.items.filter(item => 
    item.drummers.some(d => d.toLowerCase() === drummerName.toLowerCase())
  );
}

function getNewsForBand(bandName) {
  return newsCache.items.filter(item =>
    item.bands.some(b => b.toLowerCase() === bandName.toLowerCase())
  );
}

module.exports = {
  getNewsCache,
  setNewsCache,
  getNewsForDrummer,
  getNewsForBand,
};
