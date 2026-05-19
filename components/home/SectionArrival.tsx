'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const arrivals = [
  { id: 1, name: 'Drift Linen Shirt', price: '₦98,000', tag: 'New' },
  { id: 2, name: 'Coral Wrap Dress', price: '₦134,000', tag: 'New' },
  { id: 3, name: 'Sunfade Linen Trousers', price: '₦76,000', tag: 'New' },
  { id: 4, name: 'Drift System Bodysuit', price: '₦62,000', tag: 'Limited' },
];

export default function SectionArrival() {
  return (
    <section
      data-scroll-context="shop"
      className="relative py-32 md:py-48 px-8 md:px-16 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0c1a12 0%, #060f17 100%)' }}
    >
      {/* Coral glow top right */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vh] bg-[radial-gradient(ellipse_at_top_right,_rgba(232,93,74,0.08)_0%,_transparent_60%)] pointer-events-none" />

      <div className="max-w-screen-xl mx-auto">
        {/* Header */}
        <div
          data-aos="fade-up"
          data-aos-duration="900"
          className="flex items-end justify-between mb-20"
        >
          <div>
            <p className="text-[10px] tracking-[0.4em] text-white/40 uppercase mb-4">05 — New Arrivals</p>
            <h2
              className="oi-regular text-white leading-none"
              style={{ fontSize: 'clamp(3rem, 7vw, 7rem)' }}
            >
              Just In
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden md:inline-flex items-center gap-3 text-white/50 hover:text-white text-xs tracking-[0.25em] uppercase transition-colors duration-300"
            data-cursor="button"
          >
            Shop All →
          </Link>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {arrivals.map((item, i) => (
            <div
              key={item.id}
              data-aos="fade-up"
              data-aos-delay={120 * i}
              data-aos-duration="900"
            >
              <Link href="/shop" className="group block" data-cursor="shop-item">
                  {/* Product image area */}
                  <div
                    className="relative aspect-[3/4] overflow-hidden mb-4"
                    style={{ background: `linear-gradient(135deg, #0d1f14 0%, #0a1628 100%)` }}
                  >
                    <Image
                      src={`/images/579177950094839342${5 + i}.jpg`}
                      alt={item.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 mix-blend-lighten"
                    />
                    {/* Colour accent orb per item */}
                    <div
                      className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700 mix-blend-overlay"
                      style={{
                        background: `radial-gradient(ellipse at 50% 35%, ${['#e8672a','#e85d4a','#2d5a27','#1e6ea6'][i]}66 0%, transparent 60%)`,
                      }}
                    />

                  {/* Tag */}
                  <span
                    className="absolute top-4 left-4 text-[9px] tracking-[0.3em] uppercase text-white/80 bg-white/10 backdrop-blur-sm px-2.5 py-1 border border-white/10"
                    style={{ fontFamily: '"Work Sans", sans-serif' }}
                  >
                    {item.tag}
                  </span>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                    <span
                      className="text-[9px] tracking-[0.35em] uppercase text-white border border-white/40 px-4 py-2 backdrop-blur-sm"
                      style={{ fontFamily: '"Work Sans", sans-serif' }}
                    >
                      Quick View
                    </span>
                  </div>
                </div>

                {/* Product info */}
                <div className="flex justify-between items-start">
                  <h3
                    className="text-white/80 text-xs tracking-[0.15em] uppercase group-hover:text-white transition-colors duration-300"
                    style={{ fontFamily: '"Work Sans", sans-serif', fontWeight: 400 }}
                  >
                    {item.name}
                  </h3>
                  <p
                    className="text-white/50 text-xs"
                    style={{ fontFamily: '"Work Sans", sans-serif' }}
                  >
                    {item.price}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
