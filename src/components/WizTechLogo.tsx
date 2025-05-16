import React from 'react';
import { useLogoUrl } from '../hooks/useLogoUrl';

export function WizTechLogo() {
  const { logoUrl } = useLogoUrl();

  // Fallback text logo component
  const TextLogo = () => (
    <div className="flex flex-col items-center space-y-2">
      <div className="text-5xl font-bold tracking-tight">
        <span className="text-gray-800">WIZ</span>
        <span className="text-primary-500">TECH</span>
        <span className="text-primary-300">!</span>
      </div>
      <div className="text-xl tracking-widest text-gray-600">
        DATA RECOVERY
      </div>
    </div>
  );

  if (!logoUrl) {
    return <TextLogo />;
  }

  return (
    <div className="flex flex-col items-center space-y-2">
      <img 
        src="/images/Final logo WIZTECH.png"
        alt="WizTech Logo"
        className="h-24 w-auto object-contain"
        onError={() => {
          console.error('Failed to load logo image');
        }}
      />
      <div className="text-xl tracking-widest text-gray-600">
        DATA RECOVERY
      </div>
    </div>
  );
}