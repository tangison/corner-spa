"""Compress Corner Spa photo assets in place (JPEG q72 progressive).
Keeps filenames/dimensions identical; only re-encodes. Prints before/after.
"""
from pathlib import Path
from PIL import Image

PHOTOS = Path("/home/z/my-project/public/media/photos")
TOTAL_BEFORE = TOTAL_AFTER = 0

for f in sorted(PHOTOS.glob("*.jpg")):
    before = f.stat().st_size
    img = Image.open(f)
    if img.mode != "RGB":
        img = img.convert("RGB")
    img.save(f, "JPEG", quality=72, optimize=True, progressive=True)
    after = f.stat().st_size
    TOTAL_BEFORE += before
    TOTAL_AFTER += after
    print(f"{f.name:24s} {before/1024:7.0f}KB -> {after/1024:6.0f}KB  ({img.size[0]}x{img.size[1]})")

print(f"{'TOTAL':24s} {TOTAL_BEFORE/1024:7.0f}KB -> {TOTAL_AFTER/1024:6.0f}KB  ({100*(1-TOTAL_AFTER/TOTAL_BEFORE):.0f}% saved)")
