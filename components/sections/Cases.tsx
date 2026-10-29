"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Images, MapPin } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import Lightbox from "@/components/Lightbox";
import GalleryModal from "@/components/GalleryModal";
import { useLead } from "@/components/lead/LeadModal";
import { CTA_MAIN, fmt, img } from "@/lib/site";
import { CASES, CaseItem, mln, perM2 } from "@/lib/cases";
import { WORKS } from "@/lib/works";
import { track } from "@/lib/analytics";

function Stat({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <span className="text-[12px] text-navy/55">{k}</span>
      <span className="text-[16px] font-semibold text-navy whitespace-nowrap">{v}</span>
    </div>
  );
}

export default function Cases() {
  const [active, setActive] = useState<CaseItem | null>(null);
  const [gallery, setGallery] = useState(false);
  const { open } = useLead();

  const ask = (c: CaseItem) =>
    open({
      source: c.area ? `Объект ${c.area} м²` : `Объект: ${c.title}`,
      subtitle:
        c.area && c.budget
          ? `Рассчитаем стоимость ремонта вашей квартиры. Для ориентира: объект ${c.area} м² — ${mln(c.budget)} млн ₽.`
          : "Рассчитаем стоимость ремонта вашей квартиры.",
      image: c.cover,
      preset: { area: c.area, note: `Понравился объект: ${c.title}${c.area ? `, ${c.area} м²` : ""}` },
    });

  return (
    <section id="cases" className="bg-white py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <SectionHeader
          title="Примеры ремонтов с ценами"
          lead="Реальные объекты: площадь, сроки и итоговый бюджет. Нажмите на объект, чтобы посмотреть фото и что было сделано."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {CASES.map((c, i) => (
            <motion.article
              key={c.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 2) * 0.1 }}
              className="group flex flex-col rounded-[28px] overflow-hidden border border-navy/10 bg-white"
            >
              <button
                type="button"
                onClick={() => {
                  setActive(c);
                  track("case_open", { case: c.id });
                }}
                className="relative h-[280px] md:h-[340px] 2xl:h-[420px] overflow-hidden bg-sand text-left"
                aria-label={`Смотреть фото: ${c.title}`}
              >
                <img
                  {...img(c.cover, { sizes: "(max-width: 768px) 100vw, 560px" })}
                  alt={c.title}
                  className="absolute inset-0 w-full h-full object-cover md:group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
                <span className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-ink/65 px-3 py-1.5 text-[14px] font-semibold text-white">
                  <Images className="h-4 w-4" /> {c.photos.length} фото
                </span>
                <span className="absolute left-5 bottom-4 text-[14px] font-medium text-white/90">
                  {c.type}
                  {c.year ? ` · ${c.year}` : ""}
                </span>
              </button>

              <div className="p-6 md:p-7 flex flex-col flex-1">
                <h3 className="t-h3 text-navy">{c.title}</h3>
                {c.location && (
                  <p className="mt-1 flex items-center gap-1.5 text-[14px] text-navy/60">
                    <MapPin className="h-4 w-4" /> Красноярск, {c.location}
                  </p>
                )}
                {(() => {
                  const stats = [
                    c.area && { k: "Площадь", v: `${c.area} м²` },
                    c.rooms && { k: "Комнат", v: c.rooms.replace(/\D+/g, "") },
                    c.term && { k: "Срок", v: c.term },
                  ].filter(Boolean) as { k: string; v: string }[];
                  return (
                    stats.length > 0 && (
                      <div className="mt-5 grid grid-cols-3 gap-3 rounded-2xl bg-paper p-4">
                        {stats.map((x) => (
                          <Stat key={x.k} k={x.k} v={x.v} />
                        ))}
                      </div>
                    )
                  );
                })()}
                {c.budget ? (
                  <div className="mt-5 flex items-end justify-between gap-4">
                    <div>
                      <span className="block text-[14px] text-navy/60">Бюджет ремонта</span>
                      <span className="block text-[28px] md:text-[32px] font-extrabold text-navy leading-tight whitespace-nowrap">{fmt(c.budget)} ₽</span>
                    </div>
                    {perM2(c) > 0 && <span className="mb-1 text-[14px] font-semibold text-cognac whitespace-nowrap">≈ {fmt(perM2(c))} ₽/м²</span>}
                  </div>
                ) : (
                  <p className="mt-4 text-[16px] text-navy/70 leading-[1.55]">{c.summary}</p>
                )}
                <div className="mt-auto" />
                <div className="mt-6 pt-5 border-t border-navy/10 flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => {
                      setActive(c);
                      track("case_open", { case: c.id });
                    }}
                    className="flex-1 rounded-full border border-navy/15 px-5 py-3 text-[14px] font-semibold text-navy hover:bg-paper transition-colors"
                  >
                    Смотреть объект
                  </button>
                  <button onClick={() => ask(c)} className="flex-1 rounded-full bg-navy text-white px-5 py-3 text-[14px] font-semibold hover:bg-ink transition-colors">
                    Рассчитать похожий
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => {
              setGallery(true);
              track("case_open", { case: "gallery" });
            }}
            className="inline-flex items-center gap-2 rounded-full border border-navy/20 bg-white px-8 py-4 text-[16px] font-semibold text-navy hover:bg-navy hover:text-white transition-colors"
          >
            <Images className="h-5 w-5" /> Все фото наших работ ({WORKS.length})
          </button>
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <Lightbox
            key={active.id}
            photos={active.photos}
            title={[active.title, active.area && `${active.area} м²`].filter(Boolean).join(", ") + (active.budget ? ` — ${fmt(active.budget)} ₽` : "")}
            onClose={() => setActive(null)}
            footer={
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 text-white">
                <div className="min-w-0">
                  <p className="text-[14px] text-white/70">{active.summary}</p>
                  <ul className="mt-2 hidden md:grid grid-cols-2 gap-x-6 gap-y-1">
                    {active.points.map((p) => (
                      <li key={p} className="text-[14px] text-white/85">
                        — {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={() => {
                    const c = active;
                    setActive(null);
                    ask(c);
                  }}
                  className="shrink-0 flex items-center justify-between gap-4 rounded-full bg-cognac text-white p-1.5 pl-6 text-[16px] font-semibold hover:brightness-105 transition"
                >
                  {CTA_MAIN}
                  <span className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                    <ArrowRight className="h-5 w-5" />
                  </span>
                </button>
              </div>
            }
          />
        )}
      </AnimatePresence>
      <AnimatePresence>{gallery && <GalleryModal onClose={() => setGallery(false)} />}</AnimatePresence>
    </section>
  );
}
