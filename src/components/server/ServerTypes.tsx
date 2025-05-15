import React from 'react';

export function ServerTypes() {
  const serverTypes = [
    {
      type: "Enterprise Servers",
      description: "Dell PowerEdge, HP ProLiant, IBM/Lenovo, Oracle/Sun"
    },
    {
      type: "Storage Systems",
      description: "EMC, NetApp, HP StorageWorks, Dell EqualLogic"
    },
    {
      type: "Virtual Environments",
      description: "VMware, Hyper-V, Citrix"
    },
    {
      type: "Database Servers",
      description: "MS SQL, Oracle, MySQL, PostgreSQL"
    }
  ];

  return (
    <div className="bg-gray-50 p-6 rounded-lg mb-8">
      <h3 className="text-xl font-semibold mb-4">Supported Server Systems</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {serverTypes.map(({ type, description }) => (
          <div key={type} className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-semibold text-blue-600">{type}</h4>
            <p className="text-gray-600">{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}