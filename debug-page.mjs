#!/usr/bin/env node
import { chromium } from 'playwright';

const url = process.env.TEST_URL || 'https://metalforge.io';

async function debug() {
  console.log(`Testing ${url}`);
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
    console.log('Page loaded, waiting for JS...');
    await page.waitForTimeout(5000);
    
    // Check if root has content
    const rootContent = await page.evaluate(() => {
      const root = document.getElementById('root');
      return root ? root.innerHTML.substring(0, 500) : 'NO ROOT';
    });
    console.log('\n--- Root Content Preview ---\n');
    console.log(rootContent);
    
    // Look for links
    const links = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('a')).slice(0, 10).map(a => ({
        href: a.href,
        text: a.textContent?.slice(0, 50),
        ariaLabel: a.getAttribute('aria-label')
      }));
    });
    console.log('\n--- Links Found ---\n');
    console.log(JSON.stringify(links, null, 2));
    
    // Check for specific selectors
    const cardCount = await page.locator('a[href^="/drummer/"]').count();
    console.log(`\na[href^="/drummer/"] count: ${cardCount}`);
    
    const gearDetailsCount = await page.locator('[aria-label*="gear details"]').count();
    console.log(`[aria-label*="gear details"] count: ${gearDetailsCount}`);
    
  } catch (e) {
    console.error('Error:', e.message);
  } finally {
    await browser.close();
  }
}

debug();
