import React from 'react';
import { Database } from 'lucide-react';
import { RAIDTypes } from '../../components/raid/RAIDTypes';
import { CommonIssues } from '../../components/raid/CommonIssues';
import { RecoveryProcess } from '../../components/raid/RecoveryProcess';
import { AssessmentButton } from '../../components/AssessmentButton';
import { SectionDivider } from '../../components/SectionDivider';

export function RAIDRecovery() {
  return (
    <div className="container mx-auto px-4 py-12 pt-64">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center space-x-4 mb-8">
          <Database size={40} className="text-blue-600" />
          <h1 className="text-4xl font-bold">RAID & Server Recovery</h1>
        </div>

        <img 
          src="/images/232.jpg" 
          alt="RAID storage array" 
          className="w-full rounded-lg mb-8 object-cover h-96"
        />
        
        <SectionDivider className="my-8" />

        <div className="prose max-w-none">
          <h2 className="text-2xl font-semibold mb-4">Enterprise RAID Data Recovery</h2>
          <p className="mb-6">
            We specialize in recovering data from all types of RAID configurations and server systems. 
            Our team has extensive experience with both hardware and software RAID implementations, 
            including NAS devices and enterprise storage systems.
          </p>

          <RAIDTypes />
          <CommonIssues />
          <RecoveryProcess />

          <div className="bg-blue-50 p-6 rounded-lg mb-8">
            <h3 className="text-xl font-semibold mb-4">Why Choose Our RAID Recovery Service</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Specialized RAID recovery equipment and software</li>
              <li>Clean room facilities for physical repairs</li>
              <li>Experience with all major RAID controllers and configurations</li>
              <li>Secure data handling procedures</li>
              <li>Professional engineering team</li>
              <li>Free initial consultation</li>
            </ul>
          </div>

          <div className="bg-yellow-50 p-6 rounded-lg mb-8">
            <h3 className="text-xl font-semibold mb-4">Important Notice</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Do not attempt to rebuild the array if drives have failed</li>
              <li>Avoid running CHKDSK or other repair utilities</li>
              <li>Keep failed drives powered off to prevent further damage</li>
              <li>Document any error messages or unusual sounds</li>
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