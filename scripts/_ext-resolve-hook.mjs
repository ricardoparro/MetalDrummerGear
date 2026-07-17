// Node ESM loader hook: falls back to appending '.js' when a bare relative
// import specifier doesn't resolve. Several frontend data modules import
// sibling files without an extension (fine for the Metro/esbuild bundlers
// that actually ship them, but plain `node` requires the extension). Rather
// than touch every such import across the codebase, scripts that need to
// load those modules directly (e.g. audit-video-seo.mjs, which imports the
// real api/meta/[...path].js handler) register this resolver instead.
export async function resolve(specifier, context, nextResolve) {
  try {
    return await nextResolve(specifier, context);
  } catch (err) {
    if (err.code === 'ERR_MODULE_NOT_FOUND' && (specifier.startsWith('.') || specifier.startsWith('/'))) {
      return nextResolve(specifier + '.js', context);
    }
    throw err;
  }
}
