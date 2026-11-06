#!/usr/bin/env python3
"""Regenerate public/price-list.pdf from prices.json.

Run this after editing prices.json:
    python3 scripts/make_price_pdf.py

The PDF is the downloadable price list linked from the home page and the
booking page. It shows exactly the rows in prices.json, in Namibian dollars.
No phone number is printed anywhere; booking happens via the website and
WhatsApp buttons.
"""
import json
import os
from reportlab.lib.pagesizes import A4
from reportlab.lib.colors import HexColor
from reportlab.pdfgen import canvas

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PRICES = os.path.join(ROOT, "prices.json")
OUT = os.path.join(ROOT, "public", "price-list.pdf")

CREAM = HexColor("#F5F3EE")
CHARCOAL = HexColor("#2B2726")
SAND = HexColor("#A89076")
GREY = HexColor("#7A7470")
LINE = HexColor("#DCD6CC")

W, H = A4
M = 52  # margin
BOTTOM = 120  # lowest y a row may occupy


def tracked_text(c, text, x, y, size=8.5, color=SAND, tracking=2.2, font="Helvetica"):
    c.setFont(font, size)
    c.setFillColor(color)
    cx = x
    for ch in text.upper():
        c.drawString(cx, y, ch)
        cx += c.stringWidth(ch, font, size) + (tracking if ch != " " else size * 0.35)
    return cx


def tracked_width(c, text, size=8.5, tracking=2.2, font="Helvetica"):
    return sum(
        c.stringWidth(ch, font, size) + (tracking if ch != " " else size * 0.35)
        for ch in text.upper()
    )


def centered_tracked(c, text, y, size=8.5, color=SAND, tracking=2.2):
    tracked_text(c, text, (W - tracked_width(c, text, size, tracking)) / 2, y, size, color, tracking)


def page_background(c):
    c.setFillColor(CREAM)
    c.rect(-2, -2, W + 4, H + 4, stroke=0, fill=1)


def header(c):
    page_background(c)
    centered_tracked(c, "Corner Spa · Windhoek", H - 62)
    c.setFont("Times-Roman", 34)
    c.setFillColor(CHARCOAL)
    c.drawCentredString(W / 2, H - 100, "Price list")
    c.setFont("Helvetica", 10)
    c.setFillColor(GREY)
    c.drawCentredString(W / 2, H - 120, "The relaxation you deserve. All prices in Namibian dollars (N$).")
    c.setLineWidth(0.8)
    c.setStrokeColor(SAND)
    c.line(M, H - 138, W - M, H - 138)


def footer(c, page_no):
    c.setLineWidth(0.6)
    c.setStrokeColor(LINE)
    c.line(M, 96, W - M, 96)
    y = 80
    c.setFont("Helvetica", 8.5)
    c.setFillColor(GREY)
    c.drawCentredString(W / 2, y, "34 Schonlein Street, Windhoek West, Windhoek, Namibia, on the Flexona Organizational Services plot")
    y -= 12
    c.drawCentredString(W / 2, y, "Mon to Fri 09:00 to 18:00  ·  Sat 09:00 to 16:00  ·  Sun closed  (Windhoek time)")
    y -= 12
    c.setFillColor(SAND)
    c.drawCentredString(W / 2, y, "Book on WhatsApp via spa.mendozer.com  ·  oryxinstitute.org/corner-spa  ·  mendozer.com")
    y -= 12
    c.setFillColor(GREY)
    c.drawCentredString(W / 2, y, "First project of Oryx Institute. A concept by Mendozer Investments.")
    centered_tracked(c, f"Page {page_no}", H - 40, 8, SAND, 1.8)


def draw_items(c, items):
    """Draw items until the page is full. Returns the index of the first
    item that did not fit (len(items) if everything fit)."""
    y = H - 170
    i = 0
    for kind, payload in items:
        if kind == "title":
            if y < BOTTOM:
                return i
            c.setFillColor(SAND)
            tracked_text(c, payload, M, y, 9, SAND, 2.4)
            y -= 20
        elif kind == "row":
            if y < BOTTOM:
                return i
            name, detail, price = payload
            c.setFont("Helvetica", 10.5)
            c.setFillColor(CHARCOAL)
            c.drawString(M, y, name)
            if detail:
                name_w = c.stringWidth(name, "Helvetica", 10.5)
                c.setFont("Helvetica", 9)
                c.setFillColor(GREY)
                c.drawString(M + name_w + 8, y, detail)
            c.setFont("Times-Roman", 11.5)
            c.setFillColor(CHARCOAL)
            c.drawRightString(W - M, y, f"N$ {price}")
            y -= 6
            c.setLineWidth(0.5)
            c.setStrokeColor(LINE)
            c.line(M, y, W - M, y)
            y -= 15
        elif kind == "facials":
            if y < BOTTOM + 16:
                return i
            c.setFillColor(SAND)
            tracked_text(c, "Facials", M, y, 9, SAND, 2.4)
            y -= 20
            c.setFont("Helvetica", 10.5)
            c.setFillColor(CHARCOAL)
            c.drawString(M, y, payload["note"])
            c.setFont("Times-Roman", 11.5)
            c.drawRightString(W - M, y, "Book on WhatsApp")
            c.setFont("Helvetica", 9)
            c.setFillColor(GREY)
            c.drawString(M, y - 14, "Facial prices are not fixed. Message us and we reply the same day.")
            y -= 22
        i += 1
    return i


def main():
    with open(PRICES, encoding="utf-8") as f:
        data = json.load(f)

    items: list[tuple[str, object]] = []
    for group in data["groups"]:
        if group["id"].startswith("_"):
            continue
        items.append(("title", group["title"]))
        for row in group["rows"]:
            items.append(("row", (row["name"], row.get("detail"), row["price"])))
    items.append(("facials", data["facials"]))

    c = canvas.Canvas(OUT, pagesize=A4)
    c.setTitle("Corner Spa price list")
    c.setAuthor("Corner Spa, Windhoek")
    c.setSubject("Massage, foot spa, nails, waxing, lashes. Prices in Namibian dollars.")

    header(c)
    page_no = 1
    remaining = items
    while True:
        drawn = draw_items(c, remaining)
        if drawn >= len(remaining):
            break
        footer(c, page_no)
        c.showPage()
        page_no += 1
        header(c)
        remaining = remaining[drawn:]
    footer(c, page_no)
    c.save()
    size = os.path.getsize(OUT)
    print(f"OK price-list.pdf {size / 1024:.1f} KB, {page_no} page(s)")


if __name__ == "__main__":
    main()
