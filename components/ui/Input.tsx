import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function Input({ className = '', ...props }: InputProps) {
  return (
    <input
      className={`w-full px-4 py-3 bg-transparent border border-ocean/10 text-ocean font-sans text-sm focus:outline-none focus:border-sunset transition-all duration-300 ${className}`}
      {...props}
    />
  );
}
