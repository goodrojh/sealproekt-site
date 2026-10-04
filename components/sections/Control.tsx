"use client";
import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { CheckCheck, FileText, MessagesSquare, ClipboardList, UserRound, Wallet } from "lucide-react";
import { asset } from "@/lib/site";

const containerVariants: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const cardVariants: Variants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } };

const CHAT = [
  { me: false, t: "Добрый день! Закончили стяжку в спальне. Фотоотчёт ниже 👇", time: "10:42" },
  { me: false, photo: true, time: "10:42" },
  { me: true, t: "Отлично, спасибо! Когда электрика?", time: "10:55" },
  { me: false, t: "По графику — в четверг. Приёмку покажу на видео.", time: "10:57" },
];

const ESTIMATE = [
  { n: "Черновые работы", v: "612 000" },
  { n: "Электрика", v: "238 000" },
  { n: "Сантехника", v: "184 000" },
  { n: "Чистовая отделка", v: "746 000" },
];

const SCHEDULE = [
  { n: "Демонтаж и черновые", w: 100, s: 0 },
  { n: "Электрика и сантехника", w: 100, s: 18 },
  { n: "Стяжка и штукатурка", w: 72, s: 34 },
  { n: "Чистовая отделка", w: 0, s: 56 },
  { n: "Комплектация и сдача", w: 0, s: 78 },
];

export default function Control() {
  return (
    <section id="control" className="w-full px-5 md:px-8 py-24 md:py-32 bg-paper relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-steel/10 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cognac/10 rounded-full blur-[100px] translate-y-1/2 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 mb-14 text-center">
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-[12px] uppercase tracking-[0.18em] font-semibold text-cognac mb-4">
          Управляемый процесс
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-[34px] md:text-[48px] font-bold text-navy leading-[1.1] tracking-[-0.02em]"
        >
          Не набор подрядчиков,
          <br /> а система управления ремонтом
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-5 text-[16px] md:text-[18px] text-navy/60 max-w-2xl mx-auto"
        >
          Вы всегда знаете, что происходит на объекте, сколько это стоит и что будет дальше — без ежедневных поездок и звонков бригадирам.
        </motion.p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-6xl mx-auto relative z-10"
      >
        {/* Карточка 1 — ПМ */}
        <motion.div variants={cardVariants} whileHover={{ y: -5 }} className="rounded-[32px] p-6 md:p-7 flex flex-col gap-10 group relative overflow-hidden min-h-[460px]">
          <div className="absolute inset-0 z-0">
            <img src={asset("/img/tour.jpg")} alt="Проектный менеджер на объекте" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-b from-ink/75 via-ink/25 to-ink/75" />
          </div>
          <div className="relative z-10">
            <h3 className="text-[28px] md:text-[34px] font-bold text-white leading-[1.1] drop-shadow-lg">
              Один ответственный —
              <br />
              <span className="text-cognac">весь проект.</span>
            </h3>
            <p className="text-[15px] text-white/90 leading-relaxed max-w-[440px] mt-3">
              Персональный проектный менеджер — ваш главный контакт: от замера и сметы до сдачи объекта и гарантии.
            </p>
          </div>
          <div className="mt-auto grid grid-cols-1 sm:grid-cols-2 gap-3 relative z-10">
            {[
              { i: MessagesSquare, t: "Рабочий чат", d: "Вопросы и решения — в одном месте, без потерянных сообщений." },
              { i: ClipboardList, t: "Регулярные отчёты", d: "Фото и видео этапов, фиксация выполненных работ." },
            ].map((x) => (
              <div key={x.t} className="flex flex-col gap-3 p-5 rounded-[22px] bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 transition-colors">
                <div className="w-11 h-11 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center">
                  <x.i className="h-5 w-5 text-white" />
                </div>
                <span className="text-[14px] font-bold text-white">{x.t}</span>
                <p className="text-[12px] text-white/75 leading-relaxed">{x.d}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Карточка 2 — Чат */}
        <motion.div variants={cardVariants} whileHover={{ y: -5 }} className="bg-white rounded-[32px] border border-navy/10 p-6 md:p-7 flex flex-col overflow-hidden relative min-h-[460px]">
          <div className="absolute inset-0 pattern-grid opacity-70" />
          <div className="relative z-10 flex-1 flex items-center justify-center py-4">
            <div className="w-full max-w-[340px] bg-paper/90 backdrop-blur-xl border border-white rounded-[24px] shadow-2xl shadow-navy/10 overflow-hidden">
              <div className="flex items-center gap-3 px-4 py-3 bg-navy text-white">
                <div className="h-9 w-9 rounded-full bg-cognac flex items-center justify-center">
                  <UserRound className="h-4 w-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[13px] font-semibold">Проектный менеджер</span>
                  <span className="text-[10px] text-white/60">Квартира · 78 м² · этап 3 из 5</span>
                </div>
              </div>
              <div className="p-3 flex flex-col gap-2">
                {CHAT.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10, scale: 0.96 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.45 }}
                    className={"max-w-[82%] rounded-2xl text-[12px] leading-snug shadow-sm " + (m.me ? "self-end bg-cognac text-white rounded-br-md" : "self-start bg-white text-navy rounded-bl-md")}
                  >
                    {m.photo ? (
                      <div className="p-1">
                        <img src={asset("/img/process.jpg")} alt="" className="h-24 w-48 object-cover rounded-xl" />
                      </div>
                    ) : (
                      <div className="px-3 py-2">
                        {m.t}
                        <span className={"ml-2 inline-flex items-center gap-0.5 text-[9px] " + (m.me ? "text-white/70" : "text-navy/40")}>
                          {m.time} {m.me && <CheckCheck className="h-3 w-3" />}
                        </span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          <div className="relative z-10 pt-4">
            <h3 className="text-[20px] font-bold text-navy">Прозрачная коммуникация</h3>
            <p className="text-[14px] text-navy/60 leading-relaxed mt-2">Рабочий чат, график проекта, регулярные отчёты и понятная фиксация этапов.</p>
          </div>
        </motion.div>

        {/* Карточка 3 — Смета */}
        <motion.div variants={cardVariants} whileHover={{ y: -5 }} className="bg-white rounded-[32px] border border-navy/10 overflow-hidden flex flex-col">
          <div className="bg-paper h-80 relative flex items-center justify-center overflow-hidden border-b border-navy/10 p-6">
            <div className="absolute inset-0 pattern-diagonal opacity-60" />
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, 4, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-6 right-6 w-14 h-14 rounded-2xl bg-white/60 backdrop-blur-md border border-white shadow-xl flex items-center justify-center"
            >
              <Wallet className="h-6 w-6 text-cognac" />
            </motion.div>
            <div className="relative z-10 w-full max-w-[300px] bg-white rounded-2xl shadow-2xl shadow-navy/10 border border-navy/5 p-5">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="h-4 w-4 text-cognac" />
                <span className="text-[12px] font-bold text-navy">Смета · готова через 24 ч</span>
              </div>
              <div className="flex flex-col gap-2.5">
                {ESTIMATE.map((r, i) => (
                  <motion.div
                    key={r.n}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.12 }}
                    className="flex items-center justify-between text-[12px] border-b border-dashed border-navy/10 pb-2"
                  >
                    <span className="text-navy/70">{r.n}</span>
                    <span className="font-semibold text-navy">{r.v} ₽</span>
                  </motion.div>
                ))}
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-[10px] text-navy/50 mb-1.5">
                  <span>−10%</span>
                  <span className="font-semibold text-cognac">точность сметы</span>
                  <span>+10%</span>
                </div>
                <div className="relative h-2 rounded-full bg-navy/5 overflow-hidden">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.8 }}
                    className="absolute inset-y-0 left-[30%] right-[30%] bg-gradient-to-r from-cognac/60 via-cognac to-cognac/60 rounded-full origin-center"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 md:p-7">
            <h3 className="text-[20px] font-bold text-navy">Смету не просто отправляем — презентуем</h3>
            <p className="text-[15px] text-navy/60 leading-relaxed mt-2">
              Расчёт — в течение 24 часов после замера. Разбираем каждую позицию вместе с вами. Ориентир по точности — ±10%.
            </p>
          </div>
        </motion.div>

        {/* Карточка 4 — График */}
        <motion.div variants={cardVariants} whileHover={{ y: -5 }} className="bg-white rounded-[32px] border border-navy/10 overflow-hidden flex flex-col">
          <div className="bg-paper h-80 relative flex items-center justify-center border-b border-navy/10 p-6">
            <div className="absolute inset-0 pattern-dots" />
            <div className="relative z-10 w-full h-full bg-white/80 backdrop-blur-xl rounded-2xl border border-white shadow-2xl shadow-navy/10 p-5 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-bold text-navy">График проекта</span>
                <span className="text-[10px] font-semibold text-cognac bg-cognac/10 rounded-full px-2 py-0.5">в графике</span>
              </div>
              <div className="flex-1 flex flex-col justify-around">
                {SCHEDULE.map((s, i) => (
                  <div key={s.n} className="flex items-center gap-3">
                    <span className="w-[42%] text-[10px] text-navy/65 truncate">{s.n}</span>
                    <div className="flex-1 relative h-3">
                      <div className="absolute inset-y-0 rounded-full bg-navy/[0.06]" style={{ left: s.s + "%", width: "22%" }}>
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: s.w + "%" }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.3 + i * 0.15 }}
                          className={"h-full rounded-full " + (s.w === 100 ? "bg-navy" : "bg-cognac")}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-navy/5 text-[10px] text-navy/50">
                <span>Оплата — поэтапно, по факту работ</span>
                <span className="font-semibold text-navy">3 / 5</span>
              </div>
            </div>
          </div>
          <div className="p-6 md:p-7">
            <h3 className="text-[20px] font-bold text-navy">Договор, график и поэтапная оплата</h3>
            <p className="text-[15px] text-navy/60 leading-relaxed mt-2">
              Объём, смета, сроки и обязательства фиксируются документально. Оплата привязана к ходу работ.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
