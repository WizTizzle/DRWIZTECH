import React from 'react';
import { Server } from 'lucide-react';
import { ServerTypes } from '../../components/server/ServerTypes';
import { RecoveryApproach } from '../../components/server/RecoveryApproach';
import { CommonScenarios } from '../../components/server/CommonScenarios';
import { AssessmentButton } from '../../components/AssessmentButton';
import { SectionDivider } from '../../components/SectionDivider';

export function ServerRecovery() {
  return (
    <div className="container mx-auto px-4 py-12 pt-64">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center space-x-4 mb-8">
          <Server size={40} className="text-blue-600" />
          <h1 className="text-4xl font-bold">Server Data Recovery</h1>
        </div>

        <div className="aspect-w-16 aspect-h-9 mb-8">
          <img
            src="/images/2133.jpg"
            alt="Enterprise Server Rack"
            className="w-full h-full rounded-lg object-contain"
            onError={(e) => {
              console.error('Error loading server image');
              // Fallback to SERVER.jpg if 2133.jpg fails
              e.currentTarget.src = '/images/SERVER.jpg';
              
              // Add a second error handler for the fallback
              e.currentTarget.onerror = () => {
                console.error('Error loading fallback server image');
                // If SERVER.jpg also fails, try RAID.jpg as final fallback
                e.currentTarget.src = '/images/RAID.jpg';
              };
            }}
          />
        </div>
        
        <SectionDivider className="my-8" />

        <div className="prose max-w-none">
          <h2 className="text-2xl font-semibold mb-4">Enterprise Server Recovery Solutions</h2>
          <p className="mb-6">
            We provide comprehensive data recovery services for all types of enterprise servers
            and storage systems. Our team of recovery technicians specializes in recovering data
            from complex server environments, including virtualized systems, RAID arrays, and
            enterprise storage platforms.
          </p>

          <ServerTypes />
          <CommonScenarios />
          <RecoveryApproach />

          <div className="bg-blue-50 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-semibold mb-3">Why Choose Our Server Recovery Service</h3>
            <ul className="list-disc pl-6">
              <li>24/7 emergency response for critical systems</li>
              <li>Certified engineers with enterprise experience</li>
              <li>Secure, dedicated recovery facility</li>
              <li>Support for all major server brands</li>
              <li>Advanced recovery tools and techniques</li>
              <li>Secure data handling</li>
            </ul>
          </div>

          <div className="bg-yellow-50 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-semibold mb-3">Important Notice</h3>
            <ul className="list-disc pl-6">
              <li>Do not attempt DIY recovery on failed servers</li>
              <li>Avoid running repair utilities or diagnostics</li>
              <li>Keep failed systems powered off</li>
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