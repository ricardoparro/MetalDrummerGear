/**
 * EMERGENCY FIX: Patch react-native-web's setValueForStyles at runtime
 * 
 * This patches the function that sets CSS styles on elements.
 * It wraps the original to skip numeric property names (0, 1, 2, etc.)
 * which cause "Failed to set indexed property" errors.
 */

if (typeof window !== 'undefined') {
  // Wait for DOM to be ready
  const originalDefineProperty = Object.defineProperty;
  
  // Intercept CSSStyleDeclaration property sets
  const patchCSSStyleDeclaration = () => {
    const styleProto = CSSStyleDeclaration.prototype;
    const originalSetProperty = styleProto.setProperty;
    
    // Override the bracket notation setter by using a Proxy on style objects
    // This is tricky because CSSStyleDeclaration uses indexed properties internally
    // We need to catch the error and ignore it for numeric indices
  };
  
  // Simpler approach: Wrap element.style setter
  const originalElementGetter = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'style');
  if (originalElementGetter && originalElementGetter.get) {
    Object.defineProperty(HTMLElement.prototype, 'style', {
      get: function() {
        const style = originalElementGetter.get.call(this);
        // Return a Proxy that catches numeric property assignments
        return new Proxy(style, {
          set(target, prop, value) {
            // Skip numeric property names
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
      },
      configurable: true,
    });
  }
}

export default {};
