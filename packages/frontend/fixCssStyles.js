/**
 * EMERGENCY FIX: Patch react-native-web's setValueForStyles at runtime
 * 
 * This patches the function that sets CSS styles on elements.
 * It wraps the original to skip numeric property names (0, 1, 2, etc.)
 * which cause "Failed to set indexed property" errors.
 */

if (typeof window !== 'undefined') {
  // Track which style objects have been patched
  const patchedStyles = new WeakSet();
  
  // Patch a style object to have no-op setters for numeric properties
  function patchStyleObject(style) {
    if (patchedStyles.has(style)) return style;
    
    // Define numeric property setters that do nothing
    for (let i = 0; i < 50; i++) {
      const prop = String(i);
      try {
        Object.defineProperty(style, prop, {
          set: function() { /* ignore */ },
          get: function() { return this.item ? this.item(i) : ''; },
          configurable: true,
          enumerable: false
        });
      } catch (e) {
        // Some properties might not be configurable, that's ok
      }
    }
    
    patchedStyles.add(style);
    return style;
  }
  
  // Wrap element.style getter to patch the returned style object
  const originalStyleGetter = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'style');
  if (originalStyleGetter && originalStyleGetter.get) {
    Object.defineProperty(HTMLElement.prototype, 'style', {
      get: function() {
        const realStyle = originalStyleGetter.get.call(this);
        return patchStyleObject(realStyle);
      },
      configurable: true,
    });
  }
}

export default {};
