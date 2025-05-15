import React from 'react';
import { ImageUploader } from '../ImageUploader';
import { Info } from 'lucide-react';

interface DeviceImageUploadProps {
  onImageUploaded: (url: string) => void;
  deviceType: string;
}

export function DeviceImageUpload({ onImageUploaded, deviceType }: DeviceImageUploadProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-start space-x-3 bg-blue-50 p-4 rounded-lg">
        <Info className="w-5 h-5 text-blue-500 mt-0.5" />
        <div>
          <h4 className="font-medium text-blue-900">Photo Instructions</h4>
          <p className="text-blue-800 text-sm">
            Please upload images showing both sides of your device so we can try to determine the model
          </p>
        </div>
      </div>

      <ImageUploader onUploadComplete={onImageUploaded} />
    </div>
  );
}