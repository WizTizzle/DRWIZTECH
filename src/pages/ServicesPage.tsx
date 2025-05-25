import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HardDrive, Database, Server, Usb, Laptop, Shield } from 'lucide-react';
import { SectionDivider } from '../components/SectionDivider';

export function ServicesPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(pageRef, { once: true, threshold: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  const services = [
    {
      icon: <HardDrive size={48} />,
      title: "Hard Drive Recovery",
      description: "Expert recovery for all types of hard drives, including mechanical failures and logical errors.",
      features: [
        "Recovery from clicking, beeping, or non-spinning drives",
        "Head replacements in clean room environment",
        "PCB repairs and firmware reconstruction",
        "Support for all brands and interfaces"
      ],
      link: "/services/hard-drive",
      bgColor: "bg-blue-50"
    },
    {
      icon: <Database size={48} />,
      title: "SSD & NVMe Recovery",
      description: "Advanced recovery techniques for solid-state drives and NVMe storage devices.",
      features: [
        "Controller failure recovery",
        "NAND chip data extraction",
        "Firmware reconstruction",
        "All SSD form factors supported"
      ],
      link: "/services/ssd",
      bgColor: "bg-green-50"
    },
    {
      icon: <Server size={48} />,
      title: "RAID & Server Recovery",
      description: "Enterprise-level recovery for RAID arrays, servers, and NAS devices.",
      features: [
        "All RAID levels (0, 1, 5, 6, 10, etc.)",
        "Virtual reconstruction of arrays",
        "Multiple drive failure recovery",
        "Server & NAS specialists"
      ],
      link: "/services/raid",
      bgColor: "bg-purple-50"
    },
    {
      icon: <Usb size={48} />,
      title: "Flash & Memory Cards",
      description: "Recovery of lost or corrupted data from USB drives, SD cards, and other flash storage.",
      features: [
        "Monolith chip recovery",
        "Water/physical damage repair",
        "Controller bypass techniques",
        "All memory card formats"
      ],
      link: "/services/flash",
      bgColor: "bg-yellow-50"
    },
    {
      icon: <Laptop size={48} />,
      title: "Laptop Recovery",
      description: "Specialized recovery for laptop computers and tablets with non-removable storage.",
      features: [
        "Apple MacBook & Microsoft Surface specialists",
        "In-system recovery without drive removal",
        "Password & encryption bypass",
        "SSD/NVMe recovery from damaged laptops"
      ],
      link: "/services/laptop",
      bgColor: "bg-red-50"
    },
    {
      icon: <Shield size={48} />,
      title: "Encrypted Drive Recovery",
      description: "Advanced techniques for recovering data from encrypted or password-protected drives.",
      features: [
        "BitLocker recovery",
        "VeraCrypt & TrueCrypt support",
        "Apple FileVault specialists",
        "Hardware encryption recovery"
      ],
      link: "/services/encrypted",
      bgColor: "bg-indigo-50"
    }
  ];

  const processSteps = [
    {
      number: "01",
      title: "Free Evaluation",
      description: "Complete our online assessment form to help us understand your data loss situation."
    },
    {
      number: "02",
      title: "Device Shipping",
      description: "We provide secure shipping materials and instructions for safely sending your device."
    },
    {
      number: "03",
      title: "Diagnostic Analysis",
      description: "Our engineers perform a thorough assessment to determine recovery options."
    },
    {
      number: "04",
      title: "Recovery Procedure",
      description: "Using specialized tools and techniques, we recover your valuable data."
    },
    {
      number: "05",
      title: "Quality Verification",
      description: "We verify all recovered files to ensure data integrity and completeness."
    },
    {
      number: "06",
      title: "Secure Return",
      description: "Your recovered data is delivered on a new storage device with encryption options."
    }
  ];

  const testimonials = [
    {
      quote: "WizTech recovered critical business data from our failed RAID array when other services said it was impossible. Their expertise saved our company from disaster.",
      author: "Michael Chen",
      company: "TechSolutions, Inc."
    },
    {
      quote: "After my hard drive crashed with our family photos, I was devastated. WizTech not only recovered everything but made the process stress-free and affordable.",
      author: "Sarah Johnson",
      company: "Professional Photographer"
    }
  ];

  return (
    <div ref={pageRef} className="container mx-auto px-4 py-12 pt-64">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="space-y-16"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-display font-bold text-gray-900 mb-6">
              Our <span className="text-primary-600">Recovery</span> Services
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive data recovery solutions for all storage devices, delivered by certified experts using advanced technology.
            </p>
          </motion.div>

          <SectionDivider className="my-12" />

          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Link to={service.link} key={index} className="block h-full">
                <motion.div
                  className={`${service.bgColor} p-6 rounded-xl shadow-md h-full transition-all duration-300 hover:shadow-lg hover:scale-[1.02]`}
                  whileHover={{ y: -5 }}
                >
                  <div className="text-primary-600 mb-4">{service.icon}</div>
                  <h3 className="text-2xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700 text-sm mb-4">
                    {service.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-4">
                    <span className="text-primary-600 font-medium inline-flex items-center group">
                      Learn more
                      <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </motion.div>

          <SectionDivider className="my-12" />

          <motion.div variants={itemVariants} className="space-y-8">
            <h2 className="text-3xl font-display font-bold text-center text-gray-900">Our Recovery Process</h2>
            <p className="text-center text-gray-600 max-w-3xl mx-auto">
              We've refined our recovery process to ensure maximum success rates while providing a transparent and stress-free experience for our clients.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {processSteps.map((step, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md relative">
                  <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 mt-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Industry-Leading Success Rates</h2>
              <p className="text-lg mb-8">
                Our specialized techniques and equipment enable us to achieve a 97% success rate across all recovery cases, including those deemed impossible by other providers.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <button className="px-6 py-3 bg-white text-primary-700 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                  Start Assessment
                </button>
                <button className="px-6 py-3 bg-transparent border border-white text-white rounded-lg font-medium hover:bg-white/10 transition-colors">
                  Contact Us
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-8">
            <h2 className="text-3xl font-display font-bold text-center text-gray-900">Client Testimonials</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white p-8 rounded-lg shadow-md">
                  <div className="mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400 mr-1">★</span>
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-6">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-gray-600 text-sm">{testimonial.company}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}