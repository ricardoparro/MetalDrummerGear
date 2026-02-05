# Vercel Spend Management & Usage Alerts

This guide documents how to configure Vercel spend controls and usage alerts to prevent unexpected bills.

## Overview

Vercel's free tier includes generous limits, but costs can escalate quickly with traffic spikes. This document outlines the configuration steps to:

1. Set spend limits
2. Configure usage notifications
3. Monitor and optimize usage

## Spend Limits Configuration

### Step 1: Access Billing Settings

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Settings** (gear icon)
3. Navigate to **Billing**

### Step 2: Configure Spend Management

In the Billing section:

1. Click **Spend Management**
2. Set your monthly spend limit (recommended: **$20/month** for hobby projects)
3. Choose action when limit is reached:
   - **Pause deployments** - Safest option, prevents all new charges
   - **Notify only** - Get alerts but continue serving traffic

### Step 3: Verify Configuration

Confirm your settings show:
- ✅ Spend limit is set
- ✅ Action is configured
- ✅ Email notifications are enabled

## Usage Notifications

### Configure Alert Thresholds

Set notifications at multiple thresholds to catch issues early:

| Threshold | Purpose |
|-----------|---------|
| 50% | Early warning - review usage patterns |
| 75% | Action required - investigate anomalies |
| 90% | Critical - prepare for limit pause |

### Setup Steps

1. Go to **Settings** → **Notifications**
2. Enable **Usage alerts**
3. Configure thresholds at 50%, 75%, and 90%
4. Optionally add webhook for Slack/Discord

### Webhook Integration (Optional)

For real-time alerts in Slack or Discord:

1. Create an incoming webhook in your chat platform
2. In Vercel: **Settings** → **Webhooks**
3. Add webhook URL
4. Select **Usage Alert** events

## Free Tier Limits

Track these metrics against free tier allocations:

| Resource | Free Tier Limit | Suggested Alert |
|----------|-----------------|-----------------|
| Fast Data Transfer | 100 GB/month | 80 GB (80%) |
| Function Invocations | 100,000/month | 80,000 (80%) |
| Function Duration | 100 GB-hrs/month | 80 GB-hrs (80%) |
| Image Optimization | 1,000 images/month | 800 (80%) |
| Edge Middleware Invocations | 1,000,000/month | 800,000 (80%) |

## Monitoring Usage

### Daily/Weekly Review

Check usage in: **Vercel Dashboard** → **Usage**

Key areas to monitor:

1. **Top Paths** - Which routes consume most bandwidth
2. **Function Invocations** - Which API routes are called most
3. **Regional Distribution** - Pricing varies by region
4. **Bandwidth Graph** - Spot traffic spikes

### Cost Optimization Checklist

Based on usage data, consider:

- [x] **Caching** - Add cache headers to static assets ✅ Configured
- [ ] **Image Optimization** - Use next/image or optimize before upload
- [ ] **API Efficiency** - Reduce payload sizes, batch requests
- [ ] **Edge Functions** - Move compute closer to users
- [ ] **Regional Routing** - Serve from optimal regions

## CDN Cache Headers Configuration

All static assets are served from Vercel's edge CDN with aggressive caching headers configured in `vercel.json`.

### Current Cache Header Rules

| Resource Pattern | Cache-Control Value | Purpose |
|-----------------|---------------------|---------|
| `/images/(.*)` | `public, max-age=31536000, s-maxage=31536000, immutable` | Drummer photos and static images |
| `/(.*).js` | `public, max-age=31536000, immutable` | JavaScript bundles |
| `/(.*).css` | `public, max-age=31536000, immutable` | CSS stylesheets |
| `/_expo/static/(.*)` | `public, max-age=31536000, immutable` | Expo static assets |
| `/assets/(.*)` | `public, max-age=31536000, immutable` | General assets |
| `/api/image(.*)` | `public, max-age=31536000, s-maxage=31536000, stale-while-revalidate=604800, immutable` | Image API responses |
| `/api/drummers(.*)` | `public, s-maxage=3600, stale-while-revalidate=86400` | API data (1hr edge cache) |
| `/api/gear(.*)` | `public, s-maxage=3600, stale-while-revalidate=86400` | API data (1hr edge cache) |
| `/(.*)`  | `public, s-maxage=86400, stale-while-revalidate=604800` | Catch-all (24hr edge cache) |

### Cache Header Meanings

- **`max-age=31536000`** - Browser caches for 1 year (365 days)
- **`s-maxage=31536000`** - CDN edge caches for 1 year
- **`immutable`** - Asset never changes; browser skips revalidation requests
- **`stale-while-revalidate`** - Serve stale content while fetching fresh in background

### Benefits

1. **Reduced bandwidth costs** - Returning visitors load from browser cache
2. **Lower latency** - Assets served from nearest edge location
3. **Better SEO scores** - Fast loading improves Core Web Vitals
4. **Reduced origin load** - Edge handles most requests

### Verification

Test cache headers with:
```bash
curl -I https://metalforge.io/images/drummers/lars-ulrich.webp | grep -i cache
```

Expected output should include `Cache-Control: public, max-age=31536000`

## Current Configuration (MetalDrummerGear)

**Project Settings Applied:**

| Setting | Value | Date Configured |
|---------|-------|-----------------|
| Spend Limit | $20/month | [Manual action required] |
| Alert at 50% | Enabled | [Manual action required] |
| Alert at 75% | Enabled | [Manual action required] |
| Alert at 90% | Enabled | [Manual action required] |
| Pause on Limit | Yes | [Manual action required] |

> ⚠️ **Action Required**: The above settings must be configured manually in the Vercel dashboard by the project owner.

## Emergency Procedures

### If You Hit the Limit

1. **Immediate**: Check if traffic is legitimate or an attack
2. **Short-term**: Increase limit temporarily if traffic is genuine
3. **Long-term**: Implement caching/CDN or upgrade plan

### DDoS/Traffic Spike

1. Enable Vercel's built-in DDoS protection (enabled by default)
2. Review **Firewall** settings
3. Consider adding rate limiting to API routes

## References

- [Vercel Pricing](https://vercel.com/pricing)
- [Manage and Optimize Usage](https://vercel.com/docs/pricing/manage-and-optimize-usage)
- [Spend Management](https://vercel.com/docs/accounts/billing/spend-management)
- [Usage Notifications](https://vercel.com/docs/accounts/billing/usage-notifications)

---

*Last updated: 2026-02-04*
