"use client";
import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Calculator, CalendarClock, UserRoundCheck, Eye, ClipboardCheck, Images, RotateCw } from "lucide-react";
import { useLead } from "@/components/lead/LeadModal";
import SectionHeader from "@/components/SectionHeader";

// Главная мысль из брифа
const MANIFESTO = "Ремонт не должен становиться вашей второй работой.";

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
      {children}
    </motion.span>
  );
}

// Основные страхи клиента — из брифа
const FEARS = [
  {
    icon: Calculator,
    fear: "«Смета вырастет в процессе»",
    answer: "Смету готовим в течение 24 часов после замера, презентуем и объясняем. Ориентир по точности — ±10%. Состав работ и бюджет фиксируем до начала соответствующих этапов.",
  },
  {
    icon: CalendarClock,
    fear: "«Сроки сорвутся»",
    answer: "Объём, смета, сроки и обязательства фиксируются в договоре. Оплата поэтапная и привязана к ходу работ.",
  },
  {
    icon: UserRoundCheck,
    fear: "«Подрядчик пропадёт»",
    answer: "Ваш главный контакт — персональный проектный менеджер. Рабочий чат, график проекта и регулярные отчёты.",
  },
  {
    icon: ClipboardCheck,
    fear: "«Придётся постоянно контролировать рабочих»",
    answer: "Ремонт идёт под управлением ПМ — единой точки ответственности. Вам не нужно самостоятельно координировать десятки исполнителей.",
  },
  {
    icon: Images,
    fear: "«Красиво только на визуализации»",
    answer: "Дизайн-проект и ремонт делает одна команда. Показываем связку «визуализация → реализация» на объектах, которые разработали и реализовали мы.",
  },
  {
    icon: Eye,
    fear: "«Результат не совпадёт с ожиданиями»",
    answer: "До договора можно приехать на объект в работе или на готовый объект, оценить качество вживую и обсудить решения с действующим ПМ.",
  },
];

function FearCard({ f, i }: { f: (typeof FEARS)[number]; i: number }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
      onClick={() => setFlipped((v) => !v)}
      onPointerEnter={(e) => e.pointerType === "mouse" && setFlipped(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setFlipped(false)}
      className="relative h-[260px] text-left [perspective:1200px]"
      aria-pressed={flipped}
      aria-label={f.fear}
    >
      <div
        className="relative h-full w-full transition-transform duration-500 ease-out [transform-style:preserve-3d]"
        style={{ transform: flipped ? "rotateY(180deg)" : "none" }}
      >
        <div className="absolute inset-0 rounded-[28px] bg-white border border-navy/10 p-7 flex flex-col justify-between [backface-visibility:hidden]">
          <div className="flex items-center justify-between">
            <div className="h-12 w-12 rounded-2xl bg-paper flex items-center justify-center">
              <f.icon className="h-6 w-6 text-navy" />
            </div>
            <span className="text-[14px] font-semibold text-mist">0{i + 1}</span>
          </div>
          <div>
            <h3 className="t-h3 text-navy">{f.fear}</h3>
            <p className="mt-3 flex items-center gap-1.5 text-[14px] text-navy/50">
              <RotateCw className="h-4 w-4" /> Как это устроено у нас
            </p>
          </div>
        </div>
        <div className="absolute inset-0 rounded-[28px] gradient-brand p-7 flex items-end [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-hidden">
          <p className="text-[16px] leading-[1.6] text-white">{f.answer}</p>
        </div>
      </div>
    </motion.button>
  );
}

export default function Fears() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = MANIFESTO.split(" ");
  const { open } = useLead();

  return (
    <section id="idea" className="relative bg-paper overflow-hidden">
      <div className="absolute inset-0 pattern-dots opacity-60 pointer-events-none" />
      <div ref={ref} className="relative max-w-6xl mx-auto px-5 md:px-8 pt-24 md:pt-32 pb-20 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6">
          <p className="lg:col-span-9 t-h1 text-navy">
            {words.map((w, i) => (
              <Word key={i} progress={scrollYProgress} range={[i / words.length, Math.min(1, (i + 1.5) / words.length)]}>
                {w}
              </Word>
            ))}
          </p>
          <div className="lg:col-start-7 lg:col-span-6 flex gap-5">
            <span className="mt-2 h-px w-12 shrink-0 bg-cognac" />
            <p className="t-lead text-navy/70">
              Координацию исполнителей, закупки, график и контроль берём на себя. Вам остаются решения — и готовый интерьер.
            </p>
          </div>
        </div>
      </div>

      <div className="relative max-w-6xl mx-auto px-5 md:px-8 pb-24 md:pb-32">
        <SectionHeader title="Чего обычно опасаются перед ремонтом — и как это устроено у нас" lead="Нажмите на карточку, чтобы увидеть ответ." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {FEARS.map((f, i) => (
            <FearCard key={f.fear} f={f} i={i} />
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <button
            onClick={() =>
              open({
                offer: "consult",
                source: "Блок «Опасения» — Обсудить с менеджером",
                title: "Обсудим ваш ремонт до старта",
                subtitle: "Проектный менеджер ответит на вопросы и расскажет, как будет устроен ваш ремонт.",
                cta: "Получить консультацию",
                image: "/img/tour.jpg",
              })
            }
            className="rounded-full border border-navy/20 bg-white px-8 py-4 text-[16px] font-semibold text-navy hover:bg-navy hover:text-white transition-colors"
          >
            Обсудить мой ремонт с менеджером
          </button>
        </div>
      </div>
    </section>
  );
}
