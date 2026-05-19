import React from 'react';

export default function LeafIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      {/* Curved stem */}
      <path d="M4 20 Q 12 16, 20 4" />
      {/* Alternating strokes */}
      <path d="M8 17 Q 10 14, 14 16" />
      <path d="M12 13 Q 14 10, 18 12" />
      <path d="M10 18 Q 6 15, 6 12" />
      <path d="M14 15 Q 10 12, 10 9" />
    </svg>
  );
}
