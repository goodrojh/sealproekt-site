"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Phone } from "lucide-react";
import { useLead } from "@/components/lead/LeadModal";
import { SITE } from "@/lib/site";

// Липкая панель для телефона: звонок, WhatsApp, расчёт
export default function MobileBar() {
  const [show, setShow] = useState(false);
  const { open } = useLead();
  useEffect(() => {
    let t = false;
    const f = () => {
      if (t) return;
      t = true;
      requestAnimationFrame(() => {
        setShow(window.scrollY > window.innerHeight * 0.8);
        t = false;
      });
    };
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className="md:hidden fixed bottom-3 inset-x-3 z-40 flex gap-2 rounded-full bg-navy p-1.5 shadow-2xl shadow-ink/40 border border-white/10"
        >
          <a href={SITE.phoneHref} aria-label="Позвонить" className="h-12 w-12 shrink-0 rounded-full bg-white/10 flex items-center justify-center text-white">
            <Phone className="h-5 w-5" />
          </a>
          <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="h-12 w-12 shrink-0 rounded-full bg-white/10 flex items-center justify-center text-white">
            <MessageCircle className="h-5 w-5" />
          </a>
          <button
            onClick={() =>
              open({
                offer: "calc",
                source: "Мобильная панель — Рассчитать",
                title: "Рассчитаем стоимость ремонта",
                subtitle: "Ответьте на 3 вопроса — подготовим предварительный расчёт.",
                cta: "Получить расчёт",
                image: "/img/hero.jpg",
              })
            }
            className="flex-1 rounded-full bg-cognac text-white text-[16px] font-semibold"
          >
            Рассчитать стоимость
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
