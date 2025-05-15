import React from 'react';

export function CommonScenarios() {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4">Common Server Recovery Scenarios</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-3">Hardware Issues</h4>
          <ul className="list-disc pl-5 space-y-2">
            <li>RAID controller failures</li>
            <li>Multiple drive failures</li>
            <li>Server hardware malfunctions</li>
            <li>Storage system failures</li>
            <li>Firmware corruption</li>
          </ul>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-3">Software/Data Issues</h4>
          <ul className="list-disc pl-5 space-y-2">
            <li>Database corruption</li>
            <li>Operating system failures</li>
            <li>Virtualization problems</li>
            <li>Deleted/corrupted files</li>
            <li>Ransomware attacks</li>
          </ul>
        </div>
      </div>
    </div>
  );
}