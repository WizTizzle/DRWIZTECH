import React from 'react';
import { Database } from 'lucide-react';
import { AssessmentButton } from '../../components/AssessmentButton';
import { SectionDivider } from '../../components/SectionDivider';

export function SSDRecovery() {
  return (
    <div className="container mx-auto px-4 py-12 pt-64">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center space-x-4 mb-8">
          <Database size={40} className="text-blue-600" />
          <h1 className="text-4xl font-bold">SSD & NVMe Recovery</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="flex flex-col">
            <a href="#sata-ssd" className="group">
              <img 
                src="/images/SSD.jpg"
                alt="SATA SSD"
                className="w-full h-64 rounded-lg object-cover object-top transition-transform group-hover:scale-105"
              />
              <p className="text-center mt-2 text-gray-600 group-hover:text-primary-600">SATA SSD Recovery</p>
            </a>
          </div>
          <div className="flex flex-col">
            <a href="#nvme-ssd" className="group">
              <img 
                src="/images/NVME.jpg"
                alt="M.2 NVMe SSD"
                className="w-full h-64 rounded-lg object-cover transition-transform group-hover:scale-105"
              />
              <p className="text-center mt-2 text-gray-600 group-hover:text-primary-600">M.2 NVMe SSD Recovery</p>
            </a>
          </div>
        </div>

        <SectionDivider className="my-8" />

        <div className="prose max-w-none">
          <h2 className="text-2xl font-semibold mb-4">Professional SSD Recovery Services</h2>
          <p className="mb-6">
            We specialize in recovering data from all types of solid-state drives (SSDs), including SATA SSDs,
            M.2 NVMe drives, and PCIe storage devices. Our advanced recovery techniques and specialized tools
            enable us to handle even the most challenging SSD data loss scenarios.
          </p>

          <div id="sata-ssd" className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Supported SSD Types</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>SATA SSDs (2.5" and 1.8")</li>
                <li>M.2 NVMe/PCIe SSDs</li>
                <li>mSATA SSDs</li>
                <li>PCIe Add-in Card SSDs</li>
                <li>U.2 Enterprise SSDs</li>
                <li>Apple proprietary SSDs</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Common Issues</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Firmware corruption</li>
                <li>Controller failure</li>
                <li>Bad blocks/sectors</li>
                <li>Power surge damage</li>
                <li>Accidental formatting</li>
                <li>File system corruption</li>
              </ul>
            </div>
          </div>

          <h3 id="nvme-ssd" className="text-xl font-semibold mb-4">Our Recovery Process</h3>
          <div className="space-y-4 mb-8">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-semibold mb-2">1. Initial Assessment</h4>
              <p>Comprehensive evaluation of SSD condition and failure type</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-semibold mb-2">2. Recovery Planning</h4>
              <p>Development of custom recovery strategy based on drive condition</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-semibold mb-2">3. Data Extraction</h4>
              <p>Advanced techniques for accessing and retrieving data</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-semibold mb-2">4. Verification</h4>
              <p>Thorough validation of recovered data integrity</p>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg mb-8">
            <h3 className="text-xl font-semibold mb-4">Why Choose Our SSD Recovery Service</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Specialized SSD recovery equipment</li>
              <li>Experience with all major brands</li>
              <li>Clean room facilities</li>
              <li>Advanced firmware repair capabilities</li>
              <li>Competitive success rates</li>
              <li>Secure data handling</li>
            </ul>
          </div>

          <div className="bg-yellow-50 p-6 rounded-lg mb-8">
            <h3 className="text-xl font-semibold mb-4">Important Notice</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Do not attempt to open your SSD</li>
              <li>Avoid using data recovery software on failed SSDs</li>
              <li>Keep the drive powered off to prevent further damage</li>
              <li>Document any error messages or symptoms</li>
              <li>Contact us immediately for professional assistance</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <AssessmentButton />
        </div>
      </div>
    </div>
  );
}