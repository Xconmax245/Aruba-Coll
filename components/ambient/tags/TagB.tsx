import React from 'react';

export default function TagB(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="80" height="32" viewBox="0 0 80 32" fill="none" stroke="currentColor" strokeWidth="1" {...props}>
      <polygon points="12,2 78,2 78,30 12,30 2,16" />
      <circle cx="12" cy="16" r="2" />
      <text x="45" y="19" fill="currentColor" stroke="none" fontSize="8" fontWeight="500" letterSpacing="0.05em" textAnchor="middle" style={{ fontFamily: '"Work Sans", sans-serif' }}>
        32°C · SEA LEVEL
      </text>
    </svg>
  );
}
