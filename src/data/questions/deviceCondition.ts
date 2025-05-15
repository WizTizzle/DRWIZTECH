import { Question } from '../../types/assessment';

export const deviceConditionQuestions: Question[] = [
  {
    id: "device_recognition",
    text: "How does your computer recognize the device?",
    options: [
      { value: "full_access", text: "Fully recognized with drive letter", probabilityModifier: 0 },
      { value: "disk_management", text: "Shows in Disk Management only", probabilityModifier: -15 },
      { value: "bios_only", text: "Shows in BIOS only", probabilityModifier: -20 },
      { value: "not_recognized", text: "Not recognized anywhere", probabilityModifier: -25 }
    ]
  },
  {
    id: "smart_status",
    text: "What is the S.M.A.R.T. status of your drive?",
    dependsOn: {
      questionId: "device_type",
      value: ["internal_hdd", "external_hdd", "ssd"]
    },
    options: [
      { value: "healthy", text: "Status shows healthy", probabilityModifier: 0 },
      { value: "warning", text: "Shows warning/caution", probabilityModifier: -15 },
      { value: "failed", text: "Shows failed/error", probabilityModifier: -25 },
      { value: "unknown", text: "Cannot read SMART status", probabilityModifier: -20 }
    ]
  }
];