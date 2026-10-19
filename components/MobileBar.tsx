"use client";
import React from "react";
import { Phone } from "lucide-react";
import { useLead } from "@/components/lead/LeadModal";
import { MESSENGERS } from "@/components/Messengers";
import { SITE, asset } from "@/lib/site";

// Нижняя панель на телефоне: звонок, мессенджеры (оригинальные значки) и расчёт — всегда под рукой
export default function MobileBar() {
  const { open } = useLead();
  return (
    <div className="md:hidden fixed bottom-3 inset-x-3 z-40 flex items-center gap-1.5 rounded-full bg-navy p-1.5 shadow-2xl shadow-ink/40 border border-white/10">
      <a href={SITE.phoneHref} aria-label={`Позвонить ${SITE.phone}`} className="h-11 w-11 shrink-0 rounded-full bg-white/10 flex items-center justify-center text-white">
        <Phone className="h-5 w-5" />
      </a>
      {MESSENGERS.map((m) => (
        <a key={m.id} href={m.href} target="_blank" rel="noopener noreferrer" aria-label={`Написать в ${m.label}`} className="h-11 w-11 shrink-0 rounded-full bg-white flex items-center justify-center">
          <img src={asset(m.icon)} alt="" width={28} height={28} className={"h-7 w-7 " + (m.id === "max" ? "rounded-[7px]" : "")} />
        </a>
      ))}
      <button onClick={() => open({ source: "Мобильная панель" })} className="flex-1 h-11 rounded-full bg-cognac text-white text-[15px] font-semibold whitespace-nowrap px-3">
        Расчёт
      </button>
    </div>
  );
}
