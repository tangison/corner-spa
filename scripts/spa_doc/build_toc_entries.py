"""Build manual TOC entries (H1+H2 only) with real page numbers measured from the rendered PDF,
then inject them via add_toc_placeholders.py."""
import json, re, subprocess, sys

DOCX = "/home/z/my-project/download/Corner_Spa_Website_Blueprint.docx"
PDF = "/tmp/render/Corner_Spa_Website_Blueprint.pdf"
SCRIPTS = "/home/z/my-project/skills/docx/scripts"

# 1. Pull H1/H2 heading strings in document order from the content sources
headings = []
for f in ["content1", "content2", "content3"]:
    src = open(f"/home/z/my-project/scripts/spa_doc/{f}.js", encoding="utf-8").read()
    for m in re.finditer(r'\bh([12])\("([^"]+)"\)', src):
        headings.append({"level": int(m.group(1)), "text": m.group(2)})

# 2. Per-page PDF text
info = subprocess.run(["pdfinfo", PDF], capture_output=True, text=True).stdout
pages = int(re.search(r"Pages:\s+(\d+)", info).group(1))
page_texts = []
for p in range(1, pages + 1):
    t = subprocess.run(["pdftotext", "-f", str(p), "-l", str(p), PDF, "-"],
                       capture_output=True, text=True).stdout
    page_texts.append(re.sub(r"\s+", " ", t))

# 3. Locate each heading (search forward from previous match page)
# Body start = first page that mentions the first heading and is not a TOC page (no dot leaders)
body_start = None
for p, t in enumerate(page_texts, start=1):
    if "1. Executive Summary" in t and "......" not in t:
        body_start = p
        break
if body_start is None:
    raise SystemExit("body start page not found")
FRONT_PAGES = body_start - 1  # cover + TOC pages before Arabic page 1
print("body starts at PDF page", body_start, "| front pages:", FRONT_PAGES)

entries, last_page = [], body_start
for h in headings:
    needle = re.sub(r"\s+", " ", h["text"]).strip()
    found = None
    for p in range(last_page, pages + 1):
        if needle in page_texts[p - 1]:
            found = p
            break
    if found is None:  # fallback: search whole doc
        for p in range(FRONT_PAGES, pages + 1):
            if needle in page_texts[p - 1]:
                found = p
                break
    if found is None:
        print("NOT FOUND:", needle, file=sys.stderr)
        found = last_page
    last_page = found
    entries.append({"level": h["level"], "text": h["text"], "page": str(found - FRONT_PAGES)})

print(f"{len(entries)} headings mapped")
json.dump(entries, open("/tmp/render/toc_entries.json", "w"))
for e in entries:
    print(" " * (e["level"] * 2 - 2) + f"L{e['level']} p{e['page']}  {e['text']}")
