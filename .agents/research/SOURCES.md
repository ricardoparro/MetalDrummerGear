# SOURCES.md — Official Verification Sources

## Research Protocol

**Rule:** Never trust memory or generic web search. Always verify from official sources.

**Minimum requirement:** 2 sources must confirm gear before marking as `verified: true`

---

## 🥇 Tier 1 — Brand Artist Pages (PRIMARY)

These are the **most reliable** sources. If a drummer is endorsed, they appear here.

### Drums
| Brand | Artist Page | Notes |
|-------|-------------|-------|
| Tama | https://www.tama.com/usa/artists/ | Search by name |
| Pearl | https://pearldrum.com/artists | Filter by genre |
| Sonor | https://www.sonor.com/artists/ | |
| DW | https://www.dwdrums.com/artists/ | Drum Workshop |
| Mapex | https://mapexdrums.com/us/artists/ | |
| Ludwig | https://www.ludwig-drums.com/en-us/ludwig/artists | |
| Gretsch | https://www.gretschdrums.com/artists | |
| Yamaha | https://usa.yamaha.com/artists/index.html | Filter: Drums |
| SJC | https://sjcdrums.com/pages/artists | Custom drums |
| British Drum Co | https://britishdrumco.com/artists/ | |

### Cymbals
| Brand | Artist Page | Notes |
|-------|-------------|-------|
| Zildjian | https://zildjian.com/artists | Largest roster |
| Sabian | https://sabian.com/artists | |
| Paiste | https://www.paiste.com/e/artists.php | Search function |
| Meinl | https://meinlcymbals.com/en/artists | Growing roster |
| Istanbul Agop | https://istanbulagop.com/artists/ | |
| Dream | https://dreamcymbals.com/artists/ | |

### Sticks & Hardware
| Brand | Artist Page | Notes |
|-------|-------------|-------|
| Vic Firth | https://vicfirth.zildjian.com/artists.html | Part of Zildjian |
| Vater | https://vater.com/artists/ | |
| Promark | https://www.daddario.com/promark-artists/ | D'Addario owned |
| Ahead | https://aheaddrumsticks.com/artists/ | |
| Remo | https://remo.com/artists/ | Heads |
| Evans | https://www.daddario.com/evans-artists/ | Heads |

### Pedals & Hardware
| Brand | Artist Page | Notes |
|-------|-------------|-------|
| DW | https://www.dwdrums.com/artists/ | 9000/5000 series |
| Tama | https://www.tama.com/usa/artists/ | Iron Cobra, Speed Cobra |
| Pearl | https://pearldrum.com/artists | Demon/Eliminator |
| Axis | https://axispercussion.com/artists/ | A-series, Longboards |

---

## 🥈 Tier 2 — Secondary Verification

Use these to **cross-check** or when Tier 1 is incomplete.

### Interviews & Videos
| Source | URL | Best For |
|--------|-----|----------|
| Modern Drummer | https://www.moderndrummer.com/ | In-depth interviews |
| Drumeo | https://www.youtube.com/@drumlounge | Gear tours, lessons |
| Drum Magazine | https://drummagazine.com/ | Reviews, interviews |
| Drummer's Resource | https://drummersresource.com/ | Podcast interviews |

### Social Media (Recent Posts Only)
| Platform | Usage |
|----------|-------|
| Instagram | Check drummer's recent gear posts |
| YouTube | Official gear rundown videos |
| X/Twitter | Endorsement announcements |

**⚠️ Social media rule:** Only use posts from last 12 months. Endorsements change!

---

## 🥉 Tier 3 — Last Resort

Use **only** when Tier 1 & 2 fail, and mark as `verified: false`

- Wikipedia (often outdated)
- Generic web search
- Forum posts
- Fan sites

---

## Verification Status

Each gear item should have:

```json
{
  "item": "Tama Starclassic Walnut/Birch",
  "category": "drums",
  "verified": true,
  "sources": [
    "https://www.tama.com/usa/artists/artist_detail/1234",
    "https://www.moderndrummer.com/article/interview-2025"
  ],
  "lastVerified": "2026-02-01"
}
```

### Status Meanings

| Status | Meaning |
|--------|---------|
| `verified: true` | 2+ Tier 1/2 sources confirm |
| `verified: false` | Only Tier 3 sources, needs verification |
| `verified: null` | Not yet researched |

---

## Research Workflow

```
1. Search Tier 1 brand pages for drummer
2. Document exact URLs found
3. Cross-check with Tier 2 (interview/video)
4. If 2+ sources agree → verified: true
5. If only Tier 3 → verified: false + flag for review
6. Update lastVerified date
```

---

## Known Endorsement Changes (2024-2026)

| Drummer | Old | New | Date |
|---------|-----|-----|------|
| Eloy Casagrande | Tama | Pearl (Sepultura → Slipknot) | 2024 |
| Jay Weinberg | Pearl | ? (left Slipknot) | 2023 |

**Always check for recent changes!**
