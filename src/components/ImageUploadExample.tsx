import React from 'react';
import { ImageUploader } from './ImageUploader';

export function ImageUploadExample() {
  const handleImageUploaded = (url: string) => {
    console.log('Uploaded image URL:', url);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Upload Image</h2>
      <ImageUploader onUploadComplete={handleImageUploaded} />
    </div>
  );
}