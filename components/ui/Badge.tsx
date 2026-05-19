import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent';
  className?: string;
}

export default function Badge({ children, variant = 'primary', className = '' }: BadgeProps) {
  let variantStyle = '';

  switch (variant) {
    case 'secondary':
      variantStyle = 'bg-sand text-ocean';
      break;
    case 'accent':
      variantStyle = 'bg-sunset text-white';
      break;
    case 'primary':
    default:
      variantStyle = 'bg-ocean/10 text-ocean';
      break;
  }

  return (
    <span className={`inline-block px-2.5 py-1 text-[10px] uppercase tracking-widest font-semibold ${variantStyle} ${className}`}>
      {children}
    </span>
  );
}
