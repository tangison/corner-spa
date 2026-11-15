"""Visual samples for the vouchers page: desktop + mobile screenshots and a
real print-rendered sample voucher PDF (filled with the girlfriend scenario
from the brief). Screenshots go to download/ for review; the PDF doubles as
proof the print isolation works (only the voucher card, on A4)."""
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

    # Fill the girlfriend scenario on the same page, then print to PDF.
    pg.fill("#v-to", "Lena")
    pg.fill("#v-from", "Targis")
    pg.fill("#v-msg", "Happy birthday, my love. This one is for you. 🎂")
    pg.select_option("#v-pkg", "hot-stone-treat")
    pg.wait_for_timeout(200)
    # Same DOM move printVoucher() makes, without calling window.print().
    pg.evaluate("""() => {
      const node = document.querySelector('.v-card');
      const root = document.createElement('div');
      root.className = 'v-print-root';
      root.appendChild(node.cloneNode(true));
      document.body.appendChild(root);
      document.body.classList.add('v-printing');
    }""")
    pg.emulate_media(media="print")
    pg.pdf(path=f"{DL}/corner-spa-voucher-sample.pdf", format="A4", print_background=True)
    pg.emulate_media(media="screen")
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
for f in ["vouchers-page-desktop.jpg", "vouchers-page-mobile.jpg", "corner-spa-voucher-sample.pdf"]:
    pth = os.path.join(DL, f)
    print(f, os.path.getsize(pth))
