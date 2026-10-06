import React from "react";
import { img } from "@/lib/site";

// Дополнительные услуги из брифа — бегущая строка + лента интерьеров (CSS-анимация, без JS)
const WORDS = ["Дизайн-проект", "Черновые работы", "Чистовые работы", "Электрика", "Сантехника", "Комплектация"];
const PHOTOS = ["/img/w03.jpg", "/img/w87.jpg", "/img/w13.jpg", "/img/w85.jpg", "/img/w25.jpg", "/img/w76.jpg", "/img/w64.jpg", "/img/w22.jpg", "/img/w89.jpg", "/img/w30.jpg"];

export default function Marquee() {
  return (
    <section className="bg-navy py-10 md:py-14 overflow-hidden relative" aria-label="Что входит в ремонт под ключ">
      <div className="flex w-max marquee-left">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0" aria-hidden={k === 1}>
            {WORDS.map((w) => (
              <span key={w} className="flex items-center gap-10 pr-10 text-[32px] md:text-[48px] font-extrabold leading-[1.1] text-white whitespace-nowrap">
                {w}
                <span className="h-3 w-3 md:h-4 md:w-4 rotate-45 bg-cognac" />
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className="mt-8 md:mt-10 flex w-max marquee-right">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 gap-4 pr-4" aria-hidden={k === 1}>
            {PHOTOS.map((p) => (
              <img key={p} {...img(p, { sizes: "360px" })} alt="" width={360} height={224} className="h-40 md:h-56 w-64 md:w-[360px] shrink-0 object-cover rounded-[20px]" />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
