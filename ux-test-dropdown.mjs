#!/usr/bin/env node
import { chromium } from 'playwright';
import { mkdir } from 'fs/promises';
import { join } from 'path';

const SCREENSHOTS_DIR = './ux-screenshots';
const SITE_URL = 'https://metalforge.io';

async function testDropdown() {
  console.log('🔍 Detailed Compare Dropdown Test');
  console.log('='.repeat(60) + '\n');

  await mkdir(SCREENSHOTS_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });

  // Test at mobile viewport
  const context = await browser.newContext({
    viewport: { width: 375, height: 667 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15'
  });
  const page = await context.newPage();

  try {
    console.log('1. Loading Compare page at mobile viewport (375x667)...');
    await page.goto(SITE_URL + '/compare', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);

    // Initial screenshot
    await page.screenshot({ path: join(SCREENSHOTS_DIR, 'dropdown-1-initial.png'), fullPage: true });
    console.log('   Screenshot saved: dropdown-1-initial.png');

    // Find dropdown elements
    console.log('\n2. Searching for dropdown elements...');
    const dropdownInfo = await page.evaluate(() => {
      const results = {
        selects: [],
        buttons: [],
        divDropdowns: [],
        allClickable: []
      };

      // Find native select elements
      document.querySelectorAll('select').forEach((el, i) => {
        const rect = el.getBoundingClientRect();
        results.selects.push({
          index: i,
          id: el.id,
          class: el.className,
          width: rect.width,
          height: rect.height,
          options: Array.from(el.options).map(o => o.text).slice(0, 5)
        });
      });

      // Find buttons that might be dropdown triggers
      document.querySelectorAll('button').forEach((el, i) => {
        const rect = el.getBoundingClientRect();
        const text = el.textContent?.trim();
        if (text && rect.width > 0) {
          results.buttons.push({
            index: i,
            text: text.substring(0, 50),
            class: el.className,
            width: rect.width,
            height: rect.height
          });
        }
      });

      // Find div-based dropdowns
      document.querySelectorAll('[class*="dropdown"], [class*="select"], [role="listbox"], [role="combobox"]').forEach((el, i) => {
        const rect = el.getBoundingClientRect();
        results.divDropdowns.push({
          index: i,
          tag: el.tagName,
          class: el.className,
          role: el.getAttribute('role'),
          width: rect.width,
          height: rect.height
        });
      });

      return results;
    });

    console.log('\n   Native <select> elements:', dropdownInfo.selects.length);
    dropdownInfo.selects.forEach(s => {
      console.log(`      - Select #${s.index}: ${s.width}x${s.height}px, ${s.options.length} options`);
    });

    console.log('\n   Buttons found:', dropdownInfo.buttons.length);
    dropdownInfo.buttons.slice(0, 5).forEach(b => {
      console.log(`      - "${b.text}" (${b.width}x${b.height}px)`);
    });

    console.log('\n   Div-based dropdowns:', dropdownInfo.divDropdowns.length);
    dropdownInfo.divDropdowns.forEach(d => {
      console.log(`      - ${d.tag}.${d.class?.substring(0, 40)} (${d.width}x${d.height}px)`);
    });

    // Try to interact with dropdowns
    if (dropdownInfo.selects.length > 0) {
      console.log('\n3. Testing native select dropdown...');
      const selectHandle = await page.$('select');
      if (selectHandle) {
        // Click to open
        await selectHandle.click();
        await page.waitForTimeout(500);
        await page.screenshot({ path: join(SCREENSHOTS_DIR, 'dropdown-2-select-clicked.png'), fullPage: true });
        console.log('   Screenshot saved: dropdown-2-select-clicked.png');

        // Check if we can select an option
        const options = await page.$$eval('select option', opts => opts.map(o => ({ value: o.value, text: o.text })));
        console.log(`   Found ${options.length} options`);
        if (options.length > 1) {
          await page.selectOption('select', { index: 1 });
          await page.waitForTimeout(500);
          await page.screenshot({ path: join(SCREENSHOTS_DIR, 'dropdown-3-option-selected.png'), fullPage: true });
          console.log('   Screenshot saved: dropdown-3-option-selected.png');
          console.log('   ✅ Native select works correctly');
        }
      }
    }

    // Check for any custom dropdown implementations
    if (dropdownInfo.buttons.length > 0) {
      console.log('\n4. Testing button-based dropdowns...');
      for (let i = 0; i < Math.min(2, dropdownInfo.buttons.length); i++) {
        const btn = dropdownInfo.buttons[i];
        if (btn.text.toLowerCase().includes('select') || btn.text.toLowerCase().includes('choose') || btn.text.toLowerCase().includes('compare')) {
          console.log(`   Clicking button: "${btn.text}"...`);
          const buttonHandle = await page.$(`button:has-text("${btn.text.substring(0, 20)}")`);
          if (buttonHandle) {
            await buttonHandle.click();
            await page.waitForTimeout(500);
            await page.screenshot({ path: join(SCREENSHOTS_DIR, `dropdown-4-button-${i}-clicked.png`), fullPage: true });
            console.log(`   Screenshot saved: dropdown-4-button-${i}-clicked.png`);

            // Check for visible dropdown menu
            const menuVisible = await page.evaluate(() => {
              const menus = document.querySelectorAll('[role="menu"], [role="listbox"], ul[class*="menu"], div[class*="menu"], div[class*="options"]');
              for (const menu of menus) {
                const rect = menu.getBoundingClientRect();
                const style = window.getComputedStyle(menu);
                if (rect.height > 0 && style.visibility !== 'hidden' && style.display !== 'none') {
                  return { visible: true, height: rect.height, zIndex: style.zIndex };
                }
              }
              return { visible: false };
            });
            console.log(`   Menu visible: ${menuVisible.visible}, height: ${menuVisible.height || 'N/A'}, z-index: ${menuVisible.zIndex || 'auto'}`);
          }
        }
      }
    }

    // Check z-index of dropdown elements
    console.log('\n5. Checking z-index values...');
    const zIndexCheck = await page.evaluate(() => {
      const elements = document.querySelectorAll('*');
      const zIndexes = [];
      for (const el of elements) {
        const style = window.getComputedStyle(el);
        const zIndex = parseInt(style.zIndex);
        if (!isNaN(zIndex) && zIndex !== 0) {
          zIndexes.push({
            tag: el.tagName,
            class: el.className?.substring(0, 30),
            zIndex
          });
        }
      }
      return zIndexes.sort((a, b) => b.zIndex - a.zIndex).slice(0, 10);
    });
    console.log('   Top z-index elements:');
    zIndexCheck.forEach(z => {
      console.log(`      - ${z.tag}.${z.class}: z-index ${z.zIndex}`);
    });

    // Final verdict
    console.log('\n' + '='.repeat(60));
    console.log('VERDICT:');
    if (dropdownInfo.selects.length > 0) {
      console.log('✅ Compare page uses native <select> elements - good for mobile usability');
    } else if (dropdownInfo.divDropdowns.length > 0) {
      console.log('⚠️ Compare page uses custom dropdown implementation - verify mobile touch works');
    } else {
      console.log('❓ Could not find clear dropdown implementation');
    }

  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await browser.close();
  }
}

testDropdown().catch(console.error);
