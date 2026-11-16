"""Homepage probe — the reviews carousel from the owner's website pack, the
Black Friday pop-up, the partner logos in the footer and the venture
section, plus a 360px smoke check. Runs against the production build on
http://localhost:3100.
"""
import sys
from playwright.sync_api import sync_playwright

BASE = "http://localhost:3100"
RESULTS = []

def check(name, ok, detail=""):
    RESULTS.append((name, bool(ok), detail))
    print(("PASS " if ok else "FAIL ") + name + (("  — " + str(detail)) if detail else ""))

with sync_playwright() as p:
    browser = p.chromium.launch()
    ctx = browser.new_context(viewport={"width": 1440, "height": 1000})
    page = ctx.new_page()
    page.goto(BASE + "/", wait_until="networkidle")

    # ---------- Black Friday pop-up ----------
    page.wait_for_selector(".cs-bf.is-open", timeout=8000)
    check("popup opens on the homepage too", page.locator(".cs-bf.is-open").count() == 1)
    check("popup close has focus (keyboard-safe)", page.evaluate("document.activeElement?.className || ''") == "cs-bf__close")
    page.keyboard.press("Escape")
    check("popup closes with Esc", page.locator(".cs-bf").count() == 0)

    # ---------- reviews band ----------
    band = page.locator(".rev-band")
    check("reviews band present", band.count() == 1)
    check("band eyebrow + heading", band.locator(".eyebrow").inner_text().strip().lower() == "reviews"
          and "guests" in band.locator("h2").inner_text().lower())
    slides = band.locator(".cs-reviews__slide img")
    check("seven review slides", slides.count() == 7, str(slides.count()))
    # Bring the band into view (loads the lazy images) and hover it — the
    # same gesture a visitor makes, which stops the 5s autoplay so the
    # assertions below are deterministic.
    band.scroll_into_view_if_needed()
    band.hover()
    n_loaded = 0
    for _ in range(40):
        n_loaded = page.evaluate(
            "[...document.querySelectorAll('.cs-reviews__slide img')].filter(i => i.complete && i.naturalWidth > 0).length")
        if n_loaded >= 7:
            break
        page.wait_for_timeout(250)
    check("all review images load", n_loaded >= 7, str(n_loaded))
    alt1 = slides.first.get_attribute("alt") or ""
    check("review alt carries name + stars", "Takura" in alt1 and "4 stars" in alt1, alt1[:60])
    dots = band.locator(".cs-reviews__dot")
    check("seven dots", dots.count() == 7)
    # The pack's algorithm marks the slide nearest the viewport centre; on a
    # 3-up desktop that is the second slide at scroll-left 0, so assert the
    # advance/return relative to wherever it actually started.
    initial = [i for i in range(dots.count()) if dots.nth(i).get_attribute("aria-current") == "true"]
    check("exactly one dot active initially", len(initial) == 1, str(initial))
    cur = initial[0] if initial else 0
    band.locator(".cs-reviews__next").click()
    page.wait_for_timeout(900)
    check("next arrow advances the carousel", dots.nth((cur + 1) % 7).get_attribute("aria-current") == "true")
    band.locator(".cs-reviews__prev").click()
    page.wait_for_timeout(900)
    check("prev arrow returns", dots.nth(cur).get_attribute("aria-current") == "true")
    google_link = band.locator("a", has_text="Read them all on Google")
    check("Google reviews link present and points at the Maps profile",
          google_link.count() == 1 and (google_link.get_attribute("href") or "").startswith("https://maps.app.goo.gl/"),
          google_link.get_attribute("href") or "")
    bg = band.locator(".rev-band-bg")
    check("washed background image set", (bg.get_attribute("src") or "").endswith("sand-ripple.jpg"))

    # ---------- venture + footer partner logos ----------
    venture = page.locator("[aria-label='The venture']")
    imgs = venture.locator("img").evaluate_all("els => els.map(e => e.getAttribute('src'))")
    check("venture shows Oryx + Mendozer lockups",
          any("oryx-lockup" in s for s in imgs) and any("mendozer" in s for s in imgs), str(imgs))
    foot = page.locator("footer.site .foot-partners")
    check("footer partner strip present", foot.count() == 1)
    fimgs = foot.locator("img").evaluate_all("els => els.map(e => e.getAttribute('src'))")
    check("footer shows both lockups",
          any("oryx" in s for s in fimgs) and any("mendozer" in s for s in fimgs), str(fimgs))
    foot_links = foot.locator("a").evaluate_all("els => els.map(e => e.getAttribute('href'))")
    check("footer logos link to the partners",
          "https://oryxinstitute.org" in foot_links and "https://mendozer.com" in foot_links, str(foot_links))

    # ---------- dark-page footer logos (contact) ----------
    pg2 = ctx.new_page()
    pg2.goto(BASE + "/contact", wait_until="networkidle")
    visible = pg2.locator("footer.site .foot-partners img").first.is_visible()
    check("footer logos visible on the dark contact page", visible)
    pg2.close()

    # ---------- 360px smoke ----------
    pg3 = ctx.new_page()
    pg3.set_viewport_size({"width": 360, "height": 800})
    pg3.goto(BASE + "/", wait_until="networkidle")
    pg3.wait_for_selector(".cs-bf.is-open", timeout=8000)
    pg3.keyboard.press("Escape")
    overflow = pg3.evaluate("document.documentElement.scrollWidth - document.documentElement.clientWidth")
    check("360px: no horizontal overflow", overflow <= 2, str(overflow))
    check("360px: arrows hidden, swipe is the affordance",
          pg3.locator(".cs-reviews__btn").first.is_hidden())
    pg3.close()

    browser.close()

failed = [r for r in RESULTS if not r[1]]
print(f"\n{len(RESULTS) - len(failed)} passed, {len(failed)} failed")
if failed:
    sys.exit(1)
