"use client";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, ArrowLeft, ArrowRight, Check, Gift, MessageCircle, Phone, Send, X } from "lucide-react";
import { CTA_MAIN, OFFERS, OfferId, PROMO_IDS, SITE, img } from "@/lib/site";
import { track } from "@/lib/analytics";

export type LeadConfig = {
  offer?: OfferId;
  source: string; // откуда открыта форма — уходит в CRM и в Метрику
  title?: string;
  subtitle?: string;
  image?: string;
  preset?: { area?: number; objectType?: string; note?: string; tour?: boolean };
};

type Ctx = { open: (c: LeadConfig) => void; promo: OfferId | null };
const LeadContext = createContext<Ctx>({ open: () => {}, promo: null });
export const useLead = () => useContext(LeadContext);

const OBJECT_TYPES = ["Новостройка", "Вторичное жильё", "Дом"];
const STARTS = ["В ближайший месяц", "Через 1–3 месяца", "Через 3–6 месяцев", "Пока планирую"];
const CONTACTS = [
  { id: "call", label: "Звонок", icon: Phone },
  { id: "whatsapp", label: "WhatsApp", icon: MessageCircle },
  { id: "telegram", label: "Telegram", icon: Send },
];

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
        "rounded-full px-4 py-2.5 text-[14px] font-medium border transition-colors " +
        (active ? "bg-navy text-white border-navy" : "bg-white text-navy/80 border-navy/15 hover:border-navy/40")
      }
    >
      {children}
    </button>
  );
}

type Status = "form" | "sending" | "done" | "whatsapp" | "error";

// Форма заявки: используется и во всплывающем окне, и встроенной в финальный блок
export function LeadForm({ config, onClose, inline = false }: { config: LeadConfig; onClose?: () => void; inline?: boolean }) {
  const offer: OfferId = config.offer || "calc";
  const [step, setStep] = useState(0);
  const [objectType, setObjectType] = useState(config.preset?.objectType || OBJECT_TYPES[0]);
  const [area, setArea] = useState(config.preset?.area || 70);
  const [start, setStart] = useState(STARTS[0]);
  const [tour, setTour] = useState(!!config.preset?.tour);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [contact, setContact] = useState("call");
  const [agree, setAgree] = useState(true);
  const [hp, setHp] = useState(""); // ловушка для ботов
  const [status, setStatus] = useState<Status>("form");
  const [error, setError] = useState("");

  const phoneOk = phone.replace(/\D/g, "").length === 11;
  const payload = useMemo(
    () => ({
      offer: OFFERS[offer].label,
      source: config.source,
      objectType,
      area,
      start,
      tour: tour ? "Да" : "Нет",
      name,
      phone,
      contact,
      note: config.preset?.note || "",
      page: typeof window !== "undefined" ? window.location.href : "",
      createdAt: new Date().toISOString(),
    }),
    [offer, config, objectType, area, start, tour, name, phone, contact]
  );

  const waText = encodeURIComponent(
    `Здравствуйте! Хочу получить расчёт стоимости ремонта.\n${offer !== "calc" ? `Предложение: ${OFFERS[offer].label}\n` : ""}Объект: ${objectType}, ${area} м²\nСтарт: ${start}\nЭкскурсия на объект: ${tour ? "да" : "нет"}\nИмя: ${name}\nТелефон: ${phone}` +
      (payload.note ? `\n${payload.note}` : "")
  );
  const waUrl = `${SITE.whatsapp}?text=${waText}`;

  async function submit() {
    if (!phoneOk) return setError("Проверьте номер телефона");
    if (!agree) return setError("Нужно согласие на обработку данных");
    setError("");
    if (hp) return; // бот

    // CRM ещё не подключена — честно отправляем заявку через WhatsApp, без ложного «заявка принята»
    if (!SITE.leadEndpoint) {
      window.open(waUrl, "_blank", "noopener");
      track("lead_whatsapp", { source: config.source, offer });
      setStatus("whatsapp");
      return;
    }

    setStatus("sending");
    try {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), 12000);
      const res = await fetch(SITE.leadEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: ctrl.signal,
      });
      clearTimeout(t);
      if (!res.ok) throw new Error(String(res.status));
      track("lead_submit", { source: config.source, offer });
      setStatus("done");
    } catch {
      track("lead_error", { source: config.source, offer });
      setStatus("error");
    }
  }

  const promoBox = offer !== "calc" && (
    <div className="flex items-start gap-3 rounded-2xl bg-cognac/10 p-4 text-[14px] text-navy">
      <Gift className="h-5 w-5 text-cognac shrink-0" />
      <span>
        <b>{OFFERS[offer].label}.</b> Условия и срок действия менеджер подтвердит при звонке.
      </span>
    </div>
  );

  return (
    <div className={"relative flex flex-col " + (inline ? "" : "p-6 sm:p-9")}>
      {!inline && onClose && (
        <button onClick={onClose} aria-label="Закрыть" className="absolute right-4 top-4 h-10 w-10 rounded-full bg-paper flex items-center justify-center text-navy hover:bg-sand transition-colors">
          <X className="h-5 w-5" />
        </button>
      )}

      {status === "form" || status === "sending" ? (
        <>
          <div className="flex items-center gap-2 mb-5">
            {[0, 1].map((i) => (
              <div key={i} className={"h-1 rounded-full transition-all " + (i <= step ? "w-10 bg-cognac" : "w-6 bg-navy/10")} />
            ))}
            <span className="ml-2 text-[12px] text-navy/60">Шаг {step + 1} из 2</span>
          </div>
          {config.title && <h3 className="t-h2 text-navy pr-10">{config.title}</h3>}
          {config.subtitle && <p className="mt-2 text-[16px] text-navy/65 leading-[1.6]">{config.subtitle}</p>}

          {step === 0 ? (
            <div className="mt-6 flex flex-col gap-6">
              {promoBox}
              <div>
                <p className="text-[14px] font-semibold text-navy mb-3">Тип объекта</p>
                <div className="flex flex-wrap gap-2">
                  {OBJECT_TYPES.map((t) => (
                    <Chip key={t} active={objectType === t} onClick={() => setObjectType(t)}>
                      {t}
                    </Chip>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex items-baseline justify-between mb-3">
                  <p className="text-[14px] font-semibold text-navy">Площадь</p>
                  <span className="t-h4 font-semibold text-navy">{area} м²</span>
                </div>
                <input
                  type="range"
                  min={20}
                  max={250}
                  value={area}
                  onChange={(e) => setArea(+e.target.value)}
                  className="range-brand w-full"
                  style={{ ["--p" as string]: ((area - 20) / 230) * 100 + "%" } as React.CSSProperties}
                  aria-label="Площадь"
                />
              </div>
              <div>
                <p className="text-[14px] font-semibold text-navy mb-3">Когда планируете начать</p>
                <div className="flex flex-wrap gap-2">
                  {STARTS.map((t) => (
                    <Chip key={t} active={start === t} onClick={() => setStart(t)}>
                      {t}
                    </Chip>
                  ))}
                </div>
              </div>
              <label className="flex items-start gap-3 rounded-2xl border border-navy/10 p-4 cursor-pointer hover:border-navy/30 transition-colors">
                <input type="checkbox" checked={tour} onChange={(e) => setTour(e.target.checked)} className="mt-1 h-4 w-4 accent-cognac" />
                <span>
                  <span className="block text-[14px] font-semibold text-navy">Хочу экскурсию на объект</span>
                  <span className="block text-[14px] text-navy/60">Покажем объект в работе или готовый объект, при необходимости — с трансфером</span>
                </span>
              </label>
              <button onClick={() => setStep(1)} className="group w-full flex items-center justify-between rounded-full bg-navy text-white p-1.5 pl-6 hover:bg-ink transition-colors">
                <span className="text-[16px] font-semibold">Дальше</span>
                <span className="h-11 w-11 rounded-full bg-cognac flex items-center justify-center">
                  <ArrowRight className="h-5 w-5" />
                </span>
              </button>
            </div>
          ) : (
            <div className="mt-6 flex flex-col gap-4">
              <label className="flex flex-col gap-1.5">
                <span className="text-[14px] font-semibold text-navy">Как к вам обращаться</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Имя"
                  autoComplete="name"
                  className="h-14 rounded-2xl bg-paper border border-transparent focus:border-cognac focus:bg-white px-5 text-[16px] text-navy outline-none transition-colors"
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-[14px] font-semibold text-navy">Телефон</span>
                <input
                  value={phone}
                  onChange={(e) => setPhone(maskPhone(e.target.value))}
                  onFocus={() => !phone && setPhone("+7")}
                  placeholder="+7 (___) ___-__-__"
                  inputMode="tel"
                  autoComplete="tel"
                  className="h-14 rounded-2xl bg-paper border border-transparent focus:border-cognac focus:bg-white px-5 text-[16px] text-navy outline-none transition-colors"
                />
              </label>
              <input value={hp} onChange={(e) => setHp(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" name="company" />
              <div>
                <p className="text-[14px] font-semibold text-navy mb-2">Где удобнее связаться</p>
                <div className="grid grid-cols-3 gap-2">
                  {CONTACTS.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setContact(c.id)}
                      className={"flex flex-col items-center gap-1.5 rounded-2xl border py-3 text-[14px] font-medium transition-colors " + (contact === c.id ? "border-navy bg-navy text-white" : "border-navy/10 text-navy/70 hover:border-navy/30")}
                    >
                      <c.icon className="h-4 w-4" />
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>
              <label className="flex items-start gap-3 text-[12px] text-navy/65 leading-[1.5] cursor-pointer">
                <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-0.5 h-4 w-4 accent-cognac" />
                Согласен на обработку персональных данных в соответствии с политикой конфиденциальности
              </label>
              {error && (
                <p role="alert" className="text-[14px] font-semibold text-cognac">
                  {error}
                </p>
              )}
              {!SITE.leadEndpoint && <p className="text-[12px] text-navy/55">Заявка откроется в WhatsApp с уже заполненным текстом — останется нажать «Отправить».</p>}
              <div className="flex gap-2 mt-1">
                <button onClick={() => setStep(0)} aria-label="Назад" className="h-14 w-14 shrink-0 rounded-full border border-navy/15 flex items-center justify-center text-navy hover:bg-paper">
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={submit}
                  disabled={status === "sending"}
                  className="group flex-1 flex items-center justify-between rounded-full bg-cognac text-white p-1.5 pl-6 hover:brightness-105 transition disabled:opacity-60"
                >
                  <span className="text-[16px] font-semibold text-left">{status === "sending" ? "Отправляем…" : SITE.leadEndpoint ? "Получить расчёт" : "Отправить в WhatsApp"}</span>
                  <span className="h-11 w-11 rounded-full bg-navy flex items-center justify-center">
                    <ArrowRight className="h-5 w-5" />
                  </span>
                </button>
              </div>
            </div>
          )}
        </>
      ) : status === "error" ? (
        <div className="flex flex-col gap-5 py-2">
          <div className="h-14 w-14 rounded-2xl bg-cognac/15 flex items-center justify-center">
            <AlertCircle className="h-7 w-7 text-cognac" />
          </div>
          <h3 className="t-h2 text-navy">Заявка не отправилась</h3>
          <p className="text-[16px] text-navy/70 leading-[1.6]">Похоже, проблема со связью. Чтобы не потерять ваш запрос, позвоните нам или отправьте заявку в WhatsApp — текст уже заполнен.</p>
          <div className="flex flex-col sm:flex-row gap-2">
            <a href={SITE.phoneHref} className="flex-1 rounded-full bg-navy text-white text-[16px] font-semibold py-4 text-center">
              {SITE.phone}
            </a>
            <a href={waUrl} target="_blank" rel="noopener noreferrer" className="flex-1 rounded-full bg-cognac text-white text-[16px] font-semibold py-4 text-center">
              Отправить в WhatsApp
            </a>
          </div>
          <button onClick={() => setStatus("form")} className="text-[14px] font-semibold text-navy/60 underline self-start">
            Попробовать ещё раз
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-5 py-2">
          <div className="h-14 w-14 rounded-2xl bg-cognac/15 flex items-center justify-center">
            <Check className="h-7 w-7 text-cognac" strokeWidth={2.5} />
          </div>
          <h3 className="t-h2 text-navy">{status === "done" ? `Спасибо${name ? `, ${name}` : ""}! Заявка принята` : "Осталось нажать «Отправить» в WhatsApp"}</h3>
          {status === "whatsapp" && (
            <p className="text-[16px] text-navy/70 leading-[1.6]">
              Мы открыли WhatsApp с заполненной заявкой. Если окно не открылось —{" "}
              <a href={waUrl} target="_blank" rel="noopener noreferrer" className="text-cognac font-semibold underline">
                откройте чат
              </a>{" "}
              или позвоните: <a href={SITE.phoneHref} className="font-semibold text-navy">{SITE.phone}</a>.
            </p>
          )}
          <div className="rounded-2xl bg-paper p-5 flex flex-col gap-1 text-[14px] text-navy/75">
            <span className="font-semibold text-navy">{OFFERS[offer].label}</span>
            <span>
              {objectType} · {area} м² · старт: {start.toLowerCase()}
              {tour ? " · экскурсия на объект" : ""}
            </span>
          </div>
          <ol className="flex flex-col gap-3">
            {["Менеджер свяжется с вами и уточнит задачу по объекту", "Согласуем замер" + (tour ? " и экскурсию на объект" : "") , "После замера — смета в течение 24 часов и её личная презентация"].map((t, i) => (
              <li key={i} className="flex gap-3 text-[16px] text-navy/75 leading-[1.5]">
                <span className="h-6 w-6 shrink-0 rounded-full bg-navy text-white text-[12px] font-bold flex items-center justify-center">{i + 1}</span>
                {t}
              </li>
            ))}
          </ol>
          {onClose && (
            <button onClick={onClose} className="rounded-full border border-navy/15 text-navy text-[16px] font-semibold py-4 hover:bg-paper">
              Вернуться на сайт
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function LeadDialog({ config, onClose }: { config: LeadConfig; onClose: () => void }) {
  return (
    <motion.div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="absolute inset-0 bg-ink/80" onClick={onClose} />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={config.title || CTA_MAIN}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 30, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="relative w-full sm:max-w-[920px] max-h-[94vh] overflow-y-auto bg-white rounded-t-[28px] sm:rounded-[28px] shadow-2xl grid grid-cols-1 md:grid-cols-[0.85fr_1.15fr]"
      >
        <div className="relative hidden md:flex flex-col justify-end p-8 min-h-[560px] overflow-hidden">
          <img {...img(config.image || "/img/cb00.jpg", { eager: true, sizes: "400px" })} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/10" />
          <div className="relative z-10 flex flex-col gap-2 text-[14px] text-white/85">
            <span className="t-h4 text-white mb-2">Что вы получите</span>
            <span className="flex items-center gap-2"><Check className="h-4 w-4 text-cognac" /> Предварительный расчёт стоимости</span>
            <span className="flex items-center gap-2"><Check className="h-4 w-4 text-cognac" /> Смету в течение 24 часов после замера</span>
            <span className="flex items-center gap-2"><Check className="h-4 w-4 text-cognac" /> Точность сметы ±10%</span>
            <span className="flex items-center gap-2"><Check className="h-4 w-4 text-cognac" /> Экскурсию на объект — по желанию</span>
          </div>
        </div>
        <LeadForm config={config} onClose={onClose} />
      </motion.div>
    </motion.div>
  );
}

export function LeadProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<LeadConfig | null>(null);
  const [key, setKey] = useState(0);
  const [promo, setPromo] = useState<OfferId | null>(null);

  useEffect(() => {
    // Рекламная связка: ?offer=sink | design-gift | early5 — все формы на странице ведут на этот оффер
    const p = new URLSearchParams(window.location.search).get("offer") as OfferId | null;
    if (p && PROMO_IDS.includes(p)) setPromo(p);
  }, []);

  const open = useCallback(
    (c: LeadConfig) => {
      const cfg = { title: CTA_MAIN, ...c, offer: c.offer || promo || "calc" };
      track("lead_open", { source: cfg.source });
      setConfig(cfg);
      setKey((k) => k + 1);
    },
    [promo]
  );
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
    <LeadContext.Provider value={{ open, promo }}>
      {children}
      <AnimatePresence>{config && <LeadDialog key={key} config={config} onClose={close} />}</AnimatePresence>
    </LeadContext.Provider>
  );
}
