import React from 'react';

export function WizTechLogo() {
  return (
    <div className="flex flex-col items-center space-y-2">
      <img 
        src="/images/Final logo WIZTECH.png"
        alt="WizTech Logo"
        className="h-16 md:h-24 w-auto object-contain"
      />
      <div className="text-xl tracking-widest text-gray-600">
        DATA RECOVERY
      </div>
    </div>
  );
}