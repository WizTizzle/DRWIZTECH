import { useState } from 'react';
import { uploadFile } from '../lib/storage';
import type { UploadResult } from '../lib/storage/types';

export function useStorage() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const upload = async (file: File): Promise<UploadResult> => {
    setUploading(true);
    setError(null);
    
    try {
      const result = await uploadFile(file);
      if (result.error) {
        throw result.error;
      }
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Upload failed');
      setError(error);
      return { url: null, error };
    } finally {
      setUploading(false);
    }
  };

  return { upload, uploading, error };
}