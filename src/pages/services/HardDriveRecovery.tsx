import React from 'react';
import { HardDrive } from 'lucide-react';
import { DriveTypes } from '../../components/harddrive/DriveTypes';
import { AssessmentButton } from '../../components/AssessmentButton';
import { SectionDivider } from '../../components/SectionDivider';

export function HardDriveRecovery() {
  return (
    <div className="container mx-auto px-4 py-12 pt-64">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center space-x-4 mb-8">
          <HardDrive size={40} className="text-primary-600" />
          <h1 className="text-4xl font-bold">Hard Drive Recovery</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <img
            src="/images/close-up-hdd-device-studio-top-view.jpg"
            alt="Close up view of hard drive internals"
            className="w-full rounded-lg object-cover h-64"
          />
          <img
            src="/images/high-angle-hard-drive-components.jpg"
            alt="Hard drive components arranged"
            className="w-full rounded-lg object-cover h-64"
          />
        </div>

        <SectionDivider className="my-8" />

        <div className="prose max-w-none">
          <h2 className="text-2xl font-semibold mb-4">Professional Hard Drive Recovery Services</h2>
          <p className="mb-6">
            Using state-of-the-art recovery tools and clean room facilities, we specialize in retrieving data
            from both external and internal hard drives. Our comprehensive approach ensures we can recover
            data from any make, model, or interface type - whether the issue is logical or physical.
          </p>

          <DriveTypes />

          <SectionDivider className="my-8" />

          <div className="bg-yellow-50 p-6 rounded-lg mb-8">
            <h3 className="text-xl font-semibold mb-4">Important Notice</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Do not attempt to open your hard drive</li>
              <li>Avoid using data recovery software on failed drives</li>
              <li>Keep the drive powered off to prevent further damage</li>
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