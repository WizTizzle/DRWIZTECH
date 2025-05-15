import { Question } from '../../types/assessment';

export const deviceTypeQuestions: Question[] = [
  {
    id: "device_type",
    text: "What kind of device do you have?",
    options: [
      { value: "internal_hdd", text: "Internal Hard Drive (HDD)", probabilityModifier: 0 },
      { value: "external_hdd", text: "External Hard Drive", probabilityModifier: -5 },
      { value: "ssd", text: "Solid State Drive (SSD/NVMe)", probabilityModifier: -5 },
      { value: "flash", text: "USB Flash Drive", probabilityModifier: -10 },
      { value: "sd_card", text: "SD/Micro SD Card", probabilityModifier: -10 },
      { value: "raid", text: "RAID Array/NAS", probabilityModifier: -15 }
    ]
  },
  {
    id: "drive_size",
    text: "What is the capacity of your drive?",
    options: [
      { value: "small", text: "Under 1TB", probabilityModifier: 0 },
      { value: "medium", text: "1TB - 4TB", probabilityModifier: -5 },
      { value: "large", text: "4TB - 8TB", probabilityModifier: -10 },
      { value: "very_large", text: "Over 8TB", probabilityModifier: -15 }
    ]
  }
];