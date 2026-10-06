"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { useLead } from "@/components/lead/LeadModal";
import { img } from "@/lib/site";

// Модель работы — из брифа (раздел 2–3)
const FORMATS = [
  {
    n: "01",
    title: "Дизайн-проект и ремонт",
    text: "Разрабатываем дизайн-проект внутри компании и затем сами воплощаем его в ремонте. Весь путь — от дизайн-проекта до реализации — в одной команде.",
    points: ["Дизайн-проект от 1 900 ₽/м²", "Ремонт под ключ от 20 000 ₽/м²", "Связка «визуализация → реализация»"],
    img: "/img/design.jpg",
    offer: "design" as const,
    cta: "Обсудить дизайн-проект",
  },
  {
    n: "02",
    title: "Ремонт по готовому проекту",
    text: "Реализуем проекты сторонних дизайнеров и проекты, с которыми приходит заказчик.",
    points: ["Проекты сторонних дизайнеров", "Ваш собственный проект", "Смета, график и управление ПМ"],
    img: "/img/w89.jpg",
    offer: "calc" as const,
    cta: "Рассчитать по моему проекту",
  },
  {
    n: "03",
    title: "Ремонт без дизайн-проекта",
    text: "Состав работ, решения и бюджет фиксируем до начала соответствующих этапов.",
    points: ["Черновые и чистовые работы", "Электрика и сантехника", "Комплектация и сопутствующие работы"],
    img: "/img/process.jpg",
    offer: "measure" as const,
    cta: "Записаться на замер",
  },
];

export default function Formats() {
  const { open } = useLead();
  return (
    <section id="formats" className="w-full px-5 md:px-8 pt-24 md:pt-32 pb-5 bg-white relative overflow-hidden">
      <div className="absolute -top-64 -right-64 w-[640px] h-[640px] glow-cognac pointer-events-none" />
      <div className="max-w-6xl mx-auto relative">
        <SectionHeader
          title="Начнём с той точки, где вы сейчас"
          lead="Квартиры в новостройках и вторичном жилье, а также дома и коммерческие объекты. Красноярск; выезд за город — по согласованию."
        />

        <div className="flex flex-col gap-5">
          {FORMATS.map((f, i) => (
            <motion.article
              key={f.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
              className={"group grid grid-cols-1 md:grid-cols-2 rounded-[32px] overflow-hidden border border-navy/10 bg-white " + (i % 2 ? "md:[&>*:first-child]:order-2" : "")}
            >
              <div className="relative h-[260px] md:h-auto md:min-h-[420px] overflow-hidden">
                <img {...img(f.img)} alt={f.title} className="absolute inset-0 w-full h-full object-cover md:group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
                <span className="absolute left-6 bottom-4 text-[80px] md:text-[112px] font-extrabold text-white/90 leading-none">{f.n}</span>
              </div>
              <div className="p-7 md:p-12 flex flex-col">
                <h3 className="t-h2 text-navy">{f.title}</h3>
                <p className="mt-4 text-[16px] text-navy/70 leading-[1.6]">{f.text}</p>
                <ul className="mt-6 flex flex-col gap-3">
                  {f.points.map((p) => (
                    <li key={p} className="flex items-center gap-3 text-[16px] text-navy">
                      <span className="h-6 w-6 rounded-full bg-cognac/15 flex items-center justify-center shrink-0">
                        <Check className="h-3.5 w-3.5 text-cognac" strokeWidth={3} />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() =>
                    open({
                      offer: f.offer,
                      source: `Формат «${f.title}»`,
                      title: f.cta,
                      subtitle: f.text,
                      cta: "Отправить заявку",
                      image: f.img,
                      preset: { note: `Формат: ${f.title}` },
                    })
                  }
                  className="mt-auto pt-8 w-full sm:w-auto sm:self-start"
                >
                  <span className="group/b flex sm:inline-flex w-full items-center justify-between gap-3 rounded-full bg-navy text-white pl-6 pr-1.5 py-1.5 text-[16px] font-semibold hover:bg-ink transition-colors">
                    {f.cta}
                    <span className="h-10 w-10 rounded-full bg-cognac flex items-center justify-center group-hover/b:rotate-45 transition-transform">
                      <ArrowUpRight className="h-5 w-5" />
                    </span>
                  </span>
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
