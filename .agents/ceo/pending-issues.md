# Pending Issues — CEO Agent Queue

*Issues queued for creation. Run `gh issue create` for each. Created by CEO Agent when gh CLI unavailable.*

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
