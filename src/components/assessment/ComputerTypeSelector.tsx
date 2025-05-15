import React from 'react';

interface ComputerTypeSelectorProps {
  selectedType: string;
  onChange: (type: string) => void;
}

export function ComputerTypeSelector({ selectedType, onChange }: ComputerTypeSelectorProps) {
  const computerTypes = [
    { id: 'mac', label: 'Mac' },
    { id: 'pc', label: 'PC' },
    { id: 'pc_mac', label: 'PC & Mac' },
    { id: 'linux', label: 'Linux' },
    { id: 'nas', label: 'NAS (ethernet drive)' },
    { id: 'not_sure', label: 'Not Sure' },
    { id: 'explain', label: 'Let me explain...' }
  ];

  return (
    <div className="space-y-3">
      <h3 className="font-medium">What kind of computer was the device connected to?</h3>
      {computerTypes.map((type) => (
        <label key={type.id} className="flex items-center space-x-3">
          <input
            type="radio"
            name="computerType"
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