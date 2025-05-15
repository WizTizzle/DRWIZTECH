import { Question } from '../../types/assessment';

export const deviceStateQuestions: Question[] = [
  {
    id: "device_state",
    text: "What is the current state of your device?",
    options: [
      { value: "working", text: "Powers on and spins up normally", probabilityModifier: 0 },
      { value: "intermittent", text: "Works intermittently", probabilityModifier: -10 },
      { value: "no_power", text: "No power or doesn't spin up", probabilityModifier: -20 },
      { value: "dead", text: "Completely dead/unresponsive", probabilityModifier: -30 }
    ]
  },
  {
    id: "clicking",
    text: "Is the drive making clicking or beeping sounds?",
    dependsOn: {
      questionId: "device_type",
      value: "hdd"
    },
    options: [
      { value: "no_sound", text: "No unusual sounds", probabilityModifier: 0 },
      { value: "light_clicking", text: "Light clicking occasionally", probabilityModifier: -15 },
      { value: "loud_clicking", text: "Loud clicking constantly", probabilityModifier: -25 },
      { value: "beeping", text: "Beeping sounds", probabilityModifier: -20 }
    ]
  }
];