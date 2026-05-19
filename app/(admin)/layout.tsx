'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from '@/components/admin/Sidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  if (isLoginPage) {
    return <div className="min-h-screen bg-cream">{children}</div>;
  }

  return (
    <div className="flex min-h-screen bg-sand/20">
      <Sidebar />
      <main className="flex-1 p-8 md:p-12 overflow-y-auto">{children}</main>
    </div>
  );
}
