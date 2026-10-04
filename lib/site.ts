// Единый источник контактов, цен и офферов. Пометка «подтвердить» — из брифа.
import IMAGES from "./images.json";

export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const asset = (p: string) => `${BASE_PATH}${p}`;

const SIZES_HALF = "(max-width: 768px) 100vw, 50vw";

// Адаптивное фото: WebP нескольких размеров, ленивая загрузка по умолчанию.
// Использование: <img {...img("/img/kitchen.jpg")} alt="" />
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
  // Контакты — из брендбука (бланк, визитка, письмо). Подтвердить.
  phone: "+7 (963) 191-31-40",
  phoneHref: "tel:+79631913140",
  whatsapp: "https://wa.me/79631913140",
  email: "mail@sealproekt.ru",
  address: "г. Красноярск, ул. Алексеева, 22",
  founded: 2012,
  objects: "700+", // подтвердить перед публикацией
  priceFrom: 20000,
  designPrices: [1900, 2700, 3500], // актуальную сетку подтвердить перед публикацией
  avgBudget: "от 2,7 млн ₽",
  // Куда отправлять заявки (Telegram-бот / CRM / вебхук). Пусто — заявка дублируется в WhatsApp.
  leadEndpoint: process.env.NEXT_PUBLIC_LEAD_ENDPOINT || "",
};

export type OfferId = "calc" | "measure" | "sink" | "design-gift" | "early5" | "tour" | "design" | "consult";

export const OFFERS: Record<OfferId, { label: string; cta: string; result: string }> = {
  calc: {
    label: "Предварительный расчёт стоимости ремонта",
    cta: "Рассчитать стоимость ремонта",
    result: "Предварительный расчёт стоимости. Следующий шаг — замер, после него смета в течение 24 часов.",
  },
  measure: {
    label: "Запись на замер",
    cta: "Записаться на замер",
    result: "Проектный менеджер согласует время замера. Смету вы получите в течение 24 часов после замера.",
  },
  sink: {
    label: "Раковина из керамогранита в подарок",
    cta: "Получить раковину из керамогранита в подарок",
    result: "Раковина из керамогранита в подарок. Условия и срок действия предложения менеджер подтвердит при звонке.",
  },
  "design-gift": {
    label: "Дизайн-проект в подарок",
    cta: "Получить дизайн-проект в подарок",
    result: "Дизайн-проект в подарок. Условия и срок действия предложения менеджер подтвердит при звонке.",
  },
  early5: {
    label: "Скидка 5% за раннее планирование",
    cta: "Получить скидку 5% за раннее планирование",
    result: "Скидка 5% за раннее планирование. Условия и срок действия предложения менеджер подтвердит при звонке.",
  },
  tour: {
    label: "Экскурсия на объект",
    cta: "Записаться на экскурсию",
    result: "Экскурсия на объект в работе или встреча на готовом объекте. При необходимости организуем трансфер.",
  },
  design: {
    label: "Дизайн-проект с реализацией",
    cta: "Обсудить дизайн-проект",
    result: "Консультация по дизайн-проекту: подберём состав услуги и подготовим расчёт реализации.",
  },
  consult: {
    label: "Консультация",
    cta: "Получить консультацию",
    result: "Ответим на вопросы по ремонту и согласуем следующий шаг — замер, экскурсию или расчёт.",
  },
};

export const PROMO_IDS: OfferId[] = ["sink", "design-gift", "early5"];

export const fmt = (n: number) => n.toLocaleString("ru-RU").replace(/\s/g, " ");
