import React, { useState, useEffect } from 'react';
import { useLogoUrl } from '../hooks/useLogoUrl';

interface WizTechLogoProps {
  className?: string;
}

export function WizTechLogo({ className = "" }: WizTechLogoProps) {
  const [logoError, setLogoError] = useState(false);
  const { logoUrl, error } = useLogoUrl();

  // Fallback text logo component
  const TextLogo = () => (
    <div className={`flex flex-col items-center space-y-2 ${className}`}>
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

  useEffect(() => {
    if (error) {
      console.error('Logo loading error:', error);
      setLogoError(true);
    }
  }, [error]);

  if (logoError || !logoUrl) {
    return <TextLogo />;
  }

  return (
    <div className={`flex flex-col items-center space-y-2 ${className}`}>
      <img 
        src={logoUrl}
        alt="WizTech Logo"
        className="h-24 md:h-36 w-auto object-contain"
        onError={() => {
          console.error('Failed to load logo image');
          setLogoError(true);
        }}
      />
      <div className="text-xl tracking-widest text-gray-600">
        DATA RECOVERY
      </div>
    </div>
  );
}