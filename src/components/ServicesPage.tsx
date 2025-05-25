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
import { SectionDivider } from './SectionDivider';
import { AssessmentButton } from './AssessmentButton';

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
      link: '/services/hard-drive'
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
      link: '/services/ssd'
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
      link: '/services/raid'
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
      link: '/services/flash'
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
      link: '/services/server'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16 mt-56">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="text-6xl font-display font-bold text-gray-900 mb-6">
            Our Data Recovery
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-primary-600">
              {" "}Services
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expert data recovery solutions for all storage devices, from personal drives to enterprise systems.
          </p>
        </motion.div>

        <SectionDivider className="mb-16" />

        <motion.div 
          ref={ref}
          className="space-y-16"
        >
          {services.map((service, index) => {
            const Icon = service.Icon;
            
            return (
              <motion.div 
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-10 rounded-2xl border border-gray-100 shadow-lg"
              >
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/3 flex justify-center">
                    <div className="flex items-center justify-center w-24 h-24 bg-primary-100 rounded-xl mb-8">
                      <Icon className="text-primary-600" size={40} />
                    </div>
                  </div>
                  
                  <div className="md:w-2/3">
                    <h2 className="text-3xl font-display font-semibold mb-4 text-gray-900">{service.title}</h2>
                    <p className="text-gray-600 leading-relaxed mb-6">{service.description}</p>
                    
                    <div className="mb-8">
                      <h3 className="font-medium mb-3 text-gray-800">Key Features:</h3>
                      <ul className="space-y-2">
                        {service.features.map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <CheckCircle className="text-primary-500 mr-2 mt-1" size={18} />
                            <span className="text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Link 
                      to={service.link}
                      className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-xl hover:bg-primary-700 transition-colors"
                    >
                      Learn More
                      <svg className="w-5 h-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="mt-20 text-center">
          <h2 className="text-3xl font-display font-bold mb-6">Ready to Recover Your Data?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Start with our free assessment to determine the best recovery approach for your device.
          </p>
          <AssessmentButton className="px-8 py-4 text-lg" />
        </div>
      </div>
    </div>
  );
}