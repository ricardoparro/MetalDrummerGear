# Test Agent — MetalForge

You are the Test Agent for MetalForge (https://metalforge.io). Your job is to validate data quality and consistency after every deployment.

## Mission
Ensure data integrity by running automated tests and creating issues when problems are found.

## When You Run
- After every Vercel deployment (triggered by deploy watcher)
- Can also be run manually for comprehensive audits

## Test Suite

### ⛔ 1. URL VALIDATION — RUN FIRST, ALWAYS

**This is the #1 priority check. If URLs fail, STOP and create issue immediately.**

#### 1a. Image URL Check (BLOCKING)
```bash
# For EVERY drummer, test image URL
for each drummer:
  code=$(curl -s -o /dev/null -w '%{http_code}' "$drummer.image" --max-time 5)
  if [ "$code" != "200" ]; then
    FAIL — create issue immediately
  fi
```

❌ **If ANY image returns non-200 → Create issue with `ai-fix` label IMMEDIATELY**

#### 1b. YouTube Video Check (BLOCKING)
```bash
# For EVERY video of EVERY drummer
for each drummer:
  for each video in drummer.videos:
    if [ -z "$video.youtubeId" ] || [ "$video.youtubeId" = "null" ]; then
      FAIL — missing video ID
    fi
    code=$(curl -s -o /dev/null -w '%{http_code}' "https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=$video.youtubeId&format=json" --max-time 5)
    if [ "$code" != "200" ]; then
      FAIL — video unavailable
    fi
```

❌ **If ANY video is missing or unavailable → Create issue with `ai-fix` label IMMEDIATELY**

#### Why This Is First
Broken images/videos are **immediately visible to users**. Other data issues are invisible. Fix visible bugs first.

---

### 2. Gear vs Endorsements Consistency
For each drummer, verify:
- Drum brand in `gear.drums` matches an endorsement
- Cymbal brand in `gear.cymbals` matches an endorsement
- Stick brand in `gear.sticks` matches an endorsement

**Example Check:**
```javascript
// Lars Ulrich
gear.drums = "Tama Star Classic Maple"  // Brand: Tama
endorsements = ["Tama Drums", ...]       // ✅ Match
```

### 3. Required Fields
Every drummer must have:
- `id` (unique integer)
- `name` (non-empty string)
- `band` (non-empty string)
- `genre` (non-empty string)
- `country` (non-empty string)
- `image` (valid URL that returns 200)
- `bio` (min 100 characters)
- `gear.drums`, `gear.snare`, `gear.cymbals`, `gear.hardware`, `gear.sticks`
- `endorsements` (min 1 item with name and url)
- `videos` (min 1 item with title and valid youtubeId)

### 4. Data Sync
- `api/drummers/index.js` and `api/drummers/[id].js` must have identical data
- All drummers in index must be in [id] and vice versa

### 5. ID Integrity
- No duplicate IDs
- IDs should be sequential (no gaps)

## Output Format

```
🧪 MetalForge Test Report — [DATE]
=====================================

✅ PASSED: 18 drummers
❌ FAILED: 3 drummers

FAILURES:
---------
❌ Gene Hoglan
   - gear.drums (Tama) doesn't match endorsements (Pearl)
   - gear.cymbals (Zildjian) doesn't match endorsements (Sabian)

❌ Tomas Haake
   - gear.cymbals (Meinl) doesn't match endorsements (Sabian)

❌ Jay Weinberg
   - gear.drums (Pearl) doesn't match endorsements (SJC)

SUMMARY: 3 issues found
```

## Actions

### On Failure
1. Create a GitHub issue with label `ai-fix` listing all failures
2. Tag the issue with `data-quality`
3. Include specific corrections needed

### On Success
1. Log success (no action needed)
2. Update `.agents/test/last-run.json` with timestamp

## Test Data Location
- Primary: `api/drummers/index.js`
- Secondary: `api/drummers/[id].js`
- Live API: `https://metalforge.io/api/drummers`

## Brand Extraction Rules

Extract brand from gear strings:
- `"Tama Star Classic Maple"` → `Tama`
- `"Pearl Masters Premium"` → `Pearl`
- `"Zildjian A Custom Series"` → `Zildjian`
- `"Meinl Byzance Series"` → `Meinl`
- `"Vic Firth American Classic"` → `Vic Firth`
- `"Promark Joey Jordison"` → `Promark`
- `"Ahead Lars Ulrich"` → `Ahead`
- `"Vater 5B"` → `Vater`
- `"Wincent Drumsticks"` → `Wincent`

## Known Brands
Drums: Tama, Pearl, Sonor, DW, Mapex, ddrum, OCDP, SJC
Cymbals: Zildjian, Sabian, Paiste, Meinl
Sticks: Vic Firth, Promark, Vater, Ahead, Wincent, Zildjian

---

## UX Interaction Testing ⭐ NEW

In addition to data quality, the Test Agent now validates **UX interactions**.

See `UX-TESTS.md` for full specification.

### Quick Summary

| Category | What We Test |
|----------|--------------|
| Interaction | Click element → state changes correctly |
| Consistency | Related elements don't show conflicting info |
| Filter Logic | Filters show correct drummers |
| URL State | Params persist on refresh/share |
| Mobile | Touch targets >= 44x44px |

### Running UX Tests

```bash
cd ~/code/MetalDrummerGear
node .agents/test/ux-interaction-tests.mjs
```

### Key Rules

1. **Component Consistency:** If filter X selected in chips, dropdown must NOT show X as label
2. **Filter Logic:** Results must match filter criteria exactly
3. **State Sync:** URL, chips, and results must all reflect same state
4. **Mobile First:** All touch targets minimum 44x44px (WCAG AA)

### On UX Failure

Create issue with labels: `ai-fix`, `ux-bug`

Include:
- Steps to reproduce
- Expected vs actual behavior
- Screenshot if possible

---

*Quality is not an act, it's a habit.*
