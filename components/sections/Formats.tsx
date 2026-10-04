"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { useLead } from "@/components/lead/LeadModal";
import { asset } from "@/lib/site";

const FORMATS = [
  {
    n: "01",
    tag: "Одна команда от идеи до ключей",
    title: "Дизайн-проект + ремонт",
    text: "Разрабатываем дизайн-проект внутри компании и сами воплощаем его. Дизайнер, сметчик и проектный менеджер работают в связке — проект изначально считается под реализацию.",
    points: ["Дизайн-проект от 1 900 ₽/м²", "Ремонт от 20 000 ₽/м²", "Визуализация → реализация без потерь"],
    img: "/img/design.jpg",
    offer: "design" as const,
    cta: "Обсудить дизайн-проект",
  },
  {
    n: "02",
    tag: "Работаем с вашим дизайнером",
    title: "Ремонт по готовому проекту",
    text: "Реализуем проекты сторонних дизайнеров и проекты, с которыми приходит заказчик. Сверяем чертежи, считаем смету и ведём объект по графику.",
    points: ["Проверка проекта перед сметой", "Комплектация по спецификации", "Отчёты дизайнеру и вам"],
    img: "/img/kitchen.jpg",
    offer: "calc" as const,
    cta: "Рассчитать по моему проекту",
  },
  {
    n: "03",
    tag: "Когда дизайн-проект не нужен",
    title: "Ремонт без дизайн-проекта",
    text: "Состав работ, решения и бюджет фиксируем до начала соответствующих этапов. Вы заранее понимаете, что получите и сколько это стоит.",
    points: ["Черновые и чистовые работы", "Электрика и сантехника", "Комплектация и сопутствующие работы"],
    img: "/img/process.jpg",
    offer: "measure" as const,
    cta: "Записаться на замер",
  },
];

export default function Formats() {
  const { open } = useLead();
  return (
    <section id="formats" className="w-full px-5 md:px-8 py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[520px] h-[520px] bg-cognac/10 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="max-w-6xl mx-auto relative">
        <div className="mb-14 grid md:grid-cols-2 gap-6 items-end">
          <div>
            <p className="text-[12px] uppercase tracking-[0.18em] font-semibold text-cognac mb-4">Три формата работы</p>
            <h2 className="text-[34px] md:text-[48px] font-bold text-navy leading-[1.08] tracking-[-0.02em]">
              Начнём с той точки,
              <br /> где вы сейчас
            </h2>
          </div>
          <p className="text-[16px] md:text-[18px] text-navy/60 leading-relaxed">
            Квартиры в новостройках и вторичном жилье, дома и коммерческие объекты. Выезд за город — по согласованию.
          </p>
        </div>

        <div className="flex flex-col gap-5">
          {FORMATS.map((f, i) => (
            <motion.article
              key={f.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
              className={"group grid md:grid-cols-2 rounded-[32px] overflow-hidden border border-navy/10 bg-white " + (i % 2 ? "md:[&>*:first-child]:order-2" : "")}
            >
              <div className="relative h-[260px] md:h-auto md:min-h-[420px] overflow-hidden">
                <img src={asset(f.img)} alt={f.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1200ms]" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
                <span className="absolute left-6 bottom-5 text-[80px] md:text-[120px] font-extrabold text-white/90 leading-none tracking-tighter">{f.n}</span>
              </div>
              <div className="p-7 md:p-12 flex flex-col">
                <span className="inline-flex w-fit rounded-full border border-cognac text-cognac text-[12px] font-semibold px-3 py-1">{f.tag}</span>
                <h3 className="mt-5 text-[28px] md:text-[34px] font-bold text-navy leading-tight">{f.title}</h3>
                <p className="mt-4 text-[15px] md:text-[16px] text-navy/65 leading-relaxed">{f.text}</p>
                <ul className="mt-6 flex flex-col gap-3">
                  {f.points.map((p) => (
                    <li key={p} className="flex items-center gap-3 text-[15px] text-navy">
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
                  className="mt-auto pt-8 self-start"
                >
                  <span className="group/b inline-flex items-center gap-3 rounded-full bg-navy text-white pl-6 pr-1.5 py-1.5 text-[15px] font-semibold hover:bg-ink transition-colors">
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
