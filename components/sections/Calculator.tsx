"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Info } from "lucide-react";
import { useLead } from "@/components/lead/LeadModal";
import { SITE, fmt } from "@/lib/site";

const DESIGN = [
  { id: 0, label: "Без дизайн-проекта", price: 0 },
  { id: 1, label: "Дизайн 1 900 ₽/м²", price: 1900 },
  { id: 2, label: "Дизайн 2 700 ₽/м²", price: 2700 },
  { id: 3, label: "Дизайн 3 500 ₽/м²", price: 3500 },
];
const TYPES = ["Новостройка", "Вторичное жильё", "Дом"];

// Без анимации на каждое значение: при перетаскивании ползунка это давало лишнюю нагрузку
function Counter({ value }: { value: number }) {
  return <span className="inline-block">{fmt(value)}</span>;
}

export default function Calculator() {
  const [area, setArea] = useState(72);
  const [design, setDesign] = useState(1);
  const [type, setType] = useState(TYPES[0]);
  const { open } = useLead();

  const repair = area * SITE.priceFrom;
  const designCost = area * DESIGN[design].price;
  const total = repair + designCost;

  return (
    <section id="calc" className="relative w-full px-5 md:px-8 py-24 md:py-32 gradient-brand overflow-hidden">
      <div className="absolute inset-0 pattern-grid-light" />
      <div className="absolute -right-60 -top-20 w-[700px] h-[700px] glow-cognac pointer-events-none" />
      <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-center">
        <div>
          <h2 className="t-section text-white">
            Посчитайте ориентир
            <br /> за 30 секунд
          </h2>
          <p className="mt-5 t-lead text-white/80 max-w-md">
            Ремонт квартир под ключ — от 20 000 ₽/м². Дизайн-проект — 1 900 / 2 700 / 3 500 ₽/м² в зависимости от состава. Средний бюджет проекта — {SITE.avgBudget}.
          </p>
          <div className="mt-8 flex items-start gap-3 rounded-2xl border border-white/15 bg-white/5 p-4 max-w-md">
            <Info className="h-5 w-5 text-cognac shrink-0 mt-0.5" />
            <p className="text-[14px] text-white/75 leading-[1.5]">
              Это нижняя граница по базовой ставке. Точную стоимость покажет смета: готовим её в течение 24 часов после замера, точность — ±10%.
            </p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-[32px] bg-white p-6 md:p-9 shadow-2xl shadow-ink/40"
        >
          <div className="flex flex-wrap gap-2 mb-7">
            {TYPES.map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={"rounded-full px-4 py-2 text-[14px] font-medium border transition-all " + (type === t ? "bg-navy text-white border-navy" : "border-navy/15 text-navy/70 hover:border-navy/40")}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="flex items-baseline justify-between mb-4">
            <span className="text-[16px] font-semibold text-navy">Площадь квартиры</span>
            <span className="text-[32px] font-bold text-navy leading-none">
              {area} <span className="text-[18px] font-semibold text-navy/50">м²</span>
            </span>
          </div>
          <input
            type="range"
            min={20}
            max={200}
            value={area}
            onChange={(e) => setArea(+e.target.value)}
            className="range-brand w-full"
            style={{ ["--p" as string]: ((area - 20) / 180) * 100 + "%" } as React.CSSProperties}
            aria-label="Площадь квартиры"
          />
          <div className="flex justify-between text-[12px] text-navy/50 mt-2">
            <span>20 м²</span>
            <span>200 м²</span>
          </div>

          <p className="mt-8 mb-3 text-[16px] font-semibold text-navy">Дизайн-проект</p>
          <div className="grid grid-cols-2 gap-2">
            {DESIGN.map((d) => (
              <button
                key={d.id}
                onClick={() => setDesign(d.id)}
                className={"rounded-2xl px-4 py-3 text-[14px] font-medium text-left border transition-all " + (design === d.id ? "border-cognac bg-cognac/10 text-navy" : "border-navy/10 text-navy/65 hover:border-navy/30")}
              >
                {d.label}
              </button>
            ))}
          </div>

          <div className="mt-8 rounded-[24px] bg-paper p-5 md:p-6">
            <div className="flex justify-between text-[14px] text-navy/65">
              <span>Ремонт под ключ</span>
              <span>от {fmt(repair)} ₽</span>
            </div>
            <div className="flex justify-between text-[14px] text-navy/65 mt-2">
              <span>Дизайн-проект</span>
              <span>{designCost ? fmt(designCost) + " ₽" : "—"}</span>
            </div>
            <div className="h-px bg-navy/10 my-4" />
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 sm:gap-4">
              <span className="text-[14px] font-semibold text-navy">Ориентир</span>
              <span className="text-[28px] md:text-[32px] font-bold text-navy leading-none tabular-nums whitespace-nowrap">
                от <Counter value={total} /> ₽
              </span>
            </div>
          </div>

          <button
            onClick={() =>
              open({
                offer: "calc",
                source: "Калькулятор",
                title: "Получите точную смету",
                subtitle: `Ориентир по калькулятору — от ${fmt(total)} ₽. Запишем на замер и подготовим смету за 24 часа.`,
                cta: "Получить смету",
                image: "/img/w87.jpg",
                preset: {
                  area,
                  objectType: type,
                  note: `Калькулятор: ${area} м², ${type}, ${DESIGN[design].label}, ориентир от ${fmt(total)} ₽`,
                },
              })
            }
            className="group mt-6 w-full flex items-center justify-between rounded-full bg-cognac text-white p-1.5 pl-7 hover:brightness-95 transition-all"
          >
            <span className="text-[16px] font-semibold">Получить точную смету</span>
            <span className="h-12 w-12 rounded-full bg-navy flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
              <ArrowRight className="h-5 w-5" />
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
