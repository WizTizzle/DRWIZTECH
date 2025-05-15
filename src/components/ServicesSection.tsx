import React, { useRef, useEffect } from 'react';
import { ServiceCard } from './ServiceCard';
import { services } from '../data/services';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen py-32 overflow-hidden bg-white"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(75,156,211,0.1),transparent_70%)]" />
      
      <motion.div 
        ref={ref}
        style={{ y, opacity }}
        className="container relative mx-auto px-4"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-20"
          >
            <h2 className="text-6xl md:text-7xl font-display font-bold text-gray-900 mb-6">
              Recovery
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-primary-600">
                {" "}Solutions
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Expert data recovery services for all storage devices, from personal drives to enterprise systems.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              >
                <ServiceCard
                  title={service.title}
                  description={service.description}
                  Icon={service.Icon}
                  link={service.link}
                />
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="absolute -z-10 inset-0 opacity-30"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 0.3 } : {}}
            transition={{ duration: 1 }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(142,216,248,0.1),transparent_70%)]" />
            <div className="absolute inset-0 bg-grid-pattern" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}