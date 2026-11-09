#!/usr/bin/env python3
"""Render the Corner Spa hiring posters.

Outputs (to /home/z/my-project/download/):
  corner-spa-we-are-hiring-A4.pdf   (A4 print PDF, clickable email + URLs)
  corner-spa-we-are-hiring-A4-200dpi.png (1654x2339)
  corner-spa-we-are-hiring-4x5-1080x1350.png (exactly 1080x1350, 60px safe margin)
"""
import subprocess, os, sys
from PIL import Image

CAREERS = "/home/z/my-project/scripts/careers"
OUT = "/home/z/my-project/download"
os.makedirs(OUT, exist_ok=True)

A4_HTML = f"file://{CAREERS}/poster-a4.html"
S4_HTML = f"file://{CAREERS}/poster-4x5.html"

# Node script that does the Chromium work
NODE = r'''
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
'''
open(f"{CAREERS}/render-posters.js", "w").write(NODE)
r = subprocess.run(["node", f"{CAREERS}/render-posters.js"], capture_output=True, text=True)
print(r.stdout, r.stderr)
if r.returncode:
    sys.exit(1)

# A4 PNG: 794x1123 css px at dsf 2.0833 -> ~1654x2339; normalise to exact 200 dpi
im = Image.open("/tmp/render/poster-a4-raw.png")
print("a4 raw", im.size)
im = im.resize((1654, 2339), Image.LANCZOS) if im.size != (1654, 2339) else im
im.convert("RGB").save(f"{OUT}/corner-spa-we-are-hiring-A4-200dpi.png", optimize=True)

# 4:5 PNG must be exactly 1080x1350
im2 = Image.open("/tmp/render/poster-4x5-raw.png")
print("4x5 raw", im2.size)
assert im2.size == (1080, 1350), f"4:5 poster is {im2.size}, expected 1080x1350"
im2.save(f"{OUT}/corner-spa-we-are-hiring-4x5-1080x1350.png", optimize=True)

# A4 PDF straight through (links preserved)
subprocess.run(["cp", "/tmp/render/poster-a4.pdf", f"{OUT}/corner-spa-we-are-hiring-A4.pdf"], check=True)

for f in ["corner-spa-we-are-hiring-A4.pdf", "corner-spa-we-are-hiring-A4-200dpi.png", "corner-spa-we-are-hiring-4x5-1080x1350.png"]:
    print(f, os.path.getsize(f"{OUT}/{f}"), "bytes")
