"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Gift, Percent, PencilRuler } from "lucide-react";
import { useLead } from "@/components/lead/LeadModal";
import { OFFERS, OfferId, asset } from "@/lib/site";

const ITEMS: { id: OfferId; icon: typeof Gift; title: string; text: string; img: string; cta: string }[] = [
  {
    id: "sink",
    icon: Gift,
    title: "Раковина из керамогранита в подарок",
    text: "Монолитная раковина из керамогранита — в подарок к ремонту под ключ.",
    img: "/img/bath.jpg",
    cta: "Получить раковину в подарок",
  },
  {
    id: "design-gift",
    icon: PencilRuler,
    title: "Дизайн-проект в подарок",
    text: "Разработаем дизайн-проект и реализуем его своей командой.",
    img: "/img/design.jpg",
    cta: "Получить дизайн-проект в подарок",
  },
  {
    id: "early5",
    icon: Percent,
    title: "Скидка 5% за раннее планирование",
    text: "Планируете ремонт заранее — зафиксируем скидку 5%.",
    img: "/img/bedroom.jpg",
    cta: "Получить скидку 5%",
  },
];

export default function Offers() {
  const { open } = useLead();
  return (
    <section id="offers" className="w-full px-5 md:px-8 py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-[12px] uppercase tracking-[0.18em] font-semibold text-cognac mb-4">Предложения</p>
          <h2 className="text-[34px] md:text-[48px] font-bold text-navy leading-[1.08] tracking-[-0.02em]">Выберите своё предложение</h2>
          <p className="mt-4 text-[15px] md:text-[17px] text-navy/55 max-w-xl mx-auto">
            Одно предложение на один договор. Сроки действия и условия менеджер подтвердит при звонке — без искусственных таймеров.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {ITEMS.map((o, i) => (
            <motion.button
              key={o.id}
              type="button"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -6 }}
              onClick={() =>
                open({
                  offer: o.id,
                  source: `Акция «${o.title}»`,
                  title: o.cta,
                  subtitle: OFFERS[o.id].result,
                  cta: "Зафиксировать предложение",
                  image: o.img,
                })
              }
              className="group relative text-left rounded-[32px] overflow-hidden min-h-[440px] flex flex-col justify-end p-7"
            >
              <img src={asset(o.img)} alt="" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent" />
              <div className="absolute top-6 left-6 h-12 w-12 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center">
                <o.icon className="h-6 w-6 text-white" />
              </div>
              <div className="absolute top-6 right-6 h-12 w-12 rounded-full bg-cognac flex items-center justify-center group-hover:rotate-45 transition-transform">
                <ArrowUpRight className="h-5 w-5 text-white" />
              </div>
              <div className="relative">
                <h3 className="text-[24px] font-bold text-white leading-tight">{o.title}</h3>
                <p className="mt-2 text-[14px] text-white/75 leading-relaxed">{o.text}</p>
                <span className="mt-5 inline-flex rounded-full bg-white text-navy px-5 py-3 text-[14px] font-semibold group-hover:bg-cognac group-hover:text-white transition-colors">
                  {o.cta}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
