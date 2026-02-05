// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Enable tree shaking and optimize bundle
config.transformer = {
  ...config.transformer,
  minifierConfig: {
    keep_classnames: false,
    keep_fnames: false,
    mangle: {
      toplevel: true,
    },
    compress: {
      // Enable aggressive dead code elimination
      drop_console: true,
      drop_debugger: true,
      pure_funcs: ['console.log', 'console.info', 'console.debug'],
      passes: 2,
    },
  },
};

// Enable experimental web support features
config.resolver = {
  ...config.resolver,
  // Optimize for web
  platforms: ['web', 'ios', 'android'],
};

module.exports = config;
