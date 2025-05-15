import { useState, useEffect } from 'react';

export function useLogoUrl() {
  const [logoUrl, setLogoUrl] = useState<string | null>('/images/Final logo WIZTECH.png');
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function verifyLogoUrl() {
      try {
        if (!logoUrl) return;
        
        const response = await fetch(logoUrl, { method: 'HEAD' });
        if (!response.ok) {
          throw new Error(`Logo not found: ${response.status} ${response.statusText}`);
        }
        setError(null);
      } catch (err) {
        console.error('Error loading logo:', err);
        setError(err instanceof Error ? err : new Error('Failed to load logo'));
        setLogoUrl(null);
      }
    }

    verifyLogoUrl();
  }, [logoUrl]);

  return { logoUrl, error };
}