'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full p-4 md:p-6 bg-[#050d1a]">
      <div className="w-full bg-[#0a1628]/60 backdrop-blur-md rounded-[2rem] border border-white/5 pt-16 md:pt-24 px-8 md:px-16 pb-8 flex flex-col relative overflow-hidden">
        
        {/* Top Section: 4 Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 mb-32 z-10">
          
          {/* Navigation */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white text-xs tracking-widest uppercase mb-2 font-medium" style={{ fontFamily: '"Work Sans", sans-serif' }}>Navigation</h4>
            <div className="flex flex-col gap-3 text-white/40 text-xs tracking-wider" style={{ fontFamily: '"Work Sans", sans-serif' }}>
              <Link href="#" className="hover:text-coral transition-colors w-fit">Shop</Link>
              <Link href="#" className="hover:text-coral transition-colors w-fit">Collections</Link>
              <Link href="#" className="hover:text-coral transition-colors w-fit">Lookbook</Link>
              <Link href="#" className="hover:text-coral transition-colors w-fit">Journal</Link>
              <Link href="#" className="hover:text-coral transition-colors w-fit">Stockists</Link>
            </div>
          </div>

          {/* Product */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white text-xs tracking-widest uppercase mb-2 font-medium" style={{ fontFamily: '"Work Sans", sans-serif' }}>Support</h4>
            <div className="flex flex-col gap-3 text-white/40 text-xs tracking-wider" style={{ fontFamily: '"Work Sans", sans-serif' }}>
              <Link href="#" className="hover:text-coral transition-colors w-fit">Size Guide</Link>
              <Link href="#" className="hover:text-coral transition-colors w-fit">Care</Link>
              <Link href="#" className="hover:text-coral transition-colors w-fit">Shipping</Link>
              <Link href="#" className="hover:text-coral transition-colors w-fit">Returns</Link>
            </div>
          </div>

          {/* Social */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white text-xs tracking-widest uppercase mb-2 font-medium" style={{ fontFamily: '"Work Sans", sans-serif' }}>Social</h4>
            <div className="flex flex-col gap-3 text-white/40 text-xs tracking-wider" style={{ fontFamily: '"Work Sans", sans-serif' }}>
              <Link href="#" className="hover:text-coral transition-colors w-fit">Instagram</Link>
              <Link href="#" className="hover:text-coral transition-colors w-fit">Pinterest</Link>
              <Link href="#" className="hover:text-coral transition-colors w-fit">Twitter / X</Link>
            </div>
          </div>

          {/* Information */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white text-xs tracking-widest uppercase mb-2 font-medium" style={{ fontFamily: '"Work Sans", sans-serif' }}>Information</h4>
            <div className="flex flex-col gap-3 text-white/40 text-xs tracking-wider" style={{ fontFamily: '"Work Sans", sans-serif' }}>
              <Link href="#" className="hover:text-coral transition-colors w-fit">Privacy Policy</Link>
              <Link href="#" className="hover:text-coral transition-colors w-fit">Terms of Use</Link>
              <span className="mt-4 opacity-50 block text-[10px]">© {currentYear} ARUBA COLL. All rights reserved.</span>
            </div>
          </div>

        </div>

        {/* Bottom Section: Massive Brand Name */}
        <div className="w-full mt-auto pointer-events-none select-none">
          <svg 
            viewBox="0 0 2800 400" 
            className="w-full h-auto drop-shadow-2xl translate-y-4" 
            preserveAspectRatio="xMidYMid meet"
          >
            <text 
              x="50%" 
              y="50%" 
              dominantBaseline="middle" 
              textAnchor="middle" 
              className="oi-regular fill-white/20"
              style={{ fontSize: '240px' }}
            >
              ARUBA COLL
            </text>
          </svg>
        </div>

      </div>
    </footer>
  );
}
