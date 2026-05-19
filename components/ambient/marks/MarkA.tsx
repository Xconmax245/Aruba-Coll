import React from 'react';

export default function MarkA(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="50" height="20" viewBox="0 0 50 20" fill="currentColor" {...props}>
      <text x="25" y="15" fontSize="13" textAnchor="middle" style={{ fontFamily: '"Oi", serif' }}>
        № 001
      </text>
    </svg>
  );
}
