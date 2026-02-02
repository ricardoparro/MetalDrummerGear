#!/usr/bin/env node
import { chromium } from 'playwright';
import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';

const SCREENSHOTS_DIR = './ux-screenshots';
const SITE_URL = 'https://metalforge.io';

const VIEWPORTS = {
  mobile: { width: 375, height: 667 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1440, height: 900 }
};

const PAGES = [
  { name: 'homepage', path: '/' },
  { name: 'compare', path: '/compare' },
  { name: 'drummer-lars', path: '/drummer/lars-ulrich' }
];

async function runTests() {
  console.log('🎨 UX Test Report — ' + new Date().toISOString().split('T')[0]);
  console.log('='.repeat(60) + '\n');

  await mkdir(SCREENSHOTS_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const issues = [];

  try {
    // Test each viewport
    for (const [viewportName, viewport] of Object.entries(VIEWPORTS)) {
      console.log(`📱 ${viewportName.toUpperCase()} (${viewport.width}x${viewport.height})`);

      const context = await browser.newContext({
        viewport,
        userAgent: viewportName === 'mobile'
          ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15'
          : undefined
      });
      const page = await context.newPage();

      for (const pageInfo of PAGES) {
        const url = SITE_URL + pageInfo.path;
        try {
          await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
          await page.waitForTimeout(2000); // Wait for animations

          const screenshotPath = join(SCREENSHOTS_DIR, `${viewportName}-${pageInfo.name}.png`);
          await page.screenshot({ path: screenshotPath, fullPage: true });

          // Check for horizontal scroll
          const hasHorizontalScroll = await page.evaluate(() => {
            return document.documentElement.scrollWidth > document.documentElement.clientWidth;
          });

          // Check for text overlap issues
          const overlapIssues = await page.evaluate(() => {
            const issues = [];
            const elements = document.querySelectorAll('*');
            for (const el of elements) {
              const rect = el.getBoundingClientRect();
              const style = window.getComputedStyle(el);
              if (style.overflow === 'visible' && rect.width > 0) {
                if (el.scrollWidth > rect.width + 5) {
                  issues.push(`Text overflow in ${el.tagName}.${el.className}`);
                }
              }
            }
            return issues.slice(0, 5);
          });

          // Check touch target sizes on mobile
          let smallTouchTargets = [];
          if (viewportName === 'mobile') {
            smallTouchTargets = await page.evaluate(() => {
              const clickables = document.querySelectorAll('button, a, [role="button"], input, select');
              const small = [];
              for (const el of clickables) {
                const rect = el.getBoundingClientRect();
                if (rect.width > 0 && rect.height > 0 && (rect.width < 44 || rect.height < 44)) {
                  small.push(`${el.tagName} (${Math.round(rect.width)}x${Math.round(rect.height)})`);
                }
              }
              return small.slice(0, 5);
            });
          }

          // Report status
          const pageIssues = [];
          if (hasHorizontalScroll) pageIssues.push('Horizontal scroll detected');
          if (overlapIssues.length) pageIssues.push(`Text overflow: ${overlapIssues.join(', ')}`);
          if (smallTouchTargets.length) pageIssues.push(`Small touch targets: ${smallTouchTargets.join(', ')}`);

          if (pageIssues.length) {
            console.log(`❌ ${pageInfo.name}: FAIL`);
            pageIssues.forEach(issue => console.log(`   - ${issue}`));
            issues.push({ viewport: viewportName, page: pageInfo.name, url, issues: pageIssues, screenshot: screenshotPath });
          } else {
            console.log(`✅ ${pageInfo.name}: OK`);
          }

        } catch (err) {
          console.log(`❌ ${pageInfo.name}: ERROR - ${err.message}`);
          issues.push({ viewport: viewportName, page: pageInfo.name, url, issues: [`Page error: ${err.message}`] });
        }
      }

      // Test Compare dropdown functionality on mobile
      if (viewportName === 'mobile') {
        console.log('\n🔍 Testing Compare Dropdown...');
        try {
          await page.goto(SITE_URL + '/compare', { waitUntil: 'networkidle', timeout: 30000 });
          await page.waitForTimeout(2000);

          // Find and click dropdowns
          const dropdowns = await page.$$('[data-testid*="dropdown"], select, [role="listbox"], [role="combobox"], .dropdown, [class*="dropdown"], [class*="select"]');

          if (dropdowns.length === 0) {
            // Try clicking anything that looks like a dropdown trigger
            const triggers = await page.$$('button:has-text("Select"), button:has-text("Choose"), [class*="trigger"]');
            if (triggers.length > 0) {
              await triggers[0].click();
              await page.waitForTimeout(500);
            }
          } else {
            await dropdowns[0].click();
            await page.waitForTimeout(500);
          }

          await page.screenshot({ path: join(SCREENSHOTS_DIR, 'mobile-compare-dropdown-open.png'), fullPage: true });

          // Check if dropdown content is visible and not hidden behind other elements
          const dropdownVisible = await page.evaluate(() => {
            const dropdowns = document.querySelectorAll('[role="listbox"], [class*="dropdown-menu"], [class*="options"], ul[class*="list"]');
            for (const dd of dropdowns) {
              const rect = dd.getBoundingClientRect();
              const style = window.getComputedStyle(dd);
              if (rect.height > 0 && style.visibility !== 'hidden' && style.display !== 'none') {
                // Check z-index
                const zIndex = parseInt(style.zIndex) || 0;
                return { visible: true, zIndex };
              }
            }
            return { visible: false };
          });

          if (dropdownVisible.visible) {
            console.log(`✅ Compare Dropdown: Opens correctly (z-index: ${dropdownVisible.zIndex})`);
          } else {
            console.log('⚠️ Compare Dropdown: Could not verify dropdown visibility');
          }

        } catch (err) {
          console.log(`❌ Compare Dropdown: ERROR - ${err.message}`);
        }
      }

      await context.close();
      console.log('');
    }

    // Summary
    console.log('='.repeat(60));
    console.log(`\nISSUES FOUND: ${issues.length}`);
    if (issues.length > 0) {
      console.log('\nDetails:');
      issues.forEach((issue, i) => {
        console.log(`\n${i + 1}. [${issue.viewport}] ${issue.page}`);
        console.log(`   URL: ${issue.url}`);
        issue.issues.forEach(i => console.log(`   - ${i}`));
        if (issue.screenshot) console.log(`   Screenshot: ${issue.screenshot}`);
      });
    }

    // Output JSON for further processing
    await writeFile(join(SCREENSHOTS_DIR, 'report.json'), JSON.stringify({
      date: new Date().toISOString(),
      issues
    }, null, 2));

    console.log(`\nScreenshots saved to: ${SCREENSHOTS_DIR}/`);

  } finally {
    await browser.close();
  }

  return issues;
}

runTests().catch(console.error);
