"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FileText, FileSignature, MessagesSquare, PencilRuler } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { img } from "@/lib/site";

// Единственный блок преимуществ (правка маркетолога, п. 2) — всё из брифа, без повторов по странице
const ITEMS = [
  {
    icon: FileText,
    t: "Смета в течение 24 часов после замера",
    d: "Не просто отправляем файл, а презентуем и объясняем каждую позицию. Ориентир по точности — ±10%.",
  },
  {
    icon: FileSignature,
    t: "Договор и поэтапная оплата",
    d: "Объём, смета, сроки и обязательства фиксируются в договоре. Оплата — по ходу работ.",
  },
  {
    icon: MessagesSquare,
    t: "Прозрачный процесс",
    d: "Рабочий чат, график проекта и регулярные отчёты — без ежедневных поездок на объект.",
  },
  {
    icon: PencilRuler,
    t: "Дизайн и ремонт — одна команда",
    d: "Разработаем дизайн-проект и сами реализуем его. Работаем и по готовому проекту, и без дизайн-проекта.",
  },
];

const PM_PHOTOS = [
  { src: "/img/pm2.jpg", alt: "Специалист СЕАЛ ПРОЕКТ консультирует клиента" },
  { src: "/img/pm1.jpg", alt: "Специалист СЕАЛ ПРОЕКТ на стенде компании" },
];

function PmPhotos() {
  const [k, setK] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setK((v) => (v + 1) % PM_PHOTOS.length), 5000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="relative h-[260px] md:h-[320px] overflow-hidden bg-ink">
      {PM_PHOTOS.map((p, i) => (
        <img
          key={p.src}
          {...img(p.src, { sizes: "(max-width: 768px) 100vw, 560px" })}
          alt={p.alt}
          className={"absolute inset-0 w-full h-full object-cover object-[50%_22%] transition-opacity duration-1000 " + (i === k ? "opacity-100" : "opacity-0")}
        />
      ))}
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-navy to-transparent" />
      <div className="absolute bottom-4 left-6 md:left-8 flex gap-1.5">
        {PM_PHOTOS.map((p, i) => (
          <button key={p.src} onClick={() => setK(i)} aria-label={`Фото ${i + 1}`} className={"h-1.5 rounded-full transition-all " + (i === k ? "w-8 bg-white" : "w-3 bg-white/50")} />
        ))}
      </div>
    </div>
  );
}

export default function Advantages() {
  return (
    <section id="advantages" className="w-full px-5 md:px-8 py-24 md:py-32 bg-paper">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          title="Ремонт не станет вашей второй работой"
          lead="Вы получаете не набор разрозненных подрядчиков, а управляемый процесс с персональным менеджментом проекта."
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="rounded-[32px] overflow-hidden bg-navy flex flex-col"
          >
            <PmPhotos />
            <div className="p-6 md:p-8">
              <h3 className="t-h2 text-white">
                Один ответственный — <span className="text-cognac whitespace-nowrap">весь проект</span>
              </h3>
              <p className="mt-3 text-[16px] text-white/85 leading-[1.6]">
                Персональный проектный менеджер — ваш главный контакт по проекту: от замера и сметы до сдачи объекта и гарантийного сопровождения.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {ITEMS.map((x, i) => (
              <motion.div
                key={x.t}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}
                className="rounded-[28px] bg-white border border-navy/10 p-6 md:p-7 flex flex-col"
              >
                <div className="h-12 w-12 rounded-2xl bg-cognac/12 flex items-center justify-center">
                  <x.icon className="h-6 w-6 text-cognac" />
                </div>
                <h3 className="mt-5 t-h4 font-semibold text-navy">{x.t}</h3>
                <p className="mt-2 text-[16px] text-navy/65 leading-[1.55]">{x.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
