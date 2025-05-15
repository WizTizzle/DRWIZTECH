import { useState, useCallback } from 'react';
import { imageManager, type ImageFolder } from '../lib/supabase/imageManager';

export function useImageManager(folder: ImageFolder) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const upload = useCallback(async (file: File): Promise<string | null> => {
    setUploading(true);
    setError(null);
    
    try {
      const url = await imageManager.uploadImage(file, folder);
      if (!url) throw new Error('Upload failed');
      return url;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Upload failed');
      setError(error);
      return null;
    } finally {
      setUploading(false);
    }
  }, [folder]);

  const remove = useCallback(async (path: string): Promise<boolean> => {
    try {
      return await imageManager.deleteImage(path);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Delete failed');
      setError(error);
      return false;
    }
  }, []);

  return {
    upload,
    remove,
    uploading,
    error
  };
}