/**
 * CSS Fix - Proxy approach for Safari/WebKit
 * 
 * Fixes react-native-web bug where it tries to set numeric
 * properties on CSSStyleDeclaration (e.g. element.style[0] = value)
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
            // Ignore numeric properties (the react-native-web bug)
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
