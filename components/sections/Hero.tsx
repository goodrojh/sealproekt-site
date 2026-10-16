"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Menu, Phone, Star, X } from "lucide-react";
import Logo from "@/components/Logo";
import { useLead } from "@/components/lead/LeadModal";
import { CTA_MAIN, OFFERS, SITE, img } from "@/lib/site";

const NAV = [
  { label: "Объекты", href: "#cases" },
  { label: "Расчёт", href: "#form" },
  { label: "Преимущества", href: "#advantages" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Этапы", href: "#process" },
];

// Что клиенту больше не нужно делать самому (бриф: «ремонт не должен становиться второй работой»)
const TAKE_OVER = ["Контроль рабочих", "Закупка материалов", "Соблюдение сроков"];

export default function Hero() {
  const { open, promo } = useLead();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 40);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
  }, [menu]);

  const cta = () =>
    open({
      source: "Первый экран",
      subtitle: "Ответьте на несколько вопросов — подготовим предварительный расчёт и согласуем замер.",
      image: "/img/cb00.jpg",
    });

  return (
    <section className="min-h-[100svh] flex flex-col bg-ink relative w-full overflow-hidden">
      {/* Реальный объект: квартира 102 м², ул. Авиаторов */}
      <img {...img("/img/cb00.jpg", { eager: true, sizes: "100vw" })} fetchPriority="high" alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/75 via-ink/45 to-ink/85" />

      <nav className="fixed top-0 inset-x-0 z-50 px-3 md:px-8 pt-3 md:pt-5">
        <div
          className={
            "max-w-6xl mx-auto flex items-center justify-between py-2 pr-2 pl-5 md:py-2.5 md:pr-2.5 md:pl-6 rounded-full border transition-colors duration-300 " +
            (scrolled ? "bg-navy/95 border-white/10 shadow-xl shadow-ink/30" : "bg-ink/30 border-white/10 md:backdrop-blur-md")
          }
        >
          <a href="#top" className="flex items-center shrink-0" aria-label="СЕАЛ ПРОЕКТ — наверх">
            <Logo color="white" width={110} />
          </a>
          <div className="hidden lg:flex items-center gap-6 xl:gap-8 whitespace-nowrap">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  if (item.href === "#form") {
                    e.preventDefault();
                    open({ source: "Меню — Расчёт" });
                  }
                }}
                className="text-[15px] font-medium text-white/75 hover:text-white transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cognac transition-all group-hover:w-full" />
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <a href={SITE.phoneHref} className="hidden sm:flex items-center gap-2.5 rounded-full bg-white text-navy pl-2 pr-5 py-2 text-[15px] font-semibold hover:bg-cognac hover:text-white transition-colors whitespace-nowrap">
              <span className="h-8 w-8 rounded-full bg-cognac text-white flex items-center justify-center">
                <Phone className="h-4 w-4" />
              </span>
              {SITE.phone}
            </a>
            <a href={SITE.phoneHref} aria-label={`Позвонить ${SITE.phone}`} className="sm:hidden h-11 w-11 rounded-full bg-cognac text-white flex items-center justify-center">
              <Phone className="h-5 w-5" />
            </a>
            <button onClick={() => setMenu(true)} aria-label="Открыть меню" className="lg:hidden h-11 w-11 rounded-full bg-white/10 text-white flex items-center justify-center">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {menu && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="fixed inset-0 z-[60] bg-ink flex flex-col p-6">
            <div className="flex items-center justify-between">
              <Logo color="white" width={110} />
              <button onClick={() => setMenu(false)} aria-label="Закрыть меню" className="h-11 w-11 rounded-full bg-white/10 text-white flex items-center justify-center">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 flex flex-col justify-center gap-6">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    setMenu(false);
                    if (item.href === "#form") {
                      e.preventDefault();
                      open({ source: "Мобильное меню — Расчёт" });
                    }
                  }}
                  className="t-section text-white"
                >
                  {item.label}
                </a>
              ))}
            </div>
            <a href={SITE.phoneHref} className="t-h4 text-white mb-4">
              {SITE.phone}
            </a>
            <button
              onClick={() => {
                setMenu(false);
                open({ source: "Мобильное меню" });
              }}
              className="rounded-full bg-cognac text-white py-4 font-semibold"
            >
              {CTA_MAIN}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div id="top" className="relative z-10 flex-1 flex flex-col justify-center max-w-6xl w-full mx-auto px-5 md:px-8 pt-[120px] md:pt-[150px] pb-10">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="t-h1 text-white max-w-3xl">
          Ремонт квартир под ключ в Красноярске <span className="text-cognac whitespace-nowrap">от 20 000 ₽/м²</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="mt-6 t-lead text-white/90 max-w-[620px]">
          Полностью берём на себя управление ремонтом — вам не придётся самостоятельно контролировать рабочих, закупки и сроки. Разработаем дизайн-проект и реализуем его или выполним ремонт по вашему проекту.
        </motion.p>

        <motion.ul initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.18 }} className="mt-6 flex flex-wrap gap-2">
          {TAKE_OVER.map((t) => (
            <li key={t} className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-2 text-[14px] font-medium text-white">
              <Check className="h-4 w-4 text-cognac" strokeWidth={3} />
              {t} — на нас
            </li>
          ))}
        </motion.ul>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.26 }} className="mt-9 flex flex-col sm:flex-row sm:items-center gap-4">
          <button onClick={cta} className="group w-full sm:w-auto flex items-center justify-between gap-4 rounded-full bg-cognac text-white p-1.5 pl-7 text-[16px] font-semibold shadow-xl shadow-ink/30 hover:brightness-105 active:scale-[0.98] transition">
            <span className="text-left">{promo ? OFFERS[promo].cta : CTA_MAIN}</span>
            <span className="h-12 w-12 shrink-0 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-cognac transition-colors">
              <ArrowRight className="h-5 w-5" />
            </span>
          </button>
          <span className="text-[14px] text-white/75">Смета — в течение 24 часов после замера</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 md:mt-16 grid grid-cols-3 rounded-[24px] border border-white/15 bg-ink/50 md:bg-white/[0.06] md:backdrop-blur-md overflow-hidden"
        >
          {[
            { v: "с 2012", l: "ремонтируем квартиры в Красноярске" },
            { v: <span className="inline-flex items-center gap-1.5">{SITE.rating2gis.value}<Star className="h-6 w-6 fill-cognac text-cognac" /></span>, l: `рейтинг в 2ГИС, ${SITE.rating2gis.votes} оценок` },
            { v: SITE.objects, l: "реализованных объектов" },
          ].map((f, i) => (
            <div key={i} className={"px-3 sm:px-5 py-5 md:py-6 border-white/10 " + (i < 2 ? "border-r" : "")}>
              <div className="text-[22px] sm:text-[26px] md:text-[32px] font-extrabold text-white leading-none">{f.v}</div>
              <div className="mt-2 text-[12px] md:text-[14px] text-white/70 leading-snug">{f.l}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
