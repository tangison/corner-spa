// Technical a11y/responsive audit of the live pages.
const { chromium } = require('playwright');

const CHROME = '/home/z/.cache/ms-playwright/chromium-1200/chrome-linux64/chrome';
const PAGES = ['/', '/contact', '/book', '/privacy-policy', '/terms', '/brand'];

(async () => {
  const browser = await chromium.launch({ executablePath: CHROME });
  const report = {};

  // ---- mobile pass: overflow + touch targets ----
  const m = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const mp = await m.newPage();
  for (const p of PAGES) {
    await mp.goto('https://spa.mendozer.com' + p, { waitUntil: 'networkidle', timeout: 45000 });
    await mp.waitForTimeout(400);
    const r = await mp.evaluate(() => {
      const doc = document.documentElement;
      const overflowX = doc.scrollWidth - doc.clientWidth;
      // interactive elements smaller than 24x24 (WCAG 2.5.8 minimum)
      const small = [];
      for (const el of document.querySelectorAll('a, button, select, input, textarea, [role="button"], summary')) {
        const b = el.getBoundingClientRect();
        if (b.width === 0 || b.height === 0) continue;
        if (b.width < 24 || b.height < 24) {
          small.push({ tag: el.tagName.toLowerCase(), text: (el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 30), w: Math.round(b.width), h: Math.round(b.height) });
        }
      }
      return { overflowX, small };
    });
    report[p] = { overflowX: r.overflowX, smallTargets: r.small };
  }
  await m.close();

  // ---- desktop pass: a11y structure ----
  const d = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const dp = await d.newPage();
  for (const p of PAGES) {
    await dp.goto('https://spa.mendozer.com' + p, { waitUntil: 'networkidle', timeout: 45000 });
    await dp.waitForTimeout(400);
    const r = await dp.evaluate(() => {
      const out = {};
      // images without alt
      out.imgsNoAlt = Array.from(document.images).filter(i => !i.hasAttribute('alt')).map(i => i.src.split('/').pop());
      // heading order: levels that jump by more than 1 downward
      const hs = Array.from(document.querySelectorAll('h1,h2,h3,h4')).map(h => +h.tagName[1]);
      out.headingSequence = hs.join(',');
      out.headingJumps = hs.some((v, i) => i > 0 && v - hs[i - 1] > 1);
      // landmarks
      out.landmarks = { header: !!document.querySelector('header'), main: !!document.querySelector('main'), footer: !!document.querySelector('footer'), nav: !!document.querySelector('nav') };
      // skip link
      out.skipLink = !!document.querySelector('a[href^="#"], a.skip, a[href="#main"], a[href="#content"]');
      // reduced motion handled?
      out.reducedMotionCss = false;
      for (const sheet of document.styleSheets) {
        try { for (const rule of sheet.cssRules) { if (rule.media && String(rule.media.mediaText).includes('prefers-reduced-motion')) { out.reducedMotionCss = true; break; } } } catch (e) {}
        if (out.reducedMotionCss) break;
      }
      // labels on form fields
      out.fieldsNoLabel = Array.from(document.querySelectorAll('input:not([type=hidden]), select, textarea')).filter(f => {
        if (f.labels && f.labels.length) return false;
        if (f.getAttribute('aria-label') || f.getAttribute('aria-labelledby')) return false;
        return true;
      }).map(f => f.name || f.id || f.type);
      return out;
    });
    report[p].a11y = r;
  }
  await d.close();
  await browser.close();
  console.log(JSON.stringify(report, null, 1));
})();
