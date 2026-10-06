"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Images } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import Lightbox from "@/components/Lightbox";
import { useLead } from "@/components/lead/LeadModal";
import { img } from "@/lib/site";
import { OBJECTS, WorkObject, workSrc } from "@/lib/works";

// Шахматная сетка: большой + поменьше, в следующем ряду наоборот
const SPANS = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"];
const FIRST = 6;

function CaseFooter({ c, onAsk }: { c: WorkObject; onAsk: () => void }) {
  // Поля кейса из брифа показываются, только когда заказчик их заполнит (lib/works.ts)
  const rows = [
    ["Задача", c.task],
    ["Исходные данные", c.input],
    ["Что сделали", c.done],
    ["Особенности объекта", c.features],
    ["Результат", c.result],
  ].filter(([, v]) => v) as [string, string][];
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-white">
      <div className="min-w-0">
        <p className="text-[14px] text-white/65">{c.rooms}</p>
        {rows.map(([k, v]) => (
          <p key={k} className="mt-1 text-[14px] text-white/85">
            <span className="font-semibold">{k}:</span> {v}
          </p>
        ))}
      </div>
      <button onClick={onAsk} className="group shrink-0 flex items-center justify-between gap-4 rounded-full bg-cognac text-white p-1.5 pl-6 text-[16px] font-semibold hover:brightness-105 transition">
        Хочу похожий ремонт
        <span className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
          <ArrowRight className="h-5 w-5" />
        </span>
      </button>
    </div>
  );
}

export default function Cases() {
  const [active, setActive] = useState<WorkObject | null>(null);
  const [all, setAll] = useState(false);
  const { open } = useLead();
  const list = all ? OBJECTS : OBJECTS.slice(0, FIRST);

  return (
    <section id="cases" className="bg-white py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <SectionHeader
          title="Объекты, которые мы довели до ключей"
          lead="Реальные фотографии наших работ. Нажмите на объект, чтобы посмотреть все фото."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 md:gap-6">
          {list.map((c, i) => (
            <motion.button
              key={c.id}
              type="button"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 2) * 0.1 }}
              onClick={() => setActive(c)}
              className={"group text-left " + SPANS[i % 4]}
            >
              <div className="relative h-[380px] md:h-[440px] lg:h-[500px] rounded-[28px] overflow-hidden bg-sand">
                <img
                  {...img(workSrc(c.cover), { sizes: "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 680px" })}
                  alt={c.title}
                  className="absolute inset-0 w-full h-full object-cover md:group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 via-45% to-transparent" />
                <span className="absolute top-5 left-5 inline-flex items-center gap-2 rounded-full bg-ink/60 px-3 py-1.5 text-[14px] font-semibold text-white">
                  <Images className="h-4 w-4" /> {c.photos.length} фото
                </span>
                <span className="absolute top-5 right-5 h-12 w-12 rounded-full bg-white flex items-center justify-center text-navy group-hover:bg-cognac group-hover:text-white group-hover:rotate-45 transition-all">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
                <div className="absolute left-6 right-6 bottom-6 md:left-8 md:right-8 md:bottom-8">
                  <p className="text-[14px] font-medium text-white/80">{c.rooms}</p>
                  <h3 className="mt-1 t-h3 text-white">{c.title}</h3>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {OBJECTS.length > FIRST && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => {
                if (all) document.getElementById("cases")?.scrollIntoView();
                setAll((v) => !v);
              }}
              className="rounded-full border border-navy/20 bg-white px-8 py-4 text-[16px] font-semibold text-navy hover:bg-navy hover:text-white transition-colors"
            >
              {all ? "Свернуть" : `Показать все объекты (${OBJECTS.length})`}
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {active && (
          <Lightbox
            key={active.id}
            photos={active.photos}
            title={active.title}
            onClose={() => setActive(null)}
            footer={
              <CaseFooter
                c={active}
                onAsk={() => {
                  const c = active;
                  setActive(null);
                  open({
                    offer: "calc",
                    source: `Объект «${c.title}»`,
                    title: "Хочу похожий ремонт",
                    subtitle: `Рассчитаем стоимость похожего решения: «${c.title}».`,
                    cta: "Рассчитать стоимость",
                    image: workSrc(c.cover),
                    preset: { note: `Понравился объект: ${c.title}` },
                  });
                }}
              />
            }
          />
        )}
      </AnimatePresence>
    </section>
  );
}
