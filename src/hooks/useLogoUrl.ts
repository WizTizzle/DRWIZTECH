import { useState, useEffect } from 'react';

export function useLogoUrl() {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const url = '/images/Final logo WIZTECH.png';
    try {
      setLogoUrl(url);
      setError(null);
    } catch (err) {
      console.error('Error loading logo:', err);
      setError(err instanceof Error ? err : new Error('Failed to load logo'));
      setLogoUrl(null);
    }
  }, []);

  return { logoUrl, error };
}