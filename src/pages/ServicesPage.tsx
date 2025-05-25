import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  HardDrive, 
  Database, 
  Server, 
  Usb, 
  CheckCircle,
  Shield,
  Clock,
  Award
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SectionDivider } from '../components/SectionDivider';
import { AssessmentButton } from '../components/AssessmentButton';

const serviceCardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export function ServicesPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [headerRef, headerInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [servicesRef, servicesInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [processRef, processInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [whyUsRef, whyUsInView] = useInView({ threshold: 0.1, triggerOnce: true });

  const services = [
    {
      id: 'hard-drive',
      title: 'Hard Drive Recovery',
      description: 'Expert recovery for all types of hard drives, including mechanical failures and logical errors.',
      icon: HardDrive,
      features: [
        'Recovery from clicking, beeping, or non-spinning drives',
        'Support for all makes and models (Seagate, Western Digital, Toshiba, etc.)',
        'PCB repair and head replacement capabilities',
        '3.5" Desktop & 2.5" Laptop drives',
        'External hard drives and enclosures'
      ],
      image: '/images/Western_Digital_WD800_Hard_Disk_A.jpg',
      link: '/services/hard-drive'
    },
    {
      id: 'ssd',
      title: 'SSD & NVMe Recovery',
      description: 'Advanced recovery techniques for solid-state drives and NVMe storage.',
      icon: Database,
      features: [
        'Recovery from firmware corruption and controller failures',
        'NAND chip-level data extraction',
        'Support for all SSD interfaces (SATA, M.2, NVMe, PCIe)',
        'All major brands (Samsung, Crucial, SanDisk, Intel, etc.)',
        'Proprietary SSD recovery tools'
      ],
      image: '/images/SSD.jpg',
      link: '/services/ssd'
    },
    {
      id: 'raid',
      title: 'RAID & NAS Recovery',
      description: 'Enterprise-level recovery services for RAID arrays, NAS systems, and servers.',
      icon: Server,
      features: [
        'All RAID levels supported (0, 1, 5, 6, 10, etc.)',
        'NAS device recovery (Synology, QNAP, Buffalo, etc.)',
        'Virtual RAID reconstruction',
        'Multiple simultaneous drive failures',
        'Recovery from rebuilding errors'
      ],
      image: 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      link: '/services/raid'
    },
    {
      id: 'flash',
      title: 'Flash & Memory Cards',
      description: 'Recovery of lost or corrupted data from USB drives, SD cards, and other flash storage.',
      icon: Usb,
      features: [
        'USB flash drives of all types',
        'SD/microSD memory cards',
        'CompactFlash and other camera media',
        'Monolith (chip-off) recovery capabilities',
        'Recovery from formatted or damaged devices'
      ],
      image: '/images/FLASH.jpg',
      link: '/services/flash'
    },
    {
      id: 'server',
      title: 'Server Recovery',
      description: 'Enterprise server recovery solutions for mission-critical data.',
      icon: Server,
      features: [
        'Enterprise server recovery (Dell, HP, IBM, etc.)',
        'Database recovery (SQL, Oracle, MySQL)',
        'Virtual machine recovery',
        'Emergency 24/7 response',
        'On-site service available for critical systems'
      ],
      image: '/images/2133.jpg',
      link: '/services/server'
    }
  ];

  const recoveryProcess = [
    {
      step: 1,
      title: 'Free Initial Consultation',
      description: 'Discuss your case with our recovery experts to determine the best approach.'
    },
    {
      step: 2,
      title: 'Diagnostic Assessment',
      description: 'Complete evaluation of your device to identify the exact cause of failure.'
    },
    {
      step: 3,
      title: 'Recovery Plan',
      description: 'Detailed recovery strategy with timeline and fixed-price quote.'
    },
    {
      step: 4,
      title: 'Professional Recovery',
      description: 'Expert data retrieval using our specialized tools and clean room facilities.'
    },
    {
      step: 5,
      title: 'Data Verification',
      description: 'Thorough verification of recovered data to ensure completeness and integrity.'
    },
    {
      step: 6,
      title: 'Secure Delivery',
      description: 'Data delivered securely on encrypted media or via secure cloud transfer.'
    }
  ];

  return (
    <div ref={pageRef} className="container mx-auto px-4 py-12 pt-64">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div 
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-display font-bold text-gray-900 mb-6">
            Our Data Recovery Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive data recovery solutions for all storage device types and failure scenarios, 
            backed by industry-leading expertise and technology.
          </p>
        </motion.div>

        <SectionDivider className="mb-16" />

        {/* Services Section */}
        <motion.div 
          ref={servicesRef}
          initial={{ opacity: 0 }}
          animate={servicesInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="space-y-16 mb-16"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            const isEven = index % 2 === 0;
            
            return (
              <motion.div 
                key={service.id}
                variants={serviceCardVariants}
                initial="hidden"
                animate={servicesInView ? "visible" : "hidden"}
                transition={{ delay: index * 0.2 }}
                className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}
              >
                <div className="w-full md:w-2/5">
                  <div className="rounded-2xl overflow-hidden shadow-lg h-64">
                    <img 
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.error(`Error loading image for ${service.title}`, e);
                        // Fallback to a generic image if the main one fails to load
                        if (service.id === 'raid') {
                          e.currentTarget.src = '/images/2133.jpg';
                        }
                      }}
                    />
                  </div>
                </div>
                
                <div className="w-full md:w-3/5">
                  <div className="flex items-center mb-4">
                    <Icon className="text-primary-600 mr-3" size={28} />
                    <h2 className="text-3xl font-display font-bold">{service.title}</h2>
                  </div>
                  
                  <p className="text-lg text-gray-700 mb-4">
                    {service.description}
                  </p>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">Key Features:</h3>
                    <ul className="space-y-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle className="text-primary-500 mr-2 mt-1 flex-shrink-0" size={16} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Link 
                    to={service.link}
                    className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    Learn More
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <SectionDivider className="my-16" inverted={true} />

        {/* Recovery Process Section */}
        <motion.div 
          ref={processRef}
          initial={{ opacity: 0, y: 50 }}
          animate={processInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-display font-bold text-center mb-12">
            Our Recovery Process
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recoveryProcess.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                animate={processInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold mr-3">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                </div>
                <p className="text-gray-700">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <SectionDivider className="my-16" />

        {/* Why Choose Us Section */}
        <motion.div 
          ref={whyUsRef}
          initial={{ opacity: 0, y: 50 }}
          animate={whyUsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-display font-bold text-center mb-12">
            Why Choose WizTech
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-primary-50 to-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <Shield className="text-primary-500 mr-3" size={24} />
                <h3 className="text-xl font-semibold">Industry-Leading Technology</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Our labs are equipped with the most advanced recovery tools and clean room facilities available,
                enabling us to tackle even the most challenging recovery cases.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="text-primary-500 mr-2 mt-1 flex-shrink-0" size={16} />
                  <span>Class 100 ISO 5 clean room environments</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-primary-500 mr-2 mt-1 flex-shrink-0" size={16} />
                  <span>Proprietary recovery software tools</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-primary-500 mr-2 mt-1 flex-shrink-0" size={16} />
                  <span>Specialized hardware for all device types</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-primary-50 to-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <Clock className="text-primary-500 mr-3" size={24} />
                <h3 className="text-xl font-semibold">Fast & Reliable Service</h3>
              </div>
              <p className="text-gray-700 mb-4">
                We understand the urgency of data recovery situations and offer various service levels to 
                meet your specific timeline and budget requirements.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="text-primary-500 mr-2 mt-1 flex-shrink-0" size={16} />
                  <span>Emergency 24/7 service available</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-primary-500 mr-2 mt-1 flex-shrink-0" size={16} />
                  <span>Free initial diagnosis within 24-48 hours</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-primary-500 mr-2 mt-1 flex-shrink-0" size={16} />
                  <span>Regular status updates throughout the process</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-primary-50 to-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <Award className="text-primary-500 mr-3" size={24} />
                <h3 className="text-xl font-semibold">Unmatched Expertise</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Our recovery engineers have successfully completed thousands of cases across all types of 
                storage devices and failure scenarios.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="text-primary-500 mr-2 mt-1 flex-shrink-0" size={16} />
                  <span>15+ years of specialized experience</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-primary-500 mr-2 mt-1 flex-shrink-0" size={16} />
                  <span>Continuous training on latest technologies</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-primary-500 mr-2 mt-1 flex-shrink-0" size={16} />
                  <span>Manufacturer-specific recovery methods</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-primary-50 to-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <Shield className="text-primary-500 mr-3" size={24} />
                <h3 className="text-xl font-semibold">Secure & Confidential</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Data security and client confidentiality are paramount in everything we do, with 
                strict protocols to protect your sensitive information.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="text-primary-500 mr-2 mt-1 flex-shrink-0" size={16} />
                  <span>End-to-end data encryption</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-primary-500 mr-2 mt-1 flex-shrink-0" size={16} />
                  <span>Secure facility with controlled access</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-primary-500 mr-2 mt-1 flex-shrink-0" size={16} />
                  <span>Strict NDAs and privacy policies</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <div className="bg-primary-50 p-8 md:p-12 rounded-2xl text-center mb-8">
          <h2 className="text-3xl font-display font-bold mb-6">Ready to Recover Your Data?</h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-8">
            Start with a free assessment to determine the best recovery approach for your device.
          </p>
          <div className="flex justify-center">
            <AssessmentButton className="text-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}