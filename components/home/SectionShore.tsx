'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const features = [
  { num: '01', label: 'Sun-Kissed Fabrics', desc: 'Lightweight linens and organic cotton sourced from sustainable coastal mills.' },
  { num: '02', label: 'Fluid Silhouettes', desc: 'Cuts designed for movement — cinematic warmth, tropical haze, effortless motion.' },
  { num: '03', label: 'Limited Editions', desc: 'Each collection is capped. Once the tide goes out, it doesn\'t return.' },
];

function ShoreCard({ f, i }: { f: typeof features[0]; i: number }) {
  const [hovered, setHovered] = useState(false);
  const [mouse, setMouse] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMouse({ x, y });
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      className="shore-card relative p-8 md:p-12 border border-white/5 backdrop-blur-md overflow-hidden group rounded-[4px] will-change-[transform,opacity]"
      style={{
        background: hovered 
          ? `radial-gradient(circle 180px at ${mouse.x}% ${mouse.y}%, rgba(232,93,74,0.06) 0%, rgba(10,22,40,0.98) 100%)`
          : 'rgba(255,255,255,0.02)',
        borderColor: hovered ? 'rgba(232,93,74,0.18)' : 'rgba(255,255,255,0.05)',
        boxShadow: hovered ? '0 20px 40px -15px rgba(5,13,26,0.6)' : 'none',
        transition: 'background 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease',
      }}
    >
      {/* Massive background number with subtle drift */}
      <div 
        className="absolute -top-10 -right-6 pointer-events-none select-none opacity-[0.03] group-hover:opacity-[0.09] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          transform: hovered 
            ? `translate3d(${(mouse.x - 50) * 0.15}px, ${(mouse.y - 50) * 0.15}px, 0) scale(1.05)`
            : 'translate3d(0, 0, 0) scale(1)',
        }}
      >
        <span className="oi-regular text-9xl">{f.num}</span>
      </div>
      
      <div className="relative z-10 h-full flex flex-col">
        <span className="text-coral/60 text-[10px] tracking-[0.25em] mb-16 block font-mono">
          VOL.{f.num}
        </span>
        
        <h3
          className="text-white text-lg md:text-xl tracking-[0.1em] uppercase mb-4 transition-transform duration-300 group-hover:translate-x-1"
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
        <div 
          className="h-[1px] bg-coral mt-8 transition-all duration-700 ease-out" 
          style={{ width: hovered ? '100%' : '0%' }}
        />
      </div>
    </div>
  );
}

export default function SectionShore() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const introSentence = "Luxury doesn't shout. It arrives like the tide — inevitable, effortless, leaving nothing unchanged.";
  const introWords = introSentence.split(' ');

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = sectionRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;

      // 1. Backdrop Splitting Word Parallax
      const driftWord = container.querySelector('.shore-drift');
      const philosophyWord = container.querySelector('.shore-philosophy');
      if (driftWord && philosophyWord) {
        gsap.fromTo(driftWord,
          { xPercent: 10 },
          {
            xPercent: -15,
            scrollTrigger: {
              trigger: container,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
        gsap.fromTo(philosophyWord,
          { xPercent: -10 },
          {
            xPercent: 15,
            scrollTrigger: {
              trigger: container,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }

      // 2. Wave-like Intro Text Reveal (Scroll-paint)
      const words = container.querySelectorAll('.shore-intro-word');
      if (words.length > 0) {
        gsap.fromTo(words,
          {
            opacity: 0.1,
            y: 14,
            filter: 'blur(3px)',
          },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            stagger: 0.05,
            duration: 0.75,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '.shore-intro',
              start: 'top 88%',
              end: 'bottom 40%',
              scrub: 0.8,
            },
          }
        );
      }

      // 3. Staggered Cascading Card Entrances
      const cards = container.querySelectorAll('.shore-card');
      const desktopOffsets = [-64, 64, 192];
      const initialOffsets = desktopOffsets.map(val => val + 60);

      if (cards.length > 0) {
        gsap.fromTo(cards,
          {
            opacity: 0,
            y: (i) => isMobile ? 50 : initialOffsets[i],
            scale: 0.96,
          },
          {
            opacity: 1,
            y: (i) => isMobile ? 0 : desktopOffsets[i],
            scale: 1,
            duration: 1.4,
            stagger: 0.16,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: '.shore-grid',
              start: 'top 80%',
            },
          }
        );
      }
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-scroll-context="story"
      data-ambient-section="shore"
      className="relative py-40 md:py-64 px-8 md:px-16 overflow-hidden bg-[#050d1a]"
    >
      {/* ── Stationary Background Typography Parallax ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0 w-full flex flex-col justify-center items-center text-center opacity-[0.14]">
        <span 
          className="shore-drift oi-regular leading-[0.85] text-transparent block will-change-transform" 
          style={{ fontSize: 'clamp(3.5rem, 11vw, 16rem)', WebkitTextStroke: '1.5px rgba(255,255,255,0.4)' }}
        >
          DRIFT
        </span>
        <span 
          className="shore-philosophy oi-regular leading-[0.85] text-transparent block mt-4 will-change-transform" 
          style={{ fontSize: 'clamp(3.5rem, 11vw, 16rem)', WebkitTextStroke: '1.5px rgba(255,255,255,0.4)' }}
        >
          PHILOSOPHY
        </span>
      </div>

      <div className="relative z-10 max-w-screen-xl mx-auto flex flex-col items-center">
        
        {/* Intro */}
        <div className="shore-intro text-center mb-32 md:mb-48">
          <p className="text-[10px] tracking-[0.4em] text-coral/70 uppercase mb-8" style={{ fontFamily: '"Work Sans", sans-serif' }}>
            04 — Our Philosophy
          </p>
          <p
            className="text-white/80 text-2xl md:text-4xl lg:text-5xl leading-[1.38] max-w-[24ch] mx-auto flex flex-wrap justify-center gap-x-[0.25em] gap-y-[0.06em]"
            style={{ fontFamily: '"Work Sans", sans-serif', fontWeight: 300 }}
          >
            {introWords.map((word, wordIdx) => (
              <span
                key={wordIdx}
                className="shore-intro-word inline-block will-change-[transform,opacity,filter]"
                style={{ opacity: 0.1, transform: 'translateY(14px)', filter: 'blur(3px)' }}
              >
                {word}
              </span>
            ))}
          </p>
        </div>

        {/* Staggered Features Grid */}
        <div className="shore-grid grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 w-full md:pb-48">
          {features.map((f, i) => (
            <ShoreCard key={f.num} f={f} i={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
