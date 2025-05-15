import React from 'react';

interface DeviceTypeSelectorProps {
  selectedType: string;
  onChange: (type: string) => void;
}

export function DeviceTypeSelector({ selectedType, onChange }: DeviceTypeSelectorProps) {
  const deviceTypes = [
    { id: 'external_drive', label: 'External Drive' },
    { id: 'hard_drive', label: 'Hard Drive' },
    { id: 'ssd', label: 'Solid-State Drive (SSD)' },
    { id: 'flash_drive', label: 'Flash/Thumb Drive' },
    { id: 'sd_card', label: 'SD/Micro SD Card' },
    { id: 'cf_card', label: 'CF/CFast/XQD Card' },
    { id: 'laptop', label: 'Laptop or tablet without a removable storage device' },
    { id: 'raid', label: 'RAID Array' },
    { id: 'not_sure', label: 'Not Sure' },
    { id: 'other', label: 'Other' }
  ];

  return (
    <div className="space-y-3">
      {deviceTypes.map((type) => (
        <label key={type.id} className="flex items-center space-x-3">
          <input
            type="radio"
            name="deviceType"
            value={type.id}
            checked={selectedType === type.id}
            onChange={(e) => onChange(e.target.value)}
            className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
          />
          <span className="text-gray-700">{type.label}</span>
        </label>
      ))}
    </div>
  );
}