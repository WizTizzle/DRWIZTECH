import React, { useState, useEffect } from 'react';
import { useLogoUrl } from '../hooks/useLogoUrl';

interface WizTechLogoProps {
  className?: string;
}

export function WizTechLogo({ className = "" }: WizTechLogoProps) {
  const [logoError, setLogoError] = useState(false);
  const { logoUrl, error } = useLogoUrl();

  useEffect(() => {
    if (error) {
      console.error('Logo loading error:', error);
      setLogoError(true);
    }
  }, [error]);

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

  if (logoError || !logoUrl) {
    console.log('Using text fallback due to:', logoError ? 'logo error' : 'no logo URL');
    return <TextLogo />;
  }

  return (
    <div className={`flex flex-col items-center space-y-2 ${className}`}>
      <img 
        src="/images/Final logo WIZTECH.png"
        alt="WizTech Logo"
        className="h-24 md:h-36 w-auto object-contain"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          console.error('Failed to load logo image:', {
            src: target.src,
            naturalWidth: target.naturalWidth,
            naturalHeight: target.naturalHeight,
            complete: target.complete,
            currentSrc: target.currentSrc
          });
          setLogoError(true);
        }}
      />
      <div className="text-xl tracking-widest text-gray-600">
        DATA RECOVERY
      </div>
    </div>
  );
}