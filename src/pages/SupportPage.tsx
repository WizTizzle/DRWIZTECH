import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  MessageSquare, 
  Phone, 
  Mail, 
  MapPin, 
  HelpCircle, 
  ChevronDown, 
  ChevronRight,
  Truck,
  Clock,
  Shield,
  Package
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SectionDivider } from '../components/SectionDivider';
import { AssessmentButton } from '../components/AssessmentButton';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQs: FAQItem[] = [
  {
    question: "How do I know if my device needs professional recovery?",
    answer: "Consider professional recovery if your device: won't power on or be recognized by your computer, makes unusual sounds (clicking, grinding), shows as RAW format, can't access important files, or if DIY recovery software hasn't worked. Our free assessment can help determine if professional recovery is needed."
  },
  {
    question: "How much does data recovery cost?",
    answer: "Recovery costs depend on the device type, failure severity, and required service level. We offer transparent pricing with no hidden fees. A standard hard drive recovery typically ranges from $300-$900, while more complex RAID recovery may be $600-$2000+. We provide a free evaluation and fixed quote before proceeding."
  },
  {
    question: "How long does data recovery take?",
    answer: "Recovery timelines vary based on the device type, damage extent, and service level selected. Standard services typically take 5-10 business days, while emergency services can be completed in 1-3 days. We'll provide a specific timeline estimate after initial diagnosis."
  },
  {
    question: "What's your success rate for data recovery?",
    answer: "Our overall success rate exceeds 97% for logical failures (software-related issues) and 87% for physical failures (hardware damage). We're often able to recover data from devices that other services have deemed unrecoverable due to our specialized equipment and expertise."
  },
  {
    question: "How do I send my device to you?",
    answer: "After completing our online assessment, you'll receive detailed shipping instructions and a prepaid shipping label if you're in the US. For international customers, we provide secure shipping guidelines. All devices should be well-packaged in anti-static materials within a sturdy box with adequate cushioning."
  },
  {
    question: "Is my data secure during the recovery process?",
    answer: "Absolutely. We maintain strict security protocols including: secure facility with controlled access, employee background checks, strict confidentiality agreements, data encryption during transfer, and secure deletion of temporary copies after recovery completion. We comply with HIPAA, GDPR, and other data protection regulations."
  },
  {
    question: "What if you can't recover my data?",
    answer: "If we cannot recover any data, there's no fee for our service (excluding diagnostic fees for some specialized devices). If we achieve partial recovery, we'll discuss options with you before proceeding. We always aim to be transparent about what can and cannot be recovered."
  },
  {
    question: "Do you offer emergency services?",
    answer: "Yes, we offer emergency/expedited services for time-critical situations. Our emergency service includes priority handling, 24/7 work on your case, and completion in 1-3 days in most cases. Contact our emergency hotline at (555) 123-4567 for immediate assistance."
  }
];

export function SupportPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [headerRef, headerInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [faqRef, faqInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [contactRef, contactInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [expandedFAQs, setExpandedFAQs] = useState<Record<number, boolean>>({});

  const toggleFAQ = (index: number) => {
    setExpandedFAQs(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const shippingSteps = [
    {
      icon: Package,
      title: "Prepare Your Device",
      description: "Carefully package your device in anti-static material and secure it in a sturdy box with adequate padding."
    },
    {
      icon: Truck,
      title: "Ship to Our Facility",
      description: "Use our prepaid shipping label or follow our international shipping guidelines to send your device securely."
    },
    {
      icon: Clock,
      title: "Track Progress",
      description: "Monitor your case status through our online portal and receive regular email updates throughout the process."
    },
    {
      icon: Shield,
      title: "Secure Data Return",
      description: "Once recovered, your data is returned via encrypted hard drive or secure cloud transfer, according to your preference."
    }
  ];

  return (
    <div ref={pageRef} className="container mx-auto px-4 py-12 pt-64">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <motion.div 
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-display font-bold text-gray-900 mb-6">
            Support & Resources
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to know about our data recovery process, shipping instructions,
            and how to get help with your recovery case.
          </p>
        </motion.div>

        {/* Quick Help Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-gradient-to-br from-primary-50 to-white p-6 rounded-xl shadow-md text-center flex flex-col items-center">
            <Link to="/assessment" className="block">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <MessageSquare className="text-primary-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Start Assessment</h3>
              <p className="text-gray-600">
                Begin our free data recovery assessment to understand your options
              </p>
            </Link>
          </div>
          
          <div className="bg-gradient-to-br from-primary-50 to-white p-6 rounded-xl shadow-md text-center flex flex-col items-center">
            <a href="tel:+15551234567" className="block">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <Phone className="text-primary-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Call Us</h3>
              <p className="text-gray-600">
                Speak directly with a recovery specialist
              </p>
              <p className="font-medium text-primary-600 mt-2">
                (555) 123-4567
              </p>
            </a>
          </div>
          
          <div className="bg-gradient-to-br from-primary-50 to-white p-6 rounded-xl shadow-md text-center flex flex-col items-center">
            <a href="mailto:support@wiztechrecovery.com" className="block">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <Mail className="text-primary-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Email Support</h3>
              <p className="text-gray-600">
                Get help or check on your case status
              </p>
              <p className="font-medium text-primary-600 mt-2">
                support@wiztechrecovery.com
              </p>
            </a>
          </div>
        </div>

        <SectionDivider className="my-16" />

        {/* Shipping Instructions */}
        <div className="mb-16">
          <h2 className="text-3xl font-display font-bold mb-8 text-center">
            Shipping Instructions
          </h2>
          
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-md mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {shippingSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="text-center flex flex-col items-center">
                    <div className="relative">
                      <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                        <Icon className="text-primary-600" size={24} />
                      </div>
                      {index < shippingSteps.length - 1 && (
                        <div className="hidden md:block absolute top-8 w-full h-0.5 bg-gray-200 left-full -ml-2" />
                      )}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="bg-yellow-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <HelpCircle className="text-yellow-500 mr-2" size={20} />
              Important Shipping Guidelines
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Never attempt to open your storage device before shipping</li>
              <li>Use anti-static bags or aluminum foil to wrap hard drives</li>
              <li>Securely package with at least 2" of cushioning on all sides</li>
              <li>Avoid using newspaper or packing peanuts that create static</li>
              <li>Include a copy of your case number on a separate piece of paper</li>
              <li>For international shipments, mark as "Temporary Import for Repair" to avoid customs fees</li>
            </ul>
            
            <div className="mt-6">
              <Link to="/shipping-labels" className="text-primary-600 font-medium flex items-center hover:text-primary-700 transition-colors">
                <span>Download Shipping Label</span>
                <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <motion.div 
          ref={faqRef}
          initial={{ opacity: 0, y: 50 }}
          animate={faqInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-display font-bold mb-8 text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-4">
            {FAQs.map((faq, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={faqInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <h3 className="text-lg font-semibold pr-8">{faq.question}</h3>
                  <div className="flex-shrink-0">
                    {expandedFAQs[index] ? (
                      <ChevronDown className="text-primary-600" size={20} />
                    ) : (
                      <ChevronRight className="text-primary-600" size={20} />
                    )}
                  </div>
                </button>
                <div 
                  className={`px-6 overflow-hidden transition-all duration-300 ${
                    expandedFAQs[index] ? 'max-h-96 pb-6' : 'max-h-0'
                  }`}
                >
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              Can't find the answer you're looking for?
            </p>
            <Link 
              to="/contact"
              className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </motion.div>

        <SectionDivider className="my-16" inverted={true} />

        {/* Contact Section */}
        <motion.div 
          ref={contactRef}
          initial={{ opacity: 0, y: 50 }}
          animate={contactInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-display font-bold mb-8 text-center">
            Contact Us
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-6">Our Locations</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold flex items-center mb-2">
                    <MapPin size={18} className="text-primary-600 mr-2" />
                    Detroit Headquarters
                  </h4>
                  <p className="text-gray-700">
                    123 Recovery Lane<br />
                    Detroit, MI 48201
                  </p>
                  <p className="text-gray-700 mt-1">
                    (555) 123-4567
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold flex items-center mb-2">
                    <MapPin size={18} className="text-primary-600 mr-2" />
                    Chicago Lab
                  </h4>
                  <p className="text-gray-700">
                    456 Data Street<br />
                    Chicago, IL 60601
                  </p>
                  <p className="text-gray-700 mt-1">
                    (555) 765-4321
                  </p>
                </div>
                
                <div className="pt-4 border-t border-gray-100">
                  <h4 className="font-semibold mb-2">Hours of Operation</h4>
                  <ul className="text-gray-700 space-y-1">
                    <li>Monday - Friday: 9AM - 6PM</li>
                    <li>Saturday: 10AM - 4PM</li>
                    <li>Sunday: Closed</li>
                  </ul>
                  <p className="mt-2 text-sm text-primary-600 font-medium">
                    24/7 Emergency Service Available
                  </p>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-3 bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-6">Send Us a Message</h3>
              
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <select className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                    <option value="">Select a subject</option>
                    <option value="case_status">Case Status Update</option>
                    <option value="new_recovery">New Recovery Inquiry</option>
                    <option value="shipping">Shipping Instructions</option>
                    <option value="billing">Billing Question</option>
                    <option value="technical">Technical Support</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <div className="bg-primary-50 p-8 md:p-12 rounded-2xl text-center mb-8">
          <h2 className="text-3xl font-display font-bold mb-6">Need Data Recovery Help?</h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-8">
            Start with our free assessment to determine the best recovery approach for your device.
          </p>
          <div className="flex justify-center">
            <AssessmentButton className="text-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}