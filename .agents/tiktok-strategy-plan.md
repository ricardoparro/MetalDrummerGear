# MetalForge TikTok Strategy Plan

> Inspired by the Larry skill approach - automated TikTok slideshows for drummer gear content.

**Goal:** Drive traffic to MetalForge.io via viral TikTok content → reach 500 daily views or 5K followers to unlock Thomann affiliate.

**Created:** 2026-02-17

---

## Phase 1: Setup (Week 1)

### 1.1 Create TikTok Account
- [ ] Account name: `@MetalForgeGear` or `@MetalDrumGear` (check availability)
- [ ] Bio: "🥁 What gear do your favorite metal drummers use? | metalforge.io"
- [ ] Profile pic: MetalForge logo
- [ ] Link in bio: metalforge.io

### 1.2 Account Warmup (Days 1-14)
**Critical:** Do NOT post anything during this period.

Daily routine (15-20 min):
- [ ] Scroll For You page, focus on drumming/metal content
- [ ] Like sparingly (1 in 10 videos)
- [ ] Follow accounts: drum channels, metal bands, gear reviews
- [ ] Leave genuine comments on drum videos
- [ ] Watch drum-related videos to completion

**Success indicator:** FYP shows mostly drumming/metal content after 2 weeks.

### 1.3 Tool Setup
- [ ] Install Larry skill from ClawHub: `clawhub.ai/OllieWazza/larry`
- [ ] OpenAI API key configured (for gpt-image-1.5)
- [ ] Postiz account setup: `postiz.pro`
- [ ] Connect TikTok to Postiz
- [ ] Test image generation pipeline

### 1.4 Adapt Skill for Metal Drumming Niche
Create custom prompt templates for:
- Drummer gear showcases
- Kit comparisons
- Gear evolution timelines
- Budget alternatives
- "Guess the drummer" games

---

## Phase 2: Content Strategy

### 2.1 Content Pillars (Slideshow Types)

#### Pillar 1: "What [Drummer] Actually Uses" (40%)
**Format:** 6 slides showing real gear
- Slide 1: Hook + drummer photo ("Lars Ulrich's $50,000 kit")
- Slide 2: Drums (brand, model, specs)
- Slide 3: Snare (signature model if applicable)
- Slide 4: Cymbals (brand, sizes)
- Slide 5: Hardware/pedals
- Slide 6: CTA ("Full gear list → link in bio")

**Hook formulas:**
- "What drums does [DRUMMER] ACTUALLY use?"
- "[DRUMMER]'s gear costs more than your car 🚗"
- "The kit behind [FAMOUS SONG]"
- "I researched [DRUMMER]'s exact setup..."

#### Pillar 2: Gear Evolution (25%)
**Format:** Before/after transformation
- Slide 1: Hook ("Joey Jordison's gear: 1995 vs 2021")
- Slides 2-3: Early career gear
- Slides 4-5: Peak career gear
- Slide 6: CTA

**Hook formulas:**
- "[DRUMMER] 1995 vs 2024 - same drummer, INSANE upgrade"
- "How [DRUMMER]'s kit evolved over 20 years"
- "From basement to stadium: [DRUMMER]'s gear journey"

#### Pillar 3: Budget Alternatives (20%)
**Format:** Pro gear vs affordable clone
- Slide 1: Hook ("$15,000 vs $1,500 - can you hear the difference?")
- Slides 2-3: Pro setup breakdown
- Slides 4-5: Budget alternative
- Slide 6: CTA + link to gear finder

**Hook formulas:**
- "Sound like [DRUMMER] for under $2,000"
- "[DRUMMER]'s kit vs the budget version"
- "Your wallet will thank me 💰"

#### Pillar 4: Interactive/Engagement (15%)
**Format:** Quizzes and games
- Slide 1: Challenge hook
- Slides 2-5: Clues/images
- Slide 6: Reveal + CTA

**Hook formulas:**
- "Guess the drummer by the kit 🥁"
- "Only real metal fans know this snare sound"
- "Which drummer uses this EXACT setup?"

### 2.2 Posting Schedule
- **Volume:** 3 posts/day (9AM, 3PM, 9PM Lisbon time)
- **Mix:** 2x gear showcases, 1x variety (evolution/budget/quiz)
- **Drafts:** Agent creates drafts → human adds trending audio → publish

### 2.3 Caption Guidelines
- Storytelling format, NOT feature lists
- Mention MetalForge naturally ("found this on metalforge.io")
- Max 5 hashtags: #metaldrummer #drumgear #[drummer] #[band] #drums
- Include call-to-action to bio link

---

## Phase 3: Technical Implementation

### 3.1 Image Generation Specs
```
Resolution: 1024x1536 (portrait)
Style: Consistent scene across all 6 slides
Text overlay: 
  - Font size: 6.5% of image height
  - Position: 30% from top (safe zone)
  - Line breaks: Every 4-6 words
  - Hook on slide 1 ONLY (never split)
```

### 3.2 API Endpoints Needed
Create new API endpoint for TikTok content:
```
GET /api/tiktok/drummer/:id
Returns:
- Drummer info
- Gear summary (formatted for slides)
- Hook suggestions
- Hashtags
```

### 3.3 Asset Pipeline
1. Agent requests drummer data from MetalForge API
2. Generates 6 images via OpenAI gpt-image-1.5
3. Adds text overlays (hook on slide 1)
4. Uploads to Postiz as draft
5. Human adds trending audio
6. Publish

### 3.4 Cost Estimate
- **Per slideshow:** ~$0.50 (real-time) or $0.25 (Batch API)
- **Daily (3 posts):** $0.75-1.50
- **Monthly:** ~$22-45
- **ROI target:** Thomann affiliate ($$$) + site traffic

---

## Phase 4: Analytics & Learning

### 4.1 Metrics to Track
| Metric | Tool | Target |
|--------|------|--------|
| Views per post | Postiz/TikTok | 50K+ for hits |
| Profile visits | TikTok Analytics | Track weekly |
| Link clicks | Bitly/UTM | → site traffic |
| Site traffic | GA4 | 500 daily views |
| Follower growth | TikTok | 5K followers |

### 4.2 Learning Loop
Daily:
- Agent pulls Postiz analytics
- Cross-reference with GA4 traffic
- Identify winning hooks → create variations
- Log failing hooks → avoid patterns

Weekly:
- Review top 3 posts
- Update prompt templates based on learnings
- Adjust content mix if needed

### 4.3 Success Criteria
| Milestone | Timeline | Indicator |
|-----------|----------|-----------|
| First 10K view post | Week 3-4 | Algorithm found us |
| Consistent 50K+ posts | Month 2 | Content-market fit |
| 500 daily site views | Month 3 | Thomann eligible |
| 5K TikTok followers | Month 3-4 | Alternative unlock |

---

## Phase 5: Content Ideas Backlog

### High-Priority Drummers (Start Here)
1. **Lars Ulrich** - Most searchable, Metallica fans everywhere
2. **Joey Jordison** - Legendary status, emotional connection
3. **Dave Lombardo** - Slayer legacy, thrash credibility
4. **Danny Carey** - Tool fans are obsessive
5. **Tomas Haake** - Djent community will share

### Hook Ideas Ready to Test
- [ ] "The snare that defined Master of Puppets"
- [ ] "Joey Jordison's rotating drum kit cost HOW MUCH?!"
- [ ] "Why Danny Carey uses 2 bass drum pedals instead of a double"
- [ ] "Dave Lombardo only needs ONE foot for this"
- [ ] "This $200 snare sounds like a $2,000 one"
- [ ] "Meshuggah's drummer practices THIS every day"
- [ ] "The cymbal that made Reign in Blood iconic"
- [ ] "Guess the drummer: These sticks cost $50 each"

### Seasonal/Trending Opportunities
- Drummer birthdays (we have birthday data!)
- Album anniversaries
- Band tour announcements
- New gear releases
- Drummer deaths/tributes (tastefully)

---

## Implementation Checklist

### Week 1
- [ ] Create TikTok account
- [ ] Start warmup routine
- [ ] Install Larry skill
- [ ] Set up Postiz
- [ ] Create MetalForge TikTok API endpoint

### Week 2
- [ ] Continue warmup
- [ ] Adapt Larry skill for metal drumming
- [ ] Generate test slideshows (don't post)
- [ ] Create 10 draft posts ready to go
- [ ] Test full pipeline end-to-end

### Week 3 (Launch!)
- [ ] Post first slideshow
- [ ] Begin 3x/day schedule
- [ ] Monitor analytics daily
- [ ] Iterate on hooks based on performance

### Month 2+
- [ ] Scale what works
- [ ] Add RevenueCat if we have app/paid features
- [ ] Consider cross-posting to Instagram Reels
- [ ] Build hook formula database

---

## Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| Account shadowban | Proper warmup, no spam behavior |
| Low engagement | Iterate hooks fast, volume approach |
| Image quality issues | Test extensively before launch |
| Copyright (drummer photos) | Use AI-generated scenes, not real photos |
| Cost overrun | Use Batch API, monitor daily spend |

---

## Notes

- **Music is critical:** Always add trending audio manually before publishing
- **Don't automate music selection:** TikTok's auto-pick hurts reach
- **Volume > Perfection:** Post consistently, let algorithm find audience
- **Learn from Larry:** The skill file should grow with every lesson learned

---

*"MetalForge — Where drummers discover their sound."* 🤘
