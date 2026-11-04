// Corner Spa Landing Page Blueprint - docx builder
// Recipe R1 (Pure Paragraph Left) + IG-1 Ink Gold palette (luxury brand)
// 3-section architecture: Cover (no page#) / Front matter (Roman) / Body (Arabic)
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  ImageRun, PageBreak, Header, Footer, PageNumber, NumberFormat,
  AlignmentType, HeadingLevel, WidthType, BorderStyle, ShadingType,
  TableLayoutType, SectionType, TableOfContents,
} = require("docx");
const fs = require("fs");
const path = require("path");
const sizeOf = require("image-size");
const { P1 } = require("./corner_spa_content_p1.js");
const { P2 } = require("./corner_spa_content_p2.js");

const OUT = path.join("/home/z/my-project/download", "Corner_Spa_Landing_Page_Blueprint.docx");
const SCRIPT_DIR = __dirname;

// ---------- palette IG-1 (Ink Gold - luxury) ----------
const PAL = {
  bg: "1A1A1A", accent: "C9A84C",
  cover: { titleColor: "FFFFFF", subtitleColor: "B0B8C0", metaColor: "90989F", footerColor: "687078" },
  table: { headerBg: "C9A84C", headerText: "1A1A1A", accentLine: "C9A84C", innerLine: "DDD5C0", surface: "F5F2E8" },
};
const INK = "1A1A1A";      // headings
const BODY = "000000";     // body text (Profile A: pure black)
const GREY = "808080";

const NB = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const noBorders = { top: NB, bottom: NB, left: NB, right: NB };
const allNoBorders = { top: NB, bottom: NB, left: NB, right: NB, insideHorizontal: NB, insideVertical: NB };

const EN_FONT = { ascii: "Times New Roman", eastAsia: "Times New Roman", hAnsi: "Times New Roman" };

// ---------- English-aware title layout (adapted calcTitleLayout) ----------
function textWidthTwips(text, pt) {
  let w = 0;
  for (const ch of text) w += /[\u4e00-\u9fff\u3000-\u30ff]/.test(ch) ? pt * 20 : pt * 11;
  return w;
}
function wrapWords(title, maxWidth, pt) {
  const words = title.split(/\s+/);
  const lines = [];
  let cur = "";
  for (const wd of words) {
    const trial = cur ? cur + " " + wd : wd;
    if (textWidthTwips(trial, pt) <= maxWidth || !cur) cur = trial;
    else { lines.push(cur); cur = wd; }
  }
  if (cur) lines.push(cur);
  return lines;
}
function calcTitleLayout(title, maxWidthTwips, preferredPt = 40, minPt = 24) {
  let titlePt = preferredPt, lines;
  while (titlePt >= minPt) {
    lines = wrapWords(title, maxWidthTwips, titlePt);
    if (lines.length <= 3) break;
    titlePt -= 2;
  }
  if (!lines || lines.length > 3) { lines = wrapWords(title, maxWidthTwips, minPt); titlePt = minPt; }
  if (lines.length > 1 && lines[lines.length - 1].length <= 2) {
    const last = lines.pop(); lines[lines.length - 1] += " " + last;
  }
  return { titlePt, titleLines: lines };
}
function calcCoverSpacing(params) {
  const { titleLineCount = 1, titlePt = 36, hasSubtitle = false, hasEnglishLabel = false,
    metaLineCount = 0, fixedHeight = 800, pageHeight = 16838, marginTop = 0, marginBottom = 0 } = params;
  const SAFETY = 1200;
  const usableHeight = pageHeight - marginTop - marginBottom - SAFETY;
  const titleHeight = titleLineCount * (titlePt * 23 + 200);
  const subtitleHeight = hasSubtitle ? (12 * 23 + 600) : 0;
  const englishLabelHeight = hasEnglishLabel ? (9 * 23 + 600) : 0;
  const metaHeight = metaLineCount * (10 * 23 + 100);
  const implicitParaHeight = 3 * 300;
  const contentHeight = titleHeight + subtitleHeight + englishLabelHeight + metaHeight + fixedHeight + implicitParaHeight;
  const remainingSpace = usableHeight - contentHeight;
  const safeRemaining = Math.max(remainingSpace, 400);
  const FOOTER_MIN = 800;
  const rawTop = Math.floor(safeRemaining * 0.45);
  const rawBottom = Math.floor(safeRemaining * 0.45);
  const bottomSpacing = Math.max(rawBottom, FOOTER_MIN);
  const topSpacing = Math.max(rawTop - Math.max(0, FOOTER_MIN - rawBottom), 400);
  const midSpacing = Math.max(safeRemaining - topSpacing - bottomSpacing, 0);
  return { topSpacing, midSpacing, bottomSpacing };
}

// ---------- Cover R1 ----------
function buildCoverR1(config) {
  const P = config.palette;
  const padL = 1200, padR = 800;
  const availableWidth = 11906 - padL - padR - 300;
  const { titlePt, titleLines } = calcTitleLayout(config.title, availableWidth, 40, 24);
  const titleSize = titlePt * 2;
  const spacing = calcCoverSpacing({
    titleLineCount: titleLines.length, titlePt,
    hasSubtitle: !!config.subtitle, hasEnglishLabel: !!config.englishLabel,
    metaLineCount: (config.metaLines || []).length, fixedHeight: 400,
  });
  const accentLeft = { style: BorderStyle.SINGLE, size: 8, color: P.accent, space: 12 };
  const children = [];
  children.push(new Paragraph({ spacing: { before: spacing.topSpacing } }));
  if (config.englishLabel) {
    children.push(new Paragraph({
      indent: { left: padL, right: padR }, spacing: { after: 500 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: P.accent, space: 8 } },
      children: [new TextRun({ text: config.englishLabel.split("").join("  "), size: 18, color: P.accent, font: EN_FONT, characterSpacing: 40 })],
    }));
  }
  for (let i = 0; i < titleLines.length; i++) {
    children.push(new Paragraph({
      indent: { left: padL },
      spacing: { after: i < titleLines.length - 1 ? 100 : 300, line: Math.ceil(titlePt * 23), lineRule: "atLeast" },
      children: [new TextRun({ text: titleLines[i], size: titleSize, bold: true, color: P.titleColor, font: EN_FONT })],
    }));
  }
  if (config.subtitle) {
    children.push(new Paragraph({
      indent: { left: padL, right: padR }, spacing: { after: 800 },
      children: [new TextRun({ text: config.subtitle, size: 24, color: P.subtitleColor, font: EN_FONT })],
    }));
  }
  for (const line of (config.metaLines || [])) {
    children.push(new Paragraph({
      indent: { left: padL + 200 }, spacing: { after: 80 },
      border: { left: accentLeft },
      children: [new TextRun({ text: line, size: 24, color: P.metaColor, font: EN_FONT })],
    }));
  }
  children.push(new Paragraph({ spacing: { before: spacing.bottomSpacing } }));
  children.push(new Paragraph({
    indent: { left: padL, right: padR },
    border: { top: { style: BorderStyle.SINGLE, size: 2, color: P.accent, space: 8 } },
    spacing: { before: 200 },
    children: [
      new TextRun({ text: config.footerLeft || "", size: 16, color: P.footerColor, font: EN_FONT }),
      new TextRun({ text: "                                        " }),
      new TextRun({ text: config.footerRight || "", size: 16, color: P.footerColor, font: EN_FONT }),
    ],
  }));
  return [new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    layout: TableLayoutType.FIXED,
    borders: allNoBorders,
    rows: [new TableRow({
      height: { value: 16838, rule: "exact" },
      children: [new TableCell({
        shading: { type: ShadingType.CLEAR, fill: P.bg }, borders: noBorders, verticalAlign: "top",
        children,
      })],
    })],
  })];
}

// ---------- body helpers ----------
function parseBoldRuns(text, base) {
  const runs = [];
  const parts = String(text).split(/\*\*(.+?)\*\*/g);
  for (let i = 0; i < parts.length; i++) {
    if (!parts[i]) continue;
    runs.push(new TextRun(Object.assign({}, base, { text: parts[i], bold: i % 2 === 1 ? true : base.bold })));
  }
  return runs.length ? runs : [new TextRun(Object.assign({}, base, { text: "" }))];
}
const bodyBase = { size: 24, color: BODY, font: EN_FONT };

function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 400, after: 160, line: 312 },
    children: [new TextRun({ text, bold: true, size: 32, color: INK, font: EN_FONT })],
  });
}
function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 260, after: 120, line: 312 },
    children: [new TextRun({ text, bold: true, size: 28, color: INK, font: EN_FONT })],
  });
}
function para(text) {
  return new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    spacing: { line: 312, after: 120 },
    children: parseBoldRuns(text, bodyBase),
  });
}
function bullet(text) {
  return new Paragraph({
    bullet: { level: 0 },
    alignment: AlignmentType.LEFT,
    spacing: { line: 312, after: 80 },
    children: parseBoldRuns(text, bodyBase),
  });
}
function caption(text) {
  return new Paragraph({
    keepNext: true,
    alignment: AlignmentType.LEFT,
    spacing: { before: 200, after: 80, line: 312 },
    children: [new TextRun({ text, size: 18, color: "606060", italics: true, font: EN_FONT })],
  });
}
function figCaption(text) {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 80, after: 200, line: 312 },
    children: [new TextRun({ text, size: 18, color: "606060", italics: true, font: EN_FONT })],
  });
}
function cellPara(text, opts) {
  const o = opts || {};
  return new Paragraph({
    alignment: AlignmentType.LEFT,
    spacing: { line: 276 },
    children: parseBoldRuns(text, { size: 21, bold: !!o.bold, color: o.color || BODY, font: EN_FONT }),
  });
}
function dataTable(spec) {
  const T = PAL.table;
  const borders = {
    top: { style: BorderStyle.SINGLE, size: 4, color: T.accentLine },
    bottom: { style: BorderStyle.SINGLE, size: 4, color: T.accentLine },
    left: NB, right: NB,
    insideHorizontal: { style: BorderStyle.SINGLE, size: 2, color: T.innerLine },
    insideVertical: NB,
  };
  const headerRow = new TableRow({
    tableHeader: true, cantSplit: true,
    children: spec.headers.map((htext, i) => new TableCell({
      width: { size: spec.widths[i], type: WidthType.PERCENTAGE },
      shading: { type: ShadingType.CLEAR, fill: T.headerBg },
      margins: { top: 80, bottom: 80, left: 120, right: 120 },
      children: [cellPara(htext, { bold: true, color: T.headerText })],
    })),
  });
  const rows = spec.rows.map((r, ri) => new TableRow({
    cantSplit: true,
    children: r.map((c, ci) => new TableCell({
      width: { size: spec.widths[ci], type: WidthType.PERCENTAGE },
      shading: ri % 2 === 1 ? { type: ShadingType.CLEAR, fill: T.surface } : undefined,
      margins: { top: 60, bottom: 60, left: 120, right: 120 },
      children: [cellPara(c)],
    })),
  }));
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders,
    rows: [headerRow].concat(rows),
  });
}
function figure(spec) {
  const p = path.join(SCRIPT_DIR, spec.path);
  const buf = fs.readFileSync(p);
  const dim = sizeOf.imageSize ? sizeOf.imageSize(buf) : sizeOf(buf);
  const displayWidth = 520;
  const displayHeight = Math.round(displayWidth * dim.height / dim.width);
  return new Paragraph({
    keepNext: true,
    alignment: AlignmentType.CENTER,
    spacing: { before: 120 },
    children: [new ImageRun({ data: buf, transformation: { width: displayWidth, height: displayHeight }, type: "png" })],
  });
}

function renderBlocks(blocks) {
  const out = [];
  for (const b of blocks) {
    if (b.t === "h1") out.push(h1(b.text));
    else if (b.t === "h2") out.push(h2(b.text));
    else if (b.t === "p") out.push(para(b.text));
    else if (b.t === "bullets") b.items.forEach(it => out.push(bullet(it)));
    else if (b.t === "table") { out.push(caption(b.caption)); out.push(dataTable(b)); out.push(new Paragraph({ spacing: { after: 120 }, children: [] })); }
    else if (b.t === "fig") { out.push(figure(b)); out.push(figCaption(b.caption)); }
  }
  return out;
}

// ---------- headers / footers ----------
function pageHeader() {
  return new Header({
    children: [new Paragraph({
      alignment: AlignmentType.CENTER,
      border: { bottom: { style: BorderStyle.SINGLE, size: 2, color: PAL.table.innerLine, space: 4 } },
      spacing: { after: 0 },
      children: [new TextRun({ text: "Corner Spa Landing Page - Research and Build Blueprint", size: 18, color: GREY, font: EN_FONT })],
    })],
  });
}
function pageFooter() {
  return new Footer({
    children: [new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ children: [PageNumber.CURRENT], size: 18, color: GREY, font: EN_FONT })],
    })],
  });
}

// ---------- assemble ----------
const pgSize = { width: 11906, height: 16838 };
const pgMargin = { top: 1440, bottom: 1440, left: 1701, right: 1417 };

const coverConfig = {
  title: "Corner Spa",
  subtitle: "Landing Page Research and Build Blueprint - Windhoek, Namibia",
  englishLabel: "RESEARCH & BUILD BLUEPRINT",
  metaLines: [
    "Prepared for: Oryx Institute Ventures × Mendozer",
    "Scope: Every component, from CTA buttons to WhatsApp to the staff section",
    "Market: Windhoek, Namibia",
    "Version 1.0 - November 2026",
  ],
  footerLeft: "Oryx Institute Ventures × Mendozer",
  footerRight: "November 2026",
  palette: { bg: PAL.bg, accent: PAL.accent, titleColor: PAL.cover.titleColor, subtitleColor: PAL.cover.subtitleColor, metaColor: PAL.cover.metaColor, footerColor: PAL.cover.footerColor },
};

const frontMatterChildren = [
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 480, after: 360 },
    children: [new TextRun({ text: "Table of Contents", bold: true, size: 32, color: INK, font: EN_FONT })],
  }),
  new TableOfContents("Table of Contents", { hyperlink: true, headingStyleRange: "1-2" }),
  new Paragraph({
    spacing: { before: 200 },
    children: [new TextRun({
      text: "Note: This Table of Contents is generated via field codes. To ensure page number accuracy after editing, please right-click the TOC and select \"Update Field.\"",
      italics: true, size: 18, color: "888888", font: EN_FONT,
    })],
  }),
];

const bodyChildren = renderBlocks(P1).concat(renderBlocks(P2));

const doc = new Document({
  styles: {
    default: {
      document: {
        run: { font: EN_FONT, size: 24, color: BODY },
        paragraph: { spacing: { line: 312 } },
      },
      heading1: {
        run: { font: EN_FONT, size: 32, bold: true, color: INK },
        paragraph: { spacing: { before: 400, after: 160, line: 312 }, outlineLevel: 0 },
      },
      heading2: {
        run: { font: EN_FONT, size: 28, bold: true, color: INK },
        paragraph: { spacing: { before: 260, after: 120, line: 312 }, outlineLevel: 1 },
      },
    },
  },
  sections: [
    { // Section 1: Cover - margin 0, no header/footer, no page number
      properties: { page: { size: pgSize, margin: { top: 0, bottom: 0, left: 0, right: 0 } } },
      children: buildCoverR1(coverConfig),
    },
    { // Section 2: Front matter (TOC) - Roman numerals
      properties: {
        type: SectionType.NEXT_PAGE,
        page: { size: pgSize, margin: pgMargin, pageNumbers: { start: 1, formatType: NumberFormat.UPPER_ROMAN } },
      },
      headers: { default: pageHeader() },
      footers: { default: pageFooter() },
      children: frontMatterChildren,
    },
    { // Section 3: Body - Arabic starting at 1
      properties: {
        type: SectionType.NEXT_PAGE,
        page: { size: pgSize, margin: pgMargin, pageNumbers: { start: 1, formatType: NumberFormat.DECIMAL } },
      },
      headers: { default: pageHeader() },
      footers: { default: pageFooter() },
      children: bodyChildren,
    },
  ],
});

Packer.toBuffer(doc).then(buf => {
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, buf);
  console.log("written:", OUT, buf.length, "bytes");
});
