// Utility file for style-related helper functions
export const getResultClass = (severity: string): string => {
  switch (severity) {
    case 'standard': return 'bg-green-100 text-green-800';
    case 'moderate': return 'bg-blue-100 text-blue-800';
    case 'advanced': return 'bg-yellow-100 text-yellow-800';
    default: return 'bg-blue-100 text-blue-800';
  }
};