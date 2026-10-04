"use client";
import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Calculator, CalendarClock, UserRoundCheck, Eye, HardHat, Images, RotateCw } from "lucide-react";
import { useLead } from "@/components/lead/LeadModal";

const MANIFESTO = "Ремонт не должен становиться вашей второй работой. Мы берём на себя десятки исполнителей, закупки, график и контроль — вам остаются решения и готовый интерьер.";

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
      {children}
    </motion.span>
  );
}

const FEARS = [
  {
    icon: Calculator,
    fear: "«Смета вырастет в процессе»",
    answer: "Смету готовим за 24 часа после замера, презентуем и объясняем каждую строку. Ориентир по точности — ±10%. Состав работ и бюджет фиксируем до начала этапов.",
  },
  {
    icon: CalendarClock,
    fear: "«Сроки сорвутся»",
    answer: "График проекта согласуем до старта и закрепляем в договоре. Оплата поэтапная и привязана к ходу работ — вы платите за сделанное.",
  },
  {
    icon: UserRoundCheck,
    fear: "«Подрядчик пропадёт»",
    answer: "У вас один ответственный — персональный проектный менеджер. Рабочий чат, регулярные отчёты и понятная фиксация этапов.",
  },
  {
    icon: HardHat,
    fear: "«Придётся контролировать рабочих»",
    answer: "Координацию бригад, закупки и приёмку этапов ведёт ПМ. Вам не нужно ездить на объект, чтобы знать, что происходит.",
  },
  {
    icon: Images,
    fear: "«Красиво только на визуализации»",
    answer: "Дизайн-проект и реализацию делает одна команда. Показываем связку «визуализация → реализация» на наших объектах.",
  },
  {
    icon: Eye,
    fear: "«Результат не совпадёт с ожиданиями»",
    answer: "До договора можно приехать на объект в работе или на готовый объект, увидеть качество вживую и поговорить с действующим ПМ.",
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
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      className="relative h-[250px] text-left [perspective:1200px]"
      aria-label={f.fear}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="relative h-full w-full [transform-style:preserve-3d]"
      >
        <div className="absolute inset-0 rounded-[28px] bg-white border border-navy/10 p-7 flex flex-col justify-between [backface-visibility:hidden]">
          <div className="flex items-center justify-between">
            <div className="h-12 w-12 rounded-2xl bg-paper flex items-center justify-center">
              <f.icon className="h-6 w-6 text-navy" />
            </div>
            <span className="text-[12px] font-semibold text-navy/35">0{i + 1}</span>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.14em] font-semibold text-cognac mb-2">Опасение</p>
            <h3 className="text-[22px] font-bold text-navy leading-tight">{f.fear}</h3>
            <p className="mt-3 flex items-center gap-1.5 text-[12px] text-navy/45"><RotateCw className="h-3.5 w-3.5" /> Как это устроено у нас</p>
          </div>
        </div>
        <div className="absolute inset-0 rounded-[28px] gradient-brand p-7 flex flex-col justify-between [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-hidden">
          <div className="absolute inset-0 pattern-grid-light" />
          <p className="relative text-[11px] uppercase tracking-[0.14em] font-semibold text-cognac">Как у нас</p>
          <p className="relative text-[15px] leading-relaxed text-white/90">{f.answer}</p>
        </div>
      </motion.div>
    </motion.button>
  );
}

export default function Fears() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = MANIFESTO.split(" ");
  const { open } = useLead();

  return (
    <section className="relative bg-paper overflow-hidden">
      <div className="absolute inset-0 pattern-dots opacity-60 pointer-events-none" />
      <div ref={ref} className="relative max-w-6xl mx-auto px-5 md:px-8 pt-24 md:pt-36 pb-16">
        <p className="text-[12px] uppercase tracking-[0.18em] font-semibold text-cognac mb-6">Главная мысль</p>
        <p className="text-[28px] sm:text-[38px] md:text-[52px] font-bold leading-[1.15] tracking-[-0.02em] text-navy">
          {words.map((w, i) => (
            <Word key={i} progress={scrollYProgress} range={[i / words.length, Math.min(1, (i + 1.5) / words.length)]}>
              {w}
            </Word>
          ))}
        </p>
      </div>

      <div className="relative max-w-6xl mx-auto px-5 md:px-8 pb-24 md:pb-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <h2 className="text-[30px] md:text-[44px] font-bold text-navy leading-[1.1] max-w-xl">
            Чего обычно боятся перед ремонтом — и что мы с этим делаем
          </h2>
          <p className="text-[15px] text-navy/55 max-w-sm">Наведите на карточку или нажмите на неё, чтобы увидеть ответ.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {FEARS.map((f, i) => (
            <FearCard key={f.fear} f={f} i={i} />
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <button
            onClick={() =>
              open({
                offer: "consult",
                source: "Блок «Опасения» — Задать вопрос",
                title: "Обсудим ваши опасения до старта",
                subtitle: "Проектный менеджер ответит на вопросы и расскажет, как будет устроен ваш ремонт.",
                cta: "Получить консультацию",
                image: "/img/tour.jpg",
              })
            }
            className="rounded-full border border-navy/20 bg-white px-8 py-4 text-[15px] font-semibold text-navy hover:bg-navy hover:text-white transition-colors"
          >
            Обсудить мой ремонт с менеджером
          </button>
        </div>
      </div>
    </section>
  );
}
