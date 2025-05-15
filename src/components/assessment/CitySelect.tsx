import React from 'react';
import { cities } from '../../data/cities';

interface CitySelectProps {
  country: string;
  state: string;
  value: string;
  onChange: (value: string) => void;
}

export function CitySelect({ country, state, value, onChange }: CitySelectProps) {
  const availableCities = cities[country]?.[state] || [];
  const showCustomInput = !availableCities.includes(value) && value !== '';

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    onChange(selectedValue);
  };

  const handleCustomInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">City *</label>
      {availableCities.length > 0 ? (
        <div className="space-y-2">
          <select
            value={availableCities.includes(value) ? value : ''}
            onChange={handleSelectChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Select City</option>
            {availableCities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
            <option value="other">Other...</option>
          </select>
          
          {(value === 'other' || showCustomInput) && (
            <input
              type="text"
              value={showCustomInput ? value : ''}
              onChange={handleCustomInput}
              placeholder="Enter city name"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          )}
        </div>
      ) : (
        <input
          type="text"
          value={value}
          onChange={handleCustomInput}
          placeholder="Enter city name"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      )}
    </div>
  );
}