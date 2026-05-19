'use client';

import React from 'react';
import { motion } from 'framer-motion';

const features = [
  { num: '01', label: 'Sun-Kissed Fabrics', desc: 'Lightweight linens and organic cotton sourced from sustainable coastal mills.' },
  { num: '02', label: 'Fluid Silhouettes', desc: 'Cuts designed for movement — cinematic warmth, tropical haze, effortless motion.' },
  { num: '03', label: 'Limited Editions', desc: 'Each collection is capped. Once the tide goes out, it doesn\'t return.' },
];

export default function SectionShore() {
  return (
    <section
      data-scroll-context="story"
      data-ambient-section="shore"
      className="relative py-40 md:py-64 px-8 md:px-16 overflow-hidden bg-[#050d1a]"
    >
      {/* ── Stationary Background Typography ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0 w-full flex justify-center text-center opacity-20">
        <span 
          className="oi-regular leading-[0.85] text-transparent" 
          style={{ fontSize: 'clamp(4rem, 11vw, 18rem)', WebkitTextStroke: '2px rgba(255,255,255,0.5)' }}
        >
          DRIFT<br />PHILOSOPHY
        </span>
      </div>

      <div className="relative z-10 max-w-screen-xl mx-auto flex flex-col items-center">
        
        {/* Intro */}
        <div className="text-center mb-32 md:mb-48" data-aos="fade-up" data-aos-duration="1000">
          <p className="text-[10px] tracking-[0.4em] text-coral/70 uppercase mb-8">04 — Our Philosophy</p>
          <p
            className="text-white/80 text-2xl md:text-4xl lg:text-5xl leading-[1.4] max-w-[24ch] mx-auto"
            style={{ fontFamily: '"Work Sans", sans-serif', fontWeight: 300 }}
          >
            Luxury doesn&apos;t shout. It arrives like the tide — inevitable, effortless, leaving nothing unchanged.
          </p>
        </div>

        {/* Staggered Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 w-full">
          {features.map((f, i) => (
            <div
              key={f.num}
              data-aos="fade-up"
              data-aos-delay={i * 200}
              data-aos-duration="1200"
              className={`relative p-8 md:p-12 border border-white/5 backdrop-blur-md bg-white/[0.02] overflow-hidden group ${
                i === 0 ? 'md:-translate-y-16' : i === 1 ? 'md:translate-y-16' : 'md:translate-y-48'
              }`}
            >
              {/* Massive background number inside the card */}
              <div className="absolute -top-10 -right-6 pointer-events-none select-none opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700">
                <span className="oi-regular text-9xl">{f.num}</span>
              </div>
              
              <div className="relative z-10 h-full flex flex-col">
                <span className="text-coral/60 text-[10px] tracking-widest mb-16 block font-mono">
                  VOL.{f.num}
                </span>
                
                <h3
                  className="text-white text-lg md:text-xl tracking-[0.1em] uppercase mb-4"
                  style={{ fontFamily: '"Work Sans", sans-serif', fontWeight: 400 }}
                >
                  {f.label}
                </h3>
                
                <p
                  className="text-white/40 text-sm leading-relaxed mt-auto"
                  style={{ fontFamily: '"Work Sans", sans-serif', fontWeight: 300 }}
                >
                  {f.desc}
                </p>

                {/* Animated Line on Hover */}
                <div className="h-[1px] w-0 bg-coral mt-8 group-hover:w-full transition-all duration-700 ease-out" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
