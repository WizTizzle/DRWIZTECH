import React from 'react';

export function DriveTypes() {
  const supportedDrives = [
    {
      type: "3.5″ Drives",
      description: "Standard desktop computer hard drives as well as external hard drives"
    },
    {
      type: "2.5″ Drives",
      description: "Laptop and portable external drives"
    },
    {
      type: "1.8″ Drives",
      description: "Ultra-portable and specialty drives"
    }
  ];

  const interfaces = [
    "SATA",
    "IDE/PATA",
    "USB 3.0",
    "Proprietary interfaces (WD Passport, etc.)",
    "FireWire",
    "eSATA"
  ];

  return (
    <div className="bg-gray-50 p-6 rounded-lg mb-8">
      <h3 className="text-xl font-semibold mb-4">Comprehensive Drive Support</h3>
      <p className="mb-4 text-gray-700">
        Our advanced recovery tools and expertise allow us to work with any hard drive,
        regardless of make, model, or brand. We specialize in recovering data from all
        types of storage devices, ensuring maximum data recovery potential.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {supportedDrives.map(({ type, description }) => (
          <div key={type} className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-semibold text-blue-600">{type}</h4>
            <p className="text-gray-600">{description}</p>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <h4 className="font-semibold mb-3">Supported Interfaces</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {interfaces.map((interface_) => (
            <div key={interface_} className="bg-white px-4 py-2 rounded-lg shadow-sm text-center">
              {interface_}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}