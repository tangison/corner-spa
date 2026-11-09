
const { chromium } = require("playwright");
const CAREERS = "/home/z/my-project/scripts/careers";

(async () => {
  const browser = await chromium.launch();

  // ---- A4 (design in mm; PNG at 200dpi via deviceScaleFactor) ----
  const page = await browser.newPage({
    viewport: { width: 794, height: 1123 },
    deviceScaleFactor: 200 / 96,
  });
  await page.goto("file://" + CAREERS + "/poster-a4.html", { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);
  await page.screenshot({
    path: "/tmp/render/poster-a4-raw.png",
    clip: { x: 0, y: 0, width: 794, height: 1123 },
  });
  await page.pdf({
    path: "/tmp/render/poster-a4.pdf",
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: 0, bottom: 0, left: 0, right: 0 },
  });
  await page.close();

  // ---- 4:5 social (exact 1080x1350) ----
  const page2 = await browser.newPage({
    viewport: { width: 1080, height: 1350 },
    deviceScaleFactor: 1,
  });
  await page2.goto("file://" + CAREERS + "/poster-4x5.html", { waitUntil: "networkidle" });
  await page2.evaluate(() => document.fonts.ready);
  await page2.waitForTimeout(400);
  await page2.screenshot({
    path: "/tmp/render/poster-4x5-raw.png",
    clip: { x: 0, y: 0, width: 1080, height: 1350 },
  });
  await page2.close();
  await browser.close();
  console.log("chromium done");
})();
