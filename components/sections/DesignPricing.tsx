"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { useLead } from "@/components/lead/LeadModal";
import { img } from "@/lib/site";

// Бриф: «1 900 / 2 700 / 3 500 ₽ за м² в зависимости от состава услуги; актуальную сетку подтвердить перед публикацией».
// Состав каждого тарифа заказчик пока не прислал — добавить в DETAILS, когда будет.
const PRICES = ["1 900", "2 700", "3 500"];

const INCLUDED = [
  "Разработка дизайн-проекта внутри компании",
  "Реализация силами СЕАЛ ПРОЕКТ — одна команда от проекта до ремонта",
  "Связка «визуализация → реализация»",
  "Смета и управление ремонтом через персонального ПМ",
];

export default function DesignPricing() {
  const { open } = useLead();
  const ask = (price: string) =>
    open({
      offer: "design",
      source: `Дизайн-проект ${price} ₽/м²`,
      title: `Дизайн-проект ${price} ₽/м²`,
      subtitle: "Расскажем, что входит в услугу, и подберём состав под ваш объект.",
      cta: "Узнать состав и стоимость",
      image: "/img/design.jpg",
      preset: { note: `Интересует дизайн-проект ${price} ₽/м²` },
    });

  return (
    <section id="design" className="w-full py-24 md:py-32 bg-paper overflow-hidden relative">
      <div className="max-w-6xl mx-auto px-5 md:px-8 relative z-10">
        <SectionHeader title="Дизайн-проект с последующей реализацией" lead="Стоимость за м² — в зависимости от состава услуги." />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="mx-5 md:mx-8 xl:mx-auto max-w-[1088px] relative rounded-[28px] overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <img {...img("/img/w87.jpg", { sizes: "100vw" })} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-navy/40" />
        </div>

        <div className="relative z-10 m-3 md:m-8 grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
          <div className="rounded-[20px] bg-white p-3 md:p-4 flex flex-col">
            {PRICES.map((p, i) => (
              <motion.button
                key={p}
                type="button"
                onClick={() => ask(p)}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.1 + i * 0.08 }}
                className={"group flex-1 flex items-center justify-between gap-4 rounded-[16px] px-4 md:px-6 py-5 md:py-6 text-left hover:bg-paper transition-colors " + (i ? "border-t border-navy/10" : "")}
              >
                <span className="flex items-baseline gap-3 whitespace-nowrap">
                  <span className="text-[36px] md:text-[44px] font-extrabold text-navy leading-none">{p}</span>
                  <span className="text-[16px] font-semibold text-navy/60">₽/м²</span>
                </span>
                <span className="inline-flex items-center gap-2 text-[14px] font-semibold text-cognac whitespace-nowrap">
                  <span className="hidden sm:inline">Узнать состав</span>
                  <span className="h-10 w-10 rounded-full bg-cognac/10 flex items-center justify-center group-hover:bg-cognac group-hover:text-white transition-colors">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </span>
              </motion.button>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="rounded-[20px] bg-navy text-white p-6 md:p-8 flex flex-col"
          >
            <h3 className="t-h3">В любом варианте</h3>
            <ul className="mt-5 flex flex-col gap-3.5">
              {INCLUDED.map((f) => (
                <li key={f} className="flex items-start gap-3 text-[16px] leading-[1.5] text-white/90">
                  <span className="mt-0.5 h-5 w-5 rounded-md bg-cognac flex items-center justify-center shrink-0">
                    <Check className="h-3 w-3 text-white stroke-[3]" />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <button
              onClick={() => ask("от 1 900")}
              className="mt-8 w-full flex items-center justify-between rounded-full bg-cognac text-white p-1.5 pl-6 hover:brightness-105 transition"
            >
              <span className="text-[16px] font-semibold">Обсудить дизайн-проект</span>
              <span className="h-11 w-11 rounded-full bg-white/20 flex items-center justify-center">
                <ArrowRight className="h-5 w-5" />
              </span>
            </button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
