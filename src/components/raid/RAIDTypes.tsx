import React from 'react';

export function RAIDTypes() {
  return (
    <div className="bg-gray-50 p-6 rounded-lg mb-8">
      <h3 className="text-xl font-semibold mb-4">RAID Configurations We Support</h3>
      
      <div className="space-y-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h4 className="font-semibold text-blue-600">RAID 0</h4>
          <p className="text-gray-600">Block-level striping without parity or mirroring</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h4 className="font-semibold text-blue-600">RAID 1</h4>
          <p className="text-gray-600">Mirroring without parity or striping</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h4 className="font-semibold text-blue-600">RAID 3</h4>
          <p className="text-gray-600">Byte-level striping with dedicated parity</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h4 className="font-semibold text-blue-600">RAID 4</h4>
          <p className="text-gray-600">Block-level striping with dedicated parity</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h4 className="font-semibold text-blue-600">RAID 5</h4>
          <p className="text-gray-600">Block-level striping with distributed parity</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h4 className="font-semibold text-blue-600">RAID 6</h4>
          <p className="text-gray-600">Reed-Solomon</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h4 className="font-semibold text-blue-600">RAID 10</h4>
          <p className="text-gray-600">Mirroring without parity, and block-level striping</p>
        </div>
      </div>
      
      <div className="mt-6">
        <h4 className="font-semibold mb-3">Additional Support</h4>
        <ul className="list-disc pl-6 space-y-2">
          <li>Hardware RAID controllers</li>
          <li>Software RAID implementations</li>
          <li>NAS and SAN systems</li>
          <li>Virtual RAID configurations</li>
        </ul>
      </div>
    </div>
  );
}