import React from 'react';
import { Product } from '@/lib/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="border border-ocean/10 p-4 bg-white">
      <h3 className="font-serif text-lg text-ocean">{product.name}</h3>
      <p className="font-sans text-xs text-text-muted">{product.price}</p>
    </div>
  );
}
