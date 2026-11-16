"""Visual samples for the vouchers page: desktop + mobile screenshots for
review in download/. The gift card is built by hand at the spa, so nothing
voucher-like is rendered client-side anymore; the earlier sample PDF is kept
in download/ purely as a design reference for that hand-built card."""
from playwright.sync_api import sync_playwright

DL = "/home/z/my-project/download"

with sync_playwright() as p:
    b = p.chromium.launch()

    # Desktop full page (scroll through first so the reveal engine has fired)
    ctx = b.new_context(viewport={"width": 1440, "height": 1000})
    pg = ctx.new_page()
    pg.goto("http://localhost:3100/vouchers", wait_until="networkidle")
    h = pg.evaluate("document.body.scrollHeight")
    y = 0
    while y < h:
        pg.mouse.wheel(0, 600)
        pg.wait_for_timeout(140)
        y += 600
    pg.wait_for_timeout(900)
    pg.evaluate("window.scrollTo(0, 0)")
    pg.wait_for_timeout(600)
    pg.screenshot(path=f"{DL}/vouchers-page-desktop.jpg", full_page=True, type="jpeg", quality=55)
    ctx.close()

    # Mobile full page (same scroll-through)
    ctx2 = b.new_context(viewport={"width": 360, "height": 800})
    pg2 = ctx2.new_page()
    pg2.goto("http://localhost:3100/vouchers", wait_until="networkidle")
    h2 = pg2.evaluate("document.body.scrollHeight")
    y2 = 0
    while y2 < h2:
        pg2.mouse.wheel(0, 600)
        pg2.wait_for_timeout(140)
        y2 += 600
    pg2.wait_for_timeout(900)
    pg2.evaluate("window.scrollTo(0, 0)")
    pg2.wait_for_timeout(600)
    pg2.screenshot(path=f"{DL}/vouchers-page-mobile.jpg", full_page=True, type="jpeg", quality=55)
    ctx2.close()
    b.close()

import os
for f in ["vouchers-page-desktop.jpg", "vouchers-page-mobile.jpg"]:
    pth = os.path.join(DL, f)
    print(f, os.path.getsize(pth))
