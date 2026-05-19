import React from 'react';

export default function CompassIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="1.5" />
      <line x1="12" y1="3" x2="12" y2="10" />
      <line x1="12" y1="14" x2="12" y2="21" />
      <line x1="4" y1="12" x2="10" y2="12" />
      <line x1="14" y1="12" x2="20" y2="12" />
    </svg>
  );
}
