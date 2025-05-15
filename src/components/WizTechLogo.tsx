import React, { useState, useEffect } from 'react';

interface WizTechLogoProps {
  className?: string;
}

export function WizTechLogo({ className = "" }: WizTechLogoProps) {
  const [logoError, setLogoError] = useState(false);
  const logoUrl = '/images/Final logo WIZTECH.png';

  // Fallback text logo component
  const TextLogo = () => (
    <div className={`flex flex-col items-center space-y-2 ${className}`}>
      <div className="text-7xl font-bold tracking-tight">
        <span className="text-gray-800">WIZ</span>
        <span className="text-primary-500">TECH</span>
        <span className="text-primary-300">!</span>
      </div>
      <div className="text-2xl tracking-widest text-gray-600">
        DATA RECOVERY
      </div>
    </div>
  );

  // Verify logo exists on mount
  useEffect(() => {
    fetch(logoUrl, { method: 'HEAD' })
      .then(response => {
        if (!response.ok) {
          setLogoError(true);
        }
      })
      .catch(() => setLogoError(true));
  }, []);

  if (logoError) {
    return <TextLogo />;
  }

  return (
    <div className={`flex flex-col items-center space-y-0.5 ${className}`}>
      <img 
        src={logoUrl} 
        alt="WizTech Logo"
        className="h-36 w-auto object-contain"
        onError={() => setLogoError(true)}
      />
      <div className="text-2xl tracking-widest text-gray-600"> {/* Increased from text-xl to text-2xl */}
        DATA RECOVERY
      </div>
    </div>
  );
}