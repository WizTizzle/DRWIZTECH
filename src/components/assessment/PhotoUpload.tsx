import React from 'react';

interface PhotoUploadProps {
  onFileSelect: (files: FileList) => void;
}

export function PhotoUpload({ onFileSelect }: PhotoUploadProps) {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      onFileSelect(e.dataTransfer.files);
    }
  };

  return (
    <div
      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center">
        <svg
          className="w-12 h-12 text-gray-400 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
        <span className="text-gray-600">Upload Photo</span>
        <span className="text-sm text-gray-500 mt-1">Drag and drop files here</span>
      </div>
      <input
        type="file"
        className="hidden"
        onChange={(e) => e.target.files && onFileSelect(e.target.files)}
        multiple
      />
    </div>
  );
}