"use client";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Gift, MessageCircle, Phone, Send, X } from "lucide-react";
import { OFFERS, OfferId, SITE, asset } from "@/lib/site";

export type LeadConfig = {
  offer: OfferId;
  title: string;
  subtitle?: string;
  cta?: string;
  source: string; // какой блок/кнопка открыл форму
  image?: string;
  askOffer?: boolean; // дать выбрать акцию
  preset?: { area?: number; objectType?: string; note?: string };
};

type Ctx = { open: (c: LeadConfig) => void };
const LeadContext = createContext<Ctx>({ open: () => {} });
export const useLead = () => useContext(LeadContext);

const OBJECT_TYPES = ["Новостройка", "Вторичное жильё", "Дом", "Коммерческий объект"];
const STARTS = ["В ближайший месяц", "Через 1–3 месяца", "Через 3–6 месяцев", "Пока планирую"];
const CONTACTS = [
  { id: "call", label: "Звонок", icon: Phone },
  { id: "whatsapp", label: "WhatsApp", icon: MessageCircle },
  { id: "telegram", label: "Telegram", icon: Send },
];
const PROMO: OfferId[] = ["sink", "design-gift", "early5"];

function maskPhone(v: string) {
  let d = v.replace(/\D/g, "");
  if (d.startsWith("8")) d = "7" + d.slice(1);
  if (!d.startsWith("7")) d = "7" + d;
  d = d.slice(0, 11);
  const p = d.slice(1);
  let out = "+7";
  if (p.length) out += " (" + p.slice(0, 3);
  if (p.length >= 3) out += ")";
  if (p.length > 3) out += " " + p.slice(3, 6);
  if (p.length > 6) out += "-" + p.slice(6, 8);
  if (p.length > 8) out += "-" + p.slice(8, 10);
  return out;
}

function Chip({ active, children, onClick }: { active: boolean; children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "rounded-full px-4 py-2.5 text-[13px] font-medium border transition-all " +
        (active
          ? "bg-navy text-white border-navy shadow-lg shadow-navy/20"
          : "bg-white text-navy/80 border-navy/12 hover:border-navy/40")
      }
    >
      {children}
    </button>
  );
}

function LeadDialog({ config, onClose }: { config: LeadConfig; onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [offer, setOffer] = useState<OfferId>(config.offer);
  const [objectType, setObjectType] = useState(config.preset?.objectType || OBJECT_TYPES[0]);
  const [area, setArea] = useState(config.preset?.area || 60);
  const [start, setStart] = useState(STARTS[0]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [contact, setContact] = useState("call");
  const [agree, setAgree] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const phoneOk = phone.replace(/\D/g, "").length === 11;
  const payload = useMemo(
    () => ({
      offer: OFFERS[offer].label,
      source: config.source,
      objectType,
      area,
      start,
      name,
      phone,
      contact,
      note: config.preset?.note || "",
      page: typeof window !== "undefined" ? window.location.href : "",
      createdAt: new Date().toISOString(),
    }),
    [offer, config, objectType, area, start, name, phone, contact]
  );

  const waText = encodeURIComponent(
    `Здравствуйте! Заявка с сайта СЕАЛ ПРОЕКТ.\nПредложение: ${payload.offer}\nОбъект: ${objectType}, ${area} м²\nСтарт: ${start}\nИмя: ${name}\nТелефон: ${phone}` +
      (payload.note ? `\n${payload.note}` : "")
  );

  async function submit() {
    if (!phoneOk) {
      setError("Проверьте номер телефона");
      return;
    }
    if (!agree) {
      setError("Нужно согласие на обработку данных");
      return;
    }
    setError("");
    setSending(true);
    try {
      if (SITE.leadEndpoint) {
        await fetch(SITE.leadEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      try {
        const k = "seal_leads";
        const prev = JSON.parse(localStorage.getItem(k) || "[]");
        localStorage.setItem(k, JSON.stringify([...prev, payload].slice(-10)));
      } catch {}
    } catch {}
    setSending(false);
    setStep(2);
  }

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-ink/70 backdrop-blur-md" onClick={onClose} />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={config.title}
        initial={{ y: 40, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 30, opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="relative w-full sm:max-w-[920px] max-h-[94vh] overflow-y-auto bg-white rounded-t-[28px] sm:rounded-[28px] shadow-2xl grid md:grid-cols-[0.85fr_1.15fr]"
      >
        {/* Левая панель — визуал и что получит клиент */}
        <div className="relative hidden md:flex flex-col justify-end p-8 min-h-[560px] overflow-hidden rounded-l-[28px]">
          <img src={asset(config.image || "/img/kitchen.jpg")} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/10" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-cognac px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white">
              <Gift className="h-3.5 w-3.5" /> Что вы получите
            </div>
            <p className="mt-4 text-white text-[15px] leading-relaxed">{OFFERS[offer].result}</p>
            <div className="mt-6 flex flex-col gap-2 text-[13px] text-white/75">
              <span className="flex items-center gap-2"><Check className="h-4 w-4 text-cognac" /> Смета — в течение 24 часов после замера</span>
              <span className="flex items-center gap-2"><Check className="h-4 w-4 text-cognac" /> Точность расчёта ±10%</span>
              <span className="flex items-center gap-2"><Check className="h-4 w-4 text-cognac" /> Персональный проектный менеджер</span>
            </div>
          </div>
        </div>

        <div className="relative p-6 sm:p-9 flex flex-col">
          <button
            onClick={onClose}
            aria-label="Закрыть"
            className="absolute right-4 top-4 h-10 w-10 rounded-full bg-paper flex items-center justify-center text-navy hover:bg-sand transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          {step < 2 && (
            <>
              <div className="flex items-center gap-2 mb-5">
                {[0, 1].map((i) => (
                  <div key={i} className={"h-1 rounded-full transition-all " + (i <= step ? "w-10 bg-cognac" : "w-6 bg-navy/10")} />
                ))}
                <span className="ml-2 text-[12px] text-navy/50">Шаг {step + 1} из 2</span>
              </div>
              <h3 className="text-[26px] sm:text-[30px] font-bold leading-[1.15] text-navy pr-10">{config.title}</h3>
              {config.subtitle && <p className="mt-2 text-[15px] text-navy/60 leading-relaxed">{config.subtitle}</p>}
            </>
          )}

          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="s0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="mt-6 flex flex-col gap-6">
                {config.askOffer && (
                  <div>
                    <p className="text-[13px] font-semibold text-navy mb-3">Выберите предложение</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {PROMO.map((id) => (
                        <button
                          key={id}
                          type="button"
                          onClick={() => setOffer(id)}
                          className={
                            "text-left rounded-2xl border p-3 text-[12px] leading-snug font-medium transition-all " +
                            (offer === id ? "border-cognac bg-cognac/10 text-navy" : "border-navy/10 text-navy/70 hover:border-navy/30")
                          }
                        >
                          {OFFERS[id].label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                <div>
                  <p className="text-[13px] font-semibold text-navy mb-3">Тип объекта</p>
                  <div className="flex flex-wrap gap-2">
                    {OBJECT_TYPES.map((t) => (
                      <Chip key={t} active={objectType === t} onClick={() => setObjectType(t)}>{t}</Chip>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="flex items-baseline justify-between mb-3">
                    <p className="text-[13px] font-semibold text-navy">Площадь</p>
                    <span className="text-[22px] font-bold text-navy">{area} м²</span>
                  </div>
                  <input
                    type="range"
                    min={20}
                    max={250}
                    step={1}
                    value={area}
                    onChange={(e) => setArea(+e.target.value)}
                    className="range-brand w-full"
                    style={{ ["--p" as string]: ((area - 20) / 230) * 100 + "%" } as React.CSSProperties}
                  />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-navy mb-3">Когда планируете начать</p>
                  <div className="flex flex-wrap gap-2">
                    {STARTS.map((t) => (
                      <Chip key={t} active={start === t} onClick={() => setStart(t)}>{t}</Chip>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="mt-2 group w-full flex items-center justify-between rounded-full bg-navy text-white p-1.5 pl-6 hover:bg-ink transition-colors"
                >
                  <span className="text-[15px] font-semibold">Дальше</span>
                  <span className="h-11 w-11 rounded-full bg-cognac flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                    <ArrowRight className="h-5 w-5" />
                  </span>
                </button>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="mt-6 flex flex-col gap-4">
                <label className="flex flex-col gap-1.5">
                  <span className="text-[13px] font-semibold text-navy">Как к вам обращаться</span>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Имя"
                    autoComplete="name"
                    className="h-14 rounded-2xl bg-paper border border-transparent focus:border-cognac focus:bg-white px-5 text-[15px] text-navy outline-none transition-colors"
                  />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="text-[13px] font-semibold text-navy">Телефон</span>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(maskPhone(e.target.value))}
                    onFocus={() => !phone && setPhone("+7")}
                    placeholder="+7 (___) ___-__-__"
                    inputMode="tel"
                    autoComplete="tel"
                    className="h-14 rounded-2xl bg-paper border border-transparent focus:border-cognac focus:bg-white px-5 text-[15px] text-navy outline-none transition-colors"
                  />
                </label>
                <div>
                  <p className="text-[13px] font-semibold text-navy mb-2">Где удобнее связаться</p>
                  <div className="grid grid-cols-3 gap-2">
                    {CONTACTS.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setContact(c.id)}
                        className={
                          "flex flex-col items-center gap-1.5 rounded-2xl border py-3 text-[12px] font-medium transition-all " +
                          (contact === c.id ? "border-navy bg-navy text-white" : "border-navy/10 text-navy/70 hover:border-navy/30")
                        }
                      >
                        <c.icon className="h-4 w-4" />
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>
                <label className="flex items-start gap-3 text-[12px] text-navy/55 leading-relaxed cursor-pointer">
                  <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-0.5 h-4 w-4 accent-cognac" />
                  Согласен на обработку персональных данных в соответствии с политикой конфиденциальности
                </label>
                {error && <p className="text-[13px] text-red-600">{error}</p>}
                <div className="flex gap-2 mt-1">
                  <button onClick={() => setStep(0)} aria-label="Назад" className="h-14 w-14 shrink-0 rounded-full border border-navy/15 flex items-center justify-center text-navy hover:bg-paper">
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={submit}
                    disabled={sending}
                    className="group flex-1 flex items-center justify-between rounded-full bg-cognac text-white p-1.5 pl-6 hover:brightness-95 transition-all disabled:opacity-60"
                  >
                    <span className="text-[15px] font-semibold">{sending ? "Отправляем…" : config.cta || "Отправить заявку"}</span>
                    <span className="h-11 w-11 rounded-full bg-navy flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                      <ArrowRight className="h-5 w-5" />
                    </span>
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="s2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-5 py-4">
                <div className="h-16 w-16 rounded-2xl bg-cognac/15 flex items-center justify-center">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.15 }}>
                    <Check className="h-8 w-8 text-cognac" strokeWidth={2.5} />
                  </motion.div>
                </div>
                <h3 className="text-[28px] font-bold leading-tight text-navy">
                  Спасибо{name ? `, ${name}` : ""}! Заявка принята
                </h3>
                <div className="rounded-2xl bg-paper p-5 flex flex-col gap-2 text-[14px] text-navy/80">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-cognac">Ваше предложение</span>
                  <span className="font-semibold text-navy">{OFFERS[offer].label}</span>
                  <span className="text-navy/60">{OFFERS[offer].result}</span>
                  <span className="mt-2 text-navy/60">{objectType} · {area} м² · старт: {start.toLowerCase()}</span>
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-navy mb-3">Что дальше</p>
                  <ol className="flex flex-col gap-3">
                    {[
                      "Менеджер свяжется с вами в рабочее время и уточнит задачу по объекту",
                      "Согласуем следующий шаг: консультацию, замер или экскурсию на объект",
                      "После замера — смета в течение 24 часов и её личная презентация",
                    ].map((t, i) => (
                      <li key={i} className="flex gap-3 text-[14px] text-navy/70">
                        <span className="h-6 w-6 shrink-0 rounded-full bg-navy text-white text-[11px] font-bold flex items-center justify-center">{i + 1}</span>
                        {t}
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 mt-2">
                  <a href={`${SITE.whatsapp}?text=${waText}`} target="_blank" rel="noopener noreferrer" className="flex-1 rounded-full bg-navy text-white text-[14px] font-semibold py-4 text-center hover:bg-ink transition-colors">
                    Продублировать в WhatsApp
                  </a>
                  <button onClick={onClose} className="flex-1 rounded-full border border-navy/15 text-navy text-[14px] font-semibold py-4 hover:bg-paper">
                    Вернуться на сайт
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function LeadProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<LeadConfig | null>(null);
  const [key, setKey] = useState(0);
  const open = useCallback((c: LeadConfig) => {
    setConfig(c);
    setKey((k) => k + 1);
  }, []);
  const close = useCallback(() => setConfig(null), []);

  useEffect(() => {
    if (!config) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [config, close]);

  return (
    <LeadContext.Provider value={{ open }}>
      {children}
      <AnimatePresence>{config && <LeadDialog key={key} config={config} onClose={close} />}</AnimatePresence>
    </LeadContext.Provider>
  );
}
