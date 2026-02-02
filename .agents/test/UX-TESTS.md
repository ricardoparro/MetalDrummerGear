# UX Test Agent — Interaction Testing

*Tests that verify UI behavior, not just appearance.*

---

## When to Run
- After every Vercel deployment
- After any PR that touches `packages/frontend/App.js`
- Manual trigger for comprehensive audit

---

## Test Categories

### 1. Interaction Testing

For each interactive element, verify state changes correctly.

#### Filter Chips
```javascript
// Test: Click filter chip
await page.click('[data-testid="filter-chip-pearl"]');

// Verify:
// ✓ Chip shows active state (dark background)
// ✓ Results update to show only Pearl drummers
// ✓ URL updates to include ?brand=pearl
// ✓ Result count updates ("Showing X of Y")
```

#### Dropdowns
```javascript
// Test: Open dropdown
await page.click('[data-testid="genre-dropdown"]');

// Verify:
// ✓ Dropdown menu appears
// ✓ Options are clickable
// ✓ Selecting option closes dropdown
// ✓ Selected value is reflected
```

#### Navigation
```javascript
// Test: Click drummer card
await page.click('[data-testid="drummer-card-lars-ulrich"]');

// Verify:
// ✓ URL changes to /drummer/1
// ✓ Drummer detail page loads
// ✓ Back button returns to list
```

---

### 2. Component Consistency

**Rule:** Related UI elements must not show conflicting information.

#### Filter Chips + Dropdown Conflict
```javascript
// Scenario: User selects "Pearl" from chips
await page.click('[data-testid="filter-chip-pearl"]');

// ❌ FAIL if: "More Brands" dropdown now shows "Pearl ▼"
// ✓ PASS if: "More Brands" dropdown still shows "More Brands" or "More ▼"

// Why: Confusing to show same value in two places
```

#### Active State Consistency
```javascript
// Scenario: Pearl is selected
// ✓ Pearl chip has active style
// ✓ Exactly ONE chip is active per filter category
// ✓ Clear All removes all active states
```

---

### 3. Filter Logic Validation

#### Genre Filter
```javascript
// Test: Select "Thrash Metal"
await page.click('[data-testid="filter-chip-thrash"]');

// Verify displayed drummers:
// ✓ Lars Ulrich (Metallica) - Thrash Metal
// ✓ Dave Lombardo (Slayer) - Thrash Metal
// ✓ Charlie Benante (Anthrax) - Thrash Metal
// ✗ Should NOT show: Joey Jordison (Nu Metal)
```

#### Brand Filter
```javascript
// Test: Select "Pearl"
await page.click('[data-testid="filter-chip-pearl"]');

// Verify displayed drummers match Pearl endorsement:
// ✓ Joey Jordison - Pearl
// ✓ Gene Hoglan - Pearl
// ✓ Ray Luzier - Pearl
// ✗ Should NOT show: Lars Ulrich (Tama)
```

#### Combined Filters
```javascript
// Test: Genre=Thrash + Brand=Tama
await page.click('[data-testid="filter-chip-thrash"]');
await page.click('[data-testid="filter-chip-tama"]');

// Verify:
// ✓ Only drummers matching BOTH criteria
// ✓ Lars Ulrich (Thrash + Tama) ✓
// ✓ Dave Lombardo (Thrash + Tama) ✓
// ✗ Gene Hoglan (Thrash but Pearl) ✗
```

#### Clear All
```javascript
// Test: Clear all filters
await page.click('[data-testid="clear-filters"]');

// Verify:
// ✓ All filter chips inactive
// ✓ All drummers visible
// ✓ URL has no filter params
// ✓ Result count shows total
```

---

### 4. URL State Sync

#### Filter URL Params
```javascript
// After selecting Pearl:
// URL should be: /drummers?brand=pearl

// Verify:
// ✓ Refreshing page keeps filter active
// ✓ Sharing URL shows same filtered view
// ✓ Back button restores previous filter state
```

#### Deep Links
```javascript
// Navigate directly to: /drummer/1
// Verify:
// ✓ Page loads without error
// ✓ Correct drummer (Lars Ulrich) shown
// ✓ All data populated
```

---

### 5. Mobile-Specific Tests

#### Touch Targets
```javascript
// All interactive elements must be >= 44x44px
// Test with viewport: 375x667 (iPhone SE)

// Check:
// ✓ Filter chips
// ✓ Dropdown buttons
// ✓ Navigation links
// ✓ Toggle switches
```

#### Responsive Layout
```javascript
// Test at breakpoints: 375px, 768px, 1024px, 1440px

// Verify:
// ✓ No horizontal scroll
// ✓ Text readable without zoom
// ✓ Touch elements not overlapping
```

---

## Test Output Format

```
🧪 UX Test Report — [DATE]
=====================================

INTERACTION TESTS
-----------------
✅ Filter chips toggle correctly
✅ Dropdown opens/closes
❌ FAIL: "More Brands" shows selected value instead of static label
✅ Clear All resets filters

COMPONENT CONSISTENCY
---------------------
❌ FAIL: Pearl chip active + Pearl dropdown label = conflict
✅ Only one filter active per category

FILTER LOGIC
------------
✅ Genre filter shows correct drummers
✅ Brand filter shows correct drummers
✅ Combined filters work
✅ Clear All shows all drummers

URL STATE
---------
✅ Filter params in URL
✅ Deep links work
✅ Refresh preserves state

MOBILE
------
✅ Touch targets >= 44px
⚠️ WARNING: Theme toggle is 40x20px

SUMMARY: 1 failure, 1 warning
```

---

## On Failure

1. Create GitHub issue with label `ai-fix` + `ux-bug`
2. Include:
   - Screenshot of the issue
   - Steps to reproduce
   - Expected vs actual behavior
3. Tag issue with severity (critical/major/minor)

---

## Test Data Requirements

Add `data-testid` attributes to key elements:
```jsx
<FilterChip data-testid="filter-chip-pearl" ... />
<FilterDropdown data-testid="genre-dropdown" ... />
<DrummerCard data-testid="drummer-card-lars-ulrich" ... />
<Button data-testid="clear-filters" ... />
```

---

*"Test the behavior, not just the appearance."*
