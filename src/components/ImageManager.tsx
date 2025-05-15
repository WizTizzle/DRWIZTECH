import React, { useCallback } from 'react';
import { Upload, X } from 'lucide-react';
import { uploadImage, type ImageUploadResult } from '../lib/supabase/images';
import type { ImageFolder } from '../lib/supabase/imageManager';

interface ImageManagerProps {
  folder: ImageFolder;
  onImageUrl: (url: string) => void;
  className?: string;
  currentImage?: string;
  maxSize?: number;
  acceptedTypes?: string[];
}

export function ImageManager({ 
  folder, 
  onImageUrl, 
  className = '',
  currentImage,
  maxSize = 5 * 1024 * 1024,
  acceptedTypes = ['image/jpeg', 'image/png', 'image/webp']
}: ImageManagerProps) {
  const [uploading, setUploading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const validateFile = (file: File): string | null => {
    if (!acceptedTypes.includes(file.type)) {
      return `File type ${file.type} not supported. Please use: ${acceptedTypes.join(', ')}`;
    }
    if (file.size > maxSize) {
      return `File too large. Maximum size is ${maxSize / 1024 / 1024}MB`;
    }
    return null;
  };

  const handleFileSelect = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validationError = validateFile(file);
    if (validationError) {
      setError(new Error(validationError));
      return;
    }

    setUploading(true);
    try {
      const result = await uploadImage(file, folder);
      if (result.url) {
        onImageUrl(result.url);
      } else if (result.error) {
        throw result.error;
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Upload failed'));
    } finally {
      setUploading(false);
    }
  }, [folder, onImageUrl]);

  const handleRemove = useCallback(async () => {
    if (!currentImage) return;
    try {
      const { error } = await supabase.storage
        .from('public')
        .remove([currentImage]);
      
      if (!error) {
        onImageUrl('');
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to remove image'));
    }
  }, [currentImage, remove, onImageUrl]);

  return (
    <div className={`relative ${className}`}>
      {currentImage ? (
        <div className="relative">
          <img 
            src={currentImage} 
            alt="Current" 
            className="w-full h-32 object-cover rounded-lg"
          />
          <button
            onClick={handleRemove}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
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
            accept={acceptedTypes.join(',')}
            onChange={handleFileSelect}
            disabled={uploading}
          />
        </label>
      )}
      {error && (
        <p className="mt-2 text-sm text-red-500">
          {error.message}
        </p>
      )}
    </div>
  );
}