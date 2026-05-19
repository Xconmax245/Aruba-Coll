'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const titleLines = ['WEAR', 'THE', 'MEMORY'];

export default function HeroSection() {
  return (
    <section
      data-scroll-context="hero"
      className="relative w-full overflow-hidden"
      style={{ minHeight: '100svh' }}
    >
      {/* ── Backgrounds ─────────────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-[0.85]"
        >
          <source src="/images/ba_b_d_c_amp_.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,_rgba(26,58,92,0.4)_0%,_rgba(10,22,40,0.7)_60%,_#050d1a_100%)]" />
      </div>
      <div className="absolute top-0 right-0 w-[60vw] h-[55vh] bg-[radial-gradient(ellipse_at_top_right,_rgba(232,103,42,0.22)_0%,_transparent_65%)] pointer-events-none z-0" />
      <div className="absolute bottom-[15%] left-0 w-[45vw] h-[50vh] bg-[radial-gradient(ellipse_at_left,_rgba(232,93,74,0.10)_0%,_transparent_70%)] pointer-events-none z-0" />
      {/* film grain */}
      <div
        className="absolute inset-0 opacity-[0.055] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
          backgroundSize: '180px 180px',
        }}
      />

      {/* ── Content wrapper ──────────────────────────────────── */}
      {/*
        Layout:  full-height flex column
        - Spacer at top (clears navbar)
        - Eyebrow
        - Giant headline  ← grows to fill remaining space
        - Bottom bar (tagline + CTA)
      */}
      <div className="relative z-10 flex flex-col w-full h-full min-h-[inherit] px-6 md:px-14 lg:px-20">

        {/* navbar clearance */}
        <div className="h-[88px] md:h-[100px] flex-shrink-0" />

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-[10px] md:text-[11px] tracking-[0.45em] text-white/50 uppercase mb-6 md:mb-10"
          style={{ fontFamily: '"Work Sans", sans-serif' }}
        >
          New Season — SS&apos;26
        </motion.p>

        {/* ── Giant Oi headline ──────────────────────────────── */}
        <div className="flex-1 flex flex-col justify-center -mt-4 md:-mt-6">
          {titleLines.map((line, i) => (
            <div key={line} className="overflow-hidden leading-none">
              <motion.span
                initial={{ opacity: 0, y: "100%" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.1 * i, ease: [0.16, 1, 0.3, 1] }}
                className="oi-regular block text-white"
                style={{
                  fontSize: 'clamp(4rem, 10vw, 12rem)',
                  lineHeight: 0.9,
                  letterSpacing: '-0.01em',
                }}
              >
                {line}
              </motion.span>
            </div>
          ))}
        </div>

        {/* ── Bottom bar ────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mt-10 mb-32 md:mb-40"
        >
          <p
            className="text-white/55 text-sm md:text-[15px] max-w-[28ch] leading-relaxed"
            style={{ fontFamily: '"Work Sans", sans-serif', fontWeight: 300 }}
          >
            Conceptual fashion born from tropical memory, cinematic warmth,
            and the freedom of open atmospheres.
          </p>

          <Link
            href="/shop"
            data-cursor="button"
            className="group relative inline-flex items-center gap-3 text-white uppercase tracking-[0.28em] text-[10px]"
            style={{ fontFamily: '"Work Sans", sans-serif' }}
          >
            <span className="relative pb-2">
              Explore the Collection
              <span className="absolute bottom-0 left-0 h-[1px] w-full bg-coral" />
            </span>
            <span className="pb-2 group-hover:translate-x-2 transition-transform duration-300">→</span>
          </Link>
        </motion.div>
      </div>

      {/* ── Scroll indicator ─────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.span
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          className="block w-[1px] h-10 bg-gradient-to-b from-white/0 via-white/35 to-white/0"
        />
        <span
          className="text-[8px] tracking-[0.4em] uppercase text-white/30"
          style={{ fontFamily: '"Work Sans", sans-serif' }}
        >
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
