"""Cut the ochre chair out of its studio background -> transparent PNG."""
from PIL import Image, ImageFilter
import numpy as np

src = "/home/z/my-project/scripts/careers/chair-raw.png"
out = "/home/z/my-project/scripts/careers/chair-cut.png"

im = Image.open(src).convert("RGB")
a = np.array(im).astype(float)
h, w, _ = a.shape

# Sample background colour from the four corners (10px patches)
corners = np.concatenate([
    a[:10, :10].reshape(-1, 3), a[:10, -10:].reshape(-1, 3),
    a[-10:, :10].reshape(-1, 3), a[-10:, -10:].reshape(-1, 3),
])
bg = corners.mean(axis=0)
print("bg colour:", bg.round(1))

# Distance from background colour
dist = np.sqrt(((a - bg) ** 2).sum(axis=2))

# Soft alpha ramp: 0 at <=18 (same colour), 1 at >=70 (clearly chair)
alpha = np.clip((dist - 18) / (70 - 18), 0, 1)

# Clean: remove tiny specks via a slight blur + threshold on the alpha
am = Image.fromarray((alpha * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.2))
alpha = np.array(am).astype(float) / 255.0

# Largest connected component keep-ish: zero out alpha above the chair top rows? Not needed; specks removed by blur.
rgba = np.dstack([a, alpha * 255]).astype(np.uint8)
outim = Image.fromarray(rgba, "RGBA")

# Trim to the chair bounding box (alpha > 10) with padding
ys, xs = np.where(alpha > 0.04)
pad = 12
x0, x1 = max(0, xs.min() - pad), min(w, xs.max() + pad)
y0, y1 = max(0, ys.min() - pad), min(h, ys.max() + pad)
outim = outim.crop((x0, y0, x1, y1))
outim.save(out)
print("saved", out, outim.size)
