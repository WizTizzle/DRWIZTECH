import React from 'react';

export function RAIDTypes() {
  const raidConfigurations = [
    {
      type: "RAID 0",
      description: "Block-level striping without parity or mirroring"
    },
    {
      type: "RAID 1",
      description: "Mirroring without parity or striping"
    },
    {
      type: "RAID 3",
      description: "Byte-level striping with dedicated parity"
    },
    {
      type: "RAID 4",
      description: "Block-level striping with dedicated parity"
    },
    {
      type: "RAID 5",
      description: "Block-level striping with distributed parity"
    },
    {
      type: "RAID 6",
      description: "Reed-Solomon"
    },
    {
      type: "RAID 10",
      description: "Mirroring without parity, and block-level striping"
    }
  ];

  return (
    <div className="bg-gray-50 p-6 rounded-lg mb-8">
      <h3 className="text-xl font-semibold mb-4">Why Choose Our RAID Recovery Service</h3>
      <ul className="list-disc pl-6">
        <li>Specialized RAID recovery equipment and software</li>
        <li>Clean room facilities for physical repairs</li>
        <li>Experience with all major RAID controllers and configurations</li>
        <li>Secure data handling procedures</li>
        <li>Professional engineering team</li>
        <li>Free initial consultation</li>
      </ul>
    </div>
  );
}