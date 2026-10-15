"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";

// 4 основных этапа (правка маркетолога, п. 8); полный список из брифа — в раскрывающемся блоке
const MAIN = [
  { t: "Заявка и консультация", d: "Обсуждаем объект, задачу и формат работы. По желанию — экскурсия на наш объект." },
  { t: "Замер и смета", d: "Приезжаем на замер, готовим смету и разбираем её вместе с вами." },
  { t: "Договор и график", d: "Фиксируем объём, смету, сроки, обязательства и этапы оплаты. Если нужен — разрабатываем дизайн-проект." },
  { t: "Ремонт и сдача объекта", d: "Работы идут по согласованному графику с регулярными отчётами. Сдача объекта и гарантийное сопровождение." },
];

const ALL = [
  "Заявка и первичная консультация",
  "Выезд ПМ и замер объекта и/или экскурсия на наши объекты",
  "Подготовка сметы в течение 24 часов",
  "Презентация и разбор сметы с клиентом",
  "Экскурсия на объект в работе или встреча на готовом объекте; при необходимости — трансфер",
  "Договор, согласование графика и этапов оплаты",
  "Дизайн-проект, если он нужен и разрабатывается у нас",
  "Ремонтные работы под управлением ПМ",
  "Чат, отчёты, контроль графика и коммуникация по объекту",
  "Сдача объекта и гарантийное сопровождение",
];

export default function Process() {
  const [more, setMore] = useState(false);
  return (
    <section id="process" className="w-full px-5 md:px-8 py-24 md:py-32 bg-paper">
      <div className="max-w-6xl mx-auto">
        <SectionHeader title="Как проходит ремонт" lead="Четыре шага от заявки до готового интерьера — на каждом вы знаете, что происходит и что будет дальше." />

        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {MAIN.map((s, i) => (
            <motion.li
              key={s.t}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative rounded-[28px] bg-white border border-navy/10 p-6 md:p-7"
            >
              <span className="text-[48px] font-extrabold leading-none text-cognac">0{i + 1}</span>
              <h3 className="mt-4 t-h4 font-semibold text-navy">{s.t}</h3>
              <p className="mt-2 text-[16px] text-navy/65 leading-[1.55]">{s.d}</p>
            </motion.li>
          ))}
        </ol>

        <div className="mt-8 rounded-[24px] bg-white border border-navy/10">
          <button onClick={() => setMore((v) => !v)} aria-expanded={more} className="w-full flex items-center justify-between gap-4 px-6 md:px-8 py-5 text-left">
            <span className="text-[16px] font-semibold text-navy">Подробнее: все 10 этапов работы</span>
            <ChevronDown className={"h-5 w-5 text-navy transition-transform " + (more ? "rotate-180" : "")} />
          </button>
          <AnimatePresence initial={false}>
            {more && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3 px-6 md:px-8 pb-7">
                  {ALL.map((t, i) => (
                    <li key={t} className="flex gap-3 text-[16px] text-navy/75 leading-[1.5]">
                      <span className="h-7 w-7 shrink-0 rounded-full bg-navy text-white text-[12px] font-bold flex items-center justify-center">{i + 1}</span>
                      {t}
                    </li>
                  ))}
                </ol>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
