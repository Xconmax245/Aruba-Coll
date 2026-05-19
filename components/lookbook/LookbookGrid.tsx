import React from 'react';
import { LookbookItem } from '@/lib/types';
import LookbookItemComponent from './LookbookItem';

interface LookbookGridProps {
  items: LookbookItem[];
}

export default function LookbookGrid({ items }: LookbookGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {items.map((item) => (
        <LookbookItemComponent key={item.id} item={item} />
      ))}
    </div>
  );
}
