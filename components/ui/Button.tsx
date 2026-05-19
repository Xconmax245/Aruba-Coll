import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline';
}

export default function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  const baseStyle = 'px-6 py-3 uppercase text-xs tracking-widest font-semibold transition-all duration-300';
  let variantStyle = '';

  switch (variant) {
    case 'secondary':
      variantStyle = 'bg-sand text-ocean hover:bg-ocean hover:text-sand';
      break;
    case 'accent':
      variantStyle = 'bg-sunset text-white hover:bg-coral';
      break;
    case 'outline':
      variantStyle = 'border border-ocean text-ocean hover:bg-ocean hover:text-sand';
      break;
    case 'primary':
    default:
      variantStyle = 'bg-ocean text-sand hover:bg-sunset hover:text-white';
      break;
  }

  return (
    <button className={`${baseStyle} ${variantStyle} ${className}`} {...props} />
  );
}
