import React from 'react';

interface ModelNumberSectionProps {
  hasModelNumber: boolean;
  modelNumber: string;
  onHasModelNumberChange: (value: boolean) => void;
  onModelNumberChange: (value: string) => void;
}

export function ModelNumberSection({
  hasModelNumber,
  modelNumber,
  onHasModelNumberChange,
  onModelNumberChange
}: ModelNumberSectionProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-medium mb-2">Device Model Number</h3>
        <p className="text-sm text-gray-600 mb-4">
          Finding the model number for these kind of devices isn't always possible. If there is
          no label or model number on the device, select "No" and you'll be prompted to upload photos instead.
        </p>
      </div>

      <div className="space-y-3">
        <label className="flex items-center space-x-3">
          <input
            type="radio"
            name="hasModelNumber"
            checked={hasModelNumber}
            onChange={() => onHasModelNumberChange(true)}
            className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
          />
          <span>Yes</span>
        </label>
        <label className="flex items-center space-x-3">
          <input
            type="radio"
            name="hasModelNumber"
            checked={!hasModelNumber}
            onChange={() => onHasModelNumberChange(false)}
            className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
          />
          <span>No</span>
        </label>
      </div>

      {hasModelNumber && (
        <div>
          <input
            type="text"
            value={modelNumber}
            onChange={(e) => onModelNumberChange(e.target.value)}
            placeholder="ex. ST31000340AS, WD1600JS-41MVB"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      )}
    </div>
  );
}