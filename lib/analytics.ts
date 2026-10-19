"use client";
// Яндекс Метрика: цели (JavaScript-события). Создайте в Метрике цели с такими идентификаторами:
//   lead_open        — открыта форма заявки (параметр source — откуда)
//   lead_submit      — заявка успешно отправлена
//   lead_error       — ошибка отправки заявки
//   lead_whatsapp    — заявка отправлена через WhatsApp (пока нет CRM)
//   click_phone      — нажатие на номер телефона
//   click_whatsapp   — переход в WhatsApp
//   click_telegram   — переход в Telegram
//   click_max        — переход в MAX
//   calc_change      — клиент пользовался калькулятором
//   case_open        — открыт кейс / галерея
//   review_play      — запущен видеоотзыв
import { SITE } from "@/lib/site";

type YM = (id: number, method: string, ...args: unknown[]) => void;

export function track(goal: string, params?: Record<string, unknown>) {
  try {
    const ym = (window as unknown as { ym?: YM }).ym;
    if (ym && SITE.ymId) ym(Number(SITE.ymId), "reachGoal", goal, params);
    if (process.env.NODE_ENV !== "production") console.info("[goal]", goal, params || "");
  } catch {}
}

const sent = new Set<string>();
// Цель один раз за сессию (например, использование калькулятора)
export function trackOnce(goal: string, params?: Record<string, unknown>) {
  if (sent.has(goal)) return;
  sent.add(goal);
  track(goal, params);
}
