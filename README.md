# СЕАЛ ПРОЕКТ — сайт

Лендинг «Ремонт квартир под ключ в Красноярске». Next.js 15 (static export) + Tailwind 4 + framer-motion.

## Запуск
```
npm install
npm run dev
```

## Что поменять перед запуском
- `lib/site.ts` — контакты, цены, тексты офферов.
- `public/img/*` — сейчас AI-иллюстрации (Higgsfield / Nano Banana Pro). Заменить реальными фото объектов с диска заказчика, сохранив имена файлов.
- `components/sections/Cases.tsx` — кейсы-заглушки, заменить реальными.
- `components/sections/DesignPricing.tsx` — состав тарифов дизайн-проекта подтвердить у заказчика.
- Заявки: задать `NEXT_PUBLIC_LEAD_ENDPOINT` в `.env.local` перед сборкой — URL, принимающий POST JSON (Telegram-бот, CRM, вебхук). Пока её нет, клиент после отправки может продублировать заявку в WhatsApp.

## Деплой
`npm run deploy` — собирает сайт и публикует его в ветку `gh-pages` (GitHub Pages).
Для своего домена: собирать без `BASE_PATH` и добавить `public/CNAME`.
