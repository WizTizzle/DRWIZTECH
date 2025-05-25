import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionDivider } from '../components/SectionDivider';
import { Users, Award, Building, Clock, Map, Globe } from 'lucide-react';

export function AboutPage() {
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

  const stats = [
    { label: 'Years Experience', value: '20+' },
    { label: 'Success Rate', value: '97%' },
    { label: 'Global Clients', value: '30k+' },
    { label: 'Recovery Tools', value: '50+' }
  ];

  const values = [
    { 
      icon: <Award className="text-primary-600 w-10 h-10" />,
      title: 'Excellence',
      description: 'We maintain the highest standards in data recovery procedures and customer service.'
    },
    { 
      icon: <Users className="text-primary-600 w-10 h-10" />,
      title: 'Customer Focus',
      description: 'Every case is treated with personalized attention to meet specific client needs.'
    },
    { 
      icon: <Clock className="text-primary-600 w-10 h-10" />,
      title: 'Timeliness',
      description: 'We understand the urgency of data loss and work efficiently to minimize downtime.'
    },
    { 
      icon: <Globe className="text-primary-600 w-10 h-10" />,
      title: 'Global Reach',
      description: 'Our international services provide recovery solutions worldwide with secure shipping options.'
    }
  ];

  return (
    <div ref={pageRef} className="container mx-auto px-4 py-12 pt-64">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="space-y-16"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-display font-bold text-gray-900 mb-6">
              About <span className="text-primary-600">WizTech</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The industry leader in professional data recovery services since 2005, committed to recovering what matters most to you.
            </p>
          </motion.div>

          <SectionDivider className="my-12" />

          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-display font-bold mb-6 text-gray-900">Our Story</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  WizTech Data Recovery was founded in 2005 by a team of engineers passionate about helping people recover their irreplaceable digital memories and critical business data.
                </p>
                <p>
                  What started as a small lab serving local clients has grown into an internationally recognized data recovery service with state-of-the-art facilities and proprietary recovery technologies.
                </p>
                <p>
                  Today, we're proud to be trusted by individuals, small businesses, and Fortune 500 companies alike, with a consistent 97% success rate across all types of data recovery scenarios.
                </p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="WizTech team at work" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-gray-50 p-8 rounded-xl">
            <h2 className="text-3xl font-display font-bold mb-8 text-center text-gray-900">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <div key={index} className="flex space-x-4">
                  <div className="mt-1">{value.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-4xl font-bold text-primary-600 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-8">
            <h2 className="text-3xl font-display font-bold text-center text-gray-900">Our Facilities</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <h3 className="text-2xl font-semibold mb-4 flex items-center">
                  <Building className="w-6 h-6 text-primary-600 mr-2" />
                  State-of-the-Art Recovery Lab
                </h3>
                <div className="space-y-4 text-gray-700">
                  <p>
                    Our main recovery facility features ISO-certified clean rooms, advanced diagnostics equipment, and proprietary recovery systems developed by our engineering team.
                  </p>
                  <p>
                    We've invested millions in specialized tools that allow us to recover data from even the most severely damaged storage devices, including custom-built hardware for rare or obsolete systems.
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Class 100 clean room facilities</li>
                    <li>Proprietary diagnostic equipment</li>
                    <li>Custom-built recovery tools</li>
                    <li>Secure data handling environment</li>
                  </ul>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden shadow-xl order-1 md:order-2">
                <img 
                  src="https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="WizTech clean room facility" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-primary-50 p-8 rounded-xl">
            <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6">
              <div className="flex-shrink-0">
                <Map className="w-16 h-16 text-primary-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4">Global Service</h2>
                <p className="text-gray-700 mb-4">
                  With secure mail-in service available worldwide and partner facilities in major cities across North America, Europe, and Asia, we can help recover your data no matter where you're located.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center text-sm">
                  <div className="bg-white p-2 rounded">North America</div>
                  <div className="bg-white p-2 rounded">Europe</div>
                  <div className="bg-white p-2 rounded">Asia</div>
                  <div className="bg-white p-2 rounded">Australia</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-3xl font-display font-bold mb-6 text-gray-900">Ready to Recover Your Data?</h2>
            <button className="px-8 py-4 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors">
              Start Assessment
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}