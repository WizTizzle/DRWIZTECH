import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CheckCircle, Lightbulb, Shield, Award, Users, Building } from 'lucide-react';
import { AssessmentButton } from '../components/AssessmentButton';
import { SectionDivider } from '../components/SectionDivider';

export function AboutPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [historyRef, historyInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [teamRef, teamInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [facilitiesRef, facilitiesInView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <div ref={pageRef} className="container mx-auto px-4 py-12 pt-64">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-display font-bold text-gray-900 mb-6">About WizTech</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Industry leaders in professional data recovery with over 15 years of experience
            recovering what matters most.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg mb-12">
          <div className="prose max-w-none">
            <p className="text-lg leading-relaxed">
              Founded in 2008, WizTech Data Recovery has grown from a small computer repair shop 
              into one of the nation's most trusted data recovery specialists. Our mission is simple: 
              to recover your irreplaceable data when others can't.
            </p>
            <p className="text-lg leading-relaxed">
              We understand the critical importance of your data – whether it's family photos, business 
              documents, or essential research. That's why we've invested in cutting-edge technology 
              and assembled a team of dedicated recovery experts who approach each case with care and precision.
            </p>
          </div>
        </div>

        <SectionDivider className="my-12" />

        {/* Our History Section */}
        <motion.div 
          ref={historyRef}
          initial={{ opacity: 0, y: 50 }}
          animate={historyInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-8 flex items-center">
            <Lightbulb className="mr-3 text-primary-500" />
            Our Story
          </h2>

          <div className="relative pl-8 border-l-2 border-primary-300 space-y-12">
            <div className="relative">
              <div className="absolute -left-[41px] w-20 h-20 bg-white rounded-full border-2 border-primary-300 flex items-center justify-center">
                <span className="text-xl font-bold">2008</span>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md ml-6">
                <h3 className="font-semibold text-xl mb-3">Humble Beginnings</h3>
                <p className="text-gray-700">
                  WizTech began as a small computer repair shop in Detroit, with a focus on personal computing solutions.
                  After successfully recovering data from a client's "unrecoverable" drive, founder Michael Chen saw an opportunity
                  to specialize in data recovery.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-[41px] w-20 h-20 bg-white rounded-full border-2 border-primary-300 flex items-center justify-center">
                <span className="text-xl font-bold">2012</span>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md ml-6">
                <h3 className="font-semibold text-xl mb-3">Specialized Expansion</h3>
                <p className="text-gray-700">
                  After establishing a reputation for successful hard drive recoveries, WizTech invested in specialized 
                  equipment and opened its first clean room facility, expanding services to include advanced recovery for
                  all types of storage devices.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-[41px] w-20 h-20 bg-white rounded-full border-2 border-primary-300 flex items-center justify-center">
                <span className="text-xl font-bold">2018</span>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md ml-6">
                <h3 className="font-semibold text-xl mb-3">National Recognition</h3>
                <p className="text-gray-700">
                  WizTech was recognized as one of the top data recovery specialists in the country,
                  serving clients nationwide with a mail-in service and opening our second facility in
                  Chicago to better serve the Midwest.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-[41px] w-20 h-20 bg-white rounded-full border-2 border-primary-500 flex items-center justify-center">
                <span className="text-xl font-bold">2025</span>
              </div>
              <div className="bg-primary-50 p-6 rounded-lg shadow-md ml-6">
                <h3 className="font-semibold text-xl mb-3">Today</h3>
                <p className="text-gray-700">
                  Today, WizTech employs over 30 specialists across three locations, with a track record of over 
                  15,000 successful recoveries. We continue to invest in cutting-edge technology and training
                  to maintain our industry-leading success rates.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <SectionDivider className="my-12" inverted={true} />

        {/* Our Team Section */}
        <motion.div 
          ref={teamRef}
          initial={{ opacity: 0, y: 50 }}
          animate={teamInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-8 flex items-center">
            <Users className="mr-3 text-primary-500" />
            Our Expertise
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-xl mb-4 flex items-center">
                <Shield className="mr-2 text-primary-400" size={20} />
                Certified Engineers
              </h3>
              <p className="text-gray-700 mb-4">
                Our team consists of certified data recovery specialists with backgrounds in:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Computer forensics</li>
                <li>Electrical engineering</li>
                <li>Software development</li>
                <li>Information security</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-xl mb-4 flex items-center">
                <Award className="mr-2 text-primary-400" size={20} />
                Specialized Training
              </h3>
              <p className="text-gray-700 mb-4">
                All recovery technicians undergo rigorous training:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>500+ hours of technical training</li>
                <li>Brand-specific recovery techniques</li>
                <li>Clean room protocols</li>
                <li>Data security procedures</li>
              </ul>
            </div>
          </div>

          <div className="bg-primary-50 p-6 rounded-lg mt-8">
            <h3 className="font-semibold text-xl mb-4 flex items-center">
              <CheckCircle className="mr-2 text-primary-500" size={20} />
              Our Recovery Success Rate
            </h3>
            <p className="text-gray-700">
              We maintain one of the industry's highest success rates, recovering data from devices
              that other companies deem unrecoverable. Our overall success rate exceeds 97% for logical
              failures and 87% for physical failures, placing us among the top recovery specialists nationwide.
            </p>
          </div>
        </motion.div>

        <SectionDivider className="my-12" />

        {/* Facilities Section */}
        <motion.div 
          ref={facilitiesRef}
          initial={{ opacity: 0, y: 50 }}
          animate={facilitiesInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-8 flex items-center">
            <Building className="mr-3 text-primary-500" />
            Our Facilities
          </h2>

          <div className="grid grid-cols-1 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-xl mb-4">State-of-the-Art Recovery Labs</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-700 mb-4">
                    Our recovery facilities feature:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>ISO 5 (Class 100) clean rooms</li>
                    <li>Proprietary recovery systems</li>
                    <li>Advanced diagnostic equipment</li>
                    <li>Firmware repair stations</li>
                    <li>Specialized drive head replacement tools</li>
                    <li>Secure data handling environment</li>
                  </ul>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Our Standards</h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    <li>ISO 9001:2015 certified processes</li>
                    <li>HIPAA compliant</li>
                    <li>FERPA compliant</li>
                    <li>SOC 2 Type II security compliance</li>
                    <li>GDPR compliant</li>
                    <li>PCI DSS compliance</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-8 rounded-lg shadow-sm mt-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="flex-1">
                <h3 className="font-semibold text-xl mb-4">Our Commitment to You</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="text-primary-500 mr-2 mt-0.5 flex-shrink-0" size={20} />
                    <span>No recovery, no fee guarantee on most services</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-primary-500 mr-2 mt-0.5 flex-shrink-0" size={20} />
                    <span>Free initial consultation and diagnosis</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-primary-500 mr-2 mt-0.5 flex-shrink-0" size={20} />
                    <span>Clear, transparent pricing with no hidden fees</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-primary-500 mr-2 mt-0.5 flex-shrink-0" size={20} />
                    <span>Industry-leading data security protocols</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-primary-500 mr-2 mt-0.5 flex-shrink-0" size={20} />
                    <span>Regular case updates throughout the recovery process</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-12 flex justify-center">
          <AssessmentButton />
        </div>
      </div>
    </div>
  );
}