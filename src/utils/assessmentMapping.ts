export function mapAssessmentToDescription(answers: Record<string, string>): string {
  const descriptions: string[] = [];

  // Map device type
  const deviceTypes: Record<string, string> = {
    internal_hdd: "Internal Hard Drive",
    external_hdd: "External Hard Drive",
    ssd: "Solid State Drive",
    flash: "USB Flash Drive",
    memory_card: "Memory Card",
    raid: "RAID System"
  };

  if (answers.storage_type) {
    descriptions.push(`Device Type: ${deviceTypes[answers.storage_type] || answers.storage_type}`);
  }

  // Map device state
  const deviceStates: Record<string, string> = {
    normal: "Device powers on and is recognized",
    partial: "Device powers on but isn't fully recognized",
    no_power: "Device doesn't power on",
    unusual: "Device makes unusual noises or behaves erratically"
  };

  if (answers.device_state) {
    descriptions.push(`Current State: ${deviceStates[answers.device_state] || answers.device_state}`);
  }

  // Add physical condition
  const physicalConditions: Record<string, string> = {
    none: "No physical damage",
    impact: "Device was dropped/impacted",
    liquid: "Liquid damage present",
    opened: "Device has been opened"
  };

  if (answers.physical_condition) {
    descriptions.push(`Physical Condition: ${physicalConditions[answers.physical_condition] || answers.physical_condition}`);
  }

  // Add previous attempts
  const attemptTypes: Record<string, string> = {
    none: "No previous recovery attempts",
    software: "Recovery software was used",
    professional: "Professional service attempted recovery",
    diy: "DIY recovery attempted"
  };

  if (answers.previous_attempts) {
    descriptions.push(`Recovery Attempts: ${attemptTypes[answers.previous_attempts] || answers.previous_attempts}`);
  }

  return descriptions.join('\n');
}