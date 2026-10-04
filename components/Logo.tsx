import React from "react";

// Логотип «текст + символ» по брендбуку: СЕАЛ / ПРОЕКТ + контур дома.
export default function Logo({
  color = "#1F2A44",
  tagline,
  className = "",
  size = 1,
}: {
  color?: string;
  tagline?: string;
  className?: string;
  size?: number;
}) {
  const fs = 15 * size;
  return (
    <span className={"inline-flex flex-col select-none " + className} aria-label="СЕАЛ ПРОЕКТ">
      <span className="inline-flex items-stretch gap-[3px]">
        <span className="flex flex-col font-extrabold uppercase leading-[0.92] tracking-[-0.01em]" style={{ color, fontSize: fs }}>
          <span>СЕАЛ</span>
          <span>ПРОЕКТ</span>
        </span>
        <svg viewBox="0 0 40 44" style={{ height: fs * 1.92, width: "auto", marginTop: -fs * 0.1 }} fill="none" aria-hidden>
          <path d="M3 22 V16 L21 3 L38 16 V22" stroke={color} strokeWidth="4.2" strokeLinejoin="miter" />
          <path d="M14 22 H34 V42 H8" stroke={color} strokeWidth="4.2" />
          <path d="M14 22 V28" stroke={color} strokeWidth="4.2" />
        </svg>
      </span>
      {tagline && (
        <span className="mt-1 font-medium tracking-[0.02em]" style={{ color, fontSize: fs * 0.42, opacity: 0.8 }}>
          {tagline}
        </span>
      )}
    </span>
  );
}
