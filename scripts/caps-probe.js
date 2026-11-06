// Locate elements whose computed style uppercases 25+ chars of text.
const { chromium } = require('playwright');
const CHROME = '/home/z/.cache/ms-playwright/chromium-1200/chrome-linux64/chrome';
const BASE = process.env.BASE || 'https://spa.mendozer.com';
const PAGES = ['/', '/book', '/brand'];

(async () => {
  const browser = await chromium.launch({ executablePath: CHROME });
  const p = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  for (const path of PAGES) {
    await p.goto(BASE + path, { waitUntil: 'networkidle', timeout: 45000 });
    const hits = await p.evaluate(() => {
      const out = [];
      for (const el of document.querySelectorAll('body *')) {
        if (el.children.length && ![...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())) continue;
        const tt = getComputedStyle(el).textTransform;
        if (tt !== 'uppercase') continue;
        const t = (el.textContent || '').trim();
        if (t.length >= 25 && t.length <= 60) {
          out.push({ cls: el.className && el.className.toString().slice(0, 40), tag: el.tagName.toLowerCase(), text: t.slice(0, 60) });
        }
      }
      return out;
    });
    console.log('== ' + path + ' ==');
    hits.forEach(h => console.log(`  [${h.tag}.${h.cls}] "${h.text}"`));
  }
  await browser.close();
})();
