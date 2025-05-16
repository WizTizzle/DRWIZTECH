import React from 'react';
import { Usb } from 'lucide-react';
import { AssessmentButton } from '../../components/AssessmentButton';
import { SectionDivider } from '../../components/SectionDivider';

export function FlashRecovery() {
  return (
    <div className="container mx-auto px-4 py-12 pt-64">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center space-x-4 mb-8">
          <Usb size={40} className="text-blue-600" />
          <h1 className="text-4xl font-bold">Flash Drive & Memory Card Recovery</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <img
            src="/images/FLASH.jpg"
            alt="Flash drive recovery"
            className="w-full rounded-lg object-cover h-96 object-top"
          />
          <img
            src="/images/USB.png"
            alt="USB drive recovery"
            className="w-full rounded-lg object-cover h-96"
          />
        </div>
        
        <SectionDivider className="my-8" />

        <div className="prose max-w-none">
          <h2 className="text-2xl font-semibold mb-4">Flash Storage Recovery Solutions</h2>
          <p className="mb-4">
            Expert recovery services for all types of flash storage devices:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>USB flash drives</li>
            <li>SD/microSD cards</li>
            <li>CompactFlash cards</li>
            <li>Memory Stick formats</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3">Common Flash Storage Issues</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Physical Problems</h4>
              <ul className="list-disc pl-4">
                <li>Broken connectors</li>
                <li>Water damage</li>
                <li>Circuit damage</li>
                <li>Chip separation</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Logical Issues</h4>
              <ul className="list-disc pl-4">
                <li>Format errors</li>
                <li>Corrupted files</li>
                <li>Accidental deletion</li>
                <li>RAW file system</li>
              </ul>
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-3">Recovery Process</h3>
          <ol className="list-decimal pl-6 mb-6">
            <li className="mb-2">Initial device assessment</li>
            <li className="mb-2">Chip-level diagnosis</li>
            <li className="mb-2">Data extraction</li>
            <li className="mb-2">File system reconstruction</li>
            <li>Data verification</li>
          </ol>

          <div className="bg-blue-50 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-semibold mb-3">Why Choose Our Flash Recovery Service</h3>
            <ul className="list-disc pl-6">
              <li>Specialized flash memory tools</li>
              <li>Chip-off recovery capability</li>
              <li>All major brands supported</li>
              <li>Fast turnaround options</li>
              <li>Competitive pricing</li>
            </ul>
          </div>
        </div>

        <div className="bg-yellow-50 p-6 rounded-lg mb-8">
          <h3 className="text-xl font-semibold mb-4">Important Notice</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Do not attempt to open or repair flash devices yourself</li>
            <li>Avoid using data recovery software on failed devices</li>
            <li>Keep the device powered off if it's making unusual sounds</li>
            <li>Do not expose damaged devices to extreme temperatures</li>
            <li>Contact us immediately for professional assistance</li>
          </ul>
        </div>

        <div className="mt-8 flex justify-center">
          <AssessmentButton />
        </div>
      </div>
    </div>
  );
}