import React from "react";
import { asset } from "@/lib/site";

// Оригинальный логотип «текст + символ» из файлов заказчика (прозрачный PNG, пропорции не меняются).
// variant: mark — без слогана (шапка), full — со слоганом «дизайн и ремонт под ключ».
export default function Logo({
  color = "navy",
  variant = "mark",
  width = 112,
  className = "",
}: {
  color?: "navy" | "white";
  variant?: "mark" | "full";
  width?: number;
  className?: string;
}) {
  const ratio = variant === "mark" ? 355 / 888 : 425 / 888;
  return (
    <img
      src={asset(`/brand/logo-${variant}-${color}.png`)}
      alt="СЕАЛ ПРОЕКТ"
      width={width}
      height={Math.round(width * ratio)}
      decoding="async"
      className={"block select-none " + className}
      style={{ width, height: "auto" }}
      draggable={false}
    />
  );
}
