# YouTube Video Verification Report

**Generated:** 2026-02-26T09:35:00Z  
**Total Videos Verified:** 96 (after cleanup)

## Summary

✅ **ALL 96 VIDEOS VERIFIED SUCCESSFULLY**

Following an audit that identified 65 broken YouTube links (404 errors), all invalid videos have been removed from the database. The remaining 96 video links have been verified as working.

---

## Audit Results (2026-02-26)

### Broken Videos Removed (65 total)

The following drummers had broken video links removed:

| Drummer | Videos Removed |
|---------|----------------|
| Abe Cunningham | 2 |
| Aquiles Priester | 3 |
| Ben Koller | 3 |
| Bill Ward | 2 |
| Blake Richardson | 3 |
| Chris Turner | 3 |
| Danny Carey | 1 |
| Derek Roddy | 2 |
| Dirk Verbeuren | 2 |
| Flo Mounier | 3 |
| Frost | 3 |
| Gavin Harrison | 2 |
| Hannes Grossmann | 1 |
| Igor Cavalera | 3 |
| Jaska Raatikainen | 1 |
| Jason Bittner | 3 |
| Jocke Wallgren | 1 |
| Kevin Talley | 1 |
| Martin Lopez | 3 |
| Matt Greiner | 3 |
| Mike Mangini | 1 |
| Morgan Ågren | 3 |
| Nick Augusto | 3 |
| Raymond Herrera | 3 |
| Richard Christy | 2 |
| Ryan Van Poederooyen | 2 |
| Shannon Larkin | 3 |
| Tim Yeung | 1 |
| Travis Orbin | 2 |

### Videos Still Valid (96)

All remaining videos in the database have been verified as accessible via YouTube's oEmbed API.

---

## Drummers with Valid Videos

The following drummers retain working video links:

1. Lars Ulrich (Metallica) - 3 videos
2. Joey Jordison (Slipknot) - 3 videos
3. Gene Hoglan (Death/Testament) - 3 videos
4. Dave Lombardo (Slayer) - 3 videos
5. Tomas Haake (Meshuggah) - 3 videos
6. George Kollias (Nile) - 3 videos
7. Eloy Casagrande (Slipknot) - 3 videos
8. Ray Luzier (Korn) - 3 videos
9. John Otto (Limp Bizkit) - 3 videos
10. Jay Weinberg (Suicidal Tendencies) - 3 videos
11. Vinnie Paul (Pantera) - 3 videos
12. Charlie Benante (Anthrax) - 3 videos
13. Mike Portnoy (Dream Theater) - 3 videos
14. Mario Duplantier (Gojira) - 3 videos
15. Danny Carey (Tool) - 2 videos (1 removed)
16. + Others with verified links

---

## Verification Method

1. Extracted all YouTube video IDs from `api/drummers/index.js`
2. Used YouTube oEmbed API (`https://www.youtube.com/oembed?url=...&format=json`) to verify each video
3. Removed all videos returning HTTP 404 (Not Found)
4. Re-verified remaining videos to ensure 100% validity

---

## Recommendations

1. **Add replacement videos**: The affected drummers now have reduced video content. Future updates should add new, verified video links.
2. **Regular monitoring**: Schedule periodic verification to catch broken links early.
3. **Prefer official channels**: Videos from official artist/label channels are more stable than fan uploads.

---

## Conclusion

**65 broken videos removed.** Database now contains 96 verified, working YouTube video links across all drummer profiles.
