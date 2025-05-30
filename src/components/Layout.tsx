import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { SectionDivider } from './SectionDivider';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <motion.div 
      className="min-h-screen flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header />
      <SectionDivider className="w-full" />
      <main className="flex-grow bg-gradient-to-b from-white to-gray-50 w-full mt-[calc(12rem-0.5px)]">
        {children}
      </main>
      <SectionDivider className="w-full" />
      <Footer />
    </motion.div>
  );
}