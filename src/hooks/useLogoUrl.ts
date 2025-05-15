import { useState, useEffect } from 'react';

export function useLogoUrl() {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const url = '/images/Final logo WIZTECH.png';
    
    // Verify the image exists
    fetch(url, { method: 'HEAD' })
      .then(response => {
        if (response.ok) {
          setLogoUrl(url);
        } else {
          throw new Error('Logo not found');
        }
      })
      .catch(err => {
        setError(err instanceof Error ? err : new Error('Failed to load logo'));
        setLogoUrl(null);
      });
  }, []);

  return { logoUrl, error };
}