import { Question } from '../types/assessment';

type AssessmentAnswers = Record<string, string>;

interface AssessmentResult {
  severity: 'standard' | 'moderate' | 'advanced';
  message: string;
}

export const filterQuestionsByDependency = (
  questions: Question[],
  answers: AssessmentAnswers
): Question[] => {
  return questions.filter(question => {
    if (!question.dependsOn) return true;
    
    const { questionId, value } = question.dependsOn;
    const answer = answers[questionId];
    
    if (Array.isArray(value)) {
      return value.includes(answer);
    }
    
    return answer === value;
  });
};

export const assessRecoveryComplexity = (answers: AssessmentAnswers): AssessmentResult => {
  let riskLevel = 0;
  
  // Calculate risk based on device state
  if (answers.device_state === 'no_power') riskLevel += 2;
  if (answers.device_state === 'unusual') riskLevel += 2;
  if (answers.device_state === 'partial') riskLevel += 1;

  // Add risk for physical issues
  if (answers.physical_condition === 'impact') riskLevel += 2;
  if (answers.physical_condition === 'liquid') riskLevel += 2;
  if (answers.physical_condition === 'opened') riskLevel += 3;

  // Consider sound symptoms for HDDs
  if (answers.sound_symptoms === 'loud_clicking') riskLevel += 3;
  if (answers.sound_symptoms === 'grinding') riskLevel += 3;
  if (answers.sound_symptoms === 'beeping') riskLevel += 2;

  // Consider previous attempts
  if (answers.previous_recovery === 'yes') riskLevel += 1;

  let severity: AssessmentResult['severity'];
  let message: string;

  if (riskLevel >= 4) {
    severity = 'advanced';
    message = "Based on our evaluation, your case requires specialized recovery techniques. While complex, our advanced tools and expertise have helped many similar situations. We recommend proceeding with a detailed diagnostic to determine the best recovery approach.";
  } else if (riskLevel >= 2) {
    severity = 'moderate';
    message = "Our analysis shows your case requires professional intervention but appears manageable with our standard procedures. We've successfully handled many similar situations and can guide you through the recovery process.";
  } else {
    severity = 'standard';
    message = "Your case appears to be relatively straightforward. While every recovery is unique, our professional tools and experience are well-matched to address your needs efficiently.";
  }

  return { severity, message };
};