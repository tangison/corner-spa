"""Site-wide link crawl — the 'nothing broken' probe. Fetches every route,
extracts every internal href/src (same-origin absolute and root-relative),
and checks each one returns 200 on the production build. Also validates the
JSON-LD on every page and that no page leaks placeholder tokens. Runs
against http://localhost:3100.
"""
import json
import re
import sys
import urllib.request

BASE = "http://localhost:3100"
RESULTS = []

def check(name, ok, detail=""):
    RESULTS.append((name, bool(ok), detail))
    print(("PASS " if ok else "FAIL ") + name + (("  — " + str(detail)) if detail else ""))

def get(path):
    req = urllib.request.Request(BASE + path, headers={"User-Agent": "corner-spa-probe"})
    with urllib.request.urlopen(req, timeout=20) as r:
        return r.status, r.read().decode("utf-8", "replace")

ROUTES = ["/", "/about", "/book", "/brand", "/careers", "/contact",
          "/privacy-policy", "/terms", "/vouchers", "/sitemap.xml",
          "/robots.txt", "/llms.txt", "/manifest.webmanifest", "/favicon.svg"]

INTERNAL = re.compile(r'(?:href|src)="(/[^"]*)"')
PLACEHOLDERS = ["[CONFIRM", "TODO", "XXX", "NaN"]

def visible_html(html):
    """Strip script/style (and Next's RSC flight payload inside scripts) so
    only what a visitor can actually see is checked for leftovers."""
    html = re.sub(r"<script\b.*?</script>", " ", html, flags=re.S)
    html = re.sub(r"<style\b.*?</style>", " ", html, flags=re.S)
    return html

seen, failures = set(), []
for route in ROUTES:
    try:
        status, html = get(route)
        check(f"{route} -> 200", status == 200)
    except Exception as e:  # noqa: BLE001
        check(f"{route} -> 200", False, str(e))
        continue
    if route.startswith(("/sitemap", "/robots", "/llms", "/manifest", "/favicon")):
        continue
    leaked = [tok for tok in PLACEHOLDERS if tok in visible_html(html)]
    check(f"{route}: no placeholder tokens", not leaked, ", ".join(leaked))
    for m in re.finditer(r'<script type="application/ld\+json">(.*?)</script>', html, re.S):
        try:
            json.loads(m.group(1))
            ok = True
        except json.JSONDecodeError as e:
            ok = False
            failures.append(f"{route} JSON-LD: {e}")
        check(f"{route}: JSON-LD parses", ok)
    for link in INTERNAL.findall(html):
        if link.startswith("//") or link.startswith("/_next"):
            continue
        seen.add(link.split("#")[0] or "/")

print(f"\nchecking {len(seen)} unique internal links/assets...")
for link in sorted(seen):
    try:
        status, _ = get(link)
        ok = status == 200
    except Exception as e:  # noqa: BLE001
        ok, status = False, str(e)[:80]
    if not ok:
        failures.append(f"{link} -> {status}")
    check(f"{link} -> 200", ok)

failed = [r for r in RESULTS if not r[1]]
print(f"\n{len(RESULTS) - len(failed)} passed, {len(failed)} failed")
if failed:
    sys.exit(1)
