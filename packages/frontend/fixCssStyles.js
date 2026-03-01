/**
 * EMERGENCY FIX: Patch react-native-web's setValueForStyles at runtime
 * 
 * This patches the function that sets CSS styles on elements.
 * It wraps the original to skip numeric property names (0, 1, 2, etc.)
 * which cause "Failed to set indexed property" errors.
 */

if (typeof window !== 'undefined') {
  // Cache Proxy instances per element to maintain reference equality
  const proxyCache = new WeakMap();
  
  // Simpler approach: Wrap element.style getter
  const originalElementGetter = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'style');
  if (originalElementGetter && originalElementGetter.get) {
    Object.defineProperty(HTMLElement.prototype, 'style', {
      get: function() {
        // Check cache first
        let proxy = proxyCache.get(this);
        if (proxy) {
          return proxy;
        }
        
        const style = originalElementGetter.get.call(this);
        // Return a Proxy that catches numeric property assignments
        proxy = new Proxy(style, {
          set(target, prop, value) {
            // Skip numeric property names (fixes react-native-web CSS bug)
            if (/^\d+$/.test(String(prop))) {
              return true; // Pretend it succeeded
            }
            target[prop] = value;
            return true;
          },
          get(target, prop) {
            const val = target[prop];
            if (typeof val === 'function') {
              return val.bind(target);
            }
            return val;
          }
        });
        
        // Cache the proxy
        proxyCache.set(this, proxy);
        return proxy;
      },
      configurable: true,
    });
  }
}

export default {};
