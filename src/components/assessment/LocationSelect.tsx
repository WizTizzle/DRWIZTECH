import React from 'react';
import { countries, states } from '../../data/locations';

interface LocationSelectProps {
  country: string;
  state: string;
  onCountryChange: (value: string) => void;
  onStateChange: (value: string) => void;
}

export function LocationSelect({ 
  country, 
  state, 
  onCountryChange, 
  onStateChange 
}: LocationSelectProps) {
  const availableStates = states[country] || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Country *</label>
        <select
          value={country}
          onChange={(e) => onCountryChange(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="">Select Country</option>
          {countries.map(({ value, text }) => (
            <option key={value} value={value}>{text}</option>
          ))}
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">State/Province *</label>
        <select
          value={state}
          onChange={(e) => onStateChange(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
          disabled={!country || !availableStates.length}
        >
          <option value="">Select State/Province</option>
          {availableStates.map(({ value, text }) => (
            <option key={value} value={value}>{text}</option>
          ))}
        </select>
      </div>
    </div>
  );
}