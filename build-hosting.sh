#!/usr/bin/env bash
# Сборка для обычного хостинга на своём домене (sealproekt-remont.ru): сайт в корне домена.
# Результат — sealproekt-hosting.zip: распаковать в корневую папку сайта на хостинге (public_html / www).
set -e
MSYS_NO_PATHCONV=1 BASE_PATH="" npm run build
rm -f sealproekt-hosting.zip
powershell -NoProfile -Command "Compress-Archive -Path out\* -DestinationPath sealproekt-hosting.zip -Force" 2>/dev/null || (cd out && zip -qr ../sealproekt-hosting.zip .)
echo "Готово: sealproekt-hosting.zip"
