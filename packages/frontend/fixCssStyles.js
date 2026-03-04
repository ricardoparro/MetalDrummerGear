/**
 * EMERGENCY FIX: Patch react-native-web's setValueForStyles at runtime
 * 
 * Uses Proxy to intercept numeric property assignments on CSSStyleDeclaration.
 * This fixes the "Failed to set indexed property" error in Safari/WebKit.
 */

if (typeof window !== 'undefined') {
  // Cache Proxy instances per style object
  const proxyCache = new WeakMap();
  
  // Elements that should NOT have proxied styles (form elements)
  const noProxyTags = new Set(['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON', 'OPTION']);
  
  // Wrap element.style getter to return a Proxy (except for form elements)
  const originalStyleGetter = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'style');
  if (originalStyleGetter && originalStyleGetter.get) {
    Object.defineProperty(HTMLElement.prototype, 'style', {
      get: function() {
        const realStyle = originalStyleGetter.get.call(this);
        
        // Don't proxy form elements - they need native style handling
        if (noProxyTags.has(this.tagName)) {
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
