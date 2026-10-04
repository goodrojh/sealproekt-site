"use client";
import React, { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import { MoveHorizontal } from "lucide-react";
import { img } from "@/lib/site";

function Compare({ left, right, leftLabel, rightLabel }: { left: string; right: string; leftLabel: string; rightLabel: string }) {
  const [pos, setPos] = useState(50);
  const box = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const move = useCallback((clientX: number) => {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.max(2, Math.min(98, ((clientX - r.left) / r.width) * 100)));
  }, []);

  return (
    <div
      ref={box}
      className="relative w-full aspect-[4/3] md:aspect-[16/10] rounded-[28px] overflow-hidden select-none cursor-ew-resize touch-pan-y"
      onPointerDown={(e) => {
        dragging.current = true;
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
        move(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && move(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
    >
      <img {...img(right, { sizes: "(max-width: 1200px) 100vw, 1150px" })} alt={rightLabel} className="absolute inset-0 w-full h-full object-cover" draggable={false} />
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img {...img(left, { sizes: "(max-width: 1200px) 100vw, 1150px" })} alt={leftLabel} className="absolute inset-0 w-full h-full object-cover" draggable={false} />
      </div>
      <span className="absolute left-4 top-4 rounded-full bg-ink/75 px-3 py-1.5 text-[14px] font-semibold text-white">{leftLabel}</span>
      <span className="absolute right-4 top-4 rounded-full bg-cognac px-3 py-1.5 text-[14px] font-semibold text-white">{rightLabel}</span>
      <div className="absolute inset-y-0 w-[2px] bg-white shadow-[0_0_20px_rgba(0,0,0,0.4)]" style={{ left: `${pos}%` }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-14 w-14 rounded-full bg-white shadow-2xl flex items-center justify-center">
          <MoveHorizontal className="h-6 w-6 text-navy" />
        </div>
      </div>
      <input
        type="range"
        min={2}
        max={98}
        value={pos}
        onChange={(e) => setPos(+e.target.value)}
        aria-label={`Сравнить: ${leftLabel} и ${rightLabel}`}
        className="sr-only"
      />
    </div>
  );
}

const TABS = [
  {
    id: "viz",
    label: "Визуализация → реализация",
    left: "/img/viz.jpg",
    right: "/img/hero.jpg",
    l: "Визуализация",
    r: "Реализация",
    text: "Там, где проект разработан и реализован нами, показываем связку «визуализация → реализация»: дизайн-проект и ремонт делает одна команда.",
  },
  {
    id: "ba",
    label: "До → после",
    left: "/img/before.jpg",
    right: "/img/after.jpg",
    l: "До",
    r: "После",
    text: "Вторичное жильё: от старых стен и коммуникаций — к спокойному современному интерьеру. Этапы работ фиксируем в отчётах.",
  },
];

export default function Showcase() {
  const [tab, setTab] = useState(0);
  const t = TABS[tab];
  return (
    <section className="w-full px-5 md:px-8 py-24 md:py-32 bg-paper relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h2 className="t-section text-navy max-w-2xl">
              Красиво не только на визуализации
            </h2>
          </div>
          <div className="flex gap-1 rounded-full bg-white p-1 border border-navy/10 self-start md:self-auto">
            {TABS.map((x, i) => (
              <button
                key={x.id}
                onClick={() => setTab(i)}
                className={"relative rounded-full px-4 md:px-5 py-2.5 text-[14px] font-semibold transition-colors " + (tab === i ? "text-white" : "text-navy/60 hover:text-navy")}
              >
                {tab === i && <motion.span layoutId="showcase-pill" className="absolute inset-0 rounded-full bg-navy" />}
                <span className="relative">{x.label}</span>
              </button>
            ))}
          </div>
        </div>
        <motion.div key={t.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Compare left={t.left} right={t.right} leftLabel={t.l} rightLabel={t.r} />
          <p className="mt-6 t-lead text-navy/70 max-w-2xl">{t.text}</p>
        </motion.div>
      </div>
    </section>
  );
}
