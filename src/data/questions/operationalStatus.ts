import { Question } from '../../types/assessment';

export const operationalStatusQuestions: Question[] = [
  {
    id: "power_status",
    text: "What is the current power status of your device?",
    options: [
      { value: "powers_on", text: "Powers on normally", probabilityModifier: 0 },
      { value: "no_power", text: "No power at all", probabilityModifier: -25 },
      { value: "intermittent", text: "Powers on intermittently", probabilityModifier: -15 }
    ]
  },
  {
    id: "spin_status",
    text: "Does your hard drive spin up?",
    dependsOn: {
      questionId: "device_type",
      value: ["internal_hdd", "external_hdd"]
    },
    options: [
      { value: "spins_normal", text: "Spins up normally", probabilityModifier: 0 },
      { value: "no_spin", text: "Doesn't spin at all", probabilityModifier: -30 },
      { value: "spin_stop", text: "Spins up but stops", probabilityModifier: -20 }
    ]
  }
];