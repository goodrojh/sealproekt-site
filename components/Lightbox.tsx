"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { img } from "@/lib/site";
import { workSrc } from "@/lib/works";

// Полноэкранный просмотр фото: стрелки, свайп, клавиатура, лента миниатюр.
export default function Lightbox({
  photos,
  start = 0,
  title,
  onClose,
  footer,
}: {
  photos: number[];
  start?: number;
  title?: string;
  onClose: () => void;
  footer?: React.ReactNode;
}) {
  const [i, setI] = useState(start);
  const n = photos.length;
  const go = useCallback((d: number) => setI((v) => (v + d + n) % n), [n]);
  const strip = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", k);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", k);
    };
  }, [go, onClose]);

  useEffect(() => {
    strip.current?.querySelector<HTMLElement>(`[data-i="${i}"]`)?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [i]);

  return (
    <motion.div
      className="fixed inset-0 z-[110] bg-ink flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      role="dialog"
      aria-modal="true"
      aria-label={title || "Просмотр фото"}
    >
      <div className="flex items-center justify-between gap-4 px-4 md:px-8 py-4 text-white">
        <div className="min-w-0">
          {title && <p className="text-[16px] font-semibold truncate">{title}</p>}
          <p className="text-[14px] text-white/60">
            {i + 1} из {n}
          </p>
        </div>
        <button onClick={onClose} aria-label="Закрыть" className="h-11 w-11 shrink-0 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div
        className="relative flex-1 min-h-0 flex items-center justify-center px-2 md:px-20"
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
          touchX.current = null;
        }}
      >
        <img key={photos[i]} {...img(workSrc(photos[i]), { eager: true, sizes: "100vw" })} alt={`${title || "Фото"} — ${i + 1}`} className="max-h-full max-w-full object-contain rounded-xl select-none" draggable={false} />
        {n > 1 && (
          <>
            <button onClick={() => go(-1)} aria-label="Предыдущее фото" className="hidden md:flex absolute left-5 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white text-navy items-center justify-center hover:bg-cognac hover:text-white transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button onClick={() => go(1)} aria-label="Следующее фото" className="hidden md:flex absolute right-5 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white text-navy items-center justify-center hover:bg-cognac hover:text-white transition-colors">
              <ArrowRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {n > 1 && (
        <div ref={strip} className="flex gap-2 overflow-x-auto no-scrollbar px-4 md:px-8 py-3">
          {photos.map((p, k) => (
            <button
              key={p}
              data-i={k}
              onClick={() => setI(k)}
              aria-label={`Фото ${k + 1}`}
              className={"shrink-0 h-14 w-14 md:h-16 md:w-16 rounded-lg overflow-hidden border-2 transition-opacity " + (k === i ? "border-cognac opacity-100" : "border-transparent opacity-50 hover:opacity-90")}
            >
              <img {...img(workSrc(p), { sizes: "64px" })} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
      {footer && <div className="px-4 md:px-8 pb-4">{footer}</div>}
    </motion.div>
  );
}
