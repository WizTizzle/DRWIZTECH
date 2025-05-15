import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase/config';
import type { FileObject } from '@supabase/storage-js';

export function useImageList(folder: string) {
  const [images, setImages] = useState<FileObject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchImages = async () => {
    try {
      const { data, error } = await supabase.storage
        .from('public')
        .list(folder);

      if (error) throw error;
      setImages(data || []);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch images'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [folder]);

  return { images, loading, error, refresh: fetchImages };
}