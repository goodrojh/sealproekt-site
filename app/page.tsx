"use client";
import { MotionConfig } from "framer-motion";
import { LeadProvider } from "@/components/lead/LeadModal";
import Analytics from "@/components/Analytics";
import Hero from "@/components/sections/Hero";
import Cases from "@/components/sections/Cases";
import Calculator from "@/components/sections/Calculator";
import Advantages from "@/components/sections/Advantages";
import TourReviews from "@/components/sections/TourReviews";
import Process from "@/components/sections/Process";
import Footer from "@/components/sections/Footer";
import MobileBar from "@/components/MobileBar";

// 7 блоков по правкам маркетолога: оффер → примеры с ценами → калькулятор → преимущества →
// экскурсия и отзывы → этапы → финальное предложение с формой
export default function Home() {
  return (
    <MotionConfig reducedMotion="user">
      <LeadProvider>
        <main className="min-h-screen overflow-x-clip">
          <Hero />
          <Cases />
          <Calculator />
          <Advantages />
          <TourReviews />
          <Process />
          <Footer />
        </main>
        <MobileBar />
        <Analytics />
      </LeadProvider>
    </MotionConfig>
  );
}
