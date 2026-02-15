// @ts-check
const { defineConfig, devices } = require('@playwright/test');

// Base URL for tests - don't append query string here as it breaks path resolution
const BASE_URL = process.env.BASE_URL || 'https://metalforge.io';

module.exports = defineConfig({
  testDir: './e2e',
  testMatch: '**/*.spec.cjs',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 4 : undefined,
  timeout: 30000,
  expect: {
    timeout: 10000,
  },
  reporter: [
    ['html'],
    ['list'],
    ...(process.env.CI ? [['github']] : []),
  ],
  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
    // Add ci_test parameter via extra HTTP headers instead of URL to avoid GA tracking in CI
    extraHTTPHeaders: process.env.CI ? { 'X-CI-Test': '1' } : {},
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
