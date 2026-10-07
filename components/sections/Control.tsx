"use client";
import SectionHeader from "@/components/SectionHeader";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { CheckCheck, FileText, MessagesSquare, ClipboardList, UserRound, Wallet } from "lucide-react";
import { img } from "@/lib/site";

const containerVariants: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const cardVariants: Variants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } };

// Иллюстрация интерфейса (макет), не реальный объект
const CHAT = [
  { me: false, t: "Добрый день! Черновой этап в спальне завершён, отчёт ниже.", time: "10:42" },
  { me: false, photo: true, time: "10:42" },
  { me: true, t: "Спасибо! Что дальше по графику?", time: "10:55" },
  { me: false, t: "В четверг — электрика. Пришлю отчёт после приёмки.", time: "10:57" },
];

const ESTIMATE = [
  { n: "Черновые работы", v: "612 000" },
  { n: "Электрика", v: "238 000" },
  { n: "Сантехника", v: "184 000" },
  { n: "Чистовые работы", v: "746 000" },
];

const SCHEDULE = [
  { n: "Черновые работы", w: 100, s: 0 },
  { n: "Электрика и сантехника", w: 100, s: 18 },
  { n: "Подготовка поверхностей", w: 72, s: 34 },
  { n: "Чистовые работы", w: 0, s: 56 },
  { n: "Комплектация и сдача", w: 0, s: 78 },
];

// Фото команды СЕАЛ ПРОЕКТ (присланы заказчиком), плавная смена кадров
const PM_PHOTOS = [
  { src: "/img/pm2.jpg", alt: "Специалист СЕАЛ ПРОЕКТ консультирует клиента" },
  { src: "/img/pm1.jpg", alt: "Специалист СЕАЛ ПРОЕКТ на стенде компании" },
];

function PmPhotos() {
  const [k, setK] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setK((v) => (v + 1) % PM_PHOTOS.length), 5000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="relative h-[260px] md:h-[300px] overflow-hidden bg-ink">
      {PM_PHOTOS.map((p, i) => (
        <img
          key={p.src}
          {...img(p.src, { sizes: "(max-width: 768px) 100vw, 576px" })}
          alt={p.alt}
          className={"absolute inset-0 w-full h-full object-cover object-[50%_22%] transition-opacity duration-1000 " + (i === k ? "opacity-100" : "opacity-0")}
        />
      ))}
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-navy to-transparent" />
      <div className="absolute bottom-4 left-6 md:left-7 flex gap-1.5">
        {PM_PHOTOS.map((p, i) => (
          <button key={p.src} onClick={() => setK(i)} aria-label={`Фото ${i + 1}`} className={"h-1.5 rounded-full transition-all " + (i === k ? "w-8 bg-white" : "w-3 bg-white/50")} />
        ))}
      </div>
    </div>
  );
}

export default function Control() {
  return (
    <section id="control" className="w-full px-5 md:px-8 py-24 md:py-32 bg-paper relative overflow-hidden">
      <div className="absolute -top-72 left-0 w-[700px] h-[700px] glow-steel pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeader
          title="Не набор подрядчиков, а управляемый процесс"
          lead="Персональный менеджмент проекта, прозрачная коммуникация и ответственность за результат. Вы знаете, что происходит на объекте, без ежедневных поездок."
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-6xl mx-auto relative z-10"
      >
        {/* ПМ — реальные фото команды */}
        <motion.div variants={cardVariants} className="rounded-[32px] overflow-hidden bg-navy flex flex-col">
          <PmPhotos />
          <div className="p-6 md:p-7 flex flex-col gap-6 flex-1">
            <div>
              <h3 className="t-h2 text-white">
                Один ответственный —{" "}
                <span className="text-cognac whitespace-nowrap">весь проект</span>
              </h3>
              <p className="text-[16px] text-white/85 leading-[1.6] mt-3">
                Персональный проектный менеджер — главный контакт клиента по проекту: от замера и сметы до сдачи объекта и гарантийного сопровождения.
              </p>
            </div>
            <div className="mt-auto grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { i: MessagesSquare, t: "Рабочий чат", d: "Вопросы и решения по объекту — в одном месте." },
                { i: ClipboardList, t: "Регулярные отчёты", d: "Понятная фиксация этапов и выполненных работ." },
              ].map((x) => (
                <div key={x.t} className="flex gap-3 p-4 rounded-[20px] bg-white/[0.07] border border-white/15">
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-cognac flex items-center justify-center">
                    <x.i className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <span className="block text-[16px] font-semibold text-white">{x.t}</span>
                    <p className="mt-1 text-[14px] text-white/75 leading-[1.5]">{x.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Чат */}
        <motion.div variants={cardVariants} className="bg-white rounded-[32px] border border-navy/10 p-6 md:p-7 flex flex-col overflow-hidden relative min-h-[460px]">
          <div className="absolute inset-0 pattern-grid opacity-70" />
          <div className="relative z-10 flex-1 flex items-center justify-center py-4">
            <div className="w-full max-w-[340px] bg-paper border border-white rounded-[24px] shadow-xl shadow-navy/10 overflow-hidden">
              <div className="flex items-center gap-3 px-4 py-3 bg-navy text-white">
                <div className="h-9 w-9 rounded-full bg-cognac flex items-center justify-center">
                  <UserRound className="h-4 w-4" />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-[14px] font-semibold">Проектный менеджер</span>
                  <span className="text-[12px] text-white/65">Рабочий чат по объекту</span>
                </div>
              </div>
              <div className="p-3 flex flex-col gap-2">
                {CHAT.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.4 }}
                    className={"max-w-[85%] rounded-2xl text-[13px] leading-snug shadow-sm " + (m.me ? "self-end bg-cognac text-white rounded-br-md" : "self-start bg-white text-navy rounded-bl-md")}
                  >
                    {m.photo ? (
                      <div className="p-1">
                        <img {...img("/img/process.jpg", { sizes: "200px" })} alt="" width={192} height={96} className="h-24 w-48 object-cover rounded-xl" />
                      </div>
                    ) : (
                      <div className="px-3 py-2">
                        {m.t}
                        <span className={"ml-2 inline-flex items-center gap-0.5 text-[12px] " + (m.me ? "text-white/75" : "text-navy/45")}>
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
            <h3 className="t-h3 text-navy">Прозрачность на каждом этапе</h3>
            <p className="text-[16px] text-navy/65 leading-[1.6] mt-2">Рабочий чат, график проекта, регулярные отчёты и понятная фиксация этапов.</p>
          </div>
        </motion.div>

        {/* Смета */}
        <motion.div variants={cardVariants} className="bg-white rounded-[32px] border border-navy/10 overflow-hidden flex flex-col">
          <div className="bg-paper h-80 relative flex items-center justify-center overflow-hidden border-b border-navy/10 p-6">
            <div className="absolute top-6 right-6 w-14 h-14 rounded-2xl bg-white border border-navy/5 shadow-lg flex items-center justify-center float-y">
              <Wallet className="h-6 w-6 text-cognac" />
            </div>
            <div className="relative z-10 w-full max-w-[300px] bg-white rounded-2xl shadow-xl shadow-navy/10 border border-navy/5 p-5">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="h-4 w-4 text-cognac" />
                <span className="text-[14px] font-semibold text-navy">Смета · 24 часа после замера</span>
              </div>
              <div className="flex flex-col gap-2.5">
                {ESTIMATE.map((r, i) => (
                  <motion.div
                    key={r.n}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.12 }}
                    className="flex items-center justify-between text-[13px] border-b border-dashed border-navy/10 pb-2"
                  >
                    <span className="text-navy/70">{r.n}</span>
                    <span className="font-semibold text-navy">{r.v} ₽</span>
                  </motion.div>
                ))}
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-[12px] text-navy/55 mb-1.5">
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
                    className="absolute inset-y-0 left-[30%] right-[30%] bg-cognac rounded-full origin-center"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 md:p-7">
            <h3 className="t-h3 text-navy">Смету не просто отправляем — презентуем</h3>
            <p className="text-[16px] text-navy/65 leading-[1.6] mt-2">
              Расчёт готовим в течение 24 часов после замера, затем разбираем и объясняем его вместе с вами. Ориентир по точности — ±10%.
            </p>
          </div>
        </motion.div>

        {/* График */}
        <motion.div variants={cardVariants} className="bg-white rounded-[32px] border border-navy/10 overflow-hidden flex flex-col">
          <div className="bg-paper h-80 relative flex items-center justify-center border-b border-navy/10 p-6">
            <div className="relative z-10 w-full h-full bg-white rounded-2xl border border-navy/5 shadow-xl shadow-navy/10 p-5 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[14px] font-semibold text-navy">График проекта</span>
                <span className="text-[12px] font-semibold text-cognac bg-cognac/10 rounded-full px-2 py-0.5">по графику</span>
              </div>
              <div className="flex-1 flex flex-col justify-around">
                {SCHEDULE.map((s, i) => (
                  <div key={s.n} className="flex items-center gap-3">
                    <span className="w-[44%] text-[12px] text-navy/70 truncate">{s.n}</span>
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
              <div className="flex items-center justify-between pt-3 border-t border-navy/5 text-[12px] text-navy/55">
                <span>Оплата поэтапная, по ходу работ</span>
                <span className="font-semibold text-navy">3 / 5</span>
              </div>
            </div>
          </div>
          <div className="p-6 md:p-7">
            <h3 className="t-h3 text-navy">Договор, график и поэтапная оплата</h3>
            <p className="text-[16px] text-navy/65 leading-[1.6] mt-2">
              Объём, смета, сроки и обязательства фиксируются документально. Оплата поэтапная и привязана к ходу работ.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
