"""Render the two hiring posters from poster/*.html with Playwright/Chromium:
  - A4 print PDF (clickable mailto + careers URL)
  - A4 200dpi PNG (exact 1654x2339, dpi metadata set)
  - 4:5 social PNG (exact 1080x1350)
Deliverables land in download/. QR is verified by decoding afterwards.
"""
import os
from PIL import Image
from playwright.sync_api import sync_playwright

ROOT = "/home/z/my-project/poster"
OUT = "/home/z/my-project/download"
os.makedirs(OUT, exist_ok=True)
os.makedirs("/tmp/shots", exist_ok=True)

A4_W, A4_H = 794, 1123
A4_PX = (1654, 2339)  # 200 dpi
F45 = (1080, 1350)

with sync_playwright() as p:
    browser = p.chromium.launch()

    # ---- A4 ----
    page = browser.new_page(viewport={"width": A4_W, "height": A4_H}, device_scale_factor=1654 / A4_W)
    page.goto(f"file://{ROOT}/poster-a4.html", wait_until="networkidle")
    page.wait_for_timeout(600)
    page.screenshot(path=f"{OUT}/corner-spa-we-are-hiring-A4-200dpi.png")
    im = Image.open(f"{OUT}/corner-spa-we-are-hiring-A4-200dpi.png")
    print("A4 raw screenshot:", im.size)
    if im.size != A4_PX:
        im = im.resize(A4_PX, Image.LANCZOS)
    im.save(f"{OUT}/corner-spa-we-are-hiring-A4-200dpi.png", dpi=(200, 200))
    print("A4 PNG final:", Image.open(f'{OUT}/corner-spa-we-are-hiring-A4-200dpi.png').size, "dpi=200 set")
    page.pdf(path=f"{OUT}/corner-spa-we-are-hiring-A4.pdf", width=f"{A4_W}px", height=f"{A4_H}px",
             print_background=True, margin={"top": "0", "bottom": "0", "left": "0", "right": "0"})
    page.close()

    # ---- 4:5 ----
    page = browser.new_page(viewport={"width": F45[0], "height": F45[1]}, device_scale_factor=1)
    page.goto(f"file://{ROOT}/poster-4x5.html", wait_until="networkidle")
    page.wait_for_timeout(600)
    page.screenshot(path=f"{OUT}/corner-spa-we-are-hiring-4x5-1080x1350.png")
    print("4:5 PNG:", Image.open(f"{OUT}/corner-spa-we-are-hiring-4x5-1080x1350.png").size)
    page.close()
    browser.close()
print("done")
