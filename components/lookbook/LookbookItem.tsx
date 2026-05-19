import React from 'react';
import { LookbookItem as LookbookItemType } from '@/lib/types';

interface LookbookItemProps {
  item: LookbookItemType;
}

export default function LookbookItem({ item }: LookbookItemProps) {
  return (
    <div className="group relative overflow-hidden bg-sand/20 aspect-[3/4]">
      {item.caption && (
        <div className="absolute bottom-4 left-4 text-white text-xs tracking-wider z-10">
          {item.caption}
        </div>
      )}
    </div>
  );
}
