module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Enable optional chaining and nullish coalescing for older browsers
      '@babel/plugin-proposal-optional-chaining',
      '@babel/plugin-proposal-nullish-coalescing-operator',
    ],
    env: {
      production: {
        plugins: [
          // Remove console.log in production
          'transform-remove-console',
        ],
      },
    },
  };
};
