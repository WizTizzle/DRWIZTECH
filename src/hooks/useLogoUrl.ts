import { useState, useEffect } from 'react';

export function useLogoUrl() {
  const [logoUrl, setLogoUrl] = useState<string | null>('/images/Final logo WIZTECH.png');
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function validateUrl() {
      if (!logoUrl) return;

      try {
        // Try to construct URL to validate format
        new URL(logoUrl, window.location.origin);
        
        // Verify the image is accessible
        const response = await fetch(logoUrl, { method: 'HEAD' });
        if (!response.ok) {
          throw new Error(`Failed to access logo at ${logoUrl}: ${response.status}`);
        }
        
        console.log('Logo URL validated:', logoUrl);
        setError(null);
      } catch (err) {
        console.error('Logo URL validation failed:', err);
        setError(err instanceof Error ? err : new Error('Invalid logo URL'));
      }
    }

    validateUrl();
  }, [logoUrl]);

  return { logoUrl, error };
}