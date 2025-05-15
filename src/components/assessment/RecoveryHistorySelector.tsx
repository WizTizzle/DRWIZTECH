import React from 'react';

interface RecoveryHistorySelectorProps {
  selectedHistory: string;
  onChange: (history: string) => void;
}

export function RecoveryHistorySelector({ selectedHistory, onChange }: RecoveryHistorySelectorProps) {
  const options = [
    { id: 'repair_company', label: 'Yes - computer repair company' },
    { id: 'recovery_company', label: 'Yes - data recovery company' },
    { id: 'both', label: 'Both - computer repair & data recovery companies' },
    { id: 'no', label: 'No' }
  ];

  return (
    <div className="space-y-3">
      {options.map((option) => (
        <label key={option.id} className="flex items-center space-x-3">
          <input
            type="radio"
            name="recoveryHistory"
            value={option.id}
            checked={selectedHistory === option.id}
            onChange={(e) => onChange(e.target.value)}
            className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
          />
          <span className="text-gray-700">{option.label}</span>
        </label>
      ))}
    </div>
  );
}