import React from 'react';
import { Navigate } from 'react-router-dom';
import { ImageUploader } from '../../components/ImageUploader';
import { ImageList } from '../../components/ImageList';
import { SectionDivider } from '../../components/SectionDivider';

const ADMIN_ENABLED = import.meta.env.VITE_ADMIN_ENABLED === 'true';
const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;

console.log('Admin page access attempt:', {
  enabled: ADMIN_ENABLED,
  configuredEmail: ADMIN_EMAIL,
  currentUrl: window.location.pathname
});

const IMAGE_LOCATIONS = {
  'navbar-hard-drive': 'Hard Drive Recovery Banner',
  'navbar-ssd': 'SSD Recovery Banner',
  'navbar-raid': 'RAID Recovery Banner',
  'navbar-flash': 'Flash Recovery Banner',
  'navbar-server': 'Server Recovery Banner',
  'hero-background': 'Hero Section Background',
  'logo': 'Company Logo'
};

export function ImageUploadPage() {
  // Redirect if admin features are disabled
  if (!ADMIN_ENABLED || !ADMIN_EMAIL) {
    console.log('Admin access denied: Features disabled or email not configured');
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container mx-auto px-4 py-12 pt-64">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold">Site Image Management</h1>
            <p className="text-gray-600 mt-2">Admin access: {ADMIN_EMAIL}</p>
          </div>
        </div>

        <SectionDivider className="mb-8" />
        
        <div className="grid gap-8">
          {Object.entries(IMAGE_LOCATIONS).map(([location, title]) => (
            <div key={location} className="bg-white p-6 rounded-lg shadow-md space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">{title}</h2>
                <ImageUploader
                  location={location}
                  description={`Upload or replace the image for ${title}`}
                  onUploadComplete={(url) => {
                    console.log('Image uploaded:', { location, url });
                  }}
                />
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Uploaded Images</h3>
                <ImageList 
                  location={location}
                  onSelect={(url) => {
                    console.log('Image selected:', { location, url });
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}