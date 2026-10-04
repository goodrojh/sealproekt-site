"use client";
import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useLead } from "@/components/lead/LeadModal";
import { asset } from "@/lib/site";

// Состав тарифов — предложение, подтвердить у заказчика перед публикацией.
const plans = [
  {
    name: "Планировочный",
    tagline: "Когда важно правильно разместить жизнь в квартире.",
    price: "1 900",
    isPopular: false,
    features: ["Обмерный план", "Варианты планировочных решений", "План расстановки мебели", "План электрики и сантехники", "Консультации дизайнера"],
  },
  {
    name: "Рабочий",
    tagline: "Полный комплект чертежей для ремонта без догадок.",
    price: "2 700",
    isPopular: true,
    features: ["Всё из «Планировочного»", "Полный комплект рабочих чертежей", "Развёртки стен и раскладка плитки", "Ведомость отделочных материалов", "Привязка к смете ремонта"],
  },
  {
    name: "Полный",
    tagline: "Интерьер, который вы увидите заранее до деталей.",
    price: "3 500",
    isPopular: false,
    features: ["Всё из «Рабочего»", "3D-визуализации помещений", "Подбор материалов и мебели", "Спецификация для комплектации", "Сопровождение на реализации"],
  },
];

function DotGridIcon() {
  return (
    <div className="grid grid-cols-2 gap-1">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="w-1 h-1 rounded-full bg-white" />
      ))}
    </div>
  );
}

export default function DesignPricing() {
  const { open } = useLead();
  return (
    <section id="design" className="w-full px-0 py-24 md:py-28 bg-white overflow-hidden relative">
      <div className="text-center px-6 mb-12 relative z-10">
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-[12px] uppercase tracking-[0.18em] font-semibold text-cognac mb-4">
          Дизайн-проект
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="font-bold text-[34px] md:text-[48px] text-navy leading-[1.06] tracking-[-0.02em]"
        >
          Проект, который сразу
          <br /> считается под реализацию
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mt-4 text-[15px] md:text-[17px] text-navy/55"
        >
          Стоимость за м² в зависимости от состава. Дизайн-проект разрабатываем с последующей реализацией силами СЕАЛ ПРОЕКТ.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="mx-3 md:mx-10 lg:mx-auto max-w-[1280px] relative rounded-[28px] overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <img src={asset("/img/bedroom.jpg")} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-navy/30" />
        </div>

        <div className="relative z-10 bg-white/55 backdrop-blur-2xl m-3 md:m-[40px] rounded-[18px] overflow-hidden border border-white/40">
          <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-white/50">
            {plans.map((plan, idx) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.25 + idx * 0.1 }}
                className={"flex flex-col px-6 md:px-8 py-9 md:py-10 " + (plan.isPopular ? "bg-white/50" : "")}
              >
                <div className="pb-8 border-b border-navy/10">
                  <div className="flex items-start justify-between mb-2 gap-3">
                    <h3 className="font-bold text-2xl text-navy">{plan.name}</h3>
                    {plan.isPopular && (
                      <span className="inline-flex items-center px-3 py-1 text-[10px] font-semibold tracking-[0.12em] uppercase bg-cognac text-white rounded-full">
                        Чаще выбирают
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-navy/70 mt-1">{plan.tagline}</p>
                  <div className="mt-8 flex items-baseline gap-1">
                    <span className="font-extrabold text-5xl text-navy leading-none">{plan.price}</span>
                    <span className="text-xs font-semibold tracking-[0.1em] uppercase text-navy/50 ml-1">₽ / м²</span>
                  </div>
                  <button
                    onClick={() =>
                      open({
                        offer: "design",
                        source: `Тариф дизайн-проекта «${plan.name}»`,
                        title: `Дизайн-проект «${plan.name}»`,
                        subtitle: `${plan.price} ₽/м². ${plan.tagline}`,
                        cta: "Обсудить проект",
                        image: "/img/design.jpg",
                        preset: { note: `Тариф дизайн-проекта: ${plan.name}, ${plan.price} ₽/м²` },
                      })
                    }
                    className="mt-6 w-full flex items-center justify-between rounded-full bg-navy text-white p-1.5 group transition-colors hover:bg-cognac"
                  >
                    <span className="flex-1 px-5 py-3 text-sm font-semibold text-left">Обсудить проект</span>
                    <span className="w-10 h-10 rounded-full bg-cognac flex items-center justify-center flex-shrink-0 group-hover:bg-navy transition-colors">
                      <DotGridIcon />
                    </span>
                  </button>
                </div>
                <div className="pt-8 flex flex-col gap-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-md bg-cognac/15 border border-cognac/30 flex items-center justify-center flex-shrink-0">
                        <Check className="h-3 w-3 text-cognac stroke-[3]" />
                      </div>
                      <span className="text-[13px] font-medium text-navy">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
