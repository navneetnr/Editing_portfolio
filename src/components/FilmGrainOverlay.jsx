import React from 'react';

export default function FilmGrainOverlay() {
  return (
    <div 
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden opacity-[0.03] select-none"
      aria-hidden="true"
    >
      <div className="absolute inset-0 w-full h-full film-grain" />
    </div>
  );
}
