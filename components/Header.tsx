"use client";

import { useState, useEffect } from "react";

export default function NSHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-100 transition-[background,backdrop-filter] duration-240 ease-in-out${
        scrolled
          ? " bg-[rgba(15,26,46,0.85)] backdrop-blur-md shadow-[0_4px_20px_rgba(15,26,46,0.18)]"
          : ""
      }`}
    >
      <div className="max-w-310 mx-auto h-20 px-8 flex items-center justify-between">
        <a href="#">
          <img
            src="/assets/logo-dark-bg.png"
            alt="Norsolar"
            className="h-9.5 block"
          />
        </a>
        <a href="#cotiza" className="ns-btn ns-btn-primary ns-btn-sm">
          Cotiza Gratis
        </a>
      </div>
    </header>
  );
}
