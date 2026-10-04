"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Car, Eye, MessagesSquare, ArrowRight } from "lucide-react";
import { useLead } from "@/components/lead/LeadModal";
import { asset } from "@/lib/site";

export default function Excursion() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.92, 1]);
  const { open } = useLead();

  return (
    <section ref={ref} className="w-full px-3 md:px-6 py-6 bg-white">
      <motion.div style={{ scale }} className="relative rounded-[32px] md:rounded-[40px] overflow-hidden min-h-[720px] md:min-h-[680px] flex items-end">
        <motion.img style={{ y }} src={asset("/img/tour.jpg")} alt="Экскурсия на объект в работе" className="absolute inset-0 w-full h-[116%] -top-[8%] object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/70 to-transparent" />

        <div className="relative z-10 w-full p-6 md:p-14 grid lg:grid-cols-[1.2fr_1fr] gap-8 items-end">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-cognac px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-white">
              До договора
            </span>
            <h2 className="mt-5 text-[34px] md:text-[56px] font-extrabold text-white leading-[1.04] tracking-[-0.02em]">
              Приезжайте на объект,
              <br /> который мы делаем
              <br /> <span className="text-cognac">прямо сейчас</span>
            </h2>
            <p className="mt-5 text-[16px] md:text-[18px] text-white/80 leading-relaxed max-w-xl">
              Покажем процесс изнутри: как ведём электрику, сантехнику, черновые и чистовые работы. Можно встретиться и на готовом объекте — оценить качество вживую.
            </p>
            <button
              onClick={() =>
                open({
                  offer: "tour",
                  source: "Блок «Экскурсия на объект»",
                  title: "Запишитесь на экскурсию",
                  subtitle: "Подберём объект в работе или готовый объект, согласуем время. При необходимости организуем трансфер.",
                  cta: "Записаться на экскурсию",
                  image: "/img/tour.jpg",
                })
              }
              className="group mt-8 inline-flex items-center gap-4 rounded-full bg-white text-navy p-1.5 pl-7 text-[15px] font-semibold hover:bg-cognac hover:text-white transition-colors"
            >
              Записаться на экскурсию
              <span className="h-12 w-12 rounded-full bg-navy text-white flex items-center justify-center group-hover:bg-white group-hover:text-cognac transition-colors">
                <ArrowRight className="h-5 w-5" />
              </span>
            </button>
          </div>

          <div className="grid gap-3">
            {[
              { i: Car, t: "Трансфер", d: "Заберём и привезём обратно, если вам так удобнее." },
              { i: Eye, t: "Процесс изнутри", d: "Скрытые работы, порядок на объекте, качество узлов." },
              { i: MessagesSquare, t: "Разговор с действующим ПМ", d: "Задайте вопросы тому, кто прямо сейчас ведёт объект." },
            ].map((x, i) => (
              <motion.div
                key={x.t}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 * i, duration: 0.5 }}
                className="flex gap-4 items-start rounded-[22px] bg-white/10 backdrop-blur-xl border border-white/20 p-5"
              >
                <div className="h-11 w-11 shrink-0 rounded-2xl bg-cognac/90 flex items-center justify-center">
                  <x.i className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-[15px] font-bold text-white">{x.t}</p>
                  <p className="text-[13px] text-white/70 mt-1 leading-relaxed">{x.d}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
