/**
 * EMERGENCY FIX: Patch react-native-web's setValueForStyles at runtime
 * 
 * This patches the function that sets CSS styles on elements.
 * It wraps the original to skip numeric property names (0, 1, 2, etc.)
 * which cause "Failed to set indexed property" errors.
 */

if (typeof window !== 'undefined') {
  // SURGICAL FIX: Only patch CSSStyleDeclaration to ignore numeric assignments
  // This is the minimal change needed to fix react-native-web's setValueForStyles bug
  // without breaking TextInput or other components
  
  const cssProto = CSSStyleDeclaration.prototype;
  
  // Create a setter that ignores numeric property names
  // This intercepts element.style[0] = value, element.style[1] = value, etc.
  for (let i = 0; i < 100; i++) {
    try {
      Object.defineProperty(cssProto, i, {
        set: function() { /* ignore */ },
        get: function() { return ''; },
        configurable: true,
      });
    } catch (e) {
      // Property might already exist or be non-configurable
    }
  }
}

export default {};
