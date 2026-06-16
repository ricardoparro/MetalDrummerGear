// Vercel Edge Middleware - Markdown for Agents
// Issue: content negotiation so agents sending `Accept: text/markdown` get a
// markdown version of page routes, while browsers keep getting HTML.
//
// Middleware runs BEFORE the filesystem check, which is why this can intercept
// `/` (a static index.html that would otherwise shadow any vercel.json rewrite).
// See https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/

import { next, rewrite } from '@vercel/edge';

export const config = {
  // Only page routes that have a markdown equivalent. Assets and /api are untouched.
  matcher: ['/', '/drummer/:slug'],
};

function withVary(response) {
  // Caches must key on Accept so a markdown response is never served to a
  // browser (or vice-versa) for the same URL.
  response.headers.set('Vary', 'Accept');
  return response;
}

export default function middleware(request) {
  const accept = request.headers.get('accept') || '';

  // Browsers/default clients never send text/markdown -> serve HTML as usual.
  if (!accept.includes('text/markdown')) {
    return withVary(next());
  }

  const path = (new URL(request.url).pathname.replace(/\/+$/, '') || '/');

  let target = null;
  if (path === '/') {
    target = '/api/home/markdown';
  } else {
    const match = path.match(/^\/drummer\/([^/]+)$/);
    if (match) target = `/api/drummer/${match[1]}/markdown`;
  }

  if (!target) {
    return withVary(next());
  }

  return withVary(rewrite(new URL(target, request.url)));
}
