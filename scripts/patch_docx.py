#!/usr/bin/env python3
"""Post-process the Corner Spa docx for WPS/Word compatibility:
1. Remove empty <w:pgNumType/> emitted for the cover section.
2. Patch footer PAGE fields: first referenced footer (front matter) -> ROMAN,
   later footers (body) -> arabic, with MERGEFORMAT switches.
"""
import re, sys, zipfile, shutil, os

DOCX = sys.argv[1] if len(sys.argv) > 1 else "/home/z/my-project/download/Corner_Spa_Landing_Page_Blueprint.docx"
TMP = DOCX + ".tmp"

with zipfile.ZipFile(DOCX, "r") as z:
    names = z.namelist()
    data = {n: z.read(n) for n in names}

doc_xml = data["word/document.xml"].decode("utf-8")

# 1. strip empty pgNumType
before = doc_xml.count("<w:pgNumType/>")
doc_xml = doc_xml.replace("<w:pgNumType/>", "")
print(f"removed empty pgNumType: {before}")

# 2. footerReference order in document.xml
ref_ids = re.findall(r'<w:footerReference[^>]*r:id="([^"]+)"', doc_xml)
print("footer refs in order:", ref_ids)
rels = data["word/_rels/document.xml.rels"].decode("utf-8")
id_to_target = dict(re.findall(r'<Relationship[^>]*Id="([^"]+)"[^>]*Target="([^"]+)"', rels))

fmt_for = {}
for i, rid in enumerate(ref_ids):
    tgt = id_to_target.get(rid, "")
    fname = "word/" + tgt.lstrip("/")
    fmt = "ROMAN" if i == 0 else "arabic"
    if fname not in fmt_for:
        fmt_for[fname] = fmt
print("footer format map:", fmt_for)

for fname, fmt in fmt_for.items():
    if fname not in data:
        print("WARN missing", fname); continue
    xml = data[fname].decode("utf-8")
    patched = re.sub(
        r"(<w:instrText[^>]*>)\s*PAGE\s*(</w:instrText>)",
        r"\1 PAGE \\* " + fmt + r" \\* MERGEFORMAT \2",
        xml,
    )
    changed = patched != xml
    data[fname] = patched.encode("utf-8")
    print(f"patched {fname} -> {fmt} (changed={changed})")

data["word/document.xml"] = doc_xml.encode("utf-8")

with zipfile.ZipFile(TMP, "w", zipfile.ZIP_DEFLATED) as z:
    for n in names:
        z.writestr(n, data[n])
shutil.move(TMP, DOCX)
print("post-processing done:", DOCX)
