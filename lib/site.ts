// Единый источник контактов, цен и офферов. Пометка «подтвердить» — из брифа.
import IMAGES from "./images.json";

export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const asset = (p: string) => `${BASE_PATH}${p}`;

const SIZES_HALF = "(max-width: 768px) 100vw, 50vw";

// Адаптивное фото: WebP нескольких размеров, ленивая загрузка по умолчанию.
// Использование: <img {...img("/img/w89.jpg")} alt="" />
export function img(src: string, opts: { sizes?: string; eager?: boolean } = {}) {
  const name = src.replace(/^\/img\//, "").replace(/\.\w+$/, "");
  const widths = (IMAGES as Record<string, number[]>)[name];
  if (!widths) return { src: asset(src), loading: (opts.eager ? "eager" : "lazy") as "eager" | "lazy", decoding: "async" as const };
  const mid = widths.find((w) => w >= 1024) || widths[widths.length - 1];
  return {
    src: asset(`/img/${name}-${mid}.webp`),
    srcSet: widths.map((w) => `${asset(`/img/${name}-${w}.webp`)} ${w}w`).join(", "),
    sizes: opts.sizes || SIZES_HALF,
    loading: (opts.eager ? "eager" : "lazy") as "eager" | "lazy",
    decoding: "async" as const,
  };
}
// URL одного размера (для фонов и poster у видео)
export const imgUrl = (src: string, w = 1600) => {
  const name = src.replace(/^\/img\//, "").replace(/\.\w+$/, "");
  const widths = (IMAGES as Record<string, number[]>)[name] || [w];
  const pick = widths.find((x) => x >= w) || widths[widths.length - 1];
  return asset(`/img/${name}-${pick}.webp`);
};

export const SITE = {
  name: "СЕАЛ ПРОЕКТ",
  domain: "sealproekt-remont.ru",
  city: "Красноярск",
  // Телефон и WhatsApp — как на текущем сайте sealproekt-remont.ru (решение заказчика); адрес — по 2ГИС
  phone: "+7 (960) 772-15-70",
  phoneHref: "tel:+79607721570",
  whatsapp: "https://wa.me/79607721570",
  telegram: "https://t.me/sealproekt",
  email: "mail@sealproekt.ru",
  address: "г. Красноярск, ул. Октябрьская, 10, офис 206 (цокольный этаж)",
  founded: 2012,
  objects: "700+", // как в брифе (решение заказчика)
  priceFrom: 20000,
  designPrices: [1900, 2700, 3500], // актуальную сетку подтвердить перед публикацией
  // Отзывы
  rating2gis: { value: "5,0", votes: 35, reviews: 23, url: "https://2gis.ru/krasnoyarsk/firm/70000001057373113/tab/reviews" },
  yandexReviews: "https://yandex.ru/profile/59028179655?intent=reviews",
  // Куда отправлять заявки: вебхук/прокси Битрикс24 (POST JSON). Пока пусто — заявка уходит через WhatsApp.
  leadEndpoint: process.env.NEXT_PUBLIC_LEAD_ENDPOINT || "",
  // Яндекс Метрика: номер счётчика
  ymId: process.env.NEXT_PUBLIC_YM_ID || "",
};

// Единственное целевое действие лендинга (правка маркетолога, п. 4)
export const CTA_MAIN = "Получить расчёт стоимости ремонта";

// calc — основной оффер; sink / design-gift / early5 — только для рекламных связок через ?offer=
export type OfferId = "calc" | "sink" | "design-gift" | "early5";

export const OFFERS: Record<OfferId, { label: string; cta: string; result: string }> = {
  calc: {
    label: "Расчёт стоимости ремонта",
    cta: CTA_MAIN,
    result: "Предварительный расчёт стоимости. Затем — замер и смета в течение 24 часов после него.",
  },
  sink: {
    label: "Раковина из керамогранита в подарок",
    cta: "Получить расчёт и раковину в подарок",
    result: "Расчёт стоимости ремонта и раковина из керамогранита в подарок. Условия и срок действия предложения менеджер подтвердит при звонке.",
  },
  "design-gift": {
    label: "Дизайн-проект в подарок",
    cta: "Получить расчёт и дизайн-проект в подарок",
    result: "Расчёт стоимости ремонта и дизайн-проект в подарок. Условия и срок действия предложения менеджер подтвердит при звонке.",
  },
  early5: {
    label: "Скидка 5% за раннее планирование",
    cta: "Получить расчёт со скидкой 5%",
    result: "Расчёт стоимости ремонта со скидкой 5% за раннее планирование. Условия и срок действия менеджер подтвердит при звонке.",
  },
};

export const PROMO_IDS: OfferId[] = ["sink", "design-gift", "early5"];

export const fmt = (n: number) => n.toLocaleString("ru-RU").replace(/\s/g, " ");

// Реквизиты оператора персональных данных — для документов и подвала.
// ОГРН — с сайта sealproekt.ru. ИНН и юридический адрес — запросить у заказчика (пустые поля не выводятся).
export const LEGAL = {
  company: "ООО «СЕАЛ ПРОЕКТ»",
  ogrn: "1132468054960",
  inn: "",
  legalAddress: "",
  officeAddress: "г. Красноярск, ул. Октябрьская, 10, офис 206",
  email: "mail@sealproekt.ru",
  policyDate: "15 октября 2026 г.",
};
