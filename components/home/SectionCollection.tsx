'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const collections = [
  {
    id: 1,
    name: 'SALT WIND',
    sub: 'Sunfade Collection',
    tag: 'SS \'26',
    color: '#e8672a',
    bg: 'from-[#1a2a1a] to-[#0d1a0d]',
    pieces: '14 pieces',
  },
  {
    id: 2,
    name: 'CORAL DUSK',
    sub: 'Evening Silhouettes',
    tag: 'SS \'26',
    color: '#e85d4a',
    bg: 'from-[#2a1a14] to-[#1a0d0a]',
    pieces: '9 pieces',
  },
  {
    id: 3,
    name: 'OPEN WATER',
    sub: 'Drift System',
    tag: 'SS \'26',
    color: '#1e6ea6',
    bg: 'from-[#0d1e2a] to-[#060f17]',
    pieces: '11 pieces',
  },
];

function CollectionCard({ col, i }: { col: typeof collections[0]; i: number }) {
  const [mouse, setMouse] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMouse({ x, y });
  };

  return (
    <div
      className="collection-card overflow-hidden will-change-[clip-path,transform]"
      style={{ clipPath: 'inset(100% 0% 0% 0%)', transform: 'translateY(50px)' }}
    >
      <Link
        href="/collections"
        className="group block relative aspect-[3/4] overflow-hidden"
        data-cursor="image"
        onMouseMove={handleMouseMove}
      >
        {/* Collection card bg */}
        <div
          className={`absolute inset-0 bg-gradient-to-b ${col.bg} transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105`}
        />

        {/* Mouse-interactive atmospheric colour orb */}
        <div
          className="absolute inset-0 opacity-40 transition-opacity duration-500 group-hover:opacity-70 mix-blend-screen pointer-events-none"
          style={{
            background: `radial-gradient(circle 250px at ${mouse.x}% ${mouse.y}%, ${col.color}44 0%, transparent 80%)`,
          }}
        />

        {/* Horizontal scan lines for texture */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.8) 3px, rgba(255,255,255,0.8) 4px)',
          }}
        />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-between p-8 z-10">
          <div className="flex justify-between items-start">
            <span
              className="text-[9px] tracking-[0.35em] uppercase border border-white/20 text-white/70 px-3 py-1 backdrop-blur-sm bg-white/[0.03]"
              style={{ fontFamily: '"Work Sans", sans-serif' }}
            >
              {col.tag}
            </span>
            <span
              className="text-[9px] tracking-[0.25em] uppercase text-white/50 bg-[#060f17]/40 px-2 py-1 backdrop-blur-sm"
              style={{ fontFamily: '"Work Sans", sans-serif' }}
            >
              {col.pieces}
            </span>
          </div>

          <div>
            <p
              className="text-white/50 text-[10px] tracking-widest uppercase mb-3"
              style={{ fontFamily: '"Work Sans", sans-serif' }}
            >
              {col.sub}
            </p>
            <h3
              className="oi-regular text-white leading-none mb-4 group-hover:translate-x-2 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
            >
              {col.name}
            </h3>
            <div
              className="flex items-center gap-3 text-white/50 group-hover:text-white/90 transition-colors duration-300 text-[10px] tracking-widest uppercase"
              style={{ fontFamily: '"Work Sans", sans-serif' }}
            >
              <span
                className="block h-[1px] w-6 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-16"
                style={{ backgroundColor: col.color }}
              />
              <span className="group-hover:translate-x-1 transition-transform duration-500">View</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function SectionCollection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = sectionRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // 0. Section-level transition: Rounded Floating Card expands to full-screen
      gsap.fromTo(container,
        { clipPath: 'inset(12% 8% 12% 8% round 30px)' },
        {
          clipPath: 'inset(0% 0% 0% 0% round 0px)',
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'top 15%',
            scrub: 0.5,
          }
        }
      );

      // 1. Header scroll reveal
      const header = container.querySelector('.collection-header');
      if (header) {
        gsap.fromTo(header,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: header,
              start: 'top 85%',
            },
          }
        );
      }

      // 2. Cards staggered clip-path reveal
      const cards = container.querySelectorAll('.collection-card');
      if (cards.length > 0) {
        gsap.fromTo(cards,
          { clipPath: 'inset(100% 0% 0% 0%)', y: 50 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            y: 0,
            duration: 1.4,
            stagger: 0.15,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: '.collection-grid',
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
      data-scroll-context="shop"
      className="relative py-32 md:py-48 px-8 md:px-16 overflow-hidden bg-[#060f17]"
    >
      {/* Subtle warm glow top center */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-[30vh] bg-[radial-gradient(ellipse,_rgba(232,103,42,0.06)_0%,_transparent_70%)] pointer-events-none" />

      <div className="max-w-screen-xl mx-auto relative z-10">
        {/* Section header */}
        <div className="collection-header flex items-end justify-between mb-20 md:mb-28 opacity-0">
          <div>
            <p className="text-[10px] tracking-[0.4em] text-white/40 uppercase mb-4" style={{ fontFamily: '"Work Sans", sans-serif' }}>
              02 — Collections
            </p>
            <h2
              className="oi-regular text-white leading-none"
              style={{ fontSize: 'clamp(2.5rem, 6.5vw, 6rem)' }}
            >
              The Season
            </h2>
          </div>
          <Link
            href="/collections"
            className="hidden md:inline-flex items-center gap-3 text-white/50 hover:text-white text-xs tracking-[0.25em] uppercase transition-colors duration-300"
            data-cursor="button"
            style={{ fontFamily: '"Work Sans", sans-serif' }}
          >
            All Collections
            <span className="group-hover:translate-x-2 transition-transform">→</span>
          </Link>
        </div>

        {/* Collections grid */}
        <div className="collection-grid grid md:grid-cols-3 gap-4 md:gap-6">
          {collections.map((col, i) => (
            <CollectionCard key={col.id} col={col} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
