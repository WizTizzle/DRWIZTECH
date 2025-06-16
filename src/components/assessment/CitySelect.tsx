import React from 'react';

interface CitySelectProps {
  country: string;
  state: string;
  value: string;
  onChange: (value: string) => void;
}

export function CitySelect({ country, state, value, onChange }: CitySelectProps) {
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">City *</label>
      <input
        type="text"
        value={value}
        onChange={handleInput}
        placeholder="Enter city name"
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        required
      />
    </div>
  );
}