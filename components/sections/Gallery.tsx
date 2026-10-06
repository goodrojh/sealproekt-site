"use client";
import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";
import Lightbox from "@/components/Lightbox";
import { img } from "@/lib/site";
import { WORKS, WORK_CATS, WorkCat, workSrc } from "@/lib/works";

const STEP = 24;

// Все реальные фото заказчика: фильтр по помещениям, «показать ещё», просмотр на весь экран
export default function Gallery() {
  const [cat, setCat] = useState<WorkCat | "all">("all");
  const [limit, setLimit] = useState(STEP);
  const [open, setOpen] = useState<number | null>(null);

  const list = useMemo(() => (cat === "all" ? WORKS : WORKS.filter((w) => w.cat === cat)), [cat]);
  const shown = list.slice(0, limit);
  const count = (id: WorkCat | "all") => (id === "all" ? WORKS.length : WORKS.filter((w) => w.cat === id).length);

  return (
    <section id="gallery" className="bg-white py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <SectionHeader title="Фото наших работ" lead={`${WORKS.length} реальных фотографий с объектов. Выберите помещение и нажмите на фото, чтобы рассмотреть детали.`} />

        <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-5 px-5 md:mx-0 md:px-0 mb-8">
          {WORK_CATS.filter((c) => count(c.id) > 0).map((c) => (
            <button
              key={c.id}
              onClick={() => {
                setCat(c.id);
                setLimit(STEP);
              }}
              className={
                "shrink-0 whitespace-nowrap rounded-full px-5 py-2.5 text-[14px] font-semibold border transition-colors " +
                (cat === c.id ? "bg-navy text-white border-navy" : "bg-white text-navy/70 border-navy/15 hover:border-navy/40")
              }
            >
              {c.label} <span className={cat === c.id ? "text-white/60" : "text-navy/40"}>{count(c.id)}</span>
            </button>
          ))}
        </div>

        {/* Кладка: фото сохраняют свои пропорции */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-4">
          {shown.map((w, i) => (
            <motion.button
              key={w.n}
              type="button"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: (i % 4) * 0.05 }}
              onClick={() => setOpen(i)}
              className="group relative block w-full mb-3 md:mb-4 break-inside-avoid rounded-[18px] overflow-hidden bg-sand"
              style={{ aspectRatio: `${w.w} / ${w.h}` }}
              aria-label={`Открыть фото ${i + 1}`}
            >
              <img
                {...img(workSrc(w.n), { sizes: "(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 280px" })}
                alt={`Фото работы СЕАЛ ПРОЕКТ, ${WORK_CATS.find((c) => c.id === w.cat)?.label.toLowerCase()}`}
                width={w.w}
                height={w.h}
                className="absolute inset-0 w-full h-full object-cover md:group-hover:scale-105 transition-transform duration-700"
              />
            </motion.button>
          ))}
        </div>

        {list.length > limit && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setLimit((l) => l + STEP)}
              className="rounded-full border border-navy/20 bg-white px-8 py-4 text-[16px] font-semibold text-navy hover:bg-navy hover:text-white transition-colors"
            >
              Показать ещё ({list.length - limit})
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {open !== null && <Lightbox photos={list.map((w) => w.n)} start={open} title="Фото наших работ" onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </section>
  );
}
