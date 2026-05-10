"use client";

import { useEffect, useState } from "react";
import NSHeader from "@/components/Header";
import NSHero from "@/components/Hero";
import NSBand from "@/components/Band";
import NSBrandBar from "@/components/BrandBar";
import NSWhy from "@/components/Why";
import NSProjects from "@/components/Projects";
import NSQuoteForm from "@/components/QuoteForm";
import NSTestimonials from "@/components/Testimonials";
import NSProblema from "@/components/Problema";
import NSFooter from "@/components/Footer";
import NSWhatsAppFab from "@/components/WhatsAppFab";
import NSInput from "@/components/NSInput";
import NSKitRecommendation from "@/components/NSKitRecommendation";
import NSSavingsResults from "@/components/NSSavingsResults";
import SavingsMonthly from "@/components/SavingsMonthly";
import NSKitsCarousel from "@/components/KitsCarousel";
import type { CalculateResponse } from "@/lib/solar/types";

export default function Page() {
  const [calc, setCalc] = useState<CalculateResponse | null>(null);

  useEffect(() => {
    const els = document.querySelectorAll(
      ".ns-section, .ns-hero, .ns-brandbar",
    );
    els.forEach((el) => el.classList.add("ns-reveal"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <NSHeader active="INICIO" />
      <main>
        <NSHero />
        <NSBand />
        <NSProblema />
        <NSInput onCalculate={setCalc} />
        <NSKitRecommendation recommendation={calc?.recommended_kit} />
        <NSSavingsResults result={calc} />
        <SavingsMonthly result={calc} />
        <NSKitsCarousel result={calc} />
        <NSBrandBar />
        <NSTestimonials />
        <NSWhy />
        <NSProjects />
        <NSQuoteForm id="cotiza" calculationId={calc?.calculation_id} />
      </main>
      <NSFooter />
      <NSWhatsAppFab />
    </>
  );
}
