'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import StampA from './stamps/StampA';
import StampB from './stamps/StampB';
import StampC from './stamps/StampC';
import StampD from './stamps/StampD';
import PalmIcon from './icons/PalmIcon';
import SunIcon from './icons/SunIcon';
import WaveIcon from './icons/WaveIcon';
import CompassIcon from './icons/CompassIcon';
import LeafIcon from './icons/LeafIcon';
import TagA from './tags/TagA';
import TagB from './tags/TagB';
import TagC from './tags/TagC';
import MarkA from './marks/MarkA';
import MarkB from './marks/MarkB';
import MarkC from './marks/MarkC';

gsap.registerPlugin(ScrollTrigger);

type AmbientElementConfig = {
  id: string;
  component: React.ElementType;
  x: number;
  y: number;
  color: string;
  opacity: number;
  scale: number;
  rotation: number;
  scrollSpeed: number;
  scrollDirection: 'up' | 'down';
  section: string;
  driftX: number;
  driftDuration: number;
};

const ELEMENTS: AmbientElementConfig[] = [
  // HERO
  { id: 'h1', component: StampA, x: 8, y: 15, color: '#f5efe6', opacity: 0.10, scale: 1.1, rotation: -12, scrollSpeed: 0.08, scrollDirection: 'up', section: 'hero', driftX: 8, driftDuration: 12 },
  { id: 'h2', component: SunIcon, x: 88, y: 22, color: '#e8672a', opacity: 0.14, scale: 1.6, rotation: 0, scrollSpeed: 0.12, scrollDirection: 'up', section: 'hero', driftX: -6, driftDuration: 16 },
  { id: 'h3', component: MarkB, x: 75, y: 68, color: '#f5efe6', opacity: 0.09, scale: 1.0, rotation: 90, scrollSpeed: 0.06, scrollDirection: 'up', section: 'hero', driftX: 4, driftDuration: 20 },
  { id: 'h4', component: CompassIcon, x: 18, y: 72, color: '#f5efe6', opacity: 0.10, scale: 1.3, rotation: 22, scrollSpeed: 0.15, scrollDirection: 'up', section: 'hero', driftX: -10, driftDuration: 14 },
  
  // MANIFESTO (using 'story' or 'manifesto' depending on data-scroll-context)
  // Our site uses 'story', 'shop', 'collection', 'lookbook'.
  // I will map 'manifesto' -> 'story', 'spirit' -> 'feeling' based on our sections.
  // Wait, I will just use section names and use a general scroll trigger if section not found.
  { id: 'm1', component: TagA, x: 82, y: 120, color: '#f5efe6', opacity: 0.12, scale: 1.0, rotation: 8, scrollSpeed: 0.10, scrollDirection: 'up', section: 'story', driftX: 6, driftDuration: 18 },
  { id: 'm2', component: WaveIcon, x: 12, y: 140, color: '#e8672a', opacity: 0.11, scale: 2.0, rotation: 0, scrollSpeed: 0.07, scrollDirection: 'up', section: 'story', driftX: 12, driftDuration: 22 },
  { id: 'm3', component: StampD, x: 60, y: 155, color: '#f5efe6', opacity: 0.08, scale: 1.0, rotation: -6, scrollSpeed: 0.13, scrollDirection: 'up', section: 'story', driftX: -8, driftDuration: 15 },
  
  // COLLECTION / SHOP
  { id: 'c1', component: StampC, x: 6, y: 215, color: '#e8672a', opacity: 0.13, scale: 1.2, rotation: 15, scrollSpeed: 0.09, scrollDirection: 'up', section: 'shop', driftX: 5, driftDuration: 17 },
  { id: 'c2', component: LeafIcon, x: 90, y: 230, color: '#2d5a27', opacity: 0.15, scale: 1.8, rotation: -20, scrollSpeed: 0.18, scrollDirection: 'up', section: 'shop', driftX: -7, driftDuration: 13 },
  { id: 'c3', component: MarkC, x: 50, y: 260, color: '#f5efe6', opacity: 0.09, scale: 1.0, rotation: 0, scrollSpeed: 0.06, scrollDirection: 'up', section: 'shop', driftX: 0, driftDuration: 25 },
  
  // LOOKBOOK
  { id: 'l1', component: StampB, x: 78, y: 320, color: '#f5efe6', opacity: 0.10, scale: 1.0, rotation: -8, scrollSpeed: 0.11, scrollDirection: 'up', section: 'lookbook', driftX: 9, driftDuration: 19 },
  { id: 'l2', component: PalmIcon, x: 5, y: 340, color: '#2d5a27', opacity: 0.14, scale: 2.2, rotation: 5, scrollSpeed: 0.14, scrollDirection: 'up', section: 'lookbook', driftX: -5, driftDuration: 16 },
  { id: 'l3', component: TagB, x: 55, y: 360, color: '#e8672a', opacity: 0.11, scale: 1.0, rotation: -3, scrollSpeed: 0.08, scrollDirection: 'up', section: 'lookbook', driftX: 7, driftDuration: 21 },
  
  // SPIRIT
  { id: 's1', component: MarkA, x: 85, y: 420, color: '#f5efe6', opacity: 0.10, scale: 1.0, rotation: -90, scrollSpeed: 0.09, scrollDirection: 'up', section: 'feeling', driftX: -4, driftDuration: 23 },
  { id: 's2', component: TagC, x: 10, y: 445, color: '#f5efe6', opacity: 0.09, scale: 1.0, rotation: 6, scrollSpeed: 0.12, scrollDirection: 'up', section: 'feeling', driftX: 10, driftDuration: 14 },
];

export default function AmbientLayer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    if (!containerRef.current) return;

    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      ELEMENTS.forEach((config, idx) => {
        const el = elementsRef.current[idx];
        if (!el) return;

        // Hide low-opacity elements on mobile to prevent clutter
        const isElementActive = !isMobile || config.opacity > 0.10;
        if (!isElementActive) {
          gsap.set(el, { display: 'none' });
          return;
        }

        const speed = isMobile ? config.scrollSpeed * 0.5 : config.scrollSpeed;
        const driftX = isMobile ? 0 : config.driftX;

        // 1. Initial State
        gsap.set(el, {
          display: 'block',
          xPercent: -50,
          yPercent: -50,
          left: `${config.x}%`,
          top: `${config.y}vh`, // Use vh as the unit since y goes 0-500+
          color: config.color,
          scale: config.scale,
          rotation: config.rotation,
          opacity: 0, // start invisible
        });

        // 2. Parallax Scroll
        const yOffset = speed * 1000 * (config.scrollDirection === 'down' ? 1 : -1);
        gsap.to(el, {
          y: yOffset,
          ease: 'none',
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
          }
        });

        // 3. Horizontal Drift
        if (driftX !== 0) {
          gsap.to(el, {
            x: driftX,
            duration: config.driftDuration,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true
          });
        }

        // 4. Section Fade
        // If there's a matching section by data-scroll-context, we bind opacity to it
        const sectionEl = document.querySelector(`[data-scroll-context="${config.section}"]`);
        if (sectionEl) {
          gsap.to(el, {
            opacity: config.opacity,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: sectionEl,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play reverse play reverse',
            }
          });
        } else {
          // Fallback: just fade in if section not found
          gsap.to(el, { opacity: config.opacity, duration: 1, delay: 0.5 });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-[1]"
      aria-hidden="true"
    >
      {ELEMENTS.map((config, i) => {
        const Component = config.component;
        return (
          <div
            key={config.id}
            ref={(el) => { elementsRef.current[i] = el; }}
            className="absolute will-change-transform"
            style={{ willChange: 'transform, opacity' }}
          >
            <Component />
          </div>
        );
      })}
    </div>
  );
}
