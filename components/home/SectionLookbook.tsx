'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const looks = [
  { id: 1, label: 'Look 01 — Salt Air', accent: '#e8672a', image: '/images/5791779500948393430.jpg', wide: true },
  { id: 2, label: 'Look 02 — Dusk Walk', accent: '#e85d4a', image: '/images/5791779500948393431.jpg', wide: false },
  { id: 3, label: 'Look 03 — Afterlight', accent: '#1e6ea6', image: '/images/5791779500948393432.jpg', wide: false },
  { id: 4, label: 'Look 04 — Golden Hour', accent: '#e8672a', image: '/images/5791779500948393433.jpg', wide: true },
];

function LookbookCard({ look, i }: { look: typeof looks[0]; i: number }) {
  const [mouse, setMouse] = useState({ x: 50, y: 50 });
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMouse({ x, y });
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const img = imgRef.current;
    const card = cardRef.current;
    if (!img || !card) return;

    // Scroll-scrub parallax zoom and drift for the look image
    gsap.fromTo(img,
      { y: '-10%', scale: 1.15 },
      {
        y: '5%',
        scale: 1.05,
        ease: 'none',
        scrollTrigger: {
          trigger: card,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <div
      ref={cardRef}
      className="lookbook-card overflow-hidden will-change-[clip-path,transform]"
      style={{
        clipPath: 'inset(100% 0% 0% 0%)',
        transform: 'translateY(60px)',
      }}
    >
      <Link
        href="/lookbook"
        className="group block relative overflow-hidden bg-[#0d1f14] w-full"
        data-cursor="image"
        style={{ aspectRatio: look.wide ? '16/10' : '3/4' }}
        onMouseMove={handleMouseMove}
      >
        {/* Parallax Container for Image */}
        <div ref={imgRef} className="absolute -inset-[15%] w-[130%] h-[130%] pointer-events-none">
          <Image
            src={look.image}
            alt={look.label}
            fill
            sizes={look.wide ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 50vw, 33vw"}
            className="object-cover opacity-75 mix-blend-lighten transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-103"
          />
        </div>

        {/* Liquid gradient orb overlay */}
        <div
          className="absolute inset-0 opacity-30 transition-opacity duration-500 group-hover:opacity-60 mix-blend-color-dodge pointer-events-none"
          style={{
            background: `radial-gradient(circle 220px at ${mouse.x}% ${mouse.y}%, ${look.accent}44 0%, transparent 100%)`,
          }}
        />

        {/* Hover vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />

        {/* Editorial styling tags inside */}
        <div className="absolute top-5 left-5 text-[8px] tracking-[0.25em] text-white/50 bg-[#060f17]/60 backdrop-blur-md px-2.5 py-1 border border-white/5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          ARUBA COLL · LOOK {String(look.id).padStart(2, '0')}
        </div>

        {/* Look label */}
        <div className="absolute bottom-0 left-0 w-full px-6 py-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] z-20">
          <p
            className="text-white text-[10px] tracking-[0.3em] uppercase flex items-center gap-3"
            style={{ fontFamily: '"Work Sans", sans-serif' }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: look.accent }} />
            {look.label}
          </p>
        </div>

        {/* Corner accent */}
        <div
          className="absolute top-5 right-5 w-1.5 h-1.5 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300 z-10"
          style={{ backgroundColor: look.accent }}
        />
      </Link>
    </div>
  );
}

export default function SectionLookbook() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = sectionRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // 0. Section-level transition: Horizontal Curtain-Draw Wipe
      gsap.fromTo(container,
        { clipPath: 'inset(0% 50% 0% 50%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'top 15%',
            scrub: 0.5,
          }
        }
      );

      // 1. Header scroll animation
      const header = container.querySelector('.lookbook-header');
      if (header) {
        gsap.fromTo(header,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: header,
              start: 'top 85%',
            },
          }
        );
      }

      // 2. Staggered clip-path reveal for lookbook grid cards
      const cards = container.querySelectorAll('.lookbook-card');
      if (cards.length > 0) {
        gsap.fromTo(cards,
          { clipPath: 'inset(100% 0% 0% 0%)', y: 60 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            y: 0,
            duration: 1.4,
            stagger: 0.18,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: '.lookbook-grid',
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
      data-ambient-section="lookbook"
      className="relative py-32 md:py-48 px-8 md:px-16 overflow-hidden bg-[#060f17]"
      style={{ background: 'linear-gradient(180deg, #060f17 0%, #0c1a12 100%)' }}
    >
      {/* Palm green glow bottom left */}
      <div className="absolute bottom-0 left-0 w-[50vw] h-[50vh] bg-[radial-gradient(ellipse_at_bottom_left,_rgba(45,90,39,0.15)_0%,_transparent_65%)] pointer-events-none" />

      <div className="max-w-screen-xl mx-auto relative z-10">
        {/* Header */}
        <div className="lookbook-header mb-20 md:mb-28 opacity-0">
          <p className="text-[10px] tracking-[0.4em] text-white/40 uppercase mb-4" style={{ fontFamily: '"Work Sans", sans-serif' }}>
            03 — Lookbook
          </p>
          <div className="flex items-end justify-between">
            <h2
              className="oi-regular text-white leading-none"
              style={{ fontSize: 'clamp(2.5rem, 6.5vw, 6rem)' }}
            >
              The Look
            </h2>
            <Link
              href="/lookbook"
              className="hidden md:inline-flex items-center gap-3 text-white/50 hover:text-white text-xs tracking-[0.25em] uppercase transition-colors duration-300"
              data-cursor="button"
              style={{ fontFamily: '"Work Sans", sans-serif' }}
            >
              Full Lookbook →
            </Link>
          </div>
        </div>

        {/* Editorial grid — mixed aspect ratios */}
        <div className="lookbook-grid grid grid-cols-2 md:grid-cols-6 gap-3 md:gap-4">
          {looks.map((look, i) => (
            <div
              key={look.id}
              className={look.wide ? 'col-span-2 md:col-span-4' : 'col-span-1 md:col-span-2'}
            >
              <LookbookCard look={look} i={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
