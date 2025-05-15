import React from 'react';

interface CompanyInfoSectionProps {
  companyName: string;
  diagnosis: string;
  onCompanyNameChange: (value: string) => void;
  onDiagnosisChange: (value: string) => void;
}

export function CompanyInfoSection({
  companyName,
  diagnosis,
  onCompanyNameChange,
  onDiagnosisChange
}: CompanyInfoSectionProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block font-medium mb-2">
          What is the name of the company? *
        </label>
        <input
          type="text"
          value={companyName}
          onChange={(e) => onCompanyNameChange(e.target.value)}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      
      <div>
        <label className="block font-medium mb-2">
          What was the company's diagnosis (please copy/paste if they e-mailed it to you)? *
        </label>
        <textarea
          value={diagnosis}
          onChange={(e) => onDiagnosisChange(e.target.value)}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={4}
        />
      </div>
    </div>
  );
}