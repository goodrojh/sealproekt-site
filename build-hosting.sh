#!/usr/bin/env bash
# Сборка для обычного хостинга на своём домене (sealproekt-remont.ru): сайт в корне домена.
# Результат — sealproekt-hosting.zip: распаковать в корневую папку сайта на хостинге (www/sealproekt-remont.ru).
set -e
MSYS_NO_PATHCONV=1 BASE_PATH="" npm run build
# _next переименовываем в assets: имя без «_» и не пересекается со старыми папками на хостинге
mv out/_next out/assets
find out -type f \( -name '*.html' -o -name '*.js' -o -name '*.css' -o -name '*.txt' -o -name '*.json' \) -exec sed -i 's#/_next/#/assets/#g' {} +
rm -f sealproekt-hosting.zip
python scripts/zip-out.py
