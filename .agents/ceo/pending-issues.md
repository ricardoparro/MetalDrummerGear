# Pending Issues — CEO Agent Queue

*Issues queued for creation. Run `gh issue create` for each. Created by CEO Agent when gh CLI unavailable.*

> ⚠️ **ATTENTION RICARDO**: GitHub API returns 404 for this repo from the agent environment. 3 issues are queued below waiting for creation. Please run the `gh issue create` commands at the bottom of each issue entry, OR grant API access so the agent can create issues autonomously. Ralph is currently IDLE.

---

## ⏳ Status: 3 Issues Waiting

| # | Title | Label | Score | Added |
|---|-------|-------|-------|-------|
| 1 | Gear Share Cards (CEO-014) | ai-fix | 8⭐ | 2026-04-09 |
| 2 | Gear by Brand Pages (CEO-017) | ai-fix | 7⭐ | 2026-04-09 |
| 3 | Gear Wishlist & Conversion Funnel (CEO-018) | ai-fix | 8⭐ | 2026-04-10 |

---

## 🟢 Issue #1 — READY TO CREATE

**Title:** `feat: Drummer Gear Share Cards — Auto-Generated Shareable Images (CEO-014)`

**Labels:** `ai-fix`

**Body:**
```
## Overview

Implement auto-generated shareable "Gear Cards" — beautiful PNG images for each drummer's setup that fans can download and share on social media (Reddit, Twitter, Discord, Instagram).

## Why Now

- Reddit campaign live (#805) and Drummer Digest series (#808) need visual content to maximize engagement
- We have 31+ drummers with verified gear data — this content is ready to visualize
- Each shared card = organic reach to metal fans who haven't found MetalForge yet
- Directly supports the 5,000 follower target needed to unlock Thomann affiliate
- **Score: 8⭐** (Impacto Curto: ⭐⭐⭐, Médio: ⭐⭐⭐, Longo: ⭐⭐)
- Zero external dependencies

## What to Build

### 1. API Endpoint: `/api/card/[drummer-slug]`

Returns a PNG image (using Canvas API or similar) with:
- Drummer name + band (large, bold)
- Total setup cost (prominent)
- Top 5 gear items (drums, cymbals, pedals)
- MetalForge.io logo + URL watermark
- Dark metal aesthetic (black background, orange/red accents matching brand)

**Example:** `GET /api/card/joey-jordison` → PNG image

### 2. Download Button on Each Drummer Profile Page

Add "📸 Share Setup" button to each drummer's page:
- Clicking → fetches `/api/card/[slug]` → triggers browser download
- Label: "Download & Share"
- Positioned near drummer header (prominent placement)

### 3. Card Design Specs

```
Dimensions: 1200×675px (Twitter/LinkedIn) + 1080×1080px (Instagram square)
Background: #0a0a0a (near black)
Title: Drummer name in heavy metal font (bold, white)
Band: Italic, gray
Gear list: Clean monospace/system font, gear name + cost
Total cost: Large, metalforge orange (#e85d04 or brand color)
Footer: "metalforge.io" with logo
Watermark: Subtle, bottom right
```

### 4. Pre-Generated Gallery (optional, if time allows)

`/cards` page showing cards for all drummers as a preview gallery.

## Files Likely Involved

- `packages/frontend/api/card/[slug].js` — New serverless API endpoint
- `packages/frontend/pages/[drummer].js` (or equivalent) — Add download button
- `packages/frontend/components/DrummerProfile.js` — Button placement

## Tech Notes

- Use `@vercel/og` (Vercel's OG image generation) OR `canvas` npm package
- Vercel OG is easiest: uses JSX to define image, serverless-ready
- Reference: https://vercel.com/docs/functions/og-image-generation
- Font: Use system fonts or Google Fonts (Inter/Roboto for clean look)
- Data: Pull from existing drummer data API (`/api/drummers/:id`)

## Acceptance Criteria

- [ ] `/api/card/joey-jordison` returns a valid PNG image
- [ ] PNG shows drummer name, band, top gear, total cost, MetalForge URL
- [ ] "Share Setup" button appears on all drummer profile pages
- [ ] Clicking button downloads the card image
- [ ] Card works for all 31+ drummers
- [ ] Image is 1200×675px minimum
- [ ] Dark theme, metal aesthetic
- [ ] No console errors

## Success Metrics

- 50+ card downloads in first week
- Cards appearing in Reddit threads and Discord servers
- Social shares referencing metalforge.io
```

**Priority:** HIGH — Impact Score 8⭐, no blockers
**CEO Decision Date:** 2026-04-09
**Based on:** CEO-014 analysis in ceo-ideas.md

---

*To create this issue, run:*
```bash
gh issue create \
  --title "feat: Drummer Gear Share Cards — Auto-Generated Shareable Images (CEO-014)" \
  --label "ai-fix" \
  --body "$(cat .agents/ceo/issue-body-gear-cards.md)"
```

---

## 🟢 Issue #2 — READY TO CREATE

**Title:** `feat: Gear by Brand Pages — Brand-Centric SEO Landing Pages (CEO-017)`

**Labels:** `ai-fix`

**Body:**
```
## Overview

Create brand-centric landing pages at `/brand/[slug]` that list all MetalForge drummers who use each major drum/cymbal brand. This reorganizes our existing gear data into a brand-indexed view, generating 20-30 new SEO landing pages with zero new content creation.

## Why Now

- All 31+ drummer profiles have verified gear data indexed by DRUMMER — no brand view exists
- Metal fans actively search by brand: "who plays DW drums", "famous metal drummers using Tama", "Paiste cymbals metal"
- Each brand page = new SEO landing page targeting high-intent queries
- 20-30 new pages from existing data = immediate SEO surface area expansion
- Competitors (DrummerWorld, ModernDrummer) have NO brand-indexed metal drummer pages — blue ocean
- **Score: 7⭐** (Impacto Curto: ⭐⭐, Médio: ⭐⭐⭐, Longo: ⭐⭐)
- Zero external dependencies — pure data reorganization

## What to Build

### 1. Brand Pages at `/brand/[slug]`

**Target brands (at minimum):**
- `/brand/dw-drums` — DW Drums
- `/brand/pearl` — Pearl Drums
- `/brand/tama` — Tama Drums
- `/brand/ludwig` — Ludwig Drums
- `/brand/yamaha` — Yamaha Drums
- `/brand/paiste` — Paiste Cymbals
- `/brand/zildjian` — Zildjian Cymbals
- `/brand/sabian` — Sabian Cymbals
- `/brand/meinl` — Meinl Cymbals
- `/brand/mapex` — Mapex Drums
- `/brand/axis` — Axis Pedals
- `/brand/dw-pedals` (if distinct from DW drums)

**Extract brands from existing drummer gear data.**

### 2. Brand Page Content

Each `/brand/[slug]` page shows:
- Brand name + logo (if available) as hero header
- Stat: "X of Y MetalForge drummers use [Brand]"
- Grid of drummer cards (photo + name + band + what they use from this brand)
- For each drummer: specific pieces used (e.g., "Lars Ulrich — DW 9000 Hi-Hat Stand, DW Collector's Series Snare")
- Filter/sort: by category (drums, cymbals, pedals, hardware)
- Link to each drummer's full profile
- SEO meta: `[Brand] Drums — Famous Metal Drummers Who Use [Brand] | MetalForge`
- FAQ schema: "What metal drummers use [Brand]?"

### 3. Brand Index Page at `/brands`

Overview page listing all available brands with drummer counts:
```
DW Drums — 18 drummers
Pearl — 12 drummers
Paiste — 9 drummers
...
```

### 4. Cross-Link from Drummer Profiles

On each drummer's profile page, add brand badges/links next to gear items:
- "DW Drums" → clickable → `/brand/dw-drums`
- This creates bidirectional internal linking (drummer ↔ brand)

## SEO Strategy

**Target keywords per brand page:**
- "[Brand] drums metal"
- "famous metal drummers who use [Brand]"
- "[Brand] [product] metal musicians"
- "who plays [Brand] drums"

**Schema markup:**
- ItemList schema on each brand page (list of drummers)
- BreadcrumbList: Home → Brands → [Brand Name]

## Files Likely Involved

- `packages/frontend/pages/brand/[slug].js` — New brand page
- `packages/frontend/pages/brands.js` — Brand index page
- `packages/frontend/api/brands.js` — New API endpoint returning brand → drummer mappings
- `packages/frontend/pages/[drummer].js` — Add brand link badges to gear items

## Data Extraction Logic

```javascript
// Pseudo-code: extract brand data from drummer gear
const brandMap = {};
drummers.forEach(drummer => {
  drummer.gear.forEach(item => {
    const brand = item.brand; // Already in gear data
    if (!brandMap[brand]) brandMap[brand] = [];
    brandMap[brand].push({ drummer, item });
  });
});
```

## Acceptance Criteria

- [ ] `/brands` index page lists all brands with drummer counts
- [ ] At least 10 brand pages live at `/brand/[slug]`
- [ ] Each brand page shows all MetalForge drummers who use that brand
- [ ] Drummer profile pages link to brand pages from gear items
- [ ] Brand pages have correct SEO meta titles and descriptions
- [ ] ItemList schema markup on brand pages
- [ ] BreadcrumbList schema: Home → Brands → [Brand]
- [ ] All brand pages work on mobile
- [ ] Sitemap updated to include brand pages

## Success Metrics

- 10+ brand pages indexed in Google Search Console within 4 weeks
- Brand pages appear in top 100 for target keywords within 6 weeks
- 5%+ of sessions include a brand page visit (GA4)
- Internal link clicks from drummer profiles to brand pages tracked in GA4
```

**Priority:** HIGH — Impact Score 7⭐, leverages existing data, no blockers
**CEO Decision Date:** 2026-04-09
**Based on:** CEO-017 analysis in ceo-ideas.md
**Daily slot:** 2/2 (max 2 issues per day)

---

*To create this issue, run:*
```bash
gh issue create \
  --title "feat: Gear by Brand Pages — Brand-Centric SEO Landing Pages (CEO-017)" \
  --label "ai-fix" \
  --body "..." # (paste Issue #2 body above)
```

---

## 🟢 Issue #3 — READY TO CREATE

**Title:** `feat: Gear Wishlist & Affiliate Conversion Funnel — Personal Gear Save + Share (CEO-018)`

**Labels:** `ai-fix`

**Body:**
```
## Overview

Build a frictionless "Gear Wishlist" system that lets users save gear items from drummer profiles and purchase them via affiliate links. No sign-up required — uses localStorage for zero-friction adoption.

## Why Now

- Day 69 since launch: €0 affiliate revenue despite Sweetwater links being live
- Users browse drummer gear but have no save/buy mechanism
- This creates the site's FIRST direct conversion funnel: Browse → Save → Buy
- No external dependencies — pure frontend, localStorage, existing affiliate patterns
- **Score: 8⭐** (Impacto Curto: ⭐⭐⭐, Médio: ⭐⭐⭐, Longo: ⭐⭐)
- Directly addresses the €0 affiliate revenue problem

## What to Build

### 1. "Save to Wishlist" Button on Gear Items

On every gear item row across ALL drummer profile pages, add:
- Heart/bookmark icon button: "♡ Save" → "♥ Saved"
- Toggles item in/out of wishlist (localStorage)
- Visual feedback: button state change (outline → filled)
- Show count badge on nav: "Wishlist (3)" when items saved

### 2. `/wishlist` Page — Personal Gear Hub

New page at `/wishlist` displaying saved items:

**Layout:**
- Header: "My Gear Wishlist — [X items, €/$ total cost]"
- Table/grid of saved gear:
  - Drummer name + photo (small)
  - Item name + category (drums/cymbals/pedals/hardware)
  - Estimated price
  - "Buy on Sweetwater" affiliate link (per item)
  - "Buy on Thomann" affiliate link (per item, EU)
  - Remove (×) button
- **Footer CTA:** "Buy All from Sweetwater" → bulk search link with UTM params
- **Empty state:** "Start saving gear from any drummer's profile →" with link

### 3. Share Wishlist Feature

On the /wishlist page:
- "📤 Share Wishlist" button
- Encodes wishlist JSON to base64, appends to URL: `/wishlist?list=BASE64`
- Copies URL to clipboard + shows "Link copied!"
- When visiting a share URL, populate wishlist from URL param (read-only view with "Save to My Wishlist" CTA)

### 4. Persistence & UX Details

- localStorage key: `metalforge_wishlist`
- Persist across sessions (localStorage is non-session storage)
- On drummer profile pages: show filled heart icon if item already saved
- "Clear All" button on wishlist page
- Mobile-friendly layout (cards on mobile, table on desktop)

### 5. Affiliate UTM Tags

All links from wishlist page should use UTM tracking:
- `?utm_source=metalforge&utm_medium=wishlist&utm_campaign=gear-purchase`
- This lets GA4 track conversion from wishlist feature specifically

## Files Likely Involved

- `packages/frontend/pages/wishlist.js` — New wishlist page
- `packages/frontend/components/GearItem.js` (or equivalent) — Add save button
- `packages/frontend/hooks/useWishlist.js` — New hook for localStorage state
- `packages/frontend/components/NavBar.js` — Add wishlist count badge

## Acceptance Criteria

- [ ] "Save" button appears on every gear item across all drummer profile pages
- [ ] Clicking "Save" toggles item in localStorage wishlist
- [ ] `/wishlist` page shows all saved items with prices and affiliate links
- [ ] "Buy on Sweetwater" links work with affiliate UTM params for each item
- [ ] "Share Wishlist" generates a shareable URL that repopulates wishlist
- [ ] Wishlist persists across browser sessions (localStorage)
- [ ] Wishlist count badge visible in nav/header when items exist
- [ ] Empty state on /wishlist page guides users to browse drummers
- [ ] Works on mobile and desktop
- [ ] No console errors

## Success Metrics

- `/wishlist` page visits tracked in GA4
- Affiliate click events from wishlist page (GA4 custom event)
- Share URLs appearing as referral traffic source
- At least 50 wishlist saves in first week (GA4 event: `wishlist_add`)
```

**Priority:** HIGH — Impact Score 8⭐, no blockers, first direct affiliate conversion funnel
**CEO Decision Date:** 2026-04-10
**Based on:** CEO-018 analysis in ceo-ideas.md

---

*To create this issue, run:*
```bash
gh issue create \
  --title "feat: Gear Wishlist & Affiliate Conversion Funnel — Personal Gear Save + Share (CEO-018)" \
  --label "ai-fix" \
  --body "$(cat .agents/ceo/issue-body-wishlist.md)"
```
