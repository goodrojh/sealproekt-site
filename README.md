# СЕАЛ ПРОЕКТ — сайт

Лендинг «Ремонт квартир под ключ в Красноярске». Next.js 15 (static export) + Tailwind 4 + framer-motion.

## Запуск
```
npm install
npm run dev
```

## Что поменять перед запуском
- `lib/site.ts` — контакты, цены, тексты офферов.
- `public/img/*` — сейчас AI-иллюстрации (Higgsfield). Реальные фото: положить .jpg в `public/img` (с теми же именами, например `kitchen.jpg`) и запустить `python scripts/optimize-images.py` — скрипт сделает WebP нужных размеров.
- `components/sections/Cases.tsx` — кейсы-заглушки, заменить реальными.
- `components/sections/DesignPricing.tsx` — когда заказчик пришлёт состав тарифов 1 900 / 2 700 / 3 500 ₽/м², добавить его в карточки.
- Логотип: `public/brand/*` — вырезан из исходного файла `brand-src/logo.jpg`. Лучше заменить на векторный SVG от заказчика.
- Заявки: задать `NEXT_PUBLIC_LEAD_ENDPOINT` в `.env.local` перед сборкой — URL, принимающий POST JSON (Telegram-бот, CRM, вебхук). Пока её нет, клиент после отправки может продублировать заявку в WhatsApp.

## Деплой
`npm run deploy` — собирает сайт и публикует его в ветку `gh-pages` (GitHub Pages).
Для своего домена: собирать без `BASE_PATH` и добавить `public/CNAME`.
