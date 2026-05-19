'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/lib/hooks/useCart';
import { ShoppingBag, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'SHOP', href: '/shop' },
  { label: 'COLLECTIONS', href: '/collections/summer-2026' },
  { label: 'LOOKBOOK', href: '/lookbook' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toggleCart, totalItems } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    // Check initial scroll
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Derived styles based on scroll
  const logoHeight = scrolled ? 46 : 52;
  const logoBgColor = scrolled ? 'rgba(10, 22, 40, 0.90)' : 'rgba(10, 22, 40, 0.75)';
  const borderColor = scrolled ? 'rgba(255, 255, 255, 0.16)' : 'rgba(255, 255, 255, 0.10)';
  
  // Mobile derived styles
  const mobileHeight = scrolled ? 46 : 50;

  // Stagger animation for entry
  const pieceVariants = {
    hidden: { opacity: 0, y: -12 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.12,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <>
      <header className="fixed top-5 left-1/2 -translate-x-1/2 z-[100] w-full max-w-[680px] pointer-events-none flex items-center justify-center">
        
        {/* ─── DESKTOP "WRISTBAND" (hidden on mobile) ─── */}
        <motion.nav
          custom={0}
          initial="hidden"
          animate="visible"
          variants={pieceVariants}
          className="hidden md:flex pointer-events-auto items-center justify-between px-8 relative z-10 w-full"
          style={{
            height: logoHeight, // use the taller logo height for the single pill
            background: logoBgColor,
            backdropFilter: 'blur(20px) saturate(200%)',
            WebkitBackdropFilter: 'blur(20px) saturate(200%)',
            border: `1px solid ${borderColor}`,
            borderRadius: '100px',
            transition: 'height 0.4s ease, background 0.4s ease, border-color 0.4s ease',
          }}
        >
          {/* Left - Navigation */}
          <div className="flex-1 flex items-center justify-start gap-8">
            {NAV_LINKS.map((link) => (
              <DesktopNavLink key={link.label} href={link.href} label={link.label} />
            ))}
          </div>

          {/* Center Logo */}
          <Link href="/" className="block flex-shrink-0" aria-label="ARUBA COLL Home">
            <div className="relative w-[50px] h-[28px] filter drop-shadow-[0_1px_6px_rgba(0,0,0,0.5)]">
              <Image
                src="/images/Screenshot_2026-05-19_115048-removebg-preview.png"
                alt="ARUBA COLL"
                fill
                priority
                sizes="(max-width: 768px) 60px, 50px"
                className="object-contain"
              />
            </div>
          </Link>

          {/* Right - Utility */}
          <div className="flex-1 flex items-center justify-end gap-6">
            <button
              onClick={toggleCart}
              className="relative text-white/70 hover:text-white transition-colors duration-200"
              aria-label="Cart"
              data-cursor="navbar"
            >
              <ShoppingBag size={17} strokeWidth={2} />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: 'spring', stiffness: 600, damping: 20 }}
                    className="absolute -top-[5px] -right-[6px] w-[14px] h-[14px] rounded-full bg-coral text-white flex items-center justify-center font-sans font-bold text-[8px]"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            <motion.button
              onClick={() => setIsMenuOpen(true)}
              whileHover="hover"
              className="text-white/70 hover:text-white transition-colors duration-200 p-1 flex items-center justify-center"
              aria-label="Open Menu"
              data-cursor="navbar"
            >
              <GridIcon />
            </motion.button>
          </div>
        </motion.nav>

        {/* ─── MOBILE SINGLE PILL (hidden on desktop) ─── */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={pieceVariants}
          className="md:hidden pointer-events-auto w-[calc(100%-40px)] max-w-[380px] flex items-center justify-between px-5"
          style={{
            height: mobileHeight,
            background: logoBgColor,
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: `1px solid ${borderColor}`,
            borderRadius: '100px',
            transition: 'height 0.4s ease, background 0.4s ease, border-color 0.4s ease',
          }}
        >
          <Link href="/" className="block">
            <div className="relative w-[60px] h-[24px] filter drop-shadow-[0_1px_6px_rgba(0,0,0,0.5)]">
              <Image
                src="/images/Screenshot_2026-05-19_115048-removebg-preview.png"
                alt="ARUBA COLL"
                fill
                priority
                sizes="(max-width: 768px) 60px, 50px"
                className="object-contain"
              />
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleCart}
              className="relative text-white/70 hover:text-white transition-colors duration-200"
              aria-label="Cart"
            >
              <ShoppingBag size={16} strokeWidth={2} />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: 'spring', stiffness: 600, damping: 20 }}
                    className="absolute -top-[5px] -right-[6px] w-[14px] h-[14px] rounded-full bg-coral text-white flex items-center justify-center font-sans font-bold text-[8px]"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            <motion.button
              onClick={() => setIsMenuOpen(true)}
              whileHover="hover"
              className="text-white/70 hover:text-white transition-colors duration-200 flex items-center justify-center"
              aria-label="Open Menu"
            >
              <GridIcon mobile />
            </motion.button>
          </div>
        </motion.div>
      </header>

      {/* ─── FULL-SCREEN MENU OVERLAY ─── */}
      <AnimatePresence>
        {isMenuOpen && (
          <MenuOverlay onClose={() => setIsMenuOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

/* ─────────────────────────────────────────────────────────
   DESKTOP NAV LINK
────────────────────────────────────────────────────────── */
function DesktopNavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="relative group flex items-center justify-center" data-cursor="navbar">
      <span 
        className="font-sans text-[11px] font-medium tracking-[0.14em] uppercase text-white/65 group-hover:text-white transition-colors duration-250"
      >
        {label}
      </span>
      {/* Hover Dot */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-1 h-1 bg-coral rounded-full opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out" />
    </Link>
  );
}

/* ─────────────────────────────────────────────────────────
   GRID ICON COMPONENT
────────────────────────────────────────────────────────── */
function GridIcon({ mobile = false }: { mobile?: boolean }) {
  const size = mobile ? 10 : 8;
  const square = mobile ? 4 : 3;
  const gap = mobile ? 2 : 2;
  const offset = square + gap;

  // Hover scatter variant
  const scatterVariants = {
    hover: (custom: { x: number; y: number }) => ({
      x: custom.x,
      y: custom.y,
      transition: { type: 'spring', stiffness: 400, damping: 20 },
    }),
  };

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="currentColor"
      className="overflow-visible"
    >
      <motion.rect x="0" y="0" width={square} height={square} custom={{ x: -2, y: -2 }} variants={scatterVariants} />
      <motion.rect x={offset} y="0" width={square} height={square} custom={{ x: 2, y: -2 }} variants={scatterVariants} />
      <motion.rect x="0" y={offset} width={square} height={square} custom={{ x: -2, y: 2 }} variants={scatterVariants} />
      <motion.rect x={offset} y={offset} width={square} height={square} custom={{ x: 2, y: 2 }} variants={scatterVariants} />
    </motion.svg>
  );
}

/* ─────────────────────────────────────────────────────────
   MENU OVERLAY COMPONENT
────────────────────────────────────────────────────────── */
function MenuOverlay({ onClose }: { onClose: () => void }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [origin, setOrigin] = useState({ x: '90%', y: '40px' });

  useEffect(() => {
    const updateOrigin = () => {
      const isMobile = window.innerWidth < 768;
      if (isMobile) {
        // Center of mobile grid button
        const pillWidth = Math.min(window.innerWidth - 40, 380);
        const rightEdge = window.innerWidth / 2 + pillWidth / 2;
        const xCoord = rightEdge - 30; // ~30px from right edge of the pill
        setOrigin({ x: `${xCoord}px`, y: `${20 + 25}px` });
      } else {
        // Center of desktop grid button
        const xCoord = window.innerWidth / 2 + 340 - 45; // 340px is half of 680px, grid icon is around 45px from right
        setOrigin({ x: `${xCoord}px`, y: `${20 + 26}px` });
      }
    };

    updateOrigin();
    window.addEventListener('resize', updateOrigin);
    return () => window.removeEventListener('resize', updateOrigin);
  }, []);

  const overlayVariants = {
    hidden: { clipPath: 'circle(0px at var(--click-origin-x, 90%) var(--click-origin-y, 40px))' },
    visible: {
      clipPath: 'circle(250vmax at var(--click-origin-x, 90%) var(--click-origin-y, 40px))',
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      clipPath: 'circle(0px at var(--click-origin-x, 90%) var(--click-origin-y, 40px))',
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 + i * 0.07,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <motion.div
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      style={{
        '--click-origin-x': origin.x,
        '--click-origin-y': origin.y,
      } as any}
      className="fixed inset-0 z-[200] bg-[#050d1a] flex flex-col pointer-events-auto overflow-hidden"
    >
      {/* ── SUBTLE ATMOSPHERE (No Images) ── */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(232,103,42,0.05)_0%,_transparent_60%)] pointer-events-none z-0" />

      {/* ── OVERLAY TOP BAR (Mirroring Navbar architecture but transparent) ── */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 w-[calc(100%-40px)] max-w-[380px] flex md:hidden items-center justify-between px-5 h-[50px] z-20">
         <div className="relative w-[60px] h-[24px]">
            <Image src="/images/Screenshot_2026-05-19_115048-removebg-preview.png" alt="ARUBA COLL" fill sizes="60px" className="object-contain opacity-50" />
         </div>
         <motion.button onClick={onClose} whileHover={{ rotate: 90 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} className="text-white/70 hover:text-white p-2">
           <X size={20} strokeWidth={1.5} />
         </motion.button>
      </div>

      <div className="hidden md:flex items-center justify-center absolute top-5 left-1/2 -translate-x-1/2 w-full max-w-[680px] h-[52px] z-20">
        {/* Left Space Placeholder */}
        <div className="w-[220px] h-[44px]" />
        
        {/* Center Logo */}
        <div className="w-[80px] h-[52px] flex items-center justify-center">
          <div className="relative w-[50px] h-[28px] opacity-60">
            <Image src="/images/Screenshot_2026-05-19_115048-removebg-preview.png" alt="ARUBA COLL" fill sizes="50px" className="object-contain" />
          </div>
        </div>

        {/* Right Close Button */}
        <div className="w-[220px] h-[44px] flex justify-end items-center px-5">
           <motion.button onClick={onClose} whileHover={{ rotate: 90 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} className="text-white/70 hover:text-white">
             <X size={20} strokeWidth={1.5} />
           </motion.button>
        </div>
      </div>

      {/* ── MAIN MENU CONTENT ── */}
      <div className="relative z-10 flex-1 flex flex-col md:flex-row max-w-[1200px] w-full mx-auto px-8 md:px-16 items-center justify-center h-full">
        
        {/* Left Column - Primary Links */}
        <div className="w-full md:w-[60%] flex flex-col gap-6 items-center md:items-start text-center md:text-left mt-20 md:mt-0">
          {NAV_LINKS.map((link, i) => {
            const isHovered = hoveredIndex === i;
            const isAnyHovered = hoveredIndex !== null;

            return (
              <motion.div custom={i} variants={linkVariants} initial="hidden" animate="visible" key={link.label}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="group block relative"
                >
                  <span 
                    className="oi-regular block transition-all duration-500 ease-out"
                    style={{ 
                      fontSize: 'clamp(3.5rem, 6vw, 5.5rem)', 
                      lineHeight: 0.95, 
                      letterSpacing: '-0.02em',
                      color: isAnyHovered ? (isHovered ? '#fff' : 'transparent') : 'rgba(255,255,255,0.8)',
                      WebkitTextStroke: isAnyHovered && !isHovered ? '1px rgba(255,255,255,0.2)' : '0px',
                      transform: isHovered ? 'translateX(1.5rem)' : 'translateX(0)',
                    }}
                  >
                    {link.label}
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Right Column - Secondary Info */}
        <div className="w-full md:w-[40%] flex flex-col items-center md:items-end justify-end gap-4 mt-16 md:mt-0 opacity-0 animate-[fadeIn_1s_ease_0.6s_forwards]">
           <div className="font-sans text-[12px] tracking-[0.2em] text-white/40">I ❤ ARUBA</div>
           <div className="font-sans text-[12px] tracking-[0.2em] text-white/40">EST. 2024</div>
           
           <div className="flex flex-col md:items-end gap-2 mt-8">
             <a href="#" className="font-sans text-[11px] uppercase tracking-[0.15em] text-white/50 hover:text-coral transition-colors">Instagram</a>
             <a href="#" className="font-sans text-[11px] uppercase tracking-[0.15em] text-white/50 hover:text-coral transition-colors">Twitter</a>
             <a href="#" className="font-sans text-[11px] uppercase tracking-[0.15em] text-white/50 hover:text-coral transition-colors">Journal</a>
           </div>
        </div>
      </div>

      {/* ── BOTTOM TAG ── */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-8 md:px-16 pb-8 md:pb-12 opacity-0 animate-[fadeIn_1s_ease_0.8s_forwards]">
        <div className="w-full h-[1px] bg-white/[0.08] mb-4" />
        <div className="text-center font-sans text-[10px] tracking-[0.2em] text-white/30">
          12.5°N · 70.0°W
        </div>
      </div>
    </motion.div>
  );
}
