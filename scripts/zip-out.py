"""Упаковывает out/ в sealproekt-hosting.zip с правами Linux (папки 755, файлы 644).
Архив от Compress-Archive не хранит папки и права — на хостинге вложенные папки получались недоступными (403)."""
import os, zipfile, time
root = "out"
with zipfile.ZipFile("sealproekt-hosting.zip", "w", zipfile.ZIP_DEFLATED) as z:
    for d, dirs, files in os.walk(root):
        rel = os.path.relpath(d, root).replace(os.sep, "/")
        if rel != ".":
            zi = zipfile.ZipInfo(rel + "/", time.localtime()[:6])
            zi.create_system = 3
            zi.external_attr = (0o40755 << 16) | 0x10
            z.writestr(zi, "")
        for f in files:
            p = os.path.join(d, f)
            arc = os.path.relpath(p, root).replace(os.sep, "/")
            zi = zipfile.ZipInfo.from_file(p, arc)
            zi.create_system = 3
            zi.external_attr = 0o100644 << 16
            zi.compress_type = zipfile.ZIP_DEFLATED
            with open(p, "rb") as fh:
                z.writestr(zi, fh.read())
print("OK: sealproekt-hosting.zip")
