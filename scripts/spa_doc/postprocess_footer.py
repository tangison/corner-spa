"""Post-process the Corner Spa blueprint docx:
1. Strip empty <w:pgNumType/> (docx-js emits them on sections without pageNumbers; confuses WPS).
2. Patch footer PAGE fields with explicit format switches:
   - front-matter section footer -> PAGE \\* ROMAN \\* MERGEFORMAT
   - body section footer        -> PAGE \\* arabic \\* MERGEFORMAT
Footer files are mapped via sectPr order in document.xml + document.xml.rels.
"""
import re, shutil, sys, zipfile, os

DOCX = "/home/z/my-project/download/Corner_Spa_Website_Blueprint.docx"
TMP = DOCX + ".tmp"

def main():
    zin = zipfile.ZipFile(DOCX, "r")
    doc_xml = zin.read("word/document.xml").decode("utf-8")
    rels_xml = zin.read("word/_rels/document.xml.rels").decode("utf-8")

    # 1. strip empty pgNumType
    stripped = doc_xml.replace("<w:pgNumType/>", "")

    # 2. map sectPr order -> footer rIds
    sect_blocks = re.findall(r"<w:sectPr[ >].*?</w:sectPr>", stripped, flags=re.S)
    footer_ids = []  # in section order
    for block in sect_blocks:
        m = re.search(r'<w:footerReference w:type="default" r:id="(rId\d+)"', block)
        footer_ids.append(m.group(1) if m else None)
    rid_to_target = dict(re.findall(r'Id="(rId\d+)"[^>]*Target="([^"]+)"', rels_xml))

    # section order: [front-matter(Roman), body(arabic)] — cover has no footer ref
    fmt_for_target = {}
    with_footer = [fid for fid in footer_ids if fid]
    if len(with_footer) >= 1 and footer_ids[0] is None:
        pass  # cover section (no footer) first — expected
    if len(with_footer) >= 2:
        fmt_for_target[rid_to_target[with_footer[0]].split("/")[-1]] = "ROMAN"
        fmt_for_target[rid_to_target[with_footer[1]].split("/")[-1]] = "arabic"
    print("sectPr footer rIds:", footer_ids, "-> targets:", {k: v for k, v in fmt_for_target.items()})

    zout = zipfile.ZipFile(TMP, "w", zipfile.ZIP_DEFLATED)
    for item in zin.infolist():
        data = zin.read(item.filename)
        name = item.filename
        if name == "word/document.xml":
            data = stripped.encode("utf-8")
        elif re.match(r"word/footer\d+\.xml$", name):
            base = name.split("/")[-1]
            if base in fmt_for_target:
                fmt = fmt_for_target[base]
                xml = data.decode("utf-8")
                xml, n = re.subn(
                    r"(<w:instrText[^>]*>)\s*PAGE\s*(</w:instrText>)",
                    r"\1 PAGE \\* " + fmt + r" \\* MERGEFORMAT \2",
                    xml,
                )
                print(f"patched {name} with {fmt} ({n} field(s))")
                data = xml.encode("utf-8")
        zout.writestr(item, data)
    zout.close(); zin.close()
    shutil.move(TMP, DOCX)
    print("OK", DOCX, os.path.getsize(DOCX) // 1024, "KB")

if __name__ == "__main__":
    main()
