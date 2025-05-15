import React from 'react';
import { AssessmentForm } from './assessment/AssessmentForm';
import { SectionDivider } from './SectionDivider';

export function RecoveryAssessment() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6">Data Recovery Assessment</h2>
        <p className="text-gray-600 text-center mb-8">
          Answer a few questions about your device and we'll provide a preliminary assessment
          of your data recovery case.
        </p>
        
        <SectionDivider className="mb-8" />
        
        <AssessmentForm />
      </div>
    </div>
  );
}