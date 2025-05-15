import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase/config';

interface ImageData {
  url: string;
  filename: string;
  location: string;
}

export function useImage(location: string) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchImage() {
      try {
        const { data, error } = await supabase
          .from('images')
          .select('url')
          .eq('location', location)
          .single();

        if (error) throw error;
        setImageUrl(data?.url || null);
      } catch (err) {
        console.error('Error fetching image:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch image'));
      } finally {
        setLoading(false);
      }
    }

    fetchImage();
  }, [location]);

  return { imageUrl, loading, error };
}