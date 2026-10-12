"use client";
import { useEffect } from "react";
import { SITE } from "@/lib/site";
import { track } from "@/lib/analytics";

// Подключает Яндекс Метрику (если задан NEXT_PUBLIC_YM_ID) и отслеживает звонки и переходы в мессенджеры
export default function Analytics() {
  useEffect(() => {
    if (SITE.ymId && !(window as unknown as { ym?: unknown }).ym) {
      const w = window as unknown as { ym: { (...a: unknown[]): void; a?: unknown[]; l?: number } };
      w.ym =
        w.ym ||
        function (...args: unknown[]) {
          (w.ym.a = w.ym.a || []).push(args);
        };
      w.ym.l = Date.now();
      const s = document.createElement("script");
      s.async = true;
      s.src = "https://mc.yandex.ru/metrika/tag.js";
      document.head.appendChild(s);
      w.ym(Number(SITE.ymId), "init", { clickmap: true, trackLinks: true, accurateTrackBounce: true, webvisor: true });
    }

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest("a");
      if (!a) return;
      const href = a.getAttribute("href") || "";
      if (href.startsWith("tel:")) track("click_phone");
      else if (href.includes("wa.me")) track("click_whatsapp");
      else if (href.includes("t.me")) track("click_telegram");
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}
