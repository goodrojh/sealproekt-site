"use client";
import { MotionConfig } from "framer-motion";
import { LeadProvider } from "@/components/lead/LeadModal";
import Hero from "@/components/sections/Hero";
import Fears from "@/components/sections/Fears";
import Formats from "@/components/sections/Formats";
import Commercial from "@/components/sections/Commercial";
import Marquee from "@/components/sections/Marquee";
import Control from "@/components/sections/Control";
import Excursion from "@/components/sections/Excursion";
import Calculator from "@/components/sections/Calculator";
import Showcase from "@/components/sections/Showcase";
import Gallery from "@/components/sections/Gallery";
import Process from "@/components/sections/Process";
import DesignPricing from "@/components/sections/DesignPricing";
import Cases from "@/components/sections/Cases";
import Offers from "@/components/sections/Offers";
import FAQ from "@/components/sections/FAQ";
import Footer from "@/components/sections/Footer";
import MobileBar from "@/components/MobileBar";

export default function Home() {
  return (
    <MotionConfig reducedMotion="user">
    <LeadProvider>
      <main className="min-h-screen overflow-x-clip">
        <Hero />
        <Cases />
        <Fears />
        <Formats />
        <Commercial />
        <Marquee />
        <Control />
        <Excursion />
        <Calculator />
        <Showcase />
        <Gallery />
        <Process />
        <DesignPricing />
        <Offers />
        <FAQ />
        <Footer />
      </main>
      <MobileBar />
    </LeadProvider>
    </MotionConfig>
  );
}
