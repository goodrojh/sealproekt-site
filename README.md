# СЕАЛ ПРОЕКТ — лендинг «Ремонт квартир под ключ в Красноярске»

Next.js 15 (static export) + Tailwind 4 + framer-motion. 7 блоков: оффер → примеры с ценами → калькулятор →
преимущества → экскурсия и отзывы → этапы → финальная форма.

## Запуск и деплой
```
npm install
npm run dev        # локально
npm run deploy     # сборка и публикация на GitHub Pages (ветка gh-pages)
```

## Заявки → Битрикс24 (ждём вебхук)
Форма шлёт POST JSON на `NEXT_PUBLIC_LEAD_ENDPOINT` (задать в `.env.local` перед сборкой).
Поля: offer, source, objectType, area, start, tour, name, phone, contact, note, page, createdAt.
- Пока адрес не задан — заявка честно отправляется через WhatsApp (клиент видит «Осталось нажать „Отправить“»).
- «Заявка принята» показывается только при ответе 2xx. При ошибке — экран с телефоном и WhatsApp.
- Вебхук Битрикс24 лучше не вызывать напрямую из браузера (его увидит любой посетитель): поставить небольшой
  прокси (Cloudflare Worker / Яндекс Cloud Function), который вызывает `crm.lead.add`.

## Яндекс Метрика
Задать `NEXT_PUBLIC_YM_ID` (номер счётчика). Цели — JavaScript-события (идентификаторы в `lib/analytics.ts`):
lead_open, lead_submit, lead_error, lead_whatsapp, click_phone, click_whatsapp, click_telegram, calc_change, case_open, review_play.

## Рекламные связки
`?offer=sink` | `?offer=design-gift` | `?offer=early5` — первый экран и все формы ведут на этот оффер.

## Контент
- `lib/site.ts` — контакты (сверены с 2ГИС), ставки, рейтинг 2ГИС.
- `lib/cases.ts` — примеры с ценами (данные с sealproekt-remont.ru). Бюджеты 99 м² и 68 м² подтвердить.
- `lib/works.ts` — 91 фото с Google Drive (галерея «Все фото наших работ»).
- Новые фото: положить .jpg в `public/img` и запустить `python scripts/optimize-images.py`.
