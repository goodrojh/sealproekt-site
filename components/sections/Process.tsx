"use client";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";
import { useLead } from "@/components/lead/LeadModal";
import { img } from "@/lib/site";

const STEPS = [
  { t: "Заявка и первичная консультация", d: "Обсуждаем объект, задачу и формат работы: с дизайн-проектом, по готовому проекту или без него.", img: "/img/office.jpg" },
  { t: "Выезд ПМ и замер", d: "Проектный менеджер приезжает на замер объекта. Можно совместить с экскурсией на наши объекты.", img: "/img/process.jpg" },
  { t: "Смета в течение 24 часов", d: "Готовим смету в течение 24 часов после замера. Ориентир по точности — ±10%.", img: "/img/design.jpg" },
  { t: "Презентация и разбор сметы", d: "Смету не просто отправляем, а презентуем и объясняем: что входит в работы и из чего складывается стоимость.", img: "/img/kitchen.jpg" },
  { t: "Экскурсия на объект", d: "Объект в работе или встреча на готовом объекте. При необходимости организуем трансфер; на действующем объекте можно обсудить решения с ПМ.", img: "/img/tour.jpg" },
  { t: "Договор, график и этапы оплаты", d: "Фиксируем объём, смету, сроки и обязательства, согласуем график и этапы оплаты.", img: "/img/hall.jpg" },
  { t: "Дизайн-проект", d: "Если он нужен и разрабатывается у нас.", img: "/img/sketch.jpg" },
  { t: "Ремонтные работы под управлением ПМ", d: "Черновые и чистовые работы, электрика, сантехника, комплектация — под управлением проектного менеджера.", img: "/img/process.jpg" },
  { t: "Чат, отчёты, контроль графика", d: "Рабочий чат, регулярные отчёты, контроль графика и коммуникация по объекту.", img: "/img/bath.jpg" },
  { t: "Сдача объекта и гарантийное сопровождение", d: "Сдаём объект; условия и сроки гарантии закреплены в договоре.", img: "/img/hero.jpg" },
];

export default function Process() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);
  const { open } = useLead();

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="process" className="w-full px-5 md:px-8 py-24 md:py-32 bg-white relative">
      <div className="max-w-6xl mx-auto">
        <SectionHeader title="10 шагов от заявки до готового интерьера" lead="Понятный путь от первого замера до готового интерьера — на каждом этапе вы знаете, что происходит и что будет дальше." />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Липкая визуальная панель */}
          <div className="hidden lg:block">
            <div className="sticky top-28 h-[calc(100vh-160px)] max-h-[640px] rounded-[32px] overflow-hidden">
              <AnimatePresence mode="popLayout">
                <motion.img
                  key={STEPS[active].img + active}
                  {...img(STEPS[active].img)}
                  alt={STEPS[active].t}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7 }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
              <div className="absolute left-8 right-8 bottom-8">
                <div className="flex items-end gap-4">
                  <span className="text-[96px] font-extrabold leading-none text-white tabular-nums">{String(active + 1).padStart(2, "0")}</span>
                  <span className="mb-4 text-[16px] text-white/80">из 10</span>
                </div>
                <div className="mt-4 h-1 rounded-full bg-white/20 overflow-hidden">
                  <motion.div animate={{ width: ((active + 1) / STEPS.length) * 100 + "%" }} className="h-full bg-cognac" />
                </div>
              </div>
            </div>
          </div>

          {/* Список шагов */}
          <ol className="relative flex flex-col">
            <div className="absolute left-[19px] top-2 bottom-2 w-px bg-navy/10" />
            {STEPS.map((s, i) => (
              <li
                key={s.t}
                data-i={i}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                className="relative pl-16 py-6 lg:py-9"
              >
                <span
                  className={
                    "absolute left-0 top-6 lg:top-9 h-10 w-10 rounded-full flex items-center justify-center text-[13px] font-bold transition-all duration-500 " +
                    (i <= active ? "bg-cognac text-white shadow-lg shadow-cognac/30" : "bg-white border border-navy/15 text-navy/50")
                  }
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className={"t-h3 transition-colors duration-500 " + (i === active ? "text-navy" : "text-navy/45")}>
                  {s.t}
                </h3>
                <p className={"mt-2 text-[16px] leading-[1.6] transition-colors duration-500 " + (i === active ? "text-navy/75" : "text-navy/50")}>
                  {s.d}
                </p>
                <img {...img(s.img, { sizes: "100vw" })} alt="" className="lg:hidden mt-4 w-full h-44 object-cover rounded-2xl" />
              </li>
            ))}
          </ol>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-14 lg:pl-[calc(50%+2rem)]"
        >
          <button
            onClick={() =>
              open({
                offer: "measure",
                source: "Блок «Как мы работаем» — Начать с шага 1",
                title: "Начнём с шага 1",
                subtitle: "Оставьте заявку — менеджер проконсультирует и согласует время замера.",
                cta: "Записаться на замер",
                image: "/img/office.jpg",
              })
            }
            className="w-full sm:w-auto rounded-full px-10 py-4 text-[16px] font-semibold bg-cognac text-white shadow-lg shadow-cognac/25 hover:brightness-105 transition"
          >
            Записаться на замер
          </button>
          <button
            onClick={() =>
              open({
                offer: "tour",
                source: "Блок «Как мы работаем» — Экскурсия",
                title: "Экскурсия на объект",
                subtitle: "Покажем процесс изнутри и дадим обсудить решения с проектным менеджером.",
                cta: "Записаться на экскурсию",
                image: "/img/tour.jpg",
              })
            }
            className="w-full sm:w-auto rounded-full px-10 py-4 text-[16px] font-semibold bg-white text-navy border border-navy/15 hover:bg-navy hover:text-white transition-colors"
          >
            Записаться на экскурсию
          </button>
        </motion.div>
      </div>
    </section>
  );
}
