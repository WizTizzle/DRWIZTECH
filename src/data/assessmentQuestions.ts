import { Question } from '../types/assessment';
import { initialAssessmentQuestions } from './questions/initialAssessment';
import { deviceTypeQuestions } from './questions/deviceType';
import { operationalStatusQuestions } from './questions/operationalStatus';
import { soundSymptoms } from './questions/soundSymptoms';
import { dataAccessQuestions } from './questions/dataAccess';
import { previousActionQuestions } from './questions/previousActions';
import { deviceConditionQuestions } from './questions/deviceCondition';
import { damageAssessmentQuestions } from './questions/damageAssessment';
import { raidSpecificQuestions } from './questions/raidSpecific';

export const assessmentQuestions: Question[] = [
  ...initialAssessmentQuestions,
  ...deviceTypeQuestions,
  ...operationalStatusQuestions,
  ...soundSymptoms,
  ...dataAccessQuestions,
  ...previousActionQuestions,
  ...deviceConditionQuestions,
  ...damageAssessmentQuestions,
  ...raidSpecificQuestions
];