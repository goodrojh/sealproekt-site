import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ремонт квартир под ключ в Красноярске от 20 000 ₽/м² — СЕАЛ ПРОЕКТ",
  description:
    "Дизайн-проект и ремонт квартир под ключ в Красноярске с 2012 года. Смета за 24 часа после замера, точность ±10%, персональный проектный менеджер, экскурсия на объект в работе.",
  keywords: ["ремонт квартир Красноярск", "ремонт под ключ", "дизайн-проект Красноярск", "СЕАЛ ПРОЕКТ"],
  openGraph: {
    title: "СЕАЛ ПРОЕКТ — ремонт квартир под ключ в Красноярске",
    description: "Ремонт не должен становиться вашей второй работой. Смета за 24 часа после замера, ±10%.",
    locale: "ru_RU",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#1F2A44",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body className={`${montserrat.variable} antialiased`}>{children}</body>
    </html>
  );
}
