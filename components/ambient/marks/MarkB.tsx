import React from 'react';

export default function MarkB(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="70" height="16" viewBox="0 0 70 16" fill="currentColor" {...props}>
      <text x="35" y="12" fontSize="10" letterSpacing="0.2em" textAnchor="middle" style={{ fontFamily: '"Work Sans", sans-serif' }}>
        SS · 2024
      </text>
    </svg>
  );
}
