"use client";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, Phone, X } from "lucide-react";
import Logo from "@/components/Logo";
import { useLead } from "@/components/lead/LeadModal";
import { SITE, asset } from "@/lib/site";

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
  { v: "24 ч", l: "смета после замера" },
  { v: "±10%", l: "точность сметы" },
];

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { open } = useLead();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 0.7;
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openCalc = () =>
    open({
      offer: "calc",
      source: "Первый экран — Рассчитать стоимость",
      title: "Рассчитаем стоимость ремонта",
      subtitle: "Ответьте на 3 вопроса — подготовим предварительный расчёт и предложим время замера.",
      cta: "Получить расчёт",
      image: "/img/hero.jpg",
    });
  const openMeasure = () =>
    open({
      offer: "measure",
      source: "Первый экран — Записаться на замер",
      title: "Запишитесь на замер",
      subtitle: "Проектный менеджер приедет на объект, а смету вы получите в течение 24 часов после замера.",
      cta: "Записаться на замер",
      image: "/img/process.jpg",
    });

  return (
    <section className="min-h-[100svh] md:min-h-[108vh] flex flex-col bg-ink relative w-full overflow-hidden">
      {/* Видео-фон */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        poster={asset("/img/hero.jpg")}
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src={asset("/video/hero.mp4")} type="video/mp4" />
      </video>
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-ink/70 via-ink/35 to-ink/85" />
      <div className="absolute inset-0 z-[1] pattern-grid-light opacity-40" />

      {/* Навигация */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 inset-x-0 z-50 px-3 md:px-8 pt-3 md:pt-5"
      >
        <div
          className={
            "max-w-6xl mx-auto flex items-center justify-between p-[8px] md:p-[10px] rounded-full backdrop-blur-xl border transition-all duration-500 " +
            (scrolled ? "bg-navy/85 border-white/10 shadow-2xl shadow-ink/30" : "bg-white/5 border-white/10")
          }
        >
          <a href="#top" className="flex-1 flex items-center pl-4 whitespace-nowrap">
            <Logo color="#FFFFFF" size={0.95} />
          </a>
          <div className="hidden lg:flex items-center gap-7">
            {NAV.map((item) => (
              <a key={item.href} href={item.href} className="text-[14px] font-medium text-white/70 hover:text-white transition-colors relative group">
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cognac transition-all group-hover:w-full" />
              </a>
            ))}
          </div>
          <div className="flex-1 flex items-center justify-end gap-2 whitespace-nowrap">
            <a href={SITE.phoneHref} className="hidden md:flex items-center gap-2 text-[14px] font-semibold text-white/85 hover:text-white px-3 py-2">
              <Phone className="h-4 w-4 text-cognac" />
              {SITE.phone}
            </a>
            <button
              onClick={openMeasure}
              className="hidden sm:block rounded-full px-5 py-2.5 text-[14px] font-semibold bg-white text-navy hover:bg-cognac hover:text-white transition-all hover:scale-105 active:scale-95"
            >
              Записаться на замер
            </button>
            <a href={SITE.phoneHref} aria-label="Позвонить" className="sm:hidden h-10 w-10 rounded-full bg-cognac text-white flex items-center justify-center">
              <Phone className="h-4 w-4" />
            </a>
            <button onClick={() => setMenu(true)} aria-label="Меню" className="lg:hidden h-10 w-10 rounded-full bg-white/10 text-white flex items-center justify-center">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Мобильное меню */}
      <AnimatePresence>
        {menu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-ink/95 backdrop-blur-xl flex flex-col p-6"
          >
            <div className="flex items-center justify-between">
              <Logo color="#FFFFFF" />
              <button onClick={() => setMenu(false)} aria-label="Закрыть меню" className="h-11 w-11 rounded-full bg-white/10 text-white flex items-center justify-center">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 flex flex-col justify-center gap-6">
              {NAV.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenu(false)}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="text-[32px] font-bold text-white"
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
            <a href={SITE.phoneHref} className="text-[20px] font-semibold text-white mb-4">{SITE.phone}</a>
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

      <div id="top" className="relative flex-1 flex flex-col items-center justify-center text-center px-5 pt-[130px] md:pt-[160px] pb-12 z-10">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-4 py-2 text-[12px] md:text-[13px] font-medium text-white/90 mb-7"
        >
          <span className="h-2 w-2 rounded-full bg-cognac animate-pulse" />
          Красноярск · дизайн и ремонт под ключ · с 2012 года
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="font-extrabold text-[38px] sm:text-5xl md:text-6xl lg:text-[72px] leading-[1.04] tracking-[-0.025em] text-white max-w-5xl mb-6"
        >
          Ремонт квартир под ключ
          <br className="hidden sm:block" /> в Красноярске{" "}
          <span className="relative inline-block whitespace-nowrap text-cognac">
            от 20 000 ₽/м²
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, delay: 0.8, ease: "easeOut" }}
              className="absolute left-0 right-0 -bottom-1 md:-bottom-2 h-[3px] md:h-[5px] bg-cognac/70 origin-left rounded-full"
            />
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="text-[16px] md:text-[19px] text-white/85 max-w-[640px] leading-relaxed mb-9"
        >
          Разработаем дизайн-проект и сами реализуем его — или выполним ремонт по вашему проекту и без дизайн-проекта.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto"
        >
          <button
            onClick={openCalc}
            className="group w-full sm:w-auto flex items-center justify-between gap-4 rounded-full bg-cognac text-white p-1.5 pl-7 text-[15px] md:text-base font-semibold shadow-2xl shadow-cognac/30 hover:scale-[1.03] active:scale-95 transition-transform"
          >
            Рассчитать стоимость ремонта
            <span className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-cognac transition-colors">
              <ArrowRight className="h-5 w-5" />
            </span>
          </button>
          <button
            onClick={openMeasure}
            className="w-full sm:w-auto rounded-full px-8 py-[18px] text-[15px] md:text-base font-semibold bg-white/10 backdrop-blur-lg border border-white/25 text-white hover:bg-white/20 transition-all hover:scale-[1.03] active:scale-95"
          >
            Записаться на замер
          </button>
        </motion.div>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-[13px] text-white/65"
        >
          Получите смету в течение 24 часов после замера
        </motion.span>

        {/* Факты вместо логотипов */}
        <motion.div
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.6 } } }}
          initial="hidden"
          animate="show"
          className="mt-14 md:mt-20 w-full max-w-5xl grid grid-cols-2 md:grid-cols-4 rounded-[24px] border border-white/15 bg-white/[0.06] backdrop-blur-xl overflow-hidden"
        >
          {FACTS.map((f, i) => (
            <motion.div
              key={f.l}
              variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
              className={
                "px-5 py-5 md:py-6 text-left border-white/10 " +
                (i % 2 === 0 ? "border-r " : "md:border-r ") +
                (i < 2 ? "border-b md:border-b-0 " : "") +
                (i === 3 ? "md:border-r-0" : "")
              }
            >
              <div className="text-[26px] md:text-[34px] font-extrabold text-white leading-none">{f.v}</div>
              <div className="mt-2 text-[12px] md:text-[13px] text-white/60">{f.l}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
