"use client";
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Info } from "lucide-react";
import { useLead } from "@/components/lead/LeadModal";
import { CTA_MAIN, SITE, fmt } from "@/lib/site";
import { CASES, mln, perM2 } from "@/lib/cases";
import { trackOnce } from "@/lib/analytics";

// Ставки из брифа: ремонт от 20 000 ₽/м², дизайн-проект 1 900 / 2 700 / 3 500 ₽/м².
// TODO заказчику: подтвердить, отличается ли ставка для новостроек и вторичного жилья и что в неё входит.
const DESIGN = [
  { id: 0, label: "Не нужен", price: 0 },
  { id: 1, label: "1 900 ₽/м²", price: 1900 },
  { id: 2, label: "2 700 ₽/м²", price: 2700 },
  { id: 3, label: "3 500 ₽/м²", price: 3500 },
];

// Из чего складывается стоимость (бриф: состав работ, решения и бюджет фиксируются в смете)
const INCLUDES = ["Черновые и чистовые работы", "Электрика и сантехника", "Комплектация материалами", "Управление проектом и контроль ПМ"];

export default function Calculator() {
  const [area, setArea] = useState(70);
  const [design, setDesign] = useState(0);
  const { open } = useLead();

  const repair = area * SITE.priceFrom;
  const designCost = area * DESIGN[design].price;
  const total = repair + designCost;

  // Диапазон по реальным объектам (бюджет / площадь)
  const real = useMemo(() => {
    const rates = CASES.map(perM2);
    return { min: Math.min(...rates), max: Math.max(...rates) };
  }, []);
  const nearest = useMemo(() => [...CASES].sort((a, b) => Math.abs(a.area - area) - Math.abs(b.area - area))[0], [area]);

  return (
    <section id="calc" className="relative w-full px-5 md:px-8 py-24 md:py-32 gradient-brand overflow-hidden">
      <div className="absolute inset-0 pattern-grid-light" />
      <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-start">
        <div className="lg:sticky lg:top-28">
          <h2 className="t-section text-white">Сколько стоит ремонт вашей квартиры</h2>
          <p className="mt-5 t-lead text-white/80 max-w-md">
            Ремонт под ключ — от 20 000 ₽/м². Итоговая цена зависит от состояния квартиры, материалов и состава работ.
          </p>
          <div className="mt-8 rounded-2xl border border-white/15 bg-white/5 p-5 max-w-md">
            <p className="text-[14px] font-semibold text-white mb-3">Из чего складывается стоимость</p>
            <ul className="flex flex-col gap-2">
              {INCLUDES.map((t) => (
                <li key={t} className="flex items-center gap-2 text-[14px] text-white/80">
                  <span className="h-1.5 w-1.5 rounded-full bg-cognac" />
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-4 flex items-start gap-2 text-[14px] text-white/65 leading-[1.5]">
              <Info className="h-4 w-4 shrink-0 mt-0.5 text-cognac" />
              Точный состав и стоимость фиксируем в смете: готовим её в течение 24 часов после замера, точность — ±10%.
            </p>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="rounded-[32px] bg-white p-6 md:p-9 shadow-2xl shadow-ink/40">
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
            onChange={(e) => {
              setArea(+e.target.value);
              trackOnce("calc_change");
            }}
            className="range-brand w-full"
            style={{ ["--p" as string]: ((area - 20) / 180) * 100 + "%" } as React.CSSProperties}
            aria-label="Площадь квартиры"
          />
          <div className="flex justify-between text-[12px] text-navy/50 mt-2">
            <span>20 м²</span>
            <span>200 м²</span>
          </div>

          <p className="mt-8 mb-3 text-[16px] font-semibold text-navy">Дизайн-проект</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {DESIGN.map((d) => (
              <button
                key={d.id}
                onClick={() => {
                  setDesign(d.id);
                  trackOnce("calc_change");
                }}
                className={"rounded-2xl px-3 py-3 text-[14px] font-medium border transition-colors " + (design === d.id ? "border-cognac bg-cognac/10 text-navy" : "border-navy/10 text-navy/65 hover:border-navy/30")}
              >
                {d.label}
              </button>
            ))}
          </div>

          <div className="mt-8 rounded-[24px] bg-paper p-5 md:p-6">
            <div className="flex justify-between text-[14px] text-navy/70">
              <span>Ремонт под ключ</span>
              <span>от {fmt(repair)} ₽</span>
            </div>
            <div className="flex justify-between text-[14px] text-navy/70 mt-2">
              <span>Дизайн-проект</span>
              <span>{designCost ? fmt(designCost) + " ₽" : "—"}</span>
            </div>
            <div className="h-px bg-navy/10 my-4" />
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
              <span className="text-[14px] font-semibold text-navy">Ориентир по базовой ставке</span>
              <span className="text-[28px] md:text-[32px] font-bold text-navy leading-none tabular-nums whitespace-nowrap">от {fmt(total)} ₽</span>
            </div>
          </div>

          <div className="mt-4 rounded-[20px] border border-navy/10 p-4 text-[14px] text-navy/75 leading-[1.5]">
            На наших объектах ремонт обходился в <b className="text-navy">≈&nbsp;{fmt(real.min)}–{fmt(real.max)}&nbsp;₽/м²</b>. Ближайший по площади пример: квартира {nearest.area}&nbsp;м² — <b className="text-navy">{mln(nearest.budget)}&nbsp;млн&nbsp;₽</b>.{" "}
            <a href="#cases" className="text-cognac font-semibold underline">
              Смотреть объекты
            </a>
          </div>

          <button
            onClick={() =>
              open({
                source: "Калькулятор",
                subtitle: `Ориентир по калькулятору — от ${fmt(total)} ₽. Запишем на замер и подготовим смету в течение 24 часов.`,
                image: nearest.cover,
                preset: { area, note: `Калькулятор: ${area} м², дизайн-проект: ${DESIGN[design].label}, ориентир от ${fmt(total)} ₽` },
              })
            }
            className="group mt-6 w-full flex items-center justify-between rounded-full bg-cognac text-white p-1.5 pl-7 hover:brightness-105 transition"
          >
            <span className="text-[16px] font-semibold text-left">{CTA_MAIN}</span>
            <span className="h-12 w-12 shrink-0 rounded-full bg-navy flex items-center justify-center">
              <ArrowRight className="h-5 w-5" />
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
