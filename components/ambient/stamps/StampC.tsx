import React from 'react';

export default function StampC(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1" {...props}>
      <circle cx="32" cy="32" r="30" />
      
      {/* Top arc */}
      <path id="top-arc-c" d="M 14 32 A 18 18 0 1 1 50 32" stroke="none" />
      <text fill="currentColor" stroke="none" fontSize="8" fontWeight="500" letterSpacing="0.1em">
        <textPath href="#top-arc-c" startOffset="50%" textAnchor="middle">DROP 001</textPath>
      </text>

      {/* Bottom arc */}
      <path id="bottom-arc-c" d="M 50 32 A 18 18 0 0 1 14 32" stroke="none" />
      <text fill="currentColor" stroke="none" fontSize="7" fontWeight="400" letterSpacing="0.1em">
        <textPath href="#bottom-arc-c" startOffset="50%" textAnchor="middle">ARUBA ♥</textPath>
      </text>

      {/* Center diamond */}
      <rect x="29" y="29" width="6" height="6" transform="rotate(45 32 32)" fill="currentColor" stroke="none" />
    </svg>
  );
}
