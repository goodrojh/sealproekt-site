#!/usr/bin/env bash
# Сборка и публикация на GitHub Pages (ветка gh-pages).
set -e
REPO_NAME=$(basename -s .git "$(git config --get remote.origin.url)")
BASE_PATH="/$REPO_NAME" npm run build
touch out/.nojekyll
cd out
rm -rf .git
git init -q -b gh-pages
git add -A
git commit -q -m "deploy $(date +%F_%T)"
git push -f "$(cd .. && git config --get remote.origin.url)" gh-pages
rm -rf .git
