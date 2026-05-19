import React from 'react';

export default function StampD(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="100" height="32" viewBox="0 0 100 32" fill="none" stroke="currentColor" strokeWidth="1" {...props}>
      {/* Double border pill */}
      <rect x="1" y="1" width="98" height="30" rx="15" />
      <rect x="3" y="3" width="94" height="26" rx="13" strokeWidth="0.5" />
      
      <text x="50" y="20" fill="currentColor" stroke="none" fontSize="9" fontWeight="500" letterSpacing="0.2em" textAnchor="middle">
        · RESORT WEAR ·
      </text>
    </svg>
  );
}
