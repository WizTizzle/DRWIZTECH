import React from 'react';

interface DeviceSourceSelectorProps {
  selectedSource: string;
  onChange: (source: string) => void;
}

export function DeviceSourceSelector({ selectedSource, onChange }: DeviceSourceSelectorProps) {
  const sources = [
    { id: 'pc_laptop', label: 'PC/Desktop/Laptop/Notebook' },
    { id: 'external', label: 'External Drive/Enclosure' },
    { id: 'internal', label: 'Bare/Internal Drive' },
    { id: 'raid', label: 'RAID' },
    { id: 'camera', label: 'Camera' },
    { id: 'not_sure', label: 'Not sure' },
    { id: 'other', label: 'Other' }
  ];

  return (
    <div className="space-y-3">
      {sources.map((source) => (
        <label key={source.id} className="flex items-center space-x-3">
          <input
            type="radio"
            name="deviceSource"
            value={source.id}
            checked={selectedSource === source.id}
            onChange={(e) => onChange(e.target.value)}
            className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
          />
          <span className="text-gray-700">{source.label}</span>
        </label>
      ))}
    </div>
  );
}