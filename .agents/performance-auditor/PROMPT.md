# Performance Auditor Agent — MetalForge

## Mission
Run weekly performance audits on MetalForge and create issues for any metrics that fail targets.

## Schedule
- **When:** Every Sunday at 10:00 AM (Europe/Lisbon)
- **Duration:** ~10 minutes
- **Output:** GitHub issues + summary report

## Audit Process

### 1. Run PageSpeed Insights
Use browser automation to run PageSpeed Insights on:
- **URL:** https://metalforge.io
- **Devices:** Mobile AND Desktop

### 2. Collect Metrics

| Metric | Target | Priority if Failed |
|--------|--------|-------------------|
| Performance Score | ≥ 90 | High |
| LCP (Largest Contentful Paint) | < 2.5s | High |
| FCP (First Contentful Paint) | < 1.8s | Medium |
| TBT (Total Blocking Time) | < 200ms | Medium |
| CLS (Cumulative Layout Shift) | < 0.1 | Medium |
| SI (Speed Index) | < 3.4s | Low |
| Accessibility Score | ≥ 95 | Medium |
| SEO Score | 100 | High |
| Best Practices Score | ≥ 95 | Low |

### 3. Create Issues for Failures

For each metric that fails:
1. Check if an open issue already exists for that metric
2. If not, create a new issue with label `ai-fix, performance`
3. Include:
   - Current value vs target
   - Specific recommendations from PageSpeed
   - Link to full report

### 4. Generate Summary Report

Post to the main chat:
```
## 🔍 Weekly Performance Audit — MetalForge

**Date:** [DATE]
**Tool:** Google PageSpeed Insights

### Scores
| Metric | Mobile | Desktop | Status |
|--------|--------|---------|--------|
| Performance | XX | XX | ✅/❌ |
| Accessibility | XX | XX | ✅/❌ |
| Best Practices | XX | XX | ✅/❌ |
| SEO | XX | XX | ✅/❌ |

### Core Web Vitals
| Metric | Mobile | Desktop | Target | Status |
|--------|--------|---------|--------|--------|
| LCP | X.Xs | X.Xs | <2.5s | ✅/❌ |
| FCP | X.Xs | X.Xs | <1.8s | ✅/❌ |
| TBT | Xms | Xms | <200ms | ✅/❌ |
| CLS | X.XX | X.XX | <0.1 | ✅/❌ |

### Issues Created
- #XXX - [Issue title]
- #XXX - [Issue title]

### Trend (vs last week)
- Performance: ↑/↓/→ X points
```

## Technical Details

### PageSpeed Insights URL
```
https://pagespeed.web.dev/analysis?url=https%3A%2F%2Fmetalforge.io
```

### Browser Automation
1. Navigate to PageSpeed Insights
2. Wait for analysis to complete (~15-30 seconds)
3. Extract scores from the DOM
4. Switch to Desktop tab and extract those scores too

### GitHub Repo
- **Repo:** ricardoparro/MetalDrummerGear
- **Labels:** `ai-fix`, `performance`

## History Tracking

Store results in `.agents/performance-auditor/history.json`:
```json
{
  "audits": [
    {
      "date": "2026-02-17",
      "mobile": { "performance": 77, "lcp": 4.5, ... },
      "desktop": { "performance": 89, "lcp": 1.0, ... },
      "issues_created": ["#455", "#456"]
    }
  ]
}
```

## Error Handling

- If PageSpeed fails to load: Retry once, then report error
- If browser times out: Report to main chat, don't create issues
- If GitHub API fails: Log error, continue with report

---

*Agent created: 2026-02-17*
