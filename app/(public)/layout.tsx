import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SmoothScrollProvider from '@/components/layout/SmoothScrollProvider';
import AmbientLayer from '@/components/ambient/AmbientLayer';
import AOSProvider from '@/components/layout/AOSProvider';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SmoothScrollProvider>
      <AOSProvider>
        {/* Ambient environmental storytelling layer — z-index 5 */}
        <AmbientLayer />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </AOSProvider>
    </SmoothScrollProvider>
  );
}

