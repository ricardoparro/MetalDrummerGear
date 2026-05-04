# 📊 Showdown Saturdays — Metrics & Tracking

## Success Criteria

### Primary Goal
**Follower Growth:** +200 followers/month from Showdown Saturdays alone

### Secondary Goals
- Average 75+ votes per poll
- Average 25+ comments per poll
- Drive 100+ monthly visits to MetalForge profiles

---

## Key Performance Indicators (KPIs)

| Metric | Target | Measurement |
|--------|--------|-------------|
| Poll Votes | 75+ per poll | Twitter Analytics |
| Comments | 25+ per poll | Manual count |
| Quote Tweets | 10+ per poll | Twitter Analytics |
| New Followers (Sat-Sun) | 25+ per poll | Twitter Analytics |
| Profile Link Clicks | 50+ per poll | Bitly/UTM tracking |
| Instagram Story Views | 500+ per story set | Instagram Insights |
| TikTok Views | 1000+ per video | TikTok Analytics |

---

## Weekly Tracking Template

### Week [X] — [DATE]
**Matchup:** [DRUMMER_A] vs [DRUMMER_B]

#### Twitter Performance
```json
{
  "poll_votes": 0,
  "winner": "",
  "winner_percentage": 0,
  "loser_percentage": 0,
  "comments": 0,
  "quote_tweets": 0,
  "retweets": 0,
  "likes": 0,
  "impressions": 0,
  "profile_visits": 0,
  "new_followers": 0,
  "link_clicks": 0
}
```

#### Instagram Performance
```json
{
  "story_views": 0,
  "poll_responses": 0,
  "shares": 0,
  "replies": 0,
  "profile_visits": 0,
  "new_followers": 0
}
```

#### TikTok Performance
```json
{
  "views": 0,
  "likes": 0,
  "comments": 0,
  "shares": 0,
  "new_followers": 0
}
```

#### Site Traffic
```json
{
  "drummer_a_profile_views": 0,
  "drummer_b_profile_views": 0,
  "referral_source": "twitter",
  "session_duration_avg": "0:00"
}
```

#### Notes
- What worked:
- What didn't:
- Adjustments for next week:

---

## Monthly Summary Template

### Month: [MONTH YEAR]

#### Overall Stats
| Metric | Week 1 | Week 2 | Week 3 | Week 4 | Total | Avg |
|--------|--------|--------|--------|--------|-------|-----|
| Poll Votes | - | - | - | - | - | - |
| Comments | - | - | - | - | - | - |
| New Followers | - | - | - | - | - | - |
| Link Clicks | - | - | - | - | - | - |

#### Best Performing Matchup
**[MATCHUP]:** [VOTES] votes, [COMMENTS] comments

**Why it worked:**
- 

#### Worst Performing Matchup  
**[MATCHUP]:** [VOTES] votes, [COMMENTS] comments

**Why it underperformed:**
-

#### Key Learnings
1. 
2. 
3. 

#### Next Month Adjustments
1. 
2. 
3. 

---

## Tracking Tools Setup

### Twitter Analytics
- Access: analytics.twitter.com
- Track: Impressions, engagements, profile visits, follower growth
- Export: Weekly CSV for archive

### Instagram Insights
- Access: Instagram app → Professional Dashboard
- Track: Story views, interactions, profile visits
- Note: 14-day data retention, capture weekly

### TikTok Analytics
- Access: TikTok app → Creator Tools → Analytics
- Track: Views, engagement, follower growth
- Note: Requires Creator account (1000+ followers for full analytics)

### Google Analytics (MetalForge.io)
- Track: Referral traffic from social
- UTM Parameters: `?utm_source=twitter&utm_medium=social&utm_campaign=showdown-saturdays`
- Custom event: Showdown drummer profile views

### UTM Link Format
```
https://metalforge.io/drummers/lars-ulrich?utm_source=twitter&utm_medium=social&utm_campaign=showdown-saturdays&utm_content=week-1
```

---

## Benchmarks

### Industry Standards (Music/Entertainment Accounts)
| Followers | Engagement Rate | Target Engagement |
|-----------|-----------------|-------------------|
| 0-1K | 5-10% | Higher than avg possible |
| 1K-10K | 3-5% | Industry standard |
| 10K-100K | 1-3% | Acceptable |
| 100K+ | 0.5-1% | Expected decline |

### Our Targets (Growth Phase)
| Metric | Minimum | Target | Stretch |
|--------|---------|--------|---------|
| Poll Votes | 30 | 75 | 150+ |
| Comments | 10 | 25 | 50+ |
| Engagement Rate | 5% | 10% | 15%+ |
| Follower Growth/Week | 10 | 25 | 50+ |

---

## Historical Results

### May 2026

#### Week 1 — May 10, 2026
**Lars Ulrich vs Dave Lombardo**
```json
{
  "poll_votes": null,
  "winner": null,
  "winner_percentage": null,
  "comments": null,
  "new_followers": null,
  "status": "SCHEDULED"
}
```

#### Week 2 — May 17, 2026
**Gene Hoglan vs George Kollias**
```json
{
  "poll_votes": null,
  "winner": null,
  "winner_percentage": null,
  "comments": null,
  "new_followers": null,
  "status": "SCHEDULED"
}
```

#### Week 3 — May 24, 2026
**Joey Jordison vs Jay Weinberg**
```json
{
  "poll_votes": null,
  "winner": null,
  "winner_percentage": null,
  "comments": null,
  "new_followers": null,
  "status": "SCHEDULED"
}
```

#### Week 4 — May 31, 2026
**Tomas Haake vs Mario Duplantier**
```json
{
  "poll_votes": null,
  "winner": null,
  "winner_percentage": null,
  "comments": null,
  "new_followers": null,
  "status": "SCHEDULED"
}
```

---

## Dashboard Queries

### Follower Growth from Showdowns
```
Total Saturday followers - Friday followers (weekly)
Sum all 4 weeks = Monthly Showdown contribution
```

### Engagement Rate Calculation
```
(Votes + Comments + Quote Tweets + Retweets) / Impressions × 100
```

### Conversion Rate (to Site)
```
Link Clicks / Poll Votes × 100
```

### ROI Calculation (Time Investment)
```
Time spent (hours) / New followers = Hours per follower
Target: < 0.5 hours per follower
```

---

## Alerts & Thresholds

### Green (On Track)
- Poll votes > 50 at 12h mark
- Comments > 15 at 12h mark
- Positive sentiment in comments

### Yellow (Needs Attention)
- Poll votes < 30 at 12h mark
- Comments < 10 at 12h mark
- Mixed/neutral sentiment

### Red (Take Action)
- Poll votes < 20 at 12h mark
- Comments < 5 at 12h mark
- Negative sentiment/toxicity
- Technical issues with poll

### Action Plan for Yellow/Red
1. Quote tweet with hot take
2. Post Instagram Story reminder
3. Engage directly with every comment
4. Consider boosting (if budget allows)

---

## Reporting

### Weekly Report (Sunday Evening)
Quick summary in `social-metrics.json`:
```json
{
  "showdown_saturdays": {
    "last_matchup": "[DRUMMER_A] vs [DRUMMER_B]",
    "last_poll_votes": 0,
    "last_winner": "",
    "weekly_followers_gained": 0,
    "cumulative_polls": 0
  }
}
```

### Monthly Report (Last Sunday of Month)
Full analysis document with:
- All 4 weeks performance
- Best/worst matchups
- Trend analysis
- Recommendations for next month

---

*Metrics tracked by Social Agent. Update after each poll completion.*
