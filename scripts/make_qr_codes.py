#!/usr/bin/env python3
"""Generate the three scan-to-book QR codes as SVGs in public/media/qr/.

The flyer carries the same three codes (spa.mendozer.com,
oryxinstitute.org/corner-spa, mendozer.com). Dark modules use the brand
charcoal; the background stays transparent so the chips in the booking
band show through. Error correction M keeps them scannable at 96px.
"""
import os

import segno

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "public", "media", "qr")
os.makedirs(OUT, exist_ok=True)

TARGETS = [
    ("spa-mendozer.svg", "https://spa.mendozer.com"),
    ("oryx-corner-spa.svg", "https://oryxinstitute.org/corner-spa"),
    ("mendozer.svg", "https://mendozer.com"),
]

for name, url in TARGETS:
    qr = segno.make(url, error="m")
    path = os.path.join(OUT, name)
    qr.save(path, kind="svg", scale=8, border=2, dark="#2B2726", light=None)
    # PNG twin for the downloadable price-list PDF (reportlab cannot draw SVG).
    qr.save(
        os.path.join(OUT, name.replace(".svg", ".png")),
        kind="png",
        scale=8,
        border=2,
        dark="#2B2726",
        light=None,
    )
    print("wrote", name, "+ png ->", url)
