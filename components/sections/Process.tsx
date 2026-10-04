"use client";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLead } from "@/components/lead/LeadModal";
import { asset } from "@/lib/site";

const STEPS = [
  { t: "Заявка и консультация", d: "Обсуждаем объект, задачу, сроки и формат работы — с дизайн-проектом, по готовому проекту или без него.", img: "/img/office.jpg" },
  { t: "Выезд ПМ и замер", d: "Проектный менеджер приезжает на объект и делает замер. По желанию — сразу экскурсия на наши объекты.", img: "/img/process.jpg" },
  { t: "Смета за 24 часа", d: "Готовим расчёт в течение 24 часов после замера. Ориентир по точности — ±10%.", img: "/img/design.jpg" },
  { t: "Презентация сметы", d: "Не отправляем файл «на почту», а разбираем смету вместе: что входит, из чего складывается цена, где можно сэкономить.", img: "/img/kitchen.jpg" },
  { t: "Экскурсия на объект", d: "Объект в работе или готовый объект: оцените качество вживую и поговорите с действующим ПМ. При необходимости — трансфер.", img: "/img/tour.jpg" },
  { t: "Договор и график", d: "Фиксируем объём, смету, сроки, обязательства и этапы поэтапной оплаты.", img: "/img/hall.jpg" },
  { t: "Дизайн-проект", d: "Если он нужен и разрабатывается у нас — дизайнер работает в связке с ПМ и сметчиком.", img: "/img/viz.jpg" },
  { t: "Ремонт под управлением ПМ", d: "Черновые и чистовые работы, электрика, сантехника, комплектация — под контролем одного ответственного.", img: "/img/process.jpg" },
  { t: "Чат, отчёты, контроль графика", d: "Регулярные фото- и видеоотчёты, рабочий чат и прозрачная фиксация этапов.", img: "/img/bath.jpg" },
  { t: "Сдача и гарантия", d: "Принимаем объект вместе с вами. Условия и сроки гарантии закреплены в договоре.", img: "/img/hero.jpg" },
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
        <div className="text-center mb-16 md:mb-20">
          <p className="text-[12px] uppercase tracking-[0.18em] font-semibold text-cognac mb-4">Как мы работаем</p>
          <h2 className="text-[34px] md:text-[48px] font-bold text-navy leading-[1.1] tracking-[-0.02em]">
            10 шагов от заявки
            <br /> до готового интерьера
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Липкая визуальная панель */}
          <div className="hidden lg:block">
            <div className="sticky top-28 h-[calc(100vh-160px)] max-h-[640px] rounded-[32px] overflow-hidden">
              <AnimatePresence mode="popLayout">
                <motion.img
                  key={STEPS[active].img + active}
                  src={asset(STEPS[active].img)}
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
                  <span className="text-[96px] font-extrabold leading-none text-white/95 tabular-nums">{String(active + 1).padStart(2, "0")}</span>
                  <span className="mb-4 text-[14px] text-white/70">из 10</span>
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
                <h3 className={"text-[22px] md:text-[26px] font-bold leading-tight transition-colors duration-500 " + (i === active ? "text-navy" : "text-navy/45")}>
                  {s.t}
                </h3>
                <p className={"mt-2 text-[15px] md:text-[16px] leading-relaxed transition-colors duration-500 " + (i === active ? "text-navy/70" : "text-navy/40")}>
                  {s.d}
                </p>
                <img src={asset(s.img)} alt="" className="lg:hidden mt-4 w-full h-44 object-cover rounded-2xl" loading="lazy" />
              </li>
            ))}
          </ol>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-14"
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
            className="w-full sm:w-auto rounded-full px-10 py-4 text-[14px] font-bold tracking-[0.08em] uppercase bg-cognac text-white shadow-xl shadow-cognac/25 hover:scale-105 transition-transform"
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
            className="w-full sm:w-auto rounded-full px-10 py-4 text-[14px] font-bold tracking-[0.08em] uppercase bg-white text-navy border border-navy/15 shadow-lg hover:scale-105 transition-transform"
          >
            Записаться на экскурсию
          </button>
        </motion.div>
      </div>
    </section>
  );
}
