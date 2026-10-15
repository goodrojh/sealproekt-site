"use client";
import { useEffect, useState } from "react";
import { SITE, asset } from "@/lib/site";
import { track } from "@/lib/analytics";

const KEY = "seal_cookie_consent"; // "all" | "necessary"

function loadMetrika() {
  if (!SITE.ymId || (window as unknown as { ym?: unknown }).ym) return;
  const w = window as unknown as { ym: { (...a: unknown[]): void; a?: unknown[]; l?: number } };
  w.ym = function (...args: unknown[]) {
    (w.ym.a = w.ym.a || []).push(args);
  };
  w.ym.l = Date.now();
  const s = document.createElement("script");
  s.async = true;
  s.src = "https://mc.yandex.ru/metrika/tag.js";
  document.head.appendChild(s);
  w.ym(Number(SITE.ymId), "init", { clickmap: true, trackLinks: true, accurateTrackBounce: true, webvisor: true });
}

// Уведомление о cookie + Яндекс Метрика только после согласия; цели на звонки и мессенджеры
export default function Analytics() {
  const [ask, setAsk] = useState(false);

  useEffect(() => {
    let v: string | null = null;
    try {
      v = localStorage.getItem(KEY);
    } catch {}
    if (v === "all") loadMetrika();
    else if (!v) setAsk(true);

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

  const choose = (v: "all" | "necessary") => {
    try {
      localStorage.setItem(KEY, v);
    } catch {}
    if (v === "all") loadMetrika();
    setAsk(false);
  };

  if (!ask) return null;
  return (
    <div role="dialog" aria-label="Использование файлов cookie" className="fixed z-[90] left-3 right-3 bottom-[84px] md:bottom-5 md:left-5 md:right-auto md:max-w-[440px] rounded-[18px] bg-white border border-navy/10 shadow-2xl shadow-ink/20 p-4">
      <p className="text-[13px] text-navy/80 leading-[1.45]">
        Используем cookie и Яндекс Метрику для работы сайта и анализа посещаемости.{" "}
        <a href={asset("/privacy/#cookies")} className="underline text-navy">
          Подробнее
        </a>
      </p>
      <div className="mt-3 flex gap-2">
        <button onClick={() => choose("all")} className="flex-1 whitespace-nowrap rounded-full bg-navy text-white text-[14px] font-semibold py-2.5 px-3 hover:bg-ink">
          Принять
        </button>
        <button onClick={() => choose("necessary")} className="flex-1 whitespace-nowrap rounded-full border border-navy/15 text-navy text-[14px] font-semibold py-2.5 px-3 hover:bg-paper">
          Только необходимые
        </button>
      </div>
    </div>
  );
}
