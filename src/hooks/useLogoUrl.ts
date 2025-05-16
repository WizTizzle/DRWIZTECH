import { useState } from 'react';

export function useLogoUrl() {
  const [logoUrl] = useState<string | null>('/images/Final logo WIZTECH.png');
  const [error, setError] = useState<Error | null>(null);

  return { logoUrl, error };
}