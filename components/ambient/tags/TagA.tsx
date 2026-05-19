import React from 'react';

export default function TagA(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="72" height="32" viewBox="0 0 72 32" fill="none" stroke="currentColor" strokeWidth="1" {...props}>
      {/* Luggage tag shape: rect with pointed bottom. We draw it sideways if it's horizontal, or just a pointed right side? 
          Wait, "pointed bottom" but size is 72x32 (horizontal). Probably a standard tag shape: pointed on the left or right. 
          Let's make it pointed on the left. */}
      <polygon points="12,2 70,2 70,30 12,30 2,16" />
      <circle cx="12" cy="16" r="2" />
      <text x="41" y="19" fill="currentColor" stroke="none" fontSize="8" fontWeight="500" letterSpacing="0.05em" textAnchor="middle" style={{ fontFamily: '"Work Sans", sans-serif' }}>
        12.5°N / 70.0°W
      </text>
    </svg>
  );
}
