import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAssessment } from '../contexts/AssessmentContext';

interface AssessmentButtonProps {
  className?: string;
}

export function AssessmentButton({ className = "" }: AssessmentButtonProps) {
  const navigate = useNavigate();
  const { setAssessmentData } = useAssessment();

  const handleClick = () => {
    // Reset assessment data when starting new assessment
    setAssessmentData({ answers: {} });
    navigate('/assessment');
  };

  return (
    <button 
      onClick={handleClick}
      className={`bg-primary-500 text-white px-8 py-3 rounded-lg hover:bg-primary-600 transition-colors ${className}`}
    >
      Start Recovery Assessment
    </button>
  );
}