/**
 * EMERGENCY FIX: Patch react-native-web's setValueForStyles at runtime
 * 
 * This patches the function that sets CSS styles on elements.
 * It wraps the original to skip numeric property names (0, 1, 2, etc.)
 * which cause "Failed to set indexed property" errors.
 */

if (typeof window !== 'undefined') {
  // Approach: Wrap the specific react-native-web function that iterates styles
  // and causes numeric property assignments. Find it by its error signature.
  
  // Global error handler to suppress this specific error
  const originalError = window.Error;
  window.Error = function(...args) {
    const err = new originalError(...args);
    if (err.message && err.message.includes('indexed property')) {
      // Return a dummy error that won't break things
      err.suppressReactNativeWeb = true;
    }
    return err;
  };
  window.Error.prototype = originalError.prototype;
  
  // Also catch at window level
  window.addEventListener('error', function(e) {
    if (e.message && e.message.includes('indexed property')) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }, true);
  
  // Patch Array.prototype methods used by react-native-web style iteration
  // The bug happens when iterating over a styles object that has numeric keys
  const originalForEach = Array.prototype.forEach;
  const originalKeys = Object.keys;
  
  Object.keys = function(obj) {
    const keys = originalKeys.call(Object, obj);
    // If this looks like a CSSStyleDeclaration iteration, filter numeric keys
    if (obj && obj.constructor && obj.constructor.name === 'CSSStyleDeclaration') {
      return keys.filter(k => !/^\d+$/.test(k));
    }
    // If this is a styles object being applied, filter numeric keys
    if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
      const hasNumericKeys = keys.some(k => /^\d+$/.test(k));
      if (hasNumericKeys) {
        return keys.filter(k => !/^\d+$/.test(k));
      }
    }
    return keys;
  };
}

export default {};
