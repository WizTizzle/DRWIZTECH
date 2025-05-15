import React from 'react';
import type { CheckboxOption } from '../../types/assessment';

interface CheckboxGroupProps {
  options: CheckboxOption[];
  selectedOptions: string[];
  onChange: (optionId: string) => void;
}

export function CheckboxGroup({ options, selectedOptions, onChange }: CheckboxGroupProps) {
  return (
    <div className="space-y-3">
      {options.map((option) => (
        <label
          key={option.id}
          className="flex items-start space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer"
        >
          <input
            type="checkbox"
            checked={selectedOptions.includes(option.id)}
            onChange={() => onChange(option.id)}
            className="mt-1 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
          />
          <span className="text-gray-700">{option.label}</span>
        </label>
      ))}
    </div>
  );
}