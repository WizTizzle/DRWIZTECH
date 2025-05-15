import React from 'react';

export function RecoveryProcess() {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4">Our RAID Recovery Process</h3>
      <div className="space-y-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h4 className="font-semibold mb-2">1. Initial Assessment</h4>
          <p>Thorough evaluation of the RAID system, including hardware inspection and configuration analysis.</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h4 className="font-semibold mb-2">2. Data Protection</h4>
          <p>Creation of sector-by-sector copies of all drives to prevent further damage to original media.</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h4 className="font-semibold mb-2">3. RAID Analysis</h4>
          <p>Determination of RAID parameters, including stripe size, parity rotation, and disk order.</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h4 className="font-semibold mb-2">4. Array Reconstruction</h4>
          <p>Virtual rebuilding of the array using specialized software and custom techniques.</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h4 className="font-semibold mb-2">5. Data Recovery</h4>
          <p>Extraction and verification of recovered data, ensuring file integrity.</p>
        </div>
      </div>
    </div>
  );
}