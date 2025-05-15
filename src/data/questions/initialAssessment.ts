import { Question } from '../../types/assessment';

export const initialAssessmentQuestions: Question[] = [
  {
    id: "data_loss_type",
    text: "What type of data loss are you experiencing?",
    options: [
      { value: "deleted", text: "Accidentally deleted files", probabilityModifier: -5 },
      { value: "formatted", text: "Drive was formatted", probabilityModifier: -10 },
      { value: "not_accessible", text: "Files not accessible", probabilityModifier: -15 },
      { value: "corrupted", text: "Files are corrupted", probabilityModifier: -20 }
    ]
  },
  {
    id: "file_system_state",
    text: "What is your current file system state?",
    options: [
      { value: "normal", text: "Shows in Windows normally", probabilityModifier: 0 },
      { value: "raw", text: "Shows as RAW drive", probabilityModifier: -25 },
      { value: "not_initialized", text: "Shows as not initialized", probabilityModifier: -20 },
      { value: "not_detected", text: "Drive not detected at all", probabilityModifier: -30 }
    ]
  }
];