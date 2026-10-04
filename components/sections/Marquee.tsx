"use client";
import React from "react";
import { motion } from "framer-motion";
import { asset } from "@/lib/site";

const WORDS = ["Дизайн-проект", "Черновые работы", "Электрика", "Сантехника", "Чистовая отделка", "Комплектация", "Сдача и гарантия"];
const PHOTOS = ["/img/kitchen.jpg", "/img/bedroom.jpg", "/img/bath.jpg", "/img/hall.jpg", "/img/office.jpg", "/img/studio.jpg"];

// Бегущая строка услуг + лента интерьеров
export default function Marquee() {
  const row = [...WORDS, ...WORDS];
  const pics = [...PHOTOS, ...PHOTOS];
  return (
    <section className="bg-navy py-10 md:py-14 overflow-hidden relative" aria-label="Что входит в ремонт под ключ">
      <div className="absolute inset-0 pattern-grid-light" />
      <motion.div
        className="relative flex gap-10 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-10 text-[34px] md:text-[64px] font-extrabold tracking-[-0.02em] text-white/90">
            {w}
            <span className="h-3 w-3 md:h-4 md:w-4 rotate-45 bg-cognac" />
          </span>
        ))}
      </motion.div>
      <motion.div
        className="relative mt-8 md:mt-10 flex gap-4"
        animate={{ x: ["-50%", "0%"] }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
      >
        {pics.map((p, i) => (
          <img key={i} src={asset(p)} alt="" loading="lazy" className="h-40 md:h-56 w-64 md:w-[360px] shrink-0 object-cover rounded-[20px]" />
        ))}
      </motion.div>
    </section>
  );
}
