import React from 'react';

export default function MarkC(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="80" height="16" viewBox="0 0 80 16" fill="currentColor" {...props}>
      <text x="25" y="12" fontSize="11" textAnchor="end" style={{ fontFamily: '"Work Sans", sans-serif' }}>
        I
      </text>
      {/* 8px inline heart path */}
      <path d="M30 6 A 2 2 0 0 0 28 8 A 2 2 0 0 0 30 10 A 2 2 0 0 0 32 8 A 2 2 0 0 0 30 6" fill="none" /> {/* Placeholder, let's draw a real heart */}
      <path d="M 30 11.5 L 27.5 9 C 26 7.5 28 5.5 30 7.5 C 32 5.5 34 7.5 32.5 9 Z" fill="currentColor" />
      
      <text x="37" y="12" fontSize="11" textAnchor="start" style={{ fontFamily: '"Work Sans", sans-serif' }}>
        ARUBA
      </text>
    </svg>
  );
}
