"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { useLead } from "@/components/lead/LeadModal";
import { img } from "@/lib/site";

// Бриф: «Работа с домами и коммерческими объектами». Цен и видов помещений в материалах нет —
// поэтому стоимость только индивидуально, без обещаний сверх брифа.
const POINTS = [
  "Персональный проектный менеджер — единая точка ответственности",
  "Смета в течение 24 часов после замера, ориентир по точности — ±10%",
  "Объём, смета, сроки и обязательства фиксируются в договоре",
  "Поэтапная оплата, привязанная к ходу работ",
];

export default function Commercial() {
  const { open } = useLead();
  return (
    <section id="commercial" className="w-full px-5 md:px-8 pb-24 md:pb-32 bg-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 rounded-[32px] overflow-hidden gradient-brand"
      >
        <div className="relative p-7 md:p-12 flex flex-col">
          <div className="absolute inset-0 pattern-grid-light pointer-events-none" />
          <h2 className="relative t-section text-white">Коммерческие помещения</h2>
          <p className="relative mt-4 t-lead text-white/80 max-w-[520px]">
            Кроме квартир, работаем с домами и коммерческими объектами — по той же системе управления ремонтом. Стоимость рассчитываем индивидуально после замера.
          </p>
          <ul className="relative mt-8 flex flex-col gap-3.5">
            {POINTS.map((p) => (
              <li key={p} className="flex items-start gap-3 text-[16px] leading-[1.5] text-white/90">
                <span className="mt-0.5 h-6 w-6 rounded-full bg-cognac flex items-center justify-center shrink-0">
                  <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                </span>
                {p}
              </li>
            ))}
          </ul>
          <button
            onClick={() =>
              open({
                offer: "commercial",
                source: "Блок «Коммерческие помещения»",
                title: "Расчёт коммерческого помещения",
                subtitle: "Расскажите об объекте — менеджер уточнит задачу и согласует замер. Стоимость рассчитываем индивидуально.",
                cta: "Отправить заявку",
                image: "/img/w22.jpg",
                preset: { objectType: "Коммерческий объект", area: 100, note: "Коммерческое помещение" },
              })
            }
            className="group relative mt-10 w-full sm:w-auto sm:self-start flex items-center justify-between gap-4 rounded-full bg-white text-navy p-1.5 pl-7 text-[16px] font-semibold hover:bg-cognac hover:text-white transition-colors"
          >
            <span className="text-left">
              <span className="sm:hidden">Получить расчёт</span>
              <span className="hidden sm:inline">Рассчитать коммерческое помещение</span>
            </span>
            <span className="h-12 w-12 shrink-0 rounded-full bg-navy text-white flex items-center justify-center group-hover:bg-white group-hover:text-cognac transition-colors">
              <ArrowRight className="h-5 w-5" />
            </span>
          </button>
        </div>
        <div className="relative min-h-[300px] lg:min-h-full order-first lg:order-none">
          <img {...img("/img/w22.jpg", { sizes: "(max-width: 1024px) 100vw, 576px" })} alt="Ресторан — реализованный коммерческий объект" className="absolute inset-0 w-full h-full object-cover" />
        </div>
      </motion.div>
    </section>
  );
}
