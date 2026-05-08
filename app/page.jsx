'use client';

import { useEffect } from 'react';
import NSHeader from '@/components/Header';
import NSHero from '@/components/Hero';
import NSBand from '@/components/Band';
import NSBrandBar from '@/components/BrandBar';
import NSWhy from '@/components/Why';
import NSProcess from '@/components/Process';
import NSProjects from '@/components/Projects';
import NSQuoteForm from '@/components/QuoteForm';
import NSTestimonials from '@/components/Testimonials';
import NSWhyChoose from '@/components/WhyChoose';
import NSProblema from '@/components/Problema';
import NSSolution from '@/components/Solution';
import NSFooter from '@/components/Footer';
import NSWhatsAppFab from '@/components/WhatsAppFab';

export default function Page() {
  const scrollToCotiza = () => {
    const el = document.getElementById('cotiza');
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 60;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const els = document.querySelectorAll('.ns-section, .ns-hero, .ns-brandbar');
    els.forEach(el => el.classList.add('ns-reveal'));
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <NSHeader active="INICIO" />
      <main>
        <NSHero />
        <NSBand/>
        <NSProblema/>
        <NSSolution/>
        <NSBrandBar />
        <NSWhy />
        <NSProcess onCotizar={scrollToCotiza} />
        <NSProjects />
        <NSQuoteForm id="cotiza" />
        <NSTestimonials />
        <NSWhyChoose />
      </main>
      <NSFooter />
      <NSWhatsAppFab />
    </>
  );
}
