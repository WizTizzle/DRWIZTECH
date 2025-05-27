import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { 
  HardDrive, 
  Database, 
  Server, 
  Usb, 
  CheckCircle
} from 'lucide-react';
import { SectionDivider } from '../components/SectionDivider';
import { AssessmentButton } from '../components/AssessmentButton';
import { SERVICE_PATHS } from '../data/serviceLinks';

export function ServicesPage() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const services = [
    {
      id: 'hard-drive',
      title: 'Hard Drive Recovery',
      description: 'Expert recovery for all types of hard drives, including mechanical failures and logical errors.',
      Icon: HardDrive,
      features: [
        'Recovery from clicking, beeping, or non-spinning drives',
        'Support for all makes and models',
        'PCB repair and head replacement capabilities',
        'External hard drives and enclosures'
      ],
      link: SERVICE_PATHS.hardDrive,
      image: '/images/Western_Digital_WD800_Hard_Disk_A.jpg',
      fallbackImage: '/images/2 ext hdds.jpg'
    },
    {
      id: 'ssd',
      title: 'SSD & NVMe Recovery',
      description: 'Advanced recovery techniques for solid-state drives and NVMe storage.',
      Icon: Database,
      features: [
        'Recovery from firmware corruption',
        'NAND chip-level data extraction',
        'Support for all SSD interfaces',
        'All major brands supported'
      ],
      link: SERVICE_PATHS.ssd,
      image: '/images/SSD.jpg',
      fallbackImage: '/images/NVME.jpg'
    },
    {
      id: 'raid',
      title: 'RAID & NAS Recovery',
      description: 'Enterprise-level recovery services for RAID arrays, NAS systems, and storage servers.',
      Icon: Server,
      features: [
        'All RAID levels supported',
        'NAS device recovery',
        'Virtual RAID reconstruction',
        'Multiple drive failures'
      ],
      link: SERVICE_PATHS.raid,
      image: '/images/RAID.jpg',
      fallbackImage: '/images/SERVER.jpg'
    },
    {
      id: 'flash',
      title: 'Flash & Memory Cards',
      description: 'Recovery of lost or corrupted data from USB drives, SD cards, and other flash storage.',
      Icon: Usb,
      features: [
        'USB flash drives of all types',
        'SD/microSD memory cards',
        'Monolith recovery capabilities',
        'Recovery from formatted devices'
      ],
      link: SERVICE_PATHS.flash,
      image: '/images/FLASH.jpg',
      fallbackImage: '/images/USB.png'
    },
    {
      id: 'server',
      title: 'Server Recovery',
      description: 'Enterprise server recovery solutions for mission-critical data.',
      Icon: Server,
      features: [
        'Enterprise server recovery',
        'Database recovery',
        'Virtual machine recovery',
        'Emergency 24/7 response'
      ],
      link: SERVICE_PATHS.server,
      image: '/images/SERVER.jpg',
      fallbackImage: '/images/2133.jpg'
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
    <div className="container mx-auto px-4 py-12 pt-64">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
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
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="space-y-16 mb-16"
        >
          {services.map((service, index) => {
            const Icon = service.Icon;
            const isEven = index % 2 === 0;
            
            return (
              <motion.div 
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}
              >
                <div className="w-full md:w-2/5">
                  <div className="rounded-2xl overflow-hidden shadow-lg h-64">
                    <img 
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                      style={{ objectPosition: service.id === 'ssd' ? 'center 83%' : 'center' }}
                      onError={(e) => {
                        console.error(`Error loading image for ${service.title}`);
                        if (service.fallbackImage) {
                          e.currentTarget.src = service.fallbackImage;
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
        <div className="mb-16">
          <h2 className="text-4xl font-display font-bold text-center mb-12">
            Our Recovery Process
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recoveryProcess.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
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
        </div>

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