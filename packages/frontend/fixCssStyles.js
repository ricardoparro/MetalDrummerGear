/**
 * CSS Fix - Proxy approach (works for non-input pages)
 * 
 * This fixes the Safari/WebKit CSS bug where react-native-web
 * tries to set numeric properties on CSSStyleDeclaration.
 * 
 * Note: This Proxy interferes with input focus, so search is
 * temporarily disabled until we find a better solution.
 */

if (typeof window !== 'undefined') {
  const proxyCache = new WeakMap();
  
  const originalStyleGetter = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'style');
  if (originalStyleGetter && originalStyleGetter.get) {
    Object.defineProperty(HTMLElement.prototype, 'style', {
      get: function() {
        const realStyle = originalStyleGetter.get.call(this);
        
        let proxy = proxyCache.get(realStyle);
        if (proxy) return proxy;
        
        proxy = new Proxy(realStyle, {
          set(target, prop, value) {
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
