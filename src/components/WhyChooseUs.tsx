import React, { useRef } from 'react';
import { Shield, Database, Server } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const features = [
  {
    Icon: Shield,
    title: "Secure Process",
    description: "Your data security is our top priority with certified clean room facilities.",
    gradient: "from-blue-500/20 to-purple-500/20"
  },
  {
    Icon: Database,
    title: "Advanced Technology",
    description: "Using the latest recovery tools and techniques for optimal results.",
    gradient: "from-green-500/20 to-blue-500/20"
  },
  {
    Icon: Server,
    title: "Global Service",
    description: "International mail-in service available with secure shipping options.",
    gradient: "from-purple-500/20 to-pink-500/20"
  }
];

export function WhyChooseUs() {
  const containerRef = useRef<HTMLElement>(null);
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
      className="relative min-h-screen py-32 bg-gray-50 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(75,156,211,0.1),transparent_50%)]" />
      
      <motion.div
        ref={ref}
        style={{ y, opacity }}
        className="container relative mx-auto px-4"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-6xl md:text-7xl font-display font-bold text-gray-900 mb-6">
              Why Choose
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-primary-600">
                {" "}WizTech
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Industry-leading expertise combined with cutting-edge technology for maximum data recovery success.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map(({ Icon, title, description, gradient }, index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="relative group"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100`} />
                
                <div className="relative bg-white p-8 rounded-3xl border border-gray-100 shadow-lg hover:shadow-xl h-full transform hover:scale-[1.02] transition-all duration-500">
                  <div className="flex justify-center mb-6">
                    <div className="p-4 rounded-2xl bg-primary-300/10">
                      <Icon className="text-primary-300" size={32} />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-display font-semibold mb-4 text-gray-900">{title}</h3>
                  <p className="text-gray-600 leading-relaxed">{description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}