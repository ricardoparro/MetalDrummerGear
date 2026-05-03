# 60-Second Setup Build - Video Production Guide

## Issue #827: Viral Video Series (TikTok/Reels/Shorts)

---

## Overview

Create engaging 60-second vertical videos showing drummer gear "builds" in timelapse style. Each video reveals how a famous metal drummer's setup comes together piece by piece, with live price overlays and brand callouts.

**Target Platforms:**
- TikTok (@MetalDrumGear)
- Instagram Reels
- YouTube Shorts

---

## Phase 1 Drummers

| # | Drummer | Band | Est. Setup Cost |
|---|---------|------|-----------------|
| 1 | Joey Jordison | Slipknot | ~€15,000 |
| 2 | Lars Ulrich | Metallica | ~€12,000 |
| 3 | George Kollias | Nile | ~€18,000 |
| 4 | Mario Duplantier | Gojira | ~€14,000 |
| 5 | Dave Lombardo | Slayer | ~€11,000 |

---

## Technical Specifications

### Video Format
```
Resolution:     1080 x 1920 (9:16 vertical)
Frame Rate:     30fps (or 60fps for smoother motion)
Duration:       60 seconds EXACTLY
Codec:          H.264 / HEVC
Bitrate:        10-15 Mbps
Audio:          AAC 320kbps stereo
```

### Color Palette (MetalForge Branding)
```css
Primary Black:    #0a0a0a
Primary Orange:   #ff6b00
Secondary Gray:   #1a1a1a
Text White:       #ffffff
Accent Red:       #dc2626
Highlight Gold:   #fbbf24
```

### Typography
```
Headings:    "Impact" or "Bebas Neue" (bold, all-caps)
Subheadings: "Oswald" or "Anton"
Body Text:   "Inter" or "Roboto"
Prices:      "JetBrains Mono" or "Fira Code" (monospace)
```

---

## Video Structure (60 Seconds)

### Timeline Breakdown

```
[0:00 - 0:03] HOOK
├── Drummer name + band logo flash
├── "Building [NAME]'s €XX,XXX Setup"
└── Fast drum fill audio hit

[0:03 - 0:08] BASS DRUMS (5 sec)
├── Empty drum riser → Bass drums appear
├── Price overlay: "Bass Drums: €2,500"
└── Running total counter starts

[0:08 - 0:18] RACK TOMS (10 sec)
├── Toms mount one by one
├── Price overlay for each tom rack
└── Running total updates

[0:18 - 0:26] SNARE DROP (8 sec)
├── Signature snare appears (dramatic)
├── Price callout with brand mention
└── Close-up zoom effect

[0:26 - 0:38] CYMBALS CASCADE (12 sec)
├── Hi-hats → Crashes → Rides → Chinas
├── Each cymbal gets brief price tag
└── Visual "cascade" or "rain" effect

[0:38 - 0:48] HARDWARE + EXTRAS (10 sec)
├── Double pedal spotlight
├── Throne, rack system, electronics
└── Running total approaching final

[0:48 - 0:52] FINAL REVEAL (4 sec)
├── Full kit zoom out
├── Drummer action photo overlay
└── Total cost LARGE display

[0:52 - 0:56] STATS FLASH (4 sec)
├── Quick facts (albums, awards)
├── "Most expensive piece: [item]"
└── Band achievement (Grammy, etc.)

[0:56 - 0:60] CTA + BRANDING (4 sec)
├── MetalForge logo animation
├── "Explore full setup →"
├── metalforge.io/[drummer-slug]
└── Social handles
```

---

## Visual Guidelines

### Animation Style Options

**Option A: 3D Render Style**
- Use Blender/Cinema 4D for photorealistic gear renders
- Items materialize from particles or fade in
- Dramatic lighting (concert-style)

**Option B: Screenshot Build** ⭐ RECOMMENDED
- Screen record from MetalForge.io drummer page
- Use browser zoom to show gear sections
- Picture-in-picture with drummer photos

**Option C: Stock + Graphics**
- Use stock footage of drum equipment
- Overlay custom graphics and animations
- Lower production time, higher scalability

### Price Counter Animation
```
Style: Slot machine / odometer effect
Font:  Monospace, bold
Color: Gold (#fbbf24) with glow effect
Size:  Large, always visible bottom-right
```

### Text Overlays
```
Position: Safe zones (avoid top/bottom 15%)
Shadow:   Black 50% opacity, 2px offset
Animation: Slide-in from left or fade-up
Duration: Each text visible 2-4 seconds
```

---

## Audio Guidelines

### Music Options (Royalty-Free)

1. **Epidemic Sound** (Subscription)
   - Search: "metal instrumental", "drum groove"
   - Avoid vocals (distracting)

2. **YouTube Audio Library** (Free)
   - Metal/rock instrumentals
   - Attribution may be required

3. **Uppbeat** (Free tier available)
   - Good metal selection
   - Commercial license

### Audio Structure
```
[0:00-0:03] Impact hit / drum fill
[0:03-0:48] Building instrumental (rising intensity)
[0:48-0:52] Climax / full band moment
[0:52-0:60] Fade out with logo sound
```

### Sound Effects
- Gear appearing: Metallic "whoosh" or "thud"
- Price counter: Subtle "cha-ching" or click
- Final reveal: Cymbal crash + crowd cheer

---

## Production Workflow

### Pre-Production (Automated)
```bash
# 1. Run data extraction
node scripts/video-production/extract-drummer-data.cjs

# 2. Generate thumbnail templates
node scripts/video-production/generate-thumbnails.cjs

# 3. Review video-production-data.json
# 4. Gather drummer photos/videos
```

### Production (Manual)

1. **Set up recording environment**
   - OBS Studio: 1080x1920 canvas
   - Browser: MetalForge drummer page open
   - Reference: video-scripts.json open

2. **Record base footage** (per drummer)
   - Screen record gear section scroll
   - Capture drummer profile/photos
   - Record any animations/transitions

3. **Edit in DaVinci Resolve / CapCut**
   - Import footage + audio
   - Add text overlays from script
   - Apply price counter animations
   - Add transitions between sections

4. **Export settings**
   ```
   Format:     MP4 (H.264)
   Resolution: 1080x1920
   Frame Rate: 30fps
   Bitrate:    12 Mbps
   Audio:      AAC 320kbps
   ```

### Post-Production

1. **Quality check**
   - Duration exactly 60 seconds
   - No audio clipping
   - All text readable
   - CTA visible

2. **Platform optimization**
   - TikTok: Add trending sounds if applicable
   - Reels: Add music from Instagram library
   - Shorts: Optimize thumbnail frame

---

## File Naming Convention

```
metalforge-60s-[drummer-slug]-v[version].mp4

Examples:
metalforge-60s-joey-jordison-v1.mp4
metalforge-60s-lars-ulrich-v1.mp4
metalforge-60s-george-kollias-v1.mp4
metalforge-60s-mario-duplantier-v1.mp4
metalforge-60s-dave-lombardo-v1.mp4
```

---

## Thumbnail Specifications

```
Format:     JPG or PNG
Resolution: 1080 x 1920
Elements:
  - Drummer photo (high contrast)
  - Setup silhouette
  - "€XX,XXX" price tag (prominent)
  - MetalForge watermark (subtle)
```

---

## Captions & Hashtags

### Caption Template
```
🥁 Building [DRUMMER]'s €[TOTAL] drum setup

Every piece of [BAND]'s legendary sound 🔥

Full gear breakdown: metalforge.io/[slug]

#MetalDrummer #DrumSetup #[DrummerName] #[BandName] 
#DrumGear #MetalForge #DrummerLife #MetalMusic
```

### Hashtag Sets
```
Core:       #MetalDrummer #DrumSetup #DrumGear #MetalForge
Drummer:    #JoeyJordison #LarsUlrich #GeorgeKollias etc.
Band:       #Slipknot #Metallica #Nile #Gojira #Slayer
Discovery:  #DrummerLife #MetalMusic #HeavyMetal #Drums
Trending:   Check TikTok trends weekly
```

---

## Distribution Schedule

| Day | Platform | Drummer | Time (EST) |
|-----|----------|---------|------------|
| Mon | TikTok   | Joey Jordison | 8 PM |
| Tue | Instagram | Joey Jordison | 8 PM |
| Wed | TikTok   | Lars Ulrich | 8 PM |
| Thu | Instagram | Lars Ulrich | 8 PM |
| Fri | TikTok   | George Kollias | 8 PM |
| Sat | Instagram | George Kollias | 8 PM |
| Sun | YouTube Shorts | All 3 | 12 PM |

---

## Success Metrics

| Metric | Target (First Month) |
|--------|---------------------|
| Videos Published | 10+ |
| Single Video 10K+ Views | At least 1 |
| New Followers | 500+ |
| Site Visits (UTM) | 200+ |
| Drummer/Band Engagement | 3+ |

---

## UTM Tracking

```
Base URL:    https://metalforge.io/[drummer-slug]
UTM Source:  tiktok / instagram / youtube
UTM Medium:  video
UTM Campaign: 60s-build-series

Full Example:
https://metalforge.io/joey-jordison?utm_source=tiktok&utm_medium=video&utm_campaign=60s-build-series
```

---

## Automation Opportunities

### ✅ Fully Automated
- [x] Data extraction (drummer info, gear, prices)
- [x] Script generation (titles, CTAs, hashtags)
- [x] UTM link generation
- [x] Caption templates

### 🔄 Semi-Automated
- [ ] Thumbnail generation (template + dynamic text)
- [ ] Price counter overlay (After Effects template)
- [ ] Batch export settings

### ❌ Manual Required
- Screen recording / animation creation
- Video editing / timing
- Audio sync
- Platform-specific posting
- Community engagement

---

## Tools Required

### Free Options
- **OBS Studio** - Screen recording
- **DaVinci Resolve** - Video editing (free version)
- **Canva** - Thumbnails
- **GIMP** - Image editing

### Paid Options (Better)
- **CapCut Pro** - Quick editing, templates
- **After Effects** - Motion graphics
- **Epidemic Sound** - Music licensing
- **Figma** - Design templates

---

## Quick Start Checklist

- [ ] Run data extraction script
- [ ] Review `video-production-data.json`
- [ ] Download drummer high-res photos
- [ ] Set up OBS (1080x1920 canvas)
- [ ] Choose audio tracks (5 needed)
- [ ] Create After Effects/CapCut price counter template
- [ ] Record first video (Joey Jordison)
- [ ] Edit and export
- [ ] Post to TikTok with UTM links
- [ ] Cross-post to Instagram/YouTube

---

## Contact

For questions about this production guide:
- GitHub: Issue #827
- Project: MetalForge.io

**Last Updated:** 2026-05-03
