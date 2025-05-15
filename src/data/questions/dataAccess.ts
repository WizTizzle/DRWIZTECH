import { Question } from '../../types/assessment';

export const dataAccessQuestions: Question[] = [
  {
    id: "filesystem_status",
    text: "What is the current filesystem status?",
    options: [
      { value: "normal", text: "File system appears normal", probabilityModifier: 0 },
      { value: "raw", text: "Shows as RAW filesystem", probabilityModifier: -25 },
      { value: "unformatted", text: "Shows as unformatted", probabilityModifier: -20 },
      { value: "corrupted", text: "File system is corrupted", probabilityModifier: -15 }
    ]
  },
  {
    id: "data_access_level",
    text: "What level of access do you have to your data?",
    options: [
      { value: "full", text: "Can see all files but can't open them", probabilityModifier: -10 },
      { value: "partial", text: "Can see some files, others missing", probabilityModifier: -15 },
      { value: "none", text: "Can't see any files", probabilityModifier: -20 },
      { value: "corrupted", text: "Files visible but corrupted", probabilityModifier: -25 }
    ]
  }
];