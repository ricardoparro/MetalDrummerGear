/**
 * Drumsticks data module — foundation for the /drumsticks content hub.
 * Issue #4135 (phase 1/4): schema + seed data only. Hub pages, drummer-page
 * integration, and brand pages are separate follow-up issues.
 *
 * Stick record shape:
 *   {
 *     id: string,               // stable slug, e.g. 'vic-firth-sgk'
 *     brand: string,
 *     model: string,
 *     size: string,             // manufacturer's own size/model label
 *     diameterIn: number,       // inches
 *     lengthIn: number,         // inches
 *     material: string,
 *     tip: string,
 *     taper: string,
 *     endorsementType: 'signature-model' | 'artist-endorsement',
 *     drummerSlug?: string,     // matches the drummer's slug elsewhere in /data
 *     priceBand: 'budget' | 'mid' | 'premium',
 *     retailerUrls: { thomann?: string, sweetwater?: string, amazon?: string },
 *                                // intentionally empty until affiliate links are added
 *     source: string,           // brand/retailer domain confirming the claim
 *     notes?: string,           // caveats, e.g. possible discontinuation
 *   }
 *
 * Accuracy rule: signature/used-stick claims must cite a brand/product source
 * and are omitted if unverified — never guessed. Only adversarially-confirmed
 * entries from the issue's deep-research pass are seeded here; more drummers
 * are added as their sticks are verified.
 */

export const DRUMSTICKS = [
  {
    id: 'vic-firth-sgk',
    brand: 'Vic Firth',
    model: 'SGK',
    size: 'Signature (blends 5A/5B)',
    diameterIn: 0.585,
    lengthIn: 16,
    material: 'Hickory',
    tip: 'Barrel (wood)',
    taper: 'Medium',
    endorsementType: 'signature-model',
    drummerSlug: 'george-kollias',
    priceBand: 'budget',
    retailerUrls: {},
    source: 'vicfirth.com',
  },
  {
    id: 'vic-firth-sben',
    brand: 'Vic Firth',
    model: 'SBEN',
    size: 'Signature (Vic Grip)',
    diameterIn: 0.625,
    lengthIn: 16.625,
    material: 'Hickory',
    tip: 'Modified oval (wood)',
    taper: 'Abrupt',
    endorsementType: 'signature-model',
    drummerSlug: 'charlie-benante',
    priceBand: 'budget',
    retailerUrls: {},
    source: 'sweetwater.com',
    notes: 'May be discontinued — re-check availability before publishing buying-guide copy.',
  },
];

/** drummerSlug -> stick id[] mapping, derived from DRUMSTICKS. */
export const DRUMMER_STICKS = DRUMSTICKS.reduce((map, stick) => {
  if (!stick.drummerSlug) return map;
  if (!map[stick.drummerSlug]) map[stick.drummerSlug] = [];
  map[stick.drummerSlug].push(stick.id);
  return map;
}, {});

export function getStickById(id) {
  return DRUMSTICKS.find((stick) => stick.id === id) || null;
}

export function getSticksForDrummer(drummerSlug) {
  const ids = DRUMMER_STICKS[drummerSlug] || [];
  return ids.map(getStickById).filter(Boolean);
}
