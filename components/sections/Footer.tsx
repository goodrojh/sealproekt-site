"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import Logo from "@/components/Logo";
import { useLead } from "@/components/lead/LeadModal";
import { SITE, imgUrl } from "@/lib/site";

export default function Footer() {
  const { open } = useLead();
  const year = new Date().getFullYear();

  return (
    <section id="contacts" className="w-full bg-white pb-20 md:pb-0">
      <div className="m-2 rounded-[24px] overflow-hidden relative min-h-[100svh] md:min-h-[860px] flex flex-col">
        <div className="absolute inset-0 z-0" style={{ backgroundImage: `url('${imgUrl("/img/night.jpg", 1600)}')`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="absolute inset-0 z-0 bg-ink/45" />

        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-5 md:px-20 pt-24 pb-10 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="t-h1 text-white max-w-4xl"
          >
            Ремонт — наша работа.
            <br /> <span className="text-cognac">Не ваша.</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="mt-6 t-lead text-white/85 max-w-xl">
            Запишитесь на замер — смету получите в течение 24 часов после него.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.35 }} className="mt-10 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              onClick={() =>
                open({
                  offer: "measure",
                  source: "Финальный экран — Записаться на замер",
                  title: "Запишитесь на замер",
                  subtitle: "Смета — в течение 24 часов после замера, с личной презентацией.",
                  cta: "Записаться на замер",
                  image: "/img/night.jpg",
                })
              }
              className="group flex items-center justify-between gap-4 rounded-full bg-cognac text-white p-1.5 pl-7 text-[16px] font-semibold hover:scale-[1.03] transition-transform"
            >
              Записаться на замер
              <span className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-cognac transition-colors">
                <ArrowRight className="h-5 w-5" />
              </span>
            </button>
            <button
              onClick={() =>
                open({
                  offer: "calc",
                  askOffer: true,
                  source: "Финальный экран — Расчёт + акция",
                  title: "Расчёт стоимости + подарок",
                  subtitle: "Выберите одно из предложений и оставьте данные по объекту.",
                  cta: "Получить расчёт",
                  image: "/img/bath.jpg",
                })
              }
              className="rounded-full px-8 py-[18px] text-[16px] font-semibold bg-white/10 border border-white/30 text-white hover:bg-white/20 transition-colors"
            >
              Расчёт + подарок на выбор
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative z-10 bg-ink/70 md:bg-white/10 md:backdrop-blur-xl border border-white/20 rounded-[24px] mx-3 md:mx-5 mb-3 md:mb-5 p-6 md:p-10"
        >
          <div className="flex flex-col md:flex-row justify-between gap-10">
            <div className="md:w-[32%]">
              <Logo color="white" variant="full" width={170} />
              <p className="mt-5 text-white/70 text-[14px] leading-[1.5] max-w-[300px]">
                Ремонт квартир под ключ в Красноярске с 2012 года. Дизайн-проект и реализация в одной команде.
              </p>
            </div>
            <div>
              <h4 className="text-white text-[16px] font-medium mb-4">Услуги</h4>
              <ul className="space-y-2">
                {[
                  ["Ремонт под ключ", "#formats"],
                  ["Дизайн-проект", "#design"],
                  ["Ремонт по готовому проекту", "#formats"],
                  ["Калькулятор стоимости", "#calc"],
                ].map(([l, h]) => (
                  <li key={l}>
                    <a href={h} className="text-white/75 text-[14px] hover:text-white transition-colors">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white text-[16px] font-medium mb-4">О компании</h4>
              <ul className="space-y-2">
                {[
                  ["Как мы работаем", "#process"],
                  ["Объекты", "#cases"],
                  ["Предложения", "#offers"],
                  ["Вопросы и ответы", "#faq"],
                ].map(([l, h]) => (
                  <li key={l}>
                    <a href={h} className="text-white/75 text-[14px] hover:text-white transition-colors">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white text-[16px] font-medium mb-4">Контакты</h4>
              <ul className="space-y-3 text-[14px]">
                <li>
                  <a href={SITE.phoneHref} className="flex items-center gap-2 text-white hover:text-cognac transition-colors font-semibold text-[15px]">
                    <Phone className="h-4 w-4 text-cognac" /> {SITE.phone}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 text-white/70 hover:text-white">
                    <Mail className="h-4 w-4 text-cognac" /> {SITE.email}
                  </a>
                </li>
                <li className="flex items-center gap-2 text-white/70">
                  <MapPin className="h-4 w-4 text-cognac" /> {SITE.address}
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-5 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-white/60 text-[12px]">© 2012–{year} ООО «СЕАЛ ПРОЕКТ» · {SITE.domain}</span>
            <div className="flex items-center gap-3">
              <span className="text-white/60 text-[12px]">Напишите нам:</span>
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors">
                <MessageCircle className="h-4 w-4 text-white" />
              </a>
              <a href={SITE.phoneHref} aria-label="Позвонить" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors">
                <Phone className="h-4 w-4 text-white" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
