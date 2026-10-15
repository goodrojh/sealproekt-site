"use client";
import React from "react";
import { MessageCircle, Phone, Send } from "lucide-react";
import { LeadForm, useLead } from "@/components/lead/LeadModal";
import { SITE, img } from "@/lib/site";

// Форма расчёта на странице — сразу после примеров ремонтов (правка заказчика, п. 2).
// Кнопка в конце сайта ведёт сюда же (#form).
export default function LeadSection() {
  const { promo } = useLead();
  return (
    <section id="form" className="relative w-full px-5 md:px-8 py-24 md:py-32 gradient-brand overflow-hidden">
      <div className="absolute inset-0 pattern-grid-light" />
      <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-start">
        <div className="lg:sticky lg:top-28">
          <h2 className="t-section text-white">Сколько будет стоить ремонт вашей квартиры</h2>
          <p className="mt-5 t-lead text-white/80 max-w-md">
            Укажите тип и площадь квартиры — менеджер подготовит предварительный расчёт и согласует удобное время замера.
          </p>
          <div className="mt-8 hidden lg:block relative h-[260px] max-w-md rounded-[24px] overflow-hidden">
            <img {...img("/img/ca21.jpg", { sizes: "448px" })} alt="Кухня-гостиная в квартире 167 м²" className="absolute inset-0 w-full h-full object-cover" />
          </div>
          <div className="mt-8 flex flex-col gap-3">
            <span className="text-[14px] text-white/65">Удобнее голосом или в мессенджере?</span>
            <a href={SITE.phoneHref} className="inline-flex items-center gap-3 text-[22px] font-bold text-white hover:text-cognac transition-colors w-fit">
              <Phone className="h-5 w-5 text-cognac" /> {SITE.phone}
            </a>
            <div className="flex gap-2">
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-2 text-[14px] font-semibold text-white hover:bg-white/10">
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
              <a href={SITE.telegram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-2 text-[14px] font-semibold text-white hover:bg-white/10">
                <Send className="h-4 w-4" /> Telegram
              </a>
            </div>
          </div>
        </div>

        <div className="rounded-[28px] bg-white p-6 md:p-9 shadow-2xl shadow-ink/40">
          <LeadForm inline config={{ source: "Форма расчёта на странице", offer: promo || "calc", title: "Заявка на расчёт" }} />
        </div>
      </div>
    </section>
  );
}
