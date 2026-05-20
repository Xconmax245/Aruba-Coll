'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const feelings = [
  'Sun-dried linen against your skin.',
  'The sound of water before you see it.',
  'Colours that only exist at golden hour.',
  'Arriving somewhere and knowing it was made for you.',
];

export default function SectionFeeling() {
  const bgRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const container = sectionRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // 0. Section-level transition: Overlapping Card Stack Scale Zoom
      gsap.fromTo(container,
        { scale: 0.95, y: '8vh', opacity: 0.9 },
        {
          scale: 1,
          y: '0vh',
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'top 15%',
            scrub: 0.5,
          }
        }
      );

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

      // 2. Eyebrow Scroll-Linked Letter Tracking expand
      const eyebrow = container.querySelector('.feeling-eyebrow');
      if (eyebrow) {
        gsap.fromTo(eyebrow,
          {
            opacity: 0,
            letterSpacing: '0.2em',
            y: -10,
          },
          {
            opacity: 1,
            letterSpacing: '0.4em',
            y: 0,
            scrollTrigger: {
              trigger: eyebrow,
              start: 'top 92%',
              end: 'top 75%',
              scrub: 0.5,
            },
          }
        );
      }

      // 3. High-end editorial typewriter reveal linked to scroll (scrub)
      const lines = gsap.utils.toArray<HTMLElement>('.feeling-line');
      lines.forEach((line) => {
        const chars = line.querySelectorAll('.char');
        if (chars.length === 0) return;

        gsap.fromTo(chars,
          {
            opacity: 0.08,
            y: 12,
            filter: 'blur(3px)',
          },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            stagger: 0.04,
            ease: 'sine.out',
            scrollTrigger: {
              trigger: line,
              start: 'top 88%',   // triggers when line top is at 88% of viewport
              end: 'bottom 48%',  // fully completed when line bottom reaches 48%
              scrollTrigger: null, // override if needed
              scrub: 0.6,         // premium delay scrub inertia
            },
          }
        );
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-scroll-context="story"
      data-cursor="text"
      className="relative py-32 md:py-52 px-8 md:px-16 overflow-hidden bg-[#060f17]"
    >
      <div ref={bgRef} className="absolute inset-0 w-full h-[120%] -top-[10%] z-0" data-parallax="bg">
        <Image 
          src="/images/5791779500948393429.jpg" 
          alt="Atmosphere" 
          fill 
          sizes="100vw"
          quality={100}
          className="object-cover opacity-30 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/80 via-[#060f17]/60 to-[#060f17]" />
      </div>

      {/* Warm horizontal streak */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-coral/10 to-transparent pointer-events-none -translate-y-1/2 z-10" />

      <div className="relative z-10 max-w-screen-xl mx-auto text-center">
        <p
          className="feeling-eyebrow text-[10px] text-white/40 uppercase mb-16 will-change-[transform,opacity,letter-spacing]"
          style={{ fontFamily: '"Work Sans", sans-serif', letterSpacing: '0.2em', opacity: 0 }}
        >
          What it feels like
        </p>

        <div className="space-y-8 md:space-y-12">
          {feelings.map((feeling, i) => (
            <p
              key={i}
              className="feeling-line oi-regular text-white/90 mx-auto"
              style={{
                fontSize: 'clamp(1.4rem, 3.8vw, 3.6rem)',
                lineHeight: 1.15,
                maxWidth: '22ch',
                opacity: 0.9 - 0.15 * i,
              }}
            >
              {feeling.split('').map((char, charIdx) => (
                <span
                  key={charIdx}
                  className="char inline-block will-change-[transform,opacity,filter]"
                  style={{ opacity: 0.08, filter: 'blur(3px)', transform: 'translateY(12px)' }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
