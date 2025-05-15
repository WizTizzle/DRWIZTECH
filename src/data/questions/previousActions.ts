import { Question } from '../../types/assessment';

export const previousActionQuestions: Question[] = [
  {
    id: "recovery_attempts",
    text: "What recovery attempts have been made?",
    options: [
      { value: "none", text: "No recovery attempts made", probabilityModifier: 0 },
      { value: "software", text: "Used data recovery software", probabilityModifier: -15 },
      { value: "chkdsk", text: "Ran CHKDSK or disk repair", probabilityModifier: -10 },
      { value: "opened", text: "Device has been opened", probabilityModifier: -45 }
    ]
  },
  {
    id: "professional_attempts",
    text: "Has another service attempted recovery?",
    options: [
      { value: "none", text: "No other service attempted", probabilityModifier: 0 },
      { value: "unsuccessful", text: "Yes, but was unsuccessful", probabilityModifier: -25 },
      { value: "partial", text: "Yes, with partial success", probabilityModifier: -15 }
    ]
  }
];