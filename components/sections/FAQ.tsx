"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Calculator, Route, FileSignature, ArrowRight } from "lucide-react";
import { useLead } from "@/components/lead/LeadModal";
import { asset } from "@/lib/site";

type Item = { q: string; a: string };

const DATA: Record<string, Item[]> = {
  price: [
    { q: "Сколько стоит ремонт квартиры под ключ?", a: "Ремонт квартир под ключ — от 20 000 ₽/м². Средний бюджет проекта — ориентировочно от 2,7 млн ₽. Точную стоимость показывает смета после замера." },
    { q: "Как быстро я получу смету?", a: "В течение 24 часов после замера. Мы не просто отправляем файл — презентуем смету и объясняем, из чего складывается каждая позиция." },
    { q: "Насколько точна смета? Не вырастет ли она?", a: "Ориентир по точности сметы — ±10%. Состав работ, решения и бюджет фиксируем до начала соответствующих этапов, поэтому изменения возможны только по согласованию с вами." },
    { q: "Сколько стоит дизайн-проект?", a: "1 900 / 2 700 / 3 500 ₽ за м² — в зависимости от состава услуги. Дизайн-проект разрабатываем с последующей реализацией нашей командой." },
    { q: "Какие акции сейчас действуют?", a: "Раковина из керамогранита в подарок, дизайн-проект в подарок или скидка 5% за раннее планирование. Действует одно предложение на договор; сроки и условия подтверждает менеджер." },
  ],
  process: [
    { q: "Можно ли сделать ремонт без дизайн-проекта?", a: "Да. Состав работ, решения и бюджет фиксируем до начала соответствующих этапов — вы заранее знаете, что получите." },
    { q: "Вы работаете по проекту моего дизайнера?", a: "Да, реализуем проекты сторонних дизайнеров и проекты, с которыми приходит заказчик." },
    { q: "Кто будет моим контактом во время ремонта?", a: "Персональный проектный менеджер — единая точка ответственности. Рабочий чат, график проекта, регулярные отчёты." },
    { q: "Можно посмотреть ваши объекты до договора?", a: "Да. Организуем экскурсию на объект в работе — с трансфером при необходимости — или встречу на готовом объекте. На действующем объекте можно обсудить решения с проектным менеджером." },
    { q: "С какими объектами вы работаете?", a: "Квартиры в новостройках и вторичном жилье, дома и коммерческие объекты. Работаем в Красноярске, выезд за город — по согласованию." },
  ],
  contract: [
    { q: "Что фиксируется в договоре?", a: "Объём работ, смета, сроки и обязательства сторон. Условия и сроки гарантии также закрепляются в договоре." },
    { q: "Как происходит оплата?", a: "Оплата поэтапная и привязана к ходу работ — вы платите за выполненные этапы." },
    { q: "Как я узнаю, что работы идут по графику?", a: "График согласуем до старта. ПМ присылает отчёты по этапам в рабочий чат, а ключевые этапы фиксируются документально." },
    { q: "Что происходит после сдачи объекта?", a: "Принимаем объект вместе с вами и сопровождаем в гарантийный период на условиях договора." },
  ],
};

const TABS = [
  { id: "price", label: "Стоимость и смета", icon: Calculator },
  { id: "process", label: "Процесс", icon: Route },
  { id: "contract", label: "Договор и оплата", icon: FileSignature },
];

export default function FAQ() {
  const [tab, setTab] = useState("price");
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const { open } = useLead();

  return (
    <section id="faq" className="bg-paper py-24 md:py-28 px-5 md:px-8 relative">
      <div className="absolute inset-0 pattern-dots opacity-50 pointer-events-none" />
      <div className="relative max-w-[820px] mx-auto">
        <div className="text-center mb-10">
          <p className="text-[12px] uppercase tracking-[0.18em] font-semibold text-cognac mb-4">Вопросы</p>
          <h2 className="text-[34px] md:text-[48px] font-bold text-navy leading-tight tracking-[-0.02em]">Отвечаем честно и по делу</h2>
        </div>

        <div className="flex justify-start md:justify-center gap-2 border-b border-navy/10 mb-6 overflow-x-auto no-scrollbar">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setTab(t.id);
                setOpenIdx(0);
              }}
              className={
                "inline-flex items-center gap-2 px-4 md:px-5 py-3 text-[14px] md:text-[15px] border-b-2 whitespace-nowrap transition-all " +
                (tab === t.id ? "text-navy font-semibold border-cognac" : "text-navy/50 font-medium border-transparent hover:text-navy")
              }
            >
              <t.icon className={"h-4 w-4 " + (tab === t.id ? "text-cognac" : "")} />
              {t.label}
            </button>
          ))}
        </div>

        <div>
          {DATA[tab].map((item, i) => (
            <div key={tab + i} className="border-b border-navy/10 py-5">
              <button onClick={() => setOpenIdx(openIdx === i ? null : i)} className="w-full flex justify-between items-center gap-4 text-left">
                <span className="text-[16px] md:text-[17px] font-semibold text-navy">{item.q}</span>
                <motion.span animate={{ rotate: openIdx === i ? 45 : 0 }} className={"h-9 w-9 shrink-0 rounded-full flex items-center justify-center transition-colors " + (openIdx === i ? "bg-cognac text-white" : "bg-white text-navy")}>
                  <Plus className="h-5 w-5" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {openIdx === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                    <p className="pt-3 pr-12 text-[15px] text-navy/65 leading-[1.7]">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-[24px] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-navy/10">
          <div className="flex items-center gap-4">
            <img src={asset("/img/tour.jpg")} alt="" className="h-14 w-14 rounded-full object-cover object-[30%_30%] border-2 border-white shadow" />
            <div>
              <p className="font-semibold text-[16px] text-navy">Остались вопросы?</p>
              <p className="text-[14px] text-navy/55">Проектный менеджер ответит лично</p>
            </div>
          </div>
          <button
            onClick={() =>
              open({
                offer: "consult",
                source: "FAQ — Задать вопрос",
                title: "Задайте вопрос менеджеру",
                subtitle: "Оставьте контакты — перезвоним и ответим на ваши вопросы по ремонту.",
                cta: "Жду звонка",
                image: "/img/office.jpg",
              })
            }
            className="group bg-navy text-white rounded-full pl-6 pr-1.5 py-1.5 text-[15px] font-semibold hover:bg-cognac transition-colors flex items-center gap-3"
          >
            Задать вопрос
            <span className="h-10 w-10 rounded-full bg-white/15 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
              <ArrowRight className="h-4 w-4" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
