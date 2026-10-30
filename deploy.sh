#!/usr/bin/env bash
# Сборка и публикация на GitHub Pages (ветка gh-pages).
#   npm run deploy         — адрес goodrojh.github.io/<repo>/
#   npm run deploy:domain  — свой домен (DOMAIN=sealproekt-remont.ru): сайт в корне, файл CNAME для GitHub Pages
set -e
REPO_NAME=$(basename -s .git "$(git config --get remote.origin.url)")
if [ -n "$DOMAIN" ]; then BASE_PATH=""; else BASE_PATH="/$REPO_NAME"; fi
MSYS_NO_PATHCONV=1 BASE_PATH="$BASE_PATH" npm run build
touch out/.nojekyll
if [ -n "$DOMAIN" ]; then echo "$DOMAIN" > out/CNAME; fi
cd out
rm -rf .git
git init -q -b gh-pages
git add -A
git commit -q -m "deploy $(date +%F_%T)"
git push -f "$(cd .. && git config --get remote.origin.url)" gh-pages
rm -rf .git
