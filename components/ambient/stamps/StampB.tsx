import React from 'react';

export default function StampB(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="90" height="36" viewBox="0 0 90 36" fill="none" stroke="currentColor" strokeWidth="1" {...props}>
      <rect x="1" y="1" width="88" height="34" rx="4" />
      <rect x="4" y="4" width="82" height="28" rx="2" strokeWidth="0.5" />
      <text x="45" y="21" fill="currentColor" stroke="none" fontSize="9" fontWeight="600" letterSpacing="0.15em" textAnchor="middle" style={{ fontVariant: 'small-caps' }}>
        ISLAND CERTIFIED
      </text>
    </svg>
  );
}
