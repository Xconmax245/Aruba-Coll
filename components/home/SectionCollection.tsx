'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

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

export default function SectionCollection() {
  return (
    <section
      data-scroll-context="shop"
      className="relative py-32 md:py-48 px-8 md:px-16 overflow-hidden bg-[#060f17]"
    >
      {/* Subtle warm glow top center */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-[30vh] bg-[radial-gradient(ellipse,_rgba(232,103,42,0.06)_0%,_transparent_70%)] pointer-events-none" />

      <div className="max-w-screen-xl mx-auto">
        {/* Section header */}
        <div
          data-aos="fade-up"
          data-aos-duration="900"
          className="flex items-end justify-between mb-20 md:mb-28"
        >
          <div>
            <p className="text-[10px] tracking-[0.4em] text-white/40 uppercase mb-4">02 — Collections</p>
            <h2
              className="oi-regular text-white leading-none"
              style={{ fontSize: 'clamp(3rem, 7vw, 7rem)' }}
            >
              The Season
            </h2>
          </div>
          <Link
            href="/collections"
            className="hidden md:inline-flex items-center gap-3 text-white/50 hover:text-white text-xs tracking-[0.25em] uppercase transition-colors duration-300"
            data-cursor="button"
          >
            All Collections
            <span className="group-hover:translate-x-2 transition-transform">→</span>
          </Link>
        </div>

        {/* Collections grid */}
        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {collections.map((col, i) => (
            <div
              key={col.id}
              data-aos="fade-up"
              data-aos-delay={150 * i}
              data-aos-duration="900"
            >
              <Link
                href="/collections"
                className="group block relative aspect-[3/4] overflow-hidden"
                data-cursor="image"
              >
                {/* Collection card bg */}
                <div
                  className={`absolute inset-0 bg-gradient-to-b ${col.bg} transition-transform duration-700 ease-out group-hover:scale-105`}
                />

                {/* Atmospheric colour orb */}
                <div
                  className="absolute inset-0 opacity-30 transition-opacity duration-500 group-hover:opacity-50"
                  style={{
                    background: `radial-gradient(ellipse at 60% 30%, ${col.color}55 0%, transparent 60%)`,
                  }}
                />

                {/* Horizontal scan lines for texture */}
                <div
                  className="absolute inset-0 opacity-[0.04] pointer-events-none"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.5) 3px, rgba(255,255,255,0.5) 4px)',
                  }}
                />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-between p-8">
                  <div className="flex justify-between items-start">
                    <span
                      className="text-[9px] tracking-[0.35em] uppercase border border-white/20 text-white/50 px-3 py-1 backdrop-blur-sm"
                      style={{ fontFamily: '"Work Sans", sans-serif' }}
                    >
                      {col.tag}
                    </span>
                    <span
                      className="text-[9px] tracking-[0.25em] uppercase text-white/30"
                      style={{ fontFamily: '"Work Sans", sans-serif' }}
                    >
                      {col.pieces}
                    </span>
                  </div>

                  <div>
                    <p
                      className="text-white/40 text-[10px] tracking-widest uppercase mb-3"
                      style={{ fontFamily: '"Work Sans", sans-serif' }}
                    >
                      {col.sub}
                    </p>
                    <h3
                      className="oi-regular text-white leading-none mb-4"
                      style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
                    >
                      {col.name}
                    </h3>
                    <div
                      className="flex items-center gap-3 text-white/40 group-hover:text-white/70 transition-colors duration-300 text-[10px] tracking-widest uppercase"
                      style={{ fontFamily: '"Work Sans", sans-serif' }}
                    >
                      <span
                        className="block h-[1px] w-6 transition-all duration-500 group-hover:w-12"
                        style={{ backgroundColor: col.color }}
                      />
                      <span>View</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
