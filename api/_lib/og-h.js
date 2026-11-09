// Minimal JSX-free element factory for @vercel/og (satori).
//
// Vercel's zero-config detection only treats api/**/*.{js,mjs,ts,tsx} as
// functions, so the former api/og/*.jsx and api/card/[slug].jsx files were
// never deployed and every og:image pointing at them 404'd in production.
// Satori accepts plain React-element-like objects ({ type, props }), so the
// image functions build their trees with h() and ship as ordinary .js files.
// Files under api/_lib are not routed as functions (leading underscore).
export function h(type, props, ...children) {
  const { key, ...rest } = props || {};
  const kids = children
    .flat(Infinity)
    .filter(c => c !== null && c !== undefined && c !== false && c !== true);
  if (kids.length === 1) rest.children = kids[0];
  else if (kids.length > 1) rest.children = kids;
  if (typeof type === 'function') return type(rest);
  return { type, key: key ?? null, props: rest };
}
