import React from 'react';

export default function StampA(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1" {...props}>
      {/* Outer rings */}
      <circle cx="32" cy="32" r="30" />
      <circle cx="32" cy="32" r="28" />
      
      {/* Text path for ARUBA COLL */}
      <path id="top-arc-a" d="M 12 32 A 20 20 0 1 1 52 32" stroke="none" />
      <text fill="currentColor" stroke="none" fontSize="8" fontWeight="600" letterSpacing="0.1em">
        <textPath href="#top-arc-a" startOffset="50%" textAnchor="middle">ARUBA COLL</textPath>
      </text>

      {/* Text path for EST. 2024 */}
      <path id="bottom-arc-a" d="M 52 32 A 20 20 0 0 1 12 32" stroke="none" />
      <text fill="currentColor" stroke="none" fontSize="7" fontWeight="400" letterSpacing="0.05em">
        <textPath href="#bottom-arc-a" startOffset="50%" textAnchor="middle">EST. 2024</textPath>
      </text>

      {/* Center 5-pointed star */}
      <polygon points="32,25 34.2,29.5 39.1,30.2 35.5,33.7 36.4,38.6 32,36.3 27.6,38.6 28.5,33.7 24.9,30.2 29.8,29.5" fill="currentColor" stroke="none" />
    </svg>
  );
}
