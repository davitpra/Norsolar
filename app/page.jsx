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
import NSSavingsResults from "@/components/SavingsResults";
import NSFooter from "@/components/Footer";
import NSWhatsAppFab from "@/components/WhatsAppFab";
import NSSolution from "@/components/Solution";

export default function Page() {
  const [monthlyBill, setMonthlyBill] = useState(80);

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
        <NSSolution/>
        <NSBrandBar />
        <NSTestimonials />
        <NSWhy />
        <NSProjects />
        <NSQuoteForm id="cotiza" onCalculate={setMonthlyBill} />
      </main>
      <NSFooter />
      <NSWhatsAppFab />
    </>
  );
}
