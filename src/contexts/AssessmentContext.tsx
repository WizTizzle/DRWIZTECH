import React, { createContext, useContext, useState, useEffect } from 'react';
import type { MailInFormData } from '../types/mailIn';

interface AssessmentData {
  answers: Record<string, string>;
  deviceImages?: string[];
  assessment?: {
    severity: string;
    message: string;
  };
  ticketId?: string;
  contactInfo?: MailInFormData | null;
  emailSent?: boolean;
}

interface AssessmentContextType {
  assessmentData: AssessmentData;
  setAssessmentData: React.Dispatch<React.SetStateAction<AssessmentData>>;
}

const LOCAL_STORAGE_KEY = 'wiztech_assessment_data';

const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined);

export function AssessmentProvider({ children }: { children: React.ReactNode }) {
  const [assessmentData, setAssessmentData] = useState<AssessmentData>(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored ? JSON.parse(stored) : { answers: {} };
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(assessmentData));
  }, [assessmentData]);

  return (
    <AssessmentContext.Provider value={{ assessmentData, setAssessmentData }}>
      {children}
    </AssessmentContext.Provider>
  );
}

export function useAssessment() {
  const context = useContext(AssessmentContext);
  if (!context) {
    throw new Error('useAssessment must be used within an AssessmentProvider');
  }
  return context;
}