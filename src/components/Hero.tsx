import React, { useEffect, useRef } from 'react';
import { AssessmentButton } from './AssessmentButton';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const rect = heroRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      heroRef.current.style.setProperty('--mouse-x', `${x}%`);
      heroRef.current.style.setProperty('--mouse-y', `${y}%`);
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (!textRef.current) return;

    gsap.fromTo(
      textRef.current.children,
      { 
        y: 100,
        opacity: 0 
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 1,
        ease: "power4.out"
      }
    );
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative h-screen-dvh flex items-center justify-center pt-0 overflow-hidden bg-gradient-to-b from-white to-gray-50"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(75,156,211,0.15),transparent_70%)] transition-opacity duration-300" />
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -inset-[100%] bg-[length:50px_50px] bg-primary-100 [background-image:linear-gradient(rgba(75,156,211,0.1)1px,transparent_1px),linear-gradient(90deg,rgba(75,156,211,0.1)1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
        </div>
      </div>

      <div className="container relative mx-auto px-4 z-10">
        <motion.div 
          ref={textRef}
          className="flex flex-col items-center text-center mt-16"
        >
          <div className="max-w-4xl space-y-12">
            <h1 className="text-7xl md:text-[8.5rem] font-display font-bold text-gray-900 leading-none tracking-tight">
              Recover
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-300 via-primary-400 to-primary-300 animate-shine [background-size:200%_auto]">
                Everything
              </span>
            </h1>
            
            <p className="text-xl md:text-3xl text-gray-600 leading-relaxed max-w-3xl mx-auto font-light">
              Expert data recovery solutions for all storage devices. International service available with industry-leading success rates.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-6 mt-12">
              <AssessmentButton className="relative px-8 py-4 text-lg font-medium text-black bg-primary-300 rounded-xl overflow-hidden group">
                <span className="relative z-10">Start Recovery Assessment</span>
                <div className="absolute inset-0 bg-gradient-shine opacity-0 group-hover:opacity-100 transition-opacity duration-500 [background-size:200%_auto] animate-shine" />
              </AssessmentButton>
              
              <button className="px-8 py-4 text-lg font-medium text-primary-300 border border-primary-300/30 rounded-xl hover:bg-primary-300/10 transition-colors duration-500">
                Learn More
              </button>
            </div>
          </div>
        </motion.div>
      </div>

    </section>
  );
}