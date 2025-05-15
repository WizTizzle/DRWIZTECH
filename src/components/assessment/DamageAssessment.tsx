import React from 'react';

interface DamageAssessmentProps {
  damageType: string;
  onChange: (value: string) => void;
}

export function DamageAssessment({ damageType, onChange }: DamageAssessmentProps) {
  const options = [
    { id: 'yes', label: 'Yes' },
    { id: 'no', label: 'No' },
    { id: 'unknown', label: 'I don\'t know' }
  ];

  return (
    <div className="space-y-4">
      <h3 className="font-medium">Was the device's failure caused by a drop or jolt/impact? *</h3>
      <div className="space-y-3">
        {options.map((option) => (
          <label key={option.id} className="flex items-center space-x-3">
            <input
              type="radio"
              name="damageType"
              value={option.id}
              checked={damageType === option.id}
              onChange={(e) => onChange(e.target.value)}
              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="text-gray-700">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}