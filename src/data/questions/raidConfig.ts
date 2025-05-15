import { Question } from '../../types/assessment';

export const raidConfigQuestion: Question = {
  id: "raid_config",
  text: "What is your RAID configuration?",
  dependsOn: {
    questionId: "device_type",
    value: "raid"
  },
  options: [
    { value: "raid0", text: "RAID 0 (Striping)", probabilityModifier: -15 },
    { value: "raid1", text: "RAID 1 (Mirroring)", probabilityModifier: -5 },
    { value: "raid5", text: "RAID 5", probabilityModifier: -10 },
    { value: "raid10", text: "RAID 10", probabilityModifier: -8 },
    { value: "unknown", text: "Unknown configuration", probabilityModifier: -20 }
  ]
};