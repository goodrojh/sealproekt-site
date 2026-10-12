"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Car, ExternalLink, Eye, MessagesSquare, Play, Quote, Star, X } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { useLead } from "@/components/lead/LeadModal";
import { SITE, asset, img } from "@/lib/site";
import { track } from "@/lib/analytics";

// Видеоотзывы из Telegram-канала заказчика (ссылки прислал маркетолог).
// Telegram не проигрывает эти ролики во встроенном окне («Media is too big»), поэтому по клику открывается пост.
// Если положить mp4 в public/video/review-<id>.mp4 и указать file, видео будет играть прямо на сайте.
const VIDEOS: { id: number; dur: string; t: string; file?: string }[] = [
  { id: 133, dur: "1:24", t: "«Ремонт без сюрпризов»: семья о ремонте новой квартиры" },
  { id: 520, dur: "0:56", t: "Исправили ошибки прошлых подрядчиков" },
  { id: 743, dur: "1:23", t: "Санузел, с которого хозяйка начала обустройство квартиры" },
  { id: 579, dur: "1:05", t: "Заказчик о ремонте в согласованные сроки" },
  { id: 460, dur: "0:59", t: "Интервью с заказчиком" },
];

// Текстовые отзывы — с текущего сайта заказчика sealproekt-remont.ru
const TEXTS = [
  {
    name: "Артем Романов",
    date: "11 июня 2025",
    obj: "Вторичное жильё, 84 м²",
    text: "Делали в «Сеал проект» капитальный ремонт трёхкомнатной квартиры. Понравилось, что сразу составили подробную смету и не выходили за бюджет. Рабочие аккуратные, мусор не оставляли. Качество работ хорошее, претензий нет.",
  },
  {
    name: "Елена Садыкова",
    date: "16 марта 2025",
    obj: "Ремонт квартиры под ключ, 43 м²",
    text: "Спасибо компании Сеал проект за качественно выполненный ремонт моей квартиры. Выбрала их по рекомендации друзей и осталась очень довольна: выполнили всё качественно, аккуратно и в срок. Приятно удивила коммуникация на всех стадиях работ.",
  },
];

function VideoModal({ file, onClose }: { file: string; onClose: () => void }) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", k);
    };
  }, [onClose]);
  return (
    <motion.div className="fixed inset-0 z-[110] bg-ink/90 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} role="dialog" aria-modal="true" aria-label="Видеоотзыв">
      <div className="relative w-full max-w-[420px] h-[min(760px,88vh)] rounded-[24px] overflow-hidden bg-white" onClick={(e) => e.stopPropagation()}>
        <video src={asset(file)} controls autoPlay playsInline className="w-full h-full object-contain bg-ink" />
      </div>
      <button onClick={onClose} aria-label="Закрыть" className="absolute top-4 right-4 h-11 w-11 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center">
        <X className="h-5 w-5" />
      </button>
    </motion.div>
  );
}

export default function TourReviews() {
  const { open } = useLead();
  const [video, setVideo] = useState<string | null>(null);

  return (
    <section id="reviews" className="w-full bg-white">
      {/* Экскурсия на объект — сильное преимущество, поднято выше (п. 7) */}
      <div id="tour" className="px-3 md:px-6 pt-6">
        <div className="relative max-w-[1400px] mx-auto rounded-[32px] md:rounded-[40px] overflow-hidden">
          <img {...img("/img/ca22.jpg", { sizes: "100vw" })} alt="Готовый объект СЕАЛ ПРОЕКТ" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/70 to-ink/30" />
          <div className="relative grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 items-end p-6 md:p-14 min-h-[560px]">
            <div>
              <h2 className="t-section text-white">
                Посмотрите объект в работе <span className="text-cognac">ещё до договора</span>
              </h2>
              <p className="mt-5 t-lead text-white/85 max-w-xl">
                Организуем экскурсию на любой объект в работе: покажем процесс изнутри и дадим обсудить решения с действующим проектным менеджером. Можно встретиться и на готовом объекте, чтобы оценить качество вживую.
              </p>
              <button
                onClick={() =>
                  open({
                    source: "Блок «Экскурсия»",
                    subtitle: "Подготовим расчёт и согласуем экскурсию на объект в работе или на готовый объект. При необходимости — с трансфером.",
                    image: "/img/ca22.jpg",
                    preset: { tour: true },
                  })
                }
                className="group mt-8 inline-flex w-full sm:w-auto items-center justify-between gap-4 rounded-full bg-cognac text-white p-1.5 pl-7 text-[16px] font-semibold hover:brightness-105 transition"
              >
                <span className="text-left">Получить расчёт и записаться на экскурсию</span>
                <span className="h-12 w-12 shrink-0 rounded-full bg-white/20 flex items-center justify-center">
                  <ArrowRight className="h-5 w-5" />
                </span>
              </button>
            </div>
            <div className="grid gap-3">
              {[
                { i: Car, t: "Трансфер", d: "При необходимости обеспечим трансфер до объекта." },
                { i: Eye, t: "Процесс изнутри", d: "Покажем, как идут работы на действующем объекте." },
                { i: MessagesSquare, t: "Разговор с действующим ПМ", d: "Обсудите решения с менеджером, который ведёт объект." },
              ].map((x) => (
                <div key={x.t} className="flex gap-4 items-start rounded-[22px] bg-ink/55 border border-white/20 p-5">
                  <div className="h-11 w-11 shrink-0 rounded-2xl bg-cognac flex items-center justify-center">
                    <x.i className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-[16px] font-semibold text-white">{x.t}</p>
                    <p className="text-[14px] text-white/80 mt-1 leading-[1.5]">{x.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Отзывы */}
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-24 md:py-28">
        <SectionHeader
          title="Отзывы наших клиентов"
          lead="Видеоотзывы заказчиков (открываются в Telegram) и оценки на независимых площадках."
          action={
            <a
              href={SITE.rating2gis.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-[20px] border border-navy/10 bg-white px-5 py-4 hover:border-navy/30 transition-colors"
            >
              <span className="text-[36px] font-extrabold text-navy leading-none">{SITE.rating2gis.value}</span>
              <span className="flex flex-col">
                <span className="flex gap-0.5">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-cognac text-cognac" />
                  ))}
                </span>
                <span className="mt-1 text-[14px] text-navy/65">
                  2ГИС · {SITE.rating2gis.votes} оценок, {SITE.rating2gis.reviews} отзыва
                </span>
              </span>
              <ExternalLink className="h-4 w-4 text-navy/40" />
            </a>
          }
        />

        {/* Видеоотзывы */}
        <div className="flex gap-4 overflow-x-auto no-scrollbar -mx-5 px-5 md:mx-0 md:px-0 md:grid md:grid-cols-5 pb-2">
          {VIDEOS.map((v) => (
            <a
              key={v.id}
              href={`https://t.me/sealproekt/${v.id}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                track("review_play", { video: v.id });
                if (v.file) {
                  e.preventDefault();
                  setVideo(v.file);
                }
              }}
              className="group shrink-0 w-[200px] md:w-auto text-left"
              aria-label={`Смотреть видеоотзыв: ${v.t}`}
            >
              <div className="relative aspect-[9/16] rounded-[22px] overflow-hidden bg-ink">
                <img {...img(`/img/rv${v.id}.jpg`, { sizes: "220px" })} alt="" className="absolute inset-0 w-full h-full object-cover opacity-90 md:group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="h-14 w-14 rounded-full bg-white/90 flex items-center justify-center group-hover:bg-cognac group-hover:text-white text-navy transition-colors">
                    <Play className="h-6 w-6 ml-0.5" fill="currentColor" />
                  </span>
                </span>
                <span className="absolute top-3 right-3 rounded-full bg-ink/70 px-2.5 py-1 text-[12px] font-semibold text-white">{v.dur}</span>
              </div>
              <p className="mt-3 text-[14px] font-medium text-navy leading-[1.4]">{v.t}</p>
            </a>
          ))}
        </div>

        {/* Текстовые отзывы */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
          {TEXTS.map((r) => (
            <figure key={r.name} className="rounded-[28px] bg-paper p-6 md:p-8 flex flex-col">
              <Quote className="h-8 w-8 text-cognac" />
              <blockquote className="mt-4 text-[16px] text-navy/80 leading-[1.6] flex-1">{r.text}</blockquote>
              <figcaption className="mt-6 flex items-center justify-between gap-4">
                <span>
                  <span className="block text-[16px] font-semibold text-navy">{r.name}</span>
                  <span className="block text-[14px] text-navy/55">{r.obj}</span>
                </span>
                <span className="text-[14px] text-navy/50 whitespace-nowrap">{r.date}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <a href={SITE.rating2gis.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-navy/15 px-6 py-3 text-[14px] font-semibold text-navy hover:bg-paper">
            Все отзывы в 2ГИС <ExternalLink className="h-4 w-4" />
          </a>
          <a href={SITE.yandexReviews} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-navy/15 px-6 py-3 text-[14px] font-semibold text-navy hover:bg-paper">
            Отзывы на Яндекс Картах <ExternalLink className="h-4 w-4" />
          </a>
          <a href={SITE.telegram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-navy/15 px-6 py-3 text-[14px] font-semibold text-navy hover:bg-paper">
            Больше видео в Telegram <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>

      <AnimatePresence>{video !== null && <VideoModal file={video} onClose={() => setVideo(null)} />}</AnimatePresence>
    </section>
  );
}
