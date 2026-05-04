# ⚙️ Showdown Saturdays — Execution Workflow

## Weekly Timeline

### Thursday — Preparation
| Time | Task | Owner |
|------|------|-------|
| Any | Confirm matchup from calendar | Social Agent |
| Any | Gather drummer images (square, high-res) | Social Agent |
| Any | Pull gear data from MetalForge profiles | Social Agent |
| Any | Draft all platform content | Social Agent |
| Any | Create Instagram story assets | Social Agent |
| Any | Prepare TikTok video clips | Social Agent |

### Friday — Final Prep
| Time | Task | Owner |
|------|------|-------|
| Any | Review and finalize all content | Social Agent |
| Any | Schedule posts (if using scheduler) | Social Agent |
| Any | Prepare engagement hook replies | Social Agent |
| Any | Test all links | Social Agent |

### Saturday — Launch Day
| Time | Task | Owner |
|------|------|-------|
| 10:00 | Post Twitter poll | Social Agent |
| 10:15 | Post Instagram Stories | Social Agent |
| 10:30 | Post TikTok video | Social Agent |
| 12:00 | First engagement check — reply to comments | Social Agent |
| 14:00 | Quote tweet with hot take | Social Agent |
| 16:00 | Second engagement check | Social Agent |
| 18:00 | Instagram story reminder | Social Agent |
| 20:00 | Final engagement push | Social Agent |

### Sunday — Results Day
| Time | Task | Owner |
|------|------|-------|
| 10:00 | Poll closes — capture final results | Social Agent |
| 10:30 | Post winner announcement | Social Agent |
| 12:00 | Post deep-dive thread on winner | Social Agent |
| 12:30 | Post results to Instagram Stories | Social Agent |
| 14:00 | Engage with post-results discussion | Social Agent |
| 18:00 | Log metrics | Social Agent |
| 20:00 | Tease next week's matchup | Social Agent |

---

## Pre-Launch Checklist

### Content Checklist
- [ ] Twitter poll text finalized
- [ ] Both drummer names spelled correctly
- [ ] Gear summaries accurate (verified against profiles)
- [ ] Hashtags included (max 4)
- [ ] Instagram Stories created (5 slides)
- [ ] TikTok video edited (30-60 seconds)
- [ ] Profile links ready

### Asset Checklist
- [ ] Drummer A high-res image
- [ ] Drummer B high-res image
- [ ] Split-screen battle graphic
- [ ] Winner announcement template ready
- [ ] Brand assets (MetalForge logo) included

### Technical Checklist
- [ ] Poll duration set to 24 hours
- [ ] All MetalForge links working
- [ ] Instagram link in bio updated
- [ ] TikTok link in bio updated

---

## Content Creation Process

### Step 1: Pull Drummer Data
```bash
# Access drummer profiles on MetalForge
1. Go to metalforge.io/drummers/[drummer-slug]
2. Screenshot gear sections
3. Note: Kit, Snare, Cymbals, Pedals
4. Find iconic song reference
```

### Step 2: Write Twitter Poll
```markdown
Template:
🥊 SHOWDOWN SATURDAY 🥊

⚔️ [Drummer A] vs [Drummer B] ⚔️

[Hook/context line]

[Drummer A]: [Kit + Cymbal brand]
[Drummer B]: [Kit + Cymbal brand]

🗳️ VOTE NOW — 24 hours only!

#ShowdownSaturday #MetalDrumming
```

### Step 3: Create Instagram Stories
```markdown
Slide 1: Battle announcement (split image)
Slide 2: Drummer A gear breakdown + poll sticker
Slide 3: Drummer B gear breakdown + poll sticker  
Slide 4: Final vote poll sticker
Slide 5: CTA to profile link
```

### Step 4: Edit TikTok Video
```markdown
Structure:
0-3s: Hook ("WHO HAS THE BETTER KIT?")
3-15s: Drummer A performance clip + gear overlay
15-27s: Drummer B performance clip + gear overlay
27-30s: CTA ("Comment your pick!")
```

---

## Engagement Protocol

### Response Time Targets
| Comment Type | Response Time |
|--------------|---------------|
| Direct question | < 30 min |
| Opinion/vote | < 1 hour |
| Technical discussion | < 2 hours |
| Negative feedback | < 1 hour (de-escalate) |

### Response Tone Guide
- **Enthusiastic** but not over-the-top
- **Knowledgeable** — show you know the gear
- **Neutral** on votes — don't play favorites publicly
- **Appreciative** — thank everyone for engaging

### Engagement Targets
| Metric | Minimum | Good | Excellent |
|--------|---------|------|-----------|
| Poll votes | 30 | 75 | 150+ |
| Comments | 10 | 25 | 50+ |
| Quote tweets | 3 | 10 | 20+ |
| New followers | 10 | 25 | 50+ |

---

## Results Announcement Process

### Step 1: Capture Results
```markdown
Screenshot poll results immediately when it closes
Note exact percentages
Count total votes
```

### Step 2: Post Winner Announcement
```markdown
🏆 SHOWDOWN SATURDAY RESULTS 🏆

[Winner] takes it with [X]% of the vote!

[Loser] put up a fight at [Y]%.

🥇 This week's champion: [Winner]

Who should battle next? 👇
```

### Step 3: Post Deep-Dive Thread
```markdown
6-tweet thread format:
1. Why [Winner] won + hook
2. Drum kit breakdown
3. Snare analysis
4. Cymbal setup
5. Pedals/hardware
6. Link to full profile + next week tease
```

### Step 4: Log Everything
```markdown
Update metrics.md with:
- Total votes
- Percentages
- Comments count
- New followers
- Top performing content
- Lessons learned
```

---

## Troubleshooting

### Low Engagement
**Symptoms:** < 20 votes after 4 hours

**Actions:**
1. Quote tweet with controversial take
2. Post to Instagram Stories reminder
3. Tag relevant brand accounts
4. Reply to existing comments to boost visibility

### Heated Comments
**Symptoms:** Personal attacks, toxicity

**Actions:**
1. Don't delete unless truly offensive
2. Redirect: "Let's keep it about the gear! 🥁"
3. Hide worst offenders (don't block)
4. Focus energy on positive comments

### Technical Issues
**Symptoms:** Broken links, image issues

**Actions:**
1. Fix immediately and repost correction
2. Quote tweet the fixed version
3. Delete broken content if < 5 min old
4. Leave up if significant engagement already

### Platform Outages
**Symptoms:** Twitter/Instagram down

**Actions:**
1. Wait 1 hour
2. If still down, post when recovered
3. Acknowledge delay: "Technical difficulties — the showdown continues!"

---

## File Locations

| Asset | Location |
|-------|----------|
| Templates | `.agents/social/showdown-saturdays/templates.md` |
| Calendar | `.agents/social/showdown-saturdays/calendar.md` |
| Hooks | `.agents/social/showdown-saturdays/engagement-hooks.md` |
| Metrics | `.agents/social/showdown-saturdays/metrics.md` |
| Drummer data | `metalforge.io/drummers/[slug]` |
| Images | Download from Wikimedia/official sources |

---

## Automation Opportunities

### Current (Manual)
- All content posting
- All engagement
- Results capture

### Future (To Automate)
- [ ] Scheduled posting via Buffer/Hootsuite
- [ ] Auto-reply to common comment types
- [ ] Metrics capture to JSON
- [ ] Weekly report generation
- [ ] Image generation with consistent templates

---

*Workflow maintained by Social Agent. Update after process improvements.*
