"""Load /careers, scroll through it like a person so the scroll-reveal
engine fires, then take the full-page screenshots (desktop + 360px)."""
from playwright.sync_api import sync_playwright

def crawl(page):
    page.evaluate("""async () => {
      const h = document.scrollingElement.scrollHeight;
      for (let y = 0; y <= h; y += 420) {
        window.scrollTo(0, y);
        await new Promise(r => setTimeout(r, 90));
      }
      window.scrollTo(0, h);
    }""")
    page.wait_for_timeout(900)

with sync_playwright() as p:
    b = p.chromium.launch()
    ctx = b.new_context(viewport={"width": 1440, "height": 900})
    page = ctx.new_page()
    page.goto("http://localhost:3100/careers", wait_until="networkidle")
    crawl(page)
    page.screenshot(path="/tmp/shots/careers-desktop-revealed.png", full_page=True)
    marked = page.evaluate("document.querySelectorAll('.sc-in').length")
    total = page.evaluate("document.querySelectorAll('[data-sc-in]').length")
    print("revealed", marked, "of", total)

    m = ctx.new_page()
    m.set_viewport_size({"width": 360, "height": 740})
    m.goto("http://localhost:3100/careers", wait_until="networkidle")
    crawl(m)
    m.screenshot(path="/tmp/shots/careers-mobile-revealed.png", full_page=True)
    print("mobile revealed", m.evaluate("document.querySelectorAll('.sc-in').length"))
    b.close()
print("done")
