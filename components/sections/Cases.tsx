"use client";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { useLead } from "@/components/lead/LeadModal";
import { img } from "@/lib/site";

// ВРЕМЕННО: иллюстрации и шаблонные описания. Заменить реальными кейсами заказчика.
const CASES = [
  {
    id: 1,
    title: "Квартира с видом на Енисей",
    meta: "Новостройка · дизайн-проект + ремонт",
    cover: "/img/hero.jpg",
    gallery: ["/img/hero.jpg", "/img/sketch.jpg", "/img/kitchen.jpg", "/img/bedroom.jpg"],
    task: "Спокойный тёплый интерьер для семьи с панорамными окнами, без визуального шума.",
    input: "Квартира от застройщика без отделки, панорамное остекление.",
    done: "Дизайн-проект, черновые и чистовые работы, электрика, скрытая подсветка, комплектация.",
    features: "Конвекторы в полу у панорамных окон, теневые профили на потолке, паркет «ёлочкой».",
    result: "Интерьер совпал с визуализацией: заказчик утвердил проект и получил ровно то, что видел.",
  },
  {
    id: 2,
    title: "Санузел с монолитной раковиной",
    meta: "Вторичное жильё · ремонт по проекту",
    cover: "/img/bath.jpg",
    gallery: ["/img/bath-before.jpg", "/img/bath.jpg"],
    task: "Современный санузел с душевой зоной вместо ванны.",
    input: "Старая плитка и трубы, неровные стены.",
    done: "Демонтаж, замена коммуникаций, гидроизоляция, крупноформатный керамогранит, трап.",
    features: "Раковина из керамогранита, ниша с акцентной плиткой, подсветка зеркала.",
    result: "Аккуратная геометрия швов и полностью новые инженерные системы.",
  },
  {
    id: 3,
    title: "Из «бабушкиной» квартиры — в современную",
    meta: "Вторичное жильё · ремонт без дизайн-проекта",
    cover: "/img/after.jpg",
    gallery: ["/img/before.jpg", "/img/after.jpg"],
    task: "Обновить квартиру без дизайн-проекта, но с понятным бюджетом.",
    input: "Старые обои, линолеум, деревянные окна, изношенная электрика.",
    done: "Полный демонтаж, новая электрика, выравнивание стен, инженерная доска, покраска.",
    features: "Решения и бюджет зафиксировали до начала каждого этапа.",
    result: "Светлая гостиная с акцентной стеной — в рамках согласованной сметы.",
  },
  {
    id: 4,
    title: "Студия с кухней-островом",
    meta: "Новостройка · дизайн-проект + ремонт",
    cover: "/img/studio.jpg",
    gallery: ["/img/studio.jpg", "/img/hall.jpg", "/img/office.jpg"],
    task: "Функциональная студия, где есть место для кухни, отдыха и работы.",
    input: "Свободная планировка от застройщика.",
    done: "Зонирование реечной перегородкой, кухня-остров, встроенные системы хранения.",
    features: "Скрытые системы хранения в прихожей, рабочее место у окна.",
    result: "Компактная квартира без ощущения тесноты.",
  },
];

function CaseModal({ c, onClose }: { c: (typeof CASES)[number]; onClose: () => void }) {
  const [i, setI] = useState(0);
  const { open } = useLead();
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", k);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", k);
    };
  }, [onClose]);
  const rows = [
    ["Задача", c.task],
    ["Исходные данные", c.input],
    ["Что сделали", c.done],
    ["Особенности объекта", c.features],
    ["Фотографии", `${c.gallery.length} фото в галерее`],
    ["Результат", c.result],
  ];
  return (
    <motion.div className="fixed inset-0 z-[90] flex items-center justify-center p-0 md:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="absolute inset-0 bg-ink/85" onClick={onClose} />
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 30, opacity: 0 }}
        className="relative w-full max-w-6xl h-full md:h-auto md:max-h-[92vh] overflow-y-auto bg-white md:rounded-[28px] grid grid-cols-1 lg:grid-cols-[1.4fr_1fr]"
      >
        <div className="relative bg-ink aspect-[4/3] lg:aspect-auto lg:min-h-[640px]">
          <AnimatePresence mode="popLayout">
            <motion.img key={i} {...img(c.gallery[i], { eager: true, sizes: "(max-width: 1024px) 100vw, 60vw" })} alt={c.title} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 w-full h-full object-cover" />
          </AnimatePresence>
          {c.gallery.length > 1 && (
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <div className="flex gap-1.5">
                {c.gallery.map((_, k) => (
                  <button key={k} onClick={() => setI(k)} aria-label={`Фото ${k + 1}`} className={"h-1.5 rounded-full transition-all " + (k === i ? "w-8 bg-white" : "w-3 bg-white/50")} />
                ))}
              </div>
              <div className="flex gap-2">
                <button aria-label="Назад" onClick={() => setI((i - 1 + c.gallery.length) % c.gallery.length)} className="h-11 w-11 rounded-full bg-white/90 flex items-center justify-center text-navy">
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <button aria-label="Вперёд" onClick={() => setI((i + 1) % c.gallery.length)} className="h-11 w-11 rounded-full bg-white/90 flex items-center justify-center text-navy">
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="p-6 md:p-9 flex flex-col">
          <button onClick={onClose} aria-label="Закрыть" className="absolute right-4 top-4 h-11 w-11 rounded-full bg-white/90 md:bg-paper flex items-center justify-center text-navy z-10">
            <X className="h-5 w-5" />
          </button>
          <p className="text-[14px] font-medium text-navy/60">{c.meta}</p>
          <h3 className="mt-2 t-h2 text-navy pr-10">{c.title}</h3>
          <dl className="mt-6 flex flex-col gap-4">
            {rows.map(([k, v]) => (
              <div key={k} className="grid grid-cols-1 sm:grid-cols-[150px_1fr] gap-1 sm:gap-3 border-b border-navy/10 pb-4">
                <dt className="text-[14px] font-semibold text-navy">{k}</dt>
                <dd className="text-[16px] text-navy/75 leading-[1.6]">{v}</dd>
              </div>
            ))}
          </dl>
          <button
            onClick={() =>
              open({
                offer: "calc",
                source: `Кейс «${c.title}»`,
                title: "Хочу похожий ремонт",
                subtitle: `Рассчитаем стоимость похожего решения: «${c.title}».`,
                cta: "Рассчитать стоимость",
                image: c.cover,
                preset: { note: `Понравился кейс: ${c.title}` },
              })
            }
            className="mt-auto pt-6"
          >
            <span className="flex w-full items-center justify-between rounded-full bg-navy text-white p-1.5 pl-6 hover:bg-cognac transition-colors">
              <span className="text-[16px] font-semibold">Хочу похожий ремонт</span>
              <span className="h-11 w-11 rounded-full bg-cognac flex items-center justify-center">
                <ArrowRight className="h-5 w-5" />
              </span>
            </span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Cases() {
  const [active, setActive] = useState<number | null>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const scroll = (d: number) => scroller.current?.scrollBy({ left: d * scroller.current.clientWidth * 0.8, behavior: "smooth" });
  const current = CASES.find((c) => c.id === active);

  return (
    <section id="cases" className="bg-white py-24 md:py-32 font-sans overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <SectionHeader
          title="Интерьеры, которые мы довели до ключей"
          lead="Нажмите на объект, чтобы посмотреть кейс: задача, исходные данные, что сделали и результат."
          action={
          <div className="flex gap-2">
            <button onClick={() => scroll(-1)} aria-label="Назад" className="h-12 w-12 rounded-full border border-navy/15 flex items-center justify-center text-navy hover:bg-navy hover:text-white transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button onClick={() => scroll(1)} aria-label="Вперёд" className="h-12 w-12 rounded-full bg-navy flex items-center justify-center text-white hover:bg-cognac transition-colors">
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
          }
        />
      </div>

      <div ref={scroller} className="flex gap-5 overflow-x-auto snap-x snap-mandatory no-scrollbar px-5 scroll-px-5 md:px-[max(2rem,calc((100vw-72rem)/2+2rem))] md:scroll-px-[max(2rem,calc((100vw-72rem)/2+2rem))] pb-4">
        {CASES.map((c, i) => (
          <motion.button
            key={c.id}
            type="button"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            onClick={() => setActive(c.id)}
            className="group snap-start shrink-0 w-[85vw] sm:w-[520px] md:w-[600px] text-left"
          >
            <div className="relative h-[380px] md:h-[440px] rounded-[28px] overflow-hidden">
              <img {...img(c.cover, { sizes: "(max-width: 640px) 85vw, 600px" })} alt={c.title} className="absolute inset-0 w-full h-full object-cover md:group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
              <span className="absolute top-5 right-5 h-12 w-12 rounded-full bg-white flex items-center justify-center text-navy group-hover:bg-cognac group-hover:text-white group-hover:rotate-45 transition-all">
                <ArrowUpRight className="h-5 w-5" />
              </span>
              <div className="absolute left-6 bottom-6 right-6">
                <p className="text-[14px] font-medium text-white/85">{c.meta}</p>
                <h3 className="mt-1 t-h3 text-white">{c.title}</h3>
              </div>
            </div>
            <p className="mt-4 text-[16px] text-navy/65 line-clamp-2">{c.task}</p>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>{current && <CaseModal c={current} onClose={() => setActive(null)} />}</AnimatePresence>
    </section>
  );
}
