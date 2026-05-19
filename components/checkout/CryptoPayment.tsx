import React from 'react';

interface CryptoPaymentProps {
  totalAmount: number;
}

export default function CryptoPayment({ totalAmount }: CryptoPaymentProps) {
  return (
    <div className="p-6 border border-ocean/10 bg-white">
      <h4 className="font-serif text-sm uppercase tracking-widest text-ocean mb-4">Crypto Payment Options</h4>
    </div>
  );
}
