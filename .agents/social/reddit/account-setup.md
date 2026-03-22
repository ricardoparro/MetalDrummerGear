# Reddit Account Setup — CEO-010

## 🎯 Requirements

For the campaign to succeed, we need:
- ✅ Reddit account with **>100 karma**
- ✅ Account is **>7 days old**
- ✅ No previous bans or shadowbans
- ✅ Some activity in drum/metal subreddits (establishes credibility)

---

## Option A: Use Existing Account (Recommended)

**Fastest path to launch!**

If you (Ricardo) have an existing Reddit account that meets the requirements:

### Steps

1. **Verify account health:**
   - Go to https://www.reddit.com/user/[YOUR_USERNAME]
   - Check karma is >100
   - Verify account age >7 days
   - Test: Can you post/comment without issues?

2. **Check for shadowban:**
   - Visit https://www.reddit.com/r/ShadowBan
   - Post "Am I shadowbanned?" to check

3. **Grant agent access:**

   **Option A1: Share read-only access (safest)**
   - Provide username for monitoring
   - Agent suggests posts → you post manually
   - You maintain full control

   **Option A2: Full automation**
   - Set up Reddit API credentials (see below)
   - Agent can post directly

### Reddit API Setup (if automating)

1. Go to https://www.reddit.com/prefs/apps
2. Click "create another app"
3. Select "script"
4. Name: `MetalForge-Agent`
5. Redirect URI: `http://localhost:8080`
6. Copy credentials to `.credentials.env`:

```env
REDDIT_CLIENT_ID=your_client_id
REDDIT_CLIENT_SECRET=your_client_secret
REDDIT_USERNAME=your_username
REDDIT_PASSWORD=your_password
```

---

## Option B: Create New Account

**Adds ~7 day delay** but gives us a dedicated brand account.

### Recommended Username

- `u/MetalDrumGear` (if available)
- `u/MetalForgeIO`
- `u/DrumGearDB`

### New Account Process

1. **Day 0:** Create account at reddit.com
2. **Days 1-7:** Build karma using `karma-builder.md` guide
3. **Day 8+:** Ready for campaign launch

### Why the Delay?

Reddit heavily filters new accounts:
- Posts may be auto-removed
- Some subreddits have minimum karma requirements
- New accounts look spammy
- Building genuine activity first = better reception

---

## ✅ Ready Checklist

Before launching campaign, verify:

- [ ] Account username: `_______________`
- [ ] Karma: _____ (need >100)
- [ ] Account age: _____ days (need >7)
- [ ] Shadowban check: ✅ Not banned
- [ ] Test post worked: ✅ Yes
- [ ] API credentials configured (if automating): ✅ Yes

---

## 🚀 Once Ready

1. Update `CAMPAIGN.md` status to **ACTIVE**
2. Set campaign start date
3. First post: `01-drums-database.md` to r/drums (Monday 10 AM EST)
4. Create `tracking.md` for metrics

---

## Decision Needed

**Ricardo:** Please comment on Issue #718 with your decision:

- [ ] **Option A:** "Using my existing account [username]. Karma: [X]. Will post manually."
- [ ] **Option A + API:** "Using my existing account. API credentials coming via secure channel."
- [ ] **Option B:** "Create new account. Start karma building today."

---

*Estimated time to campaign launch:*
- Option A: **Immediate** (once confirmed)
- Option B: **~7-10 days** (karma building period)
