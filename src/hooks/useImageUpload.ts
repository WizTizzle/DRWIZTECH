import { useState } from 'react';

interface UploadResult {
  url: string | null;
  error: Error | null;
}

export function useImageUpload() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const upload = async (file: File): Promise<UploadResult> => {
    setUploading(true);
    setError(null);

    try {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          const key = `image_${Date.now()}`;
          localStorage.setItem(key, base64String);
          resolve({ url: key, error: null });
        };
        reader.readAsDataURL(file);
      });
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