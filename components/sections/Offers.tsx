"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Gift, Percent, PencilRuler } from "lucide-react";
import { useLead } from "@/components/lead/LeadModal";
import { OFFERS, OfferId, img } from "@/lib/site";

const ITEMS: { id: OfferId; icon: typeof Gift; title: string; text: string; img: string; cta: string }[] = [
  {
    id: "sink",
    icon: Gift,
    title: "Раковина из керамогранита в подарок",
    text: "Условия и срок действия уточнит менеджер.",
    img: "/img/bath.jpg",
    cta: OFFERS.sink.cta,
  },
  {
    id: "design-gift",
    icon: PencilRuler,
    title: "Дизайн-проект в подарок",
    text: "Разработаем дизайн-проект и реализуем его своей командой.",
    img: "/img/design.jpg",
    cta: OFFERS["design-gift"].cta,
  },
  {
    id: "early5",
    icon: Percent,
    title: "Скидка 5% за раннее планирование",
    text: "Для тех, кто планирует ремонт заранее.",
    img: "/img/bedroom.jpg",
    cta: OFFERS.early5.cta,
  },
];

export default function Offers() {
  const { open } = useLead();
  return (
    <section id="offers" className="w-full px-5 md:px-8 py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="t-section text-navy">Выберите своё предложение</h2>
          <p className="mt-4 t-lead text-navy/65 max-w-xl mx-auto">
            Условия и реальные сроки действия предложения менеджер подтвердит при звонке.
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
              <img {...img(o.img, { sizes: "(max-width: 768px) 100vw, 33vw" })} alt="" className="absolute inset-0 w-full h-full object-cover md:group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent" />
              <div className="absolute top-6 left-6 h-12 w-12 rounded-2xl bg-ink/40 border border-white/25 flex items-center justify-center">
                <o.icon className="h-6 w-6 text-white" />
              </div>
              <div className="absolute top-6 right-6 h-12 w-12 rounded-full bg-cognac flex items-center justify-center group-hover:rotate-45 transition-transform">
                <ArrowUpRight className="h-5 w-5 text-white" />
              </div>
              <div className="relative">
                <h3 className="t-h3 text-white">{o.title}</h3>
                <p className="mt-2 text-[16px] text-white/85 leading-[1.5]">{o.text}</p>
                <span className="mt-5 inline-flex rounded-full bg-white text-navy px-5 py-3 text-[14px] font-semibold text-left group-hover:bg-cognac group-hover:text-white transition-colors">
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
