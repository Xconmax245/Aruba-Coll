import React from 'react';

export default function CartDrawer() {
  return (
    <div className="fixed inset-y-0 right-0 z-[100] w-full max-w-md bg-white shadow-xl border-l border-ocean/10 p-8 hidden">
      <h2 className="font-serif text-xl uppercase tracking-widest text-ocean mb-6">Shopping Cart</h2>
    </div>
  );
}
