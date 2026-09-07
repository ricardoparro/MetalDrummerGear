// Fix #5169 (L4 perf regression): shared loader for the /songs pages' album-
// article dependency. These pages are already lazy (React.lazy) chunks of
// their own; a *static* import of the album-articles dataset from inside one
// of them would duplicate that multi-MB dataset across chunks and get
// hoisted by Metro into the always-loaded `__common` bundle (the exact bug
// this fix resolves in data/metalSongsBpm.js). Going through a dynamic import
// keeps it a single shared async chunk, same as the rest of the app.
//
// Issue #7149: the /songs matching logic (metalSongsBpm.js's
// getSongPageGate/getSongPageSlugs) only ever reads `relatedDrummerSlug` and
// `albumTitle` off each entry, so this loads the small albumArticlesCatalog
// chunk (metadata only) instead of the ~10MB full-body album-articles bundle.
import { useEffect, useState } from 'react';

let _loadPromise = null;
function loadAlbumArticlesList() {
  if (!_loadPromise) {
    _loadPromise = import('../data/albumArticles/albumArticlesCatalog.js').then((m) => Object.values(m.ALBUM_ARTICLES_META));
  }
  return _loadPromise;
}

// Returns [] until the album-articles chunk resolves, then the real list.
export function useAlbumArticlesList() {
  const [list, setList] = useState([]);
  useEffect(() => {
    let mounted = true;
    loadAlbumArticlesList().then((resolved) => {
      if (mounted) setList(resolved);
    });
    return () => { mounted = false; };
  }, []);
  return list;
}
