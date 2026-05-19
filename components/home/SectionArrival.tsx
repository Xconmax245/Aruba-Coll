'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const arrivals = [
  { id: 1, name: 'Drift Linen Shirt', price: '₦98,000', tag: 'New' },
  { id: 2, name: 'Coral Wrap Dress', price: '₦134,000', tag: 'New' },
  { id: 3, name: 'Sunfade Linen Trousers', price: '₦76,000', tag: 'New' },
  { id: 4, name: 'Drift System Bodysuit', price: '₦62,000', tag: 'Limited' },
];

function ArrivalCard({ item, i }: { item: typeof arrivals[0]; i: number }) {
  const [mouse, setMouse] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMouse({ x, y });
  };

  const accentColor = [
    'rgba(232,103,42,0.35)', 
    'rgba(232,93,74,0.35)', 
    'rgba(45,90,39,0.35)', 
    'rgba(30,110,166,0.35)'
  ][i];

  return (
    <div
      className="arrival-card overflow-hidden will-change-[clip-path,transform]"
      style={{ clipPath: 'inset(100% 0% 0% 0%)', transform: 'translateY(40px)' }}
    >
      <Link 
        href="/shop" 
        className="group block" 
        data-cursor="shop-item"
        onMouseMove={handleMouseMove}
      >
        {/* Image Area */}
        <div
          className="relative aspect-[3/4] overflow-hidden mb-4 rounded-[4px] border border-white/5 transition-colors duration-500 group-hover:border-white/10"
          style={{ background: '#08121a' }}
        >
          {/* Main Image */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src={`/images/579177950094839342${5 + i}.jpg`}
              alt={item.name}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-108 opacity-75 mix-blend-lighten"
            />
          </div>

          {/* Mouse-interactive atmospheric liquid color orb */}
          <div
            className="absolute inset-0 transition-opacity duration-500 mix-blend-color-dodge pointer-events-none opacity-40 group-hover:opacity-80"
            style={{
              background: `radial-gradient(circle 140px at ${mouse.x}% ${mouse.y}%, ${accentColor} 0%, transparent 100%)`,
            }}
          />

          {/* Tag */}
          <span
            className="absolute top-4 left-4 text-[8px] tracking-[0.28em] uppercase text-white/90 bg-white/[0.06] backdrop-blur-md px-2.5 py-1 border border-white/[0.08]"
            style={{ fontFamily: '"Work Sans", sans-serif' }}
          >
            {item.tag}
          </span>

          {/* Slide-Up Mask Quick View Button */}
          <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-10">
            <div className="w-full bg-[#0a1628]/95 backdrop-blur-md border border-white/10 py-3 text-center transition-colors hover:bg-coral/95 hover:border-coral duration-300">
              <span
                className="text-[9px] tracking-[0.35em] uppercase text-white font-medium"
                style={{ fontFamily: '"Work Sans", sans-serif' }}
              >
                Quick View
              </span>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="flex justify-between items-center px-1 overflow-hidden">
          <h3
            className="text-white/70 text-xs tracking-[0.12em] uppercase group-hover:text-white group-hover:translate-x-1.5 transition-all duration-300"
            style={{ fontFamily: '"Work Sans", sans-serif', fontWeight: 400 }}
          >
            {item.name}
          </h3>
          <p
            className="text-white/40 text-xs group-hover:text-coral transition-colors duration-300"
            style={{ fontFamily: '"Work Sans", sans-serif' }}
          >
            {item.price}
          </p>
        </div>
      </Link>
    </div>
  );
}

export default function SectionArrival() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = sectionRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // 1. Heading Scroll-reveal
      const header = container.querySelector('.arrival-header');
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
              start: 'top 88%',
            },
          }
        );
      }

      // 2. Product Grid Staggered Curtain Clip-Path Reveal
      const cards = container.querySelectorAll('.arrival-card');
      if (cards.length > 0) {
        gsap.fromTo(cards,
          {
            clipPath: 'inset(100% 0% 0% 0%)',
            y: 50,
          },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            y: 0,
            duration: 1.25,
            stagger: 0.15,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: container,
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
      style={{ background: 'linear-gradient(180deg, #0c1a12 0%, #060f17 100%)' }}
    >
      {/* Coral glow top right */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vh] bg-[radial-gradient(ellipse_at_top_right,_rgba(232,93,74,0.08)_0%,_transparent_60%)] pointer-events-none" />

      <div className="max-w-screen-xl mx-auto">
        {/* Header */}
        <div className="arrival-header flex items-end justify-between mb-20 opacity-0">
          <div>
            <p className="text-[10px] tracking-[0.4em] text-white/40 uppercase mb-4" style={{ fontFamily: '"Work Sans", sans-serif' }}>
              05 — New Arrivals
            </p>
            <h2
              className="oi-regular text-white leading-none"
              style={{ fontSize: 'clamp(2.5rem, 6.5vw, 6rem)' }}
            >
              Just In
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden md:inline-flex items-center gap-3 text-white/50 hover:text-white text-xs tracking-[0.25em] uppercase transition-colors duration-300"
            data-cursor="button"
            style={{ fontFamily: '"Work Sans", sans-serif' }}
          >
            Shop All →
          </Link>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {arrivals.map((item, i) => (
            <ArrivalCard key={item.id} item={item} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
