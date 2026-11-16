"""Visual samples for the new work: reviews band, footer partner logos, the
Black Friday pop-up, and the voucher order form. Element-level captures so
each is readable in review; full-page desktop/mobile homepage shots are
regenerated for the record too. All go to download/."""
from playwright.sync_api import sync_playwright

DL = "/home/z/my-project/download"

def scroll_through(pg):
    h = pg.evaluate("document.body.scrollHeight")
    y = 0
    while y < h:
        pg.mouse.wheel(0, 600)
        pg.wait_for_timeout(140)
        y += 600
    pg.wait_for_timeout(900)
    pg.evaluate("window.scrollTo(0, 0)")
    pg.wait_for_timeout(600)

with sync_playwright() as p:
    b = p.chromium.launch()

    ctx = b.new_context(viewport={"width": 1440, "height": 1000})
    pg = ctx.new_page()

    # The pop-up fires 1.5s in: capture it first, then dismiss it.
    pg.goto("http://localhost:3100/", wait_until="networkidle")
    pg.wait_for_selector(".cs-bf.is-open", timeout=8000)
    pg.wait_for_timeout(500)
    pg.screenshot(path=f"{DL}/blackfriday-popup.jpg", type="jpeg", quality=70)
    pg.keyboard.press("Escape")

    scroll_through(pg)
    pg.screenshot(path=f"{DL}/homepage-desktop.jpg", full_page=True, type="jpeg", quality=50)

    band = pg.locator(".rev-band")
    band.scroll_into_view_if_needed()
    band.hover()
    pg.wait_for_timeout(1200)
    band.screenshot(path=f"{DL}/reviews-band.jpg", type="jpeg", quality=70)

    pg.locator("footer.site").scroll_into_view_if_needed()
    pg.wait_for_timeout(600)
    pg.locator("footer.site").screenshot(path=f"{DL}/footer-partners.jpg", type="jpeg", quality=70)
    ctx.close()

    # Vouchers: the contact-style order form section.
    ctx2 = b.new_context(viewport={"width": 1440, "height": 1000})
    pg2 = ctx2.new_page()
    pg2.goto("http://localhost:3100/vouchers", wait_until="networkidle")
    pg2.wait_for_selector(".cs-bf.is-open", timeout=8000)
    pg2.keyboard.press("Escape")
    scroll_through(pg2)
    pg2.screenshot(path=f"{DL}/vouchers-page-desktop.jpg", full_page=True, type="jpeg", quality=50)
    form = pg2.locator("#build")
    form.scroll_into_view_if_needed()
    pg2.wait_for_timeout(600)
    form.screenshot(path=f"{DL}/vouchers-form.jpg", type="jpeg", quality=70)
    ctx2.close()

    # Mobile homepage for the record.
    ctx3 = b.new_context(viewport={"width": 360, "height": 800})
    pg3 = ctx3.new_page()
    pg3.goto("http://localhost:3100/", wait_until="networkidle")
    pg3.wait_for_selector(".cs-bf.is-open", timeout=8000)
    pg3.keyboard.press("Escape")
    scroll_through(pg3)
    pg3.screenshot(path=f"{DL}/homepage-mobile.jpg", full_page=True, type="jpeg", quality=50)
    ctx3.close()
    b.close()

import os
for f in ["blackfriday-popup.jpg", "reviews-band.jpg", "footer-partners.jpg",
          "vouchers-form.jpg", "homepage-desktop.jpg", "homepage-mobile.jpg",
          "vouchers-page-desktop.jpg"]:
    pth = os.path.join(DL, f)
    print(f, os.path.getsize(pth) if os.path.exists(pth) else "MISSING")
