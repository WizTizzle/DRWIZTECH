import React from 'react';
import { deviceTypes } from '../../data/assessmentData';

interface DeviceSelectorProps {
  selectedDevice: string;
  onSelect: (deviceId: string) => void;
}

export function DeviceSelector({ selectedDevice, onSelect }: DeviceSelectorProps) {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4">Select Your Device Type</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {deviceTypes.map((device) => (
          <button
            key={device.id}
            onClick={() => onSelect(device.id)}
            className={`p-4 rounded-lg border-2 transition-colors ${
              selectedDevice === device.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            {device.name}
          </button>
        ))}
      </div>
    </div>
  );
}