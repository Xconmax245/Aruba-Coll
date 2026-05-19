'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useUIStore } from '@/lib/store/uiStore';
import gsap from 'gsap';

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export default function CustomCursor() {
  const [isTouch, setIsTouch] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Dynamic touch detection: only consider touch active if the user actually touches the screen
    const handleTouchStart = () => {
      setIsTouch(true);
      window.removeEventListener('touchstart', handleTouchStart);
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);

  const setCursorVariant = useUIStore((s) => s.setCursorVariant);
  const variant          = useUIStore((s) => s.cursorVariant);
  const scrollContext    = useUIStore((s) => s.scrollContext);

  const dotWrapRef  = useRef<HTMLDivElement>(null);
  const auraWrapRef = useRef<HTMLDivElement>(null);
  const dotRef      = useRef<HTMLDivElement>(null);
  const auraRef     = useRef<HTMLDivElement>(null);

  const mouse   = useRef({ x: -300, y: -300 });
  const dotPos  = useRef({ x: -300, y: -300 });
  const auraPos = useRef({ x: -300, y: -300 });

  // ── Global cursor-none class ─────────────────────────────────────
  useEffect(() => {
    if (isTouch) return;
    document.documentElement.classList.add('custom-cursor-active');
    return () => document.documentElement.classList.remove('custom-cursor-active');
  }, [isTouch]);

  // Initial styles are set as inline React styles directly on the elements to prevent hydration race conditions.

  // ── rAF tracking + event listeners ──────────────────────────────
  useEffect(() => {
    if (isTouch) return;

    const onMove = (e: MouseEvent) => {
      // snap both positions on very first move (removes initial lag from (-300,-300))
      if (mouse.current.x === -300) {
        dotPos.current.x  = e.clientX;
        dotPos.current.y  = e.clientY;
        auraPos.current.x = e.clientX;
        auraPos.current.y = e.clientY;
      }
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const onDown = () => {
      gsap.to(dotRef.current,  { scale: 0.72, duration: 0.12, ease: 'power2.out' });
      gsap.to(auraRef.current, { scale: 0.78, duration: 0.14, ease: 'power2.out' });
    };
    const onUp = () => {
      gsap.to(dotRef.current,  { scale: 1, duration: 0.48, ease: 'back.out(2)' });
      gsap.to(auraRef.current, { scale: 1, duration: 0.48, ease: 'back.out(2)' });
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const el = t.closest<HTMLElement>('[data-cursor], a, button, img');
      if (!el) { setCursorVariant('default'); return; }

      const attr = el.getAttribute('data-cursor');
      if (attr && ['text','image','button','shop-item','navbar'].includes(attr)) {
        setCursorVariant(attr as any);
      } else if (el.tagName === 'IMG') {
        setCursorVariant('image');
      } else {
        setCursorVariant('button');
      }
    };
    const onOut = (e: MouseEvent) => {
      const to = e.relatedTarget as HTMLElement | null;
      if (!to || !to.closest('[data-cursor], a, button, img')) {
        setCursorVariant('default');
      }
    };

    window.addEventListener('mousemove',  onMove, { passive: true });
    window.addEventListener('mousedown',  onDown);
    window.addEventListener('mouseup',    onUp);
    window.addEventListener('mouseover',  onOver, { passive: true });
    window.addEventListener('mouseout',   onOut,  { passive: true });

    let raf: number;
    const tick = () => {
      if (!dotWrapRef.current || !auraWrapRef.current) return;
      
      dotPos.current.x  = lerp(dotPos.current.x,  mouse.current.x, 0.22);
      dotPos.current.y  = lerp(dotPos.current.y,  mouse.current.y, 0.22);
      auraPos.current.x = lerp(auraPos.current.x, mouse.current.x, 0.08);
      auraPos.current.y = lerp(auraPos.current.y, mouse.current.y, 0.08);

      dotWrapRef.current.style.transform =
        `translate3d(${dotPos.current.x}px,${dotPos.current.y}px,0)`;
      auraWrapRef.current.style.transform =
        `translate3d(${auraPos.current.x}px,${auraPos.current.y}px,0)`;

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup',   onUp);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mouseout',  onOut);
      cancelAnimationFrame(raf);
    };
  }, [isTouch, setCursorVariant]);

  // ── GSAP morph on state change ───────────────────────────────────
  useEffect(() => {
    if (isTouch || !dotRef.current || !auraRef.current) return;

    // -- base defaults (always start from these) --
    const dot: gsap.TweenVars = {
      width: 9, height: 9,
      borderRadius: '50%',
      scale: 1, opacity: 1,
      backgroundColor: '#ffffff',
      boxShadow: '0 0 10px 2px rgba(255,255,255,0.22)',
      border: 'none',
    };
    const aura: gsap.TweenVars = {
      width: 50, height: 50,
      borderRadius: '50%',
      scale: 1, opacity: 1,
      backgroundColor: 'rgba(255,255,255,0.07)',
      filter: 'blur(7px)',
      border: 'none',
    };

    // -- scroll-context tint --
    if (scrollContext === 'hero') {
      dot.boxShadow = '0 0 16px 3px rgba(255,255,255,0.30)';
      aura.width  = 64; aura.height = 64;
      aura.backgroundColor = 'rgba(255,255,255,0.10)';
    } else if (scrollContext === 'story') {
      dot.boxShadow = '0 0 6px 1px rgba(255,255,255,0.12)';
      aura.opacity  = 0.55;
    } else if (scrollContext === 'shop') {
      dot.width = 7; dot.height = 7;
      aura.width = 40; aura.height = 40;
    }

    // -- interaction variant overrides --
    switch (variant) {
      case 'text':
        dot.scale = 1.25;
        aura.width  = 40; aura.height = 40;
        aura.backgroundColor = 'rgba(255,255,255,0.12)';
        aura.filter = 'blur(3px)';
        break;

      case 'image':
        // "heat over glass"
        dot.scale = 0; dot.opacity = 0;
        aura.width = 90; aura.height = 90;
        aura.backgroundColor = 'rgba(255,255,255,0.08)';
        aura.filter = 'blur(18px)';
        break;

      case 'button':
        dot.scale = 0; dot.opacity = 0;
        aura.width = 46; aura.height = 46;
        aura.backgroundColor = '#e85d4a';
        aura.filter = 'blur(0px)';
        gsap.fromTo(auraRef.current,
          { scale: 1.22 },
          { scale: 1, duration: 0.5, ease: 'back.out(1.8)', overwrite: false });
        break;

      case 'shop-item':
        dot.scale = 0; dot.opacity = 0;
        aura.width = 58; aura.height = 58;
        aura.backgroundColor = 'transparent';
        aura.border  = '1.5px solid rgba(232,93,74,0.70)';
        aura.filter  = 'blur(0px)';
        break;

      case 'navbar':
        dot.width = 5; dot.height = 5;
        dot.backgroundColor = '#ffffff';
        dot.boxShadow = 'none';
        aura.scale = 0; aura.opacity = 0;
        break;
    }

    gsap.to(dotRef.current,  { ...dot,  duration: 0.38, ease: 'power3.out', overwrite: 'auto' });
    gsap.to(auraRef.current, { ...aura, duration: 0.50, ease: 'power3.out', overwrite: 'auto' });
  }, [variant, scrollContext, isTouch, mounted]);

  // ── If touch device or SSR: render nothing
  if (!mounted || isTouch) {
    return null;
  }

  const wrapStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0, left: 0,
    width: 0, height: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
    willChange: 'transform',
    mixBlendMode: (variant === 'button' || variant === 'shop-item') ? 'normal' : 'difference',
  };

  return (
    <>
      {/* Aura — slow trailing layer */}
      <div ref={auraWrapRef} style={{ ...wrapStyle, zIndex: 9998 }}>
        <div 
          ref={auraRef} 
          style={{ 
            flexShrink: 0,
            width: 50,
            height: 50,
            backgroundColor: 'rgba(255,255,255,0.07)',
            borderRadius: '50%',
            filter: 'blur(7px)',
            opacity: 1,
            border: 'none',
          }} 
        />
      </div>

      {/* Dot — fast leading layer */}
      <div ref={dotWrapRef} style={{ ...wrapStyle, zIndex: 9999 }}>
        <div 
          ref={dotRef} 
          style={{ 
            flexShrink: 0,
            width: 9,
            height: 9,
            backgroundColor: '#ffffff',
            borderRadius: '50%',
            boxShadow: '0 0 10px 2px rgba(255,255,255,0.22)',
            opacity: 1,
            border: 'none',
          }} 
        />
      </div>
    </>
  );
}
