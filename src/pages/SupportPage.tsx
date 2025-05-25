import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionDivider } from '../components/SectionDivider';
import { Mail, Phone, MessageCircle, HelpCircle, FileText, Video, Clock } from 'lucide-react';

export function SupportPage() {
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

  const faqs = [
    {
      question: "How long does data recovery typically take?",
      answer: "Recovery time varies based on the type of device and extent of damage. Standard recoveries take 2-5 business days, while complex cases may require 5-10 business days. Emergency service with 24-48 hour turnaround is available at an additional cost."
    },
    {
      question: "What are your success rates for data recovery?",
      answer: "Our overall success rate is 97% across all types of data recovery scenarios. This varies by device type and damage extent, with logical recoveries having higher success rates than severe physical damage cases."
    },
    {
      question: "How much does data recovery cost?",
      answer: "Our recovery services start at $299 for logical issues on standard drives. Complex physical recoveries typically range from $500-$1,500 depending on device type, capacity, and damage extent. We provide a detailed quote after initial diagnostics with no obligation."
    },
    {
      question: "Is my data kept confidential during the recovery process?",
      answer: "Absolutely. We maintain strict confidentiality protocols for all client data. Our technicians sign NDAs, all recovered data is encrypted, and our facility has 24/7 security monitoring. We can provide signed confidentiality agreements upon request."
    },
    {
      question: "What if you can't recover my data?",
      answer: "If we cannot recover your data, you pay nothing for our recovery attempt. We operate on a 'no data, no fee' policy for most standard recovery cases."
    },
    {
      question: "Do you offer international services?",
      answer: "Yes, we offer international mail-in services with secure shipping options. We've successfully completed recoveries for clients in over 60 countries worldwide."
    }
  ];

  return (
    <div ref={pageRef} className="container mx-auto px-4 py-12 pt-64">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="space-y-12"
        >
          <motion.div variants={itemVariants} className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl font-display font-bold text-gray-900 mb-6">
              Customer <span className="text-primary-600">Support</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get the help you need with your data recovery questions and cases.
            </p>
          </motion.div>

          <SectionDivider className="my-12" />

          {/* Contact Options */}
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-bold mb-8 text-center">Get In Touch</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="text-primary-600 w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Call Us</h3>
                <p className="text-gray-600 mb-4">Speak directly with a recovery specialist</p>
                <a href="tel:+12484038665" className="text-primary-600 font-medium">(248) 403-8665</a>
                <p className="text-sm text-gray-500 mt-2">
                  Mon-Fri: 9AM - 6PM ET<br />
                  Sat: 10AM - 4PM ET
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="text-primary-600 w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Email Us</h3>
                <p className="text-gray-600 mb-4">Send us your questions anytime</p>
                <a href="mailto:support@wiztechrecovery.com" className="text-primary-600 font-medium">
                  support@wiztechrecovery.com
                </a>
                <p className="text-sm text-gray-500 mt-2">
                  24-hour response time<br />
                  7 days a week
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="text-primary-600 w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Live Chat</h3>
                <p className="text-gray-600 mb-4">Chat with our support team in real-time</p>
                <button className="text-primary-600 font-medium">Start Chat</button>
                <p className="text-sm text-gray-500 mt-2">
                  Available Mon-Fri<br />
                  9AM - 5PM ET
                </p>
              </div>
            </div>
          </motion.div>

          {/* Support Resources */}
          <motion.div variants={itemVariants} className="bg-gray-50 p-8 rounded-xl">
            <h2 className="text-3xl font-bold mb-8 text-center">Support Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
                <FileText className="text-primary-600 w-10 h-10 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Knowledge Base</h3>
                <p className="text-gray-600 text-sm mb-3">Detailed articles and guides on data recovery topics</p>
                <a href="#" className="text-primary-600 text-sm font-medium">Browse Articles</a>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
                <HelpCircle className="text-primary-600 w-10 h-10 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">FAQs</h3>
                <p className="text-gray-600 text-sm mb-3">Answers to commonly asked questions</p>
                <a href="#" className="text-primary-600 text-sm font-medium">View FAQs</a>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
                <Video className="text-primary-600 w-10 h-10 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Video Tutorials</h3>
                <p className="text-gray-600 text-sm mb-3">Visual guides for data protection best practices</p>
                <a href="#" className="text-primary-600 text-sm font-medium">Watch Videos</a>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
                <Clock className="text-primary-600 w-10 h-10 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Case Status</h3>
                <p className="text-gray-600 text-sm mb-3">Check the status of your active recovery case</p>
                <a href="#" className="text-primary-600 text-sm font-medium">Track Case</a>
              </div>
            </div>
          </motion.div>

          {/* FAQs */}
          <motion.div variants={itemVariants} className="space-y-8">
            <h2 className="text-3xl font-bold text-center">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants} className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Send Us a Message</h2>
            <form className="max-w-2xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                ></textarea>
              </div>

              <div className="text-center">
                <button 
                  type="submit"
                  className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Send Message
                </button>
              </div>
            </form>
          </motion.div>

          {/* Emergency Service */}
          <motion.div variants={itemVariants} className="bg-red-50 p-8 rounded-lg border border-red-100">
            <div className="flex flex-col md:flex-row items-center">
              <div className="mb-4 md:mb-0 md:mr-6 flex-shrink-0">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <Phone className="text-red-600 w-8 h-8" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-red-800 mb-2">Emergency Recovery Service</h3>
                <p className="text-gray-700 mb-4">
                  For urgent cases requiring immediate attention, our emergency service is available 24/7/365. 
                  Additional fees apply for after-hours service.
                </p>
                <a 
                  href="tel:+12484038665" 
                  className="inline-block px-5 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                >
                  Call Emergency Line: (248) 403-8665
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}