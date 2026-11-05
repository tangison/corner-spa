"""Optimize header mark PNGs: resize to 160px wide + quantize (alpha-safe)."""
from pathlib import Path
from PIL import Image

for name in ("mark-dark.png", "mark-light.png"):
    p = Path("/home/z/my-project/public/media/logos") / name
    before = p.stat().st_size
    img = Image.open(p)
    w, h = img.size
    nw = 160
    nh = round(h * nw / w)
    img = img.resize((nw, nh), Image.LANCZOS)
    img.save(p, "PNG", optimize=True)
    # second pass: palette quantization keeping alpha
    img2 = Image.open(p)
    img2 = img2.quantize(colors=64, method=Image.FASTOCTREE, dither=Image.NONE)
    img2.save(p, "PNG", optimize=True)
    after = p.stat().st_size
    print(f"{name}: {before/1024:.0f}KB -> {after/1024:.0f}KB  ({nw}x{nh})")
