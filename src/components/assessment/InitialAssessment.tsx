import React from 'react';

interface InitialAssessmentProps {
  isAccidentalDeletion: boolean;
  onChange: (value: boolean) => void;
}

export function InitialAssessment({ isAccidentalDeletion, onChange }: InitialAssessmentProps) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">
        Please answer the following questions carefully. Your quote may change based on your answers.
      </p>
      <p className="text-sm text-gray-600 italic">
        Questions with a red asterisk (*) are mandatory.
      </p>
      
      <div className="space-y-3">
        <h3 className="font-medium">Do you need to recover files that you accidentally deleted? *</h3>
        <label className="flex items-center space-x-3">
          <input
            type="radio"
            name="accidentalDeletion"
            checked={!isAccidentalDeletion}
            onChange={() => onChange(false)}
            className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
          />
          <span className="text-gray-700">
            NO: I didn't delete files or format my device. I have a different problem.
          </span>
        </label>
        <label className="flex items-center space-x-3">
          <input
            type="radio"
            name="accidentalDeletion"
            checked={isAccidentalDeletion}
            onChange={() => onChange(true)}
            className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
          />
          <span className="text-gray-700">
            YES: My drive is working normally but I accidentally deleted files or formatted my device.
          </span>
        </label>
      </div>
    </div>
  );
}