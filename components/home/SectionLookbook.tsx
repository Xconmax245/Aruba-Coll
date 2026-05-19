'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const looks = [
  { id: 1, label: 'Look 01 — Salt Air', accent: '#e8672a', wide: true },
  { id: 2, label: 'Look 02 — Dusk Walk', accent: '#e85d4a', wide: false },
  { id: 3, label: 'Look 03 — Afterlight', accent: '#1e6ea6', wide: false },
  { id: 4, label: 'Look 04 — Golden Hour', accent: '#e8672a', wide: true },
];

export default function SectionLookbook() {
  return (
    <section
      data-scroll-context="story"
      data-ambient-section="lookbook"
      className="relative py-32 md:py-48 px-8 md:px-16 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #060f17 0%, #0c1a12 100%)' }}
    >
      {/* Palm green glow bottom left */}
      <div className="absolute bottom-0 left-0 w-[50vw] h-[50vh] bg-[radial-gradient(ellipse_at_bottom_left,_rgba(45,90,39,0.15)_0%,_transparent_65%)] pointer-events-none" />

      <div className="max-w-screen-xl mx-auto">
        {/* Header */}
        <div
          data-aos="fade-up"
          data-aos-duration="900"
          className="mb-20 md:mb-28"
        >
          <p className="text-[10px] tracking-[0.4em] text-white/40 uppercase mb-4">03 — Lookbook</p>
          <div className="flex items-end justify-between">
            <h2
              className="oi-regular text-white leading-none"
              style={{ fontSize: 'clamp(3rem, 7vw, 7rem)' }}
            >
              The Look
            </h2>
            <Link
              href="/lookbook"
              className="hidden md:inline-flex items-center gap-3 text-white/50 hover:text-white text-xs tracking-[0.25em] uppercase transition-colors duration-300"
              data-cursor="button"
            >
              Full Lookbook →
            </Link>
          </div>
        </div>

        {/* Editorial grid — mixed aspect ratios */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 md:gap-4">
          {looks.map((look, i) => (
            <div
              key={look.id}
              data-aos="fade-up"
              data-aos-delay={120 * i}
              data-aos-duration="1000"
              className={look.wide ? 'md:col-span-4' : 'md:col-span-2'}
            >
              <Link
                href="/lookbook"
                className="group block relative overflow-hidden bg-[#0d1f14]"
                data-cursor="image"
                style={{ aspectRatio: look.wide ? '16/10' : '3/4' }}
              >
                {/* Colour field */}
                <div
                  className="absolute inset-0 opacity-20 group-hover:opacity-35 transition-opacity duration-700"
                  style={{
                    background: `radial-gradient(ellipse at 50% 40%, ${look.accent}88 0%, transparent 65%)`,
                  }}
                />

                {/* Hover reveal overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Look label */}
                <div className="absolute bottom-0 left-0 w-full px-5 py-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                  <p
                    className="text-white text-[10px] tracking-[0.3em] uppercase"
                    style={{ fontFamily: '"Work Sans", sans-serif' }}
                  >
                    {look.label}
                  </p>
                </div>

                {/* Corner accent */}
                <div
                  className="absolute top-5 right-5 w-1.5 h-1.5 rounded-full opacity-60"
                  style={{ backgroundColor: look.accent }}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
