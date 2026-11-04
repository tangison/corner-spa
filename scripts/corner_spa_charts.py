"""Generate the two data figures for the Corner Spa blueprint document.
Palette matches the docx IG-1 Ink Gold theme (accent #C9A84C, primary #1A1A1A).
"""
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import os

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "assets")
os.makedirs(OUT, exist_ok=True)

ACCENT = "#C9A84C"
DARK = "#1A1A1A"
GREY = "#8A8A8A"
LINE = "#DDD5C0"

plt.rcParams["font.family"] = "DejaVu Sans"
plt.rcParams["axes.unicode_minus"] = False

# ---------------- Figure 1: GBP interaction mix ----------------
fig1, ax1 = plt.subplots(figsize=(9.2, 4.6), dpi=200, constrained_layout=True)
labels = ["Website visits", "Direction requests", "Phone calls"]
values = [48, 34, 17]
bars = ax1.bar(labels, values, width=0.52, color=[ACCENT, "#B08F3E", DARK], edgecolor="none")
for b, v in zip(bars, values):
    ax1.text(b.get_x() + b.get_width() / 2, v + 1.2, f"{v}%", ha="center", va="bottom",
             fontsize=13, fontweight="bold", color=DARK)
ax1.set_ylim(0, 58)
ax1.set_ylabel("Share of interactions (%)", fontsize=11, color=DARK)
ax1.set_title("What users do on a Google Business Profile (2025 study)",
              fontsize=13, fontweight="bold", color=DARK, pad=12)
ax1.spines[["top", "right"]].set_visible(False)
ax1.spines[["left", "bottom"]].set_color(LINE)
ax1.tick_params(colors=DARK, labelsize=11)
ax1.grid(axis="y", color=LINE, linewidth=0.7, alpha=0.6)
ax1.set_axisbelow(True)
fig1.savefig(os.path.join(OUT, "fig1_gbp_interactions.png"), facecolor="white")
plt.close(fig1)

# ---------------- Figure 2: Booking software entry pricing ----------------
fig2, ax2 = plt.subplots(figsize=(9.2, 4.6), dpi=200, constrained_layout=True)
platforms = ["Fresha", "Vagaro", "Mangomint"]
prices = [19.95, 30, 120]
notes = ["$19.95", "$30", "$120 + $10 / user"]
bars2 = ax2.bar(platforms, prices, width=0.5, color=[ACCENT, "#B08F3E", DARK], edgecolor="none")
for b, n, v in zip(bars2, notes, prices):
    ax2.text(b.get_x() + b.get_width() / 2, v + 3, n, ha="center", va="bottom",
             fontsize=12, fontweight="bold", color=DARK)
ax2.set_ylim(0, 145)
ax2.set_ylabel("Entry monthly subscription (USD)", fontsize=11, color=DARK)
ax2.set_title("Salon & spa booking platforms - published entry pricing (2025/2026)",
              fontsize=13, fontweight="bold", color=DARK, pad=12)
ax2.spines[["top", "right"]].set_visible(False)
ax2.spines[["left", "bottom"]].set_color(LINE)
ax2.tick_params(colors=DARK, labelsize=11)
ax2.grid(axis="y", color=LINE, linewidth=0.7, alpha=0.6)
ax2.set_axisbelow(True)
fig2.savefig(os.path.join(OUT, "fig2_booking_pricing.png"), facecolor="white")
plt.close(fig2)

print("charts done:", os.listdir(OUT))
