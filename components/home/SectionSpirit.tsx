'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const words = ['Warmth', 'Texture', 'Motion', 'Light', 'Haze', 'Drift'];

export default function SectionSpirit() {
  const sentence =
    "We don't design clothes. We bottle something you almost remember — the exact weight of heat on bare shoulders, the way salt bleaches everything to its purest self.";

  const bgRef = useRef(null);
  const sectionRef = useRef(null);

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
          <div 
            data-aos="fade-up" 
            data-aos-duration="1400"
            className="relative aspect-[3/4] md:aspect-[4/5] w-full overflow-hidden"
          >
            <Image 
              src="/images/5791779500948393425.jpg" 
              alt="Editorial" 
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={100}
              className="object-cover mix-blend-lighten opacity-80"
            />
            {/* Soft inner glow */}
            <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(6,15,23,0.8)] pointer-events-none" />
          </div>

          {/* Floating '01' over the image */}
          <div 
            className="absolute -top-12 -left-8 md:-left-16 pointer-events-none select-none z-10"
            data-aos="fade-right"
            data-aos-delay="400"
            data-aos-duration="1500"
          >
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
          <p 
            data-aos="fade-down"
            data-aos-duration="1000"
            className="text-[9px] tracking-[0.45em] text-white/40 uppercase mb-12"
          >
            The Tropical Atmosphere
          </p>

          <p 
            data-aos="fade-up"
            data-aos-delay="200"
            data-aos-duration="1200"
            className="text-white/80 text-2xl md:text-3xl lg:text-[2.5rem] leading-[1.3] mb-16 max-w-[20ch]"
            style={{ fontFamily: '"Work Sans", sans-serif', fontWeight: 300 }}
          >
            {sentence}
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
