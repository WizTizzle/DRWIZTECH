export interface Option {
  value: string;
  text: string;
  probabilityModifier?: number;
}

export interface Question {
  id: string;
  text: string;
  required?: boolean;
  type?: string;
  help?: string;
  placeholder?: string;
  options?: Option[];
  fields?: Record<string, {
    label: string;
    required?: boolean;
    type?: string;
    options?: Option[];
  }>;
  dependsOn?: {
    questionId: string;
    value: string | string[];
  };
}

export interface Assessment {
  severity: string;
  message: string;
}

export interface AssessmentState {
  currentStep: number;
  answers: Record<string, string>;
}