// lib.js — shared palette, fonts, and builder helpers for the Corner Spa blueprint docx
const {
  Paragraph, TextRun, Table, TableRow, TableCell, ImageRun, ExternalHyperlink,
  AlignmentType, HeadingLevel, WidthType, BorderStyle, ShadingType, TableLayoutType,
} = require("docx");
const fs = require("fs");
const isz = require("image-size");
const imageSize = isz.imageSize || isz.default || isz;

// ── MIN-1 Warm Gold palette (design-system.md) ──
const P = {
  bg: "F3F1ED", primary: "000000", accent: "D6C096", accentDeep: "B08050",
  cover: { titleColor: "000000", subtitleColor: "606060", metaColor: "707070", footerColor: "A0A0A0" },
  table: { headerBg: "D6C096", headerText: "1A1A1A", accentLine: "000000", innerLine: "DDD8CC", surface: "F5F3ED" },
};
const BODY_COLOR = "000000";       // Report profile A: pure black body
const HEAD_COLOR = "1A1A1A";
const GRAY = "808080";
const FONT_BODY = { ascii: "Times New Roman", eastAsia: "SimSun" };
const FONT_HEAD = { ascii: "Times New Roman", eastAsia: "SimHei" };

// ── Border constants ──
const NB = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const noBorders = { top: NB, bottom: NB, left: NB, right: NB };
const allNoBorders = { top: NB, bottom: NB, left: NB, right: NB, insideHorizontal: NB, insideVertical: NB };

// ── Text helpers ──
function safeText(v, ph) {
  if (v === undefined || v === null || v === "" || String(v) === "NaN" || String(v) === "undefined") {
    return ph || "[to be confirmed]";
  }
  return String(v);
}

function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    alignment: AlignmentType.CENTER,
    spacing: { before: 360, after: 200, line: 380, lineRule: "atLeast" },
    children: [new TextRun({ text: safeText(text), bold: true, size: 32, color: HEAD_COLOR, font: FONT_HEAD })],
  });
}
function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 280, after: 140, line: 360, lineRule: "atLeast" },
    children: [new TextRun({ text: safeText(text), bold: true, size: 30, color: HEAD_COLOR, font: FONT_HEAD })],
  });
}
function h3(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 220, after: 110, line: 340, lineRule: "atLeast" },
    children: [new TextRun({ text: safeText(text), bold: true, size: 28, color: HEAD_COLOR, font: FONT_HEAD })],
  });
}
// Block title — visually a sub-heading, but not a Heading style (keeps TOC hierarchy clean)
function blockTitle(text) {
  return new Paragraph({
    alignment: AlignmentType.LEFT,
    keepNext: true,
    spacing: { before: 220, after: 110, line: 340, lineRule: "atLeast" },
    children: [new TextRun({ text: safeText(text), bold: true, size: 28, color: HEAD_COLOR, font: FONT_HEAD })],
  });
}

// body paragraph — English: left aligned, no first-line indent, 1.3x spacing
function para(textOrRuns, opts = {}) {
  const runs = Array.isArray(textOrRuns)
    ? textOrRuns
    : [new TextRun({ text: safeText(textOrRuns), size: 24, color: BODY_COLOR, font: FONT_BODY })];
  return new Paragraph({
    alignment: AlignmentType.LEFT,
    spacing: { after: opts.after !== undefined ? opts.after : 140, line: 312 },
    keepNext: opts.keepNext || false,
    children: runs,
  });
}
function r(text, o = {}) {
  return new TextRun({
    text: safeText(text), size: o.size || 24, color: o.color || BODY_COLOR,
    bold: o.bold || false, italics: o.italics || false, font: o.font || FONT_BODY,
  });
}
// bold lead-in paragraph: "Lead-in. rest of the sentence..."
function lead(boldPart, rest, opts = {}) {
  return para([r(boldPart, { bold: true }), r(rest)], opts);
}
function bullet(textOrRuns, level = 0) {
  const runs = Array.isArray(textOrRuns)
    ? textOrRuns
    : [new TextRun({ text: safeText(textOrRuns), size: 24, color: BODY_COLOR, font: FONT_BODY })];
  return new Paragraph({
    bullet: { level },
    alignment: AlignmentType.LEFT,
    spacing: { after: 80, line: 312 },
    children: runs,
  });
}

// ── Table builder — Horizontal-Only business style (MIN-1 tokens) ──
// headers: string[]; rows: string[][]; widths: number[] (percentages, sum 100)
function buildTable(headers, rows, widths, opts = {}) {
  const cellMargins = { top: 70, bottom: 70, left: 120, right: 120 };
  const headerRow = new TableRow({
    tableHeader: true,
    cantSplit: true,
    children: headers.map((text, i) => new TableCell({
      children: [new Paragraph({
        alignment: AlignmentType.LEFT,
        spacing: { line: 300 },
        children: [new TextRun({ text: safeText(text), bold: true, size: 21, color: P.table.headerText, font: FONT_BODY })],
      })],
      shading: { type: ShadingType.CLEAR, fill: P.table.headerBg },
      margins: cellMargins,
      width: { size: widths[i], type: WidthType.PERCENTAGE },
    })),
  });
  const dataRows = rows.map((cells, ri) => new TableRow({
    cantSplit: true,
    children: cells.map((text, i) => new TableCell({
      children: [new Paragraph({
        alignment: AlignmentType.LEFT,
        spacing: { line: 300 },
        children: [new TextRun({
          text: safeText(text), size: 21, color: BODY_COLOR, font: FONT_BODY,
          bold: opts.boldFirstCol ? i === 0 : false,
        })],
      })],
      shading: opts.zebra && ri % 2 === 0
        ? { type: ShadingType.CLEAR, fill: P.table.surface }
        : { type: ShadingType.CLEAR, fill: "FFFFFF" },
      margins: cellMargins,
      width: { size: widths[i], type: WidthType.PERCENTAGE },
    })),
  }));
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    layout: TableLayoutType.FIXED,
    borders: {
      top: { style: BorderStyle.SINGLE, size: 4, color: P.table.accentLine },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: P.table.accentLine },
      left: NB, right: NB,
      insideHorizontal: { style: BorderStyle.SINGLE, size: 2, color: P.table.innerLine },
      insideVertical: NB,
    },
    rows: [headerRow, ...dataRows],
  });
}
function tableTitle(text) {
  return new Paragraph({
    keepNext: true,
    spacing: { before: 160, after: 100, line: 312 },
    children: [new TextRun({ text: safeText(text), bold: true, size: 21, color: HEAD_COLOR, font: FONT_BODY })],
  });
}
function tableNote(text) {
  return new Paragraph({
    spacing: { before: 80, after: 160, line: 312 },
    children: [new TextRun({ text: safeText(text), italics: true, size: 19, color: "595959", font: FONT_BODY })],
  });
}

// ── Figure embed — aspect ratio preserved from actual PNG dimensions ──
function figure(path, captionText, maxW = 585, maxH = 880) {
  const buf = fs.readFileSync(path);
  const dims = imageSize(buf);
  const aspect = dims.height / dims.width;
  let displayWidth = maxW;
  let displayHeight = Math.round(displayWidth * aspect);
  if (displayHeight > maxH) {
    displayHeight = maxH;
    displayWidth = Math.round(displayHeight / aspect);
  }
  return [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      keepNext: true,
      spacing: { before: 160, after: 60 },
      children: [new ImageRun({ data: buf, transformation: { width: displayWidth, height: displayHeight }, type: "png" })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 200, line: 300 },
      children: [new TextRun({ text: safeText(captionText), italics: true, size: 19, color: "595959", font: FONT_BODY })],
    }),
  ];
}

// ── Cover title layout — width-aware (Latin ~55% of CJK width), word-boundary breaks ──
function estimateTextWidth(text, pt) {
  let width = 0;
  for (const ch of text) {
    const code = ch.codePointAt(0);
    const isCJK = (code >= 0x4e00 && code <= 0x9fff) || (code >= 0x3400 && code <= 0x4dbf) ||
      (code >= 0x3000 && code <= 0x303f) || (code >= 0xff00 && code <= 0xffef);
    width += isCJK ? pt * 20 : pt * 11;
  }
  return width;
}
function splitTitleLinesEn(title, maxWidthTwips, pt) {
  const words = title.split(/\s+/);
  const lines = [];
  let cur = "";
  for (const w of words) {
    const cand = cur ? cur + " " + w : w;
    if (estimateTextWidth(cand, pt) <= maxWidthTwips || !cur) cur = cand;
    else { lines.push(cur); cur = w; }
  }
  if (cur) lines.push(cur);
  // no short orphan last line
  if (lines.length > 1 && lines[lines.length - 1].length <= 3) {
    const last = lines.pop();
    lines[lines.length - 1] += " " + last;
  }
  return lines;
}
function calcTitleLayoutMixed(title, maxWidthTwips, preferredPt = 40, minPt = 24) {
  let titlePt = preferredPt;
  let lines = splitTitleLinesEn(title, maxWidthTwips, titlePt);
  while (titlePt > minPt && (lines.length > 3 || lines.some(l => estimateTextWidth(l, titlePt) > maxWidthTwips))) {
    titlePt -= 2;
    lines = splitTitleLinesEn(title, maxWidthTwips, titlePt);
  }
  return { titlePt, titleLines: lines };
}

// ── Recipe R2: Double-Rule Frame (centered) — validated recipe from design-system.md ──
function buildCoverR2(config) {
  const C = config.palette;
  const padL = 1400, padR = 1400;
  const { titlePt, titleLines } = calcTitleLayoutMixed(config.title, 11906 - padL - padR, 40, 24);
  const titleSize = titlePt * 2;
  const thickBorder = { style: BorderStyle.SINGLE, size: 18, color: C.accent, space: 20 };
  const children = [];

  // 1. Top rule
  children.push(new Paragraph({
    indent: { left: padL - 400, right: padR - 400 }, spacing: { before: 1200, after: 200 },
    border: { top: thickBorder }, children: [],
  }));
  // 2. Whitespace
  children.push(new Paragraph({ spacing: { before: 1800 } }));
  // 3. English label
  if (config.englishLabel) {
    children.push(new Paragraph({
      alignment: AlignmentType.CENTER, spacing: { after: 500 },
      children: [new TextRun({
        text: config.englishLabel.split("").join("  "),
        size: 18, color: C.accentText || C.accent, font: { ascii: "Calibri" }, characterSpacing: 40,
      })],
    }));
  }
  // 4. Main title (centered, dynamic)
  for (let i = 0; i < titleLines.length; i++) {
    children.push(new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: i < titleLines.length - 1 ? 80 : 300, line: Math.ceil(titlePt * 23), lineRule: "atLeast" },
      children: [new TextRun({
        text: titleLines[i], size: titleSize, bold: true,
        color: C.titleColor, font: { eastAsia: "SimHei", ascii: "Times New Roman" },
      })],
    }));
  }
  // 5. Subtitle
  if (config.subtitle) {
    children.push(new Paragraph({
      alignment: AlignmentType.CENTER, spacing: { after: 400, line: 340, lineRule: "atLeast" },
      indent: { left: padL - 600, right: padR - 600 },
      children: [new TextRun({
        text: config.subtitle, size: 24, color: C.subtitleColor,
        font: { eastAsia: "Microsoft YaHei", ascii: "Times New Roman" },
      })],
    }));
  }
  // 6. Whitespace
  children.push(new Paragraph({ spacing: { before: 1200 } }));
  // 7. Meta lines — 18pt
  for (const line of (config.metaLines || [])) {
    children.push(new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 100, line: Math.ceil(18 * 23), lineRule: "atLeast" },
      children: [new TextRun({
        text: line, size: 36, color: C.metaColor,
        font: { eastAsia: "Microsoft YaHei", ascii: "Times New Roman" },
      })],
    }));
  }
  // 8. Whitespace
  children.push(new Paragraph({ spacing: { before: 2000 } }));
  // 9. Footer + bottom rule
  children.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    indent: { left: padL - 400, right: padR - 400 }, spacing: { before: 200 },
    border: { bottom: thickBorder },
    children: [new TextRun({ text: config.footerRight || "", size: 18, color: C.footerColor, font: { ascii: "Times New Roman" } })],
  }));

  return [new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    layout: TableLayoutType.FIXED,
    borders: allNoBorders,
    rows: [new TableRow({
      height: { value: 16838, rule: "exact" },
      children: [new TableCell({
        shading: { type: ShadingType.CLEAR, fill: C.bg },
        borders: noBorders,
        verticalAlign: "top",
        children,
      })],
    })],
  })];
}

module.exports = {
  P, BODY_COLOR, HEAD_COLOR, GRAY, FONT_BODY, FONT_HEAD,
  NB, noBorders, allNoBorders,
  safeText, h1, h2, h3, blockTitle, para, r, lead, bullet,
  buildTable, tableTitle, tableNote, figure,
  estimateTextWidth, calcTitleLayoutMixed, buildCoverR2,
};
