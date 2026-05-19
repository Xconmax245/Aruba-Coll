'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function SectionSpirit() {
  const sentence =
    "We don't design clothes. We bottle something you almost remember — the exact weight of heat on bare shoulders, the way salt bleaches everything to its purest self.";
  
  const sentenceWords = sentence.split(' ');

  const bgRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const container = sectionRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // 1. Background parallax
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // 2. Editorial Portrait Zoom/Parallax
      const portrait = container.querySelector('.spirit-portrait');
      if (portrait) {
        gsap.fromTo(portrait,
          { scale: 1.06, y: 20 },
          {
            scale: 1,
            y: -20,
            scrollTrigger: {
              trigger: portrait,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }

      // 3. Floating Backdrop '01' Parallax
      const backdrop01 = container.querySelector('.spirit-01');
      if (backdrop01) {
        gsap.fromTo(backdrop01,
          { y: -40, opacity: 0.02 },
          {
            y: 40,
            opacity: 0.05,
            scrollTrigger: {
              trigger: container,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }

      // 4. Eyebrow Scroll-Linked Letter Tracking Expand
      const eyebrow = container.querySelector('.spirit-eyebrow');
      if (eyebrow) {
        gsap.fromTo(eyebrow,
          {
            opacity: 0,
            letterSpacing: '0.25em',
            y: -10,
          },
          {
            opacity: 1,
            letterSpacing: '0.45em',
            y: 0,
            scrollTrigger: {
              trigger: eyebrow,
              start: 'top 92%',
              end: 'top 74%',
              scrub: 0.5,
            },
          }
        );
      }

      // 5. Scroll-linked Word-by-Word Reveal (Scroll-paint)
      const words = container.querySelectorAll('.spirit-word');
      if (words.length > 0) {
        gsap.fromTo(words,
          {
            opacity: 0.12,
            y: 12,
          },
          {
            opacity: 1,
            y: 0,
            stagger: 0.04,
            duration: 0.7,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: '.spirit-sentence',
              start: 'top 88%',   // starts when top of sentence crosses 88% height
              end: 'bottom 40%',  // finishes when bottom of sentence reaches 40% height
              scrub: 0.8,         // premium delay for buttery scroll-painting feeling
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
      data-ambient-section="spirit"
      data-cursor="text"
      className="relative py-40 md:py-64 px-8 md:px-16 lg:px-24 overflow-hidden bg-[#060f17]"
    >
      {/* ── Parallax Background Grain/Texture ── */}
      <div ref={bgRef} className="absolute inset-0 w-full h-[120%] -top-[10%] z-0" data-parallax="bg">
        <Image 
          src="/images/5791779500948393431.jpg" 
          alt="Atmosphere" 
          fill 
          sizes="100vw"
          quality={100}
          className="object-cover opacity-10 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#060f17] via-transparent to-[#0a1628]/80" />
      </div>

      <div className="relative z-10 max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 items-center">
        
        {/* Left: Editorial Portrait Image */}
        <div className="md:col-start-2 md:col-span-4 relative">
          <div className="relative aspect-[3/4] md:aspect-[4/5] w-full overflow-hidden">
            <div className="spirit-portrait w-full h-[110%] relative -top-[5%]">
              <Image 
                src="/images/5791779500948393425.jpg" 
                alt="Editorial" 
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={100}
                className="object-cover mix-blend-lighten opacity-80"
              />
            </div>
            {/* Soft inner glow */}
            <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(6,15,23,0.8)] pointer-events-none" />
          </div>

          {/* Floating '01' over the image */}
          <div className="spirit-01 absolute -top-12 -left-8 md:-left-16 pointer-events-none select-none z-10 will-change-transform">
            <span
              className="oi-regular text-white/[0.04]"
              style={{ fontSize: 'clamp(8rem, 15vw, 20rem)', lineHeight: 0.8 }}
            >
              01
            </span>
          </div>
        </div>

        {/* Right: Typography Column */}
        <div className="md:col-start-7 md:col-span-5 flex flex-col items-start md:-mt-24">
          <p className="spirit-eyebrow text-[9px] tracking-[0.45em] text-white/40 uppercase mb-12 will-change-[transform,opacity,letter-spacing]">
            The Tropical Atmosphere
          </p>

          <p className="spirit-sentence text-white/90 text-2xl md:text-3xl lg:text-[2.5rem] leading-[1.38] mb-16 max-w-[20ch] flex flex-wrap gap-x-[0.24em] gap-y-[0.06em]">
            {sentenceWords.map((word, wordIdx) => (
              <span
                key={wordIdx}
                className="spirit-word inline-block will-change-[transform,opacity]"
                style={{ opacity: 0.12, transform: 'translateY(12px)' }}
              >
                {word}
              </span>
            ))}
          </p>

          {/* Floating Atmospheric Keywords */}
          <div className="absolute inset-0 pointer-events-none" style={{ zIndex: -1 }}>
            {[
              { w: 'Warmth', top: '5%', right: '10%', delay: 0 },
              { w: 'Texture', top: '80%', left: '-5%', delay: 1 },
              { w: 'Motion', top: '35%', right: '-15%', delay: 2 },
              { w: 'Light', top: '90%', right: '20%', delay: 1.5 },
              { w: 'Haze', top: '20%', left: '0%', delay: 0.5 },
              { w: 'Drift', top: '60%', left: '-15%', delay: 2.5 },
            ].map((item, i) => (
              <motion.div
                key={item.w}
                className="absolute"
                style={{ top: item.top, left: item.left, right: item.right }}
                animate={{
                  y: [0, -15, 0],
                  x: [0, 10, 0],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 6 + (i % 3) * 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: item.delay,
                }}
              >
                <span
                  className="text-white/40 text-[10px] md:text-xs tracking-[0.6em] uppercase blur-[0.5px]"
                  style={{ fontFamily: '"Work Sans", sans-serif' }}
                >
                  {item.w}
                </span>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
