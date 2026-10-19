"use client";
import { MotionConfig } from "framer-motion";
import { LeadProvider } from "@/components/lead/LeadModal";
import Analytics from "@/components/Analytics";
import Hero from "@/components/sections/Hero";
import Cases from "@/components/sections/Cases";
import LeadSection from "@/components/sections/LeadSection";
import Advantages from "@/components/sections/Advantages";
import TourReviews from "@/components/sections/TourReviews";
import Process from "@/components/sections/Process";
import Footer from "@/components/sections/Footer";
import MobileBar from "@/components/MobileBar";
import FloatingMessengers from "@/components/Messengers";

// Оффер → примеры с ценами → форма расчёта → преимущества → экскурсия и отзывы → этапы → короткий призыв к форме
export default function Home() {
  return (
    <MotionConfig reducedMotion="user">
      <LeadProvider>
        <main className="min-h-screen overflow-x-clip">
          <Hero />
          <Cases />
          <LeadSection />
          <Advantages />
          <TourReviews />
          <Process />
          <Footer />
        </main>
        <FloatingMessengers />
        <MobileBar />
        <Analytics />
      </LeadProvider>
    </MotionConfig>
  );
}
