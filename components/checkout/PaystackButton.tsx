import React from 'react';

interface PaystackButtonProps {
  amount: number;
  email: string;
}

export default function PaystackButton({ amount, email }: PaystackButtonProps) {
  return (
    <button className="w-full py-4 bg-[#3bb75e] text-white font-semibold uppercase tracking-widest text-xs hover:bg-[#329e50] transition-colors">
      Pay with Paystack ({amount})
    </button>
  );
}
