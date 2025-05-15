export const calculateBaseProbability = (deviceType: string): number => {
  // Start with a higher base probability to be more optimistic
  const baseProbability = 98;
  switch (deviceType) {
    case 'internal_hdd': return baseProbability;
    case 'external_hdd': return baseProbability - 3;
    case 'ssd': return baseProbability - 3;
    case 'flash': return baseProbability - 5;
    case 'sd_card': return baseProbability - 5;
    case 'raid': return baseProbability - 8;
    default: return baseProbability - 10;
  }
};

export const clampProbability = (value: number): number => {
  // Keep probability range more optimistic: 65-98%
  return Math.max(65, Math.min(98, value));
};

export const getPriceEstimate = (probability: number, deviceType: string): string => {
  const priceRanges = {
    internal_hdd: { min: 300, max: 1000 },
    external_hdd: { min: 300, max: 1000 },
    ssd: { min: 400, max: 1200 },
    flash: { min: 200, max: 600 },
    sd_card: { min: 200, max: 600 },
    raid: { min: 600, max: 2000 }
  };

  const range = priceRanges[deviceType as keyof typeof priceRanges] || priceRanges.internal_hdd;
  
  // Adjust price calculation to be more moderate
  const estimatedPrice = Math.round(
    range.min + ((90 - probability) / 25) * (range.max - range.min)
  );

  return `$${estimatedPrice}`;
};