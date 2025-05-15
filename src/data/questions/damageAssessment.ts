import { Question } from '../../types/assessment';

export const damageAssessmentQuestions: Question[] = [
  {
    id: "physical_damage",
    text: "Has your device suffered any physical damage?",
    options: [
      { value: "no_damage", text: "No physical damage", probabilityModifier: 0 },
      { value: "dropped", text: "Dropped while running", probabilityModifier: -35 },
      { value: "water", text: "Water/liquid damage", probabilityModifier: -40 },
      { value: "power_surge", text: "Power surge", probabilityModifier: -25 }
    ]
  },
  {
    id: "repair_attempts",
    text: "Has anyone attempted to repair the device?",
    options: [
      { value: "no_attempts", text: "No repair attempts", probabilityModifier: 0 },
      { value: "opened", text: "Device has been opened", probabilityModifier: -45 },
      { value: "software_recovery", text: "Used recovery software", probabilityModifier: -15 },
      { value: "professional", text: "Another repair service tried", probabilityModifier: -20 }
    ]
  }
];