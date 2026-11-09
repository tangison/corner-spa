#!/usr/bin/env python3
"""Verify the poster deliverables: dimensions, QR scanability, PDF links."""
from pyzbar.pyzbar import decode
from PIL import Image
import subprocess, os, re

OUT = "/home/z/my-project/download"
ok = lambda name, cond, detail="": print(f"{'PASS' if cond else 'FAIL'} {name}" + (f" — {detail}" if detail else ""))

# 1. dimensions
im4 = Image.open(f"{OUT}/corner-spa-we-are-hiring-4x5-1080x1350.png")
ok("4:5 exactly 1080x1350", im4.size == (1080, 1350), str(im4.size))
ima = Image.open(f"{OUT}/corner-spa-we-are-hiring-A4-200dpi.png")
ok("A4 PNG 1654x2339 (A4 at 200dpi)", ima.size == (1654, 2339), str(ima.size))

# 2. QR decodes from BOTH rendered posters (crop the QR corner region, upscale lightly)
def qr_from(img, box, scale=2):
    crop = img.crop(box).convert("RGB")
    crop = crop.resize((crop.width * scale, crop.height * scale), Image.LANCZOS)
    res = decode(crop)
    return [r.data.decode() for r in res]

# 4:5: QR card is at right side of the apply card, near y ~ 900-1080
r4 = qr_from(im4, (760, 880, 1080, 1150))
ok("QR scans from 4:5 poster", "https://spa.mendozer.com/careers" in r4, str(r4))

# A4: QR around x 1160-1400, y 1580-1900 (of 1654x2339)
ra = qr_from(ima, (1150, 1560, 1500, 1950))
ok("QR scans from A4 poster", "https://spa.mendozer.com/careers" in ra, str(ra))

# 3. PDF: page size + link annotations
pdf = f"{OUT}/corner-spa-we-are-hiring-A4.pdf"
out = subprocess.run(["pdfinfo", pdf], capture_output=True, text=True).stdout
size_line = [l for l in out.splitlines() if l.startswith("Page size")]
ok("PDF is A4 portrait", "(A4)" in (size_line[0] if size_line else ""), (size_line or [""])[0].strip())

try:
    from pypdf import PdfReader
except ImportError:
    subprocess.run(["pip", "install", "pypdf", "--quiet"], check=True)
    from pypdf import PdfReader
reader = PdfReader(pdf)
annots = []
if reader.pages[0].get("/Annots"):
    for a in reader.pages[0]["/Annots"]:
        obj = a.get_object()
        if obj.get("/Subtype") == "/Link":
            action = obj.get("/A")
            if action:
                annots.append(str(action.get("/URI", "")))
ok("PDF has clickable links", len(annots) >= 3, f"{len(annots)} links: {sorted(set(annots))}")
ok("mailto link present", any(u.startswith("mailto:careers@mendozer.com") for u in annots))
ok("careers URL link present", any(u == "https://spa.mendozer.com/careers" for u in annots))

# 4. file sizes
for f in ["corner-spa-we-are-hiring-A4.pdf", "corner-spa-we-are-hiring-A4-200dpi.png", "corner-spa-we-are-hiring-4x5-1080x1350.png"]:
    print(f"     {f}: {os.path.getsize(f'{OUT}/{f}'):,} bytes")
