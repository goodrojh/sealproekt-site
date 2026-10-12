"use client";
import React from "react";
import { Check, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import Logo from "@/components/Logo";
import { LeadForm, useLead } from "@/components/lead/LeadModal";
import { CTA_MAIN, SITE, imgUrl } from "@/lib/site";

export default function Footer() {
  const { promo } = useLead();
  const year = new Date().getFullYear();

  return (
    <section id="contacts" className="w-full bg-white pb-20 md:pb-0">
      <div className="m-2 rounded-[24px] overflow-hidden relative">
        <div className="absolute inset-0" style={{ backgroundImage: `url('${imgUrl("/img/cd00.jpg", 1280)}')`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="absolute inset-0 bg-ink/85" />

        <div className="relative max-w-6xl mx-auto px-5 md:px-8 pt-20 md:pt-28 pb-12 grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-10 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-28">
            <h2 className="t-h1 text-white">
              {CTA_MAIN.replace("Получить", "Получите")}
            </h2>
            <p className="mt-5 t-lead text-white/80 max-w-md">Ремонт — наша работа, не ваша. Оставьте заявку: подготовим предварительный расчёт и согласуем замер.</p>
            <ul className="mt-8 flex flex-col gap-3">
              {["Смета — в течение 24 часов после замера", "Точность сметы ±10%", "Персональный проектный менеджер", "Экскурсия на объект — по желанию"].map((t) => (
                <li key={t} className="flex items-center gap-3 text-[16px] text-white/90">
                  <span className="h-6 w-6 rounded-full bg-cognac flex items-center justify-center shrink-0">
                    <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-col gap-3">
              <a href={SITE.phoneHref} className="inline-flex items-center gap-3 text-[24px] font-bold text-white hover:text-cognac transition-colors">
                <Phone className="h-6 w-6 text-cognac" /> {SITE.phone}
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

          <div className="rounded-[28px] bg-white p-6 md:p-9">
            <LeadForm inline config={{ source: "Финальный блок (форма на странице)", offer: promo || "calc", title: "Заявка на расчёт" }} />
          </div>
        </div>

        <div className="relative max-w-6xl mx-auto px-5 md:px-8 pb-8">
          <div className="rounded-[24px] border border-white/15 bg-white/5 p-6 md:p-8 flex flex-col md:flex-row justify-between gap-8">
            <div>
              <Logo color="white" variant="full" width={160} />
              <p className="mt-4 text-white/65 text-[14px] max-w-[280px]">Ремонт квартир под ключ в Красноярске с 2012 года. Более 700 реализованных объектов.</p>
            </div>
            <ul className="flex flex-col gap-3 text-[14px]">
              <li>
                <a href={SITE.phoneHref} className="flex items-center gap-2 text-white font-semibold hover:text-cognac">
                  <Phone className="h-4 w-4 text-cognac" /> {SITE.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 text-white/75 hover:text-white">
                  <Mail className="h-4 w-4 text-cognac" /> {SITE.email}
                </a>
              </li>
              <li className="flex items-start gap-2 text-white/75">
                <MapPin className="h-4 w-4 text-cognac mt-0.5 shrink-0" /> {SITE.address}
              </li>
            </ul>
            <ul className="flex flex-col gap-2 text-[14px]">
              {[
                ["Объекты и цены", "#cases"],
                ["Калькулятор", "#calc"],
                ["Преимущества", "#advantages"],
                ["Отзывы", "#reviews"],
                ["Этапы работы", "#process"],
              ].map(([l, h]) => (
                <li key={h}>
                  <a href={h} className="text-white/75 hover:text-white">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-6 text-[12px] text-white/55">© 2012–{year} ООО «СЕАЛ ПРОЕКТ» · {SITE.domain}</p>
        </div>
      </div>
    </section>
  );
}
