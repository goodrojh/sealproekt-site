"use client";
// Отправка заявок в Битрикс24 (crm.lead.add).
// NEXT_PUBLIC_LEAD_ENDPOINT:
//  • адрес прокси (рекомендуется, вебхук скрыт на сервере) — см. proxy/cloudflare-worker.js;
//  • либо сам входящий вебхук вида https://<портал>.bitrix24.ru/rest/<user>/<key>/ — вебхук будет виден в коде страницы.

export type LeadPayload = {
  offer: string;
  source: string;
  objectType: string;
  area: number;
  start: string;
  tour: string;
  name: string;
  phone: string;
  contact: string;
  note: string;
  page: string;
};

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
const UTM_STORE = "seal_utm";

// Сохраняем UTM-метки с первого захода, чтобы передать их в лид даже после перехода по якорям
export function captureUtm() {
  try {
    const q = new URLSearchParams(window.location.search);
    const utm: Record<string, string> = {};
    UTM_KEYS.forEach((k) => {
      const v = q.get(k);
      if (v) utm[k] = v;
    });
    if (q.get("yclid")) utm.yclid = q.get("yclid") as string;
    if (Object.keys(utm).length) sessionStorage.setItem(UTM_STORE, JSON.stringify(utm));
  } catch {}
}

function getUtm(): Record<string, string> {
  try {
    return JSON.parse(sessionStorage.getItem(UTM_STORE) || "{}");
  } catch {
    return {};
  }
}

// Поля лида в формате Битрикс24 (коды пользовательских полей — из портала заказчика)
export function bitrixFields(p: LeadPayload) {
  const utm = getUtm();
  const fromYandexAds = /yandex|direct/i.test(utm.utm_source || "") || !!utm.yclid;
  const comments = [
    `Форма: ${p.source}`,
    `Предложение: ${p.offer}`,
    `Тип недвижимости: ${p.objectType}`,
    `Площадь: ${p.area} м²`,
    `Когда начать: ${p.start}`,
    `Экскурсия на объект: ${p.tour}`,
    `Удобный способ связи: ${p.contact}`,
    p.note && `Примечание: ${p.note}`,
    `Страница: ${p.page}`,
  ]
    .filter(Boolean)
    .join("\n");

  return {
    TITLE: `Заявка с сайта: ${p.offer}`,
    NAME: p.name || "Без имени",
    PHONE: [{ VALUE: p.phone, VALUE_TYPE: "WORK" }],
    SOURCE_ID: fromYandexAds ? "1" : "WEBFORM", // «Яндекс - директ: сайт ремонт» / «Веб-сайт»
    SOURCE_DESCRIPTION: `Лендинг «Ремонт квартир под ключ» — ${p.source}`,
    COMMENTS: comments.replace(/\n/g, "<br>"),
    UF_CRM_1776744278: p.area, // Площадь, м²
    UF_CRM_1745307554870: p.source, // Заявка с формы
    UF_CRM_FORMNAME: p.source, // formname
    UF_CRM_1787727805: "Лендинг ремонт квартир", // Канал для сайта
    UF_CRM_1779938102: utm.utm_campaign || "", // Рекламная кампания
    UTM_SOURCE: utm.utm_source || "",
    UTM_MEDIUM: utm.utm_medium || "",
    UTM_CAMPAIGN: utm.utm_campaign || "",
    UTM_CONTENT: utm.utm_content || "",
    UTM_TERM: utm.utm_term || "",
  };
}

// true — лид создан. Любая ошибка — исключение (форма покажет экран «Заявка не отправилась»).
export async function sendLead(endpoint: string, p: LeadPayload): Promise<void> {
  const fields = bitrixFields(p);
  const direct = /\/rest\/\d+\/[^/]+\/?$/.test(endpoint);
  const url = direct ? endpoint.replace(/\/?$/, "/") + "crm.lead.add.json" : endpoint;
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 12000);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fields, params: { REGISTER_SONET_EVENT: "Y" } }),
      signal: ctrl.signal,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data || data.error || !data.result) throw new Error(data?.error_description || String(res.status));
  } finally {
    clearTimeout(t);
  }
}
