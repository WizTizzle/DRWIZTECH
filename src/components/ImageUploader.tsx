import React, { useState, useCallback } from 'react';
import { Upload } from 'lucide-react';
import { uploadImage } from '../lib/storage/index';

interface ImageUploaderProps {
  location?: string;
  onUploadComplete?: (url: string) => void;
  className?: string;
  title?: string;
  description?: string;
  acceptedTypes?: string[];
}

export function ImageUploader({
  location = 'default',
  onUploadComplete,
  className = '',
  title,
  description,
  acceptedTypes = ['image/jpeg', 'image/png', 'image/webp']
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleUpload = async (file: File) => {
    if (!acceptedTypes.includes(file.type)) {
      setError(`Unsupported file type. Please use: ${acceptedTypes.join(', ')}`);
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const url = await uploadImage(file, location);
      if (url) {
        onUploadComplete?.(url);
      } else {
        throw new Error('Failed to upload image');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter(file => acceptedTypes.includes(file.type));
    
    if (imageFiles.length > 0) {
      handleUpload(imageFiles[0]);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleUpload(files[0]);
    }
  }, []);

  return (
    <div className={className}>
      {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
      {description && <p className="text-sm text-gray-600 mb-4">{description}</p>}

      <label 
        className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
          dragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:bg-gray-50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <Upload className={`w-8 h-8 mb-2 ${uploading ? 'animate-bounce' : ''}`} />
          <p className="mb-2 text-sm text-gray-500">
            {uploading ? 'Uploading...' : 'Click or drag image to upload'}
          </p>
        </div>
        <input
          type="file"
          className="hidden"
          accept={acceptedTypes.join(',')}
          onChange={handleFileSelect}
          disabled={uploading}
        />
      </label>

      {error && (
        <p className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}