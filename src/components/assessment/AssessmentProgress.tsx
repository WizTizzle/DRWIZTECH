import React from 'react';

interface AssessmentProgressProps {
  currentStep: number;
  totalSteps: number;
}

export function AssessmentProgress({ currentStep, totalSteps }: AssessmentProgressProps) {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <div className="text-sm text-gray-600">
          Step {currentStep + 1} of {totalSteps}
        </div>
      </div>
      <div className="w-full bg-gray-200 h-2 rounded-full">
        <div
          className="bg-primary-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}