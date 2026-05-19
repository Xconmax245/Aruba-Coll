import React from 'react';
import { CartItem as CartItemType } from '@/lib/types';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  return (
    <div className="flex justify-between items-center py-4 border-b border-ocean/5">
      <span className="font-serif text-sm">{item.product.name}</span>
      <span className="font-sans text-xs text-text-muted">x{item.quantity}</span>
    </div>
  );
}
