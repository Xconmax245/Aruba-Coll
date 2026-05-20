'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function SectionSignal() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const descText = "Early access. Limited drops. Dispatches from the atmosphere. Only for those who know the feeling.";
  const descWords = descText.split(' ');

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = sectionRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // 0. Section-level transition: Circular Iris Reveal
      gsap.fromTo(container,
        { clipPath: 'circle(15% at 50% 50%)' },
        {
          clipPath: 'circle(100% at 50% 50%)',
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'top 12%',
            scrub: 0.5,
          }
        }
      );

      // 1. Ambient Background Radar Pulse scale
      const radarGlow = container.querySelector('.signal-radar-glow');
      if (radarGlow) {
        gsap.fromTo(radarGlow,
          { scale: 0.7, opacity: 0.03, filter: 'blur(80px)' },
          {
            scale: 1.25,
            opacity: 0.09,
            filter: 'blur(100px)',
            scrollTrigger: {
              trigger: container,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }

      // 2. Horizontal Split Title Drift Parallax
      const titleWords = container.querySelectorAll('.signal-word');
      if (titleWords.length === 2) {
        gsap.fromTo(titleWords[0],
          { x: -60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: titleWords[0],
              start: 'top 92%',
              end: 'top 70%',
              scrub: 1.2,
            },
          }
        );
        gsap.fromTo(titleWords[1],
          { x: 60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: titleWords[1],
              start: 'top 90%',
              end: 'top 68%',
              scrub: 1.2,
            },
          }
        );
      }

      // 3. Scroll-Linked Paragraph Wave Reveal
      const words = container.querySelectorAll('.signal-desc-word');
      if (words.length > 0) {
        gsap.fromTo(words,
          {
            opacity: 0.1,
            y: 12,
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
              trigger: '.signal-desc',
              start: 'top 88%',
              end: 'bottom 48%',
              scrub: 0.8,
            },
          }
        );
      }

      // 4. Form Entrance & Scroll-Linked Border Wipe
      const formBlock = container.querySelector('.signal-form-block');
      const formLine = container.querySelector('.signal-form-line');
      
      if (formBlock) {
        gsap.fromTo(formBlock,
          { opacity: 0, y: 35, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.3,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: formBlock,
              start: 'top 90%',
            },
          }
        );
      }

      if (formLine) {
        gsap.fromTo(formLine,
          { width: '0%', opacity: 0.3 },
          {
            width: '100%',
            opacity: 1,
            scrollTrigger: {
              trigger: formBlock || formLine,
              start: 'top 92%',
              end: 'top 80%',
              scrub: 1,
            },
          }
        );
      }
    }, container);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section
      ref={sectionRef}
      data-scroll-context="story"
      className="relative py-40 md:py-64 px-8 md:px-16 overflow-hidden bg-[#060f17]"
    >
      {/* ── Deep Background Atmosphere ── */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#060f17] via-[#050d1a] to-[#050d1a] z-0" />

      {/* Ambient radar pulse glow sphere */}
      <div className="signal-radar-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] rounded-full bg-[radial-gradient(circle,_rgba(232,93,74,0.18)_0%,_transparent_70%)] pointer-events-none z-0 will-change-transform" />

      <div className="relative z-10 max-w-screen-xl mx-auto flex flex-col items-center text-center">
        <div className="w-full">
          <p className="text-[10px] tracking-[0.4em] text-white/40 uppercase mb-8" style={{ fontFamily: '"Work Sans", sans-serif' }}>
            06 — Stay Close
          </p>
          
          <h2
            className="oi-regular text-white leading-[1.08] mx-auto mb-12 flex flex-col items-center overflow-hidden"
            style={{ fontSize: 'clamp(2.5rem, 8.5vw, 8rem)', maxWidth: '16ch' }}
          >
            <span className="signal-word block will-change-transform">Catch the</span>
            <span className="signal-word block will-change-transform mt-2">Signal</span>
          </h2>
          
          <p
            className="signal-desc text-white/60 text-lg md:text-xl max-w-md mx-auto mb-20 leading-relaxed flex flex-wrap justify-center gap-x-[0.24em] gap-y-[0.06em]"
            style={{ fontFamily: '"Work Sans", sans-serif', fontWeight: 300 }}
          >
            {descWords.map((word, wordIdx) => (
              <span
                key={wordIdx}
                className="signal-desc-word inline-block will-change-[transform,opacity,filter]"
                style={{ opacity: 0.1, transform: 'translateY(12px)', filter: 'blur(3px)' }}
              >
                {word}
              </span>
            ))}
          </p>

          <div className="signal-form-block w-full max-w-md mx-auto opacity-0 will-change-[transform,opacity]">
            {!submitted ? (
              <form
                onSubmit={handleSubmit}
                className="relative w-full group"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full bg-transparent text-white placeholder-white/30 px-0 py-4 text-base focus:outline-none transition-colors duration-500 rounded-none border-none"
                  style={{ fontFamily: '"Work Sans", sans-serif' }}
                />
                
                {/* Scroll-responsive fluid border underline */}
                <div className="absolute bottom-0 left-0 h-[1px] bg-white/20 w-full" />
                <div className="signal-form-line absolute bottom-0 left-0 h-[1.5px] bg-coral will-change-[width,opacity] transition-all duration-300" style={{ width: '0%' }} />

                <button
                  type="submit"
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-white/40 hover:text-coral transition-colors duration-300 text-2xl pr-2"
                  data-cursor="button"
                >
                  →
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-coral text-sm tracking-[0.2em] uppercase py-4"
                style={{ fontFamily: '"Work Sans", sans-serif' }}
              >
                ✦ &nbsp; Signal locked. Welcome to the atmosphere.
              </motion.div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
