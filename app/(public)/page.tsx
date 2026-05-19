import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import SectionSpirit from '@/components/home/SectionSpirit';
import SectionCollection from '@/components/home/SectionCollection';
import SectionLookbook from '@/components/home/SectionLookbook';
import SectionArrival from '@/components/home/SectionArrival';
import SectionShore from '@/components/home/SectionShore';
import SectionFeeling from '@/components/home/SectionFeeling';
import SectionSignal from '@/components/home/SectionSignal';

export default function HomePage() {
  return (
    <main className="bg-[#060f17] relative">
      <div className="sticky top-0 h-screen w-full z-0 overflow-hidden">
        <HeroSection />
      </div>
      <div className="relative z-10 bg-[#060f17]">
        <SectionSpirit />
        <SectionCollection />
        <SectionLookbook />
        <SectionArrival />
        <SectionShore />
        <SectionFeeling />
        <SectionSignal />
      </div>
    </main>
  );
}
