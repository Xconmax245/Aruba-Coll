'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { name: 'Overview', href: '/admin/dashboard' },
    { name: 'Products', href: '/admin/products' },
    { name: 'Collections', href: '/admin/collections' },
    { name: 'Orders', href: '/admin/orders' },
    { name: 'Lookbook', href: '/admin/lookbook' },
    { name: 'Users', href: '/admin/users' },
  ];

  return (
    <aside className="w-64 bg-ocean text-sand flex flex-col min-h-screen">
      <div className="p-6 border-b border-sand/10">
        <span className="font-serif text-lg tracking-widest text-white uppercase block">
          ARUBA Admin
        </span>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-4 py-2.5 text-xs uppercase tracking-wider font-semibold transition-colors duration-250 ${
                isActive
                  ? 'bg-sunset text-white'
                  : 'text-sand/70 hover:bg-sand/5 hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-sand/10">
        <Link
          href="/"
          className="block px-4 py-2 text-center text-xs uppercase tracking-widest border border-sand/30 hover:border-white transition-colors"
        >
          View Store
        </Link>
      </div>
    </aside>
  );
}
