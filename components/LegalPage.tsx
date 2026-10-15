import React from "react";
import Logo from "@/components/Logo";
import { LEGAL, SITE, asset } from "@/lib/site";

// Оформление юридических страниц
export default function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  const legal = [LEGAL.company, LEGAL.inn && `ИНН ${LEGAL.inn}`, LEGAL.ogrn && `ОГРН ${LEGAL.ogrn}`].filter(Boolean).join(", ");
  return (
    <div className="min-h-screen bg-paper">
      <header className="bg-navy">
        <div className="max-w-4xl mx-auto px-5 md:px-8 py-5 flex items-center justify-between gap-4">
          <a href={asset("/")} aria-label="На главную">
            <Logo color="white" width={110} />
          </a>
          <a href={asset("/")} className="text-[14px] font-semibold text-white/80 hover:text-white">
            ← На главную
          </a>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-5 md:px-8 py-12 md:py-16">
        <h1 className="t-section text-navy">{title}</h1>
        <p className="mt-3 text-[14px] text-navy/55">Редакция от {LEGAL.policyDate}</p>
        <div className="legal mt-10 rounded-[24px] bg-white border border-navy/10 p-6 md:p-10 text-[16px] leading-[1.65] text-navy/85">{children}</div>
        <p className="mt-8 text-[14px] text-navy/55">
          Оператор: {legal}. Контакты: {SITE.phone}, {LEGAL.email}, {LEGAL.officeAddress}.
        </p>
      </main>
    </div>
  );
}
