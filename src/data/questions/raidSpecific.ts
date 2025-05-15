import { Question } from '../../types/assessment';

export const raidSpecificQuestions: Question[] = [
  {
    id: "raid_config",
    text: "What is your RAID configuration?",
    dependsOn: {
      questionId: "device_type",
      value: "raid"
    },
    options: [
      { value: "raid0", text: "RAID 0 (Striping)", probabilityModifier: -20 },
      { value: "raid1", text: "RAID 1 (Mirroring)", probabilityModifier: -10 },
      { value: "raid5", text: "RAID 5", probabilityModifier: -15 },
      { value: "unknown", text: "Don't know", probabilityModifier: -25 }
    ]
  },
  {
    id: "raid_failure",
    text: "What type of RAID failure occurred?",
    dependsOn: {
      questionId: "device_type",
      value: "raid"
    },
    options: [
      { value: "single_drive", text: "Single drive failure", probabilityModifier: -15 },
      { value: "multiple_drives", text: "Multiple drive failure", probabilityModifier: -35 },
      { value: "rebuild_failed", text: "Rebuild attempt failed", probabilityModifier: -25 },
      { value: "controller", text: "Controller failure", probabilityModifier: -20 }
    ]
  }
];