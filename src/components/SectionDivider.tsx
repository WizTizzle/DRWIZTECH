import React from 'react';

interface SectionDividerProps {
  className?: string;
  inverted?: boolean;
}

export function SectionDivider({ className = "", inverted = false }: SectionDividerProps) {
  return (
    <div className={`w-full ${className}`}>
      {inverted ? (
        <>
          <div className="h-2 w-full bg-primary-300" />
          <div className="h-2 w-full bg-primary-600" />
        </>
      ) : (
        <>
          <div className="h-2 w-full bg-primary-600" />
          <div className="h-2 w-full bg-primary-300" />
        </>
      )}
    </div>
  );
}