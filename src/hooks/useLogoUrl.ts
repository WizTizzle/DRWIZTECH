import { useState, useEffect } from 'react';
import { getPublicUrl } from '../lib/storage/index';

export function useLogoUrl() {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchLogoUrl() {
      try {
        const url = await getPublicUrl('wiztech-logo.png');
        if (!url) {
          throw new Error('Logo not found');
        }
        
        setLogoUrl(url);
        setError(null);
      } catch (err) {
        console.error('Error loading logo:', err);
        setError(err instanceof Error ? err : new Error('Failed to load logo'));
        setLogoUrl(null);
      }
    }

    fetchLogoUrl();
  }, []);

  return { logoUrl, error };
}