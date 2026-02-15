// @ts-check
const { defineConfig, devices } = require('@playwright/test');

// Append ci_test parameter in CI to exclude from Google Analytics tracking
const BASE_URL = process.env.BASE_URL || 'https://metalforge.io';
const TEST_BASE_URL = process.env.CI ? `${BASE_URL}?ci_test=1` : BASE_URL;

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
    baseURL: TEST_BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
