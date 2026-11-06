// Screenshot the live site pages at desktop and mobile widths.
const { chromium } = require('playwright');
const path = require('path');

const CHROME = '/home/z/.cache/ms-playwright/chromium-1200/chrome-linux64/chrome';
const BASE = 'https://spa.mendozer.com';
const OUT = '/tmp/shots';
const PAGES = ['/', '/contact', '/book', '/privacy-policy', '/terms', '/brand'];
const SIZES = [
  { name: 'desktop', w: 1440, h: 900 },
  { name: 'mobile', w: 390, h: 844 },
];

(async () => {
  const browser = await chromium.launch({ executablePath: CHROME });
  for (const size of SIZES) {
    const ctx = await browser.newContext({
      viewport: { width: size.w, height: size.h },
      deviceScaleFactor: 1,
    });
    const page = await ctx.newPage();
    for (const p of PAGES) {
      await page.goto(BASE + p, { waitUntil: 'networkidle', timeout: 45000 });
      await page.waitForTimeout(600);
      const file = path.join(OUT, `${size.name}${p === '/' ? '-home' : p.replace(/\//g, '-')}.png`);
      await page.screenshot({ path: file, fullPage: false });
      // full page for the ink pages so we can read the whole design
      if (['/contact', '/privacy-policy', '/terms', '/brand'].includes(p)) {
        const full = path.join(OUT, `full${size.name}${p.replace(/\//g, '-')}.png`);
        await page.screenshot({ path: full, fullPage: true });
      }
      console.log('shot', p, size.name);
    }
    await ctx.close();
  }
  await browser.close();
  console.log('done');
})();
