#!/usr/bin/env bash
# Сборка для обычного хостинга на своём домене (sealproekt-remont.ru): сайт в корне домена.
# Результат — sealproekt-hosting.zip: распаковать в корневую папку сайта на хостинге (www/sealproekt-remont.ru).
set -e
MSYS_NO_PATHCONV=1 BASE_PATH="" npm run build
# Хостинг рег.ру отвечает 403 на папки, начинающиеся с «_» — переименовываем _next в next и правим ссылки
mv out/_next out/next
find out -type f \( -name '*.html' -o -name '*.js' -o -name '*.css' -o -name '*.txt' -o -name '*.json' \) -exec sed -i 's#/_next/#/next/#g' {} +
rm -f sealproekt-hosting.zip
powershell -NoProfile -Command "Compress-Archive -Path out\* -DestinationPath sealproekt-hosting.zip -Force" 2>/dev/null || (cd out && zip -qr ../sealproekt-hosting.zip .)
echo "Готово: sealproekt-hosting.zip"
