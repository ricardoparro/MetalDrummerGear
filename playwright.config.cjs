// @ts-check
const { defineConfig, devices } = require('@playwright/test');

// Base URL for tests - append ci_test param in CI to exclude from GA4 analytics
const RAW_BASE_URL = process.env.BASE_URL || 'https://metalforge.io';
const BASE_URL = process.env.CI ? `${RAW_BASE_URL}?ci_test=1` : RAW_BASE_URL;

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
    // Backup header for server-side CI detection (URL param handles GA4 client-side)
    extraHTTPHeaders: process.env.CI ? { 'X-CI-Test': '1' } : {},
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
