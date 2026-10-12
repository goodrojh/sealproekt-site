"use client";
import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Lightbox from "@/components/Lightbox";
import { img } from "@/lib/site";
import { WORKS, WORK_CATS, WorkCat, workSrc } from "@/lib/works";

// Все реальные фото заказчика (Google Drive): фильтр по помещениям и просмотр на весь экран
export default function GalleryModal({ onClose }: { onClose: () => void }) {
  const [cat, setCat] = useState<WorkCat | "all">("all");
  const [open, setOpen] = useState<number | null>(null);
  const list = useMemo(() => (cat === "all" ? WORKS : WORKS.filter((w) => w.cat === cat)), [cat]);
  const count = (id: WorkCat | "all") => (id === "all" ? WORKS.length : WORKS.filter((w) => w.cat === id).length);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const k = (e: KeyboardEvent) => e.key === "Escape" && open === null && onClose();
    window.addEventListener("keydown", k);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", k);
    };
  }, [onClose, open]);

  return (
    <motion.div className="fixed inset-0 z-[105] bg-white overflow-y-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-label="Фото наших работ">
      <div className="sticky top-0 z-10 bg-white/95 border-b border-navy/10">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-4 flex items-center justify-between gap-4">
          <div>
            <p className="t-h3 text-navy">Фото наших работ</p>
            <p className="text-[14px] text-navy/60">{WORKS.length} реальных фотографий с объектов</p>
          </div>
          <button onClick={onClose} aria-label="Закрыть" className="h-11 w-11 shrink-0 rounded-full bg-paper hover:bg-sand flex items-center justify-center text-navy">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="max-w-6xl mx-auto px-5 md:px-8 pb-4 flex gap-2 overflow-x-auto no-scrollbar">
          {WORK_CATS.filter((c) => count(c.id) > 0 && c.id !== "commercial").map((c) => (
            <button
              key={c.id}
              onClick={() => setCat(c.id)}
              className={"shrink-0 whitespace-nowrap rounded-full px-5 py-2.5 text-[14px] font-semibold border transition-colors " + (cat === c.id ? "bg-navy text-white border-navy" : "bg-white text-navy/70 border-navy/15 hover:border-navy/40")}
            >
              {c.label} <span className={cat === c.id ? "text-white/60" : "text-navy/40"}>{count(c.id)}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 md:px-8 py-6 columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-4">
        {list.map((w, i) => (
          <button
            key={w.n}
            type="button"
            onClick={() => setOpen(i)}
            className="group relative block w-full mb-3 md:mb-4 break-inside-avoid rounded-[16px] overflow-hidden bg-sand"
            style={{ aspectRatio: `${w.w} / ${w.h}` }}
            aria-label={`Открыть фото ${i + 1}`}
          >
            <img {...img(workSrc(w.n), { sizes: "(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 280px" })} alt="" width={w.w} height={w.h} className="absolute inset-0 w-full h-full object-cover md:group-hover:scale-105 transition-transform duration-700" />
          </button>
        ))}
      </div>

      <AnimatePresence>{open !== null && <Lightbox photos={list.map((w) => workSrc(w.n))} start={open} title="Фото наших работ" onClose={() => setOpen(null)} />}</AnimatePresence>
    </motion.div>
  );
}
