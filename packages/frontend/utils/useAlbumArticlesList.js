// Fix #5169 (L4 perf regression): shared loader for the /songs pages' album-
// article dependency. These pages are already lazy (React.lazy) chunks of
// their own; a *static* import of the album-articles dataset from inside one
// of them would duplicate that multi-MB dataset across chunks and get
// hoisted by Metro into the always-loaded `__common` bundle (the exact bug
// this fix resolves in data/metalSongsBpm.js). Going through a dynamic
// import() keeps it a single shared async chunk, same as the rest of the app.
//
// Issue #7149: getSongPageGate/getSongPageSlugs/getSongPageData (the only
// consumers of this list) only ever read `.relatedDrummerSlug`/`.albumTitle`/
// `.slug`/`.title` off each entry, so this loads the lightweight metadata
// manifest instead of every article's full body content.
import { useEffect, useState } from 'react';

let _loadPromise = null;
function loadAlbumArticlesList() {
  if (!_loadPromise) {
    _loadPromise = import('../data/albumArticles/generated/albumArticlesManifest').then((m) => m.ALBUM_ARTICLES_MANIFEST);
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
