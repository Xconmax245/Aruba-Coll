import React from 'react';

export default function TagC(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="96" height="32" viewBox="0 0 96 32" fill="none" stroke="currentColor" strokeWidth="1" {...props}>
      <polygon points="12,2 94,2 94,30 12,30 2,16" />
      <circle cx="12" cy="16" r="2" />
      <text x="53" y="19" fill="currentColor" stroke="none" fontSize="8" fontWeight="500" letterSpacing="0.05em" textAnchor="middle" style={{ fontFamily: '"Work Sans", sans-serif' }}>
        MADE FOR THE SHORE
      </text>
    </svg>
  );
}
