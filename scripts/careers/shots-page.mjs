import { chromium } from "playwright";

const browser = await chromium.launch();
const shots = [
  { w: 360, h: 800, name: "careers-360", full: true },
  { w: 390, h: 844, name: "careers-390-top", full: false },
  { w: 1280, h: 900, name: "careers-desktop", full: true },
];
for (const s of shots) {
  const page = await browser.newPage({ viewport: { width: s.w, height: s.h } });
  await page.goto("http://localhost:3000/careers", { waitUntil: "networkidle" });
  await page.waitForTimeout(900);
  await page.screenshot({ path: `/tmp/render/${s.name}.png`, fullPage: s.full });
  await page.close();
  console.log("shot", s.name);
}
await browser.close();
