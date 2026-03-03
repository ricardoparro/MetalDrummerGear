/**
 * EMERGENCY FIX: Patch react-native-web's setValueForStyles at runtime
 * 
 * This patches the function that sets CSS styles on elements.
 * It wraps the original to skip numeric property names (0, 1, 2, etc.)
 * which cause "Failed to set indexed property" errors.
 */

if (typeof window !== 'undefined') {
  // Cache Proxy instances per style object
  const proxyCache = new WeakMap();
  
  // Tags that should NOT be proxied (form elements that need direct style access)
  const skipProxyTags = new Set(['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON']);
  
  // Wrap element.style getter to return a Proxy that ignores numeric assignments
  const originalStyleGetter = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'style');
  if (originalStyleGetter && originalStyleGetter.get) {
    Object.defineProperty(HTMLElement.prototype, 'style', {
      get: function() {
        const realStyle = originalStyleGetter.get.call(this);
        
        // Skip proxy for form elements - return real style directly
        if (skipProxyTags.has(this.tagName)) {
          return realStyle;
        }
        
        // Check if we already have a proxy for this style object
        let proxy = proxyCache.get(realStyle);
        if (proxy) return proxy;
        
        // Create proxy that ignores numeric property assignments
        proxy = new Proxy(realStyle, {
          set(target, prop, value) {
            // Skip numeric properties (fixes react-native-web CSS bug)
            if (typeof prop === 'string' && /^\d+$/.test(prop)) {
              return true;
            }
            target[prop] = value;
            return true;
          },
          get(target, prop) {
            const val = target[prop];
            return typeof val === 'function' ? val.bind(target) : val;
          }
        });
        
        proxyCache.set(realStyle, proxy);
        return proxy;
      },
      configurable: true,
    });
  }
}

export default {};
