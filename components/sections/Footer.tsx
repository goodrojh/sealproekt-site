"use client";
import React from "react";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { MessengerLinks } from "@/components/Messengers";
import { useLead } from "@/components/lead/LeadModal";
import Logo from "@/components/Logo";
import { CTA_MAIN, LEGAL, SITE, asset, imgUrl } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();
  const { open } = useLead();
  const legal = [LEGAL.company, LEGAL.inn && `ИНН ${LEGAL.inn}`, LEGAL.ogrn && `ОГРН ${LEGAL.ogrn}`, LEGAL.legalAddress].filter(Boolean).join(" · ");

  return (
    <section id="contacts" className="w-full bg-white pb-20 md:pb-0">
      <div className="m-2 rounded-[24px] overflow-hidden relative">
        <div className="absolute inset-0" style={{ backgroundImage: `url('${imgUrl("/img/cd00.jpg", 1280)}')`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="absolute inset-0 bg-ink/85" />

        {/* Короткий призыв — открывает форму расчёта во всплывающем окне */}
        <div className="relative max-w-6xl mx-auto px-5 md:px-8 pt-20 md:pt-28 pb-16 flex flex-col items-center text-center">
          <h2 className="t-h1 text-white max-w-3xl">Ремонт — наша работа. Не ваша.</h2>
          <p className="mt-5 t-lead text-white/80 max-w-xl">Узнайте, сколько будет стоить ремонт вашей квартиры.</p>
          <button
            onClick={() => open({ source: "Финальный призыв", image: "/img/cd00.jpg" })}
            className="group mt-8 inline-flex w-full sm:w-auto items-center justify-between gap-4 rounded-full bg-cognac text-white p-1.5 pl-7 text-[16px] font-semibold hover:brightness-105 transition"
          >
            <span className="text-left">{CTA_MAIN}</span>
            <span className="h-12 w-12 shrink-0 rounded-full bg-white/20 flex items-center justify-center">
              <ArrowRight className="h-5 w-5" />
            </span>
          </button>
        </div>

        <div className="relative max-w-6xl mx-auto px-5 md:px-8 pb-8">
          <div className="rounded-[24px] border border-white/15 bg-white/5 p-6 md:p-8 grid grid-cols-1 md:grid-cols-[1fr_1.4fr_1fr] gap-8">
            <div>
              <Logo color="white" variant="full" width={160} />
              <p className="mt-4 text-white/65 text-[14px] max-w-[280px]">Ремонт квартир под ключ в Красноярске с 2012 года.</p>
            </div>
            <ul className="flex flex-col gap-3 text-[14px]">
              <li>
                <a href={SITE.phoneHref} className="flex items-center gap-2 text-white font-semibold hover:text-cognac">
                  <Phone className="h-4 w-4 text-cognac" /> {SITE.phone}
                </a>
              </li>
              <li>
                <MessengerLinks dark size={40} />
              </li>
              <li>
                <a href={SITE.telegramChannel} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/75 hover:text-white">
                  <img src={asset("/brand/telegram.svg")} alt="" width={16} height={16} className="h-4 w-4" /> Наш канал в Telegram — подписаться
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
              <li>
                <a href={asset("/privacy/")} className="text-white/75 hover:text-white underline-offset-4 hover:underline">
                  Политика обработки персональных данных
                </a>
              </li>
              <li>
                <a href={asset("/consent/")} className="text-white/75 hover:text-white underline-offset-4 hover:underline">
                  Согласие на обработку персональных данных
                </a>
              </li>
              <li>
                <a href={asset("/privacy/#cookies")} className="text-white/75 hover:text-white underline-offset-4 hover:underline">
                  Использование файлов cookie
                </a>
              </li>
            </ul>
          </div>
          <div className="mt-6 flex flex-col gap-2 text-[12px] text-white/55 leading-[1.5]">
            <p>
              © 2012–{year} {legal}
            </p>
            <p>Информация о ценах на сайте носит справочный характер и не является публичной офертой (ст. 437 ГК РФ). Точная стоимость определяется сметой.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
