"use client";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, Phone, X } from "lucide-react";
import Logo from "@/components/Logo";
import { useLead } from "@/components/lead/LeadModal";
import { OFFERS, OfferId, PROMO_IDS, SITE, asset, imgUrl } from "@/lib/site";

const NAV = [
  { label: "Форматы", href: "#formats" },
  { label: "Как работаем", href: "#process" },
  { label: "Стоимость", href: "#calc" },
  { label: "Объекты", href: "#cases" },
  { label: "Вопросы", href: "#faq" },
];

const FACTS = [
  { v: "с 2012", l: "работаем в Красноярске" },
  { v: SITE.objects, l: "реализованных объектов" },
  { v: "24 ч", l: "смета после замера" },
  { v: "±10%", l: "точность сметы" },
];

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { open } = useLead();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [promo, setPromo] = useState<OfferId | null>(null);

  useEffect(() => {
    // Рекламная связка: ?offer=sink | design-gift | early5 — первый экран ведёт на форму этого оффера
    const p = new URLSearchParams(window.location.search).get("offer") as OfferId | null;
    if (p && PROMO_IDS.includes(p)) setPromo(p);

    // Видео: лёгкая версия для телефонов, пауза вне экрана, без видео при экономии трафика
    const v = videoRef.current;
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    let io: IntersectionObserver | undefined;
    if (v && !nav.connection?.saveData && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.src = asset(window.innerWidth < 768 ? "/video/hero-mobile.mp4" : "/video/hero.mp4");
      v.playbackRate = 0.7;
      io = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      });
      io.observe(v);
    }

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
    return () => {
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
  }, [menu]);

  const openCalc = () =>
    promo
      ? open({
          offer: promo,
          source: `Первый экран — рекламная связка «${OFFERS[promo].label}»`,
          title: OFFERS[promo].cta,
          subtitle: OFFERS[promo].result,
          cta: "Получить предложение",
          image: "/img/hero.jpg",
        })
      : open({
          offer: "calc",
          source: "Первый экран — Рассчитать стоимость",
          title: "Рассчитаем стоимость ремонта",
          subtitle: "Ответьте на несколько вопросов — подготовим предварительный расчёт и предложим время замера.",
          cta: "Получить расчёт",
          image: "/img/hero.jpg",
        });
  const openMeasure = () =>
    open({
      offer: "measure",
      source: "Первый экран — Записаться на замер",
      title: "Запишитесь на замер",
      subtitle: "Проектный менеджер приедет на объект, а смету вы получите в течение 24 часов после замера.",
      cta: "Записаться на замер",
      image: "/img/process.jpg",
    });

  return (
    <section className="min-h-[100svh] md:min-h-[105vh] flex flex-col bg-ink relative w-full overflow-hidden">
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="none"
        poster={imgUrl("/img/hero.jpg", 1600)}
        className="absolute inset-0 w-full h-full object-cover z-0"
        aria-hidden
      />
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-ink/70 via-ink/35 to-ink/85" />

      {/* Навигация */}
      <nav className="fixed top-0 inset-x-0 z-50 px-3 md:px-8 pt-3 md:pt-5">
        <div
          className={
            "max-w-6xl mx-auto flex items-center justify-between py-2 pr-2 pl-5 md:py-2.5 md:pr-2.5 md:pl-6 rounded-full border transition-colors duration-300 " +
            (scrolled ? "bg-navy/95 border-white/10 shadow-xl shadow-ink/30" : "bg-ink/20 border-white/10 md:backdrop-blur-md")
          }
        >
          <a href="#top" className="flex items-center shrink-0" aria-label="СЕАЛ ПРОЕКТ — наверх">
            <Logo color="white" width={110} />
          </a>
          <div className="hidden lg:flex items-center gap-6 xl:gap-8 whitespace-nowrap">
            {NAV.map((item) => (
              <a key={item.href} href={item.href} className="text-[15px] font-medium text-white/75 hover:text-white transition-colors relative group">
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cognac transition-all group-hover:w-full" />
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={SITE.phoneHref}
              className="hidden sm:flex items-center gap-2.5 rounded-full bg-white text-navy pl-2 pr-5 py-2 text-[15px] font-semibold hover:bg-cognac hover:text-white transition-colors whitespace-nowrap"
            >
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

      {/* Мобильное меню */}
      <AnimatePresence>
        {menu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-ink flex flex-col p-6"
          >
            <div className="flex items-center justify-between">
              <Logo color="white" width={110} />
              <button onClick={() => setMenu(false)} aria-label="Закрыть меню" className="h-11 w-11 rounded-full bg-white/10 text-white flex items-center justify-center">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 flex flex-col justify-center gap-6">
              {NAV.map((item) => (
                <a key={item.href} href={item.href} onClick={() => setMenu(false)} className="t-section text-white">
                  {item.label}
                </a>
              ))}
            </div>
            <a href={SITE.phoneHref} className="t-h4 text-white mb-4">{SITE.phone}</a>
            <button
              onClick={() => {
                setMenu(false);
                openMeasure();
              }}
              className="rounded-full bg-cognac text-white py-4 font-semibold"
            >
              Записаться на замер
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div id="top" className="relative flex-1 flex flex-col items-center justify-center text-center px-5 pt-[120px] md:pt-[150px] pb-10 z-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="t-h1 text-white max-w-3xl mb-6"
        >
          Ремонт квартир под ключ в Красноярске <span className="text-cognac whitespace-nowrap">от 20 000 ₽/м²</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="t-lead text-white/85 max-w-[640px] mb-9"
        >
          Разработаем дизайн-проект и сами реализуем его — или выполним ремонт по вашему проекту и без дизайн-проекта.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto"
        >
          <button
            onClick={openCalc}
            className="group w-full sm:w-auto flex items-center justify-between gap-4 rounded-full bg-cognac text-white p-1.5 pl-7 text-[16px] font-semibold shadow-xl shadow-ink/30 hover:brightness-105 active:scale-[0.98] transition"
          >
            <span className="text-left">{promo ? OFFERS[promo].cta : "Рассчитать стоимость ремонта"}</span>
            <span className="h-12 w-12 shrink-0 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-cognac transition-colors">
              <ArrowRight className="h-5 w-5" />
            </span>
          </button>
          <button
            onClick={openMeasure}
            className="w-full sm:w-auto rounded-full px-8 py-[18px] text-[16px] font-semibold bg-white/10 border border-white/30 text-white hover:bg-white/20 active:scale-[0.98] transition"
          >
            Записаться на замер
          </button>
        </motion.div>
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="mt-4 text-[14px] text-white/70">
          Получите смету в течение 24 часов после замера
        </motion.span>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-12 md:mt-20 w-full max-w-5xl grid grid-cols-2 md:grid-cols-4 rounded-[24px] border border-white/15 bg-ink/45 md:bg-white/[0.06] md:backdrop-blur-md overflow-hidden"
        >
          {FACTS.map((f, i) => (
            <div
              key={f.l}
              className={
                "px-5 py-5 md:py-6 text-left border-white/10 " +
                (i % 2 === 0 ? "border-r " : "md:border-r ") +
                (i < 2 ? "border-b md:border-b-0 " : "") +
                (i === 3 ? "md:border-r-0" : "")
              }
            >
              <div className="text-[26px] md:text-[32px] font-extrabold text-white leading-none">{f.v}</div>
              <div className="mt-2 text-[12px] md:text-[14px] text-white/65 leading-snug">{f.l}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
