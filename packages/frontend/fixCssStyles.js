/**
 * CSS Fix v3 - Surgical approach
 * 
 * Instead of proxying element.style, we patch CSSStyleDeclaration.prototype
 * to handle numeric property assignments gracefully.
 * This avoids interfering with element focus/events.
 */

if (typeof window !== 'undefined' && typeof CSSStyleDeclaration !== 'undefined') {
  // Store original setProperty
  const originalSetProperty = CSSStyleDeclaration.prototype.setProperty;
  
  // Patch setProperty to ignore errors from react-native-web
  CSSStyleDeclaration.prototype.setProperty = function(property, value, priority) {
    try {
      // Skip numeric properties that react-native-web incorrectly tries to set
      if (typeof property === 'string' && /^\d+$/.test(property)) {
        return;
      }
      return originalSetProperty.call(this, property, value, priority);
    } catch (e) {
      // Silently ignore CSS errors
      console.debug('[CSS Fix] Ignored:', property, value, e.message);
    }
  };

  // Also patch direct property assignment for numeric indices
  // This is what react-native-web does: element.style[0] = value
  const originalStyleDescriptor = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'style');
  
  if (originalStyleDescriptor && originalStyleDescriptor.get) {
    // We need to wrap the style object's numeric setters
    // But we do it lazily, only when needed
    const patchedStyles = new WeakSet();
    
    Object.defineProperty(HTMLElement.prototype, 'style', {
      get: function() {
        const style = originalStyleDescriptor.get.call(this);
        
        // Only patch once per style object
        if (!patchedStyles.has(style)) {
          patchedStyles.add(style);
          
          // Create a handler for numeric property access
          // We use defineProperty on the specific style instance
          // This is less invasive than a full Proxy
          try {
            // Patch common numeric indices that RNW uses
            for (let i = 0; i < 100; i++) {
              const idx = String(i);
              Object.defineProperty(style, idx, {
                set: function(val) {
                  // Silently ignore - this is the buggy RNW behavior
                },
                get: function() {
                  return '';
                },
                configurable: true
              });
            }
          } catch (e) {
            // If we can't patch, that's ok - some browsers may not allow it
          }
        }
        
        return style;
      },
      configurable: true
    });
  }
}

export default {};
