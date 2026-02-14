/**
 * Band data structure for MetalForge
 * Issue #360: Add comprehensive Slayer band data
 */
export const bands = {
  metallica: { slug: "metallica", name: "Metallica", formed: 1981, origin: "Los Angeles", genres: ["thrash-metal"], status: "active", metaTitle: "Metallica Drummers | MetalForge", metaDescription: "Lars Ulrich biography", summary: "Metallica formed 1981", keywords: ["metallica"], drummerHistory: [{ drummer: "lars-ulrich", period: "1981-present", notes: "Founder" }], relatedBands: ["slayer"] },
  slayer: { slug: "slayer", name: "Slayer", formed: 1981, disbanded: 2019, origin: "Huntington Park, CA", genres: ["thrash-metal", "speed-metal"], status: "disbanded", metaTitle: "Slayer Drummer History | MetalForge", metaDescription: "Dave Lombardo and Paul Bostaph", summary: "Big Four of thrash", keywords: ["slayer", "lombardo", "bostaph", "dette"], history: { formation: "Formed 1981", legacy: "Reign in Blood", disbandment: "Final show 2019" }, achievements: ["2 Grammys", "35M albums", "Big Four"], discography: [{ album: "Reign in Blood", year: 1986, drummer: "dave-lombardo", note: "Masterpiece" }, { album: "Divine Intervention", year: 1994, drummer: "paul-bostaph" }, { album: "Repentless", year: 2015, drummer: "paul-bostaph", note: "Final" }], drummerHistory: [{ drummer: "dave-lombardo", period: "1981-1992", notes: "Founder" }, { drummer: "paul-bostaph", period: "1992-2001", notes: "First tenure" }, { drummer: "jon-dette", period: "1996-1997", notes: "Fill-in" }, { drummer: "dave-lombardo", period: "2001-2013", notes: "Return" }, { drummer: "paul-bostaph", period: "2013-2019", notes: "Final" }], faq: [{ question: "Original drummer?", answer: "Dave Lombardo" }, { question: "How many drummers?", answer: "3: Lombardo, Bostaph, Dette" }, { question: "Final tour?", answer: "Paul Bostaph 2018-2019" }], relatedBands: ["metallica", "megadeth", "anthrax"] }
};
export function getBand(slug) { return bands[slug] || null; }
export function getAllBands() { return Object.values(bands); }
export function getAllBandSlugs() { return Object.keys(bands); }
export function hasBand(slug) { return slug in bands; }
export function hasFaq(slug) { const b = bands[slug]; return b && Array.isArray(b.faq) && b.faq.length > 0; }
export default bands;
