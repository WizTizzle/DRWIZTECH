import React from 'react';
import { Hero } from '../components/Hero';
import { ServicesSection } from '../components/ServicesSection';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { SectionDivider } from '../components/SectionDivider';

export function HomePage() {
  return (
    <>
      <Hero />
      <SectionDivider className="w-full" />
      <ServicesSection />
      <SectionDivider className="w-full" inverted={true} />
      <WhyChooseUs />
    </>
  );
}