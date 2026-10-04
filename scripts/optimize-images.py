"""Положите исходные фото (.jpg/.png) в public/img и запустите: python scripts/optimize-images.py
Скрипт создаст WebP 640/1024/1600/2000 px и обновит lib/images.json. Исходники можно удалить."""
from PIL import Image
import glob, json, os

os.chdir(os.path.join(os.path.dirname(__file__), "..", "public", "img"))
man = json.load(open("../../lib/images.json")) if os.path.exists("../../lib/images.json") else {}
for f in sorted(glob.glob("*.jpg") + glob.glob("*.jpeg") + glob.glob("*.png")):
    n = os.path.splitext(f)[0]
    im = Image.open(f).convert("RGB")
    ws = []
    for w in (640, 1024, 1600, 2000):
        if w > im.width:
            if not ws or im.width > ws[-1]:
                im.save(f"{n}-{im.width}.webp", quality=78, method=6)
                ws.append(im.width)
            break
        im.resize((w, round(im.height * w / im.width)), Image.LANCZOS).save(f"{n}-{w}.webp", quality=78, method=6)
        ws.append(w)
    man[n] = ws
    print(n, ws)
json.dump(man, open("../../lib/images.json", "w"), indent=0)
