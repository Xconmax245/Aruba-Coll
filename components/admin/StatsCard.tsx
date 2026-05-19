import React from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
}

export default function StatsCard({ title, value, change }: StatsCardProps) {
  return (
    <div className="bg-white border border-ocean/10 p-6 shadow-sm rounded">
      <span className="text-xs uppercase tracking-widest text-text-muted">{title}</span>
      <h3 className="font-serif text-2xl text-ocean mt-2">{value}</h3>
      {change && (
        <span className="text-[10px] text-[#3bb75e] block mt-1">{change}</span>
      )}
    </div>
  );
}
