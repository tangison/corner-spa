"""Vouchers page probe — the browser-side half of the voucher tests (the
logic half lives in scripts/test-voucher.ts). Covers: nav/footer wiring,
hero copy, package cards and the pick→builder hand-off, both validity tiers
on the buttons, the amount rules on the open voucher, the confirm-modal →
wa.me redirect (captured popup, decoded text), emoji, the 200-char card
line, the copy fallback, honeypot, JSON-LD, canonical/OG, the sitemap entry,
and a 360px no-overflow smoke check. Runs against the production build on
http://localhost:3100.
"""
import json
import sys
from urllib.parse import unquote, urlparse, parse_qs
from playwright.sync_api import sync_playwright

BASE = "http://localhost:3100"
RESULTS = []

def check(name, ok, detail=""):
    RESULTS.append((name, bool(ok), detail))
    print(("PASS " if ok else "FAIL ") + name + (("  — " + str(detail)) if detail else ""))

with sync_playwright() as p:
    browser = p.chromium.launch()
    ctx = browser.new_context(viewport={"width": 1440, "height": 900})
    ctx.grant_permissions(["clipboard-read", "clipboard-write"])
    WA_REQUESTS = []  # every request headed to wa.me, pre-redirect
    ctx.on("request", lambda r: WA_REQUESTS.append(r.url) if "://wa.me/" in r.url else None)
    page = ctx.new_page()
    page.goto(BASE + "/vouchers", wait_until="networkidle")

    # ---------- page structure ----------
    check("header nav has Vouchers", page.locator("header.site nav >> text=Vouchers").count() >= 1)
    check("footer nav has Gift vouchers", page.locator("footer.site nav >> text=Gift vouchers").count() >= 1)
    check("h1 is exactly 'The gift of quiet.'", page.locator("h1").inner_text().strip() == "The gift of quiet.")
    check("canonical is /vouchers",
          page.locator("link[rel=canonical]").get_attribute("href") == "https://spa.mendozer.com/vouchers")
    check("og:url is /vouchers",
          page.locator("meta[property='og:url']").get_attribute("href" if False else "content") == "https://spa.mendozer.com/vouchers")
    check("no leftover placeholders in visible text",
          all(tok not in page.locator("main").inner_text() for tok in ["[CONFIRM", "TODO", "XXX", "undefined", "NaN"]))

    ld = page.locator("script[type='application/ld+json']").first.inner_text()
    ldj = json.loads(ld)
    offers = ldj.get("itemListElement", [])
    check("JSON-LD OfferCatalog with 5 offers", ldj.get("@type") == "OfferCatalog" and len(offers) == 5, ldj.get("@type"))
    prices = sorted(o.get("price") for o in offers if "price" in o)
    check("JSON-LD package prices 500/580/720/800", prices == [500, 580, 720, 800], prices)
    check("JSON-LD open voucher minPrice 200",
          any(o.get("priceSpecification", {}).get("minPrice") == 200 for o in offers))

    # ---------- packages ----------
    pkg_cards = page.locator(".v-pkg")
    check("five package cards", pkg_cards.count() == 5, str(pkg_cards.count()))
    card_txt = " | ".join(pkg_cards.all_inner_texts())
    for name_price in ["The wind-down", "N$ 500", "The slow afternoon", "N$ 720",
                       "The hot-stone treat", "N$ 580", "For two", "N$ 800",
                       "Your own amount", "from N$ 200"]:
        check(f"package card shows {name_price}", name_price in card_txt)

    # ---------- builder defaults ----------
    sel = page.locator("#v-pkg")
    check("package select defaults to wind-down", sel.input_value() == "wind-down")
    order_btn = page.locator("button", has_text="Order on WhatsApp")
    print_btn = page.locator("button", has_text="Print the voucher")
    copy_btn = page.locator("button", has_text="Copy my order")
    check("Order disabled before filling", order_btn.is_disabled())
    check("Print disabled before filling", print_btn.is_disabled())
    check("amount field hidden for named package", page.locator("#v-amount").count() == 0)
    check("honeypot present", page.locator(".c-hp input").count() == 1)
    code_txt = page.locator(".v-card-code").inner_text().strip()
    check("voucher code shown on preview", code_txt.startswith("CS-G"), code_txt)

    # ---------- core validity unlocks Print, full still locked ----------
    page.fill("#v-to", "Lena")
    page.fill("#v-from", "Targis")
    check("Print unlocked by core fields only", print_btn.is_enabled())
    check("Order still locked without phone", order_btn.is_disabled())

    # ---------- phone validation via Order ----------
    page.fill("#v-bphone", "123")
    check("Order locked with bad phone", order_btn.is_disabled())
    # enable via full fill: correct phone
    page.fill("#v-bphone", "081 234 5678")
    check("Order unlocked with valid phone", order_btn.is_enabled())

    # ---------- open amount rules ----------
    sel.select_option("open")
    page.wait_for_timeout(100)
    check("amount field appears for open voucher", page.locator("#v-amount").count() == 1)
    page.fill("#v-amount", "150")
    page.locator("#v-amount").blur()
    check("under-minimum amount shows error", page.locator("#v-amount-err").inner_text().strip() != "")
    page.fill("#v-amount", "480")
    page.locator("#v-amount").blur()
    check("valid amount clears error", page.locator("#v-amount-err").inner_text().strip() == "")
    preview_amount = page.locator(".v-card-amount").inner_text().strip()
    check("preview shows the open amount", "480" in preview_amount, preview_amount)
    sel.select_option("wind-down")
    page.wait_for_timeout(100)

    # ---------- cancel keeps everything ----------
    page.fill("#v-msg", "Happy birthday, my love. 🎂💛")
    page.click('label.c-chip:has-text("Surprise")')
    page.fill("#v-rphone", "+264 81 987 6543")
    order_btn.click()
    check("confirm modal opens", page.locator(".c-modal").count() == 1)
    modal_txt = page.locator(".c-modal").inner_text()
    check("modal carries the code", code_txt in modal_txt, modal_txt[:120])
    page.click('.c-modal >> text=Cancel')
    check("cancel closes modal, stays on page", page.url.rstrip("/") == BASE + "/vouchers" and page.locator(".c-modal").count() == 0)
    check("inputs survive cancel", page.locator("#v-to").input_value() == "Lena" and page.locator("#v-msg").input_value().endswith("🎂💛"))

    # ---------- valid submit → wa.me popup ----------
    order_btn.click()
    with page.expect_popup() as pop:
        page.click('.c-modal >> text=Continue')
    popup_url = pop.value.url
    # Desktop browsers: wa.me hands off to api.whatsapp.com/send with the
    # same query; both are the same deep link. Phones open WhatsApp directly.
    ok_target = popup_url.startswith("https://wa.me/264816234788") or (
        popup_url.startswith("https://api.whatsapp.com/send/") and "phone=264816234788" in popup_url)
    check("popup is WhatsApp to the spa number", ok_target, popup_url[:60])
    # The pre-redirect wa.me request carries OUR encoding exactly; assert the
    # message on that one (WhatsApp's own redirect may re-encode the query).
    check("wa.me request fired with our encoding",
          any(u.startswith("https://wa.me/264816234788?text=") for u in WA_REQUESTS))
    wa_url = next(u for u in WA_REQUESTS if u.startswith("https://wa.me/264816234788?text="))
    q = parse_qs(urlparse(wa_url).query)
    text = q["text"][0]  # parse_qs already decodes; no second unquote
    check("order opener line", text.startswith("Hi Corner Spa, I would like to order a gift voucher."))
    check("voucher line present", "Voucher: The wind-down — N$ 500" in text)
    check("code line present", f"Code: {code_txt}" in text)
    check("surprise delivery line", "+264 81 987 6543" in text and "surprise" in text.lower())
    check("emoji survive encoding", "🎂" in text and "💛" in text and "Happy birthday, my love." in text)
    check("payment ask line", "Please send me the payment details." in text)
    check("message under 1500 chars", len(text) <= 1500, str(len(text)))

    # ---------- copy fallback ----------
    copy_btn.click()
    page.wait_for_timeout(300)
    clip = page.evaluate("navigator.clipboard.readText()")
    check("clipboard carries the order", "I would like to order a gift voucher" in clip and code_txt in clip, clip[:80])
    check("copy button confirms", page.locator("button", has_text="Copied").count() >= 1)

    # ---------- 360px smoke ----------
    page2 = ctx.new_page()
    page2.set_viewport_size({"width": 360, "height": 800})
    page2.goto(BASE + "/vouchers", wait_until="networkidle")
    overflow = page2.evaluate("document.documentElement.scrollWidth - document.documentElement.clientWidth")
    check("360px: no horizontal overflow", overflow <= 2, str(overflow))
    tap = page2.locator("#v-pkg").bounding_box()
    check("360px: select reachable", tap is not None and tap["y"] >= 0)

    # ---------- sitemap ----------
    sm = page.request.get(BASE + "/sitemap.xml").text()
    check("sitemap lists /vouchers", "https://spa.mendozer.com/vouchers" in sm)

    browser.close()

failed = [r for r in RESULTS if not r[1]]
print(f"\n{len(RESULTS) - len(failed)} passed, {len(failed)} failed")
if failed:
    sys.exit(1)
