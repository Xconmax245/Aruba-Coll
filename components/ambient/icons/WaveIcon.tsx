import React from 'react';

export default function WaveIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      {/* 2 complete wave cycles */}
      <path d="M2 12 Q 4.5 7, 7 12 T 12 12 T 17 12 T 22 12" />
    </svg>
  );
}
