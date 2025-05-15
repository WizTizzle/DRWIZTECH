import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';
import { useCloudinaryUpload } from '../hooks/useCloudinaryUpload';

interface ImageUploadProps {
  onUpload: (url: string) => void;
  className?: string;
}

export function ImageUpload({ onUpload, className = '' }: ImageUploadProps) {
  const { uploadImage, uploading, error } = useCloudinaryUpload();

  const handleFileSelect = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const result = await uploadImage(file);
    if (result.url) {
      onUpload(result.url);
    }
  }, [uploadImage, onUpload]);

  return (
    <div className={`relative ${className}`}>
      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <Upload className={`w-8 h-8 mb-2 ${uploading ? 'animate-bounce' : ''} ${error ? 'text-red-500' : 'text-gray-500'}`} />
          <p className="mb-2 text-sm text-gray-500">
            {uploading ? 'Uploading...' : 'Click or drag to upload'}
          </p>
        </div>
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFileSelect}
          disabled={uploading}
        />
      </label>
      {error && (
        <p className="mt-2 text-sm text-red-500">
          {error.message}
        </p>
      )}
    </div>
  );
}