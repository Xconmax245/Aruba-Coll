import React from 'react';

export default function PalmIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      {/* Trunk */}
      <path d="M12 22C12 22 10 14 13 8" />
      {/* Fronds */}
      <path d="M13 8C13 8 7 8 4 12" />
      <path d="M13 8C13 8 18 5 21 8" />
      <path d="M13 8C13 8 19 12 20 16" />
    </svg>
  );
}
