import { Question } from '../../types/assessment';

export const soundSymptoms: Question[] = [
  {
    id: "sound_type",
    text: "What sounds do you hear from the device?",
    dependsOn: {
      questionId: "device_type",
      value: ["internal_hdd", "external_hdd"]
    },
    options: [
      { value: "normal", text: "Normal quiet operation", probabilityModifier: 0 },
      { value: "light_click", text: "Light clicking/ticking", probabilityModifier: -20 },
      { value: "loud_click", text: "Loud clicking/knocking", probabilityModifier: -35 },
      { value: "beeping", text: "Beeping sounds", probabilityModifier: -30 },
      { value: "grinding", text: "Grinding/scraping noise", probabilityModifier: -45 },
      { value: "no_sound", text: "No sound at all", probabilityModifier: -25 }
    ]
  }
];