/**
 * Band data structure for MetalForge
 * Contains band information with drummer history
 * Issue #359: Added Sepultura band data
 */

export const bands = {
  metallica: {
    slug: "metallica",
    name: "Metallica",
    formed: 1981,
    origin: "Los Angeles, California, USA",
    genres: ["thrash-metal", "heavy-metal"],
    status: "active",
    metaTitle: "Metallica - Drummer History & Gear | MetalForge",
    metaDescription: "Explore Metallica drumming legacy with Lars Ulrich.",
    summary: "Metallica, formed in 1981 in Los Angeles, is one of the most influential thrash metal bands.",
    keywords: ["metallica", "lars ulrich", "thrash metal", "metal drums", "drummer gear"],
    drummerHistory: [{ drummer: "lars-ulrich", period: "1981-present", notes: "Co-founder" }],
    relatedBands: ["slayer", "megadeth", "anthrax"],
  },
  sepultura: {
    slug: "sepultura",
    name: "Sepultura",
    formed: 1984,
    origin: "Belo Horizonte, Brazil",
    genres: ["thrash-metal", "groove-metal", "death-metal"],
    status: "disbanded",
    metaTitle: "Sepultura Drummer History - Igor to Eloy | MetalForge",
    metaDescription: "Complete Sepultura drummer history from Igor Cavalera to Eloy Casagrande.",
    summary: "Sepultura formed 1984, Brazilian thrash pioneers, disbanded 2024.",
    keywords: ["sepultura", "igor cavalera", "eloy casagrande", "brazilian metal"],
    drummerHistory: [
      { drummer: "igor-cavalera", period: "1984-2006", notes: "Co-founder with brother Max" },
      { drummer: "jean-dolabella", period: "2006-2011", notes: "" },
      { drummer: "eloy-casagrande", period: "2011-2024", notes: "Final drummer, now in Slipknot" }
    ],
    relatedBands: ["soulfly", "cavalera-conspiracy", "slipknot"],
    faq: [
      { q: "Is Sepultura still active?", a: "No, they completed a farewell tour in 2024." },
      { q: "Who was Sepultura's last drummer?", a: "Eloy Casagrande (2011-2024), now in Slipknot." },
      { q: "Why did Igor Cavalera leave?", a: "He left in 2006 due to conflicts with management." }
    ],
  },
};

export function getBand(slug) { return bands[slug] || null; }
export function getAllBandSlugs() { return Object.keys(bands); }
export function hasBand(slug) { return slug in bands; }
export function hasFaq(slug) { const band = bands[slug]; return band && Array.isArray(band.faq) && band.faq.length > 0; }
export function getBandFaq(slug) { const band = bands[slug]; return band?.faq || null; }
export default bands;
