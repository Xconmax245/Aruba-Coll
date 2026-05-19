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
  const bgRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (bgRef.current && sectionRef.current) {
      gsap.to(bgRef.current, {
        yPercent: 20,
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
      data-cursor="text"
      className="relative py-32 md:py-52 px-8 md:px-16 overflow-hidden"
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
          data-aos="fade-up"
          data-aos-duration="800"
          className="text-[10px] tracking-[0.4em] text-white/40 uppercase mb-16"
        >
          What it feels like
        </p>

        <div className="space-y-6 md:space-y-8">
          {feelings.map((feeling, i) => (
            <p
              key={i}
              data-aos="fade-up"
              data-aos-delay={150 * i}
              data-aos-duration="900"
              className="oi-regular text-white/90 mx-auto"
              style={{
                fontSize: 'clamp(1.6rem, 4vw, 4rem)',
                lineHeight: 1.1,
                maxWidth: '18ch',
                opacity: 0.9 - 0.15 * i,
              }}
            >
              {feeling}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
