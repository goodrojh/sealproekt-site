# СЕАЛ ПРОЕКТ — лендинг «Ремонт квартир под ключ в Красноярске»

Next.js 15 (static export) + Tailwind 4 + framer-motion. 7 блоков: оффер → примеры с ценами → калькулятор →
преимущества → экскурсия и отзывы → этапы → финальная форма.

## Запуск и деплой
```
npm install
npm run dev        # локально
npm run deploy     # сборка и публикация на GitHub Pages (ветка gh-pages)
```

## Заявки → Битрикс24
Адрес задаётся в `.env.local` (не попадает в репозиторий): `NEXT_PUBLIC_LEAD_ENDPOINT=...`, затем `npm run deploy`.
- Входящий вебхук (`https://<портал>.bitrix24.ru/rest/<user>/<key>/`) — лид создаётся напрямую методом `crm.lead.add`.
  Вебхук при этом виден в коде страницы — после тестов перевыпустить и перейти на прокси.
- Прокси `proxy/cloudflare-worker.js` — вебхук хранится в секрете воркера, в `.env.local` указывается адрес воркера.
- Поля лида: TITLE, NAME, PHONE, SOURCE_ID (WEBFORM / «Яндекс - директ: сайт ремонт» при utm_source=yandex или yclid),
  «Площадь, м²», «Заявка с формы», «Канал для сайта», «Рекламная кампания», UTM, всё остальное — в комментарии (`lib/leads.ts`).
- «Заявка принята» — только если Битрикс вернул ID лида; иначе экран «Заявка не отправилась» с телефоном и WhatsApp.

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
