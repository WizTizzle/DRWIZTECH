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
      className="relative h-screen-dvh flex items-center justify-center pt-0 overflow-hidden bg-transparent"
    >
      {/* Background Video */}
      <video 
        className="absolute inset-0 w-full h-full object-cover z-0"
        autoPlay 
        loop 
        muted 
        playsInline
        poster="/images/Western_Digital_WD800_Hard_Disk_A.jpg"
      >
        <source src="/images/Hard Drive Video Rotation.mov" type="video/mp4" />
        {/* Fallback for browsers that don't support video */}
        Your browser does not support the video tag.
      </video>
      
      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black/40 z-0"></div>

      <div className="container relative mx-auto px-4 z-10">
        <motion.div 
          ref={textRef}
          className="flex flex-col items-center text-center mt-16"
        >
          <div className="max-w-4xl space-y-12">
            <h1 className="text-7xl md:text-[8.5rem] font-display font-bold text-white leading-none tracking-tight">
              Recover
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-300 via-primary-400 to-primary-300 animate-shine [background-size:200%_auto]">
                Everything
              </span>
            </h1>
            
            <p className="text-xl md:text-3xl text-gray-200 leading-relaxed max-w-3xl mx-auto font-light">
              Expert data recovery solutions for all storage devices. International service available with industry-leading success rates.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-6 mt-12">
              <AssessmentButton className="relative px-8 py-4 text-lg font-medium text-black bg-primary-300 rounded-xl overflow-hidden group">
                <span className="relative z-10">Start Recovery Assessment</span>
                <div className="absolute inset-0 bg-gradient-shine opacity-0 group-hover:opacity-100 transition-opacity duration-500 [background-size:200%_auto] animate-shine" />
              </AssessmentButton>
              
              <a href="#services" className="px-8 py-4 text-lg font-medium text-primary-300 border border-primary-300/30 rounded-xl hover:bg-primary-300/10 transition-colors duration-500">
                Learn More
              </a>
            </div>
          </div>
        </motion.div>
      </div>

    </section>
  );
}