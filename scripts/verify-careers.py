"""Careers page probe — runs every test the owner's brief requires:
required-field errors, one valid submit per button (WhatsApp + email),
emoji / special characters, an over-long note, and cancelling the
redirect. Runs against the production build on http://localhost:3100.
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
    page = ctx.new_page()
    page.goto(BASE + "/careers", wait_until="networkidle")

    # ---------- page structure ----------
    check("header nav has Careers", page.locator("header.site nav >> text=Careers").count() >= 1)
    check("footer nav has Careers", page.locator("footer.site nav >> text=Careers").count() >= 1)
    check("h1 is exactly 'We are hiring.'", page.locator("h1").inner_text().strip() == "We are hiring.")
    check("hero sub is exactly 'Multi-talent spa specialist'",
          page.locator(".c-role-name").first.inner_text().strip() == "Multi-talent spa specialist")
    check("role card title", page.locator(".c-card h2").first.inner_text().strip() == "Multi-Talent Spa Specialist")
    dds = page.locator(".c-facts dd").all_inner_texts()
    check("Location Windhoek West", dds[0].strip() == "Windhoek West", dds)
    check("Type stays [CONFIRM]", dds[1].strip() == "[CONFIRM]")
    check("Reports to stays [CONFIRM]", dds[2].strip() == "[CONFIRM]")
    check("Closing date = Open until filled (no leaked template)",
          dds[3].strip() == "Open until filled" and "[CONFIRM or" not in page.content())
    body_txt = page.locator("main").inner_text()
    check("no stray [CONFIRM] outside the two role facts", body_txt.count("[CONFIRM]") == 2)
    check("form #apply exists", page.locator("form#apply").count() == 1)
    check("hero intro verbatim", "Join the team at Corner Spa in Windhoek West and help people leave feeling restored." in " ".join(body_txt.split()))

    # meta + structured data
    content = page.content()
    check("canonical", 'rel="canonical" href="https://spa.mendozer.com/careers"' in content)
    check("og:image is the 4:5 poster", "/media/posters/corner-spa-hiring-4x5.png" in content)
    ld = page.locator('script[type="application/ld+json"]').all_inner_texts()
    job = json.loads([x for x in ld if "JobPosting" in x][0])
    check("JobPosting JSON-LD", job.get("@type") == "JobPosting" and job.get("directApply") is False)
    check("no baseSalary / validThrough invented", "baseSalary" not in job and "validThrough" not in job)

    # honeypot hidden (geometry: off-screen, 1px box, not in tab order)
    hp = page.evaluate("(() => { const el = document.querySelector('.c-hp'); if (!el) return null; const r = el.getBoundingClientRect(); const inp = el.querySelector('input'); return { left: r.left, w: r.width, h: r.height, tabindex: inp ? inp.tabIndex : null }; })()")
    check("honeypot hidden from humans", bool(hp) and hp["left"] < 0 and hp["w"] <= 2 and hp["tabindex"] == -1, hp)

    # ---------- validation: required fields ----------
    wa_btn = page.locator("button", has_text="Apply on WhatsApp")
    mail_btn = page.locator("button", has_text="Apply by email")
    check("apply buttons disabled before valid", wa_btn.is_disabled() and mail_btn.is_disabled())

    page.locator("#ap-email").fill("not-an-email")
    page.locator("#ap-email").blur()
    page.wait_for_timeout(120)
    err_txt = page.locator("#ap-email-err").inner_text().strip()
    check("inline email error appears", len(err_txt) > 5 and page.locator("#ap-email-err").is_visible(), err_txt)
    check("invalid email still keeps buttons disabled", wa_btn.is_disabled())

    # ---------- valid fill (emoji + specials in note) ----------
    page.fill("#ap-name", "Tuli Amukwaya")
    page.fill("#ap-email", "tuli.amukwaya@example.com")
    page.fill("#ap-phone", "081 234 5678")
    page.select_option("#ap-qual", "Cosmetology qualification")
    page.locator(".c-chip", has_text="Massage").click()
    page.locator(".c-chip", has_text="Nails").click()
    page.select_option("#ap-exp", "3 to 5 years")
    page.fill("#ap-note", "I love hot stone work and gentle facials. Éçüde note 🌿 <test>")
    page.locator("#ap-consent").check()
    page.wait_for_timeout(150)
    check("buttons enabled once valid", wa_btn.is_enabled() and mail_btn.is_enabled())
    check("error cleared after fixing email", not page.locator("#ap-email-err").is_visible())

    # ---------- WhatsApp valid submit ----------
    page.evaluate("window.__opened = []; window.open = (u) => { window.__opened.push(String(u)); return null; }")
    wa_btn.click()
    page.wait_for_timeout(150)
    check("confirm dialog appears", page.locator(".c-modal").is_visible())
    modal_txt = " ".join(page.locator(".c-modal").inner_text().split())
    check("dialog wording verbatim",
          "Almost done." in modal_txt and
          "Your message is ready. Please attach your CV (PDF or Word) before you send it." in modal_txt,
          modal_txt[:120])
    page.locator(".c-modal button", has_text="Continue").click()
    page.wait_for_timeout(200)
    opened = [u for u in page.evaluate("window.__opened") if isinstance(u, str) and u.startswith("http")]
    check("WhatsApp opens in new tab via wa.me", bool(opened) and opened[0].startswith("https://wa.me/264816234788?text="), opened)
    if opened:
        msg = unquote(opened[0].split("text=", 1)[1])
        exp = [
            "Hi Corner Spa, I would like to apply for the Multi-Talent Spa Specialist position.",
            "Name: Tuli Amukwaya",
            "Phone: 081 234 5678",
            "Email: tuli.amukwaya@example.com",
            "Qualification: Cosmetology qualification",
            "Treatments: Massage, Nails",
            "Experience: 3 to 5 years",
            "About me: I love hot stone work and gentle facials. Éçüde note 🌿 <test>",
            "I am attaching my CV.",
        ]
        missing = [e for e in exp if e not in msg]
        check("message format complete (opening, fields, CV line, emoji intact)",
              not missing, "missing: " + str(missing) if missing else msg[:80])
        check("message under 1500 chars", len(msg) <= 1500, len(msg))
    check("dialog closed after Continue", page.locator(".c-modal").count() == 0)

    # ---------- cancel redirect ----------
    mail_btn.click()
    page.wait_for_timeout(150)
    check("email dialog appears", page.locator(".c-modal").is_visible())
    page.locator(".c-modal button", has_text="Cancel").click()
    page.wait_for_timeout(120)
    check("cancel closes dialog", page.locator(".c-modal").count() == 0)
    check("values kept after cancel", page.input_value("#ap-name") == "Tuli Amukwaya")

    # ---------- copy fallback ----------
    page.locator("button", has_text="Copy my application").click()
    page.wait_for_timeout(200)
    clip = page.evaluate("navigator.clipboard.readText()")
    check("copy fallback holds the same message", "I am attaching my CV." in clip and "Tuli Amukwaya" in clip, clip[:60])
    check("button reads 'Copied'", page.locator("button", has_text="Copied").count() >= 1)

    # ---------- email valid submit (subject format + mailto target) ----------
    mail_btn.click()
    page.wait_for_timeout(150)
    page.evaluate("try { navigation.addEventListener('navigate', (e) => { window.__nav = e.destination.url; }); } catch (err) { window.__navErr = String(err); }")
    page.locator(".c-modal button", has_text="Continue").click()
    page.wait_for_timeout(300)
    nav = page.evaluate("window.__nav || ''")
    url_now = page.url
    captured = nav or (url_now if url_now.startswith("mailto:") else "")
    check("email redirect goes to careers@mendozer.com mailto (same tab)",
          captured.startswith("mailto:careers@mendozer.com"), captured or url_now)
    if captured:
        q = parse_qs(urlparse(captured).query)
        check("email subject verbatim 'Spa Specialist Application - {name}'",
              q.get("subject", [""])[0] == "Spa Specialist Application - Tuli Amukwaya", q.get("subject"))
        check("email body carries the message", "I am attaching my CV." in unquote(q.get("body", [""])[0]))

    # ---------- over-long note ----------
    page.fill("#ap-note", "x" * 600)
    page.wait_for_timeout(120)
    check("note capped at 400 with counter", page.input_value("#ap-note") == "x" * 400 and "400 / 400" in page.locator("#ap-note-count").inner_text())

    # ---------- sessionStorage draft ----------
    page.reload(wait_until="networkidle")
    page.wait_for_timeout(400)
    check("draft restored after reload", page.input_value("#ap-name") == "Tuli Amukwaya", page.input_value("#ap-name"))

    # ---------- tap targets + mobile 360 ----------
    heights = page.evaluate("Array.from(document.querySelectorAll('.c-actions .btn, .lead-cta .btn')).map(b => b.getBoundingClientRect().height)")
    check("primary tap targets >= 44px", all(h >= 44 for h in heights), heights)
    m = ctx.new_page()
    m.set_viewport_size({"width": 360, "height": 740})
    m.goto(BASE + "/careers", wait_until="networkidle")
    sw = m.evaluate("document.scrollingElement.scrollWidth")
    check("no horizontal overflow at 360px", sw <= 361, sw)
    m.screenshot(path="/tmp/shots/careers-mobile-360.png", full_page=True)
    page.screenshot(path="/tmp/shots/careers-desktop-full.png", full_page=True)
    print("\nSUMMARY: %d passed, %d failed" % (sum(1 for _, ok, _ in RESULTS if ok), sum(1 for _, ok, _ in RESULTS if not ok)))
    browser.close()
    sys.exit(1 if any(not ok for _, ok, _ in RESULTS) else 0)
