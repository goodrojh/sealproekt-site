"use client";
import React from "react";
import { SITE, asset } from "@/lib/site";

// Оригинальные значки мессенджеров (файлы с официальных сайтов: whatsapp.com, telegram.org, max.ru)
export const MESSENGERS = [
  { id: "whatsapp", label: "WhatsApp", href: SITE.whatsapp, icon: "/brand/whatsapp.svg" },
  { id: "telegram", label: "Telegram", href: SITE.telegram, icon: "/brand/telegram.svg" },
  { id: "max", label: "MAX", href: SITE.max, icon: "/brand/max.png" },
];

// Ряд кнопок мессенджеров (для форм и подвала)
export function MessengerLinks({ dark = false, size = 44 }: { dark?: boolean; size?: number }) {
  return (
    <div className="flex flex-wrap gap-2">
      {MESSENGERS.map((m) => (
        <a
          key={m.id}
          href={m.href}
          target="_blank"
          rel="noopener noreferrer"
          className={
            "inline-flex items-center gap-2.5 rounded-full pl-1.5 pr-4 py-1.5 text-[14px] font-semibold transition-colors " +
            (dark ? "bg-white/10 border border-white/20 text-white hover:bg-white/20" : "bg-white border border-navy/10 text-navy hover:border-navy/30")
          }
        >
          <span className="rounded-full bg-white flex items-center justify-center shrink-0" style={{ width: size - 12, height: size - 12 }}>
            <img src={asset(m.icon)} alt="" width={size - 18} height={size - 18} style={{ width: size - 18, height: size - 18 }} className={m.id === "max" ? "rounded-[8px]" : ""} />
          </span>
          {m.label}
        </a>
      ))}
    </div>
  );
}

// Плавающая панель справа — мессенджеры всегда под рукой
export default function FloatingMessengers() {
  return (
    <nav aria-label="Написать нам в мессенджер" className="hidden md:flex fixed right-5 bottom-6 z-[45] flex-col gap-2.5">
      {MESSENGERS.map((m) => (
        <a
          key={m.id}
          href={m.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Написать в ${m.label}`}
          className="group relative h-14 w-14 rounded-full bg-white shadow-lg shadow-ink/20 border border-navy/5 flex items-center justify-center hover:scale-110 transition-transform"
        >
          <img src={asset(m.icon)} alt="" width={36} height={36} className={"h-9 w-9 " + (m.id === "max" ? "rounded-[9px]" : "")} />
          <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full bg-navy text-white text-[13px] font-semibold px-3 py-1.5 opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
            {m.label}
          </span>
        </a>
      ))}
    </nav>
  );
}
