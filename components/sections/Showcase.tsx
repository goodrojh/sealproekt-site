"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { MoveHorizontal } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { img } from "@/lib/site";

type Pair = { id: string; label: string; left: string; right: string; l: string; r: string; text: string; pos?: string };

// Пары снимков с одной точки съёмки (сейчас — иллюстрации, заменить реальными фото объектов)
const PAIRS: Pair[] = [
  {
    id: "room",
    label: "Комната",
    left: "/img/before.jpg",
    right: "/img/after.jpg",
    l: "До ремонта",
    r: "После ремонта",
    text: "Вторичное жильё: старые обои, линолеум и изношенная электрика — и та же комната после ремонта под ключ.",
  },
  {
    id: "bath",
    label: "Санузел",
    left: "/img/bath-before.jpg",
    right: "/img/bath.jpg",
    l: "До ремонта",
    r: "После ремонта",
    text: "Старая плитка, чугунная ванна и открытые трубы — и тот же санузел с душевой зоной и новыми коммуникациями.",
    pos: "50% 62%",
  },
  {
    id: "design",
    label: "Дизайн-проект",
    left: "/img/sketch.jpg",
    right: "/img/hero.jpg",
    l: "Дизайн-проект",
    r: "Готовый интерьер",
    text: "Когда дизайн-проект разрабатываем и реализуем мы, интерьер получается таким, каким его утвердили на проекте.",
  },
];

function Compare({ pair, demo }: { pair: Pair; demo: boolean }) {
  const [pos, setPos] = useState(50);
  const box = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const touched = useRef(false);

  const move = useCallback((clientX: number) => {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100)));
  }, []);

  // Один раз показываем, как работает ползунок
  useEffect(() => {
    if (!demo || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const t0 = performance.now();
    const D = 2200;
    const step = (t: number) => {
      if (touched.current) return;
      const k = Math.min(1, (t - t0) / D);
      setPos(50 - 32 * Math.sin(k * Math.PI * 2) * (1 - k * 0.3));
      if (k < 1) raf = requestAnimationFrame(step);
      else setPos(50);
    };
    const id = setTimeout(() => (raf = requestAnimationFrame(step)), 400);
    return () => {
      clearTimeout(id);
      cancelAnimationFrame(raf);
    };
  }, [demo, pair.id]);

  const style = pair.pos ? { objectPosition: pair.pos } : undefined;
  return (
    <div
      ref={box}
      className="relative w-full aspect-[4/3] md:aspect-[16/9] rounded-[28px] overflow-hidden select-none cursor-ew-resize touch-pan-y bg-sand"
      onPointerDown={(e) => {
        dragging.current = true;
        touched.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        move(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && move(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
    >
      <img {...img(pair.right, { sizes: "(max-width: 1200px) 100vw, 1100px" })} alt={pair.r} style={style} className="absolute inset-0 w-full h-full object-cover" draggable={false} />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img {...img(pair.left, { sizes: "(max-width: 1200px) 100vw, 1100px" })} alt={pair.l} style={style} className="absolute inset-0 w-full h-full object-cover" draggable={false} />
      </div>

      <span className="absolute left-4 top-4 rounded-full bg-ink/80 px-4 py-2 text-[14px] font-semibold text-white">{pair.l}</span>
      <span className="absolute right-4 top-4 rounded-full bg-cognac px-4 py-2 text-[14px] font-semibold text-white">{pair.r}</span>

      <div className="absolute inset-y-0 w-[3px] -ml-[1.5px] bg-white shadow-[0_0_16px_rgba(0,0,0,0.35)]" style={{ left: `${pos}%` }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
          <div className="h-14 w-14 rounded-full bg-white shadow-xl flex items-center justify-center">
            <MoveHorizontal className="h-6 w-6 text-navy" />
          </div>
        </div>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={Math.round(pos)}
        onChange={(e) => {
          touched.current = true;
          setPos(+e.target.value);
        }}
        aria-label={`Сравнение: ${pair.l} и ${pair.r}`}
        className="sr-only"
      />
    </div>
  );
}

export default function Showcase() {
  const [tab, setTab] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30% 0px" });
  const pair = PAIRS[tab];

  return (
    <section id="compare" className="w-full px-5 md:px-8 py-24 md:py-32 bg-paper relative overflow-hidden">
      <div ref={ref} className="max-w-6xl mx-auto">
        <SectionHeader
          title="Сравните сами: до и после"
          lead="Потяните ползунок влево и вправо, чтобы увидеть разницу."
          action={
            <div className="flex w-fit max-w-full overflow-x-auto no-scrollbar gap-1 rounded-full bg-white p-1 border border-navy/10">
              {PAIRS.map((x, i) => (
                <button
                  key={x.id}
                  onClick={() => setTab(i)}
                  className={"relative shrink-0 whitespace-nowrap rounded-full px-4 md:px-5 py-2.5 text-[14px] font-semibold transition-colors " + (tab === i ? "text-white" : "text-navy/65 hover:text-navy")}
                >
                  {tab === i && <motion.span layoutId="showcase-pill" className="absolute inset-0 rounded-full bg-navy" />}
                  <span className="relative">{x.label}</span>
                </button>
              ))}
            </div>
          }
        />
        <Compare key={pair.id} pair={pair} demo={inView} />
        <p className="mt-6 t-lead text-navy/70 max-w-[620px]">{pair.text}</p>
      </div>
    </section>
  );
}
