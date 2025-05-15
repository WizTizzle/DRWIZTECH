import React from 'react';
import { getImagesByLocation, type ImageInfo } from '../lib/storage';
import { Loader2 } from 'lucide-react';

interface ImageListProps {
  location: string;
  onSelect?: (url: string) => void;
  selectedUrl?: string;
}

export function ImageList({ location, onSelect, selectedUrl }: ImageListProps) {
  const [images, setImages] = React.useState<ImageInfo[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    getImagesByLocation(location)
      .then(setImages)
      .catch(err => setError(err instanceof Error ? err : new Error('Failed to load images')))
      .finally(() => setLoading(false));
  }, [location]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-6 h-6 animate-spin text-primary-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 p-4 text-center">
        Failed to load images: {error.message}
      </div>
    );
  }

  if (!images.length) {
    return (
      <div className="text-gray-500 p-4 text-center">
        No images uploaded yet
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
      {images.map((image) => (
        <button
          key={image.filename}
          onClick={() => onSelect?.(image.url)}
          className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
            image.url === selectedUrl
              ? 'border-primary-600 shadow-lg'
              : 'border-gray-200 hover:border-primary-300'
          }`}
        >
          <img
            src={image.url}
            alt={image.filename}
            className="w-full h-full object-cover cursor-pointer"
          />
        </button>
      ))}
    </div>
  );
}