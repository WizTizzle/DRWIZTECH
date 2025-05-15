export function mapDeviceTypeToFormOption(assessmentDeviceType: string): string {
  const mapping: Record<string, string> = {
    'internal_hdd': 'hdd',
    'external_hdd': 'hdd',
    'ssd': 'ssd',
    'nvme': 'ssd',
    'flash': 'usb',
    'sd_card': 'memory-card',
    'raid': 'raid'
  };
  
  return mapping[assessmentDeviceType] || '';
}

export function generateProblemDescription(answers: Record<string, string>): string {
  const issues: string[] = [];
  
  if (answers.power_status === 'no_power') {
    issues.push('Device not powering on');
  }
  if (answers.sound_type === 'clicking' || answers.sound_type === 'beeping') {
    issues.push('Unusual sounds (clicking/beeping)');
  }
  if (answers.physical_damage === 'dropped') {
    issues.push('Physical damage from dropping');
  }
  if (answers.physical_damage === 'water') {
    issues.push('Water damage');
  }
  
  return issues.join('\n');
}