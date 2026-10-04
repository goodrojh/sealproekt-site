"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Car, Eye, MessagesSquare, ArrowRight } from "lucide-react";
import { useLead } from "@/components/lead/LeadModal";
import { img } from "@/lib/site";

// Экскурсия до договора — ключевое отличие из брифа
export default function Excursion() {
  const ref = useRef<HTMLDivElement>(null);
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    setDesktop(mq.matches);
    const f = () => setDesktop(mq.matches);
    mq.addEventListener("change", f);
    return () => mq.removeEventListener("change", f);
  }, []);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const { open } = useLead();

  return (
    <section className="w-full px-3 md:px-6 py-6 bg-white">
      <div ref={ref} className="relative rounded-[32px] md:rounded-[40px] overflow-hidden min-h-[700px] md:min-h-[660px] flex items-end">
        <motion.img
          style={desktop ? { y } : undefined}
          {...img("/img/tour.jpg", { sizes: "100vw" })}
          alt="Экскурсия на объект в работе"
          className="absolute inset-x-0 -top-[6%] w-full h-[112%] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/70 to-transparent" />

        <div className="relative z-10 w-full p-6 md:p-14 grid lg:grid-cols-[1.2fr_1fr] gap-8 items-end">
          <div>
            <h2 className="t-section text-white">
              Посмотрите объект в работе
              <br /> <span className="text-cognac">ещё до договора</span>
            </h2>
            <p className="mt-5 t-lead text-white/85 max-w-xl">
              Организуем экскурсию на любой объект, находящийся в работе: покажем процесс изнутри и дадим обсудить решения с действующим проектным менеджером. Также можно встретиться на одном из готовых объектов и оценить качество вживую.
            </p>
            <button
              onClick={() =>
                open({
                  offer: "tour",
                  source: "Блок «Экскурсия на объект»",
                  title: "Запишитесь на экскурсию",
                  subtitle: "Объект в работе или готовый объект — согласуем время. При необходимости организуем трансфер.",
                  cta: "Записаться на экскурсию",
                  image: "/img/tour.jpg",
                })
              }
              className="group mt-8 inline-flex items-center gap-4 rounded-full bg-white text-navy p-1.5 pl-7 text-[16px] font-semibold hover:bg-cognac hover:text-white transition-colors"
            >
              Записаться на экскурсию
              <span className="h-12 w-12 rounded-full bg-navy text-white flex items-center justify-center group-hover:bg-white group-hover:text-cognac transition-colors">
                <ArrowRight className="h-5 w-5" />
              </span>
            </button>
          </div>

          <div className="grid gap-3">
            {[
              { i: Car, t: "Трансфер", d: "При необходимости обеспечим трансфер до объекта." },
              { i: Eye, t: "Процесс изнутри", d: "Покажем, как идут работы на действующем объекте." },
              { i: MessagesSquare, t: "Разговор с действующим ПМ", d: "Обсудите решения с менеджером, который ведёт объект." },
            ].map((x, i) => (
              <motion.div
                key={x.t}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.12 * i, duration: 0.5 }}
                className="flex gap-4 items-start rounded-[22px] bg-ink/55 border border-white/20 p-5"
              >
                <div className="h-11 w-11 shrink-0 rounded-2xl bg-cognac flex items-center justify-center">
                  <x.i className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-[16px] font-semibold text-white">{x.t}</p>
                  <p className="text-[14px] text-white/80 mt-1 leading-[1.5]">{x.d}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
