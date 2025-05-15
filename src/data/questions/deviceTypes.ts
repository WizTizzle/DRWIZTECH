import { Question } from '../../types/assessment';

export const deviceTypeQuestion: Question = {
  id: "device_type",
  text: "What type of device needs recovery?",
  options: [
    { value: "hdd", text: "Hard Drive (HDD)", probabilityModifier: 0 },
    { value: "ssd", text: "Solid State Drive (SSD/NVMe)", probabilityModifier: -5 },
    { value: "raid", text: "RAID Array/NAS", probabilityModifier: -10 },
    { value: "flash", text: "USB Drive/Memory Card", probabilityModifier: -5 },
    { value: "laptop", text: "Laptop Drive", probabilityModifier: -5 }
  ]
};