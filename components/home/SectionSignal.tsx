'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function SectionSignal() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const sectionRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (bgRef.current && sectionRef.current) {
      gsap.to(bgRef.current, {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-40 md:py-64 px-8 md:px-16 overflow-hidden bg-[#060f17]"
    >
      {/* ── Deep Atmosphere Gradient ── */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#060f17] via-[#050d1a] to-[#050d1a]" />

      <div className="relative z-10 max-w-screen-xl mx-auto flex flex-col items-center text-center">
        <div data-aos="fade-up" data-aos-duration="1000" className="w-full">
          <p className="text-[10px] tracking-[0.4em] text-white/40 uppercase mb-8">06 — Stay Close</p>
          
          <h2
            className="oi-regular text-white leading-none mx-auto mb-12"
            style={{ fontSize: 'clamp(3.5rem, 9vw, 10rem)', maxWidth: '14ch' }}
          >
            Catch the<br/>Signal
          </h2>
          
          <p
            className="text-white/60 text-lg md:text-xl max-w-md mx-auto mb-20 leading-relaxed"
            style={{ fontFamily: '"Work Sans", sans-serif', fontWeight: 300 }}
          >
            Early access. Limited drops. Dispatches from the atmosphere.
            Only for those who know the feeling.
          </p>

          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              className="relative w-full max-w-md mx-auto group"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full bg-transparent border-b border-white/20 text-white placeholder-white/30 px-0 py-4 text-base focus:outline-none focus:border-coral transition-colors duration-500 rounded-none"
                style={{ fontFamily: '"Work Sans", sans-serif' }}
              />
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
              className="text-coral/80 text-sm tracking-widest uppercase py-4"
              style={{ fontFamily: '"Work Sans", sans-serif' }}
            >
              ✦ &nbsp; Signal locked. Welcome to the atmosphere.
            </motion.div>
          )}
        </div>

      </div>
    </section>
  );
}
