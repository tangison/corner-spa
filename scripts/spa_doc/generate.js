// generate.js — assembles the Corner Spa Website Blueprint docx
const {
  Document, Packer, Paragraph, TextRun, Header, Footer, PageNumber, NumberFormat,
  AlignmentType, SectionType, TableOfContents, PageOrientation,
} = require("docx");
const fs = require("fs");
const { buildCoverR2, P, FONT_BODY, FONT_HEAD } = require("./lib");
const { chapters1to6 } = require("./content1");
const { chapters7to11 } = require("./content2");
const { chapters12to15 } = require("./content3");

const OUT = "/home/z/my-project/download/Corner_Spa_Website_Blueprint.docx";

// ── Cover config (Recipe R2, MIN-1 Warm Gold) ──
const coverConfig = {
  title: "Corner Spa Website Blueprint",
  englishLabel: "CORNER SPA · WINDHOEK",
  subtitle: "Every component of a world-class spa landing page — researched, specified and ready to build",
  metaLines: [
    "Prepared for the Corner Spa venture team",
    "Oryx Institute · Mendozer Investments CC",
    "Windhoek, Namibia · November 2026",
  ],
  footerRight: "Corner Spa — an Oryx Institute live lab · 2026",
  palette: {
    bg: P.bg,
    titleColor: P.cover.titleColor,
    subtitleColor: P.cover.subtitleColor,
    metaColor: P.cover.metaColor,
    footerColor: P.cover.footerColor,
    accent: P.accent,          // thick rules — warm gold D6C096
    accentText: "B08050",      // spaced label text — deeper gold for legibility on cream
  },
};

// ── Shared page geometry ──
const pgSize = { width: 11906, height: 16838, orientation: PageOrientation.PORTRAIT };
const pgMargin = { top: 1440, bottom: 1440, left: 1701, right: 1417 };

function pageNumFooter() {
  return new Footer({
    children: [new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ children: [PageNumber.CURRENT], size: 18, color: "808080", font: FONT_BODY })],
    })],
  });
}
function docHeader() {
  return new Header({
    children: [new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 0 },
      children: [new TextRun({
        text: "Corner Spa — Website & Conversion Blueprint",
        size: 18, color: "808080", font: FONT_BODY,
      })],
    })],
  });
}

// ── Front matter: TOC ──
const frontMatter = [
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 480, after: 360, line: 380, lineRule: "atLeast" },
    children: [new TextRun({ text: "Table of Contents", bold: true, size: 32, color: "1A1A1A", font: FONT_HEAD })],
  }),
  new TableOfContents("Table of Contents", { hyperlink: true, headingStyleRange: "1-2" }),
  new Paragraph({
    spacing: { before: 200, line: 300 },
    children: [new TextRun({
      text: "Note: this Table of Contents is generated via field codes. After editing the document, right-click the TOC and choose \"Update Field\" to refresh page numbers.",
      italics: true, size: 18, color: "888888", font: FONT_BODY,
    })],
  }),
];

// ── Body ──
const body = [...chapters1to6(), ...chapters7to11(), ...chapters12to15()];

const doc = new Document({
  creator: "Oryx Institute / Mendozer Investments",
  title: "Corner Spa Website Blueprint",
  description: "Component-by-component research blueprint for the Corner Spa landing page",
  styles: {
    default: {
      document: {
        run: { font: FONT_BODY, size: 24, color: "000000" },
        paragraph: { spacing: { line: 312 } },
      },
      heading1: {
        run: { font: FONT_HEAD, size: 32, bold: true, color: "1A1A1A" },
        paragraph: { spacing: { before: 360, after: 200, line: 380 }, outlineLevel: 0 },
      },
      heading2: {
        run: { font: FONT_HEAD, size: 30, bold: true, color: "1A1A1A" },
        paragraph: { spacing: { before: 280, after: 140, line: 360 }, outlineLevel: 1 },
      },
      heading3: {
        run: { font: FONT_HEAD, size: 28, bold: true, color: "1A1A1A" },
        paragraph: { spacing: { before: 220, after: 110, line: 340 }, outlineLevel: 2 },
      },
    },
  },
  sections: [
    { // Section 1: Cover — margin 0, no footer, no page numbers
      properties: { page: { size: pgSize, margin: { top: 0, bottom: 0, left: 0, right: 0 } } },
      children: buildCoverR2(coverConfig),
    },
    { // Section 2: Front matter (TOC) — Roman numerals
      properties: {
        type: SectionType.NEXT_PAGE,
        page: { size: pgSize, margin: pgMargin, pageNumbers: { start: 1, formatType: NumberFormat.UPPER_ROMAN } },
      },
      footers: { default: pageNumFooter() },
      children: frontMatter,
    },
    { // Section 3: Body — Arabic numerals restarting at 1
      properties: {
        type: SectionType.NEXT_PAGE,
        page: { size: pgSize, margin: pgMargin, pageNumbers: { start: 1, formatType: NumberFormat.DECIMAL } },
      },
      headers: { default: docHeader() },
      footers: { default: pageNumFooter() },
      children: body,
    },
  ],
});

Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync(OUT, buf);
  console.log("WROTE", OUT, (buf.length / 1024).toFixed(0) + "KB");
});
