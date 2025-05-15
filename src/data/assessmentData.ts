import type { Question } from '../types/assessment';

export const assessmentQuestions: Question[] = [
  // Initial Assessment
  {
    id: "issue_type",
    text: "What type of data recovery assistance do you need?",
    required: true,
    help: "Understanding your situation helps us provide the most effective solution",
    options: [
      { value: "no_deletion", text: "My device is malfunctioning or not working - I haven't deleted any files" },
      { value: "deletion", text: "My device works, but I need to recover deleted or formatted files" }
    ]
  },

  // Device Information
  {
    id: "storage_type",
    text: "Which storage device needs recovery?",
    required: true,
    help: "Select the type of device that contains your data",
    options: [
      { value: "internal_hdd", text: "Internal Hard Drive" },
      { value: "external_hdd", text: "External Storage Device" },
      { value: "ssd", text: "Solid State Drive (SSD/NVMe)" },
      { value: "flash", text: "USB Flash Drive" },
      { value: "memory_card", text: "Memory Card (SD/microSD/CF)" },
      { value: "raid", text: "RAID System or NAS" }
    ]
  },

  // Device State
  {
    id: "device_state",
    text: "What's the current state of your device?",
    required: true,
    help: "This helps us understand the severity of the issue",
    options: [
      { value: "normal", text: "Powers on and is recognized normally" },
      { value: "partial", text: "Powers on but isn't fully recognized" },
      { value: "no_power", text: "Doesn't power on at all" },
      { value: "unusual", text: "Makes unusual noises or behaves erratically" }
    ]
  },

  // Physical Condition
  {
    id: "physical_condition",
    text: "Has the device experienced any physical damage or trauma?",
    required: true,
    help: "Select all conditions that apply to your device",
    options: [
      { value: "none", text: "No physical damage or trauma" },
      { value: "impact_on", text: "Dropped or impacted while powered on" },
      { value: "impact_off", text: "Dropped or impacted while powered off" },
      { value: "liquid", text: "Exposed to water/liquid damage" },
      { value: "opened", text: "Device has been opened or tampered with" },
      { value: "power_surge", text: "Experienced power surge or electrical damage" }
    ]
  },

  // Sound Symptoms (HDD Only)
  {
    id: "sound_symptoms",
    text: "Do you hear any of these sounds from the device?",
    dependsOn: {
      questionId: "storage_type",
      value: ["internal_hdd", "external_hdd"]
    },
    help: "Different sounds can indicate specific types of failure",
    options: [
      { value: "none", text: "No unusual sounds" },
      { value: "light_clicking", text: "Light clicking or ticking sounds" },
      { value: "loud_clicking", text: "Loud clicking or knocking sounds" },
      { value: "grinding", text: "Grinding or scraping noise" },
      { value: "beeping", text: "Beeping or chirping sounds" },
      { value: "whirring", text: "Spinning up then stopping (whirring)" }
    ]
  },

  // Previous Recovery Attempts
  {
    id: "previous_recovery",
    text: "Has another recovery service or repair shop attempted to recover your data?",
    required: true,
    options: [
      { value: "no", text: "No previous recovery attempts" },
      { value: "repair_shop", text: "Yes - computer repair shop" },
      { value: "recovery_service", text: "Yes - data recovery company" },
      { value: "both", text: "Yes - both repair shop and recovery company" }
    ]
  },

  // Previous Recovery Details - Repair Shop
  {
    id: "repair_shop_name",
    text: "What is the name of the repair shop?",
    required: true,
    dependsOn: {
      questionId: "previous_recovery",
      value: ["repair_shop", "both"]
    }
  },
  {
    id: "repair_shop_diagnosis",
    text: "What was the repair shop's diagnosis?",
    required: true,
    dependsOn: {
      questionId: "previous_recovery",
      value: ["repair_shop", "both"]
    }
  },

  // Previous Recovery Details - Recovery Service
  {
    id: "recovery_company_name",
    text: "What is the name of the data recovery company?",
    required: true,
    dependsOn: {
      questionId: "previous_recovery",
      value: ["recovery_service", "both"]
    }
  },
  {
    id: "recovery_company_diagnosis",
    text: "What was the data recovery company's diagnosis?",
    required: true,
    dependsOn: {
      questionId: "previous_recovery",
      value: ["recovery_service", "both"]
    }
  },

  // Data Access
  {
    id: "data_access",
    text: "What is your current level of data access?",
    required: true,
    options: [
      { value: "full", text: "Can see all files but can't copy them" },
      { value: "partial", text: "Can see some files, others are missing" },
      { value: "none", text: "Cannot access any files" },
      { value: "not_detected", text: "Device is not detected by computer" },
      { value: "raw", text: "Shows as RAW drive/needs formatting" }
    ]
  }
];